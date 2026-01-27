# Program Evaluation and Review Technique: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Program Evaluation and Review Technique (PERT) is a project management method that uses probabilistic time estimates to plan and schedule complex projects. For test automation professionals, PERT helps estimate test effort, schedule test phases, and identify critical path activities that determine project timelines.

## What is PERT?

PERT uses three time estimates for each task — optimistic, most likely, and pessimistic — to calculate expected duration and variance. This probabilistic approach produces more realistic schedules than single-point estimates, particularly useful for test automation projects with inherent uncertainty.

### PERT in Context

```
┌─────────────────────────────────────────────────────────────┐
│       Program Evaluation and Review Technique (PERT)        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Three-Point Estimation:                                    │
│  ├── O (Optimistic): Best-case duration                    │
│  ├── M (Most Likely): Most probable duration               │
│  └── P (Pessimistic): Worst-case duration                  │
│                                                             │
│  PERT Expected Time:                                        │
│  E = (O + 4M + P) / 6                                     │
│                                                             │
│  Standard Deviation:                                        │
│  σ = (P - O) / 6                                           │
│                                                             │
│  PERT Network:                                              │
│  ┌───┐     ┌───┐     ┌───┐                                │
│  │ A │────►│ B │────►│ D │────►                            │
│  └───┘     └───┘     └───┘    ┌───┐                       │
│    │                    ▲     │ F │ (End)                   │
│    │       ┌───┐     ┌───┐   └───┘                        │
│    └──────►│ C │────►│ E │────►▲                           │
│            └───┘     └───┘                                 │
│                                                             │
│  Critical Path: A → B → D → F (longest path)              │
│                                                             │
│  Application to Test Automation:                            │
│  ├── Estimate test framework setup time                    │
│  ├── Schedule test development phases                      │
│  ├── Plan environment provisioning                         │
│  ├── Account for test data preparation                     │
│  └── Buffer for debugging flaky tests                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing PERT for Test Projects

```python
# program_evaluation_and_review_technique.py

"""
PERT calculations for test automation project planning.
"""

import pytest
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple


@dataclass
class PERTTask:
    name: str
    optimistic: float    # Best case (days)
    most_likely: float   # Most probable (days)
    pessimistic: float   # Worst case (days)
    dependencies: List[str] = field(default_factory=list)

    @property
    def expected_duration(self) -> float:
        """PERT expected time: (O + 4M + P) / 6"""
        return (self.optimistic + 4 * self.most_likely + self.pessimistic) / 6

    @property
    def variance(self) -> float:
        """Variance: ((P - O) / 6)^2"""
        return ((self.pessimistic - self.optimistic) / 6) ** 2

    @property
    def std_deviation(self) -> float:
        """Standard deviation: (P - O) / 6"""
        return (self.pessimistic - self.optimistic) / 6


class PERTScheduler:
    """Schedule tasks using PERT analysis."""

    def __init__(self):
        self.tasks: Dict[str, PERTTask] = {}

    def add_task(self, task: PERTTask):
        self.tasks[task.name] = task

    def critical_path(self) -> List[str]:
        """Find the critical path (longest path through network)."""
        earliest = {}

        def get_earliest_start(name: str) -> float:
            if name in earliest:
                return earliest[name]
            task = self.tasks[name]
            if not task.dependencies:
                earliest[name] = 0
                return 0
            max_finish = max(
                get_earliest_start(dep) + self.tasks[dep].expected_duration
                for dep in task.dependencies
            )
            earliest[name] = max_finish
            return max_finish

        for name in self.tasks:
            get_earliest_start(name)

        # Find finish times
        finish_times = {
            name: earliest[name] + self.tasks[name].expected_duration
            for name in self.tasks
        }

        # Critical path: trace back from latest finish
        end_tasks = [
            name for name in self.tasks
            if not any(name in t.dependencies for t in self.tasks.values())
        ]

        if not end_tasks:
            return []

        last_task = max(end_tasks, key=lambda n: finish_times[n])

        path = []
        current = last_task
        while current:
            path.append(current)
            task = self.tasks[current]
            if not task.dependencies:
                break
            current = max(
                task.dependencies,
                key=lambda d: finish_times.get(d, 0)
            )

        return list(reversed(path))

    def total_expected_duration(self) -> float:
        """Total expected duration along critical path."""
        path = self.critical_path()
        return sum(self.tasks[name].expected_duration for name in path)

    def total_variance(self) -> float:
        """Total variance along critical path."""
        path = self.critical_path()
        return sum(self.tasks[name].variance for name in path)

    def probability_of_completion(self, target_days: float) -> float:
        """Probability of completing by target date."""
        expected = self.total_expected_duration()
        variance = self.total_variance()
        if variance == 0:
            return 1.0 if target_days >= expected else 0.0

        z = (target_days - expected) / math.sqrt(variance)
        # Approximate CDF of standard normal
        return 0.5 * (1 + math.erf(z / math.sqrt(2)))


# Tests
class TestPERT:
    """Test PERT calculations."""

    def test_expected_duration(self):
        task = PERTTask("Setup", optimistic=2, most_likely=4, pessimistic=10)
        # (2 + 4*4 + 10) / 6 = 28/6 ≈ 4.67
        assert task.expected_duration == pytest.approx(4.67, abs=0.01)

    def test_variance(self):
        task = PERTTask("Setup", optimistic=2, most_likely=4, pessimistic=10)
        # ((10-2)/6)^2 = (8/6)^2 ≈ 1.78
        assert task.variance == pytest.approx(1.78, abs=0.01)

    def test_critical_path(self):
        scheduler = PERTScheduler()
        scheduler.add_task(PERTTask("A", 1, 2, 3))
        scheduler.add_task(PERTTask("B", 2, 4, 6, dependencies=["A"]))
        scheduler.add_task(PERTTask("C", 1, 1, 1, dependencies=["A"]))
        scheduler.add_task(PERTTask("D", 3, 5, 7, dependencies=["B", "C"]))

        path = scheduler.critical_path()
        assert "A" in path
        assert "D" in path

    def test_completion_probability(self):
        scheduler = PERTScheduler()
        scheduler.add_task(PERTTask("Framework Setup", 3, 5, 10))
        scheduler.add_task(PERTTask("Write Tests", 5, 8, 15, dependencies=["Framework Setup"]))
        scheduler.add_task(PERTTask("Execute & Fix", 2, 3, 6, dependencies=["Write Tests"]))

        prob_20 = scheduler.probability_of_completion(20)
        prob_10 = scheduler.probability_of_completion(10)

        assert prob_20 > prob_10  # More time = higher probability
        assert 0 <= prob_20 <= 1

    def test_test_automation_project_estimate(self):
        scheduler = PERTScheduler()
        scheduler.add_task(PERTTask("Environment Setup", 1, 2, 5))
        scheduler.add_task(PERTTask("Framework Selection", 1, 2, 3))
        scheduler.add_task(PERTTask("Test Design", 3, 5, 10, dependencies=["Framework Selection"]))
        scheduler.add_task(PERTTask("Test Development", 5, 8, 15, dependencies=["Environment Setup", "Test Design"]))
        scheduler.add_task(PERTTask("CI Integration", 1, 2, 4, dependencies=["Test Development"]))

        total = scheduler.total_expected_duration()
        assert total > 10  # Reasonable minimum for this project
```

## Best Practices

```markdown
## PERT Best Practices for Test Automation

### Estimation
- [ ] Get three estimates (O, M, P) from experienced testers
- [ ] Include uncertainty for new frameworks or technologies
- [ ] Factor in test data preparation time
- [ ] Account for environment setup and debugging

### Planning
- [ ] Identify critical path activities
- [ ] Add buffer for critical path tasks
- [ ] Track actual vs. estimated durations
- [ ] Update estimates as project progresses

### Communication
- [ ] Present ranges, not single-point estimates
- [ ] Show probability of meeting deadlines
- [ ] Highlight high-variance tasks (risks)
- [ ] Use PERT charts for stakeholder visibility
```

## Conclusion

PERT provides a structured, probabilistic approach to estimating test automation project timelines. By using three-point estimates and critical path analysis, test automation professionals deliver more realistic schedules and communicate uncertainty transparently.

## Key Takeaways

1. PERT uses optimistic, most likely, and pessimistic estimates for each task
2. Expected duration = (O + 4M + P) / 6
3. Critical path determines the minimum project duration
4. Variance quantifies estimation uncertainty
5. Calculate probability of meeting target deadlines
6. High-variance tasks are risks that need attention
7. Track actual vs. estimated to improve future estimates
