/**
 * Continuous Delivery (CD) - Automated Software Release
 *
 * Continuous Delivery is a software development approach that automates the
 * entire software release process. It involves continuous integration, testing,
 * and deployment to ensure changes are released in a timely, predictable, and
 * reliable manner. The goal is to make releases routine and low-risk.
 *
 * Key Concepts:
 * - Deployment pipeline
 * - Automated testing gates
 * - Environment promotion
 * - Release candidates
 * - Feature flags
 */

// Example 1: CD Pipeline Manager
class CDPipeline {
  constructor(name) {
    this.name = name;
    this.stages = [];
    this.artifacts = new Map();
    this.deployments = [];
    this.config = {
      autoPromote: false,
      requireApproval: true,
      rollbackOnFailure: true
    };
  }

  /**
   * Define pipeline stages
   * @param {Array} stages - Stage definitions
   */
  defineStages(stages) {
    this.stages = stages.map((stage, index) => ({
      name: stage.name,
      type: stage.type, // 'build', 'test', 'deploy', 'approval'
      environment: stage.environment,
      order: index,
      gates: stage.gates || [],
      actions: stage.actions || [],
      timeout: stage.timeout || 30 * 60 * 1000, // 30 min default
      status: 'pending'
    }));
  }

  /**
   * Create a release candidate
   * @param {object} build - Build information
   * @returns {object}
   */
  createReleaseCandidate(build) {
    const rc = {
      id: `RC-${Date.now()}`,
      version: build.version,
      commit: build.commit,
      branch: build.branch,
      createdAt: new Date(),
      artifacts: build.artifacts || [],
      status: 'candidate',
      promotions: [],
      testResults: [],
      approvals: []
    };

    this.artifacts.set(rc.id, rc);
    return rc;
  }

  /**
   * Run the pipeline for a release candidate
   * @param {string} rcId - Release candidate ID
   * @returns {object}
   */
  async run(rcId) {
    const rc = this.artifacts.get(rcId);
    if (!rc) {
      return { success: false, error: 'Release candidate not found' };
    }

    console.log(`\n=== Running CD Pipeline: ${this.name} ===`);
    console.log(`Release Candidate: ${rc.id} (v${rc.version})\n`);

    const result = {
      rcId,
      startTime: new Date(),
      stages: [],
      status: 'running'
    };

    for (const stage of this.stages) {
      const stageResult = await this.runStage(stage, rc);
      result.stages.push(stageResult);

      if (!stageResult.passed) {
        result.status = 'failed';
        result.failedAt = stage.name;

        if (this.config.rollbackOnFailure && stage.type === 'deploy') {
          await this.rollback(rc, stage.environment);
        }
        break;
      }
    }

    if (result.status === 'running') {
      result.status = 'success';
      rc.status = 'released';
    }

    result.endTime = new Date();
    result.duration = result.endTime - result.startTime;

    return result;
  }

  /**
   * Run a single stage
   * @param {object} stage - Stage to run
   * @param {object} rc - Release candidate
   * @returns {object}
   */
  async runStage(stage, rc) {
    console.log(`--- Stage: ${stage.name} (${stage.type}) ---`);

    const stageResult = {
      name: stage.name,
      type: stage.type,
      environment: stage.environment,
      startTime: new Date(),
      gates: [],
      passed: true
    };

    // Check gates
    for (const gate of stage.gates) {
      const gateResult = await this.checkGate(gate, rc);
      stageResult.gates.push(gateResult);

      if (!gateResult.passed) {
        stageResult.passed = false;
        console.log(`  ❌ Gate failed: ${gate.name}`);
        break;
      }
      console.log(`  ✓ Gate passed: ${gate.name}`);
    }

    // Handle approval stages
    if (stage.type === 'approval' && stageResult.passed) {
      if (this.config.requireApproval) {
        stageResult.awaitingApproval = true;
        console.log(`  ⏳ Awaiting approval for ${stage.environment}`);
        // In real implementation, would pause and wait for approval
        stageResult.approved = true; // Simulated approval
      }
    }

    // Execute deployment
    if (stage.type === 'deploy' && stageResult.passed) {
      const deployResult = await this.deploy(rc, stage.environment);
      stageResult.deployment = deployResult;
      stageResult.passed = deployResult.success;

      if (deployResult.success) {
        rc.promotions.push({
          environment: stage.environment,
          timestamp: new Date(),
          version: rc.version
        });
      }
    }

    stageResult.endTime = new Date();
    stageResult.duration = stageResult.endTime - stageResult.startTime;

    console.log(`  Result: ${stageResult.passed ? 'PASSED' : 'FAILED'}\n`);

    return stageResult;
  }

  /**
   * Check a quality gate
   * @param {object} gate - Gate to check
   * @param {object} rc - Release candidate
   * @returns {object}
   */
  async checkGate(gate, rc) {
    // Simulate gate checks
    await new Promise(resolve => setTimeout(resolve, 100));

    const result = {
      name: gate.name,
      type: gate.type,
      threshold: gate.threshold,
      actual: null,
      passed: false
    };

    switch (gate.type) {
      case 'test_coverage':
        result.actual = 85; // Simulated
        result.passed = result.actual >= gate.threshold;
        break;

      case 'test_pass_rate':
        result.actual = 100; // Simulated
        result.passed = result.actual >= gate.threshold;
        break;

      case 'security_scan':
        result.actual = 0; // Critical vulnerabilities
        result.passed = result.actual <= gate.threshold;
        break;

      case 'performance':
        result.actual = 150; // Response time ms
        result.passed = result.actual <= gate.threshold;
        break;

      default:
        result.passed = true;
    }

    return result;
  }

  /**
   * Deploy to environment
   * @param {object} rc - Release candidate
   * @param {string} environment - Target environment
   * @returns {object}
   */
  async deploy(rc, environment) {
    console.log(`  Deploying ${rc.version} to ${environment}...`);

    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 200));

    const deployment = {
      id: `DEP-${Date.now()}`,
      rcId: rc.id,
      version: rc.version,
      environment,
      timestamp: new Date(),
      success: Math.random() > 0.1, // 90% success rate simulation
      duration: Math.floor(200 + Math.random() * 100)
    };

    this.deployments.push(deployment);

    console.log(`  Deployment ${deployment.success ? 'succeeded' : 'failed'}`);

    return deployment;
  }

  /**
   * Rollback deployment
   * @param {object} rc - Release candidate
   * @param {string} environment - Environment to rollback
   * @returns {object}
   */
  async rollback(rc, environment) {
    console.log(`  ⚠️  Rolling back ${environment}...`);

    // Find previous successful deployment
    const previousDeployment = this.deployments
      .filter(d => d.environment === environment && d.success && d.rcId !== rc.id)
      .pop();

    if (!previousDeployment) {
      console.log(`  No previous deployment to rollback to`);
      return { success: false, reason: 'No previous deployment' };
    }

    // Simulate rollback
    await new Promise(resolve => setTimeout(resolve, 150));

    console.log(`  Rolled back to version ${previousDeployment.version}`);

    return {
      success: true,
      rolledBackTo: previousDeployment.version,
      timestamp: new Date()
    };
  }
}

// Example 2: Environment Manager
class EnvironmentManager {
  constructor() {
    this.environments = new Map();
  }

  /**
   * Define an environment
   * @param {object} env - Environment configuration
   */
  defineEnvironment(env) {
    this.environments.set(env.name, {
      name: env.name,
      type: env.type, // 'development', 'staging', 'production'
      url: env.url,
      currentVersion: null,
      deploymentHistory: [],
      healthChecks: env.healthChecks || [],
      config: env.config || {}
    });
  }

  /**
   * Update environment version
   * @param {string} envName - Environment name
   * @param {string} version - New version
   */
  updateVersion(envName, version) {
    const env = this.environments.get(envName);
    if (env) {
      const previousVersion = env.currentVersion;
      env.currentVersion = version;
      env.deploymentHistory.push({
        version,
        previousVersion,
        timestamp: new Date()
      });
    }
  }

  /**
   * Check environment health
   * @param {string} envName - Environment name
   * @returns {object}
   */
  async checkHealth(envName) {
    const env = this.environments.get(envName);
    if (!env) return { healthy: false, error: 'Environment not found' };

    const results = [];

    for (const check of env.healthChecks) {
      // Simulate health check
      await new Promise(resolve => setTimeout(resolve, 50));

      results.push({
        name: check.name,
        endpoint: check.endpoint,
        status: Math.random() > 0.05 ? 'healthy' : 'unhealthy',
        responseTime: Math.floor(50 + Math.random() * 100)
      });
    }

    const allHealthy = results.every(r => r.status === 'healthy');

    return {
      environment: envName,
      healthy: allHealthy,
      currentVersion: env.currentVersion,
      checks: results,
      timestamp: new Date()
    };
  }

  /**
   * Get promotion path
   * @returns {Array}
   */
  getPromotionPath() {
    const envList = Array.from(this.environments.values());
    const order = { development: 0, staging: 1, production: 2 };

    return envList
      .sort((a, b) => order[a.type] - order[b.type])
      .map(env => ({
        name: env.name,
        type: env.type,
        currentVersion: env.currentVersion
      }));
  }
}

// Example 3: Feature Flag Manager
class FeatureFlagManager {
  constructor() {
    this.flags = new Map();
  }

  /**
   * Define a feature flag
   * @param {object} flag - Flag configuration
   */
  defineFlag(flag) {
    this.flags.set(flag.name, {
      name: flag.name,
      description: flag.description,
      enabled: flag.enabled || false,
      environments: flag.environments || {},
      percentage: flag.percentage || 100,
      userGroups: flag.userGroups || [],
      createdAt: new Date()
    });
  }

  /**
   * Check if flag is enabled for context
   * @param {string} flagName - Flag name
   * @param {object} context - Evaluation context
   * @returns {boolean}
   */
  isEnabled(flagName, context = {}) {
    const flag = this.flags.get(flagName);
    if (!flag) return false;

    // Check if globally disabled
    if (!flag.enabled) return false;

    // Check environment-specific settings
    if (context.environment && flag.environments[context.environment] !== undefined) {
      if (!flag.environments[context.environment]) return false;
    }

    // Check user group
    if (context.userGroup && flag.userGroups.length > 0) {
      if (!flag.userGroups.includes(context.userGroup)) return false;
    }

    // Check percentage rollout
    if (flag.percentage < 100 && context.userId) {
      const hash = this.hashUserId(context.userId);
      if (hash > flag.percentage) return false;
    }

    return true;
  }

  /**
   * Hash user ID to number 0-100
   * @param {string} userId - User ID
   * @returns {number}
   */
  hashUserId(userId) {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = ((hash << 5) - hash) + userId.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % 100;
  }

  /**
   * Get all flags for environment
   * @param {string} environment - Environment name
   * @returns {Array}
   */
  getFlagsForEnvironment(environment) {
    return Array.from(this.flags.values())
      .map(flag => ({
        name: flag.name,
        enabled: this.isEnabled(flag.name, { environment }),
        percentage: flag.percentage
      }));
  }
}

// Example 4: Release Notes Generator
class ReleaseNotesGenerator {
  /**
   * Generate release notes from commits
   * @param {Array} commits - Commits since last release
   * @param {string} version - New version
   * @returns {string}
   */
  static generate(commits, version) {
    const categorized = this.categorizeCommits(commits);

    let notes = `# Release ${version}\n\n`;
    notes += `Released: ${new Date().toISOString().split('T')[0]}\n\n`;

    if (categorized.features.length > 0) {
      notes += `## ✨ New Features\n\n`;
      categorized.features.forEach(c => {
        notes += `- ${c.description}\n`;
      });
      notes += '\n';
    }

    if (categorized.fixes.length > 0) {
      notes += `## 🐛 Bug Fixes\n\n`;
      categorized.fixes.forEach(c => {
        notes += `- ${c.description}\n`;
      });
      notes += '\n';
    }

    if (categorized.improvements.length > 0) {
      notes += `## 🔧 Improvements\n\n`;
      categorized.improvements.forEach(c => {
        notes += `- ${c.description}\n`;
      });
      notes += '\n';
    }

    if (categorized.breaking.length > 0) {
      notes += `## ⚠️ Breaking Changes\n\n`;
      categorized.breaking.forEach(c => {
        notes += `- ${c.description}\n`;
      });
      notes += '\n';
    }

    return notes;
  }

  /**
   * Categorize commits by type
   * @param {Array} commits - Commits to categorize
   * @returns {object}
   */
  static categorizeCommits(commits) {
    const categories = {
      features: [],
      fixes: [],
      improvements: [],
      breaking: [],
      other: []
    };

    commits.forEach(commit => {
      const match = commit.message.match(/^(\w+)(?:\([^)]+\))?(!)?:\s*(.+)/);

      if (!match) {
        categories.other.push({ description: commit.message });
        return;
      }

      const [, type, breaking, description] = match;

      if (breaking) {
        categories.breaking.push({ description, type });
      }

      switch (type) {
        case 'feat':
          categories.features.push({ description });
          break;
        case 'fix':
          categories.fixes.push({ description });
          break;
        case 'perf':
        case 'refactor':
          categories.improvements.push({ description });
          break;
        default:
          categories.other.push({ description });
      }
    });

    return categories;
  }
}

// Demonstration
console.log('=== Continuous Delivery Examples ===\n');

// Create CD Pipeline
const pipeline = new CDPipeline('Main Application');

pipeline.defineStages([
  {
    name: 'Build',
    type: 'build',
    gates: [
      { name: 'Compilation', type: 'build_success' }
    ]
  },
  {
    name: 'Unit Tests',
    type: 'test',
    gates: [
      { name: 'Test Coverage', type: 'test_coverage', threshold: 80 },
      { name: 'Pass Rate', type: 'test_pass_rate', threshold: 100 }
    ]
  },
  {
    name: 'Security Scan',
    type: 'test',
    gates: [
      { name: 'Vulnerabilities', type: 'security_scan', threshold: 0 }
    ]
  },
  {
    name: 'Deploy to Staging',
    type: 'deploy',
    environment: 'staging',
    gates: []
  },
  {
    name: 'Integration Tests',
    type: 'test',
    gates: [
      { name: 'API Tests', type: 'test_pass_rate', threshold: 95 }
    ]
  },
  {
    name: 'Production Approval',
    type: 'approval',
    environment: 'production'
  },
  {
    name: 'Deploy to Production',
    type: 'deploy',
    environment: 'production',
    gates: [
      { name: 'Performance', type: 'performance', threshold: 200 }
    ]
  }
]);

// Create release candidate
const rc = pipeline.createReleaseCandidate({
  version: '2.5.0',
  commit: 'abc123',
  branch: 'main'
});

console.log(`Created Release Candidate: ${rc.id}`);

// Run pipeline
pipeline.run(rc.id).then(result => {
  console.log('\n=== Pipeline Result ===');
  console.log(`Status: ${result.status}`);
  console.log(`Duration: ${(result.duration / 1000).toFixed(2)}s`);
  console.log(`Stages completed: ${result.stages.length}`);
});

// Feature flags
console.log('\n--- Feature Flags ---\n');

const featureFlags = new FeatureFlagManager();

featureFlags.defineFlag({
  name: 'new_dashboard',
  description: 'New dashboard UI',
  enabled: true,
  environments: { development: true, staging: true, production: false },
  percentage: 100
});

featureFlags.defineFlag({
  name: 'dark_mode',
  description: 'Dark mode support',
  enabled: true,
  percentage: 50 // 50% rollout
});

console.log('Flag: new_dashboard');
console.log(`  Dev: ${featureFlags.isEnabled('new_dashboard', { environment: 'development' })}`);
console.log(`  Prod: ${featureFlags.isEnabled('new_dashboard', { environment: 'production' })}`);

// Release notes
console.log('\n--- Release Notes ---\n');

const commits = [
  { message: 'feat(auth): add SSO support' },
  { message: 'fix(api): resolve timeout issue' },
  { message: 'feat(ui): implement dark mode' },
  { message: 'perf(db): optimize query performance' },
  { message: 'fix(validation): correct email regex' },
  { message: 'refactor!: rename User model to Account' }
];

console.log(ReleaseNotesGenerator.generate(commits, '2.5.0'));

/**
 * Continuous Delivery Best Practices:
 *
 * 1. Automate everything - builds, tests, deployments
 *
 * 2. Build once, deploy many - same artifact to all environments
 *
 * 3. Use quality gates to prevent bad releases
 *
 * 4. Implement progressive delivery (canary, blue-green)
 *
 * 5. Make deployments routine and boring
 *
 * 6. Use feature flags for safe releases
 *
 * 7. Monitor everything in production
 *
 * 8. Practice rollback procedures
 *
 * 9. Keep environments as similar as possible
 *
 * 10. Document and communicate releases
 */
