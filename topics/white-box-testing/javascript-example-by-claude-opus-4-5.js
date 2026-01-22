/**
 * White-Box Testing - Testing with Internal Knowledge
 *
 * White-box testing is when testers have complete knowledge of the internal
 * structure, code, and implementation details of the application being tested.
 * It examines the internal workings of the software to ensure all code paths,
 * conditions, and loops function correctly.
 *
 * Key Concepts:
 * - Code coverage analysis
 * - Path testing
 * - Control flow testing
 * - Data flow testing
 */

/**
 * WhiteBoxTechnique defines white-box testing techniques.
 */
class WhiteBoxTechnique {
    static techniques = {
        statementCoverage: {
            name: 'Statement Coverage',
            description: 'Every statement executed at least once',
            formula: '(Executed Statements / Total Statements) × 100',
            strength: 'Basic coverage metric',
            weakness: 'Does not test all branches'
        },
        branchCoverage: {
            name: 'Branch Coverage',
            description: 'Every branch (decision outcome) taken',
            formula: '(Executed Branches / Total Branches) × 100',
            strength: 'Tests decision logic',
            weakness: 'Does not test all combinations'
        },
        pathCoverage: {
            name: 'Path Coverage',
            description: 'Every possible path through code',
            formula: '(Executed Paths / Total Paths) × 100',
            strength: 'Most thorough coverage',
            weakness: 'Can be impractical for complex code'
        },
        conditionCoverage: {
            name: 'Condition Coverage',
            description: 'Every boolean sub-expression evaluated true and false',
            formula: '(Evaluated Conditions / Total Conditions) × 100',
            strength: 'Tests individual conditions',
            weakness: 'May miss some branch combinations'
        },
        mcdc: {
            name: 'Modified Condition/Decision Coverage',
            description: 'Each condition independently affects decision',
            formula: 'Each condition shown to independently affect outcome',
            strength: 'Required for safety-critical systems',
            weakness: 'Complex to achieve'
        }
    };

    /**
     * Gets technique details
     * @param {string} name - Technique name
     * @returns {Object} Technique details
     */
    static getTechnique(name) {
        return this.techniques[name];
    }

    /**
     * Gets all techniques
     * @returns {Array} All techniques
     */
    static getAllTechniques() {
        return Object.entries(this.techniques).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * CodeCoverageAnalyzer simulates code coverage analysis.
 */
class CodeCoverageAnalyzer {
    constructor(codeStructure) {
        this.totalStatements = codeStructure.statements;
        this.totalBranches = codeStructure.branches;
        this.totalFunctions = codeStructure.functions;
        this.executedStatements = new Set();
        this.executedBranches = new Set();
        this.executedFunctions = new Set();
    }

    /**
     * Records statement execution
     * @param {number} statementId - Statement ID
     */
    executeStatement(statementId) {
        this.executedStatements.add(statementId);
    }

    /**
     * Records branch execution
     * @param {number} branchId - Branch ID
     */
    executeBranch(branchId) {
        this.executedBranches.add(branchId);
    }

    /**
     * Records function execution
     * @param {string} functionName - Function name
     */
    executeFunction(functionName) {
        this.executedFunctions.add(functionName);
    }

    /**
     * Calculates coverage metrics
     * @returns {Object} Coverage report
     */
    getCoverage() {
        const statementCoverage = (this.executedStatements.size / this.totalStatements) * 100;
        const branchCoverage = (this.executedBranches.size / this.totalBranches) * 100;
        const functionCoverage = (this.executedFunctions.size / this.totalFunctions) * 100;

        return {
            statements: {
                covered: this.executedStatements.size,
                total: this.totalStatements,
                percentage: statementCoverage.toFixed(2) + '%'
            },
            branches: {
                covered: this.executedBranches.size,
                total: this.totalBranches,
                percentage: branchCoverage.toFixed(2) + '%'
            },
            functions: {
                covered: this.executedFunctions.size,
                total: this.totalFunctions,
                percentage: functionCoverage.toFixed(2) + '%'
            },
            overall: ((statementCoverage + branchCoverage + functionCoverage) / 3).toFixed(2) + '%'
        };
    }

    /**
     * Identifies uncovered code
     * @returns {Object} Uncovered items
     */
    getUncovered() {
        const uncoveredStatements = [];
        for (let i = 1; i <= this.totalStatements; i++) {
            if (!this.executedStatements.has(i)) {
                uncoveredStatements.push(i);
            }
        }

        const uncoveredBranches = [];
        for (let i = 1; i <= this.totalBranches; i++) {
            if (!this.executedBranches.has(i)) {
                uncoveredBranches.push(i);
            }
        }

        return {
            statements: uncoveredStatements,
            branches: uncoveredBranches,
            recommendation: uncoveredStatements.length > 0
                ? 'Add tests for uncovered statements'
                : 'Good statement coverage'
        };
    }
}

/**
 * ControlFlowGraph represents code control flow.
 */
class ControlFlowGraph {
    constructor() {
        this.nodes = new Map();
        this.edges = [];
    }

    /**
     * Adds a node
     * @param {number} id - Node ID
     * @param {string} type - Node type
     * @param {string} code - Code snippet
     */
    addNode(id, type, code) {
        this.nodes.set(id, { id, type, code });
    }

    /**
     * Adds an edge
     * @param {number} from - Source node
     * @param {number} to - Target node
     * @param {string} condition - Edge condition
     */
    addEdge(from, to, condition = '') {
        this.edges.push({ from, to, condition });
    }

    /**
     * Finds all paths through the graph
     * @param {number} start - Start node
     * @param {number} end - End node
     * @returns {Array} All paths
     */
    findAllPaths(start, end) {
        const paths = [];
        const visited = new Set();

        const dfs = (current, path) => {
            if (current === end) {
                paths.push([...path]);
                return;
            }

            visited.add(current);

            for (const edge of this.edges.filter(e => e.from === current)) {
                if (!visited.has(edge.to)) {
                    path.push(edge.to);
                    dfs(edge.to, path);
                    path.pop();
                }
            }

            visited.delete(current);
        };

        dfs(start, [start]);
        return paths;
    }

    /**
     * Calculates cyclomatic complexity
     * @returns {Object} Complexity analysis
     */
    getCyclomaticComplexity() {
        const edges = this.edges.length;
        const nodes = this.nodes.size;
        const connectedComponents = 1;

        const complexity = edges - nodes + 2 * connectedComponents;

        let risk;
        if (complexity <= 10) risk = 'Low';
        else if (complexity <= 20) risk = 'Moderate';
        else if (complexity <= 50) risk = 'High';
        else risk = 'Very High';

        return {
            complexity,
            edges,
            nodes,
            riskLevel: risk,
            minimumTests: complexity,
            interpretation: `At least ${complexity} test cases needed for full path coverage`
        };
    }
}

/**
 * DataFlowAnalyzer analyzes data flow for testing.
 */
class DataFlowAnalyzer {
    static anomalies = {
        definedNotUsed: {
            name: 'Defined but not used',
            description: 'Variable defined but never read',
            severity: 'Warning',
            example: 'let x = 5; // x never used'
        },
        usedNotDefined: {
            name: 'Used before defined',
            description: 'Variable used before assignment',
            severity: 'Error',
            example: 'console.log(x); let x = 5;'
        },
        doubleDefinition: {
            name: 'Double definition',
            description: 'Variable defined twice without use',
            severity: 'Warning',
            example: 'x = 5; x = 10; // first definition lost'
        }
    };

    /**
     * Analyzes variable definitions and uses
     * @param {Array} defUseChain - Definition-use chain
     * @returns {Object} Analysis result
     */
    static analyze(defUseChain) {
        const issues = [];

        for (const variable of defUseChain) {
            // Check for defined but not used
            if (variable.definitions.length > 0 && variable.uses.length === 0) {
                issues.push({
                    variable: variable.name,
                    anomaly: 'definedNotUsed',
                    ...this.anomalies.definedNotUsed
                });
            }

            // Check for used before defined
            if (variable.uses.length > 0 && variable.definitions.length === 0) {
                issues.push({
                    variable: variable.name,
                    anomaly: 'usedNotDefined',
                    ...this.anomalies.usedNotDefined
                });
            }

            // Check for double definitions
            for (let i = 0; i < variable.definitions.length - 1; i++) {
                const nextUseAfterDef = variable.uses.find(u => u > variable.definitions[i]);
                if (!nextUseAfterDef || nextUseAfterDef > variable.definitions[i + 1]) {
                    issues.push({
                        variable: variable.name,
                        anomaly: 'doubleDefinition',
                        line: variable.definitions[i],
                        ...this.anomalies.doubleDefinition
                    });
                }
            }
        }

        return {
            variables: defUseChain.length,
            issues,
            hasErrors: issues.some(i => i.severity === 'Error'),
            recommendation: issues.length > 0
                ? 'Review and fix data flow issues'
                : 'No data flow anomalies detected'
        };
    }
}

/**
 * WhiteBoxTestGenerator generates tests from code structure.
 */
class WhiteBoxTestGenerator {
    /**
     * Generates tests for statement coverage
     * @param {Object} codeStructure - Code structure info
     * @returns {Array} Test cases
     */
    static generateForStatementCoverage(codeStructure) {
        const tests = [];

        for (const statement of codeStructure.statements) {
            if (!statement.covered) {
                tests.push({
                    target: `Statement at line ${statement.line}`,
                    type: 'statement',
                    input: this.deriveInputForStatement(statement),
                    expected: statement.expectedBehavior
                });
            }
        }

        return {
            coverageType: 'Statement',
            testsGenerated: tests.length,
            tests: tests.slice(0, 5) // Show first 5
        };
    }

    /**
     * Generates tests for branch coverage
     * @param {Object} codeStructure - Code structure info
     * @returns {Array} Test cases
     */
    static generateForBranchCoverage(codeStructure) {
        const tests = [];

        for (const branch of codeStructure.branches) {
            // Test true branch
            tests.push({
                target: `Branch at line ${branch.line} - true`,
                type: 'branch',
                condition: branch.condition,
                input: this.deriveInputForCondition(branch.condition, true),
                expectedPath: 'true branch'
            });

            // Test false branch
            tests.push({
                target: `Branch at line ${branch.line} - false`,
                type: 'branch',
                condition: branch.condition,
                input: this.deriveInputForCondition(branch.condition, false),
                expectedPath: 'false branch'
            });
        }

        return {
            coverageType: 'Branch',
            testsGenerated: tests.length,
            tests: tests.slice(0, 6)
        };
    }

    /**
     * Derives input for statement
     * @param {Object} statement - Statement info
     * @returns {Object} Input values
     */
    static deriveInputForStatement(statement) {
        // Simplified - real implementation would use symbolic execution
        return { note: 'Input derived from data flow analysis' };
    }

    /**
     * Derives input for condition
     * @param {string} condition - Condition expression
     * @param {boolean} targetValue - Target true/false
     * @returns {Object} Input values
     */
    static deriveInputForCondition(condition, targetValue) {
        // Simplified - real implementation would use constraint solving
        return {
            condition,
            targetValue,
            note: 'Input derived from condition analysis'
        };
    }
}

/**
 * StaticAnalysisTool simulates static code analysis.
 */
class StaticAnalysisTool {
    static rules = {
        complexity: 'Cyclomatic complexity should be < 10',
        nesting: 'Nesting depth should be < 4',
        lineLength: 'Lines should be < 120 characters',
        functionLength: 'Functions should be < 50 lines',
        parameters: 'Functions should have < 5 parameters'
    };

    /**
     * Analyzes code
     * @param {Object} codeMetrics - Code metrics
     * @returns {Object} Analysis results
     */
    static analyze(codeMetrics) {
        const violations = [];

        if (codeMetrics.cyclomaticComplexity > 10) {
            violations.push({
                rule: 'complexity',
                value: codeMetrics.cyclomaticComplexity,
                threshold: 10,
                severity: codeMetrics.cyclomaticComplexity > 20 ? 'high' : 'medium'
            });
        }

        if (codeMetrics.maxNestingDepth > 4) {
            violations.push({
                rule: 'nesting',
                value: codeMetrics.maxNestingDepth,
                threshold: 4,
                severity: 'medium'
            });
        }

        if (codeMetrics.maxFunctionLength > 50) {
            violations.push({
                rule: 'functionLength',
                value: codeMetrics.maxFunctionLength,
                threshold: 50,
                severity: 'low'
            });
        }

        return {
            analyzed: true,
            violations,
            passedRules: Object.keys(this.rules).length - violations.length,
            totalRules: Object.keys(this.rules).length,
            maintainabilityIndex: this.calculateMaintainability(codeMetrics)
        };
    }

    /**
     * Calculates maintainability index
     * @param {Object} metrics - Code metrics
     * @returns {Object} Maintainability assessment
     */
    static calculateMaintainability(metrics) {
        // Simplified maintainability index
        const halsteadVolume = metrics.halsteadVolume || 100;
        const complexity = metrics.cyclomaticComplexity || 5;
        const loc = metrics.linesOfCode || 100;

        const mi = 171 - 5.2 * Math.log(halsteadVolume) -
            0.23 * complexity - 16.2 * Math.log(loc);

        const normalizedMI = Math.max(0, Math.min(100, mi * 100 / 171));

        return {
            index: normalizedMI.toFixed(1),
            rating: normalizedMI >= 65 ? 'Good' :
                normalizedMI >= 25 ? 'Moderate' : 'Poor'
        };
    }
}

// Demonstration
console.log('=== White-Box Testing Demo ===\n');

// Techniques
console.log('--- White-Box Techniques ---');
WhiteBoxTechnique.getAllTechniques().slice(0, 3).forEach(tech => {
    console.log(`\n${tech.name}: ${tech.description}`);
    console.log(`  Formula: ${tech.formula}`);
});

// Coverage analysis
console.log('\n--- Code Coverage Analysis ---');
const analyzer = new CodeCoverageAnalyzer({
    statements: 100,
    branches: 24,
    functions: 15
});

// Simulate test execution
for (let i = 1; i <= 85; i++) analyzer.executeStatement(i);
for (let i = 1; i <= 20; i++) analyzer.executeBranch(i);
['login', 'logout', 'validate', 'process', 'save', 'load', 'init', 'cleanup',
    'transform', 'format', 'parse', 'render'].forEach(f => analyzer.executeFunction(f));

console.log('Coverage:', analyzer.getCoverage());
console.log('Uncovered:', analyzer.getUncovered());

// Control flow
console.log('\n--- Control Flow Analysis ---');
const cfg = new ControlFlowGraph();
cfg.addNode(1, 'start', 'function start');
cfg.addNode(2, 'decision', 'if (x > 0)');
cfg.addNode(3, 'process', 'result = x * 2');
cfg.addNode(4, 'process', 'result = 0');
cfg.addNode(5, 'decision', 'if (result > 10)');
cfg.addNode(6, 'process', 'return "large"');
cfg.addNode(7, 'process', 'return "small"');

cfg.addEdge(1, 2);
cfg.addEdge(2, 3, 'true');
cfg.addEdge(2, 4, 'false');
cfg.addEdge(3, 5);
cfg.addEdge(4, 5);
cfg.addEdge(5, 6, 'true');
cfg.addEdge(5, 7, 'false');

console.log('Cyclomatic Complexity:', cfg.getCyclomaticComplexity());
console.log('Paths:', cfg.findAllPaths(1, 6));

// Data flow analysis
console.log('\n--- Data Flow Analysis ---');
console.log(DataFlowAnalyzer.analyze([
    { name: 'x', definitions: [1, 5], uses: [3] },
    { name: 'y', definitions: [2], uses: [] },
    { name: 'z', definitions: [], uses: [4] }
]));

// Static analysis
console.log('\n--- Static Analysis ---');
console.log(StaticAnalysisTool.analyze({
    cyclomaticComplexity: 15,
    maxNestingDepth: 3,
    maxFunctionLength: 45,
    linesOfCode: 500,
    halsteadVolume: 200
}));

/**
 * Best Practices for White-Box Testing:
 *
 * 1. Aim for high code coverage (80%+ statement coverage)
 * 2. Focus on branch coverage for decision logic
 * 3. Use cyclomatic complexity to guide test count
 * 4. Analyze data flow for variable-related bugs
 * 5. Combine with static analysis tools
 * 6. Test boundary conditions in loops
 * 7. Verify error handling paths
 * 8. Use coverage tools to find gaps
 * 9. Don't rely solely on coverage metrics
 * 10. Balance with black-box testing
 */
