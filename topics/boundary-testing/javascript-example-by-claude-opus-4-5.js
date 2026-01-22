/**
 * Boundary Testing - Testing at the Edges of Input Domains
 *
 * Boundary testing focuses on evaluating application behavior at the edges of
 * input domains and operational limits. It examines values at boundaries, just
 * above boundaries, and just below boundaries to identify defects that commonly
 * occur at these transition points.
 *
 * Key Concepts:
 * - Boundary value analysis (BVA)
 * - Off-by-one error detection
 * - Edge case testing
 * - Range limit validation
 * - Buffer overflow prevention
 */

// Example 1: Boundary Value Test Generator
class BoundaryValueTestGenerator {
  constructor() {
    this.testCases = [];
  }

  /**
   * Generate boundary test values for numeric range
   * @param {string} fieldName - Name of the field
   * @param {number} min - Minimum valid value
   * @param {number} max - Maximum valid value
   * @param {string} dataType - 'integer' or 'float'
   * @returns {Array} - Boundary test cases
   */
  generateNumericBoundaries(fieldName, min, max, dataType = 'integer') {
    const step = dataType === 'integer' ? 1 : 0.01;

    const cases = [
      // Below minimum boundary
      { value: min - step, type: 'below_min', expected: 'invalid', description: 'Just below minimum' },
      { value: min - (step * 10), type: 'well_below_min', expected: 'invalid', description: 'Well below minimum' },

      // At minimum boundary
      { value: min, type: 'at_min', expected: 'valid', description: 'At minimum boundary' },

      // Above minimum boundary
      { value: min + step, type: 'above_min', expected: 'valid', description: 'Just above minimum' },

      // Nominal value
      { value: Math.floor((min + max) / 2), type: 'nominal', expected: 'valid', description: 'Nominal value' },

      // Below maximum boundary
      { value: max - step, type: 'below_max', expected: 'valid', description: 'Just below maximum' },

      // At maximum boundary
      { value: max, type: 'at_max', expected: 'valid', description: 'At maximum boundary' },

      // Above maximum boundary
      { value: max + step, type: 'above_max', expected: 'invalid', description: 'Just above maximum' },
      { value: max + (step * 10), type: 'well_above_max', expected: 'invalid', description: 'Well above maximum' }
    ];

    const testCases = cases.map((tc, index) => ({
      id: `BV_${fieldName}_${index + 1}`,
      field: fieldName,
      ...tc
    }));

    this.testCases.push(...testCases);
    return testCases;
  }

  /**
   * Generate boundary tests for string length
   * @param {string} fieldName - Name of the field
   * @param {number} minLength - Minimum length
   * @param {number} maxLength - Maximum length
   * @returns {Array} - Boundary test cases
   */
  generateStringLengthBoundaries(fieldName, minLength, maxLength) {
    const generateString = (length) => 'a'.repeat(length);

    const cases = [
      { value: '', length: 0, type: 'empty', expected: minLength === 0 ? 'valid' : 'invalid' },
      { value: generateString(minLength - 1), length: minLength - 1, type: 'below_min_length', expected: 'invalid' },
      { value: generateString(minLength), length: minLength, type: 'at_min_length', expected: 'valid' },
      { value: generateString(minLength + 1), length: minLength + 1, type: 'above_min_length', expected: 'valid' },
      { value: generateString(Math.floor((minLength + maxLength) / 2)), length: Math.floor((minLength + maxLength) / 2), type: 'nominal_length', expected: 'valid' },
      { value: generateString(maxLength - 1), length: maxLength - 1, type: 'below_max_length', expected: 'valid' },
      { value: generateString(maxLength), length: maxLength, type: 'at_max_length', expected: 'valid' },
      { value: generateString(maxLength + 1), length: maxLength + 1, type: 'above_max_length', expected: 'invalid' }
    ];

    if (minLength > 1) {
      cases.unshift({
        value: generateString(1),
        length: 1,
        type: 'single_char',
        expected: minLength <= 1 ? 'valid' : 'invalid'
      });
    }

    const testCases = cases.map((tc, index) => ({
      id: `BV_STR_${fieldName}_${index + 1}`,
      field: fieldName,
      ...tc
    }));

    this.testCases.push(...testCases);
    return testCases;
  }

  /**
   * Generate boundary tests for array size
   * @param {string} fieldName - Name of the array field
   * @param {number} minSize - Minimum array size
   * @param {number} maxSize - Maximum array size
   * @returns {Array} - Boundary test cases
   */
  generateArraySizeBoundaries(fieldName, minSize, maxSize) {
    const generateArray = (size) => Array.from({ length: size }, (_, i) => i + 1);

    const cases = [
      { value: [], size: 0, type: 'empty_array', expected: minSize === 0 ? 'valid' : 'invalid' },
      { value: generateArray(minSize - 1), size: minSize - 1, type: 'below_min_size', expected: minSize > 0 ? 'invalid' : 'valid' },
      { value: generateArray(minSize), size: minSize, type: 'at_min_size', expected: 'valid' },
      { value: generateArray(minSize + 1), size: minSize + 1, type: 'above_min_size', expected: 'valid' },
      { value: generateArray(maxSize - 1), size: maxSize - 1, type: 'below_max_size', expected: 'valid' },
      { value: generateArray(maxSize), size: maxSize, type: 'at_max_size', expected: 'valid' },
      { value: generateArray(maxSize + 1), size: maxSize + 1, type: 'above_max_size', expected: 'invalid' }
    ];

    const testCases = cases.map((tc, index) => ({
      id: `BV_ARR_${fieldName}_${index + 1}`,
      field: fieldName,
      ...tc
    }));

    this.testCases.push(...testCases);
    return testCases;
  }

  /**
   * Generate date boundary tests
   * @param {string} fieldName - Name of the date field
   * @param {Date} minDate - Minimum valid date
   * @param {Date} maxDate - Maximum valid date
   * @returns {Array} - Boundary test cases
   */
  generateDateBoundaries(fieldName, minDate, maxDate) {
    const oneDay = 24 * 60 * 60 * 1000;

    const cases = [
      { value: new Date(minDate.getTime() - oneDay), type: 'day_before_min', expected: 'invalid' },
      { value: minDate, type: 'at_min_date', expected: 'valid' },
      { value: new Date(minDate.getTime() + oneDay), type: 'day_after_min', expected: 'valid' },
      { value: new Date((minDate.getTime() + maxDate.getTime()) / 2), type: 'mid_range', expected: 'valid' },
      { value: new Date(maxDate.getTime() - oneDay), type: 'day_before_max', expected: 'valid' },
      { value: maxDate, type: 'at_max_date', expected: 'valid' },
      { value: new Date(maxDate.getTime() + oneDay), type: 'day_after_max', expected: 'invalid' }
    ];

    const testCases = cases.map((tc, index) => ({
      id: `BV_DATE_${fieldName}_${index + 1}`,
      field: fieldName,
      ...tc,
      valueFormatted: tc.value.toISOString().split('T')[0]
    }));

    this.testCases.push(...testCases);
    return testCases;
  }

  /**
   * Get all generated test cases
   * @returns {Array}
   */
  getAllTestCases() {
    return this.testCases;
  }

  /**
   * Get test cases by expected result
   * @param {string} expected - 'valid' or 'invalid'
   * @returns {Array}
   */
  getByExpectedResult(expected) {
    return this.testCases.filter(tc => tc.expected === expected);
  }
}

// Example 2: Boundary Validator
class BoundaryValidator {
  constructor(rules) {
    this.rules = rules;
    this.errors = [];
  }

  /**
   * Validate a value against defined boundaries
   * @param {string} field - Field name
   * @param {*} value - Value to validate
   * @returns {object} - Validation result
   */
  validate(field, value) {
    this.errors = [];
    const rule = this.rules[field];

    if (!rule) {
      return { valid: true, message: 'No rule defined' };
    }

    // Numeric validation
    if (rule.type === 'number') {
      return this.validateNumeric(field, value, rule);
    }

    // String length validation
    if (rule.type === 'string') {
      return this.validateString(field, value, rule);
    }

    // Array size validation
    if (rule.type === 'array') {
      return this.validateArray(field, value, rule);
    }

    // Date validation
    if (rule.type === 'date') {
      return this.validateDate(field, value, rule);
    }

    return { valid: true };
  }

  /**
   * Validate numeric value
   * @param {string} field - Field name
   * @param {number} value - Value to validate
   * @param {object} rule - Validation rule
   * @returns {object}
   */
  validateNumeric(field, value, rule) {
    if (typeof value !== 'number' || isNaN(value)) {
      this.errors.push(`${field} must be a number`);
      return { valid: false, errors: this.errors };
    }

    if (rule.min !== undefined && value < rule.min) {
      this.errors.push(`${field} must be at least ${rule.min}, got ${value}`);
    }

    if (rule.max !== undefined && value > rule.max) {
      this.errors.push(`${field} must be at most ${rule.max}, got ${value}`);
    }

    if (rule.integer && !Number.isInteger(value)) {
      this.errors.push(`${field} must be an integer`);
    }

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      boundaryInfo: {
        min: rule.min,
        max: rule.max,
        value,
        position: this.getBoundaryPosition(value, rule.min, rule.max)
      }
    };
  }

  /**
   * Validate string value
   * @param {string} field - Field name
   * @param {string} value - Value to validate
   * @param {object} rule - Validation rule
   * @returns {object}
   */
  validateString(field, value, rule) {
    if (typeof value !== 'string') {
      this.errors.push(`${field} must be a string`);
      return { valid: false, errors: this.errors };
    }

    const length = value.length;

    if (rule.minLength !== undefined && length < rule.minLength) {
      this.errors.push(`${field} must be at least ${rule.minLength} characters, got ${length}`);
    }

    if (rule.maxLength !== undefined && length > rule.maxLength) {
      this.errors.push(`${field} must be at most ${rule.maxLength} characters, got ${length}`);
    }

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      boundaryInfo: {
        minLength: rule.minLength,
        maxLength: rule.maxLength,
        actualLength: length
      }
    };
  }

  /**
   * Validate array value
   * @param {string} field - Field name
   * @param {Array} value - Value to validate
   * @param {object} rule - Validation rule
   * @returns {object}
   */
  validateArray(field, value, rule) {
    if (!Array.isArray(value)) {
      this.errors.push(`${field} must be an array`);
      return { valid: false, errors: this.errors };
    }

    const size = value.length;

    if (rule.minSize !== undefined && size < rule.minSize) {
      this.errors.push(`${field} must have at least ${rule.minSize} items, got ${size}`);
    }

    if (rule.maxSize !== undefined && size > rule.maxSize) {
      this.errors.push(`${field} must have at most ${rule.maxSize} items, got ${size}`);
    }

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      boundaryInfo: {
        minSize: rule.minSize,
        maxSize: rule.maxSize,
        actualSize: size
      }
    };
  }

  /**
   * Validate date value
   * @param {string} field - Field name
   * @param {Date} value - Value to validate
   * @param {object} rule - Validation rule
   * @returns {object}
   */
  validateDate(field, value, rule) {
    if (!(value instanceof Date) || isNaN(value)) {
      this.errors.push(`${field} must be a valid date`);
      return { valid: false, errors: this.errors };
    }

    if (rule.minDate && value < rule.minDate) {
      this.errors.push(`${field} must be on or after ${rule.minDate.toISOString()}`);
    }

    if (rule.maxDate && value > rule.maxDate) {
      this.errors.push(`${field} must be on or before ${rule.maxDate.toISOString()}`);
    }

    return {
      valid: this.errors.length === 0,
      errors: this.errors
    };
  }

  /**
   * Get position relative to boundaries
   * @param {number} value - Value
   * @param {number} min - Minimum
   * @param {number} max - Maximum
   * @returns {string}
   */
  getBoundaryPosition(value, min, max) {
    if (value < min) return 'below_min';
    if (value === min) return 'at_min';
    if (value === max) return 'at_max';
    if (value > max) return 'above_max';
    return 'within_range';
  }
}

// Example 3: Off-By-One Error Detector
class OffByOneDetector {
  /**
   * Analyze code for potential off-by-one errors
   * @param {object} context - Code analysis context
   * @returns {Array} - Potential issues
   */
  static analyze(context) {
    const issues = [];

    // Check loop boundaries
    if (context.loops) {
      context.loops.forEach(loop => {
        issues.push(...this.checkLoopBoundary(loop));
      });
    }

    // Check array access
    if (context.arrayAccesses) {
      context.arrayAccesses.forEach(access => {
        issues.push(...this.checkArrayAccess(access));
      });
    }

    // Check comparisons
    if (context.comparisons) {
      context.comparisons.forEach(comp => {
        issues.push(...this.checkComparison(comp));
      });
    }

    return issues;
  }

  /**
   * Check loop for off-by-one issues
   * @param {object} loop - Loop context
   * @returns {Array}
   */
  static checkLoopBoundary(loop) {
    const issues = [];

    // Check for common off-by-one patterns
    if (loop.condition === '<=' && loop.iteratingOverArray) {
      issues.push({
        type: 'potential_overflow',
        location: loop.location,
        message: 'Using <= with array length may cause index out of bounds',
        suggestion: 'Use < instead of <= when iterating over array indices'
      });
    }

    if (loop.start === 1 && loop.iteratingOverArray) {
      issues.push({
        type: 'potential_skip',
        location: loop.location,
        message: 'Starting loop at 1 may skip first array element (index 0)',
        suggestion: 'Arrays are zero-indexed, start at 0 unless intentional'
      });
    }

    return issues;
  }

  /**
   * Check array access for boundary issues
   * @param {object} access - Array access context
   * @returns {Array}
   */
  static checkArrayAccess(access) {
    const issues = [];

    if (access.index === access.arrayLength) {
      issues.push({
        type: 'boundary_violation',
        location: access.location,
        message: `Accessing index ${access.index} of array with length ${access.arrayLength}`,
        suggestion: 'Last valid index is array.length - 1'
      });
    }

    if (access.index < 0) {
      issues.push({
        type: 'negative_index',
        location: access.location,
        message: 'Negative array index',
        suggestion: 'Ensure index is non-negative'
      });
    }

    return issues;
  }

  /**
   * Check comparison for off-by-one issues
   * @param {object} comp - Comparison context
   * @returns {Array}
   */
  static checkComparison(comp) {
    const issues = [];

    // Check for fence post errors
    if (comp.type === 'range_check') {
      if (comp.includesStart !== comp.includesEnd) {
        issues.push({
          type: 'asymmetric_range',
          location: comp.location,
          message: 'Asymmetric range boundaries (one inclusive, one exclusive)',
          suggestion: 'Verify if both boundaries should have same inclusivity'
        });
      }
    }

    return issues;
  }
}

// Example 4: Boundary Test Runner
class BoundaryTestRunner {
  constructor(validator) {
    this.validator = validator;
    this.results = [];
  }

  /**
   * Run all boundary tests
   * @param {Array} testCases - Test cases to run
   * @returns {object} - Test results
   */
  runTests(testCases) {
    this.results = [];

    testCases.forEach(tc => {
      const result = this.runTest(tc);
      this.results.push(result);
    });

    return this.generateReport();
  }

  /**
   * Run a single test
   * @param {object} testCase - Test case
   * @returns {object} - Test result
   */
  runTest(testCase) {
    const validationResult = this.validator.validate(testCase.field, testCase.value);
    const actualResult = validationResult.valid ? 'valid' : 'invalid';
    const passed = actualResult === testCase.expected;

    return {
      id: testCase.id,
      field: testCase.field,
      value: testCase.value,
      type: testCase.type,
      expected: testCase.expected,
      actual: actualResult,
      passed,
      details: validationResult
    };
  }

  /**
   * Generate test report
   * @returns {object}
   */
  generateReport() {
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.filter(r => !r.passed).length;

    const failedTests = this.results.filter(r => !r.passed);

    return {
      summary: {
        total: this.results.length,
        passed,
        failed,
        passRate: ((passed / this.results.length) * 100).toFixed(2) + '%'
      },
      byBoundaryType: this.groupByBoundaryType(),
      failedTests: failedTests.map(t => ({
        id: t.id,
        field: t.field,
        value: t.value,
        expected: t.expected,
        actual: t.actual,
        type: t.type
      })),
      allResults: this.results
    };
  }

  /**
   * Group results by boundary type
   * @returns {object}
   */
  groupByBoundaryType() {
    const groups = {};

    this.results.forEach(r => {
      const type = r.type || 'unknown';
      if (!groups[type]) {
        groups[type] = { passed: 0, failed: 0 };
      }
      r.passed ? groups[type].passed++ : groups[type].failed++;
    });

    return groups;
  }
}

// Demonstration
console.log('=== Boundary Testing Examples ===\n');

// Generate boundary test cases
const generator = new BoundaryValueTestGenerator();

console.log('--- Numeric Boundary Tests (Age: 18-65) ---\n');
const ageTests = generator.generateNumericBoundaries('age', 18, 65);
ageTests.forEach(tc => {
  console.log(`  ${tc.id}: ${tc.value} -> ${tc.expected} (${tc.description})`);
});

console.log('\n--- String Length Boundary Tests (Username: 3-20 chars) ---\n');
const usernameTests = generator.generateStringLengthBoundaries('username', 3, 20);
usernameTests.slice(0, 5).forEach(tc => {
  console.log(`  ${tc.id}: length=${tc.length} -> ${tc.expected} (${tc.type})`);
});

console.log('\n--- Array Size Boundary Tests (Items: 1-10) ---\n');
const itemsTests = generator.generateArraySizeBoundaries('items', 1, 10);
itemsTests.slice(0, 5).forEach(tc => {
  console.log(`  ${tc.id}: size=${tc.size} -> ${tc.expected} (${tc.type})`);
});

// Run boundary validation
console.log('\n--- Running Boundary Validation ---\n');

const validator = new BoundaryValidator({
  age: { type: 'number', min: 18, max: 65, integer: true },
  username: { type: 'string', minLength: 3, maxLength: 20 },
  items: { type: 'array', minSize: 1, maxSize: 10 }
});

const runner = new BoundaryTestRunner(validator);
const report = runner.runTests(ageTests);

console.log('Test Results:');
console.log(`  Total: ${report.summary.total}`);
console.log(`  Passed: ${report.summary.passed}`);
console.log(`  Failed: ${report.summary.failed}`);
console.log(`  Pass Rate: ${report.summary.passRate}`);

console.log('\nResults by Boundary Type:');
Object.entries(report.byBoundaryType).forEach(([type, counts]) => {
  console.log(`  ${type}: ${counts.passed} passed, ${counts.failed} failed`);
});

// Off-by-one detection
console.log('\n--- Off-By-One Error Detection ---\n');

const codeContext = {
  loops: [
    { condition: '<=', iteratingOverArray: true, location: 'line 15' },
    { start: 1, iteratingOverArray: true, location: 'line 23' }
  ],
  arrayAccesses: [
    { index: 10, arrayLength: 10, location: 'line 18' }
  ]
};

const issues = OffByOneDetector.analyze(codeContext);
console.log('Potential Off-By-One Issues:');
issues.forEach(issue => {
  console.log(`  [${issue.type}] ${issue.location}: ${issue.message}`);
  console.log(`    Suggestion: ${issue.suggestion}`);
});

/**
 * Boundary Testing Best Practices:
 *
 * 1. Test at exact boundaries: min, max
 *
 * 2. Test just inside boundaries: min+1, max-1
 *
 * 3. Test just outside boundaries: min-1, max+1
 *
 * 4. Test nominal values (middle of range)
 *
 * 5. Consider data types: integers have different boundaries than floats
 *
 * 6. Test empty/null cases for strings and arrays
 *
 * 7. Watch for off-by-one errors in loops and array access
 *
 * 8. Automate boundary test generation
 *
 * 9. Include boundary tests in CI/CD pipelines
 *
 * 10. Document expected behavior at boundaries
 */
