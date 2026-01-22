/**
 * Chesterton's Fence - Understanding Before Changing
 *
 * Chesterton's fence is a principle of cautionary conservatism: before changing
 * or removing something, first understand why it exists. Even if a practice
 * seems pointless, it likely served a purpose that we may not be aware of.
 *
 * Key Concepts:
 * - Investigate before modifying: Understand the original purpose
 * - Avoid unintended consequences: Changes without understanding risk breaking things
 * - Historical context matters: Past decisions had reasons
 * - Document rationale: Make future changes easier by explaining current state
 */

/**
 * ChangeProposal represents a suggested modification to code or system.
 * Requires justification and analysis of existing behavior before approval.
 */
class ChangeProposal {
    constructor(options) {
        this.id = options.id || this.generateId();
        this.title = options.title;
        this.proposer = options.proposer;
        this.targetComponent = options.targetComponent;
        this.proposedChange = options.proposedChange;
        this.status = 'pending';
        this.existingBehaviorAnalysis = null;
        this.riskAssessment = null;
        this.approvalHistory = [];
    }

    /**
     * Generates a unique proposal ID
     * @returns {string} Unique identifier
     */
    generateId() {
        return `CP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Documents the analysis of existing behavior
     * @param {Object} analysis - Analysis details
     */
    documentExistingBehavior(analysis) {
        this.existingBehaviorAnalysis = {
            originalPurpose: analysis.originalPurpose,
            currentUsage: analysis.currentUsage,
            dependencies: analysis.dependencies,
            historicalContext: analysis.historicalContext,
            documentedRationale: analysis.documentedRationale,
            analyzedBy: analysis.analyzedBy,
            analysisDate: new Date().toISOString()
        };

        console.log(`Analysis documented for: ${this.title}`);
        return this;
    }

    /**
     * Checks if the fence principle has been satisfied
     * @returns {Object} Validation result
     */
    validateChestertonsFence() {
        const checks = {
            hasExistingAnalysis: this.existingBehaviorAnalysis !== null,
            understandsOriginalPurpose: this.existingBehaviorAnalysis?.originalPurpose?.length > 0,
            hasHistoricalContext: this.existingBehaviorAnalysis?.historicalContext?.length > 0,
            identifiedDependencies: this.existingBehaviorAnalysis?.dependencies?.length >= 0,
            hasRiskAssessment: this.riskAssessment !== null
        };

        const passed = Object.values(checks).every(v => v);

        console.log(`\nChesterton's Fence Validation for: ${this.title}`);
        console.log(`Status: ${passed ? 'PASSED' : 'FAILED'}`);
        Object.entries(checks).forEach(([check, result]) => {
            console.log(`  ${result ? '✓' : '✗'} ${check}`);
        });

        return { passed, checks };
    }
}

/**
 * CodeArchaeologist helps understand the history and purpose of existing code.
 * Investigates git history, documentation, and code patterns.
 */
class CodeArchaeologist {
    constructor(repository) {
        this.repository = repository;
        this.findings = [];
    }

    /**
     * Investigates the history of a code component
     * @param {string} component - Component to investigate
     * @returns {Object} Historical findings
     */
    investigate(component) {
        console.log(`\nInvestigating: ${component}`);
        console.log('Searching through history...');

        const findings = {
            component,
            commitHistory: this.getCommitHistory(component),
            authors: this.getAuthors(component),
            relatedIssues: this.findRelatedIssues(component),
            codeComments: this.extractComments(component),
            documentationRefs: this.findDocumentation(component),
            testCoverage: this.analyzeTestCoverage(component)
        };

        this.findings.push(findings);
        return findings;
    }

    /**
     * Gets commit history for a component (simulated)
     * @param {string} component - Component path
     * @returns {Array} Commit history
     */
    getCommitHistory(component) {
        // Simulated git log
        return [
            {
                hash: 'abc123',
                date: '2023-01-15',
                author: 'developer@example.com',
                message: 'Add validation to prevent SQL injection'
            },
            {
                hash: 'def456',
                date: '2022-08-20',
                author: 'senior@example.com',
                message: 'Initial implementation with security review'
            }
        ];
    }

    /**
     * Gets unique authors who modified the component
     * @param {string} component - Component path
     * @returns {Array} List of authors
     */
    getAuthors(component) {
        const commits = this.getCommitHistory(component);
        return [...new Set(commits.map(c => c.author))];
    }

    /**
     * Finds related issues or tickets (simulated)
     * @param {string} component - Component path
     * @returns {Array} Related issues
     */
    findRelatedIssues(component) {
        return [
            { id: 'SEC-123', title: 'Security audit findings', status: 'resolved' },
            { id: 'BUG-456', title: 'Input validation bypass', status: 'resolved' }
        ];
    }

    /**
     * Extracts meaningful comments from code
     * @param {string} component - Component path
     * @returns {Array} Code comments
     */
    extractComments(component) {
        return [
            { line: 42, comment: 'IMPORTANT: This check prevents XSS attacks' },
            { line: 78, comment: 'DO NOT REMOVE: Required for backward compatibility' }
        ];
    }

    /**
     * Finds related documentation
     * @param {string} component - Component path
     * @returns {Array} Documentation references
     */
    findDocumentation(component) {
        return [
            { type: 'ADR', path: 'docs/adr/0012-input-validation.md' },
            { type: 'README', path: 'src/validation/README.md' }
        ];
    }

    /**
     * Analyzes test coverage for the component
     * @param {string} component - Component path
     * @returns {Object} Test coverage info
     */
    analyzeTestCoverage(component) {
        return {
            hasTests: true,
            testFiles: ['validation.test.js', 'security.test.js'],
            coverage: '85%'
        };
    }

    /**
     * Generates a comprehensive report
     * @returns {string} Investigation report
     */
    generateReport() {
        let report = '\n=== Code Archaeology Report ===\n';

        this.findings.forEach(finding => {
            report += `\nComponent: ${finding.component}\n`;
            report += `Authors: ${finding.authors.join(', ')}\n`;
            report += `Related Issues: ${finding.relatedIssues.map(i => i.id).join(', ')}\n`;
            report += `Documentation: ${finding.documentationRefs.map(d => d.path).join(', ')}\n`;
            report += `Test Coverage: ${finding.testCoverage.coverage}\n`;
            report += '\nKey Comments Found:\n';
            finding.codeComments.forEach(c => {
                report += `  Line ${c.line}: "${c.comment}"\n`;
            });
        });

        return report;
    }
}

/**
 * DecisionRecord documents the rationale behind code decisions.
 * Helps future developers understand why things exist.
 */
class DecisionRecord {
    constructor(options) {
        this.id = options.id;
        this.title = options.title;
        this.date = options.date || new Date().toISOString();
        this.status = options.status || 'proposed';
        this.context = options.context;
        this.decision = options.decision;
        this.consequences = options.consequences || [];
        this.alternatives = options.alternatives || [];
    }

    /**
     * Converts the decision record to markdown format (ADR style)
     * @returns {string} Markdown formatted ADR
     */
    toMarkdown() {
        let md = `# ${this.id}: ${this.title}\n\n`;
        md += `**Date:** ${this.date}\n`;
        md += `**Status:** ${this.status}\n\n`;
        md += `## Context\n\n${this.context}\n\n`;
        md += `## Decision\n\n${this.decision}\n\n`;

        if (this.alternatives.length > 0) {
            md += `## Alternatives Considered\n\n`;
            this.alternatives.forEach((alt, i) => {
                md += `${i + 1}. ${alt.option}: ${alt.reason}\n`;
            });
            md += '\n';
        }

        if (this.consequences.length > 0) {
            md += `## Consequences\n\n`;
            this.consequences.forEach(c => {
                md += `- ${c}\n`;
            });
        }

        return md;
    }
}

/**
 * FenceValidator ensures changes respect the Chesterton's fence principle.
 * Integrates into code review and change management processes.
 */
class FenceValidator {
    constructor() {
        this.requiredChecks = [
            'understand_original_purpose',
            'document_historical_context',
            'identify_dependencies',
            'assess_risks',
            'propose_migration_path'
        ];
    }

    /**
     * Validates a change proposal against the fence principle
     * @param {ChangeProposal} proposal - The change proposal
     * @returns {Object} Validation result
     */
    validate(proposal) {
        console.log(`\nValidating change proposal: ${proposal.title}`);

        const results = {
            proposal: proposal.id,
            checks: {},
            passed: false,
            recommendations: []
        };

        // Check for existing behavior analysis
        if (!proposal.existingBehaviorAnalysis) {
            results.checks.understand_original_purpose = false;
            results.recommendations.push(
                'Investigate and document the original purpose of the component'
            );
        } else {
            results.checks.understand_original_purpose =
                proposal.existingBehaviorAnalysis.originalPurpose?.length > 0;
        }

        // Check for historical context
        results.checks.document_historical_context =
            proposal.existingBehaviorAnalysis?.historicalContext?.length > 0;
        if (!results.checks.document_historical_context) {
            results.recommendations.push(
                'Research git history and related issues for historical context'
            );
        }

        // Check for dependency identification
        results.checks.identify_dependencies =
            proposal.existingBehaviorAnalysis?.dependencies !== undefined;
        if (!results.checks.identify_dependencies) {
            results.recommendations.push(
                'Identify all components that depend on this functionality'
            );
        }

        // Check for risk assessment
        results.checks.assess_risks = proposal.riskAssessment !== null;
        if (!results.checks.assess_risks) {
            results.recommendations.push(
                'Perform and document a risk assessment for this change'
            );
        }

        // Determine overall pass/fail
        results.passed = Object.values(results.checks).every(v => v);

        this.logResults(results);
        return results;
    }

    /**
     * Logs validation results
     * @param {Object} results - Validation results
     */
    logResults(results) {
        console.log(`\nValidation Results: ${results.passed ? 'PASSED' : 'FAILED'}`);
        Object.entries(results.checks).forEach(([check, passed]) => {
            console.log(`  ${passed ? '✓' : '✗'} ${check}`);
        });

        if (results.recommendations.length > 0) {
            console.log('\nRecommendations:');
            results.recommendations.forEach((rec, i) => {
                console.log(`  ${i + 1}. ${rec}`);
            });
        }
    }
}

/**
 * LegacyCodeGuardian protects legacy code from hasty modifications.
 * Enforces investigation before modification policies.
 */
class LegacyCodeGuardian {
    constructor() {
        this.protectedPaths = [];
        this.modificationLog = [];
    }

    /**
     * Marks a code path as protected (requires investigation before changes)
     * @param {string} path - Code path to protect
     * @param {string} reason - Reason for protection
     */
    protect(path, reason) {
        this.protectedPaths.push({
            path,
            reason,
            protectedAt: new Date().toISOString()
        });
        console.log(`Protected: ${path}`);
        console.log(`  Reason: ${reason}`);
    }

    /**
     * Checks if a path is protected
     * @param {string} path - Path to check
     * @returns {Object|null} Protection info or null
     */
    isProtected(path) {
        return this.protectedPaths.find(p =>
            path.startsWith(p.path) || p.path.startsWith(path)
        );
    }

    /**
     * Requests permission to modify protected code
     * @param {string} path - Path to modify
     * @param {Object} proposal - Change proposal with investigation
     * @returns {Object} Permission result
     */
    requestModificationPermission(path, proposal) {
        const protection = this.isProtected(path);

        if (!protection) {
            return { allowed: true, message: 'Path is not protected' };
        }

        console.log(`\nModification request for protected path: ${path}`);
        console.log(`Protection reason: ${protection.reason}`);

        // Validate that Chesterton's fence principle was followed
        const validation = proposal.validateChestertonsFence();

        if (validation.passed) {
            this.modificationLog.push({
                path,
                proposal: proposal.id,
                approvedAt: new Date().toISOString()
            });
            return {
                allowed: true,
                message: 'Modification approved - investigation complete'
            };
        }

        return {
            allowed: false,
            message: 'Investigation incomplete - cannot modify protected code',
            missingChecks: Object.entries(validation.checks)
                .filter(([_, passed]) => !passed)
                .map(([check]) => check)
        };
    }
}

// Demonstration
console.log("=== Chesterton's Fence Demo ===\n");

// Scenario: Developer wants to remove "unnecessary" validation code
const proposal = new ChangeProposal({
    title: 'Remove redundant input validation',
    proposer: 'new.developer@example.com',
    targetComponent: 'src/api/userInput.js',
    proposedChange: 'Remove the validateInput() function as it seems redundant'
});

console.log(`Proposal: ${proposal.title}`);
console.log(`Target: ${proposal.targetComponent}`);

// First, investigate using Code Archaeologist
const archaeologist = new CodeArchaeologist('main-repo');
const findings = archaeologist.investigate(proposal.targetComponent);

console.log(archaeologist.generateReport());

// Document findings in the proposal
proposal.documentExistingBehavior({
    originalPurpose: 'Prevent SQL injection and XSS attacks',
    currentUsage: 'Called on all user-submitted form data',
    dependencies: ['UserController', 'FormHandler', 'APIGateway'],
    historicalContext: 'Added after security audit in 2022 (SEC-123)',
    documentedRationale: 'See ADR-0012 for security requirements',
    analyzedBy: 'senior.developer@example.com'
});

proposal.riskAssessment = {
    securityImpact: 'HIGH - removes security controls',
    recommendation: 'DO NOT REMOVE - critical security function'
};

// Validate the proposal
const validator = new FenceValidator();
validator.validate(proposal);

// Create a decision record documenting the investigation
const adr = new DecisionRecord({
    id: 'ADR-0045',
    title: 'Keep validateInput() function',
    status: 'accepted',
    context: 'Developer proposed removing validateInput() as it appeared redundant',
    decision: 'After investigation, we found this function is critical for security. It will be kept.',
    consequences: [
        'Security controls remain in place',
        'Added documentation explaining the function purpose',
        'Added code comment warning against removal'
    ],
    alternatives: [
        { option: 'Remove function', reason: 'Rejected - creates security vulnerability' },
        { option: 'Refactor function', reason: 'Considered for future improvement' }
    ]
});

console.log('\n' + adr.toMarkdown());

/**
 * Best Practices for Chesterton's Fence:
 *
 * 1. Never remove code without understanding why it exists
 * 2. Check git history and commit messages for context
 * 3. Look for related issues, tickets, or ADRs
 * 4. Read code comments carefully - they may contain warnings
 * 5. Identify all dependencies before making changes
 * 6. Consult with original authors when possible
 * 7. Document your investigation findings
 * 8. Create ADRs for significant architectural decisions
 * 9. Add explanatory comments when code purpose isn't obvious
 * 10. Protect critical code paths with required investigation policies
 */
