/**
 * Selenium Browser Automation - Web Testing Framework
 *
 * Selenium is an open-source framework for automating web browser interactions.
 * It provides a suite of tools for browser automation, including WebDriver for
 * programmatic control, IDE for record-and-playback, and Grid for distributed
 * testing across multiple machines and browsers.
 *
 * Key Concepts:
 * - WebDriver for browser control
 * - Cross-browser testing support
 * - Element location strategies
 * - Synchronization and waits
 */

/**
 * WebDriverConfig represents WebDriver configuration options.
 */
class WebDriverConfig {
    static browsers = {
        chrome: {
            name: 'Chrome',
            driver: 'chromedriver',
            capabilities: ['headless', 'incognito', 'disable-gpu'],
            mobileEmulation: true
        },
        firefox: {
            name: 'Firefox',
            driver: 'geckodriver',
            capabilities: ['headless', 'private'],
            mobileEmulation: false
        },
        safari: {
            name: 'Safari',
            driver: 'safaridriver',
            capabilities: ['automatic-inspection'],
            mobileEmulation: false
        },
        edge: {
            name: 'Edge',
            driver: 'msedgedriver',
            capabilities: ['headless', 'inprivate'],
            mobileEmulation: true
        }
    };

    /**
     * Creates a driver configuration
     * @param {Object} options - Configuration options
     * @returns {Object} Driver configuration
     */
    static create(options) {
        const browser = this.browsers[options.browser] || this.browsers.chrome;

        return {
            browser: browser.name,
            driver: browser.driver,
            headless: options.headless || false,
            windowSize: options.windowSize || { width: 1920, height: 1080 },
            implicitWait: options.implicitWait || 10000,
            pageLoadTimeout: options.pageLoadTimeout || 30000,
            scriptTimeout: options.scriptTimeout || 30000,
            capabilities: this.buildCapabilities(options, browser)
        };
    }

    /**
     * Builds browser capabilities
     * @param {Object} options - Options
     * @param {Object} browser - Browser config
     * @returns {Object} Capabilities
     */
    static buildCapabilities(options, browser) {
        const caps = {
            browserName: browser.name.toLowerCase(),
            acceptInsecureCerts: options.acceptInsecureCerts || false
        };

        if (options.headless && browser.capabilities.includes('headless')) {
            caps.headless = true;
        }

        if (options.mobileEmulation && browser.mobileEmulation) {
            caps.mobileEmulation = {
                deviceName: options.deviceName || 'iPhone 12 Pro'
            };
        }

        return caps;
    }
}

/**
 * ElementLocator provides element location strategies.
 */
class ElementLocator {
    static strategies = {
        id: {
            name: 'ID',
            syntax: 'By.id("elementId")',
            description: 'Locate by element ID attribute',
            reliability: 'high',
            performance: 'fast',
            example: 'driver.findElement(By.id("submit-btn"))'
        },
        name: {
            name: 'Name',
            syntax: 'By.name("elementName")',
            description: 'Locate by name attribute',
            reliability: 'medium',
            performance: 'fast',
            example: 'driver.findElement(By.name("username"))'
        },
        className: {
            name: 'Class Name',
            syntax: 'By.className("class")',
            description: 'Locate by CSS class',
            reliability: 'low',
            performance: 'fast',
            example: 'driver.findElement(By.className("btn-primary"))'
        },
        tagName: {
            name: 'Tag Name',
            syntax: 'By.tagName("tag")',
            description: 'Locate by HTML tag',
            reliability: 'low',
            performance: 'fast',
            example: 'driver.findElements(By.tagName("input"))'
        },
        linkText: {
            name: 'Link Text',
            syntax: 'By.linkText("text")',
            description: 'Locate anchor by exact text',
            reliability: 'medium',
            performance: 'medium',
            example: 'driver.findElement(By.linkText("Sign Up"))'
        },
        partialLinkText: {
            name: 'Partial Link Text',
            syntax: 'By.partialLinkText("text")',
            description: 'Locate anchor by partial text',
            reliability: 'low',
            performance: 'medium',
            example: 'driver.findElement(By.partialLinkText("Sign"))'
        },
        css: {
            name: 'CSS Selector',
            syntax: 'By.css("selector")',
            description: 'Locate by CSS selector',
            reliability: 'high',
            performance: 'fast',
            example: 'driver.findElement(By.css("#login form input[type=email]"))'
        },
        xpath: {
            name: 'XPath',
            syntax: 'By.xpath("expression")',
            description: 'Locate by XPath expression',
            reliability: 'high',
            performance: 'slow',
            example: 'driver.findElement(By.xpath("//button[contains(text(),\'Submit\')]"))'
        }
    };

    /**
     * Gets strategy by name
     * @param {string} name - Strategy name
     * @returns {Object} Strategy
     */
    static getStrategy(name) {
        return this.strategies[name];
    }

    /**
     * Recommends a locator strategy
     * @param {Object} element - Element attributes
     * @returns {Object} Recommendation
     */
    static recommend(element) {
        if (element.id) {
            return {
                strategy: 'id',
                locator: element.id,
                reason: 'ID is unique and most reliable'
            };
        }

        if (element.dataTestId) {
            return {
                strategy: 'css',
                locator: `[data-testid="${element.dataTestId}"]`,
                reason: 'Test IDs are designed for automation'
            };
        }

        if (element.name && element.type) {
            return {
                strategy: 'css',
                locator: `${element.tag}[name="${element.name}"]`,
                reason: 'Name with tag provides good specificity'
            };
        }

        return {
            strategy: 'css',
            locator: 'Consider adding data-testid attribute',
            reason: 'No reliable locator available'
        };
    }

    /**
     * Gets best practices
     * @returns {Array} Best practices
     */
    static getBestPractices() {
        return [
            'Prefer ID and data-testid attributes',
            'Avoid locators dependent on styling (class names)',
            'Avoid locators dependent on text content',
            'Use CSS selectors over XPath when possible',
            'Keep locators as simple as possible',
            'Avoid index-based locators',
            'Create custom attributes for testing (data-testid)',
            'Centralize locators in page objects'
        ];
    }
}

/**
 * WaitStrategy provides synchronization strategies.
 */
class WaitStrategy {
    static types = {
        implicit: {
            name: 'Implicit Wait',
            description: 'Global wait applied to all element lookups',
            usage: 'driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS)',
            pros: ['Simple to set up', 'Applied globally'],
            cons: ['Can slow down tests', 'Not element-specific']
        },
        explicit: {
            name: 'Explicit Wait',
            description: 'Wait for specific condition on specific element',
            usage: 'new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(element))',
            pros: ['Precise control', 'Condition-based'],
            cons: ['More code', 'Must be applied per element']
        },
        fluent: {
            name: 'Fluent Wait',
            description: 'Explicit wait with polling and exception handling',
            usage: 'new FluentWait(driver).withTimeout(30, SECONDS).pollingEvery(5, SECONDS).ignoring(NoSuchElementException.class)',
            pros: ['Maximum control', 'Custom polling'],
            cons: ['More complex setup']
        }
    };

    static conditions = [
        'elementToBeClickable',
        'visibilityOfElementLocated',
        'presenceOfElementLocated',
        'invisibilityOfElementLocated',
        'textToBePresentInElement',
        'titleContains',
        'urlContains',
        'alertIsPresent',
        'frameToBeAvailableAndSwitchToIt'
    ];

    /**
     * Recommends wait strategy
     * @param {Object} scenario - Test scenario
     * @returns {Object} Recommendation
     */
    static recommend(scenario) {
        if (scenario.dynamicContent || scenario.ajaxHeavy) {
            return {
                strategy: 'explicit',
                condition: 'visibilityOfElementLocated',
                reason: 'Dynamic content needs explicit waits'
            };
        }

        if (scenario.complexTiming) {
            return {
                strategy: 'fluent',
                pollingInterval: 500,
                reason: 'Complex timing needs fine-grained control'
            };
        }

        return {
            strategy: 'explicit',
            condition: 'elementToBeClickable',
            reason: 'Default recommendation for most scenarios'
        };
    }
}

/**
 * PageObject demonstrates the Page Object pattern.
 */
class PageObject {
    constructor(driver) {
        this.driver = driver;
        this.url = '';
        this.elements = {};
    }

    /**
     * Navigates to the page
     */
    async navigate() {
        await this.driver.get(this.url);
    }

    /**
     * Gets an element
     * @param {string} name - Element name
     * @returns {Object} Element
     */
    async getElement(name) {
        const locator = this.elements[name];
        if (!locator) {
            throw new Error(`Element ${name} not defined`);
        }
        return await this.driver.findElement(locator);
    }

    /**
     * Waits for element
     * @param {string} name - Element name
     * @param {number} timeout - Timeout in ms
     */
    async waitForElement(name, timeout = 10000) {
        const locator = this.elements[name];
        // Simulated wait
        return await this.driver.wait(
            () => this.driver.findElement(locator),
            timeout
        );
    }
}

/**
 * LoginPage example of a Page Object.
 */
class LoginPage extends PageObject {
    constructor(driver) {
        super(driver);
        this.url = '/login';
        this.elements = {
            usernameInput: { css: '#username' },
            passwordInput: { css: '#password' },
            loginButton: { css: 'button[type="submit"]' },
            errorMessage: { css: '.error-message' },
            forgotPasswordLink: { linkText: 'Forgot Password?' }
        };
    }

    /**
     * Performs login
     * @param {string} username - Username
     * @param {string} password - Password
     */
    async login(username, password) {
        const usernameEl = await this.getElement('usernameInput');
        const passwordEl = await this.getElement('passwordInput');
        const loginBtn = await this.getElement('loginButton');

        await usernameEl.sendKeys(username);
        await passwordEl.sendKeys(password);
        await loginBtn.click();
    }

    /**
     * Gets error message
     * @returns {string} Error message
     */
    async getErrorMessage() {
        const errorEl = await this.getElement('errorMessage');
        return await errorEl.getText();
    }
}

/**
 * SeleniumTestRunner simulates test execution.
 */
class SeleniumTestRunner {
    constructor(config) {
        this.config = config;
        this.results = [];
        this.startTime = null;
    }

    /**
     * Runs a test suite
     * @param {Array} tests - Tests to run
     * @returns {Object} Results
     */
    async runSuite(tests) {
        this.startTime = Date.now();
        this.results = [];

        for (const test of tests) {
            const result = await this.runTest(test);
            this.results.push(result);
        }

        return this.generateReport();
    }

    /**
     * Runs a single test
     * @param {Object} test - Test to run
     * @returns {Object} Result
     */
    async runTest(test) {
        const startTime = Date.now();

        try {
            // Simulate test execution
            await new Promise(resolve => setTimeout(resolve, 100));

            const passed = Math.random() > 0.1; // 90% pass rate

            return {
                name: test.name,
                status: passed ? 'passed' : 'failed',
                duration: Date.now() - startTime,
                browser: this.config.browser,
                error: passed ? null : 'Simulated failure'
            };
        } catch (error) {
            return {
                name: test.name,
                status: 'error',
                duration: Date.now() - startTime,
                error: error.message
            };
        }
    }

    /**
     * Generates test report
     * @returns {Object} Report
     */
    generateReport() {
        const passed = this.results.filter(r => r.status === 'passed').length;
        const failed = this.results.filter(r => r.status === 'failed').length;
        const errors = this.results.filter(r => r.status === 'error').length;

        return {
            browser: this.config.browser,
            totalTests: this.results.length,
            passed,
            failed,
            errors,
            passRate: ((passed / this.results.length) * 100).toFixed(1) + '%',
            duration: Date.now() - this.startTime,
            results: this.results
        };
    }
}

/**
 * SeleniumGrid demonstrates grid configuration.
 */
class SeleniumGrid {
    static topology = {
        hub: {
            role: 'Hub',
            description: 'Central point that receives test requests',
            responsibilities: [
                'Receives test requests',
                'Distributes to appropriate node',
                'Manages node registration',
                'Provides test queuing'
            ]
        },
        node: {
            role: 'Node',
            description: 'Machine that runs browser instances',
            responsibilities: [
                'Registers with hub',
                'Runs browser sessions',
                'Reports results back',
                'Manages browser instances'
            ]
        }
    };

    /**
     * Creates grid configuration
     * @param {Object} options - Grid options
     * @returns {Object} Configuration
     */
    static createConfig(options) {
        return {
            hubUrl: options.hubUrl || 'http://localhost:4444/wd/hub',
            maxSessions: options.maxSessions || 5,
            browsers: options.browsers || ['chrome', 'firefox'],
            nodeTimeout: options.nodeTimeout || 300,
            sessionTimeout: options.sessionTimeout || 300,
            capabilities: options.browsers?.map(browser => ({
                browserName: browser,
                maxInstances: options.instancesPerBrowser || 2,
                platform: options.platform || 'ANY'
            }))
        };
    }

    /**
     * Gets grid benefits
     * @returns {Array} Benefits
     */
    static getBenefits() {
        return [
            'Parallel test execution across machines',
            'Cross-browser testing from single codebase',
            'Scalable test infrastructure',
            'Reduced total test execution time',
            'Centralized test management'
        ];
    }
}

/**
 * SeleniumBestPractices provides best practices.
 */
class SeleniumBestPractices {
    /**
     * Gets best practices
     * @returns {Array} Best practices
     */
    static getPractices() {
        return [
            {
                category: 'Locators',
                practices: [
                    'Use unique, stable locators (ID, data-testid)',
                    'Avoid brittle locators (XPath with indices)',
                    'Keep locators in Page Objects'
                ]
            },
            {
                category: 'Waits',
                practices: [
                    'Avoid Thread.sleep() - use explicit waits',
                    'Wait for specific conditions, not arbitrary time',
                    'Set reasonable timeouts'
                ]
            },
            {
                category: 'Test Design',
                practices: [
                    'Use Page Object pattern',
                    'Keep tests independent',
                    'Clean up test data after tests',
                    'Make tests deterministic'
                ]
            },
            {
                category: 'Performance',
                practices: [
                    'Run tests in parallel when possible',
                    'Use headless mode for CI',
                    'Minimize browser restarts',
                    'Use Selenium Grid for scaling'
                ]
            },
            {
                category: 'Maintenance',
                practices: [
                    'Centralize configuration',
                    'Use meaningful test names',
                    'Add logging and screenshots on failure',
                    'Regular locator maintenance'
                ]
            }
        ];
    }
}

// Demonstration
console.log('=== Selenium Browser Automation Demo ===\n');

// WebDriver configuration
console.log('--- WebDriver Configuration ---');
const config = WebDriverConfig.create({
    browser: 'chrome',
    headless: true,
    windowSize: { width: 1920, height: 1080 },
    implicitWait: 10000
});
console.log('Config:', config);

// Element locators
console.log('\n--- Element Locator Strategies ---');
Object.values(ElementLocator.strategies).slice(0, 4).forEach(strategy => {
    console.log(`${strategy.name}: ${strategy.description} (${strategy.reliability} reliability)`);
});

console.log('\nLocator recommendation:', ElementLocator.recommend({
    id: 'submit-button',
    tag: 'button'
}));

// Wait strategies
console.log('\n--- Wait Strategies ---');
Object.values(WaitStrategy.types).forEach(type => {
    console.log(`${type.name}: ${type.description}`);
});

console.log('\nWait recommendation:', WaitStrategy.recommend({
    dynamicContent: true,
    ajaxHeavy: true
}));

// Page Object pattern
console.log('\n--- Page Object Pattern ---');
console.log('LoginPage elements:', {
    usernameInput: '#username',
    passwordInput: '#password',
    loginButton: 'button[type="submit"]'
});

// Test execution
console.log('\n--- Test Execution ---');
const runner = new SeleniumTestRunner({ browser: 'Chrome' });
const tests = [
    { name: 'Login with valid credentials' },
    { name: 'Login with invalid password' },
    { name: 'Forgot password flow' },
    { name: 'Remember me functionality' }
];

// Simulate async execution
Promise.resolve().then(async () => {
    const report = await runner.runSuite(tests);
    console.log('Test Report:', {
        browser: report.browser,
        passed: report.passed,
        failed: report.failed,
        passRate: report.passRate
    });
});

// Selenium Grid
console.log('\n--- Selenium Grid ---');
console.log('Grid topology:', Object.keys(SeleniumGrid.topology));
console.log('Grid benefits:', SeleniumGrid.getBenefits().slice(0, 3));

// Best practices
console.log('\n--- Best Practices ---');
SeleniumBestPractices.getPractices().slice(0, 3).forEach(category => {
    console.log(`\n${category.category}:`);
    category.practices.forEach(p => console.log(`  - ${p}`));
});

/**
 * Best Practices for Selenium Automation:
 *
 * 1. Use Page Object pattern for maintainability
 * 2. Prefer explicit waits over implicit waits
 * 3. Use stable locators (ID, data-testid)
 * 4. Keep tests independent and atomic
 * 5. Run tests in parallel for speed
 * 6. Use Selenium Grid for cross-browser testing
 * 7. Add screenshots and logs on failure
 * 8. Clean up test data after tests
 * 9. Use headless mode in CI environments
 * 10. Regularly update Selenium and browser drivers
 */
