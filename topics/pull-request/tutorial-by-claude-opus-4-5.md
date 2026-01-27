# Pull Request: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A pull request (PR) is a method for submitting contributions to a codebase, where changes are reviewed before being merged. For test automation professionals, PRs are the gateway for quality — automated checks, test results, and code review all converge at the PR to prevent defects from reaching the main branch.

## What is a Pull Request?

A pull request proposes merging changes from one branch into another. It provides a structured workflow for code review, automated testing, and discussion before changes are integrated. PRs are central to modern CI/CD workflows and serve as quality gates.

### Pull Request in Context

```
┌─────────────────────────────────────────────────────────────┐
│                      Pull Request                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PR Workflow:                                               │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │Branch│─►│Push  │─►│Open  │─►│Review│─►│Merge │         │
│  │      │  │      │  │ PR   │  │& Fix │  │      │         │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘         │
│                          │                                  │
│                    ┌─────┴─────┐                           │
│                    │ Automated │                            │
│                    │  Checks   │                            │
│                    ├───────────┤                            │
│                    │ ✓ Linting │                            │
│                    │ ✓ Unit    │                            │
│                    │ ✓ Integ   │                            │
│                    │ ✓ Coverage│                            │
│                    │ ✓ Security│                            │
│                    └───────────┘                            │
│                                                             │
│  Quality Gates at PR:                                       │
│  ├── All automated tests pass                              │
│  ├── Code coverage threshold met                           │
│  ├── No security vulnerabilities                           │
│  ├── Linting and formatting pass                           │
│  ├── Required reviewers approved                           │
│  └── No merge conflicts                                   │
│                                                             │
│  PR Best Practices:                                         │
│  ├── Small, focused changes                                │
│  ├── Clear description and context                         │
│  ├── Tests included for new code                           │
│  ├── Self-review before requesting review                  │
│  └── Address feedback promptly                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Automating PR Quality Checks

```python
# pull_request.py

"""
Automated pull request quality checks for test automation.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from enum import Enum


class CheckStatus(Enum):
    PASSED = "passed"
    FAILED = "failed"
    PENDING = "pending"
    SKIPPED = "skipped"


@dataclass
class PRCheck:
    name: str
    status: CheckStatus
    details: str = ""
    required: bool = True


@dataclass
class PullRequest:
    title: str
    description: str
    branch: str
    target: str
    files_changed: List[str] = field(default_factory=list)
    additions: int = 0
    deletions: int = 0
    checks: List[PRCheck] = field(default_factory=list)

    @property
    def is_mergeable(self) -> bool:
        required_checks = [c for c in self.checks if c.required]
        return all(c.status == CheckStatus.PASSED for c in required_checks)

    @property
    def size(self) -> str:
        total = self.additions + self.deletions
        if total < 50:
            return "small"
        elif total < 200:
            return "medium"
        elif total < 500:
            return "large"
        return "extra-large"


class PRQualityChecker:
    """Validate PR quality standards."""

    def check_tests_included(self, pr: PullRequest) -> PRCheck:
        """Verify tests are included for source changes."""
        source_files = [f for f in pr.files_changed
                       if f.endswith(('.py', '.js', '.ts'))
                       and '/test' not in f and '_test' not in f
                       and '.test.' not in f]
        test_files = [f for f in pr.files_changed
                     if '/test' in f or '_test' in f or '.test.' in f]

        if source_files and not test_files:
            return PRCheck("tests_included", CheckStatus.FAILED,
                          "Source files changed but no tests added/modified")
        return PRCheck("tests_included", CheckStatus.PASSED,
                      f"{len(test_files)} test files included")

    def check_pr_size(self, pr: PullRequest, max_lines: int = 500) -> PRCheck:
        total = pr.additions + pr.deletions
        if total > max_lines:
            return PRCheck("pr_size", CheckStatus.FAILED,
                          f"PR too large: {total} lines (max {max_lines})",
                          required=False)
        return PRCheck("pr_size", CheckStatus.PASSED,
                      f"PR size: {total} lines")

    def check_description(self, pr: PullRequest) -> PRCheck:
        if len(pr.description.strip()) < 20:
            return PRCheck("description", CheckStatus.FAILED,
                          "PR description too short or missing")
        return PRCheck("description", CheckStatus.PASSED, "Description provided")

    def check_branch_naming(self, pr: PullRequest) -> PRCheck:
        import re
        valid_patterns = [
            r'^(feature|fix|hotfix|chore|docs|test)/[\w-]+$',
            r'^[A-Z]+-\d+[-/][\w-]+$',  # JIRA-style
        ]
        if any(re.match(p, pr.branch) for p in valid_patterns):
            return PRCheck("branch_naming", CheckStatus.PASSED,
                          f"Branch '{pr.branch}' follows convention")
        return PRCheck("branch_naming", CheckStatus.FAILED,
                      f"Branch '{pr.branch}' doesn't follow naming convention",
                      required=False)

    def run_all_checks(self, pr: PullRequest) -> List[PRCheck]:
        checks = [
            self.check_tests_included(pr),
            self.check_pr_size(pr),
            self.check_description(pr),
            self.check_branch_naming(pr),
        ]
        pr.checks.extend(checks)
        return checks


# Tests
class TestPullRequestQuality:
    """Test PR quality checks."""

    @pytest.fixture
    def checker(self):
        return PRQualityChecker()

    def test_requires_tests_with_source_changes(self, checker):
        pr = PullRequest(
            title="Add user service",
            description="Adds a new user management service.",
            branch="feature/user-service",
            target="main",
            files_changed=["src/user_service.py"],
            additions=100
        )
        result = checker.check_tests_included(pr)
        assert result.status == CheckStatus.FAILED

    def test_passes_when_tests_included(self, checker):
        pr = PullRequest(
            title="Add user service",
            description="Adds a new user management service with tests.",
            branch="feature/user-service",
            target="main",
            files_changed=["src/user_service.py", "tests/test_user_service.py"],
            additions=150
        )
        result = checker.check_tests_included(pr)
        assert result.status == CheckStatus.PASSED

    def test_pr_size_check(self, checker):
        small_pr = PullRequest("Fix", "Small fix.", "fix/typo", "main", additions=10)
        large_pr = PullRequest("Big", "Big change.", "feature/big", "main", additions=600)

        assert checker.check_pr_size(small_pr).status == CheckStatus.PASSED
        assert checker.check_pr_size(large_pr).status == CheckStatus.FAILED

    def test_description_required(self, checker):
        no_desc = PullRequest("Fix", "", "fix/bug", "main")
        with_desc = PullRequest("Fix", "Fixes the login timeout by increasing the session duration.", "fix/bug", "main")

        assert checker.check_description(no_desc).status == CheckStatus.FAILED
        assert checker.check_description(with_desc).status == CheckStatus.PASSED

    def test_mergeable_when_all_required_pass(self, checker):
        pr = PullRequest(
            title="Good PR",
            description="A well-described change with tests.",
            branch="feature/good",
            target="main",
            files_changed=["src/app.py", "tests/test_app.py"],
            additions=50
        )
        checker.run_all_checks(pr)
        assert pr.is_mergeable

    def test_pr_size_classification(self):
        small = PullRequest("A", "B", "c", "main", additions=30)
        large = PullRequest("A", "B", "c", "main", additions=300, deletions=150)

        assert small.size == "small"
        assert large.size == "large"
```

## Best Practices

```markdown
## Pull Request Best Practices

### PR Creation
- [ ] Keep PRs small and focused (< 300 lines)
- [ ] Write clear titles and descriptions
- [ ] Include tests for new or changed code
- [ ] Self-review before requesting review
- [ ] Follow branch naming conventions

### Automated Checks
- [ ] Run all tests on every PR
- [ ] Enforce code coverage thresholds
- [ ] Run linting and formatting checks
- [ ] Scan for security vulnerabilities
- [ ] Check PR size and description quality

### Code Review
- [ ] Review for correctness, readability, and maintainability
- [ ] Check test quality, not just presence
- [ ] Verify edge cases are covered
- [ ] Address all review comments before merge

### CI/CD Integration
- [ ] Block merge until all required checks pass
- [ ] Run tests in parallel for faster feedback
- [ ] Report test results directly on the PR
- [ ] Auto-assign reviewers based on changed files
```

## Conclusion

Pull requests are the primary quality gate in modern development workflows. By automating PR checks for test inclusion, size limits, description quality, and CI/CD test results, test automation professionals ensure that every change meets quality standards before reaching the main branch.

## Key Takeaways

1. Pull requests provide structured code review and automated quality gates
2. Require tests for all source code changes
3. Keep PRs small and focused for effective review
4. Automate linting, testing, coverage, and security checks
5. Block merges until required checks pass
6. Write clear descriptions with context for reviewers
7. Track PR metrics (size, review time, check pass rate) for process improvement
