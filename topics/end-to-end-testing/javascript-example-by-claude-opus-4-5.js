/**
 * End-to-End Testing - Validating Complete System Functionality
 *
 * End-to-end testing verifies that an application functions as expected
 * from beginning to end, testing the entire workflow from the user's
 * perspective. It validates the integration of all system components
 * including UI, APIs, databases, and external services.
 *
 * Key Concepts:
 * - User Journey Testing: Following complete user workflows
 * - Full Stack Validation: Testing all layers together
 * - Real Environment: Using production-like configurations
 * - Integration Verification: Ensuring all components work together
 */

/**
 * E2ETestRunner orchestrates end-to-end test execution.
 * Manages test lifecycle, setup, and teardown.
 */
class E2ETestRunner {
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || 'http://localhost:3000';
        this.timeout = options.timeout || 30000;
        this.retries = options.retries || 2;
        this.suites = [];
        this.globalSetup = null;
        this.globalTeardown = null;
    }

    /**
     * Sets global setup function
     * @param {Function} setupFn - Setup function
     */
    setGlobalSetup(setupFn) {
        this.globalSetup = setupFn;
    }

    /**
     * Sets global teardown function
     * @param {Function} teardownFn - Teardown function
     */
    setGlobalTeardown(teardownFn) {
        this.globalTeardown = teardownFn;
    }

    /**
     * Registers a test suite
     * @param {E2ETestSuite} suite - Test suite to register
     */
    registerSuite(suite) {
        this.suites.push(suite);
    }

    /**
     * Runs all registered test suites
     * @returns {Promise<Object>} Combined results
     */
    async run() {
        console.log('\n=== E2E Test Runner ===\n');

        // Global setup
        if (this.globalSetup) {
            console.log('Running global setup...');
            await this.globalSetup();
        }

        const results = {
            suites: [],
            totalTests: 0,
            passed: 0,
            failed: 0,
            skipped: 0
        };

        try {
            for (const suite of this.suites) {
                const suiteResult = await suite.run(this);
                results.suites.push(suiteResult);
                results.totalTests += suiteResult.total;
                results.passed += suiteResult.passed;
                results.failed += suiteResult.failed;
                results.skipped += suiteResult.skipped;
            }
        } finally {
            // Global teardown
            if (this.globalTeardown) {
                console.log('\nRunning global teardown...');
                await this.globalTeardown();
            }
        }

        this.printSummary(results);
        return results;
    }

    /**
     * Prints test run summary
     * @param {Object} results - Test results
     */
    printSummary(results) {
        console.log('\n' + '='.repeat(50));
        console.log('E2E TEST SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total: ${results.totalTests}`);
        console.log(`Passed: ${results.passed}`);
        console.log(`Failed: ${results.failed}`);
        console.log(`Skipped: ${results.skipped}`);
        console.log(`Pass Rate: ${((results.passed / results.totalTests) * 100).toFixed(1)}%`);
    }
}

/**
 * E2ETestSuite groups related end-to-end tests.
 * Contains setup, teardown, and test cases.
 */
class E2ETestSuite {
    constructor(name, options = {}) {
        this.name = name;
        this.tests = [];
        this.beforeAll = null;
        this.afterAll = null;
        this.beforeEach = null;
        this.afterEach = null;
        this.skip = options.skip || false;
    }

    /**
     * Sets before all hook
     * @param {Function} fn - Hook function
     */
    setBeforeAll(fn) {
        this.beforeAll = fn;
    }

    /**
     * Sets after all hook
     * @param {Function} fn - Hook function
     */
    setAfterAll(fn) {
        this.afterAll = fn;
    }

    /**
     * Sets before each hook
     * @param {Function} fn - Hook function
     */
    setBeforeEach(fn) {
        this.beforeEach = fn;
    }

    /**
     * Sets after each hook
     * @param {Function} fn - Hook function
     */
    setAfterEach(fn) {
        this.afterEach = fn;
    }

    /**
     * Adds a test case
     * @param {string} name - Test name
     * @param {Function} testFn - Test function
     * @param {Object} options - Test options
     */
    test(name, testFn, options = {}) {
        this.tests.push({
            name,
            fn: testFn,
            skip: options.skip || false,
            timeout: options.timeout
        });
    }

    /**
     * Runs all tests in the suite
     * @param {E2ETestRunner} runner - Test runner instance
     * @returns {Promise<Object>} Suite results
     */
    async run(runner) {
        console.log(`\n--- Suite: ${this.name} ---`);

        const results = {
            suite: this.name,
            tests: [],
            total: this.tests.length,
            passed: 0,
            failed: 0,
            skipped: 0
        };

        if (this.skip) {
            console.log('  (Skipped)');
            results.skipped = this.tests.length;
            return results;
        }

        // Before all
        if (this.beforeAll) {
            await this.beforeAll();
        }

        try {
            for (const test of this.tests) {
                const testResult = await this.runTest(test, runner);
                results.tests.push(testResult);

                if (testResult.status === 'passed') results.passed++;
                else if (testResult.status === 'failed') results.failed++;
                else if (testResult.status === 'skipped') results.skipped++;
            }
        } finally {
            // After all
            if (this.afterAll) {
                await this.afterAll();
            }
        }

        return results;
    }

    /**
     * Runs a single test with retries
     * @param {Object} test - Test definition
     * @param {E2ETestRunner} runner - Test runner
     * @returns {Promise<Object>} Test result
     */
    async runTest(test, runner) {
        if (test.skip) {
            console.log(`  ○ ${test.name} (skipped)`);
            return { name: test.name, status: 'skipped' };
        }

        let lastError = null;
        const attempts = runner.retries + 1;

        for (let attempt = 1; attempt <= attempts; attempt++) {
            try {
                // Before each
                if (this.beforeEach) {
                    await this.beforeEach();
                }

                // Run test
                await test.fn();

                // After each
                if (this.afterEach) {
                    await this.afterEach();
                }

                console.log(`  ✓ ${test.name}`);
                return { name: test.name, status: 'passed', attempts: attempt };

            } catch (error) {
                lastError = error;

                if (attempt < attempts) {
                    console.log(`  ⟳ ${test.name} (retry ${attempt}/${runner.retries})`);
                }
            }
        }

        console.log(`  ✗ ${test.name}`);
        console.log(`    Error: ${lastError.message}`);
        return {
            name: test.name,
            status: 'failed',
            error: lastError.message,
            attempts
        };
    }
}

/**
 * PageObject encapsulates page interactions for E2E tests.
 * Provides clean abstraction over page elements and actions.
 */
class PageObject {
    constructor(browser, baseUrl) {
        this.browser = browser;
        this.baseUrl = baseUrl;
    }

    /**
     * Navigates to a path
     * @param {string} path - URL path
     */
    async navigate(path) {
        console.log(`      Navigating to: ${this.baseUrl}${path}`);
        // Simulated navigation
    }

    /**
     * Finds an element by selector
     * @param {string} selector - CSS selector
     * @returns {Object} Element reference
     */
    async findElement(selector) {
        console.log(`      Finding: ${selector}`);
        return { selector, found: true };
    }

    /**
     * Clicks an element
     * @param {string} selector - CSS selector
     */
    async click(selector) {
        console.log(`      Clicking: ${selector}`);
    }

    /**
     * Types text into an element
     * @param {string} selector - CSS selector
     * @param {string} text - Text to type
     */
    async type(selector, text) {
        console.log(`      Typing "${text}" into: ${selector}`);
    }

    /**
     * Gets text content of an element
     * @param {string} selector - CSS selector
     * @returns {string} Element text
     */
    async getText(selector) {
        return 'Sample text content';
    }

    /**
     * Waits for an element to be visible
     * @param {string} selector - CSS selector
     * @param {number} timeout - Timeout in ms
     */
    async waitForVisible(selector, timeout = 5000) {
        console.log(`      Waiting for: ${selector}`);
    }

    /**
     * Takes a screenshot
     * @param {string} name - Screenshot name
     * @returns {string} Screenshot path
     */
    async screenshot(name) {
        const path = `/screenshots/${name}-${Date.now()}.png`;
        console.log(`      Screenshot: ${path}`);
        return path;
    }
}

/**
 * LoginPage demonstrates the Page Object pattern.
 * Encapsulates login page interactions.
 */
class LoginPage extends PageObject {
    constructor(browser, baseUrl) {
        super(browser, baseUrl);
        this.selectors = {
            usernameInput: '#username',
            passwordInput: '#password',
            loginButton: '#login-btn',
            errorMessage: '.error-message',
            successMessage: '.welcome-message'
        };
    }

    /**
     * Opens the login page
     */
    async open() {
        await this.navigate('/login');
    }

    /**
     * Performs login action
     * @param {string} username - Username
     * @param {string} password - Password
     */
    async login(username, password) {
        await this.type(this.selectors.usernameInput, username);
        await this.type(this.selectors.passwordInput, password);
        await this.click(this.selectors.loginButton);
    }

    /**
     * Checks if login was successful
     * @returns {boolean} True if logged in
     */
    async isLoggedIn() {
        try {
            await this.waitForVisible(this.selectors.successMessage, 3000);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Gets error message if present
     * @returns {string|null} Error message
     */
    async getErrorMessage() {
        try {
            return await this.getText(this.selectors.errorMessage);
        } catch {
            return null;
        }
    }
}

/**
 * E2EAssertion provides assertion methods for E2E tests.
 * Wraps common verification patterns.
 */
class E2EAssertion {
    /**
     * Asserts that a condition is true
     * @param {boolean} condition - Condition to check
     * @param {string} message - Error message if false
     */
    static assertTrue(condition, message = 'Expected condition to be true') {
        if (!condition) {
            throw new Error(`Assertion failed: ${message}`);
        }
    }

    /**
     * Asserts that values are equal
     * @param {*} actual - Actual value
     * @param {*} expected - Expected value
     * @param {string} message - Error message
     */
    static assertEqual(actual, expected, message = '') {
        if (actual !== expected) {
            throw new Error(
                `Assertion failed: Expected "${expected}" but got "${actual}". ${message}`
            );
        }
    }

    /**
     * Asserts that string contains substring
     * @param {string} haystack - String to search
     * @param {string} needle - Substring to find
     * @param {string} message - Error message
     */
    static assertContains(haystack, needle, message = '') {
        if (!haystack.includes(needle)) {
            throw new Error(
                `Assertion failed: Expected "${haystack}" to contain "${needle}". ${message}`
            );
        }
    }

    /**
     * Asserts that element is visible
     * @param {Object} element - Element reference
     * @param {string} message - Error message
     */
    static assertVisible(element, message = 'Expected element to be visible') {
        if (!element || !element.found) {
            throw new Error(`Assertion failed: ${message}`);
        }
    }
}

/**
 * TestDataManager manages test data for E2E tests.
 * Provides data setup and cleanup utilities.
 */
class TestDataManager {
    constructor() {
        this.createdData = [];
    }

    /**
     * Creates test user
     * @param {Object} userData - User data
     * @returns {Object} Created user
     */
    async createUser(userData) {
        const user = {
            id: `user-${Date.now()}`,
            ...userData,
            createdAt: new Date().toISOString()
        };

        this.createdData.push({ type: 'user', id: user.id });
        console.log(`      Created test user: ${user.id}`);
        return user;
    }

    /**
     * Cleans up all created test data
     */
    async cleanup() {
        console.log(`    Cleaning up ${this.createdData.length} test items`);
        for (const item of this.createdData) {
            console.log(`      Deleting ${item.type}: ${item.id}`);
        }
        this.createdData = [];
    }
}

// Demonstration
console.log('=== End-to-End Testing Demo ===');

// Create test runner
const runner = new E2ETestRunner({
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
    retries: 2
});

// Create test data manager
const testData = new TestDataManager();

// Global setup
runner.setGlobalSetup(async () => {
    console.log('  Starting test server...');
});

runner.setGlobalTeardown(async () => {
    console.log('  Stopping test server...');
    await testData.cleanup();
});

// Create login test suite
const loginSuite = new E2ETestSuite('Login Functionality');

loginSuite.setBeforeEach(async () => {
    // Setup before each test
});

loginSuite.test('should login with valid credentials', async () => {
    const loginPage = new LoginPage(null, 'http://localhost:3000');
    await loginPage.open();
    await loginPage.login('testuser', 'password123');

    // Simulated successful login
    E2EAssertion.assertTrue(true, 'User should be logged in');
});

loginSuite.test('should show error with invalid credentials', async () => {
    const loginPage = new LoginPage(null, 'http://localhost:3000');
    await loginPage.open();
    await loginPage.login('invalid', 'wrongpass');

    // Simulated error message
    E2EAssertion.assertTrue(true, 'Error message should be shown');
});

loginSuite.test('should redirect to dashboard after login', async () => {
    const loginPage = new LoginPage(null, 'http://localhost:3000');
    await loginPage.open();
    await loginPage.login('testuser', 'password123');

    E2EAssertion.assertTrue(true, 'Should be on dashboard');
});

// Create user journey suite
const userJourneySuite = new E2ETestSuite('Complete User Journey');

userJourneySuite.test('should complete full purchase flow', async () => {
    console.log('      Step 1: Login');
    console.log('      Step 2: Browse products');
    console.log('      Step 3: Add to cart');
    console.log('      Step 4: Checkout');
    console.log('      Step 5: Confirm order');

    E2EAssertion.assertTrue(true, 'Order should be confirmed');
});

// Register suites
runner.registerSuite(loginSuite);
runner.registerSuite(userJourneySuite);

// Run tests
runner.run().then(results => {
    console.log('\nTest run complete.');
});

/**
 * Best Practices for End-to-End Testing:
 *
 * 1. Use Page Object pattern to encapsulate page interactions
 * 2. Test complete user journeys, not just individual features
 * 3. Keep E2E tests focused on critical paths
 * 4. Use stable selectors (data-testid) over CSS classes
 * 5. Implement proper wait strategies for async operations
 * 6. Clean up test data after each test run
 * 7. Run E2E tests in environments similar to production
 * 8. Use retries for flaky tests, but fix root causes
 * 9. Capture screenshots on failure for debugging
 * 10. Don't duplicate unit test coverage in E2E tests
 */
