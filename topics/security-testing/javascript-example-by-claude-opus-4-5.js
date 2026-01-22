/**
 * Security Testing - Evaluating Software Security
 *
 * Security testing is a process of evaluating the security of a software
 * system or application by testing its security features, functions, and
 * configurations. The primary objective is to identify and mitigate potential
 * security threats, vulnerabilities, and risks.
 *
 * Key Concepts:
 * - Vulnerability identification
 * - Penetration testing
 * - Authentication and authorization testing
 * - Security configuration review
 */

/**
 * SecurityTestType defines different security testing approaches.
 */
class SecurityTestType {
    static types = {
        vulnerability: {
            name: 'Vulnerability Testing',
            description: 'Scanning for known vulnerabilities and security holes',
            techniques: ['Automated scanning', 'CVE checking', 'Dependency analysis'],
            tools: ['OWASP ZAP', 'Nessus', 'Snyk'],
            coverage: 'Broad, known vulnerabilities'
        },
        penetration: {
            name: 'Penetration Testing',
            description: 'Simulating real-world attacks to find weaknesses',
            techniques: ['Manual exploitation', 'Social engineering', 'Network attacks'],
            tools: ['Burp Suite', 'Metasploit', 'Custom scripts'],
            coverage: 'Deep, targeted testing'
        },
        authentication: {
            name: 'Authentication Testing',
            description: 'Testing login and identity verification mechanisms',
            techniques: ['Password policy testing', 'Session management', 'MFA testing'],
            focus: ['Brute force protection', 'Session fixation', 'Token security']
        },
        authorization: {
            name: 'Authorization Testing',
            description: 'Testing access control and permissions',
            techniques: ['Role testing', 'Privilege escalation', 'IDOR testing'],
            focus: ['Vertical escalation', 'Horizontal escalation', 'Function-level']
        },
        encryption: {
            name: 'Encryption Testing',
            description: 'Testing cryptographic implementations',
            techniques: ['Protocol analysis', 'Key management review', 'Algorithm strength'],
            focus: ['TLS configuration', 'Data encryption', 'Secure storage']
        },
        configuration: {
            name: 'Configuration Testing',
            description: 'Testing security settings and configurations',
            techniques: ['Benchmark comparison', 'Default settings review', 'Hardening check'],
            focus: ['Server configuration', 'Network settings', 'Application settings']
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
}

/**
 * VulnerabilityScanner simulates vulnerability scanning.
 */
class VulnerabilityScanner {
    constructor(options = {}) {
        this.scanTarget = options.target;
        this.findings = [];
        this.scanDate = null;
    }

    /**
     * Scans for vulnerabilities
     * @param {Object} target - Scan target
     * @returns {Object} Scan results
     */
    scan(target) {
        this.scanTarget = target;
        this.scanDate = new Date();
        this.findings = [];

        // Simulate finding vulnerabilities based on target properties
        if (target.hasUserInput && !target.inputValidation) {
            this.findings.push({
                id: 'VULN-001',
                type: 'Injection',
                severity: 'high',
                cwe: 'CWE-89',
                title: 'SQL Injection Vulnerability',
                description: 'User input is used in SQL queries without proper sanitization',
                location: target.name,
                remediation: 'Use parameterized queries or prepared statements'
            });
        }

        if (target.hasUserInput && !target.outputEncoding) {
            this.findings.push({
                id: 'VULN-002',
                type: 'XSS',
                severity: 'medium',
                cwe: 'CWE-79',
                title: 'Cross-Site Scripting (XSS)',
                description: 'User input is reflected without proper encoding',
                location: target.name,
                remediation: 'Encode output based on context, use CSP'
            });
        }

        if (target.usesHttp && !target.forceHttps) {
            this.findings.push({
                id: 'VULN-003',
                type: 'Transport Security',
                severity: 'medium',
                cwe: 'CWE-319',
                title: 'Cleartext Transmission',
                description: 'Sensitive data may be transmitted over unencrypted connection',
                location: target.name,
                remediation: 'Enforce HTTPS, implement HSTS'
            });
        }

        if (target.hasAuthentication && !target.rateLimiting) {
            this.findings.push({
                id: 'VULN-004',
                type: 'Authentication',
                severity: 'medium',
                cwe: 'CWE-307',
                title: 'No Rate Limiting',
                description: 'Authentication endpoint lacks brute force protection',
                location: target.name + '/login',
                remediation: 'Implement rate limiting and account lockout'
            });
        }

        return this.getReport();
    }

    /**
     * Gets scan report
     * @returns {Object} Report
     */
    getReport() {
        const bySeverity = {
            critical: this.findings.filter(f => f.severity === 'critical').length,
            high: this.findings.filter(f => f.severity === 'high').length,
            medium: this.findings.filter(f => f.severity === 'medium').length,
            low: this.findings.filter(f => f.severity === 'low').length
        };

        return {
            target: this.scanTarget?.name,
            scanDate: this.scanDate,
            totalFindings: this.findings.length,
            bySeverity,
            findings: this.findings,
            riskLevel: bySeverity.critical > 0 || bySeverity.high > 2 ? 'high' :
                bySeverity.high > 0 || bySeverity.medium > 3 ? 'medium' : 'low'
        };
    }
}

/**
 * AuthenticationTester tests authentication mechanisms.
 */
class AuthenticationTester {
    /**
     * Tests password policy
     * @param {Object} policy - Password policy
     * @returns {Object} Test results
     */
    static testPasswordPolicy(policy) {
        const issues = [];
        const recommendations = [];

        if (policy.minLength < 8) {
            issues.push('Minimum length too short');
            recommendations.push('Require minimum 8 characters');
        }

        if (policy.minLength < 12) {
            recommendations.push('Consider requiring 12+ characters');
        }

        if (!policy.requireUppercase || !policy.requireLowercase) {
            issues.push('Does not require mixed case');
        }

        if (!policy.requireNumbers) {
            issues.push('Does not require numbers');
        }

        if (!policy.requireSpecial) {
            recommendations.push('Consider requiring special characters');
        }

        if (!policy.preventCommon) {
            issues.push('Does not check for common passwords');
            recommendations.push('Block passwords from common password lists');
        }

        if (policy.maxAge > 90) {
            recommendations.push('Consider shorter password rotation (60-90 days)');
        }

        return {
            policy,
            issues,
            recommendations,
            strength: issues.length === 0 ? 'strong' :
                issues.length < 3 ? 'moderate' : 'weak'
        };
    }

    /**
     * Tests session security
     * @param {Object} sessionConfig - Session configuration
     * @returns {Object} Test results
     */
    static testSessionSecurity(sessionConfig) {
        const issues = [];

        if (!sessionConfig.httpOnly) {
            issues.push('Session cookie not HttpOnly - vulnerable to XSS theft');
        }

        if (!sessionConfig.secure) {
            issues.push('Session cookie not Secure - can be sent over HTTP');
        }

        if (!sessionConfig.sameSite || sessionConfig.sameSite === 'None') {
            issues.push('SameSite not set or too permissive - CSRF risk');
        }

        if (sessionConfig.maxAge > 24 * 60 * 60 * 1000) { // > 24 hours
            issues.push('Session timeout too long');
        }

        if (!sessionConfig.regenerateOnLogin) {
            issues.push('Session not regenerated on login - fixation risk');
        }

        return {
            config: sessionConfig,
            issues,
            secure: issues.length === 0,
            recommendation: issues.length > 0
                ? 'Fix session security issues'
                : 'Session configuration looks secure'
        };
    }

    /**
     * Tests MFA implementation
     * @param {Object} mfaConfig - MFA configuration
     * @returns {Object} Test results
     */
    static testMFA(mfaConfig) {
        const findings = [];

        if (!mfaConfig.enabled) {
            findings.push({
                issue: 'MFA not enabled',
                severity: 'high',
                recommendation: 'Enable MFA for all users'
            });
            return { findings, score: 0 };
        }

        let score = 50; // Base score for having MFA

        if (mfaConfig.methods?.includes('totp')) {
            score += 20;
        }

        if (mfaConfig.methods?.includes('webauthn') || mfaConfig.methods?.includes('fido2')) {
            score += 30; // Hardware tokens are strongest
        }

        if (mfaConfig.methods?.includes('sms')) {
            findings.push({
                issue: 'SMS-based MFA is vulnerable to SIM swapping',
                severity: 'medium',
                recommendation: 'Prefer TOTP or hardware tokens over SMS'
            });
        }

        if (!mfaConfig.backupCodes) {
            findings.push({
                issue: 'No backup codes provision',
                severity: 'low',
                recommendation: 'Provide backup codes for account recovery'
            });
        }

        return {
            findings,
            score: Math.min(100, score),
            strength: score >= 80 ? 'strong' : score >= 50 ? 'moderate' : 'weak'
        };
    }
}

/**
 * AuthorizationTester tests access control.
 */
class AuthorizationTester {
    /**
     * Tests for privilege escalation
     * @param {Array} testCases - Test cases
     * @returns {Object} Test results
     */
    static testPrivilegeEscalation(testCases) {
        const results = [];

        for (const test of testCases) {
            const result = {
                testCase: test.name,
                userRole: test.userRole,
                attemptedAction: test.action,
                expectedResult: 'denied',
                actualResult: test.wasAllowed ? 'allowed' : 'denied',
                passed: !test.wasAllowed
            };

            if (test.wasAllowed) {
                result.vulnerability = {
                    type: test.type || 'vertical',
                    severity: 'high',
                    description: `${test.userRole} was able to ${test.action}`
                };
            }

            results.push(result);
        }

        return {
            totalTests: results.length,
            passed: results.filter(r => r.passed).length,
            failed: results.filter(r => !r.passed).length,
            vulnerabilities: results.filter(r => r.vulnerability).map(r => r.vulnerability),
            recommendation: results.some(r => !r.passed)
                ? 'Fix authorization vulnerabilities immediately'
                : 'Authorization controls appear secure'
        };
    }

    /**
     * Tests IDOR vulnerabilities
     * @param {Array} resources - Resources to test
     * @returns {Object} Test results
     */
    static testIDOR(resources) {
        const findings = [];

        for (const resource of resources) {
            if (resource.accessedOtherUserData) {
                findings.push({
                    resource: resource.endpoint,
                    vulnerability: 'IDOR',
                    severity: 'high',
                    description: `User could access ${resource.resourceType} belonging to other users`,
                    remediation: 'Validate resource ownership before access'
                });
            }
        }

        return {
            testedResources: resources.length,
            vulnerableResources: findings.length,
            findings,
            secure: findings.length === 0
        };
    }
}

/**
 * SecurityTestPlan creates security testing plans.
 */
class SecurityTestPlan {
    constructor(options) {
        this.name = options.name;
        this.scope = options.scope;
        this.objectives = options.objectives || [];
        this.phases = [];
        this.schedule = options.schedule;
    }

    /**
     * Adds a testing phase
     * @param {Object} phase - Phase details
     */
    addPhase(phase) {
        this.phases.push({
            name: phase.name,
            type: phase.type,
            activities: phase.activities,
            tools: phase.tools || [],
            duration: phase.duration,
            deliverables: phase.deliverables || []
        });
    }

    /**
     * Gets the complete plan
     * @returns {Object} Plan
     */
    getPlan() {
        return {
            name: this.name,
            scope: this.scope,
            objectives: this.objectives,
            phases: this.phases,
            totalPhases: this.phases.length,
            schedule: this.schedule,
            estimatedDuration: this.phases.reduce((sum, p) => sum + (p.duration || 0), 0)
        };
    }

    /**
     * Creates a standard web app security test plan
     * @param {string} appName - Application name
     * @returns {SecurityTestPlan} Plan
     */
    static createWebAppPlan(appName) {
        const plan = new SecurityTestPlan({
            name: `Security Test Plan: ${appName}`,
            scope: 'Web application and APIs',
            objectives: [
                'Identify vulnerabilities',
                'Test authentication and authorization',
                'Verify data protection'
            ]
        });

        plan.addPhase({
            name: 'Reconnaissance',
            type: 'information_gathering',
            activities: ['Enumerate endpoints', 'Map application', 'Identify technologies'],
            duration: 8
        });

        plan.addPhase({
            name: 'Vulnerability Scanning',
            type: 'vulnerability',
            activities: ['Automated scanning', 'Dependency check', 'Configuration review'],
            tools: ['OWASP ZAP', 'Snyk'],
            duration: 16
        });

        plan.addPhase({
            name: 'Authentication Testing',
            type: 'authentication',
            activities: ['Password policy test', 'Session management', 'MFA testing'],
            duration: 8
        });

        plan.addPhase({
            name: 'Authorization Testing',
            type: 'authorization',
            activities: ['RBAC testing', 'Privilege escalation', 'IDOR testing'],
            duration: 16
        });

        plan.addPhase({
            name: 'Reporting',
            type: 'reporting',
            activities: ['Compile findings', 'Risk assessment', 'Remediation guidance'],
            deliverables: ['Security assessment report', 'Executive summary'],
            duration: 8
        });

        return plan;
    }
}

/**
 * SecurityTestReport generates security test reports.
 */
class SecurityTestReport {
    /**
     * Generates a report
     * @param {Object} testResults - Test results
     * @returns {Object} Report
     */
    static generate(testResults) {
        const findings = testResults.findings || [];
        const bySeverity = {
            critical: findings.filter(f => f.severity === 'critical'),
            high: findings.filter(f => f.severity === 'high'),
            medium: findings.filter(f => f.severity === 'medium'),
            low: findings.filter(f => f.severity === 'low')
        };

        return {
            title: 'Security Test Report',
            generatedAt: new Date(),
            scope: testResults.scope,
            executiveSummary: this.generateExecutiveSummary(findings, bySeverity),
            findingsSummary: {
                total: findings.length,
                critical: bySeverity.critical.length,
                high: bySeverity.high.length,
                medium: bySeverity.medium.length,
                low: bySeverity.low.length
            },
            findings: findings.sort((a, b) => {
                const order = { critical: 0, high: 1, medium: 2, low: 3 };
                return order[a.severity] - order[b.severity];
            }),
            recommendations: this.generateRecommendations(findings),
            riskRating: this.calculateRiskRating(bySeverity)
        };
    }

    /**
     * Generates executive summary
     * @param {Array} findings - Findings
     * @param {Object} bySeverity - Findings by severity
     * @returns {string} Summary
     */
    static generateExecutiveSummary(findings, bySeverity) {
        if (bySeverity.critical.length > 0) {
            return `CRITICAL: ${bySeverity.critical.length} critical vulnerabilities found. Immediate action required.`;
        }
        if (bySeverity.high.length > 0) {
            return `HIGH RISK: ${bySeverity.high.length} high severity issues found. Address promptly.`;
        }
        if (findings.length === 0) {
            return 'No significant security issues identified during testing.';
        }
        return `${findings.length} security findings identified. Review and address by priority.`;
    }

    /**
     * Generates recommendations
     * @param {Array} findings - Findings
     * @returns {Array} Recommendations
     */
    static generateRecommendations(findings) {
        const recommendations = [];
        const types = new Set(findings.map(f => f.type));

        if (types.has('Injection')) {
            recommendations.push('Implement parameterized queries and input validation');
        }
        if (types.has('XSS')) {
            recommendations.push('Apply output encoding and implement Content Security Policy');
        }
        if (types.has('Authentication')) {
            recommendations.push('Strengthen authentication mechanisms and add MFA');
        }

        return recommendations;
    }

    /**
     * Calculates risk rating
     * @param {Object} bySeverity - Findings by severity
     * @returns {string} Risk rating
     */
    static calculateRiskRating(bySeverity) {
        if (bySeverity.critical.length > 0) return 'Critical';
        if (bySeverity.high.length > 2) return 'High';
        if (bySeverity.high.length > 0 || bySeverity.medium.length > 3) return 'Medium';
        return 'Low';
    }
}

// Demonstration
console.log('=== Security Testing Demo ===\n');

// Security test types
console.log('--- Security Test Types ---');
SecurityTestType.getAllTypes().slice(0, 3).forEach(type => {
    console.log(`\n${type.name}: ${type.description}`);
});

// Vulnerability scanning
console.log('\n--- Vulnerability Scan ---');
const scanner = new VulnerabilityScanner();
const scanResults = scanner.scan({
    name: 'E-Commerce Application',
    hasUserInput: true,
    inputValidation: false,
    outputEncoding: true,
    usesHttp: true,
    forceHttps: false,
    hasAuthentication: true,
    rateLimiting: false
});

console.log('Scan Report:', {
    target: scanResults.target,
    totalFindings: scanResults.totalFindings,
    bySeverity: scanResults.bySeverity,
    riskLevel: scanResults.riskLevel
});

// Authentication testing
console.log('\n--- Authentication Testing ---');
console.log('Password Policy:', AuthenticationTester.testPasswordPolicy({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: false,
    preventCommon: false,
    maxAge: 90
}));

console.log('\nSession Security:', AuthenticationTester.testSessionSecurity({
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600000,
    regenerateOnLogin: true
}));

// Authorization testing
console.log('\n--- Authorization Testing ---');
console.log('Privilege Escalation:', AuthorizationTester.testPrivilegeEscalation([
    { name: 'User accessing admin', userRole: 'user', action: 'access admin panel', wasAllowed: false },
    { name: 'Editor deleting users', userRole: 'editor', action: 'delete user', wasAllowed: true, type: 'vertical' }
]));

// Security test plan
console.log('\n--- Security Test Plan ---');
const plan = SecurityTestPlan.createWebAppPlan('MyApp');
console.log('Plan Summary:', {
    name: plan.name,
    phases: plan.phases.map(p => p.name),
    estimatedDuration: plan.getPlan().estimatedDuration + ' hours'
});

// Security report
console.log('\n--- Security Test Report ---');
const report = SecurityTestReport.generate({
    scope: 'Web Application',
    findings: scanResults.findings
});

console.log('Report:', {
    riskRating: report.riskRating,
    totalFindings: report.findingsSummary.total,
    executiveSummary: report.executiveSummary
});

/**
 * Best Practices for Security Testing:
 *
 * 1. Include security testing in the SDLC
 * 2. Use both automated and manual testing
 * 3. Test authentication and authorization thoroughly
 * 4. Check for OWASP Top 10 vulnerabilities
 * 5. Test input validation on all entry points
 * 6. Verify encryption of sensitive data
 * 7. Review security configurations
 * 8. Test session management security
 * 9. Document and track all findings
 * 10. Verify fixes with regression testing
 */
