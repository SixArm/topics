/**
 * Fuzz Testing - Discovering Vulnerabilities with Random Inputs
 *
 * Fuzz testing (fuzzing) is an automated testing technique that feeds
 * invalid, unexpected, or random data inputs to discover vulnerabilities,
 * crashes, and security flaws. It systematically bombards applications
 * with malformed data to find edge cases developers might not anticipate.
 *
 * Key Concepts:
 * - Automated generation of test inputs
 * - Coverage-guided fuzzing for better exploration
 * - Black-box vs white-box approaches
 * - Security vulnerability detection
 */

/**
 * FuzzInput represents a generated fuzzing input.
 * Contains the data and metadata about its generation.
 */
class FuzzInput {
    constructor(data, options = {}) {
        this.data = data;
        this.type = options.type || 'random';
        this.generation = options.generation || 1;
        this.parentId = options.parentId;
        this.id = `fuzz-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        this.createdAt = new Date();
    }

    /**
     * Creates a mutated copy of this input
     * @param {Function} mutator - Mutation function
     * @returns {FuzzInput} Mutated input
     */
    mutate(mutator) {
        const mutatedData = mutator(this.data);
        return new FuzzInput(mutatedData, {
            type: 'mutation',
            generation: this.generation + 1,
            parentId: this.id
        });
    }

    /**
     * Gets input summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            type: this.type,
            generation: this.generation,
            dataLength: typeof this.data === 'string' ? this.data.length : JSON.stringify(this.data).length
        };
    }
}

/**
 * InputGenerator creates various types of fuzz inputs.
 * Implements different generation strategies.
 */
class InputGenerator {
    constructor() {
        this.generators = new Map();
        this.registerDefaultGenerators();
    }

    /**
     * Registers default input generators
     */
    registerDefaultGenerators() {
        // Random string generator
        this.register('randomString', (options = {}) => {
            const length = options.length || Math.floor(Math.random() * 1000);
            let result = '';
            const chars = options.charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        });

        // Random number generator
        this.register('randomNumber', (options = {}) => {
            const min = options.min ?? Number.MIN_SAFE_INTEGER;
            const max = options.max ?? Number.MAX_SAFE_INTEGER;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        });

        // Boundary values generator
        this.register('boundaryValues', () => {
            const boundaries = [
                0, -1, 1,
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
                Number.MAX_VALUE,
                Number.MIN_VALUE,
                Infinity,
                -Infinity,
                NaN
            ];
            return boundaries[Math.floor(Math.random() * boundaries.length)];
        });

        // Format string generator
        this.register('formatString', () => {
            const formats = [
                '%s%s%s%s%s',
                '%x%x%x%x',
                '%n%n%n%n',
                '%d%d%d%d',
                '%p%p%p%p',
                '%.1000000d',
                '%s'.repeat(100)
            ];
            return formats[Math.floor(Math.random() * formats.length)];
        });

        // SQL injection payloads
        this.register('sqlInjection', () => {
            const payloads = [
                "' OR '1'='1",
                "'; DROP TABLE users;--",
                "1; SELECT * FROM users",
                "' UNION SELECT NULL--",
                "admin'--",
                "1' AND '1'='1",
                "' OR 1=1 --"
            ];
            return payloads[Math.floor(Math.random() * payloads.length)];
        });

        // XSS payloads
        this.register('xssPayload', () => {
            const payloads = [
                '<script>alert("XSS")</script>',
                '"><img src=x onerror=alert(1)>',
                "javascript:alert('XSS')",
                '<svg onload=alert(1)>',
                '{{constructor.constructor("alert(1)")()}}',
                '<img src="x" onerror="alert(1)">'
            ];
            return payloads[Math.floor(Math.random() * payloads.length)];
        });

        // Buffer overflow patterns
        this.register('bufferOverflow', (options = {}) => {
            const size = options.size || 10000;
            return 'A'.repeat(size);
        });

        // Random JSON generator
        this.register('randomJSON', (options = {}) => {
            const depth = options.depth || 3;
            return this.generateRandomJSON(depth);
        });
    }

    /**
     * Generates random JSON structure
     * @param {number} depth - Maximum nesting depth
     * @returns {Object} Random JSON
     */
    generateRandomJSON(depth) {
        if (depth <= 0) {
            const terminals = [null, true, false, '', 0, 'test'];
            return terminals[Math.floor(Math.random() * terminals.length)];
        }

        const type = Math.floor(Math.random() * 3);

        if (type === 0) {
            // Object
            const obj = {};
            const keys = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < keys; i++) {
                obj[`key${i}`] = this.generateRandomJSON(depth - 1);
            }
            return obj;
        } else if (type === 1) {
            // Array
            const arr = [];
            const items = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < items; i++) {
                arr.push(this.generateRandomJSON(depth - 1));
            }
            return arr;
        } else {
            // Primitive
            return this.generateRandomJSON(0);
        }
    }

    /**
     * Registers a custom generator
     * @param {string} name - Generator name
     * @param {Function} generator - Generator function
     */
    register(name, generator) {
        this.generators.set(name, generator);
    }

    /**
     * Generates a fuzz input
     * @param {string} type - Generator type
     * @param {Object} options - Generator options
     * @returns {FuzzInput} Generated input
     */
    generate(type, options = {}) {
        const generator = this.generators.get(type);
        if (!generator) {
            throw new Error(`Unknown generator type: ${type}`);
        }

        const data = generator(options);
        return new FuzzInput(data, { type });
    }

    /**
     * Generates multiple inputs
     * @param {string} type - Generator type
     * @param {number} count - Number of inputs
     * @param {Object} options - Generator options
     * @returns {Array<FuzzInput>} Generated inputs
     */
    generateMany(type, count, options = {}) {
        const inputs = [];
        for (let i = 0; i < count; i++) {
            inputs.push(this.generate(type, options));
        }
        return inputs;
    }

    /**
     * Gets available generator types
     * @returns {Array} Generator names
     */
    getGeneratorTypes() {
        return Array.from(this.generators.keys());
    }
}

/**
 * Mutator applies mutations to existing inputs.
 * Creates variations to explore more code paths.
 */
class Mutator {
    constructor() {
        this.strategies = [];
        this.registerDefaultStrategies();
    }

    /**
     * Registers default mutation strategies
     */
    registerDefaultStrategies() {
        // Bit flip
        this.addStrategy('bitFlip', (data) => {
            if (typeof data !== 'string') return data;
            const arr = data.split('');
            const pos = Math.floor(Math.random() * arr.length);
            arr[pos] = String.fromCharCode(arr[pos].charCodeAt(0) ^ (1 << Math.floor(Math.random() * 8)));
            return arr.join('');
        });

        // Insert random bytes
        this.addStrategy('insertBytes', (data) => {
            if (typeof data !== 'string') return data;
            const pos = Math.floor(Math.random() * data.length);
            const insert = String.fromCharCode(Math.floor(Math.random() * 256));
            return data.slice(0, pos) + insert + data.slice(pos);
        });

        // Delete bytes
        this.addStrategy('deleteBytes', (data) => {
            if (typeof data !== 'string' || data.length === 0) return data;
            const pos = Math.floor(Math.random() * data.length);
            const len = Math.min(Math.floor(Math.random() * 10) + 1, data.length - pos);
            return data.slice(0, pos) + data.slice(pos + len);
        });

        // Replace with special characters
        this.addStrategy('specialChars', (data) => {
            if (typeof data !== 'string') return data;
            const specials = ['\x00', '\n', '\r', '\t', '\xff', '\u0000'];
            const pos = Math.floor(Math.random() * data.length);
            const replacement = specials[Math.floor(Math.random() * specials.length)];
            return data.slice(0, pos) + replacement + data.slice(pos + 1);
        });

        // Duplicate portion
        this.addStrategy('duplicate', (data) => {
            if (typeof data !== 'string') return data;
            const start = Math.floor(Math.random() * data.length);
            const end = start + Math.floor(Math.random() * (data.length - start));
            const portion = data.slice(start, end);
            return data.slice(0, end) + portion + data.slice(end);
        });
    }

    /**
     * Adds a mutation strategy
     * @param {string} name - Strategy name
     * @param {Function} fn - Mutation function
     */
    addStrategy(name, fn) {
        this.strategies.push({ name, fn });
    }

    /**
     * Mutates input using random strategy
     * @param {*} data - Data to mutate
     * @returns {*} Mutated data
     */
    mutate(data) {
        const strategy = this.strategies[Math.floor(Math.random() * this.strategies.length)];
        return strategy.fn(data);
    }

    /**
     * Applies multiple mutations
     * @param {*} data - Data to mutate
     * @param {number} count - Number of mutations
     * @returns {*} Mutated data
     */
    mutateMultiple(data, count) {
        let result = data;
        for (let i = 0; i < count; i++) {
            result = this.mutate(result);
        }
        return result;
    }
}

/**
 * FuzzEngine orchestrates the fuzzing process.
 * Manages input generation, execution, and crash detection.
 */
class FuzzEngine {
    constructor(options = {}) {
        this.generator = new InputGenerator();
        this.mutator = new Mutator();
        this.maxIterations = options.maxIterations || 1000;
        this.timeout = options.timeout || 5000;
        this.crashes = [];
        this.hangs = [];
        this.coverage = new Set();
        this.corpus = [];
        this.stats = {
            iterations: 0,
            crashes: 0,
            hangs: 0,
            uniquePaths: 0
        };
    }

    /**
     * Runs fuzzing against a target function
     * @param {Function} target - Function to fuzz
     * @param {Object} options - Fuzzing options
     * @returns {Promise<Object>} Fuzzing results
     */
    async fuzz(target, options = {}) {
        console.log(`\n${'='.repeat(50)}`);
        console.log('Starting Fuzz Testing');
        console.log(`${'='.repeat(50)}\n`);

        const generatorType = options.generatorType || 'randomString';
        const startTime = Date.now();

        // Generate initial corpus
        this.corpus = this.generator.generateMany(generatorType, 10, options);

        for (let i = 0; i < this.maxIterations; i++) {
            this.stats.iterations++;

            // Select or generate input
            let input;
            if (this.corpus.length > 0 && Math.random() > 0.3) {
                // Mutate existing input
                const base = this.corpus[Math.floor(Math.random() * this.corpus.length)];
                input = base.mutate(this.mutator.mutate.bind(this.mutator));
            } else {
                // Generate new input
                input = this.generator.generate(generatorType, options);
            }

            // Execute with timeout
            const result = await this.executeWithTimeout(target, input);

            if (result.crashed) {
                this.crashes.push({
                    input: input.getSummary(),
                    error: result.error,
                    iteration: i
                });
                this.stats.crashes++;
                console.log(`  [CRASH] Iteration ${i}: ${result.error.substring(0, 50)}`);
            } else if (result.hung) {
                this.hangs.push({
                    input: input.getSummary(),
                    iteration: i
                });
                this.stats.hangs++;
                console.log(`  [HANG] Iteration ${i}: Timeout exceeded`);
            } else if (result.newCoverage) {
                // Input found new code paths - add to corpus
                this.corpus.push(input);
                this.stats.uniquePaths++;
            }

            // Progress update
            if ((i + 1) % 100 === 0) {
                console.log(`  Progress: ${i + 1}/${this.maxIterations} iterations`);
            }
        }

        const duration = Date.now() - startTime;

        return {
            duration,
            stats: this.stats,
            crashes: this.crashes,
            hangs: this.hangs,
            corpusSize: this.corpus.length
        };
    }

    /**
     * Executes target with timeout
     * @param {Function} target - Target function
     * @param {FuzzInput} input - Input to test
     * @returns {Promise<Object>} Execution result
     */
    async executeWithTimeout(target, input) {
        return new Promise((resolve) => {
            const timeoutId = setTimeout(() => {
                resolve({ hung: true });
            }, this.timeout);

            try {
                const result = target(input.data);

                // Check if result is a promise
                if (result && typeof result.then === 'function') {
                    result
                        .then(() => {
                            clearTimeout(timeoutId);
                            resolve({ success: true, newCoverage: Math.random() > 0.9 });
                        })
                        .catch((error) => {
                            clearTimeout(timeoutId);
                            resolve({ crashed: true, error: error.message });
                        });
                } else {
                    clearTimeout(timeoutId);
                    resolve({ success: true, newCoverage: Math.random() > 0.9 });
                }
            } catch (error) {
                clearTimeout(timeoutId);
                resolve({ crashed: true, error: error.message });
            }
        });
    }

    /**
     * Gets fuzzing statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        return {
            ...this.stats,
            crashRate: `${((this.stats.crashes / this.stats.iterations) * 100).toFixed(2)}%`,
            hangRate: `${((this.stats.hangs / this.stats.iterations) * 100).toFixed(2)}%`
        };
    }

    /**
     * Generates crash report
     * @returns {string} Crash report
     */
    generateCrashReport() {
        let report = '\n=== FUZZ TESTING CRASH REPORT ===\n\n';

        report += `Total Crashes: ${this.crashes.length}\n`;
        report += `Total Hangs: ${this.hangs.length}\n\n`;

        if (this.crashes.length > 0) {
            report += '--- Crashes ---\n';
            for (const crash of this.crashes) {
                report += `\nIteration: ${crash.iteration}\n`;
                report += `Input Type: ${crash.input.type}\n`;
                report += `Error: ${crash.error}\n`;
            }
        }

        if (this.hangs.length > 0) {
            report += '\n--- Hangs ---\n';
            for (const hang of this.hangs) {
                report += `\nIteration: ${hang.iteration}\n`;
                report += `Input Type: ${hang.input.type}\n`;
            }
        }

        return report;
    }
}

/**
 * VulnerabilityClassifier categorizes discovered issues.
 * Maps crashes to known vulnerability patterns.
 */
class VulnerabilityClassifier {
    static patterns = {
        bufferOverflow: /buffer overflow|stack smashing|heap overflow/i,
        nullPointer: /null pointer|nullptr|segmentation fault/i,
        integerOverflow: /integer overflow|arithmetic overflow/i,
        formatString: /format string|printf/i,
        useAfterFree: /use after free|double free/i,
        outOfBounds: /out of bounds|array index|bounds check/i,
        injection: /injection|sql|xss|command/i,
        denial: /denial|timeout|infinite loop|memory exhaustion/i
    };

    /**
     * Classifies an error into vulnerability category
     * @param {string} error - Error message
     * @returns {Object} Classification
     */
    static classify(error) {
        for (const [category, pattern] of Object.entries(this.patterns)) {
            if (pattern.test(error)) {
                return {
                    category,
                    severity: this.getSeverity(category),
                    description: this.getDescription(category)
                };
            }
        }

        return {
            category: 'unknown',
            severity: 'medium',
            description: 'Unclassified error'
        };
    }

    /**
     * Gets severity for a category
     * @param {string} category - Vulnerability category
     * @returns {string} Severity level
     */
    static getSeverity(category) {
        const severities = {
            bufferOverflow: 'critical',
            useAfterFree: 'critical',
            injection: 'critical',
            nullPointer: 'high',
            outOfBounds: 'high',
            integerOverflow: 'medium',
            formatString: 'medium',
            denial: 'medium'
        };
        return severities[category] || 'medium';
    }

    /**
     * Gets description for a category
     * @param {string} category - Vulnerability category
     * @returns {string} Description
     */
    static getDescription(category) {
        const descriptions = {
            bufferOverflow: 'Memory corruption vulnerability that may allow code execution',
            useAfterFree: 'Memory safety issue that may lead to code execution',
            injection: 'Input validation flaw allowing malicious code injection',
            nullPointer: 'Null dereference causing application crash',
            outOfBounds: 'Array access outside valid bounds',
            integerOverflow: 'Numeric overflow affecting program logic',
            formatString: 'Format string vulnerability in output functions',
            denial: 'Resource exhaustion or infinite loop causing denial of service'
        };
        return descriptions[category] || 'Unknown vulnerability type';
    }
}

// Demonstration
console.log('=== Fuzz Testing Demo ===\n');

// Create generator and show types
const generator = new InputGenerator();
console.log('Available generators:', generator.getGeneratorTypes());

// Generate sample inputs
console.log('\n--- Sample Fuzz Inputs ---');
const randomInput = generator.generate('randomString', { length: 20 });
console.log('Random String:', randomInput.data);

const sqlInput = generator.generate('sqlInjection');
console.log('SQL Injection:', sqlInput.data);

const xssInput = generator.generate('xssPayload');
console.log('XSS Payload:', xssInput.data);

const jsonInput = generator.generate('randomJSON', { depth: 2 });
console.log('Random JSON:', JSON.stringify(jsonInput.data));

// Mutation demo
console.log('\n--- Mutation Demo ---');
const mutator = new Mutator();
const original = 'Hello World';
console.log('Original:', original);
console.log('Mutated 1x:', mutator.mutate(original));
console.log('Mutated 3x:', mutator.mutateMultiple(original, 3));

// Fuzzing demo
console.log('\n--- Fuzz Engine Demo ---');

// Target function to fuzz
function vulnerableParser(input) {
    if (typeof input !== 'string') {
        throw new Error('Invalid input type');
    }
    if (input.length > 5000) {
        throw new Error('Buffer overflow: input too large');
    }
    if (input.includes('\x00')) {
        throw new Error('Null byte in input');
    }
    if (input.includes('DROP TABLE')) {
        throw new Error('SQL injection detected');
    }
    return input.toUpperCase();
}

const engine = new FuzzEngine({ maxIterations: 50, timeout: 1000 });

engine.fuzz(vulnerableParser, { generatorType: 'randomString' }).then(results => {
    console.log('\n--- Fuzzing Results ---');
    console.log(`Duration: ${results.duration}ms`);
    console.log('Statistics:', engine.getStatistics());

    if (results.crashes.length > 0) {
        console.log(engine.generateCrashReport());

        // Classify vulnerabilities
        console.log('\n--- Vulnerability Classification ---');
        for (const crash of results.crashes.slice(0, 3)) {
            const classification = VulnerabilityClassifier.classify(crash.error);
            console.log(`Error: ${crash.error.substring(0, 40)}...`);
            console.log(`  Category: ${classification.category}`);
            console.log(`  Severity: ${classification.severity}`);
        }
    }
});

/**
 * Best Practices for Fuzz Testing:
 *
 * 1. Start with seed inputs based on valid data formats
 * 2. Use coverage-guided fuzzing when possible
 * 3. Save crashing inputs for regression testing
 * 4. Run fuzzing with sanitizers (ASan, MSan, UBSan)
 * 5. Fuzz at trust boundaries and input parsing
 * 6. Allocate sufficient computational resources
 * 7. Minimize crash inputs for easier debugging
 * 8. Integrate fuzzing into CI/CD pipeline
 * 9. Use corpus distillation for efficiency
 * 10. Combine with other testing techniques
 */
