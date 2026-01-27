# Stress Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Stress testing evaluates system behavior under extreme conditions beyond normal operational capacity. For test automation professionals, stress testing identifies breaking points, validates graceful degradation, and ensures systems recover correctly after being overwhelmed.

## What is Stress Testing?

Stress testing pushes a system beyond its expected maximum load to determine its limits and observe failure behavior. Unlike load testing (which validates normal/peak conditions), stress testing deliberately overloads the system to find breaking points and verify recovery mechanisms.

### Stress Testing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                     Stress Testing                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Load vs Stress:                                            │
│  Load  │                ┌──────── Expected peak             │
│        │    ╱──────────╲│                                   │
│  Users │   ╱            ╲                                   │
│        │  ╱              ╲                                  │
│        │ ╱                ╲                                 │
│        └──────────────────────►                             │
│  Stress │                    ┌── Breaking point             │
│         │              ╱────╳│                              │
│  Users  │         ╱───╱      │                              │
│         │    ╱───╱           │                              │
│         │╱──╱                │                              │
│         └──────────────────────►                            │
│                                                             │
│  What Stress Testing Reveals:                               │
│  ├── Maximum capacity before failure                       │
│  ├── Failure modes (crash, slowdown, errors)               │
│  ├── Data integrity under extreme load                     │
│  ├── Recovery behavior after overload                      │
│  ├── Resource exhaustion patterns (CPU, memory, disk)      │
│  └── Cascading failure risks                               │
│                                                             │
│  Stress Test Types:                                         │
│  ├── Capacity stress: Exceed user/connection limits        │
│  ├── Resource stress: Exhaust CPU, memory, disk            │
│  ├── Network stress: Saturate bandwidth                    │
│  ├── Data stress: Oversized inputs, huge datasets          │
│  └── Time stress: Extended duration under high load        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Stress Tests

```python
# stress_testing.py

"""
Stress testing framework and patterns.
"""

import pytest
import time
import statistics
from dataclasses import dataclass, field
from typing import List, Dict, Callable, Optional
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime


@dataclass
class StressTestResult:
    total_requests: int
    successful: int
    failed: int
    response_times: List[float]
    errors: List[str] = field(default_factory=list)
    start_time: float = 0
    end_time: float = 0

    @property
    def success_rate(self) -> float:
        return (self.successful / self.total_requests * 100) if self.total_requests else 0

    @property
    def avg_response_ms(self) -> float:
        return statistics.mean(self.response_times) if self.response_times else 0

    @property
    def p95_response_ms(self) -> float:
        if not self.response_times:
            return 0
        sorted_times = sorted(self.response_times)
        idx = int(len(sorted_times) * 0.95)
        return sorted_times[min(idx, len(sorted_times) - 1)]

    @property
    def throughput_rps(self) -> float:
        duration = self.end_time - self.start_time
        return self.total_requests / duration if duration > 0 else 0

    @property
    def breaking_point_reached(self) -> bool:
        return self.success_rate < 95 or self.p95_response_ms > 10000


class StressTestRunner:
    """Execute stress tests with increasing load."""

    def __init__(self, target_func: Callable):
        self.target = target_func

    def run_concurrent(self, concurrency: int, requests_per_worker: int) -> StressTestResult:
        """Run stress test with given concurrency level."""
        result = StressTestResult(
            total_requests=concurrency * requests_per_worker,
            successful=0, failed=0, response_times=[]
        )
        result.start_time = time.time()

        with ThreadPoolExecutor(max_workers=concurrency) as executor:
            futures = []
            for _ in range(concurrency):
                for _ in range(requests_per_worker):
                    futures.append(executor.submit(self._execute_request))

            for future in as_completed(futures):
                try:
                    response_time = future.result()
                    result.successful += 1
                    result.response_times.append(response_time)
                except Exception as e:
                    result.failed += 1
                    result.errors.append(str(e))

        result.end_time = time.time()
        return result

    def find_breaking_point(
        self, start_concurrency: int = 10, step: int = 10,
        max_concurrency: int = 500, requests_per_level: int = 50
    ) -> Dict:
        """Incrementally increase load to find breaking point."""
        results = []
        breaking_point = None

        for concurrency in range(start_concurrency, max_concurrency + 1, step):
            result = self.run_concurrent(concurrency, requests_per_level // concurrency or 1)
            results.append({
                "concurrency": concurrency,
                "success_rate": result.success_rate,
                "avg_response_ms": result.avg_response_ms,
                "p95_response_ms": result.p95_response_ms,
                "throughput_rps": result.throughput_rps,
            })

            if result.breaking_point_reached and breaking_point is None:
                breaking_point = concurrency

        return {
            "breaking_point": breaking_point,
            "results_by_level": results,
        }

    def _execute_request(self) -> float:
        start = time.time()
        self.target()
        return (time.time() - start) * 1000


# Simulated system for testing
def simulated_api_call():
    """Simulate an API that degrades under load."""
    import random
    time.sleep(random.uniform(0.01, 0.05))


# Tests
class TestStressTesting:
    """Test stress testing framework."""

    def test_concurrent_execution(self):
        runner = StressTestRunner(simulated_api_call)
        result = runner.run_concurrent(concurrency=5, requests_per_worker=2)

        assert result.total_requests == 10
        assert result.successful + result.failed == 10
        assert result.success_rate > 0

    def test_response_time_metrics(self):
        runner = StressTestRunner(simulated_api_call)
        result = runner.run_concurrent(concurrency=3, requests_per_worker=3)

        assert result.avg_response_ms > 0
        assert result.p95_response_ms >= result.avg_response_ms

    def test_throughput_calculation(self):
        runner = StressTestRunner(simulated_api_call)
        result = runner.run_concurrent(concurrency=5, requests_per_worker=2)

        assert result.throughput_rps > 0

    def test_breaking_point_detection(self):
        result = StressTestResult(
            total_requests=100, successful=90, failed=10,
            response_times=[100] * 90
        )
        assert not result.breaking_point_reached  # 90% success

        result2 = StressTestResult(
            total_requests=100, successful=80, failed=20,
            response_times=[100] * 80
        )
        assert result2.breaking_point_reached  # Below 95%
```

### JavaScript Implementation

```javascript
// stress-testing.test.js

class StressTestResult {
  constructor(responses, errors) {
    this.responses = responses;
    this.errors = errors;
  }

  get successRate() {
    const total = this.responses.length + this.errors.length;
    return total > 0 ? (this.responses.length / total) * 100 : 0;
  }

  get avgResponseMs() {
    if (!this.responses.length) return 0;
    return this.responses.reduce((a, b) => a + b, 0) / this.responses.length;
  }

  get p95ResponseMs() {
    if (!this.responses.length) return 0;
    const sorted = [...this.responses].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length * 0.95)];
  }
}

async function runStress(fn, concurrency, requestsPerWorker) {
  const responses = [];
  const errors = [];
  const promises = [];

  for (let i = 0; i < concurrency * requestsPerWorker; i++) {
    promises.push(
      (async () => {
        const start = Date.now();
        try {
          await fn();
          responses.push(Date.now() - start);
        } catch (e) {
          errors.push(e.message);
        }
      })()
    );
  }

  await Promise.all(promises);
  return new StressTestResult(responses, errors);
}

describe('Stress Testing', () => {
  test('calculates success rate', () => {
    const result = new StressTestResult([100, 200, 150], ['error']);
    expect(result.successRate).toBe(75);
  });

  test('calculates p95 response time', () => {
    const times = Array.from({ length: 100 }, (_, i) => i + 1);
    const result = new StressTestResult(times, []);
    expect(result.p95ResponseMs).toBeGreaterThanOrEqual(95);
  });

  test('handles all failures', () => {
    const result = new StressTestResult([], ['e1', 'e2']);
    expect(result.successRate).toBe(0);
    expect(result.avgResponseMs).toBe(0);
  });
});
```

## Best Practices

```markdown
## Stress Testing Best Practices

### Planning
- [ ] Define expected maximum capacity
- [ ] Identify critical failure modes to test
- [ ] Set acceptance criteria for degradation behavior
- [ ] Plan recovery verification after stress

### Execution
- [ ] Increase load gradually to identify thresholds
- [ ] Monitor system resources (CPU, memory, connections)
- [ ] Test recovery after overload conditions
- [ ] Document breaking points and failure modes

### Analysis
- [ ] Compare performance across load levels
- [ ] Identify the first resource to exhaust
- [ ] Verify graceful degradation (not crashes)
- [ ] Validate data integrity after stress

### Integration
- [ ] Run stress tests in production-like environments
- [ ] Schedule regular stress test runs
- [ ] Track breaking points over releases
- [ ] Alert when capacity headroom shrinks
```

## Conclusion

Stress testing reveals how systems behave when pushed beyond their limits. By systematically increasing load, identifying breaking points, and verifying recovery, test automation professionals ensure systems fail gracefully and recover correctly under extreme conditions.

## Key Takeaways

1. Stress testing pushes systems beyond expected maximum load
2. It identifies breaking points and failure modes
3. Increase load incrementally to find thresholds
4. Verify graceful degradation, not just absolute capacity
5. Test recovery behavior after overload
6. Monitor all resources: CPU, memory, connections, disk
7. Track breaking points across releases to detect capacity regression
