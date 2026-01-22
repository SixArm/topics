/**
 * Variance - Statistical Measure of Data Spread
 *
 * Variance is a statistical measure used to quantify the spread or dispersion
 * of a set of data points around their mean or expected value. It is calculated
 * by taking the average of the squared differences between each data point and
 * the mean. Variance is fundamental to understanding data variability in testing.
 *
 * Key Concepts:
 * - Mean calculation
 * - Squared deviations
 * - Population vs sample variance
 * - Standard deviation relationship
 */

/**
 * VarianceCalculator provides variance calculation methods.
 */
class VarianceCalculator {
    /**
     * Calculates population variance
     * @param {Array} data - Data points
     * @returns {Object} Variance calculation
     */
    static populationVariance(data) {
        if (data.length === 0) return { error: 'No data provided' };

        const n = data.length;
        const mean = data.reduce((sum, val) => sum + val, 0) / n;
        const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / n;

        return {
            n,
            mean: mean.toFixed(4),
            variance: variance.toFixed(4),
            standardDeviation: Math.sqrt(variance).toFixed(4),
            formula: 'Var(X) = (1/n) * Σ(Xi - μ)²',
            type: 'population'
        };
    }

    /**
     * Calculates sample variance (Bessel's correction)
     * @param {Array} data - Sample data points
     * @returns {Object} Sample variance calculation
     */
    static sampleVariance(data) {
        if (data.length < 2) return { error: 'Need at least 2 data points' };

        const n = data.length;
        const mean = data.reduce((sum, val) => sum + val, 0) / n;
        const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / (n - 1);

        return {
            n,
            degreesOfFreedom: n - 1,
            mean: mean.toFixed(4),
            variance: variance.toFixed(4),
            standardDeviation: Math.sqrt(variance).toFixed(4),
            formula: 's² = (1/(n-1)) * Σ(Xi - x̄)²',
            type: 'sample',
            note: "Uses Bessel's correction (n-1) for unbiased estimate"
        };
    }

    /**
     * Calculates coefficient of variation
     * @param {Array} data - Data points
     * @returns {Object} CV calculation
     */
    static coefficientOfVariation(data) {
        const stats = this.sampleVariance(data);
        if (stats.error) return stats;

        const mean = parseFloat(stats.mean);
        const stdDev = parseFloat(stats.standardDeviation);
        const cv = (stdDev / Math.abs(mean)) * 100;

        return {
            coefficientOfVariation: cv.toFixed(2) + '%',
            interpretation: cv < 15 ? 'Low variability' :
                cv < 30 ? 'Moderate variability' : 'High variability',
            useCase: 'Compare variability across different scales'
        };
    }
}

/**
 * TestMetricVariance analyzes variance in test metrics.
 */
class TestMetricVariance {
    /**
     * Analyzes test execution time variance
     * @param {Array} executionTimes - Execution times in ms
     * @returns {Object} Variance analysis
     */
    static analyzeExecutionTimeVariance(executionTimes) {
        const stats = VarianceCalculator.sampleVariance(executionTimes);
        const cv = VarianceCalculator.coefficientOfVariation(executionTimes);

        const mean = parseFloat(stats.mean);
        const stdDev = parseFloat(stats.standardDeviation);

        return {
            statistics: stats,
            coefficientOfVariation: cv.coefficientOfVariation,
            stability: cv.interpretation,
            outlierThreshold: {
                lower: (mean - 2 * stdDev).toFixed(2),
                upper: (mean + 2 * stdDev).toFixed(2)
            },
            recommendation: parseFloat(cv.coefficientOfVariation) > 30
                ? 'High variance - investigate inconsistent test times'
                : 'Execution times are reasonably consistent'
        };
    }

    /**
     * Analyzes defect count variance across releases
     * @param {Array} defectCounts - Defects per release
     * @returns {Object} Defect variance analysis
     */
    static analyzeDefectVariance(defectCounts) {
        const stats = VarianceCalculator.sampleVariance(defectCounts);
        const cv = VarianceCalculator.coefficientOfVariation(defectCounts);

        return {
            statistics: stats,
            variability: cv.interpretation,
            predictability: parseFloat(cv.coefficientOfVariation) < 20
                ? 'Defect rates are predictable'
                : 'Defect rates vary significantly between releases',
            qualityConsistency: parseFloat(stats.variance) < 10
                ? 'Consistent quality across releases'
                : 'Quality varies - investigate root causes'
        };
    }

    /**
     * Analyzes test coverage variance across modules
     * @param {Array} coveragePercentages - Coverage per module
     * @returns {Object} Coverage variance analysis
     */
    static analyzeCoverageVariance(coveragePercentages) {
        const stats = VarianceCalculator.sampleVariance(coveragePercentages);
        const min = Math.min(...coveragePercentages);
        const max = Math.max(...coveragePercentages);
        const range = max - min;

        return {
            statistics: stats,
            range: range.toFixed(2) + '%',
            min: min.toFixed(2) + '%',
            max: max.toFixed(2) + '%',
            uniformity: range < 20 ? 'Good coverage uniformity' : 'Uneven coverage distribution',
            recommendation: range > 30
                ? 'Some modules need more test coverage attention'
                : 'Coverage is well distributed'
        };
    }
}

/**
 * VarianceComparison compares variance between groups.
 */
class VarianceComparison {
    /**
     * Performs F-test for variance comparison
     * @param {Array} group1 - First group data
     * @param {Array} group2 - Second group data
     * @returns {Object} F-test result
     */
    static fTest(group1, group2) {
        const var1 = VarianceCalculator.sampleVariance(group1);
        const var2 = VarianceCalculator.sampleVariance(group2);

        const variance1 = parseFloat(var1.variance);
        const variance2 = parseFloat(var2.variance);

        const fStatistic = variance1 > variance2
            ? variance1 / variance2
            : variance2 / variance1;

        return {
            group1Variance: var1.variance,
            group2Variance: var2.variance,
            fStatistic: fStatistic.toFixed(4),
            df1: group1.length - 1,
            df2: group2.length - 1,
            interpretation: fStatistic < 2
                ? 'Variances are similar'
                : 'Variances differ significantly',
            note: 'F-test assumes normally distributed data'
        };
    }

    /**
     * Compares variance before and after changes
     * @param {Array} before - Data before change
     * @param {Array} after - Data after change
     * @returns {Object} Comparison result
     */
    static compareBeforeAfter(before, after) {
        const beforeStats = VarianceCalculator.sampleVariance(before);
        const afterStats = VarianceCalculator.sampleVariance(after);

        const varianceChange = (
            (parseFloat(afterStats.variance) - parseFloat(beforeStats.variance)) /
            parseFloat(beforeStats.variance) * 100
        );

        return {
            before: beforeStats,
            after: afterStats,
            varianceChange: varianceChange.toFixed(2) + '%',
            improvement: varianceChange < 0,
            interpretation: varianceChange < -10
                ? 'Variance reduced significantly - more consistent results'
                : varianceChange > 10
                    ? 'Variance increased - results less consistent'
                    : 'Variance remained similar'
        };
    }
}

/**
 * VarianceThresholds defines acceptable variance levels.
 */
class VarianceThresholds {
    static thresholds = {
        executionTime: {
            name: 'Test Execution Time',
            maxCV: 25,
            unit: '%',
            description: 'Acceptable coefficient of variation for test times'
        },
        passRate: {
            name: 'Test Pass Rate',
            maxVariance: 5,
            unit: '%',
            description: 'Maximum variance in pass rates across runs'
        },
        coverage: {
            name: 'Code Coverage',
            maxRange: 20,
            unit: '%',
            description: 'Maximum range between module coverages'
        },
        defects: {
            name: 'Defect Count',
            maxCV: 30,
            unit: '%',
            description: 'Acceptable variation in defects per release'
        }
    };

    /**
     * Checks if metric is within threshold
     * @param {string} metric - Metric name
     * @param {number} value - Calculated variance/CV
     * @returns {Object} Threshold check result
     */
    static checkThreshold(metric, value) {
        const threshold = this.thresholds[metric];
        if (!threshold) return { error: 'Unknown metric' };

        const limit = threshold.maxCV || threshold.maxVariance || threshold.maxRange;
        const passed = value <= limit;

        return {
            metric: threshold.name,
            value: value.toFixed(2) + threshold.unit,
            threshold: limit + threshold.unit,
            passed,
            status: passed ? 'Within acceptable limits' : 'Exceeds threshold - attention needed'
        };
    }

    /**
     * Gets all thresholds
     * @returns {Array} All thresholds
     */
    static getAllThresholds() {
        return Object.entries(this.thresholds).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * VarianceReport generates variance analysis reports.
 */
class VarianceReport {
    /**
     * Generates comprehensive variance report
     * @param {Object} data - Test metrics data
     * @returns {Object} Variance report
     */
    static generate(data) {
        const sections = [];

        if (data.executionTimes) {
            sections.push({
                section: 'Execution Time Analysis',
                analysis: TestMetricVariance.analyzeExecutionTimeVariance(data.executionTimes)
            });
        }

        if (data.defectCounts) {
            sections.push({
                section: 'Defect Variance Analysis',
                analysis: TestMetricVariance.analyzeDefectVariance(data.defectCounts)
            });
        }

        if (data.coveragePercentages) {
            sections.push({
                section: 'Coverage Distribution Analysis',
                analysis: TestMetricVariance.analyzeCoverageVariance(data.coveragePercentages)
            });
        }

        const overallHealth = sections.every(s =>
            !s.analysis.recommendation?.includes('investigate') &&
            !s.analysis.recommendation?.includes('attention')
        );

        return {
            reportDate: new Date().toISOString(),
            sections,
            overallHealth: overallHealth ? 'Good' : 'Needs Attention',
            summary: overallHealth
                ? 'Test metrics show acceptable variance levels'
                : 'Some metrics show high variance - review recommended'
        };
    }
}

// Demonstration
console.log('=== Variance Demo ===\n');

// Basic variance calculation
console.log('--- Variance Calculation ---');
const testTimes = [150, 165, 142, 178, 155, 160, 148, 172, 163, 157];
console.log('Data:', testTimes);
console.log('Population Variance:', VarianceCalculator.populationVariance(testTimes));
console.log('Sample Variance:', VarianceCalculator.sampleVariance(testTimes));
console.log('Coefficient of Variation:', VarianceCalculator.coefficientOfVariation(testTimes));

// Test metric variance analysis
console.log('\n--- Test Metric Variance ---');
console.log('Execution Time Analysis:', TestMetricVariance.analyzeExecutionTimeVariance(testTimes));

const defects = [12, 15, 8, 20, 14, 11, 18, 9, 16, 13];
console.log('\nDefect Variance:', TestMetricVariance.analyzeDefectVariance(defects));

const coverage = [85, 72, 90, 68, 88, 75, 82, 95, 70, 87];
console.log('\nCoverage Variance:', TestMetricVariance.analyzeCoverageVariance(coverage));

// Variance comparison
console.log('\n--- Variance Comparison ---');
const beforeOptimization = [200, 250, 180, 300, 220, 280, 190, 260];
const afterOptimization = [150, 160, 145, 170, 155, 165, 148, 158];
console.log('Before vs After:', VarianceComparison.compareBeforeAfter(beforeOptimization, afterOptimization));

// Thresholds
console.log('\n--- Variance Thresholds ---');
console.log(VarianceThresholds.checkThreshold('executionTime', 15));
console.log(VarianceThresholds.checkThreshold('defects', 35));

// Report
console.log('\n--- Variance Report ---');
console.log(VarianceReport.generate({
    executionTimes: testTimes,
    defectCounts: defects,
    coveragePercentages: coverage
}));

/**
 * Best Practices for Variance Analysis in Testing:
 *
 * 1. Use sample variance for test data (Bessel's correction)
 * 2. Track variance trends over time
 * 3. Set appropriate variance thresholds
 * 4. Investigate high variance causes
 * 5. Use coefficient of variation for comparisons
 * 6. Consider outliers in analysis
 * 7. Compare variance before/after changes
 * 8. Document acceptable variance levels
 * 9. Automate variance monitoring
 * 10. Use variance to identify flaky tests
 */
