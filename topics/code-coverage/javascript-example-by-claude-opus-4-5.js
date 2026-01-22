/**
 * Code Coverage - Measuring Test Thoroughness
 *
 * Code coverage is a metric that measures the percentage of code executed
 * during automated test runs. It serves as a quantitative indicator of how
 * thoroughly your test suite exercises the codebase, helping identify
 * untested areas that may contain hidden defects.
 *
 * Key Concepts:
 * - Line coverage
 * - Branch coverage
 * - Function coverage
 * - Statement coverage
 * - Condition coverage
 * - Path coverage
 */

// Example 1: Code Coverage Tracker
class CodeCoverageTracker {
  constructor() {
    this.files = new Map();
    this.totalStats = {
      lines: { covered: 0, total: 0 },
      branches: { covered: 0, total: 0 },
      functions: { covered: 0, total: 0 },
      statements: { covered: 0, total: 0 }
    };
  }

  /**
   * Register a file for coverage tracking
   * @param {string} filePath - Path to the file
   * @param {object} metadata - File metadata
   */
  registerFile(filePath, metadata) {
    this.files.set(filePath, {
      path: filePath,
      lines: new Map(), // line number -> { covered: boolean, hitCount: 0 }
      branches: new Map(), // branch id -> { covered: boolean, trueTaken: 0, falseTaken: 0 }
      functions: new Map(), // function name -> { covered: boolean, callCount: 0 }
      statements: new Map(), // statement id -> { covered: boolean, execCount: 0 }
      totalLines: metadata.totalLines || 0,
      totalBranches: metadata.totalBranches || 0,
      totalFunctions: metadata.totalFunctions || 0,
      totalStatements: metadata.totalStatements || 0
    });
  }

  /**
   * Record a line execution
   * @param {string} filePath - File path
   * @param {number} lineNumber - Line number
   */
  recordLineHit(filePath, lineNumber) {
    const file = this.files.get(filePath);
    if (!file) return;

    if (!file.lines.has(lineNumber)) {
      file.lines.set(lineNumber, { covered: false, hitCount: 0 });
    }

    const line = file.lines.get(lineNumber);
    line.covered = true;
    line.hitCount++;
  }

  /**
   * Record a branch execution
   * @param {string} filePath - File path
   * @param {string} branchId - Branch identifier
   * @param {boolean} branchTaken - Which branch was taken
   */
  recordBranchHit(filePath, branchId, branchTaken) {
    const file = this.files.get(filePath);
    if (!file) return;

    if (!file.branches.has(branchId)) {
      file.branches.set(branchId, { covered: false, trueTaken: 0, falseTaken: 0 });
    }

    const branch = file.branches.get(branchId);
    if (branchTaken) {
      branch.trueTaken++;
    } else {
      branch.falseTaken++;
    }
    // Branch is fully covered only if both paths are taken
    branch.covered = branch.trueTaken > 0 && branch.falseTaken > 0;
  }

  /**
   * Record a function call
   * @param {string} filePath - File path
   * @param {string} functionName - Function name
   */
  recordFunctionCall(filePath, functionName) {
    const file = this.files.get(filePath);
    if (!file) return;

    if (!file.functions.has(functionName)) {
      file.functions.set(functionName, { covered: false, callCount: 0 });
    }

    const func = file.functions.get(functionName);
    func.covered = true;
    func.callCount++;
  }

  /**
   * Calculate coverage for a file
   * @param {string} filePath - File path
   * @returns {object}
   */
  getFileCoverage(filePath) {
    const file = this.files.get(filePath);
    if (!file) return null;

    const lineCovered = Array.from(file.lines.values()).filter(l => l.covered).length;
    const branchCovered = Array.from(file.branches.values()).filter(b => b.covered).length;
    const funcCovered = Array.from(file.functions.values()).filter(f => f.covered).length;

    return {
      path: filePath,
      lines: {
        covered: lineCovered,
        total: file.totalLines,
        percentage: file.totalLines > 0 ? ((lineCovered / file.totalLines) * 100).toFixed(2) + '%' : '0%'
      },
      branches: {
        covered: branchCovered,
        total: file.totalBranches,
        percentage: file.totalBranches > 0 ? ((branchCovered / file.totalBranches) * 100).toFixed(2) + '%' : '0%'
      },
      functions: {
        covered: funcCovered,
        total: file.totalFunctions,
        percentage: file.totalFunctions > 0 ? ((funcCovered / file.totalFunctions) * 100).toFixed(2) + '%' : '0%'
      },
      uncoveredLines: this.getUncoveredLines(file),
      hotspots: this.getHotspots(file)
    };
  }

  /**
   * Get uncovered lines
   * @param {object} file - File coverage data
   * @returns {Array}
   */
  getUncoveredLines(file) {
    const uncovered = [];
    for (let i = 1; i <= file.totalLines; i++) {
      if (!file.lines.has(i) || !file.lines.get(i).covered) {
        uncovered.push(i);
      }
    }
    return uncovered;
  }

  /**
   * Get code hotspots (frequently executed lines)
   * @param {object} file - File coverage data
   * @returns {Array}
   */
  getHotspots(file) {
    return Array.from(file.lines.entries())
      .filter(([_, data]) => data.hitCount > 10)
      .sort((a, b) => b[1].hitCount - a[1].hitCount)
      .slice(0, 5)
      .map(([line, data]) => ({ line, hitCount: data.hitCount }));
  }

  /**
   * Calculate overall coverage
   * @returns {object}
   */
  getOverallCoverage() {
    let totalLines = 0, coveredLines = 0;
    let totalBranches = 0, coveredBranches = 0;
    let totalFunctions = 0, coveredFunctions = 0;

    for (const file of this.files.values()) {
      totalLines += file.totalLines;
      coveredLines += Array.from(file.lines.values()).filter(l => l.covered).length;

      totalBranches += file.totalBranches;
      coveredBranches += Array.from(file.branches.values()).filter(b => b.covered).length;

      totalFunctions += file.totalFunctions;
      coveredFunctions += Array.from(file.functions.values()).filter(f => f.covered).length;
    }

    return {
      files: this.files.size,
      lines: {
        covered: coveredLines,
        total: totalLines,
        percentage: totalLines > 0 ? ((coveredLines / totalLines) * 100).toFixed(2) + '%' : '0%'
      },
      branches: {
        covered: coveredBranches,
        total: totalBranches,
        percentage: totalBranches > 0 ? ((coveredBranches / totalBranches) * 100).toFixed(2) + '%' : '0%'
      },
      functions: {
        covered: coveredFunctions,
        total: totalFunctions,
        percentage: totalFunctions > 0 ? ((coveredFunctions / totalFunctions) * 100).toFixed(2) + '%' : '0%'
      }
    };
  }
}

// Example 2: Coverage Threshold Validator
class CoverageThresholdValidator {
  constructor(thresholds = {}) {
    this.thresholds = {
      lines: thresholds.lines || 80,
      branches: thresholds.branches || 70,
      functions: thresholds.functions || 80,
      statements: thresholds.statements || 80
    };
    this.failures = [];
  }

  /**
   * Validate coverage against thresholds
   * @param {object} coverage - Coverage data
   * @returns {object}
   */
  validate(coverage) {
    this.failures = [];
    const results = {};

    for (const [metric, threshold] of Object.entries(this.thresholds)) {
      if (coverage[metric]) {
        const actual = parseFloat(coverage[metric].percentage);
        const passed = actual >= threshold;

        results[metric] = {
          threshold,
          actual: actual.toFixed(2),
          passed,
          gap: passed ? 0 : (threshold - actual).toFixed(2)
        };

        if (!passed) {
          this.failures.push({
            metric,
            threshold,
            actual,
            message: `${metric} coverage ${actual.toFixed(2)}% is below threshold of ${threshold}%`
          });
        }
      }
    }

    return {
      passed: this.failures.length === 0,
      results,
      failures: this.failures
    };
  }

  /**
   * Generate coverage badge
   * @param {number} percentage - Coverage percentage
   * @returns {object}
   */
  static generateBadge(percentage) {
    let color;
    if (percentage >= 80) color = 'brightgreen';
    else if (percentage >= 60) color = 'yellow';
    else if (percentage >= 40) color = 'orange';
    else color = 'red';

    return {
      percentage: percentage.toFixed(1),
      color,
      label: 'coverage',
      url: `https://img.shields.io/badge/coverage-${percentage.toFixed(1)}%25-${color}`
    };
  }
}

// Example 3: Coverage Report Generator
class CoverageReportGenerator {
  /**
   * Generate HTML coverage report
   * @param {object} coverage - Coverage data
   * @returns {string}
   */
  static generateHTML(coverage) {
    let html = `<!DOCTYPE html>
<html>
<head>
  <title>Code Coverage Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .summary { display: flex; gap: 20px; margin-bottom: 30px; }
    .metric { background: #f5f5f5; padding: 15px; border-radius: 8px; min-width: 150px; }
    .metric h3 { margin: 0 0 10px 0; color: #666; font-size: 14px; }
    .metric .value { font-size: 24px; font-weight: bold; }
    .good { color: #2e7d32; }
    .warning { color: #f9a825; }
    .danger { color: #c62828; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    .bar { height: 20px; background: #e0e0e0; border-radius: 4px; overflow: hidden; }
    .bar-fill { height: 100%; transition: width 0.3s; }
  </style>
</head>
<body>
  <h1>Code Coverage Report</h1>
  <div class="summary">
`;

    // Add summary metrics
    for (const [metric, data] of Object.entries(coverage)) {
      if (typeof data === 'object' && data.percentage) {
        const pct = parseFloat(data.percentage);
        const colorClass = pct >= 80 ? 'good' : pct >= 60 ? 'warning' : 'danger';
        const color = pct >= 80 ? '#2e7d32' : pct >= 60 ? '#f9a825' : '#c62828';

        html += `
    <div class="metric">
      <h3>${metric.toUpperCase()}</h3>
      <div class="value ${colorClass}">${data.percentage}</div>
      <div class="bar"><div class="bar-fill" style="width: ${pct}%; background: ${color}"></div></div>
      <div>${data.covered}/${data.total}</div>
    </div>`;
      }
    }

    html += `
  </div>
  <p>Generated: ${new Date().toISOString()}</p>
</body>
</html>`;

    return html;
  }

  /**
   * Generate LCOV format report
   * @param {Map} files - File coverage data
   * @returns {string}
   */
  static generateLCOV(files) {
    let lcov = '';

    for (const [filePath, file] of files) {
      lcov += `SF:${filePath}\n`;

      // Functions
      for (const [name, data] of file.functions) {
        lcov += `FN:1,${name}\n`;
        lcov += `FNDA:${data.callCount},${name}\n`;
      }
      lcov += `FNF:${file.totalFunctions}\n`;
      lcov += `FNH:${Array.from(file.functions.values()).filter(f => f.covered).length}\n`;

      // Lines
      for (const [lineNum, data] of file.lines) {
        lcov += `DA:${lineNum},${data.hitCount}\n`;
      }
      lcov += `LF:${file.totalLines}\n`;
      lcov += `LH:${Array.from(file.lines.values()).filter(l => l.covered).length}\n`;

      // Branches
      let branchIdx = 0;
      for (const [branchId, data] of file.branches) {
        lcov += `BRDA:1,${branchIdx},0,${data.trueTaken}\n`;
        lcov += `BRDA:1,${branchIdx},1,${data.falseTaken}\n`;
        branchIdx++;
      }
      lcov += `BRF:${file.totalBranches * 2}\n`;
      lcov += `BRH:${Array.from(file.branches.values()).filter(b => b.covered).length * 2}\n`;

      lcov += 'end_of_record\n';
    }

    return lcov;
  }

  /**
   * Generate coverage diff report
   * @param {object} before - Previous coverage
   * @param {object} after - Current coverage
   * @returns {object}
   */
  static generateDiff(before, after) {
    const diff = {};

    for (const metric of ['lines', 'branches', 'functions']) {
      if (before[metric] && after[metric]) {
        const beforePct = parseFloat(before[metric].percentage);
        const afterPct = parseFloat(after[metric].percentage);
        const change = afterPct - beforePct;

        diff[metric] = {
          before: beforePct.toFixed(2) + '%',
          after: afterPct.toFixed(2) + '%',
          change: (change >= 0 ? '+' : '') + change.toFixed(2) + '%',
          improved: change > 0,
          status: change > 0 ? 'improved' : change < 0 ? 'decreased' : 'unchanged'
        };
      }
    }

    return diff;
  }
}

// Example 4: Coverage Analysis Utilities
class CoverageAnalyzer {
  /**
   * Find files with lowest coverage
   * @param {Map} files - File coverage data
   * @param {number} limit - Number of files to return
   * @returns {Array}
   */
  static findLowestCoverage(files, limit = 10) {
    const fileStats = [];

    for (const [path, file] of files) {
      const covered = Array.from(file.lines.values()).filter(l => l.covered).length;
      const percentage = file.totalLines > 0 ? (covered / file.totalLines) * 100 : 0;

      fileStats.push({
        path,
        coverage: percentage.toFixed(2) + '%',
        coveredLines: covered,
        totalLines: file.totalLines,
        uncoveredCount: file.totalLines - covered
      });
    }

    return fileStats
      .sort((a, b) => parseFloat(a.coverage) - parseFloat(b.coverage))
      .slice(0, limit);
  }

  /**
   * Identify critical uncovered code
   * @param {Map} files - File coverage data
   * @returns {Array}
   */
  static findCriticalUncovered(files) {
    const critical = [];

    for (const [path, file] of files) {
      // Find uncovered functions (likely important)
      for (const [name, data] of file.functions) {
        if (!data.covered) {
          critical.push({
            type: 'function',
            file: path,
            name,
            risk: 'high',
            reason: 'Uncovered function - may contain untested logic'
          });
        }
      }

      // Find branches with only one path tested
      for (const [branchId, data] of file.branches) {
        if ((data.trueTaken > 0) !== (data.falseTaken > 0)) {
          critical.push({
            type: 'branch',
            file: path,
            id: branchId,
            risk: 'medium',
            reason: `Only ${data.trueTaken > 0 ? 'true' : 'false'} branch tested`
          });
        }
      }
    }

    return critical.sort((a, b) =>
      a.risk === 'high' ? -1 : b.risk === 'high' ? 1 : 0
    );
  }

  /**
   * Suggest tests to improve coverage
   * @param {object} fileCoverage - Single file coverage
   * @returns {Array}
   */
  static suggestTests(fileCoverage) {
    const suggestions = [];

    // Suggest tests for uncovered functions
    for (const [name, data] of fileCoverage.functions) {
      if (!data.covered) {
        suggestions.push({
          type: 'unit_test',
          target: `function ${name}`,
          reason: 'Function never called during tests',
          priority: 'high'
        });
      }
    }

    // Suggest tests for partial branch coverage
    for (const [branchId, data] of fileCoverage.branches) {
      if (!data.covered) {
        const missing = data.trueTaken === 0 ? 'true' : 'false';
        suggestions.push({
          type: 'branch_test',
          target: `branch ${branchId}`,
          reason: `${missing} branch never taken`,
          priority: 'medium'
        });
      }
    }

    return suggestions;
  }
}

// Demonstration
console.log('=== Code Coverage Examples ===\n');

// Create coverage tracker
const tracker = new CodeCoverageTracker();

// Register files
tracker.registerFile('src/calculator.js', {
  totalLines: 50,
  totalBranches: 10,
  totalFunctions: 5,
  totalStatements: 45
});

tracker.registerFile('src/validator.js', {
  totalLines: 30,
  totalBranches: 8,
  totalFunctions: 3,
  totalStatements: 28
});

// Simulate test execution
// Calculator file
for (let i = 1; i <= 40; i++) {
  tracker.recordLineHit('src/calculator.js', i);
}
tracker.recordFunctionCall('src/calculator.js', 'add');
tracker.recordFunctionCall('src/calculator.js', 'subtract');
tracker.recordFunctionCall('src/calculator.js', 'multiply');
tracker.recordBranchHit('src/calculator.js', 'B1', true);
tracker.recordBranchHit('src/calculator.js', 'B1', false);
tracker.recordBranchHit('src/calculator.js', 'B2', true);
// B2 false not hit

// Validator file
for (let i = 1; i <= 25; i++) {
  tracker.recordLineHit('src/validator.js', i);
}
tracker.recordFunctionCall('src/validator.js', 'validate');
tracker.recordBranchHit('src/validator.js', 'B1', true);

console.log('--- File Coverage ---\n');
const calcCoverage = tracker.getFileCoverage('src/calculator.js');
console.log('src/calculator.js:');
console.log(`  Lines: ${calcCoverage.lines.percentage} (${calcCoverage.lines.covered}/${calcCoverage.lines.total})`);
console.log(`  Branches: ${calcCoverage.branches.percentage}`);
console.log(`  Functions: ${calcCoverage.functions.percentage}`);

console.log('\n--- Overall Coverage ---\n');
const overall = tracker.getOverallCoverage();
console.log(`Files: ${overall.files}`);
console.log(`Lines: ${overall.lines.percentage}`);
console.log(`Branches: ${overall.branches.percentage}`);
console.log(`Functions: ${overall.functions.percentage}`);

// Validate against thresholds
console.log('\n--- Threshold Validation ---\n');
const validator = new CoverageThresholdValidator({
  lines: 80,
  branches: 70,
  functions: 80
});

const validation = validator.validate(overall);
console.log(`Passed: ${validation.passed}`);
if (!validation.passed) {
  console.log('Failures:');
  validation.failures.forEach(f => {
    console.log(`  - ${f.message}`);
  });
}

// Generate badge
const badge = CoverageThresholdValidator.generateBadge(parseFloat(overall.lines.percentage));
console.log(`\nBadge: ${badge.percentage}% (${badge.color})`);

// Find critical uncovered code
console.log('\n--- Critical Uncovered Code ---\n');
const critical = CoverageAnalyzer.findCriticalUncovered(tracker.files);
critical.slice(0, 3).forEach(c => {
  console.log(`  [${c.risk.toUpperCase()}] ${c.type} in ${c.file}: ${c.reason}`);
});

/**
 * Code Coverage Best Practices:
 *
 * 1. Set realistic thresholds (80% is common baseline)
 *
 * 2. Focus on branch coverage, not just line coverage
 *
 * 3. High coverage doesn't guarantee quality - test quality matters
 *
 * 4. Use coverage to find untested code, not as a goal
 *
 * 5. Track coverage trends over time
 *
 * 6. Integrate coverage into CI/CD pipelines
 *
 * 7. Don't game the metric with meaningless tests
 *
 * 8. Prioritize testing critical business logic
 *
 * 9. Review uncovered code for test opportunities
 *
 * 10. Combine with other quality metrics
 */
