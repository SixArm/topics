/**
 * DORA Metrics - DevOps Research and Assessment Key Performance Indicators
 *
 * DORA metrics are KPIs used to evaluate software development and delivery
 * processes, focusing on improving productivity, quality, and speed. These
 * metrics help organizations identify areas for improvement in DevOps practices.
 *
 * Four Key Metrics:
 * - Lead Time for Changes: Time from commit to deployment
 * - Deployment Frequency: How often new changes are deployed
 * - Mean Time to Restore (MTTR): Average recovery time after failure
 * - Change Failure Rate: Percentage of changes causing failures
 */

/**
 * LeadTimeTracker measures the time from code commit to production deployment.
 * Tracks the efficiency of the delivery pipeline.
 */
class LeadTimeTracker {
    constructor() {
        this.changes = [];
    }

    /**
     * Records a code commit
     * @param {string} changeId - Unique change identifier
     * @param {string} author - Commit author
     * @returns {Object} Change record
     */
    recordCommit(changeId, author) {
        const change = {
            id: changeId,
            author,
            commitTime: new Date(),
            stages: {
                commit: new Date()
            },
            deployed: false
        };

        this.changes.push(change);
        console.log(`Recorded commit: ${changeId} by ${author}`);
        return change;
    }

    /**
     * Records when a change passes through a pipeline stage
     * @param {string} changeId - Change identifier
     * @param {string} stage - Stage name (review, build, test, staging, production)
     */
    recordStage(changeId, stage) {
        const change = this.changes.find(c => c.id === changeId);
        if (change) {
            change.stages[stage] = new Date();
            console.log(`  ${changeId} reached stage: ${stage}`);
        }
    }

    /**
     * Records deployment completion
     * @param {string} changeId - Change identifier
     */
    recordDeployment(changeId) {
        const change = this.changes.find(c => c.id === changeId);
        if (change) {
            change.stages.production = new Date();
            change.deployed = true;
            change.leadTime = change.stages.production - change.commitTime;
            console.log(`  ${changeId} deployed (lead time: ${this.formatDuration(change.leadTime)})`);
        }
    }

    /**
     * Calculates average lead time
     * @param {number} daysBack - Number of days to analyze
     * @returns {Object} Lead time statistics
     */
    getLeadTimeStats(daysBack = 30) {
        const cutoff = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);
        const deployed = this.changes.filter(c =>
            c.deployed && c.commitTime >= cutoff
        );

        if (deployed.length === 0) {
            return { averageLeadTime: 'N/A', count: 0 };
        }

        const leadTimes = deployed.map(c => c.leadTime);
        const avgMs = leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length;
        const minMs = Math.min(...leadTimes);
        const maxMs = Math.max(...leadTimes);

        return {
            count: deployed.length,
            averageLeadTime: this.formatDuration(avgMs),
            minLeadTime: this.formatDuration(minMs),
            maxLeadTime: this.formatDuration(maxMs),
            averageHours: (avgMs / (1000 * 60 * 60)).toFixed(2)
        };
    }

    /**
     * Gets lead time by stage breakdown
     * @returns {Object} Time spent in each stage
     */
    getStageBreakdown() {
        const deployed = this.changes.filter(c => c.deployed);

        if (deployed.length === 0) return {};

        const stageOrder = ['commit', 'review', 'build', 'test', 'staging', 'production'];
        const stageTimes = {};

        for (const stage of stageOrder) {
            stageTimes[stage] = [];
        }

        for (const change of deployed) {
            for (let i = 0; i < stageOrder.length - 1; i++) {
                const current = stageOrder[i];
                const next = stageOrder[i + 1];

                if (change.stages[current] && change.stages[next]) {
                    const duration = change.stages[next] - change.stages[current];
                    stageTimes[current].push(duration);
                }
            }
        }

        const breakdown = {};
        for (const [stage, times] of Object.entries(stageTimes)) {
            if (times.length > 0) {
                const avg = times.reduce((a, b) => a + b, 0) / times.length;
                breakdown[stage] = this.formatDuration(avg);
            }
        }

        return breakdown;
    }

    /**
     * Formats duration in human-readable format
     * @param {number} ms - Duration in milliseconds
     * @returns {string} Formatted duration
     */
    formatDuration(ms) {
        if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
        if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
        if (ms < 86400000) return `${(ms / 3600000).toFixed(1)}h`;
        return `${(ms / 86400000).toFixed(1)}d`;
    }
}

/**
 * DeploymentFrequencyTracker tracks how often deployments occur.
 * Higher frequency typically indicates healthier DevOps practices.
 */
class DeploymentFrequencyTracker {
    constructor() {
        this.deployments = [];
    }

    /**
     * Records a deployment
     * @param {Object} deployment - Deployment details
     */
    recordDeployment(deployment) {
        this.deployments.push({
            id: deployment.id || `deploy-${Date.now()}`,
            environment: deployment.environment || 'production',
            version: deployment.version,
            timestamp: new Date(),
            success: deployment.success !== false,
            author: deployment.author
        });
    }

    /**
     * Calculates deployment frequency
     * @param {number} daysBack - Number of days to analyze
     * @returns {Object} Frequency statistics
     */
    getFrequencyStats(daysBack = 30) {
        const cutoff = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);
        const recent = this.deployments.filter(d =>
            d.timestamp >= cutoff && d.environment === 'production'
        );

        const deploysPerDay = recent.length / daysBack;

        // Classify frequency
        let classification;
        if (deploysPerDay >= 1) classification = 'Elite';
        else if (deploysPerDay >= 1/7) classification = 'High';
        else if (deploysPerDay >= 1/30) classification = 'Medium';
        else classification = 'Low';

        return {
            totalDeployments: recent.length,
            period: `${daysBack} days`,
            deploymentsPerDay: deploysPerDay.toFixed(2),
            deploymentsPerWeek: (deploysPerDay * 7).toFixed(2),
            classification
        };
    }

    /**
     * Gets deployment trend over time
     * @param {number} weeks - Number of weeks to analyze
     * @returns {Array} Weekly deployment counts
     */
    getWeeklyTrend(weeks = 12) {
        const trend = [];
        const now = Date.now();
        const weekMs = 7 * 24 * 60 * 60 * 1000;

        for (let i = weeks - 1; i >= 0; i--) {
            const weekStart = new Date(now - (i + 1) * weekMs);
            const weekEnd = new Date(now - i * weekMs);

            const count = this.deployments.filter(d =>
                d.timestamp >= weekStart && d.timestamp < weekEnd
            ).length;

            trend.push({
                week: `Week ${weeks - i}`,
                deployments: count
            });
        }

        return trend;
    }
}

/**
 * MTTRTracker tracks Mean Time To Restore after incidents.
 * Measures how quickly teams can recover from failures.
 */
class MTTRTracker {
    constructor() {
        this.incidents = [];
    }

    /**
     * Records a new incident
     * @param {Object} incident - Incident details
     * @returns {string} Incident ID
     */
    recordIncident(incident) {
        const id = `inc-${Date.now()}`;
        this.incidents.push({
            id,
            title: incident.title,
            severity: incident.severity || 'medium',
            startTime: new Date(),
            endTime: null,
            resolved: false,
            rootCause: null,
            actions: []
        });

        console.log(`Incident recorded: ${id} - ${incident.title}`);
        return id;
    }

    /**
     * Records an action taken during incident
     * @param {string} incidentId - Incident ID
     * @param {string} action - Action description
     */
    recordAction(incidentId, action) {
        const incident = this.incidents.find(i => i.id === incidentId);
        if (incident) {
            incident.actions.push({
                action,
                timestamp: new Date()
            });
        }
    }

    /**
     * Resolves an incident
     * @param {string} incidentId - Incident ID
     * @param {string} rootCause - Root cause description
     */
    resolveIncident(incidentId, rootCause) {
        const incident = this.incidents.find(i => i.id === incidentId);
        if (incident) {
            incident.endTime = new Date();
            incident.resolved = true;
            incident.rootCause = rootCause;
            incident.duration = incident.endTime - incident.startTime;

            console.log(`Incident resolved: ${incidentId} (${this.formatDuration(incident.duration)})`);
        }
    }

    /**
     * Calculates MTTR statistics
     * @param {number} daysBack - Number of days to analyze
     * @returns {Object} MTTR statistics
     */
    getMTTRStats(daysBack = 30) {
        const cutoff = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);
        const resolved = this.incidents.filter(i =>
            i.resolved && i.startTime >= cutoff
        );

        if (resolved.length === 0) {
            return { mttr: 'N/A', count: 0 };
        }

        const durations = resolved.map(i => i.duration);
        const avgMs = durations.reduce((a, b) => a + b, 0) / durations.length;

        // Classify MTTR
        let classification;
        const avgHours = avgMs / (1000 * 60 * 60);
        if (avgHours < 1) classification = 'Elite';
        else if (avgHours < 24) classification = 'High';
        else if (avgHours < 168) classification = 'Medium';
        else classification = 'Low';

        return {
            count: resolved.length,
            mttr: this.formatDuration(avgMs),
            mttrHours: avgHours.toFixed(2),
            minRecovery: this.formatDuration(Math.min(...durations)),
            maxRecovery: this.formatDuration(Math.max(...durations)),
            classification
        };
    }

    /**
     * Gets incidents by severity
     * @returns {Object} Incident counts by severity
     */
    getIncidentsBySeverity() {
        const bySeverity = { critical: 0, high: 0, medium: 0, low: 0 };

        for (const incident of this.incidents) {
            if (bySeverity[incident.severity] !== undefined) {
                bySeverity[incident.severity]++;
            }
        }

        return bySeverity;
    }

    /**
     * Formats duration
     * @param {number} ms - Duration in milliseconds
     * @returns {string} Formatted duration
     */
    formatDuration(ms) {
        if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
        if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
        if (ms < 86400000) return `${(ms / 3600000).toFixed(1)}h`;
        return `${(ms / 86400000).toFixed(1)}d`;
    }
}

/**
 * ChangeFailureRateTracker tracks the percentage of changes causing failures.
 * Lower rates indicate better testing and deployment practices.
 */
class ChangeFailureRateTracker {
    constructor() {
        this.changes = [];
    }

    /**
     * Records a change/deployment
     * @param {Object} change - Change details
     */
    recordChange(change) {
        this.changes.push({
            id: change.id || `change-${Date.now()}`,
            timestamp: new Date(),
            type: change.type || 'deployment',
            success: true,
            causedFailure: false,
            failureDetails: null
        });
    }

    /**
     * Records that a change caused a failure
     * @param {string} changeId - Change that caused failure
     * @param {string} details - Failure details
     */
    recordFailure(changeId, details) {
        const change = this.changes.find(c => c.id === changeId);
        if (change) {
            change.causedFailure = true;
            change.failureDetails = details;
            console.log(`Change ${changeId} caused failure: ${details}`);
        }
    }

    /**
     * Calculates change failure rate
     * @param {number} daysBack - Number of days to analyze
     * @returns {Object} Failure rate statistics
     */
    getFailureRateStats(daysBack = 30) {
        const cutoff = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);
        const recent = this.changes.filter(c => c.timestamp >= cutoff);

        if (recent.length === 0) {
            return { rate: 'N/A', count: 0 };
        }

        const failures = recent.filter(c => c.causedFailure).length;
        const rate = (failures / recent.length) * 100;

        // Classify failure rate
        let classification;
        if (rate <= 15) classification = 'Elite';
        else if (rate <= 30) classification = 'High';
        else if (rate <= 45) classification = 'Medium';
        else classification = 'Low';

        return {
            totalChanges: recent.length,
            failures,
            failureRate: `${rate.toFixed(1)}%`,
            successRate: `${(100 - rate).toFixed(1)}%`,
            classification
        };
    }

    /**
     * Gets failure trend over time
     * @param {number} weeks - Number of weeks to analyze
     * @returns {Array} Weekly failure rates
     */
    getWeeklyTrend(weeks = 12) {
        const trend = [];
        const now = Date.now();
        const weekMs = 7 * 24 * 60 * 60 * 1000;

        for (let i = weeks - 1; i >= 0; i--) {
            const weekStart = new Date(now - (i + 1) * weekMs);
            const weekEnd = new Date(now - i * weekMs);

            const weekChanges = this.changes.filter(c =>
                c.timestamp >= weekStart && c.timestamp < weekEnd
            );

            const failures = weekChanges.filter(c => c.causedFailure).length;
            const rate = weekChanges.length > 0
                ? ((failures / weekChanges.length) * 100).toFixed(1)
                : 0;

            trend.push({
                week: `Week ${weeks - i}`,
                changes: weekChanges.length,
                failures,
                rate: `${rate}%`
            });
        }

        return trend;
    }
}

/**
 * DORADashboard aggregates all DORA metrics for reporting.
 * Provides a unified view of DevOps performance.
 */
class DORADashboard {
    constructor() {
        this.leadTime = new LeadTimeTracker();
        this.deploymentFrequency = new DeploymentFrequencyTracker();
        this.mttr = new MTTRTracker();
        this.changeFailureRate = new ChangeFailureRateTracker();
    }

    /**
     * Generates comprehensive DORA metrics report
     * @param {number} daysBack - Number of days to analyze
     * @returns {Object} Complete DORA report
     */
    generateReport(daysBack = 30) {
        const leadTimeStats = this.leadTime.getLeadTimeStats(daysBack);
        const frequencyStats = this.deploymentFrequency.getFrequencyStats(daysBack);
        const mttrStats = this.mttr.getMTTRStats(daysBack);
        const failureRateStats = this.changeFailureRate.getFailureRateStats(daysBack);

        // Calculate overall performance level
        const classifications = [
            leadTimeStats.classification,
            frequencyStats.classification,
            mttrStats.classification,
            failureRateStats.classification
        ].filter(c => c);

        const levels = { Elite: 4, High: 3, Medium: 2, Low: 1 };
        const avgLevel = classifications.length > 0
            ? classifications.reduce((sum, c) => sum + (levels[c] || 0), 0) / classifications.length
            : 0;

        let overallLevel;
        if (avgLevel >= 3.5) overallLevel = 'Elite';
        else if (avgLevel >= 2.5) overallLevel = 'High';
        else if (avgLevel >= 1.5) overallLevel = 'Medium';
        else overallLevel = 'Low';

        return {
            period: `Last ${daysBack} days`,
            generatedAt: new Date().toISOString(),
            overallPerformance: overallLevel,
            metrics: {
                leadTimeForChanges: leadTimeStats,
                deploymentFrequency: frequencyStats,
                meanTimeToRestore: mttrStats,
                changeFailureRate: failureRateStats
            }
        };
    }

    /**
     * Prints formatted dashboard
     * @param {number} daysBack - Number of days to analyze
     */
    printDashboard(daysBack = 30) {
        const report = this.generateReport(daysBack);

        console.log(`\n${'='.repeat(50)}`);
        console.log('DORA METRICS DASHBOARD');
        console.log(`Period: ${report.period}`);
        console.log(`Overall Performance: ${report.overallPerformance}`);
        console.log(`${'='.repeat(50)}`);

        console.log('\n1. Lead Time for Changes');
        console.log(`   Average: ${report.metrics.leadTimeForChanges.averageLeadTime || 'N/A'}`);
        console.log(`   Classification: ${report.metrics.leadTimeForChanges.classification || 'N/A'}`);

        console.log('\n2. Deployment Frequency');
        console.log(`   Per Day: ${report.metrics.deploymentFrequency.deploymentsPerDay}`);
        console.log(`   Classification: ${report.metrics.deploymentFrequency.classification}`);

        console.log('\n3. Mean Time to Restore');
        console.log(`   MTTR: ${report.metrics.meanTimeToRestore.mttr || 'N/A'}`);
        console.log(`   Classification: ${report.metrics.meanTimeToRestore.classification || 'N/A'}`);

        console.log('\n4. Change Failure Rate');
        console.log(`   Rate: ${report.metrics.changeFailureRate.failureRate || 'N/A'}`);
        console.log(`   Classification: ${report.metrics.changeFailureRate.classification || 'N/A'}`);
    }
}

// Demonstration
console.log('=== DORA Metrics Demo ===');

// Create dashboard
const dashboard = new DORADashboard();

// Simulate lead time data
const change1 = dashboard.leadTime.recordCommit('feat-123', 'developer@example.com');
dashboard.leadTime.recordStage('feat-123', 'review');
dashboard.leadTime.recordStage('feat-123', 'build');
dashboard.leadTime.recordStage('feat-123', 'test');
dashboard.leadTime.recordStage('feat-123', 'staging');
dashboard.leadTime.recordDeployment('feat-123');

// Simulate deployments
for (let i = 0; i < 15; i++) {
    dashboard.deploymentFrequency.recordDeployment({
        version: `1.0.${i}`,
        success: true
    });
}

// Simulate incidents
const incidentId = dashboard.mttr.recordIncident({
    title: 'API latency spike',
    severity: 'high'
});
dashboard.mttr.recordAction(incidentId, 'Investigating cause');
dashboard.mttr.recordAction(incidentId, 'Identified database bottleneck');
dashboard.mttr.resolveIncident(incidentId, 'Database connection pool exhaustion');

// Simulate change failures
for (let i = 0; i < 10; i++) {
    const changeId = `change-${i}`;
    dashboard.changeFailureRate.recordChange({ id: changeId });
    if (i % 5 === 0) { // 20% failure rate
        dashboard.changeFailureRate.recordFailure(changeId, 'Integration test failure');
    }
}

// Print dashboard
dashboard.printDashboard(30);

/**
 * Best Practices for DORA Metrics:
 *
 * 1. Measure all four metrics together for holistic view
 * 2. Track trends over time, not just point-in-time values
 * 3. Use metrics to identify bottlenecks, not blame individuals
 * 4. Set realistic improvement targets based on current state
 * 5. Automate metric collection to ensure accuracy
 * 6. Review metrics regularly in team retrospectives
 * 7. Focus on continuous improvement, not perfection
 * 8. Consider context when comparing across teams
 * 9. Use metrics to guide investment in tooling and processes
 * 10. Balance speed metrics with quality metrics
 */
