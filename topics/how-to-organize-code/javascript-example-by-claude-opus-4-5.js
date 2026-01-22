/**
 * How to Organize Code - Structure for Maintainability
 *
 * Organizing code effectively is crucial for creating maintainable, scalable,
 * and readable software. Good organization uses modular design, consistent
 * naming conventions, avoids global state, and follows established patterns
 * to make code easier to understand, test, and maintain.
 *
 * Key Concepts:
 * - Modular design with clear responsibilities
 * - Consistent naming conventions
 * - Avoid duplication and global state
 * - Use version control and documentation
 */

/**
 * ModuleOrganizer helps structure code into modules.
 * Analyzes and suggests module boundaries.
 */
class ModuleOrganizer {
    constructor() {
        this.modules = new Map();
        this.dependencies = new Map();
    }

    /**
     * Creates a new module
     * @param {Object} config - Module configuration
     * @returns {Object} Created module
     */
    createModule(config) {
        const module = {
            name: config.name,
            description: config.description,
            responsibility: config.responsibility,
            exports: config.exports || [],
            imports: config.imports || [],
            components: [],
            createdAt: new Date()
        };

        this.modules.set(config.name, module);

        // Track dependencies
        for (const imp of module.imports) {
            if (!this.dependencies.has(imp)) {
                this.dependencies.set(imp, new Set());
            }
            this.dependencies.get(imp).add(config.name);
        }

        return module;
    }

    /**
     * Adds a component to a module
     * @param {string} moduleName - Module name
     * @param {Object} component - Component to add
     */
    addComponent(moduleName, component) {
        const module = this.modules.get(moduleName);
        if (!module) {
            throw new Error(`Module ${moduleName} not found`);
        }

        module.components.push({
            name: component.name,
            type: component.type, // class, function, constant
            visibility: component.visibility || 'private',
            description: component.description
        });
    }

    /**
     * Checks for circular dependencies
     * @returns {Array} Circular dependency chains
     */
    findCircularDependencies() {
        const circles = [];
        const visited = new Set();
        const stack = new Set();

        const dfs = (module, path) => {
            if (stack.has(module)) {
                circles.push([...path, module]);
                return;
            }
            if (visited.has(module)) return;

            visited.add(module);
            stack.add(module);

            const mod = this.modules.get(module);
            if (mod) {
                for (const imp of mod.imports) {
                    dfs(imp, [...path, module]);
                }
            }

            stack.delete(module);
        };

        for (const name of this.modules.keys()) {
            dfs(name, []);
        }

        return circles;
    }

    /**
     * Gets module dependency graph
     * @returns {Object} Dependency graph
     */
    getDependencyGraph() {
        const graph = {};

        for (const [name, module] of this.modules) {
            graph[name] = {
                imports: module.imports,
                importedBy: Array.from(this.dependencies.get(name) || [])
            };
        }

        return graph;
    }

    /**
     * Analyzes module cohesion
     * @param {string} moduleName - Module name
     * @returns {Object} Cohesion analysis
     */
    analyzeCohesion(moduleName) {
        const module = this.modules.get(moduleName);
        if (!module) return null;

        const componentCount = module.components.length;
        const publicCount = module.components.filter(c => c.visibility === 'public').length;

        let cohesion = 'high';
        if (componentCount > 10) cohesion = 'medium';
        if (componentCount > 20) cohesion = 'low';
        if (publicCount > componentCount * 0.5) cohesion = 'low';

        return {
            module: moduleName,
            componentCount,
            publicCount,
            cohesion,
            suggestion: cohesion === 'low'
                ? 'Consider splitting into smaller modules'
                : 'Module size is appropriate'
        };
    }
}

/**
 * DirectoryStructure represents a project's file organization.
 * Provides patterns and validation for directory layout.
 */
class DirectoryStructure {
    constructor(projectType) {
        this.projectType = projectType;
        this.structure = this.getStructureTemplate(projectType);
    }

    /**
     * Gets structure template for project type
     * @param {string} type - Project type
     * @returns {Object} Structure template
     */
    getStructureTemplate(type) {
        const templates = {
            'node-library': {
                'src/': {
                    description: 'Source code',
                    children: {
                        'index.js': 'Entry point',
                        'lib/': 'Library modules'
                    }
                },
                'test/': {
                    description: 'Test files',
                    children: {
                        'unit/': 'Unit tests',
                        'integration/': 'Integration tests'
                    }
                },
                'docs/': { description: 'Documentation' },
                'package.json': 'Package configuration',
                'README.md': 'Project documentation'
            },
            'web-app': {
                'src/': {
                    description: 'Application source',
                    children: {
                        'components/': 'UI components',
                        'pages/': 'Page components',
                        'services/': 'Business logic and API calls',
                        'utils/': 'Utility functions',
                        'hooks/': 'Custom hooks',
                        'styles/': 'CSS/styling files'
                    }
                },
                'public/': { description: 'Static assets' },
                'test/': { description: 'Test files' },
                'package.json': 'Package configuration'
            },
            'api-service': {
                'src/': {
                    description: 'Application source',
                    children: {
                        'controllers/': 'Request handlers',
                        'models/': 'Data models',
                        'services/': 'Business logic',
                        'middleware/': 'Express middleware',
                        'routes/': 'Route definitions',
                        'utils/': 'Utility functions',
                        'config/': 'Configuration'
                    }
                },
                'test/': { description: 'Test files' },
                'migrations/': { description: 'Database migrations' }
            }
        };

        return templates[type] || templates['node-library'];
    }

    /**
     * Validates a file path against structure
     * @param {string} path - File path to validate
     * @returns {Object} Validation result
     */
    validatePath(path) {
        const parts = path.split('/');
        let current = this.structure;
        let valid = true;
        let suggestion = null;

        for (const part of parts) {
            if (!current[part] && !current[part + '/']) {
                valid = false;
                suggestion = `Path "${path}" doesn't match expected structure`;
                break;
            }
            current = current[part]?.children || current[part + '/']?.children || {};
        }

        return { valid, path, suggestion };
    }

    /**
     * Gets directory for a component type
     * @param {string} componentType - Type of component
     * @returns {string} Suggested directory
     */
    suggestDirectory(componentType) {
        const suggestions = {
            component: 'src/components/',
            service: 'src/services/',
            utility: 'src/utils/',
            test: 'test/',
            model: 'src/models/',
            controller: 'src/controllers/',
            middleware: 'src/middleware/',
            hook: 'src/hooks/',
            style: 'src/styles/'
        };

        return suggestions[componentType] || 'src/';
    }

    /**
     * Generates structure documentation
     * @returns {string} Structure documentation
     */
    document() {
        let doc = `# Project Structure (${this.projectType})\n\n`;

        const printLevel = (obj, indent = '') => {
            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'string') {
                    doc += `${indent}${key} - ${value}\n`;
                } else {
                    doc += `${indent}${key}\n`;
                    if (value.description) {
                        doc += `${indent}  ${value.description}\n`;
                    }
                    if (value.children) {
                        printLevel(value.children, indent + '  ');
                    }
                }
            }
        };

        printLevel(this.structure);
        return doc;
    }
}

/**
 * CodeOrganizationAnalyzer analyzes code organization issues.
 * Identifies common anti-patterns.
 */
class CodeOrganizationAnalyzer {
    constructor() {
        this.issues = [];
        this.patterns = this.defineAntiPatterns();
    }

    /**
     * Defines anti-patterns to detect
     * @returns {Array} Anti-pattern definitions
     */
    defineAntiPatterns() {
        return [
            {
                name: 'God Object',
                description: 'Class or module with too many responsibilities',
                detect: (item) => item.methodCount > 20 || item.lineCount > 500,
                severity: 'high',
                fix: 'Split into smaller, focused classes'
            },
            {
                name: 'Circular Dependency',
                description: 'Modules that depend on each other',
                detect: (item) => item.circularDeps && item.circularDeps.length > 0,
                severity: 'high',
                fix: 'Extract shared code into a separate module'
            },
            {
                name: 'Feature Envy',
                description: 'Code that uses more features from other classes than its own',
                detect: (item) => item.externalCalls > item.internalCalls * 2,
                severity: 'medium',
                fix: 'Move code to the class it uses most'
            },
            {
                name: 'Long Parameter List',
                description: 'Functions with too many parameters',
                detect: (item) => item.parameterCount > 5,
                severity: 'medium',
                fix: 'Group parameters into objects'
            },
            {
                name: 'Duplicate Code',
                description: 'Same logic repeated in multiple places',
                detect: (item) => item.duplicateBlocks > 0,
                severity: 'medium',
                fix: 'Extract into shared function or module'
            },
            {
                name: 'Deep Nesting',
                description: 'Code with too many levels of nesting',
                detect: (item) => item.maxNesting > 4,
                severity: 'low',
                fix: 'Extract nested blocks into functions, use early returns'
            },
            {
                name: 'Global State',
                description: 'Excessive use of global variables',
                detect: (item) => item.globalVariables > 0,
                severity: 'medium',
                fix: 'Encapsulate state in modules or classes'
            }
        ];
    }

    /**
     * Analyzes code for organization issues
     * @param {Object} codeMetrics - Code metrics
     * @returns {Object} Analysis results
     */
    analyze(codeMetrics) {
        const findings = [];

        for (const pattern of this.patterns) {
            if (pattern.detect(codeMetrics)) {
                findings.push({
                    pattern: pattern.name,
                    description: pattern.description,
                    severity: pattern.severity,
                    fix: pattern.fix,
                    location: codeMetrics.location
                });
            }
        }

        return {
            location: codeMetrics.location,
            findings,
            score: this.calculateScore(findings),
            recommendations: findings.map(f => f.fix)
        };
    }

    /**
     * Calculates organization score
     * @param {Array} findings - Analysis findings
     * @returns {number} Score 0-100
     */
    calculateScore(findings) {
        const severityPenalty = { high: 25, medium: 15, low: 5 };
        let penalty = 0;

        for (const finding of findings) {
            penalty += severityPenalty[finding.severity] || 0;
        }

        return Math.max(0, 100 - penalty);
    }
}

/**
 * DesignPatternMatcher suggests design patterns for code.
 * Matches problems to appropriate patterns.
 */
class DesignPatternMatcher {
    static patterns = {
        creational: [
            {
                name: 'Factory',
                useWhen: ['creating objects based on conditions', 'hiding construction complexity'],
                example: 'createUser(), createProduct()'
            },
            {
                name: 'Builder',
                useWhen: ['constructing complex objects step by step', 'object has many optional parameters'],
                example: 'QueryBuilder, RequestBuilder'
            },
            {
                name: 'Singleton',
                useWhen: ['exactly one instance needed', 'global access point required'],
                example: 'Database connection, Logger'
            }
        ],
        structural: [
            {
                name: 'Adapter',
                useWhen: ['integrating incompatible interfaces', 'wrapping legacy code'],
                example: 'API adapter, database adapter'
            },
            {
                name: 'Facade',
                useWhen: ['simplifying complex subsystem', 'providing unified interface'],
                example: 'EmailService facade, PaymentFacade'
            },
            {
                name: 'Decorator',
                useWhen: ['adding behavior dynamically', 'extending without inheritance'],
                example: 'Logging decorator, caching decorator'
            }
        ],
        behavioral: [
            {
                name: 'Strategy',
                useWhen: ['algorithm varies', 'need interchangeable behaviors'],
                example: 'Payment strategies, sorting algorithms'
            },
            {
                name: 'Observer',
                useWhen: ['objects need to be notified of changes', 'event-driven architecture'],
                example: 'Event emitters, pub/sub'
            },
            {
                name: 'Command',
                useWhen: ['encapsulating requests', 'undo/redo functionality'],
                example: 'Action handlers, task queue'
            }
        ]
    };

    /**
     * Finds matching patterns for a problem
     * @param {string} problem - Problem description
     * @returns {Array} Matching patterns
     */
    static findPatterns(problem) {
        const matches = [];
        const lowerProblem = problem.toLowerCase();

        for (const [category, patterns] of Object.entries(this.patterns)) {
            for (const pattern of patterns) {
                const matches_useCase = pattern.useWhen.some(use =>
                    lowerProblem.includes(use.split(' ')[0])
                );

                if (matches_useCase) {
                    matches.push({
                        category,
                        ...pattern
                    });
                }
            }
        }

        return matches;
    }

    /**
     * Gets all patterns
     * @returns {Object} All patterns
     */
    static getAll() {
        return this.patterns;
    }

    /**
     * Gets pattern details
     * @param {string} name - Pattern name
     * @returns {Object|null} Pattern details
     */
    static getPattern(name) {
        for (const patterns of Object.values(this.patterns)) {
            const found = patterns.find(p => p.name.toLowerCase() === name.toLowerCase());
            if (found) return found;
        }
        return null;
    }
}

/**
 * CodeOrganizationGuide provides best practices documentation.
 */
class CodeOrganizationGuide {
    static principles = [
        {
            name: 'Single Responsibility',
            description: 'Each module/class should have one reason to change',
            example: 'UserService handles users, AuthService handles authentication'
        },
        {
            name: 'DRY (Don\'t Repeat Yourself)',
            description: 'Extract common functionality, avoid duplication',
            example: 'Create shared utilities, components, and services'
        },
        {
            name: 'Separation of Concerns',
            description: 'Divide code into distinct sections with specific purposes',
            example: 'Separate UI, business logic, and data access'
        },
        {
            name: 'Encapsulation',
            description: 'Hide internal details, expose clean interfaces',
            example: 'Use private methods, export only necessary functions'
        },
        {
            name: 'Dependency Injection',
            description: 'Pass dependencies rather than creating them internally',
            example: 'Pass database connection to services'
        }
    ];

    /**
     * Gets all principles
     * @returns {Array} Organization principles
     */
    static getPrinciples() {
        return this.principles;
    }

    /**
     * Formats guide as documentation
     * @returns {string} Formatted guide
     */
    static format() {
        let doc = '# Code Organization Guide\n\n';

        for (const principle of this.principles) {
            doc += `## ${principle.name}\n`;
            doc += `${principle.description}\n\n`;
            doc += `Example: ${principle.example}\n\n`;
        }

        return doc;
    }
}

// Demonstration
console.log('=== How to Organize Code Demo ===\n');

// Module organization
console.log('--- Module Organization ---');
const organizer = new ModuleOrganizer();

organizer.createModule({
    name: 'user',
    description: 'User management',
    responsibility: 'Handle user CRUD operations',
    exports: ['UserService', 'User'],
    imports: ['database', 'validation']
});

organizer.createModule({
    name: 'auth',
    description: 'Authentication',
    responsibility: 'Handle authentication and authorization',
    exports: ['AuthService', 'AuthMiddleware'],
    imports: ['user', 'crypto']
});

organizer.createModule({
    name: 'database',
    description: 'Database access',
    responsibility: 'Database connection and queries',
    exports: ['query', 'connect']
});

organizer.addComponent('user', {
    name: 'UserService',
    type: 'class',
    visibility: 'public',
    description: 'Main user service'
});

organizer.addComponent('user', {
    name: 'validateUser',
    type: 'function',
    visibility: 'private',
    description: 'Internal validation'
});

console.log('Dependency Graph:', organizer.getDependencyGraph());
console.log('Circular Dependencies:', organizer.findCircularDependencies());
console.log('User Module Cohesion:', organizer.analyzeCohesion('user'));

// Directory structure
console.log('\n--- Directory Structure ---');
const structure = new DirectoryStructure('web-app');
console.log('Validate path:');
console.log('  src/components/Button.js:', structure.validatePath('src/components/Button.js'));
console.log('  random/file.js:', structure.validatePath('random/file.js'));
console.log('\nSuggested directory for service:', structure.suggestDirectory('service'));

// Code analysis
console.log('\n--- Code Analysis ---');
const analyzer = new CodeOrganizationAnalyzer();

const badCode = {
    location: 'src/GodClass.js',
    methodCount: 35,
    lineCount: 800,
    parameterCount: 8,
    maxNesting: 6,
    globalVariables: 2,
    externalCalls: 50,
    internalCalls: 10
};

const analysis = analyzer.analyze(badCode);
console.log('Analysis Score:', analysis.score);
console.log('Findings:', analysis.findings.map(f => f.pattern));
console.log('Recommendations:', analysis.recommendations);

// Design patterns
console.log('\n--- Design Patterns ---');
console.log('Patterns for "creating objects based on type":');
DesignPatternMatcher.findPatterns('creating objects based on type').forEach(p => {
    console.log(`  ${p.name}: ${p.useWhen[0]}`);
});

// Principles
console.log('\n--- Organization Principles ---');
CodeOrganizationGuide.getPrinciples().slice(0, 3).forEach(p => {
    console.log(`${p.name}: ${p.description}`);
});

/**
 * Best Practices for Organizing Code:
 *
 * 1. Use modular design with clear responsibilities
 * 2. Follow consistent naming conventions
 * 3. Avoid global state and side effects
 * 4. Don't repeat code - extract common functionality
 * 5. Use version control effectively
 * 6. Document code and architecture
 * 7. Use dependency management tools
 * 8. Follow consistent code formatting
 * 9. Apply design patterns appropriately
 * 10. Keep modules small and focused
 */
