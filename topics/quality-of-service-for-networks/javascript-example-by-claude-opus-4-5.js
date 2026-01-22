/**
 * Quality of Service (QoS) for Networks - Traffic Management
 *
 * Quality of Service (QoS) refers to prioritizing and managing network traffic
 * to ensure critical applications receive necessary resources. QoS mechanisms
 * include traffic shaping, congestion avoidance, and packet scheduling to
 * maintain performance standards for latency-sensitive applications.
 *
 * Key Concepts:
 * - Traffic classification and prioritization
 * - Bandwidth allocation and reservation
 * - Latency and jitter management
 * - Traffic shaping and policing
 */

/**
 * TrafficClass represents a category of network traffic.
 */
class TrafficClass {
    static classes = {
        realtime: {
            name: 'Real-time',
            description: 'Voice, video conferencing',
            priority: 1,
            latencyRequirement: '< 150ms',
            jitterTolerance: 'Low',
            packetLossTolerance: '< 0.1%',
            dscpValue: 46 // EF - Expedited Forwarding
        },
        interactive: {
            name: 'Interactive',
            description: 'Web browsing, transactions',
            priority: 2,
            latencyRequirement: '< 300ms',
            jitterTolerance: 'Medium',
            packetLossTolerance: '< 1%',
            dscpValue: 26 // AF31
        },
        streaming: {
            name: 'Streaming',
            description: 'Video streaming, downloads',
            priority: 3,
            latencyRequirement: '< 1000ms',
            jitterTolerance: 'Medium',
            packetLossTolerance: '< 2%',
            dscpValue: 18 // AF21
        },
        bulk: {
            name: 'Bulk',
            description: 'Backups, updates, file transfers',
            priority: 4,
            latencyRequirement: 'Best effort',
            jitterTolerance: 'High',
            packetLossTolerance: '< 5%',
            dscpValue: 10 // AF11
        },
        bestEffort: {
            name: 'Best Effort',
            description: 'Default traffic',
            priority: 5,
            latencyRequirement: 'No guarantee',
            jitterTolerance: 'High',
            packetLossTolerance: 'No guarantee',
            dscpValue: 0 // BE
        }
    };

    /**
     * Gets traffic class by name
     * @param {string} name - Class name
     * @returns {Object} Traffic class
     */
    static getClass(name) {
        return this.classes[name.toLowerCase()];
    }

    /**
     * Classifies traffic based on application
     * @param {string} application - Application type
     * @returns {Object} Recommended class
     */
    static classify(application) {
        const mappings = {
            'voip': 'realtime',
            'video-call': 'realtime',
            'gaming': 'realtime',
            'web': 'interactive',
            'api': 'interactive',
            'database': 'interactive',
            'video-streaming': 'streaming',
            'music-streaming': 'streaming',
            'backup': 'bulk',
            'update': 'bulk',
            'email': 'bestEffort',
            'default': 'bestEffort'
        };

        const classKey = mappings[application.toLowerCase()] || 'bestEffort';
        return this.classes[classKey];
    }
}

/**
 * QoSPolicy defines traffic handling rules.
 */
class QoSPolicy {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.rules = [];
        this.defaultAction = options.defaultAction || 'best-effort';
    }

    /**
     * Adds a rule to the policy
     * @param {Object} rule - Rule definition
     */
    addRule(rule) {
        this.rules.push({
            id: rule.id || `rule-${this.rules.length + 1}`,
            name: rule.name,
            match: rule.match, // Matching criteria
            action: rule.action, // What to do
            priority: rule.priority || this.rules.length
        });

        // Sort by priority
        this.rules.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Evaluates a packet against the policy
     * @param {Object} packet - Packet to evaluate
     * @returns {Object} Action to take
     */
    evaluate(packet) {
        for (const rule of this.rules) {
            if (this.matchesRule(packet, rule.match)) {
                return {
                    matched: true,
                    rule: rule.name,
                    action: rule.action
                };
            }
        }

        return {
            matched: false,
            rule: 'default',
            action: { type: this.defaultAction }
        };
    }

    /**
     * Checks if packet matches rule criteria
     * @param {Object} packet - Packet
     * @param {Object} criteria - Match criteria
     * @returns {boolean} True if matches
     */
    matchesRule(packet, criteria) {
        if (criteria.srcPort && packet.srcPort !== criteria.srcPort) return false;
        if (criteria.dstPort && packet.dstPort !== criteria.dstPort) return false;
        if (criteria.protocol && packet.protocol !== criteria.protocol) return false;
        if (criteria.dscp && packet.dscp !== criteria.dscp) return false;
        if (criteria.application && packet.application !== criteria.application) return false;

        return true;
    }

    /**
     * Gets policy summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            name: this.name,
            rules: this.rules.length,
            defaultAction: this.defaultAction
        };
    }
}

/**
 * TrafficShaper implements traffic shaping algorithms.
 */
class TrafficShaper {
    constructor(options) {
        this.bandwidth = options.bandwidth; // bits per second
        this.burstSize = options.burstSize || this.bandwidth / 8; // bytes
        this.tokenBucket = this.burstSize;
        this.lastUpdate = Date.now();
    }

    /**
     * Updates token bucket (token bucket algorithm)
     */
    updateTokens() {
        const now = Date.now();
        const elapsed = (now - this.lastUpdate) / 1000; // seconds
        const tokensToAdd = (this.bandwidth / 8) * elapsed; // bytes

        this.tokenBucket = Math.min(this.burstSize, this.tokenBucket + tokensToAdd);
        this.lastUpdate = now;
    }

    /**
     * Checks if packet can be sent (conformance check)
     * @param {number} packetSize - Packet size in bytes
     * @returns {Object} Conformance result
     */
    conform(packetSize) {
        this.updateTokens();

        if (this.tokenBucket >= packetSize) {
            this.tokenBucket -= packetSize;
            return {
                conforms: true,
                action: 'transmit',
                tokensRemaining: this.tokenBucket
            };
        }

        return {
            conforms: false,
            action: 'queue', // or 'drop' depending on policy
            tokensNeeded: packetSize - this.tokenBucket,
            waitTime: ((packetSize - this.tokenBucket) / (this.bandwidth / 8) * 1000).toFixed(2) + 'ms'
        };
    }

    /**
     * Gets shaper status
     * @returns {Object} Status
     */
    getStatus() {
        this.updateTokens();

        return {
            bandwidth: `${(this.bandwidth / 1000000).toFixed(2)} Mbps`,
            burstSize: `${this.burstSize} bytes`,
            currentTokens: `${this.tokenBucket.toFixed(0)} bytes`,
            utilization: `${((1 - this.tokenBucket / this.burstSize) * 100).toFixed(1)}%`
        };
    }
}

/**
 * QoSMonitor monitors and reports QoS metrics.
 */
class QoSMonitor {
    constructor() {
        this.metrics = [];
        this.thresholds = {
            latency: { warning: 100, critical: 200 },
            jitter: { warning: 30, critical: 50 },
            packetLoss: { warning: 1, critical: 5 }
        };
    }

    /**
     * Records a metric sample
     * @param {Object} sample - Metric sample
     */
    record(sample) {
        this.metrics.push({
            timestamp: Date.now(),
            ...sample
        });

        // Keep last 1000 samples
        if (this.metrics.length > 1000) {
            this.metrics.shift();
        }
    }

    /**
     * Calculates QoS statistics
     * @returns {Object} Statistics
     */
    calculateStats() {
        if (this.metrics.length === 0) return null;

        const latencies = this.metrics.map(m => m.latency).filter(Boolean);
        const jitters = this.metrics.map(m => m.jitter).filter(Boolean);
        const losses = this.metrics.filter(m => m.lost).length;

        return {
            samples: this.metrics.length,
            latency: this.getStats(latencies),
            jitter: this.getStats(jitters),
            packetLoss: ((losses / this.metrics.length) * 100).toFixed(2) + '%',
            healthStatus: this.assessHealth(latencies, jitters, losses)
        };
    }

    /**
     * Gets statistics for an array of values
     * @param {Array} values - Values
     * @returns {Object} Stats
     */
    getStats(values) {
        if (values.length === 0) return null;

        const sorted = [...values].sort((a, b) => a - b);
        const sum = values.reduce((a, b) => a + b, 0);

        return {
            min: sorted[0].toFixed(2) + 'ms',
            max: sorted[sorted.length - 1].toFixed(2) + 'ms',
            avg: (sum / values.length).toFixed(2) + 'ms',
            p95: sorted[Math.floor(values.length * 0.95)].toFixed(2) + 'ms'
        };
    }

    /**
     * Assesses overall health based on metrics
     * @param {Array} latencies - Latency values
     * @param {Array} jitters - Jitter values
     * @param {number} losses - Loss count
     * @returns {Object} Health assessment
     */
    assessHealth(latencies, jitters, losses) {
        const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
        const avgJitter = jitters.length > 0 ? jitters.reduce((a, b) => a + b, 0) / jitters.length : 0;
        const lossPercent = (losses / this.metrics.length) * 100;

        const issues = [];

        if (avgLatency > this.thresholds.latency.critical) {
            issues.push({ metric: 'latency', level: 'critical', value: avgLatency });
        } else if (avgLatency > this.thresholds.latency.warning) {
            issues.push({ metric: 'latency', level: 'warning', value: avgLatency });
        }

        if (avgJitter > this.thresholds.jitter.critical) {
            issues.push({ metric: 'jitter', level: 'critical', value: avgJitter });
        } else if (avgJitter > this.thresholds.jitter.warning) {
            issues.push({ metric: 'jitter', level: 'warning', value: avgJitter });
        }

        if (lossPercent > this.thresholds.packetLoss.critical) {
            issues.push({ metric: 'packetLoss', level: 'critical', value: lossPercent });
        } else if (lossPercent > this.thresholds.packetLoss.warning) {
            issues.push({ metric: 'packetLoss', level: 'warning', value: lossPercent });
        }

        const hasCritical = issues.some(i => i.level === 'critical');
        const hasWarning = issues.some(i => i.level === 'warning');

        return {
            status: hasCritical ? 'critical' : hasWarning ? 'warning' : 'healthy',
            issues
        };
    }
}

/**
 * QoSTester tests network QoS configuration.
 */
class QoSTester {
    /**
     * Tests QoS configuration
     * @param {Object} config - QoS configuration
     * @returns {Object} Test results
     */
    static testConfiguration(config) {
        const results = {
            timestamp: new Date().toISOString(),
            tests: [],
            passed: 0,
            failed: 0
        };

        // Test traffic classification
        const classificationTest = this.testClassification(config);
        results.tests.push(classificationTest);
        classificationTest.passed ? results.passed++ : results.failed++;

        // Test bandwidth allocation
        const bandwidthTest = this.testBandwidthAllocation(config);
        results.tests.push(bandwidthTest);
        bandwidthTest.passed ? results.passed++ : results.failed++;

        // Test priority handling
        const priorityTest = this.testPriorityHandling(config);
        results.tests.push(priorityTest);
        priorityTest.passed ? results.passed++ : results.failed++;

        return results;
    }

    /**
     * Tests traffic classification
     * @param {Object} config - Configuration
     * @returns {Object} Test result
     */
    static testClassification(config) {
        const testCases = [
            { application: 'voip', expectedClass: 'realtime' },
            { application: 'web', expectedClass: 'interactive' },
            { application: 'backup', expectedClass: 'bulk' }
        ];

        let passed = true;
        const details = [];

        for (const tc of testCases) {
            const result = TrafficClass.classify(tc.application);
            const match = result.name.toLowerCase().includes(tc.expectedClass);
            details.push({
                application: tc.application,
                expected: tc.expectedClass,
                actual: result.name,
                passed: match
            });
            if (!match) passed = false;
        }

        return {
            name: 'Traffic Classification',
            passed,
            details
        };
    }

    /**
     * Tests bandwidth allocation
     * @param {Object} config - Configuration
     * @returns {Object} Test result
     */
    static testBandwidthAllocation(config) {
        const totalAllocated = Object.values(config.bandwidthAllocation || {})
            .reduce((a, b) => a + b, 0);

        return {
            name: 'Bandwidth Allocation',
            passed: totalAllocated <= 100,
            details: {
                totalAllocated: totalAllocated + '%',
                remaining: (100 - totalAllocated) + '%',
                message: totalAllocated <= 100
                    ? 'Bandwidth allocation is valid'
                    : 'Over-allocation detected'
            }
        };
    }

    /**
     * Tests priority handling
     * @param {Object} config - Configuration
     * @returns {Object} Test result
     */
    static testPriorityHandling(config) {
        // Simulate packets with different priorities
        const policy = config.policy;
        if (!policy) {
            return {
                name: 'Priority Handling',
                passed: false,
                details: { message: 'No policy configured' }
            };
        }

        const highPriority = policy.evaluate({ application: 'voip', protocol: 'udp' });
        const lowPriority = policy.evaluate({ application: 'backup', protocol: 'tcp' });

        return {
            name: 'Priority Handling',
            passed: highPriority.action.priority < lowPriority.action.priority,
            details: {
                highPriority: highPriority.action,
                lowPriority: lowPriority.action
            }
        };
    }
}

// Demonstration
console.log('=== Quality of Service Demo ===\n');

// Traffic classification
console.log('--- Traffic Classification ---');
console.log('VoIP:', TrafficClass.classify('voip'));
console.log('Web:', TrafficClass.classify('web'));
console.log('Backup:', TrafficClass.classify('backup'));

// QoS Policy
console.log('\n--- QoS Policy ---');
const policy = new QoSPolicy({
    id: 'QOS-001',
    name: 'Corporate QoS Policy',
    description: 'Standard QoS policy for corporate network'
});

policy.addRule({
    name: 'VoIP Priority',
    match: { protocol: 'udp', dstPort: 5060 },
    action: { type: 'mark', dscp: 46, queue: 'priority' },
    priority: 1
});

policy.addRule({
    name: 'Video Conference',
    match: { application: 'video-call' },
    action: { type: 'mark', dscp: 34, queue: 'priority' },
    priority: 2
});

policy.addRule({
    name: 'Web Traffic',
    match: { dstPort: 443 },
    action: { type: 'mark', dscp: 26, queue: 'interactive' },
    priority: 3
});

console.log('Policy Summary:', policy.getSummary());
console.log('Evaluate VoIP packet:', policy.evaluate({ protocol: 'udp', dstPort: 5060 }));
console.log('Evaluate HTTPS packet:', policy.evaluate({ dstPort: 443 }));

// Traffic shaping
console.log('\n--- Traffic Shaping ---');
const shaper = new TrafficShaper({
    bandwidth: 10000000, // 10 Mbps
    burstSize: 1500000   // 1.5 MB burst
});

console.log('Shaper Status:', shaper.getStatus());
console.log('Conform 1500 byte packet:', shaper.conform(1500));
console.log('After transmission:', shaper.getStatus());

// QoS Monitoring
console.log('\n--- QoS Monitoring ---');
const monitor = new QoSMonitor();

// Simulate some metrics
for (let i = 0; i < 100; i++) {
    monitor.record({
        latency: 50 + Math.random() * 100,
        jitter: 5 + Math.random() * 20,
        lost: Math.random() < 0.02
    });
}

console.log('QoS Statistics:', monitor.calculateStats());

// QoS Testing
console.log('\n--- QoS Testing ---');
const testResults = QoSTester.testConfiguration({
    bandwidthAllocation: {
        realtime: 30,
        interactive: 30,
        streaming: 20,
        bulk: 10,
        bestEffort: 10
    },
    policy
});

console.log('Test Results:', testResults);

/**
 * Best Practices for Network QoS:
 *
 * 1. Classify traffic based on business requirements
 * 2. Prioritize real-time traffic (voice, video)
 * 3. Use DSCP marking for end-to-end QoS
 * 4. Implement traffic shaping at network edges
 * 5. Monitor QoS metrics continuously
 * 6. Test QoS policies before deployment
 * 7. Document QoS policies and configurations
 * 8. Plan for bandwidth growth
 * 9. Consider application-level QoS requirements
 * 10. Review and adjust policies regularly
 */
