/**
 * Defect Density - Measuring Software Quality
 *
 * Defect density is a metric that measures the number of defects identified
 * per unit of code, typically expressed as defects per thousand lines of code
 * (KLOC) or defects per function point. This quantitative measure helps assess
 * software quality and testing effectiveness.
 *
 * Key Concepts:
 * - Defects per KLOC
 * - Defects per function point
 * - Trend analysis
 * - Quality benchmarking
 * - Release readiness
 */

// Example 1: Defect Density Calculator
class DefectDensityCalculator {
  constructor() {
    this.modules = new Map();
    this.releases = [];
  }

  /**
   * Register a module for tracking
   * @param {object} module - Module information
   */
  registerModule(module) {
    this.modules.set(module.name, {
      name: module.name,
      linesOfCode: module.linesOfCode || 0,
      functionPoints: module.functionPoints || 0,
      defects: [],
      lastUpdated: new Date()
    });
  }

  /**
   * Record a defect for a module
   * @param {string} moduleName - Module name
   * @param {object} defect - Defect details
   */
  recordDefect(moduleName, defect) {
    const module = this.modules.get(moduleName);
    if (!module) return;

    module.defects.push({
      id: defect.id || `DEF-${Date.now()}`,
      severity: defect.severity || 'medium',
      type: defect.type || 'unknown',
      foundIn: defect.foundIn || 'testing',
      status: defect.status || 'open',
      foundDate: new Date(),
      fixedDate: null
    });
  }

  /**
   * Calculate defect density for a module
   * @param {string} moduleName - Module name
   * @returns {object}
   */
  calculateModuleDensity(moduleName) {
    const module = this.modules.get(moduleName);
    if (!module) return null;

    const totalDefects = module.defects.length;
    const kloc = module.linesOfCode / 1000;

    const densityPerKLOC = kloc > 0 ? totalDefects / kloc : 0;
    const densityPerFP = module.functionPoints > 0
      ? totalDefects / module.functionPoints
      : 0;

    // Calculate by severity
    const severityCounts = module.defects.reduce((acc, d) => {
      acc[d.severity] = (acc[d.severity] || 0) + 1;
      return acc;
    }, {});

    return {
      module: moduleName,
      totalDefects,
      linesOfCode: module.linesOfCode,
      functionPoints: module.functionPoints,
      density: {
        perKLOC: densityPerKLOC.toFixed(2),
        perFunctionPoint: densityPerFP.toFixed(4),
        interpretation: this.interpretDensity(densityPerKLOC)
      },
      bySeverity: {
        critical: severityCounts.critical || 0,
        high: severityCounts.high || 0,
        medium: severityCounts.medium || 0,
        low: severityCounts.low || 0
      },
      qualityRating: this.getQualityRating(densityPerKLOC)
    };
  }

  /**
   * Interpret defect density
   * @param {number} density - Defects per KLOC
   * @returns {string}
   */
  interpretDensity(density) {
    if (density < 1) return 'Excellent - very low defect density';
    if (density < 5) return 'Good - acceptable defect density';
    if (density < 10) return 'Average - moderate defect density';
    if (density < 20) return 'Poor - high defect density';
    return 'Critical - very high defect density';
  }

  /**
   * Get quality rating based on density
   * @param {number} density - Defects per KLOC
   * @returns {object}
   */
  getQualityRating(density) {
    if (density < 1) return { rating: 'A', score: 95 };
    if (density < 3) return { rating: 'B', score: 85 };
    if (density < 5) return { rating: 'C', score: 75 };
    if (density < 10) return { rating: 'D', score: 60 };
    return { rating: 'F', score: 40 };
  }

  /**
   * Calculate overall defect density
   * @returns {object}
   */
  calculateOverallDensity() {
    let totalDefects = 0;
    let totalLOC = 0;
    let totalFP = 0;
    const moduleDensities = [];

    for (const [name, module] of this.modules) {
      totalDefects += module.defects.length;
      totalLOC += module.linesOfCode;
      totalFP += module.functionPoints;

      const density = this.calculateModuleDensity(name);
      if (density) {
        moduleDensities.push(density);
      }
    }

    const kloc = totalLOC / 1000;
    const overallDensity = kloc > 0 ? totalDefects / kloc : 0;

    return {
      totalDefects,
      totalLinesOfCode: totalLOC,
      totalFunctionPoints: totalFP,
      overallDensity: {
        perKLOC: overallDensity.toFixed(2),
        perFP: totalFP > 0 ? (totalDefects / totalFP).toFixed(4) : 'N/A'
      },
      moduleCount: this.modules.size,
      highestDensityModule: this.findHighestDensityModule(moduleDensities),
      lowestDensityModule: this.findLowestDensityModule(moduleDensities),
      qualityRating: this.getQualityRating(overallDensity)
    };
  }

  /**
   * Find module with highest defect density
   * @param {Array} densities - Module density data
   * @returns {object}
   */
  findHighestDensityModule(densities) {
    if (densities.length === 0) return null;
    return densities.reduce((max, d) =>
      parseFloat(d.density.perKLOC) > parseFloat(max.density.perKLOC) ? d : max
    );
  }

  /**
   * Find module with lowest defect density
   * @param {Array} densities - Module density data
   * @returns {object}
   */
  findLowestDensityModule(densities) {
    if (densities.length === 0) return null;
    return densities.reduce((min, d) =>
      parseFloat(d.density.perKLOC) < parseFloat(min.density.perKLOC) ? d : min
    );
  }
}

// Example 2: Defect Density Trend Analyzer
class DefectDensityTrendAnalyzer {
  constructor() {
    this.history = [];
  }

  /**
   * Record a release density measurement
   * @param {object} measurement - Density measurement
   */
  recordMeasurement(measurement) {
    this.history.push({
      release: measurement.release,
      date: measurement.date || new Date(),
      density: measurement.density,
      linesOfCode: measurement.linesOfCode,
      defects: measurement.defects
    });
  }

  /**
   * Analyze trend over releases
   * @returns {object}
   */
  analyzeTrend() {
    if (this.history.length < 2) {
      return { trend: 'insufficient_data', message: 'Need at least 2 releases' };
    }

    const densities = this.history.map(h => h.density);
    const trend = this.calculateTrend(densities);
    const movingAverage = this.calculateMovingAverage(densities, 3);

    // Calculate improvement/regression
    const first = densities[0];
    const last = densities[densities.length - 1];
    const change = ((last - first) / first) * 100;

    return {
      releases: this.history.length,
      trend: {
        direction: trend.slope < -0.1 ? 'improving' : trend.slope > 0.1 ? 'degrading' : 'stable',
        slope: trend.slope.toFixed(4),
        interpretation: this.interpretTrend(trend.slope)
      },
      change: {
        firstRelease: first.toFixed(2),
        lastRelease: last.toFixed(2),
        percentChange: change.toFixed(1) + '%',
        improved: change < 0
      },
      movingAverage: movingAverage.map(m => m.toFixed(2)),
      forecast: this.forecastNextRelease(densities),
      recommendations: this.generateRecommendations(trend.slope, last)
    };
  }

  /**
   * Calculate linear trend
   * @param {Array} values - Density values
   * @returns {object}
   */
  calculateTrend(values) {
    const n = values.length;
    const xValues = values.map((_, i) => i);

    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((acc, x, i) => acc + x * values[i], 0);
    const sumX2 = xValues.reduce((acc, x) => acc + x * x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  }

  /**
   * Calculate moving average
   * @param {Array} values - Values
   * @param {number} window - Window size
   * @returns {Array}
   */
  calculateMovingAverage(values, window) {
    const result = [];
    for (let i = window - 1; i < values.length; i++) {
      const windowValues = values.slice(i - window + 1, i + 1);
      const avg = windowValues.reduce((a, b) => a + b, 0) / window;
      result.push(avg);
    }
    return result;
  }

  /**
   * Forecast next release density
   * @param {Array} values - Historical values
   * @returns {object}
   */
  forecastNextRelease(values) {
    const trend = this.calculateTrend(values);
    const nextValue = trend.slope * values.length + trend.intercept;

    return {
      predicted: Math.max(0, nextValue).toFixed(2),
      confidence: values.length >= 5 ? 'medium' : 'low',
      note: 'Based on linear trend projection'
    };
  }

  /**
   * Interpret trend direction
   * @param {number} slope - Trend slope
   * @returns {string}
   */
  interpretTrend(slope) {
    if (slope < -0.5) return 'Significantly improving - defect density decreasing';
    if (slope < -0.1) return 'Improving - slight decrease in defect density';
    if (slope < 0.1) return 'Stable - defect density relatively constant';
    if (slope < 0.5) return 'Degrading - slight increase in defect density';
    return 'Significantly degrading - defect density increasing rapidly';
  }

  /**
   * Generate recommendations
   * @param {number} slope - Trend slope
   * @param {number} currentDensity - Current density
   * @returns {Array}
   */
  generateRecommendations(slope, currentDensity) {
    const recommendations = [];

    if (slope > 0.1) {
      recommendations.push({
        priority: 'high',
        action: 'Investigate cause of increasing defect density',
        reason: 'Defect density trend is degrading'
      });
    }

    if (currentDensity > 10) {
      recommendations.push({
        priority: 'high',
        action: 'Increase code review coverage and testing',
        reason: 'Current defect density exceeds acceptable threshold'
      });
    }

    if (currentDensity > 5 && currentDensity <= 10) {
      recommendations.push({
        priority: 'medium',
        action: 'Review testing strategy for problem areas',
        reason: 'Defect density is moderate but could be improved'
      });
    }

    if (slope < -0.1 && currentDensity < 5) {
      recommendations.push({
        priority: 'low',
        action: 'Maintain current quality practices',
        reason: 'Quality is improving and within acceptable range'
      });
    }

    return recommendations;
  }
}

// Example 3: Defect Density Benchmarker
class DefectDensityBenchmarker {
  static industryBenchmarks = {
    safetySystem: { excellent: 0.5, good: 1, acceptable: 2, poor: 5 },
    enterprise: { excellent: 1, good: 3, acceptable: 6, poor: 10 },
    commercial: { excellent: 2, good: 5, acceptable: 10, poor: 20 },
    internalTool: { excellent: 5, good: 10, acceptable: 20, poor: 40 }
  };

  /**
   * Compare density against benchmarks
   * @param {number} density - Defects per KLOC
   * @param {string} category - System category
   * @returns {object}
   */
  static compare(density, category = 'commercial') {
    const benchmark = this.industryBenchmarks[category];
    if (!benchmark) {
      return { error: 'Unknown category' };
    }

    let rating;
    if (density <= benchmark.excellent) rating = 'excellent';
    else if (density <= benchmark.good) rating = 'good';
    else if (density <= benchmark.acceptable) rating = 'acceptable';
    else rating = 'poor';

    return {
      density,
      category,
      benchmark,
      rating,
      comparison: {
        vsExcellent: density <= benchmark.excellent ? 'MEETS' : `${((density / benchmark.excellent - 1) * 100).toFixed(0)}% above`,
        vsGood: density <= benchmark.good ? 'MEETS' : `${((density / benchmark.good - 1) * 100).toFixed(0)}% above`,
        vsAcceptable: density <= benchmark.acceptable ? 'MEETS' : `${((density / benchmark.acceptable - 1) * 100).toFixed(0)}% above`
      },
      recommendation: this.getRecommendation(rating, density, benchmark)
    };
  }

  /**
   * Get recommendation based on comparison
   * @param {string} rating - Current rating
   * @param {number} density - Current density
   * @param {object} benchmark - Benchmark values
   * @returns {string}
   */
  static getRecommendation(rating, density, benchmark) {
    switch (rating) {
      case 'excellent':
        return 'Quality exceeds industry standards. Maintain current practices.';
      case 'good':
        return `Good quality. Reduce by ${(density - benchmark.excellent).toFixed(1)} defects/KLOC to reach excellent.`;
      case 'acceptable':
        return `Quality is acceptable but improvement needed. Target: ${benchmark.good} defects/KLOC.`;
      case 'poor':
        return `Quality below standards. Immediate action required. Target: ${benchmark.acceptable} defects/KLOC.`;
      default:
        return 'Unable to provide recommendation.';
    }
  }
}

// Example 4: Release Readiness Evaluator
class ReleaseReadinessEvaluator {
  constructor(criteria = {}) {
    this.criteria = {
      maxDensity: criteria.maxDensity || 5,
      maxCritical: criteria.maxCritical || 0,
      maxHigh: criteria.maxHigh || 2,
      maxOpen: criteria.maxOpen || 5,
      minCoverage: criteria.minCoverage || 80
    };
  }

  /**
   * Evaluate if release is ready
   * @param {object} metrics - Release metrics
   * @returns {object}
   */
  evaluate(metrics) {
    const checks = [];

    // Defect density check
    checks.push({
      criterion: 'Defect Density',
      threshold: `<= ${this.criteria.maxDensity} per KLOC`,
      actual: metrics.defectDensity,
      passed: metrics.defectDensity <= this.criteria.maxDensity,
      blocking: true
    });

    // Critical defects check
    checks.push({
      criterion: 'Critical Defects',
      threshold: `<= ${this.criteria.maxCritical}`,
      actual: metrics.criticalDefects,
      passed: metrics.criticalDefects <= this.criteria.maxCritical,
      blocking: true
    });

    // High severity defects check
    checks.push({
      criterion: 'High Severity Defects',
      threshold: `<= ${this.criteria.maxHigh}`,
      actual: metrics.highDefects,
      passed: metrics.highDefects <= this.criteria.maxHigh,
      blocking: true
    });

    // Open defects check
    checks.push({
      criterion: 'Open Defects',
      threshold: `<= ${this.criteria.maxOpen}`,
      actual: metrics.openDefects,
      passed: metrics.openDefects <= this.criteria.maxOpen,
      blocking: false
    });

    // Test coverage check
    if (metrics.testCoverage !== undefined) {
      checks.push({
        criterion: 'Test Coverage',
        threshold: `>= ${this.criteria.minCoverage}%`,
        actual: metrics.testCoverage + '%',
        passed: metrics.testCoverage >= this.criteria.minCoverage,
        blocking: false
      });
    }

    const blockingFailed = checks.filter(c => c.blocking && !c.passed);
    const nonBlockingFailed = checks.filter(c => !c.blocking && !c.passed);

    return {
      ready: blockingFailed.length === 0,
      checks,
      summary: {
        totalChecks: checks.length,
        passed: checks.filter(c => c.passed).length,
        failed: checks.filter(c => !c.passed).length,
        blockingIssues: blockingFailed.length
      },
      blockers: blockingFailed.map(c => c.criterion),
      warnings: nonBlockingFailed.map(c => c.criterion),
      recommendation: blockingFailed.length > 0
        ? `DO NOT RELEASE: ${blockingFailed.length} blocking issue(s)`
        : nonBlockingFailed.length > 0
        ? `RELEASE WITH CAUTION: ${nonBlockingFailed.length} warning(s)`
        : 'READY FOR RELEASE: All criteria met'
    };
  }
}

// Demonstration
console.log('=== Defect Density Examples ===\n');

// Create calculator and register modules
const calculator = new DefectDensityCalculator();

calculator.registerModule({ name: 'auth-service', linesOfCode: 5000, functionPoints: 50 });
calculator.registerModule({ name: 'payment-service', linesOfCode: 8000, functionPoints: 75 });
calculator.registerModule({ name: 'user-service', linesOfCode: 3000, functionPoints: 30 });

// Record defects
const defects = [
  { module: 'auth-service', severity: 'critical', type: 'security' },
  { module: 'auth-service', severity: 'high', type: 'logic' },
  { module: 'auth-service', severity: 'medium', type: 'validation' },
  { module: 'payment-service', severity: 'critical', type: 'calculation' },
  { module: 'payment-service', severity: 'high', type: 'logic' },
  { module: 'payment-service', severity: 'high', type: 'integration' },
  { module: 'payment-service', severity: 'medium', type: 'ui' },
  { module: 'payment-service', severity: 'low', type: 'typo' },
  { module: 'user-service', severity: 'medium', type: 'validation' }
];

defects.forEach(d => calculator.recordDefect(d.module, d));

console.log('--- Module Defect Density ---\n');
for (const moduleName of ['auth-service', 'payment-service', 'user-service']) {
  const density = calculator.calculateModuleDensity(moduleName);
  console.log(`${moduleName}:`);
  console.log(`  Defects: ${density.totalDefects}`);
  console.log(`  Lines: ${density.linesOfCode}`);
  console.log(`  Density: ${density.density.perKLOC} per KLOC`);
  console.log(`  Rating: ${density.qualityRating.rating}\n`);
}

console.log('--- Overall Density ---\n');
const overall = calculator.calculateOverallDensity();
console.log(`Total defects: ${overall.totalDefects}`);
console.log(`Total LOC: ${overall.totalLinesOfCode}`);
console.log(`Overall density: ${overall.overallDensity.perKLOC} per KLOC`);
console.log(`Quality rating: ${overall.qualityRating.rating}`);

// Trend analysis
console.log('\n--- Trend Analysis ---\n');
const trendAnalyzer = new DefectDensityTrendAnalyzer();
[8.5, 7.2, 6.8, 5.5, 5.2, 4.8].forEach((density, i) => {
  trendAnalyzer.recordMeasurement({
    release: `v1.${i}`,
    density,
    linesOfCode: 50000 + i * 5000,
    defects: Math.round(density * (50 + i * 5))
  });
});

const trend = trendAnalyzer.analyzeTrend();
console.log(`Trend: ${trend.trend.direction}`);
console.log(`Change: ${trend.change.percentChange}`);
console.log(`Forecast: ${trend.forecast.predicted} per KLOC`);

// Benchmarking
console.log('\n--- Industry Benchmark Comparison ---\n');
const benchmark = DefectDensityBenchmarker.compare(4.8, 'enterprise');
console.log(`Category: ${benchmark.category}`);
console.log(`Rating: ${benchmark.rating}`);
console.log(`Recommendation: ${benchmark.recommendation}`);

// Release readiness
console.log('\n--- Release Readiness ---\n');
const evaluator = new ReleaseReadinessEvaluator();
const readiness = evaluator.evaluate({
  defectDensity: 4.8,
  criticalDefects: 0,
  highDefects: 1,
  openDefects: 3,
  testCoverage: 82
});

console.log(`Ready: ${readiness.ready}`);
console.log(`Recommendation: ${readiness.recommendation}`);

/**
 * Defect Density Best Practices:
 *
 * 1. Track density over time to identify trends
 *
 * 2. Compare against industry benchmarks
 *
 * 3. Use density as one metric, not the only metric
 *
 * 4. Consider defect severity, not just count
 *
 * 5. Normalize by KLOC or function points for fair comparison
 *
 * 6. Set release criteria based on density thresholds
 *
 * 7. Investigate modules with high density
 *
 * 8. Low density doesn't guarantee quality - could indicate poor testing
 */
