# Statistical Analysis: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Statistical analysis applies mathematical methods to collect, organize, analyze, and interpret data. For test automation professionals, statistical analysis enables data-driven decisions about test effectiveness, defect patterns, performance baselines, and release quality.

## What is Statistical Analysis?

Statistical analysis uses mathematical techniques to extract meaningful patterns from data. In test automation, it applies to analyzing test results, measuring performance, assessing coverage effectiveness, and determining whether observed differences are significant or due to random variation.

### Statistical Analysis in Context

```
┌─────────────────────────────────────────────────────────────┐
│                   Statistical Analysis                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Descriptive Statistics:                                    │
│  ├── Mean: Average value                                   │
│  ├── Median: Middle value                                  │
│  ├── Mode: Most frequent value                             │
│  ├── Standard deviation: Spread of data                    │
│  ├── Percentiles: P50, P95, P99                            │
│  └── Range: Min to max                                     │
│                                                             │
│  Inferential Statistics:                                    │
│  ├── Hypothesis testing: Is this change significant?       │
│  ├── Confidence intervals: Range of likely values          │
│  ├── Regression: Relationship between variables            │
│  └── Correlation: Strength of association                  │
│                                                             │
│  Application to Testing:                                    │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ Collect Data     │  │ Analyze          │                │
│  │ • Test results   │─►│ • Trends         │                │
│  │ • Response times │  │ • Anomalies      │                │
│  │ • Defect rates   │  │ • Significance   │                │
│  └──────────────────┘  └──────────────────┘                │
│           │                      │                          │
│           ▼                      ▼                          │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ Visualize        │  │ Decide           │                │
│  │ • Charts         │  │ • Release?       │                │
│  │ • Distributions  │  │ • Investigate?   │                │
│  │ • Trends         │  │ • Optimize?      │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Statistical Analysis for Testing

```python
# statistical_analysis.py

"""
Statistical analysis tools for test automation data.
"""

import pytest
import math
import statistics
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple


@dataclass
class DescriptiveStats:
    """Descriptive statistics for a dataset."""
    count: int
    mean: float
    median: float
    stdev: float
    min_val: float
    max_val: float
    p50: float
    p95: float
    p99: float

    @classmethod
    def from_data(cls, data: List[float]) -> 'DescriptiveStats':
        if not data:
            raise ValueError("Cannot compute stats on empty data")
        sorted_data = sorted(data)
        n = len(sorted_data)
        return cls(
            count=n,
            mean=statistics.mean(data),
            median=statistics.median(data),
            stdev=statistics.stdev(data) if n > 1 else 0,
            min_val=min(data),
            max_val=max(data),
            p50=sorted_data[int(n * 0.50)],
            p95=sorted_data[min(int(n * 0.95), n - 1)],
            p99=sorted_data[min(int(n * 0.99), n - 1)],
        )


def is_significant_change(
    baseline: List[float],
    current: List[float],
    threshold: float = 0.05
) -> Tuple[bool, float]:
    """Simple significance test (Welch's t-test approximation)."""
    n1, n2 = len(baseline), len(current)
    if n1 < 2 or n2 < 2:
        return False, 1.0

    mean1, mean2 = statistics.mean(baseline), statistics.mean(current)
    var1 = statistics.variance(baseline)
    var2 = statistics.variance(current)

    se = math.sqrt(var1 / n1 + var2 / n2)
    if se == 0:
        return False, 1.0

    t_stat = abs(mean1 - mean2) / se

    # Rough p-value approximation using degrees of freedom
    df = min(n1, n2) - 1
    # For large df, t > 2 is roughly p < 0.05
    significant = t_stat > 2.0

    return significant, t_stat


def detect_anomalies(
    data: List[float], z_threshold: float = 2.0
) -> List[Tuple[int, float]]:
    """Detect anomalies using z-score method."""
    if len(data) < 3:
        return []

    mean = statistics.mean(data)
    stdev = statistics.stdev(data)

    if stdev == 0:
        return []

    anomalies = []
    for i, value in enumerate(data):
        z_score = abs(value - mean) / stdev
        if z_score > z_threshold:
            anomalies.append((i, value))

    return anomalies


def calculate_trend(data: List[float]) -> Dict[str, float]:
    """Calculate linear trend using least squares."""
    n = len(data)
    if n < 2:
        return {"slope": 0, "direction": "stable"}

    x = list(range(n))
    x_mean = statistics.mean(x)
    y_mean = statistics.mean(data)

    numerator = sum((x[i] - x_mean) * (data[i] - y_mean) for i in range(n))
    denominator = sum((x[i] - x_mean) ** 2 for i in range(n))

    slope = numerator / denominator if denominator != 0 else 0

    direction = "improving" if slope < 0 else "degrading" if slope > 0 else "stable"

    return {
        "slope": round(slope, 4),
        "direction": direction,
        "change_per_period": round(slope, 4),
    }


# Tests
class TestStatisticalAnalysis:
    """Test statistical analysis tools."""

    def test_descriptive_stats(self):
        data = [100, 150, 200, 250, 300, 350, 400, 450, 500, 1000]
        stats = DescriptiveStats.from_data(data)

        assert stats.count == 10
        assert stats.mean == pytest.approx(390.0)
        assert stats.median == pytest.approx(325.0)
        assert stats.min_val == 100
        assert stats.max_val == 1000
        assert stats.p95 > stats.p50

    def test_significant_change_detected(self):
        baseline = [100, 105, 98, 102, 101, 99, 103, 97, 104, 100]
        degraded = [150, 155, 148, 152, 151, 149, 153, 147, 154, 150]

        significant, t_stat = is_significant_change(baseline, degraded)
        assert significant
        assert t_stat > 2.0

    def test_no_significant_change(self):
        baseline = [100, 105, 98, 102, 101, 99, 103, 97, 104, 100]
        similar = [101, 104, 99, 103, 100, 98, 102, 98, 105, 101]

        significant, _ = is_significant_change(baseline, similar)
        assert not significant

    def test_anomaly_detection(self):
        data = [100, 102, 98, 101, 99, 100, 103, 97, 500, 101]
        anomalies = detect_anomalies(data, z_threshold=2.0)

        assert len(anomalies) > 0
        anomaly_values = [v for _, v in anomalies]
        assert 500 in anomaly_values

    def test_no_anomalies_in_normal_data(self):
        data = [100, 102, 98, 101, 99, 100, 103, 97, 101, 100]
        anomalies = detect_anomalies(data, z_threshold=3.0)
        assert len(anomalies) == 0

    def test_trend_detection_degrading(self):
        data = [100, 110, 120, 130, 140, 150]  # Response times increasing
        trend = calculate_trend(data)
        assert trend["direction"] == "degrading"
        assert trend["slope"] > 0

    def test_trend_detection_improving(self):
        data = [150, 140, 130, 120, 110, 100]  # Response times decreasing
        trend = calculate_trend(data)
        assert trend["direction"] == "improving"
        assert trend["slope"] < 0

    def test_trend_detection_stable(self):
        data = [100, 100, 100, 100, 100]
        trend = calculate_trend(data)
        assert trend["direction"] == "stable"
```

### JavaScript Implementation

```javascript
// statistical-analysis.test.js

function mean(data) {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

function stdev(data) {
  const avg = mean(data);
  const sqDiffs = data.map((v) => (v - avg) ** 2);
  return Math.sqrt(sqDiffs.reduce((a, b) => a + b, 0) / (data.length - 1));
}

function percentile(data, p) {
  const sorted = [...data].sort((a, b) => a - b);
  const idx = Math.min(Math.floor(sorted.length * p), sorted.length - 1);
  return sorted[idx];
}

function detectAnomalies(data, zThreshold = 2.0) {
  const avg = mean(data);
  const sd = stdev(data);
  if (sd === 0) return [];
  return data
    .map((v, i) => ({ index: i, value: v, zScore: Math.abs(v - avg) / sd }))
    .filter((d) => d.zScore > zThreshold);
}

describe('Statistical Analysis', () => {
  test('calculates descriptive statistics', () => {
    const data = [100, 150, 200, 250, 300];
    expect(mean(data)).toBe(200);
    expect(percentile(data, 0.5)).toBe(200);
    expect(percentile(data, 0.95)).toBe(300);
  });

  test('detects anomalies', () => {
    const data = [100, 102, 98, 101, 99, 500];
    const anomalies = detectAnomalies(data);
    expect(anomalies.length).toBeGreaterThan(0);
    expect(anomalies[0].value).toBe(500);
  });

  test('no anomalies in normal data', () => {
    const data = [100, 102, 98, 101, 99, 100];
    const anomalies = detectAnomalies(data, 3.0);
    expect(anomalies).toHaveLength(0);
  });

  test('calculates standard deviation', () => {
    const data = [100, 100, 100, 100];
    expect(stdev(data)).toBe(0);
  });
});
```

## Best Practices

```markdown
## Statistical Analysis Best Practices

### Data Collection
- [ ] Collect sufficient sample sizes for reliable analysis
- [ ] Record data consistently across test runs
- [ ] Store raw data alongside computed metrics
- [ ] Timestamp all measurements

### Analysis
- [ ] Use percentiles (P95, P99) instead of averages for latency
- [ ] Apply significance tests before concluding changes are real
- [ ] Detect anomalies using z-scores or IQR method
- [ ] Track trends over time with regression analysis

### Reporting
- [ ] Visualize distributions, not just single numbers
- [ ] Include confidence intervals with estimates
- [ ] Distinguish correlation from causation
- [ ] Present both raw data and computed statistics

### Automation
- [ ] Automate statistical analysis in CI/CD pipeline
- [ ] Set alerts on statistically significant regressions
- [ ] Generate automated performance trend reports
- [ ] Use statistical baselines for quality gates
```

## Conclusion

Statistical analysis transforms raw test data into actionable insights. By applying descriptive statistics, significance testing, anomaly detection, and trend analysis, test automation professionals make objective, data-driven decisions about software quality and release readiness.

## Key Takeaways

1. Use descriptive statistics (mean, median, percentiles, stdev) to summarize test data
2. Apply significance tests to determine if changes are real or random
3. Detect anomalies using z-scores to find outlier test results
4. Track trends over time to identify degrading or improving quality
5. Use percentiles (P95, P99) for performance metrics, not averages
6. Collect sufficient sample sizes for reliable statistical conclusions
7. Automate statistical analysis in CI/CD for continuous quality monitoring
