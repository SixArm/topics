# Functional Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Functional testing verifies that software functions according to its specified requirements. For test automation professionals, functional testing is a core activity that validates what the system does — its features, capabilities, and user interactions — independent of how it is implemented internally.

## What is Functional Testing?

Functional testing evaluates each function of a software application by providing appropriate input and verifying the output against the functional requirements. It is black-box testing focused on business requirements and user expectations.

### Functional Testing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Functional Testing                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Testing Spectrum:                                          │
│  ┌────────────────────┐ ┌───────────────────────┐          │
│  │ Functional Testing │ │ Non-Functional Testing│          │
│  ├────────────────────┤ ├───────────────────────┤          │
│  │ • What it does     │ │ • How well it does it │          │
│  │ • Features work    │ │ • Performance         │          │
│  │ • Requirements met │ │ • Security            │          │
│  │ • User flows       │ │ • Usability           │          │
│  └────────────────────┘ └───────────────────────┘          │
│                                                             │
│  Functional Testing Levels:                                 │
│  ┌──────────────────────────────────┐                      │
│  │        E2E / Acceptance         │ ← Full workflows     │
│  ├──────────────────────────────────┤                      │
│  │      Integration Testing        │ ← Components together│
│  ├──────────────────────────────────┤                      │
│  │        Unit Testing             │ ← Individual units   │
│  └──────────────────────────────────┘                      │
│                                                             │
│  Functional Test Types:                                     │
│  ├── Smoke testing: Critical paths work                    │
│  ├── Sanity testing: Specific functionality after change   │
│  ├── Regression testing: Existing features still work      │
│  ├── Acceptance testing: Meets business requirements       │
│  └── End-to-end testing: Complete user workflows           │
│                                                             │
│  Approach:                                                  │
│  ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐       │
│  │  Input │──►│ System │──►│ Output │──►│Compare │       │
│  │  Data  │   │  Under │   │  Data  │   │Expected│       │
│  └────────┘   │  Test  │   └────────┘   └────────┘       │
│               └────────┘                                   │
│                 (Black Box)                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Functional Tests

```python
# functional_testing.py

"""
Functional testing patterns and examples.
"""

import pytest
from dataclasses import dataclass
from typing import List, Optional, Dict
from decimal import Decimal
from datetime import date, timedelta


# System Under Test
@dataclass
class Product:
    id: str
    name: str
    price: Decimal
    stock: int
    category: str


@dataclass
class CartItem:
    product: Product
    quantity: int

    @property
    def subtotal(self) -> Decimal:
        return self.product.price * self.quantity


class ShoppingCart:
    """Shopping cart with business rules."""

    def __init__(self):
        self.items: List[CartItem] = []
        self.discount_code: Optional[str] = None
        self._discount_rate: Decimal = Decimal("0")

    def add_item(self, product: Product, quantity: int = 1):
        if quantity <= 0:
            raise ValueError("Quantity must be positive")
        if quantity > product.stock:
            raise ValueError(f"Only {product.stock} items in stock")

        for item in self.items:
            if item.product.id == product.id:
                new_qty = item.quantity + quantity
                if new_qty > product.stock:
                    raise ValueError(f"Only {product.stock} items in stock")
                item.quantity = new_qty
                return

        self.items.append(CartItem(product=product, quantity=quantity))

    def remove_item(self, product_id: str):
        self.items = [i for i in self.items if i.product.id != product_id]

    def update_quantity(self, product_id: str, quantity: int):
        if quantity <= 0:
            self.remove_item(product_id)
            return
        for item in self.items:
            if item.product.id == product_id:
                if quantity > item.product.stock:
                    raise ValueError(f"Only {item.product.stock} items in stock")
                item.quantity = quantity
                return
        raise ValueError(f"Product {product_id} not in cart")

    def apply_discount(self, code: str):
        discounts = {
            "SAVE10": Decimal("0.10"),
            "SAVE20": Decimal("0.20"),
            "HALF": Decimal("0.50"),
        }
        if code not in discounts:
            raise ValueError("Invalid discount code")
        self.discount_code = code
        self._discount_rate = discounts[code]

    @property
    def subtotal(self) -> Decimal:
        return sum((item.subtotal for item in self.items), Decimal("0"))

    @property
    def discount_amount(self) -> Decimal:
        return (self.subtotal * self._discount_rate).quantize(Decimal("0.01"))

    @property
    def total(self) -> Decimal:
        return self.subtotal - self.discount_amount

    @property
    def item_count(self) -> int:
        return sum(item.quantity for item in self.items)


# Functional Tests
class TestShoppingCartFunctionality:
    """Functional tests for shopping cart."""

    @pytest.fixture
    def laptop(self):
        return Product("P001", "Laptop", Decimal("999.99"), stock=10, category="electronics")

    @pytest.fixture
    def mouse(self):
        return Product("P002", "Mouse", Decimal("29.99"), stock=50, category="electronics")

    @pytest.fixture
    def cart(self):
        return ShoppingCart()

    # --- Add to Cart ---

    def test_add_single_item(self, cart, laptop):
        cart.add_item(laptop)
        assert cart.item_count == 1
        assert cart.subtotal == Decimal("999.99")

    def test_add_multiple_items(self, cart, laptop, mouse):
        cart.add_item(laptop)
        cart.add_item(mouse, quantity=2)
        assert cart.item_count == 3
        assert cart.subtotal == Decimal("1059.97")

    def test_add_same_item_increases_quantity(self, cart, laptop):
        cart.add_item(laptop, quantity=1)
        cart.add_item(laptop, quantity=2)
        assert cart.item_count == 3
        assert len(cart.items) == 1  # Still one line item

    def test_add_item_exceeding_stock_fails(self, cart, laptop):
        with pytest.raises(ValueError, match="in stock"):
            cart.add_item(laptop, quantity=11)

    def test_add_item_with_zero_quantity_fails(self, cart, laptop):
        with pytest.raises(ValueError, match="positive"):
            cart.add_item(laptop, quantity=0)

    # --- Remove from Cart ---

    def test_remove_item(self, cart, laptop, mouse):
        cart.add_item(laptop)
        cart.add_item(mouse)
        cart.remove_item("P001")
        assert cart.item_count == 1
        assert cart.subtotal == Decimal("29.99")

    def test_remove_nonexistent_item_is_safe(self, cart, laptop):
        cart.add_item(laptop)
        cart.remove_item("NONEXISTENT")
        assert cart.item_count == 1

    # --- Update Quantity ---

    def test_update_quantity(self, cart, laptop):
        cart.add_item(laptop, quantity=1)
        cart.update_quantity("P001", 3)
        assert cart.item_count == 3

    def test_update_quantity_to_zero_removes(self, cart, laptop):
        cart.add_item(laptop)
        cart.update_quantity("P001", 0)
        assert cart.item_count == 0

    # --- Discounts ---

    def test_apply_valid_discount(self, cart, laptop):
        cart.add_item(laptop)
        cart.apply_discount("SAVE10")
        assert cart.discount_amount == Decimal("100.00")
        assert cart.total == Decimal("899.99")

    def test_apply_invalid_discount_fails(self, cart):
        with pytest.raises(ValueError, match="Invalid"):
            cart.apply_discount("BOGUS")

    # --- Cart Totals ---

    def test_empty_cart_total(self, cart):
        assert cart.total == Decimal("0")
        assert cart.item_count == 0

    def test_cart_total_with_discount(self, cart, laptop, mouse):
        cart.add_item(laptop)
        cart.add_item(mouse, quantity=2)
        cart.apply_discount("SAVE20")
        expected_subtotal = Decimal("1059.97")
        expected_discount = Decimal("212.00")  # Rounded to cents
        assert cart.subtotal == expected_subtotal
        assert cart.discount_amount == expected_discount
        assert cart.total == expected_subtotal - expected_discount
```

### JavaScript Functional Tests

```javascript
// functional-testing.test.js

class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountRate = 0;
  }

  addItem(product, quantity = 1) {
    if (quantity <= 0) throw new Error('Quantity must be positive');
    if (quantity > product.stock) throw new Error(`Only ${product.stock} in stock`);

    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItem(productId) {
    this.items = this.items.filter((i) => i.product.id !== productId);
  }

  get subtotal() {
    return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  get total() {
    return this.subtotal * (1 - this.discountRate);
  }

  get itemCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }
}

describe('Shopping Cart Functional Tests', () => {
  let cart;
  const laptop = { id: 'P001', name: 'Laptop', price: 999.99, stock: 10 };
  const mouse = { id: 'P002', name: 'Mouse', price: 29.99, stock: 50 };

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  test('adds single item to cart', () => {
    cart.addItem(laptop);
    expect(cart.itemCount).toBe(1);
    expect(cart.subtotal).toBeCloseTo(999.99);
  });

  test('adds multiple different items', () => {
    cart.addItem(laptop);
    cart.addItem(mouse, 2);
    expect(cart.itemCount).toBe(3);
    expect(cart.subtotal).toBeCloseTo(1059.97);
  });

  test('rejects quantity exceeding stock', () => {
    expect(() => cart.addItem(laptop, 11)).toThrow('in stock');
  });

  test('removes item from cart', () => {
    cart.addItem(laptop);
    cart.addItem(mouse);
    cart.removeItem('P001');
    expect(cart.itemCount).toBe(1);
  });

  test('empty cart has zero total', () => {
    expect(cart.total).toBe(0);
    expect(cart.itemCount).toBe(0);
  });

  test('applies discount to total', () => {
    cart.addItem(laptop);
    cart.discountRate = 0.1;
    expect(cart.total).toBeCloseTo(899.99);
  });
});
```

## Best Practices

```markdown
## Functional Testing Best Practices

### Test Design
- [ ] Derive tests from requirements and user stories
- [ ] Cover positive, negative, and edge cases
- [ ] Test complete user workflows end-to-end
- [ ] Use boundary value analysis
- [ ] Include equivalence partitioning

### Organization
- [ ] Group tests by feature or user story
- [ ] Maintain traceability to requirements
- [ ] Prioritize critical path testing
- [ ] Balance breadth and depth of coverage

### Automation
- [ ] Automate regression-critical functional tests
- [ ] Use data-driven testing for multiple scenarios
- [ ] Keep tests independent and isolated
- [ ] Make tests readable as living documentation

### Maintenance
- [ ] Update tests when requirements change
- [ ] Remove obsolete tests promptly
- [ ] Review test effectiveness regularly
- [ ] Track functional coverage metrics
```

## Conclusion

Functional testing validates that software meets its specified requirements by testing what the system does from the user's perspective. By systematically testing features through automated functional tests, teams ensure that business requirements are met and regressions are caught early.

## Key Takeaways

1. Functional testing verifies what the system does against requirements
2. It is black-box testing focused on inputs, outputs, and business rules
3. Cover positive, negative, and boundary conditions
4. Test complete user workflows, not just individual functions
5. Automate regression-critical functional tests
6. Maintain traceability between tests and requirements
7. Keep functional tests readable as living documentation
