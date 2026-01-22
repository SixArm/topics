/**
 * Descriptive Statistics - Summarizing and Analyzing Data
 *
 * Descriptive statistics summarizes and analyzes datasets by describing
 * their main features including central tendency, dispersion, and shape.
 * It makes data easier to understand and draw conclusions from.
 *
 * Key Concepts:
 * - Central Tendency: Mean, median, mode (typical values)
 * - Dispersion: Range, variance, standard deviation (spread)
 * - Distribution: Skewness, kurtosis (shape of data)
 * - Percentiles: Quartiles and quantiles (data position)
 */

/**
 * StatisticsCalculator provides descriptive statistics calculations.
 * Computes measures of central tendency and dispersion.
 */
class StatisticsCalculator {
    /**
     * Calculates the arithmetic mean
     * @param {Array<number>} data - Array of numbers
     * @returns {number} Mean value
     */
    static mean(data) {
        if (data.length === 0) return 0;
        const sum = data.reduce((acc, val) => acc + val, 0);
        return sum / data.length;
    }

    /**
     * Calculates the median (middle value)
     * @param {Array<number>} data - Array of numbers
     * @returns {number} Median value
     */
    static median(data) {
        if (data.length === 0) return 0;

        const sorted = [...data].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);

        if (sorted.length % 2 === 0) {
            return (sorted[mid - 1] + sorted[mid]) / 2;
        }
        return sorted[mid];
    }

    /**
     * Calculates the mode (most frequent value)
     * @param {Array<number>} data - Array of numbers
     * @returns {Array<number>} Mode values (can be multimodal)
     */
    static mode(data) {
        if (data.length === 0) return [];

        const frequency = new Map();
        let maxFreq = 0;

        for (const value of data) {
            const freq = (frequency.get(value) || 0) + 1;
            frequency.set(value, freq);
            maxFreq = Math.max(maxFreq, freq);
        }

        const modes = [];
        for (const [value, freq] of frequency) {
            if (freq === maxFreq) {
                modes.push(value);
            }
        }

        return modes.length === data.length ? [] : modes; // No mode if all unique
    }

    /**
     * Calculates the range
     * @param {Array<number>} data - Array of numbers
     * @returns {number} Range (max - min)
     */
    static range(data) {
        if (data.length === 0) return 0;
        return Math.max(...data) - Math.min(...data);
    }

    /**
     * Calculates the variance
     * @param {Array<number>} data - Array of numbers
     * @param {boolean} sample - Use sample variance (n-1) if true
     * @returns {number} Variance
     */
    static variance(data, sample = true) {
        if (data.length <= 1) return 0;

        const avg = this.mean(data);
        const squaredDiffs = data.map(val => Math.pow(val - avg, 2));
        const sumSquaredDiffs = squaredDiffs.reduce((acc, val) => acc + val, 0);

        const divisor = sample ? data.length - 1 : data.length;
        return sumSquaredDiffs / divisor;
    }

    /**
     * Calculates the standard deviation
     * @param {Array<number>} data - Array of numbers
     * @param {boolean} sample - Use sample std dev if true
     * @returns {number} Standard deviation
     */
    static standardDeviation(data, sample = true) {
        return Math.sqrt(this.variance(data, sample));
    }

    /**
     * Calculates the coefficient of variation
     * @param {Array<number>} data - Array of numbers
     * @returns {number} Coefficient of variation (%)
     */
    static coefficientOfVariation(data) {
        const avg = this.mean(data);
        if (avg === 0) return 0;
        return (this.standardDeviation(data) / Math.abs(avg)) * 100;
    }

    /**
     * Calculates percentile value
     * @param {Array<number>} data - Array of numbers
     * @param {number} percentile - Percentile (0-100)
     * @returns {number} Value at percentile
     */
    static percentile(data, percentile) {
        if (data.length === 0) return 0;

        const sorted = [...data].sort((a, b) => a - b);
        const index = (percentile / 100) * (sorted.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);

        if (lower === upper) {
            return sorted[lower];
        }

        const fraction = index - lower;
        return sorted[lower] + fraction * (sorted[upper] - sorted[lower]);
    }

    /**
     * Calculates quartiles (Q1, Q2, Q3)
     * @param {Array<number>} data - Array of numbers
     * @returns {Object} Quartile values
     */
    static quartiles(data) {
        return {
            q1: this.percentile(data, 25),
            q2: this.percentile(data, 50),
            q3: this.percentile(data, 75)
        };
    }

    /**
     * Calculates interquartile range
     * @param {Array<number>} data - Array of numbers
     * @returns {number} IQR
     */
    static interquartileRange(data) {
        const q = this.quartiles(data);
        return q.q3 - q.q1;
    }

    /**
     * Calculates skewness (asymmetry of distribution)
     * @param {Array<number>} data - Array of numbers
     * @returns {number} Skewness value
     */
    static skewness(data) {
        if (data.length < 3) return 0;

        const avg = this.mean(data);
        const std = this.standardDeviation(data, false);

        if (std === 0) return 0;

        const n = data.length;
        const cubedDiffs = data.map(val => Math.pow((val - avg) / std, 3));
        const sum = cubedDiffs.reduce((acc, val) => acc + val, 0);

        return (n / ((n - 1) * (n - 2))) * sum;
    }

    /**
     * Calculates kurtosis (tailedness of distribution)
     * @param {Array<number>} data - Array of numbers
     * @returns {number} Excess kurtosis
     */
    static kurtosis(data) {
        if (data.length < 4) return 0;

        const avg = this.mean(data);
        const std = this.standardDeviation(data, false);

        if (std === 0) return 0;

        const n = data.length;
        const fourthPowers = data.map(val => Math.pow((val - avg) / std, 4));
        const sum = fourthPowers.reduce((acc, val) => acc + val, 0);

        const k = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3)) * sum;
        const correction = (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));

        return k - correction;
    }
}

/**
 * DatasetAnalyzer provides comprehensive dataset analysis.
 * Generates complete statistical summaries.
 */
class DatasetAnalyzer {
    constructor(data, name = 'Dataset') {
        this.data = data;
        this.name = name;
    }

    /**
     * Generates five-number summary
     * @returns {Object} Min, Q1, Median, Q3, Max
     */
    fiveNumberSummary() {
        const sorted = [...this.data].sort((a, b) => a - b);
        const q = StatisticsCalculator.quartiles(this.data);

        return {
            min: sorted[0],
            q1: q.q1,
            median: q.q2,
            q3: q.q3,
            max: sorted[sorted.length - 1]
        };
    }

    /**
     * Generates complete statistical summary
     * @returns {Object} Comprehensive statistics
     */
    getSummary() {
        const fiveNum = this.fiveNumberSummary();

        return {
            name: this.name,
            count: this.data.length,
            centralTendency: {
                mean: StatisticsCalculator.mean(this.data),
                median: StatisticsCalculator.median(this.data),
                mode: StatisticsCalculator.mode(this.data)
            },
            dispersion: {
                range: StatisticsCalculator.range(this.data),
                variance: StatisticsCalculator.variance(this.data),
                standardDeviation: StatisticsCalculator.standardDeviation(this.data),
                coefficientOfVariation: StatisticsCalculator.coefficientOfVariation(this.data),
                interquartileRange: StatisticsCalculator.interquartileRange(this.data)
            },
            distribution: {
                skewness: StatisticsCalculator.skewness(this.data),
                kurtosis: StatisticsCalculator.kurtosis(this.data)
            },
            fiveNumberSummary: fiveNum
        };
    }

    /**
     * Detects outliers using IQR method
     * @returns {Object} Outlier information
     */
    detectOutliers() {
        const q = StatisticsCalculator.quartiles(this.data);
        const iqr = q.q3 - q.q1;
        const lowerBound = q.q1 - 1.5 * iqr;
        const upperBound = q.q3 + 1.5 * iqr;

        const outliers = this.data.filter(val => val < lowerBound || val > upperBound);

        return {
            lowerBound,
            upperBound,
            outliers,
            outlierCount: outliers.length,
            outlierPercentage: (outliers.length / this.data.length) * 100
        };
    }

    /**
     * Generates frequency distribution
     * @param {number} bins - Number of bins
     * @returns {Array} Frequency distribution
     */
    frequencyDistribution(bins = 10) {
        const min = Math.min(...this.data);
        const max = Math.max(...this.data);
        const binWidth = (max - min) / bins;

        const distribution = Array(bins).fill(0).map((_, i) => ({
            binStart: min + i * binWidth,
            binEnd: min + (i + 1) * binWidth,
            count: 0,
            frequency: 0
        }));

        for (const value of this.data) {
            const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
            distribution[binIndex].count++;
        }

        distribution.forEach(bin => {
            bin.frequency = bin.count / this.data.length;
        });

        return distribution;
    }

    /**
     * Prints formatted summary
     */
    printSummary() {
        const summary = this.getSummary();

        console.log(`\n=== ${summary.name} Statistics ===`);
        console.log(`Count: ${summary.count}`);
        console.log(`\nCentral Tendency:`);
        console.log(`  Mean: ${summary.centralTendency.mean.toFixed(4)}`);
        console.log(`  Median: ${summary.centralTendency.median.toFixed(4)}`);
        console.log(`  Mode: ${summary.centralTendency.mode.join(', ') || 'None'}`);
        console.log(`\nDispersion:`);
        console.log(`  Range: ${summary.dispersion.range.toFixed(4)}`);
        console.log(`  Variance: ${summary.dispersion.variance.toFixed(4)}`);
        console.log(`  Std Dev: ${summary.dispersion.standardDeviation.toFixed(4)}`);
        console.log(`  CV: ${summary.dispersion.coefficientOfVariation.toFixed(2)}%`);
        console.log(`  IQR: ${summary.dispersion.interquartileRange.toFixed(4)}`);
        console.log(`\nDistribution Shape:`);
        console.log(`  Skewness: ${summary.distribution.skewness.toFixed(4)}`);
        console.log(`  Kurtosis: ${summary.distribution.kurtosis.toFixed(4)}`);
        console.log(`\nFive-Number Summary:`);
        console.log(`  Min: ${summary.fiveNumberSummary.min.toFixed(4)}`);
        console.log(`  Q1: ${summary.fiveNumberSummary.q1.toFixed(4)}`);
        console.log(`  Median: ${summary.fiveNumberSummary.median.toFixed(4)}`);
        console.log(`  Q3: ${summary.fiveNumberSummary.q3.toFixed(4)}`);
        console.log(`  Max: ${summary.fiveNumberSummary.max.toFixed(4)}`);
    }
}

/**
 * TestMetricsAnalyzer applies descriptive statistics to test metrics.
 * Analyzes test execution times, pass rates, and other testing data.
 */
class TestMetricsAnalyzer {
    constructor() {
        this.executionTimes = [];
        this.testResults = [];
    }

    /**
     * Records test execution data
     * @param {Object} result - Test result data
     */
    recordTestResult(result) {
        this.executionTimes.push(result.duration);
        this.testResults.push({
            name: result.name,
            passed: result.passed,
            duration: result.duration
        });
    }

    /**
     * Analyzes test execution times
     * @returns {Object} Execution time analysis
     */
    analyzeExecutionTimes() {
        if (this.executionTimes.length === 0) {
            return { error: 'No data available' };
        }

        const analyzer = new DatasetAnalyzer(this.executionTimes, 'Execution Times');
        const summary = analyzer.getSummary();
        const outliers = analyzer.detectOutliers();

        return {
            ...summary,
            outliers,
            slowTests: this.testResults.filter(t =>
                t.duration > outliers.upperBound
            ).map(t => t.name)
        };
    }

    /**
     * Calculates pass rate statistics
     * @returns {Object} Pass rate analysis
     */
    analyzePassRate() {
        const passed = this.testResults.filter(t => t.passed).length;
        const total = this.testResults.length;

        return {
            total,
            passed,
            failed: total - passed,
            passRate: (passed / total) * 100,
            failRate: ((total - passed) / total) * 100
        };
    }

    /**
     * Generates comprehensive test metrics report
     * @returns {Object} Complete analysis
     */
    generateReport() {
        return {
            executionAnalysis: this.analyzeExecutionTimes(),
            passRateAnalysis: this.analyzePassRate(),
            totalTests: this.testResults.length
        };
    }
}

// Demonstration
console.log('=== Descriptive Statistics Demo ===');

// Sample dataset
const testData = [23, 45, 67, 12, 89, 34, 56, 78, 90, 45,
                  67, 34, 56, 23, 78, 90, 12, 45, 67, 150];

console.log('\nSample Data:', testData.join(', '));

// Basic statistics
console.log('\n--- Basic Statistics ---');
console.log(`Mean: ${StatisticsCalculator.mean(testData).toFixed(2)}`);
console.log(`Median: ${StatisticsCalculator.median(testData)}`);
console.log(`Mode: ${StatisticsCalculator.mode(testData).join(', ')}`);
console.log(`Range: ${StatisticsCalculator.range(testData)}`);
console.log(`Std Dev: ${StatisticsCalculator.standardDeviation(testData).toFixed(2)}`);

// Full dataset analysis
const analyzer = new DatasetAnalyzer(testData, 'Sample Dataset');
analyzer.printSummary();

// Outlier detection
console.log('\n--- Outlier Detection ---');
const outliers = analyzer.detectOutliers();
console.log(`Lower Bound: ${outliers.lowerBound.toFixed(2)}`);
console.log(`Upper Bound: ${outliers.upperBound.toFixed(2)}`);
console.log(`Outliers: ${outliers.outliers.join(', ') || 'None'}`);

// Test metrics analysis example
console.log('\n--- Test Metrics Analysis ---');
const testAnalyzer = new TestMetricsAnalyzer();

// Simulate test results
[150, 200, 180, 5000, 220, 190, 250, 175, 195, 210].forEach((duration, i) => {
    testAnalyzer.recordTestResult({
        name: `test_${i + 1}`,
        passed: Math.random() > 0.2,
        duration
    });
});

const report = testAnalyzer.generateReport();
console.log(`Pass Rate: ${report.passRateAnalysis.passRate.toFixed(1)}%`);
console.log(`Avg Execution Time: ${report.executionAnalysis.centralTendency.mean.toFixed(0)}ms`);
console.log(`Slow Tests: ${report.executionAnalysis.slowTests.join(', ') || 'None'}`);

/**
 * Best Practices for Descriptive Statistics in Testing:
 *
 * 1. Use mean and median together - large differences indicate skewed data
 * 2. Standard deviation helps identify test execution variability
 * 3. Track percentiles (p95, p99) for performance thresholds
 * 4. Use IQR method to identify slow test outliers
 * 5. Monitor skewness to detect asymmetric test distributions
 * 6. Calculate coefficient of variation for comparing different metrics
 * 7. Create histograms to visualize test result distributions
 * 8. Track statistics over time to identify trends
 * 9. Use five-number summary for quick data overview
 * 10. Apply descriptive statistics before inferential analysis
 */
