# Regression Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Regression testing verifies that previously working functionality continues to work after code changes. For test automation professionals, regression testing is the primary use case for automated test suites — providing continuous assurance that new changes haven't broken existing features.

## What is Regression Testing?

Regression testing re-executes existing tests after modifications to ensure that changes, bug fixes, or new features don't introduce unintended side effects. It is the most valuable type of testing to automate because it must be repeated with every change.

### Regression Testing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                   Regression Testing                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  When to Regression Test:                                   │
│  ├── After bug fixes                                       │
│  ├── After new feature additions                           │
│  ├── After code refactoring                                │
│  ├── After dependency updates                              │
│  ├── After configuration changes                           │
│  └── After environment changes                             │
│                                                             │
│  Regression Test Strategies:                                │
│  ┌─────────────────────────────────────┐                   │
│  │ Retest All: Run complete suite     │ Thorough but slow  │
│  ├─────────────────────────────────────┤                   │
│  │ Priority-Based: Run by risk level  │ Balanced approach  │
│  ├─────────────────────────────────────┤                   │
│  │ Change-Based: Run affected tests   │ Fast but complex   │
│  └─────────────────────────────────────┘                   │
│                                                             │
│  Test Selection Pipeline:                                   │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐           │
│  │ Code   │─►│Analyze │─►│Select  │─►│Execute │           │
│  │ Change │  │Impact  │  │ Tests  │  │ Tests  │           │
│  └────────┘  └────────┘  └────────┘  └────────┘           │
│                                                             │
│  Regression Suite Layers:                                   │
│  ├── Smoke (5 min): Critical paths only                    │
│  ├── Sanity (15 min): Major features                       │
│  ├── Core (1 hr): Important functionality                  │
│  └── Full (4+ hr): Complete regression suite               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Regression Testing

```python
# regression_testing.py

"""
Regression test management and selection strategies.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Set, Dict, Optional
from enum import Enum


class Priority(Enum):
    SMOKE = 1      # Run on every commit
    CRITICAL = 2   # Run on every PR
    HIGH = 3       # Run nightly
    MEDIUM = 4     # Run weekly
    LOW = 5        # Run before releases


@dataclass
class RegressionTest:
    name: str
    priority: Priority
    affected_modules: Set[str]
    avg_duration_sec: float
    last_failure_build: Optional[str] = None
    failure_count: int = 0

    @property
    def risk_score(self) -> float:
        """Higher score = should run more frequently."""
        base = (6 - self.priority.value) * 20  # Priority weight
        failure_weight = min(self.failure_count * 5, 30)
        recency_weight = 10 if self.last_failure_build else 0
        return base + failure_weight + recency_weight


class RegressionSuiteManager:
    """Manage and select regression tests."""

    def __init__(self):
        self.tests: List[RegressionTest] = []

    def add_test(self, test: RegressionTest):
        self.tests.append(test)

    def select_by_priority(self, max_priority: Priority) -> List[RegressionTest]:
        """Select tests up to a given priority level."""
        return [t for t in self.tests if t.priority.value <= max_priority.value]

    def select_by_impact(self, changed_modules: Set[str]) -> List[RegressionTest]:
        """Select tests affected by changed modules."""
        return [
            t for t in self.tests
            if t.affected_modules & changed_modules
        ]

    def select_by_time_budget(self, budget_seconds: float) -> List[RegressionTest]:
        """Select highest-priority tests within time budget."""
        sorted_tests = sorted(self.tests, key=lambda t: t.risk_score, reverse=True)
        selected = []
        total_time = 0

        for test in sorted_tests:
            if total_time + test.avg_duration_sec <= budget_seconds:
                selected.append(test)
                total_time += test.avg_duration_sec

        return selected

    def get_suite_stats(self, tests: List[RegressionTest]) -> Dict:
        return {
            "count": len(tests),
            "total_duration_sec": sum(t.avg_duration_sec for t in tests),
            "by_priority": {
                p.name: len([t for t in tests if t.priority == p])
                for p in Priority
            },
        }


# Tests
class TestRegressionTesting:
    """Test regression suite management."""

    @pytest.fixture
    def manager(self):
        mgr = RegressionSuiteManager()
        mgr.add_test(RegressionTest("login_test", Priority.SMOKE, {"auth"}, 5.0))
        mgr.add_test(RegressionTest("checkout_test", Priority.CRITICAL, {"cart", "payment"}, 30.0))
        mgr.add_test(RegressionTest("search_test", Priority.HIGH, {"search"}, 15.0))
        mgr.add_test(RegressionTest("profile_test", Priority.MEDIUM, {"user"}, 10.0))
        mgr.add_test(RegressionTest("admin_test", Priority.LOW, {"admin"}, 20.0))
        return mgr

    def test_smoke_selection(self, manager):
        smoke = manager.select_by_priority(Priority.SMOKE)
        assert len(smoke) == 1
        assert smoke[0].name == "login_test"

    def test_critical_selection(self, manager):
        critical = manager.select_by_priority(Priority.CRITICAL)
        assert len(critical) == 2  # SMOKE + CRITICAL

    def test_impact_based_selection(self, manager):
        affected = manager.select_by_impact({"auth", "payment"})
        names = {t.name for t in affected}
        assert "login_test" in names
        assert "checkout_test" in names
        assert "search_test" not in names

    def test_time_budget_selection(self, manager):
        selected = manager.select_by_time_budget(budget_seconds=30)
        total_time = sum(t.avg_duration_sec for t in selected)
        assert total_time <= 30

    def test_risk_scoring(self):
        stable = RegressionTest("stable", Priority.LOW, set(), 5.0)
        risky = RegressionTest("risky", Priority.SMOKE, set(), 5.0, failure_count=5)
        assert risky.risk_score > stable.risk_score

    def test_suite_stats(self, manager):
        all_tests = manager.select_by_priority(Priority.LOW)
        stats = manager.get_suite_stats(all_tests)
        assert stats["count"] == 5
        assert stats["total_duration_sec"] == 80.0
```

### JavaScript Implementation

```javascript
// regression-testing.test.js

class RegressionSuite {
  constructor() {
    this.tests = [];
  }

  add(test) {
    this.tests.push(test);
  }

  selectByPriority(maxPriority) {
    return this.tests.filter((t) => t.priority <= maxPriority);
  }

  selectByImpact(changedModules) {
    return this.tests.filter((t) =>
      t.modules.some((m) => changedModules.includes(m))
    );
  }

  selectByTimeBudget(budgetSec) {
    const sorted = [...this.tests].sort((a, b) => a.priority - b.priority);
    const selected = [];
    let total = 0;
    for (const test of sorted) {
      if (total + test.durationSec <= budgetSec) {
        selected.push(test);
        total += test.durationSec;
      }
    }
    return selected;
  }
}

describe('Regression Test Selection', () => {
  let suite;
  beforeEach(() => {
    suite = new RegressionSuite();
    suite.add({ name: 'login', priority: 1, modules: ['auth'], durationSec: 5 });
    suite.add({ name: 'checkout', priority: 2, modules: ['cart'], durationSec: 30 });
    suite.add({ name: 'search', priority: 3, modules: ['search'], durationSec: 15 });
  });

  test('selects smoke tests only', () => {
    const smoke = suite.selectByPriority(1);
    expect(smoke).toHaveLength(1);
    expect(smoke[0].name).toBe('login');
  });

  test('selects by impact', () => {
    const affected = suite.selectByImpact(['auth']);
    expect(affected.map((t) => t.name)).toContain('login');
    expect(affected.map((t) => t.name)).not.toContain('search');
  });

  test('respects time budget', () => {
    const selected = suite.selectByTimeBudget(20);
    const total = selected.reduce((s, t) => s + t.durationSec, 0);
    expect(total).toBeLessThanOrEqual(20);
  });
});
```

## Best Practices

```markdown
## Regression Testing Best Practices

### Suite Management
- [ ] Prioritize tests by business impact and risk
- [ ] Maintain smoke, sanity, and full regression tiers
- [ ] Remove obsolete tests when features are removed
- [ ] Track test execution time and optimize slow tests

### Selection Strategy
- [ ] Run smoke tests on every commit
- [ ] Run impact-based selection on PRs
- [ ] Run full regression nightly or before releases
- [ ] Use risk scoring to prioritize limited time budgets

### Automation
- [ ] Automate all regression tests
- [ ] Integrate with CI/CD pipeline
- [ ] Parallelize execution for speed
- [ ] Report results with clear pass/fail status

### Maintenance
- [ ] Update tests when requirements change
- [ ] Fix flaky tests promptly
- [ ] Add regression tests for every bug fix
- [ ] Review and refactor test suite quarterly
```

## Conclusion

Regression testing is the foundation of continuous quality assurance. By automating regression suites, prioritizing by risk, and selecting tests based on code impact, test automation professionals ensure that every change is validated efficiently without sacrificing coverage.

## Key Takeaways

1. Regression testing verifies existing functionality after changes
2. It is the most valuable type of testing to automate
3. Use tiered suites: smoke, sanity, core, and full regression
4. Select tests based on priority, impact, or time budget
5. Add a regression test for every bug fix
6. Track risk scores to prioritize test execution
7. Run regression suites at appropriate frequencies in CI/CD
