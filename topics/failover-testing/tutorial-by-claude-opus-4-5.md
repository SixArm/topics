# Failover Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Failover testing verifies that a system can seamlessly transfer operations to a backup or standby component when a primary component fails. For test automation professionals, failover testing ensures high availability, data integrity during transitions, and that recovery mechanisms work as designed.

## What is Failover Testing?

Failover testing deliberately triggers failures in system components to verify that backup systems activate correctly, service continuity is maintained, and data is preserved. It validates that redundancy mechanisms actually work under real failure conditions.

### Failover Testing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Failover Testing                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Normal Operation:                                          │
│  ┌──────────┐     ┌──────────┐                             │
│  │ Primary  │────►│ Service  │     ┌──────────┐            │
│  │ Server   │     │ Active   │     │ Standby  │            │
│  └──────────┘     └──────────┘     │ Server   │            │
│                                    └──────────┘            │
│                                                             │
│  During Failover:                                           │
│  ┌──────────┐     ┌──────────┐                             │
│  │ Primary  │  ✗  │ Service  │     ┌──────────┐            │
│  │ (Failed) │     │ Switching│────►│ Standby  │            │
│  └──────────┘     └──────────┘     │ (Active) │            │
│                                    └──────────┘            │
│                                                             │
│  After Failover:                                            │
│  ┌──────────┐     ┌──────────┐                             │
│  │ Primary  │     │ Service  │     ┌──────────┐            │
│  │ (Down)   │     │ Restored │◄────│ Standby  │            │
│  └──────────┘     └──────────┘     │ (Active) │            │
│                                    └──────────┘            │
│                                                             │
│  Failover Types:                                            │
│  ├── Hot standby: Backup ready, minimal switchover time    │
│  ├── Warm standby: Backup needs brief activation           │
│  ├── Cold standby: Backup requires full startup            │
│  └── Active-active: Multiple nodes share load              │
│                                                             │
│  Test Scenarios:                                            │
│  ├── Server crash / process kill                           │
│  ├── Network partition                                     │
│  ├── Database failover                                     │
│  ├── Load balancer failover                                │
│  ├── DNS failover                                          │
│  └── Storage failover                                      │
│                                                             │
│  Verification Points:                                       │
│  ├── Service continuity                                    │
│  ├── Data integrity                                        │
│  ├── Recovery time (RTO)                                   │
│  ├── Data loss (RPO)                                       │
│  └── Client reconnection                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Failover Tests

### Failover Test Framework

```python
# failover_testing.py

"""
Framework for testing failover scenarios in distributed systems.
"""

import pytest
import time
import subprocess
from dataclasses import dataclass
from typing import List, Optional, Callable
from datetime import datetime, timedelta
from enum import Enum
import requests
import socket


class ComponentStatus(Enum):
    RUNNING = "running"
    STOPPED = "stopped"
    DEGRADED = "degraded"
    FAILING_OVER = "failing_over"


@dataclass
class FailoverEvent:
    component: str
    trigger_time: datetime
    detection_time: Optional[datetime] = None
    failover_start: Optional[datetime] = None
    failover_complete: Optional[datetime] = None
    data_loss: bool = False
    errors_during_failover: int = 0

    @property
    def detection_delay(self) -> Optional[timedelta]:
        if self.trigger_time and self.detection_time:
            return self.detection_time - self.trigger_time
        return None

    @property
    def total_failover_time(self) -> Optional[timedelta]:
        if self.trigger_time and self.failover_complete:
            return self.failover_complete - self.trigger_time
        return None


class ServiceHealthChecker:
    """Check service health during failover tests."""

    def __init__(self, url: str, timeout: float = 5.0):
        self.url = url
        self.timeout = timeout

    def is_healthy(self) -> bool:
        try:
            response = requests.get(
                f"{self.url}/health",
                timeout=self.timeout
            )
            return response.status_code == 200
        except (requests.ConnectionError, requests.Timeout):
            return False

    def wait_for_healthy(
        self, max_wait: float = 60.0, interval: float = 1.0
    ) -> float:
        """Wait for service to become healthy. Returns wait time in seconds."""
        start = time.time()
        while time.time() - start < max_wait:
            if self.is_healthy():
                return time.time() - start
            time.sleep(interval)
        raise TimeoutError(
            f"Service at {self.url} not healthy after {max_wait}s"
        )

    def measure_availability(
        self, duration: float = 30.0, interval: float = 0.5
    ) -> dict:
        """Measure availability over a time period."""
        checks = 0
        successes = 0
        start = time.time()

        while time.time() - start < duration:
            checks += 1
            if self.is_healthy():
                successes += 1
            time.sleep(interval)

        return {
            "total_checks": checks,
            "successful": successes,
            "failed": checks - successes,
            "availability_pct": (successes / checks * 100) if checks else 0
        }


class FailoverTestRunner:
    """Execute and monitor failover test scenarios."""

    def __init__(self, service_url: str):
        self.health_checker = ServiceHealthChecker(service_url)
        self.events: List[FailoverEvent] = []

    def test_failover(
        self,
        component: str,
        failure_trigger: Callable,
        recovery_trigger: Optional[Callable] = None,
        max_failover_time: float = 30.0,
        max_data_loss: int = 0
    ) -> FailoverEvent:
        """Run a complete failover test."""
        event = FailoverEvent(
            component=component,
            trigger_time=datetime.now()
        )

        # Verify service is healthy before test
        assert self.health_checker.is_healthy(), \
            "Service must be healthy before failover test"

        # Trigger failure
        failure_trigger()
        event.trigger_time = datetime.now()

        # Monitor failover
        failover_start = time.time()
        was_unhealthy = False

        while time.time() - failover_start < max_failover_time:
            if not self.health_checker.is_healthy():
                if not was_unhealthy:
                    event.detection_time = datetime.now()
                    was_unhealthy = True
                event.errors_during_failover += 1
            elif was_unhealthy:
                event.failover_complete = datetime.now()
                break
            time.sleep(0.5)

        if event.failover_complete is None:
            raise TimeoutError(
                f"Failover not completed within {max_failover_time}s"
            )

        self.events.append(event)
        return event


# Tests
class TestFailoverScenarios:
    """Test various failover scenarios."""

    @pytest.fixture
    def health_checker(self):
        return ServiceHealthChecker("http://localhost:8080")

    def test_database_failover_time(self):
        """Verify database failover completes within RTO."""
        runner = FailoverTestRunner("http://localhost:8080")

        event = runner.test_failover(
            component="primary-database",
            failure_trigger=lambda: simulate_db_failure(),
            max_failover_time=30.0
        )

        # RTO: Recovery Time Objective
        assert event.total_failover_time.total_seconds() < 30, \
            f"Failover took {event.total_failover_time.total_seconds()}s, exceeds 30s RTO"

    def test_service_continuity_during_failover(self):
        """Verify requests succeed during failover."""
        checker = ServiceHealthChecker("http://localhost:8080")

        # Trigger failover in background
        simulate_server_failure_async()

        # Monitor availability during failover
        stats = checker.measure_availability(duration=60.0)

        assert stats["availability_pct"] > 99.0, \
            f"Availability dropped to {stats['availability_pct']:.1f}%"

    def test_data_integrity_after_failover(self):
        """Verify no data is lost after failover."""
        # Write test data
        test_data = {"key": "failover-test", "value": "important"}
        write_data(test_data)

        # Trigger failover
        simulate_db_failure()

        # Wait for failover to complete
        time.sleep(5)

        # Verify data survived
        retrieved = read_data("failover-test")
        assert retrieved == test_data, "Data lost during failover"

    def test_failback_to_primary(self):
        """Verify failback to primary works correctly."""
        runner = FailoverTestRunner("http://localhost:8080")

        # Trigger failover
        simulate_server_failure()
        time.sleep(10)

        # Restore primary
        restore_primary_server()
        time.sleep(5)

        assert runner.health_checker.is_healthy()


# Simulation helpers
def simulate_db_failure(): pass
def simulate_server_failure(): pass
def simulate_server_failure_async(): pass
def restore_primary_server(): pass
def write_data(data): pass
def read_data(key): return {"key": key, "value": "important"}
```

### JavaScript Implementation

```javascript
// failover-testing.test.js

/**
 * Failover testing patterns for distributed systems.
 */

class FailoverTestHelper {
  constructor(serviceUrl) {
    this.serviceUrl = serviceUrl;
    this.events = [];
  }

  async checkHealth() {
    try {
      const response = await fetch(`${this.serviceUrl}/health`, {
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async waitForHealthy(maxWaitMs = 60000) {
    const start = Date.now();
    while (Date.now() - start < maxWaitMs) {
      if (await this.checkHealth()) {
        return Date.now() - start;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
    throw new Error(`Service not healthy after ${maxWaitMs}ms`);
  }

  async measureAvailability(durationMs = 30000) {
    let checks = 0;
    let successes = 0;
    const start = Date.now();

    while (Date.now() - start < durationMs) {
      checks++;
      if (await this.checkHealth()) successes++;
      await new Promise((r) => setTimeout(r, 500));
    }

    return {
      totalChecks: checks,
      successful: successes,
      availabilityPct: (successes / checks) * 100,
    };
  }
}

describe('Failover Testing', () => {
  let helper;

  beforeEach(() => {
    helper = new FailoverTestHelper('http://localhost:8080');
  });

  test('service recovers within RTO after primary failure', async () => {
    // Trigger primary failure
    await triggerPrimaryFailure();

    // Measure recovery time
    const recoveryMs = await helper.waitForHealthy(30000);

    expect(recoveryMs).toBeLessThan(30000); // 30s RTO
  });

  test('maintains availability during failover', async () => {
    triggerPrimaryFailure(); // Don't await — run in background

    const stats = await helper.measureAvailability(60000);

    expect(stats.availabilityPct).toBeGreaterThan(99.0);
  });

  test('preserves data integrity after failover', async () => {
    const testData = { key: 'test', value: 'critical-data' };
    await writeData(testData);

    await triggerPrimaryFailure();
    await helper.waitForHealthy();

    const retrieved = await readData('test');
    expect(retrieved).toEqual(testData);
  });
});

// Simulation helpers
async function triggerPrimaryFailure() {}
async function writeData(data) {}
async function readData(key) { return { key, value: 'critical-data' }; }
```

## Best Practices

### Failover Testing Checklist

```markdown
## Failover Testing Best Practices

### Planning
- [ ] Define Recovery Time Objective (RTO)
- [ ] Define Recovery Point Objective (RPO)
- [ ] Identify all failover components
- [ ] Document failover procedures
- [ ] Create realistic failure scenarios

### Execution
- [ ] Test in production-like environments
- [ ] Monitor service health continuously during tests
- [ ] Verify data integrity after each failover
- [ ] Test both automatic and manual failover
- [ ] Test failback to primary systems

### Validation
- [ ] Measure actual recovery time against RTO
- [ ] Verify zero or acceptable data loss
- [ ] Check client reconnection behavior
- [ ] Validate alerting and notification systems
- [ ] Test under load during failover

### Automation
- [ ] Integrate failover tests into CI/CD
- [ ] Schedule regular failover drills
- [ ] Automate failure injection (chaos engineering)
- [ ] Track failover metrics over time
```

## Conclusion

Failover testing is essential for validating high availability and disaster recovery mechanisms. By systematically triggering failures and measuring recovery, test automation professionals ensure that systems meet their reliability targets and that users experience minimal disruption during component failures.

## Key Takeaways

1. Failover testing verifies backup systems activate correctly during failures
2. Define clear RTO and RPO targets before testing
3. Test multiple failure types: server, database, network, storage
4. Verify data integrity is preserved through failover transitions
5. Measure availability percentage during the failover period
6. Test failback to primary systems after recovery
7. Automate failover tests and run them regularly as chaos engineering exercises
