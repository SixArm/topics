/**
 * Program Evaluation and Review Technique (PERT)
 *
 * PERT is a project management tool for estimating time to complete tasks
 * using probabilistic analysis. It uses three time estimates: optimistic,
 * most likely, and pessimistic to calculate expected duration and variance.
 * PERT identifies critical paths and helps manage uncertainty in schedules.
 *
 * Key Concepts:
 * - Three-point estimation (O, M, P)
 * - Expected time = (O + 4M + P) / 6
 * - Standard deviation = (P - O) / 6
 * - Critical path analysis
 */

/**
 * PERTEstimate represents a task with three-point time estimate.
 */
class PERTEstimate {
    constructor(options) {
        this.taskId = options.taskId;
        this.taskName = options.taskName;
        this.optimistic = options.optimistic;    // O: Best case
        this.mostLikely = options.mostLikely;    // M: Most likely
        this.pessimistic = options.pessimistic;  // P: Worst case
        this.dependencies = options.dependencies || [];
    }

    /**
     * Calculates expected time (mean)
     * Formula: (O + 4M + P) / 6
     * @returns {number} Expected time
     */
    calculateExpectedTime() {
        return (this.optimistic + 4 * this.mostLikely + this.pessimistic) / 6;
    }

    /**
     * Calculates variance
     * Formula: ((P - O) / 6)²
     * @returns {number} Variance
     */
    calculateVariance() {
        const stdDev = (this.pessimistic - this.optimistic) / 6;
        return stdDev * stdDev;
    }

    /**
     * Calculates standard deviation
     * Formula: (P - O) / 6
     * @returns {number} Standard deviation
     */
    calculateStandardDeviation() {
        return (this.pessimistic - this.optimistic) / 6;
    }

    /**
     * Gets estimate summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            task: this.taskName,
            estimates: {
                optimistic: this.optimistic,
                mostLikely: this.mostLikely,
                pessimistic: this.pessimistic
            },
            expected: this.calculateExpectedTime().toFixed(2),
            stdDev: this.calculateStandardDeviation().toFixed(2),
            variance: this.calculateVariance().toFixed(2)
        };
    }

    /**
     * Validates estimate consistency
     * @returns {Object} Validation result
     */
    validate() {
        const issues = [];

        if (this.optimistic > this.mostLikely) {
            issues.push('Optimistic time exceeds most likely time');
        }
        if (this.mostLikely > this.pessimistic) {
            issues.push('Most likely time exceeds pessimistic time');
        }
        if (this.optimistic < 0 || this.mostLikely < 0 || this.pessimistic < 0) {
            issues.push('Time estimates cannot be negative');
        }

        return {
            valid: issues.length === 0,
            issues
        };
    }
}

/**
 * PERTNetwork represents a network of tasks with dependencies.
 * Calculates critical path and project duration.
 */
class PERTNetwork {
    constructor(projectName) {
        this.projectName = projectName;
        this.tasks = new Map();
        this.criticalPath = [];
    }

    /**
     * Adds a task to the network
     * @param {PERTEstimate} task - Task to add
     */
    addTask(task) {
        this.tasks.set(task.taskId, task);
    }

    /**
     * Gets all tasks
     * @returns {Array} Tasks
     */
    getAllTasks() {
        return Array.from(this.tasks.values());
    }

    /**
     * Calculates early start and finish times
     * @returns {Map} Early times for each task
     */
    calculateEarlyTimes() {
        const earlyTimes = new Map();

        // Topological sort for processing order
        const sorted = this.topologicalSort();

        for (const taskId of sorted) {
            const task = this.tasks.get(taskId);
            const expectedTime = task.calculateExpectedTime();

            // Find maximum early finish of dependencies
            let earlyStart = 0;
            for (const depId of task.dependencies) {
                const depTimes = earlyTimes.get(depId);
                if (depTimes && depTimes.earlyFinish > earlyStart) {
                    earlyStart = depTimes.earlyFinish;
                }
            }

            earlyTimes.set(taskId, {
                earlyStart,
                earlyFinish: earlyStart + expectedTime
            });
        }

        return earlyTimes;
    }

    /**
     * Calculates late start and finish times
     * @param {number} projectEnd - Project end time
     * @returns {Map} Late times for each task
     */
    calculateLateTimes(projectEnd) {
        const lateTimes = new Map();

        // Process in reverse topological order
        const sorted = this.topologicalSort().reverse();

        for (const taskId of sorted) {
            const task = this.tasks.get(taskId);
            const expectedTime = task.calculateExpectedTime();

            // Find minimum late start of successors
            let lateFinish = projectEnd;
            for (const [otherId, otherTask] of this.tasks) {
                if (otherTask.dependencies.includes(taskId)) {
                    const otherLateTimes = lateTimes.get(otherId);
                    if (otherLateTimes && otherLateTimes.lateStart < lateFinish) {
                        lateFinish = otherLateTimes.lateStart;
                    }
                }
            }

            lateTimes.set(taskId, {
                lateStart: lateFinish - expectedTime,
                lateFinish
            });
        }

        return lateTimes;
    }

    /**
     * Performs topological sort of tasks
     * @returns {Array} Sorted task IDs
     */
    topologicalSort() {
        const visited = new Set();
        const sorted = [];

        const visit = (taskId) => {
            if (visited.has(taskId)) return;
            visited.add(taskId);

            const task = this.tasks.get(taskId);
            for (const depId of task.dependencies) {
                visit(depId);
            }
            sorted.push(taskId);
        };

        for (const taskId of this.tasks.keys()) {
            visit(taskId);
        }

        return sorted;
    }

    /**
     * Identifies the critical path
     * @returns {Object} Critical path analysis
     */
    findCriticalPath() {
        const earlyTimes = this.calculateEarlyTimes();

        // Find project duration (maximum early finish)
        let projectDuration = 0;
        for (const times of earlyTimes.values()) {
            if (times.earlyFinish > projectDuration) {
                projectDuration = times.earlyFinish;
            }
        }

        const lateTimes = this.calculateLateTimes(projectDuration);

        // Critical path: tasks where early start = late start (slack = 0)
        this.criticalPath = [];
        const taskDetails = [];

        for (const [taskId, task] of this.tasks) {
            const early = earlyTimes.get(taskId);
            const late = lateTimes.get(taskId);
            const slack = late.lateStart - early.earlyStart;

            const detail = {
                taskId,
                taskName: task.taskName,
                expectedTime: task.calculateExpectedTime().toFixed(2),
                earlyStart: early.earlyStart.toFixed(2),
                earlyFinish: early.earlyFinish.toFixed(2),
                lateStart: late.lateStart.toFixed(2),
                lateFinish: late.lateFinish.toFixed(2),
                slack: slack.toFixed(2),
                critical: Math.abs(slack) < 0.001
            };

            taskDetails.push(detail);

            if (detail.critical) {
                this.criticalPath.push(taskId);
            }
        }

        return {
            projectDuration: projectDuration.toFixed(2),
            criticalPath: this.criticalPath,
            tasks: taskDetails.sort((a, b) => parseFloat(a.earlyStart) - parseFloat(b.earlyStart))
        };
    }

    /**
     * Calculates project variance (sum of critical path variances)
     * @returns {number} Project variance
     */
    calculateProjectVariance() {
        let totalVariance = 0;

        for (const taskId of this.criticalPath) {
            const task = this.tasks.get(taskId);
            totalVariance += task.calculateVariance();
        }

        return totalVariance;
    }

    /**
     * Calculates probability of completing by deadline
     * @param {number} deadline - Target completion time
     * @returns {Object} Probability analysis
     */
    probabilityOfCompletion(deadline) {
        const analysis = this.findCriticalPath();
        const projectDuration = parseFloat(analysis.projectDuration);
        const projectStdDev = Math.sqrt(this.calculateProjectVariance());

        // Z-score
        const z = (deadline - projectDuration) / projectStdDev;

        // Approximate probability using normal distribution
        // Using a simple approximation
        const probability = this.normalCDF(z);

        return {
            expectedDuration: projectDuration.toFixed(2),
            standardDeviation: projectStdDev.toFixed(2),
            deadline,
            zScore: z.toFixed(2),
            probability: (probability * 100).toFixed(2) + '%',
            interpretation: z > 0
                ? `${(probability * 100).toFixed(0)}% chance of meeting deadline`
                : `Only ${(probability * 100).toFixed(0)}% chance of meeting deadline`
        };
    }

    /**
     * Approximates normal CDF
     * @param {number} z - Z-score
     * @returns {number} Probability
     */
    normalCDF(z) {
        // Approximation of normal CDF
        const a1 = 0.254829592;
        const a2 = -0.284496736;
        const a3 = 1.421413741;
        const a4 = -1.453152027;
        const a5 = 1.061405429;
        const p = 0.3275911;

        const sign = z < 0 ? -1 : 1;
        z = Math.abs(z) / Math.sqrt(2);

        const t = 1.0 / (1.0 + p * z);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

        return 0.5 * (1.0 + sign * y);
    }
}

/**
 * PERTReporter generates PERT analysis reports.
 */
class PERTReporter {
    constructor(network) {
        this.network = network;
    }

    /**
     * Generates comprehensive PERT report
     * @param {number} deadline - Optional deadline
     * @returns {Object} Report
     */
    generateReport(deadline = null) {
        const analysis = this.network.findCriticalPath();

        const report = {
            project: this.network.projectName,
            summary: {
                totalTasks: this.network.tasks.size,
                expectedDuration: analysis.projectDuration + ' days',
                criticalPathLength: this.network.criticalPath.length,
                projectVariance: this.network.calculateProjectVariance().toFixed(2),
                projectStdDev: Math.sqrt(this.network.calculateProjectVariance()).toFixed(2)
            },
            criticalPath: this.network.criticalPath.map(id => {
                const task = this.network.tasks.get(id);
                return `${id}: ${task.taskName}`;
            }),
            taskSchedule: analysis.tasks,
            risks: this.identifyRisks(analysis)
        };

        if (deadline) {
            report.deadlineAnalysis = this.network.probabilityOfCompletion(deadline);
        }

        return report;
    }

    /**
     * Identifies schedule risks
     * @param {Object} analysis - Critical path analysis
     * @returns {Array} Risks
     */
    identifyRisks(analysis) {
        const risks = [];

        // Tasks with high variance on critical path
        for (const taskId of this.network.criticalPath) {
            const task = this.network.tasks.get(taskId);
            const variance = task.calculateVariance();

            if (variance > 4) { // More than 2 days std dev
                risks.push({
                    task: task.taskName,
                    type: 'High variance',
                    detail: `Standard deviation of ${task.calculateStandardDeviation().toFixed(2)} days`,
                    recommendation: 'Consider breaking into smaller tasks or adding buffers'
                });
            }
        }

        // Tasks with no slack that have many dependencies
        for (const detail of analysis.tasks) {
            const task = this.network.tasks.get(detail.taskId);
            if (detail.critical && task.dependencies.length > 2) {
                risks.push({
                    task: task.taskName,
                    type: 'Dependency bottleneck',
                    detail: `${task.dependencies.length} dependencies on critical path`,
                    recommendation: 'Monitor dependencies closely for delays'
                });
            }
        }

        return risks;
    }
}

// Demonstration
console.log('=== PERT Analysis Demo ===\n');

// Create a project network
const project = new PERTNetwork('Software Development Project');

// Add tasks with PERT estimates (in days)
project.addTask(new PERTEstimate({
    taskId: 'A',
    taskName: 'Requirements Analysis',
    optimistic: 5,
    mostLikely: 7,
    pessimistic: 12,
    dependencies: []
}));

project.addTask(new PERTEstimate({
    taskId: 'B',
    taskName: 'System Design',
    optimistic: 8,
    mostLikely: 10,
    pessimistic: 15,
    dependencies: ['A']
}));

project.addTask(new PERTEstimate({
    taskId: 'C',
    taskName: 'Database Design',
    optimistic: 4,
    mostLikely: 5,
    pessimistic: 8,
    dependencies: ['A']
}));

project.addTask(new PERTEstimate({
    taskId: 'D',
    taskName: 'Development',
    optimistic: 15,
    mostLikely: 20,
    pessimistic: 30,
    dependencies: ['B', 'C']
}));

project.addTask(new PERTEstimate({
    taskId: 'E',
    taskName: 'Testing',
    optimistic: 8,
    mostLikely: 12,
    pessimistic: 18,
    dependencies: ['D']
}));

project.addTask(new PERTEstimate({
    taskId: 'F',
    taskName: 'Deployment',
    optimistic: 2,
    mostLikely: 3,
    pessimistic: 5,
    dependencies: ['E']
}));

// Show individual task estimates
console.log('--- Task Estimates ---');
project.getAllTasks().forEach(task => {
    console.log(task.getSummary());
});

// Critical path analysis
console.log('\n--- Critical Path Analysis ---');
const analysis = project.findCriticalPath();
console.log('Project Duration:', analysis.projectDuration, 'days');
console.log('Critical Path:', analysis.criticalPath.join(' -> '));
console.log('\nTask Schedule:');
analysis.tasks.forEach(t => {
    console.log(`  ${t.taskId}: ES=${t.earlyStart}, EF=${t.earlyFinish}, Slack=${t.slack}${t.critical ? ' *CRITICAL*' : ''}`);
});

// Probability of meeting deadline
console.log('\n--- Deadline Analysis ---');
console.log('Deadline 55 days:', project.probabilityOfCompletion(55));
console.log('Deadline 65 days:', project.probabilityOfCompletion(65));

// Full report
console.log('\n--- Full PERT Report ---');
const reporter = new PERTReporter(project);
const report = reporter.generateReport(60);
console.log('Summary:', report.summary);
console.log('Critical Path:', report.criticalPath);
console.log('Risks:', report.risks);

/**
 * Best Practices for PERT Analysis:
 *
 * 1. Get estimates from people doing the work
 * 2. Use historical data to inform estimates
 * 3. Be realistic with optimistic and pessimistic bounds
 * 4. Focus management attention on critical path
 * 5. Add buffers for high-variance critical tasks
 * 6. Update estimates as project progresses
 * 7. Track actual vs estimated for future projects
 * 8. Consider multiple scenarios (best/worst case)
 * 9. Communicate uncertainty ranges to stakeholders
 * 10. Use PERT with other tools (Gantt, Kanban)
 */
