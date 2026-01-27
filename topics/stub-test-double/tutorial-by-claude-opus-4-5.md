# Stub Test Double: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A stub is a test double that provides predetermined responses to method calls during testing. For test automation professionals, stubs replace real dependencies with controlled implementations that return specific values, enabling isolated unit testing without relying on external systems.

## What is a Stub Test Double?

A stub replaces a real component with a simplified version that returns hardcoded or configured responses. Unlike mocks (which verify interactions) or spies (which record calls), stubs focus solely on providing indirect inputs to the system under test so it can be exercised in isolation.

### Stub in Context

```
┌─────────────────────────────────────────────────────────────┐
│                   Stub Test Double                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Test Doubles Comparison:                                   │
│  ├── Dummy: Passed but never used                          │
│  ├── Stub: Returns predetermined data ◄── This tutorial   │
│  ├── Spy: Records calls for verification                   │
│  ├── Mock: Verifies expected interactions                  │
│  └── Fake: Working implementation (simplified)             │
│                                                             │
│  How Stubs Work:                                            │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│  │  Test    │───►│ System   │───►│  Stub    │             │
│  │          │    │ Under    │◄───│ (returns │             │
│  │          │    │ Test     │    │  fixed   │             │
│  └──────────┘    └──────────┘    │  data)   │             │
│       │                          └──────────┘             │
│       │ Assert on SUT behavior                             │
│       ▼ (not on stub interactions)                         │
│                                                             │
│  Stub vs Mock:                                              │
│  ┌─────────────────────┐ ┌─────────────────────┐          │
│  │ Stub                │ │ Mock                │          │
│  │ • Provides input    │ │ • Verifies behavior │          │
│  │ • State-based test  │ │ • Interaction test  │          │
│  │ • Returns values    │ │ • Expects calls     │          │
│  │ • Assert on result  │ │ • Assert on mock    │          │
│  └─────────────────────┘ └─────────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Stubs

```python
# stub_test_double.py

"""
Stub test double patterns for test automation.
"""

import pytest
from typing import Optional, List, Dict
from dataclasses import dataclass
from unittest.mock import MagicMock


# Production code
@dataclass
class Product:
    id: str
    name: str
    price: float
    in_stock: bool


class ProductRepository:
    """Real repository (database, API, etc.)."""
    def find_by_id(self, product_id: str) -> Optional[Product]:
        raise NotImplementedError("Connects to real database")

    def find_all(self) -> List[Product]:
        raise NotImplementedError("Connects to real database")


class PricingService:
    """Service that depends on ProductRepository."""
    def __init__(self, repo: ProductRepository):
        self.repo = repo

    def get_price(self, product_id: str) -> Optional[float]:
        product = self.repo.find_by_id(product_id)
        if product is None:
            return None
        return product.price

    def get_discounted_price(self, product_id: str, discount_pct: float) -> Optional[float]:
        price = self.get_price(product_id)
        if price is None:
            return None
        return round(price * (1 - discount_pct / 100), 2)

    def total_inventory_value(self) -> float:
        products = self.repo.find_all()
        return sum(p.price for p in products if p.in_stock)


# Stub implementations
class StubProductRepository(ProductRepository):
    """Manual stub with predetermined responses."""
    def __init__(self, products: Dict[str, Product] = None):
        self._products = products or {}

    def find_by_id(self, product_id: str) -> Optional[Product]:
        return self._products.get(product_id)

    def find_all(self) -> List[Product]:
        return list(self._products.values())


# Tests using stubs
class TestWithStubs:
    """Tests using stub test doubles."""

    @pytest.fixture
    def stub_repo(self):
        """Create a stub repository with test data."""
        return StubProductRepository({
            "P001": Product("P001", "Laptop", 999.99, True),
            "P002": Product("P002", "Mouse", 29.99, True),
            "P003": Product("P003", "Keyboard", 79.99, False),
        })

    @pytest.fixture
    def service(self, stub_repo):
        return PricingService(stub_repo)

    def test_get_price(self, service):
        """Stub provides product data, test asserts on service result."""
        price = service.get_price("P001")
        assert price == 999.99

    def test_get_price_not_found(self, service):
        """Stub returns None for unknown product."""
        price = service.get_price("UNKNOWN")
        assert price is None

    def test_discounted_price(self, service):
        """Test discount calculation using stubbed data."""
        discounted = service.get_discounted_price("P001", 10)
        assert discounted == 899.99

    def test_inventory_value(self, service):
        """Stub provides all products, test checks calculation."""
        value = service.total_inventory_value()
        # Only in-stock: 999.99 + 29.99 = 1029.98
        assert value == pytest.approx(1029.98)

    def test_with_unittest_mock_as_stub(self):
        """Using unittest.mock configured as a stub."""
        repo = MagicMock(spec=ProductRepository)
        repo.find_by_id.return_value = Product("P001", "Laptop", 999.99, True)

        service = PricingService(repo)
        price = service.get_price("P001")
        assert price == 999.99

    def test_stub_different_scenarios(self):
        """Different stubs for different test scenarios."""
        empty_repo = StubProductRepository({})
        service = PricingService(empty_repo)
        assert service.total_inventory_value() == 0

        full_repo = StubProductRepository({
            f"P{i}": Product(f"P{i}", f"Item {i}", 10.0, True)
            for i in range(100)
        })
        service = PricingService(full_repo)
        assert service.total_inventory_value() == 1000.0
```

### JavaScript Implementation

```javascript
// stub-test-double.test.js

class StubProductRepository {
  constructor(products = {}) {
    this.products = products;
  }
  findById(id) { return this.products[id] || null; }
  findAll() { return Object.values(this.products); }
}

class PricingService {
  constructor(repo) { this.repo = repo; }

  getPrice(productId) {
    const product = this.repo.findById(productId);
    return product ? product.price : null;
  }

  getDiscountedPrice(productId, discountPct) {
    const price = this.getPrice(productId);
    return price !== null ? Math.round(price * (1 - discountPct / 100) * 100) / 100 : null;
  }
}

describe('Stub Test Double', () => {
  const stubRepo = new StubProductRepository({
    P001: { id: 'P001', name: 'Laptop', price: 999.99, inStock: true },
    P002: { id: 'P002', name: 'Mouse', price: 29.99, inStock: true },
  });
  const service = new PricingService(stubRepo);

  test('stub provides data for price lookup', () => {
    expect(service.getPrice('P001')).toBe(999.99);
  });

  test('stub returns null for unknown products', () => {
    expect(service.getPrice('UNKNOWN')).toBeNull();
  });

  test('discount calculation using stubbed data', () => {
    expect(service.getDiscountedPrice('P001', 10)).toBeCloseTo(899.99);
  });

  test('jest.fn() as stub', () => {
    const mockRepo = { findById: jest.fn().mockReturnValue({ price: 50 }) };
    const svc = new PricingService(mockRepo);
    expect(svc.getPrice('any')).toBe(50);
  });
});
```

## Best Practices

```markdown
## Stub Best Practices

### When to Use Stubs
- [ ] Replacing slow or unavailable external dependencies
- [ ] Testing specific scenarios (empty data, errors, edge cases)
- [ ] Isolating the system under test from side effects
- [ ] Providing deterministic test data

### Design
- [ ] Implement the same interface as the real dependency
- [ ] Keep stubs simple — only return data
- [ ] Create different stubs for different scenarios
- [ ] Use factory methods or fixtures for stub creation

### Avoid
- [ ] Don't add verification logic to stubs (use mocks instead)
- [ ] Don't make stubs overly complex
- [ ] Don't use stubs when integration tests are more appropriate
- [ ] Don't let stubs drift from real implementation behavior
```

## Conclusion

Stubs are the simplest and most focused test double, providing predetermined responses that enable isolated unit testing. By using stubs to control indirect inputs, test automation professionals write fast, deterministic tests that focus on verifying the system under test's behavior.

## Key Takeaways

1. Stubs provide predetermined responses to method calls
2. They enable state-based testing by controlling indirect inputs
3. Assert on the system under test's output, not on the stub
4. Stubs differ from mocks — stubs provide data, mocks verify behavior
5. Implement stubs using the same interface as real dependencies
6. Create different stubs for different test scenarios
7. Keep stubs simple; use mocks when interaction verification is needed
