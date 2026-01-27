# Test-Driven Development: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Test-Driven Development (TDD) is a software development methodology where tests are written before the production code they verify. For test automation professionals, TDD ensures comprehensive test coverage by design and produces code that is inherently testable.

## What is Test-Driven Development?

TDD follows a strict cycle: write a failing test (Red), write the minimum code to make it pass (Green), then improve the code structure (Refactor). This Red-Green-Refactor cycle is repeated for each small increment of functionality.

### TDD in Context

```
┌─────────────────────────────────────────────────────────────┐
│                Test-Driven Development                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  The Red-Green-Refactor Cycle:                              │
│                                                             │
│       ┌─────────┐                                          │
│       │  RED    │ Write a failing test                     │
│       │  (fail) │ for the next feature                     │
│       └────┬────┘                                          │
│            │                                                │
│            ▼                                                │
│       ┌─────────┐                                          │
│       │ GREEN  │ Write minimum code                       │
│       │ (pass) │ to make the test pass                    │
│       └────┬────┘                                          │
│            │                                                │
│            ▼                                                │
│       ┌──────────┐                                         │
│       │REFACTOR │ Improve code structure                  │
│       │ (clean) │ without changing behavior               │
│       └────┬─────┘                                         │
│            │                                                │
│            └──────── Repeat ─────────►                     │
│                                                             │
│  TDD Rules (Robert C. Martin):                              │
│  1. Write no production code except to pass a failing test │
│  2. Write only enough test to demonstrate a failure        │
│  3. Write only enough production code to pass the test     │
│                                                             │
│  Benefits:                                                  │
│  ├── 100% test coverage by construction                    │
│  ├── Code is designed for testability                      │
│  ├── Fast feedback on design decisions                     │
│  ├── Tests serve as living documentation                   │
│  └── Confidence to refactor safely                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## TDD in Practice

```python
# test_driven_development.py

"""
Demonstrating TDD by building a PasswordValidator step by step.
Each test is written first, then the implementation follows.
"""

import pytest
import re
from typing import List


# --- Step 1: RED - Write test for minimum length ---
# --- Step 2: GREEN - Implement minimum length check ---
# --- Step 3: REFACTOR - Clean up ---

class PasswordValidator:
    """Built incrementally through TDD."""

    def __init__(self, min_length: int = 8):
        self.min_length = min_length
        self.errors: List[str] = []

    def validate(self, password: str) -> bool:
        self.errors = []

        if len(password) < self.min_length:
            self.errors.append(f"Must be at least {self.min_length} characters")

        if not re.search(r'[A-Z]', password):
            self.errors.append("Must contain at least one uppercase letter")

        if not re.search(r'[a-z]', password):
            self.errors.append("Must contain at least one lowercase letter")

        if not re.search(r'[0-9]', password):
            self.errors.append("Must contain at least one digit")

        if not re.search(r'[!@#$%^&*]', password):
            self.errors.append("Must contain at least one special character")

        return len(self.errors) == 0

    def strength(self, password: str) -> str:
        score = 0
        if len(password) >= 8:
            score += 1
        if len(password) >= 12:
            score += 1
        if re.search(r'[A-Z]', password) and re.search(r'[a-z]', password):
            score += 1
        if re.search(r'[0-9]', password):
            score += 1
        if re.search(r'[!@#$%^&*]', password):
            score += 1

        if score <= 1:
            return "weak"
        elif score <= 3:
            return "medium"
        return "strong"


# --- TDD Tests (written BEFORE implementation) ---
class TestPasswordValidatorTDD:
    """Each test method represents a TDD cycle."""

    # Cycle 1: Length requirement
    def test_rejects_short_password(self):
        v = PasswordValidator(min_length=8)
        assert not v.validate("short")
        assert "at least 8 characters" in v.errors[0]

    def test_accepts_long_enough_password(self):
        v = PasswordValidator(min_length=8)
        # Still need other requirements, but length is sufficient
        result = v.validate("Abcdefg1!")
        assert "at least 8 characters" not in " ".join(v.errors)

    # Cycle 2: Uppercase requirement
    def test_rejects_no_uppercase(self):
        v = PasswordValidator()
        v.validate("abcdefgh1!")
        assert any("uppercase" in e for e in v.errors)

    def test_accepts_with_uppercase(self):
        v = PasswordValidator()
        v.validate("Abcdefgh1!")
        assert not any("uppercase" in e for e in v.errors)

    # Cycle 3: Lowercase requirement
    def test_rejects_no_lowercase(self):
        v = PasswordValidator()
        v.validate("ABCDEFGH1!")
        assert any("lowercase" in e for e in v.errors)

    # Cycle 4: Digit requirement
    def test_rejects_no_digit(self):
        v = PasswordValidator()
        v.validate("Abcdefgh!")
        assert any("digit" in e for e in v.errors)

    # Cycle 5: Special character requirement
    def test_rejects_no_special_char(self):
        v = PasswordValidator()
        v.validate("Abcdefgh1")
        assert any("special" in e for e in v.errors)

    # Cycle 6: Valid password passes all checks
    def test_valid_password_passes(self):
        v = PasswordValidator()
        assert v.validate("MyP@ssw0rd")
        assert len(v.errors) == 0

    # Cycle 7: Multiple errors reported
    def test_reports_all_errors(self):
        v = PasswordValidator()
        v.validate("")
        assert len(v.errors) >= 4  # Length + uppercase + digit + special

    # Cycle 8: Password strength
    def test_weak_password(self):
        v = PasswordValidator()
        assert v.strength("abc") == "weak"

    def test_medium_password(self):
        v = PasswordValidator()
        assert v.strength("Abcdefgh") == "medium"

    def test_strong_password(self):
        v = PasswordValidator()
        assert v.strength("MyStr0ng!Pass") == "strong"
```

```javascript
// test_driven_development.test.js

/**
 * TDD example: Building a ShoppingCart through test-first development.
 */

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Cycle 1: Add items
  addItem(name, price, quantity = 1) {
    const existing = this.items.find((i) => i.name === name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ name, price, quantity });
    }
  }

  // Cycle 2: Calculate total
  total() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Cycle 3: Remove items
  removeItem(name) {
    this.items = this.items.filter((i) => i.name !== name);
  }

  // Cycle 4: Apply discount
  applyDiscount(percentage) {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Discount must be between 0 and 100");
    }
    const discount = this.total() * (percentage / 100);
    return this.total() - discount;
  }

  // Cycle 5: Item count
  itemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

describe("ShoppingCart TDD", () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  // Cycle 1: RED then GREEN - add items
  test("starts empty", () => {
    expect(cart.itemCount()).toBe(0);
    expect(cart.total()).toBe(0);
  });

  test("adds item", () => {
    cart.addItem("Widget", 9.99);
    expect(cart.itemCount()).toBe(1);
  });

  test("adds quantity", () => {
    cart.addItem("Widget", 9.99, 3);
    expect(cart.itemCount()).toBe(3);
  });

  test("merges same item", () => {
    cart.addItem("Widget", 9.99, 2);
    cart.addItem("Widget", 9.99, 3);
    expect(cart.itemCount()).toBe(5);
  });

  // Cycle 2: Total calculation
  test("calculates total", () => {
    cart.addItem("Widget", 10, 2);
    cart.addItem("Gadget", 25, 1);
    expect(cart.total()).toBe(45);
  });

  // Cycle 3: Remove items
  test("removes item", () => {
    cart.addItem("Widget", 10);
    cart.addItem("Gadget", 25);
    cart.removeItem("Widget");
    expect(cart.itemCount()).toBe(1);
    expect(cart.total()).toBe(25);
  });

  // Cycle 4: Discounts
  test("applies discount", () => {
    cart.addItem("Widget", 100);
    expect(cart.applyDiscount(10)).toBe(90);
  });

  test("rejects invalid discount", () => {
    expect(() => cart.applyDiscount(-5)).toThrow();
    expect(() => cart.applyDiscount(101)).toThrow();
  });
});
```

## Best Practices

```markdown
## TDD Best Practices

### The Cycle
- [ ] Write the test BEFORE any production code
- [ ] Write the smallest test that fails for the right reason
- [ ] Write the minimum code to make the test pass
- [ ] Refactor only when all tests are green
- [ ] Keep cycles short (minutes, not hours)

### Test Quality
- [ ] Each test verifies one behavior
- [ ] Test names describe the expected behavior
- [ ] Tests are independent and can run in any order
- [ ] Tests are fast — slow tests break the TDD rhythm

### Common Pitfalls
- [ ] Don't skip the RED step — verify the test actually fails
- [ ] Don't write too much code in the GREEN step
- [ ] Don't refactor while tests are failing
- [ ] Don't test implementation details, test behavior
```

## Conclusion

Test-Driven Development produces well-tested, well-designed code by making testing integral to the development process rather than an afterthought. The Red-Green-Refactor cycle builds comprehensive test suites incrementally and ensures every line of code exists to make a test pass.

## Key Takeaways

1. TDD follows Red (failing test) → Green (make it pass) → Refactor (clean up)
2. Write the test before the production code, always
3. Write the minimum code to pass — resist the urge to build ahead
4. Each cycle adds one small piece of functionality
5. TDD produces inherently testable code with high coverage
6. Refactor only when tests are green — tests are your safety net
7. TDD tests serve as living documentation of expected behavior
