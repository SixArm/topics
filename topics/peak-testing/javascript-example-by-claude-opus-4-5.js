/**
 * Peak Testing - Extreme Load Performance Evaluation
 *
 * Peak testing evaluates system performance during extreme usage patterns,
 * high user volumes, and resource-intensive operations that occur during
 * peak business hours or high-traffic periods. It identifies bottlenecks,
 * memory leaks, crashes, and degraded performance under extreme conditions.
 *
 * Key Concepts:
 * - Simulates maximum expected load
 * - Identifies system breaking points
 * - Measures response under extreme conditions
 * - Validates capacity and scalability
 */

/**
 * LoadProfile defines a traffic pattern for testing.
 * Models different types of peak scenarios.
 */
class LoadProfile {
    constructor(options) {
        this.name = options.name;
        this.baselineUsers = options.baselineUsers || 100;
        this.peakUsers = options.peakUsers || 1000;
        this.rampUpTime = options.rampUpTime || 60; // seconds
        this.peakDuration = options.peakDuration || 300; // seconds
        this.rampDownTime = options.rampDownTime || 60; // seconds
    }

    /**
     * Gets user count at a specific time
     * @param {number} elapsedSeconds - Seconds since test start
     * @returns {number} Current user count
     */
    getUsersAt(elapsedSeconds) {
        // Ramp up phase
        if (elapsedSeconds < this.rampUpTime) {
            const progress = elapsedSeconds / this.rampUpTime;
            return Math.floor(this.baselineUsers + (this.peakUsers - this.baselineUsers) * progress);
        }

        // Peak phase
        if (elapsedSeconds < this.rampUpTime + this.peakDuration) {
            return this.peakUsers;
        }

        // Ramp down phase
        if (elapsedSeconds < this.rampUpTime + this.peakDuration + this.rampDownTime) {
            const rampDownStart = this.rampUpTime + this.peakDuration;
            const progress = (elapsedSeconds - rampDownStart) / this.rampDownTime;
            return Math.floor(this.peakUsers - (this.peakUsers - this.baselineUsers) * progress);
        }

        // Post-peak
        return this.baselineUsers;
    }

    /**
     * Gets total test duration
     * @returns {number} Duration in seconds
     */
    getTotalDuration() {
        return this.rampUpTime + this.peakDuration + this.rampDownTime;
    }

    /**
     * Gets profile description
     * @returns {Object} Description
     */
    describe() {
        return {
            name: this.name,
            baseline: `${this.baselineUsers} users`,
            peak: `${this.peakUsers} users`,
            duration: `${this.getTotalDuration()} seconds`,
            phases: {
                rampUp: `${this.rampUpTime}s`,
                peak: `${this.peakDuration}s`,
                rampDown: `${this.rampDownTime}s`
            }
        };
    }
}

/**
 * PeakScenario defines specific peak testing scenarios.
 */
class PeakScenario {
    static scenarios = {
        blackFriday: {
            name: 'Black Friday Rush',
            description: 'Sudden massive traffic spike',
            profile: {
                baselineUsers: 1000,
                peakUsers: 50000,
                rampUpTime: 30, // Very fast ramp
                peakDuration: 3600, // 1 hour
                rampDownTime: 1800
            }
        },
        morningPeak: {
            name: 'Morning Peak',
            description: 'Gradual increase during business hours',
            profile: {
                baselineUsers: 500,
                peakUsers: 5000,
                rampUpTime: 3600, // Slow ramp over 1 hour
                peakDuration: 7200, // 2 hours
                rampDownTime: 3600
            }
        },
        flashSale: {
            name: 'Flash Sale',
            description: 'Extremely sudden spike for limited time',
            profile: {
                baselineUsers: 1000,
                peakUsers: 100000,
                rampUpTime: 5, // Nearly instant
                peakDuration: 300, // 5 minutes
                rampDownTime: 600
            }
        },
        apiLaunch: {
            name: 'API Launch',
            description: 'New feature launch traffic pattern',
            profile: {
                baselineUsers: 2000,
                peakUsers: 20000,
                rampUpTime: 600,
                peakDuration: 1800,
                rampDownTime: 1200
            }
        }
    };

    /**
     * Gets a predefined scenario
     * @param {string} name - Scenario name
     * @returns {LoadProfile} Load profile
     */
    static get(name) {
        const scenario = this.scenarios[name];
        if (!scenario) return null;
        return new LoadProfile({
            name: scenario.name,
            ...scenario.profile
        });
    }

    /**
     * Gets all available scenarios
     * @returns {Object} All scenarios
     */
    static getAll() {
        return Object.entries(this.scenarios).map(([key, scenario]) => ({
            id: key,
            name: scenario.name,
            description: scenario.description
        }));
    }
}

/**
 * MetricsCollector collects performance metrics during peak test.
 */
class MetricsCollector {
    constructor() {
        this.metrics = [];
        this.startTime = null;
    }

    /**
     * Starts metrics collection
     */
    start() {
        this.startTime = Date.now();
        this.metrics = [];
    }

    /**
     * Records a metric sample
     * @param {Object} sample - Metric sample
     */
    record(sample) {
        this.metrics.push({
            timestamp: Date.now() - this.startTime,
            ...sample
        });
    }

    /**
     * Gets metrics summary
     * @returns {Object} Summary
     */
    getSummary() {
        if (this.metrics.length === 0) return null;

        const responseTimes = this.metrics.map(m => m.responseTime).filter(Boolean);
        const throughputs = this.metrics.map(m => m.throughput).filter(Boolean);
        const errorRates = this.metrics.map(m => m.errorRate).filter(Boolean);

        return {
            samples: this.metrics.length,
            responseTime: this.calculateStats(responseTimes),
            throughput: this.calculateStats(throughputs),
            errorRate: this.calculateStats(errorRates),
            peakResponseTime: Math.max(...responseTimes),
            minThroughput: Math.min(...throughputs),
            maxErrorRate: Math.max(...errorRates)
        };
    }

    /**
     * Calculates statistics for an array
     * @param {Array} values - Numeric values
     * @returns {Object} Statistics
     */
    calculateStats(values) {
        if (values.length === 0) return null;

        const sorted = [...values].sort((a, b) => a - b);
        const sum = sorted.reduce((a, b) => a + b, 0);

        return {
            min: sorted[0].toFixed(2),
            max: sorted[sorted.length - 1].toFixed(2),
            avg: (sum / sorted.length).toFixed(2),
            p50: sorted[Math.floor(sorted.length * 0.5)].toFixed(2),
            p95: sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
            p99: sorted[Math.floor(sorted.length * 0.99)].toFixed(2)
        };
    }

    /**
     * Identifies performance degradation points
     * @param {Object} thresholds - Acceptable thresholds
     * @returns {Array} Degradation events
     */
    findDegradationPoints(thresholds) {
        const degradations = [];

        for (let i = 0; i < this.metrics.length; i++) {
            const m = this.metrics[i];

            if (m.responseTime > thresholds.maxResponseTime) {
                degradations.push({
                    type: 'response_time',
                    timestamp: m.timestamp,
                    value: m.responseTime,
                    threshold: thresholds.maxResponseTime
                });
            }

            if (m.errorRate > thresholds.maxErrorRate) {
                degradations.push({
                    type: 'error_rate',
                    timestamp: m.timestamp,
                    value: m.errorRate,
                    threshold: thresholds.maxErrorRate
                });
            }
        }

        return degradations;
    }
}

/**
 * PeakTestRunner executes peak load tests.
 */
class PeakTestRunner {
    constructor(options = {}) {
        this.collector = new MetricsCollector();
        this.thresholds = options.thresholds || {
            maxResponseTime: 2000, // 2 seconds
            maxErrorRate: 1, // 1%
            minThroughput: 100 // requests per second
        };
    }

    /**
     * Runs a peak test (simulated)
     * @param {LoadProfile} profile - Load profile to use
     * @returns {Object} Test results
     */
    run(profile) {
        console.log(`Running peak test: ${profile.name}`);
        console.log(`Peak users: ${profile.peakUsers}, Duration: ${profile.getTotalDuration()}s`);

        this.collector.start();

        // Simulate test execution at various points
        const totalDuration = profile.getTotalDuration();
        const sampleInterval = Math.max(1, Math.floor(totalDuration / 100));

        for (let t = 0; t <= totalDuration; t += sampleInterval) {
            const users = profile.getUsersAt(t);
            const metrics = this.simulateMetrics(users, profile.peakUsers);
            this.collector.record({ ...metrics, users, elapsed: t });
        }

        return this.generateReport(profile);
    }

    /**
     * Simulates performance metrics based on load
     * @param {number} currentUsers - Current user count
     * @param {number} peakUsers - Maximum users
     * @returns {Object} Simulated metrics
     */
    simulateMetrics(currentUsers, peakUsers) {
        const loadFactor = currentUsers / peakUsers;

        // Simulate degradation under load
        const baseResponseTime = 100;
        const responseTime = baseResponseTime * (1 + loadFactor * 5 + Math.random() * 50);

        const baseThroughput = 1000;
        const throughput = Math.max(50, baseThroughput * (1 - loadFactor * 0.5) + Math.random() * 100);

        const baseErrorRate = 0.1;
        const errorRate = baseErrorRate + loadFactor * loadFactor * 5 + Math.random() * 0.5;

        const cpuUsage = Math.min(100, 20 + loadFactor * 70 + Math.random() * 10);
        const memoryUsage = Math.min(100, 30 + loadFactor * 50 + Math.random() * 5);

        return {
            responseTime,
            throughput,
            errorRate,
            cpuUsage,
            memoryUsage
        };
    }

    /**
     * Generates test report
     * @param {LoadProfile} profile - Used profile
     * @returns {Object} Report
     */
    generateReport(profile) {
        const summary = this.collector.getSummary();
        const degradations = this.collector.findDegradationPoints(this.thresholds);

        const passed = degradations.length === 0;

        return {
            profile: profile.describe(),
            summary,
            thresholds: this.thresholds,
            degradations: degradations.length,
            sampleDegradations: degradations.slice(0, 5),
            result: passed ? 'PASSED' : 'FAILED',
            recommendations: this.generateRecommendations(summary, degradations)
        };
    }

    /**
     * Generates recommendations based on results
     * @param {Object} summary - Metrics summary
     * @param {Array} degradations - Degradation events
     * @returns {Array} Recommendations
     */
    generateRecommendations(summary, degradations) {
        const recommendations = [];

        if (parseFloat(summary.responseTime.p95) > this.thresholds.maxResponseTime) {
            recommendations.push({
                issue: 'High P95 response time',
                suggestion: 'Optimize slow database queries, add caching, or scale horizontally'
            });
        }

        if (parseFloat(summary.errorRate.max) > this.thresholds.maxErrorRate) {
            recommendations.push({
                issue: 'Error rate exceeded threshold',
                suggestion: 'Investigate error patterns, add circuit breakers, improve error handling'
            });
        }

        const responseDegraded = degradations.filter(d => d.type === 'response_time').length;
        if (responseDegraded > degradations.length * 0.3) {
            recommendations.push({
                issue: 'Response time degradation during peak',
                suggestion: 'Consider auto-scaling, load balancing improvements'
            });
        }

        return recommendations;
    }
}

/**
 * CapacityPlanner uses peak test results for capacity planning.
 */
class CapacityPlanner {
    /**
     * Estimates required capacity for target load
     * @param {Object} baselineMetrics - Metrics at baseline load
     * @param {number} targetUsers - Target user count
     * @returns {Object} Capacity estimate
     */
    static estimateCapacity(baselineMetrics, targetUsers) {
        const { users, responseTime, throughput, cpuUsage, memoryUsage } = baselineMetrics;

        const scaleFactor = targetUsers / users;

        return {
            targetUsers,
            estimatedResponseTime: (responseTime * Math.pow(scaleFactor, 0.5)).toFixed(2) + 'ms',
            estimatedThroughput: (throughput * Math.pow(scaleFactor, 0.8)).toFixed(2) + '/s',
            estimatedCPU: Math.min(100, cpuUsage * scaleFactor).toFixed(1) + '%',
            estimatedMemory: Math.min(100, memoryUsage * Math.pow(scaleFactor, 0.7)).toFixed(1) + '%',
            horizontalScaling: Math.ceil(scaleFactor),
            warning: scaleFactor > 3 ? 'High scale factor - consider architectural changes' : null
        };
    }

    /**
     * Calculates breaking point estimate
     * @param {Array} testResults - Results at different load levels
     * @returns {Object} Breaking point analysis
     */
    static estimateBreakingPoint(testResults) {
        // Find where error rate starts climbing significantly
        let breakingPoint = null;

        for (let i = 1; i < testResults.length; i++) {
            const prev = testResults[i - 1];
            const curr = testResults[i];

            if (curr.errorRate > prev.errorRate * 2 && curr.errorRate > 1) {
                breakingPoint = prev.users;
                break;
            }
        }

        return {
            estimatedBreakingPoint: breakingPoint || 'Not reached',
            safeCapacity: breakingPoint ? Math.floor(breakingPoint * 0.8) : 'Unknown',
            recommendation: 'Plan capacity at 80% of breaking point for safety margin'
        };
    }
}

// Demonstration
console.log('=== Peak Testing Demo ===\n');

// Available scenarios
console.log('--- Available Peak Scenarios ---');
PeakScenario.getAll().forEach(s => {
    console.log(`${s.id}: ${s.name} - ${s.description}`);
});

// Create and run a peak test
console.log('\n--- Running Black Friday Scenario ---');
const blackFriday = PeakScenario.get('blackFriday');
console.log('Profile:', blackFriday.describe());

const runner = new PeakTestRunner({
    thresholds: {
        maxResponseTime: 2000,
        maxErrorRate: 2,
        minThroughput: 100
    }
});

const results = runner.run(blackFriday);
console.log('\n--- Test Results ---');
console.log('Result:', results.result);
console.log('Response Time Stats:', results.summary.responseTime);
console.log('Error Rate Stats:', results.summary.errorRate);
console.log('Degradation Events:', results.degradations);

// Recommendations
console.log('\n--- Recommendations ---');
results.recommendations.forEach(rec => {
    console.log(`Issue: ${rec.issue}`);
    console.log(`  Suggestion: ${rec.suggestion}`);
});

// Capacity planning
console.log('\n--- Capacity Planning ---');
console.log(CapacityPlanner.estimateCapacity({
    users: 1000,
    responseTime: 150,
    throughput: 500,
    cpuUsage: 40,
    memoryUsage: 50
}, 10000));

/**
 * Best Practices for Peak Testing:
 *
 * 1. Use production-like environments for accurate results
 * 2. Test with realistic user scenarios and data
 * 3. Monitor all system components during tests
 * 4. Start with baseline and gradually increase load
 * 5. Run tests at different times to catch variations
 * 6. Document and version test profiles
 * 7. Set clear pass/fail thresholds before testing
 * 8. Include warm-up period before peak load
 * 9. Test recovery behavior after peak subsides
 * 10. Use results for capacity planning and scaling
 */
