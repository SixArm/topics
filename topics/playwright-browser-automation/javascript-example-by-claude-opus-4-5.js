/**
 * Playwright Browser Automation - Cross-Browser Testing Framework
 *
 * Playwright is a browser automation framework by Microsoft for end-to-end
 * testing. It supports Chromium, Firefox, and WebKit, enabling cross-browser
 * testing on Windows, macOS, and Linux. Playwright handles SPAs, async
 * operations, and provides APIs in JavaScript, Python, C#, and Java.
 *
 * Key Concepts:
 * - Cross-browser testing (Chromium, Firefox, WebKit)
 * - Auto-waiting for elements
 * - Network interception and mocking
 * - Mobile device emulation
 */

/**
 * BrowserConfig represents browser configuration options.
 */
class BrowserConfig {
    constructor(options = {}) {
        this.browserType = options.browserType || 'chromium';
        this.headless = options.headless !== false;
        this.slowMo = options.slowMo || 0;
        this.viewport = options.viewport || { width: 1280, height: 720 };
        this.userAgent = options.userAgent || null;
        this.locale = options.locale || 'en-US';
        this.timezone = options.timezone || 'America/New_York';
        this.geolocation = options.geolocation || null;
        this.permissions = options.permissions || [];
    }

    /**
     * Creates configuration for mobile device
     * @param {string} deviceName - Device to emulate
     * @returns {BrowserConfig} Mobile configuration
     */
    static forMobile(deviceName) {
        const devices = {
            'iPhone 12': {
                viewport: { width: 390, height: 844 },
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
                isMobile: true,
                hasTouch: true
            },
            'Pixel 5': {
                viewport: { width: 393, height: 851 },
                userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36',
                isMobile: true,
                hasTouch: true
            },
            'iPad Pro': {
                viewport: { width: 1024, height: 1366 },
                userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
                isMobile: true,
                hasTouch: true
            }
        };

        const device = devices[deviceName];
        if (!device) {
            throw new Error(`Unknown device: ${deviceName}`);
        }

        return new BrowserConfig({
            ...device,
            browserType: 'webkit' // Use WebKit for iOS devices
        });
    }

    /**
     * Gets configuration summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            browser: this.browserType,
            headless: this.headless,
            viewport: `${this.viewport.width}x${this.viewport.height}`,
            locale: this.locale
        };
    }
}

/**
 * PageAction represents an action that can be performed on a page.
 * Simulates Playwright's page interaction methods.
 */
class PageAction {
    constructor(type, selector, options = {}) {
        this.type = type;
        this.selector = selector;
        this.options = options;
        this.timestamp = null;
        this.duration = null;
        this.result = null;
    }

    /**
     * Executes the action (simulated)
     * @returns {Object} Action result
     */
    async execute() {
        this.timestamp = Date.now();

        // Simulate action execution
        await this.simulateWait();

        const result = {
            type: this.type,
            selector: this.selector,
            success: true,
            timestamp: this.timestamp
        };

        this.duration = Date.now() - this.timestamp;
        result.duration = this.duration;

        this.result = result;
        return result;
    }

    /**
     * Simulates auto-waiting
     */
    async simulateWait() {
        // Simulate Playwright's auto-waiting behavior
        const waitTime = Math.random() * 100 + 50;
        return new Promise(resolve => setTimeout(resolve, waitTime));
    }

    /**
     * Gets action description
     * @returns {string} Description
     */
    describe() {
        switch (this.type) {
            case 'click':
                return `Click on "${this.selector}"`;
            case 'fill':
                return `Fill "${this.selector}" with "${this.options.value}"`;
            case 'type':
                return `Type "${this.options.text}" into "${this.selector}"`;
            case 'select':
                return `Select "${this.options.value}" in "${this.selector}"`;
            case 'check':
                return `Check checkbox "${this.selector}"`;
            case 'hover':
                return `Hover over "${this.selector}"`;
            case 'screenshot':
                return `Take screenshot "${this.options.name}"`;
            default:
                return `${this.type} on "${this.selector}"`;
        }
    }
}

/**
 * TestScript represents a Playwright test script.
 * Demonstrates common testing patterns.
 */
class TestScript {
    constructor(name) {
        this.name = name;
        this.actions = [];
        this.assertions = [];
        this.config = new BrowserConfig();
    }

    /**
     * Adds a navigation action
     * @param {string} url - URL to navigate to
     * @returns {TestScript} This for chaining
     */
    goto(url) {
        this.actions.push(new PageAction('goto', url));
        return this;
    }

    /**
     * Adds a click action
     * @param {string} selector - Element selector
     * @returns {TestScript} This for chaining
     */
    click(selector) {
        this.actions.push(new PageAction('click', selector));
        return this;
    }

    /**
     * Adds a fill action
     * @param {string} selector - Input selector
     * @param {string} value - Value to fill
     * @returns {TestScript} This for chaining
     */
    fill(selector, value) {
        this.actions.push(new PageAction('fill', selector, { value }));
        return this;
    }

    /**
     * Adds a type action (character by character)
     * @param {string} selector - Input selector
     * @param {string} text - Text to type
     * @returns {TestScript} This for chaining
     */
    type(selector, text) {
        this.actions.push(new PageAction('type', selector, { text }));
        return this;
    }

    /**
     * Adds an assertion
     * @param {string} type - Assertion type
     * @param {Object} options - Assertion options
     * @returns {TestScript} This for chaining
     */
    expect(type, options) {
        this.assertions.push({ type, ...options });
        return this;
    }

    /**
     * Adds a screenshot action
     * @param {string} name - Screenshot name
     * @returns {TestScript} This for chaining
     */
    screenshot(name) {
        this.actions.push(new PageAction('screenshot', '', { name }));
        return this;
    }

    /**
     * Executes the test script (simulated)
     * @returns {Object} Test result
     */
    async run() {
        console.log(`Running test: ${this.name}`);
        const results = [];

        for (const action of this.actions) {
            console.log(`  ${action.describe()}`);
            const result = await action.execute();
            results.push(result);
        }

        // Simulate assertion checks
        const assertionResults = this.assertions.map(a => ({
            assertion: a.type,
            passed: Math.random() > 0.1 // 90% pass rate for simulation
        }));

        return {
            test: this.name,
            actions: results.length,
            assertions: assertionResults,
            passed: assertionResults.every(a => a.passed),
            duration: results.reduce((sum, r) => sum + r.duration, 0)
        };
    }

    /**
     * Generates test code
     * @returns {string} Generated code
     */
    generateCode() {
        let code = `test('${this.name}', async ({ page }) => {\n`;

        for (const action of this.actions) {
            switch (action.type) {
                case 'goto':
                    code += `  await page.goto('${action.selector}');\n`;
                    break;
                case 'click':
                    code += `  await page.click('${action.selector}');\n`;
                    break;
                case 'fill':
                    code += `  await page.fill('${action.selector}', '${action.options.value}');\n`;
                    break;
                case 'type':
                    code += `  await page.type('${action.selector}', '${action.options.text}');\n`;
                    break;
                case 'screenshot':
                    code += `  await page.screenshot({ path: '${action.options.name}.png' });\n`;
                    break;
            }
        }

        for (const assertion of this.assertions) {
            code += `  await expect(page.locator('${assertion.selector}')).${assertion.type}();\n`;
        }

        code += '});\n';
        return code;
    }
}

/**
 * NetworkInterceptor simulates Playwright's network interception.
 */
class NetworkInterceptor {
    constructor() {
        this.routes = [];
        this.requests = [];
    }

    /**
     * Adds a route handler
     * @param {string} pattern - URL pattern to match
     * @param {Object} response - Mock response
     */
    route(pattern, response) {
        this.routes.push({
            pattern,
            response,
            matches: (url) => url.includes(pattern) || new RegExp(pattern).test(url)
        });
    }

    /**
     * Intercepts a request
     * @param {Object} request - Request to intercept
     * @returns {Object} Response or null
     */
    intercept(request) {
        this.requests.push(request);

        for (const route of this.routes) {
            if (route.matches(request.url)) {
                return {
                    intercepted: true,
                    response: route.response
                };
            }
        }

        return { intercepted: false };
    }

    /**
     * Gets intercepted requests
     * @param {string} pattern - Optional filter pattern
     * @returns {Array} Matching requests
     */
    getRequests(pattern = null) {
        if (!pattern) return this.requests;
        return this.requests.filter(r => r.url.includes(pattern));
    }

    /**
     * Clears all routes and requests
     */
    clear() {
        this.routes = [];
        this.requests = [];
    }
}

/**
 * TestReporter generates test execution reports.
 */
class TestReporter {
    constructor() {
        this.results = [];
    }

    /**
     * Adds a test result
     * @param {Object} result - Test result
     */
    addResult(result) {
        this.results.push({
            ...result,
            timestamp: new Date()
        });
    }

    /**
     * Generates summary report
     * @returns {Object} Report
     */
    generateReport() {
        const passed = this.results.filter(r => r.passed).length;
        const failed = this.results.length - passed;
        const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);

        return {
            total: this.results.length,
            passed,
            failed,
            passRate: ((passed / this.results.length) * 100).toFixed(1) + '%',
            totalDuration: totalDuration + 'ms',
            results: this.results
        };
    }

    /**
     * Generates HTML report (template)
     * @returns {string} HTML report
     */
    generateHTML() {
        const report = this.generateReport();
        return `
<!DOCTYPE html>
<html>
<head><title>Test Report</title></head>
<body>
  <h1>Playwright Test Report</h1>
  <p>Total: ${report.total} | Passed: ${report.passed} | Failed: ${report.failed}</p>
  <p>Pass Rate: ${report.passRate}</p>
  <p>Duration: ${report.totalDuration}</p>
  <ul>
    ${report.results.map(r => `<li>${r.test}: ${r.passed ? '✓' : '✗'}</li>`).join('\n    ')}
  </ul>
</body>
</html>`;
    }
}

/**
 * PlaywrightBestPractices provides testing best practices.
 */
class PlaywrightBestPractices {
    /**
     * Gets selector best practices
     * @returns {Array} Best practices
     */
    static getSelectorPractices() {
        return [
            {
                practice: 'Use data-testid attributes',
                good: '[data-testid="submit-button"]',
                bad: '.btn.btn-primary.submit',
                reason: 'Decouples tests from styling and structure'
            },
            {
                practice: 'Prefer role-based selectors',
                good: 'getByRole("button", { name: "Submit" })',
                bad: 'button.submit-btn',
                reason: 'More accessible and resilient'
            },
            {
                practice: 'Use text content for labels',
                good: 'getByLabel("Email")',
                bad: '#email-input',
                reason: 'Matches user perspective'
            },
            {
                practice: 'Avoid XPath when possible',
                good: '[data-testid="item"]:nth-child(2)',
                bad: '//div[@class="list"]/div[2]',
                reason: 'CSS selectors are faster and more readable'
            }
        ];
    }

    /**
     * Gets async handling best practices
     * @returns {Array} Best practices
     */
    static getAsyncPractices() {
        return [
            {
                practice: 'Let Playwright auto-wait',
                description: 'Playwright waits for elements automatically',
                avoid: 'Manual timeouts and sleep statements'
            },
            {
                practice: 'Use waitForSelector for dynamic content',
                description: 'Wait for elements that appear after actions',
                example: "await page.waitForSelector('.loading', { state: 'hidden' })"
            },
            {
                practice: 'Use expect with timeout',
                description: 'Assertions auto-retry until timeout',
                example: "await expect(locator).toBeVisible({ timeout: 5000 })"
            }
        ];
    }

    /**
     * Gets test organization practices
     * @returns {Array} Best practices
     */
    static getOrganizationPractices() {
        return [
            { practice: 'Use Page Object Model for complex apps' },
            { practice: 'Group related tests with describe blocks' },
            { practice: 'Use fixtures for common setup' },
            { practice: 'Isolate tests - no dependencies between tests' },
            { practice: 'Use meaningful test names' },
            { practice: 'Keep tests focused and small' }
        ];
    }
}

// Demonstration
console.log('=== Playwright Browser Automation Demo ===\n');

// Browser configuration
console.log('--- Browser Configuration ---');
const desktopConfig = new BrowserConfig({ browserType: 'chromium', headless: true });
console.log('Desktop config:', desktopConfig.getSummary());

const mobileConfig = BrowserConfig.forMobile('iPhone 12');
console.log('Mobile config:', mobileConfig.getSummary());

// Create and run a test script
console.log('\n--- Test Script ---');
const loginTest = new TestScript('User can log in')
    .goto('https://example.com/login')
    .fill('[data-testid="email"]', 'user@example.com')
    .fill('[data-testid="password"]', 'password123')
    .click('[data-testid="submit"]')
    .expect('toBeVisible', { selector: '.dashboard' })
    .screenshot('after-login');

console.log('Generated code:\n', loginTest.generateCode());

// Run test
loginTest.run().then(result => {
    console.log('Test result:', result);
});

// Network interception
console.log('\n--- Network Interception ---');
const interceptor = new NetworkInterceptor();

interceptor.route('/api/users', {
    status: 200,
    body: JSON.stringify([{ id: 1, name: 'Test User' }])
});

interceptor.route('/api/error', {
    status: 500,
    body: JSON.stringify({ error: 'Server error' })
});

console.log('Intercept /api/users:', interceptor.intercept({ url: '/api/users' }));

// Test reporting
console.log('\n--- Test Reporting ---');
const reporter = new TestReporter();
reporter.addResult({ test: 'Login test', passed: true, duration: 1500 });
reporter.addResult({ test: 'Signup test', passed: true, duration: 2000 });
reporter.addResult({ test: 'Checkout test', passed: false, duration: 3000 });

console.log('Report:', reporter.generateReport());

// Best practices
console.log('\n--- Best Practices ---');
console.log('Selector practices:');
PlaywrightBestPractices.getSelectorPractices().slice(0, 2).forEach(p => {
    console.log(`  ${p.practice}`);
    console.log(`    Good: ${p.good}`);
    console.log(`    Bad: ${p.bad}`);
});

/**
 * Best Practices for Playwright Testing:
 *
 * 1. Use data-testid attributes for reliable selectors
 * 2. Let Playwright's auto-waiting handle timing
 * 3. Use Page Object Model for maintainability
 * 4. Run tests in parallel for speed
 * 5. Use network interception to mock APIs
 * 6. Test on multiple browsers (cross-browser)
 * 7. Use trace viewer for debugging failures
 * 8. Keep tests isolated and independent
 * 9. Use fixtures for common setup/teardown
 * 10. Integrate with CI/CD pipelines
 */
