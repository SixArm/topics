# Expect Result: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Expect Result is a fundamental concept in test automation where you define the anticipated outcome of a test before executing it. For test automation professionals, clearly specifying expected results is essential for writing reliable, maintainable, and meaningful tests that accurately verify system behavior.

## What is Expect Result?

An expected result is the predicted outcome of a test step or test case, defined before execution. It forms the basis for assertions — the comparison between what you expect and what actually happens. Without clear expected results, tests cannot determine pass or fail status.

### Expect Result in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Case Structure                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Preconditions:                                             │
│  └── System state before test execution                     │
│                                                             │
│  Test Input:                                                │
│  └── Data and actions provided to the system                │
│                                                             │
│  Expected Result:                                           │
│  └── Predicted outcome to compare against                   │
│      ┌──────────────────────────────────┐                  │
│      │ • Return values                  │                  │
│      │ • State changes                  │                  │
│      │ • Side effects                   │                  │
│      │ • Error conditions               │                  │
│      │ • Performance characteristics    │                  │
│      └──────────────────────────────────┘                  │
│                                                             │
│  Actual Result:                                             │
│  └── What the system actually produces                      │
│                                                             │
│  Verdict:                                                   │
│  └── PASS if actual == expected, FAIL otherwise             │
│                                                             │
│  Flow:                                                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐               │
│  │  Setup   │──►│ Execute  │──►│  Assert  │               │
│  │(Arrange) │   │  (Act)   │   │(Compare) │               │
│  └──────────┘   └──────────┘   └──────────┘               │
│                                    │                        │
│                              ┌─────┴─────┐                 │
│                              │           │                  │
│                           ┌──▼──┐   ┌───▼──┐              │
│                           │PASS │   │FAIL  │              │
│                           └─────┘   └──────┘              │
│                                                             │
│  Types of Expected Results:                                 │
│  ├── Exact match: result == 42                             │
│  ├── Approximate: abs(result - 3.14) < 0.01               │
│  ├── Pattern: result matches /^ID-\d+$/                    │
│  ├── Containment: "error" in result                        │
│  ├── Type check: isinstance(result, list)                  │
│  └── Structural: result has keys ["id", "name"]            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Expect Results in Python

### Assertion Patterns

```python
# expect_result.py

"""
Patterns for defining and validating expected results in test automation.
"""

import pytest
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional
from datetime import datetime, timedelta
import re
import math


@dataclass
class ExpectedResult:
    """Represents an expected result with flexible matching."""
    description: str
    matcher: Callable[[Any], bool]
    expected_display: str = ""

    def matches(self, actual: Any) -> bool:
        return self.matcher(actual)

    def failure_message(self, actual: Any) -> str:
        return (
            f"Expected: {self.expected_display or self.description}\n"
            f"Actual:   {actual}"
        )


class Expect:
    """Fluent API for defining expected results."""

    @staticmethod
    def equal(expected: Any) -> ExpectedResult:
        return ExpectedResult(
            description=f"equal to {expected!r}",
            matcher=lambda actual: actual == expected,
            expected_display=repr(expected)
        )

    @staticmethod
    def approximately(expected: float, tolerance: float = 0.01) -> ExpectedResult:
        return ExpectedResult(
            description=f"approximately {expected} (±{tolerance})",
            matcher=lambda actual: abs(actual - expected) <= tolerance,
            expected_display=f"{expected} ± {tolerance}"
        )

    @staticmethod
    def greater_than(threshold: Any) -> ExpectedResult:
        return ExpectedResult(
            description=f"greater than {threshold}",
            matcher=lambda actual: actual > threshold,
            expected_display=f"> {threshold}"
        )

    @staticmethod
    def contains(substring: str) -> ExpectedResult:
        return ExpectedResult(
            description=f"contains '{substring}'",
            matcher=lambda actual: substring in str(actual),
            expected_display=f"contains '{substring}'"
        )

    @staticmethod
    def matches_pattern(pattern: str) -> ExpectedResult:
        return ExpectedResult(
            description=f"matches pattern '{pattern}'",
            matcher=lambda actual: bool(re.match(pattern, str(actual))),
            expected_display=f"matches /{pattern}/"
        )

    @staticmethod
    def has_length(expected_length: int) -> ExpectedResult:
        return ExpectedResult(
            description=f"has length {expected_length}",
            matcher=lambda actual: len(actual) == expected_length,
            expected_display=f"length == {expected_length}"
        )

    @staticmethod
    def has_keys(*keys: str) -> ExpectedResult:
        return ExpectedResult(
            description=f"has keys {keys}",
            matcher=lambda actual: all(k in actual for k in keys),
            expected_display=f"has keys {keys}"
        )

    @staticmethod
    def is_type(expected_type: type) -> ExpectedResult:
        return ExpectedResult(
            description=f"is type {expected_type.__name__}",
            matcher=lambda actual: isinstance(actual, expected_type),
            expected_display=f"type {expected_type.__name__}"
        )

    @staticmethod
    def satisfies(predicate: Callable[[Any], bool], description: str = "") -> ExpectedResult:
        return ExpectedResult(
            description=description or "satisfies predicate",
            matcher=predicate,
            expected_display=description
        )


def assert_expected(actual: Any, expected: ExpectedResult):
    """Assert that an actual result matches the expected result."""
    if not expected.matches(actual):
        raise AssertionError(expected.failure_message(actual))


# Tests
class TestExpectResult:
    """Test expected result patterns."""

    def test_exact_match(self):
        """Expected result with exact equality."""
        result = calculate_sum(2, 3)
        assert result == 5

    def test_approximate_match(self):
        """Expected result with tolerance."""
        result = calculate_pi_approximation()
        assert result == pytest.approx(3.14159, abs=0.001)

    def test_pattern_match(self):
        """Expected result matches a pattern."""
        user_id = generate_user_id()
        assert re.match(r'^USR-\d{6}$', user_id)

    def test_structural_match(self):
        """Expected result has specific structure."""
        response = get_user_profile(user_id="123")

        assert "id" in response
        assert "name" in response
        assert "email" in response
        assert isinstance(response["id"], str)
        assert "@" in response["email"]

    def test_collection_expectations(self):
        """Expected results for collections."""
        items = search_products(query="laptop")

        assert len(items) > 0
        assert len(items) <= 20  # Pagination limit
        assert all("laptop" in item["name"].lower() for item in items)
        assert items == sorted(items, key=lambda x: x["relevance"], reverse=True)

    def test_error_expectations(self):
        """Expected result is an error."""
        with pytest.raises(ValueError, match="Invalid email"):
            validate_email("not-an-email")

    def test_side_effect_expectations(self):
        """Expected result includes side effects."""
        db = MockDatabase()
        user = create_user(db, name="Alice", email="alice@example.com")

        assert user.id is not None
        assert db.find_by_id(user.id) is not None  # Side effect: saved to DB
        assert db.query_count == 2  # INSERT + SELECT

    def test_fluent_expectations(self):
        """Test using fluent expected result API."""
        result = compute_score(attempts=3, successes=2)

        assert_expected(result, Expect.approximately(0.667, tolerance=0.01))
        assert_expected(result, Expect.greater_than(0.5))
        assert_expected(result, Expect.is_type(float))

    def test_negative_expectations(self):
        """Expected result should NOT contain certain values."""
        response = get_public_profile(user_id="123")

        assert "password" not in response
        assert "ssn" not in response
        assert "credit_card" not in response

    def test_temporal_expectations(self):
        """Expected results with timing constraints."""
        start = datetime.now()
        result = perform_search("test query")
        elapsed = datetime.now() - start

        assert result is not None
        assert elapsed < timedelta(seconds=2)


# Helper functions for tests
def calculate_sum(a, b):
    return a + b

def calculate_pi_approximation():
    return math.pi

def generate_user_id():
    import random
    return f"USR-{random.randint(100000, 999999)}"

def get_user_profile(user_id):
    return {"id": user_id, "name": "Test User", "email": "test@example.com"}

def search_products(query):
    return [{"name": f"Best {query}", "relevance": 0.95}]

def validate_email(email):
    if "@" not in email:
        raise ValueError("Invalid email")

def compute_score(attempts, successes):
    return successes / attempts if attempts else 0.0

def get_public_profile(user_id):
    return {"id": user_id, "name": "Test User", "avatar": "url"}

def perform_search(query):
    return [{"title": "Result"}]

class MockDatabase:
    def __init__(self):
        self._store = {}
        self.query_count = 0
    def find_by_id(self, id):
        self.query_count += 1
        return self._store.get(id)

class User:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email

def create_user(db, name, email):
    import random
    user = User(id=str(random.randint(1, 999)), name=name, email=email)
    db._store[user.id] = user
    db.query_count += 2
    return user
```

### JavaScript Implementation

```javascript
// expect-result.test.js

/**
 * Patterns for defining expected results in JavaScript tests.
 */

describe('Expect Result Patterns', () => {
  describe('Exact Matching', () => {
    test('exact value comparison', () => {
      const result = calculateSum(2, 3);
      expect(result).toBe(5);
    });

    test('deep equality for objects', () => {
      const user = getUser('123');
      expect(user).toEqual({
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
      });
    });
  });

  describe('Approximate Matching', () => {
    test('floating point comparison', () => {
      const result = calculateAverage([1, 2, 3]);
      expect(result).toBeCloseTo(2.0, 5);
    });
  });

  describe('Pattern Matching', () => {
    test('string matches regex', () => {
      const id = generateOrderId();
      expect(id).toMatch(/^ORD-\d{8}$/);
    });

    test('string contains substring', () => {
      const message = getErrorMessage('INVALID_INPUT');
      expect(message).toContain('invalid');
    });
  });

  describe('Structural Expectations', () => {
    test('object has expected shape', () => {
      const response = fetchUserProfile('123');

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('email');
      expect(response).not.toHaveProperty('password');
    });

    test('array meets criteria', () => {
      const results = searchProducts('laptop');

      expect(results).toHaveLength(expect.any(Number));
      expect(results.length).toBeGreaterThan(0);
      expect(results.length).toBeLessThanOrEqual(20);
      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: expect.any(String) }),
        ])
      );
    });
  });

  describe('Error Expectations', () => {
    test('function throws expected error', () => {
      expect(() => validateEmail('bad')).toThrow('Invalid email');
    });

    test('async function rejects', async () => {
      await expect(fetchProtectedResource()).rejects.toThrow('Unauthorized');
    });
  });

  describe('Custom Matchers', () => {
    test('custom expected result validation', () => {
      const result = processOrder({ items: [{ id: 1, qty: 2 }] });

      expect(result).toSatisfy((r) => r.total > 0);
      expect(result.status).toBeOneOf(['pending', 'confirmed']);
    });
  });
});

// Custom matchers
expect.extend({
  toSatisfy(received, predicate) {
    const pass = predicate(received);
    return {
      message: () => `expected ${received} to satisfy predicate`,
      pass,
    };
  },
  toBeOneOf(received, expected) {
    const pass = expected.includes(received);
    return {
      message: () =>
        `expected ${received} to be one of ${JSON.stringify(expected)}`,
      pass,
    };
  },
});

// Helper functions
function calculateSum(a, b) { return a + b; }
function calculateAverage(nums) { return nums.reduce((a, b) => a + b, 0) / nums.length; }
function generateOrderId() { return `ORD-${String(Date.now()).slice(-8)}`; }
function getErrorMessage(code) { return `The input is invalid: ${code}`; }
function fetchUserProfile(id) { return { id, name: 'Test', email: 'test@test.com' }; }
function searchProducts(q) { return [{ name: `Best ${q}`, relevance: 0.9 }]; }
function validateEmail(e) { if (!e.includes('@')) throw new Error('Invalid email'); }
async function fetchProtectedResource() { throw new Error('Unauthorized'); }
function processOrder(order) { return { total: 29.99, status: 'confirmed' }; }
```

## Best Practices

### Expect Result Checklist

```markdown
## Expect Result Best Practices

### Clarity
- [ ] Define expected results before writing test logic
- [ ] Use descriptive assertion messages
- [ ] Test one logical expectation per test
- [ ] Make expected values obvious and readable

### Precision
- [ ] Use exact matching when values are deterministic
- [ ] Use approximate matching for floating-point values
- [ ] Use pattern matching for generated or dynamic values
- [ ] Validate both positive and negative cases

### Completeness
- [ ] Verify return values
- [ ] Check state changes and side effects
- [ ] Validate error conditions and edge cases
- [ ] Test boundary values

### Maintainability
- [ ] Avoid magic numbers in expected results
- [ ] Use constants or fixtures for expected values
- [ ] Keep expected results close to assertions
- [ ] Update expected results when requirements change
```

## Conclusion

Expect results form the foundation of every test assertion. By clearly defining what you expect before comparing it to actual behavior, you create tests that are meaningful, maintainable, and reliable. Using appropriate matching strategies — exact, approximate, pattern, or structural — ensures your tests are precise without being brittle.

## Key Takeaways

1. Define expected results before writing test execution code
2. Choose the right matching strategy for each assertion
3. Use approximate matching for non-deterministic values
4. Validate both positive outcomes and error conditions
5. Check side effects in addition to return values
6. Use custom matchers for domain-specific expectations
7. Keep expected results readable and maintainable
