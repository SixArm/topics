/**
 * Behavior Driven Development (BDD) - Collaborative Testing Methodology
 *
 * BDD is an agile methodology emphasizing collaboration between developers,
 * testers, and business stakeholders. It extends Test Driven Development (TDD)
 * by focusing on behavior specification using natural language that all
 * stakeholders can understand.
 *
 * Key Concepts:
 * - Given-When-Then syntax (Gherkin)
 * - Ubiquitous language
 * - Living documentation
 * - Specification by example
 * - Executable specifications
 */

// Example 1: Gherkin Parser
class GherkinParser {
  constructor() {
    this.features = [];
  }

  /**
   * Parse Gherkin text into structured format
   * @param {string} gherkinText - Gherkin formatted text
   * @returns {object} - Parsed feature
   */
  parse(gherkinText) {
    const lines = gherkinText.split('\n').map(l => l.trim()).filter(l => l);
    const feature = {
      name: '',
      description: '',
      background: null,
      scenarios: []
    };

    let currentScenario = null;
    let currentStep = null;
    let lastKeyword = null;

    for (const line of lines) {
      if (line.startsWith('Feature:')) {
        feature.name = line.replace('Feature:', '').trim();
      } else if (line.startsWith('Background:')) {
        feature.background = { steps: [] };
        currentScenario = feature.background;
      } else if (line.startsWith('Scenario:') || line.startsWith('Scenario Outline:')) {
        currentScenario = {
          name: line.replace(/Scenario( Outline)?:/, '').trim(),
          type: line.includes('Outline') ? 'outline' : 'scenario',
          steps: [],
          examples: []
        };
        feature.scenarios.push(currentScenario);
      } else if (line.startsWith('Given')) {
        currentStep = { keyword: 'Given', text: line.replace('Given', '').trim() };
        currentScenario?.steps.push(currentStep);
        lastKeyword = 'Given';
      } else if (line.startsWith('When')) {
        currentStep = { keyword: 'When', text: line.replace('When', '').trim() };
        currentScenario?.steps.push(currentStep);
        lastKeyword = 'When';
      } else if (line.startsWith('Then')) {
        currentStep = { keyword: 'Then', text: line.replace('Then', '').trim() };
        currentScenario?.steps.push(currentStep);
        lastKeyword = 'Then';
      } else if (line.startsWith('And') || line.startsWith('But')) {
        currentStep = { keyword: lastKeyword, text: line.replace(/And|But/, '').trim() };
        currentScenario?.steps.push(currentStep);
      } else if (line.startsWith('Examples:')) {
        // Handle examples for scenario outlines
      } else if (line.startsWith('|')) {
        // Handle data tables
        this.parseTableRow(line, currentScenario);
      }
    }

    this.features.push(feature);
    return feature;
  }

  /**
   * Parse a table row
   * @param {string} line - Table row line
   * @param {object} scenario - Current scenario
   */
  parseTableRow(line, scenario) {
    const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
    if (scenario?.examples) {
      scenario.examples.push(cells);
    }
  }
}

// Example 2: Step Definition Registry
class StepDefinitionRegistry {
  constructor() {
    this.steps = {
      Given: new Map(),
      When: new Map(),
      Then: new Map()
    };
  }

  /**
   * Register a Given step
   * @param {string|RegExp} pattern - Step pattern
   * @param {Function} handler - Step implementation
   */
  Given(pattern, handler) {
    this.registerStep('Given', pattern, handler);
  }

  /**
   * Register a When step
   * @param {string|RegExp} pattern - Step pattern
   * @param {Function} handler - Step implementation
   */
  When(pattern, handler) {
    this.registerStep('When', pattern, handler);
  }

  /**
   * Register a Then step
   * @param {string|RegExp} pattern - Step pattern
   * @param {Function} handler - Step implementation
   */
  Then(pattern, handler) {
    this.registerStep('Then', pattern, handler);
  }

  /**
   * Register a step definition
   * @param {string} keyword - Step keyword
   * @param {string|RegExp} pattern - Step pattern
   * @param {Function} handler - Step implementation
   */
  registerStep(keyword, pattern, handler) {
    const regex = typeof pattern === 'string'
      ? this.patternToRegex(pattern)
      : pattern;

    this.steps[keyword].set(regex, handler);
  }

  /**
   * Convert pattern string to regex
   * @param {string} pattern - Pattern with placeholders
   * @returns {RegExp}
   */
  patternToRegex(pattern) {
    // Convert {param} placeholders to capture groups
    const regexStr = pattern
      .replace(/\{string\}/g, '"([^"]*)"')
      .replace(/\{int\}/g, '(\\d+)')
      .replace(/\{float\}/g, '([\\d.]+)')
      .replace(/\{word\}/g, '(\\w+)');

    return new RegExp(`^${regexStr}$`);
  }

  /**
   * Find matching step definition
   * @param {string} keyword - Step keyword
   * @param {string} text - Step text
   * @returns {object|null} - Match result
   */
  findStep(keyword, text) {
    for (const [regex, handler] of this.steps[keyword]) {
      const match = text.match(regex);
      if (match) {
        return {
          handler,
          params: match.slice(1)
        };
      }
    }
    return null;
  }
}

// Example 3: BDD Test Runner
class BDDTestRunner {
  constructor() {
    this.registry = new StepDefinitionRegistry();
    this.world = {}; // Shared state between steps
    this.results = [];
    this.hooks = {
      beforeScenario: [],
      afterScenario: [],
      beforeStep: [],
      afterStep: []
    };
  }

  /**
   * Register a before scenario hook
   * @param {Function} hook - Hook function
   */
  beforeScenario(hook) {
    this.hooks.beforeScenario.push(hook);
  }

  /**
   * Register an after scenario hook
   * @param {Function} hook - Hook function
   */
  afterScenario(hook) {
    this.hooks.afterScenario.push(hook);
  }

  /**
   * Run hooks of a specific type
   * @param {string} type - Hook type
   * @param {object} context - Context to pass to hooks
   */
  async runHooks(type, context) {
    for (const hook of this.hooks[type]) {
      await hook(context);
    }
  }

  /**
   * Run a feature
   * @param {object} feature - Parsed feature
   * @returns {object} - Results
   */
  async runFeature(feature) {
    console.log(`\nFeature: ${feature.name}`);

    const featureResult = {
      name: feature.name,
      scenarios: [],
      passed: true
    };

    for (const scenario of feature.scenarios) {
      const scenarioResult = await this.runScenario(scenario, feature.background);
      featureResult.scenarios.push(scenarioResult);
      if (!scenarioResult.passed) {
        featureResult.passed = false;
      }
    }

    return featureResult;
  }

  /**
   * Run a scenario
   * @param {object} scenario - Scenario to run
   * @param {object} background - Background steps
   * @returns {object} - Results
   */
  async runScenario(scenario, background) {
    console.log(`\n  Scenario: ${scenario.name}`);

    this.world = {}; // Reset world for each scenario
    await this.runHooks('beforeScenario', { scenario, world: this.world });

    const scenarioResult = {
      name: scenario.name,
      steps: [],
      passed: true
    };

    // Run background steps first
    if (background) {
      for (const step of background.steps) {
        const result = await this.runStep(step);
        if (!result.passed) {
          scenarioResult.passed = false;
          break;
        }
      }
    }

    // Run scenario steps
    if (scenarioResult.passed) {
      for (const step of scenario.steps) {
        const result = await this.runStep(step);
        scenarioResult.steps.push(result);
        if (!result.passed) {
          scenarioResult.passed = false;
          // Mark remaining steps as skipped
          break;
        }
      }
    }

    await this.runHooks('afterScenario', { scenario, world: this.world, result: scenarioResult });

    const status = scenarioResult.passed ? '✓' : '✗';
    console.log(`    ${status} ${scenarioResult.passed ? 'Passed' : 'Failed'}`);

    return scenarioResult;
  }

  /**
   * Run a single step
   * @param {object} step - Step to run
   * @returns {object} - Step result
   */
  async runStep(step) {
    const match = this.registry.findStep(step.keyword, step.text);
    const stepResult = {
      keyword: step.keyword,
      text: step.text,
      passed: false,
      error: null
    };

    if (!match) {
      stepResult.error = 'Step definition not found';
      console.log(`      ${step.keyword} ${step.text} - UNDEFINED`);
      return stepResult;
    }

    try {
      await match.handler.apply(this.world, match.params);
      stepResult.passed = true;
      console.log(`      ${step.keyword} ${step.text} - ✓`);
    } catch (error) {
      stepResult.error = error.message;
      console.log(`      ${step.keyword} ${step.text} - ✗`);
      console.log(`        Error: ${error.message}`);
    }

    return stepResult;
  }
}

// Example 4: Shopping Cart BDD Example
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountCode = null;
  }

  addItem(name, price, quantity = 1) {
    const existing = this.items.find(i => i.name === name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ name, price: parseFloat(price), quantity });
    }
  }

  removeItem(name) {
    this.items = this.items.filter(i => i.name !== name);
  }

  applyDiscount(code) {
    this.discountCode = code;
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    if (this.discountCode === 'SAVE10') {
      return subtotal * 0.9;
    }
    if (this.discountCode === 'SAVE20') {
      return subtotal * 0.8;
    }
    return subtotal;
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Example 5: BDD Specification Builder
class SpecificationBuilder {
  constructor(featureName) {
    this.feature = {
      name: featureName,
      description: '',
      scenarios: []
    };
    this.currentScenario = null;
  }

  /**
   * Set feature description
   * @param {string} description - Feature description
   * @returns {SpecificationBuilder}
   */
  as(description) {
    this.feature.description = description;
    return this;
  }

  /**
   * Start a new scenario
   * @param {string} name - Scenario name
   * @returns {SpecificationBuilder}
   */
  scenario(name) {
    this.currentScenario = {
      name,
      given: [],
      when: [],
      then: []
    };
    this.feature.scenarios.push(this.currentScenario);
    return this;
  }

  /**
   * Add a Given condition
   * @param {string} condition - Precondition
   * @returns {SpecificationBuilder}
   */
  given(condition) {
    this.currentScenario.given.push(condition);
    return this;
  }

  /**
   * Add a When action
   * @param {string} action - Action
   * @returns {SpecificationBuilder}
   */
  when(action) {
    this.currentScenario.when.push(action);
    return this;
  }

  /**
   * Add a Then expectation
   * @param {string} expectation - Expected outcome
   * @returns {SpecificationBuilder}
   */
  then(expectation) {
    this.currentScenario.then.push(expectation);
    return this;
  }

  /**
   * Add additional condition (And)
   * @param {string} text - Additional text
   * @returns {SpecificationBuilder}
   */
  and(text) {
    const lastKeyword = this.getLastKeyword();
    this.currentScenario[lastKeyword].push(text);
    return this;
  }

  /**
   * Get the last used keyword
   * @returns {string}
   */
  getLastKeyword() {
    if (this.currentScenario.then.length > 0) return 'then';
    if (this.currentScenario.when.length > 0) return 'when';
    return 'given';
  }

  /**
   * Build and return the specification
   * @returns {object}
   */
  build() {
    return this.feature;
  }

  /**
   * Export to Gherkin format
   * @returns {string}
   */
  toGherkin() {
    let gherkin = `Feature: ${this.feature.name}\n`;
    if (this.feature.description) {
      gherkin += `  ${this.feature.description}\n`;
    }
    gherkin += '\n';

    for (const scenario of this.feature.scenarios) {
      gherkin += `  Scenario: ${scenario.name}\n`;

      scenario.given.forEach((g, i) => {
        const keyword = i === 0 ? 'Given' : 'And';
        gherkin += `    ${keyword} ${g}\n`;
      });

      scenario.when.forEach((w, i) => {
        const keyword = i === 0 ? 'When' : 'And';
        gherkin += `    ${keyword} ${w}\n`;
      });

      scenario.then.forEach((t, i) => {
        const keyword = i === 0 ? 'Then' : 'And';
        gherkin += `    ${keyword} ${t}\n`;
      });

      gherkin += '\n';
    }

    return gherkin;
  }
}

// Demonstration
console.log('=== Behavior Driven Development Examples ===\n');

// Create step definitions
const runner = new BDDTestRunner();

runner.registry.Given('an empty shopping cart', function() {
  this.cart = new ShoppingCart();
});

runner.registry.Given('a shopping cart with {int} items', function(count) {
  this.cart = new ShoppingCart();
  for (let i = 0; i < parseInt(count); i++) {
    this.cart.addItem(`Item ${i + 1}`, 10.00);
  }
});

runner.registry.When('I add {string} priced at ${float} to the cart', function(item, price) {
  this.cart.addItem(item, parseFloat(price));
});

runner.registry.When('I remove {string} from the cart', function(item) {
  this.cart.removeItem(item);
});

runner.registry.When('I apply discount code {string}', function(code) {
  this.cart.applyDiscount(code);
});

runner.registry.Then('the cart should contain {int} item(s)', function(count) {
  const actual = this.cart.getItemCount();
  if (actual !== parseInt(count)) {
    throw new Error(`Expected ${count} items, but got ${actual}`);
  }
});

runner.registry.Then('the cart total should be ${float}', function(expected) {
  const actual = this.cart.getTotal();
  if (Math.abs(actual - parseFloat(expected)) > 0.01) {
    throw new Error(`Expected total $${expected}, but got $${actual.toFixed(2)}`);
  }
});

runner.registry.Then('the cart should be empty', function() {
  if (!this.cart.isEmpty()) {
    throw new Error('Expected cart to be empty');
  }
});

// Define feature using builder
const spec = new SpecificationBuilder('Shopping Cart')
  .as('A customer shopping online')
  .scenario('Add item to empty cart')
    .given('an empty shopping cart')
    .when('I add "Apple" priced at $1.50 to the cart')
    .then('the cart should contain 1 item(s)')
    .and('the cart total should be $1.50')
  .scenario('Apply discount code')
    .given('an empty shopping cart')
    .when('I add "Laptop" priced at $100.00 to the cart')
    .and('I apply discount code "SAVE10"')
    .then('the cart total should be $90.00')
  .scenario('Remove item from cart')
    .given('a shopping cart with 2 items')
    .when('I remove "Item 1" from the cart')
    .then('the cart should contain 1 item(s)')
  .build();

console.log('--- Gherkin Specification ---\n');
console.log(new SpecificationBuilder('Shopping Cart')
  .scenario('Add item to empty cart')
    .given('an empty shopping cart')
    .when('I add "Apple" priced at $1.50 to the cart')
    .then('the cart should contain 1 item(s)')
  .toGherkin());

// Parse and run feature
console.log('--- Running BDD Tests ---');

const gherkinText = `
Feature: Shopping Cart
  As a customer I want to manage my shopping cart

  Scenario: Add item to empty cart
    Given an empty shopping cart
    When I add "Apple" priced at $1.50 to the cart
    Then the cart should contain 1 item(s)

  Scenario: Apply discount code
    Given an empty shopping cart
    When I add "Laptop" priced at $100.00 to the cart
    When I apply discount code "SAVE10"
    Then the cart total should be $90.00
`;

const parser = new GherkinParser();
const feature = parser.parse(gherkinText);

runner.runFeature(feature).then(results => {
  console.log('\n--- Test Summary ---');
  console.log(`Feature: ${results.name}`);
  console.log(`Status: ${results.passed ? 'PASSED' : 'FAILED'}`);
  console.log(`Scenarios: ${results.scenarios.length}`);
  console.log(`Passed: ${results.scenarios.filter(s => s.passed).length}`);
  console.log(`Failed: ${results.scenarios.filter(s => !s.passed).length}`);
});

/**
 * BDD Best Practices:
 *
 * 1. Write scenarios in business language, not technical language
 *
 * 2. Focus on behavior, not implementation details
 *
 * 3. Keep scenarios short and focused (3-5 steps)
 *
 * 4. Use declarative style: "the user is logged in" not "type username, type password, click login"
 *
 * 5. Avoid UI details in scenarios
 *
 * 6. Use Background for common setup steps
 *
 * 7. Make step definitions reusable
 *
 * 8. Maintain living documentation by keeping tests in sync with code
 *
 * 9. Collaborate: Write scenarios with developers, testers, AND business stakeholders
 *
 * 10. Start with the most important scenarios first
 */
