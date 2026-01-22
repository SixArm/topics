/**
 * Trunk-Based Development (TBD) - Continuous Integration Practice
 *
 * Trunk-based development emphasizes continuous integration by keeping a single
 * codebase (trunk/mainline) always in a deployable state. Developers commit
 * frequently to the trunk, keeping changes small and focused. This approach
 * requires robust automated testing to maintain quality.
 *
 * Key Concepts:
 * - Single source of truth (trunk)
 * - Frequent small commits
 * - Continuous integration
 * - Feature flags for incomplete work
 */

/**
 * TBDPrinciples defines core trunk-based development principles.
 */
class TBDPrinciples {
    static principles = {
        singleTrunk: {
            name: 'Single Trunk',
            description: 'One main branch that all developers work from',
            practice: 'All commits go to main/trunk branch',
            benefit: 'No integration hell from long-lived branches'
        },
        frequentCommits: {
            name: 'Frequent Commits',
            description: 'Commit small changes multiple times per day',
            practice: 'Break work into small, complete units',
            benefit: 'Reduces merge conflicts and integration issues'
        },
        shortLivedBranches: {
            name: 'Short-Lived Branches',
            description: 'Branches last hours to a day, not weeks',
            practice: 'Create branch, make change, merge quickly',
            benefit: 'Minimizes divergence from trunk'
        },
        alwaysDeployable: {
            name: 'Always Deployable',
            description: 'Trunk is always in a working, deployable state',
            practice: 'Never commit broken code to trunk',
            benefit: 'Can deploy anytime with confidence'
        },
        featureFlags: {
            name: 'Feature Flags',
            description: 'Use flags to hide incomplete features',
            practice: 'Deploy code behind toggles before complete',
            benefit: 'Decouple deployment from release'
        }
    };

    /**
     * Gets all principles
     * @returns {Array} All principles
     */
    static getAllPrinciples() {
        return Object.entries(this.principles).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TBDTestingStrategy defines testing requirements for TBD.
 */
class TBDTestingStrategy {
    static levels = {
        preCommit: {
            name: 'Pre-Commit Testing',
            description: 'Tests run before code reaches trunk',
            tests: [
                'Unit tests (fast)',
                'Linting and static analysis',
                'Local integration tests'
            ],
            duration: '< 5 minutes',
            blocking: true
        },
        continuousIntegration: {
            name: 'CI Pipeline Testing',
            description: 'Tests run automatically on every commit',
            tests: [
                'Full unit test suite',
                'Integration tests',
                'Contract tests',
                'Security scans'
            ],
            duration: '< 15 minutes',
            blocking: true
        },
        continuousDelivery: {
            name: 'CD Pipeline Testing',
            description: 'Tests run before deployment',
            tests: [
                'End-to-end tests',
                'Performance tests',
                'Smoke tests'
            ],
            duration: '< 30 minutes',
            blocking: true
        },
        postDeployment: {
            name: 'Post-Deployment Testing',
            description: 'Tests run after deployment',
            tests: [
                'Production smoke tests',
                'Synthetic monitoring',
                'Canary analysis'
            ],
            duration: 'Ongoing',
            blocking: false
        }
    };

    /**
     * Gets testing level details
     * @param {string} level - Level name
     * @returns {Object} Level details
     */
    static getLevel(level) {
        return this.levels[level];
    }

    /**
     * Gets all testing levels
     * @returns {Array} All levels
     */
    static getAllLevels() {
        return Object.entries(this.levels).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * CommitValidator validates commits for TBD compliance.
 */
class CommitValidator {
    /**
     * Validates commit for TBD
     * @param {Object} commit - Commit details
     * @returns {Object} Validation result
     */
    static validate(commit) {
        const checks = [];

        // Check commit size
        const linesChanged = commit.additions + commit.deletions;
        checks.push({
            check: 'Small commit size',
            passed: linesChanged < 400,
            detail: `${linesChanged} lines changed`,
            recommendation: linesChanged >= 400
                ? 'Consider breaking into smaller commits'
                : 'Good commit size'
        });

        // Check for tests
        checks.push({
            check: 'Includes tests',
            passed: commit.includesTests,
            detail: commit.includesTests ? 'Tests included' : 'No tests',
            recommendation: !commit.includesTests
                ? 'Add tests for new/changed code'
                : 'Good test coverage'
        });

        // Check commit message
        const goodMessage = commit.message.length > 10 && commit.message.length < 100;
        checks.push({
            check: 'Good commit message',
            passed: goodMessage,
            detail: `Message length: ${commit.message.length}`,
            recommendation: 'Use clear, descriptive commit messages'
        });

        // Check for feature flag if incomplete
        if (commit.isIncomplete) {
            checks.push({
                check: 'Feature flag for incomplete work',
                passed: commit.hasFeatureFlag,
                detail: commit.hasFeatureFlag ? 'Behind feature flag' : 'No flag',
                recommendation: 'Use feature flags for incomplete features'
            });
        }

        const allPassed = checks.every(c => c.passed);

        return {
            valid: allPassed,
            checks,
            readyForTrunk: allPassed
        };
    }
}

/**
 * FeatureFlagManager manages feature flags for TBD.
 */
class FeatureFlagManager {
    constructor() {
        this.flags = new Map();
    }

    /**
     * Creates a feature flag
     * @param {string} name - Flag name
     * @param {Object} config - Flag configuration
     */
    createFlag(name, config = {}) {
        this.flags.set(name, {
            name,
            enabled: config.enabled || false,
            description: config.description || '',
            owner: config.owner,
            createdAt: new Date(),
            rolloutPercentage: config.rolloutPercentage || 0
        });
    }

    /**
     * Checks if flag is enabled
     * @param {string} name - Flag name
     * @param {Object} context - Evaluation context
     * @returns {boolean} Whether enabled
     */
    isEnabled(name, context = {}) {
        const flag = this.flags.get(name);
        if (!flag) return false;

        if (!flag.enabled) return false;

        // Check rollout percentage
        if (flag.rolloutPercentage < 100) {
            const userId = context.userId || Math.random();
            const bucket = typeof userId === 'string'
                ? userId.charCodeAt(0) % 100
                : Math.floor(userId * 100);
            return bucket < flag.rolloutPercentage;
        }

        return true;
    }

    /**
     * Enables a flag
     * @param {string} name - Flag name
     * @param {number} percentage - Rollout percentage
     */
    enable(name, percentage = 100) {
        const flag = this.flags.get(name);
        if (flag) {
            flag.enabled = true;
            flag.rolloutPercentage = percentage;
        }
    }

    /**
     * Disables a flag
     * @param {string} name - Flag name
     */
    disable(name) {
        const flag = this.flags.get(name);
        if (flag) {
            flag.enabled = false;
        }
    }

    /**
     * Gets all flags
     * @returns {Array} All flags
     */
    getAllFlags() {
        return Array.from(this.flags.values());
    }

    /**
     * Cleans up old flags
     * @param {number} daysOld - Days threshold
     * @returns {Array} Removed flags
     */
    cleanup(daysOld = 30) {
        const threshold = new Date();
        threshold.setDate(threshold.getDate() - daysOld);

        const toRemove = [];
        for (const [name, flag] of this.flags) {
            if (flag.createdAt < threshold && flag.rolloutPercentage === 100) {
                toRemove.push(name);
            }
        }

        toRemove.forEach(name => this.flags.delete(name));
        return toRemove;
    }
}

/**
 * TBDMetrics tracks trunk-based development metrics.
 */
class TBDMetrics {
    /**
     * Calculates commit frequency
     * @param {Array} commits - Commits with timestamps
     * @param {string} period - 'day', 'week', 'month'
     * @returns {Object} Frequency metrics
     */
    static commitFrequency(commits, period = 'day') {
        if (commits.length === 0) return { frequency: 0 };

        const periodMs = {
            day: 24 * 60 * 60 * 1000,
            week: 7 * 24 * 60 * 60 * 1000,
            month: 30 * 24 * 60 * 60 * 1000
        }[period];

        const oldest = Math.min(...commits.map(c => new Date(c.timestamp).getTime()));
        const newest = Math.max(...commits.map(c => new Date(c.timestamp).getTime()));
        const periods = Math.ceil((newest - oldest) / periodMs) || 1;

        return {
            totalCommits: commits.length,
            periods,
            frequency: (commits.length / periods).toFixed(2),
            period,
            assessment: commits.length / periods > 2
                ? 'Good - frequent commits'
                : 'Consider committing more frequently'
        };
    }

    /**
     * Measures branch lifespan
     * @param {Array} branches - Branch data
     * @returns {Object} Lifespan metrics
     */
    static branchLifespan(branches) {
        if (branches.length === 0) return { averageHours: 0 };

        const lifespans = branches.map(b => {
            const created = new Date(b.created);
            const merged = new Date(b.merged || Date.now());
            return (merged - created) / (1000 * 60 * 60); // hours
        });

        const avgHours = lifespans.reduce((a, b) => a + b, 0) / lifespans.length;

        return {
            averageHours: avgHours.toFixed(1),
            maxHours: Math.max(...lifespans).toFixed(1),
            minHours: Math.min(...lifespans).toFixed(1),
            assessment: avgHours < 24
                ? 'Good - short-lived branches'
                : avgHours < 72
                    ? 'Acceptable - consider shorter branches'
                    : 'Warning - branches too long-lived'
        };
    }

    /**
     * Calculates deployment frequency
     * @param {Array} deployments - Deployment timestamps
     * @param {number} days - Period in days
     * @returns {Object} Deployment metrics
     */
    static deploymentFrequency(deployments, days = 30) {
        const frequency = deployments.length / days;

        let level;
        if (frequency >= 1) level = 'Elite';
        else if (frequency >= 0.14) level = 'High'; // weekly
        else if (frequency >= 0.03) level = 'Medium'; // monthly
        else level = 'Low';

        return {
            deployments: deployments.length,
            period: days + ' days',
            frequency: frequency.toFixed(2) + ' per day',
            performanceLevel: level,
            target: 'Multiple deploys per day (Elite)'
        };
    }
}

/**
 * TBDComparison compares TBD with other branching strategies.
 */
class TBDComparison {
    static strategies = {
        trunkBased: {
            name: 'Trunk-Based Development',
            branches: 'Short-lived feature branches or none',
            mergeFrequency: 'Multiple times per day',
            integration: 'Continuous',
            bestFor: 'Teams with strong CI/CD and testing'
        },
        gitFlow: {
            name: 'Git Flow',
            branches: 'Long-lived develop, feature, release branches',
            mergeFrequency: 'End of feature/sprint',
            integration: 'Periodic',
            bestFor: 'Scheduled releases, multiple versions'
        },
        githubFlow: {
            name: 'GitHub Flow',
            branches: 'Feature branches, no develop branch',
            mergeFrequency: 'When feature complete',
            integration: 'Per feature',
            bestFor: 'Continuous deployment environments'
        }
    };

    /**
     * Gets comparison
     * @returns {Object} Strategy comparison
     */
    static getComparison() {
        return this.strategies;
    }
}

// Demonstration
console.log('=== Trunk-Based Development Demo ===\n');

// TBD principles
console.log('--- TBD Principles ---');
TBDPrinciples.getAllPrinciples().slice(0, 3).forEach(p => {
    console.log(`\n${p.name}: ${p.description}`);
    console.log(`  Benefit: ${p.benefit}`);
});

// Testing strategy
console.log('\n--- Testing Strategy for TBD ---');
TBDTestingStrategy.getAllLevels().forEach(level => {
    console.log(`\n${level.name} (${level.duration}):`);
    console.log(`  Tests: ${level.tests.slice(0, 2).join(', ')}`);
    console.log(`  Blocking: ${level.blocking}`);
});

// Commit validation
console.log('\n--- Commit Validation ---');
const commit = {
    message: 'Add user authentication endpoint',
    additions: 150,
    deletions: 20,
    includesTests: true,
    isIncomplete: false
};
console.log('Commit:', commit.message);
console.log('Validation:', CommitValidator.validate(commit));

// Feature flags
console.log('\n--- Feature Flags ---');
const flagManager = new FeatureFlagManager();
flagManager.createFlag('new-checkout', {
    description: 'New checkout flow',
    enabled: true,
    rolloutPercentage: 25,
    owner: 'checkout-team'
});
flagManager.createFlag('dark-mode', {
    description: 'Dark mode UI',
    enabled: false
});

console.log('All flags:', flagManager.getAllFlags());
console.log('new-checkout enabled for user A:', flagManager.isEnabled('new-checkout', { userId: 'A' }));
console.log('dark-mode enabled:', flagManager.isEnabled('dark-mode'));

// Metrics
console.log('\n--- TBD Metrics ---');
const commits = Array(25).fill(null).map((_, i) => ({
    timestamp: new Date(Date.now() - i * 4 * 60 * 60 * 1000)
}));
console.log('Commit Frequency:', TBDMetrics.commitFrequency(commits, 'day'));

const branches = [
    { created: '2024-01-01T09:00:00', merged: '2024-01-01T14:00:00' },
    { created: '2024-01-02T10:00:00', merged: '2024-01-02T18:00:00' },
    { created: '2024-01-03T08:00:00', merged: '2024-01-03T12:00:00' }
];
console.log('\nBranch Lifespan:', TBDMetrics.branchLifespan(branches));

// Comparison
console.log('\n--- Strategy Comparison ---');
console.log(TBDComparison.getComparison());

/**
 * Best Practices for Trunk-Based Development:
 *
 * 1. Commit small, complete changes frequently
 * 2. Keep branches short-lived (hours, not days)
 * 3. Maintain comprehensive automated tests
 * 4. Use feature flags for incomplete work
 * 5. Run pre-commit hooks for fast feedback
 * 6. Keep CI/CD pipeline fast (< 15 min)
 * 7. Practice continuous code review
 * 8. Monitor trunk health continuously
 * 9. Roll back quickly if issues arise
 * 10. Build a culture of shared ownership
 */
