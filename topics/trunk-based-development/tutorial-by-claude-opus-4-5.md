# Trunk-Based Development: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Trunk-based development (TBD) is a branching strategy where developers commit to a single shared branch (trunk/main) frequently, often multiple times per day. For test automation professionals, TBD demands fast, reliable automated tests because every commit must keep the trunk deployable.

## What is Trunk-Based Development?

In trunk-based development, all developers integrate their work into a single branch. Long-lived feature branches are avoided. Changes are small, frequent, and tested before or immediately after merging. This approach requires robust test automation to maintain trunk stability.

### Trunk-Based Development in Context

```
┌─────────────────────────────────────────────────────────────┐
│              Trunk-Based Development                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Traditional (long-lived branches):                         │
│  main ────●───────────────────────●────────                │
│            \                     /                          │
│  feature    ●──●──●──●──●──●──●   (weeks)                 │
│             (merge conflicts, integration pain)            │
│                                                             │
│  Trunk-Based Development:                                   │
│  main ──●──●──●──●──●──●──●──●──●──── (always deployable) │
│          │  │  │  │  │  │  │  │  │                         │
│          ▲  ▲  ▲  ▲  ▲  ▲  ▲  ▲  ▲                        │
│          Small, frequent commits from all devs             │
│                                                             │
│  With short-lived branches (< 1 day):                      │
│  main ──●──●────●──●──●────●──●──●───                     │
│            \  /        \  /                                 │
│             ●            ●  (hours, not days)              │
│                                                             │
│  Test Automation Requirements:                              │
│  ├── Fast: Tests must run in < 10 minutes for CI          │
│  ├── Reliable: No flaky tests — false failures block all  │
│  ├── Comprehensive: Every commit must be safe              │
│  ├── Automated: No manual gates for every commit          │
│  └── Selective: Run affected tests to stay fast            │
│                                                             │
│  Supporting Practices:                                      │
│  ├── Feature flags (deploy ≠ release)                     │
│  ├── Pre-commit hooks and checks                          │
│  ├── Continuous integration with fast feedback             │
│  └── Progressive rollout and monitoring                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing in Trunk-Based Development

```python
# trunk_based_development.py

"""
Test automation patterns for trunk-based development.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Set, Optional
from datetime import datetime


@dataclass
class Commit:
    sha: str
    author: str
    message: str
    files_changed: Set[str]
    timestamp: datetime = field(default_factory=datetime.now)


class TrunkGuard:
    """Automated quality gates for trunk-based development."""

    def __init__(self, max_ci_minutes: int = 10, min_pass_rate: float = 100.0):
        self.max_ci_minutes = max_ci_minutes
        self.min_pass_rate = min_pass_rate

    def evaluate_commit(self, commit: Commit, ci_result: Dict) -> Dict:
        checks = {
            "tests_pass": ci_result.get("pass_rate", 0) >= self.min_pass_rate,
            "fast_enough": ci_result.get("duration_minutes", 0) <= self.max_ci_minutes,
            "no_regressions": ci_result.get("regressions", 0) == 0,
            "coverage_maintained": ci_result.get("coverage_delta", 0) >= 0,
        }

        return {
            "commit": commit.sha,
            "allowed": all(checks.values()),
            "checks": checks,
            "blocking": [k for k, v in checks.items() if not v],
        }


class TestSelector:
    """Select tests based on changed files for fast feedback."""

    def __init__(self):
        self.dependency_map: Dict[str, Set[str]] = {}

    def register_dependency(self, source_file: str, test_files: Set[str]):
        self.dependency_map[source_file] = test_files

    def select_for_commit(self, commit: Commit) -> Dict:
        affected_tests: Set[str] = set()

        for changed_file in commit.files_changed:
            for source, tests in self.dependency_map.items():
                if changed_file.startswith(source.rstrip("*")):
                    affected_tests.update(tests)

        # Always include smoke tests
        affected_tests.add("tests/smoke/")

        return {
            "selected_tests": list(affected_tests),
            "files_changed": list(commit.files_changed),
            "selection_type": "targeted" if len(affected_tests) < 5 else "broad",
        }


@dataclass
class FeatureFlag:
    """Feature flag for deploying without releasing."""
    name: str
    enabled: bool = False
    rollout_percentage: int = 0
    description: str = ""


class FeatureFlagManager:
    """Manage feature flags for trunk-based development."""

    def __init__(self):
        self.flags: Dict[str, FeatureFlag] = {}

    def create(self, name: str, description: str = "") -> FeatureFlag:
        flag = FeatureFlag(name=name, description=description)
        self.flags[name] = flag
        return flag

    def is_enabled(self, name: str) -> bool:
        flag = self.flags.get(name)
        return flag.enabled if flag else False

    def enable(self, name: str, rollout_pct: int = 100):
        if name in self.flags:
            self.flags[name].enabled = True
            self.flags[name].rollout_percentage = rollout_pct

    def disable(self, name: str):
        if name in self.flags:
            self.flags[name].enabled = False
            self.flags[name].rollout_percentage = 0

    def active_flags(self) -> List[str]:
        return [name for name, flag in self.flags.items() if flag.enabled]


# Tests
class TestTrunkBasedDevelopment:

    def test_trunk_guard_passes_clean_commit(self):
        guard = TrunkGuard()
        commit = Commit("abc123", "dev", "Add feature", {"src/auth.py"})
        ci = {"pass_rate": 100, "duration_minutes": 5, "regressions": 0, "coverage_delta": 1}

        result = guard.evaluate_commit(commit, ci)
        assert result["allowed"]

    def test_trunk_guard_blocks_failing_tests(self):
        guard = TrunkGuard()
        commit = Commit("def456", "dev", "Refactor", {"src/core.py"})
        ci = {"pass_rate": 95, "duration_minutes": 5, "regressions": 2, "coverage_delta": 0}

        result = guard.evaluate_commit(commit, ci)
        assert not result["allowed"]
        assert "tests_pass" in result["blocking"]

    def test_trunk_guard_blocks_slow_ci(self):
        guard = TrunkGuard(max_ci_minutes=10)
        commit = Commit("ghi789", "dev", "Add tests", {"tests/test_new.py"})
        ci = {"pass_rate": 100, "duration_minutes": 25, "regressions": 0, "coverage_delta": 5}

        result = guard.evaluate_commit(commit, ci)
        assert not result["allowed"]
        assert "fast_enough" in result["blocking"]

    def test_targeted_test_selection(self):
        selector = TestSelector()
        selector.register_dependency("src/auth/*", {"tests/test_auth.py", "tests/test_login.py"})
        selector.register_dependency("src/checkout/*", {"tests/test_checkout.py"})

        commit = Commit("abc", "dev", "Fix login", {"src/auth/login.py"})
        result = selector.select_for_commit(commit)

        assert "tests/test_auth.py" in result["selected_tests"]
        assert "tests/test_checkout.py" not in result["selected_tests"]
        assert "tests/smoke/" in result["selected_tests"]  # Always included

    def test_feature_flags(self):
        mgr = FeatureFlagManager()
        mgr.create("new-checkout", "Redesigned checkout flow")

        assert not mgr.is_enabled("new-checkout")

        mgr.enable("new-checkout", rollout_pct=10)
        assert mgr.is_enabled("new-checkout")
        assert "new-checkout" in mgr.active_flags()

        mgr.disable("new-checkout")
        assert not mgr.is_enabled("new-checkout")

    def test_feature_flags_testing_both_paths(self):
        """In TBD, test both flag-on and flag-off paths."""
        mgr = FeatureFlagManager()
        mgr.create("new-search")

        # Test with flag off
        mgr.disable("new-search")
        assert not mgr.is_enabled("new-search")

        # Test with flag on
        mgr.enable("new-search")
        assert mgr.is_enabled("new-search")
```

## Best Practices

```markdown
## Trunk-Based Development Testing

### CI Requirements
- [ ] Keep CI under 10 minutes for pre-merge checks
- [ ] Run full regression in parallel post-merge
- [ ] Zero tolerance for flaky tests — fix or quarantine immediately
- [ ] Use test selection to run only affected tests

### Feature Flags
- [ ] Use flags to deploy incomplete features safely
- [ ] Test both flag-on and flag-off code paths
- [ ] Clean up flags after feature is fully released
- [ ] Monitor flag interactions and combinations

### Trunk Health
- [ ] Block commits that break tests or reduce coverage
- [ ] Revert broken commits immediately
- [ ] Monitor trunk build health in real-time
- [ ] Every developer is responsible for trunk stability
```

## Conclusion

Trunk-based development requires test automation that is fast, reliable, and comprehensive. By maintaining strict CI quality gates, using targeted test selection, and deploying with feature flags, test automation professionals enable teams to commit frequently while keeping the trunk always deployable.

## Key Takeaways

1. Trunk-based development commits to a single branch frequently
2. Test automation must be fast (< 10 min) and 100% reliable for TBD
3. Targeted test selection keeps CI fast by running only affected tests
4. Feature flags separate deployment from release, enabling incomplete code on trunk
5. Flaky tests are unacceptable — they block the entire team
6. Every commit must keep the trunk deployable
7. Test both feature flag states to prevent regressions when flags toggle
