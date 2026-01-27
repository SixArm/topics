# Bayes' Theorem: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Bayes' Theorem is a mathematical formula for updating probabilities based on new evidence. For test automation professionals, understanding Bayesian reasoning helps with defect prediction, test prioritization, interpreting test results, and making data-driven decisions about testing strategies.

## What is Bayes' Theorem?

Bayes' Theorem describes how to update the probability of a hypothesis based on new evidence. It answers the question: "Given what I now know, how likely is my hypothesis?"

### The Formula

```
P(H|E) = P(E|H) × P(H)
         ─────────────
             P(E)

Where:
- P(H|E) = Posterior probability: probability of hypothesis given evidence
- P(E|H) = Likelihood: probability of evidence given hypothesis
- P(H)   = Prior probability: initial probability of hypothesis
- P(E)   = Marginal probability: total probability of evidence
```

### Expanded Form

```
                    P(E|H) × P(H)
P(H|E) = ────────────────────────────────────
         P(E|H) × P(H) + P(E|¬H) × P(¬H)
```

## Intuitive Understanding

### The Medical Test Analogy

Consider a medical test for a rare disease:

```python
# Setup
disease_prevalence = 0.01    # 1% of population has disease
test_sensitivity = 0.99     # 99% true positive rate
test_specificity = 0.95     # 95% true negative rate

# Question: If test is positive, what's the probability of having disease?

def bayes_disease_probability(prevalence, sensitivity, specificity):
    """Calculate probability of disease given positive test."""
    # P(Disease) = prevalence
    p_disease = prevalence
    p_no_disease = 1 - prevalence

    # P(Positive | Disease) = sensitivity
    p_positive_given_disease = sensitivity

    # P(Positive | No Disease) = 1 - specificity (false positive rate)
    p_positive_given_no_disease = 1 - specificity

    # P(Positive) = P(Pos|D) * P(D) + P(Pos|~D) * P(~D)
    p_positive = (p_positive_given_disease * p_disease +
                  p_positive_given_no_disease * p_no_disease)

    # Bayes' Theorem
    p_disease_given_positive = (
        p_positive_given_disease * p_disease / p_positive
    )

    return p_disease_given_positive

# Result
result = bayes_disease_probability(0.01, 0.99, 0.95)
print(f"Probability of disease given positive test: {result:.2%}")
# Output: ~16.7% - surprisingly low!
```

## Applications in Test Automation

### 1. Defect Prediction

```python
class DefectPredictor:
    """Predict probability of defects based on code characteristics."""

    def __init__(self):
        # Prior probabilities based on historical data
        self.base_defect_rate = 0.05  # 5% of code changes have defects

        # Likelihood factors
        self.likelihoods = {
            'high_complexity': {'defect': 0.7, 'no_defect': 0.2},
            'new_developer': {'defect': 0.4, 'no_defect': 0.25},
            'large_change': {'defect': 0.6, 'no_defect': 0.15},
            'touched_frequently': {'defect': 0.5, 'no_defect': 0.3}
        }

    def predict(self, characteristics: list) -> float:
        """Predict defect probability given characteristics."""
        p_defect = self.base_defect_rate
        p_no_defect = 1 - self.base_defect_rate

        for characteristic in characteristics:
            if characteristic in self.likelihoods:
                likelihood = self.likelihoods[characteristic]

                # P(Evidence | Defect)
                p_evidence_given_defect = likelihood['defect']

                # P(Evidence | No Defect)
                p_evidence_given_no_defect = likelihood['no_defect']

                # P(Evidence)
                p_evidence = (p_evidence_given_defect * p_defect +
                             p_evidence_given_no_defect * p_no_defect)

                # Update probability using Bayes' theorem
                p_defect = (p_evidence_given_defect * p_defect) / p_evidence
                p_no_defect = 1 - p_defect

        return p_defect

# Usage
predictor = DefectPredictor()
characteristics = ['high_complexity', 'new_developer', 'large_change']
defect_probability = predictor.predict(characteristics)
print(f"Predicted defect probability: {defect_probability:.2%}")
```

### 2. Test Prioritization

```python
class BayesianTestPrioritizer:
    """Prioritize tests based on probability of finding defects."""

    def __init__(self, test_history: dict):
        self.test_history = test_history

    def calculate_priority(self, test_name: str, code_changes: list) -> float:
        """Calculate priority score for a test."""
        history = self.test_history.get(test_name, {
            'runs': 0,
            'failures': 0,
            'last_failure': None,
            'related_files': []
        })

        # Prior: Base failure rate for this test
        if history['runs'] > 0:
            prior = history['failures'] / history['runs']
        else:
            prior = 0.1  # Default prior for new tests

        # Likelihood: Probability of code changes given failures
        relevance_score = self._calculate_relevance(
            history['related_files'],
            code_changes
        )

        # Recency factor: Recent failures increase probability
        recency_factor = self._calculate_recency(history['last_failure'])

        # Combined score
        priority = prior * (1 + relevance_score) * recency_factor

        return min(priority, 1.0)

    def _calculate_relevance(self, related_files: list, changes: list) -> float:
        """Calculate relevance of code changes to test."""
        if not related_files or not changes:
            return 0.1

        overlap = set(related_files) & set(changes)
        return len(overlap) / len(related_files)

    def _calculate_recency(self, last_failure) -> float:
        """Calculate recency factor based on last failure."""
        if last_failure is None:
            return 0.5

        from datetime import datetime, timedelta
        days_since = (datetime.now() - last_failure).days

        if days_since < 7:
            return 2.0
        elif days_since < 30:
            return 1.5
        else:
            return 1.0

    def prioritize_tests(self, tests: list, code_changes: list) -> list:
        """Return tests sorted by priority."""
        priorities = [
            (test, self.calculate_priority(test, code_changes))
            for test in tests
        ]
        return sorted(priorities, key=lambda x: x[1], reverse=True)
```

### 3. False Positive Analysis

```python
class FalsePositiveAnalyzer:
    """Analyze probability that test failures are false positives."""

    def __init__(self):
        # Historical rates
        self.overall_false_positive_rate = 0.1  # 10% of failures are false positives

    def analyze_failure(self, context: dict) -> dict:
        """Analyze likelihood that a failure is a false positive."""
        prior_fp = self.overall_false_positive_rate

        # Evidence factors
        evidence_factors = []

        # Factor 1: Test stability history
        if context.get('test_flakiness_rate', 0) > 0.2:
            evidence_factors.append({
                'factor': 'high_flakiness',
                'p_given_fp': 0.8,
                'p_given_real': 0.1
            })

        # Factor 2: Infrastructure issues
        if context.get('infra_issues_reported', False):
            evidence_factors.append({
                'factor': 'infra_issues',
                'p_given_fp': 0.6,
                'p_given_real': 0.05
            })

        # Factor 3: Parallel test interference
        if context.get('ran_in_parallel', False):
            evidence_factors.append({
                'factor': 'parallel_execution',
                'p_given_fp': 0.4,
                'p_given_real': 0.25
            })

        # Factor 4: First failure
        if not context.get('failed_before', True):
            evidence_factors.append({
                'factor': 'first_failure',
                'p_given_fp': 0.2,
                'p_given_real': 0.4
            })

        # Apply Bayesian updates
        p_fp = prior_fp
        p_real = 1 - prior_fp

        for factor in evidence_factors:
            p_evidence = (factor['p_given_fp'] * p_fp +
                         factor['p_given_real'] * p_real)

            p_fp = (factor['p_given_fp'] * p_fp) / p_evidence
            p_real = 1 - p_fp

        return {
            'false_positive_probability': p_fp,
            'real_failure_probability': p_real,
            'recommendation': 'investigate' if p_real > 0.5 else 'likely flaky',
            'factors_considered': [f['factor'] for f in evidence_factors]
        }
```

### 4. Code Coverage Value

```python
class CoverageValueAnalyzer:
    """Analyze the value of additional test coverage."""

    def estimate_defect_detection(self,
                                   current_coverage: float,
                                   target_coverage: float,
                                   defect_density: float) -> dict:
        """
        Estimate probability of detecting defects with additional coverage.

        Args:
            current_coverage: Current code coverage (0-1)
            target_coverage: Target code coverage (0-1)
            defect_density: Historical defects per line of code
        """
        # Prior: Probability of undetected defects existing
        p_undetected_defects = 1 - current_coverage * 0.8  # Coverage isn't perfect

        # Likelihood: Probability of detection given additional coverage
        coverage_increase = target_coverage - current_coverage
        p_detection_given_coverage = coverage_increase * 0.7  # Diminishing returns

        # Bayesian update
        p_defects_remain = p_undetected_defects * (1 - p_detection_given_coverage)

        return {
            'current_undetected_probability': p_undetected_defects,
            'detection_improvement': p_detection_given_coverage,
            'final_undetected_probability': p_defects_remain,
            'risk_reduction': (p_undetected_defects - p_defects_remain) / p_undetected_defects
        }
```

## Bayesian A/B Testing

```python
import numpy as np
from scipy import stats

class BayesianABTest:
    """Bayesian approach to A/B test analysis."""

    def __init__(self, alpha_prior=1, beta_prior=1):
        # Beta(1,1) is a uniform prior
        self.alpha_prior = alpha_prior
        self.beta_prior = beta_prior

    def update(self, successes: int, trials: int) -> tuple:
        """Update posterior distribution with new data."""
        alpha_posterior = self.alpha_prior + successes
        beta_posterior = self.beta_prior + (trials - successes)
        return alpha_posterior, beta_posterior

    def probability_a_better_than_b(self,
                                     a_successes: int, a_trials: int,
                                     b_successes: int, b_trials: int,
                                     n_samples: int = 100000) -> float:
        """Calculate probability that variant A is better than B."""
        # Posterior distributions
        alpha_a, beta_a = self.update(a_successes, a_trials)
        alpha_b, beta_b = self.update(b_successes, b_trials)

        # Sample from posteriors
        samples_a = np.random.beta(alpha_a, beta_a, n_samples)
        samples_b = np.random.beta(alpha_b, beta_b, n_samples)

        # Probability A > B
        return np.mean(samples_a > samples_b)

    def expected_loss(self,
                      a_successes: int, a_trials: int,
                      b_successes: int, b_trials: int,
                      n_samples: int = 100000) -> dict:
        """Calculate expected loss of choosing each variant."""
        alpha_a, beta_a = self.update(a_successes, a_trials)
        alpha_b, beta_b = self.update(b_successes, b_trials)

        samples_a = np.random.beta(alpha_a, beta_a, n_samples)
        samples_b = np.random.beta(alpha_b, beta_b, n_samples)

        # Expected loss if we choose A but B was better
        loss_choose_a = np.mean(np.maximum(samples_b - samples_a, 0))

        # Expected loss if we choose B but A was better
        loss_choose_b = np.mean(np.maximum(samples_a - samples_b, 0))

        return {
            'loss_if_choose_a': loss_choose_a,
            'loss_if_choose_b': loss_choose_b,
            'recommendation': 'A' if loss_choose_a < loss_choose_b else 'B'
        }

# Usage
ab_test = BayesianABTest()

# Test results: A had 150/1000 conversions, B had 180/1000
prob_b_better = ab_test.probability_a_better_than_b(150, 1000, 180, 1000)
print(f"Probability B is better: {prob_b_better:.2%}")

loss = ab_test.expected_loss(150, 1000, 180, 1000)
print(f"Expected loss choosing A: {loss['loss_if_choose_a']:.4f}")
print(f"Expected loss choosing B: {loss['loss_if_choose_b']:.4f}")
print(f"Recommendation: Choose {loss['recommendation']}")
```

## Practical Considerations

### Choosing Priors

```python
class PriorSelection:
    """Guide for selecting appropriate priors."""

    @staticmethod
    def uninformative_prior():
        """When you have no prior knowledge."""
        return {'alpha': 1, 'beta': 1}  # Uniform distribution

    @staticmethod
    def historical_prior(historical_rate: float, confidence: int = 10):
        """Based on historical data."""
        # confidence determines how strongly to weight history
        alpha = historical_rate * confidence
        beta = (1 - historical_rate) * confidence
        return {'alpha': alpha, 'beta': beta}

    @staticmethod
    def expert_prior(expected_rate: float, certainty: str = 'low'):
        """Based on expert opinion."""
        certainty_multiplier = {
            'low': 5,
            'medium': 20,
            'high': 50
        }
        mult = certainty_multiplier.get(certainty, 5)

        alpha = expected_rate * mult
        beta = (1 - expected_rate) * mult
        return {'alpha': alpha, 'beta': beta}
```

### Updating Beliefs Incrementally

```python
class IncrementalBayesian:
    """Update beliefs as new data arrives."""

    def __init__(self, prior_alpha=1, prior_beta=1):
        self.alpha = prior_alpha
        self.beta = prior_beta
        self.history = []

    def update(self, success: bool):
        """Update with single observation."""
        if success:
            self.alpha += 1
        else:
            self.beta += 1

        self.history.append({
            'success': success,
            'alpha': self.alpha,
            'beta': self.beta,
            'mean': self.alpha / (self.alpha + self.beta)
        })

    @property
    def current_estimate(self) -> float:
        """Current probability estimate."""
        return self.alpha / (self.alpha + self.beta)

    @property
    def credible_interval(self, confidence=0.95) -> tuple:
        """Credible interval for probability."""
        from scipy import stats
        dist = stats.beta(self.alpha, self.beta)
        lower = dist.ppf((1 - confidence) / 2)
        upper = dist.ppf(1 - (1 - confidence) / 2)
        return (lower, upper)

# Usage: Track test reliability over time
tracker = IncrementalBayesian()

for result in test_results:
    tracker.update(result.passed)

print(f"Estimated pass rate: {tracker.current_estimate:.2%}")
print(f"95% credible interval: {tracker.credible_interval}")
```

## Conclusion

Bayes' Theorem provides a rigorous framework for updating beliefs based on evidence. In test automation, this enables smarter decisions about test prioritization, defect prediction, and result interpretation. The key insight is that prior knowledge matters and should be systematically updated as new information becomes available.

## Key Takeaways

1. Bayes' Theorem updates probabilities based on new evidence
2. Prior probabilities capture existing knowledge
3. Likelihood represents evidence given hypothesis
4. Use Bayesian reasoning for test prioritization and defect prediction
5. Bayesian A/B testing provides probability of one variant being better
6. Incremental updates allow continuous learning from test results
7. Choose priors carefully based on available information
