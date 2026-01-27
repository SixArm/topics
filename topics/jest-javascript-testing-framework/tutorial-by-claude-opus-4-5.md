# Jest JavaScript Testing Framework: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Jest is a JavaScript testing framework developed by Meta (Facebook) that provides a complete testing solution with zero configuration. For test automation professionals, Jest offers built-in test runners, assertion libraries, mocking capabilities, and code coverage reporting in a single package.

## What is Jest?

Jest is a batteries-included JavaScript testing framework that works with projects using Babel, TypeScript, Node.js, React, Angular, Vue, and more. It emphasizes simplicity and provides instant feedback with its interactive watch mode.

### Jest Features

```
┌─────────────────────────────────────────────────────────────┐
│                      Jest Features                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Core Capabilities:                                         │
│  ├── Zero configuration for most projects                   │
│  ├── Built-in assertion library (expect)                    │
│  ├── Built-in mocking (jest.fn, jest.mock)                  │
│  ├── Code coverage reporting                                │
│  ├── Snapshot testing                                        │
│  ├── Parallel test execution                                │
│  └── Interactive watch mode                                  │
│                                                             │
│  Test Types Supported:                                      │
│  ├── Unit tests                                              │
│  ├── Integration tests                                       │
│  ├── Component tests (React, Vue)                           │
│  ├── API tests                                               │
│  └── Snapshot tests                                          │
│                                                             │
│  Ecosystem:                                                 │
│  ├── @testing-library/* for component testing               │
│  ├── ts-jest for TypeScript support                         │
│  ├── jest-extended for additional matchers                  │
│  └── jest-circus for improved test runner                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Writing Tests with Jest

### Basic Tests

```typescript
// basics.test.ts

// Simple function tests
function add(a: number, b: number): number {
  return a + b;
}

function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

describe('Basic Arithmetic', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  test('divides two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('throws on division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });
});

// Matchers
describe('Jest Matchers', () => {
  // Equality
  test('exact equality', () => {
    expect(2 + 2).toBe(4);           // Strict ===
    expect({ name: 'Test' }).toEqual({ name: 'Test' }); // Deep equality
  });

  // Truthiness
  test('truthiness checks', () => {
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
    expect('hello').toBeDefined();
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
  });

  // Numbers
  test('number comparisons', () => {
    expect(10).toBeGreaterThan(5);
    expect(5).toBeGreaterThanOrEqual(5);
    expect(3).toBeLessThan(5);
    expect(0.1 + 0.2).toBeCloseTo(0.3);  // Float comparison
  });

  // Strings
  test('string matching', () => {
    expect('Hello World').toMatch(/World/);
    expect('team@example.com').toMatch(/^[\w.]+@[\w.]+$/);
  });

  // Arrays and iterables
  test('array checks', () => {
    const fruits = ['apple', 'banana', 'cherry'];

    expect(fruits).toContain('banana');
    expect(fruits).toHaveLength(3);
    expect(new Set(fruits)).toContain('apple');
  });

  // Objects
  test('object matching', () => {
    const user = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      settings: { theme: 'dark' }
    };

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('settings.theme', 'dark');
    expect(user).toMatchObject({
      name: 'Test User',
      email: expect.stringContaining('@')
    });
  });

  // Exceptions
  test('exception matchers', () => {
    function riskyOperation() {
      throw new TypeError('Invalid input');
    }

    expect(riskyOperation).toThrow();
    expect(riskyOperation).toThrow(TypeError);
    expect(riskyOperation).toThrow('Invalid input');
    expect(riskyOperation).toThrow(/invalid/i);
  });
});
```

### Setup and Teardown

```typescript
// setup-teardown.test.ts

describe('Lifecycle Hooks', () => {
  let database: TestDatabase;

  // Runs once before all tests in this describe block
  beforeAll(async () => {
    database = await TestDatabase.connect();
    await database.migrate();
  });

  // Runs once after all tests in this describe block
  afterAll(async () => {
    await database.close();
  });

  // Runs before each test
  beforeEach(async () => {
    await database.beginTransaction();
  });

  // Runs after each test
  afterEach(async () => {
    await database.rollback();
  });

  test('creates a user', async () => {
    const user = await database.createUser({ name: 'Test' });
    expect(user.id).toBeDefined();
  });

  test('lists users', async () => {
    await database.createUser({ name: 'User 1' });
    await database.createUser({ name: 'User 2' });

    const users = await database.listUsers();
    expect(users).toHaveLength(2);
  });

  // Nested describe blocks have their own lifecycle
  describe('with authenticated user', () => {
    let authToken: string;

    beforeEach(async () => {
      const user = await database.createUser({ name: 'Auth User' });
      authToken = await generateToken(user);
    });

    test('can access protected resource', async () => {
      const result = await api.get('/protected', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      expect(result.status).toBe(200);
    });
  });
});

// Stubs
class TestDatabase {
  static async connect() { return new TestDatabase(); }
  async migrate() {}
  async close() {}
  async beginTransaction() {}
  async rollback() {}
  async createUser(data: any) { return { id: '1', ...data }; }
  async listUsers() { return []; }
}
async function generateToken(user: any) { return 'token'; }
const api = { get: async (url: string, config?: any) => ({ status: 200 }) };
```

### Mocking

```typescript
// mocking.test.ts

// Function mocking
describe('jest.fn() - Function Mocking', () => {
  test('tracks calls', () => {
    const mockFn = jest.fn();

    mockFn('first call');
    mockFn('second call');

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenCalledWith('first call');
    expect(mockFn).toHaveBeenLastCalledWith('second call');
  });

  test('configures return values', () => {
    const mockFn = jest.fn()
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(20)
      .mockReturnValue(0);

    expect(mockFn()).toBe(10);
    expect(mockFn()).toBe(20);
    expect(mockFn()).toBe(0);
    expect(mockFn()).toBe(0);
  });

  test('mocks async functions', async () => {
    const mockFetch = jest.fn()
      .mockResolvedValueOnce({ data: 'first' })
      .mockRejectedValueOnce(new Error('Network error'));

    const result1 = await mockFetch();
    expect(result1).toEqual({ data: 'first' });

    await expect(mockFetch()).rejects.toThrow('Network error');
  });

  test('uses implementation', () => {
    const mockFn = jest.fn((x: number) => x * 2);

    expect(mockFn(5)).toBe(10);
    expect(mockFn).toHaveBeenCalledWith(5);
  });
});

// Module mocking
// emailService.ts (module to mock)
// export const sendEmail = async (to: string, subject: string) => { ... }

jest.mock('./emailService', () => ({
  sendEmail: jest.fn().mockResolvedValue({ success: true })
}));

import { sendEmail } from './emailService';

describe('Module Mocking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('mocks module functions', async () => {
    const result = await sendEmail('test@example.com', 'Test');

    expect(sendEmail).toHaveBeenCalledWith('test@example.com', 'Test');
    expect(result).toEqual({ success: true });
  });
});

// Spying
describe('jest.spyOn() - Spying', () => {
  const calculator = {
    add: (a: number, b: number) => a + b,
    multiply: (a: number, b: number) => a * b
  };

  test('spies on method calls', () => {
    const spy = jest.spyOn(calculator, 'add');

    const result = calculator.add(2, 3);

    expect(spy).toHaveBeenCalledWith(2, 3);
    expect(result).toBe(5); // Original implementation runs
    spy.mockRestore();
  });

  test('replaces implementation', () => {
    const spy = jest.spyOn(calculator, 'multiply')
      .mockImplementation((a, b) => 0);

    expect(calculator.multiply(2, 3)).toBe(0); // Mocked
    spy.mockRestore();
    expect(calculator.multiply(2, 3)).toBe(6); // Restored
  });
});

// Timer mocking
describe('Timer Mocking', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('controls setTimeout', () => {
    const callback = jest.fn();

    setTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('controls setInterval', () => {
    const callback = jest.fn();

    setInterval(callback, 500);

    jest.advanceTimersByTime(1500);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
```

### Async Testing

```typescript
// async.test.ts

describe('Async Testing Patterns', () => {
  // Pattern 1: async/await
  test('async/await pattern', async () => {
    const data = await fetchData('users');
    expect(data).toHaveLength(3);
  });

  // Pattern 2: Promises
  test('promise pattern', () => {
    return fetchData('users').then(data => {
      expect(data).toHaveLength(3);
    });
  });

  // Pattern 3: Resolves/Rejects
  test('resolves with data', async () => {
    await expect(fetchData('users')).resolves.toHaveLength(3);
  });

  test('rejects with error', async () => {
    await expect(fetchData('invalid')).rejects.toThrow('Not found');
  });

  // Pattern 4: Callback (legacy)
  test('callback pattern', (done) => {
    function callback(error: Error | null, data: any) {
      try {
        expect(error).toBeNull();
        expect(data).toBeDefined();
        done();
      } catch (error) {
        done(error);
      }
    }
    fetchDataCallback('users', callback);
  });
});

async function fetchData(resource: string): Promise<any[]> {
  if (resource === 'invalid') throw new Error('Not found');
  return [1, 2, 3];
}
function fetchDataCallback(resource: string, cb: Function) {
  cb(null, [1, 2, 3]);
}
```

### Snapshot Testing

```typescript
// snapshot.test.ts

describe('Snapshot Testing', () => {
  test('user object matches snapshot', () => {
    const user = createUser({
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin'
    });

    expect(user).toMatchSnapshot();
  });

  test('inline snapshot', () => {
    const greeting = getGreeting('World');

    expect(greeting).toMatchInlineSnapshot(`"Hello, World!"`);
  });

  test('API response shape', () => {
    const response = {
      status: 'success',
      data: {
        id: expect.any(String),
        createdAt: expect.any(Date),
        name: 'Test'
      }
    };

    expect(response).toMatchSnapshot({
      data: {
        id: expect.any(String),
        createdAt: expect.any(Date)
      }
    });
  });
});

function createUser(data: any) { return { id: '123', ...data }; }
function getGreeting(name: string) { return `Hello, ${name}!`; }
```

### Test Organization

```typescript
// organized.test.ts

/**
 * Well-organized Jest test file structure.
 */

// Service being tested
class UserService {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService
  ) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new Error('Email already exists');

    const user = await this.userRepo.create(data);
    await this.emailService.sendWelcome(user.email);
    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async deactivateUser(id: string): Promise<void> {
    await this.userRepo.update(id, { active: false });
  }
}

// Test file
describe('UserService', () => {
  let service: UserService;
  let mockRepo: jest.Mocked<UserRepository>;
  let mockEmail: jest.Mocked<EmailService>;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    } as any;

    mockEmail = {
      sendWelcome: jest.fn().mockResolvedValue(true)
    } as any;

    service = new UserService(mockRepo, mockEmail);
  });

  describe('createUser', () => {
    const validUserData = {
      email: 'test@example.com',
      name: 'Test User'
    };

    it('should create user with valid data', async () => {
      mockRepo.findByEmail.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ id: '1', ...validUserData, active: true });

      const user = await service.createUser(validUserData);

      expect(user.email).toBe('test@example.com');
      expect(mockRepo.create).toHaveBeenCalledWith(validUserData);
    });

    it('should send welcome email after creation', async () => {
      mockRepo.findByEmail.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ id: '1', ...validUserData, active: true });

      await service.createUser(validUserData);

      expect(mockEmail.sendWelcome).toHaveBeenCalledWith('test@example.com');
    });

    it('should throw if email already exists', async () => {
      mockRepo.findByEmail.mockResolvedValue({ id: '1', ...validUserData, active: true });

      await expect(service.createUser(validUserData))
        .rejects.toThrow('Email already exists');

      expect(mockRepo.create).not.toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return user when found', async () => {
      const expectedUser = { id: '1', email: 'test@example.com', name: 'Test', active: true };
      mockRepo.findById.mockResolvedValue(expectedUser);

      const user = await service.getUser('1');

      expect(user).toEqual(expectedUser);
    });

    it('should throw when user not found', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.getUser('999'))
        .rejects.toThrow('User not found');
    });
  });

  describe('deactivateUser', () => {
    it('should update user to inactive', async () => {
      await service.deactivateUser('1');

      expect(mockRepo.update).toHaveBeenCalledWith('1', { active: false });
    });
  });
});

// Types
interface User { id: string; email: string; name: string; active: boolean; }
interface CreateUserDTO { email: string; name: string; }
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: Partial<User>): Promise<void>;
}
interface EmailService {
  sendWelcome(email: string): Promise<boolean>;
}
```

## Jest Configuration

```typescript
// jest.config.ts

import type { Config } from 'jest';

const config: Config = {
  // TypeScript support
  preset: 'ts-jest',

  // Test environment
  testEnvironment: 'node',

  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/*.spec.ts'
  ],

  // Module path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },

  // Setup files
  setupFilesAfterSetup: ['<rootDir>/tests/setup.ts'],

  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // Performance
  maxWorkers: '50%',

  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true
};

export default config;
```

## Best Practices

### Jest Testing Checklist

```markdown
## Jest Best Practices

### Test Structure
- [ ] Use describe blocks for logical grouping
- [ ] Use clear, descriptive test names
- [ ] Follow Arrange-Act-Assert pattern
- [ ] Keep tests focused and independent
- [ ] Use beforeEach/afterEach for setup/cleanup

### Mocking
- [ ] Clear mocks between tests
- [ ] Mock at the right level of abstraction
- [ ] Verify mock interactions
- [ ] Restore spies after tests
- [ ] Prefer dependency injection over module mocking

### Async Testing
- [ ] Use async/await over callbacks
- [ ] Test both success and error paths
- [ ] Use resolves/rejects matchers
- [ ] Handle promise rejections properly
- [ ] Set appropriate timeouts

### Performance
- [ ] Run tests in parallel (default)
- [ ] Use watch mode during development
- [ ] Configure coverage thresholds
- [ ] Minimize test setup overhead
- [ ] Use focused tests during debugging

### Maintenance
- [ ] Update snapshots intentionally
- [ ] Review snapshot changes in PRs
- [ ] Remove unused mocks and fixtures
- [ ] Keep test files near source files
- [ ] Document complex test patterns
```

## Conclusion

Jest provides a comprehensive, zero-configuration testing solution for JavaScript and TypeScript projects. Its built-in mocking, assertion library, and snapshot testing capabilities make it an excellent choice for test automation professionals working in the JavaScript ecosystem.

## Key Takeaways

1. Jest includes everything needed for testing in one package
2. Use describe/it for clear test organization
3. Built-in mocking with jest.fn(), jest.mock(), jest.spyOn()
4. Snapshot testing captures component/data structure shapes
5. Async testing with async/await and resolves/rejects matchers
6. Configure coverage thresholds for quality gates
7. Watch mode provides rapid development feedback
