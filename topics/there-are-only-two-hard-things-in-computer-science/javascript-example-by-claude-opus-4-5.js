/**
 * There Are Only Two Hard Things in Computer Science
 *
 * The famous quotation states: "There are only two hard things in computer
 * science: cache invalidation and naming things." This humorous observation
 * highlights two genuinely challenging aspects of software development that
 * significantly impact testing and test automation.
 *
 * Key Concepts:
 * - Cache invalidation complexity
 * - Naming for clarity and maintainability
 * - Impact on test automation
 * - Common pitfalls and solutions
 */

/**
 * CacheInvalidation explains cache challenges and testing approaches.
 */
class CacheInvalidation {
    static concepts = {
        definition: {
            name: 'Cache Invalidation',
            description: 'Process of removing or updating cached data when source changes',
            whyHard: [
                'Distributed systems have multiple caches',
                'Race conditions between update and invalidation',
                'Determining what to invalidate is complex',
                'Performance vs consistency trade-offs'
            ]
        },
        strategies: {
            ttl: {
                name: 'Time-To-Live (TTL)',
                description: 'Cache expires after set time',
                pros: ['Simple to implement', 'Predictable'],
                cons: ['May serve stale data', 'Arbitrary timing']
            },
            writeThrough: {
                name: 'Write-Through',
                description: 'Update cache and source simultaneously',
                pros: ['Always consistent', 'No stale data'],
                cons: ['Slower writes', 'More complex']
            },
            writeInvalidate: {
                name: 'Write-Invalidate',
                description: 'Invalidate cache on writes, reload on next read',
                pros: ['Simple logic', 'Eventually consistent'],
                cons: ['Cache miss after every write']
            },
            eventDriven: {
                name: 'Event-Driven',
                description: 'Invalidate based on change events',
                pros: ['Real-time updates', 'Efficient'],
                cons: ['Complex infrastructure', 'Event ordering issues']
            }
        }
    };

    /**
     * Generates test scenarios for cache invalidation
     * @returns {Array} Test scenarios
     */
    static getTestScenarios() {
        return [
            {
                name: 'Cache Hit After Write',
                description: 'Verify cache returns updated value after source update',
                steps: ['Update source', 'Read from cache', 'Verify new value']
            },
            {
                name: 'Cache Miss After Invalidation',
                description: 'Verify cache is empty after explicit invalidation',
                steps: ['Populate cache', 'Invalidate', 'Verify cache miss']
            },
            {
                name: 'TTL Expiration',
                description: 'Verify cache expires after TTL',
                steps: ['Set value with TTL', 'Wait for expiration', 'Verify cache miss']
            },
            {
                name: 'Concurrent Updates',
                description: 'Verify consistency under concurrent writes',
                steps: ['Simulate concurrent writes', 'Verify final state', 'Check for race conditions']
            },
            {
                name: 'Distributed Invalidation',
                description: 'Verify all cache nodes are invalidated',
                steps: ['Update source', 'Check all cache nodes', 'Verify consistency']
            }
        ];
    }

    /**
     * Gets common bugs related to caching
     * @returns {Array} Common bugs
     */
    static getCommonBugs() {
        return [
            { bug: 'Stale data served', cause: 'TTL too long', test: 'Verify freshness after update' },
            { bug: 'Cache stampede', cause: 'Mass expiration', test: 'Load test with cache miss' },
            { bug: 'Inconsistent reads', cause: 'Partial invalidation', test: 'Read from multiple nodes' },
            { bug: 'Memory leak', cause: 'No eviction policy', test: 'Monitor memory under load' }
        ];
    }
}

/**
 * NamingThings explains naming challenges in code and tests.
 */
class NamingThings {
    static principles = {
        descriptive: {
            name: 'Be Descriptive',
            description: 'Names should describe purpose, not implementation',
            bad: 'data, temp, x, doStuff()',
            good: 'userProfile, cartTotal, calculateShippingCost()',
            testImpact: 'Descriptive names make tests self-documenting'
        },
        consistent: {
            name: 'Be Consistent',
            description: 'Use same terms throughout codebase',
            bad: 'user/customer/client for same concept',
            good: 'Stick to one term: "customer" everywhere',
            testImpact: 'Consistent names reduce confusion in tests'
        },
        pronounceable: {
            name: 'Be Pronounceable',
            description: 'Names should be easy to say and discuss',
            bad: 'genymdhms, modymdhms',
            good: 'generationTimestamp, modificationTimestamp',
            testImpact: 'Easier to discuss test failures'
        },
        searchable: {
            name: 'Be Searchable',
            description: 'Names should be easy to find in codebase',
            bad: 'e, d, MAX = 7',
            good: 'event, document, MAX_STUDENTS_PER_CLASS = 7',
            testImpact: 'Easy to find related tests'
        },
        intentRevealing: {
            name: 'Reveal Intent',
            description: 'Name should explain why, not just what',
            bad: 'flag, status, check()',
            good: 'isEligibleForDiscount, orderStatus, validateCreditCard()',
            testImpact: 'Test names become meaningful documentation'
        }
    };

    /**
     * Gets test naming conventions
     * @returns {Object} Naming conventions
     */
    static getTestNamingConventions() {
        return {
            patterns: [
                {
                    name: 'should_ExpectedBehavior_When_Condition',
                    example: 'should_ReturnTotal_When_CartHasItems',
                    clarity: 'High - clearly states expectation'
                },
                {
                    name: 'methodName_StateUnderTest_ExpectedResult',
                    example: 'calculateTotal_EmptyCart_ReturnsZero',
                    clarity: 'High - covers method, state, result'
                },
                {
                    name: 'Given_When_Then',
                    example: 'GivenLoggedInUser_WhenCheckout_ThenOrderCreated',
                    clarity: 'Very High - BDD style, readable'
                }
            ],
            antiPatterns: [
                { bad: 'test1, test2', problem: 'No meaning' },
                { bad: 'testCalculate', problem: 'Too vague' },
                { bad: 'testThatItWorksCorrectly', problem: 'Not specific' }
            ]
        };
    }

    /**
     * Gets variable naming patterns for tests
     * @returns {Object} Patterns
     */
    static getTestVariablePatterns() {
        return {
            fixtures: {
                pattern: 'valid/invalid + EntityName',
                examples: ['validUser', 'invalidEmail', 'expiredToken']
            },
            mocks: {
                pattern: 'mock + ServiceName',
                examples: ['mockPaymentService', 'mockUserRepository']
            },
            expected: {
                pattern: 'expected + ValueType',
                examples: ['expectedTotal', 'expectedError', 'expectedCount']
            },
            actual: {
                pattern: 'actual + ValueType',
                examples: ['actualResult', 'actualError', 'actualStatus']
            }
        };
    }
}

/**
 * TestNamingAnalyzer analyzes test names for quality.
 */
class TestNamingAnalyzer {
    /**
     * Analyzes a test name
     * @param {string} testName - Test name to analyze
     * @returns {Object} Analysis
     */
    static analyze(testName) {
        const issues = [];
        const suggestions = [];

        // Check length
        if (testName.length < 10) {
            issues.push('Name too short');
            suggestions.push('Add more context about what is being tested');
        }

        // Check for generic names
        const genericPatterns = ['test', 'check', 'verify'];
        if (genericPatterns.some(p => testName.toLowerCase() === p)) {
            issues.push('Generic name');
            suggestions.push('Describe specific behavior being tested');
        }

        // Check for numbers without context
        if (/test\d+$/.test(testName)) {
            issues.push('Numbered test name');
            suggestions.push('Replace number with meaningful description');
        }

        // Check for expected outcome
        const outcomeWords = ['should', 'returns', 'throws', 'creates', 'when'];
        const hasOutcome = outcomeWords.some(w =>
            testName.toLowerCase().includes(w)
        );
        if (!hasOutcome) {
            issues.push('No expected outcome indicated');
            suggestions.push('Add expected behavior: should_, returns_, when_');
        }

        return {
            testName,
            score: Math.max(0, 100 - issues.length * 25),
            issues,
            suggestions,
            quality: issues.length === 0 ? 'Good' :
                issues.length === 1 ? 'Fair' : 'Poor'
        };
    }

    /**
     * Suggests improved name
     * @param {string} poorName - Poor test name
     * @param {string} context - What the test does
     * @returns {string} Suggested name
     */
    static suggestName(poorName, context) {
        return `should_${context.action}_When_${context.condition}`;
    }
}

/**
 * PracticalExamples shows real-world examples.
 */
class PracticalExamples {
    /**
     * Cache invalidation test example
     * @returns {Object} Example
     */
    static cacheTestExample() {
        return {
            scenario: 'User Profile Cache',
            code: `
// Test: Cache invalidates when user updates profile
describe('UserProfileCache', () => {
    it('should_ReturnUpdatedProfile_When_UserEditsName', async () => {
        // Arrange
        const userId = 'user-123';
        const originalName = 'John Doe';
        const newName = 'Jane Doe';

        await userService.createUser(userId, { name: originalName });

        // Verify cached
        const cachedProfile = await cache.get(\`profile:\${userId}\`);
        expect(cachedProfile.name).toBe(originalName);

        // Act
        await userService.updateUser(userId, { name: newName });

        // Assert - cache should be invalidated/updated
        const updatedProfile = await userService.getUser(userId);
        expect(updatedProfile.name).toBe(newName);
    });
});`,
            keyPoints: [
                'Test verifies cache is invalidated on write',
                'Clear test name explains behavior',
                'Arrange-Act-Assert pattern used'
            ]
        };
    }

    /**
     * Good vs bad naming example
     * @returns {Object} Example
     */
    static namingComparisonExample() {
        return {
            bad: {
                code: `
// Bad naming
function test1() {
    const x = calc(a, b);
    assert(x === 10);
}`,
                problems: ['test1 is meaningless', 'x, a, b are unclear', 'calc is vague']
            },
            good: {
                code: `
// Good naming
function should_CalculateTotalWithTax_When_ItemsInCart() {
    const subtotal = 8.00;
    const taxRate = 0.25;

    const totalWithTax = calculateTotalWithTax(subtotal, taxRate);

    expect(totalWithTax).toBe(10.00);
}`,
                benefits: ['Self-documenting', 'Clear intent', 'Easy to debug']
            }
        };
    }
}

// Demonstration
console.log('=== Two Hard Things in Computer Science Demo ===\n');

// Cache invalidation
console.log('--- Cache Invalidation ---');
console.log('Why it is hard:', CacheInvalidation.concepts.definition.whyHard);

console.log('\nStrategies:');
Object.values(CacheInvalidation.concepts.strategies).forEach(strategy => {
    console.log(`\n${strategy.name}: ${strategy.description}`);
    console.log(`  Pros: ${strategy.pros.join(', ')}`);
});

console.log('\nTest Scenarios:');
CacheInvalidation.getTestScenarios().slice(0, 3).forEach(scenario => {
    console.log(`- ${scenario.name}: ${scenario.description}`);
});

// Naming things
console.log('\n--- Naming Things ---');
Object.values(NamingThings.principles).slice(0, 3).forEach(principle => {
    console.log(`\n${principle.name}: ${principle.description}`);
    console.log(`  Bad: ${principle.bad}`);
    console.log(`  Good: ${principle.good}`);
});

// Test naming conventions
console.log('\n--- Test Naming Conventions ---');
const conventions = NamingThings.getTestNamingConventions();
conventions.patterns.forEach(pattern => {
    console.log(`\n${pattern.name}`);
    console.log(`  Example: ${pattern.example}`);
});

// Analyze test names
console.log('\n--- Test Name Analysis ---');
console.log('test1:', TestNamingAnalyzer.analyze('test1'));
console.log('\nshould_ReturnTotal_When_CartNotEmpty:',
    TestNamingAnalyzer.analyze('should_ReturnTotal_When_CartNotEmpty'));

// Examples
console.log('\n--- Naming Comparison ---');
const comparison = PracticalExamples.namingComparisonExample();
console.log('Bad code problems:', comparison.bad.problems);
console.log('Good code benefits:', comparison.good.benefits);

/**
 * Key Takeaways:
 *
 * Cache Invalidation:
 * 1. Test all invalidation scenarios
 * 2. Include concurrent access tests
 * 3. Verify consistency across distributed caches
 * 4. Test TTL expiration behavior
 * 5. Monitor for stale data in production
 *
 * Naming Things:
 * 6. Test names should be self-documenting
 * 7. Use consistent naming patterns
 * 8. Include expected behavior in name
 * 9. Make names searchable
 * 10. Reveal intent, not implementation
 */
