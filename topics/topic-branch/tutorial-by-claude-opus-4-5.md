# Topic Branch: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A topic branch (feature branch) is a short-lived branch created from the main branch to develop a specific feature, fix, or experiment in isolation. For test automation professionals, topic branches enable parallel development of test code, isolated test experimentation, and structured code review of test changes.

## What is a Topic Branch?

A topic branch is a Git branch created for a single, well-defined purpose — implementing a feature, fixing a bug, or refactoring code. It diverges from the main branch, receives focused commits, undergoes code review via pull request, and merges back when complete.

### Topic Branch in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Topic Branch                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Topic Branch Lifecycle:                                    │
│                                                             │
│  main ─────●─────────●──────────────●──────── (stable)     │
│             \       /               │                       │
│  feature/    ●──●──●  (merged)     │                       │
│  login-tests                        │                       │
│                                     \                       │
│  fix/                                ●──●  (in progress)   │
│  flaky-checkout                                             │
│                                                             │
│  Branch Naming Conventions:                                 │
│  ├── feature/  Add new functionality                       │
│  ├── fix/      Bug fixes                                   │
│  ├── test/     Test additions or improvements              │
│  ├── refactor/ Code restructuring                          │
│  └── chore/    Maintenance tasks                           │
│                                                             │
│  Workflow:                                                  │
│  1. Create branch from main                                │
│  2. Make focused commits                                   │
│  3. Push and open pull request                             │
│  4. CI runs tests on the branch                            │
│  5. Code review and approval                               │
│  6. Merge to main, delete branch                           │
│                                                             │
│  Test Automation on Topic Branches:                         │
│  ├── Run full test suite on every push                     │
│  ├── Run affected tests based on changed files             │
│  ├── Preview test coverage changes                         │
│  └── Prevent merge if tests fail                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Topic Branches and Test Automation

```python
# topic_branch.py

"""
Topic branch management and test automation integration.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Set
import re


@dataclass
class Branch:
    name: str
    base: str = "main"
    commits: List[str] = field(default_factory=list)
    changed_files: Set[str] = field(default_factory=set)

    @property
    def branch_type(self) -> str:
        prefixes = {"feature/": "feature", "fix/": "fix", "test/": "test",
                     "refactor/": "refactor", "chore/": "chore"}
        for prefix, btype in prefixes.items():
            if self.name.startswith(prefix):
                return btype
        return "unknown"

    @property
    def is_valid_name(self) -> bool:
        pattern = r"^(feature|fix|test|refactor|chore)/[a-z0-9-]+$"
        return bool(re.match(pattern, self.name))


class BranchNamingPolicy:
    """Enforce branch naming conventions."""

    VALID_PREFIXES = ["feature/", "fix/", "test/", "refactor/", "chore/"]
    MAX_LENGTH = 50

    def validate(self, branch_name: str) -> Dict:
        issues = []

        if not any(branch_name.startswith(p) for p in self.VALID_PREFIXES):
            issues.append(f"Must start with one of: {', '.join(self.VALID_PREFIXES)}")

        if len(branch_name) > self.MAX_LENGTH:
            issues.append(f"Name exceeds {self.MAX_LENGTH} characters")

        if " " in branch_name:
            issues.append("Spaces not allowed — use hyphens")

        if branch_name != branch_name.lower():
            issues.append("Must be lowercase")

        slug = branch_name.split("/", 1)[-1] if "/" in branch_name else branch_name
        if not re.match(r"^[a-z0-9][a-z0-9-]*[a-z0-9]$", slug) and len(slug) > 1:
            issues.append("Slug should be lowercase alphanumeric with hyphens")

        return {
            "valid": len(issues) == 0,
            "branch": branch_name,
            "issues": issues,
        }


class TestSelector:
    """Select which tests to run based on changed files."""

    def __init__(self):
        self.mappings: Dict[str, List[str]] = {}

    def add_mapping(self, file_pattern: str, test_suites: List[str]):
        self.mappings[file_pattern] = test_suites

    def select_tests(self, changed_files: Set[str]) -> Set[str]:
        selected = set()
        for changed in changed_files:
            for pattern, suites in self.mappings.items():
                if self._matches(changed, pattern):
                    selected.update(suites)
        return selected

    def _matches(self, filename: str, pattern: str) -> bool:
        if pattern.endswith("*"):
            return filename.startswith(pattern[:-1])
        return filename == pattern


class MergeReadinessChecker:
    """Check if a topic branch is ready to merge."""

    def check(self, branch: Branch, ci_status: Dict) -> Dict:
        checks = {
            "valid_name": branch.is_valid_name,
            "has_commits": len(branch.commits) > 0,
            "tests_pass": ci_status.get("tests_pass", False),
            "no_conflicts": ci_status.get("no_conflicts", True),
            "coverage_ok": ci_status.get("coverage_delta", 0) >= 0,
            "approved": ci_status.get("approvals", 0) >= 1,
        }

        return {
            "ready": all(checks.values()),
            "checks": checks,
            "blocking": [k for k, v in checks.items() if not v],
        }


# Tests
class TestTopicBranch:

    def test_branch_type_detection(self):
        assert Branch("feature/login-tests").branch_type == "feature"
        assert Branch("fix/flaky-checkout").branch_type == "fix"
        assert Branch("test/add-api-tests").branch_type == "test"
        assert Branch("random-name").branch_type == "unknown"

    def test_valid_branch_name(self):
        assert Branch("feature/add-login").is_valid_name
        assert Branch("fix/checkout-bug").is_valid_name
        assert not Branch("Feature/Login").is_valid_name
        assert not Branch("my branch").is_valid_name

    def test_naming_policy(self):
        policy = BranchNamingPolicy()
        assert policy.validate("feature/add-login")["valid"]
        assert not policy.validate("random-name")["valid"]
        assert not policy.validate("feature/Add Login")["valid"]

    def test_test_selection(self):
        selector = TestSelector()
        selector.add_mapping("src/auth/*", ["test_auth", "test_login"])
        selector.add_mapping("src/checkout/*", ["test_checkout"])

        tests = selector.select_tests({"src/auth/login.py", "src/auth/signup.py"})
        assert "test_auth" in tests
        assert "test_login" in tests
        assert "test_checkout" not in tests

    def test_merge_readiness_pass(self):
        branch = Branch("feature/new-tests", commits=["abc123"])
        ci = {"tests_pass": True, "no_conflicts": True, "coverage_delta": 2, "approvals": 1}

        result = MergeReadinessChecker().check(branch, ci)
        assert result["ready"]

    def test_merge_readiness_blocked(self):
        branch = Branch("feature/new-tests", commits=["abc123"])
        ci = {"tests_pass": False, "no_conflicts": True, "coverage_delta": -5, "approvals": 0}

        result = MergeReadinessChecker().check(branch, ci)
        assert not result["ready"]
        assert "tests_pass" in result["blocking"]
```

## Best Practices

```markdown
## Working with Topic Branches

### Branch Management
- [ ] Use consistent naming conventions (feature/, fix/, test/)
- [ ] Keep branches short-lived (days, not weeks)
- [ ] Base branches on latest main to reduce conflicts
- [ ] Delete branches after merge

### CI Integration
- [ ] Run full test suite on every branch push
- [ ] Use test selection to speed up feedback on large suites
- [ ] Block merge if tests fail or coverage drops
- [ ] Require code review approval before merge

### Test Development
- [ ] Create topic branches for test changes, not just features
- [ ] Review test code changes with the same rigor as production code
- [ ] Run tests against the branch diff to catch regressions
- [ ] Preview coverage reports before merging
```

## Conclusion

Topic branches provide isolated environments for developing and testing changes before they reach the main branch. By enforcing naming conventions, running automated tests on every push, and requiring readiness checks before merge, test automation professionals ensure that branches maintain code quality throughout the development workflow.

## Key Takeaways

1. Topic branches isolate changes for focused development and review
2. Naming conventions (feature/, fix/, test/) communicate branch purpose
3. CI pipelines should run tests on every branch push
4. Test selection based on changed files speeds up branch feedback
5. Merge readiness checks prevent broken code from reaching main
6. Keep branches short-lived to minimize merge conflicts
7. Test code changes deserve the same branch workflow as production code
