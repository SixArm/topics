# SQL Injection: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

SQL injection (SQLi) is a code injection technique where attackers insert malicious SQL statements into application queries through user input. For test automation professionals, testing for SQL injection vulnerabilities is a critical security testing responsibility — it remains one of the OWASP Top 10 most dangerous web application security risks.

## What is SQL Injection?

SQL injection occurs when user-supplied data is included in a SQL query without proper sanitization or parameterization. Attackers can manipulate queries to bypass authentication, extract data, modify records, or even execute system commands.

### SQL Injection in Context

```
┌─────────────────────────────────────────────────────────────┐
│                     SQL Injection                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  How SQL Injection Works:                                   │
│                                                             │
│  User Input: ' OR '1'='1                                   │
│        │                                                    │
│        ▼                                                    │
│  Vulnerable Query:                                          │
│  SELECT * FROM users WHERE name='[INPUT]' AND pass='...'   │
│        │                                                    │
│        ▼                                                    │
│  Executed Query:                                            │
│  SELECT * FROM users WHERE name='' OR '1'='1' AND pass=''  │
│  (Returns all users — authentication bypassed)             │
│                                                             │
│  Types of SQL Injection:                                    │
│  ├── In-band: Results visible in response                  │
│  │   ├── Error-based: SQL errors reveal data               │
│  │   └── UNION-based: UNION to extract other tables        │
│  ├── Blind: No visible output                              │
│  │   ├── Boolean-based: True/false responses differ        │
│  │   └── Time-based: SLEEP() indicates true/false          │
│  └── Out-of-band: Data sent via DNS/HTTP to attacker       │
│                                                             │
│  Prevention:                                                │
│  ├── Parameterized queries (prepared statements)           │
│  ├── Input validation and sanitization                     │
│  ├── ORM usage (abstracts raw SQL)                         │
│  ├── Least privilege database accounts                     │
│  └── Web application firewalls (WAF)                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing for SQL Injection

```python
# sql_injection.py

"""
SQL injection testing and prevention validation.
"""

import pytest
from dataclasses import dataclass
from typing import List, Dict, Optional
import re


# Common SQL injection test payloads (for authorized testing only)
SQL_INJECTION_PAYLOADS = [
    "' OR '1'='1",
    "' OR '1'='1' --",
    "' OR '1'='1' /*",
    "1; DROP TABLE users --",
    "' UNION SELECT NULL, NULL --",
    "' UNION SELECT username, password FROM users --",
    "1' AND SLEEP(5) --",
    "1' AND 1=1 --",
    "1' AND 1=2 --",
    "admin'--",
    "' OR 1=1 #",
    "'; EXEC xp_cmdshell('dir') --",
]


@dataclass
class SQLiTestResult:
    payload: str
    input_field: str
    vulnerable: bool
    evidence: str
    severity: str


class SQLInjectionTester:
    """Test application inputs for SQL injection vulnerabilities."""

    def __init__(self):
        self.results: List[SQLiTestResult] = []

    def test_input_field(self, field_name: str, query_builder, payloads: Optional[List[str]] = None) -> List[SQLiTestResult]:
        """Test a query builder function with injection payloads."""
        test_payloads = payloads or SQL_INJECTION_PAYLOADS
        field_results = []

        for payload in test_payloads:
            result = self._test_single_payload(field_name, payload, query_builder)
            field_results.append(result)
            self.results.append(result)

        return field_results

    def _test_single_payload(self, field_name: str, payload: str, query_builder) -> SQLiTestResult:
        try:
            query = query_builder(payload)

            # Check for signs of injection
            if self._detects_injection(query, payload):
                return SQLiTestResult(
                    payload=payload,
                    input_field=field_name,
                    vulnerable=True,
                    evidence=f"Payload embedded in query: {query[:100]}",
                    severity="critical"
                )
            return SQLiTestResult(
                payload=payload,
                input_field=field_name,
                vulnerable=False,
                evidence="Payload was parameterized or sanitized",
                severity="none"
            )
        except Exception as e:
            # SQL errors from injection attempts indicate vulnerability
            if self._is_sql_error(str(e)):
                return SQLiTestResult(
                    payload=payload,
                    input_field=field_name,
                    vulnerable=True,
                    evidence=f"SQL error triggered: {str(e)[:100]}",
                    severity="high"
                )
            return SQLiTestResult(
                payload=payload,
                input_field=field_name,
                vulnerable=False,
                evidence="Input rejected safely",
                severity="none"
            )

    def _detects_injection(self, query: str, payload: str) -> bool:
        """Check if the payload was interpolated into the query unsafely."""
        # If the payload appears literally in the query, it's vulnerable
        dangerous_patterns = [
            r"OR\s+'1'\s*=\s*'1'",
            r"UNION\s+SELECT",
            r"DROP\s+TABLE",
            r";\s*(DELETE|INSERT|UPDATE|DROP|EXEC)",
            r"SLEEP\s*\(",
            r"--\s*$",
        ]
        for pattern in dangerous_patterns:
            if re.search(pattern, query, re.IGNORECASE):
                return True
        return False

    def _is_sql_error(self, error_msg: str) -> bool:
        sql_error_patterns = [
            "syntax error", "unterminated", "unexpected",
            "mysql", "sqlite", "postgresql", "oracle",
            "sql server", "unclosed quotation",
        ]
        error_lower = error_msg.lower()
        return any(p in error_lower for p in sql_error_patterns)

    @property
    def vulnerability_summary(self) -> Dict:
        vulnerable = [r for r in self.results if r.vulnerable]
        return {
            "total_tests": len(self.results),
            "vulnerabilities_found": len(vulnerable),
            "vulnerable_fields": list(set(r.input_field for r in vulnerable)),
            "critical_count": sum(1 for r in vulnerable if r.severity == "critical"),
            "is_safe": len(vulnerable) == 0,
        }


def build_query_vulnerable(username: str) -> str:
    """VULNERABLE: String concatenation — DO NOT USE in production."""
    return f"SELECT * FROM users WHERE username = '{username}'"


def build_query_safe(username: str) -> str:
    """SAFE: Returns parameterized query representation."""
    # In real code, this would use parameterized queries
    sanitized = username.replace("'", "''")
    return f"SELECT * FROM users WHERE username = ? [param: {sanitized}]"


# Tests
class TestSQLInjection:
    """Test SQL injection detection."""

    def test_vulnerable_query_detected(self):
        tester = SQLInjectionTester()
        results = tester.test_input_field("username", build_query_vulnerable)

        vulnerable = [r for r in results if r.vulnerable]
        assert len(vulnerable) > 0, "Should detect vulnerabilities in concatenated queries"

    def test_safe_query_passes(self):
        tester = SQLInjectionTester()
        results = tester.test_input_field("username", build_query_safe)

        vulnerable = [r for r in results if r.vulnerable]
        assert len(vulnerable) == 0, "Parameterized queries should not be vulnerable"

    def test_summary_report(self):
        tester = SQLInjectionTester()
        tester.test_input_field("username", build_query_vulnerable)
        tester.test_input_field("email", build_query_safe)

        summary = tester.vulnerability_summary
        assert not summary["is_safe"]
        assert "username" in summary["vulnerable_fields"]
        assert "email" not in summary["vulnerable_fields"]

    def test_common_payloads_covered(self):
        assert len(SQL_INJECTION_PAYLOADS) >= 10
        # Verify payloads cover different injection types
        payloads_str = " ".join(SQL_INJECTION_PAYLOADS).lower()
        assert "union" in payloads_str  # UNION-based
        assert "sleep" in payloads_str  # Time-based blind
        assert "drop" in payloads_str   # Destructive
        assert "or" in payloads_str     # Authentication bypass

    def test_error_based_detection(self):
        def query_that_errors(input_val):
            if "'" in input_val:
                raise Exception("SQLite: syntax error near unexpected token")
            return f"SELECT * FROM t WHERE x = '{input_val}'"

        tester = SQLInjectionTester()
        results = tester.test_input_field("search", query_that_errors)
        vulnerable = [r for r in results if r.vulnerable]
        assert len(vulnerable) > 0
```

## Best Practices

```markdown
## SQL Injection Testing

### Prevention Validation
- [ ] Verify all queries use parameterized statements
- [ ] Test every user input field with injection payloads
- [ ] Confirm ORM usage doesn't allow raw query injection
- [ ] Validate input sanitization on all entry points

### Testing Approach
- [ ] Test authentication forms with bypass payloads
- [ ] Test search fields with UNION-based payloads
- [ ] Test numeric inputs with boolean-based blind payloads
- [ ] Test all API parameters, not just visible form fields

### Security Posture
- [ ] Ensure database accounts use least privilege
- [ ] Verify error messages don't expose SQL details
- [ ] Test WAF rules against known bypass techniques
- [ ] Include SQLi tests in CI/CD security gates
```

## Conclusion

SQL injection remains one of the most dangerous and common web vulnerabilities. Test automation professionals must systematically test all user input paths with injection payloads, verify that parameterized queries are used consistently, and include SQL injection tests in continuous security validation pipelines.

## Key Takeaways

1. SQL injection occurs when user input is concatenated into queries without parameterization
2. Always use parameterized queries or prepared statements — never string concatenation
3. Test every input field, including hidden fields, API parameters, and headers
4. Cover multiple injection types: in-band, blind (boolean and time-based), and UNION-based
5. SQL errors in responses indicate vulnerability — suppress detailed error messages
6. Include SQLi testing in CI/CD pipelines as automated security gates
7. Defense in depth: parameterized queries, input validation, least privilege, and WAF
