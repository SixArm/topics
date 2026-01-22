/**
 * Anomaly Detection - Identifying Unusual Patterns in Data
 *
 * Anomaly detection (also known as outlier detection) is a technique used to
 * identify unusual or unexpected events, patterns, or behaviors in data.
 * It is widely used in fraud detection, cybersecurity, system monitoring,
 * and quality assurance to detect and prevent issues.
 *
 * Key Concepts:
 * - Statistical methods (mean, standard deviation, z-scores)
 * - Supervised vs unsupervised detection
 * - Machine learning algorithms (clustering, isolation forests)
 * - Time-series anomaly detection
 * - Threshold-based alerting
 */

// Example 1: Statistical Anomaly Detector
class StatisticalAnomalyDetector {
  constructor(options = {}) {
    this.threshold = options.threshold || 2; // Number of standard deviations
    this.windowSize = options.windowSize || 100;
    this.data = [];
    this.stats = {
      mean: 0,
      stdDev: 0,
      min: Infinity,
      max: -Infinity
    };
  }

  /**
   * Add a data point and check for anomaly
   * @param {number} value - Data point value
   * @returns {object} - Analysis result
   */
  addDataPoint(value) {
    this.data.push(value);

    // Keep window size manageable
    if (this.data.length > this.windowSize) {
      this.data.shift();
    }

    // Update statistics
    this.updateStatistics();

    // Check if value is anomalous
    const zScore = this.calculateZScore(value);
    const isAnomaly = Math.abs(zScore) > this.threshold;

    return {
      value,
      timestamp: new Date(),
      zScore: zScore.toFixed(4),
      isAnomaly,
      stats: { ...this.stats },
      anomalyType: this.classifyAnomaly(zScore)
    };
  }

  /**
   * Update running statistics
   */
  updateStatistics() {
    if (this.data.length === 0) return;

    // Calculate mean
    const sum = this.data.reduce((a, b) => a + b, 0);
    this.stats.mean = sum / this.data.length;

    // Calculate standard deviation
    const squaredDiffs = this.data.map(value => Math.pow(value - this.stats.mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / this.data.length;
    this.stats.stdDev = Math.sqrt(avgSquaredDiff);

    // Update min/max
    this.stats.min = Math.min(...this.data);
    this.stats.max = Math.max(...this.data);
  }

  /**
   * Calculate z-score for a value
   * @param {number} value - Value to score
   * @returns {number} - Z-score
   */
  calculateZScore(value) {
    if (this.stats.stdDev === 0) return 0;
    return (value - this.stats.mean) / this.stats.stdDev;
  }

  /**
   * Classify the type of anomaly
   * @param {number} zScore - Z-score of the value
   * @returns {string|null} - Anomaly type
   */
  classifyAnomaly(zScore) {
    if (Math.abs(zScore) <= this.threshold) return null;
    if (zScore > 0) return 'spike';
    return 'drop';
  }

  /**
   * Analyze a batch of data points
   * @param {Array} values - Array of values
   * @returns {object} - Batch analysis
   */
  analyzeBatch(values) {
    const results = values.map(v => this.addDataPoint(v));
    const anomalies = results.filter(r => r.isAnomaly);

    return {
      totalPoints: values.length,
      anomalyCount: anomalies.length,
      anomalyRate: ((anomalies.length / values.length) * 100).toFixed(2) + '%',
      anomalies: anomalies.map(a => ({
        value: a.value,
        zScore: a.zScore,
        type: a.anomalyType
      }))
    };
  }
}

// Example 2: Moving Average Anomaly Detector
class MovingAverageDetector {
  constructor(options = {}) {
    this.shortWindow = options.shortWindow || 5;
    this.longWindow = options.longWindow || 20;
    this.deviationThreshold = options.deviationThreshold || 0.2; // 20% deviation
    this.data = [];
  }

  /**
   * Calculate moving average
   * @param {Array} data - Data array
   * @param {number} window - Window size
   * @returns {number|null} - Moving average
   */
  calculateMA(data, window) {
    if (data.length < window) return null;
    const slice = data.slice(-window);
    return slice.reduce((a, b) => a + b, 0) / window;
  }

  /**
   * Add data point and detect anomaly
   * @param {number} value - Data point
   * @returns {object} - Detection result
   */
  detect(value) {
    this.data.push(value);

    const shortMA = this.calculateMA(this.data, this.shortWindow);
    const longMA = this.calculateMA(this.data, this.longWindow);

    if (shortMA === null || longMA === null) {
      return {
        value,
        isAnomaly: false,
        reason: 'Insufficient data for analysis'
      };
    }

    // Calculate deviation from long-term average
    const deviation = Math.abs(value - longMA) / longMA;
    const maDeviation = Math.abs(shortMA - longMA) / longMA;

    const isAnomaly = deviation > this.deviationThreshold ||
                      maDeviation > this.deviationThreshold;

    return {
      value,
      shortMA: shortMA.toFixed(2),
      longMA: longMA.toFixed(2),
      deviation: (deviation * 100).toFixed(2) + '%',
      maDeviation: (maDeviation * 100).toFixed(2) + '%',
      isAnomaly,
      trend: shortMA > longMA ? 'upward' : 'downward'
    };
  }
}

// Example 3: Isolation Forest (Simplified)
class IsolationForest {
  constructor(options = {}) {
    this.numTrees = options.numTrees || 100;
    this.sampleSize = options.sampleSize || 256;
    this.contamination = options.contamination || 0.1;
    this.trees = [];
    this.data = [];
  }

  /**
   * Build an isolation tree
   * @param {Array} data - Training data
   * @param {number} maxDepth - Maximum tree depth
   * @returns {object} - Tree node
   */
  buildTree(data, depth = 0, maxDepth = 10) {
    if (depth >= maxDepth || data.length <= 1) {
      return { type: 'leaf', size: data.length, depth };
    }

    // Random feature selection (for multi-dimensional data)
    const featureIndex = 0; // Simplified for 1D data

    // Random split point
    const min = Math.min(...data);
    const max = Math.max(...data);
    const splitValue = min + Math.random() * (max - min);

    const leftData = data.filter(v => v < splitValue);
    const rightData = data.filter(v => v >= splitValue);

    return {
      type: 'internal',
      splitValue,
      featureIndex,
      left: this.buildTree(leftData, depth + 1, maxDepth),
      right: this.buildTree(rightData, depth + 1, maxDepth)
    };
  }

  /**
   * Train the isolation forest
   * @param {Array} data - Training data
   */
  fit(data) {
    this.data = data;

    for (let i = 0; i < this.numTrees; i++) {
      // Sample data with replacement
      const sample = [];
      for (let j = 0; j < Math.min(this.sampleSize, data.length); j++) {
        const idx = Math.floor(Math.random() * data.length);
        sample.push(data[idx]);
      }

      const tree = this.buildTree(sample);
      this.trees.push(tree);
    }
  }

  /**
   * Calculate path length for a value in a tree
   * @param {number} value - Value to check
   * @param {object} node - Tree node
   * @param {number} depth - Current depth
   * @returns {number} - Path length
   */
  pathLength(value, node, depth = 0) {
    if (node.type === 'leaf') {
      // Adjustment for unsplit data
      const c = node.size > 1 ? 2 * (Math.log(node.size - 1) + 0.5772156649) - (2 * (node.size - 1) / node.size) : 0;
      return depth + c;
    }

    if (value < node.splitValue) {
      return this.pathLength(value, node.left, depth + 1);
    } else {
      return this.pathLength(value, node.right, depth + 1);
    }
  }

  /**
   * Calculate anomaly score for a value
   * @param {number} value - Value to score
   * @returns {number} - Anomaly score (0 to 1, higher = more anomalous)
   */
  score(value) {
    if (this.trees.length === 0) {
      throw new Error('Model not trained. Call fit() first.');
    }

    // Average path length across all trees
    const avgPathLength = this.trees.reduce((sum, tree) =>
      sum + this.pathLength(value, tree), 0
    ) / this.trees.length;

    // Expected path length for random data
    const n = this.data.length;
    const c = 2 * (Math.log(n - 1) + 0.5772156649) - (2 * (n - 1) / n);

    // Anomaly score
    return Math.pow(2, -avgPathLength / c);
  }

  /**
   * Predict if values are anomalies
   * @param {Array} values - Values to check
   * @returns {Array} - Prediction results
   */
  predict(values) {
    const scores = values.map(v => ({ value: v, score: this.score(v) }));

    // Sort by score to determine threshold
    const sortedScores = [...scores].sort((a, b) => b.score - a.score);
    const cutoffIndex = Math.floor(values.length * this.contamination);
    const threshold = cutoffIndex > 0 ? sortedScores[cutoffIndex - 1].score : 0.5;

    return scores.map(s => ({
      ...s,
      isAnomaly: s.score >= threshold,
      score: s.score.toFixed(4)
    }));
  }
}

// Example 4: Time Series Anomaly Detector
class TimeSeriesAnomalyDetector {
  constructor(options = {}) {
    this.seasonalPeriod = options.seasonalPeriod || 24; // e.g., 24 hours
    this.sensitivityFactor = options.sensitivityFactor || 1.5;
    this.history = [];
    this.seasonalBaseline = [];
  }

  /**
   * Add historical data point
   * @param {number} value - Data value
   * @param {number} timestamp - Time index (e.g., hour of day)
   */
  addHistorical(value, timestamp) {
    const period = timestamp % this.seasonalPeriod;
    this.history.push({ value, period, timestamp });

    // Update seasonal baseline
    this.updateBaseline();
  }

  /**
   * Update seasonal baseline from history
   */
  updateBaseline() {
    this.seasonalBaseline = [];

    for (let i = 0; i < this.seasonalPeriod; i++) {
      const periodData = this.history.filter(h => h.period === i);
      if (periodData.length > 0) {
        const values = periodData.map(d => d.value);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const stdDev = Math.sqrt(
          values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length
        );

        this.seasonalBaseline[i] = { mean, stdDev };
      }
    }
  }

  /**
   * Detect anomaly in new data point
   * @param {number} value - New value
   * @param {number} timestamp - Time index
   * @returns {object} - Detection result
   */
  detect(value, timestamp) {
    const period = timestamp % this.seasonalPeriod;
    const baseline = this.seasonalBaseline[period];

    if (!baseline) {
      return {
        value,
        timestamp,
        isAnomaly: false,
        reason: 'No baseline for this period'
      };
    }

    const deviation = Math.abs(value - baseline.mean);
    const threshold = baseline.stdDev * this.sensitivityFactor;
    const isAnomaly = deviation > threshold;

    return {
      value,
      timestamp,
      period,
      expectedValue: baseline.mean.toFixed(2),
      deviation: deviation.toFixed(2),
      threshold: threshold.toFixed(2),
      isAnomaly,
      anomalyType: isAnomaly ? (value > baseline.mean ? 'high' : 'low') : null,
      confidence: isAnomaly ? Math.min(1, deviation / (threshold * 2)).toFixed(2) : null
    };
  }
}

// Example 5: Anomaly Alert System
class AnomalyAlertSystem {
  constructor() {
    this.alerts = [];
    this.subscribers = [];
    this.alertThresholds = {
      critical: 3,  // 3+ std devs
      warning: 2,   // 2-3 std devs
      info: 1.5     // 1.5-2 std devs
    };
  }

  /**
   * Subscribe to alerts
   * @param {Function} callback - Alert callback
   */
  subscribe(callback) {
    this.subscribers.push(callback);
  }

  /**
   * Process an anomaly and generate alert
   * @param {object} anomaly - Anomaly data
   */
  processAnomaly(anomaly) {
    const severity = this.determineSeverity(Math.abs(parseFloat(anomaly.zScore)));

    const alert = {
      id: `ALERT-${Date.now()}`,
      timestamp: new Date(),
      severity,
      value: anomaly.value,
      zScore: anomaly.zScore,
      type: anomaly.anomalyType,
      message: this.generateMessage(anomaly, severity),
      acknowledged: false
    };

    this.alerts.push(alert);
    this.notifySubscribers(alert);

    return alert;
  }

  /**
   * Determine alert severity
   * @param {number} absZScore - Absolute z-score
   * @returns {string} - Severity level
   */
  determineSeverity(absZScore) {
    if (absZScore >= this.alertThresholds.critical) return 'critical';
    if (absZScore >= this.alertThresholds.warning) return 'warning';
    return 'info';
  }

  /**
   * Generate alert message
   * @param {object} anomaly - Anomaly data
   * @param {string} severity - Severity level
   * @returns {string}
   */
  generateMessage(anomaly, severity) {
    const direction = anomaly.anomalyType === 'spike' ? 'above' : 'below';
    return `${severity.toUpperCase()}: Detected ${anomaly.anomalyType} - value ${anomaly.value} is ${anomaly.zScore} standard deviations ${direction} normal`;
  }

  /**
   * Notify all subscribers
   * @param {object} alert - Alert to send
   */
  notifySubscribers(alert) {
    this.subscribers.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Alert notification failed:', error.message);
      }
    });
  }

  /**
   * Acknowledge an alert
   * @param {string} alertId - Alert ID
   */
  acknowledge(alertId) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      alert.acknowledgedAt = new Date();
    }
  }

  /**
   * Get alert summary
   * @returns {object}
   */
  getSummary() {
    const bySeverity = this.alerts.reduce((acc, alert) => {
      acc[alert.severity] = (acc[alert.severity] || 0) + 1;
      return acc;
    }, {});

    return {
      total: this.alerts.length,
      unacknowledged: this.alerts.filter(a => !a.acknowledged).length,
      bySeverity,
      recentAlerts: this.alerts.slice(-5)
    };
  }
}

// Demonstration
console.log('=== Anomaly Detection Examples ===\n');

// Statistical anomaly detection
console.log('--- Statistical Anomaly Detection ---\n');

const statisticalDetector = new StatisticalAnomalyDetector({ threshold: 2 });

// Generate normal data with some anomalies
const normalData = Array.from({ length: 50 }, () => 100 + (Math.random() - 0.5) * 20);
const dataWithAnomalies = [
  ...normalData.slice(0, 20),
  150, // Anomaly - spike
  ...normalData.slice(20, 40),
  60,  // Anomaly - drop
  ...normalData.slice(40)
];

const batchResults = statisticalDetector.analyzeBatch(dataWithAnomalies);
console.log('Batch Analysis Results:');
console.log(`  Total Points: ${batchResults.totalPoints}`);
console.log(`  Anomalies Found: ${batchResults.anomalyCount}`);
console.log(`  Anomaly Rate: ${batchResults.anomalyRate}`);
console.log('  Anomalies:', batchResults.anomalies);

// Moving average detection
console.log('\n--- Moving Average Anomaly Detection ---\n');

const maDetector = new MovingAverageDetector({
  shortWindow: 3,
  longWindow: 10,
  deviationThreshold: 0.15
});

const maData = [100, 102, 98, 101, 99, 103, 97, 100, 150, 102, 98, 101];
console.log('Moving Average Analysis:');
maData.forEach((value, i) => {
  const result = maDetector.detect(value);
  if (result.isAnomaly) {
    console.log(`  Point ${i}: ${value} - ANOMALY (${result.deviation} deviation)`);
  }
});

// Time series detection
console.log('\n--- Time Series Anomaly Detection ---\n');

const tsDetector = new TimeSeriesAnomalyDetector({
  seasonalPeriod: 24,
  sensitivityFactor: 2
});

// Add historical data (simulating hourly traffic)
for (let day = 0; day < 7; day++) {
  for (let hour = 0; hour < 24; hour++) {
    // Simulate typical daily pattern
    let baseValue = 50;
    if (hour >= 9 && hour <= 17) baseValue = 100; // Business hours
    if (hour >= 12 && hour <= 13) baseValue = 120; // Lunch peak
    const value = baseValue + (Math.random() - 0.5) * 20;
    tsDetector.addHistorical(value, day * 24 + hour);
  }
}

// Test new values
const testValues = [
  { value: 100, hour: 10 },  // Normal
  { value: 200, hour: 10 },  // Anomaly - too high
  { value: 50, hour: 3 },    // Normal for night
  { value: 150, hour: 3 }    // Anomaly - too high for night
];

console.log('Time Series Analysis:');
testValues.forEach(test => {
  const result = tsDetector.detect(test.value, test.hour);
  const status = result.isAnomaly ? 'ANOMALY' : 'NORMAL';
  console.log(`  Hour ${test.hour}, Value ${test.value}: ${status}`);
  if (result.isAnomaly) {
    console.log(`    Expected: ~${result.expectedValue}, Type: ${result.anomalyType}`);
  }
});

// Alert system
console.log('\n--- Anomaly Alert System ---\n');

const alertSystem = new AnomalyAlertSystem();

alertSystem.subscribe(alert => {
  console.log(`[${alert.severity.toUpperCase()}] ${alert.message}`);
});

// Process some anomalies
alertSystem.processAnomaly({ value: 150, zScore: '2.5', anomalyType: 'spike' });
alertSystem.processAnomaly({ value: 200, zScore: '3.5', anomalyType: 'spike' });

console.log('\nAlert Summary:');
console.log(JSON.stringify(alertSystem.getSummary(), null, 2));

/**
 * Anomaly Detection Best Practices:
 *
 * 1. Choose Appropriate Method: Statistical for simple data, ML for complex patterns
 *
 * 2. Establish Baselines: Collect sufficient normal data before detection
 *
 * 3. Account for Seasonality: Consider daily, weekly, monthly patterns
 *
 * 4. Tune Thresholds: Balance between false positives and missed anomalies
 *
 * 5. Validate Results: Use human analysis to verify automated detections
 *
 * 6. Handle Edge Cases: New systems, holidays, planned events
 *
 * 7. Monitor Detector Performance: Track false positive/negative rates
 *
 * 8. Contextual Analysis: Consider external factors that may explain anomalies
 *
 * 9. Gradual Adaptation: Allow baselines to evolve with legitimate changes
 *
 * 10. Alert Fatigue: Aggregate similar anomalies to prevent notification overload
 */
