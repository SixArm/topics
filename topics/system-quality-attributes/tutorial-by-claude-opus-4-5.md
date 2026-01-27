# System Quality Attributes: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

System quality attributes (also called non-functional requirements) define how a system performs its functions rather than what functions it performs. For test automation professionals, quality attributes like performance, reliability, security, and usability drive non-functional testing strategies that ensure the system meets its operational requirements.

## What are System Quality Attributes?

Quality attributes are measurable properties of a system that indicate how well it satisfies stakeholder needs beyond basic functionality. They include performance, scalability, reliability, availability, security, maintainability, and usability. Each attribute requires specific testing approaches.

### Quality Attributes in Context

```
┌─────────────────────────────────────────────────────────────┐
│                System Quality Attributes                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ISO 25010 Quality Model:                                   │
│  ├── Performance Efficiency                                │
│  │   ├── Time behavior (response time)                     │
│  │   ├── Resource utilization (CPU, memory)                │
│  │   └── Capacity (throughput)                             │
│  ├── Reliability                                           │
│  │   ├── Maturity (failure frequency)                      │
│  │   ├── Availability (uptime)                             │
│  │   ├── Fault tolerance (graceful degradation)            │
│  │   └── Recoverability (restore after failure)            │
│  ├── Security                                              │
│  │   ├── Confidentiality                                   │
│  │   ├── Integrity                                         │
│  │   ├── Authentication                                    │
│  │   └── Authorization                                     │
│  ├── Maintainability                                       │
│  │   ├── Modularity                                        │
│  │   ├── Testability                                       │
│  │   └── Modifiability                                     │
│  ├── Usability                                             │
│  │   ├── Learnability                                      │
│  │   ├── Accessibility                                     │
│  │   └── Error protection                                  │
│  └── Scalability                                           │
│      ├── Horizontal scaling                                │
│      └── Vertical scaling                                  │
│                                                             │
│  Testing Approach per Attribute:                            │
│  Attribute     → Testing Method                            │
│  Performance   → Load/stress testing                       │
│  Reliability   → Chaos engineering, failover tests         │
│  Security      → SAST, DAST, penetration testing           │
│  Scalability   → Capacity testing, auto-scaling tests      │
│  Usability     → Accessibility testing, UX testing         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing Quality Attributes

```python
# system_quality_attributes.py

"""
Framework for testing system quality attributes.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from enum import Enum


class QualityAttribute(Enum):
    PERFORMANCE = "performance"
    RELIABILITY = "reliability"
    SECURITY = "security"
    SCALABILITY = "scalability"
    MAINTAINABILITY = "maintainability"
    USABILITY = "usability"
    AVAILABILITY = "availability"


@dataclass
class QualityRequirement:
    attribute: QualityAttribute
    metric: str
    target: float
    unit: str
    priority: str = "high"


@dataclass
class QualityTestResult:
    requirement: QualityRequirement
    actual_value: float
    passed: bool
    details: str = ""

    @property
    def deviation_pct(self) -> float:
        if self.requirement.target == 0:
            return 0
        return ((self.actual_value - self.requirement.target)
                / self.requirement.target * 100)


class QualityAttributeTester:
    """Evaluate system against quality requirements."""

    def __init__(self):
        self.requirements: List[QualityRequirement] = []
        self.results: List[QualityTestResult] = []

    def add_requirement(self, req: QualityRequirement):
        self.requirements.append(req)

    def test_performance(self, response_time_ms: float, target_ms: float) -> QualityTestResult:
        req = QualityRequirement(QualityAttribute.PERFORMANCE, "response_time_p95", target_ms, "ms")
        result = QualityTestResult(req, response_time_ms, response_time_ms <= target_ms)
        self.results.append(result)
        return result

    def test_availability(self, uptime_pct: float, target_pct: float) -> QualityTestResult:
        req = QualityRequirement(QualityAttribute.AVAILABILITY, "uptime", target_pct, "%")
        result = QualityTestResult(req, uptime_pct, uptime_pct >= target_pct)
        self.results.append(result)
        return result

    def test_reliability(self, error_rate: float, max_error_rate: float) -> QualityTestResult:
        req = QualityRequirement(QualityAttribute.RELIABILITY, "error_rate", max_error_rate, "%")
        result = QualityTestResult(req, error_rate, error_rate <= max_error_rate)
        self.results.append(result)
        return result

    def generate_report(self) -> Dict:
        passed = sum(1 for r in self.results if r.passed)
        return {
            "total": len(self.results),
            "passed": passed,
            "failed": len(self.results) - passed,
            "pass_rate": (passed / len(self.results) * 100) if self.results else 0,
            "by_attribute": {
                attr.value: [r for r in self.results if r.requirement.attribute == attr]
                for attr in QualityAttribute
                if any(r.requirement.attribute == attr for r in self.results)
            }
        }


# Tests
class TestQualityAttributes:
    """Test quality attribute evaluation."""

    def test_performance_passes(self):
        tester = QualityAttributeTester()
        result = tester.test_performance(150, target_ms=200)
        assert result.passed

    def test_performance_fails(self):
        tester = QualityAttributeTester()
        result = tester.test_performance(350, target_ms=200)
        assert not result.passed
        assert result.deviation_pct > 0

    def test_availability_requirement(self):
        tester = QualityAttributeTester()
        result = tester.test_availability(99.95, target_pct=99.9)
        assert result.passed

    def test_reliability_requirement(self):
        tester = QualityAttributeTester()
        result = tester.test_reliability(0.5, max_error_rate=1.0)
        assert result.passed

    def test_quality_report(self):
        tester = QualityAttributeTester()
        tester.test_performance(150, 200)
        tester.test_availability(99.95, 99.9)
        tester.test_reliability(0.5, 1.0)

        report = tester.generate_report()
        assert report["total"] == 3
        assert report["passed"] == 3
        assert report["pass_rate"] == 100
```

### JavaScript Implementation

```javascript
// system-quality-attributes.test.js

class QualityTester {
  constructor() { this.results = []; }

  testPerformance(actualMs, targetMs) {
    const passed = actualMs <= targetMs;
    this.results.push({ attribute: 'performance', actualMs, targetMs, passed });
    return passed;
  }

  testAvailability(uptimePct, targetPct) {
    const passed = uptimePct >= targetPct;
    this.results.push({ attribute: 'availability', uptimePct, targetPct, passed });
    return passed;
  }

  get passRate() {
    const passed = this.results.filter((r) => r.passed).length;
    return (passed / this.results.length) * 100;
  }
}

describe('System Quality Attributes', () => {
  test('performance within target', () => {
    const tester = new QualityTester();
    expect(tester.testPerformance(150, 200)).toBe(true);
  });

  test('availability meets SLA', () => {
    const tester = new QualityTester();
    expect(tester.testAvailability(99.95, 99.9)).toBe(true);
  });

  test('generates quality report', () => {
    const tester = new QualityTester();
    tester.testPerformance(150, 200);
    tester.testAvailability(99.95, 99.9);
    expect(tester.passRate).toBe(100);
  });
});
```

## Best Practices

```markdown
## Quality Attributes Testing Checklist

### Requirements
- [ ] Define measurable targets for each quality attribute
- [ ] Prioritize attributes by business impact
- [ ] Document acceptance criteria clearly
- [ ] Review quality requirements with stakeholders

### Testing Strategy
- [ ] Map each attribute to appropriate test types
- [ ] Automate quality attribute tests in CI/CD
- [ ] Test under realistic conditions
- [ ] Monitor quality attributes in production

### Reporting
- [ ] Track quality metrics across releases
- [ ] Report deviations from targets
- [ ] Visualize quality trends over time
- [ ] Alert on quality attribute regressions
```

## Conclusion

System quality attributes define the operational excellence of software beyond functionality. By defining measurable requirements for performance, reliability, security, and other attributes, and testing them systematically, teams ensure their systems meet user expectations for how well the software works, not just what it does.

## Key Takeaways

1. Quality attributes define how well a system performs, not what it does
2. Key attributes include performance, reliability, security, scalability, and usability
3. Each attribute requires specific testing approaches
4. Define measurable targets with clear units and thresholds
5. Automate quality attribute testing in CI/CD pipelines
6. Monitor quality attributes in production as well as in testing
7. Track quality trends across releases to detect regressions early
