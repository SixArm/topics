# Piggyback Attack

## Introduction

A piggyback attack is one of the most intuitive yet dangerous security threats facing modern applications. For test automation professionals, understanding piggyback attacks is essential because these vulnerabilities often lurk in the spaces between authentication and authorization -- areas that manual testing frequently overlooks. Automated security testing can systematically probe for session hijacking, token reuse, and authorization bypass vulnerabilities that an attacker would exploit to "piggyback" on a legitimate user's access.

In the physical world, piggybacking means following an authorized person through a secure door. In the digital world, it means exploiting an authenticated session, reusing a valid token, or bypassing authorization checks to gain access that was never explicitly granted. As a test automation engineer, your job is to build tests that catch these vulnerabilities before attackers do.

This tutorial covers the concepts behind piggyback attacks, demonstrates how to write automated tests that detect them, and provides best practices for integrating security testing into your CI/CD pipeline.

## What is a Piggyback Attack?

A piggyback attack occurs when an unauthorized entity gains access to a system by leveraging the credentials, session, or authorization context of a legitimate user. Unlike brute-force attacks that try to break in directly, piggyback attacks exploit trust relationships and valid access paths.

```
ASCII Diagram: Piggyback Attack Flow

  Legitimate User                    Attacker
       |                                |
       |  1. Authenticates              |
       |------>[ Auth Server ]          |
       |<------| Session Token |        |
       |                                |
       |  2. Makes requests             |
       |       with token               |
       |                                |
       |           3. Steals/copies     |
       |              session token     |
       |              .................>|
       |                                |
       |                                |  4. Replays token
       |                                |------>[ Auth Server ]
       |                                |<------| Access Granted |
       |                                |
       |  5. Logs out                   |  6. Still has access?
       |------>[ Auth Server ]          |------>[ Auth Server ]
       |       (token invalidated?)     |       (token still valid?)
       |                                |

  +-------------------------------------------+
  |         Common Piggyback Vectors          |
  +-------------------------------------------+
  | - Session hijacking (stolen cookies)      |
  | - Token reuse after logout                |
  | - Authorization bypass (privilege escal.) |
  | - CSRF (cross-site request forgery)       |
  | - Shared session across tabs/devices      |
  +-------------------------------------------+
```

### Key Attack Vectors

1. **Session Hijacking**: Stealing or intercepting a valid session token to impersonate the authenticated user.
2. **Token Reuse**: Using a token after the legitimate user has logged out, exploiting poor session invalidation.
3. **Authorization Bypass**: Accessing resources by manipulating requests to skip authorization checks while riding on valid authentication.
4. **Privilege Escalation**: Using a low-privilege session to access high-privilege resources through parameter manipulation.

## Implementation: Testing for Piggyback Attacks

### Python with pytest

#### Setting Up the Test Environment

```python
# requirements.txt
# pytest==7.4.0
# requests==2.31.0
# pytest-html==3.2.0

# conftest.py
import pytest
import requests

BASE_URL = "http://localhost:8000/api"

@pytest.fixture
def auth_session():
    """Create an authenticated session for a regular user."""
    session = requests.Session()
    response = session.post(f"{BASE_URL}/auth/login", json={
        "username": "testuser",
        "password": "TestPass123!"
    })
    assert response.status_code == 200
    token = response.json()["token"]
    session.headers.update({"Authorization": f"Bearer {token}"})
    return session, token

@pytest.fixture
def admin_session():
    """Create an authenticated session for an admin user."""
    session = requests.Session()
    response = session.post(f"{BASE_URL}/auth/login", json={
        "username": "adminuser",
        "password": "AdminPass456!"
    })
    assert response.status_code == 200
    token = response.json()["token"]
    session.headers.update({"Authorization": f"Bearer {token}"})
    return session, token

@pytest.fixture
def unauthenticated_session():
    """Create a session with no authentication."""
    return requests.Session()
```

#### Session Hijacking Tests

```python
# test_session_hijacking.py
import pytest
import requests
import time

BASE_URL = "http://localhost:8000/api"


class TestSessionHijacking:
    """Tests to verify the application is resistant to session hijacking."""

    def test_stolen_token_from_different_ip(self, auth_session):
        """Verify that a token used from a different IP/user-agent is rejected."""
        session, token = auth_session

        # Simulate attacker using the stolen token from a different context
        attacker_session = requests.Session()
        attacker_session.headers.update({
            "Authorization": f"Bearer {token}",
            "User-Agent": "AttackerBot/1.0",
            "X-Forwarded-For": "203.0.113.99"  # Different IP
        })

        response = attacker_session.get(f"{BASE_URL}/user/profile")

        # The server should detect the anomaly and reject or flag the request
        assert response.status_code in [401, 403], (
            "Server accepted a token from a different client context. "
            "This may indicate vulnerability to session hijacking."
        )

    def test_concurrent_sessions_detected(self, auth_session):
        """Verify that concurrent sessions for the same user are detected."""
        session1, token1 = auth_session

        # Create a second session for the same user
        session2 = requests.Session()
        response = session2.post(f"{BASE_URL}/auth/login", json={
            "username": "testuser",
            "password": "TestPass123!"
        })
        token2 = response.json()["token"]
        session2.headers.update({"Authorization": f"Bearer {token2}"})

        # Original session should either be invalidated or flagged
        response1 = session1.get(f"{BASE_URL}/user/profile")

        # Depending on policy: either old session is killed, or both work
        # but concurrent session count should be tracked
        assert response1.status_code in [200, 401], (
            "Unexpected response for concurrent session check"
        )

    def test_session_fixation_prevention(self):
        """Verify that session tokens change after authentication."""
        session = requests.Session()

        # Get a pre-auth session/cookie
        response = session.get(f"{BASE_URL}/auth/login-page")
        pre_auth_cookies = dict(session.cookies)

        # Authenticate
        response = session.post(f"{BASE_URL}/auth/login", json={
            "username": "testuser",
            "password": "TestPass123!"
        })
        post_auth_cookies = dict(session.cookies)

        # Session ID should change after authentication
        if "session_id" in pre_auth_cookies and "session_id" in post_auth_cookies:
            assert pre_auth_cookies["session_id"] != post_auth_cookies["session_id"], (
                "Session ID did not change after authentication. "
                "Vulnerable to session fixation attack."
            )
```

#### Token Reuse After Logout Tests

```python
# test_token_reuse.py
import pytest
import requests
import time

BASE_URL = "http://localhost:8000/api"


class TestTokenReuse:
    """Tests to verify tokens cannot be reused after logout or expiration."""

    def test_token_invalid_after_logout(self, auth_session):
        """Verify that a token cannot be used after the user logs out."""
        session, token = auth_session

        # Verify token works before logout
        response = session.get(f"{BASE_URL}/user/profile")
        assert response.status_code == 200

        # Log out
        response = session.post(f"{BASE_URL}/auth/logout")
        assert response.status_code == 200

        # Attempt to reuse the same token (piggyback attack)
        piggybacker = requests.Session()
        piggybacker.headers.update({"Authorization": f"Bearer {token}"})
        response = piggybacker.get(f"{BASE_URL}/user/profile")

        assert response.status_code == 401, (
            f"Token still valid after logout (status={response.status_code}). "
            "This is a critical piggyback vulnerability."
        )

    def test_refresh_token_invalid_after_logout(self, auth_session):
        """Verify that refresh tokens are also invalidated on logout."""
        session, token = auth_session

        # Get a refresh token
        response = session.post(f"{BASE_URL}/auth/refresh")
        if response.status_code == 200:
            refresh_token = response.json().get("refresh_token")

            # Log out
            session.post(f"{BASE_URL}/auth/logout")

            # Try to use the refresh token to get a new access token
            response = requests.post(f"{BASE_URL}/auth/refresh", json={
                "refresh_token": refresh_token
            })

            assert response.status_code == 401, (
                "Refresh token still valid after logout. "
                "Attacker could generate new access tokens indefinitely."
            )

    def test_expired_token_rejected(self, auth_session):
        """Verify that expired tokens are properly rejected."""
        session, token = auth_session

        # Wait for token to expire (adjust based on your token TTL)
        # In test environments, use short-lived tokens (e.g., 5 seconds)
        time.sleep(6)

        response = session.get(f"{BASE_URL}/user/profile")
        assert response.status_code == 401, (
            "Expired token was accepted. Token expiration is not enforced."
        )
```

#### Authorization Bypass Tests

```python
# test_authorization_bypass.py
import pytest
import requests

BASE_URL = "http://localhost:8000/api"


class TestAuthorizationBypass:
    """Tests for authorization bypass through piggybacking on valid auth."""

    def test_horizontal_privilege_escalation(self, auth_session):
        """Verify user A cannot access user B's resources."""
        session, token = auth_session  # Logged in as testuser

        # Attempt to access another user's data by changing the user ID
        response = session.get(f"{BASE_URL}/users/other-user-id/profile")
        assert response.status_code in [403, 404], (
            "User can access another user's profile. "
            "Horizontal privilege escalation detected."
        )

    def test_vertical_privilege_escalation(self, auth_session):
        """Verify regular user cannot access admin endpoints."""
        session, token = auth_session  # Regular user

        admin_endpoints = [
            "/admin/users",
            "/admin/settings",
            "/admin/logs",
            "/admin/system/config",
        ]

        for endpoint in admin_endpoints:
            response = session.get(f"{BASE_URL}{endpoint}")
            assert response.status_code in [401, 403], (
                f"Regular user accessed admin endpoint {endpoint} "
                f"(status={response.status_code}). "
                "Vertical privilege escalation detected."
            )

    def test_idor_vulnerability(self, auth_session):
        """Test for Insecure Direct Object Reference (IDOR)."""
        session, token = auth_session

        # Try accessing resources by iterating through IDs
        for resource_id in range(1, 20):
            response = session.get(f"{BASE_URL}/documents/{resource_id}")
            if response.status_code == 200:
                data = response.json()
                # Verify the returned resource belongs to the authenticated user
                assert data.get("owner_id") == "testuser" or \
                       data.get("is_public") is True, (
                    f"User accessed document {resource_id} belonging to "
                    f"another user. IDOR vulnerability detected."
                )

    def test_method_tampering(self, auth_session):
        """Verify that changing HTTP methods does not bypass authorization."""
        session, token = auth_session

        # Resource that user can GET but not DELETE
        resource_url = f"{BASE_URL}/shared/resource/1"

        # Verify read access works
        get_response = session.get(resource_url)

        if get_response.status_code == 200:
            # Try destructive operations that should be forbidden
            for method in [session.put, session.delete, session.patch]:
                response = method(resource_url, json={"data": "modified"})
                assert response.status_code in [401, 403, 405], (
                    f"{method.__name__.upper()} succeeded on a read-only "
                    f"resource. Method tampering bypass detected."
                )
```

### JavaScript/TypeScript with Playwright and Jest

#### Playwright Setup for Security Testing

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/security',
  timeout: 30000,
  retries: 0,  // Security tests should not retry
  use: {
    baseURL: 'http://localhost:3000',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },
  projects: [
    {
      name: 'security-tests',
      use: { browserName: 'chromium' },
    },
  ],
});
```

#### Session Hijacking Tests with Playwright

```typescript
// tests/security/piggyback-attack.spec.ts
import { test, expect, type Page, type BrowserContext } from '@playwright/test';

test.describe('Piggyback Attack Prevention', () => {

  test.describe('Session Hijacking', () => {

    test('stolen cookie cannot be used in another browser context', async ({
      browser
    }) => {
      // Context 1: Legitimate user logs in
      const legitimateContext = await browser.newContext();
      const legitimatePage = await legitimateContext.newPage();

      await legitimatePage.goto('/login');
      await legitimatePage.fill('#username', 'testuser');
      await legitimatePage.fill('#password', 'TestPass123!');
      await legitimatePage.click('#login-button');
      await legitimatePage.waitForURL('/dashboard');

      // Capture the session cookies
      const cookies = await legitimateContext.cookies();
      const sessionCookie = cookies.find(c => c.name === 'session_id');
      expect(sessionCookie).toBeDefined();

      // Context 2: Attacker tries to use the stolen cookie
      const attackerContext = await browser.newContext();
      await attackerContext.addCookies([{
        name: sessionCookie!.name,
        value: sessionCookie!.value,
        domain: sessionCookie!.domain,
        path: sessionCookie!.path,
      }]);

      const attackerPage = await attackerContext.newPage();
      const response = await attackerPage.goto('/dashboard');

      // Application should detect the different context and reject
      const url = attackerPage.url();
      const isRedirectedToLogin = url.includes('/login');
      const isAccessDenied = response?.status() === 403;

      expect(isRedirectedToLogin || isAccessDenied).toBeTruthy();

      await legitimateContext.close();
      await attackerContext.close();
    });

    test('session cookie has secure attributes', async ({ page }) => {
      await page.goto('/login');
      await page.fill('#username', 'testuser');
      await page.fill('#password', 'TestPass123!');
      await page.click('#login-button');
      await page.waitForURL('/dashboard');

      const cookies = await page.context().cookies();
      const sessionCookie = cookies.find(c => c.name === 'session_id');

      expect(sessionCookie).toBeDefined();
      expect(sessionCookie!.httpOnly).toBe(true);
      expect(sessionCookie!.secure).toBe(true);
      expect(sessionCookie!.sameSite).toBe('Strict');
    });
  });

  test.describe('Token Reuse After Logout', () => {

    test('API token is invalidated after logout', async ({ request }) => {
      // Login and get token
      const loginResponse = await request.post('/api/auth/login', {
        data: { username: 'testuser', password: 'TestPass123!' }
      });
      expect(loginResponse.ok()).toBeTruthy();
      const { token } = await loginResponse.json();

      // Verify token works
      const profileResponse = await request.get('/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      expect(profileResponse.ok()).toBeTruthy();

      // Logout
      const logoutResponse = await request.post('/api/auth/logout', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      expect(logoutResponse.ok()).toBeTruthy();

      // Try to reuse the token (piggyback attempt)
      const piggybackResponse = await request.get('/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      expect(piggybackResponse.status()).toBe(401);
    });
  });

  test.describe('Authorization Bypass', () => {

    test('regular user cannot access admin panel', async ({ page }) => {
      // Login as regular user
      await page.goto('/login');
      await page.fill('#username', 'testuser');
      await page.fill('#password', 'TestPass123!');
      await page.click('#login-button');
      await page.waitForURL('/dashboard');

      // Attempt to navigate directly to admin panel
      const response = await page.goto('/admin');

      expect(response?.status()).toBe(403);
      // Or verify redirect to unauthorized page
      expect(page.url()).not.toContain('/admin');
    });

    test('cannot escalate privileges via API parameter tampering',
      async ({ request }) => {
        // Login as regular user
        const loginResponse = await request.post('/api/auth/login', {
          data: { username: 'testuser', password: 'TestPass123!' }
        });
        const { token } = await loginResponse.json();

        // Try to update own role to admin
        const tamperResponse = await request.put('/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
          data: { role: 'admin', is_admin: true }
        });

        // Verify role was not changed
        const profileResponse = await request.get('/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const profile = await profileResponse.json();

        expect(profile.role).not.toBe('admin');
        expect(profile.is_admin).not.toBe(true);
      }
    );

    test('IDOR: cannot access other users resources', async ({ request }) => {
      // Login as user A
      const loginA = await request.post('/api/auth/login', {
        data: { username: 'userA', password: 'PassA123!' }
      });
      const { token: tokenA } = await loginA.json();

      // Login as user B to find their resource IDs
      const loginB = await request.post('/api/auth/login', {
        data: { username: 'userB', password: 'PassB123!' }
      });
      const { token: tokenB } = await loginB.json();

      // Get user B's documents
      const userBDocs = await request.get('/api/documents', {
        headers: { 'Authorization': `Bearer ${tokenB}` }
      });
      const bDocs = await userBDocs.json();

      if (bDocs.length > 0) {
        // Try to access user B's document with user A's token
        const idorResponse = await request.get(
          `/api/documents/${bDocs[0].id}`,
          { headers: { 'Authorization': `Bearer ${tokenA}` } }
        );

        expect(idorResponse.status()).toBe(403);
      }
    });
  });
});
```

#### Jest API Security Tests

```typescript
// tests/security/piggyback.test.ts
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:3000/api';

describe('Piggyback Attack Prevention - API Tests', () => {
  let authenticatedClient: AxiosInstance;
  let authToken: string;

  beforeEach(async () => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'testuser',
      password: 'TestPass123!'
    });
    authToken = response.data.token;
    authenticatedClient = axios.create({
      baseURL: BASE_URL,
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
  });

  describe('Token Manipulation', () => {

    test('modified token payload is rejected', async () => {
      // Decode JWT, modify payload, re-encode (without valid signature)
      const parts = authToken.split('.');
      const payload = JSON.parse(
        Buffer.from(parts[1], 'base64url').toString()
      );
      payload.role = 'admin';  // Try to escalate
      parts[1] = Buffer.from(JSON.stringify(payload)).toString('base64url');
      const tamperedToken = parts.join('.');

      try {
        await axios.get(`${BASE_URL}/admin/users`, {
          headers: { 'Authorization': `Bearer ${tamperedToken}` }
        });
        fail('Tampered token should have been rejected');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
    });

    test('token from different environment is rejected', async () => {
      // Use a token signed with a different secret
      const fakeToken = 'eyJhbGciOiJIUzI1NiJ9.' +
        'eyJ1c2VyIjoidGVzdHVzZXIiLCJyb2xlIjoiYWRtaW4ifQ.' +
        'invalidsignature';

      try {
        await axios.get(`${BASE_URL}/user/profile`, {
          headers: { 'Authorization': `Bearer ${fakeToken}` }
        });
        fail('Foreign token should have been rejected');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
    });
  });

  describe('Session Management', () => {

    test('password change invalidates all existing tokens', async () => {
      // Change password
      await authenticatedClient.post('/auth/change-password', {
        current_password: 'TestPass123!',
        new_password: 'NewTestPass789!'
      });

      // Old token should be invalidated
      try {
        await authenticatedClient.get('/user/profile');
        fail('Old token should be invalid after password change');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
    });

    test('tokens have reasonable expiration', async () => {
      const parts = authToken.split('.');
      const payload = JSON.parse(
        Buffer.from(parts[1], 'base64url').toString()
      );

      const issuedAt = payload.iat;
      const expiresAt = payload.exp;
      const ttlSeconds = expiresAt - issuedAt;

      // Token should expire within a reasonable time (e.g., 1 hour)
      expect(ttlSeconds).toBeLessThanOrEqual(3600);
      expect(ttlSeconds).toBeGreaterThan(0);
    });
  });
});
```

## Best Practices

### Security Testing Checklist

- [ ] **Session invalidation on logout**: Verify tokens and sessions are destroyed server-side when users log out
- [ ] **Token expiration enforcement**: Confirm that expired tokens are rejected and cannot be reused
- [ ] **Session fixation prevention**: Ensure session IDs rotate after authentication
- [ ] **Secure cookie attributes**: Verify HttpOnly, Secure, and SameSite flags on session cookies
- [ ] **Horizontal access control**: Test that users cannot access other users' resources (IDOR)
- [ ] **Vertical access control**: Test that regular users cannot access admin functionality
- [ ] **Token integrity validation**: Verify that tampered tokens (modified payloads) are rejected
- [ ] **Concurrent session management**: Define and test policy for multiple active sessions
- [ ] **Password change invalidation**: Ensure all active sessions are revoked on credential changes
- [ ] **Rate limiting on auth endpoints**: Prevent brute-force token guessing attacks
- [ ] **Audit logging**: Verify that suspicious access patterns are logged for review
- [ ] **HTTPS enforcement**: Ensure tokens are only transmitted over encrypted connections
- [ ] **CSRF protection**: Verify anti-CSRF tokens are required for state-changing requests
- [ ] **Re-authentication for sensitive ops**: Confirm that critical actions require fresh authentication

### Test Design Principles

- [ ] Security tests should never retry on failure (set retries to 0)
- [ ] Use dedicated test accounts with known, controlled permissions
- [ ] Test both positive (authorized access works) and negative (unauthorized access fails) cases
- [ ] Include piggyback tests in CI/CD pipelines to catch regressions
- [ ] Separate security tests from functional tests for clarity and targeted execution
- [ ] Document the expected security behavior alongside each test

## Conclusion

Piggyback attacks represent a class of vulnerabilities where attackers exploit the trust boundary between authentication and authorization. Rather than breaking in through the front door, they slip in behind someone who has already been let through. For test automation professionals, this means building tests that go beyond "does login work?" and ask "what happens when someone misuses valid credentials?"

Automated security testing for piggyback attacks should cover the full lifecycle of a session: creation, use, expiration, and destruction. By testing token reuse after logout, cross-context session usage, privilege escalation through parameter tampering, and insecure direct object references, you create a safety net that catches the vulnerabilities attackers actively look for.

The tests demonstrated in this tutorial form a foundation that should be adapted to your application's specific authentication and authorization model. Integrate them into your CI/CD pipeline, run them against every deployment, and treat any failure as a critical security defect.

## Key Takeaways

1. A piggyback attack exploits valid authentication or sessions rather than breaking authentication directly, making it harder to detect with traditional functional tests.
2. Session invalidation on logout must be tested server-side -- simply clearing the client cookie is insufficient if the token remains valid on the server.
3. Token integrity checks (rejecting tampered JWTs, enforcing expiration, validating signatures) are the first line of defense against piggybacked access.
4. Horizontal and vertical privilege escalation tests (IDOR, admin endpoint access) should be automated and run on every deployment to prevent authorization bypass regressions.
5. Secure cookie attributes (HttpOnly, Secure, SameSite) prevent client-side token theft, and automated tests should verify these attributes are correctly set.
6. Security tests should be deterministic and non-retrying: a test that sometimes passes when checking for unauthorized access indicates a real vulnerability, not flakiness.
7. Integrating piggyback attack tests into your CI/CD pipeline transforms security from a periodic audit into a continuous guarantee, catching regressions the moment they are introduced.
