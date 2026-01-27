# Transport Layer Security: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Transport Layer Security (TLS) is the cryptographic protocol that secures communication over networks, providing privacy, integrity, and authentication. For test automation professionals, testing TLS configuration ensures that applications properly protect data in transit and reject insecure connections.

## What is Transport Layer Security?

TLS is the successor to SSL and is the standard protocol for encrypting network communications. It uses certificates, cipher suites, and handshake protocols to establish secure connections between clients and servers. Proper TLS configuration is critical for protecting sensitive data.

### TLS in Context

```
┌─────────────────────────────────────────────────────────────┐
│                Transport Layer Security                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TLS Handshake (simplified):                                │
│                                                             │
│  Client                          Server                     │
│    │──── ClientHello ──────────►│                           │
│    │     (supported versions,    │                           │
│    │      cipher suites)         │                           │
│    │◄─── ServerHello ───────────│                           │
│    │     (chosen version,        │                           │
│    │      cipher, certificate)   │                           │
│    │──── Key Exchange ─────────►│                           │
│    │◄─── Finished ──────────────│                           │
│    │◄═══ Encrypted Data ═══════►│                           │
│                                                             │
│  Testing Checklist:                                         │
│  ├── TLS version: Only 1.2+ allowed                       │
│  ├── Cipher suites: Strong ciphers only                    │
│  ├── Certificate: Valid, not expired, correct CN           │
│  ├── HSTS: Strict-Transport-Security header present        │
│  ├── Redirect: HTTP → HTTPS automatic redirect            │
│  ├── Mixed content: No HTTP resources on HTTPS pages       │
│  └── Certificate pinning: Mobile app validates cert         │
│                                                             │
│  Common Vulnerabilities:                                    │
│  ├── SSLv3 / TLS 1.0 / TLS 1.1 still enabled             │
│  ├── Weak cipher suites (RC4, DES, NULL)                   │
│  ├── Expired or self-signed certificates                   │
│  ├── Missing HSTS header                                   │
│  └── No HTTP-to-HTTPS redirect                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing TLS Configuration

```python
# transport_layer_security.py

"""
Testing TLS/SSL configuration for security compliance.
"""

import pytest
from dataclasses import dataclass, field
from typing import List, Dict, Set


@dataclass
class TLSConfig:
    """Represents a server's TLS configuration."""
    versions_enabled: Set[str]
    cipher_suites: List[str]
    certificate_valid: bool
    certificate_days_remaining: int
    hsts_enabled: bool
    hsts_max_age: int = 0
    http_redirect: bool = False
    ocsp_stapling: bool = False


class TLSSecurityTester:
    """Test TLS configuration against security standards."""

    SECURE_VERSIONS = {"TLS 1.2", "TLS 1.3"}
    INSECURE_VERSIONS = {"SSL 2.0", "SSL 3.0", "TLS 1.0", "TLS 1.1"}

    WEAK_CIPHERS = {
        "RC4", "DES", "3DES", "NULL", "EXPORT", "anon",
        "MD5",  # Weak hash
    }

    MIN_HSTS_AGE = 31536000  # 1 year in seconds
    MIN_CERT_DAYS = 30  # Minimum days before expiry warning

    def test_protocol_versions(self, config: TLSConfig) -> Dict:
        insecure = config.versions_enabled & self.INSECURE_VERSIONS
        secure = config.versions_enabled & self.SECURE_VERSIONS

        return {
            "passed": len(insecure) == 0 and len(secure) > 0,
            "secure_versions": list(secure),
            "insecure_versions": list(insecure),
            "recommendation": (
                f"Disable: {', '.join(insecure)}" if insecure
                else "Protocol versions are secure"
            ),
        }

    def test_cipher_suites(self, config: TLSConfig) -> Dict:
        weak = []
        for cipher in config.cipher_suites:
            for weak_pattern in self.WEAK_CIPHERS:
                if weak_pattern.lower() in cipher.lower():
                    weak.append(cipher)
                    break

        return {
            "passed": len(weak) == 0,
            "total_ciphers": len(config.cipher_suites),
            "weak_ciphers": weak,
            "recommendation": (
                f"Remove weak ciphers: {', '.join(weak)}" if weak
                else "Cipher suite configuration is secure"
            ),
        }

    def test_certificate(self, config: TLSConfig) -> Dict:
        issues = []
        if not config.certificate_valid:
            issues.append("Certificate is invalid or expired")
        if config.certificate_days_remaining < self.MIN_CERT_DAYS:
            issues.append(f"Certificate expires in {config.certificate_days_remaining} days")

        return {
            "passed": len(issues) == 0,
            "valid": config.certificate_valid,
            "days_remaining": config.certificate_days_remaining,
            "issues": issues,
        }

    def test_hsts(self, config: TLSConfig) -> Dict:
        issues = []
        if not config.hsts_enabled:
            issues.append("HSTS not enabled")
        elif config.hsts_max_age < self.MIN_HSTS_AGE:
            issues.append(f"HSTS max-age {config.hsts_max_age}s is below minimum {self.MIN_HSTS_AGE}s")

        return {
            "passed": config.hsts_enabled and config.hsts_max_age >= self.MIN_HSTS_AGE,
            "enabled": config.hsts_enabled,
            "max_age": config.hsts_max_age,
            "issues": issues,
        }

    def test_http_redirect(self, config: TLSConfig) -> Dict:
        return {
            "passed": config.http_redirect,
            "recommendation": (
                "HTTP-to-HTTPS redirect is configured"
                if config.http_redirect
                else "Enable automatic HTTP-to-HTTPS redirect"
            ),
        }

    def full_audit(self, config: TLSConfig) -> Dict:
        results = {
            "protocols": self.test_protocol_versions(config),
            "ciphers": self.test_cipher_suites(config),
            "certificate": self.test_certificate(config),
            "hsts": self.test_hsts(config),
            "http_redirect": self.test_http_redirect(config),
        }

        all_passed = all(r["passed"] for r in results.values())

        return {
            "overall": "PASS" if all_passed else "FAIL",
            "checks": results,
            "failed_checks": [k for k, v in results.items() if not v["passed"]],
        }


# Tests
class TestTLSSecurity:

    @pytest.fixture
    def tester(self):
        return TLSSecurityTester()

    @pytest.fixture
    def secure_config(self):
        return TLSConfig(
            versions_enabled={"TLS 1.2", "TLS 1.3"},
            cipher_suites=["TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256"],
            certificate_valid=True,
            certificate_days_remaining=180,
            hsts_enabled=True,
            hsts_max_age=63072000,
            http_redirect=True,
        )

    @pytest.fixture
    def insecure_config(self):
        return TLSConfig(
            versions_enabled={"SSL 3.0", "TLS 1.0", "TLS 1.2"},
            cipher_suites=["RC4-SHA", "DES-CBC3-SHA", "TLS_AES_256_GCM_SHA384"],
            certificate_valid=True,
            certificate_days_remaining=10,
            hsts_enabled=False,
            http_redirect=False,
        )

    def test_secure_config_passes(self, tester, secure_config):
        result = tester.full_audit(secure_config)
        assert result["overall"] == "PASS"
        assert len(result["failed_checks"]) == 0

    def test_insecure_versions_detected(self, tester, insecure_config):
        result = tester.test_protocol_versions(insecure_config)
        assert not result["passed"]
        assert "SSL 3.0" in result["insecure_versions"]

    def test_weak_ciphers_detected(self, tester, insecure_config):
        result = tester.test_cipher_suites(insecure_config)
        assert not result["passed"]
        assert len(result["weak_ciphers"]) > 0

    def test_certificate_expiry_warning(self, tester, insecure_config):
        result = tester.test_certificate(insecure_config)
        assert not result["passed"]

    def test_missing_hsts_detected(self, tester, insecure_config):
        result = tester.test_hsts(insecure_config)
        assert not result["passed"]

    def test_full_audit_reports_failures(self, tester, insecure_config):
        result = tester.full_audit(insecure_config)
        assert result["overall"] == "FAIL"
        assert len(result["failed_checks"]) > 0
```

## Best Practices

```markdown
## Testing TLS Configuration

### Protocol Security
- [ ] Verify only TLS 1.2 and 1.3 are enabled
- [ ] Confirm SSLv3, TLS 1.0, and TLS 1.1 are disabled
- [ ] Test cipher suite strength — no RC4, DES, or NULL ciphers
- [ ] Validate certificate validity and expiration dates

### Headers and Redirects
- [ ] Verify HSTS header with max-age >= 1 year
- [ ] Confirm HTTP-to-HTTPS redirect is in place
- [ ] Check for mixed content on HTTPS pages
- [ ] Test OCSP stapling if supported

### Automation
- [ ] Include TLS checks in CI/CD security gates
- [ ] Monitor certificate expiry with automated alerts
- [ ] Scan for new vulnerabilities in enabled cipher suites
- [ ] Test TLS configuration after every infrastructure change
```

## Conclusion

Transport Layer Security is the foundation of secure network communication. Test automation professionals must verify that TLS is configured correctly — proper protocol versions, strong cipher suites, valid certificates, and security headers — to ensure applications protect data in transit.

## Key Takeaways

1. TLS encrypts data in transit between clients and servers
2. Only TLS 1.2 and 1.3 should be enabled; disable all older versions
3. Weak cipher suites (RC4, DES, NULL) must be removed
4. Certificates must be valid and monitored for approaching expiry
5. HSTS headers prevent protocol downgrade attacks
6. HTTP-to-HTTPS redirects ensure all traffic is encrypted
7. Automate TLS configuration testing in CI/CD pipelines
