# Spy Test Double: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A spy is a test double that records information about how it was called — arguments, call count, return values — while optionally delegating to the real implementation. For test automation professionals, spies enable behavior verification without replacing the entire dependency, making them ideal for testing interactions.

## What is a Spy Test Double?

A spy wraps a real or fake function, recording each invocation so tests can assert on how the code under test interacted with its dependencies. Unlike stubs (which replace behavior) or mocks (which set expectations upfront), spies observe behavior after the fact.

### Spy Test Double in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Spy Test Double                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Test Double Spectrum:                                      │
│  ├── Dummy: Placeholder, never actually used               │
│  ├── Stub: Returns pre-configured values                   │
│  ├── Spy: Records calls, optionally delegates ◄──          │
│  ├── Mock: Pre-set expectations, verifies calls            │
│  └── Fake: Working implementation (simplified)             │
│                                                             │
│  How a Spy Works:                                           │
│                                                             │
│  Test Code ──► Spy ──► Real Implementation (optional)      │
│                 │                                           │
│                 ▼                                           │
│           Call Record:                                      │
│           ├── call_count: 3                                │
│           ├── args: [(1,), (2,), (3,)]                    │
│           ├── returns: [10, 20, 30]                        │
│           └── exceptions: []                               │
│                                                             │
│  Key Difference from Mock:                                  │
│  Mock: Set expectations BEFORE → run → auto-verify         │
│  Spy:  Run → inspect recordings AFTER → assert manually    │
│                                                             │
│  When to Use Spies:                                         │
│  ├── Verify a method was called with correct args          │
│  ├── Count how many times something was invoked            │
│  ├── Inspect call order across collaborators               │
│  └── Test side effects while keeping real behavior         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing and Using Spies

```python
# spy_test_double.py

"""
Spy test double patterns for test automation.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Any, Callable, Optional, Tuple
from datetime import datetime


@dataclass
class CallRecord:
    args: tuple
    kwargs: dict
    return_value: Any = None
    exception: Optional[Exception] = None
    timestamp: float = field(default_factory=lambda: datetime.now().timestamp())


class Spy:
    """A generic spy that records all calls."""

    def __init__(self, delegate: Optional[Callable] = None, return_value: Any = None):
        self.delegate = delegate
        self.default_return = return_value
        self.calls: List[CallRecord] = []

    def __call__(self, *args, **kwargs):
        record = CallRecord(args=args, kwargs=kwargs)
        try:
            if self.delegate:
                result = self.delegate(*args, **kwargs)
            else:
                result = self.default_return
            record.return_value = result
            self.calls.append(record)
            return result
        except Exception as e:
            record.exception = e
            self.calls.append(record)
            raise

    @property
    def call_count(self) -> int:
        return len(self.calls)

    @property
    def called(self) -> bool:
        return self.call_count > 0

    @property
    def last_call(self) -> Optional[CallRecord]:
        return self.calls[-1] if self.calls else None

    def called_with(self, *args, **kwargs) -> bool:
        return any(
            c.args == args and c.kwargs == kwargs for c in self.calls
        )

    def call_args_list(self) -> List[Tuple]:
        return [c.args for c in self.calls]

    def reset(self):
        self.calls.clear()


class EmailService:
    """Real email service to be spied on."""

    def send(self, to: str, subject: str, body: str) -> bool:
        # In production, this sends a real email
        return True


class NotificationSystem:
    """System under test that uses EmailService."""

    def __init__(self, email_service: EmailService):
        self.email_service = email_service

    def notify_users(self, users: List[str], message: str) -> dict:
        sent = []
        failed = []
        for user in users:
            try:
                success = self.email_service.send(
                    to=user,
                    subject="Notification",
                    body=message
                )
                if success:
                    sent.append(user)
                else:
                    failed.append(user)
            except Exception:
                failed.append(user)
        return {"sent": sent, "failed": failed}


class SpyEmailService(EmailService):
    """Spy wrapping EmailService — records calls, delegates to real."""

    def __init__(self, delegate: Optional[EmailService] = None):
        self.send_spy = Spy(
            delegate=delegate.send if delegate else None,
            return_value=True
        )

    def send(self, to: str, subject: str, body: str) -> bool:
        return self.send_spy(to, subject, body)


# Tests
class TestSpyTestDouble:
    """Test spy behavior and patterns."""

    def test_spy_records_calls(self):
        spy = Spy(return_value=42)
        result = spy(1, 2, key="value")

        assert result == 42
        assert spy.call_count == 1
        assert spy.called
        assert spy.last_call.args == (1, 2)
        assert spy.last_call.kwargs == {"key": "value"}

    def test_spy_delegates_to_real(self):
        real_fn = lambda x: x * 2
        spy = Spy(delegate=real_fn)

        assert spy(5) == 10
        assert spy(3) == 6
        assert spy.call_count == 2

    def test_spy_records_exceptions(self):
        def failing():
            raise ValueError("boom")

        spy = Spy(delegate=failing)
        with pytest.raises(ValueError):
            spy()

        assert spy.call_count == 1
        assert spy.last_call.exception is not None

    def test_called_with_check(self):
        spy = Spy(return_value=None)
        spy("hello", count=3)
        spy("world", count=1)

        assert spy.called_with("hello", count=3)
        assert spy.called_with("world", count=1)
        assert not spy.called_with("missing")

    def test_spy_email_service(self):
        spy_service = SpyEmailService()
        system = NotificationSystem(spy_service)

        result = system.notify_users(
            ["alice@test.com", "bob@test.com"],
            "Test message"
        )

        assert result["sent"] == ["alice@test.com", "bob@test.com"]
        assert spy_service.send_spy.call_count == 2
        assert spy_service.send_spy.called_with("alice@test.com", "Notification", "Test message")
        assert spy_service.send_spy.called_with("bob@test.com", "Notification", "Test message")

    def test_spy_verifies_call_order(self):
        spy = Spy(return_value=None)
        spy("first")
        spy("second")
        spy("third")

        args_list = spy.call_args_list()
        assert args_list == [("first",), ("second",), ("third",)]

    def test_spy_reset(self):
        spy = Spy(return_value=None)
        spy("call1")
        assert spy.call_count == 1

        spy.reset()
        assert spy.call_count == 0
        assert not spy.called
```

```javascript
// spy_test_double.test.js

/**
 * Spy test double patterns using Jest built-in spies.
 */

class AuditLogger {
  log(action, user, details) {
    // In production, writes to audit log
    return { logged: true, timestamp: Date.now() };
  }
}

class OrderService {
  constructor(auditLogger) {
    this.auditLogger = auditLogger;
  }

  placeOrder(userId, items) {
    const orderId = `ORD-${Date.now()}`;
    this.auditLogger.log("order_placed", userId, { orderId, items });
    return { orderId, status: "placed" };
  }

  cancelOrder(userId, orderId) {
    this.auditLogger.log("order_cancelled", userId, { orderId });
    return { orderId, status: "cancelled" };
  }
}

describe("Spy Test Double with Jest", () => {
  test("jest.spyOn records calls to real method", () => {
    const logger = new AuditLogger();
    const spy = jest.spyOn(logger, "log");

    const service = new OrderService(logger);
    service.placeOrder("user-1", ["item-a"]);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("order_placed", "user-1", expect.objectContaining({
      items: ["item-a"],
    }));

    spy.mockRestore();
  });

  test("spy tracks multiple calls", () => {
    const logger = new AuditLogger();
    const spy = jest.spyOn(logger, "log");

    const service = new OrderService(logger);
    service.placeOrder("user-1", ["item-a"]);
    service.cancelOrder("user-1", "ORD-123");

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toBe("order_placed");
    expect(spy.mock.calls[1][0]).toBe("order_cancelled");

    spy.mockRestore();
  });

  test("jest.fn as spy with custom implementation", () => {
    const spy = jest.fn((x) => x * 2);

    expect(spy(5)).toBe(10);
    expect(spy(3)).toBe(6);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(5);
    expect(spy).toHaveBeenCalledWith(3);
  });

  test("spy call order verification", () => {
    const spy = jest.fn();

    spy("first");
    spy("second");
    spy("third");

    expect(spy.mock.calls).toEqual([["first"], ["second"], ["third"]]);
    expect(spy).toHaveBeenNthCalledWith(1, "first");
    expect(spy).toHaveBeenNthCalledWith(2, "second");
    expect(spy).toHaveBeenNthCalledWith(3, "third");
  });
});
```

## Best Practices

```markdown
## Using Spy Test Doubles

### When to Use Spies
- [ ] Verify correct arguments passed to dependencies
- [ ] Count invocations of side-effect methods
- [ ] Inspect call ordering across collaborators
- [ ] Keep real behavior while observing interactions

### Spy vs Mock
- [ ] Use spies for post-hoc assertion (assert after running)
- [ ] Use mocks for pre-set expectations (define before running)
- [ ] Use spies when you want real behavior plus observation
- [ ] Use mocks when you need to control return values precisely

### Spy Hygiene
- [ ] Reset spies between tests to avoid cross-contamination
- [ ] Restore spied methods after tests (mockRestore in Jest)
- [ ] Don't over-spy — only observe what the test needs
- [ ] Prefer spying on public interfaces, not internal details
```

## Conclusion

Spy test doubles enable test automation professionals to verify interactions between components without replacing real behavior. By recording calls, arguments, and return values, spies provide post-hoc verification that code interacts correctly with its dependencies.

## Key Takeaways

1. Spies record calls and arguments while optionally delegating to real implementations
2. Unlike mocks, spies verify behavior after execution rather than setting expectations before
3. Use spies to verify call counts, argument correctness, and invocation order
4. Framework support is built in: `jest.spyOn()` in Jest, `unittest.mock.patch` in Python
5. Spies are ideal when you want real behavior plus interaction verification
6. Reset spies between tests to prevent state leakage
7. Don't over-spy — only observe the interactions your test needs to verify
