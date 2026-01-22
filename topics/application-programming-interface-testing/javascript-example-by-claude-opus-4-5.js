/**
 * Application Programming Interface (API) Testing
 *
 * API testing focuses on verifying the functionality, reliability, performance,
 * and security of Application Programming Interfaces. Unlike UI testing, API
 * testing operates at the business logic layer, examining data exchange between
 * systems and validating that APIs meet expected functionality requirements.
 *
 * Key Concepts:
 * - HTTP methods (GET, POST, PUT, DELETE, PATCH)
 * - Status codes and response validation
 * - Request/response payloads
 * - Authentication and authorization
 * - Performance and load testing
 * - Contract testing
 */

// Example 1: API Test Framework
class APITestFramework {
  constructor(baseUrl, config = {}) {
    this.baseUrl = baseUrl;
    this.config = {
      timeout: config.timeout || 30000,
      defaultHeaders: config.defaultHeaders || {
        'Content-Type': 'application/json'
      },
      authToken: config.authToken || null
    };
    this.testResults = [];
  }

  /**
   * Set authentication token
   * @param {string} token - Auth token
   */
  setAuthToken(token) {
    this.config.authToken = token;
  }

  /**
   * Build headers for request
   * @param {object} customHeaders - Additional headers
   * @returns {object}
   */
  buildHeaders(customHeaders = {}) {
    const headers = { ...this.config.defaultHeaders, ...customHeaders };
    if (this.config.authToken) {
      headers['Authorization'] = `Bearer ${this.config.authToken}`;
    }
    return headers;
  }

  /**
   * Simulate HTTP request (in real implementation, use fetch/axios)
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {object} options - Request options
   * @returns {Promise<object>}
   */
  async request(method, endpoint, options = {}) {
    const startTime = Date.now();
    const url = `${this.baseUrl}${endpoint}`;

    // Simulated response based on endpoint and method
    const response = this.simulateResponse(method, endpoint, options);

    return {
      url,
      method,
      requestBody: options.body,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body: response.body,
      responseTime: Date.now() - startTime
    };
  }

  /**
   * Simulate API response (for demonstration)
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {object} options - Request options
   * @returns {object}
   */
  simulateResponse(method, endpoint, options) {
    // Simulate different responses based on endpoint
    if (endpoint === '/users' && method === 'GET') {
      return {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: [
          { id: 1, name: 'Alice', email: 'alice@example.com' },
          { id: 2, name: 'Bob', email: 'bob@example.com' }
        ]
      };
    }

    if (endpoint.match(/\/users\/\d+/) && method === 'GET') {
      const id = parseInt(endpoint.split('/')[2]);
      return {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: { id, name: 'Alice', email: 'alice@example.com' }
      };
    }

    if (endpoint === '/users' && method === 'POST') {
      return {
        status: 201,
        statusText: 'Created',
        headers: { 'Content-Type': 'application/json' },
        body: { id: 3, ...options.body }
      };
    }

    if (endpoint === '/auth/login' && method === 'POST') {
      const { email, password } = options.body || {};
      if (email === 'test@example.com' && password === 'password123') {
        return {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
          body: { token: 'mock-jwt-token-12345', expiresIn: 3600 }
        };
      }
      return {
        status: 401,
        statusText: 'Unauthorized',
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'Invalid credentials' }
      };
    }

    if (endpoint === '/error') {
      return {
        status: 500,
        statusText: 'Internal Server Error',
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'Something went wrong' }
      };
    }

    return {
      status: 404,
      statusText: 'Not Found',
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Endpoint not found' }
    };
  }

  /**
   * Run a test case
   * @param {object} testCase - Test case definition
   * @returns {object} - Test result
   */
  async runTest(testCase) {
    const result = {
      name: testCase.name,
      endpoint: testCase.endpoint,
      method: testCase.method,
      passed: true,
      assertions: [],
      duration: 0
    };

    const startTime = Date.now();

    try {
      const response = await this.request(
        testCase.method,
        testCase.endpoint,
        { body: testCase.body }
      );

      result.response = response;

      // Run assertions
      for (const assertion of testCase.assertions || []) {
        const assertionResult = this.runAssertion(assertion, response);
        result.assertions.push(assertionResult);
        if (!assertionResult.passed) {
          result.passed = false;
        }
      }

    } catch (error) {
      result.passed = false;
      result.error = error.message;
    }

    result.duration = Date.now() - startTime;
    this.testResults.push(result);

    return result;
  }

  /**
   * Run a single assertion
   * @param {object} assertion - Assertion definition
   * @param {object} response - API response
   * @returns {object}
   */
  runAssertion(assertion, response) {
    const result = {
      type: assertion.type,
      expected: assertion.expected,
      passed: false
    };

    switch (assertion.type) {
      case 'status':
        result.actual = response.status;
        result.passed = response.status === assertion.expected;
        break;

      case 'statusText':
        result.actual = response.statusText;
        result.passed = response.statusText === assertion.expected;
        break;

      case 'bodyContains':
        result.actual = JSON.stringify(response.body);
        result.passed = JSON.stringify(response.body).includes(assertion.expected);
        break;

      case 'bodyProperty':
        result.actual = this.getNestedProperty(response.body, assertion.path);
        result.passed = result.actual === assertion.expected;
        break;

      case 'bodyPropertyExists':
        result.actual = this.getNestedProperty(response.body, assertion.path);
        result.passed = result.actual !== undefined;
        break;

      case 'responseTimeBelow':
        result.actual = response.responseTime;
        result.passed = response.responseTime < assertion.expected;
        break;

      case 'headerExists':
        result.actual = response.headers[assertion.expected];
        result.passed = assertion.expected in response.headers;
        break;

      case 'arrayLength':
        result.actual = Array.isArray(response.body) ? response.body.length : 0;
        result.passed = result.actual === assertion.expected;
        break;

      default:
        result.passed = false;
        result.error = `Unknown assertion type: ${assertion.type}`;
    }

    return result;
  }

  /**
   * Get nested property from object
   * @param {object} obj - Object to search
   * @param {string} path - Dot-notation path
   * @returns {*}
   */
  getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) =>
      current && current[key] !== undefined ? current[key] : undefined, obj
    );
  }

  /**
   * Generate test report
   * @returns {object}
   */
  generateReport() {
    const passed = this.testResults.filter(r => r.passed).length;
    const failed = this.testResults.filter(r => !r.passed).length;
    const totalDuration = this.testResults.reduce((sum, r) => sum + r.duration, 0);

    return {
      summary: {
        total: this.testResults.length,
        passed,
        failed,
        passRate: ((passed / this.testResults.length) * 100).toFixed(2) + '%',
        totalDuration: `${totalDuration}ms`
      },
      results: this.testResults.map(r => ({
        name: r.name,
        passed: r.passed,
        duration: `${r.duration}ms`,
        failedAssertions: r.assertions.filter(a => !a.passed).map(a => ({
          type: a.type,
          expected: a.expected,
          actual: a.actual
        }))
      }))
    };
  }
}

// Example 2: API Contract Validator
class APIContractValidator {
  constructor(contract) {
    this.contract = contract;
  }

  /**
   * Validate response against contract
   * @param {string} endpoint - API endpoint
   * @param {string} method - HTTP method
   * @param {object} response - Actual response
   * @returns {object}
   */
  validate(endpoint, method, response) {
    const endpointContract = this.contract.endpoints?.find(
      e => e.path === endpoint && e.method === method
    );

    if (!endpointContract) {
      return {
        valid: false,
        errors: [`No contract found for ${method} ${endpoint}`]
      };
    }

    const errors = [];

    // Validate status code
    if (endpointContract.expectedStatus !== response.status) {
      errors.push(`Expected status ${endpointContract.expectedStatus}, got ${response.status}`);
    }

    // Validate response schema
    if (endpointContract.responseSchema) {
      const schemaErrors = this.validateSchema(response.body, endpointContract.responseSchema);
      errors.push(...schemaErrors);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate data against schema
   * @param {*} data - Data to validate
   * @param {object} schema - Schema definition
   * @param {string} path - Current path (for error messages)
   * @returns {Array}
   */
  validateSchema(data, schema, path = 'root') {
    const errors = [];

    // Type validation
    if (schema.type) {
      const actualType = Array.isArray(data) ? 'array' : typeof data;
      if (actualType !== schema.type) {
        errors.push(`${path}: Expected type ${schema.type}, got ${actualType}`);
        return errors;
      }
    }

    // Required properties
    if (schema.required && schema.type === 'object') {
      for (const prop of schema.required) {
        if (data[prop] === undefined) {
          errors.push(`${path}: Missing required property '${prop}'`);
        }
      }
    }

    // Object properties
    if (schema.properties && typeof data === 'object' && !Array.isArray(data)) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (data[key] !== undefined) {
          errors.push(...this.validateSchema(data[key], propSchema, `${path}.${key}`));
        }
      }
    }

    // Array items
    if (schema.items && Array.isArray(data)) {
      data.forEach((item, index) => {
        errors.push(...this.validateSchema(item, schema.items, `${path}[${index}]`));
      });
    }

    return errors;
  }
}

// Example 3: API Performance Tester
class APIPerformanceTester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.results = [];
  }

  /**
   * Run load test
   * @param {object} config - Test configuration
   * @returns {object}
   */
  async runLoadTest(config) {
    const {
      endpoint,
      method = 'GET',
      concurrentUsers = 10,
      requestsPerUser = 10,
      body = null
    } = config;

    const allResults = [];

    // Simulate concurrent users
    const userPromises = [];
    for (let user = 0; user < concurrentUsers; user++) {
      userPromises.push(this.simulateUser(endpoint, method, requestsPerUser, body));
    }

    const userResults = await Promise.all(userPromises);
    userResults.forEach(results => allResults.push(...results));

    return this.analyzeResults(allResults);
  }

  /**
   * Simulate single user making requests
   * @param {string} endpoint - API endpoint
   * @param {string} method - HTTP method
   * @param {number} numRequests - Number of requests
   * @param {object} body - Request body
   * @returns {Array}
   */
  async simulateUser(endpoint, method, numRequests, body) {
    const results = [];

    for (let i = 0; i < numRequests; i++) {
      const startTime = Date.now();

      // Simulate request with random latency
      await new Promise(resolve =>
        setTimeout(resolve, 50 + Math.random() * 100)
      );

      const responseTime = Date.now() - startTime;
      const success = Math.random() > 0.02; // 98% success rate simulation

      results.push({
        responseTime,
        success,
        timestamp: Date.now()
      });
    }

    return results;
  }

  /**
   * Analyze load test results
   * @param {Array} results - All request results
   * @returns {object}
   */
  analyzeResults(results) {
    const responseTimes = results.map(r => r.responseTime);
    const sortedTimes = [...responseTimes].sort((a, b) => a - b);

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.length - successCount;

    return {
      totalRequests: results.length,
      successfulRequests: successCount,
      failedRequests: failureCount,
      successRate: ((successCount / results.length) * 100).toFixed(2) + '%',
      responseTime: {
        min: Math.min(...responseTimes),
        max: Math.max(...responseTimes),
        avg: (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2),
        median: sortedTimes[Math.floor(sortedTimes.length / 2)],
        p95: sortedTimes[Math.floor(sortedTimes.length * 0.95)],
        p99: sortedTimes[Math.floor(sortedTimes.length * 0.99)]
      },
      throughput: (results.length / (results[results.length - 1].timestamp - results[0].timestamp) * 1000).toFixed(2) + ' req/s'
    };
  }
}

// Example 4: API Security Tester
class APISecurityTester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.vulnerabilities = [];
  }

  /**
   * Run security tests on endpoint
   * @param {string} endpoint - API endpoint
   * @param {object} options - Test options
   * @returns {Array}
   */
  async runSecurityTests(endpoint, options = {}) {
    const tests = [
      this.testSQLInjection(endpoint, options),
      this.testXSS(endpoint, options),
      this.testAuthBypass(endpoint, options),
      this.testRateLimiting(endpoint, options),
      this.testInputValidation(endpoint, options)
    ];

    return Promise.all(tests);
  }

  /**
   * Test for SQL injection vulnerabilities
   * @param {string} endpoint - API endpoint
   * @param {object} options - Test options
   * @returns {object}
   */
  async testSQLInjection(endpoint, options) {
    const payloads = [
      "' OR '1'='1",
      "'; DROP TABLE users; --",
      "1; SELECT * FROM users",
      "' UNION SELECT * FROM users --"
    ];

    // Simulate testing (in real implementation, send actual requests)
    const isVulnerable = Math.random() < 0.05; // 5% chance for demo

    return {
      test: 'SQL Injection',
      endpoint,
      vulnerable: isVulnerable,
      payloadsTested: payloads.length,
      recommendation: isVulnerable
        ? 'Use parameterized queries and input validation'
        : null
    };
  }

  /**
   * Test for XSS vulnerabilities
   * @param {string} endpoint - API endpoint
   * @param {object} options - Test options
   * @returns {object}
   */
  async testXSS(endpoint, options) {
    const payloads = [
      '<script>alert("XSS")</script>',
      '"><img src=x onerror=alert(1)>',
      "javascript:alert('XSS')"
    ];

    const isVulnerable = Math.random() < 0.05;

    return {
      test: 'Cross-Site Scripting (XSS)',
      endpoint,
      vulnerable: isVulnerable,
      payloadsTested: payloads.length,
      recommendation: isVulnerable
        ? 'Sanitize and encode all user input, use Content-Security-Policy'
        : null
    };
  }

  /**
   * Test for authentication bypass
   * @param {string} endpoint - API endpoint
   * @param {object} options - Test options
   * @returns {object}
   */
  async testAuthBypass(endpoint, options) {
    const tests = [
      'No authentication header',
      'Invalid token',
      'Expired token',
      'Malformed token'
    ];

    const isVulnerable = Math.random() < 0.03;

    return {
      test: 'Authentication Bypass',
      endpoint,
      vulnerable: isVulnerable,
      testsConducted: tests.length,
      recommendation: isVulnerable
        ? 'Implement proper authentication middleware and token validation'
        : null
    };
  }

  /**
   * Test rate limiting
   * @param {string} endpoint - API endpoint
   * @param {object} options - Test options
   * @returns {object}
   */
  async testRateLimiting(endpoint, options) {
    // Simulate rapid requests
    const requestCount = 100;
    const hasRateLimiting = Math.random() > 0.2; // 80% have rate limiting

    return {
      test: 'Rate Limiting',
      endpoint,
      vulnerable: !hasRateLimiting,
      requestsTested: requestCount,
      recommendation: !hasRateLimiting
        ? 'Implement rate limiting to prevent abuse and DoS attacks'
        : null
    };
  }

  /**
   * Test input validation
   * @param {string} endpoint - API endpoint
   * @param {object} options - Test options
   * @returns {object}
   */
  async testInputValidation(endpoint, options) {
    const payloads = [
      { email: 'not-an-email' },
      { age: -5 },
      { name: 'A'.repeat(10000) },
      { quantity: 999999999 }
    ];

    const isVulnerable = Math.random() < 0.1;

    return {
      test: 'Input Validation',
      endpoint,
      vulnerable: isVulnerable,
      payloadsTested: payloads.length,
      recommendation: isVulnerable
        ? 'Implement comprehensive input validation on all endpoints'
        : null
    };
  }

  /**
   * Generate security report
   * @param {Array} results - Test results
   * @returns {object}
   */
  generateSecurityReport(results) {
    const vulnerabilities = results.filter(r => r.vulnerable);

    return {
      totalTests: results.length,
      vulnerabilitiesFound: vulnerabilities.length,
      securityScore: ((1 - vulnerabilities.length / results.length) * 100).toFixed(0) + '/100',
      findings: vulnerabilities.map(v => ({
        test: v.test,
        endpoint: v.endpoint,
        recommendation: v.recommendation
      })),
      passed: results.filter(r => !r.vulnerable).map(r => r.test)
    };
  }
}

// Demonstration
console.log('=== API Testing Examples ===\n');

// Create test framework
const api = new APITestFramework('https://api.example.com');

// Define test cases
const testCases = [
  {
    name: 'Get all users',
    method: 'GET',
    endpoint: '/users',
    assertions: [
      { type: 'status', expected: 200 },
      { type: 'headerExists', expected: 'Content-Type' },
      { type: 'arrayLength', expected: 2 }
    ]
  },
  {
    name: 'Get single user',
    method: 'GET',
    endpoint: '/users/1',
    assertions: [
      { type: 'status', expected: 200 },
      { type: 'bodyPropertyExists', path: 'id' },
      { type: 'bodyPropertyExists', path: 'email' }
    ]
  },
  {
    name: 'Create user',
    method: 'POST',
    endpoint: '/users',
    body: { name: 'Charlie', email: 'charlie@example.com' },
    assertions: [
      { type: 'status', expected: 201 },
      { type: 'bodyProperty', path: 'name', expected: 'Charlie' }
    ]
  },
  {
    name: 'Login with valid credentials',
    method: 'POST',
    endpoint: '/auth/login',
    body: { email: 'test@example.com', password: 'password123' },
    assertions: [
      { type: 'status', expected: 200 },
      { type: 'bodyPropertyExists', path: 'token' }
    ]
  },
  {
    name: 'Login with invalid credentials',
    method: 'POST',
    endpoint: '/auth/login',
    body: { email: 'test@example.com', password: 'wrongpassword' },
    assertions: [
      { type: 'status', expected: 401 }
    ]
  }
];

// Run tests
console.log('--- Running API Tests ---\n');

(async () => {
  for (const testCase of testCases) {
    const result = await api.runTest(testCase);
    const status = result.passed ? '✓' : '✗';
    console.log(`${status} ${result.name} (${result.duration}ms)`);
  }

  // Generate report
  const report = api.generateReport();
  console.log('\n--- Test Report ---');
  console.log(`Total: ${report.summary.total}`);
  console.log(`Passed: ${report.summary.passed}`);
  console.log(`Failed: ${report.summary.failed}`);
  console.log(`Pass Rate: ${report.summary.passRate}`);

  // Performance testing
  console.log('\n--- Performance Test ---\n');
  const perfTester = new APIPerformanceTester('https://api.example.com');
  const perfResults = await perfTester.runLoadTest({
    endpoint: '/users',
    method: 'GET',
    concurrentUsers: 5,
    requestsPerUser: 20
  });

  console.log('Load Test Results:');
  console.log(`  Total Requests: ${perfResults.totalRequests}`);
  console.log(`  Success Rate: ${perfResults.successRate}`);
  console.log(`  Avg Response Time: ${perfResults.responseTime.avg}ms`);
  console.log(`  P95 Response Time: ${perfResults.responseTime.p95}ms`);
  console.log(`  Throughput: ${perfResults.throughput}`);

  // Security testing
  console.log('\n--- Security Test ---\n');
  const secTester = new APISecurityTester('https://api.example.com');
  const secResults = await secTester.runSecurityTests('/users');
  const secReport = secTester.generateSecurityReport(secResults);

  console.log('Security Report:');
  console.log(`  Security Score: ${secReport.securityScore}`);
  console.log(`  Vulnerabilities: ${secReport.vulnerabilitiesFound}`);
  if (secReport.findings.length > 0) {
    console.log('  Findings:');
    secReport.findings.forEach(f => {
      console.log(`    - ${f.test}: ${f.recommendation}`);
    });
  }
})();

/**
 * API Testing Best Practices:
 *
 * 1. Test all HTTP methods and status codes
 * 2. Validate response schemas and contracts
 * 3. Test authentication and authorization
 * 4. Include performance and load testing
 * 5. Test error handling and edge cases
 * 6. Validate input handling and sanitization
 * 7. Test rate limiting and throttling
 * 8. Automate tests in CI/CD pipelines
 * 9. Use contract testing for microservices
 * 10. Monitor API performance in production
 */
