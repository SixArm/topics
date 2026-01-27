# Defense in Depth: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Defense in depth is a security strategy that employs multiple layers of protection to safeguard systems and data. For test automation professionals, understanding defense in depth means testing each security layer independently and as part of an integrated whole, ensuring no single point of failure compromises the system.

## What is Defense in Depth?

Defense in depth uses multiple, overlapping security controls so that if one layer fails, others remain to protect the system. This concept originated in military strategy and has become fundamental to cybersecurity and application security.

### The Layers of Defense

```
┌─────────────────────────────────────────────────────────────┐
│                    Defense in Depth Layers                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Physical Security                       │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │           Network Security                     │  │   │
│  │  │  ┌─────────────────────────────────────────┐  │  │   │
│  │  │  │        Perimeter Security               │  │  │   │
│  │  │  │  ┌───────────────────────────────────┐  │  │  │   │
│  │  │  │  │      Host Security                │  │  │  │   │
│  │  │  │  │  ┌─────────────────────────────┐  │  │  │  │   │
│  │  │  │  │  │   Application Security      │  │  │  │  │   │
│  │  │  │  │  │  ┌───────────────────────┐  │  │  │  │  │   │
│  │  │  │  │  │  │    Data Security      │  │  │  │  │  │   │
│  │  │  │  │  │  │  ┌─────────────────┐  │  │  │  │  │  │   │
│  │  │  │  │  │  │  │ Business Data   │  │  │  │  │  │  │   │
│  │  │  │  │  │  │  └─────────────────┘  │  │  │  │  │  │   │
│  │  │  │  │  │  └───────────────────────┘  │  │  │  │  │   │
│  │  │  │  │  └─────────────────────────────┘  │  │  │  │   │
│  │  │  │  └───────────────────────────────────┘  │  │  │   │
│  │  │  └─────────────────────────────────────────┘  │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing Each Layer

### Application Security Testing

```python
import pytest
from typing import List, Dict
import re

class ApplicationSecurityTests:
    """Tests for application-level security controls."""

    def __init__(self, app_client):
        self.client = app_client

    # Input Validation Tests
    def test_sql_injection_prevention(self, test_inputs: List[str] = None):
        """Test that SQL injection attempts are blocked."""
        if test_inputs is None:
            test_inputs = [
                "'; DROP TABLE users; --",
                "1' OR '1'='1",
                "1; DELETE FROM orders",
                "admin'--",
                "' UNION SELECT * FROM passwords--"
            ]

        results = []
        for payload in test_inputs:
            response = self.client.post('/api/search', json={'query': payload})

            # Should either sanitize input or reject it
            results.append({
                'payload': payload,
                'status': response.status_code,
                'blocked': response.status_code in [400, 403] or
                          'error' not in response.text.lower()
            })

        failed = [r for r in results if not r['blocked']]
        assert not failed, f"SQL injection not blocked: {failed}"

    def test_xss_prevention(self, test_inputs: List[str] = None):
        """Test that XSS attempts are sanitized."""
        if test_inputs is None:
            test_inputs = [
                "<script>alert('XSS')</script>",
                "<img src=x onerror=alert('XSS')>",
                "javascript:alert('XSS')",
                "<svg onload=alert('XSS')>",
                "'\"><script>alert('XSS')</script>"
            ]

        for payload in test_inputs:
            response = self.client.post('/api/comments', json={'text': payload})

            if response.status_code == 200:
                # If accepted, verify it's sanitized in output
                comment_response = self.client.get(f'/api/comments/{response.json()["id"]}')
                returned_text = comment_response.json().get('text', '')

                # Should not contain executable scripts
                assert '<script>' not in returned_text.lower()
                assert 'javascript:' not in returned_text.lower()
                assert 'onerror=' not in returned_text.lower()

    def test_command_injection_prevention(self):
        """Test that command injection is prevented."""
        payloads = [
            "; ls -la",
            "| cat /etc/passwd",
            "$(whoami)",
            "`id`",
            "&& rm -rf /"
        ]

        for payload in payloads:
            response = self.client.post('/api/process', json={'filename': payload})

            # Should reject or sanitize
            assert response.status_code in [200, 400, 403]
            if response.status_code == 200:
                # Verify command wasn't executed
                assert 'root:' not in response.text  # /etc/passwd content
                assert 'uid=' not in response.text   # id command output


class AuthenticationTests:
    """Tests for authentication layer."""

    def __init__(self, app_client):
        self.client = app_client

    def test_password_requirements(self):
        """Test that password policies are enforced."""
        weak_passwords = [
            "123456",        # Too simple
            "password",     # Common password
            "abc",          # Too short
            "aaaaaaaaaa",   # No complexity
        ]

        for password in weak_passwords:
            response = self.client.post('/api/register', json={
                'email': 'test@example.com',
                'password': password
            })

            assert response.status_code == 400, \
                f"Weak password accepted: {password}"

    def test_brute_force_protection(self):
        """Test that brute force attacks are mitigated."""
        # Attempt multiple failed logins
        for i in range(10):
            response = self.client.post('/api/login', json={
                'email': 'user@example.com',
                'password': f'wrong_password_{i}'
            })

        # Should be rate limited or locked out
        final_response = self.client.post('/api/login', json={
            'email': 'user@example.com',
            'password': 'another_attempt'
        })

        assert final_response.status_code in [429, 403], \
            "Brute force protection not active"

    def test_session_security(self):
        """Test session security controls."""
        # Login to get session
        login_response = self.client.post('/api/login', json={
            'email': 'test@example.com',
            'password': 'ValidPassword123!'
        })

        cookies = login_response.cookies

        # Check session cookie security
        session_cookie = cookies.get('session')
        if session_cookie:
            # Verify secure flags
            assert session_cookie.get('httponly', False), \
                "Session cookie missing HttpOnly flag"
            assert session_cookie.get('secure', False), \
                "Session cookie missing Secure flag"
            assert 'samesite' in str(session_cookie).lower(), \
                "Session cookie missing SameSite attribute"

    def test_jwt_security(self):
        """Test JWT token security."""
        login_response = self.client.post('/api/login', json={
            'email': 'test@example.com',
            'password': 'ValidPassword123!'
        })

        token = login_response.json().get('token')
        if token:
            import jwt

            # Decode without verification to inspect
            header = jwt.get_unverified_header(token)

            # Should use strong algorithm
            assert header['alg'] not in ['none', 'HS256'], \
                f"Weak JWT algorithm: {header['alg']}"

            # Test with modified token
            parts = token.split('.')
            modified_token = parts[0] + '.' + parts[1] + '.invalid_signature'

            response = self.client.get('/api/protected',
                headers={'Authorization': f'Bearer {modified_token}'})

            assert response.status_code == 401, \
                "Modified JWT token accepted"


class AuthorizationTests:
    """Tests for authorization layer."""

    def __init__(self, app_client):
        self.client = app_client

    def test_horizontal_privilege_escalation(self, user1_token, user2_id):
        """Test that users can't access other users' data."""
        response = self.client.get(
            f'/api/users/{user2_id}/profile',
            headers={'Authorization': f'Bearer {user1_token}'}
        )

        assert response.status_code in [403, 404], \
            "Horizontal privilege escalation possible"

    def test_vertical_privilege_escalation(self, user_token):
        """Test that regular users can't access admin functions."""
        admin_endpoints = [
            '/api/admin/users',
            '/api/admin/settings',
            '/api/admin/logs',
            '/api/admin/delete-all'
        ]

        for endpoint in admin_endpoints:
            response = self.client.get(
                endpoint,
                headers={'Authorization': f'Bearer {user_token}'}
            )

            assert response.status_code in [403, 401], \
                f"Admin endpoint accessible by regular user: {endpoint}"

    def test_idor_prevention(self, user_token):
        """Test Insecure Direct Object Reference prevention."""
        # Try to access resources with sequential IDs
        for resource_id in range(1, 100):
            response = self.client.get(
                f'/api/orders/{resource_id}',
                headers={'Authorization': f'Bearer {user_token}'}
            )

            # Should only return user's own orders
            if response.status_code == 200:
                order_data = response.json()
                # Verify order belongs to the authenticated user
                # (implementation depends on your token structure)
```

### Network Security Testing

```python
import ssl
import socket
from urllib.parse import urlparse

class NetworkSecurityTests:
    """Tests for network-level security controls."""

    def __init__(self, target_url: str):
        self.url = target_url
        self.parsed = urlparse(target_url)

    def test_tls_configuration(self):
        """Test TLS/SSL configuration."""
        hostname = self.parsed.hostname
        port = self.parsed.port or 443

        context = ssl.create_default_context()

        with socket.create_connection((hostname, port)) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                # Check TLS version
                version = ssock.version()
                assert version in ['TLSv1.2', 'TLSv1.3'], \
                    f"Weak TLS version: {version}"

                # Check cipher
                cipher = ssock.cipher()
                weak_ciphers = ['RC4', 'DES', 'MD5', 'NULL']
                for weak in weak_ciphers:
                    assert weak not in cipher[0], \
                        f"Weak cipher in use: {cipher[0]}"

    def test_security_headers(self, response):
        """Test HTTP security headers."""
        required_headers = {
            'Strict-Transport-Security': lambda v: 'max-age=' in v,
            'X-Content-Type-Options': lambda v: v == 'nosniff',
            'X-Frame-Options': lambda v: v in ['DENY', 'SAMEORIGIN'],
            'Content-Security-Policy': lambda v: len(v) > 0,
            'X-XSS-Protection': lambda v: v.startswith('1'),
        }

        missing = []
        invalid = []

        for header, validator in required_headers.items():
            value = response.headers.get(header)
            if not value:
                missing.append(header)
            elif not validator(value):
                invalid.append(f"{header}: {value}")

        assert not missing, f"Missing security headers: {missing}"
        assert not invalid, f"Invalid security headers: {invalid}"

    def test_cors_configuration(self, client):
        """Test CORS configuration."""
        # Test with malicious origin
        response = client.options('/api/data', headers={
            'Origin': 'https://malicious-site.com',
            'Access-Control-Request-Method': 'GET'
        })

        allowed_origin = response.headers.get('Access-Control-Allow-Origin')

        # Should not allow arbitrary origins
        assert allowed_origin != '*', "CORS allows all origins"
        assert allowed_origin != 'https://malicious-site.com', \
            "CORS allows malicious origin"

    def test_https_redirect(self, client):
        """Test that HTTP redirects to HTTPS."""
        http_url = self.url.replace('https://', 'http://')
        response = client.get(http_url, allow_redirects=False)

        assert response.status_code in [301, 302, 307, 308], \
            "HTTP does not redirect"
        assert response.headers.get('Location', '').startswith('https://'), \
            "Does not redirect to HTTPS"
```

### Data Security Testing

```python
import hashlib
import base64
from typing import Dict, Any

class DataSecurityTests:
    """Tests for data-level security controls."""

    def test_password_storage(self, db_connection, test_user_id: str):
        """Verify passwords are properly hashed."""
        cursor = db_connection.cursor()
        cursor.execute(
            "SELECT password_hash FROM users WHERE id = %s",
            (test_user_id,)
        )
        result = cursor.fetchone()

        if result:
            password_hash = result[0]

            # Should not be plaintext
            assert len(password_hash) > 20, "Password may be stored in plaintext"

            # Should look like a proper hash (bcrypt, argon2, etc.)
            hash_patterns = [
                r'^\$2[aby]\$',  # bcrypt
                r'^\$argon2',    # argon2
                r'^\$pbkdf2',    # pbkdf2
                r'^\$scrypt'     # scrypt
            ]

            import re
            is_hashed = any(
                re.match(pattern, password_hash)
                for pattern in hash_patterns
            )

            assert is_hashed, "Password not using strong hashing algorithm"

    def test_sensitive_data_encryption(self, db_connection):
        """Verify sensitive data is encrypted at rest."""
        cursor = db_connection.cursor()

        # Check for unencrypted PII
        cursor.execute("""
            SELECT ssn, credit_card, bank_account
            FROM user_financial_data
            LIMIT 10
        """)

        for row in cursor.fetchall():
            for value in row:
                if value:
                    # Should not be plaintext patterns
                    ssn_pattern = r'^\d{3}-\d{2}-\d{4}$'
                    cc_pattern = r'^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$'

                    assert not re.match(ssn_pattern, str(value)), \
                        "SSN stored in plaintext"
                    assert not re.match(cc_pattern, str(value)), \
                        "Credit card stored in plaintext"

    def test_data_masking_in_logs(self, log_file_path: str):
        """Verify sensitive data is masked in logs."""
        sensitive_patterns = [
            r'\b\d{3}-\d{2}-\d{4}\b',  # SSN
            r'\b\d{16}\b',              # Credit card
            r'password["\']?\s*[:=]\s*["\']?[^"\'\s]+',  # Passwords
            r'api[_-]?key["\']?\s*[:=]\s*["\']?[^"\'\s]+',  # API keys
        ]

        with open(log_file_path, 'r') as f:
            log_content = f.read()

        for pattern in sensitive_patterns:
            matches = re.findall(pattern, log_content, re.IGNORECASE)
            assert not matches, \
                f"Sensitive data in logs matching {pattern}: {matches[:3]}"

    def test_data_minimization(self, api_response: Dict[str, Any]):
        """Verify API responses don't expose unnecessary data."""
        sensitive_fields = [
            'password', 'password_hash', 'ssn', 'social_security',
            'credit_card', 'bank_account', 'secret', 'token',
            'api_key', 'private_key'
        ]

        def check_fields(data, path=''):
            if isinstance(data, dict):
                for key, value in data.items():
                    current_path = f"{path}.{key}" if path else key

                    # Check if field name is sensitive
                    if any(s in key.lower() for s in sensitive_fields):
                        raise AssertionError(
                            f"Sensitive field exposed: {current_path}"
                        )

                    check_fields(value, current_path)

            elif isinstance(data, list):
                for i, item in enumerate(data):
                    check_fields(item, f"{path}[{i}]")

        check_fields(api_response)
```

## Integrated Defense Testing

### Multi-Layer Test Scenarios

```python
class DefenseInDepthTestSuite:
    """Comprehensive tests across all security layers."""

    def __init__(self, app_client, db_connection, config):
        self.client = app_client
        self.db = db_connection
        self.config = config

        self.app_tests = ApplicationSecurityTests(app_client)
        self.auth_tests = AuthenticationTests(app_client)
        self.authz_tests = AuthorizationTests(app_client)
        self.network_tests = NetworkSecurityTests(config['base_url'])
        self.data_tests = DataSecurityTests()

    def test_complete_attack_scenario(self):
        """
        Test a complete attack scenario through all layers.
        Simulates an attacker attempting to access sensitive data.
        """
        # Layer 1: Network - Try to bypass HTTPS
        http_response = self.client.get(
            self.config['base_url'].replace('https', 'http'),
            allow_redirects=False
        )
        assert http_response.status_code in [301, 302], \
            "HTTP not redirecting to HTTPS"

        # Layer 2: Perimeter - Try to access without authentication
        unauth_response = self.client.get('/api/sensitive-data')
        assert unauth_response.status_code == 401, \
            "Sensitive data accessible without auth"

        # Layer 3: Authentication - Try with invalid credentials
        bad_auth = self.client.post('/api/login', json={
            'email': 'admin@example.com',
            'password': "'; DROP TABLE users; --"
        })
        assert bad_auth.status_code in [400, 401], \
            "SQL injection in login not blocked"

        # Layer 4: Authorization - Try to escalate privileges
        user_token = self._get_regular_user_token()
        admin_attempt = self.client.get(
            '/api/admin/users',
            headers={'Authorization': f'Bearer {user_token}'}
        )
        assert admin_attempt.status_code == 403, \
            "Regular user can access admin endpoints"

        # Layer 5: Application - Try XSS in user input
        xss_response = self.client.post(
            '/api/profile',
            headers={'Authorization': f'Bearer {user_token}'},
            json={'bio': '<script>alert("xss")</script>'}
        )

        if xss_response.status_code == 200:
            profile = self.client.get(
                '/api/profile',
                headers={'Authorization': f'Bearer {user_token}'}
            )
            assert '<script>' not in profile.text, \
                "XSS payload not sanitized"

        # Layer 6: Data - Verify sensitive data protected
        self.data_tests.test_password_storage(
            self.db,
            self._get_test_user_id()
        )

    def test_defense_layer_independence(self):
        """
        Test that each layer works independently.
        Failure of one layer should not compromise others.
        """
        layers_tested = {
            'network': False,
            'authentication': False,
            'authorization': False,
            'input_validation': False,
            'data_protection': False
        }

        # Each layer test is independent
        try:
            self.network_tests.test_security_headers(
                self.client.get('/')
            )
            layers_tested['network'] = True
        except Exception as e:
            print(f"Network layer issue: {e}")

        try:
            self.auth_tests.test_brute_force_protection()
            layers_tested['authentication'] = True
        except Exception as e:
            print(f"Authentication layer issue: {e}")

        try:
            user_token = self._get_regular_user_token()
            self.authz_tests.test_vertical_privilege_escalation(user_token)
            layers_tested['authorization'] = True
        except Exception as e:
            print(f"Authorization layer issue: {e}")

        try:
            self.app_tests.test_sql_injection_prevention()
            layers_tested['input_validation'] = True
        except Exception as e:
            print(f"Input validation layer issue: {e}")

        try:
            self.data_tests.test_password_storage(
                self.db,
                self._get_test_user_id()
            )
            layers_tested['data_protection'] = True
        except Exception as e:
            print(f"Data protection layer issue: {e}")

        # Report on layer coverage
        passed = sum(1 for v in layers_tested.values() if v)
        total = len(layers_tested)

        print(f"Defense layers verified: {passed}/{total}")
        for layer, passed in layers_tested.items():
            status = "✓" if passed else "✗"
            print(f"  {status} {layer}")

        # All layers should pass
        assert all(layers_tested.values()), \
            f"Some defense layers failed: {layers_tested}"

    def _get_regular_user_token(self):
        """Helper to get a regular user token."""
        response = self.client.post('/api/login', json={
            'email': 'user@example.com',
            'password': 'UserPassword123!'
        })
        return response.json()['token']

    def _get_test_user_id(self):
        """Helper to get test user ID."""
        return 'test-user-123'
```

## Best Practices

### Defense in Depth Testing Checklist

```markdown
## Defense in Depth Testing Checklist

### Physical/Infrastructure Layer
- [ ] Cloud security configuration review
- [ ] Container security scanning
- [ ] Infrastructure as Code security

### Network Layer
- [ ] TLS configuration (version, ciphers)
- [ ] Security headers present
- [ ] CORS properly configured
- [ ] HTTP to HTTPS redirect
- [ ] Firewall rules validated

### Perimeter Layer
- [ ] WAF rules tested
- [ ] Rate limiting effective
- [ ] DDoS protection verified
- [ ] API gateway security

### Authentication Layer
- [ ] Password policy enforced
- [ ] Multi-factor authentication
- [ ] Brute force protection
- [ ] Session security
- [ ] Token security (JWT, etc.)

### Authorization Layer
- [ ] Role-based access control
- [ ] Horizontal privilege escalation prevented
- [ ] Vertical privilege escalation prevented
- [ ] IDOR vulnerabilities addressed

### Application Layer
- [ ] Input validation (SQL injection, XSS, etc.)
- [ ] Output encoding
- [ ] Error handling (no info leakage)
- [ ] Secure defaults

### Data Layer
- [ ] Encryption at rest
- [ ] Encryption in transit
- [ ] Password hashing
- [ ] Data masking in logs
- [ ] Data minimization
```

## Conclusion

Defense in depth requires testing each security layer independently while also validating that layers work together effectively. Test automation professionals should build comprehensive test suites that verify every layer of defense, ensuring that no single point of failure can compromise the entire system.

## Key Takeaways

1. Multiple layers of security provide redundant protection
2. Test each layer independently and as part of the whole
3. Application security tests should cover injection, XSS, and CSRF
4. Authentication and authorization are separate concerns
5. Network security includes TLS, headers, and CORS
6. Data security covers encryption, hashing, and masking
7. Assume any single layer can fail—others must compensate
