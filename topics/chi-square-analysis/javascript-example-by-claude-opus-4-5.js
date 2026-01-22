/**
 * Chi-Square Analysis - Statistical Testing for Categorical Data
 *
 * Chi-square analysis is a statistical method used to determine whether there
 * is a significant association between two categorical variables. It compares
 * observed frequencies to expected frequencies to assess if differences are
 * due to chance or represent a real relationship.
 *
 * Key Concepts:
 * - Contingency tables
 * - Observed vs expected frequencies
 * - Chi-square statistic
 * - Degrees of freedom
 * - P-value interpretation
 */

// Example 1: Chi-Square Test Calculator
class ChiSquareCalculator {
  /**
   * Perform chi-square test of independence
   * @param {Array<Array<number>>} observed - 2D array of observed frequencies
   * @returns {object} - Test results
   */
  static testOfIndependence(observed) {
    const rows = observed.length;
    const cols = observed[0].length;

    // Calculate row and column totals
    const rowTotals = observed.map(row => row.reduce((a, b) => a + b, 0));
    const colTotals = Array(cols).fill(0);
    for (let j = 0; j < cols; j++) {
      for (let i = 0; i < rows; i++) {
        colTotals[j] += observed[i][j];
      }
    }
    const grandTotal = rowTotals.reduce((a, b) => a + b, 0);

    // Calculate expected frequencies
    const expected = [];
    for (let i = 0; i < rows; i++) {
      expected[i] = [];
      for (let j = 0; j < cols; j++) {
        expected[i][j] = (rowTotals[i] * colTotals[j]) / grandTotal;
      }
    }

    // Calculate chi-square statistic
    let chiSquare = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const diff = observed[i][j] - expected[i][j];
        chiSquare += (diff * diff) / expected[i][j];
      }
    }

    // Degrees of freedom
    const df = (rows - 1) * (cols - 1);

    // Calculate p-value (approximation)
    const pValue = this.chiSquarePValue(chiSquare, df);

    // Effect size (Cramér's V)
    const minDim = Math.min(rows - 1, cols - 1);
    const cramersV = Math.sqrt(chiSquare / (grandTotal * minDim));

    return {
      chiSquare: chiSquare.toFixed(4),
      degreesOfFreedom: df,
      pValue: pValue.toFixed(4),
      significant: pValue < 0.05,
      effectSize: {
        cramersV: cramersV.toFixed(4),
        interpretation: this.interpretCramersV(cramersV)
      },
      observed,
      expected: expected.map(row => row.map(v => v.toFixed(2))),
      conclusion: pValue < 0.05
        ? 'There is a significant association between the variables (p < 0.05)'
        : 'No significant association found between the variables (p >= 0.05)'
    };
  }

  /**
   * Calculate chi-square p-value (approximation)
   * @param {number} chiSquare - Chi-square statistic
   * @param {number} df - Degrees of freedom
   * @returns {number}
   */
  static chiSquarePValue(chiSquare, df) {
    // Approximation using incomplete gamma function
    if (chiSquare <= 0) return 1;
    if (df <= 0) return 0;

    // Wilson-Hilferty approximation for large df
    if (df > 100) {
      const z = Math.pow(chiSquare / df, 1/3) - (1 - 2 / (9 * df));
      const denom = Math.sqrt(2 / (9 * df));
      return 1 - this.normalCDF(z / denom);
    }

    // Simple approximation for smaller df
    const k = df / 2;
    const x = chiSquare / 2;

    // Incomplete gamma approximation
    let sum = Math.exp(-x);
    let term = sum;
    for (let i = 1; i < k; i++) {
      term *= x / i;
      sum += term;
    }

    return 1 - sum;
  }

  /**
   * Normal cumulative distribution function
   * @param {number} z - Z-score
   * @returns {number}
   */
  static normalCDF(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  }

  /**
   * Interpret Cramér's V effect size
   * @param {number} v - Cramér's V value
   * @returns {string}
   */
  static interpretCramersV(v) {
    if (v < 0.1) return 'negligible';
    if (v < 0.2) return 'small';
    if (v < 0.4) return 'medium';
    if (v < 0.6) return 'large';
    return 'very large';
  }

  /**
   * Perform goodness of fit test
   * @param {Array<number>} observed - Observed frequencies
   * @param {Array<number>} expected - Expected frequencies
   * @returns {object}
   */
  static goodnessOfFit(observed, expected) {
    if (observed.length !== expected.length) {
      throw new Error('Arrays must have same length');
    }

    let chiSquare = 0;
    const contributions = [];

    for (let i = 0; i < observed.length; i++) {
      const diff = observed[i] - expected[i];
      const contribution = (diff * diff) / expected[i];
      chiSquare += contribution;
      contributions.push({
        category: i,
        observed: observed[i],
        expected: expected[i],
        contribution: contribution.toFixed(4)
      });
    }

    const df = observed.length - 1;
    const pValue = this.chiSquarePValue(chiSquare, df);

    return {
      chiSquare: chiSquare.toFixed(4),
      degreesOfFreedom: df,
      pValue: pValue.toFixed(4),
      significant: pValue < 0.05,
      contributions,
      conclusion: pValue < 0.05
        ? 'Observed frequencies differ significantly from expected'
        : 'No significant difference from expected frequencies'
    };
  }
}

// Example 2: Contingency Table Builder
class ContingencyTableBuilder {
  constructor() {
    this.data = [];
    this.rowVariable = '';
    this.colVariable = '';
  }

  /**
   * Set variable names
   * @param {string} rowVar - Row variable name
   * @param {string} colVar - Column variable name
   */
  setVariables(rowVar, colVar) {
    this.rowVariable = rowVar;
    this.colVariable = colVar;
  }

  /**
   * Add a data point
   * @param {string} rowValue - Row category value
   * @param {string} colValue - Column category value
   */
  addDataPoint(rowValue, colValue) {
    this.data.push({ row: rowValue, col: colValue });
  }

  /**
   * Build the contingency table
   * @returns {object}
   */
  build() {
    // Get unique categories
    const rowCategories = [...new Set(this.data.map(d => d.row))].sort();
    const colCategories = [...new Set(this.data.map(d => d.col))].sort();

    // Build frequency table
    const table = rowCategories.map(row =>
      colCategories.map(col =>
        this.data.filter(d => d.row === row && d.col === col).length
      )
    );

    // Calculate totals
    const rowTotals = table.map(row => row.reduce((a, b) => a + b, 0));
    const colTotals = colCategories.map((_, j) =>
      table.reduce((sum, row) => sum + row[j], 0)
    );
    const grandTotal = rowTotals.reduce((a, b) => a + b, 0);

    return {
      rowVariable: this.rowVariable,
      colVariable: this.colVariable,
      rowCategories,
      colCategories,
      table,
      rowTotals,
      colTotals,
      grandTotal,
      percentages: this.calculatePercentages(table, grandTotal)
    };
  }

  /**
   * Calculate percentages
   * @param {Array<Array<number>>} table - Frequency table
   * @param {number} total - Grand total
   * @returns {object}
   */
  calculatePercentages(table, total) {
    return {
      ofTotal: table.map(row => row.map(v => ((v / total) * 100).toFixed(1) + '%')),
      ofRow: table.map(row => {
        const rowTotal = row.reduce((a, b) => a + b, 0);
        return row.map(v => rowTotal > 0 ? ((v / rowTotal) * 100).toFixed(1) + '%' : '0%');
      }),
      ofColumn: table.map((row, i) =>
        row.map((v, j) => {
          const colTotal = table.reduce((sum, r) => sum + r[j], 0);
          return colTotal > 0 ? ((v / colTotal) * 100).toFixed(1) + '%' : '0%';
        })
      )
    };
  }

  /**
   * Render table as string
   * @returns {string}
   */
  toString() {
    const { rowCategories, colCategories, table, rowTotals, colTotals, grandTotal } = this.build();

    let str = `\n${this.rowVariable} vs ${this.colVariable}\n`;
    str += '='.repeat(50) + '\n';

    // Header
    str += ''.padEnd(15);
    colCategories.forEach(col => str += col.padStart(10));
    str += 'Total'.padStart(10) + '\n';
    str += '-'.repeat(50) + '\n';

    // Data rows
    rowCategories.forEach((row, i) => {
      str += row.padEnd(15);
      table[i].forEach(v => str += v.toString().padStart(10));
      str += rowTotals[i].toString().padStart(10) + '\n';
    });

    // Footer
    str += '-'.repeat(50) + '\n';
    str += 'Total'.padEnd(15);
    colTotals.forEach(v => str += v.toString().padStart(10));
    str += grandTotal.toString().padStart(10) + '\n';

    return str;
  }
}

// Example 3: A/B Test Chi-Square Analyzer
class ABTestChiSquareAnalyzer {
  /**
   * Analyze A/B test results using chi-square
   * @param {object} groupA - Group A results {conversions, total}
   * @param {object} groupB - Group B results {conversions, total}
   * @returns {object}
   */
  static analyze(groupA, groupB) {
    // Build contingency table
    // Rows: Group (A, B)
    // Columns: Outcome (Converted, Not Converted)
    const observed = [
      [groupA.conversions, groupA.total - groupA.conversions],
      [groupB.conversions, groupB.total - groupB.conversions]
    ];

    const result = ChiSquareCalculator.testOfIndependence(observed);

    // Calculate conversion rates
    const rateA = groupA.conversions / groupA.total;
    const rateB = groupB.conversions / groupB.total;
    const difference = rateB - rateA;
    const relativeChange = (difference / rateA) * 100;

    return {
      groupA: {
        conversions: groupA.conversions,
        total: groupA.total,
        rate: (rateA * 100).toFixed(2) + '%'
      },
      groupB: {
        conversions: groupB.conversions,
        total: groupB.total,
        rate: (rateB * 100).toFixed(2) + '%'
      },
      comparison: {
        absoluteDifference: (difference * 100).toFixed(2) + '%',
        relativeChange: relativeChange.toFixed(2) + '%',
        winner: rateB > rateA ? 'B' : rateA > rateB ? 'A' : 'tie'
      },
      chiSquareTest: result,
      recommendation: this.getRecommendation(result.significant, relativeChange, groupA.total + groupB.total)
    };
  }

  /**
   * Get recommendation based on results
   * @param {boolean} significant - Is result significant
   * @param {number} relativeChange - Relative change percentage
   * @param {number} sampleSize - Total sample size
   * @returns {string}
   */
  static getRecommendation(significant, relativeChange, sampleSize) {
    if (!significant) {
      if (sampleSize < 1000) {
        return 'No significant difference detected. Consider increasing sample size.';
      }
      return 'No significant difference between groups. Either option is acceptable.';
    }

    if (Math.abs(relativeChange) < 5) {
      return 'Statistically significant but small practical difference. Consider if change is worth implementing.';
    }

    return relativeChange > 0
      ? 'Group B significantly outperforms Group A. Recommend implementing B.'
      : 'Group A significantly outperforms Group B. Recommend keeping A.';
  }
}

// Example 4: Defect Distribution Analyzer
class DefectDistributionAnalyzer {
  /**
   * Analyze if defect distribution matches expected pattern
   * @param {object} observed - Observed defects by category
   * @param {object} expected - Expected distribution (percentages)
   * @param {number} total - Total defects
   * @returns {object}
   */
  static analyzeDistribution(observed, expected, total) {
    const categories = Object.keys(observed);

    const observedArray = categories.map(c => observed[c]);
    const expectedArray = categories.map(c => (expected[c] / 100) * total);

    const result = ChiSquareCalculator.goodnessOfFit(observedArray, expectedArray);

    // Find categories with largest deviations
    const deviations = categories.map((cat, i) => ({
      category: cat,
      observed: observedArray[i],
      expected: expectedArray[i].toFixed(1),
      deviation: observedArray[i] - expectedArray[i],
      percentDeviation: ((observedArray[i] - expectedArray[i]) / expectedArray[i] * 100).toFixed(1) + '%'
    })).sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation));

    return {
      totalDefects: total,
      chiSquareResult: result,
      deviations,
      insights: this.generateInsights(deviations, result.significant)
    };
  }

  /**
   * Generate insights from analysis
   * @param {Array} deviations - Deviation data
   * @param {boolean} significant - Is distribution significantly different
   * @returns {Array}
   */
  static generateInsights(deviations, significant) {
    const insights = [];

    if (significant) {
      insights.push({
        type: 'warning',
        message: 'Defect distribution differs significantly from expected pattern'
      });
    }

    const overrepresented = deviations.filter(d => d.deviation > 0);
    const underrepresented = deviations.filter(d => d.deviation < 0);

    if (overrepresented.length > 0) {
      insights.push({
        type: 'observation',
        message: `Categories with more defects than expected: ${overrepresented.map(d => d.category).join(', ')}`
      });
    }

    if (underrepresented.length > 0) {
      insights.push({
        type: 'observation',
        message: `Categories with fewer defects than expected: ${underrepresented.map(d => d.category).join(', ')}`
      });
    }

    return insights;
  }
}

// Demonstration
console.log('=== Chi-Square Analysis Examples ===\n');

// Test of Independence
console.log('--- Test of Independence ---\n');
console.log('Testing if test automation correlates with defect discovery:\n');

const automationVsDefects = [
  [45, 15], // Automated: [Found defects, No defects]
  [25, 35]  // Manual: [Found defects, No defects]
];

const independenceResult = ChiSquareCalculator.testOfIndependence(automationVsDefects);
console.log(`Chi-Square: ${independenceResult.chiSquare}`);
console.log(`Degrees of Freedom: ${independenceResult.degreesOfFreedom}`);
console.log(`P-Value: ${independenceResult.pValue}`);
console.log(`Significant: ${independenceResult.significant}`);
console.log(`Effect Size (Cramér's V): ${independenceResult.effectSize.cramersV} (${independenceResult.effectSize.interpretation})`);
console.log(`Conclusion: ${independenceResult.conclusion}`);

// Contingency Table
console.log('\n--- Contingency Table ---');
const tableBuilder = new ContingencyTableBuilder();
tableBuilder.setVariables('Browser', 'Test Result');

// Simulate test results
['Chrome', 'Firefox', 'Safari', 'Edge'].forEach(browser => {
  const passRate = browser === 'Chrome' ? 0.95 : browser === 'Firefox' ? 0.92 : browser === 'Safari' ? 0.88 : 0.90;
  for (let i = 0; i < 100; i++) {
    tableBuilder.addDataPoint(browser, Math.random() < passRate ? 'Pass' : 'Fail');
  }
});

console.log(tableBuilder.toString());
const tableData = tableBuilder.build();
const browserTestResult = ChiSquareCalculator.testOfIndependence(tableData.table);
console.log(`\nChi-Square Test: p-value = ${browserTestResult.pValue}`);
console.log(`Conclusion: ${browserTestResult.conclusion}`);

// A/B Test Analysis
console.log('\n--- A/B Test Analysis ---\n');

const abResult = ABTestChiSquareAnalyzer.analyze(
  { conversions: 120, total: 1000 }, // Control
  { conversions: 150, total: 1000 }  // Treatment
);

console.log('A/B Test Results:');
console.log(`  Group A: ${abResult.groupA.rate} conversion rate`);
console.log(`  Group B: ${abResult.groupB.rate} conversion rate`);
console.log(`  Difference: ${abResult.comparison.absoluteDifference} (${abResult.comparison.relativeChange} relative)`);
console.log(`  Significant: ${abResult.chiSquareTest.significant}`);
console.log(`  Recommendation: ${abResult.recommendation}`);

// Goodness of Fit
console.log('\n--- Goodness of Fit Test ---\n');

const defectAnalysis = DefectDistributionAnalyzer.analyzeDistribution(
  { Critical: 5, High: 20, Medium: 45, Low: 30 },
  { Critical: 5, High: 15, Medium: 50, Low: 30 }, // Expected distribution
  100
);

console.log('Defect Distribution Analysis:');
console.log(`  Chi-Square: ${defectAnalysis.chiSquareResult.chiSquare}`);
console.log(`  Significant deviation: ${defectAnalysis.chiSquareResult.significant}`);
console.log('\n  Deviations from expected:');
defectAnalysis.deviations.forEach(d => {
  const sign = d.deviation > 0 ? '+' : '';
  console.log(`    ${d.category}: ${d.observed} (expected ${d.expected}) ${sign}${d.percentDeviation}`);
});

/**
 * Chi-Square Analysis Key Points:
 *
 * 1. Use for categorical data only, not continuous
 *
 * 2. Expected frequencies should be >= 5 for reliable results
 *
 * 3. Observations must be independent
 *
 * 4. Significant result means association exists, not causation
 *
 * 5. Effect size (Cramér's V) indicates strength of association
 *
 * Common Applications in Testing:
 * - A/B test analysis
 * - Defect distribution analysis
 * - Browser/platform compatibility testing
 * - Test result patterns across environments
 */
