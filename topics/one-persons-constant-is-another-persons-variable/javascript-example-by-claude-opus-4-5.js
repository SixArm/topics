/**
 * One Person's Constant Is Another Person's Variable
 *
 * This programming adage highlights the subjective nature of coding decisions.
 * What one programmer defines as a constant (unchanging value) might be treated
 * as a variable (changeable value) by another programmer, depending on context
 * and use case. It emphasizes the importance of clear communication and
 * documentation in collaborative development.
 *
 * Key Concepts:
 * - Constants vs variables are context-dependent
 * - Different perspectives lead to different designs
 * - Documentation clarifies intent
 * - Configuration flexibility vs simplicity trade-off
 */

/**
 * ConfigurationPhilosophy demonstrates different approaches.
 * Shows how the same value can be treated differently.
 */
class ConfigurationPhilosophy {
    /**
     * Example: Tax rate treated as constant
     */
    static constantApproach() {
        // Developer A: "Tax rate is fixed by law, make it a constant"
        const TAX_RATE = 0.20; // 20% VAT

        function calculateTotal(price) {
            return price * (1 + TAX_RATE);
        }

        return {
            approach: 'Constant',
            rationale: 'Tax rate rarely changes, simplicity preferred',
            code: 'const TAX_RATE = 0.20',
            total: calculateTotal(100)
        };
    }

    /**
     * Example: Tax rate treated as variable
     */
    static variableApproach() {
        // Developer B: "Tax rate varies by region, make it configurable"
        let taxRate = 0.20;

        function calculateTotal(price, rate = taxRate) {
            return price * (1 + rate);
        }

        function setTaxRate(newRate) {
            taxRate = newRate;
        }

        return {
            approach: 'Variable',
            rationale: 'Tax rate varies by jurisdiction, flexibility needed',
            code: 'let taxRate = 0.20',
            defaultTotal: calculateTotal(100),
            ukTotal: calculateTotal(100, 0.20),
            usTotal: calculateTotal(100, 0.0825)
        };
    }

    /**
     * Example: Configuration-driven approach
     */
    static configurationApproach() {
        // Developer C: "Let the deployment environment decide"
        const config = {
            taxRate: process.env.TAX_RATE || 0.20,
            currency: process.env.CURRENCY || 'USD',
            precision: process.env.PRICE_PRECISION || 2
        };

        function calculateTotal(price) {
            return Number((price * (1 + config.taxRate)).toFixed(config.precision));
        }

        return {
            approach: 'Configuration-driven',
            rationale: 'Behavior defined by deployment environment',
            code: 'config.taxRate = process.env.TAX_RATE',
            total: calculateTotal(100)
        };
    }
}

/**
 * ContextualConstant shows how context affects decisions.
 * The same value may be constant in one context, variable in another.
 */
class ContextualConstant {
    constructor() {
        this.examples = [];
    }

    /**
     * Adds an example of contextual difference
     * @param {Object} example - Example definition
     */
    addExample(example) {
        this.examples.push({
            name: example.name,
            asConstant: {
                context: example.constantContext,
                rationale: example.constantRationale
            },
            asVariable: {
                context: example.variableContext,
                rationale: example.variableRationale
            }
        });
    }

    /**
     * Gets all examples
     * @returns {Array} Examples
     */
    getExamples() {
        return this.examples;
    }
}

/**
 * DesignDecisionTracker documents design choices.
 * Helps teams understand why values are constants or variables.
 */
class DesignDecisionTracker {
    constructor() {
        this.decisions = [];
    }

    /**
     * Records a design decision
     * @param {Object} decision - Decision details
     */
    recordDecision(decision) {
        this.decisions.push({
            id: `DD-${this.decisions.length + 1}`,
            date: new Date().toISOString(),
            value: decision.value,
            treatment: decision.treatment, // 'constant' or 'variable'
            rationale: decision.rationale,
            author: decision.author,
            alternatives: decision.alternatives || [],
            reviewedBy: decision.reviewedBy || []
        });
    }

    /**
     * Gets decisions for a specific treatment
     * @param {string} treatment - 'constant' or 'variable'
     * @returns {Array} Matching decisions
     */
    getDecisionsByTreatment(treatment) {
        return this.decisions.filter(d => d.treatment === treatment);
    }

    /**
     * Gets all decisions
     * @returns {Array} All decisions
     */
    getAllDecisions() {
        return this.decisions;
    }
}

/**
 * CodeReviewScenario simulates a code review discussion.
 * Shows how different perspectives arise.
 */
class CodeReviewScenario {
    constructor(valueName) {
        this.valueName = valueName;
        this.perspectives = [];
    }

    /**
     * Adds a reviewer perspective
     * @param {Object} perspective - Reviewer's view
     */
    addPerspective(perspective) {
        this.perspectives.push({
            reviewer: perspective.reviewer,
            role: perspective.role,
            recommendation: perspective.recommendation,
            reasoning: perspective.reasoning
        });
    }

    /**
     * Facilitates discussion resolution
     * @returns {Object} Resolution
     */
    resolveDiscussion() {
        const constantVotes = this.perspectives.filter(p =>
            p.recommendation === 'constant'
        ).length;
        const variableVotes = this.perspectives.filter(p =>
            p.recommendation === 'variable'
        ).length;

        const winner = constantVotes > variableVotes ? 'constant' : 'variable';

        return {
            valueName: this.valueName,
            perspectives: this.perspectives.length,
            constantVotes,
            variableVotes,
            recommendation: winner,
            note: 'Final decision should consider all contexts and future needs'
        };
    }
}

/**
 * FlexibilitySpectrum shows the range of configuration options.
 */
class FlexibilitySpectrum {
    static getSpectrum() {
        return [
            {
                level: 1,
                name: 'Hard-coded constant',
                description: 'Value embedded directly in code',
                example: 'const PI = 3.14159',
                flexibility: 'None - requires code change',
                useCase: 'Mathematical constants, truly immutable values'
            },
            {
                level: 2,
                name: 'Module-level constant',
                description: 'Constant defined at top of file',
                example: 'const DEFAULT_TIMEOUT = 5000',
                flexibility: 'Low - requires code change and deployment',
                useCase: 'Default values that rarely change'
            },
            {
                level: 3,
                name: 'Configuration file',
                description: 'Value in separate config file',
                example: 'config.json: { "timeout": 5000 }',
                flexibility: 'Medium - requires file edit and restart',
                useCase: 'Environment-specific settings'
            },
            {
                level: 4,
                name: 'Environment variable',
                description: 'Value from environment',
                example: 'process.env.TIMEOUT',
                flexibility: 'Medium-high - set at deployment',
                useCase: 'Deployment-specific configuration'
            },
            {
                level: 5,
                name: 'Runtime configuration',
                description: 'Value from database or API',
                example: 'await config.get("timeout")',
                flexibility: 'High - changeable without restart',
                useCase: 'Feature flags, A/B testing'
            },
            {
                level: 6,
                name: 'User-configurable',
                description: 'Value settable by end user',
                example: 'userPreferences.timeout',
                flexibility: 'Maximum - per-user customization',
                useCase: 'User preferences, personalization'
            }
        ];
    }

    /**
     * Recommends flexibility level for a value
     * @param {Object} criteria - Decision criteria
     * @returns {Object} Recommendation
     */
    static recommend(criteria) {
        const {
            changesFrequently,
            variesByEnvironment,
            variesByUser,
            requiresRestart
        } = criteria;

        if (variesByUser) return this.getSpectrum()[5];
        if (changesFrequently && !requiresRestart) return this.getSpectrum()[4];
        if (variesByEnvironment) return this.getSpectrum()[3];
        if (changesFrequently) return this.getSpectrum()[2];
        return this.getSpectrum()[1];
    }
}

/**
 * TeamCommunication helps teams align on constants vs variables.
 */
class TeamCommunication {
    /**
     * Generates a documentation template for a value
     * @param {Object} value - Value to document
     * @returns {Object} Documentation
     */
    static generateDocumentation(value) {
        return {
            name: value.name,
            type: value.isConstant ? 'constant' : 'variable',
            currentValue: value.value,
            description: value.description,
            rationale: value.rationale,
            canChange: !value.isConstant,
            changeProcedure: value.isConstant
                ? 'Requires code change and deployment'
                : value.changeProcedure,
            validValues: value.validValues || 'Any',
            examples: value.examples || [],
            lastReviewed: new Date().toISOString()
        };
    }

    /**
     * Generates review checklist for constant vs variable decision
     * @returns {Array} Checklist items
     */
    static getReviewChecklist() {
        return [
            { question: 'Does this value ever need to change?', ifYes: 'Consider variable' },
            { question: 'Does it vary by environment (dev/prod)?', ifYes: 'Use configuration' },
            { question: 'Does it vary by customer or user?', ifYes: 'Make it user-configurable' },
            { question: 'Is it a mathematical or physical constant?', ifYes: 'Use constant' },
            { question: 'Could it change due to external factors (laws, APIs)?', ifYes: 'Use configuration' },
            { question: 'Would changing it require testing?', ifYes: 'Document thoroughly' },
            { question: 'Is the meaning clear without context?', ifNo: 'Add documentation' },
            { question: 'Have other team members been consulted?', ifNo: 'Discuss before deciding' }
        ];
    }
}

// Demonstration
console.log("=== One Person's Constant Is Another Person's Variable Demo ===\n");

// Show different approaches
console.log('--- Different Approaches to Same Value ---');
console.log('Constant approach:', ConfigurationPhilosophy.constantApproach());
console.log('Variable approach:', ConfigurationPhilosophy.variableApproach());
console.log('Configuration approach:', ConfigurationPhilosophy.configurationApproach());

// Contextual examples
console.log('\n--- Contextual Examples ---');
const contextual = new ContextualConstant();

contextual.addExample({
    name: 'API Timeout',
    constantContext: 'Internal microservice with known latency',
    constantRationale: 'Latency is predictable, simplicity preferred',
    variableContext: 'Client-facing API with varying conditions',
    variableRationale: 'Network conditions vary, flexibility needed'
});

contextual.addExample({
    name: 'Max File Upload Size',
    constantContext: 'Embedded system with fixed storage',
    constantRationale: 'Hardware limitation is absolute',
    variableContext: 'Cloud application with tiered plans',
    variableRationale: 'Different limits for different subscription tiers'
});

contextual.getExamples().forEach(ex => {
    console.log(`\n${ex.name}:`);
    console.log(`  As constant: ${ex.asConstant.context}`);
    console.log(`  As variable: ${ex.asVariable.context}`);
});

// Code review scenario
console.log('\n--- Code Review Scenario ---');
const review = new CodeReviewScenario('SESSION_TIMEOUT');

review.addPerspective({
    reviewer: 'Alice',
    role: 'Backend Developer',
    recommendation: 'constant',
    reasoning: 'Security requirement, should not be easily changed'
});

review.addPerspective({
    reviewer: 'Bob',
    role: 'DevOps Engineer',
    recommendation: 'variable',
    reasoning: 'Need different values for dev vs production'
});

review.addPerspective({
    reviewer: 'Carol',
    role: 'Product Manager',
    recommendation: 'variable',
    reasoning: 'Enterprise customers want longer sessions'
});

console.log('Resolution:', review.resolveDiscussion());

// Flexibility spectrum
console.log('\n--- Flexibility Spectrum ---');
FlexibilitySpectrum.getSpectrum().slice(0, 4).forEach(level => {
    console.log(`Level ${level.level}: ${level.name}`);
    console.log(`  Use case: ${level.useCase}`);
});

// Recommendation
console.log('\n--- Recommendation for Feature Flag ---');
console.log(FlexibilitySpectrum.recommend({
    changesFrequently: true,
    variesByEnvironment: true,
    variesByUser: false,
    requiresRestart: false
}));

// Review checklist
console.log('\n--- Review Checklist ---');
TeamCommunication.getReviewChecklist().slice(0, 4).forEach(item => {
    console.log(`Q: ${item.question}`);
    console.log(`   → ${item.ifYes || item.ifNo}`);
});

/**
 * Best Practices for Constants vs Variables Decisions:
 *
 * 1. Document the rationale for every configuration decision
 * 2. Consider all deployment environments early
 * 3. Discuss design decisions with team members
 * 4. Use configuration files for environment-specific values
 * 5. Reserve true constants for immutable values
 * 6. Make configuration changes testable
 * 7. Provide sensible defaults for all configurable values
 * 8. Review configuration decisions during code reviews
 * 9. Consider future flexibility needs
 * 10. Balance simplicity with configurability
 */
