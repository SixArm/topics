/**
 * DevOps - Bridging Development and Operations
 *
 * DevOps (Developer-Operations) breaks down traditional silos between
 * developers and operations teams, creating a culture of collaboration
 * and continuous improvement throughout the software development lifecycle.
 *
 * Key Principles:
 * - Collaboration: Teams work together from planning to maintenance
 * - CI/CD: Continuous integration, delivery, and deployment
 * - Automation: Streamline delivery, reduce errors, increase efficiency
 * - Monitoring: Gather feedback and identify issues continuously
 * - Continuous Improvement: Learn and improve processes iteratively
 */

/**
 * Pipeline represents a CI/CD pipeline for DevOps automation.
 * Manages stages from code commit through deployment.
 */
class Pipeline {
    constructor(name) {
        this.name = name;
        this.stages = [];
        this.triggers = [];
        this.variables = {};
        this.status = 'idle';
        this.runs = [];
    }

    /**
     * Adds a stage to the pipeline
     * @param {Object} stage - Stage configuration
     */
    addStage(stage) {
        this.stages.push({
            name: stage.name,
            jobs: stage.jobs || [],
            condition: stage.condition || (() => true),
            timeout: stage.timeout || 600000 // 10 minutes
        });
    }

    /**
     * Adds a trigger for automatic pipeline execution
     * @param {Object} trigger - Trigger configuration
     */
    addTrigger(trigger) {
        this.triggers.push({
            type: trigger.type, // push, pull_request, schedule
            branch: trigger.branch || '*',
            paths: trigger.paths || ['**/*']
        });
    }

    /**
     * Sets pipeline variables
     * @param {Object} variables - Key-value pairs
     */
    setVariables(variables) {
        this.variables = { ...this.variables, ...variables };
    }

    /**
     * Runs the pipeline
     * @param {Object} context - Run context (commit, branch, etc.)
     * @returns {Promise<Object>} Pipeline run result
     */
    async run(context) {
        console.log(`\nStarting pipeline: ${this.name}`);
        console.log(`Branch: ${context.branch}, Commit: ${context.commit}`);

        this.status = 'running';
        const startTime = Date.now();
        const stageResults = [];

        for (const stage of this.stages) {
            if (!stage.condition(context)) {
                console.log(`  Skipping stage: ${stage.name}`);
                stageResults.push({ stage: stage.name, status: 'skipped' });
                continue;
            }

            console.log(`  Running stage: ${stage.name}`);
            const result = await this.runStage(stage, context);
            stageResults.push(result);

            if (result.status === 'failed') {
                this.status = 'failed';
                break;
            }
        }

        if (this.status !== 'failed') {
            this.status = 'success';
        }

        const run = {
            id: `run-${Date.now()}`,
            pipeline: this.name,
            context,
            status: this.status,
            duration: Date.now() - startTime,
            stages: stageResults,
            timestamp: new Date().toISOString()
        };

        this.runs.push(run);
        console.log(`Pipeline ${this.status}: ${run.duration}ms`);

        return run;
    }

    /**
     * Runs a single stage
     * @param {Object} stage - Stage to run
     * @param {Object} context - Run context
     * @returns {Promise<Object>} Stage result
     */
    async runStage(stage, context) {
        const jobResults = [];

        for (const job of stage.jobs) {
            console.log(`    Running job: ${job.name}`);

            try {
                await job.run(context, this.variables);
                jobResults.push({ job: job.name, status: 'success' });
                console.log(`      ✓ ${job.name}`);
            } catch (error) {
                jobResults.push({ job: job.name, status: 'failed', error: error.message });
                console.log(`      ✗ ${job.name}: ${error.message}`);

                if (!job.continueOnError) {
                    return { stage: stage.name, status: 'failed', jobs: jobResults };
                }
            }
        }

        return {
            stage: stage.name,
            status: jobResults.every(j => j.status === 'success') ? 'success' : 'partial',
            jobs: jobResults
        };
    }

    /**
     * Gets pipeline statistics
     * @returns {Object} Pipeline stats
     */
    getStatistics() {
        const successful = this.runs.filter(r => r.status === 'success').length;
        const avgDuration = this.runs.length > 0
            ? this.runs.reduce((sum, r) => sum + r.duration, 0) / this.runs.length
            : 0;

        return {
            totalRuns: this.runs.length,
            successful,
            failed: this.runs.length - successful,
            successRate: this.runs.length > 0
                ? ((successful / this.runs.length) * 100).toFixed(1) + '%'
                : 'N/A',
            averageDuration: `${(avgDuration / 1000).toFixed(2)}s`
        };
    }
}

/**
 * Job represents a unit of work within a pipeline stage.
 * Executes specific tasks like building, testing, or deploying.
 */
class Job {
    constructor(name, options = {}) {
        this.name = name;
        this.steps = [];
        this.timeout = options.timeout || 300000; // 5 minutes
        this.continueOnError = options.continueOnError || false;
        this.environment = options.environment || {};
    }

    /**
     * Adds a step to the job
     * @param {string} name - Step name
     * @param {Function} action - Step action
     */
    addStep(name, action) {
        this.steps.push({ name, action });
    }

    /**
     * Runs the job
     * @param {Object} context - Run context
     * @param {Object} variables - Pipeline variables
     */
    async run(context, variables) {
        const env = { ...variables, ...this.environment };

        for (const step of this.steps) {
            await step.action(context, env);
        }
    }
}

/**
 * InfrastructureAsCode manages infrastructure definitions.
 * Enables version-controlled, automated infrastructure provisioning.
 */
class InfrastructureAsCode {
    constructor() {
        this.resources = [];
        this.state = {};
    }

    /**
     * Defines a resource
     * @param {Object} resource - Resource definition
     */
    defineResource(resource) {
        this.resources.push({
            type: resource.type,
            name: resource.name,
            properties: resource.properties,
            dependencies: resource.dependencies || []
        });
    }

    /**
     * Plans infrastructure changes
     * @returns {Object} Execution plan
     */
    plan() {
        const toCreate = [];
        const toUpdate = [];
        const toDelete = [];

        for (const resource of this.resources) {
            const key = `${resource.type}:${resource.name}`;
            const existing = this.state[key];

            if (!existing) {
                toCreate.push(resource);
            } else if (JSON.stringify(existing) !== JSON.stringify(resource.properties)) {
                toUpdate.push(resource);
            }
        }

        // Find resources to delete
        for (const key of Object.keys(this.state)) {
            const exists = this.resources.some(r => `${r.type}:${r.name}` === key);
            if (!exists) {
                toDelete.push(key);
            }
        }

        return {
            create: toCreate.length,
            update: toUpdate.length,
            delete: toDelete.length,
            changes: { toCreate, toUpdate, toDelete }
        };
    }

    /**
     * Applies infrastructure changes
     * @returns {Object} Apply result
     */
    apply() {
        console.log('\nApplying infrastructure changes...');
        const plan = this.plan();

        // Process creates
        for (const resource of plan.changes.toCreate) {
            const key = `${resource.type}:${resource.name}`;
            this.state[key] = resource.properties;
            console.log(`  + ${resource.type}: ${resource.name}`);
        }

        // Process updates
        for (const resource of plan.changes.toUpdate) {
            const key = `${resource.type}:${resource.name}`;
            this.state[key] = resource.properties;
            console.log(`  ~ ${resource.type}: ${resource.name}`);
        }

        // Process deletes
        for (const key of plan.changes.toDelete) {
            delete this.state[key];
            console.log(`  - ${key}`);
        }

        return {
            created: plan.create,
            updated: plan.update,
            deleted: plan.delete,
            success: true
        };
    }
}

/**
 * MonitoringSystem collects and analyzes application metrics.
 * Provides observability for deployed applications.
 */
class MonitoringSystem {
    constructor() {
        this.metrics = new Map();
        this.alerts = [];
        this.thresholds = {};
    }

    /**
     * Records a metric value
     * @param {string} name - Metric name
     * @param {number} value - Metric value
     * @param {Object} labels - Metric labels
     */
    recordMetric(name, value, labels = {}) {
        const key = `${name}:${JSON.stringify(labels)}`;

        if (!this.metrics.has(key)) {
            this.metrics.set(key, []);
        }

        this.metrics.get(key).push({
            value,
            timestamp: Date.now()
        });

        // Check thresholds
        this.checkThreshold(name, value, labels);
    }

    /**
     * Sets a threshold for alerting
     * @param {string} metric - Metric name
     * @param {string} operator - Comparison operator
     * @param {number} value - Threshold value
     * @param {string} severity - Alert severity
     */
    setThreshold(metric, operator, value, severity = 'warning') {
        this.thresholds[metric] = { operator, value, severity };
    }

    /**
     * Checks if metric exceeds threshold
     * @param {string} name - Metric name
     * @param {number} value - Metric value
     * @param {Object} labels - Metric labels
     */
    checkThreshold(name, value, labels) {
        const threshold = this.thresholds[name];
        if (!threshold) return;

        let triggered = false;
        switch (threshold.operator) {
            case '>': triggered = value > threshold.value; break;
            case '>=': triggered = value >= threshold.value; break;
            case '<': triggered = value < threshold.value; break;
            case '<=': triggered = value <= threshold.value; break;
            case '==': triggered = value === threshold.value; break;
        }

        if (triggered) {
            this.createAlert(name, value, threshold, labels);
        }
    }

    /**
     * Creates an alert
     * @param {string} metric - Metric name
     * @param {number} value - Current value
     * @param {Object} threshold - Threshold config
     * @param {Object} labels - Metric labels
     */
    createAlert(metric, value, threshold, labels) {
        const alert = {
            id: `alert-${Date.now()}`,
            metric,
            value,
            threshold: `${threshold.operator} ${threshold.value}`,
            severity: threshold.severity,
            labels,
            timestamp: new Date().toISOString()
        };

        this.alerts.push(alert);
        console.log(`Alert [${threshold.severity}]: ${metric} = ${value} (threshold: ${alert.threshold})`);
    }

    /**
     * Gets metric statistics
     * @param {string} name - Metric name
     * @param {number} windowMs - Time window in ms
     * @returns {Object} Metric stats
     */
    getMetricStats(name, windowMs = 300000) {
        const cutoff = Date.now() - windowMs;
        const allValues = [];

        for (const [key, values] of this.metrics) {
            if (key.startsWith(`${name}:`)) {
                const recent = values.filter(v => v.timestamp > cutoff);
                allValues.push(...recent.map(v => v.value));
            }
        }

        if (allValues.length === 0) {
            return { error: 'No data' };
        }

        return {
            count: allValues.length,
            min: Math.min(...allValues),
            max: Math.max(...allValues),
            avg: allValues.reduce((a, b) => a + b, 0) / allValues.length
        };
    }
}

/**
 * CollaborationHub facilitates team collaboration in DevOps.
 * Manages communication and knowledge sharing.
 */
class CollaborationHub {
    constructor() {
        this.channels = new Map();
        this.runbooks = [];
        this.incidents = [];
    }

    /**
     * Creates a communication channel
     * @param {string} name - Channel name
     * @param {Array} members - Channel members
     */
    createChannel(name, members = []) {
        this.channels.set(name, {
            name,
            members,
            messages: []
        });
    }

    /**
     * Posts a message to a channel
     * @param {string} channel - Channel name
     * @param {string} author - Message author
     * @param {string} content - Message content
     */
    postMessage(channel, author, content) {
        const ch = this.channels.get(channel);
        if (ch) {
            ch.messages.push({
                author,
                content,
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Adds a runbook for operational procedures
     * @param {Object} runbook - Runbook definition
     */
    addRunbook(runbook) {
        this.runbooks.push({
            id: `rb-${this.runbooks.length + 1}`,
            title: runbook.title,
            description: runbook.description,
            steps: runbook.steps,
            tags: runbook.tags || []
        });
    }

    /**
     * Searches runbooks by tag
     * @param {string} tag - Tag to search
     * @returns {Array} Matching runbooks
     */
    searchRunbooks(tag) {
        return this.runbooks.filter(rb =>
            rb.tags.includes(tag) || rb.title.toLowerCase().includes(tag.toLowerCase())
        );
    }

    /**
     * Records an incident
     * @param {Object} incident - Incident details
     */
    recordIncident(incident) {
        this.incidents.push({
            id: `inc-${Date.now()}`,
            title: incident.title,
            severity: incident.severity,
            status: 'open',
            assignee: incident.assignee,
            createdAt: new Date().toISOString()
        });
    }
}

// Demonstration
console.log('=== DevOps Demo ===');

// Create CI/CD Pipeline
const pipeline = new Pipeline('Main Build Pipeline');

// Add stages
const buildJob = new Job('Build');
buildJob.addStep('Install dependencies', async () => {
    console.log('        Installing dependencies...');
});
buildJob.addStep('Compile', async () => {
    console.log('        Compiling application...');
});

const testJob = new Job('Test');
testJob.addStep('Unit tests', async () => {
    console.log('        Running unit tests...');
});
testJob.addStep('Integration tests', async () => {
    console.log('        Running integration tests...');
});

const deployJob = new Job('Deploy');
deployJob.addStep('Deploy to staging', async () => {
    console.log('        Deploying to staging...');
});

pipeline.addStage({ name: 'Build', jobs: [buildJob] });
pipeline.addStage({ name: 'Test', jobs: [testJob] });
pipeline.addStage({
    name: 'Deploy',
    jobs: [deployJob],
    condition: (ctx) => ctx.branch === 'main'
});

// Add triggers
pipeline.addTrigger({ type: 'push', branch: 'main' });
pipeline.addTrigger({ type: 'pull_request', branch: '*' });

// Run pipeline
pipeline.run({
    branch: 'main',
    commit: 'abc123'
}).then(() => {
    console.log('\nPipeline Statistics:', pipeline.getStatistics());
});

// Infrastructure as Code demo
console.log('\n--- Infrastructure as Code ---');
const iac = new InfrastructureAsCode();

iac.defineResource({
    type: 'server',
    name: 'web-server-1',
    properties: { size: 'medium', region: 'us-east-1' }
});

iac.defineResource({
    type: 'database',
    name: 'primary-db',
    properties: { engine: 'postgres', size: 'large' }
});

console.log('Plan:', iac.plan());
iac.apply();

// Monitoring demo
console.log('\n--- Monitoring System ---');
const monitoring = new MonitoringSystem();

monitoring.setThreshold('cpu_usage', '>', 80, 'critical');
monitoring.setThreshold('response_time', '>', 500, 'warning');

monitoring.recordMetric('cpu_usage', 45, { host: 'web-1' });
monitoring.recordMetric('cpu_usage', 85, { host: 'web-2' }); // Triggers alert
monitoring.recordMetric('response_time', 120, { endpoint: '/api' });

console.log('CPU Stats:', monitoring.getMetricStats('cpu_usage'));

/**
 * Best Practices for DevOps:
 *
 * 1. Automate everything possible - builds, tests, deployments
 * 2. Implement comprehensive monitoring and alerting
 * 3. Use infrastructure as code for reproducible environments
 * 4. Practice continuous integration with frequent commits
 * 5. Maintain comprehensive documentation and runbooks
 * 6. Foster collaboration between dev and ops teams
 * 7. Implement feature flags for safe deployments
 * 8. Conduct regular retrospectives for process improvement
 * 9. Use version control for all configurations
 * 10. Design for failure with robust error handling
 */
