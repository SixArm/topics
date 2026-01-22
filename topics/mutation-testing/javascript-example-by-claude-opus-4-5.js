/**
 * Mutation Testing - Test Suite Quality Evaluation
 *
 * Mutation testing introduces deliberate changes called mutations into source
 * code to simulate common programming errors. If a test suite is robust, it
 * should detect these artificial defects. Mutations include changing operators,
 * modifying constants, or altering conditional statements.
 *
 * Key Concepts:
 * - Mutants: Modified versions of original code
 * - Killed mutant: Tests fail, mutation detected
 * - Survived mutant: Tests pass, potential gap
 * - Mutation score: Percentage of killed mutants
 */

/**
 * MutationOperator defines types of code mutations.
 * Each operator transforms code in a specific way.
 */
class MutationOperator {
    static operators = {
        ARITHMETIC: {
            name: 'Arithmetic Operator Replacement',
            mutations: {
                '+': ['-', '*', '/'],
                '-': ['+', '*', '/'],
                '*': ['+', '-', '/'],
                '/': ['+', '-', '*']
            },
            description: 'Replaces arithmetic operators with alternatives'
        },
        RELATIONAL: {
            name: 'Relational Operator Replacement',
            mutations: {
                '<': ['<=', '>', '>=', '==', '!='],
                '>': ['>=', '<', '<=', '==', '!='],
                '<=': ['<', '>', '>=', '==', '!='],
                '>=': ['>', '<', '<=', '==', '!='],
                '==': ['!=', '<', '>', '<=', '>='],
                '!=': ['==', '<', '>', '<=', '>=']
            },
            description: 'Replaces comparison operators'
        },
        LOGICAL: {
            name: 'Logical Operator Replacement',
            mutations: {
                '&&': ['||'],
                '||': ['&&'],
                '!': ['']
            },
            description: 'Replaces logical operators'
        },
        CONSTANT: {
            name: 'Constant Replacement',
            mutations: {
                '0': ['1', '-1'],
                '1': ['0', '-1', '2'],
                'true': ['false'],
                'false': ['true']
            },
            description: 'Replaces constants with alternatives'
        },
        BOUNDARY: {
            name: 'Boundary Mutation',
            mutations: {
                'i < n': ['i <= n', 'i < n-1', 'i < n+1'],
                'i <= n': ['i < n', 'i <= n-1', 'i <= n+1']
            },
            description: 'Modifies loop and array boundaries'
        },
        STATEMENT: {
            name: 'Statement Deletion',
            mutations: {
                'statement': ['// deleted'],
                'return x': ['return null', 'return 0']
            },
            description: 'Removes or modifies statements'
        }
    };

    /**
     * Gets possible mutations for an operator
     * @param {string} category - Operator category
     * @param {string} original - Original operator
     * @returns {Array} Possible mutations
     */
    static getMutations(category, original) {
        const cat = this.operators[category];
        return cat?.mutations[original] || [];
    }

    /**
     * Gets all operator categories
     * @returns {Object} All operators
     */
    static getAll() {
        return this.operators;
    }
}

/**
 * Mutant represents a mutated version of code.
 * Tracks mutation details and test results.
 */
class Mutant {
    constructor(options) {
        this.id = options.id;
        this.originalCode = options.originalCode;
        this.mutatedCode = options.mutatedCode;
        this.operator = options.operator;
        this.location = options.location; // line, column
        this.status = 'pending'; // pending, killed, survived, timeout
        this.killedBy = null; // Test that killed it
    }

    /**
     * Marks mutant as killed
     * @param {string} testName - Test that killed it
     */
    kill(testName) {
        this.status = 'killed';
        this.killedBy = testName;
    }

    /**
     * Marks mutant as survived
     */
    survive() {
        this.status = 'survived';
    }

    /**
     * Marks mutant as timeout
     */
    timeout() {
        this.status = 'timeout';
    }

    /**
     * Gets mutant summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            operator: this.operator,
            location: this.location,
            status: this.status,
            killedBy: this.killedBy
        };
    }
}

/**
 * MutationGenerator creates mutants from source code.
 * Identifies mutation opportunities and generates variants.
 */
class MutationGenerator {
    constructor() {
        this.mutants = [];
        this.mutantId = 0;
    }

    /**
     * Generates mutants for a code snippet (simplified)
     * @param {string} code - Source code
     * @returns {Array} Generated mutants
     */
    generateMutants(code) {
        this.mutants = [];

        // Find arithmetic operators
        this.findAndMutate(code, /[\+\-\*\/](?!=)/g, 'ARITHMETIC');

        // Find relational operators
        this.findAndMutate(code, /[<>!=]=?/g, 'RELATIONAL');

        // Find logical operators
        this.findAndMutate(code, /&&|\|\|/g, 'LOGICAL');

        // Find boolean constants
        this.findAndMutate(code, /\b(true|false)\b/g, 'CONSTANT');

        return this.mutants;
    }

    /**
     * Finds operators and generates mutations
     * @param {string} code - Source code
     * @param {RegExp} pattern - Pattern to find
     * @param {string} category - Operator category
     */
    findAndMutate(code, pattern, category) {
        let match;
        while ((match = pattern.exec(code)) !== null) {
            const original = match[0];
            const mutations = MutationOperator.getMutations(category, original);

            for (const mutation of mutations) {
                const mutatedCode = code.slice(0, match.index) +
                    mutation +
                    code.slice(match.index + original.length);

                this.mutants.push(new Mutant({
                    id: `M${++this.mutantId}`,
                    originalCode: code,
                    mutatedCode,
                    operator: `${category}: ${original} → ${mutation}`,
                    location: { index: match.index, original, mutation }
                }));
            }
        }
    }

    /**
     * Gets mutant count by operator type
     * @returns {Object} Counts by type
     */
    getMutantCounts() {
        const counts = {};
        for (const mutant of this.mutants) {
            const type = mutant.operator.split(':')[0];
            counts[type] = (counts[type] || 0) + 1;
        }
        return counts;
    }
}

/**
 * MutationTestRunner executes tests against mutants.
 * Determines which mutants are killed or survived.
 */
class MutationTestRunner {
    constructor(options = {}) {
        this.timeout = options.timeout || 5000;
        this.results = [];
    }

    /**
     * Runs test suite against a mutant (simulated)
     * @param {Mutant} mutant - Mutant to test
     * @param {Array} tests - Test suite
     * @returns {Object} Test result
     */
    runTests(mutant, tests) {
        const startTime = Date.now();

        for (const test of tests) {
            try {
                // Simulate running test against mutated code
                const passed = this.simulateTestExecution(mutant, test);

                if (!passed) {
                    mutant.kill(test.name);
                    return {
                        mutant: mutant.id,
                        status: 'killed',
                        killedBy: test.name,
                        duration: Date.now() - startTime
                    };
                }
            } catch (error) {
                if (error.message === 'timeout') {
                    mutant.timeout();
                    return {
                        mutant: mutant.id,
                        status: 'timeout',
                        duration: this.timeout
                    };
                }
                // Error might indicate killed mutant
                mutant.kill(test.name);
                return {
                    mutant: mutant.id,
                    status: 'killed',
                    killedBy: test.name,
                    error: error.message
                };
            }
        }

        // All tests passed - mutant survived
        mutant.survive();
        return {
            mutant: mutant.id,
            status: 'survived',
            duration: Date.now() - startTime
        };
    }

    /**
     * Simulates test execution (for demonstration)
     * @param {Mutant} mutant - Mutant being tested
     * @param {Object} test - Test to run
     * @returns {boolean} True if test passes
     */
    simulateTestExecution(mutant, test) {
        // Simulate: arithmetic mutations often caught
        if (mutant.operator.includes('ARITHMETIC')) {
            return Math.random() > 0.8; // 80% kill rate
        }
        // Boundary mutations sometimes survive
        if (mutant.operator.includes('BOUNDARY')) {
            return Math.random() > 0.5; // 50% kill rate
        }
        // Default: 70% kill rate
        return Math.random() > 0.7;
    }

    /**
     * Runs all tests against all mutants
     * @param {Array} mutants - All mutants
     * @param {Array} tests - Test suite
     * @returns {Object} Complete results
     */
    runAll(mutants, tests) {
        console.log(`Running ${tests.length} tests against ${mutants.length} mutants...`);

        this.results = [];
        for (const mutant of mutants) {
            const result = this.runTests(mutant, tests);
            this.results.push(result);
        }

        return this.calculateScore();
    }

    /**
     * Calculates mutation score
     * @returns {Object} Score and statistics
     */
    calculateScore() {
        const total = this.results.length;
        const killed = this.results.filter(r => r.status === 'killed').length;
        const survived = this.results.filter(r => r.status === 'survived').length;
        const timeout = this.results.filter(r => r.status === 'timeout').length;

        const score = total > 0 ? (killed / total) * 100 : 0;

        return {
            total,
            killed,
            survived,
            timeout,
            mutationScore: score.toFixed(2) + '%',
            assessment: this.assessScore(score)
        };
    }

    /**
     * Assesses the mutation score quality
     * @param {number} score - Mutation score
     * @returns {string} Assessment
     */
    assessScore(score) {
        if (score >= 90) return 'Excellent - Very strong test suite';
        if (score >= 80) return 'Good - Strong test coverage';
        if (score >= 60) return 'Moderate - Some gaps in testing';
        if (score >= 40) return 'Weak - Significant testing gaps';
        return 'Poor - Major improvements needed';
    }
}

/**
 * MutationReport generates mutation testing reports.
 */
class MutationReport {
    constructor(runner, generator) {
        this.runner = runner;
        this.generator = generator;
    }

    /**
     * Generates a full report
     * @returns {Object} Report
     */
    generate() {
        const score = this.runner.calculateScore();
        const survivedMutants = this.runner.results
            .filter(r => r.status === 'survived')
            .map(r => {
                const mutant = this.generator.mutants.find(m => m.id === r.mutant);
                return mutant ? mutant.getSummary() : null;
            })
            .filter(Boolean);

        return {
            summary: score,
            survivedMutants,
            recommendations: this.getRecommendations(survivedMutants),
            mutantsByOperator: this.generator.getMutantCounts()
        };
    }

    /**
     * Gets recommendations based on survived mutants
     * @param {Array} survived - Survived mutants
     * @returns {Array} Recommendations
     */
    getRecommendations(survived) {
        const recommendations = [];

        const operatorCounts = {};
        for (const mutant of survived) {
            const type = mutant.operator.split(':')[0];
            operatorCounts[type] = (operatorCounts[type] || 0) + 1;
        }

        if (operatorCounts.BOUNDARY > 0) {
            recommendations.push('Add tests for boundary conditions (off-by-one errors)');
        }
        if (operatorCounts.RELATIONAL > 0) {
            recommendations.push('Add tests that verify comparison logic');
        }
        if (operatorCounts.ARITHMETIC > 0) {
            recommendations.push('Add tests that verify calculations');
        }
        if (operatorCounts.LOGICAL > 0) {
            recommendations.push('Add tests for logical branching conditions');
        }

        return recommendations;
    }
}

// Demonstration
console.log('=== Mutation Testing Demo ===\n');

// Show mutation operators
console.log('--- Mutation Operators ---');
const operators = MutationOperator.getAll();
Object.entries(operators).slice(0, 3).forEach(([key, op]) => {
    console.log(`${key}: ${op.description}`);
});

// Generate mutants from sample code
console.log('\n--- Generating Mutants ---');
const sampleCode = `
function calculateDiscount(price, quantity) {
    if (quantity > 10 && price > 100) {
        return price * 0.1;
    }
    if (quantity >= 5 || price >= 50) {
        return price * 0.05;
    }
    return 0;
}
`;

const generator = new MutationGenerator();
const mutants = generator.generateMutants(sampleCode);
console.log(`Generated ${mutants.length} mutants`);
console.log('Mutants by type:', generator.getMutantCounts());

// Show sample mutants
console.log('\n--- Sample Mutants ---');
mutants.slice(0, 3).forEach(m => {
    console.log(`${m.id}: ${m.operator}`);
});

// Run mutation tests
console.log('\n--- Running Mutation Tests ---');
const tests = [
    { name: 'test_no_discount' },
    { name: 'test_small_discount' },
    { name: 'test_large_discount' },
    { name: 'test_boundary_quantity' },
    { name: 'test_boundary_price' }
];

const runner = new MutationTestRunner();
const score = runner.runAll(mutants, tests);
console.log('Results:', score);

// Generate report
console.log('\n--- Mutation Report ---');
const reporter = new MutationReport(runner, generator);
const report = reporter.generate();
console.log('Survived mutants:', report.survivedMutants.length);
console.log('Recommendations:', report.recommendations);

/**
 * Best Practices for Mutation Testing:
 *
 * 1. Use mutation testing to evaluate test suite quality
 * 2. Focus on killing survived mutants to improve tests
 * 3. Set realistic mutation score targets (80%+ is good)
 * 4. Use mutation testing incrementally on critical code
 * 5. Exclude equivalent mutants from scoring
 * 6. Configure appropriate timeout for infinite loops
 * 7. Prioritize mutants by severity of the mutation
 * 8. Integrate with CI/CD for continuous feedback
 * 9. Combine with code coverage for complete picture
 * 10. Don't chase 100% - focus on meaningful coverage
 */
