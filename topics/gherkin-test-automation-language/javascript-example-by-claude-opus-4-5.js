/**
 * Gherkin - Test Automation Language for BDD
 *
 * Gherkin is a plain-text language for writing test scenarios in
 * behavior-driven development (BDD) frameworks like Cucumber. It uses
 * simple English keywords (Given-When-Then) to describe software behavior,
 * making tests accessible to all stakeholders.
 *
 * Key Concepts:
 * - Given: Initial context or preconditions
 * - When: Action or event that triggers behavior
 * - Then: Expected outcome or result
 * - Feature files organize scenarios
 */

/**
 * GherkinStep represents a single step in a scenario.
 * Contains keyword, text, and optional data table.
 */
class GherkinStep {
    constructor(keyword, text, options = {}) {
        this.keyword = keyword; // Given, When, Then, And, But
        this.text = text;
        this.dataTable = options.dataTable;
        this.docString = options.docString;
        this.lineNumber = options.lineNumber;
    }

    /**
     * Formats the step as Gherkin text
     * @returns {string} Formatted step
     */
    format() {
        let result = `${this.keyword} ${this.text}`;

        if (this.docString) {
            result += `\n      """\n      ${this.docString}\n      """`;
        }

        if (this.dataTable) {
            result += '\n' + this.formatDataTable();
        }

        return result;
    }

    /**
     * Formats data table as Gherkin text
     * @returns {string} Formatted table
     */
    formatDataTable() {
        if (!this.dataTable || this.dataTable.length === 0) return '';

        const colWidths = [];
        for (const row of this.dataTable) {
            row.forEach((cell, i) => {
                colWidths[i] = Math.max(colWidths[i] || 0, String(cell).length);
            });
        }

        return this.dataTable.map(row => {
            const cells = row.map((cell, i) => String(cell).padEnd(colWidths[i]));
            return `      | ${cells.join(' | ')} |`;
        }).join('\n');
    }

    /**
     * Extracts parameters from step text using pattern
     * @param {RegExp} pattern - Pattern to match
     * @returns {Array|null} Extracted parameters
     */
    extractParameters(pattern) {
        const match = this.text.match(pattern);
        return match ? match.slice(1) : null;
    }
}

/**
 * GherkinScenario represents a test scenario.
 * Contains steps and optional examples for outlines.
 */
class GherkinScenario {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description;
        this.tags = options.tags || [];
        this.steps = [];
        this.examples = options.examples;
        this.isOutline = options.isOutline || false;
        this.lineNumber = options.lineNumber;
    }

    /**
     * Adds a step to the scenario
     * @param {string} keyword - Step keyword
     * @param {string} text - Step text
     * @param {Object} options - Step options
     * @returns {GherkinScenario} This scenario for chaining
     */
    addStep(keyword, text, options = {}) {
        this.steps.push(new GherkinStep(keyword, text, options));
        return this;
    }

    /**
     * Shorthand for Given step
     * @param {string} text - Step text
     * @param {Object} options - Step options
     * @returns {GherkinScenario} This scenario
     */
    given(text, options = {}) {
        return this.addStep('Given', text, options);
    }

    /**
     * Shorthand for When step
     * @param {string} text - Step text
     * @param {Object} options - Step options
     * @returns {GherkinScenario} This scenario
     */
    when(text, options = {}) {
        return this.addStep('When', text, options);
    }

    /**
     * Shorthand for Then step
     * @param {string} text - Step text
     * @param {Object} options - Step options
     * @returns {GherkinScenario} This scenario
     */
    then(text, options = {}) {
        return this.addStep('Then', text, options);
    }

    /**
     * Shorthand for And step
     * @param {string} text - Step text
     * @param {Object} options - Step options
     * @returns {GherkinScenario} This scenario
     */
    and(text, options = {}) {
        return this.addStep('And', text, options);
    }

    /**
     * Shorthand for But step
     * @param {string} text - Step text
     * @param {Object} options - Step options
     * @returns {GherkinScenario} This scenario
     */
    but(text, options = {}) {
        return this.addStep('But', text, options);
    }

    /**
     * Sets examples for scenario outline
     * @param {Object} examples - Examples object with header and rows
     * @returns {GherkinScenario} This scenario
     */
    withExamples(examples) {
        this.examples = examples;
        this.isOutline = true;
        return this;
    }

    /**
     * Formats the scenario as Gherkin text
     * @returns {string} Formatted scenario
     */
    format() {
        let result = '';

        if (this.tags.length > 0) {
            result += `  ${this.tags.map(t => `@${t}`).join(' ')}\n`;
        }

        const keyword = this.isOutline ? 'Scenario Outline' : 'Scenario';
        result += `  ${keyword}: ${this.name}\n`;

        if (this.description) {
            result += `    ${this.description}\n`;
        }

        for (const step of this.steps) {
            result += `    ${step.format()}\n`;
        }

        if (this.examples) {
            result += '\n    Examples:\n';
            result += this.formatExamples();
        }

        return result;
    }

    /**
     * Formats examples table
     * @returns {string} Formatted examples
     */
    formatExamples() {
        if (!this.examples) return '';

        const { headers, rows } = this.examples;
        const allRows = [headers, ...rows];

        const colWidths = headers.map((_, i) =>
            Math.max(...allRows.map(row => String(row[i]).length))
        );

        return allRows.map(row => {
            const cells = row.map((cell, i) => String(cell).padEnd(colWidths[i]));
            return `      | ${cells.join(' | ')} |`;
        }).join('\n') + '\n';
    }

    /**
     * Generates concrete scenarios from outline
     * @returns {Array<GherkinScenario>} Concrete scenarios
     */
    expandOutline() {
        if (!this.isOutline || !this.examples) return [this];

        const { headers, rows } = this.examples;
        const scenarios = [];

        for (const row of rows) {
            const scenario = new GherkinScenario(
                this.substituteParameters(this.name, headers, row),
                { tags: this.tags }
            );

            for (const step of this.steps) {
                const newText = this.substituteParameters(step.text, headers, row);
                scenario.addStep(step.keyword, newText, {
                    dataTable: step.dataTable,
                    docString: step.docString
                });
            }

            scenarios.push(scenario);
        }

        return scenarios;
    }

    /**
     * Substitutes parameters in text
     * @param {string} text - Text with placeholders
     * @param {Array} headers - Parameter names
     * @param {Array} values - Parameter values
     * @returns {string} Substituted text
     */
    substituteParameters(text, headers, values) {
        let result = text;
        headers.forEach((header, i) => {
            result = result.replace(new RegExp(`<${header}>`, 'g'), values[i]);
        });
        return result;
    }
}

/**
 * GherkinFeature represents a feature file.
 * Contains background, scenarios, and metadata.
 */
class GherkinFeature {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description;
        this.tags = options.tags || [];
        this.background = null;
        this.scenarios = [];
        this.rules = [];
    }

    /**
     * Sets the background for all scenarios
     * @param {GherkinScenario} background - Background scenario
     */
    setBackground(background) {
        this.background = background;
    }

    /**
     * Adds a scenario to the feature
     * @param {GherkinScenario} scenario - Scenario to add
     */
    addScenario(scenario) {
        this.scenarios.push(scenario);
    }

    /**
     * Creates and adds a new scenario
     * @param {string} name - Scenario name
     * @param {Object} options - Scenario options
     * @returns {GherkinScenario} New scenario
     */
    scenario(name, options = {}) {
        const scenario = new GherkinScenario(name, options);
        this.scenarios.push(scenario);
        return scenario;
    }

    /**
     * Creates and adds a scenario outline
     * @param {string} name - Scenario name
     * @param {Object} options - Scenario options
     * @returns {GherkinScenario} New scenario outline
     */
    scenarioOutline(name, options = {}) {
        const scenario = new GherkinScenario(name, { ...options, isOutline: true });
        this.scenarios.push(scenario);
        return scenario;
    }

    /**
     * Formats the feature as Gherkin text
     * @returns {string} Formatted feature
     */
    format() {
        let result = '';

        if (this.tags.length > 0) {
            result += `${this.tags.map(t => `@${t}`).join(' ')}\n`;
        }

        result += `Feature: ${this.name}\n`;

        if (this.description) {
            result += `  ${this.description}\n`;
        }

        result += '\n';

        if (this.background) {
            result += '  Background:\n';
            for (const step of this.background.steps) {
                result += `    ${step.format()}\n`;
            }
            result += '\n';
        }

        for (const scenario of this.scenarios) {
            result += scenario.format();
            result += '\n';
        }

        return result;
    }

    /**
     * Gets scenarios by tag
     * @param {string} tag - Tag to filter by
     * @returns {Array} Matching scenarios
     */
    getScenariosByTag(tag) {
        return this.scenarios.filter(s =>
            s.tags.includes(tag) || this.tags.includes(tag)
        );
    }
}

/**
 * StepDefinition links Gherkin steps to code.
 * Matches step patterns to implementation functions.
 */
class StepDefinition {
    constructor(pattern, implementation) {
        this.pattern = pattern;
        this.implementation = implementation;
        this.type = this.detectType(pattern);
    }

    /**
     * Detects pattern type
     * @param {*} pattern - Step pattern
     * @returns {string} Pattern type
     */
    detectType(pattern) {
        if (pattern instanceof RegExp) return 'regex';
        if (typeof pattern === 'string' && pattern.includes('{')) return 'cucumber-expression';
        return 'string';
    }

    /**
     * Checks if step matches this definition
     * @param {GherkinStep} step - Step to match
     * @returns {boolean} True if matches
     */
    matches(step) {
        if (this.pattern instanceof RegExp) {
            return this.pattern.test(step.text);
        }
        return step.text === this.pattern;
    }

    /**
     * Extracts arguments from step
     * @param {GherkinStep} step - Step to extract from
     * @returns {Array} Extracted arguments
     */
    extractArguments(step) {
        if (this.pattern instanceof RegExp) {
            const match = step.text.match(this.pattern);
            return match ? match.slice(1) : [];
        }
        return [];
    }

    /**
     * Executes the step implementation
     * @param {GherkinStep} step - Step to execute
     * @param {Object} context - Execution context
     * @returns {Promise<void>}
     */
    async execute(step, context) {
        const args = this.extractArguments(step);
        return this.implementation.call(context, ...args, step.dataTable, step.docString);
    }
}

/**
 * StepDefinitionRegistry manages step definitions.
 * Provides matching and execution capabilities.
 */
class StepDefinitionRegistry {
    constructor() {
        this.definitions = [];
    }

    /**
     * Registers a step definition
     * @param {*} pattern - Step pattern
     * @param {Function} implementation - Implementation function
     */
    register(pattern, implementation) {
        this.definitions.push(new StepDefinition(pattern, implementation));
    }

    /**
     * Finds matching definition for step
     * @param {GherkinStep} step - Step to match
     * @returns {StepDefinition|null} Matching definition
     */
    findMatch(step) {
        return this.definitions.find(def => def.matches(step));
    }

    /**
     * Checks for ambiguous matches
     * @param {GherkinStep} step - Step to check
     * @returns {Array} All matching definitions
     */
    findAllMatches(step) {
        return this.definitions.filter(def => def.matches(step));
    }
}

/**
 * GherkinRunner executes Gherkin features.
 * Coordinates step definitions and reporting.
 */
class GherkinRunner {
    constructor() {
        this.registry = new StepDefinitionRegistry();
        this.hooks = {
            beforeScenario: [],
            afterScenario: [],
            beforeStep: [],
            afterStep: []
        };
        this.results = [];
    }

    /**
     * Registers Given step definition
     * @param {*} pattern - Step pattern
     * @param {Function} fn - Implementation
     */
    Given(pattern, fn) {
        this.registry.register(pattern, fn);
    }

    /**
     * Registers When step definition
     * @param {*} pattern - Step pattern
     * @param {Function} fn - Implementation
     */
    When(pattern, fn) {
        this.registry.register(pattern, fn);
    }

    /**
     * Registers Then step definition
     * @param {*} pattern - Step pattern
     * @param {Function} fn - Implementation
     */
    Then(pattern, fn) {
        this.registry.register(pattern, fn);
    }

    /**
     * Adds a hook
     * @param {string} type - Hook type
     * @param {Function} fn - Hook function
     */
    addHook(type, fn) {
        if (this.hooks[type]) {
            this.hooks[type].push(fn);
        }
    }

    /**
     * Runs a feature
     * @param {GherkinFeature} feature - Feature to run
     * @returns {Promise<Object>} Feature results
     */
    async runFeature(feature) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Feature: ${feature.name}`);
        console.log(`${'='.repeat(50)}`);

        const featureResult = {
            name: feature.name,
            scenarios: [],
            passed: 0,
            failed: 0
        };

        for (const scenario of feature.scenarios) {
            // Expand scenario outlines
            const concreteScenarios = scenario.expandOutline();

            for (const concreteScenario of concreteScenarios) {
                const result = await this.runScenario(concreteScenario, feature.background);
                featureResult.scenarios.push(result);

                if (result.passed) {
                    featureResult.passed++;
                } else {
                    featureResult.failed++;
                }
            }
        }

        this.results.push(featureResult);
        return featureResult;
    }

    /**
     * Runs a scenario
     * @param {GherkinScenario} scenario - Scenario to run
     * @param {GherkinScenario} background - Optional background
     * @returns {Promise<Object>} Scenario result
     */
    async runScenario(scenario, background) {
        console.log(`\n  Scenario: ${scenario.name}`);

        const context = {};
        const stepResults = [];

        // Run beforeScenario hooks
        for (const hook of this.hooks.beforeScenario) {
            await hook(scenario, context);
        }

        try {
            // Run background steps
            if (background) {
                for (const step of background.steps) {
                    const result = await this.runStep(step, context);
                    stepResults.push(result);
                    if (!result.passed) throw new Error(result.error);
                }
            }

            // Run scenario steps
            for (const step of scenario.steps) {
                const result = await this.runStep(step, context);
                stepResults.push(result);
                if (!result.passed) throw new Error(result.error);
            }

            // Run afterScenario hooks
            for (const hook of this.hooks.afterScenario) {
                await hook(scenario, context);
            }

            console.log('    Status: PASSED');
            return { name: scenario.name, passed: true, stepResults };

        } catch (error) {
            console.log(`    Status: FAILED - ${error.message}`);
            return { name: scenario.name, passed: false, error: error.message, stepResults };
        }
    }

    /**
     * Runs a single step
     * @param {GherkinStep} step - Step to run
     * @param {Object} context - Execution context
     * @returns {Promise<Object>} Step result
     */
    async runStep(step, context) {
        const definition = this.registry.findMatch(step);

        if (!definition) {
            console.log(`    ${step.keyword} ${step.text} - UNDEFINED`);
            return { step: step.text, passed: false, error: 'Step definition not found' };
        }

        try {
            for (const hook of this.hooks.beforeStep) {
                await hook(step, context);
            }

            await definition.execute(step, context);

            for (const hook of this.hooks.afterStep) {
                await hook(step, context);
            }

            console.log(`    ${step.keyword} ${step.text} - PASSED`);
            return { step: step.text, passed: true };

        } catch (error) {
            console.log(`    ${step.keyword} ${step.text} - FAILED`);
            return { step: step.text, passed: false, error: error.message };
        }
    }

    /**
     * Gets execution statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        let totalPassed = 0;
        let totalFailed = 0;

        for (const feature of this.results) {
            totalPassed += feature.passed;
            totalFailed += feature.failed;
        }

        return {
            features: this.results.length,
            scenarios: totalPassed + totalFailed,
            passed: totalPassed,
            failed: totalFailed,
            passRate: `${((totalPassed / (totalPassed + totalFailed)) * 100 || 0).toFixed(1)}%`
        };
    }
}

// Demonstration
console.log('=== Gherkin Test Automation Language Demo ===');

// Create a feature
const loginFeature = new GherkinFeature('User Authentication', {
    description: 'As a user, I want to log in to access my account',
    tags: ['authentication', 'login']
});

// Add background
const background = new GherkinScenario('Background');
background.given('the application is running');
background.and('the user is on the login page');
loginFeature.setBackground(background);

// Add scenario
loginFeature.scenario('Successful login with valid credentials', { tags: ['smoke'] })
    .given('I have a registered account')
    .when('I enter valid username "testuser"')
    .and('I enter valid password "password123"')
    .and('I click the login button')
    .then('I should be redirected to the dashboard')
    .and('I should see a welcome message');

// Add scenario outline
loginFeature.scenarioOutline('Login with various credentials', { tags: ['regression'] })
    .given('I have a registered account')
    .when('I enter username "<username>"')
    .and('I enter password "<password>"')
    .and('I click the login button')
    .then('I should see "<result>"')
    .withExamples({
        headers: ['username', 'password', 'result'],
        rows: [
            ['testuser', 'password123', 'dashboard'],
            ['admin', 'admin123', 'admin panel'],
            ['invalid', 'wrong', 'error message']
        ]
    });

// Print formatted feature
console.log('\n--- Formatted Feature File ---');
console.log(loginFeature.format());

// Create runner and register step definitions
const runner = new GherkinRunner();

runner.Given(/the application is running/, function() {
    this.app = { running: true };
});

runner.Given(/the user is on the login page/, function() {
    this.currentPage = 'login';
});

runner.Given(/I have a registered account/, function() {
    this.hasAccount = true;
});

runner.When(/I enter valid username "(.+)"/, function(username) {
    this.username = username;
});

runner.When(/I enter username "(.+)"/, function(username) {
    this.username = username;
});

runner.When(/I enter valid password "(.+)"/, function(password) {
    this.password = password;
});

runner.When(/I enter password "(.+)"/, function(password) {
    this.password = password;
});

runner.When(/I click the login button/, function() {
    this.clicked = true;
});

runner.Then(/I should be redirected to the dashboard/, function() {
    this.currentPage = 'dashboard';
});

runner.Then(/I should see a welcome message/, function() {
    this.welcomeShown = true;
});

runner.Then(/I should see "(.+)"/, function(result) {
    this.result = result;
});

// Run the feature
runner.runFeature(loginFeature).then(results => {
    console.log('\n--- Execution Results ---');
    console.log('Statistics:', runner.getStatistics());
});

/**
 * Best Practices for Gherkin:
 *
 * 1. Write scenarios from the user's perspective
 * 2. Use domain language understood by stakeholders
 * 3. Keep scenarios focused on single behaviors
 * 4. Use Background for common preconditions
 * 5. Use Scenario Outline for data-driven tests
 * 6. Tag scenarios for organization and filtering
 * 7. Make step definitions reusable
 * 8. Avoid technical implementation details in steps
 * 9. Keep scenarios short and readable
 * 10. Review scenarios with stakeholders regularly
 */
