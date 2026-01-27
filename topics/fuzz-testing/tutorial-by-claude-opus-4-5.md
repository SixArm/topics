# Fuzz Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Fuzz testing (fuzzing) is a software testing technique that involves providing random, unexpected, or malformed data as inputs to discover vulnerabilities, bugs, and crashes. For test automation professionals, fuzz testing complements traditional testing by finding edge cases and security issues that scripted tests miss.

## What is Fuzz Testing?

Fuzz testing automatically generates large amounts of random or semi-random input data and feeds it to a program to find bugs, security vulnerabilities, and unexpected behaviors that cause crashes or incorrect handling.

### Types of Fuzz Testing

```
┌─────────────────────────────────────────────────────────────┐
│                    Fuzz Testing Types                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Dumb Fuzzing (Random):                                     │
│  └── Generates completely random data                       │
│      • Simple to implement                                  │
│      • Low initial effectiveness                           │
│      • Good for binary formats                             │
│                                                             │
│  Smart Fuzzing (Grammar-based):                            │
│  └── Understands input structure                           │
│      • Generates valid-looking inputs                      │
│      • Higher code coverage                                │
│      • Requires input grammar definition                   │
│                                                             │
│  Mutation-based:                                            │
│  └── Mutates valid inputs                                  │
│      • Starts with valid samples                           │
│      • Applies random modifications                        │
│      • Discovers edge cases efficiently                    │
│                                                             │
│  Coverage-guided:                                           │
│  └── Uses code coverage feedback                           │
│      • Evolves inputs based on coverage                    │
│      • Most effective modern approach                      │
│      • Examples: AFL, LibFuzzer, Jazzer                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Fuzz Testing

### Python Fuzzing with Hypothesis

```python
from hypothesis import given, strategies as st, settings, Verbosity
from hypothesis import assume, example
from typing import List, Optional, Dict, Any
import re

# Function to test
def parse_email(email: str) -> Dict[str, str]:
    """Parse an email address into local and domain parts."""
    if not email or not isinstance(email, str):
        raise ValueError("Email must be a non-empty string")

    if email.count('@') != 1:
        raise ValueError("Email must contain exactly one @ symbol")

    local, domain = email.split('@')

    if not local:
        raise ValueError("Local part cannot be empty")
    if not domain:
        raise ValueError("Domain cannot be empty")
    if '.' not in domain:
        raise ValueError("Domain must contain a dot")

    return {'local': local, 'domain': domain}


def validate_password(password: str) -> bool:
    """Validate password meets requirements."""
    if len(password) < 8:
        return False
    if len(password) > 128:
        return False
    if not any(c.isupper() for c in password):
        return False
    if not any(c.islower() for c in password):
        return False
    if not any(c.isdigit() for c in password):
        return False
    return True


def calculate_discount(price: float, discount_percent: float) -> float:
    """Calculate discounted price."""
    if price < 0:
        raise ValueError("Price cannot be negative")
    if discount_percent < 0 or discount_percent > 100:
        raise ValueError("Discount must be between 0 and 100")

    return round(price * (1 - discount_percent / 100), 2)


# Fuzz tests using Hypothesis
class TestEmailParserFuzzing:
    """Fuzz tests for email parser."""

    @given(st.text())
    def test_parse_email_never_crashes(self, email: str):
        """Fuzzing: parser should never crash, only raise ValueError."""
        try:
            result = parse_email(email)
            # If successful, verify structure
            assert 'local' in result
            assert 'domain' in result
        except ValueError:
            pass  # Expected for invalid emails
        except Exception as e:
            # Any other exception is a bug
            raise AssertionError(f"Unexpected exception: {type(e).__name__}: {e}")

    @given(st.emails())
    def test_valid_emails_parse_successfully(self, email: str):
        """Valid emails should always parse."""
        result = parse_email(email)
        assert '@' not in result['local']
        assert '.' in result['domain']

    @given(
        local=st.text(min_size=1, max_size=64).filter(lambda x: '@' not in x),
        domain=st.from_regex(r'[a-z]+\.[a-z]+', fullmatch=True)
    )
    def test_constructed_emails_parse(self, local: str, domain: str):
        """Emails constructed from valid parts should parse."""
        email = f"{local}@{domain}"
        result = parse_email(email)
        assert result['local'] == local
        assert result['domain'] == domain


class TestPasswordValidatorFuzzing:
    """Fuzz tests for password validator."""

    @given(st.text())
    def test_validate_password_never_crashes(self, password: str):
        """Password validation should never crash."""
        result = validate_password(password)
        assert isinstance(result, bool)

    @given(st.text(min_size=8, max_size=128).filter(
        lambda p: (
            any(c.isupper() for c in p) and
            any(c.islower() for c in p) and
            any(c.isdigit() for c in p)
        )
    ))
    def test_valid_passwords_accepted(self, password: str):
        """Passwords meeting requirements should be valid."""
        assert validate_password(password) is True

    @given(st.text(max_size=7))
    def test_short_passwords_rejected(self, password: str):
        """Short passwords should be rejected."""
        assert validate_password(password) is False

    @given(st.binary())
    def test_binary_input_handling(self, data: bytes):
        """Binary input should be handled gracefully."""
        try:
            password = data.decode('utf-8', errors='ignore')
            result = validate_password(password)
            assert isinstance(result, bool)
        except Exception:
            pass  # Decoding issues are acceptable


class TestDiscountCalculationFuzzing:
    """Fuzz tests for discount calculation."""

    @given(
        price=st.floats(min_value=0, max_value=1e6, allow_nan=False, allow_infinity=False),
        discount=st.floats(min_value=0, max_value=100, allow_nan=False, allow_infinity=False)
    )
    def test_discount_within_bounds(self, price: float, discount: float):
        """Discounted price should be between 0 and original price."""
        result = calculate_discount(price, discount)
        assert 0 <= result <= price

    @given(
        price=st.floats(allow_nan=True, allow_infinity=True),
        discount=st.floats(allow_nan=True, allow_infinity=True)
    )
    def test_handles_special_floats(self, price: float, discount: float):
        """Function should handle NaN and Infinity gracefully."""
        try:
            result = calculate_discount(price, discount)
            # If it succeeds, result should be reasonable
            assert not (result != result)  # Not NaN
        except ValueError:
            pass  # Expected for invalid inputs
        except OverflowError:
            pass  # Acceptable for extreme values

    @given(
        price=st.floats(min_value=-1000, max_value=-0.01),
        discount=st.floats(min_value=0, max_value=100)
    )
    def test_negative_prices_rejected(self, price: float, discount: float):
        """Negative prices should raise ValueError."""
        try:
            calculate_discount(price, discount)
            raise AssertionError("Should have raised ValueError")
        except ValueError as e:
            assert "negative" in str(e).lower()


# Advanced fuzzing strategies
class TestAdvancedFuzzing:
    """Advanced fuzzing patterns."""

    # Fuzzing JSON parsing
    @given(st.recursive(
        st.none() | st.booleans() | st.integers() | st.floats(allow_nan=False) | st.text(),
        lambda children: st.lists(children) | st.dictionaries(st.text(), children),
        max_leaves=50
    ))
    def test_json_structure_handling(self, data):
        """Test handling of arbitrary JSON-like structures."""
        import json
        try:
            json_str = json.dumps(data)
            parsed = json.loads(json_str)
            assert parsed == data or (
                isinstance(data, float) and str(data) == str(parsed)
            )
        except (ValueError, TypeError, OverflowError):
            pass  # Some Python objects can't be JSON serialized

    # Fuzzing with custom strategies
    @st.composite
    def user_data(draw):
        """Generate user-like data structures."""
        return {
            'id': draw(st.integers(min_value=1)),
            'name': draw(st.text(min_size=1, max_size=100)),
            'email': draw(st.emails()),
            'age': draw(st.integers(min_value=0, max_value=150) | st.none()),
            'roles': draw(st.lists(st.sampled_from(['admin', 'user', 'guest']), max_size=3)),
        }

    @given(user_data())
    def test_user_processing(self, user):
        """Test user data processing with generated data."""
        # Your user processing function here
        assert 'id' in user
        assert 'email' in user
```

### JavaScript/TypeScript Fuzzing

```typescript
// fuzzing.test.ts
import fc from 'fast-check';

// Function to test
function parseQueryString(query: string): Record<string, string> {
  if (!query || query.length === 0) {
    return {};
  }

  const result: Record<string, string> = {};
  const pairs = query.split('&');

  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (key) {
      result[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
    }
  }

  return result;
}

function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

describe('Fuzz Testing with fast-check', () => {
  describe('parseQueryString', () => {
    test('never crashes on arbitrary strings', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          try {
            const result = parseQueryString(input);
            return typeof result === 'object' && result !== null;
          } catch (e) {
            // URIError from decodeURIComponent is acceptable
            return e instanceof URIError;
          }
        })
      );
    });

    test('roundtrip: parse then serialize', () => {
      fc.assert(
        fc.property(
          fc.dictionary(
            fc.string().filter(s => s.length > 0 && !s.includes('&') && !s.includes('=')),
            fc.string().filter(s => !s.includes('&') && !s.includes('='))
          ),
          (obj) => {
            const query = Object.entries(obj)
              .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
              .join('&');

            const parsed = parseQueryString(query);

            // All original keys should be present
            for (const key of Object.keys(obj)) {
              if (parsed[key] !== obj[key]) {
                return false;
              }
            }
            return true;
          }
        )
      );
    });
  });

  describe('sanitizeHtml', () => {
    test('output never contains raw HTML characters', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const output = sanitizeHtml(input);

          // Should not contain unescaped HTML special chars
          // (except as part of escape sequences)
          const hasRawLt = /<(?!&lt;|&gt;|&amp;|&quot;|&#039;)/.test(output);
          const hasRawGt = />(?!&lt;|&gt;|&amp;|&quot;|&#039;)/.test(output);

          return !hasRawLt && !hasRawGt;
        })
      );
    });

    test('is idempotent when no special chars', () => {
      fc.assert(
        fc.property(
          fc.string().filter(s => !/[<>&"']/.test(s)),
          (input) => {
            return sanitizeHtml(input) === input;
          }
        )
      );
    });

    test('preserves length or increases it', () => {
      fc.assert(
        fc.property(fc.string(), (input) => {
          const output = sanitizeHtml(input);
          return output.length >= input.length;
        })
      );
    });
  });

  describe('Advanced fuzzing', () => {
    // Fuzz with structured data
    const userArbitrary = fc.record({
      id: fc.integer({ min: 1 }),
      name: fc.string({ minLength: 1, maxLength: 100 }),
      email: fc.emailAddress(),
      age: fc.option(fc.integer({ min: 0, max: 150 })),
      roles: fc.array(fc.constantFrom('admin', 'user', 'guest'), { maxLength: 3 })
    });

    test('user data processing', () => {
      fc.assert(
        fc.property(userArbitrary, (user) => {
          // Process user - should never throw
          const processed = processUser(user);
          return processed.id === user.id;
        })
      );
    });

    // Fuzz JSON-like structures
    const jsonArbitrary = fc.jsonValue();

    test('JSON roundtrip', () => {
      fc.assert(
        fc.property(jsonArbitrary, (value) => {
          const serialized = JSON.stringify(value);
          const deserialized = JSON.parse(serialized);

          // Deep equality (with special handling for undefined vs missing)
          return JSON.stringify(deserialized) === JSON.stringify(value);
        })
      );
    });
  });
});

function processUser(user: any): any {
  return { ...user };
}
```

## Security Fuzzing

```python
class SecurityFuzzer:
    """Security-focused fuzz testing."""

    # SQL Injection payloads
    sql_injection_payloads = [
        "' OR '1'='1",
        "'; DROP TABLE users; --",
        "1' OR '1'='1' --",
        "admin'--",
        "1; DELETE FROM users",
        "' UNION SELECT * FROM users--",
        "') OR ('1'='1",
    ]

    # XSS payloads
    xss_payloads = [
        "<script>alert('XSS')</script>",
        "<img src=x onerror=alert('XSS')>",
        "javascript:alert('XSS')",
        "<svg onload=alert('XSS')>",
        "'\"><script>alert('XSS')</script>",
        "<body onload=alert('XSS')>",
    ]

    # Command injection payloads
    command_injection_payloads = [
        "; ls -la",
        "| cat /etc/passwd",
        "$(whoami)",
        "`id`",
        "&& rm -rf /",
        "|| echo vulnerable",
    ]

    @staticmethod
    @given(st.sampled_from(sql_injection_payloads))
    def test_sql_injection(payload: str, db_query_function):
        """Test SQL injection resistance."""
        try:
            result = db_query_function(payload)
            # Should not expose data or execute commands
            assert 'DROP' not in str(result).upper()
            assert 'DELETE' not in str(result).upper()
        except Exception:
            pass  # Rejection is acceptable

    @staticmethod
    @given(st.sampled_from(xss_payloads))
    def test_xss_sanitization(payload: str, render_function):
        """Test XSS sanitization."""
        result = render_function(payload)
        # Should escape HTML
        assert '<script>' not in result.lower()
        assert 'onerror=' not in result.lower()
        assert 'javascript:' not in result.lower()
```

## Best Practices

### Fuzzing Best Practices Checklist

```markdown
## Fuzz Testing Best Practices

### Implementation
- [ ] Start with smart/grammar-based fuzzing for structured inputs
- [ ] Use coverage-guided fuzzing for maximum effectiveness
- [ ] Define clear oracles (what constitutes a bug)
- [ ] Seed the fuzzer with valid input samples
- [ ] Run fuzzers for extended periods (hours/days)

### Integration
- [ ] Include fuzzing in CI/CD pipeline
- [ ] Set time limits for CI fuzzing runs
- [ ] Save and reproduce crashing inputs
- [ ] Track code coverage improvements
- [ ] Prioritize security-critical code

### Bug Handling
- [ ] Minimize crashing inputs
- [ ] Create regression tests from crashes
- [ ] Investigate root causes
- [ ] Fix bugs promptly
- [ ] Rerun fuzzer after fixes

### Coverage
- [ ] Fuzz all input parsing code
- [ ] Fuzz serialization/deserialization
- [ ] Fuzz file format handlers
- [ ] Fuzz network protocol handlers
- [ ] Fuzz cryptographic operations
```

## Conclusion

Fuzz testing is a powerful technique for finding bugs and security vulnerabilities that traditional testing misses. By automatically generating unexpected inputs, fuzzers discover edge cases and help build more robust software.

## Key Takeaways

1. Fuzzing generates random/semi-random inputs to find bugs
2. Coverage-guided fuzzing is most effective
3. Use property-based testing libraries (Hypothesis, fast-check)
4. Include security-focused fuzzing payloads
5. Run fuzzers for extended periods
6. Save crashing inputs for regression tests
7. Integrate fuzzing into CI/CD pipeline
