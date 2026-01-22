/**
 * Continuous Deployment (CD) - Automated Production Releases
 *
 * Continuous Deployment automatically deploys code changes to production
 * after passing all tests and quality checks. CD reduces time between
 * writing code and getting it to users while maintaining quality and reliability.
 *
 * Key Concepts:
 * - Automated Testing: All changes must pass comprehensive tests
 * - Deployment Pipelines: Automated stages from commit to production
 * - Rollback Mechanisms: Quick recovery when issues are detected
 * - Monitoring: Post-deployment health checks and alerts
 */

/**
 * DeploymentPipeline orchestrates the deployment process.
 * Manages stages from code commit through production deployment.
 */
class DeploymentPipeline {
    constructor(name) {
        this.name = name;
        this.stages = [];
        this.currentStage = null;
        this.status = 'idle';
        this.history = [];
    }

    /**
     * Adds a stage to the pipeline
     * @param {PipelineStage} stage - Stage to add
     */
    addStage(stage) {
        this.stages.push(stage);
        stage.pipeline = this;
    }

    /**
     * Executes the entire pipeline
     * @param {Object} deployment - Deployment details
     * @returns {Promise<Object>} Pipeline result
     */
    async execute(deployment) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Pipeline: ${this.name}`);
        console.log(`Commit: ${deployment.commit}`);
        console.log(`${'='.repeat(50)}\n`);

        this.status = 'running';
        const startTime = Date.now();
        const results = [];

        for (const stage of this.stages) {
            this.currentStage = stage;
            console.log(`\n--- Stage: ${stage.name} ---`);

            try {
                const result = await stage.execute(deployment);
                results.push(result);

                if (!result.passed) {
                    this.status = 'failed';
                    console.log(`✗ Pipeline failed at stage: ${stage.name}`);
                    break;
                }

                console.log(`✓ Stage ${stage.name} completed`);
            } catch (error) {
                results.push({
                    stage: stage.name,
                    passed: false,
                    error: error.message
                });
                this.status = 'failed';
                console.log(`✗ Stage ${stage.name} errored: ${error.message}`);
                break;
            }
        }

        if (this.status !== 'failed') {
            this.status = 'completed';
        }

        const pipelineResult = {
            pipeline: this.name,
            deployment,
            status: this.status,
            duration: Date.now() - startTime,
            stageResults: results,
            timestamp: new Date().toISOString()
        };

        this.history.push(pipelineResult);
        return pipelineResult;
    }

    /**
     * Gets pipeline statistics
     * @returns {Object} Pipeline stats
     */
    getStatistics() {
        const successful = this.history.filter(h => h.status === 'completed').length;
        const avgDuration = this.history.length > 0
            ? this.history.reduce((sum, h) => sum + h.duration, 0) / this.history.length
            : 0;

        return {
            totalRuns: this.history.length,
            successful,
            failed: this.history.length - successful,
            successRate: `${((successful / this.history.length) * 100 || 0).toFixed(1)}%`,
            averageDuration: `${(avgDuration / 1000).toFixed(2)}s`
        };
    }
}

/**
 * PipelineStage represents a single step in the deployment pipeline.
 * Each stage performs specific actions and validates results.
 */
class PipelineStage {
    constructor(name, options = {}) {
        this.name = name;
        this.timeout = options.timeout || 300000; // 5 minutes default
        this.retries = options.retries || 0;
        this.continueOnFailure = options.continueOnFailure || false;
        this.actions = [];
        this.pipeline = null;
    }

    /**
     * Adds an action to the stage
     * @param {Function} action - Action function to execute
     * @param {string} description - Action description
     */
    addAction(action, description) {
        this.actions.push({ action, description });
    }

    /**
     * Executes the stage
     * @param {Object} deployment - Deployment context
     * @returns {Promise<Object>} Stage result
     */
    async execute(deployment) {
        const startTime = Date.now();
        const actionResults = [];

        for (const { action, description } of this.actions) {
            console.log(`  Running: ${description}`);

            let attempts = 0;
            let success = false;
            let lastError = null;

            while (attempts <= this.retries && !success) {
                try {
                    await action(deployment);
                    success = true;
                    actionResults.push({ description, passed: true });
                    console.log(`    ✓ ${description}`);
                } catch (error) {
                    lastError = error;
                    attempts++;
                    if (attempts <= this.retries) {
                        console.log(`    Retry ${attempts}/${this.retries}...`);
                    }
                }
            }

            if (!success) {
                actionResults.push({
                    description,
                    passed: false,
                    error: lastError.message
                });
                console.log(`    ✗ ${description}: ${lastError.message}`);

                if (!this.continueOnFailure) {
                    return {
                        stage: this.name,
                        passed: false,
                        duration: Date.now() - startTime,
                        actionResults
                    };
                }
            }
        }

        const allPassed = actionResults.every(r => r.passed);
        return {
            stage: this.name,
            passed: allPassed || this.continueOnFailure,
            duration: Date.now() - startTime,
            actionResults
        };
    }
}

/**
 * DeploymentManager handles deployment operations and rollbacks.
 * Manages the actual deployment to different environments.
 */
class DeploymentManager {
    constructor() {
        this.environments = new Map();
        this.deployments = [];
    }

    /**
     * Registers an environment
     * @param {string} name - Environment name
     * @param {Object} config - Environment configuration
     */
    registerEnvironment(name, config) {
        this.environments.set(name, {
            name,
            ...config,
            currentVersion: null,
            previousVersions: []
        });
    }

    /**
     * Deploys to an environment
     * @param {string} environment - Target environment
     * @param {Object} deployment - Deployment details
     * @returns {Promise<Object>} Deployment result
     */
    async deploy(environment, deployment) {
        const env = this.environments.get(environment);
        if (!env) {
            throw new Error(`Unknown environment: ${environment}`);
        }

        console.log(`Deploying ${deployment.version} to ${environment}...`);

        // Store previous version for rollback
        if (env.currentVersion) {
            env.previousVersions.push(env.currentVersion);
        }

        // Perform deployment (simulated)
        const result = await this.performDeployment(env, deployment);

        if (result.success) {
            env.currentVersion = deployment.version;
            this.deployments.push({
                environment,
                version: deployment.version,
                timestamp: new Date().toISOString(),
                status: 'success'
            });
            console.log(`✓ Deployed ${deployment.version} to ${environment}`);
        }

        return result;
    }

    /**
     * Performs the actual deployment (simulated)
     * @param {Object} env - Environment configuration
     * @param {Object} deployment - Deployment details
     * @returns {Promise<Object>} Deployment result
     */
    async performDeployment(env, deployment) {
        // Simulated deployment steps
        console.log(`  Uploading artifacts...`);
        console.log(`  Updating configuration...`);
        console.log(`  Restarting services...`);

        return {
            success: true,
            environment: env.name,
            version: deployment.version,
            deployedAt: new Date().toISOString()
        };
    }

    /**
     * Rolls back to previous version
     * @param {string} environment - Target environment
     * @returns {Promise<Object>} Rollback result
     */
    async rollback(environment) {
        const env = this.environments.get(environment);
        if (!env) {
            throw new Error(`Unknown environment: ${environment}`);
        }

        if (env.previousVersions.length === 0) {
            throw new Error('No previous version available for rollback');
        }

        const previousVersion = env.previousVersions.pop();
        console.log(`Rolling back ${environment} to ${previousVersion}...`);

        const result = await this.performDeployment(env, { version: previousVersion });

        if (result.success) {
            env.currentVersion = previousVersion;
            this.deployments.push({
                environment,
                version: previousVersion,
                timestamp: new Date().toISOString(),
                status: 'rollback'
            });
            console.log(`✓ Rolled back to ${previousVersion}`);
        }

        return result;
    }

    /**
     * Gets deployment history for an environment
     * @param {string} environment - Environment name
     * @returns {Array} Deployment history
     */
    getHistory(environment) {
        return this.deployments.filter(d => d.environment === environment);
    }
}

/**
 * HealthChecker monitors deployment health post-deployment.
 * Validates that deployments are functioning correctly.
 */
class HealthChecker {
    constructor() {
        this.checks = [];
        this.thresholds = {
            errorRate: 0.01,      // Max 1% error rate
            responseTime: 500,    // Max 500ms p99
            availability: 0.999   // Min 99.9% availability
        };
    }

    /**
     * Adds a health check
     * @param {Object} check - Health check configuration
     */
    addCheck(check) {
        this.checks.push({
            name: check.name,
            endpoint: check.endpoint,
            interval: check.interval || 30000,
            timeout: check.timeout || 5000,
            expectedStatus: check.expectedStatus || 200
        });
    }

    /**
     * Runs all health checks
     * @returns {Promise<Object>} Health check results
     */
    async runChecks() {
        console.log('\nRunning health checks...');
        const results = [];

        for (const check of this.checks) {
            const result = await this.executeCheck(check);
            results.push(result);
            console.log(`  ${result.healthy ? '✓' : '✗'} ${check.name}`);
        }

        const healthy = results.every(r => r.healthy);
        return {
            healthy,
            timestamp: new Date().toISOString(),
            checks: results
        };
    }

    /**
     * Executes a single health check (simulated)
     * @param {Object} check - Check configuration
     * @returns {Promise<Object>} Check result
     */
    async executeCheck(check) {
        // Simulated health check
        return {
            name: check.name,
            endpoint: check.endpoint,
            healthy: true,
            responseTime: Math.random() * 200,
            statusCode: 200
        };
    }

    /**
     * Validates metrics against thresholds
     * @param {Object} metrics - Current metrics
     * @returns {Object} Validation result
     */
    validateMetrics(metrics) {
        const checks = {
            errorRate: metrics.errorRate <= this.thresholds.errorRate,
            responseTime: metrics.responseTime <= this.thresholds.responseTime,
            availability: metrics.availability >= this.thresholds.availability
        };

        console.log('\nMetrics Validation:');
        Object.entries(checks).forEach(([metric, passed]) => {
            console.log(`  ${passed ? '✓' : '✗'} ${metric}: ${metrics[metric]}`);
        });

        return {
            healthy: Object.values(checks).every(v => v),
            checks
        };
    }
}

/**
 * DeploymentNotifier sends notifications about deployment events.
 * Integrates with various notification channels.
 */
class DeploymentNotifier {
    constructor() {
        this.channels = [];
    }

    /**
     * Adds a notification channel
     * @param {string} type - Channel type (slack, email, etc.)
     * @param {Object} config - Channel configuration
     */
    addChannel(type, config) {
        this.channels.push({ type, config });
    }

    /**
     * Sends deployment notification
     * @param {Object} event - Deployment event
     */
    async notify(event) {
        console.log(`\nSending notifications for: ${event.type}`);

        for (const channel of this.channels) {
            console.log(`  Notifying via ${channel.type}...`);
            // Simulated notification
        }
    }

    /**
     * Creates notification message
     * @param {Object} event - Deployment event
     * @returns {string} Notification message
     */
    formatMessage(event) {
        switch (event.type) {
            case 'deployment_started':
                return `Deployment started: ${event.version} to ${event.environment}`;
            case 'deployment_completed':
                return `Deployment completed: ${event.version} is live on ${event.environment}`;
            case 'deployment_failed':
                return `Deployment failed: ${event.version} failed on ${event.environment}`;
            case 'rollback':
                return `Rollback executed: ${event.environment} rolled back to ${event.version}`;
            default:
                return `Deployment event: ${JSON.stringify(event)}`;
        }
    }
}

// Demonstration
console.log('=== Continuous Deployment Demo ===\n');

// Create deployment pipeline
const pipeline = new DeploymentPipeline('Production Deploy');

// Build stage
const buildStage = new PipelineStage('Build');
buildStage.addAction(async () => {
    console.log('    Compiling application...');
}, 'Compile application');
buildStage.addAction(async () => {
    console.log('    Creating artifacts...');
}, 'Create artifacts');

// Test stage
const testStage = new PipelineStage('Test', { retries: 1 });
testStage.addAction(async () => {
    console.log('    Running unit tests...');
}, 'Run unit tests');
testStage.addAction(async () => {
    console.log('    Running integration tests...');
}, 'Run integration tests');

// Deploy stage
const deployStage = new PipelineStage('Deploy');
deployStage.addAction(async () => {
    console.log('    Deploying to production...');
}, 'Deploy to production');

// Verify stage
const verifyStage = new PipelineStage('Verify');
verifyStage.addAction(async () => {
    console.log('    Running smoke tests...');
}, 'Run smoke tests');
verifyStage.addAction(async () => {
    console.log('    Checking health endpoints...');
}, 'Health checks');

pipeline.addStage(buildStage);
pipeline.addStage(testStage);
pipeline.addStage(deployStage);
pipeline.addStage(verifyStage);

// Execute pipeline
const deployment = {
    commit: 'abc123',
    version: '1.2.3',
    author: 'developer@example.com'
};

pipeline.execute(deployment).then(result => {
    console.log(`\nPipeline Result: ${result.status}`);
    console.log(`Duration: ${result.duration}ms`);
});

// Deployment manager demo
console.log('\n--- Deployment Manager ---');
const deployManager = new DeploymentManager();
deployManager.registerEnvironment('production', {
    url: 'https://app.example.com',
    region: 'us-east-1'
});

// Health checker demo
console.log('\n--- Health Checker ---');
const healthChecker = new HealthChecker();
healthChecker.addCheck({
    name: 'API Health',
    endpoint: '/health'
});
healthChecker.addCheck({
    name: 'Database Connection',
    endpoint: '/health/db'
});

healthChecker.runChecks().then(results => {
    console.log(`Overall Health: ${results.healthy ? 'HEALTHY' : 'UNHEALTHY'}`);
});

healthChecker.validateMetrics({
    errorRate: 0.005,
    responseTime: 150,
    availability: 0.9995
});

/**
 * Best Practices for Continuous Deployment:
 *
 * 1. Maintain comprehensive automated test suites
 * 2. Implement feature flags for gradual rollouts
 * 3. Use blue-green or canary deployment strategies
 * 4. Monitor deployments with real-time metrics
 * 5. Automate rollbacks when health checks fail
 * 6. Keep deployments small and frequent
 * 7. Maintain deployment audit logs
 * 8. Notify relevant teams of deployment events
 * 9. Test deployment pipelines in staging environments
 * 10. Document deployment procedures and runbooks
 */
