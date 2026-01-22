/**
 * Pull Request (PR) - Collaborative Code Review Process
 *
 * A pull request is a Git feature that allows developers to propose changes
 * to a codebase and request review before merging. PRs facilitate code review,
 * discussion, and collaboration. They provide a change log, enable automated
 * testing, and ensure code quality through the review process.
 *
 * Key Concepts:
 * - Branch-based development workflow
 * - Code review and approval process
 * - Automated checks (tests, linting, CI/CD)
 * - Discussion and feedback
 */

/**
 * PullRequest represents a pull request with metadata and status.
 */
class PullRequest {
    constructor(options) {
        this.id = options.id || this.generateId();
        this.title = options.title;
        this.description = options.description;
        this.author = options.author;
        this.sourceBranch = options.sourceBranch;
        this.targetBranch = options.targetBranch || 'main';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = 'open'; // open, closed, merged
        this.reviewers = options.reviewers || [];
        this.labels = options.labels || [];
        this.commits = [];
        this.comments = [];
        this.reviews = [];
        this.checks = [];
    }

    /**
     * Generates a PR ID
     * @returns {number} PR ID
     */
    generateId() {
        return Math.floor(Math.random() * 10000) + 1;
    }

    /**
     * Adds a commit to the PR
     * @param {Object} commit - Commit details
     */
    addCommit(commit) {
        this.commits.push({
            sha: commit.sha || this.generateSha(),
            message: commit.message,
            author: commit.author,
            timestamp: new Date()
        });
        this.updatedAt = new Date();
    }

    /**
     * Generates a commit SHA
     * @returns {string} SHA
     */
    generateSha() {
        return Array.from({ length: 7 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    }

    /**
     * Adds a comment
     * @param {Object} comment - Comment details
     */
    addComment(comment) {
        this.comments.push({
            id: this.comments.length + 1,
            author: comment.author,
            body: comment.body,
            file: comment.file || null,
            line: comment.line || null,
            timestamp: new Date()
        });
        this.updatedAt = new Date();
    }

    /**
     * Adds a review
     * @param {Object} review - Review details
     */
    addReview(review) {
        this.reviews.push({
            reviewer: review.reviewer,
            status: review.status, // approved, changes_requested, commented
            comments: review.comments || [],
            timestamp: new Date()
        });
        this.updatedAt = new Date();
    }

    /**
     * Adds a check result
     * @param {Object} check - Check details
     */
    addCheck(check) {
        this.checks.push({
            name: check.name,
            status: check.status, // pending, passed, failed
            details: check.details || null,
            timestamp: new Date()
        });
    }

    /**
     * Checks if PR can be merged
     * @returns {Object} Merge eligibility
     */
    canMerge() {
        const issues = [];

        // Check for approvals
        const approvals = this.reviews.filter(r => r.status === 'approved').length;
        if (approvals === 0) {
            issues.push('No approvals yet');
        }

        // Check for requested changes
        const changesRequested = this.reviews.some(r => r.status === 'changes_requested');
        if (changesRequested) {
            issues.push('Changes have been requested');
        }

        // Check CI status
        const failedChecks = this.checks.filter(c => c.status === 'failed');
        if (failedChecks.length > 0) {
            issues.push(`${failedChecks.length} check(s) failed`);
        }

        const pendingChecks = this.checks.filter(c => c.status === 'pending');
        if (pendingChecks.length > 0) {
            issues.push(`${pendingChecks.length} check(s) pending`);
        }

        return {
            canMerge: issues.length === 0,
            issues,
            approvals,
            checksPassed: this.checks.filter(c => c.status === 'passed').length
        };
    }

    /**
     * Merges the PR
     * @param {Object} options - Merge options
     * @returns {Object} Merge result
     */
    merge(options = {}) {
        const eligibility = this.canMerge();

        if (!eligibility.canMerge && !options.force) {
            return {
                success: false,
                reason: eligibility.issues.join(', ')
            };
        }

        this.status = 'merged';
        this.mergedAt = new Date();
        this.mergedBy = options.mergedBy;
        this.mergeMethod = options.method || 'merge'; // merge, squash, rebase

        return {
            success: true,
            mergedAt: this.mergedAt,
            mergeMethod: this.mergeMethod
        };
    }

    /**
     * Closes the PR without merging
     */
    close() {
        this.status = 'closed';
        this.closedAt = new Date();
    }

    /**
     * Gets PR summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            branches: `${this.sourceBranch} → ${this.targetBranch}`,
            status: this.status,
            commits: this.commits.length,
            comments: this.comments.length,
            reviews: this.reviews.length,
            approvals: this.reviews.filter(r => r.status === 'approved').length
        };
    }
}

/**
 * PRReviewer assists with code review process.
 */
class PRReviewer {
    constructor() {
        this.checklist = this.getDefaultChecklist();
    }

    /**
     * Gets default review checklist
     * @returns {Array} Checklist items
     */
    getDefaultChecklist() {
        return [
            { category: 'Code Quality', items: [
                'Code is readable and self-documenting',
                'Functions are focused and not too long',
                'No code duplication',
                'Proper error handling'
            ]},
            { category: 'Testing', items: [
                'Tests cover new functionality',
                'Edge cases are handled',
                'Tests are meaningful (not just for coverage)',
                'All tests pass'
            ]},
            { category: 'Security', items: [
                'No hardcoded secrets',
                'Input validation present',
                'No SQL injection vulnerabilities',
                'Authentication/authorization checked'
            ]},
            { category: 'Performance', items: [
                'No obvious performance issues',
                'Database queries optimized',
                'No unnecessary loops or operations',
                'Appropriate caching considered'
            ]},
            { category: 'Documentation', items: [
                'Code comments where needed',
                'README updated if needed',
                'API documentation updated',
                'Breaking changes documented'
            ]}
        ];
    }

    /**
     * Reviews a PR
     * @param {PullRequest} pr - PR to review
     * @param {Object} findings - Review findings
     * @returns {Object} Review result
     */
    review(pr, findings) {
        const review = {
            pr: pr.id,
            timestamp: new Date(),
            checklist: findings.checklist || {},
            comments: findings.comments || [],
            overallStatus: 'commented'
        };

        // Determine status based on findings
        if (findings.blockers && findings.blockers.length > 0) {
            review.overallStatus = 'changes_requested';
            review.blockers = findings.blockers;
        } else if (findings.approved) {
            review.overallStatus = 'approved';
        }

        return review;
    }

    /**
     * Generates review comment templates
     * @returns {Object} Templates
     */
    static getCommentTemplates() {
        return {
            suggestion: (code) => `**Suggestion:**\n\`\`\`suggestion\n${code}\n\`\`\``,
            question: (text) => `**Question:** ${text}`,
            nit: (text) => `**Nit:** ${text}`,
            blocker: (text) => `**Blocker:** ${text}`,
            praise: (text) => `👍 ${text}`
        };
    }
}

/**
 * PRWorkflow defines common PR workflow patterns.
 */
class PRWorkflow {
    /**
     * Gets branch naming conventions
     * @returns {Object} Conventions
     */
    static getBranchConventions() {
        return {
            feature: 'feature/{ticket-id}-{short-description}',
            bugfix: 'bugfix/{ticket-id}-{short-description}',
            hotfix: 'hotfix/{ticket-id}-{short-description}',
            release: 'release/{version}',
            examples: [
                'feature/PROJ-123-add-user-auth',
                'bugfix/PROJ-456-fix-login-error',
                'hotfix/PROJ-789-security-patch',
                'release/v1.2.0'
            ]
        };
    }

    /**
     * Gets PR title conventions
     * @returns {Object} Conventions
     */
    static getTitleConventions() {
        return {
            format: '[{type}] {ticket}: {description}',
            types: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
            examples: [
                '[feat] PROJ-123: Add user authentication',
                '[fix] PROJ-456: Fix login validation error',
                '[docs] PROJ-789: Update API documentation',
                '[refactor] PROJ-101: Simplify user service'
            ]
        };
    }

    /**
     * Gets PR template
     * @returns {string} Template
     */
    static getPRTemplate() {
        return `## Description
<!-- Describe your changes in detail -->

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Related Issues
<!-- Link to related issues: Fixes #123 -->

## Testing
<!-- Describe testing performed -->
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings introduced

## Screenshots (if applicable)
<!-- Add screenshots for UI changes -->
`;
    }

    /**
     * Gets merge strategy options
     * @returns {Array} Strategies
     */
    static getMergeStrategies() {
        return [
            {
                strategy: 'merge',
                description: 'Create a merge commit',
                pros: ['Preserves full history', 'Shows branch context'],
                cons: ['Can clutter history', 'More complex git log']
            },
            {
                strategy: 'squash',
                description: 'Combine all commits into one',
                pros: ['Clean history', 'One commit per feature'],
                cons: ['Loses individual commit detail', 'Harder to bisect']
            },
            {
                strategy: 'rebase',
                description: 'Rebase commits onto target branch',
                pros: ['Linear history', 'Clean commit log'],
                cons: ['Rewrites history', 'Can be confusing']
            }
        ];
    }
}

/**
 * PRMetrics tracks PR-related metrics.
 */
class PRMetrics {
    constructor() {
        this.prs = [];
    }

    /**
     * Adds a PR for tracking
     * @param {PullRequest} pr - PR to track
     */
    track(pr) {
        this.prs.push({
            id: pr.id,
            createdAt: pr.createdAt,
            mergedAt: pr.mergedAt,
            closedAt: pr.closedAt,
            status: pr.status,
            commits: pr.commits.length,
            comments: pr.comments.length,
            reviews: pr.reviews.length,
            author: pr.author
        });
    }

    /**
     * Calculates average time to merge
     * @returns {Object} Metrics
     */
    calculateCycleTime() {
        const merged = this.prs.filter(pr => pr.status === 'merged' && pr.mergedAt);

        if (merged.length === 0) {
            return { avgCycleTime: null, message: 'No merged PRs' };
        }

        const cycleTimes = merged.map(pr =>
            (new Date(pr.mergedAt) - new Date(pr.createdAt)) / (1000 * 60 * 60)
        );

        const avgHours = cycleTimes.reduce((a, b) => a + b, 0) / cycleTimes.length;

        return {
            avgCycleTimeHours: avgHours.toFixed(2),
            avgCycleTimeDays: (avgHours / 24).toFixed(2),
            minHours: Math.min(...cycleTimes).toFixed(2),
            maxHours: Math.max(...cycleTimes).toFixed(2),
            sampleSize: merged.length
        };
    }

    /**
     * Gets review statistics
     * @returns {Object} Review stats
     */
    getReviewStats() {
        const totalReviews = this.prs.reduce((sum, pr) => sum + pr.reviews, 0);
        const totalComments = this.prs.reduce((sum, pr) => sum + pr.comments, 0);

        return {
            totalPRs: this.prs.length,
            totalReviews,
            totalComments,
            avgReviewsPerPR: (totalReviews / this.prs.length).toFixed(2),
            avgCommentsPerPR: (totalComments / this.prs.length).toFixed(2)
        };
    }
}

// Demonstration
console.log('=== Pull Request Demo ===\n');

// Create a PR
console.log('--- Creating Pull Request ---');
const pr = new PullRequest({
    title: '[feat] PROJ-123: Add user authentication',
    description: 'Implements JWT-based authentication for the API',
    author: 'alice',
    sourceBranch: 'feature/PROJ-123-user-auth',
    targetBranch: 'main',
    reviewers: ['bob', 'carol'],
    labels: ['feature', 'backend']
});

// Add commits
pr.addCommit({ message: 'Add auth middleware', author: 'alice' });
pr.addCommit({ message: 'Add login endpoint', author: 'alice' });
pr.addCommit({ message: 'Add JWT token generation', author: 'alice' });

console.log('PR Summary:', pr.getSummary());

// Add CI checks
console.log('\n--- CI Checks ---');
pr.addCheck({ name: 'unit-tests', status: 'passed' });
pr.addCheck({ name: 'lint', status: 'passed' });
pr.addCheck({ name: 'build', status: 'passed' });
pr.addCheck({ name: 'security-scan', status: 'passed' });

console.log('Checks:', pr.checks.map(c => `${c.name}: ${c.status}`));

// Add comments and reviews
console.log('\n--- Code Review ---');
pr.addComment({
    author: 'bob',
    body: 'Looks good! One question about the token expiry.',
    file: 'auth/jwt.js',
    line: 42
});

pr.addReview({
    reviewer: 'bob',
    status: 'approved',
    comments: ['Great implementation!']
});

pr.addReview({
    reviewer: 'carol',
    status: 'approved',
    comments: ['LGTM']
});

// Check merge eligibility
console.log('\n--- Merge Eligibility ---');
console.log(pr.canMerge());

// Merge the PR
console.log('\n--- Merging ---');
const mergeResult = pr.merge({ mergedBy: 'alice', method: 'squash' });
console.log('Merge Result:', mergeResult);
console.log('Final Status:', pr.status);

// Workflow conventions
console.log('\n--- PR Conventions ---');
console.log('Branch naming:', PRWorkflow.getBranchConventions().examples);
console.log('Title format:', PRWorkflow.getTitleConventions().format);
console.log('Merge strategies:', PRWorkflow.getMergeStrategies().map(s => s.strategy));

// Review checklist
console.log('\n--- Review Checklist ---');
const reviewer = new PRReviewer();
console.log('Categories:', reviewer.checklist.map(c => c.category));

/**
 * Best Practices for Pull Requests:
 *
 * 1. Keep PRs small and focused (< 400 lines ideal)
 * 2. Write clear, descriptive titles and descriptions
 * 3. Include relevant tests with your changes
 * 4. Request reviews from appropriate team members
 * 5. Respond promptly to review feedback
 * 6. Use PR templates for consistency
 * 7. Link related issues and tickets
 * 8. Run all checks locally before pushing
 * 9. Use meaningful commit messages
 * 10. Squash commits for clean history if appropriate
 */
