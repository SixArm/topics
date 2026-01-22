/**
 * Correlation - Measuring Statistical Relationships
 *
 * Correlation is a statistical measure indicating the degree to which two or
 * more variables are related or move together. It quantifies the strength and
 * direction of relationships between variables, ranging from -1 (perfect
 * negative correlation) to 1 (perfect positive correlation).
 *
 * Key Concepts:
 * - Pearson correlation coefficient
 * - Spearman rank correlation
 * - Correlation vs causation
 * - Scatter plots
 * - Correlation matrices
 */

// Example 1: Correlation Calculator
class CorrelationCalculator {
  /**
   * Calculate Pearson correlation coefficient
   * Measures linear relationship between two variables
   * @param {Array} x - First variable values
   * @param {Array} y - Second variable values
   * @returns {object} - Correlation result
   */
  static pearson(x, y) {
    if (x.length !== y.length || x.length < 2) {
      throw new Error('Arrays must have equal length and at least 2 elements');
    }

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
    const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
    const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
    );

    if (denominator === 0) {
      return { coefficient: 0, strength: 'none', direction: 'none' };
    }

    const r = numerator / denominator;

    return {
      coefficient: r,
      coefficientFormatted: r.toFixed(4),
      strength: this.interpretStrength(r),
      direction: r > 0 ? 'positive' : r < 0 ? 'negative' : 'none',
      rSquared: r * r,
      rSquaredFormatted: (r * r).toFixed(4),
      interpretation: this.getInterpretation(r)
    };
  }

  /**
   * Calculate Spearman rank correlation
   * Measures monotonic relationship (works with non-linear relationships)
   * @param {Array} x - First variable values
   * @param {Array} y - Second variable values
   * @returns {object}
   */
  static spearman(x, y) {
    if (x.length !== y.length || x.length < 2) {
      throw new Error('Arrays must have equal length and at least 2 elements');
    }

    // Convert to ranks
    const rankX = this.toRanks(x);
    const rankY = this.toRanks(y);

    // Calculate Pearson on ranks
    return {
      ...this.pearson(rankX, rankY),
      type: 'spearman'
    };
  }

  /**
   * Convert values to ranks
   * @param {Array} values - Values to rank
   * @returns {Array} - Ranks
   */
  static toRanks(values) {
    const sorted = values
      .map((v, i) => ({ value: v, index: i }))
      .sort((a, b) => a.value - b.value);

    const ranks = new Array(values.length);
    for (let i = 0; i < sorted.length; i++) {
      ranks[sorted[i].index] = i + 1;
    }

    return ranks;
  }

  /**
   * Interpret correlation strength
   * @param {number} r - Correlation coefficient
   * @returns {string}
   */
  static interpretStrength(r) {
    const absR = Math.abs(r);
    if (absR >= 0.9) return 'very strong';
    if (absR >= 0.7) return 'strong';
    if (absR >= 0.5) return 'moderate';
    if (absR >= 0.3) return 'weak';
    if (absR >= 0.1) return 'very weak';
    return 'negligible';
  }

  /**
   * Get human-readable interpretation
   * @param {number} r - Correlation coefficient
   * @returns {string}
   */
  static getInterpretation(r) {
    const strength = this.interpretStrength(r);
    const direction = r > 0 ? 'positive' : r < 0 ? 'negative' : 'no';

    if (Math.abs(r) < 0.1) {
      return 'There is no meaningful linear relationship between the variables.';
    }

    const movement = r > 0
      ? 'as one increases, the other tends to increase'
      : 'as one increases, the other tends to decrease';

    return `There is a ${strength} ${direction} correlation: ${movement}.`;
  }

  /**
   * Calculate correlation matrix for multiple variables
   * @param {object} data - Object with variable names as keys and arrays as values
   * @returns {object}
   */
  static correlationMatrix(data) {
    const variables = Object.keys(data);
    const matrix = {};

    for (const var1 of variables) {
      matrix[var1] = {};
      for (const var2 of variables) {
        if (var1 === var2) {
          matrix[var1][var2] = 1.0;
        } else {
          const corr = this.pearson(data[var1], data[var2]);
          matrix[var1][var2] = parseFloat(corr.coefficient.toFixed(4));
        }
      }
    }

    return {
      variables,
      matrix,
      strongest: this.findStrongestCorrelation(matrix, variables)
    };
  }

  /**
   * Find strongest correlation in matrix
   * @param {object} matrix - Correlation matrix
   * @param {Array} variables - Variable names
   * @returns {object}
   */
  static findStrongestCorrelation(matrix, variables) {
    let strongest = { var1: '', var2: '', correlation: 0 };

    for (let i = 0; i < variables.length; i++) {
      for (let j = i + 1; j < variables.length; j++) {
        const corr = Math.abs(matrix[variables[i]][variables[j]]);
        if (corr > Math.abs(strongest.correlation)) {
          strongest = {
            var1: variables[i],
            var2: variables[j],
            correlation: matrix[variables[i]][variables[j]]
          };
        }
      }
    }

    return strongest;
  }
}

// Example 2: Correlation Analyzer for Testing Metrics
class TestingMetricsCorrelator {
  constructor() {
    this.data = [];
  }

  /**
   * Add data point from a test run
   * @param {object} metrics - Test run metrics
   */
  addDataPoint(metrics) {
    this.data.push({
      timestamp: new Date(),
      testCoverage: metrics.testCoverage || 0,
      defectsFound: metrics.defectsFound || 0,
      buildTime: metrics.buildTime || 0,
      testCount: metrics.testCount || 0,
      passRate: metrics.passRate || 0,
      codeComplexity: metrics.codeComplexity || 0,
      linesOfCode: metrics.linesOfCode || 0
    });
  }

  /**
   * Analyze correlations between metrics
   * @returns {object}
   */
  analyzeCorrelations() {
    if (this.data.length < 3) {
      return { error: 'Need at least 3 data points for correlation analysis' };
    }

    const metrics = {
      testCoverage: this.data.map(d => d.testCoverage),
      defectsFound: this.data.map(d => d.defectsFound),
      buildTime: this.data.map(d => d.buildTime),
      testCount: this.data.map(d => d.testCount),
      passRate: this.data.map(d => d.passRate),
      codeComplexity: this.data.map(d => d.codeComplexity),
      linesOfCode: this.data.map(d => d.linesOfCode)
    };

    const matrix = CorrelationCalculator.correlationMatrix(metrics);

    // Find interesting correlations
    const interesting = this.findInterestingCorrelations(matrix);

    return {
      dataPoints: this.data.length,
      correlationMatrix: matrix.matrix,
      strongestCorrelation: matrix.strongest,
      interestingFindings: interesting,
      recommendations: this.generateRecommendations(interesting)
    };
  }

  /**
   * Find interesting correlations (strong positive or negative)
   * @param {object} matrix - Correlation matrix
   * @returns {Array}
   */
  findInterestingCorrelations(matrix) {
    const interesting = [];
    const variables = matrix.variables;

    for (let i = 0; i < variables.length; i++) {
      for (let j = i + 1; j < variables.length; j++) {
        const corr = matrix.matrix[variables[i]][variables[j]];
        if (Math.abs(corr) >= 0.5) {
          interesting.push({
            var1: variables[i],
            var2: variables[j],
            correlation: corr,
            strength: CorrelationCalculator.interpretStrength(corr),
            direction: corr > 0 ? 'positive' : 'negative'
          });
        }
      }
    }

    return interesting.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
  }

  /**
   * Generate recommendations based on correlations
   * @param {Array} correlations - Interesting correlations
   * @returns {Array}
   */
  generateRecommendations(correlations) {
    const recommendations = [];

    for (const corr of correlations) {
      if (corr.var1 === 'testCoverage' && corr.var2 === 'defectsFound' && corr.direction === 'negative') {
        recommendations.push({
          finding: 'Higher test coverage correlates with fewer defects',
          recommendation: 'Continue investing in test coverage',
          confidence: corr.strength
        });
      }

      if (corr.var1 === 'codeComplexity' && corr.var2 === 'defectsFound' && corr.direction === 'positive') {
        recommendations.push({
          finding: 'Higher code complexity correlates with more defects',
          recommendation: 'Focus on reducing code complexity through refactoring',
          confidence: corr.strength
        });
      }

      if (corr.var1 === 'testCount' && corr.var2 === 'buildTime' && corr.direction === 'positive') {
        recommendations.push({
          finding: 'More tests correlate with longer build times',
          recommendation: 'Consider parallelizing tests or optimizing test suite',
          confidence: corr.strength
        });
      }
    }

    return recommendations;
  }
}

// Example 3: Scatter Plot Data Generator
class ScatterPlotGenerator {
  /**
   * Generate scatter plot data for visualization
   * @param {Array} x - X values
   * @param {Array} y - Y values
   * @param {object} options - Plot options
   * @returns {object}
   */
  static generate(x, y, options = {}) {
    const points = x.map((xi, i) => ({ x: xi, y: y[i] }));
    const correlation = CorrelationCalculator.pearson(x, y);

    // Calculate regression line
    const regression = this.calculateRegression(x, y);

    return {
      points,
      correlation: correlation.coefficient,
      rSquared: correlation.rSquared,
      regression: {
        slope: regression.slope,
        intercept: regression.intercept,
        equation: `y = ${regression.slope.toFixed(4)}x + ${regression.intercept.toFixed(4)}`
      },
      bounds: {
        xMin: Math.min(...x),
        xMax: Math.max(...x),
        yMin: Math.min(...y),
        yMax: Math.max(...y)
      },
      regressionLine: this.generateRegressionPoints(x, regression)
    };
  }

  /**
   * Calculate linear regression
   * @param {Array} x - X values
   * @param {Array} y - Y values
   * @returns {object}
   */
  static calculateRegression(x, y) {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
    const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  }

  /**
   * Generate points for regression line
   * @param {Array} x - X values
   * @param {object} regression - Regression parameters
   * @returns {Array}
   */
  static generateRegressionPoints(x, regression) {
    const xMin = Math.min(...x);
    const xMax = Math.max(...x);

    return [
      { x: xMin, y: regression.slope * xMin + regression.intercept },
      { x: xMax, y: regression.slope * xMax + regression.intercept }
    ];
  }

  /**
   * Render ASCII scatter plot
   * @param {Array} x - X values
   * @param {Array} y - Y values
   * @param {number} width - Plot width
   * @param {number} height - Plot height
   * @returns {string}
   */
  static renderASCII(x, y, width = 40, height = 20) {
    const xMin = Math.min(...x);
    const xMax = Math.max(...x);
    const yMin = Math.min(...y);
    const yMax = Math.max(...y);

    const grid = Array(height).fill(null).map(() => Array(width).fill(' '));

    // Plot points
    for (let i = 0; i < x.length; i++) {
      const px = Math.floor((x[i] - xMin) / (xMax - xMin) * (width - 1));
      const py = Math.floor((1 - (y[i] - yMin) / (yMax - yMin)) * (height - 1));
      if (px >= 0 && px < width && py >= 0 && py < height) {
        grid[py][px] = '*';
      }
    }

    // Add axes
    let plot = '┌' + '─'.repeat(width) + '┐\n';
    for (let row = 0; row < height; row++) {
      plot += '│' + grid[row].join('') + '│\n';
    }
    plot += '└' + '─'.repeat(width) + '┘\n';

    return plot;
  }
}

// Example 4: Correlation Significance Tester
class CorrelationSignificanceTester {
  /**
   * Test if correlation is statistically significant
   * @param {number} r - Correlation coefficient
   * @param {number} n - Sample size
   * @param {number} alpha - Significance level (default 0.05)
   * @returns {object}
   */
  static test(r, n, alpha = 0.05) {
    if (n < 3) {
      return { error: 'Need at least 3 data points' };
    }

    // Calculate t-statistic
    const df = n - 2;
    const tStatistic = r * Math.sqrt(df / (1 - r * r));

    // Critical t-value (approximation for two-tailed test)
    const criticalT = this.getTCritical(df, alpha);

    const isSignificant = Math.abs(tStatistic) > criticalT;

    // Calculate p-value (approximation)
    const pValue = this.calculatePValue(tStatistic, df);

    return {
      correlationCoefficient: r,
      sampleSize: n,
      degreesOfFreedom: df,
      tStatistic: tStatistic.toFixed(4),
      criticalT: criticalT.toFixed(4),
      pValue: pValue.toFixed(4),
      alpha,
      isSignificant,
      conclusion: isSignificant
        ? `The correlation is statistically significant (p < ${alpha})`
        : `The correlation is not statistically significant (p >= ${alpha})`
    };
  }

  /**
   * Get critical t-value (simplified approximation)
   * @param {number} df - Degrees of freedom
   * @param {number} alpha - Significance level
   * @returns {number}
   */
  static getTCritical(df, alpha) {
    // Simplified lookup for common values
    const tTable = {
      // df: { 0.05, 0.01 }
      1: [12.706, 63.657],
      2: [4.303, 9.925],
      3: [3.182, 5.841],
      4: [2.776, 4.604],
      5: [2.571, 4.032],
      10: [2.228, 3.169],
      20: [2.086, 2.845],
      30: [2.042, 2.750],
      50: [2.009, 2.678],
      100: [1.984, 2.626]
    };

    const alphaIndex = alpha === 0.01 ? 1 : 0;

    // Find closest df
    const dfs = Object.keys(tTable).map(Number);
    const closestDf = dfs.reduce((prev, curr) =>
      Math.abs(curr - df) < Math.abs(prev - df) ? curr : prev
    );

    return tTable[closestDf][alphaIndex];
  }

  /**
   * Calculate p-value from t-statistic (approximation)
   * @param {number} t - T-statistic
   * @param {number} df - Degrees of freedom
   * @returns {number}
   */
  static calculatePValue(t, df) {
    // Simplified approximation using normal distribution for large df
    const x = df / (df + t * t);
    return Math.min(1, Math.max(0, x));
  }
}

// Demonstration
console.log('=== Correlation Analysis Examples ===\n');

// Basic correlation
console.log('--- Pearson Correlation ---\n');

const studyHours = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const testScores = [65, 70, 72, 78, 82, 85, 88, 91, 95];

const pearsonResult = CorrelationCalculator.pearson(studyHours, testScores);
console.log('Study Hours vs Test Scores:');
console.log(`  Correlation: ${pearsonResult.coefficientFormatted}`);
console.log(`  Strength: ${pearsonResult.strength}`);
console.log(`  R-squared: ${pearsonResult.rSquaredFormatted}`);
console.log(`  Interpretation: ${pearsonResult.interpretation}`);

// Testing metrics correlation
console.log('\n--- Testing Metrics Analysis ---\n');

const metricsCorrelator = new TestingMetricsCorrelator();

// Simulate test run data
for (let i = 0; i < 20; i++) {
  const coverage = 50 + Math.random() * 45;
  metricsCorrelator.addDataPoint({
    testCoverage: coverage,
    defectsFound: Math.max(0, 50 - coverage * 0.8 + (Math.random() - 0.5) * 20),
    buildTime: 60 + i * 2 + Math.random() * 10,
    testCount: 100 + i * 5,
    passRate: 85 + Math.random() * 15,
    codeComplexity: 10 + Math.random() * 5,
    linesOfCode: 10000 + i * 500
  });
}

const analysis = metricsCorrelator.analyzeCorrelations();
console.log(`Data points analyzed: ${analysis.dataPoints}`);
console.log(`\nStrongest correlation: ${analysis.strongestCorrelation.var1} <-> ${analysis.strongestCorrelation.var2}`);
console.log(`  Coefficient: ${analysis.strongestCorrelation.correlation.toFixed(4)}`);

if (analysis.interestingFindings.length > 0) {
  console.log('\nInteresting findings:');
  analysis.interestingFindings.slice(0, 3).forEach(f => {
    console.log(`  ${f.var1} <-> ${f.var2}: ${f.correlation.toFixed(3)} (${f.strength} ${f.direction})`);
  });
}

if (analysis.recommendations.length > 0) {
  console.log('\nRecommendations:');
  analysis.recommendations.forEach(r => {
    console.log(`  - ${r.recommendation}`);
  });
}

// Significance testing
console.log('\n--- Significance Testing ---\n');
const sigTest = CorrelationSignificanceTester.test(pearsonResult.coefficient, studyHours.length);
console.log(`T-statistic: ${sigTest.tStatistic}`);
console.log(`P-value: ${sigTest.pValue}`);
console.log(`Significant: ${sigTest.isSignificant}`);
console.log(`Conclusion: ${sigTest.conclusion}`);

// Scatter plot
console.log('\n--- ASCII Scatter Plot ---\n');
console.log('Study Hours (x) vs Test Scores (y):');
console.log(ScatterPlotGenerator.renderASCII(studyHours, testScores, 30, 15));

/**
 * Key Points About Correlation:
 *
 * 1. Correlation does NOT imply causation
 *
 * 2. Range: -1 (perfect negative) to +1 (perfect positive)
 *
 * 3. Only measures LINEAR relationships (use Spearman for non-linear)
 *
 * 4. Sensitive to outliers
 *
 * 5. Sample size affects significance
 *
 * Common Interpretation:
 * - |r| >= 0.7: Strong correlation
 * - 0.5 <= |r| < 0.7: Moderate correlation
 * - 0.3 <= |r| < 0.5: Weak correlation
 * - |r| < 0.3: Negligible correlation
 */
