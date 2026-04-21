/**
 * Shift-Left Testing - Early Defect Detection
 *
 * Shift-left testing is an approach to software quality assurance that involves
 * identifying and fixing defects early in the development process. The goal is
 * to move testing activities earlier in the software development lifecycle,
 * rather than waiting until the end, enabling earlier defect detection and
 * reduced cost of fixes.
 *
 * Key Concepts:
 * - Test early and often
 * - Integrate testing into development
 * - Prevent defects vs detect defects
 * - Reduce cost of quality
 */

/**
 * ShiftLeftPhase represents testing activities at each SDLC phase.
 */
class ShiftLeftPhase {
    static phases = {
        requirements: {
            name: 'Requirements Phase',
            traditional: 'Defects found in production',
            shiftLeft: 'Validate requirements before coding',
            activities: [
                'Requirements review',
                'Acceptance criteria definition',
                'Test case design',
                'Risk analysis'
            ],
            defectCost: 1 // Baseline cost multiplier
        },
        design: {
            name: 'Design Phase',
            traditional: 'Architecture issues found in testing',
            shiftLeft: 'Review design for testability',
            activities: [
                'Design review',
                'Security threat modeling',
                'Test architecture planning',
                'API contract definition'
            ],
            defectCost: 5
        },
        development: {
            name: 'Development Phase',
            traditional: 'Bugs found in QA',
            shiftLeft: 'Unit testing and code review',
            activities: [
                'Unit testing (TDD)',
                'Code review',
                'Static analysis',
                'Pair programming'
            ],
            defectCost: 10
        },
        integration: {
            name: 'Integration Phase',
            traditional: 'Integration issues found late',
            shiftLeft: 'Continuous integration testing',
            activities: [
                'Integration testing',
                'API testing',
                'Contract testing',
                'Smoke testing'
            ],
            defectCost: 20
        },
        testing: {
            name: 'Testing Phase',
            traditional: 'Manual testing at end',
            shiftLeft: 'Automated testing throughout',
            activities: [
                'Automated regression',
                'Performance testing',
                'Security testing',
                'Exploratory testing'
            ],
            defectCost: 50
        },
        production: {
            name: 'Production',
            traditional: 'User-reported bugs',
            shiftLeft: 'Monitoring and early detection',
            activities: [
                'Production monitoring',
                'Feature flags',
                'Canary releases',
                'User feedback loops'
            ],
            defectCost: 100
        }
    };

    /**
     * Gets phase by name
     * @param {string} name - Phase name
     * @returns {Object} Phase
     */
    static getPhase(name) {
        return this.phases[name];
    }

    /**
     * Calculates cost savings
     * @param {string} fromPhase - Where defect would be found traditionally
     * @param {string} toPhase - Where defect found with shift-left
     * @param {number} defectCount - Number of defects
     * @param {number} baseCost - Base cost per defect
     * @returns {Object} Savings calculation
     */
    static calculateSavings(fromPhase, toPhase, defectCount, baseCost = 1000) {
        const from = this.phases[fromPhase];
        const to = this.phases[toPhase];

        const traditionalCost = defectCount * baseCost * from.defectCost;
        const shiftLeftCost = defectCount * baseCost * to.defectCost;
        const savings = traditionalCost - shiftLeftCost;

        return {
            traditionalPhase: from.name,
            shiftLeftPhase: to.name,
            defectCount,
            traditionalCost,
            shiftLeftCost,
            savings,
            savingsPercentage: ((savings / traditionalCost) * 100).toFixed(1) + '%'
        };
    }
}

/**
 * ShiftLeftPractice represents shift-left testing practices.
 */
class ShiftLeftPractice {
    static practices = {
        tdd: {
            name: 'Test-Driven Development (TDD)',
            description: 'Write tests before code',
            phase: 'development',
            benefits: [
                'Ensures testable design',
                'Immediate feedback',
                'Living documentation',
                'Reduced debugging time'
            ],
            implementation: [
                'Write failing test first',
                'Write minimal code to pass',
                'Refactor while tests pass',
                'Repeat for each feature'
            ]
        },
        bdd: {
            name: 'Behavior-Driven Development (BDD)',
            description: 'Define behavior in business language',
            phase: 'requirements',
            benefits: [
                'Shared understanding',
                'Executable specifications',
                'Business-readable tests',
                'Better collaboration'
            ],
            implementation: [
                'Write scenarios in Gherkin',
                'Review with stakeholders',
                'Automate scenarios',
                'Use as acceptance criteria'
            ]
        },
        staticAnalysis: {
            name: 'Static Code Analysis',
            description: 'Analyze code without execution',
            phase: 'development',
            benefits: [
                'Find bugs before runtime',
                'Enforce coding standards',
                'Identify security issues',
                'Reduce code review burden'
            ],
            tools: ['ESLint', 'SonarQube', 'Checkstyle', 'PMD']
        },
        codeReview: {
            name: 'Code Review',
            description: 'Peer review of code changes',
            phase: 'development',
            benefits: [
                'Knowledge sharing',
                'Bug detection',
                'Design improvement',
                'Consistent quality'
            ],
            implementation: [
                'Review all changes before merge',
                'Use pull request workflow',
                'Automate checks before review',
                'Focus on logic and design'
            ]
        },
        continuousIntegration: {
            name: 'Continuous Integration',
            description: 'Automated build and test on every commit',
            phase: 'integration',
            benefits: [
                'Immediate feedback',
                'Early integration issues',
                'Always deployable code',
                'Reduced merge conflicts'
            ],
            implementation: [
                'Commit frequently',
                'Run automated tests',
                'Fix failures immediately',
                'Keep build fast'
            ]
        },
        contractTesting: {
            name: 'Contract Testing',
            description: 'Test API contracts between services',
            phase: 'integration',
            benefits: [
                'Early API issues',
                'Independent service testing',
                'Reduced integration testing',
                'Clear service contracts'
            ],
            tools: ['Pact', 'Spring Cloud Contract']
        }
    };

    /**
     * Gets practice by name
     * @param {string} name - Practice name
     * @returns {Object} Practice
     */
    static getPractice(name) {
        return this.practices[name];
    }

    /**
     * Gets practices by phase
     * @param {string} phase - Phase name
     * @returns {Array} Practices
     */
    static getByPhase(phase) {
        return Object.values(this.practices).filter(p => p.phase === phase);
    }
}

/**
 * ShiftLeftMetrics tracks shift-left effectiveness.
 */
class ShiftLeftMetrics {
    constructor() {
        this.defects = [];
    }

    /**
     * Records a defect
     * @param {Object} defect - Defect details
     */
    recordDefect(defect) {
        this.defects.push({
            id: `DEF-${this.defects.length + 1}`,
            foundPhase: defect.foundPhase,
            originPhase: defect.originPhase,
            severity: defect.severity,
            fixTime: defect.fixTime,
            timestamp: new Date()
        });
    }

    /**
     * Calculates defect escape rate
     * @returns {Object} Escape rate
     */
    calculateEscapeRate() {
        const total = this.defects.length;
        const escaped = this.defects.filter(d =>
            d.foundPhase === 'testing' || d.foundPhase === 'production'
        ).length;

        return {
            total,
            escapedToLatePhases: escaped,
            escapeRate: total > 0 ? ((escaped / total) * 100).toFixed(1) + '%' : '0%',
            target: '< 20%',
            status: escaped / total < 0.2 ? 'good' : 'needs improvement'
        };
    }

    /**
     * Calculates defect removal efficiency
     * @returns {Object} DRE metrics
     */
    calculateDRE() {
        const foundBeforeRelease = this.defects.filter(d =>
            d.foundPhase !== 'production'
        ).length;
        const foundInProduction = this.defects.filter(d =>
            d.foundPhase === 'production'
        ).length;

        const total = foundBeforeRelease + foundInProduction;
        const dre = total > 0 ? (foundBeforeRelease / total) * 100 : 100;

        return {
            foundBeforeRelease,
            foundInProduction,
            dre: dre.toFixed(1) + '%',
            target: '> 95%',
            status: dre > 95 ? 'excellent' : dre > 85 ? 'good' : 'needs improvement'
        };
    }

    /**
     * Gets phase distribution
     * @returns {Object} Distribution
     */
    getPhaseDistribution() {
        const distribution = {};

        for (const defect of this.defects) {
            distribution[defect.foundPhase] = (distribution[defect.foundPhase] || 0) + 1;
        }

        return {
            distribution,
            recommendation: this.defects.length > 0
                ? 'Move testing activities earlier to catch defects sooner'
                : 'Continue current practices'
        };
    }

    /**
     * Gets metrics summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            totalDefects: this.defects.length,
            escapeRate: this.calculateEscapeRate(),
            dre: this.calculateDRE(),
            distribution: this.getPhaseDistribution()
        };
    }
}

/**
 * ShiftLeftImplementation provides implementation guidance.
 */
class ShiftLeftImplementation {
    /**
     * Gets implementation roadmap
     * @returns {Array} Roadmap
     */
    static getRoadmap() {
        return [
            {
                phase: 1,
                name: 'Foundation',
                duration: '1-2 months',
                activities: [
                    'Set up CI/CD pipeline',
                    'Implement automated unit testing',
                    'Add static code analysis',
                    'Establish code review process'
                ],
                metrics: ['Build frequency', 'Unit test coverage']
            },
            {
                phase: 2,
                name: 'Integration',
                duration: '2-3 months',
                activities: [
                    'Add integration tests to pipeline',
                    'Implement contract testing',
                    'Add security scanning',
                    'Automate regression tests'
                ],
                metrics: ['Integration test coverage', 'Build success rate']
            },
            {
                phase: 3,
                name: 'Collaboration',
                duration: '2-3 months',
                activities: [
                    'Implement BDD with stakeholders',
                    'Shift performance testing left',
                    'Add accessibility testing',
                    'Enhance test documentation'
                ],
                metrics: ['Defect escape rate', 'Time to detect defects']
            },
            {
                phase: 4,
                name: 'Optimization',
                duration: 'Ongoing',
                activities: [
                    'Continuous improvement',
                    'Test optimization',
                    'Metrics-driven decisions',
                    'Knowledge sharing'
                ],
                metrics: ['DRE', 'Cost of quality', 'Time to market']
            }
        ];
    }

    /**
     * Gets challenges and solutions
     * @returns {Array} Challenges
     */
    static getChallenges() {
        return [
            {
                challenge: 'Cultural resistance',
                description: 'Team unfamiliar with early testing',
                solutions: [
                    'Training and education',
                    'Start with small wins',
                    'Show cost savings',
                    'Management support'
                ]
            },
            {
                challenge: 'Lack of automation skills',
                description: 'Team lacks automation experience',
                solutions: [
                    'Invest in training',
                    'Hire automation experts',
                    'Use low-code tools initially',
                    'Pair programming with experts'
                ]
            },
            {
                challenge: 'Legacy systems',
                description: 'Existing systems hard to test',
                solutions: [
                    'Start with new components',
                    'Incremental refactoring',
                    'Add test coverage gradually',
                    'Use characterization tests'
                ]
            },
            {
                challenge: 'Time pressure',
                description: 'Deadlines dont allow for testing',
                solutions: [
                    'Demonstrate ROI of early testing',
                    'Automate repetitive testing',
                    'Build quality in from start',
                    'Track defect costs'
                ]
            }
        ];
    }
}

/**
 * ShiftLeftAssessment evaluates shift-left maturity.
 */
class ShiftLeftAssessment {
    /**
     * Assesses shift-left maturity
     * @param {Object} practices - Current practices
     * @returns {Object} Assessment
     */
    static assess(practices) {
        let score = 0;
        const findings = [];

        if (practices.unitTesting) {
            score += 15;
            findings.push({ practice: 'Unit testing', status: 'implemented' });
        } else {
            findings.push({ practice: 'Unit testing', status: 'missing', priority: 'high' });
        }

        if (practices.codeReview) {
            score += 15;
            findings.push({ practice: 'Code review', status: 'implemented' });
        } else {
            findings.push({ practice: 'Code review', status: 'missing', priority: 'high' });
        }

        if (practices.staticAnalysis) {
            score += 10;
            findings.push({ practice: 'Static analysis', status: 'implemented' });
        } else {
            findings.push({ practice: 'Static analysis', status: 'missing', priority: 'medium' });
        }

        if (practices.ci) {
            score += 20;
            findings.push({ practice: 'CI pipeline', status: 'implemented' });
        } else {
            findings.push({ practice: 'CI pipeline', status: 'missing', priority: 'high' });
        }

        if (practices.automatedTesting) {
            score += 15;
            findings.push({ practice: 'Automated testing', status: 'implemented' });
        } else {
            findings.push({ practice: 'Automated testing', status: 'missing', priority: 'high' });
        }

        if (practices.tdd || practices.bdd) {
            score += 15;
            findings.push({ practice: 'TDD/BDD', status: 'implemented' });
        } else {
            findings.push({ practice: 'TDD/BDD', status: 'missing', priority: 'medium' });
        }

        if (practices.securityTesting) {
            score += 10;
            findings.push({ practice: 'Security testing', status: 'implemented' });
        } else {
            findings.push({ practice: 'Security testing', status: 'missing', priority: 'medium' });
        }

        const maturityLevel = score >= 80 ? 'Advanced' :
            score >= 60 ? 'Intermediate' :
                score >= 40 ? 'Basic' : 'Initial';

        return {
            score,
            maturityLevel,
            findings,
            missingPractices: findings.filter(f => f.status === 'missing'),
            recommendation: maturityLevel === 'Advanced'
                ? 'Continue optimizing and measuring'
                : 'Focus on high-priority missing practices'
        };
    }
}

// Demonstration
console.log('=== Shift-Left Testing Demo ===\n');

// Phases and cost savings
console.log('--- Shift-Left Phases ---');
Object.values(ShiftLeftPhase.phases).slice(0, 4).forEach(phase => {
    console.log(`${phase.name}: ${phase.shiftLeft}`);
});

console.log('\n--- Cost Savings Example ---');
const savings = ShiftLeftPhase.calculateSavings('production', 'development', 10, 1000);
console.log('Cost Savings:', savings);

// Shift-left practices
console.log('\n--- Shift-Left Practices ---');
['tdd', 'staticAnalysis', 'continuousIntegration'].forEach(name => {
    const practice = ShiftLeftPractice.getPractice(name);
    console.log(`\n${practice.name}:`);
    console.log(`  Phase: ${practice.phase}`);
    console.log(`  Benefits: ${practice.benefits.slice(0, 2).join(', ')}`);
});

// Metrics tracking
console.log('\n--- Shift-Left Metrics ---');
const metrics = new ShiftLeftMetrics();

metrics.recordDefect({ foundPhase: 'development', originPhase: 'requirements', severity: 'medium' });
metrics.recordDefect({ foundPhase: 'development', originPhase: 'design', severity: 'high' });
metrics.recordDefect({ foundPhase: 'testing', originPhase: 'development', severity: 'medium' });
metrics.recordDefect({ foundPhase: 'production', originPhase: 'development', severity: 'critical' });
metrics.recordDefect({ foundPhase: 'development', originPhase: 'requirements', severity: 'low' });

console.log('Metrics Summary:', metrics.getSummary());

// Implementation roadmap
console.log('\n--- Implementation Roadmap ---');
ShiftLeftImplementation.getRoadmap().slice(0, 2).forEach(phase => {
    console.log(`\nPhase ${phase.phase}: ${phase.name} (${phase.duration})`);
    console.log('  Activities:', phase.activities.slice(0, 2).join(', '));
});

// Maturity assessment
console.log('\n--- Maturity Assessment ---');
const assessment = ShiftLeftAssessment.assess({
    unitTesting: true,
    codeReview: true,
    staticAnalysis: true,
    ci: true,
    automatedTesting: false,
    tdd: false,
    securityTesting: false
});

console.log('Assessment:', {
    score: assessment.score,
    maturityLevel: assessment.maturityLevel,
    missingCount: assessment.missingPractices.length
});

// Challenges
console.log('\n--- Common Challenges ---');
ShiftLeftImplementation.getChallenges().slice(0, 2).forEach(challenge => {
    console.log(`\n${challenge.challenge}: ${challenge.description}`);
    console.log('  Solutions:', challenge.solutions.slice(0, 2).join(', '));
});

/**
 * Best Practices for Shift-Left Testing:
 *
 * 1. Start testing at requirements phase
 * 2. Write tests before or with code (TDD/BDD)
 * 3. Automate tests for fast feedback
 * 4. Implement continuous integration
 * 5. Use static analysis tools
 * 6. Conduct thorough code reviews
 * 7. Test security early (DevSecOps)
 * 8. Measure defect escape rate
 * 9. Train team on shift-left practices
 * 10. Continuously improve based on metrics
 */
