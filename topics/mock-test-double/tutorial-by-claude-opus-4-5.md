# Mock Test Double: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A mock test double is among the most powerful and widely used testing tools in a test automation professional's arsenal. Unlike simpler test doubles such as dummies or stubs, mocks actively participate in tests by recording interactions and verifying that expected calls were made with the correct arguments, in the correct order, and the correct number of times. Mastering mocks is essential for testing code that depends on external services, databases, APIs, or any collaborating object where verifying the interaction itself -- not just the return value -- is critical to correctness.

## What is a Mock Test Double?

A mock is a test double that is pre-programmed with expectations about which calls it will receive. After the code under test executes, the mock verifies that all expected interactions actually occurred. This makes mocks ideal for testing side effects and outgoing commands -- cases where the system under test should call a dependency in a specific way.

### Mock in the Test Double Hierarchy

```
┌──────────────────────────────────────────────────────────────────┐
│                    Test Double Spectrum                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Dummy ──── Stub ──── Spy ──── Mock ──── Fake                   │
│    │          │         │        │          │                     │
│    │          │         │        │          │                     │
│  Never     Returns   Records  Records    Working                 │
│  used      canned    calls +  calls +    simplified              │
│            values    allows   VERIFIES   implementation          │
│                      query   expectations                        │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Mock Interaction Flow:                                          │
│                                                                  │
│  ┌──────────┐    1. Call     ┌──────────┐                        │
│  │  System   │──────────────>│   Mock    │                        │
│  │  Under    │               │  Object   │                        │
│  │  Test     │<──────────────│           │                        │
│  └──────────┘  2. Response   │  Records: │                        │
│                              │  - method │                        │
│  ┌──────────┐                │  - args   │                        │
│  │  Test     │  3. Verify    │  - count  │                        │
│  │  Runner   │──────────────>│  - order  │                        │
│  └──────────┘                └──────────┘                        │
│                                                                  │
│  Key distinction: Mocks FAIL the test if expectations are        │
│  not met (verification is the primary purpose).                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Implementing Mock Test Doubles

### Python Implementation with unittest.mock

```python
"""
Mock test double examples using Python's unittest.mock.

Demonstrates: Mock, MagicMock, patch, spec, side_effect,
call verification, and practical test patterns.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Optional
from unittest.mock import Mock, MagicMock, patch, call, ANY
import pytest


# ─── Domain Classes ───────────────────────────────────────────

@dataclass
class Order:
    id: str
    customer_email: str
    items: List[str]
    total: float
    status: str = "pending"


class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float, token: str) -> dict:
        pass

    @abstractmethod
    def refund(self, transaction_id: str, amount: float) -> dict:
        pass


class EmailService(ABC):
    @abstractmethod
    def send(self, to: str, subject: str, body: str) -> bool:
        pass


class InventoryService(ABC):
    @abstractmethod
    def reserve(self, item_id: str, quantity: int) -> bool:
        pass

    @abstractmethod
    def release(self, item_id: str, quantity: int) -> None:
        pass


class OrderService:
    """Service that processes orders using multiple collaborators."""

    def __init__(
        self,
        payment: PaymentGateway,
        email: EmailService,
        inventory: InventoryService
    ):
        self.payment = payment
        self.email = email
        self.inventory = inventory

    def process_order(self, order: Order, payment_token: str) -> Order:
        """Process an order: reserve inventory, charge payment, notify."""
        # Step 1: Reserve inventory for each item
        for item in order.items:
            if not self.inventory.reserve(item, 1):
                raise ValueError(f"Item {item} is out of stock")

        # Step 2: Charge payment
        result = self.payment.charge(order.total, payment_token)
        if result.get("status") != "success":
            # Release inventory on payment failure
            for item in order.items:
                self.inventory.release(item, 1)
            raise ValueError("Payment failed")

        # Step 3: Send confirmation email
        order.status = "confirmed"
        self.email.send(
            to=order.customer_email,
            subject=f"Order {order.id} Confirmed",
            body=f"Your order of {len(order.items)} items "
                 f"totaling ${order.total:.2f} has been confirmed."
        )

        return order

    def cancel_order(self, order: Order) -> Order:
        """Cancel a confirmed order."""
        if order.status != "confirmed":
            raise ValueError("Can only cancel confirmed orders")

        self.payment.refund(order.id, order.total)

        for item in order.items:
            self.inventory.release(item, 1)

        order.status = "cancelled"
        self.email.send(
            to=order.customer_email,
            subject=f"Order {order.id} Cancelled",
            body=f"Your order has been cancelled. "
                 f"Refund of ${order.total:.2f} is being processed."
        )

        return order


# ─── Tests with Mocks ────────────────────────────────────────

class TestOrderServiceWithMocks:
    """Demonstrate mock test doubles for verifying interactions."""

    @pytest.fixture
    def mock_payment(self):
        """Mock payment gateway with spec for type safety."""
        mock = Mock(spec=PaymentGateway)
        mock.charge.return_value = {"status": "success", "txn_id": "txn-123"}
        return mock

    @pytest.fixture
    def mock_email(self):
        """Mock email service."""
        mock = Mock(spec=EmailService)
        mock.send.return_value = True
        return mock

    @pytest.fixture
    def mock_inventory(self):
        """Mock inventory service."""
        mock = Mock(spec=InventoryService)
        mock.reserve.return_value = True
        return mock

    @pytest.fixture
    def order_service(self, mock_payment, mock_email, mock_inventory):
        return OrderService(mock_payment, mock_email, mock_inventory)

    @pytest.fixture
    def sample_order(self):
        return Order(
            id="ORD-001",
            customer_email="customer@example.com",
            items=["item-a", "item-b"],
            total=49.99
        )

    # ── Verifying method was called ──

    def test_process_order_charges_payment(
        self, order_service, mock_payment, sample_order
    ):
        """Mock verifies payment.charge was called with correct args."""
        order_service.process_order(sample_order, "tok-abc")

        mock_payment.charge.assert_called_once_with(49.99, "tok-abc")

    def test_process_order_sends_confirmation_email(
        self, order_service, mock_email, sample_order
    ):
        """Mock verifies email.send was called with correct content."""
        order_service.process_order(sample_order, "tok-abc")

        mock_email.send.assert_called_once_with(
            to="customer@example.com",
            subject="Order ORD-001 Confirmed",
            body="Your order of 2 items totaling $49.99 has been confirmed."
        )

    # ── Verifying call count ──

    def test_process_order_reserves_each_item(
        self, order_service, mock_inventory, sample_order
    ):
        """Mock verifies reserve was called once per item."""
        order_service.process_order(sample_order, "tok-abc")

        assert mock_inventory.reserve.call_count == 2
        mock_inventory.reserve.assert_any_call("item-a", 1)
        mock_inventory.reserve.assert_any_call("item-b", 1)

    # ── Verifying call order ──

    def test_process_order_reserves_before_charging(
        self, order_service, mock_payment, mock_inventory, sample_order
    ):
        """Verify inventory is reserved before payment is charged."""
        call_sequence = []

        mock_inventory.reserve.side_effect = lambda *a: (
            call_sequence.append("reserve"), True
        )[1]
        mock_payment.charge.side_effect = lambda *a: (
            call_sequence.append("charge"),
            {"status": "success", "txn_id": "txn-123"}
        )[1]

        order_service.process_order(sample_order, "tok-abc")

        # All reserves should come before charge
        charge_index = call_sequence.index("charge")
        reserve_indices = [
            i for i, c in enumerate(call_sequence) if c == "reserve"
        ]
        assert all(r < charge_index for r in reserve_indices)

    # ── Verifying error handling with mocks ──

    def test_payment_failure_releases_inventory(
        self, order_service, mock_payment, mock_inventory, sample_order
    ):
        """When payment fails, mock verifies inventory is released."""
        mock_payment.charge.return_value = {"status": "declined"}

        with pytest.raises(ValueError, match="Payment failed"):
            order_service.process_order(sample_order, "tok-abc")

        # Verify rollback: release called for each reserved item
        assert mock_inventory.release.call_count == 2
        mock_inventory.release.assert_any_call("item-a", 1)
        mock_inventory.release.assert_any_call("item-b", 1)

    def test_out_of_stock_prevents_payment(
        self, order_service, mock_payment, mock_inventory, sample_order
    ):
        """When item is out of stock, payment should never be called."""
        mock_inventory.reserve.return_value = False

        with pytest.raises(ValueError, match="out of stock"):
            order_service.process_order(sample_order, "tok-abc")

        # Mock verifies charge was NEVER called
        mock_payment.charge.assert_not_called()

    # ── Using side_effect for sequential returns ──

    def test_partial_stock_failure(
        self, order_service, mock_payment, mock_inventory, sample_order
    ):
        """First item succeeds, second fails."""
        mock_inventory.reserve.side_effect = [True, False]

        with pytest.raises(ValueError, match="out of stock"):
            order_service.process_order(sample_order, "tok-abc")

    # ── Using ANY matcher ──

    def test_email_sent_to_correct_recipient(
        self, order_service, mock_email, sample_order
    ):
        """Verify recipient without caring about exact message content."""
        order_service.process_order(sample_order, "tok-abc")

        mock_email.send.assert_called_once_with(
            to="customer@example.com",
            subject=ANY,
            body=ANY
        )

    # ── Cancel order verification ──

    def test_cancel_order_refunds_and_releases(
        self, order_service, mock_payment, mock_inventory,
        mock_email, sample_order
    ):
        """Verify cancel triggers refund, inventory release, and email."""
        sample_order.status = "confirmed"

        order_service.cancel_order(sample_order)

        mock_payment.refund.assert_called_once_with("ORD-001", 49.99)
        assert mock_inventory.release.call_count == 2
        mock_email.send.assert_called_once()


# ─── Using patch decorator for module-level mocking ──────────

class ExternalAPIClient:
    """Simulates a real API client that would be patched in tests."""

    @staticmethod
    def fetch_exchange_rate(currency: str) -> float:
        # In production, this calls an external API
        raise NotImplementedError("Requires network access")


class PriceConverter:
    def convert(self, amount: float, currency: str) -> float:
        rate = ExternalAPIClient.fetch_exchange_rate(currency)
        return amount * rate


class TestPriceConverterWithPatch:
    """Demonstrate @patch for replacing module-level dependencies."""

    @patch.object(ExternalAPIClient, 'fetch_exchange_rate')
    def test_convert_uses_exchange_rate(self, mock_fetch):
        """patch replaces the real API call with a mock."""
        mock_fetch.return_value = 0.85  # 1 USD = 0.85 EUR

        converter = PriceConverter()
        result = converter.convert(100.0, "EUR")

        assert result == 85.0
        mock_fetch.assert_called_once_with("EUR")

    @patch.object(ExternalAPIClient, 'fetch_exchange_rate')
    def test_convert_handles_api_error(self, mock_fetch):
        """Mock simulates API failure via side_effect."""
        mock_fetch.side_effect = ConnectionError("API unreachable")

        converter = PriceConverter()

        with pytest.raises(ConnectionError):
            converter.convert(100.0, "EUR")
```

### JavaScript/TypeScript Implementation with jest.fn()

```typescript
// order-service.ts

interface Order {
  id: string;
  customerEmail: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface PaymentGateway {
  charge(amount: number, token: string): Promise<{ status: string; txnId: string }>;
  refund(transactionId: string, amount: number): Promise<{ status: string }>;
}

interface EmailService {
  send(to: string, subject: string, body: string): Promise<boolean>;
}

interface InventoryService {
  reserve(itemId: string, quantity: number): Promise<boolean>;
  release(itemId: string, quantity: number): Promise<void>;
}

class OrderService {
  constructor(
    private payment: PaymentGateway,
    private email: EmailService,
    private inventory: InventoryService
  ) {}

  async processOrder(order: Order, paymentToken: string): Promise<Order> {
    for (const item of order.items) {
      const reserved = await this.inventory.reserve(item, 1);
      if (!reserved) {
        throw new Error(`Item ${item} is out of stock`);
      }
    }

    const result = await this.payment.charge(order.total, paymentToken);
    if (result.status !== 'success') {
      for (const item of order.items) {
        await this.inventory.release(item, 1);
      }
      throw new Error('Payment failed');
    }

    order.status = 'confirmed';
    await this.email.send(
      order.customerEmail,
      `Order ${order.id} Confirmed`,
      `Your order of ${order.items.length} items totaling $${order.total.toFixed(2)} has been confirmed.`
    );

    return order;
  }

  async cancelOrder(order: Order): Promise<Order> {
    if (order.status !== 'confirmed') {
      throw new Error('Can only cancel confirmed orders');
    }

    await this.payment.refund(order.id, order.total);

    for (const item of order.items) {
      await this.inventory.release(item, 1);
    }

    order.status = 'cancelled';
    await this.email.send(
      order.customerEmail,
      `Order ${order.id} Cancelled`,
      `Your order has been cancelled. Refund of $${order.total.toFixed(2)} is being processed.`
    );

    return order;
  }
}

// order-service.test.ts

describe('OrderService with Mock Test Doubles', () => {
  let mockPayment: jest.Mocked<PaymentGateway>;
  let mockEmail: jest.Mocked<EmailService>;
  let mockInventory: jest.Mocked<InventoryService>;
  let service: OrderService;
  let sampleOrder: Order;

  beforeEach(() => {
    // Create mock test doubles using jest.fn()
    mockPayment = {
      charge: jest.fn().mockResolvedValue({ status: 'success', txnId: 'txn-123' }),
      refund: jest.fn().mockResolvedValue({ status: 'success' }),
    };

    mockEmail = {
      send: jest.fn().mockResolvedValue(true),
    };

    mockInventory = {
      reserve: jest.fn().mockResolvedValue(true),
      release: jest.fn().mockResolvedValue(undefined),
    };

    service = new OrderService(mockPayment, mockEmail, mockInventory);

    sampleOrder = {
      id: 'ORD-001',
      customerEmail: 'customer@example.com',
      items: ['item-a', 'item-b'],
      total: 49.99,
      status: 'pending',
    };
  });

  // ── Verifying method was called ──

  describe('payment verification', () => {
    it('charges payment with correct amount and token', async () => {
      await service.processOrder(sampleOrder, 'tok-abc');

      expect(mockPayment.charge).toHaveBeenCalledTimes(1);
      expect(mockPayment.charge).toHaveBeenCalledWith(49.99, 'tok-abc');
    });
  });

  // ── Verifying call arguments ──

  describe('email verification', () => {
    it('sends confirmation email with correct content', async () => {
      await service.processOrder(sampleOrder, 'tok-abc');

      expect(mockEmail.send).toHaveBeenCalledWith(
        'customer@example.com',
        'Order ORD-001 Confirmed',
        'Your order of 2 items totaling $49.99 has been confirmed.'
      );
    });

    it('verifies recipient without checking message body', async () => {
      await service.processOrder(sampleOrder, 'tok-abc');

      expect(mockEmail.send).toHaveBeenCalledWith(
        'customer@example.com',
        expect.any(String),
        expect.any(String)
      );
    });

    it('verifies email body contains order total', async () => {
      await service.processOrder(sampleOrder, 'tok-abc');

      expect(mockEmail.send).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        expect.stringContaining('$49.99')
      );
    });
  });

  // ── Verifying call count ──

  describe('inventory verification', () => {
    it('reserves each item exactly once', async () => {
      await service.processOrder(sampleOrder, 'tok-abc');

      expect(mockInventory.reserve).toHaveBeenCalledTimes(2);
      expect(mockInventory.reserve).toHaveBeenCalledWith('item-a', 1);
      expect(mockInventory.reserve).toHaveBeenCalledWith('item-b', 1);
    });
  });

  // ── Verifying error handling ──

  describe('payment failure handling', () => {
    it('releases inventory when payment fails', async () => {
      mockPayment.charge.mockResolvedValue({ status: 'declined', txnId: '' });

      await expect(
        service.processOrder(sampleOrder, 'tok-abc')
      ).rejects.toThrow('Payment failed');

      expect(mockInventory.release).toHaveBeenCalledTimes(2);
      expect(mockInventory.release).toHaveBeenCalledWith('item-a', 1);
      expect(mockInventory.release).toHaveBeenCalledWith('item-b', 1);
    });
  });

  describe('out of stock handling', () => {
    it('never charges payment when item is unavailable', async () => {
      mockInventory.reserve.mockResolvedValue(false);

      await expect(
        service.processOrder(sampleOrder, 'tok-abc')
      ).rejects.toThrow('out of stock');

      // Mock verifies charge was NEVER called
      expect(mockPayment.charge).not.toHaveBeenCalled();
    });
  });

  // ── Sequential mock returns ──

  describe('partial failures', () => {
    it('handles first item available, second out of stock', async () => {
      mockInventory.reserve
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false);

      await expect(
        service.processOrder(sampleOrder, 'tok-abc')
      ).rejects.toThrow('out of stock');
    });
  });

  // ── Order cancellation ──

  describe('cancel order', () => {
    it('refunds payment and releases inventory', async () => {
      sampleOrder.status = 'confirmed';

      await service.cancelOrder(sampleOrder);

      expect(mockPayment.refund).toHaveBeenCalledWith('ORD-001', 49.99);
      expect(mockInventory.release).toHaveBeenCalledTimes(2);
      expect(mockEmail.send).toHaveBeenCalledTimes(1);
      expect(sampleOrder.status).toBe('cancelled');
    });

    it('rejects cancellation of non-confirmed orders', async () => {
      sampleOrder.status = 'pending';

      await expect(service.cancelOrder(sampleOrder)).rejects.toThrow(
        'Can only cancel confirmed orders'
      );

      // Nothing should have been called
      expect(mockPayment.refund).not.toHaveBeenCalled();
      expect(mockInventory.release).not.toHaveBeenCalled();
    });
  });

  // ── Verifying call order ──

  describe('operation ordering', () => {
    it('reserves inventory before charging payment', async () => {
      const callSequence: string[] = [];

      mockInventory.reserve.mockImplementation(async () => {
        callSequence.push('reserve');
        return true;
      });

      mockPayment.charge.mockImplementation(async () => {
        callSequence.push('charge');
        return { status: 'success', txnId: 'txn-123' };
      });

      await service.processOrder(sampleOrder, 'tok-abc');

      const chargeIndex = callSequence.indexOf('charge');
      const reserveIndices = callSequence
        .map((c, i) => (c === 'reserve' ? i : -1))
        .filter((i) => i >= 0);

      expect(reserveIndices.every((i) => i < chargeIndex)).toBe(true);
    });
  });
});

// ── Using jest.spyOn for partial mocking ──

class RealCalculator {
  add(a: number, b: number): number {
    return a + b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  complexCalculation(a: number, b: number): number {
    const sum = this.add(a, b);
    const product = this.multiply(a, b);
    return sum + product;
  }
}

describe('jest.spyOn for partial mocking', () => {
  it('spies on specific methods while keeping real implementations', () => {
    const calc = new RealCalculator();
    const addSpy = jest.spyOn(calc, 'add');
    const multiplySpy = jest.spyOn(calc, 'multiply');

    const result = calc.complexCalculation(3, 4);

    expect(result).toBe(19); // (3+4) + (3*4) = 7 + 12
    expect(addSpy).toHaveBeenCalledWith(3, 4);
    expect(multiplySpy).toHaveBeenCalledWith(3, 4);

    addSpy.mockRestore();
    multiplySpy.mockRestore();
  });
});
```

## When to Use Mocks vs Other Test Doubles

### Decision Guide

```python
class MockUsageGuide:
    """When to use mocks versus other test double types."""

    use_mock_when = [
        "You need to verify a method was called (interaction testing)",
        "You need to verify call arguments, count, or order",
        "Testing side effects: email sent, event published, log written",
        "Testing outgoing commands to collaborating objects",
        "Verifying error handling and rollback behavior",
        "The interaction IS the behavior you are testing",
    ]

    use_stub_instead_when = [
        "You only need a dependency to return a specific value",
        "Testing state changes, not interactions",
        "The dependency's role is to provide data, not receive commands",
    ]

    use_dummy_instead_when = [
        "The dependency is required by the constructor but never called",
        "The parameter is irrelevant to the test scenario",
    ]

    avoid_mocking_when = [
        "Mocking value objects or simple data structures",
        "Over-specifying implementation details makes tests brittle",
        "Mocking the system under test itself",
        "The real implementation is simple and deterministic",
    ]
```

## Best Practices

### Mock Test Double Best Practices Checklist

```markdown
## Mock Test Double Best Practices

### Creating Mocks
- [ ] Use spec/interface constraints (Mock(spec=...) or jest.Mocked<T>)
- [ ] Set up return values that match realistic responses
- [ ] Use descriptive variable names (mock_payment, not m1)
- [ ] Create mocks in setUp/beforeEach for consistency
- [ ] Reset mocks between tests to avoid cross-contamination

### Verification
- [ ] Verify only the interactions you care about
- [ ] Use assert_called_once_with for exact verification
- [ ] Use ANY matchers when argument details are irrelevant
- [ ] Verify call order only when order actually matters
- [ ] Use assert_not_called to verify absence of side effects

### Avoiding Over-Mocking
- [ ] Mock collaborators, never the system under test
- [ ] Do not mock value objects or data transfer objects
- [ ] Prefer stubs when you only need return values
- [ ] Limit to 2-3 mocks per test to maintain readability
- [ ] If everything is mocked, the test may not be meaningful

### Error Simulation
- [ ] Use side_effect to simulate exceptions and errors
- [ ] Test rollback behavior when downstream calls fail
- [ ] Use sequential return values for retry logic testing
- [ ] Verify cleanup/compensation actions on failure paths

### Maintainability
- [ ] Update mocks when interfaces change
- [ ] Extract common mock setup into fixtures/factories
- [ ] Avoid testing implementation details via mock verification
- [ ] Treat brittle mock tests as a design smell
- [ ] Complement mock tests with integration tests
```

## Conclusion

Mock test doubles are indispensable for verifying that your system under test correctly interacts with its collaborators. Python's `unittest.mock` and JavaScript's `jest.fn()` provide rich, expressive APIs for creating mocks, setting expectations, and verifying interactions. The key to effective mock usage is balance: mock the right things (outgoing commands and side effects), avoid over-mocking (which leads to brittle tests), and always complement mock-based unit tests with integration tests that verify the real collaborators work together correctly.

## Key Takeaways

1. Mocks are test doubles that record interactions and verify expected calls were made, distinguishing them from stubs (which only return values) and dummies (which are never called).
2. Python's `unittest.mock` provides `Mock`, `MagicMock`, `patch`, and `spec` for creating type-safe mocks with rich verification methods like `assert_called_once_with` and `assert_not_called`.
3. JavaScript's `jest.fn()` and `jest.spyOn()` offer equivalent capabilities with methods like `toHaveBeenCalledWith`, `toHaveBeenCalledTimes`, and sequential return values via `mockResolvedValueOnce`.
4. Use mocks to verify side effects and outgoing commands -- email sending, payment processing, event publishing -- where the interaction itself is the behavior you are testing.
5. The `side_effect` parameter (Python) or `mockImplementation` (Jest) enables simulating errors, timeouts, and sequential responses to test error handling and retry logic.
6. Over-mocking is a common antipattern: if every dependency is mocked, the test verifies only wiring, not behavior, and becomes brittle to refactoring.
7. Always use spec or interface constraints when creating mocks to ensure they fail fast if the real interface changes, keeping mock tests aligned with production code.
