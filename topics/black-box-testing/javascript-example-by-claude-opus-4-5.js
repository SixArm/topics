/**
 * Black-Box Testing - Testing Without Internal Knowledge
 *
 * Black-box testing evaluates application functionality without knowledge of
 * internal code structure, implementation details, or system architecture.
 * Testers focus exclusively on inputs and outputs, treating software as a
 * "black box" where only external behavior is observable.
 *
 * Key Concepts:
 * - Equivalence partitioning
 * - Boundary value analysis
 * - Decision table testing
 * - State transition testing
 * - Use case testing
 * - Error guessing
 */

// Example 1: Equivalence Partitioning
class EquivalencePartitioner {
  constructor() {
    this.partitions = [];
  }

  /**
   * Define input partitions for a field
   * @param {string} fieldName - Name of the input field
   * @param {object} config - Partition configuration
   */
  definePartitions(fieldName, config) {
    const partitionSet = {
      field: fieldName,
      valid: [],
      invalid: []
    };

    // Create valid partitions
    if (config.validRanges) {
      config.validRanges.forEach((range, index) => {
        partitionSet.valid.push({
          id: `${fieldName}_valid_${index + 1}`,
          description: range.description || `Valid range ${index + 1}`,
          range: range,
          representative: this.getRepresentative(range)
        });
      });
    }

    // Create invalid partitions
    if (config.invalidRanges) {
      config.invalidRanges.forEach((range, index) => {
        partitionSet.invalid.push({
          id: `${fieldName}_invalid_${index + 1}`,
          description: range.description || `Invalid range ${index + 1}`,
          range: range,
          representative: this.getRepresentative(range)
        });
      });
    }

    this.partitions.push(partitionSet);
    return partitionSet;
  }

  /**
   * Get representative value from a range
   * @param {object} range - Range definition
   * @returns {*} - Representative value
   */
  getRepresentative(range) {
    if (range.values) {
      // Discrete values - pick middle one
      return range.values[Math.floor(range.values.length / 2)];
    }
    if (range.min !== undefined && range.max !== undefined) {
      // Numeric range - pick middle
      return Math.floor((range.min + range.max) / 2);
    }
    if (range.pattern) {
      // Pattern - return example
      return range.example || 'example';
    }
    return range.value;
  }

  /**
   * Generate test cases from partitions
   * @returns {Array} - Test cases
   */
  generateTestCases() {
    const testCases = [];

    this.partitions.forEach(partition => {
      // Valid partition test cases
      partition.valid.forEach(p => {
        testCases.push({
          id: `TC_${p.id}`,
          field: partition.field,
          input: p.representative,
          expectedResult: 'valid',
          partition: p.description
        });
      });

      // Invalid partition test cases
      partition.invalid.forEach(p => {
        testCases.push({
          id: `TC_${p.id}`,
          field: partition.field,
          input: p.representative,
          expectedResult: 'invalid',
          partition: p.description
        });
      });
    });

    return testCases;
  }
}

// Example 2: Boundary Value Analyzer
class BoundaryValueAnalyzer {
  /**
   * Generate boundary test values
   * @param {number} min - Minimum valid value
   * @param {number} max - Maximum valid value
   * @returns {Array} - Boundary test values
   */
  static generateBoundaryValues(min, max) {
    return [
      { value: min - 1, type: 'below_min', expected: 'invalid' },
      { value: min, type: 'at_min', expected: 'valid' },
      { value: min + 1, type: 'above_min', expected: 'valid' },
      { value: Math.floor((min + max) / 2), type: 'nominal', expected: 'valid' },
      { value: max - 1, type: 'below_max', expected: 'valid' },
      { value: max, type: 'at_max', expected: 'valid' },
      { value: max + 1, type: 'above_max', expected: 'invalid' }
    ];
  }

  /**
   * Generate boundary test cases for multiple inputs
   * @param {object} inputs - Input specifications
   * @returns {Array} - Test cases
   */
  static generateTestCases(inputs) {
    const testCases = [];

    Object.entries(inputs).forEach(([fieldName, spec]) => {
      const boundaries = this.generateBoundaryValues(spec.min, spec.max);

      boundaries.forEach(boundary => {
        testCases.push({
          id: `BV_${fieldName}_${boundary.type}`,
          field: fieldName,
          value: boundary.value,
          boundaryType: boundary.type,
          expectedValidity: boundary.expected,
          description: `${fieldName} at ${boundary.type}: ${boundary.value}`
        });
      });
    });

    return testCases;
  }
}

// Example 3: Decision Table Generator
class DecisionTableGenerator {
  constructor(tableName) {
    this.tableName = tableName;
    this.conditions = [];
    this.actions = [];
    this.rules = [];
  }

  /**
   * Add a condition to the table
   * @param {string} name - Condition name
   * @param {Array} values - Possible values (typically [true, false])
   */
  addCondition(name, values = [true, false]) {
    this.conditions.push({ name, values });
  }

  /**
   * Add an action to the table
   * @param {string} name - Action name
   */
  addAction(name) {
    this.actions.push({ name });
  }

  /**
   * Add a rule to the table
   * @param {object} rule - Rule definition
   */
  addRule(rule) {
    this.rules.push({
      id: `R${this.rules.length + 1}`,
      conditions: rule.conditions,
      actions: rule.actions,
      description: rule.description || ''
    });
  }

  /**
   * Generate all possible condition combinations
   * @returns {Array} - All combinations
   */
  generateAllCombinations() {
    const combinations = [];

    const generate = (index, current) => {
      if (index === this.conditions.length) {
        combinations.push([...current]);
        return;
      }

      for (const value of this.conditions[index].values) {
        current.push(value);
        generate(index + 1, current);
        current.pop();
      }
    };

    generate(0, []);
    return combinations;
  }

  /**
   * Generate test cases from decision table
   * @returns {Array} - Test cases
   */
  generateTestCases() {
    return this.rules.map(rule => ({
      id: `DT_${this.tableName}_${rule.id}`,
      conditions: this.conditions.map((c, i) => ({
        condition: c.name,
        value: rule.conditions[i]
      })),
      expectedActions: rule.actions,
      description: rule.description
    }));
  }

  /**
   * Render table as string
   * @returns {string}
   */
  toString() {
    let table = `Decision Table: ${this.tableName}\n`;
    table += '='.repeat(50) + '\n';

    // Header
    table += 'Conditions/Actions'.padEnd(30);
    this.rules.forEach(r => {
      table += r.id.padStart(5);
    });
    table += '\n' + '-'.repeat(50) + '\n';

    // Conditions
    this.conditions.forEach((c, i) => {
      table += c.name.padEnd(30);
      this.rules.forEach(r => {
        table += (r.conditions[i] ? 'Y' : 'N').padStart(5);
      });
      table += '\n';
    });

    table += '-'.repeat(50) + '\n';

    // Actions
    this.actions.forEach(a => {
      table += a.name.padEnd(30);
      this.rules.forEach(r => {
        table += (r.actions.includes(a.name) ? 'X' : '-').padStart(5);
      });
      table += '\n';
    });

    return table;
  }
}

// Example 4: State Transition Tester
class StateTransitionTester {
  constructor(systemName) {
    this.systemName = systemName;
    this.states = new Map();
    this.transitions = [];
    this.initialState = null;
  }

  /**
   * Add a state to the system
   * @param {string} name - State name
   * @param {object} options - State options
   */
  addState(name, options = {}) {
    this.states.set(name, {
      name,
      isInitial: options.isInitial || false,
      isFinal: options.isFinal || false,
      description: options.description || ''
    });

    if (options.isInitial) {
      this.initialState = name;
    }
  }

  /**
   * Add a transition between states
   * @param {string} from - Source state
   * @param {string} to - Target state
   * @param {string} event - Triggering event
   * @param {string} guard - Optional guard condition
   */
  addTransition(from, to, event, guard = null) {
    this.transitions.push({
      from,
      to,
      event,
      guard,
      id: `T${this.transitions.length + 1}`
    });
  }

  /**
   * Generate test cases for all transitions
   * @returns {Array} - Test cases covering all transitions
   */
  generateTransitionCoverage() {
    return this.transitions.map(t => ({
      id: `ST_${t.id}`,
      testType: 'transition_coverage',
      initialState: t.from,
      event: t.event,
      guard: t.guard,
      expectedState: t.to,
      description: `${t.from} --[${t.event}]--> ${t.to}`
    }));
  }

  /**
   * Generate test cases for invalid transitions
   * @returns {Array} - Test cases for invalid transitions
   */
  generateInvalidTransitions() {
    const testCases = [];
    const allEvents = [...new Set(this.transitions.map(t => t.event))];

    for (const [stateName] of this.states) {
      const validEvents = this.transitions
        .filter(t => t.from === stateName)
        .map(t => t.event);

      const invalidEvents = allEvents.filter(e => !validEvents.includes(e));

      invalidEvents.forEach(event => {
        testCases.push({
          id: `ST_INVALID_${stateName}_${event}`,
          testType: 'invalid_transition',
          initialState: stateName,
          event: event,
          expectedBehavior: 'error_or_no_change',
          description: `Invalid: ${event} in state ${stateName}`
        });
      });
    }

    return testCases;
  }

  /**
   * Generate state transition diagram (Mermaid format)
   * @returns {string}
   */
  toMermaid() {
    let diagram = 'stateDiagram-v2\n';

    if (this.initialState) {
      diagram += `    [*] --> ${this.initialState}\n`;
    }

    this.transitions.forEach(t => {
      const label = t.guard ? `${t.event} [${t.guard}]` : t.event;
      diagram += `    ${t.from} --> ${t.to}: ${label}\n`;
    });

    for (const [name, state] of this.states) {
      if (state.isFinal) {
        diagram += `    ${name} --> [*]\n`;
      }
    }

    return diagram;
  }
}

// Example 5: Black-Box Test Case Generator
class BlackBoxTestGenerator {
  constructor(specification) {
    this.spec = specification;
    this.testCases = [];
  }

  /**
   * Generate comprehensive test cases
   * @returns {Array}
   */
  generateAll() {
    this.testCases = [];

    // Equivalence partitioning
    if (this.spec.inputs) {
      this.generateEquivalenceTests();
    }

    // Boundary value analysis
    if (this.spec.boundaries) {
      this.generateBoundaryTests();
    }

    // Use case tests
    if (this.spec.useCases) {
      this.generateUseCaseTests();
    }

    // Error guessing
    this.generateErrorGuessTests();

    return this.testCases;
  }

  /**
   * Generate equivalence partitioning tests
   */
  generateEquivalenceTests() {
    const partitioner = new EquivalencePartitioner();

    Object.entries(this.spec.inputs).forEach(([field, config]) => {
      partitioner.definePartitions(field, config);
    });

    this.testCases.push(...partitioner.generateTestCases());
  }

  /**
   * Generate boundary value tests
   */
  generateBoundaryTests() {
    const tests = BoundaryValueAnalyzer.generateTestCases(this.spec.boundaries);
    this.testCases.push(...tests);
  }

  /**
   * Generate use case tests
   */
  generateUseCaseTests() {
    this.spec.useCases.forEach((useCase, index) => {
      this.testCases.push({
        id: `UC_${index + 1}`,
        type: 'use_case',
        name: useCase.name,
        preconditions: useCase.preconditions,
        steps: useCase.steps,
        expectedOutcome: useCase.expectedOutcome
      });
    });
  }

  /**
   * Generate error guessing tests based on common issues
   */
  generateErrorGuessTests() {
    const commonErrors = [
      { input: null, description: 'Null input' },
      { input: undefined, description: 'Undefined input' },
      { input: '', description: 'Empty string' },
      { input: ' ', description: 'Whitespace only' },
      { input: '   \n\t  ', description: 'Mixed whitespace' },
      { input: 0, description: 'Zero value' },
      { input: -1, description: 'Negative value' },
      { input: Number.MAX_SAFE_INTEGER, description: 'Max integer' },
      { input: Number.MIN_SAFE_INTEGER, description: 'Min integer' },
      { input: Infinity, description: 'Infinity' },
      { input: NaN, description: 'NaN' },
      { input: [], description: 'Empty array' },
      { input: {}, description: 'Empty object' },
      { input: '<script>alert("xss")</script>', description: 'XSS attempt' },
      { input: "'; DROP TABLE users; --", description: 'SQL injection attempt' }
    ];

    commonErrors.forEach((error, index) => {
      this.testCases.push({
        id: `EG_${index + 1}`,
        type: 'error_guessing',
        input: error.input,
        description: error.description,
        expectedBehavior: 'handle_gracefully'
      });
    });
  }
}

// Demonstration
console.log('=== Black-Box Testing Examples ===\n');

// Equivalence Partitioning
console.log('--- Equivalence Partitioning ---\n');
const partitioner = new EquivalencePartitioner();

partitioner.definePartitions('age', {
  validRanges: [
    { min: 18, max: 65, description: 'Working age adults' },
    { min: 66, max: 120, description: 'Seniors' }
  ],
  invalidRanges: [
    { min: -100, max: -1, description: 'Negative ages' },
    { min: 0, max: 17, description: 'Minors' },
    { min: 121, max: 999, description: 'Impossible ages' }
  ]
});

const epTests = partitioner.generateTestCases();
console.log('Equivalence Partition Test Cases:');
epTests.forEach(tc => {
  console.log(`  ${tc.id}: ${tc.field}=${tc.input} -> ${tc.expectedResult} (${tc.partition})`);
});

// Boundary Value Analysis
console.log('\n--- Boundary Value Analysis ---\n');
const bvTests = BoundaryValueAnalyzer.generateTestCases({
  quantity: { min: 1, max: 100 },
  discount: { min: 0, max: 50 }
});

console.log('Boundary Value Test Cases:');
bvTests.slice(0, 7).forEach(tc => {
  console.log(`  ${tc.id}: ${tc.value} -> ${tc.expectedValidity}`);
});
console.log('  ... and more');

// Decision Table
console.log('\n--- Decision Table ---\n');
const loginTable = new DecisionTableGenerator('Login');

loginTable.addCondition('Valid Username');
loginTable.addCondition('Valid Password');
loginTable.addCondition('Account Locked');

loginTable.addAction('Grant Access');
loginTable.addAction('Show Error');
loginTable.addAction('Lock Account');

loginTable.addRule({
  conditions: [true, true, false],
  actions: ['Grant Access'],
  description: 'Successful login'
});

loginTable.addRule({
  conditions: [true, false, false],
  actions: ['Show Error'],
  description: 'Wrong password'
});

loginTable.addRule({
  conditions: [false, true, false],
  actions: ['Show Error'],
  description: 'Wrong username'
});

loginTable.addRule({
  conditions: [true, true, true],
  actions: ['Show Error'],
  description: 'Account locked'
});

console.log(loginTable.toString());

// State Transition
console.log('\n--- State Transition Testing ---\n');
const orderSystem = new StateTransitionTester('Order Processing');

orderSystem.addState('Created', { isInitial: true });
orderSystem.addState('Confirmed');
orderSystem.addState('Shipped');
orderSystem.addState('Delivered', { isFinal: true });
orderSystem.addState('Cancelled', { isFinal: true });

orderSystem.addTransition('Created', 'Confirmed', 'confirm');
orderSystem.addTransition('Created', 'Cancelled', 'cancel');
orderSystem.addTransition('Confirmed', 'Shipped', 'ship');
orderSystem.addTransition('Confirmed', 'Cancelled', 'cancel');
orderSystem.addTransition('Shipped', 'Delivered', 'deliver');

console.log('State Transition Test Cases:');
orderSystem.generateTransitionCoverage().forEach(tc => {
  console.log(`  ${tc.description}`);
});

console.log('\nInvalid Transition Tests:');
orderSystem.generateInvalidTransitions().slice(0, 3).forEach(tc => {
  console.log(`  ${tc.description}`);
});

/**
 * Black-Box Testing Best Practices:
 *
 * 1. Base tests on requirements, not implementation
 *
 * 2. Use multiple techniques: EP, BVA, decision tables, state transition
 *
 * 3. Include positive AND negative test cases
 *
 * 4. Test boundaries thoroughly
 *
 * 5. Consider real-world usage patterns
 *
 * 6. Use error guessing based on experience
 *
 * 7. Document expected behavior clearly
 *
 * 8. Automate repetitive test execution
 *
 * 9. Maintain independence from developers
 *
 * 10. Focus on user-visible behavior
 */
