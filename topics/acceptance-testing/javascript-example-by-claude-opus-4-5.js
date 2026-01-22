/**
 * Acceptance Testing - Verifying Software Meets Requirements
 *
 * Acceptance testing evaluates whether a software application meets the
 * requirements and specifications defined by the client or user. It is the
 * final phase of testing before deployment, ensuring the software is ready
 * for production use by end-users.
 *
 * Key Concepts:
 * - Functional acceptance testing: Verifies features and behavior
 * - Non-functional acceptance testing: Verifies performance, security, scalability
 * - User Acceptance Testing (UAT): End-user validation
 * - Business Acceptance Testing (BAT): Business requirement verification
 * - Test scenarios based on real-world use cases
 */

// Example 1: Acceptance Test Framework
class AcceptanceTestRunner {
  constructor(applicationName) {
    this.applicationName = applicationName;
    this.testSuites = [];
    this.results = {
      passed: 0,
      failed: 0,
      skipped: 0,
      startTime: null,
      endTime: null
    };
  }

  /**
   * Add a test suite to the runner
   * @param {object} suite - Test suite configuration
   */
  addTestSuite(suite) {
    this.testSuites.push({
      name: suite.name,
      type: suite.type || 'functional', // 'functional' or 'non-functional'
      tests: suite.tests || [],
      setup: suite.setup || null,
      teardown: suite.teardown || null
    });
  }

  /**
   * Run all acceptance tests
   * @returns {object} - Test results
   */
  async runAll() {
    this.results.startTime = new Date();
    console.log(`\n=== Acceptance Tests for ${this.applicationName} ===\n`);

    for (const suite of this.testSuites) {
      await this.runSuite(suite);
    }

    this.results.endTime = new Date();
    return this.generateReport();
  }

  /**
   * Run a single test suite
   * @param {object} suite - Test suite to run
   */
  async runSuite(suite) {
    console.log(`\n--- Test Suite: ${suite.name} (${suite.type}) ---`);

    // Run setup if provided
    if (suite.setup) {
      try {
        await suite.setup();
      } catch (error) {
        console.log(`  Setup failed: ${error.message}`);
        return;
      }
    }

    // Run each test in the suite
    for (const test of suite.tests) {
      await this.runTest(test);
    }

    // Run teardown if provided
    if (suite.teardown) {
      try {
        await suite.teardown();
      } catch (error) {
        console.log(`  Teardown failed: ${error.message}`);
      }
    }
  }

  /**
   * Run a single test
   * @param {object} test - Test to run
   */
  async runTest(test) {
    const startTime = Date.now();

    if (test.skip) {
      console.log(`  ⊘ SKIP: ${test.name}`);
      this.results.skipped++;
      return;
    }

    try {
      await test.fn();
      const duration = Date.now() - startTime;
      console.log(`  ✓ PASS: ${test.name} (${duration}ms)`);
      this.results.passed++;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ✗ FAIL: ${test.name} (${duration}ms)`);
      console.log(`    Error: ${error.message}`);
      this.results.failed++;
    }
  }

  /**
   * Generate test report
   * @returns {object} - Test report
   */
  generateReport() {
    const total = this.results.passed + this.results.failed + this.results.skipped;
    const duration = this.results.endTime - this.results.startTime;

    return {
      application: this.applicationName,
      summary: {
        total,
        passed: this.results.passed,
        failed: this.results.failed,
        skipped: this.results.skipped,
        passRate: total > 0 ? ((this.results.passed / total) * 100).toFixed(2) + '%' : '0%',
        duration: `${duration}ms`
      },
      timestamp: this.results.endTime.toISOString(),
      status: this.results.failed === 0 ? 'PASSED' : 'FAILED'
    };
  }
}

// Example 2: Acceptance Criteria Validator
class AcceptanceCriteriaValidator {
  constructor() {
    this.criteria = [];
  }

  /**
   * Add acceptance criteria using Given-When-Then format
   * @param {object} criterion - Acceptance criterion
   */
  addCriterion(criterion) {
    this.criteria.push({
      id: criterion.id || `AC-${this.criteria.length + 1}`,
      title: criterion.title,
      given: criterion.given,
      when: criterion.when,
      then: criterion.then,
      priority: criterion.priority || 'medium',
      status: 'pending'
    });
  }

  /**
   * Validate a criterion
   * @param {string} id - Criterion ID
   * @param {Function} validationFn - Function that returns true if criterion is met
   * @returns {object} - Validation result
   */
  async validate(id, validationFn) {
    const criterion = this.criteria.find(c => c.id === id);

    if (!criterion) {
      return { success: false, error: `Criterion ${id} not found` };
    }

    try {
      const result = await validationFn();
      criterion.status = result ? 'passed' : 'failed';
      return {
        success: result,
        criterion: criterion
      };
    } catch (error) {
      criterion.status = 'error';
      return {
        success: false,
        criterion: criterion,
        error: error.message
      };
    }
  }

  /**
   * Get all criteria in a specific format
   * @returns {Array} - Formatted criteria
   */
  getFormattedCriteria() {
    return this.criteria.map(c => ({
      id: c.id,
      title: c.title,
      scenario: `Given ${c.given}\nWhen ${c.when}\nThen ${c.then}`,
      priority: c.priority,
      status: c.status
    }));
  }

  /**
   * Check if all criteria are met
   * @returns {boolean}
   */
  allCriteriaMet() {
    return this.criteria.every(c => c.status === 'passed');
  }
}

// Example 3: User Acceptance Test Scenario Builder
class UATScenarioBuilder {
  constructor(featureName) {
    this.featureName = featureName;
    this.scenarios = [];
    this.currentScenario = null;
  }

  /**
   * Start a new scenario
   * @param {string} name - Scenario name
   * @returns {UATScenarioBuilder} - Returns this for chaining
   */
  scenario(name) {
    this.currentScenario = {
      name,
      given: [],
      when: [],
      then: [],
      and: []
    };
    this.scenarios.push(this.currentScenario);
    return this;
  }

  /**
   * Add a Given condition (precondition)
   * @param {string} condition - Precondition description
   * @returns {UATScenarioBuilder}
   */
  given(condition) {
    if (this.currentScenario) {
      this.currentScenario.given.push(condition);
    }
    return this;
  }

  /**
   * Add a When action
   * @param {string} action - Action description
   * @returns {UATScenarioBuilder}
   */
  when(action) {
    if (this.currentScenario) {
      this.currentScenario.when.push(action);
    }
    return this;
  }

  /**
   * Add a Then expectation (expected outcome)
   * @param {string} expectation - Expected outcome description
   * @returns {UATScenarioBuilder}
   */
  then(expectation) {
    if (this.currentScenario) {
      this.currentScenario.then.push(expectation);
    }
    return this;
  }

  /**
   * Add an And clause (additional condition)
   * @param {string} clause - Additional clause
   * @returns {UATScenarioBuilder}
   */
  and(clause) {
    if (this.currentScenario) {
      this.currentScenario.and.push(clause);
    }
    return this;
  }

  /**
   * Build all scenarios
   * @returns {object} - Feature with scenarios
   */
  build() {
    return {
      feature: this.featureName,
      scenarioCount: this.scenarios.length,
      scenarios: this.scenarios
    };
  }

  /**
   * Export scenarios to Gherkin format
   * @returns {string} - Gherkin text
   */
  toGherkin() {
    let gherkin = `Feature: ${this.featureName}\n\n`;

    this.scenarios.forEach(scenario => {
      gherkin += `  Scenario: ${scenario.name}\n`;

      scenario.given.forEach((g, i) => {
        gherkin += i === 0 ? `    Given ${g}\n` : `    And ${g}\n`;
      });

      scenario.when.forEach((w, i) => {
        gherkin += i === 0 ? `    When ${w}\n` : `    And ${w}\n`;
      });

      scenario.then.forEach((t, i) => {
        gherkin += i === 0 ? `    Then ${t}\n` : `    And ${t}\n`;
      });

      gherkin += '\n';
    });

    return gherkin;
  }
}

// Example 4: Functional vs Non-Functional Acceptance Tests
class AcceptanceTestSuite {
  /**
   * Create functional acceptance tests for a shopping cart
   * @returns {Array} - Functional tests
   */
  static createFunctionalTests() {
    return [
      {
        name: 'User can add item to cart',
        fn: async () => {
          // Simulate adding item to cart
          const cart = { items: [] };
          const item = { id: 1, name: 'Test Product', price: 29.99 };
          cart.items.push(item);

          if (cart.items.length !== 1) {
            throw new Error('Item was not added to cart');
          }
          if (cart.items[0].id !== 1) {
            throw new Error('Wrong item in cart');
          }
        }
      },
      {
        name: 'User can remove item from cart',
        fn: async () => {
          const cart = { items: [{ id: 1, name: 'Test Product' }] };
          cart.items = cart.items.filter(i => i.id !== 1);

          if (cart.items.length !== 0) {
            throw new Error('Item was not removed from cart');
          }
        }
      },
      {
        name: 'Cart calculates total correctly',
        fn: async () => {
          const cart = {
            items: [
              { id: 1, price: 10.00, quantity: 2 },
              { id: 2, price: 15.50, quantity: 1 }
            ]
          };

          const total = cart.items.reduce((sum, item) =>
            sum + (item.price * item.quantity), 0
          );

          if (total !== 35.50) {
            throw new Error(`Expected 35.50, got ${total}`);
          }
        }
      },
      {
        name: 'User can apply discount code',
        fn: async () => {
          const subtotal = 100;
          const discountCode = 'SAVE20';
          const discounts = { 'SAVE20': 0.20, 'SAVE10': 0.10 };

          const discount = discounts[discountCode] || 0;
          const total = subtotal * (1 - discount);

          if (total !== 80) {
            throw new Error(`Expected 80, got ${total}`);
          }
        }
      }
    ];
  }

  /**
   * Create non-functional acceptance tests
   * @returns {Array} - Non-functional tests
   */
  static createNonFunctionalTests() {
    return [
      {
        name: 'Page loads within 2 seconds',
        fn: async () => {
          const startTime = Date.now();
          // Simulate page load
          await new Promise(resolve => setTimeout(resolve, 500));
          const loadTime = Date.now() - startTime;

          if (loadTime > 2000) {
            throw new Error(`Page load took ${loadTime}ms, exceeds 2000ms limit`);
          }
        }
      },
      {
        name: 'API responds within 500ms',
        fn: async () => {
          const startTime = Date.now();
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 200));
          const responseTime = Date.now() - startTime;

          if (responseTime > 500) {
            throw new Error(`API response took ${responseTime}ms, exceeds 500ms limit`);
          }
        }
      },
      {
        name: 'System handles 100 concurrent users',
        fn: async () => {
          const concurrentUsers = 100;
          const maxCapacity = 150;

          // Simulate load check
          const canHandle = concurrentUsers <= maxCapacity;

          if (!canHandle) {
            throw new Error('System cannot handle required concurrent users');
          }
        }
      },
      {
        name: 'Data is encrypted at rest',
        fn: async () => {
          // Simulate encryption check
          const storageConfig = {
            encryption: 'AES-256',
            encryptionEnabled: true
          };

          if (!storageConfig.encryptionEnabled) {
            throw new Error('Storage encryption is not enabled');
          }
        }
      }
    ];
  }
}

// Demonstration
console.log('=== Acceptance Testing Examples ===');

// Run acceptance tests
const runner = new AcceptanceTestRunner('E-Commerce Application');

runner.addTestSuite({
  name: 'Shopping Cart Functionality',
  type: 'functional',
  tests: AcceptanceTestSuite.createFunctionalTests()
});

runner.addTestSuite({
  name: 'Performance Requirements',
  type: 'non-functional',
  tests: AcceptanceTestSuite.createNonFunctionalTests()
});

runner.runAll().then(report => {
  console.log('\n=== Test Report ===');
  console.log(JSON.stringify(report, null, 2));
});

// Acceptance criteria example
console.log('\n=== Acceptance Criteria Validation ===\n');

const validator = new AcceptanceCriteriaValidator();

validator.addCriterion({
  id: 'AC-001',
  title: 'User Registration',
  given: 'a visitor is on the registration page',
  when: 'they submit valid registration details',
  then: 'they should receive a confirmation email',
  priority: 'high'
});

validator.addCriterion({
  id: 'AC-002',
  title: 'Password Reset',
  given: 'a user has forgotten their password',
  when: 'they request a password reset',
  then: 'they should receive a reset link via email',
  priority: 'high'
});

console.log('Formatted Acceptance Criteria:');
validator.getFormattedCriteria().forEach(c => {
  console.log(`\n${c.id}: ${c.title}`);
  console.log(c.scenario);
});

// UAT Scenario Builder
console.log('\n=== UAT Scenarios (Gherkin Format) ===\n');

const uat = new UATScenarioBuilder('User Login');

uat.scenario('Successful login with valid credentials')
  .given('the user is on the login page')
  .and('the user has a valid account')
  .when('the user enters correct email and password')
  .and('clicks the login button')
  .then('the user should be redirected to the dashboard')
  .and('see a welcome message');

uat.scenario('Failed login with invalid password')
  .given('the user is on the login page')
  .when('the user enters correct email but wrong password')
  .and('clicks the login button')
  .then('an error message should be displayed')
  .and('the user should remain on the login page');

console.log(uat.toGherkin());

/**
 * Acceptance Testing Best Practices:
 *
 * 1. Involve Stakeholders: Include end-users, business analysts, and QA in test creation
 *
 * 2. Use Real-World Scenarios: Base tests on actual user workflows and use cases
 *
 * 3. Clear Acceptance Criteria: Define specific, measurable, achievable criteria
 *
 * 4. Automate Where Possible: Reduce manual effort while maintaining thoroughness
 *
 * 5. Test Both Functional and Non-Functional: Cover features AND performance/security
 *
 * 6. Document Everything: Maintain clear records of tests, results, and decisions
 *
 * 7. Regression Testing: Re-run acceptance tests after changes to ensure stability
 *
 * 8. Environment Parity: Test in an environment similar to production
 */
