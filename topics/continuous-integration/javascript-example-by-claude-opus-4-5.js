/**
 * Continuous Integration (CI) - Automated Build and Test
 *
 * Continuous Integration is a software development practice that involves
 * frequently integrating code changes into a shared repository, often multiple
 * times per day. Each integration triggers automated builds and tests to
 * identify issues early in the development cycle.
 *
 * Key Concepts:
 * - Automated builds
 * - Automated testing
 * - Fast feedback loops
 * - Version control integration
 * - Build pipelines
 * - Quality gates
 */

// Example 1: CI Pipeline Simulator
class CIPipeline {
  constructor(name) {
    this.name = name;
    this.stages = [];
    this.triggers = [];
    this.environment = {};
    this.artifacts = [];
    this.status = 'pending';
    this.runHistory = [];
  }

  /**
   * Add a stage to the pipeline
   * @param {object} stage - Stage configuration
   */
  addStage(stage) {
    this.stages.push({
      name: stage.name,
      jobs: stage.jobs || [],
      dependsOn: stage.dependsOn || [],
      condition: stage.condition || 'always',
      timeout: stage.timeout || 30 * 60 * 1000, // 30 minutes default
      allowFailure: stage.allowFailure || false
    });
  }

  /**
   * Add a trigger for the pipeline
   * @param {object} trigger - Trigger configuration
   */
  addTrigger(trigger) {
    this.triggers.push({
      type: trigger.type, // 'push', 'pull_request', 'schedule', 'manual'
      branches: trigger.branches || ['*'],
      paths: trigger.paths || ['*'],
      schedule: trigger.schedule || null
    });
  }

  /**
   * Set environment variables
   * @param {object} env - Environment variables
   */
  setEnvironment(env) {
    this.environment = { ...this.environment, ...env };
  }

  /**
   * Run the pipeline
   * @param {object} context - Run context
   * @returns {object} - Pipeline run result
   */
  async run(context = {}) {
    const runId = `run-${Date.now()}`;
    const runResult = {
      id: runId,
      pipeline: this.name,
      trigger: context.trigger || 'manual',
      commit: context.commit || 'unknown',
      branch: context.branch || 'main',
      startTime: new Date(),
      endTime: null,
      status: 'running',
      stages: [],
      duration: 0,
      artifacts: []
    };

    console.log(`\n=== Starting Pipeline: ${this.name} ===`);
    console.log(`Run ID: ${runId}`);
    console.log(`Trigger: ${runResult.trigger}`);
    console.log(`Branch: ${runResult.branch}\n`);

    try {
      for (const stage of this.stages) {
        // Check dependencies
        const canRun = this.checkDependencies(stage, runResult.stages);
        if (!canRun) {
          runResult.stages.push({
            name: stage.name,
            status: 'skipped',
            reason: 'Dependencies not met'
          });
          continue;
        }

        // Run stage
        const stageResult = await this.runStage(stage, context);
        runResult.stages.push(stageResult);

        // Check if we should continue
        if (stageResult.status === 'failed' && !stage.allowFailure) {
          runResult.status = 'failed';
          break;
        }
      }

      if (runResult.status === 'running') {
        runResult.status = 'success';
      }
    } catch (error) {
      runResult.status = 'failed';
      runResult.error = error.message;
    }

    runResult.endTime = new Date();
    runResult.duration = runResult.endTime - runResult.startTime;

    this.runHistory.push(runResult);

    console.log(`\n=== Pipeline ${runResult.status.toUpperCase()} ===`);
    console.log(`Duration: ${(runResult.duration / 1000).toFixed(2)}s\n`);

    return runResult;
  }

  /**
   * Check if stage dependencies are met
   * @param {object} stage - Stage to check
   * @param {Array} completedStages - Completed stages
   * @returns {boolean}
   */
  checkDependencies(stage, completedStages) {
    if (stage.dependsOn.length === 0) return true;

    return stage.dependsOn.every(dep =>
      completedStages.some(s => s.name === dep && s.status === 'success')
    );
  }

  /**
   * Run a single stage
   * @param {object} stage - Stage configuration
   * @param {object} context - Run context
   * @returns {object}
   */
  async runStage(stage, context) {
    console.log(`--- Stage: ${stage.name} ---`);
    const stageResult = {
      name: stage.name,
      startTime: new Date(),
      jobs: [],
      status: 'running'
    };

    try {
      for (const job of stage.jobs) {
        const jobResult = await this.runJob(job, context);
        stageResult.jobs.push(jobResult);

        if (jobResult.status === 'failed') {
          stageResult.status = 'failed';
          if (!stage.allowFailure) break;
        }
      }

      if (stageResult.status === 'running') {
        stageResult.status = 'success';
      }
    } catch (error) {
      stageResult.status = 'failed';
      stageResult.error = error.message;
    }

    stageResult.endTime = new Date();
    stageResult.duration = stageResult.endTime - stageResult.startTime;

    console.log(`Stage ${stage.name}: ${stageResult.status.toUpperCase()}\n`);

    return stageResult;
  }

  /**
   * Run a single job
   * @param {object} job - Job configuration
   * @param {object} context - Run context
   * @returns {object}
   */
  async runJob(job, context) {
    console.log(`  Job: ${job.name}`);
    const jobResult = {
      name: job.name,
      startTime: new Date(),
      steps: [],
      status: 'running'
    };

    try {
      for (const step of job.steps || []) {
        const stepResult = await this.runStep(step, context);
        jobResult.steps.push(stepResult);

        if (stepResult.status === 'failed') {
          jobResult.status = 'failed';
          break;
        }
      }

      if (jobResult.status === 'running') {
        jobResult.status = 'success';
      }
    } catch (error) {
      jobResult.status = 'failed';
      jobResult.error = error.message;
    }

    jobResult.endTime = new Date();
    jobResult.duration = jobResult.endTime - jobResult.startTime;

    console.log(`    Result: ${jobResult.status}`);

    return jobResult;
  }

  /**
   * Run a single step
   * @param {object} step - Step configuration
   * @param {object} context - Run context
   * @returns {object}
   */
  async runStep(step, context) {
    // Simulate step execution
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

    const success = step.simulateFail ? false : Math.random() > 0.1;

    return {
      name: step.name,
      command: step.run,
      status: success ? 'success' : 'failed',
      output: success ? 'Step completed successfully' : 'Step failed',
      duration: Math.floor(100 + Math.random() * 200)
    };
  }
}

// Example 2: Build Configuration Generator
class BuildConfigGenerator {
  /**
   * Generate GitHub Actions workflow
   * @param {object} config - Build configuration
   * @returns {string}
   */
  static generateGitHubActions(config) {
    const workflow = {
      name: config.name || 'CI',
      on: {
        push: { branches: config.branches || ['main'] },
        pull_request: { branches: config.branches || ['main'] }
      },
      jobs: {}
    };

    // Build job
    if (config.build) {
      workflow.jobs.build = {
        'runs-on': config.runner || 'ubuntu-latest',
        steps: [
          { uses: 'actions/checkout@v4' },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v4',
            with: { 'node-version': config.nodeVersion || '20' }
          },
          { name: 'Install dependencies', run: config.install || 'npm ci' },
          { name: 'Build', run: config.build }
        ]
      };
    }

    // Test job
    if (config.test) {
      workflow.jobs.test = {
        'runs-on': config.runner || 'ubuntu-latest',
        needs: config.build ? 'build' : undefined,
        steps: [
          { uses: 'actions/checkout@v4' },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v4',
            with: { 'node-version': config.nodeVersion || '20' }
          },
          { name: 'Install dependencies', run: config.install || 'npm ci' },
          { name: 'Run tests', run: config.test }
        ]
      };

      if (config.coverage) {
        workflow.jobs.test.steps.push({
          name: 'Upload coverage',
          uses: 'codecov/codecov-action@v3'
        });
      }
    }

    // Convert to YAML-like string (simplified)
    return this.toYAML(workflow);
  }

  /**
   * Generate GitLab CI configuration
   * @param {object} config - Build configuration
   * @returns {string}
   */
  static generateGitLabCI(config) {
    let yaml = `stages:\n`;

    const stages = [];
    if (config.build) stages.push('build');
    if (config.test) stages.push('test');
    if (config.deploy) stages.push('deploy');

    stages.forEach(s => yaml += `  - ${s}\n`);

    yaml += `\nvariables:\n`;
    yaml += `  NODE_VERSION: "${config.nodeVersion || '20'}"\n`;

    if (config.build) {
      yaml += `\nbuild:\n`;
      yaml += `  stage: build\n`;
      yaml += `  script:\n`;
      yaml += `    - ${config.install || 'npm ci'}\n`;
      yaml += `    - ${config.build}\n`;
    }

    if (config.test) {
      yaml += `\ntest:\n`;
      yaml += `  stage: test\n`;
      yaml += `  script:\n`;
      yaml += `    - ${config.install || 'npm ci'}\n`;
      yaml += `    - ${config.test}\n`;
      if (config.coverage) {
        yaml += `  coverage: '/Coverage: \\d+\\.\\d+%/'\n`;
      }
    }

    return yaml;
  }

  /**
   * Convert object to YAML-like string
   * @param {object} obj - Object to convert
   * @param {number} indent - Current indentation
   * @returns {string}
   */
  static toYAML(obj, indent = 0) {
    let result = '';
    const spaces = '  '.repeat(indent);

    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined) continue;

      if (Array.isArray(value)) {
        result += `${spaces}${key}:\n`;
        value.forEach(item => {
          if (typeof item === 'object') {
            result += `${spaces}  -\n`;
            result += this.toYAML(item, indent + 2);
          } else {
            result += `${spaces}  - ${item}\n`;
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        result += `${spaces}${key}:\n`;
        result += this.toYAML(value, indent + 1);
      } else {
        result += `${spaces}${key}: ${value}\n`;
      }
    }

    return result;
  }
}

// Example 3: Build Status Monitor
class BuildStatusMonitor {
  constructor() {
    this.builds = [];
    this.webhooks = [];
  }

  /**
   * Record a build result
   * @param {object} build - Build information
   */
  recordBuild(build) {
    this.builds.push({
      id: build.id,
      pipeline: build.pipeline,
      branch: build.branch,
      commit: build.commit,
      status: build.status,
      duration: build.duration,
      timestamp: new Date(),
      triggeredBy: build.triggeredBy || 'system'
    });

    // Notify webhooks
    this.notifyWebhooks(build);
  }

  /**
   * Register a webhook
   * @param {object} webhook - Webhook configuration
   */
  registerWebhook(webhook) {
    this.webhooks.push({
      url: webhook.url,
      events: webhook.events || ['success', 'failure'],
      active: true
    });
  }

  /**
   * Notify webhooks of build status
   * @param {object} build - Build information
   */
  notifyWebhooks(build) {
    this.webhooks
      .filter(w => w.active && w.events.includes(build.status))
      .forEach(webhook => {
        console.log(`Notifying webhook: ${webhook.url} - Build ${build.status}`);
        // In real implementation, would make HTTP POST request
      });
  }

  /**
   * Get build statistics
   * @param {object} filters - Optional filters
   * @returns {object}
   */
  getStatistics(filters = {}) {
    let builds = this.builds;

    if (filters.branch) {
      builds = builds.filter(b => b.branch === filters.branch);
    }
    if (filters.pipeline) {
      builds = builds.filter(b => b.pipeline === filters.pipeline);
    }
    if (filters.since) {
      builds = builds.filter(b => b.timestamp >= filters.since);
    }

    const total = builds.length;
    const successful = builds.filter(b => b.status === 'success').length;
    const failed = builds.filter(b => b.status === 'failed').length;
    const durations = builds.map(b => b.duration).filter(d => d > 0);

    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? ((successful / total) * 100).toFixed(2) + '%' : '0%',
      avgDuration: durations.length > 0
        ? (durations.reduce((a, b) => a + b, 0) / durations.length / 1000).toFixed(2) + 's'
        : 'N/A',
      recentBuilds: builds.slice(-5).reverse()
    };
  }

  /**
   * Get build health score
   * @returns {object}
   */
  getBuildHealth() {
    const recent = this.builds.slice(-20);
    const successRate = recent.filter(b => b.status === 'success').length / recent.length;

    let health;
    if (successRate >= 0.9) health = 'healthy';
    else if (successRate >= 0.7) health = 'unstable';
    else health = 'failing';

    return {
      health,
      successRate: (successRate * 100).toFixed(1) + '%',
      recentBuilds: recent.length,
      recommendation: health === 'failing'
        ? 'Investigate failing builds immediately'
        : health === 'unstable'
        ? 'Review recent failures to improve stability'
        : 'Build pipeline is healthy'
    };
  }
}

// Example 4: Quality Gate Checker
class QualityGateChecker {
  constructor() {
    this.gates = [];
  }

  /**
   * Add a quality gate
   * @param {object} gate - Gate configuration
   */
  addGate(gate) {
    this.gates.push({
      name: gate.name,
      metric: gate.metric,
      operator: gate.operator, // 'gt', 'gte', 'lt', 'lte', 'eq'
      threshold: gate.threshold,
      required: gate.required !== false
    });
  }

  /**
   * Check all gates against metrics
   * @param {object} metrics - Build metrics
   * @returns {object}
   */
  check(metrics) {
    const results = this.gates.map(gate => {
      const actual = metrics[gate.metric];
      const passed = this.evaluateGate(gate, actual);

      return {
        gate: gate.name,
        metric: gate.metric,
        threshold: gate.threshold,
        actual,
        passed,
        required: gate.required
      };
    });

    const requiredFailed = results.filter(r => r.required && !r.passed);
    const overallPassed = requiredFailed.length === 0;

    return {
      passed: overallPassed,
      results,
      summary: {
        total: results.length,
        passed: results.filter(r => r.passed).length,
        failed: results.filter(r => !r.passed).length
      },
      blockers: requiredFailed.map(r => r.gate)
    };
  }

  /**
   * Evaluate a single gate
   * @param {object} gate - Gate configuration
   * @param {number} actual - Actual value
   * @returns {boolean}
   */
  evaluateGate(gate, actual) {
    if (actual === undefined) return false;

    switch (gate.operator) {
      case 'gt': return actual > gate.threshold;
      case 'gte': return actual >= gate.threshold;
      case 'lt': return actual < gate.threshold;
      case 'lte': return actual <= gate.threshold;
      case 'eq': return actual === gate.threshold;
      default: return false;
    }
  }
}

// Demonstration
console.log('=== Continuous Integration Examples ===\n');

// Create CI pipeline
const pipeline = new CIPipeline('Main CI');

pipeline.addTrigger({
  type: 'push',
  branches: ['main', 'develop']
});

pipeline.addStage({
  name: 'build',
  jobs: [{
    name: 'compile',
    steps: [
      { name: 'Checkout', run: 'git checkout' },
      { name: 'Install deps', run: 'npm ci' },
      { name: 'Build', run: 'npm run build' }
    ]
  }]
});

pipeline.addStage({
  name: 'test',
  dependsOn: ['build'],
  jobs: [{
    name: 'unit-tests',
    steps: [
      { name: 'Run unit tests', run: 'npm test' },
      { name: 'Coverage report', run: 'npm run coverage' }
    ]
  }]
});

pipeline.addStage({
  name: 'lint',
  dependsOn: ['build'],
  jobs: [{
    name: 'lint-check',
    steps: [
      { name: 'ESLint', run: 'npm run lint' }
    ]
  }],
  allowFailure: true
});

// Run the pipeline
pipeline.run({
  trigger: 'push',
  branch: 'main',
  commit: 'abc123'
}).then(result => {
  console.log('--- Pipeline Summary ---');
  console.log(`Status: ${result.status}`);
  console.log(`Duration: ${(result.duration / 1000).toFixed(2)}s`);
  console.log('Stages:');
  result.stages.forEach(s => {
    console.log(`  ${s.name}: ${s.status}`);
  });
});

// Quality gates
console.log('\n--- Quality Gates ---\n');
const gateChecker = new QualityGateChecker();

gateChecker.addGate({ name: 'Coverage', metric: 'coverage', operator: 'gte', threshold: 80 });
gateChecker.addGate({ name: 'Bugs', metric: 'bugs', operator: 'eq', threshold: 0 });
gateChecker.addGate({ name: 'Duplications', metric: 'duplications', operator: 'lte', threshold: 3 });

const gateResult = gateChecker.check({
  coverage: 85,
  bugs: 0,
  duplications: 2
});

console.log(`Quality Gate: ${gateResult.passed ? 'PASSED' : 'FAILED'}`);
gateResult.results.forEach(r => {
  const status = r.passed ? '✓' : '✗';
  console.log(`  ${status} ${r.gate}: ${r.actual} ${r.passed ? 'meets' : 'fails'} threshold ${r.threshold}`);
});

/**
 * CI Best Practices:
 *
 * 1. Commit frequently - small, incremental changes
 *
 * 2. Fix broken builds immediately - top priority
 *
 * 3. Keep builds fast - aim for under 10 minutes
 *
 * 4. Test in a production-like environment
 *
 * 5. Make build results visible to the team
 *
 * 6. Automate everything that can be automated
 *
 * 7. Use quality gates to enforce standards
 *
 * 8. Cache dependencies for faster builds
 *
 * 9. Run tests in parallel when possible
 *
 * 10. Monitor build health trends over time
 */
