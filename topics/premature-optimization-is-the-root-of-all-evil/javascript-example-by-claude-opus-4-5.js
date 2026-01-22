/**
 * Premature Optimization Is The Root Of All Evil
 *
 * This famous quote by Donald Knuth warns against optimizing code before
 * understanding where the actual performance bottlenecks are. Premature
 * optimization leads to complex, hard-to-maintain code while providing
 * minimal benefit. The correct approach is to write clear code first,
 * then profile to identify actual bottlenecks.
 *
 * Key Concepts:
 * - Profile before optimizing
 * - Readability over micro-optimizations
 * - Avoid unnecessary complexity
 * - Focus on algorithmic improvements first
 */

/**
 * OptimizationExample demonstrates premature vs appropriate optimization.
 */
class OptimizationExample {
    /**
     * Example of premature optimization (avoid this)
     * Micro-optimizing something that doesn't matter
     */
    static prematureExample() {
        // BAD: Using bitwise operators for "performance"
        // when readability suffers and gain is negligible
        const badCode = {
            description: 'Premature micro-optimization',
            code: `
// Using bitwise for integer division (hard to read)
const half = n >> 1;

// Manual loop unrolling
for (let i = 0; i < len; i += 4) {
    process(arr[i]);
    process(arr[i+1]);
    process(arr[i+2]);
    process(arr[i+3]);
}

// Avoiding function calls for "speed"
const sum = arr[0] + arr[1] + arr[2]; // instead of reduce
            `,
            problems: [
                'Harder to read and maintain',
                'Likely no measurable performance gain',
                'More prone to bugs',
                'Prevents compiler/engine optimizations'
            ]
        };

        // GOOD: Clear, readable code
        const goodCode = {
            description: 'Clear, readable approach',
            code: `
// Clear division
const half = Math.floor(n / 2);

// Simple loop
for (const item of arr) {
    process(item);
}

// Expressive method
const sum = arr.reduce((a, b) => a + b, 0);
            `,
            benefits: [
                'Easy to understand',
                'Maintainable',
                'Modern engines optimize well',
                'Focus on correctness first'
            ]
        };

        return { badCode, goodCode };
    }

    /**
     * Example of appropriate optimization
     * Fixing an actual algorithmic bottleneck
     */
    static appropriateExample() {
        return {
            scenario: 'Finding duplicates in array',
            before: {
                approach: 'Nested loops O(n²)',
                code: `
function findDuplicates(arr) {
    const duplicates = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                duplicates.push(arr[i]);
            }
        }
    }
    return duplicates;
}`,
                complexity: 'O(n²)',
                profileResult: 'Takes 10 seconds for 10,000 items'
            },
            after: {
                approach: 'Using Set O(n)',
                code: `
function findDuplicates(arr) {
    const seen = new Set();
    const duplicates = new Set();
    for (const item of arr) {
        if (seen.has(item)) {
            duplicates.add(item);
        }
        seen.add(item);
    }
    return [...duplicates];
}`,
                complexity: 'O(n)',
                profileResult: 'Takes 10 milliseconds for 10,000 items'
            },
            lesson: 'This optimization is appropriate because profiling showed it was a bottleneck and the fix improves algorithmic complexity, not just micro-optimization.'
        };
    }
}

/**
 * OptimizationDecisionTree helps decide when to optimize.
 */
class OptimizationDecisionTree {
    /**
     * Determines if optimization is appropriate
     * @param {Object} context - Optimization context
     * @returns {Object} Decision and reasoning
     */
    static shouldOptimize(context) {
        const {
            hasProfiledCode,
            isActualBottleneck,
            frequencyOfExecution,
            complexityIncrease,
            readabilityImpact
        } = context;

        const checks = [];

        // Check 1: Has code been profiled?
        if (!hasProfiledCode) {
            checks.push({
                check: 'Profiling',
                passed: false,
                message: 'Profile code first to identify actual bottlenecks'
            });
        }

        // Check 2: Is this actually a bottleneck?
        if (!isActualBottleneck) {
            checks.push({
                check: 'Bottleneck',
                passed: false,
                message: 'This code is not a significant performance bottleneck'
            });
        }

        // Check 3: Is this code executed frequently?
        if (frequencyOfExecution === 'rarely') {
            checks.push({
                check: 'Frequency',
                passed: false,
                message: 'Rarely executed code has minimal optimization value'
            });
        }

        // Check 4: Does optimization significantly increase complexity?
        if (complexityIncrease === 'high') {
            checks.push({
                check: 'Complexity',
                passed: false,
                message: 'High complexity increase may not be worth the trade-off'
            });
        }

        // Check 5: Does it severely impact readability?
        if (readabilityImpact === 'severe') {
            checks.push({
                check: 'Readability',
                passed: false,
                message: 'Severe readability impact harms maintainability'
            });
        }

        const shouldOptimize = checks.filter(c => !c.passed).length === 0;

        return {
            recommendation: shouldOptimize ? 'Proceed with optimization' : 'Do not optimize yet',
            checks,
            alternativeActions: shouldOptimize ? [] : this.getAlternativeActions(checks)
        };
    }

    /**
     * Gets alternative actions when optimization is not recommended
     * @param {Array} failedChecks - Checks that failed
     * @returns {Array} Alternative actions
     */
    static getAlternativeActions(failedChecks) {
        const actions = [];

        for (const check of failedChecks) {
            switch (check.check) {
                case 'Profiling':
                    actions.push('Run profiler to identify actual bottlenecks');
                    break;
                case 'Bottleneck':
                    actions.push('Focus on code that actually impacts performance');
                    break;
                case 'Frequency':
                    actions.push('Consider if this code even needs optimization');
                    break;
                case 'Complexity':
                    actions.push('Look for simpler optimization approaches');
                    break;
                case 'Readability':
                    actions.push('Add comments or consider less aggressive optimization');
                    break;
            }
        }

        return actions;
    }
}

/**
 * ProfilingStrategy demonstrates proper profiling approaches.
 */
class ProfilingStrategy {
    /**
     * Gets profiling best practices
     * @returns {Array} Best practices
     */
    static getBestPractices() {
        return [
            {
                practice: 'Profile in production-like environment',
                reason: 'Dev environments may have different characteristics',
                how: 'Use staging servers with production data volumes'
            },
            {
                practice: 'Use representative data',
                reason: 'Small test data may hide O(n²) problems',
                how: 'Test with data sizes matching production'
            },
            {
                practice: 'Measure before and after',
                reason: 'Confirms optimization actually helped',
                how: 'Create benchmarks, compare objectively'
            },
            {
                practice: 'Profile the whole system',
                reason: 'Bottleneck may be elsewhere (DB, network)',
                how: 'Use distributed tracing for full picture'
            },
            {
                practice: 'Focus on hot paths',
                reason: 'Optimizing rarely-run code wastes effort',
                how: 'Identify most frequently executed code paths'
            }
        ];
    }

    /**
     * Gets common profiling tools
     * @returns {Array} Tools
     */
    static getProfilingTools() {
        return [
            { name: 'Chrome DevTools', type: 'Browser', use: 'JavaScript profiling' },
            { name: 'Node.js --prof', type: 'Runtime', use: 'Server-side JavaScript' },
            { name: 'Clinic.js', type: 'Node.js', use: 'Performance diagnosis' },
            { name: 'console.time()', type: 'Built-in', use: 'Quick timing measurements' },
            { name: 'Performance API', type: 'Browser', use: 'Precise timing measurements' }
        ];
    }

    /**
     * Demonstrates simple profiling
     * @param {Function} fn - Function to profile
     * @param {string} name - Profile name
     * @param {number} iterations - Number of iterations
     * @returns {Object} Profile results
     */
    static simpleProfile(fn, name, iterations = 1000) {
        const times = [];

        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            fn();
            times.push(performance.now() - start);
        }

        const sorted = times.sort((a, b) => a - b);
        const sum = times.reduce((a, b) => a + b, 0);

        return {
            name,
            iterations,
            mean: (sum / iterations).toFixed(4) + 'ms',
            median: sorted[Math.floor(iterations / 2)].toFixed(4) + 'ms',
            p95: sorted[Math.floor(iterations * 0.95)].toFixed(4) + 'ms',
            min: sorted[0].toFixed(4) + 'ms',
            max: sorted[iterations - 1].toFixed(4) + 'ms'
        };
    }
}

/**
 * OptimizationPriority helps prioritize optimization efforts.
 */
class OptimizationPriority {
    /**
     * Gets optimization priority order
     * @returns {Array} Priority order
     */
    static getPriorityOrder() {
        return [
            {
                priority: 1,
                type: 'Algorithm improvements',
                impact: 'High',
                example: 'O(n²) to O(n log n)',
                effort: 'Medium'
            },
            {
                priority: 2,
                type: 'Data structure choices',
                impact: 'High',
                example: 'Array to HashMap for lookups',
                effort: 'Low'
            },
            {
                priority: 3,
                type: 'Caching',
                impact: 'High',
                example: 'Memoization of expensive operations',
                effort: 'Low-Medium'
            },
            {
                priority: 4,
                type: 'Reduce I/O operations',
                impact: 'High',
                example: 'Batch database queries',
                effort: 'Medium'
            },
            {
                priority: 5,
                type: 'Lazy evaluation',
                impact: 'Medium',
                example: 'Defer computation until needed',
                effort: 'Low'
            },
            {
                priority: 6,
                type: 'Micro-optimizations',
                impact: 'Low',
                example: 'Bitwise operations, loop unrolling',
                effort: 'Varies',
                note: 'Usually not worth it'
            }
        ];
    }

    /**
     * Analyzes a potential optimization
     * @param {Object} optimization - Optimization details
     * @returns {Object} Analysis
     */
    static analyze(optimization) {
        const { expectedSpeedup, implementationEffort, readabilityImpact, riskLevel } = optimization;

        let score = 0;

        // Higher speedup = better
        if (expectedSpeedup > 10) score += 30;
        else if (expectedSpeedup > 2) score += 20;
        else if (expectedSpeedup > 1.2) score += 10;

        // Lower effort = better
        if (implementationEffort === 'low') score += 20;
        else if (implementationEffort === 'medium') score += 10;

        // Lower readability impact = better
        if (readabilityImpact === 'none') score += 20;
        else if (readabilityImpact === 'low') score += 10;

        // Lower risk = better
        if (riskLevel === 'low') score += 15;
        else if (riskLevel === 'medium') score += 5;

        let recommendation = 'Proceed';
        if (score < 30) recommendation = 'Not recommended';
        else if (score < 50) recommendation = 'Consider carefully';

        return {
            score,
            recommendation,
            factors: { expectedSpeedup, implementationEffort, readabilityImpact, riskLevel }
        };
    }
}

// Demonstration
console.log("=== Premature Optimization Is The Root Of All Evil Demo ===\n");

// Show premature vs appropriate optimization
console.log('--- Premature vs Appropriate Optimization ---');
const examples = OptimizationExample.prematureExample();
console.log('Premature optimization problems:', examples.badCode.problems);
console.log('Clear code benefits:', examples.goodCode.benefits);

const appropriateExample = OptimizationExample.appropriateExample();
console.log('\nAppropriate optimization:');
console.log(`  Before: ${appropriateExample.before.complexity} - ${appropriateExample.before.profileResult}`);
console.log(`  After: ${appropriateExample.after.complexity} - ${appropriateExample.after.profileResult}`);
console.log(`  Lesson: ${appropriateExample.lesson}`);

// Decision tree
console.log('\n--- Should You Optimize? ---');
const decision = OptimizationDecisionTree.shouldOptimize({
    hasProfiledCode: false,
    isActualBottleneck: false,
    frequencyOfExecution: 'rarely',
    complexityIncrease: 'high',
    readabilityImpact: 'severe'
});
console.log('Decision:', decision.recommendation);
console.log('Alternative actions:', decision.alternativeActions);

// Profiling best practices
console.log('\n--- Profiling Best Practices ---');
ProfilingStrategy.getBestPractices().slice(0, 3).forEach(p => {
    console.log(`${p.practice}: ${p.reason}`);
});

// Simple profiling demo
console.log('\n--- Simple Profile Demo ---');
const profile = ProfilingStrategy.simpleProfile(
    () => Array.from({ length: 100 }, (_, i) => i * 2),
    'Array creation'
);
console.log('Profile result:', profile);

// Optimization priority
console.log('\n--- Optimization Priority Order ---');
OptimizationPriority.getPriorityOrder().slice(0, 4).forEach(p => {
    console.log(`${p.priority}. ${p.type}: ${p.impact} impact, ${p.effort} effort`);
});

// Analyze an optimization
console.log('\n--- Optimization Analysis ---');
console.log(OptimizationPriority.analyze({
    expectedSpeedup: 5,
    implementationEffort: 'low',
    readabilityImpact: 'low',
    riskLevel: 'low'
}));

/**
 * Best Practices for Performance Optimization:
 *
 * 1. Make it work correctly first, then make it fast
 * 2. Profile before optimizing - never guess
 * 3. Focus on algorithmic improvements over micro-optimizations
 * 4. Consider maintainability cost of optimizations
 * 5. Measure improvement after optimization
 * 6. Use appropriate data structures
 * 7. Optimize the hot paths identified by profiling
 * 8. Document why optimizations were made
 * 9. Consider caching before complex optimizations
 * 10. Remember: premature optimization is the root of all evil
 */
