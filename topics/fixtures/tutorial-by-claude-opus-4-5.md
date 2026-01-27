# Fixtures: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Fixtures are reusable test components that provide a fixed baseline state for tests. For test automation professionals, fixtures enable consistent test setup, reduce code duplication, and improve test maintainability by centralizing test data and configuration.

## What are Fixtures?

Fixtures establish the preconditions necessary for tests to run. They can include test data, mock objects, database connections, configured services, or any other state that tests depend on.

### Fixture Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                    Fixture Lifecycle                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Test Session Start                                         │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────────────┐                                       │
│  │ Session Fixtures│  ← Run once per test session          │
│  └────────┬────────┘                                       │
│           │                                                 │
│           ▼                                                 │
│  ┌─────────────────┐                                       │
│  │ Module Fixtures │  ← Run once per test module           │
│  └────────┬────────┘                                       │
│           │                                                 │
│           ▼                                                 │
│  ┌─────────────────┐                                       │
│  │ Class Fixtures  │  ← Run once per test class            │
│  └────────┬────────┘                                       │
│           │                                                 │
│           ▼                                                 │
│  ┌─────────────────┐                                       │
│  │Function Fixtures│  ← Run before/after each test         │
│  └────────┬────────┘                                       │
│           │                                                 │
│           ▼                                                 │
│      Test Runs                                              │
│           │                                                 │
│           ▼                                                 │
│  Teardown (reverse order)                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Pytest Fixtures

### Basic Fixtures

```python
import pytest
from typing import Generator, Dict, Any
from dataclasses import dataclass
from datetime import datetime
import tempfile
import shutil
import os

@dataclass
class User:
    id: str
    email: str
    name: str
    is_active: bool = True

@dataclass
class Product:
    id: str
    name: str
    price: float
    stock: int

# Simple fixtures
@pytest.fixture
def sample_user() -> User:
    """Provide a sample user for tests."""
    return User(
        id="user-123",
        email="test@example.com",
        name="Test User"
    )

@pytest.fixture
def sample_product() -> Product:
    """Provide a sample product for tests."""
    return Product(
        id="prod-456",
        name="Test Widget",
        price=29.99,
        stock=100
    )

# Fixture with teardown using yield
@pytest.fixture
def temp_directory() -> Generator[str, None, None]:
    """Provide a temporary directory that's cleaned up after the test."""
    temp_dir = tempfile.mkdtemp()
    yield temp_dir
    shutil.rmtree(temp_dir)

# Fixture using another fixture
@pytest.fixture
def user_with_orders(sample_user: User) -> Dict[str, Any]:
    """Provide a user with associated orders."""
    return {
        'user': sample_user,
        'orders': [
            {'id': 'order-1', 'total': 100.00},
            {'id': 'order-2', 'total': 50.00}
        ]
    }

# Parameterized fixtures
@pytest.fixture(params=['admin', 'user', 'guest'])
def user_role(request) -> str:
    """Provide different user roles for testing."""
    return request.param

@pytest.fixture(params=[
    {'currency': 'USD', 'symbol': '$'},
    {'currency': 'EUR', 'symbol': '€'},
    {'currency': 'GBP', 'symbol': '£'}
])
def currency_config(request) -> Dict[str, str]:
    """Provide different currency configurations."""
    return request.param


# Tests using fixtures
class TestUserOperations:
    def test_user_has_email(self, sample_user: User):
        """Test that user has an email."""
        assert sample_user.email == "test@example.com"

    def test_user_orders_total(self, user_with_orders: Dict):
        """Test calculating total from user orders."""
        total = sum(o['total'] for o in user_with_orders['orders'])
        assert total == 150.00

    def test_user_role_permissions(self, user_role: str):
        """Test runs once for each role."""
        permissions = get_permissions(user_role)
        assert len(permissions) > 0

    def test_price_formatting(self, sample_product: Product, currency_config: Dict):
        """Test price formatting with different currencies."""
        formatted = f"{currency_config['symbol']}{sample_product.price:.2f}"
        assert currency_config['symbol'] in formatted


def get_permissions(role: str) -> list:
    """Helper function to get permissions."""
    perms = {'admin': ['read', 'write', 'delete'], 'user': ['read', 'write'], 'guest': ['read']}
    return perms.get(role, [])
```

### Fixture Scopes

```python
import pytest
from typing import Generator
import time

# Function scope (default) - runs for each test
@pytest.fixture(scope="function")
def function_fixture() -> str:
    """Created fresh for each test function."""
    print("\n  Creating function fixture")
    return f"function-{time.time()}"

# Class scope - runs once per test class
@pytest.fixture(scope="class")
def class_fixture() -> str:
    """Shared across all tests in a class."""
    print("\n  Creating class fixture")
    return f"class-{time.time()}"

# Module scope - runs once per test module
@pytest.fixture(scope="module")
def module_fixture() -> str:
    """Shared across all tests in a module."""
    print("\n  Creating module fixture")
    return f"module-{time.time()}"

# Session scope - runs once per test session
@pytest.fixture(scope="session")
def session_fixture() -> str:
    """Shared across all tests in the session."""
    print("\n  Creating session fixture")
    return f"session-{time.time()}"


# Database connection fixture (common pattern)
@pytest.fixture(scope="session")
def database_connection() -> Generator:
    """Create database connection once per session."""
    print("\nConnecting to database...")
    connection = create_database_connection()
    yield connection
    print("\nClosing database connection...")
    connection.close()

@pytest.fixture(scope="function")
def database_transaction(database_connection) -> Generator:
    """Create a transaction that rolls back after each test."""
    transaction = database_connection.begin()
    yield transaction
    transaction.rollback()

def create_database_connection():
    """Mock database connection."""
    class MockConnection:
        def begin(self):
            return MockTransaction()
        def close(self):
            pass
    return MockConnection()

class MockTransaction:
    def rollback(self):
        pass


# Test demonstrating scopes
class TestFixtureScopes:
    def test_first(
        self,
        function_fixture,
        class_fixture,
        module_fixture,
        session_fixture
    ):
        print(f"\n    Function: {function_fixture}")
        print(f"    Class: {class_fixture}")
        print(f"    Module: {module_fixture}")
        print(f"    Session: {session_fixture}")

    def test_second(
        self,
        function_fixture,
        class_fixture,
        module_fixture,
        session_fixture
    ):
        # function_fixture is different
        # class_fixture, module_fixture, session_fixture are the same
        print(f"\n    Function: {function_fixture}")
        print(f"    Class: {class_fixture}")
```

### Fixture Factories

```python
import pytest
from typing import Callable, Dict, Any
from dataclasses import dataclass
from datetime import datetime, timedelta
import uuid

@dataclass
class Order:
    id: str
    user_id: str
    items: list
    total: float
    status: str
    created_at: datetime

# Factory fixture for creating orders
@pytest.fixture
def order_factory() -> Callable[..., Order]:
    """Factory for creating Order objects with customizable attributes."""
    created_orders = []

    def _create_order(
        user_id: str = "default-user",
        items: list = None,
        total: float = 100.00,
        status: str = "pending",
        created_at: datetime = None
    ) -> Order:
        order = Order(
            id=str(uuid.uuid4()),
            user_id=user_id,
            items=items or [{"product": "Widget", "qty": 1}],
            total=total,
            status=status,
            created_at=created_at or datetime.utcnow()
        )
        created_orders.append(order)
        return order

    return _create_order


@pytest.fixture
def user_factory() -> Callable[..., User]:
    """Factory for creating User objects."""
    counter = 0

    def _create_user(
        email: str = None,
        name: str = None,
        is_active: bool = True
    ) -> User:
        nonlocal counter
        counter += 1

        return User(
            id=f"user-{counter}",
            email=email or f"user{counter}@example.com",
            name=name or f"User {counter}",
            is_active=is_active
        )

    return _create_user


# Using factory fixtures
class TestOrderProcessing:
    def test_single_order(self, order_factory):
        """Test with a single order."""
        order = order_factory(total=50.00)
        assert order.total == 50.00
        assert order.status == "pending"

    def test_multiple_orders(self, order_factory):
        """Test with multiple orders."""
        orders = [
            order_factory(total=100.00),
            order_factory(total=200.00),
            order_factory(total=300.00)
        ]
        total = sum(o.total for o in orders)
        assert total == 600.00

    def test_order_with_specific_date(self, order_factory):
        """Test order with specific creation date."""
        yesterday = datetime.utcnow() - timedelta(days=1)
        order = order_factory(created_at=yesterday)
        assert order.created_at == yesterday

    def test_orders_for_different_users(self, order_factory, user_factory):
        """Test orders for multiple users."""
        user1 = user_factory()
        user2 = user_factory()

        orders_user1 = [order_factory(user_id=user1.id) for _ in range(3)]
        orders_user2 = [order_factory(user_id=user2.id) for _ in range(2)]

        assert all(o.user_id == user1.id for o in orders_user1)
        assert all(o.user_id == user2.id for o in orders_user2)
```

### conftest.py for Shared Fixtures

```python
# conftest.py - shared fixtures across multiple test files

import pytest
from typing import Generator, Dict
import os

# Configuration fixtures
@pytest.fixture(scope="session")
def app_config() -> Dict:
    """Application configuration for tests."""
    return {
        'database_url': os.getenv('TEST_DB_URL', 'sqlite:///:memory:'),
        'api_base_url': os.getenv('TEST_API_URL', 'http://localhost:8000'),
        'debug': True
    }

# Database fixtures
@pytest.fixture(scope="session")
def db_engine(app_config):
    """Create database engine for the test session."""
    from sqlalchemy import create_engine
    engine = create_engine(app_config['database_url'])
    yield engine
    engine.dispose()

@pytest.fixture(scope="session")
def db_tables(db_engine):
    """Create database tables."""
    # Create all tables
    from myapp.models import Base
    Base.metadata.create_all(db_engine)
    yield
    Base.metadata.drop_all(db_engine)

@pytest.fixture(scope="function")
def db_session(db_engine, db_tables) -> Generator:
    """Provide a database session with rollback."""
    from sqlalchemy.orm import sessionmaker
    Session = sessionmaker(bind=db_engine)
    session = Session()
    yield session
    session.rollback()
    session.close()

# API client fixtures
@pytest.fixture(scope="module")
def api_client(app_config):
    """Provide an API client for integration tests."""
    import httpx
    client = httpx.Client(base_url=app_config['api_base_url'])
    yield client
    client.close()

# Authentication fixtures
@pytest.fixture
def auth_headers(api_client) -> Dict[str, str]:
    """Provide authentication headers."""
    # Login and get token
    response = api_client.post('/auth/login', json={
        'email': 'test@example.com',
        'password': 'testpass123'
    })
    token = response.json()['token']
    return {'Authorization': f'Bearer {token}'}

# Cleanup fixtures
@pytest.fixture(autouse=True)
def cleanup_test_data(db_session):
    """Automatically clean up test data after each test."""
    yield
    # Cleanup happens via rollback in db_session fixture
```

## Jest/JavaScript Fixtures

```typescript
// fixtures.ts - Shared test fixtures for Jest

import { User, Product, Order } from './types';

// Factory functions
export const createUser = (overrides: Partial<User> = {}): User => ({
  id: `user-${Date.now()}`,
  email: 'test@example.com',
  name: 'Test User',
  isActive: true,
  ...overrides
});

export const createProduct = (overrides: Partial<Product> = {}): Product => ({
  id: `prod-${Date.now()}`,
  name: 'Test Product',
  price: 29.99,
  stock: 100,
  ...overrides
});

export const createOrder = (overrides: Partial<Order> = {}): Order => ({
  id: `order-${Date.now()}`,
  userId: 'user-123',
  items: [{ productId: 'prod-1', quantity: 1, price: 29.99 }],
  total: 29.99,
  status: 'pending',
  createdAt: new Date(),
  ...overrides
});

// Test data sets
export const testUsers = {
  admin: createUser({ id: 'admin-1', email: 'admin@example.com', name: 'Admin' }),
  regularUser: createUser({ id: 'user-1', email: 'user@example.com', name: 'User' }),
  inactiveUser: createUser({ id: 'inactive-1', isActive: false })
};

// Jest beforeEach/afterEach patterns
describe('OrderService', () => {
  let orderService: OrderService;
  let mockRepository: jest.Mocked<OrderRepository>;

  // Setup fixture
  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn()
    };
    orderService = new OrderService(mockRepository);
  });

  // Cleanup fixture
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates order for user', async () => {
    const user = createUser();
    const order = createOrder({ userId: user.id });

    mockRepository.save.mockResolvedValue(order);

    const result = await orderService.createOrder(user.id, order.items);

    expect(result.userId).toBe(user.id);
  });
});
```

## Best Practices

### Fixture Best Practices Checklist

```markdown
## Fixture Best Practices

### Design
- [ ] Keep fixtures focused and single-purpose
- [ ] Use descriptive names that indicate what the fixture provides
- [ ] Document fixtures with docstrings
- [ ] Use appropriate scope for fixture lifetime
- [ ] Prefer composition over inheritance

### Data Management
- [ ] Use factories for flexible test data creation
- [ ] Provide sensible defaults with easy overrides
- [ ] Keep test data minimal but realistic
- [ ] Avoid hard-coded IDs when possible

### Cleanup
- [ ] Always clean up resources (files, connections, etc.)
- [ ] Use yield for setup/teardown pattern
- [ ] Consider using autouse for global cleanup
- [ ] Ensure tests are isolated from each other

### Performance
- [ ] Use session/module scope for expensive fixtures
- [ ] Share database connections across tests
- [ ] Lazy-load fixtures when possible
- [ ] Profile fixture execution time

### Organization
- [ ] Put shared fixtures in conftest.py
- [ ] Group related fixtures together
- [ ] Use fixture inheritance for variations
- [ ] Document fixture dependencies
```

## Conclusion

Fixtures are fundamental to maintainable test automation. They provide consistent test setup, reduce duplication, and make tests more readable. Proper fixture design and organization significantly impact test suite quality and maintainability.

## Key Takeaways

1. Fixtures provide reusable test setup and teardown
2. Choose appropriate scope for fixture lifetime
3. Use factories for flexible test data creation
4. Always clean up resources with yield pattern
5. Share fixtures via conftest.py
6. Keep fixtures focused and well-documented
7. Consider performance when choosing fixture scope
