/**
 * Monte Carlo Testing - Probabilistic Software Testing
 *
 * Monte Carlo testing uses random sampling and statistical methods to evaluate
 * system behavior and reliability. It generates large volumes of test cases with
 * randomly selected inputs, execution paths, and scenarios to simulate real-world
 * usage patterns that might be difficult to predict through traditional testing.
 *
 * Key Concepts:
 * - Random input generation from probability distributions
 * - Statistical analysis of test results
 * - Reliability estimation through simulation
 * - Coverage of vast input spaces
 */

/**
 * ProbabilityDistribution provides random value generation.
 * Supports various statistical distributions.
 */
class ProbabilityDistribution {
    /**
     * Generates uniform random number in range
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random value
     */
    static uniform(min, max) {
        return min + Math.random() * (max - min);
    }

    /**
     * Generates normally distributed random number
     * @param {number} mean - Mean of distribution
     * @param {number} stdDev - Standard deviation
     * @returns {number} Random value
     */
    static normal(mean, stdDev) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return mean + z * stdDev;
    }

    /**
     * Generates exponentially distributed random number
     * @param {number} lambda - Rate parameter
     * @returns {number} Random value
     */
    static exponential(lambda) {
        return -Math.log(1 - Math.random()) / lambda;
    }

    /**
     * Generates value from discrete distribution
     * @param {Array} values - Possible values
     * @param {Array} weights - Probability weights
     * @returns {*} Selected value
     */
    static discrete(values, weights) {
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;

        for (let i = 0; i < values.length; i++) {
            random -= weights[i];
            if (random <= 0) return values[i];
        }
        return values[values.length - 1];
    }

    /**
     * Generates Poisson distributed random number
     * @param {number} lambda - Average rate
     * @returns {number} Random count
     */
    static poisson(lambda) {
        const L = Math.exp(-lambda);
        let k = 0;
        let p = 1;

        do {
            k++;
            p *= Math.random();
        } while (p > L);

        return k - 1;
    }
}

/**
 * InputGenerator creates random test inputs.
 * Generates inputs based on defined schemas and distributions.
 */
class InputGenerator {
    constructor() {
        this.schemas = new Map();
    }

    /**
     * Defines an input schema
     * @param {string} name - Schema name
     * @param {Object} schema - Field definitions
     */
    defineSchema(name, schema) {
        this.schemas.set(name, schema);
    }

    /**
     * Generates a random input based on schema
     * @param {string} schemaName - Schema to use
     * @returns {Object} Generated input
     */
    generate(schemaName) {
        const schema = this.schemas.get(schemaName);
        if (!schema) throw new Error(`Schema ${schemaName} not found`);

        const input = {};
        for (const [field, spec] of Object.entries(schema)) {
            input[field] = this.generateField(spec);
        }
        return input;
    }

    /**
     * Generates a field value based on specification
     * @param {Object} spec - Field specification
     * @returns {*} Generated value
     */
    generateField(spec) {
        switch (spec.distribution) {
            case 'uniform':
                return ProbabilityDistribution.uniform(spec.min, spec.max);
            case 'normal':
                return ProbabilityDistribution.normal(spec.mean, spec.stdDev);
            case 'exponential':
                return ProbabilityDistribution.exponential(spec.lambda);
            case 'discrete':
                return ProbabilityDistribution.discrete(spec.values, spec.weights);
            case 'integer':
                return Math.floor(ProbabilityDistribution.uniform(spec.min, spec.max + 1));
            case 'boolean':
                return Math.random() < (spec.probability || 0.5);
            case 'string':
                return this.generateString(spec.length || 10, spec.charset);
            default:
                return null;
        }
    }

    /**
     * Generates random string
     * @param {number} length - String length
     * @param {string} charset - Character set
     * @returns {string} Random string
     */
    generateString(length, charset = 'alphanumeric') {
        const charsets = {
            alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
            numeric: '0123456789',
            special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };
        const chars = charsets[charset] || charset;
        return Array.from({ length }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        ).join('');
    }

    /**
     * Generates batch of inputs
     * @param {string} schemaName - Schema to use
     * @param {number} count - Number of inputs
     * @returns {Array} Generated inputs
     */
    generateBatch(schemaName, count) {
        return Array.from({ length: count }, () => this.generate(schemaName));
    }
}

/**
 * MonteCarloTestRunner executes probabilistic tests.
 * Runs tests with random inputs and collects statistics.
 */
class MonteCarloTestRunner {
    constructor(options = {}) {
        this.iterations = options.iterations || 1000;
        this.results = [];
        this.failures = [];
        this.executionTimes = [];
    }

    /**
     * Runs Monte Carlo test
     * @param {Function} testFn - Test function to execute
     * @param {Function} inputGenerator - Function to generate inputs
     * @param {Function} oracle - Function to verify correctness
     * @returns {Object} Test results
     */
    run(testFn, inputGenerator, oracle) {
        console.log(`Running ${this.iterations} Monte Carlo iterations...`);

        this.results = [];
        this.failures = [];
        this.executionTimes = [];

        for (let i = 0; i < this.iterations; i++) {
            const input = inputGenerator();
            const startTime = performance.now();

            try {
                const output = testFn(input);
                const duration = performance.now() - startTime;
                this.executionTimes.push(duration);

                const isCorrect = oracle(input, output);
                this.results.push({ passed: isCorrect, input, output });

                if (!isCorrect) {
                    this.failures.push({ input, output, reason: 'Oracle failed' });
                }
            } catch (error) {
                const duration = performance.now() - startTime;
                this.executionTimes.push(duration);
                this.results.push({ passed: false, input, error: error.message });
                this.failures.push({ input, error: error.message });
            }
        }

        return this.analyze();
    }

    /**
     * Analyzes test results
     * @returns {Object} Analysis
     */
    analyze() {
        const passed = this.results.filter(r => r.passed).length;
        const failed = this.results.length - passed;

        const avgTime = this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length;
        const maxTime = Math.max(...this.executionTimes);
        const minTime = Math.min(...this.executionTimes);

        return {
            iterations: this.iterations,
            passed,
            failed,
            passRate: ((passed / this.iterations) * 100).toFixed(2) + '%',
            failureRate: ((failed / this.iterations) * 100).toFixed(4) + '%',
            performance: {
                avgTime: avgTime.toFixed(3) + 'ms',
                maxTime: maxTime.toFixed(3) + 'ms',
                minTime: minTime.toFixed(3) + 'ms'
            },
            sampleFailures: this.failures.slice(0, 5),
            reliability: this.estimateReliability(passed)
        };
    }

    /**
     * Estimates system reliability from test results
     * @param {number} passed - Number of passed tests
     * @returns {Object} Reliability estimate
     */
    estimateReliability(passed) {
        const n = this.iterations;
        const p = passed / n;

        // Wilson score interval for confidence
        const z = 1.96; // 95% confidence
        const denominator = 1 + z * z / n;
        const center = (p + z * z / (2 * n)) / denominator;
        const margin = z * Math.sqrt((p * (1 - p) + z * z / (4 * n)) / n) / denominator;

        return {
            pointEstimate: (p * 100).toFixed(4) + '%',
            confidenceInterval: {
                lower: ((center - margin) * 100).toFixed(4) + '%',
                upper: ((center + margin) * 100).toFixed(4) + '%',
                level: '95%'
            }
        };
    }
}

/**
 * ScenarioSimulator simulates complex usage scenarios.
 * Models user behavior and system interactions.
 */
class ScenarioSimulator {
    constructor() {
        this.scenarios = [];
        this.currentScenario = null;
    }

    /**
     * Defines a usage scenario
     * @param {Object} scenario - Scenario definition
     */
    defineScenario(scenario) {
        this.scenarios.push({
            name: scenario.name,
            probability: scenario.probability,
            steps: scenario.steps,
            distributions: scenario.distributions || {}
        });
    }

    /**
     * Selects a random scenario based on probabilities
     * @returns {Object} Selected scenario
     */
    selectScenario() {
        const probabilities = this.scenarios.map(s => s.probability);
        const idx = this.weightedRandom(probabilities);
        this.currentScenario = this.scenarios[idx];
        return this.currentScenario;
    }

    /**
     * Weighted random selection
     * @param {Array} weights - Probability weights
     * @returns {number} Selected index
     */
    weightedRandom(weights) {
        const total = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * total;

        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) return i;
        }
        return weights.length - 1;
    }

    /**
     * Generates scenario execution
     * @returns {Object} Scenario execution details
     */
    generateExecution() {
        const scenario = this.selectScenario();
        const execution = {
            scenario: scenario.name,
            steps: [],
            parameters: {}
        };

        // Generate parameters from distributions
        for (const [param, spec] of Object.entries(scenario.distributions)) {
            execution.parameters[param] = this.sampleDistribution(spec);
        }

        // Generate step variations
        for (const step of scenario.steps) {
            execution.steps.push({
                action: step.action,
                delay: this.sampleDistribution(step.delay || { type: 'uniform', min: 0, max: 100 })
            });
        }

        return execution;
    }

    /**
     * Samples from a distribution specification
     * @param {Object} spec - Distribution specification
     * @returns {number} Sampled value
     */
    sampleDistribution(spec) {
        switch (spec.type) {
            case 'uniform':
                return ProbabilityDistribution.uniform(spec.min, spec.max);
            case 'normal':
                return ProbabilityDistribution.normal(spec.mean, spec.stdDev);
            case 'exponential':
                return ProbabilityDistribution.exponential(spec.lambda);
            default:
                return 0;
        }
    }
}

/**
 * ReliabilityEstimator estimates system reliability.
 * Uses Monte Carlo methods for reliability analysis.
 */
class ReliabilityEstimator {
    /**
     * Estimates failure probability from test results
     * @param {number} failures - Number of failures
     * @param {number} total - Total tests
     * @returns {Object} Failure probability estimate
     */
    static estimateFailureProbability(failures, total) {
        const p = failures / total;
        const variance = p * (1 - p) / total;
        const stdError = Math.sqrt(variance);

        return {
            probability: p.toFixed(6),
            standardError: stdError.toFixed(6),
            confidenceInterval: {
                lower: Math.max(0, p - 1.96 * stdError).toFixed(6),
                upper: Math.min(1, p + 1.96 * stdError).toFixed(6)
            }
        };
    }

    /**
     * Estimates mean time between failures
     * @param {Array} failureTimes - Times at which failures occurred
     * @param {number} totalTime - Total observation time
     * @returns {Object} MTBF estimate
     */
    static estimateMTBF(failureTimes, totalTime) {
        if (failureTimes.length === 0) {
            return { mtbf: 'No failures observed', confidence: 'High' };
        }

        const mtbf = totalTime / failureTimes.length;
        const variance = mtbf * mtbf / failureTimes.length;

        return {
            mtbf: mtbf.toFixed(2),
            variance: variance.toFixed(2),
            standardError: Math.sqrt(variance).toFixed(2)
        };
    }

    /**
     * Simulates system reliability over time
     * @param {number} failureRate - Failure rate (lambda)
     * @param {number} duration - Simulation duration
     * @param {number} simulations - Number of simulations
     * @returns {Object} Reliability analysis
     */
    static simulateReliability(failureRate, duration, simulations) {
        const survivals = [];

        for (let i = 0; i < simulations; i++) {
            let time = 0;
            let survived = true;

            while (time < duration) {
                const nextFailure = ProbabilityDistribution.exponential(failureRate);
                time += nextFailure;

                if (time < duration) {
                    survived = false;
                    break;
                }
            }

            survivals.push(survived);
        }

        const survivalCount = survivals.filter(s => s).length;
        const reliability = survivalCount / simulations;

        return {
            duration,
            simulations,
            estimatedReliability: (reliability * 100).toFixed(2) + '%',
            theoreticalReliability: (Math.exp(-failureRate * duration) * 100).toFixed(2) + '%'
        };
    }
}

// Demonstration
console.log('=== Monte Carlo Testing Demo ===\n');

// Input generation
console.log('--- Input Generation ---');
const generator = new InputGenerator();
generator.defineSchema('userProfile', {
    age: { distribution: 'normal', mean: 35, stdDev: 12 },
    income: { distribution: 'exponential', lambda: 0.00002 },
    accountType: { distribution: 'discrete', values: ['free', 'basic', 'premium'], weights: [0.6, 0.3, 0.1] },
    isActive: { distribution: 'boolean', probability: 0.8 }
});

console.log('Sample inputs:');
for (let i = 0; i < 3; i++) {
    console.log(generator.generate('userProfile'));
}

// Monte Carlo test run
console.log('\n--- Monte Carlo Test Run ---');
const runner = new MonteCarloTestRunner({ iterations: 100 });

const testFunction = (input) => {
    if (input.value < 0) throw new Error('Negative value');
    return Math.sqrt(input.value);
};

const inputGen = () => ({ value: ProbabilityDistribution.uniform(-10, 100) });
const oracle = (input, output) => input.value >= 0 ? Math.abs(output * output - input.value) < 0.0001 : false;

const results = runner.run(testFunction, inputGen, oracle);
console.log('Test Results:', results);

// Scenario simulation
console.log('\n--- Scenario Simulation ---');
const simulator = new ScenarioSimulator();

simulator.defineScenario({
    name: 'Quick Browse',
    probability: 0.5,
    steps: [
        { action: 'visit_homepage', delay: { type: 'uniform', min: 0, max: 100 } },
        { action: 'view_product', delay: { type: 'exponential', lambda: 0.02 } },
        { action: 'leave', delay: { type: 'uniform', min: 0, max: 50 } }
    ]
});

simulator.defineScenario({
    name: 'Purchase Flow',
    probability: 0.3,
    steps: [
        { action: 'visit_homepage' },
        { action: 'search_product' },
        { action: 'add_to_cart' },
        { action: 'checkout' }
    ],
    distributions: {
        cartSize: { type: 'normal', mean: 3, stdDev: 1 }
    }
});

console.log('Sample scenario executions:');
for (let i = 0; i < 3; i++) {
    console.log(simulator.generateExecution());
}

// Reliability estimation
console.log('\n--- Reliability Estimation ---');
console.log('Failure probability:', ReliabilityEstimator.estimateFailureProbability(5, 1000));
console.log('Simulated reliability:', ReliabilityEstimator.simulateReliability(0.001, 1000, 10000));

/**
 * Best Practices for Monte Carlo Testing:
 *
 * 1. Define realistic probability distributions for inputs
 * 2. Use sufficient iterations for statistical significance
 * 3. Design proper oracles to verify correctness
 * 4. Track and analyze failures to identify patterns
 * 5. Combine with traditional testing for coverage
 * 6. Monitor performance metrics across iterations
 * 7. Use seed values for reproducible random tests
 * 8. Calculate confidence intervals for reliability
 * 9. Model real-world usage patterns in scenarios
 * 10. Balance computational cost with coverage needs
 */
