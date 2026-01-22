/**
 * Moore's Law - Exponential Growth in Computing Power
 *
 * Moore's Law is a prediction made by Gordon Moore, co-founder of Intel
 * Corporation, in 1965. The law stated that the number of transistors on
 * an integrated circuit would double approximately every two years while
 * the cost per transistor would decrease. This observation has driven
 * expectations and planning in the semiconductor industry for decades.
 *
 * Key Concepts:
 * - Transistor count doubles approximately every 2 years
 * - Cost per transistor decreases over time
 * - Enables exponential growth in computing power
 * - Has implications for software and testing strategies
 */

/**
 * MooresLawCalculator provides calculations based on Moore's Law.
 * Projects transistor counts and performance over time.
 */
class MooresLawCalculator {
    constructor(options = {}) {
        this.doublingPeriodYears = options.doublingPeriodYears || 2;
        this.baseYear = options.baseYear || 1971;
        this.baseTransistorCount = options.baseTransistorCount || 2300; // Intel 4004
    }

    /**
     * Calculates transistor count for a given year
     * @param {number} year - Target year
     * @returns {Object} Projection result
     */
    calculateTransistorCount(year) {
        const yearsElapsed = year - this.baseYear;
        const doublings = yearsElapsed / this.doublingPeriodYears;
        const transistorCount = this.baseTransistorCount * Math.pow(2, doublings);

        return {
            year,
            yearsFromBase: yearsElapsed,
            doublings: doublings.toFixed(1),
            transistorCount: Math.round(transistorCount),
            formattedCount: this.formatNumber(transistorCount)
        };
    }

    /**
     * Projects future transistor counts
     * @param {number} startYear - Starting year
     * @param {number} years - Number of years to project
     * @returns {Array} Projections
     */
    projectGrowth(startYear, years) {
        const projections = [];

        for (let i = 0; i <= years; i += this.doublingPeriodYears) {
            projections.push(this.calculateTransistorCount(startYear + i));
        }

        return projections;
    }

    /**
     * Calculates when a transistor count will be reached
     * @param {number} targetCount - Target transistor count
     * @returns {Object} Year prediction
     */
    calculateYearForCount(targetCount) {
        const doublings = Math.log2(targetCount / this.baseTransistorCount);
        const yearsFromBase = doublings * this.doublingPeriodYears;
        const targetYear = this.baseYear + yearsFromBase;

        return {
            targetCount: this.formatNumber(targetCount),
            doublings: doublings.toFixed(2),
            predictedYear: Math.round(targetYear)
        };
    }

    /**
     * Calculates growth rate between two data points
     * @param {Object} earlier - Earlier data point {year, count}
     * @param {Object} later - Later data point {year, count}
     * @returns {Object} Growth analysis
     */
    analyzeActualGrowth(earlier, later) {
        const yearsDiff = later.year - earlier.year;
        const countRatio = later.count / earlier.count;
        const actualDoublings = Math.log2(countRatio);
        const actualDoublingPeriod = yearsDiff / actualDoublings;
        const mooresLawExpected = earlier.count * Math.pow(2, yearsDiff / this.doublingPeriodYears);

        return {
            period: `${earlier.year}-${later.year}`,
            actualDoublingPeriod: actualDoublingPeriod.toFixed(2) + ' years',
            doublings: actualDoublings.toFixed(2),
            mooresLawCompliance: ((later.count / mooresLawExpected) * 100).toFixed(1) + '%',
            fasterOrSlower: actualDoublingPeriod < this.doublingPeriodYears ? 'faster' : 'slower'
        };
    }

    /**
     * Formats large numbers for readability
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + ' trillion';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + ' billion';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + ' million';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + ' thousand';
        return num.toString();
    }
}

/**
 * ProcessorHistory tracks historical processor data.
 * Demonstrates Moore's Law through real examples.
 */
class ProcessorHistory {
    constructor() {
        // Historical processor data (simplified/representative)
        this.processors = [
            { name: 'Intel 4004', year: 1971, transistors: 2300 },
            { name: 'Intel 8080', year: 1974, transistors: 6000 },
            { name: 'Intel 8086', year: 1978, transistors: 29000 },
            { name: 'Intel 386', year: 1985, transistors: 275000 },
            { name: 'Intel Pentium', year: 1993, transistors: 3100000 },
            { name: 'Intel Pentium 4', year: 2000, transistors: 42000000 },
            { name: 'Intel Core 2 Duo', year: 2006, transistors: 291000000 },
            { name: 'Intel Core i7 (1st)', year: 2008, transistors: 731000000 },
            { name: 'Intel Core i7 (4th)', year: 2013, transistors: 1400000000 },
            { name: 'Apple M1', year: 2020, transistors: 16000000000 },
            { name: 'Apple M2 Ultra', year: 2023, transistors: 134000000000 }
        ];
    }

    /**
     * Gets all processor data
     * @returns {Array} Processor history
     */
    getAll() {
        return this.processors.map(p => ({
            ...p,
            formattedTransistors: this.formatCount(p.transistors)
        }));
    }

    /**
     * Formats transistor count
     * @param {number} count - Transistor count
     * @returns {string} Formatted count
     */
    formatCount(count) {
        if (count >= 1e9) return (count / 1e9).toFixed(1) + 'B';
        if (count >= 1e6) return (count / 1e6).toFixed(1) + 'M';
        if (count >= 1e3) return (count / 1e3).toFixed(1) + 'K';
        return count.toString();
    }

    /**
     * Finds processors within a year range
     * @param {number} startYear - Start year
     * @param {number} endYear - End year
     * @returns {Array} Matching processors
     */
    findByYearRange(startYear, endYear) {
        return this.processors.filter(p =>
            p.year >= startYear && p.year <= endYear
        );
    }

    /**
     * Calculates growth between two processors
     * @param {string} earlierName - Earlier processor name
     * @param {string} laterName - Later processor name
     * @returns {Object} Growth analysis
     */
    compareProcessors(earlierName, laterName) {
        const earlier = this.processors.find(p => p.name === earlierName);
        const later = this.processors.find(p => p.name === laterName);

        if (!earlier || !later) {
            return { error: 'Processor not found' };
        }

        const years = later.year - earlier.year;
        const multiplier = later.transistors / earlier.transistors;
        const doublings = Math.log2(multiplier);

        return {
            earlier: earlier.name,
            later: later.name,
            yearSpan: years,
            multiplier: multiplier.toFixed(0) + 'x',
            doublings: doublings.toFixed(2),
            avgDoublingPeriod: (years / doublings).toFixed(2) + ' years'
        };
    }
}

/**
 * MooresLawImplications analyzes broader implications.
 * Explores effects on software development and testing.
 */
class MooresLawImplications {
    /**
     * Gets implications for software development
     * @returns {Array} Implications
     */
    static getSoftwareImplications() {
        return [
            {
                area: 'Performance Optimization',
                implication: 'Hardware improvements may mask inefficient code',
                consideration: 'Balance optimization effort vs hardware cost'
            },
            {
                area: 'Software Complexity',
                implication: 'More compute enables more complex applications',
                consideration: 'Complexity increases testing requirements'
            },
            {
                area: 'Test Coverage',
                implication: 'Faster hardware enables more comprehensive testing',
                consideration: 'Can run more tests in same time budget'
            },
            {
                area: 'Simulation & Modeling',
                implication: 'Complex simulations become feasible',
                consideration: 'Test scenarios can be more realistic'
            },
            {
                area: 'AI/ML Testing',
                implication: 'Enables sophisticated test generation',
                consideration: 'AI-powered testing tools emerge'
            },
            {
                area: 'Mobile & Edge',
                implication: 'Powerful devices require diverse testing',
                consideration: 'Test across many device capabilities'
            }
        ];
    }

    /**
     * Gets implications for testing strategies
     * @returns {Array} Testing implications
     */
    static getTestingImplications() {
        return [
            {
                strategy: 'Parallelization',
                benefit: 'Run tests across multiple cores',
                approach: 'Design tests for parallel execution'
            },
            {
                strategy: 'Continuous Testing',
                benefit: 'Faster feedback loops',
                approach: 'Integrate testing into CI/CD pipelines'
            },
            {
                strategy: 'Property-Based Testing',
                benefit: 'Generate thousands of test cases',
                approach: 'Use randomized testing frameworks'
            },
            {
                strategy: 'Load Testing',
                benefit: 'Simulate larger user loads',
                approach: 'Scale test infrastructure as needed'
            },
            {
                strategy: 'Visual Regression',
                benefit: 'Compare more screenshots faster',
                approach: 'Implement automated visual testing'
            }
        ];
    }

    /**
     * Gets Moore's Law challenges and future outlook
     * @returns {Object} Challenges and outlook
     */
    static getChallengesAndOutlook() {
        return {
            currentChallenges: [
                'Physical limits of transistor miniaturization',
                'Heat dissipation at smaller scales',
                'Quantum tunneling effects',
                'Increasing manufacturing costs',
                'Power consumption constraints'
            ],
            futureDirections: [
                'Multi-core and parallel architectures',
                '3D chip stacking',
                'Specialized accelerators (GPU, TPU)',
                'Quantum computing',
                'Neuromorphic computing',
                'New materials beyond silicon'
            ],
            testingConsiderations: [
                'Test across diverse hardware configurations',
                'Consider heterogeneous computing',
                'Account for varying core counts',
                'Test power-efficiency scenarios',
                'Plan for new computing paradigms'
            ]
        };
    }
}

/**
 * PerformanceProjector projects performance improvements.
 * Estimates future capabilities based on Moore's Law.
 */
class PerformanceProjector {
    /**
     * Projects how long a task will take in the future
     * @param {Object} current - Current benchmark
     * @param {number} targetYear - Future year
     * @returns {Object} Projection
     */
    static projectTaskDuration(current, targetYear) {
        const { year, taskName, durationMs } = current;
        const yearsAhead = targetYear - year;
        const doublings = yearsAhead / 2; // Moore's Law period
        const speedup = Math.pow(2, doublings);
        const projectedDuration = durationMs / speedup;

        return {
            taskName,
            currentYear: year,
            targetYear,
            currentDuration: `${durationMs}ms`,
            projectedDuration: projectedDuration < 1
                ? `${(projectedDuration * 1000).toFixed(2)}μs`
                : `${projectedDuration.toFixed(2)}ms`,
            speedup: speedup.toFixed(1) + 'x'
        };
    }

    /**
     * Projects test suite execution time improvements
     * @param {Object} testSuite - Test suite info
     * @param {number} yearsAhead - Years to project
     * @returns {Object} Projection
     */
    static projectTestSuiteTime(testSuite, yearsAhead) {
        const { name, currentTests, currentDurationMinutes } = testSuite;
        const speedup = Math.pow(2, yearsAhead / 2);

        // Assume test count grows but hardware speeds up execution
        const projectedTests = Math.round(currentTests * (1 + yearsAhead * 0.1));
        const projectedDuration = (currentDurationMinutes * projectedTests / currentTests) / speedup;

        return {
            suiteName: name,
            currentTests,
            projectedTests,
            currentDuration: `${currentDurationMinutes} minutes`,
            projectedDuration: `${projectedDuration.toFixed(1)} minutes`,
            netEffect: projectedDuration < currentDurationMinutes ? 'faster' : 'slower',
            testsPerMinute: {
                current: (currentTests / currentDurationMinutes).toFixed(1),
                projected: (projectedTests / projectedDuration).toFixed(1)
            }
        };
    }

    /**
     * Estimates when a performance target will be achievable
     * @param {Object} params - Current performance and target
     * @returns {Object} Timeline estimate
     */
    static estimateTargetYear(params) {
        const { currentPerformance, targetPerformance, currentYear } = params;
        const requiredSpeedup = targetPerformance / currentPerformance;
        const requiredDoublings = Math.log2(requiredSpeedup);
        const yearsRequired = requiredDoublings * 2;

        return {
            currentPerformance,
            targetPerformance,
            requiredSpeedup: requiredSpeedup.toFixed(1) + 'x',
            doublings: requiredDoublings.toFixed(1),
            estimatedYear: Math.round(currentYear + yearsRequired),
            yearsFromNow: Math.round(yearsRequired)
        };
    }
}

/**
 * CostProjector projects cost reductions over time.
 */
class CostProjector {
    /**
     * Projects cost per unit of computation
     * @param {Object} baseline - Baseline cost data
     * @param {number} targetYear - Target year
     * @returns {Object} Cost projection
     */
    static projectComputeCost(baseline, targetYear) {
        const { year, costPerUnit, unitDescription } = baseline;
        const yearsAhead = targetYear - year;
        const costReduction = Math.pow(0.5, yearsAhead / 2); // Halves every 2 years
        const projectedCost = costPerUnit * costReduction;

        return {
            unitDescription,
            baselineYear: year,
            targetYear,
            baselineCost: `$${costPerUnit.toFixed(4)}`,
            projectedCost: `$${projectedCost.toFixed(6)}`,
            reduction: ((1 - costReduction) * 100).toFixed(1) + '%'
        };
    }

    /**
     * Calculates cost efficiency improvements for testing infrastructure
     * @param {Object} current - Current infrastructure costs
     * @param {number} yearsAhead - Projection period
     * @returns {Object} Efficiency projection
     */
    static projectTestInfrastructureCost(current, yearsAhead) {
        const { monthlyCost, testCapacity, year } = current;
        const costReduction = Math.pow(0.5, yearsAhead / 2);
        const capacityIncrease = Math.pow(2, yearsAhead / 2);

        return {
            currentYear: year,
            projectedYear: year + yearsAhead,
            current: {
                monthlyCost: `$${monthlyCost}`,
                testCapacity: testCapacity,
                costPerTest: `$${(monthlyCost / testCapacity).toFixed(4)}`
            },
            projected: {
                sameBudgetCapacity: Math.round(testCapacity * capacityIncrease),
                sameCapacityCost: `$${(monthlyCost * costReduction).toFixed(2)}`,
                costPerTest: `$${(monthlyCost * costReduction / testCapacity).toFixed(6)}`
            }
        };
    }
}

// Demonstration
console.log("=== Moore's Law Demo ===\n");

// Basic calculations
console.log("--- Transistor Count Projections ---");
const calculator = new MooresLawCalculator();
console.log('1971 (Intel 4004):', calculator.calculateTransistorCount(1971));
console.log('2000:', calculator.calculateTransistorCount(2000));
console.log('2024:', calculator.calculateTransistorCount(2024));

// Growth projection
console.log('\n--- Growth Projection (2024-2034) ---');
const projections = calculator.projectGrowth(2024, 10);
projections.forEach(p => {
    console.log(`${p.year}: ${p.formattedCount}`);
});

// Historical comparison
console.log('\n--- Historical Processor Data ---');
const history = new ProcessorHistory();
history.getAll().slice(0, 5).forEach(p => {
    console.log(`${p.year} ${p.name}: ${p.formattedTransistors} transistors`);
});

console.log('\n--- Processor Comparison ---');
console.log(history.compareProcessors('Intel 4004', 'Apple M1'));

// Actual growth analysis
console.log('\n--- Actual vs Moore\'s Law ---');
console.log(calculator.analyzeActualGrowth(
    { year: 1971, count: 2300 },
    { year: 2020, count: 16000000000 }
));

// Implications
console.log('\n--- Software Development Implications ---');
MooresLawImplications.getSoftwareImplications().slice(0, 3).forEach(imp => {
    console.log(`${imp.area}: ${imp.implication}`);
});

console.log('\n--- Testing Strategy Implications ---');
MooresLawImplications.getTestingImplications().slice(0, 3).forEach(imp => {
    console.log(`${imp.strategy}: ${imp.benefit}`);
});

// Future challenges
console.log('\n--- Challenges & Future Outlook ---');
const outlook = MooresLawImplications.getChallengesAndOutlook();
console.log('Current Challenges:', outlook.currentChallenges.slice(0, 3));
console.log('Future Directions:', outlook.futureDirections.slice(0, 3));

// Performance projections
console.log('\n--- Performance Projections ---');
console.log(PerformanceProjector.projectTaskDuration({
    year: 2024,
    taskName: 'Full test suite',
    durationMs: 60000
}, 2034));

console.log(PerformanceProjector.projectTestSuiteTime({
    name: 'Unit Tests',
    currentTests: 5000,
    currentDurationMinutes: 10
}, 6));

// Cost projections
console.log('\n--- Cost Projections ---');
console.log(CostProjector.projectTestInfrastructureCost({
    monthlyCost: 1000,
    testCapacity: 100000,
    year: 2024
}, 6));

/**
 * Best Practices Considering Moore's Law:
 *
 * 1. Design tests for parallel execution to leverage multi-core
 * 2. Plan infrastructure scaling based on projected costs
 * 3. Don't over-optimize prematurely - hardware will improve
 * 4. But don't rely solely on hardware to fix inefficiencies
 * 5. Prepare for diminishing returns as Moore's Law slows
 * 6. Consider specialized hardware (GPUs, TPUs) for testing
 * 7. Balance test coverage growth with execution time
 * 8. Invest in test infrastructure that scales horizontally
 * 9. Monitor actual vs projected performance improvements
 * 10. Stay informed about new computing paradigms
 */
