/**
 * Spear Phishing - Targeted Social Engineering Attacks
 *
 * Spear phishing is a targeted form of phishing where an attacker sends
 * fraudulent communications to a specific individual, often posing as a
 * trustworthy entity. Unlike mass phishing, spear phishing attacks are
 * highly personalized using research on the target.
 *
 * Key Concepts:
 * - Targeted vs mass attacks
 * - Research-based personalization
 * - High-value target selection
 * - Defense through awareness
 */

/**
 * SpearPhishingAttack represents a targeted attack scenario.
 */
class SpearPhishingAttack {
    static characteristics = {
        targeting: {
            description: 'Specific individuals or organizations',
            methods: [
                'Research on social media',
                'LinkedIn connections',
                'Company website information',
                'News and press releases',
                'Public records'
            ]
        },
        personalization: {
            description: 'Custom-crafted messages',
            elements: [
                'Victim name and title',
                'Company references',
                'Project or colleague mentions',
                'Industry terminology',
                'Recent events references'
            ]
        },
        impersonation: {
            description: 'Trusted entity spoofing',
            targets: [
                'CEO or executives',
                'IT department',
                'HR department',
                'Vendors or partners',
                'Customers'
            ]
        },
        urgency: {
            description: 'Pressure to act quickly',
            tactics: [
                'Deadline pressure',
                'Account suspension threats',
                'Important document claims',
                'Time-sensitive requests',
                'Crisis scenarios'
            ]
        }
    };

    /**
     * Gets attack characteristics
     * @returns {Object} Characteristics
     */
    static getCharacteristics() {
        return this.characteristics;
    }
}

/**
 * SpearPhishingIndicator helps identify spear phishing attempts.
 */
class SpearPhishingIndicator {
    static indicators = {
        sender: [
            { indicator: 'Slight email domain variations', example: 'company.co vs company.com', severity: 'high' },
            { indicator: 'Display name mismatch', example: 'CEO Name <random@email.com>', severity: 'high' },
            { indicator: 'Free email for business', example: 'ceo.company@gmail.com', severity: 'medium' },
            { indicator: 'Recently created domain', example: 'Domain registered days ago', severity: 'high' }
        ],
        content: [
            { indicator: 'Unusual request from executive', example: 'CEO asking for gift cards', severity: 'high' },
            { indicator: 'Request to bypass procedures', example: 'Keep this between us', severity: 'high' },
            { indicator: 'Urgency with consequences', example: 'Must be done today or else', severity: 'medium' },
            { indicator: 'Request for credentials', example: 'Verify your password here', severity: 'critical' }
        ],
        technical: [
            { indicator: 'Mismatched URLs', example: 'Link text differs from actual URL', severity: 'high' },
            { indicator: 'Suspicious attachments', example: '.exe disguised as .pdf', severity: 'critical' },
            { indicator: 'External email warning ignored', example: 'Email from outside organization', severity: 'medium' }
        ]
    };

    /**
     * Analyzes an email for spear phishing indicators
     * @param {Object} email - Email to analyze
     * @returns {Object} Analysis result
     */
    static analyze(email) {
        const findings = [];
        let riskScore = 0;

        // Check sender indicators
        if (email.displayNameMismatch) {
            findings.push({ type: 'sender', issue: 'Display name mismatch', severity: 'high' });
            riskScore += 30;
        }

        if (email.domainVariation) {
            findings.push({ type: 'sender', issue: 'Domain variation detected', severity: 'high' });
            riskScore += 35;
        }

        // Check content indicators
        if (email.requestsCredentials) {
            findings.push({ type: 'content', issue: 'Requests credentials', severity: 'critical' });
            riskScore += 40;
        }

        if (email.unusualExecutiveRequest) {
            findings.push({ type: 'content', issue: 'Unusual executive request', severity: 'high' });
            riskScore += 30;
        }

        if (email.bypassesProcedures) {
            findings.push({ type: 'content', issue: 'Asks to bypass procedures', severity: 'high' });
            riskScore += 25;
        }

        // Check technical indicators
        if (email.mismatchedUrls) {
            findings.push({ type: 'technical', issue: 'URL mismatch detected', severity: 'high' });
            riskScore += 30;
        }

        if (email.suspiciousAttachment) {
            findings.push({ type: 'technical', issue: 'Suspicious attachment', severity: 'critical' });
            riskScore += 40;
        }

        const riskLevel = riskScore >= 70 ? 'critical' :
            riskScore >= 50 ? 'high' :
                riskScore >= 30 ? 'medium' : 'low';

        return {
            riskScore: Math.min(100, riskScore),
            riskLevel,
            findings,
            recommendation: riskLevel === 'critical' || riskLevel === 'high'
                ? 'Do not interact. Report to security team immediately.'
                : riskLevel === 'medium'
                    ? 'Verify through alternative channel before responding.'
                    : 'Appears lower risk, but remain vigilant.'
        };
    }
}

/**
 * TargetProfile represents information attackers gather.
 */
class TargetProfile {
    constructor(targetName) {
        this.targetName = targetName;
        this.dataPoints = [];
    }

    /**
     * Adds a data point (for awareness of what attackers collect)
     * @param {Object} dataPoint - Information gathered
     */
    addDataPoint(dataPoint) {
        this.dataPoints.push({
            type: dataPoint.type,
            value: dataPoint.value,
            source: dataPoint.source,
            risk: dataPoint.risk || 'medium'
        });
    }

    /**
     * Gets exposure assessment
     * @returns {Object} Assessment
     */
    getExposureAssessment() {
        const highRiskPoints = this.dataPoints.filter(dp => dp.risk === 'high');

        return {
            target: this.targetName,
            totalDataPoints: this.dataPoints.length,
            highRiskDataPoints: highRiskPoints.length,
            exposureLevel: highRiskPoints.length > 3 ? 'high' :
                highRiskPoints.length > 1 ? 'medium' : 'low',
            recommendation: 'Reduce publicly available information',
            sources: [...new Set(this.dataPoints.map(dp => dp.source))]
        };
    }
}

/**
 * SpearPhishingDefense provides defense strategies.
 */
class SpearPhishingDefense {
    /**
     * Gets technical defenses
     * @returns {Array} Technical defenses
     */
    static getTechnicalDefenses() {
        return [
            {
                defense: 'Email Authentication',
                description: 'Implement SPF, DKIM, and DMARC',
                effectiveness: 'high',
                implementation: 'Configure DNS records and email servers'
            },
            {
                defense: 'External Email Tagging',
                description: 'Mark emails from outside organization',
                effectiveness: 'medium',
                implementation: 'Configure email gateway rules'
            },
            {
                defense: 'Link Protection',
                description: 'Rewrite and scan URLs in emails',
                effectiveness: 'high',
                implementation: 'Deploy email security solution'
            },
            {
                defense: 'Attachment Sandboxing',
                description: 'Analyze attachments in isolated environment',
                effectiveness: 'high',
                implementation: 'Deploy sandbox analysis'
            },
            {
                defense: 'Multi-Factor Authentication',
                description: 'Require second factor for authentication',
                effectiveness: 'high',
                implementation: 'Enable MFA on all accounts'
            }
        ];
    }

    /**
     * Gets procedural defenses
     * @returns {Array} Procedural defenses
     */
    static getProceduralDefenses() {
        return [
            {
                defense: 'Out-of-Band Verification',
                description: 'Verify requests through separate channel',
                example: 'Call person directly using known number',
                effectiveness: 'high'
            },
            {
                defense: 'Wire Transfer Protocols',
                description: 'Multi-person approval for financial transfers',
                example: 'Require two approvals for transfers over $10k',
                effectiveness: 'high'
            },
            {
                defense: 'Information Classification',
                description: 'Label and protect sensitive information',
                example: 'Mark confidential documents',
                effectiveness: 'medium'
            },
            {
                defense: 'Incident Reporting',
                description: 'Easy process to report suspicious emails',
                example: 'Phishing report button in email client',
                effectiveness: 'high'
            }
        ];
    }

    /**
     * Gets training recommendations
     * @returns {Array} Training items
     */
    static getTrainingRecommendations() {
        return [
            {
                topic: 'Recognizing Spear Phishing',
                content: 'Identify personalized attack indicators',
                frequency: 'Quarterly'
            },
            {
                topic: 'Verification Procedures',
                content: 'How to verify suspicious requests',
                frequency: 'Ongoing'
            },
            {
                topic: 'Simulated Phishing',
                content: 'Test with realistic scenarios',
                frequency: 'Monthly'
            },
            {
                topic: 'Social Media Awareness',
                content: 'Limit information exposure',
                frequency: 'Annual'
            }
        ];
    }
}

/**
 * IncidentResponse handles spear phishing incidents.
 */
class IncidentResponse {
    /**
     * Gets response procedures
     * @param {string} scenario - Incident scenario
     * @returns {Object} Response procedures
     */
    static getResponse(scenario) {
        const responses = {
            'clicked_link': {
                immediate: [
                    'Disconnect from network',
                    'Do not enter any credentials',
                    'Note the URL visited',
                    'Contact IT security'
                ],
                investigation: [
                    'Scan device for malware',
                    'Check for credential harvesting',
                    'Review network traffic',
                    'Monitor account activity'
                ]
            },
            'opened_attachment': {
                immediate: [
                    'Disconnect from network immediately',
                    'Do not close any windows',
                    'Contact IT security',
                    'Note file name and type'
                ],
                investigation: [
                    'Full malware scan',
                    'Memory forensics if needed',
                    'Check for persistence mechanisms',
                    'Network traffic analysis'
                ]
            },
            'disclosed_credentials': {
                immediate: [
                    'Change password immediately',
                    'Enable MFA if not active',
                    'Notify IT security',
                    'Review account activity'
                ],
                investigation: [
                    'Check for unauthorized access',
                    'Review connected accounts',
                    'Monitor for lateral movement',
                    'Reset related credentials'
                ]
            },
            'financial_transfer': {
                immediate: [
                    'Contact bank immediately',
                    'Attempt to recall transfer',
                    'Notify legal and compliance',
                    'Document all communications'
                ],
                investigation: [
                    'Trace transfer details',
                    'Work with law enforcement',
                    'Review authorization process',
                    'Identify process gaps'
                ]
            }
        };

        return responses[scenario] || {
            immediate: ['Contact IT security team'],
            investigation: ['Security team will investigate']
        };
    }
}

// Demonstration
console.log('=== Spear Phishing Demo ===\n');

// Attack characteristics
console.log('--- Spear Phishing Characteristics ---');
const characteristics = SpearPhishingAttack.getCharacteristics();
Object.entries(characteristics).slice(0, 3).forEach(([key, value]) => {
    console.log(`\n${key}: ${value.description}`);
    console.log(`  Methods: ${value.methods?.slice(0, 2).join(', ') || value.elements?.slice(0, 2).join(', ')}`);
});

// Indicators
console.log('\n--- Spear Phishing Indicators ---');
Object.entries(SpearPhishingIndicator.indicators).forEach(([category, indicators]) => {
    console.log(`\n${category}:`);
    indicators.slice(0, 2).forEach(ind => {
        console.log(`  - ${ind.indicator} (${ind.severity})`);
    });
});

// Email analysis
console.log('\n--- Email Analysis ---');
const analysis = SpearPhishingIndicator.analyze({
    displayNameMismatch: true,
    domainVariation: true,
    requestsCredentials: false,
    unusualExecutiveRequest: true,
    bypassesProcedures: true,
    mismatchedUrls: false,
    suspiciousAttachment: false
});

console.log('Analysis Result:', analysis);

// Target profile exposure
console.log('\n--- Target Exposure Assessment ---');
const profile = new TargetProfile('John Smith, CFO');

profile.addDataPoint({ type: 'Title', value: 'CFO', source: 'LinkedIn', risk: 'high' });
profile.addDataPoint({ type: 'Email', value: 'john.smith@company.com', source: 'Company website', risk: 'high' });
profile.addDataPoint({ type: 'Recent news', value: 'Merger announcement', source: 'Press release', risk: 'high' });
profile.addDataPoint({ type: 'Colleagues', value: 'Multiple connections', source: 'LinkedIn', risk: 'medium' });

console.log('Exposure Assessment:', profile.getExposureAssessment());

// Defenses
console.log('\n--- Defense Strategies ---');
console.log('Technical:', SpearPhishingDefense.getTechnicalDefenses().slice(0, 3).map(d => d.defense));
console.log('Procedural:', SpearPhishingDefense.getProceduralDefenses().slice(0, 3).map(d => d.defense));

// Incident response
console.log('\n--- Incident Response ---');
console.log('Clicked Link Response:', IncidentResponse.getResponse('clicked_link'));

/**
 * Best Practices for Spear Phishing Defense:
 *
 * 1. Implement email authentication (SPF, DKIM, DMARC)
 * 2. Train employees on recognizing targeted attacks
 * 3. Verify unusual requests through separate channels
 * 4. Limit publicly available information
 * 5. Use multi-factor authentication everywhere
 * 6. Establish clear procedures for sensitive actions
 * 7. Deploy email security solutions
 * 8. Run regular phishing simulations
 * 9. Create easy incident reporting mechanisms
 * 10. Foster a security-conscious culture
 */
