# Integration Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Integration testing verifies that different modules, services, or components work correctly together. For test automation professionals, integration testing fills the gap between unit tests (testing components in isolation) and end-to-end tests (testing complete workflows), catching defects that arise from component interactions.

## What is Integration Testing?

Integration testing validates the interfaces and interactions between integrated components. It tests that modules communicate correctly, data flows properly between layers, and combined components produce expected results.

### Testing Pyramid Position

```
┌─────────────────────────────────────────────────────────────┐
│                    Testing Pyramid                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              /\          E2E Tests                           │
│             /  \         • Full user workflows              │
│            /    \        • Slowest, most expensive           │
│           /      \       • Fewest tests                     │
│          /────────\                                          │
│         /          \     Integration Tests                   │
│        /            \    • Component interactions            │
│       /              \   • Moderate speed                   │
│      /                \  • Moderate count                   │
│     /──────────────────\                                    │
│    /                    \  Unit Tests                       │
│   /                      \ • Individual functions           │
│  /                        \• Fastest, cheapest              │
│ /                          \• Most tests                    │
│/____________________________\                               │
│                                                             │
│  Integration Testing Focus:                                 │
│  ├── API endpoints with database                            │
│  ├── Service-to-service communication                       │
│  ├── Database queries and transactions                      │
│  ├── Message queue producers/consumers                      │
│  ├── Cache interaction with storage                         │
│  ├── Authentication/authorization flows                     │
│  └── Third-party API integrations                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Python Integration Testing

### Database Integration Tests

```python
# test_database_integration.py

"""
Integration tests for database operations.
"""

import pytest
from typing import Generator, Dict, List
from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    id: str
    email: str
    name: str
    created_at: datetime
    is_active: bool = True

class UserRepository:
    """Repository for user data access."""

    def __init__(self, db_session):
        self.session = db_session

    def create(self, email: str, name: str) -> User:
        """Create a new user."""
        user_id = self.session.execute(
            "INSERT INTO users (email, name) VALUES (?, ?) RETURNING id",
            (email, name)
        ).fetchone()[0]
        self.session.commit()

        return self.get_by_id(user_id)

    def get_by_id(self, user_id: str) -> User:
        """Get user by ID."""
        row = self.session.execute(
            "SELECT id, email, name, created_at, is_active FROM users WHERE id = ?",
            (user_id,)
        ).fetchone()

        if not row:
            raise ValueError(f"User {user_id} not found")

        return User(
            id=row[0], email=row[1], name=row[2],
            created_at=row[3], is_active=row[4]
        )

    def get_by_email(self, email: str) -> User:
        """Get user by email."""
        row = self.session.execute(
            "SELECT id, email, name, created_at, is_active FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        if not row:
            raise ValueError(f"User with email {email} not found")

        return User(
            id=row[0], email=row[1], name=row[2],
            created_at=row[3], is_active=row[4]
        )

    def list_active(self) -> List[User]:
        """List all active users."""
        rows = self.session.execute(
            "SELECT id, email, name, created_at, is_active FROM users WHERE is_active = 1"
        ).fetchall()

        return [
            User(id=r[0], email=r[1], name=r[2], created_at=r[3], is_active=r[4])
            for r in rows
        ]

    def deactivate(self, user_id: str):
        """Deactivate a user."""
        self.session.execute(
            "UPDATE users SET is_active = 0 WHERE id = ?", (user_id,)
        )
        self.session.commit()


# Integration test fixtures
@pytest.fixture(scope="module")
def db_connection():
    """Create test database connection."""
    import sqlite3
    conn = sqlite3.connect(":memory:")
    conn.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT 1
        )
    """)
    yield conn
    conn.close()

@pytest.fixture
def db_session(db_connection):
    """Provide a database session with rollback."""
    # Use savepoint for nested transaction
    db_connection.execute("SAVEPOINT test_savepoint")
    yield db_connection
    db_connection.execute("ROLLBACK TO test_savepoint")

@pytest.fixture
def user_repo(db_session) -> UserRepository:
    """Provide UserRepository with test database."""
    return UserRepository(db_session)


# Integration tests
class TestUserRepositoryIntegration:
    """Integration tests for UserRepository with real database."""

    def test_create_and_retrieve_user(self, user_repo):
        """Test creating a user and retrieving it."""
        user = user_repo.create("test@example.com", "Test User")

        assert user.id is not None
        assert user.email == "test@example.com"
        assert user.name == "Test User"
        assert user.is_active is True

    def test_retrieve_by_email(self, user_repo):
        """Test finding a user by email."""
        user_repo.create("find@example.com", "Find Me")

        found = user_repo.get_by_email("find@example.com")

        assert found.name == "Find Me"

    def test_duplicate_email_raises(self, user_repo):
        """Test that duplicate emails are rejected."""
        user_repo.create("unique@example.com", "First User")

        with pytest.raises(Exception):  # IntegrityError
            user_repo.create("unique@example.com", "Second User")

    def test_deactivate_user(self, user_repo):
        """Test deactivating a user."""
        user = user_repo.create("active@example.com", "Active User")
        assert user.is_active is True

        user_repo.deactivate(user.id)

        updated = user_repo.get_by_id(user.id)
        assert updated.is_active is False

    def test_list_active_excludes_deactivated(self, user_repo):
        """Test that listing active users excludes deactivated ones."""
        user1 = user_repo.create("user1@example.com", "User 1")
        user2 = user_repo.create("user2@example.com", "User 2")
        user_repo.deactivate(user2.id)

        active_users = user_repo.list_active()

        active_ids = [u.id for u in active_users]
        assert user1.id in active_ids
        assert user2.id not in active_ids

    def test_nonexistent_user_raises(self, user_repo):
        """Test that querying nonexistent user raises."""
        with pytest.raises(ValueError, match="not found"):
            user_repo.get_by_id("nonexistent-id")
```

### API Integration Tests

```python
# test_api_integration.py

"""
Integration tests for REST API endpoints.
"""

import pytest
import requests
from typing import Dict

class TestAPIIntegration:
    """Integration tests for API with real HTTP calls."""

    @pytest.fixture(scope="module")
    def base_url(self):
        return "http://localhost:8000/api"

    @pytest.fixture(scope="module")
    def api_session(self, base_url):
        """Create an API session with authentication."""
        session = requests.Session()
        session.headers.update({"Content-Type": "application/json"})

        # Authenticate
        response = session.post(f"{base_url}/auth/login", json={
            "email": "test@example.com",
            "password": "testpassword"
        })
        token = response.json()["token"]
        session.headers.update({"Authorization": f"Bearer {token}"})

        yield session
        session.close()

    @pytest.fixture
    def created_user(self, api_session, base_url) -> Dict:
        """Create a user and clean up after test."""
        response = api_session.post(f"{base_url}/users", json={
            "email": f"test-{pytest.importorskip('uuid').uuid4().hex[:8]}@example.com",
            "name": "Integration Test User"
        })
        user = response.json()["data"]

        yield user

        # Cleanup
        api_session.delete(f"{base_url}/users/{user['id']}")

    def test_create_user_returns_201(self, api_session, base_url):
        """Test creating a user returns 201 Created."""
        response = api_session.post(f"{base_url}/users", json={
            "email": "new-user@example.com",
            "name": "New User"
        })

        assert response.status_code == 201
        data = response.json()["data"]
        assert data["email"] == "new-user@example.com"
        assert "id" in data

        # Cleanup
        api_session.delete(f"{base_url}/users/{data['id']}")

    def test_get_user_returns_correct_data(self, api_session, base_url, created_user):
        """Test retrieving a created user."""
        response = api_session.get(f"{base_url}/users/{created_user['id']}")

        assert response.status_code == 200
        data = response.json()["data"]
        assert data["id"] == created_user["id"]
        assert data["email"] == created_user["email"]

    def test_update_user(self, api_session, base_url, created_user):
        """Test updating user data."""
        response = api_session.put(
            f"{base_url}/users/{created_user['id']}",
            json={"name": "Updated Name"}
        )

        assert response.status_code == 200

        # Verify the update persisted
        get_response = api_session.get(f"{base_url}/users/{created_user['id']}")
        assert get_response.json()["data"]["name"] == "Updated Name"

    def test_delete_user(self, api_session, base_url):
        """Test deleting a user."""
        # Create user to delete
        create_response = api_session.post(f"{base_url}/users", json={
            "email": "delete-me@example.com",
            "name": "Delete Me"
        })
        user_id = create_response.json()["data"]["id"]

        # Delete
        delete_response = api_session.delete(f"{base_url}/users/{user_id}")
        assert delete_response.status_code == 204

        # Verify deletion
        get_response = api_session.get(f"{base_url}/users/{user_id}")
        assert get_response.status_code == 404

    def test_unauthorized_access_returns_401(self, base_url):
        """Test that unauthenticated requests are rejected."""
        response = requests.get(f"{base_url}/users")

        assert response.status_code == 401
```

### Service Integration Tests

```python
# test_service_integration.py

"""
Integration tests for service-to-service interactions.
"""

import pytest
from unittest.mock import patch

class UserService:
    """Service that integrates multiple components."""

    def __init__(self, user_repo, email_service, cache):
        self.user_repo = user_repo
        self.email_service = email_service
        self.cache = cache

    def register_user(self, email: str, name: str) -> Dict:
        """Register a new user with all side effects."""
        # Create in database
        user = self.user_repo.create(email, name)

        # Cache the user
        self.cache.set(f"user:{user.id}", user)

        # Send welcome email
        self.email_service.send_welcome(email, name)

        return {"id": user.id, "email": email, "name": name}

    def get_user(self, user_id: str) -> Dict:
        """Get user with cache-first strategy."""
        # Try cache first
        cached = self.cache.get(f"user:{user_id}")
        if cached:
            return cached

        # Fall back to database
        user = self.user_repo.get_by_id(user_id)

        # Update cache
        self.cache.set(f"user:{user_id}", user)

        return user


class TestUserServiceIntegration:
    """Test UserService with real dependencies (except email)."""

    @pytest.fixture
    def email_service(self):
        """Mock email service (external dependency)."""
        from unittest.mock import Mock
        service = Mock()
        service.send_welcome.return_value = True
        return service

    @pytest.fixture
    def cache(self):
        """Simple in-memory cache for testing."""
        class SimpleCache:
            def __init__(self):
                self._store = {}
            def get(self, key):
                return self._store.get(key)
            def set(self, key, value):
                self._store[key] = value
            def delete(self, key):
                self._store.pop(key, None)
        return SimpleCache()

    @pytest.fixture
    def user_service(self, user_repo, email_service, cache):
        return UserService(user_repo, email_service, cache)

    def test_registration_creates_user_and_caches(
        self, user_service, cache, email_service
    ):
        """Test that registration creates, caches, and emails."""
        result = user_service.register_user("new@example.com", "New User")

        # User was created
        assert result["id"] is not None

        # User was cached
        cached = cache.get(f"user:{result['id']}")
        assert cached is not None

        # Email was sent
        email_service.send_welcome.assert_called_once_with(
            "new@example.com", "New User"
        )

    def test_get_user_uses_cache(self, user_service, user_repo, cache):
        """Test that get_user returns cached version first."""
        # Register (populates cache)
        result = user_service.register_user("cached@example.com", "Cached")

        # Get user (should hit cache, not database)
        user = user_service.get_user(result["id"])

        assert user is not None

    def test_get_user_falls_back_to_database(
        self, user_service, user_repo, cache
    ):
        """Test fallback to database when cache miss."""
        # Create user directly in database (bypassing cache)
        db_user = user_repo.create("direct@example.com", "Direct")

        # Get user (cache miss, should query database)
        user = user_service.get_user(db_user.id)

        assert user is not None
        assert user.email == "direct@example.com"

        # Should now be cached
        cached = cache.get(f"user:{db_user.id}")
        assert cached is not None
```

## JavaScript/TypeScript Integration Testing

```typescript
// integration.test.ts

import request from 'supertest';
import { app } from '../src/app';
import { createTestDatabase, cleanupDatabase } from './helpers/database';

describe('API Integration Tests', () => {
  let db: TestDatabase;
  let authToken: string;

  beforeAll(async () => {
    db = await createTestDatabase();
    await db.migrate();

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await cleanupDatabase(db);
  });

  afterEach(async () => {
    await db.truncateAll();
  });

  describe('POST /api/users', () => {
    it('should create a user and return 201', async () => {
      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'new@example.com',
          name: 'New User'
        });

      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject({
        email: 'new@example.com',
        name: 'New User'
      });
      expect(response.body.data.id).toBeDefined();
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'invalid',
          name: 'Test'
        });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('INVALID_EMAIL');
    });

    it('should return 409 for duplicate email', async () => {
      // Create first user
      await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ email: 'dup@example.com', name: 'First' });

      // Try duplicate
      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ email: 'dup@example.com', name: 'Second' });

      expect(response.status).toBe(409);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user data', async () => {
      // Create user
      const createResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ email: 'get@example.com', name: 'Get User' });

      const userId = createResponse.body.data.id;

      // Retrieve user
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.email).toBe('get@example.com');
    });

    it('should return 404 for nonexistent user', async () => {
      const response = await request(app)
        .get('/api/users/nonexistent')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('Cross-service integration', () => {
    it('should create user and send welcome email', async () => {
      const emailSpy = jest.spyOn(emailService, 'sendWelcome');

      await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ email: 'welcome@example.com', name: 'Welcome User' });

      expect(emailSpy).toHaveBeenCalledWith(
        'welcome@example.com',
        expect.objectContaining({ name: 'Welcome User' })
      );
    });
  });
});
```

## Best Practices

### Integration Testing Checklist

```markdown
## Integration Testing Best Practices

### Test Design
- [ ] Test component interactions, not just individual components
- [ ] Use real dependencies when practical (databases, caches)
- [ ] Mock only external services you don't control
- [ ] Test both success and error paths
- [ ] Verify data flows correctly between components

### Test Isolation
- [ ] Use database transactions with rollback
- [ ] Clean up created resources after tests
- [ ] Avoid shared mutable state between tests
- [ ] Use unique test data to prevent conflicts
- [ ] Reset caches and queues between tests

### Test Environment
- [ ] Use in-memory or containerized databases
- [ ] Match production configuration closely
- [ ] Use Docker Compose for complex setups
- [ ] Seed databases with known test data
- [ ] Configure timeouts appropriately

### Performance
- [ ] Share expensive resources (DB connections) across tests
- [ ] Use module/session scope for setup
- [ ] Run integration tests in parallel when possible
- [ ] Keep individual tests focused and fast
- [ ] Use database transactions instead of truncation

### CI/CD Integration
- [ ] Run integration tests on every PR
- [ ] Separate from unit tests in CI pipeline
- [ ] Set appropriate timeout limits
- [ ] Generate clear failure reports
- [ ] Include database migration tests
```

## Conclusion

Integration testing is essential for validating that components work together correctly. By testing real interactions between databases, APIs, services, and caches, test automation professionals catch defects that unit tests miss while maintaining faster feedback than end-to-end tests.

## Key Takeaways

1. Integration tests verify component interactions work correctly
2. Use real dependencies when practical, mock external services
3. Ensure test isolation with transactions and cleanup
4. Test both happy paths and error scenarios
5. Share expensive resources across tests for performance
6. Run integration tests in CI/CD on every PR
7. Balance coverage between unit, integration, and E2E tests
