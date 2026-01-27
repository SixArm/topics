# Descriptive Statistics: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Descriptive statistics summarize and describe the main features of a dataset. For test automation professionals, descriptive statistics are essential for analyzing test results, understanding performance distributions, identifying anomalies, and communicating findings effectively.

## What are Descriptive Statistics?

Descriptive statistics provide simple summaries about data samples and observations. Unlike inferential statistics, they describe what the data shows rather than making predictions or generalizations.

### Categories of Descriptive Statistics

```
┌─────────────────────────────────────────────────────────────┐
│              Descriptive Statistics Categories               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Measures of Central Tendency                               │
│  ├── Mean (average)                                        │
│  ├── Median (middle value)                                 │
│  └── Mode (most frequent)                                  │
│                                                             │
│  Measures of Spread/Dispersion                             │
│  ├── Range (max - min)                                     │
│  ├── Variance                                              │
│  ├── Standard Deviation                                    │
│  ├── Interquartile Range (IQR)                            │
│  └── Coefficient of Variation                              │
│                                                             │
│  Measures of Shape                                          │
│  ├── Skewness (asymmetry)                                  │
│  └── Kurtosis (tail heaviness)                             │
│                                                             │
│  Measures of Position                                       │
│  ├── Percentiles                                           │
│  ├── Quartiles                                             │
│  └── Z-scores                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Descriptive Statistics

### Python Implementation

```python
import statistics
import math
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from collections import Counter

@dataclass
class DescriptiveStats:
    """Container for descriptive statistics results."""
    count: int
    mean: float
    median: float
    mode: Optional[float]
    min_value: float
    max_value: float
    range_value: float
    variance: float
    std_dev: float
    iqr: float
    skewness: float
    kurtosis: float
    percentiles: Dict[int, float]

class DescriptiveStatistics:
    """Calculate descriptive statistics for test data."""

    def __init__(self, data: List[float]):
        self.data = sorted(data)
        self.n = len(data)

        if self.n == 0:
            raise ValueError("Data cannot be empty")

    def calculate_all(self) -> DescriptiveStats:
        """Calculate all descriptive statistics."""
        return DescriptiveStats(
            count=self.n,
            mean=self.mean(),
            median=self.median(),
            mode=self.mode(),
            min_value=self.min(),
            max_value=self.max(),
            range_value=self.range(),
            variance=self.variance(),
            std_dev=self.std_dev(),
            iqr=self.iqr(),
            skewness=self.skewness(),
            kurtosis=self.kurtosis(),
            percentiles=self.percentiles([25, 50, 75, 90, 95, 99])
        )

    # Measures of Central Tendency

    def mean(self) -> float:
        """Calculate arithmetic mean (average)."""
        return sum(self.data) / self.n

    def median(self) -> float:
        """Calculate median (middle value)."""
        mid = self.n // 2
        if self.n % 2 == 0:
            return (self.data[mid - 1] + self.data[mid]) / 2
        return self.data[mid]

    def mode(self) -> Optional[float]:
        """Calculate mode (most frequent value)."""
        counter = Counter(self.data)
        if not counter:
            return None

        max_count = max(counter.values())
        modes = [k for k, v in counter.items() if v == max_count]

        if len(modes) == self.n:
            return None  # No mode if all values are unique

        return modes[0]  # Return first mode if multiple

    def geometric_mean(self) -> float:
        """Calculate geometric mean (useful for rates/ratios)."""
        if any(x <= 0 for x in self.data):
            raise ValueError("Geometric mean requires positive values")

        product = math.prod(self.data)
        return product ** (1 / self.n)

    def harmonic_mean(self) -> float:
        """Calculate harmonic mean (useful for rates)."""
        if any(x <= 0 for x in self.data):
            raise ValueError("Harmonic mean requires positive values")

        return self.n / sum(1/x for x in self.data)

    # Measures of Spread/Dispersion

    def min(self) -> float:
        """Return minimum value."""
        return self.data[0]

    def max(self) -> float:
        """Return maximum value."""
        return self.data[-1]

    def range(self) -> float:
        """Calculate range (max - min)."""
        return self.max() - self.min()

    def variance(self, population: bool = False) -> float:
        """
        Calculate variance.
        population=True for population variance, False for sample variance.
        """
        mean = self.mean()
        squared_diff = sum((x - mean) ** 2 for x in self.data)

        if population:
            return squared_diff / self.n
        return squared_diff / (self.n - 1)  # Bessel's correction

    def std_dev(self, population: bool = False) -> float:
        """Calculate standard deviation."""
        return math.sqrt(self.variance(population))

    def coefficient_of_variation(self) -> float:
        """Calculate coefficient of variation (CV = std_dev / mean)."""
        mean = self.mean()
        if mean == 0:
            return float('inf')
        return self.std_dev() / mean

    def iqr(self) -> float:
        """Calculate interquartile range (Q3 - Q1)."""
        q1 = self.percentile(25)
        q3 = self.percentile(75)
        return q3 - q1

    # Measures of Position

    def percentile(self, p: float) -> float:
        """Calculate the p-th percentile."""
        if not 0 <= p <= 100:
            raise ValueError("Percentile must be between 0 and 100")

        index = (p / 100) * (self.n - 1)
        lower = int(index)
        upper = lower + 1
        fraction = index - lower

        if upper >= self.n:
            return self.data[-1]

        return self.data[lower] + fraction * (self.data[upper] - self.data[lower])

    def percentiles(self, percentile_list: List[int]) -> Dict[int, float]:
        """Calculate multiple percentiles."""
        return {p: self.percentile(p) for p in percentile_list}

    def quartiles(self) -> Dict[str, float]:
        """Calculate quartiles."""
        return {
            'Q1': self.percentile(25),
            'Q2': self.percentile(50),
            'Q3': self.percentile(75)
        }

    def z_score(self, value: float) -> float:
        """Calculate z-score for a value."""
        return (value - self.mean()) / self.std_dev()

    # Measures of Shape

    def skewness(self) -> float:
        """
        Calculate skewness (measure of asymmetry).
        Positive = right-tailed, Negative = left-tailed
        """
        mean = self.mean()
        std = self.std_dev()

        if std == 0:
            return 0

        skew = sum(((x - mean) / std) ** 3 for x in self.data) / self.n
        return skew

    def kurtosis(self) -> float:
        """
        Calculate excess kurtosis (measure of tail heaviness).
        Positive = heavy tails, Negative = light tails
        """
        mean = self.mean()
        std = self.std_dev()

        if std == 0:
            return 0

        kurt = sum(((x - mean) / std) ** 4 for x in self.data) / self.n
        return kurt - 3  # Excess kurtosis (normal distribution = 0)


# Example usage with test data
class TestResultAnalyzer:
    """Analyze test execution results using descriptive statistics."""

    def __init__(self):
        self.execution_times: List[float] = []
        self.memory_usage: List[float] = []
        self.error_counts: List[int] = []

    def add_test_run(
        self,
        execution_time: float,
        memory_mb: float,
        errors: int
    ):
        """Record a test run."""
        self.execution_times.append(execution_time)
        self.memory_usage.append(memory_mb)
        self.error_counts.append(errors)

    def analyze_execution_times(self) -> Dict[str, Any]:
        """Analyze execution time distribution."""
        stats = DescriptiveStatistics(self.execution_times)
        result = stats.calculate_all()

        return {
            'average_time': result.mean,
            'median_time': result.median,
            'fastest': result.min_value,
            'slowest': result.max_value,
            'std_deviation': result.std_dev,
            'p95': result.percentiles[95],
            'p99': result.percentiles[99],
            'variability': stats.coefficient_of_variation(),
            'distribution_shape': {
                'skewness': result.skewness,
                'kurtosis': result.kurtosis
            }
        }

    def identify_outliers(self, metric: str = 'execution_times') -> List[float]:
        """Identify outliers using IQR method."""
        data = getattr(self, metric)
        stats = DescriptiveStatistics(data)

        q1 = stats.percentile(25)
        q3 = stats.percentile(75)
        iqr = q3 - q1

        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr

        return [x for x in data if x < lower_bound or x > upper_bound]

    def generate_summary_report(self) -> str:
        """Generate a text summary of test statistics."""
        time_stats = self.analyze_execution_times()

        report = f"""
Test Execution Statistics Summary
=================================

Execution Time Analysis:
  Sample Size: {len(self.execution_times)} runs
  Average: {time_stats['average_time']:.2f}ms
  Median: {time_stats['median_time']:.2f}ms
  Std Dev: {time_stats['std_deviation']:.2f}ms
  Min: {time_stats['fastest']:.2f}ms
  Max: {time_stats['slowest']:.2f}ms

Percentiles:
  P95: {time_stats['p95']:.2f}ms
  P99: {time_stats['p99']:.2f}ms

Distribution:
  Skewness: {time_stats['distribution_shape']['skewness']:.3f}
  Kurtosis: {time_stats['distribution_shape']['kurtosis']:.3f}
  CV: {time_stats['variability']:.2%}

Outliers Detected: {len(self.identify_outliers())}
"""
        return report
```

### JavaScript/TypeScript Implementation

```typescript
// descriptive-stats.ts
interface DescriptiveStatsResult {
  count: number;
  mean: number;
  median: number;
  mode: number | null;
  min: number;
  max: number;
  range: number;
  variance: number;
  stdDev: number;
  iqr: number;
  skewness: number;
  kurtosis: number;
  percentiles: Record<number, number>;
}

class DescriptiveStatistics {
  private data: number[];
  private sortedData: number[];
  private n: number;

  constructor(data: number[]) {
    if (data.length === 0) {
      throw new Error('Data cannot be empty');
    }

    this.data = data;
    this.sortedData = [...data].sort((a, b) => a - b);
    this.n = data.length;
  }

  calculateAll(): DescriptiveStatsResult {
    return {
      count: this.n,
      mean: this.mean(),
      median: this.median(),
      mode: this.mode(),
      min: this.min(),
      max: this.max(),
      range: this.range(),
      variance: this.variance(),
      stdDev: this.stdDev(),
      iqr: this.iqr(),
      skewness: this.skewness(),
      kurtosis: this.kurtosis(),
      percentiles: this.percentiles([25, 50, 75, 90, 95, 99])
    };
  }

  // Central Tendency
  mean(): number {
    return this.data.reduce((sum, x) => sum + x, 0) / this.n;
  }

  median(): number {
    const mid = Math.floor(this.n / 2);
    if (this.n % 2 === 0) {
      return (this.sortedData[mid - 1] + this.sortedData[mid]) / 2;
    }
    return this.sortedData[mid];
  }

  mode(): number | null {
    const frequency: Map<number, number> = new Map();

    for (const value of this.data) {
      frequency.set(value, (frequency.get(value) || 0) + 1);
    }

    let maxFreq = 0;
    let mode: number | null = null;

    for (const [value, freq] of frequency) {
      if (freq > maxFreq) {
        maxFreq = freq;
        mode = value;
      }
    }

    // No mode if all values appear same number of times
    if (maxFreq === 1) {
      return null;
    }

    return mode;
  }

  // Dispersion
  min(): number {
    return this.sortedData[0];
  }

  max(): number {
    return this.sortedData[this.n - 1];
  }

  range(): number {
    return this.max() - this.min();
  }

  variance(population: boolean = false): number {
    const avg = this.mean();
    const squaredDiff = this.data.reduce(
      (sum, x) => sum + Math.pow(x - avg, 2),
      0
    );

    return squaredDiff / (population ? this.n : this.n - 1);
  }

  stdDev(population: boolean = false): number {
    return Math.sqrt(this.variance(population));
  }

  coefficientOfVariation(): number {
    const avg = this.mean();
    if (avg === 0) return Infinity;
    return this.stdDev() / avg;
  }

  iqr(): number {
    return this.percentile(75) - this.percentile(25);
  }

  // Position
  percentile(p: number): number {
    if (p < 0 || p > 100) {
      throw new Error('Percentile must be between 0 and 100');
    }

    const index = (p / 100) * (this.n - 1);
    const lower = Math.floor(index);
    const upper = lower + 1;
    const fraction = index - lower;

    if (upper >= this.n) {
      return this.sortedData[this.n - 1];
    }

    return this.sortedData[lower] +
      fraction * (this.sortedData[upper] - this.sortedData[lower]);
  }

  percentiles(pList: number[]): Record<number, number> {
    const result: Record<number, number> = {};
    for (const p of pList) {
      result[p] = this.percentile(p);
    }
    return result;
  }

  zScore(value: number): number {
    return (value - this.mean()) / this.stdDev();
  }

  // Shape
  skewness(): number {
    const avg = this.mean();
    const std = this.stdDev();

    if (std === 0) return 0;

    const skew = this.data.reduce(
      (sum, x) => sum + Math.pow((x - avg) / std, 3),
      0
    ) / this.n;

    return skew;
  }

  kurtosis(): number {
    const avg = this.mean();
    const std = this.stdDev();

    if (std === 0) return 0;

    const kurt = this.data.reduce(
      (sum, x) => sum + Math.pow((x - avg) / std, 4),
      0
    ) / this.n;

    return kurt - 3; // Excess kurtosis
  }
}

// Test result analyzer
interface TestRunMetrics {
  executionTime: number;
  memoryUsage: number;
  errorCount: number;
}

class TestMetricsAnalyzer {
  private runs: TestRunMetrics[] = [];

  addRun(metrics: TestRunMetrics): void {
    this.runs.push(metrics);
  }

  analyzeExecutionTimes(): DescriptiveStatsResult {
    const times = this.runs.map(r => r.executionTime);
    const stats = new DescriptiveStatistics(times);
    return stats.calculateAll();
  }

  findOutliers(metric: keyof TestRunMetrics): number[] {
    const values = this.runs.map(r => r[metric]);
    const stats = new DescriptiveStatistics(values);

    const q1 = stats.percentile(25);
    const q3 = stats.percentile(75);
    const iqr = q3 - q1;

    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return values.filter(v => v < lowerBound || v > upperBound);
  }
}

// Jest tests
describe('DescriptiveStatistics', () => {
  const testData = [2, 4, 4, 4, 5, 5, 7, 9];

  test('calculates mean correctly', () => {
    const stats = new DescriptiveStatistics(testData);
    expect(stats.mean()).toBe(5);
  });

  test('calculates median correctly', () => {
    const stats = new DescriptiveStatistics(testData);
    expect(stats.median()).toBe(4.5);
  });

  test('calculates mode correctly', () => {
    const stats = new DescriptiveStatistics(testData);
    expect(stats.mode()).toBe(4);
  });

  test('calculates standard deviation correctly', () => {
    const stats = new DescriptiveStatistics(testData);
    expect(stats.stdDev()).toBeCloseTo(2, 1);
  });

  test('calculates percentiles correctly', () => {
    const stats = new DescriptiveStatistics(testData);
    expect(stats.percentile(50)).toBe(stats.median());
  });
});
```

## Applying Descriptive Statistics to Testing

### Performance Test Analysis

```python
class PerformanceTestAnalyzer:
    """Analyze performance test results with descriptive statistics."""

    def __init__(self, response_times: List[float]):
        self.stats = DescriptiveStatistics(response_times)
        self.data = response_times

    def get_sla_metrics(self) -> Dict[str, float]:
        """Calculate SLA-relevant metrics."""
        return {
            'average_response_time': self.stats.mean(),
            'p50_response_time': self.stats.percentile(50),
            'p90_response_time': self.stats.percentile(90),
            'p95_response_time': self.stats.percentile(95),
            'p99_response_time': self.stats.percentile(99),
            'max_response_time': self.stats.max()
        }

    def check_sla_compliance(
        self,
        p95_threshold: float,
        p99_threshold: float,
        max_threshold: float
    ) -> Dict[str, bool]:
        """Check if performance meets SLA requirements."""
        metrics = self.get_sla_metrics()

        return {
            'p95_compliant': metrics['p95_response_time'] <= p95_threshold,
            'p99_compliant': metrics['p99_response_time'] <= p99_threshold,
            'max_compliant': metrics['max_response_time'] <= max_threshold
        }

    def analyze_distribution(self) -> Dict[str, Any]:
        """Analyze the distribution shape."""
        skewness = self.stats.skewness()
        kurtosis = self.stats.kurtosis()

        distribution_type = 'normal'
        if skewness > 1:
            distribution_type = 'right-skewed (long tail of slow responses)'
        elif skewness < -1:
            distribution_type = 'left-skewed'

        tail_behavior = 'normal'
        if kurtosis > 1:
            tail_behavior = 'heavy tails (more extreme values)'
        elif kurtosis < -1:
            tail_behavior = 'light tails (fewer extreme values)'

        return {
            'skewness': skewness,
            'kurtosis': kurtosis,
            'distribution_type': distribution_type,
            'tail_behavior': tail_behavior,
            'coefficient_of_variation': self.stats.coefficient_of_variation()
        }

    def compare_to_baseline(
        self,
        baseline_stats: DescriptiveStats
    ) -> Dict[str, float]:
        """Compare current results to baseline."""
        current = self.stats.calculate_all()

        return {
            'mean_change_percent': (
                (current.mean - baseline_stats.mean) / baseline_stats.mean * 100
            ),
            'p95_change_percent': (
                (current.percentiles[95] - baseline_stats.percentiles[95])
                / baseline_stats.percentiles[95] * 100
            ),
            'std_dev_change_percent': (
                (current.std_dev - baseline_stats.std_dev)
                / baseline_stats.std_dev * 100
            )
        }


# Usage example
response_times = [120, 145, 132, 198, 156, 143, 167, 189, 201, 134,
                  155, 178, 165, 190, 145, 158, 172, 195, 210, 140]

analyzer = PerformanceTestAnalyzer(response_times)

print("SLA Metrics:")
for metric, value in analyzer.get_sla_metrics().items():
    print(f"  {metric}: {value:.2f}ms")

print("\nSLA Compliance (p95<200ms, p99<250ms, max<300ms):")
compliance = analyzer.check_sla_compliance(200, 250, 300)
for check, passed in compliance.items():
    status = "✓ PASS" if passed else "✗ FAIL"
    print(f"  {check}: {status}")

print("\nDistribution Analysis:")
dist = analyzer.analyze_distribution()
for key, value in dist.items():
    print(f"  {key}: {value}")
```

## Best Practices

### Statistical Analysis Guidelines

```markdown
## Descriptive Statistics Best Practices

### Data Collection
- [ ] Ensure sufficient sample size (n > 30 for reliable stats)
- [ ] Record all measurements, don't discard data arbitrarily
- [ ] Note measurement precision and units
- [ ] Document data collection conditions

### Analysis
- [ ] Always report sample size (n)
- [ ] Use median for skewed data, mean for symmetric
- [ ] Report both central tendency and spread
- [ ] Include percentiles for performance data
- [ ] Check for outliers before analysis

### Interpretation
- [ ] Consider the distribution shape
- [ ] Don't over-interpret small differences
- [ ] Account for variability when comparing
- [ ] Use coefficient of variation for relative comparisons

### Reporting
- [ ] Include confidence intervals when appropriate
- [ ] Visualize distributions (histograms, box plots)
- [ ] Report relevant percentiles (p50, p90, p95, p99)
- [ ] Contextualize statistics with domain knowledge
```

## Conclusion

Descriptive statistics are fundamental tools for test automation professionals. They help summarize test results, identify performance patterns, detect anomalies, and communicate findings effectively. Mastering these techniques enables data-driven decision making in test automation.

## Key Takeaways

1. Mean, median, and mode measure central tendency differently
2. Standard deviation and IQR measure data spread
3. Percentiles (p95, p99) are crucial for performance testing
4. Skewness and kurtosis describe distribution shape
5. Use appropriate statistics for your data type
6. Always consider sample size when interpreting results
7. Visualize data to complement numeric summaries
