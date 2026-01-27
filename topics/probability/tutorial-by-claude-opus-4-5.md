# Probability

## Introduction

Probability is the mathematical backbone of informed decision-making in test automation. Every time a test automation professional decides which tests to run, which areas of an application to prioritize, or how confident they should be in their test coverage, they are implicitly reasoning about probability -- often without a formal framework for doing so.

Understanding probability transforms test automation from a craft based on intuition into a discipline grounded in quantitative reasoning. It enables you to answer questions such as: "Given our test suite, what is the probability that a defect in module X will be caught?" or "If we can only run 30% of our tests before a release, which 30% maximizes our probability of catching regressions?" or "How many random inputs do we need to generate to have 95% confidence that we have covered the critical paths?"

This tutorial introduces probability concepts relevant to test automation, demonstrates their application through practical code examples, and shows how to use probabilistic thinking to build smarter, more effective test strategies.

## What is Probability?

Probability is the branch of mathematics that quantifies the likelihood of events occurring. A probability is a number between 0 (impossible) and 1 (certain). In test automation, probability helps us reason about defect likelihood, coverage confidence, test prioritization, and risk assessment.

```
ASCII Diagram: Probability in Test Automation

  Probability Scale
  0.0          0.5          1.0
  |------------|------------|
  Impossible   Even odds    Certain

  Application to Test Automation:

  +----------------------------------------------------------+
  |                   Test Suite (N tests)                    |
  |                                                          |
  |  +--------+  +--------+  +--------+  +--------+         |
  |  | Test 1 |  | Test 2 |  | Test 3 |  | Test 4 |  ...    |
  |  | P=0.85 |  | P=0.92 |  | P=0.78 |  | P=0.95 |         |
  |  +--------+  +--------+  +--------+  +--------+         |
  |      |            |           |            |              |
  |      v            v           v            v              |
  |  Detection probability for defect in covered code        |
  +----------------------------------------------------------+
           |
           v
  +----------------------------------------------------------+
  |  Combined Coverage Confidence                            |
  |                                                          |
  |  P(at least one test catches defect)                     |
  |  = 1 - P(all tests miss)                                 |
  |  = 1 - (1-0.85)(1-0.92)(1-0.78)(1-0.95)                 |
  |  = 1 - (0.15)(0.08)(0.22)(0.05)                         |
  |  = 1 - 0.0000132                                        |
  |  = 0.9999868  (99.998%)                                  |
  +----------------------------------------------------------+

  Key Probability Concepts for Testing:
  +------------------------------+-----------------------------+
  | Concept                      | Testing Application         |
  +------------------------------+-----------------------------+
  | P(A)                         | Probability of defect       |
  | P(A|B) - Conditional         | P(defect | code changed)    |
  | P(A and B) - Joint           | P(defect in X AND Y)        |
  | Bayes' Theorem               | Updating defect estimates   |
  | Expected Value               | Test ROI calculation        |
  | Law of Large Numbers         | Statistical testing         |
  +------------------------------+-----------------------------+
```

## Implementation: Probability-Based Test Prioritization

### Python: Risk-Based Test Selection

```python
# test_prioritization.py
"""
Probability-based test prioritization system.
Assigns priority scores to tests based on defect likelihood,
code change frequency, and historical failure rates.
"""

import pytest
import json
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from pathlib import Path


@dataclass
class TestCase:
    """Represents a test with its probability metadata."""
    name: str
    module: str
    historical_failure_rate: float  # P(test fails) based on history
    code_change_recency: float     # 0.0 = unchanged, 1.0 = just changed
    defect_density: float          # Historical defects per LOC in module
    execution_time: float          # Seconds
    priority_score: float = 0.0

    def calculate_priority(self) -> float:
        """
        Calculate priority score using Bayesian-inspired weighting.

        P(defect_detected) is proportional to:
        - Historical failure rate (tests that fail more often catch more bugs)
        - Code change recency (recently changed code has more defects)
        - Module defect density (defect-prone modules need more testing)

        Weighted by inverse execution time (prefer faster tests when
        priority is similar).
        """
        # Base probability of this test finding a defect
        p_defect = (
            0.4 * self.historical_failure_rate +
            0.35 * self.code_change_recency +
            0.25 * self.defect_density
        )

        # Efficiency factor: value per second of execution time
        efficiency = p_defect / max(self.execution_time, 0.1)

        self.priority_score = round(efficiency, 6)
        return self.priority_score


def prioritize_tests(
    tests: List[TestCase],
    time_budget_seconds: float
) -> List[TestCase]:
    """
    Select and order tests to maximize defect detection probability
    within a given time budget.

    This is a variant of the fractional knapsack problem:
    maximize total detection probability subject to time constraint.
    """
    # Calculate priority scores
    for test in tests:
        test.calculate_priority()

    # Sort by priority score (highest first)
    ranked = sorted(tests, key=lambda t: t.priority_score, reverse=True)

    # Select tests within time budget
    selected = []
    remaining_time = time_budget_seconds

    for test in ranked:
        if test.execution_time <= remaining_time:
            selected.append(test)
            remaining_time -= test.execution_time

    return selected


def calculate_coverage_confidence(selected_tests: List[TestCase]) -> float:
    """
    Calculate the probability that at least one selected test
    will catch a defect if one exists in the covered code.

    P(at least one catches) = 1 - Product(1 - P(each catches))
    """
    if not selected_tests:
        return 0.0

    p_all_miss = 1.0
    for test in selected_tests:
        p_catch = (
            test.historical_failure_rate * 0.5 +
            test.code_change_recency * 0.3 +
            test.defect_density * 0.2
        )
        p_all_miss *= (1 - min(p_catch, 0.99))

    return round(1 - p_all_miss, 6)


# Example usage and test
class TestPrioritization:
    """Tests for the prioritization system itself."""

    @pytest.fixture
    def sample_tests(self) -> List[TestCase]:
        return [
            TestCase("test_login", "auth", 0.05, 0.9, 0.03, 2.0),
            TestCase("test_checkout", "payment", 0.12, 0.8, 0.08, 15.0),
            TestCase("test_search", "search", 0.03, 0.1, 0.02, 5.0),
            TestCase("test_profile", "users", 0.08, 0.7, 0.05, 3.0),
            TestCase("test_upload", "media", 0.15, 0.6, 0.10, 20.0),
            TestCase("test_api_auth", "auth", 0.04, 0.9, 0.03, 1.0),
            TestCase("test_dashboard", "ui", 0.02, 0.2, 0.01, 8.0),
            TestCase("test_notifications", "notify", 0.07, 0.5, 0.04, 4.0),
        ]

    def test_prioritization_selects_highest_value(self, sample_tests):
        """Verify that high-priority tests are selected first."""
        selected = prioritize_tests(sample_tests, time_budget_seconds=30)

        # The auth module has high change recency, so auth tests
        # should be prioritized
        selected_names = [t.name for t in selected]
        assert "test_api_auth" in selected_names, (
            "Fast, high-priority auth test should be selected"
        )
        assert "test_login" in selected_names, (
            "Recently changed auth test should be selected"
        )

    def test_time_budget_respected(self, sample_tests):
        """Verify total execution time stays within budget."""
        budget = 25.0
        selected = prioritize_tests(sample_tests, time_budget_seconds=budget)
        total_time = sum(t.execution_time for t in selected)
        assert total_time <= budget

    def test_coverage_confidence_increases_with_tests(self, sample_tests):
        """More tests should increase coverage confidence."""
        small_set = prioritize_tests(sample_tests, time_budget_seconds=10)
        large_set = prioritize_tests(sample_tests, time_budget_seconds=50)

        small_confidence = calculate_coverage_confidence(small_set)
        large_confidence = calculate_coverage_confidence(large_set)

        assert large_confidence >= small_confidence, (
            "More tests should provide equal or higher coverage confidence"
        )

    def test_empty_budget_returns_nothing(self, sample_tests):
        """Zero time budget should return no tests."""
        selected = prioritize_tests(sample_tests, time_budget_seconds=0)
        assert len(selected) == 0

    def test_confidence_is_bounded(self, sample_tests):
        """Coverage confidence should be between 0 and 1."""
        selected = prioritize_tests(sample_tests, time_budget_seconds=100)
        confidence = calculate_coverage_confidence(selected)
        assert 0.0 <= confidence <= 1.0
```

### Python: Defect Probability Estimation

```python
# defect_probability.py
"""
Calculate the probability of defects using historical data
and Bayesian updating.
"""

import pytest
from typing import Dict, List, Tuple


def bayes_update(
    prior: float,
    likelihood: float,
    evidence: float
) -> float:
    """
    Apply Bayes' theorem to update defect probability.

    P(defect | observation) = P(observation | defect) * P(defect)
                              / P(observation)

    Args:
        prior: P(defect) - prior probability of a defect existing
        likelihood: P(observation | defect) - probability of seeing
                    this observation if a defect exists
        evidence: P(observation) - probability of seeing this
                  observation in general
    """
    if evidence == 0:
        return prior
    posterior = (likelihood * prior) / evidence
    return min(max(posterior, 0.0), 1.0)


def estimate_defect_probability(
    base_rate: float,
    code_churn: int,
    developer_experience_years: float,
    has_tests: bool,
    complexity_score: float
) -> float:
    """
    Estimate the probability of a defect in a code change using
    multiple Bayesian updates.
    """
    p_defect = base_rate

    # Update based on code churn (more lines changed = higher risk)
    if code_churn > 100:
        p_defect = bayes_update(p_defect, 0.7, 0.3)
    elif code_churn > 50:
        p_defect = bayes_update(p_defect, 0.5, 0.3)

    # Update based on developer experience
    if developer_experience_years < 1:
        p_defect = bayes_update(p_defect, 0.6, 0.3)
    elif developer_experience_years > 5:
        p_defect = bayes_update(p_defect, 0.2, 0.3)

    # Update based on test coverage
    if has_tests:
        p_defect = bayes_update(p_defect, 0.15, 0.5)
    else:
        p_defect = bayes_update(p_defect, 0.8, 0.5)

    # Update based on cyclomatic complexity
    if complexity_score > 20:
        p_defect = bayes_update(p_defect, 0.75, 0.3)
    elif complexity_score > 10:
        p_defect = bayes_update(p_defect, 0.5, 0.3)

    return round(p_defect, 4)


class TestDefectProbability:
    """Tests for the defect probability estimation."""

    def test_high_risk_change(self):
        """Large change by junior dev with no tests should be high risk."""
        p = estimate_defect_probability(
            base_rate=0.1,
            code_churn=200,
            developer_experience_years=0.5,
            has_tests=False,
            complexity_score=25
        )
        assert p > 0.5, f"High-risk change should have P(defect) > 0.5, got {p}"

    def test_low_risk_change(self):
        """Small change by senior dev with tests should be low risk."""
        p = estimate_defect_probability(
            base_rate=0.1,
            code_churn=10,
            developer_experience_years=8,
            has_tests=True,
            complexity_score=3
        )
        assert p < 0.15, f"Low-risk change should have P(defect) < 0.15, got {p}"

    def test_probability_bounded(self):
        """Probability should always be between 0 and 1."""
        for churn in [1, 50, 500]:
            for exp in [0.1, 2.0, 10.0]:
                for has_tests in [True, False]:
                    for complexity in [1, 10, 50]:
                        p = estimate_defect_probability(
                            0.1, churn, exp, has_tests, complexity
                        )
                        assert 0.0 <= p <= 1.0

    def test_tests_reduce_defect_probability(self):
        """Having tests should reduce estimated defect probability."""
        p_with_tests = estimate_defect_probability(
            0.1, 50, 3.0, True, 10
        )
        p_without_tests = estimate_defect_probability(
            0.1, 50, 3.0, False, 10
        )
        assert p_with_tests < p_without_tests
```

### JavaScript/TypeScript: Coverage Confidence Calculator

```typescript
// coverage-confidence.ts
/**
 * Calculate statistical confidence in test coverage.
 * Uses probability theory to determine how confident we can be
 * that our test suite will catch defects.
 */

interface ModuleCoverage {
  name: string;
  lineCoverage: number;       // 0.0 to 1.0
  branchCoverage: number;     // 0.0 to 1.0
  testCount: number;
  historicalDefects: number;
  linesOfCode: number;
}

interface ConfidenceResult {
  module: string;
  defectDetectionProbability: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
}

function calculateDetectionProbability(module: ModuleCoverage): number {
  /**
   * Estimate the probability that existing tests will detect a defect.
   *
   * Model:
   * P(detect) = 1 - P(miss)
   * P(miss) = P(defect in uncovered code) + P(defect in covered code) * P(test misses)
   *
   * Simplified to a weighted model based on coverage metrics.
   */
  const uncoveredRatio = 1 - module.lineCoverage;
  const branchGap = 1 - module.branchCoverage;

  // Probability of a defect being in uncovered code
  const pDefectInUncovered = uncoveredRatio * 0.6 + branchGap * 0.4;

  // Even covered code might not catch all defects
  // More tests per LOC = higher detection rate
  const testDensity = module.testCount / Math.max(module.linesOfCode / 100, 1);
  const pMissInCovered = Math.max(0.05, 1 / (1 + testDensity));

  // Combined miss probability
  const pMiss = pDefectInUncovered + (1 - pDefectInUncovered) * pMissInCovered;

  return Math.max(0, Math.min(1, 1 - pMiss));
}

function assessRisk(module: ModuleCoverage): ConfidenceResult {
  const pDetect = calculateDetectionProbability(module);
  const defectDensity = module.historicalDefects / Math.max(module.linesOfCode, 1);

  let riskLevel: ConfidenceResult['riskLevel'];
  let recommendation: string;

  if (pDetect < 0.5) {
    riskLevel = 'critical';
    recommendation = `Module ${module.name} has <50% detection probability. ` +
      `Add tests targeting uncovered branches immediately.`;
  } else if (pDetect < 0.7) {
    riskLevel = 'high';
    recommendation = `Module ${module.name} needs additional test coverage. ` +
      `Focus on branch coverage (currently ${(module.branchCoverage * 100).toFixed(0)}%).`;
  } else if (pDetect < 0.9) {
    riskLevel = 'medium';
    recommendation = `Module ${module.name} has reasonable coverage. ` +
      `Consider edge case tests for high-complexity functions.`;
  } else {
    riskLevel = 'low';
    recommendation = `Module ${module.name} is well-covered. ` +
      `Maintain existing tests and review periodically.`;
  }

  return {
    module: module.name,
    defectDetectionProbability: Math.round(pDetect * 10000) / 10000,
    riskLevel,
    recommendation,
  };
}

// Jest tests
describe('Coverage Confidence Calculator', () => {
  const wellCoveredModule: ModuleCoverage = {
    name: 'auth',
    lineCoverage: 0.95,
    branchCoverage: 0.88,
    testCount: 45,
    historicalDefects: 3,
    linesOfCode: 800,
  };

  const poorlyCoveredModule: ModuleCoverage = {
    name: 'payment',
    lineCoverage: 0.35,
    branchCoverage: 0.20,
    testCount: 5,
    historicalDefects: 12,
    linesOfCode: 1200,
  };

  test('well-covered module has high detection probability', () => {
    const pDetect = calculateDetectionProbability(wellCoveredModule);
    expect(pDetect).toBeGreaterThan(0.7);
  });

  test('poorly-covered module has low detection probability', () => {
    const pDetect = calculateDetectionProbability(poorlyCoveredModule);
    expect(pDetect).toBeLessThan(0.5);
  });

  test('detection probability is between 0 and 1', () => {
    const modules = [wellCoveredModule, poorlyCoveredModule];
    for (const mod of modules) {
      const p = calculateDetectionProbability(mod);
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(1);
    }
  });

  test('risk assessment produces actionable recommendations', () => {
    const result = assessRisk(poorlyCoveredModule);
    expect(result.riskLevel).toBe('critical');
    expect(result.recommendation).toContain('Add tests');
  });

  test('higher coverage produces lower risk', () => {
    const lowCoverageRisk = assessRisk(poorlyCoveredModule);
    const highCoverageRisk = assessRisk(wellCoveredModule);

    const riskOrder = ['low', 'medium', 'high', 'critical'];
    const lowIdx = riskOrder.indexOf(lowCoverageRisk.riskLevel);
    const highIdx = riskOrder.indexOf(highCoverageRisk.riskLevel);

    expect(lowIdx).toBeGreaterThan(highIdx);
  });

  test('sample size calculator for statistical testing', () => {
    /**
     * Calculate how many random test inputs are needed to achieve
     * a desired confidence level.
     *
     * If each random input has probability p of triggering a defect,
     * then after n trials:
     * P(at least one trigger) = 1 - (1-p)^n
     *
     * Solving for n:
     * n = log(1 - confidence) / log(1 - p)
     */
    function requiredSampleSize(
      defectProbPerTrial: number,
      desiredConfidence: number
    ): number {
      if (defectProbPerTrial <= 0 || defectProbPerTrial >= 1) {
        throw new Error('Probability must be between 0 and 1 exclusive');
      }
      return Math.ceil(
        Math.log(1 - desiredConfidence) / Math.log(1 - defectProbPerTrial)
      );
    }

    // If each random input has 1% chance of finding the bug,
    // how many inputs do we need for 95% confidence?
    const n = requiredSampleSize(0.01, 0.95);
    expect(n).toBe(299);  // Need ~299 random inputs

    // For 99% confidence with same probability
    const n99 = requiredSampleSize(0.01, 0.99);
    expect(n99).toBe(459);  // Need ~459 random inputs
  });
});
```

## Best Practices

### Applying Probability to Test Automation

- [ ] **Track historical failure rates** for every test to build a data foundation for probabilistic prioritization
- [ ] **Calculate coverage confidence** rather than relying on line coverage percentage alone -- 80% line coverage does not mean 80% defect detection probability
- [ ] **Use risk-based test selection** when full test suite execution is not possible, selecting tests that maximize defect detection probability per unit of time
- [ ] **Apply Bayes' theorem** to update defect estimates when new evidence arrives (code changes, new test results, production incidents)
- [ ] **Calculate required sample sizes** for fuzz testing and property-based testing to achieve desired confidence levels
- [ ] **Model defect probability** based on code churn, complexity, developer experience, and historical data rather than gut feeling
- [ ] **Use conditional probability** to understand which test failures are correlated and which are independent
- [ ] **Monitor detection rates** over time: if your test suite's actual defect detection rate diverges from your estimated probability, recalibrate your model
- [ ] **Consider the base rate**: a 99% accurate test for a rare event will produce more false positives than true positives (base rate fallacy)
- [ ] **Document probability assumptions** so they can be reviewed and updated as the system evolves

### Data Collection Checklist

- [ ] Record pass/fail history for every test execution
- [ ] Track which tests detected which production defects
- [ ] Measure code churn per module per release cycle
- [ ] Log cyclomatic complexity scores and trend them over time
- [ ] Record time-to-detect for each defect (how long it existed before a test caught it)

## Conclusion

Probability provides a rigorous framework for making test automation decisions that are usually made by intuition. By quantifying defect likelihood, coverage confidence, and detection probability, test automation professionals can allocate their limited testing resources more effectively.

The practical applications are immediate: prioritizing tests based on calculated risk scores rather than alphabetical order, determining how many random inputs are needed for statistical confidence in fuzz testing, and understanding that 80% code coverage does not mean 80% confidence in defect detection.

Probabilistic thinking also reveals important truths about testing. The law of diminishing returns applies: the first tests you write for an uncovered module provide dramatically more value than the 50th test for an already well-covered module. Conditional probability shows that correlated test failures provide less independent verification than you might assume. And Bayes' theorem provides a principled way to update your risk estimates as new information arrives.

Integrating probability into your test automation practice does not require a statistics degree. It requires tracking data, building simple models, and using those models to make better decisions about where to invest your testing effort.

## Key Takeaways

1. Probability quantifies what testers often estimate intuitively: the likelihood of a defect existing, the chance of a test catching it, and the confidence in overall coverage.
2. Test prioritization based on calculated risk scores (combining failure history, code change recency, and defect density) catches more defects per unit of test execution time than running tests in arbitrary order.
3. Coverage confidence -- the probability that your test suite will detect a defect if one exists -- is a more meaningful metric than raw line or branch coverage percentages.
4. Bayes' theorem provides a principled method for updating defect probability estimates as new evidence arrives, such as code changes, test results, or production incidents.
5. The required sample size formula (n = log(1-confidence) / log(1-p)) is essential for fuzz testing and property-based testing, telling you exactly how many random inputs you need for a given confidence level.
6. The base rate fallacy is a critical trap in test automation: a test with a 1% false positive rate sounds reliable, but if defects are rare (0.1% base rate), most "failures" will be false alarms.
7. Probabilistic test automation requires data collection as a foundation -- without historical failure rates, code churn metrics, and defect tracking, probability models have nothing to work with.
