/**
 * Five Whys Analysis - Root Cause Investigation Technique
 *
 * Five Whys analysis is a problem-solving technique that involves asking
 * "why" five times to identify the root cause of a problem. It drills down
 * from symptoms to underlying causes, enabling development of effective
 * solutions rather than just treating symptoms.
 *
 * Key Concepts:
 * - Iterative questioning to find root cause
 * - Move from symptoms to underlying issues
 * - Team-based collaborative analysis
 * - Prevent problem recurrence
 */

/**
 * Problem represents an issue to analyze with Five Whys.
 * Contains the problem statement and context.
 */
class Problem {
    constructor(options) {
        this.id = options.id || `prob-${Date.now()}`;
        this.title = options.title;
        this.description = options.description;
        this.severity = options.severity || 'medium';
        this.category = options.category;
        this.reportedBy = options.reportedBy;
        this.reportedAt = options.reportedAt || new Date();
        this.context = options.context || {};
    }

    /**
     * Gets problem summary
     * @returns {Object} Problem summary
     */
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            severity: this.severity,
            category: this.category
        };
    }
}

/**
 * WhyQuestion represents a single "why" in the analysis chain.
 * Contains the question and answer at each level.
 */
class WhyQuestion {
    constructor(level, question, answer) {
        this.level = level;
        this.question = question;
        this.answer = answer;
        this.evidence = [];
        this.notes = [];
        this.answeredAt = new Date();
    }

    /**
     * Adds supporting evidence
     * @param {string} evidence - Evidence description
     */
    addEvidence(evidence) {
        this.evidence.push({
            description: evidence,
            addedAt: new Date()
        });
    }

    /**
     * Adds a note to the question
     * @param {string} note - Note content
     */
    addNote(note) {
        this.notes.push({
            content: note,
            addedAt: new Date()
        });
    }

    /**
     * Formats the question/answer pair
     * @returns {string} Formatted output
     */
    format() {
        return `Why #${this.level}: ${this.question}\nAnswer: ${this.answer}`;
    }
}

/**
 * FiveWhysAnalysis conducts the root cause analysis.
 * Manages the chain of why questions.
 */
class FiveWhysAnalysis {
    constructor(problem) {
        this.problem = problem;
        this.whyChain = [];
        this.rootCause = null;
        this.solutions = [];
        this.status = 'in_progress';
        this.createdAt = new Date();
        this.participants = [];
    }

    /**
     * Adds a participant to the analysis
     * @param {string} name - Participant name
     * @param {string} role - Participant role
     */
    addParticipant(name, role) {
        this.participants.push({ name, role, addedAt: new Date() });
    }

    /**
     * Asks the next why question
     * @param {string} answer - Answer to the current level
     * @returns {WhyQuestion} The new why question
     */
    askWhy(answer) {
        const level = this.whyChain.length + 1;

        let question;
        if (level === 1) {
            question = `Why did "${this.problem.title}" occur?`;
        } else {
            const previousAnswer = this.whyChain[level - 2].answer;
            question = `Why did "${previousAnswer}" happen?`;
        }

        const whyQuestion = new WhyQuestion(level, question, answer);
        this.whyChain.push(whyQuestion);

        console.log(`\n${whyQuestion.format()}`);

        return whyQuestion;
    }

    /**
     * Sets the root cause from the analysis
     * @param {string} cause - Root cause description
     */
    setRootCause(cause) {
        this.rootCause = {
            description: cause,
            identifiedAt: new Date(),
            whyLevel: this.whyChain.length
        };
        console.log(`\nRoot Cause Identified: ${cause}`);
    }

    /**
     * Adds a proposed solution
     * @param {Object} solution - Solution details
     */
    addSolution(solution) {
        this.solutions.push({
            description: solution.description,
            owner: solution.owner,
            priority: solution.priority || 'medium',
            dueDate: solution.dueDate,
            status: 'proposed',
            addedAt: new Date()
        });
    }

    /**
     * Completes the analysis
     * @returns {Object} Analysis summary
     */
    complete() {
        if (!this.rootCause) {
            throw new Error('Cannot complete analysis without identifying root cause');
        }

        this.status = 'complete';
        this.completedAt = new Date();

        return this.getSummary();
    }

    /**
     * Gets analysis summary
     * @returns {Object} Summary
     */
    getSummary() {
        return {
            problem: this.problem.getSummary(),
            whyLevels: this.whyChain.length,
            rootCause: this.rootCause?.description,
            solutionCount: this.solutions.length,
            status: this.status,
            participants: this.participants.map(p => p.name)
        };
    }

    /**
     * Generates full analysis report
     * @returns {string} Report text
     */
    generateReport() {
        let report = `\n${'='.repeat(60)}\n`;
        report += `FIVE WHYS ANALYSIS REPORT\n`;
        report += `${'='.repeat(60)}\n\n`;

        report += `PROBLEM: ${this.problem.title}\n`;
        report += `Description: ${this.problem.description}\n`;
        report += `Severity: ${this.problem.severity}\n\n`;

        report += `${'─'.repeat(40)}\n`;
        report += `ANALYSIS CHAIN:\n`;
        report += `${'─'.repeat(40)}\n`;

        for (const why of this.whyChain) {
            report += `\n${why.format()}\n`;
            if (why.evidence.length > 0) {
                report += `  Evidence: ${why.evidence.map(e => e.description).join(', ')}\n`;
            }
        }

        report += `\n${'─'.repeat(40)}\n`;
        report += `ROOT CAUSE:\n`;
        report += `${'─'.repeat(40)}\n`;
        report += `${this.rootCause?.description || 'Not yet identified'}\n`;

        if (this.solutions.length > 0) {
            report += `\n${'─'.repeat(40)}\n`;
            report += `PROPOSED SOLUTIONS:\n`;
            report += `${'─'.repeat(40)}\n`;
            for (const solution of this.solutions) {
                report += `• ${solution.description} (${solution.priority} priority)\n`;
                report += `  Owner: ${solution.owner}\n`;
            }
        }

        report += `\n${'='.repeat(60)}\n`;

        return report;
    }
}

/**
 * FiveWhysFacilitator guides teams through the analysis process.
 * Provides prompts and validates the analysis quality.
 */
class FiveWhysFacilitator {
    constructor() {
        this.analysisHistory = [];
        this.tips = this.getAnalysisTips();
    }

    /**
     * Gets tips for effective analysis
     * @returns {Array} Tips
     */
    getAnalysisTips() {
        return [
            'Focus on process failures, not people',
            'Base answers on facts and evidence',
            'Don\'t stop at the first convenient answer',
            'Involve people closest to the problem',
            'Ask "why" until you reach an actionable root cause',
            'Document evidence for each answer',
            'Consider multiple branches if needed'
        ];
    }

    /**
     * Starts a new analysis session
     * @param {Problem} problem - Problem to analyze
     * @returns {FiveWhysAnalysis} New analysis
     */
    startAnalysis(problem) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Starting Five Whys Analysis`);
        console.log(`Problem: ${problem.title}`);
        console.log(`${'='.repeat(50)}`);

        const analysis = new FiveWhysAnalysis(problem);
        this.analysisHistory.push(analysis);

        console.log('\nTips for effective analysis:');
        this.tips.slice(0, 3).forEach((tip, i) => {
            console.log(`  ${i + 1}. ${tip}`);
        });

        return analysis;
    }

    /**
     * Validates analysis quality
     * @param {FiveWhysAnalysis} analysis - Analysis to validate
     * @returns {Object} Validation result
     */
    validateAnalysis(analysis) {
        const issues = [];

        if (analysis.whyChain.length < 3) {
            issues.push('Analysis may be too shallow - consider more why levels');
        }

        if (analysis.whyChain.length > 7) {
            issues.push('Analysis may be too deep - ensure each level adds value');
        }

        const hasEvidence = analysis.whyChain.some(w => w.evidence.length > 0);
        if (!hasEvidence) {
            issues.push('No evidence documented - add supporting data');
        }

        if (!analysis.rootCause) {
            issues.push('Root cause not identified');
        }

        if (analysis.solutions.length === 0 && analysis.rootCause) {
            issues.push('No solutions proposed for root cause');
        }

        return {
            valid: issues.length === 0,
            issues,
            quality: this.calculateQuality(analysis)
        };
    }

    /**
     * Calculates analysis quality score
     * @param {FiveWhysAnalysis} analysis - Analysis to score
     * @returns {number} Quality score 0-100
     */
    calculateQuality(analysis) {
        let score = 0;

        // Appropriate depth (3-5 levels)
        if (analysis.whyChain.length >= 3 && analysis.whyChain.length <= 5) {
            score += 25;
        } else if (analysis.whyChain.length >= 2) {
            score += 15;
        }

        // Has evidence
        const evidenceCount = analysis.whyChain.reduce((sum, w) => sum + w.evidence.length, 0);
        score += Math.min(25, evidenceCount * 5);

        // Has root cause
        if (analysis.rootCause) {
            score += 25;
        }

        // Has solutions
        if (analysis.solutions.length > 0) {
            score += 15;
        }

        // Has participants
        if (analysis.participants.length > 1) {
            score += 10;
        }

        return Math.min(100, score);
    }

    /**
     * Gets suggestions for next steps
     * @param {FiveWhysAnalysis} analysis - Current analysis
     * @returns {Array} Suggestions
     */
    getSuggestions(analysis) {
        const suggestions = [];
        const validation = this.validateAnalysis(analysis);

        for (const issue of validation.issues) {
            suggestions.push({
                issue,
                action: this.getActionForIssue(issue)
            });
        }

        return suggestions;
    }

    /**
     * Gets recommended action for an issue
     * @param {string} issue - Issue description
     * @returns {string} Recommended action
     */
    getActionForIssue(issue) {
        const actions = {
            'Analysis may be too shallow': 'Ask additional why questions to dig deeper',
            'No evidence documented': 'Add data, logs, or observations as evidence',
            'Root cause not identified': 'Continue asking why until you reach an actionable cause',
            'No solutions proposed': 'Brainstorm solutions that address the root cause'
        };

        for (const [key, action] of Object.entries(actions)) {
            if (issue.includes(key)) return action;
        }

        return 'Review the analysis with the team';
    }
}

/**
 * RootCauseCategory categorizes types of root causes.
 * Helps identify patterns across multiple analyses.
 */
class RootCauseCategory {
    static categories = {
        process: 'Process or procedure issue',
        training: 'Training or knowledge gap',
        communication: 'Communication breakdown',
        tooling: 'Tool or system limitation',
        design: 'Design or architecture flaw',
        resource: 'Resource constraint',
        external: 'External factor',
        human: 'Human error'
    };

    /**
     * Categorizes a root cause
     * @param {string} rootCause - Root cause description
     * @returns {string} Category
     */
    static categorize(rootCause) {
        const lower = rootCause.toLowerCase();

        if (lower.includes('process') || lower.includes('procedure')) {
            return 'process';
        }
        if (lower.includes('training') || lower.includes('knowledge')) {
            return 'training';
        }
        if (lower.includes('communication') || lower.includes('unclear')) {
            return 'communication';
        }
        if (lower.includes('tool') || lower.includes('system')) {
            return 'tooling';
        }
        if (lower.includes('design') || lower.includes('architecture')) {
            return 'design';
        }

        return 'process';
    }

    /**
     * Gets all categories
     * @returns {Object} Categories
     */
    static getAll() {
        return this.categories;
    }
}

// Demonstration
console.log('=== Five Whys Analysis Demo ===');

// Create a problem
const problem = new Problem({
    title: 'Production deployment failed',
    description: 'The latest release failed to deploy to production, causing 2-hour downtime',
    severity: 'high',
    category: 'deployment',
    reportedBy: 'Operations Team'
});

// Start analysis
const facilitator = new FiveWhysFacilitator();
const analysis = facilitator.startAnalysis(problem);

// Add participants
analysis.addParticipant('Alice', 'Developer');
analysis.addParticipant('Bob', 'DevOps Engineer');
analysis.addParticipant('Carol', 'QA Lead');

// Conduct Five Whys
const why1 = analysis.askWhy('The deployment script failed with a database connection error');
why1.addEvidence('Error log: "Connection refused on port 5432"');

const why2 = analysis.askWhy('The database credentials in the deployment config were incorrect');
why2.addEvidence('Config file showed old credentials');

const why3 = analysis.askWhy('The credentials were updated in staging but not propagated to production config');
why3.addEvidence('Staging config had new credentials since 2 weeks ago');

const why4 = analysis.askWhy('There is no automated process to sync configuration between environments');
why4.addNote('Manual process relies on developer memory');

const why5 = analysis.askWhy('Configuration management was deprioritized during initial setup');

// Set root cause
analysis.setRootCause('Lack of centralized configuration management system for environment-specific settings');

// Propose solutions
analysis.addSolution({
    description: 'Implement centralized config management (e.g., HashiCorp Vault)',
    owner: 'DevOps Team',
    priority: 'high'
});

analysis.addSolution({
    description: 'Add pre-deployment config validation check',
    owner: 'Alice',
    priority: 'medium'
});

// Validate and complete
const validation = facilitator.validateAnalysis(analysis);
console.log('\nValidation:', validation);

// Generate report
console.log(analysis.generateReport());

// Categorize root cause
const category = RootCauseCategory.categorize(analysis.rootCause.description);
console.log(`Root Cause Category: ${category} - ${RootCauseCategory.categories[category]}`);

/**
 * Best Practices for Five Whys Analysis:
 *
 * 1. Focus on systems and processes, not individuals
 * 2. Base answers on facts and evidence, not assumptions
 * 3. Don't stop at obvious answers - dig deeper
 * 4. Involve people closest to the problem
 * 5. Ask "why" until you reach an actionable root cause
 * 6. Document evidence and reasoning at each level
 * 7. Consider multiple root cause branches if needed
 * 8. Propose solutions that address the root cause
 * 9. Follow up on solution implementation
 * 10. Review patterns across multiple analyses
 */
