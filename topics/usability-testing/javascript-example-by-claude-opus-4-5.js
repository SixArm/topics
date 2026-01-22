/**
 * Usability Testing - Evaluating User-Friendliness
 *
 * Usability testing evaluates the usability and user-friendliness of a product
 * by observing users as they interact with it. The goal is to identify usability
 * issues, obstacles, and improvement areas to enhance the overall user experience.
 *
 * Key Concepts:
 * - Task-based evaluation
 * - User observation
 * - Metrics collection
 * - Iterative improvement
 */

/**
 * UsabilityMetric defines key usability metrics.
 */
class UsabilityMetric {
    static metrics = {
        taskCompletionRate: {
            name: 'Task Completion Rate',
            description: 'Percentage of users who complete a task',
            calculation: '(Completed Tasks / Attempted Tasks) × 100',
            benchmark: '≥ 78% for good usability'
        },
        timeOnTask: {
            name: 'Time on Task',
            description: 'Time taken to complete a specific task',
            calculation: 'End time - Start time',
            benchmark: 'Compare to expert time'
        },
        errorRate: {
            name: 'Error Rate',
            description: 'Number of errors per task',
            calculation: 'Total Errors / Total Tasks',
            benchmark: '< 0.5 errors per task'
        },
        satisfactionScore: {
            name: 'Satisfaction Score (SUS)',
            description: 'System Usability Scale score',
            calculation: 'Standardized questionnaire (0-100)',
            benchmark: '≥ 68 is above average'
        },
        learnability: {
            name: 'Learnability',
            description: 'How quickly users learn the system',
            calculation: 'Compare first vs subsequent task times',
            benchmark: 'Significant improvement by 3rd attempt'
        },
        efficiency: {
            name: 'Efficiency',
            description: 'Resources expended to complete tasks',
            calculation: 'Time × Errors × Effort',
            benchmark: 'Lower is better'
        }
    };

    /**
     * Gets metric by name
     * @param {string} name - Metric name
     * @returns {Object} Metric details
     */
    static getMetric(name) {
        return this.metrics[name];
    }

    /**
     * Gets all metrics
     * @returns {Array} All metrics
     */
    static getAllMetrics() {
        return Object.entries(this.metrics).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * UsabilityTask represents a task for testing.
 */
class UsabilityTask {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.expectedTime = options.expectedTime; // seconds
        this.steps = options.steps || [];
        this.successCriteria = options.successCriteria || [];
    }

    /**
     * Evaluates task completion
     * @param {Object} result - Task result
     * @returns {Object} Evaluation
     */
    evaluate(result) {
        const criteriaResults = this.successCriteria.map(criterion => ({
            criterion,
            met: result.completedCriteria?.includes(criterion) || false
        }));

        const criteriaMet = criteriaResults.filter(c => c.met).length;
        const completed = criteriaMet === this.successCriteria.length;
        const timeEfficiency = result.actualTime
            ? ((this.expectedTime / result.actualTime) * 100).toFixed(1)
            : null;

        return {
            task: this.name,
            completed,
            criteriaResults,
            actualTime: result.actualTime,
            expectedTime: this.expectedTime,
            timeEfficiency: timeEfficiency ? timeEfficiency + '%' : 'N/A',
            errors: result.errors || 0
        };
    }
}

/**
 * UsabilityTestSession manages a usability test session.
 */
class UsabilityTestSession {
    constructor(options) {
        this.participant = options.participant;
        this.product = options.product;
        this.tasks = options.tasks || [];
        this.startTime = null;
        this.endTime = null;
        this.taskResults = [];
        this.observations = [];
        this.satisfactionScore = null;
    }

    /**
     * Starts the session
     */
    start() {
        this.startTime = new Date();
    }

    /**
     * Ends the session
     */
    end() {
        this.endTime = new Date();
    }

    /**
     * Records task result
     * @param {string} taskId - Task ID
     * @param {Object} result - Task result
     */
    recordTaskResult(taskId, result) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            const evaluation = task.evaluate(result);
            this.taskResults.push({
                taskId,
                ...evaluation,
                timestamp: new Date()
            });
        }
    }

    /**
     * Adds observation
     * @param {string} observation - Observation text
     * @param {string} category - Category
     */
    addObservation(observation, category = 'general') {
        this.observations.push({
            observation,
            category,
            timestamp: new Date()
        });
    }

    /**
     * Records satisfaction score
     * @param {number} score - SUS score (0-100)
     */
    recordSatisfaction(score) {
        this.satisfactionScore = score;
    }

    /**
     * Gets session summary
     * @returns {Object} Summary
     */
    getSummary() {
        const completed = this.taskResults.filter(r => r.completed).length;
        const avgTime = this.taskResults.length > 0
            ? this.taskResults.reduce((sum, r) => sum + (r.actualTime || 0), 0) / this.taskResults.length
            : 0;
        const totalErrors = this.taskResults.reduce((sum, r) => sum + r.errors, 0);

        return {
            participant: this.participant,
            product: this.product,
            duration: this.endTime && this.startTime
                ? (this.endTime - this.startTime) / 1000
                : null,
            taskCompletionRate: ((completed / this.taskResults.length) * 100).toFixed(1) + '%',
            averageTaskTime: avgTime.toFixed(1) + 's',
            totalErrors,
            errorRate: (totalErrors / this.taskResults.length).toFixed(2),
            satisfactionScore: this.satisfactionScore,
            observationCount: this.observations.length
        };
    }
}

/**
 * SUSCalculator calculates System Usability Scale score.
 */
class SUSCalculator {
    static questions = [
        'I think I would like to use this system frequently',
        'I found the system unnecessarily complex',
        'I thought the system was easy to use',
        'I think I would need support to use this system',
        'I found the various functions well integrated',
        'I thought there was too much inconsistency',
        'I imagine most people would learn to use this quickly',
        'I found the system very cumbersome to use',
        'I felt very confident using the system',
        'I needed to learn a lot before I could get going'
    ];

    /**
     * Calculates SUS score
     * @param {Array} responses - Array of responses (1-5)
     * @returns {Object} SUS score calculation
     */
    static calculate(responses) {
        if (responses.length !== 10) {
            return { error: 'SUS requires exactly 10 responses' };
        }

        let score = 0;

        // Odd questions (1,3,5,7,9): score - 1
        // Even questions (2,4,6,8,10): 5 - score
        for (let i = 0; i < 10; i++) {
            if (i % 2 === 0) {
                score += responses[i] - 1;
            } else {
                score += 5 - responses[i];
            }
        }

        score *= 2.5; // Scale to 0-100

        let grade;
        if (score >= 85) grade = 'A';
        else if (score >= 72) grade = 'B';
        else if (score >= 52) grade = 'C';
        else if (score >= 38) grade = 'D';
        else grade = 'F';

        return {
            score: score.toFixed(1),
            grade,
            interpretation: score >= 68
                ? 'Above average usability'
                : 'Below average - improvements needed',
            percentile: this.getPercentile(score)
        };
    }

    /**
     * Gets percentile for score
     * @param {number} score - SUS score
     * @returns {string} Percentile
     */
    static getPercentile(score) {
        if (score >= 90) return 'Top 5%';
        if (score >= 80) return 'Top 10%';
        if (score >= 68) return 'Above average';
        if (score >= 50) return 'Below average';
        return 'Bottom 15%';
    }
}

/**
 * UsabilityIssue represents a discovered usability issue.
 */
class UsabilityIssue {
    static severities = {
        critical: {
            level: 4,
            description: 'Prevents task completion',
            priority: 'Must fix immediately'
        },
        major: {
            level: 3,
            description: 'Causes significant difficulty',
            priority: 'Fix before release'
        },
        minor: {
            level: 2,
            description: 'Causes minor inconvenience',
            priority: 'Fix if time permits'
        },
        cosmetic: {
            level: 1,
            description: 'Affects appearance only',
            priority: 'Low priority'
        }
    };

    constructor(options) {
        this.id = options.id || `UI-${Date.now()}`;
        this.title = options.title;
        this.description = options.description;
        this.severity = options.severity || 'minor';
        this.location = options.location;
        this.affected = options.affected || [];
        this.recommendation = options.recommendation;
        this.status = 'open';
    }

    /**
     * Gets issue priority score
     * @returns {number} Priority score
     */
    getPriorityScore() {
        const severityLevel = UsabilityIssue.severities[this.severity]?.level || 1;
        const impactFactor = this.affected.length || 1;
        return severityLevel * impactFactor;
    }

    /**
     * Gets issue summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            severity: this.severity,
            priorityScore: this.getPriorityScore(),
            status: this.status
        };
    }
}

/**
 * UsabilityReport generates usability test reports.
 */
class UsabilityReport {
    /**
     * Generates report from sessions
     * @param {Array} sessions - Test sessions
     * @returns {Object} Report
     */
    static generate(sessions) {
        const summaries = sessions.map(s => s.getSummary());

        const avgCompletionRate = summaries.reduce(
            (sum, s) => sum + parseFloat(s.taskCompletionRate), 0
        ) / summaries.length;

        const avgSatisfaction = summaries
            .filter(s => s.satisfactionScore !== null)
            .reduce((sum, s) => sum + s.satisfactionScore, 0) /
            summaries.filter(s => s.satisfactionScore !== null).length;

        const totalErrors = summaries.reduce((sum, s) => sum + s.totalErrors, 0);

        const allObservations = sessions.flatMap(s => s.observations);
        const observationsByCategory = {};
        allObservations.forEach(o => {
            observationsByCategory[o.category] = (observationsByCategory[o.category] || 0) + 1;
        });

        return {
            participants: sessions.length,
            metrics: {
                avgTaskCompletionRate: avgCompletionRate.toFixed(1) + '%',
                avgSatisfactionScore: avgSatisfaction.toFixed(1),
                totalErrors,
                avgErrorsPerSession: (totalErrors / sessions.length).toFixed(2)
            },
            observationsByCategory,
            recommendation: avgCompletionRate >= 78 && avgSatisfaction >= 68
                ? 'Usability is acceptable'
                : 'Usability improvements needed'
        };
    }
}

// Demonstration
console.log('=== Usability Testing Demo ===\n');

// Usability metrics
console.log('--- Usability Metrics ---');
UsabilityMetric.getAllMetrics().slice(0, 4).forEach(metric => {
    console.log(`\n${metric.name}: ${metric.description}`);
    console.log(`  Benchmark: ${metric.benchmark}`);
});

// Create task
console.log('\n--- Usability Task ---');
const checkoutTask = new UsabilityTask({
    id: 'task-checkout',
    name: 'Complete Checkout',
    description: 'Add item to cart and complete purchase',
    expectedTime: 120, // 2 minutes
    steps: ['Find product', 'Add to cart', 'Enter details', 'Pay'],
    successCriteria: ['Order confirmed', 'Email received']
});

// Task evaluation
const taskResult = checkoutTask.evaluate({
    actualTime: 95,
    completedCriteria: ['Order confirmed', 'Email received'],
    errors: 1
});
console.log('Task Evaluation:', taskResult);

// Test session
console.log('\n--- Test Session ---');
const session = new UsabilityTestSession({
    participant: 'P001',
    product: 'E-Commerce Website',
    tasks: [checkoutTask]
});

session.start();
session.recordTaskResult('task-checkout', {
    actualTime: 95,
    completedCriteria: ['Order confirmed', 'Email received'],
    errors: 1
});
session.addObservation('User struggled to find checkout button', 'navigation');
session.addObservation('User expected autofill for address', 'forms');
session.recordSatisfaction(72);
session.end();

console.log('Session Summary:', session.getSummary());

// SUS calculation
console.log('\n--- SUS Score Calculation ---');
const susResponses = [4, 2, 5, 2, 4, 2, 5, 1, 4, 2]; // 1-5 scale
console.log('SUS Result:', SUSCalculator.calculate(susResponses));

// Usability issue
console.log('\n--- Usability Issue ---');
const issue = new UsabilityIssue({
    title: 'Checkout button not visible on mobile',
    description: 'The checkout button is below the fold on mobile devices',
    severity: 'major',
    location: 'Cart page',
    affected: ['P001', 'P002', 'P003'],
    recommendation: 'Add sticky checkout button for mobile'
});
console.log('Issue:', issue.getSummary());

// Generate report
console.log('\n--- Usability Report ---');
console.log(UsabilityReport.generate([session]));

/**
 * Usability Testing Best Practices:
 *
 * 1. Define clear test objectives
 * 2. Recruit representative users
 * 3. Create realistic task scenarios
 * 4. Observe without interfering
 * 5. Collect both quantitative and qualitative data
 * 6. Use standardized metrics (SUS, etc.)
 * 7. Prioritize issues by severity and impact
 * 8. Iterate based on findings
 * 9. Test early and often
 * 10. Combine with other UX research methods
 */
