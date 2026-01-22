/**
 * Penetration Testing - Security Vulnerability Assessment
 *
 * Penetration testing (pen testing) evaluates the security of computer systems
 * or networks by simulating attacks. It identifies vulnerabilities before
 * attackers can exploit them. Testing involves scanning for open ports,
 * exploiting known vulnerabilities, and using social engineering tactics.
 *
 * Key Concepts:
 * - Black box (no prior knowledge) vs White box (full knowledge)
 * - Planning, scanning, exploitation, analysis phases
 * - Ethical hacking within authorized scope
 * - Remediation recommendations
 */

/**
 * PenTestScope defines the boundaries of a penetration test.
 * Essential for legal and ethical compliance.
 */
class PenTestScope {
    constructor(options) {
        this.projectName = options.projectName;
        this.client = options.client;
        this.startDate = options.startDate;
        this.endDate = options.endDate;
        this.testType = options.testType; // blackbox, whitebox, graybox
        this.targets = options.targets || [];
        this.exclusions = options.exclusions || [];
        this.rules = options.rules || [];
        this.authorization = options.authorization;
    }

    /**
     * Checks if a target is in scope
     * @param {string} target - Target to check
     * @returns {boolean} True if in scope
     */
    isInScope(target) {
        if (this.exclusions.includes(target)) return false;
        return this.targets.some(t => target.includes(t) || t.includes(target));
    }

    /**
     * Validates scope authorization
     * @returns {Object} Validation result
     */
    validateAuthorization() {
        const issues = [];

        if (!this.authorization) {
            issues.push('Missing authorization document');
        }
        if (!this.authorization?.signedBy) {
            issues.push('Authorization not signed');
        }
        if (new Date() > new Date(this.endDate)) {
            issues.push('Test period has expired');
        }
        if (this.targets.length === 0) {
            issues.push('No targets specified');
        }

        return {
            valid: issues.length === 0,
            issues
        };
    }

    /**
     * Gets scope summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            project: this.projectName,
            type: this.testType,
            targets: this.targets.length,
            exclusions: this.exclusions.length,
            period: `${this.startDate} to ${this.endDate}`,
            authorized: this.authorization ? 'Yes' : 'No'
        };
    }
}

/**
 * VulnerabilityScanner simulates vulnerability scanning.
 * Identifies potential security weaknesses.
 */
class VulnerabilityScanner {
    constructor() {
        this.findings = [];
        this.scanId = null;
    }

    /**
     * Performs a vulnerability scan (simulated)
     * @param {string} target - Target to scan
     * @param {Object} options - Scan options
     * @returns {Object} Scan results
     */
    scan(target, options = {}) {
        this.scanId = `SCAN-${Date.now()}`;
        this.findings = [];

        console.log(`Scanning target: ${target}`);

        // Simulate port scanning
        const ports = this.scanPorts(target);

        // Simulate service enumeration
        const services = this.enumerateServices(ports);

        // Simulate vulnerability detection
        this.detectVulnerabilities(services);

        return {
            scanId: this.scanId,
            target,
            timestamp: new Date().toISOString(),
            portsScanned: ports.length,
            servicesFound: services.length,
            vulnerabilities: this.findings.length,
            findings: this.findings
        };
    }

    /**
     * Simulates port scanning
     * @param {string} target - Target to scan
     * @returns {Array} Open ports
     */
    scanPorts(target) {
        // Simulated open ports
        const commonPorts = [
            { port: 22, service: 'SSH' },
            { port: 80, service: 'HTTP' },
            { port: 443, service: 'HTTPS' },
            { port: 3306, service: 'MySQL' },
            { port: 5432, service: 'PostgreSQL' }
        ];

        return commonPorts.filter(() => Math.random() > 0.3);
    }

    /**
     * Enumerates services on open ports
     * @param {Array} ports - Open ports
     * @returns {Array} Services
     */
    enumerateServices(ports) {
        return ports.map(p => ({
            ...p,
            version: this.getRandomVersion(p.service),
            banner: `${p.service} Server`
        }));
    }

    /**
     * Gets a random version for simulation
     * @param {string} service - Service name
     * @returns {string} Version string
     */
    getRandomVersion(service) {
        const versions = {
            SSH: ['OpenSSH 7.4', 'OpenSSH 8.2', 'OpenSSH 9.0'],
            HTTP: ['Apache/2.4.41', 'nginx/1.18.0', 'Apache/2.4.29'],
            HTTPS: ['Apache/2.4.41', 'nginx/1.18.0'],
            MySQL: ['5.7.32', '8.0.21', '5.6.50'],
            PostgreSQL: ['12.4', '13.0', '11.9']
        };
        const list = versions[service] || ['Unknown'];
        return list[Math.floor(Math.random() * list.length)];
    }

    /**
     * Detects vulnerabilities in services
     * @param {Array} services - Detected services
     */
    detectVulnerabilities(services) {
        const vulnerabilities = {
            'OpenSSH 7.4': { cve: 'CVE-2018-15473', severity: 'medium', description: 'User enumeration vulnerability' },
            'Apache/2.4.29': { cve: 'CVE-2019-0211', severity: 'high', description: 'Privilege escalation' },
            '5.6.50': { cve: 'CVE-2020-2922', severity: 'medium', description: 'Encryption bypass' }
        };

        for (const service of services) {
            const vuln = vulnerabilities[service.version];
            if (vuln) {
                this.findings.push({
                    id: `VULN-${this.findings.length + 1}`,
                    port: service.port,
                    service: service.service,
                    version: service.version,
                    ...vuln
                });
            }
        }

        // Add some random findings for demonstration
        if (Math.random() > 0.5) {
            this.findings.push({
                id: `VULN-${this.findings.length + 1}`,
                type: 'configuration',
                severity: 'low',
                description: 'Server version disclosure in HTTP headers'
            });
        }
    }
}

/**
 * ExploitSimulator simulates exploitation attempts.
 * For educational purposes only.
 */
class ExploitSimulator {
    constructor() {
        this.exploitAttempts = [];
    }

    /**
     * Simulates an exploitation attempt
     * @param {Object} vulnerability - Vulnerability to exploit
     * @returns {Object} Attempt result
     */
    attemptExploit(vulnerability) {
        const attempt = {
            id: `EXP-${Date.now()}`,
            vulnerability: vulnerability.id,
            timestamp: new Date().toISOString(),
            technique: this.selectTechnique(vulnerability),
            success: Math.random() > 0.6, // Simulated success rate
            notes: []
        };

        if (attempt.success) {
            attempt.notes.push('Exploitation successful - access gained');
            attempt.accessLevel = this.determineAccessLevel();
        } else {
            attempt.notes.push('Exploitation failed - target may be patched or mitigated');
        }

        this.exploitAttempts.push(attempt);
        return attempt;
    }

    /**
     * Selects exploitation technique
     * @param {Object} vulnerability - Target vulnerability
     * @returns {string} Technique name
     */
    selectTechnique(vulnerability) {
        const techniques = {
            high: ['Remote Code Execution', 'Privilege Escalation', 'Authentication Bypass'],
            medium: ['Information Disclosure', 'SQL Injection', 'Path Traversal'],
            low: ['XSS Injection', 'Header Injection', 'Configuration Exploit']
        };
        const list = techniques[vulnerability.severity] || techniques.low;
        return list[Math.floor(Math.random() * list.length)];
    }

    /**
     * Determines access level achieved
     * @returns {string} Access level
     */
    determineAccessLevel() {
        const levels = ['user', 'elevated', 'root', 'system'];
        return levels[Math.floor(Math.random() * levels.length)];
    }

    /**
     * Gets exploitation summary
     * @returns {Object} Summary
     */
    getSummary() {
        const successful = this.exploitAttempts.filter(a => a.success).length;
        return {
            totalAttempts: this.exploitAttempts.length,
            successful,
            failed: this.exploitAttempts.length - successful,
            successRate: ((successful / this.exploitAttempts.length) * 100).toFixed(1) + '%'
        };
    }
}

/**
 * PenTestReport generates penetration test reports.
 */
class PenTestReport {
    constructor(scope) {
        this.scope = scope;
        this.findings = [];
        this.exploits = [];
    }

    /**
     * Adds scan findings
     * @param {Array} findings - Vulnerability findings
     */
    addFindings(findings) {
        this.findings.push(...findings);
    }

    /**
     * Adds exploit results
     * @param {Array} exploits - Exploitation attempts
     */
    addExploits(exploits) {
        this.exploits.push(...exploits);
    }

    /**
     * Calculates risk score
     * @returns {Object} Risk assessment
     */
    calculateRiskScore() {
        const severityScores = { critical: 10, high: 8, medium: 5, low: 2 };
        let totalScore = 0;

        for (const finding of this.findings) {
            const score = severityScores[finding.severity] || 1;
            // Exploited vulnerabilities have higher weight
            const wasExploited = this.exploits.some(e =>
                e.vulnerability === finding.id && e.success
            );
            totalScore += wasExploited ? score * 2 : score;
        }

        let riskLevel = 'Low';
        if (totalScore > 50) riskLevel = 'Critical';
        else if (totalScore > 30) riskLevel = 'High';
        else if (totalScore > 15) riskLevel = 'Medium';

        return {
            score: totalScore,
            level: riskLevel,
            findingsCount: this.findings.length,
            exploitedCount: this.exploits.filter(e => e.success).length
        };
    }

    /**
     * Generates remediation recommendations
     * @returns {Array} Recommendations
     */
    generateRecommendations() {
        const recommendations = [];
        const severityOrder = ['critical', 'high', 'medium', 'low'];

        // Sort findings by severity
        const sorted = [...this.findings].sort((a, b) =>
            severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity)
        );

        for (const finding of sorted) {
            recommendations.push({
                priority: severityOrder.indexOf(finding.severity) + 1,
                finding: finding.id,
                severity: finding.severity,
                description: finding.description,
                recommendation: this.getRemediationAdvice(finding)
            });
        }

        return recommendations;
    }

    /**
     * Gets remediation advice for a finding
     * @param {Object} finding - Vulnerability finding
     * @returns {string} Advice
     */
    getRemediationAdvice(finding) {
        const advice = {
            critical: 'Immediate patching required. Consider taking system offline until resolved.',
            high: 'Patch within 24-48 hours. Implement compensating controls if patch not available.',
            medium: 'Schedule patching within 1-2 weeks. Monitor for exploitation attempts.',
            low: 'Address during regular maintenance cycle. Document accepted risk if not fixing.'
        };
        return advice[finding.severity] || 'Review and assess risk.';
    }

    /**
     * Generates executive summary
     * @returns {Object} Executive summary
     */
    generateExecutiveSummary() {
        const risk = this.calculateRiskScore();
        const bySeverity = {};

        for (const finding of this.findings) {
            bySeverity[finding.severity] = (bySeverity[finding.severity] || 0) + 1;
        }

        return {
            projectName: this.scope.projectName,
            testPeriod: `${this.scope.startDate} to ${this.scope.endDate}`,
            testType: this.scope.testType,
            overallRisk: risk.level,
            riskScore: risk.score,
            findings: {
                total: this.findings.length,
                bySeverity
            },
            exploited: risk.exploitedCount,
            topRecommendation: this.generateRecommendations()[0]?.recommendation
        };
    }
}

// Demonstration
console.log('=== Penetration Testing Demo ===\n');

// Define test scope
console.log('--- Test Scope ---');
const scope = new PenTestScope({
    projectName: 'WebApp Security Assessment',
    client: 'Acme Corp',
    startDate: '2024-01-15',
    endDate: '2024-01-31',
    testType: 'graybox',
    targets: ['app.acme.com', '192.168.1.0/24'],
    exclusions: ['db.acme.com'],
    authorization: {
        signedBy: 'John Smith, CISO',
        date: '2024-01-10'
    }
});

console.log('Scope Summary:', scope.getSummary());
console.log('Authorization Valid:', scope.validateAuthorization());

// Run vulnerability scan
console.log('\n--- Vulnerability Scan ---');
const scanner = new VulnerabilityScanner();
const scanResults = scanner.scan('app.acme.com');
console.log('Scan Results:', {
    target: scanResults.target,
    portsScanned: scanResults.portsScanned,
    vulnerabilities: scanResults.vulnerabilities
});

// Show findings
console.log('\nFindings:');
scanResults.findings.forEach(f => {
    console.log(`  ${f.id}: ${f.description} (${f.severity})`);
});

// Simulate exploitation
console.log('\n--- Exploitation Attempts ---');
const exploiter = new ExploitSimulator();

for (const finding of scanResults.findings.slice(0, 2)) {
    const result = exploiter.attemptExploit(finding);
    console.log(`${result.id}: ${result.technique} - ${result.success ? 'SUCCESS' : 'FAILED'}`);
}

console.log('Exploitation Summary:', exploiter.getSummary());

// Generate report
console.log('\n--- Penetration Test Report ---');
const report = new PenTestReport(scope);
report.addFindings(scanResults.findings);
report.addExploits(exploiter.exploitAttempts);

console.log('Executive Summary:', report.generateExecutiveSummary());
console.log('\nTop Recommendations:');
report.generateRecommendations().slice(0, 3).forEach(rec => {
    console.log(`  Priority ${rec.priority}: ${rec.recommendation}`);
});

/**
 * Best Practices for Penetration Testing:
 *
 * 1. Always obtain written authorization before testing
 * 2. Define clear scope and rules of engagement
 * 3. Document all findings thoroughly
 * 4. Prioritize vulnerabilities by risk
 * 5. Provide actionable remediation guidance
 * 6. Test in isolated environments when possible
 * 7. Follow responsible disclosure practices
 * 8. Re-test after remediation to verify fixes
 * 9. Keep testing tools and techniques updated
 * 10. Maintain confidentiality of findings
 */
