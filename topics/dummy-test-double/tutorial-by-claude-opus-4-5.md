# Dummy Test Double: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A dummy test double is the simplest type of test double—an object passed to satisfy parameter requirements but never actually used during test execution. For test automation professionals, understanding dummies helps write cleaner tests by clearly indicating which dependencies are irrelevant to the behavior being tested.

## What is a Dummy Test Double?

A dummy is a placeholder object that fills a required parameter but has no implementation logic. Unlike mocks or stubs, dummies are not expected to be called; they exist solely to satisfy method signatures or constructors.

### Test Double Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Double Types                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Dummy                                                      │
│  └── Placeholder, never actually used                       │
│      Example: Null object passed to constructor             │
│                                                             │
│  Stub                                                       │
│  └── Returns predefined values                              │
│      Example: Returns fixed data for queries                │
│                                                             │
│  Spy                                                        │
│  └── Records interactions for verification                  │
│      Example: Tracks method calls                           │
│                                                             │
│  Mock                                                       │
│  └── Verifies expected interactions                         │
│      Example: Expects specific method calls                 │
│                                                             │
│  Fake                                                       │
│  └── Working implementation (simplified)                    │
│      Example: In-memory database                            │
│                                                             │
│  Complexity: Dummy < Stub < Spy < Mock < Fake               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Dummy Test Doubles

### Python Implementation

```python
from abc import ABC, abstractmethod
from typing import Any, Optional
from dataclasses import dataclass

# Interfaces/Protocols
class Logger(ABC):
    @abstractmethod
    def log(self, message: str) -> None:
        pass

    @abstractmethod
    def error(self, message: str, exception: Exception = None) -> None:
        pass

class MetricsCollector(ABC):
    @abstractmethod
    def increment(self, metric: str) -> None:
        pass

    @abstractmethod
    def timing(self, metric: str, milliseconds: float) -> None:
        pass

class EmailService(ABC):
    @abstractmethod
    def send(self, to: str, subject: str, body: str) -> bool:
        pass

# Dummy implementations
class DummyLogger(Logger):
    """
    Dummy logger that does nothing.
    Used when logging is required but not relevant to the test.
    """
    def log(self, message: str) -> None:
        pass  # Intentionally empty

    def error(self, message: str, exception: Exception = None) -> None:
        pass  # Intentionally empty

class DummyMetricsCollector(MetricsCollector):
    """
    Dummy metrics collector.
    Used when metrics are required but not being tested.
    """
    def increment(self, metric: str) -> None:
        pass

    def timing(self, metric: str, milliseconds: float) -> None:
        pass

class DummyEmailService(EmailService):
    """
    Dummy email service.
    Used when email dependency exists but isn't tested.
    """
    def send(self, to: str, subject: str, body: str) -> bool:
        return True  # Minimal return to satisfy interface


# Class under test
@dataclass
class User:
    id: str
    email: str
    name: str

class UserService:
    """Service that manages user operations."""

    def __init__(
        self,
        logger: Logger,
        metrics: MetricsCollector,
        email_service: EmailService
    ):
        self.logger = logger
        self.metrics = metrics
        self.email_service = email_service
        self.users = {}

    def create_user(self, user_id: str, email: str, name: str) -> User:
        """Create a new user."""
        self.logger.log(f"Creating user: {user_id}")

        if user_id in self.users:
            raise ValueError(f"User {user_id} already exists")

        user = User(id=user_id, email=email, name=name)
        self.users[user_id] = user

        self.metrics.increment("users.created")
        self.email_service.send(
            to=email,
            subject="Welcome!",
            body=f"Hello {name}, welcome to our service!"
        )

        return user

    def get_user(self, user_id: str) -> Optional[User]:
        """Get a user by ID."""
        self.logger.log(f"Getting user: {user_id}")
        return self.users.get(user_id)

    def calculate_user_score(self, user_id: str) -> int:
        """
        Calculate user score.
        This method doesn't use logger, metrics, or email.
        """
        user = self.users.get(user_id)
        if not user:
            return 0

        # Simple scoring logic
        score = len(user.name) * 10
        return score


# Tests using dummies
import pytest

class TestUserService:
    """Tests demonstrating dummy usage."""

    @pytest.fixture
    def dummy_logger(self):
        """Dummy logger - we're not testing logging."""
        return DummyLogger()

    @pytest.fixture
    def dummy_metrics(self):
        """Dummy metrics - we're not testing metrics."""
        return DummyMetricsCollector()

    @pytest.fixture
    def dummy_email(self):
        """Dummy email - we're not testing email sending."""
        return DummyEmailService()

    @pytest.fixture
    def user_service(self, dummy_logger, dummy_metrics, dummy_email):
        """User service with all dummy dependencies."""
        return UserService(
            logger=dummy_logger,
            metrics=dummy_metrics,
            email_service=dummy_email
        )

    def test_create_user_returns_user_with_correct_data(self, user_service):
        """
        Test user creation returns correct user.
        Logger, metrics, and email are dummies - not relevant to this test.
        """
        user = user_service.create_user(
            user_id="user-123",
            email="test@example.com",
            name="John Doe"
        )

        assert user.id == "user-123"
        assert user.email == "test@example.com"
        assert user.name == "John Doe"

    def test_create_user_stores_user(self, user_service):
        """Test that created user can be retrieved."""
        user_service.create_user("user-123", "test@example.com", "John Doe")

        retrieved = user_service.get_user("user-123")

        assert retrieved is not None
        assert retrieved.id == "user-123"

    def test_create_duplicate_user_raises_error(self, user_service):
        """Test creating duplicate user raises ValueError."""
        user_service.create_user("user-123", "test@example.com", "John Doe")

        with pytest.raises(ValueError) as exc_info:
            user_service.create_user("user-123", "other@example.com", "Jane")

        assert "already exists" in str(exc_info.value)

    def test_calculate_score_for_existing_user(self, user_service):
        """
        Test score calculation.
        Dependencies are completely irrelevant here - perfect for dummies.
        """
        user_service.create_user("user-123", "test@example.com", "John Doe")

        score = user_service.calculate_user_score("user-123")

        # "John Doe" has 8 characters, score = 8 * 10 = 80
        assert score == 80

    def test_calculate_score_for_nonexistent_user(self, user_service):
        """Test score for non-existent user returns 0."""
        score = user_service.calculate_user_score("unknown")
        assert score == 0


# Demonstrating when NOT to use dummies
class TestUserServiceWithMocks:
    """Tests where dummies would be inappropriate."""

    def test_create_user_sends_welcome_email(self):
        """
        Test that welcome email is sent.
        Here we need a mock/spy, not a dummy, because email IS what we're testing.
        """
        from unittest.mock import Mock

        mock_email = Mock(spec=EmailService)
        mock_email.send.return_value = True

        service = UserService(
            logger=DummyLogger(),
            metrics=DummyMetricsCollector(),
            email_service=mock_email  # Mock, not dummy!
        )

        service.create_user("user-123", "test@example.com", "John Doe")

        mock_email.send.assert_called_once_with(
            to="test@example.com",
            subject="Welcome!",
            body="Hello John Doe, welcome to our service!"
        )

    def test_create_user_increments_metric(self):
        """
        Test that user creation metric is incremented.
        Here metrics is the SUT behavior, so we use a mock.
        """
        from unittest.mock import Mock

        mock_metrics = Mock(spec=MetricsCollector)

        service = UserService(
            logger=DummyLogger(),
            metrics=mock_metrics,  # Mock, not dummy!
            email_service=DummyEmailService()
        )

        service.create_user("user-123", "test@example.com", "John Doe")

        mock_metrics.increment.assert_called_with("users.created")
```

### JavaScript/TypeScript Implementation

```typescript
// interfaces.ts
interface Logger {
  log(message: string): void;
  error(message: string, error?: Error): void;
}

interface MetricsCollector {
  increment(metric: string): void;
  timing(metric: string, ms: number): void;
}

interface EmailService {
  send(to: string, subject: string, body: string): Promise<boolean>;
}

interface User {
  id: string;
  email: string;
  name: string;
}

// dummy-implementations.ts
class DummyLogger implements Logger {
  log(message: string): void {
    // Intentionally empty - dummy implementation
  }

  error(message: string, error?: Error): void {
    // Intentionally empty - dummy implementation
  }
}

class DummyMetricsCollector implements MetricsCollector {
  increment(metric: string): void {
    // Intentionally empty
  }

  timing(metric: string, ms: number): void {
    // Intentionally empty
  }
}

class DummyEmailService implements EmailService {
  async send(to: string, subject: string, body: string): Promise<boolean> {
    return true; // Minimal implementation
  }
}

// user-service.ts
class UserService {
  private users: Map<string, User> = new Map();

  constructor(
    private logger: Logger,
    private metrics: MetricsCollector,
    private emailService: EmailService
  ) {}

  async createUser(id: string, email: string, name: string): Promise<User> {
    this.logger.log(`Creating user: ${id}`);

    if (this.users.has(id)) {
      throw new Error(`User ${id} already exists`);
    }

    const user: User = { id, email, name };
    this.users.set(id, user);

    this.metrics.increment('users.created');

    await this.emailService.send(
      email,
      'Welcome!',
      `Hello ${name}, welcome to our service!`
    );

    return user;
  }

  getUser(id: string): User | undefined {
    this.logger.log(`Getting user: ${id}`);
    return this.users.get(id);
  }

  calculateScore(id: string): number {
    const user = this.users.get(id);
    if (!user) return 0;
    return user.name.length * 10;
  }
}

// user-service.test.ts
describe('UserService', () => {
  // Dummy instances - reused across tests
  const dummyLogger = new DummyLogger();
  const dummyMetrics = new DummyMetricsCollector();
  const dummyEmail = new DummyEmailService();

  let service: UserService;

  beforeEach(() => {
    service = new UserService(dummyLogger, dummyMetrics, dummyEmail);
  });

  describe('createUser', () => {
    it('returns user with correct data', async () => {
      const user = await service.createUser(
        'user-123',
        'test@example.com',
        'John Doe'
      );

      expect(user.id).toBe('user-123');
      expect(user.email).toBe('test@example.com');
      expect(user.name).toBe('John Doe');
    });

    it('stores user for later retrieval', async () => {
      await service.createUser('user-123', 'test@example.com', 'John Doe');

      const retrieved = service.getUser('user-123');

      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe('user-123');
    });

    it('throws error for duplicate user', async () => {
      await service.createUser('user-123', 'test@example.com', 'John Doe');

      await expect(
        service.createUser('user-123', 'other@example.com', 'Jane')
      ).rejects.toThrow('already exists');
    });
  });

  describe('calculateScore', () => {
    it('calculates score based on name length', async () => {
      await service.createUser('user-123', 'test@example.com', 'John Doe');

      const score = service.calculateScore('user-123');

      // "John Doe" = 8 chars * 10 = 80
      expect(score).toBe(80);
    });

    it('returns 0 for non-existent user', () => {
      const score = service.calculateScore('unknown');
      expect(score).toBe(0);
    });
  });
});

// When to use mocks instead of dummies
describe('UserService - Testing Interactions', () => {
  it('sends welcome email with correct content', async () => {
    const mockEmail: EmailService = {
      send: jest.fn().mockResolvedValue(true)
    };

    const service = new UserService(
      new DummyLogger(),
      new DummyMetricsCollector(),
      mockEmail // Mock, not dummy - we're testing this behavior
    );

    await service.createUser('user-123', 'test@example.com', 'John Doe');

    expect(mockEmail.send).toHaveBeenCalledWith(
      'test@example.com',
      'Welcome!',
      'Hello John Doe, welcome to our service!'
    );
  });
});
```

## When to Use Dummies

### Decision Guide

```python
class DummyUsageGuide:
    """Guide for when to use dummies vs other test doubles."""

    use_dummy_when = [
        "Parameter is required by signature but not used in test scenario",
        "Dependency exists but isn't relevant to behavior being tested",
        "You want to clearly communicate 'this is not what we're testing'",
        "Simplest possible test double will suffice",
        "Constructor requires a dependency you don't care about"
    ]

    use_stub_instead_when = [
        "Test needs the dependency to return specific values",
        "Test scenario depends on data from the dependency",
        "You need to simulate different states/responses"
    ]

    use_mock_instead_when = [
        "You need to verify the dependency was called",
        "You need to verify how the dependency was called",
        "The interaction itself is what you're testing"
    ]

    use_spy_instead_when = [
        "You want real implementation but also track calls",
        "You need partial mocking of a real object"
    ]

    use_fake_instead_when = [
        "You need working behavior, just simplified",
        "The dependency is too complex to stub entirely",
        "Multiple tests need consistent stateful behavior"
    ]
```

## Best Practices

### Dummy Best Practices Checklist

```markdown
## Dummy Test Double Best Practices

### Implementation
- [ ] Keep dummies as simple as possible
- [ ] Return minimal valid values if return is required
- [ ] Document that implementation is intentionally empty
- [ ] Implement required interface completely
- [ ] Consider using null object pattern

### Usage in Tests
- [ ] Use dummies only for truly irrelevant dependencies
- [ ] Name variables clearly (dummy_logger, not logger)
- [ ] Create reusable dummy fixtures
- [ ] Don't verify interactions with dummies
- [ ] Switch to mocks when testing interactions

### Code Quality
- [ ] Keep dummies in test code, not production
- [ ] Consider a shared test doubles library
- [ ] Regularly review if dummies should be mocks
- [ ] Document why a dummy is sufficient

### Avoid
- [ ] Using dummies when behavior matters
- [ ] Complex logic in dummy implementations
- [ ] Dummies that throw exceptions
- [ ] Mixing dummy and mock responsibilities
```

## Conclusion

Dummy test doubles are the simplest form of test double, serving as placeholders for required but irrelevant dependencies. They help create focused tests that clearly communicate what is and isn't being tested, improving test readability and maintainability.

## Key Takeaways

1. Dummies are placeholders that satisfy signatures but aren't used
2. Use dummies when dependencies are completely irrelevant
3. Dummies should have minimal or no implementation
4. Switch to mocks when verifying interactions matters
5. Clear naming (dummy_*) communicates intent
6. Dummies simplify tests and improve focus
7. Know when to upgrade to more capable test doubles
