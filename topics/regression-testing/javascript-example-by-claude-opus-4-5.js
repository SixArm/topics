/**
 * Regression Testing - Ensuring Changes Don't Break Existing Functionality
 *
 * Regression testing is a type of software testing that aims to ensure that
 * changes or updates to a software application do not introduce new bugs or
 * issues that were not present in previous versions. It involves retesting
 * the system to verify existing functionalities still work as intended.
 *
 * Key Concepts:
 * - Verify existing functionality after changes
 * - Detect unintended side effects
 * - Automated test suites for efficiency
 * - Risk-based test selection
 */

/**
 * RegressionTestSuite manages a collection of regression tests.
 */
class RegressionTestSuite {
    constructor(options) {
        this.name = options.name;
        this.version = options.version;
        this.tests = [];
        this.lastRun = null;
        this.history = [];
    }

    /**
     * Adds a test to the suite
     * @param {Object} test - Test definition
     */
    addTest(test) {
        this.tests.push({
            id: test.id || `RT-${this.tests.length + 1}`,
            name: test.name,
            category: test.category,
            priority: test.priority || 'medium', // critical, high, medium, low
            automated: test.automated !== false,
            executionTime: test.executionTime || 0,
            lastResult: null,
            addedInVersion: this.version
        });
    }

    /**
     * Gets tests by priority
     * @param {string} priority - Priority level
     * @returns {Array} Filtered tests
     */
    getByPriority(priority) {
        return this.tests.filter(t => t.priority === priority);
    }

    /**
     * Gets tests by category
     * @param {string} category - Category name
     * @returns {Array} Filtered tests
     */
    getByCategory(category) {
        return this.tests.filter(t => t.category === category);
    }

    /**
     * Executes the test suite
     * @param {Object} options - Execution options
     * @returns {Object} Execution results
     */
    execute(options = {}) {
        const startTime = Date.now();
        const testsToRun = options.subset || this.tests;
        const results = [];

        for (const test of testsToRun) {
            // Simulate test execution
            const passed = Math.random() > 0.1; // 90% pass rate simulation
            const result = {
                testId: test.id,
                testName: test.name,
                status: passed ? 'passed' : 'failed',
                duration: test.executionTime || Math.floor(Math.random() * 1000),
                timestamp: new Date()
            };

            test.lastResult = result.status;
            results.push(result);
        }

        const endTime = Date.now();
        const runSummary = {
            suiteVersion: this.version,
            totalTests: testsToRun.length,
            passed: results.filter(r => r.status === 'passed').length,
            failed: results.filter(r => r.status === 'failed').length,
            duration: endTime - startTime,
            timestamp: new Date(),
            results
        };

        this.lastRun = runSummary;
        this.history.push(runSummary);

        return runSummary;
    }

    /**
     * Gets suite statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const automated = this.tests.filter(t => t.automated).length;
        const byPriority = {
            critical: this.getByPriority('critical').length,
            high: this.getByPriority('high').length,
            medium: this.getByPriority('medium').length,
            low: this.getByPriority('low').length
        };

        return {
            totalTests: this.tests.length,
            automatedTests: automated,
            manualTests: this.tests.length - automated,
            automationRate: ((automated / this.tests.length) * 100).toFixed(1) + '%',
            byPriority,
            estimatedRunTime: this.tests.reduce((sum, t) => sum + (t.executionTime || 60), 0)
        };
    }
}

/**
 * TestSelector helps select relevant tests for regression.
 */
class TestSelector {
    /**
     * Selects tests based on code changes
     * @param {Array} allTests - All available tests
     * @param {Array} changedFiles - Files that changed
     * @returns {Array} Selected tests
     */
    static selectByImpact(allTests, changedFiles) {
        // Map of file patterns to test categories
        const impactMap = {
            'auth': ['authentication', 'authorization', 'security'],
            'payment': ['payment', 'billing', 'checkout'],
            'user': ['user', 'profile', 'account'],
            'api': ['api', 'integration', 'endpoints'],
            'ui': ['ui', 'frontend', 'rendering']
        };

        const affectedCategories = new Set();

        for (const file of changedFiles) {
            for (const [pattern, categories] of Object.entries(impactMap)) {
                if (file.toLowerCase().includes(pattern)) {
                    categories.forEach(c => affectedCategories.add(c));
                }
            }
        }

        const selectedTests = allTests.filter(test =>
            affectedCategories.has(test.category) || test.priority === 'critical'
        );

        return {
            selectedTests,
            selectionReason: 'Impact-based selection',
            affectedCategories: Array.from(affectedCategories),
            coverageRatio: (selectedTests.length / allTests.length * 100).toFixed(1) + '%'
        };
    }

    /**
     * Selects tests based on risk
     * @param {Array} allTests - All available tests
     * @param {Object} riskAssessment - Risk assessment
     * @returns {Array} Selected tests
     */
    static selectByRisk(allTests, riskAssessment) {
        let priorityThreshold;

        switch (riskAssessment.level) {
            case 'high':
                priorityThreshold = ['critical', 'high', 'medium', 'low'];
                break;
            case 'medium':
                priorityThreshold = ['critical', 'high', 'medium'];
                break;
            case 'low':
                priorityThreshold = ['critical', 'high'];
                break;
            default:
                priorityThreshold = ['critical'];
        }

        return allTests.filter(test => priorityThreshold.includes(test.priority));
    }

    /**
     * Selects smoke tests for quick validation
     * @param {Array} allTests - All available tests
     * @returns {Array} Smoke tests
     */
    static selectSmokeTests(allTests) {
        return allTests.filter(test =>
            test.priority === 'critical' && test.automated
        );
    }
}

/**
 * RegressionAnalyzer analyzes regression test results.
 */
class RegressionAnalyzer {
    /**
     * Compares two test runs
     * @param {Object} previous - Previous run results
     * @param {Object} current - Current run results
     * @returns {Object} Comparison
     */
    static compareRuns(previous, current) {
        const newFailures = [];
        const fixedTests = [];
        const consistentFailures = [];

        const prevResults = new Map(previous.results.map(r => [r.testId, r.status]));
        const currResults = new Map(current.results.map(r => [r.testId, r.status]));

        for (const [testId, currStatus] of currResults) {
            const prevStatus = prevResults.get(testId);

            if (prevStatus === 'passed' && currStatus === 'failed') {
                newFailures.push(testId);
            } else if (prevStatus === 'failed' && currStatus === 'passed') {
                fixedTests.push(testId);
            } else if (prevStatus === 'failed' && currStatus === 'failed') {
                consistentFailures.push(testId);
            }
        }

        return {
            newFailures,
            fixedTests,
            consistentFailures,
            passRateChange: (current.passed / current.totalTests * 100) -
                           (previous.passed / previous.totalTests * 100),
            regression: newFailures.length > 0,
            summary: newFailures.length > 0
                ? `Regression detected: ${newFailures.length} new failures`
                : 'No regression detected'
        };
    }

    /**
     * Identifies flaky tests
     * @param {Array} runHistory - History of test runs
     * @returns {Array} Flaky tests
     */
    static identifyFlakyTests(runHistory) {
        const testHistory = new Map();

        // Collect results for each test
        for (const run of runHistory) {
            for (const result of run.results) {
                if (!testHistory.has(result.testId)) {
                    testHistory.set(result.testId, []);
                }
                testHistory.get(result.testId).push(result.status);
            }
        }

        // Identify tests with inconsistent results
        const flakyTests = [];
        for (const [testId, results] of testHistory) {
            const passCount = results.filter(r => r === 'passed').length;
            const failCount = results.filter(r => r === 'failed').length;

            if (passCount > 0 && failCount > 0) {
                flakyTests.push({
                    testId,
                    passRate: (passCount / results.length * 100).toFixed(1) + '%',
                    failRate: (failCount / results.length * 100).toFixed(1) + '%',
                    totalRuns: results.length,
                    flakinessScore: Math.min(passCount, failCount) / results.length
                });
            }
        }

        return flakyTests.sort((a, b) => b.flakinessScore - a.flakinessScore);
    }
}

/**
 * RegressionStrategy defines different regression testing approaches.
 */
class RegressionStrategy {
    static strategies = {
        retestAll: {
            name: 'Retest All',
            description: 'Run all tests in the regression suite',
            when: 'Major releases, significant changes',
            pros: ['Complete coverage', 'High confidence'],
            cons: ['Time consuming', 'Resource intensive'],
            coverage: '100%'
        },
        selective: {
            name: 'Selective Regression',
            description: 'Run tests based on code changes and impact',
            when: 'Regular updates, targeted changes',
            pros: ['Faster execution', 'Efficient resource use'],
            cons: ['May miss edge cases', 'Requires impact analysis'],
            coverage: '40-70%'
        },
        prioritized: {
            name: 'Prioritized Regression',
            description: 'Run tests in priority order until time/budget exhausted',
            when: 'Time-constrained releases',
            pros: ['Covers critical functionality first', 'Flexible'],
            cons: ['May skip lower priority tests'],
            coverage: 'Variable'
        },
        riskBased: {
            name: 'Risk-Based Regression',
            description: 'Focus on high-risk areas based on risk assessment',
            when: 'Changes in critical modules',
            pros: ['Targets highest risk', 'Cost-effective'],
            cons: ['Requires accurate risk assessment'],
            coverage: 'Risk-dependent'
        }
    };

    /**
     * Recommends a strategy
     * @param {Object} context - Context for recommendation
     * @returns {Object} Recommended strategy
     */
    static recommend(context) {
        if (context.releaseType === 'major') {
            return { strategy: 'retestAll', reason: 'Major release requires full coverage' };
        }

        if (context.timeAvailable < context.fullSuiteTime * 0.5) {
            return { strategy: 'prioritized', reason: 'Limited time, prioritize critical tests' };
        }

        if (context.changesAreLocalized) {
            return { strategy: 'selective', reason: 'Changes are localized, targeted testing sufficient' };
        }

        if (context.highRiskChanges) {
            return { strategy: 'riskBased', reason: 'High-risk changes require focused testing' };
        }

        return { strategy: 'selective', reason: 'Default strategy for regular updates' };
    }
}

/**
 * RegressionReport generates regression test reports.
 */
class RegressionReport {
    /**
     * Generates a summary report
     * @param {Object} runResults - Test run results
     * @param {Object} comparison - Comparison with previous run
     * @returns {Object} Report
     */
    static generate(runResults, comparison = null) {
        const report = {
            title: 'Regression Test Report',
            timestamp: new Date(),
            summary: {
                totalTests: runResults.totalTests,
                passed: runResults.passed,
                failed: runResults.failed,
                passRate: (runResults.passed / runResults.totalTests * 100).toFixed(2) + '%',
                duration: runResults.duration + 'ms'
            },
            failedTests: runResults.results
                .filter(r => r.status === 'failed')
                .map(r => ({ id: r.testId, name: r.testName })),
            recommendation: ''
        };

        if (comparison) {
            report.comparison = {
                newFailures: comparison.newFailures.length,
                fixedTests: comparison.fixedTests.length,
                passRateChange: comparison.passRateChange.toFixed(2) + '%',
                regressionDetected: comparison.regression
            };
        }

        // Generate recommendation
        if (runResults.failed === 0) {
            report.recommendation = 'All tests passed. Safe to proceed.';
        } else if (comparison && comparison.newFailures.length > 0) {
            report.recommendation = 'New failures detected. Investigate before release.';
        } else {
            report.recommendation = 'Some tests failing. Review failure details.';
        }

        return report;
    }
}

// Demonstration
console.log('=== Regression Testing Demo ===\n');

// Create regression test suite
console.log('--- Regression Test Suite ---');
const suite = new RegressionTestSuite({
    name: 'E-Commerce Platform',
    version: '2.1.0'
});

// Add tests
suite.addTest({ name: 'User login', category: 'authentication', priority: 'critical', executionTime: 500 });
suite.addTest({ name: 'Add to cart', category: 'shopping', priority: 'critical', executionTime: 800 });
suite.addTest({ name: 'Checkout flow', category: 'payment', priority: 'critical', executionTime: 1200 });
suite.addTest({ name: 'Search products', category: 'search', priority: 'high', executionTime: 600 });
suite.addTest({ name: 'Apply coupon', category: 'payment', priority: 'medium', executionTime: 400 });
suite.addTest({ name: 'View order history', category: 'user', priority: 'medium', executionTime: 500 });
suite.addTest({ name: 'Update profile', category: 'user', priority: 'low', executionTime: 300 });

console.log('Suite Statistics:', suite.getStatistics());

// Test selection
console.log('\n--- Test Selection ---');
const changedFiles = ['auth/login.js', 'auth/jwt.js', 'api/users.js'];
const selection = TestSelector.selectByImpact(suite.tests, changedFiles);
console.log('Impact-based selection:', {
    selectedCount: selection.selectedTests.length,
    affectedCategories: selection.affectedCategories,
    coverageRatio: selection.coverageRatio
});

// Execute tests
console.log('\n--- Test Execution ---');
const previousRun = suite.execute();
console.log('First run:', {
    passed: previousRun.passed,
    failed: previousRun.failed,
    passRate: (previousRun.passed / previousRun.totalTests * 100).toFixed(1) + '%'
});

// Second run for comparison
const currentRun = suite.execute();
console.log('Second run:', {
    passed: currentRun.passed,
    failed: currentRun.failed,
    passRate: (currentRun.passed / currentRun.totalTests * 100).toFixed(1) + '%'
});

// Analyze results
console.log('\n--- Regression Analysis ---');
const comparison = RegressionAnalyzer.compareRuns(previousRun, currentRun);
console.log('Comparison:', comparison);

// Identify flaky tests
console.log('\n--- Flaky Test Detection ---');
const flakyTests = RegressionAnalyzer.identifyFlakyTests(suite.history);
console.log('Flaky tests:', flakyTests.slice(0, 3));

// Strategy recommendation
console.log('\n--- Strategy Recommendation ---');
const recommendation = RegressionStrategy.recommend({
    releaseType: 'minor',
    timeAvailable: 30000,
    fullSuiteTime: 60000,
    changesAreLocalized: true,
    highRiskChanges: false
});
console.log('Recommended strategy:', recommendation);

// Generate report
console.log('\n--- Regression Report ---');
const report = RegressionReport.generate(currentRun, comparison);
console.log('Report:', report);

/**
 * Best Practices for Regression Testing:
 *
 * 1. Automate regression tests for efficiency
 * 2. Prioritize tests by risk and criticality
 * 3. Run regression tests after every code change
 * 4. Keep regression suite maintainable and updated
 * 5. Remove obsolete tests, add tests for new features
 * 6. Use test selection techniques to optimize execution
 * 7. Track and address flaky tests
 * 8. Integrate into CI/CD pipeline
 * 9. Monitor test execution time trends
 * 10. Report results clearly to stakeholders
 */
