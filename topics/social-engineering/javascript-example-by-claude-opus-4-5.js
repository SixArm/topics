/**
 * Social Engineering - Human-Focused Security Threats
 *
 * Social engineering is the art of manipulating people to take actions or
 * divulge sensitive information that they would not otherwise do under normal
 * circumstances. It is a psychological attack used by cybercriminals to gain
 * unauthorized access to systems and data by exploiting human vulnerabilities.
 *
 * Key Concepts:
 * - Human psychology exploitation
 * - Trust and authority manipulation
 * - Information gathering techniques
 * - Security awareness training
 */

/**
 * SocialEngineeringAttack represents different attack types.
 */
class SocialEngineeringAttack {
    static types = {
        phishing: {
            name: 'Phishing',
            description: 'Fraudulent emails or websites that appear legitimate',
            medium: 'Email, websites',
            technique: 'Impersonation of trusted entities',
            indicators: [
                'Urgent or threatening language',
                'Suspicious sender address',
                'Generic greetings',
                'Spelling and grammar errors',
                'Requests for sensitive information'
            ],
            impact: 'Credential theft, malware installation'
        },
        spearPhishing: {
            name: 'Spear Phishing',
            description: 'Targeted phishing aimed at specific individuals',
            medium: 'Email',
            technique: 'Personalized attacks using gathered information',
            indicators: [
                'Uses personal details',
                'Appears from known contact',
                'References specific projects',
                'Still has urgency element'
            ],
            impact: 'Higher success rate, executive targeting'
        },
        pretexting: {
            name: 'Pretexting',
            description: 'Creating a fabricated scenario to extract information',
            medium: 'Phone, in-person, email',
            technique: 'Assuming a false identity with a story',
            examples: [
                'IT support needing password',
                'Bank verifying account details',
                'Survey collecting information',
                'Job recruiter gathering intel'
            ],
            impact: 'Information disclosure, access credentials'
        },
        baiting: {
            name: 'Baiting',
            description: 'Offering something enticing to lure victims',
            medium: 'Physical media, online downloads',
            technique: 'Exploiting curiosity or greed',
            examples: [
                'Infected USB drives in parking lots',
                'Free software downloads with malware',
                'Prize winning notifications',
                'Free movie/music downloads'
            ],
            impact: 'Malware installation, network compromise'
        },
        quidProQuo: {
            name: 'Quid Pro Quo',
            description: 'Offering a service in exchange for information',
            medium: 'Phone, email',
            technique: 'Providing help that requires credentials',
            examples: [
                'Free IT support requiring remote access',
                'Free security audit needing passwords',
                'Assistance requiring system access'
            ],
            impact: 'System access, credential theft'
        },
        tailgating: {
            name: 'Tailgating/Piggybacking',
            description: 'Following authorized person into secured area',
            medium: 'Physical',
            technique: 'Exploiting courtesy and politeness',
            examples: [
                'Following employee through door',
                'Pretending to have hands full',
                'Claiming to have forgotten badge'
            ],
            impact: 'Physical access to restricted areas'
        },
        vishing: {
            name: 'Vishing (Voice Phishing)',
            description: 'Phishing conducted via phone calls',
            medium: 'Phone',
            technique: 'Voice impersonation and urgency',
            examples: [
                'IRS/tax authority scams',
                'Bank fraud department calls',
                'Tech support scams',
                'CEO fraud calls'
            ],
            impact: 'Financial loss, credential theft'
        }
    };

    /**
     * Gets attack type by name
     * @param {string} name - Attack type name
     * @returns {Object} Attack details
     */
    static getType(name) {
        return this.types[name];
    }

    /**
     * Gets all attack types
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
 * PsychologyPrinciple explains manipulation techniques.
 */
class PsychologyPrinciple {
    static principles = {
        authority: {
            name: 'Authority',
            description: 'People tend to comply with authority figures',
            exploitation: 'Impersonating executives, IT, law enforcement',
            example: 'Email from "CEO" requesting urgent wire transfer',
            defense: 'Verify identity through known channels'
        },
        urgency: {
            name: 'Urgency/Scarcity',
            description: 'Pressure to act quickly bypasses careful thinking',
            exploitation: 'Time-limited offers, threats, deadlines',
            example: 'Account will be closed in 24 hours',
            defense: 'Take time to verify, urgent requests are red flags'
        },
        socialProof: {
            name: 'Social Proof',
            description: 'People follow what others are doing',
            exploitation: 'Claiming others have complied or participated',
            example: 'Your colleagues have already submitted their passwords',
            defense: 'Verify independently, dont follow blindly'
        },
        reciprocity: {
            name: 'Reciprocity',
            description: 'Feeling obligated to return favors',
            exploitation: 'Offering help or gifts before asking',
            example: 'I fixed your printer, can you tell me the admin password?',
            defense: 'Recognize manipulation, no obligation to reciprocate with sensitive info'
        },
        likability: {
            name: 'Likability',
            description: 'People comply with those they like',
            exploitation: 'Building rapport before request',
            example: 'Friendly caller builds relationship before asking for access',
            defense: 'Maintain professional boundaries, follow procedures'
        },
        commitment: {
            name: 'Commitment/Consistency',
            description: 'People honor commitments and stay consistent',
            exploitation: 'Getting small agreements leading to larger ones',
            example: 'Starting with innocent questions, escalating to sensitive',
            defense: 'Be willing to say no at any point'
        }
    };

    /**
     * Gets principle by name
     * @param {string} name - Principle name
     * @returns {Object} Principle
     */
    static getPrinciple(name) {
        return this.principles[name];
    }

    /**
     * Gets all principles
     * @returns {Array} All principles
     */
    static getAllPrinciples() {
        return Object.entries(this.principles).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * PhishingAnalyzer analyzes potential phishing attempts.
 */
class PhishingAnalyzer {
    /**
     * Analyzes an email for phishing indicators
     * @param {Object} email - Email to analyze
     * @returns {Object} Analysis
     */
    static analyzeEmail(email) {
        const indicators = [];
        let riskScore = 0;

        // Check sender
        if (email.senderDomain && !email.trustedDomains?.includes(email.senderDomain)) {
            indicators.push('Sender domain not in trusted list');
            riskScore += 20;
        }

        if (email.displayName !== email.actualSender) {
            indicators.push('Display name differs from actual sender');
            riskScore += 30;
        }

        // Check content
        if (email.hasUrgentLanguage) {
            indicators.push('Contains urgent/threatening language');
            riskScore += 15;
        }

        if (email.requestsSensitiveInfo) {
            indicators.push('Requests sensitive information');
            riskScore += 25;
        }

        if (email.hasLinks) {
            if (email.linkDomainMismatch) {
                indicators.push('Link text doesnt match actual URL');
                riskScore += 30;
            }
        }

        if (email.hasAttachment && email.suspiciousAttachmentType) {
            indicators.push('Suspicious attachment type');
            riskScore += 25;
        }

        if (email.spellingErrors > 2) {
            indicators.push('Multiple spelling/grammar errors');
            riskScore += 10;
        }

        const riskLevel = riskScore >= 60 ? 'high' :
            riskScore >= 30 ? 'medium' : 'low';

        return {
            riskScore: Math.min(100, riskScore),
            riskLevel,
            indicators,
            recommendation: riskLevel === 'high'
                ? 'Do not interact, report to security team'
                : riskLevel === 'medium'
                    ? 'Verify through alternative channel before responding'
                    : 'Appears legitimate, but stay vigilant'
        };
    }

    /**
     * Checks URL for suspicious patterns
     * @param {string} url - URL to check
     * @returns {Object} Analysis
     */
    static analyzeUrl(url) {
        const indicators = [];

        // Check for IP address instead of domain
        if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
            indicators.push('URL uses IP address instead of domain');
        }

        // Check for suspicious TLDs
        const suspiciousTlds = ['.xyz', '.top', '.club', '.work'];
        if (suspiciousTlds.some(tld => url.includes(tld))) {
            indicators.push('Suspicious top-level domain');
        }

        // Check for typosquatting
        const commonBrands = ['google', 'microsoft', 'apple', 'amazon', 'paypal'];
        for (const brand of commonBrands) {
            if (url.includes(brand) && !url.includes(`${brand}.com`)) {
                indicators.push(`Possible typosquatting of ${brand}`);
            }
        }

        // Check for excessive subdomains
        const subdomainCount = (url.match(/\./g) || []).length;
        if (subdomainCount > 3) {
            indicators.push('Excessive subdomains');
        }

        return {
            url,
            suspicious: indicators.length > 0,
            indicators,
            recommendation: indicators.length > 0
                ? 'Do not click - verify URL through official channels'
                : 'URL appears normal, but verify if unexpected'
        };
    }
}

/**
 * SecurityAwarenessTraining provides training content.
 */
class SecurityAwarenessTraining {
    /**
     * Gets training modules
     * @returns {Array} Modules
     */
    static getModules() {
        return [
            {
                module: 'Phishing Recognition',
                duration: '30 minutes',
                topics: [
                    'Email phishing indicators',
                    'URL analysis',
                    'Reporting procedures',
                    'Real-world examples'
                ],
                assessment: 'Simulated phishing test'
            },
            {
                module: 'Social Engineering Tactics',
                duration: '45 minutes',
                topics: [
                    'Psychology of manipulation',
                    'Common attack scenarios',
                    'Information protection',
                    'Verification procedures'
                ],
                assessment: 'Scenario-based quiz'
            },
            {
                module: 'Physical Security',
                duration: '20 minutes',
                topics: [
                    'Tailgating prevention',
                    'Badge security',
                    'Visitor procedures',
                    'Clean desk policy'
                ],
                assessment: 'Knowledge check'
            },
            {
                module: 'Incident Response',
                duration: '25 minutes',
                topics: [
                    'Recognizing incidents',
                    'Reporting channels',
                    'Immediate actions',
                    'Documentation'
                ],
                assessment: 'Incident simulation'
            }
        ];
    }

    /**
     * Gets best practices
     * @returns {Array} Best practices
     */
    static getBestPractices() {
        return [
            {
                category: 'Email Security',
                practices: [
                    'Verify sender before responding',
                    'Hover over links before clicking',
                    'Never open unexpected attachments',
                    'Report suspicious emails'
                ]
            },
            {
                category: 'Phone Security',
                practices: [
                    'Verify caller identity independently',
                    'Never share passwords over phone',
                    'Be wary of unsolicited calls',
                    'Call back using official numbers'
                ]
            },
            {
                category: 'Physical Security',
                practices: [
                    'Never hold door for strangers',
                    'Challenge unknown visitors',
                    'Secure sensitive documents',
                    'Lock workstation when leaving'
                ]
            },
            {
                category: 'Information Sharing',
                practices: [
                    'Verify need-to-know',
                    'Use secure channels',
                    'Be careful on social media',
                    'Shred sensitive documents'
                ]
            }
        ];
    }
}

/**
 * IncidentResponse handles social engineering incidents.
 */
class IncidentResponse {
    /**
     * Gets response procedures
     * @param {string} incidentType - Type of incident
     * @returns {Object} Procedures
     */
    static getResponseProcedures(incidentType) {
        const procedures = {
            phishing: {
                immediate: [
                    'Do not click any links',
                    'Do not download attachments',
                    'Do not reply to the email',
                    'Report to security team'
                ],
                ifClicked: [
                    'Disconnect from network',
                    'Change passwords immediately',
                    'Notify IT security',
                    'Document what was clicked'
                ],
                recovery: [
                    'Scan system for malware',
                    'Monitor accounts for suspicious activity',
                    'Complete incident report'
                ]
            },
            credentialCompromise: {
                immediate: [
                    'Change all affected passwords',
                    'Enable MFA if not already',
                    'Notify IT security',
                    'Review recent account activity'
                ],
                investigation: [
                    'Identify how credentials were compromised',
                    'Check for unauthorized access',
                    'Review connected systems'
                ],
                recovery: [
                    'Reset credentials on related systems',
                    'Monitor for suspicious activity',
                    'Update security training'
                ]
            },
            physicalBreach: {
                immediate: [
                    'Notify security personnel',
                    'Do not confront the intruder',
                    'Document observations',
                    'Secure sensitive areas'
                ],
                investigation: [
                    'Review access logs',
                    'Check security camera footage',
                    'Interview witnesses'
                ],
                recovery: [
                    'Review physical security procedures',
                    'Update access controls',
                    'Retrain staff'
                ]
            }
        };

        return procedures[incidentType] || {
            immediate: ['Report to security team immediately'],
            investigation: ['Security team will investigate'],
            recovery: ['Follow security team guidance']
        };
    }
}

/**
 * PhishingSimulator simulates phishing campaigns for training.
 */
class PhishingSimulator {
    constructor() {
        this.campaigns = [];
    }

    /**
     * Creates a simulation campaign
     * @param {Object} options - Campaign options
     * @returns {Object} Campaign
     */
    createCampaign(options) {
        const campaign = {
            id: `CAMP-${Date.now()}`,
            name: options.name,
            template: options.template,
            targetGroup: options.targetGroup,
            startDate: options.startDate,
            status: 'created',
            results: {
                sent: 0,
                opened: 0,
                clicked: 0,
                reported: 0
            }
        };

        this.campaigns.push(campaign);
        return campaign;
    }

    /**
     * Gets campaign results
     * @param {string} campaignId - Campaign ID
     * @returns {Object} Results
     */
    getResults(campaignId) {
        const campaign = this.campaigns.find(c => c.id === campaignId);

        if (!campaign) return null;

        const { sent, opened, clicked, reported } = campaign.results;

        return {
            campaignId,
            name: campaign.name,
            results: campaign.results,
            metrics: {
                openRate: sent > 0 ? ((opened / sent) * 100).toFixed(1) + '%' : '0%',
                clickRate: sent > 0 ? ((clicked / sent) * 100).toFixed(1) + '%' : '0%',
                reportRate: sent > 0 ? ((reported / sent) * 100).toFixed(1) + '%' : '0%'
            },
            riskAssessment: clicked / sent > 0.2 ? 'high' :
                clicked / sent > 0.1 ? 'medium' : 'low',
            recommendation: clicked > reported
                ? 'Increase security awareness training'
                : 'Good awareness, continue training'
        };
    }
}

// Demonstration
console.log('=== Social Engineering Demo ===\n');

// Attack types
console.log('--- Social Engineering Attack Types ---');
SocialEngineeringAttack.getAllTypes().slice(0, 4).forEach(attack => {
    console.log(`\n${attack.name}: ${attack.description}`);
    console.log(`  Medium: ${attack.medium}`);
});

// Psychology principles
console.log('\n--- Psychology Principles Exploited ---');
PsychologyPrinciple.getAllPrinciples().slice(0, 3).forEach(principle => {
    console.log(`\n${principle.name}: ${principle.description}`);
    console.log(`  Defense: ${principle.defense}`);
});

// Phishing analysis
console.log('\n--- Phishing Email Analysis ---');
const emailAnalysis = PhishingAnalyzer.analyzeEmail({
    senderDomain: 'paypa1.com',
    trustedDomains: ['paypal.com'],
    displayName: 'PayPal Security',
    actualSender: 'security@paypa1.com',
    hasUrgentLanguage: true,
    requestsSensitiveInfo: true,
    hasLinks: true,
    linkDomainMismatch: true,
    spellingErrors: 3
});

console.log('Email Analysis:', emailAnalysis);

// URL analysis
console.log('\n--- URL Analysis ---');
console.log('Analysis:', PhishingAnalyzer.analyzeUrl('https://secure-paypa1.xyz/login'));

// Security training
console.log('\n--- Security Awareness Training ---');
SecurityAwarenessTraining.getModules().slice(0, 2).forEach(module => {
    console.log(`\n${module.module} (${module.duration}):`);
    console.log(`  Topics: ${module.topics.slice(0, 2).join(', ')}`);
});

// Incident response
console.log('\n--- Incident Response ---');
console.log('Phishing Response:', IncidentResponse.getResponseProcedures('phishing'));

// Best practices
console.log('\n--- Best Practices ---');
SecurityAwarenessTraining.getBestPractices().slice(0, 2).forEach(category => {
    console.log(`\n${category.category}:`);
    category.practices.forEach(p => console.log(`  - ${p}`));
});

/**
 * Best Practices for Social Engineering Defense:
 *
 * 1. Verify identity before sharing information
 * 2. Be suspicious of unsolicited requests
 * 3. Never share passwords or credentials
 * 4. Verify requests through known channels
 * 5. Report suspicious contacts to security
 * 6. Complete regular security awareness training
 * 7. Follow verification procedures, even for executives
 * 8. Secure physical access to facilities
 * 9. Be cautious with social media sharing
 * 10. Trust your instincts - if it seems suspicious, it probably is
 */
