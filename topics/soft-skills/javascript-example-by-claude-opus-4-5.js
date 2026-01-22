/**
 * Soft Skills - Interpersonal Abilities for Testing Professionals
 *
 * Soft skills, also known as interpersonal skills or people skills, refer to
 * personal attributes and qualities that enable individuals to effectively
 * interact with others and navigate various social and professional situations.
 * For testing professionals, these skills are essential for collaboration,
 * communication, and career growth.
 *
 * Key Concepts:
 * - Communication and collaboration
 * - Problem-solving and critical thinking
 * - Adaptability and emotional intelligence
 * - Leadership and time management
 */

/**
 * SoftSkill represents a soft skill category.
 */
class SoftSkill {
    static skills = {
        communication: {
            name: 'Communication',
            description: 'Articulating ideas effectively verbally and in writing',
            importance: 'Essential for bug reports, documentation, and stakeholder updates',
            components: [
                'Clear written communication',
                'Active listening',
                'Presentation skills',
                'Technical writing',
                'Feedback delivery'
            ],
            testingContext: [
                'Writing clear bug reports',
                'Explaining test results to stakeholders',
                'Documenting test cases',
                'Presenting quality metrics'
            ]
        },
        collaboration: {
            name: 'Collaboration',
            description: 'Working effectively with others towards common goals',
            importance: 'Critical for cross-functional teams and agile environments',
            components: [
                'Team coordination',
                'Conflict resolution',
                'Knowledge sharing',
                'Cross-functional work',
                'Pair testing'
            ],
            testingContext: [
                'Working with developers on bug fixes',
                'Coordinating with product owners',
                'Participating in agile ceremonies',
                'Sharing testing knowledge'
            ]
        },
        criticalThinking: {
            name: 'Critical Thinking',
            description: 'Analyzing situations and making informed decisions',
            importance: 'Foundation for effective test design and defect analysis',
            components: [
                'Analytical reasoning',
                'Problem decomposition',
                'Root cause analysis',
                'Risk assessment',
                'Decision making'
            ],
            testingContext: [
                'Identifying edge cases',
                'Prioritizing test coverage',
                'Analyzing failures',
                'Evaluating test strategies'
            ]
        },
        adaptability: {
            name: 'Adaptability',
            description: 'Adjusting to changing circumstances and requirements',
            importance: 'Essential in fast-paced, evolving development environments',
            components: [
                'Flexibility',
                'Learning agility',
                'Handling ambiguity',
                'Embracing change',
                'Resilience'
            ],
            testingContext: [
                'Adapting to changing requirements',
                'Learning new tools quickly',
                'Adjusting test plans',
                'Working with evolving technologies'
            ]
        },
        emotionalIntelligence: {
            name: 'Emotional Intelligence',
            description: 'Understanding and managing emotions in self and others',
            importance: 'Key for difficult conversations and team dynamics',
            components: [
                'Self-awareness',
                'Empathy',
                'Social skills',
                'Self-regulation',
                'Motivation'
            ],
            testingContext: [
                'Delivering critical feedback diplomatically',
                'Understanding developer perspectives',
                'Managing stress during releases',
                'Building trust with stakeholders'
            ]
        },
        timeManagement: {
            name: 'Time Management',
            description: 'Prioritizing and managing time effectively',
            importance: 'Critical for meeting deadlines and managing test coverage',
            components: [
                'Prioritization',
                'Planning',
                'Focus and concentration',
                'Meeting deadlines',
                'Avoiding procrastination'
            ],
            testingContext: [
                'Prioritizing test cases',
                'Managing test execution time',
                'Balancing automation with manual testing',
                'Meeting release deadlines'
            ]
        },
        leadership: {
            name: 'Leadership',
            description: 'Guiding and inspiring others towards goals',
            importance: 'Important for test leads and quality advocates',
            components: [
                'Vision setting',
                'Mentoring',
                'Decision making',
                'Delegation',
                'Motivation'
            ],
            testingContext: [
                'Leading test teams',
                'Championing quality culture',
                'Mentoring junior testers',
                'Driving process improvements'
            ]
        },
        creativity: {
            name: 'Creativity',
            description: 'Thinking innovatively and generating new ideas',
            importance: 'Essential for exploratory testing and finding edge cases',
            components: [
                'Innovative thinking',
                'Problem-solving approaches',
                'Thinking outside the box',
                'Generating test ideas',
                'Process innovation'
            ],
            testingContext: [
                'Designing creative test scenarios',
                'Finding unusual defects',
                'Improving test processes',
                'Automation solutions'
            ]
        }
    };

    /**
     * Gets skill by name
     * @param {string} name - Skill name
     * @returns {Object} Skill details
     */
    static getSkill(name) {
        return this.skills[name];
    }

    /**
     * Gets all skills
     * @returns {Array} All skills
     */
    static getAllSkills() {
        return Object.entries(this.skills).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * CommunicationTechnique provides communication strategies.
 */
class CommunicationTechnique {
    /**
     * Gets bug report writing guidelines
     * @returns {Object} Guidelines
     */
    static getBugReportGuidelines() {
        return {
            structure: [
                'Clear, concise title',
                'Steps to reproduce',
                'Expected result',
                'Actual result',
                'Environment details',
                'Screenshots/logs'
            ],
            tips: [
                'Be objective, not accusatory',
                'One bug per report',
                'Include all relevant context',
                'Specify severity and priority',
                'Make it reproducible'
            ],
            example: {
                title: 'Login fails with valid credentials on Safari',
                stepsToReproduce: ['1. Open login page', '2. Enter valid credentials', '3. Click Login'],
                expected: 'User is logged in and redirected to dashboard',
                actual: 'Error message "Authentication failed" displayed',
                environment: 'Safari 16.4, macOS Ventura'
            }
        };
    }

    /**
     * Gets feedback delivery framework
     * @returns {Object} Framework
     */
    static getFeedbackFramework() {
        return {
            name: 'SBI Feedback Model',
            steps: [
                { step: 'Situation', description: 'Describe the specific situation' },
                { step: 'Behavior', description: 'Describe the observed behavior' },
                { step: 'Impact', description: 'Explain the impact of the behavior' }
            ],
            example: {
                situation: 'During yesterdays code review',
                behavior: 'The test coverage for the payment module was below 70%',
                impact: 'This increases the risk of defects in production for a critical feature'
            },
            tips: [
                'Focus on behavior, not personality',
                'Be specific with examples',
                'Suggest improvements constructively',
                'Choose appropriate timing'
            ]
        };
    }

    /**
     * Gets active listening techniques
     * @returns {Array} Techniques
     */
    static getActiveListeningTechniques() {
        return [
            {
                technique: 'Paraphrasing',
                description: 'Restating what you heard in your own words',
                example: 'So what youre saying is the test should verify both the happy path and error handling?'
            },
            {
                technique: 'Clarifying Questions',
                description: 'Asking questions to ensure understanding',
                example: 'When you say "performance issues", do you mean response time or throughput?'
            },
            {
                technique: 'Summarizing',
                description: 'Condensing key points at the end',
                example: 'To summarize, we need to focus on regression tests for the API changes.'
            },
            {
                technique: 'Non-verbal Cues',
                description: 'Showing attention through body language',
                example: 'Nodding, maintaining eye contact, facing the speaker'
            }
        ];
    }
}

/**
 * CollaborationStrategy provides collaboration approaches.
 */
class CollaborationStrategy {
    /**
     * Gets strategies for different stakeholders
     * @returns {Object} Strategies
     */
    static getStakeholderStrategies() {
        return {
            developers: {
                approach: 'Partner, not adversary',
                tips: [
                    'Focus on the issue, not the person',
                    'Provide clear reproduction steps',
                    'Be available for clarification',
                    'Acknowledge good work'
                ],
                communication: 'Technical, detailed, solution-oriented'
            },
            productOwners: {
                approach: 'Quality advisor',
                tips: [
                    'Translate technical issues to business impact',
                    'Provide risk assessments',
                    'Help prioritize defects',
                    'Offer testing insights for decisions'
                ],
                communication: 'Business-focused, risk-based'
            },
            management: {
                approach: 'Quality reporter',
                tips: [
                    'Provide clear metrics and trends',
                    'Highlight risks early',
                    'Propose solutions with problems',
                    'Be concise and action-oriented'
                ],
                communication: 'High-level, metrics-driven, actionable'
            },
            endUsers: {
                approach: 'Advocate',
                tips: [
                    'Represent user perspective',
                    'Test from user viewpoint',
                    'Report usability issues',
                    'Validate user workflows'
                ],
                communication: 'User-centric, empathetic'
            }
        };
    }

    /**
     * Gets conflict resolution strategies
     * @returns {Array} Strategies
     */
    static getConflictResolutionStrategies() {
        return [
            {
                strategy: 'Focus on Interests',
                description: 'Understand underlying needs, not positions',
                example: 'Both want quality - find common ground on approach'
            },
            {
                strategy: 'Data-Driven Discussion',
                description: 'Use objective data to support arguments',
                example: 'Present test results and metrics, not opinions'
            },
            {
                strategy: 'Seek Understanding First',
                description: 'Listen before being heard',
                example: 'Ask developer to explain their concerns before defending'
            },
            {
                strategy: 'Find Win-Win Solutions',
                description: 'Look for outcomes that benefit all parties',
                example: 'Compromise on scope while maintaining quality'
            }
        ];
    }
}

/**
 * SkillAssessment evaluates soft skill levels.
 */
class SkillAssessment {
    constructor(name) {
        this.name = name;
        this.assessments = new Map();
    }

    /**
     * Records a skill assessment
     * @param {string} skill - Skill name
     * @param {number} level - Level 1-5
     * @param {string} evidence - Supporting evidence
     */
    assessSkill(skill, level, evidence) {
        this.assessments.set(skill, {
            level,
            evidence,
            assessedAt: new Date()
        });
    }

    /**
     * Gets skill gaps
     * @param {number} targetLevel - Target level
     * @returns {Array} Gaps
     */
    getSkillGaps(targetLevel = 4) {
        const gaps = [];

        for (const [skill, assessment] of this.assessments) {
            if (assessment.level < targetLevel) {
                gaps.push({
                    skill,
                    currentLevel: assessment.level,
                    targetLevel,
                    gap: targetLevel - assessment.level
                });
            }
        }

        return gaps.sort((a, b) => b.gap - a.gap);
    }

    /**
     * Gets overall assessment
     * @returns {Object} Assessment
     */
    getOverallAssessment() {
        const levels = Array.from(this.assessments.values()).map(a => a.level);
        const average = levels.reduce((a, b) => a + b, 0) / levels.length;

        return {
            name: this.name,
            skillsAssessed: this.assessments.size,
            averageLevel: average.toFixed(1),
            strengths: this.getStrengths(),
            gaps: this.getSkillGaps(),
            recommendation: average < 3
                ? 'Focus on fundamental skill development'
                : average < 4
                    ? 'Target specific skill gaps'
                    : 'Consider mentoring others'
        };
    }

    /**
     * Gets strengths
     * @returns {Array} Strengths
     */
    getStrengths() {
        const strengths = [];

        for (const [skill, assessment] of this.assessments) {
            if (assessment.level >= 4) {
                strengths.push({ skill, level: assessment.level });
            }
        }

        return strengths;
    }
}

/**
 * SkillDevelopment provides skill improvement strategies.
 */
class SkillDevelopment {
    /**
     * Gets development activities
     * @param {string} skill - Skill to develop
     * @returns {Object} Activities
     */
    static getDevelopmentActivities(skill) {
        const activities = {
            communication: [
                'Practice writing clear bug reports',
                'Present at team meetings',
                'Write documentation',
                'Seek feedback on written communication',
                'Take a technical writing course'
            ],
            collaboration: [
                'Participate in pair testing',
                'Join cross-functional initiatives',
                'Mentor a junior team member',
                'Lead a retrospective',
                'Facilitate a knowledge sharing session'
            ],
            criticalThinking: [
                'Practice root cause analysis',
                'Review and critique test strategies',
                'Participate in design reviews',
                'Study logical fallacies',
                'Solve complex testing puzzles'
            ],
            leadership: [
                'Lead a test initiative',
                'Mentor team members',
                'Drive process improvements',
                'Represent QA in planning meetings',
                'Take ownership of quality metrics'
            ]
        };

        return {
            skill,
            activities: activities[skill] || ['General skill development activities'],
            resources: this.getResources(skill)
        };
    }

    /**
     * Gets learning resources
     * @param {string} skill - Skill name
     * @returns {Array} Resources
     */
    static getResources(skill) {
        const resources = {
            communication: ['Nonviolent Communication (book)', 'Toastmasters', 'Technical Writing courses'],
            collaboration: ['Agile methodologies training', 'Team dynamics workshops'],
            criticalThinking: ['Critical Thinking courses', 'Problem-solving workshops'],
            leadership: ['Leadership fundamentals training', 'Management books']
        };

        return resources[skill] || ['Professional development resources'];
    }
}

// Demonstration
console.log('=== Soft Skills Demo ===\n');

// Soft skills overview
console.log('--- Soft Skills for Testers ---');
SoftSkill.getAllSkills().slice(0, 4).forEach(skill => {
    console.log(`\n${skill.name}: ${skill.description}`);
    console.log(`  Testing context: ${skill.testingContext[0]}`);
});

// Communication techniques
console.log('\n--- Bug Report Guidelines ---');
const guidelines = CommunicationTechnique.getBugReportGuidelines();
console.log('Structure:', guidelines.structure.slice(0, 4));
console.log('Tips:', guidelines.tips.slice(0, 3));

// Feedback framework
console.log('\n--- Feedback Delivery ---');
const feedback = CommunicationTechnique.getFeedbackFramework();
console.log('Model:', feedback.name);
console.log('Steps:', feedback.steps.map(s => s.step));

// Active listening
console.log('\n--- Active Listening Techniques ---');
CommunicationTechnique.getActiveListeningTechniques().slice(0, 2).forEach(tech => {
    console.log(`${tech.technique}: ${tech.description}`);
});

// Stakeholder collaboration
console.log('\n--- Stakeholder Collaboration ---');
const strategies = CollaborationStrategy.getStakeholderStrategies();
console.log('With Developers:', strategies.developers.tips.slice(0, 2));
console.log('With Product Owners:', strategies.productOwners.tips.slice(0, 2));

// Skill assessment
console.log('\n--- Skill Assessment ---');
const assessment = new SkillAssessment('Test Engineer');

assessment.assessSkill('communication', 4, 'Clear bug reports, good presentations');
assessment.assessSkill('collaboration', 4, 'Works well with team');
assessment.assessSkill('criticalThinking', 3, 'Good analysis, room for improvement');
assessment.assessSkill('leadership', 2, 'Limited leadership experience');
assessment.assessSkill('adaptability', 4, 'Handles change well');

console.log('Overall Assessment:', assessment.getOverallAssessment());

// Skill development
console.log('\n--- Skill Development ---');
const development = SkillDevelopment.getDevelopmentActivities('leadership');
console.log('Leadership Development:', development.activities.slice(0, 3));

/**
 * Best Practices for Soft Skill Development:
 *
 * 1. Practice clear, concise written communication
 * 2. Develop active listening skills
 * 3. Build relationships with stakeholders
 * 4. Embrace constructive feedback
 * 5. Collaborate across team boundaries
 * 6. Develop emotional intelligence
 * 7. Learn to manage time effectively
 * 8. Practice critical thinking daily
 * 9. Seek leadership opportunities
 * 10. Continuously learn and adapt
 */
