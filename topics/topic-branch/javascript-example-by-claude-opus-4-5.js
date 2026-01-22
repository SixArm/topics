/**
 * Topic Branch - Isolated Development and Testing Workflows
 *
 * A topic branch is a separate branch of code in Git used to isolate changes
 * related to a specific feature or task. This allows developers to work
 * independently without interfering with each other's work, and enables
 * isolated testing of specific changes before merging.
 *
 * Key Concepts:
 * - Branch isolation
 * - Feature development workflow
 * - Code review process
 * - Merge strategies
 */

/**
 * TopicBranchType categorizes different types of topic branches.
 */
class TopicBranchType {
    static types = {
        feature: {
            name: 'Feature Branch',
            prefix: 'feature/',
            description: 'New functionality development',
            example: 'feature/user-authentication',
            lifespan: 'Days to weeks',
            testStrategy: 'Full test suite before merge'
        },
        bugfix: {
            name: 'Bugfix Branch',
            prefix: 'bugfix/',
            description: 'Bug fixes and corrections',
            example: 'bugfix/login-validation-error',
            lifespan: 'Hours to days',
            testStrategy: 'Regression tests + specific bug test'
        },
        hotfix: {
            name: 'Hotfix Branch',
            prefix: 'hotfix/',
            description: 'Critical production fixes',
            example: 'hotfix/security-vulnerability',
            lifespan: 'Hours',
            testStrategy: 'Critical path tests + specific fix test'
        },
        experiment: {
            name: 'Experiment Branch',
            prefix: 'experiment/',
            description: 'Exploratory or proof-of-concept work',
            example: 'experiment/new-caching-strategy',
            lifespan: 'Variable',
            testStrategy: 'May not require full testing'
        },
        refactor: {
            name: 'Refactor Branch',
            prefix: 'refactor/',
            description: 'Code improvements without behavior change',
            example: 'refactor/extract-payment-service',
            lifespan: 'Days',
            testStrategy: 'Full regression - behavior should not change'
        }
    };

    /**
     * Gets type by name
     * @param {string} name - Type name
     * @returns {Object} Type details
     */
    static getType(name) {
        return this.types[name];
    }

    /**
     * Gets all types
     * @returns {Array} All types
     */
    static getAllTypes() {
        return Object.entries(this.types).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }

    /**
     * Suggests type based on description
     * @param {string} description - Branch description
     * @returns {string} Suggested type
     */
    static suggestType(description) {
        const lower = description.toLowerCase();
        if (lower.includes('fix') || lower.includes('bug')) return 'bugfix';
        if (lower.includes('urgent') || lower.includes('critical')) return 'hotfix';
        if (lower.includes('refactor') || lower.includes('cleanup')) return 'refactor';
        if (lower.includes('experiment') || lower.includes('try')) return 'experiment';
        return 'feature';
    }
}

/**
 * BranchWorkflow manages branch lifecycle.
 */
class BranchWorkflow {
    constructor(branchName) {
        this.branchName = branchName;
        this.type = this.detectType(branchName);
        this.createdAt = new Date();
        this.status = 'active';
        this.commits = [];
        this.testRuns = [];
    }

    /**
     * Detects branch type from name
     * @param {string} branchName - Branch name
     * @returns {string} Branch type
     */
    detectType(branchName) {
        for (const [type, config] of Object.entries(TopicBranchType.types)) {
            if (branchName.startsWith(config.prefix)) {
                return type;
            }
        }
        return 'feature';
    }

    /**
     * Records a commit
     * @param {string} message - Commit message
     */
    addCommit(message) {
        this.commits.push({
            message,
            timestamp: new Date()
        });
    }

    /**
     * Records a test run
     * @param {Object} result - Test result
     */
    addTestRun(result) {
        this.testRuns.push({
            ...result,
            timestamp: new Date()
        });
    }

    /**
     * Checks if branch is ready for merge
     * @returns {Object} Readiness check
     */
    checkMergeReadiness() {
        const checks = [];
        const typeConfig = TopicBranchType.types[this.type];

        // Check for test runs
        if (this.testRuns.length === 0) {
            checks.push({ check: 'Tests executed', passed: false, reason: 'No test runs recorded' });
        } else {
            const lastRun = this.testRuns[this.testRuns.length - 1];
            checks.push({
                check: 'Tests passing',
                passed: lastRun.passed,
                reason: lastRun.passed ? 'All tests pass' : `${lastRun.failed} tests failing`
            });
        }

        // Check for commits
        checks.push({
            check: 'Has commits',
            passed: this.commits.length > 0,
            reason: this.commits.length > 0 ? `${this.commits.length} commits` : 'No commits'
        });

        // Check branch age for hotfixes
        if (this.type === 'hotfix') {
            const ageHours = (Date.now() - this.createdAt) / (1000 * 60 * 60);
            checks.push({
                check: 'Hotfix age',
                passed: ageHours < 24,
                reason: ageHours < 24 ? 'Within time limit' : 'Hotfix taking too long'
            });
        }

        const allPassed = checks.every(c => c.passed);

        return {
            branch: this.branchName,
            type: this.type,
            ready: allPassed,
            checks
        };
    }

    /**
     * Gets branch summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            branch: this.branchName,
            type: this.type,
            status: this.status,
            commits: this.commits.length,
            testRuns: this.testRuns.length,
            lastTestPassed: this.testRuns.length > 0
                ? this.testRuns[this.testRuns.length - 1].passed
                : null
        };
    }
}

/**
 * BranchTestingStrategy defines testing approaches per branch type.
 */
class BranchTestingStrategy {
    static strategies = {
        feature: {
            preCommit: ['Unit tests', 'Linting'],
            prePush: ['Integration tests'],
            preMerge: ['Full test suite', 'Code coverage check'],
            postMerge: ['Smoke tests', 'E2E tests']
        },
        bugfix: {
            preCommit: ['Unit tests for affected code'],
            prePush: ['Regression tests'],
            preMerge: ['Full test suite', 'Bug reproduction test'],
            postMerge: ['Verify fix in staging']
        },
        hotfix: {
            preCommit: ['Critical path tests'],
            prePush: ['Smoke tests'],
            preMerge: ['Production-critical tests'],
            postMerge: ['Immediate production verification']
        },
        refactor: {
            preCommit: ['All unit tests'],
            prePush: ['Full test suite'],
            preMerge: ['Full test suite', 'Behavior unchanged verification'],
            postMerge: ['Performance baseline comparison']
        }
    };

    /**
     * Gets strategy for branch type
     * @param {string} branchType - Branch type
     * @returns {Object} Testing strategy
     */
    static getStrategy(branchType) {
        return this.strategies[branchType] || this.strategies.feature;
    }

    /**
     * Gets tests for phase
     * @param {string} branchType - Branch type
     * @param {string} phase - Development phase
     * @returns {Array} Required tests
     */
    static getTestsForPhase(branchType, phase) {
        const strategy = this.getStrategy(branchType);
        return strategy[phase] || [];
    }
}

/**
 * GitOperations simulates common Git operations.
 */
class GitOperations {
    /**
     * Creates a new branch
     * @param {string} baseBranch - Base branch
     * @param {string} newBranch - New branch name
     * @returns {Object} Operation result
     */
    static createBranch(baseBranch, newBranch) {
        return {
            command: `git checkout -b ${newBranch} ${baseBranch}`,
            description: `Create branch '${newBranch}' from '${baseBranch}'`,
            nextSteps: [
                'Make changes',
                'Commit changes',
                'Push branch',
                'Create pull request'
            ]
        };
    }

    /**
     * Merges branch
     * @param {string} sourceBranch - Source branch
     * @param {string} targetBranch - Target branch
     * @param {string} strategy - Merge strategy
     * @returns {Object} Operation result
     */
    static merge(sourceBranch, targetBranch, strategy = 'merge') {
        const commands = {
            merge: `git checkout ${targetBranch} && git merge ${sourceBranch}`,
            squash: `git checkout ${targetBranch} && git merge --squash ${sourceBranch}`,
            rebase: `git rebase ${targetBranch} ${sourceBranch}`
        };

        return {
            command: commands[strategy],
            strategy,
            description: `Merge '${sourceBranch}' into '${targetBranch}' using ${strategy}`,
            preMergeChecks: [
                'All tests passing',
                'Code review approved',
                'No merge conflicts',
                'CI/CD pipeline green'
            ]
        };
    }

    /**
     * Deletes branch
     * @param {string} branchName - Branch to delete
     * @param {boolean} remote - Delete remote as well
     * @returns {Object} Operation result
     */
    static deleteBranch(branchName, remote = true) {
        const commands = [`git branch -d ${branchName}`];
        if (remote) {
            commands.push(`git push origin --delete ${branchName}`);
        }

        return {
            commands,
            description: `Delete branch '${branchName}'${remote ? ' (local and remote)' : ' (local only)'}`,
            safety: 'Only delete after successful merge'
        };
    }
}

/**
 * BranchNamingConvention defines naming standards.
 */
class BranchNamingConvention {
    static conventions = {
        pattern: '{type}/{ticket-id}-{description}',
        examples: [
            'feature/JIRA-123-user-authentication',
            'bugfix/BUG-456-fix-login-error',
            'hotfix/SEC-789-patch-vulnerability'
        ],
        rules: [
            'Use lowercase letters',
            'Use hyphens as separators',
            'Include ticket/issue reference',
            'Keep description short but meaningful',
            'No spaces or special characters'
        ]
    };

    /**
     * Validates branch name
     * @param {string} branchName - Branch name to validate
     * @returns {Object} Validation result
     */
    static validate(branchName) {
        const issues = [];

        if (branchName !== branchName.toLowerCase()) {
            issues.push('Should be lowercase');
        }

        if (branchName.includes(' ')) {
            issues.push('Should not contain spaces');
        }

        if (!branchName.includes('/')) {
            issues.push('Should include type prefix with /');
        }

        const validPrefixes = Object.values(TopicBranchType.types).map(t => t.prefix);
        const hasValidPrefix = validPrefixes.some(p => branchName.startsWith(p));
        if (!hasValidPrefix) {
            issues.push(`Should start with valid prefix: ${validPrefixes.join(', ')}`);
        }

        return {
            branchName,
            valid: issues.length === 0,
            issues,
            suggestion: issues.length > 0
                ? this.suggestName(branchName)
                : branchName
        };
    }

    /**
     * Suggests corrected name
     * @param {string} branchName - Original name
     * @returns {string} Suggested name
     */
    static suggestName(branchName) {
        return branchName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-\/]/g, '');
    }
}

// Demonstration
console.log('=== Topic Branch Demo ===\n');

// Branch types
console.log('--- Branch Types ---');
TopicBranchType.getAllTypes().forEach(type => {
    console.log(`\n${type.name} (${type.prefix})`);
    console.log(`  Example: ${type.example}`);
    console.log(`  Test Strategy: ${type.testStrategy}`);
});

// Branch workflow
console.log('\n--- Branch Workflow ---');
const workflow = new BranchWorkflow('feature/AUTH-001-user-login');
workflow.addCommit('Add login form component');
workflow.addCommit('Add authentication service');
workflow.addTestRun({ passed: true, total: 50, failed: 0 });

console.log('Summary:', workflow.getSummary());
console.log('Merge Readiness:', workflow.checkMergeReadiness());

// Testing strategy
console.log('\n--- Testing Strategy by Branch Type ---');
console.log('Feature branch strategy:', BranchTestingStrategy.getStrategy('feature'));
console.log('Hotfix branch strategy:', BranchTestingStrategy.getStrategy('hotfix'));

// Git operations
console.log('\n--- Git Operations ---');
console.log('Create branch:', GitOperations.createBranch('main', 'feature/new-feature'));
console.log('\nMerge branch:', GitOperations.merge('feature/new-feature', 'main', 'squash'));

// Naming conventions
console.log('\n--- Naming Convention Validation ---');
console.log('Valid name:', BranchNamingConvention.validate('feature/JIRA-123-user-auth'));
console.log('Invalid name:', BranchNamingConvention.validate('My Feature Branch'));

// Type suggestion
console.log('\n--- Branch Type Suggestion ---');
console.log('Fix login bug:', TopicBranchType.suggestType('Fix login bug'));
console.log('Add payment feature:', TopicBranchType.suggestType('Add payment feature'));
console.log('Critical security patch:', TopicBranchType.suggestType('Critical security patch'));

/**
 * Best Practices for Topic Branches:
 *
 * 1. Use descriptive branch names with type prefixes
 * 2. Keep branches short-lived
 * 3. Run appropriate tests before merging
 * 4. Get code reviews before merge
 * 5. Delete branches after successful merge
 * 6. Rebase or merge from main regularly
 * 7. One feature/fix per branch
 * 8. Follow naming conventions
 * 9. Link to issue tracking system
 * 10. Automate testing in CI/CD
 */
