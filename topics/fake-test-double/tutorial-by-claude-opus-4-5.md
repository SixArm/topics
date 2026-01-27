# Fake Test Double: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A fake test double is a working implementation with simplified behavior, used in place of a real dependency during testing. For test automation professionals, fakes provide realistic behavior without the complexity, performance overhead, or external dependencies of production implementations.

## What is a Fake Test Double?

A fake is a test double with actual working logic, but implemented in a simpler way than the real component. Unlike mocks (which verify interactions) or stubs (which return canned responses), fakes maintain state and behave like simplified versions of real systems.

### Test Double Comparison

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Double Comparison                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Dummy:                                                     │
│  └── Placeholder, never actually used                       │
│                                                             │
│  Stub:                                                      │
│  └── Returns predefined values, no logic                    │
│                                                             │
│  Mock:                                                      │
│  └── Verifies expected interactions                         │
│                                                             │
│  Spy:                                                       │
│  └── Records calls to real or fake implementation           │
│                                                             │
│  Fake: ◄── THIS TUTORIAL                                   │
│  └── Working simplified implementation                      │
│      • Has actual behavior/logic                           │
│      • Maintains state                                      │
│      • Simpler than production                              │
│      • Examples: in-memory DB, fake HTTP server            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Fake Test Doubles

### Python Fake Implementations

```python
from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
from datetime import datetime
from dataclasses import dataclass, field
import uuid

# Interfaces
class UserRepository(ABC):
    @abstractmethod
    def save(self, user: 'User') -> 'User':
        pass

    @abstractmethod
    def find_by_id(self, user_id: str) -> Optional['User']:
        pass

    @abstractmethod
    def find_by_email(self, email: str) -> Optional['User']:
        pass

    @abstractmethod
    def find_all(self) -> List['User']:
        pass

    @abstractmethod
    def delete(self, user_id: str) -> bool:
        pass

class EmailService(ABC):
    @abstractmethod
    def send(self, to: str, subject: str, body: str) -> bool:
        pass

    @abstractmethod
    def get_sent_emails(self) -> List[Dict]:
        pass

class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float, card_token: str) -> 'PaymentResult':
        pass

    @abstractmethod
    def refund(self, transaction_id: str) -> bool:
        pass

# Data classes
@dataclass
class User:
    id: str
    email: str
    name: str
    created_at: datetime = field(default_factory=datetime.utcnow)

@dataclass
class PaymentResult:
    success: bool
    transaction_id: Optional[str]
    error_message: Optional[str] = None


# Fake implementations
class FakeUserRepository(UserRepository):
    """
    Fake user repository using in-memory storage.
    Provides full CRUD functionality without a database.
    """

    def __init__(self):
        self._users: Dict[str, User] = {}
        self._email_index: Dict[str, str] = {}  # email -> user_id

    def save(self, user: User) -> User:
        """Save a user to the fake repository."""
        if not user.id:
            user.id = str(uuid.uuid4())

        self._users[user.id] = user
        self._email_index[user.email] = user.id
        return user

    def find_by_id(self, user_id: str) -> Optional[User]:
        """Find a user by ID."""
        return self._users.get(user_id)

    def find_by_email(self, email: str) -> Optional[User]:
        """Find a user by email."""
        user_id = self._email_index.get(email)
        if user_id:
            return self._users.get(user_id)
        return None

    def find_all(self) -> List[User]:
        """Return all users."""
        return list(self._users.values())

    def delete(self, user_id: str) -> bool:
        """Delete a user."""
        user = self._users.get(user_id)
        if user:
            del self._users[user_id]
            if user.email in self._email_index:
                del self._email_index[user.email]
            return True
        return False

    # Test helper methods
    def clear(self):
        """Clear all data (useful between tests)."""
        self._users.clear()
        self._email_index.clear()

    def count(self) -> int:
        """Return count of users."""
        return len(self._users)


class FakeEmailService(EmailService):
    """
    Fake email service that captures sent emails.
    Useful for testing email-related functionality.
    """

    def __init__(self):
        self._sent_emails: List[Dict] = []
        self._should_fail: bool = False
        self._failure_message: str = "Email sending failed"

    def send(self, to: str, subject: str, body: str) -> bool:
        """
        'Send' an email by storing it in memory.
        """
        if self._should_fail:
            return False

        email = {
            'to': to,
            'subject': subject,
            'body': body,
            'sent_at': datetime.utcnow().isoformat()
        }
        self._sent_emails.append(email)
        return True

    def get_sent_emails(self) -> List[Dict]:
        """Return all sent emails."""
        return self._sent_emails.copy()

    # Test helper methods
    def clear(self):
        """Clear sent emails."""
        self._sent_emails.clear()

    def get_emails_to(self, recipient: str) -> List[Dict]:
        """Get emails sent to a specific recipient."""
        return [e for e in self._sent_emails if e['to'] == recipient]

    def get_last_email(self) -> Optional[Dict]:
        """Get the most recently sent email."""
        return self._sent_emails[-1] if self._sent_emails else None

    def set_should_fail(self, should_fail: bool, message: str = None):
        """Configure the fake to fail on send."""
        self._should_fail = should_fail
        if message:
            self._failure_message = message


class FakePaymentGateway(PaymentGateway):
    """
    Fake payment gateway for testing payment flows.
    """

    def __init__(self):
        self._transactions: Dict[str, Dict] = {}
        self._should_decline: bool = False
        self._decline_message: str = "Card declined"

    def charge(self, amount: float, card_token: str) -> PaymentResult:
        """Process a fake charge."""
        if self._should_decline:
            return PaymentResult(
                success=False,
                transaction_id=None,
                error_message=self._decline_message
            )

        # Simulate card validation
        if card_token.startswith('invalid_'):
            return PaymentResult(
                success=False,
                transaction_id=None,
                error_message="Invalid card token"
            )

        transaction_id = str(uuid.uuid4())
        self._transactions[transaction_id] = {
            'amount': amount,
            'card_token': card_token,
            'status': 'charged',
            'timestamp': datetime.utcnow().isoformat()
        }

        return PaymentResult(
            success=True,
            transaction_id=transaction_id
        )

    def refund(self, transaction_id: str) -> bool:
        """Process a fake refund."""
        if transaction_id in self._transactions:
            self._transactions[transaction_id]['status'] = 'refunded'
            return True
        return False

    # Test helper methods
    def set_should_decline(self, decline: bool, message: str = None):
        """Configure the fake to decline transactions."""
        self._should_decline = decline
        if message:
            self._decline_message = message

    def get_transaction(self, transaction_id: str) -> Optional[Dict]:
        """Get transaction details."""
        return self._transactions.get(transaction_id)

    def get_all_transactions(self) -> List[Dict]:
        """Get all transactions."""
        return list(self._transactions.values())

    def clear(self):
        """Clear all transactions."""
        self._transactions.clear()


# Service using the dependencies
class OrderService:
    """Service that uses repository, email, and payment dependencies."""

    def __init__(
        self,
        user_repo: UserRepository,
        email_service: EmailService,
        payment_gateway: PaymentGateway
    ):
        self.user_repo = user_repo
        self.email_service = email_service
        self.payment_gateway = payment_gateway

    def place_order(
        self,
        user_id: str,
        amount: float,
        card_token: str
    ) -> Dict[str, Any]:
        """Place an order with payment and notification."""
        # Get user
        user = self.user_repo.find_by_id(user_id)
        if not user:
            raise ValueError(f"User {user_id} not found")

        # Process payment
        payment_result = self.payment_gateway.charge(amount, card_token)
        if not payment_result.success:
            return {
                'success': False,
                'error': payment_result.error_message
            }

        # Send confirmation email
        self.email_service.send(
            to=user.email,
            subject="Order Confirmation",
            body=f"Your order for ${amount:.2f} has been placed."
        )

        return {
            'success': True,
            'transaction_id': payment_result.transaction_id
        }


# Tests using fakes
import pytest

class TestOrderServiceWithFakes:
    """Tests using fake test doubles."""

    @pytest.fixture
    def fake_user_repo(self):
        repo = FakeUserRepository()
        # Pre-populate with test user
        repo.save(User(id="user-123", email="test@example.com", name="Test User"))
        return repo

    @pytest.fixture
    def fake_email_service(self):
        return FakeEmailService()

    @pytest.fixture
    def fake_payment_gateway(self):
        return FakePaymentGateway()

    @pytest.fixture
    def order_service(self, fake_user_repo, fake_email_service, fake_payment_gateway):
        return OrderService(fake_user_repo, fake_email_service, fake_payment_gateway)

    def test_successful_order_charges_payment(
        self,
        order_service,
        fake_payment_gateway
    ):
        """Test that successful order charges payment."""
        result = order_service.place_order(
            user_id="user-123",
            amount=99.99,
            card_token="valid_token"
        )

        assert result['success'] is True
        assert result['transaction_id'] is not None

        # Verify transaction in fake
        transaction = fake_payment_gateway.get_transaction(result['transaction_id'])
        assert transaction['amount'] == 99.99
        assert transaction['status'] == 'charged'

    def test_successful_order_sends_email(
        self,
        order_service,
        fake_email_service
    ):
        """Test that successful order sends confirmation email."""
        order_service.place_order(
            user_id="user-123",
            amount=99.99,
            card_token="valid_token"
        )

        # Verify email was sent
        emails = fake_email_service.get_emails_to("test@example.com")
        assert len(emails) == 1
        assert "Order Confirmation" in emails[0]['subject']
        assert "99.99" in emails[0]['body']

    def test_declined_payment_returns_error(
        self,
        order_service,
        fake_payment_gateway,
        fake_email_service
    ):
        """Test that declined payment returns error."""
        fake_payment_gateway.set_should_decline(True, "Insufficient funds")

        result = order_service.place_order(
            user_id="user-123",
            amount=99.99,
            card_token="valid_token"
        )

        assert result['success'] is False
        assert result['error'] == "Insufficient funds"

        # No email should be sent
        assert len(fake_email_service.get_sent_emails()) == 0

    def test_invalid_user_raises_error(self, order_service):
        """Test that invalid user raises error."""
        with pytest.raises(ValueError) as exc_info:
            order_service.place_order(
                user_id="nonexistent",
                amount=99.99,
                card_token="valid_token"
            )

        assert "User nonexistent not found" in str(exc_info.value)
```

### TypeScript Fake Implementation

```typescript
// fake-implementations.ts
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<boolean>;
}

interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<void>;
}

// Fake User Repository
class FakeUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();
  private emailIndex: Map<string, string> = new Map();

  async save(user: User): Promise<User> {
    if (!user.id) {
      user.id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    this.users.set(user.id, user);
    this.emailIndex.set(user.email, user.id);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const id = this.emailIndex.get(email);
    return id ? this.users.get(id) || null : null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async delete(id: string): Promise<boolean> {
    const user = this.users.get(id);
    if (user) {
      this.users.delete(id);
      this.emailIndex.delete(user.email);
      return true;
    }
    return false;
  }

  // Test helpers
  clear(): void {
    this.users.clear();
    this.emailIndex.clear();
  }

  count(): number {
    return this.users.size;
  }
}

// Fake Cache Service
class FakeCacheService implements CacheService {
  private cache: Map<string, { value: any; expiresAt?: number }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check expiration
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;
    this.cache.set(key, { value, expiresAt });
  }

  async delete(key: string): Promise<boolean> {
    return this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  // Test helpers
  size(): number {
    return this.cache.size;
  }

  getAllKeys(): string[] {
    return Array.from(this.cache.keys());
  }
}

// Jest tests
describe('FakeUserRepository', () => {
  let repo: FakeUserRepository;

  beforeEach(() => {
    repo = new FakeUserRepository();
  });

  test('saves and retrieves user by id', async () => {
    const user: User = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date()
    };

    await repo.save(user);

    const retrieved = await repo.findById('user-123');
    expect(retrieved).toEqual(user);
  });

  test('finds user by email', async () => {
    const user: User = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date()
    };

    await repo.save(user);

    const retrieved = await repo.findByEmail('test@example.com');
    expect(retrieved?.id).toBe('user-123');
  });

  test('returns null for non-existent user', async () => {
    const retrieved = await repo.findById('nonexistent');
    expect(retrieved).toBeNull();
  });

  test('deletes user', async () => {
    const user: User = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date()
    };

    await repo.save(user);
    const deleted = await repo.delete('user-123');

    expect(deleted).toBe(true);
    expect(await repo.findById('user-123')).toBeNull();
    expect(await repo.findByEmail('test@example.com')).toBeNull();
  });
});

describe('FakeCacheService', () => {
  let cache: FakeCacheService;

  beforeEach(() => {
    cache = new FakeCacheService();
  });

  test('stores and retrieves values', async () => {
    await cache.set('key1', { data: 'value' });

    const result = await cache.get<{ data: string }>('key1');
    expect(result).toEqual({ data: 'value' });
  });

  test('returns null for missing keys', async () => {
    const result = await cache.get('missing');
    expect(result).toBeNull();
  });

  test('respects TTL expiration', async () => {
    await cache.set('key1', 'value', 1); // 1 second TTL

    // Immediately available
    expect(await cache.get('key1')).toBe('value');

    // Wait for expiration
    await new Promise(resolve => setTimeout(resolve, 1100));

    // Now expired
    expect(await cache.get('key1')).toBeNull();
  });
});
```

## When to Use Fakes

```python
class FakeUsageGuide:
    """Guide for when to use fakes vs other test doubles."""

    use_fake_when = [
        "You need realistic stateful behavior",
        "You want to test complex interactions over time",
        "The real implementation is slow or expensive",
        "You need to test without external dependencies",
        "Multiple tests need shared, consistent state",
        "The behavior is too complex to stub"
    ]

    use_stub_instead_when = [
        "You only need simple return values",
        "State doesn't matter for your test",
        "Test is focused on a single interaction"
    ]

    use_mock_instead_when = [
        "You need to verify specific interactions",
        "You want to assert method calls",
        "Behavior verification is more important than state"
    ]

    common_fakes = {
        'FakeDatabase': 'In-memory database (SQLite, H2)',
        'FakeRepository': 'In-memory data storage',
        'FakeCache': 'In-memory cache implementation',
        'FakeHttpServer': 'Local HTTP server for API testing',
        'FakeEmailService': 'Captures sent emails',
        'FakeFileSystem': 'In-memory file operations',
        'FakeClock': 'Controllable time source',
        'FakePaymentGateway': 'Simulates payment processing'
    }
```

## Best Practices

### Fake Implementation Checklist

```markdown
## Fake Test Double Best Practices

### Design
- [ ] Implement the same interface as real dependency
- [ ] Keep behavior simpler than production
- [ ] Make fakes deterministic and predictable
- [ ] Support easy state inspection for tests
- [ ] Include test helper methods (clear, count, etc.)

### State Management
- [ ] Provide clear() method to reset state
- [ ] Allow pre-population with test data
- [ ] Keep state isolated between tests
- [ ] Make state easily inspectable

### Behavior
- [ ] Simulate realistic behavior patterns
- [ ] Support failure simulation
- [ ] Handle edge cases appropriately
- [ ] Document any differences from real implementation

### Maintenance
- [ ] Keep fakes in sync with interface changes
- [ ] Test the fakes themselves
- [ ] Share fakes across test suites
- [ ] Document expected behavior
```

## Conclusion

Fake test doubles provide working simplified implementations that enable realistic testing without external dependencies. They're particularly valuable for testing stateful interactions, complex scenarios, and integration points where realistic behavior matters.

## Key Takeaways

1. Fakes have actual working logic, not just canned responses
2. Fakes maintain state across multiple operations
3. Use fakes when you need realistic behavior
4. Implement the same interface as the real dependency
5. Include test helper methods for easy verification
6. Keep fakes simpler than production implementations
7. Support failure simulation for error testing
