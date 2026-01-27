# Application Programming Interface (API) Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

API testing validates the application programming interfaces that enable software systems to communicate. For test automation professionals, API testing is a critical skill because APIs form the backbone of modern applications, and testing them provides faster, more reliable feedback than UI testing alone.

## What is API Testing?

API testing directly tests the business logic layer of an application by sending requests to endpoints and validating responses. It bypasses the user interface to verify that APIs:

- Return correct data
- Handle errors appropriately
- Perform within acceptable limits
- Maintain security requirements
- Follow API contracts

### Types of APIs

```
┌─────────────────────────────────────────────────────────────┐
│                      API Types                              │
├─────────────────────────────────────────────────────────────┤
│  REST (Representational State Transfer)                     │
│  └── HTTP-based, stateless, resource-oriented               │
│                                                             │
│  GraphQL                                                    │
│  └── Query language, single endpoint, client-driven         │
│                                                             │
│  gRPC                                                       │
│  └── Protocol buffers, high performance, bidirectional      │
│                                                             │
│  SOAP (Simple Object Access Protocol)                       │
│  └── XML-based, enterprise, strict contracts                │
│                                                             │
│  WebSocket                                                  │
│  └── Full-duplex, real-time, persistent connections         │
└─────────────────────────────────────────────────────────────┘
```

## API Testing Fundamentals

### HTTP Methods

| Method | Purpose | Idempotent |
|--------|---------|------------|
| GET | Retrieve resource | Yes |
| POST | Create resource | No |
| PUT | Update/replace resource | Yes |
| PATCH | Partial update | No |
| DELETE | Remove resource | Yes |
| HEAD | Get headers only | Yes |
| OPTIONS | Get allowed methods | Yes |

### Status Codes

```javascript
const statusCodes = {
  // Success
  200: 'OK',
  201: 'Created',
  204: 'No Content',

  // Redirection
  301: 'Moved Permanently',
  304: 'Not Modified',

  // Client Errors
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',

  // Server Errors
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};
```

## API Testing Tools

### Popular Tools Comparison

| Tool | Language | Best For |
|------|----------|----------|
| REST Assured | Java | Java-based projects |
| Supertest | JavaScript | Node.js/Express apps |
| pytest + requests | Python | Python projects |
| Playwright API | TypeScript/JS | Full-stack testing |
| Postman/Newman | Any | Quick testing, CI/CD |
| Karate | Java | BDD-style API tests |
| httpx | Python | Async API testing |

## REST API Testing

### Using JavaScript with Playwright

```typescript
import { test, expect } from '@playwright/test';

test.describe('User API', () => {
  const baseURL = 'https://api.example.com';

  test('GET /users returns list of users', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);

    // Validate user structure
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('email');
    expect(users[0]).toHaveProperty('name');
  });

  test('POST /users creates a new user', async ({ request }) => {
    const newUser = {
      email: 'test@example.com',
      name: 'Test User',
      role: 'user'
    };

    const response = await request.post(`${baseURL}/users`, {
      data: newUser,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(201);

    const createdUser = await response.json();
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.id).toBeDefined();
  });

  test('GET /users/:id returns single user', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${baseURL}/users/${userId}`);

    expect(response.ok()).toBeTruthy();

    const user = await response.json();
    expect(user.id).toBe(userId);
  });

  test('PUT /users/:id updates user', async ({ request }) => {
    const userId = 1;
    const updates = { name: 'Updated Name' };

    const response = await request.put(`${baseURL}/users/${userId}`, {
      data: updates
    });

    expect(response.ok()).toBeTruthy();

    const updatedUser = await response.json();
    expect(updatedUser.name).toBe(updates.name);
  });

  test('DELETE /users/:id removes user', async ({ request }) => {
    const userId = 1;

    const response = await request.delete(`${baseURL}/users/${userId}`);

    expect(response.status()).toBe(204);
  });
});
```

### Using Python with pytest

```python
import pytest
import requests
from dataclasses import dataclass

@dataclass
class APIClient:
    base_url: str
    token: str = None

    def get_headers(self):
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'
        return headers

    def get(self, endpoint: str, **kwargs):
        return requests.get(
            f'{self.base_url}{endpoint}',
            headers=self.get_headers(),
            **kwargs
        )

    def post(self, endpoint: str, data: dict, **kwargs):
        return requests.post(
            f'{self.base_url}{endpoint}',
            json=data,
            headers=self.get_headers(),
            **kwargs
        )


@pytest.fixture
def api_client():
    return APIClient(base_url='https://api.example.com')


class TestUserAPI:
    def test_get_users(self, api_client):
        response = api_client.get('/users')

        assert response.status_code == 200
        users = response.json()
        assert isinstance(users, list)
        assert len(users) > 0

    def test_create_user(self, api_client):
        new_user = {
            'email': 'test@example.com',
            'name': 'Test User'
        }

        response = api_client.post('/users', data=new_user)

        assert response.status_code == 201
        created = response.json()
        assert created['email'] == new_user['email']
        assert 'id' in created

    def test_get_user_not_found(self, api_client):
        response = api_client.get('/users/999999')

        assert response.status_code == 404

    @pytest.mark.parametrize('invalid_email', [
        '',
        'notanemail',
        'missing@domain',
        '@nodomain.com'
    ])
    def test_create_user_invalid_email(self, api_client, invalid_email):
        response = api_client.post('/users', data={'email': invalid_email})

        assert response.status_code == 422
        error = response.json()
        assert 'email' in error.get('errors', {})
```

### Using Java with REST Assured

```java
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class UserAPITest {

    @BeforeAll
    static void setup() {
        RestAssured.baseURI = "https://api.example.com";
    }

    @Test
    void shouldReturnListOfUsers() {
        given()
            .contentType(ContentType.JSON)
        .when()
            .get("/users")
        .then()
            .statusCode(200)
            .body("$", hasSize(greaterThan(0)))
            .body("[0].id", notNullValue())
            .body("[0].email", notNullValue());
    }

    @Test
    void shouldCreateNewUser() {
        String newUser = """
            {
                "email": "test@example.com",
                "name": "Test User"
            }
            """;

        given()
            .contentType(ContentType.JSON)
            .body(newUser)
        .when()
            .post("/users")
        .then()
            .statusCode(201)
            .body("id", notNullValue())
            .body("email", equalTo("test@example.com"));
    }

    @Test
    void shouldReturn404ForNonexistentUser() {
        given()
            .contentType(ContentType.JSON)
        .when()
            .get("/users/999999")
        .then()
            .statusCode(404);
    }
}
```

## GraphQL API Testing

```typescript
import { test, expect } from '@playwright/test';

test.describe('GraphQL API', () => {
  const endpoint = 'https://api.example.com/graphql';

  test('query users', async ({ request }) => {
    const query = `
      query GetUsers {
        users {
          id
          name
          email
          posts {
            id
            title
          }
        }
      }
    `;

    const response = await request.post(endpoint, {
      data: { query }
    });

    expect(response.ok()).toBeTruthy();

    const { data, errors } = await response.json();
    expect(errors).toBeUndefined();
    expect(data.users).toBeInstanceOf(Array);
  });

  test('mutation create user', async ({ request }) => {
    const mutation = `
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          name
          email
        }
      }
    `;

    const variables = {
      input: {
        name: 'New User',
        email: 'newuser@example.com'
      }
    };

    const response = await request.post(endpoint, {
      data: { query: mutation, variables }
    });

    const { data, errors } = await response.json();
    expect(errors).toBeUndefined();
    expect(data.createUser.email).toBe(variables.input.email);
  });

  test('query with variables', async ({ request }) => {
    const query = `
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
        }
      }
    `;

    const response = await request.post(endpoint, {
      data: {
        query,
        variables: { id: '1' }
      }
    });

    const { data } = await response.json();
    expect(data.user.id).toBe('1');
  });
});
```

## API Contract Testing

### OpenAPI/Swagger Validation

```javascript
import SwaggerParser from '@apidevtools/swagger-parser';
import Ajv from 'ajv';

class ContractValidator {
  constructor(specPath) {
    this.specPath = specPath;
    this.ajv = new Ajv({ allErrors: true });
  }

  async loadSpec() {
    this.spec = await SwaggerParser.validate(this.specPath);
    return this.spec;
  }

  getResponseSchema(path, method, statusCode) {
    const endpoint = this.spec.paths[path];
    if (!endpoint) throw new Error(`Path ${path} not found`);

    const operation = endpoint[method.toLowerCase()];
    if (!operation) throw new Error(`Method ${method} not found`);

    const response = operation.responses[statusCode];
    if (!response) throw new Error(`Status ${statusCode} not found`);

    return response.content?.['application/json']?.schema;
  }

  validateResponse(path, method, statusCode, data) {
    const schema = this.getResponseSchema(path, method, statusCode);
    const validate = this.ajv.compile(schema);
    const valid = validate(data);

    return {
      valid,
      errors: validate.errors
    };
  }
}

// Usage in tests
test('response matches contract', async ({ request }) => {
  const validator = new ContractValidator('./openapi.yaml');
  await validator.loadSpec();

  const response = await request.get('/api/users');
  const data = await response.json();

  const { valid, errors } = validator.validateResponse(
    '/users', 'GET', '200', data
  );

  expect(valid).toBeTruthy();
  expect(errors).toBeNull();
});
```

### Pact Contract Testing

```javascript
// Consumer test (client-side)
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

const { like, eachLike } = MatchersV3;

const provider = new PactV3({
  consumer: 'UserService',
  provider: 'UserAPI'
});

describe('User API Contract', () => {
  it('get user by id', async () => {
    await provider
      .given('user with id 1 exists')
      .uponReceiving('a request for user 1')
      .withRequest({
        method: 'GET',
        path: '/users/1'
      })
      .willRespondWith({
        status: 200,
        body: like({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com'
        })
      });

    await provider.executeTest(async (mockserver) => {
      const response = await fetch(`${mockserver.url}/users/1`);
      const user = await response.json();

      expect(user.id).toBe(1);
      expect(user.name).toBeDefined();
    });
  });
});
```

## API Performance Testing

```javascript
import { test, expect } from '@playwright/test';

test.describe('API Performance', () => {
  test('response time under threshold', async ({ request }) => {
    const startTime = Date.now();

    const response = await request.get('/api/users');

    const duration = Date.now() - startTime;

    expect(response.ok()).toBeTruthy();
    expect(duration).toBeLessThan(500); // 500ms threshold
  });

  test('concurrent requests performance', async ({ request }) => {
    const concurrency = 10;
    const requests = Array(concurrency).fill(null).map(() =>
      request.get('/api/users')
    );

    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const totalDuration = Date.now() - startTime;

    responses.forEach(response => {
      expect(response.ok()).toBeTruthy();
    });

    // All 10 requests should complete within 2 seconds
    expect(totalDuration).toBeLessThan(2000);
  });
});
```

## API Security Testing

```typescript
test.describe('API Security', () => {
  test('requires authentication', async ({ request }) => {
    const response = await request.get('/api/admin/users');

    expect(response.status()).toBe(401);
  });

  test('rejects invalid token', async ({ request }) => {
    const response = await request.get('/api/users', {
      headers: {
        'Authorization': 'Bearer invalid-token'
      }
    });

    expect(response.status()).toBe(401);
  });

  test('enforces authorization', async ({ request }) => {
    // Login as regular user
    const loginResponse = await request.post('/api/auth/login', {
      data: { email: 'user@example.com', password: 'password' }
    });
    const { token } = await loginResponse.json();

    // Try to access admin endpoint
    const response = await request.get('/api/admin/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    expect(response.status()).toBe(403);
  });

  test('prevents SQL injection', async ({ request }) => {
    const response = await request.get('/api/users', {
      params: {
        search: "'; DROP TABLE users; --"
      }
    });

    // Should handle safely, not error
    expect(response.status()).not.toBe(500);
  });

  test('rate limiting works', async ({ request }) => {
    const requests = Array(100).fill(null).map(() =>
      request.get('/api/users')
    );

    const responses = await Promise.all(requests);
    const rateLimited = responses.filter(r => r.status() === 429);

    expect(rateLimited.length).toBeGreaterThan(0);
  });
});
```

## Error Handling Tests

```typescript
test.describe('API Error Handling', () => {
  test('returns proper error for invalid JSON', async ({ request }) => {
    const response = await request.post('/api/users', {
      headers: { 'Content-Type': 'application/json' },
      data: 'invalid json{'
    });

    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.message).toContain('JSON');
  });

  test('returns proper error for missing required fields', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: { name: 'No Email' }
    });

    expect(response.status()).toBe(422);
    const error = await response.json();
    expect(error.errors.email).toBeDefined();
  });

  test('handles server errors gracefully', async ({ request }) => {
    // Trigger a known server error condition
    const response = await request.post('/api/trigger-error', {
      data: { type: 'internal' }
    });

    expect(response.status()).toBe(500);
    const error = await response.json();
    expect(error.message).toBeDefined();
    // Should not leak stack traces
    expect(error.stack).toBeUndefined();
  });
});
```

## API Test Organization

### Test Structure

```
tests/
├── api/
│   ├── fixtures/
│   │   ├── users.json
│   │   └── products.json
│   ├── helpers/
│   │   ├── api-client.ts
│   │   └── auth.ts
│   ├── contracts/
│   │   └── openapi.yaml
│   ├── users/
│   │   ├── create-user.spec.ts
│   │   ├── get-users.spec.ts
│   │   └── update-user.spec.ts
│   ├── products/
│   │   └── ...
│   └── auth/
│       └── ...
└── playwright.config.ts
```

### Reusable API Client

```typescript
// helpers/api-client.ts
import { APIRequestContext } from '@playwright/test';

export class APIClient {
  constructor(
    private request: APIRequestContext,
    private baseURL: string,
    private token?: string
  ) {}

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async get<T>(path: string): Promise<{ status: number; data: T }> {
    const response = await this.request.get(`${this.baseURL}${path}`, {
      headers: this.getHeaders()
    });
    return {
      status: response.status(),
      data: await response.json()
    };
  }

  async post<T>(path: string, body: object): Promise<{ status: number; data: T }> {
    const response = await this.request.post(`${this.baseURL}${path}`, {
      data: body,
      headers: this.getHeaders()
    });
    return {
      status: response.status(),
      data: await response.json()
    };
  }

  setToken(token: string) {
    this.token = token;
  }
}
```

## Best Practices

### API Testing Checklist

```markdown
## API Test Coverage Checklist

### Functional Tests
- [ ] All CRUD operations
- [ ] All query parameters
- [ ] All response codes
- [ ] Pagination
- [ ] Filtering and sorting
- [ ] Field validation

### Security Tests
- [ ] Authentication required
- [ ] Authorization enforced
- [ ] Input validation
- [ ] Rate limiting
- [ ] Sensitive data protection

### Performance Tests
- [ ] Response time thresholds
- [ ] Concurrent load handling
- [ ] Payload size limits

### Error Handling
- [ ] Invalid input handling
- [ ] Missing required fields
- [ ] Malformed requests
- [ ] Server error responses
```

## Conclusion

API testing is essential for validating the backbone of modern applications. By testing APIs directly, you get faster feedback, more reliable tests, and better coverage of business logic. Combine API testing with UI testing for comprehensive quality assurance.

## Key Takeaways

1. API tests are faster and more reliable than UI tests
2. Test all HTTP methods and response codes
3. Validate request/response schemas against contracts
4. Include security testing (auth, authz, injection)
5. Monitor performance under load
6. Organize tests by resource/domain
7. Build reusable API clients and helpers
