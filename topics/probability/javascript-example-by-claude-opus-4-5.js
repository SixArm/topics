/**
 * Probability - Mathematical Foundation for Uncertainty
 *
 * Probability measures the likelihood of events occurring. It is fundamental
 * to statistics, testing, risk analysis, and decision-making. Probability
 * values range from 0 (impossible) to 1 (certain). Understanding probability
 * helps in test coverage analysis, defect prediction, and reliability estimation.
 *
 * Key Concepts:
 * - Probability ranges from 0 to 1
 * - Theoretical vs empirical probability
 * - Conditional probability and Bayes' theorem
 * - Probability distributions
 */

/**
 * ProbabilityBasics provides fundamental probability calculations.
 */
class ProbabilityBasics {
    /**
     * Calculates probability of an event
     * @param {number} favorableOutcomes - Number of favorable outcomes
     * @param {number} totalOutcomes - Total possible outcomes
     * @returns {number} Probability
     */
    static calculateProbability(favorableOutcomes, totalOutcomes) {
        if (totalOutcomes === 0) return 0;
        return favorableOutcomes / totalOutcomes;
    }

    /**
     * Calculates complement probability (not A)
     * @param {number} probabilityA - Probability of event A
     * @returns {number} Probability of not A
     */
    static complement(probabilityA) {
        return 1 - probabilityA;
    }

    /**
     * Calculates probability of A AND B (intersection)
     * @param {number} probA - P(A)
     * @param {number} probB - P(B)
     * @param {boolean} independent - Are events independent?
     * @param {number} probAGivenB - P(A|B) if not independent
     * @returns {number} P(A ∩ B)
     */
    static intersection(probA, probB, independent = true, probAGivenB = null) {
        if (independent) {
            return probA * probB;
        }
        return probAGivenB * probB;
    }

    /**
     * Calculates probability of A OR B (union)
     * @param {number} probA - P(A)
     * @param {number} probB - P(B)
     * @param {number} probIntersection - P(A ∩ B)
     * @returns {number} P(A ∪ B)
     */
    static union(probA, probB, probIntersection = 0) {
        return probA + probB - probIntersection;
    }

    /**
     * Calculates conditional probability P(A|B)
     * @param {number} probIntersection - P(A ∩ B)
     * @param {number} probB - P(B)
     * @returns {number} P(A|B)
     */
    static conditional(probIntersection, probB) {
        if (probB === 0) return 0;
        return probIntersection / probB;
    }
}

/**
 * BayesTheorem implements Bayesian probability calculations.
 * Used for updating beliefs based on new evidence.
 */
class BayesTheorem {
    /**
     * Calculates posterior probability using Bayes' theorem
     * P(A|B) = P(B|A) * P(A) / P(B)
     * @param {number} priorA - Prior probability P(A)
     * @param {number} likelihoodBGivenA - Likelihood P(B|A)
     * @param {number} evidenceB - Evidence probability P(B)
     * @returns {number} Posterior P(A|B)
     */
    static calculatePosterior(priorA, likelihoodBGivenA, evidenceB) {
        if (evidenceB === 0) return 0;
        return (likelihoodBGivenA * priorA) / evidenceB;
    }

    /**
     * Calculates P(B) using law of total probability
     * @param {number} probBGivenA - P(B|A)
     * @param {number} probBGivenNotA - P(B|¬A)
     * @param {number} priorA - P(A)
     * @returns {number} P(B)
     */
    static totalProbability(probBGivenA, probBGivenNotA, priorA) {
        return probBGivenA * priorA + probBGivenNotA * (1 - priorA);
    }

    /**
     * Example: Test result interpretation
     * @param {Object} params - Test parameters
     * @returns {Object} Analysis
     */
    static interpretTestResult(params) {
        const {
            prevalence,      // Prior: probability of condition
            sensitivity,     // P(positive | has condition)
            specificity      // P(negative | no condition)
        } = params;

        // P(positive test)
        const probPositive = this.totalProbability(
            sensitivity,
            1 - specificity,
            prevalence
        );

        // P(has condition | positive test)
        const positivePredictiveValue = this.calculatePosterior(
            prevalence,
            sensitivity,
            probPositive
        );

        // P(no condition | negative test)
        const probNegative = 1 - probPositive;
        const negativePredictiveValue = this.calculatePosterior(
            1 - prevalence,
            specificity,
            probNegative
        );

        return {
            positivePredictiveValue: (positivePredictiveValue * 100).toFixed(2) + '%',
            negativePredictiveValue: (negativePredictiveValue * 100).toFixed(2) + '%',
            falsePositiveRate: ((1 - specificity) * 100).toFixed(2) + '%',
            falseNegativeRate: ((1 - sensitivity) * 100).toFixed(2) + '%'
        };
    }
}

/**
 * ProbabilityDistribution provides common distributions.
 */
class ProbabilityDistribution {
    /**
     * Calculates binomial probability
     * P(X = k) = C(n,k) * p^k * (1-p)^(n-k)
     * @param {number} n - Number of trials
     * @param {number} k - Number of successes
     * @param {number} p - Probability of success
     * @returns {number} Probability
     */
    static binomial(n, k, p) {
        const coefficient = this.combinations(n, k);
        return coefficient * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }

    /**
     * Calculates combinations (n choose k)
     * @param {number} n - Total items
     * @param {number} k - Items to choose
     * @returns {number} Number of combinations
     */
    static combinations(n, k) {
        if (k > n) return 0;
        if (k === 0 || k === n) return 1;
        return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
    }

    /**
     * Calculates factorial
     * @param {number} n - Number
     * @returns {number} n!
     */
    static factorial(n) {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    /**
     * Calculates Poisson probability
     * P(X = k) = (λ^k * e^-λ) / k!
     * @param {number} lambda - Average rate
     * @param {number} k - Number of events
     * @returns {number} Probability
     */
    static poisson(lambda, k) {
        return (Math.pow(lambda, k) * Math.exp(-lambda)) / this.factorial(k);
    }

    /**
     * Calculates expected value for binomial distribution
     * @param {number} n - Number of trials
     * @param {number} p - Probability of success
     * @returns {Object} Statistics
     */
    static binomialStats(n, p) {
        const mean = n * p;
        const variance = n * p * (1 - p);
        const stdDev = Math.sqrt(variance);

        return {
            mean: mean.toFixed(2),
            variance: variance.toFixed(2),
            standardDeviation: stdDev.toFixed(2)
        };
    }
}

/**
 * TestingProbability applies probability to software testing.
 */
class TestingProbability {
    /**
     * Calculates probability of finding defects
     * @param {number} defectDensity - Defects per unit
     * @param {number} coverage - Test coverage (0-1)
     * @param {number} effectiveness - Test effectiveness (0-1)
     * @returns {Object} Defect detection probability
     */
    static defectDetectionProbability(defectDensity, coverage, effectiveness) {
        // Probability of detecting a single defect
        const detectSingle = coverage * effectiveness;

        // Expected defects found
        const expectedFound = defectDensity * detectSingle;

        // Probability of missing all defects (assuming independence)
        const missAll = Math.pow(1 - detectSingle, defectDensity);

        return {
            singleDefectDetection: (detectSingle * 100).toFixed(2) + '%',
            expectedDefectsFound: expectedFound.toFixed(2),
            probabilityFindingAtLeastOne: ((1 - missAll) * 100).toFixed(2) + '%',
            probabilityMissingAll: (missAll * 100).toFixed(2) + '%'
        };
    }

    /**
     * Estimates remaining defects
     * @param {Object} history - Testing history
     * @returns {Object} Estimate
     */
    static estimateRemainingDefects(history) {
        const { foundInPhase1, foundInPhase2, totalTests } = history;

        // Lincoln-Petersen estimator (capture-recapture)
        // N ≈ (n1 * n2) / m
        // where n1 = phase 1 finds, n2 = phase 2 finds, m = found in both

        // Simplified: using defect seeding concept
        const defectRemovalEfficiency = foundInPhase2 > 0
            ? foundInPhase1 / (foundInPhase1 + foundInPhase2)
            : 1;

        const estimatedTotal = foundInPhase1 / defectRemovalEfficiency;
        const estimatedRemaining = estimatedTotal - foundInPhase1 - foundInPhase2;

        return {
            foundPhase1: foundInPhase1,
            foundPhase2: foundInPhase2,
            removalEfficiency: (defectRemovalEfficiency * 100).toFixed(2) + '%',
            estimatedTotal: Math.ceil(estimatedTotal),
            estimatedRemaining: Math.max(0, Math.ceil(estimatedRemaining))
        };
    }

    /**
     * Calculates confidence level for test coverage
     * @param {number} n - Number of test cases
     * @param {number} k - Number of failures
     * @param {number} confidenceLevel - Desired confidence (e.g., 0.95)
     * @returns {Object} Confidence analysis
     */
    static coverageConfidence(n, k, confidenceLevel = 0.95) {
        // Using Wilson score interval
        const p = k / n;
        const z = 1.96; // For 95% confidence

        const denominator = 1 + z * z / n;
        const center = (p + z * z / (2 * n)) / denominator;
        const margin = z * Math.sqrt((p * (1 - p) + z * z / (4 * n)) / n) / denominator;

        return {
            observedRate: (p * 100).toFixed(2) + '%',
            confidenceInterval: {
                lower: (Math.max(0, center - margin) * 100).toFixed(2) + '%',
                upper: (Math.min(1, center + margin) * 100).toFixed(2) + '%'
            },
            confidenceLevel: (confidenceLevel * 100) + '%'
        };
    }
}

/**
 * RiskProbability applies probability to risk assessment.
 */
class RiskProbability {
    constructor() {
        this.risks = [];
    }

    /**
     * Adds a risk with probability and impact
     * @param {Object} risk - Risk definition
     */
    addRisk(risk) {
        this.risks.push({
            name: risk.name,
            probability: risk.probability,
            impact: risk.impact,
            expectedValue: risk.probability * risk.impact
        });
    }

    /**
     * Calculates overall risk exposure
     * @returns {Object} Risk analysis
     */
    calculateExposure() {
        const totalExpectedValue = this.risks.reduce((sum, r) => sum + r.expectedValue, 0);

        // Probability of at least one risk occurring
        const noRiskProb = this.risks.reduce((prob, r) => prob * (1 - r.probability), 1);
        const atLeastOneRisk = 1 - noRiskProb;

        return {
            totalExpectedLoss: totalExpectedValue.toFixed(2),
            probabilityAnyRisk: (atLeastOneRisk * 100).toFixed(2) + '%',
            highestRisk: this.risks.reduce((max, r) =>
                r.expectedValue > max.expectedValue ? r : max
            ),
            risks: this.risks.sort((a, b) => b.expectedValue - a.expectedValue)
        };
    }

    /**
     * Performs Monte Carlo risk simulation
     * @param {number} iterations - Number of simulations
     * @returns {Object} Simulation results
     */
    simulate(iterations = 10000) {
        const outcomes = [];

        for (let i = 0; i < iterations; i++) {
            let totalLoss = 0;

            for (const risk of this.risks) {
                if (Math.random() < risk.probability) {
                    totalLoss += risk.impact;
                }
            }

            outcomes.push(totalLoss);
        }

        outcomes.sort((a, b) => a - b);
        const mean = outcomes.reduce((a, b) => a + b, 0) / iterations;

        return {
            mean: mean.toFixed(2),
            median: outcomes[Math.floor(iterations / 2)].toFixed(2),
            p95: outcomes[Math.floor(iterations * 0.95)].toFixed(2),
            max: outcomes[iterations - 1].toFixed(2),
            zeroLossProb: ((outcomes.filter(o => o === 0).length / iterations) * 100).toFixed(2) + '%'
        };
    }
}

// Demonstration
console.log('=== Probability Demo ===\n');

// Basic probability
console.log('--- Basic Probability ---');
console.log('Probability of rolling 6:', ProbabilityBasics.calculateProbability(1, 6).toFixed(4));
console.log('Complement (not 6):', ProbabilityBasics.complement(1/6).toFixed(4));
console.log('P(A) AND P(B) independent:', ProbabilityBasics.intersection(0.5, 0.3).toFixed(4));
console.log('P(A) OR P(B):', ProbabilityBasics.union(0.5, 0.3, 0.15).toFixed(4));

// Bayes theorem
console.log('\n--- Bayes Theorem: Test Interpretation ---');
const testResult = BayesTheorem.interpretTestResult({
    prevalence: 0.01,      // 1% of population has condition
    sensitivity: 0.95,     // 95% true positive rate
    specificity: 0.90      // 90% true negative rate
});
console.log('Test with 1% prevalence, 95% sensitivity, 90% specificity:');
console.log(testResult);

// Probability distributions
console.log('\n--- Probability Distributions ---');
console.log('Binomial P(X=3) for n=10, p=0.3:', ProbabilityDistribution.binomial(10, 3, 0.3).toFixed(4));
console.log('Binomial stats:', ProbabilityDistribution.binomialStats(10, 0.3));
console.log('Poisson P(X=2) for λ=3:', ProbabilityDistribution.poisson(3, 2).toFixed(4));

// Testing probability
console.log('\n--- Testing Probability ---');
console.log('Defect detection:', TestingProbability.defectDetectionProbability(5, 0.8, 0.7));
console.log('Remaining defects:', TestingProbability.estimateRemainingDefects({
    foundInPhase1: 20,
    foundInPhase2: 5,
    totalTests: 500
}));

// Risk probability
console.log('\n--- Risk Probability ---');
const riskAnalysis = new RiskProbability();
riskAnalysis.addRisk({ name: 'Data breach', probability: 0.05, impact: 100000 });
riskAnalysis.addRisk({ name: 'System outage', probability: 0.10, impact: 50000 });
riskAnalysis.addRisk({ name: 'Minor bug', probability: 0.30, impact: 5000 });

console.log('Risk exposure:', riskAnalysis.calculateExposure());
console.log('Monte Carlo simulation:', riskAnalysis.simulate(1000));

/**
 * Best Practices for Applying Probability in Testing:
 *
 * 1. Understand the difference between theoretical and empirical probability
 * 2. Use Bayes' theorem for interpreting test results
 * 3. Consider false positive and false negative rates
 * 4. Apply probability to estimate remaining defects
 * 5. Use Monte Carlo simulation for complex risk analysis
 * 6. Calculate confidence intervals for metrics
 * 7. Account for independence assumptions
 * 8. Combine probability with historical data
 * 9. Use probability for test prioritization
 * 10. Communicate uncertainty ranges, not just point estimates
 */
