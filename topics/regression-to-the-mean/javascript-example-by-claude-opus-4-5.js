/**
 * Regression to the Mean - Statistical Phenomenon in Testing
 *
 * Regression to the mean is a statistical phenomenon that occurs when an extreme
 * value or performance on a given variable is followed by a less extreme value
 * or performance. It is based on the concept that most measurements fluctuate
 * over time, and extreme measurements are often followed by values closer to
 * the average.
 *
 * Key Concepts:
 * - Extreme values tend to be outliers
 * - Subsequent measurements move toward average
 * - Important for interpreting test results
 * - Avoid incorrect conclusions from single measurements
 */

/**
 * StatisticalAnalyzer provides tools for analyzing regression to mean.
 */
class StatisticalAnalyzer {
    /**
     * Calculates basic statistics
     * @param {Array} values - Numeric values
     * @returns {Object} Statistics
     */
    static calculateStats(values) {
        const n = values.length;
        const mean = values.reduce((a, b) => a + b, 0) / n;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
        const stdDev = Math.sqrt(variance);
        const sorted = [...values].sort((a, b) => a - b);

        return {
            count: n,
            mean: mean.toFixed(2),
            median: n % 2 === 0
                ? ((sorted[n/2 - 1] + sorted[n/2]) / 2).toFixed(2)
                : sorted[Math.floor(n/2)].toFixed(2),
            min: Math.min(...values).toFixed(2),
            max: Math.max(...values).toFixed(2),
            range: (Math.max(...values) - Math.min(...values)).toFixed(2),
            stdDev: stdDev.toFixed(2),
            variance: variance.toFixed(2)
        };
    }

    /**
     * Identifies extreme values (outliers)
     * @param {Array} values - Numeric values
     * @param {number} threshold - Standard deviations from mean
     * @returns {Array} Outliers
     */
    static findOutliers(values, threshold = 2) {
        const stats = this.calculateStats(values);
        const mean = parseFloat(stats.mean);
        const stdDev = parseFloat(stats.stdDev);

        return values
            .map((value, index) => ({
                index,
                value,
                zScore: ((value - mean) / stdDev).toFixed(2),
                isOutlier: Math.abs((value - mean) / stdDev) > threshold
            }))
            .filter(item => item.isOutlier);
    }

    /**
     * Predicts regression toward mean
     * @param {number} extremeValue - Observed extreme value
     * @param {number} mean - Population mean
     * @param {number} correlation - Reliability coefficient (0-1)
     * @returns {Object} Prediction
     */
    static predictRegression(extremeValue, mean, correlation = 0.5) {
        // Predicted value = mean + correlation * (extremeValue - mean)
        const predicted = mean + correlation * (extremeValue - mean);
        const regressionAmount = extremeValue - predicted;

        return {
            observedValue: extremeValue,
            populationMean: mean,
            predictedNextValue: predicted.toFixed(2),
            expectedRegression: regressionAmount.toFixed(2),
            percentageRegression: ((regressionAmount / (extremeValue - mean)) * 100).toFixed(1) + '%',
            interpretation: extremeValue > mean
                ? 'Value expected to decrease toward mean'
                : 'Value expected to increase toward mean'
        };
    }
}

/**
 * RegressionToMeanExample demonstrates the phenomenon.
 */
class RegressionToMeanExample {
    static examples = {
        testPerformance: {
            name: 'Test Performance Variation',
            scenario: 'A test that usually takes 100ms suddenly takes 50ms',
            explanation: 'Single measurement may be unusually fast due to caching, system load, etc.',
            expectation: 'Subsequent runs will likely be closer to 100ms average',
            implication: 'Don\'t optimize based on single fast run; don\'t panic on single slow run'
        },
        defectRate: {
            name: 'Defect Rate Fluctuation',
            scenario: 'Sprint has unusually high defect count (20 vs average 10)',
            explanation: 'May be due to specific circumstances, not systematic problem',
            expectation: 'Next sprint will likely have defect count closer to average',
            implication: 'Investigate root cause, but expect some natural regression'
        },
        developerProductivity: {
            name: 'Developer Productivity',
            scenario: 'Developer has exceptional week (150% of normal output)',
            explanation: 'May be due to task type, fewer meetings, or random variation',
            expectation: 'Following weeks will likely return toward normal productivity',
            implication: 'Don\'t set expectations based on peak performance'
        },
        systemLoad: {
            name: 'System Load Testing',
            scenario: 'Load test shows unusually high throughput (5000 vs avg 4000 req/s)',
            explanation: 'May be due to optimal conditions, warm caches, etc.',
            expectation: 'Real-world performance will likely be closer to average',
            implication: 'Use multiple measurements, report averages not peaks'
        }
    };

    /**
     * Gets example by name
     * @param {string} name - Example name
     * @returns {Object} Example
     */
    static getExample(name) {
        return this.examples[name];
    }

    /**
     * Gets all examples
     * @returns {Array} All examples
     */
    static getAllExamples() {
        return Object.entries(this.examples).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * MeasurementSeries tracks measurements over time.
 */
class MeasurementSeries {
    constructor(name) {
        this.name = name;
        this.measurements = [];
    }

    /**
     * Adds a measurement
     * @param {number} value - Measured value
     * @param {Object} metadata - Additional info
     */
    addMeasurement(value, metadata = {}) {
        this.measurements.push({
            value,
            timestamp: new Date(),
            index: this.measurements.length,
            ...metadata
        });
    }

    /**
     * Gets statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const values = this.measurements.map(m => m.value);
        return StatisticalAnalyzer.calculateStats(values);
    }

    /**
     * Analyzes for regression to mean
     * @param {number} windowSize - Analysis window
     * @returns {Object} Analysis
     */
    analyzeRegressionToMean(windowSize = 5) {
        if (this.measurements.length < windowSize * 2) {
            return { error: 'Not enough data for analysis' };
        }

        const stats = this.getStatistics();
        const mean = parseFloat(stats.mean);
        const stdDev = parseFloat(stats.stdDev);

        // Find extreme measurements and check subsequent values
        const analyses = [];

        for (let i = 0; i < this.measurements.length - windowSize; i++) {
            const current = this.measurements[i].value;
            const zScore = (current - mean) / stdDev;

            if (Math.abs(zScore) > 1.5) { // Extreme value
                const subsequent = this.measurements
                    .slice(i + 1, i + 1 + windowSize)
                    .map(m => m.value);
                const subsequentMean = subsequent.reduce((a, b) => a + b, 0) / subsequent.length;

                analyses.push({
                    index: i,
                    extremeValue: current,
                    zScore: zScore.toFixed(2),
                    subsequentMean: subsequentMean.toFixed(2),
                    regressedTowardMean: Math.abs(subsequentMean - mean) < Math.abs(current - mean),
                    regressionAmount: (current - subsequentMean).toFixed(2)
                });
            }
        }

        return {
            seriesMean: mean,
            seriesStdDev: stdDev,
            extremePointsAnalyzed: analyses.length,
            regressionObserved: analyses.filter(a => a.regressedTowardMean).length,
            analyses
        };
    }

    /**
     * Simulates future values
     * @param {number} count - Number of values to simulate
     * @returns {Array} Simulated values
     */
    simulate(count) {
        const stats = this.getStatistics();
        const mean = parseFloat(stats.mean);
        const stdDev = parseFloat(stats.stdDev);

        const simulated = [];
        let lastValue = this.measurements[this.measurements.length - 1]?.value || mean;

        for (let i = 0; i < count; i++) {
            // Simulate with regression toward mean
            const noise = (Math.random() - 0.5) * stdDev;
            const regression = 0.5 * (mean - lastValue); // Partial regression
            lastValue = lastValue + regression + noise;
            simulated.push({
                index: this.measurements.length + i,
                simulatedValue: lastValue.toFixed(2),
                distanceFromMean: (lastValue - mean).toFixed(2)
            });
        }

        return simulated;
    }
}

/**
 * BiasDetector identifies biases related to regression to mean.
 */
class BiasDetector {
    static biases = {
        overreactionToExtreme: {
            name: 'Overreaction to Extreme Results',
            description: 'Making major changes based on single extreme measurement',
            example: 'Rewriting code because one test run was slow',
            mitigation: 'Wait for multiple measurements before taking action'
        },
        attributionError: {
            name: 'Attribution Error',
            description: 'Attributing natural regression to interventions',
            example: 'Crediting a fix for performance improvement that was just natural variance',
            mitigation: 'Use control groups and statistical significance testing'
        },
        selectionBias: {
            name: 'Selection Bias',
            description: 'Selecting based on extreme values leads to disappointment',
            example: 'Hiring based on exceptional interview performance',
            mitigation: 'Use multiple evaluation points, consider base rates'
        },
        peakFallacy: {
            name: 'Peak Performance Fallacy',
            description: 'Expecting peak performance to be sustainable',
            example: 'Setting targets based on best sprint ever',
            mitigation: 'Use averages and ranges, not single best performances'
        }
    };

    /**
     * Detects potential bias in analysis
     * @param {Object} analysis - Analysis to check
     * @returns {Array} Potential biases
     */
    static detect(analysis) {
        const warnings = [];

        if (analysis.basedOnSingleMeasurement) {
            warnings.push({
                bias: this.biases.overreactionToExtreme,
                recommendation: 'Collect more data before drawing conclusions'
            });
        }

        if (analysis.comparedToExtreme) {
            warnings.push({
                bias: this.biases.peakFallacy,
                recommendation: 'Compare to average, not peak performance'
            });
        }

        if (analysis.interventionBeforeRegression) {
            warnings.push({
                bias: this.biases.attributionError,
                recommendation: 'Consider that improvement may be natural regression'
            });
        }

        return {
            warningsCount: warnings.length,
            warnings,
            recommendation: warnings.length > 0
                ? 'Be cautious about conclusions - potential bias detected'
                : 'Analysis appears balanced'
        };
    }
}

/**
 * TestingImplications provides guidance for testers.
 */
class TestingImplications {
    /**
     * Gets implications for testing
     * @returns {Array} Implications
     */
    static getImplications() {
        return [
            {
                area: 'Performance Testing',
                implication: 'Single test results may be misleading',
                recommendation: 'Run multiple iterations, report averages and ranges',
                example: 'Run load test 5 times, report median response time'
            },
            {
                area: 'Flaky Tests',
                implication: 'A test that fails once may pass next time naturally',
                recommendation: 'Rerun failed tests, track failure rates over time',
                example: 'Test fails 1/10 times - may be timing issue, not bug'
            },
            {
                area: 'Metrics Tracking',
                implication: 'Extreme metrics will likely move toward average',
                recommendation: 'Use moving averages, don\'t overreact to outliers',
                example: 'This sprint\'s defect count should not panic you'
            },
            {
                area: 'Benchmark Comparisons',
                implication: 'Best run should not be used as benchmark',
                recommendation: 'Compare average to average, include confidence intervals',
                example: 'Report "500 ± 50ms" not "best case 450ms"'
            },
            {
                area: 'A/B Testing',
                implication: 'Early results may be extreme and misleading',
                recommendation: 'Run tests long enough for statistical significance',
                example: 'Don\'t declare winner based on first day\'s data'
            }
        ];
    }

    /**
     * Gets guidelines for reporting
     * @returns {Array} Guidelines
     */
    static getReportingGuidelines() {
        return [
            'Always report sample size alongside measurements',
            'Include standard deviation or confidence intervals',
            'Use median when data may have outliers',
            'Show trends over time, not just single points',
            'Note when a measurement is statistically extreme',
            'Avoid comparing current extremes to past averages',
            'Report both best and worst case alongside typical case',
            'Wait for regression before concluding intervention worked'
        ];
    }
}

// Demonstration
console.log('=== Regression to the Mean Demo ===\n');

// Basic statistics
console.log('--- Statistical Analysis ---');
const testTimes = [100, 105, 98, 102, 150, 97, 103, 101, 99, 104];
console.log('Test execution times:', testTimes);
console.log('Statistics:', StatisticalAnalyzer.calculateStats(testTimes));

// Find outliers
console.log('\n--- Outlier Detection ---');
const outliers = StatisticalAnalyzer.findOutliers(testTimes);
console.log('Outliers:', outliers);

// Predict regression
console.log('\n--- Regression Prediction ---');
const prediction = StatisticalAnalyzer.predictRegression(150, 101.2, 0.5);
console.log('Prediction for extreme value 150:', prediction);

// Examples
console.log('\n--- Real-World Examples ---');
RegressionToMeanExample.getAllExamples().slice(0, 2).forEach(example => {
    console.log(`\n${example.name}:`);
    console.log(`  Scenario: ${example.scenario}`);
    console.log(`  Expectation: ${example.expectation}`);
});

// Measurement series analysis
console.log('\n--- Measurement Series Analysis ---');
const series = new MeasurementSeries('API Response Time');

// Simulate measurements with some extreme values
[100, 102, 98, 180, 105, 103, 99, 101, 45, 97, 103, 101, 102, 100, 98].forEach(value => {
    series.addMeasurement(value);
});

console.log('Series statistics:', series.getStatistics());
console.log('Regression analysis:', series.analyzeRegressionToMean(3));

// Simulate future values
console.log('\n--- Future Value Simulation ---');
console.log('Simulated next 5 values:', series.simulate(5));

// Bias detection
console.log('\n--- Bias Detection ---');
console.log('Bias check:', BiasDetector.detect({
    basedOnSingleMeasurement: true,
    comparedToExtreme: true,
    interventionBeforeRegression: false
}));

// Testing implications
console.log('\n--- Testing Implications ---');
TestingImplications.getImplications().slice(0, 3).forEach(impl => {
    console.log(`${impl.area}: ${impl.recommendation}`);
});

// Reporting guidelines
console.log('\n--- Reporting Guidelines ---');
console.log(TestingImplications.getReportingGuidelines().slice(0, 4));

/**
 * Best Practices for Handling Regression to the Mean:
 *
 * 1. Collect multiple measurements before drawing conclusions
 * 2. Report averages with standard deviations
 * 3. Use statistical significance testing for comparisons
 * 4. Don't overreact to single extreme results
 * 5. Account for natural variation in planning
 * 6. Use control groups when evaluating interventions
 * 7. Track trends over time, not just individual points
 * 8. Be skeptical of improvements following extreme values
 * 9. Set expectations based on averages, not peaks
 * 10. Educate stakeholders about statistical variation
 */
