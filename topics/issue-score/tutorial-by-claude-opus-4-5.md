# Issue Score: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Issue scoring is a systematic method of evaluating and prioritizing software issues based on multiple factors such as severity, impact, likelihood, and business value. For test automation professionals, issue scoring helps focus testing efforts on the most critical areas and prioritize bug fixes effectively.

## What is Issue Scoring?

Issue scoring assigns numerical values to bugs, defects, and issues based on predefined criteria. This quantitative approach replaces subjective prioritization with data-driven decision making, ensuring the most impactful issues receive attention first.

### Issue Scoring Framework

```
┌─────────────────────────────────────────────────────────────┐
│                    Issue Scoring Model                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Score = Severity × Impact × Likelihood × Business Value    │
│                                                             │
│  Severity (1-5):                                            │
│  ├── 5: System crash / data loss                            │
│  ├── 4: Major feature broken                                │
│  ├── 3: Feature partially broken                            │
│  ├── 2: Minor functionality issue                           │
│  └── 1: Cosmetic issue                                      │
│                                                             │
│  Impact (1-5):                                              │
│  ├── 5: All users affected                                  │
│  ├── 4: Most users affected                                 │
│  ├── 3: Many users affected                                 │
│  ├── 2: Some users affected                                 │
│  └── 1: Few users affected                                  │
│                                                             │
│  Likelihood (1-5):                                          │
│  ├── 5: Always occurs                                       │
│  ├── 4: Usually occurs                                      │
│  ├── 3: Sometimes occurs                                    │
│  ├── 2: Rarely occurs                                       │
│  └── 1: Very rarely occurs                                  │
│                                                             │
│  Business Value (1-5):                                      │
│  ├── 5: Revenue-critical feature                            │
│  ├── 4: Core business function                              │
│  ├── 3: Important feature                                   │
│  ├── 2: Nice-to-have feature                                │
│  └── 1: Low-priority feature                                │
│                                                             │
│  Priority Matrix:                                           │
│  Score 75-125: Critical (fix immediately)                   │
│  Score 40-74:  High (fix in current sprint)                 │
│  Score 15-39:  Medium (fix in next sprint)                  │
│  Score 1-14:   Low (backlog)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Issue Scoring

### Python Implementation

```python
# issue_scoring.py

from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum
from datetime import datetime, timedelta
import statistics

class Severity(Enum):
    COSMETIC = 1
    MINOR = 2
    MODERATE = 3
    MAJOR = 4
    CRITICAL = 5

class Impact(Enum):
    FEW_USERS = 1
    SOME_USERS = 2
    MANY_USERS = 3
    MOST_USERS = 4
    ALL_USERS = 5

class Likelihood(Enum):
    VERY_RARE = 1
    RARE = 2
    SOMETIMES = 3
    USUALLY = 4
    ALWAYS = 5

class BusinessValue(Enum):
    LOW = 1
    NICE_TO_HAVE = 2
    IMPORTANT = 3
    CORE = 4
    REVENUE_CRITICAL = 5

class Priority(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class Issue:
    id: str
    title: str
    description: str
    severity: Severity
    impact: Impact
    likelihood: Likelihood
    business_value: BusinessValue
    created_at: datetime = field(default_factory=datetime.now)
    resolved_at: Optional[datetime] = None
    assignee: Optional[str] = None
    tags: List[str] = field(default_factory=list)

    @property
    def score(self) -> int:
        """Calculate issue score."""
        return (
            self.severity.value *
            self.impact.value *
            self.likelihood.value *
            self.business_value.value
        )

    @property
    def priority(self) -> Priority:
        """Determine priority from score."""
        score = self.score
        if score >= 75:
            return Priority.CRITICAL
        elif score >= 40:
            return Priority.HIGH
        elif score >= 15:
            return Priority.MEDIUM
        else:
            return Priority.LOW

    @property
    def is_resolved(self) -> bool:
        return self.resolved_at is not None

    @property
    def age_days(self) -> int:
        end = self.resolved_at or datetime.now()
        return (end - self.created_at).days


class IssueScorer:
    """Score and prioritize issues."""

    def __init__(self):
        self.issues: List[Issue] = []

    def add_issue(self, issue: Issue):
        """Add an issue for scoring."""
        self.issues.append(issue)

    def get_prioritized_issues(self) -> List[Issue]:
        """Get all issues sorted by score (highest first)."""
        return sorted(self.issues, key=lambda i: i.score, reverse=True)

    def get_issues_by_priority(self, priority: Priority) -> List[Issue]:
        """Get issues filtered by priority level."""
        return [i for i in self.issues if i.priority == priority]

    def get_unresolved(self) -> List[Issue]:
        """Get all unresolved issues sorted by score."""
        unresolved = [i for i in self.issues if not i.is_resolved]
        return sorted(unresolved, key=lambda i: i.score, reverse=True)

    def calculate_metrics(self) -> Dict:
        """Calculate issue scoring metrics."""
        if not self.issues:
            return {}

        scores = [i.score for i in self.issues]
        unresolved = [i for i in self.issues if not i.is_resolved]
        resolved = [i for i in self.issues if i.is_resolved]

        priority_dist = {}
        for p in Priority:
            count = len([i for i in self.issues if i.priority == p])
            priority_dist[p.value] = count

        resolution_times = [i.age_days for i in resolved]

        return {
            'total_issues': len(self.issues),
            'unresolved': len(unresolved),
            'resolved': len(resolved),
            'avg_score': statistics.mean(scores),
            'max_score': max(scores),
            'priority_distribution': priority_dist,
            'avg_resolution_days': (
                statistics.mean(resolution_times) if resolution_times else None
            ),
            'critical_unresolved': len([
                i for i in unresolved if i.priority == Priority.CRITICAL
            ])
        }

    def generate_report(self) -> str:
        """Generate a prioritized issue report."""
        metrics = self.calculate_metrics()
        lines = [
            "Issue Scoring Report",
            "=" * 50,
            f"Total Issues: {metrics['total_issues']}",
            f"Unresolved: {metrics['unresolved']}",
            f"Average Score: {metrics['avg_score']:.1f}",
            f"Critical Unresolved: {metrics['critical_unresolved']}",
            "",
            "Priority Distribution:",
        ]

        for priority, count in metrics['priority_distribution'].items():
            lines.append(f"  {priority}: {count}")

        lines.extend(["", "Top Issues:"])
        for issue in self.get_prioritized_issues()[:10]:
            status = "✓" if issue.is_resolved else "✗"
            lines.append(
                f"  {status} [{issue.score:3d}] {issue.priority.value:8s} "
                f"| {issue.title}"
            )

        return "\n".join(lines)


# Testing issue scoring
import pytest

class TestIssueScoring:
    """Test issue scoring system."""

    @pytest.fixture
    def scorer(self):
        return IssueScorer()

    def test_critical_issue_highest_score(self):
        """Critical severity, all users, always occurs = highest score."""
        issue = Issue(
            id="1",
            title="System crash on login",
            description="All users experience crash",
            severity=Severity.CRITICAL,
            impact=Impact.ALL_USERS,
            likelihood=Likelihood.ALWAYS,
            business_value=BusinessValue.REVENUE_CRITICAL
        )

        assert issue.score == 5 * 5 * 5 * 5  # 625
        assert issue.priority == Priority.CRITICAL

    def test_cosmetic_issue_lowest_score(self):
        """Cosmetic, few users, very rare = lowest score."""
        issue = Issue(
            id="2",
            title="Icon slightly misaligned",
            description="Minor visual issue",
            severity=Severity.COSMETIC,
            impact=Impact.FEW_USERS,
            likelihood=Likelihood.VERY_RARE,
            business_value=BusinessValue.LOW
        )

        assert issue.score == 1  # 1*1*1*1
        assert issue.priority == Priority.LOW

    def test_prioritization_ordering(self, scorer):
        """Test that issues are correctly prioritized."""
        critical = Issue(
            id="1", title="Critical bug",
            description="", severity=Severity.CRITICAL,
            impact=Impact.ALL_USERS, likelihood=Likelihood.ALWAYS,
            business_value=BusinessValue.CORE
        )

        low = Issue(
            id="2", title="Minor issue",
            description="", severity=Severity.MINOR,
            impact=Impact.FEW_USERS, likelihood=Likelihood.RARE,
            business_value=BusinessValue.LOW
        )

        scorer.add_issue(low)
        scorer.add_issue(critical)

        prioritized = scorer.get_prioritized_issues()
        assert prioritized[0].id == "1"  # Critical first
        assert prioritized[1].id == "2"  # Low last

    def test_metrics_calculation(self, scorer):
        """Test metrics are calculated correctly."""
        scorer.add_issue(Issue(
            id="1", title="Bug 1", description="",
            severity=Severity.MAJOR, impact=Impact.MANY_USERS,
            likelihood=Likelihood.SOMETIMES,
            business_value=BusinessValue.IMPORTANT
        ))

        scorer.add_issue(Issue(
            id="2", title="Bug 2", description="",
            severity=Severity.MINOR, impact=Impact.FEW_USERS,
            likelihood=Likelihood.RARE,
            business_value=BusinessValue.LOW,
            resolved_at=datetime.now()
        ))

        metrics = scorer.calculate_metrics()

        assert metrics['total_issues'] == 2
        assert metrics['unresolved'] == 1
        assert metrics['resolved'] == 1

    @pytest.mark.parametrize("severity,impact,likelihood,bv,expected_priority", [
        (Severity.CRITICAL, Impact.ALL_USERS, Likelihood.ALWAYS, BusinessValue.CORE, Priority.CRITICAL),
        (Severity.MAJOR, Impact.MOST_USERS, Likelihood.USUALLY, BusinessValue.IMPORTANT, Priority.CRITICAL),
        (Severity.MODERATE, Impact.MANY_USERS, Likelihood.SOMETIMES, BusinessValue.IMPORTANT, Priority.HIGH),
        (Severity.MINOR, Impact.SOME_USERS, Likelihood.RARE, BusinessValue.NICE_TO_HAVE, Priority.LOW),
        (Severity.COSMETIC, Impact.FEW_USERS, Likelihood.VERY_RARE, BusinessValue.LOW, Priority.LOW),
    ])
    def test_priority_classification(
        self, severity, impact, likelihood, bv, expected_priority
    ):
        """Test priority classification for various combinations."""
        issue = Issue(
            id="test", title="Test", description="",
            severity=severity, impact=impact,
            likelihood=likelihood, business_value=bv
        )
        assert issue.priority == expected_priority
```

## Best Practices

### Issue Scoring Checklist

```markdown
## Issue Scoring Best Practices

### Scoring
- [ ] Use consistent scoring criteria across team
- [ ] Document scoring guidelines
- [ ] Include multiple dimensions (severity, impact, etc.)
- [ ] Review and calibrate scores regularly
- [ ] Consider business context in scoring

### Prioritization
- [ ] Act on critical issues immediately
- [ ] Track score trends over time
- [ ] Re-evaluate scores as context changes
- [ ] Balance new features vs bug fixes using scores
- [ ] Use scores in sprint planning

### Automation
- [ ] Auto-score issues from test failures
- [ ] Integrate scoring with issue trackers
- [ ] Generate priority reports automatically
- [ ] Alert on high-score unresolved issues
- [ ] Track resolution time by priority
```

## Conclusion

Issue scoring provides a systematic, data-driven approach to bug prioritization. By evaluating issues across multiple dimensions, test automation professionals can focus efforts where they matter most and communicate priorities objectively to stakeholders.

## Key Takeaways

1. Issue scores combine severity, impact, likelihood, and business value
2. Quantitative scoring replaces subjective prioritization
3. Priority levels map to actionable timeframes
4. Track metrics to monitor quality trends
5. Calibrate scoring criteria with the team
6. Automate scoring where possible
7. Re-evaluate scores as context changes
