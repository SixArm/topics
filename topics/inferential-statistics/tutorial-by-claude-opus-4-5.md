# Inferential Statistics: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Inferential statistics uses sample data to make generalizations about larger populations. For test automation professionals, inferential statistics helps determine whether observed differences are meaningful, predict system behavior under various conditions, and make data-driven decisions about software quality.

## What is Inferential Statistics?

Inferential statistics goes beyond describing data (descriptive statistics) to drawing conclusions and making predictions. It answers questions like "Is this performance change real or random?" and "Can we be confident this fix resolved the problem?"

### Inferential vs Descriptive Statistics

```
┌─────────────────────────────────────────────────────────────┐
│          Descriptive vs Inferential Statistics                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Descriptive Statistics:                                     │
│  ├── Summarizes what happened                               │
│  ├── Mean, median, standard deviation                       │
│  ├── "Average response time was 250ms"                      │
│  └── No conclusions beyond the data                         │
│                                                             │
│  Inferential Statistics:                                     │
│  ├── Draws conclusions about populations                    │
│  ├── Hypothesis tests, confidence intervals                 │
│  ├── "The new version is significantly faster (p < 0.05)"   │
│  └── Makes predictions with quantified uncertainty          │
│                                                             │
│  Key Concepts:                                              │
│  ├── Population: All possible observations                  │
│  ├── Sample: Subset we actually measure                     │
│  ├── Hypothesis: Claim we want to test                      │
│  ├── p-value: Probability of results under null hypothesis  │
│  ├── Confidence interval: Range of plausible values         │
│  └── Significance level (α): Threshold for decisions        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Hypothesis Testing for Test Automation

### Implementing Statistical Tests

```python
# inferential_statistics.py

"""
Inferential statistics for test automation.
"""

import numpy as np
from scipy import stats
from typing import List, Tuple, Dict, Optional
from dataclasses import dataclass
from enum import Enum

class SignificanceLevel(Enum):
    LOW = 0.10      # 90% confidence
    STANDARD = 0.05  # 95% confidence
    HIGH = 0.01      # 99% confidence

@dataclass
class HypothesisTestResult:
    test_name: str
    test_statistic: float
    p_value: float
    significant: bool
    confidence_level: float
    effect_size: Optional[float]
    interpretation: str

class PerformanceStatistics:
    """Statistical analysis for performance test results."""

    def __init__(self, alpha: float = 0.05):
        self.alpha = alpha

    def compare_response_times(
        self,
        baseline: List[float],
        candidate: List[float]
    ) -> HypothesisTestResult:
        """
        Compare response times between baseline and candidate versions.
        Uses Welch's t-test (unequal variances).
        """
        t_stat, p_value = stats.ttest_ind(baseline, candidate, equal_var=False)

        # Calculate Cohen's d effect size
        pooled_std = np.sqrt(
            (np.std(baseline, ddof=1)**2 + np.std(candidate, ddof=1)**2) / 2
        )
        effect_size = (np.mean(baseline) - np.mean(candidate)) / pooled_std

        significant = p_value < self.alpha

        # Interpretation
        baseline_mean = np.mean(baseline)
        candidate_mean = np.mean(candidate)
        diff_pct = ((candidate_mean - baseline_mean) / baseline_mean) * 100

        if significant:
            if candidate_mean < baseline_mean:
                interpretation = (
                    f"Candidate is significantly faster "
                    f"({abs(diff_pct):.1f}% improvement, p={p_value:.4f})"
                )
            else:
                interpretation = (
                    f"Candidate is significantly slower "
                    f"({diff_pct:.1f}% regression, p={p_value:.4f})"
                )
        else:
            interpretation = (
                f"No significant difference detected "
                f"({diff_pct:+.1f}%, p={p_value:.4f})"
            )

        return HypothesisTestResult(
            test_name="Welch's t-test",
            test_statistic=t_stat,
            p_value=p_value,
            significant=significant,
            confidence_level=1 - self.alpha,
            effect_size=effect_size,
            interpretation=interpretation
        )

    def test_error_rate_change(
        self,
        baseline_errors: int,
        baseline_total: int,
        candidate_errors: int,
        candidate_total: int
    ) -> HypothesisTestResult:
        """
        Compare error rates between two versions.
        Uses Chi-squared test for proportions.
        """
        # Create contingency table
        table = np.array([
            [baseline_errors, baseline_total - baseline_errors],
            [candidate_errors, candidate_total - candidate_errors]
        ])

        chi2, p_value, dof, expected = stats.chi2_contingency(table)

        baseline_rate = baseline_errors / baseline_total
        candidate_rate = candidate_errors / candidate_total

        significant = p_value < self.alpha

        if significant:
            if candidate_rate < baseline_rate:
                interpretation = (
                    f"Error rate significantly decreased "
                    f"({baseline_rate:.2%} → {candidate_rate:.2%}, p={p_value:.4f})"
                )
            else:
                interpretation = (
                    f"Error rate significantly increased "
                    f"({baseline_rate:.2%} → {candidate_rate:.2%}, p={p_value:.4f})"
                )
        else:
            interpretation = (
                f"No significant change in error rate "
                f"({baseline_rate:.2%} → {candidate_rate:.2%}, p={p_value:.4f})"
            )

        return HypothesisTestResult(
            test_name="Chi-squared test",
            test_statistic=chi2,
            p_value=p_value,
            significant=significant,
            confidence_level=1 - self.alpha,
            effect_size=abs(candidate_rate - baseline_rate),
            interpretation=interpretation
        )

    def confidence_interval(
        self,
        data: List[float],
        confidence: float = 0.95
    ) -> Tuple[float, float]:
        """Calculate confidence interval for the mean."""
        n = len(data)
        mean = np.mean(data)
        se = stats.sem(data)
        h = se * stats.t.ppf((1 + confidence) / 2, n - 1)
        return (mean - h, mean + h)

    def is_normally_distributed(
        self,
        data: List[float]
    ) -> HypothesisTestResult:
        """
        Test if data follows a normal distribution.
        Important for choosing the right statistical test.
        """
        stat, p_value = stats.shapiro(data)

        significant = p_value < self.alpha

        if significant:
            interpretation = (
                f"Data is NOT normally distributed (p={p_value:.4f}). "
                f"Use non-parametric tests."
            )
        else:
            interpretation = (
                f"Data appears normally distributed (p={p_value:.4f}). "
                f"Parametric tests are appropriate."
            )

        return HypothesisTestResult(
            test_name="Shapiro-Wilk test",
            test_statistic=stat,
            p_value=p_value,
            significant=significant,
            confidence_level=1 - self.alpha,
            effect_size=None,
            interpretation=interpretation
        )

    def compare_distributions_nonparametric(
        self,
        baseline: List[float],
        candidate: List[float]
    ) -> HypothesisTestResult:
        """
        Non-parametric comparison using Mann-Whitney U test.
        Use when data is not normally distributed.
        """
        u_stat, p_value = stats.mannwhitneyu(
            baseline, candidate, alternative='two-sided'
        )

        significant = p_value < self.alpha

        baseline_median = np.median(baseline)
        candidate_median = np.median(candidate)

        if significant:
            interpretation = (
                f"Distributions are significantly different "
                f"(median: {baseline_median:.2f} vs {candidate_median:.2f}, "
                f"p={p_value:.4f})"
            )
        else:
            interpretation = (
                f"No significant difference in distributions "
                f"(median: {baseline_median:.2f} vs {candidate_median:.2f}, "
                f"p={p_value:.4f})"
            )

        return HypothesisTestResult(
            test_name="Mann-Whitney U test",
            test_statistic=u_stat,
            p_value=p_value,
            significant=significant,
            confidence_level=1 - self.alpha,
            effect_size=None,
            interpretation=interpretation
        )


# Practical usage in test automation
import pytest

class TestPerformanceRegression:
    """Use inferential statistics to detect performance regressions."""

    @pytest.fixture
    def stats_analyzer(self):
        return PerformanceStatistics(alpha=0.05)

    def test_api_response_time_comparison(self, stats_analyzer):
        """Compare response times between versions."""
        # Simulated baseline and candidate measurements
        baseline_times = [120, 135, 128, 142, 130, 125, 138, 131, 127, 133,
                         129, 136, 124, 140, 132, 126, 137, 130, 134, 128]

        candidate_times = [110, 115, 108, 122, 112, 105, 118, 111, 107, 113,
                          109, 116, 104, 120, 112, 106, 117, 110, 114, 108]

        result = stats_analyzer.compare_response_times(
            baseline_times,
            candidate_times
        )

        print(f"\n{result.interpretation}")
        print(f"Effect size (Cohen's d): {result.effect_size:.2f}")

        # Assert the candidate is not significantly worse
        if result.significant:
            assert np.mean(candidate_times) <= np.mean(baseline_times), \
                f"Performance regression detected: {result.interpretation}"

    def test_error_rate_after_deployment(self, stats_analyzer):
        """Verify error rate didn't increase after deployment."""
        result = stats_analyzer.test_error_rate_change(
            baseline_errors=15,
            baseline_total=10000,
            candidate_errors=12,
            candidate_total=10000
        )

        print(f"\n{result.interpretation}")

        # Fail if error rate significantly increased
        if result.significant and result.effect_size > 0:
            pytest.fail(f"Error rate regression: {result.interpretation}")

    def test_confidence_interval_within_sla(self, stats_analyzer):
        """Verify response times are within SLA with confidence."""
        response_times = [230, 245, 210, 260, 235, 220, 250, 240, 225, 255,
                         233, 242, 218, 252, 237, 228, 248, 238, 230, 244]

        lower, upper = stats_analyzer.confidence_interval(
            response_times,
            confidence=0.95
        )

        sla_threshold = 300  # ms

        print(f"\n95% CI: [{lower:.1f}ms, {upper:.1f}ms]")
        print(f"SLA: {sla_threshold}ms")

        assert upper < sla_threshold, \
            f"Upper confidence bound ({upper:.1f}ms) exceeds SLA ({sla_threshold}ms)"

    def test_choose_appropriate_test(self, stats_analyzer):
        """Demonstrate choosing the right statistical test."""
        data = [120, 135, 128, 142, 130, 125, 138, 131, 127, 133,
                129, 136, 124, 140, 132, 126, 137, 130, 134, 128]

        normality = stats_analyzer.is_normally_distributed(data)
        print(f"\nNormality test: {normality.interpretation}")

        # Choose test based on normality
        if not normality.significant:
            # Data is normal - use parametric test
            print("Using parametric t-test")
        else:
            # Data is not normal - use non-parametric test
            print("Using non-parametric Mann-Whitney U test")
```

### Sample Size Determination

```python
# sample_size.py

"""
Determine appropriate sample sizes for test automation.
"""

from scipy import stats
import numpy as np
from typing import Tuple

class SampleSizeCalculator:
    """Calculate required sample sizes for reliable testing."""

    @staticmethod
    def for_mean_comparison(
        effect_size: float,
        alpha: float = 0.05,
        power: float = 0.80,
        ratio: float = 1.0
    ) -> int:
        """
        Calculate sample size needed to detect a given effect size
        when comparing two means.

        Args:
            effect_size: Cohen's d (0.2=small, 0.5=medium, 0.8=large)
            alpha: Significance level
            power: Statistical power (probability of detecting real effect)
            ratio: Ratio of group sizes (n2/n1)
        """
        from scipy.stats import norm

        z_alpha = norm.ppf(1 - alpha / 2)
        z_beta = norm.ppf(power)

        n = ((z_alpha + z_beta) ** 2 * (1 + 1/ratio)) / effect_size**2
        return int(np.ceil(n))

    @staticmethod
    def for_proportion_comparison(
        p1: float,
        p2: float,
        alpha: float = 0.05,
        power: float = 0.80
    ) -> int:
        """
        Calculate sample size for comparing two proportions.
        Useful for error rate comparisons.
        """
        from scipy.stats import norm

        z_alpha = norm.ppf(1 - alpha / 2)
        z_beta = norm.ppf(power)

        p_avg = (p1 + p2) / 2
        n = (z_alpha * np.sqrt(2 * p_avg * (1 - p_avg)) +
             z_beta * np.sqrt(p1 * (1 - p1) + p2 * (1 - p2)))**2 / (p1 - p2)**2

        return int(np.ceil(n))

    @staticmethod
    def for_performance_test(
        baseline_mean: float,
        baseline_std: float,
        min_detectable_change_pct: float,
        alpha: float = 0.05,
        power: float = 0.80
    ) -> int:
        """
        Calculate how many test runs needed for performance testing.

        Args:
            baseline_mean: Known baseline mean (e.g., 200ms)
            baseline_std: Known baseline std dev (e.g., 30ms)
            min_detectable_change_pct: Smallest change to detect (e.g., 10%)
        """
        min_change = baseline_mean * (min_detectable_change_pct / 100)
        effect_size = min_change / baseline_std

        return SampleSizeCalculator.for_mean_comparison(
            effect_size=effect_size,
            alpha=alpha,
            power=power
        )


# Example usage
def demonstrate_sample_size():
    """Show how to determine sample sizes."""
    calc = SampleSizeCalculator()

    # Performance testing
    n = calc.for_performance_test(
        baseline_mean=200,  # 200ms average
        baseline_std=30,    # 30ms std dev
        min_detectable_change_pct=10  # Detect 10% change
    )
    print(f"Performance test: Need {n} samples per group")

    # Error rate comparison
    n = calc.for_proportion_comparison(
        p1=0.05,   # 5% baseline error rate
        p2=0.03,   # Want to detect drop to 3%
    )
    print(f"Error rate comparison: Need {n} samples per group")

    # General comparison
    n = calc.for_mean_comparison(
        effect_size=0.5,  # Medium effect
    )
    print(f"Medium effect detection: Need {n} samples per group")
```

## Best Practices

### Inferential Statistics Checklist

```markdown
## Inferential Statistics for Testing

### Choosing Tests
- [ ] Check data normality before choosing a test
- [ ] Use t-test for normal data comparisons
- [ ] Use Mann-Whitney for non-normal data
- [ ] Use Chi-squared for proportion comparisons
- [ ] Use appropriate significance level (usually 0.05)

### Sample Size
- [ ] Calculate required sample size before testing
- [ ] Ensure sufficient power (≥ 0.80)
- [ ] Account for expected effect size
- [ ] Collect enough data for reliable conclusions
- [ ] Don't stop testing early based on preliminary results

### Interpretation
- [ ] Report p-values AND effect sizes
- [ ] Use confidence intervals, not just p-values
- [ ] Consider practical significance, not just statistical
- [ ] Account for multiple comparisons
- [ ] Don't confuse correlation with causation

### Application
- [ ] Use for performance regression detection
- [ ] Compare error rates between versions
- [ ] Validate SLA compliance with confidence
- [ ] Make data-driven release decisions
- [ ] Track statistical trends over time
```

## Conclusion

Inferential statistics transforms test automation from subjective assessment to evidence-based decision making. By applying proper statistical methods, test automation professionals can confidently determine whether observed changes are meaningful and make reliable predictions about system behavior.

## Key Takeaways

1. Inferential statistics draws conclusions from sample data
2. Hypothesis tests determine if differences are significant
3. p-values indicate the probability of results under the null hypothesis
4. Confidence intervals provide ranges for true values
5. Effect size measures the practical magnitude of differences
6. Sample size must be calculated before testing
7. Choose the right test based on data characteristics
