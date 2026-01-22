/**
 * Gresham's Law - Bad Drives Out Good
 *
 * Gresham's Law is an economic principle stating "bad money drives out good."
 * When two currencies circulate, people spend the lower-quality one while
 * hoarding the higher-quality one. This principle applies broadly to software,
 * where inferior practices or products can displace better alternatives.
 *
 * Key Concepts:
 * - Lower quality tends to dominate when mixed with higher quality
 * - People naturally prefer to keep what's valuable
 * - Market dynamics can favor inferior solutions
 * - Quality requires active protection
 */

/**
 * GreshamsLawAnalyzer examines systems for Gresham's Law effects.
 * Identifies where bad practices might be driving out good ones.
 */
class GreshamsLawAnalyzer {
    constructor() {
        this.observations = [];
        this.patterns = this.definePatterns();
    }

    /**
     * Defines patterns where Gresham's Law applies
     * @returns {Array} Pattern definitions
     */
    definePatterns() {
        return [
            {
                domain: 'Code Quality',
                description: 'Quick-and-dirty code becomes the norm',
                indicators: [
                    'Copy-paste over proper abstractions',
                    'Skipping tests to meet deadlines',
                    'Ignoring code review feedback',
                    'Technical debt accumulation'
                ],
                consequence: 'Clean code practices become rare exceptions'
            },
            {
                domain: 'Documentation',
                description: 'Outdated docs drive out maintained ones',
                indicators: [
                    'Stale documentation not removed',
                    'Multiple conflicting sources of truth',
                    'No ownership of documentation',
                    'Wiki pages never updated'
                ],
                consequence: 'People stop trusting any documentation'
            },
            {
                domain: 'Testing',
                description: 'Flaky tests undermine the test suite',
                indicators: [
                    'Tests randomly fail and are ignored',
                    'Test suite takes too long to run',
                    'Tests that always pass regardless of code',
                    'No enforcement of test coverage'
                ],
                consequence: 'Team stops relying on automated tests'
            },
            {
                domain: 'Communication',
                description: 'Low-quality information crowds out valuable signals',
                indicators: [
                    'Too many notification channels',
                    'Important messages lost in noise',
                    'Meetings without agendas',
                    'Status reports nobody reads'
                ],
                consequence: 'People tune out all communications'
            },
            {
                domain: 'Dependencies',
                description: 'Abandoned libraries stay in use',
                indicators: [
                    'Outdated dependencies with known issues',
                    'Multiple libraries solving same problem',
                    'No criteria for adding dependencies',
                    'Unmaintained internal libraries'
                ],
                consequence: 'Good libraries get passed over for convenience'
            }
        ];
    }

    /**
     * Analyzes a system for Gresham's Law effects
     * @param {Object} systemState - Current state of the system
     * @returns {Object} Analysis results
     */
    analyze(systemState) {
        const findings = [];

        for (const pattern of this.patterns) {
            const indicators = pattern.indicators.filter(i =>
                this.checkIndicator(i, systemState)
            );

            if (indicators.length > 0) {
                findings.push({
                    domain: pattern.domain,
                    description: pattern.description,
                    triggeredIndicators: indicators,
                    severity: this.calculateSeverity(indicators.length, pattern.indicators.length),
                    consequence: pattern.consequence
                });
            }
        }

        return {
            systemName: systemState.name,
            findings,
            overallRisk: this.calculateOverallRisk(findings),
            recommendations: this.generateRecommendations(findings)
        };
    }

    /**
     * Checks if an indicator is present
     * @param {string} indicator - Indicator to check
     * @param {Object} state - System state
     * @returns {boolean} True if indicator is present
     */
    checkIndicator(indicator, state) {
        const indicators = state.indicators || [];
        return indicators.some(i =>
            i.toLowerCase().includes(indicator.toLowerCase().split(' ')[0])
        );
    }

    /**
     * Calculates severity based on triggered indicators
     * @param {number} triggered - Number of triggered indicators
     * @param {number} total - Total possible indicators
     * @returns {string} Severity level
     */
    calculateSeverity(triggered, total) {
        const ratio = triggered / total;
        if (ratio >= 0.75) return 'critical';
        if (ratio >= 0.5) return 'high';
        if (ratio >= 0.25) return 'medium';
        return 'low';
    }

    /**
     * Calculates overall risk
     * @param {Array} findings - Analysis findings
     * @returns {string} Risk level
     */
    calculateOverallRisk(findings) {
        if (findings.length === 0) return 'low';

        const severityScores = { critical: 4, high: 3, medium: 2, low: 1 };
        const totalScore = findings.reduce((sum, f) => sum + severityScores[f.severity], 0);
        const avgScore = totalScore / findings.length;

        if (avgScore >= 3) return 'critical';
        if (avgScore >= 2) return 'high';
        if (avgScore >= 1) return 'medium';
        return 'low';
    }

    /**
     * Generates recommendations based on findings
     * @param {Array} findings - Analysis findings
     * @returns {Array} Recommendations
     */
    generateRecommendations(findings) {
        const recommendations = [];

        for (const finding of findings) {
            recommendations.push({
                domain: finding.domain,
                action: this.getActionForDomain(finding.domain),
                priority: finding.severity
            });
        }

        return recommendations.sort((a, b) => {
            const order = { critical: 0, high: 1, medium: 2, low: 3 };
            return order[a.priority] - order[b.priority];
        });
    }

    /**
     * Gets recommended action for a domain
     * @param {string} domain - Problem domain
     * @returns {string} Recommended action
     */
    getActionForDomain(domain) {
        const actions = {
            'Code Quality': 'Establish and enforce code review standards',
            'Documentation': 'Implement documentation ownership and review process',
            'Testing': 'Fix or remove flaky tests, enforce test quality gates',
            'Communication': 'Consolidate channels, establish communication norms',
            'Dependencies': 'Audit dependencies, establish approval process'
        };
        return actions[domain] || 'Review and improve standards';
    }
}

/**
 * QualityProtector implements strategies to prevent Gresham's Law effects.
 * Actively maintains quality standards against degradation.
 */
class QualityProtector {
    constructor() {
        this.standards = new Map();
        this.violations = [];
        this.enforcements = [];
    }

    /**
     * Defines a quality standard
     * @param {Object} standard - Standard definition
     */
    defineStandard(standard) {
        this.standards.set(standard.name, {
            ...standard,
            definedAt: new Date(),
            violations: 0
        });
    }

    /**
     * Checks if an item meets standards
     * @param {string} standardName - Standard to check
     * @param {Object} item - Item to validate
     * @returns {Object} Validation result
     */
    validate(standardName, item) {
        const standard = this.standards.get(standardName);
        if (!standard) {
            return { valid: true, message: 'No standard defined' };
        }

        const violations = [];

        for (const rule of standard.rules) {
            if (!rule.check(item)) {
                violations.push({
                    rule: rule.name,
                    message: rule.message
                });
            }
        }

        if (violations.length > 0) {
            standard.violations++;
            this.violations.push({
                standard: standardName,
                item: item.name,
                violations,
                timestamp: new Date()
            });
        }

        return {
            valid: violations.length === 0,
            violations,
            standard: standardName
        };
    }

    /**
     * Enforces a quality gate
     * @param {string} stage - Pipeline stage
     * @param {Object} item - Item to check
     * @returns {Object} Enforcement result
     */
    enforce(stage, item) {
        const applicableStandards = Array.from(this.standards.values())
            .filter(s => s.stages.includes(stage));

        const results = applicableStandards.map(s =>
            this.validate(s.name, item)
        );

        const passed = results.every(r => r.valid);

        this.enforcements.push({
            stage,
            item: item.name,
            passed,
            timestamp: new Date()
        });

        return {
            passed,
            results,
            stage
        };
    }

    /**
     * Gets violation trends
     * @returns {Object} Violation trends
     */
    getViolationTrends() {
        const byStandard = {};

        for (const [name, standard] of this.standards) {
            byStandard[name] = standard.violations;
        }

        const recentViolations = this.violations.filter(v => {
            const hourAgo = new Date(Date.now() - 3600000);
            return v.timestamp > hourAgo;
        });

        return {
            total: this.violations.length,
            byStandard,
            recentCount: recentViolations.length,
            trend: recentViolations.length > this.violations.length / 2
                ? 'increasing' : 'stable'
        };
    }

    /**
     * Gets enforcement statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const passed = this.enforcements.filter(e => e.passed).length;
        const total = this.enforcements.length;

        return {
            totalEnforcements: total,
            passed,
            failed: total - passed,
            passRate: total > 0 ? `${((passed / total) * 100).toFixed(1)}%` : 'N/A'
        };
    }
}

/**
 * CurrencyCompetition models the dynamics of competing practices.
 * Shows how inferior practices can displace better ones.
 */
class CurrencyCompetition {
    constructor(goodPractice, badPractice) {
        this.good = {
            name: goodPractice,
            adoption: 100,
            effort: 0,
            value: 100
        };
        this.bad = {
            name: badPractice,
            adoption: 0,
            effort: 0,
            value: 30
        };
        this.history = [];
        this.turn = 0;
    }

    /**
     * Simulates a time period of competition
     * @param {Object} conditions - Environmental conditions
     */
    simulateTurn(conditions = {}) {
        this.turn++;

        const pressure = conditions.timePressure || 0.5;
        const enforcement = conditions.enforcement || 0.3;

        // Without enforcement, bad practice spreads under pressure
        const spreadRate = pressure * (1 - enforcement) * 10;

        // Calculate adoption changes
        const goodLoss = Math.min(this.good.adoption, spreadRate);
        const badGain = goodLoss;

        this.good.adoption -= goodLoss;
        this.bad.adoption += badGain;

        // Track effort
        this.good.effort += this.good.adoption * 0.02;
        this.bad.effort += this.bad.adoption * 0.01;

        this.history.push({
            turn: this.turn,
            goodAdoption: this.good.adoption,
            badAdoption: this.bad.adoption,
            conditions: { ...conditions }
        });
    }

    /**
     * Simulates multiple turns
     * @param {number} turns - Number of turns
     * @param {Object} conditions - Conditions for each turn
     */
    simulate(turns, conditions = {}) {
        for (let i = 0; i < turns; i++) {
            this.simulateTurn(conditions);
        }
    }

    /**
     * Gets current state
     * @returns {Object} Current state
     */
    getState() {
        return {
            turn: this.turn,
            good: { ...this.good },
            bad: { ...this.bad },
            dominant: this.good.adoption > this.bad.adoption
                ? this.good.name : this.bad.name
        };
    }

    /**
     * Gets simulation summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            turns: this.turn,
            finalState: this.getState(),
            goodStarted: 100,
            goodEnded: this.good.adoption,
            badStarted: 0,
            badEnded: this.bad.adoption,
            greshamEffect: this.bad.adoption > this.good.adoption
        };
    }
}

/**
 * CountermeasureFramework provides strategies against Gresham's Law.
 * Implements protection mechanisms for quality.
 */
class CountermeasureFramework {
    static strategies = {
        'Active Enforcement': {
            description: 'Actively enforce quality standards at checkpoints',
            implementation: [
                'Automated quality gates in CI/CD',
                'Mandatory code reviews',
                'Test coverage requirements',
                'Documentation completeness checks'
            ],
            effectiveness: 'high'
        },
        'Visibility': {
            description: 'Make quality visible to all stakeholders',
            implementation: [
                'Quality dashboards',
                'Technical debt tracking',
                'Regular quality reports',
                'Public metrics'
            ],
            effectiveness: 'medium'
        },
        'Incentives': {
            description: 'Align incentives with quality outcomes',
            implementation: [
                'Recognize quality contributions',
                'Include quality in performance reviews',
                'Time allocation for improvements',
                'Quality-focused OKRs'
            ],
            effectiveness: 'medium'
        },
        'Removal': {
            description: 'Actively remove bad elements before they spread',
            implementation: [
                'Delete flaky tests',
                'Remove outdated documentation',
                'Deprecate bad APIs',
                'Retire legacy systems'
            ],
            effectiveness: 'high'
        },
        'Standards': {
            description: 'Establish clear standards and make them easy to follow',
            implementation: [
                'Coding standards documentation',
                'Templates and examples',
                'Automated formatters',
                'Style guides'
            ],
            effectiveness: 'medium'
        }
    };

    /**
     * Gets all countermeasures
     * @returns {Object} All strategies
     */
    static getAll() {
        return this.strategies;
    }

    /**
     * Gets recommended strategy for a domain
     * @param {string} domain - Problem domain
     * @returns {Array} Recommended strategies
     */
    static recommend(domain) {
        const domainStrategies = {
            'Code Quality': ['Active Enforcement', 'Standards', 'Visibility'],
            'Documentation': ['Removal', 'Standards', 'Visibility'],
            'Testing': ['Active Enforcement', 'Removal', 'Visibility'],
            'Communication': ['Removal', 'Standards', 'Incentives'],
            'Dependencies': ['Active Enforcement', 'Removal', 'Standards']
        };

        const names = domainStrategies[domain] || Object.keys(this.strategies);
        return names.map(name => ({
            name,
            ...this.strategies[name]
        }));
    }
}

// Demonstration
console.log('=== Gresham\'s Law Demo ===\n');

// Analyze a system
const analyzer = new GreshamsLawAnalyzer();
console.log('--- Pattern Analysis ---');

const systemState = {
    name: 'Project X',
    indicators: [
        'Copy-paste code patterns',
        'Skipping tests for features',
        'Tests randomly failing',
        'Outdated wiki pages',
        'Multiple notification channels'
    ]
};

const analysis = analyzer.analyze(systemState);
console.log('Analysis Results:');
console.log(`  Overall Risk: ${analysis.overallRisk}`);
console.log('  Findings:');
analysis.findings.forEach(f => {
    console.log(`    - ${f.domain}: ${f.severity}`);
});
console.log('  Recommendations:');
analysis.recommendations.slice(0, 3).forEach(r => {
    console.log(`    - [${r.priority}] ${r.domain}: ${r.action}`);
});

// Quality protection
console.log('\n--- Quality Protection ---');
const protector = new QualityProtector();

protector.defineStandard({
    name: 'Test Quality',
    stages: ['commit', 'merge'],
    rules: [
        {
            name: 'No flaky tests',
            check: (item) => item.flakyTests === 0,
            message: 'Remove flaky tests before merging'
        },
        {
            name: 'Coverage threshold',
            check: (item) => item.coverage >= 80,
            message: 'Test coverage must be at least 80%'
        }
    ]
});

const goodCode = { name: 'feature-A', flakyTests: 0, coverage: 85 };
const badCode = { name: 'feature-B', flakyTests: 3, coverage: 45 };

console.log('Validation Results:');
console.log('  Good code:', protector.validate('Test Quality', goodCode));
console.log('  Bad code:', protector.validate('Test Quality', badCode));

// Competition simulation
console.log('\n--- Competition Simulation ---');
const competition = new CurrencyCompetition('Code Reviews', 'Direct Commits');

console.log('Initial State:', competition.getState());

// Simulate without enforcement
competition.simulate(5, { timePressure: 0.8, enforcement: 0.2 });
console.log('After 5 turns (low enforcement):', competition.getState());

// Simulate with enforcement
competition.simulate(5, { timePressure: 0.8, enforcement: 0.8 });
console.log('After 5 more turns (high enforcement):', competition.getState());

console.log('Summary:', competition.getSummary());

// Countermeasures
console.log('\n--- Countermeasures ---');
console.log('Recommendations for Testing:');
CountermeasureFramework.recommend('Testing').forEach(s => {
    console.log(`  ${s.name} (${s.effectiveness}):`);
    s.implementation.slice(0, 2).forEach(i => {
        console.log(`    - ${i}`);
    });
});

/**
 * Best Practices Against Gresham's Law:
 *
 * 1. Actively enforce quality standards - don't rely on voluntary compliance
 * 2. Remove bad elements before they spread
 * 3. Make quality visible through metrics and dashboards
 * 4. Align incentives with quality outcomes
 * 5. Establish clear, easy-to-follow standards
 * 6. Automate quality checks wherever possible
 * 7. Create quality gates in the development pipeline
 * 8. Regularly audit for quality degradation
 * 9. Address problems early before they become normalized
 * 10. Lead by example - demonstrate quality practices
 */
