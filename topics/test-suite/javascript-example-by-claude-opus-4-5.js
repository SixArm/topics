/**
 * Test Suite - Comprehensive Collection of Test Cases
 *
 * A test suite is a comprehensive collection of test cases designed to verify
 * that a software application functions correctly and meets specified requirements.
 * It serves as an automated framework that systematically executes multiple tests
 * to identify bugs, validate functionality, and ensure software quality.
 *
 * Key Concepts:
 * - Organized test collections
 * - Multiple testing types
 * - CI/CD integration
 * - Coverage and reporting
 */

/**
 * TestSuiteType defines different types of test suites.
 */
class TestSuiteType {
    static types = {
        unit: {
            name: 'Unit Test Suite',
            description: 'Tests individual components in isolation',
            scope: 'Functions, methods, classes',
            runFrequency: 'Every commit',
            characteristics: ['Fast execution', 'High isolation', 'Many tests']
        },
        integration: {
            name: 'Integration Test Suite',
            description: 'Tests component interactions',
            scope: 'Module integrations, API contracts',
            runFrequency: 'Every build',
            characteristics: ['Medium speed', 'Tests interfaces', 'Catches integration issues']
        },
        functional: {
            name: 'Functional Test Suite',
            description: 'Tests complete features',
            scope: 'User stories, requirements',
            runFrequency: 'Daily/nightly',
            characteristics: ['End-to-end flows', 'Business logic', 'User perspective']
        },
        regression: {
            name: 'Regression Test Suite',
            description: 'Tests existing functionality after changes',
            scope: 'All critical paths',
            runFrequency: 'Before release',
            characteristics: ['Comprehensive', 'Stability focused', 'Change detection']
        },
        smoke: {
            name: 'Smoke Test Suite',
            description: 'Quick validation of critical functionality',
            scope: 'Core features only',
            runFrequency: 'Every deployment',
            characteristics: ['Fast', 'High priority tests', 'Go/no-go decision']
        },
        performance: {
            name: 'Performance Test Suite',
            description: 'Tests system performance characteristics',
            scope: 'Response times, throughput, resources',
            runFrequency: 'Weekly/before release',
            characteristics: ['Load simulation', 'Metrics collection', 'Baseline comparison']
        }
    };

    /**
     * Gets type by name
     * @param {string} name - Type name
     * @returns {Object} Type details
     */
    static getType(name) {
        return this.types[name];
    }

    /**
     * Gets all types
     * @returns {Array} All types
     */
    static getAllTypes() {
        return Object.entries(this.types).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TestCase represents a single test within a suite.
 */
class TestCase {
    constructor(options) {
        this.id = options.id || `TC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.name = options.name;
        this.description = options.description;
        this.tags = options.tags || [];
        this.priority = options.priority || 'medium';
        this.testFn = options.testFn;
        this.timeout = options.timeout || 30000;
        this.retries = options.retries || 0;
        this.status = 'pending';
        this.result = null;
        this.duration = null;
    }

    /**
     * Executes the test case
     * @returns {Object} Test result
     */
    async execute() {
        const startTime = Date.now();
        let attempts = 0;
        let lastError = null;

        while (attempts <= this.retries) {
            attempts++;
            try {
                await Promise.race([
                    this.testFn(),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout')), this.timeout)
                    )
                ]);

                this.status = 'passed';
                this.duration = Date.now() - startTime;
                this.result = { attempts };
                return this.getResult();

            } catch (error) {
                lastError = error;
                if (attempts <= this.retries) {
                    // Retry
                    continue;
                }
            }
        }

        this.status = 'failed';
        this.duration = Date.now() - startTime;
        this.result = { error: lastError.message, attempts };
        return this.getResult();
    }

    /**
     * Gets test result
     * @returns {Object} Result
     */
    getResult() {
        return {
            id: this.id,
            name: this.name,
            status: this.status,
            duration: this.duration,
            result: this.result
        };
    }

    /**
     * Skips the test
     * @param {string} reason - Skip reason
     */
    skip(reason) {
        this.status = 'skipped';
        this.result = { reason };
    }
}

/**
 * TestSuite manages a collection of test cases.
 */
class TestSuite {
    constructor(name, options = {}) {
        this.id = options.id || `TS-${Date.now()}`;
        this.name = name;
        this.description = options.description;
        this.type = options.type || 'functional';
        this.tags = options.tags || [];
        this.testCases = [];
        this.beforeAll = options.beforeAll || null;
        this.afterAll = options.afterAll || null;
        this.beforeEach = options.beforeEach || null;
        this.afterEach = options.afterEach || null;
        this.status = 'pending';
        this.parallel = options.parallel || false;
        this.maxParallel = options.maxParallel || 5;
    }

    /**
     * Adds a test case
     * @param {string} name - Test name
     * @param {Function} testFn - Test function
     * @param {Object} options - Test options
     * @returns {TestCase} Added test case
     */
    test(name, testFn, options = {}) {
        const testCase = new TestCase({
            name,
            testFn,
            ...options
        });
        this.testCases.push(testCase);
        return testCase;
    }

    /**
     * Adds a test to skip
     * @param {string} name - Test name
     * @param {Function} testFn - Test function
     * @param {string} reason - Skip reason
     */
    skip(name, testFn, reason = 'Skipped') {
        const testCase = new TestCase({ name, testFn });
        testCase.skip(reason);
        this.testCases.push(testCase);
    }

    /**
     * Gets tests by tag
     * @param {string} tag - Tag to filter by
     * @returns {Array} Matching tests
     */
    getByTag(tag) {
        return this.testCases.filter(tc => tc.tags.includes(tag));
    }

    /**
     * Gets tests by priority
     * @param {string} priority - Priority level
     * @returns {Array} Matching tests
     */
    getByPriority(priority) {
        return this.testCases.filter(tc => tc.priority === priority);
    }

    /**
     * Executes the test suite
     * @param {Object} options - Execution options
     * @returns {Object} Suite result
     */
    async execute(options = {}) {
        const startTime = Date.now();
        const results = [];
        this.status = 'running';

        // Run beforeAll hook
        if (this.beforeAll) {
            try {
                await this.beforeAll();
            } catch (error) {
                this.status = 'failed';
                return {
                    suite: this.name,
                    status: 'failed',
                    error: 'beforeAll hook failed: ' + error.message
                };
            }
        }

        // Get tests to run
        let testsToRun = this.testCases.filter(tc => tc.status !== 'skipped');
        if (options.tags) {
            testsToRun = testsToRun.filter(tc =>
                options.tags.some(tag => tc.tags.includes(tag))
            );
        }

        // Execute tests
        if (this.parallel) {
            results.push(...await this.executeParallel(testsToRun));
        } else {
            results.push(...await this.executeSequential(testsToRun));
        }

        // Run afterAll hook
        if (this.afterAll) {
            try {
                await this.afterAll();
            } catch (error) {
                // Log but don't fail suite
                console.error('afterAll hook failed:', error.message);
            }
        }

        const passed = results.filter(r => r.status === 'passed').length;
        const failed = results.filter(r => r.status === 'failed').length;
        const skipped = this.testCases.filter(tc => tc.status === 'skipped').length;

        this.status = failed === 0 ? 'passed' : 'failed';

        return {
            suite: this.name,
            type: this.type,
            status: this.status,
            duration: Date.now() - startTime,
            total: this.testCases.length,
            passed,
            failed,
            skipped,
            passRate: ((passed / (passed + failed)) * 100).toFixed(1) + '%',
            results
        };
    }

    /**
     * Executes tests sequentially
     * @param {Array} tests - Tests to execute
     * @returns {Array} Results
     */
    async executeSequential(tests) {
        const results = [];

        for (const test of tests) {
            if (this.beforeEach) await this.beforeEach();
            results.push(await test.execute());
            if (this.afterEach) await this.afterEach();
        }

        return results;
    }

    /**
     * Executes tests in parallel
     * @param {Array} tests - Tests to execute
     * @returns {Array} Results
     */
    async executeParallel(tests) {
        const results = [];
        const chunks = [];

        // Split into chunks based on maxParallel
        for (let i = 0; i < tests.length; i += this.maxParallel) {
            chunks.push(tests.slice(i, i + this.maxParallel));
        }

        for (const chunk of chunks) {
            const chunkResults = await Promise.all(
                chunk.map(async test => {
                    if (this.beforeEach) await this.beforeEach();
                    const result = await test.execute();
                    if (this.afterEach) await this.afterEach();
                    return result;
                })
            );
            results.push(...chunkResults);
        }

        return results;
    }

    /**
     * Gets suite summary
     * @returns {Object} Summary
     */
    getSummary() {
        const byStatus = { pending: 0, passed: 0, failed: 0, skipped: 0 };
        const byPriority = { high: 0, medium: 0, low: 0 };

        for (const tc of this.testCases) {
            byStatus[tc.status]++;
            byPriority[tc.priority]++;
        }

        return {
            id: this.id,
            name: this.name,
            type: this.type,
            testCount: this.testCases.length,
            byStatus,
            byPriority,
            tags: this.tags
        };
    }
}

/**
 * TestSuiteCollection manages multiple test suites.
 */
class TestSuiteCollection {
    constructor(name) {
        this.name = name;
        this.suites = [];
    }

    /**
     * Adds a suite
     * @param {TestSuite} suite - Suite to add
     */
    addSuite(suite) {
        this.suites.push(suite);
    }

    /**
     * Creates and adds a suite
     * @param {string} name - Suite name
     * @param {Object} options - Suite options
     * @returns {TestSuite} Created suite
     */
    describe(name, options = {}) {
        const suite = new TestSuite(name, options);
        this.suites.push(suite);
        return suite;
    }

    /**
     * Executes all suites
     * @param {Object} options - Execution options
     * @returns {Object} Combined results
     */
    async executeAll(options = {}) {
        const startTime = Date.now();
        const suiteResults = [];

        for (const suite of this.suites) {
            if (options.type && suite.type !== options.type) continue;
            if (options.tags && !options.tags.some(tag => suite.tags.includes(tag))) continue;

            const result = await suite.execute(options);
            suiteResults.push(result);
        }

        const totalTests = suiteResults.reduce((sum, r) => sum + r.total, 0);
        const totalPassed = suiteResults.reduce((sum, r) => sum + r.passed, 0);
        const totalFailed = suiteResults.reduce((sum, r) => sum + r.failed, 0);

        return {
            collection: this.name,
            duration: Date.now() - startTime,
            suitesRun: suiteResults.length,
            totalSuites: this.suites.length,
            totalTests,
            passed: totalPassed,
            failed: totalFailed,
            passRate: ((totalPassed / totalTests) * 100).toFixed(1) + '%',
            suites: suiteResults
        };
    }

    /**
     * Gets collection statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const byType = {};
        let totalTests = 0;

        for (const suite of this.suites) {
            byType[suite.type] = (byType[suite.type] || 0) + 1;
            totalTests += suite.testCases.length;
        }

        return {
            collection: this.name,
            totalSuites: this.suites.length,
            totalTests,
            byType
        };
    }
}

/**
 * TestSuiteReporter generates test reports.
 */
class TestSuiteReporter {
    /**
     * Generates console report
     * @param {Object} result - Execution result
     * @returns {string} Report text
     */
    static generateConsoleReport(result) {
        const lines = [
            `\n${'='.repeat(50)}`,
            `Test Suite: ${result.suite}`,
            `${'='.repeat(50)}`,
            `Status: ${result.status.toUpperCase()}`,
            `Duration: ${result.duration}ms`,
            `Tests: ${result.passed}/${result.total} passed (${result.passRate})`,
            `  Passed: ${result.passed}`,
            `  Failed: ${result.failed}`,
            `  Skipped: ${result.skipped}`,
            ''
        ];

        if (result.failed > 0) {
            lines.push('Failed Tests:');
            result.results
                .filter(r => r.status === 'failed')
                .forEach(r => {
                    lines.push(`  ✗ ${r.name}`);
                    if (r.result?.error) {
                        lines.push(`    Error: ${r.result.error}`);
                    }
                });
        }

        return lines.join('\n');
    }

    /**
     * Generates JUnit XML report
     * @param {Object} result - Execution result
     * @returns {string} XML report
     */
    static generateJUnitXML(result) {
        const testcases = result.results.map(r => {
            if (r.status === 'passed') {
                return `    <testcase name="${r.name}" time="${r.duration / 1000}" />`;
            } else if (r.status === 'failed') {
                return `    <testcase name="${r.name}" time="${r.duration / 1000}">
      <failure message="${r.result?.error || 'Test failed'}" />
    </testcase>`;
            } else {
                return `    <testcase name="${r.name}">
      <skipped />
    </testcase>`;
            }
        }).join('\n');

        return `<?xml version="1.0" encoding="UTF-8"?>
<testsuite name="${result.suite}" tests="${result.total}" failures="${result.failed}" skipped="${result.skipped}" time="${result.duration / 1000}">
${testcases}
</testsuite>`;
    }

    /**
     * Generates JSON report
     * @param {Object} result - Execution result
     * @returns {string} JSON report
     */
    static generateJSONReport(result) {
        return JSON.stringify({
            ...result,
            generatedAt: new Date().toISOString()
        }, null, 2);
    }
}

// Demonstration
console.log('=== Test Suite Demo ===\n');

// Suite types
console.log('--- Test Suite Types ---');
TestSuiteType.getAllTypes().slice(0, 4).forEach(type => {
    console.log(`\n${type.name}: ${type.description}`);
    console.log(`  Run frequency: ${type.runFrequency}`);
});

// Create test suite
console.log('\n--- Create Test Suite ---');
const authSuite = new TestSuite('Authentication Tests', {
    type: 'functional',
    tags: ['auth', 'critical'],
    beforeEach: async () => { /* Reset state */ },
    afterEach: async () => { /* Cleanup */ }
});

// Add test cases
authSuite.test('should login with valid credentials', async () => {
    // Simulated test
    const result = { success: true };
    if (!result.success) throw new Error('Login failed');
}, { priority: 'high', tags: ['login', 'smoke'] });

authSuite.test('should reject invalid password', async () => {
    // Simulated test
    const rejected = true;
    if (!rejected) throw new Error('Should have rejected');
}, { priority: 'high', tags: ['login', 'security'] });

authSuite.test('should handle session timeout', async () => {
    // Simulated test
}, { priority: 'medium', tags: ['session'] });

authSuite.skip('should support SSO login', async () => {
    // Not implemented yet
}, 'SSO not yet implemented');

console.log('Suite Summary:', authSuite.getSummary());

// Execute suite
console.log('\n--- Execute Suite ---');
authSuite.execute().then(result => {
    console.log('Execution Result:', {
        status: result.status,
        passed: result.passed,
        failed: result.failed,
        skipped: result.skipped,
        passRate: result.passRate
    });

    // Generate reports
    console.log('\n--- Console Report ---');
    console.log(TestSuiteReporter.generateConsoleReport(result));
});

// Suite collection
console.log('\n--- Suite Collection ---');
const collection = new TestSuiteCollection('E-Commerce Test Suite');

const loginSuite = collection.describe('Login Tests', { type: 'smoke', tags: ['auth'] });
loginSuite.test('basic login', async () => {});
loginSuite.test('logout', async () => {});

const cartSuite = collection.describe('Cart Tests', { type: 'functional', tags: ['cart'] });
cartSuite.test('add to cart', async () => {});
cartSuite.test('remove from cart', async () => {});
cartSuite.test('update quantity', async () => {});

const checkoutSuite = collection.describe('Checkout Tests', { type: 'functional', tags: ['checkout'] });
checkoutSuite.test('complete purchase', async () => {});

console.log('Collection Statistics:', collection.getStatistics());

// Execute all suites
collection.executeAll().then(result => {
    console.log('\n--- Collection Results ---');
    console.log({
        suitesRun: result.suitesRun,
        totalTests: result.totalTests,
        passed: result.passed,
        passRate: result.passRate
    });
});

/**
 * Best Practices for Test Suites:
 *
 * 1. Organize tests logically by feature or type
 * 2. Use appropriate suite types for different purposes
 * 3. Implement proper setup and teardown hooks
 * 4. Tag tests for flexible execution
 * 5. Keep individual tests independent
 * 6. Balance coverage with execution time
 * 7. Integrate with CI/CD pipelines
 * 8. Generate meaningful reports
 * 9. Maintain suite health regularly
 * 10. Review and update test priorities
 */
