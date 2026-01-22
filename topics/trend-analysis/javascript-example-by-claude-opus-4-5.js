/**
 * Trend Analysis - Identifying Patterns Over Time
 *
 * Trend analysis is a statistical method of examining data over time to identify
 * patterns and predict future outcomes. In testing, it helps track quality metrics,
 * predict defect patterns, and make data-driven decisions about testing strategies.
 *
 * Key Concepts:
 * - Time series data analysis
 * - Pattern identification
 * - Forecasting and prediction
 * - Quality metric monitoring
 */

/**
 * TrendAnalyzer performs trend analysis on time series data.
 */
class TrendAnalyzer {
    /**
     * Calculates linear trend
     * @param {Array} data - Time series data points
     * @returns {Object} Trend analysis
     */
    static calculateLinearTrend(data) {
        const n = data.length;
        if (n < 2) return { error: 'Need at least 2 data points' };

        // Calculate linear regression
        const sumX = data.reduce((sum, _, i) => sum + i, 0);
        const sumY = data.reduce((sum, val) => sum + val, 0);
        const sumXY = data.reduce((sum, val, i) => sum + i * val, 0);
        const sumXX = data.reduce((sum, _, i) => sum + i * i, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        // Determine trend direction
        let direction;
        if (Math.abs(slope) < 0.01) direction = 'stable';
        else if (slope > 0) direction = 'increasing';
        else direction = 'decreasing';

        // Calculate R-squared
        const meanY = sumY / n;
        const ssTotal = data.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0);
        const ssResidual = data.reduce((sum, val, i) => {
            const predicted = slope * i + intercept;
            return sum + Math.pow(val - predicted, 2);
        }, 0);
        const rSquared = 1 - ssResidual / ssTotal;

        return {
            slope: slope.toFixed(4),
            intercept: intercept.toFixed(4),
            direction,
            rSquared: rSquared.toFixed(4),
            strength: rSquared > 0.7 ? 'strong' : rSquared > 0.4 ? 'moderate' : 'weak',
            equation: `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`
        };
    }

    /**
     * Calculates moving average
     * @param {Array} data - Time series data
     * @param {number} window - Window size
     * @returns {Array} Moving averages
     */
    static movingAverage(data, window = 3) {
        const result = [];
        for (let i = 0; i <= data.length - window; i++) {
            const windowData = data.slice(i, i + window);
            const avg = windowData.reduce((a, b) => a + b, 0) / window;
            result.push({
                period: i + window,
                value: parseFloat(avg.toFixed(2)),
                window: windowData
            });
        }
        return result;
    }

    /**
     * Detects seasonality in data
     * @param {Array} data - Time series data
     * @param {number} period - Expected period length
     * @returns {Object} Seasonality analysis
     */
    static detectSeasonality(data, period = 4) {
        if (data.length < period * 2) {
            return { detected: false, reason: 'Insufficient data for seasonality detection' };
        }

        // Group by position in period
        const periodGroups = Array.from({ length: period }, () => []);
        data.forEach((val, i) => {
            periodGroups[i % period].push(val);
        });

        // Calculate averages for each position
        const periodAverages = periodGroups.map(group =>
            group.reduce((a, b) => a + b, 0) / group.length
        );

        // Calculate variation between positions
        const overallAvg = data.reduce((a, b) => a + b, 0) / data.length;
        const variation = periodAverages.map(avg =>
            ((avg - overallAvg) / overallAvg * 100).toFixed(1) + '%'
        );

        // Detect if there's significant seasonality
        const maxVariation = Math.max(...periodAverages.map(avg =>
            Math.abs(avg - overallAvg) / overallAvg
        ));

        return {
            detected: maxVariation > 0.1,
            period,
            periodAverages: periodAverages.map(v => v.toFixed(2)),
            variation,
            interpretation: maxVariation > 0.1
                ? 'Significant seasonal pattern detected'
                : 'No significant seasonal pattern'
        };
    }

    /**
     * Forecasts future values
     * @param {Array} data - Historical data
     * @param {number} periods - Periods to forecast
     * @returns {Array} Forecasted values
     */
    static forecast(data, periods = 5) {
        const trend = this.calculateLinearTrend(data);
        const slope = parseFloat(trend.slope);
        const intercept = parseFloat(trend.intercept);

        const forecasts = [];
        for (let i = 0; i < periods; i++) {
            const x = data.length + i;
            const predicted = slope * x + intercept;
            forecasts.push({
                period: x + 1,
                forecast: parseFloat(predicted.toFixed(2)),
                confidence: trend.strength
            });
        }

        return {
            model: trend.equation,
            forecasts,
            caveat: 'Forecasts assume trend continues'
        };
    }
}

/**
 * TestMetricTrends analyzes trends in testing metrics.
 */
class TestMetricTrends {
    /**
     * Analyzes defect trend
     * @param {Array} defectCounts - Defects per period
     * @returns {Object} Defect trend analysis
     */
    static analyzeDefectTrend(defectCounts) {
        const trend = TrendAnalyzer.calculateLinearTrend(defectCounts);

        let interpretation;
        if (trend.direction === 'decreasing') {
            interpretation = 'Quality improving - defects decreasing';
        } else if (trend.direction === 'increasing') {
            interpretation = 'Quality concern - defects increasing';
        } else {
            interpretation = 'Defect rate stable';
        }

        return {
            ...trend,
            interpretation,
            currentRate: defectCounts[defectCounts.length - 1],
            average: (defectCounts.reduce((a, b) => a + b, 0) / defectCounts.length).toFixed(2),
            recommendation: trend.direction === 'increasing'
                ? 'Investigate root causes and increase testing'
                : 'Continue current testing practices'
        };
    }

    /**
     * Analyzes test execution time trend
     * @param {Array} executionTimes - Execution times per period
     * @returns {Object} Execution time analysis
     */
    static analyzeExecutionTimeTrend(executionTimes) {
        const trend = TrendAnalyzer.calculateLinearTrend(executionTimes);
        const movingAvg = TrendAnalyzer.movingAverage(executionTimes);

        let concern = false;
        if (trend.direction === 'increasing' && parseFloat(trend.slope) > 1) {
            concern = true;
        }

        return {
            trend,
            movingAverage: movingAvg.slice(-3),
            concern,
            interpretation: concern
                ? 'Test execution time increasing significantly'
                : 'Test execution time within acceptable range',
            recommendation: concern
                ? 'Review test suite for optimization opportunities'
                : 'No action needed'
        };
    }

    /**
     * Analyzes test coverage trend
     * @param {Array} coverageData - Coverage percentages per period
     * @returns {Object} Coverage analysis
     */
    static analyzeCoverageTrend(coverageData) {
        const trend = TrendAnalyzer.calculateLinearTrend(coverageData);
        const latest = coverageData[coverageData.length - 1];

        return {
            trend,
            currentCoverage: latest + '%',
            targetMet: latest >= 80,
            interpretation: trend.direction === 'increasing'
                ? 'Coverage improving'
                : trend.direction === 'decreasing'
                    ? 'Coverage declining - attention needed'
                    : 'Coverage stable',
            forecast: TrendAnalyzer.forecast(coverageData, 3)
        };
    }

    /**
     * Analyzes flaky test trend
     * @param {Array} flakyTestCounts - Flaky test counts per period
     * @returns {Object} Flaky test analysis
     */
    static analyzeFlakyTestTrend(flakyTestCounts) {
        const trend = TrendAnalyzer.calculateLinearTrend(flakyTestCounts);

        return {
            trend,
            currentCount: flakyTestCounts[flakyTestCounts.length - 1],
            isWorsening: trend.direction === 'increasing',
            interpretation: trend.direction === 'decreasing'
                ? 'Flaky test problem improving'
                : trend.direction === 'increasing'
                    ? 'Flaky tests increasing - test reliability at risk'
                    : 'Flaky test count stable',
            recommendation: flakyTestCounts[flakyTestCounts.length - 1] > 5
                ? 'Prioritize fixing or removing flaky tests'
                : 'Monitor and address as they arise'
        };
    }
}

/**
 * TrendVisualization provides visualization helpers.
 */
class TrendVisualization {
    /**
     * Creates ASCII chart
     * @param {Array} data - Data points
     * @param {Object} options - Chart options
     * @returns {string} ASCII chart
     */
    static asciiChart(data, options = {}) {
        const height = options.height || 10;
        const width = data.length;
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        const chart = [];
        for (let row = 0; row < height; row++) {
            let line = '';
            const threshold = max - (row / height) * range;
            for (let col = 0; col < width; col++) {
                if (data[col] >= threshold) {
                    line += '█';
                } else {
                    line += ' ';
                }
            }
            chart.push(`${threshold.toFixed(0).padStart(4)} |${line}`);
        }
        chart.push('     +' + '-'.repeat(width));

        return chart.join('\n');
    }

    /**
     * Creates sparkline
     * @param {Array} data - Data points
     * @returns {string} Sparkline
     */
    static sparkline(data) {
        const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        return data.map(val => {
            const index = Math.floor(((val - min) / range) * (chars.length - 1));
            return chars[index];
        }).join('');
    }
}

/**
 * TrendAlerts provides alerting based on trends.
 */
class TrendAlerts {
    /**
     * Checks for alerts based on trend data
     * @param {Object} trendData - Trend analysis data
     * @param {Object} thresholds - Alert thresholds
     * @returns {Array} Active alerts
     */
    static check(trendData, thresholds = {}) {
        const alerts = [];

        // Check for negative trend
        if (trendData.direction === 'increasing' && thresholds.warnOnIncrease) {
            alerts.push({
                level: 'warning',
                message: `Metric is trending upward: ${trendData.slope} per period`,
                action: 'Review recent changes'
            });
        }

        // Check for strong negative trend
        if (parseFloat(trendData.rSquared) > 0.7 && trendData.direction === 'increasing') {
            alerts.push({
                level: 'critical',
                message: 'Strong increasing trend detected',
                action: 'Immediate attention required'
            });
        }

        return alerts;
    }
}

// Demonstration
console.log('=== Trend Analysis Demo ===\n');

// Linear trend analysis
console.log('--- Defect Trend Analysis ---');
const defectData = [12, 15, 11, 18, 20, 17, 22, 25, 21, 28];
console.log('Data:', defectData);
console.log('Trend:', TrendAnalyzer.calculateLinearTrend(defectData));

// Moving average
console.log('\n--- Moving Average (3-period) ---');
console.log(TrendAnalyzer.movingAverage(defectData, 3));

// Seasonality detection
console.log('\n--- Seasonality Detection ---');
const seasonalData = [10, 15, 20, 12, 11, 16, 21, 13, 10, 14, 19, 11];
console.log('Data:', seasonalData);
console.log(TrendAnalyzer.detectSeasonality(seasonalData, 4));

// Forecasting
console.log('\n--- Forecasting ---');
console.log(TrendAnalyzer.forecast(defectData, 3));

// Test metric trends
console.log('\n--- Test Metric Trends ---');
console.log('Defect Trend:', TestMetricTrends.analyzeDefectTrend(defectData));

const coverageData = [65, 68, 70, 72, 75, 73, 78, 80, 82, 85];
console.log('\nCoverage Trend:', TestMetricTrends.analyzeCoverageTrend(coverageData));

const flakyTests = [3, 5, 4, 7, 6, 8, 9, 7, 10, 8];
console.log('\nFlaky Test Trend:', TestMetricTrends.analyzeFlakyTestTrend(flakyTests));

// Visualization
console.log('\n--- Visualization ---');
console.log('Sparkline:', TrendVisualization.sparkline(defectData));

// Alerts
console.log('\n--- Trend Alerts ---');
const trend = TrendAnalyzer.calculateLinearTrend(defectData);
console.log(TrendAlerts.check(trend, { warnOnIncrease: true }));

/**
 * Best Practices for Trend Analysis in Testing:
 *
 * 1. Collect consistent metrics over time
 * 2. Use appropriate time periods for analysis
 * 3. Account for seasonality and cycles
 * 4. Set meaningful alert thresholds
 * 5. Visualize trends for easy interpretation
 * 6. Combine multiple metrics for insights
 * 7. Act on significant trend changes
 * 8. Document and track root causes
 * 9. Use forecasting for capacity planning
 * 10. Regular review and adjustment
 */
