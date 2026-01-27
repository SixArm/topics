# Cucumber Test Automation Runner: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Cucumber is a popular behavior-driven development (BDD) testing tool that executes plain-text functional descriptions as automated tests. For test automation professionals, Cucumber bridges the gap between business stakeholders and technical teams by using human-readable Gherkin syntax.

## What is Cucumber?

Cucumber is a test runner that reads executable specifications written in Gherkin and validates that the software behaves as described. It supports multiple programming languages through various implementations.

### Cucumber Ecosystem

```
┌─────────────────────────────────────────────────────────────┐
│                    Cucumber Ecosystem                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Gherkin Language                                           │
│  └── Plain text format for describing behavior              │
│                                                             │
│  Cucumber Implementations:                                  │
│  ├── Cucumber-JVM (Java, Kotlin, Scala)                    │
│  ├── Cucumber-JS (JavaScript, TypeScript)                  │
│  ├── Cucumber-Ruby                                         │
│  ├── Behave (Python)                                       │
│  ├── SpecFlow (.NET)                                       │
│  └── Godog (Go)                                            │
│                                                             │
│  Components:                                                │
│  ├── Feature files (.feature)                              │
│  ├── Step definitions (code)                               │
│  ├── Support files (hooks, world)                          │
│  └── Configuration                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Gherkin Syntax

### Feature File Structure

```gherkin
# features/shopping_cart.feature

@e2e @shopping
Feature: Shopping Cart Management
  As a customer
  I want to manage items in my shopping cart
  So that I can purchase products I want

  Background:
    Given I am a registered customer
    And I am logged into my account

  @smoke
  Scenario: Add single item to cart
    Given I am viewing the product "Wireless Mouse"
    When I click the "Add to Cart" button
    Then the cart should contain 1 item
    And the cart total should be "$29.99"

  @regression
  Scenario: Update item quantity
    Given I have "Wireless Mouse" in my cart
    When I change the quantity to 3
    Then the cart should show quantity 3
    And the cart total should be "$89.97"

  Scenario Outline: Apply discount codes
    Given I have items totaling $<original>
    When I apply discount code "<code>"
    Then my total should be $<final>

    Examples:
      | original | code     | final  |
      | 100.00   | SAVE10   | 90.00  |
      | 100.00   | SAVE20   | 80.00  |
      | 50.00    | FREESHIP | 50.00  |

  @wip
  Scenario: Remove item from cart
    Given I have "Wireless Mouse" in my cart
    When I click remove on "Wireless Mouse"
    Then the cart should be empty
```

### Gherkin Keywords

```gherkin
# Keywords and their purposes

Feature: [Title]          # Describes the feature being tested
  Background:             # Steps run before each scenario
  Scenario: [Title]       # Individual test case
  Scenario Outline:       # Template for data-driven tests
  Examples:               # Data table for Scenario Outline

  Given                   # Precondition/setup
  When                    # Action
  Then                    # Expected outcome
  And                     # Additional step (same type as previous)
  But                     # Contrasting step (same type as previous)

  @tag                    # Tag for filtering/categorization
  """                     # Doc string (multi-line text)
  |                       # Data table
```

## Setting Up Cucumber

### JavaScript/TypeScript Setup

```bash
# Install dependencies
npm install --save-dev @cucumber/cucumber
npm install --save-dev typescript ts-node
npm install --save-dev @playwright/test
```

```json
// package.json
{
  "scripts": {
    "test:cucumber": "cucumber-js",
    "test:cucumber:tags": "cucumber-js --tags"
  }
}
```

```javascript
// cucumber.js - Configuration file
module.exports = {
  default: {
    require: [
      'features/support/**/*.ts',
      'features/step_definitions/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      ['html', 'reports/cucumber-report.html'],
      ['json', 'reports/cucumber-report.json']
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true
  },
  smoke: {
    tags: '@smoke',
    require: [
      'features/support/**/*.ts',
      'features/step_definitions/**/*.ts'
    ],
    requireModule: ['ts-node/register']
  }
};
```

### Java Setup

```xml
<!-- pom.xml -->
<dependencies>
    <dependency>
        <groupId>io.cucumber</groupId>
        <artifactId>cucumber-java</artifactId>
        <version>7.14.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>io.cucumber</groupId>
        <artifactId>cucumber-junit-platform-engine</artifactId>
        <version>7.14.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.platform</groupId>
        <artifactId>junit-platform-suite</artifactId>
        <version>1.10.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

```java
// src/test/java/RunCucumberTest.java
import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;

import static io.cucumber.junit.platform.engine.Constants.*;

@Suite
@IncludeEngines("cucumber")
@SelectPackages("features")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "stepdefinitions")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME, value = "pretty, html:target/cucumber-reports.html")
public class RunCucumberTest {
}
```

## Step Definitions

### TypeScript Step Definitions

```typescript
// features/step_definitions/cart_steps.ts
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I am a registered customer', async function(this: CustomWorld) {
  this.customer = await this.api.createCustomer({
    email: 'test@example.com',
    name: 'Test Customer'
  });
});

Given('I am logged into my account', async function(this: CustomWorld) {
  await this.page.goto('/login');
  await this.page.fill('#email', this.customer.email);
  await this.page.fill('#password', 'password123');
  await this.page.click('#login-button');
  await expect(this.page).toHaveURL('/dashboard');
});

Given('I am viewing the product {string}', async function(this: CustomWorld, productName: string) {
  await this.page.goto(`/products?search=${productName}`);
  await this.page.click(`[data-product-name="${productName}"]`);
});

When('I click the {string} button', async function(this: CustomWorld, buttonText: string) {
  await this.page.click(`button:has-text("${buttonText}")`);
});

Then('the cart should contain {int} item(s)', async function(this: CustomWorld, count: number) {
  const cartCount = this.page.locator('[data-testid="cart-count"]');
  await expect(cartCount).toHaveText(String(count));
});

Then('the cart total should be {string}', async function(this: CustomWorld, total: string) {
  const cartTotal = this.page.locator('[data-testid="cart-total"]');
  await expect(cartTotal).toHaveText(total);
});
```

### Java Step Definitions

```java
// src/test/java/stepdefinitions/CartSteps.java
package stepdefinitions;

import io.cucumber.java.en.*;
import static org.junit.jupiter.api.Assertions.*;

public class CartSteps {
    private TestContext context;

    public CartSteps(TestContext context) {
        this.context = context;
    }

    @Given("I am a registered customer")
    public void i_am_a_registered_customer() {
        context.customer = context.api.createCustomer(
            "test@example.com",
            "Test Customer"
        );
    }

    @Given("I am logged into my account")
    public void i_am_logged_into_my_account() {
        context.page.navigate(context.baseUrl + "/login");
        context.page.fill("#email", context.customer.getEmail());
        context.page.fill("#password", "password123");
        context.page.click("#login-button");
    }

    @Given("I am viewing the product {string}")
    public void i_am_viewing_the_product(String productName) {
        context.page.navigate(context.baseUrl + "/products/" + productName.toLowerCase().replace(" ", "-"));
    }

    @When("I click the {string} button")
    public void i_click_the_button(String buttonText) {
        context.page.click("button:has-text(\"" + buttonText + "\")");
    }

    @Then("the cart should contain {int} item(s)")
    public void the_cart_should_contain_items(int count) {
        String cartCount = context.page.locator("[data-testid='cart-count']").textContent();
        assertEquals(String.valueOf(count), cartCount);
    }
}
```

## Hooks and Support Files

### World and Hooks (TypeScript)

```typescript
// features/support/world.ts
import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext, chromium } from '@playwright/test';
import { APIClient } from './api-client';

export interface Customer {
  id: string;
  email: string;
  name: string;
}

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  api!: APIClient;
  customer!: Customer;

  constructor(options: IWorldOptions) {
    super(options);
    this.api = new APIClient(process.env.API_URL || 'http://localhost:3000');
  }
}

setWorldConstructor(CustomWorld);

// features/support/hooks.ts
import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';

let browser: Browser;

BeforeAll(async function() {
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false'
  });
});

AfterAll(async function() {
  await browser.close();
});

Before(async function(this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function(this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.context.close();
});

Before({ tags: '@skip' }, async function() {
  return 'skipped';
});

Before({ tags: '@wip' }, async function() {
  return 'pending';
});
```

## Data Tables and Doc Strings

### Working with Data Tables

```gherkin
Scenario: Create multiple products
  Given the following products exist:
    | name           | price | category    |
    | Wireless Mouse | 29.99 | Electronics |
    | USB Cable      | 9.99  | Accessories |
    | Keyboard       | 49.99 | Electronics |
  When I view the Electronics category
  Then I should see 2 products
```

```typescript
import { DataTable } from '@cucumber/cucumber';

Given('the following products exist:', async function(this: CustomWorld, dataTable: DataTable) {
  const products = dataTable.hashes();
  // products = [
  //   { name: 'Wireless Mouse', price: '29.99', category: 'Electronics' },
  //   { name: 'USB Cable', price: '9.99', category: 'Accessories' },
  //   ...
  // ]

  for (const product of products) {
    await this.api.createProduct({
      name: product.name,
      price: parseFloat(product.price),
      category: product.category
    });
  }
});
```

### Doc Strings

```gherkin
Scenario: Submit feedback with detailed message
  Given I am on the feedback page
  When I submit feedback with message:
    """
    This is a multi-line message
    that spans several lines.

    It includes paragraphs and formatting.
    """
  Then I should see a confirmation
```

```typescript
When('I submit feedback with message:', async function(this: CustomWorld, docString: string) {
  await this.page.fill('#feedback-message', docString);
  await this.page.click('#submit-feedback');
});
```

## Running Cucumber Tests

### Command Line Options

```bash
# Run all tests
npx cucumber-js

# Run with specific tags
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@smoke and not @wip"
npx cucumber-js --tags "@smoke or @regression"

# Run specific feature file
npx cucumber-js features/shopping_cart.feature

# Run specific scenario by line number
npx cucumber-js features/shopping_cart.feature:15

# Run with specific format
npx cucumber-js --format progress-bar
npx cucumber-js --format json:reports/cucumber.json

# Parallel execution
npx cucumber-js --parallel 4

# Fail fast
npx cucumber-js --fail-fast

# Dry run (validate step definitions)
npx cucumber-js --dry-run
```

## Reporting

### HTML Reports

```javascript
// cucumber.js
module.exports = {
  default: {
    format: [
      'progress-bar',
      ['html', 'reports/cucumber-report.html'],
      ['json', 'reports/cucumber-report.json'],
      ['junit', 'reports/cucumber-junit.xml']
    ]
  }
};
```

### Custom Reporter

```javascript
// features/support/custom-reporter.js
const { Formatter } = require('@cucumber/cucumber');

class CustomReporter extends Formatter {
  constructor(options) {
    super(options);

    options.eventBroadcaster.on('envelope', (envelope) => {
      if (envelope.testCaseFinished) {
        this.onTestCaseFinished(envelope.testCaseFinished);
      }
    });
  }

  onTestCaseFinished(testCaseFinished) {
    const status = testCaseFinished.testResult?.status;
    console.log(`Test finished with status: ${status}`);
  }
}

module.exports = CustomReporter;
```

## Best Practices

### Writing Good Gherkin

```gherkin
# Good: Declarative, business-focused
Scenario: Customer receives discount for large orders
  Given I am a premium customer
  And I have items totaling $150 in my cart
  When I proceed to checkout
  Then I should see a 10% discount applied

# Bad: Imperative, implementation-focused
Scenario: Customer receives discount for large orders
  Given I navigate to "/login"
  And I enter "premium@test.com" in the email field
  And I enter "password123" in the password field
  And I click the login button
  And I navigate to "/products/1"
  And I click add to cart
  ...
```

### Step Definition Organization

```
features/
├── step_definitions/
│   ├── common_steps.ts       # Shared steps
│   ├── auth_steps.ts         # Authentication steps
│   ├── cart_steps.ts         # Shopping cart steps
│   └── checkout_steps.ts     # Checkout steps
├── support/
│   ├── world.ts              # World definition
│   ├── hooks.ts              # Hooks
│   └── helpers.ts            # Helper functions
├── auth.feature
├── shopping_cart.feature
└── checkout.feature
```

## Conclusion

Cucumber enables behavior-driven development by allowing tests to be written in plain language that all stakeholders can understand. By bridging the gap between business requirements and automated tests, Cucumber helps teams build software that truly meets user needs.

## Key Takeaways

1. Gherkin provides a human-readable test format
2. Step definitions connect Gherkin to code
3. Write declarative scenarios, not imperative scripts
4. Use tags for test organization and filtering
5. Hooks manage setup and teardown
6. Data tables enable data-driven testing
7. Keep step definitions reusable and focused
