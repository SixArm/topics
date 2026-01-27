# Penetration Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Penetration testing, commonly known as pen testing, is the practice of conducting authorized, simulated attacks against computer systems, networks, and applications to identify security vulnerabilities before malicious actors exploit them. For test automation professionals, penetration testing represents a critical extension of the testing discipline: while functional tests verify that systems do what they should, penetration tests verify that systems do not do what they should not. Integrating security testing into automated test pipelines helps organizations shift security left, catching vulnerabilities early in the development lifecycle rather than discovering them in production.

## What is Penetration Testing?

Penetration testing is a systematic process of probing a system for security weaknesses by simulating the tactics, techniques, and procedures that real attackers would use. Unlike vulnerability scanning, which identifies known weaknesses, penetration testing actively exploits vulnerabilities to determine their real-world impact and severity.

### Penetration Testing Methodology

```
┌─────────────────────────────────────────────────────────────┐
│              Penetration Testing Lifecycle                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────────┐           │
│  │  Recon   │──►│ Scanning │──►│ Enumeration  │           │
│  │          │   │          │   │              │           │
│  └──────────┘   └──────────┘   └──────┬───────┘           │
│  Gather info    Find open     Map services,│               │
│  about target   ports, svcs   versions     │               │
│                                            ▼               │
│  ┌──────────┐   ┌──────────┐   ┌──────────────┐           │
│  │ Reporting│◄──│  Post-   │◄──│Exploitation  │           │
│  │          │   │ Exploit  │   │              │           │
│  └──────────┘   └──────────┘   └──────────────┘           │
│  Document       Escalate       Exploit found               │
│  findings       privileges     vulnerabilities             │
│                                                             │
│  Testing Scope Types:                                       │
│  ┌────────────────────────────────────────────────┐        │
│  │ Black Box │ No prior knowledge of the system   │        │
│  │ Grey Box  │ Partial knowledge (e.g., user creds)│       │
│  │ White Box │ Full knowledge (source code access) │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
│  OWASP Top 10 Coverage:                                     │
│  ├── A01: Broken Access Control                             │
│  ├── A02: Cryptographic Failures                            │
│  ├── A03: Injection                                         │
│  ├── A04: Insecure Design                                   │
│  ├── A05: Security Misconfiguration                         │
│  ├── A06: Vulnerable Components                             │
│  ├── A07: Auth & Identity Failures                          │
│  ├── A08: Software & Data Integrity                         │
│  ├── A09: Logging & Monitoring Failures                     │
│  └── A10: Server-Side Request Forgery                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Where Pen Testing Fits in the SDLC

```
┌─────────────────────────────────────────────────────────────┐
│          Security Testing Across the SDLC                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Design    ──►  Develop   ──►   Test    ──►  Deploy        │
│    │               │              │             │           │
│    ▼               ▼              ▼             ▼           │
│  Threat         SAST           DAST          Pen Test       │
│  Modeling    (Static scan)  (Dynamic scan)  (Manual +       │
│                                              Automated)     │
│  Security      Code          Automated       Full scope     │
│  requirements  review        vuln scan       attack sim     │
│                                                             │
│  ◄──── Shift Left: Find issues earlier ────►               │
│  ◄──── Lower cost          Higher fidelity ────►           │
│                                                             │
│  Test Automation's Role:                                    │
│  ┌─────────────────────────────────────────────┐           │
│  │ CI/CD Pipeline                               │           │
│  │ ┌──────┐ ┌──────┐ ┌──────┐ ┌────────────┐  │           │
│  │ │ Unit │►│SAST  │►│ DAST │►│ Automated  │  │           │
│  │ │Tests │ │Scan  │ │Scan  │ │ Pen Tests  │  │           │
│  │ └──────┘ └──────┘ └──────┘ └────────────┘  │           │
│  │           ▲                    ▲             │           │
│  │           │                    │             │           │
│  │    Automated gate      Scheduled runs       │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Implementation: Python Automated Security Tests

### OWASP-Aligned Security Test Suite

```python
# test_security_owasp.py

"""
Automated security tests aligned with OWASP Top 10.
These tests can run in CI/CD to catch common vulnerabilities.

IMPORTANT: Only run against systems you have authorization to test.
"""

import pytest
import requests
import re
import json
from urllib.parse import urlencode, quote


class TestBrokenAccessControl:
    """OWASP A01: Broken Access Control."""

    def test_idor_protection(self, api_url, auth_headers_user_a,
                              auth_headers_user_b):
        """Test that users cannot access other users' resources."""
        # User A creates a resource
        response = requests.post(
            f"{api_url}/api/documents",
            headers=auth_headers_user_a,
            json={"title": "Private Document", "content": "Secret data"}
        )
        assert response.status_code == 201
        doc_id = response.json()["id"]

        # User B should NOT be able to access User A's document
        response = requests.get(
            f"{api_url}/api/documents/{doc_id}",
            headers=auth_headers_user_b
        )
        assert response.status_code in [403, 404], (
            f"IDOR vulnerability: User B accessed User A's document "
            f"(status {response.status_code})"
        )

    def test_privilege_escalation(self, api_url, auth_headers_regular_user):
        """Test that regular users cannot access admin endpoints."""
        admin_endpoints = [
            "/api/admin/users",
            "/api/admin/settings",
            "/api/admin/logs",
            "/api/admin/export",
        ]

        for endpoint in admin_endpoints:
            response = requests.get(
                f"{api_url}{endpoint}",
                headers=auth_headers_regular_user
            )
            assert response.status_code in [401, 403], (
                f"Privilege escalation: Regular user accessed {endpoint} "
                f"(status {response.status_code})"
            )

    def test_path_traversal(self, api_url, auth_headers_regular_user):
        """Test that path traversal attacks are blocked."""
        traversal_payloads = [
            "../../../etc/passwd",
            "..%2F..%2F..%2Fetc%2Fpasswd",
            "....//....//....//etc/passwd",
            "%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd",
        ]

        for payload in traversal_payloads:
            response = requests.get(
                f"{api_url}/api/files/{payload}",
                headers=auth_headers_regular_user
            )
            assert response.status_code in [400, 403, 404], (
                f"Path traversal not blocked: {payload}"
            )
            if response.status_code == 200:
                assert "root:" not in response.text, (
                    f"Path traversal successful with: {payload}"
                )


class TestInjection:
    """OWASP A03: Injection."""

    def test_sql_injection_in_query(self, api_url, auth_headers):
        """Test SQL injection in search parameters."""
        sqli_payloads = [
            "' OR '1'='1",
            "'; DROP TABLE users; --",
            "1 UNION SELECT username, password FROM users --",
            "' OR 1=1 --",
            "admin'--",
        ]

        for payload in sqli_payloads:
            response = requests.get(
                f"{api_url}/api/search",
                params={"q": payload},
                headers=auth_headers
            )
            # Should not return all records or error with SQL details
            if response.status_code == 200:
                data = response.json()
                assert len(data.get("results", [])) < 100, (
                    f"Possible SQL injection: payload '{payload}' "
                    f"returned {len(data['results'])} results"
                )
            # Should not expose SQL error details
            assert "SQL" not in response.text.upper() or \
                   "syntax" not in response.text.lower(), (
                f"SQL error exposed with payload: {payload}"
            )

    def test_xss_in_user_input(self, api_url, auth_headers):
        """Test that XSS payloads are sanitized."""
        xss_payloads = [
            '<script>alert("XSS")</script>',
            '<img src=x onerror=alert("XSS")>',
            '"><script>alert(document.cookie)</script>',
            "javascript:alert('XSS')",
            '<svg onload=alert("XSS")>',
        ]

        for payload in xss_payloads:
            # Submit XSS payload
            response = requests.post(
                f"{api_url}/api/comments",
                headers=auth_headers,
                json={"text": payload}
            )

            if response.status_code in [200, 201]:
                comment_id = response.json().get("id")
                # Retrieve and verify it's sanitized
                get_response = requests.get(
                    f"{api_url}/api/comments/{comment_id}",
                    headers=auth_headers
                )
                content = get_response.json().get("text", "")
                assert "<script>" not in content.lower(), (
                    f"XSS payload not sanitized: {payload}"
                )
                assert "onerror=" not in content.lower(), (
                    f"XSS event handler not sanitized: {payload}"
                )

    def test_command_injection(self, api_url, auth_headers):
        """Test that OS command injection is prevented."""
        cmd_payloads = [
            "; ls -la",
            "| cat /etc/passwd",
            "$(whoami)",
            "`id`",
            "& dir",
        ]

        for payload in cmd_payloads:
            response = requests.post(
                f"{api_url}/api/tools/ping",
                headers=auth_headers,
                json={"host": f"localhost{payload}"}
            )
            if response.status_code == 200:
                content = response.text
                assert "root:" not in content, (
                    f"Command injection successful: {payload}"
                )
                assert "uid=" not in content, (
                    f"Command injection successful: {payload}"
                )


class TestSecurityMisconfiguration:
    """OWASP A05: Security Misconfiguration."""

    def test_security_headers(self, api_url):
        """Verify required security headers are present."""
        response = requests.get(api_url)

        required_headers = {
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": ["DENY", "SAMEORIGIN"],
            "X-XSS-Protection": "1; mode=block",
            "Strict-Transport-Security": None,  # Just check presence
        }

        for header, expected in required_headers.items():
            value = response.headers.get(header)
            assert value is not None, (
                f"Missing security header: {header}"
            )
            if isinstance(expected, list):
                assert value in expected, (
                    f"{header}: {value} not in {expected}"
                )
            elif expected is not None:
                assert value == expected, (
                    f"{header}: expected '{expected}', got '{value}'"
                )

    def test_no_sensitive_info_in_errors(self, api_url):
        """Verify error responses don't leak sensitive information."""
        # Trigger various errors
        error_triggers = [
            ("GET", f"{api_url}/api/nonexistent-endpoint"),
            ("POST", f"{api_url}/api/users"),  # Missing body
            ("GET", f"{api_url}/api/users/invalid-id-format"),
        ]

        sensitive_patterns = [
            r"stack trace",
            r"traceback",
            r"at \w+\.\w+\(",  # Java/JS stack frames
            r"File \".*\.py\"",  # Python file paths
            r"node_modules",
            r"password",
            r"secret",
            r"database.*connection",
        ]

        for method, url in error_triggers:
            response = requests.request(method, url)
            content = response.text.lower()

            for pattern in sensitive_patterns:
                assert not re.search(pattern, content, re.IGNORECASE), (
                    f"Sensitive info in error response from {url}: "
                    f"matched pattern '{pattern}'"
                )

    def test_cors_configuration(self, api_url):
        """Verify CORS is not overly permissive."""
        response = requests.options(
            f"{api_url}/api/users",
            headers={
                "Origin": "https://evil-site.com",
                "Access-Control-Request-Method": "GET",
            }
        )

        acao = response.headers.get("Access-Control-Allow-Origin", "")
        assert acao != "*", (
            "CORS allows all origins (*) - should be restricted"
        )
        assert "evil-site.com" not in acao, (
            "CORS reflects arbitrary origin"
        )


class TestAuthenticationFailures:
    """OWASP A07: Identification and Authentication Failures."""

    def test_brute_force_protection(self, api_url):
        """Test that brute force login attempts are rate limited."""
        failed_attempts = 0

        for i in range(20):
            response = requests.post(
                f"{api_url}/api/auth/login",
                json={
                    "email": "admin@example.com",
                    "password": f"wrong_password_{i}"
                }
            )
            if response.status_code == 429:
                # Rate limiting kicked in - good
                break
            failed_attempts += 1

        assert failed_attempts < 15, (
            f"No rate limiting after {failed_attempts} failed login attempts"
        )

    def test_session_token_security(self, api_url):
        """Verify session tokens have proper security attributes."""
        response = requests.post(
            f"{api_url}/api/auth/login",
            json={
                "email": "testuser@example.com",
                "password": "testpassword"
            }
        )

        if response.status_code == 200:
            # Check cookie security attributes
            for cookie in response.cookies:
                if "session" in cookie.name.lower() or \
                   "token" in cookie.name.lower():
                    assert cookie.secure, (
                        f"Cookie {cookie.name} missing Secure flag"
                    )
                    assert "httponly" in str(cookie._rest).lower() or \
                           cookie.has_nonstandard_attr("HttpOnly"), (
                        f"Cookie {cookie.name} missing HttpOnly flag"
                    )

    def test_password_in_response(self, api_url, auth_headers):
        """Verify passwords are never returned in API responses."""
        response = requests.get(
            f"{api_url}/api/users/me",
            headers=auth_headers
        )

        if response.status_code == 200:
            user_data = response.text.lower()
            assert "password" not in user_data or \
                   '"password":null' in user_data or \
                   '"password":""' in user_data, (
                "Password field present in user response"
            )


# Fixtures for test setup
@pytest.fixture
def api_url():
    """Base URL for the application under test."""
    import os
    return os.getenv("PENTEST_TARGET_URL", "http://localhost:3000")


@pytest.fixture
def auth_headers(api_url):
    """Authenticated headers for testing."""
    import os
    response = requests.post(
        f"{api_url}/api/auth/login",
        json={
            "email": os.getenv("TEST_USER_EMAIL", "testuser@example.com"),
            "password": os.getenv("TEST_USER_PASSWORD", "testpassword"),
        }
    )
    token = response.json().get("token", "")
    return {"Authorization": f"Bearer {token}",
            "Content-Type": "application/json"}


@pytest.fixture
def auth_headers_regular_user(api_url):
    """Headers for a regular (non-admin) user."""
    import os
    response = requests.post(
        f"{api_url}/api/auth/login",
        json={
            "email": os.getenv("TEST_REGULAR_EMAIL", "user@example.com"),
            "password": os.getenv("TEST_REGULAR_PASSWORD", "userpassword"),
        }
    )
    token = response.json().get("token", "")
    return {"Authorization": f"Bearer {token}",
            "Content-Type": "application/json"}


@pytest.fixture
def auth_headers_user_a(api_url):
    """Headers for User A (IDOR testing)."""
    response = requests.post(
        f"{api_url}/api/auth/login",
        json={"email": "usera@example.com", "password": "passworda"}
    )
    token = response.json().get("token", "")
    return {"Authorization": f"Bearer {token}",
            "Content-Type": "application/json"}


@pytest.fixture
def auth_headers_user_b(api_url):
    """Headers for User B (IDOR testing)."""
    response = requests.post(
        f"{api_url}/api/auth/login",
        json={"email": "userb@example.com", "password": "passwordb"}
    )
    token = response.json().get("token", "")
    return {"Authorization": f"Bearer {token}",
            "Content-Type": "application/json"}
```

### ZAP Integration for Automated DAST

```python
# test_zap_scan.py

"""
OWASP ZAP integration for automated dynamic application security testing.
ZAP can be run in CI/CD via Docker and controlled via its API.

IMPORTANT: Only scan applications you have authorization to test.
"""

import pytest
import requests
import time
import os


class ZAPClient:
    """Client for interacting with OWASP ZAP API."""

    def __init__(self, zap_url="http://localhost:8080",
                 api_key="changeme"):
        self.zap_url = zap_url
        self.api_key = api_key

    def _request(self, endpoint, params=None):
        params = params or {}
        params["apikey"] = self.api_key
        response = requests.get(
            f"{self.zap_url}/{endpoint}",
            params=params
        )
        return response.json()

    def spider_scan(self, target_url):
        """Run ZAP spider to discover application pages."""
        result = self._request("JSON/spider/action/scan/", {
            "url": target_url,
            "maxChildren": "10",
            "recurse": "true"
        })
        scan_id = result.get("scan")

        # Wait for spider to complete
        while True:
            status = self._request("JSON/spider/view/status/", {
                "scanId": scan_id
            })
            if int(status.get("status", 0)) >= 100:
                break
            time.sleep(2)

        return scan_id

    def active_scan(self, target_url):
        """Run ZAP active scanner against target."""
        result = self._request("JSON/ascan/action/scan/", {
            "url": target_url,
            "recurse": "true"
        })
        scan_id = result.get("scan")

        # Wait for active scan to complete
        while True:
            status = self._request("JSON/ascan/view/status/", {
                "scanId": scan_id
            })
            if int(status.get("status", 0)) >= 100:
                break
            time.sleep(5)

        return scan_id

    def get_alerts(self, base_url, risk_level="High"):
        """Get security alerts from ZAP."""
        result = self._request("JSON/alert/view/alerts/", {
            "baseurl": base_url,
            "riskId": {"Informational": "0", "Low": "1",
                       "Medium": "2", "High": "3"}.get(risk_level, "2")
        })
        return result.get("alerts", [])


@pytest.fixture(scope="session")
def zap_client():
    """Initialize ZAP client."""
    zap_url = os.getenv("ZAP_URL", "http://localhost:8080")
    api_key = os.getenv("ZAP_API_KEY", "changeme")
    return ZAPClient(zap_url, api_key)


@pytest.fixture(scope="session")
def target_url():
    """Target application URL."""
    return os.getenv("PENTEST_TARGET_URL", "http://localhost:3000")


class TestZAPScan:
    """Run and validate OWASP ZAP scan results."""

    @pytest.fixture(autouse=True, scope="class")
    def run_scan(self, zap_client, target_url):
        """Run ZAP spider and active scan before tests."""
        zap_client.spider_scan(target_url)
        zap_client.active_scan(target_url)

    def test_no_high_risk_vulnerabilities(self, zap_client, target_url):
        """No high-risk vulnerabilities should be found."""
        high_alerts = zap_client.get_alerts(target_url, "High")
        assert len(high_alerts) == 0, (
            f"Found {len(high_alerts)} high-risk vulnerabilities:\n" +
            "\n".join(
                f"  - {a['alert']}: {a['url']}"
                for a in high_alerts
            )
        )

    def test_no_medium_risk_vulnerabilities(self, zap_client, target_url):
        """No medium-risk vulnerabilities should be found."""
        medium_alerts = zap_client.get_alerts(target_url, "Medium")

        # Filter out accepted risks
        accepted_risks = os.getenv("ZAP_ACCEPTED_RISKS", "").split(",")
        unaccepted = [
            a for a in medium_alerts
            if a["alert"] not in accepted_risks
        ]

        assert len(unaccepted) == 0, (
            f"Found {len(unaccepted)} medium-risk vulnerabilities:\n" +
            "\n".join(
                f"  - {a['alert']}: {a['url']}"
                for a in unaccepted
            )
        )
```

## Implementation: JavaScript/TypeScript Security Tests

### Playwright Security Tests

```typescript
// e2e/security.spec.ts

import { test, expect } from '@playwright/test';

/**
 * Browser-based security tests using Playwright.
 * Tests that require a real browser context for validation.
 *
 * IMPORTANT: Only test applications you have authorization to test.
 */

test.describe('Browser Security Tests', () => {
  test('should set secure cookie attributes', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'testuser@example.com');
    await page.fill('[data-testid="password"]', 'testpassword');
    await page.click('[data-testid="login-button"]');

    await page.waitForURL('**/dashboard');

    const cookies = await page.context().cookies();
    const sessionCookies = cookies.filter(
      c => c.name.includes('session') || c.name.includes('token')
    );

    for (const cookie of sessionCookies) {
      expect(cookie.httpOnly).toBe(true);
      // In non-localhost environments, check secure flag
      if (!cookie.domain.includes('localhost')) {
        expect(cookie.secure).toBe(true);
      }
      expect(cookie.sameSite).toBeTruthy();
    }
  });

  test('should prevent clickjacking with frame options', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers() || {};

    const xfo = headers['x-frame-options'];
    const csp = headers['content-security-policy'] || '';

    // Either X-Frame-Options or CSP frame-ancestors should be set
    const hasFrameProtection =
      (xfo && ['DENY', 'SAMEORIGIN'].includes(xfo.toUpperCase())) ||
      csp.includes('frame-ancestors');

    expect(hasFrameProtection).toBe(true);
  });

  test('should have Content Security Policy', async ({ page }) => {
    const response = await page.goto('/');
    const csp = response?.headers()['content-security-policy'];

    expect(csp).toBeTruthy();
    // CSP should not allow unsafe-inline scripts
    if (csp) {
      expect(csp).not.toContain("'unsafe-inline'");
      expect(csp).not.toContain("'unsafe-eval'");
    }
  });

  test('should not expose sensitive data in page source', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'testuser@example.com');
    await page.fill('[data-testid="password"]', 'testpassword');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('**/dashboard');

    const pageContent = await page.content();

    // Check for sensitive data leaks
    expect(pageContent).not.toMatch(/password['"]\s*:\s*['"]/i);
    expect(pageContent).not.toMatch(/secret['"]\s*:\s*['"]/i);
    expect(pageContent).not.toMatch(/api[_-]?key['"]\s*:\s*['"]/i);
    expect(pageContent).not.toMatch(
      /[a-zA-Z0-9]{20,}/  // Long tokens in page source
    );
  });

  test('should enforce HTTPS redirect', async ({ page }) => {
    const baseUrl = process.env.TEST_BASE_URL || '';

    // Skip for localhost testing
    if (baseUrl.includes('localhost')) {
      test.skip();
      return;
    }

    const httpUrl = baseUrl.replace('https://', 'http://');
    const response = await page.goto(httpUrl);

    // Should redirect to HTTPS
    expect(page.url()).toMatch(/^https:\/\//);
  });

  test('should handle XSS attempts in form inputs', async ({ page }) => {
    await page.goto('/search');

    const xssPayload = '<script>alert("XSS")</script>';
    await page.fill('[data-testid="search-input"]', xssPayload);
    await page.click('[data-testid="search-button"]');

    // The script should not execute
    const dialogPromise = page.waitForEvent('dialog', { timeout: 3000 })
      .catch(() => null);

    const dialog = await dialogPromise;
    expect(dialog).toBeNull();

    // Check that the payload is escaped in the page
    const pageContent = await page.content();
    expect(pageContent).not.toContain('<script>alert("XSS")</script>');
  });

  test('should invalidate session on logout', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'testuser@example.com');
    await page.fill('[data-testid="password"]', 'testpassword');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('**/dashboard');

    // Capture session token
    const cookiesBefore = await page.context().cookies();
    const sessionBefore = cookiesBefore.find(
      c => c.name.includes('session')
    );

    // Logout
    await page.click('[data-testid="logout-button"]');

    // Verify session is invalidated
    const cookiesAfter = await page.context().cookies();
    const sessionAfter = cookiesAfter.find(
      c => c.name.includes('session')
    );

    // Session cookie should be removed or changed
    if (sessionAfter) {
      expect(sessionAfter.value).not.toBe(sessionBefore?.value);
    }

    // Accessing protected page should redirect to login
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login/);
  });
});
```

### Jest API Security Tests

```typescript
// tests/api-security.test.ts

/**
 * API-level security tests using Jest.
 * These tests validate security controls at the HTTP layer.
 */

describe('API Security Tests', () => {
  const API_URL = process.env.PENTEST_TARGET_URL || 'http://localhost:3000';

  describe('Input Validation', () => {
    test('should reject SQL injection in query parameters', async () => {
      const payloads = [
        "' OR '1'='1",
        "1; DROP TABLE users --",
        "' UNION SELECT * FROM users --",
      ];

      for (const payload of payloads) {
        const response = await fetch(
          `${API_URL}/api/users?search=${encodeURIComponent(payload)}`
        );

        // Should not return 200 with all data
        if (response.status === 200) {
          const data = await response.json();
          expect(data.length || 0).toBeLessThan(100);
        }

        // Should not expose SQL errors
        const text = await response.clone().text();
        expect(text.toLowerCase()).not.toContain('sql syntax');
        expect(text.toLowerCase()).not.toContain('mysql');
        expect(text.toLowerCase()).not.toContain('postgresql');
      }
    });

    test('should enforce request size limits', async () => {
      const largePayload = 'x'.repeat(10 * 1024 * 1024); // 10MB

      const response = await fetch(`${API_URL}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: largePayload }),
      });

      expect(response.status).toBe(413); // Payload Too Large
    });

    test('should validate content type', async () => {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: '{"name": "test"}',
      });

      expect(response.status).toBe(415); // Unsupported Media Type
    });
  });

  describe('Rate Limiting', () => {
    test('should rate limit API endpoints', async () => {
      const requests = Array.from({ length: 100 }, () =>
        fetch(`${API_URL}/api/users`)
      );

      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status === 429);

      expect(rateLimited.length).toBeGreaterThan(0);
    });

    test('should include rate limit headers', async () => {
      const response = await fetch(`${API_URL}/api/users`);

      // Check for standard rate limit headers
      const hasRateHeaders =
        response.headers.has('x-ratelimit-limit') ||
        response.headers.has('ratelimit-limit') ||
        response.headers.has('x-rate-limit-limit');

      expect(hasRateHeaders).toBe(true);
    });
  });

  describe('Authentication Security', () => {
    test('should not accept expired tokens', async () => {
      // Use a known expired JWT (for testing purposes)
      const expiredToken = 'eyJhbGciOiJIUzI1NiJ9.' +
        'eyJleHAiOjE1MDAwMDAwMDB9.' +
        'invalid-signature';

      const response = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${expiredToken}` },
      });

      expect(response.status).toBe(401);
    });

    test('should not accept tokens with invalid signatures', async () => {
      const tamperedToken = 'eyJhbGciOiJIUzI1NiJ9.' +
        'eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ.' +
        'tampered-signature';

      const response = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${tamperedToken}` },
      });

      expect(response.status).toBe(401);
    });
  });
});
```

## Best Practices

### Penetration Testing Checklist

```markdown
## Penetration Testing Best Practices

### Authorization and Scope
- [ ] Obtain written authorization before testing
- [ ] Define clear scope (in-scope and out-of-scope systems)
- [ ] Agree on testing window and notification procedures
- [ ] Identify emergency contacts for critical findings
- [ ] Document rules of engagement

### Test Coverage (OWASP Top 10)
- [ ] Test for broken access control (IDOR, privilege escalation)
- [ ] Verify cryptographic implementations
- [ ] Test all input fields for injection vulnerabilities
- [ ] Review security of design patterns
- [ ] Check for security misconfigurations
- [ ] Scan for vulnerable third-party components
- [ ] Test authentication and session management
- [ ] Verify software and data integrity controls
- [ ] Check logging and monitoring adequacy
- [ ] Test for server-side request forgery (SSRF)

### Automation Integration
- [ ] Run SAST scans in CI/CD on every commit
- [ ] Run DAST scans (ZAP/Burp) in CI/CD on every deployment
- [ ] Automate regression tests for previously found vulnerabilities
- [ ] Set security gates that block deployment on critical findings
- [ ] Track security test coverage alongside functional coverage

### Reporting
- [ ] Document each finding with reproduction steps
- [ ] Classify severity using CVSS or similar framework
- [ ] Provide remediation recommendations
- [ ] Include proof-of-concept for critical findings
- [ ] Track remediation status to closure
- [ ] Retest after fixes are applied

### Ethical and Legal
- [ ] Never test systems without explicit authorization
- [ ] Protect any sensitive data discovered during testing
- [ ] Report critical vulnerabilities immediately
- [ ] Follow responsible disclosure practices
- [ ] Maintain confidentiality of findings
```

## Conclusion

Penetration testing is a vital practice that goes beyond traditional functional testing to evaluate the security posture of applications and systems. For test automation professionals, integrating security tests into CI/CD pipelines transforms penetration testing from an occasional manual exercise into a continuous security validation practice. By automating tests for the OWASP Top 10 vulnerabilities, integrating DAST tools like OWASP ZAP, and using browser automation frameworks like Playwright for client-side security checks, teams can catch security issues before they reach production. The goal is not to replace expert manual penetration testing but to supplement it with automated checks that catch regressions and known vulnerability patterns continuously.

## Key Takeaways

1. Penetration testing is authorized simulated attack, never test systems without explicit written permission; establishing clear scope and rules of engagement is a prerequisite, not an option
2. Automate OWASP Top 10 checks in your CI/CD pipeline to catch common vulnerabilities like injection, broken access control, and security misconfiguration on every build
3. Use DAST tools like OWASP ZAP integrated into your test pipeline to perform automated dynamic security scans that complement static analysis
4. Browser-based security tests with Playwright can validate client-side protections including cookie security attributes, CSP enforcement, XSS prevention, and clickjacking defenses
5. Automated security tests should serve as regression guards; once a vulnerability is found and fixed, add a test to ensure it never reappears
6. Security test results should gate deployments; configure CI/CD to block releases when high-severity vulnerabilities are detected
7. Automated security testing supplements but does not replace manual expert penetration testing; complex business logic flaws and chained attack scenarios still require human expertise
