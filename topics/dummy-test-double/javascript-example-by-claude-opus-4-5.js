/**
 * Dummy (Test Double) - Simple Placeholder Objects
 *
 * A dummy is a type of test double that serves as a simple placeholder object.
 * Dummies are never actually used during test execution - they exist only to
 * fulfill parameter requirements when the actual implementation is irrelevant
 * to the test scenario.
 *
 * Key Characteristics:
 * - Contains no logic whatsoever
 * - Never actually called or used during tests
 * - Purely passive placeholders
 * - Simplest form of test double
 */

/**
 * Dummy creates simple placeholder objects for testing.
 * Factory for generating dummy instances of various types.
 */
class Dummy {
    /**
     * Creates a dummy object with no-op methods
     * @param {string} name - Optional name for identification
     * @returns {Object} Dummy object
     */
    static create(name = 'dummy') {
        return {
            __isDummy: true,
            __name: name,
            toString: () => `[Dummy: ${name}]`
        };
    }

    /**
     * Creates a dummy that mimics a specific interface
     * @param {Array<string>} methods - Method names to include
     * @param {string} name - Optional name
     * @returns {Object} Dummy with no-op methods
     */
    static withMethods(methods, name = 'dummy') {
        const dummy = this.create(name);

        for (const method of methods) {
            dummy[method] = () => {
                // No-op: dummies should never be called
                // If called, it indicates a test setup issue
            };
        }

        return dummy;
    }

    /**
     * Creates a dummy that throws if used
     * @param {string} name - Optional name
     * @returns {Proxy} Dummy that throws on any property access
     */
    static strict(name = 'strict-dummy') {
        return new Proxy({}, {
            get(target, prop) {
                if (prop === '__isDummy') return true;
                if (prop === '__name') return name;
                if (prop === 'toString') return () => `[StrictDummy: ${name}]`;

                throw new Error(
                    `Dummy "${name}" was accessed (property: ${String(prop)}). ` +
                    `Dummies should not be used - check your test setup.`
                );
            }
        });
    }

    /**
     * Creates a null dummy (just null)
     * @returns {null}
     */
    static null() {
        return null;
    }

    /**
     * Creates an undefined dummy
     * @returns {undefined}
     */
    static undefined() {
        return undefined;
    }

    /**
     * Creates a dummy class instance
     * @param {Function} ClassRef - Class to instantiate
     * @returns {Object} Instance with all methods as no-ops
     */
    static fromClass(ClassRef) {
        const methodNames = Object.getOwnPropertyNames(ClassRef.prototype)
            .filter(name => name !== 'constructor');

        return this.withMethods(methodNames, ClassRef.name);
    }
}

/**
 * DummyFactory provides typed dummy creation for common use cases.
 * Creates appropriately structured dummy objects.
 */
class DummyFactory {
    /**
     * Creates a dummy user object
     * @returns {Object} Dummy user
     */
    static user() {
        return {
            __isDummy: true,
            id: 0,
            name: 'Dummy User',
            email: 'dummy@example.com'
        };
    }

    /**
     * Creates a dummy request object
     * @returns {Object} Dummy request
     */
    static request() {
        return {
            __isDummy: true,
            method: 'GET',
            url: '/dummy',
            headers: {},
            body: null
        };
    }

    /**
     * Creates a dummy response object
     * @returns {Object} Dummy response
     */
    static response() {
        return {
            __isDummy: true,
            status: () => {},
            json: () => {},
            send: () => {},
            end: () => {}
        };
    }

    /**
     * Creates a dummy logger
     * @returns {Object} Dummy logger with no-op methods
     */
    static logger() {
        return {
            __isDummy: true,
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {},
            log: () => {}
        };
    }

    /**
     * Creates a dummy configuration object
     * @returns {Object} Dummy config
     */
    static config() {
        return {
            __isDummy: true,
            get: () => undefined,
            set: () => {},
            has: () => false
        };
    }

    /**
     * Creates a dummy event emitter
     * @returns {Object} Dummy event emitter
     */
    static eventEmitter() {
        return {
            __isDummy: true,
            on: () => {},
            off: () => {},
            emit: () => {},
            once: () => {},
            removeListener: () => {}
        };
    }

    /**
     * Creates a dummy database connection
     * @returns {Object} Dummy database
     */
    static database() {
        return {
            __isDummy: true,
            query: () => Promise.resolve([]),
            execute: () => Promise.resolve(),
            connect: () => Promise.resolve(),
            disconnect: () => Promise.resolve()
        };
    }
}

/**
 * ServiceWithDependencies demonstrates using dummies in tests.
 * This class requires multiple dependencies that may be dummied.
 */
class ServiceWithDependencies {
    constructor(database, logger, config) {
        this.database = database;
        this.logger = logger;
        this.config = config;
    }

    /**
     * Main business method that uses all dependencies
     * @param {string} userId - User ID to process
     * @returns {Promise<Object>} Processing result
     */
    async processUser(userId) {
        this.logger.info(`Processing user: ${userId}`);

        const user = await this.database.query(`SELECT * FROM users WHERE id = ?`, [userId]);

        const timeout = this.config.get('processingTimeout');

        return {
            processed: true,
            userId,
            timestamp: new Date().toISOString()
        };
    }
}

/**
 * TestHelper provides utilities for working with dummies in tests.
 * Assists with dummy verification and identification.
 */
class TestHelper {
    /**
     * Checks if an object is a dummy
     * @param {*} obj - Object to check
     * @returns {boolean} True if dummy
     */
    static isDummy(obj) {
        return obj && obj.__isDummy === true;
    }

    /**
     * Gets the dummy name if available
     * @param {*} obj - Object to check
     * @returns {string|null} Dummy name or null
     */
    static getDummyName(obj) {
        return obj && obj.__name || null;
    }

    /**
     * Creates test context with dummies for unneeded dependencies
     * @param {Object} realDependencies - Dependencies to use
     * @param {Object} dummyDefaults - Default dummy factories
     * @returns {Object} Mixed context
     */
    static createTestContext(realDependencies, dummyDefaults) {
        const context = {};

        for (const [key, factory] of Object.entries(dummyDefaults)) {
            context[key] = realDependencies[key] || factory();
        }

        return context;
    }
}

/**
 * Example demonstrating when to use dummies vs other test doubles.
 * Clarifies the distinction between different test double types.
 */
class TestDoubleComparison {
    /**
     * Demonstrates dummy usage - parameter is required but unused
     * @param {Object} user - Required user parameter
     * @param {Object} logger - Logger (unused in this method)
     * @returns {boolean} Validation result
     */
    static validateUserFormat(user, logger) {
        // Logger is required by interface but not used in this validation
        // A dummy is perfect here - we don't care about logging behavior
        return user && typeof user.email === 'string' && user.email.includes('@');
    }

    /**
     * Demonstrates when NOT to use a dummy - stub is needed
     * @param {Object} user - User to save
     * @param {Object} database - Database connection (actively used)
     * @returns {Promise<Object>} Saved user
     */
    static async saveUser(user, database) {
        // Database is actively used - need a stub or mock, not a dummy
        // A dummy would fail here because we call database.query()
        return database.query('INSERT INTO users ...', [user]);
    }

    /**
     * Explains when each test double type is appropriate
     * @returns {Object} Guide to test double selection
     */
    static getUsageGuide() {
        return {
            dummy: {
                when: 'Parameter required but never used',
                example: 'Third parameter in a method you\'re not testing',
                behavior: 'Contains no logic, just fills a slot'
            },
            stub: {
                when: 'Need to return specific values',
                example: 'Database returning test data',
                behavior: 'Returns predefined responses'
            },
            mock: {
                when: 'Need to verify interactions',
                example: 'Verify email service was called',
                behavior: 'Records calls and allows assertions'
            },
            spy: {
                when: 'Need to watch real implementation',
                example: 'Track calls to real function',
                behavior: 'Wraps real object, records calls'
            },
            fake: {
                when: 'Need working but simplified implementation',
                example: 'In-memory database for testing',
                behavior: 'Functional but simpler than production'
            }
        };
    }
}

// Demonstration
console.log('=== Dummy Test Double Demo ===\n');

// Basic dummy creation
console.log('--- Basic Dummies ---');
const basicDummy = Dummy.create('myDummy');
console.log(`Created: ${basicDummy}`);
console.log(`Is dummy: ${TestHelper.isDummy(basicDummy)}`);

// Dummy with methods
console.log('\n--- Dummy with Methods ---');
const serviceDummy = Dummy.withMethods(['connect', 'disconnect', 'query'], 'dbService');
console.log(`Created service dummy: ${serviceDummy}`);
console.log(`Has query method: ${typeof serviceDummy.query === 'function'}`);

// Strict dummy that throws if used
console.log('\n--- Strict Dummy ---');
const strictDummy = Dummy.strict('strictService');
console.log(`Created strict dummy`);
try {
    strictDummy.someMethod(); // This would throw
} catch (e) {
    console.log(`Caught expected error: ${e.message}`);
}

// Factory dummies
console.log('\n--- Factory Dummies ---');
const dummyUser = DummyFactory.user();
const dummyLogger = DummyFactory.logger();
const dummyConfig = DummyFactory.config();
console.log(`User dummy: ${JSON.stringify(dummyUser)}`);
console.log(`Logger dummy: ${typeof dummyLogger.info}`);

// Using dummies in actual tests
console.log('\n--- Using Dummies in Tests ---');

// Test validateUserFormat - logger is not used, so we use a dummy
const validUser = { email: 'test@example.com' };
const result = TestDoubleComparison.validateUserFormat(
    validUser,
    DummyFactory.logger() // Dummy is perfect here - logger isn't used
);
console.log(`Validation result: ${result}`);

// Create test context
console.log('\n--- Test Context with Dummies ---');
const context = TestHelper.createTestContext(
    { database: { query: () => 'real query' } }, // Real dependency
    {
        database: DummyFactory.database,
        logger: DummyFactory.logger,
        config: DummyFactory.config
    }
);
console.log(`Context has real database: ${!TestHelper.isDummy(context.database)}`);
console.log(`Context has dummy logger: ${TestHelper.isDummy(context.logger)}`);

// Usage guide
console.log('\n--- Test Double Selection Guide ---');
const guide = TestDoubleComparison.getUsageGuide();
console.log('Dummy: ' + guide.dummy.when);
console.log('Stub: ' + guide.stub.when);
console.log('Mock: ' + guide.mock.when);

/**
 * Best Practices for Dummy Test Doubles:
 *
 * 1. Use dummies only for parameters that are truly unused
 * 2. Consider strict dummies to catch accidental usage
 * 3. Name dummies clearly to identify them in debugging
 * 4. Use factory methods for consistent dummy creation
 * 5. If a dummy gets used, upgrade to stub or mock
 * 6. Keep dummies as simple as possible
 * 7. Document why a parameter can be a dummy
 * 8. Verify test setup if dummies start getting called
 * 9. Use typed dummy factories for common objects
 * 10. Prefer null/undefined over complex dummies when appropriate
 */
