/**
 * Unit Testing - Verifying Individual Components
 *
 * Unit testing is a software testing technique that verifies individual units
 * or components of a system. A unit is the smallest testable part - a method,
 * function, class, or module. The goal is to isolate each unit and validate
 * it performs as expected.
 *
 * Key Concepts:
 * - Isolation of units
 * - Fast execution
 * - Automated and repeatable
 * - Documentation through tests
 */

/**
 * UnitTestFramework simulates a unit testing framework.
 */
class UnitTestFramework {
    constructor(name) {
        this.name = name;
        this.suites = [];
        this.currentSuite = null;
    }

    /**
     * Creates a test suite
     * @param {string} description - Suite description
     * @param {Function} fn - Suite function
     */
    describe(description, fn) {
        this.currentSuite = {
            description,
            tests: [],
            beforeEach: null,
            afterEach: null
        };
        fn();
        this.suites.push(this.currentSuite);
        this.currentSuite = null;
    }

    /**
     * Adds a test to current suite
     * @param {string} description - Test description
     * @param {Function} fn - Test function
     */
    it(description, fn) {
        if (this.currentSuite) {
            this.currentSuite.tests.push({ description, fn });
        }
    }

    /**
     * Sets before each hook
     * @param {Function} fn - Hook function
     */
    beforeEach(fn) {
        if (this.currentSuite) {
            this.currentSuite.beforeEach = fn;
        }
    }

    /**
     * Sets after each hook
     * @param {Function} fn - Hook function
     */
    afterEach(fn) {
        if (this.currentSuite) {
            this.currentSuite.afterEach = fn;
        }
    }

    /**
     * Runs all tests
     * @returns {Object} Test results
     */
    run() {
        const results = [];

        for (const suite of this.suites) {
            const suiteResult = {
                description: suite.description,
                tests: []
            };

            for (const test of suite.tests) {
                if (suite.beforeEach) suite.beforeEach();

                try {
                    test.fn();
                    suiteResult.tests.push({
                        description: test.description,
                        passed: true
                    });
                } catch (error) {
                    suiteResult.tests.push({
                        description: test.description,
                        passed: false,
                        error: error.message
                    });
                }

                if (suite.afterEach) suite.afterEach();
            }

            results.push(suiteResult);
        }

        const allTests = results.flatMap(s => s.tests);
        const passed = allTests.filter(t => t.passed).length;

        return {
            suites: results.length,
            tests: allTests.length,
            passed,
            failed: allTests.length - passed,
            passRate: ((passed / allTests.length) * 100).toFixed(1) + '%',
            results
        };
    }
}

/**
 * Assertions provides assertion methods.
 */
class Assertions {
    /**
     * Asserts equality
     * @param {*} actual - Actual value
     * @param {*} expected - Expected value
     */
    static assertEqual(actual, expected) {
        if (actual !== expected) {
            throw new Error(`Expected ${expected} but got ${actual}`);
        }
    }

    /**
     * Asserts deep equality
     * @param {*} actual - Actual value
     * @param {*} expected - Expected value
     */
    static assertDeepEqual(actual, expected) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(
                `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`
            );
        }
    }

    /**
     * Asserts truthy
     * @param {*} value - Value to check
     */
    static assertTrue(value) {
        if (!value) {
            throw new Error(`Expected truthy but got ${value}`);
        }
    }

    /**
     * Asserts falsy
     * @param {*} value - Value to check
     */
    static assertFalse(value) {
        if (value) {
            throw new Error(`Expected falsy but got ${value}`);
        }
    }

    /**
     * Asserts null
     * @param {*} value - Value to check
     */
    static assertNull(value) {
        if (value !== null) {
            throw new Error(`Expected null but got ${value}`);
        }
    }

    /**
     * Asserts not null
     * @param {*} value - Value to check
     */
    static assertNotNull(value) {
        if (value === null) {
            throw new Error('Expected non-null value');
        }
    }

    /**
     * Asserts throws
     * @param {Function} fn - Function to call
     * @param {string} expectedMessage - Expected error message
     */
    static assertThrows(fn, expectedMessage) {
        let threw = false;
        let actualMessage = '';

        try {
            fn();
        } catch (error) {
            threw = true;
            actualMessage = error.message;
        }

        if (!threw) {
            throw new Error('Expected function to throw but it did not');
        }

        if (expectedMessage && actualMessage !== expectedMessage) {
            throw new Error(
                `Expected error "${expectedMessage}" but got "${actualMessage}"`
            );
        }
    }

    /**
     * Asserts array contains
     * @param {Array} array - Array to check
     * @param {*} item - Item to find
     */
    static assertContains(array, item) {
        if (!array.includes(item)) {
            throw new Error(`Array does not contain ${item}`);
        }
    }

    /**
     * Asserts approximately equal (for floats)
     * @param {number} actual - Actual value
     * @param {number} expected - Expected value
     * @param {number} tolerance - Tolerance
     */
    static assertApproximatelyEqual(actual, expected, tolerance = 0.001) {
        if (Math.abs(actual - expected) > tolerance) {
            throw new Error(
                `Expected ${expected} ± ${tolerance} but got ${actual}`
            );
        }
    }
}

/**
 * UnitTestPatterns provides common unit testing patterns.
 */
class UnitTestPatterns {
    static patterns = {
        arrange_act_assert: {
            name: 'Arrange-Act-Assert (AAA)',
            description: 'Standard test structure',
            structure: [
                'Arrange: Set up test data and conditions',
                'Act: Execute the code being tested',
                'Assert: Verify the expected outcome'
            ],
            example: `
it('should calculate total with tax', () => {
    // Arrange
    const subtotal = 100;
    const taxRate = 0.1;

    // Act
    const total = calculateTotal(subtotal, taxRate);

    // Assert
    expect(total).toBe(110);
});`
        },
        given_when_then: {
            name: 'Given-When-Then (BDD)',
            description: 'Behavior-driven test structure',
            structure: [
                'Given: Initial context',
                'When: Event or action',
                'Then: Expected outcome'
            ],
            example: `
it('given logged in user, when checkout, then order created', () => {
    // Given
    const user = createLoggedInUser();
    const cart = createCartWithItems();

    // When
    const order = checkout(user, cart);

    // Then
    expect(order.status).toBe('created');
});`
        },
        test_double: {
            name: 'Test Doubles',
            description: 'Replace dependencies with test implementations',
            types: ['Dummy', 'Fake', 'Stub', 'Spy', 'Mock'],
            useCase: 'Isolate unit from external dependencies'
        },
        boundary_testing: {
            name: 'Boundary Testing',
            description: 'Test at boundaries of valid input',
            examples: [
                'Empty array/string',
                'Single element',
                'Maximum size',
                'Zero, negative, positive values'
            ]
        }
    };

    /**
     * Gets pattern by name
     * @param {string} name - Pattern name
     * @returns {Object} Pattern details
     */
    static getPattern(name) {
        return this.patterns[name];
    }

    /**
     * Gets all patterns
     * @returns {Array} All patterns
     */
    static getAllPatterns() {
        return Object.entries(this.patterns).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TestCoverage calculates test coverage metrics.
 */
class TestCoverage {
    /**
     * Calculates coverage
     * @param {Object} data - Coverage data
     * @returns {Object} Coverage report
     */
    static calculate(data) {
        const linesCovered = data.coveredLines;
        const totalLines = data.totalLines;
        const lineCoverage = (linesCovered / totalLines) * 100;

        const branchesCovered = data.coveredBranches;
        const totalBranches = data.totalBranches;
        const branchCoverage = (branchesCovered / totalBranches) * 100;

        const functionsCovered = data.coveredFunctions;
        const totalFunctions = data.totalFunctions;
        const functionCoverage = (functionsCovered / totalFunctions) * 100;

        return {
            lines: {
                covered: linesCovered,
                total: totalLines,
                percentage: lineCoverage.toFixed(1) + '%'
            },
            branches: {
                covered: branchesCovered,
                total: totalBranches,
                percentage: branchCoverage.toFixed(1) + '%'
            },
            functions: {
                covered: functionsCovered,
                total: totalFunctions,
                percentage: functionCoverage.toFixed(1) + '%'
            },
            overall: ((lineCoverage + branchCoverage + functionCoverage) / 3).toFixed(1) + '%',
            meetsThreshold: lineCoverage >= 80 && branchCoverage >= 80
        };
    }
}

/**
 * UnitTestBestPractices provides guidance.
 */
class UnitTestBestPractices {
    static practices = [
        {
            practice: 'One assertion per test',
            description: 'Each test verifies one thing',
            benefit: 'Clear failure identification'
        },
        {
            practice: 'Descriptive test names',
            description: 'Test name explains what is being tested',
            benefit: 'Self-documenting tests'
        },
        {
            practice: 'Test isolation',
            description: 'Tests dont depend on each other',
            benefit: 'Reliable, parallelizable tests'
        },
        {
            practice: 'Fast execution',
            description: 'Unit tests run in milliseconds',
            benefit: 'Fast feedback loop'
        },
        {
            practice: 'No external dependencies',
            description: 'Mock/stub external services',
            benefit: 'Deterministic results'
        },
        {
            practice: 'Test behavior, not implementation',
            description: 'Focus on what, not how',
            benefit: 'Resilient to refactoring'
        }
    ];

    /**
     * Gets all practices
     * @returns {Array} All practices
     */
    static getAllPractices() {
        return this.practices;
    }
}

// Demonstration
console.log('=== Unit Testing Demo ===\n');

// Create framework instance
const framework = new UnitTestFramework('Test Suite');

// Example: Calculator tests
framework.describe('Calculator', function() {
    framework.it('should add two numbers', () => {
        const result = 2 + 3;
        Assertions.assertEqual(result, 5);
    });

    framework.it('should subtract two numbers', () => {
        const result = 5 - 3;
        Assertions.assertEqual(result, 2);
    });

    framework.it('should multiply two numbers', () => {
        const result = 4 * 3;
        Assertions.assertEqual(result, 12);
    });

    framework.it('should handle division by zero', () => {
        Assertions.assertThrows(() => {
            const result = 1 / 0;
            if (!isFinite(result)) throw new Error('Division by zero');
        }, 'Division by zero');
    });
});

// Example: Array tests
framework.describe('Array Operations', function() {
    let testArray;

    framework.beforeEach(() => {
        testArray = [1, 2, 3];
    });

    framework.it('should have correct length', () => {
        Assertions.assertEqual(testArray.length, 3);
    });

    framework.it('should contain expected elements', () => {
        Assertions.assertContains(testArray, 2);
    });
});

// Run tests
console.log('--- Test Results ---');
const results = framework.run();
console.log('Summary:', {
    suites: results.suites,
    tests: results.tests,
    passed: results.passed,
    failed: results.failed,
    passRate: results.passRate
});

// Show individual results
console.log('\nDetailed Results:');
results.results.forEach(suite => {
    console.log(`\n${suite.description}:`);
    suite.tests.forEach(test => {
        const status = test.passed ? '✓' : '✗';
        console.log(`  ${status} ${test.description}`);
        if (!test.passed) {
            console.log(`    Error: ${test.error}`);
        }
    });
});

// Test patterns
console.log('\n--- Unit Test Patterns ---');
UnitTestPatterns.getAllPatterns().slice(0, 2).forEach(pattern => {
    console.log(`\n${pattern.name}: ${pattern.description}`);
});

// Coverage calculation
console.log('\n--- Test Coverage ---');
console.log(TestCoverage.calculate({
    coveredLines: 180,
    totalLines: 200,
    coveredBranches: 45,
    totalBranches: 50,
    coveredFunctions: 28,
    totalFunctions: 30
}));

// Best practices
console.log('\n--- Best Practices ---');
UnitTestBestPractices.getAllPractices().slice(0, 3).forEach(p => {
    console.log(`${p.practice}: ${p.benefit}`);
});

/**
 * Unit Testing Best Practices:
 *
 * 1. Write tests for all public methods
 * 2. Follow Arrange-Act-Assert pattern
 * 3. Keep tests fast (milliseconds)
 * 4. Test edge cases and boundaries
 * 5. Use descriptive test names
 * 6. One assertion per test
 * 7. Isolate units with test doubles
 * 8. Maintain high code coverage
 * 9. Run tests frequently (CI/CD)
 * 10. Treat test code as production code
 */
