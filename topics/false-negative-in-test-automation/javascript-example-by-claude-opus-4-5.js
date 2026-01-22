/**
 * False Negative in Test Automation - Hidden Defects
 *
 * A false negative occurs when a test fails to detect a genuine defect,
 * reporting "pass" when it should have failed. This is particularly
 * dangerous as it creates a false sense of security and allows defects
 * to reach production undetected.
 *
 * Key Causes:
 * - Inadequate test coverage of edge cases
 * - Timing issues with async operations
 * - Insufficient assertions
 * - Environment differences
 * - Race conditions
 */

/**
 * FalseNegativeAnalyzer identifies potential false negative risks.
 * Analyzes test cases for common false negative patterns.
 */
class FalseNegativeAnalyzer {
    constructor() {
        this.riskPatterns = this.defineRiskPatterns();
        this.analyses = [];
    }

    /**
     * Defines patterns that commonly lead to false negatives
     * @returns {Array} Risk patterns
     */
    defineRiskPatterns() {
        return [
            {
                name: 'Missing Assertions',
                description: 'Test performs actions but has no assertions',
                detect: (test) => test.assertions === 0,
                severity: 'high',
                mitigation: 'Add explicit assertions for expected outcomes'
            },
            {
                name: 'Weak Assertions',
                description: 'Assertions check existence but not values',
                detect: (test) => test.weakAssertions > test.strongAssertions,
                severity: 'medium',
                mitigation: 'Replace existence checks with value assertions'
            },
            {
                name: 'Missing Error Handling',
                description: 'Test does not verify error conditions',
                detect: (test) => !test.hasErrorHandling,
                severity: 'medium',
                mitigation: 'Add tests for error scenarios'
            },
            {
                name: 'No Timeout Handling',
                description: 'Async operations without proper waits',
                detect: (test) => test.hasAsync && !test.hasWaits,
                severity: 'high',
                mitigation: 'Add explicit waits for async operations'
            },
            {
                name: 'Hardcoded Test Data',
                description: 'Test data matches implementation',
                detect: (test) => test.usesHardcodedData,
                severity: 'low',
                mitigation: 'Use parameterized or random test data'
            },
            {
                name: 'No Boundary Testing',
                description: 'Edge cases not covered',
                detect: (test) => !test.hasBoundaryTests,
                severity: 'medium',
                mitigation: 'Add tests for boundary conditions'
            },
            {
                name: 'Single Path Testing',
                description: 'Only happy path is tested',
                detect: (test) => test.paths === 1,
                severity: 'high',
                mitigation: 'Add tests for alternative paths'
            },
            {
                name: 'Environment Dependency',
                description: 'Test depends on specific environment',
                detect: (test) => test.hasEnvironmentDependency,
                severity: 'medium',
                mitigation: 'Isolate tests from environment'
            }
        ];
    }

    /**
     * Analyzes a test for false negative risks
     * @param {Object} test - Test metadata
     * @returns {Object} Analysis result
     */
    analyze(test) {
        console.log(`\nAnalyzing: ${test.name}`);

        const risks = [];

        for (const pattern of this.riskPatterns) {
            if (pattern.detect(test)) {
                risks.push({
                    pattern: pattern.name,
                    description: pattern.description,
                    severity: pattern.severity,
                    mitigation: pattern.mitigation
                });
                console.log(`  ⚠ ${pattern.name} (${pattern.severity})`);
            }
        }

        const analysis = {
            testName: test.name,
            risks,
            riskCount: risks.length,
            highRiskCount: risks.filter(r => r.severity === 'high').length,
            timestamp: new Date().toISOString()
        };

        this.analyses.push(analysis);
        return analysis;
    }

    /**
     * Calculates overall false negative risk score
     * @param {Object} analysis - Analysis result
     * @returns {number} Risk score (0-100)
     */
    calculateRiskScore(analysis) {
        const weights = { high: 30, medium: 15, low: 5 };

        let score = 0;
        for (const risk of analysis.risks) {
            score += weights[risk.severity] || 0;
        }

        return Math.min(100, score);
    }

    /**
     * Gets summary of all analyses
     * @returns {Object} Summary
     */
    getSummary() {
        const totalRisks = this.analyses.reduce((sum, a) => sum + a.riskCount, 0);
        const highRisks = this.analyses.reduce((sum, a) => sum + a.highRiskCount, 0);

        const risksByPattern = {};
        for (const analysis of this.analyses) {
            for (const risk of analysis.risks) {
                risksByPattern[risk.pattern] = (risksByPattern[risk.pattern] || 0) + 1;
            }
        }

        return {
            testsAnalyzed: this.analyses.length,
            totalRisks,
            highRiskTests: highRisks,
            risksByPattern,
            mostCommonRisk: Object.entries(risksByPattern)
                .sort((a, b) => b[1] - a[1])[0]?.[0]
        };
    }
}

/**
 * CoverageGapDetector identifies gaps in test coverage.
 * Finds code paths not exercised by tests.
 */
class CoverageGapDetector {
    constructor() {
        this.codePaths = [];
        this.testedPaths = new Set();
    }

    /**
     * Registers a code path
     * @param {Object} path - Code path information
     */
    registerPath(path) {
        this.codePaths.push({
            id: `path-${this.codePaths.length + 1}`,
            name: path.name,
            type: path.type,
            conditions: path.conditions || []
        });
    }

    /**
     * Marks a path as tested
     * @param {string} pathId - Path identifier
     */
    markTested(pathId) {
        this.testedPaths.add(pathId);
    }

    /**
     * Finds untested paths
     * @returns {Array} Untested paths
     */
    findGaps() {
        return this.codePaths.filter(p => !this.testedPaths.has(p.id));
    }

    /**
     * Gets coverage percentage
     * @returns {number} Coverage percentage
     */
    getCoveragePercentage() {
        if (this.codePaths.length === 0) return 100;
        return (this.testedPaths.size / this.codePaths.length) * 100;
    }

    /**
     * Generates gap report
     * @returns {Object} Gap report
     */
    generateReport() {
        const gaps = this.findGaps();

        return {
            totalPaths: this.codePaths.length,
            testedPaths: this.testedPaths.size,
            untestedPaths: gaps.length,
            coverage: `${this.getCoveragePercentage().toFixed(1)}%`,
            gaps: gaps.map(g => ({
                id: g.id,
                name: g.name,
                type: g.type
            }))
        };
    }
}

/**
 * AssertionQualityChecker evaluates assertion effectiveness.
 * Identifies weak assertions that may miss defects.
 */
class AssertionQualityChecker {
    constructor() {
        this.assertionTypes = {
            existence: { strength: 'weak', score: 1 },
            truthiness: { strength: 'weak', score: 2 },
            equality: { strength: 'medium', score: 3 },
            strictEquality: { strength: 'strong', score: 4 },
            deepEquality: { strength: 'strong', score: 5 },
            schema: { strength: 'strong', score: 5 }
        };
    }

    /**
     * Evaluates assertion quality
     * @param {Array} assertions - List of assertions
     * @returns {Object} Quality evaluation
     */
    evaluate(assertions) {
        if (assertions.length === 0) {
            return {
                quality: 'none',
                score: 0,
                issues: ['No assertions found - high false negative risk']
            };
        }

        let totalScore = 0;
        const issues = [];
        const typeCount = { weak: 0, medium: 0, strong: 0 };

        for (const assertion of assertions) {
            const type = this.assertionTypes[assertion.type];
            if (type) {
                totalScore += type.score;
                typeCount[type.strength]++;
            }
        }

        const avgScore = totalScore / assertions.length;

        // Identify issues
        if (typeCount.weak > typeCount.strong) {
            issues.push('Majority of assertions are weak - consider stronger assertions');
        }

        if (assertions.length < 3) {
            issues.push('Few assertions - consider adding more verification points');
        }

        const hasValueAssertions = assertions.some(a =>
            ['equality', 'strictEquality', 'deepEquality'].includes(a.type)
        );
        if (!hasValueAssertions) {
            issues.push('No value assertions - add specific value checks');
        }

        let quality;
        if (avgScore >= 4) quality = 'high';
        else if (avgScore >= 2.5) quality = 'medium';
        else quality = 'low';

        return {
            quality,
            score: avgScore.toFixed(2),
            totalAssertions: assertions.length,
            byStrength: typeCount,
            issues
        };
    }

    /**
     * Suggests assertion improvements
     * @param {Object} assertion - Current assertion
     * @returns {Object} Improvement suggestion
     */
    suggest(assertion) {
        const suggestions = {
            existence: {
                current: 'Checking if value exists',
                improvement: 'Check specific value or type',
                example: 'Replace expect(value).toBeDefined() with expect(value).toBe(expectedValue)'
            },
            truthiness: {
                current: 'Checking if value is truthy',
                improvement: 'Check explicit boolean or value',
                example: 'Replace expect(value).toBeTruthy() with expect(value).toBe(true)'
            },
            equality: {
                current: 'Loose equality check',
                improvement: 'Consider strict equality',
                example: 'Use toStrictEqual() or toBe() for exact matching'
            }
        };

        return suggestions[assertion.type] || { current: 'Unknown type', improvement: 'Review assertion' };
    }
}

/**
 * TimingIssueDetector finds timing-related false negative risks.
 * Identifies async operations that may complete after assertions.
 */
class TimingIssueDetector {
    constructor() {
        this.patterns = [];
    }

    /**
     * Analyzes test for timing issues
     * @param {Object} testCode - Test code analysis
     * @returns {Object} Timing analysis
     */
    analyze(testCode) {
        const issues = [];

        // Check for async without await
        if (testCode.hasAsyncCalls && !testCode.hasAwait) {
            issues.push({
                type: 'missing_await',
                description: 'Async call without await - assertion may run before completion',
                severity: 'high'
            });
        }

        // Check for setTimeout without proper handling
        if (testCode.hasSetTimeout && !testCode.hasFakeTimers) {
            issues.push({
                type: 'real_timers',
                description: 'Using real timers - tests may be flaky',
                severity: 'medium'
            });
        }

        // Check for promise chains
        if (testCode.hasPromiseChain && !testCode.awaitsAllPromises) {
            issues.push({
                type: 'incomplete_promise_chain',
                description: 'Promise chain may not be fully awaited',
                severity: 'high'
            });
        }

        // Check for event-based testing
        if (testCode.hasEventListeners && !testCode.hasEventWait) {
            issues.push({
                type: 'unawaited_events',
                description: 'Event handlers may fire after test completes',
                severity: 'medium'
            });
        }

        return {
            hasTimingRisks: issues.length > 0,
            issues,
            recommendations: issues.map(i => this.getRecommendation(i.type))
        };
    }

    /**
     * Gets recommendation for timing issue
     * @param {string} issueType - Issue type
     * @returns {string} Recommendation
     */
    getRecommendation(issueType) {
        const recommendations = {
            missing_await: 'Add await before async calls and ensure test function is async',
            real_timers: 'Use fake timers (jest.useFakeTimers()) for timer-dependent code',
            incomplete_promise_chain: 'Ensure all promises are awaited or use Promise.all()',
            unawaited_events: 'Use waitFor() or event-based assertions'
        };

        return recommendations[issueType] || 'Review async handling';
    }
}

/**
 * FalseNegativePrevention provides strategies to prevent false negatives.
 * Offers actionable improvements for test suites.
 */
class FalseNegativePrevention {
    /**
     * Generates prevention checklist for a test
     * @param {Object} analysis - Test analysis
     * @returns {Array} Prevention checklist
     */
    static generateChecklist(analysis) {
        const checklist = [
            {
                item: 'Multiple assertions per test',
                description: 'Each test should verify multiple aspects of the behavior',
                status: analysis.assertions > 1 ? 'done' : 'todo'
            },
            {
                item: 'Boundary value testing',
                description: 'Test edge cases and limits',
                status: analysis.hasBoundaryTests ? 'done' : 'todo'
            },
            {
                item: 'Negative testing',
                description: 'Verify error handling and invalid inputs',
                status: analysis.hasNegativeTests ? 'done' : 'todo'
            },
            {
                item: 'Explicit waits',
                description: 'Proper waiting for async operations',
                status: analysis.hasExplicitWaits ? 'done' : 'todo'
            },
            {
                item: 'Data verification',
                description: 'Assert specific values, not just existence',
                status: analysis.hasValueAssertions ? 'done' : 'todo'
            },
            {
                item: 'State verification',
                description: 'Verify state changes, not just method calls',
                status: analysis.hasStateVerification ? 'done' : 'todo'
            }
        ];

        return checklist;
    }

    /**
     * Calculates prevention score
     * @param {Array} checklist - Prevention checklist
     * @returns {number} Score (0-100)
     */
    static calculateScore(checklist) {
        const done = checklist.filter(c => c.status === 'done').length;
        return (done / checklist.length) * 100;
    }
}

// Demonstration
console.log('=== False Negative Analysis Demo ===\n');

// Create analyzer
const analyzer = new FalseNegativeAnalyzer();

// Analyze a test with risks
const riskyTest = {
    name: 'should save user to database',
    assertions: 1,
    weakAssertions: 1,
    strongAssertions: 0,
    hasErrorHandling: false,
    hasAsync: true,
    hasWaits: false,
    usesHardcodedData: true,
    hasBoundaryTests: false,
    paths: 1,
    hasEnvironmentDependency: false
};

const riskyAnalysis = analyzer.analyze(riskyTest);
console.log(`Risk Score: ${analyzer.calculateRiskScore(riskyAnalysis)}`);

// Analyze a well-written test
const goodTest = {
    name: 'should validate email format',
    assertions: 5,
    weakAssertions: 1,
    strongAssertions: 4,
    hasErrorHandling: true,
    hasAsync: true,
    hasWaits: true,
    usesHardcodedData: false,
    hasBoundaryTests: true,
    paths: 3,
    hasEnvironmentDependency: false
};

const goodAnalysis = analyzer.analyze(goodTest);
console.log(`Risk Score: ${analyzer.calculateRiskScore(goodAnalysis)}`);

console.log('\n--- Summary ---');
console.log(analyzer.getSummary());

// Coverage gap detection
console.log('\n--- Coverage Gap Detection ---');
const coverageDetector = new CoverageGapDetector();

coverageDetector.registerPath({ name: 'Happy path', type: 'normal' });
coverageDetector.registerPath({ name: 'Error handling', type: 'error' });
coverageDetector.registerPath({ name: 'Edge case: empty input', type: 'edge' });
coverageDetector.registerPath({ name: 'Edge case: max input', type: 'edge' });

coverageDetector.markTested('path-1');
coverageDetector.markTested('path-2');

console.log('Coverage Report:', coverageDetector.generateReport());

// Assertion quality check
console.log('\n--- Assertion Quality ---');
const qualityChecker = new AssertionQualityChecker();

const assertions = [
    { type: 'existence' },
    { type: 'truthiness' },
    { type: 'equality' }
];

console.log('Quality:', qualityChecker.evaluate(assertions));

/**
 * Best Practices to Prevent False Negatives:
 *
 * 1. Use strong assertions (exact values, not just existence)
 * 2. Test boundary conditions and edge cases
 * 3. Include negative tests for error scenarios
 * 4. Use explicit waits for async operations
 * 5. Verify state changes, not just method calls
 * 6. Review tests alongside code changes
 * 7. Use mutation testing to verify test effectiveness
 * 8. Combine automated with manual testing
 * 9. Monitor coverage for all code paths
 * 10. Regularly audit test assertions for adequacy
 */
