/**
 * Load Testing - Evaluating Application Performance Under Load
 *
 * Load testing evaluates how an application performs under expected and
 * peak user loads. It simulates real-world usage by generating concurrent
 * users, transactions, or requests to identify performance bottlenecks,
 * system limitations, and potential failure points.
 *
 * Key Concepts:
 * - Baseline testing with minimal load
 * - Normal load testing with expected volumes
 * - Stress testing beyond normal capacity
 * - Spike testing with sudden load increases
 */

/**
 * LoadProfile defines the characteristics of a load test.
 * Specifies users, duration, and ramp-up patterns.
 */
class LoadProfile {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.type = options.type; // constant, ramp-up, spike, step
        this.virtualUsers = options.virtualUsers;
        this.duration = options.duration; // seconds
        this.rampUpTime = options.rampUpTime || 0; // seconds
        this.thinkTime = options.thinkTime || 1000; // ms between actions
    }

    /**
     * Gets the number of users at a specific time
     * @param {number} elapsedSeconds - Elapsed time
     * @returns {number} Number of users
     */
    getUsersAtTime(elapsedSeconds) {
        switch (this.type) {
            case 'constant':
                return this.virtualUsers;

            case 'ramp-up':
                if (elapsedSeconds < this.rampUpTime) {
                    return Math.floor(
                        (elapsedSeconds / this.rampUpTime) * this.virtualUsers
                    );
                }
                return this.virtualUsers;

            case 'spike':
                // Spike at midpoint
                const midpoint = this.duration / 2;
                if (Math.abs(elapsedSeconds - midpoint) < 10) {
                    return this.virtualUsers * 3;
                }
                return this.virtualUsers;

            case 'step':
                // Increase in steps
                const step = Math.floor(elapsedSeconds / (this.duration / 5));
                return Math.min(this.virtualUsers, Math.floor(this.virtualUsers * (step + 1) / 5));

            default:
                return this.virtualUsers;
        }
    }

    /**
     * Gets profile summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            name: this.name,
            type: this.type,
            virtualUsers: this.virtualUsers,
            duration: `${this.duration}s`,
            rampUpTime: `${this.rampUpTime}s`
        };
    }
}

/**
 * PerformanceMetrics collects and calculates load test metrics.
 * Tracks response times, throughput, and errors.
 */
class PerformanceMetrics {
    constructor() {
        this.responseTimes = [];
        this.errors = [];
        this.requestCount = 0;
        this.startTime = null;
        this.endTime = null;
    }

    /**
     * Starts metrics collection
     */
    start() {
        this.startTime = Date.now();
    }

    /**
     * Stops metrics collection
     */
    stop() {
        this.endTime = Date.now();
    }

    /**
     * Records a response
     * @param {number} responseTime - Response time in ms
     * @param {boolean} success - Whether request succeeded
     * @param {string} error - Error message if failed
     */
    recordResponse(responseTime, success, error = null) {
        this.requestCount++;
        this.responseTimes.push(responseTime);

        if (!success) {
            this.errors.push({
                timestamp: Date.now(),
                error,
                responseTime
            });
        }
    }

    /**
     * Calculates average response time
     * @returns {number} Average in ms
     */
    getAverageResponseTime() {
        if (this.responseTimes.length === 0) return 0;
        return this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length;
    }

    /**
     * Calculates percentile response time
     * @param {number} percentile - Percentile (0-100)
     * @returns {number} Response time at percentile
     */
    getPercentile(percentile) {
        if (this.responseTimes.length === 0) return 0;

        const sorted = [...this.responseTimes].sort((a, b) => a - b);
        const index = Math.ceil((percentile / 100) * sorted.length) - 1;
        return sorted[Math.max(0, index)];
    }

    /**
     * Calculates throughput (requests per second)
     * @returns {number} Throughput
     */
    getThroughput() {
        if (!this.startTime || !this.endTime) return 0;
        const durationSeconds = (this.endTime - this.startTime) / 1000;
        return this.requestCount / durationSeconds;
    }

    /**
     * Gets error rate
     * @returns {number} Error rate percentage
     */
    getErrorRate() {
        if (this.requestCount === 0) return 0;
        return (this.errors.length / this.requestCount) * 100;
    }

    /**
     * Gets metrics summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            totalRequests: this.requestCount,
            successfulRequests: this.requestCount - this.errors.length,
            failedRequests: this.errors.length,
            averageResponseTime: `${this.getAverageResponseTime().toFixed(2)}ms`,
            p50ResponseTime: `${this.getPercentile(50).toFixed(2)}ms`,
            p90ResponseTime: `${this.getPercentile(90).toFixed(2)}ms`,
            p95ResponseTime: `${this.getPercentile(95).toFixed(2)}ms`,
            p99ResponseTime: `${this.getPercentile(99).toFixed(2)}ms`,
            minResponseTime: `${Math.min(...this.responseTimes).toFixed(2)}ms`,
            maxResponseTime: `${Math.max(...this.responseTimes).toFixed(2)}ms`,
            throughput: `${this.getThroughput().toFixed(2)} req/s`,
            errorRate: `${this.getErrorRate().toFixed(2)}%`
        };
    }
}

/**
 * VirtualUser simulates a user making requests.
 * Executes scenarios with configurable behavior.
 */
class VirtualUser {
    constructor(id, scenario, metrics) {
        this.id = id;
        this.scenario = scenario;
        this.metrics = metrics;
        this.running = false;
        this.requestsMade = 0;
    }

    /**
     * Starts the virtual user
     * @param {number} thinkTime - Time between requests in ms
     */
    async start(thinkTime) {
        this.running = true;

        while (this.running) {
            await this.executeScenario();
            await this.sleep(thinkTime);
        }
    }

    /**
     * Stops the virtual user
     */
    stop() {
        this.running = false;
    }

    /**
     * Executes the test scenario
     */
    async executeScenario() {
        for (const step of this.scenario.steps) {
            if (!this.running) break;

            const startTime = Date.now();
            let success = true;
            let error = null;

            try {
                await this.executeStep(step);
            } catch (e) {
                success = false;
                error = e.message;
            }

            const responseTime = Date.now() - startTime;
            this.metrics.recordResponse(responseTime, success, error);
            this.requestsMade++;
        }
    }

    /**
     * Executes a single step
     * @param {Object} step - Step to execute
     */
    async executeStep(step) {
        // Simulate HTTP request with variable response time
        const baseTime = step.expectedResponseTime || 100;
        const variance = Math.random() * 50 - 25;
        await this.sleep(baseTime + variance);

        // Simulate occasional errors
        if (Math.random() < 0.01) {
            throw new Error('Simulated server error');
        }
    }

    /**
     * Sleeps for specified time
     * @param {number} ms - Milliseconds to sleep
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * LoadTestScenario defines the user journey to test.
 * Contains steps representing user actions.
 */
class LoadTestScenario {
    constructor(name) {
        this.name = name;
        this.steps = [];
    }

    /**
     * Adds a step to the scenario
     * @param {Object} step - Step definition
     */
    addStep(step) {
        this.steps.push({
            name: step.name,
            method: step.method || 'GET',
            endpoint: step.endpoint,
            expectedResponseTime: step.expectedResponseTime || 100,
            assertions: step.assertions || []
        });
    }

    /**
     * Gets scenario summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            name: this.name,
            steps: this.steps.length,
            endpoints: this.steps.map(s => s.endpoint)
        };
    }
}

/**
 * LoadTestRunner orchestrates load test execution.
 * Manages virtual users and collects results.
 */
class LoadTestRunner {
    constructor() {
        this.metrics = new PerformanceMetrics();
        this.virtualUsers = [];
        this.running = false;
    }

    /**
     * Runs a load test
     * @param {LoadTestScenario} scenario - Scenario to run
     * @param {LoadProfile} profile - Load profile to use
     * @returns {Promise<Object>} Test results
     */
    async run(scenario, profile) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Load Test: ${scenario.name}`);
        console.log(`Profile: ${profile.name} (${profile.type})`);
        console.log(`${'='.repeat(50)}`);

        this.running = true;
        this.metrics = new PerformanceMetrics();
        this.metrics.start();

        // Create virtual users
        for (let i = 0; i < profile.virtualUsers; i++) {
            const vu = new VirtualUser(i, scenario, this.metrics);
            this.virtualUsers.push(vu);
        }

        // Start virtual users with staggered ramp-up
        const startPromises = this.virtualUsers.map((vu, index) => {
            const delay = (profile.rampUpTime * 1000 / profile.virtualUsers) * index;
            return new Promise(resolve => {
                setTimeout(() => {
                    vu.start(profile.thinkTime);
                    resolve();
                }, delay);
            });
        });

        // Run for specified duration
        console.log(`\nRunning for ${profile.duration} seconds...`);

        await Promise.all(startPromises);

        // Wait for duration
        await this.sleep(profile.duration * 1000);

        // Stop all virtual users
        this.running = false;
        this.virtualUsers.forEach(vu => vu.stop());
        this.metrics.stop();

        return this.generateReport(scenario, profile);
    }

    /**
     * Generates test report
     * @param {LoadTestScenario} scenario - Test scenario
     * @param {LoadProfile} profile - Load profile
     * @returns {Object} Test report
     */
    generateReport(scenario, profile) {
        const metrics = this.metrics.getSummary();

        return {
            scenario: scenario.name,
            profile: profile.getSummary(),
            metrics,
            status: this.determineStatus(metrics),
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Determines test status based on metrics
     * @param {Object} metrics - Metrics summary
     * @returns {string} Status
     */
    determineStatus(metrics) {
        const errorRate = parseFloat(metrics.errorRate);
        const p95 = parseFloat(metrics.p95ResponseTime);

        if (errorRate > 5) return 'FAILED';
        if (errorRate > 1 || p95 > 1000) return 'WARNING';
        return 'PASSED';
    }

    /**
     * Sleeps for specified time
     * @param {number} ms - Milliseconds
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * PerformanceBaseline stores and compares performance baselines.
 * Helps detect performance regressions.
 */
class PerformanceBaseline {
    constructor() {
        this.baselines = new Map();
    }

    /**
     * Records a baseline
     * @param {string} name - Baseline name
     * @param {Object} metrics - Metrics to record
     */
    record(name, metrics) {
        this.baselines.set(name, {
            metrics,
            recordedAt: new Date()
        });
    }

    /**
     * Compares metrics against baseline
     * @param {string} name - Baseline name
     * @param {Object} currentMetrics - Current metrics
     * @returns {Object} Comparison result
     */
    compare(name, currentMetrics) {
        const baseline = this.baselines.get(name);
        if (!baseline) {
            return { hasBaseline: false };
        }

        const baselineMetrics = baseline.metrics;
        const comparison = {};

        // Compare key metrics
        const keysToCompare = [
            'averageResponseTime',
            'p95ResponseTime',
            'throughput',
            'errorRate'
        ];

        for (const key of keysToCompare) {
            const baseValue = parseFloat(baselineMetrics[key]);
            const currentValue = parseFloat(currentMetrics[key]);

            if (!isNaN(baseValue) && !isNaN(currentValue)) {
                const change = ((currentValue - baseValue) / baseValue) * 100;
                comparison[key] = {
                    baseline: baselineMetrics[key],
                    current: currentMetrics[key],
                    change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
                    regression: key !== 'throughput' ? change > 10 : change < -10
                };
            }
        }

        const hasRegression = Object.values(comparison).some(c => c.regression);

        return {
            hasBaseline: true,
            comparison,
            hasRegression,
            recommendation: hasRegression
                ? 'Performance regression detected - investigate'
                : 'Performance within acceptable range'
        };
    }
}

/**
 * LoadTestReporter formats and outputs load test results.
 */
class LoadTestReporter {
    /**
     * Generates console report
     * @param {Object} report - Test report
     */
    static consoleReport(report) {
        console.log('\n' + '='.repeat(60));
        console.log('LOAD TEST REPORT');
        console.log('='.repeat(60));

        console.log(`\nScenario: ${report.scenario}`);
        console.log(`Status: ${report.status}`);
        console.log(`Timestamp: ${report.timestamp}`);

        console.log('\n--- Profile ---');
        Object.entries(report.profile).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });

        console.log('\n--- Metrics ---');
        Object.entries(report.metrics).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });

        console.log('\n' + '='.repeat(60));
    }
}

// Demonstration
console.log('=== Load Testing Demo ===\n');

// Create test scenario
const checkoutScenario = new LoadTestScenario('E-commerce Checkout Flow');

checkoutScenario.addStep({
    name: 'View Product',
    method: 'GET',
    endpoint: '/api/products/123',
    expectedResponseTime: 50
});

checkoutScenario.addStep({
    name: 'Add to Cart',
    method: 'POST',
    endpoint: '/api/cart/add',
    expectedResponseTime: 100
});

checkoutScenario.addStep({
    name: 'Checkout',
    method: 'POST',
    endpoint: '/api/checkout',
    expectedResponseTime: 200
});

console.log('Scenario:', checkoutScenario.getSummary());

// Create load profile
const normalLoad = new LoadProfile({
    name: 'Normal Load',
    description: 'Expected daily traffic',
    type: 'ramp-up',
    virtualUsers: 10,
    duration: 5,
    rampUpTime: 2,
    thinkTime: 500
});

const spikeLoad = new LoadProfile({
    name: 'Spike Test',
    description: 'Sudden traffic spike simulation',
    type: 'spike',
    virtualUsers: 20,
    duration: 5,
    thinkTime: 500
});

console.log('\nLoad Profiles:');
console.log('  Normal:', normalLoad.getSummary());
console.log('  Spike:', spikeLoad.getSummary());

// Run load test
const runner = new LoadTestRunner();

runner.run(checkoutScenario, normalLoad).then(report => {
    LoadTestReporter.consoleReport(report);

    // Record baseline
    const baseline = new PerformanceBaseline();
    baseline.record('checkout-normal', report.metrics);

    // Simulate comparison with degraded performance
    console.log('\n--- Baseline Comparison ---');
    const degradedMetrics = {
        averageResponseTime: '200ms',
        p95ResponseTime: '500ms',
        throughput: '15 req/s',
        errorRate: '2%'
    };

    console.log('Comparison:', baseline.compare('checkout-normal', degradedMetrics));
});

/**
 * Best Practices for Load Testing:
 *
 * 1. Define clear performance objectives (SLAs)
 * 2. Use realistic test data and scenarios
 * 3. Mirror production environment as closely as possible
 * 4. Start with baseline tests before complex scenarios
 * 5. Monitor system resources during tests
 * 6. Integrate load tests into CI/CD pipelines
 * 7. Test during off-peak hours if using production
 * 8. Document and track performance baselines
 * 9. Investigate and fix bottlenecks systematically
 * 10. Plan for capacity based on growth projections
 */
