/**
 * The Law of Large Numbers - Statistical Convergence in Testing
 *
 * The Law of Large Numbers states that as sample size increases, the sample
 * mean converges to the population mean. In testing, this means more test
 * executions provide more reliable metrics, and larger test suites give
 * better coverage estimates of actual software quality.
 *
 * Key Concepts:
 * - Sample size and reliability
 * - Convergence to true values
 * - Statistical significance
 * - Application to test metrics
 */

/**
 * LargeNumbersSimulator demonstrates the law.
 */
class LargeNumbersSimulator {
    /**
     * Simulates coin flips to show convergence
     * @param {number} flips - Number of flips
     * @param {number} trueProbability - True probability of heads
     * @returns {Object} Simulation result
     */
    static coinFlip(flips, trueProbability = 0.5) {
        let heads = 0;
        const convergence = [];

        for (let i = 1; i <= flips; i++) {
            if (Math.random() < trueProbability) {
                heads++;
            }

            if (i % Math.max(1, Math.floor(flips / 10)) === 0 || i === flips) {
                convergence.push({
                    flips: i,
                    headsRatio: (heads / i).toFixed(4),
                    deviation: Math.abs(heads / i - trueProbability).toFixed(4)
                });
            }
        }

        return {
            totalFlips: flips,
            heads,
            tails: flips - heads,
            observedRatio: (heads / flips).toFixed(4),
            trueProbability,
            convergence
        };
    }

    /**
     * Simulates test execution to show reliability
     * @param {number} runs - Number of test runs
     * @param {number} truePassRate - True pass rate
     * @returns {Object} Simulation result
     */
    static testExecution(runs, truePassRate = 0.95) {
        let passes = 0;
        const convergence = [];

        for (let i = 1; i <= runs; i++) {
            if (Math.random() < truePassRate) {
                passes++;
            }

            if (i % Math.max(1, Math.floor(runs / 10)) === 0 || i === runs) {
                convergence.push({
                    runs: i,
                    passRate: ((passes / i) * 100).toFixed(2) + '%',
                    deviation: (Math.abs(passes / i - truePassRate) * 100).toFixed(2) + '%'
                });
            }
        }

        return {
            totalRuns: runs,
            passes,
            failures: runs - passes,
            observedPassRate: ((passes / runs) * 100).toFixed(2) + '%',
            truePassRate: (truePassRate * 100).toFixed(2) + '%',
            convergence
        };
    }
}

/**
 * SampleSizeCalculator calculates required sample sizes.
 */
class SampleSizeCalculator {
    /**
     * Calculates required sample size for desired confidence
     * @param {number} confidenceLevel - Confidence level (e.g., 0.95)
     * @param {number} marginOfError - Acceptable margin of error
     * @param {number} estimatedProportion - Estimated proportion (default 0.5)
     * @returns {Object} Sample size calculation
     */
    static calculate(confidenceLevel, marginOfError, estimatedProportion = 0.5) {
        // Z-scores for common confidence levels
        const zScores = {
            0.90: 1.645,
            0.95: 1.96,
            0.99: 2.576
        };

        const z = zScores[confidenceLevel] || 1.96;
        const p = estimatedProportion;
        const e = marginOfError;

        const n = Math.ceil((z * z * p * (1 - p)) / (e * e));

        return {
            confidenceLevel: (confidenceLevel * 100) + '%',
            marginOfError: (marginOfError * 100) + '%',
            requiredSampleSize: n,
            interpretation: `With ${n} samples, we can be ${confidenceLevel * 100}% confident ` +
                `that the true value is within ${marginOfError * 100}% of our estimate`
        };
    }

    /**
     * Calculates margin of error for given sample size
     * @param {number} sampleSize - Sample size
     * @param {number} confidenceLevel - Confidence level
     * @param {number} proportion - Observed proportion
     * @returns {Object} Margin of error calculation
     */
    static marginOfError(sampleSize, confidenceLevel = 0.95, proportion = 0.5) {
        const zScores = { 0.90: 1.645, 0.95: 1.96, 0.99: 2.576 };
        const z = zScores[confidenceLevel] || 1.96;

        const moe = z * Math.sqrt((proportion * (1 - proportion)) / sampleSize);

        return {
            sampleSize,
            marginOfError: (moe * 100).toFixed(2) + '%',
            confidenceInterval: {
                lower: ((proportion - moe) * 100).toFixed(2) + '%',
                upper: ((proportion + moe) * 100).toFixed(2) + '%'
            }
        };
    }
}

/**
 * TestMetricsReliability assesses reliability of test metrics.
 */
class TestMetricsReliability {
    /**
     * Assesses reliability of pass rate
     * @param {number} totalTests - Total test executions
     * @param {number} passed - Number passed
     * @returns {Object} Reliability assessment
     */
    static assessPassRate(totalTests, passed) {
        const passRate = passed / totalTests;
        const moe = SampleSizeCalculator.marginOfError(totalTests, 0.95, passRate);

        let reliability;
        if (totalTests >= 1000) reliability = 'High';
        else if (totalTests >= 100) reliability = 'Moderate';
        else if (totalTests >= 30) reliability = 'Low';
        else reliability = 'Very Low';

        return {
            observedPassRate: (passRate * 100).toFixed(2) + '%',
            sampleSize: totalTests,
            marginOfError: moe.marginOfError,
            confidenceInterval: moe.confidenceInterval,
            reliability,
            recommendation: reliability === 'Very Low'
                ? 'Run more tests for reliable metrics'
                : reliability === 'Low'
                    ? 'Consider increasing test executions'
                    : 'Sample size is adequate'
        };
    }

    /**
     * Detects flaky tests using statistical analysis
     * @param {Array} results - Array of test results (true/false)
     * @returns {Object} Flakiness analysis
     */
    static detectFlakiness(results) {
        const n = results.length;
        const passes = results.filter(r => r).length;
        const passRate = passes / n;

        // If pass rate is not close to 0 or 1, might be flaky
        const isLikelyFlaky = passRate > 0.1 && passRate < 0.9;

        // Calculate variance
        const variance = passRate * (1 - passRate);

        return {
            runs: n,
            passes,
            failures: n - passes,
            passRate: (passRate * 100).toFixed(2) + '%',
            variance: variance.toFixed(4),
            isLikelyFlaky,
            recommendation: isLikelyFlaky
                ? 'Test shows inconsistent behavior - investigate for flakiness'
                : passRate === 1
                    ? 'Test always passes - reliable'
                    : passRate === 0
                        ? 'Test always fails - investigate root cause'
                        : 'Results are statistically consistent'
        };
    }
}

/**
 * TestCoverageStatistics applies law to coverage metrics.
 */
class TestCoverageStatistics {
    /**
     * Estimates true defect detection rate
     * @param {number} testsRun - Tests executed
     * @param {number} defectsFound - Defects found
     * @param {number} estimatedTotalDefects - Estimated total defects
     * @returns {Object} Detection estimate
     */
    static estimateDetectionRate(testsRun, defectsFound, estimatedTotalDefects) {
        const observedRate = defectsFound / estimatedTotalDefects;
        const moe = SampleSizeCalculator.marginOfError(testsRun, 0.95, observedRate);

        return {
            testsRun,
            defectsFound,
            estimatedTotalDefects,
            detectionRate: (observedRate * 100).toFixed(2) + '%',
            confidenceInterval: moe.confidenceInterval,
            recommendation: observedRate < 0.8
                ? 'Detection rate may be low - consider more thorough testing'
                : 'Detection rate appears adequate'
        };
    }

    /**
     * Analyzes diminishing returns in testing
     * @param {Array} cumulativeData - Array of {tests, defectsFound}
     * @returns {Object} Diminishing returns analysis
     */
    static analyzeDiminishingReturns(cumulativeData) {
        const analysis = cumulativeData.map((point, i) => {
            const prevDefects = i > 0 ? cumulativeData[i - 1].defectsFound : 0;
            const prevTests = i > 0 ? cumulativeData[i - 1].tests : 0;

            const marginalDefects = point.defectsFound - prevDefects;
            const marginalTests = point.tests - prevTests;
            const marginalRate = marginalTests > 0 ? marginalDefects / marginalTests : 0;

            return {
                tests: point.tests,
                totalDefects: point.defectsFound,
                marginalDefects,
                marginalRate: marginalRate.toFixed(4)
            };
        });

        const lastMarginalRate = parseFloat(analysis[analysis.length - 1].marginalRate);
        const firstMarginalRate = parseFloat(analysis[0].marginalRate);

        return {
            analysis,
            diminishingReturns: lastMarginalRate < firstMarginalRate * 0.5,
            recommendation: lastMarginalRate < 0.001
                ? 'Strong diminishing returns - testing may be sufficient'
                : 'Continue testing - still finding defects at reasonable rate'
        };
    }
}

/**
 * StatisticalTestingPrinciples summarizes key principles.
 */
class StatisticalTestingPrinciples {
    static principles = {
        sampleSize: {
            name: 'Adequate Sample Size',
            description: 'More test executions = more reliable metrics',
            application: 'Run tests multiple times before trusting pass rates',
            minimum: '30+ executions for statistical validity'
        },
        convergence: {
            name: 'Convergence',
            description: 'Metrics stabilize as sample size increases',
            application: 'Monitor metric stability over time',
            indicator: 'Decreasing variance indicates convergence'
        },
        representativeness: {
            name: 'Representative Sampling',
            description: 'Tests should represent real usage patterns',
            application: 'Include diverse test scenarios and data',
            risk: 'Biased tests give biased quality estimates'
        },
        confidence: {
            name: 'Confidence Intervals',
            description: 'Always consider margin of error',
            application: 'Report metrics with confidence intervals',
            example: '95% pass rate ± 2%'
        }
    };

    /**
     * Gets all principles
     * @returns {Array} All principles
     */
    static getAllPrinciples() {
        return Object.entries(this.principles).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

// Demonstration
console.log('=== Law of Large Numbers Demo ===\n');

// Coin flip simulation
console.log('--- Coin Flip Convergence ---');
const coinResult = LargeNumbersSimulator.coinFlip(1000, 0.5);
console.log('Result:', {
    flips: coinResult.totalFlips,
    observedRatio: coinResult.observedRatio,
    trueProbability: coinResult.trueProbability
});
console.log('Convergence:', coinResult.convergence);

// Test execution simulation
console.log('\n--- Test Execution Convergence ---');
const testResult = LargeNumbersSimulator.testExecution(500, 0.92);
console.log('Result:', {
    runs: testResult.totalRuns,
    observedPassRate: testResult.observedPassRate,
    truePassRate: testResult.truePassRate
});

// Sample size calculation
console.log('\n--- Sample Size Calculation ---');
console.log('95% confidence, 3% margin:',
    SampleSizeCalculator.calculate(0.95, 0.03));
console.log('99% confidence, 1% margin:',
    SampleSizeCalculator.calculate(0.99, 0.01));

// Metrics reliability
console.log('\n--- Test Metrics Reliability ---');
console.log('Small sample (25 tests):',
    TestMetricsReliability.assessPassRate(25, 24));
console.log('Large sample (500 tests):',
    TestMetricsReliability.assessPassRate(500, 475));

// Flakiness detection
console.log('\n--- Flakiness Detection ---');
const stableResults = Array(100).fill(true);
const flakyResults = Array(100).fill(null).map(() => Math.random() > 0.3);
console.log('Stable test:', TestMetricsReliability.detectFlakiness(stableResults));
console.log('Flaky test:', TestMetricsReliability.detectFlakiness(flakyResults));

// Principles
console.log('\n--- Statistical Testing Principles ---');
StatisticalTestingPrinciples.getAllPrinciples().forEach(p => {
    console.log(`\n${p.name}: ${p.description}`);
});

/**
 * Key Applications of the Law of Large Numbers in Testing:
 *
 * 1. Run tests multiple times to get reliable metrics
 * 2. Small sample sizes give unreliable pass rates
 * 3. Flaky tests are detectable through statistical analysis
 * 4. Confidence intervals should accompany test metrics
 * 5. More test executions reduce margin of error
 * 6. Sample size requirements depend on confidence level
 * 7. Diminishing returns occur as testing increases
 * 8. Representative test samples are essential
 * 9. Metrics converge to true values over time
 * 10. Statistical rigor improves testing decisions
 */
