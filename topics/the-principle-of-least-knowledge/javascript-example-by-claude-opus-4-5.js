/**
 * The Principle of Least Knowledge (Law of Demeter)
 *
 * The Principle of Least Knowledge states that an object should only
 * communicate with its immediate neighbors, not with objects further away
 * in the system. This reduces coupling between modules and improves
 * maintainability, scalability, and testability of software systems.
 *
 * Key Concepts:
 * - Limited object knowledge
 * - Loose coupling
 * - Encapsulation
 * - Testable design
 */

/**
 * DemeterRule defines the Law of Demeter rules.
 */
class DemeterRule {
    static rules = {
        self: {
            name: 'Talk to Yourself',
            description: 'An object can call its own methods',
            example: 'this.calculateTotal()',
            testImplication: 'Test internal methods independently'
        },
        parameters: {
            name: 'Talk to Parameters',
            description: 'Can call methods on objects passed as parameters',
            example: 'process(order) { order.validate() }',
            testImplication: 'Mock parameters for isolation'
        },
        created: {
            name: 'Talk to Created Objects',
            description: 'Can call methods on objects you create',
            example: 'const helper = new Helper(); helper.doWork()',
            testImplication: 'Test object creation separately'
        },
        fields: {
            name: 'Talk to Direct Fields',
            description: 'Can call methods on direct instance variables',
            example: 'this.validator.check()',
            testImplication: 'Inject dependencies for testing'
        },
        globals: {
            name: 'Talk to Globals (carefully)',
            description: 'Can access global objects if necessary',
            example: 'Logger.log()',
            testImplication: 'Mock global dependencies'
        }
    };

    /**
     * Gets rule by name
     * @param {string} name - Rule name
     * @returns {Object} Rule details
     */
    static getRule(name) {
        return this.rules[name];
    }

    /**
     * Gets all rules
     * @returns {Array} All rules
     */
    static getAllRules() {
        return Object.entries(this.rules).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * DemeterViolation identifies violations.
 */
class DemeterViolation {
    static patterns = {
        trainWreck: {
            name: 'Train Wreck',
            pattern: 'a.getB().getC().doSomething()',
            problem: 'Method chain traverses multiple objects',
            fix: 'Create wrapper method: a.doSomethingOnC()',
            severity: 'high'
        },
        deepNavigation: {
            name: 'Deep Navigation',
            pattern: 'order.getCustomer().getAddress().getCity()',
            problem: 'Navigating deep object graphs',
            fix: 'order.getShippingCity()',
            severity: 'medium'
        },
        exposedInternals: {
            name: 'Exposed Internals',
            pattern: 'collection.getInternalList().add(item)',
            problem: 'Internal implementation exposed',
            fix: 'collection.addItem(item)',
            severity: 'high'
        },
        temporaryVariable: {
            name: 'Temporary Variable Chain',
            pattern: 'temp = a.getB(); result = temp.getC()',
            problem: 'Still violates principle despite temp variable',
            fix: 'Ask a to provide what you need directly',
            severity: 'low'
        }
    };

    /**
     * Analyzes code for violations
     * @param {string} code - Code to analyze
     * @returns {Array} Found violations
     */
    static analyze(code) {
        const violations = [];

        // Check for method chains (simplified analysis)
        const chainPattern = /\.\w+\(\)\.\w+\(\)/g;
        const chains = code.match(chainPattern);

        if (chains) {
            chains.forEach(chain => {
                violations.push({
                    type: 'trainWreck',
                    code: chain,
                    recommendation: 'Break chain with wrapper method'
                });
            });
        }

        return violations;
    }

    /**
     * Gets all violation patterns
     * @returns {Array} All patterns
     */
    static getAllPatterns() {
        return Object.entries(this.patterns).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

/**
 * TestableDesign shows how Demeter improves testability.
 */
class TestableDesign {
    /**
     * Demonstrates poor design (violates Demeter)
     */
    static poorDesignExample() {
        return {
            code: `
// Violates Law of Demeter
class OrderProcessor {
    processOrder(order) {
        // Train wreck - hard to test
        const city = order.getCustomer().getAddress().getCity();
        const tax = this.taxService.getTaxRates().getRate(city);
        order.getLineItems().forEach(item => {
            item.getProduct().applyTax(tax);
        });
    }
}`,
            problems: [
                'Requires mocking deep object hierarchies',
                'Tests break when any intermediate object changes',
                'High coupling between classes',
                'Difficult to isolate unit under test'
            ],
            testingDifficulty: 'High - need to mock Customer, Address, Product, etc.'
        };
    }

    /**
     * Demonstrates good design (follows Demeter)
     */
    static goodDesignExample() {
        return {
            code: `
// Follows Law of Demeter
class OrderProcessor {
    processOrder(order) {
        // Ask order directly for what we need
        const city = order.getShippingCity();
        const tax = this.taxService.getRateForCity(city);
        order.applyTax(tax);
    }
}`,
            benefits: [
                'Simple mocks - just mock order and taxService',
                'Tests are resilient to internal changes',
                'Clear interface boundaries',
                'Easy to isolate unit under test'
            ],
            testingDifficulty: 'Low - mock direct dependencies only'
        };
    }

    /**
     * Shows test comparison
     * @returns {Object} Comparison
     */
    static testComparison() {
        return {
            poorDesign: {
                mocksRequired: [
                    'Order', 'Customer', 'Address',
                    'TaxService', 'TaxRates', 'LineItem', 'Product'
                ],
                setupLines: '~30 lines',
                fragility: 'High - breaks often'
            },
            goodDesign: {
                mocksRequired: ['Order', 'TaxService'],
                setupLines: '~5 lines',
                fragility: 'Low - stable tests'
            }
        };
    }
}

/**
 * DependencyInjection shows how DI enables Demeter compliance.
 */
class DependencyInjection {
    /**
     * Demonstrates constructor injection
     * @returns {Object} Example
     */
    static constructorInjection() {
        return {
            pattern: 'Constructor Injection',
            code: `
class OrderService {
    constructor(validator, repository, notifier) {
        this.validator = validator;
        this.repository = repository;
        this.notifier = notifier;
    }

    process(order) {
        this.validator.validate(order);
        this.repository.save(order);
        this.notifier.notify(order);
    }
}`,
            testability: 'Easy to inject mocks via constructor',
            demeterCompliance: 'Talks only to injected dependencies'
        };
    }

    /**
     * Shows testing with injection
     * @returns {Object} Test example
     */
    static testWithInjection() {
        return {
            code: `
// Clean test setup
const mockValidator = { validate: jest.fn() };
const mockRepository = { save: jest.fn() };
const mockNotifier = { notify: jest.fn() };

const service = new OrderService(
    mockValidator,
    mockRepository,
    mockNotifier
);

// Test is isolated and simple
service.process(order);
expect(mockValidator.validate).toHaveBeenCalledWith(order);`,
            benefit: 'Each dependency can be mocked independently'
        };
    }
}

/**
 * RefactoringForDemeter provides refactoring strategies.
 */
class RefactoringForDemeter {
    static strategies = {
        tellDontAsk: {
            name: 'Tell, Don\'t Ask',
            before: 'if (order.getStatus() === "complete") order.ship()',
            after: 'order.shipIfComplete()',
            explanation: 'Push behavior into the object instead of querying'
        },
        wrapperMethods: {
            name: 'Wrapper Methods',
            before: 'order.getCustomer().getEmail()',
            after: 'order.getCustomerEmail()',
            explanation: 'Create delegate methods to hide traversal'
        },
        introduceParameter: {
            name: 'Introduce Parameter',
            before: 'process() { doWork(this.config.getSetting()) }',
            after: 'process(setting) { doWork(setting) }',
            explanation: 'Pass required data instead of navigating to it'
        },
        extractInterface: {
            name: 'Extract Interface',
            before: 'depends on concrete Customer class',
            after: 'depends on CustomerInfo interface',
            explanation: 'Depend on narrow interface, not full object'
        }
    };

    /**
     * Gets all strategies
     * @returns {Array} All strategies
     */
    static getAllStrategies() {
        return Object.entries(this.strategies).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }

    /**
     * Recommends refactoring for violation
     * @param {string} violationType - Type of violation
     * @returns {Object} Recommendation
     */
    static recommend(violationType) {
        const recommendations = {
            trainWreck: ['wrapperMethods', 'tellDontAsk'],
            deepNavigation: ['wrapperMethods', 'introduceParameter'],
            exposedInternals: ['tellDontAsk', 'extractInterface'],
            temporaryVariable: ['wrapperMethods']
        };

        return {
            violation: violationType,
            strategies: (recommendations[violationType] || []).map(s =>
                this.strategies[s]
            )
        };
    }
}

/**
 * CouplingMetrics measures coupling related to Demeter.
 */
class CouplingMetrics {
    /**
     * Calculates coupling score
     * @param {Object} classInfo - Class information
     * @returns {Object} Coupling analysis
     */
    static analyze(classInfo) {
        const directDependencies = classInfo.directDependencies || 0;
        const indirectDependencies = classInfo.indirectDependencies || 0;
        const methodChains = classInfo.methodChains || 0;

        const couplingScore = directDependencies +
            (indirectDependencies * 2) +
            (methodChains * 3);

        let rating;
        if (couplingScore < 5) rating = 'Low';
        else if (couplingScore < 10) rating = 'Moderate';
        else if (couplingScore < 20) rating = 'High';
        else rating = 'Very High';

        return {
            directDependencies,
            indirectDependencies,
            methodChains,
            couplingScore,
            rating,
            demeterCompliance: methodChains === 0 && indirectDependencies < 2
                ? 'Good'
                : 'Needs improvement',
            testabilityImpact: rating === 'Low' || rating === 'Moderate'
                ? 'Easy to test'
                : 'Difficult to test in isolation'
        };
    }
}

// Demonstration
console.log('=== Principle of Least Knowledge (Law of Demeter) Demo ===\n');

// Demeter rules
console.log('--- Law of Demeter Rules ---');
DemeterRule.getAllRules().forEach(rule => {
    console.log(`\n${rule.name}: ${rule.description}`);
    console.log(`  Example: ${rule.example}`);
});

// Violation patterns
console.log('\n--- Violation Patterns ---');
DemeterViolation.getAllPatterns().slice(0, 3).forEach(pattern => {
    console.log(`\n${pattern.name}: ${pattern.pattern}`);
    console.log(`  Problem: ${pattern.problem}`);
    console.log(`  Fix: ${pattern.fix}`);
});

// Design comparison
console.log('\n--- Design Comparison ---');
console.log('Poor Design:', TestableDesign.poorDesignExample().testingDifficulty);
console.log('Good Design:', TestableDesign.goodDesignExample().testingDifficulty);
console.log('\nTest Comparison:', TestableDesign.testComparison());

// Dependency injection
console.log('\n--- Dependency Injection ---');
const diExample = DependencyInjection.constructorInjection();
console.log('Pattern:', diExample.pattern);
console.log('Testability:', diExample.testability);

// Refactoring strategies
console.log('\n--- Refactoring Strategies ---');
RefactoringForDemeter.getAllStrategies().slice(0, 3).forEach(strategy => {
    console.log(`\n${strategy.name}:`);
    console.log(`  Before: ${strategy.before}`);
    console.log(`  After: ${strategy.after}`);
});

// Coupling metrics
console.log('\n--- Coupling Analysis ---');
console.log('Low coupling class:', CouplingMetrics.analyze({
    directDependencies: 2,
    indirectDependencies: 0,
    methodChains: 0
}));

console.log('High coupling class:', CouplingMetrics.analyze({
    directDependencies: 5,
    indirectDependencies: 4,
    methodChains: 3
}));

/**
 * Benefits of Following the Principle of Least Knowledge:
 *
 * 1. Improved testability - fewer mocks needed
 * 2. Reduced coupling between classes
 * 3. Better encapsulation of internals
 * 4. More maintainable code
 * 5. Easier refactoring without breaking tests
 * 6. Clear interface boundaries
 * 7. Simpler test setup
 * 8. More resilient tests
 * 9. Better separation of concerns
 * 10. Scalable architecture
 */
