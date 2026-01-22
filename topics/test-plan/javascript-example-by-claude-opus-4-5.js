/**
 * Test Plan - Blueprint for Automated Testing Process
 *
 * A test plan for software testing automation serves as the foundational blueprint
 * that guides the entire automated testing process. It outlines the scope, objectives,
 * and strategy for implementing automated tests across the application lifecycle,
 * defining which components will be automated and which remain manual.
 *
 * Key Concepts:
 * - Scope and objectives definition
 * - Test case selection criteria
 * - Resource allocation and timeline
 * - Success metrics and reporting
 */

/**
 * TestPlanSection represents sections of a test plan.
 */
class TestPlanSection {
    static sections = {
        introduction: {
            name: 'Introduction',
            description: 'Overview and purpose of the test plan',
            contents: [
                'Project background',
                'Document purpose',
                'Intended audience',
                'Document conventions'
            ]
        },
        objectives: {
            name: 'Test Objectives',
            description: 'Goals the testing effort aims to achieve',
            contents: [
                'Primary testing goals',
                'Quality targets',
                'Coverage requirements',
                'Success criteria'
            ]
        },
        scope: {
            name: 'Scope',
            description: 'What is and isnt included in testing',
            contents: [
                'Features to be tested',
                'Features not to be tested',
                'Automation candidates',
                'Manual testing areas'
            ]
        },
        approach: {
            name: 'Test Approach',
            description: 'Strategy and methodology for testing',
            contents: [
                'Testing levels',
                'Testing types',
                'Automation strategy',
                'Test design techniques'
            ]
        },
        environment: {
            name: 'Test Environment',
            description: 'Infrastructure required for testing',
            contents: [
                'Hardware requirements',
                'Software requirements',
                'Test data needs',
                'Environment setup'
            ]
        },
        schedule: {
            name: 'Schedule',
            description: 'Timeline and milestones',
            contents: [
                'Test phases',
                'Milestones',
                'Dependencies',
                'Deliverables'
            ]
        },
        resources: {
            name: 'Resources',
            description: 'Team and tools needed',
            contents: [
                'Team roles',
                'Skill requirements',
                'Tools and frameworks',
                'Training needs'
            ]
        },
        risks: {
            name: 'Risks and Mitigations',
            description: 'Potential issues and contingencies',
            contents: [
                'Risk identification',
                'Impact assessment',
                'Mitigation strategies',
                'Contingency plans'
            ]
        },
        criteria: {
            name: 'Entry and Exit Criteria',
            description: 'Conditions for starting and completing testing',
            contents: [
                'Entry criteria',
                'Exit criteria',
                'Suspension criteria',
                'Resumption criteria'
            ]
        },
        metrics: {
            name: 'Metrics and Reporting',
            description: 'How success is measured and communicated',
            contents: [
                'Key metrics',
                'Reporting frequency',
                'Report recipients',
                'Dashboards'
            ]
        }
    };

    /**
     * Gets section by name
     * @param {string} name - Section name
     * @returns {Object} Section details
     */
    static getSection(name) {
        return this.sections[name];
    }

    /**
     * Gets all sections
     * @returns {Array} All sections
     */
    static getAllSections() {
        return Object.entries(this.sections).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TestPlan represents a complete test plan document.
 */
class TestPlan {
    constructor(options) {
        this.projectName = options.projectName;
        this.version = options.version || '1.0';
        this.author = options.author;
        this.createdAt = new Date();
        this.status = 'draft';

        // Initialize sections
        this.introduction = options.introduction || {};
        this.objectives = options.objectives || [];
        this.scope = {
            inScope: options.inScope || [],
            outOfScope: options.outOfScope || [],
            automationCandidates: options.automationCandidates || [],
            manualOnly: options.manualOnly || []
        };
        this.approach = options.approach || {};
        this.environment = options.environment || {};
        this.schedule = options.schedule || {};
        this.resources = options.resources || [];
        this.risks = options.risks || [];
        this.criteria = {
            entry: options.entryCriteria || [],
            exit: options.exitCriteria || [],
            suspension: options.suspensionCriteria || [],
            resumption: options.resumptionCriteria || []
        };
        this.metrics = options.metrics || [];
    }

    /**
     * Adds an objective
     * @param {string} objective - Objective description
     * @param {string} priority - Priority level
     */
    addObjective(objective, priority = 'medium') {
        this.objectives.push({ objective, priority, status: 'pending' });
    }

    /**
     * Adds item to scope
     * @param {string} category - Scope category
     * @param {string} item - Item to add
     */
    addToScope(category, item) {
        if (this.scope[category]) {
            this.scope[category].push(item);
        }
    }

    /**
     * Adds a risk
     * @param {Object} risk - Risk details
     */
    addRisk(risk) {
        this.risks.push({
            id: `RISK-${this.risks.length + 1}`,
            description: risk.description,
            probability: risk.probability || 'medium',
            impact: risk.impact || 'medium',
            mitigation: risk.mitigation,
            owner: risk.owner
        });
    }

    /**
     * Adds a resource
     * @param {Object} resource - Resource details
     */
    addResource(resource) {
        this.resources.push({
            role: resource.role,
            name: resource.name,
            responsibilities: resource.responsibilities || [],
            allocation: resource.allocation || '100%'
        });
    }

    /**
     * Validates plan completeness
     * @returns {Object} Validation result
     */
    validate() {
        const issues = [];
        const warnings = [];

        if (!this.projectName) issues.push('Project name is required');
        if (this.objectives.length === 0) issues.push('At least one objective is required');
        if (this.scope.inScope.length === 0) issues.push('Scope must be defined');
        if (this.criteria.entry.length === 0) issues.push('Entry criteria required');
        if (this.criteria.exit.length === 0) issues.push('Exit criteria required');
        if (this.resources.length === 0) warnings.push('No resources assigned');
        if (this.risks.length === 0) warnings.push('No risks identified');

        const completeness = Math.round(
            ((7 - issues.length) / 7) * 100
        );

        return {
            valid: issues.length === 0,
            completeness: completeness + '%',
            issues,
            warnings
        };
    }

    /**
     * Gets plan summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            project: this.projectName,
            version: this.version,
            status: this.status,
            objectives: this.objectives.length,
            inScope: this.scope.inScope.length,
            outOfScope: this.scope.outOfScope.length,
            automationCandidates: this.scope.automationCandidates.length,
            resources: this.resources.length,
            risks: this.risks.length,
            validation: this.validate()
        };
    }

    /**
     * Approves the plan
     * @param {string} approver - Approver name
     */
    approve(approver) {
        const validation = this.validate();
        if (!validation.valid) {
            throw new Error('Cannot approve invalid plan: ' + validation.issues.join(', '));
        }
        this.status = 'approved';
        this.approvedBy = approver;
        this.approvedAt = new Date();
    }
}

/**
 * AutomationCandidateSelector helps select tests for automation.
 */
class AutomationCandidateSelector {
    static criteria = {
        frequency: {
            name: 'Execution Frequency',
            description: 'How often the test runs',
            weight: 3,
            scoring: {
                daily: 10,
                weekly: 7,
                monthly: 4,
                rarely: 1
            }
        },
        stability: {
            name: 'Feature Stability',
            description: 'How stable the feature is',
            weight: 2,
            scoring: {
                stable: 10,
                mostlyStable: 7,
                changing: 3,
                volatile: 1
            }
        },
        complexity: {
            name: 'Automation Complexity',
            description: 'How hard to automate',
            weight: 2,
            scoring: {
                easy: 10,
                moderate: 7,
                complex: 4,
                veryComplex: 1
            }
        },
        risk: {
            name: 'Business Risk',
            description: 'Impact if feature fails',
            weight: 3,
            scoring: {
                critical: 10,
                high: 8,
                medium: 5,
                low: 2
            }
        },
        dataVariation: {
            name: 'Data Variation',
            description: 'Benefits from data-driven testing',
            weight: 1,
            scoring: {
                high: 10,
                medium: 6,
                low: 2
            }
        }
    };

    /**
     * Scores a test case for automation
     * @param {Object} testCase - Test case attributes
     * @returns {Object} Scoring result
     */
    static score(testCase) {
        let totalScore = 0;
        let maxScore = 0;
        const breakdown = [];

        for (const [criterion, config] of Object.entries(this.criteria)) {
            const value = testCase[criterion];
            const score = config.scoring[value] || 0;
            const weightedScore = score * config.weight;
            const maxWeightedScore = 10 * config.weight;

            totalScore += weightedScore;
            maxScore += maxWeightedScore;

            breakdown.push({
                criterion: config.name,
                value,
                score,
                weight: config.weight,
                weightedScore
            });
        }

        const percentage = (totalScore / maxScore) * 100;
        let recommendation;

        if (percentage >= 70) recommendation = 'Highly recommended for automation';
        else if (percentage >= 50) recommendation = 'Good candidate for automation';
        else if (percentage >= 30) recommendation = 'Consider for automation';
        else recommendation = 'May not be suitable for automation';

        return {
            testCase: testCase.name,
            totalScore,
            maxScore,
            percentage: percentage.toFixed(1) + '%',
            recommendation,
            breakdown
        };
    }

    /**
     * Ranks multiple test cases
     * @param {Array} testCases - Test cases to rank
     * @returns {Array} Ranked test cases
     */
    static rank(testCases) {
        return testCases
            .map(tc => this.score(tc))
            .sort((a, b) => b.totalScore - a.totalScore);
    }
}

/**
 * TestPlanMetrics defines common test plan metrics.
 */
class TestPlanMetrics {
    static metrics = {
        coverage: {
            name: 'Test Coverage',
            description: 'Percentage of requirements covered by tests',
            formula: '(Covered Requirements / Total Requirements) × 100',
            target: '≥ 90%'
        },
        automationRate: {
            name: 'Automation Rate',
            description: 'Percentage of tests that are automated',
            formula: '(Automated Tests / Total Tests) × 100',
            target: '≥ 70%'
        },
        executionRate: {
            name: 'Execution Rate',
            description: 'Percentage of planned tests executed',
            formula: '(Executed Tests / Planned Tests) × 100',
            target: '100%'
        },
        passRate: {
            name: 'Pass Rate',
            description: 'Percentage of executed tests that pass',
            formula: '(Passed Tests / Executed Tests) × 100',
            target: '≥ 95%'
        },
        defectDensity: {
            name: 'Defect Density',
            description: 'Defects found per test executed',
            formula: 'Defects Found / Tests Executed',
            target: 'Trending down'
        },
        cycleTime: {
            name: 'Test Cycle Time',
            description: 'Time to complete a test cycle',
            formula: 'End Date - Start Date',
            target: 'Within schedule'
        }
    };

    /**
     * Calculates metric value
     * @param {string} metric - Metric name
     * @param {Object} data - Input data
     * @returns {Object} Calculated metric
     */
    static calculate(metric, data) {
        const config = this.metrics[metric];
        if (!config) return null;

        let value;
        switch (metric) {
            case 'coverage':
                value = (data.coveredRequirements / data.totalRequirements) * 100;
                break;
            case 'automationRate':
                value = (data.automatedTests / data.totalTests) * 100;
                break;
            case 'executionRate':
                value = (data.executedTests / data.plannedTests) * 100;
                break;
            case 'passRate':
                value = (data.passedTests / data.executedTests) * 100;
                break;
            case 'defectDensity':
                value = data.defectsFound / data.testsExecuted;
                break;
            default:
                value = 0;
        }

        return {
            metric: config.name,
            value: value.toFixed(2),
            target: config.target,
            meetsTarget: this.meetsTarget(metric, value)
        };
    }

    /**
     * Checks if value meets target
     * @param {string} metric - Metric name
     * @param {number} value - Actual value
     * @returns {boolean} Whether target is met
     */
    static meetsTarget(metric, value) {
        const targets = {
            coverage: 90,
            automationRate: 70,
            executionRate: 100,
            passRate: 95
        };
        return value >= (targets[metric] || 0);
    }

    /**
     * Gets all metrics
     * @returns {Array} All metrics
     */
    static getAllMetrics() {
        return Object.entries(this.metrics).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TestPlanTemplate provides reusable templates.
 */
class TestPlanTemplate {
    /**
     * Creates a basic test plan
     * @param {Object} project - Project details
     * @returns {TestPlan} Test plan
     */
    static createBasic(project) {
        const plan = new TestPlan({
            projectName: project.name,
            author: project.author,
            introduction: {
                purpose: `Test plan for ${project.name}`,
                background: project.description
            }
        });

        // Add standard objectives
        plan.addObjective('Verify all functional requirements', 'high');
        plan.addObjective('Achieve 80% automation coverage', 'high');
        plan.addObjective('Complete testing within schedule', 'medium');

        // Add standard criteria
        plan.criteria.entry = [
            'Requirements are approved',
            'Test environment is ready',
            'Test data is available'
        ];

        plan.criteria.exit = [
            'All planned tests executed',
            'Pass rate ≥ 95%',
            'No critical defects open'
        ];

        return plan;
    }

    /**
     * Creates an agile sprint test plan
     * @param {Object} sprint - Sprint details
     * @returns {TestPlan} Test plan
     */
    static createSprintPlan(sprint) {
        const plan = new TestPlan({
            projectName: `${sprint.project} - Sprint ${sprint.number}`,
            author: sprint.author,
            version: `Sprint ${sprint.number}`
        });

        plan.addObjective('Test all sprint user stories', 'high');
        plan.addObjective('Regression test core functionality', 'high');
        plan.addObjective('Automate new test cases', 'medium');

        plan.criteria.entry = [
            'Sprint planning complete',
            'User stories have acceptance criteria',
            'Dev complete for story'
        ];

        plan.criteria.exit = [
            'All acceptance criteria verified',
            'Regression suite passes',
            'PO sign-off received'
        ];

        return plan;
    }
}

// Demonstration
console.log('=== Test Plan Demo ===\n');

// Test plan sections
console.log('--- Test Plan Sections ---');
TestPlanSection.getAllSections().slice(0, 5).forEach(section => {
    console.log(`\n${section.name}: ${section.description}`);
});

// Create test plan
console.log('\n--- Create Test Plan ---');
const plan = new TestPlan({
    projectName: 'E-Commerce Platform v2.0',
    author: 'Test Lead',
    introduction: {
        purpose: 'Define testing approach for E-Commerce Platform release 2.0',
        background: 'Major release with new checkout flow and payment integration'
    }
});

// Add objectives
plan.addObjective('Verify all payment integration scenarios', 'high');
plan.addObjective('Validate checkout flow end-to-end', 'high');
plan.addObjective('Ensure backward compatibility', 'medium');
plan.addObjective('Performance test under peak load', 'high');

// Add scope
plan.addToScope('inScope', 'New checkout flow');
plan.addToScope('inScope', 'Payment gateway integration');
plan.addToScope('inScope', 'Order confirmation emails');
plan.addToScope('outOfScope', 'Legacy admin panel');
plan.addToScope('automationCandidates', 'Checkout flow regression');
plan.addToScope('automationCandidates', 'Payment API integration');
plan.addToScope('manualOnly', 'UI visual inspection');

// Add criteria
plan.criteria.entry = [
    'Development complete for all features',
    'Unit tests passing with 80% coverage',
    'Test environment deployed',
    'Test data prepared'
];

plan.criteria.exit = [
    'All planned tests executed',
    'Pass rate ≥ 95%',
    'No critical or high severity defects',
    'Performance targets met'
];

// Add resources
plan.addResource({
    role: 'Test Lead',
    name: 'Alice Smith',
    responsibilities: ['Test planning', 'Status reporting', 'Risk management'],
    allocation: '100%'
});

plan.addResource({
    role: 'Automation Engineer',
    name: 'Bob Johnson',
    responsibilities: ['Test automation', 'Framework maintenance'],
    allocation: '100%'
});

// Add risks
plan.addRisk({
    description: 'Payment gateway test environment unavailability',
    probability: 'medium',
    impact: 'high',
    mitigation: 'Set up mock payment service as fallback',
    owner: 'Test Lead'
});

plan.addRisk({
    description: 'Insufficient test data for edge cases',
    probability: 'low',
    impact: 'medium',
    mitigation: 'Create data generation scripts early',
    owner: 'Automation Engineer'
});

console.log('Plan Summary:', plan.getSummary());

// Validate plan
console.log('\n--- Plan Validation ---');
console.log('Validation:', plan.validate());

// Automation candidate selection
console.log('\n--- Automation Candidate Selection ---');
const testCases = [
    { name: 'Login Flow', frequency: 'daily', stability: 'stable', complexity: 'easy', risk: 'critical', dataVariation: 'medium' },
    { name: 'Checkout Process', frequency: 'daily', stability: 'stable', complexity: 'moderate', risk: 'critical', dataVariation: 'high' },
    { name: 'Report Generation', frequency: 'weekly', stability: 'changing', complexity: 'complex', risk: 'medium', dataVariation: 'low' },
    { name: 'Admin Settings', frequency: 'rarely', stability: 'volatile', complexity: 'moderate', risk: 'low', dataVariation: 'low' }
];

const ranked = AutomationCandidateSelector.rank(testCases);
console.log('Ranked Automation Candidates:');
ranked.forEach((result, i) => {
    console.log(`${i + 1}. ${result.testCase}: ${result.percentage} - ${result.recommendation}`);
});

// Metrics
console.log('\n--- Test Plan Metrics ---');
const metricData = {
    coveredRequirements: 45,
    totalRequirements: 50,
    automatedTests: 120,
    totalTests: 150,
    executedTests: 145,
    plannedTests: 150,
    passedTests: 140,
    defectsFound: 12,
    testsExecuted: 145
};

console.log('Coverage:', TestPlanMetrics.calculate('coverage', metricData));
console.log('Automation Rate:', TestPlanMetrics.calculate('automationRate', metricData));
console.log('Pass Rate:', TestPlanMetrics.calculate('passRate', metricData));

// Template
console.log('\n--- Sprint Test Plan Template ---');
const sprintPlan = TestPlanTemplate.createSprintPlan({
    project: 'E-Commerce',
    number: 15,
    author: 'Test Lead'
});
console.log('Sprint Plan:', sprintPlan.getSummary());

/**
 * Best Practices for Test Plans:
 *
 * 1. Define clear, measurable objectives
 * 2. Be explicit about scope boundaries
 * 3. Prioritize tests for automation carefully
 * 4. Include realistic schedules with buffers
 * 5. Identify risks early and plan mitigations
 * 6. Define unambiguous entry/exit criteria
 * 7. Allocate adequate resources
 * 8. Plan for test data needs
 * 9. Establish clear metrics and reporting
 * 10. Review and update plans regularly
 */
