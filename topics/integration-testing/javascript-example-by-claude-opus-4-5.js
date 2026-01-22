/**
 * Integration Testing - Verifying Component Interactions
 *
 * Integration testing verifies that different modules or components of
 * an application work together correctly. It tests the interaction
 * between integrated components to detect errors that arise from
 * combining individual modules.
 *
 * Key Concepts:
 * - Test module interactions and interfaces
 * - Multiple integration strategies (Big Bang, Top-Down, Bottom-Up)
 * - Conducted after unit testing, before system testing
 * - Can be automated for frequent regression testing
 */

/**
 * Component represents a software module for integration testing.
 * Tracks dependencies and interface contracts.
 */
class Component {
    constructor(name, options = {}) {
        this.name = name;
        this.version = options.version || '1.0.0';
        this.dependencies = [];
        this.interfaces = [];
        this.status = 'not_tested';
        this.mockable = options.mockable !== false;
    }

    /**
     * Adds a dependency
     * @param {string} componentName - Dependent component name
     * @param {string} interfaceName - Interface used
     */
    addDependency(componentName, interfaceName) {
        this.dependencies.push({ component: componentName, interface: interfaceName });
    }

    /**
     * Adds an interface this component provides
     * @param {Object} interfaceSpec - Interface specification
     */
    addInterface(interfaceSpec) {
        this.interfaces.push({
            name: interfaceSpec.name,
            methods: interfaceSpec.methods || [],
            version: interfaceSpec.version || '1.0.0'
        });
    }

    /**
     * Gets component summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            name: this.name,
            version: this.version,
            dependencies: this.dependencies.length,
            interfaces: this.interfaces.length,
            status: this.status
        };
    }
}

/**
 * IntegrationTestCase defines a test for component integration.
 * Specifies components involved and expected behavior.
 */
class IntegrationTestCase {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.components = options.components || [];
        this.setup = options.setup;
        this.steps = [];
        this.expectedResults = [];
        this.teardown = options.teardown;
        this.priority = options.priority || 'medium';
    }

    /**
     * Adds a test step
     * @param {Object} step - Test step
     */
    addStep(step) {
        this.steps.push({
            order: this.steps.length + 1,
            action: step.action,
            source: step.source,
            target: step.target,
            data: step.data,
            expectedResponse: step.expectedResponse
        });
    }

    /**
     * Adds an expected result
     * @param {Object} result - Expected result
     */
    addExpectedResult(result) {
        this.expectedResults.push({
            component: result.component,
            condition: result.condition,
            expected: result.expected
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
            components: this.components,
            steps: this.steps.length,
            priority: this.priority
        };
    }
}

/**
 * IntegrationTestSuite groups related integration tests.
 * Manages test organization and execution strategy.
 */
class IntegrationTestSuite {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description;
        this.strategy = options.strategy || 'incremental';
        this.tests = [];
        this.components = new Map();
    }

    /**
     * Registers a component
     * @param {Component} component - Component to register
     */
    registerComponent(component) {
        this.components.set(component.name, component);
    }

    /**
     * Adds a test case
     * @param {IntegrationTestCase} test - Test to add
     */
    addTest(test) {
        this.tests.push(test);
    }

    /**
     * Gets tests by component
     * @param {string} componentName - Component name
     * @returns {Array} Related tests
     */
    getTestsForComponent(componentName) {
        return this.tests.filter(t => t.components.includes(componentName));
    }

    /**
     * Calculates integration coverage
     * @returns {Object} Coverage metrics
     */
    getCoverage() {
        const testedComponents = new Set();
        const testedInterfaces = new Set();

        for (const test of this.tests) {
            test.components.forEach(c => testedComponents.add(c));
            test.steps.forEach(s => {
                if (s.source && s.target) {
                    testedInterfaces.add(`${s.source}->${s.target}`);
                }
            });
        }

        return {
            componentsCovered: testedComponents.size,
            totalComponents: this.components.size,
            interfacesCovered: testedInterfaces.size,
            componentPercentage: Math.round(
                (testedComponents.size / this.components.size) * 100
            ) || 0
        };
    }

    /**
     * Gets suite summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            name: this.name,
            strategy: this.strategy,
            testCount: this.tests.length,
            componentCount: this.components.size,
            coverage: this.getCoverage()
        };
    }
}

/**
 * IntegrationTestRunner executes integration tests.
 * Supports different integration strategies.
 */
class IntegrationTestRunner {
    constructor(options = {}) {
        this.strategy = options.strategy || 'incremental';
        this.timeout = options.timeout || 30000;
        this.results = [];
        this.mocks = new Map();
    }

    /**
     * Registers a mock for a component
     * @param {string} componentName - Component to mock
     * @param {Object} mockImplementation - Mock implementation
     */
    registerMock(componentName, mockImplementation) {
        this.mocks.set(componentName, mockImplementation);
    }

    /**
     * Runs an integration test suite
     * @param {IntegrationTestSuite} suite - Suite to run
     * @returns {Promise<Object>} Suite results
     */
    async runSuite(suite) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Integration Test Suite: ${suite.name}`);
        console.log(`Strategy: ${suite.strategy}`);
        console.log(`${'='.repeat(50)}`);

        const suiteResult = {
            name: suite.name,
            strategy: suite.strategy,
            startTime: Date.now(),
            tests: [],
            passed: 0,
            failed: 0
        };

        // Order tests based on strategy
        const orderedTests = this.orderTests(suite.tests, suite.strategy);

        for (const test of orderedTests) {
            const result = await this.runTest(test, suite.components);
            suiteResult.tests.push(result);

            if (result.passed) {
                suiteResult.passed++;
            } else {
                suiteResult.failed++;
            }
        }

        suiteResult.duration = Date.now() - suiteResult.startTime;
        this.results.push(suiteResult);

        return suiteResult;
    }

    /**
     * Orders tests based on integration strategy
     * @param {Array} tests - Tests to order
     * @param {string} strategy - Integration strategy
     * @returns {Array} Ordered tests
     */
    orderTests(tests, strategy) {
        switch (strategy) {
            case 'big-bang':
                // All at once - no specific order
                return tests;

            case 'top-down':
                // Sort by dependency level (high level first)
                return [...tests].sort((a, b) =>
                    (a.priority === 'high' ? 0 : 1) - (b.priority === 'high' ? 0 : 1)
                );

            case 'bottom-up':
                // Sort by dependency level (low level first)
                return [...tests].sort((a, b) =>
                    (a.priority === 'low' ? 0 : 1) - (b.priority === 'low' ? 0 : 1)
                );

            case 'incremental':
            default:
                // Add components incrementally
                return tests;
        }
    }

    /**
     * Runs a single integration test
     * @param {IntegrationTestCase} test - Test to run
     * @param {Map} components - Available components
     * @returns {Promise<Object>} Test result
     */
    async runTest(test, components) {
        console.log(`\n  Test: ${test.name}`);
        console.log(`  Components: ${test.components.join(', ')}`);

        const startTime = Date.now();
        const stepResults = [];

        try {
            // Setup
            if (test.setup) {
                console.log('    Setting up...');
                await test.setup();
            }

            // Execute steps
            for (const step of test.steps) {
                const stepResult = await this.executeStep(step, components);
                stepResults.push(stepResult);

                if (!stepResult.passed) {
                    throw new Error(`Step ${step.order} failed: ${stepResult.error}`);
                }
            }

            // Verify expected results
            const verifications = [];
            for (const expected of test.expectedResults) {
                const verification = await this.verify(expected, components);
                verifications.push(verification);
            }

            const allVerified = verifications.every(v => v.passed);

            // Teardown
            if (test.teardown) {
                console.log('    Tearing down...');
                await test.teardown();
            }

            console.log(`    ${allVerified ? '✓ PASSED' : '✗ FAILED'}`);

            return {
                testId: test.id,
                testName: test.name,
                passed: allVerified,
                duration: Date.now() - startTime,
                stepResults,
                verifications
            };

        } catch (error) {
            console.log(`    ✗ FAILED: ${error.message}`);

            return {
                testId: test.id,
                testName: test.name,
                passed: false,
                duration: Date.now() - startTime,
                error: error.message,
                stepResults
            };
        }
    }

    /**
     * Executes a test step
     * @param {Object} step - Step to execute
     * @param {Map} components - Available components
     * @returns {Promise<Object>} Step result
     */
    async executeStep(step, components) {
        console.log(`    Step ${step.order}: ${step.action}`);

        try {
            // Check if we need to use a mock
            const sourceComponent = this.mocks.get(step.source) ||
                                    components.get(step.source);
            const targetComponent = this.mocks.get(step.target) ||
                                    components.get(step.target);

            // Simulate interaction
            await new Promise(resolve => setTimeout(resolve, 50));

            return {
                step: step.order,
                action: step.action,
                passed: true,
                source: step.source,
                target: step.target
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
     * @param {Object} expected - Expected result
     * @param {Map} components - Available components
     * @returns {Promise<Object>} Verification result
     */
    async verify(expected, components) {
        try {
            // Simulate verification
            await new Promise(resolve => setTimeout(resolve, 10));

            return {
                component: expected.component,
                condition: expected.condition,
                passed: true
            };
        } catch (error) {
            return {
                component: expected.component,
                condition: expected.condition,
                passed: false,
                error: error.message
            };
        }
    }

    /**
     * Gets test statistics
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
 * IntegrationStrategy defines different integration approaches.
 */
class IntegrationStrategy {
    static strategies = {
        'big-bang': {
            name: 'Big Bang Integration',
            description: 'All components integrated and tested together at once',
            pros: ['Simple to implement', 'No stubs needed'],
            cons: ['Difficult to isolate faults', 'Late detection of issues'],
            bestFor: 'Small systems with few components'
        },
        'top-down': {
            name: 'Top-Down Integration',
            description: 'Start from top-level modules, add lower levels progressively',
            pros: ['Early validation of high-level design', 'Critical modules tested first'],
            cons: ['Requires stubs for lower modules', 'Low-level bugs found late'],
            bestFor: 'Control-flow or UI-driven applications'
        },
        'bottom-up': {
            name: 'Bottom-Up Integration',
            description: 'Start from lowest modules, add higher levels progressively',
            pros: ['No stubs needed', 'Easier to locate faults'],
            cons: ['Requires drivers for higher modules', 'UI tested last'],
            bestFor: 'Data-processing or utility-heavy applications'
        },
        'sandwich': {
            name: 'Sandwich/Hybrid Integration',
            description: 'Combines top-down and bottom-up approaches',
            pros: ['Balanced approach', 'Parallel development possible'],
            cons: ['More complex to manage', 'Requires both stubs and drivers'],
            bestFor: 'Large systems with clear layering'
        }
    };

    /**
     * Gets strategy details
     * @param {string} name - Strategy name
     * @returns {Object} Strategy details
     */
    static get(name) {
        return this.strategies[name];
    }

    /**
     * Gets all strategies
     * @returns {Object} All strategies
     */
    static getAll() {
        return this.strategies;
    }

    /**
     * Recommends strategy based on project characteristics
     * @param {Object} project - Project characteristics
     * @returns {string} Recommended strategy
     */
    static recommend(project) {
        if (project.size === 'small' && project.components < 5) {
            return 'big-bang';
        }
        if (project.type === 'ui-driven') {
            return 'top-down';
        }
        if (project.type === 'data-processing') {
            return 'bottom-up';
        }
        return 'sandwich';
    }
}

// Demonstration
console.log('=== Integration Testing Demo ===\n');

// Create components
const userService = new Component('UserService', { version: '2.0.0' });
userService.addInterface({ name: 'IUserService', methods: ['getUser', 'createUser'] });
userService.addDependency('DatabaseService', 'IDatabase');

const authService = new Component('AuthService', { version: '1.5.0' });
authService.addInterface({ name: 'IAuthService', methods: ['authenticate', 'authorize'] });
authService.addDependency('UserService', 'IUserService');

const databaseService = new Component('DatabaseService', { version: '3.0.0' });
databaseService.addInterface({ name: 'IDatabase', methods: ['query', 'insert'] });

// Create integration test suite
const authSuite = new IntegrationTestSuite('Authentication Integration', {
    description: 'Tests for authentication flow integration',
    strategy: 'bottom-up'
});

authSuite.registerComponent(userService);
authSuite.registerComponent(authService);
authSuite.registerComponent(databaseService);

// Create test case
const loginTest = new IntegrationTestCase({
    id: 'INT-001',
    name: 'User Login Flow',
    description: 'Verify complete user login flow across services',
    components: ['AuthService', 'UserService', 'DatabaseService'],
    priority: 'high'
});

loginTest.addStep({
    action: 'Submit login credentials',
    source: 'Client',
    target: 'AuthService',
    data: { username: 'testuser', password: 'password' },
    expectedResponse: 'Authentication request received'
});

loginTest.addStep({
    action: 'Fetch user from database',
    source: 'AuthService',
    target: 'UserService',
    data: { username: 'testuser' },
    expectedResponse: 'User data returned'
});

loginTest.addStep({
    action: 'Query user table',
    source: 'UserService',
    target: 'DatabaseService',
    data: { query: 'SELECT * FROM users WHERE username = ?' },
    expectedResponse: 'Query result returned'
});

loginTest.addExpectedResult({
    component: 'AuthService',
    condition: 'Returns valid JWT token',
    expected: true
});

loginTest.addExpectedResult({
    component: 'UserService',
    condition: 'User session created',
    expected: true
});

authSuite.addTest(loginTest);

console.log('Suite Summary:', authSuite.getSummary());
console.log('Test Case:', loginTest.getSummary());

// Run tests
const runner = new IntegrationTestRunner({ strategy: 'bottom-up' });

runner.runSuite(authSuite).then(results => {
    console.log('\n--- Test Results ---');
    console.log(`Passed: ${results.passed}/${results.tests.length}`);
    console.log('Duration:', results.duration + 'ms');
    console.log('Statistics:', runner.getStatistics());
});

// Strategy info
console.log('\n--- Integration Strategies ---');
console.log('Bottom-Up:', IntegrationStrategy.get('bottom-up'));

console.log('\nRecommendation for UI-driven project:',
    IntegrationStrategy.recommend({ type: 'ui-driven', size: 'medium' }));

/**
 * Best Practices for Integration Testing:
 *
 * 1. Test interfaces, not implementations
 * 2. Start with critical integration paths
 * 3. Use appropriate integration strategy for your project
 * 4. Maintain test data independence
 * 5. Use mocks and stubs for unavailable components
 * 6. Test error handling between components
 * 7. Include performance aspects in integration tests
 * 8. Automate for continuous integration
 * 9. Document integration dependencies clearly
 * 10. Run integration tests after successful unit tests
 */
