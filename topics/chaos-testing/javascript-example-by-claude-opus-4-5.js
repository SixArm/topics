/**
 * Chaos Testing - Evaluating System Resilience Through Controlled Failures
 *
 * Chaos testing intentionally introduces failures and disruptions into systems
 * to evaluate their resilience and ability to recover from unexpected events.
 * This proactive approach helps identify weaknesses before they manifest as
 * critical outages in production environments.
 *
 * Key Concepts:
 * - Fault Injection: Deliberately introducing failures (crashes, latency, errors)
 * - Steady State: Defining normal system behavior as a baseline
 * - Blast Radius: Limiting the scope of chaos experiments
 * - Game Days: Scheduled chaos testing events with team participation
 */

/**
 * ChaosExperiment defines and executes a controlled failure scenario.
 * Each experiment targets specific system components with defined hypotheses.
 */
class ChaosExperiment {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.hypothesis = options.hypothesis;
        this.targetService = options.targetService;
        this.faultType = options.faultType;
        this.duration = options.duration || 60000; // Default 1 minute
        this.rollbackPlan = options.rollbackPlan;
        this.status = 'pending';
        this.results = null;
    }

    /**
     * Validates that the experiment is safe to run
     * @returns {Object} Validation result
     */
    validateSafety() {
        const checks = {
            hasRollbackPlan: !!this.rollbackPlan,
            hasDurationLimit: this.duration <= 300000, // Max 5 minutes
            hasHypothesis: !!this.hypothesis,
            hasTarget: !!this.targetService
        };

        const passed = Object.values(checks).every(v => v);
        console.log(`Safety validation: ${passed ? 'PASSED' : 'FAILED'}`);
        Object.entries(checks).forEach(([check, result]) => {
            console.log(`  ${result ? '✓' : '✗'} ${check}`);
        });

        return { passed, checks };
    }

    /**
     * Executes the chaos experiment
     * @param {Object} chaosEngine - The chaos engine to use
     * @returns {Promise<Object>} Experiment results
     */
    async execute(chaosEngine) {
        console.log(`\nExecuting chaos experiment: ${this.name}`);
        console.log(`Hypothesis: ${this.hypothesis}`);

        this.status = 'running';
        const startTime = Date.now();

        try {
            // Record baseline metrics
            const baseline = await chaosEngine.recordBaseline(this.targetService);
            console.log('Baseline metrics recorded');

            // Inject fault
            console.log(`Injecting fault: ${this.faultType}`);
            await chaosEngine.injectFault(this.targetService, this.faultType);

            // Monitor system during chaos
            const observations = await chaosEngine.monitor(this.targetService, this.duration);

            // Remove fault
            await chaosEngine.removeFault(this.targetService, this.faultType);
            console.log('Fault removed');

            // Analyze results
            this.results = {
                baseline,
                observations,
                duration: Date.now() - startTime,
                hypothesisValidated: this.evaluateHypothesis(baseline, observations)
            };

            this.status = this.results.hypothesisValidated ? 'passed' : 'failed';

        } catch (error) {
            this.status = 'error';
            this.results = { error: error.message };

            // Execute rollback
            console.log('Executing rollback plan...');
            await this.rollbackPlan();
        }

        return this.results;
    }

    /**
     * Evaluates if the hypothesis held true during the experiment
     * @param {Object} baseline - Baseline metrics
     * @param {Object} observations - Observations during chaos
     * @returns {boolean} True if hypothesis was validated
     */
    evaluateHypothesis(baseline, observations) {
        // Simplified evaluation - real implementation would be more sophisticated
        const errorRateIncrease = observations.errorRate - baseline.errorRate;
        const latencyIncrease = observations.p99Latency / baseline.p99Latency;

        console.log(`\nHypothesis Evaluation:`);
        console.log(`  Error rate increase: ${(errorRateIncrease * 100).toFixed(2)}%`);
        console.log(`  Latency increase: ${latencyIncrease.toFixed(2)}x`);

        // Hypothesis validated if system remained within acceptable bounds
        return errorRateIncrease < 0.05 && latencyIncrease < 2;
    }
}

/**
 * ChaosEngine orchestrates fault injection and system monitoring.
 * Provides the infrastructure for running chaos experiments safely.
 */
class ChaosEngine {
    constructor() {
        this.activeFaults = new Map();
        this.faultHandlers = new Map();
        this.monitoringInterval = 1000; // 1 second
        this.setupDefaultFaults();
    }

    /**
     * Sets up default fault injection handlers
     */
    setupDefaultFaults() {
        this.registerFaultType('latency', {
            inject: async (service, config) => {
                console.log(`  Adding ${config.delay}ms latency to ${service}`);
                return { type: 'latency', delay: config.delay || 500 };
            },
            remove: async (service) => {
                console.log(`  Removing latency from ${service}`);
            }
        });

        this.registerFaultType('error', {
            inject: async (service, config) => {
                console.log(`  Injecting ${config.rate}% error rate to ${service}`);
                return { type: 'error', rate: config.rate || 0.1 };
            },
            remove: async (service) => {
                console.log(`  Removing error injection from ${service}`);
            }
        });

        this.registerFaultType('resource', {
            inject: async (service, config) => {
                console.log(`  Consuming ${config.cpu}% CPU on ${service}`);
                return { type: 'resource', cpu: config.cpu || 80 };
            },
            remove: async (service) => {
                console.log(`  Releasing resources on ${service}`);
            }
        });

        this.registerFaultType('network', {
            inject: async (service, config) => {
                console.log(`  Creating network partition for ${service}`);
                return { type: 'network', partition: true };
            },
            remove: async (service) => {
                console.log(`  Restoring network connectivity for ${service}`);
            }
        });
    }

    /**
     * Registers a custom fault type
     * @param {string} type - Fault type name
     * @param {Object} handler - Inject and remove handlers
     */
    registerFaultType(type, handler) {
        this.faultHandlers.set(type, handler);
    }

    /**
     * Records baseline metrics for a service
     * @param {string} service - Service to monitor
     * @returns {Object} Baseline metrics
     */
    async recordBaseline(service) {
        // Simulated baseline recording
        return {
            service,
            timestamp: new Date().toISOString(),
            requestRate: 1000,
            errorRate: 0.001,
            p50Latency: 50,
            p99Latency: 200,
            availability: 0.999
        };
    }

    /**
     * Injects a fault into a service
     * @param {string} service - Target service
     * @param {string} faultType - Type of fault to inject
     * @param {Object} config - Fault configuration
     */
    async injectFault(service, faultType, config = {}) {
        const handler = this.faultHandlers.get(faultType);
        if (!handler) {
            throw new Error(`Unknown fault type: ${faultType}`);
        }

        const fault = await handler.inject(service, config);
        this.activeFaults.set(`${service}:${faultType}`, fault);
    }

    /**
     * Removes a fault from a service
     * @param {string} service - Target service
     * @param {string} faultType - Type of fault to remove
     */
    async removeFault(service, faultType) {
        const handler = this.faultHandlers.get(faultType);
        if (handler) {
            await handler.remove(service);
        }
        this.activeFaults.delete(`${service}:${faultType}`);
    }

    /**
     * Monitors a service during chaos injection
     * @param {string} service - Service to monitor
     * @param {number} duration - Monitoring duration in ms
     * @returns {Object} Aggregated observations
     */
    async monitor(service, duration) {
        console.log(`Monitoring ${service} for ${duration}ms...`);

        // Simulated monitoring with degraded metrics due to fault
        return {
            service,
            monitoringDuration: duration,
            requestRate: 950, // Slightly reduced
            errorRate: 0.02,  // Increased due to fault
            p50Latency: 150,  // Increased
            p99Latency: 350,  // Increased
            availability: 0.98
        };
    }
}

/**
 * GameDay organizes and coordinates chaos testing events.
 * Manages scheduling, communication, and reporting for chaos exercises.
 */
class GameDay {
    constructor(name, date) {
        this.name = name;
        this.date = date;
        this.experiments = [];
        this.participants = [];
        this.status = 'scheduled';
        this.report = null;
    }

    /**
     * Adds an experiment to the game day
     * @param {ChaosExperiment} experiment - Experiment to add
     */
    addExperiment(experiment) {
        this.experiments.push(experiment);
        console.log(`Added experiment: ${experiment.name}`);
    }

    /**
     * Adds a participant to the game day
     * @param {Object} participant - Participant details
     */
    addParticipant(participant) {
        this.participants.push(participant);
    }

    /**
     * Runs all experiments in the game day
     * @param {ChaosEngine} engine - Chaos engine to use
     * @returns {Object} Game day results
     */
    async run(engine) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Starting Game Day: ${this.name}`);
        console.log(`Date: ${this.date}`);
        console.log(`Participants: ${this.participants.length}`);
        console.log(`Experiments: ${this.experiments.length}`);
        console.log(`${'='.repeat(50)}`);

        this.status = 'in-progress';
        const results = [];

        for (const experiment of this.experiments) {
            // Safety check before each experiment
            const safety = experiment.validateSafety();
            if (!safety.passed) {
                console.log(`Skipping ${experiment.name}: Failed safety checks`);
                continue;
            }

            const result = await experiment.execute(engine);
            results.push({
                experiment: experiment.name,
                status: experiment.status,
                result
            });

            // Brief pause between experiments
            await this.pause(2000);
        }

        this.status = 'completed';
        this.report = this.generateReport(results);
        return this.report;
    }

    /**
     * Pauses execution for specified duration
     * @param {number} ms - Milliseconds to pause
     */
    pause(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Generates a summary report of the game day
     * @param {Array} results - Results from all experiments
     * @returns {Object} Summary report
     */
    generateReport(results) {
        const passed = results.filter(r => r.status === 'passed').length;
        const failed = results.filter(r => r.status === 'failed').length;
        const errors = results.filter(r => r.status === 'error').length;

        return {
            gameDayName: this.name,
            date: this.date,
            totalExperiments: results.length,
            passed,
            failed,
            errors,
            successRate: `${((passed / results.length) * 100).toFixed(1)}%`,
            results,
            recommendations: this.generateRecommendations(results)
        };
    }

    /**
     * Generates recommendations based on experiment results
     * @param {Array} results - Experiment results
     * @returns {Array} Recommendations
     */
    generateRecommendations(results) {
        const recommendations = [];

        results.forEach(r => {
            if (r.status === 'failed') {
                recommendations.push({
                    priority: 'high',
                    experiment: r.experiment,
                    action: 'Investigate and improve resilience for this failure mode'
                });
            }
        });

        return recommendations;
    }
}

/**
 * SteadyStateHypothesis defines expected normal behavior.
 * Used as baseline for evaluating system during chaos.
 */
class SteadyStateHypothesis {
    constructor(name) {
        this.name = name;
        this.metrics = [];
    }

    /**
     * Adds a metric expectation to the hypothesis
     * @param {string} metric - Metric name
     * @param {string} operator - Comparison operator
     * @param {number} threshold - Threshold value
     */
    addExpectation(metric, operator, threshold) {
        this.metrics.push({ metric, operator, threshold });
    }

    /**
     * Evaluates observations against the hypothesis
     * @param {Object} observations - Observed metrics
     * @returns {Object} Evaluation result
     */
    evaluate(observations) {
        const results = this.metrics.map(expectation => {
            const value = observations[expectation.metric];
            let passed;

            switch (expectation.operator) {
                case '<': passed = value < expectation.threshold; break;
                case '<=': passed = value <= expectation.threshold; break;
                case '>': passed = value > expectation.threshold; break;
                case '>=': passed = value >= expectation.threshold; break;
                case '==': passed = value === expectation.threshold; break;
                default: passed = false;
            }

            return {
                metric: expectation.metric,
                expected: `${expectation.operator} ${expectation.threshold}`,
                actual: value,
                passed
            };
        });

        return {
            hypothesisName: this.name,
            allPassed: results.every(r => r.passed),
            details: results
        };
    }
}

// Demonstration
console.log('=== Chaos Testing Demo ===\n');

// Create chaos engine
const engine = new ChaosEngine();

// Define steady state hypothesis
const hypothesis = new SteadyStateHypothesis('Payment Service Resilience');
hypothesis.addExpectation('errorRate', '<', 0.05);
hypothesis.addExpectation('p99Latency', '<', 500);
hypothesis.addExpectation('availability', '>=', 0.95);

// Create chaos experiment
const experiment = new ChaosExperiment({
    name: 'Database Latency Injection',
    description: 'Inject latency into database calls to test circuit breaker',
    hypothesis: 'Payment service should remain available with degraded performance when database is slow',
    targetService: 'payment-service',
    faultType: 'latency',
    duration: 5000,
    rollbackPlan: async () => {
        console.log('Rolling back: Restoring database connectivity');
    }
});

// Validate safety
experiment.validateSafety();

// Create and run a game day
const gameDay = new GameDay('Q1 Resilience Testing', new Date().toISOString());
gameDay.addExperiment(experiment);
gameDay.addParticipant({ name: 'SRE Team', role: 'observer' });
gameDay.addParticipant({ name: 'Dev Team', role: 'responder' });

// Run game day (simplified for demo)
console.log('\nGame Day Summary:');
console.log(`  Name: ${gameDay.name}`);
console.log(`  Experiments: ${gameDay.experiments.length}`);
console.log(`  Participants: ${gameDay.participants.length}`);

/**
 * Best Practices for Chaos Testing:
 *
 * 1. Start small - begin with non-critical environments and limited blast radius
 * 2. Define clear hypotheses before running experiments
 * 3. Always have rollback plans ready before injecting faults
 * 4. Implement comprehensive monitoring and observability
 * 5. Communicate chaos testing schedules to all stakeholders
 * 6. Gradually increase experiment complexity and scope
 * 7. Document learnings and track improvements over time
 * 8. Automate chaos experiments in CI/CD pipelines for regular testing
 * 9. Use circuit breakers, retries, and fallbacks based on findings
 * 10. Never run chaos experiments without team awareness and approval
 */
