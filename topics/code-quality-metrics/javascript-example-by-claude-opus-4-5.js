/**
 * Code Quality Metrics - Quantitative Measures of Code Health
 *
 * Code quality metrics provide quantitative measures to assess the health
 * and maintainability of codebases. These metrics enable data-driven decisions
 * about code improvements and identify potential problem areas.
 *
 * Key Concepts:
 * - Test Coverage: Percentage of code executed during testing
 * - Cyclomatic Complexity: Number of independent paths through code
 * - Technical Debt: Estimated effort to fix quality issues
 * - Defect Density: Bugs per lines of code or function points
 */

/**
 * CoverageMetrics tracks various types of test coverage.
 * Provides insights into how thoroughly tests exercise the codebase.
 */
class CoverageMetrics {
    constructor() {
        this.files = new Map();
        this.summary = {
            lines: { covered: 0, total: 0 },
            branches: { covered: 0, total: 0 },
            functions: { covered: 0, total: 0 },
            statements: { covered: 0, total: 0 }
        };
    }

    /**
     * Records coverage data for a file
     * @param {string} filePath - Path to the file
     * @param {Object} coverage - Coverage data
     */
    recordFileCoverage(filePath, coverage) {
        this.files.set(filePath, coverage);

        // Update summary totals
        Object.keys(this.summary).forEach(metric => {
            if (coverage[metric]) {
                this.summary[metric].covered += coverage[metric].covered;
                this.summary[metric].total += coverage[metric].total;
            }
        });
    }

    /**
     * Calculates coverage percentage for a metric
     * @param {string} metric - Metric type (lines, branches, etc.)
     * @returns {number} Coverage percentage
     */
    getPercentage(metric) {
        const data = this.summary[metric];
        if (!data || data.total === 0) return 0;
        return (data.covered / data.total) * 100;
    }

    /**
     * Gets overall coverage summary
     * @returns {Object} Coverage summary with percentages
     */
    getSummary() {
        return {
            lineCoverage: `${this.getPercentage('lines').toFixed(2)}%`,
            branchCoverage: `${this.getPercentage('branches').toFixed(2)}%`,
            functionCoverage: `${this.getPercentage('functions').toFixed(2)}%`,
            statementCoverage: `${this.getPercentage('statements').toFixed(2)}%`,
            filesAnalyzed: this.files.size
        };
    }

    /**
     * Identifies files with coverage below threshold
     * @param {number} threshold - Minimum coverage percentage
     * @returns {Array} Files below threshold
     */
    findLowCoverageFiles(threshold = 80) {
        const lowCoverage = [];

        this.files.forEach((coverage, filePath) => {
            const lineCoverage = (coverage.lines.covered / coverage.lines.total) * 100;
            if (lineCoverage < threshold) {
                lowCoverage.push({
                    file: filePath,
                    coverage: `${lineCoverage.toFixed(2)}%`,
                    uncoveredLines: coverage.lines.total - coverage.lines.covered
                });
            }
        });

        return lowCoverage.sort((a, b) => parseFloat(a.coverage) - parseFloat(b.coverage));
    }
}

/**
 * ComplexityAnalyzer calculates cyclomatic complexity for code.
 * Helps identify overly complex functions that may need refactoring.
 */
class ComplexityAnalyzer {
    constructor() {
        this.analyses = [];
        this.thresholds = {
            low: 10,      // Simple, low risk
            medium: 20,   // Moderate complexity
            high: 50      // High risk, needs attention
        };
    }

    /**
     * Analyzes complexity of a function (simplified calculation)
     * @param {string} functionName - Name of the function
     * @param {Object} metrics - Extracted metrics from code
     * @returns {Object} Complexity analysis
     */
    analyzeFunction(functionName, metrics) {
        // Simplified cyclomatic complexity calculation
        // Real implementation would parse AST
        const complexity = 1 +
            (metrics.ifStatements || 0) +
            (metrics.loops || 0) +
            (metrics.cases || 0) +
            (metrics.catches || 0) +
            (metrics.logicalOperators || 0);

        const analysis = {
            functionName,
            complexity,
            risk: this.getRiskLevel(complexity),
            recommendation: this.getRecommendation(complexity)
        };

        this.analyses.push(analysis);
        return analysis;
    }

    /**
     * Determines risk level based on complexity
     * @param {number} complexity - Cyclomatic complexity value
     * @returns {string} Risk level
     */
    getRiskLevel(complexity) {
        if (complexity <= this.thresholds.low) return 'low';
        if (complexity <= this.thresholds.medium) return 'medium';
        if (complexity <= this.thresholds.high) return 'high';
        return 'critical';
    }

    /**
     * Provides recommendation based on complexity
     * @param {number} complexity - Cyclomatic complexity value
     * @returns {string} Recommendation
     */
    getRecommendation(complexity) {
        if (complexity <= this.thresholds.low) {
            return 'Complexity is acceptable';
        }
        if (complexity <= this.thresholds.medium) {
            return 'Consider breaking into smaller functions';
        }
        if (complexity <= this.thresholds.high) {
            return 'Refactoring recommended - high maintenance risk';
        }
        return 'Critical - immediate refactoring required';
    }

    /**
     * Gets summary of all analyzed functions
     * @returns {Object} Analysis summary
     */
    getSummary() {
        const byRisk = {
            low: this.analyses.filter(a => a.risk === 'low').length,
            medium: this.analyses.filter(a => a.risk === 'medium').length,
            high: this.analyses.filter(a => a.risk === 'high').length,
            critical: this.analyses.filter(a => a.risk === 'critical').length
        };

        const avgComplexity = this.analyses.reduce((sum, a) => sum + a.complexity, 0)
            / this.analyses.length;

        return {
            totalFunctions: this.analyses.length,
            averageComplexity: avgComplexity.toFixed(2),
            byRiskLevel: byRisk,
            highRiskFunctions: this.analyses
                .filter(a => a.risk === 'high' || a.risk === 'critical')
                .map(a => ({ name: a.functionName, complexity: a.complexity }))
        };
    }
}

/**
 * TechnicalDebtTracker quantifies and tracks technical debt.
 * Helps prioritize refactoring efforts based on debt estimates.
 */
class TechnicalDebtTracker {
    constructor() {
        this.debtItems = [];
        this.categories = {
            design: { weight: 3, hourlyRate: 100 },
            code: { weight: 2, hourlyRate: 100 },
            testing: { weight: 1.5, hourlyRate: 100 },
            documentation: { weight: 1, hourlyRate: 100 }
        };
    }

    /**
     * Adds a technical debt item
     * @param {Object} item - Debt item details
     */
    addDebtItem(item) {
        const debtItem = {
            id: `TD-${this.debtItems.length + 1}`,
            description: item.description,
            category: item.category,
            file: item.file,
            estimatedHours: item.estimatedHours,
            severity: item.severity || 'medium',
            createdAt: new Date().toISOString()
        };

        // Calculate cost based on category weight
        const categoryConfig = this.categories[item.category] || this.categories.code;
        debtItem.estimatedCost = debtItem.estimatedHours *
            categoryConfig.hourlyRate * categoryConfig.weight;

        this.debtItems.push(debtItem);
        console.log(`Added debt item: ${debtItem.id} - $${debtItem.estimatedCost}`);
        return debtItem;
    }

    /**
     * Calculates total technical debt
     * @returns {Object} Total debt metrics
     */
    calculateTotalDebt() {
        const totalHours = this.debtItems.reduce((sum, item) => sum + item.estimatedHours, 0);
        const totalCost = this.debtItems.reduce((sum, item) => sum + item.estimatedCost, 0);

        const byCategory = {};
        Object.keys(this.categories).forEach(cat => {
            const items = this.debtItems.filter(i => i.category === cat);
            byCategory[cat] = {
                items: items.length,
                hours: items.reduce((sum, i) => sum + i.estimatedHours, 0),
                cost: items.reduce((sum, i) => sum + i.estimatedCost, 0)
            };
        });

        return {
            totalItems: this.debtItems.length,
            totalHours: totalHours.toFixed(1),
            totalCost: `$${totalCost.toFixed(2)}`,
            byCategory
        };
    }

    /**
     * Prioritizes debt items for remediation
     * @returns {Array} Prioritized debt items
     */
    prioritize() {
        const severityWeight = { critical: 4, high: 3, medium: 2, low: 1 };

        return [...this.debtItems].sort((a, b) => {
            const scoreA = severityWeight[a.severity] * a.estimatedCost;
            const scoreB = severityWeight[b.severity] * b.estimatedCost;
            return scoreB - scoreA;
        });
    }
}

/**
 * DefectDensityCalculator tracks bugs relative to code size.
 * Provides insights into code quality trends over time.
 */
class DefectDensityCalculator {
    constructor() {
        this.defects = [];
        this.codeMetrics = {};
    }

    /**
     * Records a defect
     * @param {Object} defect - Defect information
     */
    recordDefect(defect) {
        this.defects.push({
            id: defect.id,
            file: defect.file,
            severity: defect.severity,
            type: defect.type,
            foundDate: defect.foundDate || new Date().toISOString(),
            fixedDate: defect.fixedDate || null
        });
    }

    /**
     * Sets code size metrics
     * @param {Object} metrics - Lines of code, function points, etc.
     */
    setCodeMetrics(metrics) {
        this.codeMetrics = {
            totalLines: metrics.totalLines || 0,
            functionPoints: metrics.functionPoints || 0,
            modules: metrics.modules || 0
        };
    }

    /**
     * Calculates defect density
     * @returns {Object} Defect density metrics
     */
    calculateDensity() {
        const totalDefects = this.defects.length;

        return {
            defectsPerKLOC: this.codeMetrics.totalLines > 0
                ? ((totalDefects / this.codeMetrics.totalLines) * 1000).toFixed(2)
                : 'N/A',
            defectsPerFP: this.codeMetrics.functionPoints > 0
                ? (totalDefects / this.codeMetrics.functionPoints).toFixed(2)
                : 'N/A',
            defectsPerModule: this.codeMetrics.modules > 0
                ? (totalDefects / this.codeMetrics.modules).toFixed(2)
                : 'N/A',
            bySeverity: this.getDefectsBySeverity(),
            totalDefects
        };
    }

    /**
     * Groups defects by severity
     * @returns {Object} Defects grouped by severity
     */
    getDefectsBySeverity() {
        const grouped = { critical: 0, high: 0, medium: 0, low: 0 };
        this.defects.forEach(d => {
            if (grouped[d.severity] !== undefined) {
                grouped[d.severity]++;
            }
        });
        return grouped;
    }
}

/**
 * QualityGate enforces quality thresholds before deployment.
 * Blocks deployments when quality metrics fall below standards.
 */
class QualityGate {
    constructor(name) {
        this.name = name;
        this.thresholds = [];
        this.results = [];
    }

    /**
     * Adds a quality threshold
     * @param {string} metric - Metric name
     * @param {string} operator - Comparison operator
     * @param {number} value - Threshold value
     */
    addThreshold(metric, operator, value) {
        this.thresholds.push({ metric, operator, value });
    }

    /**
     * Evaluates metrics against thresholds
     * @param {Object} metrics - Current metric values
     * @returns {Object} Gate evaluation result
     */
    evaluate(metrics) {
        console.log(`\nEvaluating Quality Gate: ${this.name}`);

        this.results = this.thresholds.map(threshold => {
            const actual = metrics[threshold.metric];
            let passed;

            switch (threshold.operator) {
                case '>=': passed = actual >= threshold.value; break;
                case '>': passed = actual > threshold.value; break;
                case '<=': passed = actual <= threshold.value; break;
                case '<': passed = actual < threshold.value; break;
                case '==': passed = actual === threshold.value; break;
                default: passed = false;
            }

            console.log(`  ${passed ? '✓' : '✗'} ${threshold.metric}: ${actual} ${threshold.operator} ${threshold.value}`);

            return {
                metric: threshold.metric,
                expected: `${threshold.operator} ${threshold.value}`,
                actual,
                passed
            };
        });

        const allPassed = this.results.every(r => r.passed);
        console.log(`\nGate Status: ${allPassed ? 'PASSED' : 'FAILED'}`);

        return {
            gateName: this.name,
            passed: allPassed,
            results: this.results
        };
    }
}

// Demonstration
console.log('=== Code Quality Metrics Demo ===\n');

// Coverage Metrics
console.log('--- Coverage Metrics ---');
const coverage = new CoverageMetrics();

coverage.recordFileCoverage('src/api/users.js', {
    lines: { covered: 85, total: 100 },
    branches: { covered: 20, total: 30 },
    functions: { covered: 15, total: 18 },
    statements: { covered: 90, total: 105 }
});

coverage.recordFileCoverage('src/utils/helpers.js', {
    lines: { covered: 45, total: 80 },
    branches: { covered: 10, total: 20 },
    functions: { covered: 8, total: 12 },
    statements: { covered: 50, total: 85 }
});

console.log('Coverage Summary:', coverage.getSummary());
console.log('Low Coverage Files:', coverage.findLowCoverageFiles(80));

// Complexity Analysis
console.log('\n--- Complexity Analysis ---');
const complexity = new ComplexityAnalyzer();

complexity.analyzeFunction('processUserData', {
    ifStatements: 5,
    loops: 2,
    cases: 3,
    catches: 1,
    logicalOperators: 2
});

complexity.analyzeFunction('validateInput', {
    ifStatements: 15,
    loops: 3,
    cases: 8,
    catches: 2,
    logicalOperators: 10
});

console.log('Complexity Summary:', complexity.getSummary());

// Technical Debt
console.log('\n--- Technical Debt ---');
const debt = new TechnicalDebtTracker();

debt.addDebtItem({
    description: 'Refactor legacy authentication module',
    category: 'design',
    file: 'src/auth/legacy.js',
    estimatedHours: 40,
    severity: 'high'
});

debt.addDebtItem({
    description: 'Add unit tests for API handlers',
    category: 'testing',
    file: 'src/api/',
    estimatedHours: 20,
    severity: 'medium'
});

console.log('Total Debt:', debt.calculateTotalDebt());

// Quality Gate
console.log('\n--- Quality Gate ---');
const gate = new QualityGate('Production Deployment');
gate.addThreshold('lineCoverage', '>=', 80);
gate.addThreshold('branchCoverage', '>=', 70);
gate.addThreshold('cyclomaticComplexity', '<=', 15);
gate.addThreshold('criticalBugs', '==', 0);

gate.evaluate({
    lineCoverage: 75,
    branchCoverage: 72,
    cyclomaticComplexity: 12,
    criticalBugs: 0
});

/**
 * Best Practices for Code Quality Metrics:
 *
 * 1. Set realistic coverage thresholds (80% line coverage is a good target)
 * 2. Focus on branch coverage for critical business logic
 * 3. Track cyclomatic complexity to identify refactoring candidates
 * 4. Quantify technical debt to prioritize remediation
 * 5. Monitor defect density trends over time
 * 6. Automate quality gate checks in CI/CD pipelines
 * 7. Don't chase 100% coverage - focus on meaningful tests
 * 8. Review high-complexity functions in code reviews
 * 9. Allocate time for addressing technical debt each sprint
 * 10. Use metrics as guides, not absolute rules
 */
