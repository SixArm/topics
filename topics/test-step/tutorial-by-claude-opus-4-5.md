# Test Step: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A test step is a single, atomic action within a test case — one instruction that performs an operation and optionally verifies a result. For test automation professionals, well-defined test steps create readable, maintainable, and debuggable test scripts.

## What is a Test Step?

A test step is the smallest unit of a test case. Each step performs one action (click, enter data, call a function) and may include an expected result. Together, a sequence of steps forms a complete test case that validates a specific scenario.

### Test Step in Context

```
┌─────────────────────────────────────────────────────────────┐
│                       Test Step                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Test Case: "User Login"                                    │
│  ┌──────┬──────────────────────┬─────────────────────┐     │
│  │ Step │ Action               │ Expected Result      │     │
│  ├──────┼──────────────────────┼─────────────────────┤     │
│  │  1   │ Navigate to /login   │ Login page displays  │     │
│  │  2   │ Enter username       │ Field populated      │     │
│  │  3   │ Enter password       │ Field populated      │     │
│  │  4   │ Click "Sign In"      │ Dashboard appears    │     │
│  │  5   │ Verify welcome msg   │ "Welcome, User"      │     │
│  └──────┴──────────────────────┴─────────────────────┘     │
│                                                             │
│  Step Components:                                           │
│  ├── Step number (ordering)                                │
│  ├── Action: What to do                                    │
│  ├── Input data: Values to use                             │
│  ├── Expected result: What should happen                   │
│  └── Actual result: What actually happened (at runtime)    │
│                                                             │
│  Step Granularity:                                          │
│  ├── Too coarse: "Test the login feature"                  │
│  │   (not reproducible, unclear)                           │
│  ├── Too fine: "Move cursor to pixel 340,120"              │
│  │   (brittle, over-specified)                             │
│  └── Just right: "Enter 'admin' in username field"         │
│      (clear action, reproducible)                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Test Steps

```python
# test_step.py

"""
Test step modeling for structured test automation.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Optional, Callable, Any
from enum import Enum
from datetime import datetime


class StepStatus(Enum):
    PENDING = "pending"
    PASSED = "passed"
    FAILED = "failed"
    SKIPPED = "skipped"
    BLOCKED = "blocked"


@dataclass
class TestStep:
    """Represents a single step in a test case."""
    number: int
    action: str
    expected_result: str
    input_data: Optional[str] = None
    status: StepStatus = StepStatus.PENDING
    actual_result: str = ""
    duration_ms: float = 0

    def execute(self, action_fn: Callable[[], Any]) -> "TestStep":
        start = datetime.now()
        try:
            result = action_fn()
            self.actual_result = str(result) if result else "Action completed"
            self.status = StepStatus.PASSED
        except AssertionError as e:
            self.actual_result = str(e)
            self.status = StepStatus.FAILED
        except Exception as e:
            self.actual_result = f"Error: {str(e)}"
            self.status = StepStatus.FAILED
        finally:
            self.duration_ms = (datetime.now() - start).total_seconds() * 1000
        return self


@dataclass
class TestCaseRunner:
    """Execute a sequence of test steps."""
    name: str
    steps: List[TestStep] = field(default_factory=list)
    stop_on_failure: bool = True

    def add_step(self, action: str, expected: str, input_data: str = None) -> TestStep:
        step = TestStep(
            number=len(self.steps) + 1,
            action=action,
            expected_result=expected,
            input_data=input_data,
        )
        self.steps.append(step)
        return step

    def run(self, step_actions: List[Callable]) -> dict:
        if len(step_actions) != len(self.steps):
            raise ValueError(f"Expected {len(self.steps)} actions, got {len(step_actions)}")

        for step, action in zip(self.steps, step_actions):
            if self.stop_on_failure and self._has_failure():
                step.status = StepStatus.BLOCKED
                continue
            step.execute(action)

        return self.summary()

    def _has_failure(self) -> bool:
        return any(s.status == StepStatus.FAILED for s in self.steps)

    def summary(self) -> dict:
        return {
            "test_case": self.name,
            "total_steps": len(self.steps),
            "passed": sum(1 for s in self.steps if s.status == StepStatus.PASSED),
            "failed": sum(1 for s in self.steps if s.status == StepStatus.FAILED),
            "blocked": sum(1 for s in self.steps if s.status == StepStatus.BLOCKED),
            "total_duration_ms": sum(s.duration_ms for s in self.steps),
            "all_passed": all(s.status == StepStatus.PASSED for s in self.steps),
            "first_failure": next(
                (s.number for s in self.steps if s.status == StepStatus.FAILED), None
            ),
        }


# Example: applying steps to a real scenario
class Calculator:
    def __init__(self):
        self.result = 0

    def add(self, n):
        self.result += n
        return self.result

    def multiply(self, n):
        self.result *= n
        return self.result

    def reset(self):
        self.result = 0


# Tests
class TestTestStep:

    def test_step_passes(self):
        step = TestStep(1, "Add 5", "Result is 5")
        calc = Calculator()
        step.execute(lambda: calc.add(5))

        assert step.status == StepStatus.PASSED
        assert step.duration_ms >= 0

    def test_step_fails_on_exception(self):
        step = TestStep(1, "Divide by zero", "Error")
        step.execute(lambda: 1 / 0)

        assert step.status == StepStatus.FAILED
        assert "Error" in step.actual_result

    def test_step_fails_on_assertion(self):
        step = TestStep(1, "Check value", "Should be 10")
        step.execute(lambda: (_ for _ in ()).throw(AssertionError("Expected 10, got 5")))

        assert step.status == StepStatus.FAILED

    def test_case_runner_all_pass(self):
        runner = TestCaseRunner(name="Calculator Test")
        runner.add_step("Initialize calculator", "Calculator ready")
        runner.add_step("Add 5", "Result is 5")
        runner.add_step("Add 3", "Result is 8")

        calc = Calculator()
        result = runner.run([
            lambda: calc.reset(),
            lambda: calc.add(5),
            lambda: calc.add(3),
        ])

        assert result["all_passed"]
        assert result["passed"] == 3

    def test_case_runner_stops_on_failure(self):
        runner = TestCaseRunner(name="Failing Test", stop_on_failure=True)
        runner.add_step("Step 1", "Pass")
        runner.add_step("Step 2", "Fail")
        runner.add_step("Step 3", "Blocked")

        result = runner.run([
            lambda: True,
            lambda: (_ for _ in ()).throw(Exception("Failure")),
            lambda: True,
        ])

        assert result["failed"] == 1
        assert result["blocked"] == 1
        assert result["first_failure"] == 2

    def test_case_runner_summary(self):
        runner = TestCaseRunner(name="Summary Test")
        runner.add_step("Action A", "Result A")
        runner.add_step("Action B", "Result B")

        result = runner.run([lambda: "ok", lambda: "ok"])
        assert result["test_case"] == "Summary Test"
        assert result["total_steps"] == 2
```

## Best Practices

```markdown
## Writing Effective Test Steps

### Granularity
- [ ] Each step performs exactly one action
- [ ] Steps are specific enough to reproduce
- [ ] Steps are abstract enough to survive UI changes
- [ ] Expected results are verifiable and unambiguous

### Sequencing
- [ ] Steps follow a logical user flow
- [ ] Each step builds on the previous state
- [ ] Decide whether to stop or continue on failure
- [ ] Mark downstream steps as blocked when a step fails

### Maintenance
- [ ] Use reusable step libraries for common actions
- [ ] Update steps when requirements change
- [ ] Review step granularity during test reviews
- [ ] Remove redundant or duplicate steps
```

## Conclusion

Test steps are the atomic building blocks of test cases. By defining clear actions, expected results, and proper sequencing, test automation professionals create tests that are reproducible, debuggable, and maintainable. When a test fails, well-defined steps pinpoint exactly where and why.

## Key Takeaways

1. A test step is a single action with an expected result
2. Steps should be atomic — one action per step
3. The right granularity balances clarity with resilience to change
4. Step runners can stop on failure or continue, blocking downstream steps
5. Each step records status, duration, and actual results for debugging
6. Reusable step libraries reduce duplication across test cases
7. Well-defined steps make test failures immediately diagnosable
