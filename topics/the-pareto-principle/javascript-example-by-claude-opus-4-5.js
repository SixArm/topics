/**
 * The Pareto Principle (80/20 Rule) - Focusing on High-Impact Testing
 *
 * The Pareto Principle suggests that roughly 80% of effects come from 20%
 * of causes. In testing, this means 80% of bugs are found in 20% of modules,
 * 80% of value comes from 20% of tests, and prioritization based on this
 * principle maximizes testing effectiveness.
 *
 * Key Concepts:
 * - 80/20 distribution in defects
 * - Test prioritization
 * - Resource optimization
 * - Risk-based testing
 */

/**
 * ParetoAnalyzer analyzes distributions for Pareto patterns.
 */
class ParetoAnalyzer {
    /**
     * Analyzes data for Pareto distribution
     * @param {Array} data - Array of {category, value} objects
     * @returns {Object} Pareto analysis
     */
    static analyze(data) {
        // Sort by value descending
        const sorted = [...data].sort((a, b) => b.value - a.value);
        const total = sorted.reduce((sum, item) => sum + item.value, 0);

        let cumulative = 0;
        const analysis = sorted.map((item, index) => {
            cumulative += item.value;
            return {
                rank: index + 1,
                category: item.category,
                value: item.value,
                percentage: ((item.value / total) * 100).toFixed(1) + '%',
                cumulative: ((cumulative / total) * 100).toFixed(1) + '%'
            };
        });

        // Find the vital few (categories contributing to ~80%)
        const vitalFew = analysis.filter(a => parseFloat(a.cumulative) <= 80);
        const trivialMany = analysis.filter(a => parseFloat(a.cumulative) > 80);

        return {
            total,
            distribution: analysis,
            vitalFew: {
                count: vitalFew.length,
                categories: vitalFew.map(a => a.category),
                contribution: vitalFew.length > 0
                    ? vitalFew[vitalFew.length - 1].cumulative
                    : '0%'
            },
            trivialMany: {
                count: trivialMany.length,
                contribution: (100 - parseFloat(vitalFew.length > 0 ? vitalFew[vitalFew.length - 1].cumulative : 0)).toFixed(1) + '%'
            },
            paretoRatio: `${vitalFew.length}/${analysis.length} (${((vitalFew.length / analysis.length) * 100).toFixed(0)}%)`
        };
    }

    /**
     * Identifies vital few categories
     * @param {Array} data - Array of {category, value}
     * @param {number} threshold - Cumulative threshold (default 80)
     * @returns {Array} Vital few categories
     */
    static getVitalFew(data, threshold = 80) {
        const analysis = this.analyze(data);
        return analysis.distribution.filter(a => parseFloat(a.cumulative) <= threshold);
    }
}

/**
 * DefectParetoAnalysis applies Pareto to defect analysis.
 */
class DefectParetoAnalysis {
    /**
     * Analyzes defects by module
     * @param {Array} defects - Defect data
     * @returns {Object} Analysis
     */
    static byModule(defects) {
        const byModule = {};
        for (const defect of defects) {
            byModule[defect.module] = (byModule[defect.module] || 0) + 1;
        }

        const data = Object.entries(byModule).map(([category, value]) => ({
            category,
            value
        }));

        const analysis = ParetoAnalyzer.analyze(data);

        return {
            ...analysis,
            insight: `Focus testing on: ${analysis.vitalFew.categories.join(', ')}`,
            recommendation: 'Increase test coverage and code review for vital few modules'
        };
    }

    /**
     * Analyzes defects by root cause
     * @param {Array} defects - Defect data with rootCause
     * @returns {Object} Analysis
     */
    static byRootCause(defects) {
        const byCause = {};
        for (const defect of defects) {
            byCause[defect.rootCause] = (byCause[defect.rootCause] || 0) + 1;
        }

        const data = Object.entries(byCause).map(([category, value]) => ({
            category,
            value
        }));

        const analysis = ParetoAnalyzer.analyze(data);

        return {
            ...analysis,
            insight: `Address primary causes: ${analysis.vitalFew.categories.join(', ')}`,
            recommendation: 'Implement preventive measures for top root causes'
        };
    }

    /**
     * Analyzes defects by severity
     * @param {Array} defects - Defect data with severity
     * @returns {Object} Analysis
     */
    static bySeverity(defects) {
        const bySeverity = {};
        for (const defect of defects) {
            bySeverity[defect.severity] = (bySeverity[defect.severity] || 0) + 1;
        }

        const data = Object.entries(bySeverity).map(([category, value]) => ({
            category,
            value
        }));

        return {
            analysis: ParetoAnalyzer.analyze(data),
            prioritization: 'Address critical and high severity defects first'
        };
    }
}

/**
 * TestPrioritization applies Pareto to test selection.
 */
class TestPrioritization {
    /**
     * Prioritizes tests based on defect-finding potential
     * @param {Array} tests - Tests with historical data
     * @returns {Array} Prioritized tests
     */
    static byDefectFindingPotential(tests) {
        const data = tests.map(t => ({
            category: t.name,
            value: t.defectsFound || 0,
            test: t
        }));

        const analysis = ParetoAnalyzer.analyze(data);
        const vitalTests = analysis.vitalFew.categories;

        return tests.map(t => ({
            ...t,
            priority: vitalTests.includes(t.name) ? 'high' : 'normal',
            inVitalFew: vitalTests.includes(t.name)
        })).sort((a, b) => (b.defectsFound || 0) - (a.defectsFound || 0));
    }

    /**
     * Prioritizes tests by risk coverage
     * @param {Array} tests - Tests with risk scores
     * @returns {Array} Prioritized tests
     */
    static byRiskCoverage(tests) {
        const data = tests.map(t => ({
            category: t.name,
            value: t.riskScore || 0
        }));

        const analysis = ParetoAnalyzer.analyze(data);

        return {
            analysis,
            recommendation: `Run these tests first: ${analysis.vitalFew.categories.slice(0, 5).join(', ')}`,
            coverageStrategy: 'Focus 80% of effort on high-risk areas'
        };
    }

    /**
     * Creates minimal regression suite using Pareto
     * @param {Array} tests - All tests
     * @param {number} coverageTarget - Target coverage percentage
     * @returns {Object} Minimal suite
     */
    static createMinimalRegressionSuite(tests, coverageTarget = 80) {
        const sorted = [...tests].sort((a, b) =>
            (b.codeCoverage || 0) - (a.codeCoverage || 0)
        );

        let cumulativeCoverage = 0;
        const minimalSuite = [];

        for (const test of sorted) {
            if (cumulativeCoverage >= coverageTarget) break;
            minimalSuite.push(test);
            cumulativeCoverage += test.incrementalCoverage || (test.codeCoverage / tests.length);
        }

        return {
            originalCount: tests.length,
            minimalCount: minimalSuite.length,
            reduction: ((1 - minimalSuite.length / tests.length) * 100).toFixed(1) + '%',
            suite: minimalSuite.map(t => t.name),
            targetCoverage: coverageTarget + '%'
        };
    }
}

/**
 * ResourceOptimization applies Pareto to resource allocation.
 */
class ResourceOptimization {
    /**
     * Allocates testing effort based on Pareto
     * @param {number} totalEffort - Total available effort
     * @param {Array} areas - Areas to test with risk scores
     * @returns {Object} Allocation
     */
    static allocateEffort(totalEffort, areas) {
        const data = areas.map(a => ({
            category: a.name,
            value: a.riskScore
        }));

        const analysis = ParetoAnalyzer.analyze(data);
        const vitalFew = analysis.vitalFew.categories;

        // Allocate 80% to vital few, 20% to trivial many
        const vitalEffort = totalEffort * 0.8;
        const trivialEffort = totalEffort * 0.2;

        const allocation = areas.map(area => {
            const isVital = vitalFew.includes(area.name);
            const pool = isVital ? vitalEffort : trivialEffort;
            const poolCount = isVital ? vitalFew.length : (areas.length - vitalFew.length);

            return {
                area: area.name,
                isVitalFew: isVital,
                effort: Math.round(pool / poolCount),
                percentage: ((pool / poolCount / totalEffort) * 100).toFixed(1) + '%'
            };
        });

        return {
            totalEffort,
            allocation,
            strategy: '80% effort on 20% highest-risk areas'
        };
    }

    /**
     * Optimizes automation investment
     * @param {Array} tests - Tests with automation potential
     * @returns {Object} Investment recommendation
     */
    static optimizeAutomationInvestment(tests) {
        const data = tests.map(t => ({
            category: t.name,
            value: t.runFrequency * t.manualEffort
        }));

        const analysis = ParetoAnalyzer.analyze(data);

        return {
            analysis,
            recommendation: `Automate first: ${analysis.vitalFew.categories.join(', ')}`,
            expectedImpact: 'Automating vital few will yield 80% of time savings'
        };
    }
}

/**
 * ParetoApplications shows common testing applications.
 */
class ParetoApplications {
    static applications = {
        defectDistribution: {
            observation: '80% of defects are in 20% of modules',
            action: 'Focus testing on defect-prone modules',
            metric: 'Defects per module'
        },
        testEffectiveness: {
            observation: '80% of defects are found by 20% of tests',
            action: 'Identify and prioritize high-yield tests',
            metric: 'Defects found per test'
        },
        codeChanges: {
            observation: '80% of changes happen in 20% of files',
            action: 'Focus regression testing on frequently changed code',
            metric: 'Change frequency per file'
        },
        userUsage: {
            observation: '80% of usage involves 20% of features',
            action: 'Prioritize testing of most-used features',
            metric: 'Feature usage statistics'
        },
        riskExposure: {
            observation: '80% of risk comes from 20% of components',
            action: 'Apply risk-based testing to critical components',
            metric: 'Risk score per component'
        }
    };

    /**
     * Gets all applications
     * @returns {Array} All applications
     */
    static getAllApplications() {
        return Object.entries(this.applications).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

// Demonstration
console.log('=== Pareto Principle (80/20 Rule) Demo ===\n');

// Basic Pareto analysis
console.log('--- Defect Distribution by Module ---');
const defectData = [
    { category: 'Authentication', value: 45 },
    { category: 'Payment', value: 32 },
    { category: 'User Profile', value: 8 },
    { category: 'Search', value: 7 },
    { category: 'Reports', value: 5 },
    { category: 'Settings', value: 3 }
];
const analysis = ParetoAnalyzer.analyze(defectData);
console.log('Distribution:', analysis.distribution);
console.log('Vital Few:', analysis.vitalFew);
console.log('Pareto Ratio:', analysis.paretoRatio);

// Defect analysis by module
console.log('\n--- Defect Analysis by Module ---');
const defects = [
    { module: 'Auth', rootCause: 'Logic Error', severity: 'Critical' },
    { module: 'Auth', rootCause: 'Logic Error', severity: 'High' },
    { module: 'Auth', rootCause: 'Edge Case', severity: 'Medium' },
    { module: 'Payment', rootCause: 'Integration', severity: 'Critical' },
    { module: 'Payment', rootCause: 'Logic Error', severity: 'High' },
    { module: 'Search', rootCause: 'Performance', severity: 'Low' },
    { module: 'Profile', rootCause: 'UI', severity: 'Low' }
];
const moduleAnalysis = DefectParetoAnalysis.byModule(defects);
console.log('Insight:', moduleAnalysis.insight);
console.log('Recommendation:', moduleAnalysis.recommendation);

// Test prioritization
console.log('\n--- Test Prioritization ---');
const tests = [
    { name: 'Login Test', defectsFound: 25 },
    { name: 'Checkout Test', defectsFound: 18 },
    { name: 'Search Test', defectsFound: 5 },
    { name: 'Profile Test', defectsFound: 3 },
    { name: 'Settings Test', defectsFound: 2 }
];
const prioritized = TestPrioritization.byDefectFindingPotential(tests);
console.log('Prioritized Tests:', prioritized.map(t =>
    ({ name: t.name, priority: t.priority, inVitalFew: t.inVitalFew })
));

// Resource allocation
console.log('\n--- Resource Allocation ---');
const areas = [
    { name: 'Core Functions', riskScore: 90 },
    { name: 'Payment', riskScore: 85 },
    { name: 'API', riskScore: 40 },
    { name: 'Reports', riskScore: 20 },
    { name: 'Admin', riskScore: 15 }
];
console.log(ResourceOptimization.allocateEffort(100, areas));

// Minimal regression suite
console.log('\n--- Minimal Regression Suite ---');
const allTests = [
    { name: 'Test1', codeCoverage: 30, incrementalCoverage: 30 },
    { name: 'Test2', codeCoverage: 25, incrementalCoverage: 20 },
    { name: 'Test3', codeCoverage: 20, incrementalCoverage: 15 },
    { name: 'Test4', codeCoverage: 15, incrementalCoverage: 10 },
    { name: 'Test5', codeCoverage: 10, incrementalCoverage: 5 }
];
console.log(TestPrioritization.createMinimalRegressionSuite(allTests, 80));

// Applications
console.log('\n--- Pareto Applications in Testing ---');
ParetoApplications.getAllApplications().forEach(app => {
    console.log(`\n${app.observation}`);
    console.log(`  Action: ${app.action}`);
});

/**
 * Applications of the Pareto Principle in Testing:
 *
 * 1. 80% of defects are in 20% of modules
 * 2. 80% of test value comes from 20% of tests
 * 3. Focus testing effort on vital few areas
 * 4. Prioritize automation for high-frequency tests
 * 5. Risk-based testing targets highest-impact areas
 * 6. Minimal regression suites cover maximum value
 * 7. Root cause analysis reveals vital few causes
 * 8. Resource allocation follows 80/20 distribution
 * 9. Most-used features deserve most testing
 * 10. Diminishing returns after vital few are covered
 */
