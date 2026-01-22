/**
 * Functional Testing - Verifying Application Behavior
 *
 * Functional testing verifies that applications perform their intended
 * functions correctly. This methodology examines software behavior against
 * specified requirements, ensuring features work as expected from an
 * end-user perspective using automated tools and scripts.
 *
 * Key Concepts:
 * - Test against specified requirements
 * - Simulate user interactions
 * - Validate outputs against expected outcomes
 * - Continuous integration support
 */

/**
 * FunctionalTestCase defines a single functional test.
 * Contains steps, expected results, and execution logic.
 */
class FunctionalTestCase {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.feature = options.feature;
        this.priority = options.priority || 'medium';
        this.steps = [];
        this.preconditions = options.preconditions || [];
        this.expectedResults = [];
        this.tags = options.tags || [];
    }

    /**
     * Adds a test step
     * @param {Object} step - Step definition
     */
    addStep(step) {
        this.steps.push({
            order: this.steps.length + 1,
            action: step.action,
            input: step.input,
            expectedResult: step.expectedResult
        });
    }

    /**
     * Adds an expected result
     * @param {Object} result - Expected result definition
     */
    addExpectedResult(result) {
        this.expectedResults.push({
            description: result.description,
            verifier: result.verifier,
            critical: result.critical !== false
        });
    }

    /**
     * Gets test case summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            name: this.name,
            feature: this.feature,
            stepCount: this.steps.length,
            priority: this.priority
        };
    }
}

/**
 * FunctionalTestSuite groups related functional tests.
 * Manages test organization and execution order.
 */
class FunctionalTestSuite {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description;
        this.tests = [];
        this.setup = options.setup;
        this.teardown = options.teardown;
        this.tags = options.tags || [];
    }

    /**
     * Adds a test to the suite
     * @param {FunctionalTestCase} test - Test to add
     */
    addTest(test) {
        this.tests.push(test);
    }

    /**
     * Gets tests by tag
     * @param {string} tag - Tag to filter by
     * @returns {Array} Matching tests
     */
    getTestsByTag(tag) {
        return this.tests.filter(t => t.tags.includes(tag));
    }

    /**
     * Gets tests by priority
     * @param {string} priority - Priority level
     * @returns {Array} Matching tests
     */
    getTestsByPriority(priority) {
        return this.tests.filter(t => t.priority === priority);
    }

    /**
     * Gets suite summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            name: this.name,
            testCount: this.tests.length,
            byPriority: {
                high: this.getTestsByPriority('high').length,
                medium: this.getTestsByPriority('medium').length,
                low: this.getTestsByPriority('low').length
            }
        };
    }
}

/**
 * FunctionalTestRunner executes functional tests.
 * Handles test execution, result collection, and reporting.
 */
class FunctionalTestRunner {
    constructor(options = {}) {
        this.browser = options.browser || 'chrome';
        this.timeout = options.timeout || 30000;
        this.retryCount = options.retryCount || 0;
        this.results = [];
        this.hooks = {
            beforeAll: [],
            afterAll: [],
            beforeEach: [],
            afterEach: []
        };
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
     * Runs hooks of a specific type
     * @param {string} type - Hook type
     * @param {Object} context - Context to pass to hooks
     */
    async runHooks(type, context) {
        for (const hook of this.hooks[type]) {
            await hook(context);
        }
    }

    /**
     * Runs a test suite
     * @param {FunctionalTestSuite} suite - Suite to run
     * @returns {Promise<Object>} Suite results
     */
    async runSuite(suite) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Functional Test Suite: ${suite.name}`);
        console.log(`${'='.repeat(50)}`);

        const suiteResult = {
            name: suite.name,
            startTime: Date.now(),
            tests: [],
            passed: 0,
            failed: 0
        };

        // Run suite setup
        if (suite.setup) {
            await suite.setup();
        }
        await this.runHooks('beforeAll', { suite });

        // Run each test
        for (const test of suite.tests) {
            await this.runHooks('beforeEach', { test });
            const result = await this.runTest(test);
            suiteResult.tests.push(result);

            if (result.passed) {
                suiteResult.passed++;
            } else {
                suiteResult.failed++;
            }

            await this.runHooks('afterEach', { test, result });
        }

        // Run suite teardown
        await this.runHooks('afterAll', { suite, results: suiteResult });
        if (suite.teardown) {
            await suite.teardown();
        }

        suiteResult.duration = Date.now() - suiteResult.startTime;
        this.results.push(suiteResult);

        return suiteResult;
    }

    /**
     * Runs a single test
     * @param {FunctionalTestCase} test - Test to run
     * @returns {Promise<Object>} Test result
     */
    async runTest(test) {
        console.log(`\n  Test: ${test.name}`);
        const startTime = Date.now();

        let attempts = 0;
        let lastError = null;

        while (attempts <= this.retryCount) {
            try {
                // Execute test steps
                const stepResults = [];
                for (const step of test.steps) {
                    const stepResult = await this.executeStep(step);
                    stepResults.push(stepResult);

                    if (!stepResult.passed) {
                        throw new Error(`Step ${step.order} failed: ${stepResult.error}`);
                    }
                }

                // Verify expected results
                const verificationResults = [];
                for (const expected of test.expectedResults) {
                    const result = await this.verifyExpectation(expected);
                    verificationResults.push(result);
                }

                const allVerified = verificationResults.every(v => v.passed);

                console.log(`    ${allVerified ? '✓' : '✗'} ${allVerified ? 'PASSED' : 'FAILED'}`);

                return {
                    testId: test.id,
                    testName: test.name,
                    passed: allVerified,
                    duration: Date.now() - startTime,
                    stepResults,
                    verificationResults,
                    attempts: attempts + 1
                };

            } catch (error) {
                lastError = error;
                attempts++;

                if (attempts <= this.retryCount) {
                    console.log(`    Retrying (${attempts}/${this.retryCount})...`);
                }
            }
        }

        console.log(`    ✗ FAILED: ${lastError.message}`);

        return {
            testId: test.id,
            testName: test.name,
            passed: false,
            duration: Date.now() - startTime,
            error: lastError.message,
            attempts
        };
    }

    /**
     * Executes a single test step
     * @param {Object} step - Step to execute
     * @returns {Promise<Object>} Step result
     */
    async executeStep(step) {
        console.log(`    Step ${step.order}: ${step.action}`);

        try {
            // Simulate step execution
            await new Promise(resolve => setTimeout(resolve, 50));

            return {
                step: step.order,
                action: step.action,
                passed: true
            };
        } catch (error) {
            return {
                step: step.order,
                action: step.action,
                passed: false,
                error: error.message
            };
        }
    }

    /**
     * Verifies an expected result
     * @param {Object} expected - Expected result to verify
     * @returns {Promise<Object>} Verification result
     */
    async verifyExpectation(expected) {
        try {
            const passed = expected.verifier ? await expected.verifier() : true;
            return {
                description: expected.description,
                passed,
                critical: expected.critical
            };
        } catch (error) {
            return {
                description: expected.description,
                passed: false,
                error: error.message,
                critical: expected.critical
            };
        }
    }

    /**
     * Gets overall test statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        let totalPassed = 0;
        let totalFailed = 0;
        let totalDuration = 0;

        for (const suite of this.results) {
            totalPassed += suite.passed;
            totalFailed += suite.failed;
            totalDuration += suite.duration;
        }

        return {
            suites: this.results.length,
            totalTests: totalPassed + totalFailed,
            passed: totalPassed,
            failed: totalFailed,
            passRate: `${((totalPassed / (totalPassed + totalFailed)) * 100 || 0).toFixed(1)}%`,
            totalDuration: `${totalDuration}ms`
        };
    }
}

/**
 * UserInteractionSimulator simulates user actions.
 * Provides methods for common UI interactions.
 */
class UserInteractionSimulator {
    constructor(page) {
        this.page = page;
        this.actions = [];
    }

    /**
     * Records an action
     * @param {string} type - Action type
     * @param {Object} details - Action details
     */
    recordAction(type, details) {
        this.actions.push({
            type,
            details,
            timestamp: Date.now()
        });
    }

    /**
     * Clicks an element
     * @param {string} selector - Element selector
     * @returns {Promise<void>}
     */
    async click(selector) {
        this.recordAction('click', { selector });
        console.log(`      Click: ${selector}`);
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    /**
     * Types text into an element
     * @param {string} selector - Element selector
     * @param {string} text - Text to type
     * @returns {Promise<void>}
     */
    async type(selector, text) {
        this.recordAction('type', { selector, text });
        console.log(`      Type: "${text}" into ${selector}`);
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    /**
     * Selects an option from dropdown
     * @param {string} selector - Dropdown selector
     * @param {string} value - Option value
     * @returns {Promise<void>}
     */
    async select(selector, value) {
        this.recordAction('select', { selector, value });
        console.log(`      Select: "${value}" from ${selector}`);
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    /**
     * Navigates to a URL
     * @param {string} url - Target URL
     * @returns {Promise<void>}
     */
    async navigate(url) {
        this.recordAction('navigate', { url });
        console.log(`      Navigate: ${url}`);
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    /**
     * Waits for an element
     * @param {string} selector - Element selector
     * @param {number} timeout - Timeout in ms
     * @returns {Promise<void>}
     */
    async waitFor(selector, timeout = 5000) {
        this.recordAction('waitFor', { selector, timeout });
        console.log(`      Wait for: ${selector}`);
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    /**
     * Gets element text
     * @param {string} selector - Element selector
     * @returns {Promise<string>} Element text
     */
    async getText(selector) {
        this.recordAction('getText', { selector });
        return 'Simulated text';
    }

    /**
     * Gets recorded actions
     * @returns {Array} Actions
     */
    getActions() {
        return this.actions;
    }
}

/**
 * FunctionalTestReporter generates test reports.
 * Supports multiple output formats.
 */
class FunctionalTestReporter {
    /**
     * Generates console report
     * @param {Object} results - Test results
     */
    static consoleReport(results) {
        console.log('\n' + '='.repeat(60));
        console.log('FUNCTIONAL TEST REPORT');
        console.log('='.repeat(60));

        for (const suite of results.results || [results]) {
            console.log(`\nSuite: ${suite.name}`);
            console.log(`Duration: ${suite.duration}ms`);
            console.log(`Passed: ${suite.passed} | Failed: ${suite.failed}`);

            for (const test of suite.tests) {
                const icon = test.passed ? '✓' : '✗';
                console.log(`  ${icon} ${test.testName} (${test.duration}ms)`);
                if (test.error) {
                    console.log(`      Error: ${test.error}`);
                }
            }
        }

        console.log('\n' + '='.repeat(60));
    }

    /**
     * Generates JSON report
     * @param {Object} results - Test results
     * @returns {string} JSON report
     */
    static jsonReport(results) {
        return JSON.stringify(results, null, 2);
    }

    /**
     * Generates JUnit XML format
     * @param {Object} results - Test results
     * @returns {string} JUnit XML
     */
    static junitReport(results) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<testsuites>\n';

        for (const suite of results.results || [results]) {
            xml += `  <testsuite name="${suite.name}" tests="${suite.tests.length}" `;
            xml += `failures="${suite.failed}" time="${suite.duration / 1000}">\n`;

            for (const test of suite.tests) {
                xml += `    <testcase name="${test.testName}" time="${test.duration / 1000}"`;
                if (test.passed) {
                    xml += '/>\n';
                } else {
                    xml += '>\n';
                    xml += `      <failure message="${test.error || 'Test failed'}"/>\n`;
                    xml += '    </testcase>\n';
                }
            }

            xml += '  </testsuite>\n';
        }

        xml += '</testsuites>';
        return xml;
    }
}

// Demonstration
console.log('=== Functional Testing Demo ===');

// Create test cases
const loginTest = new FunctionalTestCase({
    id: 'FT-001',
    name: 'User Login with Valid Credentials',
    description: 'Verify that users can log in with valid username and password',
    feature: 'Authentication',
    priority: 'high',
    tags: ['login', 'smoke']
});

loginTest.addStep({
    action: 'Navigate to login page',
    expectedResult: 'Login form is displayed'
});

loginTest.addStep({
    action: 'Enter valid username',
    input: 'testuser@example.com',
    expectedResult: 'Username field populated'
});

loginTest.addStep({
    action: 'Enter valid password',
    input: '********',
    expectedResult: 'Password field populated'
});

loginTest.addStep({
    action: 'Click login button',
    expectedResult: 'Login request submitted'
});

loginTest.addExpectedResult({
    description: 'User is redirected to dashboard',
    verifier: async () => true,
    critical: true
});

loginTest.addExpectedResult({
    description: 'Welcome message displays username',
    verifier: async () => true,
    critical: false
});

// Create another test
const logoutTest = new FunctionalTestCase({
    id: 'FT-002',
    name: 'User Logout',
    description: 'Verify that logged-in users can log out successfully',
    feature: 'Authentication',
    priority: 'high',
    tags: ['logout', 'smoke']
});

logoutTest.addStep({
    action: 'Click user menu',
    expectedResult: 'Dropdown menu appears'
});

logoutTest.addStep({
    action: 'Click logout option',
    expectedResult: 'Logout request submitted'
});

logoutTest.addExpectedResult({
    description: 'User is redirected to login page',
    verifier: async () => true,
    critical: true
});

// Create test suite
const authSuite = new FunctionalTestSuite('Authentication', {
    description: 'Tests for user authentication features',
    tags: ['auth']
});

authSuite.addTest(loginTest);
authSuite.addTest(logoutTest);

console.log('\nSuite Summary:', authSuite.getSummary());

// Run tests
const runner = new FunctionalTestRunner({
    browser: 'chrome',
    timeout: 30000,
    retryCount: 1
});

runner.addHook('beforeEach', async ({ test }) => {
    console.log(`    [Hook] Preparing: ${test.name}`);
});

runner.runSuite(authSuite).then(results => {
    console.log('\n--- Test Results ---');
    FunctionalTestReporter.consoleReport(results);
    console.log('\nStatistics:', runner.getStatistics());
});

/**
 * Best Practices for Functional Testing:
 *
 * 1. Base tests on requirements, not implementation
 * 2. Use meaningful test case names and descriptions
 * 3. Keep tests independent and isolated
 * 4. Include both positive and negative test cases
 * 5. Maintain test data separately from test logic
 * 6. Use page object pattern for UI tests
 * 7. Implement proper waiting strategies
 * 8. Include tests in CI/CD pipelines
 * 9. Regularly review and update tests
 * 10. Balance coverage with maintenance cost
 */
