# Security Attacks: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Security attacks represent the diverse set of techniques adversaries use to compromise software systems, from injection attacks and cross-site scripting to authentication bypass and privilege escalation. For test automation professionals, understanding these attack vectors is essential for building automated security test suites that validate defenses before attackers can exploit them. This tutorial covers the OWASP Top 10, common attack types, and practical automated security testing implementations.

## What are Security Attacks?

Security attacks are deliberate actions taken to exploit vulnerabilities in software systems, networks, or processes to gain unauthorized access, steal data, disrupt services, or cause other harm. The OWASP (Open Worldwide Application Security Project) Top 10 provides a widely-adopted framework categorizing the most critical web application security risks. For test automation, security attacks serve as the basis for designing negative test cases, penetration testing scripts, and continuous security validation that runs alongside functional test suites. Understanding attack mechanics allows testers to think adversarially and build defenses that are verified by automation.

### Security Attacks in Context

```
+----------------------------------------------------------+
|                   OWASP Top 10 (2021)                    |
|                                                          |
|  A01: Broken Access Control    A06: Vulnerable Components|
|  A02: Cryptographic Failures   A07: Auth Failures        |
|  A03: Injection               A08: Software Integrity    |
|  A04: Insecure Design          A09: Logging Failures     |
|  A05: Security Misconfig       A10: SSRF                 |
|                                                          |
|  Attacker --> [Recon] --> [Exploit] --> [Escalate]        |
|                  |            |             |             |
|                  v            v             v             |
|             Scanning    Injection    Privilege Gain       |
|             Fuzzing     XSS/CSRF    Data Exfiltration     |
|             Mapping     Auth Bypass Persistence           |
|                                                          |
|  Defender --> [Detect] --> [Prevent] --> [Respond]        |
|                  |            |             |             |
|                  v            v             v             |
|             Logging     Validation    Incident Plan       |
|             Monitoring  Sanitization Forensics            |
|             Alerting    Encoding     Recovery             |
+----------------------------------------------------------+
```

## Automated Security Testing with Python

The following Python module provides a framework for common security attack testing patterns, including injection detection, XSS scanning, authentication testing, and access control validation.

```python
"""Security attack testing framework for test automation."""

from dataclasses import dataclass, field
from enum import Enum
from typing import Optional
import re
import html


class AttackCategory(Enum):
    INJECTION = "A03:2021 - Injection"
    BROKEN_AUTH = "A07:2021 - Identification and Authentication Failures"
    XSS = "A03:2021 - Injection (XSS)"
    BROKEN_ACCESS = "A01:2021 - Broken Access Control"
    SECURITY_MISCONFIG = "A05:2021 - Security Misconfiguration"
    SSRF = "A10:2021 - Server-Side Request Forgery"


@dataclass
class SecurityTestCase:
    name: str
    category: AttackCategory
    payload: str
    target_field: str
    expected_blocked: bool = True
    description: str = ""


@dataclass
class SecurityTestResult:
    test_case: SecurityTestCase
    was_blocked: bool
    response_code: Optional[int] = None
    response_body: Optional[str] = None

    @property
    def passed(self) -> bool:
        return self.was_blocked == self.test_case.expected_blocked


class InputValidator:
    """Demonstrates input validation as a defense mechanism."""

    SQL_INJECTION_PATTERNS = [
        r"(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b)",
        r"('|\"|;|--)",
        r"(\b(OR|AND)\b\s+\d+\s*=\s*\d+)",
    ]

    XSS_PATTERNS = [
        r"<script[^>]*>",
        r"javascript\s*:",
        r"on\w+\s*=",
        r"<iframe",
        r"<img[^>]+onerror",
    ]

    @classmethod
    def check_sql_injection(cls, input_str: str) -> list[str]:
        findings = []
        for pattern in cls.SQL_INJECTION_PATTERNS:
            if re.search(pattern, input_str, re.IGNORECASE):
                findings.append(f"SQL injection pattern detected: {pattern}")
        return findings

    @classmethod
    def check_xss(cls, input_str: str) -> list[str]:
        findings = []
        for pattern in cls.XSS_PATTERNS:
            if re.search(pattern, input_str, re.IGNORECASE):
                findings.append(f"XSS pattern detected: {pattern}")
        return findings

    @classmethod
    def sanitize_input(cls, input_str: str) -> str:
        sanitized = html.escape(input_str)
        sanitized = re.sub(r"[;'\"\-\-]", "", sanitized)
        return sanitized


class AccessControlTester:
    """Test access control rules across roles and resources."""

    def __init__(self):
        self.rules: dict[str, set[str]] = {}

    def add_rule(self, role: str, resource: str) -> None:
        if role not in self.rules:
            self.rules[role] = set()
        self.rules[role].add(resource)

    def check_access(self, role: str, resource: str) -> bool:
        return resource in self.rules.get(role, set())

    def find_privilege_escalation(self, lower_role: str, higher_role: str) -> list[str]:
        """Find resources accessible by lower role that should be restricted."""
        lower_access = self.rules.get(lower_role, set())
        higher_only = self.rules.get(higher_role, set()) - lower_access
        violations = []
        for resource in lower_access:
            if resource.startswith("/admin") or resource.startswith("/manage"):
                violations.append(f"{lower_role} can access {resource}")
        return violations


def generate_xss_payloads() -> list[str]:
    """Generate common XSS test payloads."""
    return [
        '<script>alert("XSS")</script>',
        '<img src=x onerror=alert(1)>',
        '<svg onload=alert(1)>',
        'javascript:alert(1)',
        '" onfocus=alert(1) autofocus="',
        "'-alert(1)-'",
        '<iframe src="javascript:alert(1)">',
    ]


def generate_sqli_payloads() -> list[str]:
    """Generate common SQL injection test payloads."""
    return [
        "' OR '1'='1",
        "'; DROP TABLE users; --",
        "1 UNION SELECT * FROM users",
        "admin'--",
        "1' AND '1'='1",
        "' OR 1=1 --",
        "'; INSERT INTO admin VALUES('hacker','pass'); --",
    ]
```

### Pytest Tests for Security Testing

```python
"""Tests for security attack testing framework."""

import pytest
from security_framework import (
    InputValidator, AccessControlTester, SecurityTestCase,
    SecurityTestResult, AttackCategory,
    generate_xss_payloads, generate_sqli_payloads,
)


class TestInputValidator:
    def test_detects_basic_sql_injection(self):
        findings = InputValidator.check_sql_injection("' OR '1'='1")
        assert len(findings) > 0

    def test_detects_union_injection(self):
        findings = InputValidator.check_sql_injection("1 UNION SELECT * FROM users")
        assert len(findings) > 0

    def test_clean_input_passes(self):
        findings = InputValidator.check_sql_injection("John Smith")
        assert len(findings) == 0

    def test_detects_script_tag_xss(self):
        findings = InputValidator.check_xss('<script>alert("XSS")</script>')
        assert len(findings) > 0

    def test_detects_event_handler_xss(self):
        findings = InputValidator.check_xss('<img src=x onerror=alert(1)>')
        assert len(findings) > 0

    def test_clean_html_passes(self):
        findings = InputValidator.check_xss("Hello World")
        assert len(findings) == 0

    def test_sanitize_removes_dangerous_chars(self):
        result = InputValidator.sanitize_input("admin'; DROP TABLE--")
        assert "'" not in result
        assert "--" not in result

    def test_sanitize_escapes_html(self):
        result = InputValidator.sanitize_input("<script>alert(1)</script>")
        assert "<script>" not in result


class TestAccessControl:
    def test_role_can_access_permitted_resource(self):
        ac = AccessControlTester()
        ac.add_rule("user", "/profile")
        assert ac.check_access("user", "/profile") is True

    def test_role_cannot_access_unpermitted_resource(self):
        ac = AccessControlTester()
        ac.add_rule("user", "/profile")
        assert ac.check_access("user", "/admin") is False

    def test_detect_privilege_escalation(self):
        ac = AccessControlTester()
        ac.add_rule("user", "/profile")
        ac.add_rule("user", "/admin/dashboard")
        ac.add_rule("admin", "/admin/dashboard")
        violations = ac.find_privilege_escalation("user", "admin")
        assert len(violations) > 0
        assert "/admin/dashboard" in violations[0]

    def test_no_violations_when_access_is_correct(self):
        ac = AccessControlTester()
        ac.add_rule("user", "/profile")
        ac.add_rule("admin", "/admin/dashboard")
        violations = ac.find_privilege_escalation("user", "admin")
        assert len(violations) == 0


class TestSecurityTestCase:
    def test_blocked_attack_passes(self):
        tc = SecurityTestCase(
            name="XSS test", category=AttackCategory.XSS,
            payload="<script>alert(1)</script>", target_field="name",
            expected_blocked=True,
        )
        result = SecurityTestResult(test_case=tc, was_blocked=True, response_code=400)
        assert result.passed

    def test_unblocked_attack_fails(self):
        tc = SecurityTestCase(
            name="SQLi test", category=AttackCategory.INJECTION,
            payload="' OR '1'='1", target_field="username",
            expected_blocked=True,
        )
        result = SecurityTestResult(test_case=tc, was_blocked=False, response_code=200)
        assert not result.passed


class TestPayloadGeneration:
    def test_xss_payloads_not_empty(self):
        payloads = generate_xss_payloads()
        assert len(payloads) > 5

    def test_sqli_payloads_not_empty(self):
        payloads = generate_sqli_payloads()
        assert len(payloads) > 5

    @pytest.mark.parametrize("payload", generate_xss_payloads())
    def test_validator_catches_all_xss_payloads(self, payload):
        findings = InputValidator.check_xss(payload)
        assert len(findings) > 0, f"Missed XSS payload: {payload}"

    @pytest.mark.parametrize("payload", generate_sqli_payloads())
    def test_validator_catches_all_sqli_payloads(self, payload):
        findings = InputValidator.check_sql_injection(payload)
        assert len(findings) > 0, f"Missed SQLi payload: {payload}"
```

## JavaScript Implementation with Jest Tests

```javascript
// security-tester.js

class InputValidator {
  static SQL_PATTERNS = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b)/i,
    /('|"|;|--)/,
    /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i,
  ];

  static XSS_PATTERNS = [
    /<script[^>]*>/i,
    /javascript\s*:/i,
    /on\w+\s*=/i,
    /<iframe/i,
  ];

  static checkSqlInjection(input) {
    return this.SQL_PATTERNS
      .filter(p => p.test(input))
      .map(p => `SQL injection pattern: ${p}`);
  }

  static checkXss(input) {
    return this.XSS_PATTERNS
      .filter(p => p.test(input))
      .map(p => `XSS pattern: ${p}`);
  }

  static sanitize(input) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

class AccessControlTester {
  constructor() {
    this.rules = new Map();
  }

  addRule(role, resource) {
    if (!this.rules.has(role)) this.rules.set(role, new Set());
    this.rules.get(role).add(resource);
  }

  checkAccess(role, resource) {
    return this.rules.has(role) && this.rules.get(role).has(resource);
  }
}

// security-tester.test.js

describe("InputValidator", () => {
  test("detects SQL injection", () => {
    expect(InputValidator.checkSqlInjection("' OR '1'='1").length).toBeGreaterThan(0);
  });

  test("passes clean input", () => {
    expect(InputValidator.checkSqlInjection("John Smith")).toHaveLength(0);
  });

  test("detects XSS script tag", () => {
    expect(InputValidator.checkXss("<script>alert(1)</script>").length).toBeGreaterThan(0);
  });

  test("sanitizes HTML entities", () => {
    const result = InputValidator.sanitize('<script>alert("XSS")</script>');
    expect(result).not.toContain("<script>");
    expect(result).toContain("&lt;script&gt;");
  });
});

describe("AccessControlTester", () => {
  test("permits access for valid role", () => {
    const ac = new AccessControlTester();
    ac.addRule("user", "/profile");
    expect(ac.checkAccess("user", "/profile")).toBe(true);
  });

  test("denies access for invalid role", () => {
    const ac = new AccessControlTester();
    ac.addRule("admin", "/admin");
    expect(ac.checkAccess("user", "/admin")).toBe(false);
  });
});
```

## Best Practices

```
- [ ] Map your test cases to the OWASP Top 10 for coverage tracking
- [ ] Run security tests in CI/CD alongside functional tests
- [ ] Parameterize attack payloads so new vectors can be added easily
- [ ] Test both that attacks are blocked AND that valid input still works
- [ ] Use role-based access control tests for every API endpoint
- [ ] Automate HTTPS/TLS configuration verification
- [ ] Include security headers testing (CSP, HSTS, X-Frame-Options)
- [ ] Fuzz test inputs with boundary values and malformed data
- [ ] Monitor for new CVEs affecting your dependencies
- [ ] Document the threat model before writing security tests
```

## Conclusion

Automated security testing transforms security from a periodic audit into a continuous validation discipline. By encoding attack patterns into parameterized test suites and integrating them into your CI/CD pipeline, test automation professionals can ensure that defenses against injection, XSS, broken access control, and other OWASP Top 10 risks are verified with every build. The key is thinking adversarially: every input field is a potential attack surface, every API endpoint needs access control verification, and every dependency needs vulnerability scanning.

## Key Takeaways

1. The OWASP Top 10 provides a prioritized framework for organizing security test cases by risk category.
2. Input validation testing should cover SQL injection, XSS, command injection, and path traversal at minimum.
3. Access control tests must verify that every role can only access its permitted resources, and that privilege escalation is impossible.
4. Parameterized test cases allow you to expand payload coverage without rewriting test logic.
5. Security tests should verify both blocking (malicious input rejected) and allow-listing (legitimate input accepted).
6. Automated security testing complements but does not replace manual penetration testing and security code review.
7. Track security test coverage against your threat model to identify gaps before attackers do.
