/**
 * Hyrum's Law - Observable Behavior Dependencies
 *
 * Hyrum's Law states: "With a sufficient number of users of an API,
 * it does not matter what you promise in the contract: all observable
 * behaviors of your system will be depended on by somebody."
 *
 * This principle highlights how users inevitably depend on undocumented
 * behaviors, side effects, or bugs, making changes difficult without
 * breaking compatibility.
 *
 * Key Concepts:
 * - Users depend on all observable behaviors
 * - Undocumented behavior becomes de facto interface
 * - Changes risk breaking compatibility
 * - Documentation doesn't prevent implicit dependencies
 */

/**
 * APIBehavior represents an observable behavior of an API.
 * Tracks whether the behavior is documented or incidental.
 */
class APIBehavior {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.type = options.type; // documented, undocumented, bug, side-effect
        this.documented = options.documented || false;
        this.intentional = options.intentional !== false;
        this.dependents = [];
        this.discoveredAt = new Date();
    }

    /**
     * Adds a dependent user of this behavior
     * @param {Object} dependent - Dependent information
     */
    addDependent(dependent) {
        this.dependents.push({
            name: dependent.name,
            usage: dependent.usage,
            critical: dependent.critical || false,
            discoveredAt: new Date()
        });
    }

    /**
     * Checks if behavior has become de facto interface
     * @returns {boolean} True if widely depended upon
     */
    isDeFactoInterface() {
        return this.dependents.length >= 3 ||
               this.dependents.some(d => d.critical);
    }

    /**
     * Gets risk level of changing this behavior
     * @returns {string} Risk level
     */
    getChangeRisk() {
        if (this.dependents.length === 0) return 'low';
        if (this.dependents.length < 3) return 'medium';
        if (this.dependents.some(d => d.critical)) return 'critical';
        return 'high';
    }

    /**
     * Gets behavior summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            name: this.name,
            type: this.type,
            documented: this.documented,
            dependents: this.dependents.length,
            changeRisk: this.getChangeRisk(),
            isDeFactoInterface: this.isDeFactoInterface()
        };
    }
}

/**
 * APIContract represents the documented interface of an API.
 * Tracks both explicit contract and implicit behaviors.
 */
class APIContract {
    constructor(name, version) {
        this.name = name;
        this.version = version;
        this.documentedBehaviors = new Map();
        this.observedBehaviors = new Map();
        this.breakingChanges = [];
    }

    /**
     * Adds a documented behavior
     * @param {string} name - Behavior name
     * @param {Object} spec - Behavior specification
     */
    addDocumentedBehavior(name, spec) {
        const behavior = new APIBehavior({
            name,
            description: spec.description,
            type: 'documented',
            documented: true,
            intentional: true
        });

        this.documentedBehaviors.set(name, behavior);
        this.observedBehaviors.set(name, behavior);
    }

    /**
     * Records an observed but undocumented behavior
     * @param {string} name - Behavior name
     * @param {Object} details - Behavior details
     */
    recordObservedBehavior(name, details) {
        if (!this.observedBehaviors.has(name)) {
            const behavior = new APIBehavior({
                name,
                description: details.description,
                type: details.type || 'undocumented',
                documented: false,
                intentional: details.intentional || false
            });

            this.observedBehaviors.set(name, behavior);
        }

        return this.observedBehaviors.get(name);
    }

    /**
     * Records that someone depends on a behavior
     * @param {string} behaviorName - Behavior name
     * @param {Object} dependent - Dependent info
     */
    recordDependency(behaviorName, dependent) {
        const behavior = this.observedBehaviors.get(behaviorName);
        if (behavior) {
            behavior.addDependent(dependent);
        }
    }

    /**
     * Analyzes potential breaking changes
     * @param {Object} proposedChange - Proposed change
     * @returns {Object} Analysis result
     */
    analyzeChange(proposedChange) {
        const affectedBehavior = this.observedBehaviors.get(proposedChange.behavior);

        if (!affectedBehavior) {
            return { safe: true, reason: 'Behavior not observed' };
        }

        const risk = affectedBehavior.getChangeRisk();
        const analysis = {
            behavior: proposedChange.behavior,
            documented: affectedBehavior.documented,
            dependents: affectedBehavior.dependents.length,
            risk,
            safe: risk === 'low',
            warnings: []
        };

        if (!affectedBehavior.documented && affectedBehavior.dependents.length > 0) {
            analysis.warnings.push(
                `${affectedBehavior.dependents.length} users depend on undocumented behavior`
            );
        }

        if (affectedBehavior.isDeFactoInterface()) {
            analysis.warnings.push('This behavior has become a de facto interface');
            analysis.safe = false;
        }

        return analysis;
    }

    /**
     * Gets Hyrum's Law report
     * @returns {Object} Report
     */
    getHyrumsLawReport() {
        const undocumented = [];
        const atRisk = [];

        for (const [name, behavior] of this.observedBehaviors) {
            if (!behavior.documented && behavior.dependents.length > 0) {
                undocumented.push(behavior.getSummary());
            }
            if (behavior.getChangeRisk() !== 'low') {
                atRisk.push(behavior.getSummary());
            }
        }

        return {
            api: this.name,
            version: this.version,
            documentedBehaviors: this.documentedBehaviors.size,
            observedBehaviors: this.observedBehaviors.size,
            undocumentedWithDependents: undocumented,
            behaviorsAtRisk: atRisk,
            hyrumsLawRisk: undocumented.length > 0 ? 'high' : 'low'
        };
    }
}

/**
 * CompatibilityTracker monitors API compatibility over time.
 * Helps identify implicit dependencies before they cause issues.
 */
class CompatibilityTracker {
    constructor() {
        this.apis = new Map();
        this.breakageHistory = [];
    }

    /**
     * Registers an API for tracking
     * @param {APIContract} api - API to track
     */
    registerAPI(api) {
        this.apis.set(api.name, api);
    }

    /**
     * Records a breaking change incident
     * @param {Object} incident - Incident details
     */
    recordBreakage(incident) {
        this.breakageHistory.push({
            api: incident.api,
            behavior: incident.behavior,
            documented: incident.documented,
            affectedUsers: incident.affectedUsers,
            timestamp: new Date(),
            lesson: incident.lesson
        });

        console.log(`Breaking change recorded: ${incident.api} - ${incident.behavior}`);
    }

    /**
     * Analyzes breakage patterns
     * @returns {Object} Pattern analysis
     */
    analyzeBreakagePatterns() {
        const byType = {
            documented: 0,
            undocumented: 0
        };

        const commonCauses = new Map();

        for (const incident of this.breakageHistory) {
            byType[incident.documented ? 'documented' : 'undocumented']++;

            const cause = incident.lesson || 'Unknown';
            commonCauses.set(cause, (commonCauses.get(cause) || 0) + 1);
        }

        return {
            totalBreakages: this.breakageHistory.length,
            byType,
            undocumentedRatio: byType.undocumented / this.breakageHistory.length || 0,
            commonCauses: Array.from(commonCauses.entries())
                .sort((a, b) => b[1] - a[1])
        };
    }

    /**
     * Gets recommendations for API maintainers
     * @param {string} apiName - API name
     * @returns {Array} Recommendations
     */
    getRecommendations(apiName) {
        const api = this.apis.get(apiName);
        if (!api) return [];

        const report = api.getHyrumsLawReport();
        const recommendations = [];

        if (report.undocumentedWithDependents.length > 0) {
            recommendations.push({
                priority: 'high',
                action: 'Document observed behaviors',
                reason: `${report.undocumentedWithDependents.length} undocumented behaviors have dependents`,
                behaviors: report.undocumentedWithDependents.map(b => b.name)
            });
        }

        if (report.behaviorsAtRisk.length > 0) {
            recommendations.push({
                priority: 'medium',
                action: 'Add change detection tests',
                reason: 'Behaviors at risk of breaking users',
                behaviors: report.behaviorsAtRisk.map(b => b.name)
            });
        }

        recommendations.push({
            priority: 'low',
            action: 'Monitor usage patterns',
            reason: 'Proactively identify implicit dependencies'
        });

        return recommendations;
    }
}

/**
 * BehaviorChangeSimulator simulates impact of API changes.
 * Helps predict issues before deployment.
 */
class BehaviorChangeSimulator {
    constructor(api) {
        this.api = api;
    }

    /**
     * Simulates a proposed change
     * @param {Object} change - Proposed change
     * @returns {Object} Simulation result
     */
    simulate(change) {
        console.log(`\nSimulating change: ${change.description}`);

        const affected = [];
        const behavior = this.api.observedBehaviors.get(change.behavior);

        if (!behavior) {
            return {
                impact: 'none',
                affected: [],
                recommendation: 'Safe to proceed'
            };
        }

        // Check all dependents
        for (const dependent of behavior.dependents) {
            if (this.wouldBreak(dependent, change)) {
                affected.push({
                    user: dependent.name,
                    reason: `Uses ${change.behavior} for ${dependent.usage}`,
                    critical: dependent.critical
                });
            }
        }

        const hasCritical = affected.some(a => a.critical);
        const impact = affected.length === 0 ? 'none' :
                       hasCritical ? 'critical' :
                       affected.length > 5 ? 'high' : 'medium';

        return {
            change: change.description,
            behavior: change.behavior,
            impact,
            affected,
            recommendation: this.getRecommendation(impact, affected)
        };
    }

    /**
     * Checks if a change would break a dependent
     * @param {Object} dependent - Dependent info
     * @param {Object} change - Proposed change
     * @returns {boolean} True if would break
     */
    wouldBreak(dependent, change) {
        // Simplified check - in reality would analyze usage patterns
        return change.type === 'remove' || change.type === 'modify';
    }

    /**
     * Gets recommendation based on impact
     * @param {string} impact - Impact level
     * @param {Array} affected - Affected users
     * @returns {string} Recommendation
     */
    getRecommendation(impact, affected) {
        switch (impact) {
            case 'none':
                return 'Safe to proceed';
            case 'medium':
                return 'Consider deprecation period and migration guide';
            case 'high':
                return 'Requires major version bump and extensive communication';
            case 'critical':
                return 'Reconsider change - critical dependencies exist';
            default:
                return 'Evaluate carefully';
        }
    }
}

/**
 * HyrumsLawMitigations provides strategies to mitigate Hyrum's Law.
 */
class HyrumsLawMitigations {
    static strategies = {
        'Explicit Interfaces': {
            description: 'Define clear, explicit interfaces and contracts',
            implementation: [
                'Use TypeScript or similar for type contracts',
                'Document all public behaviors',
                'Use interface segregation',
                'Hide implementation details'
            ]
        },
        'Behavior Testing': {
            description: 'Test for unexpected usage patterns',
            implementation: [
                'Add tests for documented behaviors only',
                'Monitor API usage in production',
                'Track undocumented endpoint access',
                'Analyze error patterns'
            ]
        },
        'Versioning Strategy': {
            description: 'Use semantic versioning strictly',
            implementation: [
                'Major version for breaking changes',
                'Minor version for new features',
                'Patch version for bug fixes',
                'Long deprecation periods'
            ]
        },
        'Gradual Rollout': {
            description: 'Deploy changes gradually to detect issues',
            implementation: [
                'Canary deployments',
                'Feature flags',
                'A/B testing',
                'Rollback capability'
            ]
        }
    };

    /**
     * Gets all mitigation strategies
     * @returns {Object} Strategies
     */
    static getStrategies() {
        return this.strategies;
    }

    /**
     * Gets recommended strategy for situation
     * @param {string} situation - Current situation
     * @returns {Array} Recommended strategies
     */
    static recommend(situation) {
        const lower = situation.toLowerCase();

        if (lower.includes('breaking') || lower.includes('change')) {
            return ['Versioning Strategy', 'Gradual Rollout'];
        }
        if (lower.includes('dependency') || lower.includes('usage')) {
            return ['Behavior Testing', 'Explicit Interfaces'];
        }
        return Object.keys(this.strategies);
    }
}

// Demonstration
console.log("=== Hyrum's Law Demo ===\n");

// Create API contract
const userAPI = new APIContract('UserService', '2.0.0');

// Add documented behaviors
userAPI.addDocumentedBehavior('getUser', {
    description: 'Returns user by ID'
});

userAPI.addDocumentedBehavior('listUsers', {
    description: 'Returns paginated list of users'
});

// Record observed undocumented behaviors
userAPI.recordObservedBehavior('getUser_nullOnNotFound', {
    description: 'Returns null instead of throwing when user not found',
    type: 'undocumented',
    intentional: false
});

userAPI.recordObservedBehavior('listUsers_sortedByCreatedAt', {
    description: 'Results are always sorted by creation date',
    type: 'side-effect',
    intentional: false
});

// Record dependencies on undocumented behavior
userAPI.recordDependency('getUser_nullOnNotFound', {
    name: 'Dashboard Service',
    usage: 'Checks for null to show "user not found" message',
    critical: true
});

userAPI.recordDependency('getUser_nullOnNotFound', {
    name: 'Analytics Service',
    usage: 'Uses null check for user existence validation',
    critical: false
});

userAPI.recordDependency('listUsers_sortedByCreatedAt', {
    name: 'Admin Panel',
    usage: 'Displays users in creation order without explicit sort',
    critical: false
});

console.log("--- API Contract Analysis ---");
console.log("Hyrum's Law Report:", userAPI.getHyrumsLawReport());

// Analyze proposed change
console.log("\n--- Change Impact Analysis ---");
const changeAnalysis = userAPI.analyzeChange({
    behavior: 'getUser_nullOnNotFound',
    description: 'Throw NotFoundException instead of returning null'
});
console.log('Change Analysis:', changeAnalysis);

// Simulate change
console.log("\n--- Change Simulation ---");
const simulator = new BehaviorChangeSimulator(userAPI);
const simulation = simulator.simulate({
    behavior: 'getUser_nullOnNotFound',
    description: 'Return 404 error instead of null',
    type: 'modify'
});
console.log('Simulation Result:', simulation);

// Get recommendations
console.log("\n--- Recommendations ---");
const tracker = new CompatibilityTracker();
tracker.registerAPI(userAPI);
console.log('Recommendations:', tracker.getRecommendations('UserService'));

// Mitigation strategies
console.log("\n--- Mitigation Strategies ---");
console.log('Strategies for "breaking change":',
    HyrumsLawMitigations.recommend('breaking change'));

/**
 * Best Practices for Managing Hyrum's Law:
 *
 * 1. Document all observable behaviors, even unintentional ones
 * 2. Use explicit, well-defined interfaces
 * 3. Monitor how your API is actually being used
 * 4. Plan for long deprecation periods
 * 5. Use semantic versioning strictly
 * 6. Test for documented behavior only
 * 7. Hide implementation details
 * 8. Communicate changes early and often
 * 9. Provide migration paths for breaking changes
 * 10. Accept that users will depend on everything observable
 */
