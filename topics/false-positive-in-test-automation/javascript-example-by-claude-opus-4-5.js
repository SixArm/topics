/**
 * False Positive in Test Automation - Incorrect Failure Reports
 *
 * A false positive occurs when a test incorrectly reports a failure or
 * defect when the software is actually functioning correctly. This wastes
 * time investigating non-existent issues and erodes confidence in the
 * test suite, potentially leading to "alert fatigue."
 *
 * Key Causes:
 * - Timing issues with async operations
 * - Flaky selectors in UI tests
 * - Environment instability
 * - Overly strict assertions
 * - Poor test data management
 */

/**
 * FalsePositiveDetector identifies patterns causing false positives.
 * Analyzes test failures to determine if they're genuine or false alarms.
 */
class FalsePositiveDetector {
    constructor() {
        this.failureHistory = [];
        this.knownFlakyPatterns = this.defineKnownPatterns();
    }

    /**
     * Defines patterns known to cause false positives
     * @returns {Array} Pattern definitions
     */
    defineKnownPatterns() {
        return [
            {
                name: 'Timing Issue',
                indicators: ['timeout', 'element not found', 'not visible'],
                probability: 0.8,
                mitigation: 'Add explicit waits or increase timeouts'
            },
            {
                name: 'Network Flakiness',
                indicators: ['ECONNRESET', 'network error', 'fetch failed'],
                probability: 0.7,
                mitigation: 'Add retry logic or mock network calls'
            },
            {
                name: 'Race Condition',
                indicators: ['intermittent', 'sometimes fails', 'random'],
                probability: 0.6,
                mitigation: 'Add synchronization or use waitFor patterns'
            },
            {
                name: 'Selector Brittleness',
                indicators: ['element not found', 'stale element', 'no such element'],
                probability: 0.75,
                mitigation: 'Use stable selectors (data-testid)'
            },
            {
                name: 'Test Data Conflict',
                indicators: ['already exists', 'duplicate', 'constraint violation'],
                probability: 0.65,
                mitigation: 'Use unique test data or clean up before tests'
            },
            {
                name: 'Environment Issue',
                indicators: ['connection refused', 'service unavailable', 'port in use'],
                probability: 0.7,
                mitigation: 'Stabilize test environment or use containers'
            }
        ];
    }

    /**
     * Records a test failure for analysis
     * @param {Object} failure - Failure details
     */
    recordFailure(failure) {
        this.failureHistory.push({
            ...failure,
            timestamp: new Date().toISOString(),
            analyzed: false
        });
    }

    /**
     * Analyzes a failure for false positive likelihood
     * @param {Object} failure - Failure to analyze
     * @returns {Object} Analysis result
     */
    analyze(failure) {
        const matchedPatterns = [];

        for (const pattern of this.knownFlakyPatterns) {
            const matchScore = this.calculateMatchScore(failure.error, pattern.indicators);
            if (matchScore > 0) {
                matchedPatterns.push({
                    pattern: pattern.name,
                    matchScore,
                    probability: pattern.probability * matchScore,
                    mitigation: pattern.mitigation
                });
            }
        }

        // Sort by probability
        matchedPatterns.sort((a, b) => b.probability - a.probability);

        const falsePositiveProbability = matchedPatterns.length > 0
            ? matchedPatterns[0].probability
            : 0.1;

        return {
            testName: failure.testName,
            error: failure.error,
            isFalsePositiveLikely: falsePositiveProbability > 0.5,
            probability: falsePositiveProbability,
            matchedPatterns,
            recommendation: matchedPatterns[0]?.mitigation || 'Investigate failure'
        };
    }

    /**
     * Calculates match score for error against indicators
     * @param {string} error - Error message
     * @param {Array} indicators - Pattern indicators
     * @returns {number} Match score (0-1)
     */
    calculateMatchScore(error, indicators) {
        const lowerError = error.toLowerCase();
        let matches = 0;

        for (const indicator of indicators) {
            if (lowerError.includes(indicator.toLowerCase())) {
                matches++;
            }
        }

        return matches / indicators.length;
    }

    /**
     * Gets flaky test report
     * @returns {Object} Flaky test analysis
     */
    getFlakyReport() {
        const testFailureCounts = {};

        for (const failure of this.failureHistory) {
            const key = failure.testName;
            if (!testFailureCounts[key]) {
                testFailureCounts[key] = { failures: 0, analyses: [] };
            }
            testFailureCounts[key].failures++;
            testFailureCounts[key].analyses.push(this.analyze(failure));
        }

        const flakyTests = Object.entries(testFailureCounts)
            .filter(([_, data]) => data.failures > 1)
            .map(([name, data]) => ({
                name,
                failureCount: data.failures,
                avgFalsePositiveProbability:
                    data.analyses.reduce((sum, a) => sum + a.probability, 0) / data.analyses.length
            }))
            .sort((a, b) => b.avgFalsePositiveProbability - a.avgFalsePositiveProbability);

        return {
            totalFailures: this.failureHistory.length,
            uniqueTests: Object.keys(testFailureCounts).length,
            flakyTests
        };
    }
}

/**
 * RetryMechanism implements smart retry logic for flaky tests.
 * Distinguishes between transient and persistent failures.
 */
class RetryMechanism {
    constructor(options = {}) {
        this.maxRetries = options.maxRetries || 3;
        this.retryDelay = options.retryDelay || 1000;
        this.exponentialBackoff = options.exponentialBackoff || false;
        this.retryCondition = options.retryCondition || (() => true);
    }

    /**
     * Executes a test with retry logic
     * @param {Function} testFn - Test function to execute
     * @param {string} testName - Name for logging
     * @returns {Promise<Object>} Execution result
     */
    async execute(testFn, testName) {
        let lastError = null;
        const attempts = [];

        for (let attempt = 1; attempt <= this.maxRetries + 1; attempt++) {
            try {
                const startTime = Date.now();
                await testFn();
                const duration = Date.now() - startTime;

                attempts.push({ attempt, status: 'passed', duration });

                return {
                    passed: true,
                    attempts,
                    totalAttempts: attempt,
                    wasRetried: attempt > 1
                };

            } catch (error) {
                lastError = error;
                const shouldRetry = attempt <= this.maxRetries && this.retryCondition(error);

                attempts.push({
                    attempt,
                    status: 'failed',
                    error: error.message,
                    willRetry: shouldRetry
                });

                if (shouldRetry) {
                    const delay = this.calculateDelay(attempt);
                    console.log(`  Retry ${attempt}/${this.maxRetries} after ${delay}ms: ${testName}`);
                    await this.delay(delay);
                }
            }
        }

        return {
            passed: false,
            attempts,
            totalAttempts: this.maxRetries + 1,
            error: lastError.message
        };
    }

    /**
     * Calculates delay before retry
     * @param {number} attempt - Current attempt number
     * @returns {number} Delay in milliseconds
     */
    calculateDelay(attempt) {
        if (this.exponentialBackoff) {
            return this.retryDelay * Math.pow(2, attempt - 1);
        }
        return this.retryDelay;
    }

    /**
     * Delays execution
     * @param {number} ms - Milliseconds to delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * WaitStrategy provides smart waiting patterns for async operations.
 * Reduces false positives from timing issues.
 */
class WaitStrategy {
    /**
     * Waits for a condition to be true
     * @param {Function} condition - Condition function
     * @param {Object} options - Wait options
     * @returns {Promise<*>} Condition result
     */
    static async waitFor(condition, options = {}) {
        const {
            timeout = 5000,
            interval = 100,
            message = 'Condition not met'
        } = options;

        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            try {
                const result = await condition();
                if (result) {
                    return result;
                }
            } catch (e) {
                // Condition threw, continue waiting
            }

            await new Promise(resolve => setTimeout(resolve, interval));
        }

        throw new Error(`Timeout: ${message} after ${timeout}ms`);
    }

    /**
     * Waits for element to be visible
     * @param {Function} findElement - Element finder function
     * @param {Object} options - Wait options
     * @returns {Promise<Object>} Element
     */
    static async waitForElement(findElement, options = {}) {
        return this.waitFor(async () => {
            const element = await findElement();
            return element && element.visible ? element : null;
        }, { ...options, message: 'Element not visible' });
    }

    /**
     * Waits for network idle
     * @param {Function} checkNetwork - Network check function
     * @param {Object} options - Wait options
     * @returns {Promise<void>}
     */
    static async waitForNetworkIdle(checkNetwork, options = {}) {
        const { timeout = 10000, idleTime = 500 } = options;
        const startTime = Date.now();
        let lastActivity = Date.now();

        while (Date.now() - startTime < timeout) {
            const isActive = await checkNetwork();
            if (isActive) {
                lastActivity = Date.now();
            } else if (Date.now() - lastActivity >= idleTime) {
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 100));
        }

        throw new Error('Network did not become idle');
    }

    /**
     * Waits with exponential backoff
     * @param {Function} operation - Operation to attempt
     * @param {Object} options - Backoff options
     * @returns {Promise<*>} Operation result
     */
    static async withBackoff(operation, options = {}) {
        const { maxAttempts = 5, initialDelay = 100, maxDelay = 5000 } = options;

        let delay = initialDelay;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await operation();
            } catch (error) {
                if (attempt === maxAttempts) throw error;

                await new Promise(resolve => setTimeout(resolve, delay));
                delay = Math.min(delay * 2, maxDelay);
            }
        }
    }
}

/**
 * StableSelectorStrategy helps create reliable element selectors.
 * Reduces false positives from brittle selectors.
 */
class StableSelectorStrategy {
    /**
     * Gets priority-ordered selector strategies
     * @returns {Array} Selector strategies in order of preference
     */
    static getStrategies() {
        return [
            {
                name: 'data-testid',
                pattern: '[data-testid="{value}"]',
                stability: 'high',
                description: 'Dedicated test attribute - most stable'
            },
            {
                name: 'data-cy',
                pattern: '[data-cy="{value}"]',
                stability: 'high',
                description: 'Cypress convention - very stable'
            },
            {
                name: 'role + name',
                pattern: '[role="{role}"][aria-label="{name}"]',
                stability: 'high',
                description: 'Accessibility selectors - stable and meaningful'
            },
            {
                name: 'id',
                pattern: '#{value}',
                stability: 'medium',
                description: 'Unique identifier - stable if not auto-generated'
            },
            {
                name: 'name',
                pattern: '[name="{value}"]',
                stability: 'medium',
                description: 'Form element name - usually stable'
            },
            {
                name: 'class',
                pattern: '.{value}',
                stability: 'low',
                description: 'CSS class - may change with styling'
            },
            {
                name: 'tag + text',
                pattern: '{tag}:contains("{text}")',
                stability: 'low',
                description: 'Element content - may change with i18n'
            },
            {
                name: 'xpath position',
                pattern: '//*[{position}]',
                stability: 'very-low',
                description: 'Position-based - very brittle'
            }
        ];
    }

    /**
     * Evaluates selector stability
     * @param {string} selector - Selector to evaluate
     * @returns {Object} Stability evaluation
     */
    static evaluateSelector(selector) {
        const strategies = this.getStrategies();

        for (const strategy of strategies) {
            if (this.matchesStrategy(selector, strategy)) {
                return {
                    selector,
                    strategy: strategy.name,
                    stability: strategy.stability,
                    description: strategy.description,
                    recommendation: strategy.stability === 'low' || strategy.stability === 'very-low'
                        ? 'Consider using data-testid for more stable selection'
                        : 'Good selector choice'
                };
            }
        }

        return {
            selector,
            strategy: 'unknown',
            stability: 'unknown',
            recommendation: 'Use data-testid for reliable selection'
        };
    }

    /**
     * Checks if selector matches a strategy pattern
     * @param {string} selector - Selector to check
     * @param {Object} strategy - Strategy to match against
     * @returns {boolean} True if matches
     */
    static matchesStrategy(selector, strategy) {
        if (strategy.name === 'data-testid' && selector.includes('data-testid')) return true;
        if (strategy.name === 'data-cy' && selector.includes('data-cy')) return true;
        if (strategy.name === 'id' && selector.startsWith('#')) return true;
        if (strategy.name === 'class' && /^\.[a-zA-Z]/.test(selector)) return true;
        if (strategy.name === 'name' && selector.includes('[name=')) return true;
        return false;
    }
}

/**
 * TestStabilityTracker monitors test stability over time.
 * Identifies tests that frequently produce false positives.
 */
class TestStabilityTracker {
    constructor() {
        this.testHistory = new Map();
    }

    /**
     * Records a test result
     * @param {string} testName - Test name
     * @param {boolean} passed - Whether test passed
     * @param {Object} metadata - Additional metadata
     */
    record(testName, passed, metadata = {}) {
        if (!this.testHistory.has(testName)) {
            this.testHistory.set(testName, []);
        }

        this.testHistory.get(testName).push({
            passed,
            timestamp: new Date().toISOString(),
            ...metadata
        });
    }

    /**
     * Calculates stability score for a test
     * @param {string} testName - Test name
     * @param {number} recentRuns - Number of recent runs to consider
     * @returns {Object} Stability metrics
     */
    getStability(testName, recentRuns = 10) {
        const history = this.testHistory.get(testName) || [];
        const recent = history.slice(-recentRuns);

        if (recent.length === 0) {
            return { stability: 'unknown', score: 0 };
        }

        const passCount = recent.filter(r => r.passed).length;
        const score = passCount / recent.length;

        let stability;
        if (score === 1) stability = 'stable';
        else if (score >= 0.9) stability = 'mostly-stable';
        else if (score >= 0.7) stability = 'flaky';
        else stability = 'unstable';

        return {
            stability,
            score,
            passRate: `${(score * 100).toFixed(1)}%`,
            recentRuns: recent.length,
            failureCount: recent.length - passCount
        };
    }

    /**
     * Gets all flaky tests
     * @param {number} threshold - Stability threshold (0-1)
     * @returns {Array} Flaky tests
     */
    getFlakyTests(threshold = 0.9) {
        const flakyTests = [];

        for (const [testName, history] of this.testHistory) {
            const stability = this.getStability(testName);
            if (stability.score < threshold && stability.score > 0) {
                flakyTests.push({
                    name: testName,
                    ...stability
                });
            }
        }

        return flakyTests.sort((a, b) => a.score - b.score);
    }
}

// Demonstration
console.log('=== False Positive Analysis Demo ===\n');

// False positive detection
const detector = new FalsePositiveDetector();

// Record some failures
detector.recordFailure({
    testName: 'should display user profile',
    error: 'Timeout waiting for element not found after 5000ms'
});

detector.recordFailure({
    testName: 'should display user profile',
    error: 'Element not visible: .profile-header'
});

detector.recordFailure({
    testName: 'should save data to database',
    error: 'ECONNRESET: Connection reset by peer'
});

// Analyze failures
console.log('--- Failure Analysis ---');
const analysis = detector.analyze({
    testName: 'should display user profile',
    error: 'Timeout waiting for element not found'
});
console.log(`Test: ${analysis.testName}`);
console.log(`False Positive Likely: ${analysis.isFalsePositiveLikely}`);
console.log(`Probability: ${(analysis.probability * 100).toFixed(0)}%`);
console.log(`Recommendation: ${analysis.recommendation}`);

console.log('\n--- Flaky Test Report ---');
console.log(detector.getFlakyReport());

// Retry mechanism demo
console.log('\n--- Retry Mechanism ---');
const retryMechanism = new RetryMechanism({
    maxRetries: 2,
    retryDelay: 100,
    exponentialBackoff: true
});

let attemptCount = 0;
retryMechanism.execute(async () => {
    attemptCount++;
    if (attemptCount < 2) throw new Error('Transient failure');
    return 'success';
}, 'flaky-test').then(result => {
    console.log(`Result: ${result.passed ? 'Passed' : 'Failed'}`);
    console.log(`Total attempts: ${result.totalAttempts}`);
    console.log(`Was retried: ${result.wasRetried}`);
});

// Selector evaluation
console.log('\n--- Selector Stability ---');
const selectors = [
    '[data-testid="submit-button"]',
    '#submit-btn',
    '.btn-primary',
    'button:contains("Submit")'
];

for (const selector of selectors) {
    const evaluation = StableSelectorStrategy.evaluateSelector(selector);
    console.log(`${selector}: ${evaluation.stability}`);
}

// Test stability tracking
console.log('\n--- Test Stability Tracking ---');
const stabilityTracker = new TestStabilityTracker();

// Simulate test runs
const tests = ['stable-test', 'flaky-test', 'unstable-test'];
for (let i = 0; i < 10; i++) {
    stabilityTracker.record('stable-test', true);
    stabilityTracker.record('flaky-test', Math.random() > 0.3);
    stabilityTracker.record('unstable-test', Math.random() > 0.7);
}

for (const test of tests) {
    const stability = stabilityTracker.getStability(test);
    console.log(`${test}: ${stability.stability} (${stability.passRate})`);
}

/**
 * Best Practices to Prevent False Positives:
 *
 * 1. Use stable selectors (data-testid over CSS classes)
 * 2. Implement explicit waits instead of arbitrary delays
 * 3. Add retry logic for known flaky operations
 * 4. Isolate tests from external dependencies
 * 5. Use deterministic test data
 * 6. Clean up test state before and after tests
 * 7. Monitor test stability over time
 * 8. Investigate and fix flaky tests promptly
 * 9. Use appropriate assertion timeouts
 * 10. Maintain consistent test environments
 */
