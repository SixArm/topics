# Idioms: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Idioms are conventional patterns and expressions that are characteristic of a particular programming language or domain. For test automation professionals, understanding testing idioms means writing code that is natural, readable, and follows established conventions that other professionals will recognize immediately.

## What are Idioms?

Idioms are the "natural" way to express common operations in a given language or framework. They represent patterns that experienced developers use instinctively—code that feels right to those familiar with the ecosystem.

### Idioms in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Testing Idioms                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Language Idioms:                                           │
│  ├── Python: List comprehensions, context managers          │
│  ├── JavaScript: Destructuring, arrow functions             │
│  └── Each language has a "natural" way                      │
│                                                             │
│  Framework Idioms:                                          │
│  ├── pytest: Fixtures, parametrize, conftest.py             │
│  ├── Jest: describe/it, beforeEach, mock functions          │
│  ├── Playwright: Locators, auto-waiting, expect             │
│  └── Each framework has conventions                         │
│                                                             │
│  Testing Idioms:                                            │
│  ├── Arrange-Act-Assert pattern                             │
│  ├── Given-When-Then for BDD                                │
│  ├── Test naming conventions                                │
│  ├── Fixture patterns                                       │
│  └── Error handling patterns                                │
│                                                             │
│  Why Idioms Matter:                                         │
│  ├── Readability: Others understand your intent             │
│  ├── Maintainability: Standard patterns are easier to fix   │
│  ├── Efficiency: Less cognitive overhead                    │
│  └── Collaboration: Shared vocabulary with team             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Python Testing Idioms

### pytest Idioms

```python
# python_testing_idioms.py

"""
Idiomatic Python testing with pytest.
"""

import pytest
from typing import List, Dict
from contextlib import contextmanager
from unittest.mock import patch, Mock
from datetime import datetime, timedelta

# Idiom 1: Arrange-Act-Assert (AAA)
class TestArrangeActAssert:
    """The fundamental testing idiom."""

    def test_discount_calculation(self):
        # Arrange
        price = 100.00
        discount_rate = 0.20

        # Act
        discounted_price = price * (1 - discount_rate)

        # Assert
        assert discounted_price == 80.00


# Idiom 2: pytest.raises for exception testing
class TestExceptionIdioms:
    """Idiomatic exception testing."""

    def test_division_by_zero(self):
        """Idiomatic: Use pytest.raises as context manager."""
        with pytest.raises(ZeroDivisionError):
            1 / 0

    def test_exception_message(self):
        """Idiomatic: Match exception message."""
        with pytest.raises(ValueError, match="cannot be negative"):
            validate_age(-1)

    def test_exception_attributes(self):
        """Idiomatic: Inspect exception details."""
        with pytest.raises(ValidationError) as exc_info:
            validate_user({"name": ""})

        assert exc_info.value.field == "name"
        assert "required" in str(exc_info.value)


# Idiom 3: Parametrize for data-driven tests
class TestParameterizeIdioms:
    """Idiomatic parameterization patterns."""

    @pytest.mark.parametrize("input_val,expected", [
        (0, "zero"),
        (1, "one"),
        (2, "two"),
        (-1, "negative"),
    ])
    def test_number_to_word(self, input_val, expected):
        """Idiomatic: Table-driven tests."""
        assert number_to_word(input_val) == expected

    @pytest.mark.parametrize("email", [
        "user@example.com",
        "user+tag@example.com",
        "user@subdomain.example.com",
    ])
    def test_valid_emails_accepted(self, email):
        """Idiomatic: Test multiple valid inputs."""
        assert is_valid_email(email)

    @pytest.mark.parametrize("email", [
        "",
        "no-at-sign",
        "@no-local.com",
        "user@",
    ])
    def test_invalid_emails_rejected(self, email):
        """Idiomatic: Test multiple invalid inputs."""
        assert not is_valid_email(email)


# Idiom 4: Fixtures for setup and teardown
class TestFixtureIdioms:
    """Idiomatic fixture patterns."""

    @pytest.fixture
    def user(self):
        """Idiomatic: Simple fixture for test data."""
        return {"id": "123", "email": "test@example.com", "name": "Test"}

    @pytest.fixture
    def database(self):
        """Idiomatic: yield fixture for setup/teardown."""
        db = connect_database()
        yield db
        db.close()

    @pytest.fixture
    def temp_file(self, tmp_path):
        """Idiomatic: Use built-in tmp_path fixture."""
        file_path = tmp_path / "test_data.json"
        file_path.write_text('{"key": "value"}')
        return file_path


# Idiom 5: Mocking patterns
class TestMockIdioms:
    """Idiomatic mocking patterns."""

    def test_with_patch_decorator(self):
        """Idiomatic: patch as decorator."""
        with patch('myapp.services.send_email') as mock_send:
            mock_send.return_value = True
            result = create_user("test@example.com")
            mock_send.assert_called_once()

    def test_mock_return_value(self):
        """Idiomatic: Configure mock return values."""
        mock_repo = Mock()
        mock_repo.find_by_id.return_value = {"id": "123", "name": "Test"}

        service = UserService(mock_repo)
        user = service.get_user("123")

        assert user["name"] == "Test"
        mock_repo.find_by_id.assert_called_with("123")

    def test_mock_side_effect(self):
        """Idiomatic: Use side_effect for exceptions."""
        mock_repo = Mock()
        mock_repo.find_by_id.side_effect = ConnectionError("DB down")

        service = UserService(mock_repo)

        with pytest.raises(ServiceError):
            service.get_user("123")


# Idiom 6: Pythonic assertions
class TestPythonicAssertions:
    """Idiomatic Python assertions."""

    def test_membership(self):
        """Idiomatic: Use 'in' operator."""
        result = get_permissions("admin")
        assert "write" in result
        assert "delete" in result

    def test_truthiness(self):
        """Idiomatic: Use truthiness, not == True."""
        user = get_user("123")
        assert user.is_active  # Not: assert user.is_active == True
        assert not user.is_locked  # Not: assert user.is_locked == False

    def test_collection_size(self):
        """Idiomatic: Use truthiness for empty/non-empty."""
        items = get_items()
        assert items  # Non-empty check (not: assert len(items) > 0)

        empty_items = get_items(filter="impossible")
        assert not empty_items  # Empty check

    def test_approximate_equality(self):
        """Idiomatic: Use pytest.approx for floats."""
        result = calculate_tax(100.00)
        assert result == pytest.approx(8.25, rel=1e-2)

    def test_string_contains(self):
        """Idiomatic: Use 'in' for substring checks."""
        message = get_error_message()
        assert "invalid" in message.lower()

    def test_list_comprehension_assertions(self):
        """Idiomatic: Use all() and any()."""
        users = get_all_users()
        assert all(u.is_active for u in users)  # All active
        assert any(u.role == "admin" for u in users)  # At least one admin


# Idiom 7: Context managers for test setup
class TestContextManagerIdioms:
    """Idiomatic context manager usage."""

    def test_frozen_time(self):
        """Idiomatic: Control time in tests."""
        from freezegun import freeze_time

        with freeze_time("2024-01-15 12:00:00"):
            result = get_greeting()
            assert "afternoon" in result

    def test_environment_variables(self, monkeypatch):
        """Idiomatic: Use monkeypatch for env vars."""
        monkeypatch.setenv("API_KEY", "test-key-123")
        monkeypatch.setenv("DEBUG", "true")

        config = load_config()
        assert config.api_key == "test-key-123"
        assert config.debug is True

    def test_captured_output(self, capsys):
        """Idiomatic: Use capsys to capture output."""
        print_report(data=[1, 2, 3])
        captured = capsys.readouterr()
        assert "Report" in captured.out


# Helper stubs for examples
def validate_age(age):
    if age < 0: raise ValueError("cannot be negative")
def number_to_word(n): return {0: "zero", 1: "one", 2: "two"}.get(n, "negative")
def is_valid_email(e): return bool(e) and "@" in e and "." in e.split("@")[-1]
def connect_database(): return Mock()
def create_user(email): pass
def get_permissions(role): return ["read", "write", "delete"]
def get_user(id): return Mock(is_active=True, is_locked=False)
def get_items(filter=None): return [1, 2, 3] if filter is None else []
def calculate_tax(amount): return 8.25
def get_error_message(): return "Invalid input"
def get_all_users(): return [Mock(is_active=True, role="admin")]
def get_greeting(): return "Good afternoon"
def load_config(): return Mock(api_key="test-key-123", debug=True)
def print_report(data): print("Report")
class ValidationError(Exception):
    def __init__(self, msg, field=""):
        super().__init__(msg)
        self.field = field
class ServiceError(Exception): pass
class UserService:
    def __init__(self, repo): self.repo = repo
    def get_user(self, id): return self.repo.find_by_id(id)
```

### JavaScript/TypeScript Testing Idioms

```typescript
// javascript_testing_idioms.ts

/**
 * Idiomatic JavaScript/TypeScript testing with Jest and Playwright.
 */

// Idiom 1: describe/it nesting for organization
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      const user = await userService.createUser({
        email: 'test@example.com',
        name: 'Test User'
      });

      expect(user.id).toBeDefined();
      expect(user.email).toBe('test@example.com');
    });

    it('should throw for duplicate email', async () => {
      await userService.createUser({ email: 'existing@example.com' });

      await expect(
        userService.createUser({ email: 'existing@example.com' })
      ).rejects.toThrow('Email already exists');
    });
  });
});

// Idiom 2: Setup and teardown
describe('DatabaseOperations', () => {
  let db: Database;

  // Idiomatic: beforeEach/afterEach for test isolation
  beforeEach(async () => {
    db = await createTestDatabase();
    await db.seed();
  });

  afterEach(async () => {
    await db.cleanup();
    await db.close();
  });

  it('should insert and retrieve a record', async () => {
    await db.insert('users', { name: 'Test' });
    const users = await db.query('users');
    expect(users).toHaveLength(1);
  });
});

// Idiom 3: Jest matchers
describe('Jest Matcher Idioms', () => {
  it('should use appropriate matchers', () => {
    // Equality
    expect(result).toBe(42);              // Strict equality
    expect(obj).toEqual({ id: 1 });       // Deep equality

    // Truthiness
    expect(value).toBeTruthy();
    expect(value).toBeFalsy();
    expect(value).toBeNull();
    expect(value).toBeDefined();

    // Numbers
    expect(price).toBeGreaterThan(0);
    expect(total).toBeCloseTo(99.99, 2);  // Float comparison

    // Strings
    expect(message).toMatch(/error/i);
    expect(name).toContain('Test');

    // Arrays
    expect(items).toHaveLength(3);
    expect(roles).toContain('admin');
    expect(users).toEqual(expect.arrayContaining([
      expect.objectContaining({ role: 'admin' })
    ]));

    // Objects
    expect(response).toHaveProperty('data');
    expect(user).toMatchObject({ name: 'Test', active: true });
  });
});

// Idiom 4: Async testing patterns
describe('Async Idioms', () => {
  // Idiomatic: async/await
  it('should fetch user data', async () => {
    const user = await fetchUser('123');
    expect(user.name).toBe('Test');
  });

  // Idiomatic: Testing promise rejection
  it('should reject for invalid ID', async () => {
    await expect(fetchUser('invalid')).rejects.toThrow('Not found');
  });

  // Idiomatic: Testing callbacks (when needed)
  it('should call callback with result', (done) => {
    processAsync('data', (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      done();
    });
  });
});

// Idiom 5: Mocking patterns
describe('Mock Idioms', () => {
  // Idiomatic: jest.fn() for simple mocks
  it('should call handler on event', () => {
    const handler = jest.fn();
    emitter.on('event', handler);
    emitter.emit('event', 'data');

    expect(handler).toHaveBeenCalledWith('data');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  // Idiomatic: jest.spyOn for partial mocking
  it('should log errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    processInvalidData();

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  // Idiomatic: Module mocking
  jest.mock('./emailService', () => ({
    sendEmail: jest.fn().mockResolvedValue(true)
  }));
});

// Idiom 6: Playwright idioms
describe('Playwright Idioms', () => {
  it('should use auto-waiting locators', async ({ page }) => {
    await page.goto('/login');

    // Idiomatic: Locators auto-wait
    await page.locator('#email').fill('test@example.com');
    await page.locator('#password').fill('password');
    await page.locator('#submit').click();

    // Idiomatic: expect with auto-retry
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('.welcome')).toBeVisible();
    await expect(page.locator('.welcome')).toContainText('Hello');
  });

  it('should use role-based locators', async ({ page }) => {
    // Idiomatic: Accessible locators
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByPlaceholder('Search...').fill('query');
    await page.getByText('Welcome back').isVisible();
  });
});

// Stubs
const result = 42;
const obj = { id: 1 };
const value = true;
const price = 10;
const total = 99.99;
const message = 'error occurred';
const name = 'Test User';
const items = [1, 2, 3];
const roles = ['admin', 'user'];
const users = [{ role: 'admin' }];
const response = { data: [] };
const user = { name: 'Test', active: true };
const userService = { createUser: async (d: any) => ({ id: '1', ...d }) };
const fetchUser = async (id: string) => ({ name: 'Test' });
const processAsync = (d: string, cb: Function) => cb(null, {});
const emitter = { on: (e: string, h: Function) => {}, emit: (e: string, d: any) => {} };
const processInvalidData = () => console.error('invalid');
```

## Best Practices

### Testing Idioms Checklist

```markdown
## Testing Idioms Best Practices

### General
- [ ] Follow Arrange-Act-Assert pattern
- [ ] Use framework-specific assertion methods
- [ ] Write tests that read like specifications
- [ ] Use descriptive test names
- [ ] Follow language conventions (PEP 8, ESLint)

### Python/pytest
- [ ] Use fixtures for setup/teardown
- [ ] Use parametrize for data-driven tests
- [ ] Use pytest.raises for exception testing
- [ ] Use pytest.approx for float comparisons
- [ ] Use conftest.py for shared fixtures
- [ ] Use monkeypatch for environment changes

### JavaScript/Jest
- [ ] Use describe/it for organization
- [ ] Use beforeEach/afterEach for setup
- [ ] Use jest.fn() and jest.spyOn for mocking
- [ ] Use async/await for async tests
- [ ] Use toEqual for deep comparison
- [ ] Use expect().rejects for async errors

### Playwright
- [ ] Use locators with auto-waiting
- [ ] Use role-based selectors
- [ ] Use expect with auto-retry
- [ ] Use Page Object pattern
- [ ] Avoid explicit waits when possible
```

## Conclusion

Testing idioms are the shared vocabulary of test automation professionals. By following established conventions and patterns specific to your language and framework, you write tests that are readable, maintainable, and immediately understandable by your team.

## Key Takeaways

1. Idioms are the "natural" way to express patterns in a language
2. Follow Arrange-Act-Assert for test structure
3. Use framework-specific features (fixtures, describe/it)
4. Choose appropriate assertion methods
5. Follow language conventions consistently
6. Idiomatic code is easier to read and maintain
7. Learn idioms by reading well-written test suites
