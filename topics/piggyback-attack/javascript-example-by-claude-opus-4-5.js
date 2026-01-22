/**
 * Piggyback Attack (Tailgating) - Physical Security Threat
 *
 * A piggyback attack occurs when an unauthorized person gains physical access
 * to a secure area by following closely behind an authorized person. Also known
 * as tailgating, this social engineering attack bypasses access controls by
 * exploiting human politeness and inattention. Prevention requires awareness
 * and strict access control enforcement.
 *
 * Key Concepts:
 * - Physical access control bypass
 * - Social engineering exploitation
 * - Tailgating through secure doors
 * - Combination of technical and human defenses
 */

/**
 * AccessPoint represents a controlled entry point.
 * Tracks access events and security violations.
 */
class AccessPoint {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.location = options.location;
        this.securityLevel = options.securityLevel || 'standard';
        this.accessLog = [];
        this.violations = [];
        this.features = options.features || [];
    }

    /**
     * Records an access event
     * @param {Object} event - Access event
     */
    recordAccess(event) {
        const logEntry = {
            timestamp: new Date(),
            userId: event.userId,
            credentialType: event.credentialType,
            granted: event.granted,
            direction: event.direction // entry or exit
        };

        this.accessLog.push(logEntry);
        return logEntry;
    }

    /**
     * Records a security violation
     * @param {Object} violation - Violation details
     */
    recordViolation(violation) {
        this.violations.push({
            timestamp: new Date(),
            type: violation.type,
            description: violation.description,
            severity: violation.severity,
            detected: violation.detected
        });
    }

    /**
     * Checks for potential tailgating
     * @param {number} timeWindowMs - Time window to check
     * @returns {Array} Potential tailgating events
     */
    detectTailgating(timeWindowMs = 5000) {
        const suspicious = [];

        for (let i = 1; i < this.accessLog.length; i++) {
            const current = this.accessLog[i];
            const previous = this.accessLog[i - 1];

            // Check if two entries are too close together
            const timeDiff = new Date(current.timestamp) - new Date(previous.timestamp);

            if (timeDiff < timeWindowMs && current.direction === previous.direction) {
                // Single credential used for multiple entries
                if (current.credentialType === 'none' && previous.credentialType !== 'none') {
                    suspicious.push({
                        authorizedEntry: previous,
                        suspiciousEntry: current,
                        timeDifference: timeDiff,
                        indication: 'Possible tailgating - no credential after authorized entry'
                    });
                }
            }
        }

        return suspicious;
    }

    /**
     * Gets access statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const totalAccess = this.accessLog.length;
        const granted = this.accessLog.filter(e => e.granted).length;

        return {
            accessPoint: this.name,
            totalAccess,
            granted,
            denied: totalAccess - granted,
            violations: this.violations.length,
            securityLevel: this.securityLevel
        };
    }
}

/**
 * TailgatingScenario models different piggyback attack scenarios.
 */
class TailgatingScenario {
    static scenarios = {
        politeHold: {
            name: 'Polite Hold',
            description: 'Attacker waits for someone to hold door open',
            technique: 'Appears to be fumbling for badge',
            difficulty: 'Easy',
            defenses: ['Anti-tailgating training', 'Turnstiles', 'Mantraps']
        },
        delivery: {
            name: 'Delivery Person',
            description: 'Attacker poses as delivery person with packages',
            technique: 'Hands full, asks for help with door',
            difficulty: 'Easy',
            defenses: ['Delivery protocols', 'Separate delivery entrance', 'Escort policy']
        },
        uniform: {
            name: 'Uniform Impersonation',
            description: 'Attacker wears maintenance or service uniform',
            technique: 'Appears to be authorized worker',
            difficulty: 'Medium',
            defenses: ['Visitor management', 'Badge verification', 'Escort policy']
        },
        rushing: {
            name: 'Rushing Through',
            description: 'Attacker quickly follows through closing door',
            technique: 'Times entry just before door closes',
            difficulty: 'Medium',
            defenses: ['Door sensors', 'Video surveillance', 'Security guards']
        },
        groupEntry: {
            name: 'Group Entry',
            description: 'Attacker blends into group entering together',
            technique: 'Joins conversation, walks in with group',
            difficulty: 'Easy',
            defenses: ['Individual authentication', 'Badge checks', 'Turnstiles']
        }
    };

    /**
     * Gets a specific scenario
     * @param {string} name - Scenario name
     * @returns {Object} Scenario details
     */
    static getScenario(name) {
        return this.scenarios[name];
    }

    /**
     * Gets all scenarios
     * @returns {Array} All scenarios
     */
    static getAllScenarios() {
        return Object.entries(this.scenarios).map(([key, scenario]) => ({
            id: key,
            ...scenario
        }));
    }

    /**
     * Gets recommended defenses for a scenario
     * @param {string} scenarioName - Scenario name
     * @returns {Array} Defenses
     */
    static getDefenses(scenarioName) {
        const scenario = this.scenarios[scenarioName];
        return scenario ? scenario.defenses : [];
    }
}

/**
 * AntiTailgatingSolution represents security measures against tailgating.
 */
class AntiTailgatingSolution {
    static solutions = {
        mantrap: {
            name: 'Mantrap / Airlock',
            description: 'Two-door system allowing only one person at a time',
            effectiveness: 'Very High',
            cost: 'High',
            userExperience: 'Slow but secure'
        },
        turnstile: {
            name: 'Turnstile',
            description: 'Rotating barrier allowing single person entry',
            effectiveness: 'High',
            cost: 'Medium',
            userExperience: 'Moderate inconvenience'
        },
        opticalTurnstile: {
            name: 'Optical Turnstile',
            description: 'Sensor-based barrier detecting multiple entries',
            effectiveness: 'High',
            cost: 'Medium-High',
            userExperience: 'Good - minimal delay'
        },
        securityGuard: {
            name: 'Security Guard',
            description: 'Human monitoring of access points',
            effectiveness: 'Medium-High',
            cost: 'High (ongoing)',
            userExperience: 'Varies by guard'
        },
        videoAnalytics: {
            name: 'Video Analytics',
            description: 'AI-powered detection of tailgating',
            effectiveness: 'Medium-High',
            cost: 'Medium',
            userExperience: 'Good - non-intrusive'
        },
        weightSensor: {
            name: 'Weight Sensors',
            description: 'Floor sensors detecting multiple people',
            effectiveness: 'Medium',
            cost: 'Medium',
            userExperience: 'Good - transparent'
        }
    };

    /**
     * Gets solution details
     * @param {string} name - Solution name
     * @returns {Object} Solution details
     */
    static getSolution(name) {
        return this.solutions[name];
    }

    /**
     * Recommends solutions based on requirements
     * @param {Object} requirements - Security requirements
     * @returns {Array} Recommended solutions
     */
    static recommend(requirements) {
        const { securityLevel, budget, userCount } = requirements;
        const recommendations = [];

        if (securityLevel === 'high') {
            recommendations.push(this.solutions.mantrap);
            recommendations.push(this.solutions.securityGuard);
        }

        if (budget === 'medium' || budget === 'high') {
            recommendations.push(this.solutions.opticalTurnstile);
            recommendations.push(this.solutions.videoAnalytics);
        }

        if (userCount > 100) {
            recommendations.push(this.solutions.turnstile);
        }

        return recommendations;
    }
}

/**
 * SecurityTraining provides tailgating awareness training content.
 */
class SecurityTraining {
    /**
     * Gets training modules for tailgating awareness
     * @returns {Array} Training modules
     */
    static getTrainingModules() {
        return [
            {
                module: 1,
                title: 'Understanding Tailgating',
                content: [
                    'What is tailgating/piggybacking',
                    'Why attackers use this technique',
                    'Consequences of unauthorized access'
                ],
                duration: '15 minutes'
            },
            {
                module: 2,
                title: 'Recognizing Tailgating Attempts',
                content: [
                    'Common tailgating scenarios',
                    'Social engineering tactics',
                    'Red flags to watch for'
                ],
                duration: '20 minutes'
            },
            {
                module: 3,
                title: 'Preventing Tailgating',
                content: [
                    'Challenge unknown individuals politely',
                    'Never hold doors for strangers',
                    'Report suspicious activity'
                ],
                duration: '15 minutes'
            },
            {
                module: 4,
                title: 'Response Procedures',
                content: [
                    'How to challenge someone',
                    'Who to contact for assistance',
                    'Incident reporting process'
                ],
                duration: '10 minutes'
            }
        ];
    }

    /**
     * Gets challenge scripts for employees
     * @returns {Array} Challenge scripts
     */
    static getChallengeScripts() {
        return [
            {
                situation: 'Unknown person trying to follow through door',
                script: "Excuse me, I need to see your badge before you enter. If you're a visitor, please check in at reception."
            },
            {
                situation: 'Person claims to have forgotten badge',
                script: "I understand. Security can help you at the front desk. I can't let you in without proper authorization."
            },
            {
                situation: 'Person wearing service uniform',
                script: "Hi, do you have a visitor badge? All contractors need to check in with security first."
            },
            {
                situation: 'Person rushes to catch door',
                script: "Sorry, but everyone needs to badge in separately. The door will close, but you can badge in right after."
            }
        ];
    }

    /**
     * Gets quiz questions for training assessment
     * @returns {Array} Quiz questions
     */
    static getQuizQuestions() {
        return [
            {
                question: 'What should you do if someone asks you to hold the door?',
                options: [
                    'Hold the door to be polite',
                    'Ask them to badge in themselves',
                    'Ignore them',
                    'Let them in if they look official'
                ],
                correct: 1,
                explanation: 'Everyone should authenticate individually regardless of appearance.'
            },
            {
                question: 'A delivery person with packages asks for help entering. What should you do?',
                options: [
                    'Help them carry packages inside',
                    'Direct them to the delivery entrance or reception',
                    'Let them follow you in',
                    'Take the packages for them'
                ],
                correct: 1,
                explanation: 'Deliveries should go through designated entrances with proper verification.'
            },
            {
                question: 'What is the primary defense against tailgating?',
                options: [
                    'Better locks',
                    'Employee awareness and training',
                    'More cameras',
                    'Longer badges'
                ],
                correct: 1,
                explanation: 'Technical controls help, but employee vigilance is the most critical defense.'
            }
        ];
    }
}

/**
 * IncidentReporter handles tailgating incident reporting.
 */
class IncidentReporter {
    constructor() {
        this.incidents = [];
    }

    /**
     * Reports a tailgating incident
     * @param {Object} incident - Incident details
     * @returns {Object} Report confirmation
     */
    report(incident) {
        const report = {
            id: `TG-${Date.now()}`,
            timestamp: new Date(),
            location: incident.location,
            description: incident.description,
            witnessedBy: incident.reporter,
            suspectDescription: incident.suspectDescription,
            actionTaken: incident.actionTaken,
            status: 'reported'
        };

        this.incidents.push(report);
        return report;
    }

    /**
     * Gets incident statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const byLocation = {};
        for (const incident of this.incidents) {
            byLocation[incident.location] = (byLocation[incident.location] || 0) + 1;
        }

        return {
            totalIncidents: this.incidents.length,
            byLocation,
            recentIncidents: this.incidents.slice(-5)
        };
    }
}

// Demonstration
console.log('=== Piggyback Attack (Tailgating) Demo ===\n');

// Access point monitoring
console.log('--- Access Point Monitoring ---');
const mainEntrance = new AccessPoint({
    id: 'AP-001',
    name: 'Main Entrance',
    location: 'Building A',
    securityLevel: 'standard',
    features: ['badge reader', 'camera']
});

// Record some access events
mainEntrance.recordAccess({ userId: 'EMP001', credentialType: 'badge', granted: true, direction: 'entry' });
mainEntrance.recordAccess({ userId: 'unknown', credentialType: 'none', granted: true, direction: 'entry' });
mainEntrance.recordAccess({ userId: 'EMP002', credentialType: 'badge', granted: true, direction: 'entry' });

console.log('Access Statistics:', mainEntrance.getStatistics());
console.log('Potential Tailgating:', mainEntrance.detectTailgating());

// Attack scenarios
console.log('\n--- Tailgating Scenarios ---');
TailgatingScenario.getAllScenarios().slice(0, 3).forEach(scenario => {
    console.log(`${scenario.name}: ${scenario.description}`);
    console.log(`  Defenses: ${scenario.defenses.join(', ')}`);
});

// Security solutions
console.log('\n--- Anti-Tailgating Solutions ---');
const recommendations = AntiTailgatingSolution.recommend({
    securityLevel: 'high',
    budget: 'medium',
    userCount: 200
});
recommendations.slice(0, 3).forEach(solution => {
    console.log(`${solution.name}: ${solution.description}`);
    console.log(`  Effectiveness: ${solution.effectiveness}`);
});

// Training content
console.log('\n--- Security Training ---');
SecurityTraining.getTrainingModules().slice(0, 2).forEach(module => {
    console.log(`Module ${module.module}: ${module.title} (${module.duration})`);
});

console.log('\nChallenge Scripts:');
SecurityTraining.getChallengeScripts().slice(0, 2).forEach(script => {
    console.log(`Situation: ${script.situation}`);
    console.log(`Response: "${script.script}"`);
});

// Incident reporting
console.log('\n--- Incident Reporting ---');
const reporter = new IncidentReporter();
reporter.report({
    location: 'Main Entrance',
    description: 'Unknown person followed employee through door',
    reporter: 'Jane Doe',
    suspectDescription: 'Male, wearing delivery uniform',
    actionTaken: 'Notified security'
});

console.log('Incident Statistics:', reporter.getStatistics());

/**
 * Best Practices for Preventing Piggyback Attacks:
 *
 * 1. Train all employees on tailgating awareness
 * 2. Implement physical barriers (turnstiles, mantraps)
 * 3. Require individual authentication at all entry points
 * 4. Install video surveillance with analytics
 * 5. Establish visitor management procedures
 * 6. Conduct regular security assessments
 * 7. Create easy incident reporting mechanisms
 * 8. Post signage about access control policies
 * 9. Have security personnel at high-traffic entrances
 * 10. Audit access logs for suspicious patterns
 */
