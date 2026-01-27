# White-Box Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

White-box testing (also called structural or glass-box testing) is a testing approach where the tester has full knowledge of the internal code structure. For test automation professionals, white-box testing enables thorough coverage of code paths, branches, conditions, and logic that black-box testing alone might miss.

## What is White-Box Testing?

White-box testing designs test cases based on the internal structure of the code — its functions, branches, loops, and data flows. Unlike black-box testing (which tests inputs and outputs without knowing internals), white-box testing uses code knowledge to ensure every path and condition is exercised.

### White-Box Testing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                   White-Box Testing                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Black-Box vs White-Box:                                    │
│                                                             │
│  Black-Box:  Input ──► [? ? ? ?] ──► Output                │
│              Tests behavior without knowing internals       │
│                                                             │
│  White-Box:  Input ──► [if → then → else → loop] ──► Output│
│              Tests internal paths and conditions            │
│                                                             │
│  Coverage Criteria (from weakest to strongest):             │
│  ├── Statement Coverage: Every line executes ≥1 time       │
│  ├── Branch Coverage: Every branch (if/else) taken         │
│  ├── Condition Coverage: Each boolean sub-expression       │
│  │   evaluates to both true and false                      │
│  ├── Path Coverage: Every possible execution path          │
│  └── MC/DC: Modified Condition/Decision Coverage           │
│      (each condition independently affects the decision)   │
│                                                             │
│  White-Box Techniques:                                      │
│  ├── Control flow testing (branches, loops)                │
│  ├── Data flow testing (variable definitions and uses)     │
│  ├── Statement coverage testing                            │
│  ├── Branch coverage testing                               │
│  └── Mutation testing (inject faults to test tests)        │
│                                                             │
│  Applicable Test Levels:                                    │
│  ├── Unit testing (primary use)                            │
│  ├── Integration testing (component interactions)          │
│  └── Code review (informal white-box analysis)             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing White-Box Testing

```python
# white_box_testing.py

"""
White-box testing techniques and coverage analysis.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Set, Optional, Tuple


# --- System Under Test ---

def calculate_shipping(weight: float, distance: float, is_express: bool, is_member: bool) -> dict:
    """
    Calculate shipping cost with multiple branches.

    Branches:
    1. weight <= 0 or distance <= 0: invalid
    2. weight > 50: overweight surcharge
    3. is_express: express multiplier
    4. is_member: member discount
    5. distance > 1000: long-distance surcharge
    """
    if weight <= 0 or distance <= 0:
        return {"error": "Invalid weight or distance", "cost": 0}

    base_cost = weight * 0.5 + distance * 0.01

    if weight > 50:
        base_cost += 25.0  # Heavy item surcharge

    if distance > 1000:
        base_cost *= 1.2  # Long-distance multiplier

    if is_express:
        base_cost *= 2.0  # Express shipping

    if is_member:
        base_cost *= 0.9  # 10% member discount

    return {"cost": round(base_cost, 2), "express": is_express, "member_discount": is_member}


# --- Coverage Analysis Tools ---

@dataclass
class BranchInfo:
    branch_id: str
    condition: str
    true_covered: bool = False
    false_covered: bool = False

    @property
    def fully_covered(self) -> bool:
        return self.true_covered and self.false_covered


class CoverageTracker:
    """Track branch and statement coverage."""

    def __init__(self):
        self.branches: Dict[str, BranchInfo] = {}
        self.statements_total: int = 0
        self.statements_covered: Set[int] = set()

    def add_branch(self, branch_id: str, condition: str):
        self.branches[branch_id] = BranchInfo(branch_id, condition)

    def cover_branch(self, branch_id: str, outcome: bool):
        if branch_id in self.branches:
            if outcome:
                self.branches[branch_id].true_covered = True
            else:
                self.branches[branch_id].false_covered = True

    def cover_statement(self, line: int):
        self.statements_covered.add(line)

    def branch_coverage(self) -> Dict:
        if not self.branches:
            return {"coverage_pct": 100, "covered": 0, "total": 0}

        total_outcomes = len(self.branches) * 2  # Each branch has true and false
        covered = sum(
            (1 if b.true_covered else 0) + (1 if b.false_covered else 0)
            for b in self.branches.values()
        )

        uncovered = []
        for b in self.branches.values():
            if not b.true_covered:
                uncovered.append(f"{b.branch_id}: true branch not covered ({b.condition})")
            if not b.false_covered:
                uncovered.append(f"{b.branch_id}: false branch not covered ({b.condition})")

        return {
            "coverage_pct": round(covered / total_outcomes * 100, 1),
            "covered": covered,
            "total": total_outcomes,
            "uncovered": uncovered,
            "full_coverage": covered == total_outcomes,
        }

    def statement_coverage(self) -> Dict:
        if self.statements_total == 0:
            return {"coverage_pct": 100, "covered": 0, "total": 0}
        return {
            "coverage_pct": round(len(self.statements_covered) / self.statements_total * 100, 1),
            "covered": len(self.statements_covered),
            "total": self.statements_total,
        }


def generate_branch_tests(branches: List[Tuple[str, str]]) -> List[Dict]:
    """Generate minimum test cases for full branch coverage."""
    test_cases = []
    for branch_id, condition in branches:
        test_cases.append({"name": f"test_{branch_id}_true", "condition": condition, "outcome": True})
        test_cases.append({"name": f"test_{branch_id}_false", "condition": condition, "outcome": False})
    return test_cases


# --- White-Box Tests for calculate_shipping ---

class TestCalculateShippingWhiteBox:
    """White-box tests designed to achieve full branch coverage."""

    # Branch 1: Invalid inputs (weight <= 0 or distance <= 0)
    def test_branch1_true_invalid_weight(self):
        result = calculate_shipping(0, 100, False, False)
        assert "error" in result

    def test_branch1_true_invalid_distance(self):
        result = calculate_shipping(10, 0, False, False)
        assert "error" in result

    def test_branch1_false_valid_inputs(self):
        result = calculate_shipping(10, 100, False, False)
        assert "cost" in result
        assert result["cost"] > 0

    # Branch 2: Overweight (weight > 50)
    def test_branch2_true_heavy(self):
        heavy = calculate_shipping(60, 100, False, False)
        normal = calculate_shipping(40, 100, False, False)
        assert heavy["cost"] > normal["cost"]  # Surcharge applied

    def test_branch2_false_normal_weight(self):
        result = calculate_shipping(30, 100, False, False)
        assert result["cost"] == 30 * 0.5 + 100 * 0.01

    # Branch 3: Long distance (distance > 1000)
    def test_branch3_true_long_distance(self):
        long_dist = calculate_shipping(10, 1500, False, False)
        short_dist = calculate_shipping(10, 500, False, False)
        # Long distance should have multiplier effect
        assert long_dist["cost"] > short_dist["cost"]

    def test_branch3_false_short_distance(self):
        result = calculate_shipping(10, 500, False, False)
        expected = 10 * 0.5 + 500 * 0.01
        assert result["cost"] == expected

    # Branch 4: Express shipping
    def test_branch4_true_express(self):
        express = calculate_shipping(10, 100, True, False)
        standard = calculate_shipping(10, 100, False, False)
        assert express["cost"] == standard["cost"] * 2

    def test_branch4_false_standard(self):
        result = calculate_shipping(10, 100, False, False)
        assert not result["express"]

    # Branch 5: Member discount
    def test_branch5_true_member(self):
        member = calculate_shipping(10, 100, False, True)
        non_member = calculate_shipping(10, 100, False, False)
        assert member["cost"] < non_member["cost"]

    def test_branch5_false_non_member(self):
        result = calculate_shipping(10, 100, False, False)
        assert not result["member_discount"]


class TestCoverageTracker:

    def test_full_branch_coverage(self):
        tracker = CoverageTracker()
        tracker.add_branch("b1", "weight > 50")
        tracker.add_branch("b2", "is_express")

        tracker.cover_branch("b1", True)
        tracker.cover_branch("b1", False)
        tracker.cover_branch("b2", True)
        tracker.cover_branch("b2", False)

        result = tracker.branch_coverage()
        assert result["full_coverage"]
        assert result["coverage_pct"] == 100

    def test_partial_coverage_reported(self):
        tracker = CoverageTracker()
        tracker.add_branch("b1", "x > 0")

        tracker.cover_branch("b1", True)  # Only true branch

        result = tracker.branch_coverage()
        assert not result["full_coverage"]
        assert result["coverage_pct"] == 50
        assert len(result["uncovered"]) == 1

    def test_branch_test_generation(self):
        branches = [("weight_check", "weight > 50"), ("express_check", "is_express")]
        tests = generate_branch_tests(branches)
        assert len(tests) == 4  # 2 branches * 2 outcomes
```

## Best Practices

```markdown
## White-Box Testing Best Practices

### Coverage Goals
- [ ] Achieve 100% statement coverage as a minimum
- [ ] Target 100% branch coverage for critical code
- [ ] Use condition coverage for complex boolean expressions
- [ ] Consider MC/DC for safety-critical systems

### Test Design
- [ ] Design tests from the code structure, not just requirements
- [ ] Test every branch (if/else, switch cases, loops)
- [ ] Test boundary conditions at decision points
- [ ] Cover error handling paths, not just happy paths

### Complementary Approaches
- [ ] Combine with black-box testing for comprehensive coverage
- [ ] Use mutation testing to verify test effectiveness
- [ ] Use code coverage tools to identify untested paths
- [ ] Review coverage reports in CI/CD pipeline
```

## Conclusion

White-box testing leverages knowledge of internal code structure to ensure thorough test coverage. By targeting every branch, condition, and path, test automation professionals catch bugs that black-box testing alone would miss, particularly in complex decision logic and error handling code.

## Key Takeaways

1. White-box testing designs tests based on internal code structure
2. Statement coverage ensures every line executes; branch coverage ensures every decision path
3. Branch coverage is a practical minimum target for most code
4. Each branch needs both true and false outcomes tested
5. White-box testing complements black-box testing — use both
6. Coverage tools (pytest-cov, Istanbul) automate coverage measurement
7. 100% coverage doesn't guarantee correctness — it means all paths are exercised
