# Trend Analysis: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Trend analysis examines data over time to identify patterns, directions, and anomalies. For test automation professionals, trend analysis reveals whether quality metrics are improving or degrading, enabling proactive decisions before problems become critical.

## What is Trend Analysis?

Trend analysis is the practice of collecting data points over successive time periods and analyzing them to identify consistent upward, downward, or stable patterns. In testing, it applies to pass rates, execution times, defect counts, code coverage, and flakiness rates.

### Trend Analysis in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Trend Analysis                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Key Testing Metrics to Track:                              │
│                                                             │
│  Pass Rate Trend:      Coverage Trend:                      │
│  100%│     ──●──●      100%│                               │
│   95%│──●──       ●     80%│    ──●──●──●                  │
│   90%│●              ●  60%│──●──                           │
│      └────────────────  40%│●                               │
│       W1 W2 W3 W4 W5       └────────────────               │
│                              W1 W2 W3 W4 W5                │
│                                                             │
│  Trend Types:                                               │
│  ├── Improving: Metric moving toward target                │
│  ├── Degrading: Metric moving away from target             │
│  ├── Stable: Metric hovering around a value                │
│  ├── Volatile: Large swings without clear direction        │
│  └── Step change: Sudden shift to new level                │
│                                                             │
│  Analysis Techniques:                                       │
│  ├── Moving average (smooths noise)                        │
│  ├── Linear regression (direction and rate)                │
│  ├── Standard deviation (volatility)                       │
│  ├── Change point detection (sudden shifts)                │
│  └── Seasonal decomposition (cyclic patterns)              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Trend Analysis

```python
# trend_analysis.py

"""
Trend analysis for test automation metrics.
"""

import pytest
import statistics
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional


@dataclass
class DataPoint:
    period: str  # "week-1", "sprint-5", etc.
    value: float


class TrendAnalyzer:
    """Analyze trends in time-series test metrics."""

    def __init__(self, data: List[DataPoint]):
        self.data = data
        self.values = [d.value for d in data]

    def moving_average(self, window: int = 3) -> List[float]:
        """Calculate moving average to smooth noise."""
        if len(self.values) < window:
            return list(self.values)
        return [
            statistics.mean(self.values[i:i + window])
            for i in range(len(self.values) - window + 1)
        ]

    def linear_trend(self) -> Dict:
        """Calculate linear regression trend."""
        n = len(self.values)
        if n < 2:
            return {"slope": 0, "direction": "insufficient_data"}

        x = list(range(n))
        x_mean = statistics.mean(x)
        y_mean = statistics.mean(self.values)

        numerator = sum((xi - x_mean) * (yi - y_mean) for xi, yi in zip(x, self.values))
        denominator = sum((xi - x_mean) ** 2 for xi in x)

        slope = numerator / denominator if denominator != 0 else 0
        intercept = y_mean - slope * x_mean

        # R-squared
        y_pred = [slope * xi + intercept for xi in x]
        ss_res = sum((y - yp) ** 2 for y, yp in zip(self.values, y_pred))
        ss_tot = sum((y - y_mean) ** 2 for y in self.values)
        r_squared = 1 - (ss_res / ss_tot) if ss_tot != 0 else 0

        return {
            "slope": round(slope, 4),
            "intercept": round(intercept, 4),
            "r_squared": round(r_squared, 4),
            "direction": "improving" if slope > 0.01 else "degrading" if slope < -0.01 else "stable",
            "strong_trend": r_squared > 0.7,
        }

    def volatility(self) -> Dict:
        """Measure how volatile the metric is."""
        if len(self.values) < 2:
            return {"stdev": 0, "cv": 0, "volatile": False}

        stdev = statistics.stdev(self.values)
        mean = statistics.mean(self.values)
        cv = stdev / mean if mean != 0 else 0

        return {
            "stdev": round(stdev, 4),
            "mean": round(mean, 4),
            "cv": round(cv, 4),  # Coefficient of variation
            "volatile": cv > 0.15,  # >15% variation is volatile
        }

    def detect_change_points(self, threshold: float = 2.0) -> List[Dict]:
        """Detect sudden changes in the metric."""
        if len(self.values) < 4:
            return []

        changes = []
        for i in range(2, len(self.values)):
            before = self.values[max(0, i - 3):i]
            after_val = self.values[i]

            before_mean = statistics.mean(before)
            before_stdev = statistics.stdev(before) if len(before) > 1 else 1

            if before_stdev == 0:
                before_stdev = 0.01

            z_score = abs(after_val - before_mean) / before_stdev
            if z_score > threshold:
                changes.append({
                    "period": self.data[i].period,
                    "index": i,
                    "value": after_val,
                    "expected": round(before_mean, 2),
                    "z_score": round(z_score, 2),
                    "direction": "increase" if after_val > before_mean else "decrease",
                })

        return changes

    def forecast_next(self) -> Optional[float]:
        """Simple linear forecast for next period."""
        trend = self.linear_trend()
        if trend["direction"] == "insufficient_data":
            return None
        n = len(self.values)
        return round(trend["slope"] * n + trend["intercept"], 2)


# Tests
class TestTrendAnalysis:

    def test_improving_trend(self):
        data = [DataPoint(f"w{i}", v) for i, v in enumerate([80, 82, 85, 87, 90, 92])]
        analyzer = TrendAnalyzer(data)
        trend = analyzer.linear_trend()

        assert trend["direction"] == "improving"
        assert trend["slope"] > 0
        assert trend["strong_trend"]

    def test_degrading_trend(self):
        data = [DataPoint(f"w{i}", v) for i, v in enumerate([95, 92, 88, 85, 80])]
        analyzer = TrendAnalyzer(data)
        trend = analyzer.linear_trend()

        assert trend["direction"] == "degrading"
        assert trend["slope"] < 0

    def test_stable_trend(self):
        data = [DataPoint(f"w{i}", v) for i, v in enumerate([90, 90.5, 89.5, 90, 90.5])]
        analyzer = TrendAnalyzer(data)
        trend = analyzer.linear_trend()

        assert trend["direction"] == "stable"

    def test_moving_average_smooths(self):
        data = [DataPoint(f"w{i}", v) for i, v in enumerate([90, 85, 95, 80, 90, 85])]
        analyzer = TrendAnalyzer(data)

        ma = analyzer.moving_average(window=3)
        raw_range = max(analyzer.values) - min(analyzer.values)
        ma_range = max(ma) - min(ma)
        assert ma_range < raw_range  # Smoothed should have less variation

    def test_volatility_detection(self):
        stable = [DataPoint(f"w{i}", v) for i, v in enumerate([90, 91, 89, 90, 91])]
        volatile = [DataPoint(f"w{i}", v) for i, v in enumerate([60, 95, 50, 98, 55])]

        assert not TrendAnalyzer(stable).volatility()["volatile"]
        assert TrendAnalyzer(volatile).volatility()["volatile"]

    def test_change_point_detection(self):
        # Stable then sudden drop
        data = [DataPoint(f"w{i}", v) for i, v in enumerate([90, 91, 89, 90, 50, 52])]
        analyzer = TrendAnalyzer(data)
        changes = analyzer.detect_change_points()

        assert len(changes) > 0
        assert changes[0]["direction"] == "decrease"

    def test_forecast(self):
        data = [DataPoint(f"w{i}", v) for i, v in enumerate([80, 82, 84, 86, 88])]
        analyzer = TrendAnalyzer(data)
        forecast = analyzer.forecast_next()

        assert forecast is not None
        assert forecast > 88  # Continuing upward trend
```

## Best Practices

```markdown
## Applying Trend Analysis

### Metric Selection
- [ ] Track pass rate, coverage, execution time, flaky rate
- [ ] Collect data consistently (same cadence, same conditions)
- [ ] Use moving averages to smooth out noise
- [ ] Set targets and alert thresholds for each metric

### Analysis
- [ ] Run linear regression to identify trend direction
- [ ] Use change point detection for sudden shifts
- [ ] Measure volatility to assess metric stability
- [ ] Distinguish real trends from random variation

### Action
- [ ] Investigate degrading trends before they become critical
- [ ] Celebrate and reinforce improving trends
- [ ] Use forecasts to anticipate capacity needs
- [ ] Share trend dashboards with stakeholders
```

## Conclusion

Trend analysis transforms raw test metrics into actionable intelligence. By tracking metrics over time, detecting changes, and forecasting future values, test automation professionals proactively address quality issues and demonstrate the impact of testing investments.

## Key Takeaways

1. Trend analysis identifies improving, degrading, or stable patterns over time
2. Moving averages smooth noise to reveal underlying trends
3. Linear regression quantifies trend direction and strength
4. Change point detection catches sudden shifts in metrics
5. Volatility measurement distinguishes stable from erratic metrics
6. Forecasting enables proactive planning based on current trends
7. Consistent data collection is essential for meaningful trend analysis
