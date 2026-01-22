/**
 * System Testing - Evaluating Complete System Behavior
 *
 * System testing is a type of software testing that evaluates the entire
 * system's behavior and functionality as a whole. It ensures that all
 * software components work together correctly and satisfy system requirements.
 * System testing identifies defects and verifies the system operates as expected.
 *
 * Key Concepts:
 * - End-to-end testing
 * - Complete system validation
 * - Functional and non-functional testing
 * - Requirements verification
 */

/**
 * SystemTestType represents different system testing types.
 */
class SystemTestType {
    static types = {
        functional: {
            name: 'Functional Testing',
            description: 'Verifies system functions as per requirements',
            focus: 'What the system does',
            activities: [
                'Feature testing',
                'Business process testing',
                'Use case validation',
                'Workflow testing'
            ]
        },
        performance: {
            name: 'Performance Testing',
            description: 'Tests system performance under various conditions',
            focus: 'How fast and efficient',
            subtypes: ['Load testing', 'Stress testing', 'Endurance testing', 'Spike testing']
        },
        security: {
            name: 'Security Testing',
            description: 'Tests system security features and vulnerabilities',
            focus: 'Protection and access control',
            activities: ['Penetration testing', 'Vulnerability scanning', 'Authentication testing']
        },
        usability: {
            name: 'Usability Testing',
            description: 'Tests user interface and user experience',
            focus: 'User friendliness',
            activities: ['UI testing', 'Accessibility testing', 'Navigation testing']
        },
        compatibility: {
            name: 'Compatibility Testing',
            description: 'Tests across different environments',
            focus: 'Cross-platform operation',
            activities: ['Browser testing', 'Device testing', 'OS testing']
        },
        regression: {
            name: 'Regression Testing',
            description: 'Tests that changes dont break existing functionality',
            focus: 'Stability after changes',
            activities: ['Full regression', 'Partial regression', 'Smoke testing']
        },
        recovery: {
            name: 'Recovery Testing',
            description: 'Tests system recovery from failures',
            focus: 'Fault tolerance',
            activities: ['Failover testing', 'Backup/restore testing', 'Disaster recovery']
        }
    };

    /**
     * Gets type by name
     * @param {string} name - Type name
     * @returns {Object} Type details
     */
    static getType(name) {
        return this.types[name];
    }

    /**
     * Gets all types
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
 * SystemTestCase represents a system-level test case.
 */
class SystemTestCase {
    constructor(options) {
        this.id = options.id || `STC-${Date.now()}`;
        this.title = options.title;
        this.requirement = options.requirement;
        this.type = options.type || 'functional';
        this.priority = options.priority || 'medium';
        this.preconditions = options.preconditions || [];
        this.testSteps = options.testSteps || [];
        this.expectedResults = options.expectedResults || [];
        this.status = 'not_executed';
    }

    /**
     * Adds a test step
     * @param {string} action - Action to perform
     * @param {string} expected - Expected result
     */
    addStep(action, expected) {
        const stepNumber = this.testSteps.length + 1;
        this.testSteps.push({ step: stepNumber, action });
        this.expectedResults.push({ step: stepNumber, expected });
    }

    /**
     * Executes the test case
     * @param {Object} result - Execution result
     */
    execute(result) {
        this.status = result.passed ? 'passed' : 'failed';
        this.actualResults = result.actualResults || [];
        this.executedAt = new Date();
        this.executedBy = result.tester;
        this.defects = result.defects || [];
    }

    /**
     * Gets test case summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            type: this.type,
            priority: this.priority,
            status: this.status,
            stepsCount: this.testSteps.length,
            requirement: this.requirement
        };
    }
}

/**
 * SystemTestSuite manages system test cases.
 */
class SystemTestSuite {
    constructor(name) {
        this.name = name;
        this.testCases = [];
        this.createdAt = new Date();
        this.version = '1.0';
    }

    /**
     * Adds a test case
     * @param {SystemTestCase} testCase - Test case to add
     */
    addTestCase(testCase) {
        this.testCases.push(testCase);
    }

    /**
     * Gets test cases by type
     * @param {string} type - Test type
     * @returns {Array} Matching test cases
     */
    getByType(type) {
        return this.testCases.filter(tc => tc.type === type);
    }

    /**
     * Gets test cases by requirement
     * @param {string} requirement - Requirement ID
     * @returns {Array} Matching test cases
     */
    getByRequirement(requirement) {
        return this.testCases.filter(tc => tc.requirement === requirement);
    }

    /**
     * Executes the test suite
     * @returns {Object} Execution results
     */
    execute() {
        const startTime = Date.now();
        const results = [];

        for (const testCase of this.testCases) {
            // Simulate execution
            const passed = Math.random() > 0.15; // 85% pass rate
            testCase.execute({
                passed,
                tester: 'Automated',
                defects: passed ? [] : [{ id: `DEF-${Date.now()}`, severity: 'medium' }]
            });

            results.push(testCase.getSummary());
        }

        const passed = results.filter(r => r.status === 'passed').length;

        return {
            suite: this.name,
            totalTests: results.length,
            passed,
            failed: results.length - passed,
            passRate: ((passed / results.length) * 100).toFixed(1) + '%',
            duration: Date.now() - startTime,
            results
        };
    }

    /**
     * Gets coverage by type
     * @returns {Object} Coverage by type
     */
    getCoverageByType() {
        const coverage = {};

        for (const type of Object.keys(SystemTestType.types)) {
            const tests = this.getByType(type);
            coverage[type] = {
                count: tests.length,
                passed: tests.filter(t => t.status === 'passed').length,
                failed: tests.filter(t => t.status === 'failed').length
            };
        }

        return coverage;
    }

    /**
     * Gets suite statistics
     * @returns {Object} Statistics
     */
    getStatistics() {
        const byType = {};
        const byPriority = { high: 0, medium: 0, low: 0 };
        const byStatus = { passed: 0, failed: 0, not_executed: 0 };

        for (const tc of this.testCases) {
            byType[tc.type] = (byType[tc.type] || 0) + 1;
            byPriority[tc.priority] = (byPriority[tc.priority] || 0) + 1;
            byStatus[tc.status] = (byStatus[tc.status] || 0) + 1;
        }

        return {
            name: this.name,
            totalTests: this.testCases.length,
            byType,
            byPriority,
            byStatus
        };
    }
}

/**
 * RequirementTraceability tracks test-to-requirement mapping.
 */
class RequirementTraceability {
    constructor() {
        this.requirements = new Map();
        this.testCases = new Map();
    }

    /**
     * Adds a requirement
     * @param {string} reqId - Requirement ID
     * @param {string} description - Requirement description
     */
    addRequirement(reqId, description) {
        this.requirements.set(reqId, {
            id: reqId,
            description,
            testCases: [],
            status: 'not_tested'
        });
    }

    /**
     * Links test case to requirement
     * @param {string} testCaseId - Test case ID
     * @param {string} reqId - Requirement ID
     */
    linkTestCase(testCaseId, reqId) {
        if (this.requirements.has(reqId)) {
            this.requirements.get(reqId).testCases.push(testCaseId);
        }
        this.testCases.set(testCaseId, reqId);
    }

    /**
     * Updates test result
     * @param {string} testCaseId - Test case ID
     * @param {string} status - Test status
     */
    updateTestResult(testCaseId, status) {
        const reqId = this.testCases.get(testCaseId);
        if (reqId && this.requirements.has(reqId)) {
            const req = this.requirements.get(reqId);
            const allPassed = status === 'passed';
            req.status = allPassed ? 'passed' : 'failed';
        }
    }

    /**
     * Gets traceability report
     * @returns {Object} Report
     */
    getTraceabilityReport() {
        const report = {
            totalRequirements: this.requirements.size,
            covered: 0,
            uncovered: 0,
            passed: 0,
            failed: 0,
            requirements: []
        };

        for (const [id, req] of this.requirements) {
            const covered = req.testCases.length > 0;
            if (covered) report.covered++;
            else report.uncovered++;

            if (req.status === 'passed') report.passed++;
            else if (req.status === 'failed') report.failed++;

            report.requirements.push({
                id,
                description: req.description,
                testCases: req.testCases.length,
                status: req.status
            });
        }

        report.coverage = ((report.covered / report.totalRequirements) * 100).toFixed(1) + '%';

        return report;
    }
}

/**
 * SystemTestPlan creates system test plans.
 */
class SystemTestPlan {
    constructor(options) {
        this.projectName = options.projectName;
        this.version = options.version;
        this.objectives = options.objectives || [];
        this.scope = {
            inScope: options.inScope || [],
            outOfScope: options.outOfScope || []
        };
        this.approach = options.approach || {};
        this.schedule = options.schedule || {};
        this.resources = options.resources || [];
        this.risks = options.risks || [];
        this.criteria = {
            entry: options.entryCriteria || [],
            exit: options.exitCriteria || []
        };
    }

    /**
     * Validates plan completeness
     * @returns {Object} Validation result
     */
    validate() {
        const issues = [];

        if (!this.projectName) issues.push('Project name required');
        if (this.objectives.length === 0) issues.push('Objectives required');
        if (this.scope.inScope.length === 0) issues.push('Scope required');
        if (this.criteria.entry.length === 0) issues.push('Entry criteria required');
        if (this.criteria.exit.length === 0) issues.push('Exit criteria required');

        return {
            valid: issues.length === 0,
            issues,
            completeness: ((5 - issues.length) / 5 * 100).toFixed(0) + '%'
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
            objectives: this.objectives.length,
            inScope: this.scope.inScope.length,
            outOfScope: this.scope.outOfScope.length,
            risks: this.risks.length,
            resources: this.resources.length
        };
    }
}

/**
 * DefectTracking tracks defects found during system testing.
 */
class DefectTracking {
    constructor() {
        this.defects = [];
    }

    /**
     * Reports a defect
     * @param {Object} defect - Defect details
     * @returns {Object} Created defect
     */
    reportDefect(defect) {
        const newDefect = {
            id: `DEF-${this.defects.length + 1}`,
            title: defect.title,
            description: defect.description,
            severity: defect.severity,
            priority: defect.priority,
            testCaseId: defect.testCaseId,
            status: 'open',
            reportedAt: new Date(),
            reportedBy: defect.reportedBy
        };

        this.defects.push(newDefect);
        return newDefect;
    }

    /**
     * Gets defect summary
     * @returns {Object} Summary
     */
    getSummary() {
        const bySeverity = {};
        const byStatus = {};

        for (const defect of this.defects) {
            bySeverity[defect.severity] = (bySeverity[defect.severity] || 0) + 1;
            byStatus[defect.status] = (byStatus[defect.status] || 0) + 1;
        }

        return {
            total: this.defects.length,
            bySeverity,
            byStatus,
            openCritical: this.defects.filter(d =>
                d.severity === 'critical' && d.status === 'open'
            ).length
        };
    }
}

// Demonstration
console.log('=== System Testing Demo ===\n');

// System test types
console.log('--- System Test Types ---');
SystemTestType.getAllTypes().slice(0, 4).forEach(type => {
    console.log(`\n${type.name}: ${type.description}`);
});

// Create test cases
console.log('\n--- System Test Cases ---');
const suite = new SystemTestSuite('E-Commerce System Tests');

const loginTest = new SystemTestCase({
    title: 'User Login Flow',
    requirement: 'REQ-AUTH-001',
    type: 'functional',
    priority: 'high'
});
loginTest.addStep('Navigate to login page', 'Login form displayed');
loginTest.addStep('Enter valid credentials', 'Credentials accepted');
loginTest.addStep('Click login button', 'User redirected to dashboard');
suite.addTestCase(loginTest);

const perfTest = new SystemTestCase({
    title: 'Homepage Load Performance',
    requirement: 'REQ-PERF-001',
    type: 'performance',
    priority: 'high'
});
suite.addTestCase(perfTest);

const secTest = new SystemTestCase({
    title: 'SQL Injection Prevention',
    requirement: 'REQ-SEC-001',
    type: 'security',
    priority: 'high'
});
suite.addTestCase(secTest);

suite.addTestCase(new SystemTestCase({ title: 'Cart Functionality', requirement: 'REQ-CART-001', type: 'functional', priority: 'high' }));
suite.addTestCase(new SystemTestCase({ title: 'Checkout Process', requirement: 'REQ-CHK-001', type: 'functional', priority: 'high' }));

console.log('Suite Statistics:', suite.getStatistics());

// Execute tests
console.log('\n--- Test Execution ---');
const results = suite.execute();
console.log('Execution Results:', {
    total: results.totalTests,
    passed: results.passed,
    failed: results.failed,
    passRate: results.passRate
});

// Requirement traceability
console.log('\n--- Requirement Traceability ---');
const traceability = new RequirementTraceability();

traceability.addRequirement('REQ-AUTH-001', 'User authentication');
traceability.addRequirement('REQ-PERF-001', 'Performance requirements');
traceability.addRequirement('REQ-SEC-001', 'Security requirements');
traceability.addRequirement('REQ-CART-001', 'Shopping cart functionality');

traceability.linkTestCase('STC-1', 'REQ-AUTH-001');
traceability.linkTestCase('STC-2', 'REQ-PERF-001');
traceability.linkTestCase('STC-3', 'REQ-SEC-001');

traceability.updateTestResult('STC-1', 'passed');
traceability.updateTestResult('STC-2', 'passed');

console.log('Traceability Report:', traceability.getTraceabilityReport());

// Test plan
console.log('\n--- System Test Plan ---');
const plan = new SystemTestPlan({
    projectName: 'E-Commerce Platform',
    version: '2.0',
    objectives: ['Verify all features', 'Validate performance', 'Ensure security'],
    inScope: ['User management', 'Product catalog', 'Checkout'],
    outOfScope: ['Third-party integrations'],
    entryCriteria: ['Code complete', 'Unit tests pass'],
    exitCriteria: ['95% pass rate', 'No critical defects']
});

console.log('Plan Summary:', plan.getSummary());
console.log('Plan Validation:', plan.validate());

// Defect tracking
console.log('\n--- Defect Summary ---');
const defects = new DefectTracking();
defects.reportDefect({ title: 'Login fails with special chars', severity: 'high', priority: 'high', testCaseId: 'STC-1' });
defects.reportDefect({ title: 'Slow page load', severity: 'medium', priority: 'medium', testCaseId: 'STC-2' });

console.log('Defects:', defects.getSummary());

/**
 * Best Practices for System Testing:
 *
 * 1. Test the complete system end-to-end
 * 2. Include both functional and non-functional tests
 * 3. Maintain requirement traceability
 * 4. Test in production-like environment
 * 5. Cover all test types (performance, security, etc.)
 * 6. Document and track defects
 * 7. Define clear entry and exit criteria
 * 8. Involve stakeholders in test planning
 * 9. Automate regression tests
 * 10. Review test results and improve continuously
 */
