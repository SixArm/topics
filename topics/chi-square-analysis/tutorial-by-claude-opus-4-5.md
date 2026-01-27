# Chi-Square Analysis: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Chi-square (χ²) analysis is a statistical method for determining whether observed outcomes differ significantly from expected outcomes. For test automation professionals, chi-square tests help analyze categorical data such as test pass/fail rates, defect distributions, and A/B test results.

## What is Chi-Square Analysis?

Chi-square analysis measures the discrepancy between observed and expected frequencies in categorical data. It answers: "Is the difference between what we observed and what we expected due to chance, or is it statistically significant?"

### The Formula

```
χ² = Σ (O - E)² / E

Where:
- O = Observed frequency
- E = Expected frequency
- Σ = Sum across all categories
```

### Types of Chi-Square Tests

```
┌─────────────────────────────────────────────────────────────┐
│                  Chi-Square Test Types                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Goodness of Fit                                            │
│  └── Does observed distribution match expected?             │
│  └── One variable, compare to known distribution            │
│                                                             │
│  Test of Independence                                       │
│  └── Are two categorical variables related?                 │
│  └── Two variables, test for association                    │
│                                                             │
│  Test of Homogeneity                                        │
│  └── Do populations have same distribution?                 │
│  └── Same variable across different groups                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Chi-Square Goodness of Fit

### Testing Expected Distributions

```python
from scipy import stats
import numpy as np

def chi_square_goodness_of_fit(observed: list, expected: list) -> dict:
    """
    Test if observed frequencies match expected distribution.

    Example: Are test failures evenly distributed across days of the week?
    """
    observed = np.array(observed)
    expected = np.array(expected)

    # Calculate chi-square statistic
    chi2 = np.sum((observed - expected) ** 2 / expected)

    # Degrees of freedom = number of categories - 1
    df = len(observed) - 1

    # Calculate p-value
    p_value = 1 - stats.chi2.cdf(chi2, df)

    return {
        'chi_square': chi2,
        'degrees_of_freedom': df,
        'p_value': p_value,
        'significant': p_value < 0.05
    }

# Example: Test failures by day of week
# H0: Failures are evenly distributed across days

observed_failures = [45, 50, 48, 42, 55, 38, 22]  # Mon-Sun
total = sum(observed_failures)
expected_failures = [total / 7] * 7  # Equal distribution

result = chi_square_goodness_of_fit(observed_failures, expected_failures)
print(f"Chi-square: {result['chi_square']:.2f}")
print(f"P-value: {result['p_value']:.4f}")
print(f"Significant difference: {result['significant']}")
# If significant, failures are NOT evenly distributed
```

### Testing Against Known Distributions

```python
def test_defect_distribution():
    """
    Test if defect severity follows expected distribution.
    Historical data suggests: Critical 5%, High 20%, Medium 50%, Low 25%
    """
    observed = [12, 45, 120, 73]  # Critical, High, Medium, Low
    total = sum(observed)

    # Expected based on historical percentages
    expected = [
        total * 0.05,  # Critical
        total * 0.20,  # High
        total * 0.50,  # Medium
        total * 0.25   # Low
    ]

    chi2, p_value = stats.chisquare(observed, expected)

    return {
        'chi_square': chi2,
        'p_value': p_value,
        'conclusion': 'Distribution matches expected' if p_value > 0.05
                      else 'Distribution differs from expected'
    }
```

## Chi-Square Test of Independence

### Testing Relationships Between Variables

```python
from scipy.stats import chi2_contingency

def test_independence(contingency_table: list) -> dict:
    """
    Test if two categorical variables are independent.

    Example: Is test outcome related to browser type?
    """
    chi2, p_value, dof, expected = chi2_contingency(contingency_table)

    return {
        'chi_square': chi2,
        'p_value': p_value,
        'degrees_of_freedom': dof,
        'expected_frequencies': expected,
        'variables_independent': p_value > 0.05
    }

# Example: Browser vs Test Outcome
# Contingency table:
#                Pass    Fail
# Chrome         150     30
# Firefox        145     35
# Safari         130     50
# Edge           140     40

contingency_table = [
    [150, 30],   # Chrome
    [145, 35],   # Firefox
    [130, 50],   # Safari
    [140, 40]    # Edge
]

result = test_independence(contingency_table)
print(f"Chi-square: {result['chi_square']:.2f}")
print(f"P-value: {result['p_value']:.4f}")
print(f"Variables independent: {result['variables_independent']}")
# If NOT independent, browser choice affects test outcomes
```

### Analyzing Test Results by Category

```python
class TestResultAnalyzer:
    """Analyze test results using chi-square tests."""

    def analyze_by_category(self, results: list) -> dict:
        """
        Analyze if test outcomes differ by category.

        Args:
            results: List of {'category': str, 'passed': bool}
        """
        from collections import defaultdict

        # Build contingency table
        counts = defaultdict(lambda: {'pass': 0, 'fail': 0})
        for r in results:
            outcome = 'pass' if r['passed'] else 'fail'
            counts[r['category']][outcome] += 1

        categories = sorted(counts.keys())
        table = [[counts[c]['pass'], counts[c]['fail']] for c in categories]

        # Run chi-square test
        chi2, p_value, dof, expected = chi2_contingency(table)

        return {
            'categories': categories,
            'observed_table': table,
            'expected_table': expected.tolist(),
            'chi_square': chi2,
            'p_value': p_value,
            'significant_difference': p_value < 0.05
        }

# Usage
results = [
    {'category': 'API', 'passed': True},
    {'category': 'API', 'passed': True},
    {'category': 'API', 'passed': False},
    {'category': 'UI', 'passed': True},
    {'category': 'UI', 'passed': False},
    {'category': 'UI', 'passed': False},
    # ... more results
]

analyzer = TestResultAnalyzer()
analysis = analyzer.analyze_by_category(results)
```

## A/B Test Analysis

### Comparing Conversion Rates

```python
def ab_test_chi_square(
    control_conversions: int,
    control_total: int,
    treatment_conversions: int,
    treatment_total: int
) -> dict:
    """
    Analyze A/B test results using chi-square.

    Tests if conversion rates are significantly different.
    """
    # Build contingency table
    #                 Converted    Not Converted
    # Control         c1           n1-c1
    # Treatment       c2           n2-c2

    table = [
        [control_conversions, control_total - control_conversions],
        [treatment_conversions, treatment_total - treatment_conversions]
    ]

    chi2, p_value, dof, expected = chi2_contingency(table)

    control_rate = control_conversions / control_total
    treatment_rate = treatment_conversions / treatment_total
    lift = (treatment_rate - control_rate) / control_rate * 100

    return {
        'control_rate': control_rate,
        'treatment_rate': treatment_rate,
        'lift_percentage': lift,
        'chi_square': chi2,
        'p_value': p_value,
        'significant': p_value < 0.05,
        'winner': 'treatment' if treatment_rate > control_rate and p_value < 0.05
                  else 'control' if control_rate > treatment_rate and p_value < 0.05
                  else 'no significant difference'
    }

# Example: New checkout flow A/B test
result = ab_test_chi_square(
    control_conversions=150,
    control_total=1000,
    treatment_conversions=180,
    treatment_total=1000
)

print(f"Control conversion rate: {result['control_rate']:.2%}")
print(f"Treatment conversion rate: {result['treatment_rate']:.2%}")
print(f"Lift: {result['lift_percentage']:.1f}%")
print(f"Statistically significant: {result['significant']}")
print(f"Winner: {result['winner']}")
```

## Applications in Test Automation

### Flaky Test Detection

```python
def detect_flaky_tests(test_runs: list) -> list:
    """
    Use chi-square to identify tests with unstable pass rates.

    A stable test should have consistent pass/fail rate across runs.
    """
    from collections import defaultdict

    # Group results by test
    test_results = defaultdict(list)
    for run in test_runs:
        for test in run['tests']:
            test_results[test['name']].append(test['passed'])

    flaky_tests = []

    for test_name, results in test_results.items():
        # Split results into time windows
        window_size = len(results) // 5
        if window_size < 10:
            continue

        windows = [
            results[i:i+window_size]
            for i in range(0, len(results), window_size)
        ][:5]

        # Count passes per window
        observed = [sum(w) for w in windows]
        expected_rate = sum(observed) / len(results)
        expected = [expected_rate * window_size] * len(windows)

        # Chi-square test for consistency
        chi2, p_value = stats.chisquare(observed, expected)

        if p_value < 0.05:  # Significant variation
            flaky_tests.append({
                'test_name': test_name,
                'chi_square': chi2,
                'p_value': p_value,
                'pass_rate_variance': np.var([sum(w)/len(w) for w in windows])
            })

    return sorted(flaky_tests, key=lambda x: x['p_value'])
```

### Environment Comparison

```python
def compare_environments(env_results: dict) -> dict:
    """
    Compare test results across environments.

    Tests if environments produce different failure rates.
    """
    # Build contingency table
    # Rows: environments, Columns: pass/fail
    table = []
    envs = []

    for env, results in env_results.items():
        passed = sum(1 for r in results if r['passed'])
        failed = len(results) - passed
        table.append([passed, failed])
        envs.append(env)

    chi2, p_value, dof, expected = chi2_contingency(table)

    # Calculate failure rates
    failure_rates = {}
    for i, env in enumerate(envs):
        total = table[i][0] + table[i][1]
        failure_rates[env] = table[i][1] / total

    return {
        'environments': envs,
        'failure_rates': failure_rates,
        'chi_square': chi2,
        'p_value': p_value,
        'environments_differ': p_value < 0.05,
        'problematic_env': max(failure_rates, key=failure_rates.get)
                           if p_value < 0.05 else None
    }

# Example
env_results = {
    'dev': [{'passed': True}] * 95 + [{'passed': False}] * 5,
    'staging': [{'passed': True}] * 92 + [{'passed': False}] * 8,
    'prod-mirror': [{'passed': True}] * 85 + [{'passed': False}] * 15,
}

comparison = compare_environments(env_results)
print(f"Environments differ: {comparison['environments_differ']}")
print(f"Failure rates: {comparison['failure_rates']}")
```

### Release Comparison

```python
def compare_releases(release_results: dict) -> dict:
    """
    Compare defect distributions across releases.

    Tests if new release has different defect profile.
    """
    # Build contingency table
    # Rows: releases, Columns: defect categories

    categories = ['critical', 'high', 'medium', 'low']
    table = []
    releases = list(release_results.keys())

    for release in releases:
        defects = release_results[release]
        row = [defects.get(cat, 0) for cat in categories]
        table.append(row)

    chi2, p_value, dof, expected = chi2_contingency(table)

    return {
        'releases': releases,
        'categories': categories,
        'observed': table,
        'expected': expected.tolist(),
        'chi_square': chi2,
        'p_value': p_value,
        'distributions_differ': p_value < 0.05
    }

# Example
release_results = {
    'v1.0': {'critical': 2, 'high': 10, 'medium': 30, 'low': 20},
    'v1.1': {'critical': 1, 'high': 8, 'medium': 35, 'low': 25},
    'v2.0': {'critical': 5, 'high': 15, 'medium': 25, 'low': 15},  # Different pattern!
}

comparison = compare_releases(release_results)
```

## Assumptions and Limitations

### Checking Assumptions

```python
def check_chi_square_assumptions(table: list) -> dict:
    """
    Verify chi-square test assumptions are met.
    """
    table = np.array(table)

    # Calculate expected frequencies
    row_totals = table.sum(axis=1)
    col_totals = table.sum(axis=0)
    total = table.sum()

    expected = np.outer(row_totals, col_totals) / total

    # Check assumptions
    min_expected = expected.min()
    cells_under_5 = (expected < 5).sum()
    total_cells = expected.size

    return {
        'minimum_expected_frequency': min_expected,
        'cells_under_5': cells_under_5,
        'percentage_under_5': cells_under_5 / total_cells * 100,
        'assumptions_met': min_expected >= 1 and cells_under_5 / total_cells <= 0.2,
        'recommendation': 'Use chi-square' if min_expected >= 5
                          else 'Use Fisher exact test' if total < 1000
                          else 'Combine categories to increase expected frequencies'
    }
```

### Using Fisher's Exact Test for Small Samples

```python
from scipy.stats import fisher_exact

def small_sample_test(table_2x2: list) -> dict:
    """
    Use Fisher's exact test for 2x2 tables with small samples.
    """
    odds_ratio, p_value = fisher_exact(table_2x2)

    return {
        'odds_ratio': odds_ratio,
        'p_value': p_value,
        'significant': p_value < 0.05
    }

# Example: Small A/B test
table = [
    [8, 12],   # Control: 8 converted, 12 didn't
    [15, 5]    # Treatment: 15 converted, 5 didn't
]

result = small_sample_test(table)
print(f"Odds ratio: {result['odds_ratio']:.2f}")
print(f"P-value: {result['p_value']:.4f}")
```

## Best Practices

```markdown
## Chi-Square Analysis Best Practices

### When to Use
- Comparing categorical data (pass/fail, categories)
- Testing if distribution matches expected
- Checking if variables are related

### When NOT to Use
- Continuous data (use t-test or ANOVA)
- Small sample sizes (use Fisher's exact test)
- Paired/matched data (use McNemar's test)

### Sample Size Guidelines
- Minimum 5 expected in each cell (preferred)
- At least 1 expected in each cell (minimum)
- No more than 20% of cells with expected < 5

### Interpretation
- p < 0.05: Significant difference/association
- p >= 0.05: No significant difference detected
- Chi-square value: Larger = bigger discrepancy
```

## Conclusion

Chi-square analysis is a powerful tool for analyzing categorical data in test automation. It helps identify significant differences in test outcomes across categories, environments, or time periods, enabling data-driven decisions about test suite health and quality.

## Key Takeaways

1. Chi-square tests compare observed vs expected frequencies
2. Goodness of fit tests one variable against expected distribution
3. Test of independence checks if two variables are related
4. Useful for A/B tests, flaky test detection, environment comparison
5. Verify assumptions before applying the test
6. Use Fisher's exact test for small sample sizes
7. p < 0.05 indicates statistically significant difference
