/**
 * Security Information and Event Management (SIEM)
 *
 * Security Information and Event Management (SIEM) is software that provides
 * security professionals with a comprehensive view of their organization's
 * security posture by collecting, aggregating, and analyzing security events
 * from various sources in real-time.
 *
 * Key Concepts:
 * - Log collection and aggregation
 * - Event correlation and analysis
 * - Real-time alerting
 * - Compliance reporting
 */

/**
 * LogSource represents a source of security events.
 */
class LogSource {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.type = options.type; // firewall, server, application, endpoint
        this.format = options.format; // syslog, json, cef, leef
        this.status = 'active';
        this.eventsPerSecond = 0;
        this.lastEvent = null;
    }

    /**
     * Generates a simulated event
     * @returns {Object} Event
     */
    generateEvent() {
        const event = {
            id: `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            sourceId: this.id,
            sourceName: this.name,
            timestamp: new Date(),
            severity: this.randomSeverity(),
            category: this.randomCategory(),
            message: this.randomMessage()
        };

        this.lastEvent = event.timestamp;
        return event;
    }

    /**
     * Gets random severity
     * @returns {string} Severity
     */
    randomSeverity() {
        const severities = ['low', 'medium', 'high', 'critical'];
        const weights = [50, 30, 15, 5];
        const random = Math.random() * 100;
        let cumulative = 0;

        for (let i = 0; i < severities.length; i++) {
            cumulative += weights[i];
            if (random < cumulative) return severities[i];
        }
        return 'low';
    }

    /**
     * Gets random category
     * @returns {string} Category
     */
    randomCategory() {
        const categories = ['authentication', 'authorization', 'network', 'malware', 'system'];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    /**
     * Gets random message
     * @returns {string} Message
     */
    randomMessage() {
        const messages = [
            'Login attempt from unusual location',
            'Firewall blocked suspicious traffic',
            'Failed authentication attempt',
            'Unusual outbound data transfer',
            'Process started with elevated privileges'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }
}

/**
 * EventCollector collects and normalizes events.
 */
class EventCollector {
    constructor() {
        this.sources = new Map();
        this.events = [];
        this.maxEvents = 10000;
    }

    /**
     * Registers a log source
     * @param {LogSource} source - Source to register
     */
    registerSource(source) {
        this.sources.set(source.id, source);
    }

    /**
     * Collects events from all sources
     * @returns {Array} Collected events
     */
    collect() {
        const newEvents = [];

        for (const source of this.sources.values()) {
            // Simulate collecting events
            const eventCount = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < eventCount; i++) {
                const event = source.generateEvent();
                newEvents.push(this.normalize(event));
            }
        }

        this.events = [...newEvents, ...this.events].slice(0, this.maxEvents);
        return newEvents;
    }

    /**
     * Normalizes an event to standard format
     * @param {Object} event - Event to normalize
     * @returns {Object} Normalized event
     */
    normalize(event) {
        return {
            ...event,
            normalizedTimestamp: new Date(event.timestamp).toISOString(),
            severityLevel: this.getSeverityLevel(event.severity),
            tags: this.extractTags(event)
        };
    }

    /**
     * Gets numeric severity level
     * @param {string} severity - Severity string
     * @returns {number} Level
     */
    getSeverityLevel(severity) {
        const levels = { low: 1, medium: 2, high: 3, critical: 4 };
        return levels[severity] || 0;
    }

    /**
     * Extracts tags from event
     * @param {Object} event - Event
     * @returns {Array} Tags
     */
    extractTags(event) {
        const tags = [event.category];
        if (event.severity === 'critical') tags.push('priority');
        return tags;
    }

    /**
     * Gets collection statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const bySeverity = {};
        const byCategory = {};
        const bySource = {};

        for (const event of this.events) {
            bySeverity[event.severity] = (bySeverity[event.severity] || 0) + 1;
            byCategory[event.category] = (byCategory[event.category] || 0) + 1;
            bySource[event.sourceName] = (bySource[event.sourceName] || 0) + 1;
        }

        return {
            totalEvents: this.events.length,
            activeSources: this.sources.size,
            bySeverity,
            byCategory,
            bySource
        };
    }
}

/**
 * CorrelationEngine correlates events to detect patterns.
 */
class CorrelationEngine {
    constructor() {
        this.rules = [];
        this.alerts = [];
    }

    /**
     * Adds a correlation rule
     * @param {Object} rule - Rule definition
     */
    addRule(rule) {
        this.rules.push({
            id: `RULE-${this.rules.length + 1}`,
            name: rule.name,
            description: rule.description,
            condition: rule.condition,
            threshold: rule.threshold || 1,
            timeWindow: rule.timeWindow || 60000, // 1 minute default
            severity: rule.severity || 'medium',
            enabled: rule.enabled !== false
        });
    }

    /**
     * Analyzes events against rules
     * @param {Array} events - Events to analyze
     * @returns {Array} Generated alerts
     */
    analyze(events) {
        const newAlerts = [];

        for (const rule of this.rules) {
            if (!rule.enabled) continue;

            const matchingEvents = events.filter(event =>
                this.matchesCondition(event, rule.condition)
            );

            if (matchingEvents.length >= rule.threshold) {
                const alert = this.createAlert(rule, matchingEvents);
                newAlerts.push(alert);
                this.alerts.push(alert);
            }
        }

        return newAlerts;
    }

    /**
     * Checks if event matches condition
     * @param {Object} event - Event to check
     * @param {Object} condition - Condition to match
     * @returns {boolean} Match result
     */
    matchesCondition(event, condition) {
        for (const [key, value] of Object.entries(condition)) {
            if (Array.isArray(value)) {
                if (!value.includes(event[key])) return false;
            } else if (event[key] !== value) {
                return false;
            }
        }
        return true;
    }

    /**
     * Creates an alert from rule match
     * @param {Object} rule - Matched rule
     * @param {Array} events - Triggering events
     * @returns {Object} Alert
     */
    createAlert(rule, events) {
        return {
            id: `ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            eventCount: events.length,
            firstEvent: events[0]?.timestamp,
            lastEvent: events[events.length - 1]?.timestamp,
            timestamp: new Date(),
            status: 'new',
            summary: `${rule.name}: ${events.length} events detected`
        };
    }

    /**
     * Gets rule statistics
     * @returns {Object} Statistics
     */
    getRuleStatistics() {
        const ruleHits = {};

        for (const alert of this.alerts) {
            ruleHits[alert.ruleId] = (ruleHits[alert.ruleId] || 0) + 1;
        }

        return {
            totalRules: this.rules.length,
            enabledRules: this.rules.filter(r => r.enabled).length,
            totalAlerts: this.alerts.length,
            alertsByRule: ruleHits
        };
    }
}

/**
 * AlertManager manages security alerts.
 */
class AlertManager {
    constructor() {
        this.alerts = [];
        this.handlers = [];
    }

    /**
     * Adds an alert handler
     * @param {Object} handler - Handler configuration
     */
    addHandler(handler) {
        this.handlers.push({
            name: handler.name,
            severities: handler.severities || ['critical', 'high'],
            action: handler.action,
            enabled: handler.enabled !== false
        });
    }

    /**
     * Processes a new alert
     * @param {Object} alert - Alert to process
     */
    processAlert(alert) {
        this.alerts.push(alert);

        for (const handler of this.handlers) {
            if (handler.enabled && handler.severities.includes(alert.severity)) {
                handler.action(alert);
            }
        }
    }

    /**
     * Updates alert status
     * @param {string} alertId - Alert ID
     * @param {string} status - New status
     * @param {string} analyst - Analyst making change
     */
    updateStatus(alertId, status, analyst) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.status = status;
            alert.updatedBy = analyst;
            alert.updatedAt = new Date();
        }
    }

    /**
     * Gets alert summary
     * @returns {Object} Summary
     */
    getSummary() {
        const byStatus = {};
        const bySeverity = {};

        for (const alert of this.alerts) {
            byStatus[alert.status] = (byStatus[alert.status] || 0) + 1;
            bySeverity[alert.severity] = (bySeverity[alert.severity] || 0) + 1;
        }

        return {
            total: this.alerts.length,
            byStatus,
            bySeverity,
            openCritical: this.alerts.filter(a =>
                a.severity === 'critical' && a.status !== 'closed'
            ).length
        };
    }
}

/**
 * ComplianceReporter generates compliance reports.
 */
class ComplianceReporter {
    /**
     * Generates a compliance report
     * @param {Object} data - SIEM data
     * @param {string} framework - Compliance framework
     * @returns {Object} Report
     */
    static generate(data, framework) {
        const requirements = this.getRequirements(framework);
        const findings = [];

        for (const requirement of requirements) {
            const status = this.checkRequirement(requirement, data);
            findings.push({
                requirement: requirement.id,
                description: requirement.description,
                status: status.met ? 'compliant' : 'non-compliant',
                evidence: status.evidence,
                gaps: status.gaps
            });
        }

        const compliant = findings.filter(f => f.status === 'compliant').length;

        return {
            framework,
            generatedAt: new Date(),
            totalRequirements: requirements.length,
            compliant,
            nonCompliant: requirements.length - compliant,
            complianceRate: ((compliant / requirements.length) * 100).toFixed(1) + '%',
            findings
        };
    }

    /**
     * Gets requirements for a framework
     * @param {string} framework - Framework name
     * @returns {Array} Requirements
     */
    static getRequirements(framework) {
        const frameworks = {
            'PCI-DSS': [
                { id: '10.1', description: 'Implement audit trails', check: 'logging' },
                { id: '10.2', description: 'Automate audit logs', check: 'automated_logging' },
                { id: '10.5', description: 'Secure audit trails', check: 'log_integrity' },
                { id: '10.6', description: 'Review logs', check: 'log_review' }
            ],
            'SOC2': [
                { id: 'CC6.1', description: 'Logical access security', check: 'access_monitoring' },
                { id: 'CC6.6', description: 'Monitor system components', check: 'system_monitoring' },
                { id: 'CC7.2', description: 'Monitor for anomalies', check: 'anomaly_detection' }
            ],
            'HIPAA': [
                { id: '164.312(b)', description: 'Audit controls', check: 'audit_controls' },
                { id: '164.308(a)(5)', description: 'Security awareness', check: 'alerting' }
            ]
        };

        return frameworks[framework] || [];
    }

    /**
     * Checks a requirement
     * @param {Object} requirement - Requirement to check
     * @param {Object} data - SIEM data
     * @returns {Object} Check result
     */
    static checkRequirement(requirement, data) {
        // Simplified check logic
        const checks = {
            logging: data.loggingEnabled,
            automated_logging: data.automatedLogging,
            log_integrity: data.logIntegrity,
            log_review: data.logReviewProcess,
            access_monitoring: data.accessMonitoring,
            system_monitoring: data.systemMonitoring,
            anomaly_detection: data.anomalyDetection,
            audit_controls: data.auditControls,
            alerting: data.alertingEnabled
        };

        const met = checks[requirement.check] === true;

        return {
            met,
            evidence: met ? [`${requirement.check} is implemented`] : [],
            gaps: met ? [] : [`${requirement.check} is not implemented`]
        };
    }
}

/**
 * SIEMDashboard provides dashboard metrics.
 */
class SIEMDashboard {
    /**
     * Gets dashboard metrics
     * @param {Object} collector - Event collector
     * @param {Object} correlationEngine - Correlation engine
     * @param {Object} alertManager - Alert manager
     * @returns {Object} Dashboard data
     */
    static getMetrics(collector, correlationEngine, alertManager) {
        return {
            timestamp: new Date(),
            overview: {
                totalEvents: collector.events.length,
                totalAlerts: alertManager.alerts.length,
                activeRules: correlationEngine.rules.filter(r => r.enabled).length,
                activeSources: collector.sources.size
            },
            eventMetrics: collector.getStatistics(),
            alertMetrics: alertManager.getSummary(),
            ruleMetrics: correlationEngine.getRuleStatistics(),
            healthStatus: this.calculateHealthStatus(collector, alertManager)
        };
    }

    /**
     * Calculates overall health status
     * @param {Object} collector - Event collector
     * @param {Object} alertManager - Alert manager
     * @returns {Object} Health status
     */
    static calculateHealthStatus(collector, alertManager) {
        const issues = [];

        if (collector.sources.size === 0) {
            issues.push('No log sources configured');
        }

        const summary = alertManager.getSummary();
        if (summary.openCritical > 5) {
            issues.push('High number of open critical alerts');
        }

        return {
            status: issues.length === 0 ? 'healthy' : 'warning',
            issues
        };
    }
}

// Demonstration
console.log('=== SIEM Demo ===\n');

// Set up log sources
console.log('--- Log Sources ---');
const collector = new EventCollector();

collector.registerSource(new LogSource({
    id: 'FW001',
    name: 'Main Firewall',
    type: 'firewall',
    format: 'syslog'
}));

collector.registerSource(new LogSource({
    id: 'SRV001',
    name: 'Web Server',
    type: 'server',
    format: 'json'
}));

collector.registerSource(new LogSource({
    id: 'APP001',
    name: 'Application Logs',
    type: 'application',
    format: 'json'
}));

console.log('Registered sources:', collector.sources.size);

// Collect events
console.log('\n--- Event Collection ---');
const events = collector.collect();
console.log('Collected events:', events.length);
console.log('Collection statistics:', collector.getStatistics());

// Set up correlation
console.log('\n--- Correlation Engine ---');
const correlationEngine = new CorrelationEngine();

correlationEngine.addRule({
    name: 'Multiple Failed Logins',
    description: 'Detects brute force attempts',
    condition: { category: 'authentication', severity: 'high' },
    threshold: 3,
    severity: 'high'
});

correlationEngine.addRule({
    name: 'Critical Security Event',
    description: 'Any critical severity event',
    condition: { severity: 'critical' },
    threshold: 1,
    severity: 'critical'
});

// Analyze events
const alerts = correlationEngine.analyze(events);
console.log('Generated alerts:', alerts.length);

// Alert management
console.log('\n--- Alert Management ---');
const alertManager = new AlertManager();

alertManager.addHandler({
    name: 'Email Handler',
    severities: ['critical', 'high'],
    action: (alert) => console.log(`[EMAIL] ${alert.severity}: ${alert.summary}`)
});

for (const alert of alerts) {
    alertManager.processAlert(alert);
}

console.log('Alert Summary:', alertManager.getSummary());

// Compliance reporting
console.log('\n--- Compliance Report ---');
const complianceReport = ComplianceReporter.generate({
    loggingEnabled: true,
    automatedLogging: true,
    logIntegrity: true,
    logReviewProcess: false,
    accessMonitoring: true
}, 'PCI-DSS');

console.log('Compliance Report:', {
    framework: complianceReport.framework,
    complianceRate: complianceReport.complianceRate,
    nonCompliant: complianceReport.nonCompliant
});

// Dashboard
console.log('\n--- SIEM Dashboard ---');
console.log('Dashboard Metrics:', SIEMDashboard.getMetrics(collector, correlationEngine, alertManager));

/**
 * Best Practices for SIEM:
 *
 * 1. Collect logs from all critical systems
 * 2. Normalize events to a standard format
 * 3. Create meaningful correlation rules
 * 4. Tune rules to reduce false positives
 * 5. Establish alert handling procedures
 * 6. Monitor SIEM health and performance
 * 7. Retain logs per compliance requirements
 * 8. Regularly review and update rules
 * 9. Train analysts on investigation procedures
 * 10. Integrate with incident response processes
 */
