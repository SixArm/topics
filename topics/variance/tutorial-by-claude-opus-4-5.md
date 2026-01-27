# Variance: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Variance measures how spread out data points are from the mean. For test automation professionals, variance is essential for understanding the consistency of test metrics — high variance in test execution times, pass rates, or performance results indicates instability that needs investigation.

## What is Variance?

Variance is a statistical measure of dispersion. It calculates the average of the squared differences from the mean. Standard deviation (the square root of variance) is often more intuitive because it's in the same units as the data. Low variance means consistent results; high variance means unpredictable results.

### Variance in Context

```
┌─────────────────────────────────────────────────────────────┐
│                       Variance                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Low Variance (consistent):     High Variance (unstable):  │
│                                                             │
│  ─────●●●●●─────                ●─────●───●──●───●──       │
│       ▲                              ▲                      │
│      mean                           mean                    │
│  Values cluster tightly        Values spread widely         │
│                                                             │
│  Formula:                                                   │
│  Variance = Σ(xi - mean)² / (n - 1)   (sample variance)   │
│  StdDev = √Variance                                        │
│  CV = StdDev / Mean                   (coefficient of var) │
│                                                             │
│  Testing Applications:                                      │
│  ├── Execution time variance → flaky infrastructure        │
│  ├── Pass rate variance → unstable tests                   │
│  ├── Response time variance → inconsistent performance     │
│  ├── Coverage variance → inconsistent test runs            │
│  └── Defect rate variance → unpredictable quality          │
│                                                             │
│  Interpretation:                                            │
│  ├── Low CV (< 10%): Metric is stable and reliable        │
│  ├── Medium CV (10-25%): Some variation, investigate       │
│  └── High CV (> 25%): Metric is unreliable, fix root cause│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Applying Variance to Test Metrics

```python
# variance.py

"""
Variance analysis for test automation metrics.
"""

import pytest
import math
import statistics
from dataclasses import dataclass
from typing import List, Dict, Tuple


class VarianceAnalyzer:
    """Analyze variance in test metrics."""

    def __init__(self, data: List[float]):
        if not data:
            raise ValueError("Data cannot be empty")
        self.data = data
        self.n = len(data)

    @property
    def mean(self) -> float:
        return statistics.mean(self.data)

    @property
    def variance(self) -> float:
        return statistics.variance(self.data) if self.n > 1 else 0

    @property
    def stdev(self) -> float:
        return statistics.stdev(self.data) if self.n > 1 else 0

    @property
    def cv(self) -> float:
        """Coefficient of variation (relative variability)."""
        return self.stdev / self.mean if self.mean != 0 else 0

    def stability_assessment(self) -> Dict:
        cv = self.cv
        if cv < 0.10:
            level = "stable"
            action = "Metric is reliable — no action needed"
        elif cv < 0.25:
            level = "moderate"
            action = "Some variation — investigate outliers"
        else:
            level = "unstable"
            action = "High variance — identify and fix root cause"

        return {
            "mean": round(self.mean, 2),
            "variance": round(self.variance, 2),
            "stdev": round(self.stdev, 2),
            "cv": round(cv, 4),
            "cv_pct": round(cv * 100, 1),
            "stability": level,
            "action": action,
        }

    def identify_outliers(self, threshold_stdevs: float = 2.0) -> Dict:
        """Find values more than N standard deviations from the mean."""
        if self.stdev == 0:
            return {"outliers": [], "count": 0}

        outliers = []
        for i, val in enumerate(self.data):
            z_score = abs(val - self.mean) / self.stdev
            if z_score > threshold_stdevs:
                outliers.append({
                    "index": i,
                    "value": val,
                    "z_score": round(z_score, 2),
                })

        return {
            "outliers": outliers,
            "count": len(outliers),
            "pct": round(len(outliers) / self.n * 100, 1),
        }

    def compare_variance(self, other_data: List[float]) -> Dict:
        """Compare variance between two data sets (e.g., before/after)."""
        other = VarianceAnalyzer(other_data)

        return {
            "set_a": {"mean": round(self.mean, 2), "stdev": round(self.stdev, 2), "cv": round(self.cv, 4)},
            "set_b": {"mean": round(other.mean, 2), "stdev": round(other.stdev, 2), "cv": round(other.cv, 4)},
            "variance_reduced": other.cv < self.cv,
            "improvement_pct": round((1 - other.cv / self.cv) * 100, 1) if self.cv > 0 else 0,
        }


class TestExecutionStability:
    """Monitor test execution time stability."""

    def __init__(self):
        self.test_runs: Dict[str, List[float]] = {}

    def record_run(self, test_name: str, duration_ms: float):
        if test_name not in self.test_runs:
            self.test_runs[test_name] = []
        self.test_runs[test_name].append(duration_ms)

    def flaky_by_duration(self, cv_threshold: float = 0.25) -> List[Dict]:
        """Find tests with high execution time variance."""
        flaky = []
        for test_name, durations in self.test_runs.items():
            if len(durations) < 3:
                continue
            analyzer = VarianceAnalyzer(durations)
            if analyzer.cv > cv_threshold:
                flaky.append({
                    "test": test_name,
                    "runs": len(durations),
                    "mean_ms": round(analyzer.mean, 1),
                    "stdev_ms": round(analyzer.stdev, 1),
                    "cv": round(analyzer.cv, 3),
                    "min_ms": min(durations),
                    "max_ms": max(durations),
                })
        return sorted(flaky, key=lambda x: x["cv"], reverse=True)


# Tests
class TestVariance:

    def test_low_variance_is_stable(self):
        data = [100, 102, 98, 101, 99, 100, 101, 99]
        analyzer = VarianceAnalyzer(data)
        result = analyzer.stability_assessment()

        assert result["stability"] == "stable"
        assert result["cv_pct"] < 10

    def test_high_variance_is_unstable(self):
        data = [50, 200, 80, 300, 40, 250, 60, 180]
        analyzer = VarianceAnalyzer(data)
        result = analyzer.stability_assessment()

        assert result["stability"] == "unstable"
        assert result["cv_pct"] > 25

    def test_outlier_detection(self):
        data = [100, 102, 98, 101, 99, 500, 100, 101]
        analyzer = VarianceAnalyzer(data)
        result = analyzer.identify_outliers(threshold_stdevs=2.0)

        assert result["count"] >= 1
        assert any(o["value"] == 500 for o in result["outliers"])

    def test_no_outliers(self):
        data = [100, 102, 98, 101, 99]
        analyzer = VarianceAnalyzer(data)
        result = analyzer.identify_outliers()
        assert result["count"] == 0

    def test_variance_comparison(self):
        before = [100, 150, 80, 200, 60, 180]
        after = [95, 105, 98, 102, 100, 97]

        analyzer = VarianceAnalyzer(before)
        result = analyzer.compare_variance(after)

        assert result["variance_reduced"]
        assert result["improvement_pct"] > 0

    def test_flaky_test_detection(self):
        stability = TestExecutionStability()
        # Stable test
        for d in [100, 102, 98, 101, 99]:
            stability.record_run("test_login", d)
        # Flaky test (high duration variance)
        for d in [50, 500, 80, 400, 60]:
            stability.record_run("test_checkout", d)

        flaky = stability.flaky_by_duration(cv_threshold=0.25)
        assert len(flaky) >= 1
        assert flaky[0]["test"] == "test_checkout"

    def test_empty_data_raises(self):
        with pytest.raises(ValueError):
            VarianceAnalyzer([])

    def test_single_data_point(self):
        analyzer = VarianceAnalyzer([100])
        assert analyzer.variance == 0
        assert analyzer.stdev == 0
```

## Best Practices

```markdown
## Applying Variance Analysis

### Metric Monitoring
- [ ] Calculate CV for all key test metrics
- [ ] Flag metrics with CV > 25% as unstable
- [ ] Track variance trends over time
- [ ] Use variance to identify flaky tests

### Root Cause Analysis
- [ ] Investigate outliers that spike variance
- [ ] Check infrastructure changes when variance increases
- [ ] Correlate variance with deployment events
- [ ] Remove outliers only when they represent known anomalies

### Improvement
- [ ] Compare variance before and after changes
- [ ] Set variance targets for critical metrics
- [ ] Use reduced variance as a quality improvement indicator
- [ ] Report stability improvements alongside mean improvements
```

## Conclusion

Variance analysis is essential for understanding the reliability of test metrics. A metric with low variance is trustworthy for decision-making; high variance indicates instability that undermines confidence. By monitoring variance, identifying outliers, and tracking stability trends, test automation professionals ensure their metrics are actionable.

## Key Takeaways

1. Variance measures how spread out data points are from the mean
2. Coefficient of variation (CV) enables comparison across different metrics
3. CV < 10% is stable; 10-25% needs investigation; > 25% requires action
4. High execution time variance is a flakiness indicator
5. Outlier detection uses z-scores to find anomalous data points
6. Compare variance before and after changes to measure improvement
7. Stable metrics are trustworthy; unstable metrics require root cause investigation
