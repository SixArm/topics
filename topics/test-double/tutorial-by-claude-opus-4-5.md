# Test Double: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A test double is any object that stands in for a real dependency during testing. The term, coined by Gerard Meszaros, encompasses five distinct types: dummy, stub, spy, mock, and fake. For test automation professionals, understanding test doubles is essential for writing isolated, fast, and reliable tests.

## What is a Test Double?

Test doubles replace real dependencies — databases, APIs, file systems, third-party services — with controlled substitutes during testing. This isolates the code under test so failures reflect bugs in the tested code, not in external systems.

### Test Doubles in Context

```
┌─────────────────────────────────────────────────────────────┐
│                      Test Doubles                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Five Types of Test Doubles:                                │
│                                                             │
│  ┌──────────┐  Passed around but never used.               │
│  │  Dummy   │  Satisfies parameter requirements.           │
│  └──────────┘                                              │
│  ┌──────────┐  Returns pre-configured values.              │
│  │  Stub    │  No logic, just canned answers.              │
│  └──────────┘                                              │
│  ┌──────────┐  Records calls for later assertion.          │
│  │  Spy     │  Optionally delegates to real.               │
│  └──────────┘                                              │
│  ┌──────────┐  Sets expectations before execution.         │
│  │  Mock    │  Fails if expectations not met.              │
│  └──────────┘                                              │
│  ┌──────────┐  Working simplified implementation.          │
│  │  Fake    │  In-memory DB, local file store.             │
│  └──────────┘                                              │
│                                                             │
│  When to Use Each:                                          │
│  ├── Dummy: Constructor requires it, test doesn't use it   │
│  ├── Stub: Control what a dependency returns               │
│  ├── Spy: Verify interactions after the fact               │
│  ├── Mock: Enforce expected interactions upfront           │
│  └── Fake: Need realistic behavior without real infra      │
│                                                             │
│  Isolation Benefit:                                         │
│  Real: Code ──► Database ──► Network ──► Slow, Flaky      │
│  Double: Code ──► Fake DB ──► Fast, Deterministic          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Test Doubles

```python
# test_double.py

"""
Test double patterns for test automation.
"""

import pytest
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any


# Define the interface that doubles will implement
class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float, card_token: str) -> Dict:
        pass

    @abstractmethod
    def refund(self, transaction_id: str) -> Dict:
        pass


# --- Dummy ---
class DummyPaymentGateway(PaymentGateway):
    """Never actually called. Satisfies type requirements."""
    def charge(self, amount, card_token):
        raise NotImplementedError("Dummy should not be called")

    def refund(self, transaction_id):
        raise NotImplementedError("Dummy should not be called")


# --- Stub ---
class StubPaymentGateway(PaymentGateway):
    """Returns pre-configured responses."""
    def __init__(self, charge_success=True, refund_success=True):
        self.charge_success = charge_success
        self.refund_success = refund_success

    def charge(self, amount, card_token):
        if self.charge_success:
            return {"status": "success", "transaction_id": "txn_stub_123"}
        return {"status": "declined", "error": "Insufficient funds"}

    def refund(self, transaction_id):
        if self.refund_success:
            return {"status": "refunded"}
        return {"status": "failed", "error": "Transaction not found"}


# --- Spy ---
class SpyPaymentGateway(PaymentGateway):
    """Records all calls for later assertion."""
    def __init__(self):
        self.charge_calls: List[Dict] = []
        self.refund_calls: List[Dict] = []

    def charge(self, amount, card_token):
        self.charge_calls.append({"amount": amount, "card_token": card_token})
        return {"status": "success", "transaction_id": "txn_spy_123"}

    def refund(self, transaction_id):
        self.refund_calls.append({"transaction_id": transaction_id})
        return {"status": "refunded"}


# --- Mock ---
class MockPaymentGateway(PaymentGateway):
    """Sets expectations and verifies them."""
    def __init__(self):
        self.expected_charges: List[Dict] = []
        self.actual_charges: List[Dict] = []

    def expect_charge(self, amount: float, card_token: str):
        self.expected_charges.append({"amount": amount, "card_token": card_token})

    def charge(self, amount, card_token):
        self.actual_charges.append({"amount": amount, "card_token": card_token})
        return {"status": "success", "transaction_id": "txn_mock_123"}

    def refund(self, transaction_id):
        return {"status": "refunded"}

    def verify(self) -> bool:
        return self.expected_charges == self.actual_charges


# --- Fake ---
class FakePaymentGateway(PaymentGateway):
    """Working in-memory implementation."""
    def __init__(self):
        self.transactions: Dict[str, Dict] = {}
        self.next_id = 1

    def charge(self, amount, card_token):
        if amount <= 0:
            return {"status": "declined", "error": "Invalid amount"}
        txn_id = f"txn_fake_{self.next_id}"
        self.next_id += 1
        self.transactions[txn_id] = {"amount": amount, "card_token": card_token, "status": "charged"}
        return {"status": "success", "transaction_id": txn_id}

    def refund(self, transaction_id):
        if transaction_id not in self.transactions:
            return {"status": "failed", "error": "Transaction not found"}
        self.transactions[transaction_id]["status"] = "refunded"
        return {"status": "refunded"}


# System under test
class OrderProcessor:
    def __init__(self, payment: PaymentGateway):
        self.payment = payment

    def process_order(self, amount: float, card_token: str) -> Dict:
        result = self.payment.charge(amount, card_token)
        if result["status"] == "success":
            return {"order_status": "confirmed", "transaction_id": result["transaction_id"]}
        return {"order_status": "failed", "error": result.get("error")}

    def cancel_order(self, transaction_id: str) -> Dict:
        result = self.payment.refund(transaction_id)
        return {"cancel_status": result["status"]}


# Tests
class TestTestDoubles:

    def test_stub_controls_response(self):
        stub = StubPaymentGateway(charge_success=False)
        processor = OrderProcessor(stub)
        result = processor.process_order(50.0, "tok_123")
        assert result["order_status"] == "failed"

    def test_spy_records_interactions(self):
        spy = SpyPaymentGateway()
        processor = OrderProcessor(spy)
        processor.process_order(50.0, "tok_abc")
        processor.process_order(75.0, "tok_def")

        assert len(spy.charge_calls) == 2
        assert spy.charge_calls[0]["amount"] == 50.0
        assert spy.charge_calls[1]["card_token"] == "tok_def"

    def test_mock_verifies_expectations(self):
        mock = MockPaymentGateway()
        mock.expect_charge(50.0, "tok_123")

        processor = OrderProcessor(mock)
        processor.process_order(50.0, "tok_123")

        assert mock.verify()

    def test_mock_fails_wrong_expectations(self):
        mock = MockPaymentGateway()
        mock.expect_charge(50.0, "tok_123")

        processor = OrderProcessor(mock)
        processor.process_order(99.0, "tok_wrong")

        assert not mock.verify()

    def test_fake_has_working_logic(self):
        fake = FakePaymentGateway()
        processor = OrderProcessor(fake)

        result = processor.process_order(50.0, "tok_123")
        assert result["order_status"] == "confirmed"
        txn_id = result["transaction_id"]

        # Fake maintains state
        assert fake.transactions[txn_id]["status"] == "charged"

        processor.cancel_order(txn_id)
        assert fake.transactions[txn_id]["status"] == "refunded"

    def test_fake_rejects_invalid_amount(self):
        fake = FakePaymentGateway()
        processor = OrderProcessor(fake)
        result = processor.process_order(-10.0, "tok_123")
        assert result["order_status"] == "failed"
```

## Best Practices

```markdown
## Choosing the Right Test Double

### Selection Guide
- [ ] Use dummies when a parameter is required but unused
- [ ] Use stubs to control dependency return values
- [ ] Use spies to verify interactions after execution
- [ ] Use mocks to enforce expected interactions
- [ ] Use fakes for complex logic needing realistic behavior

### Implementation
- [ ] Define interfaces/protocols that doubles implement
- [ ] Keep doubles simple — complex doubles indicate design issues
- [ ] Prefer stubs and fakes over mocks for readability
- [ ] Use framework-provided doubles (pytest-mock, Jest) when appropriate

### Maintenance
- [ ] Update doubles when interfaces change
- [ ] Test fakes themselves to ensure correctness
- [ ] Don't over-mock — too many doubles means too much coupling
- [ ] Prefer real implementations when they're fast and deterministic
```

## Conclusion

Test doubles are fundamental tools for writing isolated, fast, and deterministic tests. By choosing the appropriate double type — dummy, stub, spy, mock, or fake — test automation professionals control dependencies precisely and verify that code interacts correctly with its collaborators.

## Key Takeaways

1. Test doubles replace real dependencies to isolate code under test
2. Five types: dummy (placeholder), stub (canned answers), spy (records calls), mock (enforces expectations), fake (simplified real)
3. Stubs control inputs; spies and mocks verify outputs and interactions
4. Fakes provide realistic behavior without real infrastructure
5. Define interfaces so doubles and real implementations are interchangeable
6. Choose the simplest double that meets the test's needs
7. Over-doubling is a code smell — it may indicate tight coupling
