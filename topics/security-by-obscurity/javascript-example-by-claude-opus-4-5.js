/**
 * Security by Obscurity - Understanding Its Limitations
 *
 * Security by obscurity is a term used to describe a security measure that
 * relies on the secrecy or complexity of a system as the primary means of
 * protection against unauthorized access. While hiding details can add a layer
 * of defense, it should never be the sole security mechanism.
 *
 * Key Concepts:
 * - Secrecy is not security
 * - Obscurity as a layer, not foundation
 * - Kerckhoffs's principle
 * - Defense in depth
 */

/**
 * ObscurityExample demonstrates security by obscurity patterns.
 */
class ObscurityExample {
    static examples = {
        hiddenAdminPage: {
            name: 'Hidden Admin Page',
            approach: 'Admin panel at /admin-secret-path-12345 instead of /admin',
            problem: 'URL can be discovered through links, referrers, or enumeration',
            weakness: 'Once discovered, there is no access control',
            betterApproach: 'Proper authentication + authorization, even if URL is known'
        },
        obfuscatedCode: {
            name: 'Obfuscated Client-Side Code',
            approach: 'Minify/obfuscate JavaScript to hide logic',
            problem: 'Code can be de-obfuscated, debugging tools exist',
            weakness: 'Attackers have unlimited time to analyze',
            betterApproach: 'Server-side validation, assume client code is visible'
        },
        customPorts: {
            name: 'Non-Standard Ports',
            approach: 'Run SSH on port 2222 instead of 22',
            problem: 'Port scanners can find any open port',
            weakness: 'Slightly delays attack, doesnt prevent it',
            betterApproach: 'Key-based auth, fail2ban, proper firewall rules'
        },
        proprietaryProtocol: {
            name: 'Proprietary Protocol',
            approach: 'Use custom protocol assuming attackers wont understand it',
            problem: 'Protocol can be reverse-engineered',
            weakness: 'No peer review means more vulnerabilities',
            betterApproach: 'Use established, reviewed protocols (TLS, etc.)'
        },
        hiddenFormFields: {
            name: 'Hidden Form Fields',
            approach: 'Store sensitive data in hidden HTML fields',
            problem: 'Source code is visible, easily modified',
            weakness: 'Users can change any field value',
            betterApproach: 'Server-side session storage, signed tokens'
        },
        secretAlgorithm: {
            name: 'Secret Encryption Algorithm',
            approach: 'Custom encryption algorithm known only to developers',
            problem: 'Algorithm will likely have weaknesses',
            weakness: 'No cryptographic review, prone to flaws',
            betterApproach: 'Use standard algorithms (AES, RSA) with proper keys'
        }
    };

    /**
     * Gets example by name
     * @param {string} name - Example name
     * @returns {Object} Example
     */
    static getExample(name) {
        return this.examples[name];
    }

    /**
     * Gets all examples
     * @returns {Array} All examples
     */
    static getAllExamples() {
        return Object.entries(this.examples).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * KerckhoffsPrinciple explains the fundamental security principle.
 */
class KerckhoffsPrinciple {
    static principle = {
        statement: 'A cryptosystem should be secure even if everything about the system, except the key, is public knowledge',
        origin: 'Auguste Kerckhoffs, 1883',
        modernInterpretation: 'Security should depend on the secrecy of keys, not algorithms',
        implications: [
            'Algorithms should be publicly known and reviewed',
            'Security comes from key secrecy and proper implementation',
            'Open source security software can be very secure',
            'Proprietary algorithms are often weaker due to no peer review'
        ]
    };

    /**
     * Applies the principle to evaluate security
     * @param {Object} system - System to evaluate
     * @returns {Object} Evaluation
     */
    static evaluate(system) {
        const issues = [];

        if (system.reliesOnSecretAlgorithm) {
            issues.push('Relies on secret algorithm - violates Kerckhoffs principle');
        }

        if (system.securityDependsOnObscurity) {
            issues.push('Security depends primarily on obscurity');
        }

        if (!system.hasProperKeyManagement) {
            issues.push('No proper key management in place');
        }

        if (!system.usesStandardCrypto) {
            issues.push('Does not use standard, reviewed cryptography');
        }

        return {
            compliant: issues.length === 0,
            issues,
            recommendation: issues.length > 0
                ? 'Redesign security to not rely on secrecy of mechanisms'
                : 'System follows Kerckhoffs principle'
        };
    }
}

/**
 * ObscurityAssessment evaluates security by obscurity risks.
 */
class ObscurityAssessment {
    /**
     * Assesses a security measure
     * @param {Object} measure - Security measure to assess
     * @returns {Object} Assessment
     */
    static assess(measure) {
        const assessment = {
            measure: measure.name,
            category: this.categorize(measure),
            obscurityScore: this.calculateObscurityScore(measure),
            realSecurityValue: this.calculateRealValue(measure),
            risks: this.identifyRisks(measure),
            recommendation: ''
        };

        if (assessment.obscurityScore > assessment.realSecurityValue) {
            assessment.recommendation = 'High reliance on obscurity - add real security controls';
        } else if (assessment.obscurityScore > 0) {
            assessment.recommendation = 'Obscurity present but not primary - acceptable as layer';
        } else {
            assessment.recommendation = 'Good security design - not relying on obscurity';
        }

        return assessment;
    }

    /**
     * Categorizes the security measure
     * @param {Object} measure - Measure to categorize
     * @returns {string} Category
     */
    static categorize(measure) {
        if (measure.reliesOnHiding && !measure.hasRealControls) {
            return 'Pure obscurity - dangerous';
        }
        if (measure.reliesOnHiding && measure.hasRealControls) {
            return 'Obscurity as additional layer - acceptable';
        }
        return 'Proper security - recommended';
    }

    /**
     * Calculates obscurity reliance score
     * @param {Object} measure - Measure to score
     * @returns {number} Score 0-10
     */
    static calculateObscurityScore(measure) {
        let score = 0;
        if (measure.reliesOnHiding) score += 4;
        if (measure.assumesAttackerIgnorance) score += 3;
        if (measure.usesNonStandardPaths) score += 2;
        if (measure.lacksAccessControl) score += 1;
        return Math.min(10, score);
    }

    /**
     * Calculates real security value
     * @param {Object} measure - Measure to evaluate
     * @returns {number} Score 0-10
     */
    static calculateRealValue(measure) {
        let score = 0;
        if (measure.hasAuthentication) score += 3;
        if (measure.hasAuthorization) score += 3;
        if (measure.usesEncryption) score += 2;
        if (measure.hasAuditLogging) score += 1;
        if (measure.hasRateLimiting) score += 1;
        return Math.min(10, score);
    }

    /**
     * Identifies risks
     * @param {Object} measure - Measure to analyze
     * @returns {Array} Risks
     */
    static identifyRisks(measure) {
        const risks = [];

        if (measure.reliesOnHiding && !measure.hasAccessControl) {
            risks.push({
                risk: 'Discovery leads to full access',
                severity: 'critical',
                mitigation: 'Add proper access controls'
            });
        }

        if (measure.usesNonStandardPaths) {
            risks.push({
                risk: 'Path can be enumerated or leaked',
                severity: 'medium',
                mitigation: 'Implement authentication regardless of path'
            });
        }

        if (measure.assumesAttackerIgnorance) {
            risks.push({
                risk: 'Attacker may have insider knowledge',
                severity: 'high',
                mitigation: 'Design assuming attacker knows the system'
            });
        }

        return risks;
    }
}

/**
 * DefenseInDepth demonstrates proper layered security.
 */
class DefenseInDepth {
    /**
     * Gets defense layers
     * @returns {Array} Defense layers
     */
    static getLayers() {
        return [
            {
                layer: 'Physical',
                controls: ['Locked server rooms', 'Badge access', 'Surveillance'],
                obscurityRole: 'Not applicable - physical controls are primary'
            },
            {
                layer: 'Network',
                controls: ['Firewalls', 'IDS/IPS', 'Network segmentation'],
                obscurityRole: 'Non-standard ports can add minor obstacle'
            },
            {
                layer: 'Host',
                controls: ['Patching', 'Antivirus', 'Host firewall'],
                obscurityRole: 'Limited value - focus on hardening'
            },
            {
                layer: 'Application',
                controls: ['Authentication', 'Authorization', 'Input validation'],
                obscurityRole: 'Never rely on hidden endpoints'
            },
            {
                layer: 'Data',
                controls: ['Encryption', 'Access controls', 'Data masking'],
                obscurityRole: 'Encryption with secret keys is proper security'
            }
        ];
    }

    /**
     * Evaluates defense layers
     * @param {Object} system - System to evaluate
     * @returns {Object} Evaluation
     */
    static evaluate(system) {
        const layers = this.getLayers();
        const coverage = [];

        for (const layer of layers) {
            const systemLayer = system.layers?.[layer.layer.toLowerCase()];
            coverage.push({
                layer: layer.layer,
                implemented: systemLayer?.implemented || false,
                controls: systemLayer?.controls || [],
                missing: layer.controls.filter(c =>
                    !systemLayer?.controls?.includes(c)
                )
            });
        }

        const implementedCount = coverage.filter(c => c.implemented).length;

        return {
            layers: coverage,
            implementedLayers: implementedCount,
            totalLayers: layers.length,
            defenseDepth: implementedCount >= 4 ? 'good' : implementedCount >= 2 ? 'moderate' : 'poor',
            recommendation: implementedCount < layers.length
                ? `Implement ${layers.length - implementedCount} more layer(s) for defense in depth`
                : 'Good defense in depth coverage'
        };
    }
}

/**
 * ObscurityBestPractices provides guidance on proper use of obscurity.
 */
class ObscurityBestPractices {
    /**
     * Gets best practices
     * @returns {Array} Best practices
     */
    static getPractices() {
        return [
            {
                practice: 'Never rely solely on obscurity',
                description: 'Obscurity should be a layer, not the foundation',
                good: 'Auth + hidden admin path',
                bad: 'Only hidden admin path'
            },
            {
                practice: 'Assume attackers know everything',
                description: 'Design security assuming full system knowledge',
                good: 'Security works even if code is public',
                bad: 'Security relies on secret algorithm'
            },
            {
                practice: 'Use standard, reviewed algorithms',
                description: 'Cryptographic security from reviewed implementations',
                good: 'AES-256 encryption',
                bad: 'Custom XOR-based encryption'
            },
            {
                practice: 'Implement proper access controls',
                description: 'Authentication and authorization are primary controls',
                good: 'Role-based access control',
                bad: 'Unlinked page is "secure"'
            },
            {
                practice: 'Accept obscurity as minor delay only',
                description: 'Obscurity buys time, not security',
                good: 'Non-standard SSH port + key auth',
                bad: 'Non-standard SSH port only'
            },
            {
                practice: 'Dont hide vulnerabilities',
                description: 'Fix issues rather than hiding them',
                good: 'Patch vulnerability immediately',
                bad: 'Rename vulnerable endpoint'
            }
        ];
    }

    /**
     * Evaluates a security decision
     * @param {Object} decision - Security decision
     * @returns {Object} Evaluation
     */
    static evaluateDecision(decision) {
        const violations = [];

        if (decision.reliesOnlyOnObscurity) {
            violations.push('Relies solely on obscurity');
        }

        if (decision.usesCustomCrypto) {
            violations.push('Uses custom cryptographic algorithm');
        }

        if (decision.assumesAttackerIgnorance) {
            violations.push('Assumes attacker lacks knowledge');
        }

        if (decision.hidesInsteadOfFixes) {
            violations.push('Hides vulnerability instead of fixing');
        }

        return {
            decision: decision.description,
            followsBestPractices: violations.length === 0,
            violations,
            recommendation: violations.length > 0
                ? 'Reconsider approach - ' + violations.join(', ')
                : 'Decision follows security best practices'
        };
    }
}

// Demonstration
console.log('=== Security by Obscurity Demo ===\n');

// Obscurity examples
console.log('--- Obscurity Examples ---');
ObscurityExample.getAllExamples().slice(0, 3).forEach(example => {
    console.log(`\n${example.name}:`);
    console.log(`  Approach: ${example.approach}`);
    console.log(`  Problem: ${example.problem}`);
    console.log(`  Better: ${example.betterApproach}`);
});

// Kerckhoffs's Principle
console.log('\n--- Kerckhoffs\'s Principle ---');
console.log('Statement:', KerckhoffsPrinciple.principle.statement);
console.log('Implications:', KerckhoffsPrinciple.principle.implications.slice(0, 2));

console.log('\nSystem Evaluation:', KerckhoffsPrinciple.evaluate({
    reliesOnSecretAlgorithm: true,
    securityDependsOnObscurity: true,
    hasProperKeyManagement: false,
    usesStandardCrypto: false
}));

// Obscurity Assessment
console.log('\n--- Obscurity Assessment ---');
console.log('Assessment:', ObscurityAssessment.assess({
    name: 'Hidden Admin Page',
    reliesOnHiding: true,
    hasRealControls: false,
    assumesAttackerIgnorance: true,
    usesNonStandardPaths: true,
    lacksAccessControl: true,
    hasAuthentication: false,
    hasAuthorization: false
}));

// Defense in Depth
console.log('\n--- Defense in Depth ---');
console.log('Defense Layers:', DefenseInDepth.getLayers().map(l => l.layer));

console.log('\nSystem Evaluation:', DefenseInDepth.evaluate({
    layers: {
        network: { implemented: true, controls: ['Firewalls', 'IDS/IPS'] },
        application: { implemented: true, controls: ['Authentication', 'Authorization'] },
        data: { implemented: true, controls: ['Encryption'] }
    }
}));

// Best Practices
console.log('\n--- Best Practices ---');
ObscurityBestPractices.getPractices().slice(0, 3).forEach(practice => {
    console.log(`\n${practice.practice}:`);
    console.log(`  Good: ${practice.good}`);
    console.log(`  Bad: ${practice.bad}`);
});

// Decision Evaluation
console.log('\n--- Decision Evaluation ---');
console.log('Bad decision:', ObscurityBestPractices.evaluateDecision({
    description: 'Hide admin panel at secret URL',
    reliesOnlyOnObscurity: true,
    assumesAttackerIgnorance: true
}));

console.log('\nGood decision:', ObscurityBestPractices.evaluateDecision({
    description: 'Add MFA to admin panel + use non-standard URL',
    reliesOnlyOnObscurity: false,
    assumesAttackerIgnorance: false
}));

/**
 * Best Practices for Security Design:
 *
 * 1. Never rely solely on secrecy for security
 * 2. Follow Kerckhoffs's principle - security from keys, not algorithms
 * 3. Use standard, peer-reviewed cryptographic algorithms
 * 4. Implement proper authentication and authorization
 * 5. Use obscurity only as an additional layer
 * 6. Design assuming attackers know your system
 * 7. Fix vulnerabilities rather than hiding them
 * 8. Implement defense in depth with multiple layers
 * 9. Conduct security reviews assuming code is public
 * 10. Test security without relying on hidden information
 */
