# Test Suite: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A test suite is a collection of test cases organized to validate a specific feature, module, or system. For test automation professionals, well-organized test suites enable selective execution, parallel running, and clear reporting of test results.

## What is a Test Suite?

A test suite groups related test cases that share a common purpose — testing a feature, validating a release, or covering a risk area. Suites can be nested (suites within suites), tagged for selective execution, and run in different configurations.

### Test Suite in Context

```
┌─────────────────────────────────────────────────────────────┐
│                      Test Suite                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Suite Organization:                                        │
│                                                             │
│  Full Regression Suite                                      │
│  ├── Authentication Suite                                  │
│  │   ├── Login Tests (5 cases)                             │
│  │   ├── Logout Tests (3 cases)                            │
│  │   └── Password Reset Tests (4 cases)                    │
│  ├── Checkout Suite                                        │
│  │   ├── Cart Tests (8 cases)                              │
│  │   ├── Payment Tests (6 cases)                           │
│  │   └── Order Confirmation Tests (3 cases)                │
│  ├── Search Suite                                          │
│  │   ├── Basic Search Tests (5 cases)                      │
│  │   └── Advanced Filter Tests (7 cases)                   │
│  └── Performance Suite                                     │
│      ├── Load Tests (3 cases)                              │
│      └── Response Time Tests (4 cases)                     │
│                                                             │
│  Execution Strategies:                                      │
│  ├── Full: Run all suites (nightly/weekly)                 │
│  ├── Smoke: Run critical subset (every deploy)             │
│  ├── Targeted: Run specific suite (feature testing)        │
│  ├── Parallel: Run independent suites simultaneously       │
│  └── Priority: Run P1 first, then P2, then P3             │
│                                                             │
│  Suite Metrics:                                             │
│  ├── Pass rate per suite                                   │
│  ├── Duration per suite                                    │
│  ├── Flakiness rate per suite                              │
│  └── Coverage per suite                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Test Suites

```python
# test_suite.py

"""
Test suite organization and management.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Set
from enum import Enum
from datetime import datetime


class SuiteType(Enum):
    SMOKE = "smoke"
    REGRESSION = "regression"
    INTEGRATION = "integration"
    PERFORMANCE = "performance"
    SECURITY = "security"


class TestResult(Enum):
    PASSED = "passed"
    FAILED = "failed"
    SKIPPED = "skipped"
    ERROR = "error"


@dataclass
class TestCase:
    name: str
    tags: Set[str] = field(default_factory=set)
    priority: int = 3  # 1=highest
    duration_ms: float = 0
    result: TestResult = TestResult.SKIPPED

    def run(self, action) -> "TestCase":
        start = datetime.now()
        try:
            action()
            self.result = TestResult.PASSED
        except AssertionError:
            self.result = TestResult.FAILED
        except Exception:
            self.result = TestResult.ERROR
        self.duration_ms = (datetime.now() - start).total_seconds() * 1000
        return self


@dataclass
class TestSuite:
    name: str
    suite_type: SuiteType = SuiteType.REGRESSION
    tests: List[TestCase] = field(default_factory=list)
    sub_suites: List["TestSuite"] = field(default_factory=list)

    def add_test(self, name: str, tags: Set[str] = None, priority: int = 3) -> TestCase:
        test = TestCase(name=name, tags=tags or set(), priority=priority)
        self.tests.append(test)
        return test

    def add_sub_suite(self, suite: "TestSuite"):
        self.sub_suites.append(suite)

    def all_tests(self) -> List[TestCase]:
        tests = list(self.tests)
        for sub in self.sub_suites:
            tests.extend(sub.all_tests())
        return tests

    def filter_by_tag(self, tag: str) -> List[TestCase]:
        return [t for t in self.all_tests() if tag in t.tags]

    def filter_by_priority(self, max_priority: int) -> List[TestCase]:
        return [t for t in self.all_tests() if t.priority <= max_priority]

    def report(self) -> Dict:
        all_tests = self.all_tests()
        if not all_tests:
            return {"suite": self.name, "total": 0, "pass_rate": 0}

        passed = sum(1 for t in all_tests if t.result == TestResult.PASSED)
        failed = sum(1 for t in all_tests if t.result == TestResult.FAILED)
        errors = sum(1 for t in all_tests if t.result == TestResult.ERROR)
        skipped = sum(1 for t in all_tests if t.result == TestResult.SKIPPED)

        return {
            "suite": self.name,
            "type": self.suite_type.value,
            "total": len(all_tests),
            "passed": passed,
            "failed": failed,
            "errors": errors,
            "skipped": skipped,
            "pass_rate": passed / len(all_tests) * 100,
            "total_duration_ms": sum(t.duration_ms for t in all_tests),
            "failed_tests": [t.name for t in all_tests if t.result == TestResult.FAILED],
        }


class SuiteRunner:
    """Execute suites with configurable strategies."""

    def __init__(self, suite: TestSuite):
        self.suite = suite

    def run_smoke(self) -> Dict:
        """Run only P1 priority tests."""
        tests = self.suite.filter_by_priority(1)
        for test in tests:
            test.run(lambda: None)  # Simulated pass
        return self.suite.report()

    def run_by_tag(self, tag: str) -> Dict:
        """Run tests matching a specific tag."""
        tests = self.suite.filter_by_tag(tag)
        for test in tests:
            test.run(lambda: None)
        return self.suite.report()

    def run_all(self, actions: Dict[str, callable] = None) -> Dict:
        """Run all tests with optional custom actions."""
        actions = actions or {}
        for test in self.suite.all_tests():
            action = actions.get(test.name, lambda: None)
            test.run(action)
        return self.suite.report()


# Tests
class TestTestSuite:

    @pytest.fixture
    def suite(self):
        root = TestSuite("Regression", SuiteType.REGRESSION)

        auth = TestSuite("Authentication", SuiteType.REGRESSION)
        auth.add_test("Login with valid credentials", {"smoke", "auth"}, priority=1)
        auth.add_test("Login with invalid password", {"auth"}, priority=2)
        auth.add_test("Password reset flow", {"auth"}, priority=3)

        checkout = TestSuite("Checkout", SuiteType.REGRESSION)
        checkout.add_test("Add item to cart", {"smoke", "checkout"}, priority=1)
        checkout.add_test("Apply discount code", {"checkout"}, priority=2)
        checkout.add_test("Complete purchase", {"smoke", "checkout"}, priority=1)

        root.add_sub_suite(auth)
        root.add_sub_suite(checkout)
        return root

    def test_counts_all_tests(self, suite):
        assert len(suite.all_tests()) == 6

    def test_filter_by_tag(self, suite):
        smoke = suite.filter_by_tag("smoke")
        assert len(smoke) == 3
        assert all("smoke" in t.tags for t in smoke)

    def test_filter_by_priority(self, suite):
        p1 = suite.filter_by_priority(1)
        assert len(p1) == 3
        assert all(t.priority == 1 for t in p1)

    def test_suite_report(self, suite):
        # Run all tests as passing
        for test in suite.all_tests():
            test.run(lambda: None)

        report = suite.report()
        assert report["total"] == 6
        assert report["passed"] == 6
        assert report["pass_rate"] == 100

    def test_report_with_failures(self, suite):
        tests = suite.all_tests()
        tests[0].run(lambda: None)  # Pass
        tests[1].run(lambda: (_ for _ in ()).throw(AssertionError()))  # Fail

        report = suite.report()
        assert report["passed"] >= 1
        assert report["failed"] >= 1

    def test_smoke_run(self, suite):
        runner = SuiteRunner(suite)
        report = runner.run_smoke()
        # Only P1 tests ran
        executed = report["passed"] + report["failed"] + report["errors"]
        assert executed == 3
```

## Best Practices

```markdown
## Organizing Test Suites

### Structure
- [ ] Group tests by feature or module
- [ ] Use nested suites for logical hierarchy
- [ ] Tag tests for flexible selection (smoke, regression, security)
- [ ] Assign priority levels for tiered execution

### Execution
- [ ] Run smoke suites on every deployment
- [ ] Run full regression nightly or before releases
- [ ] Enable parallel execution for independent suites
- [ ] Order by priority when time is constrained

### Maintenance
- [ ] Review suite composition regularly
- [ ] Remove obsolete tests from suites
- [ ] Track pass rate and duration trends per suite
- [ ] Balance suite size for meaningful reporting
```

## Conclusion

Test suites provide the organizational structure for test automation. By grouping tests logically, tagging for selective execution, and tracking metrics per suite, test automation professionals manage large test portfolios efficiently and run the right tests at the right time.

## Key Takeaways

1. A test suite groups related test cases for organized execution and reporting
2. Suites can be nested to create hierarchical test organizations
3. Tags enable flexible, cross-cutting test selection (smoke, regression, security)
4. Priority-based execution ensures critical tests run first
5. Smoke suites run on every deploy; full regression runs less frequently
6. Suite-level metrics (pass rate, duration, flakiness) guide maintenance priorities
7. Well-organized suites make it easy to run the right tests at the right time
