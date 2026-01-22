/**
 * Checkpoint - Verification Points in Test Automation
 *
 * A checkpoint is a verification point where an automated test script pauses
 * to compare actual results with expected outcomes. Checkpoints serve as
 * quality gates that determine whether a test should continue or fail based
 * on predefined criteria.
 *
 * Key Concepts:
 * - Hard Checkpoints: Cause immediate test failure when conditions aren't met
 * - Soft Checkpoints: Log errors but allow test execution to continue
 * - Text Checkpoints: Verify specific text appears correctly
 * - Image Checkpoints: Compare visual elements like buttons or screens
 * - Database Checkpoints: Validate data integrity
 */

/**
 * Checkpoint represents a single verification point in a test.
 * Contains the expected value, actual value, and comparison logic.
 */
class Checkpoint {
    constructor(options) {
        this.name = options.name;
        this.type = options.type || 'soft';
        this.description = options.description || '';
        this.expected = options.expected;
        this.comparator = options.comparator || 'equals';
        this.timeout = options.timeout || 5000;
        this.captureScreenshot = options.captureScreenshot || false;
    }

    /**
     * Executes the checkpoint verification
     * @param {*} actual - The actual value to verify
     * @returns {Object} Checkpoint result
     */
    verify(actual) {
        const result = {
            name: this.name,
            type: this.type,
            expected: this.expected,
            actual,
            passed: false,
            message: '',
            timestamp: new Date().toISOString()
        };

        // Perform comparison based on comparator type
        switch (this.comparator) {
            case 'equals':
                result.passed = actual === this.expected;
                result.message = result.passed
                    ? 'Values match exactly'
                    : `Expected "${this.expected}" but got "${actual}"`;
                break;

            case 'contains':
                result.passed = String(actual).includes(this.expected);
                result.message = result.passed
                    ? `Value contains "${this.expected}"`
                    : `Value does not contain "${this.expected}"`;
                break;

            case 'regex':
                const regex = new RegExp(this.expected);
                result.passed = regex.test(actual);
                result.message = result.passed
                    ? `Value matches pattern "${this.expected}"`
                    : `Value does not match pattern "${this.expected}"`;
                break;

            case 'greaterThan':
                result.passed = actual > this.expected;
                result.message = result.passed
                    ? `${actual} > ${this.expected}`
                    : `${actual} is not greater than ${this.expected}`;
                break;

            case 'lessThan':
                result.passed = actual < this.expected;
                result.message = result.passed
                    ? `${actual} < ${this.expected}`
                    : `${actual} is not less than ${this.expected}`;
                break;

            case 'exists':
                result.passed = actual !== null && actual !== undefined;
                result.message = result.passed
                    ? 'Value exists'
                    : 'Value does not exist';
                break;

            default:
                result.passed = actual === this.expected;
                result.message = 'Default equality comparison';
        }

        console.log(`  ${result.passed ? '✓' : '✗'} ${this.name}: ${result.message}`);
        return result;
    }
}

/**
 * TextCheckpoint verifies text content on screen or in responses.
 * Useful for validating labels, messages, and displayed data.
 */
class TextCheckpoint extends Checkpoint {
    constructor(options) {
        super({ ...options, type: options.type || 'soft' });
        this.caseSensitive = options.caseSensitive !== false;
        this.trimWhitespace = options.trimWhitespace !== false;
    }

    /**
     * Verifies text content with optional preprocessing
     * @param {string} actual - Actual text to verify
     * @returns {Object} Verification result
     */
    verify(actual) {
        let processedActual = actual;
        let processedExpected = this.expected;

        if (this.trimWhitespace) {
            processedActual = String(processedActual).trim();
            processedExpected = String(processedExpected).trim();
        }

        if (!this.caseSensitive) {
            processedActual = processedActual.toLowerCase();
            processedExpected = processedExpected.toLowerCase();
        }

        const result = super.verify(processedActual);
        result.preprocessing = {
            caseSensitive: this.caseSensitive,
            trimWhitespace: this.trimWhitespace
        };

        return result;
    }
}

/**
 * ImageCheckpoint compares visual elements using image comparison.
 * Supports tolerance levels for minor visual differences.
 */
class ImageCheckpoint extends Checkpoint {
    constructor(options) {
        super({ ...options, captureScreenshot: true });
        this.tolerance = options.tolerance || 0.05; // 5% tolerance by default
        this.region = options.region || null; // Specific region to compare
        this.ignoreColors = options.ignoreColors || false;
    }

    /**
     * Compares images with configurable tolerance
     * @param {Object} actualImage - Actual image data
     * @returns {Object} Comparison result
     */
    verify(actualImage) {
        console.log(`  Comparing images for: ${this.name}`);
        console.log(`    Tolerance: ${this.tolerance * 100}%`);

        if (this.region) {
            console.log(`    Region: ${JSON.stringify(this.region)}`);
        }

        // Simulated image comparison
        const similarity = this.calculateSimilarity(actualImage);
        const result = {
            name: this.name,
            type: this.type,
            passed: similarity >= (1 - this.tolerance),
            similarity: `${(similarity * 100).toFixed(2)}%`,
            tolerance: `${this.tolerance * 100}%`,
            message: '',
            timestamp: new Date().toISOString()
        };

        result.message = result.passed
            ? `Images match within tolerance (${result.similarity} similarity)`
            : `Images differ beyond tolerance (${result.similarity} similarity)`;

        console.log(`  ${result.passed ? '✓' : '✗'} ${this.name}: ${result.message}`);
        return result;
    }

    /**
     * Calculates similarity between expected and actual images (simulated)
     * @param {Object} actualImage - Actual image data
     * @returns {number} Similarity score between 0 and 1
     */
    calculateSimilarity(actualImage) {
        // Simulated - real implementation would use pixel comparison
        return 0.97; // 97% similarity
    }
}

/**
 * DatabaseCheckpoint validates data in database tables.
 * Useful for verifying data integrity and state changes.
 */
class DatabaseCheckpoint extends Checkpoint {
    constructor(options) {
        super(options);
        this.query = options.query;
        this.database = options.database;
        this.expectedRows = options.expectedRows;
    }

    /**
     * Executes query and verifies results
     * @param {Object} connection - Database connection
     * @returns {Promise<Object>} Verification result
     */
    async verify(connection) {
        console.log(`  Executing database checkpoint: ${this.name}`);
        console.log(`    Query: ${this.query}`);

        // Simulated query execution
        const queryResult = await this.executeQuery(connection);

        const result = {
            name: this.name,
            type: this.type,
            query: this.query,
            passed: false,
            message: '',
            rowCount: queryResult.length,
            timestamp: new Date().toISOString()
        };

        // Verify row count if specified
        if (this.expectedRows !== undefined) {
            result.passed = queryResult.length === this.expectedRows;
            result.message = result.passed
                ? `Row count matches: ${queryResult.length}`
                : `Expected ${this.expectedRows} rows but got ${queryResult.length}`;
        } else {
            // Verify data content
            result.passed = this.verifyData(queryResult);
            result.message = result.passed
                ? 'Data verification passed'
                : 'Data verification failed';
        }

        console.log(`  ${result.passed ? '✓' : '✗'} ${this.name}: ${result.message}`);
        return result;
    }

    /**
     * Executes database query (simulated)
     * @param {Object} connection - Database connection
     * @returns {Array} Query results
     */
    async executeQuery(connection) {
        // Simulated query execution
        return [{ id: 1, status: 'active' }];
    }

    /**
     * Verifies data content matches expectations
     * @param {Array} data - Query results
     * @returns {boolean} True if data matches
     */
    verifyData(data) {
        if (!this.expected) return true;
        return JSON.stringify(data) === JSON.stringify(this.expected);
    }
}

/**
 * CheckpointManager orchestrates multiple checkpoints in a test.
 * Handles both hard and soft checkpoint failures appropriately.
 */
class CheckpointManager {
    constructor() {
        this.checkpoints = [];
        this.results = [];
        this.screenshots = [];
    }

    /**
     * Adds a checkpoint to the manager
     * @param {Checkpoint} checkpoint - Checkpoint to add
     */
    addCheckpoint(checkpoint) {
        this.checkpoints.push(checkpoint);
    }

    /**
     * Creates and adds a quick verification checkpoint
     * @param {string} name - Checkpoint name
     * @param {*} expected - Expected value
     * @param {*} actual - Actual value
     * @param {string} type - Checkpoint type (hard/soft)
     * @returns {Object} Checkpoint result
     */
    verify(name, expected, actual, type = 'soft') {
        const checkpoint = new Checkpoint({
            name,
            expected,
            type
        });

        this.checkpoints.push(checkpoint);
        const result = checkpoint.verify(actual);
        this.results.push(result);

        // Hard checkpoint failure throws exception
        if (!result.passed && type === 'hard') {
            throw new CheckpointFailureError(name, expected, actual);
        }

        return result;
    }

    /**
     * Executes all registered checkpoints
     * @param {Object} context - Test context with actual values
     * @returns {Object} Summary of all checkpoint results
     */
    async executeAll(context) {
        console.log('\nExecuting checkpoints...');

        for (const checkpoint of this.checkpoints) {
            const actualValue = context[checkpoint.name] || context;

            try {
                const result = await checkpoint.verify(actualValue);
                this.results.push(result);

                if (checkpoint.captureScreenshot) {
                    this.screenshots.push({
                        checkpoint: checkpoint.name,
                        timestamp: new Date().toISOString()
                    });
                }

                // Stop on hard checkpoint failure
                if (!result.passed && checkpoint.type === 'hard') {
                    throw new CheckpointFailureError(
                        checkpoint.name,
                        checkpoint.expected,
                        actualValue
                    );
                }
            } catch (error) {
                if (error instanceof CheckpointFailureError) {
                    throw error;
                }
                this.results.push({
                    name: checkpoint.name,
                    passed: false,
                    error: error.message
                });
            }
        }

        return this.getSummary();
    }

    /**
     * Gets a summary of all checkpoint results
     * @returns {Object} Summary statistics and details
     */
    getSummary() {
        const passed = this.results.filter(r => r.passed).length;
        const failed = this.results.filter(r => !r.passed).length;

        return {
            total: this.results.length,
            passed,
            failed,
            passRate: `${((passed / this.results.length) * 100).toFixed(1)}%`,
            allPassed: failed === 0,
            results: this.results,
            screenshots: this.screenshots
        };
    }

    /**
     * Generates a detailed report of checkpoint results
     * @returns {string} Formatted report
     */
    generateReport() {
        const summary = this.getSummary();
        let report = '\n=== Checkpoint Report ===\n';
        report += `Total: ${summary.total} | Passed: ${summary.passed} | Failed: ${summary.failed}\n`;
        report += `Pass Rate: ${summary.passRate}\n\n`;

        this.results.forEach((result, index) => {
            report += `${index + 1}. ${result.passed ? '✓' : '✗'} ${result.name}\n`;
            report += `   ${result.message}\n`;
            if (!result.passed) {
                report += `   Expected: ${result.expected}\n`;
                report += `   Actual: ${result.actual}\n`;
            }
        });

        return report;
    }
}

/**
 * Custom error for checkpoint failures
 */
class CheckpointFailureError extends Error {
    constructor(checkpointName, expected, actual) {
        super(`Hard checkpoint failed: ${checkpointName}`);
        this.name = 'CheckpointFailureError';
        this.checkpoint = checkpointName;
        this.expected = expected;
        this.actual = actual;
    }
}

// Demonstration
console.log('=== Checkpoint Demo ===\n');

// Create checkpoint manager
const manager = new CheckpointManager();

// Example: Testing a user registration flow
console.log('Testing User Registration Flow\n');

// Soft checkpoint - page title
manager.verify('Page Title', 'Registration', 'Registration', 'soft');

// Soft checkpoint - form field exists
manager.verify('Username Field Exists', true, true, 'soft');

// Hard checkpoint - critical validation
try {
    manager.verify('Email Format Valid', true, true, 'hard');
} catch (e) {
    console.log('Hard checkpoint would stop execution');
}

// Text checkpoint
const textCheckpoint = new TextCheckpoint({
    name: 'Welcome Message',
    expected: 'Welcome to our site',
    comparator: 'contains',
    caseSensitive: false
});
console.log('\nText Checkpoint:');
textCheckpoint.verify('WELCOME TO OUR SITE!');

// Image checkpoint
const imageCheckpoint = new ImageCheckpoint({
    name: 'Logo Display',
    expected: 'baseline-logo.png',
    tolerance: 0.1
});
console.log('\nImage Checkpoint:');
imageCheckpoint.verify({ src: 'current-logo.png' });

// Database checkpoint
const dbCheckpoint = new DatabaseCheckpoint({
    name: 'User Created',
    query: 'SELECT * FROM users WHERE email = ?',
    expectedRows: 1
});

// Generate report
console.log(manager.generateReport());

/**
 * Best Practices for Checkpoints:
 *
 * 1. Place checkpoints at key business logic points and critical operations
 * 2. Use hard checkpoints sparingly - only for truly critical verifications
 * 3. Provide clear, actionable error messages for debugging
 * 4. Include screenshots on checkpoint failures for visual debugging
 * 5. Use appropriate checkpoint types (text, image, database) for the verification
 * 6. Set reasonable timeouts for checkpoints that wait for conditions
 * 7. Group related checkpoints logically for better reporting
 * 8. Include context information (timestamps, environment) in results
 * 9. Consider soft checkpoints for non-critical verifications to gather more data
 * 10. Review and maintain checkpoints as the application evolves
 */
