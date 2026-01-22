/**
 * Spy (Test Double) - Monitoring Behavior During Tests
 *
 * A spy is a type of test double that monitors behavior during test execution.
 * Unlike other test doubles that completely replace dependencies, a spy can
 * wrap around a real component, allowing actual method calls to proceed while
 * capturing detailed information about how those methods were invoked.
 *
 * Key Concepts:
 * - Behavior monitoring and recording
 * - Call tracking (parameters, frequency)
 * - Wrapping real implementations
 * - Interaction verification
 */

/**
 * Spy wraps an object and records method calls.
 */
class Spy {
    constructor(target, methodName) {
        this.target = target;
        this.methodName = methodName;
        this.calls = [];
        this.originalMethod = target[methodName];
        this.returnValue = undefined;
        this.callThrough = true;

        this.install();
    }

    /**
     * Installs the spy on the target
     */
    install() {
        const spy = this;

        this.target[this.methodName] = function(...args) {
            const callInfo = {
                args: args,
                timestamp: new Date(),
                callNumber: spy.calls.length + 1,
                context: this
            };

            let result;
            if (spy.callThrough && spy.originalMethod) {
                try {
                    result = spy.originalMethod.apply(this, args);
                    callInfo.returned = result;
                } catch (error) {
                    callInfo.threw = error;
                    throw error;
                }
            } else if (spy.returnValue !== undefined) {
                result = spy.returnValue;
                callInfo.returned = result;
            }

            spy.calls.push(callInfo);
            return result;
        };
    }

    /**
     * Restores the original method
     */
    restore() {
        this.target[this.methodName] = this.originalMethod;
    }

    /**
     * Configures spy to return a specific value
     * @param {*} value - Value to return
     * @returns {Spy} This spy for chaining
     */
    andReturn(value) {
        this.returnValue = value;
        this.callThrough = false;
        return this;
    }

    /**
     * Configures spy to call through to original
     * @returns {Spy} This spy for chaining
     */
    andCallThrough() {
        this.callThrough = true;
        return this;
    }

    /**
     * Checks if spy was called
     * @returns {boolean} Was called
     */
    wasCalled() {
        return this.calls.length > 0;
    }

    /**
     * Gets the number of calls
     * @returns {number} Call count
     */
    callCount() {
        return this.calls.length;
    }

    /**
     * Gets call by index
     * @param {number} index - Call index
     * @returns {Object} Call info
     */
    getCall(index) {
        return this.calls[index];
    }

    /**
     * Gets the most recent call
     * @returns {Object} Call info
     */
    mostRecentCall() {
        return this.calls[this.calls.length - 1];
    }

    /**
     * Gets the first call
     * @returns {Object} Call info
     */
    firstCall() {
        return this.calls[0];
    }

    /**
     * Checks if called with specific arguments
     * @param {...*} expectedArgs - Expected arguments
     * @returns {boolean} Match found
     */
    wasCalledWith(...expectedArgs) {
        return this.calls.some(call =>
            this.argsMatch(call.args, expectedArgs)
        );
    }

    /**
     * Checks argument equality
     * @param {Array} actual - Actual arguments
     * @param {Array} expected - Expected arguments
     * @returns {boolean} Match
     */
    argsMatch(actual, expected) {
        if (actual.length !== expected.length) return false;
        return actual.every((arg, i) => {
            if (expected[i] === undefined) return true; // Wildcard
            return JSON.stringify(arg) === JSON.stringify(expected[i]);
        });
    }

    /**
     * Resets the spy
     */
    reset() {
        this.calls = [];
    }

    /**
     * Gets spy summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            methodName: this.methodName,
            callCount: this.calls.length,
            wasCalled: this.wasCalled(),
            callsThrough: this.callThrough,
            calls: this.calls.map(c => ({
                args: c.args,
                returned: c.returned
            }))
        };
    }
}

/**
 * SpyFactory creates spies conveniently.
 */
class SpyFactory {
    constructor() {
        this.spies = [];
    }

    /**
     * Creates a spy on an object method
     * @param {Object} target - Target object
     * @param {string} methodName - Method to spy on
     * @returns {Spy} The spy
     */
    spyOn(target, methodName) {
        const spy = new Spy(target, methodName);
        this.spies.push(spy);
        return spy;
    }

    /**
     * Creates a standalone spy function
     * @param {string} name - Spy name
     * @returns {Function} Spy function
     */
    createSpy(name = 'spy') {
        const calls = [];
        let returnValue;

        const spyFn = function(...args) {
            const callInfo = {
                args,
                timestamp: new Date(),
                callNumber: calls.length + 1
            };
            calls.push(callInfo);
            callInfo.returned = returnValue;
            return returnValue;
        };

        spyFn.calls = calls;
        spyFn.name = name;
        spyFn.wasCalled = () => calls.length > 0;
        spyFn.callCount = () => calls.length;
        spyFn.andReturn = (value) => { returnValue = value; return spyFn; };
        spyFn.reset = () => { calls.length = 0; };
        spyFn.mostRecentCall = () => calls[calls.length - 1];

        return spyFn;
    }

    /**
     * Restores all spies
     */
    restoreAll() {
        this.spies.forEach(spy => spy.restore());
        this.spies = [];
    }
}

/**
 * SpyAssertions provides spy verification methods.
 */
class SpyAssertions {
    /**
     * Asserts spy was called
     * @param {Spy} spy - Spy to check
     * @returns {Object} Assertion result
     */
    static toHaveBeenCalled(spy) {
        const passed = spy.wasCalled();
        return {
            passed,
            message: passed
                ? `Expected ${spy.methodName} not to have been called`
                : `Expected ${spy.methodName} to have been called`
        };
    }

    /**
     * Asserts spy was called specific times
     * @param {Spy} spy - Spy to check
     * @param {number} times - Expected call count
     * @returns {Object} Assertion result
     */
    static toHaveBeenCalledTimes(spy, times) {
        const actual = spy.callCount();
        const passed = actual === times;
        return {
            passed,
            message: passed
                ? `Expected ${spy.methodName} not to have been called ${times} times`
                : `Expected ${spy.methodName} to have been called ${times} times but was called ${actual} times`
        };
    }

    /**
     * Asserts spy was called with arguments
     * @param {Spy} spy - Spy to check
     * @param {...*} args - Expected arguments
     * @returns {Object} Assertion result
     */
    static toHaveBeenCalledWith(spy, ...args) {
        const passed = spy.wasCalledWith(...args);
        return {
            passed,
            message: passed
                ? `Expected ${spy.methodName} not to have been called with ${JSON.stringify(args)}`
                : `Expected ${spy.methodName} to have been called with ${JSON.stringify(args)}`
        };
    }
}

/**
 * SpyUseCases demonstrates common spy use cases.
 */
class SpyUseCases {
    static useCases = {
        eventHandling: {
            name: 'Event Handler Verification',
            description: 'Verify event handlers are called correctly',
            example: `
const handler = spyFactory.createSpy('clickHandler');
button.addEventListener('click', handler);
button.click();
expect(handler.wasCalled()).toBe(true);`
        },
        callback: {
            name: 'Callback Verification',
            description: 'Verify callbacks are invoked with correct arguments',
            example: `
const callback = spyFactory.createSpy('callback');
asyncFunction(callback);
await wait();
expect(callback.wasCalledWith(expectedResult)).toBe(true);`
        },
        methodOrder: {
            name: 'Method Call Order',
            description: 'Verify methods are called in correct sequence',
            example: `
const spy1 = factory.spyOn(obj, 'method1');
const spy2 = factory.spyOn(obj, 'method2');
workflow.execute();
expect(spy1.firstCall().timestamp < spy2.firstCall().timestamp).toBe(true);`
        },
        partialMocking: {
            name: 'Partial Mocking',
            description: 'Spy on real implementation while monitoring',
            example: `
const spy = factory.spyOn(service, 'calculate').andCallThrough();
const result = service.calculate(5);
expect(result).toBe(25);
expect(spy.wasCalled()).toBe(true);`
        }
    };

    /**
     * Gets use case by name
     * @param {string} name - Use case name
     * @returns {Object} Use case
     */
    static getUseCase(name) {
        return this.useCases[name];
    }

    /**
     * Gets all use cases
     * @returns {Array} All use cases
     */
    static getAllUseCases() {
        return Object.entries(this.useCases).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * SpyBestPractices provides guidance.
 */
class SpyBestPractices {
    /**
     * Gets best practices
     * @returns {Array} Best practices
     */
    static getPractices() {
        return [
            {
                practice: 'Always restore spies after tests',
                reason: 'Prevent test pollution',
                example: 'afterEach(() => spyFactory.restoreAll())'
            },
            {
                practice: 'Prefer call-through for integration tests',
                reason: 'Tests real behavior while monitoring',
                example: 'spy.andCallThrough()'
            },
            {
                practice: 'Dont over-spy',
                reason: 'Too many spies make tests brittle',
                example: 'Only spy on what you need to verify'
            },
            {
                practice: 'Use descriptive spy names',
                reason: 'Makes test failures clearer',
                example: 'createSpy("onUserLogin")'
            },
            {
                practice: 'Reset spies between test cases',
                reason: 'Ensure clean state for each test',
                example: 'beforeEach(() => spy.reset())'
            }
        ];
    }

    /**
     * Gets when to use spies vs other doubles
     * @returns {Object} Guidance
     */
    static getWhenToUse() {
        return {
            useSpy: [
                'When you need to verify method was called',
                'When you need to capture call arguments',
                'When you want to observe without changing behavior',
                'When testing callbacks or event handlers'
            ],
            useMock: [
                'When you need to set expectations before test',
                'When verification is part of test assertion'
            ],
            useStub: [
                'When you just need to return specific values',
                'When you dont care about how its called'
            ]
        };
    }
}

// Demonstration
console.log('=== Spy Test Double Demo ===\n');

// Basic spy usage
console.log('--- Basic Spy Usage ---');
const calculator = {
    add: function(a, b) { return a + b; },
    multiply: function(a, b) { return a * b; }
};

const factory = new SpyFactory();
const addSpy = factory.spyOn(calculator, 'add').andCallThrough();

// Call the method
const result1 = calculator.add(2, 3);
const result2 = calculator.add(5, 7);

console.log('Results:', result1, result2);
console.log('Spy Summary:', addSpy.getSummary());

// Spy assertions
console.log('\n--- Spy Assertions ---');
console.log('Was called:', SpyAssertions.toHaveBeenCalled(addSpy));
console.log('Called times:', SpyAssertions.toHaveBeenCalledTimes(addSpy, 2));
console.log('Called with:', SpyAssertions.toHaveBeenCalledWith(addSpy, 2, 3));

// Standalone spy function
console.log('\n--- Standalone Spy Function ---');
const callback = factory.createSpy('onComplete');
callback.andReturn('success');

// Simulate async operation calling callback
callback('result1');
callback('result2');

console.log('Callback was called:', callback.wasCalled());
console.log('Call count:', callback.callCount());
console.log('Most recent call:', callback.mostRecentCall());

// Use cases
console.log('\n--- Spy Use Cases ---');
SpyUseCases.getAllUseCases().slice(0, 3).forEach(useCase => {
    console.log(`\n${useCase.name}: ${useCase.description}`);
});

// Best practices
console.log('\n--- Best Practices ---');
SpyBestPractices.getPractices().slice(0, 3).forEach(practice => {
    console.log(`${practice.practice}: ${practice.reason}`);
});

// When to use
console.log('\n--- When to Use Spies ---');
const guidance = SpyBestPractices.getWhenToUse();
console.log('Use Spy when:', guidance.useSpy.slice(0, 2));
console.log('Use Mock when:', guidance.useMock.slice(0, 1));

// Cleanup
factory.restoreAll();
console.log('\n--- Cleanup ---');
console.log('All spies restored');

/**
 * Best Practices for Using Spy Test Doubles:
 *
 * 1. Always restore spies after tests
 * 2. Use call-through to test real behavior
 * 3. Verify only what matters for the test
 * 4. Use descriptive spy names
 * 5. Reset spies between test cases
 * 6. Avoid over-reliance on interaction testing
 * 7. Combine with state verification
 * 8. Keep spy assertions simple
 * 9. Use factory pattern for spy management
 * 10. Document why spying is necessary
 */
