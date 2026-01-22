/**
 * Refactoring - Improving Code Design Without Changing Functionality
 *
 * Refactoring is the process of improving the design of existing code without
 * changing its functionality. It involves making code more readable, maintainable,
 * and extensible by restructuring it in a way that is easier to understand and
 * modify. The goal is better code quality while preserving behavior.
 *
 * Key Concepts:
 * - Improve readability and maintainability
 * - Reduce complexity and duplication
 * - Small, incremental improvements
 * - Tests ensure behavior preservation
 */

/**
 * RefactoringTechnique represents a code improvement pattern.
 */
class RefactoringTechnique {
    static techniques = {
        rename: {
            name: 'Rename',
            description: 'Change names to better reflect purpose',
            applies: ['variables', 'methods', 'classes', 'parameters'],
            example: {
                before: 'const d = new Date();',
                after: 'const currentDate = new Date();'
            },
            benefits: ['Improved readability', 'Self-documenting code']
        },
        extractMethod: {
            name: 'Extract Method',
            description: 'Break large methods into smaller, focused ones',
            applies: ['long methods', 'repeated code blocks', 'complex logic'],
            example: {
                before: '// 50 lines of mixed responsibilities',
                after: 'validateInput(); processData(); formatOutput();'
            },
            benefits: ['Single responsibility', 'Reusability', 'Testability']
        },
        extractVariable: {
            name: 'Extract Variable',
            description: 'Replace complex expressions with named variables',
            applies: ['complex conditions', 'repeated expressions', 'magic values'],
            example: {
                before: 'if (user.age >= 18 && user.hasVerifiedEmail && user.creditScore > 700)',
                after: 'const isEligible = user.age >= 18 && user.hasVerifiedEmail && user.creditScore > 700; if (isEligible)'
            },
            benefits: ['Clarity', 'Debuggability', 'Documentation']
        },
        inlineVariable: {
            name: 'Inline Variable',
            description: 'Replace variable with its value when variable adds no clarity',
            applies: ['trivial assignments', 'single-use variables', 'redundant names'],
            example: {
                before: 'const result = getValue(); return result;',
                after: 'return getValue();'
            },
            benefits: ['Conciseness', 'Reduced indirection']
        },
        replaceConditional: {
            name: 'Replace Conditional with Polymorphism',
            description: 'Use object-oriented patterns instead of conditionals',
            applies: ['type-based switches', 'repeated conditionals', 'strategy variations'],
            example: {
                before: 'switch (type) { case "A": ...; case "B": ...; }',
                after: 'strategy.execute(); // polymorphic dispatch'
            },
            benefits: ['Open/closed principle', 'Extensibility', 'Reduced complexity']
        },
        extractClass: {
            name: 'Extract Class',
            description: 'Split large classes into cohesive smaller ones',
            applies: ['god classes', 'mixed responsibilities', 'large interfaces'],
            example: {
                before: 'class User { // handles auth, profile, billing }',
                after: 'class User {}; class UserAuth {}; class UserBilling {};'
            },
            benefits: ['Single responsibility', 'Cohesion', 'Maintainability']
        },
        moveMethod: {
            name: 'Move Method',
            description: 'Move method to class that uses it most',
            applies: ['feature envy', 'misplaced behavior', 'coupling'],
            example: {
                before: 'class A { calculate(b) { return b.x + b.y; } }',
                after: 'class B { calculate() { return this.x + this.y; } }'
            },
            benefits: ['Better cohesion', 'Reduced coupling']
        },
        introduceParameter: {
            name: 'Introduce Parameter Object',
            description: 'Group related parameters into an object',
            applies: ['many parameters', 'repeated parameter groups', 'data clumps'],
            example: {
                before: 'createUser(name, email, age, city, country)',
                after: 'createUser(userData)'
            },
            benefits: ['Cleaner interfaces', 'Encapsulation', 'Flexibility']
        }
    };

    /**
     * Gets a technique by name
     * @param {string} name - Technique name
     * @returns {Object} Technique details
     */
    static getTechnique(name) {
        return this.techniques[name];
    }

    /**
     * Gets all techniques
     * @returns {Array} All techniques
     */
    static getAllTechniques() {
        return Object.entries(this.techniques).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }

    /**
     * Suggests techniques for code smell
     * @param {string} smell - Code smell type
     * @returns {Array} Suggested techniques
     */
    static suggestForSmell(smell) {
        const suggestions = {
            'long method': ['extractMethod', 'extractVariable'],
            'large class': ['extractClass', 'moveMethod'],
            'long parameter list': ['introduceParameter'],
            'duplicate code': ['extractMethod', 'extractClass'],
            'feature envy': ['moveMethod'],
            'unclear naming': ['rename'],
            'complex conditional': ['extractVariable', 'replaceConditional']
        };
        return suggestions[smell] || [];
    }
}

/**
 * CodeSmellDetector identifies potential refactoring opportunities.
 */
class CodeSmellDetector {
    /**
     * Analyzes code for smells
     * @param {Object} codeMetrics - Code metrics
     * @returns {Array} Detected smells
     */
    static analyze(codeMetrics) {
        const smells = [];

        if (codeMetrics.methodLength > 20) {
            smells.push({
                smell: 'Long Method',
                severity: codeMetrics.methodLength > 50 ? 'high' : 'medium',
                location: codeMetrics.methodName,
                suggestion: 'Extract smaller methods with single responsibilities'
            });
        }

        if (codeMetrics.classSize > 300) {
            smells.push({
                smell: 'Large Class',
                severity: codeMetrics.classSize > 500 ? 'high' : 'medium',
                location: codeMetrics.className,
                suggestion: 'Extract cohesive classes with focused responsibilities'
            });
        }

        if (codeMetrics.parameterCount > 4) {
            smells.push({
                smell: 'Long Parameter List',
                severity: codeMetrics.parameterCount > 6 ? 'high' : 'medium',
                location: codeMetrics.methodName,
                suggestion: 'Introduce parameter object or builder pattern'
            });
        }

        if (codeMetrics.cyclomaticComplexity > 10) {
            smells.push({
                smell: 'High Complexity',
                severity: codeMetrics.cyclomaticComplexity > 20 ? 'high' : 'medium',
                location: codeMetrics.methodName,
                suggestion: 'Simplify conditionals, extract methods, use polymorphism'
            });
        }

        if (codeMetrics.nestingDepth > 3) {
            smells.push({
                smell: 'Deep Nesting',
                severity: codeMetrics.nestingDepth > 5 ? 'high' : 'medium',
                location: codeMetrics.methodName,
                suggestion: 'Use early returns, extract methods, flatten structure'
            });
        }

        if (codeMetrics.duplicateBlocks > 0) {
            smells.push({
                smell: 'Duplicate Code',
                severity: codeMetrics.duplicateBlocks > 3 ? 'high' : 'medium',
                location: 'Multiple locations',
                suggestion: 'Extract common functionality into shared methods'
            });
        }

        return {
            smells,
            totalSmells: smells.length,
            highSeverity: smells.filter(s => s.severity === 'high').length,
            recommendation: smells.length > 5 ? 'Significant refactoring needed' :
                smells.length > 0 ? 'Some refactoring recommended' : 'Code looks clean'
        };
    }
}

/**
 * RefactoringSession tracks a refactoring effort.
 */
class RefactoringSession {
    constructor(options) {
        this.id = options.id || `REF-${Date.now()}`;
        this.target = options.target;
        this.reason = options.reason;
        this.startedAt = new Date();
        this.steps = [];
        this.tests = {
            beforeCount: 0,
            afterCount: 0,
            allPassing: false
        };
    }

    /**
     * Records test status before refactoring
     * @param {Object} testResults - Test results
     */
    recordTestsBefore(testResults) {
        this.tests.beforeCount = testResults.total;
        this.tests.beforePassing = testResults.passing;
        this.tests.allPassing = testResults.passing === testResults.total;
    }

    /**
     * Adds a refactoring step
     * @param {Object} step - Step details
     */
    addStep(step) {
        this.steps.push({
            number: this.steps.length + 1,
            technique: step.technique,
            description: step.description,
            filesChanged: step.filesChanged || [],
            timestamp: new Date()
        });
    }

    /**
     * Records test status after refactoring
     * @param {Object} testResults - Test results
     */
    recordTestsAfter(testResults) {
        this.tests.afterCount = testResults.total;
        this.tests.afterPassing = testResults.passing;
        this.tests.stillPassing = testResults.passing === testResults.total;
    }

    /**
     * Completes the session
     * @returns {Object} Session summary
     */
    complete() {
        this.completedAt = new Date();

        return {
            id: this.id,
            target: this.target,
            reason: this.reason,
            duration: this.completedAt - this.startedAt,
            stepsCount: this.steps.length,
            steps: this.steps,
            testsStatus: {
                before: `${this.tests.beforePassing}/${this.tests.beforeCount}`,
                after: `${this.tests.afterPassing}/${this.tests.afterCount}`,
                behaviorPreserved: this.tests.stillPassing
            },
            success: this.tests.stillPassing
        };
    }
}

/**
 * RefactoringPlan creates a structured plan for refactoring.
 */
class RefactoringPlan {
    constructor(options) {
        this.name = options.name;
        this.goal = options.goal;
        this.scope = options.scope;
        this.phases = [];
        this.risks = [];
    }

    /**
     * Adds a phase to the plan
     * @param {Object} phase - Phase details
     */
    addPhase(phase) {
        this.phases.push({
            number: this.phases.length + 1,
            name: phase.name,
            tasks: phase.tasks,
            deliverables: phase.deliverables,
            verificationCriteria: phase.verificationCriteria
        });
    }

    /**
     * Adds a risk to consider
     * @param {Object} risk - Risk details
     */
    addRisk(risk) {
        this.risks.push({
            description: risk.description,
            likelihood: risk.likelihood,
            impact: risk.impact,
            mitigation: risk.mitigation
        });
    }

    /**
     * Gets the complete plan
     * @returns {Object} Plan details
     */
    getPlan() {
        return {
            name: this.name,
            goal: this.goal,
            scope: this.scope,
            phases: this.phases,
            risks: this.risks,
            totalTasks: this.phases.reduce((sum, p) => sum + p.tasks.length, 0),
            recommendation: 'Execute phases sequentially, run tests after each phase'
        };
    }
}

/**
 * SafeRefactoring provides patterns for safe refactoring.
 */
class SafeRefactoring {
    /**
     * Gets safe refactoring workflow
     * @returns {Array} Workflow steps
     */
    static getWorkflow() {
        return [
            {
                step: 1,
                name: 'Ensure Test Coverage',
                description: 'Verify existing tests cover the code to be refactored',
                actions: [
                    'Run existing tests',
                    'Check coverage metrics',
                    'Add tests for uncovered paths',
                    'Document expected behavior'
                ]
            },
            {
                step: 2,
                name: 'Make Small Changes',
                description: 'Refactor in small, incremental steps',
                actions: [
                    'Apply one technique at a time',
                    'Keep changes reversible',
                    'Commit after each successful step'
                ]
            },
            {
                step: 3,
                name: 'Run Tests Frequently',
                description: 'Verify behavior after each change',
                actions: [
                    'Run tests after each refactoring step',
                    'Fix any failures immediately',
                    'Revert if tests fail and cause is unclear'
                ]
            },
            {
                step: 4,
                name: 'Review and Document',
                description: 'Verify improvements and update documentation',
                actions: [
                    'Review code changes',
                    'Update comments if needed',
                    'Document major structural changes'
                ]
            }
        ];
    }

    /**
     * Checks if refactoring is safe to proceed
     * @param {Object} conditions - Current conditions
     * @returns {Object} Safety assessment
     */
    static assessSafety(conditions) {
        const issues = [];

        if (!conditions.testsExist) {
            issues.push('No tests exist - add tests before refactoring');
        }

        if (!conditions.testsPass) {
            issues.push('Tests are failing - fix tests first');
        }

        if (conditions.coveragePercent < 70) {
            issues.push(`Coverage is ${conditions.coveragePercent}% - consider adding more tests`);
        }

        if (conditions.hasUncommittedChanges) {
            issues.push('Uncommitted changes exist - commit or stash first');
        }

        if (conditions.upcomingDeadline) {
            issues.push('Deadline approaching - consider postponing refactoring');
        }

        return {
            safe: issues.length === 0,
            issues,
            recommendation: issues.length === 0
                ? 'Safe to proceed with refactoring'
                : 'Address issues before refactoring'
        };
    }
}

// Demonstration
console.log('=== Refactoring Demo ===\n');

// Refactoring techniques
console.log('--- Refactoring Techniques ---');
RefactoringTechnique.getAllTechniques().slice(0, 4).forEach(technique => {
    console.log(`\n${technique.name}:`);
    console.log(`  Description: ${technique.description}`);
    console.log(`  Benefits: ${technique.benefits.join(', ')}`);
});

// Code smell detection
console.log('\n--- Code Smell Detection ---');
const analysis = CodeSmellDetector.analyze({
    methodName: 'processOrder',
    methodLength: 75,
    className: 'OrderService',
    classSize: 450,
    parameterCount: 6,
    cyclomaticComplexity: 15,
    nestingDepth: 4,
    duplicateBlocks: 2
});
console.log('Analysis:', analysis);

// Smell suggestions
console.log('\n--- Technique Suggestions ---');
console.log('For "long method":', RefactoringTechnique.suggestForSmell('long method'));
console.log('For "feature envy":', RefactoringTechnique.suggestForSmell('feature envy'));

// Refactoring session
console.log('\n--- Refactoring Session ---');
const session = new RefactoringSession({
    target: 'OrderService.processOrder()',
    reason: 'Method too long, hard to test'
});

session.recordTestsBefore({ total: 45, passing: 45 });

session.addStep({
    technique: 'extractMethod',
    description: 'Extracted validation logic into validateOrder()',
    filesChanged: ['OrderService.js']
});

session.addStep({
    technique: 'extractMethod',
    description: 'Extracted pricing logic into calculatePrice()',
    filesChanged: ['OrderService.js', 'PricingService.js']
});

session.recordTestsAfter({ total: 48, passing: 48 });

console.log('Session Summary:', session.complete());

// Safe refactoring
console.log('\n--- Safe Refactoring Assessment ---');
console.log('Safety Check:', SafeRefactoring.assessSafety({
    testsExist: true,
    testsPass: true,
    coveragePercent: 85,
    hasUncommittedChanges: false,
    upcomingDeadline: false
}));

// Refactoring plan
console.log('\n--- Refactoring Plan ---');
const plan = new RefactoringPlan({
    name: 'OrderService Cleanup',
    goal: 'Improve maintainability and testability',
    scope: 'OrderService class and related utilities'
});

plan.addPhase({
    name: 'Extract Methods',
    tasks: ['Extract validation', 'Extract pricing', 'Extract notification'],
    deliverables: ['Smaller methods', 'Unit tests for each'],
    verificationCriteria: 'All tests pass, no method > 20 lines'
});

plan.addRisk({
    description: 'Behavior change during extraction',
    likelihood: 'medium',
    impact: 'high',
    mitigation: 'Comprehensive test coverage, small incremental changes'
});

console.log('Plan:', plan.getPlan());

/**
 * Best Practices for Refactoring:
 *
 * 1. Always have tests before refactoring
 * 2. Make small, incremental changes
 * 3. Run tests after each change
 * 4. Commit frequently during refactoring
 * 5. Refactor for a specific reason, not just because
 * 6. Don't mix refactoring with feature changes
 * 7. Use IDE refactoring tools when available
 * 8. Document significant structural changes
 * 9. Keep refactoring sessions time-boxed
 * 10. Review refactored code before merging
 */
