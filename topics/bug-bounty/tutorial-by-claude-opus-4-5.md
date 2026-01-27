# Bug Bounty: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

A bug bounty program is a crowdsourced security initiative that rewards external researchers for discovering and responsibly disclosing vulnerabilities. For test automation professionals, understanding bug bounty programs helps in designing security-aware tests, understanding attack vectors, and participating in the broader security ecosystem.

## What is a Bug Bounty Program?

Bug bounty programs invite security researchers to find and report vulnerabilities in exchange for monetary rewards. These programs complement internal security testing by leveraging diverse external expertise.

### Program Structure

```
┌─────────────────────────────────────────────────────────────┐
│                  Bug Bounty Ecosystem                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Organization                    Security Researchers       │
│  ────────────                    ────────────────────       │
│  • Defines scope                 • Find vulnerabilities     │
│  • Sets reward tiers             • Document findings        │
│  • Triages reports               • Submit reports           │
│  • Pays bounties                 • Receive rewards          │
│  • Fixes vulnerabilities         • Build reputation         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    Bug Bounty Platform                       │
│  (HackerOne, Bugcrowd, Intigriti, etc.)                    │
│  • Manages submissions           • Mediates disputes        │
│  • Facilitates payments          • Validates researchers    │
└─────────────────────────────────────────────────────────────┘
```

### Severity and Rewards

| Severity | Impact | Typical Reward |
|----------|--------|----------------|
| Critical | RCE, data breach, account takeover | $5,000 - $100,000+ |
| High | Significant security flaw | $1,000 - $10,000 |
| Medium | Limited impact vulnerability | $250 - $2,000 |
| Low | Minor security issue | $50 - $500 |
| Informational | Best practice deviation | Recognition only |

## Common Vulnerability Categories

### OWASP Top 10 Vulnerabilities

```python
vulnerability_categories = {
    'injection': {
        'description': 'Untrusted data sent to interpreter',
        'examples': ['SQL injection', 'Command injection', 'LDAP injection'],
        'test_approach': 'Input fuzzing, payload injection'
    },
    'broken_authentication': {
        'description': 'Flaws in authentication/session management',
        'examples': ['Weak passwords', 'Session fixation', 'Credential stuffing'],
        'test_approach': 'Brute force, session analysis'
    },
    'sensitive_data_exposure': {
        'description': 'Inadequate protection of sensitive data',
        'examples': ['Unencrypted data', 'Weak crypto', 'PII exposure'],
        'test_approach': 'Traffic analysis, data discovery'
    },
    'xxe': {
        'description': 'XML External Entity attacks',
        'examples': ['File disclosure', 'SSRF via XML', 'DoS'],
        'test_approach': 'Malformed XML payloads'
    },
    'broken_access_control': {
        'description': 'Improper access restrictions',
        'examples': ['IDOR', 'Privilege escalation', 'Path traversal'],
        'test_approach': 'Access control testing, fuzzing IDs'
    },
    'security_misconfiguration': {
        'description': 'Insecure default configurations',
        'examples': ['Default credentials', 'Verbose errors', 'Open cloud storage'],
        'test_approach': 'Configuration scanning, enumeration'
    },
    'xss': {
        'description': 'Cross-site scripting',
        'examples': ['Reflected XSS', 'Stored XSS', 'DOM-based XSS'],
        'test_approach': 'Input reflection testing'
    },
    'insecure_deserialization': {
        'description': 'Unsafe deserialization of data',
        'examples': ['RCE via deserialization', 'Object injection'],
        'test_approach': 'Serialized payload testing'
    },
    'vulnerable_components': {
        'description': 'Using components with known vulnerabilities',
        'examples': ['Outdated libraries', 'Unpatched software'],
        'test_approach': 'Dependency scanning, version detection'
    },
    'insufficient_logging': {
        'description': 'Inadequate logging and monitoring',
        'examples': ['No audit trail', 'No alerting'],
        'test_approach': 'Log analysis, event testing'
    }
}
```

## Automating Security Tests

### SQL Injection Testing

```typescript
import { test, expect } from '@playwright/test';

test.describe('SQL Injection Security Tests', () => {
  const sqlPayloads = [
    "' OR '1'='1",
    "'; DROP TABLE users; --",
    "' UNION SELECT * FROM users --",
    "1' AND '1'='1",
    "admin'--",
    "' OR 1=1 --",
    "'; WAITFOR DELAY '0:0:5' --",
  ];

  for (const payload of sqlPayloads) {
    test(`login form rejects SQL injection: ${payload.substring(0, 20)}...`, async ({ page }) => {
      await page.goto('/login');

      await page.fill('#username', payload);
      await page.fill('#password', 'test');
      await page.click('#submit');

      // Should not log in or cause error
      await expect(page).not.toHaveURL('/dashboard');
      await expect(page.locator('.error')).not.toContainText(/SQL|syntax|query/i);
    });
  }

  test('search parameter handles SQL injection safely', async ({ request }) => {
    const response = await request.get('/api/search', {
      params: { q: "'; DROP TABLE products; --" }
    });

    // Should return normal response, not error
    expect(response.ok()).toBeTruthy();
    // Verify no SQL error in response
    const text = await response.text();
    expect(text).not.toMatch(/SQL|syntax|query error/i);
  });
});
```

### XSS Testing

```typescript
test.describe('XSS Security Tests', () => {
  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    '<svg onload=alert("XSS")>',
    'javascript:alert("XSS")',
    '"><script>alert("XSS")</script>',
    "'-alert('XSS')-'",
    '<body onload=alert("XSS")>',
    '<iframe src="javascript:alert(\'XSS\')">',
  ];

  for (const payload of xssPayloads) {
    test(`comment form sanitizes XSS: ${payload.substring(0, 20)}...`, async ({ page }) => {
      await page.goto('/comments');

      await page.fill('#comment', payload);
      await page.click('#submit');

      // Wait for comment to appear
      await page.waitForSelector('.comment-text');

      // Get the rendered HTML
      const commentHtml = await page.locator('.comment-text').innerHTML();

      // Verify script tags are not rendered
      expect(commentHtml).not.toContain('<script');
      expect(commentHtml).not.toContain('onerror');
      expect(commentHtml).not.toContain('onload');
      expect(commentHtml).not.toContain('javascript:');

      // Verify no alert dialogs
      let alertTriggered = false;
      page.on('dialog', () => { alertTriggered = true; });
      await page.waitForTimeout(500);
      expect(alertTriggered).toBeFalsy();
    });
  }
});
```

### IDOR (Insecure Direct Object Reference) Testing

```python
import pytest
import requests

class TestIDORVulnerabilities:
    """Test for Insecure Direct Object Reference vulnerabilities."""

    @pytest.fixture
    def user_sessions(self):
        """Create two user sessions."""
        # Login as user A
        session_a = requests.Session()
        session_a.post('/api/login', json={
            'email': 'usera@example.com',
            'password': 'password'
        })

        # Login as user B
        session_b = requests.Session()
        session_b.post('/api/login', json={
            'email': 'userb@example.com',
            'password': 'password'
        })

        return session_a, session_b

    def test_user_cannot_access_another_users_data(self, user_sessions):
        """User A should not access User B's private data."""
        session_a, session_b = user_sessions

        # Get User B's ID
        user_b_profile = session_b.get('/api/me').json()
        user_b_id = user_b_profile['id']

        # User A tries to access User B's data
        response = session_a.get(f'/api/users/{user_b_id}/private-data')

        # Should be forbidden
        assert response.status_code in [403, 404], \
            f"IDOR vulnerability: User A accessed User B's data"

    def test_user_cannot_modify_another_users_resource(self, user_sessions):
        """User A should not modify User B's resources."""
        session_a, session_b = user_sessions

        # User B creates a resource
        create_response = session_b.post('/api/documents', json={
            'title': 'User B Document'
        })
        doc_id = create_response.json()['id']

        # User A tries to modify User B's document
        response = session_a.put(f'/api/documents/{doc_id}', json={
            'title': 'Hacked!'
        })

        assert response.status_code in [403, 404], \
            "IDOR vulnerability: User A modified User B's document"

    def test_sequential_id_enumeration(self, user_sessions):
        """Test if sequential IDs allow enumeration."""
        session_a, _ = user_sessions

        accessible_resources = []
        for resource_id in range(1, 100):
            response = session_a.get(f'/api/resources/{resource_id}')
            if response.status_code == 200:
                accessible_resources.append(resource_id)

        # User should only access their own resources
        assert len(accessible_resources) < 10, \
            f"Potential enumeration: User accessed {len(accessible_resources)} resources"
```

### Authentication Bypass Testing

```typescript
test.describe('Authentication Security Tests', () => {
  test('protected endpoints require authentication', async ({ request }) => {
    const protectedEndpoints = [
      '/api/users/me',
      '/api/admin/users',
      '/api/settings',
      '/api/billing',
    ];

    for (const endpoint of protectedEndpoints) {
      const response = await request.get(endpoint, {
        headers: {} // No auth header
      });

      expect(response.status()).toBe(401);
    }
  });

  test('invalid tokens are rejected', async ({ request }) => {
    const invalidTokens = [
      'invalid',
      'Bearer invalid',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    ];

    for (const token of invalidTokens) {
      const response = await request.get('/api/users/me', {
        headers: { 'Authorization': token }
      });

      expect(response.status()).toBe(401);
    }
  });

  test('expired tokens are rejected', async ({ request }) => {
    // Token with exp in the past
    const expiredToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxfQ.signature';

    const response = await request.get('/api/users/me', {
      headers: { 'Authorization': expiredToken }
    });

    expect(response.status()).toBe(401);
  });

  test('password reset token cannot be reused', async ({ request }) => {
    // Request password reset
    await request.post('/api/password-reset', {
      data: { email: 'test@example.com' }
    });

    const resetToken = 'test-reset-token'; // In real test, get from email

    // First use should succeed
    const firstUse = await request.post('/api/password-reset/confirm', {
      data: { token: resetToken, password: 'NewPassword123!' }
    });
    expect(firstUse.ok()).toBeTruthy();

    // Second use should fail
    const secondUse = await request.post('/api/password-reset/confirm', {
      data: { token: resetToken, password: 'AnotherPassword123!' }
    });
    expect(secondUse.status()).toBe(400);
  });
});
```

## Writing Bug Bounty Reports

### Report Structure

```markdown
# Bug Bounty Report Template

## Title
[Vulnerability Type] in [Component/Feature]

## Severity
Critical / High / Medium / Low

## Summary
Brief description of the vulnerability and its impact.

## Steps to Reproduce
1. Navigate to [URL]
2. Enter payload [PAYLOAD] in [FIELD]
3. Click [BUTTON]
4. Observe [RESULT]

## Proof of Concept
[Screenshot or video]
[Code snippet if applicable]

## Impact
- What can an attacker do with this vulnerability?
- What data is at risk?
- How many users could be affected?

## Affected Components
- URL: https://example.com/vulnerable-endpoint
- Parameter: `user_id`
- Method: GET

## Suggested Remediation
- Input validation
- Parameterized queries
- Access control checks

## Environment
- Browser: Chrome 120
- OS: macOS 14
- Date tested: 2024-01-15
```

### Example Report

```markdown
# SQL Injection in User Search API

## Severity
High

## Summary
The /api/users/search endpoint is vulnerable to SQL injection through the
`query` parameter, allowing an attacker to extract sensitive user data from
the database.

## Steps to Reproduce
1. Send GET request to /api/users/search?query=test' UNION SELECT
   username,password,email FROM users--
2. Response contains all usernames, password hashes, and emails

## Proof of Concept
```bash
curl "https://api.example.com/users/search?query=test'%20UNION%20SELECT%20username,password,email%20FROM%20users--"
```

Response:
```json
{
  "results": [
    {"username": "admin", "password": "$2b$10$...", "email": "admin@example.com"},
    ...
  ]
}
```

## Impact
- Full database access
- Credential theft
- Personal data exposure
- Potential for data modification or deletion

## Suggested Remediation
- Use parameterized queries
- Implement input validation
- Apply principle of least privilege to database user

## Environment
- Tested: 2024-01-15
- Endpoint version: v2
```

## Setting Up Your Own Bug Bounty Program

### Program Design

```yaml
# bug-bounty-program.yaml
program:
  name: "Example Corp Bug Bounty"
  type: public  # or private/invite-only

scope:
  in_scope:
    - "*.example.com"
    - "api.example.com"
    - "mobile apps (iOS, Android)"

  out_of_scope:
    - "blog.example.com"
    - "Third-party services"
    - "Physical security"
    - "Social engineering"

vulnerability_types:
  critical:
    reward: "$5,000 - $15,000"
    examples:
      - "Remote code execution"
      - "SQL injection with data access"
      - "Authentication bypass"

  high:
    reward: "$1,000 - $5,000"
    examples:
      - "Stored XSS"
      - "IDOR with sensitive data"
      - "Privilege escalation"

  medium:
    reward: "$250 - $1,000"
    examples:
      - "Reflected XSS"
      - "CSRF on sensitive actions"
      - "Information disclosure"

  low:
    reward: "$50 - $250"
    examples:
      - "Minor information exposure"
      - "Missing security headers"

rules:
  - "No automated scanning without approval"
  - "No testing against production user accounts"
  - "No disclosure before fix is deployed"
  - "Report within 24 hours of discovery"

response_targets:
  first_response: "24 hours"
  triage: "3 business days"
  bounty_decision: "10 business days"
```

## Best Practices for Test Automation Professionals

### Integrating Security Tests

```javascript
// security-test-suite.config.js
module.exports = {
  // Run security tests in CI/CD
  testMatch: ['**/security/**/*.spec.ts'],

  // Different thresholds for security tests
  reporters: [
    'default',
    ['./security-reporter.js', { severityThreshold: 'medium' }]
  ],

  // Run security tests in isolation
  workers: 1,

  // Longer timeout for security tests
  timeout: 60000,
};
```

### Continuous Security Testing

```yaml
# .github/workflows/security-tests.yml
name: Security Tests

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  push:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run security tests
        run: npm run test:security

      - name: Run OWASP ZAP scan
        uses: zaproxy/action-full-scan@v0.4.0
        with:
          target: 'https://staging.example.com'

      - name: Dependency vulnerability scan
        run: npm audit --audit-level=high

      - name: Upload security report
        uses: actions/upload-artifact@v3
        with:
          name: security-report
          path: security-results/
```

## Conclusion

Bug bounty programs represent a valuable component of a comprehensive security strategy. For test automation professionals, understanding bug bounty methodologies helps in designing more security-conscious tests, understanding attacker perspectives, and potentially contributing to bug bounty programs as a way to sharpen security testing skills.

## Key Takeaways

1. Bug bounties leverage external expertise for security testing
2. Common vulnerabilities follow patterns (OWASP Top 10)
3. Automate security test cases for common vulnerability types
4. Write clear, reproducible bug reports
5. Integrate security testing into CI/CD pipelines
6. Understanding attacker techniques improves defensive testing
7. Responsible disclosure protects both researchers and organizations
