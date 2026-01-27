# Test Script: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A test script is a set of instructions executed to validate that software behaves as expected. For test automation professionals, test scripts are the executable artifacts — written in code — that drive automated testing and produce pass/fail results.

## What is a Test Script?

A test script contains the specific steps, inputs, expected outcomes, and assertions needed to verify a particular piece of functionality. In automated testing, scripts are written in programming languages and executed by test frameworks like pytest, Jest, or Selenium.

### Test Script in Context

```
┌─────────────────────────────────────────────────────────────┐
│                      Test Script                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Test Script Structure:                                     │
│                                                             │
│  ┌─────────────────────────────────────┐                   │
│  │ 1. Setup / Arrange                  │                   │
│  │    • Initialize test data           │                   │
│  │    • Configure dependencies         │                   │
│  │    • Set preconditions              │                   │
│  ├─────────────────────────────────────┤                   │
│  │ 2. Execute / Act                    │                   │
│  │    • Call the function under test   │                   │
│  │    • Perform the user action        │                   │
│  │    • Trigger the workflow           │                   │
│  ├─────────────────────────────────────┤                   │
│  │ 3. Verify / Assert                  │                   │
│  │    • Check return values            │                   │
│  │    • Verify state changes           │                   │
│  │    • Confirm side effects           │                   │
│  ├─────────────────────────────────────┤                   │
│  │ 4. Teardown / Cleanup              │                   │
│  │    • Reset state                    │                   │
│  │    • Release resources              │                   │
│  │    • Remove test data               │                   │
│  └─────────────────────────────────────┘                   │
│                                                             │
│  Script Types:                                              │
│  ├── Unit test script: Tests single function/method        │
│  ├── Integration test script: Tests component interaction  │
│  ├── E2E test script: Tests full user workflow             │
│  ├── Data-driven script: Same logic, multiple inputs       │
│  └── Keyword-driven script: High-level action abstraction  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Writing Effective Test Scripts

```python
# test_script.py

"""
Test script patterns and best practices.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Optional


@dataclass
class TestScriptMetadata:
    """Metadata for a test script."""
    id: str
    title: str
    description: str
    priority: str
    tags: List[str] = field(default_factory=list)
    preconditions: List[str] = field(default_factory=list)


# Example: System under test
class UserRegistration:
    def __init__(self):
        self.users: Dict[str, Dict] = {}

    def register(self, email: str, password: str, name: str) -> Dict:
        if not email or "@" not in email:
            return {"success": False, "error": "Invalid email"}
        if len(password) < 8:
            return {"success": False, "error": "Password too short"}
        if email in self.users:
            return {"success": False, "error": "Email already registered"}

        self.users[email] = {"name": name, "password": password, "active": True}
        return {"success": True, "user_id": f"user_{len(self.users)}"}

    def deactivate(self, email: str) -> Dict:
        if email not in self.users:
            return {"success": False, "error": "User not found"}
        self.users[email]["active"] = False
        return {"success": True}

    def is_active(self, email: str) -> bool:
        return self.users.get(email, {}).get("active", False)


# --- Pattern 1: Arrange-Act-Assert ---
class TestUserRegistrationAAA:
    """Clear Arrange-Act-Assert structure."""

    def test_successful_registration(self):
        # Arrange
        service = UserRegistration()
        email = "alice@example.com"
        password = "SecureP@ss1"
        name = "Alice"

        # Act
        result = service.register(email, password, name)

        # Assert
        assert result["success"] is True
        assert "user_id" in result
        assert service.is_active(email)

    def test_rejects_invalid_email(self):
        # Arrange
        service = UserRegistration()

        # Act
        result = service.register("not-an-email", "password123", "Bob")

        # Assert
        assert result["success"] is False
        assert "Invalid email" in result["error"]

    def test_rejects_short_password(self):
        # Arrange
        service = UserRegistration()

        # Act
        result = service.register("bob@example.com", "short", "Bob")

        # Assert
        assert result["success"] is False
        assert "Password too short" in result["error"]

    def test_rejects_duplicate_email(self):
        # Arrange
        service = UserRegistration()
        service.register("alice@example.com", "password123", "Alice")

        # Act
        result = service.register("alice@example.com", "otherpass1", "Alice2")

        # Assert
        assert result["success"] is False
        assert "already registered" in result["error"]


# --- Pattern 2: Data-Driven Test Script ---
class TestDataDrivenRegistration:
    """Same test logic, multiple data sets."""

    @pytest.mark.parametrize("email,password,name,should_pass", [
        ("valid@test.com", "password123", "User", True),
        ("", "password123", "User", False),
        ("no-at-sign", "password123", "User", False),
        ("valid@test.com", "short", "User", False),
    ])
    def test_registration_variants(self, email, password, name, should_pass):
        service = UserRegistration()
        result = service.register(email, password, name)
        assert result["success"] is should_pass


# --- Pattern 3: Script with Fixtures ---
class TestWithFixtures:
    """Using fixtures for setup and teardown."""

    @pytest.fixture
    def service(self):
        return UserRegistration()

    @pytest.fixture
    def registered_user(self, service):
        service.register("existing@test.com", "password123", "Existing")
        return service

    def test_deactivate_existing_user(self, registered_user):
        result = registered_user.deactivate("existing@test.com")
        assert result["success"]
        assert not registered_user.is_active("existing@test.com")

    def test_deactivate_nonexistent_user(self, service):
        result = service.deactivate("nobody@test.com")
        assert not result["success"]
```

## Best Practices

```markdown
## Writing Effective Test Scripts

### Structure
- [ ] Follow Arrange-Act-Assert (or Given-When-Then) pattern
- [ ] One assertion concept per test (related assertions are fine)
- [ ] Use descriptive test names that explain expected behavior
- [ ] Keep tests independent — no shared mutable state

### Maintainability
- [ ] Use fixtures/setup for common preconditions
- [ ] Use data-driven patterns to reduce duplication
- [ ] Extract page objects or helper methods for UI scripts
- [ ] Keep test scripts focused — avoid testing multiple features

### Reliability
- [ ] Clean up test data in teardown
- [ ] Avoid hardcoded waits — use explicit waits for async operations
- [ ] Don't depend on test execution order
- [ ] Handle flaky dependencies with test doubles
```

## Conclusion

Test scripts are the executable core of test automation. By following structured patterns like Arrange-Act-Assert, using data-driven approaches for coverage, and applying fixtures for clean setup and teardown, test automation professionals write scripts that are readable, maintainable, and reliable.

## Key Takeaways

1. Test scripts contain the steps, inputs, and assertions to verify functionality
2. Follow Arrange-Act-Assert for clear, readable structure
3. Use data-driven patterns to test multiple inputs with one script
4. Fixtures handle setup and teardown, keeping tests clean
5. Each test should be independent — no dependencies on other tests
6. Descriptive names make scripts self-documenting
7. Scripts should be maintainable — refactor helpers as patterns emerge
