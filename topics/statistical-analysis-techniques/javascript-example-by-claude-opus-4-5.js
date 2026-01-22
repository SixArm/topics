/**
 * Statistical Analysis Techniques - Methods for Data Interpretation
 *
 * Statistical analysis techniques refer to methods used to analyze and interpret
 * data to draw meaningful conclusions, identify patterns, make predictions, and
 * test hypotheses. These techniques are essential for quality assurance,
 * performance analysis, and data-driven testing decisions.
 *
 * Key Concepts:
 * - Descriptive vs inferential statistics
 * - Regression analysis
 * - Time series analysis
 * - Clustering and classification
 */

/**
 * RegressionAnalysis provides regression techniques.
 */
class RegressionAnalysis {
    /**
     * Performs simple linear regression
     * @param {Array} x - Independent variable
     * @param {Array} y - Dependent variable
     * @returns {Object} Regression result
     */
    static linearRegression(x, y) {
        if (x.length !== y.length || x.length === 0) {
            return { error: 'Invalid data' };
        }

        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
        const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        // Calculate R-squared
        const meanY = sumY / n;
        const ssTotal = y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0);
        const ssResidual = y.reduce((sum, yi, i) => {
            const predicted = slope * x[i] + intercept;
            return sum + Math.pow(yi - predicted, 2);
        }, 0);
        const rSquared = 1 - ssResidual / ssTotal;

        return {
            slope: slope.toFixed(4),
            intercept: intercept.toFixed(4),
            equation: `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`,
            rSquared: rSquared.toFixed(4),
            interpretation: rSquared > 0.7 ? 'Strong fit' :
                rSquared > 0.5 ? 'Moderate fit' : 'Weak fit'
        };
    }

    /**
     * Predicts value using regression
     * @param {Object} model - Regression model
     * @param {number} x - Input value
     * @returns {number} Predicted value
     */
    static predict(model, x) {
        return parseFloat(model.slope) * x + parseFloat(model.intercept);
    }
}

/**
 * TimeSeriesAnalysis provides time series techniques.
 */
class TimeSeriesAnalysis {
    /**
     * Calculates moving average
     * @param {Array} data - Time series data
     * @param {number} window - Window size
     * @returns {Array} Moving averages
     */
    static movingAverage(data, window) {
        const result = [];

        for (let i = 0; i <= data.length - window; i++) {
            const windowData = data.slice(i, i + window);
            const avg = windowData.reduce((a, b) => a + b, 0) / window;
            result.push({
                index: i + window - 1,
                value: avg.toFixed(2)
            });
        }

        return result;
    }

    /**
     * Calculates exponential moving average
     * @param {Array} data - Time series data
     * @param {number} alpha - Smoothing factor (0-1)
     * @returns {Array} EMA values
     */
    static exponentialMovingAverage(data, alpha = 0.3) {
        const result = [{ index: 0, value: data[0] }];

        for (let i = 1; i < data.length; i++) {
            const ema = alpha * data[i] + (1 - alpha) * result[i - 1].value;
            result.push({ index: i, value: parseFloat(ema.toFixed(2)) });
        }

        return result;
    }

    /**
     * Detects trend in time series
     * @param {Array} data - Time series data
     * @returns {Object} Trend analysis
     */
    static detectTrend(data) {
        const n = data.length;
        const x = Array.from({ length: n }, (_, i) => i);
        const regression = RegressionAnalysis.linearRegression(x, data);

        const slope = parseFloat(regression.slope);
        let trend;

        if (Math.abs(slope) < 0.01) trend = 'stable';
        else if (slope > 0) trend = 'increasing';
        else trend = 'decreasing';

        return {
            trend,
            slope: slope.toFixed(4),
            significance: parseFloat(regression.rSquared) > 0.5 ? 'significant' : 'not significant',
            forecast: this.forecast(data, 5)
        };
    }

    /**
     * Forecasts future values
     * @param {Array} data - Historical data
     * @param {number} periods - Periods to forecast
     * @returns {Array} Forecasted values
     */
    static forecast(data, periods) {
        const n = data.length;
        const x = Array.from({ length: n }, (_, i) => i);
        const regression = RegressionAnalysis.linearRegression(x, data);

        const forecasts = [];
        for (let i = 0; i < periods; i++) {
            const nextX = n + i;
            const predicted = RegressionAnalysis.predict(regression, nextX);
            forecasts.push({
                period: nextX,
                forecast: predicted.toFixed(2)
            });
        }

        return forecasts;
    }
}

/**
 * ClusterAnalysis provides clustering techniques.
 */
class ClusterAnalysis {
    /**
     * Performs k-means clustering (simplified)
     * @param {Array} data - Data points
     * @param {number} k - Number of clusters
     * @param {number} iterations - Max iterations
     * @returns {Object} Clustering result
     */
    static kMeans(data, k, iterations = 100) {
        // Initialize centroids randomly
        let centroids = data.slice(0, k).map(d => ({ ...d }));
        let assignments = new Array(data.length).fill(-1);

        for (let iter = 0; iter < iterations; iter++) {
            // Assign points to nearest centroid
            const newAssignments = data.map(point => {
                let minDist = Infinity;
                let nearest = 0;

                centroids.forEach((centroid, i) => {
                    const dist = this.euclideanDistance(point, centroid);
                    if (dist < minDist) {
                        minDist = dist;
                        nearest = i;
                    }
                });

                return nearest;
            });

            // Check convergence
            if (JSON.stringify(assignments) === JSON.stringify(newAssignments)) {
                break;
            }
            assignments = newAssignments;

            // Update centroids
            centroids = centroids.map((_, i) => {
                const clusterPoints = data.filter((_, j) => assignments[j] === i);
                if (clusterPoints.length === 0) return centroids[i];

                return {
                    x: clusterPoints.reduce((s, p) => s + p.x, 0) / clusterPoints.length,
                    y: clusterPoints.reduce((s, p) => s + p.y, 0) / clusterPoints.length
                };
            });
        }

        // Calculate cluster sizes
        const clusterSizes = centroids.map((_, i) =>
            assignments.filter(a => a === i).length
        );

        return {
            k,
            centroids: centroids.map((c, i) => ({
                cluster: i,
                x: c.x?.toFixed(2),
                y: c.y?.toFixed(2),
                size: clusterSizes[i]
            })),
            assignments,
            quality: this.silhouetteScore(data, assignments)
        };
    }

    /**
     * Calculates Euclidean distance
     * @param {Object} a - Point a
     * @param {Object} b - Point b
     * @returns {number} Distance
     */
    static euclideanDistance(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    /**
     * Calculates silhouette score (simplified)
     * @param {Array} data - Data points
     * @param {Array} assignments - Cluster assignments
     * @returns {string} Quality assessment
     */
    static silhouetteScore(data, assignments) {
        // Simplified quality assessment
        const k = Math.max(...assignments) + 1;
        const sizes = new Array(k).fill(0);
        assignments.forEach(a => sizes[a]++);

        const balanceRatio = Math.min(...sizes) / Math.max(...sizes);

        if (balanceRatio > 0.7) return 'good';
        if (balanceRatio > 0.4) return 'moderate';
        return 'poor';
    }
}

/**
 * HypothesisTesting provides statistical hypothesis tests.
 */
class HypothesisTesting {
    /**
     * Performs chi-square goodness of fit test
     * @param {Array} observed - Observed frequencies
     * @param {Array} expected - Expected frequencies
     * @returns {Object} Test result
     */
    static chiSquareTest(observed, expected) {
        if (observed.length !== expected.length) {
            return { error: 'Arrays must be same length' };
        }

        const chiSquare = observed.reduce((sum, obs, i) => {
            return sum + Math.pow(obs - expected[i], 2) / expected[i];
        }, 0);

        const degreesOfFreedom = observed.length - 1;

        // Critical values for common significance levels
        // This is simplified - real implementation would use chi-square distribution
        const criticalValues = {
            1: { 0.05: 3.84, 0.01: 6.63 },
            2: { 0.05: 5.99, 0.01: 9.21 },
            3: { 0.05: 7.81, 0.01: 11.34 }
        };

        const critical = criticalValues[degreesOfFreedom] || { 0.05: 'N/A', 0.01: 'N/A' };

        return {
            chiSquare: chiSquare.toFixed(4),
            degreesOfFreedom,
            significant05: chiSquare > critical[0.05],
            significant01: chiSquare > critical[0.01],
            interpretation: chiSquare > critical[0.05]
                ? 'Significant difference detected'
                : 'No significant difference'
        };
    }

    /**
     * Performs two-sample t-test
     * @param {Array} sample1 - First sample
     * @param {Array} sample2 - Second sample
     * @returns {Object} Test result
     */
    static tTest(sample1, sample2) {
        const n1 = sample1.length;
        const n2 = sample2.length;
        const mean1 = sample1.reduce((a, b) => a + b, 0) / n1;
        const mean2 = sample2.reduce((a, b) => a + b, 0) / n2;

        const var1 = sample1.reduce((s, x) => s + Math.pow(x - mean1, 2), 0) / (n1 - 1);
        const var2 = sample2.reduce((s, x) => s + Math.pow(x - mean2, 2), 0) / (n2 - 1);

        const pooledSE = Math.sqrt(var1 / n1 + var2 / n2);
        const t = (mean1 - mean2) / pooledSE;

        return {
            t: t.toFixed(4),
            mean1: mean1.toFixed(2),
            mean2: mean2.toFixed(2),
            difference: (mean1 - mean2).toFixed(2),
            significant: Math.abs(t) > 1.96,
            interpretation: Math.abs(t) > 1.96
                ? 'Samples are significantly different'
                : 'No significant difference between samples'
        };
    }
}

/**
 * TestingApplications applies techniques to testing scenarios.
 */
class TestingApplications {
    /**
     * Analyzes test performance trend
     * @param {Array} dailyTestTimes - Daily average test times
     * @returns {Object} Trend analysis
     */
    static analyzePerformanceTrend(dailyTestTimes) {
        const trend = TimeSeriesAnalysis.detectTrend(dailyTestTimes);
        const movingAvg = TimeSeriesAnalysis.movingAverage(dailyTestTimes, 3);

        return {
            currentTrend: trend.trend,
            trendStrength: trend.significance,
            movingAverages: movingAvg.slice(-5),
            forecast: trend.forecast,
            recommendation: trend.trend === 'increasing'
                ? 'Test times are increasing - investigate potential issues'
                : trend.trend === 'decreasing'
                    ? 'Test times are improving'
                    : 'Test times are stable'
        };
    }

    /**
     * Predicts defects based on code complexity
     * @param {Array} historicalData - Historical complexity/defect data
     * @param {number} newComplexity - New code complexity
     * @returns {Object} Prediction
     */
    static predictDefects(historicalData, newComplexity) {
        const x = historicalData.map(d => d.complexity);
        const y = historicalData.map(d => d.defects);

        const model = RegressionAnalysis.linearRegression(x, y);
        const predicted = RegressionAnalysis.predict(model, newComplexity);

        return {
            model: model.equation,
            modelFit: model.interpretation,
            inputComplexity: newComplexity,
            predictedDefects: Math.max(0, Math.round(predicted)),
            confidence: model.rSquared
        };
    }

    /**
     * Compares test execution before and after changes
     * @param {Array} before - Times before change
     * @param {Array} after - Times after change
     * @returns {Object} Comparison result
     */
    static compareTestRuns(before, after) {
        const tTest = HypothesisTesting.tTest(before, after);
        const improvement = parseFloat(tTest.mean2) < parseFloat(tTest.mean1);

        return {
            before: { mean: tTest.mean1, samples: before.length },
            after: { mean: tTest.mean2, samples: after.length },
            difference: tTest.difference,
            statisticallySignificant: tTest.significant,
            interpretation: tTest.significant
                ? (improvement ? 'Significant improvement detected' : 'Significant degradation detected')
                : 'No significant change',
            tStatistic: tTest.t
        };
    }
}

// Demonstration
console.log('=== Statistical Analysis Techniques Demo ===\n');

// Linear regression
console.log('--- Linear Regression ---');
const codeLines = [100, 200, 300, 400, 500, 600, 700, 800];
const bugCount = [2, 5, 7, 10, 12, 15, 18, 22];
const regression = RegressionAnalysis.linearRegression(codeLines, bugCount);
console.log('Predicting bugs from code lines:', regression);
console.log('Prediction for 1000 lines:', RegressionAnalysis.predict(regression, 1000).toFixed(1));

// Time series analysis
console.log('\n--- Time Series Analysis ---');
const dailyTestTimes = [100, 102, 98, 105, 110, 108, 115, 112, 118, 120];
console.log('Daily test times:', dailyTestTimes);
console.log('Moving Average (3):', TimeSeriesAnalysis.movingAverage(dailyTestTimes, 3).slice(-3));
console.log('Trend Analysis:', TimeSeriesAnalysis.detectTrend(dailyTestTimes));

// Clustering
console.log('\n--- Cluster Analysis ---');
const testData = [
    { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1.5, y: 1.5 },
    { x: 8, y: 8 }, { x: 9, y: 9 }, { x: 8.5, y: 8.5 },
    { x: 5, y: 1 }, { x: 6, y: 2 }, { x: 5.5, y: 1.5 }
];
console.log('Clustering result:', ClusterAnalysis.kMeans(testData, 3));

// Hypothesis testing
console.log('\n--- Hypothesis Testing ---');
const before = [100, 105, 98, 102, 99, 103, 101, 97];
const after = [92, 95, 88, 91, 90, 94, 89, 93];
console.log('T-Test comparing test runs:', HypothesisTesting.tTest(before, after));

// Chi-square test
console.log('\nChi-Square Test:',
    HypothesisTesting.chiSquareTest([45, 35, 20], [40, 40, 20]));

// Testing applications
console.log('\n--- Testing Applications ---');
console.log('Performance Trend:', TestingApplications.analyzePerformanceTrend(dailyTestTimes));

const historicalData = [
    { complexity: 10, defects: 1 },
    { complexity: 25, defects: 3 },
    { complexity: 40, defects: 5 },
    { complexity: 55, defects: 7 }
];
console.log('\nDefect Prediction:', TestingApplications.predictDefects(historicalData, 70));

console.log('\nCompare Test Runs:', TestingApplications.compareTestRuns(before, after));

/**
 * Best Practices for Statistical Analysis Techniques:
 *
 * 1. Choose appropriate technique for your data type
 * 2. Ensure sufficient sample sizes
 * 3. Validate assumptions of statistical tests
 * 4. Use multiple techniques to confirm findings
 * 5. Consider practical significance, not just statistical
 * 6. Visualize data before and after analysis
 * 7. Document analysis methodology
 * 8. Validate models with new data
 * 9. Report confidence intervals and effect sizes
 * 10. Seek domain expert review of conclusions
 */
