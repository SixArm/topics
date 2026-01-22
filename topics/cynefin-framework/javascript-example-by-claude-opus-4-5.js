/**
 * Cynefin Framework - Sense-Making for Decision-Making
 *
 * The Cynefin framework is a sense-making tool for organizational management
 * and strategic planning. It helps leaders recognize problem types and choose
 * appropriate approaches. Cynefin encourages adaptive thinking and emphasizes
 * the need to probe, sense, and respond.
 *
 * Key Domains:
 * - Simple/Clear: Known knowns - apply best practices
 * - Complicated: Known unknowns - analyze and apply expertise
 * - Complex: Unknown unknowns - probe, sense, respond
 * - Chaotic: Crisis situations - act quickly to stabilize
 * - Disorder: Uncertain state - gather more information
 */

/**
 * CynefinDomain represents a domain classification in the framework.
 * Defines characteristics and recommended approaches for each domain.
 */
class CynefinDomain {
    constructor(name, characteristics) {
        this.name = name;
        this.characteristics = characteristics;
        this.approach = characteristics.approach;
        this.decisionModel = characteristics.decisionModel;
        this.examples = characteristics.examples || [];
    }

    /**
     * Checks if a problem matches this domain's characteristics
     * @param {Object} problemTraits - Traits of the problem
     * @returns {number} Match score (0-1)
     */
    matchScore(problemTraits) {
        let score = 0;
        const traits = this.characteristics.traits || [];

        for (const trait of traits) {
            if (problemTraits[trait]) score++;
        }

        return traits.length > 0 ? score / traits.length : 0;
    }

    /**
     * Gets recommended actions for this domain
     * @returns {Array} List of recommended actions
     */
    getRecommendedActions() {
        return this.characteristics.actions || [];
    }

    /**
     * Returns domain summary
     * @returns {Object} Domain summary
     */
    getSummary() {
        return {
            name: this.name,
            approach: this.approach,
            decisionModel: this.decisionModel,
            keyActions: this.getRecommendedActions()
        };
    }
}

/**
 * CynefinFramework classifies problems and recommends approaches.
 * The core implementation for applying Cynefin to decision-making.
 */
class CynefinFramework {
    constructor() {
        this.domains = this.initializeDomains();
    }

    /**
     * Initializes the five Cynefin domains
     * @returns {Map} Domain instances
     */
    initializeDomains() {
        const domains = new Map();

        domains.set('simple', new CynefinDomain('Simple/Clear', {
            traits: ['predictable', 'repeatable', 'wellUnderstood', 'bestPracticesExist'],
            approach: 'Sense-Categorize-Respond',
            decisionModel: 'Apply best practices',
            actions: [
                'Identify the pattern',
                'Categorize the situation',
                'Apply established best practice',
                'Delegate to appropriate level'
            ],
            examples: [
                'Standard deployment procedures',
                'Routine bug fixes',
                'Well-documented processes'
            ]
        }));

        domains.set('complicated', new CynefinDomain('Complicated', {
            traits: ['analyzable', 'requiresExpertise', 'multipleSolutions', 'causeEffectDiscoverable'],
            approach: 'Sense-Analyze-Respond',
            decisionModel: 'Analyze with experts',
            actions: [
                'Gather data and analyze',
                'Consult subject matter experts',
                'Evaluate multiple options',
                'Choose and implement solution'
            ],
            examples: [
                'Performance optimization',
                'Architecture decisions',
                'Complex integrations'
            ]
        }));

        domains.set('complex', new CynefinDomain('Complex', {
            traits: ['unpredictable', 'emergent', 'interconnected', 'noRightAnswer'],
            approach: 'Probe-Sense-Respond',
            decisionModel: 'Safe-to-fail experiments',
            actions: [
                'Create safe-to-fail experiments',
                'Observe patterns that emerge',
                'Amplify what works, dampen what fails',
                'Allow solutions to emerge'
            ],
            examples: [
                'Market disruption response',
                'Organizational culture change',
                'Novel technology adoption'
            ]
        }));

        domains.set('chaotic', new CynefinDomain('Chaotic', {
            traits: ['crisis', 'urgent', 'noTimefForAnalysis', 'requiresImmediateAction'],
            approach: 'Act-Sense-Respond',
            decisionModel: 'Take immediate action',
            actions: [
                'Take immediate action to stabilize',
                'Establish order',
                'Assess the situation',
                'Move to other domains when stable'
            ],
            examples: [
                'Production outage',
                'Security breach',
                'Critical system failure'
            ]
        }));

        domains.set('disorder', new CynefinDomain('Disorder', {
            traits: ['unclear', 'ambiguous', 'needsMoreInfo', 'uncertainDomain'],
            approach: 'Gather-Clarify-Classify',
            decisionModel: 'Seek clarification',
            actions: [
                'Break down into components',
                'Gather more information',
                'Identify which domain applies',
                'Apply appropriate approach'
            ],
            examples: [
                'New project without clear scope',
                'Conflicting stakeholder views',
                'Ambiguous requirements'
            ]
        }));

        return domains;
    }

    /**
     * Classifies a problem into a Cynefin domain
     * @param {Object} problem - Problem characteristics
     * @returns {Object} Classification result
     */
    classify(problem) {
        console.log(`\nClassifying problem: ${problem.description}`);

        const scores = [];
        for (const [domainName, domain] of this.domains) {
            const score = domain.matchScore(problem.traits || {});
            scores.push({ domain: domainName, score });
        }

        scores.sort((a, b) => b.score - a.score);
        const bestMatch = scores[0];
        const domain = this.domains.get(bestMatch.domain);

        console.log(`Classification: ${domain.name}`);
        console.log(`Confidence: ${(bestMatch.score * 100).toFixed(0)}%`);
        console.log(`Approach: ${domain.approach}`);

        return {
            problem: problem.description,
            domain: domain.name,
            confidence: bestMatch.score,
            approach: domain.approach,
            recommendations: domain.getRecommendedActions(),
            allScores: scores
        };
    }

    /**
     * Gets recommendations for a domain
     * @param {string} domainName - Name of the domain
     * @returns {Object} Domain recommendations
     */
    getRecommendations(domainName) {
        const domain = this.domains.get(domainName.toLowerCase());
        if (!domain) {
            throw new Error(`Unknown domain: ${domainName}`);
        }
        return domain.getSummary();
    }
}

/**
 * ProblemAnalyzer helps analyze and characterize problems for classification.
 * Guides users through problem assessment questions.
 */
class ProblemAnalyzer {
    constructor() {
        this.questions = [
            {
                id: 'predictability',
                question: 'Is the cause-effect relationship clear and predictable?',
                traitIfYes: 'predictable',
                traitIfNo: 'unpredictable'
            },
            {
                id: 'expertise',
                question: 'Does solving this require specialized expertise?',
                traitIfYes: 'requiresExpertise',
                traitIfNo: 'wellUnderstood'
            },
            {
                id: 'urgency',
                question: 'Is immediate action required to prevent harm?',
                traitIfYes: 'crisis',
                traitIfNo: null
            },
            {
                id: 'practices',
                question: 'Do established best practices exist for this?',
                traitIfYes: 'bestPracticesExist',
                traitIfNo: null
            },
            {
                id: 'emergence',
                question: 'Are outcomes likely to emerge unpredictably?',
                traitIfYes: 'emergent',
                traitIfNo: 'analyzable'
            },
            {
                id: 'clarity',
                question: 'Is the problem itself clearly defined?',
                traitIfYes: null,
                traitIfNo: 'unclear'
            }
        ];
    }

    /**
     * Analyzes a problem based on answers
     * @param {Object} answers - Answers to assessment questions
     * @returns {Object} Analysis with traits
     */
    analyze(answers) {
        const traits = {};

        for (const q of this.questions) {
            const answer = answers[q.id];
            if (answer === true && q.traitIfYes) {
                traits[q.traitIfYes] = true;
            } else if (answer === false && q.traitIfNo) {
                traits[q.traitIfNo] = true;
            }
        }

        return { traits };
    }

    /**
     * Gets all assessment questions
     * @returns {Array} Assessment questions
     */
    getQuestions() {
        return this.questions.map(q => ({
            id: q.id,
            question: q.question
        }));
    }
}

/**
 * TestingStrategyAdvisor recommends testing strategies based on Cynefin.
 * Applies domain-appropriate testing approaches.
 */
class TestingStrategyAdvisor {
    constructor() {
        this.strategies = {
            simple: {
                name: 'Standardized Testing',
                approaches: [
                    'Automated regression tests',
                    'Checklist-based testing',
                    'Standard test procedures',
                    'Continuous integration testing'
                ],
                automation: 'High - fully automate',
                documentation: 'Maintain standard test cases'
            },
            complicated: {
                name: 'Expert-Guided Testing',
                approaches: [
                    'Risk-based testing',
                    'Exploratory testing by experts',
                    'Performance testing',
                    'Security testing'
                ],
                automation: 'Medium - automate stable areas',
                documentation: 'Document analysis and decisions'
            },
            complex: {
                name: 'Adaptive Testing',
                approaches: [
                    'Exploratory testing',
                    'A/B testing experiments',
                    'Chaos engineering',
                    'User behavior monitoring'
                ],
                automation: 'Low - focus on monitoring',
                documentation: 'Capture learnings and patterns'
            },
            chaotic: {
                name: 'Crisis Response Testing',
                approaches: [
                    'Smoke testing essentials',
                    'Rapid sanity checks',
                    'Core functionality verification',
                    'Rollback testing'
                ],
                automation: 'Minimal - fast manual checks',
                documentation: 'Post-incident review'
            },
            disorder: {
                name: 'Discovery Testing',
                approaches: [
                    'Spike solutions',
                    'Proof of concept testing',
                    'Requirements clarification',
                    'Stakeholder validation'
                ],
                automation: 'None initially',
                documentation: 'Capture requirements as tests'
            }
        };
    }

    /**
     * Gets testing strategy for a domain
     * @param {string} domain - Cynefin domain
     * @returns {Object} Testing strategy
     */
    getStrategy(domain) {
        const normalizedDomain = domain.toLowerCase().replace('/clear', '');
        return this.strategies[normalizedDomain] || this.strategies.disorder;
    }

    /**
     * Recommends test automation level
     * @param {string} domain - Cynefin domain
     * @returns {string} Automation recommendation
     */
    getAutomationLevel(domain) {
        const strategy = this.getStrategy(domain);
        return strategy.automation;
    }
}

/**
 * DecisionLog tracks decisions and their Cynefin classifications.
 * Helps teams learn from past decisions.
 */
class DecisionLog {
    constructor() {
        this.decisions = [];
    }

    /**
     * Records a decision
     * @param {Object} decision - Decision details
     */
    record(decision) {
        this.decisions.push({
            id: `DEC-${this.decisions.length + 1}`,
            timestamp: new Date().toISOString(),
            ...decision
        });
    }

    /**
     * Finds decisions by domain
     * @param {string} domain - Domain to filter by
     * @returns {Array} Matching decisions
     */
    findByDomain(domain) {
        return this.decisions.filter(d =>
            d.domain.toLowerCase() === domain.toLowerCase()
        );
    }

    /**
     * Gets summary statistics
     * @returns {Object} Decision statistics
     */
    getStatistics() {
        const byDomain = {};
        for (const d of this.decisions) {
            byDomain[d.domain] = (byDomain[d.domain] || 0) + 1;
        }

        return {
            total: this.decisions.length,
            byDomain
        };
    }
}

// Demonstration
console.log('=== Cynefin Framework Demo ===');

// Create framework instance
const cynefin = new CynefinFramework();

// Show all domains
console.log('\n--- Cynefin Domains ---');
for (const [name, domain] of cynefin.domains) {
    console.log(`\n${domain.name}:`);
    console.log(`  Approach: ${domain.approach}`);
    console.log(`  Decision Model: ${domain.decisionModel}`);
}

// Problem analysis
console.log('\n--- Problem Analysis ---');
const analyzer = new ProblemAnalyzer();

// Classify a simple problem
const simpleProblem = {
    description: 'Deploy new version with standard procedure',
    traits: {
        predictable: true,
        wellUnderstood: true,
        bestPracticesExist: true,
        repeatable: true
    }
};

cynefin.classify(simpleProblem);

// Classify a complex problem
const complexProblem = {
    description: 'Improve user engagement with new feature',
    traits: {
        unpredictable: true,
        emergent: true,
        interconnected: true,
        noRightAnswer: true
    }
};

cynefin.classify(complexProblem);

// Classify a chaotic problem
const chaoticProblem = {
    description: 'Production database corruption',
    traits: {
        crisis: true,
        urgent: true,
        noTimeForAnalysis: true,
        requiresImmediateAction: true
    }
};

cynefin.classify(chaoticProblem);

// Testing strategy recommendations
console.log('\n--- Testing Strategy Advisor ---');
const advisor = new TestingStrategyAdvisor();

['Simple', 'Complicated', 'Complex', 'Chaotic', 'Disorder'].forEach(domain => {
    const strategy = advisor.getStrategy(domain);
    console.log(`\n${domain} Domain Testing:`);
    console.log(`  Strategy: ${strategy.name}`);
    console.log(`  Automation: ${strategy.automation}`);
    console.log(`  Approaches: ${strategy.approaches.slice(0, 2).join(', ')}...`);
});

// Decision logging
console.log('\n--- Decision Log ---');
const log = new DecisionLog();

log.record({
    problem: 'API performance issue',
    domain: 'Complicated',
    approach: 'Engaged performance expert',
    outcome: 'Identified and fixed bottleneck'
});

log.record({
    problem: 'New market opportunity',
    domain: 'Complex',
    approach: 'A/B testing experiments',
    outcome: 'Discovered effective approach through iteration'
});

console.log('Decision Statistics:', log.getStatistics());

/**
 * Best Practices for Applying Cynefin:
 *
 * 1. Don't force-fit problems into familiar domains
 * 2. Recognize that problems can shift between domains
 * 3. Use different approaches for different domains
 * 4. In complex situations, run safe-to-fail experiments
 * 5. In chaotic situations, act first to stabilize
 * 6. Review past decisions to improve domain recognition
 * 7. Involve diverse perspectives in classification
 * 8. Accept uncertainty in complex/chaotic domains
 * 9. Continuously reassess as situations evolve
 * 10. Document learnings from each domain experience
 */
