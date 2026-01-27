# Unit Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Unit testing verifies that individual functions, methods, or classes work correctly in isolation. For test automation professionals, unit tests form the foundation of the test pyramid — they are the fastest, cheapest, and most numerous tests in a well-designed test suite.

## What is Unit Testing?

A unit test exercises the smallest testable part of an application — typically a single function or method — with known inputs and verifies the outputs. Unit tests run without external dependencies (databases, networks, file systems) by using test doubles when needed.

### Unit Testing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                     Unit Testing                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  The Test Pyramid:                                          │
│           ╱╲                                               │
│          ╱E2E╲    Slow, expensive, few                     │
│         ╱──────╲                                           │
│        ╱Integr. ╲  Moderate speed and count                │
│       ╱────────────╲                                       │
│      ╱  Unit Tests  ╲  Fast, cheap, many  ◄── This topic  │
│     ╱────────────────╲                                     │
│                                                             │
│  Unit Test Characteristics (F.I.R.S.T.):                    │
│  ├── Fast: Milliseconds per test                           │
│  ├── Isolated: No external dependencies                    │
│  ├── Repeatable: Same result every time                    │
│  ├── Self-validating: Pass or fail, no manual check        │
│  └── Timely: Written alongside production code             │
│                                                             │
│  What Makes a Good Unit:                                    │
│  ├── Pure functions (no side effects)                      │
│  ├── Class methods with clear inputs/outputs               │
│  ├── Data transformations and calculations                 │
│  ├── Business logic and validation rules                   │
│  └── State machines and decision logic                     │
│                                                             │
│  What Unit Tests Do NOT Test:                               │
│  ├── Database queries (integration test)                   │
│  ├── API endpoints (integration/E2E test)                  │
│  ├── Multi-component workflows (E2E test)                  │
│  └── UI rendering (component/E2E test)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Writing Unit Tests

```python
# unit_testing.py

"""
Unit testing fundamentals and patterns.
"""

import pytest
from dataclasses import dataclass
from typing import List, Optional


# --- System Under Test ---

class PriceCalculator:
    """Business logic for calculating prices."""

    TAX_RATE = 0.08
    BULK_THRESHOLD = 10
    BULK_DISCOUNT = 0.10

    def calculate_subtotal(self, unit_price: float, quantity: int) -> float:
        if unit_price < 0:
            raise ValueError("Price cannot be negative")
        if quantity < 0:
            raise ValueError("Quantity cannot be negative")
        return unit_price * quantity

    def apply_discount(self, subtotal: float, discount_pct: float) -> float:
        if discount_pct < 0 or discount_pct > 100:
            raise ValueError("Discount must be between 0 and 100")
        return subtotal * (1 - discount_pct / 100)

    def calculate_tax(self, amount: float) -> float:
        return round(amount * self.TAX_RATE, 2)

    def calculate_total(self, unit_price: float, quantity: int, discount_pct: float = 0) -> dict:
        subtotal = self.calculate_subtotal(unit_price, quantity)

        # Auto-apply bulk discount
        if quantity >= self.BULK_THRESHOLD:
            discount_pct = max(discount_pct, self.BULK_DISCOUNT * 100)

        discounted = self.apply_discount(subtotal, discount_pct)
        tax = self.calculate_tax(discounted)
        total = round(discounted + tax, 2)

        return {
            "subtotal": subtotal,
            "discount_pct": discount_pct,
            "after_discount": discounted,
            "tax": tax,
            "total": total,
        }


class PasswordStrengthChecker:
    """Check password strength with specific rules."""

    def check(self, password: str) -> dict:
        checks = {
            "length": len(password) >= 8,
            "uppercase": any(c.isupper() for c in password),
            "lowercase": any(c.islower() for c in password),
            "digit": any(c.isdigit() for c in password),
            "special": any(c in "!@#$%^&*()-_+=[]{}|;:,.<>?" for c in password),
        }

        score = sum(checks.values())
        strength = "weak" if score <= 2 else "medium" if score <= 4 else "strong"

        return {
            "checks": checks,
            "score": score,
            "strength": strength,
            "valid": checks["length"] and score >= 3,
        }


# --- Unit Tests ---

class TestPriceCalculator:
    """Unit tests for PriceCalculator."""

    @pytest.fixture
    def calc(self):
        return PriceCalculator()

    # Positive cases
    def test_subtotal_basic(self, calc):
        assert calc.calculate_subtotal(10.0, 5) == 50.0

    def test_subtotal_zero_quantity(self, calc):
        assert calc.calculate_subtotal(10.0, 0) == 0.0

    def test_subtotal_single_item(self, calc):
        assert calc.calculate_subtotal(29.99, 1) == 29.99

    # Edge cases
    def test_subtotal_negative_price_raises(self, calc):
        with pytest.raises(ValueError, match="Price cannot be negative"):
            calc.calculate_subtotal(-10.0, 1)

    def test_subtotal_negative_quantity_raises(self, calc):
        with pytest.raises(ValueError, match="Quantity cannot be negative"):
            calc.calculate_subtotal(10.0, -1)

    # Discount
    def test_discount_applied(self, calc):
        assert calc.apply_discount(100.0, 20) == 80.0

    def test_discount_zero(self, calc):
        assert calc.apply_discount(100.0, 0) == 100.0

    def test_discount_full(self, calc):
        assert calc.apply_discount(100.0, 100) == 0.0

    def test_discount_invalid_raises(self, calc):
        with pytest.raises(ValueError):
            calc.apply_discount(100.0, 101)

    # Tax
    def test_tax_calculation(self, calc):
        assert calc.calculate_tax(100.0) == 8.0

    def test_tax_rounding(self, calc):
        assert calc.calculate_tax(33.33) == 2.67

    # Total (integration of sub-functions)
    def test_total_no_discount(self, calc):
        result = calc.calculate_total(10.0, 5)
        assert result["subtotal"] == 50.0
        assert result["total"] == 54.0  # 50 + 8% tax

    def test_total_with_bulk_discount(self, calc):
        result = calc.calculate_total(10.0, 10)
        assert result["discount_pct"] == 10.0
        assert result["after_discount"] == 90.0

    # Parametrized tests
    @pytest.mark.parametrize("price,qty,expected_subtotal", [
        (0, 100, 0),
        (1, 1, 1),
        (9.99, 3, 29.97),
        (0.01, 1, 0.01),
    ])
    def test_subtotal_parametrized(self, calc, price, qty, expected_subtotal):
        assert calc.calculate_subtotal(price, qty) == pytest.approx(expected_subtotal)


class TestPasswordStrength:
    """Unit tests for password validation."""

    def test_strong_password(self):
        result = PasswordStrengthChecker().check("MyP@ss123")
        assert result["strength"] == "strong"
        assert result["valid"]

    def test_weak_password(self):
        result = PasswordStrengthChecker().check("abc")
        assert result["strength"] == "weak"
        assert not result["valid"]

    def test_medium_password(self):
        result = PasswordStrengthChecker().check("Password1")
        assert result["strength"] == "medium"

    def test_empty_password(self):
        result = PasswordStrengthChecker().check("")
        assert result["strength"] == "weak"
        assert not result["valid"]

    @pytest.mark.parametrize("password,expected_strength", [
        ("abc", "weak"),
        ("abcdefgh", "medium"),
        ("Abcdefgh", "medium"),
        ("Abcdefg1", "medium"),
        ("Abcde1!z", "strong"),
    ])
    def test_strength_levels(self, password, expected_strength):
        result = PasswordStrengthChecker().check(password)
        assert result["strength"] == expected_strength
```

```javascript
// unit_testing.test.js

/**
 * Unit testing fundamentals with Jest.
 */

class EmailValidator {
  validate(email) {
    if (!email || typeof email !== "string") {
      return { valid: false, error: "Email is required" };
    }

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
      return { valid: false, error: "Invalid email format" };
    }

    if (email.length > 254) {
      return { valid: false, error: "Email too long" };
    }

    return { valid: true, normalized: email.toLowerCase().trim() };
  }
}

describe("EmailValidator", () => {
  const validator = new EmailValidator();

  test("accepts valid email", () => {
    const result = validator.validate("user@example.com");
    expect(result.valid).toBe(true);
    expect(result.normalized).toBe("user@example.com");
  });

  test("rejects empty string", () => {
    expect(validator.validate("").valid).toBe(false);
  });

  test("rejects null", () => {
    expect(validator.validate(null).valid).toBe(false);
  });

  test("rejects missing @", () => {
    expect(validator.validate("userexample.com").valid).toBe(false);
  });

  test("rejects missing domain", () => {
    expect(validator.validate("user@").valid).toBe(false);
  });

  test("normalizes to lowercase", () => {
    const result = validator.validate("User@Example.COM");
    expect(result.normalized).toBe("user@example.com");
  });

  test.each([
    ["user@example.com", true],
    ["a@b.c", true],
    ["invalid", false],
    ["@no-local.com", false],
    ["no-domain@", false],
  ])("validates %s → %s", (email, expected) => {
    expect(validator.validate(email).valid).toBe(expected);
  });
});
```

## Best Practices

```markdown
## Unit Testing Best Practices

### Test Design
- [ ] One assertion concept per test (related assertions are fine)
- [ ] Test behavior, not implementation details
- [ ] Cover positive, negative, and edge cases
- [ ] Use parametrized tests for input variants

### F.I.R.S.T. Principles
- [ ] Fast: Each test runs in milliseconds
- [ ] Isolated: No shared state between tests
- [ ] Repeatable: Same result on every run
- [ ] Self-validating: Clear pass/fail, no manual inspection
- [ ] Timely: Written alongside or before production code

### Coverage
- [ ] Test all public methods
- [ ] Test boundary conditions (0, 1, max, empty)
- [ ] Test error paths and exceptions
- [ ] Don't test trivial getters/setters
```

## Conclusion

Unit tests are the foundation of reliable test automation. They run fast, catch bugs early, and make refactoring safe. By following the F.I.R.S.T. principles and testing behavior rather than implementation, test automation professionals build unit test suites that provide lasting value.

## Key Takeaways

1. Unit tests verify individual functions or methods in isolation
2. They form the base of the test pyramid — fast, cheap, and numerous
3. Follow F.I.R.S.T.: Fast, Isolated, Repeatable, Self-validating, Timely
4. Test behavior (what it does) not implementation (how it does it)
5. Use parametrized tests to cover multiple inputs efficiently
6. Test positive cases, negative cases, and boundary conditions
7. Unit tests make refactoring safe by catching regressions immediately
