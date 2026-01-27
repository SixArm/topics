# Security Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Security testing evaluates software systems to identify vulnerabilities, weaknesses, and threats that could be exploited by attackers. For test automation professionals, security testing is essential for integrating vulnerability detection into CI/CD pipelines and ensuring applications are resilient against common attack patterns.

## What is Security Testing?

Security testing systematically validates that software protects data, maintains functionality, and prevents unauthorized access. It encompasses static analysis, dynamic testing, penetration testing, and vulnerability scanning to find weaknesses before attackers do.

### Security Testing in Context

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Testing                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Security Testing Types:                                    │
│  ├── SAST: Static Application Security Testing             │
│  │   └── Analyzes source code without execution            │
│  ├── DAST: Dynamic Application Security Testing            │
│  │   └── Tests running application from outside            │
│  ├── IAST: Interactive Application Security Testing        │
│  │   └── Combines SAST and DAST approaches                 │
│  ├── SCA: Software Composition Analysis                    │
│  │   └── Checks dependencies for vulnerabilities           │
│  └── Penetration Testing                                   │
│      └── Simulates real-world attacks                      │
│                                                             │
│  OWASP Top 10 (Testing Priorities):                        │
│  ├── A01: Broken Access Control                            │
│  ├── A02: Cryptographic Failures                           │
│  ├── A03: Injection                                        │
│  ├── A04: Insecure Design                                  │
│  ├── A05: Security Misconfiguration                        │
│  ├── A06: Vulnerable Components                            │
│  ├── A07: Authentication Failures                          │
│  ├── A08: Data Integrity Failures                          │
│  ├── A09: Logging & Monitoring Failures                    │
│  └── A10: Server-Side Request Forgery                      │
│                                                             │
│  CI/CD Integration:                                         │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│  │Build │►│SAST  │►│Unit  │►│DAST  │►│Deploy│             │
│  │      │ │+SCA  │ │Tests │ │Scan  │ │Gate  │             │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementing Security Tests

```python
# security_testing.py

"""
Automated security testing patterns.
"""

import pytest
import re
from typing import List, Dict
from dataclasses import dataclass


@dataclass
class SecurityTestResult:
    test_name: str
    passed: bool
    severity: str
    details: str


class SecurityTestSuite:
    """Automated security test collection."""

    def __init__(self):
        self.results: List[SecurityTestResult] = []

    def test_sql_injection(self, query_handler) -> SecurityTestResult:
        """Test SQL injection prevention."""
        payloads = [
            "' OR '1'='1",
            "'; DROP TABLE users; --",
            "1 UNION SELECT * FROM passwords",
            "admin'--",
            "1; EXEC xp_cmdshell('dir')",
        ]
        for payload in payloads:
            try:
                result = query_handler(payload)
                if self._indicates_injection(result):
                    return self._fail("sql_injection", "critical",
                                     f"SQL injection possible with: {payload}")
            except Exception:
                pass  # Expected - query should be rejected

        return self._pass("sql_injection", "No SQL injection vulnerabilities found")

    def test_xss(self, render_handler) -> SecurityTestResult:
        """Test cross-site scripting prevention."""
        payloads = [
            "<script>alert('xss')</script>",
            "<img src=x onerror=alert('xss')>",
            "javascript:alert('xss')",
            "<svg/onload=alert('xss')>",
            "'\"><script>alert('xss')</script>",
        ]
        for payload in payloads:
            output = render_handler(payload)
            if "<script>" in output.lower() or "onerror=" in output.lower():
                return self._fail("xss", "high",
                                 f"XSS possible with: {payload}")

        return self._pass("xss", "XSS payloads properly sanitized")

    def test_path_traversal(self, file_handler) -> SecurityTestResult:
        """Test path traversal prevention."""
        payloads = [
            "../../../etc/passwd",
            "..\\..\\..\\windows\\system32\\config\\sam",
            "....//....//etc/passwd",
            "%2e%2e%2f%2e%2e%2fetc%2fpasswd",
        ]
        for payload in payloads:
            try:
                result = file_handler(payload)
                if result and ("root:" in str(result) or "SYSTEM" in str(result)):
                    return self._fail("path_traversal", "critical",
                                     f"Path traversal with: {payload}")
            except (PermissionError, FileNotFoundError):
                pass

        return self._pass("path_traversal", "Path traversal prevented")

    def test_authentication_bypass(self, auth_handler) -> SecurityTestResult:
        """Test authentication cannot be bypassed."""
        bypass_attempts = [
            {"username": "admin", "password": ""},
            {"username": "admin", "password": "' OR '1'='1"},
            {"username": "", "password": ""},
            {"token": "null"},
            {"token": "undefined"},
        ]
        for attempt in bypass_attempts:
            if auth_handler(attempt):
                return self._fail("auth_bypass", "critical",
                                 f"Auth bypass with: {attempt}")

        return self._pass("auth_bypass", "Authentication bypass prevented")

    def _pass(self, name, details) -> SecurityTestResult:
        result = SecurityTestResult(name, True, "info", details)
        self.results.append(result)
        return result

    def _fail(self, name, severity, details) -> SecurityTestResult:
        result = SecurityTestResult(name, False, severity, details)
        self.results.append(result)
        return result

    def _indicates_injection(self, result) -> bool:
        if result is None:
            return False
        indicators = ["syntax error", "mysql", "postgresql", "sqlite",
                      "ORA-", "SQL Server"]
        return any(ind.lower() in str(result).lower() for ind in indicators)


# Tests
class TestSecurityTesting:
    """Test the security testing framework."""

    def test_sql_injection_detected(self):
        suite = SecurityTestSuite()

        def vulnerable_handler(input_val):
            if "'" in input_val:
                return "mysql syntax error near..."
            return "no results"

        result = suite.test_sql_injection(vulnerable_handler)
        assert not result.passed
        assert result.severity == "critical"

    def test_sql_injection_prevented(self):
        suite = SecurityTestSuite()

        def safe_handler(input_val):
            return "no results"

        result = suite.test_sql_injection(safe_handler)
        assert result.passed

    def test_xss_detected(self):
        suite = SecurityTestSuite()

        def vulnerable_render(input_val):
            return f"<div>{input_val}</div>"  # No escaping

        result = suite.test_xss(vulnerable_render)
        assert not result.passed

    def test_xss_prevented(self):
        suite = SecurityTestSuite()
        import html

        def safe_render(input_val):
            return f"<div>{html.escape(input_val)}</div>"

        result = suite.test_xss(safe_render)
        assert result.passed

    def test_auth_bypass_prevented(self):
        suite = SecurityTestSuite()

        def strict_auth(creds):
            return (creds.get("username") == "admin"
                    and creds.get("password") == "correct-password-hash")

        result = suite.test_authentication_bypass(strict_auth)
        assert result.passed
```

### JavaScript Implementation

```javascript
// security-testing.test.js

const securityPayloads = {
  sqli: ["' OR '1'='1", "'; DROP TABLE users; --", "1 UNION SELECT *"],
  xss: ["<script>alert('xss')</script>", "<img onerror=alert(1)>"],
  pathTraversal: ["../../../etc/passwd", "..\\..\\windows\\system32"],
};

describe('Security Tests', () => {
  describe('SQL Injection Prevention', () => {
    test('rejects SQL injection payloads', () => {
      for (const payload of securityPayloads.sqli) {
        const sanitized = sanitizeSQL(payload);
        expect(sanitized).not.toContain("'");
        expect(sanitized.toUpperCase()).not.toContain('UNION');
        expect(sanitized).not.toContain('--');
      }
    });
  });

  describe('XSS Prevention', () => {
    test('escapes HTML in user input', () => {
      for (const payload of securityPayloads.xss) {
        const escaped = escapeHTML(payload);
        expect(escaped).not.toContain('<script>');
        expect(escaped).not.toContain('onerror=');
      }
    });
  });

  describe('Path Traversal Prevention', () => {
    test('rejects path traversal attempts', () => {
      for (const payload of securityPayloads.pathTraversal) {
        const sanitized = sanitizePath(payload);
        expect(sanitized).not.toContain('..');
      }
    });
  });
});

function sanitizeSQL(input) {
  return input.replace(/['";\\-]/g, '').replace(/UNION|SELECT|DROP|DELETE/gi, '');
}
function escapeHTML(input) {
  return input.replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c])
  );
}
function sanitizePath(input) {
  return input.replace(/\.\./g, '').split('/').pop();
}
```

## Best Practices

```markdown
## Security Testing Best Practices

### Integration
- [ ] Run SAST on every commit
- [ ] Run SCA to check dependency vulnerabilities
- [ ] Include DAST scans in staging pipeline
- [ ] Gate releases on security scan results

### Coverage
- [ ] Test OWASP Top 10 vulnerability categories
- [ ] Test authentication and authorization boundaries
- [ ] Test input validation on all user inputs
- [ ] Test API security (authentication, rate limiting)

### Process
- [ ] Maintain a security test playbook
- [ ] Update tests when new vulnerability types emerge
- [ ] Conduct periodic penetration testing
- [ ] Track and remediate findings promptly
```

## Conclusion

Security testing is essential for identifying vulnerabilities before they are exploited. By automating security tests in CI/CD pipelines, test automation professionals provide continuous security validation that catches injection flaws, authentication weaknesses, and configuration issues early in the development lifecycle.

## Key Takeaways

1. Security testing identifies vulnerabilities through SAST, DAST, SCA, and penetration testing
2. Automate OWASP Top 10 vulnerability checks in CI/CD
3. Test injection prevention (SQL, XSS, command, path traversal)
4. Verify authentication and authorization cannot be bypassed
5. Scan dependencies for known vulnerabilities
6. Gate releases on security scan results
7. Continuously update security tests as new threats emerge
