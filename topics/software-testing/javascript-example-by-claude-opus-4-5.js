/**
 * Software Testing - Ensuring Quality Through Verification and Validation
 *
 * Software testing is the process of verifying and validating software applications
 * to ensure they function as expected and meet end-user requirements. Testing is
 * essential for identifying defects, bugs, and issues that could impact performance,
 * security, and functionality.
 *
 * Key Concepts:
 * - Verification (building the product right)
 * - Validation (building the right product)
 * - Manual and automated testing
 * - Testing levels and types
 */

/**
 * TestingLevel represents different levels of testing.
 */
class TestingLevel {
    static levels = {
        unit: {
            name: 'Unit Testing',
            description: 'Testing individual components or functions in isolation',
            scope: 'Single function, method, or class',
            responsibility: 'Developers',
            automation: 'Highly automated',
            examples: ['Function returns correct value', 'Class methods work correctly']
        },
        integration: {
            name: 'Integration Testing',
            description: 'Testing how components work together',
            scope: 'Multiple components or modules',
            responsibility: 'Developers and testers',
            automation: 'Mostly automated',
            examples: ['API endpoints communicate correctly', 'Database operations work']
        },
        system: {
            name: 'System Testing',
            description: 'Testing the complete integrated system',
            scope: 'Entire application',
            responsibility: 'QA team',
            automation: 'Mix of automated and manual',
            examples: ['End-to-end workflows', 'Full user journeys']
        },
        acceptance: {
            name: 'Acceptance Testing',
            description: 'Testing against business requirements',
            scope: 'Business processes and requirements',
            responsibility: 'Users, stakeholders, QA',
            automation: 'Often manual with some automation',
            examples: ['User story validation', 'Business rule verification']
        }
    };

    /**
     * Gets level by name
     * @param {string} name - Level name
     * @returns {Object} Level details
     */
    static getLevel(name) {
        return this.levels[name];
    }

    /**
     * Gets all levels
     * @returns {Array} All levels
     */
    static getAllLevels() {
        return Object.entries(this.levels).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TestingType represents different types of testing.
 */
class TestingType {
    static types = {
        functional: {
            name: 'Functional Testing',
            description: 'Verifies system functions as per requirements',
            focus: 'What the system does',
            examples: ['Feature testing', 'Business logic validation']
        },
        performance: {
            name: 'Performance Testing',
            description: 'Evaluates system performance characteristics',
            focus: 'Speed, scalability, stability',
            subtypes: ['Load testing', 'Stress testing', 'Endurance testing']
        },
        security: {
            name: 'Security Testing',
            description: 'Identifies security vulnerabilities',
            focus: 'Protection against threats',
            examples: ['Penetration testing', 'Vulnerability scanning']
        },
        usability: {
            name: 'Usability Testing',
            description: 'Evaluates user experience and interface',
            focus: 'User satisfaction and ease of use',
            examples: ['User interface testing', 'Accessibility testing']
        },
        compatibility: {
            name: 'Compatibility Testing',
            description: 'Tests across different environments',
            focus: 'Cross-platform, cross-browser operation',
            examples: ['Browser testing', 'Device testing', 'OS testing']
        },
        regression: {
            name: 'Regression Testing',
            description: 'Ensures changes dont break existing functionality',
            focus: 'Detecting unintended side effects',
            examples: ['Re-running test suites after changes']
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
 * TestCase represents a test case structure.
 */
class TestCase {
    constructor(options) {
        this.id = options.id || `TC-${Date.now()}`;
        this.title = options.title;
        this.description = options.description;
        this.preconditions = options.preconditions || [];
        this.steps = options.steps || [];
        this.expectedResult = options.expectedResult;
        this.priority = options.priority || 'medium';
        this.type = options.type || 'functional';
        this.status = 'not_executed';
        this.actualResult = null;
    }

    /**
     * Adds a test step
     * @param {string} action - Step action
     * @param {string} expected - Expected outcome
     */
    addStep(action, expected) {
        this.steps.push({
            number: this.steps.length + 1,
            action,
            expected
        });
    }

    /**
     * Executes the test case
     * @param {Object} result - Execution result
     */
    execute(result) {
        this.status = result.passed ? 'passed' : 'failed';
        this.actualResult = result.actualResult;
        this.executedAt = new Date();
        this.executedBy = result.tester;
    }

    /**
     * Gets test case summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            priority: this.priority,
            status: this.status,
            stepsCount: this.steps.length
        };
    }
}

/**
 * TestSuite manages a collection of test cases.
 */
class TestSuite {
    constructor(name) {
        this.name = name;
        this.testCases = [];
        this.createdAt = new Date();
    }

    /**
     * Adds a test case
     * @param {TestCase} testCase - Test case to add
     */
    addTestCase(testCase) {
        this.testCases.push(testCase);
    }

    /**
     * Gets test cases by priority
     * @param {string} priority - Priority level
     * @returns {Array} Filtered test cases
     */
    getByPriority(priority) {
        return this.testCases.filter(tc => tc.priority === priority);
    }

    /**
     * Gets test cases by status
     * @param {string} status - Status
     * @returns {Array} Filtered test cases
     */
    getByStatus(status) {
        return this.testCases.filter(tc => tc.status === status);
    }

    /**
     * Executes all test cases
     * @returns {Object} Execution results
     */
    execute() {
        const results = {
            suite: this.name,
            startTime: new Date(),
            passed: 0,
            failed: 0,
            notExecuted: 0,
            testResults: []
        };

        for (const testCase of this.testCases) {
            // Simulate test execution
            const passed = Math.random() > 0.15; // 85% pass rate
            testCase.execute({
                passed,
                actualResult: passed ? 'As expected' : 'Unexpected behavior',
                tester: 'Automated'
            });

            if (testCase.status === 'passed') results.passed++;
            else if (testCase.status === 'failed') results.failed++;
            else results.notExecuted++;

            results.testResults.push(testCase.getSummary());
        }

        results.endTime = new Date();
        results.duration = results.endTime - results.startTime;
        results.passRate = (results.passed / this.testCases.length * 100).toFixed(1) + '%';

        return results;
    }

    /**
     * Gets suite statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        return {
            name: this.name,
            totalTests: this.testCases.length,
            byPriority: {
                high: this.getByPriority('high').length,
                medium: this.getByPriority('medium').length,
                low: this.getByPriority('low').length
            },
            byStatus: {
                passed: this.getByStatus('passed').length,
                failed: this.getByStatus('failed').length,
                notExecuted: this.getByStatus('not_executed').length
            }
        };
    }
}

/**
 * TestingStrategy provides testing strategy guidance.
 */
class TestingStrategy {
    /**
     * Gets testing pyramid
     * @returns {Object} Testing pyramid
     */
    static getTestingPyramid() {
        return {
            description: 'Testing pyramid recommends more unit tests than integration tests, and more integration tests than E2E tests',
            levels: [
                { level: 'Unit Tests', percentage: '70%', speed: 'Fast', cost: 'Low' },
                { level: 'Integration Tests', percentage: '20%', speed: 'Medium', cost: 'Medium' },
                { level: 'E2E Tests', percentage: '10%', speed: 'Slow', cost: 'High' }
            ],
            rationale: 'Lower tests are faster, cheaper, and more stable'
        };
    }

    /**
     * Gets test automation strategy
     * @returns {Object} Strategy
     */
    static getAutomationStrategy() {
        return {
            whatToAutomate: [
                'Repetitive tests',
                'Data-driven tests',
                'Regression tests',
                'Smoke tests',
                'Performance tests'
            ],
            whatToKeepManual: [
                'Exploratory testing',
                'Usability testing',
                'One-time tests',
                'Tests requiring human judgment',
                'Tests with high maintenance cost'
            ],
            considerations: [
                'ROI of automation',
                'Test stability',
                'Maintenance burden',
                'Team skills'
            ]
        };
    }

    /**
     * Recommends testing approach
     * @param {Object} project - Project details
     * @returns {Object} Recommendations
     */
    static recommend(project) {
        const recommendations = [];

        if (project.isAgile) {
            recommendations.push('Integrate testing into sprints');
            recommendations.push('Use TDD or BDD');
        }

        if (project.hasCI) {
            recommendations.push('Run automated tests on every commit');
            recommendations.push('Include smoke tests in pipeline');
        }

        if (project.isCritical) {
            recommendations.push('High test coverage requirement');
            recommendations.push('Thorough security testing');
        }

        return {
            project: project.name,
            recommendations,
            priority: project.isCritical ? 'high' : 'normal'
        };
    }
}

// Demonstration
console.log('=== Software Testing Demo ===\n');

// Testing levels
console.log('--- Testing Levels ---');
TestingLevel.getAllLevels().forEach(level => {
    console.log(`\n${level.name}:`);
    console.log(`  Scope: ${level.scope}`);
    console.log(`  Responsibility: ${level.responsibility}`);
});

// Testing types
console.log('\n--- Testing Types ---');
TestingType.getAllTypes().slice(0, 4).forEach(type => {
    console.log(`${type.name}: ${type.description}`);
});

// Test case creation
console.log('\n--- Test Case Example ---');
const testCase = new TestCase({
    title: 'User login with valid credentials',
    description: 'Verify user can login with valid username and password',
    preconditions: ['User account exists', 'User is on login page'],
    expectedResult: 'User is redirected to dashboard',
    priority: 'high',
    type: 'functional'
});

testCase.addStep('Enter valid username', 'Username is accepted');
testCase.addStep('Enter valid password', 'Password is masked');
testCase.addStep('Click login button', 'Login request is submitted');

console.log('Test Case:', testCase.getSummary());

// Test suite
console.log('\n--- Test Suite Execution ---');
const suite = new TestSuite('Login Module');

suite.addTestCase(new TestCase({ title: 'Valid login', priority: 'high' }));
suite.addTestCase(new TestCase({ title: 'Invalid password', priority: 'high' }));
suite.addTestCase(new TestCase({ title: 'Forgot password', priority: 'medium' }));
suite.addTestCase(new TestCase({ title: 'Remember me', priority: 'low' }));
suite.addTestCase(new TestCase({ title: 'Session timeout', priority: 'medium' }));

const results = suite.execute();
console.log('Execution Results:', {
    suite: results.suite,
    passed: results.passed,
    failed: results.failed,
    passRate: results.passRate
});

// Testing strategy
console.log('\n--- Testing Pyramid ---');
const pyramid = TestingStrategy.getTestingPyramid();
pyramid.levels.forEach(level => {
    console.log(`${level.level}: ${level.percentage} (${level.speed}, ${level.cost} cost)`);
});

// Automation strategy
console.log('\n--- Automation Strategy ---');
const automation = TestingStrategy.getAutomationStrategy();
console.log('What to automate:', automation.whatToAutomate.slice(0, 3));
console.log('Keep manual:', automation.whatToKeepManual.slice(0, 3));

// Recommendations
console.log('\n--- Testing Recommendations ---');
const recommendations = TestingStrategy.recommend({
    name: 'E-Commerce Platform',
    isAgile: true,
    hasCI: true,
    isCritical: true
});
console.log('Recommendations:', recommendations);

/**
 * Best Practices for Software Testing:
 *
 * 1. Start testing early in the development cycle
 * 2. Follow the testing pyramid principle
 * 3. Automate repetitive and regression tests
 * 4. Write clear, maintainable test cases
 * 5. Test both happy paths and edge cases
 * 6. Include non-functional testing
 * 7. Integrate testing into CI/CD pipeline
 * 8. Track and analyze test metrics
 * 9. Collaborate between dev and QA teams
 * 10. Continuously improve testing processes
 */
