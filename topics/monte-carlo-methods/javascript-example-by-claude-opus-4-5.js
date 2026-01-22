/**
 * Monte Carlo Methods - Computational Random Sampling
 *
 * Monte Carlo methods are computational algorithms that use repeated random
 * sampling to solve mathematical problems. They are used when exact solutions
 * are impractical due to complexity, generating samples from probability
 * distributions to estimate behaviors and calculate probabilities.
 *
 * Key Concepts:
 * - Random sampling from probability distributions
 * - Law of large numbers for convergence
 * - Applicable to complex, multi-variable problems
 * - Accuracy improves with more samples
 */

/**
 * RandomGenerator provides random number generation utilities.
 * Supports various probability distributions.
 */
class RandomGenerator {
    /**
     * Generates uniform random number in range [min, max]
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    static uniform(min = 0, max = 1) {
        return min + Math.random() * (max - min);
    }

    /**
     * Generates normally distributed random number (Box-Muller transform)
     * @param {number} mean - Mean of distribution
     * @param {number} stdDev - Standard deviation
     * @returns {number} Random number
     */
    static normal(mean = 0, stdDev = 1) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return mean + z * stdDev;
    }

    /**
     * Generates exponentially distributed random number
     * @param {number} lambda - Rate parameter
     * @returns {number} Random number
     */
    static exponential(lambda = 1) {
        return -Math.log(1 - Math.random()) / lambda;
    }

    /**
     * Generates random integer in range [min, max]
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random integer
     */
    static integer(min, max) {
        return Math.floor(this.uniform(min, max + 1));
    }

    /**
     * Selects random element from array
     * @param {Array} array - Array to select from
     * @returns {*} Random element
     */
    static choice(array) {
        return array[this.integer(0, array.length - 1)];
    }

    /**
     * Generates random sample of given size
     * @param {number} n - Sample size
     * @param {Function} distribution - Distribution function
     * @param {Array} params - Distribution parameters
     * @returns {Array} Random sample
     */
    static sample(n, distribution, ...params) {
        const samples = [];
        for (let i = 0; i < n; i++) {
            samples.push(distribution.call(this, ...params));
        }
        return samples;
    }
}

/**
 * MonteCarloSimulation runs Monte Carlo experiments.
 * Provides framework for simulation and analysis.
 */
class MonteCarloSimulation {
    constructor(name) {
        this.name = name;
        this.iterations = 0;
        this.results = [];
        this.convergenceHistory = [];
    }

    /**
     * Runs the simulation
     * @param {Function} experiment - Function to run each iteration
     * @param {number} iterations - Number of iterations
     * @param {Object} options - Simulation options
     * @returns {Object} Simulation results
     */
    run(experiment, iterations, options = {}) {
        console.log(`Running Monte Carlo simulation: ${this.name}`);
        console.log(`Iterations: ${iterations}`);

        this.iterations = iterations;
        this.results = [];
        this.convergenceHistory = [];

        const startTime = Date.now();
        let runningSum = 0;

        for (let i = 0; i < iterations; i++) {
            const result = experiment();
            this.results.push(result);
            runningSum += result;

            // Track convergence
            if (options.trackConvergence && (i + 1) % Math.floor(iterations / 20) === 0) {
                this.convergenceHistory.push({
                    iteration: i + 1,
                    estimate: runningSum / (i + 1)
                });
            }
        }

        const duration = Date.now() - startTime;

        return {
            name: this.name,
            iterations,
            duration: `${duration}ms`,
            statistics: this.calculateStatistics()
        };
    }

    /**
     * Calculates statistics from results
     * @returns {Object} Statistics
     */
    calculateStatistics() {
        const n = this.results.length;
        if (n === 0) return null;

        const sum = this.results.reduce((a, b) => a + b, 0);
        const mean = sum / n;

        const squaredDiffs = this.results.map(x => Math.pow(x - mean, 2));
        const variance = squaredDiffs.reduce((a, b) => a + b, 0) / (n - 1);
        const stdDev = Math.sqrt(variance);

        const sorted = [...this.results].sort((a, b) => a - b);
        const median = sorted[Math.floor(n / 2)];

        // Confidence interval (95%)
        const standardError = stdDev / Math.sqrt(n);
        const marginOfError = 1.96 * standardError;

        return {
            mean: mean.toFixed(6),
            median: median.toFixed(6),
            stdDev: stdDev.toFixed(6),
            variance: variance.toFixed(6),
            min: Math.min(...this.results).toFixed(6),
            max: Math.max(...this.results).toFixed(6),
            confidenceInterval: {
                lower: (mean - marginOfError).toFixed(6),
                upper: (mean + marginOfError).toFixed(6),
                level: '95%'
            }
        };
    }

    /**
     * Gets convergence analysis
     * @returns {Object} Convergence data
     */
    getConvergence() {
        if (this.convergenceHistory.length < 2) {
            return { sufficient: false, message: 'Not enough data' };
        }

        const recent = this.convergenceHistory.slice(-5);
        const estimates = recent.map(h => h.estimate);
        const range = Math.max(...estimates) - Math.min(...estimates);

        return {
            history: this.convergenceHistory,
            recentRange: range.toFixed(6),
            converged: range < 0.001,
            finalEstimate: estimates[estimates.length - 1].toFixed(6)
        };
    }
}

/**
 * MonteCarloEstimator provides estimation methods.
 * Implements common Monte Carlo applications.
 */
class MonteCarloEstimator {
    /**
     * Estimates Pi using the inscribed circle method
     * @param {number} iterations - Number of samples
     * @returns {Object} Estimation result
     */
    static estimatePi(iterations) {
        const simulation = new MonteCarloSimulation('Pi Estimation');

        const experiment = () => {
            const x = RandomGenerator.uniform(-1, 1);
            const y = RandomGenerator.uniform(-1, 1);
            return (x * x + y * y <= 1) ? 1 : 0;
        };

        const result = simulation.run(experiment, iterations, { trackConvergence: true });
        const piEstimate = 4 * parseFloat(result.statistics.mean);

        return {
            estimate: piEstimate.toFixed(6),
            actual: Math.PI.toFixed(6),
            error: Math.abs(piEstimate - Math.PI).toFixed(6),
            errorPercent: ((Math.abs(piEstimate - Math.PI) / Math.PI) * 100).toFixed(4) + '%',
            ...result
        };
    }

    /**
     * Estimates an integral using Monte Carlo integration
     * @param {Function} f - Function to integrate
     * @param {number} a - Lower bound
     * @param {number} b - Upper bound
     * @param {number} iterations - Number of samples
     * @returns {Object} Integration result
     */
    static integrate(f, a, b, iterations) {
        const simulation = new MonteCarloSimulation('Integration');

        const experiment = () => {
            const x = RandomGenerator.uniform(a, b);
            return f(x);
        };

        const result = simulation.run(experiment, iterations);
        const integral = (b - a) * parseFloat(result.statistics.mean);

        return {
            integral: integral.toFixed(6),
            bounds: { a, b },
            ...result
        };
    }

    /**
     * Estimates probability of an event
     * @param {Function} eventCondition - Returns true if event occurred
     * @param {number} iterations - Number of samples
     * @returns {Object} Probability estimate
     */
    static estimateProbability(eventCondition, iterations) {
        const simulation = new MonteCarloSimulation('Probability Estimation');

        const experiment = () => eventCondition() ? 1 : 0;

        const result = simulation.run(experiment, iterations);
        const probability = parseFloat(result.statistics.mean);

        return {
            probability: probability.toFixed(6),
            occurrences: simulation.results.filter(r => r === 1).length,
            ...result
        };
    }
}

/**
 * RiskSimulator applies Monte Carlo to risk analysis.
 * Used for project estimation and financial modeling.
 */
class RiskSimulator {
    constructor(name) {
        this.name = name;
        this.variables = new Map();
    }

    /**
     * Adds a variable with distribution
     * @param {string} name - Variable name
     * @param {Object} distribution - Distribution specification
     */
    addVariable(name, distribution) {
        this.variables.set(name, distribution);
    }

    /**
     * Samples all variables once
     * @returns {Object} Sampled values
     */
    sampleVariables() {
        const sample = {};

        for (const [name, dist] of this.variables) {
            switch (dist.type) {
                case 'uniform':
                    sample[name] = RandomGenerator.uniform(dist.min, dist.max);
                    break;
                case 'normal':
                    sample[name] = RandomGenerator.normal(dist.mean, dist.stdDev);
                    break;
                case 'triangular':
                    sample[name] = this.triangular(dist.min, dist.mode, dist.max);
                    break;
                default:
                    sample[name] = RandomGenerator.uniform(dist.min || 0, dist.max || 1);
            }
        }

        return sample;
    }

    /**
     * Generates triangular distribution sample
     * @param {number} min - Minimum
     * @param {number} mode - Most likely
     * @param {number} max - Maximum
     * @returns {number} Sample
     */
    triangular(min, mode, max) {
        const u = Math.random();
        const fc = (mode - min) / (max - min);

        if (u < fc) {
            return min + Math.sqrt(u * (max - min) * (mode - min));
        } else {
            return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
        }
    }

    /**
     * Runs risk simulation
     * @param {Function} model - Model function taking sampled variables
     * @param {number} iterations - Number of iterations
     * @returns {Object} Simulation results
     */
    simulate(model, iterations) {
        const results = [];

        for (let i = 0; i < iterations; i++) {
            const variables = this.sampleVariables();
            const outcome = model(variables);
            results.push(outcome);
        }

        const sorted = [...results].sort((a, b) => a - b);
        const mean = results.reduce((a, b) => a + b, 0) / results.length;

        // Percentiles
        const p5 = sorted[Math.floor(iterations * 0.05)];
        const p50 = sorted[Math.floor(iterations * 0.5)];
        const p95 = sorted[Math.floor(iterations * 0.95)];

        return {
            name: this.name,
            iterations,
            mean: mean.toFixed(2),
            percentiles: {
                p5: p5.toFixed(2),
                p50: p50.toFixed(2),
                p95: p95.toFixed(2)
            },
            min: Math.min(...results).toFixed(2),
            max: Math.max(...results).toFixed(2),
            range: `${p5.toFixed(2)} to ${p95.toFixed(2)} (90% confidence)`
        };
    }
}

/**
 * MonteCarloTester applies Monte Carlo to software testing.
 * Generates random test inputs and analyzes coverage.
 */
class MonteCarloTester {
    constructor() {
        this.testResults = [];
    }

    /**
     * Generates random test inputs
     * @param {Object} schema - Input schema
     * @param {number} count - Number of inputs
     * @returns {Array} Generated inputs
     */
    generateInputs(schema, count) {
        const inputs = [];

        for (let i = 0; i < count; i++) {
            const input = {};

            for (const [field, spec] of Object.entries(schema)) {
                switch (spec.type) {
                    case 'integer':
                        input[field] = RandomGenerator.integer(spec.min || 0, spec.max || 100);
                        break;
                    case 'float':
                        input[field] = RandomGenerator.uniform(spec.min || 0, spec.max || 1);
                        break;
                    case 'string':
                        input[field] = this.randomString(spec.length || 10);
                        break;
                    case 'boolean':
                        input[field] = Math.random() > 0.5;
                        break;
                    case 'choice':
                        input[field] = RandomGenerator.choice(spec.values);
                        break;
                }
            }

            inputs.push(input);
        }

        return inputs;
    }

    /**
     * Generates random string
     * @param {number} length - String length
     * @returns {string} Random string
     */
    randomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length }, () => RandomGenerator.choice(chars.split(''))).join('');
    }

    /**
     * Runs function with random inputs and analyzes behavior
     * @param {Function} fn - Function to test
     * @param {Object} schema - Input schema
     * @param {number} iterations - Number of tests
     * @returns {Object} Test analysis
     */
    fuzzTest(fn, schema, iterations) {
        const inputs = this.generateInputs(schema, iterations);
        const results = { passed: 0, failed: 0, errors: [] };

        for (const input of inputs) {
            try {
                fn(input);
                results.passed++;
            } catch (error) {
                results.failed++;
                results.errors.push({
                    input,
                    error: error.message
                });
            }
        }

        return {
            iterations,
            passed: results.passed,
            failed: results.failed,
            successRate: ((results.passed / iterations) * 100).toFixed(2) + '%',
            uniqueErrors: [...new Set(results.errors.map(e => e.error))].length,
            sampleErrors: results.errors.slice(0, 3)
        };
    }
}

// Demonstration
console.log('=== Monte Carlo Methods Demo ===\n');

// Estimate Pi
console.log('--- Pi Estimation ---');
const piResult = MonteCarloEstimator.estimatePi(10000);
console.log(`Estimated Pi: ${piResult.estimate}`);
console.log(`Actual Pi: ${piResult.actual}`);
console.log(`Error: ${piResult.errorPercent}`);

// Monte Carlo Integration
console.log('\n--- Integration ---');
const integralResult = MonteCarloEstimator.integrate(
    x => Math.sin(x), // Function to integrate
    0,                // Lower bound
    Math.PI,          // Upper bound
    10000             // Iterations
);
console.log(`Integral of sin(x) from 0 to π: ${integralResult.integral}`);
console.log(`Actual value: 2.000000`);

// Risk Simulation
console.log('\n--- Project Risk Simulation ---');
const riskSim = new RiskSimulator('Project Duration');

riskSim.addVariable('design', { type: 'triangular', min: 5, mode: 10, max: 20 });
riskSim.addVariable('development', { type: 'triangular', min: 20, mode: 30, max: 60 });
riskSim.addVariable('testing', { type: 'triangular', min: 10, mode: 15, max: 30 });

const projectModel = (vars) => vars.design + vars.development + vars.testing;
const riskResult = riskSim.simulate(projectModel, 10000);

console.log('Project Duration Estimate:');
console.log(`  Mean: ${riskResult.mean} days`);
console.log(`  90% Confidence: ${riskResult.range}`);

// Probability Estimation
console.log('\n--- Probability Estimation ---');
// Probability of rolling doubles with two dice
const doublesProb = MonteCarloEstimator.estimateProbability(
    () => {
        const die1 = RandomGenerator.integer(1, 6);
        const die2 = RandomGenerator.integer(1, 6);
        return die1 === die2;
    },
    10000
);
console.log(`Probability of rolling doubles: ${doublesProb.probability}`);
console.log(`Theoretical: ${(1/6).toFixed(6)}`);

// Fuzz Testing
console.log('\n--- Fuzz Testing ---');
const tester = new MonteCarloTester();

const divideFunction = (input) => {
    if (input.divisor === 0) throw new Error('Division by zero');
    return input.dividend / input.divisor;
};

const fuzzResult = tester.fuzzTest(
    divideFunction,
    {
        dividend: { type: 'integer', min: -100, max: 100 },
        divisor: { type: 'integer', min: -10, max: 10 }
    },
    1000
);

console.log('Fuzz Test Results:', fuzzResult);

/**
 * Best Practices for Monte Carlo Methods:
 *
 * 1. Use sufficient iterations for desired accuracy
 * 2. Track convergence to determine when to stop
 * 3. Use appropriate probability distributions
 * 4. Validate results against known solutions when possible
 * 5. Set random seeds for reproducibility in tests
 * 6. Consider variance reduction techniques
 * 7. Report confidence intervals, not just point estimates
 * 8. Be aware of computational costs
 * 9. Use parallel processing for large simulations
 * 10. Document assumptions about distributions
 */
