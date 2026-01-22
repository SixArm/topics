/**
 * Compliance Testing - Ensuring Adherence to Standards and Regulations
 *
 * Compliance testing ensures applications adhere to predetermined standards,
 * regulations, and requirements. This validates software meets industry
 * regulations, internal policies, security standards, and legal requirements.
 *
 * Key Concepts:
 * - Regulatory Compliance: HIPAA, PCI-DSS, GDPR, SOX
 * - Security Standards: OWASP, NIST, ISO 27001
 * - Data Protection: Encryption, access controls, audit trails
 * - Continuous Monitoring: Automated compliance validation in CI/CD
 */

/**
 * ComplianceRequirement represents a single compliance rule or standard.
 * Defines the criteria that must be met for compliance.
 */
class ComplianceRequirement {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.framework = options.framework;
        this.description = options.description;
        this.severity = options.severity || 'high';
        this.category = options.category;
        this.testCriteria = options.testCriteria || [];
        this.remediationGuidance = options.remediationGuidance;
    }

    /**
     * Adds a test criterion for this requirement
     * @param {Object} criterion - Test criterion details
     */
    addCriterion(criterion) {
        this.testCriteria.push({
            id: `${this.id}-${this.testCriteria.length + 1}`,
            description: criterion.description,
            testFunction: criterion.testFunction,
            evidence: criterion.evidence || []
        });
    }

    /**
     * Returns requirement summary
     * @returns {Object} Requirement summary
     */
    getSummary() {
        return {
            id: this.id,
            name: this.name,
            framework: this.framework,
            severity: this.severity,
            criteriaCount: this.testCriteria.length
        };
    }
}

/**
 * ComplianceFramework represents a collection of related requirements.
 * Groups requirements by regulatory framework (e.g., PCI-DSS, GDPR).
 */
class ComplianceFramework {
    constructor(name, version) {
        this.name = name;
        this.version = version;
        this.requirements = [];
        this.lastUpdated = new Date().toISOString();
    }

    /**
     * Adds a requirement to the framework
     * @param {ComplianceRequirement} requirement - Requirement to add
     */
    addRequirement(requirement) {
        requirement.framework = this.name;
        this.requirements.push(requirement);
    }

    /**
     * Gets requirements by category
     * @param {string} category - Category to filter by
     * @returns {Array} Filtered requirements
     */
    getByCategory(category) {
        return this.requirements.filter(r => r.category === category);
    }

    /**
     * Gets requirements by severity
     * @param {string} severity - Severity level
     * @returns {Array} Filtered requirements
     */
    getBySeverity(severity) {
        return this.requirements.filter(r => r.severity === severity);
    }

    /**
     * Returns framework statistics
     * @returns {Object} Framework statistics
     */
    getStatistics() {
        const bySeverity = {
            critical: this.requirements.filter(r => r.severity === 'critical').length,
            high: this.requirements.filter(r => r.severity === 'high').length,
            medium: this.requirements.filter(r => r.severity === 'medium').length,
            low: this.requirements.filter(r => r.severity === 'low').length
        };

        const categories = [...new Set(this.requirements.map(r => r.category))];

        return {
            framework: this.name,
            version: this.version,
            totalRequirements: this.requirements.length,
            bySeverity,
            categories
        };
    }
}

/**
 * ComplianceTestRunner executes compliance tests against applications.
 * Validates systems meet required standards and generates evidence.
 */
class ComplianceTestRunner {
    constructor() {
        this.results = [];
        this.evidence = [];
    }

    /**
     * Tests a requirement against the system
     * @param {ComplianceRequirement} requirement - Requirement to test
     * @param {Object} context - Test context and system access
     * @returns {Promise<Object>} Test result
     */
    async testRequirement(requirement, context) {
        console.log(`Testing: ${requirement.id} - ${requirement.name}`);

        const criteriaResults = [];

        for (const criterion of requirement.testCriteria) {
            const result = await this.testCriterion(criterion, context);
            criteriaResults.push(result);
        }

        const passed = criteriaResults.every(r => r.passed);
        const result = {
            requirementId: requirement.id,
            requirementName: requirement.name,
            severity: requirement.severity,
            passed,
            criteriaResults,
            timestamp: new Date().toISOString(),
            remediation: passed ? null : requirement.remediationGuidance
        };

        console.log(`  ${passed ? '✓' : '✗'} ${requirement.id}: ${passed ? 'PASSED' : 'FAILED'}`);
        this.results.push(result);
        return result;
    }

    /**
     * Tests a single criterion
     * @param {Object} criterion - Criterion to test
     * @param {Object} context - Test context
     * @returns {Promise<Object>} Criterion result
     */
    async testCriterion(criterion, context) {
        try {
            const passed = criterion.testFunction
                ? await criterion.testFunction(context)
                : true; // If no test function, assume manual verification needed

            const evidence = this.collectEvidence(criterion, context);

            return {
                criterionId: criterion.id,
                description: criterion.description,
                passed,
                evidence
            };
        } catch (error) {
            return {
                criterionId: criterion.id,
                description: criterion.description,
                passed: false,
                error: error.message
            };
        }
    }

    /**
     * Collects evidence for a criterion test
     * @param {Object} criterion - Criterion tested
     * @param {Object} context - Test context
     * @returns {Array} Collected evidence
     */
    collectEvidence(criterion, context) {
        const evidence = [];

        if (criterion.evidence.includes('screenshot')) {
            evidence.push({
                type: 'screenshot',
                timestamp: new Date().toISOString(),
                description: 'System state screenshot'
            });
        }

        if (criterion.evidence.includes('log')) {
            evidence.push({
                type: 'log',
                timestamp: new Date().toISOString(),
                description: 'Relevant log entries'
            });
        }

        if (criterion.evidence.includes('config')) {
            evidence.push({
                type: 'configuration',
                timestamp: new Date().toISOString(),
                description: 'System configuration snapshot'
            });
        }

        this.evidence.push(...evidence);
        return evidence;
    }

    /**
     * Runs all requirements in a framework
     * @param {ComplianceFramework} framework - Framework to test
     * @param {Object} context - Test context
     * @returns {Promise<Object>} Framework test results
     */
    async runFramework(framework, context) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Running Compliance Tests: ${framework.name} v${framework.version}`);
        console.log(`${'='.repeat(50)}\n`);

        for (const requirement of framework.requirements) {
            await this.testRequirement(requirement, context);
        }

        return this.generateReport(framework);
    }

    /**
     * Generates compliance report
     * @param {ComplianceFramework} framework - Framework tested
     * @returns {Object} Compliance report
     */
    generateReport(framework) {
        const passed = this.results.filter(r => r.passed).length;
        const failed = this.results.filter(r => !r.passed).length;

        const criticalFailures = this.results.filter(
            r => !r.passed && r.severity === 'critical'
        );

        return {
            framework: framework.name,
            version: framework.version,
            testDate: new Date().toISOString(),
            summary: {
                total: this.results.length,
                passed,
                failed,
                complianceRate: `${((passed / this.results.length) * 100).toFixed(1)}%`
            },
            criticalFailures: criticalFailures.map(f => ({
                id: f.requirementId,
                name: f.requirementName,
                remediation: f.remediation
            })),
            results: this.results,
            evidenceCollected: this.evidence.length
        };
    }
}

/**
 * DataProtectionValidator validates data protection requirements.
 * Checks encryption, access controls, and data handling practices.
 */
class DataProtectionValidator {
    constructor() {
        this.validations = [];
    }

    /**
     * Validates encryption at rest
     * @param {Object} config - System configuration
     * @returns {Object} Validation result
     */
    validateEncryptionAtRest(config) {
        const passed = config.encryption?.atRest === true &&
            config.encryption?.algorithm?.includes('AES') &&
            config.encryption?.keySize >= 256;

        const result = {
            check: 'Encryption at Rest',
            passed,
            details: passed
                ? `Data encrypted with ${config.encryption?.algorithm}-${config.encryption?.keySize}`
                : 'Encryption at rest not properly configured'
        };

        this.validations.push(result);
        console.log(`  ${passed ? '✓' : '✗'} ${result.check}`);
        return result;
    }

    /**
     * Validates encryption in transit
     * @param {Object} config - System configuration
     * @returns {Object} Validation result
     */
    validateEncryptionInTransit(config) {
        const passed = config.tls?.enabled === true &&
            config.tls?.minVersion >= 1.2;

        const result = {
            check: 'Encryption in Transit',
            passed,
            details: passed
                ? `TLS ${config.tls?.minVersion} or higher enforced`
                : 'TLS not properly configured'
        };

        this.validations.push(result);
        console.log(`  ${passed ? '✓' : '✗'} ${result.check}`);
        return result;
    }

    /**
     * Validates access control configuration
     * @param {Object} config - System configuration
     * @returns {Object} Validation result
     */
    validateAccessControls(config) {
        const checks = {
            rbacEnabled: config.accessControl?.rbac === true,
            mfaRequired: config.accessControl?.mfa === true,
            sessionTimeout: config.accessControl?.sessionTimeout <= 30,
            passwordPolicy: config.accessControl?.passwordPolicy?.minLength >= 12
        };

        const passed = Object.values(checks).every(v => v);

        const result = {
            check: 'Access Controls',
            passed,
            details: checks,
            message: passed
                ? 'Access controls properly configured'
                : 'Access control deficiencies found'
        };

        this.validations.push(result);
        console.log(`  ${passed ? '✓' : '✗'} ${result.check}`);
        return result;
    }

    /**
     * Validates audit logging configuration
     * @param {Object} config - System configuration
     * @returns {Object} Validation result
     */
    validateAuditLogging(config) {
        const checks = {
            enabled: config.audit?.enabled === true,
            retentionDays: config.audit?.retentionDays >= 365,
            includesUserActions: config.audit?.events?.includes('user_actions'),
            includesDataAccess: config.audit?.events?.includes('data_access'),
            tamperProof: config.audit?.tamperProof === true
        };

        const passed = Object.values(checks).every(v => v);

        const result = {
            check: 'Audit Logging',
            passed,
            details: checks
        };

        this.validations.push(result);
        console.log(`  ${passed ? '✓' : '✗'} ${result.check}`);
        return result;
    }

    /**
     * Gets summary of all validations
     * @returns {Object} Validation summary
     */
    getSummary() {
        const passed = this.validations.filter(v => v.passed).length;
        return {
            total: this.validations.length,
            passed,
            failed: this.validations.length - passed,
            validations: this.validations
        };
    }
}

/**
 * ComplianceScheduler manages regular compliance testing schedules.
 * Integrates with CI/CD for continuous compliance monitoring.
 */
class ComplianceScheduler {
    constructor() {
        this.schedules = [];
        this.history = [];
    }

    /**
     * Schedules a compliance test
     * @param {Object} schedule - Schedule configuration
     */
    addSchedule(schedule) {
        this.schedules.push({
            id: `SCH-${this.schedules.length + 1}`,
            framework: schedule.framework,
            frequency: schedule.frequency,
            nextRun: this.calculateNextRun(schedule.frequency),
            notifyOnFailure: schedule.notifyOnFailure || [],
            enabled: true
        });
    }

    /**
     * Calculates next run time based on frequency
     * @param {string} frequency - Run frequency (daily, weekly, monthly)
     * @returns {Date} Next run date
     */
    calculateNextRun(frequency) {
        const now = new Date();
        switch (frequency) {
            case 'daily':
                now.setDate(now.getDate() + 1);
                break;
            case 'weekly':
                now.setDate(now.getDate() + 7);
                break;
            case 'monthly':
                now.setMonth(now.getMonth() + 1);
                break;
        }
        return now;
    }

    /**
     * Gets upcoming scheduled tests
     * @returns {Array} Upcoming tests
     */
    getUpcoming() {
        return this.schedules
            .filter(s => s.enabled)
            .sort((a, b) => a.nextRun - b.nextRun);
    }

    /**
     * Records a test execution
     * @param {string} scheduleId - Schedule ID
     * @param {Object} result - Test result
     */
    recordExecution(scheduleId, result) {
        this.history.push({
            scheduleId,
            executedAt: new Date().toISOString(),
            result
        });
    }
}

// Demonstration
console.log('=== Compliance Testing Demo ===\n');

// Create a PCI-DSS compliance framework
const pciDss = new ComplianceFramework('PCI-DSS', '4.0');

// Add requirements
const req1 = new ComplianceRequirement({
    id: 'PCI-3.4',
    name: 'Protect Stored Cardholder Data',
    description: 'Render PAN unreadable anywhere it is stored',
    severity: 'critical',
    category: 'data_protection',
    remediationGuidance: 'Implement encryption for all stored cardholder data'
});
req1.addCriterion({
    description: 'PAN data is encrypted at rest',
    testFunction: async (ctx) => ctx.encryption?.atRest === true,
    evidence: ['config', 'screenshot']
});

const req2 = new ComplianceRequirement({
    id: 'PCI-8.3',
    name: 'Secure Authentication',
    description: 'Secure all individual non-console administrative access',
    severity: 'high',
    category: 'access_control',
    remediationGuidance: 'Enable MFA for all administrative access'
});
req2.addCriterion({
    description: 'Multi-factor authentication is enabled',
    testFunction: async (ctx) => ctx.accessControl?.mfa === true,
    evidence: ['config']
});

pciDss.addRequirement(req1);
pciDss.addRequirement(req2);

console.log('Framework Statistics:', pciDss.getStatistics());

// Run compliance tests
const runner = new ComplianceTestRunner();
const testContext = {
    encryption: { atRest: true, algorithm: 'AES', keySize: 256 },
    accessControl: { mfa: true }
};

runner.runFramework(pciDss, testContext).then(report => {
    console.log('\n--- Compliance Report ---');
    console.log(`Framework: ${report.framework} v${report.version}`);
    console.log(`Compliance Rate: ${report.summary.complianceRate}`);
    console.log(`Passed: ${report.summary.passed}/${report.summary.total}`);
});

// Data protection validation
console.log('\n--- Data Protection Validation ---');
const dataValidator = new DataProtectionValidator();
const systemConfig = {
    encryption: { atRest: true, algorithm: 'AES', keySize: 256 },
    tls: { enabled: true, minVersion: 1.3 },
    accessControl: {
        rbac: true,
        mfa: true,
        sessionTimeout: 15,
        passwordPolicy: { minLength: 14 }
    },
    audit: {
        enabled: true,
        retentionDays: 730,
        events: ['user_actions', 'data_access'],
        tamperProof: true
    }
};

dataValidator.validateEncryptionAtRest(systemConfig);
dataValidator.validateEncryptionInTransit(systemConfig);
dataValidator.validateAccessControls(systemConfig);
dataValidator.validateAuditLogging(systemConfig);
console.log('\nData Protection Summary:', dataValidator.getSummary());

/**
 * Best Practices for Compliance Testing:
 *
 * 1. Maintain up-to-date requirement libraries for each framework
 * 2. Automate compliance checks in CI/CD pipelines
 * 3. Collect and preserve evidence for audit purposes
 * 4. Schedule regular compliance assessments
 * 5. Prioritize critical and high-severity requirements
 * 6. Document remediation steps for failed requirements
 * 7. Keep compliance test suites synchronized with regulation updates
 * 8. Integrate security scanning with compliance testing
 * 9. Train teams on compliance requirements and testing
 * 10. Maintain audit trails for all compliance testing activities
 */
