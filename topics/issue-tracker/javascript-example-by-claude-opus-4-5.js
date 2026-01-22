/**
 * Issue Tracker - Managing Bugs and Tasks
 *
 * An issue tracker is a software tool that allows organizations to manage
 * and track bugs, issues, and tasks within a project. It provides a
 * centralized location for tracking and resolving issues, enabling
 * better collaboration and communication within teams.
 *
 * Key Concepts:
 * - Issue creation with details and priority
 * - Assignment and status tracking
 * - Commenting and collaboration
 * - Reporting and analytics
 */

/**
 * Issue represents a tracked item in the system.
 * Contains all information about a bug, task, or feature request.
 */
class Issue {
    constructor(options) {
        this.id = options.id || this.generateId();
        this.title = options.title;
        this.description = options.description;
        this.type = options.type || 'bug'; // bug, feature, task, improvement
        this.severity = options.severity || 'medium'; // critical, high, medium, low
        this.priority = options.priority || 'medium'; // highest, high, medium, low, lowest
        this.status = options.status || 'open'; // open, in_progress, resolved, closed
        this.assignee = options.assignee || null;
        this.reporter = options.reporter;
        this.labels = options.labels || [];
        this.comments = [];
        this.attachments = [];
        this.linkedIssues = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.resolvedAt = null;
        this.history = [];

        this.recordHistory('created', 'Issue created');
    }

    /**
     * Generates a unique ID
     * @returns {string} Unique ID
     */
    generateId() {
        return `ISSUE-${Date.now().toString(36).toUpperCase()}`;
    }

    /**
     * Updates the issue status
     * @param {string} newStatus - New status
     * @param {string} userId - User making the change
     */
    updateStatus(newStatus, userId) {
        const oldStatus = this.status;
        this.status = newStatus;
        this.updatedAt = new Date();

        if (newStatus === 'resolved' || newStatus === 'closed') {
            this.resolvedAt = new Date();
        }

        this.recordHistory('status_change', `Status changed from ${oldStatus} to ${newStatus}`, userId);
    }

    /**
     * Assigns the issue to a user
     * @param {string} userId - User to assign to
     * @param {string} assignedBy - User making the assignment
     */
    assign(userId, assignedBy) {
        const oldAssignee = this.assignee;
        this.assignee = userId;
        this.updatedAt = new Date();

        this.recordHistory('assignment', `Assigned from ${oldAssignee || 'unassigned'} to ${userId}`, assignedBy);
    }

    /**
     * Adds a comment to the issue
     * @param {Object} comment - Comment details
     */
    addComment(comment) {
        this.comments.push({
            id: `CMT-${Date.now()}`,
            author: comment.author,
            content: comment.content,
            createdAt: new Date()
        });
        this.updatedAt = new Date();

        this.recordHistory('comment', 'Comment added', comment.author);
    }

    /**
     * Adds a label to the issue
     * @param {string} label - Label to add
     * @param {string} userId - User adding the label
     */
    addLabel(label, userId) {
        if (!this.labels.includes(label)) {
            this.labels.push(label);
            this.updatedAt = new Date();
            this.recordHistory('label_add', `Label '${label}' added`, userId);
        }
    }

    /**
     * Links this issue to another
     * @param {string} issueId - Issue to link to
     * @param {string} linkType - Type of link (blocks, duplicates, relates_to)
     */
    linkIssue(issueId, linkType) {
        this.linkedIssues.push({
            issueId,
            linkType,
            createdAt: new Date()
        });
    }

    /**
     * Records a history entry
     * @param {string} action - Action type
     * @param {string} description - Description
     * @param {string} userId - User who performed the action
     */
    recordHistory(action, description, userId = 'system') {
        this.history.push({
            action,
            description,
            userId,
            timestamp: new Date()
        });
    }

    /**
     * Calculates time to resolution
     * @returns {number|null} Time in milliseconds or null
     */
    getTimeToResolution() {
        if (!this.resolvedAt) return null;
        return this.resolvedAt - this.createdAt;
    }

    /**
     * Gets issue summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            type: this.type,
            status: this.status,
            priority: this.priority,
            assignee: this.assignee,
            labels: this.labels,
            commentCount: this.comments.length
        };
    }
}

/**
 * IssueTracker manages a collection of issues.
 * Provides CRUD operations and querying capabilities.
 */
class IssueTracker {
    constructor(projectName) {
        this.projectName = projectName;
        this.issues = new Map();
        this.labels = new Set();
        this.workflows = new Map();

        // Define default workflow
        this.setWorkflow('default', {
            statuses: ['open', 'in_progress', 'review', 'resolved', 'closed'],
            transitions: {
                'open': ['in_progress', 'closed'],
                'in_progress': ['review', 'open'],
                'review': ['resolved', 'in_progress'],
                'resolved': ['closed', 'open'],
                'closed': ['open']
            }
        });
    }

    /**
     * Sets a workflow for issue types
     * @param {string} name - Workflow name
     * @param {Object} workflow - Workflow definition
     */
    setWorkflow(name, workflow) {
        this.workflows.set(name, workflow);
    }

    /**
     * Creates a new issue
     * @param {Object} issueData - Issue data
     * @returns {Issue} Created issue
     */
    create(issueData) {
        const issue = new Issue(issueData);
        this.issues.set(issue.id, issue);

        // Track labels
        issue.labels.forEach(l => this.labels.add(l));

        console.log(`Created issue: ${issue.id} - ${issue.title}`);
        return issue;
    }

    /**
     * Gets an issue by ID
     * @param {string} id - Issue ID
     * @returns {Issue|null} Issue or null
     */
    get(id) {
        return this.issues.get(id);
    }

    /**
     * Updates an issue
     * @param {string} id - Issue ID
     * @param {Object} updates - Updates to apply
     * @param {string} userId - User making the update
     * @returns {Issue|null} Updated issue or null
     */
    update(id, updates, userId) {
        const issue = this.issues.get(id);
        if (!issue) return null;

        for (const [key, value] of Object.entries(updates)) {
            if (key === 'status') {
                issue.updateStatus(value, userId);
            } else if (key === 'assignee') {
                issue.assign(value, userId);
            } else if (key in issue) {
                const oldValue = issue[key];
                issue[key] = value;
                issue.recordHistory('update', `${key} changed from ${oldValue} to ${value}`, userId);
            }
        }

        issue.updatedAt = new Date();
        return issue;
    }

    /**
     * Searches issues with filters
     * @param {Object} filters - Search filters
     * @returns {Array} Matching issues
     */
    search(filters = {}) {
        let results = Array.from(this.issues.values());

        if (filters.status) {
            results = results.filter(i => i.status === filters.status);
        }

        if (filters.assignee) {
            results = results.filter(i => i.assignee === filters.assignee);
        }

        if (filters.type) {
            results = results.filter(i => i.type === filters.type);
        }

        if (filters.priority) {
            results = results.filter(i => i.priority === filters.priority);
        }

        if (filters.label) {
            results = results.filter(i => i.labels.includes(filters.label));
        }

        if (filters.text) {
            const searchText = filters.text.toLowerCase();
            results = results.filter(i =>
                i.title.toLowerCase().includes(searchText) ||
                i.description.toLowerCase().includes(searchText)
            );
        }

        // Sort by priority and creation date
        const priorityOrder = { highest: 0, high: 1, medium: 2, low: 3, lowest: 4 };
        results.sort((a, b) => {
            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            return priorityDiff !== 0 ? priorityDiff : b.createdAt - a.createdAt;
        });

        return results;
    }

    /**
     * Gets issues assigned to a user
     * @param {string} userId - User ID
     * @returns {Array} User's issues
     */
    getAssignedTo(userId) {
        return this.search({ assignee: userId });
    }

    /**
     * Gets open issues
     * @returns {Array} Open issues
     */
    getOpen() {
        return this.search({ status: 'open' });
    }

    /**
     * Validates a status transition
     * @param {Issue} issue - Issue to transition
     * @param {string} newStatus - Target status
     * @returns {boolean} True if valid
     */
    canTransition(issue, newStatus) {
        const workflow = this.workflows.get('default');
        const validTransitions = workflow.transitions[issue.status] || [];
        return validTransitions.includes(newStatus);
    }

    /**
     * Gets all labels in use
     * @returns {Array} Labels
     */
    getLabels() {
        return Array.from(this.labels);
    }

    /**
     * Gets tracker statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const issues = Array.from(this.issues.values());

        const byStatus = {};
        const byType = {};
        const byPriority = {};

        for (const issue of issues) {
            byStatus[issue.status] = (byStatus[issue.status] || 0) + 1;
            byType[issue.type] = (byType[issue.type] || 0) + 1;
            byPriority[issue.priority] = (byPriority[issue.priority] || 0) + 1;
        }

        const resolved = issues.filter(i => i.resolvedAt);
        const avgResolutionTime = resolved.length > 0
            ? resolved.reduce((sum, i) => sum + i.getTimeToResolution(), 0) / resolved.length
            : 0;

        return {
            total: issues.length,
            open: byStatus['open'] || 0,
            inProgress: byStatus['in_progress'] || 0,
            resolved: byStatus['resolved'] || 0,
            closed: byStatus['closed'] || 0,
            byType,
            byPriority,
            avgResolutionTime: `${Math.round(avgResolutionTime / (1000 * 60 * 60))} hours`
        };
    }
}

/**
 * IssueReporter generates reports from issue data.
 * Provides various reporting formats and analytics.
 */
class IssueReporter {
    constructor(tracker) {
        this.tracker = tracker;
    }

    /**
     * Generates summary report
     * @returns {Object} Summary report
     */
    summaryReport() {
        const stats = this.tracker.getStatistics();

        return {
            project: this.tracker.projectName,
            generatedAt: new Date().toISOString(),
            statistics: stats,
            openIssues: this.tracker.getOpen().map(i => i.getSummary())
        };
    }

    /**
     * Generates workload report by assignee
     * @returns {Object} Workload report
     */
    workloadReport() {
        const issues = Array.from(this.tracker.issues.values());
        const workload = {};

        for (const issue of issues) {
            if (issue.assignee && issue.status !== 'closed') {
                if (!workload[issue.assignee]) {
                    workload[issue.assignee] = { total: 0, byPriority: {} };
                }
                workload[issue.assignee].total++;
                workload[issue.assignee].byPriority[issue.priority] =
                    (workload[issue.assignee].byPriority[issue.priority] || 0) + 1;
            }
        }

        return {
            project: this.tracker.projectName,
            generatedAt: new Date().toISOString(),
            workload
        };
    }

    /**
     * Generates resolution time report
     * @returns {Object} Resolution time report
     */
    resolutionTimeReport() {
        const resolved = Array.from(this.tracker.issues.values())
            .filter(i => i.resolvedAt);

        const byType = {};
        const byPriority = {};

        for (const issue of resolved) {
            const time = issue.getTimeToResolution();

            if (!byType[issue.type]) {
                byType[issue.type] = { times: [], count: 0 };
            }
            byType[issue.type].times.push(time);
            byType[issue.type].count++;

            if (!byPriority[issue.priority]) {
                byPriority[issue.priority] = { times: [], count: 0 };
            }
            byPriority[issue.priority].times.push(time);
            byPriority[issue.priority].count++;
        }

        // Calculate averages
        for (const type of Object.keys(byType)) {
            const times = byType[type].times;
            byType[type].average = Math.round(
                times.reduce((a, b) => a + b, 0) / times.length / (1000 * 60 * 60)
            ) + ' hours';
            delete byType[type].times;
        }

        for (const priority of Object.keys(byPriority)) {
            const times = byPriority[priority].times;
            byPriority[priority].average = Math.round(
                times.reduce((a, b) => a + b, 0) / times.length / (1000 * 60 * 60)
            ) + ' hours';
            delete byPriority[priority].times;
        }

        return {
            project: this.tracker.projectName,
            generatedAt: new Date().toISOString(),
            resolvedCount: resolved.length,
            byType,
            byPriority
        };
    }
}

/**
 * NotificationService sends notifications for issue events.
 */
class NotificationService {
    constructor() {
        this.subscribers = new Map();
    }

    /**
     * Subscribes to issue events
     * @param {string} userId - User to notify
     * @param {Array} events - Events to subscribe to
     */
    subscribe(userId, events) {
        this.subscribers.set(userId, events);
    }

    /**
     * Sends notification for an event
     * @param {string} event - Event type
     * @param {Issue} issue - Related issue
     */
    notify(event, issue) {
        for (const [userId, events] of this.subscribers) {
            if (events.includes(event) || events.includes('all')) {
                console.log(`Notification to ${userId}: ${event} on ${issue.id}`);
            }
        }

        // Always notify assignee
        if (issue.assignee) {
            console.log(`Notification to ${issue.assignee}: ${event} on ${issue.id}`);
        }
    }
}

// Demonstration
console.log('=== Issue Tracker Demo ===\n');

// Create tracker
const tracker = new IssueTracker('MyProject');

// Create issues
const bug1 = tracker.create({
    title: 'Login button not working on mobile',
    description: 'Users report that the login button is unresponsive on iOS devices',
    type: 'bug',
    severity: 'high',
    priority: 'high',
    reporter: 'user1',
    labels: ['mobile', 'authentication', 'critical']
});

const feature1 = tracker.create({
    title: 'Add dark mode support',
    description: 'Implement dark mode theme option for the application',
    type: 'feature',
    priority: 'medium',
    reporter: 'user2',
    labels: ['ui', 'enhancement']
});

const task1 = tracker.create({
    title: 'Update dependencies',
    description: 'Update all npm packages to latest versions',
    type: 'task',
    priority: 'low',
    reporter: 'user1',
    labels: ['maintenance']
});

// Work on issues
bug1.assign('developer1', 'manager1');
bug1.addComment({ author: 'developer1', content: 'Investigating the issue' });
bug1.updateStatus('in_progress', 'developer1');

feature1.assign('developer2', 'manager1');

// Add more comments
bug1.addComment({ author: 'developer1', content: 'Found the root cause - CSS issue' });
bug1.updateStatus('review', 'developer1');
bug1.updateStatus('resolved', 'reviewer1');

console.log('--- Issue Summary ---');
console.log('Bug:', bug1.getSummary());
console.log('Feature:', feature1.getSummary());
console.log('Task:', task1.getSummary());

// Search issues
console.log('\n--- Search Results ---');
console.log('Open issues:', tracker.search({ status: 'open' }).map(i => i.title));
console.log('High priority:', tracker.search({ priority: 'high' }).map(i => i.title));
console.log('Bug label:', tracker.search({ label: 'mobile' }).map(i => i.title));

// Statistics
console.log('\n--- Statistics ---');
console.log(tracker.getStatistics());

// Generate reports
console.log('\n--- Reports ---');
const reporter = new IssueReporter(tracker);
console.log('Summary Report:', reporter.summaryReport().statistics);
console.log('Workload Report:', reporter.workloadReport().workload);

// Issue history
console.log('\n--- Issue History ---');
console.log(`History for ${bug1.id}:`);
bug1.history.forEach(h => {
    console.log(`  [${h.timestamp.toISOString().slice(11, 19)}] ${h.action}: ${h.description}`);
});

/**
 * Best Practices for Issue Tracking:
 *
 * 1. Write clear, descriptive issue titles
 * 2. Include steps to reproduce for bugs
 * 3. Set appropriate priority and severity
 * 4. Assign issues promptly
 * 5. Keep issue status up to date
 * 6. Use labels for categorization
 * 7. Link related issues
 * 8. Comment with progress updates
 * 9. Close issues when truly resolved
 * 10. Review and triage regularly
 */
