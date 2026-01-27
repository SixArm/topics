# Statistical Analysis Techniques: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Statistical analysis techniques provide the mathematical foundation for interpreting test data, identifying trends, detecting anomalies, and making evidence-based decisions. For test automation professionals, these techniques transform raw test results into actionable insights about software quality.

## What are Statistical Analysis Techniques?

Statistical analysis techniques are methods for collecting, organizing, analyzing, and interpreting numerical data. In test automation, they help distinguish signal from noise in test results, establish baselines, detect regressions, and quantify confidence in quality metrics.

### Statistical Analysis Techniques in Context

```
┌─────────────────────────────────────────────────────────────┐
│              Statistical Analysis Techniques                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Descriptive Statistics:                                    │
│  ├── Mean, Median, Mode (central tendency)                 │
│  ├── Standard Deviation, Variance (spread)                 │
│  ├── Percentiles (P50, P90, P95, P99)                     │
│  └── Range, IQR (distribution shape)                       │
│                                                             │
│  Inferential Statistics:                                    │
│  ├── Hypothesis testing (is this change significant?)      │
│  ├── Confidence intervals (range of true value)            │
│  ├── Regression analysis (trends over time)                │
│  └── Correlation (do metrics move together?)               │
│                                                             │
│  Testing Applications:                                      │
│  ├── Performance: P95 response times, throughput analysis  │
│  ├── Reliability: MTBF, failure rate calculations          │
│  ├── Quality: Defect density, escape rate trends           │
│  ├── Flakiness: Failure rate confidence intervals          │
│  └── Coverage: Diminishing returns analysis                │
│                                                             │
│  Decision Framework:                                        │
│  ├── Is this performance change a real regression?         │
│  ├── Is the test suite stable enough to gate releases?     │
│  ├── Are we testing enough to be confident in quality?     │
│  └── Where should we invest more testing effort?           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Applying Statistical Techniques to Testing

```python
# statistical_analysis_techniques.py

"""
Statistical analysis techniques for test automation metrics.
"""

import pytest
import math
import statistics
from dataclasses import dataclass
from typing import List, Dict, Optional, Tuple


@dataclass
class DescriptiveStats:
    """Descriptive statistics for a dataset."""
    count: int
    mean: float
    median: float
    stdev: float
    variance: float
    p50: float
    p90: float
    p95: float
    p99: float
    min_val: float
    max_val: float
    iqr: float

    @classmethod
    def from_data(cls, data: List[float]) -> "DescriptiveStats":
        if not data:
            raise ValueError("Cannot compute stats for empty data")

        sorted_data = sorted(data)
        n = len(sorted_data)

        def percentile(pct):
            idx = (pct / 100) * (n - 1)
            lower = int(idx)
            upper = min(lower + 1, n - 1)
            frac = idx - lower
            return sorted_data[lower] + frac * (sorted_data[upper] - sorted_data[lower])

        q1 = percentile(25)
        q3 = percentile(75)

        return cls(
            count=n,
            mean=statistics.mean(data),
            median=statistics.median(data),
            stdev=statistics.stdev(data) if n > 1 else 0,
            variance=statistics.variance(data) if n > 1 else 0,
            p50=percentile(50),
            p90=percentile(90),
            p95=percentile(95),
            p99=percentile(99),
            min_val=min(data),
            max_val=max(data),
            iqr=q3 - q1,
        )


def detect_outliers_iqr(data: List[float], multiplier: float = 1.5) -> Dict:
    """Detect outliers using the IQR method."""
    sorted_data = sorted(data)
    n = len(sorted_data)
    q1_idx = n // 4
    q3_idx = 3 * n // 4
    q1 = sorted_data[q1_idx]
    q3 = sorted_data[q3_idx]
    iqr = q3 - q1

    lower = q1 - multiplier * iqr
    upper = q3 + multiplier * iqr

    outliers = [x for x in data if x < lower or x > upper]
    return {
        "outliers": outliers,
        "lower_bound": lower,
        "upper_bound": upper,
        "outlier_count": len(outliers),
        "outlier_pct": len(outliers) / len(data) * 100,
    }


def welch_t_test(sample_a: List[float], sample_b: List[float]) -> Dict:
    """Simplified Welch's t-test for comparing two samples."""
    n_a, n_b = len(sample_a), len(sample_b)
    mean_a, mean_b = statistics.mean(sample_a), statistics.mean(sample_b)
    var_a = statistics.variance(sample_a) if n_a > 1 else 0
    var_b = statistics.variance(sample_b) if n_b > 1 else 0

    se = math.sqrt(var_a / n_a + var_b / n_b) if (var_a / n_a + var_b / n_b) > 0 else 0.001
    t_stat = (mean_a - mean_b) / se

    # Approximate significance (simplified)
    significant = abs(t_stat) > 1.96  # ~95% confidence

    return {
        "mean_a": mean_a,
        "mean_b": mean_b,
        "difference": mean_b - mean_a,
        "t_statistic": round(t_stat, 4),
        "significant": significant,
        "direction": "increase" if mean_b > mean_a else "decrease" if mean_b < mean_a else "no change",
    }


def trend_analysis(data_points: List[Tuple[float, float]]) -> Dict:
    """Linear regression for trend detection (x=time, y=metric)."""
    n = len(data_points)
    if n < 2:
        return {"slope": 0, "trend": "insufficient data"}

    x_vals = [p[0] for p in data_points]
    y_vals = [p[1] for p in data_points]

    x_mean = statistics.mean(x_vals)
    y_mean = statistics.mean(y_vals)

    numerator = sum((x - x_mean) * (y - y_mean) for x, y in data_points)
    denominator = sum((x - x_mean) ** 2 for x in x_vals)

    slope = numerator / denominator if denominator != 0 else 0
    intercept = y_mean - slope * x_mean

    # R-squared
    y_pred = [slope * x + intercept for x in x_vals]
    ss_res = sum((y - yp) ** 2 for y, yp in zip(y_vals, y_pred))
    ss_tot = sum((y - y_mean) ** 2 for y in y_vals)
    r_squared = 1 - (ss_res / ss_tot) if ss_tot != 0 else 0

    trend = "improving" if slope < 0 else "degrading" if slope > 0 else "stable"

    return {
        "slope": round(slope, 4),
        "intercept": round(intercept, 4),
        "r_squared": round(r_squared, 4),
        "trend": trend,
        "strong_trend": r_squared > 0.7,
    }


# Tests
class TestStatisticalAnalysisTechniques:
    """Test statistical analysis tools."""

    def test_descriptive_stats(self):
        data = [100, 120, 110, 105, 115, 200, 108, 112, 109, 111]
        stats = DescriptiveStats.from_data(data)

        assert stats.count == 10
        assert 110 < stats.mean < 130
        assert stats.median < stats.mean  # Skewed by outlier 200
        assert stats.p95 > stats.p50
        assert stats.stdev > 0

    def test_percentiles_ordered(self):
        data = list(range(1, 101))  # 1 to 100
        stats = DescriptiveStats.from_data(data)

        assert stats.p50 <= stats.p90
        assert stats.p90 <= stats.p95
        assert stats.p95 <= stats.p99

    def test_outlier_detection(self):
        normal = [100, 102, 98, 101, 99, 103, 97, 100, 101, 99]
        with_outliers = normal + [500, 10]  # Clear outliers

        result = detect_outliers_iqr(with_outliers)
        assert result["outlier_count"] >= 1
        assert 500 in result["outliers"]

    def test_no_outliers(self):
        data = [100, 101, 99, 100, 102, 98, 101, 100]
        result = detect_outliers_iqr(data)
        assert result["outlier_count"] == 0

    def test_welch_t_test_significant(self):
        before = [200, 210, 195, 205, 198, 202, 207, 196, 203, 201]
        after = [250, 260, 245, 255, 248, 252, 257, 246, 253, 251]

        result = welch_t_test(before, after)
        assert result["significant"]
        assert result["direction"] == "increase"

    def test_welch_t_test_not_significant(self):
        group_a = [100, 102, 98, 101, 99]
        group_b = [101, 99, 100, 102, 98]

        result = welch_t_test(group_a, group_b)
        assert not result["significant"]

    def test_trend_analysis_degrading(self):
        # Response times increasing over weeks
        points = [(1, 100), (2, 110), (3, 115), (4, 125), (5, 140)]
        result = trend_analysis(points)

        assert result["slope"] > 0
        assert result["trend"] == "degrading"
        assert result["strong_trend"]

    def test_trend_analysis_improving(self):
        # Failure rates decreasing
        points = [(1, 50), (2, 40), (3, 35), (4, 25), (5, 15)]
        result = trend_analysis(points)

        assert result["slope"] < 0
        assert result["trend"] == "improving"
```

## Best Practices

```markdown
## Applying Statistical Analysis to Testing

### Descriptive Statistics
- [ ] Report P50, P90, P95, P99 for performance metrics
- [ ] Use median over mean for skewed distributions
- [ ] Calculate IQR to identify and handle outliers
- [ ] Track standard deviation to measure consistency

### Significance Testing
- [ ] Use t-tests to validate performance regressions
- [ ] Require statistical significance before failing builds
- [ ] Collect sufficient samples for reliable comparisons
- [ ] Report effect size alongside significance

### Trend Analysis
- [ ] Track metrics over time with linear regression
- [ ] Detect degradation trends before they become critical
- [ ] Use R-squared to assess trend strength
- [ ] Alert on sustained negative trends, not single points
```

## Conclusion

Statistical analysis techniques give test automation professionals the tools to interpret test data rigorously. By applying descriptive statistics, significance testing, outlier detection, and trend analysis, teams make evidence-based decisions about quality rather than relying on intuition or single data points.

## Key Takeaways

1. Use descriptive statistics (mean, median, percentiles, stdev) to summarize test metrics
2. Percentiles (P90, P95, P99) reveal tail behavior that averages hide
3. The IQR method reliably detects outliers in test performance data
4. Use Welch's t-test to determine if performance changes are statistically significant
5. Trend analysis with linear regression detects gradual degradation over time
6. R-squared measures how well a trend line fits the data
7. Always collect sufficient sample sizes before drawing conclusions
