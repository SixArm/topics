/**
 * The Law of Conservation of Complexity (Tesler's Law)
 *
 * The Law of Conservation of Complexity states that complexity is a finite
 * resource that must be conserved. Every increase in complexity in one part
 * of a system must be offset by a corresponding decrease elsewhere. This
 * principle promotes simplicity in design and user experience.
 *
 * Key Concepts:
 * - Complexity cannot be destroyed, only moved
 * - User-facing vs system-facing complexity
 * - Simplicity in design
 * - Trade-offs in complexity distribution
 */

/**
 * ComplexityType categorizes different types of complexity.
 */
class ComplexityType {
    static types = {
        essential: {
            name: 'Essential Complexity',
            description: 'Inherent complexity that cannot be removed',
            examples: ['Business rules', 'Domain logic', 'Legal requirements'],
            canBeReduced: false
        },
        accidental: {
            name: 'Accidental Complexity',
            description: 'Complexity introduced by implementation choices',
            examples: ['Poor architecture', 'Technical debt', 'Legacy code'],
            canBeReduced: true
        },
        userFacing: {
            name: 'User-Facing Complexity',
            description: 'Complexity visible to end users',
            examples: ['Complex UI', 'Many options', 'Difficult workflows'],
            canBeReduced: 'Can be moved to system'
        },
        systemFacing: {
            name: 'System-Facing Complexity',
            description: 'Complexity hidden in the system',
            examples: ['Smart defaults', 'Auto-configuration', 'AI assistance'],
            canBeReduced: 'Absorbs user complexity'
        }
    };

    /**
     * Gets type by name
     * @param {string} name - Type name
     * @returns {Object} Type details
     */
    static getType(name) {
        return this.types[name];
    }

    /**
     * Gets all types
     * @returns {Array} All types
     */
    static getAllTypes() {
        return Object.entries(this.types).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * ComplexityBudget tracks complexity allocation.
 */
class ComplexityBudget {
    constructor(totalBudget = 100) {
        this.totalBudget = totalBudget;
        this.allocations = new Map();
    }

    /**
     * Allocates complexity to a component
     * @param {string} component - Component name
     * @param {number} amount - Complexity amount
     */
    allocate(component, amount) {
        const current = this.getAllocated();
        if (current + amount > this.totalBudget) {
            throw new Error(`Complexity budget exceeded. Available: ${this.totalBudget - current}`);
        }
        this.allocations.set(component, (this.allocations.get(component) || 0) + amount);
    }

    /**
     * Transfers complexity between components
     * @param {string} from - Source component
     * @param {string} to - Target component
     * @param {number} amount - Amount to transfer
     */
    transfer(from, to, amount) {
        const fromAmount = this.allocations.get(from) || 0;
        if (fromAmount < amount) {
            throw new Error(`Insufficient complexity in ${from}`);
        }
        this.allocations.set(from, fromAmount - amount);
        this.allocations.set(to, (this.allocations.get(to) || 0) + amount);
    }

    /**
     * Gets total allocated complexity
     * @returns {number} Total allocated
     */
    getAllocated() {
        return Array.from(this.allocations.values()).reduce((sum, val) => sum + val, 0);
    }

    /**
     * Gets remaining budget
     * @returns {number} Remaining budget
     */
    getRemaining() {
        return this.totalBudget - this.getAllocated();
    }

    /**
     * Gets budget summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            total: this.totalBudget,
            allocated: this.getAllocated(),
            remaining: this.getRemaining(),
            allocations: Object.fromEntries(this.allocations)
        };
    }
}

/**
 * ComplexityAnalyzer analyzes system complexity.
 */
class ComplexityAnalyzer {
    /**
     * Analyzes component complexity
     * @param {Object} component - Component to analyze
     * @returns {Object} Analysis result
     */
    static analyzeComponent(component) {
        const factors = {
            methods: component.methods?.length || 0,
            dependencies: component.dependencies?.length || 0,
            conditionals: component.conditionals || 0,
            parameters: component.parameters || 0
        };

        const score = (
            factors.methods * 2 +
            factors.dependencies * 3 +
            factors.conditionals * 1.5 +
            factors.parameters * 0.5
        );

        let rating;
        if (score < 10) rating = 'low';
        else if (score < 25) rating = 'moderate';
        else if (score < 50) rating = 'high';
        else rating = 'very high';

        return {
            component: component.name,
            factors,
            score: Math.round(score),
            rating,
            recommendations: this.getRecommendations(factors)
        };
    }

    /**
     * Gets recommendations based on factors
     * @param {Object} factors - Complexity factors
     * @returns {Array} Recommendations
     */
    static getRecommendations(factors) {
        const recs = [];

        if (factors.methods > 10) {
            recs.push('Consider splitting into smaller components');
        }
        if (factors.dependencies > 5) {
            recs.push('Review dependency injection and coupling');
        }
        if (factors.conditionals > 8) {
            recs.push('Use polymorphism or strategy pattern');
        }
        if (factors.parameters > 4) {
            recs.push('Consider using parameter objects');
        }

        return recs.length > 0 ? recs : ['Complexity is within acceptable limits'];
    }

    /**
     * Compares user vs system complexity
     * @param {number} userComplexity - User-facing complexity
     * @param {number} systemComplexity - System complexity
     * @returns {Object} Comparison
     */
    static compareDistribution(userComplexity, systemComplexity) {
        const total = userComplexity + systemComplexity;
        const userPercent = (userComplexity / total) * 100;
        const systemPercent = (systemComplexity / total) * 100;

        let assessment;
        if (userPercent < 30) {
            assessment = 'Good: System absorbs most complexity';
        } else if (userPercent < 50) {
            assessment = 'Moderate: Balanced distribution';
        } else {
            assessment = 'Poor: Too much complexity exposed to users';
        }

        return {
            user: { complexity: userComplexity, percent: userPercent.toFixed(1) + '%' },
            system: { complexity: systemComplexity, percent: systemPercent.toFixed(1) + '%' },
            total,
            assessment,
            recommendation: userPercent > 40
                ? 'Move more complexity into the system'
                : 'Current distribution is acceptable'
        };
    }
}

/**
 * ComplexityReduction provides strategies to reduce complexity.
 */
class ComplexityReduction {
    static strategies = {
        smartDefaults: {
            name: 'Smart Defaults',
            description: 'Provide sensible default values',
            userImpact: 'Fewer decisions required',
            systemImpact: 'System handles common cases',
            example: 'Auto-select most common options'
        },
        progressiveDisclosure: {
            name: 'Progressive Disclosure',
            description: 'Show only necessary information initially',
            userImpact: 'Simpler initial experience',
            systemImpact: 'System manages information hierarchy',
            example: 'Advanced settings hidden by default'
        },
        automation: {
            name: 'Automation',
            description: 'Automate repetitive or complex tasks',
            userImpact: 'Less manual work',
            systemImpact: 'System handles complexity',
            example: 'Auto-fill forms, auto-save'
        },
        abstraction: {
            name: 'Abstraction',
            description: 'Hide implementation details',
            userImpact: 'Simpler mental model',
            systemImpact: 'System handles details',
            example: 'High-level API instead of low-level'
        },
        constraints: {
            name: 'Constraints',
            description: 'Limit options to prevent errors',
            userImpact: 'Fewer wrong choices possible',
            systemImpact: 'System enforces valid states',
            example: 'Dropdown instead of free text'
        }
    };

    /**
     * Gets strategy by name
     * @param {string} name - Strategy name
     * @returns {Object} Strategy details
     */
    static getStrategy(name) {
        return this.strategies[name];
    }

    /**
     * Gets all strategies
     * @returns {Array} All strategies
     */
    static getAllStrategies() {
        return Object.entries(this.strategies).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }

    /**
     * Recommends strategies for a component
     * @param {Object} analysis - Complexity analysis
     * @returns {Array} Recommended strategies
     */
    static recommendStrategies(analysis) {
        const recommendations = [];

        if (analysis.factors.parameters > 3) {
            recommendations.push(this.strategies.smartDefaults);
        }
        if (analysis.factors.methods > 8) {
            recommendations.push(this.strategies.progressiveDisclosure);
        }
        if (analysis.factors.conditionals > 5) {
            recommendations.push(this.strategies.automation);
        }
        if (analysis.factors.dependencies > 4) {
            recommendations.push(this.strategies.abstraction);
        }

        return recommendations.length > 0
            ? recommendations
            : [this.strategies.constraints];
    }
}

/**
 * TeslersLawExample demonstrates the law in practice.
 */
class TeslersLawExample {
    /**
     * Shows complexity transfer example
     * @returns {Object} Example
     */
    static dateInputExample() {
        return {
            scenario: 'Date Input',
            before: {
                userComplexity: 'User must know format (MM/DD/YYYY vs DD/MM/YYYY)',
                systemComplexity: 'Simple text field validation',
                userScore: 8,
                systemScore: 2
            },
            after: {
                userComplexity: 'User clicks on calendar',
                systemComplexity: 'System parses, validates, handles formats',
                userScore: 2,
                systemScore: 8
            },
            lesson: 'Complexity moved from user to system, total unchanged'
        };
    }

    /**
     * Shows form simplification example
     * @returns {Object} Example
     */
    static addressFormExample() {
        return {
            scenario: 'Address Form',
            before: {
                userComplexity: 'User enters all fields manually',
                fields: ['Street', 'City', 'State', 'ZIP', 'Country'],
                userScore: 10,
                systemScore: 2
            },
            after: {
                userComplexity: 'User enters ZIP, system fills rest',
                fields: ['ZIP (auto-fills others)'],
                userScore: 2,
                systemScore: 10
            },
            lesson: 'Auto-lookup transfers complexity to system'
        };
    }
}

// Demonstration
console.log('=== Law of Conservation of Complexity Demo ===\n');

// Complexity types
console.log('--- Complexity Types ---');
ComplexityType.getAllTypes().forEach(type => {
    console.log(`\n${type.name}: ${type.description}`);
});

// Complexity budget
console.log('\n--- Complexity Budget ---');
const budget = new ComplexityBudget(100);
budget.allocate('User Interface', 25);
budget.allocate('Business Logic', 40);
budget.allocate('Data Layer', 20);
console.log('Initial allocation:', budget.getSummary());

// Transfer complexity from user to system
budget.transfer('User Interface', 'Business Logic', 10);
console.log('After transfer to system:', budget.getSummary());

// Analyze component
console.log('\n--- Component Analysis ---');
const component = {
    name: 'UserRegistration',
    methods: 12,
    dependencies: 6,
    conditionals: 10,
    parameters: 5
};
console.log('Analysis:', ComplexityAnalyzer.analyzeComponent(component));

// Compare distribution
console.log('\n--- Complexity Distribution ---');
console.log(ComplexityAnalyzer.compareDistribution(30, 70));

// Reduction strategies
console.log('\n--- Reduction Strategies ---');
ComplexityReduction.getAllStrategies().slice(0, 3).forEach(strategy => {
    console.log(`\n${strategy.name}: ${strategy.description}`);
    console.log(`  User Impact: ${strategy.userImpact}`);
});

// Examples
console.log('\n--- Practical Examples ---');
console.log('Date Input:', TeslersLawExample.dateInputExample());
console.log('\nAddress Form:', TeslersLawExample.addressFormExample());

/**
 * Key Principles of the Law of Conservation of Complexity:
 *
 * 1. Complexity cannot be destroyed, only moved
 * 2. Every system has inherent essential complexity
 * 3. Good design moves complexity away from users
 * 4. Systems should absorb complexity
 * 5. Smart defaults reduce user decisions
 * 6. Progressive disclosure manages complexity
 * 7. Automation transfers complexity to systems
 * 8. Simplicity in UI requires complexity in backend
 * 9. Trade-offs must be consciously made
 * 10. User experience should be prioritized
 */
