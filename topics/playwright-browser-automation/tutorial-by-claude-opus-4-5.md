# Playwright Browser Automation

## Introduction

Playwright is a modern browser automation framework developed by Microsoft that has rapidly become one of the most important tools in a test automation professional's toolkit. Unlike older frameworks that were bolted onto browsers through external drivers, Playwright communicates with browser engines directly through their debugging protocols, enabling reliable, fast, and deterministic testing across Chromium, Firefox, and WebKit.

For test automation engineers, Playwright solves many of the longstanding pain points of browser testing: flaky waits, unreliable selectors, cross-browser inconsistencies, and difficult CI integration. Its auto-waiting mechanism, powerful selector engine, network interception capabilities, and built-in visual comparison make it a comprehensive solution for end-to-end testing, component testing, and even API testing.

This tutorial provides a thorough guide to setting up Playwright, writing effective tests, and integrating it into professional test automation workflows.

## What is Playwright?

Playwright is an open-source browser automation library that provides a single API to automate Chromium, Firefox, and WebKit browsers. It supports multiple programming languages (JavaScript/TypeScript, Python, Java, .NET) and is designed for reliable end-to-end testing of modern web applications.

```
ASCII Diagram: Playwright Architecture

  +----------------------------------------------------------+
  |                    Test Script                            |
  |  (TypeScript / JavaScript / Python / Java / .NET)        |
  +----------------------------------------------------------+
               |                |                |
               v                v                v
  +----------------------------------------------------------+
  |              Playwright Core Library                      |
  |  +-------------+  +-------------+  +--------------+      |
  |  | Auto-Wait   |  | Selectors   |  | Network      |      |
  |  | Engine      |  | Engine      |  | Interception |      |
  |  +-------------+  +-------------+  +--------------+      |
  |  +-------------+  +-------------+  +--------------+      |
  |  | Tracing &   |  | Screenshot  |  | Video        |      |
  |  | Debugging   |  | & Visual    |  | Recording    |      |
  |  +-------------+  +-------------+  +--------------+      |
  +----------------------------------------------------------+
        |                    |                    |
        v                    v                    v
  +-----------+      +-----------+       +-----------+
  | Chromium  |      | Firefox   |       | WebKit    |
  | (Chrome,  |      | (Gecko)   |       | (Safari)  |
  |  Edge)    |      |           |       |           |
  +-----------+      +-----------+       +-----------+
        |                    |                    |
        v                    v                    v
  +----------------------------------------------------------+
  |              Browser DevTools Protocol                    |
  |    (Direct communication - no WebDriver middleman)       |
  +----------------------------------------------------------+
```

### Core Capabilities

- **Multi-browser**: Single API for Chromium, Firefox, and WebKit
- **Auto-waiting**: Automatically waits for elements to be actionable before performing operations
- **Network interception**: Mock, modify, or monitor network requests and responses
- **Multiple contexts**: Isolated browser contexts for parallel test execution
- **Visual comparisons**: Built-in screenshot comparison for visual regression testing
- **Tracing**: Record traces for post-mortem debugging of failed tests
- **Code generation**: Record user interactions and generate test code automatically

## Implementation: Setting Up Playwright

### Python Setup

```bash
# Install Playwright for Python
pip install playwright pytest-playwright
playwright install
```

```python
# conftest.py - Shared configuration and fixtures
import pytest
from playwright.sync_api import Page, BrowserContext, Browser

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    """Configure browser context for all tests."""
    return {
        **browser_context_args,
        "viewport": {"width": 1280, "height": 720},
        "ignore_https_errors": True,
    }

@pytest.fixture
def authenticated_page(page: Page) -> Page:
    """Provide a page that is already logged in."""
    page.goto("/login")
    page.fill('[data-testid="username"]', "testuser")
    page.fill('[data-testid="password"]', "TestPass123!")
    page.click('[data-testid="login-button"]')
    page.wait_for_url("**/dashboard")
    return page
```

```ini
# pytest.ini
[pytest]
addopts = --browser chromium --headed
base_url = http://localhost:3000
```

### JavaScript/TypeScript Setup

```bash
# Install Playwright for Node.js
npm init -y
npm install -D @playwright/test
npx playwright install
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Implementation: Selectors and Auto-Waiting

### Playwright Selector Strategies

```typescript
// tests/selectors-demo.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Selector Strategies', () => {

  test('preferred selectors - role and test-id based', async ({ page }) => {
    await page.goto('/products');

    // Best: Role-based selectors (accessibility-first)
    await page.getByRole('heading', { name: 'Product Catalog' }).isVisible();
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await page.getByRole('link', { name: 'View Details' }).first().click();

    // Good: Test ID selectors (stable, decoupled from UI)
    await page.getByTestId('product-search').fill('laptop');
    await page.getByTestId('search-button').click();

    // Good: Text-based selectors
    await page.getByText('Search Results').isVisible();
    await page.getByLabel('Sort by').selectOption('price-asc');
    await page.getByPlaceholder('Enter search term').fill('keyboard');
  });

  test('chaining and filtering selectors', async ({ page }) => {
    await page.goto('/products');

    // Filter within a specific container
    const productCard = page.locator('[data-testid="product-card"]')
      .filter({ hasText: 'Wireless Mouse' });

    await expect(productCard).toBeVisible();
    await productCard.getByRole('button', { name: 'Add to Cart' }).click();

    // Nth element selection
    const thirdProduct = page.getByTestId('product-card').nth(2);
    await expect(thirdProduct).toBeVisible();
  });

  test('auto-waiting in action', async ({ page }) => {
    await page.goto('/dashboard');

    // Playwright automatically waits for the element to be:
    // - Attached to the DOM
    // - Visible
    // - Stable (not animating)
    // - Enabled
    // - Receiving events (not obscured)
    await page.getByRole('button', { name: 'Load Data' }).click();

    // No need for explicit waits - Playwright waits for the element
    // to appear after the async data load
    await expect(page.getByTestId('data-table')).toBeVisible();

    // Assertions also auto-wait with configurable timeout
    await expect(page.getByText('Data loaded successfully'))
      .toBeVisible({ timeout: 10000 });
  });
});
```

### Python Selectors

```python
# test_selectors.py
from playwright.sync_api import Page, expect


def test_role_based_selectors(page: Page):
    """Demonstrate role-based selector strategies."""
    page.goto("/products")

    # Role-based selectors
    expect(page.get_by_role("heading", name="Product Catalog")).to_be_visible()
    page.get_by_role("button", name="Add to Cart").first.click()

    # Test ID selectors
    page.get_by_test_id("product-search").fill("laptop")
    page.get_by_test_id("search-button").click()

    # Text and label selectors
    expect(page.get_by_text("Search Results")).to_be_visible()
    page.get_by_label("Sort by").select_option("price-asc")


def test_waiting_for_dynamic_content(page: Page):
    """Demonstrate auto-waiting with dynamic content."""
    page.goto("/dashboard")

    # Click triggers an API call
    page.get_by_role("button", name="Refresh Data").click()

    # Auto-waits for the content to appear
    expect(page.get_by_test_id("data-table")).to_be_visible()

    # Wait for specific content within a timeout
    expect(page.get_by_text("Updated just now")).to_be_visible(timeout=15000)


def test_locator_filtering(page: Page):
    """Demonstrate locator chaining and filtering."""
    page.goto("/users")

    # Filter to find a specific row in a table
    user_row = page.get_by_role("row").filter(has_text="John Doe")
    expect(user_row).to_be_visible()

    # Click a button within that specific row
    user_row.get_by_role("button", name="Edit").click()

    # Verify the edit form opened for the correct user
    expect(page.get_by_label("Full Name")).to_have_value("John Doe")
```

## Implementation: Network Interception

### TypeScript Network Interception

```typescript
// tests/network-interception.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Network Interception', () => {

  test('mock API response for predictable testing', async ({ page }) => {
    // Intercept the API call and return mock data
    await page.route('**/api/products', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'Test Product', price: 29.99, stock: 5 },
          { id: 2, name: 'Mock Widget', price: 49.99, stock: 0 },
        ]),
      });
    });

    await page.goto('/products');

    // Verify the mocked data is rendered
    await expect(page.getByText('Test Product')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();
    await expect(page.getByText('Mock Widget')).toBeVisible();

    // Verify out-of-stock handling
    await expect(page.getByText('Out of Stock')).toBeVisible();
  });

  test('simulate server error and verify error handling', async ({ page }) => {
    await page.route('**/api/products', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('/products');

    await expect(page.getByText('Something went wrong')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  });

  test('simulate slow network and verify loading states', async ({ page }) => {
    await page.route('**/api/products', async (route) => {
      // Simulate 3-second delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 1, name: 'Delayed Product', price: 9.99 }]),
      });
    });

    await page.goto('/products');

    // Verify loading indicator appears
    await expect(page.getByTestId('loading-spinner')).toBeVisible();

    // Verify data eventually loads
    await expect(page.getByText('Delayed Product')).toBeVisible({ timeout: 5000 });

    // Verify loading indicator disappears
    await expect(page.getByTestId('loading-spinner')).not.toBeVisible();
  });

  test('capture and validate outgoing API requests', async ({ page }) => {
    const apiRequests: Array<{ url: string; method: string; body: any }> = [];

    // Monitor outgoing requests
    page.on('request', (request) => {
      if (request.url().includes('/api/')) {
        apiRequests.push({
          url: request.url(),
          method: request.method(),
          body: request.postDataJSON(),
        });
      }
    });

    await page.goto('/products');
    await page.getByTestId('product-card').first()
      .getByRole('button', { name: 'Add to Cart' }).click();

    // Verify the correct API call was made
    const addToCartRequest = apiRequests.find(
      r => r.url.includes('/api/cart') && r.method === 'POST'
    );

    expect(addToCartRequest).toBeDefined();
    expect(addToCartRequest!.body).toHaveProperty('productId');
    expect(addToCartRequest!.body).toHaveProperty('quantity', 1);
  });

  test('modify request headers for auth testing', async ({ page }) => {
    await page.route('**/api/**', async (route) => {
      const headers = {
        ...route.request().headers(),
        'X-Custom-Auth': 'test-token-12345',
        'X-Test-Mode': 'true',
      };
      await route.continue({ headers });
    });

    await page.goto('/dashboard');
    await expect(page.getByTestId('user-profile')).toBeVisible();
  });
});
```

### Python Network Interception

```python
# test_network.py
import json
from playwright.sync_api import Page, Route, expect


def test_mock_api_response(page: Page):
    """Mock an API endpoint to return predictable data."""
    def handle_products(route: Route):
        route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps([
                {"id": 1, "name": "Test Product", "price": 29.99},
                {"id": 2, "name": "Mock Widget", "price": 49.99},
            ])
        )

    page.route("**/api/products", handle_products)
    page.goto("/products")

    expect(page.get_by_text("Test Product")).to_be_visible()
    expect(page.get_by_text("Mock Widget")).to_be_visible()


def test_capture_outgoing_requests(page: Page):
    """Capture and validate requests the application makes."""
    captured_requests = []

    def on_request(request):
        if "/api/" in request.url:
            captured_requests.append({
                "url": request.url,
                "method": request.method,
                "post_data": request.post_data,
            })

    page.on("request", on_request)
    page.goto("/checkout")
    page.get_by_role("button", name="Place Order").click()

    # Verify the order API was called correctly
    order_request = next(
        (r for r in captured_requests if "/api/orders" in r["url"]),
        None
    )
    assert order_request is not None, "Order API was not called"
    assert order_request["method"] == "POST"


def test_simulate_offline_mode(page: Page):
    """Simulate network failure to test offline handling."""
    page.goto("/dashboard")
    expect(page.get_by_test_id("data-table")).to_be_visible()

    # Go offline
    page.route("**/*", lambda route: route.abort())

    page.get_by_role("button", name="Refresh").click()

    expect(page.get_by_text("No internet connection")).to_be_visible()
```

## Implementation: Visual Comparison Testing

### TypeScript Visual Comparison

```typescript
// tests/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing', () => {

  test('homepage matches baseline screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Full page screenshot comparison
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,  // Allow 1% pixel difference
    });
  });

  test('product card component visual test', async ({ page }) => {
    await page.goto('/products');

    const productCard = page.getByTestId('product-card').first();
    await expect(productCard).toHaveScreenshot('product-card.png', {
      animations: 'disabled',  // Disable animations for stable screenshots
    });
  });

  test('responsive layout visual test', async ({ page }) => {
    await page.goto('/');

    // Test at multiple viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop-hd' },
      { width: 1280, height: 720, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(500);  // Allow layout to settle
      await expect(page).toHaveScreenshot(`layout-${vp.name}.png`, {
        fullPage: true,
      });
    }
  });

  test('dark mode visual comparison', async ({ page }) => {
    await page.goto('/');

    // Light mode baseline
    await expect(page).toHaveScreenshot('theme-light.png');

    // Toggle dark mode
    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await expect(page).toHaveScreenshot('theme-dark.png');
  });
});
```

### Python Visual Comparison

```python
# test_visual.py
from playwright.sync_api import Page, expect


def test_homepage_screenshot(page: Page):
    """Visual regression test for the homepage."""
    page.goto("/")
    page.wait_for_load_state("networkidle")

    expect(page).to_have_screenshot(
        "homepage.png",
        full_page=True,
        max_diff_pixel_ratio=0.01,
    )


def test_component_screenshot(page: Page):
    """Visual regression test for an individual component."""
    page.goto("/products")

    card = page.get_by_test_id("product-card").first
    expect(card).to_have_screenshot(
        "product-card.png",
        animations="disabled",
    )


def test_responsive_screenshots(page: Page):
    """Visual regression across multiple viewport sizes."""
    page.goto("/")

    viewports = [
        (1280, 720, "desktop"),
        (768, 1024, "tablet"),
        (375, 667, "mobile"),
    ]

    for width, height, name in viewports:
        page.set_viewport_size({"width": width, "height": height})
        page.wait_for_timeout(500)
        expect(page).to_have_screenshot(f"layout-{name}.png", full_page=True)
```

## Implementation: CI Integration

### GitHub Actions Configuration

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        project: [chromium, firefox, webkit]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps ${{ matrix.project }}

      - name: Run Playwright tests
        run: npx playwright test --project=${{ matrix.project }}

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report-${{ matrix.project }}
          path: playwright-report/
          retention-days: 30

      - name: Upload trace files
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-traces-${{ matrix.project }}
          path: test-results/
          retention-days: 7
```

### Docker Configuration for CI

```dockerfile
# Dockerfile.playwright
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
```

### Complete Test Example: E2E User Journey

```typescript
// tests/e2e/user-journey.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Complete User Journey', () => {
  test.describe.configure({ mode: 'serial' });

  let userEmail: string;

  test.beforeAll(() => {
    userEmail = `testuser+${Date.now()}@example.com`;
  });

  test('Step 1: User registers an account', async ({ page }) => {
    await page.goto('/register');

    await page.getByLabel('Email').fill(userEmail);
    await page.getByLabel('Password').fill('SecurePass123!');
    await page.getByLabel('Confirm Password').fill('SecurePass123!');
    await page.getByRole('button', { name: 'Create Account' }).click();

    await expect(page.getByText('Account created successfully')).toBeVisible();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Step 2: User browses and adds items to cart', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.getByLabel('Email').fill(userEmail);
    await page.getByLabel('Password').fill('SecurePass123!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('**/dashboard');

    // Browse products
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page.getByRole('heading', { name: 'Product Catalog' }))
      .toBeVisible();

    // Add first product to cart
    const firstProduct = page.getByTestId('product-card').first();
    const productName = await firstProduct
      .getByTestId('product-name').textContent();
    await firstProduct
      .getByRole('button', { name: 'Add to Cart' }).click();

    // Verify cart count updated
    await expect(page.getByTestId('cart-count')).toHaveText('1');

    // Navigate to cart
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByText(productName!)).toBeVisible();
  });

  test('Step 3: User completes checkout', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(userEmail);
    await page.getByLabel('Password').fill('SecurePass123!');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.goto('/cart');
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    // Fill shipping details
    await page.getByLabel('Address').fill('123 Test Street');
    await page.getByLabel('City').fill('Testville');
    await page.getByLabel('Zip Code').fill('12345');

    await page.getByRole('button', { name: 'Place Order' }).click();

    await expect(page.getByText('Order confirmed')).toBeVisible();
    await expect(page.getByTestId('order-number')).toBeVisible();
  });
});
```

## Best Practices

### Playwright Test Automation Checklist

- [ ] **Use role-based selectors** as the primary selector strategy for accessibility and stability
- [ ] **Use `data-testid` attributes** for elements that lack accessible roles or clear text
- [ ] **Avoid CSS and XPath selectors** unless absolutely necessary -- they are brittle and coupled to implementation
- [ ] **Leverage auto-waiting** instead of adding explicit sleeps or timeouts
- [ ] **Use `expect` assertions** with built-in auto-retry rather than manual polling loops
- [ ] **Configure traces** for first-retry or on-failure to debug test failures efficiently
- [ ] **Capture screenshots and videos** on failure for quick visual diagnosis
- [ ] **Run tests in parallel** using Playwright's built-in parallelism with isolated browser contexts
- [ ] **Use the `webServer` config** to automatically start and stop your dev server for tests
- [ ] **Mock external APIs** using `page.route()` to isolate tests from third-party dependencies
- [ ] **Set up visual regression baselines** and review screenshot diffs in pull requests
- [ ] **Run cross-browser tests** in CI using the project matrix (Chromium, Firefox, WebKit)
- [ ] **Use `test.describe.configure({ mode: 'serial' })** only when tests have genuine sequential dependencies
- [ ] **Keep tests independent** -- each test should set up its own state and not depend on other tests
- [ ] **Use Page Object Model** or fixtures for reusable page interactions
- [ ] **Update Playwright regularly** to get the latest browser versions and features

### CI Integration Checklist

- [ ] Install only the browsers you need (`--with-deps <browser>`) to speed up CI
- [ ] Upload HTML reports and trace files as artifacts for every CI run
- [ ] Use `forbidOnly: !!process.env.CI` to prevent `.only` from reaching production
- [ ] Configure appropriate retries for CI (1-2) while keeping 0 retries locally
- [ ] Set a reasonable job timeout (15-30 minutes) to catch hanging tests
- [ ] Use a matrix strategy to run browsers in parallel CI jobs

## Conclusion

Playwright represents a generational leap in browser automation. Its direct browser protocol communication eliminates the flakiness that plagued WebDriver-based tools, while its auto-waiting mechanism means you write what you mean -- click this button, expect this text -- without wrestling with timing issues.

For test automation professionals, the framework's real power lies in its completeness. Network interception lets you test error handling and loading states without depending on real backend behavior. Visual comparison catches UI regressions that functional tests miss. Cross-browser testing with a single codebase ensures your application works everywhere. And its first-class CI integration means these tests run reliably on every commit.

The investment in learning Playwright pays dividends quickly: faster test development, dramatically reduced flakiness, and comprehensive coverage across browsers and devices. Whether you are starting a new test suite or migrating from an older framework, Playwright provides the foundation for a reliable, maintainable, and comprehensive test automation strategy.

## Key Takeaways

1. Playwright communicates directly with browser engines through their debugging protocols, eliminating the WebDriver middleman and producing faster, more reliable tests.
2. Auto-waiting is Playwright's most important feature for reducing flakiness -- it automatically waits for elements to be attached, visible, stable, enabled, and not obscured before acting.
3. Role-based selectors (getByRole, getByLabel, getByText) should be your primary selector strategy because they are resilient to UI changes and enforce accessibility best practices.
4. Network interception via `page.route()` enables you to mock API responses, simulate errors, and test loading states without any backend dependency, making tests faster and more deterministic.
5. Visual comparison testing (toHaveScreenshot) catches CSS regressions, layout shifts, and rendering issues that functional assertions alone cannot detect.
6. Browser contexts provide lightweight, fully isolated browser sessions that enable true parallel test execution without the overhead of launching separate browser processes.
7. CI integration with artifact collection (HTML reports, trace files, screenshots, videos) transforms test failures from frustrating mysteries into quickly diagnosable issues with full replay capability.
