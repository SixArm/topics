/**
 * Mean Time to Repair (MTTR) - Reliability Metric
 *
 * Mean Time to Repair (MTTR) measures the average time it takes to repair
 * a failed system and restore it to normal operating conditions. MTTR is
 * crucial for evaluating reliability and maintenance efficiency. A low MTTR
 * indicates quick, efficient repairs and minimal downtime impact.
 *
 * Key Concepts:
 * - MTTR = Total Downtime / Number of Failures
 * - Used with MTBF for complete reliability picture
 * - Lower MTTR = Better maintenance efficiency
 * - Includes diagnosis, repair, and restoration time
 */

/**
 * Incident represents a system failure event.
 * Tracks timing and repair information.
 */
class Incident {
    constructor(options) {
        this.id = options.id;
        this.system = options.system;
        this.failureTime = options.failureTime || new Date();
        this.detectionTime = null;
        this.diagnosisStartTime = null;
        this.repairStartTime = null;
        this.restorationTime = null;
        this.severity = options.severity || 'medium';
        this.rootCause = null;
        this.status = 'active';
    }

    /**
     * Marks when the failure was detected
     * @param {Date} time - Detection time
     */
    markDetected(time = new Date()) {
        this.detectionTime = time;
    }

    /**
     * Marks when diagnosis started
     * @param {Date} time - Diagnosis start time
     */
    markDiagnosisStart(time = new Date()) {
        this.diagnosisStartTime = time;
    }

    /**
     * Marks when repair started
     * @param {Date} time - Repair start time
     */
    markRepairStart(time = new Date()) {
        this.repairStartTime = time;
    }

    /**
     * Marks when system was restored
     * @param {Date} time - Restoration time
     * @param {string} cause - Root cause identified
     */
    markRestored(time = new Date(), cause = null) {
        this.restorationTime = time;
        this.rootCause = cause;
        this.status = 'resolved';
    }

    /**
     * Calculates total downtime in minutes
     * @returns {number} Downtime in minutes
     */
    getDowntime() {
        if (!this.restorationTime) return null;
        return (this.restorationTime - this.failureTime) / (1000 * 60);
    }

    /**
     * Gets detailed timing breakdown
     * @returns {Object} Timing breakdown
     */
    getTimingBreakdown() {
        const toMinutes = (ms) => ms ? (ms / (1000 * 60)).toFixed(2) : null;

        return {
            detectionDelay: toMinutes(this.detectionTime - this.failureTime),
            diagnosisTime: toMinutes(this.repairStartTime - this.diagnosisStartTime),
            repairTime: toMinutes(this.restorationTime - this.repairStartTime),
            totalDowntime: toMinutes(this.restorationTime - this.failureTime)
        };
    }

    /**
     * Gets incident summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            system: this.system,
            severity: this.severity,
            status: this.status,
            downtime: this.getDowntime()?.toFixed(2) + ' minutes',
            rootCause: this.rootCause
        };
    }
}

/**
 * MTTRCalculator computes MTTR metrics.
 * Provides analysis and trending of repair times.
 */
class MTTRCalculator {
    constructor() {
        this.incidents = [];
    }

    /**
     * Adds an incident to the calculator
     * @param {Incident} incident - Incident to add
     */
    addIncident(incident) {
        if (incident.status === 'resolved') {
            this.incidents.push(incident);
        }
    }

    /**
     * Calculates MTTR
     * @param {Object} filter - Optional filter
     * @returns {Object} MTTR calculation
     */
    calculateMTTR(filter = {}) {
        let filtered = [...this.incidents];

        if (filter.system) {
            filtered = filtered.filter(i => i.system === filter.system);
        }
        if (filter.severity) {
            filtered = filtered.filter(i => i.severity === filter.severity);
        }
        if (filter.startDate) {
            filtered = filtered.filter(i => i.failureTime >= filter.startDate);
        }
        if (filter.endDate) {
            filtered = filtered.filter(i => i.failureTime <= filter.endDate);
        }

        if (filtered.length === 0) {
            return { mttr: null, message: 'No incidents found' };
        }

        const totalDowntime = filtered.reduce((sum, i) => sum + i.getDowntime(), 0);
        const mttr = totalDowntime / filtered.length;

        return {
            mttr: mttr.toFixed(2) + ' minutes',
            mttrHours: (mttr / 60).toFixed(2) + ' hours',
            totalDowntime: totalDowntime.toFixed(2) + ' minutes',
            incidentCount: filtered.length,
            filter
        };
    }

    /**
     * Calculates MTTR by severity
     * @returns {Object} MTTR by severity
     */
    calculateMTTRBySeverity() {
        const severities = ['low', 'medium', 'high', 'critical'];
        const result = {};

        for (const severity of severities) {
            const mttrResult = this.calculateMTTR({ severity });
            if (mttrResult.mttr) {
                result[severity] = mttrResult;
            }
        }

        return result;
    }

    /**
     * Calculates MTTR by system
     * @returns {Object} MTTR by system
     */
    calculateMTTRBySystem() {
        const systems = [...new Set(this.incidents.map(i => i.system))];
        const result = {};

        for (const system of systems) {
            result[system] = this.calculateMTTR({ system });
        }

        return result;
    }

    /**
     * Gets MTTR trend over time
     * @param {string} period - Grouping period (day, week, month)
     * @returns {Array} MTTR trend
     */
    getMTTRTrend(period = 'week') {
        const groups = new Map();

        for (const incident of this.incidents) {
            const key = this.getPeriodKey(incident.failureTime, period);
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key).push(incident);
        }

        const trend = [];
        for (const [period, incidents] of groups) {
            const totalDowntime = incidents.reduce((sum, i) => sum + i.getDowntime(), 0);
            trend.push({
                period,
                mttr: (totalDowntime / incidents.length).toFixed(2),
                incidents: incidents.length
            });
        }

        return trend.sort((a, b) => a.period.localeCompare(b.period));
    }

    /**
     * Gets period key for grouping
     * @param {Date} date - Date to get key for
     * @param {string} period - Period type
     * @returns {string} Period key
     */
    getPeriodKey(date, period) {
        const d = new Date(date);
        switch (period) {
            case 'day':
                return d.toISOString().split('T')[0];
            case 'week':
                const startOfWeek = new Date(d.setDate(d.getDate() - d.getDay()));
                return startOfWeek.toISOString().split('T')[0];
            case 'month':
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            default:
                return d.toISOString().split('T')[0];
        }
    }
}

/**
 * MTTRAnalyzer provides detailed MTTR analysis.
 * Identifies improvement opportunities.
 */
class MTTRAnalyzer {
    constructor(calculator) {
        this.calculator = calculator;
    }

    /**
     * Analyzes repair time components
     * @returns {Object} Component analysis
     */
    analyzeComponents() {
        const incidents = this.calculator.incidents;
        if (incidents.length === 0) {
            return { message: 'No incidents to analyze' };
        }

        let totalDetection = 0;
        let totalDiagnosis = 0;
        let totalRepair = 0;
        let count = 0;

        for (const incident of incidents) {
            const timing = incident.getTimingBreakdown();
            if (timing.detectionDelay && timing.diagnosisTime && timing.repairTime) {
                totalDetection += parseFloat(timing.detectionDelay);
                totalDiagnosis += parseFloat(timing.diagnosisTime);
                totalRepair += parseFloat(timing.repairTime);
                count++;
            }
        }

        if (count === 0) {
            return { message: 'Insufficient timing data' };
        }

        const avgDetection = totalDetection / count;
        const avgDiagnosis = totalDiagnosis / count;
        const avgRepair = totalRepair / count;
        const total = avgDetection + avgDiagnosis + avgRepair;

        return {
            averageDetectionTime: avgDetection.toFixed(2) + ' minutes',
            averageDiagnosisTime: avgDiagnosis.toFixed(2) + ' minutes',
            averageRepairTime: avgRepair.toFixed(2) + ' minutes',
            breakdown: {
                detection: ((avgDetection / total) * 100).toFixed(1) + '%',
                diagnosis: ((avgDiagnosis / total) * 100).toFixed(1) + '%',
                repair: ((avgRepair / total) * 100).toFixed(1) + '%'
            }
        };
    }

    /**
     * Identifies top root causes
     * @param {number} limit - Number of causes to return
     * @returns {Array} Top root causes
     */
    getTopRootCauses(limit = 5) {
        const causeCounts = {};

        for (const incident of this.calculator.incidents) {
            if (incident.rootCause) {
                causeCounts[incident.rootCause] = (causeCounts[incident.rootCause] || 0) + 1;
            }
        }

        return Object.entries(causeCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([cause, count]) => ({ cause, count }));
    }

    /**
     * Generates improvement recommendations
     * @returns {Array} Recommendations
     */
    generateRecommendations() {
        const components = this.analyzeComponents();
        const recommendations = [];

        if (components.breakdown) {
            const detection = parseFloat(components.breakdown.detection);
            const diagnosis = parseFloat(components.breakdown.diagnosis);
            const repair = parseFloat(components.breakdown.repair);

            if (detection > 30) {
                recommendations.push({
                    area: 'Detection',
                    issue: 'High detection time percentage',
                    suggestion: 'Implement better monitoring and alerting systems'
                });
            }
            if (diagnosis > 40) {
                recommendations.push({
                    area: 'Diagnosis',
                    issue: 'High diagnosis time percentage',
                    suggestion: 'Improve logging, create runbooks, use diagnostic tools'
                });
            }
            if (repair > 50) {
                recommendations.push({
                    area: 'Repair',
                    issue: 'High repair time percentage',
                    suggestion: 'Automate common fixes, improve deployment processes'
                });
            }
        }

        const topCauses = this.getTopRootCauses(3);
        for (const { cause, count } of topCauses) {
            if (count >= 3) {
                recommendations.push({
                    area: 'Prevention',
                    issue: `Recurring root cause: ${cause}`,
                    suggestion: 'Address root cause to prevent future incidents'
                });
            }
        }

        return recommendations;
    }
}

/**
 * MTTRReporter generates MTTR reports.
 */
class MTTRReporter {
    constructor(calculator, analyzer) {
        this.calculator = calculator;
        this.analyzer = analyzer;
    }

    /**
     * Generates a comprehensive MTTR report
     * @returns {Object} Complete report
     */
    generateReport() {
        return {
            overview: this.calculator.calculateMTTR(),
            bySeverity: this.calculator.calculateMTTRBySeverity(),
            bySystem: this.calculator.calculateMTTRBySystem(),
            componentAnalysis: this.analyzer.analyzeComponents(),
            topRootCauses: this.analyzer.getTopRootCauses(),
            recommendations: this.analyzer.generateRecommendations(),
            trend: this.calculator.getMTTRTrend('week')
        };
    }

    /**
     * Gets executive summary
     * @returns {Object} Executive summary
     */
    getExecutiveSummary() {
        const overview = this.calculator.calculateMTTR();
        const trend = this.calculator.getMTTRTrend('month');

        let trendDirection = 'stable';
        if (trend.length >= 2) {
            const recent = parseFloat(trend[trend.length - 1].mttr);
            const previous = parseFloat(trend[trend.length - 2].mttr);
            if (recent < previous * 0.9) trendDirection = 'improving';
            else if (recent > previous * 1.1) trendDirection = 'worsening';
        }

        return {
            currentMTTR: overview.mttr,
            totalIncidents: overview.incidentCount,
            trend: trendDirection,
            keyRecommendation: this.analyzer.generateRecommendations()[0]?.suggestion || 'Continue current practices'
        };
    }
}

// Demonstration
console.log('=== Mean Time to Repair (MTTR) Demo ===\n');

// Create sample incidents
const calculator = new MTTRCalculator();

// Simulate incidents with timing
function createSampleIncident(id, system, severity, downtimeMinutes) {
    const incident = new Incident({ id, system, severity });
    const failureTime = incident.failureTime;

    incident.markDetected(new Date(failureTime.getTime() + downtimeMinutes * 0.1 * 60000));
    incident.markDiagnosisStart(new Date(failureTime.getTime() + downtimeMinutes * 0.15 * 60000));
    incident.markRepairStart(new Date(failureTime.getTime() + downtimeMinutes * 0.4 * 60000));
    incident.markRestored(new Date(failureTime.getTime() + downtimeMinutes * 60000), 'Database connection timeout');

    return incident;
}

// Add sample incidents
calculator.addIncident(createSampleIncident('INC001', 'API Server', 'high', 45));
calculator.addIncident(createSampleIncident('INC002', 'Database', 'critical', 120));
calculator.addIncident(createSampleIncident('INC003', 'API Server', 'medium', 30));
calculator.addIncident(createSampleIncident('INC004', 'Web Frontend', 'low', 15));
calculator.addIncident(createSampleIncident('INC005', 'Database', 'high', 90));

// Calculate MTTR
console.log('--- MTTR Calculations ---');
console.log('Overall MTTR:', calculator.calculateMTTR());
console.log('MTTR by Severity:', calculator.calculateMTTRBySeverity());
console.log('MTTR by System:', calculator.calculateMTTRBySystem());

// Analyze components
console.log('\n--- Component Analysis ---');
const analyzer = new MTTRAnalyzer(calculator);
console.log(analyzer.analyzeComponents());

// Root causes
console.log('\n--- Top Root Causes ---');
console.log(analyzer.getTopRootCauses());

// Recommendations
console.log('\n--- Recommendations ---');
analyzer.generateRecommendations().forEach(rec => {
    console.log(`${rec.area}: ${rec.suggestion}`);
});

// Generate report
console.log('\n--- Executive Summary ---');
const reporter = new MTTRReporter(calculator, analyzer);
console.log(reporter.getExecutiveSummary());

/**
 * Best Practices for MTTR Optimization:
 *
 * 1. Implement comprehensive monitoring and alerting
 * 2. Create detailed runbooks for common issues
 * 3. Automate diagnosis and common repairs
 * 4. Track time components (detection, diagnosis, repair)
 * 5. Conduct post-incident reviews to identify improvements
 * 6. Invest in training for on-call engineers
 * 7. Use incident management tools for tracking
 * 8. Set MTTR targets by severity level
 * 9. Address recurring root causes proactively
 * 10. Balance MTTR improvement with MTBF (prevention)
 */
