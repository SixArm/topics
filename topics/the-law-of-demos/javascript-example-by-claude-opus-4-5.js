/**
 * The Law of Demos (Kapor's Law)
 *
 * The Law of Demos states that any technology demo will eventually fail if
 * demonstrated often enough. This principle, formulated by Mitch Kapor in 1983,
 * highlights how demos are controlled environments that don't represent real-world
 * conditions, and repeated demonstrations expose hidden flaws.
 *
 * Key Concepts:
 * - Demos create unrealistic expectations
 * - Controlled vs real-world environments
 * - Transparency about limitations
 * - Testing implications
 */

/**
 * DemoRisk categorizes risks in demonstrations.
 */
class DemoRisk {
    static risks = {
        environmental: {
            name: 'Environmental Risk',
            description: 'Demo environment differs from production',
            examples: [
                'Different network conditions',
                'Curated test data',
                'Ideal hardware setup'
            ],
            mitigation: 'Use production-like environments'
        },
        timing: {
            name: 'Timing Risk',
            description: 'Demo works at specific time but not others',
            examples: [
                'API rate limits not reached',
                'Database not under load',
                'External services available'
            ],
            mitigation: 'Test at various times and conditions'
        },
        scope: {
            name: 'Scope Risk',
            description: 'Demo shows limited functionality',
            examples: [
                'Happy path only',
                'No edge cases',
                'Limited user scenarios'
            ],
            mitigation: 'Acknowledge limitations explicitly'
        },
        audience: {
            name: 'Audience Risk',
            description: 'Audience expectations vs reality',
            examples: [
                'Oversold capabilities',
                'Misunderstood features',
                'Assumed stability'
            ],
            mitigation: 'Set clear expectations'
        },
        technical: {
            name: 'Technical Risk',
            description: 'Technology-specific failure points',
            examples: [
                'Memory leaks over time',
                'Connection pool exhaustion',
                'Cache invalidation issues'
            ],
            mitigation: 'Run extended stress tests'
        }
    };

    /**
     * Gets risk by name
     * @param {string} name - Risk name
     * @returns {Object} Risk details
     */
    static getRisk(name) {
        return this.risks[name];
    }

    /**
     * Gets all risks
     * @returns {Array} All risks
     */
    static getAllRisks() {
        return Object.entries(this.risks).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * DemoScenario represents a demonstration scenario.
 */
class DemoScenario {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.steps = options.steps || [];
        this.assumptions = options.assumptions || [];
        this.knownLimitations = options.knownLimitations || [];
        this.runCount = 0;
        this.failureHistory = [];
    }

    /**
     * Adds a demo step
     * @param {string} action - Step action
     * @param {string} expected - Expected result
     * @param {number} failureProbability - Probability of failure (0-1)
     */
    addStep(action, expected, failureProbability = 0.01) {
        this.steps.push({
            stepNumber: this.steps.length + 1,
            action,
            expected,
            failureProbability
        });
    }

    /**
     * Simulates running the demo
     * @returns {Object} Demo result
     */
    run() {
        this.runCount++;
        const results = [];
        let demoFailed = false;

        for (const step of this.steps) {
            // Probability of failure increases with run count
            const adjustedProbability = step.failureProbability * Math.log(this.runCount + 1);
            const failed = Math.random() < adjustedProbability;

            results.push({
                step: step.stepNumber,
                action: step.action,
                passed: !failed,
                failureProbability: (adjustedProbability * 100).toFixed(2) + '%'
            });

            if (failed) {
                demoFailed = true;
                this.failureHistory.push({
                    runNumber: this.runCount,
                    step: step.stepNumber,
                    action: step.action,
                    timestamp: new Date()
                });
                break;
            }
        }

        return {
            scenario: this.name,
            runNumber: this.runCount,
            success: !demoFailed,
            stepsCompleted: results.length,
            totalSteps: this.steps.length,
            results
        };
    }

    /**
     * Gets failure statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const failures = this.failureHistory.length;
        const successRate = ((this.runCount - failures) / this.runCount) * 100;

        return {
            totalRuns: this.runCount,
            failures,
            successRate: successRate.toFixed(1) + '%',
            failureHistory: this.failureHistory.slice(-5),
            prediction: this.predictNextFailure()
        };
    }

    /**
     * Predicts probability of failure on next run
     * @returns {string} Prediction
     */
    predictNextFailure() {
        const totalProbability = this.steps.reduce((sum, step) => {
            return sum + step.failureProbability * Math.log(this.runCount + 2);
        }, 0);

        // Probability of at least one failure
        const failureProb = 1 - this.steps.reduce((prod, step) => {
            return prod * (1 - step.failureProbability * Math.log(this.runCount + 2));
        }, 1);

        return (failureProb * 100).toFixed(1) + '%';
    }
}

/**
 * DemoPreparation provides demo preparation strategies.
 */
class DemoPreparation {
    static strategies = {
        backup: {
            name: 'Backup Plans',
            description: 'Have fallback options ready',
            actions: [
                'Pre-recorded video backup',
                'Screenshots for critical features',
                'Alternative demo path',
                'Offline mode support'
            ]
        },
        rehearsal: {
            name: 'Rehearsal',
            description: 'Practice under various conditions',
            actions: [
                'Run demo multiple times',
                'Test with slow network',
                'Try on different devices',
                'Simulate audience questions'
            ]
        },
        transparency: {
            name: 'Transparency',
            description: 'Be honest about limitations',
            actions: [
                'Acknowledge beta features',
                'Explain known issues',
                'Set realistic expectations',
                'Show roadmap for improvements'
            ]
        },
        environment: {
            name: 'Environment Control',
            description: 'Minimize environmental variables',
            actions: [
                'Use dedicated demo environment',
                'Pre-load data and caches',
                'Check all integrations',
                'Have monitoring visible'
            ]
        },
        recovery: {
            name: 'Recovery Plans',
            description: 'Know how to recover from failures',
            actions: [
                'Practice failure scenarios',
                'Know quick restart procedures',
                'Have explanations ready',
                'Turn failures into learning moments'
            ]
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
}

/**
 * DemoFailureAnalysis analyzes demo failures.
 */
class DemoFailureAnalysis {
    /**
     * Analyzes failure patterns
     * @param {Array} failures - Failure history
     * @returns {Object} Analysis
     */
    static analyze(failures) {
        if (failures.length === 0) {
            return { message: 'No failures recorded' };
        }

        const byStep = {};
        for (const failure of failures) {
            byStep[failure.step] = (byStep[failure.step] || 0) + 1;
        }

        const mostCommonStep = Object.entries(byStep)
            .sort((a, b) => b[1] - a[1])[0];

        return {
            totalFailures: failures.length,
            byStep,
            mostCommonFailurePoint: {
                step: mostCommonStep[0],
                count: mostCommonStep[1]
            },
            recommendations: this.getRecommendations(mostCommonStep[0])
        };
    }

    /**
     * Gets recommendations based on failure point
     * @param {string} step - Failed step
     * @returns {Array} Recommendations
     */
    static getRecommendations(step) {
        return [
            `Focus testing on step ${step}`,
            'Add error handling around this step',
            'Consider simplifying this step',
            'Create fallback for this functionality',
            'Add monitoring and alerts'
        ];
    }
}

/**
 * TestingImplications shows how the law applies to testing.
 */
class TestingImplications {
    static implications = {
        repeatability: {
            name: 'Test Repeatability',
            lesson: 'Tests must pass consistently, not just once',
            application: 'Run tests multiple times to catch flaky tests',
            antiPattern: 'Accepting a test that passes "most of the time"'
        },
        environment: {
            name: 'Environment Parity',
            lesson: 'Test environments should match production',
            application: 'Use containers, infrastructure as code',
            antiPattern: 'Only testing in development environment'
        },
        edgeCases: {
            name: 'Edge Case Testing',
            lesson: 'Demos hide edge cases that tests must find',
            application: 'Comprehensive boundary and error testing',
            antiPattern: 'Only testing happy paths'
        },
        load: {
            name: 'Load Testing',
            lesson: 'Systems behave differently under load',
            application: 'Include performance and stress tests',
            antiPattern: 'Assuming demo performance equals production'
        },
        chaos: {
            name: 'Chaos Engineering',
            lesson: 'Failures will happen, test for them',
            application: 'Deliberately inject failures in testing',
            antiPattern: 'Assuming infrastructure is always available'
        }
    };

    /**
     * Gets all implications
     * @returns {Array} All implications
     */
    static getAllImplications() {
        return Object.entries(this.implications).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

// Demonstration
console.log('=== Law of Demos Demo ===\n');

// Demo risks
console.log('--- Demo Risks ---');
DemoRisk.getAllRisks().slice(0, 3).forEach(risk => {
    console.log(`\n${risk.name}: ${risk.description}`);
    console.log(`  Mitigation: ${risk.mitigation}`);
});

// Create demo scenario
console.log('\n--- Demo Scenario ---');
const productDemo = new DemoScenario({
    name: 'Product Feature Demo',
    description: 'Demonstrate new checkout flow',
    assumptions: ['Stable network', 'Test data loaded', 'APIs available'],
    knownLimitations: ['Only supports credit cards', 'US addresses only']
});

productDemo.addStep('Open application', 'Home page loads', 0.02);
productDemo.addStep('Login as demo user', 'User authenticated', 0.03);
productDemo.addStep('Navigate to products', 'Product list displays', 0.02);
productDemo.addStep('Add item to cart', 'Cart updated', 0.04);
productDemo.addStep('Proceed to checkout', 'Checkout form shown', 0.05);
productDemo.addStep('Complete payment', 'Order confirmed', 0.08);

// Run demo multiple times
console.log('\nRunning demo multiple times...');
const runs = 20;
let successes = 0;

for (let i = 0; i < runs; i++) {
    const result = productDemo.run();
    if (result.success) successes++;
}

console.log('Demo Statistics:', productDemo.getStatistics());

// Preparation strategies
console.log('\n--- Preparation Strategies ---');
DemoPreparation.getAllStrategies().slice(0, 3).forEach(strategy => {
    console.log(`\n${strategy.name}: ${strategy.description}`);
    console.log(`  Actions: ${strategy.actions.slice(0, 2).join(', ')}`);
});

// Failure analysis
console.log('\n--- Failure Analysis ---');
console.log(DemoFailureAnalysis.analyze(productDemo.failureHistory));

// Testing implications
console.log('\n--- Testing Implications ---');
TestingImplications.getAllImplications().slice(0, 3).forEach(impl => {
    console.log(`\n${impl.name}: ${impl.lesson}`);
    console.log(`  Application: ${impl.application}`);
});

/**
 * Key Lessons from the Law of Demos:
 *
 * 1. Demos are not substitutes for real-world testing
 * 2. Repeated demonstrations expose hidden flaws
 * 3. Be transparent about limitations and risks
 * 4. Have backup plans for demo failures
 * 5. Test under production-like conditions
 * 6. Edge cases hidden in demos must be tested
 * 7. Flaky tests are demos that fail eventually
 * 8. Environment differences cause unexpected failures
 * 9. Practice and rehearse thoroughly
 * 10. Turn demo failures into learning opportunities
 */
