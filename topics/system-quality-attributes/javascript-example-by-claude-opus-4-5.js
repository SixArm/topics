/**
 * System Quality Attributes - Characteristics of Software Quality
 *
 * System quality attributes refer to the characteristics of software or
 * hardware that determine overall quality. These attributes are critical
 * to ensuring the system meets user expectations and performs as intended.
 * They guide testing priorities and architectural decisions.
 *
 * Key Concepts:
 * - Functional vs non-functional requirements
 * - Quality attribute scenarios
 * - Trade-offs between attributes
 * - Measurable quality criteria
 */

/**
 * QualityAttribute represents a quality characteristic.
 */
class QualityAttribute {
    static attributes = {
        usability: {
            name: 'Usability',
            description: 'Ease of use and user experience quality',
            characteristics: [
                'Learnability - how easy to learn',
                'Efficiency - task completion speed',
                'Memorability - ease of remembering',
                'Error rate - user mistake frequency',
                'Satisfaction - user contentment'
            ],
            metrics: ['Task completion rate', 'Time on task', 'Error rate', 'User satisfaction score'],
            testingApproaches: ['Usability testing', 'A/B testing', 'User surveys']
        },
        reliability: {
            name: 'Reliability',
            description: 'Ability to perform consistently under various conditions',
            characteristics: [
                'Availability - uptime percentage',
                'Fault tolerance - handling failures',
                'Recoverability - recovery time',
                'Accuracy - correct operation'
            ],
            metrics: ['MTBF', 'MTTR', 'Availability %', 'Error rate'],
            testingApproaches: ['Reliability testing', 'Fault injection', 'Chaos engineering']
        },
        performance: {
            name: 'Performance',
            description: 'Speed and efficiency of system operations',
            characteristics: [
                'Response time - request latency',
                'Throughput - transactions per second',
                'Resource utilization - CPU/memory usage',
                'Scalability - handling growth'
            ],
            metrics: ['Response time', 'Throughput', 'CPU usage', 'Memory usage'],
            testingApproaches: ['Load testing', 'Stress testing', 'Performance profiling']
        },
        scalability: {
            name: 'Scalability',
            description: 'Ability to handle growth in users, data, or transactions',
            characteristics: [
                'Horizontal scaling - adding more instances',
                'Vertical scaling - adding more resources',
                'Elasticity - automatic scaling',
                'Data scalability - handling data growth'
            ],
            metrics: ['Max concurrent users', 'Data volume limits', 'Scaling time'],
            testingApproaches: ['Scalability testing', 'Capacity planning']
        },
        maintainability: {
            name: 'Maintainability',
            description: 'Ease of modifying and updating the system',
            characteristics: [
                'Modularity - independent components',
                'Reusability - code reuse',
                'Analyzability - ease of diagnosis',
                'Modifiability - ease of changes'
            ],
            metrics: ['Cyclomatic complexity', 'Code coverage', 'Technical debt'],
            testingApproaches: ['Code review', 'Static analysis', 'Refactoring assessment']
        },
        security: {
            name: 'Security',
            description: 'Protection against unauthorized access and threats',
            characteristics: [
                'Confidentiality - data protection',
                'Integrity - data accuracy',
                'Availability - access when needed',
                'Authentication - identity verification'
            ],
            metrics: ['Vulnerabilities found', 'Time to patch', 'Security incidents'],
            testingApproaches: ['Penetration testing', 'Security scanning', 'Code review']
        },
        compatibility: {
            name: 'Compatibility',
            description: 'Ability to work with other systems and environments',
            characteristics: [
                'Interoperability - working with other systems',
                'Portability - running on different platforms',
                'Coexistence - sharing resources',
                'API compatibility - interface stability'
            ],
            metrics: ['Supported platforms', 'Integration success rate'],
            testingApproaches: ['Compatibility testing', 'Integration testing']
        }
    };

    /**
     * Gets attribute by name
     * @param {string} name - Attribute name
     * @returns {Object} Attribute details
     */
    static getAttribute(name) {
        return this.attributes[name];
    }

    /**
     * Gets all attributes
     * @returns {Array} All attributes
     */
    static getAllAttributes() {
        return Object.entries(this.attributes).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * QualityScenario defines quality attribute scenarios.
 */
class QualityScenario {
    constructor(options) {
        this.attribute = options.attribute;
        this.source = options.source; // Who/what triggers the scenario
        this.stimulus = options.stimulus; // What happens
        this.artifact = options.artifact; // What is affected
        this.environment = options.environment; // Under what conditions
        this.response = options.response; // Expected system response
        this.measure = options.measure; // How to measure success
    }

    /**
     * Converts to testable scenario
     * @returns {Object} Test scenario
     */
    toTestScenario() {
        return {
            given: `${this.source} triggers ${this.stimulus}`,
            when: `System is ${this.environment}`,
            then: `${this.artifact} should ${this.response}`,
            measure: this.measure,
            attribute: this.attribute
        };
    }
}

/**
 * QualityAssessment evaluates system quality.
 */
class QualityAssessment {
    constructor(systemName) {
        this.systemName = systemName;
        this.assessments = new Map();
    }

    /**
     * Assesses an attribute
     * @param {string} attribute - Attribute name
     * @param {Object} data - Assessment data
     */
    assess(attribute, data) {
        this.assessments.set(attribute, {
            score: data.score, // 1-10
            metrics: data.metrics,
            strengths: data.strengths || [],
            weaknesses: data.weaknesses || [],
            assessedAt: new Date()
        });
    }

    /**
     * Gets overall quality score
     * @returns {Object} Quality score
     */
    getOverallScore() {
        if (this.assessments.size === 0) return { score: 0, assessed: 0 };

        const scores = Array.from(this.assessments.values()).map(a => a.score);
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;

        return {
            score: average.toFixed(1),
            assessed: this.assessments.size,
            total: Object.keys(QualityAttribute.attributes).length,
            grade: average >= 8 ? 'A' : average >= 6 ? 'B' : average >= 4 ? 'C' : 'D'
        };
    }

    /**
     * Gets attribute rankings
     * @returns {Array} Ranked attributes
     */
    getRankings() {
        return Array.from(this.assessments.entries())
            .map(([attr, data]) => ({ attribute: attr, score: data.score }))
            .sort((a, b) => b.score - a.score);
    }

    /**
     * Gets improvement priorities
     * @returns {Array} Priority areas
     */
    getImprovementPriorities() {
        return this.getRankings()
            .filter(r => r.score < 7)
            .map(r => ({
                attribute: r.attribute,
                currentScore: r.score,
                gap: 7 - r.score,
                priority: r.score < 4 ? 'high' : r.score < 6 ? 'medium' : 'low'
            }));
    }

    /**
     * Generates assessment report
     * @returns {Object} Report
     */
    generateReport() {
        return {
            system: this.systemName,
            overallScore: this.getOverallScore(),
            rankings: this.getRankings(),
            improvements: this.getImprovementPriorities(),
            summary: {
                strengths: this.getRankings().filter(r => r.score >= 8).map(r => r.attribute),
                weaknesses: this.getRankings().filter(r => r.score < 5).map(r => r.attribute)
            }
        };
    }
}

/**
 * QualityTradeoffs explains trade-offs between attributes.
 */
class QualityTradeoffs {
    static tradeoffs = {
        'performance-security': {
            attributes: ['performance', 'security'],
            description: 'Security measures (encryption, validation) add processing overhead',
            examples: ['Encryption adds latency', 'Input validation takes time'],
            balance: 'Use efficient algorithms, cache security checks'
        },
        'usability-security': {
            attributes: ['usability', 'security'],
            description: 'Strong security often requires more user steps',
            examples: ['MFA adds friction', 'Password complexity rules frustrate users'],
            balance: 'Use biometrics, remember trusted devices'
        },
        'maintainability-performance': {
            attributes: ['maintainability', 'performance'],
            description: 'Clean code abstractions can add overhead',
            examples: ['ORM vs raw SQL', 'Microservices latency'],
            balance: 'Profile first, optimize bottlenecks only'
        },
        'scalability-cost': {
            attributes: ['scalability', 'cost'],
            description: 'Scaling infrastructure increases costs',
            examples: ['More servers = more cost', 'Managed services are expensive'],
            balance: 'Auto-scaling, serverless for variable loads'
        }
    };

    /**
     * Gets tradeoff information
     * @param {string} tradeoff - Tradeoff key
     * @returns {Object} Tradeoff details
     */
    static getTradeoff(tradeoff) {
        return this.tradeoffs[tradeoff];
    }

    /**
     * Gets all tradeoffs
     * @returns {Array} All tradeoffs
     */
    static getAllTradeoffs() {
        return Object.entries(this.tradeoffs).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }

    /**
     * Analyzes tradeoffs for given priorities
     * @param {Array} priorities - Priority attributes
     * @returns {Object} Analysis
     */
    static analyzeForPriorities(priorities) {
        const conflicts = [];

        for (const [key, tradeoff] of Object.entries(this.tradeoffs)) {
            const inConflict = tradeoff.attributes.every(attr =>
                priorities.includes(attr)
            );

            if (inConflict) {
                conflicts.push({
                    tradeoff: key,
                    description: tradeoff.description,
                    recommendation: tradeoff.balance
                });
            }
        }

        return {
            priorities,
            conflicts,
            hasConflicts: conflicts.length > 0
        };
    }
}

/**
 * QualityMetricsCollector collects quality metrics.
 */
class QualityMetricsCollector {
    constructor() {
        this.metrics = new Map();
    }

    /**
     * Records a metric
     * @param {string} attribute - Quality attribute
     * @param {string} metric - Metric name
     * @param {number} value - Metric value
     */
    record(attribute, metric, value) {
        if (!this.metrics.has(attribute)) {
            this.metrics.set(attribute, new Map());
        }
        this.metrics.get(attribute).set(metric, {
            value,
            timestamp: new Date()
        });
    }

    /**
     * Gets metrics for an attribute
     * @param {string} attribute - Attribute name
     * @returns {Object} Metrics
     */
    getMetrics(attribute) {
        const attrMetrics = this.metrics.get(attribute);
        if (!attrMetrics) return null;

        const result = {};
        for (const [metric, data] of attrMetrics) {
            result[metric] = data.value;
        }
        return result;
    }

    /**
     * Gets all collected metrics
     * @returns {Object} All metrics
     */
    getAllMetrics() {
        const result = {};
        for (const [attr, metrics] of this.metrics) {
            result[attr] = this.getMetrics(attr);
        }
        return result;
    }
}

// Demonstration
console.log('=== System Quality Attributes Demo ===\n');

// Quality attributes
console.log('--- Quality Attributes ---');
QualityAttribute.getAllAttributes().slice(0, 4).forEach(attr => {
    console.log(`\n${attr.name}: ${attr.description}`);
    console.log(`  Metrics: ${attr.metrics.slice(0, 2).join(', ')}`);
});

// Quality scenario
console.log('\n--- Quality Scenario Example ---');
const performanceScenario = new QualityScenario({
    attribute: 'performance',
    source: '1000 concurrent users',
    stimulus: 'submit purchase requests',
    artifact: 'checkout system',
    environment: 'normal operation',
    response: 'process all requests',
    measure: 'within 2 seconds response time'
});

console.log('Scenario:', performanceScenario.toTestScenario());

// Quality assessment
console.log('\n--- Quality Assessment ---');
const assessment = new QualityAssessment('E-Commerce Platform');

assessment.assess('usability', { score: 8, metrics: { taskCompletionRate: 95 }, strengths: ['Intuitive navigation'] });
assessment.assess('performance', { score: 7, metrics: { responseTime: 1.2 }, strengths: ['Good caching'] });
assessment.assess('reliability', { score: 9, metrics: { availability: 99.9 } });
assessment.assess('security', { score: 6, metrics: { vulnerabilities: 3 }, weaknesses: ['Outdated dependencies'] });
assessment.assess('scalability', { score: 5, metrics: { maxUsers: 5000 }, weaknesses: ['Scaling bottlenecks'] });

console.log('Overall Score:', assessment.getOverallScore());
console.log('Rankings:', assessment.getRankings());
console.log('Improvement Priorities:', assessment.getImprovementPriorities());

// Report
console.log('\n--- Assessment Report ---');
const report = assessment.generateReport();
console.log('Strengths:', report.summary.strengths);
console.log('Weaknesses:', report.summary.weaknesses);

// Trade-offs
console.log('\n--- Quality Trade-offs ---');
QualityTradeoffs.getAllTradeoffs().slice(0, 2).forEach(tradeoff => {
    console.log(`\n${tradeoff.attributes.join(' vs ')}: ${tradeoff.description}`);
    console.log(`  Balance: ${tradeoff.balance}`);
});

// Trade-off analysis
console.log('\n--- Trade-off Analysis ---');
console.log(QualityTradeoffs.analyzeForPriorities(['performance', 'security', 'usability']));

// Metrics collection
console.log('\n--- Metrics Collection ---');
const collector = new QualityMetricsCollector();
collector.record('performance', 'responseTime', 1.2);
collector.record('performance', 'throughput', 500);
collector.record('reliability', 'availability', 99.9);
collector.record('reliability', 'mttr', 30);

console.log('All Metrics:', collector.getAllMetrics());

/**
 * Best Practices for System Quality Attributes:
 *
 * 1. Define measurable quality requirements
 * 2. Prioritize attributes based on business needs
 * 3. Create quality attribute scenarios
 * 4. Balance competing quality concerns
 * 5. Measure and track quality metrics
 * 6. Include quality testing in CI/CD
 * 7. Document quality trade-off decisions
 * 8. Review quality regularly
 * 9. Involve stakeholders in prioritization
 * 10. Use quality as architecture driver
 */
