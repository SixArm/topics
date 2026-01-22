/**
 * Performance Testing - System Performance Evaluation
 *
 * Performance testing measures application responsiveness and stability under
 * specific workloads. It identifies bottlenecks, determines system limitations,
 * and ensures applications meet required performance standards. Types include
 * load testing, stress testing, endurance testing, and spike testing.
 *
 * Key Concepts:
 * - Response time, throughput, resource utilization
 * - Load testing: Normal and peak load behavior
 * - Stress testing: Beyond capacity behavior
 * - Endurance testing: Extended period performance
 */

/**
 * PerformanceMetric represents a measurable performance indicator.
 */
class PerformanceMetric {
    constructor(name, unit) {
        this.name = name;
        this.unit = unit;
        this.samples = [];
    }

    /**
     * Records a sample value
     * @param {number} value - Sample value
     * @param {number} timestamp - Sample timestamp
     */
    record(value, timestamp = Date.now()) {
        this.samples.push({ value, timestamp });
    }

    /**
     * Gets statistical summary
     * @returns {Object} Statistics
     */
    getStatistics() {
        if (this.samples.length === 0) return null;

        const values = this.samples.map(s => s.value);
        const sorted = [...values].sort((a, b) => a - b);
        const sum = values.reduce((a, b) => a + b, 0);
        const n = values.length;

        return {
            name: this.name,
            unit: this.unit,
            count: n,
            min: sorted[0],
            max: sorted[n - 1],
            mean: sum / n,
            median: sorted[Math.floor(n / 2)],
            p90: sorted[Math.floor(n * 0.9)],
            p95: sorted[Math.floor(n * 0.95)],
            p99: sorted[Math.floor(n * 0.99)],
            stdDev: this.calculateStdDev(values, sum / n)
        };
    }

    /**
     * Calculates standard deviation
     * @param {Array} values - Sample values
     * @param {number} mean - Mean value
     * @returns {number} Standard deviation
     */
    calculateStdDev(values, mean) {
        const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
        const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
        return Math.sqrt(variance);
    }
}

/**
 * PerformanceTestConfig defines test configuration.
 */
class PerformanceTestConfig {
    constructor(options) {
        this.name = options.name;
        this.type = options.type; // load, stress, endurance, spike
        this.duration = options.duration; // seconds
        this.virtualUsers = options.virtualUsers;
        this.rampUp = options.rampUp || 0;
        this.targetRPS = options.targetRPS; // requests per second
        this.thresholds = options.thresholds || {};
        this.scenarios = options.scenarios || [];
    }

    /**
     * Validates configuration
     * @returns {Object} Validation result
     */
    validate() {
        const errors = [];

        if (!this.name) errors.push('Name is required');
        if (!this.type) errors.push('Type is required');
        if (this.duration <= 0) errors.push('Duration must be positive');
        if (this.virtualUsers <= 0) errors.push('Virtual users must be positive');

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Gets configuration summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            name: this.name,
            type: this.type,
            duration: `${this.duration} seconds`,
            virtualUsers: this.virtualUsers,
            targetRPS: this.targetRPS,
            scenarios: this.scenarios.length
        };
    }
}

/**
 * VirtualUser simulates a user interacting with the system.
 */
class VirtualUser {
    constructor(id, scenarios) {
        this.id = id;
        this.scenarios = scenarios;
        this.requests = [];
        this.errors = [];
    }

    /**
     * Executes a request (simulated)
     * @param {Object} scenario - Scenario to execute
     * @returns {Object} Request result
     */
    async executeRequest(scenario) {
        const startTime = Date.now();

        try {
            // Simulate request execution
            const responseTime = this.simulateResponseTime(scenario);
            const success = this.simulateSuccess(scenario);

            const result = {
                userId: this.id,
                scenario: scenario.name,
                startTime,
                responseTime,
                success,
                statusCode: success ? 200 : 500
            };

            this.requests.push(result);

            if (!success) {
                this.errors.push({
                    ...result,
                    error: 'Simulated error'
                });
            }

            return result;
        } catch (error) {
            const result = {
                userId: this.id,
                scenario: scenario.name,
                startTime,
                responseTime: Date.now() - startTime,
                success: false,
                error: error.message
            };

            this.requests.push(result);
            this.errors.push(result);
            return result;
        }
    }

    /**
     * Simulates response time
     * @param {Object} scenario - Request scenario
     * @returns {number} Response time in ms
     */
    simulateResponseTime(scenario) {
        const baseTime = scenario.expectedResponseTime || 100;
        const variance = baseTime * 0.3;
        return Math.max(10, baseTime + (Math.random() - 0.5) * variance);
    }

    /**
     * Simulates success/failure
     * @param {Object} scenario - Request scenario
     * @returns {boolean} Success status
     */
    simulateSuccess(scenario) {
        const successRate = scenario.expectedSuccessRate || 0.99;
        return Math.random() < successRate;
    }

    /**
     * Gets user statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const successful = this.requests.filter(r => r.success).length;
        const responseTimes = this.requests.map(r => r.responseTime);

        return {
            userId: this.id,
            totalRequests: this.requests.length,
            successful,
            failed: this.errors.length,
            avgResponseTime: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        };
    }
}

/**
 * PerformanceTestRunner executes performance tests.
 */
class PerformanceTestRunner {
    constructor(config) {
        this.config = config;
        this.users = [];
        this.metrics = {
            responseTime: new PerformanceMetric('Response Time', 'ms'),
            throughput: new PerformanceMetric('Throughput', 'req/s'),
            errorRate: new PerformanceMetric('Error Rate', '%'),
            concurrentUsers: new PerformanceMetric('Concurrent Users', 'users')
        };
        this.startTime = null;
        this.endTime = null;
    }

    /**
     * Runs the performance test
     * @returns {Object} Test results
     */
    async run() {
        console.log(`Starting ${this.config.type} test: ${this.config.name}`);

        this.startTime = Date.now();
        this.users = [];

        // Create virtual users
        for (let i = 0; i < this.config.virtualUsers; i++) {
            this.users.push(new VirtualUser(i + 1, this.config.scenarios));
        }

        // Simulate test execution
        await this.executeTestCycles();

        this.endTime = Date.now();

        return this.generateResults();
    }

    /**
     * Executes test cycles
     */
    async executeTestCycles() {
        const cycles = Math.min(this.config.duration, 10); // Simulate cycles

        for (let cycle = 0; cycle < cycles; cycle++) {
            const activeUsers = this.calculateActiveUsers(cycle, cycles);

            let requestsThisCycle = 0;
            let errorsThisCycle = 0;
            let totalResponseTime = 0;

            // Each active user makes requests
            for (let i = 0; i < activeUsers; i++) {
                const user = this.users[i % this.users.length];
                const scenario = this.config.scenarios[cycle % this.config.scenarios.length] || {
                    name: 'default',
                    expectedResponseTime: 100,
                    expectedSuccessRate: 0.99
                };

                const result = await user.executeRequest(scenario);
                requestsThisCycle++;
                totalResponseTime += result.responseTime;

                if (!result.success) errorsThisCycle++;

                this.metrics.responseTime.record(result.responseTime);
            }

            // Record cycle metrics
            this.metrics.throughput.record(requestsThisCycle);
            this.metrics.errorRate.record((errorsThisCycle / requestsThisCycle) * 100);
            this.metrics.concurrentUsers.record(activeUsers);
        }
    }

    /**
     * Calculates active users based on ramp-up
     * @param {number} cycle - Current cycle
     * @param {number} totalCycles - Total cycles
     * @returns {number} Active users
     */
    calculateActiveUsers(cycle, totalCycles) {
        const rampUpCycles = Math.floor(totalCycles * (this.config.rampUp / this.config.duration));

        if (cycle < rampUpCycles) {
            return Math.ceil(this.config.virtualUsers * ((cycle + 1) / rampUpCycles));
        }
        return this.config.virtualUsers;
    }

    /**
     * Generates test results
     * @returns {Object} Results
     */
    generateResults() {
        const responseTimeStats = this.metrics.responseTime.getStatistics();
        const throughputStats = this.metrics.throughput.getStatistics();
        const errorRateStats = this.metrics.errorRate.getStatistics();

        // Evaluate against thresholds
        const thresholdResults = this.evaluateThresholds({
            responseTimeP95: responseTimeStats.p95,
            errorRate: errorRateStats.mean,
            throughput: throughputStats.mean
        });

        return {
            config: this.config.getSummary(),
            duration: {
                actual: `${(this.endTime - this.startTime) / 1000} seconds`,
                configured: `${this.config.duration} seconds`
            },
            metrics: {
                responseTime: responseTimeStats,
                throughput: throughputStats,
                errorRate: errorRateStats
            },
            thresholds: thresholdResults,
            passed: thresholdResults.passed,
            summary: this.generateSummary(responseTimeStats, throughputStats, errorRateStats)
        };
    }

    /**
     * Evaluates results against thresholds
     * @param {Object} actual - Actual values
     * @returns {Object} Threshold evaluation
     */
    evaluateThresholds(actual) {
        const results = [];
        const thresholds = this.config.thresholds;

        if (thresholds.maxResponseTimeP95) {
            results.push({
                metric: 'Response Time P95',
                threshold: thresholds.maxResponseTimeP95,
                actual: actual.responseTimeP95,
                passed: actual.responseTimeP95 <= thresholds.maxResponseTimeP95
            });
        }

        if (thresholds.maxErrorRate) {
            results.push({
                metric: 'Error Rate',
                threshold: thresholds.maxErrorRate,
                actual: actual.errorRate,
                passed: actual.errorRate <= thresholds.maxErrorRate
            });
        }

        if (thresholds.minThroughput) {
            results.push({
                metric: 'Throughput',
                threshold: thresholds.minThroughput,
                actual: actual.throughput,
                passed: actual.throughput >= thresholds.minThroughput
            });
        }

        return {
            results,
            passed: results.every(r => r.passed)
        };
    }

    /**
     * Generates human-readable summary
     * @param {Object} responseTime - Response time stats
     * @param {Object} throughput - Throughput stats
     * @param {Object} errorRate - Error rate stats
     * @returns {string} Summary
     */
    generateSummary(responseTime, throughput, errorRate) {
        return `Test completed with ${this.config.virtualUsers} virtual users. ` +
            `Average response time: ${responseTime.mean.toFixed(2)}ms (P95: ${responseTime.p95.toFixed(2)}ms). ` +
            `Throughput: ${throughput.mean.toFixed(2)} req/s. ` +
            `Error rate: ${errorRate.mean.toFixed(2)}%.`;
    }
}

/**
 * PerformanceTestFactory creates common test configurations.
 */
class PerformanceTestFactory {
    /**
     * Creates a load test configuration
     * @param {Object} options - Test options
     * @returns {PerformanceTestConfig} Configuration
     */
    static createLoadTest(options) {
        return new PerformanceTestConfig({
            name: options.name || 'Load Test',
            type: 'load',
            duration: options.duration || 300,
            virtualUsers: options.users || 100,
            rampUp: options.rampUp || 60,
            thresholds: {
                maxResponseTimeP95: options.maxResponseTimeP95 || 2000,
                maxErrorRate: options.maxErrorRate || 1,
                minThroughput: options.minThroughput || 50
            },
            scenarios: options.scenarios || []
        });
    }

    /**
     * Creates a stress test configuration
     * @param {Object} options - Test options
     * @returns {PerformanceTestConfig} Configuration
     */
    static createStressTest(options) {
        return new PerformanceTestConfig({
            name: options.name || 'Stress Test',
            type: 'stress',
            duration: options.duration || 600,
            virtualUsers: options.users || 500,
            rampUp: options.rampUp || 120,
            thresholds: {
                maxResponseTimeP95: options.maxResponseTimeP95 || 5000,
                maxErrorRate: options.maxErrorRate || 5
            },
            scenarios: options.scenarios || []
        });
    }

    /**
     * Creates a spike test configuration
     * @param {Object} options - Test options
     * @returns {PerformanceTestConfig} Configuration
     */
    static createSpikeTest(options) {
        return new PerformanceTestConfig({
            name: options.name || 'Spike Test',
            type: 'spike',
            duration: options.duration || 120,
            virtualUsers: options.users || 1000,
            rampUp: options.rampUp || 5, // Very fast ramp
            thresholds: {
                maxErrorRate: options.maxErrorRate || 10
            },
            scenarios: options.scenarios || []
        });
    }
}

// Demonstration
console.log('=== Performance Testing Demo ===\n');

// Create test scenarios
const scenarios = [
    { name: 'Homepage Load', expectedResponseTime: 200, expectedSuccessRate: 0.99 },
    { name: 'Search Query', expectedResponseTime: 500, expectedSuccessRate: 0.98 },
    { name: 'Product Page', expectedResponseTime: 300, expectedSuccessRate: 0.99 },
    { name: 'Add to Cart', expectedResponseTime: 400, expectedSuccessRate: 0.97 }
];

// Create load test
console.log('--- Load Test ---');
const loadConfig = PerformanceTestFactory.createLoadTest({
    name: 'E-commerce Load Test',
    users: 50,
    duration: 10,
    scenarios
});

console.log('Configuration:', loadConfig.getSummary());

const loadRunner = new PerformanceTestRunner(loadConfig);
loadRunner.run().then(results => {
    console.log('\nLoad Test Results:');
    console.log('Passed:', results.passed);
    console.log('Response Time:', results.metrics.responseTime);
    console.log('Summary:', results.summary);
});

// Create stress test
console.log('\n--- Stress Test ---');
const stressConfig = PerformanceTestFactory.createStressTest({
    name: 'E-commerce Stress Test',
    users: 200,
    duration: 10,
    scenarios
});

console.log('Configuration:', stressConfig.getSummary());

// Create spike test
console.log('\n--- Spike Test ---');
const spikeConfig = PerformanceTestFactory.createSpikeTest({
    name: 'Flash Sale Spike Test',
    users: 500,
    duration: 5,
    scenarios
});

console.log('Configuration:', spikeConfig.getSummary());

/**
 * Best Practices for Performance Testing:
 *
 * 1. Define clear performance requirements and thresholds
 * 2. Use production-like test environments
 * 3. Start with baseline tests before stress tests
 * 4. Monitor all system components (app, DB, network)
 * 5. Use realistic test data and user scenarios
 * 6. Include think time between user actions
 * 7. Run tests multiple times for consistency
 * 8. Document and version test configurations
 * 9. Analyze trends over multiple test runs
 * 10. Integrate performance tests into CI/CD pipeline
 */
