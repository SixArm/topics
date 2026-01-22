/**
 * The Law of Supply and Demand - Economic Principles in Testing
 *
 * The Law of Supply and Demand explains how prices and quantities are
 * determined by the balance between supply and demand. In testing, this
 * applies to resource allocation, prioritization, and the economics of
 * quality assurance decisions.
 *
 * Key Concepts:
 * - Resource allocation
 * - Test prioritization economics
 * - Quality-cost trade-offs
 * - Testing market dynamics
 */

/**
 * TestingResource represents a testing resource.
 */
class TestingResource {
    constructor(options) {
        this.name = options.name;
        this.type = options.type;
        this.supply = options.supply || 100; // Available units
        this.demand = options.demand || 0;   // Requested units
        this.unitCost = options.unitCost || 1;
    }

    /**
     * Gets equilibrium status
     * @returns {Object} Status
     */
    getStatus() {
        const surplus = this.supply - this.demand;
        let status;

        if (surplus > this.supply * 0.2) status = 'surplus';
        else if (surplus < -this.supply * 0.2) status = 'shortage';
        else status = 'balanced';

        return {
            resource: this.name,
            supply: this.supply,
            demand: this.demand,
            surplus,
            status,
            effectiveCost: this.calculateEffectiveCost()
        };
    }

    /**
     * Calculates effective cost based on supply/demand
     * @returns {number} Effective cost
     */
    calculateEffectiveCost() {
        const ratio = this.demand / this.supply;
        // Cost increases when demand exceeds supply
        return this.unitCost * Math.max(0.5, Math.min(2, ratio));
    }

    /**
     * Adjusts supply
     * @param {number} amount - Amount to adjust
     */
    adjustSupply(amount) {
        this.supply = Math.max(0, this.supply + amount);
    }

    /**
     * Adjusts demand
     * @param {number} amount - Amount to adjust
     */
    adjustDemand(amount) {
        this.demand = Math.max(0, this.demand + amount);
    }
}

/**
 * TestPrioritizationEconomics applies economic principles to prioritization.
 */
class TestPrioritizationEconomics {
    /**
     * Calculates ROI for test automation
     * @param {Object} test - Test details
     * @returns {Object} ROI analysis
     */
    static calculateAutomationROI(test) {
        const manualCost = test.manualTime * test.manualRate * test.expectedRuns;
        const automationCost = test.automationTime * test.automationRate;
        const maintenanceCost = test.maintenanceTime * test.automationRate * test.expectedYears;
        const automatedRunCost = test.automatedRunTime * test.automationRate * test.expectedRuns;

        const totalAutomationCost = automationCost + maintenanceCost + automatedRunCost;
        const savings = manualCost - totalAutomationCost;
        const roi = ((manualCost - totalAutomationCost) / totalAutomationCost) * 100;
        const breakEvenRuns = Math.ceil(automationCost / (test.manualTime * test.manualRate - test.automatedRunTime * test.automationRate));

        return {
            test: test.name,
            manualCost: '$' + manualCost.toFixed(2),
            automationCost: '$' + totalAutomationCost.toFixed(2),
            savings: '$' + savings.toFixed(2),
            roi: roi.toFixed(1) + '%',
            breakEvenRuns,
            recommendation: roi > 50 ? 'Strong automation candidate' :
                roi > 0 ? 'Consider automation' : 'Keep manual'
        };
    }

    /**
     * Prioritizes tests based on value/cost ratio
     * @param {Array} tests - Tests to prioritize
     * @returns {Array} Prioritized tests
     */
    static prioritize(tests) {
        return tests.map(test => ({
            ...test,
            valueScore: test.riskCoverage * test.frequency,
            costScore: test.complexity * test.executionTime,
            ratio: (test.riskCoverage * test.frequency) / (test.complexity * test.executionTime)
        })).sort((a, b) => b.ratio - a.ratio);
    }
}

/**
 * QualityCostTradeoff analyzes quality vs cost trade-offs.
 */
class QualityCostTradeoff {
    static models = {
        preventionCost: {
            name: 'Prevention Cost',
            description: 'Cost to prevent defects',
            examples: ['Training', 'Code review', 'Static analysis'],
            trend: 'Higher investment = fewer defects'
        },
        appraisalCost: {
            name: 'Appraisal Cost',
            description: 'Cost to detect defects',
            examples: ['Testing', 'QA', 'Inspections'],
            trend: 'Investment needed to find existing defects'
        },
        internalFailureCost: {
            name: 'Internal Failure Cost',
            description: 'Cost of defects found before release',
            examples: ['Rework', 'Retesting', 'Debug time'],
            trend: 'Lower with more prevention'
        },
        externalFailureCost: {
            name: 'External Failure Cost',
            description: 'Cost of defects found by customers',
            examples: ['Support', 'Reputation', 'Liability'],
            trend: 'Much higher than internal failures'
        }
    };

    /**
     * Calculates total cost of quality
     * @param {Object} costs - Cost breakdown
     * @returns {Object} Total cost analysis
     */
    static calculateTotalCost(costs) {
        const prevention = costs.prevention || 0;
        const appraisal = costs.appraisal || 0;
        const internalFailure = costs.internalFailure || 0;
        const externalFailure = costs.externalFailure || 0;

        const total = prevention + appraisal + internalFailure + externalFailure;
        const conformanceCost = prevention + appraisal;
        const nonConformanceCost = internalFailure + externalFailure;

        return {
            breakdown: {
                prevention: '$' + prevention,
                appraisal: '$' + appraisal,
                internalFailure: '$' + internalFailure,
                externalFailure: '$' + externalFailure
            },
            total: '$' + total,
            conformanceCost: '$' + conformanceCost,
            nonConformanceCost: '$' + nonConformanceCost,
            ratio: (conformanceCost / nonConformanceCost).toFixed(2),
            recommendation: nonConformanceCost > conformanceCost * 2
                ? 'Invest more in prevention and appraisal'
                : 'Balance appears reasonable'
        };
    }

    /**
     * Estimates defect cost by phase
     * @param {number} baseCost - Base cost to fix defect
     * @returns {Object} Cost by phase
     */
    static defectCostByPhase(baseCost) {
        // Cost multipliers by phase (1x, 5x, 10x, 100x rule)
        const multipliers = {
            requirements: 1,
            design: 5,
            development: 10,
            testing: 20,
            production: 100
        };

        const costs = {};
        for (const [phase, multiplier] of Object.entries(multipliers)) {
            costs[phase] = '$' + (baseCost * multiplier);
        }

        return {
            baseCost: '$' + baseCost,
            costByPhase: costs,
            lesson: 'Find defects early - cost increases exponentially'
        };
    }
}

/**
 * ResourceAllocationOptimizer optimizes test resource allocation.
 */
class ResourceAllocationOptimizer {
    /**
     * Allocates resources based on demand
     * @param {Array} resources - Available resources
     * @param {Array} demands - Demand requests
     * @returns {Object} Allocation result
     */
    static allocate(resources, demands) {
        const resourceMap = new Map(
            resources.map(r => [r.name, { ...r, allocated: 0 }])
        );

        // Sort demands by priority
        const sortedDemands = [...demands].sort((a, b) => b.priority - a.priority);

        const allocations = [];
        const unmetDemands = [];

        for (const demand of sortedDemands) {
            const resource = resourceMap.get(demand.resource);
            if (!resource) {
                unmetDemands.push({ ...demand, reason: 'Resource not found' });
                continue;
            }

            const available = resource.supply - resource.allocated;
            const allocated = Math.min(demand.amount, available);

            if (allocated > 0) {
                resource.allocated += allocated;
                allocations.push({
                    demand: demand.name,
                    resource: demand.resource,
                    requested: demand.amount,
                    allocated,
                    satisfied: allocated === demand.amount
                });
            }

            if (allocated < demand.amount) {
                unmetDemands.push({
                    ...demand,
                    shortfall: demand.amount - allocated,
                    reason: 'Insufficient supply'
                });
            }
        }

        return {
            allocations,
            unmetDemands,
            resourceUtilization: Array.from(resourceMap.values()).map(r => ({
                resource: r.name,
                supply: r.supply,
                allocated: r.allocated,
                utilization: ((r.allocated / r.supply) * 100).toFixed(1) + '%'
            }))
        };
    }

    /**
     * Recommends resource adjustments
     * @param {Object} allocationResult - Allocation result
     * @returns {Array} Recommendations
     */
    static recommend(allocationResult) {
        const recommendations = [];

        for (const util of allocationResult.resourceUtilization) {
            const utilizationPercent = parseFloat(util.utilization);
            if (utilizationPercent > 90) {
                recommendations.push({
                    resource: util.resource,
                    issue: 'Near capacity',
                    action: 'Consider adding more supply'
                });
            } else if (utilizationPercent < 50) {
                recommendations.push({
                    resource: util.resource,
                    issue: 'Underutilized',
                    action: 'Consider reallocating to other needs'
                });
            }
        }

        for (const unmet of allocationResult.unmetDemands) {
            recommendations.push({
                resource: unmet.resource,
                issue: `Unmet demand: ${unmet.name}`,
                action: `Need additional ${unmet.shortfall || unmet.amount} units`
            });
        }

        return recommendations;
    }
}

/**
 * TestingMarketDynamics models supply/demand in testing.
 */
class TestingMarketDynamics {
    static dynamics = {
        skillShortage: {
            name: 'QA Skill Shortage',
            supply: 'Limited qualified testers',
            demand: 'High demand for automation skills',
            effect: 'Higher salaries, longer hiring cycles',
            solution: 'Training, upskilling, tools'
        },
        toolCompetition: {
            name: 'Testing Tool Market',
            supply: 'Many tools available',
            demand: 'Specific integration needs',
            effect: 'Tool fragmentation, switching costs',
            solution: 'Standardization, evaluation criteria'
        },
        timeConstraints: {
            name: 'Testing Time Crunch',
            supply: 'Fixed sprint duration',
            demand: 'Growing test requirements',
            effect: 'Test prioritization pressure',
            solution: 'Automation, risk-based testing'
        }
    };

    /**
     * Gets all dynamics
     * @returns {Array} All dynamics
     */
    static getAllDynamics() {
        return Object.entries(this.dynamics).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

// Demonstration
console.log('=== Law of Supply and Demand Demo ===\n');

// Testing resource
console.log('--- Testing Resource Status ---');
const qaResource = new TestingResource({
    name: 'QA Engineer Hours',
    type: 'human',
    supply: 160, // Monthly hours
    demand: 200,
    unitCost: 50
});
console.log(qaResource.getStatus());

// Automation ROI
console.log('\n--- Automation ROI Analysis ---');
const loginTest = {
    name: 'Login Test',
    manualTime: 0.5, // hours
    manualRate: 40,  // $/hour
    automationTime: 8, // hours to automate
    automationRate: 60, // $/hour
    automatedRunTime: 0.01, // hours
    maintenanceTime: 2, // hours/year
    expectedRuns: 500, // per year
    expectedYears: 3
};
console.log(TestPrioritizationEconomics.calculateAutomationROI(loginTest));

// Test prioritization
console.log('\n--- Test Prioritization ---');
const tests = [
    { name: 'Checkout', riskCoverage: 9, frequency: 100, complexity: 5, executionTime: 2 },
    { name: 'Profile Update', riskCoverage: 3, frequency: 20, complexity: 2, executionTime: 1 },
    { name: 'Login', riskCoverage: 10, frequency: 500, complexity: 3, executionTime: 0.5 }
];
console.log('Prioritized:', TestPrioritizationEconomics.prioritize(tests).map(t =>
    ({ name: t.name, ratio: t.ratio.toFixed(2) })
));

// Quality cost trade-off
console.log('\n--- Cost of Quality ---');
console.log(QualityCostTradeoff.calculateTotalCost({
    prevention: 5000,
    appraisal: 8000,
    internalFailure: 10000,
    externalFailure: 25000
}));

// Defect cost by phase
console.log('\n--- Defect Cost by Phase ---');
console.log(QualityCostTradeoff.defectCostByPhase(100));

// Resource allocation
console.log('\n--- Resource Allocation ---');
const resources = [
    { name: 'QA Hours', supply: 160 },
    { name: 'Test Environment', supply: 3 }
];
const demands = [
    { name: 'Sprint Testing', resource: 'QA Hours', amount: 80, priority: 10 },
    { name: 'Automation', resource: 'QA Hours', amount: 60, priority: 8 },
    { name: 'Bug Fixes', resource: 'QA Hours', amount: 40, priority: 9 },
    { name: 'Load Test', resource: 'Test Environment', amount: 2, priority: 7 }
];
const allocation = ResourceAllocationOptimizer.allocate(resources, demands);
console.log('Allocations:', allocation.allocations);
console.log('Utilization:', allocation.resourceUtilization);
console.log('Recommendations:', ResourceAllocationOptimizer.recommend(allocation));

// Market dynamics
console.log('\n--- Testing Market Dynamics ---');
TestingMarketDynamics.getAllDynamics().forEach(d => {
    console.log(`\n${d.name}:`);
    console.log(`  Supply: ${d.supply}`);
    console.log(`  Demand: ${d.demand}`);
    console.log(`  Solution: ${d.solution}`);
});

/**
 * Applications of Supply and Demand in Testing:
 *
 * 1. Resource allocation follows economic principles
 * 2. Test automation ROI determines investment decisions
 * 3. Skill shortages affect testing capacity
 * 4. Cost of quality guides prevention vs detection
 * 5. Early defect detection is more economical
 * 6. Test prioritization maximizes value per cost
 * 7. Time constraints force trade-off decisions
 * 8. Tool selection considers total cost of ownership
 * 9. Market dynamics affect team composition
 * 10. Equilibrium between testing supply and demand optimizes quality
 */
