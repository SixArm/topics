# Equivalence Partitioning: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Equivalence partitioning is a black-box testing technique that divides input data into groups (partitions) where all values in a partition are expected to behave the same way. For test automation professionals, equivalence partitioning enables systematic test case design while reducing the total number of tests needed.

## What is Equivalence Partitioning?

Equivalence partitioning assumes that if one test case in a partition passes, all other test cases in that partition will also pass. This allows testers to select representative values from each partition rather than testing every possible input.

### Core Concept

```
┌─────────────────────────────────────────────────────────────┐
│               Equivalence Partitioning Concept               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Input Domain: Age field (valid range: 18-65)               │
│                                                             │
│  ┌──────────────┬─────────────────────┬──────────────────┐  │
│  │   Invalid    │       Valid         │     Invalid      │  │
│  │   (< 18)     │     (18-65)         │     (> 65)       │  │
│  │              │                     │                  │  │
│  │   Partition  │     Partition       │    Partition     │  │
│  │      1       │        2            │       3          │  │
│  │              │                     │                  │  │
│  │   Test: 10   │     Test: 30        │    Test: 80      │  │
│  │   (representative)  (representative)  (representative)│  │
│  └──────────────┴─────────────────────┴──────────────────┘  │
│        ↓               ↓                    ↓               │
│     0  17     18              65      66        ∞           │
│                                                             │
│  Instead of testing all ages, test ONE value from each     │
│  partition: 10 (invalid low), 30 (valid), 80 (invalid high)│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Equivalence Partitioning

### Python Implementation

```python
from typing import List, Dict, Any, Tuple, Callable, Optional
from dataclasses import dataclass
from enum import Enum

class PartitionType(Enum):
    VALID = "valid"
    INVALID = "invalid"

@dataclass
class EquivalencePartition:
    """Represents an equivalence partition."""
    name: str
    partition_type: PartitionType
    min_value: Optional[Any] = None
    max_value: Optional[Any] = None
    values: Optional[List[Any]] = None
    description: str = ""

    def get_representative_value(self) -> Any:
        """Get a representative value from this partition."""
        if self.values:
            # Return middle value for discrete sets
            return self.values[len(self.values) // 2]
        elif self.min_value is not None and self.max_value is not None:
            # Return middle value for ranges
            if isinstance(self.min_value, (int, float)):
                return (self.min_value + self.max_value) // 2
        elif self.min_value is not None:
            # Open-ended upper bound
            return self.min_value + 10
        elif self.max_value is not None:
            # Open-ended lower bound
            return self.max_value - 10
        return None

@dataclass
class TestCase:
    """Generated test case from equivalence partitioning."""
    partition: EquivalencePartition
    test_value: Any
    expected_valid: bool
    description: str

class EquivalencePartitioningAnalyzer:
    """Analyze and generate test cases using equivalence partitioning."""

    def __init__(self):
        self.partitions: List[EquivalencePartition] = []

    def add_partition(self, partition: EquivalencePartition):
        """Add an equivalence partition."""
        self.partitions.append(partition)

    def define_numeric_partitions(
        self,
        field_name: str,
        valid_min: float,
        valid_max: float
    ) -> List[EquivalencePartition]:
        """
        Define standard numeric partitions for a field.
        Creates: invalid_low, valid, invalid_high partitions.
        """
        partitions = [
            EquivalencePartition(
                name=f"{field_name}_invalid_low",
                partition_type=PartitionType.INVALID,
                max_value=valid_min - 1,
                description=f"Values below valid range for {field_name}"
            ),
            EquivalencePartition(
                name=f"{field_name}_valid",
                partition_type=PartitionType.VALID,
                min_value=valid_min,
                max_value=valid_max,
                description=f"Valid values for {field_name}"
            ),
            EquivalencePartition(
                name=f"{field_name}_invalid_high",
                partition_type=PartitionType.INVALID,
                min_value=valid_max + 1,
                description=f"Values above valid range for {field_name}"
            )
        ]

        for p in partitions:
            self.add_partition(p)

        return partitions

    def define_discrete_partitions(
        self,
        field_name: str,
        valid_values: List[Any],
        invalid_values: List[Any] = None
    ) -> List[EquivalencePartition]:
        """Define partitions for discrete/enumerated values."""
        partitions = [
            EquivalencePartition(
                name=f"{field_name}_valid",
                partition_type=PartitionType.VALID,
                values=valid_values,
                description=f"Valid discrete values for {field_name}"
            )
        ]

        if invalid_values:
            partitions.append(
                EquivalencePartition(
                    name=f"{field_name}_invalid",
                    partition_type=PartitionType.INVALID,
                    values=invalid_values,
                    description=f"Invalid discrete values for {field_name}"
                )
            )

        for p in partitions:
            self.add_partition(p)

        return partitions

    def generate_test_cases(self) -> List[TestCase]:
        """Generate test cases from all defined partitions."""
        test_cases = []

        for partition in self.partitions:
            test_value = partition.get_representative_value()

            test_case = TestCase(
                partition=partition,
                test_value=test_value,
                expected_valid=(partition.partition_type == PartitionType.VALID),
                description=f"Test {partition.name} with value {test_value}"
            )
            test_cases.append(test_case)

        return test_cases

    def generate_report(self) -> str:
        """Generate analysis report."""
        test_cases = self.generate_test_cases()

        report = ["Equivalence Partitioning Analysis Report"]
        report.append("=" * 50)
        report.append(f"\nTotal Partitions: {len(self.partitions)}")
        report.append(f"Valid Partitions: {sum(1 for p in self.partitions if p.partition_type == PartitionType.VALID)}")
        report.append(f"Invalid Partitions: {sum(1 for p in self.partitions if p.partition_type == PartitionType.INVALID)}")
        report.append(f"\nGenerated Test Cases: {len(test_cases)}")

        report.append("\n\nTest Cases:")
        report.append("-" * 50)

        for i, tc in enumerate(test_cases, 1):
            report.append(f"\n{i}. {tc.description}")
            report.append(f"   Partition: {tc.partition.name}")
            report.append(f"   Type: {tc.partition.partition_type.value}")
            report.append(f"   Value: {tc.test_value}")
            report.append(f"   Expected: {'Valid' if tc.expected_valid else 'Invalid'}")

        return "\n".join(report)


# Example: Age validation
class AgeValidator:
    """Validates age input for insurance application."""

    MIN_AGE = 18
    MAX_AGE = 65

    def validate(self, age: int) -> Tuple[bool, str]:
        """Validate age and return (is_valid, message)."""
        if not isinstance(age, int):
            return False, "Age must be an integer"

        if age < self.MIN_AGE:
            return False, f"Age must be at least {self.MIN_AGE}"

        if age > self.MAX_AGE:
            return False, f"Age must not exceed {self.MAX_AGE}"

        return True, "Age is valid"


# Test generation using equivalence partitioning
import pytest

class TestAgeValidatorWithEquivalencePartitioning:
    """Tests generated using equivalence partitioning."""

    @pytest.fixture
    def validator(self):
        return AgeValidator()

    @pytest.fixture
    def partitions(self):
        analyzer = EquivalencePartitioningAnalyzer()
        analyzer.define_numeric_partitions(
            field_name="age",
            valid_min=18,
            valid_max=65
        )
        return analyzer.generate_test_cases()

    # Invalid partition: below minimum (one representative test)
    @pytest.mark.parametrize("age", [0, 10, 17])
    def test_age_below_minimum_is_invalid(self, validator, age):
        """Test partition: age < 18 (invalid low)."""
        is_valid, message = validator.validate(age)
        assert not is_valid
        assert "at least 18" in message

    # Valid partition: within range (one representative test)
    @pytest.mark.parametrize("age", [18, 30, 65])
    def test_age_within_range_is_valid(self, validator, age):
        """Test partition: 18 <= age <= 65 (valid)."""
        is_valid, message = validator.validate(age)
        assert is_valid

    # Invalid partition: above maximum (one representative test)
    @pytest.mark.parametrize("age", [66, 80, 100])
    def test_age_above_maximum_is_invalid(self, validator, age):
        """Test partition: age > 65 (invalid high)."""
        is_valid, message = validator.validate(age)
        assert not is_valid
        assert "not exceed 65" in message


# More complex example: Password validation
class PasswordPartitions:
    """Equivalence partitions for password validation."""

    @staticmethod
    def get_partitions():
        analyzer = EquivalencePartitioningAnalyzer()

        # Length partitions
        analyzer.add_partition(EquivalencePartition(
            name="length_too_short",
            partition_type=PartitionType.INVALID,
            values=["ab", "abc1234"],  # < 8 chars
            description="Password too short (< 8 characters)"
        ))

        analyzer.add_partition(EquivalencePartition(
            name="length_valid",
            partition_type=PartitionType.VALID,
            values=["Password1", "ValidPass123!"],  # 8-128 chars
            description="Password valid length (8-128 characters)"
        ))

        analyzer.add_partition(EquivalencePartition(
            name="length_too_long",
            partition_type=PartitionType.INVALID,
            values=["A" * 129],  # > 128 chars
            description="Password too long (> 128 characters)"
        ))

        # Complexity partitions
        analyzer.add_partition(EquivalencePartition(
            name="missing_uppercase",
            partition_type=PartitionType.INVALID,
            values=["password123"],  # no uppercase
            description="Password missing uppercase letter"
        ))

        analyzer.add_partition(EquivalencePartition(
            name="missing_lowercase",
            partition_type=PartitionType.INVALID,
            values=["PASSWORD123"],  # no lowercase
            description="Password missing lowercase letter"
        ))

        analyzer.add_partition(EquivalencePartition(
            name="missing_number",
            partition_type=PartitionType.INVALID,
            values=["PasswordABC"],  # no number
            description="Password missing number"
        ))

        analyzer.add_partition(EquivalencePartition(
            name="meets_all_requirements",
            partition_type=PartitionType.VALID,
            values=["ValidPass1", "MyP@ssw0rd!"],
            description="Password meets all requirements"
        ))

        return analyzer
```

### JavaScript/TypeScript Implementation

```typescript
// equivalence-partitioning.ts
enum PartitionType {
  VALID = 'valid',
  INVALID = 'invalid'
}

interface EquivalencePartition {
  name: string;
  type: PartitionType;
  minValue?: number | string;
  maxValue?: number | string;
  values?: any[];
  description: string;
}

interface GeneratedTestCase {
  partition: EquivalencePartition;
  testValue: any;
  expectedValid: boolean;
  description: string;
}

class EquivalencePartitionAnalyzer {
  private partitions: EquivalencePartition[] = [];

  addPartition(partition: EquivalencePartition): void {
    this.partitions.push(partition);
  }

  defineNumericPartitions(
    fieldName: string,
    validMin: number,
    validMax: number
  ): EquivalencePartition[] {
    const partitions: EquivalencePartition[] = [
      {
        name: `${fieldName}_invalid_low`,
        type: PartitionType.INVALID,
        maxValue: validMin - 1,
        description: `Values below valid range for ${fieldName}`
      },
      {
        name: `${fieldName}_valid`,
        type: PartitionType.VALID,
        minValue: validMin,
        maxValue: validMax,
        description: `Valid values for ${fieldName}`
      },
      {
        name: `${fieldName}_invalid_high`,
        type: PartitionType.INVALID,
        minValue: validMax + 1,
        description: `Values above valid range for ${fieldName}`
      }
    ];

    partitions.forEach(p => this.addPartition(p));
    return partitions;
  }

  getRepresentativeValue(partition: EquivalencePartition): any {
    if (partition.values && partition.values.length > 0) {
      return partition.values[Math.floor(partition.values.length / 2)];
    }

    if (partition.minValue !== undefined && partition.maxValue !== undefined) {
      if (typeof partition.minValue === 'number') {
        return Math.floor(
          ((partition.minValue as number) + (partition.maxValue as number)) / 2
        );
      }
    }

    if (partition.minValue !== undefined) {
      if (typeof partition.minValue === 'number') {
        return (partition.minValue as number) + 10;
      }
    }

    if (partition.maxValue !== undefined) {
      if (typeof partition.maxValue === 'number') {
        return (partition.maxValue as number) - 10;
      }
    }

    return null;
  }

  generateTestCases(): GeneratedTestCase[] {
    return this.partitions.map(partition => ({
      partition,
      testValue: this.getRepresentativeValue(partition),
      expectedValid: partition.type === PartitionType.VALID,
      description: `Test ${partition.name} with representative value`
    }));
  }
}

// Example usage
class AgeValidator {
  static readonly MIN_AGE = 18;
  static readonly MAX_AGE = 65;

  validate(age: number): { valid: boolean; message: string } {
    if (!Number.isInteger(age)) {
      return { valid: false, message: 'Age must be an integer' };
    }

    if (age < AgeValidator.MIN_AGE) {
      return { valid: false, message: `Age must be at least ${AgeValidator.MIN_AGE}` };
    }

    if (age > AgeValidator.MAX_AGE) {
      return { valid: false, message: `Age must not exceed ${AgeValidator.MAX_AGE}` };
    }

    return { valid: true, message: 'Age is valid' };
  }
}

// Jest tests using equivalence partitioning
describe('AgeValidator - Equivalence Partitioning', () => {
  const validator = new AgeValidator();
  const analyzer = new EquivalencePartitionAnalyzer();

  // Setup partitions
  beforeAll(() => {
    analyzer.defineNumericPartitions('age', 18, 65);
  });

  describe('Invalid low partition (age < 18)', () => {
    test.each([0, 10, 17])('age %i should be invalid', (age) => {
      const result = validator.validate(age);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('at least 18');
    });
  });

  describe('Valid partition (18 <= age <= 65)', () => {
    test.each([18, 30, 45, 65])('age %i should be valid', (age) => {
      const result = validator.validate(age);
      expect(result.valid).toBe(true);
    });
  });

  describe('Invalid high partition (age > 65)', () => {
    test.each([66, 80, 100])('age %i should be invalid', (age) => {
      const result = validator.validate(age);
      expect(result.valid).toBe(false);
      expect(result.message).toContain('not exceed 65');
    });
  });
});

// Email validation with multiple partitions
describe('Email Validation - Equivalence Partitioning', () => {
  const validEmails = [
    'user@example.com',
    'test.user@domain.org',
    'user+tag@example.co.uk'
  ];

  const invalidEmails = {
    noAtSymbol: ['userexample.com', 'testdomain'],
    noDomain: ['user@', 'test@.com'],
    noLocalPart: ['@example.com', '@domain.org'],
    invalidChars: ['user name@example.com', 'user<>@domain.com'],
    empty: ['', '   ']
  };

  describe('Valid email partition', () => {
    test.each(validEmails)('"%s" should be valid', (email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  describe('Invalid partitions', () => {
    test.each(invalidEmails.noAtSymbol)(
      'missing @ symbol: "%s" should be invalid',
      (email) => {
        expect(isValidEmail(email)).toBe(false);
      }
    );

    test.each(invalidEmails.noDomain)(
      'missing domain: "%s" should be invalid',
      (email) => {
        expect(isValidEmail(email)).toBe(false);
      }
    );

    test.each(invalidEmails.noLocalPart)(
      'missing local part: "%s" should be invalid',
      (email) => {
        expect(isValidEmail(email)).toBe(false);
      }
    );
  });
});

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
```

## Combining with Boundary Value Analysis

```python
class EquivalenceWithBoundaryAnalysis:
    """
    Combine equivalence partitioning with boundary value analysis
    for comprehensive test coverage.
    """

    @staticmethod
    def generate_comprehensive_tests(
        field_name: str,
        valid_min: int,
        valid_max: int
    ) -> Dict[str, List[int]]:
        """
        Generate test values using both techniques.

        Equivalence Partitioning: One value from each partition
        Boundary Value Analysis: Values at and around boundaries
        """
        return {
            # Equivalence partition representatives
            'equivalence_invalid_low': [(valid_min - 1) // 2],
            'equivalence_valid': [(valid_min + valid_max) // 2],
            'equivalence_invalid_high': [valid_max + 10],

            # Boundary values
            'boundary_just_below_min': [valid_min - 1],
            'boundary_at_min': [valid_min],
            'boundary_just_above_min': [valid_min + 1],
            'boundary_just_below_max': [valid_max - 1],
            'boundary_at_max': [valid_max],
            'boundary_just_above_max': [valid_max + 1],
        }


# Example: Comprehensive age validation tests
class TestAgeValidationComprehensive:
    """
    Comprehensive tests combining equivalence partitioning
    and boundary value analysis.
    """

    @pytest.fixture
    def validator(self):
        return AgeValidator()

    @pytest.fixture
    def test_values(self):
        return EquivalenceWithBoundaryAnalysis.generate_comprehensive_tests(
            field_name="age",
            valid_min=18,
            valid_max=65
        )

    # Equivalence partitioning tests
    def test_middle_of_invalid_low_partition(self, validator):
        """Representative from invalid low partition."""
        is_valid, _ = validator.validate(8)
        assert not is_valid

    def test_middle_of_valid_partition(self, validator):
        """Representative from valid partition."""
        is_valid, _ = validator.validate(40)
        assert is_valid

    def test_middle_of_invalid_high_partition(self, validator):
        """Representative from invalid high partition."""
        is_valid, _ = validator.validate(75)
        assert not is_valid

    # Boundary value tests
    def test_just_below_minimum(self, validator):
        """Boundary: just below minimum."""
        is_valid, _ = validator.validate(17)
        assert not is_valid

    def test_at_minimum(self, validator):
        """Boundary: at minimum."""
        is_valid, _ = validator.validate(18)
        assert is_valid

    def test_just_above_minimum(self, validator):
        """Boundary: just above minimum."""
        is_valid, _ = validator.validate(19)
        assert is_valid

    def test_just_below_maximum(self, validator):
        """Boundary: just below maximum."""
        is_valid, _ = validator.validate(64)
        assert is_valid

    def test_at_maximum(self, validator):
        """Boundary: at maximum."""
        is_valid, _ = validator.validate(65)
        assert is_valid

    def test_just_above_maximum(self, validator):
        """Boundary: just above maximum."""
        is_valid, _ = validator.validate(66)
        assert not is_valid
```

## Best Practices

### Equivalence Partitioning Checklist

```markdown
## Equivalence Partitioning Best Practices

### Identifying Partitions
- [ ] Identify all input conditions
- [ ] Create valid partition(s) for each condition
- [ ] Create invalid partition(s) for each condition
- [ ] Consider special values (null, empty, zero)
- [ ] Document partition boundaries clearly

### Selecting Test Values
- [ ] Choose one representative from each partition
- [ ] Select values near middle of partition (not boundaries)
- [ ] Combine with boundary value analysis for edges
- [ ] Consider data type constraints

### Test Design
- [ ] Cover all partitions with at least one test
- [ ] Prioritize invalid partitions for error handling
- [ ] Document which partition each test covers
- [ ] Keep tests independent

### Avoid
- [ ] Testing multiple values from same partition
- [ ] Ignoring edge partitions
- [ ] Overlapping partition definitions
- [ ] Testing only valid partitions
```

## Conclusion

Equivalence partitioning is a fundamental technique for systematic test case design. By dividing inputs into partitions and testing representatives from each, test automation professionals can achieve good coverage with fewer tests while ensuring both valid and invalid inputs are properly handled.

## Key Takeaways

1. Divide input domain into equivalent partitions
2. Test one representative value per partition
3. Include both valid and invalid partitions
4. Combine with boundary value analysis for comprehensive coverage
5. Document partitions clearly for maintainability
6. Reduces test cases while maintaining coverage
7. Works for numeric, string, and enumerated inputs
