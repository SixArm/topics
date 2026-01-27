# Performance Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Performance testing is the practice of evaluating how a system behaves under various workloads, measuring attributes such as response time, throughput, and resource utilization to ensure applications meet speed, scalability, and stability requirements. For test automation professionals, performance testing is essential because functional correctness alone is insufficient: an application that works correctly but responds slowly under load will fail its users and its business.

## What is Performance Testing?

Performance testing is a non-functional testing discipline that measures and validates the responsiveness, stability, scalability, and resource efficiency of a software application under specified workload conditions. Unlike functional testing, which verifies what the system does, performance testing verifies how well the system does it. The discipline encompasses several related practices including load testing (expected workloads), stress testing (beyond normal capacity), endurance testing (sustained loads over time), and spike testing (sudden load changes), each designed to reveal different types of performance problems.

### Performance Testing in Context

```
+-------------------------------------------------------------+
|              Performance Testing Types                       |
+-------------------------------------------------------------+
|                                                              |
|  Load Testing                                                |
|  +------------------------------------------------------+   |
|  | Simulates expected number of concurrent users         |   |
|  | Goal: Verify system meets performance SLAs            |   |
|  | Example: 1000 users browsing, 100 placing orders      |   |
|  +------------------------------------------------------+   |
|                                                              |
|  Stress Testing                                              |
|  +------------------------------------------------------+   |
|  | Pushes system beyond normal operating capacity        |   |
|  | Goal: Find the breaking point and failure behavior    |   |
|  | Example: 10x normal load until errors appear          |   |
|  +------------------------------------------------------+   |
|                                                              |
|  Endurance Testing (Soak Testing)                            |
|  +------------------------------------------------------+   |
|  | Sustained load over an extended period                |   |
|  | Goal: Detect memory leaks, resource exhaustion        |   |
|  | Example: Normal load for 24-72 hours continuously     |   |
|  +------------------------------------------------------+   |
|                                                              |
|  Spike Testing                                               |
|  +------------------------------------------------------+   |
|  | Sudden, dramatic increase then decrease in load       |   |
|  | Goal: Verify system handles sudden traffic surges     |   |
|  | Example: 10 users to 5000 users in 30 seconds         |   |
|  +------------------------------------------------------+   |
|                                                              |
|  Key Metrics:                                                |
|  +--------------------------------------------------+       |
|  | Response Time  = Time from request to response    |       |
|  | Throughput     = Requests handled per second (RPS)|       |
|  | Error Rate     = % of failed requests             |       |
|  | Concurrency    = Simultaneous active users        |       |
|  | Latency        = Time to first byte (TTFB)        |       |
|  | Utilization    = CPU, memory, disk, network usage |       |
|  +--------------------------------------------------+       |
|                                                              |
|  Performance Test Workflow:                                   |
|                                                              |
|  Define SLAs --> Design Scenarios --> Configure Load         |
|       |                                    |                 |
|       v                                    v                 |
|  Set Thresholds    Execute Tests <--- Ramp Up Users          |
|       |                |                                     |
|       v                v                                     |
|  Compare Results --> Analyze Metrics --> Report Findings     |
|                         |                                    |
|                         v                                    |
|                  Identify Bottlenecks                         |
|                  (CPU, Memory, I/O, Network, Database)       |
|                                                              |
+-------------------------------------------------------------+
```

## Python Implementation: Performance Testing Utilities

### Performance Test Framework

```python
# performance_tester.py

"""
Performance testing utilities for measuring response time,
throughput, and resource utilization. Includes load generation,
metrics collection, and threshold validation.
"""

import time
import statistics
import threading
import concurrent.futures
from dataclasses import dataclass, field
from typing import Callable, List, Dict, Optional, Any
from enum import Enum


class TestType(Enum):
    """Types of performance tests."""
    LOAD = "load"
    STRESS = "stress"
    ENDURANCE = "endurance"
    SPIKE = "spike"


@dataclass
class PerformanceMetrics:
    """Collected performance metrics for a test run."""
    total_requests: int = 0
    successful_requests: int = 0
    failed_requests: int = 0
    response_times: List[float] = field(default_factory=list)
    errors: List[str] = field(default_factory=list)
    start_time: float = 0.0
    end_time: float = 0.0

    @property
    def duration(self) -> float:
        """Total test duration in seconds."""
        return self.end_time - self.start_time

    @property
    def throughput(self) -> float:
        """Requests per second."""
        if self.duration <= 0:
            return 0.0
        return self.total_requests / self.duration

    @property
    def error_rate(self) -> float:
        """Percentage of failed requests."""
        if self.total_requests == 0:
            return 0.0
        return (self.failed_requests / self.total_requests) * 100

    @property
    def avg_response_time(self) -> float:
        """Average response time in milliseconds."""
        if not self.response_times:
            return 0.0
        return statistics.mean(self.response_times)

    @property
    def median_response_time(self) -> float:
        """Median (p50) response time in milliseconds."""
        if not self.response_times:
            return 0.0
        return statistics.median(self.response_times)

    @property
    def p90_response_time(self) -> float:
        """90th percentile response time in milliseconds."""
        if not self.response_times:
            return 0.0
        sorted_times = sorted(self.response_times)
        index = int(len(sorted_times) * 0.90)
        return sorted_times[min(index, len(sorted_times) - 1)]

    @property
    def p95_response_time(self) -> float:
        """95th percentile response time in milliseconds."""
        if not self.response_times:
            return 0.0
        sorted_times = sorted(self.response_times)
        index = int(len(sorted_times) * 0.95)
        return sorted_times[min(index, len(sorted_times) - 1)]

    @property
    def p99_response_time(self) -> float:
        """99th percentile response time in milliseconds."""
        if not self.response_times:
            return 0.0
        sorted_times = sorted(self.response_times)
        index = int(len(sorted_times) * 0.99)
        return sorted_times[min(index, len(sorted_times) - 1)]

    @property
    def min_response_time(self) -> float:
        """Minimum response time in milliseconds."""
        return min(self.response_times) if self.response_times else 0.0

    @property
    def max_response_time(self) -> float:
        """Maximum response time in milliseconds."""
        return max(self.response_times) if self.response_times else 0.0

    @property
    def std_dev_response_time(self) -> float:
        """Standard deviation of response times."""
        if len(self.response_times) < 2:
            return 0.0
        return statistics.stdev(self.response_times)


@dataclass
class PerformanceThresholds:
    """Acceptable performance thresholds for pass/fail determination."""
    max_avg_response_time_ms: float = 500.0
    max_p95_response_time_ms: float = 1000.0
    max_p99_response_time_ms: float = 2000.0
    max_error_rate_percent: float = 1.0
    min_throughput_rps: float = 100.0


@dataclass
class ThresholdResult:
    """Result of checking metrics against thresholds."""
    metric_name: str
    actual_value: float
    threshold_value: float
    passed: bool
    description: str


def measure_response_time(func: Callable, *args, **kwargs) -> tuple:
    """
    Measure the response time of a function call.
    Returns (result, elapsed_ms).
    """
    start = time.perf_counter()
    try:
        result = func(*args, **kwargs)
        elapsed_ms = (time.perf_counter() - start) * 1000
        return result, elapsed_ms
    except Exception as e:
        elapsed_ms = (time.perf_counter() - start) * 1000
        raise type(e)(f"{e} (elapsed: {elapsed_ms:.2f}ms)") from e


class LoadGenerator:
    """Generate concurrent load against a target function."""

    def __init__(
        self,
        target_function: Callable,
        concurrent_users: int = 10,
        requests_per_user: int = 10,
        ramp_up_seconds: float = 0.0,
    ):
        self.target_function = target_function
        self.concurrent_users = concurrent_users
        self.requests_per_user = requests_per_user
        self.ramp_up_seconds = ramp_up_seconds
        self._lock = threading.Lock()

    def _user_session(self, user_id: int, metrics: PerformanceMetrics):
        """Simulate a single user's requests."""
        for _ in range(self.requests_per_user):
            start = time.perf_counter()
            try:
                self.target_function()
                elapsed_ms = (time.perf_counter() - start) * 1000
                with self._lock:
                    metrics.total_requests += 1
                    metrics.successful_requests += 1
                    metrics.response_times.append(elapsed_ms)
            except Exception as e:
                elapsed_ms = (time.perf_counter() - start) * 1000
                with self._lock:
                    metrics.total_requests += 1
                    metrics.failed_requests += 1
                    metrics.response_times.append(elapsed_ms)
                    metrics.errors.append(
                        f"User {user_id}: {str(e)}"
                    )

    def run(self) -> PerformanceMetrics:
        """Execute the load test and return collected metrics."""
        metrics = PerformanceMetrics()
        metrics.start_time = time.perf_counter()

        with concurrent.futures.ThreadPoolExecutor(
            max_workers=self.concurrent_users
        ) as executor:
            futures = []
            for user_id in range(self.concurrent_users):
                if self.ramp_up_seconds > 0:
                    delay = (
                        self.ramp_up_seconds
                        / self.concurrent_users
                        * user_id
                    )
                    time.sleep(delay)
                future = executor.submit(
                    self._user_session, user_id, metrics
                )
                futures.append(future)

            concurrent.futures.wait(futures)

        metrics.end_time = time.perf_counter()
        return metrics


def check_thresholds(
    metrics: PerformanceMetrics,
    thresholds: PerformanceThresholds,
) -> List[ThresholdResult]:
    """Check performance metrics against defined thresholds."""
    results = []

    results.append(ThresholdResult(
        metric_name="avg_response_time",
        actual_value=metrics.avg_response_time,
        threshold_value=thresholds.max_avg_response_time_ms,
        passed=metrics.avg_response_time <= thresholds.max_avg_response_time_ms,
        description=(
            f"Average response time: {metrics.avg_response_time:.2f}ms "
            f"(threshold: {thresholds.max_avg_response_time_ms}ms)"
        ),
    ))

    results.append(ThresholdResult(
        metric_name="p95_response_time",
        actual_value=metrics.p95_response_time,
        threshold_value=thresholds.max_p95_response_time_ms,
        passed=metrics.p95_response_time <= thresholds.max_p95_response_time_ms,
        description=(
            f"P95 response time: {metrics.p95_response_time:.2f}ms "
            f"(threshold: {thresholds.max_p95_response_time_ms}ms)"
        ),
    ))

    results.append(ThresholdResult(
        metric_name="p99_response_time",
        actual_value=metrics.p99_response_time,
        threshold_value=thresholds.max_p99_response_time_ms,
        passed=metrics.p99_response_time <= thresholds.max_p99_response_time_ms,
        description=(
            f"P99 response time: {metrics.p99_response_time:.2f}ms "
            f"(threshold: {thresholds.max_p99_response_time_ms}ms)"
        ),
    ))

    results.append(ThresholdResult(
        metric_name="error_rate",
        actual_value=metrics.error_rate,
        threshold_value=thresholds.max_error_rate_percent,
        passed=metrics.error_rate <= thresholds.max_error_rate_percent,
        description=(
            f"Error rate: {metrics.error_rate:.2f}% "
            f"(threshold: {thresholds.max_error_rate_percent}%)"
        ),
    ))

    results.append(ThresholdResult(
        metric_name="throughput",
        actual_value=metrics.throughput,
        threshold_value=thresholds.min_throughput_rps,
        passed=metrics.throughput >= thresholds.min_throughput_rps,
        description=(
            f"Throughput: {metrics.throughput:.2f} RPS "
            f"(threshold: {thresholds.min_throughput_rps} RPS)"
        ),
    ))

    return results
```

### Pytest Tests for Performance Testing

```python
# test_performance.py

"""
Tests demonstrating performance testing concepts including
response time measurement, load generation, percentile
calculations, and threshold validation.
"""

import pytest
import time
import random
from performance_tester import (
    PerformanceMetrics,
    PerformanceThresholds,
    ThresholdResult,
    LoadGenerator,
    measure_response_time,
    check_thresholds,
    TestType,
)


class TestResponseTimeMeasurement:
    """Test response time measurement utilities."""

    def test_measure_fast_function(self):
        """Measure response time of a fast synchronous function."""
        def fast_function():
            return sum(range(100))

        result, elapsed_ms = measure_response_time(fast_function)
        assert result == 4950
        assert elapsed_ms < 100  # Should complete well under 100ms

    def test_measure_slow_function(self):
        """Measure response time of a function with known delay."""
        def slow_function():
            time.sleep(0.05)
            return "done"

        result, elapsed_ms = measure_response_time(slow_function)
        assert result == "done"
        assert elapsed_ms >= 45  # At least ~50ms with tolerance
        assert elapsed_ms < 200  # Not excessively slow

    def test_measure_function_with_exception(self):
        """Response time is captured even when function throws."""
        def failing_function():
            time.sleep(0.01)
            raise ValueError("Simulated failure")

        with pytest.raises(ValueError, match="Simulated failure"):
            measure_response_time(failing_function)


class TestPerformanceMetrics:
    """Test performance metrics calculations."""

    def test_percentile_calculations(self):
        """Verify p50, p90, p95, p99 calculations."""
        metrics = PerformanceMetrics()
        # Create a distribution: 1-100ms
        metrics.response_times = list(range(1, 101))

        assert metrics.median_response_time == 50.5  # p50
        assert metrics.p90_response_time == 91       # p90
        assert metrics.p95_response_time == 96       # p95
        assert metrics.p99_response_time == 100      # p99

    def test_throughput_calculation(self):
        """Verify throughput (requests per second) calculation."""
        metrics = PerformanceMetrics()
        metrics.total_requests = 500
        metrics.start_time = 0.0
        metrics.end_time = 10.0

        assert metrics.throughput == 50.0  # 500 requests / 10 seconds

    def test_error_rate_calculation(self):
        """Verify error rate calculation."""
        metrics = PerformanceMetrics()
        metrics.total_requests = 1000
        metrics.failed_requests = 25
        metrics.successful_requests = 975

        assert metrics.error_rate == 2.5  # 25/1000 * 100

    def test_zero_requests_edge_case(self):
        """Handle zero requests gracefully."""
        metrics = PerformanceMetrics()
        assert metrics.throughput == 0.0
        assert metrics.error_rate == 0.0
        assert metrics.avg_response_time == 0.0

    def test_avg_response_time(self):
        """Verify average response time calculation."""
        metrics = PerformanceMetrics()
        metrics.response_times = [100, 200, 300, 400, 500]

        assert metrics.avg_response_time == 300.0

    def test_min_max_response_time(self):
        """Verify min/max response time identification."""
        metrics = PerformanceMetrics()
        metrics.response_times = [50, 100, 200, 500, 1000]

        assert metrics.min_response_time == 50
        assert metrics.max_response_time == 1000

    def test_standard_deviation(self):
        """Verify standard deviation calculation."""
        metrics = PerformanceMetrics()
        metrics.response_times = [100, 100, 100, 100, 100]

        assert metrics.std_dev_response_time == 0.0

        metrics.response_times = [100, 200, 300, 400, 500]
        assert metrics.std_dev_response_time > 0

    def test_duration_calculation(self):
        """Verify test duration calculation."""
        metrics = PerformanceMetrics()
        metrics.start_time = 100.0
        metrics.end_time = 110.0

        assert metrics.duration == 10.0


class TestThresholdValidation:
    """Test performance threshold checking."""

    def test_all_thresholds_pass(self):
        """Metrics within thresholds should all pass."""
        metrics = PerformanceMetrics()
        metrics.total_requests = 1000
        metrics.successful_requests = 995
        metrics.failed_requests = 5
        metrics.response_times = [
            random.uniform(50, 200) for _ in range(1000)
        ]
        metrics.start_time = 0.0
        metrics.end_time = 5.0

        thresholds = PerformanceThresholds(
            max_avg_response_time_ms=500.0,
            max_p95_response_time_ms=1000.0,
            max_p99_response_time_ms=2000.0,
            max_error_rate_percent=1.0,
            min_throughput_rps=100.0,
        )

        results = check_thresholds(metrics, thresholds)
        for result in results:
            assert result.passed, result.description

    def test_response_time_threshold_exceeded(self):
        """Slow response times should fail threshold check."""
        metrics = PerformanceMetrics()
        metrics.total_requests = 100
        metrics.successful_requests = 100
        metrics.response_times = [
            random.uniform(800, 1200) for _ in range(100)
        ]
        metrics.start_time = 0.0
        metrics.end_time = 10.0

        thresholds = PerformanceThresholds(
            max_avg_response_time_ms=500.0,
        )

        results = check_thresholds(metrics, thresholds)
        avg_result = next(
            r for r in results if r.metric_name == "avg_response_time"
        )
        assert avg_result.passed is False

    def test_error_rate_threshold_exceeded(self):
        """High error rate should fail threshold check."""
        metrics = PerformanceMetrics()
        metrics.total_requests = 100
        metrics.failed_requests = 10  # 10% error rate
        metrics.successful_requests = 90
        metrics.response_times = [100] * 100
        metrics.start_time = 0.0
        metrics.end_time = 1.0

        thresholds = PerformanceThresholds(
            max_error_rate_percent=1.0,
        )

        results = check_thresholds(metrics, thresholds)
        error_result = next(
            r for r in results if r.metric_name == "error_rate"
        )
        assert error_result.passed is False

    def test_throughput_threshold_not_met(self):
        """Low throughput should fail threshold check."""
        metrics = PerformanceMetrics()
        metrics.total_requests = 50
        metrics.successful_requests = 50
        metrics.response_times = [100] * 50
        metrics.start_time = 0.0
        metrics.end_time = 10.0  # 5 RPS

        thresholds = PerformanceThresholds(
            min_throughput_rps=100.0,
        )

        results = check_thresholds(metrics, thresholds)
        tp_result = next(
            r for r in results if r.metric_name == "throughput"
        )
        assert tp_result.passed is False
        assert tp_result.actual_value == 5.0


class TestLoadGenerator:
    """Test the load generation engine."""

    def test_load_test_generates_expected_requests(self):
        """Load generator should produce expected number of requests."""
        call_count = 0
        lock = threading.Lock()

        def simple_target():
            nonlocal call_count
            with lock:
                call_count += 1
            time.sleep(0.001)

        generator = LoadGenerator(
            target_function=simple_target,
            concurrent_users=5,
            requests_per_user=10,
        )

        metrics = generator.run()
        assert metrics.total_requests == 50  # 5 users * 10 requests
        assert metrics.successful_requests == 50
        assert metrics.failed_requests == 0

    def test_load_test_captures_failures(self):
        """Load generator should track failed requests."""
        call_count = 0
        lock = threading.Lock()

        def flaky_target():
            nonlocal call_count
            with lock:
                call_count += 1
                current = call_count
            if current % 3 == 0:
                raise RuntimeError("Simulated failure")
            time.sleep(0.001)

        generator = LoadGenerator(
            target_function=flaky_target,
            concurrent_users=3,
            requests_per_user=3,
        )

        metrics = generator.run()
        assert metrics.total_requests == 9
        assert metrics.failed_requests > 0
        assert metrics.error_rate > 0

    def test_load_test_measures_duration(self):
        """Load generator should record start and end times."""
        def quick_target():
            time.sleep(0.001)

        generator = LoadGenerator(
            target_function=quick_target,
            concurrent_users=2,
            requests_per_user=5,
        )

        metrics = generator.run()
        assert metrics.duration > 0
        assert metrics.start_time < metrics.end_time

    def test_load_test_collects_response_times(self):
        """Load generator should collect all response times."""
        def timed_target():
            time.sleep(random.uniform(0.001, 0.010))

        generator = LoadGenerator(
            target_function=timed_target,
            concurrent_users=3,
            requests_per_user=5,
        )

        metrics = generator.run()
        assert len(metrics.response_times) == 15
        assert all(t > 0 for t in metrics.response_times)
```

### JavaScript/TypeScript Implementation: Performance Measurement

```javascript
// performance_testing.test.js

/**
 * JavaScript performance testing demonstration using Jest.
 * Covers response time measurement, throughput calculation,
 * percentile analysis, and threshold validation.
 */

// --- Performance utilities ---

class PerformanceMetrics {
  constructor() {
    this.responseTimes = [];
    this.totalRequests = 0;
    this.successfulRequests = 0;
    this.failedRequests = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.errors = [];
  }

  get duration() {
    return (this.endTime - this.startTime) / 1000; // seconds
  }

  get throughput() {
    return this.duration > 0 ? this.totalRequests / this.duration : 0;
  }

  get errorRate() {
    return this.totalRequests > 0
      ? (this.failedRequests / this.totalRequests) * 100
      : 0;
  }

  get avgResponseTime() {
    if (this.responseTimes.length === 0) return 0;
    const sum = this.responseTimes.reduce((a, b) => a + b, 0);
    return sum / this.responseTimes.length;
  }

  getPercentile(p) {
    if (this.responseTimes.length === 0) return 0;
    const sorted = [...this.responseTimes].sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  }

  get p50() {
    return this.getPercentile(50);
  }
  get p90() {
    return this.getPercentile(90);
  }
  get p95() {
    return this.getPercentile(95);
  }
  get p99() {
    return this.getPercentile(99);
  }

  get minResponseTime() {
    return this.responseTimes.length > 0
      ? Math.min(...this.responseTimes)
      : 0;
  }

  get maxResponseTime() {
    return this.responseTimes.length > 0
      ? Math.max(...this.responseTimes)
      : 0;
  }
}

/**
 * Measure execution time of an async function.
 */
async function measureAsync(fn) {
  const start = performance.now();
  try {
    const result = await fn();
    const elapsed = performance.now() - start;
    return { result, elapsed, success: true };
  } catch (error) {
    const elapsed = performance.now() - start;
    return { error, elapsed, success: false };
  }
}

/**
 * Run concurrent requests and collect metrics.
 */
async function runLoadTest(targetFn, concurrency, requestsPerUser) {
  const metrics = new PerformanceMetrics();
  metrics.startTime = performance.now();

  const userPromises = [];
  for (let user = 0; user < concurrency; user++) {
    const userWork = async () => {
      for (let req = 0; req < requestsPerUser; req++) {
        const measurement = await measureAsync(targetFn);
        metrics.totalRequests++;
        metrics.responseTimes.push(measurement.elapsed);
        if (measurement.success) {
          metrics.successfulRequests++;
        } else {
          metrics.failedRequests++;
          metrics.errors.push(measurement.error.message);
        }
      }
    };
    userPromises.push(userWork());
  }

  await Promise.all(userPromises);
  metrics.endTime = performance.now();
  return metrics;
}

/**
 * Check metrics against thresholds.
 */
function checkThresholds(metrics, thresholds) {
  const results = [];

  if (thresholds.maxAvgResponseTimeMs !== undefined) {
    results.push({
      metric: "avgResponseTime",
      actual: metrics.avgResponseTime,
      threshold: thresholds.maxAvgResponseTimeMs,
      passed: metrics.avgResponseTime <= thresholds.maxAvgResponseTimeMs,
    });
  }

  if (thresholds.maxP95ResponseTimeMs !== undefined) {
    results.push({
      metric: "p95ResponseTime",
      actual: metrics.p95,
      threshold: thresholds.maxP95ResponseTimeMs,
      passed: metrics.p95 <= thresholds.maxP95ResponseTimeMs,
    });
  }

  if (thresholds.maxErrorRatePercent !== undefined) {
    results.push({
      metric: "errorRate",
      actual: metrics.errorRate,
      threshold: thresholds.maxErrorRatePercent,
      passed: metrics.errorRate <= thresholds.maxErrorRatePercent,
    });
  }

  if (thresholds.minThroughputRps !== undefined) {
    results.push({
      metric: "throughput",
      actual: metrics.throughput,
      threshold: thresholds.minThroughputRps,
      passed: metrics.throughput >= thresholds.minThroughputRps,
    });
  }

  return results;
}

// --- Tests ---

describe("Performance Metrics", () => {
  test("calculates average response time correctly", () => {
    const metrics = new PerformanceMetrics();
    metrics.responseTimes = [100, 200, 300, 400, 500];

    expect(metrics.avgResponseTime).toBe(300);
  });

  test("calculates percentiles correctly", () => {
    const metrics = new PerformanceMetrics();
    metrics.responseTimes = Array.from({ length: 100 }, (_, i) => i + 1);

    expect(metrics.p50).toBe(50);
    expect(metrics.p90).toBe(90);
    expect(metrics.p95).toBe(95);
    expect(metrics.p99).toBe(99);
  });

  test("calculates throughput correctly", () => {
    const metrics = new PerformanceMetrics();
    metrics.totalRequests = 1000;
    metrics.startTime = 0;
    metrics.endTime = 5000; // 5 seconds

    expect(metrics.throughput).toBe(200); // 1000 / 5
  });

  test("calculates error rate correctly", () => {
    const metrics = new PerformanceMetrics();
    metrics.totalRequests = 200;
    metrics.failedRequests = 10;

    expect(metrics.errorRate).toBe(5); // 10/200 * 100
  });

  test("handles empty metrics gracefully", () => {
    const metrics = new PerformanceMetrics();

    expect(metrics.avgResponseTime).toBe(0);
    expect(metrics.p50).toBe(0);
    expect(metrics.throughput).toBe(0);
    expect(metrics.errorRate).toBe(0);
  });

  test("identifies min and max response times", () => {
    const metrics = new PerformanceMetrics();
    metrics.responseTimes = [50, 100, 200, 500, 1000];

    expect(metrics.minResponseTime).toBe(50);
    expect(metrics.maxResponseTime).toBe(1000);
  });
});

describe("Response Time Measurement", () => {
  test("measures fast function execution time", async () => {
    const result = await measureAsync(() => {
      let sum = 0;
      for (let i = 0; i < 1000; i++) sum += i;
      return sum;
    });

    expect(result.success).toBe(true);
    expect(result.result).toBe(499500);
    expect(result.elapsed).toBeLessThan(100);
  });

  test("measures async function with delay", async () => {
    const result = await measureAsync(
      () => new Promise((resolve) => setTimeout(() => resolve("done"), 50))
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe("done");
    expect(result.elapsed).toBeGreaterThanOrEqual(40);
  });

  test("captures failures with timing", async () => {
    const result = await measureAsync(() => {
      throw new Error("Simulated failure");
    });

    expect(result.success).toBe(false);
    expect(result.error.message).toBe("Simulated failure");
    expect(result.elapsed).toBeGreaterThanOrEqual(0);
  });
});

describe("Threshold Validation", () => {
  test("all thresholds pass when metrics are within limits", () => {
    const metrics = new PerformanceMetrics();
    metrics.responseTimes = Array.from({ length: 100 }, () =>
      Math.random() * 200
    );
    metrics.totalRequests = 100;
    metrics.successfulRequests = 99;
    metrics.failedRequests = 1;
    metrics.startTime = 0;
    metrics.endTime = 500; // 0.5 seconds = 200 RPS

    const results = checkThresholds(metrics, {
      maxAvgResponseTimeMs: 500,
      maxP95ResponseTimeMs: 1000,
      maxErrorRatePercent: 5,
      minThroughputRps: 100,
    });

    for (const result of results) {
      expect(result.passed).toBe(true);
    }
  });

  test("detects exceeded response time threshold", () => {
    const metrics = new PerformanceMetrics();
    metrics.responseTimes = Array.from({ length: 100 }, () => 800);

    const results = checkThresholds(metrics, {
      maxAvgResponseTimeMs: 500,
    });

    const avgResult = results.find((r) => r.metric === "avgResponseTime");
    expect(avgResult.passed).toBe(false);
    expect(avgResult.actual).toBe(800);
  });

  test("detects exceeded error rate", () => {
    const metrics = new PerformanceMetrics();
    metrics.totalRequests = 100;
    metrics.failedRequests = 15;
    metrics.responseTimes = [100];

    const results = checkThresholds(metrics, {
      maxErrorRatePercent: 5,
    });

    const errorResult = results.find((r) => r.metric === "errorRate");
    expect(errorResult.passed).toBe(false);
  });
});

describe("Load Test Execution", () => {
  test("generates expected number of requests", async () => {
    let callCount = 0;
    const targetFn = async () => {
      callCount++;
      return "ok";
    };

    const metrics = await runLoadTest(targetFn, 5, 10);

    expect(metrics.totalRequests).toBe(50);
    expect(metrics.successfulRequests).toBe(50);
    expect(metrics.failedRequests).toBe(0);
    expect(metrics.responseTimes).toHaveLength(50);
  });

  test("tracks failures in load test", async () => {
    let callCount = 0;
    const flakyFn = async () => {
      callCount++;
      if (callCount % 4 === 0) throw new Error("Flaky failure");
      return "ok";
    };

    const metrics = await runLoadTest(flakyFn, 2, 10);

    expect(metrics.totalRequests).toBe(20);
    expect(metrics.failedRequests).toBeGreaterThan(0);
    expect(metrics.errorRate).toBeGreaterThan(0);
  });

  test("measures realistic duration", async () => {
    const targetFn = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5));
      return "ok";
    };

    const metrics = await runLoadTest(targetFn, 2, 5);

    expect(metrics.duration).toBeGreaterThan(0);
    expect(metrics.throughput).toBeGreaterThan(0);
  });
});
```

## Best Practices

```markdown
## Performance Testing Best Practices

### Planning
- [ ] Define clear performance SLAs before writing tests (response time, throughput, error rate)
- [ ] Identify critical user journeys and API endpoints to test
- [ ] Establish baseline metrics from production or staging environments
- [ ] Size test infrastructure to generate required load without being the bottleneck
- [ ] Use production-like data volumes and configurations in test environments

### Test Design
- [ ] Start with load tests at expected capacity before stress testing
- [ ] Include realistic think times and user behavior patterns
- [ ] Test with both read-heavy and write-heavy workload mixes
- [ ] Include ramp-up periods to avoid thundering herd effects
- [ ] Design tests that can run independently and in combination

### Metrics Collection
- [ ] Measure response time at multiple percentiles (p50, p90, p95, p99)
- [ ] Track throughput (requests per second) alongside response time
- [ ] Monitor server-side resource utilization (CPU, memory, disk I/O, network)
- [ ] Collect database query performance metrics separately
- [ ] Record error rates and categorize error types

### Analysis
- [ ] Compare results against established baselines and SLAs
- [ ] Look for response time degradation under increasing load
- [ ] Identify the saturation point where throughput stops increasing
- [ ] Correlate response time spikes with resource utilization peaks
- [ ] Check for memory leaks in endurance test results

### CI/CD Integration
- [ ] Run performance smoke tests on every deployment
- [ ] Schedule full load tests nightly or weekly
- [ ] Set automated gates that block deployment on SLA violations
- [ ] Track performance trends across releases to detect regressions
- [ ] Store historical results for trend analysis and capacity planning
```

## Conclusion

Performance testing is an indispensable practice for ensuring that applications meet their speed, scalability, and stability requirements under real-world conditions. By systematically measuring response times, throughput, and resource utilization across load, stress, endurance, and spike scenarios, test automation professionals can identify bottlenecks before they impact users. The key is to establish clear performance SLAs, automate metrics collection with threshold validation, and integrate performance testing into the CI/CD pipeline so that regressions are caught immediately rather than discovered in production during peak traffic.

## Key Takeaways

1. Performance testing encompasses load testing (expected workloads), stress testing (beyond capacity), endurance testing (sustained duration), and spike testing (sudden surges), each revealing different categories of performance problems
2. Response time should be measured at multiple percentiles (p50, p90, p95, p99) rather than just averages, because averages hide the experience of the slowest users who often matter most
3. Throughput (requests per second) and response time must be analyzed together, as high throughput with high response times indicates queuing, while low throughput with low response times indicates underutilization
4. Performance thresholds should be defined as concrete, measurable SLAs before tests are written, including maximum acceptable response times, minimum throughput, and maximum error rates
5. Resource utilization monitoring (CPU, memory, disk I/O, network) during performance tests is essential for identifying whether bottlenecks are in application code, infrastructure, or external dependencies
6. Performance tests should be integrated into CI/CD pipelines with automated gates that prevent deployment when SLA violations are detected, catching regressions before they reach production
7. Endurance testing over extended periods (hours to days) is the only reliable way to detect slow memory leaks, connection pool exhaustion, log file growth, and other time-dependent resource problems
