/**
 * Stub (Test Double) - Providing Predetermined Responses
 *
 * A stub is a type of test double that provides simplified implementations
 * to replace real dependencies during testing. Stubs simulate the behavior
 * of actual system components by returning predetermined responses, allowing
 * tests to focus on the logic being examined.
 *
 * Key Concepts:
 * - Predetermined responses
 * - State-based testing
 * - Isolation from dependencies
 * - Predictable test scenarios
 */

/**
 * Stub creates a stubbed version of an object or function.
 */
class Stub {
    constructor(target, methodName) {
        this.target = target;
        this.methodName = methodName;
        this.originalMethod = target ? target[methodName] : null;
        this.returnValue = undefined;
        this.returnValues = [];
        this.throwError = null;
        this.callCount = 0;
        this.implementation = null;

        if (target) {
            this.install();
        }
    }

    /**
     * Installs the stub on the target
     */
    install() {
        const stub = this;

        this.target[this.methodName] = function(...args) {
            stub.callCount++;

            if (stub.throwError) {
                throw stub.throwError;
            }

            if (stub.implementation) {
                return stub.implementation.apply(this, args);
            }

            if (stub.returnValues.length > 0) {
                const index = Math.min(stub.callCount - 1, stub.returnValues.length - 1);
                return stub.returnValues[index];
            }

            return stub.returnValue;
        };
    }

    /**
     * Restores the original method
     */
    restore() {
        if (this.target && this.originalMethod) {
            this.target[this.methodName] = this.originalMethod;
        }
    }

    /**
     * Sets the return value
     * @param {*} value - Value to return
     * @returns {Stub} This stub for chaining
     */
    returns(value) {
        this.returnValue = value;
        return this;
    }

    /**
     * Sets sequential return values
     * @param {...*} values - Values to return sequentially
     * @returns {Stub} This stub for chaining
     */
    returnsSequence(...values) {
        this.returnValues = values;
        return this;
    }

    /**
     * Configures stub to throw an error
     * @param {Error} error - Error to throw
     * @returns {Stub} This stub for chaining
     */
    throws(error) {
        this.throwError = error instanceof Error ? error : new Error(error);
        return this;
    }

    /**
     * Sets a custom implementation
     * @param {Function} fn - Custom function
     * @returns {Stub} This stub for chaining
     */
    callsFake(fn) {
        this.implementation = fn;
        return this;
    }

    /**
     * Resets the stub
     */
    reset() {
        this.callCount = 0;
        this.returnValue = undefined;
        this.returnValues = [];
        this.throwError = null;
        this.implementation = null;
    }
}

/**
 * StubFactory provides convenient stub creation.
 */
class StubFactory {
    constructor() {
        this.stubs = [];
    }

    /**
     * Creates a stub on an object method
     * @param {Object} target - Target object
     * @param {string} methodName - Method to stub
     * @returns {Stub} The stub
     */
    stub(target, methodName) {
        const stub = new Stub(target, methodName);
        this.stubs.push(stub);
        return stub;
    }

    /**
     * Creates a standalone stub function
     * @param {string} name - Stub name
     * @returns {Function} Stub function
     */
    createStub(name = 'stub') {
        let returnValue;
        let returnValues = [];
        let throwError = null;
        let callCount = 0;
        let implementation = null;

        const stubFn = function(...args) {
            callCount++;

            if (throwError) {
                throw throwError;
            }

            if (implementation) {
                return implementation.apply(this, args);
            }

            if (returnValues.length > 0) {
                const index = Math.min(callCount - 1, returnValues.length - 1);
                return returnValues[index];
            }

            return returnValue;
        };

        stubFn.name = name;
        stubFn.returns = (value) => { returnValue = value; return stubFn; };
        stubFn.returnsSequence = (...values) => { returnValues = values; return stubFn; };
        stubFn.throws = (error) => { throwError = error instanceof Error ? error : new Error(error); return stubFn; };
        stubFn.callsFake = (fn) => { implementation = fn; return stubFn; };
        stubFn.getCallCount = () => callCount;
        stubFn.reset = () => { callCount = 0; returnValue = undefined; returnValues = []; throwError = null; };

        return stubFn;
    }

    /**
     * Restores all stubs
     */
    restoreAll() {
        this.stubs.forEach(stub => stub.restore());
        this.stubs = [];
    }
}

/**
 * CommonStubPatterns provides common stubbing scenarios.
 */
class CommonStubPatterns {
    /**
     * Creates an API client stub
     * @returns {Object} Stubbed API client
     */
    static createApiClientStub() {
        return {
            get: new StubFactory().createStub('get').returns({ status: 200, data: {} }),
            post: new StubFactory().createStub('post').returns({ status: 201, data: { id: 1 } }),
            put: new StubFactory().createStub('put').returns({ status: 200, data: {} }),
            delete: new StubFactory().createStub('delete').returns({ status: 204 })
        };
    }

    /**
     * Creates a database stub
     * @returns {Object} Stubbed database
     */
    static createDatabaseStub() {
        return {
            query: new StubFactory().createStub('query').returns([]),
            insert: new StubFactory().createStub('insert').returns({ insertedId: 1 }),
            update: new StubFactory().createStub('update').returns({ modifiedCount: 1 }),
            delete: new StubFactory().createStub('delete').returns({ deletedCount: 1 }),
            findOne: new StubFactory().createStub('findOne').returns(null),
            findMany: new StubFactory().createStub('findMany').returns([])
        };
    }

    /**
     * Creates a file system stub
     * @returns {Object} Stubbed file system
     */
    static createFileSystemStub() {
        return {
            readFile: new StubFactory().createStub('readFile').returns('file content'),
            writeFile: new StubFactory().createStub('writeFile').returns(undefined),
            exists: new StubFactory().createStub('exists').returns(true),
            mkdir: new StubFactory().createStub('mkdir').returns(undefined),
            readdir: new StubFactory().createStub('readdir').returns([])
        };
    }

    /**
     * Creates a logger stub
     * @returns {Object} Stubbed logger
     */
    static createLoggerStub() {
        return {
            info: new StubFactory().createStub('info').returns(undefined),
            warn: new StubFactory().createStub('warn').returns(undefined),
            error: new StubFactory().createStub('error').returns(undefined),
            debug: new StubFactory().createStub('debug').returns(undefined)
        };
    }
}

/**
 * StubUseCases demonstrates when to use stubs.
 */
class StubUseCases {
    static useCases = {
        externalApi: {
            name: 'External API',
            description: 'Stub external services to avoid network calls',
            benefits: ['Faster tests', 'No network dependency', 'Predictable responses'],
            example: `
const api = createApiClientStub();
api.get.returns({ status: 200, data: { user: 'test' } });
const result = await userService.getUser(1);
expect(result.user).toBe('test');`
        },
        database: {
            name: 'Database Operations',
            description: 'Stub database to avoid actual data operations',
            benefits: ['No test data cleanup', 'Faster tests', 'Isolated tests'],
            example: `
const db = createDatabaseStub();
db.findOne.returns({ id: 1, name: 'Test User' });
const user = await repository.findById(1);
expect(user.name).toBe('Test User');`
        },
        filesystem: {
            name: 'File System',
            description: 'Stub file operations to avoid actual I/O',
            benefits: ['No file cleanup', 'Consistent behavior', 'Cross-platform'],
            example: `
const fs = createFileSystemStub();
fs.readFile.returns('config content');
const config = configLoader.load('config.json');
expect(config).toBeDefined();`
        },
        errorScenarios: {
            name: 'Error Scenarios',
            description: 'Stub to simulate error conditions',
            benefits: ['Test error handling', 'Simulate failures', 'Edge cases'],
            example: `
const api = createApiClientStub();
api.get.throws(new Error('Network error'));
await expect(service.fetchData()).rejects.toThrow('Network error');`
        },
        timeDependent: {
            name: 'Time-Dependent Logic',
            description: 'Stub time functions for deterministic tests',
            benefits: ['Predictable time', 'Test time-based logic', 'No waiting'],
            example: `
const dateStub = stub(Date, 'now').returns(1609459200000);
const result = scheduler.isExpired(token);
expect(result).toBe(true);
dateStub.restore();`
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
 * StubVsMock explains the difference between stubs and mocks.
 */
class StubVsMock {
    /**
     * Gets comparison
     * @returns {Object} Comparison
     */
    static getComparison() {
        return {
            stub: {
                purpose: 'Provide predetermined responses',
                verification: 'State-based (check result)',
                setup: 'Configure return values',
                example: 'Stub returns user data, test checks processing'
            },
            mock: {
                purpose: 'Verify interactions occurred',
                verification: 'Behavior-based (check calls)',
                setup: 'Set expectations',
                example: 'Mock expects save() called with specific data'
            },
            whenToUse: {
                useStub: [
                    'Testing transformation logic',
                    'Need predictable external data',
                    'Testing different scenarios (success/error)',
                    'Dont care how dependency was called'
                ],
                useMock: [
                    'Verifying side effects occurred',
                    'Testing notification/event systems',
                    'Ensuring specific interactions happen',
                    'Testing protocol compliance'
                ]
            }
        };
    }
}

/**
 * StubBestPractices provides guidance.
 */
class StubBestPractices {
    /**
     * Gets best practices
     * @returns {Array} Best practices
     */
    static getPractices() {
        return [
            {
                practice: 'Stub at the boundary',
                description: 'Stub external dependencies, not internal code',
                example: 'Stub API client, not internal service methods'
            },
            {
                practice: 'Keep stubs simple',
                description: 'Return minimal data needed for the test',
                example: 'Only include fields the test actually uses'
            },
            {
                practice: 'Use realistic data',
                description: 'Return data that resembles production',
                example: 'Use realistic user objects, not just { id: 1 }'
            },
            {
                practice: 'Test error scenarios',
                description: 'Stub errors to test error handling',
                example: 'stub.throws(new NetworkError())'
            },
            {
                practice: 'Restore after tests',
                description: 'Always restore original methods',
                example: 'afterEach(() => stubFactory.restoreAll())'
            },
            {
                practice: 'Dont stub what you own',
                description: 'Prefer real implementations for your code',
                example: 'Use real utility functions, stub external calls'
            }
        ];
    }
}

// Demonstration
console.log('=== Stub Test Double Demo ===\n');

// Basic stub usage
console.log('--- Basic Stub Usage ---');
const mathService = {
    calculate: function(x) { return x * 2; }
};

const factory = new StubFactory();
const calcStub = factory.stub(mathService, 'calculate');
calcStub.returns(42);

console.log('Original would return x*2, stub returns:', mathService.calculate(5));
calcStub.restore();
console.log('After restore:', mathService.calculate(5));

// Sequential returns
console.log('\n--- Sequential Returns ---');
const sequenceStub = factory.createStub('sequence');
sequenceStub.returnsSequence(1, 2, 3, 3);

console.log('Call 1:', sequenceStub());
console.log('Call 2:', sequenceStub());
console.log('Call 3:', sequenceStub());
console.log('Call 4:', sequenceStub()); // Returns last value

// Error simulation
console.log('\n--- Error Simulation ---');
const errorStub = factory.createStub('errorTest');
errorStub.throws(new Error('Simulated error'));

try {
    errorStub();
} catch (e) {
    console.log('Caught error:', e.message);
}

// Common stub patterns
console.log('\n--- Common Stub Patterns ---');
const apiClient = CommonStubPatterns.createApiClientStub();
apiClient.get.returns({ status: 200, data: { users: ['Alice', 'Bob'] } });

console.log('API stub response:', apiClient.get('/users'));

const dbStub = CommonStubPatterns.createDatabaseStub();
dbStub.findOne.returns({ id: 1, name: 'Test User', email: 'test@example.com' });

console.log('DB stub response:', dbStub.findOne({ id: 1 }));

// Use cases
console.log('\n--- Stub Use Cases ---');
StubUseCases.getAllUseCases().slice(0, 3).forEach(useCase => {
    console.log(`\n${useCase.name}: ${useCase.description}`);
    console.log(`  Benefits: ${useCase.benefits.slice(0, 2).join(', ')}`);
});

// Stub vs Mock
console.log('\n--- Stub vs Mock ---');
const comparison = StubVsMock.getComparison();
console.log('Stub purpose:', comparison.stub.purpose);
console.log('Mock purpose:', comparison.mock.purpose);
console.log('Use stub when:', comparison.whenToUse.useStub.slice(0, 2));

// Best practices
console.log('\n--- Best Practices ---');
StubBestPractices.getPractices().slice(0, 3).forEach(practice => {
    console.log(`${practice.practice}: ${practice.description}`);
});

// Cleanup
factory.restoreAll();
console.log('\n--- Cleanup ---');
console.log('All stubs restored');

/**
 * Best Practices for Using Stub Test Doubles:
 *
 * 1. Stub at system boundaries (APIs, databases)
 * 2. Keep stub responses simple and focused
 * 3. Use realistic data in stub responses
 * 4. Always restore stubs after tests
 * 5. Test both success and error scenarios
 * 6. Dont stub internal implementation details
 * 7. Use factories for common stub patterns
 * 8. Document why stubbing is necessary
 * 9. Prefer stubs over mocks for state testing
 * 10. Keep test isolation in mind
 */
