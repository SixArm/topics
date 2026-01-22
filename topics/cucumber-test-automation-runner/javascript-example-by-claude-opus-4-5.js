/**
 * Cucumber - Behavior-Driven Development Test Automation Tool
 *
 * Cucumber facilitates BDD by enabling teams to write tests in natural language.
 * It bridges technical and non-technical stakeholders through executable
 * specifications using the Gherkin language with Given-When-Then syntax.
 *
 * Key Concepts:
 * - Gherkin: Domain-specific language for describing behavior
 * - Feature Files: Business-readable specification documents
 * - Step Definitions: Code that implements Gherkin steps
 * - Hooks: Setup and teardown code for scenarios
 */

/**
 * GherkinParser parses Gherkin feature files into executable structures.
 * Converts natural language into testable scenarios.
 */
class GherkinParser {
    constructor() {
        this.keywords = {
            feature: 'Feature:',
            scenario: 'Scenario:',
            scenarioOutline: 'Scenario Outline:',
            given: 'Given',
            when: 'When',
            then: 'Then',
            and: 'And',
            but: 'But',
            examples: 'Examples:',
            background: 'Background:'
        };
    }

    /**
     * Parses a feature file content
     * @param {string} content - Feature file content
     * @returns {Object} Parsed feature structure
     */
    parse(content) {
        const lines = content.split('\n').map(line => line.trim());
        const feature = {
            name: '',
            description: '',
            background: null,
            scenarios: []
        };

        let currentScenario = null;
        let currentSection = 'feature';
        let lastStepType = null;

        for (const line of lines) {
            if (!line || line.startsWith('#')) continue;

            if (line.startsWith(this.keywords.feature)) {
                feature.name = line.replace(this.keywords.feature, '').trim();
                currentSection = 'feature';
            } else if (line.startsWith(this.keywords.background)) {
                feature.background = { steps: [] };
                currentSection = 'background';
            } else if (line.startsWith(this.keywords.scenario) ||
                       line.startsWith(this.keywords.scenarioOutline)) {
                currentScenario = {
                    name: line.replace(this.keywords.scenario, '')
                              .replace(this.keywords.scenarioOutline, '').trim(),
                    isOutline: line.startsWith(this.keywords.scenarioOutline),
                    steps: [],
                    examples: []
                };
                feature.scenarios.push(currentScenario);
                currentSection = 'scenario';
            } else if (this.isStep(line)) {
                const step = this.parseStep(line, lastStepType);
                lastStepType = step.keyword;

                if (currentSection === 'background') {
                    feature.background.steps.push(step);
                } else if (currentScenario) {
                    currentScenario.steps.push(step);
                }
            } else if (line.startsWith(this.keywords.examples)) {
                currentSection = 'examples';
            } else if (currentSection === 'examples' && line.startsWith('|')) {
                const example = this.parseTableRow(line);
                if (currentScenario) {
                    currentScenario.examples.push(example);
                }
            }
        }

        return feature;
    }

    /**
     * Checks if a line is a step
     * @param {string} line - Line to check
     * @returns {boolean} True if line is a step
     */
    isStep(line) {
        return ['Given', 'When', 'Then', 'And', 'But'].some(kw => line.startsWith(kw));
    }

    /**
     * Parses a step line
     * @param {string} line - Step line
     * @param {string} lastKeyword - Previous step's keyword
     * @returns {Object} Parsed step
     */
    parseStep(line, lastKeyword) {
        let keyword = line.split(' ')[0];
        const text = line.substring(keyword.length).trim();

        // And/But inherit the previous step type
        if (keyword === 'And' || keyword === 'But') {
            keyword = lastKeyword || 'Given';
        }

        return {
            keyword,
            text,
            originalKeyword: line.split(' ')[0]
        };
    }

    /**
     * Parses a table row
     * @param {string} line - Table row line
     * @returns {Array} Table cell values
     */
    parseTableRow(line) {
        return line.split('|')
            .map(cell => cell.trim())
            .filter(cell => cell.length > 0);
    }
}

/**
 * StepDefinitionRegistry stores and matches step definitions.
 * Maps Gherkin steps to executable code.
 */
class StepDefinitionRegistry {
    constructor() {
        this.definitions = {
            Given: [],
            When: [],
            Then: []
        };
    }

    /**
     * Registers a Given step definition
     * @param {string|RegExp} pattern - Step pattern
     * @param {Function} implementation - Step implementation
     */
    Given(pattern, implementation) {
        this.register('Given', pattern, implementation);
    }

    /**
     * Registers a When step definition
     * @param {string|RegExp} pattern - Step pattern
     * @param {Function} implementation - Step implementation
     */
    When(pattern, implementation) {
        this.register('When', pattern, implementation);
    }

    /**
     * Registers a Then step definition
     * @param {string|RegExp} pattern - Step pattern
     * @param {Function} implementation - Step implementation
     */
    Then(pattern, implementation) {
        this.register('Then', pattern, implementation);
    }

    /**
     * Registers a step definition
     * @param {string} type - Step type (Given/When/Then)
     * @param {string|RegExp} pattern - Step pattern
     * @param {Function} implementation - Step implementation
     */
    register(type, pattern, implementation) {
        const regex = pattern instanceof RegExp
            ? pattern
            : this.patternToRegex(pattern);

        this.definitions[type].push({
            pattern,
            regex,
            implementation
        });
    }

    /**
     * Converts a string pattern to regex
     * @param {string} pattern - String pattern with placeholders
     * @returns {RegExp} Regular expression
     */
    patternToRegex(pattern) {
        // Convert {placeholder} to capture groups
        let regexStr = pattern
            .replace(/\{string\}/g, '"([^"]*)"')
            .replace(/\{int\}/g, '(\\d+)')
            .replace(/\{float\}/g, '([\\d.]+)')
            .replace(/\{word\}/g, '(\\w+)');

        return new RegExp(`^${regexStr}$`);
    }

    /**
     * Finds a matching step definition
     * @param {string} type - Step type
     * @param {string} text - Step text
     * @returns {Object|null} Matching definition with captured args
     */
    findMatch(type, text) {
        for (const def of this.definitions[type]) {
            const match = text.match(def.regex);
            if (match) {
                return {
                    definition: def,
                    args: match.slice(1)
                };
            }
        }
        return null;
    }
}

/**
 * CucumberRunner executes Cucumber tests.
 * Coordinates parsing, step matching, and test execution.
 */
class CucumberRunner {
    constructor() {
        this.parser = new GherkinParser();
        this.stepRegistry = new StepDefinitionRegistry();
        this.hooks = {
            beforeAll: [],
            afterAll: [],
            beforeScenario: [],
            afterScenario: [],
            beforeStep: [],
            afterStep: []
        };
        this.world = {};
        this.results = [];
    }

    /**
     * Registers a hook
     * @param {string} type - Hook type
     * @param {Function} fn - Hook function
     */
    addHook(type, fn) {
        if (this.hooks[type]) {
            this.hooks[type].push(fn);
        }
    }

    /**
     * Runs all hooks of a type
     * @param {string} type - Hook type
     * @param {Object} context - Execution context
     */
    async runHooks(type, context) {
        for (const hook of this.hooks[type]) {
            await hook(context);
        }
    }

    /**
     * Executes a feature
     * @param {string} featureContent - Feature file content
     * @returns {Promise<Object>} Feature results
     */
    async runFeature(featureContent) {
        const feature = this.parser.parse(featureContent);
        console.log(`\nFeature: ${feature.name}`);

        await this.runHooks('beforeAll', { feature });

        const scenarioResults = [];

        for (const scenario of feature.scenarios) {
            const result = await this.runScenario(scenario, feature.background);
            scenarioResults.push(result);
        }

        await this.runHooks('afterAll', { feature });

        const featureResult = {
            feature: feature.name,
            scenarios: scenarioResults,
            passed: scenarioResults.every(r => r.passed),
            totalScenarios: scenarioResults.length,
            passedScenarios: scenarioResults.filter(r => r.passed).length
        };

        this.results.push(featureResult);
        return featureResult;
    }

    /**
     * Executes a scenario
     * @param {Object} scenario - Parsed scenario
     * @param {Object} background - Background steps (optional)
     * @returns {Promise<Object>} Scenario result
     */
    async runScenario(scenario, background) {
        console.log(`\n  Scenario: ${scenario.name}`);

        // Reset world for each scenario
        this.world = {};

        await this.runHooks('beforeScenario', { scenario, world: this.world });

        const stepResults = [];

        // Run background steps first
        if (background) {
            for (const step of background.steps) {
                const result = await this.runStep(step);
                stepResults.push(result);
                if (!result.passed) break;
            }
        }

        // Run scenario steps
        const scenarioPassed = stepResults.every(r => r.passed);
        if (scenarioPassed) {
            for (const step of scenario.steps) {
                const result = await this.runStep(step);
                stepResults.push(result);
                if (!result.passed) break;
            }
        }

        await this.runHooks('afterScenario', { scenario, world: this.world });

        return {
            name: scenario.name,
            steps: stepResults,
            passed: stepResults.every(r => r.passed)
        };
    }

    /**
     * Executes a single step
     * @param {Object} step - Parsed step
     * @returns {Promise<Object>} Step result
     */
    async runStep(step) {
        const keyword = step.keyword;
        const match = this.stepRegistry.findMatch(keyword, step.text);

        console.log(`    ${step.originalKeyword} ${step.text}`);

        await this.runHooks('beforeStep', { step, world: this.world });

        let result;

        if (!match) {
            result = {
                step: step.text,
                passed: false,
                status: 'undefined',
                error: 'Step definition not found'
            };
            console.log(`      ✗ Undefined step`);
        } else {
            try {
                await match.definition.implementation.call(this.world, ...match.args);
                result = {
                    step: step.text,
                    passed: true,
                    status: 'passed'
                };
                console.log(`      ✓ Passed`);
            } catch (error) {
                result = {
                    step: step.text,
                    passed: false,
                    status: 'failed',
                    error: error.message
                };
                console.log(`      ✗ Failed: ${error.message}`);
            }
        }

        await this.runHooks('afterStep', { step, result, world: this.world });
        return result;
    }

    /**
     * Generates test report
     * @returns {Object} Test report
     */
    generateReport() {
        const totalScenarios = this.results.reduce((sum, f) => sum + f.totalScenarios, 0);
        const passedScenarios = this.results.reduce((sum, f) => sum + f.passedScenarios, 0);

        return {
            features: this.results.length,
            scenarios: {
                total: totalScenarios,
                passed: passedScenarios,
                failed: totalScenarios - passedScenarios
            },
            passRate: `${((passedScenarios / totalScenarios) * 100).toFixed(1)}%`,
            results: this.results
        };
    }
}

/**
 * TestContext provides shared state between steps.
 * Acts as the "World" object in Cucumber terminology.
 */
class TestContext {
    constructor() {
        this.data = {};
        this.responses = [];
    }

    /**
     * Stores a value
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     */
    set(key, value) {
        this.data[key] = value;
    }

    /**
     * Retrieves a value
     * @param {string} key - Storage key
     * @returns {*} Stored value
     */
    get(key) {
        return this.data[key];
    }

    /**
     * Stores the last response
     * @param {Object} response - Response to store
     */
    setResponse(response) {
        this.responses.push(response);
    }

    /**
     * Gets the last response
     * @returns {Object} Last response
     */
    getLastResponse() {
        return this.responses[this.responses.length - 1];
    }
}

// Demonstration
console.log('=== Cucumber Test Automation Demo ===');

// Create runner instance
const cucumber = new CucumberRunner();

// Define step definitions
cucumber.stepRegistry.Given('a user with username {string}', function(username) {
    this.username = username;
    console.log(`        [Created user: ${username}]`);
});

cucumber.stepRegistry.Given('the user is logged in', function() {
    this.loggedIn = true;
    console.log(`        [User logged in]`);
});

cucumber.stepRegistry.When('the user navigates to {string}', function(page) {
    this.currentPage = page;
    console.log(`        [Navigated to: ${page}]`);
});

cucumber.stepRegistry.When('the user clicks {string}', function(element) {
    this.lastClicked = element;
    console.log(`        [Clicked: ${element}]`);
});

cucumber.stepRegistry.Then('the user should see {string}', function(expectedText) {
    // Simulated assertion
    const found = true;
    if (!found) {
        throw new Error(`Expected to see "${expectedText}"`);
    }
    console.log(`        [Verified text: ${expectedText}]`);
});

cucumber.stepRegistry.Then('the page title should be {string}', function(expectedTitle) {
    this.pageTitle = expectedTitle;
    console.log(`        [Title verified: ${expectedTitle}]`);
});

// Add hooks
cucumber.addHook('beforeScenario', async ({ scenario }) => {
    console.log(`    [Setting up scenario...]`);
});

cucumber.addHook('afterScenario', async ({ scenario }) => {
    console.log(`    [Cleaning up scenario...]`);
});

// Sample feature file content
const featureContent = `
Feature: User Dashboard

  Background:
    Given a user with username "testuser"
    And the user is logged in

  Scenario: View Dashboard
    When the user navigates to "/dashboard"
    Then the page title should be "Dashboard"
    And the user should see "Welcome, testuser"

  Scenario: Access Settings
    When the user navigates to "/settings"
    And the user clicks "Profile"
    Then the page title should be "Profile Settings"
`;

// Run the feature
cucumber.runFeature(featureContent).then(result => {
    console.log('\n=== Test Report ===');
    const report = cucumber.generateReport();
    console.log(`Features: ${report.features}`);
    console.log(`Scenarios: ${report.scenarios.passed}/${report.scenarios.total} passed`);
    console.log(`Pass Rate: ${report.passRate}`);
});

/**
 * Best Practices for Cucumber Testing:
 *
 * 1. Write scenarios from the user's perspective, not implementation details
 * 2. Keep scenarios focused on one behavior or outcome
 * 3. Use declarative language - describe what, not how
 * 4. Reuse step definitions through parameterization
 * 5. Organize features by business capability, not technical component
 * 6. Avoid technical jargon in Gherkin scenarios
 * 7. Use Background for common Given steps within a feature
 * 8. Use Scenario Outlines for data-driven testing
 * 9. Keep step definitions simple - delegate to page objects or helpers
 * 10. Collaborate with stakeholders when writing scenarios
 */
