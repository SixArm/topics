/**
 * Bayes' Theorem - Probabilistic Reasoning in Testing
 *
 * Bayes' theorem is a fundamental concept in probability theory that allows
 * updating beliefs based on new evidence. In testing, it helps calculate
 * the probability of defects, false positives/negatives, and make data-driven
 * decisions about test coverage and quality.
 *
 * Formula: P(A|B) = P(B|A) * P(A) / P(B)
 *
 * Key Concepts:
 * - Prior probability: Initial belief before evidence
 * - Posterior probability: Updated belief after evidence
 * - Likelihood: Probability of evidence given hypothesis
 * - Marginal probability: Total probability of evidence
 */

// Example 1: Bayes Calculator
class BayesCalculator {
  /**
   * Calculate posterior probability using Bayes' theorem
   * @param {number} priorA - P(A): Prior probability of A
   * @param {number} likelihoodBA - P(B|A): Probability of B given A
   * @param {number} priorB - P(B): Marginal probability of B
   * @returns {number} - P(A|B): Posterior probability of A given B
   */
  static calculate(priorA, likelihoodBA, priorB) {
    if (priorB === 0) {
      throw new Error('P(B) cannot be zero');
    }
    return (likelihoodBA * priorA) / priorB;
  }

  /**
   * Calculate marginal probability P(B) using law of total probability
   * @param {number} priorA - P(A): Prior probability of A
   * @param {number} likelihoodBA - P(B|A): Probability of B given A
   * @param {number} likelihoodBNotA - P(B|¬A): Probability of B given not A
   * @returns {number} - P(B): Marginal probability
   */
  static marginalProbability(priorA, likelihoodBA, likelihoodBNotA) {
    const priorNotA = 1 - priorA;
    return (likelihoodBA * priorA) + (likelihoodBNotA * priorNotA);
  }

  /**
   * Full Bayes calculation with marginal probability
   * @param {number} priorA - P(A): Prior probability of hypothesis
   * @param {number} likelihoodBA - P(B|A): Probability of evidence given hypothesis
   * @param {number} likelihoodBNotA - P(B|¬A): Probability of evidence given not hypothesis
   * @returns {object} - Complete calculation results
   */
  static fullCalculation(priorA, likelihoodBA, likelihoodBNotA) {
    const priorNotA = 1 - priorA;
    const marginal = this.marginalProbability(priorA, likelihoodBA, likelihoodBNotA);
    const posterior = this.calculate(priorA, likelihoodBA, marginal);

    return {
      prior: priorA,
      likelihood: likelihoodBA,
      marginal: marginal,
      posterior: posterior,
      oddsRatio: posterior / (1 - posterior),
      likelihoodRatio: likelihoodBA / likelihoodBNotA
    };
  }
}

// Example 2: Defect Prediction Model
class DefectPredictionModel {
  constructor() {
    this.historicalData = {
      totalModules: 0,
      defectiveModules: 0,
      testResults: []
    };
  }

  /**
   * Add historical data
   * @param {object} data - Historical module data
   */
  addHistoricalData(data) {
    this.historicalData.totalModules += data.totalModules;
    this.historicalData.defectiveModules += data.defectiveModules;
    if (data.testResults) {
      this.historicalData.testResults.push(...data.testResults);
    }
  }

  /**
   * Calculate prior probability of defect
   * @returns {number}
   */
  getPriorDefectProbability() {
    if (this.historicalData.totalModules === 0) return 0.1; // Default assumption
    return this.historicalData.defectiveModules / this.historicalData.totalModules;
  }

  /**
   * Predict defect probability given test results
   * @param {object} testResults - Current test results
   * @returns {object}
   */
  predictDefect(testResults) {
    const prior = this.getPriorDefectProbability();

    // P(test fails | defect exists) - sensitivity
    const sensitivity = 0.95; // Test catches 95% of defects

    // P(test fails | no defect) - false positive rate
    const falsePositiveRate = 0.05; // 5% false positives

    if (testResults.failed) {
      // Test failed - what's probability of actual defect?
      const result = BayesCalculator.fullCalculation(
        prior,
        sensitivity,
        falsePositiveRate
      );

      return {
        scenario: 'Test Failed',
        priorDefectProbability: (prior * 100).toFixed(2) + '%',
        posteriorDefectProbability: (result.posterior * 100).toFixed(2) + '%',
        interpretation: `Given the test failure, there's a ${(result.posterior * 100).toFixed(1)}% chance of an actual defect`
      };
    } else {
      // Test passed - what's probability of hidden defect?
      const result = BayesCalculator.fullCalculation(
        prior,
        1 - sensitivity, // P(test passes | defect exists)
        1 - falsePositiveRate // P(test passes | no defect)
      );

      return {
        scenario: 'Test Passed',
        priorDefectProbability: (prior * 100).toFixed(2) + '%',
        posteriorDefectProbability: (result.posterior * 100).toFixed(2) + '%',
        interpretation: `Despite passing, there's still a ${(result.posterior * 100).toFixed(1)}% chance of a hidden defect`
      };
    }
  }
}

// Example 3: Test Effectiveness Analyzer
class TestEffectivenessAnalyzer {
  constructor() {
    this.metrics = {
      truePositives: 0,  // Test failed, defect existed
      falsePositives: 0, // Test failed, no defect
      trueNegatives: 0,  // Test passed, no defect
      falseNegatives: 0  // Test passed, defect existed
    };
  }

  /**
   * Record a test result
   * @param {boolean} testFailed - Did the test fail?
   * @param {boolean} defectExisted - Was there actually a defect?
   */
  recordResult(testFailed, defectExisted) {
    if (testFailed && defectExisted) {
      this.metrics.truePositives++;
    } else if (testFailed && !defectExisted) {
      this.metrics.falsePositives++;
    } else if (!testFailed && !defectExisted) {
      this.metrics.trueNegatives++;
    } else {
      this.metrics.falseNegatives++;
    }
  }

  /**
   * Calculate sensitivity (true positive rate)
   * P(test fails | defect exists)
   * @returns {number}
   */
  getSensitivity() {
    const total = this.metrics.truePositives + this.metrics.falseNegatives;
    return total === 0 ? 0 : this.metrics.truePositives / total;
  }

  /**
   * Calculate specificity (true negative rate)
   * P(test passes | no defect)
   * @returns {number}
   */
  getSpecificity() {
    const total = this.metrics.trueNegatives + this.metrics.falsePositives;
    return total === 0 ? 0 : this.metrics.trueNegatives / total;
  }

  /**
   * Calculate positive predictive value
   * P(defect exists | test fails)
   * @returns {number}
   */
  getPositivePredictiveValue() {
    const total = this.metrics.truePositives + this.metrics.falsePositives;
    return total === 0 ? 0 : this.metrics.truePositives / total;
  }

  /**
   * Calculate negative predictive value
   * P(no defect | test passes)
   * @returns {number}
   */
  getNegativePredictiveValue() {
    const total = this.metrics.trueNegatives + this.metrics.falseNegatives;
    return total === 0 ? 0 : this.metrics.trueNegatives / total;
  }

  /**
   * Calculate accuracy
   * @returns {number}
   */
  getAccuracy() {
    const total = Object.values(this.metrics).reduce((a, b) => a + b, 0);
    return total === 0 ? 0 :
      (this.metrics.truePositives + this.metrics.trueNegatives) / total;
  }

  /**
   * Get comprehensive report
   * @returns {object}
   */
  getReport() {
    return {
      rawMetrics: { ...this.metrics },
      rates: {
        sensitivity: (this.getSensitivity() * 100).toFixed(2) + '%',
        specificity: (this.getSpecificity() * 100).toFixed(2) + '%',
        positivePredictiveValue: (this.getPositivePredictiveValue() * 100).toFixed(2) + '%',
        negativePredictiveValue: (this.getNegativePredictiveValue() * 100).toFixed(2) + '%',
        accuracy: (this.getAccuracy() * 100).toFixed(2) + '%'
      },
      falseRates: {
        falsePositiveRate: ((1 - this.getSpecificity()) * 100).toFixed(2) + '%',
        falseNegativeRate: ((1 - this.getSensitivity()) * 100).toFixed(2) + '%'
      }
    };
  }
}

// Example 4: Bayesian A/B Test Analyzer
class BayesianABTestAnalyzer {
  constructor(priorAlpha = 1, priorBeta = 1) {
    // Beta distribution priors (1,1 = uniform prior)
    this.priorAlpha = priorAlpha;
    this.priorBeta = priorBeta;
  }

  /**
   * Update belief with observed data
   * @param {number} successes - Number of successes
   * @param {number} trials - Total trials
   * @returns {object} - Posterior distribution parameters
   */
  updateBelief(successes, trials) {
    const failures = trials - successes;
    return {
      alpha: this.priorAlpha + successes,
      beta: this.priorBeta + failures,
      mean: (this.priorAlpha + successes) / (this.priorAlpha + this.priorBeta + trials),
      mode: successes > 0 && failures > 0 ?
        (this.priorAlpha + successes - 1) / (this.priorAlpha + this.priorBeta + trials - 2) : null
    };
  }

  /**
   * Compare two variants using Bayesian approach
   * @param {object} variantA - {successes, trials} for variant A
   * @param {object} variantB - {successes, trials} for variant B
   * @returns {object}
   */
  compareVariants(variantA, variantB) {
    const posteriorA = this.updateBelief(variantA.successes, variantA.trials);
    const posteriorB = this.updateBelief(variantB.successes, variantB.trials);

    // Monte Carlo simulation to estimate P(A > B)
    const simulations = 10000;
    let aWins = 0;

    for (let i = 0; i < simulations; i++) {
      const sampleA = this.sampleBeta(posteriorA.alpha, posteriorA.beta);
      const sampleB = this.sampleBeta(posteriorB.alpha, posteriorB.beta);
      if (sampleA > sampleB) aWins++;
    }

    const probABetter = aWins / simulations;

    return {
      variantA: {
        successes: variantA.successes,
        trials: variantA.trials,
        conversionRate: (variantA.successes / variantA.trials * 100).toFixed(2) + '%',
        posterior: posteriorA
      },
      variantB: {
        successes: variantB.successes,
        trials: variantB.trials,
        conversionRate: (variantB.successes / variantB.trials * 100).toFixed(2) + '%',
        posterior: posteriorB
      },
      probabilityABetter: (probABetter * 100).toFixed(2) + '%',
      probabilityBBetter: ((1 - probABetter) * 100).toFixed(2) + '%',
      recommendation: probABetter > 0.95 ? 'Choose A' :
                      probABetter < 0.05 ? 'Choose B' : 'Continue testing'
    };
  }

  /**
   * Sample from Beta distribution (approximation)
   * @param {number} alpha - Alpha parameter
   * @param {number} beta - Beta parameter
   * @returns {number}
   */
  sampleBeta(alpha, beta) {
    // Using gamma distribution method
    const gammaA = this.sampleGamma(alpha);
    const gammaB = this.sampleGamma(beta);
    return gammaA / (gammaA + gammaB);
  }

  /**
   * Sample from Gamma distribution (approximation using Marsaglia method)
   * @param {number} shape - Shape parameter
   * @returns {number}
   */
  sampleGamma(shape) {
    if (shape < 1) {
      return this.sampleGamma(shape + 1) * Math.pow(Math.random(), 1 / shape);
    }

    const d = shape - 1/3;
    const c = 1 / Math.sqrt(9 * d);

    while (true) {
      let x, v;
      do {
        x = this.sampleNormal();
        v = 1 + c * x;
      } while (v <= 0);

      v = v * v * v;
      const u = Math.random();

      if (u < 1 - 0.0331 * (x * x) * (x * x)) {
        return d * v;
      }

      if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
        return d * v;
      }
    }
  }

  /**
   * Sample from standard normal distribution (Box-Muller)
   * @returns {number}
   */
  sampleNormal() {
    const u1 = Math.random();
    const u2 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }
}

// Example 5: Risk-Based Test Prioritization
class BayesianTestPrioritizer {
  constructor() {
    this.modules = [];
  }

  /**
   * Add a module for prioritization
   * @param {object} module - Module data
   */
  addModule(module) {
    this.modules.push({
      name: module.name,
      priorDefectRate: module.priorDefectRate || 0.1,
      complexity: module.complexity || 5,
      recentChanges: module.recentChanges || 0,
      historicalDefects: module.historicalDefects || 0,
      linesOfCode: module.linesOfCode || 100,
      lastTested: module.lastTested || null
    });
  }

  /**
   * Calculate risk score for a module using Bayesian approach
   * @param {object} module - Module data
   * @returns {number}
   */
  calculateRiskScore(module) {
    // Prior: base defect probability
    let prior = module.priorDefectRate;

    // Update based on complexity (likelihood factor)
    const complexityFactor = module.complexity / 10;

    // Update based on recent changes
    const changeFactor = Math.min(module.recentChanges / 10, 1);

    // Update based on historical defects
    const historyFactor = Math.min(module.historicalDefects / 5, 1);

    // Bayesian update (simplified)
    const likelihood = (complexityFactor + changeFactor + historyFactor) / 3;

    // Posterior approximation
    const posterior = (prior * likelihood) / (prior * likelihood + (1 - prior) * (1 - likelihood));

    return {
      module: module.name,
      priorRisk: prior,
      posteriorRisk: posterior,
      factors: {
        complexity: complexityFactor,
        changes: changeFactor,
        history: historyFactor
      }
    };
  }

  /**
   * Prioritize all modules for testing
   * @returns {Array}
   */
  prioritize() {
    const scored = this.modules.map(m => this.calculateRiskScore(m));

    return scored
      .sort((a, b) => b.posteriorRisk - a.posteriorRisk)
      .map((item, index) => ({
        priority: index + 1,
        ...item,
        riskLevel: item.posteriorRisk > 0.7 ? 'HIGH' :
                   item.posteriorRisk > 0.4 ? 'MEDIUM' : 'LOW'
      }));
  }
}

// Demonstration
console.log('=== Bayes Theorem in Testing ===\n');

// Basic calculation
console.log('--- Basic Bayes Calculation ---\n');
const result = BayesCalculator.fullCalculation(0.01, 0.99, 0.05);
console.log('Scenario: Disease testing');
console.log('  Prior probability of disease: 1%');
console.log('  Test sensitivity: 99%');
console.log('  False positive rate: 5%');
console.log(`  Posterior (if test positive): ${(result.posterior * 100).toFixed(2)}%`);
console.log('  Note: Even with positive test, only ~16% chance of disease!');

// Defect prediction
console.log('\n--- Defect Prediction ---\n');
const predictor = new DefectPredictionModel();
predictor.addHistoricalData({ totalModules: 100, defectiveModules: 15 });

const failedTest = predictor.predictDefect({ failed: true });
const passedTest = predictor.predictDefect({ failed: false });

console.log('Failed Test Analysis:');
console.log(`  ${failedTest.interpretation}`);
console.log('\nPassed Test Analysis:');
console.log(`  ${passedTest.interpretation}`);

// Test effectiveness
console.log('\n--- Test Effectiveness Analysis ---\n');
const analyzer = new TestEffectivenessAnalyzer();

// Simulate test results
const testData = [
  { testFailed: true, defectExisted: true },
  { testFailed: true, defectExisted: true },
  { testFailed: true, defectExisted: false },
  { testFailed: false, defectExisted: false },
  { testFailed: false, defectExisted: false },
  { testFailed: false, defectExisted: false },
  { testFailed: false, defectExisted: true },
  { testFailed: false, defectExisted: false }
];

testData.forEach(d => analyzer.recordResult(d.testFailed, d.defectExisted));

const report = analyzer.getReport();
console.log('Test Effectiveness Report:');
console.log(`  Sensitivity: ${report.rates.sensitivity}`);
console.log(`  Specificity: ${report.rates.specificity}`);
console.log(`  Accuracy: ${report.rates.accuracy}`);
console.log(`  False Positive Rate: ${report.falseRates.falsePositiveRate}`);
console.log(`  False Negative Rate: ${report.falseRates.falseNegativeRate}`);

// Bayesian A/B testing
console.log('\n--- Bayesian A/B Test ---\n');
const abAnalyzer = new BayesianABTestAnalyzer();
const comparison = abAnalyzer.compareVariants(
  { successes: 120, trials: 1000 },
  { successes: 135, trials: 1000 }
);

console.log('Variant Comparison:');
console.log(`  Variant A: ${comparison.variantA.conversionRate}`);
console.log(`  Variant B: ${comparison.variantB.conversionRate}`);
console.log(`  P(A better): ${comparison.probabilityABetter}`);
console.log(`  P(B better): ${comparison.probabilityBBetter}`);
console.log(`  Recommendation: ${comparison.recommendation}`);

// Test prioritization
console.log('\n--- Risk-Based Test Prioritization ---\n');
const prioritizer = new BayesianTestPrioritizer();

prioritizer.addModule({ name: 'PaymentService', complexity: 9, recentChanges: 5, historicalDefects: 3 });
prioritizer.addModule({ name: 'UserAuth', complexity: 7, recentChanges: 2, historicalDefects: 1 });
prioritizer.addModule({ name: 'ReportGenerator', complexity: 4, recentChanges: 0, historicalDefects: 0 });
prioritizer.addModule({ name: 'DataImporter', complexity: 8, recentChanges: 8, historicalDefects: 4 });

const priorities = prioritizer.prioritize();
console.log('Test Priority Order:');
priorities.forEach(p => {
  console.log(`  ${p.priority}. ${p.module} - ${p.riskLevel} (${(p.posteriorRisk * 100).toFixed(1)}%)`);
});

/**
 * Bayes' Theorem Applications in Testing:
 *
 * 1. Defect Prediction: Estimate likelihood of bugs based on test results
 *
 * 2. Test Effectiveness: Understand true/false positive/negative rates
 *
 * 3. A/B Testing: Make decisions with probability estimates
 *
 * 4. Risk Prioritization: Focus testing on high-risk modules
 *
 * 5. False Positive Analysis: Understand when "failures" aren't real bugs
 *
 * Key Insight: A positive test result doesn't guarantee a defect exists!
 * The actual probability depends on the base rate of defects.
 */
