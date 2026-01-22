/**
 * Assert - Building Blocks of Automated Testing
 *
 * Assert statements are checkpoints in automated tests that verify expected
 * behavior during test execution. They evaluate whether conditions are true
 * or false, flagging discrepancies between actual and expected results.
 * Assertions form the foundation of test automation frameworks.
 *
 * Key Concepts:
 * - Equality assertions (equal, deepEqual, strictEqual)
 * - Boolean assertions (true, false, truthy, falsy)
 * - Comparison assertions (greater, less, within)
 * - Type assertions (typeof, instanceof)
 * - Collection assertions (contains, length, empty)
 * - Exception assertions (throws, rejects)
 */

// Example 1: Assertion Library Implementation
class Assert {
  /**
   * Assert that two values are equal (loose equality)
   * @param {*} actual - Actual value
   * @param {*} expected - Expected value
   * @param {string} message - Optional failure message
   */
  static equal(actual, expected, message = '') {
    if (actual != expected) {
      throw new AssertionError(
        message || `Expected ${expected} but got ${actual}`,
        { actual, expected, operator: '==' }
      );
    }
  }

  /**
   * Assert that two values are strictly equal (===)
   * @param {*} actual - Actual value
   * @param {*} expected - Expected value
   * @param {string} message - Optional failure message
   */
  static strictEqual(actual, expected, message = '') {
    if (actual !== expected) {
      throw new AssertionError(
        message || `Expected ${expected} (strict) but got ${actual}`,
        { actual, expected, operator: '===' }
      );
    }
  }

  /**
   * Assert that two objects are deeply equal
   * @param {*} actual - Actual value
   * @param {*} expected - Expected value
   * @param {string} message - Optional failure message
   */
  static deepEqual(actual, expected, message = '') {
    if (!this._deepEqual(actual, expected)) {
      throw new AssertionError(
        message || `Objects are not deeply equal`,
        { actual, expected, operator: 'deepEqual' }
      );
    }
  }

  /**
   * Internal deep equality check
   * @param {*} a - First value
   * @param {*} b - Second value
   * @returns {boolean}
   */
  static _deepEqual(a, b) {
    if (a === b) return true;

    if (typeof a !== typeof b) return false;

    if (a === null || b === null) return a === b;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => this._deepEqual(item, b[index]));
    }

    if (typeof a === 'object') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      return keysA.every(key => this._deepEqual(a[key], b[key]));
    }

    return false;
  }

  /**
   * Assert that a value is truthy
   * @param {*} value - Value to check
   * @param {string} message - Optional failure message
   */
  static ok(value, message = '') {
    if (!value) {
      throw new AssertionError(
        message || `Expected truthy value but got ${value}`,
        { actual: value, expected: 'truthy', operator: 'ok' }
      );
    }
  }

  /**
   * Assert that a value is true
   * @param {*} value - Value to check
   * @param {string} message - Optional failure message
   */
  static isTrue(value, message = '') {
    if (value !== true) {
      throw new AssertionError(
        message || `Expected true but got ${value}`,
        { actual: value, expected: true, operator: 'isTrue' }
      );
    }
  }

  /**
   * Assert that a value is false
   * @param {*} value - Value to check
   * @param {string} message - Optional failure message
   */
  static isFalse(value, message = '') {
    if (value !== false) {
      throw new AssertionError(
        message || `Expected false but got ${value}`,
        { actual: value, expected: false, operator: 'isFalse' }
      );
    }
  }

  /**
   * Assert that a value is null
   * @param {*} value - Value to check
   * @param {string} message - Optional failure message
   */
  static isNull(value, message = '') {
    if (value !== null) {
      throw new AssertionError(
        message || `Expected null but got ${value}`,
        { actual: value, expected: null, operator: 'isNull' }
      );
    }
  }

  /**
   * Assert that a value is not null
   * @param {*} value - Value to check
   * @param {string} message - Optional failure message
   */
  static isNotNull(value, message = '') {
    if (value === null) {
      throw new AssertionError(
        message || `Expected non-null value`,
        { actual: value, expected: 'not null', operator: 'isNotNull' }
      );
    }
  }

  /**
   * Assert that a value is undefined
   * @param {*} value - Value to check
   * @param {string} message - Optional failure message
   */
  static isUndefined(value, message = '') {
    if (value !== undefined) {
      throw new AssertionError(
        message || `Expected undefined but got ${value}`,
        { actual: value, expected: undefined, operator: 'isUndefined' }
      );
    }
  }

  /**
   * Assert that a value is defined (not undefined)
   * @param {*} value - Value to check
   * @param {string} message - Optional failure message
   */
  static isDefined(value, message = '') {
    if (value === undefined) {
      throw new AssertionError(
        message || `Expected defined value but got undefined`,
        { actual: value, expected: 'defined', operator: 'isDefined' }
      );
    }
  }

  /**
   * Assert that a value is of a specific type
   * @param {*} value - Value to check
   * @param {string} expectedType - Expected type
   * @param {string} message - Optional failure message
   */
  static typeOf(value, expectedType, message = '') {
    const actualType = typeof value;
    if (actualType !== expectedType) {
      throw new AssertionError(
        message || `Expected type ${expectedType} but got ${actualType}`,
        { actual: actualType, expected: expectedType, operator: 'typeOf' }
      );
    }
  }

  /**
   * Assert that an object is an instance of a class
   * @param {*} object - Object to check
   * @param {Function} constructor - Constructor function
   * @param {string} message - Optional failure message
   */
  static instanceOf(object, constructor, message = '') {
    if (!(object instanceof constructor)) {
      throw new AssertionError(
        message || `Expected instance of ${constructor.name}`,
        { actual: object?.constructor?.name, expected: constructor.name, operator: 'instanceOf' }
      );
    }
  }

  /**
   * Assert that a value is greater than another
   * @param {number} actual - Actual value
   * @param {number} expected - Expected lower bound
   * @param {string} message - Optional failure message
   */
  static isAbove(actual, expected, message = '') {
    if (actual <= expected) {
      throw new AssertionError(
        message || `Expected ${actual} to be above ${expected}`,
        { actual, expected, operator: '>' }
      );
    }
  }

  /**
   * Assert that a value is less than another
   * @param {number} actual - Actual value
   * @param {number} expected - Expected upper bound
   * @param {string} message - Optional failure message
   */
  static isBelow(actual, expected, message = '') {
    if (actual >= expected) {
      throw new AssertionError(
        message || `Expected ${actual} to be below ${expected}`,
        { actual, expected, operator: '<' }
      );
    }
  }

  /**
   * Assert that a value is within a range
   * @param {number} actual - Actual value
   * @param {number} min - Minimum value (inclusive)
   * @param {number} max - Maximum value (inclusive)
   * @param {string} message - Optional failure message
   */
  static isWithin(actual, min, max, message = '') {
    if (actual < min || actual > max) {
      throw new AssertionError(
        message || `Expected ${actual} to be within [${min}, ${max}]`,
        { actual, expected: `[${min}, ${max}]`, operator: 'within' }
      );
    }
  }

  /**
   * Assert that an array or string contains a value
   * @param {Array|string} haystack - Collection to search
   * @param {*} needle - Value to find
   * @param {string} message - Optional failure message
   */
  static contains(haystack, needle, message = '') {
    const found = Array.isArray(haystack)
      ? haystack.includes(needle)
      : haystack.includes(needle);

    if (!found) {
      throw new AssertionError(
        message || `Expected ${JSON.stringify(haystack)} to contain ${needle}`,
        { actual: haystack, expected: needle, operator: 'contains' }
      );
    }
  }

  /**
   * Assert that a collection has a specific length
   * @param {Array|string} collection - Collection to check
   * @param {number} expectedLength - Expected length
   * @param {string} message - Optional failure message
   */
  static lengthOf(collection, expectedLength, message = '') {
    const actualLength = collection.length;
    if (actualLength !== expectedLength) {
      throw new AssertionError(
        message || `Expected length ${expectedLength} but got ${actualLength}`,
        { actual: actualLength, expected: expectedLength, operator: 'lengthOf' }
      );
    }
  }

  /**
   * Assert that a collection is empty
   * @param {Array|string|object} collection - Collection to check
   * @param {string} message - Optional failure message
   */
  static isEmpty(collection, message = '') {
    const isEmpty = Array.isArray(collection) || typeof collection === 'string'
      ? collection.length === 0
      : Object.keys(collection).length === 0;

    if (!isEmpty) {
      throw new AssertionError(
        message || `Expected empty collection`,
        { actual: collection, expected: 'empty', operator: 'isEmpty' }
      );
    }
  }

  /**
   * Assert that a function throws an error
   * @param {Function} fn - Function to execute
   * @param {string|RegExp|Function} expected - Expected error
   * @param {string} message - Optional failure message
   */
  static throws(fn, expected, message = '') {
    let thrown = false;
    let error;

    try {
      fn();
    } catch (e) {
      thrown = true;
      error = e;
    }

    if (!thrown) {
      throw new AssertionError(
        message || `Expected function to throw`,
        { actual: 'no error', expected: 'error', operator: 'throws' }
      );
    }

    if (expected) {
      if (typeof expected === 'string' && error.message !== expected) {
        throw new AssertionError(
          message || `Expected error message "${expected}" but got "${error.message}"`,
          { actual: error.message, expected, operator: 'throws' }
        );
      }
      if (expected instanceof RegExp && !expected.test(error.message)) {
        throw new AssertionError(
          message || `Expected error message to match ${expected}`,
          { actual: error.message, expected: expected.toString(), operator: 'throws' }
        );
      }
      if (typeof expected === 'function' && !(error instanceof expected)) {
        throw new AssertionError(
          message || `Expected error to be instance of ${expected.name}`,
          { actual: error.constructor.name, expected: expected.name, operator: 'throws' }
        );
      }
    }
  }

  /**
   * Assert that an async function throws
   * @param {Function} fn - Async function to execute
   * @param {string|RegExp|Function} expected - Expected error
   * @param {string} message - Optional failure message
   */
  static async rejects(fn, expected, message = '') {
    let thrown = false;
    let error;

    try {
      await fn();
    } catch (e) {
      thrown = true;
      error = e;
    }

    if (!thrown) {
      throw new AssertionError(
        message || `Expected promise to reject`,
        { actual: 'resolved', expected: 'rejected', operator: 'rejects' }
      );
    }

    // Similar validation as throws...
  }

  /**
   * Assert that a string matches a regular expression
   * @param {string} actual - String to test
   * @param {RegExp} regex - Regular expression
   * @param {string} message - Optional failure message
   */
  static match(actual, regex, message = '') {
    if (!regex.test(actual)) {
      throw new AssertionError(
        message || `Expected "${actual}" to match ${regex}`,
        { actual, expected: regex.toString(), operator: 'match' }
      );
    }
  }

  /**
   * Always fail with a message
   * @param {string} message - Failure message
   */
  static fail(message = 'Assertion failed') {
    throw new AssertionError(message, { operator: 'fail' });
  }
}

// Custom Assertion Error
class AssertionError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'AssertionError';
    this.actual = details.actual;
    this.expected = details.expected;
    this.operator = details.operator;
  }
}

// Example 2: Soft Assertions (collect all failures)
class SoftAssert {
  constructor() {
    this.failures = [];
  }

  /**
   * Wrapper to catch assertion errors
   * @param {Function} assertFn - Assertion function
   * @param {Array} args - Arguments to pass
   */
  _softCheck(assertFn, args) {
    try {
      assertFn.apply(Assert, args);
    } catch (error) {
      this.failures.push({
        assertion: assertFn.name,
        message: error.message,
        actual: error.actual,
        expected: error.expected
      });
    }
  }

  equal(actual, expected, message) {
    this._softCheck(Assert.equal, [actual, expected, message]);
  }

  strictEqual(actual, expected, message) {
    this._softCheck(Assert.strictEqual, [actual, expected, message]);
  }

  isTrue(value, message) {
    this._softCheck(Assert.isTrue, [value, message]);
  }

  contains(haystack, needle, message) {
    this._softCheck(Assert.contains, [haystack, needle, message]);
  }

  /**
   * Assert all soft assertions passed
   */
  assertAll() {
    if (this.failures.length > 0) {
      const messages = this.failures.map(
        (f, i) => `${i + 1}. ${f.message}`
      ).join('\n');

      throw new AssertionError(
        `${this.failures.length} assertion(s) failed:\n${messages}`,
        { failures: this.failures }
      );
    }
  }

  /**
   * Get failure count
   * @returns {number}
   */
  getFailureCount() {
    return this.failures.length;
  }

  /**
   * Reset failures
   */
  reset() {
    this.failures = [];
  }
}

// Example 3: Custom Assertion Extensions
class CustomAssertions {
  /**
   * Assert that a value is a valid email
   * @param {string} value - Value to check
   * @param {string} message - Optional failure message
   */
  static isValidEmail(value, message = '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new AssertionError(
        message || `Expected "${value}" to be a valid email`,
        { actual: value, expected: 'valid email', operator: 'isValidEmail' }
      );
    }
  }

  /**
   * Assert that a value is a valid URL
   * @param {string} value - Value to check
   * @param {string} message - Optional failure message
   */
  static isValidUrl(value, message = '') {
    try {
      new URL(value);
    } catch {
      throw new AssertionError(
        message || `Expected "${value}" to be a valid URL`,
        { actual: value, expected: 'valid URL', operator: 'isValidUrl' }
      );
    }
  }

  /**
   * Assert that an object has all required properties
   * @param {object} obj - Object to check
   * @param {Array} properties - Required properties
   * @param {string} message - Optional failure message
   */
  static hasProperties(obj, properties, message = '') {
    const missing = properties.filter(prop => !(prop in obj));
    if (missing.length > 0) {
      throw new AssertionError(
        message || `Missing properties: ${missing.join(', ')}`,
        { actual: Object.keys(obj), expected: properties, operator: 'hasProperties' }
      );
    }
  }

  /**
   * Assert that a date is in the past
   * @param {Date} date - Date to check
   * @param {string} message - Optional failure message
   */
  static isInPast(date, message = '') {
    if (date >= new Date()) {
      throw new AssertionError(
        message || `Expected date to be in the past`,
        { actual: date, expected: 'past date', operator: 'isInPast' }
      );
    }
  }

  /**
   * Assert that a value is approximately equal (for floating point)
   * @param {number} actual - Actual value
   * @param {number} expected - Expected value
   * @param {number} tolerance - Acceptable difference
   * @param {string} message - Optional failure message
   */
  static approximately(actual, expected, tolerance = 0.001, message = '') {
    if (Math.abs(actual - expected) > tolerance) {
      throw new AssertionError(
        message || `Expected ${actual} to be approximately ${expected} (±${tolerance})`,
        { actual, expected, operator: 'approximately' }
      );
    }
  }
}

// Example 4: Test Runner with Assertions
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = [];
  }

  /**
   * Add a test
   * @param {string} name - Test name
   * @param {Function} testFn - Test function
   */
  test(name, testFn) {
    this.tests.push({ name, fn: testFn });
  }

  /**
   * Run all tests
   */
  async run() {
    console.log('Running tests...\n');

    for (const test of this.tests) {
      const result = await this.runTest(test);
      this.results.push(result);

      const status = result.passed ? '✓' : '✗';
      console.log(`${status} ${test.name}`);
      if (!result.passed) {
        console.log(`  Error: ${result.error}`);
      }
    }

    this.printSummary();
  }

  /**
   * Run a single test
   * @param {object} test - Test to run
   * @returns {object}
   */
  async runTest(test) {
    try {
      await test.fn();
      return { name: test.name, passed: true };
    } catch (error) {
      return {
        name: test.name,
        passed: false,
        error: error.message
      };
    }
  }

  /**
   * Print test summary
   */
  printSummary() {
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.length - passed;

    console.log('\n-------------------');
    console.log(`Tests: ${this.results.length}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Pass Rate: ${((passed / this.results.length) * 100).toFixed(1)}%`);
  }
}

// Demonstration
console.log('=== Assert Examples ===\n');

const runner = new TestRunner();

// Equality tests
runner.test('strict equality works', () => {
  Assert.strictEqual(1, 1);
  Assert.strictEqual('hello', 'hello');
});

runner.test('deep equality works for objects', () => {
  Assert.deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
  Assert.deepEqual([1, 2, 3], [1, 2, 3]);
});

// Boolean tests
runner.test('boolean assertions work', () => {
  Assert.isTrue(true);
  Assert.isFalse(false);
  Assert.ok(1);
  Assert.ok('non-empty string');
});

// Type tests
runner.test('type assertions work', () => {
  Assert.typeOf('hello', 'string');
  Assert.typeOf(42, 'number');
  Assert.typeOf({}, 'object');
});

// Range tests
runner.test('range assertions work', () => {
  Assert.isAbove(10, 5);
  Assert.isBelow(3, 10);
  Assert.isWithin(5, 1, 10);
});

// Collection tests
runner.test('collection assertions work', () => {
  Assert.contains([1, 2, 3], 2);
  Assert.contains('hello world', 'world');
  Assert.lengthOf([1, 2, 3], 3);
});

// Exception tests
runner.test('throws assertion works', () => {
  Assert.throws(() => { throw new Error('test error'); });
  Assert.throws(() => { throw new Error('test'); }, 'test');
});

// Custom assertions
runner.test('custom email validation works', () => {
  CustomAssertions.isValidEmail('user@example.com');
});

runner.test('approximately works for floats', () => {
  CustomAssertions.approximately(0.1 + 0.2, 0.3, 0.001);
});

// Soft assertions demo
runner.test('soft assertions collect all failures', () => {
  const soft = new SoftAssert();

  soft.equal(1, 1);  // passes
  soft.equal(2, 2);  // passes
  soft.isTrue(true); // passes

  soft.assertAll();  // should pass since all assertions succeeded
});

// Run all tests
runner.run();

/**
 * Assertion Best Practices:
 *
 * 1. One Assertion Per Test: Keep tests focused on a single behavior
 *
 * 2. Use Descriptive Messages: Help identify failures quickly
 *
 * 3. Assert the Right Things: Test behavior, not implementation
 *
 * 4. Avoid Magic Numbers: Use constants with meaningful names
 *
 * 5. Test Edge Cases: Null, empty, boundary values
 *
 * 6. Use Soft Assertions Carefully: Only when testing multiple related things
 *
 * 7. Choose the Right Assertion: strictEqual vs equal, deepEqual for objects
 *
 * 8. Keep Assertions Simple: Complex assertions are hard to debug
 */
