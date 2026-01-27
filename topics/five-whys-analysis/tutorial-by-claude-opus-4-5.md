# Five Whys Analysis: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Five Whys Analysis is a root cause analysis technique that involves asking "Why?" iteratively (typically five times) to drill past symptoms and identify the fundamental cause of a problem. For test automation professionals, Five Whys helps diagnose test failures, flaky tests, and process breakdowns systematically rather than applying superficial fixes.

## What is Five Whys Analysis?

Five Whys is a simple but powerful technique originated by Sakichi Toyoda and used within Toyota's manufacturing process. By repeatedly asking "Why?" about a problem, you peel back layers of symptoms to reach the root cause. The number five is a guideline — some problems need fewer or more iterations.

### Five Whys in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Five Whys Analysis                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Problem: Tests fail intermittently in CI pipeline          │
│                                                             │
│  Why #1: The login test times out                           │
│  Why #2: The auth API responds slowly in CI                 │
│  Why #3: The CI database has high latency                   │
│  Why #4: CI and DB are in different availability zones      │
│  Why #5: Infrastructure was provisioned without             │
│          considering test environment proximity              │
│                                                             │
│  Root Cause: Infrastructure provisioning process doesn't    │
│  account for test environment topology                      │
│                                                             │
│  Visualization:                                             │
│  ┌─────────────────────┐                                   │
│  │ Symptom (What)      │                                   │
│  │ Tests fail in CI    │                                   │
│  └────────┬────────────┘                                   │
│           │ Why?                                            │
│  ┌────────▼────────────┐                                   │
│  │ Login test timeout  │                                   │
│  └────────┬────────────┘                                   │
│           │ Why?                                            │
│  ┌────────▼────────────┐                                   │
│  │ Auth API slow       │                                   │
│  └────────┬────────────┘                                   │
│           │ Why?                                            │
│  ┌────────▼────────────┐                                   │
│  │ DB high latency     │                                   │
│  └────────┬────────────┘                                   │
│           │ Why?                                            │
│  ┌────────▼────────────┐                                   │
│  │ Cross-AZ networking │                                   │
│  └────────┬────────────┘                                   │
│           │ Why?                                            │
│  ┌────────▼────────────┐                                   │
│  │ Root Cause:         │                                   │
│  │ No topology check   │                                   │
│  │ in provisioning     │                                   │
│  └─────────────────────┘                                   │
│                                                             │
│  Key Principles:                                            │
│  ├── Ask "Why?" until you reach a systemic cause           │
│  ├── Focus on processes, not people                        │
│  ├── Distinguish symptoms from causes                      │
│  ├── Look for preventable root causes                      │
│  └── Fix the root cause, not just symptoms                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Five Whys for Test Automation

```python
# five_whys_analysis.py

"""
Five Whys analysis framework for test automation incidents.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Optional, Dict
from datetime import datetime
from enum import Enum


class CauseCategory(Enum):
    ENVIRONMENT = "environment"
    TEST_CODE = "test_code"
    PRODUCT_CODE = "product_code"
    INFRASTRUCTURE = "infrastructure"
    PROCESS = "process"
    DATA = "data"
    DEPENDENCY = "dependency"


@dataclass
class WhyStep:
    question: str
    answer: str
    evidence: str = ""
    depth: int = 0


@dataclass
class FiveWhysAnalysis:
    problem: str
    date: datetime = field(default_factory=datetime.now)
    steps: List[WhyStep] = field(default_factory=list)
    root_cause: Optional[str] = None
    category: Optional[CauseCategory] = None
    corrective_action: Optional[str] = None
    preventive_action: Optional[str] = None

    def add_why(self, question: str, answer: str, evidence: str = ""):
        self.steps.append(WhyStep(
            question=question,
            answer=answer,
            evidence=evidence,
            depth=len(self.steps) + 1
        ))

    def set_root_cause(
        self,
        cause: str,
        category: CauseCategory,
        corrective: str,
        preventive: str
    ):
        self.root_cause = cause
        self.category = category
        self.corrective_action = corrective
        self.preventive_action = preventive

    def generate_report(self) -> str:
        lines = [
            f"Five Whys Analysis Report",
            f"========================",
            f"Problem: {self.problem}",
            f"Date: {self.date.strftime('%Y-%m-%d')}",
            ""
        ]

        for step in self.steps:
            lines.append(f"Why #{step.depth}: {step.question}")
            lines.append(f"  Answer: {step.answer}")
            if step.evidence:
                lines.append(f"  Evidence: {step.evidence}")
            lines.append("")

        if self.root_cause:
            lines.extend([
                f"Root Cause: {self.root_cause}",
                f"Category: {self.category.value if self.category else 'N/A'}",
                f"Corrective Action: {self.corrective_action}",
                f"Preventive Action: {self.preventive_action}",
            ])

        return "\n".join(lines)

    @property
    def depth(self) -> int:
        return len(self.steps)

    @property
    def is_complete(self) -> bool:
        return self.root_cause is not None


class FiveWhysTracker:
    """Track Five Whys analyses for pattern detection."""

    def __init__(self):
        self.analyses: List[FiveWhysAnalysis] = []

    def add(self, analysis: FiveWhysAnalysis):
        self.analyses.append(analysis)

    def root_causes_by_category(self) -> Dict[str, int]:
        from collections import Counter
        categories = [
            a.category.value for a in self.analyses
            if a.category is not None
        ]
        return dict(Counter(categories))

    def recurring_root_causes(self) -> Dict[str, int]:
        from collections import Counter
        causes = [
            a.root_cause for a in self.analyses
            if a.root_cause is not None
        ]
        return dict(Counter(causes).most_common(10))


# Tests
class TestFiveWhysAnalysis:
    """Test the Five Whys analysis framework."""

    def test_flaky_test_analysis(self):
        """Analyze a flaky test using Five Whys."""
        analysis = FiveWhysAnalysis(
            problem="Login E2E test fails 20% of the time in CI"
        )

        analysis.add_why(
            "Why does the login test fail intermittently?",
            "The test times out waiting for the dashboard to load",
            "Test logs show 5-second timeout exceeded"
        )
        analysis.add_why(
            "Why does the dashboard take too long to load?",
            "The user profile API call is slow in CI",
            "API response time: 3-8 seconds in CI vs 200ms locally"
        )
        analysis.add_why(
            "Why is the API slow in CI?",
            "The CI database is under-provisioned",
            "DB CPU at 95% during test runs"
        )
        analysis.add_why(
            "Why is the CI database under-provisioned?",
            "Test environment resources were never scaled with test growth",
            "Same DB instance size since project start, 10x more tests now"
        )
        analysis.add_why(
            "Why aren't test environment resources reviewed?",
            "No process for reviewing test infrastructure capacity",
            "No runbook or schedule for capacity planning"
        )

        analysis.set_root_cause(
            cause="No capacity planning process for test infrastructure",
            category=CauseCategory.PROCESS,
            corrective="Scale CI database to match test workload",
            preventive="Add quarterly test infrastructure capacity review"
        )

        assert analysis.is_complete
        assert analysis.depth == 5
        assert analysis.category == CauseCategory.PROCESS

    def test_root_cause_tracking(self):
        """Track recurring root causes across analyses."""
        tracker = FiveWhysTracker()

        for _ in range(3):
            a = FiveWhysAnalysis(problem="Test failure")
            a.set_root_cause(
                "Shared test data", CauseCategory.DATA,
                "Isolate data", "Use unique data per test"
            )
            tracker.add(a)

        a = FiveWhysAnalysis(problem="Timeout")
        a.set_root_cause(
            "Slow CI", CauseCategory.INFRASTRUCTURE,
            "Scale CI", "Monitor CI performance"
        )
        tracker.add(a)

        by_category = tracker.root_causes_by_category()
        assert by_category["data"] == 3
        assert by_category["infrastructure"] == 1

    def test_report_generation(self):
        """Test report generation."""
        analysis = FiveWhysAnalysis(problem="Build fails on Monday mornings")
        analysis.add_why("Why?", "Expired tokens")
        analysis.set_root_cause(
            "Token refresh not automated",
            CauseCategory.PROCESS,
            "Automate token refresh",
            "Add token health check to CI"
        )

        report = analysis.generate_report()
        assert "Build fails on Monday mornings" in report
        assert "Expired tokens" in report
        assert "Token refresh not automated" in report
```

## Best Practices

```markdown
## Five Whys Best Practices

### Conducting Analysis
- [ ] Start with a clear, specific problem statement
- [ ] Focus on processes and systems, not people
- [ ] Support each answer with evidence (logs, data, metrics)
- [ ] Don't stop at the first plausible answer
- [ ] Involve team members who understand the systems

### Quality Checks
- [ ] Each "why" follows logically from the previous answer
- [ ] Root cause is actionable and preventable
- [ ] Corrective action addresses the immediate problem
- [ ] Preventive action prevents recurrence
- [ ] Analysis is documented and shared

### Tracking Patterns
- [ ] Record all Five Whys analyses
- [ ] Categorize root causes
- [ ] Identify recurring themes
- [ ] Prioritize systemic improvements
- [ ] Review effectiveness of corrective actions
```

## Conclusion

Five Whys Analysis is a practical, lightweight technique for finding root causes of test automation problems. By systematically asking "Why?" and following the evidence, teams move beyond symptom-fixing to address the underlying process, infrastructure, or design issues that cause recurring problems.

## Key Takeaways

1. Five Whys drills past symptoms to find actionable root causes
2. Focus on systems and processes, not people
3. Support each answer with evidence from logs, metrics, or data
4. Define both corrective and preventive actions
5. Track root cause categories to identify systemic patterns
6. The number five is a guideline — stop when you reach a preventable cause
7. Share analyses across the team to build collective understanding
