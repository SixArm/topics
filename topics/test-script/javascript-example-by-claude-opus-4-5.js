/**
 * Test Script - Automated Instructions for Test Execution
 *
 * A test script in software testing automation is a set of instructions written
 * in a programming or scripting language that automatically executes test cases
 * to verify software functionality. Test scripts eliminate manual testing by
 * programmatically interacting with applications, validating behaviors, and
 * reporting results.
 *
 * Key Concepts:
 * - Setup and teardown procedures
 * - Test data preparation
 * - Execution steps and validation
 * - Error handling and reporting
 */

/**
 * TestScript represents an automated test script.
 */
class TestScript {
    constructor(options) {
        this.id = options.id || `TS-${Date.now()}`;
        this.name = options.name;
        this.description = options.description;
        this.author = options.author;
        this.version = options.version || '1.0';
        this.tags = options.tags || [];
        this.setup = options.setup || [];
        this.steps = [];
        this.teardown = options.teardown || [];
        this.testData = options.testData || {};
        this.status = 'not_executed';
        this.createdAt = new Date();
    }

    /**
     * Adds a setup step
     * @param {string} action - Setup action
     * @param {Function} executor - Setup executor
     */
    addSetup(action, executor) {
        this.setup.push({ action, executor });
    }

    /**
     * Adds a test step
     * @param {string} action - Step action
     * @param {Function} executor - Step executor
     * @param {string} expected - Expected result
     */
    addStep(action, executor, expected) {
        this.steps.push({
            stepNumber: this.steps.length + 1,
            action,
            executor,
            expected,
            actual: null,
            status: 'pending'
        });
    }

    /**
     * Adds a teardown step
     * @param {string} action - Teardown action
     * @param {Function} executor - Teardown executor
     */
    addTeardown(action, executor) {
        this.teardown.push({ action, executor });
    }

    /**
     * Sets test data
     * @param {Object} data - Test data
     */
    setTestData(data) {
        this.testData = { ...this.testData, ...data };
    }

    /**
     * Executes the test script
     * @returns {Object} Execution result
     */
    async execute() {
        const startTime = Date.now();
        const results = {
            setup: [],
            steps: [],
            teardown: [],
            errors: []
        };

        this.status = 'running';

        // Execute setup
        for (const setup of this.setup) {
            try {
                await setup.executor(this.testData);
                results.setup.push({ action: setup.action, status: 'passed' });
            } catch (error) {
                results.setup.push({ action: setup.action, status: 'failed', error: error.message });
                results.errors.push({ phase: 'setup', error: error.message });
            }
        }

        // Execute test steps if setup succeeded
        if (results.errors.length === 0) {
            for (const step of this.steps) {
                try {
                    const actual = await step.executor(this.testData);
                    step.actual = actual;
                    step.status = 'passed';
                    results.steps.push({
                        stepNumber: step.stepNumber,
                        action: step.action,
                        expected: step.expected,
                        actual,
                        status: 'passed'
                    });
                } catch (error) {
                    step.status = 'failed';
                    step.actual = error.message;
                    results.steps.push({
                        stepNumber: step.stepNumber,
                        action: step.action,
                        expected: step.expected,
                        actual: error.message,
                        status: 'failed'
                    });
                    results.errors.push({ phase: 'execution', step: step.stepNumber, error: error.message });
                }
            }
        }

        // Execute teardown (always runs)
        for (const teardown of this.teardown) {
            try {
                await teardown.executor(this.testData);
                results.teardown.push({ action: teardown.action, status: 'passed' });
            } catch (error) {
                results.teardown.push({ action: teardown.action, status: 'failed', error: error.message });
                results.errors.push({ phase: 'teardown', error: error.message });
            }
        }

        const endTime = Date.now();
        const passedSteps = results.steps.filter(s => s.status === 'passed').length;
        this.status = passedSteps === this.steps.length && results.errors.length === 0 ? 'passed' : 'failed';

        return {
            scriptId: this.id,
            scriptName: this.name,
            status: this.status,
            duration: endTime - startTime,
            totalSteps: this.steps.length,
            passedSteps,
            failedSteps: this.steps.length - passedSteps,
            results,
            executedAt: new Date()
        };
    }

    /**
     * Gets script summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            name: this.name,
            version: this.version,
            tags: this.tags,
            setupSteps: this.setup.length,
            testSteps: this.steps.length,
            teardownSteps: this.teardown.length,
            status: this.status
        };
    }
}

/**
 * TestScriptBuilder provides fluent API for building scripts.
 */
class TestScriptBuilder {
    constructor(name) {
        this.options = { name };
        this.setupSteps = [];
        this.testSteps = [];
        this.teardownSteps = [];
    }

    /**
     * Sets description
     * @param {string} description - Script description
     * @returns {TestScriptBuilder} Builder for chaining
     */
    withDescription(description) {
        this.options.description = description;
        return this;
    }

    /**
     * Sets author
     * @param {string} author - Author name
     * @returns {TestScriptBuilder} Builder for chaining
     */
    byAuthor(author) {
        this.options.author = author;
        return this;
    }

    /**
     * Adds tags
     * @param {...string} tags - Tags
     * @returns {TestScriptBuilder} Builder for chaining
     */
    withTags(...tags) {
        this.options.tags = tags;
        return this;
    }

    /**
     * Sets test data
     * @param {Object} data - Test data
     * @returns {TestScriptBuilder} Builder for chaining
     */
    withTestData(data) {
        this.options.testData = data;
        return this;
    }

    /**
     * Adds setup step
     * @param {string} action - Setup action
     * @param {Function} executor - Executor function
     * @returns {TestScriptBuilder} Builder for chaining
     */
    setup(action, executor) {
        this.setupSteps.push({ action, executor });
        return this;
    }

    /**
     * Adds test step
     * @param {string} action - Step action
     * @param {Function} executor - Executor function
     * @param {string} expected - Expected result
     * @returns {TestScriptBuilder} Builder for chaining
     */
    step(action, executor, expected) {
        this.testSteps.push({ action, executor, expected });
        return this;
    }

    /**
     * Adds teardown step
     * @param {string} action - Teardown action
     * @param {Function} executor - Executor function
     * @returns {TestScriptBuilder} Builder for chaining
     */
    teardown(action, executor) {
        this.teardownSteps.push({ action, executor });
        return this;
    }

    /**
     * Builds the test script
     * @returns {TestScript} Built script
     */
    build() {
        const script = new TestScript(this.options);

        this.setupSteps.forEach(s => script.addSetup(s.action, s.executor));
        this.testSteps.forEach(s => script.addStep(s.action, s.executor, s.expected));
        this.teardownSteps.forEach(s => script.addTeardown(s.action, s.executor));

        return script;
    }
}

/**
 * DataDrivenTestScript supports data-driven testing.
 */
class DataDrivenTestScript {
    constructor(baseScript, dataSet) {
        this.baseScript = baseScript;
        this.dataSet = dataSet;
        this.iterations = [];
    }

    /**
     * Executes script with all data sets
     * @returns {Object} Combined results
     */
    async execute() {
        const allResults = [];

        for (let i = 0; i < this.dataSet.length; i++) {
            const data = this.dataSet[i];
            const script = new TestScript({
                ...this.baseScript,
                id: `${this.baseScript.id}-iteration-${i + 1}`,
                name: `${this.baseScript.name} [Data Set ${i + 1}]`,
                testData: data
            });

            // Copy steps
            this.baseScript.setup.forEach(s => script.addSetup(s.action, s.executor));
            this.baseScript.steps.forEach(s => script.addStep(s.action, s.executor, s.expected));
            this.baseScript.teardown.forEach(s => script.addTeardown(s.action, s.executor));

            const result = await script.execute();
            result.dataSet = data;
            result.iteration = i + 1;
            allResults.push(result);

            this.iterations.push({
                iteration: i + 1,
                data,
                status: result.status
            });
        }

        const passed = allResults.filter(r => r.status === 'passed').length;

        return {
            baseScript: this.baseScript.name,
            totalIterations: this.dataSet.length,
            passed,
            failed: this.dataSet.length - passed,
            passRate: ((passed / this.dataSet.length) * 100).toFixed(1) + '%',
            iterations: allResults
        };
    }
}

/**
 * TestScriptRepository manages test scripts.
 */
class TestScriptRepository {
    constructor() {
        this.scripts = new Map();
    }

    /**
     * Saves a script
     * @param {TestScript} script - Script to save
     */
    save(script) {
        this.scripts.set(script.id, script);
    }

    /**
     * Gets script by ID
     * @param {string} id - Script ID
     * @returns {TestScript|null} Script or null
     */
    getById(id) {
        return this.scripts.get(id) || null;
    }

    /**
     * Gets scripts by tag
     * @param {string} tag - Tag to filter by
     * @returns {Array} Matching scripts
     */
    getByTag(tag) {
        return Array.from(this.scripts.values())
            .filter(s => s.tags.includes(tag));
    }

    /**
     * Gets all scripts
     * @returns {Array} All scripts
     */
    getAll() {
        return Array.from(this.scripts.values());
    }

    /**
     * Gets statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const scripts = this.getAll();
        const byStatus = { not_executed: 0, passed: 0, failed: 0, running: 0 };
        const allTags = new Set();

        for (const script of scripts) {
            byStatus[script.status] = (byStatus[script.status] || 0) + 1;
            script.tags.forEach(tag => allTags.add(tag));
        }

        return {
            totalScripts: scripts.length,
            byStatus,
            uniqueTags: Array.from(allTags),
            averageSteps: scripts.length > 0
                ? (scripts.reduce((sum, s) => sum + s.steps.length, 0) / scripts.length).toFixed(1)
                : 0
        };
    }
}

/**
 * TestScriptReporter generates execution reports.
 */
class TestScriptReporter {
    /**
     * Generates summary report
     * @param {Object} result - Execution result
     * @returns {string} Report text
     */
    static generateSummary(result) {
        const lines = [
            `Test Script: ${result.scriptName}`,
            `Status: ${result.status.toUpperCase()}`,
            `Duration: ${result.duration}ms`,
            `Steps: ${result.passedSteps}/${result.totalSteps} passed`,
            ''
        ];

        if (result.results.errors.length > 0) {
            lines.push('Errors:');
            result.results.errors.forEach(e => {
                lines.push(`  - [${e.phase}] ${e.error}`);
            });
        }

        return lines.join('\n');
    }

    /**
     * Generates detailed report
     * @param {Object} result - Execution result
     * @returns {Object} Detailed report
     */
    static generateDetailed(result) {
        return {
            summary: {
                name: result.scriptName,
                status: result.status,
                duration: result.duration + 'ms',
                executed: result.executedAt
            },
            setup: result.results.setup,
            steps: result.results.steps.map(s => ({
                step: s.stepNumber,
                action: s.action,
                status: s.status,
                expected: s.expected,
                actual: s.actual
            })),
            teardown: result.results.teardown,
            errors: result.results.errors
        };
    }

    /**
     * Generates HTML report
     * @param {Object} result - Execution result
     * @returns {string} HTML report
     */
    static generateHTML(result) {
        const statusColor = result.status === 'passed' ? 'green' : 'red';

        return `
<!DOCTYPE html>
<html>
<head>
    <title>Test Report: ${result.scriptName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .passed { color: green; }
        .failed { color: red; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Test Report: ${result.scriptName}</h1>
    <p>Status: <span class="${result.status}">${result.status.toUpperCase()}</span></p>
    <p>Duration: ${result.duration}ms</p>
    <p>Steps: ${result.passedSteps}/${result.totalSteps} passed</p>

    <h2>Test Steps</h2>
    <table>
        <tr><th>Step</th><th>Action</th><th>Status</th></tr>
        ${result.results.steps.map(s => `
        <tr>
            <td>${s.stepNumber}</td>
            <td>${s.action}</td>
            <td class="${s.status}">${s.status}</td>
        </tr>
        `).join('')}
    </table>
</body>
</html>`;
    }
}

/**
 * CommonScriptPatterns provides reusable patterns.
 */
class CommonScriptPatterns {
    /**
     * Creates a login test script
     * @param {Object} config - Configuration
     * @returns {TestScript} Login script
     */
    static createLoginScript(config) {
        return new TestScriptBuilder('Login Test')
            .withDescription('Verify user login functionality')
            .withTags('authentication', 'smoke', 'critical')
            .withTestData({
                url: config.url,
                username: config.username,
                password: config.password
            })
            .setup('Open browser', async (data) => {
                // Simulated browser open
                return { browser: 'opened', url: data.url };
            })
            .step('Navigate to login page', async (data) => {
                return { page: 'login', url: data.url + '/login' };
            }, 'Login page is displayed')
            .step('Enter username', async (data) => {
                return { field: 'username', value: data.username };
            }, 'Username is entered')
            .step('Enter password', async (data) => {
                return { field: 'password', value: '***' };
            }, 'Password is entered')
            .step('Click login button', async () => {
                return { action: 'click', button: 'login' };
            }, 'Login button is clicked')
            .step('Verify successful login', async () => {
                return { loggedIn: true, page: 'dashboard' };
            }, 'User is redirected to dashboard')
            .teardown('Close browser', async () => {
                return { browser: 'closed' };
            })
            .build();
    }

    /**
     * Creates an API test script
     * @param {Object} config - Configuration
     * @returns {TestScript} API script
     */
    static createAPIScript(config) {
        return new TestScriptBuilder('API Test')
            .withDescription('Verify API endpoint')
            .withTags('api', 'integration')
            .withTestData({
                endpoint: config.endpoint,
                method: config.method,
                payload: config.payload
            })
            .step('Send API request', async (data) => {
                // Simulated API call
                return {
                    status: 200,
                    method: data.method,
                    endpoint: data.endpoint
                };
            }, 'API returns 200 status')
            .step('Validate response structure', async () => {
                return { valid: true, schema: 'matches' };
            }, 'Response matches expected schema')
            .step('Validate response data', async () => {
                return { data: 'correct' };
            }, 'Response data is correct')
            .build();
    }
}

// Demonstration
console.log('=== Test Script Demo ===\n');

// Create test script using builder
console.log('--- Test Script Creation ---');
const loginScript = CommonScriptPatterns.createLoginScript({
    url: 'https://example.com',
    username: 'testuser',
    password: 'Test@123'
});

console.log('Script Summary:', loginScript.getSummary());

// Execute the script
console.log('\n--- Script Execution ---');
loginScript.execute().then(result => {
    console.log('Execution Result:', {
        status: result.status,
        duration: result.duration + 'ms',
        steps: `${result.passedSteps}/${result.totalSteps} passed`
    });

    // Generate reports
    console.log('\n--- Summary Report ---');
    console.log(TestScriptReporter.generateSummary(result));

    console.log('\n--- Detailed Report ---');
    console.log(TestScriptReporter.generateDetailed(result));
});

// Data-driven testing
console.log('\n--- Data-Driven Testing ---');
const apiScript = new TestScript({
    name: 'User API Test',
    description: 'Test user API with multiple data sets'
});

apiScript.addStep('Validate user data', async (data) => {
    if (!data.email.includes('@')) throw new Error('Invalid email');
    return { valid: true, user: data.username };
}, 'User data is valid');

const dataSets = [
    { username: 'alice', email: 'alice@test.com' },
    { username: 'bob', email: 'bob@test.com' },
    { username: 'charlie', email: 'invalid-email' } // This will fail
];

const ddTest = new DataDrivenTestScript(apiScript, dataSets);
ddTest.execute().then(result => {
    console.log('Data-Driven Results:', {
        total: result.totalIterations,
        passed: result.passed,
        failed: result.failed,
        passRate: result.passRate
    });
});

// Repository management
console.log('\n--- Script Repository ---');
const repository = new TestScriptRepository();
repository.save(loginScript);
repository.save(CommonScriptPatterns.createAPIScript({
    endpoint: '/api/users',
    method: 'GET'
}));

console.log('Repository Stats:', repository.getStatistics());
console.log('Scripts by tag "authentication":',
    repository.getByTag('authentication').map(s => s.name));

/**
 * Best Practices for Test Scripts:
 *
 * 1. Keep scripts modular and reusable
 * 2. Include proper setup and teardown
 * 3. Use descriptive names and comments
 * 4. Handle errors gracefully
 * 5. Implement data-driven approaches
 * 6. Maintain scripts alongside code
 * 7. Use page object patterns for UI tests
 * 8. Keep execution time reasonable
 * 9. Log sufficient detail for debugging
 * 10. Version control test scripts
 */
