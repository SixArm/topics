/**
 * Test Double - Replacing Dependencies for Isolated Testing
 *
 * A test double is a simplified implementation used in software testing to
 * replace a real dependency, enabling faster, more reliable, and isolated tests.
 * Test doubles can serve as stand-ins for external systems, databases, or complex
 * objects that would otherwise make testing difficult or slow.
 *
 * Key Concepts:
 * - Dummy: Fills parameters, never used
 * - Fake: Working but simplified implementation
 * - Stub: Predetermined responses
 * - Spy: Records call information
 * - Mock: Pre-programmed expectations
 */

/**
 * TestDoubleType describes different types of test doubles.
 */
class TestDoubleType {
    static types = {
        dummy: {
            name: 'Dummy',
            description: 'Simplest test double with no implementation',
            purpose: 'Fill parameter lists or satisfy interface requirements',
            verification: 'None - never actually used',
            example: 'Passed to functions but never called',
            useWhen: 'You need to satisfy a parameter but dont care about its behavior'
        },
        fake: {
            name: 'Fake',
            description: 'Working but simplified implementation',
            purpose: 'Provide actual functionality without full complexity',
            verification: 'State-based - check the resulting state',
            example: 'In-memory database instead of real database',
            useWhen: 'You need working behavior but simpler than production'
        },
        stub: {
            name: 'Stub',
            description: 'Provides predetermined responses',
            purpose: 'Control what the dependency returns',
            verification: 'State-based - check how SUT responds to controlled inputs',
            example: 'API stub that returns fixed user data',
            useWhen: 'You want to test how your code handles specific responses'
        },
        spy: {
            name: 'Spy',
            description: 'Records information about calls',
            purpose: 'Observe how the dependency was used',
            verification: 'Behavior-based - check what methods were called',
            example: 'Tracking which methods were called and with what arguments',
            useWhen: 'You need to verify interactions while using real behavior'
        },
        mock: {
            name: 'Mock',
            description: 'Pre-programmed with expectations',
            purpose: 'Verify expected interactions occur',
            verification: 'Behavior-based - fails if expectations not met',
            example: 'Mock that expects save() to be called exactly once',
            useWhen: 'You need to verify specific interactions happened correctly'
        }
    };

    /**
     * Gets type by name
     * @param {string} name - Type name
     * @returns {Object} Type details
     */
    static getType(name) {
        return this.types[name];
    }

    /**
     * Gets all types
     * @returns {Array} All types
     */
    static getAllTypes() {
        return Object.entries(this.types).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }

    /**
     * Recommends type based on needs
     * @param {Object} needs - Testing needs
     * @returns {string} Recommended type
     */
    static recommend(needs) {
        if (needs.verifyInteractions) return 'mock';
        if (needs.trackCalls) return 'spy';
        if (needs.controlResponses) return 'stub';
        if (needs.simplifiedImplementation) return 'fake';
        return 'dummy';
    }
}

/**
 * Dummy implementation - does nothing.
 */
class Dummy {
    constructor(interfaceSpec = {}) {
        // Create methods that do nothing
        for (const method of Object.keys(interfaceSpec)) {
            this[method] = () => undefined;
        }
    }

    /**
     * Creates a dummy with specified methods
     * @param {Array} methods - Method names
     * @returns {Object} Dummy object
     */
    static create(methods = []) {
        const dummy = {};
        methods.forEach(method => {
            dummy[method] = () => undefined;
        });
        return dummy;
    }
}

/**
 * Fake implementation - simplified but working.
 */
class FakeDatabase {
    constructor() {
        this.storage = new Map();
        this.autoId = 1;
    }

    /**
     * Inserts a record
     * @param {string} collection - Collection name
     * @param {Object} record - Record to insert
     * @returns {Object} Inserted record with ID
     */
    insert(collection, record) {
        if (!this.storage.has(collection)) {
            this.storage.set(collection, new Map());
        }
        const id = this.autoId++;
        const recordWithId = { id, ...record };
        this.storage.get(collection).set(id, recordWithId);
        return recordWithId;
    }

    /**
     * Finds a record by ID
     * @param {string} collection - Collection name
     * @param {number} id - Record ID
     * @returns {Object|null} Record or null
     */
    findById(collection, id) {
        const coll = this.storage.get(collection);
        return coll ? coll.get(id) || null : null;
    }

    /**
     * Finds all records matching criteria
     * @param {string} collection - Collection name
     * @param {Object} criteria - Search criteria
     * @returns {Array} Matching records
     */
    find(collection, criteria = {}) {
        const coll = this.storage.get(collection);
        if (!coll) return [];

        return Array.from(coll.values()).filter(record => {
            return Object.entries(criteria).every(([key, value]) =>
                record[key] === value
            );
        });
    }

    /**
     * Updates a record
     * @param {string} collection - Collection name
     * @param {number} id - Record ID
     * @param {Object} updates - Updates to apply
     * @returns {Object|null} Updated record or null
     */
    update(collection, id, updates) {
        const coll = this.storage.get(collection);
        if (!coll || !coll.has(id)) return null;

        const record = { ...coll.get(id), ...updates };
        coll.set(id, record);
        return record;
    }

    /**
     * Deletes a record
     * @param {string} collection - Collection name
     * @param {number} id - Record ID
     * @returns {boolean} Whether deletion succeeded
     */
    delete(collection, id) {
        const coll = this.storage.get(collection);
        return coll ? coll.delete(id) : false;
    }

    /**
     * Clears all data
     */
    clear() {
        this.storage.clear();
        this.autoId = 1;
    }
}

/**
 * Stub implementation - predetermined responses.
 */
class Stub {
    constructor() {
        this.responses = new Map();
        this.defaultResponse = undefined;
    }

    /**
     * Sets response for a method
     * @param {string} method - Method name
     * @param {*} response - Response to return
     * @returns {Stub} This for chaining
     */
    when(method) {
        const stub = this;
        return {
            thenReturn(response) {
                stub.responses.set(method, { type: 'value', value: response });
                return stub;
            },
            thenThrow(error) {
                stub.responses.set(method, { type: 'error', value: error });
                return stub;
            },
            thenCall(fn) {
                stub.responses.set(method, { type: 'function', value: fn });
                return stub;
            }
        };
    }

    /**
     * Gets response for method call
     * @param {string} method - Method name
     * @param {...*} args - Arguments
     * @returns {*} Configured response
     */
    call(method, ...args) {
        const response = this.responses.get(method);
        if (!response) return this.defaultResponse;

        switch (response.type) {
            case 'value':
                return response.value;
            case 'error':
                throw response.value instanceof Error
                    ? response.value
                    : new Error(response.value);
            case 'function':
                return response.value(...args);
            default:
                return this.defaultResponse;
        }
    }

    /**
     * Creates stubbed object
     * @param {Array} methods - Method names
     * @returns {Object} Stubbed object
     */
    createObject(methods) {
        const obj = {};
        methods.forEach(method => {
            obj[method] = (...args) => this.call(method, ...args);
        });
        return obj;
    }
}

/**
 * Spy implementation - records calls.
 */
class Spy {
    constructor(target = null, method = null) {
        this.calls = [];
        this.target = target;
        this.method = method;
        this.original = target && method ? target[method] : null;

        if (target && method) {
            this.install();
        }
    }

    /**
     * Installs spy on target
     */
    install() {
        const spy = this;
        const original = this.original;

        this.target[this.method] = function(...args) {
            spy.recordCall(args, this);
            if (original) {
                const result = original.apply(this, args);
                spy.calls[spy.calls.length - 1].returned = result;
                return result;
            }
        };
    }

    /**
     * Records a call
     * @param {Array} args - Call arguments
     * @param {Object} context - Call context
     */
    recordCall(args, context) {
        this.calls.push({
            args,
            context,
            timestamp: new Date(),
            returned: undefined
        });
    }

    /**
     * Gets call count
     * @returns {number} Number of calls
     */
    getCallCount() {
        return this.calls.length;
    }

    /**
     * Checks if called
     * @returns {boolean} Whether called
     */
    wasCalled() {
        return this.calls.length > 0;
    }

    /**
     * Checks if called with specific args
     * @param {...*} expectedArgs - Expected arguments
     * @returns {boolean} Whether called with args
     */
    wasCalledWith(...expectedArgs) {
        return this.calls.some(call =>
            JSON.stringify(call.args) === JSON.stringify(expectedArgs)
        );
    }

    /**
     * Gets call at index
     * @param {number} index - Call index
     * @returns {Object} Call details
     */
    getCall(index) {
        return this.calls[index];
    }

    /**
     * Gets last call
     * @returns {Object} Last call details
     */
    getLastCall() {
        return this.calls[this.calls.length - 1];
    }

    /**
     * Restores original method
     */
    restore() {
        if (this.target && this.method && this.original) {
            this.target[this.method] = this.original;
        }
    }

    /**
     * Resets call history
     */
    reset() {
        this.calls = [];
    }
}

/**
 * Mock implementation - verifiable expectations.
 */
class Mock {
    constructor() {
        this.expectations = [];
        this.calls = [];
    }

    /**
     * Sets expectation for method call
     * @param {string} method - Method name
     * @returns {Object} Expectation builder
     */
    expects(method) {
        const mock = this;
        const expectation = {
            method,
            times: 1,
            args: null,
            returnValue: undefined
        };

        return {
            once() {
                expectation.times = 1;
                return this;
            },
            twice() {
                expectation.times = 2;
                return this;
            },
            times(n) {
                expectation.times = n;
                return this;
            },
            withArgs(...args) {
                expectation.args = args;
                return this;
            },
            returns(value) {
                expectation.returnValue = value;
                mock.expectations.push(expectation);
                return mock;
            }
        };
    }

    /**
     * Calls the mock method
     * @param {string} method - Method name
     * @param {...*} args - Arguments
     * @returns {*} Return value
     */
    call(method, ...args) {
        this.calls.push({ method, args, timestamp: new Date() });

        const expectation = this.expectations.find(e =>
            e.method === method &&
            (e.args === null || JSON.stringify(e.args) === JSON.stringify(args))
        );

        return expectation ? expectation.returnValue : undefined;
    }

    /**
     * Creates mock object
     * @param {Array} methods - Method names
     * @returns {Object} Mock object
     */
    createObject(methods) {
        const obj = {};
        methods.forEach(method => {
            obj[method] = (...args) => this.call(method, ...args);
        });
        return obj;
    }

    /**
     * Verifies all expectations were met
     * @returns {Object} Verification result
     */
    verify() {
        const results = [];
        let allPassed = true;

        for (const expectation of this.expectations) {
            const matchingCalls = this.calls.filter(call =>
                call.method === expectation.method &&
                (expectation.args === null ||
                    JSON.stringify(call.args) === JSON.stringify(expectation.args))
            );

            const passed = matchingCalls.length === expectation.times;
            if (!passed) allPassed = false;

            results.push({
                method: expectation.method,
                expected: expectation.times,
                actual: matchingCalls.length,
                args: expectation.args,
                passed
            });
        }

        return {
            passed: allPassed,
            expectations: results
        };
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
 * TestDoubleFactory creates test doubles easily.
 */
class TestDoubleFactory {
    /**
     * Creates a dummy
     * @param {Array} methods - Method names
     * @returns {Object} Dummy
     */
    static createDummy(methods) {
        return Dummy.create(methods);
    }

    /**
     * Creates a fake database
     * @returns {FakeDatabase} Fake database
     */
    static createFakeDatabase() {
        return new FakeDatabase();
    }

    /**
     * Creates a stub
     * @returns {Stub} Stub
     */
    static createStub() {
        return new Stub();
    }

    /**
     * Creates a spy
     * @param {Object} target - Target object
     * @param {string} method - Method to spy on
     * @returns {Spy} Spy
     */
    static createSpy(target = null, method = null) {
        return new Spy(target, method);
    }

    /**
     * Creates a mock
     * @returns {Mock} Mock
     */
    static createMock() {
        return new Mock();
    }
}

// Demonstration
console.log('=== Test Double Demo ===\n');

// Test double types
console.log('--- Test Double Types ---');
TestDoubleType.getAllTypes().forEach(type => {
    console.log(`\n${type.name}: ${type.description}`);
    console.log(`  Purpose: ${type.purpose}`);
});

// Dummy example
console.log('\n--- Dummy Example ---');
const loggerDummy = Dummy.create(['info', 'warn', 'error']);
console.log('Logger dummy:', Object.keys(loggerDummy));
loggerDummy.info('This does nothing'); // No output

// Fake example
console.log('\n--- Fake Database Example ---');
const fakeDb = new FakeDatabase();
const user1 = fakeDb.insert('users', { name: 'Alice', email: 'alice@test.com' });
const user2 = fakeDb.insert('users', { name: 'Bob', email: 'bob@test.com' });
console.log('Inserted:', user1);
console.log('Find by ID:', fakeDb.findById('users', 1));
console.log('Find all:', fakeDb.find('users'));

// Stub example
console.log('\n--- Stub Example ---');
const apiStub = new Stub();
apiStub.when('getUser').thenReturn({ id: 1, name: 'Test User' });
apiStub.when('saveUser').thenCall((user) => ({ ...user, id: Date.now() }));
apiStub.when('deleteUser').thenThrow(new Error('Not authorized'));

const api = apiStub.createObject(['getUser', 'saveUser', 'deleteUser']);
console.log('getUser:', api.getUser(1));
console.log('saveUser:', api.saveUser({ name: 'New User' }));
try {
    api.deleteUser(1);
} catch (e) {
    console.log('deleteUser error:', e.message);
}

// Spy example
console.log('\n--- Spy Example ---');
const calculator = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b
};
const addSpy = new Spy(calculator, 'add');
console.log('Result:', calculator.add(2, 3));
console.log('Result:', calculator.add(5, 7));
console.log('Call count:', addSpy.getCallCount());
console.log('Was called with (2, 3):', addSpy.wasCalledWith(2, 3));
console.log('Last call:', addSpy.getLastCall());
addSpy.restore();

// Mock example
console.log('\n--- Mock Example ---');
const emailMock = new Mock();
emailMock.expects('send').once().withArgs('user@test.com', 'Hello').returns(true);
emailMock.expects('connect').once().returns(true);

const emailService = emailMock.createObject(['send', 'connect']);
emailService.connect();
emailService.send('user@test.com', 'Hello');

console.log('Verification:', emailMock.verify());

// Recommendation
console.log('\n--- Type Recommendation ---');
console.log('For verifying interactions:', TestDoubleType.recommend({ verifyInteractions: true }));
console.log('For tracking calls:', TestDoubleType.recommend({ trackCalls: true }));
console.log('For controlling responses:', TestDoubleType.recommend({ controlResponses: true }));

/**
 * Best Practices for Test Doubles:
 *
 * 1. Choose the simplest double that meets your needs
 * 2. Use dummies only for unused parameters
 * 3. Use fakes for integration-style tests
 * 4. Use stubs to control indirect inputs
 * 5. Use spies to observe interactions
 * 6. Use mocks to verify critical interactions
 * 7. Don't over-mock - test behavior, not implementation
 * 8. Keep test doubles simple and focused
 * 9. Restore/reset doubles after each test
 * 10. Document the purpose of each test double
 */
