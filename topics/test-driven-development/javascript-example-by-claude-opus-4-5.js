/**
 * Test-Driven Development (TDD) - Writing Tests Before Code
 *
 * Test-driven development (TDD) is a software development practice that
 * emphasizes writing automated tests before writing code. Developers write
 * a failing test first, then write the minimum code to make it pass, and
 * finally refactor while keeping tests green. TDD is part of Agile methodology.
 *
 * Key Concepts:
 * - Red: Write a failing test
 * - Green: Write minimum code to pass
 * - Refactor: Improve code while tests pass
 */

/**
 * TDDCycle represents the Red-Green-Refactor cycle.
 */
class TDDCycle {
    static phases = {
        red: {
            name: 'Red',
            description: 'Write a failing test',
            activities: [
                'Think about desired behavior',
                'Write test for that behavior',
                'Run test - it should fail',
                'Verify test fails for the right reason'
            ],
            tips: [
                'Start with the simplest test case',
                'Test behavior, not implementation',
                'Name tests clearly'
            ]
        },
        green: {
            name: 'Green',
            description: 'Write minimum code to pass',
            activities: [
                'Write the simplest code that passes',
                'Dont optimize yet',
                'Focus only on making the test pass',
                'Run test - it should pass'
            ],
            tips: [
                'Resist urge to write extra code',
                'Its okay if code is ugly',
                'One step at a time'
            ]
        },
        refactor: {
            name: 'Refactor',
            description: 'Improve code while tests pass',
            activities: [
                'Remove duplication',
                'Improve naming',
                'Simplify logic',
                'Run tests after each change'
            ],
            tips: [
                'Keep tests green at all times',
                'Small incremental changes',
                'Refactor test code too'
            ]
        }
    };

    constructor() {
        this.currentPhase = 'red';
        this.iterations = [];
        this.currentIteration = null;
    }

    /**
     * Starts a new iteration
     * @param {string} testName - Test being written
     */
    startIteration(testName) {
        this.currentIteration = {
            testName,
            startTime: new Date(),
            phases: [],
            currentPhase: 'red'
        };
        this.currentPhase = 'red';
    }

    /**
     * Moves to next phase
     * @param {Object} notes - Phase notes
     * @returns {string} New phase
     */
    nextPhase(notes = {}) {
        const phaseOrder = ['red', 'green', 'refactor'];
        const currentIndex = phaseOrder.indexOf(this.currentPhase);

        this.currentIteration.phases.push({
            phase: this.currentPhase,
            timestamp: new Date(),
            notes
        });

        if (currentIndex === 2) {
            // Cycle complete
            this.iterations.push(this.currentIteration);
            return 'complete';
        }

        this.currentPhase = phaseOrder[currentIndex + 1];
        this.currentIteration.currentPhase = this.currentPhase;
        return this.currentPhase;
    }

    /**
     * Gets current phase info
     * @returns {Object} Phase details
     */
    getCurrentPhaseInfo() {
        return TDDCycle.phases[this.currentPhase];
    }

    /**
     * Gets cycle statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        return {
            completedIterations: this.iterations.length,
            currentPhase: this.currentPhase,
            averageIterationTime: this.calculateAverageTime()
        };
    }

    /**
     * Calculates average iteration time
     * @returns {string} Average time
     */
    calculateAverageTime() {
        if (this.iterations.length === 0) return 'N/A';

        const totalMs = this.iterations.reduce((sum, iter) => {
            const last = iter.phases[iter.phases.length - 1];
            return sum + (last.timestamp - iter.startTime);
        }, 0);

        const avgMs = totalMs / this.iterations.length;
        return Math.round(avgMs / 1000) + 's';
    }
}

/**
 * TDDTest represents a test in TDD style.
 */
class TDDTest {
    constructor(description, testFn) {
        this.description = description;
        this.testFn = testFn;
        this.status = 'pending';
        this.error = null;
    }

    /**
     * Runs the test
     * @returns {Object} Test result
     */
    run() {
        try {
            this.testFn();
            this.status = 'passed';
            return { description: this.description, passed: true };
        } catch (error) {
            this.status = 'failed';
            this.error = error;
            return { description: this.description, passed: false, error: error.message };
        }
    }
}

/**
 * SimpleAssertions provides basic assertion functions.
 */
class SimpleAssertions {
    /**
     * Asserts equality
     * @param {*} actual - Actual value
     * @param {*} expected - Expected value
     * @param {string} message - Error message
     */
    static assertEqual(actual, expected, message = '') {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected} but got ${actual}`);
        }
    }

    /**
     * Asserts deep equality
     * @param {*} actual - Actual value
     * @param {*} expected - Expected value
     * @param {string} message - Error message
     */
    static assertDeepEqual(actual, expected, message = '') {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(message || `Objects are not equal`);
        }
    }

    /**
     * Asserts truthy
     * @param {*} value - Value to check
     * @param {string} message - Error message
     */
    static assertTrue(value, message = '') {
        if (!value) {
            throw new Error(message || `Expected truthy value but got ${value}`);
        }
    }

    /**
     * Asserts falsy
     * @param {*} value - Value to check
     * @param {string} message - Error message
     */
    static assertFalse(value, message = '') {
        if (value) {
            throw new Error(message || `Expected falsy value but got ${value}`);
        }
    }

    /**
     * Asserts throws
     * @param {Function} fn - Function to call
     * @param {string} expectedError - Expected error message
     */
    static assertThrows(fn, expectedError = null) {
        let threw = false;
        let actualError = null;

        try {
            fn();
        } catch (e) {
            threw = true;
            actualError = e.message;
        }

        if (!threw) {
            throw new Error('Expected function to throw but it did not');
        }

        if (expectedError && actualError !== expectedError) {
            throw new Error(`Expected error "${expectedError}" but got "${actualError}"`);
        }
    }
}

/**
 * TDDTestSuite runs multiple tests.
 */
class TDDTestSuite {
    constructor(name) {
        this.name = name;
        this.tests = [];
        this.beforeEach = null;
        this.afterEach = null;
    }

    /**
     * Sets before each hook
     * @param {Function} fn - Hook function
     */
    setBeforeEach(fn) {
        this.beforeEach = fn;
    }

    /**
     * Sets after each hook
     * @param {Function} fn - Hook function
     */
    setAfterEach(fn) {
        this.afterEach = fn;
    }

    /**
     * Adds a test
     * @param {string} description - Test description
     * @param {Function} testFn - Test function
     */
    test(description, testFn) {
        this.tests.push(new TDDTest(description, testFn));
    }

    /**
     * Runs all tests
     * @returns {Object} Results
     */
    run() {
        const results = [];

        for (const test of this.tests) {
            if (this.beforeEach) this.beforeEach();
            results.push(test.run());
            if (this.afterEach) this.afterEach();
        }

        const passed = results.filter(r => r.passed).length;

        return {
            suite: this.name,
            total: results.length,
            passed,
            failed: results.length - passed,
            passRate: ((passed / results.length) * 100).toFixed(1) + '%',
            results
        };
    }
}

/**
 * TDDExample demonstrates TDD with a real example.
 */
class TDDExample {
    /**
     * Example: Building a StringCalculator using TDD
     */
    static runExample() {
        console.log('=== TDD Example: StringCalculator ===\n');

        // Step 1: RED - Write failing test for empty string
        console.log('--- Iteration 1: Empty String ---');
        console.log('RED: Write test for empty string returning 0');

        // The test we would write:
        // test('returns 0 for empty string', () => {
        //   assertEqual(calculator.add(''), 0);
        // });

        // Step 1: GREEN - Implement minimum code
        console.log('GREEN: Implement add() to return 0 for empty string');

        let StringCalculator = {
            add(numbers) {
                if (numbers === '') return 0;
            }
        };

        console.log('Test: add(\'\') =', StringCalculator.add(''));

        // Step 2: RED - Write test for single number
        console.log('\n--- Iteration 2: Single Number ---');
        console.log('RED: Write test for single number');

        // Step 2: GREEN - Implement
        console.log('GREEN: Implement handling single number');

        StringCalculator = {
            add(numbers) {
                if (numbers === '') return 0;
                return parseInt(numbers, 10);
            }
        };

        console.log('Test: add(\'5\') =', StringCalculator.add('5'));

        // Step 3: RED - Write test for two numbers
        console.log('\n--- Iteration 3: Two Numbers ---');
        console.log('RED: Write test for two comma-separated numbers');

        // Step 3: GREEN - Implement
        console.log('GREEN: Implement handling multiple numbers');

        StringCalculator = {
            add(numbers) {
                if (numbers === '') return 0;
                const nums = numbers.split(',').map(n => parseInt(n, 10));
                return nums.reduce((sum, n) => sum + n, 0);
            }
        };

        console.log('Test: add(\'1,2\') =', StringCalculator.add('1,2'));
        console.log('Test: add(\'1,2,3,4\') =', StringCalculator.add('1,2,3,4'));

        // Step 4: REFACTOR
        console.log('\n--- Refactor ---');
        console.log('REFACTOR: Clean up the code');

        StringCalculator = {
            add(numbers) {
                if (!numbers) return 0;
                return this.parseNumbers(numbers).reduce((sum, n) => sum + n, 0);
            },
            parseNumbers(numbers) {
                return numbers.split(',').map(Number);
            }
        };

        console.log('Refactored - all tests still pass:');
        console.log('  add(\'\') =', StringCalculator.add(''));
        console.log('  add(\'5\') =', StringCalculator.add('5'));
        console.log('  add(\'1,2,3\') =', StringCalculator.add('1,2,3'));

        return StringCalculator;
    }
}

/**
 * TDDBenefits documents TDD benefits.
 */
class TDDBenefits {
    static benefits = {
        codeQuality: {
            title: 'Improved Code Quality',
            description: 'Tests ensure code meets requirements',
            details: [
                'Code is written to satisfy specific tests',
                'Fewer bugs slip through',
                'Design emerges from tests'
            ]
        },
        testCoverage: {
            title: 'Better Test Coverage',
            description: 'Tests are written for all functionality',
            details: [
                'No code without tests',
                'Coverage is built in',
                'Edge cases considered upfront'
            ]
        },
        confidence: {
            title: 'Increased Confidence',
            description: 'Tests provide safety net for changes',
            details: [
                'Refactoring is safer',
                'Regression caught immediately',
                'Deployment confidence'
            ]
        },
        documentation: {
            title: 'Living Documentation',
            description: 'Tests document expected behavior',
            details: [
                'Tests show how code should work',
                'Always up to date',
                'Executable specifications'
            ]
        },
        design: {
            title: 'Better Design',
            description: 'TDD promotes good design principles',
            details: [
                'Small, focused functions',
                'Loose coupling',
                'Testable code is usually well-designed'
            ]
        }
    };

    /**
     * Gets all benefits
     * @returns {Array} All benefits
     */
    static getAllBenefits() {
        return Object.entries(this.benefits).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TDDChallenges documents common challenges.
 */
class TDDChallenges {
    static challenges = {
        timeInvestment: {
            title: 'Time Investment',
            description: 'Writing tests first takes more initial time',
            mitigation: 'Time is recovered through fewer bugs and easier changes'
        },
        learningCurve: {
            title: 'Learning Curve',
            description: 'TDD requires practice to do well',
            mitigation: 'Start with simple cases, pair with experienced practitioners'
        },
        legacyCode: {
            title: 'Legacy Code',
            description: 'Difficult to apply TDD to existing code',
            mitigation: 'Use for new features, gradually add tests to legacy code'
        },
        overTesting: {
            title: 'Over-testing',
            description: 'Risk of testing implementation rather than behavior',
            mitigation: 'Focus on what, not how; test public interfaces'
        },
        slowTests: {
            title: 'Slow Test Suites',
            description: 'Tests can become slow over time',
            mitigation: 'Keep unit tests fast, use test doubles, parallelize'
        }
    };

    /**
     * Gets all challenges
     * @returns {Array} All challenges
     */
    static getAllChallenges() {
        return Object.entries(this.challenges).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

// Demonstration
console.log('=== Test-Driven Development Demo ===\n');

// TDD Cycle phases
console.log('--- TDD Cycle Phases ---');
Object.values(TDDCycle.phases).forEach(phase => {
    console.log(`\n${phase.name}: ${phase.description}`);
    console.log('Activities:', phase.activities.slice(0, 2));
});

// Run TDD cycle
console.log('\n--- TDD Cycle Simulation ---');
const cycle = new TDDCycle();
cycle.startIteration('Test empty string returns 0');

console.log('Current phase:', cycle.currentPhase);
console.log('Phase info:', cycle.getCurrentPhaseInfo().description);

cycle.nextPhase({ notes: 'Test written and fails' });
console.log('Moved to:', cycle.currentPhase);

cycle.nextPhase({ notes: 'Minimum code written' });
console.log('Moved to:', cycle.currentPhase);

cycle.nextPhase({ notes: 'Code refactored' });
console.log('Cycle:', cycle.getStatistics());

// Run test suite
console.log('\n--- Test Suite Example ---');
const suite = new TDDTestSuite('Math Operations');

suite.test('adds two numbers', () => {
    SimpleAssertions.assertEqual(2 + 3, 5);
});

suite.test('multiplies two numbers', () => {
    SimpleAssertions.assertEqual(2 * 3, 6);
});

suite.test('handles negative numbers', () => {
    SimpleAssertions.assertEqual(-1 + 1, 0);
});

console.log('Results:', suite.run());

// Run TDD example
console.log('\n');
TDDExample.runExample();

// Benefits
console.log('\n--- TDD Benefits ---');
TDDBenefits.getAllBenefits().slice(0, 3).forEach(benefit => {
    console.log(`${benefit.title}: ${benefit.description}`);
});

// Challenges
console.log('\n--- TDD Challenges ---');
TDDChallenges.getAllChallenges().slice(0, 3).forEach(challenge => {
    console.log(`${challenge.title}: ${challenge.mitigation}`);
});

/**
 * Best Practices for Test-Driven Development:
 *
 * 1. Write the simplest failing test first
 * 2. Write only enough code to pass the test
 * 3. Refactor after each green phase
 * 4. Keep tests fast - milliseconds, not seconds
 * 5. Test behavior, not implementation
 * 6. One assertion per test when possible
 * 7. Use descriptive test names
 * 8. Maintain test code quality
 * 9. Dont skip the refactor phase
 * 10. Practice makes perfect
 */
