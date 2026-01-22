/**
 * Inferential Statistics - Drawing Conclusions from Samples
 *
 * Inferential statistics analyzes and interprets data to make inferences
 * about a larger population based on a sample. It uses statistical
 * techniques to make predictions, test hypotheses, and estimate
 * population parameters when full population data isn't available.
 *
 * Key Concepts:
 * - Hypothesis formulation and testing
 * - Sample selection and data collection
 * - Statistical significance and p-values
 * - Confidence intervals and margins of error
 */

/**
 * Sample represents a data sample from a population.
 * Contains methods for basic statistical calculations.
 */
class Sample {
    constructor(data, options = {}) {
        this.data = data;
        this.populationName = options.populationName || 'Unknown';
        this.sampleMethod = options.sampleMethod || 'random';
        this.collectedAt = new Date();
    }

    /**
     * Gets sample size
     * @returns {number} Sample size
     */
    get size() {
        return this.data.length;
    }

    /**
     * Calculates sample mean
     * @returns {number} Mean
     */
    mean() {
        if (this.data.length === 0) return 0;
        return this.data.reduce((sum, x) => sum + x, 0) / this.data.length;
    }

    /**
     * Calculates sample variance
     * @param {boolean} population - Use population formula
     * @returns {number} Variance
     */
    variance(population = false) {
        if (this.data.length === 0) return 0;
        const mean = this.mean();
        const squaredDiffs = this.data.map(x => Math.pow(x - mean, 2));
        const divisor = population ? this.data.length : this.data.length - 1;
        return squaredDiffs.reduce((sum, x) => sum + x, 0) / divisor;
    }

    /**
     * Calculates sample standard deviation
     * @param {boolean} population - Use population formula
     * @returns {number} Standard deviation
     */
    standardDeviation(population = false) {
        return Math.sqrt(this.variance(population));
    }

    /**
     * Calculates standard error of the mean
     * @returns {number} Standard error
     */
    standardError() {
        return this.standardDeviation() / Math.sqrt(this.data.length);
    }

    /**
     * Gets summary statistics
     * @returns {Object} Summary
     */
    getSummary() {
        const sorted = [...this.data].sort((a, b) => a - b);
        return {
            n: this.size,
            mean: this.mean().toFixed(4),
            stdDev: this.standardDeviation().toFixed(4),
            stdError: this.standardError().toFixed(4),
            min: Math.min(...this.data),
            max: Math.max(...this.data),
            median: sorted[Math.floor(sorted.length / 2)]
        };
    }
}

/**
 * Hypothesis represents a statistical hypothesis to test.
 * Defines null and alternative hypotheses.
 */
class Hypothesis {
    constructor(options) {
        this.name = options.name;
        this.nullHypothesis = options.null; // H0
        this.alternativeHypothesis = options.alternative; // H1 or Ha
        this.testType = options.testType; // 'two-tailed', 'left-tailed', 'right-tailed'
        this.alpha = options.alpha || 0.05; // Significance level
    }

    /**
     * Gets hypothesis description
     * @returns {Object} Description
     */
    describe() {
        return {
            name: this.name,
            H0: this.nullHypothesis,
            H1: this.alternativeHypothesis,
            testType: this.testType,
            significanceLevel: this.alpha
        };
    }
}

/**
 * HypothesisTester performs statistical hypothesis tests.
 * Implements common statistical tests.
 */
class HypothesisTester {
    /**
     * Performs a one-sample z-test
     * @param {Sample} sample - Sample data
     * @param {number} populationMean - Known population mean (H0)
     * @param {number} populationStdDev - Known population standard deviation
     * @param {string} testType - Test type
     * @returns {Object} Test result
     */
    static zTest(sample, populationMean, populationStdDev, testType = 'two-tailed') {
        const sampleMean = sample.mean();
        const n = sample.size;

        // Calculate z-score
        const z = (sampleMean - populationMean) / (populationStdDev / Math.sqrt(n));

        // Calculate p-value (approximation)
        const pValue = this.calculatePValue(z, testType);

        return {
            testName: 'One-Sample Z-Test',
            sampleMean: sampleMean.toFixed(4),
            populationMean,
            zScore: z.toFixed(4),
            pValue: pValue.toFixed(6),
            testType
        };
    }

    /**
     * Performs a one-sample t-test
     * @param {Sample} sample - Sample data
     * @param {number} hypothesizedMean - Hypothesized population mean
     * @param {string} testType - Test type
     * @returns {Object} Test result
     */
    static tTest(sample, hypothesizedMean, testType = 'two-tailed') {
        const sampleMean = sample.mean();
        const sampleStdDev = sample.standardDeviation();
        const n = sample.size;
        const df = n - 1; // Degrees of freedom

        // Calculate t-statistic
        const t = (sampleMean - hypothesizedMean) / (sampleStdDev / Math.sqrt(n));

        // Approximate p-value (simplified)
        const pValue = this.approximateTDistPValue(t, df, testType);

        return {
            testName: 'One-Sample T-Test',
            sampleMean: sampleMean.toFixed(4),
            hypothesizedMean,
            tStatistic: t.toFixed(4),
            degreesOfFreedom: df,
            pValue: pValue.toFixed(6),
            testType
        };
    }

    /**
     * Performs two-sample t-test
     * @param {Sample} sample1 - First sample
     * @param {Sample} sample2 - Second sample
     * @param {string} testType - Test type
     * @returns {Object} Test result
     */
    static twoSampleTTest(sample1, sample2, testType = 'two-tailed') {
        const mean1 = sample1.mean();
        const mean2 = sample2.mean();
        const var1 = sample1.variance();
        const var2 = sample2.variance();
        const n1 = sample1.size;
        const n2 = sample2.size;

        // Pooled variance (assuming equal variances)
        const pooledVar = ((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2);

        // T-statistic
        const t = (mean1 - mean2) / Math.sqrt(pooledVar * (1/n1 + 1/n2));

        const df = n1 + n2 - 2;
        const pValue = this.approximateTDistPValue(t, df, testType);

        return {
            testName: 'Two-Sample T-Test',
            mean1: mean1.toFixed(4),
            mean2: mean2.toFixed(4),
            difference: (mean1 - mean2).toFixed(4),
            tStatistic: t.toFixed(4),
            degreesOfFreedom: df,
            pValue: pValue.toFixed(6),
            testType
        };
    }

    /**
     * Calculates p-value for z-score
     * @param {number} z - Z-score
     * @param {string} testType - Test type
     * @returns {number} P-value
     */
    static calculatePValue(z, testType) {
        // Standard normal CDF approximation
        const cdf = this.normalCDF(z);

        switch (testType) {
            case 'left-tailed':
                return cdf;
            case 'right-tailed':
                return 1 - cdf;
            case 'two-tailed':
            default:
                return 2 * Math.min(cdf, 1 - cdf);
        }
    }

    /**
     * Approximates normal CDF
     * @param {number} z - Z-score
     * @returns {number} CDF value
     */
    static normalCDF(z) {
        // Approximation using error function
        const a1 =  0.254829592;
        const a2 = -0.284496736;
        const a3 =  1.421413741;
        const a4 = -1.453152027;
        const a5 =  1.061405429;
        const p  =  0.3275911;

        const sign = z < 0 ? -1 : 1;
        z = Math.abs(z) / Math.sqrt(2);

        const t = 1.0 / (1.0 + p * z);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

        return 0.5 * (1.0 + sign * y);
    }

    /**
     * Approximates t-distribution p-value
     * @param {number} t - T-statistic
     * @param {number} df - Degrees of freedom
     * @param {string} testType - Test type
     * @returns {number} P-value
     */
    static approximateTDistPValue(t, df, testType) {
        // Approximation: for large df, t approaches normal
        // For small df, this is a rough approximation
        const adjustedZ = t * Math.sqrt(df / (df + t * t));
        return this.calculatePValue(adjustedZ, testType);
    }
}

/**
 * ConfidenceInterval calculates confidence intervals for estimates.
 */
class ConfidenceInterval {
    /**
     * Calculates confidence interval for mean (known population std dev)
     * @param {Sample} sample - Sample data
     * @param {number} populationStdDev - Population standard deviation
     * @param {number} confidenceLevel - Confidence level (e.g., 0.95)
     * @returns {Object} Confidence interval
     */
    static forMeanZ(sample, populationStdDev, confidenceLevel = 0.95) {
        const mean = sample.mean();
        const n = sample.size;
        const zCritical = this.getZCritical(confidenceLevel);
        const marginOfError = zCritical * (populationStdDev / Math.sqrt(n));

        return {
            method: 'Z-interval',
            pointEstimate: mean.toFixed(4),
            confidenceLevel: `${confidenceLevel * 100}%`,
            marginOfError: marginOfError.toFixed(4),
            lowerBound: (mean - marginOfError).toFixed(4),
            upperBound: (mean + marginOfError).toFixed(4),
            interpretation: `We are ${confidenceLevel * 100}% confident the true mean is between ${(mean - marginOfError).toFixed(4)} and ${(mean + marginOfError).toFixed(4)}`
        };
    }

    /**
     * Calculates confidence interval for mean (unknown population std dev)
     * @param {Sample} sample - Sample data
     * @param {number} confidenceLevel - Confidence level
     * @returns {Object} Confidence interval
     */
    static forMeanT(sample, confidenceLevel = 0.95) {
        const mean = sample.mean();
        const se = sample.standardError();
        const df = sample.size - 1;
        const tCritical = this.getTCritical(confidenceLevel, df);
        const marginOfError = tCritical * se;

        return {
            method: 'T-interval',
            pointEstimate: mean.toFixed(4),
            confidenceLevel: `${confidenceLevel * 100}%`,
            degreesOfFreedom: df,
            marginOfError: marginOfError.toFixed(4),
            lowerBound: (mean - marginOfError).toFixed(4),
            upperBound: (mean + marginOfError).toFixed(4)
        };
    }

    /**
     * Gets z critical value for confidence level
     * @param {number} confidenceLevel - Confidence level
     * @returns {number} Z critical value
     */
    static getZCritical(confidenceLevel) {
        // Common z critical values
        const zValues = {
            0.90: 1.645,
            0.95: 1.96,
            0.99: 2.576
        };
        return zValues[confidenceLevel] || 1.96;
    }

    /**
     * Gets t critical value (approximation)
     * @param {number} confidenceLevel - Confidence level
     * @param {number} df - Degrees of freedom
     * @returns {number} T critical value
     */
    static getTCritical(confidenceLevel, df) {
        // Approximation for common confidence levels
        // In practice, use t-distribution tables or libraries
        if (df >= 30) {
            return this.getZCritical(confidenceLevel);
        }

        // Rough approximation for smaller df
        const zCritical = this.getZCritical(confidenceLevel);
        return zCritical * (1 + 1 / (4 * df));
    }
}

/**
 * InferentialAnalysis performs complete inferential analysis.
 * Coordinates hypothesis testing and interval estimation.
 */
class InferentialAnalysis {
    constructor(sample) {
        this.sample = sample;
        this.results = [];
    }

    /**
     * Tests a hypothesis
     * @param {Hypothesis} hypothesis - Hypothesis to test
     * @param {Object} params - Test parameters
     * @returns {Object} Test results
     */
    testHypothesis(hypothesis, params) {
        let result;

        if (params.knownStdDev) {
            result = HypothesisTester.zTest(
                this.sample,
                params.hypothesizedMean,
                params.knownStdDev,
                hypothesis.testType
            );
        } else {
            result = HypothesisTester.tTest(
                this.sample,
                params.hypothesizedMean,
                hypothesis.testType
            );
        }

        // Add decision
        const pValue = parseFloat(result.pValue);
        result.decision = pValue < hypothesis.alpha
            ? `Reject H0 at α=${hypothesis.alpha}`
            : `Fail to reject H0 at α=${hypothesis.alpha}`;

        result.significant = pValue < hypothesis.alpha;

        this.results.push({
            hypothesis: hypothesis.describe(),
            result
        });

        return result;
    }

    /**
     * Calculates confidence interval
     * @param {number} confidenceLevel - Confidence level
     * @returns {Object} Confidence interval
     */
    calculateCI(confidenceLevel = 0.95) {
        return ConfidenceInterval.forMeanT(this.sample, confidenceLevel);
    }

    /**
     * Generates full analysis report
     * @returns {Object} Analysis report
     */
    generateReport() {
        return {
            sample: {
                size: this.sample.size,
                population: this.sample.populationName,
                method: this.sample.sampleMethod,
                summary: this.sample.getSummary()
            },
            tests: this.results,
            confidenceIntervals: {
                ci90: this.calculateCI(0.90),
                ci95: this.calculateCI(0.95),
                ci99: this.calculateCI(0.99)
            },
            generatedAt: new Date().toISOString()
        };
    }
}

// Demonstration
console.log('=== Inferential Statistics Demo ===\n');

// Create sample data (simulating response times in milliseconds)
const responseTimeData = [
    245, 267, 289, 234, 256, 278, 290, 265, 243, 287,
    259, 271, 248, 295, 263, 282, 251, 274, 268, 253
];

const sample = new Sample(responseTimeData, {
    populationName: 'API Response Times',
    sampleMethod: 'random'
});

console.log('--- Sample Statistics ---');
console.log('Summary:', sample.getSummary());

// Create hypothesis
console.log('\n--- Hypothesis Testing ---');
const hypothesis = new Hypothesis({
    name: 'Response Time Test',
    null: 'Mean response time = 250ms',
    alternative: 'Mean response time ≠ 250ms',
    testType: 'two-tailed',
    alpha: 0.05
});

console.log('Hypothesis:', hypothesis.describe());

// Perform analysis
const analysis = new InferentialAnalysis(sample);

const testResult = analysis.testHypothesis(hypothesis, {
    hypothesizedMean: 250
});

console.log('\nTest Result:', testResult);

// Confidence interval
console.log('\n--- Confidence Intervals ---');
console.log('95% CI:', analysis.calculateCI(0.95));

// Two-sample comparison
console.log('\n--- Two-Sample Comparison ---');
const newSystemData = [
    198, 215, 203, 221, 195, 208, 212, 199, 225, 206
];
const newSample = new Sample(newSystemData, {
    populationName: 'New System Response Times'
});

const comparison = HypothesisTester.twoSampleTTest(sample, newSample);
console.log('Two-Sample T-Test:', comparison);

// Full report
console.log('\n--- Full Analysis Report ---');
const report = analysis.generateReport();
console.log('Sample Size:', report.sample.size);
console.log('Tests Performed:', report.tests.length);

/**
 * Best Practices for Inferential Statistics:
 *
 * 1. Ensure samples are random and representative
 * 2. Check assumptions before applying tests
 * 3. Use appropriate sample sizes for desired power
 * 4. Report effect sizes alongside p-values
 * 5. Understand the difference between statistical and practical significance
 * 6. Use confidence intervals for estimation
 * 7. Avoid p-hacking and multiple comparison problems
 * 8. Pre-register hypotheses when possible
 * 9. Consider Bayesian alternatives when appropriate
 * 10. Always report methodology and assumptions
 */
