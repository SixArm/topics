# The Law of Demos: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

The Law of Demos (also known as the Demo Effect) states that the probability of a software failure is directly proportional to the importance of the audience watching. For test automation professionals, this law highlights the importance of pre-demo testing, environment stability, and having reliable fallback plans.

## What is the Law of Demos?

The Law of Demos is a humorous but practically important observation that software tends to fail during high-stakes demonstrations. The underlying causes are real: demos use different environments, data, or configurations than development; stress and time pressure lead to shortcuts; and the audience notices failures that would be dismissed during development.

### The Law of Demos in Context

```
┌─────────────────────────────────────────────────────────────┐
│                   The Law of Demos                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Failure Probability vs. Audience Importance:               │
│                                                             │
│  Failure │                              ╱                   │
│  Prob.   │                           ╱╱                     │
│          │                        ╱╱                        │
│          │                    ╱╱╱                            │
│          │               ╱╱╱                                │
│          │          ╱╱╱╱                                    │
│          │     ╱╱╱╱                                         │
│          │╱╱╱╱                                              │
│          └──────────────────────────────►                   │
│               Audience Importance                           │
│                                                             │
│  Why Demos Fail:                                            │
│  ├── Different environment than development                │
│  ├── Stale or missing test data                            │
│  ├── Network/connectivity differences                      │
│  ├── Untested demo-specific workflows                      │
│  ├── Last-minute code changes                              │
│  └── Configuration drift between environments              │
│                                                             │
│  Prevention Strategy:                                       │
│  ├── Pre-demo smoke test automation                        │
│  ├── Frozen demo environments                              │
│  ├── Rehearsal runs with the exact demo script             │
│  ├── Fallback plan (screenshots, recordings)               │
│  └── Demo-specific automated test suite                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Preventing Demo Failures with Automation

```python
# the_law_of_demos.py

"""
Automated pre-demo verification to prevent demo failures.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from enum import Enum
from datetime import datetime


class CheckStatus(Enum):
    PASS = "pass"
    FAIL = "fail"
    WARN = "warn"


@dataclass
class DemoCheck:
    name: str
    status: CheckStatus
    details: str = ""
    critical: bool = True


class PreDemoChecklist:
    """Automated pre-demo verification suite."""

    def __init__(self):
        self.checks: List[DemoCheck] = []

    def check_environment(self, env_url: str) -> DemoCheck:
        """Verify demo environment is accessible."""
        try:
            accessible = ping_service(env_url)
            status = CheckStatus.PASS if accessible else CheckStatus.FAIL
            return self._record(DemoCheck(
                "Environment Accessible", status,
                f"Environment at {env_url}: {'OK' if accessible else 'UNREACHABLE'}",
                critical=True
            ))
        except Exception as e:
            return self._record(DemoCheck("Environment Accessible", CheckStatus.FAIL, str(e)))

    def check_test_data(self, required_data: Dict) -> DemoCheck:
        """Verify demo test data exists."""
        missing = [k for k, v in required_data.items() if not v]
        if missing:
            return self._record(DemoCheck(
                "Test Data Present", CheckStatus.FAIL,
                f"Missing: {', '.join(missing)}", critical=True
            ))
        return self._record(DemoCheck("Test Data Present", CheckStatus.PASS, "All data present"))

    def check_demo_workflow(self, steps: List[Dict]) -> DemoCheck:
        """Run through demo workflow steps."""
        failed_steps = []
        for step in steps:
            if not step.get("passed", False):
                failed_steps.append(step["name"])

        if failed_steps:
            return self._record(DemoCheck(
                "Demo Workflow", CheckStatus.FAIL,
                f"Failed steps: {', '.join(failed_steps)}", critical=True
            ))
        return self._record(DemoCheck("Demo Workflow", CheckStatus.PASS, f"{len(steps)} steps passed"))

    def check_recent_changes(self, hours_since_last_deploy: float) -> DemoCheck:
        """Warn if recent changes might affect stability."""
        if hours_since_last_deploy < 2:
            return self._record(DemoCheck(
                "Environment Stability", CheckStatus.WARN,
                f"Deployed {hours_since_last_deploy:.1f}h ago — recent changes may cause issues",
                critical=False
            ))
        return self._record(DemoCheck(
            "Environment Stability", CheckStatus.PASS,
            f"Last deploy {hours_since_last_deploy:.1f}h ago — stable"
        ))

    @property
    def ready_for_demo(self) -> bool:
        critical = [c for c in self.checks if c.critical]
        return all(c.status != CheckStatus.FAIL for c in critical)

    @property
    def warnings(self) -> List[str]:
        return [c.details for c in self.checks if c.status == CheckStatus.WARN]

    def _record(self, check: DemoCheck) -> DemoCheck:
        self.checks.append(check)
        return check


# Tests
class TestPreDemoChecklist:
    """Test pre-demo verification."""

    def test_all_checks_pass(self):
        checklist = PreDemoChecklist()
        checklist.check_environment("https://demo.example.com")
        checklist.check_test_data({"users": True, "products": True, "orders": True})
        checklist.check_demo_workflow([
            {"name": "Login", "passed": True},
            {"name": "Browse", "passed": True},
            {"name": "Checkout", "passed": True},
        ])
        checklist.check_recent_changes(24.0)

        assert checklist.ready_for_demo

    def test_missing_data_blocks_demo(self):
        checklist = PreDemoChecklist()
        checklist.check_test_data({"users": True, "products": False})

        assert not checklist.ready_for_demo

    def test_recent_deploy_warns(self):
        checklist = PreDemoChecklist()
        checklist.check_recent_changes(0.5)

        assert len(checklist.warnings) > 0
        # Warnings don't block, but inform
        assert checklist.ready_for_demo  # Only non-critical

    def test_workflow_failure_blocks(self):
        checklist = PreDemoChecklist()
        checklist.check_demo_workflow([
            {"name": "Login", "passed": True},
            {"name": "Checkout", "passed": False},
        ])

        assert not checklist.ready_for_demo


# Helper
def ping_service(url):
    return True  # Simulated
```

## Best Practices

```markdown
## Preventing Demo Failures

### Preparation
- [ ] Run automated pre-demo smoke tests
- [ ] Freeze demo environment 24+ hours before
- [ ] Verify all demo data exists and is correct
- [ ] Rehearse the exact demo flow at least once

### Automation
- [ ] Create a demo-specific test suite
- [ ] Automate environment health checks
- [ ] Test the exact workflow steps being demonstrated
- [ ] Warn on recent deployments to demo environment

### Fallback Plans
- [ ] Record a backup demo video
- [ ] Prepare screenshots of key screens
- [ ] Have a secondary environment ready
- [ ] Know how to recover from common failures
```

## Conclusion

The Law of Demos is a practical reminder that high-stakes demonstrations require deliberate preparation. By automating pre-demo verification — environment checks, data validation, and workflow testing — test automation professionals help ensure demos succeed when they matter most.

## Key Takeaways

1. The Law of Demos: failure probability increases with audience importance
2. Most demo failures have preventable root causes
3. Automate pre-demo smoke tests covering the exact demo flow
4. Freeze demo environments before important demonstrations
5. Verify demo test data exists and is correct
6. Warn when recent changes may affect demo stability
7. Always have fallback plans (recordings, screenshots, secondary environments)
