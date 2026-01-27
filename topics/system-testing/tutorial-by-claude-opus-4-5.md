# System Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

System testing evaluates a complete, integrated system to verify it meets specified requirements. For test automation professionals, system testing validates end-to-end functionality, ensuring all components work together correctly in an environment that mirrors production.

## What is System Testing?

System testing is a level of testing where a complete system is tested as a whole. It occurs after integration testing and before acceptance testing, validating both functional and non-functional requirements in an environment that resembles production.

### System Testing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                     System Testing                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Testing Levels:                                            │
│  ┌──────────────────────────────────────┐                  │
│  │       Acceptance Testing             │ User validates   │
│  ├──────────────────────────────────────┤                  │
│  │       System Testing  ◄── Here      │ Complete system  │
│  ├──────────────────────────────────────┤                  │
│  │       Integration Testing            │ Components       │
│  ├──────────────────────────────────────┤                  │
│  │       Unit Testing                   │ Individual units │
│  └──────────────────────────────────────┘                  │
│                                                             │
│  System Test Scope:                                         │
│  ┌──────────────────────────────────────┐                  │
│  │  Frontend → API → Services → DB     │                  │
│  │  ┌────┐  ┌────┐  ┌────┐  ┌────┐    │                  │
│  │  │ UI │─►│API │─►│Svc │─►│ DB │    │                  │
│  │  └────┘  └────┘  └────┘  └────┘    │                  │
│  │  All components tested together      │                  │
│  └──────────────────────────────────────┘                  │
│                                                             │
│  System Test Types:                                         │
│  ├── Functional: Features work correctly                   │
│  ├── Performance: Response times, throughput               │
│  ├── Security: Access control, data protection             │
│  ├── Recovery: System recovers from failures               │
│  ├── Compatibility: Works across environments              │
│  └── Usability: User experience meets standards            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing System Tests

```python
# system_testing.py

"""
System testing patterns for end-to-end validation.
"""

import pytest
from dataclasses import dataclass
from typing import List, Dict, Optional


@dataclass
class SystemTestCase:
    id: str
    name: str
    preconditions: List[str]
    steps: List[str]
    expected_results: List[str]
    category: str  # functional, performance, security
    priority: str  # critical, high, medium, low


class SystemTestSuite:
    """Manage and execute system test cases."""

    def __init__(self):
        self.test_cases: List[SystemTestCase] = []
        self.results: Dict[str, str] = {}

    def add_test_case(self, tc: SystemTestCase):
        self.test_cases.append(tc)

    def get_by_category(self, category: str) -> List[SystemTestCase]:
        return [tc for tc in self.test_cases if tc.category == category]

    def get_by_priority(self, priority: str) -> List[SystemTestCase]:
        return [tc for tc in self.test_cases if tc.priority == priority]

    def record_result(self, test_id: str, status: str):
        self.results[test_id] = status

    @property
    def pass_rate(self) -> float:
        if not self.results:
            return 0
        passed = sum(1 for s in self.results.values() if s == "pass")
        return passed / len(self.results) * 100


# End-to-end system test examples
class TestECommerceSystem:
    """System tests for e-commerce platform."""

    def test_complete_purchase_flow(self):
        """System test: complete purchase from browse to confirmation."""
        # Browse products
        products = api_get("/api/products")
        assert len(products) > 0

        # Add to cart
        cart = api_post("/api/cart/items", {"product_id": products[0]["id"], "quantity": 1})
        assert cart["item_count"] == 1

        # Checkout
        order = api_post("/api/checkout", {
            "shipping": {"address": "123 Test St", "city": "Test"},
            "payment": {"method": "test_card"}
        })
        assert order["status"] == "confirmed"
        assert order["order_id"] is not None

        # Verify order appears in history
        history = api_get(f"/api/orders/{order['order_id']}")
        assert history["status"] == "confirmed"

    def test_search_and_filter(self):
        """System test: search with filters produces correct results."""
        results = api_get("/api/search", params={
            "q": "laptop", "min_price": 500, "max_price": 1500
        })
        assert all(500 <= r["price"] <= 1500 for r in results)
        assert all("laptop" in r["name"].lower() for r in results)

    def test_user_registration_to_first_order(self):
        """System test: new user complete journey."""
        # Register
        user = api_post("/api/auth/register", {
            "name": "New User", "email": "new@test.com", "password": "Str0ng!Pass"
        })
        assert user["id"] is not None

        # Login
        session = api_post("/api/auth/login", {
            "email": "new@test.com", "password": "Str0ng!Pass"
        })
        assert session["token"] is not None

        # Place order (with auth)
        cart = api_post("/api/cart/items", {"product_id": "P001", "quantity": 1})
        order = api_post("/api/checkout", {"payment": {"method": "test_card"}})
        assert order["status"] == "confirmed"

    def test_error_handling_across_system(self):
        """System test: error handling works end-to-end."""
        # Invalid product
        result = api_get("/api/products/nonexistent")
        assert result.get("error") is not None
        assert result.get("status_code") == 404

        # Invalid checkout
        result = api_post("/api/checkout", {})
        assert result.get("error") is not None


class TestSystemTestSuite:
    """Test the system test management framework."""

    def test_suite_management(self):
        suite = SystemTestSuite()
        suite.add_test_case(SystemTestCase(
            "ST-001", "Complete Purchase", ["User logged in"],
            ["Add to cart", "Checkout"], ["Order confirmed"],
            "functional", "critical"
        ))
        suite.add_test_case(SystemTestCase(
            "ST-002", "Performance Under Load", ["System running"],
            ["Send 1000 requests"], ["P95 < 2s"],
            "performance", "high"
        ))

        assert len(suite.get_by_category("functional")) == 1
        assert len(suite.get_by_priority("critical")) == 1

    def test_pass_rate_tracking(self):
        suite = SystemTestSuite()
        suite.record_result("ST-001", "pass")
        suite.record_result("ST-002", "pass")
        suite.record_result("ST-003", "fail")

        assert suite.pass_rate == pytest.approx(66.67, abs=0.1)


# API helpers (stubs for demonstration)
def api_get(path, params=None):
    if "products" in path and "nonexistent" in path:
        return {"error": "Not found", "status_code": 404}
    if "products" in path:
        return [{"id": "P001", "name": "Test Laptop", "price": 999}]
    if "orders" in path:
        return {"status": "confirmed"}
    if "search" in path:
        return [{"name": "Best Laptop", "price": 999}]
    return {}

def api_post(path, data):
    if "cart" in path:
        return {"item_count": 1}
    if "checkout" in path:
        if not data:
            return {"error": "Missing data"}
        return {"status": "confirmed", "order_id": "ORD-12345"}
    if "register" in path:
        return {"id": "USR-001"}
    if "login" in path:
        return {"token": "test-jwt-token"}
    return {}
```

## Best Practices

```markdown
## System Testing Best Practices

### Test Design
- [ ] Test complete user workflows end-to-end
- [ ] Cover both functional and non-functional requirements
- [ ] Test error handling across system boundaries
- [ ] Include positive, negative, and edge case scenarios

### Environment
- [ ] Use production-like test environments
- [ ] Include all system components (DB, cache, queues)
- [ ] Use realistic test data volumes
- [ ] Test with production-like configurations

### Execution
- [ ] Run system tests after integration tests pass
- [ ] Prioritize critical business flows
- [ ] Automate repeatable system tests
- [ ] Monitor system resources during tests

### Maintenance
- [ ] Keep system tests aligned with requirements
- [ ] Update tests when system architecture changes
- [ ] Review test coverage against feature list
- [ ] Track system test pass rates over time
```

## Conclusion

System testing validates that the complete, integrated system meets its requirements. By testing end-to-end workflows in production-like environments, test automation professionals catch integration issues and system-level defects that lower-level tests miss.

## Key Takeaways

1. System testing evaluates the complete system as a whole
2. It covers both functional and non-functional requirements
3. Test complete user journeys from start to finish
4. Use production-like environments for realistic validation
5. Cover error handling across system boundaries
6. Prioritize critical business workflows
7. System tests complement but don't replace unit and integration tests
