/**
 * Mock (Test Double) - Behavior Verification Testing
 *
 * A mock is a test double that provides a simulated implementation with
 * predefined expectations about how it should be used. Unlike stubs that
 * simply return values, mocks verify behavior by checking which methods
 * were called, how many times, with what parameters, and in what order.
 *
 * Key Concepts:
 * - Behavior verification vs state verification
 * - Setting expectations before test execution
 * - Verifying interactions after execution
 * - Isolating code from external dependencies
 */

/**
 * MockExpectation represents an expected interaction with a mock.
 * Defines what method call is expected and how to respond.
 */
class MockExpectation {
    constructor(methodName) {
        this.methodName = methodName;
        this.expectedArgs = null;
        this.returnValue = undefined;
        this.throwError = null;
        this.expectedCallCount = 1;
        this.actualCallCount = 0;
        this.callOrder = null;
        this.callback = null;
    }

    /**
     * Sets expected arguments
     * @param {...*} args - Expected arguments
     * @returns {MockExpectation} This expectation for chaining
     */
    withArgs(...args) {
        this.expectedArgs = args;
        return this;
    }

    /**
     * Sets return value
     * @param {*} value - Value to return
     * @returns {MockExpectation} This expectation for chaining
     */
    returns(value) {
        this.returnValue = value;
        return this;
    }

    /**
     * Sets error to throw
     * @param {Error} error - Error to throw
     * @returns {MockExpectation} This expectation for chaining
     */
    throws(error) {
        this.throwError = error;
        return this;
    }

    /**
     * Sets expected call count
     * @param {number} count - Expected number of calls
     * @returns {MockExpectation} This expectation for chaining
     */
    times(count) {
        this.expectedCallCount = count;
        return this;
    }

    /**
     * Specifies this should be called once
     * @returns {MockExpectation} This expectation for chaining
     */
    once() {
        return this.times(1);
    }

    /**
     * Specifies this should be called twice
     * @returns {MockExpectation} This expectation for chaining
     */
    twice() {
        return this.times(2);
    }

    /**
     * Specifies this should never be called
     * @returns {MockExpectation} This expectation for chaining
     */
    never() {
        return this.times(0);
    }

    /**
     * Sets a callback to execute
     * @param {Function} fn - Callback function
     * @returns {MockExpectation} This expectation for chaining
     */
    callsFake(fn) {
        this.callback = fn;
        return this;
    }

    /**
     * Records a call to this expectation
     * @param {Array} actualArgs - Actual arguments received
     * @returns {*} Return value or throws error
     */
    recordCall(actualArgs) {
        this.actualCallCount++;

        if (this.throwError) {
            throw this.throwError;
        }

        if (this.callback) {
            return this.callback(...actualArgs);
        }

        return this.returnValue;
    }

    /**
     * Checks if arguments match expectation
     * @param {Array} actualArgs - Actual arguments
     * @returns {boolean} True if match
     */
    matchesArgs(actualArgs) {
        if (this.expectedArgs === null) return true;

        if (this.expectedArgs.length !== actualArgs.length) return false;

        return this.expectedArgs.every((expected, i) => {
            if (expected === MockMatcher.any) return true;
            if (typeof expected === 'function' && expected.isMatcher) {
                return expected(actualArgs[i]);
            }
            return JSON.stringify(expected) === JSON.stringify(actualArgs[i]);
        });
    }

    /**
     * Verifies the expectation was met
     * @returns {Object} Verification result
     */
    verify() {
        const passed = this.actualCallCount === this.expectedCallCount;

        return {
            method: this.methodName,
            passed,
            expected: this.expectedCallCount,
            actual: this.actualCallCount,
            message: passed
                ? `${this.methodName} called ${this.actualCallCount} times as expected`
                : `Expected ${this.methodName} to be called ${this.expectedCallCount} times, but was called ${this.actualCallCount} times`
        };
    }
}

/**
 * MockMatcher provides argument matching utilities.
 * Allows flexible matching in expectations.
 */
class MockMatcher {
    static any = Symbol('any');

    /**
     * Creates a matcher that accepts any value
     * @returns {Symbol} Any matcher
     */
    static anything() {
        return this.any;
    }

    /**
     * Creates a type matcher
     * @param {string} typeName - Expected type
     * @returns {Function} Matcher function
     */
    static typeOf(typeName) {
        const matcher = (value) => typeof value === typeName;
        matcher.isMatcher = true;
        matcher.description = `typeOf(${typeName})`;
        return matcher;
    }

    /**
     * Creates a matcher for objects containing properties
     * @param {Object} partial - Partial object to match
     * @returns {Function} Matcher function
     */
    static objectContaining(partial) {
        const matcher = (value) => {
            if (typeof value !== 'object') return false;
            return Object.entries(partial).every(([key, val]) => value[key] === val);
        };
        matcher.isMatcher = true;
        matcher.description = `objectContaining(${JSON.stringify(partial)})`;
        return matcher;
    }

    /**
     * Creates a matcher for arrays containing elements
     * @param {Array} elements - Elements to find
     * @returns {Function} Matcher function
     */
    static arrayContaining(elements) {
        const matcher = (value) => {
            if (!Array.isArray(value)) return false;
            return elements.every(el => value.includes(el));
        };
        matcher.isMatcher = true;
        matcher.description = `arrayContaining(${JSON.stringify(elements)})`;
        return matcher;
    }

    /**
     * Creates a regex matcher for strings
     * @param {RegExp} pattern - Pattern to match
     * @returns {Function} Matcher function
     */
    static stringMatching(pattern) {
        const matcher = (value) => pattern.test(value);
        matcher.isMatcher = true;
        matcher.description = `stringMatching(${pattern})`;
        return matcher;
    }
}

/**
 * Mock creates a mock object with verification capabilities.
 * Tracks all interactions for verification.
 */
class Mock {
    constructor(name = 'mock') {
        this.name = name;
        this.expectations = [];
        this.calls = [];
        this.methods = new Map();
    }

    /**
     * Sets up an expectation for a method
     * @param {string} methodName - Method name
     * @returns {MockExpectation} Expectation for chaining
     */
    expects(methodName) {
        const expectation = new MockExpectation(methodName);
        this.expectations.push(expectation);

        // Create the mock method if it doesn't exist
        if (!this.methods.has(methodName)) {
            this[methodName] = (...args) => this.handleCall(methodName, args);
            this.methods.set(methodName, true);
        }

        return expectation;
    }

    /**
     * Handles a call to a mocked method
     * @param {string} methodName - Called method
     * @param {Array} args - Call arguments
     * @returns {*} Return value from expectation
     */
    handleCall(methodName, args) {
        // Record the call
        this.calls.push({
            method: methodName,
            args,
            timestamp: new Date()
        });

        // Find matching expectation
        const expectation = this.expectations.find(e =>
            e.methodName === methodName && e.matchesArgs(args)
        );

        if (expectation) {
            return expectation.recordCall(args);
        }

        // No expectation found - could throw or return undefined
        console.warn(`Unexpected call to ${this.name}.${methodName}`);
        return undefined;
    }

    /**
     * Verifies all expectations were met
     * @returns {Object} Verification result
     */
    verify() {
        const results = this.expectations.map(e => e.verify());
        const allPassed = results.every(r => r.passed);

        return {
            mock: this.name,
            passed: allPassed,
            expectations: results,
            totalCalls: this.calls.length
        };
    }

    /**
     * Gets all recorded calls
     * @param {string} methodName - Optional method filter
     * @returns {Array} Recorded calls
     */
    getCalls(methodName = null) {
        if (methodName) {
            return this.calls.filter(c => c.method === methodName);
        }
        return this.calls;
    }

    /**
     * Checks if a method was called
     * @param {string} methodName - Method name
     * @returns {boolean} True if called
     */
    wasCalled(methodName) {
        return this.calls.some(c => c.method === methodName);
    }

    /**
     * Gets call count for a method
     * @param {string} methodName - Method name
     * @returns {number} Call count
     */
    callCount(methodName) {
        return this.getCalls(methodName).length;
    }

    /**
     * Resets the mock
     */
    reset() {
        this.expectations = [];
        this.calls = [];
    }
}

/**
 * MockFactory creates mocks for common patterns.
 * Provides shortcuts for typical testing scenarios.
 */
class MockFactory {
    /**
     * Creates a mock from an interface definition
     * @param {Object} interfaceDef - Interface with method names
     * @param {string} name - Mock name
     * @returns {Mock} Created mock
     */
    static fromInterface(interfaceDef, name = 'mock') {
        const mock = new Mock(name);

        for (const methodName of Object.keys(interfaceDef)) {
            mock[methodName] = (...args) => mock.handleCall(methodName, args);
            mock.methods.set(methodName, true);
        }

        return mock;
    }

    /**
     * Creates a spy that wraps a real object
     * @param {Object} realObject - Object to spy on
     * @param {string} methodName - Method to spy on
     * @returns {Object} Spy wrapper
     */
    static createSpy(realObject, methodName) {
        const originalMethod = realObject[methodName];
        const calls = [];

        realObject[methodName] = function(...args) {
            calls.push({ args, timestamp: new Date() });
            return originalMethod.apply(this, args);
        };

        return {
            getCalls: () => calls,
            callCount: () => calls.length,
            restore: () => {
                realObject[methodName] = originalMethod;
            }
        };
    }

    /**
     * Creates a stub (simplified mock without verification)
     * @param {Object} methods - Methods with return values
     * @returns {Object} Stub object
     */
    static createStub(methods) {
        const stub = {};

        for (const [name, value] of Object.entries(methods)) {
            if (typeof value === 'function') {
                stub[name] = value;
            } else {
                stub[name] = () => value;
            }
        }

        return stub;
    }
}

/**
 * MockVerifier provides additional verification utilities.
 */
class MockVerifier {
    /**
     * Verifies call order across multiple mocks
     * @param {Array} expectedOrder - Expected call order [{mock, method}, ...]
     * @param {Array} mocks - Mocks to check
     * @returns {Object} Verification result
     */
    static verifyOrder(expectedOrder, mocks) {
        // Collect all calls with timestamps
        const allCalls = [];
        for (const mock of mocks) {
            for (const call of mock.calls) {
                allCalls.push({
                    mock: mock.name,
                    method: call.method,
                    timestamp: call.timestamp
                });
            }
        }

        // Sort by timestamp
        allCalls.sort((a, b) => a.timestamp - b.timestamp);

        // Check order matches
        let orderIndex = 0;
        for (const call of allCalls) {
            if (orderIndex < expectedOrder.length) {
                const expected = expectedOrder[orderIndex];
                if (call.mock === expected.mock && call.method === expected.method) {
                    orderIndex++;
                }
            }
        }

        const passed = orderIndex === expectedOrder.length;

        return {
            passed,
            message: passed
                ? 'Call order verified'
                : `Expected order not found. Found: ${allCalls.map(c => `${c.mock}.${c.method}`).join(' -> ')}`
        };
    }
}

// Demonstration
console.log('=== Mock Test Double Demo ===\n');

// Create a mock for a payment service
const paymentMock = new Mock('PaymentService');

// Set up expectations
paymentMock.expects('processPayment')
    .withArgs(MockMatcher.objectContaining({ amount: 100 }))
    .returns({ success: true, transactionId: 'TX123' })
    .once();

paymentMock.expects('refund')
    .withArgs('TX123')
    .returns({ success: true })
    .never(); // Should not be called

console.log('--- Setting Up Mock ---');
console.log('Expected: processPayment to be called once with amount: 100');
console.log('Expected: refund to never be called');

// Simulate code under test calling the mock
console.log('\n--- Executing Test ---');
const result = paymentMock.processPayment({ amount: 100, currency: 'USD' });
console.log('processPayment result:', result);

// Verify expectations
console.log('\n--- Verification ---');
const verification = paymentMock.verify();
console.log('Verification passed:', verification.passed);
verification.expectations.forEach(e => {
    console.log(`  ${e.method}: ${e.message}`);
});

// Demonstrate matchers
console.log('\n--- Argument Matchers ---');
const apiMock = new Mock('APIClient');

apiMock.expects('get')
    .withArgs(MockMatcher.stringMatching(/^\/api\//))
    .returns({ data: 'test' });

apiMock.expects('post')
    .withArgs(MockMatcher.anything(), MockMatcher.typeOf('object'))
    .returns({ created: true });

console.log('GET /api/users:', apiMock.get('/api/users'));
console.log('POST /api/items:', apiMock.post('/api/items', { name: 'item' }));

// Factory usage
console.log('\n--- Mock Factory ---');
const emailService = MockFactory.fromInterface({
    send: null,
    validate: null
}, 'EmailService');

emailService.expects('send')
    .withArgs(MockMatcher.objectContaining({ to: 'test@example.com' }))
    .returns(true);

emailService.send({ to: 'test@example.com', subject: 'Hello' });
console.log('Email mock calls:', emailService.callCount('send'));

// Stub example
console.log('\n--- Stub Example ---');
const configStub = MockFactory.createStub({
    getApiKey: 'test-api-key',
    getTimeout: 5000,
    isEnabled: () => true
});

console.log('Stub values:', {
    apiKey: configStub.getApiKey(),
    timeout: configStub.getTimeout(),
    enabled: configStub.isEnabled()
});

/**
 * Best Practices for Using Mocks:
 *
 * 1. Mock external dependencies, not internal implementation
 * 2. Don't over-mock - prefer real objects when practical
 * 3. Verify behavior, not implementation details
 * 4. Keep mock setup close to test assertions
 * 5. Use descriptive mock names for clarity
 * 6. Reset mocks between tests
 * 7. Prefer stubs for simple value returns
 * 8. Use mocks when verifying interactions
 * 9. Avoid mocking what you don't own
 * 10. Consider test maintainability vs mock complexity
 */
