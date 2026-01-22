/**
 * Test Case - Blueprint for Testing Activities
 *
 * A test case is a fundamental component of software testing that defines a
 * specific set of conditions, inputs, and expected outcomes to verify whether
 * a feature or function operates correctly. It serves as a blueprint for
 * testing activities with step-by-step instructions for manual or automated execution.
 *
 * Key Concepts:
 * - Preconditions and test data
 * - Execution steps
 * - Expected vs actual results
 * - Atomic and independent design
 */

/**
 * TestCase represents a test case with full structure.
 */
class TestCase {
    constructor(options) {
        this.id = options.id || `TC-${Date.now()}`;
        this.title = options.title;
        this.description = options.description;
        this.module = options.module;
        this.feature = options.feature;
        this.priority = options.priority || 'medium';
        this.type = options.type || 'functional';
        this.preconditions = options.preconditions || [];
        this.testData = options.testData || {};
        this.steps = [];
        this.expectedResult = options.expectedResult;
        this.actualResult = null;
        this.status = 'not_executed';
        this.createdBy = options.createdBy;
        this.createdAt = new Date();
        this.executionTime = null;
    }

    /**
     * Adds a test step
     * @param {string} action - Action to perform
     * @param {string} expected - Expected result
     * @param {Object} data - Optional test data
     */
    addStep(action, expected, data = null) {
        this.steps.push({
            stepNumber: this.steps.length + 1,
            action,
            expected,
            data,
            actual: null,
            status: 'pending'
        });
    }

    /**
     * Executes the test case (simulated)
     * @param {Object} result - Execution result
     */
    execute(result) {
        const startTime = Date.now();

        this.actualResult = result.actualResult;
        this.status = result.passed ? 'passed' : 'failed';
        this.executionTime = Date.now() - startTime;
        this.executedAt = new Date();
        this.executedBy = result.tester;

        // Update step statuses
        if (result.stepResults) {
            result.stepResults.forEach((stepResult, index) => {
                if (this.steps[index]) {
                    this.steps[index].actual = stepResult.actual;
                    this.steps[index].status = stepResult.passed ? 'passed' : 'failed';
                }
            });
        }
    }

    /**
     * Gets test case summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            module: this.module,
            priority: this.priority,
            type: this.type,
            stepCount: this.steps.length,
            status: this.status,
            executedAt: this.executedAt
        };
    }

    /**
     * Validates test case completeness
     * @returns {Object} Validation result
     */
    validate() {
        const issues = [];

        if (!this.title) issues.push('Title is required');
        if (!this.description) issues.push('Description is required');
        if (this.steps.length === 0) issues.push('At least one step is required');
        if (!this.expectedResult) issues.push('Expected result is required');
        if (this.preconditions.length === 0) {
            issues.push('Warning: No preconditions defined');
        }

        return {
            valid: issues.filter(i => !i.startsWith('Warning')).length === 0,
            issues,
            completeness: Math.round(
                ((5 - issues.filter(i => !i.startsWith('Warning')).length) / 5) * 100
            ) + '%'
        };
    }

    /**
     * Clones the test case
     * @returns {TestCase} Cloned test case
     */
    clone() {
        const cloned = new TestCase({
            title: this.title + ' (Copy)',
            description: this.description,
            module: this.module,
            feature: this.feature,
            priority: this.priority,
            type: this.type,
            preconditions: [...this.preconditions],
            testData: { ...this.testData },
            expectedResult: this.expectedResult,
            createdBy: this.createdBy
        });

        this.steps.forEach(step => {
            cloned.addStep(step.action, step.expected, step.data);
        });

        return cloned;
    }
}

/**
 * TestCaseBuilder provides fluent interface for building test cases.
 */
class TestCaseBuilder {
    constructor() {
        this.options = {};
        this.steps = [];
    }

    /**
     * Sets the title
     * @param {string} title - Test case title
     * @returns {TestCaseBuilder} Builder for chaining
     */
    withTitle(title) {
        this.options.title = title;
        return this;
    }

    /**
     * Sets the description
     * @param {string} description - Description
     * @returns {TestCaseBuilder} Builder for chaining
     */
    withDescription(description) {
        this.options.description = description;
        return this;
    }

    /**
     * Sets the module
     * @param {string} module - Module name
     * @returns {TestCaseBuilder} Builder for chaining
     */
    forModule(module) {
        this.options.module = module;
        return this;
    }

    /**
     * Sets the feature
     * @param {string} feature - Feature name
     * @returns {TestCaseBuilder} Builder for chaining
     */
    forFeature(feature) {
        this.options.feature = feature;
        return this;
    }

    /**
     * Sets the priority
     * @param {string} priority - Priority level
     * @returns {TestCaseBuilder} Builder for chaining
     */
    withPriority(priority) {
        this.options.priority = priority;
        return this;
    }

    /**
     * Adds preconditions
     * @param {...string} conditions - Preconditions
     * @returns {TestCaseBuilder} Builder for chaining
     */
    withPreconditions(...conditions) {
        this.options.preconditions = conditions;
        return this;
    }

    /**
     * Sets test data
     * @param {Object} data - Test data
     * @returns {TestCaseBuilder} Builder for chaining
     */
    withTestData(data) {
        this.options.testData = data;
        return this;
    }

    /**
     * Adds a step
     * @param {string} action - Action
     * @param {string} expected - Expected result
     * @returns {TestCaseBuilder} Builder for chaining
     */
    addStep(action, expected) {
        this.steps.push({ action, expected });
        return this;
    }

    /**
     * Sets expected result
     * @param {string} expected - Expected result
     * @returns {TestCaseBuilder} Builder for chaining
     */
    expectResult(expected) {
        this.options.expectedResult = expected;
        return this;
    }

    /**
     * Builds the test case
     * @returns {TestCase} Built test case
     */
    build() {
        const testCase = new TestCase(this.options);
        this.steps.forEach(step => {
            testCase.addStep(step.action, step.expected);
        });
        return testCase;
    }
}

/**
 * TestCaseRepository manages test cases.
 */
class TestCaseRepository {
    constructor() {
        this.testCases = new Map();
    }

    /**
     * Saves a test case
     * @param {TestCase} testCase - Test case to save
     */
    save(testCase) {
        this.testCases.set(testCase.id, testCase);
    }

    /**
     * Gets test case by ID
     * @param {string} id - Test case ID
     * @returns {TestCase|null} Test case or null
     */
    getById(id) {
        return this.testCases.get(id) || null;
    }

    /**
     * Gets test cases by module
     * @param {string} module - Module name
     * @returns {Array} Matching test cases
     */
    getByModule(module) {
        return Array.from(this.testCases.values())
            .filter(tc => tc.module === module);
    }

    /**
     * Gets test cases by priority
     * @param {string} priority - Priority level
     * @returns {Array} Matching test cases
     */
    getByPriority(priority) {
        return Array.from(this.testCases.values())
            .filter(tc => tc.priority === priority);
    }

    /**
     * Gets test cases by status
     * @param {string} status - Status
     * @returns {Array} Matching test cases
     */
    getByStatus(status) {
        return Array.from(this.testCases.values())
            .filter(tc => tc.status === status);
    }

    /**
     * Gets all test cases
     * @returns {Array} All test cases
     */
    getAll() {
        return Array.from(this.testCases.values());
    }

    /**
     * Gets statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const testCases = this.getAll();
        const byPriority = { high: 0, medium: 0, low: 0 };
        const byStatus = { not_executed: 0, passed: 0, failed: 0, blocked: 0 };
        const byModule = {};

        for (const tc of testCases) {
            byPriority[tc.priority] = (byPriority[tc.priority] || 0) + 1;
            byStatus[tc.status] = (byStatus[tc.status] || 0) + 1;
            byModule[tc.module] = (byModule[tc.module] || 0) + 1;
        }

        return {
            total: testCases.length,
            byPriority,
            byStatus,
            byModule,
            passRate: testCases.length > 0
                ? ((byStatus.passed / (byStatus.passed + byStatus.failed || 1)) * 100).toFixed(1) + '%'
                : 'N/A'
        };
    }
}

/**
 * TestCaseTemplate provides reusable templates.
 */
class TestCaseTemplate {
    static templates = {
        login: {
            name: 'Login Test',
            module: 'Authentication',
            type: 'functional',
            preconditions: ['User account exists', 'User is not logged in'],
            steps: [
                { action: 'Navigate to login page', expected: 'Login form is displayed' },
                { action: 'Enter username', expected: 'Username is accepted' },
                { action: 'Enter password', expected: 'Password is masked' },
                { action: 'Click login button', expected: 'User is logged in and redirected' }
            ]
        },
        crud: {
            name: 'CRUD Operations',
            module: 'Data Management',
            type: 'functional',
            preconditions: ['User is authenticated', 'Has necessary permissions'],
            steps: [
                { action: 'Create new record', expected: 'Record is created successfully' },
                { action: 'Read/view the record', expected: 'Record details are displayed' },
                { action: 'Update the record', expected: 'Changes are saved' },
                { action: 'Delete the record', expected: 'Record is removed' }
            ]
        },
        formValidation: {
            name: 'Form Validation',
            module: 'UI',
            type: 'functional',
            preconditions: ['Form page is accessible'],
            steps: [
                { action: 'Submit empty form', expected: 'Required field errors shown' },
                { action: 'Enter invalid data', expected: 'Validation errors displayed' },
                { action: 'Enter valid data', expected: 'Form is accepted' },
                { action: 'Check error message format', expected: 'Messages are user-friendly' }
            ]
        },
        search: {
            name: 'Search Functionality',
            module: 'Search',
            type: 'functional',
            preconditions: ['Search feature is available', 'Test data exists'],
            steps: [
                { action: 'Enter search term', expected: 'Search suggestions appear' },
                { action: 'Execute search', expected: 'Results are displayed' },
                { action: 'Verify result relevance', expected: 'Results match search term' },
                { action: 'Test no results scenario', expected: 'Appropriate message shown' }
            ]
        }
    };

    /**
     * Creates test case from template
     * @param {string} templateName - Template name
     * @param {Object} customizations - Custom values
     * @returns {TestCase} Test case
     */
    static createFromTemplate(templateName, customizations = {}) {
        const template = this.templates[templateName];
        if (!template) return null;

        const builder = new TestCaseBuilder()
            .withTitle(customizations.title || template.name)
            .withDescription(customizations.description || `Test for ${template.name}`)
            .forModule(customizations.module || template.module)
            .withPriority(customizations.priority || 'medium')
            .withPreconditions(...template.preconditions);

        template.steps.forEach(step => {
            builder.addStep(step.action, step.expected);
        });

        builder.expectResult(customizations.expectedResult || 'Test completes successfully');

        return builder.build();
    }

    /**
     * Gets all template names
     * @returns {Array} Template names
     */
    static getTemplateNames() {
        return Object.keys(this.templates);
    }

    /**
     * Gets template details
     * @param {string} name - Template name
     * @returns {Object} Template details
     */
    static getTemplate(name) {
        return this.templates[name];
    }
}

// Demonstration
console.log('=== Test Case Demo ===\n');

// Create test case using builder
console.log('--- Test Case Creation ---');
const loginTest = new TestCaseBuilder()
    .withTitle('User Login - Valid Credentials')
    .withDescription('Verify that users can log in with valid credentials')
    .forModule('Authentication')
    .forFeature('User Login')
    .withPriority('high')
    .withPreconditions('User account exists', 'User is logged out')
    .withTestData({
        username: 'testuser',
        password: 'Test@123'
    })
    .addStep('Navigate to login page', 'Login form is displayed')
    .addStep('Enter valid username', 'Username field accepts input')
    .addStep('Enter valid password', 'Password is masked')
    .addStep('Click Login button', 'User is redirected to dashboard')
    .expectResult('User is successfully logged in and sees dashboard')
    .build();

console.log('Test Case:', loginTest.getSummary());
console.log('Validation:', loginTest.validate());

// Execute test case
console.log('\n--- Test Case Execution ---');
loginTest.execute({
    passed: true,
    tester: 'Automated',
    actualResult: 'User logged in successfully',
    stepResults: [
        { passed: true, actual: 'Login form displayed' },
        { passed: true, actual: 'Username entered' },
        { passed: true, actual: 'Password masked' },
        { passed: true, actual: 'Redirected to dashboard' }
    ]
});

console.log('After Execution:', loginTest.getSummary());
console.log('Steps:', loginTest.steps.map(s => ({
    step: s.stepNumber,
    status: s.status
})));

// Repository management
console.log('\n--- Test Case Repository ---');
const repository = new TestCaseRepository();
repository.save(loginTest);

// Create more test cases from templates
const crudTest = TestCaseTemplate.createFromTemplate('crud', {
    title: 'Product CRUD Operations',
    module: 'Products'
});
repository.save(crudTest);

const searchTest = TestCaseTemplate.createFromTemplate('search', {
    title: 'Product Search',
    priority: 'high'
});
repository.save(searchTest);

console.log('Repository Statistics:', repository.getStatistics());

// Get by priority
console.log('\nHigh Priority Tests:', repository.getByPriority('high').map(tc => tc.title));

// Templates
console.log('\n--- Available Templates ---');
console.log('Templates:', TestCaseTemplate.getTemplateNames());

// Template details
console.log('\nLogin Template:');
const loginTemplate = TestCaseTemplate.getTemplate('login');
console.log('Preconditions:', loginTemplate.preconditions);
console.log('Steps:', loginTemplate.steps.length);

// Clone test case
console.log('\n--- Clone Test Case ---');
const clonedTest = loginTest.clone();
console.log('Cloned:', clonedTest.getSummary());

/**
 * Best Practices for Test Cases:
 *
 * 1. Write atomic, focused test cases
 * 2. Make test cases independent
 * 3. Include clear preconditions
 * 4. Provide specific test data
 * 5. Write unambiguous steps
 * 6. Define measurable expected results
 * 7. Use templates for consistency
 * 8. Review and maintain regularly
 * 9. Prioritize based on risk
 * 10. Link to requirements for traceability
 */
