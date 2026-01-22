/**
 * Good Enough For Now (GEFN) - Pragmatic Quality Standards
 *
 * Good Enough for Now (GEFN) describes a standard of quality or completeness
 * that is adequate for immediate needs but may require future refinement.
 * It encourages delivering functional, reliable code quickly rather than
 * striving for perfection at every stage.
 *
 * Key Concepts:
 * - Iterative development and continuous improvement
 * - Balance speed with quality
 * - Focus on delivering critical features first
 * - Manage technical debt consciously
 */

/**
 * QualityThreshold defines acceptance criteria for GEFN decisions.
 * Helps teams determine when something is "good enough."
 */
class QualityThreshold {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.minimumCriteria = options.minimumCriteria || [];
        this.niceToHave = options.niceToHave || [];
        this.dealBreakers = options.dealBreakers || [];
    }

    /**
     * Evaluates if something meets the threshold
     * @param {Object} evaluation - Evaluation results
     * @returns {Object} Evaluation result
     */
    evaluate(evaluation) {
        const results = {
            passed: true,
            minimumMet: [],
            minimumMissing: [],
            niceToHaveAchieved: [],
            dealBreakersHit: []
        };

        // Check deal breakers first
        for (const breaker of this.dealBreakers) {
            if (evaluation[breaker.id] === true) {
                results.dealBreakersHit.push(breaker);
                results.passed = false;
            }
        }

        // Check minimum criteria
        for (const criteria of this.minimumCriteria) {
            if (evaluation[criteria.id] === true) {
                results.minimumMet.push(criteria);
            } else {
                results.minimumMissing.push(criteria);
                results.passed = false;
            }
        }

        // Check nice-to-haves
        for (const nice of this.niceToHave) {
            if (evaluation[nice.id] === true) {
                results.niceToHaveAchieved.push(nice);
            }
        }

        results.score = this.calculateScore(results);

        return results;
    }

    /**
     * Calculates quality score
     * @param {Object} results - Evaluation results
     * @returns {number} Score 0-100
     */
    calculateScore(results) {
        if (!results.passed) return 0;

        const minimumCount = this.minimumCriteria.length;
        const niceCount = this.niceToHave.length;

        const minimumScore = (results.minimumMet.length / minimumCount) * 70;
        const niceScore = niceCount > 0
            ? (results.niceToHaveAchieved.length / niceCount) * 30
            : 30;

        return Math.round(minimumScore + niceScore);
    }
}

/**
 * GEFNDecision represents a decision to ship something as "good enough."
 * Documents the rationale and planned improvements.
 */
class GEFNDecision {
    constructor(options) {
        this.id = options.id || `gefn-${Date.now()}`;
        this.feature = options.feature;
        this.description = options.description;
        this.decidedBy = options.decidedBy;
        this.decidedAt = new Date();
        this.rationale = options.rationale;
        this.currentState = options.currentState;
        this.futureImprovements = [];
        this.technicalDebt = [];
        this.expiresAt = options.expiresAt;
    }

    /**
     * Adds a planned future improvement
     * @param {Object} improvement - Improvement details
     */
    addFutureImprovement(improvement) {
        this.futureImprovements.push({
            description: improvement.description,
            priority: improvement.priority || 'medium',
            effort: improvement.effort,
            addedAt: new Date()
        });
    }

    /**
     * Records technical debt incurred
     * @param {Object} debt - Technical debt details
     */
    recordTechnicalDebt(debt) {
        this.technicalDebt.push({
            description: debt.description,
            impact: debt.impact || 'medium',
            estimatedCost: debt.estimatedCost,
            category: debt.category,
            addedAt: new Date()
        });
    }

    /**
     * Checks if decision has expired
     * @returns {boolean} True if expired
     */
    isExpired() {
        if (!this.expiresAt) return false;
        return new Date() > new Date(this.expiresAt);
    }

    /**
     * Gets decision summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            feature: this.feature,
            rationale: this.rationale,
            improvements: this.futureImprovements.length,
            technicalDebt: this.technicalDebt.length,
            expired: this.isExpired()
        };
    }
}

/**
 * GEFNRegistry tracks all GEFN decisions in a project.
 * Helps monitor technical debt and planned improvements.
 */
class GEFNRegistry {
    constructor() {
        this.decisions = new Map();
        this.categories = new Set();
    }

    /**
     * Registers a GEFN decision
     * @param {GEFNDecision} decision - Decision to register
     */
    register(decision) {
        this.decisions.set(decision.id, decision);
        console.log(`Registered GEFN decision: ${decision.feature}`);
    }

    /**
     * Gets a decision by ID
     * @param {string} id - Decision ID
     * @returns {GEFNDecision|null} Decision or null
     */
    get(id) {
        return this.decisions.get(id);
    }

    /**
     * Gets all expired decisions
     * @returns {Array} Expired decisions
     */
    getExpired() {
        return Array.from(this.decisions.values())
            .filter(d => d.isExpired());
    }

    /**
     * Gets total technical debt
     * @returns {Object} Technical debt summary
     */
    getTechnicalDebtSummary() {
        const allDebt = [];
        const byCategory = {};

        for (const decision of this.decisions.values()) {
            for (const debt of decision.technicalDebt) {
                allDebt.push({ ...debt, feature: decision.feature });

                if (!byCategory[debt.category]) {
                    byCategory[debt.category] = [];
                }
                byCategory[debt.category].push(debt);
            }
        }

        return {
            total: allDebt.length,
            byCategory,
            highImpact: allDebt.filter(d => d.impact === 'high').length
        };
    }

    /**
     * Gets all pending improvements
     * @returns {Array} Pending improvements
     */
    getPendingImprovements() {
        const improvements = [];

        for (const decision of this.decisions.values()) {
            for (const improvement of decision.futureImprovements) {
                improvements.push({
                    ...improvement,
                    feature: decision.feature,
                    decisionId: decision.id
                });
            }
        }

        return improvements.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    /**
     * Gets registry statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const decisions = Array.from(this.decisions.values());

        return {
            totalDecisions: decisions.length,
            expiredDecisions: this.getExpired().length,
            totalImprovements: decisions.reduce((sum, d) => sum + d.futureImprovements.length, 0),
            totalDebt: decisions.reduce((sum, d) => sum + d.technicalDebt.length, 0)
        };
    }
}

/**
 * GEFNEvaluator helps teams decide if something is good enough.
 * Provides frameworks for making GEFN decisions.
 */
class GEFNEvaluator {
    constructor() {
        this.factors = this.defineEvaluationFactors();
    }

    /**
     * Defines evaluation factors
     * @returns {Array} Evaluation factors
     */
    defineEvaluationFactors() {
        return [
            {
                id: 'functionality',
                name: 'Core Functionality',
                description: 'Does it solve the primary problem?',
                weight: 3
            },
            {
                id: 'reliability',
                name: 'Reliability',
                description: 'Does it work consistently without errors?',
                weight: 3
            },
            {
                id: 'security',
                name: 'Security',
                description: 'Is it secure enough for the context?',
                weight: 3
            },
            {
                id: 'performance',
                name: 'Performance',
                description: 'Is it fast enough for users?',
                weight: 2
            },
            {
                id: 'maintainability',
                name: 'Maintainability',
                description: 'Can it be reasonably maintained?',
                weight: 2
            },
            {
                id: 'usability',
                name: 'Usability',
                description: 'Can users accomplish their goals?',
                weight: 2
            },
            {
                id: 'scalability',
                name: 'Scalability',
                description: 'Will it handle expected growth?',
                weight: 1
            },
            {
                id: 'documentation',
                name: 'Documentation',
                description: 'Is it documented enough?',
                weight: 1
            }
        ];
    }

    /**
     * Evaluates if something is good enough
     * @param {Object} scores - Factor scores (0-10)
     * @param {Object} context - Context for evaluation
     * @returns {Object} Evaluation result
     */
    evaluate(scores, context = {}) {
        const results = {
            factors: [],
            totalScore: 0,
            maxScore: 0,
            percentage: 0,
            isGoodEnough: false,
            recommendations: []
        };

        // Calculate weighted scores
        for (const factor of this.factors) {
            const score = scores[factor.id] || 0;
            const weightedScore = score * factor.weight;
            const maxWeightedScore = 10 * factor.weight;

            results.factors.push({
                ...factor,
                score,
                weightedScore,
                maxWeightedScore
            });

            results.totalScore += weightedScore;
            results.maxScore += maxWeightedScore;

            // Add recommendations for low scores
            if (score < 5) {
                results.recommendations.push({
                    factor: factor.name,
                    score,
                    suggestion: `Improve ${factor.name.toLowerCase()} before shipping`
                });
            }
        }

        results.percentage = Math.round((results.totalScore / results.maxScore) * 100);

        // Determine if good enough based on context
        const threshold = context.highRisk ? 80 : 60;
        results.isGoodEnough = results.percentage >= threshold &&
            !this.hasCriticalFailures(scores);

        results.threshold = threshold;

        return results;
    }

    /**
     * Checks for critical failures
     * @param {Object} scores - Factor scores
     * @returns {boolean} True if critical failures exist
     */
    hasCriticalFailures(scores) {
        // Functionality, reliability, and security are critical
        return (scores.functionality || 0) < 5 ||
               (scores.reliability || 0) < 5 ||
               (scores.security || 0) < 5;
    }

    /**
     * Suggests areas for improvement
     * @param {Object} evaluation - Evaluation results
     * @returns {Array} Improvement suggestions
     */
    suggestImprovements(evaluation) {
        return evaluation.factors
            .filter(f => f.score < 7)
            .sort((a, b) => (a.score * a.weight) - (b.score * b.weight))
            .map(f => ({
                factor: f.name,
                currentScore: f.score,
                targetScore: 7,
                priority: f.weight >= 2 ? 'high' : 'medium'
            }));
    }
}

/**
 * IterativeImprovementTracker tracks improvements over iterations.
 * Helps manage the path from "good enough" to "great."
 */
class IterativeImprovementTracker {
    constructor(feature) {
        this.feature = feature;
        this.iterations = [];
        this.startedAt = new Date();
    }

    /**
     * Records an iteration
     * @param {Object} iteration - Iteration details
     */
    recordIteration(iteration) {
        this.iterations.push({
            version: iteration.version,
            improvements: iteration.improvements,
            qualityScore: iteration.qualityScore,
            feedback: iteration.feedback || [],
            releasedAt: new Date()
        });
    }

    /**
     * Gets improvement trend
     * @returns {Object} Trend analysis
     */
    getTrend() {
        if (this.iterations.length < 2) {
            return { trend: 'insufficient_data' };
        }

        const scores = this.iterations.map(i => i.qualityScore);
        const recent = scores.slice(-3);
        const avgRecent = recent.reduce((a, b) => a + b, 0) / recent.length;
        const avgOverall = scores.reduce((a, b) => a + b, 0) / scores.length;

        let trend;
        if (avgRecent > avgOverall + 5) trend = 'improving';
        else if (avgRecent < avgOverall - 5) trend = 'declining';
        else trend = 'stable';

        return {
            trend,
            currentScore: scores[scores.length - 1],
            averageScore: Math.round(avgOverall),
            iterations: this.iterations.length
        };
    }

    /**
     * Gets summary of all improvements made
     * @returns {Object} Improvements summary
     */
    getImprovementsSummary() {
        const allImprovements = this.iterations.flatMap(i => i.improvements);

        return {
            total: allImprovements.length,
            byIteration: this.iterations.map(i => ({
                version: i.version,
                count: i.improvements.length
            })),
            improvements: allImprovements
        };
    }
}

// Demonstration
console.log('=== Good Enough For Now (GEFN) Demo ===\n');

// Create quality threshold
const mvpThreshold = new QualityThreshold({
    name: 'MVP Release Threshold',
    description: 'Minimum criteria for MVP release',
    minimumCriteria: [
        { id: 'coreFunctional', name: 'Core features work' },
        { id: 'noDataLoss', name: 'No data loss scenarios' },
        { id: 'basicSecurity', name: 'Basic security in place' },
        { id: 'userCanComplete', name: 'Users can complete primary task' }
    ],
    niceToHave: [
        { id: 'polishedUI', name: 'Polished UI' },
        { id: 'performanceOptimized', name: 'Performance optimized' },
        { id: 'fullDocumentation', name: 'Full documentation' }
    ],
    dealBreakers: [
        { id: 'securityVulnerability', name: 'Known security vulnerability' },
        { id: 'dataCorruption', name: 'Data corruption risk' }
    ]
});

// Evaluate against threshold
console.log('--- MVP Threshold Evaluation ---');
const evaluation = mvpThreshold.evaluate({
    coreFunctional: true,
    noDataLoss: true,
    basicSecurity: true,
    userCanComplete: true,
    polishedUI: false,
    performanceOptimized: true,
    fullDocumentation: false,
    securityVulnerability: false,
    dataCorruption: false
});

console.log('Evaluation Result:', evaluation);

// Create GEFN decision
console.log('\n--- GEFN Decision ---');
const decision = new GEFNDecision({
    feature: 'User Registration Flow',
    description: 'Initial implementation of user registration',
    decidedBy: 'Product Team',
    rationale: 'Need to launch before competitor, core flow works',
    currentState: 'Basic validation, minimal error handling'
});

decision.addFutureImprovement({
    description: 'Add email verification',
    priority: 'high',
    effort: '3 days'
});

decision.addFutureImprovement({
    description: 'Improve error messages',
    priority: 'medium',
    effort: '1 day'
});

decision.recordTechnicalDebt({
    description: 'Validation logic duplicated between client and server',
    impact: 'medium',
    category: 'architecture'
});

console.log('Decision Summary:', decision.getSummary());

// Register in registry
console.log('\n--- GEFN Registry ---');
const registry = new GEFNRegistry();
registry.register(decision);

console.log('Registry Statistics:', registry.getStatistics());
console.log('Pending Improvements:', registry.getPendingImprovements());
console.log('Technical Debt:', registry.getTechnicalDebtSummary());

// Use evaluator
console.log('\n--- GEFN Evaluation ---');
const evaluator = new GEFNEvaluator();
const featureEvaluation = evaluator.evaluate({
    functionality: 8,
    reliability: 7,
    security: 6,
    performance: 5,
    maintainability: 6,
    usability: 7,
    scalability: 4,
    documentation: 3
});

console.log('Feature Evaluation:', {
    percentage: `${featureEvaluation.percentage}%`,
    isGoodEnough: featureEvaluation.isGoodEnough,
    threshold: `${featureEvaluation.threshold}%`
});

console.log('Improvement Suggestions:', evaluator.suggestImprovements(featureEvaluation));

// Track iterations
console.log('\n--- Iterative Improvement ---');
const tracker = new IterativeImprovementTracker('User Registration');

tracker.recordIteration({
    version: '1.0.0',
    improvements: ['Initial release'],
    qualityScore: 60
});

tracker.recordIteration({
    version: '1.1.0',
    improvements: ['Added email verification', 'Fixed error messages'],
    qualityScore: 72
});

tracker.recordIteration({
    version: '1.2.0',
    improvements: ['Added password strength indicator', 'Improved validation'],
    qualityScore: 85
});

console.log('Improvement Trend:', tracker.getTrend());

/**
 * Best Practices for GEFN:
 *
 * 1. Define clear "good enough" criteria upfront
 * 2. Document decisions and rationale
 * 3. Track technical debt consciously
 * 4. Plan for future improvements
 * 5. Set expiration dates for GEFN decisions
 * 6. Review and revisit regularly
 * 7. Never compromise on security
 * 8. Communicate trade-offs to stakeholders
 * 9. Balance speed with quality
 * 10. Iterate based on feedback
 */
