/**
 * Technical Debt - Managing Trade-offs Between Short-term and Long-term Costs
 *
 * Technical debt is a metaphorical concept describing the accumulated cost of
 * making trade-offs between short-term gains and long-term costs in software
 * development. Like financial debt, it has interest payments that grow over
 * time, affecting development speed, reliability, and maintenance costs.
 *
 * Key Concepts:
 * - Deliberate vs accidental debt
 * - Interest payments over time
 * - Debt reduction strategies
 * - Impact on software quality
 */

/**
 * TechnicalDebtType categorizes different types of technical debt.
 */
class TechnicalDebtType {
    static types = {
        deliberate: {
            name: 'Deliberate Debt',
            description: 'Conscious decision to take shortcuts',
            examples: [
                'Skipping tests to meet deadline',
                'Using quick-and-dirty solutions',
                'Postponing refactoring'
            ],
            manageable: true
        },
        accidental: {
            name: 'Accidental Debt',
            description: 'Unintentional debt from lack of knowledge',
            examples: [
                'Poor design choices made unknowingly',
                'Missing best practices awareness',
                'Inadequate code review'
            ],
            manageable: 'with learning'
        },
        bitRot: {
            name: 'Bit Rot',
            description: 'Debt from outdated dependencies and practices',
            examples: [
                'Outdated libraries',
                'Deprecated APIs',
                'Legacy patterns'
            ],
            manageable: 'requires maintenance'
        },
        architectural: {
            name: 'Architectural Debt',
            description: 'Fundamental design compromises',
            examples: [
                'Monolith instead of microservices',
                'Wrong technology choices',
                'Missing abstraction layers'
            ],
            manageable: 'expensive to fix'
        },
        code: {
            name: 'Code Debt',
            description: 'Low-level code quality issues',
            examples: [
                'Code duplication',
                'Complex methods',
                'Poor naming'
            ],
            manageable: true
        },
        test: {
            name: 'Test Debt',
            description: 'Inadequate test coverage',
            examples: [
                'Missing unit tests',
                'No integration tests',
                'Flaky tests'
            ],
            manageable: true
        },
        documentation: {
            name: 'Documentation Debt',
            description: 'Missing or outdated documentation',
            examples: [
                'No API documentation',
                'Outdated README files',
                'Missing architecture docs'
            ],
            manageable: true
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
 * DebtItem represents a single technical debt item.
 */
class DebtItem {
    constructor(options) {
        this.id = options.id || `DEBT-${Date.now()}`;
        this.title = options.title;
        this.description = options.description;
        this.type = options.type || 'code';
        this.location = options.location;
        this.impact = options.impact || 'medium';
        this.effort = options.effort || 'medium';
        this.interestRate = options.interestRate || 'medium';
        this.createdAt = new Date();
        this.status = 'open';
    }

    /**
     * Calculates priority score
     * @returns {number} Priority score
     */
    calculatePriority() {
        const impactScore = { high: 3, medium: 2, low: 1 };
        const effortScore = { high: 1, medium: 2, low: 3 }; // Lower effort = higher priority
        const interestScore = { high: 3, medium: 2, low: 1 };

        return (
            impactScore[this.impact] * 2 +
            effortScore[this.effort] +
            interestScore[this.interestRate] * 1.5
        );
    }

    /**
     * Gets summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            type: this.type,
            impact: this.impact,
            effort: this.effort,
            priority: this.calculatePriority().toFixed(1),
            status: this.status
        };
    }
}

/**
 * DebtRegistry tracks and manages technical debt.
 */
class DebtRegistry {
    constructor(projectName) {
        this.projectName = projectName;
        this.items = [];
        this.createdAt = new Date();
    }

    /**
     * Adds a debt item
     * @param {DebtItem} item - Debt item
     */
    add(item) {
        this.items.push(item);
    }

    /**
     * Gets items by type
     * @param {string} type - Debt type
     * @returns {Array} Matching items
     */
    getByType(type) {
        return this.items.filter(item => item.type === type);
    }

    /**
     * Gets items by impact
     * @param {string} impact - Impact level
     * @returns {Array} Matching items
     */
    getByImpact(impact) {
        return this.items.filter(item => item.impact === impact);
    }

    /**
     * Gets prioritized items
     * @returns {Array} Sorted items
     */
    getPrioritized() {
        return [...this.items]
            .sort((a, b) => b.calculatePriority() - a.calculatePriority())
            .map(item => item.getSummary());
    }

    /**
     * Gets statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const byType = {};
        const byImpact = { high: 0, medium: 0, low: 0 };
        const byStatus = { open: 0, resolved: 0, accepted: 0 };

        for (const item of this.items) {
            byType[item.type] = (byType[item.type] || 0) + 1;
            byImpact[item.impact]++;
            byStatus[item.status]++;
        }

        return {
            project: this.projectName,
            totalItems: this.items.length,
            byType,
            byImpact,
            byStatus,
            debtScore: this.calculateDebtScore()
        };
    }

    /**
     * Calculates overall debt score
     * @returns {Object} Debt score
     */
    calculateDebtScore() {
        if (this.items.length === 0) return { score: 0, rating: 'A' };

        const openItems = this.items.filter(i => i.status === 'open');
        const totalPriority = openItems.reduce((sum, item) =>
            sum + item.calculatePriority(), 0
        );
        const score = totalPriority / Math.max(openItems.length, 1);

        let rating;
        if (score < 4) rating = 'A';
        else if (score < 6) rating = 'B';
        else if (score < 8) rating = 'C';
        else rating = 'D';

        return {
            score: score.toFixed(1),
            rating,
            openItems: openItems.length
        };
    }
}

/**
 * DebtPaydownStrategy suggests strategies for paying down debt.
 */
class DebtPaydownStrategy {
    static strategies = {
        boyscoutRule: {
            name: 'Boy Scout Rule',
            description: 'Leave code better than you found it',
            approach: 'Incremental improvement during feature work',
            bestFor: 'Code debt, documentation debt',
            effort: 'low'
        },
        debtSprint: {
            name: 'Debt Sprint',
            description: 'Dedicated sprint for debt reduction',
            approach: 'Focused time for significant debt items',
            bestFor: 'Accumulated debt, architectural issues',
            effort: 'high'
        },
        percentage: {
            name: 'Percentage Allocation',
            description: 'Allocate fixed percentage to debt work',
            approach: 'E.g., 20% of each sprint for debt',
            bestFor: 'Balanced approach, ongoing maintenance',
            effort: 'medium'
        },
        priorityBased: {
            name: 'Priority-Based',
            description: 'Focus on highest priority debt first',
            approach: 'Address items with highest impact/interest',
            bestFor: 'High-impact debt, critical issues',
            effort: 'medium'
        },
        opportunistic: {
            name: 'Opportunistic',
            description: 'Fix debt when touching related code',
            approach: 'Reduce debt during feature development',
            bestFor: 'Code debt, test debt',
            effort: 'low'
        }
    };

    /**
     * Recommends strategy based on debt registry
     * @param {DebtRegistry} registry - Debt registry
     * @returns {Object} Recommendation
     */
    static recommend(registry) {
        const stats = registry.getStatistics();
        const recommendations = [];

        if (stats.byImpact.high > 3) {
            recommendations.push({
                strategy: 'priorityBased',
                reason: 'Multiple high-impact debt items require focused attention'
            });
        }

        if (stats.totalItems > 20) {
            recommendations.push({
                strategy: 'debtSprint',
                reason: 'High volume of debt items suggests dedicated cleanup needed'
            });
        }

        if (stats.debtScore.rating === 'A' || stats.debtScore.rating === 'B') {
            recommendations.push({
                strategy: 'boyscoutRule',
                reason: 'Manageable debt level can be maintained incrementally'
            });
        }

        return {
            currentState: stats.debtScore,
            recommendations: recommendations.length > 0
                ? recommendations
                : [{ strategy: 'percentage', reason: 'Balanced approach recommended' }]
        };
    }

    /**
     * Gets all strategies
     * @returns {Array} Strategies
     */
    static getAllStrategies() {
        return Object.entries(this.strategies).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * DebtCostCalculator estimates the cost of technical debt.
 */
class DebtCostCalculator {
    /**
     * Calculates cost impact
     * @param {DebtItem} item - Debt item
     * @param {Object} rates - Cost rates
     * @returns {Object} Cost analysis
     */
    static calculateCost(item, rates = {}) {
        const hourlyRate = rates.hourlyRate || 100;
        const interestMultiplier = { high: 1.5, medium: 1.2, low: 1.0 };
        const effortHours = { high: 40, medium: 16, low: 4 };

        const baseEffort = effortHours[item.effort];
        const monthlyInterest = baseEffort * (interestMultiplier[item.interestRate] - 1);

        return {
            item: item.title,
            fixCost: '$' + (baseEffort * hourlyRate).toLocaleString(),
            monthlyInterest: '$' + (monthlyInterest * hourlyRate).toLocaleString(),
            breakEvenMonths: monthlyInterest > 0
                ? Math.ceil(baseEffort / monthlyInterest)
                : 'N/A',
            recommendation: monthlyInterest > baseEffort / 6
                ? 'Fix soon - high interest'
                : 'Can defer - low interest'
        };
    }

    /**
     * Calculates total portfolio cost
     * @param {DebtRegistry} registry - Debt registry
     * @param {Object} rates - Cost rates
     * @returns {Object} Portfolio cost
     */
    static calculatePortfolioCost(registry, rates = {}) {
        const items = registry.items.filter(i => i.status === 'open');
        let totalFixCost = 0;
        let totalMonthlyInterest = 0;

        const hourlyRate = rates.hourlyRate || 100;
        const effortHours = { high: 40, medium: 16, low: 4 };
        const interestMultiplier = { high: 1.5, medium: 1.2, low: 1.0 };

        for (const item of items) {
            const baseEffort = effortHours[item.effort];
            totalFixCost += baseEffort * hourlyRate;
            totalMonthlyInterest += baseEffort *
                (interestMultiplier[item.interestRate] - 1) * hourlyRate;
        }

        return {
            totalItems: items.length,
            totalFixCost: '$' + totalFixCost.toLocaleString(),
            monthlyInterest: '$' + totalMonthlyInterest.toLocaleString(),
            annualInterest: '$' + (totalMonthlyInterest * 12).toLocaleString(),
            projectedCostIn6Months: '$' + (totalFixCost + totalMonthlyInterest * 6).toLocaleString()
        };
    }
}

// Demonstration
console.log('=== Technical Debt Demo ===\n');

// Debt types
console.log('--- Technical Debt Types ---');
TechnicalDebtType.getAllTypes().slice(0, 4).forEach(type => {
    console.log(`\n${type.name}: ${type.description}`);
    console.log(`  Examples: ${type.examples.slice(0, 2).join(', ')}`);
});

// Create debt registry
console.log('\n--- Debt Registry ---');
const registry = new DebtRegistry('E-Commerce Platform');

registry.add(new DebtItem({
    title: 'Legacy authentication module',
    description: 'Using deprecated auth library',
    type: 'architectural',
    impact: 'high',
    effort: 'high',
    interestRate: 'high'
}));

registry.add(new DebtItem({
    title: 'Missing unit tests for cart module',
    description: 'Cart calculations untested',
    type: 'test',
    impact: 'medium',
    effort: 'medium',
    interestRate: 'medium'
}));

registry.add(new DebtItem({
    title: 'Duplicated validation logic',
    description: 'Same validation in 5 places',
    type: 'code',
    impact: 'medium',
    effort: 'low',
    interestRate: 'medium'
}));

registry.add(new DebtItem({
    title: 'Outdated React version',
    description: '3 major versions behind',
    type: 'bitRot',
    impact: 'medium',
    effort: 'high',
    interestRate: 'high'
}));

registry.add(new DebtItem({
    title: 'No API documentation',
    description: 'REST API undocumented',
    type: 'documentation',
    impact: 'low',
    effort: 'low',
    interestRate: 'low'
}));

console.log('Statistics:', registry.getStatistics());

// Prioritized items
console.log('\n--- Prioritized Debt ---');
registry.getPrioritized().slice(0, 3).forEach((item, i) => {
    console.log(`${i + 1}. ${item.title} (Priority: ${item.priority}, Impact: ${item.impact})`);
});

// Cost calculation
console.log('\n--- Cost Analysis ---');
console.log('Portfolio Cost:', DebtCostCalculator.calculatePortfolioCost(registry));

const highPriorityItem = registry.items[0];
console.log('\nItem Cost Analysis:', DebtCostCalculator.calculateCost(highPriorityItem));

// Strategy recommendation
console.log('\n--- Strategy Recommendation ---');
console.log(DebtPaydownStrategy.recommend(registry));

// All strategies
console.log('\n--- Available Strategies ---');
DebtPaydownStrategy.getAllStrategies().slice(0, 3).forEach(strategy => {
    console.log(`${strategy.name}: ${strategy.description}`);
});

/**
 * Best Practices for Managing Technical Debt:
 *
 * 1. Track debt explicitly in a registry
 * 2. Prioritize by impact and interest rate
 * 3. Allocate regular time for debt reduction
 * 4. Prevent new debt with code reviews
 * 5. Make debt visible to stakeholders
 * 6. Calculate the cost of not fixing
 * 7. Use the Boy Scout Rule daily
 * 8. Balance debt payment with features
 * 9. Address high-interest debt first
 * 10. Include debt in sprint planning
 */
