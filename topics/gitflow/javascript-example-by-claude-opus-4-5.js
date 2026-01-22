/**
 * Gitflow - Git Branching Model for Software Development
 *
 * Gitflow is a popular branching model for Git that provides structure
 * for managing branches and releases. It helps teams collaborate on code
 * and manage changes more efficiently with defined branch types and rules.
 *
 * Key Concepts:
 * - master: Stable, production-ready code
 * - develop: Integration branch for ongoing development
 * - feature: New features branched from develop
 * - release: Preparation for new production release
 * - hotfix: Critical fixes from master
 */

/**
 * Branch represents a Git branch in Gitflow.
 * Contains metadata about the branch type and lifecycle.
 */
class Branch {
    constructor(name, type, options = {}) {
        this.name = name;
        this.type = type; // master, develop, feature, release, hotfix
        this.sourceBranch = options.sourceBranch;
        this.targetBranches = options.targetBranches || [];
        this.createdAt = new Date();
        this.status = 'active';
        this.commits = [];
        this.metadata = options.metadata || {};
    }

    /**
     * Adds a commit to the branch
     * @param {Object} commit - Commit information
     */
    addCommit(commit) {
        this.commits.push({
            hash: commit.hash || `${Date.now().toString(36)}`,
            message: commit.message,
            author: commit.author,
            timestamp: new Date()
        });
    }

    /**
     * Marks branch as merged
     * @param {string} targetBranch - Branch merged into
     */
    markMerged(targetBranch) {
        this.status = 'merged';
        this.mergedInto = targetBranch;
        this.mergedAt = new Date();
    }

    /**
     * Gets branch summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            name: this.name,
            type: this.type,
            status: this.status,
            commits: this.commits.length,
            sourceBranch: this.sourceBranch
        };
    }
}

/**
 * GitflowRepository manages branches according to Gitflow model.
 * Enforces branch naming and merge rules.
 */
class GitflowRepository {
    constructor(name) {
        this.name = name;
        this.branches = new Map();
        this.tags = [];
        this.history = [];

        // Initialize with master and develop
        this.initializeBranches();
    }

    /**
     * Initializes master and develop branches
     */
    initializeBranches() {
        const master = new Branch('master', 'master');
        master.addCommit({ message: 'Initial commit', author: 'system' });
        this.branches.set('master', master);

        const develop = new Branch('develop', 'develop', { sourceBranch: 'master' });
        this.branches.set('develop', develop);

        this.recordHistory('initialize', 'Created master and develop branches');
    }

    /**
     * Creates a feature branch
     * @param {string} featureName - Feature name
     * @returns {Branch} New feature branch
     */
    startFeature(featureName) {
        const branchName = `feature/${featureName}`;

        if (this.branches.has(branchName)) {
            throw new Error(`Feature branch ${branchName} already exists`);
        }

        const feature = new Branch(branchName, 'feature', {
            sourceBranch: 'develop',
            targetBranches: ['develop'],
            metadata: { featureName }
        });

        this.branches.set(branchName, feature);
        this.recordHistory('branch', `Created feature branch: ${branchName}`);

        console.log(`Created feature branch: ${branchName}`);
        return feature;
    }

    /**
     * Finishes a feature branch
     * @param {string} featureName - Feature name
     * @returns {Object} Merge result
     */
    finishFeature(featureName) {
        const branchName = `feature/${featureName}`;
        const feature = this.branches.get(branchName);

        if (!feature) {
            throw new Error(`Feature branch ${branchName} not found`);
        }

        // Merge into develop
        const develop = this.branches.get('develop');
        feature.commits.forEach(c => develop.addCommit(c));
        feature.markMerged('develop');

        this.recordHistory('merge', `Merged ${branchName} into develop`);

        console.log(`Finished feature: ${branchName} -> develop`);
        return { merged: branchName, into: 'develop' };
    }

    /**
     * Creates a release branch
     * @param {string} version - Release version
     * @returns {Branch} New release branch
     */
    startRelease(version) {
        const branchName = `release/${version}`;

        if (this.branches.has(branchName)) {
            throw new Error(`Release branch ${branchName} already exists`);
        }

        const release = new Branch(branchName, 'release', {
            sourceBranch: 'develop',
            targetBranches: ['master', 'develop'],
            metadata: { version }
        });

        this.branches.set(branchName, release);
        this.recordHistory('branch', `Created release branch: ${branchName}`);

        console.log(`Created release branch: ${branchName}`);
        return release;
    }

    /**
     * Finishes a release branch
     * @param {string} version - Release version
     * @returns {Object} Merge result
     */
    finishRelease(version) {
        const branchName = `release/${version}`;
        const release = this.branches.get(branchName);

        if (!release) {
            throw new Error(`Release branch ${branchName} not found`);
        }

        // Merge into master and develop
        const master = this.branches.get('master');
        const develop = this.branches.get('develop');

        release.commits.forEach(c => {
            master.addCommit(c);
            develop.addCommit(c);
        });

        // Tag the release
        this.tags.push({
            name: version,
            commit: master.commits[master.commits.length - 1]?.hash,
            createdAt: new Date()
        });

        release.markMerged('master');

        this.recordHistory('release', `Released version ${version}`);

        console.log(`Finished release: ${branchName} -> master, develop`);
        console.log(`Created tag: ${version}`);

        return { merged: branchName, into: ['master', 'develop'], tag: version };
    }

    /**
     * Creates a hotfix branch
     * @param {string} version - Hotfix version
     * @returns {Branch} New hotfix branch
     */
    startHotfix(version) {
        const branchName = `hotfix/${version}`;

        if (this.branches.has(branchName)) {
            throw new Error(`Hotfix branch ${branchName} already exists`);
        }

        const hotfix = new Branch(branchName, 'hotfix', {
            sourceBranch: 'master',
            targetBranches: ['master', 'develop'],
            metadata: { version }
        });

        this.branches.set(branchName, hotfix);
        this.recordHistory('branch', `Created hotfix branch: ${branchName}`);

        console.log(`Created hotfix branch: ${branchName}`);
        return hotfix;
    }

    /**
     * Finishes a hotfix branch
     * @param {string} version - Hotfix version
     * @returns {Object} Merge result
     */
    finishHotfix(version) {
        const branchName = `hotfix/${version}`;
        const hotfix = this.branches.get(branchName);

        if (!hotfix) {
            throw new Error(`Hotfix branch ${branchName} not found`);
        }

        // Merge into master and develop
        const master = this.branches.get('master');
        const develop = this.branches.get('develop');

        hotfix.commits.forEach(c => {
            master.addCommit(c);
            develop.addCommit(c);
        });

        // Tag the hotfix
        this.tags.push({
            name: version,
            commit: master.commits[master.commits.length - 1]?.hash,
            createdAt: new Date()
        });

        hotfix.markMerged('master');

        this.recordHistory('hotfix', `Applied hotfix ${version}`);

        console.log(`Finished hotfix: ${branchName} -> master, develop`);
        console.log(`Created tag: ${version}`);

        return { merged: branchName, into: ['master', 'develop'], tag: version };
    }

    /**
     * Records an action in history
     * @param {string} action - Action type
     * @param {string} description - Action description
     */
    recordHistory(action, description) {
        this.history.push({
            action,
            description,
            timestamp: new Date()
        });
    }

    /**
     * Gets all branches by type
     * @param {string} type - Branch type
     * @returns {Array} Matching branches
     */
    getBranchesByType(type) {
        return Array.from(this.branches.values()).filter(b => b.type === type);
    }

    /**
     * Gets active branches
     * @returns {Array} Active branches
     */
    getActiveBranches() {
        return Array.from(this.branches.values()).filter(b => b.status === 'active');
    }

    /**
     * Gets repository status
     * @returns {Object} Status
     */
    getStatus() {
        const branches = Array.from(this.branches.values());

        return {
            name: this.name,
            totalBranches: branches.length,
            activeBranches: branches.filter(b => b.status === 'active').length,
            byType: {
                master: this.getBranchesByType('master').length,
                develop: this.getBranchesByType('develop').length,
                feature: this.getBranchesByType('feature').length,
                release: this.getBranchesByType('release').length,
                hotfix: this.getBranchesByType('hotfix').length
            },
            tags: this.tags.length,
            latestTag: this.tags[this.tags.length - 1]?.name
        };
    }

    /**
     * Visualizes branch structure
     * @returns {string} ASCII visualization
     */
    visualize() {
        let viz = '\n=== Gitflow Branch Structure ===\n\n';

        // Master
        viz += 'master ─────●───────●───────●─────\n';
        viz += '            │       │       ↑\n';
        viz += '            │    release    │\n';
        viz += '            ↓       │    hotfix\n';
        viz += 'develop ────●───────●───────●─────\n';
        viz += '            │\n';
        viz += '         feature\n';

        return viz;
    }
}

/**
 * GitflowWorkflow guides developers through Gitflow operations.
 * Validates branch states and provides guidance.
 */
class GitflowWorkflow {
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Validates feature can be started
     * @param {string} featureName - Feature name
     * @returns {Object} Validation result
     */
    canStartFeature(featureName) {
        const issues = [];

        if (!featureName || featureName.trim() === '') {
            issues.push('Feature name is required');
        }

        if (!/^[a-z0-9-]+$/i.test(featureName)) {
            issues.push('Feature name should contain only letters, numbers, and hyphens');
        }

        if (this.repository.branches.has(`feature/${featureName}`)) {
            issues.push('A feature with this name already exists');
        }

        return { valid: issues.length === 0, issues };
    }

    /**
     * Validates release can be started
     * @param {string} version - Version string
     * @returns {Object} Validation result
     */
    canStartRelease(version) {
        const issues = [];

        if (!version || version.trim() === '') {
            issues.push('Version is required');
        }

        if (!/^\d+\.\d+\.\d+$/.test(version)) {
            issues.push('Version should follow semantic versioning (e.g., 1.0.0)');
        }

        const existingReleases = this.repository.getBranchesByType('release')
            .filter(b => b.status === 'active');

        if (existingReleases.length > 0) {
            issues.push('An active release branch already exists');
        }

        if (this.repository.tags.some(t => t.name === version)) {
            issues.push('This version has already been released');
        }

        return { valid: issues.length === 0, issues };
    }

    /**
     * Validates hotfix can be started
     * @param {string} version - Version string
     * @returns {Object} Validation result
     */
    canStartHotfix(version) {
        const issues = [];

        if (!version || version.trim() === '') {
            issues.push('Version is required');
        }

        const existingHotfixes = this.repository.getBranchesByType('hotfix')
            .filter(b => b.status === 'active');

        if (existingHotfixes.length > 0) {
            issues.push('An active hotfix branch already exists');
        }

        if (this.repository.tags.some(t => t.name === version)) {
            issues.push('This version has already been released');
        }

        return { valid: issues.length === 0, issues };
    }

    /**
     * Gets suggested next version
     * @param {string} type - Version bump type (major, minor, patch)
     * @returns {string} Suggested version
     */
    suggestNextVersion(type = 'minor') {
        const latestTag = this.repository.tags[this.repository.tags.length - 1]?.name;

        if (!latestTag) {
            return '1.0.0';
        }

        const [major, minor, patch] = latestTag.split('.').map(Number);

        switch (type) {
            case 'major':
                return `${major + 1}.0.0`;
            case 'minor':
                return `${major}.${minor + 1}.0`;
            case 'patch':
                return `${major}.${minor}.${patch + 1}`;
            default:
                return `${major}.${minor + 1}.0`;
        }
    }

    /**
     * Gets workflow guidance
     * @returns {Object} Workflow guidance
     */
    getGuidance() {
        const status = this.repository.getStatus();
        const suggestions = [];

        const activeFeatures = this.repository.getBranchesByType('feature')
            .filter(b => b.status === 'active');

        if (activeFeatures.length > 0) {
            suggestions.push({
                action: 'Finish features',
                description: `${activeFeatures.length} feature branch(es) ready for review`,
                branches: activeFeatures.map(b => b.name)
            });
        }

        const activeReleases = this.repository.getBranchesByType('release')
            .filter(b => b.status === 'active');

        if (activeReleases.length > 0) {
            suggestions.push({
                action: 'Finish release',
                description: 'Release branch ready for deployment',
                branches: activeReleases.map(b => b.name)
            });
        }

        if (activeFeatures.length === 0 && activeReleases.length === 0) {
            suggestions.push({
                action: 'Start new feature or release',
                description: 'No active feature or release branches'
            });
        }

        return {
            status,
            suggestions,
            nextVersion: this.suggestNextVersion()
        };
    }
}

/**
 * GitflowCommandGenerator generates Git commands for Gitflow.
 * Provides command-line instructions for each operation.
 */
class GitflowCommandGenerator {
    /**
     * Gets commands for starting a feature
     * @param {string} featureName - Feature name
     * @returns {Array} Git commands
     */
    static startFeature(featureName) {
        return [
            `git checkout develop`,
            `git pull origin develop`,
            `git checkout -b feature/${featureName}`
        ];
    }

    /**
     * Gets commands for finishing a feature
     * @param {string} featureName - Feature name
     * @returns {Array} Git commands
     */
    static finishFeature(featureName) {
        return [
            `git checkout develop`,
            `git pull origin develop`,
            `git merge --no-ff feature/${featureName}`,
            `git push origin develop`,
            `git branch -d feature/${featureName}`
        ];
    }

    /**
     * Gets commands for starting a release
     * @param {string} version - Version
     * @returns {Array} Git commands
     */
    static startRelease(version) {
        return [
            `git checkout develop`,
            `git pull origin develop`,
            `git checkout -b release/${version}`
        ];
    }

    /**
     * Gets commands for finishing a release
     * @param {string} version - Version
     * @returns {Array} Git commands
     */
    static finishRelease(version) {
        return [
            `git checkout master`,
            `git merge --no-ff release/${version}`,
            `git tag -a ${version} -m "Release ${version}"`,
            `git checkout develop`,
            `git merge --no-ff release/${version}`,
            `git push origin master develop --tags`,
            `git branch -d release/${version}`
        ];
    }

    /**
     * Gets commands for starting a hotfix
     * @param {string} version - Version
     * @returns {Array} Git commands
     */
    static startHotfix(version) {
        return [
            `git checkout master`,
            `git pull origin master`,
            `git checkout -b hotfix/${version}`
        ];
    }

    /**
     * Gets commands for finishing a hotfix
     * @param {string} version - Version
     * @returns {Array} Git commands
     */
    static finishHotfix(version) {
        return [
            `git checkout master`,
            `git merge --no-ff hotfix/${version}`,
            `git tag -a ${version} -m "Hotfix ${version}"`,
            `git checkout develop`,
            `git merge --no-ff hotfix/${version}`,
            `git push origin master develop --tags`,
            `git branch -d hotfix/${version}`
        ];
    }
}

// Demonstration
console.log('=== Gitflow Demo ===\n');

// Create repository
const repo = new GitflowRepository('my-project');
console.log('Repository Status:', repo.getStatus());

// Create workflow helper
const workflow = new GitflowWorkflow(repo);

// Start and finish a feature
console.log('\n--- Feature Development ---');
const validation = workflow.canStartFeature('user-authentication');
console.log('Validation:', validation);

const feature = repo.startFeature('user-authentication');
feature.addCommit({ message: 'Add login form', author: 'developer' });
feature.addCommit({ message: 'Add authentication service', author: 'developer' });
repo.finishFeature('user-authentication');

// Start and finish a release
console.log('\n--- Release Process ---');
const releaseValidation = workflow.canStartRelease('1.0.0');
console.log('Release Validation:', releaseValidation);

const release = repo.startRelease('1.0.0');
release.addCommit({ message: 'Update version number', author: 'developer' });
release.addCommit({ message: 'Fix last-minute bug', author: 'developer' });
repo.finishRelease('1.0.0');

// Start and finish a hotfix
console.log('\n--- Hotfix Process ---');
const hotfix = repo.startHotfix('1.0.1');
hotfix.addCommit({ message: 'Fix critical security issue', author: 'developer' });
repo.finishHotfix('1.0.1');

// Show final status
console.log('\n--- Final Status ---');
console.log('Repository:', repo.getStatus());
console.log('Tags:', repo.tags);

// Show guidance
console.log('\n--- Workflow Guidance ---');
console.log(workflow.getGuidance());

// Show Git commands
console.log('\n--- Git Commands Example ---');
console.log('Start Feature:');
GitflowCommandGenerator.startFeature('new-feature').forEach(cmd => {
    console.log(`  $ ${cmd}`);
});

// Show branch visualization
console.log(repo.visualize());

/**
 * Best Practices for Gitflow:
 *
 * 1. Keep master always deployable
 * 2. Develop should always be stable enough to branch from
 * 3. Use descriptive branch names (feature/user-auth, not feature/my-branch)
 * 4. Delete branches after merging
 * 5. Use semantic versioning for releases and hotfixes
 * 6. Only one release branch at a time
 * 7. Hotfixes should be small and focused
 * 8. Always merge with --no-ff to preserve branch history
 * 9. Tag all releases
 * 10. Consider simpler models for small teams or continuous delivery
 */
