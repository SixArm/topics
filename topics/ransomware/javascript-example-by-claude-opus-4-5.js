/**
 * Ransomware - Understanding and Defending Against Data Encryption Attacks
 *
 * Ransomware is malicious software that encrypts victim data and demands
 * payment for the decryption key. Attacks are delivered via phishing, exploits,
 * or compromised credentials. Defense requires prevention, detection, backup
 * strategies, and incident response planning.
 *
 * Key Concepts:
 * - Data encryption for extortion
 * - Attack vectors and delivery methods
 * - Prevention and detection strategies
 * - Backup and recovery planning
 */

/**
 * RansomwareFamily represents a category of ransomware.
 * Documents characteristics and behaviors.
 */
class RansomwareFamily {
    static families = {
        crypto: {
            name: 'Crypto Ransomware',
            description: 'Encrypts files and demands ransom for key',
            characteristics: [
                'Strong encryption algorithms (AES, RSA)',
                'Targets user files and documents',
                'May delete shadow copies',
                'Usually displays ransom note'
            ],
            examples: ['WannaCry', 'CryptoLocker', 'Locky']
        },
        locker: {
            name: 'Locker Ransomware',
            description: 'Locks user out of system entirely',
            characteristics: [
                'Prevents system access',
                'Does not encrypt files',
                'Often easier to remove',
                'Displays fullscreen lock message'
            ],
            examples: ['WinLocker', 'Reveton']
        },
        doublExtortion: {
            name: 'Double Extortion',
            description: 'Encrypts and threatens to leak data',
            characteristics: [
                'Exfiltrates data before encryption',
                'Threatens public release',
                'Two-fold pressure on victim',
                'Higher ransom demands'
            ],
            examples: ['Maze', 'REvil', 'DarkSide']
        },
        ransomwareAsService: {
            name: 'Ransomware-as-a-Service (RaaS)',
            description: 'Ransomware sold or leased to affiliates',
            characteristics: [
                'Lower barrier for attackers',
                'Profit sharing model',
                'Rapid variant creation',
                'Professional support for attackers'
            ],
            examples: ['REvil', 'LockBit', 'Conti']
        }
    };

    /**
     * Gets family information
     * @param {string} family - Family name
     * @returns {Object} Family details
     */
    static getFamily(family) {
        return this.families[family];
    }

    /**
     * Gets all families
     * @returns {Array} All families
     */
    static getAllFamilies() {
        return Object.entries(this.families).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * AttackVector represents how ransomware is delivered.
 */
class AttackVector {
    static vectors = {
        phishing: {
            name: 'Phishing Email',
            description: 'Malicious attachment or link in email',
            prevalence: 'Very High',
            defenses: [
                'Email filtering and scanning',
                'User awareness training',
                'Sandboxing attachments',
                'Link analysis'
            ]
        },
        rdp: {
            name: 'RDP Compromise',
            description: 'Exploiting exposed Remote Desktop Protocol',
            prevalence: 'High',
            defenses: [
                'Disable public RDP access',
                'Use VPN for remote access',
                'Strong authentication',
                'Rate limiting'
            ]
        },
        vulnerabilities: {
            name: 'Software Vulnerabilities',
            description: 'Exploiting unpatched systems',
            prevalence: 'High',
            defenses: [
                'Regular patch management',
                'Vulnerability scanning',
                'Network segmentation',
                'Web application firewall'
            ]
        },
        supplyChain: {
            name: 'Supply Chain',
            description: 'Compromising software updates or vendors',
            prevalence: 'Medium',
            defenses: [
                'Vendor security assessment',
                'Software verification',
                'Update validation',
                'Least privilege access'
            ]
        },
        malvertising: {
            name: 'Malvertising',
            description: 'Malicious advertisements on websites',
            prevalence: 'Medium',
            defenses: [
                'Ad blockers',
                'Browser isolation',
                'Script blocking',
                'Regular browser updates'
            ]
        }
    };

    /**
     * Gets attack vector information
     * @param {string} vector - Vector name
     * @returns {Object} Vector details
     */
    static getVector(vector) {
        return this.vectors[vector];
    }

    /**
     * Gets all vectors
     * @returns {Array} All vectors
     */
    static getAllVectors() {
        return Object.entries(this.vectors).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * RansomwareIndicator represents indicators of compromise.
 */
class RansomwareIndicator {
    static indicators = {
        behavioral: [
            { indicator: 'Mass file renaming', description: 'Files getting new extensions rapidly' },
            { indicator: 'High disk activity', description: 'Unusual read/write patterns' },
            { indicator: 'Process creating many files', description: 'Single process touching many files' },
            { indicator: 'Shadow copy deletion', description: 'vssadmin commands being executed' },
            { indicator: 'Network encryption patterns', description: 'Encrypted traffic to suspicious IPs' }
        ],
        file: [
            { indicator: 'Ransom notes', description: 'README.txt, HOW_TO_DECRYPT.txt files' },
            { indicator: 'Encrypted file extensions', description: '.encrypted, .locked, .crypto' },
            { indicator: 'Encrypted file headers', description: 'Normal files with changed headers' }
        ],
        network: [
            { indicator: 'C2 communication', description: 'Traffic to known bad IPs' },
            { indicator: 'Data exfiltration', description: 'Large outbound data transfers' },
            { indicator: 'Lateral movement', description: 'Unusual internal network scanning' }
        ]
    };

    /**
     * Gets indicators by category
     * @param {string} category - Category name
     * @returns {Array} Indicators
     */
    static getByCategory(category) {
        return this.indicators[category] || [];
    }

    /**
     * Gets all indicators
     * @returns {Object} All indicators
     */
    static getAll() {
        return this.indicators;
    }
}

/**
 * RansomwareDefense provides defense strategies.
 */
class RansomwareDefense {
    /**
     * Gets prevention strategies
     * @returns {Array} Prevention strategies
     */
    static getPreventionStrategies() {
        return [
            {
                category: 'Technical Controls',
                measures: [
                    'Regular patching and updates',
                    'Endpoint detection and response (EDR)',
                    'Email security gateway',
                    'Web filtering',
                    'Application whitelisting',
                    'Network segmentation',
                    'Least privilege access'
                ]
            },
            {
                category: 'User Training',
                measures: [
                    'Phishing awareness training',
                    'Social engineering education',
                    'Suspicious activity reporting',
                    'Password hygiene'
                ]
            },
            {
                category: 'Backup Strategy',
                measures: [
                    '3-2-1 backup rule (3 copies, 2 media types, 1 offsite)',
                    'Air-gapped backups',
                    'Regular backup testing',
                    'Immutable backup storage'
                ]
            }
        ];
    }

    /**
     * Gets detection capabilities
     * @returns {Array} Detection capabilities
     */
    static getDetectionCapabilities() {
        return [
            {
                capability: 'Endpoint Detection and Response',
                detects: ['Suspicious process behavior', 'File encryption patterns', 'Ransomware signatures'],
                responseTime: 'Real-time'
            },
            {
                capability: 'Network Traffic Analysis',
                detects: ['C2 communication', 'Data exfiltration', 'Lateral movement'],
                responseTime: 'Near real-time'
            },
            {
                capability: 'File Integrity Monitoring',
                detects: ['Mass file changes', 'Unauthorized modifications', 'New encrypted files'],
                responseTime: 'Near real-time'
            },
            {
                capability: 'Honeypots/Decoys',
                detects: ['Encryption attempts on decoy files', 'Attacker reconnaissance'],
                responseTime: 'Real-time'
            }
        ];
    }
}

/**
 * IncidentResponse handles ransomware incident procedures.
 */
class IncidentResponse {
    /**
     * Gets incident response playbook
     * @returns {Array} Response steps
     */
    static getPlaybook() {
        return [
            {
                phase: 'Immediate Response',
                timeframe: '0-1 hour',
                actions: [
                    'Isolate affected systems from network',
                    'Preserve evidence (memory, logs)',
                    'Identify the ransomware variant if possible',
                    'Notify incident response team',
                    'Document all observations'
                ]
            },
            {
                phase: 'Assessment',
                timeframe: '1-4 hours',
                actions: [
                    'Determine scope of infection',
                    'Identify attack vector',
                    'Assess data and backup status',
                    'Check for data exfiltration',
                    'Evaluate business impact'
                ]
            },
            {
                phase: 'Containment',
                timeframe: '4-24 hours',
                actions: [
                    'Block malicious IPs and domains',
                    'Disable compromised accounts',
                    'Segment affected networks',
                    'Stop spread to additional systems',
                    'Secure clean systems'
                ]
            },
            {
                phase: 'Eradication & Recovery',
                timeframe: '24+ hours',
                actions: [
                    'Remove ransomware from systems',
                    'Restore from clean backups',
                    'Reset compromised credentials',
                    'Patch vulnerabilities exploited',
                    'Verify system integrity'
                ]
            },
            {
                phase: 'Post-Incident',
                timeframe: '1-2 weeks after',
                actions: [
                    'Conduct root cause analysis',
                    'Document lessons learned',
                    'Update security controls',
                    'Improve detection capabilities',
                    'Report to relevant authorities'
                ]
            }
        ];
    }

    /**
     * Gets ransom payment decision factors
     * @returns {Object} Decision factors
     */
    static getRansomDecisionFactors() {
        return {
            considerationsAgainstPaying: [
                'No guarantee of receiving decryption key',
                'Funds criminal operations',
                'May be targeted again',
                'May violate sanctions regulations',
                'Decryption tools may not work'
            ],
            situationsToConsider: [
                'No viable backups exist',
                'Critical business impact',
                'Life safety concerns',
                'After consulting legal counsel',
                'After law enforcement notification'
            ],
            alternatives: [
                'Check for free decryption tools (No More Ransom project)',
                'Restore from backups',
                'Rebuild systems from scratch',
                'Accept data loss'
            ],
            recommendation: 'Never pay without exhausting alternatives and consulting legal/law enforcement'
        };
    }
}

/**
 * BackupStrategy implements backup best practices for ransomware defense.
 */
class BackupStrategy {
    constructor() {
        this.backups = [];
    }

    /**
     * Defines a backup configuration
     * @param {Object} config - Backup configuration
     */
    defineBackup(config) {
        this.backups.push({
            name: config.name,
            type: config.type, // full, incremental, differential
            frequency: config.frequency,
            retention: config.retention,
            storage: config.storage, // local, cloud, tape
            airGapped: config.airGapped || false,
            immutable: config.immutable || false,
            encrypted: config.encrypted || false
        });
    }

    /**
     * Validates backup strategy against 3-2-1 rule
     * @returns {Object} Validation result
     */
    validate321Rule() {
        const copies = this.backups.length;
        const mediaTypes = new Set(this.backups.map(b => b.storage)).size;
        const offsite = this.backups.filter(b =>
            b.storage === 'cloud' || b.storage === 'offsite'
        ).length;
        const airGapped = this.backups.filter(b => b.airGapped).length;

        return {
            rule: '3-2-1 Backup Rule',
            requirements: {
                threeOrMoreCopies: { required: 3, actual: copies, met: copies >= 3 },
                twoOrMoreMediaTypes: { required: 2, actual: mediaTypes, met: mediaTypes >= 2 },
                oneOrMoreOffsite: { required: 1, actual: offsite, met: offsite >= 1 }
            },
            bonuses: {
                airGappedBackup: airGapped > 0,
                immutableStorage: this.backups.some(b => b.immutable)
            },
            compliant: copies >= 3 && mediaTypes >= 2 && offsite >= 1
        };
    }

    /**
     * Gets recovery time estimate
     * @param {number} dataSize - Data size in GB
     * @returns {Object} Recovery estimate
     */
    estimateRecoveryTime(dataSize) {
        const estimates = this.backups.map(backup => {
            let speedGBPerHour;
            switch (backup.storage) {
                case 'local': speedGBPerHour = 100; break;
                case 'cloud': speedGBPerHour = 10; break;
                case 'tape': speedGBPerHour = 50; break;
                default: speedGBPerHour = 20;
            }

            return {
                backup: backup.name,
                storage: backup.storage,
                estimatedHours: (dataSize / speedGBPerHour).toFixed(1),
                airGapped: backup.airGapped
            };
        });

        return {
            dataSize: dataSize + ' GB',
            estimates,
            recommendation: 'Use local backup for fastest recovery if available and clean'
        };
    }
}

// Demonstration
console.log('=== Ransomware Defense Demo ===\n');

// Ransomware families
console.log('--- Ransomware Families ---');
RansomwareFamily.getAllFamilies().slice(0, 3).forEach(family => {
    console.log(`${family.name}: ${family.description}`);
});

// Attack vectors
console.log('\n--- Attack Vectors ---');
AttackVector.getAllVectors().slice(0, 3).forEach(vector => {
    console.log(`${vector.name} (${vector.prevalence}): ${vector.description}`);
});

// Indicators
console.log('\n--- Indicators of Compromise ---');
console.log('Behavioral:', RansomwareIndicator.getByCategory('behavioral').slice(0, 3));

// Defense strategies
console.log('\n--- Defense Strategies ---');
const strategies = RansomwareDefense.getPreventionStrategies();
strategies.forEach(s => {
    console.log(`${s.category}: ${s.measures.slice(0, 3).join(', ')}`);
});

// Incident response
console.log('\n--- Incident Response Playbook ---');
IncidentResponse.getPlaybook().slice(0, 3).forEach(phase => {
    console.log(`${phase.phase} (${phase.timeframe}):`);
    phase.actions.slice(0, 2).forEach(a => console.log(`  - ${a}`));
});

// Backup strategy
console.log('\n--- Backup Strategy Validation ---');
const backupStrategy = new BackupStrategy();

backupStrategy.defineBackup({
    name: 'Daily Local Backup',
    type: 'incremental',
    frequency: 'daily',
    retention: '30 days',
    storage: 'local',
    encrypted: true
});

backupStrategy.defineBackup({
    name: 'Weekly Cloud Backup',
    type: 'full',
    frequency: 'weekly',
    retention: '90 days',
    storage: 'cloud',
    encrypted: true,
    immutable: true
});

backupStrategy.defineBackup({
    name: 'Monthly Tape Backup',
    type: 'full',
    frequency: 'monthly',
    retention: '1 year',
    storage: 'tape',
    airGapped: true
});

console.log('3-2-1 Validation:', backupStrategy.validate321Rule());
console.log('Recovery Estimate:', backupStrategy.estimateRecoveryTime(500));

// Ransom payment decision
console.log('\n--- Ransom Payment Decision ---');
const decision = IncidentResponse.getRansomDecisionFactors();
console.log('Recommendation:', decision.recommendation);
console.log('Alternatives:', decision.alternatives);

/**
 * Best Practices for Ransomware Defense:
 *
 * 1. Implement robust backup strategy (3-2-1 rule with air gap)
 * 2. Keep systems patched and updated
 * 3. Use endpoint detection and response tools
 * 4. Train users on phishing awareness
 * 5. Segment networks to limit spread
 * 6. Disable unnecessary services (RDP)
 * 7. Implement least privilege access
 * 8. Test backup restoration regularly
 * 9. Have incident response plan ready
 * 10. Never pay ransom without exhausting alternatives
 */
