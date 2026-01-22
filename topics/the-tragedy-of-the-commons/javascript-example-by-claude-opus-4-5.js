/**
 * The Tragedy of the Commons - Shared Resource Management in Testing
 *
 * The Tragedy of the Commons describes how shared resources are overused or
 * exploited due to lack of ownership. In testing, this applies to shared test
 * environments, test data, CI/CD resources, and test infrastructure where
 * individual optimization can harm collective effectiveness.
 *
 * Key Concepts:
 * - Shared resource degradation
 * - Individual vs collective optimization
 * - Resource governance
 * - Sustainable testing practices
 */

/**
 * SharedTestingResource represents a commonly shared testing resource.
 */
class SharedTestingResource {
    static resources = {
        testEnvironment: {
            name: 'Test Environment',
            description: 'Shared staging or QA environments',
            commonProblems: [
                'Environment pollution from abandoned tests',
                'Conflicting configurations',
                'Resource contention during peak hours',
                'Unpredictable state'
            ],
            overuseSymptoms: ['Slow performance', 'Flaky tests', 'Blocked teams'],
            governance: 'Environment booking system, cleanup policies'
        },
        testData: {
            name: 'Test Data',
            description: 'Shared test databases and datasets',
            commonProblems: [
                'Data corruption from tests',
                'Conflicting data modifications',
                'Missing data dependencies',
                'Stale or outdated data'
            ],
            overuseSymptoms: ['Test failures', 'Inconsistent results', 'Data cleanup burden'],
            governance: 'Data ownership, reset procedures, isolated datasets'
        },
        cicdPipeline: {
            name: 'CI/CD Pipeline',
            description: 'Shared build and deployment resources',
            commonProblems: [
                'Queue congestion',
                'Long wait times',
                'Resource hogging by large jobs',
                'Failed builds blocking others'
            ],
            overuseSymptoms: ['Long queue times', 'Developer frustration', 'Delayed releases'],
            governance: 'Job prioritization, resource quotas, parallel lanes'
        },
        testInfrastructure: {
            name: 'Test Infrastructure',
            description: 'Shared browsers, devices, and services',
            commonProblems: [
                'Device pool exhaustion',
                'Service degradation',
                'License limitations',
                'Maintenance backlog'
            ],
            overuseSymptoms: ['Tests waiting for resources', 'Timeouts', 'Reduced coverage'],
            governance: 'Resource pooling, usage tracking, capacity planning'
        }
    };

    /**
     * Gets resource by name
     * @param {string} name - Resource name
     * @returns {Object} Resource details
     */
    static getResource(name) {
        return this.resources[name];
    }

    /**
     * Gets all resources
     * @returns {Array} All resources
     */
    static getAllResources() {
        return Object.entries(this.resources).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * ResourceUsageTracker tracks shared resource usage.
 */
class ResourceUsageTracker {
    constructor(resourceName, capacity) {
        this.resourceName = resourceName;
        this.capacity = capacity;
        this.currentUsage = 0;
        this.usageHistory = [];
        this.users = new Map();
    }

    /**
     * Allocates resource to user
     * @param {string} userId - User ID
     * @param {number} amount - Amount requested
     * @returns {Object} Allocation result
     */
    allocate(userId, amount) {
        const available = this.capacity - this.currentUsage;

        if (amount > available) {
            return {
                success: false,
                reason: 'Insufficient capacity',
                available,
                requested: amount
            };
        }

        this.currentUsage += amount;
        this.users.set(userId, (this.users.get(userId) || 0) + amount);

        this.usageHistory.push({
            action: 'allocate',
            userId,
            amount,
            timestamp: new Date(),
            utilization: (this.currentUsage / this.capacity) * 100
        });

        return {
            success: true,
            allocated: amount,
            totalUsage: this.currentUsage,
            utilization: ((this.currentUsage / this.capacity) * 100).toFixed(1) + '%'
        };
    }

    /**
     * Releases resource from user
     * @param {string} userId - User ID
     * @param {number} amount - Amount to release
     */
    release(userId, amount) {
        const userUsage = this.users.get(userId) || 0;
        const releaseAmount = Math.min(amount, userUsage);

        this.currentUsage -= releaseAmount;
        this.users.set(userId, userUsage - releaseAmount);

        this.usageHistory.push({
            action: 'release',
            userId,
            amount: releaseAmount,
            timestamp: new Date(),
            utilization: (this.currentUsage / this.capacity) * 100
        });
    }

    /**
     * Gets usage statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const usageByUser = Object.fromEntries(this.users);
        const topUsers = [...this.users.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        return {
            resource: this.resourceName,
            capacity: this.capacity,
            currentUsage: this.currentUsage,
            utilization: ((this.currentUsage / this.capacity) * 100).toFixed(1) + '%',
            activeUsers: this.users.size,
            topUsers: topUsers.map(([user, usage]) => ({ user, usage })),
            isOverloaded: this.currentUsage > this.capacity * 0.9
        };
    }

    /**
     * Identifies overuse patterns
     * @returns {Object} Overuse analysis
     */
    identifyOveruse() {
        const averagePerUser = this.currentUsage / Math.max(this.users.size, 1);
        const fairShare = this.capacity / Math.max(this.users.size, 1);

        const overUsers = [...this.users.entries()]
            .filter(([_, usage]) => usage > fairShare * 1.5)
            .map(([user, usage]) => ({
                user,
                usage,
                overBy: ((usage / fairShare - 1) * 100).toFixed(1) + '%'
            }));

        return {
            fairShare: fairShare.toFixed(1),
            averageUsage: averagePerUser.toFixed(1),
            overUsers,
            recommendation: overUsers.length > 0
                ? 'Consider implementing usage quotas'
                : 'Usage appears balanced'
        };
    }
}

/**
 * GovernancePolicy defines resource governance policies.
 */
class GovernancePolicy {
    static policies = {
        quotas: {
            name: 'Usage Quotas',
            description: 'Limit resource usage per team/user',
            implementation: [
                'Define fair share allocations',
                'Implement soft and hard limits',
                'Monitor and alert on quota violations',
                'Review and adjust periodically'
            ],
            effectiveness: 'High - prevents individual overuse'
        },
        booking: {
            name: 'Resource Booking',
            description: 'Schedule exclusive access to resources',
            implementation: [
                'Implement booking system',
                'Define time slots and durations',
                'Enforce cleanup after use',
                'Handle conflicts and priorities'
            ],
            effectiveness: 'High - prevents conflicts'
        },
        ownership: {
            name: 'Resource Ownership',
            description: 'Assign owners responsible for resources',
            implementation: [
                'Designate resource owners',
                'Define ownership responsibilities',
                'Establish maintenance schedules',
                'Create escalation paths'
            ],
            effectiveness: 'Medium - depends on owner engagement'
        },
        automation: {
            name: 'Automated Cleanup',
            description: 'Automatic resource reset and cleanup',
            implementation: [
                'Scheduled cleanup jobs',
                'Automatic state reset',
                'Orphaned resource detection',
                'Self-healing mechanisms'
            ],
            effectiveness: 'High - consistent enforcement'
        },
        isolation: {
            name: 'Resource Isolation',
            description: 'Provide isolated resources per user/test',
            implementation: [
                'Containerized environments',
                'Dynamic provisioning',
                'Ephemeral resources',
                'Complete isolation'
            ],
            effectiveness: 'Very High - eliminates contention'
        }
    };

    /**
     * Gets policy by name
     * @param {string} name - Policy name
     * @returns {Object} Policy details
     */
    static getPolicy(name) {
        return this.policies[name];
    }

    /**
     * Gets all policies
     * @returns {Array} All policies
     */
    static getAllPolicies() {
        return Object.entries(this.policies).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }

    /**
     * Recommends policies based on problems
     * @param {Array} problems - Current problems
     * @returns {Array} Recommended policies
     */
    static recommend(problems) {
        const recommendations = [];

        if (problems.includes('contention')) {
            recommendations.push(this.policies.booking, this.policies.isolation);
        }
        if (problems.includes('overuse')) {
            recommendations.push(this.policies.quotas);
        }
        if (problems.includes('pollution')) {
            recommendations.push(this.policies.automation, this.policies.ownership);
        }

        return recommendations;
    }
}

/**
 * SustainablePractices provides sustainable testing practices.
 */
class SustainablePractices {
    static practices = {
        cleanupAfterTest: {
            name: 'Clean Up After Tests',
            description: 'Always restore state after test execution',
            implementation: 'Use teardown/cleanup hooks in all tests',
            benefit: 'Prevents accumulation of test artifacts'
        },
        isolatedTestData: {
            name: 'Isolated Test Data',
            description: 'Each test uses its own data set',
            implementation: 'Generate unique test data per test run',
            benefit: 'Prevents data conflicts between tests'
        },
        resourceEfficiency: {
            name: 'Resource-Efficient Tests',
            description: 'Minimize resource consumption',
            implementation: 'Optimize test suites, parallelize wisely',
            benefit: 'Reduces pressure on shared infrastructure'
        },
        offPeakExecution: {
            name: 'Off-Peak Execution',
            description: 'Schedule heavy tests during low-demand periods',
            implementation: 'Run long suites overnight or weekends',
            benefit: 'Reduces peak-time congestion'
        },
        containerization: {
            name: 'Containerized Environments',
            description: 'Use isolated containers for tests',
            implementation: 'Docker, Kubernetes for test environments',
            benefit: 'Complete isolation, reproducibility'
        }
    };

    /**
     * Gets all practices
     * @returns {Array} All practices
     */
    static getAllPractices() {
        return Object.entries(this.practices).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TragedyPrevention provides strategies to prevent the tragedy.
 */
class TragedyPrevention {
    /**
     * Assesses current state
     * @param {Object} metrics - Current metrics
     * @returns {Object} Assessment
     */
    static assess(metrics) {
        const issues = [];
        const recommendations = [];

        if (metrics.utilization > 90) {
            issues.push('High utilization - near capacity');
            recommendations.push('Consider scaling resources');
        }

        if (metrics.waitTime > 30) {
            issues.push('Long wait times for resources');
            recommendations.push('Implement resource booking');
        }

        if (metrics.conflictRate > 10) {
            issues.push('Frequent resource conflicts');
            recommendations.push('Increase isolation');
        }

        if (metrics.cleanupFailures > 5) {
            issues.push('Cleanup failures accumulating');
            recommendations.push('Implement automated cleanup');
        }

        return {
            healthScore: Math.max(0, 100 - issues.length * 25),
            issues,
            recommendations,
            riskLevel: issues.length > 2 ? 'High' : issues.length > 0 ? 'Medium' : 'Low'
        };
    }
}

// Demonstration
console.log('=== Tragedy of the Commons Demo ===\n');

// Shared resources
console.log('--- Shared Testing Resources ---');
SharedTestingResource.getAllResources().slice(0, 2).forEach(resource => {
    console.log(`\n${resource.name}: ${resource.description}`);
    console.log('  Problems:', resource.commonProblems.slice(0, 2));
    console.log('  Governance:', resource.governance);
});

// Resource usage tracking
console.log('\n--- Resource Usage Tracking ---');
const envTracker = new ResourceUsageTracker('QA Environment', 100);

envTracker.allocate('team-alpha', 40);
envTracker.allocate('team-beta', 35);
envTracker.allocate('team-gamma', 20);
envTracker.allocate('ci-pipeline', 30); // This will partially fail

console.log('Statistics:', envTracker.getStatistics());
console.log('Overuse Analysis:', envTracker.identifyOveruse());

// Governance policies
console.log('\n--- Governance Policies ---');
GovernancePolicy.getAllPolicies().slice(0, 3).forEach(policy => {
    console.log(`\n${policy.name}: ${policy.description}`);
    console.log(`  Effectiveness: ${policy.effectiveness}`);
});

// Policy recommendations
console.log('\n--- Policy Recommendations ---');
const problems = ['contention', 'pollution'];
console.log('For problems:', problems);
console.log('Recommended:', GovernancePolicy.recommend(problems).map(p => p.name));

// Sustainable practices
console.log('\n--- Sustainable Practices ---');
SustainablePractices.getAllPractices().slice(0, 3).forEach(practice => {
    console.log(`\n${practice.name}: ${practice.implementation}`);
});

// Prevention assessment
console.log('\n--- Tragedy Prevention Assessment ---');
console.log(TragedyPrevention.assess({
    utilization: 85,
    waitTime: 45,
    conflictRate: 15,
    cleanupFailures: 3
}));

/**
 * Preventing the Tragedy of the Commons in Testing:
 *
 * 1. Implement resource governance policies
 * 2. Track and monitor resource usage
 * 3. Set usage quotas per team/user
 * 4. Use resource booking systems
 * 5. Automate cleanup and reset
 * 6. Containerize test environments
 * 7. Assign resource ownership
 * 8. Practice sustainable testing
 * 9. Schedule heavy tests off-peak
 * 10. Invest in scalable infrastructure
 */
