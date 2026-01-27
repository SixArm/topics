# Error Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Error testing (also known as negative testing or error handling testing) validates that software correctly handles error conditions, invalid inputs, and unexpected situations. For test automation professionals, error testing ensures applications fail gracefully and provide meaningful feedback rather than crashing or producing incorrect results.

## What is Error Testing?

Error testing deliberately introduces invalid data, unexpected conditions, and system failures to verify that the software handles these situations correctly. Unlike positive testing that confirms features work, error testing confirms the system behaves appropriately when things go wrong.

### Types of Errors to Test

```
┌─────────────────────────────────────────────────────────────┐
│                    Error Types to Test                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Input Errors:                                              │
│  ├── Invalid data types                                     │
│  ├── Out-of-range values                                   │
│  ├── Malformed data formats                                │
│  ├── Missing required fields                               │
│  └── Null/empty values                                     │
│                                                             │
│  System Errors:                                             │
│  ├── Network failures                                       │
│  ├── Database unavailability                               │
│  ├── Disk space exhaustion                                 │
│  ├── Memory limitations                                    │
│  └── Service timeouts                                      │
│                                                             │
│  Business Logic Errors:                                     │
│  ├── Unauthorized access attempts                          │
│  ├── Invalid state transitions                             │
│  ├── Constraint violations                                 │
│  └── Concurrent modification conflicts                     │
│                                                             │
│  Integration Errors:                                        │
│  ├── Third-party service failures                          │
│  ├── API version mismatches                                │
│  ├── Data format incompatibilities                         │
│  └── Authentication failures                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Error Tests

### Python Error Testing

```python
import pytest
from typing import Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum
import requests
from unittest.mock import Mock, patch

# Example: User Registration Service
class RegistrationError(Exception):
    """Base class for registration errors."""
    def __init__(self, message: str, error_code: str):
        self.message = message
        self.error_code = error_code
        super().__init__(message)

class ValidationError(RegistrationError):
    """Validation error during registration."""
    pass

class DuplicateUserError(RegistrationError):
    """User already exists."""
    pass

class DatabaseError(RegistrationError):
    """Database operation failed."""
    pass

@dataclass
class RegistrationRequest:
    email: str
    password: str
    name: str

class UserRegistrationService:
    """Service for user registration with proper error handling."""

    def __init__(self, db_client, email_service):
        self.db = db_client
        self.email_service = email_service

    def register(self, request: RegistrationRequest) -> Dict[str, Any]:
        """
        Register a new user.

        Raises:
            ValidationError: If input validation fails
            DuplicateUserError: If user already exists
            DatabaseError: If database operation fails
        """
        # Validate input
        self._validate_email(request.email)
        self._validate_password(request.password)
        self._validate_name(request.name)

        # Check for existing user
        if self.db.user_exists(request.email):
            raise DuplicateUserError(
                f"User with email {request.email} already exists",
                "USER_EXISTS"
            )

        # Create user
        try:
            user = self.db.create_user(
                email=request.email,
                password_hash=self._hash_password(request.password),
                name=request.name
            )
        except Exception as e:
            raise DatabaseError(
                "Failed to create user",
                "DB_ERROR"
            ) from e

        # Send welcome email (non-critical)
        try:
            self.email_service.send_welcome(request.email, request.name)
        except Exception:
            # Log but don't fail registration
            pass

        return {"user_id": user.id, "email": user.email}

    def _validate_email(self, email: str):
        if not email:
            raise ValidationError("Email is required", "EMAIL_REQUIRED")
        if "@" not in email:
            raise ValidationError("Invalid email format", "INVALID_EMAIL")
        if len(email) > 255:
            raise ValidationError("Email too long", "EMAIL_TOO_LONG")

    def _validate_password(self, password: str):
        if not password:
            raise ValidationError("Password is required", "PASSWORD_REQUIRED")
        if len(password) < 8:
            raise ValidationError(
                "Password must be at least 8 characters",
                "PASSWORD_TOO_SHORT"
            )
        if not any(c.isupper() for c in password):
            raise ValidationError(
                "Password must contain uppercase letter",
                "PASSWORD_NO_UPPERCASE"
            )
        if not any(c.isdigit() for c in password):
            raise ValidationError(
                "Password must contain a number",
                "PASSWORD_NO_NUMBER"
            )

    def _validate_name(self, name: str):
        if not name:
            raise ValidationError("Name is required", "NAME_REQUIRED")
        if len(name) > 100:
            raise ValidationError("Name too long", "NAME_TOO_LONG")

    def _hash_password(self, password: str) -> str:
        # Simplified for example
        import hashlib
        return hashlib.sha256(password.encode()).hexdigest()


# Comprehensive Error Tests
class TestUserRegistrationErrors:
    """Error tests for user registration service."""

    @pytest.fixture
    def mock_db(self):
        return Mock()

    @pytest.fixture
    def mock_email(self):
        return Mock()

    @pytest.fixture
    def service(self, mock_db, mock_email):
        return UserRegistrationService(mock_db, mock_email)

    # Email Validation Errors
    class TestEmailValidationErrors:

        def test_missing_email_raises_validation_error(self, service):
            """Test that missing email raises appropriate error."""
            request = RegistrationRequest(
                email="",
                password="ValidPass1",
                name="Test User"
            )

            with pytest.raises(ValidationError) as exc_info:
                service.register(request)

            assert exc_info.value.error_code == "EMAIL_REQUIRED"
            assert "required" in exc_info.value.message.lower()

        def test_invalid_email_format_raises_error(self, service):
            """Test that invalid email format raises error."""
            invalid_emails = [
                "notanemail",
                "missing-at-sign.com",
                "@nodomain",
                "spaces in@email.com"
            ]

            for email in invalid_emails:
                request = RegistrationRequest(
                    email=email,
                    password="ValidPass1",
                    name="Test User"
                )

                with pytest.raises(ValidationError) as exc_info:
                    service.register(request)

                assert exc_info.value.error_code == "INVALID_EMAIL"

        def test_email_too_long_raises_error(self, service):
            """Test that oversized email raises error."""
            long_email = "a" * 250 + "@example.com"
            request = RegistrationRequest(
                email=long_email,
                password="ValidPass1",
                name="Test User"
            )

            with pytest.raises(ValidationError) as exc_info:
                service.register(request)

            assert exc_info.value.error_code == "EMAIL_TOO_LONG"

    # Password Validation Errors
    class TestPasswordValidationErrors:

        def test_missing_password_raises_error(self, service):
            """Test that missing password raises error."""
            request = RegistrationRequest(
                email="test@example.com",
                password="",
                name="Test User"
            )

            with pytest.raises(ValidationError) as exc_info:
                service.register(request)

            assert exc_info.value.error_code == "PASSWORD_REQUIRED"

        def test_short_password_raises_error(self, service):
            """Test that short password raises error."""
            request = RegistrationRequest(
                email="test@example.com",
                password="Short1",
                name="Test User"
            )

            with pytest.raises(ValidationError) as exc_info:
                service.register(request)

            assert exc_info.value.error_code == "PASSWORD_TOO_SHORT"
            assert "8 characters" in exc_info.value.message

        def test_password_without_uppercase_raises_error(self, service):
            """Test password complexity requirements."""
            request = RegistrationRequest(
                email="test@example.com",
                password="alllowercase1",
                name="Test User"
            )

            with pytest.raises(ValidationError) as exc_info:
                service.register(request)

            assert exc_info.value.error_code == "PASSWORD_NO_UPPERCASE"

        def test_password_without_number_raises_error(self, service):
            """Test password must contain number."""
            request = RegistrationRequest(
                email="test@example.com",
                password="NoNumbersHere",
                name="Test User"
            )

            with pytest.raises(ValidationError) as exc_info:
                service.register(request)

            assert exc_info.value.error_code == "PASSWORD_NO_NUMBER"

    # Duplicate User Errors
    class TestDuplicateUserErrors:

        def test_duplicate_email_raises_error(self, service, mock_db):
            """Test that duplicate email raises appropriate error."""
            mock_db.user_exists.return_value = True

            request = RegistrationRequest(
                email="existing@example.com",
                password="ValidPass1",
                name="Test User"
            )

            with pytest.raises(DuplicateUserError) as exc_info:
                service.register(request)

            assert exc_info.value.error_code == "USER_EXISTS"
            assert "existing@example.com" in exc_info.value.message

    # Database Errors
    class TestDatabaseErrors:

        def test_database_failure_raises_error(self, service, mock_db):
            """Test handling of database failures."""
            mock_db.user_exists.return_value = False
            mock_db.create_user.side_effect = Exception("Connection failed")

            request = RegistrationRequest(
                email="test@example.com",
                password="ValidPass1",
                name="Test User"
            )

            with pytest.raises(DatabaseError) as exc_info:
                service.register(request)

            assert exc_info.value.error_code == "DB_ERROR"

    # Email Service Errors (Non-Critical)
    class TestEmailServiceErrors:

        def test_email_service_failure_does_not_fail_registration(
            self, service, mock_db, mock_email
        ):
            """Test that email service failure doesn't break registration."""
            mock_db.user_exists.return_value = False
            mock_db.create_user.return_value = Mock(id="123", email="test@example.com")
            mock_email.send_welcome.side_effect = Exception("SMTP error")

            request = RegistrationRequest(
                email="test@example.com",
                password="ValidPass1",
                name="Test User"
            )

            # Should not raise, registration succeeds despite email failure
            result = service.register(request)
            assert result["user_id"] == "123"
```

### JavaScript/TypeScript Error Testing

```typescript
// error-testing.ts
class ValidationError extends Error {
  constructor(
    message: string,
    public readonly errorCode: string,
    public readonly field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(
    message: string,
    public readonly resourceType: string,
    public readonly resourceId: string
  ) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class ConflictError extends Error {
  constructor(message: string, public readonly conflictType: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

interface CreateOrderRequest {
  userId: string;
  items: Array<{ productId: string; quantity: number }>;
  shippingAddress: string;
}

class OrderService {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository
  ) {}

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    // Validate request
    this.validateRequest(request);

    // Check user exists
    const user = await this.userRepository.findById(request.userId);
    if (!user) {
      throw new NotFoundError(
        `User not found: ${request.userId}`,
        'User',
        request.userId
      );
    }

    // Validate products and inventory
    for (const item of request.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new NotFoundError(
          `Product not found: ${item.productId}`,
          'Product',
          item.productId
        );
      }

      if (product.inventory < item.quantity) {
        throw new ConflictError(
          `Insufficient inventory for ${product.name}`,
          'INSUFFICIENT_INVENTORY'
        );
      }
    }

    // Create order
    return this.orderRepository.create({
      userId: request.userId,
      items: request.items,
      shippingAddress: request.shippingAddress,
      status: 'pending'
    });
  }

  private validateRequest(request: CreateOrderRequest): void {
    if (!request.userId) {
      throw new ValidationError('User ID is required', 'REQUIRED', 'userId');
    }

    if (!request.items || request.items.length === 0) {
      throw new ValidationError(
        'At least one item is required',
        'REQUIRED',
        'items'
      );
    }

    for (const item of request.items) {
      if (item.quantity <= 0) {
        throw new ValidationError(
          'Quantity must be positive',
          'INVALID_VALUE',
          'quantity'
        );
      }
    }

    if (!request.shippingAddress) {
      throw new ValidationError(
        'Shipping address is required',
        'REQUIRED',
        'shippingAddress'
      );
    }
  }
}

// Jest Error Tests
describe('OrderService Error Handling', () => {
  let orderService: OrderService;
  let mockUserRepo: jest.Mocked<UserRepository>;
  let mockProductRepo: jest.Mocked<ProductRepository>;
  let mockOrderRepo: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    mockUserRepo = {
      findById: jest.fn()
    } as any;
    mockProductRepo = {
      findById: jest.fn()
    } as any;
    mockOrderRepo = {
      create: jest.fn()
    } as any;

    orderService = new OrderService(mockUserRepo, mockProductRepo, mockOrderRepo);
  });

  describe('Validation Errors', () => {
    test('throws ValidationError when userId is missing', async () => {
      const request = {
        userId: '',
        items: [{ productId: 'prod-1', quantity: 1 }],
        shippingAddress: '123 Main St'
      };

      await expect(orderService.createOrder(request)).rejects.toThrow(
        ValidationError
      );

      await expect(orderService.createOrder(request)).rejects.toMatchObject({
        errorCode: 'REQUIRED',
        field: 'userId'
      });
    });

    test('throws ValidationError when items array is empty', async () => {
      const request = {
        userId: 'user-123',
        items: [],
        shippingAddress: '123 Main St'
      };

      await expect(orderService.createOrder(request)).rejects.toThrow(
        ValidationError
      );
    });

    test('throws ValidationError when quantity is zero', async () => {
      const request = {
        userId: 'user-123',
        items: [{ productId: 'prod-1', quantity: 0 }],
        shippingAddress: '123 Main St'
      };

      await expect(orderService.createOrder(request)).rejects.toMatchObject({
        name: 'ValidationError',
        errorCode: 'INVALID_VALUE',
        field: 'quantity'
      });
    });

    test('throws ValidationError when quantity is negative', async () => {
      const request = {
        userId: 'user-123',
        items: [{ productId: 'prod-1', quantity: -1 }],
        shippingAddress: '123 Main St'
      };

      await expect(orderService.createOrder(request)).rejects.toThrow(
        ValidationError
      );
    });
  });

  describe('Not Found Errors', () => {
    test('throws NotFoundError when user does not exist', async () => {
      mockUserRepo.findById.mockResolvedValue(null);

      const request = {
        userId: 'nonexistent-user',
        items: [{ productId: 'prod-1', quantity: 1 }],
        shippingAddress: '123 Main St'
      };

      await expect(orderService.createOrder(request)).rejects.toMatchObject({
        name: 'NotFoundError',
        resourceType: 'User',
        resourceId: 'nonexistent-user'
      });
    });

    test('throws NotFoundError when product does not exist', async () => {
      mockUserRepo.findById.mockResolvedValue({ id: 'user-123' });
      mockProductRepo.findById.mockResolvedValue(null);

      const request = {
        userId: 'user-123',
        items: [{ productId: 'nonexistent-product', quantity: 1 }],
        shippingAddress: '123 Main St'
      };

      await expect(orderService.createOrder(request)).rejects.toMatchObject({
        name: 'NotFoundError',
        resourceType: 'Product'
      });
    });
  });

  describe('Conflict Errors', () => {
    test('throws ConflictError when inventory is insufficient', async () => {
      mockUserRepo.findById.mockResolvedValue({ id: 'user-123' });
      mockProductRepo.findById.mockResolvedValue({
        id: 'prod-1',
        name: 'Widget',
        inventory: 5
      });

      const request = {
        userId: 'user-123',
        items: [{ productId: 'prod-1', quantity: 10 }],
        shippingAddress: '123 Main St'
      };

      await expect(orderService.createOrder(request)).rejects.toMatchObject({
        name: 'ConflictError',
        conflictType: 'INSUFFICIENT_INVENTORY'
      });
    });
  });
});
```

### API Error Response Testing

```typescript
// api-error-testing.spec.ts
import { test, expect } from '@playwright/test';

test.describe('API Error Responses', () => {
  const baseUrl = 'http://localhost:3000/api';

  test.describe('Validation Errors (400)', () => {
    test('returns 400 for missing required field', async ({ request }) => {
      const response = await request.post(`${baseUrl}/users`, {
        data: {
          // Missing email
          password: 'ValidPass1',
          name: 'Test User'
        }
      });

      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body.error.code).toBe('VALIDATION_ERROR');
      expect(body.error.details).toContainEqual(
        expect.objectContaining({ field: 'email' })
      );
    });

    test('returns 400 for invalid data format', async ({ request }) => {
      const response = await request.post(`${baseUrl}/users`, {
        data: {
          email: 'not-an-email',
          password: 'ValidPass1',
          name: 'Test User'
        }
      });

      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body.error.code).toBe('VALIDATION_ERROR');
      expect(body.error.message).toContain('email');
    });
  });

  test.describe('Authentication Errors (401)', () => {
    test('returns 401 for missing auth token', async ({ request }) => {
      const response = await request.get(`${baseUrl}/users/me`);

      expect(response.status()).toBe(401);

      const body = await response.json();
      expect(body.error.code).toBe('UNAUTHORIZED');
    });

    test('returns 401 for invalid auth token', async ({ request }) => {
      const response = await request.get(`${baseUrl}/users/me`, {
        headers: {
          Authorization: 'Bearer invalid-token'
        }
      });

      expect(response.status()).toBe(401);
    });

    test('returns 401 for expired auth token', async ({ request }) => {
      const expiredToken = 'eyJ...'; // expired JWT

      const response = await request.get(`${baseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${expiredToken}`
        }
      });

      expect(response.status()).toBe(401);

      const body = await response.json();
      expect(body.error.code).toBe('TOKEN_EXPIRED');
    });
  });

  test.describe('Authorization Errors (403)', () => {
    test('returns 403 for unauthorized resource access', async ({ request }) => {
      const userToken = await getAuthToken('regular-user');

      const response = await request.get(`${baseUrl}/admin/users`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      expect(response.status()).toBe(403);

      const body = await response.json();
      expect(body.error.code).toBe('FORBIDDEN');
    });
  });

  test.describe('Not Found Errors (404)', () => {
    test('returns 404 for nonexistent resource', async ({ request }) => {
      const response = await request.get(`${baseUrl}/users/nonexistent-id`);

      expect(response.status()).toBe(404);

      const body = await response.json();
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  test.describe('Conflict Errors (409)', () => {
    test('returns 409 for duplicate resource', async ({ request }) => {
      // Create user first
      await request.post(`${baseUrl}/users`, {
        data: {
          email: 'duplicate@example.com',
          password: 'ValidPass1',
          name: 'First User'
        }
      });

      // Try to create same user again
      const response = await request.post(`${baseUrl}/users`, {
        data: {
          email: 'duplicate@example.com',
          password: 'ValidPass1',
          name: 'Second User'
        }
      });

      expect(response.status()).toBe(409);

      const body = await response.json();
      expect(body.error.code).toBe('DUPLICATE_RESOURCE');
    });
  });

  test.describe('Rate Limiting Errors (429)', () => {
    test('returns 429 when rate limit exceeded', async ({ request }) => {
      // Make many requests quickly
      const requests = Array(100)
        .fill(null)
        .map(() => request.get(`${baseUrl}/health`));

      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status() === 429);

      expect(rateLimited.length).toBeGreaterThan(0);

      const body = await rateLimited[0].json();
      expect(body.error.code).toBe('RATE_LIMIT_EXCEEDED');
      expect(body.error.retryAfter).toBeDefined();
    });
  });

  test.describe('Server Errors (500)', () => {
    test('returns 500 with safe error message', async ({ request }) => {
      // Trigger internal error (implementation-specific)
      const response = await request.post(`${baseUrl}/trigger-error`);

      expect(response.status()).toBe(500);

      const body = await response.json();
      expect(body.error.code).toBe('INTERNAL_ERROR');
      // Should not expose internal details
      expect(body.error.message).not.toContain('stack');
      expect(body.error.message).not.toContain('SQL');
    });
  });
});
```

## Best Practices

### Error Testing Checklist

```markdown
## Error Testing Best Practices

### Input Validation Errors
- [ ] Test missing required fields
- [ ] Test invalid data types
- [ ] Test boundary violations
- [ ] Test malformed data formats
- [ ] Test empty/null values
- [ ] Test oversized inputs

### Authentication/Authorization Errors
- [ ] Test missing credentials
- [ ] Test invalid credentials
- [ ] Test expired tokens
- [ ] Test insufficient permissions
- [ ] Test cross-user access

### System Errors
- [ ] Test database unavailability
- [ ] Test network failures
- [ ] Test timeout scenarios
- [ ] Test resource exhaustion
- [ ] Test concurrent access

### Error Response Quality
- [ ] Verify appropriate HTTP status codes
- [ ] Verify error codes are consistent
- [ ] Verify error messages are helpful
- [ ] Verify no sensitive data is leaked
- [ ] Verify error logging is correct

### Recovery Behavior
- [ ] Test retry mechanisms
- [ ] Test graceful degradation
- [ ] Test transaction rollbacks
- [ ] Test state consistency after errors
```

## Conclusion

Error testing is essential for building robust, user-friendly applications. By systematically testing how software handles invalid inputs, system failures, and unexpected conditions, test automation professionals ensure applications fail gracefully and provide meaningful feedback.

## Key Takeaways

1. Test both valid (positive) and invalid (negative) scenarios
2. Verify appropriate error codes and messages
3. Ensure errors don't leak sensitive information
4. Test system error handling (timeouts, unavailability)
5. Validate error recovery and state consistency
6. Include error tests in automated test suites
7. Document expected error behaviors
