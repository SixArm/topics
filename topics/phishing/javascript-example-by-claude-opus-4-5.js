/**
 * Phishing - Social Engineering Attack Defense
 *
 * Phishing is a social engineering attack where attackers pose as trustworthy
 * entities to steal sensitive information. Attackers use emails, messages,
 * and fake websites to deceive users into providing credentials, credit card
 * numbers, and other personal data. Defense requires awareness and technical controls.
 *
 * Key Concepts:
 * - Social engineering through deception
 * - Email, SMS, voice, and web-based attacks
 * - Urgency and fear tactics
 * - Technical and human defenses
 */

/**
 * PhishingIndicator represents signs of a phishing attempt.
 * Used for detection and training purposes.
 */
class PhishingIndicator {
    static indicators = {
        email: [
            { name: 'Spoofed sender', weight: 3, description: 'Sender address mimics legitimate domain' },
            { name: 'Urgent language', weight: 2, description: 'Creates false sense of urgency' },
            { name: 'Generic greeting', weight: 1, description: 'Uses "Dear Customer" instead of name' },
            { name: 'Suspicious links', weight: 3, description: 'Links to unfamiliar or misspelled domains' },
            { name: 'Attachment request', weight: 2, description: 'Unexpected attachment or download' },
            { name: 'Grammar errors', weight: 1, description: 'Poor grammar or spelling mistakes' },
            { name: 'Request for credentials', weight: 3, description: 'Asks for password or sensitive info' },
            { name: 'Mismatched URLs', weight: 3, description: 'Display text differs from actual link' }
        ],
        website: [
            { name: 'No HTTPS', weight: 3, description: 'Site does not use secure connection' },
            { name: 'Misspelled domain', weight: 3, description: 'Domain name has typos or variations' },
            { name: 'Poor design quality', weight: 1, description: 'Low-quality images or layout' },
            { name: 'Excessive data requests', weight: 2, description: 'Asks for more info than needed' },
            { name: 'Missing contact info', weight: 2, description: 'No legitimate contact information' },
            { name: 'Recent domain registration', weight: 2, description: 'Domain registered recently' }
        ]
    };

    /**
     * Gets indicators for a specific channel
     * @param {string} channel - email, website, etc.
     * @returns {Array} Indicators
     */
    static getIndicators(channel) {
        return this.indicators[channel] || [];
    }

    /**
     * Calculates risk score based on detected indicators
     * @param {Array} detectedIndicators - Indicators found
     * @returns {Object} Risk assessment
     */
    static calculateRiskScore(detectedIndicators) {
        const totalWeight = detectedIndicators.reduce((sum, ind) => sum + ind.weight, 0);

        let riskLevel = 'Low';
        if (totalWeight >= 8) riskLevel = 'Critical';
        else if (totalWeight >= 5) riskLevel = 'High';
        else if (totalWeight >= 3) riskLevel = 'Medium';

        return {
            score: totalWeight,
            level: riskLevel,
            indicators: detectedIndicators.length,
            recommendation: this.getRecommendation(riskLevel)
        };
    }

    /**
     * Gets recommendation based on risk level
     * @param {string} level - Risk level
     * @returns {string} Recommendation
     */
    static getRecommendation(level) {
        const recommendations = {
            Critical: 'Do not interact. Report immediately to security team.',
            High: 'Highly suspicious. Verify through official channels before any action.',
            Medium: 'Exercise caution. Verify sender/source independently.',
            Low: 'Appears legitimate but remain vigilant.'
        };
        return recommendations[level];
    }
}

/**
 * EmailAnalyzer analyzes emails for phishing indicators.
 */
class EmailAnalyzer {
    constructor() {
        this.trustedDomains = new Set();
        this.suspiciousPatterns = [];
    }

    /**
     * Adds a trusted domain
     * @param {string} domain - Trusted domain
     */
    addTrustedDomain(domain) {
        this.trustedDomains.add(domain.toLowerCase());
    }

    /**
     * Analyzes an email for phishing indicators
     * @param {Object} email - Email to analyze
     * @returns {Object} Analysis result
     */
    analyze(email) {
        const findings = [];

        // Check sender domain
        const senderDomain = this.extractDomain(email.from);
        if (!this.trustedDomains.has(senderDomain)) {
            findings.push({
                indicator: 'Unknown sender domain',
                detail: senderDomain,
                weight: 2
            });
        }

        // Check for spoofed display name
        if (this.isSpoofedSender(email.from, email.displayName)) {
            findings.push({
                indicator: 'Spoofed sender',
                detail: 'Display name suggests trusted entity but email differs',
                weight: 3
            });
        }

        // Check subject for urgency
        if (this.hasUrgencyIndicators(email.subject)) {
            findings.push({
                indicator: 'Urgent language',
                detail: 'Subject contains urgency triggers',
                weight: 2
            });
        }

        // Check links
        const linkAnalysis = this.analyzeLinks(email.body, email.links || []);
        findings.push(...linkAnalysis);

        // Check for credential requests
        if (this.requestsCredentials(email.body)) {
            findings.push({
                indicator: 'Request for credentials',
                detail: 'Email asks for password or login information',
                weight: 3
            });
        }

        return {
            email: email.subject,
            findings,
            risk: PhishingIndicator.calculateRiskScore(findings)
        };
    }

    /**
     * Extracts domain from email address
     * @param {string} email - Email address
     * @returns {string} Domain
     */
    extractDomain(email) {
        const match = email.match(/@([^>]+)/);
        return match ? match[1].toLowerCase() : '';
    }

    /**
     * Checks if sender appears spoofed
     * @param {string} from - From address
     * @param {string} displayName - Display name
     * @returns {boolean} True if likely spoofed
     */
    isSpoofedSender(from, displayName) {
        if (!displayName) return false;

        const knownBrands = ['paypal', 'amazon', 'microsoft', 'apple', 'google', 'bank'];
        const displayLower = displayName.toLowerCase();
        const fromLower = from.toLowerCase();

        for (const brand of knownBrands) {
            if (displayLower.includes(brand) && !fromLower.includes(brand)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks for urgency indicators in text
     * @param {string} text - Text to check
     * @returns {boolean} True if urgency detected
     */
    hasUrgencyIndicators(text) {
        const urgencyWords = [
            'urgent', 'immediately', 'suspended', 'locked',
            'expire', 'verify now', 'action required', 'limited time',
            'within 24 hours', 'account will be'
        ];
        const lower = text.toLowerCase();
        return urgencyWords.some(word => lower.includes(word));
    }

    /**
     * Analyzes links in email
     * @param {string} body - Email body
     * @param {Array} links - Extracted links
     * @returns {Array} Link findings
     */
    analyzeLinks(body, links) {
        const findings = [];

        for (const link of links) {
            // Check for mismatched display text and URL
            if (link.displayText && link.url) {
                if (this.isMismatchedLink(link.displayText, link.url)) {
                    findings.push({
                        indicator: 'Mismatched URLs',
                        detail: `Display: ${link.displayText}, Actual: ${link.url}`,
                        weight: 3
                    });
                }
            }

            // Check for suspicious domains
            if (this.isSuspiciousDomain(link.url)) {
                findings.push({
                    indicator: 'Suspicious links',
                    detail: link.url,
                    weight: 3
                });
            }
        }

        return findings;
    }

    /**
     * Checks if link display and URL mismatch
     * @param {string} displayText - Displayed link text
     * @param {string} url - Actual URL
     * @returns {boolean} True if mismatched
     */
    isMismatchedLink(displayText, url) {
        // If display text looks like a URL
        if (displayText.includes('http') || displayText.includes('.com')) {
            const displayDomain = this.extractDomainFromUrl(displayText);
            const actualDomain = this.extractDomainFromUrl(url);
            return displayDomain !== actualDomain;
        }
        return false;
    }

    /**
     * Extracts domain from URL
     * @param {string} url - URL
     * @returns {string} Domain
     */
    extractDomainFromUrl(url) {
        try {
            const match = url.match(/(?:https?:\/\/)?([^\/]+)/);
            return match ? match[1].toLowerCase() : '';
        } catch {
            return '';
        }
    }

    /**
     * Checks if domain is suspicious
     * @param {string} url - URL to check
     * @returns {boolean} True if suspicious
     */
    isSuspiciousDomain(url) {
        const suspiciousPatterns = [
            /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP address
            /[a-z]+-[a-z]+-[a-z]+\./, // Multiple hyphens
            /\.(tk|ml|ga|cf|gq)$/i, // Free domain TLDs often abused
        ];
        return suspiciousPatterns.some(pattern => pattern.test(url));
    }

    /**
     * Checks if email requests credentials
     * @param {string} body - Email body
     * @returns {boolean} True if requests credentials
     */
    requestsCredentials(body) {
        const credentialWords = [
            'password', 'login', 'sign in', 'verify your account',
            'confirm your identity', 'update your information',
            'enter your credentials', 'ssn', 'social security'
        ];
        const lower = body.toLowerCase();
        return credentialWords.some(word => lower.includes(word));
    }
}

/**
 * PhishingSimulator creates simulated phishing scenarios for training.
 */
class PhishingSimulator {
    constructor() {
        this.templates = this.loadTemplates();
    }

    /**
     * Loads phishing email templates for training
     * @returns {Array} Templates
     */
    loadTemplates() {
        return [
            {
                name: 'Account Suspension',
                subject: 'URGENT: Your account has been suspended',
                indicators: ['urgency', 'credential_request', 'suspicious_link']
            },
            {
                name: 'Prize Winner',
                subject: 'Congratulations! You have won $1,000,000',
                indicators: ['too_good_to_be_true', 'generic_greeting', 'suspicious_link']
            },
            {
                name: 'IT Support',
                subject: 'Password Reset Required',
                indicators: ['spoofed_sender', 'credential_request', 'urgency']
            },
            {
                name: 'Invoice Scam',
                subject: 'Invoice #12345 - Payment Due',
                indicators: ['attachment', 'spoofed_sender', 'urgency']
            },
            {
                name: 'CEO Fraud',
                subject: 'Urgent Wire Transfer Needed',
                indicators: ['spoofed_sender', 'urgency', 'unusual_request']
            }
        ];
    }

    /**
     * Generates a training scenario
     * @param {string} templateName - Template to use
     * @returns {Object} Training scenario
     */
    generateScenario(templateName) {
        const template = this.templates.find(t => t.name === templateName);
        if (!template) return null;

        return {
            template: template.name,
            email: this.generateEmail(template),
            correctIndicators: template.indicators,
            learningPoints: this.getLearningPoints(template.indicators)
        };
    }

    /**
     * Generates a simulated phishing email
     * @param {Object} template - Template to use
     * @returns {Object} Simulated email
     */
    generateEmail(template) {
        return {
            subject: template.subject,
            from: 'security@' + this.generateFakeDomain(),
            displayName: 'Security Team',
            body: `Dear Customer,\n\nYour account requires immediate attention.\nClick here to verify: http://${this.generateFakeDomain()}/verify\n\nBest regards,\nSecurity Team`,
            links: [{ displayText: 'Click here', url: `http://${this.generateFakeDomain()}/verify` }]
        };
    }

    /**
     * Generates a fake domain for simulation
     * @returns {string} Fake domain
     */
    generateFakeDomain() {
        const fakes = ['secure-login.tk', 'account-verify.ml', 'update-info.cf'];
        return fakes[Math.floor(Math.random() * fakes.length)];
    }

    /**
     * Gets learning points for indicators
     * @param {Array} indicators - Indicators present
     * @returns {Array} Learning points
     */
    getLearningPoints(indicators) {
        const points = {
            urgency: 'Legitimate organizations rarely demand immediate action',
            credential_request: 'Never enter credentials via email links',
            suspicious_link: 'Hover over links to verify destination before clicking',
            spoofed_sender: 'Check the actual email address, not just display name',
            too_good_to_be_true: 'Be skeptical of unexpected winnings or rewards',
            attachment: 'Do not open unexpected attachments',
            generic_greeting: 'Legitimate emails usually address you by name',
            unusual_request: 'Verify unusual requests through a separate channel'
        };

        return indicators.map(ind => ({
            indicator: ind,
            lesson: points[ind] || 'Always verify suspicious communications'
        }));
    }
}

/**
 * PhishingDefense provides defensive measures and recommendations.
 */
class PhishingDefense {
    /**
     * Gets technical defense measures
     * @returns {Array} Defenses
     */
    static getTechnicalDefenses() {
        return [
            {
                measure: 'Email Filtering',
                description: 'Use spam filters and email security gateways',
                implementation: 'Deploy SPF, DKIM, and DMARC'
            },
            {
                measure: 'Multi-Factor Authentication',
                description: 'Require MFA for all accounts',
                implementation: 'Use authenticator apps over SMS'
            },
            {
                measure: 'Web Filtering',
                description: 'Block known malicious URLs',
                implementation: 'Use DNS filtering and web proxies'
            },
            {
                measure: 'Browser Protection',
                description: 'Enable phishing protection in browsers',
                implementation: 'Configure Safe Browsing features'
            },
            {
                measure: 'Email Authentication',
                description: 'Verify email sender authenticity',
                implementation: 'Implement and enforce DMARC policies'
            }
        ];
    }

    /**
     * Gets human defense measures
     * @returns {Array} Defenses
     */
    static getHumanDefenses() {
        return [
            {
                measure: 'Security Awareness Training',
                description: 'Regular training on phishing recognition',
                frequency: 'Quarterly with ongoing simulations'
            },
            {
                measure: 'Phishing Simulations',
                description: 'Test employees with fake phishing emails',
                frequency: 'Monthly'
            },
            {
                measure: 'Reporting Mechanism',
                description: 'Easy way to report suspicious emails',
                implementation: 'Phishing report button in email client'
            },
            {
                measure: 'Verification Procedures',
                description: 'Process for verifying unusual requests',
                implementation: 'Call back procedures for financial requests'
            }
        ];
    }

    /**
     * Gets incident response steps
     * @returns {Array} Response steps
     */
    static getIncidentResponse() {
        return [
            { step: 1, action: 'Isolate', detail: 'Disconnect affected systems from network' },
            { step: 2, action: 'Assess', detail: 'Determine scope of compromise' },
            { step: 3, action: 'Contain', detail: 'Block malicious URLs and emails' },
            { step: 4, action: 'Eradicate', detail: 'Remove malware and revoke compromised credentials' },
            { step: 5, action: 'Recover', detail: 'Restore systems and reset passwords' },
            { step: 6, action: 'Learn', detail: 'Document incident and update defenses' }
        ];
    }
}

// Demonstration
console.log('=== Phishing Defense Demo ===\n');

// Analyze a suspicious email
console.log('--- Email Analysis ---');
const analyzer = new EmailAnalyzer();
analyzer.addTrustedDomain('company.com');
analyzer.addTrustedDomain('bank.com');

const suspiciousEmail = {
    from: 'security@bank-verify.tk',
    displayName: 'Bank Security Team',
    subject: 'URGENT: Your account has been suspended - verify immediately',
    body: 'Dear Customer, Your account has been locked. Click here to verify your password and restore access within 24 hours.',
    links: [
        { displayText: 'https://bank.com/verify', url: 'http://bank-verify.tk/login' }
    ]
};

const analysis = analyzer.analyze(suspiciousEmail);
console.log('Analysis Result:', analysis);

// Phishing indicators
console.log('\n--- Phishing Indicators ---');
console.log('Email indicators:', PhishingIndicator.getIndicators('email').slice(0, 4));

// Training simulation
console.log('\n--- Training Simulation ---');
const simulator = new PhishingSimulator();
const scenario = simulator.generateScenario('Account Suspension');
console.log('Training Scenario:', scenario?.template);
console.log('Learning Points:', scenario?.learningPoints);

// Defense measures
console.log('\n--- Defense Measures ---');
console.log('Technical Defenses:', PhishingDefense.getTechnicalDefenses().slice(0, 3));
console.log('Human Defenses:', PhishingDefense.getHumanDefenses().slice(0, 2));

// Incident response
console.log('\n--- Incident Response ---');
PhishingDefense.getIncidentResponse().slice(0, 3).forEach(step => {
    console.log(`${step.step}. ${step.action}: ${step.detail}`);
});

/**
 * Best Practices for Phishing Defense:
 *
 * 1. Implement email authentication (SPF, DKIM, DMARC)
 * 2. Require multi-factor authentication for all accounts
 * 3. Conduct regular security awareness training
 * 4. Run phishing simulations to test awareness
 * 5. Provide easy phishing reporting mechanisms
 * 6. Verify unusual requests through separate channels
 * 7. Keep browsers and security software updated
 * 8. Use web filtering to block malicious sites
 * 9. Have clear incident response procedures
 * 10. Never click links in unexpected emails
 */
