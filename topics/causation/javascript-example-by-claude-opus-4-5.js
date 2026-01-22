/**
 * Causation - Establishing Cause-and-Effect Relationships
 *
 * Causation refers to establishing cause-and-effect relationships between
 * variables. Unlike correlation, causation proves that one variable directly
 * influences another. In software testing, understanding causation helps
 * identify root causes of defects and validate that fixes actually resolve issues.
 *
 * Key Concepts:
 * - Correlation vs causation
 * - Randomized controlled experiments
 * - Counterfactual analysis
 * - Confounding variables
 * - Causal inference
 */

// Example 1: Causal Analysis Framework
class CausalAnalysisFramework {
  constructor() {
    this.observations = [];
    this.experiments = [];
    this.confoundingVariables = [];
  }

  /**
   * Add an observation
   * @param {object} observation - Observed data point
   */
  addObservation(observation) {
    this.observations.push({
      id: `OBS-${this.observations.length + 1}`,
      timestamp: new Date(),
      cause: observation.cause,
      effect: observation.effect,
      context: observation.context || {},
      confounders: observation.confounders || []
    });
  }

  /**
   * Calculate correlation between cause and effect
   * @param {string} causeVariable - Cause variable name
   * @param {string} effectVariable - Effect variable name
   * @returns {object} - Correlation analysis
   */
  calculateCorrelation(causeVariable, effectVariable) {
    const causeValues = this.observations.map(o => o.cause[causeVariable] || 0);
    const effectValues = this.observations.map(o => o.effect[effectVariable] || 0);

    if (causeValues.length < 2) {
      return { coefficient: 0, interpretation: 'Insufficient data' };
    }

    const n = causeValues.length;
    const sumX = causeValues.reduce((a, b) => a + b, 0);
    const sumY = effectValues.reduce((a, b) => a + b, 0);
    const sumXY = causeValues.reduce((acc, x, i) => acc + x * effectValues[i], 0);
    const sumX2 = causeValues.reduce((acc, x) => acc + x * x, 0);
    const sumY2 = effectValues.reduce((acc, y) => acc + y * y, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    const coefficient = denominator === 0 ? 0 : numerator / denominator;

    return {
      coefficient: coefficient.toFixed(4),
      strength: this.interpretCorrelation(coefficient),
      interpretation: this.getCorrelationInterpretation(coefficient),
      warning: 'Correlation does not imply causation!'
    };
  }

  /**
   * Interpret correlation strength
   * @param {number} r - Correlation coefficient
   * @returns {string}
   */
  interpretCorrelation(r) {
    const absR = Math.abs(r);
    if (absR >= 0.8) return 'strong';
    if (absR >= 0.5) return 'moderate';
    if (absR >= 0.3) return 'weak';
    return 'negligible';
  }

  /**
   * Get correlation interpretation
   * @param {number} r - Correlation coefficient
   * @returns {string}
   */
  getCorrelationInterpretation(r) {
    if (r > 0) return 'Positive correlation: as cause increases, effect tends to increase';
    if (r < 0) return 'Negative correlation: as cause increases, effect tends to decrease';
    return 'No linear correlation detected';
  }

  /**
   * Register a confounding variable
   * @param {object} confounder - Confounding variable details
   */
  registerConfounder(confounder) {
    this.confoundingVariables.push({
      name: confounder.name,
      description: confounder.description,
      affectsCause: confounder.affectsCause,
      affectsEffect: confounder.affectsEffect,
      controlStrategy: confounder.controlStrategy
    });
  }

  /**
   * Design an experiment to test causation
   * @param {object} hypothesis - Causal hypothesis
   * @returns {object} - Experiment design
   */
  designExperiment(hypothesis) {
    const experiment = {
      id: `EXP-${this.experiments.length + 1}`,
      hypothesis: hypothesis.statement,
      cause: hypothesis.cause,
      effect: hypothesis.effect,
      design: {
        type: 'randomized_controlled',
        controlGroup: {
          description: 'No intervention',
          size: hypothesis.sampleSize || 100
        },
        treatmentGroup: {
          description: `Apply ${hypothesis.cause}`,
          size: hypothesis.sampleSize || 100
        },
        randomization: 'Random assignment to groups',
        blinding: hypothesis.blinding || 'single-blind'
      },
      confounders: this.confoundingVariables.map(c => ({
        name: c.name,
        controlMethod: c.controlStrategy
      })),
      metrics: [
        { name: hypothesis.effect, type: 'primary' },
        ...(hypothesis.secondaryMetrics || []).map(m => ({ name: m, type: 'secondary' }))
      ],
      statisticalTest: this.recommendStatisticalTest(hypothesis),
      status: 'designed'
    };

    this.experiments.push(experiment);
    return experiment;
  }

  /**
   * Recommend appropriate statistical test
   * @param {object} hypothesis - Hypothesis details
   * @returns {string}
   */
  recommendStatisticalTest(hypothesis) {
    if (hypothesis.effectType === 'continuous') {
      return 't-test or ANOVA for comparing group means';
    }
    if (hypothesis.effectType === 'binary') {
      return 'Chi-square test or Fisher exact test';
    }
    if (hypothesis.effectType === 'count') {
      return 'Poisson regression';
    }
    return 't-test (default for continuous outcomes)';
  }

  /**
   * Perform counterfactual analysis
   * @param {object} scenario - Scenario to analyze
   * @returns {object}
   */
  counterfactualAnalysis(scenario) {
    const {
      observedOutcome,
      potentialCause,
      alternativeScenario
    } = scenario;

    return {
      question: `Would the outcome have been different if ${potentialCause} had not occurred?`,
      observedWorld: {
        cause: potentialCause,
        outcome: observedOutcome
      },
      counterfactualWorld: {
        cause: `No ${potentialCause}`,
        predictedOutcome: alternativeScenario.predictedOutcome,
        confidence: alternativeScenario.confidence || 'medium'
      },
      analysis: {
        difference: observedOutcome - alternativeScenario.predictedOutcome,
        attributableToCause: scenario.attributionPercentage || 'unknown',
        causalStrength: this.assessCausalStrength(scenario)
      },
      limitations: [
        'Counterfactuals are hypothetical and cannot be directly observed',
        'Predictions rely on model assumptions',
        'Hidden confounders may affect the analysis'
      ]
    };
  }

  /**
   * Assess causal strength
   * @param {object} scenario - Scenario data
   * @returns {string}
   */
  assessCausalStrength(scenario) {
    if (scenario.mechanismUnderstood && scenario.temporalPrecedence && scenario.doseResponse) {
      return 'strong';
    }
    if (scenario.temporalPrecedence && (scenario.mechanismUnderstood || scenario.doseResponse)) {
      return 'moderate';
    }
    return 'weak';
  }
}

// Example 2: A/B Test Causal Analyzer
class ABTestCausalAnalyzer {
  constructor() {
    this.tests = [];
  }

  /**
   * Create an A/B test for causal inference
   * @param {object} config - Test configuration
   * @returns {object}
   */
  createTest(config) {
    const test = {
      id: `AB-${Date.now()}`,
      name: config.name,
      hypothesis: config.hypothesis,
      treatment: config.treatment,
      control: config.control,
      primaryMetric: config.primaryMetric,
      minimumDetectableEffect: config.mde || 0.05,
      significanceLevel: config.alpha || 0.05,
      power: config.power || 0.8,
      sampleSize: this.calculateSampleSize(config),
      groups: {
        control: { users: [], conversions: 0 },
        treatment: { users: [], conversions: 0 }
      },
      status: 'running'
    };

    this.tests.push(test);
    return test;
  }

  /**
   * Calculate required sample size
   * @param {object} config - Test configuration
   * @returns {number}
   */
  calculateSampleSize(config) {
    // Simplified sample size calculation
    const alpha = config.alpha || 0.05;
    const beta = 1 - (config.power || 0.8);
    const mde = config.mde || 0.05;
    const baselineConversion = config.baselineConversion || 0.1;

    // Using formula for proportions
    const p1 = baselineConversion;
    const p2 = baselineConversion * (1 + mde);
    const pBar = (p1 + p2) / 2;

    const zAlpha = 1.96; // ~95% confidence
    const zBeta = 0.84;  // ~80% power

    const n = 2 * Math.pow(zAlpha + zBeta, 2) * pBar * (1 - pBar) / Math.pow(p2 - p1, 2);

    return Math.ceil(n);
  }

  /**
   * Record a user assignment and outcome
   * @param {string} testId - Test ID
   * @param {string} userId - User ID
   * @param {string} group - 'control' or 'treatment'
   * @param {boolean} converted - Whether user converted
   */
  recordOutcome(testId, userId, group, converted) {
    const test = this.tests.find(t => t.id === testId);
    if (!test) return;

    test.groups[group].users.push(userId);
    if (converted) {
      test.groups[group].conversions++;
    }
  }

  /**
   * Analyze test results for causal effect
   * @param {string} testId - Test ID
   * @returns {object}
   */
  analyzeResults(testId) {
    const test = this.tests.find(t => t.id === testId);
    if (!test) return { error: 'Test not found' };

    const control = test.groups.control;
    const treatment = test.groups.treatment;

    const controlRate = control.users.length > 0
      ? control.conversions / control.users.length
      : 0;
    const treatmentRate = treatment.users.length > 0
      ? treatment.conversions / treatment.users.length
      : 0;

    const absoluteEffect = treatmentRate - controlRate;
    const relativeEffect = controlRate > 0
      ? (treatmentRate - controlRate) / controlRate
      : 0;

    // Calculate statistical significance (simplified z-test)
    const pooledRate = (control.conversions + treatment.conversions) /
      (control.users.length + treatment.users.length);
    const standardError = Math.sqrt(
      pooledRate * (1 - pooledRate) *
      (1 / control.users.length + 1 / treatment.users.length)
    );
    const zScore = standardError > 0 ? absoluteEffect / standardError : 0;
    const pValue = 2 * (1 - this.normalCDF(Math.abs(zScore)));

    const isSignificant = pValue < test.significanceLevel;

    return {
      testId,
      testName: test.name,
      sampleSizes: {
        control: control.users.length,
        treatment: treatment.users.length,
        required: test.sampleSize
      },
      conversionRates: {
        control: (controlRate * 100).toFixed(2) + '%',
        treatment: (treatmentRate * 100).toFixed(2) + '%'
      },
      causalEffect: {
        absolute: (absoluteEffect * 100).toFixed(2) + '%',
        relative: (relativeEffect * 100).toFixed(2) + '%',
        interpretation: absoluteEffect > 0
          ? `Treatment increases conversion by ${(absoluteEffect * 100).toFixed(2)} percentage points`
          : `Treatment decreases conversion by ${Math.abs(absoluteEffect * 100).toFixed(2)} percentage points`
      },
      statisticalAnalysis: {
        zScore: zScore.toFixed(4),
        pValue: pValue.toFixed(4),
        isSignificant,
        confidenceLevel: ((1 - pValue) * 100).toFixed(2) + '%'
      },
      causalConclusion: isSignificant
        ? `The treatment CAUSED a ${absoluteEffect > 0 ? 'positive' : 'negative'} effect on the outcome`
        : 'Cannot establish causation - results not statistically significant',
      caveats: [
        'Assumes proper randomization',
        'Assumes no spillover effects between groups',
        'Assumes stable unit treatment value assumption (SUTVA)'
      ]
    };
  }

  /**
   * Normal cumulative distribution function
   * @param {number} x - Z-score
   * @returns {number}
   */
  normalCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - p : p;
  }
}

// Example 3: Root Cause Analyzer for Defects
class RootCauseAnalyzer {
  constructor() {
    this.defects = [];
    this.rootCauses = new Map();
  }

  /**
   * Add a defect for analysis
   * @param {object} defect - Defect details
   */
  addDefect(defect) {
    this.defects.push({
      id: defect.id,
      description: defect.description,
      symptoms: defect.symptoms,
      discoveredIn: defect.discoveredIn,
      potentialCauses: defect.potentialCauses || [],
      confirmedCause: null,
      fix: null
    });
  }

  /**
   * Perform systematic cause analysis
   * @param {string} defectId - Defect ID
   * @returns {object}
   */
  analyzeCause(defectId) {
    const defect = this.defects.find(d => d.id === defectId);
    if (!defect) return { error: 'Defect not found' };

    const analysis = {
      defectId,
      symptoms: defect.symptoms,
      causalChain: this.buildCausalChain(defect),
      hypotheses: defect.potentialCauses.map(cause => ({
        cause,
        probability: 'unknown',
        testable: true,
        testMethod: this.suggestTestMethod(cause)
      })),
      recommendedApproach: this.recommendApproach(defect)
    };

    return analysis;
  }

  /**
   * Build causal chain (5 Whys style)
   * @param {object} defect - Defect object
   * @returns {Array}
   */
  buildCausalChain(defect) {
    // Template for 5 Whys analysis
    return [
      { level: 1, question: 'What is the immediate cause of the symptom?', answer: null },
      { level: 2, question: 'Why did that occur?', answer: null },
      { level: 3, question: 'Why did that occur?', answer: null },
      { level: 4, question: 'Why did that occur?', answer: null },
      { level: 5, question: 'What is the root cause?', answer: null }
    ];
  }

  /**
   * Suggest test method for hypothesis
   * @param {string} cause - Potential cause
   * @returns {string}
   */
  suggestTestMethod(cause) {
    const methods = {
      'code_error': 'Code review and unit test',
      'configuration': 'Configuration audit and test in isolated environment',
      'data_issue': 'Data validation and test with sample data',
      'integration': 'Integration test with mock dependencies',
      'performance': 'Load test and profiling',
      'race_condition': 'Concurrent testing with multiple threads',
      'memory_leak': 'Memory profiling over extended runtime'
    };

    for (const [pattern, method] of Object.entries(methods)) {
      if (cause.toLowerCase().includes(pattern)) {
        return method;
      }
    }
    return 'Targeted test case to isolate the condition';
  }

  /**
   * Recommend analysis approach
   * @param {object} defect - Defect object
   * @returns {object}
   */
  recommendApproach(defect) {
    return {
      steps: [
        '1. Reproduce the defect consistently',
        '2. Isolate the conditions required for reproduction',
        '3. Form hypotheses about potential causes',
        '4. Design experiments to test each hypothesis',
        '5. Confirm causation through intervention (fix)',
        '6. Verify fix resolves the defect'
      ],
      tools: ['Debugger', 'Logging', 'Profiler', 'Test framework'],
      timeEstimate: 'Depends on complexity and reproducibility'
    };
  }

  /**
   * Confirm root cause
   * @param {string} defectId - Defect ID
   * @param {object} confirmation - Confirmation details
   */
  confirmRootCause(defectId, confirmation) {
    const defect = this.defects.find(d => d.id === defectId);
    if (!defect) return;

    defect.confirmedCause = {
      cause: confirmation.cause,
      evidence: confirmation.evidence,
      mechanism: confirmation.mechanism,
      confirmedAt: new Date()
    };

    // Track root cause frequency
    const causeKey = confirmation.cause;
    this.rootCauses.set(causeKey, (this.rootCauses.get(causeKey) || 0) + 1);
  }

  /**
   * Get root cause statistics
   * @returns {object}
   */
  getRootCauseStats() {
    const total = this.defects.filter(d => d.confirmedCause).length;
    const causes = Array.from(this.rootCauses.entries())
      .map(([cause, count]) => ({
        cause,
        count,
        percentage: total > 0 ? ((count / total) * 100).toFixed(1) + '%' : '0%'
      }))
      .sort((a, b) => b.count - a.count);

    return {
      totalAnalyzed: total,
      uniqueCauses: this.rootCauses.size,
      topCauses: causes.slice(0, 5),
      recommendation: causes[0]
        ? `Focus on preventing "${causes[0].cause}" - most common root cause`
        : 'No root causes confirmed yet'
    };
  }
}

// Demonstration
console.log('=== Causation Analysis Examples ===\n');

// Causal analysis
const causalFramework = new CausalAnalysisFramework();

// Add observations
for (let i = 0; i < 20; i++) {
  const testCoverage = 50 + Math.random() * 50;
  const defects = Math.max(0, 50 - testCoverage * 0.8 + (Math.random() - 0.5) * 20);
  causalFramework.addObservation({
    cause: { testCoverage },
    effect: { defectsFound: defects }
  });
}

console.log('--- Correlation Analysis ---\n');
const correlation = causalFramework.calculateCorrelation('testCoverage', 'defectsFound');
console.log(`Correlation coefficient: ${correlation.coefficient}`);
console.log(`Strength: ${correlation.strength}`);
console.log(`Interpretation: ${correlation.interpretation}`);
console.log(`Warning: ${correlation.warning}`);

// Register confounders
causalFramework.registerConfounder({
  name: 'Code Complexity',
  description: 'More complex code may have both more tests and more defects',
  affectsCause: true,
  affectsEffect: true,
  controlStrategy: 'Stratify analysis by complexity level'
});

// Design experiment
console.log('\n--- Experiment Design ---\n');
const experiment = causalFramework.designExperiment({
  statement: 'Increasing test coverage from 50% to 80% reduces production defects',
  cause: 'test coverage increase',
  effect: 'production defects',
  effectType: 'count',
  sampleSize: 50
});
console.log(`Experiment: ${experiment.hypothesis}`);
console.log(`Design: ${experiment.design.type}`);
console.log(`Statistical test: ${experiment.statisticalTest}`);

// A/B Test for causal inference
console.log('\n--- A/B Test Causal Analysis ---\n');
const abAnalyzer = new ABTestCausalAnalyzer();

const test = abAnalyzer.createTest({
  name: 'New Checkout Flow',
  hypothesis: 'New checkout flow increases conversion rate',
  treatment: 'New checkout flow',
  control: 'Current checkout flow',
  primaryMetric: 'conversion',
  baselineConversion: 0.03,
  mde: 0.1 // 10% relative improvement
});

// Simulate outcomes
for (let i = 0; i < 1000; i++) {
  abAnalyzer.recordOutcome(test.id, `user_${i}`, 'control', Math.random() < 0.03);
}
for (let i = 0; i < 1000; i++) {
  abAnalyzer.recordOutcome(test.id, `user_${i + 1000}`, 'treatment', Math.random() < 0.035);
}

const results = abAnalyzer.analyzeResults(test.id);
console.log(`Test: ${results.testName}`);
console.log(`Control conversion: ${results.conversionRates.control}`);
console.log(`Treatment conversion: ${results.conversionRates.treatment}`);
console.log(`Causal effect: ${results.causalEffect.absolute}`);
console.log(`Significant: ${results.statisticalAnalysis.isSignificant}`);
console.log(`Conclusion: ${results.causalConclusion}`);

// Root cause analysis
console.log('\n--- Root Cause Analysis ---\n');
const rootCauseAnalyzer = new RootCauseAnalyzer();

rootCauseAnalyzer.addDefect({
  id: 'BUG-123',
  description: 'Login fails intermittently',
  symptoms: ['Random 500 errors', 'Session not created'],
  discoveredIn: 'production',
  potentialCauses: ['race_condition', 'database_connection', 'configuration']
});

const analysis = rootCauseAnalyzer.analyzeCause('BUG-123');
console.log('Defect Analysis:');
console.log(`  Hypotheses: ${analysis.hypotheses.length}`);
analysis.hypotheses.forEach(h => {
  console.log(`    - ${h.cause}: ${h.testMethod}`);
});

/**
 * Key Principles for Establishing Causation:
 *
 * 1. Temporal Precedence: Cause must precede effect
 *
 * 2. Correlation: Variables must be associated
 *
 * 3. No Confounders: Rule out alternative explanations
 *
 * 4. Mechanism: Understand HOW cause produces effect
 *
 * 5. Dose-Response: More cause = more effect
 *
 * 6. Replication: Results should be reproducible
 *
 * 7. Intervention: Changing cause should change effect
 *
 * Remember: Correlation does NOT imply causation!
 */
