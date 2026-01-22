/**
 * How to Name Functions - Clean Code Naming Conventions
 *
 * Naming functions is essential for writing clean, maintainable code.
 * Well-chosen function names should be descriptive, concise, and meaningful,
 * providing clear indication of purpose and behavior. Good names reduce
 * the need for comments and make code self-documenting.
 *
 * Key Concepts:
 * - Use descriptive, action-oriented names
 * - Follow consistent naming conventions
 * - Avoid abbreviations and ambiguity
 * - Names should reveal intent
 */

/**
 * NamingConvention represents a naming style standard.
 * Provides rules and examples for consistent naming.
 */
class NamingConvention {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description;
        this.pattern = options.pattern;
        this.examples = options.examples || [];
        this.antiPatterns = options.antiPatterns || [];
    }

    /**
     * Validates a name against this convention
     * @param {string} name - Name to validate
     * @returns {Object} Validation result
     */
    validate(name) {
        if (!this.pattern) {
            return { valid: true };
        }

        const regex = new RegExp(this.pattern);
        const valid = regex.test(name);

        return {
            valid,
            convention: this.name,
            name,
            suggestion: valid ? null : `Name should match ${this.name} convention`
        };
    }

    /**
     * Converts a name to this convention
     * @param {string} name - Name to convert
     * @returns {string} Converted name
     */
    convert(name) {
        // Default implementation - override in subclasses
        return name;
    }
}

/**
 * CamelCaseConvention implements camelCase naming.
 */
class CamelCaseConvention extends NamingConvention {
    constructor() {
        super('camelCase', {
            description: 'First word lowercase, subsequent words capitalized',
            pattern: '^[a-z][a-zA-Z0-9]*$',
            examples: ['calculateTotal', 'getUserName', 'isValid'],
            antiPatterns: ['CalculateTotal', 'calculate_total', 'CALCULATETOTAL']
        });
    }

    convert(name) {
        // Convert from snake_case or other formats
        return name
            .toLowerCase()
            .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
            .replace(/^([A-Z])/, (_, letter) => letter.toLowerCase());
    }
}

/**
 * SnakeCaseConvention implements snake_case naming.
 */
class SnakeCaseConvention extends NamingConvention {
    constructor() {
        super('snake_case', {
            description: 'Words separated by underscores, all lowercase',
            pattern: '^[a-z][a-z0-9_]*$',
            examples: ['calculate_total', 'get_user_name', 'is_valid'],
            antiPatterns: ['calculateTotal', 'Calculate_Total', 'CALCULATE_TOTAL']
        });
    }

    convert(name) {
        return name
            .replace(/([A-Z])/g, '_$1')
            .toLowerCase()
            .replace(/^_/, '');
    }
}

/**
 * FunctionNameAnalyzer analyzes and suggests function names.
 * Checks for common naming issues and provides recommendations.
 */
class FunctionNameAnalyzer {
    constructor() {
        this.rules = this.defineRules();
        this.verbPrefixes = this.defineVerbPrefixes();
    }

    /**
     * Defines naming rules
     * @returns {Array} Naming rules
     */
    defineRules() {
        return [
            {
                id: 'starts-with-verb',
                name: 'Action Verb Prefix',
                check: (name) => {
                    const verbs = ['get', 'set', 'is', 'has', 'can', 'should', 'will',
                        'create', 'delete', 'update', 'find', 'fetch', 'load', 'save',
                        'send', 'receive', 'calculate', 'validate', 'check', 'convert',
                        'parse', 'format', 'handle', 'process', 'render', 'build'];
                    const lowerName = name.toLowerCase();
                    return verbs.some(v => lowerName.startsWith(v));
                },
                message: 'Function names should start with an action verb',
                severity: 'warning'
            },
            {
                id: 'not-too-short',
                name: 'Minimum Length',
                check: (name) => name.length >= 3,
                message: 'Function names should be at least 3 characters',
                severity: 'error'
            },
            {
                id: 'not-too-long',
                name: 'Maximum Length',
                check: (name) => name.length <= 40,
                message: 'Function names should not exceed 40 characters',
                severity: 'warning'
            },
            {
                id: 'no-generic-names',
                name: 'Avoid Generic Names',
                check: (name) => {
                    const generic = ['process', 'handle', 'do', 'execute', 'run', 'data', 'info'];
                    return !generic.includes(name.toLowerCase());
                },
                message: 'Avoid generic names like process, handle, do',
                severity: 'warning'
            },
            {
                id: 'no-abbreviations',
                name: 'Avoid Abbreviations',
                check: (name) => {
                    const abbrevs = ['usr', 'msg', 'btn', 'num', 'str', 'val', 'tmp', 'idx'];
                    const lowerName = name.toLowerCase();
                    return !abbrevs.some(a => lowerName.includes(a));
                },
                message: 'Avoid abbreviations in function names',
                severity: 'info'
            },
            {
                id: 'boolean-prefix',
                name: 'Boolean Return Prefix',
                check: (name, context) => {
                    if (context?.returnType !== 'boolean') return true;
                    const boolPrefixes = ['is', 'has', 'can', 'should', 'will', 'did', 'was'];
                    const lowerName = name.toLowerCase();
                    return boolPrefixes.some(p => lowerName.startsWith(p));
                },
                message: 'Boolean functions should start with is, has, can, etc.',
                severity: 'warning'
            }
        ];
    }

    /**
     * Defines common verb prefixes and their meanings
     * @returns {Object} Verb prefix definitions
     */
    defineVerbPrefixes() {
        return {
            get: { meaning: 'Returns a value', examples: ['getUserById', 'getTotal'] },
            set: { meaning: 'Sets a value', examples: ['setUsername', 'setConfig'] },
            is: { meaning: 'Returns boolean about state', examples: ['isValid', 'isEmpty'] },
            has: { meaning: 'Returns boolean about ownership', examples: ['hasPermission', 'hasChildren'] },
            can: { meaning: 'Returns boolean about capability', examples: ['canEdit', 'canDelete'] },
            should: { meaning: 'Returns boolean about recommendation', examples: ['shouldUpdate', 'shouldRetry'] },
            create: { meaning: 'Creates new entity', examples: ['createUser', 'createOrder'] },
            delete: { meaning: 'Removes entity', examples: ['deleteUser', 'deleteFile'] },
            update: { meaning: 'Modifies existing entity', examples: ['updateProfile', 'updateSettings'] },
            find: { meaning: 'Searches for entity', examples: ['findById', 'findMatching'] },
            fetch: { meaning: 'Retrieves from external source', examples: ['fetchData', 'fetchUsers'] },
            load: { meaning: 'Loads data into memory', examples: ['loadConfig', 'loadModule'] },
            save: { meaning: 'Persists data', examples: ['saveChanges', 'saveToFile'] },
            validate: { meaning: 'Checks validity', examples: ['validateInput', 'validateEmail'] },
            calculate: { meaning: 'Computes a value', examples: ['calculateTotal', 'calculateTax'] },
            convert: { meaning: 'Transforms data', examples: ['convertToJson', 'convertCurrency'] },
            parse: { meaning: 'Analyzes and extracts', examples: ['parseDate', 'parseConfig'] },
            format: { meaning: 'Formats for display', examples: ['formatDate', 'formatCurrency'] },
            handle: { meaning: 'Responds to event', examples: ['handleClick', 'handleError'] },
            render: { meaning: 'Generates output', examples: ['renderTemplate', 'renderComponent'] },
            build: { meaning: 'Constructs complex object', examples: ['buildQuery', 'buildUrl'] },
            init: { meaning: 'Initializes', examples: ['initializeApp', 'initModule'] },
            reset: { meaning: 'Returns to initial state', examples: ['resetForm', 'resetCounter'] },
            ensure: { meaning: 'Guarantees condition', examples: ['ensureLoggedIn', 'ensureValid'] }
        };
    }

    /**
     * Analyzes a function name
     * @param {string} name - Function name
     * @param {Object} context - Optional context (returnType, etc.)
     * @returns {Object} Analysis result
     */
    analyze(name, context = {}) {
        const issues = [];
        const passed = [];

        for (const rule of this.rules) {
            if (rule.check(name, context)) {
                passed.push(rule.name);
            } else {
                issues.push({
                    rule: rule.name,
                    message: rule.message,
                    severity: rule.severity
                });
            }
        }

        return {
            name,
            valid: issues.filter(i => i.severity === 'error').length === 0,
            issues,
            passed,
            score: Math.round((passed.length / this.rules.length) * 100)
        };
    }

    /**
     * Suggests better names for a function
     * @param {string} name - Current name
     * @param {string} description - What the function does
     * @returns {Array} Suggested names
     */
    suggest(name, description) {
        const suggestions = [];

        // Extract keywords from description
        const keywords = description.toLowerCase()
            .replace(/[^a-z\s]/g, '')
            .split(' ')
            .filter(w => w.length > 2);

        // Suggest with appropriate verbs
        for (const [verb, info] of Object.entries(this.verbPrefixes)) {
            if (description.toLowerCase().includes(info.meaning.toLowerCase().split(' ')[0])) {
                const noun = keywords.find(k => !Object.keys(this.verbPrefixes).includes(k));
                if (noun) {
                    suggestions.push(`${verb}${noun.charAt(0).toUpperCase()}${noun.slice(1)}`);
                }
            }
        }

        return suggestions.slice(0, 5);
    }

    /**
     * Gets verb prefix guide
     * @returns {Object} Verb prefix definitions
     */
    getVerbGuide() {
        return this.verbPrefixes;
    }
}

/**
 * NamingStyleGuide provides comprehensive naming guidelines.
 * Documents best practices with examples.
 */
class NamingStyleGuide {
    static guidelines = {
        general: [
            {
                rule: 'Use descriptive names',
                description: 'Names should clearly describe what the function does',
                good: ['calculateTotalPrice', 'sendEmailNotification', 'validateUserInput'],
                bad: ['calc', 'send', 'check']
            },
            {
                rule: 'Start with action verbs',
                description: 'Function names should begin with a verb indicating the action',
                good: ['getUserById', 'saveDocument', 'parseConfigFile'],
                bad: ['userById', 'document', 'configFile']
            },
            {
                rule: 'Be consistent',
                description: 'Use the same naming patterns throughout the codebase',
                good: ['getUser, getProduct, getOrder'],
                bad: ['getUser, fetchProduct, retrieveOrder']
            },
            {
                rule: 'Avoid abbreviations',
                description: 'Use full words unless abbreviation is universally understood',
                good: ['getUserName', 'calculateAverage', 'formatDateTime'],
                bad: ['getUsrNm', 'calcAvg', 'fmtDT']
            }
        ],
        booleans: [
            {
                rule: 'Use question-like prefixes',
                description: 'Boolean-returning functions should read like questions',
                good: ['isValid', 'hasPermission', 'canEdit', 'shouldRetry'],
                bad: ['valid', 'permission', 'edit', 'retry']
            }
        ],
        gettersSetters: [
            {
                rule: 'Use get/set prefixes',
                description: 'Property accessors should use get/set',
                good: ['getName', 'setName', 'getCount', 'setCount'],
                bad: ['name', 'updateName', 'count', 'changeCount']
            }
        ],
        eventHandlers: [
            {
                rule: 'Use handle or on prefix',
                description: 'Event handlers should indicate they respond to events',
                good: ['handleClick', 'onSubmit', 'handleUserLogin'],
                bad: ['click', 'submit', 'userLogin']
            }
        ],
        async: [
            {
                rule: 'Consider async in naming',
                description: 'Async operations can use fetch, load, or Async suffix',
                good: ['fetchUserData', 'loadConfiguration', 'saveAsync'],
                bad: ['getUserData', 'configuration', 'save']
            }
        ]
    };

    /**
     * Gets all guidelines
     * @returns {Object} All guidelines
     */
    static getAll() {
        return this.guidelines;
    }

    /**
     * Gets guidelines for a category
     * @param {string} category - Category name
     * @returns {Array} Guidelines
     */
    static getCategory(category) {
        return this.guidelines[category] || [];
    }

    /**
     * Formats guidelines as documentation
     * @returns {string} Formatted documentation
     */
    static format() {
        let doc = '# Function Naming Style Guide\n\n';

        for (const [category, rules] of Object.entries(this.guidelines)) {
            doc += `## ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;

            for (const rule of rules) {
                doc += `### ${rule.rule}\n`;
                doc += `${rule.description}\n\n`;
                doc += `Good: ${rule.good.join(', ')}\n`;
                doc += `Bad: ${rule.bad.join(', ')}\n\n`;
            }
        }

        return doc;
    }
}

/**
 * FunctionNameGenerator helps generate appropriate function names.
 * Based on purpose and context.
 */
class FunctionNameGenerator {
    constructor() {
        this.templates = {
            crud: {
                create: ['create{Entity}', 'add{Entity}', 'insert{Entity}'],
                read: ['get{Entity}', 'find{Entity}', 'fetch{Entity}'],
                update: ['update{Entity}', 'modify{Entity}', 'change{Entity}'],
                delete: ['delete{Entity}', 'remove{Entity}', 'destroy{Entity}']
            },
            validation: {
                check: ['validate{Entity}', 'check{Entity}', 'verify{Entity}'],
                boolean: ['is{Entity}Valid', 'has{Entity}', 'can{Entity}']
            },
            transformation: {
                convert: ['convertTo{Format}', '{entity}To{Format}', 'transform{Entity}'],
                parse: ['parse{Format}', 'extract{Entity}', 'decode{Format}'],
                format: ['format{Entity}', 'stringify{Entity}', 'serialize{Entity}']
            }
        };
    }

    /**
     * Generates names for CRUD operations
     * @param {string} entity - Entity name
     * @returns {Object} CRUD operation names
     */
    generateCrud(entity) {
        const capitalized = entity.charAt(0).toUpperCase() + entity.slice(1);

        return {
            create: `create${capitalized}`,
            read: `get${capitalized}`,
            readMany: `get${capitalized}s`,
            readById: `get${capitalized}ById`,
            update: `update${capitalized}`,
            delete: `delete${capitalized}`
        };
    }

    /**
     * Generates name based on purpose
     * @param {string} purpose - What the function does
     * @param {string} entity - What it operates on
     * @returns {Array} Suggested names
     */
    generate(purpose, entity) {
        const capitalized = entity.charAt(0).toUpperCase() + entity.slice(1);
        const suggestions = [];

        for (const [category, operations] of Object.entries(this.templates)) {
            for (const [op, templates] of Object.entries(operations)) {
                if (purpose.toLowerCase().includes(op)) {
                    templates.forEach(t => {
                        suggestions.push(
                            t.replace('{Entity}', capitalized)
                                .replace('{entity}', entity)
                                .replace('{Format}', capitalized)
                        );
                    });
                }
            }
        }

        return suggestions;
    }
}

// Demonstration
console.log('=== How to Name Functions Demo ===\n');

// Naming convention examples
console.log('--- Naming Conventions ---');
const camelCase = new CamelCaseConvention();
const snakeCase = new SnakeCaseConvention();

console.log('camelCase validation:');
console.log('  calculateTotal:', camelCase.validate('calculateTotal'));
console.log('  Calculate_Total:', camelCase.validate('Calculate_Total'));

console.log('\nConversion to snake_case:', snakeCase.convert('getUserName'));

// Analyze function names
console.log('\n--- Function Name Analysis ---');
const analyzer = new FunctionNameAnalyzer();

const names = ['getUserById', 'process', 'x', 'validateUserInputFromFormSubmission'];
names.forEach(name => {
    const result = analyzer.analyze(name);
    console.log(`\n${name}:`);
    console.log(`  Score: ${result.score}/100`);
    console.log(`  Valid: ${result.valid}`);
    if (result.issues.length > 0) {
        console.log(`  Issues:`, result.issues.map(i => i.message));
    }
});

// Boolean function analysis
console.log('\n--- Boolean Function Analysis ---');
const boolAnalysis = analyzer.analyze('checkValid', { returnType: 'boolean' });
console.log('checkValid (returns boolean):', boolAnalysis.issues);

const goodBool = analyzer.analyze('isValid', { returnType: 'boolean' });
console.log('isValid (returns boolean):', goodBool.issues.length === 0 ? 'OK' : goodBool.issues);

// Verb prefix guide
console.log('\n--- Verb Prefix Guide (sample) ---');
const verbGuide = analyzer.getVerbGuide();
['get', 'validate', 'create'].forEach(verb => {
    console.log(`${verb}: ${verbGuide[verb].meaning}`);
    console.log(`  Examples: ${verbGuide[verb].examples.join(', ')}`);
});

// Name generation
console.log('\n--- Name Generation ---');
const generator = new FunctionNameGenerator();

console.log('CRUD names for "user":');
console.log(generator.generateCrud('user'));

console.log('\nSuggestions for "validate" + "email":');
console.log(generator.generate('validate', 'email'));

// Style guide
console.log('\n--- Style Guide Sample ---');
const generalRules = NamingStyleGuide.getCategory('general');
console.log('General Rules:');
generalRules.slice(0, 2).forEach(rule => {
    console.log(`  ${rule.rule}`);
    console.log(`    Good: ${rule.good[0]}`);
    console.log(`    Bad: ${rule.bad[0]}`);
});

/**
 * Best Practices for Naming Functions:
 *
 * 1. Use descriptive names that reveal intent
 * 2. Start with action verbs (get, set, is, has, create, delete)
 * 3. Follow consistent naming conventions (camelCase or snake_case)
 * 4. Avoid abbreviations unless universally understood
 * 5. Boolean functions should read like questions (isValid, hasPermission)
 * 6. Keep names concise but complete
 * 7. Use domain-specific terminology when appropriate
 * 8. Names should make code self-documenting
 * 9. Avoid generic names (process, handle, do)
 * 10. Review names during code review
 */
