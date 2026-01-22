/**
 * White Hat versus Black Hat - Ethical vs Malicious Hacking
 *
 * White hat hackers and black hat hackers are two distinct categories of
 * individuals involved in cybersecurity. White hats work ethically and legally
 * to improve security, while black hats perform malicious activities for
 * personal gain. Understanding both is essential for security testing.
 *
 * Key Concepts:
 * - Ethical hacking
 * - Penetration testing
 * - Security assessment
 * - Responsible disclosure
 */

/**
 * HackerType defines different hacker categories.
 */
class HackerType {
    static types = {
        whiteHat: {
            name: 'White Hat Hacker',
            alias: 'Ethical Hacker',
            intent: 'Improve security and protect systems',
            legality: 'Legal - with authorization',
            activities: [
                'Penetration testing',
                'Vulnerability assessments',
                'Security audits',
                'Bug bounty hunting',
                'Security consulting'
            ],
            employers: ['Security firms', 'Corporations', 'Government', 'Freelance'],
            certifications: ['CEH', 'OSCP', 'CISSP', 'GPEN']
        },
        blackHat: {
            name: 'Black Hat Hacker',
            alias: 'Cracker',
            intent: 'Personal gain, malice, or destruction',
            legality: 'Illegal',
            activities: [
                'Data theft',
                'Ransomware attacks',
                'Identity theft',
                'DDoS attacks',
                'Malware distribution'
            ],
            consequences: ['Criminal charges', 'Imprisonment', 'Fines', 'Civil liability']
        },
        greyHat: {
            name: 'Grey Hat Hacker',
            alias: 'Somewhere in between',
            intent: 'Mixed - may violate laws but not maliciously',
            legality: 'Often illegal but without malicious intent',
            activities: [
                'Unauthorized testing',
                'Public vulnerability disclosure',
                'Hacktivism'
            ],
            ethics: 'Ethically ambiguous - good intentions, questionable methods'
        }
    };

    /**
     * Gets hacker type details
     * @param {string} type - Type name
     * @returns {Object} Type details
     */
    static getType(type) {
        return this.types[type];
    }

    /**
     * Compares white and black hat
     * @returns {Object} Comparison
     */
    static compare() {
        return {
            whiteHat: {
                goal: 'Protect systems',
                authorization: 'Required',
                disclosure: 'Responsible',
                compensation: 'Bug bounties, salary',
                legal: 'Yes'
            },
            blackHat: {
                goal: 'Exploit systems',
                authorization: 'None',
                disclosure: 'Exploits vulnerabilities',
                compensation: 'Stolen data, ransom',
                legal: 'No'
            }
        };
    }
}

/**
 * PenetrationTest simulates ethical penetration testing.
 */
class PenetrationTest {
    static phases = {
        planning: {
            name: 'Planning and Reconnaissance',
            activities: [
                'Define scope and objectives',
                'Gather target information',
                'Identify potential entry points',
                'Set rules of engagement'
            ],
            deliverable: 'Test plan and scope document'
        },
        scanning: {
            name: 'Scanning and Enumeration',
            activities: [
                'Port scanning',
                'Service identification',
                'Vulnerability scanning',
                'Network mapping'
            ],
            tools: ['Nmap', 'Nessus', 'OpenVAS']
        },
        exploitation: {
            name: 'Exploitation',
            activities: [
                'Attempt to exploit vulnerabilities',
                'Gain system access',
                'Escalate privileges',
                'Maintain access'
            ],
            tools: ['Metasploit', 'Burp Suite', 'SQLMap']
        },
        reporting: {
            name: 'Reporting',
            activities: [
                'Document findings',
                'Assess risk levels',
                'Provide remediation recommendations',
                'Present to stakeholders'
            ],
            deliverable: 'Penetration test report'
        }
    };

    constructor(scope) {
        this.scope = scope;
        this.findings = [];
        this.currentPhase = 'planning';
    }

    /**
     * Adds a finding
     * @param {Object} finding - Security finding
     */
    addFinding(finding) {
        this.findings.push({
            ...finding,
            id: `FIND-${this.findings.length + 1}`,
            discoveredAt: new Date(),
            phase: this.currentPhase
        });
    }

    /**
     * Advances to next phase
     * @returns {Object} Phase transition
     */
    advancePhase() {
        const phases = Object.keys(PenetrationTest.phases);
        const currentIndex = phases.indexOf(this.currentPhase);

        if (currentIndex < phases.length - 1) {
            this.currentPhase = phases[currentIndex + 1];
            return {
                success: true,
                newPhase: this.currentPhase,
                activities: PenetrationTest.phases[this.currentPhase].activities
            };
        }

        return { success: false, message: 'Test complete' };
    }

    /**
     * Generates test report
     * @returns {Object} Test report
     */
    generateReport() {
        const bySeverity = {
            critical: this.findings.filter(f => f.severity === 'critical').length,
            high: this.findings.filter(f => f.severity === 'high').length,
            medium: this.findings.filter(f => f.severity === 'medium').length,
            low: this.findings.filter(f => f.severity === 'low').length
        };

        return {
            scope: this.scope,
            testDate: new Date().toISOString(),
            totalFindings: this.findings.length,
            bySeverity,
            riskRating: bySeverity.critical > 0 ? 'Critical' :
                bySeverity.high > 0 ? 'High' :
                    bySeverity.medium > 0 ? 'Medium' : 'Low',
            findings: this.findings,
            recommendation: bySeverity.critical > 0 || bySeverity.high > 0
                ? 'Immediate remediation required'
                : 'Address findings according to severity'
        };
    }
}

/**
 * VulnerabilityAssessment categorizes vulnerabilities.
 */
class VulnerabilityAssessment {
    static categories = {
        injection: {
            name: 'Injection Flaws',
            examples: ['SQL Injection', 'Command Injection', 'LDAP Injection'],
            impact: 'Data theft, system compromise',
            prevention: 'Input validation, parameterized queries'
        },
        authentication: {
            name: 'Authentication Issues',
            examples: ['Weak passwords', 'Session hijacking', 'Credential stuffing'],
            impact: 'Unauthorized access',
            prevention: 'MFA, secure session management'
        },
        xss: {
            name: 'Cross-Site Scripting',
            examples: ['Stored XSS', 'Reflected XSS', 'DOM-based XSS'],
            impact: 'Client-side attacks, session theft',
            prevention: 'Output encoding, CSP headers'
        },
        misconfig: {
            name: 'Security Misconfiguration',
            examples: ['Default credentials', 'Unnecessary services', 'Verbose errors'],
            impact: 'Various - depends on misconfiguration',
            prevention: 'Security hardening, regular audits'
        },
        exposure: {
            name: 'Sensitive Data Exposure',
            examples: ['Unencrypted data', 'Weak cryptography', 'Leaked credentials'],
            impact: 'Data breach, compliance violations',
            prevention: 'Encryption, secure key management'
        }
    };

    /**
     * Assesses vulnerability severity using CVSS-like scoring
     * @param {Object} vuln - Vulnerability details
     * @returns {Object} Assessment
     */
    static assessSeverity(vuln) {
        let score = 0;

        // Attack vector
        if (vuln.attackVector === 'network') score += 2.5;
        else if (vuln.attackVector === 'adjacent') score += 1.5;
        else score += 0.5;

        // Complexity
        if (vuln.complexity === 'low') score += 2;
        else score += 1;

        // Privileges required
        if (vuln.privilegesRequired === 'none') score += 2;
        else if (vuln.privilegesRequired === 'low') score += 1;

        // Impact
        if (vuln.impact === 'high') score += 3;
        else if (vuln.impact === 'medium') score += 2;
        else score += 1;

        const normalizedScore = Math.min(10, score);

        let severity;
        if (normalizedScore >= 9) severity = 'critical';
        else if (normalizedScore >= 7) severity = 'high';
        else if (normalizedScore >= 4) severity = 'medium';
        else severity = 'low';

        return {
            score: normalizedScore.toFixed(1),
            severity,
            priority: severity === 'critical' || severity === 'high' ? 'Immediate' : 'Scheduled'
        };
    }
}

/**
 * ResponsibleDisclosure handles ethical vulnerability reporting.
 */
class ResponsibleDisclosure {
    static process = {
        discovery: {
            step: 1,
            name: 'Discovery',
            action: 'Document the vulnerability completely',
            notes: 'Do not exploit beyond proof of concept'
        },
        reporting: {
            step: 2,
            name: 'Private Reporting',
            action: 'Contact vendor through security channels',
            channels: ['security@company.com', 'Bug bounty platform', 'Security page']
        },
        coordination: {
            step: 3,
            name: 'Coordination',
            action: 'Work with vendor on fix timeline',
            timeline: 'Typically 90 days'
        },
        remediation: {
            step: 4,
            name: 'Remediation',
            action: 'Vendor develops and deploys fix',
            verification: 'Confirm fix addresses issue'
        },
        disclosure: {
            step: 5,
            name: 'Public Disclosure',
            action: 'Publish details after fix is available',
            content: 'Technical details, timeline, credits'
        }
    };

    /**
     * Creates disclosure timeline
     * @param {Date} reportDate - Initial report date
     * @returns {Object} Timeline
     */
    static createTimeline(reportDate) {
        const timeline = {};
        let currentDate = new Date(reportDate);

        timeline.reported = currentDate.toISOString().split('T')[0];

        currentDate.setDate(currentDate.getDate() + 7);
        timeline.acknowledgmentDeadline = currentDate.toISOString().split('T')[0];

        currentDate.setDate(currentDate.getDate() + 83);
        timeline.remediationDeadline = currentDate.toISOString().split('T')[0];

        currentDate.setDate(currentDate.getDate() + 7);
        timeline.publicDisclosure = currentDate.toISOString().split('T')[0];

        return {
            timeline,
            totalDays: 97,
            note: 'Industry standard is 90 days for remediation'
        };
    }
}

/**
 * BugBountyProgram simulates bug bounty rewards.
 */
class BugBountyProgram {
    static rewards = {
        critical: { min: 5000, max: 50000, description: 'RCE, data breach potential' },
        high: { min: 1000, max: 10000, description: 'Significant security impact' },
        medium: { min: 250, max: 2000, description: 'Limited security impact' },
        low: { min: 50, max: 500, description: 'Minor security issues' }
    };

    constructor(name, scope) {
        this.name = name;
        this.scope = scope;
        this.submissions = [];
        this.totalPaid = 0;
    }

    /**
     * Submits a vulnerability
     * @param {Object} submission - Vulnerability submission
     * @returns {Object} Submission result
     */
    submit(submission) {
        const assessment = VulnerabilityAssessment.assessSeverity(submission);
        const rewardRange = BugBountyProgram.rewards[assessment.severity];

        const reward = Math.floor(
            rewardRange.min + Math.random() * (rewardRange.max - rewardRange.min)
        );

        const result = {
            id: `BB-${Date.now()}`,
            title: submission.title,
            severity: assessment.severity,
            status: 'triaged',
            reward,
            submittedAt: new Date()
        };

        this.submissions.push(result);
        this.totalPaid += reward;

        return result;
    }

    /**
     * Gets program statistics
     * @returns {Object} Statistics
     */
    getStats() {
        const bySeverity = {};
        for (const severity of ['critical', 'high', 'medium', 'low']) {
            bySeverity[severity] = this.submissions.filter(s => s.severity === severity).length;
        }

        return {
            program: this.name,
            totalSubmissions: this.submissions.length,
            bySeverity,
            totalPaid: '$' + this.totalPaid.toLocaleString(),
            avgReward: '$' + Math.floor(this.totalPaid / this.submissions.length || 0)
        };
    }
}

/**
 * SecurityTestingEthics defines ethical guidelines.
 */
class SecurityTestingEthics {
    static principles = [
        {
            principle: 'Authorization',
            description: 'Always obtain written permission before testing',
            violation: 'Unauthorized access is illegal regardless of intent'
        },
        {
            principle: 'Scope Adherence',
            description: 'Stay within defined testing boundaries',
            violation: 'Testing out of scope can cause harm'
        },
        {
            principle: 'Minimal Impact',
            description: 'Avoid causing damage or data loss',
            violation: 'Even ethical testing should not harm systems'
        },
        {
            principle: 'Confidentiality',
            description: 'Protect discovered vulnerabilities and data',
            violation: 'Exposing vulnerabilities puts others at risk'
        },
        {
            principle: 'Responsible Disclosure',
            description: 'Report findings properly and allow time for fixes',
            violation: 'Premature disclosure enables attacks'
        }
    ];

    /**
     * Validates testing authorization
     * @param {Object} authorization - Authorization document
     * @returns {Object} Validation result
     */
    static validateAuthorization(authorization) {
        const required = ['scope', 'startDate', 'endDate', 'authorizedBy', 'testerName'];
        const missing = required.filter(field => !authorization[field]);

        return {
            valid: missing.length === 0,
            missing,
            withinDateRange: authorization.startDate <= new Date() &&
                authorization.endDate >= new Date(),
            recommendation: missing.length > 0
                ? 'Obtain complete written authorization'
                : 'Authorization appears valid'
        };
    }
}

// Demonstration
console.log('=== White Hat vs Black Hat Demo ===\n');

// Hacker types
console.log('--- Hacker Types ---');
console.log('White Hat:', HackerType.getType('whiteHat'));
console.log('\nComparison:', HackerType.compare());

// Penetration test
console.log('\n--- Penetration Test Simulation ---');
const pentest = new PenetrationTest({
    target: 'web-application.example.com',
    type: 'Web Application',
    authorization: 'AUTH-2024-001'
});

pentest.addFinding({
    title: 'SQL Injection in login form',
    severity: 'critical',
    description: 'Unsanitized user input allows SQL injection'
});

pentest.addFinding({
    title: 'Missing HTTPS on login page',
    severity: 'high',
    description: 'Credentials transmitted in plaintext'
});

pentest.addFinding({
    title: 'Verbose error messages',
    severity: 'low',
    description: 'Stack traces exposed to users'
});

console.log('Report:', pentest.generateReport());

// Vulnerability assessment
console.log('\n--- Vulnerability Assessment ---');
console.log(VulnerabilityAssessment.assessSeverity({
    attackVector: 'network',
    complexity: 'low',
    privilegesRequired: 'none',
    impact: 'high'
}));

// Responsible disclosure
console.log('\n--- Responsible Disclosure Timeline ---');
console.log(ResponsibleDisclosure.createTimeline(new Date()));

// Bug bounty
console.log('\n--- Bug Bounty Program ---');
const bounty = new BugBountyProgram('ExampleCorp Security', ['*.example.com']);
bounty.submit({
    title: 'XSS in search field',
    attackVector: 'network',
    complexity: 'low',
    privilegesRequired: 'none',
    impact: 'medium'
});
bounty.submit({
    title: 'IDOR in user profiles',
    attackVector: 'network',
    complexity: 'low',
    privilegesRequired: 'low',
    impact: 'high'
});
console.log('Stats:', bounty.getStats());

// Ethics validation
console.log('\n--- Authorization Validation ---');
console.log(SecurityTestingEthics.validateAuthorization({
    scope: '*.example.com',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    authorizedBy: 'CTO',
    testerName: 'Security Team'
}));

/**
 * Best Practices for Ethical Security Testing:
 *
 * 1. Always obtain written authorization
 * 2. Define clear scope and boundaries
 * 3. Document all findings thoroughly
 * 4. Follow responsible disclosure practices
 * 5. Minimize impact during testing
 * 6. Protect sensitive data discovered
 * 7. Report findings promptly
 * 8. Verify fixes address root causes
 * 9. Maintain professional certifications
 * 10. Stay updated on legal requirements
 */
