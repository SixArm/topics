/**
 * Statistical Analysis - Understanding Data Through Numbers
 *
 * Statistical analysis is a method used to understand data and extract insights.
 * It involves collecting, cleaning, organizing, and analyzing data to identify
 * patterns, trends, and relationships. Statistical analysis is fundamental to
 * testing, quality assurance, and data-driven decision making.
 *
 * Key Concepts:
 * - Descriptive statistics (summarizing data)
 * - Inferential statistics (drawing conclusions)
 * - Hypothesis testing
 * - Correlation and regression
 */

/**
 * DescriptiveStatistics calculates summary statistics.
 */
class DescriptiveStatistics {
    /**
     * Calculates mean (average)
     * @param {Array} values - Numeric values
     * @returns {number} Mean
     */
    static mean(values) {
        if (values.length === 0) return 0;
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    }

    /**
     * Calculates median (middle value)
     * @param {Array} values - Numeric values
     * @returns {number} Median
     */
    static median(values) {
        if (values.length === 0) return 0;
        const sorted = [...values].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 !== 0
            ? sorted[mid]
            : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    /**
     * Calculates mode (most frequent value)
     * @param {Array} values - Numeric values
     * @returns {Array} Mode(s)
     */
    static mode(values) {
        if (values.length === 0) return [];
        const frequency = {};
        values.forEach(val => {
            frequency[val] = (frequency[val] || 0) + 1;
        });
        const maxFreq = Math.max(...Object.values(frequency));
        return Object.keys(frequency)
            .filter(key => frequency[key] === maxFreq)
            .map(Number);
    }

    /**
     * Calculates variance
     * @param {Array} values - Numeric values
     * @param {boolean} sample - Use sample variance
     * @returns {number} Variance
     */
    static variance(values, sample = true) {
        if (values.length === 0) return 0;
        const avg = this.mean(values);
        const squaredDiffs = values.map(val => Math.pow(val - avg, 2));
        const divisor = sample ? values.length - 1 : values.length;
        return squaredDiffs.reduce((sum, val) => sum + val, 0) / divisor;
    }

    /**
     * Calculates standard deviation
     * @param {Array} values - Numeric values
     * @param {boolean} sample - Use sample std dev
     * @returns {number} Standard deviation
     */
    static stdDev(values, sample = true) {
        return Math.sqrt(this.variance(values, sample));
    }

    /**
     * Calculates range
     * @param {Array} values - Numeric values
     * @returns {Object} Min, max, and range
     */
    static range(values) {
        if (values.length === 0) return { min: 0, max: 0, range: 0 };
        const min = Math.min(...values);
        const max = Math.max(...values);
        return { min, max, range: max - min };
    }

    /**
     * Calculates percentile
     * @param {Array} values - Numeric values
     * @param {number} percentile - Percentile (0-100)
     * @returns {number} Percentile value
     */
    static percentile(values, percentile) {
        if (values.length === 0) return 0;
        const sorted = [...values].sort((a, b) => a - b);
        const index = (percentile / 100) * (sorted.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        if (lower === upper) return sorted[lower];
        return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
    }

    /**
     * Gets comprehensive summary
     * @param {Array} values - Numeric values
     * @returns {Object} Summary statistics
     */
    static summary(values) {
        const rangeInfo = this.range(values);
        return {
            count: values.length,
            mean: this.mean(values).toFixed(2),
            median: this.median(values).toFixed(2),
            mode: this.mode(values),
            stdDev: this.stdDev(values).toFixed(2),
            variance: this.variance(values).toFixed(2),
            min: rangeInfo.min,
            max: rangeInfo.max,
            range: rangeInfo.range,
            q1: this.percentile(values, 25).toFixed(2),
            q3: this.percentile(values, 75).toFixed(2)
        };
    }
}

/**
 * InferentialStatistics provides hypothesis testing tools.
 */
class InferentialStatistics {
    /**
     * Performs z-test
     * @param {number} sampleMean - Sample mean
     * @param {number} populationMean - Population mean
     * @param {number} stdDev - Standard deviation
     * @param {number} n - Sample size
     * @returns {Object} Z-test result
     */
    static zTest(sampleMean, populationMean, stdDev, n) {
        const standardError = stdDev / Math.sqrt(n);
        const zScore = (sampleMean - populationMean) / standardError;

        return {
            zScore: zScore.toFixed(4),
            standardError: standardError.toFixed(4),
            significant95: Math.abs(zScore) > 1.96,
            significant99: Math.abs(zScore) > 2.576
        };
    }

    /**
     * Calculates confidence interval
     * @param {number} mean - Sample mean
     * @param {number} stdDev - Standard deviation
     * @param {number} n - Sample size
     * @param {number} confidence - Confidence level (e.g., 0.95)
     * @returns {Object} Confidence interval
     */
    static confidenceInterval(mean, stdDev, n, confidence = 0.95) {
        const zValues = { 0.90: 1.645, 0.95: 1.96, 0.99: 2.576 };
        const z = zValues[confidence] || 1.96;
        const standardError = stdDev / Math.sqrt(n);
        const margin = z * standardError;

        return {
            mean,
            lower: (mean - margin).toFixed(2),
            upper: (mean + margin).toFixed(2),
            marginOfError: margin.toFixed(2),
            confidence: (confidence * 100) + '%'
        };
    }

    /**
     * Calculates correlation coefficient
     * @param {Array} x - First variable values
     * @param {Array} y - Second variable values
     * @returns {Object} Correlation result
     */
    static correlation(x, y) {
        if (x.length !== y.length || x.length === 0) {
            return { r: 0, interpretation: 'Invalid data' };
        }

        const n = x.length;
        const meanX = DescriptiveStatistics.mean(x);
        const meanY = DescriptiveStatistics.mean(y);

        let numerator = 0;
        let denomX = 0;
        let denomY = 0;

        for (let i = 0; i < n; i++) {
            const diffX = x[i] - meanX;
            const diffY = y[i] - meanY;
            numerator += diffX * diffY;
            denomX += diffX * diffX;
            denomY += diffY * diffY;
        }

        const r = numerator / Math.sqrt(denomX * denomY);

        let interpretation;
        const absR = Math.abs(r);
        if (absR >= 0.8) interpretation = 'Very strong';
        else if (absR >= 0.6) interpretation = 'Strong';
        else if (absR >= 0.4) interpretation = 'Moderate';
        else if (absR >= 0.2) interpretation = 'Weak';
        else interpretation = 'Very weak or no';

        return {
            r: r.toFixed(4),
            rSquared: (r * r).toFixed(4),
            interpretation: interpretation + (r >= 0 ? ' positive' : ' negative') + ' correlation'
        };
    }
}

/**
 * TestingStatistics applies statistics to software testing.
 */
class TestingStatistics {
    /**
     * Analyzes test execution times
     * @param {Array} times - Execution times in ms
     * @returns {Object} Analysis
     */
    static analyzeExecutionTimes(times) {
        const stats = DescriptiveStatistics.summary(times);
        const p95 = DescriptiveStatistics.percentile(times, 95);
        const p99 = DescriptiveStatistics.percentile(times, 99);

        return {
            ...stats,
            p95: p95.toFixed(2),
            p99: p99.toFixed(2),
            outliers: times.filter(t => t > parseFloat(stats.mean) + 2 * parseFloat(stats.stdDev)).length,
            recommendation: parseFloat(stats.stdDev) > parseFloat(stats.mean) * 0.3
                ? 'High variance - investigate inconsistent tests'
                : 'Execution times are consistent'
        };
    }

    /**
     * Calculates defect density
     * @param {number} defects - Number of defects
     * @param {number} size - Size (LOC, function points, etc.)
     * @returns {Object} Defect density
     */
    static defectDensity(defects, size) {
        const density = (defects / size) * 1000;

        return {
            defects,
            size,
            density: density.toFixed(2),
            unit: 'per 1000 units',
            assessment: density < 1 ? 'Excellent' :
                density < 5 ? 'Good' :
                    density < 10 ? 'Average' : 'Needs Improvement'
        };
    }

    /**
     * Analyzes test pass rates
     * @param {Array} results - Array of pass/fail results
     * @returns {Object} Pass rate analysis
     */
    static analyzePassRates(results) {
        const passed = results.filter(r => r === 'pass' || r === true).length;
        const failed = results.length - passed;
        const passRate = (passed / results.length) * 100;

        // Calculate confidence interval for proportion
        const p = passRate / 100;
        const se = Math.sqrt((p * (1 - p)) / results.length);
        const margin = 1.96 * se * 100;

        return {
            total: results.length,
            passed,
            failed,
            passRate: passRate.toFixed(2) + '%',
            confidenceInterval: {
                lower: Math.max(0, passRate - margin).toFixed(2) + '%',
                upper: Math.min(100, passRate + margin).toFixed(2) + '%',
                confidence: '95%'
            }
        };
    }

    /**
     * Compares two test runs
     * @param {Array} run1 - First run times
     * @param {Array} run2 - Second run times
     * @returns {Object} Comparison
     */
    static compareRuns(run1, run2) {
        const stats1 = DescriptiveStatistics.summary(run1);
        const stats2 = DescriptiveStatistics.summary(run2);

        const meanDiff = parseFloat(stats2.mean) - parseFloat(stats1.mean);
        const percentChange = (meanDiff / parseFloat(stats1.mean)) * 100;

        return {
            run1: { mean: stats1.mean, stdDev: stats1.stdDev },
            run2: { mean: stats2.mean, stdDev: stats2.stdDev },
            difference: {
                absolute: meanDiff.toFixed(2),
                percent: percentChange.toFixed(2) + '%',
                direction: meanDiff > 0 ? 'increase' : 'decrease'
            },
            significant: Math.abs(percentChange) > 10,
            recommendation: Math.abs(percentChange) > 10
                ? 'Significant change detected - investigate'
                : 'No significant change'
        };
    }
}

/**
 * DataVisualization provides text-based visualization.
 */
class DataVisualization {
    /**
     * Creates a simple histogram
     * @param {Array} values - Numeric values
     * @param {number} bins - Number of bins
     * @returns {string} Histogram
     */
    static histogram(values, bins = 10) {
        const { min, max } = DescriptiveStatistics.range(values);
        const binWidth = (max - min) / bins;

        const counts = new Array(bins).fill(0);
        values.forEach(val => {
            const binIndex = Math.min(Math.floor((val - min) / binWidth), bins - 1);
            counts[binIndex]++;
        });

        const maxCount = Math.max(...counts);
        const scale = 30 / maxCount;

        let result = 'Histogram:\n';
        counts.forEach((count, i) => {
            const binStart = (min + i * binWidth).toFixed(1);
            const bar = '#'.repeat(Math.round(count * scale));
            result += `${binStart.padStart(8)}: ${bar} (${count})\n`;
        });

        return result;
    }

    /**
     * Creates a box plot representation
     * @param {Array} values - Numeric values
     * @returns {string} Box plot
     */
    static boxPlot(values) {
        const stats = DescriptiveStatistics.summary(values);
        const q1 = parseFloat(stats.q1);
        const median = parseFloat(stats.median);
        const q3 = parseFloat(stats.q3);

        return `
Box Plot:
Min: ${stats.min}
|----[===|===]----|
     Q1  Med  Q3
Q1: ${q1}, Median: ${median}, Q3: ${q3}
Max: ${stats.max}
`;
    }
}

// Demonstration
console.log('=== Statistical Analysis Demo ===\n');

// Sample data
const testTimes = [102, 98, 115, 103, 97, 120, 105, 99, 108, 112, 95, 118];

// Descriptive statistics
console.log('--- Descriptive Statistics ---');
console.log('Test execution times:', testTimes);
console.log('Summary:', DescriptiveStatistics.summary(testTimes));

// Inferential statistics
console.log('\n--- Inferential Statistics ---');
const mean = DescriptiveStatistics.mean(testTimes);
const stdDev = DescriptiveStatistics.stdDev(testTimes);

console.log('Z-Test (testing if mean differs from 100):',
    InferentialStatistics.zTest(mean, 100, stdDev, testTimes.length));

console.log('95% Confidence Interval:',
    InferentialStatistics.confidenceInterval(mean, stdDev, testTimes.length, 0.95));

// Correlation
console.log('\n--- Correlation Analysis ---');
const codeComplexity = [10, 15, 12, 18, 20, 14, 16, 22, 19, 25];
const bugCount = [2, 4, 3, 5, 6, 3, 4, 7, 5, 8];
console.log('Correlation between complexity and bugs:',
    InferentialStatistics.correlation(codeComplexity, bugCount));

// Testing statistics
console.log('\n--- Testing Statistics ---');
console.log('Execution Time Analysis:', TestingStatistics.analyzeExecutionTimes(testTimes));
console.log('Defect Density:', TestingStatistics.defectDensity(15, 5000));

// Pass rate analysis
const testResults = ['pass', 'pass', 'fail', 'pass', 'pass', 'pass', 'fail', 'pass', 'pass', 'pass'];
console.log('Pass Rate Analysis:', TestingStatistics.analyzePassRates(testResults));

// Compare runs
const run1 = [100, 102, 98, 105, 99];
const run2 = [110, 115, 108, 120, 112];
console.log('\n--- Run Comparison ---');
console.log('Comparing two test runs:', TestingStatistics.compareRuns(run1, run2));

// Visualization
console.log('\n--- Data Visualization ---');
console.log(DataVisualization.histogram(testTimes, 5));

/**
 * Best Practices for Statistical Analysis in Testing:
 *
 * 1. Collect sufficient sample sizes for meaningful results
 * 2. Use appropriate statistical tests for your data
 * 3. Consider both central tendency and variability
 * 4. Report confidence intervals, not just point estimates
 * 5. Check for outliers and understand their cause
 * 6. Use visualization to understand data distribution
 * 7. Compare with historical baselines
 * 8. Consider practical significance, not just statistical
 * 9. Document your analysis methods
 * 10. Validate findings with domain experts
 */
