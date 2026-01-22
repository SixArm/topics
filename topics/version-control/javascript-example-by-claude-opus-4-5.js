/**
 * Version Control - Managing Changes Over Time
 *
 * Version control is a system used to manage changes to documents, code, or
 * other types of files. It allows users to track and maintain a history of
 * changes, collaborate with others, and revert to previous versions. Version
 * control is essential for test automation code management.
 *
 * Key Concepts:
 * - Repository management
 * - Branching and merging
 * - Commit history
 * - Collaboration workflows
 */

/**
 * VersionControlSystem represents a VCS implementation.
 */
class VersionControlSystem {
    static types = {
        centralized: {
            name: 'Centralized VCS (CVCS)',
            description: 'Single central server stores all versions',
            examples: ['SVN', 'Perforce', 'CVS'],
            pros: ['Simple model', 'Fine-grained access control', 'Large file support'],
            cons: ['Single point of failure', 'Requires network', 'Slower operations']
        },
        distributed: {
            name: 'Distributed VCS (DVCS)',
            description: 'Every user has complete repository copy',
            examples: ['Git', 'Mercurial', 'Bazaar'],
            pros: ['Full offline access', 'Fast operations', 'Flexible workflows'],
            cons: ['Larger disk usage', 'Learning curve', 'Complex merge scenarios']
        }
    };

    /**
     * Gets VCS type details
     * @param {string} type - VCS type
     * @returns {Object} Type details
     */
    static getType(type) {
        return this.types[type];
    }

    /**
     * Gets all VCS types
     * @returns {Array} All types
     */
    static getAllTypes() {
        return Object.entries(this.types).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * Repository simulates a version control repository.
 */
class Repository {
    constructor(name) {
        this.name = name;
        this.branches = new Map([['main', []]]);
        this.currentBranch = 'main';
        this.commits = [];
        this.tags = new Map();
        this.stash = [];
    }

    /**
     * Creates a commit
     * @param {string} message - Commit message
     * @param {Array} files - Changed files
     * @returns {Object} Commit object
     */
    commit(message, files = []) {
        const commit = {
            hash: this.generateHash(),
            message,
            files,
            author: 'test-user',
            timestamp: new Date(),
            branch: this.currentBranch
        };

        this.commits.push(commit);
        this.branches.get(this.currentBranch).push(commit.hash);

        return {
            success: true,
            commit: {
                hash: commit.hash.substring(0, 7),
                message,
                filesChanged: files.length
            }
        };
    }

    /**
     * Creates a branch
     * @param {string} name - Branch name
     * @returns {Object} Branch creation result
     */
    createBranch(name) {
        if (this.branches.has(name)) {
            return { success: false, error: 'Branch already exists' };
        }

        const currentCommits = [...this.branches.get(this.currentBranch)];
        this.branches.set(name, currentCommits);

        return {
            success: true,
            branch: name,
            basedOn: this.currentBranch,
            startingCommit: currentCommits[currentCommits.length - 1]?.substring(0, 7) || 'initial'
        };
    }

    /**
     * Switches to a branch
     * @param {string} name - Branch name
     * @returns {Object} Switch result
     */
    checkout(name) {
        if (!this.branches.has(name)) {
            return { success: false, error: 'Branch not found' };
        }

        const previousBranch = this.currentBranch;
        this.currentBranch = name;

        return {
            success: true,
            previousBranch,
            currentBranch: name
        };
    }

    /**
     * Merges a branch
     * @param {string} sourceBranch - Branch to merge from
     * @returns {Object} Merge result
     */
    merge(sourceBranch) {
        if (!this.branches.has(sourceBranch)) {
            return { success: false, error: 'Source branch not found' };
        }

        const sourceCommits = this.branches.get(sourceBranch);
        const targetCommits = this.branches.get(this.currentBranch);

        // Simulate merge
        const newCommits = sourceCommits.filter(c => !targetCommits.includes(c));

        if (newCommits.length === 0) {
            return { success: true, message: 'Already up to date' };
        }

        // Add merge commit
        const mergeCommit = this.commit(`Merge branch '${sourceBranch}' into ${this.currentBranch}`, []);

        return {
            success: true,
            merged: newCommits.length + ' commits',
            mergeCommit: mergeCommit.commit.hash,
            from: sourceBranch,
            into: this.currentBranch
        };
    }

    /**
     * Creates a tag
     * @param {string} name - Tag name
     * @param {string} message - Tag message
     * @returns {Object} Tag result
     */
    tag(name, message = '') {
        const currentCommit = this.branches.get(this.currentBranch).slice(-1)[0];
        this.tags.set(name, {
            commit: currentCommit,
            message,
            createdAt: new Date()
        });

        return {
            success: true,
            tag: name,
            commit: currentCommit?.substring(0, 7) || 'initial'
        };
    }

    /**
     * Gets commit log
     * @param {number} limit - Number of commits to return
     * @returns {Array} Commit log
     */
    log(limit = 10) {
        return this.commits
            .filter(c => c.branch === this.currentBranch)
            .slice(-limit)
            .reverse()
            .map(c => ({
                hash: c.hash.substring(0, 7),
                message: c.message,
                author: c.author,
                date: c.timestamp.toISOString()
            }));
    }

    /**
     * Gets repository status
     * @returns {Object} Status
     */
    status() {
        return {
            repository: this.name,
            currentBranch: this.currentBranch,
            totalBranches: this.branches.size,
            totalCommits: this.commits.length,
            tags: this.tags.size,
            branches: Array.from(this.branches.keys())
        };
    }

    /**
     * Generates a commit hash
     * @returns {string} Hash
     */
    generateHash() {
        return Array.from({ length: 40 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    }
}

/**
 * BranchingStrategy defines common branching patterns.
 */
class BranchingStrategy {
    static strategies = {
        gitFlow: {
            name: 'Git Flow',
            branches: ['main', 'develop', 'feature/*', 'release/*', 'hotfix/*'],
            workflow: [
                'Features branch from develop',
                'Features merge to develop',
                'Release branches from develop',
                'Release merges to main and develop',
                'Hotfixes branch from main'
            ],
            bestFor: 'Scheduled releases, multiple versions'
        },
        githubFlow: {
            name: 'GitHub Flow',
            branches: ['main', 'feature/*'],
            workflow: [
                'Branch from main for features',
                'Open pull request for review',
                'Deploy and test from branch',
                'Merge to main and deploy'
            ],
            bestFor: 'Continuous deployment'
        },
        trunkBased: {
            name: 'Trunk-Based Development',
            branches: ['main', 'short-lived-feature/*'],
            workflow: [
                'Work directly on main or very short branches',
                'Commit multiple times per day',
                'Use feature flags for incomplete work',
                'Deploy frequently'
            ],
            bestFor: 'CI/CD with strong testing'
        }
    };

    /**
     * Gets strategy details
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
 * TestCodeVersioning provides guidance for versioning test code.
 */
class TestCodeVersioning {
    static practices = {
        separateTestRepo: {
            name: 'Separate Test Repository',
            description: 'Tests in dedicated repository',
            pros: ['Independent versioning', 'Separate CI/CD'],
            cons: ['Synchronization challenges', 'Extra maintenance']
        },
        sameRepoSeparateDir: {
            name: 'Same Repo, Separate Directory',
            description: 'Tests alongside code in test/ directory',
            pros: ['Atomic commits', 'Easier synchronization'],
            cons: ['Larger repository', 'Mixed concerns']
        },
        colocated: {
            name: 'Co-located Tests',
            description: 'Tests next to source files',
            pros: ['Easy to find tests', 'Clear ownership'],
            cons: ['Directory clutter', 'Not all frameworks support']
        }
    };

    /**
     * Recommends versioning approach
     * @param {Object} context - Project context
     * @returns {Object} Recommendation
     */
    static recommend(context) {
        if (context.multipleTeams && context.separateTestTeam) {
            return {
                recommended: 'separateTestRepo',
                reason: 'Separate teams benefit from independent workflows'
            };
        }

        if (context.unitTests && context.developersWriteTests) {
            return {
                recommended: 'colocated',
                reason: 'Developers can easily maintain tests with code'
            };
        }

        return {
            recommended: 'sameRepoSeparateDir',
            reason: 'Balances organization with atomic commits'
        };
    }

    /**
     * Gets all practices
     * @returns {Array} All practices
     */
    static getAllPractices() {
        return Object.entries(this.practices).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * CommitConventions defines commit message standards.
 */
class CommitConventions {
    static types = {
        test: 'Adding or updating tests',
        fix: 'Bug fixes',
        feat: 'New features',
        refactor: 'Code refactoring',
        docs: 'Documentation changes',
        ci: 'CI/CD changes',
        chore: 'Maintenance tasks'
    };

    /**
     * Validates commit message
     * @param {string} message - Commit message
     * @returns {Object} Validation result
     */
    static validate(message) {
        const pattern = /^(test|fix|feat|refactor|docs|ci|chore)(\(.+\))?: .{3,}/;
        const isValid = pattern.test(message);

        const type = message.split(':')[0].split('(')[0];
        const scope = message.match(/\(([^)]+)\)/)?.[1] || null;

        return {
            valid: isValid,
            type,
            scope,
            description: message.split(': ')[1] || '',
            suggestion: !isValid
                ? 'Use format: type(scope): description'
                : 'Message follows conventions'
        };
    }

    /**
     * Generates commit message
     * @param {string} type - Commit type
     * @param {string} scope - Scope
     * @param {string} description - Description
     * @returns {string} Formatted message
     */
    static generate(type, scope, description) {
        return scope
            ? `${type}(${scope}): ${description}`
            : `${type}: ${description}`;
    }
}

// Demonstration
console.log('=== Version Control Demo ===\n');

// VCS types
console.log('--- VCS Types ---');
VersionControlSystem.getAllTypes().forEach(type => {
    console.log(`\n${type.name}`);
    console.log(`  Examples: ${type.examples.join(', ')}`);
});

// Repository operations
console.log('\n--- Repository Operations ---');
const repo = new Repository('test-automation');

console.log('Initial status:', repo.status());

console.log('\nCommit:', repo.commit('Initial commit', ['README.md']));
console.log('Commit:', repo.commit('Add test framework', ['package.json', 'jest.config.js']));

console.log('\nCreate branch:', repo.createBranch('feature/login-tests'));
console.log('Checkout:', repo.checkout('feature/login-tests'));
console.log('Commit:', repo.commit('Add login tests', ['tests/login.test.js']));

console.log('\nCheckout main:', repo.checkout('main'));
console.log('Merge:', repo.merge('feature/login-tests'));

console.log('\nTag:', repo.tag('v1.0.0', 'First release'));

console.log('\nCommit log:', repo.log(5));
console.log('\nFinal status:', repo.status());

// Branching strategies
console.log('\n--- Branching Strategies ---');
BranchingStrategy.getAllStrategies().forEach(strategy => {
    console.log(`\n${strategy.name}: Best for ${strategy.bestFor}`);
});

// Test code versioning
console.log('\n--- Test Code Versioning ---');
console.log(TestCodeVersioning.recommend({
    multipleTeams: false,
    unitTests: true,
    developersWriteTests: true
}));

// Commit conventions
console.log('\n--- Commit Conventions ---');
console.log(CommitConventions.validate('test(login): add password validation tests'));
console.log(CommitConventions.validate('fixed some bugs'));
console.log('Generated:', CommitConventions.generate('test', 'api', 'add endpoint tests'));

/**
 * Best Practices for Version Control in Test Automation:
 *
 * 1. Keep tests in version control with application code
 * 2. Use meaningful commit messages
 * 3. Create branches for test development
 * 4. Review test code changes through pull requests
 * 5. Tag releases that include test updates
 * 6. Use .gitignore for test artifacts
 * 7. Commit frequently with small changes
 * 8. Synchronize test and code versions
 * 9. Document test changes in commits
 * 10. Use hooks for pre-commit test validation
 */
