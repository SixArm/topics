/**
 * Quantitative Fallacy - Over-reliance on Numbers
 *
 * The quantitative fallacy is the mistake of relying too heavily on
 * quantitative data at the expense of other types of information. While
 * numbers are useful, they can be misleading or incomplete without context.
 * Effective decision-making requires balancing quantitative metrics with
 * qualitative insights.
 *
 * Key Concepts:
 * - Not everything measurable is important
 * - Not everything important is measurable
 * - Context matters for interpretation
 * - Quality over quantity of metrics
 */

/**
 * FallacyExample demonstrates common quantitative fallacies.
 */
class FallacyExample {
    static examples = {
        coverageObsession: {
            name: 'Code Coverage Obsession',
            fallacy: 'High test coverage means high quality',
            reality: '100% coverage can still have bugs; tests may be shallow',
            metric: 'Test coverage percentage',
            missingContext: [
                'Test quality and effectiveness',
                'Edge cases covered',
                'Integration scenarios',
                'User workflow coverage'
            ],
            betterApproach: 'Focus on critical path testing and mutation testing scores'
        },
        velocityGaming: {
            name: 'Velocity Gaming',
            fallacy: 'Higher velocity means better productivity',
            reality: 'Teams may inflate estimates or reduce quality to hit targets',
            metric: 'Story points per sprint',
            missingContext: [
                'Technical debt accumulation',
                'Code quality',
                'Team sustainability',
                'Customer value delivered'
            ],
            betterApproach: 'Track outcomes (customer satisfaction, defect rates) not just output'
        },
        bugCountFixation: {
            name: 'Bug Count Fixation',
            fallacy: 'Fewer bugs reported means higher quality',
            reality: 'May indicate poor testing or unreported issues',
            metric: 'Number of bugs found',
            missingContext: [
                'Test thoroughness',
                'User feedback channels',
                'Severity of bugs',
                'Time to detect'
            ],
            betterApproach: 'Track defect escape rate and customer-reported issues'
        },
        linesOfCodeMeasure: {
            name: 'Lines of Code Measure',
            fallacy: 'More lines of code means more work done',
            reality: 'Best code is often the smallest; refactoring reduces LOC',
            metric: 'Lines of code written',
            missingContext: [
                'Code complexity',
                'Maintainability',
                'Problem difficulty',
                'Code quality'
            ],
            betterApproach: 'Measure functionality delivered, not code volume'
        },
        clickMetricsMisuse: {
            name: 'Click Metrics Misuse',
            fallacy: 'More clicks/likes means better success',
            reality: 'Engagement may not translate to business value',
            metric: 'Click-through rate, likes',
            missingContext: [
                'Conversion to sales',
                'Customer satisfaction',
                'Long-term retention',
                'Quality of engagement'
            ],
            betterApproach: 'Track metrics aligned with actual business outcomes'
        }
    };

    /**
     * Gets a specific fallacy example
     * @param {string} name - Fallacy name
     * @returns {Object} Example
     */
    static getExample(name) {
        return this.examples[name];
    }

    /**
     * Gets all examples
     * @returns {Array} All examples
     */
    static getAllExamples() {
        return Object.entries(this.examples).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * MetricEvaluator helps assess metric quality and usefulness.
 */
class MetricEvaluator {
    /**
     * Evaluates a metric for potential fallacy risk
     * @param {Object} metric - Metric definition
     * @returns {Object} Evaluation result
     */
    static evaluate(metric) {
        const criteria = {
            alignedWithGoals: metric.businessGoalAlignment,
            actionable: metric.actionable,
            hasContext: metric.contextProvided,
            resistsGaming: metric.gamingResistance,
            balancedWithQualitative: metric.qualitativeComplement
        };

        const score = Object.values(criteria).filter(Boolean).length;
        const maxScore = Object.keys(criteria).length;

        let risk = 'low';
        if (score < 2) risk = 'high';
        else if (score < 4) risk = 'medium';

        return {
            metric: metric.name,
            score: `${score}/${maxScore}`,
            fallacyRisk: risk,
            criteria,
            recommendations: this.getRecommendations(criteria)
        };
    }

    /**
     * Gets recommendations based on evaluation
     * @param {Object} criteria - Evaluated criteria
     * @returns {Array} Recommendations
     */
    static getRecommendations(criteria) {
        const recommendations = [];

        if (!criteria.alignedWithGoals) {
            recommendations.push('Ensure metric directly supports business goals');
        }
        if (!criteria.actionable) {
            recommendations.push('Define what actions to take based on metric changes');
        }
        if (!criteria.hasContext) {
            recommendations.push('Add contextual information alongside the metric');
        }
        if (!criteria.resistsGaming) {
            recommendations.push('Consider how metric could be gamed and add safeguards');
        }
        if (!criteria.balancedWithQualitative) {
            recommendations.push('Complement with qualitative feedback');
        }

        return recommendations;
    }
}

/**
 * BalancedScorecard demonstrates a balanced approach to metrics.
 */
class BalancedScorecard {
    constructor(name) {
        this.name = name;
        this.perspectives = {
            customer: [],
            internal: [],
            learning: [],
            financial: []
        };
    }

    /**
     * Adds a metric to a perspective
     * @param {string} perspective - Perspective category
     * @param {Object} metric - Metric to add
     */
    addMetric(perspective, metric) {
        if (this.perspectives[perspective]) {
            this.perspectives[perspective].push({
                name: metric.name,
                quantitative: metric.quantitative,
                qualitative: metric.qualitative,
                target: metric.target,
                current: metric.current
            });
        }
    }

    /**
     * Gets balanced view of all perspectives
     * @returns {Object} Balanced view
     */
    getBalancedView() {
        const view = {};

        for (const [perspective, metrics] of Object.entries(this.perspectives)) {
            view[perspective] = {
                metrics: metrics.length,
                quantitativeCount: metrics.filter(m => m.quantitative).length,
                qualitativeCount: metrics.filter(m => m.qualitative).length,
                items: metrics
            };
        }

        return view;
    }

    /**
     * Checks if scorecard is balanced
     * @returns {Object} Balance assessment
     */
    assessBalance() {
        const issues = [];

        for (const [perspective, metrics] of Object.entries(this.perspectives)) {
            if (metrics.length === 0) {
                issues.push(`No metrics for ${perspective} perspective`);
            }
            const hasQualitative = metrics.some(m => m.qualitative);
            if (!hasQualitative && metrics.length > 0) {
                issues.push(`${perspective} perspective lacks qualitative metrics`);
            }
        }

        return {
            balanced: issues.length === 0,
            issues
        };
    }
}

/**
 * ContextualMetric adds context to quantitative data.
 */
class ContextualMetric {
    constructor(options) {
        this.name = options.name;
        this.value = options.value;
        this.unit = options.unit;
        this.context = options.context || {};
        this.qualitativeNotes = options.qualitativeNotes || [];
        this.timestamp = new Date();
    }

    /**
     * Adds context to the metric
     * @param {string} key - Context key
     * @param {*} value - Context value
     */
    addContext(key, value) {
        this.context[key] = value;
    }

    /**
     * Adds a qualitative note
     * @param {string} note - Note to add
     * @param {string} source - Source of the note
     */
    addQualitativeNote(note, source) {
        this.qualitativeNotes.push({
            note,
            source,
            timestamp: new Date()
        });
    }

    /**
     * Gets full metric report
     * @returns {Object} Report
     */
    getReport() {
        return {
            metric: this.name,
            value: `${this.value} ${this.unit}`,
            context: this.context,
            qualitativeInsights: this.qualitativeNotes,
            interpretation: this.interpret()
        };
    }

    /**
     * Interprets the metric with context
     * @returns {string} Interpretation
     */
    interpret() {
        const contextFactors = Object.keys(this.context).length;
        const qualitativeFactors = this.qualitativeNotes.length;

        if (contextFactors === 0 && qualitativeFactors === 0) {
            return 'Warning: This metric lacks context and qualitative support';
        }

        return `Metric supported by ${contextFactors} contextual factors and ${qualitativeFactors} qualitative notes`;
    }
}

/**
 * QualitativeMethods provides tools for qualitative data collection.
 */
class QualitativeMethods {
    /**
     * Gets qualitative research methods
     * @returns {Array} Methods
     */
    static getMethods() {
        return [
            {
                method: 'User Interviews',
                description: 'One-on-one conversations with users',
                whenToUse: 'Understanding user motivations and pain points',
                complementsMetrics: ['NPS', 'Satisfaction scores', 'Usage metrics']
            },
            {
                method: 'Usability Testing',
                description: 'Observing users complete tasks',
                whenToUse: 'Understanding why metrics are what they are',
                complementsMetrics: ['Task completion rate', 'Time on task', 'Error rate']
            },
            {
                method: 'Retrospectives',
                description: 'Team reflection on process',
                whenToUse: 'Understanding team dynamics behind productivity metrics',
                complementsMetrics: ['Velocity', 'Cycle time', 'Bug count']
            },
            {
                method: 'Customer Feedback Analysis',
                description: 'Analyzing written feedback',
                whenToUse: 'Understanding sentiment behind ratings',
                complementsMetrics: ['Star ratings', 'CSAT', 'Churn rate']
            },
            {
                method: 'Code Review Comments',
                description: 'Analyzing review discussions',
                whenToUse: 'Understanding code quality beyond metrics',
                complementsMetrics: ['Coverage', 'Complexity', 'PR merge time']
            }
        ];
    }

    /**
     * Suggests qualitative methods for a metric
     * @param {string} metricType - Type of metric
     * @returns {Array} Suggested methods
     */
    static suggestMethods(metricType) {
        const suggestions = {
            'performance': ['User Interviews', 'Usability Testing'],
            'quality': ['Code Review Comments', 'Usability Testing'],
            'productivity': ['Retrospectives', 'User Interviews'],
            'satisfaction': ['Customer Feedback Analysis', 'User Interviews']
        };

        return suggestions[metricType] || ['User Interviews'];
    }
}

/**
 * AntiPatternDetector identifies metric anti-patterns.
 */
class AntiPatternDetector {
    /**
     * Detects anti-patterns in metric usage
     * @param {Object} metricPractice - Current metric practice
     * @returns {Object} Detection result
     */
    static detect(metricPractice) {
        const antiPatterns = [];

        if (metricPractice.singleMetricFocus) {
            antiPatterns.push({
                pattern: 'Single Metric Obsession',
                risk: 'Goodhart\'s Law - metric becomes the target',
                fix: 'Use a balanced set of metrics'
            });
        }

        if (metricPractice.noQualitativeData) {
            antiPatterns.push({
                pattern: 'Quantitative Only',
                risk: 'Missing context and nuance',
                fix: 'Add qualitative research methods'
            });
        }

        if (metricPractice.vanityMetrics) {
            antiPatterns.push({
                pattern: 'Vanity Metrics',
                risk: 'Metrics that look good but don\'t drive decisions',
                fix: 'Focus on actionable metrics'
            });
        }

        if (metricPractice.targetBasedBonuses) {
            antiPatterns.push({
                pattern: 'Gaming Incentives',
                risk: 'Teams optimize for metric, not outcome',
                fix: 'Decouple bonuses from easily gamed metrics'
            });
        }

        return {
            antiPatternsFound: antiPatterns.length,
            antiPatterns,
            overallRisk: antiPatterns.length > 2 ? 'high' : antiPatterns.length > 0 ? 'medium' : 'low'
        };
    }
}

// Demonstration
console.log('=== Quantitative Fallacy Demo ===\n');

// Show fallacy examples
console.log('--- Common Fallacy Examples ---');
FallacyExample.getAllExamples().slice(0, 3).forEach(example => {
    console.log(`\n${example.name}:`);
    console.log(`  Fallacy: ${example.fallacy}`);
    console.log(`  Reality: ${example.reality}`);
    console.log(`  Better: ${example.betterApproach}`);
});

// Evaluate a metric
console.log('\n--- Metric Evaluation ---');
const evaluation = MetricEvaluator.evaluate({
    name: 'Test Coverage',
    businessGoalAlignment: false,
    actionable: true,
    contextProvided: false,
    gamingResistance: false,
    qualitativeComplement: false
});
console.log('Evaluation:', evaluation);

// Balanced scorecard
console.log('\n--- Balanced Scorecard ---');
const scorecard = new BalancedScorecard('Engineering Team');

scorecard.addMetric('customer', {
    name: 'NPS Score',
    quantitative: true,
    qualitative: false,
    target: 50,
    current: 42
});

scorecard.addMetric('customer', {
    name: 'User Feedback Themes',
    quantitative: false,
    qualitative: true,
    target: 'Track top 5 themes',
    current: 'Performance, UX, Features'
});

scorecard.addMetric('internal', {
    name: 'Deployment Frequency',
    quantitative: true,
    qualitative: false,
    target: 'Daily',
    current: 'Weekly'
});

console.log('Balance Assessment:', scorecard.assessBalance());

// Contextual metric
console.log('\n--- Contextual Metric ---');
const metric = new ContextualMetric({
    name: 'Sprint Velocity',
    value: 45,
    unit: 'story points'
});

metric.addContext('teamSize', 5);
metric.addContext('sprintLength', '2 weeks');
metric.addContext('newMemberJoined', true);

metric.addQualitativeNote('Team reported high cognitive load from new technology', 'Retrospective');
metric.addQualitativeNote('Story point estimates were conservative due to uncertainty', 'Sprint Planning');

console.log('Contextual Report:', metric.getReport());

// Anti-pattern detection
console.log('\n--- Anti-Pattern Detection ---');
console.log(AntiPatternDetector.detect({
    singleMetricFocus: true,
    noQualitativeData: true,
    vanityMetrics: false,
    targetBasedBonuses: true
}));

// Qualitative methods
console.log('\n--- Qualitative Methods ---');
console.log('Suggested for quality metrics:', QualitativeMethods.suggestMethods('quality'));

/**
 * Best Practices for Avoiding Quantitative Fallacy:
 *
 * 1. Use a balanced set of metrics, not just one
 * 2. Always complement quantitative with qualitative data
 * 3. Provide context for every metric
 * 4. Question what the metric actually measures
 * 5. Consider how metrics can be gamed
 * 6. Focus on outcomes, not just outputs
 * 7. Review metrics regularly for continued relevance
 * 8. Involve diverse perspectives in metric selection
 * 9. Be skeptical of metrics that always look good
 * 10. Remember: Not everything that counts can be counted
 */
