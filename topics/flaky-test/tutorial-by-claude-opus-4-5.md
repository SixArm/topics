# Flaky Test: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A flaky test is a test that produces inconsistent results—passing sometimes and failing other times—without any changes to the code being tested. For test automation professionals, flaky tests erode confidence in the test suite and waste significant time investigating false failures.

## What is a Flaky Test?

A flaky test exhibits non-deterministic behavior, meaning the same test with the same code can produce different outcomes across runs. This inconsistency makes it difficult to trust test results and can slow down development.

### Common Causes of Flakiness

```
┌─────────────────────────────────────────────────────────────┐
│                    Causes of Flaky Tests                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Timing Issues:                                             │
│  ├── Race conditions                                        │
│  ├── Async operations not properly awaited                  │
│  ├── Hardcoded timeouts too short                          │
│  ├── Clock/time dependencies                               │
│  └── Network latency variations                            │
│                                                             │
│  Test Order Dependencies:                                   │
│  ├── Shared state between tests                            │
│  ├── Tests depend on execution order                       │
│  ├── Incomplete cleanup between tests                      │
│  └── Global state mutations                                │
│                                                             │
│  External Dependencies:                                     │
│  ├── Unreliable third-party services                       │
│  ├── Database connection issues                            │
│  ├── File system race conditions                           │
│  └── Network availability                                  │
│                                                             │
│  Resource Issues:                                           │
│  ├── Memory pressure                                       │
│  ├── Port conflicts                                        │
│  ├── CPU contention                                        │
│  └── Disk space limitations                                │
│                                                             │
│  Random/Non-deterministic Data:                            │
│  ├── Random test data without seeding                      │
│  ├── UUID/timestamp dependencies                           │
│  └── Floating-point comparisons                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Detecting Flaky Tests

### Python Flaky Test Detection

```python
import pytest
from typing import Dict, List, Tuple
from dataclasses import dataclass
from datetime import datetime
import json
import statistics

@dataclass
class TestResult:
    test_name: str
    passed: bool
    duration: float
    run_id: str
    timestamp: datetime
    error_message: str = None

class FlakynessDetector:
    """Detect and track flaky tests."""

    def __init__(self):
        self.results: Dict[str, List[TestResult]] = {}

    def record_result(self, result: TestResult):
        """Record a test result."""
        if result.test_name not in self.results:
            self.results[result.test_name] = []
        self.results[result.test_name].append(result)

    def calculate_flakiness_rate(self, test_name: str) -> float:
        """Calculate flakiness rate for a test."""
        results = self.results.get(test_name, [])
        if len(results) < 2:
            return 0.0

        # Count state transitions (pass -> fail or fail -> pass)
        transitions = 0
        for i in range(1, len(results)):
            if results[i].passed != results[i-1].passed:
                transitions += 1

        # Flakiness rate = transitions / (total runs - 1)
        return transitions / (len(results) - 1)

    def get_flaky_tests(self, threshold: float = 0.1) -> List[Tuple[str, float]]:
        """Get tests with flakiness rate above threshold."""
        flaky = []
        for test_name in self.results:
            rate = self.calculate_flakiness_rate(test_name)
            if rate >= threshold:
                flaky.append((test_name, rate))
        return sorted(flaky, key=lambda x: x[1], reverse=True)

    def analyze_test(self, test_name: str) -> Dict:
        """Detailed analysis of a test's flakiness."""
        results = self.results.get(test_name, [])
        if not results:
            return {}

        passes = sum(1 for r in results if r.passed)
        fails = len(results) - passes
        durations = [r.duration for r in results]

        return {
            'total_runs': len(results),
            'passes': passes,
            'failures': fails,
            'pass_rate': passes / len(results) * 100,
            'flakiness_rate': self.calculate_flakiness_rate(test_name) * 100,
            'avg_duration': statistics.mean(durations),
            'duration_std_dev': statistics.stdev(durations) if len(durations) > 1 else 0,
            'error_messages': list(set(r.error_message for r in results if r.error_message))
        }

    def generate_report(self) -> str:
        """Generate flakiness report."""
        report = ["Flaky Test Report", "=" * 50]

        flaky_tests = self.get_flaky_tests()
        if not flaky_tests:
            report.append("\nNo flaky tests detected!")
            return "\n".join(report)

        report.append(f"\nFlaky tests found: {len(flaky_tests)}")
        report.append("-" * 50)

        for test_name, rate in flaky_tests:
            analysis = self.analyze_test(test_name)
            report.append(f"\n{test_name}")
            report.append(f"  Flakiness Rate: {rate * 100:.1f}%")
            report.append(f"  Pass Rate: {analysis['pass_rate']:.1f}%")
            report.append(f"  Total Runs: {analysis['total_runs']}")
            if analysis['error_messages']:
                report.append(f"  Errors: {', '.join(analysis['error_messages'][:3])}")

        return "\n".join(report)


# Pytest plugin for detecting flaky tests
class FlakyTestPlugin:
    """Pytest plugin to detect and handle flaky tests."""

    def __init__(self):
        self.detector = FlakynessDetector()

    def pytest_runtest_logreport(self, report):
        """Record test results."""
        if report.when == 'call':
            result = TestResult(
                test_name=report.nodeid,
                passed=report.passed,
                duration=report.duration,
                run_id=str(datetime.now()),
                timestamp=datetime.now(),
                error_message=str(report.longrepr) if report.failed else None
            )
            self.detector.record_result(result)

    def pytest_sessionfinish(self, session):
        """Print flakiness report at end of session."""
        print("\n" + self.detector.generate_report())


# Retry decorator for flaky tests
def retry_flaky(max_retries: int = 3, delay: float = 1.0):
    """Decorator to retry flaky tests."""
    import functools
    import time

    def decorator(test_func):
        @functools.wraps(test_func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_retries):
                try:
                    return test_func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_retries - 1:
                        time.sleep(delay)
            raise last_exception
        return wrapper
    return decorator


# Example flaky test and fix
class TestFlakyExamples:
    """Examples of flaky tests and their fixes."""

    # FLAKY: Uses hardcoded timeout
    def test_flaky_timeout(self):
        """This test may fail if the operation takes longer than expected."""
        import time
        import random

        # Simulated async operation with variable duration
        time.sleep(random.uniform(0.5, 2.0))

        # This assertion might fail if sleep exceeds implicit timeout
        assert True

    # FIXED: Use proper async waiting
    async def test_fixed_timeout(self):
        """Fixed version using proper async patterns."""
        import asyncio

        async def async_operation():
            await asyncio.sleep(1)
            return "done"

        # Wait with explicit timeout
        result = await asyncio.wait_for(async_operation(), timeout=5.0)
        assert result == "done"

    # FLAKY: Depends on test order
    shared_state = []

    def test_flaky_shared_state_1(self):
        """This test modifies shared state."""
        self.shared_state.append("test1")
        assert len(self.shared_state) == 1  # Fails if test2 runs first

    def test_flaky_shared_state_2(self):
        """This test also modifies shared state."""
        self.shared_state.append("test2")
        assert len(self.shared_state) == 1  # Fails if test1 runs first

    # FIXED: Each test manages its own state
    def test_fixed_isolated_1(self):
        """Fixed: Uses isolated state."""
        local_state = []
        local_state.append("test1")
        assert len(local_state) == 1

    def test_fixed_isolated_2(self):
        """Fixed: Uses isolated state."""
        local_state = []
        local_state.append("test2")
        assert len(local_state) == 1

    # FLAKY: Time-dependent
    def test_flaky_time_dependent(self):
        """This test depends on current time."""
        import datetime
        now = datetime.datetime.now()
        # Flaky: might fail around midnight or month boundaries
        assert now.day > 0

    # FIXED: Mock the time
    def test_fixed_time_independent(self, mocker):
        """Fixed: Uses mocked time."""
        import datetime

        mock_now = datetime.datetime(2024, 6, 15, 12, 0, 0)
        mocker.patch('datetime.datetime.now', return_value=mock_now)

        now = datetime.datetime.now()
        assert now.day == 15
```

### Playwright Flaky Test Handling

```typescript
// playwright.config.ts - Configuration for handling flaky tests
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Retry failed tests
  retries: process.env.CI ? 2 : 0,

  // Global timeout
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 5000
  },

  use: {
    // Action timeout
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 30000,

    // Trace on retry
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on retry
    video: 'on-first-retry'
  }
});

// e2e/tests/anti-flaky-patterns.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Anti-Flaky Patterns', () => {
  // FLAKY: Uses fixed timeout
  test.skip('flaky: hardcoded wait', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForTimeout(2000); // Arbitrary wait - BAD!
    await expect(page.locator('.data')).toBeVisible();
  });

  // FIXED: Wait for specific condition
  test('fixed: wait for condition', async ({ page }) => {
    await page.goto('/dashboard');
    // Wait for actual condition
    await expect(page.locator('.data')).toBeVisible({ timeout: 10000 });
  });

  // FLAKY: Relies on element count
  test.skip('flaky: exact count', async ({ page }) => {
    await page.goto('/products');
    // Count might change between page load and assertion
    const items = page.locator('.product-item');
    await expect(items).toHaveCount(10); // Flaky if items load async
  });

  // FIXED: Wait for stable state
  test('fixed: wait for stable list', async ({ page }) => {
    await page.goto('/products');

    // Wait for loading to complete
    await expect(page.locator('.loading')).toBeHidden();

    // Or wait for minimum items
    const items = page.locator('.product-item');
    await expect(items.first()).toBeVisible();

    // Then check count
    await expect(items).toHaveCount(10);
  });

  // FLAKY: Animation timing
  test.skip('flaky: animation race', async ({ page }) => {
    await page.goto('/modal-demo');
    await page.click('#open-modal');
    // Modal might be animating
    await page.click('#modal-button'); // Might fail during animation
  });

  // FIXED: Wait for animation
  test('fixed: wait for animation', async ({ page }) => {
    await page.goto('/modal-demo');
    await page.click('#open-modal');

    // Wait for modal to be fully visible and stable
    const modal = page.locator('#modal');
    await expect(modal).toBeVisible();

    // Wait for animation to complete
    await modal.evaluate(el =>
      el.getAnimations().forEach(a => a.finished)
    );

    await page.click('#modal-button');
  });

  // FLAKY: Network race condition
  test.skip('flaky: network race', async ({ page }) => {
    await page.goto('/search');
    await page.fill('#search', 'query');
    await page.click('#search-btn');
    // Results might not be loaded yet
    await expect(page.locator('.result').first()).toBeVisible();
  });

  // FIXED: Wait for network
  test('fixed: wait for network', async ({ page }) => {
    await page.goto('/search');
    await page.fill('#search', 'query');

    // Wait for network request to complete
    await Promise.all([
      page.waitForResponse(resp =>
        resp.url().includes('/api/search') && resp.status() === 200
      ),
      page.click('#search-btn')
    ]);

    await expect(page.locator('.result').first()).toBeVisible();
  });
});

// Utility for retrying flaky operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}
```

## Fixing Common Flaky Test Patterns

```python
class FlakyTestFixes:
    """Common fixes for flaky test patterns."""

    # Pattern 1: Timing issues
    timing_fixes = {
        'problem': 'Hardcoded sleep/wait times',
        'fix': 'Use explicit waits for conditions',
        'example': '''
            # BAD
            time.sleep(2)
            assert element.is_visible()

            # GOOD
            await element.wait_for(state="visible", timeout=5000)
        '''
    }

    # Pattern 2: Order dependency
    order_fixes = {
        'problem': 'Tests depend on execution order',
        'fix': 'Make tests independent with proper setup/teardown',
        'example': '''
            # BAD
            def test_create_user():
                global user
                user = create_user()

            def test_delete_user():
                delete(user)  # Depends on test_create_user

            # GOOD
            @pytest.fixture
            def user():
                user = create_user()
                yield user
                delete(user)

            def test_user_operations(user):
                # Each test gets fresh user
                assert user.id
        '''
    }

    # Pattern 3: Shared state
    shared_state_fixes = {
        'problem': 'Tests share mutable state',
        'fix': 'Isolate test state, use fixtures with proper scope',
        'example': '''
            # BAD
            class TestCache:
                cache = {}  # Shared across tests

            # GOOD
            @pytest.fixture
            def cache():
                return {}  # Fresh for each test
        '''
    }

    # Pattern 4: External dependencies
    external_fixes = {
        'problem': 'Tests depend on external services',
        'fix': 'Mock external services or use test doubles',
        'example': '''
            # BAD
            def test_api():
                response = requests.get('https://api.example.com/data')
                assert response.status_code == 200

            # GOOD
            def test_api(requests_mock):
                requests_mock.get('https://api.example.com/data',
                                json={'data': 'test'})
                response = requests.get('https://api.example.com/data')
                assert response.status_code == 200
        '''
    }
```

## Best Practices

### Flaky Test Prevention Checklist

```markdown
## Preventing Flaky Tests

### Timing
- [ ] Never use hardcoded sleeps
- [ ] Use explicit waits for conditions
- [ ] Set appropriate timeouts
- [ ] Handle async operations properly

### Isolation
- [ ] Tests don't depend on execution order
- [ ] Each test has its own state
- [ ] Proper setup and teardown
- [ ] No shared mutable state

### External Dependencies
- [ ] Mock external services
- [ ] Use test doubles for unreliable dependencies
- [ ] Handle network failures gracefully
- [ ] Use local test databases

### Data
- [ ] Seed random generators
- [ ] Use deterministic test data
- [ ] Avoid floating-point comparisons
- [ ] Don't rely on system time

### Detection & Monitoring
- [ ] Track flakiness rates
- [ ] Quarantine flaky tests
- [ ] Fix or remove persistent flakes
- [ ] Run tests multiple times in CI
```

## Conclusion

Flaky tests undermine confidence in test suites and waste developer time. By understanding common causes, implementing proper detection, and following best practices, test automation professionals can minimize flakiness and maintain reliable test suites.

## Key Takeaways

1. Flaky tests pass/fail inconsistently without code changes
2. Common causes: timing, shared state, external dependencies
3. Use explicit waits instead of hardcoded sleeps
4. Isolate tests from each other
5. Mock external dependencies
6. Track and monitor flakiness rates
7. Fix flaky tests promptly or quarantine them
