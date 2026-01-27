# Usability Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Usability testing evaluates how easily real users can accomplish tasks with a product. For test automation professionals, automating usability-related checks — task completion rates, error recovery, navigation efficiency, and accessibility — complements traditional user studies with continuous, repeatable validation.

## What is Usability Testing?

Usability testing measures whether users can achieve their goals effectively, efficiently, and with satisfaction. While traditionally manual (observing users), many usability aspects can be automated: navigation path analysis, error handling quality, form completion rates, and accessibility compliance.

### Usability Testing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                  Usability Testing                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Usability Dimensions (ISO 9241):                           │
│  ├── Effectiveness: Can users complete the task?           │
│  ├── Efficiency: How quickly and with how few steps?       │
│  └── Satisfaction: How pleasant is the experience?         │
│                                                             │
│  Automatable Usability Metrics:                             │
│  ├── Task completion rate (can the flow be completed?)     │
│  ├── Step count (how many clicks to achieve goal?)         │
│  ├── Error rate (how often do users hit errors?)           │
│  ├── Error recovery (can users recover from mistakes?)     │
│  ├── Form abandonment (do users complete forms?)           │
│  ├── Navigation depth (how deep to find features?)         │
│  └── Accessibility compliance (WCAG standards)             │
│                                                             │
│  Manual vs Automated:                                       │
│  ├── Manual: User observation, think-aloud, interviews     │
│  │   (qualitative — why users struggle)                    │
│  └── Automated: Metrics, compliance, flow validation       │
│      (quantitative — what is broken or hard)               │
│                                                             │
│  Heuristic Evaluation (Nielsen's Heuristics):               │
│  ├── Visibility of system status                           │
│  ├── Match between system and real world                   │
│  ├── User control and freedom (undo, back)                 │
│  ├── Consistency and standards                             │
│  ├── Error prevention                                      │
│  ├── Recognition rather than recall                        │
│  ├── Flexibility and efficiency of use                     │
│  ├── Aesthetic and minimalist design                       │
│  ├── Help users recognize and recover from errors          │
│  └── Help and documentation                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Automating Usability Checks

```python
# usability_testing.py

"""
Automated usability testing patterns.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Optional


@dataclass
class UserAction:
    action_type: str  # click, type, navigate, scroll, error
    target: str
    timestamp_ms: float


@dataclass
class TaskAttempt:
    task_name: str
    actions: List[UserAction] = field(default_factory=list)
    completed: bool = False
    errors_encountered: int = 0
    recovered_from_errors: int = 0

    @property
    def step_count(self) -> int:
        return len(self.actions)

    @property
    def error_rate(self) -> float:
        return self.errors_encountered / self.step_count if self.step_count > 0 else 0

    @property
    def error_recovery_rate(self) -> float:
        return (
            self.recovered_from_errors / self.errors_encountered
            if self.errors_encountered > 0 else 1.0
        )

    @property
    def duration_ms(self) -> float:
        if len(self.actions) < 2:
            return 0
        return self.actions[-1].timestamp_ms - self.actions[0].timestamp_ms


class UsabilityAnalyzer:
    """Analyze usability metrics from task attempts."""

    def __init__(self, optimal_steps: Dict[str, int] = None):
        self.optimal_steps = optimal_steps or {}
        self.attempts: List[TaskAttempt] = []

    def add_attempt(self, attempt: TaskAttempt):
        self.attempts.append(attempt)

    def task_completion_rate(self, task_name: str) -> float:
        task_attempts = [a for a in self.attempts if a.task_name == task_name]
        if not task_attempts:
            return 0
        return sum(1 for a in task_attempts if a.completed) / len(task_attempts) * 100

    def step_efficiency(self, task_name: str) -> Dict:
        optimal = self.optimal_steps.get(task_name, 0)
        task_attempts = [a for a in self.attempts if a.task_name == task_name and a.completed]

        if not task_attempts:
            return {"optimal": optimal, "average_actual": 0, "efficiency": 0}

        avg_steps = sum(a.step_count for a in task_attempts) / len(task_attempts)

        return {
            "optimal": optimal,
            "average_actual": round(avg_steps, 1),
            "efficiency": round(optimal / avg_steps * 100, 1) if avg_steps > 0 else 0,
            "extra_steps": round(avg_steps - optimal, 1),
        }

    def error_analysis(self, task_name: str) -> Dict:
        task_attempts = [a for a in self.attempts if a.task_name == task_name]

        if not task_attempts:
            return {"error_rate": 0, "recovery_rate": 0}

        avg_error_rate = sum(a.error_rate for a in task_attempts) / len(task_attempts)
        avg_recovery = sum(a.error_recovery_rate for a in task_attempts) / len(task_attempts)

        return {
            "average_error_rate": round(avg_error_rate, 3),
            "average_recovery_rate": round(avg_recovery * 100, 1),
            "users_with_errors": sum(1 for a in task_attempts if a.errors_encountered > 0),
            "total_attempts": len(task_attempts),
        }

    def usability_score(self, task_name: str) -> Dict:
        completion = self.task_completion_rate(task_name)
        efficiency = self.step_efficiency(task_name).get("efficiency", 0)
        error_info = self.error_analysis(task_name)

        # Weighted usability score
        score = (
            completion * 0.4
            + efficiency * 0.3
            + error_info["average_recovery_rate"] * 0.3
        )

        return {
            "task": task_name,
            "score": round(score, 1),
            "completion_rate": completion,
            "efficiency": efficiency,
            "error_recovery": error_info["average_recovery_rate"],
            "rating": "excellent" if score > 85 else "good" if score > 70 else "needs_work" if score > 50 else "poor",
        }


# Tests
class TestUsabilityTesting:

    @pytest.fixture
    def analyzer(self):
        analyzer = UsabilityAnalyzer(optimal_steps={"checkout": 4, "registration": 3})

        # Successful attempt with extra steps
        attempt1 = TaskAttempt("checkout", completed=True, errors_encountered=0)
        attempt1.actions = [
            UserAction("click", "cart", 0),
            UserAction("click", "checkout", 1000),
            UserAction("type", "address", 3000),
            UserAction("click", "back", 5000),  # Extra step
            UserAction("type", "address", 6000),
            UserAction("click", "pay", 8000),
        ]

        # Successful attempt, optimal path
        attempt2 = TaskAttempt("checkout", completed=True, errors_encountered=0)
        attempt2.actions = [
            UserAction("click", "cart", 0),
            UserAction("click", "checkout", 1000),
            UserAction("type", "address", 3000),
            UserAction("click", "pay", 5000),
        ]

        # Failed attempt
        attempt3 = TaskAttempt("checkout", completed=False, errors_encountered=2, recovered_from_errors=1)
        attempt3.actions = [
            UserAction("click", "cart", 0),
            UserAction("error", "payment", 2000),
            UserAction("error", "payment", 3000),
        ]

        analyzer.add_attempt(attempt1)
        analyzer.add_attempt(attempt2)
        analyzer.add_attempt(attempt3)
        return analyzer

    def test_task_completion_rate(self, analyzer):
        rate = analyzer.task_completion_rate("checkout")
        assert rate == pytest.approx(66.7, abs=0.1)  # 2/3

    def test_step_efficiency(self, analyzer):
        efficiency = analyzer.step_efficiency("checkout")
        assert efficiency["optimal"] == 4
        assert efficiency["average_actual"] == 5.0  # (6+4)/2
        assert efficiency["efficiency"] == 80.0

    def test_error_analysis(self, analyzer):
        errors = analyzer.error_analysis("checkout")
        assert errors["users_with_errors"] == 1
        assert errors["total_attempts"] == 3

    def test_usability_score(self, analyzer):
        score = analyzer.usability_score("checkout")
        assert score["score"] > 0
        assert score["rating"] in ("excellent", "good", "needs_work", "poor")

    def test_no_attempts(self):
        analyzer = UsabilityAnalyzer()
        assert analyzer.task_completion_rate("any") == 0

    def test_perfect_usability(self):
        analyzer = UsabilityAnalyzer(optimal_steps={"login": 2})
        attempt = TaskAttempt("login", completed=True)
        attempt.actions = [
            UserAction("type", "credentials", 0),
            UserAction("click", "submit", 1000),
        ]
        analyzer.add_attempt(attempt)

        score = analyzer.usability_score("login")
        assert score["completion_rate"] == 100
        assert score["efficiency"] == 100
        assert score["rating"] == "excellent"
```

## Best Practices

```markdown
## Usability Testing Practices

### Automated Checks
- [ ] Measure task completion rates for critical flows
- [ ] Track step counts vs optimal paths
- [ ] Monitor error rates and recovery success
- [ ] Validate that error messages are actionable

### Heuristic Validation
- [ ] Check for system status feedback (loading, success, error states)
- [ ] Verify undo and back functionality works
- [ ] Ensure consistent patterns across similar features
- [ ] Validate that help and documentation is accessible

### Continuous Monitoring
- [ ] Track usability scores across releases
- [ ] Alert when completion rates drop
- [ ] Compare new designs against previous baselines
- [ ] Include usability metrics in release quality reports
```

## Conclusion

Usability testing ensures software is effective, efficient, and satisfying for users. While manual observation provides qualitative insights, automated usability checks — task completion, step efficiency, error recovery — provide continuous quantitative monitoring that catches usability regressions early.

## Key Takeaways

1. Usability measures effectiveness, efficiency, and user satisfaction
2. Many usability aspects can be automated: completion rates, step counts, error recovery
3. Compare actual user paths against optimal paths to measure efficiency
4. Error recovery rate shows whether users can recover from mistakes
5. Weighted usability scores combine completion, efficiency, and error recovery
6. Automated usability checks complement manual user studies
7. Track usability metrics across releases to catch regressions
