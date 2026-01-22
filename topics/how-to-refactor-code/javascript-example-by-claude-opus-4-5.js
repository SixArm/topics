/**
 * How to Refactor Code - Improving Code Without Changing Behavior
 *
 * Refactoring is the process of improving the structure, design, and
 * readability of existing code without changing its external behavior.
 * The goal is to enhance maintainability, extensibility, and overall
 * quality through incremental, tested changes.
 *
 * Key Concepts:
 * - Improve structure without changing behavior
 * - Make small, incremental changes
 * - Ensure test coverage before refactoring
 * - Identify and fix code smells
 */

/**
 * CodeSmell represents a potential code quality issue.
 * Indicates areas that may benefit from refactoring.
 */
class CodeSmell {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.severity = options.severity || 'medium';
        this.category = options.category;
        this.refactorings = options.refactorings || [];
        this.detectFn = options.detect;
    }

    /**
     * Detects this smell in code metrics
     * @param {Object} metrics - Code metrics
     * @returns {Object} Detection result
     */
    detect(metrics) {
        const detected = this.detectFn ? this.detectFn(metrics) : false;

        return {
            smell: this.name,
            detected,
            severity: this.severity,
            suggestedRefactorings: detected ? this.refactorings : []
        };
    }
}

/**
 * CodeSmellDetector finds code smells in code.
 * Contains a catalog of common code smells.
 */
class CodeSmellDetector {
    constructor() {
        this.smells = this.defineSmells();
    }

    /**
     * Defines common code smells
     * @returns {Array} Code smell definitions
     */
    defineSmells() {
        return [
            new CodeSmell({
                name: 'Long Method',
                description: 'Method is too long and hard to understand',
                category: 'bloaters',
                severity: 'high',
                detect: (m) => m.lineCount > 30 || m.statementCount > 20,
                refactorings: ['Extract Method', 'Replace Temp with Query', 'Decompose Conditional']
            }),
            new CodeSmell({
                name: 'Large Class',
                description: 'Class has too many responsibilities',
                category: 'bloaters',
                severity: 'high',
                detect: (m) => m.methodCount > 15 || m.fieldCount > 10,
                refactorings: ['Extract Class', 'Extract Subclass', 'Extract Interface']
            }),
            new CodeSmell({
                name: 'Long Parameter List',
                description: 'Method has too many parameters',
                category: 'bloaters',
                severity: 'medium',
                detect: (m) => m.parameterCount > 4,
                refactorings: ['Introduce Parameter Object', 'Preserve Whole Object', 'Replace Parameter with Method']
            }),
            new CodeSmell({
                name: 'Duplicate Code',
                description: 'Same code structure repeated in multiple places',
                category: 'dispensables',
                severity: 'high',
                detect: (m) => m.duplicateBlocks > 0,
                refactorings: ['Extract Method', 'Pull Up Method', 'Form Template Method']
            }),
            new CodeSmell({
                name: 'Dead Code',
                description: 'Code that is never executed',
                category: 'dispensables',
                severity: 'low',
                detect: (m) => m.deadCodeLines > 0,
                refactorings: ['Remove Dead Code']
            }),
            new CodeSmell({
                name: 'Feature Envy',
                description: 'Method uses more features from other classes',
                category: 'couplers',
                severity: 'medium',
                detect: (m) => m.externalMethodCalls > m.internalMethodCalls * 2,
                refactorings: ['Move Method', 'Extract Method']
            }),
            new CodeSmell({
                name: 'Inappropriate Intimacy',
                description: 'Classes know too much about each other\'s internals',
                category: 'couplers',
                severity: 'medium',
                detect: (m) => m.accessesToPrivateFields > 0,
                refactorings: ['Move Method', 'Move Field', 'Hide Delegate']
            }),
            new CodeSmell({
                name: 'Primitive Obsession',
                description: 'Over-use of primitives instead of small objects',
                category: 'oo-abusers',
                severity: 'low',
                detect: (m) => m.primitiveFields > m.objectFields * 2,
                refactorings: ['Replace Primitive with Object', 'Introduce Parameter Object']
            }),
            new CodeSmell({
                name: 'Switch Statements',
                description: 'Complex switch/case that could be polymorphism',
                category: 'oo-abusers',
                severity: 'medium',
                detect: (m) => m.switchStatements > 0 && m.switchCases > 5,
                refactorings: ['Replace Conditional with Polymorphism', 'Replace Type Code with Subclasses']
            }),
            new CodeSmell({
                name: 'Comments',
                description: 'Excessive comments compensating for unclear code',
                category: 'dispensables',
                severity: 'low',
                detect: (m) => m.commentRatio > 0.4,
                refactorings: ['Rename Method', 'Extract Method', 'Introduce Assertion']
            }),
            new CodeSmell({
                name: 'Deep Nesting',
                description: 'Too many levels of nested conditionals or loops',
                category: 'bloaters',
                severity: 'medium',
                detect: (m) => m.maxNestingDepth > 4,
                refactorings: ['Extract Method', 'Replace Nested Conditional with Guard Clauses']
            }),
            new CodeSmell({
                name: 'Magic Numbers',
                description: 'Unexplained numeric literals in code',
                category: 'dispensables',
                severity: 'low',
                detect: (m) => m.magicNumbers > 0,
                refactorings: ['Replace Magic Number with Symbolic Constant']
            })
        ];
    }

    /**
     * Analyzes code for smells
     * @param {Object} codeMetrics - Metrics about the code
     * @returns {Object} Analysis results
     */
    analyze(codeMetrics) {
        const detectedSmells = [];

        for (const smell of this.smells) {
            const result = smell.detect(codeMetrics);
            if (result.detected) {
                detectedSmells.push(result);
            }
        }

        return {
            location: codeMetrics.location,
            smellCount: detectedSmells.length,
            smells: detectedSmells,
            score: this.calculateHealthScore(detectedSmells),
            priority: this.prioritizeRefactorings(detectedSmells)
        };
    }

    /**
     * Calculates code health score
     * @param {Array} smells - Detected smells
     * @returns {number} Health score 0-100
     */
    calculateHealthScore(smells) {
        const severityPenalty = { high: 20, medium: 10, low: 5 };
        let penalty = 0;

        for (const smell of smells) {
            penalty += severityPenalty[smell.severity] || 0;
        }

        return Math.max(0, 100 - penalty);
    }

    /**
     * Prioritizes refactorings to address smells
     * @param {Array} smells - Detected smells
     * @returns {Array} Prioritized refactorings
     */
    prioritizeRefactorings(smells) {
        const refactorings = new Map();

        // Weight refactorings by smell severity
        const severityWeight = { high: 3, medium: 2, low: 1 };

        for (const smell of smells) {
            const weight = severityWeight[smell.severity];
            for (const ref of smell.suggestedRefactorings) {
                const current = refactorings.get(ref) || 0;
                refactorings.set(ref, current + weight);
            }
        }

        // Sort by weight
        return Array.from(refactorings.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([name, weight]) => ({ name, priority: weight }));
    }
}

/**
 * RefactoringTechnique describes a specific refactoring method.
 * Contains steps and examples for applying the technique.
 */
class RefactoringTechnique {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.motivation = options.motivation;
        this.mechanics = options.mechanics || [];
        this.example = options.example;
        this.risks = options.risks || [];
    }

    /**
     * Gets technique documentation
     * @returns {string} Documentation
     */
    document() {
        let doc = `\n## ${this.name}\n\n`;
        doc += `${this.description}\n\n`;
        doc += `**Motivation:** ${this.motivation}\n\n`;

        if (this.mechanics.length > 0) {
            doc += '**Mechanics:**\n';
            this.mechanics.forEach((m, i) => {
                doc += `${i + 1}. ${m}\n`;
            });
            doc += '\n';
        }

        if (this.example) {
            doc += `**Example:**\n\`\`\`\n${this.example}\n\`\`\`\n`;
        }

        return doc;
    }
}

/**
 * RefactoringCatalog contains common refactoring techniques.
 * Provides guidance for each technique.
 */
class RefactoringCatalog {
    constructor() {
        this.techniques = this.defineTechniques();
    }

    /**
     * Defines refactoring techniques
     * @returns {Map} Technique definitions
     */
    defineTechniques() {
        const techniques = new Map();

        techniques.set('Extract Method', new RefactoringTechnique({
            name: 'Extract Method',
            description: 'Turn a code fragment into a method with a name that explains its purpose',
            motivation: 'When you have a code fragment that can be grouped together',
            mechanics: [
                'Create a new method named after what it does',
                'Copy the extracted code into the new method',
                'Identify local variables used in the extracted code',
                'Pass needed variables as parameters',
                'Replace extracted code with a call to the new method'
            ],
            example: `// Before
function printDetails(order) {
  // print banner
  console.log("**** Order ****");
  console.log("Customer: " + order.customer);
  // calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price;
  }
  console.log("Total: " + total);
}

// After
function printDetails(order) {
  printBanner();
  console.log("Customer: " + order.customer);
  console.log("Total: " + calculateTotal(order));
}

function printBanner() {
  console.log("**** Order ****");
}

function calculateTotal(order) {
  let total = 0;
  for (const item of order.items) {
    total += item.price;
  }
  return total;
}`,
            risks: ['May create too many small methods if overdone']
        }));

        techniques.set('Rename Variable', new RefactoringTechnique({
            name: 'Rename Variable',
            description: 'Change the name of a variable to better communicate its purpose',
            motivation: 'Good names are the key to clear code',
            mechanics: [
                'Check that the variable is not used outside its scope',
                'Find all references to the variable',
                'Change the declaration and all references',
                'Test'
            ],
            example: `// Before
const x = customer.getName();

// After
const customerName = customer.getName();`
        }));

        techniques.set('Extract Class', new RefactoringTechnique({
            name: 'Extract Class',
            description: 'Create a new class and move fields and methods from the old class',
            motivation: 'When a class is doing work that should be done by two classes',
            mechanics: [
                'Decide how to split responsibilities',
                'Create a new class for the split-off responsibilities',
                'Create link from old class to new class',
                'Move fields and methods to new class',
                'Decide whether to expose the new class'
            ],
            risks: ['Need to maintain relationship between classes']
        }));

        techniques.set('Replace Conditional with Polymorphism', new RefactoringTechnique({
            name: 'Replace Conditional with Polymorphism',
            description: 'Replace a conditional with polymorphic method calls',
            motivation: 'When you have a conditional that chooses behavior based on type',
            mechanics: [
                'Create subclasses for each leg of the conditional',
                'Create polymorphic method in parent class',
                'Override method in each subclass',
                'Replace conditional with call to polymorphic method'
            ],
            example: `// Before
function getSpeed(vehicle) {
  switch (vehicle.type) {
    case 'car': return vehicle.baseSpeed;
    case 'bike': return vehicle.baseSpeed - 10;
    case 'truck': return vehicle.baseSpeed - 20;
  }
}

// After
class Vehicle {
  getSpeed() { return this.baseSpeed; }
}
class Car extends Vehicle {
  getSpeed() { return this.baseSpeed; }
}
class Bike extends Vehicle {
  getSpeed() { return this.baseSpeed - 10; }
}
class Truck extends Vehicle {
  getSpeed() { return this.baseSpeed - 20; }
}`
        }));

        techniques.set('Introduce Parameter Object', new RefactoringTechnique({
            name: 'Introduce Parameter Object',
            description: 'Replace related parameters with an object',
            motivation: 'When you see a group of parameters that go together',
            mechanics: [
                'Create a new class to represent the group of parameters',
                'Add the new object as a parameter',
                'For each element of the group, remove it from method signature',
                'Replace usages with access to the new object'
            ],
            example: `// Before
function amountInvoiced(startDate, endDate) { ... }
function amountReceived(startDate, endDate) { ... }

// After
class DateRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}
function amountInvoiced(dateRange) { ... }
function amountReceived(dateRange) { ... }`
        }));

        return techniques;
    }

    /**
     * Gets a technique by name
     * @param {string} name - Technique name
     * @returns {RefactoringTechnique|null} Technique or null
     */
    get(name) {
        return this.techniques.get(name);
    }

    /**
     * Gets all technique names
     * @returns {Array} Technique names
     */
    list() {
        return Array.from(this.techniques.keys());
    }

    /**
     * Searches techniques by keyword
     * @param {string} keyword - Search keyword
     * @returns {Array} Matching techniques
     */
    search(keyword) {
        const lower = keyword.toLowerCase();
        return Array.from(this.techniques.values())
            .filter(t =>
                t.name.toLowerCase().includes(lower) ||
                t.description.toLowerCase().includes(lower)
            );
    }
}

/**
 * RefactoringPlan creates a plan for refactoring code.
 * Prioritizes and sequences refactoring steps.
 */
class RefactoringPlan {
    constructor(targetCode) {
        this.targetCode = targetCode;
        this.steps = [];
        this.status = 'planning';
        this.createdAt = new Date();
    }

    /**
     * Adds a refactoring step
     * @param {Object} step - Step definition
     */
    addStep(step) {
        this.steps.push({
            order: this.steps.length + 1,
            technique: step.technique,
            target: step.target,
            reason: step.reason,
            risk: step.risk || 'low',
            status: 'pending',
            notes: step.notes
        });
    }

    /**
     * Marks a step as complete
     * @param {number} stepOrder - Step order number
     */
    completeStep(stepOrder) {
        const step = this.steps.find(s => s.order === stepOrder);
        if (step) {
            step.status = 'complete';
            step.completedAt = new Date();
        }
    }

    /**
     * Gets plan progress
     * @returns {Object} Progress summary
     */
    getProgress() {
        const completed = this.steps.filter(s => s.status === 'complete').length;
        return {
            total: this.steps.length,
            completed,
            remaining: this.steps.length - completed,
            percentage: Math.round((completed / this.steps.length) * 100)
        };
    }

    /**
     * Gets next step
     * @returns {Object|null} Next pending step
     */
    getNextStep() {
        return this.steps.find(s => s.status === 'pending');
    }

    /**
     * Formats plan as documentation
     * @returns {string} Formatted plan
     */
    format() {
        let doc = `# Refactoring Plan\n\n`;
        doc += `Target: ${this.targetCode}\n`;
        doc += `Status: ${this.status}\n`;
        doc += `Progress: ${this.getProgress().percentage}%\n\n`;

        doc += `## Steps\n\n`;
        for (const step of this.steps) {
            const icon = step.status === 'complete' ? '✓' : '○';
            doc += `${icon} **${step.order}. ${step.technique}**\n`;
            doc += `   Target: ${step.target}\n`;
            doc += `   Reason: ${step.reason}\n`;
            if (step.notes) {
                doc += `   Notes: ${step.notes}\n`;
            }
            doc += '\n';
        }

        return doc;
    }
}

/**
 * RefactoringWorkflow guides the refactoring process.
 * Ensures safe refactoring practices.
 */
class RefactoringWorkflow {
    static steps = [
        {
            name: 'Ensure Tests Exist',
            description: 'Have a solid suite of tests covering the code to refactor',
            critical: true
        },
        {
            name: 'Understand the Code',
            description: 'Read and understand the existing code thoroughly',
            critical: true
        },
        {
            name: 'Identify Smells',
            description: 'Find code smells and areas for improvement',
            critical: false
        },
        {
            name: 'Plan Refactoring',
            description: 'Create a plan with small, incremental steps',
            critical: true
        },
        {
            name: 'Make Small Changes',
            description: 'Apply one refactoring at a time',
            critical: true
        },
        {
            name: 'Run Tests',
            description: 'Run tests after each change to ensure behavior unchanged',
            critical: true
        },
        {
            name: 'Commit Frequently',
            description: 'Commit each successful refactoring step',
            critical: false
        },
        {
            name: 'Review and Document',
            description: 'Update documentation if needed',
            critical: false
        }
    ];

    /**
     * Gets workflow steps
     * @returns {Array} Workflow steps
     */
    static getSteps() {
        return this.steps;
    }

    /**
     * Gets critical steps only
     * @returns {Array} Critical steps
     */
    static getCriticalSteps() {
        return this.steps.filter(s => s.critical);
    }
}

// Demonstration
console.log('=== How to Refactor Code Demo ===\n');

// Detect code smells
console.log('--- Code Smell Detection ---');
const detector = new CodeSmellDetector();

const problematicCode = {
    location: 'src/OrderProcessor.js',
    lineCount: 150,
    statementCount: 80,
    methodCount: 25,
    fieldCount: 15,
    parameterCount: 6,
    duplicateBlocks: 3,
    externalMethodCalls: 40,
    internalMethodCalls: 10,
    maxNestingDepth: 5,
    magicNumbers: 8,
    switchStatements: 2,
    switchCases: 8
};

const analysis = detector.analyze(problematicCode);
console.log('Code Health Score:', analysis.score);
console.log('Detected Smells:', analysis.smells.map(s => s.smell));
console.log('\nPrioritized Refactorings:');
analysis.priority.slice(0, 5).forEach(r => {
    console.log(`  ${r.name} (priority: ${r.priority})`);
});

// Refactoring catalog
console.log('\n--- Refactoring Techniques ---');
const catalog = new RefactoringCatalog();
console.log('Available techniques:', catalog.list().slice(0, 5));

const extractMethod = catalog.get('Extract Method');
console.log(`\nExtract Method:`);
console.log(`  ${extractMethod.description}`);
console.log(`  Motivation: ${extractMethod.motivation}`);

// Create refactoring plan
console.log('\n--- Refactoring Plan ---');
const plan = new RefactoringPlan('OrderProcessor.js');

plan.addStep({
    technique: 'Extract Method',
    target: 'calculateTotal() logic in processOrder()',
    reason: 'Long Method smell - processOrder is 150 lines',
    risk: 'low'
});

plan.addStep({
    technique: 'Extract Class',
    target: 'OrderValidator from OrderProcessor',
    reason: 'Large Class smell - class has too many responsibilities',
    risk: 'medium'
});

plan.addStep({
    technique: 'Introduce Parameter Object',
    target: 'createOrder() parameters',
    reason: 'Long Parameter List smell',
    risk: 'low'
});

plan.addStep({
    technique: 'Replace Magic Number with Constant',
    target: 'Tax rate and discount values',
    reason: 'Magic Numbers smell',
    risk: 'low'
});

// Simulate progress
plan.completeStep(1);
plan.completeStep(2);

console.log('Progress:', plan.getProgress());
console.log('Next Step:', plan.getNextStep()?.technique);

// Workflow
console.log('\n--- Refactoring Workflow ---');
console.log('Critical Steps:');
RefactoringWorkflow.getCriticalSteps().forEach((step, i) => {
    console.log(`  ${i + 1}. ${step.name}`);
});

/**
 * Best Practices for Refactoring:
 *
 * 1. Never refactor without tests - ensure coverage first
 * 2. Understand the code before changing it
 * 3. Make small, incremental changes
 * 4. Test after each change
 * 5. Commit frequently to preserve progress
 * 6. Use automated refactoring tools when available
 * 7. Address high-severity smells first
 * 8. Don't refactor and add features at the same time
 * 9. Get code reviews for significant refactorings
 * 10. Update documentation to reflect changes
 */
