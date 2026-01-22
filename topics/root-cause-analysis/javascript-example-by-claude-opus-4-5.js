/**
 * Root Cause Analysis (RCA) - Problem-Solving Technique
 *
 * Root cause analysis is a problem-solving technique used to identify the
 * underlying causes of an event, rather than just treating symptoms. RCA aims
 * to prevent similar problems from happening in the future. It is widely used
 * in engineering, manufacturing, healthcare, and software development.
 *
 * Key Concepts:
 * - Identify root cause, not just symptoms
 * - Prevent recurrence of problems
 * - Systematic investigation process
 * - Data-driven analysis
 */

/**
 * RCAMethod represents different root cause analysis methods.
 */
class RCAMethod {
    static methods = {
        fiveWhys: {
            name: '5 Whys',
            description: 'Ask "why" repeatedly to drill down to root cause',
            steps: [
                'Define the problem clearly',
                'Ask "Why did this happen?"',
                'For each answer, ask "Why?" again',
                'Repeat until root cause is found (typically 5 times)',
                'Identify countermeasures for root cause'
            ],
            bestFor: 'Simple problems with linear cause chains',
            limitations: 'May oversimplify complex multi-factor issues'
        },
        fishbone: {
            name: 'Fishbone Diagram (Ishikawa)',
            description: 'Categorize potential causes into major categories',
            steps: [
                'Place problem at the head of the fish',
                'Identify major cause categories (bones)',
                'Brainstorm causes for each category',
                'Identify sub-causes',
                'Analyze and prioritize causes'
            ],
            categories: ['People', 'Process', 'Technology', 'Environment', 'Materials', 'Measurement'],
            bestFor: 'Complex problems with multiple contributing factors'
        },
        faultTree: {
            name: 'Fault Tree Analysis',
            description: 'Top-down deductive analysis using logic gates',
            steps: [
                'Define the top event (failure)',
                'Identify immediate causes',
                'Connect causes with AND/OR gates',
                'Continue until basic events reached',
                'Calculate probabilities if data available'
            ],
            bestFor: 'Safety-critical systems, probability analysis'
        },
        paretoAnalysis: {
            name: 'Pareto Analysis (80/20)',
            description: 'Focus on the vital few causes that produce most effects',
            steps: [
                'List all potential causes',
                'Measure frequency or impact of each',
                'Sort in descending order',
                'Calculate cumulative percentage',
                'Focus on causes comprising 80% of impact'
            ],
            bestFor: 'Prioritizing among many potential causes'
        }
    };

    /**
     * Gets a method by name
     * @param {string} name - Method name
     * @returns {Object} Method details
     */
    static getMethod(name) {
        return this.methods[name];
    }

    /**
     * Recommends a method based on context
     * @param {Object} context - Problem context
     * @returns {Object} Recommendation
     */
    static recommend(context) {
        if (context.problemComplexity === 'simple' && context.timeAvailable === 'short') {
            return { method: 'fiveWhys', reason: 'Quick and effective for simple problems' };
        }

        if (context.problemComplexity === 'complex' && context.multipleCauses) {
            return { method: 'fishbone', reason: 'Handles multiple cause categories well' };
        }

        if (context.safetyCritical || context.needsProbability) {
            return { method: 'faultTree', reason: 'Rigorous analysis for critical systems' };
        }

        if (context.manyCauses && context.needsPrioritization) {
            return { method: 'paretoAnalysis', reason: 'Helps prioritize among many causes' };
        }

        return { method: 'fiveWhys', reason: 'Good default starting point' };
    }
}

/**
 * FiveWhysAnalysis implements the 5 Whys technique.
 */
class FiveWhysAnalysis {
    constructor(problem) {
        this.problem = problem;
        this.whys = [];
        this.rootCause = null;
        this.countermeasures = [];
    }

    /**
     * Adds a why iteration
     * @param {string} answer - Answer to "Why?"
     */
    addWhy(answer) {
        this.whys.push({
            level: this.whys.length + 1,
            question: `Why ${this.whys.length === 0 ? 'did this happen' : 'is that'}?`,
            answer: answer
        });
    }

    /**
     * Sets the identified root cause
     * @param {string} cause - Root cause
     */
    setRootCause(cause) {
        this.rootCause = cause;
    }

    /**
     * Adds a countermeasure
     * @param {Object} measure - Countermeasure details
     */
    addCountermeasure(measure) {
        this.countermeasures.push({
            action: measure.action,
            owner: measure.owner,
            dueDate: measure.dueDate,
            status: 'pending'
        });
    }

    /**
     * Gets the complete analysis
     * @returns {Object} Analysis
     */
    getAnalysis() {
        return {
            problem: this.problem,
            whyChain: this.whys,
            rootCause: this.rootCause,
            countermeasures: this.countermeasures,
            isComplete: this.rootCause !== null && this.countermeasures.length > 0
        };
    }
}

/**
 * FishboneDiagram implements the Ishikawa diagram approach.
 */
class FishboneDiagram {
    constructor(problem) {
        this.problem = problem;
        this.categories = {
            people: [],
            process: [],
            technology: [],
            environment: [],
            materials: [],
            measurement: []
        };
    }

    /**
     * Adds a cause to a category
     * @param {string} category - Cause category
     * @param {Object} cause - Cause details
     */
    addCause(category, cause) {
        if (this.categories[category]) {
            this.categories[category].push({
                cause: cause.description,
                subCauses: cause.subCauses || [],
                likelihood: cause.likelihood || 'unknown',
                evidence: cause.evidence || null
            });
        }
    }

    /**
     * Analyzes and ranks causes
     * @returns {Object} Analysis
     */
    analyze() {
        const allCauses = [];

        for (const [category, causes] of Object.entries(this.categories)) {
            for (const cause of causes) {
                allCauses.push({
                    category,
                    ...cause,
                    score: this.calculateScore(cause)
                });
            }
        }

        const ranked = allCauses.sort((a, b) => b.score - a.score);

        return {
            problem: this.problem,
            categories: this.categories,
            rankedCauses: ranked,
            topCauses: ranked.slice(0, 3),
            recommendation: ranked.length > 0
                ? `Focus investigation on: ${ranked[0].cause}`
                : 'Need more causes identified'
        };
    }

    /**
     * Calculates a score for a cause
     * @param {Object} cause - Cause to score
     * @returns {number} Score
     */
    calculateScore(cause) {
        const likelihoodScores = { high: 3, medium: 2, low: 1, unknown: 1 };
        const evidenceBonus = cause.evidence ? 2 : 0;
        const subCauseBonus = cause.subCauses.length * 0.5;

        return likelihoodScores[cause.likelihood] + evidenceBonus + subCauseBonus;
    }
}

/**
 * RCAProcess manages the full RCA workflow.
 */
class RCAProcess {
    constructor(options) {
        this.id = options.id || `RCA-${Date.now()}`;
        this.incident = options.incident;
        this.startedAt = new Date();
        this.team = options.team || [];
        this.status = 'initiated';
        this.timeline = [];
        this.findings = [];
        this.actions = [];
    }

    /**
     * Adds a timeline event
     * @param {Object} event - Event details
     */
    addTimelineEvent(event) {
        this.timeline.push({
            timestamp: event.timestamp || new Date(),
            description: event.description,
            source: event.source,
            significance: event.significance || 'normal'
        });
        this.timeline.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }

    /**
     * Adds a finding
     * @param {Object} finding - Finding details
     */
    addFinding(finding) {
        this.findings.push({
            id: `F${this.findings.length + 1}`,
            category: finding.category,
            description: finding.description,
            isRootCause: finding.isRootCause || false,
            contributingFactors: finding.contributingFactors || [],
            evidence: finding.evidence || []
        });
    }

    /**
     * Adds a corrective action
     * @param {Object} action - Action details
     */
    addAction(action) {
        this.actions.push({
            id: `A${this.actions.length + 1}`,
            type: action.type, // immediate, short-term, long-term
            description: action.description,
            owner: action.owner,
            dueDate: action.dueDate,
            findingId: action.findingId,
            status: 'planned',
            preventsFutureOccurrence: action.preventsFutureOccurrence || false
        });
    }

    /**
     * Gets RCA summary
     * @returns {Object} Summary
     */
    getSummary() {
        const rootCauses = this.findings.filter(f => f.isRootCause);
        const preventiveActions = this.actions.filter(a => a.preventsFutureOccurrence);

        return {
            id: this.id,
            incident: this.incident,
            status: this.status,
            duration: new Date() - this.startedAt,
            timelineEvents: this.timeline.length,
            findings: this.findings.length,
            rootCausesIdentified: rootCauses.length,
            actions: this.actions.length,
            preventiveActions: preventiveActions.length,
            team: this.team
        };
    }

    /**
     * Generates the final report
     * @returns {Object} Report
     */
    generateReport() {
        this.status = 'completed';
        this.completedAt = new Date();

        return {
            title: `Root Cause Analysis Report: ${this.incident}`,
            id: this.id,
            dates: {
                started: this.startedAt,
                completed: this.completedAt
            },
            executive_summary: this.generateExecutiveSummary(),
            timeline: this.timeline,
            findings: this.findings,
            root_causes: this.findings.filter(f => f.isRootCause),
            corrective_actions: this.actions,
            lessons_learned: this.generateLessonsLearned(),
            follow_up: {
                reviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                metrics: this.defineSuccessMetrics()
            }
        };
    }

    /**
     * Generates executive summary
     * @returns {string} Summary
     */
    generateExecutiveSummary() {
        const rootCauses = this.findings.filter(f => f.isRootCause);
        return `Investigation identified ${rootCauses.length} root cause(s). ` +
            `${this.actions.length} corrective actions have been defined.`;
    }

    /**
     * Generates lessons learned
     * @returns {Array} Lessons
     */
    generateLessonsLearned() {
        return this.findings.map(f => ({
            area: f.category,
            lesson: `Ensure ${f.description.toLowerCase()} is addressed`,
            preventive: f.isRootCause
        }));
    }

    /**
     * Defines success metrics
     * @returns {Array} Metrics
     */
    defineSuccessMetrics() {
        return [
            'Recurrence rate of similar incidents',
            'Time to detect similar issues',
            'Completion rate of corrective actions'
        ];
    }
}

/**
 * ParetoAnalyzer implements Pareto (80/20) analysis.
 */
class ParetoAnalyzer {
    /**
     * Performs Pareto analysis
     * @param {Array} items - Items with counts/impacts
     * @returns {Object} Analysis
     */
    static analyze(items) {
        const total = items.reduce((sum, item) => sum + item.count, 0);
        const sorted = [...items].sort((a, b) => b.count - a.count);

        let cumulative = 0;
        const analyzed = sorted.map(item => {
            cumulative += item.count;
            return {
                ...item,
                percentage: (item.count / total * 100).toFixed(1) + '%',
                cumulative: (cumulative / total * 100).toFixed(1) + '%'
            };
        });

        // Find vital few (80% of impact)
        const vitalFew = [];
        cumulative = 0;
        for (const item of sorted) {
            cumulative += item.count;
            vitalFew.push(item);
            if (cumulative / total >= 0.8) break;
        }

        return {
            items: analyzed,
            total,
            vitalFew,
            vitalFewPercentage: (vitalFew.length / items.length * 100).toFixed(1) + '%',
            trivialMany: sorted.length - vitalFew.length,
            recommendation: `Focus on ${vitalFew.length} items to address 80% of occurrences`
        };
    }
}

// Demonstration
console.log('=== Root Cause Analysis Demo ===\n');

// Method recommendation
console.log('--- Method Recommendation ---');
const recommendation = RCAMethod.recommend({
    problemComplexity: 'simple',
    timeAvailable: 'short',
    multipleCauses: false
});
console.log('Recommended method:', recommendation);

// 5 Whys Analysis
console.log('\n--- 5 Whys Analysis ---');
const fiveWhys = new FiveWhysAnalysis('Production deployment failed');

fiveWhys.addWhy('Tests did not catch the bug');
fiveWhys.addWhy('Test coverage was insufficient for the changed code');
fiveWhys.addWhy('No requirement to update tests when changing code');
fiveWhys.addWhy('Test requirements were not part of the code review checklist');
fiveWhys.addWhy('Code review checklist has not been updated in 2 years');

fiveWhys.setRootCause('Outdated code review checklist missing test requirements');
fiveWhys.addCountermeasure({
    action: 'Update code review checklist to include test coverage check',
    owner: 'Tech Lead',
    dueDate: '2024-02-01'
});

console.log('5 Whys Analysis:', fiveWhys.getAnalysis());

// Fishbone Diagram
console.log('\n--- Fishbone Diagram ---');
const fishbone = new FishboneDiagram('High defect rate in release');

fishbone.addCause('people', {
    description: 'New team members unfamiliar with codebase',
    likelihood: 'high',
    evidence: '3 new developers joined last month'
});

fishbone.addCause('process', {
    description: 'Code review process not followed',
    likelihood: 'medium',
    subCauses: ['Time pressure', 'No enforcement']
});

fishbone.addCause('technology', {
    description: 'Automated tests not covering critical paths',
    likelihood: 'high',
    evidence: 'Coverage report shows 45% on payment module'
});

fishbone.addCause('environment', {
    description: 'Dev environment differs from production',
    likelihood: 'medium'
});

console.log('Fishbone Analysis:', fishbone.analyze());

// Full RCA Process
console.log('\n--- Full RCA Process ---');
const rca = new RCAProcess({
    incident: 'Customer checkout failures on Black Friday',
    team: ['Alice (Lead)', 'Bob (Dev)', 'Carol (Ops)']
});

rca.addTimelineEvent({
    timestamp: new Date('2024-11-29T10:00:00'),
    description: 'Checkout failures begin',
    significance: 'critical'
});

rca.addTimelineEvent({
    timestamp: new Date('2024-11-29T10:15:00'),
    description: 'Alert received by ops team',
    source: 'PagerDuty'
});

rca.addFinding({
    category: 'capacity',
    description: 'Database connection pool exhausted',
    isRootCause: true,
    evidence: ['Connection pool at 100%', 'Query timeout logs']
});

rca.addAction({
    type: 'immediate',
    description: 'Increase connection pool size',
    owner: 'Bob',
    dueDate: '2024-11-30',
    findingId: 'F1',
    preventsFutureOccurrence: true
});

console.log('RCA Summary:', rca.getSummary());

// Pareto Analysis
console.log('\n--- Pareto Analysis ---');
const defectTypes = [
    { name: 'UI bugs', count: 45 },
    { name: 'Logic errors', count: 30 },
    { name: 'Performance issues', count: 15 },
    { name: 'Security vulnerabilities', count: 5 },
    { name: 'Integration failures', count: 5 }
];

console.log('Pareto Analysis:', ParetoAnalyzer.analyze(defectTypes));

/**
 * Best Practices for Root Cause Analysis:
 *
 * 1. Focus on systems and processes, not blame
 * 2. Gather data before jumping to conclusions
 * 3. Involve the right people in the analysis
 * 4. Use appropriate method for problem complexity
 * 5. Verify root causes with evidence
 * 6. Define actionable countermeasures
 * 7. Assign clear ownership for actions
 * 8. Follow up to ensure effectiveness
 * 9. Document and share lessons learned
 * 10. Build a culture of continuous improvement
 */
