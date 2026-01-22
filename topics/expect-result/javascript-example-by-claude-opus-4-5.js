/**
 * Expected Result - Test Validation Benchmarks
 *
 * Expected results define the specific outputs that software should produce
 * when a test case is executed. These serve as benchmarks for comparing
 * actual outputs to determine if software is functioning correctly.
 * They form the foundation of automated test validation.
 *
 * Key Concepts:
 * - Baseline Definition: Establishing what correct behavior looks like
 * - Comparison: Matching actual results against expectations
 * - Formats: Data values, behaviors, UI changes, database states
 * - Maintenance: Updating expectations as requirements evolve
 */

/**
 * ExpectedResult defines a single expected outcome from a test.
 * Contains the expected value and comparison logic.
 */
class ExpectedResult {
    constructor(options) {
        this.name = options.name;
        this.description = options.description || '';
        this.expected = options.expected;
        this.comparator = options.comparator || 'equals';
        this.tolerance = options.tolerance || 0;
        this.transformer = options.transformer || (v => v);
    }

    /**
     * Compares actual result against expected
     * @param {*} actual - Actual result to compare
     * @returns {Object} Comparison result
     */
    compare(actual) {
        const transformedActual = this.transformer(actual);
        const transformedExpected = this.transformer(this.expected);

        let passed = false;
        let message = '';

        switch (this.comparator) {
            case 'equals':
                passed = transformedActual === transformedExpected;
                message = passed
                    ? 'Values match exactly'
                    : `Expected "${transformedExpected}" but got "${transformedActual}"`;
                break;

            case 'deepEquals':
                passed = JSON.stringify(transformedActual) === JSON.stringify(transformedExpected);
                message = passed
                    ? 'Objects match deeply'
                    : 'Objects do not match';
                break;

            case 'contains':
                passed = String(transformedActual).includes(transformedExpected);
                message = passed
                    ? `Contains "${transformedExpected}"`
                    : `Does not contain "${transformedExpected}"`;
                break;

            case 'matches':
                const regex = transformedExpected instanceof RegExp
                    ? transformedExpected
                    : new RegExp(transformedExpected);
                passed = regex.test(transformedActual);
                message = passed
                    ? `Matches pattern ${regex}`
                    : `Does not match pattern ${regex}`;
                break;

            case 'approximately':
                const diff = Math.abs(transformedActual - transformedExpected);
                passed = diff <= this.tolerance;
                message = passed
                    ? `Within tolerance (diff: ${diff})`
                    : `Outside tolerance (diff: ${diff}, tolerance: ${this.tolerance})`;
                break;

            case 'greaterThan':
                passed = transformedActual > transformedExpected;
                message = passed
                    ? `${transformedActual} > ${transformedExpected}`
                    : `${transformedActual} is not greater than ${transformedExpected}`;
                break;

            case 'lessThan':
                passed = transformedActual < transformedExpected;
                message = passed
                    ? `${transformedActual} < ${transformedExpected}`
                    : `${transformedActual} is not less than ${transformedExpected}`;
                break;

            case 'truthy':
                passed = !!transformedActual;
                message = passed ? 'Value is truthy' : 'Value is falsy';
                break;

            case 'falsy':
                passed = !transformedActual;
                message = passed ? 'Value is falsy' : 'Value is truthy';
                break;

            case 'type':
                passed = typeof transformedActual === transformedExpected;
                message = passed
                    ? `Type is ${transformedExpected}`
                    : `Expected type ${transformedExpected} but got ${typeof transformedActual}`;
                break;

            default:
                passed = transformedActual === transformedExpected;
                message = 'Default equality comparison';
        }

        return {
            name: this.name,
            passed,
            expected: this.expected,
            actual,
            comparator: this.comparator,
            message
        };
    }
}

/**
 * ExpectedResultSet manages multiple expected results for a test case.
 * Coordinates validation of complex test scenarios.
 */
class ExpectedResultSet {
    constructor(name) {
        this.name = name;
        this.expectations = [];
    }

    /**
     * Adds an expected result
     * @param {ExpectedResult} expectation - Expected result to add
     */
    add(expectation) {
        this.expectations.push(expectation);
    }

    /**
     * Creates and adds a quick expectation
     * @param {string} name - Expectation name
     * @param {*} expected - Expected value
     * @param {string} comparator - Comparison method
     * @returns {ExpectedResultSet} This set for chaining
     */
    expect(name, expected, comparator = 'equals') {
        this.expectations.push(new ExpectedResult({
            name,
            expected,
            comparator
        }));
        return this;
    }

    /**
     * Validates all expectations against actual results
     * @param {Object} actuals - Object with actual values keyed by expectation name
     * @returns {Object} Validation results
     */
    validate(actuals) {
        const results = [];

        for (const expectation of this.expectations) {
            const actual = actuals[expectation.name];
            const result = expectation.compare(actual);
            results.push(result);
        }

        const passed = results.filter(r => r.passed).length;
        const failed = results.filter(r => !r.passed).length;

        return {
            setName: this.name,
            total: results.length,
            passed,
            failed,
            allPassed: failed === 0,
            results
        };
    }

    /**
     * Validates against a single result object
     * @param {Object} resultObject - Object containing all result fields
     * @returns {Object} Validation results
     */
    validateObject(resultObject) {
        const actuals = {};
        for (const exp of this.expectations) {
            actuals[exp.name] = resultObject[exp.name];
        }
        return this.validate(actuals);
    }
}

/**
 * ExpectedResultRepository stores and manages expected results.
 * Provides versioning and retrieval of test expectations.
 */
class ExpectedResultRepository {
    constructor() {
        this.results = new Map();
        this.version = '1.0.0';
        this.history = [];
    }

    /**
     * Stores an expected result set
     * @param {string} testId - Test identifier
     * @param {ExpectedResultSet} resultSet - Expected result set
     */
    store(testId, resultSet) {
        this.results.set(testId, {
            resultSet,
            storedAt: new Date().toISOString(),
            version: this.version
        });
    }

    /**
     * Retrieves an expected result set
     * @param {string} testId - Test identifier
     * @returns {ExpectedResultSet|null} Result set or null
     */
    get(testId) {
        const stored = this.results.get(testId);
        return stored ? stored.resultSet : null;
    }

    /**
     * Updates an expected result
     * @param {string} testId - Test identifier
     * @param {string} expectationName - Name of expectation to update
     * @param {*} newExpected - New expected value
     * @param {string} reason - Reason for update
     */
    update(testId, expectationName, newExpected, reason) {
        const stored = this.results.get(testId);
        if (!stored) return;

        const expectation = stored.resultSet.expectations.find(
            e => e.name === expectationName
        );

        if (expectation) {
            const oldValue = expectation.expected;
            expectation.expected = newExpected;

            this.history.push({
                testId,
                expectationName,
                oldValue,
                newValue: newExpected,
                reason,
                updatedAt: new Date().toISOString()
            });

            console.log(`Updated expectation "${expectationName}": ${oldValue} -> ${newExpected}`);
        }
    }

    /**
     * Gets update history
     * @param {string} testId - Optional test ID filter
     * @returns {Array} Update history
     */
    getHistory(testId = null) {
        if (testId) {
            return this.history.filter(h => h.testId === testId);
        }
        return this.history;
    }

    /**
     * Exports all expected results to JSON
     * @returns {string} JSON representation
     */
    export() {
        const data = {};
        for (const [testId, stored] of this.results) {
            data[testId] = {
                expectations: stored.resultSet.expectations.map(e => ({
                    name: e.name,
                    expected: e.expected,
                    comparator: e.comparator
                })),
                version: stored.version
            };
        }
        return JSON.stringify(data, null, 2);
    }
}

/**
 * ResultComparator provides various comparison strategies.
 * Implements different ways to match expected vs actual.
 */
class ResultComparator {
    /**
     * Compares two values for exact equality
     * @param {*} expected - Expected value
     * @param {*} actual - Actual value
     * @returns {boolean} True if equal
     */
    static equals(expected, actual) {
        return expected === actual;
    }

    /**
     * Compares objects/arrays for deep equality
     * @param {*} expected - Expected value
     * @param {*} actual - Actual value
     * @returns {boolean} True if deeply equal
     */
    static deepEquals(expected, actual) {
        return JSON.stringify(expected) === JSON.stringify(actual);
    }

    /**
     * Checks if actual contains expected (substring or array element)
     * @param {*} expected - Expected substring/element
     * @param {*} actual - Actual string/array
     * @returns {boolean} True if contains
     */
    static contains(expected, actual) {
        if (Array.isArray(actual)) {
            return actual.includes(expected);
        }
        return String(actual).includes(expected);
    }

    /**
     * Checks if actual matches regex pattern
     * @param {RegExp|string} pattern - Pattern to match
     * @param {string} actual - Actual string
     * @returns {boolean} True if matches
     */
    static matches(pattern, actual) {
        const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
        return regex.test(actual);
    }

    /**
     * Checks if numbers are approximately equal
     * @param {number} expected - Expected number
     * @param {number} actual - Actual number
     * @param {number} tolerance - Allowed difference
     * @returns {boolean} True if within tolerance
     */
    static approximately(expected, actual, tolerance = 0.001) {
        return Math.abs(expected - actual) <= tolerance;
    }

    /**
     * Checks if object has expected structure
     * @param {Object} expectedStructure - Expected keys and types
     * @param {Object} actual - Actual object
     * @returns {boolean} True if structure matches
     */
    static hasStructure(expectedStructure, actual) {
        if (!actual || typeof actual !== 'object') return false;

        for (const [key, expectedType] of Object.entries(expectedStructure)) {
            if (!(key in actual)) return false;
            if (typeof actual[key] !== expectedType) return false;
        }
        return true;
    }

    /**
     * Checks if array has expected length
     * @param {number} expectedLength - Expected length
     * @param {Array} actual - Actual array
     * @returns {boolean} True if length matches
     */
    static hasLength(expectedLength, actual) {
        return Array.isArray(actual) && actual.length === expectedLength;
    }
}

/**
 * TestResultFormatter formats comparison results for reporting.
 * Generates human-readable output from validation results.
 */
class TestResultFormatter {
    /**
     * Formats validation result as text
     * @param {Object} validation - Validation result
     * @returns {string} Formatted text
     */
    static formatText(validation) {
        let output = `\n=== ${validation.setName} ===\n`;
        output += `Total: ${validation.total} | Passed: ${validation.passed} | Failed: ${validation.failed}\n`;
        output += `Status: ${validation.allPassed ? 'PASS' : 'FAIL'}\n\n`;

        for (const result of validation.results) {
            const icon = result.passed ? '✓' : '✗';
            output += `${icon} ${result.name}\n`;
            output += `  ${result.message}\n`;

            if (!result.passed) {
                output += `  Expected: ${JSON.stringify(result.expected)}\n`;
                output += `  Actual: ${JSON.stringify(result.actual)}\n`;
            }
        }

        return output;
    }

    /**
     * Formats validation result as JSON
     * @param {Object} validation - Validation result
     * @returns {string} JSON string
     */
    static formatJSON(validation) {
        return JSON.stringify(validation, null, 2);
    }

    /**
     * Formats validation result for console
     * @param {Object} validation - Validation result
     */
    static logToConsole(validation) {
        console.log(`\n${validation.setName}: ${validation.allPassed ? 'PASSED' : 'FAILED'}`);
        console.log(`(${validation.passed}/${validation.total} expectations met)`);

        for (const result of validation.results) {
            if (result.passed) {
                console.log(`  ✓ ${result.name}`);
            } else {
                console.log(`  ✗ ${result.name}`);
                console.log(`    Expected: ${JSON.stringify(result.expected)}`);
                console.log(`    Actual: ${JSON.stringify(result.actual)}`);
            }
        }
    }
}

// Demonstration
console.log('=== Expected Result Demo ===\n');

// Create expected result set for a user registration test
const registrationExpectations = new ExpectedResultSet('User Registration');

registrationExpectations
    .expect('statusCode', 201, 'equals')
    .expect('userId', /^user-\d+$/, 'matches')
    .expect('email', '@', 'contains')
    .expect('createdAt', 'string', 'type');

// Add complex expectation
registrationExpectations.add(new ExpectedResult({
    name: 'responseTime',
    expected: 1000,
    comparator: 'lessThan',
    description: 'Response should be under 1 second'
}));

// Simulate actual results
const actualResults = {
    statusCode: 201,
    userId: 'user-12345',
    email: 'test@example.com',
    createdAt: '2024-01-15T10:30:00Z',
    responseTime: 450
};

console.log('Actual Results:', actualResults);

// Validate
const validation = registrationExpectations.validate(actualResults);
TestResultFormatter.logToConsole(validation);

// Repository demo
console.log('\n--- Expected Result Repository ---');
const repository = new ExpectedResultRepository();
repository.store('test-user-registration', registrationExpectations);

// Update an expectation
repository.update(
    'test-user-registration',
    'responseTime',
    500,
    'Reduced SLA requirement'
);

console.log('\nUpdate History:', repository.getHistory());

// Comparator examples
console.log('\n--- Comparator Examples ---');
console.log(`equals: ${ResultComparator.equals(5, 5)}`);
console.log(`deepEquals: ${ResultComparator.deepEquals({ a: 1 }, { a: 1 })}`);
console.log(`contains: ${ResultComparator.contains('test', 'testing')}`);
console.log(`matches: ${ResultComparator.matches(/^\d{4}$/, '1234')}`);
console.log(`approximately: ${ResultComparator.approximately(3.14159, 3.14, 0.01)}`);
console.log(`hasStructure: ${ResultComparator.hasStructure({ name: 'string', age: 'number' }, { name: 'John', age: 30 })}`);

/**
 * Best Practices for Expected Results:
 *
 * 1. Define expected results based on requirements, not implementation
 * 2. Use appropriate comparators for each data type
 * 3. Document why specific expected values were chosen
 * 4. Version control expected results alongside test code
 * 5. Review and update expectations when requirements change
 * 6. Use tolerance for floating-point comparisons
 * 7. Include both positive and negative expected results
 * 8. Keep expected results separate from test logic
 * 9. Use regex patterns for dynamic but predictable values
 * 10. Regularly audit expected results for accuracy
 */
