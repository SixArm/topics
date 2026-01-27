# Quality of Service for Networks: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Quality of Service (QoS) for networks refers to the set of technologies and mechanisms that manage network traffic to ensure reliable performance for critical applications. For test automation professionals, understanding QoS is essential for testing applications under various network conditions and validating that performance requirements are met.

## What is Quality of Service for Networks?

QoS encompasses the policies, techniques, and tools used to manage network bandwidth, latency, jitter, and packet loss. It prioritizes certain types of traffic to ensure critical applications receive the network resources they need, even during congestion.

### QoS in Context

```
┌─────────────────────────────────────────────────────────────┐
│                Quality of Service (QoS)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Key QoS Metrics:                                           │
│  ├── Bandwidth: Data transfer capacity (Mbps)              │
│  ├── Latency: Time for packet to travel (ms)               │
│  ├── Jitter: Variation in latency (ms)                     │
│  ├── Packet Loss: Percentage of lost packets (%)           │
│  └── Throughput: Actual data transferred (Mbps)            │
│                                                             │
│  Network Conditions Spectrum:                               │
│  Ideal ◄──────────────────────────────► Degraded           │
│  Low latency    ←→    High latency                         │
│  No packet loss ←→    High packet loss                     │
│  Low jitter     ←→    High jitter                          │
│  High bandwidth ←→    Constrained bandwidth                │
│                                                             │
│  Testing Under Different Conditions:                        │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐              │
│  │  Ideal    │  │  Typical  │  │  Degraded │              │
│  │ <10ms     │  │ 50-100ms  │  │ >500ms    │              │
│  │ 0% loss   │  │ 0.1% loss │  │ 5% loss   │              │
│  └───────────┘  └───────────┘  └───────────┘              │
│                                                             │
│  Common Scenarios:                                          │
│  ├── Mobile on 3G/4G/5G networks                           │
│  ├── Satellite or rural connections                        │
│  ├── Corporate VPN with latency                            │
│  ├── Cross-continent API calls                             │
│  └── High-load congested networks                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing QoS and Network Conditions

```python
# quality_of_service_for_networks.py

"""
Testing application behavior under various network QoS conditions.
"""

import pytest
import time
from dataclasses import dataclass
from typing import Optional
from enum import Enum


class NetworkProfile(Enum):
    IDEAL = "ideal"
    BROADBAND = "broadband"
    MOBILE_4G = "mobile_4g"
    MOBILE_3G = "mobile_3g"
    HIGH_LATENCY = "high_latency"
    LOSSY = "lossy"
    CONGESTED = "congested"


@dataclass
class NetworkCondition:
    name: str
    latency_ms: float
    jitter_ms: float
    packet_loss_pct: float
    bandwidth_mbps: float
    description: str = ""


NETWORK_PROFILES = {
    NetworkProfile.IDEAL: NetworkCondition(
        "Ideal", 1, 0, 0, 1000, "Local/LAN"
    ),
    NetworkProfile.BROADBAND: NetworkCondition(
        "Broadband", 20, 5, 0.01, 100, "Typical home broadband"
    ),
    NetworkProfile.MOBILE_4G: NetworkCondition(
        "4G Mobile", 50, 15, 0.1, 30, "4G cellular"
    ),
    NetworkProfile.MOBILE_3G: NetworkCondition(
        "3G Mobile", 200, 50, 1.0, 2, "3G cellular"
    ),
    NetworkProfile.HIGH_LATENCY: NetworkCondition(
        "High Latency", 500, 100, 0.5, 50, "Satellite/VPN"
    ),
    NetworkProfile.LOSSY: NetworkCondition(
        "Lossy", 100, 30, 5.0, 20, "Poor WiFi"
    ),
    NetworkProfile.CONGESTED: NetworkCondition(
        "Congested", 300, 200, 2.0, 5, "Peak congestion"
    ),
}


@dataclass
class QoSTestResult:
    profile: str
    response_time_ms: float
    success: bool
    retries: int = 0
    timeout: bool = False


class QoSTestRunner:
    """Run tests under simulated network conditions."""

    def __init__(self, sla_response_ms: float = 2000):
        self.sla_response_ms = sla_response_ms
        self.results: list = []

    def simulate_request(
        self, condition: NetworkCondition, processing_time_ms: float = 50
    ) -> QoSTestResult:
        """Simulate a request under given network conditions."""
        import random

        # Simulate network effects
        total_latency = condition.latency_ms + random.gauss(0, condition.jitter_ms)
        total_latency = max(0, total_latency)

        # Round trip + processing
        response_time = (total_latency * 2) + processing_time_ms

        # Simulate packet loss as request failure
        lost = random.random() * 100 < condition.packet_loss_pct

        result = QoSTestResult(
            profile=condition.name,
            response_time_ms=response_time,
            success=not lost,
            timeout=response_time > self.sla_response_ms
        )
        self.results.append(result)
        return result

    def run_batch(
        self, condition: NetworkCondition, count: int = 100
    ) -> dict:
        """Run multiple requests and compute statistics."""
        results = [self.simulate_request(condition) for _ in range(count)]
        successful = [r for r in results if r.success]
        times = [r.response_time_ms for r in successful]

        return {
            "profile": condition.name,
            "total_requests": count,
            "successful": len(successful),
            "failed": count - len(successful),
            "success_rate": len(successful) / count * 100,
            "avg_response_ms": sum(times) / len(times) if times else 0,
            "max_response_ms": max(times) if times else 0,
            "sla_breaches": sum(1 for t in times if t > self.sla_response_ms),
        }


# Tests
class TestQoS:
    """Test application behavior under various network conditions."""

    def test_ideal_network_meets_sla(self):
        runner = QoSTestRunner(sla_response_ms=500)
        condition = NETWORK_PROFILES[NetworkProfile.IDEAL]
        stats = runner.run_batch(condition, count=100)

        assert stats["success_rate"] > 99
        assert stats["avg_response_ms"] < 500

    def test_4g_network_acceptable(self):
        runner = QoSTestRunner(sla_response_ms=2000)
        condition = NETWORK_PROFILES[NetworkProfile.MOBILE_4G]
        stats = runner.run_batch(condition, count=100)

        assert stats["success_rate"] > 95
        assert stats["avg_response_ms"] < 2000

    def test_3g_network_graceful_degradation(self):
        runner = QoSTestRunner(sla_response_ms=5000)
        condition = NETWORK_PROFILES[NetworkProfile.MOBILE_3G]
        stats = runner.run_batch(condition, count=100)

        # Should still work, just slower
        assert stats["success_rate"] > 90

    def test_all_profiles_comparison(self):
        runner = QoSTestRunner(sla_response_ms=2000)
        results = {}

        for profile, condition in NETWORK_PROFILES.items():
            stats = runner.run_batch(condition, count=50)
            results[profile.value] = stats

        # Ideal should be fastest
        assert results["ideal"]["avg_response_ms"] < results["high_latency"]["avg_response_ms"]

    def test_network_profile_definitions(self):
        """Verify all profiles have valid values."""
        for profile, condition in NETWORK_PROFILES.items():
            assert condition.latency_ms >= 0
            assert condition.jitter_ms >= 0
            assert 0 <= condition.packet_loss_pct <= 100
            assert condition.bandwidth_mbps > 0
```

### JavaScript Implementation

```javascript
// qos-testing.test.js

const NETWORK_PROFILES = {
  ideal: { latency: 1, jitter: 0, packetLoss: 0, bandwidth: 1000 },
  broadband: { latency: 20, jitter: 5, packetLoss: 0.01, bandwidth: 100 },
  mobile4G: { latency: 50, jitter: 15, packetLoss: 0.1, bandwidth: 30 },
  mobile3G: { latency: 200, jitter: 50, packetLoss: 1.0, bandwidth: 2 },
};

function simulateRequest(profile, processingMs = 50) {
  const jitterOffset = (Math.random() - 0.5) * 2 * profile.jitter;
  const latency = Math.max(0, profile.latency + jitterOffset);
  const responseTime = latency * 2 + processingMs;
  const lost = Math.random() * 100 < profile.packetLoss;
  return { responseTime, success: !lost };
}

describe('QoS Network Testing', () => {
  test('ideal network responds within SLA', () => {
    const results = Array.from({ length: 100 }, () =>
      simulateRequest(NETWORK_PROFILES.ideal)
    );
    const avgTime = results.reduce((s, r) => s + r.responseTime, 0) / results.length;
    expect(avgTime).toBeLessThan(500);
  });

  test('4G network has acceptable response times', () => {
    const results = Array.from({ length: 100 }, () =>
      simulateRequest(NETWORK_PROFILES.mobile4G)
    );
    const successRate = results.filter((r) => r.success).length;
    expect(successRate).toBeGreaterThan(95);
  });

  test('3G degrades gracefully', () => {
    const results = Array.from({ length: 100 }, () =>
      simulateRequest(NETWORK_PROFILES.mobile3G)
    );
    const successRate = results.filter((r) => r.success).length;
    expect(successRate).toBeGreaterThan(90);
  });
});
```

## Best Practices

```markdown
## QoS Testing Best Practices

### Network Simulation
- [ ] Test under multiple network profiles (ideal, 4G, 3G, degraded)
- [ ] Use network throttling tools (tc, Charles Proxy, browser DevTools)
- [ ] Simulate packet loss, latency, and jitter
- [ ] Test from geographically distributed locations

### SLA Validation
- [ ] Define response time SLAs per network condition
- [ ] Measure percentile response times (p50, p95, p99)
- [ ] Track success rates under each condition
- [ ] Test timeout and retry behavior

### Resilience
- [ ] Verify graceful degradation under poor conditions
- [ ] Test offline capability where applicable
- [ ] Validate retry mechanisms with backoff
- [ ] Check data integrity under lossy conditions
```

## Conclusion

QoS testing ensures applications perform acceptably across diverse network conditions. By simulating various bandwidth, latency, and packet loss scenarios, test automation professionals validate that applications meet SLAs and degrade gracefully when network conditions are poor.

## Key Takeaways

1. QoS measures bandwidth, latency, jitter, and packet loss
2. Test under multiple network profiles representing real user conditions
3. Define SLAs appropriate to each network condition
4. Verify graceful degradation under poor network conditions
5. Use network simulation tools for reproducible testing
6. Measure percentile response times, not just averages
7. Integrate network condition testing into CI/CD pipelines
