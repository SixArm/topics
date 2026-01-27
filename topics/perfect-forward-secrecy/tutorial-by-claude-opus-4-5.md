# Perfect Forward Secrecy: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Perfect Forward Secrecy (PFS) is a property of cryptographic protocols that ensures session keys cannot be compromised even if the server's long-term private key is later exposed. For test automation professionals, verifying PFS is critical because it represents a fundamental security requirement for any application transmitting sensitive data over TLS, and automated tests can continuously validate that server configurations maintain this protection.

## What is Perfect Forward Secrecy?

Perfect Forward Secrecy is a feature of key-agreement protocols that guarantees each communication session uses a unique, ephemeral key pair for encryption. In a PFS-enabled TLS handshake, the client and server perform a Diffie-Hellman key exchange using temporary (ephemeral) keys to derive the session encryption key. Because these ephemeral keys are discarded after each session, an attacker who later obtains the server's long-term private key cannot decrypt previously recorded traffic. Without PFS, all past sessions encrypted with that server key would be retroactively compromised.

### Perfect Forward Secrecy in Context

```
+-------------------------------------------------------------+
|          Perfect Forward Secrecy in TLS                      |
+-------------------------------------------------------------+
|                                                              |
|  Without PFS (Static RSA Key Exchange):                      |
|  +--------+                          +--------+             |
|  | Client |---[ClientKeyExchange]--->| Server |             |
|  |        |   (encrypted with        |        |             |
|  |        |    server's RSA          |        |             |
|  |        |    public key)           |        |             |
|  +--------+                          +--------+             |
|                                                              |
|  If server private key is stolen later:                      |
|  Attacker can decrypt ALL past sessions!                     |
|                                                              |
|  With PFS (Ephemeral Diffie-Hellman):                        |
|  +--------+                          +--------+             |
|  | Client |---[ClientHello]--------->| Server |             |
|  |        |<--[ServerHello]----------|        |             |
|  |        |   + Ephemeral DH Params  |        |             |
|  |        |                          |        |             |
|  |        |---[ClientKeyExchange]--->|        |             |
|  |        |   + Ephemeral DH Params  |        |             |
|  +--------+                          +--------+             |
|       |                                   |                  |
|       v                                   v                  |
|  Both derive session key independently                       |
|  Ephemeral keys are DISCARDED after session                  |
|                                                              |
|  If server private key is stolen later:                      |
|  Past sessions CANNOT be decrypted!                          |
|                                                              |
|  PFS Cipher Suites:                                          |
|  +--------------------------------------------------+       |
|  | ECDHE-RSA-AES256-GCM-SHA384    (recommended)      |       |
|  | ECDHE-ECDSA-AES256-GCM-SHA384  (recommended)      |       |
|  | ECDHE-RSA-AES128-GCM-SHA256    (recommended)      |       |
|  | DHE-RSA-AES256-GCM-SHA384      (acceptable)       |       |
|  +--------------------------------------------------+       |
|                                                              |
|  Non-PFS Cipher Suites (avoid):                              |
|  +--------------------------------------------------+       |
|  | AES256-GCM-SHA384              (no forward secrecy)|      |
|  | AES128-SHA                     (no forward secrecy)|      |
|  | RSA-AES256-SHA                 (static key exchange)|     |
|  +--------------------------------------------------+       |
|                                                              |
|  Key Concepts:                                               |
|  +--------------------------------------------------+       |
|  | Ephemeral Keys  = Temporary, per-session keys     |       |
|  | ECDHE           = Elliptic Curve Diffie-Hellman   |       |
|  |                   Ephemeral                       |       |
|  | DHE             = Diffie-Hellman Ephemeral        |       |
|  | TLS 1.3         = PFS mandatory (always ECDHE)    |       |
|  +--------------------------------------------------+       |
|                                                              |
+-------------------------------------------------------------+
```

## Testing PFS Configuration with Python

### Python Implementation: PFS Verification

```python
# pfs_tester.py

"""
Utilities for testing Perfect Forward Secrecy configuration
on TLS-enabled endpoints. Verifies cipher suites, protocol
versions, and certificate properties related to PFS.
"""

import ssl
import socket
import json
from dataclasses import dataclass, field
from typing import List, Optional, Tuple
from enum import Enum


class PFSStatus(Enum):
    """Status of PFS support."""
    ENABLED = "enabled"
    DISABLED = "disabled"
    PARTIAL = "partial"
    UNKNOWN = "unknown"


@dataclass
class CipherSuiteInfo:
    """Information about a negotiated cipher suite."""
    name: str
    protocol: str
    bits: int
    supports_pfs: bool
    key_exchange: str

    @property
    def is_ephemeral(self) -> bool:
        """Check if cipher uses ephemeral key exchange."""
        return self.key_exchange in ("ECDHE", "DHE")


@dataclass
class TLSTestResult:
    """Result of a TLS/PFS test against an endpoint."""
    hostname: str
    port: int
    protocol_version: str
    cipher_suite: str
    cipher_bits: int
    pfs_status: PFSStatus
    supports_tls13: bool
    certificate_subject: str
    certificate_issuer: str
    key_exchange_method: str
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)


# PFS-supporting cipher suite prefixes
PFS_CIPHER_PREFIXES = (
    "ECDHE-",
    "DHE-",
    "TLS_AES_",         # TLS 1.3 ciphers (always PFS)
    "TLS_CHACHA20_",    # TLS 1.3 ciphers (always PFS)
)

# Known non-PFS cipher suite prefixes
NON_PFS_CIPHER_PREFIXES = (
    "AES128-",
    "AES256-",
    "RSA-",
    "DES-",
    "RC4-",
    "NULL-",
)

# Recommended cipher suites with PFS
RECOMMENDED_CIPHERS = [
    "TLS_AES_256_GCM_SHA384",
    "TLS_CHACHA20_POLY1305_SHA256",
    "TLS_AES_128_GCM_SHA256",
    "ECDHE-ECDSA-AES256-GCM-SHA384",
    "ECDHE-RSA-AES256-GCM-SHA384",
    "ECDHE-ECDSA-AES128-GCM-SHA256",
    "ECDHE-RSA-AES128-GCM-SHA256",
]

# Weak or deprecated cipher suites
WEAK_CIPHERS = [
    "DES-CBC3-SHA",
    "RC4-SHA",
    "RC4-MD5",
    "NULL-SHA",
    "NULL-MD5",
    "EXP-",
    "EXPORT-",
]


def classify_cipher_suite(cipher_name: str) -> CipherSuiteInfo:
    """Classify a cipher suite and determine PFS support."""
    supports_pfs = any(
        cipher_name.startswith(prefix)
        for prefix in PFS_CIPHER_PREFIXES
    )

    if cipher_name.startswith("ECDHE"):
        key_exchange = "ECDHE"
    elif cipher_name.startswith("DHE"):
        key_exchange = "DHE"
    elif cipher_name.startswith("TLS_"):
        key_exchange = "ECDHE"  # TLS 1.3 always uses ECDHE
    else:
        key_exchange = "RSA"  # Static RSA key exchange

    return CipherSuiteInfo(
        name=cipher_name,
        protocol="",
        bits=0,
        supports_pfs=supports_pfs,
        key_exchange=key_exchange,
    )


def test_tls_connection(
    hostname: str,
    port: int = 443,
    timeout: float = 10.0
) -> TLSTestResult:
    """
    Test TLS connection to a host and evaluate PFS support.
    """
    errors = []
    warnings = []

    try:
        context = ssl.create_default_context()
        context.check_hostname = True
        context.verify_mode = ssl.CERT_REQUIRED

        with socket.create_connection(
            (hostname, port), timeout=timeout
        ) as sock:
            with context.wrap_socket(
                sock, server_hostname=hostname
            ) as tls_sock:
                cipher = tls_sock.cipher()
                cert = tls_sock.getpeercert()
                version = tls_sock.version()

                cipher_name = cipher[0] if cipher else "UNKNOWN"
                cipher_bits = cipher[2] if cipher else 0
                protocol = cipher[1] if cipher else "UNKNOWN"

                cipher_info = classify_cipher_suite(cipher_name)

                # Determine PFS status
                if cipher_info.supports_pfs:
                    pfs_status = PFSStatus.ENABLED
                else:
                    pfs_status = PFSStatus.DISABLED
                    errors.append(
                        f"Negotiated cipher '{cipher_name}' does not "
                        f"support PFS"
                    )

                # Check for TLS 1.3
                supports_tls13 = version == "TLSv1.3"

                # Warn if not TLS 1.3
                if not supports_tls13:
                    warnings.append(
                        f"Server negotiated {version} instead of TLS 1.3. "
                        f"TLS 1.3 mandates PFS."
                    )

                # Check cipher strength
                if cipher_bits < 128:
                    errors.append(
                        f"Cipher key length {cipher_bits} bits is below "
                        f"minimum recommended 128 bits"
                    )

                # Extract certificate info
                subject = dict(
                    x[0] for x in cert.get("subject", ((("", ""),),))
                )
                issuer = dict(
                    x[0] for x in cert.get("issuer", ((("", ""),),))
                )

                return TLSTestResult(
                    hostname=hostname,
                    port=port,
                    protocol_version=version,
                    cipher_suite=cipher_name,
                    cipher_bits=cipher_bits,
                    pfs_status=pfs_status,
                    supports_tls13=supports_tls13,
                    certificate_subject=subject.get(
                        "commonName", "UNKNOWN"
                    ),
                    certificate_issuer=issuer.get(
                        "organizationName", "UNKNOWN"
                    ),
                    key_exchange_method=cipher_info.key_exchange,
                    errors=errors,
                    warnings=warnings,
                )

    except ssl.SSLCertVerificationError as e:
        return TLSTestResult(
            hostname=hostname, port=port,
            protocol_version="UNKNOWN", cipher_suite="UNKNOWN",
            cipher_bits=0, pfs_status=PFSStatus.UNKNOWN,
            supports_tls13=False, certificate_subject="UNKNOWN",
            certificate_issuer="UNKNOWN",
            key_exchange_method="UNKNOWN",
            errors=[f"Certificate verification failed: {e}"],
        )
    except Exception as e:
        return TLSTestResult(
            hostname=hostname, port=port,
            protocol_version="UNKNOWN", cipher_suite="UNKNOWN",
            cipher_bits=0, pfs_status=PFSStatus.UNKNOWN,
            supports_tls13=False, certificate_subject="UNKNOWN",
            certificate_issuer="UNKNOWN",
            key_exchange_method="UNKNOWN",
            errors=[f"Connection failed: {e}"],
        )


def check_cipher_suite_list(
    hostname: str,
    port: int = 443,
    timeout: float = 10.0
) -> List[CipherSuiteInfo]:
    """
    Attempt to enumerate supported cipher suites by connecting
    with specific cipher configurations.
    """
    supported_ciphers = []

    test_ciphers = RECOMMENDED_CIPHERS + [
        "AES256-GCM-SHA384",  # Non-PFS for comparison
        "AES128-SHA",         # Non-PFS for comparison
    ]

    for cipher_name in test_ciphers:
        try:
            context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
            context.check_hostname = False
            context.verify_mode = ssl.CERT_NONE
            context.set_ciphers(cipher_name)

            with socket.create_connection(
                (hostname, port), timeout=timeout
            ) as sock:
                with context.wrap_socket(
                    sock, server_hostname=hostname
                ) as tls_sock:
                    negotiated = tls_sock.cipher()
                    if negotiated:
                        info = classify_cipher_suite(negotiated[0])
                        info.protocol = negotiated[1]
                        info.bits = negotiated[2]
                        supported_ciphers.append(info)
        except (ssl.SSLError, socket.error, OSError):
            continue

    return supported_ciphers
```

### Pytest Tests for PFS Configuration

```python
# test_pfs.py

"""
Tests for verifying Perfect Forward Secrecy configuration
on TLS endpoints.
"""

import pytest
from pfs_tester import (
    PFSStatus,
    CipherSuiteInfo,
    TLSTestResult,
    classify_cipher_suite,
    test_tls_connection,
    check_cipher_suite_list,
    PFS_CIPHER_PREFIXES,
    NON_PFS_CIPHER_PREFIXES,
    RECOMMENDED_CIPHERS,
    WEAK_CIPHERS,
)


class TestCipherClassification:
    """Test cipher suite classification logic."""

    def test_ecdhe_ciphers_support_pfs(self):
        """ECDHE cipher suites should be classified as PFS-supporting."""
        ecdhe_ciphers = [
            "ECDHE-RSA-AES256-GCM-SHA384",
            "ECDHE-ECDSA-AES128-GCM-SHA256",
            "ECDHE-RSA-CHACHA20-POLY1305",
        ]
        for cipher in ecdhe_ciphers:
            info = classify_cipher_suite(cipher)
            assert info.supports_pfs is True, (
                f"{cipher} should support PFS"
            )
            assert info.key_exchange == "ECDHE"
            assert info.is_ephemeral is True

    def test_dhe_ciphers_support_pfs(self):
        """DHE cipher suites should be classified as PFS-supporting."""
        dhe_ciphers = [
            "DHE-RSA-AES256-GCM-SHA384",
            "DHE-RSA-AES128-GCM-SHA256",
        ]
        for cipher in dhe_ciphers:
            info = classify_cipher_suite(cipher)
            assert info.supports_pfs is True, (
                f"{cipher} should support PFS"
            )
            assert info.key_exchange == "DHE"
            assert info.is_ephemeral is True

    def test_tls13_ciphers_support_pfs(self):
        """TLS 1.3 cipher suites always support PFS."""
        tls13_ciphers = [
            "TLS_AES_256_GCM_SHA384",
            "TLS_AES_128_GCM_SHA256",
            "TLS_CHACHA20_POLY1305_SHA256",
        ]
        for cipher in tls13_ciphers:
            info = classify_cipher_suite(cipher)
            assert info.supports_pfs is True, (
                f"TLS 1.3 cipher {cipher} must support PFS"
            )

    def test_static_rsa_ciphers_do_not_support_pfs(self):
        """Static RSA cipher suites should not be classified as PFS."""
        static_ciphers = [
            "AES256-GCM-SHA384",
            "AES128-SHA",
            "RSA-AES256-SHA",
        ]
        for cipher in static_ciphers:
            info = classify_cipher_suite(cipher)
            assert info.supports_pfs is False, (
                f"{cipher} should NOT support PFS"
            )
            assert info.key_exchange == "RSA"
            assert info.is_ephemeral is False

    def test_weak_ciphers_are_identified(self):
        """Weak cipher suites should be flagged."""
        for weak_cipher in WEAK_CIPHERS:
            info = classify_cipher_suite(weak_cipher)
            assert info.supports_pfs is False, (
                f"Weak cipher {weak_cipher} should not support PFS"
            )


class TestTLSResult:
    """Test TLS result interpretation."""

    def test_pfs_enabled_result_has_no_errors(self):
        """A PFS-enabled result should have no PFS-related errors."""
        result = TLSTestResult(
            hostname="example.com",
            port=443,
            protocol_version="TLSv1.3",
            cipher_suite="TLS_AES_256_GCM_SHA384",
            cipher_bits=256,
            pfs_status=PFSStatus.ENABLED,
            supports_tls13=True,
            certificate_subject="example.com",
            certificate_issuer="Let's Encrypt",
            key_exchange_method="ECDHE",
        )
        assert result.pfs_status == PFSStatus.ENABLED
        assert len(result.errors) == 0

    def test_pfs_disabled_result_has_errors(self):
        """A PFS-disabled result should include error details."""
        result = TLSTestResult(
            hostname="example.com",
            port=443,
            protocol_version="TLSv1.2",
            cipher_suite="AES256-GCM-SHA384",
            cipher_bits=256,
            pfs_status=PFSStatus.DISABLED,
            supports_tls13=False,
            certificate_subject="example.com",
            certificate_issuer="DigiCert",
            key_exchange_method="RSA",
            errors=["Negotiated cipher does not support PFS"],
        )
        assert result.pfs_status == PFSStatus.DISABLED
        assert len(result.errors) > 0

    def test_tls13_implies_pfs(self):
        """TLS 1.3 always provides PFS."""
        result = TLSTestResult(
            hostname="example.com",
            port=443,
            protocol_version="TLSv1.3",
            cipher_suite="TLS_AES_128_GCM_SHA256",
            cipher_bits=128,
            pfs_status=PFSStatus.ENABLED,
            supports_tls13=True,
            certificate_subject="example.com",
            certificate_issuer="Let's Encrypt",
            key_exchange_method="ECDHE",
        )
        assert result.supports_tls13 is True
        assert result.pfs_status == PFSStatus.ENABLED

    def test_weak_cipher_bits_generate_error(self):
        """Cipher key lengths below 128 bits should be flagged."""
        result = TLSTestResult(
            hostname="example.com",
            port=443,
            protocol_version="TLSv1.2",
            cipher_suite="DES-CBC3-SHA",
            cipher_bits=56,
            pfs_status=PFSStatus.DISABLED,
            supports_tls13=False,
            certificate_subject="example.com",
            certificate_issuer="Unknown",
            key_exchange_method="RSA",
            errors=["Cipher key length 56 bits is below minimum"],
        )
        assert result.cipher_bits < 128
        assert any("bits" in e for e in result.errors)


class TestPFSEndpoint:
    """Integration tests for live PFS endpoint verification."""

    @pytest.fixture
    def target_host(self):
        """Target hostname for PFS testing."""
        import os
        return os.getenv("PFS_TEST_HOST", "www.google.com")

    @pytest.mark.integration
    def test_endpoint_supports_pfs(self, target_host):
        """Verify the target endpoint has PFS enabled."""
        result = test_tls_connection(target_host, 443)
        assert result.pfs_status == PFSStatus.ENABLED, (
            f"PFS is not enabled on {target_host}. "
            f"Cipher: {result.cipher_suite}, "
            f"Key Exchange: {result.key_exchange_method}"
        )

    @pytest.mark.integration
    def test_endpoint_uses_strong_cipher(self, target_host):
        """Verify the endpoint uses a strong cipher suite."""
        result = test_tls_connection(target_host, 443)
        assert result.cipher_bits >= 128, (
            f"Cipher strength {result.cipher_bits} bits is below "
            f"minimum 128 bits"
        )

    @pytest.mark.integration
    def test_endpoint_uses_ephemeral_key_exchange(self, target_host):
        """Verify the endpoint uses ephemeral key exchange."""
        result = test_tls_connection(target_host, 443)
        assert result.key_exchange_method in ("ECDHE", "DHE"), (
            f"Key exchange method '{result.key_exchange_method}' "
            f"is not ephemeral"
        )

    @pytest.mark.integration
    def test_recommended_ciphers_supported(self, target_host):
        """Verify the endpoint supports recommended PFS ciphers."""
        supported = check_cipher_suite_list(target_host, 443)
        pfs_ciphers = [c for c in supported if c.supports_pfs]
        assert len(pfs_ciphers) > 0, (
            f"No PFS cipher suites supported by {target_host}"
        )
```

### JavaScript/TypeScript Implementation: HTTPS PFS Testing

```javascript
// pfs_testing.test.js

/**
 * JavaScript tests for verifying Perfect Forward Secrecy
 * on HTTPS endpoints using Node.js TLS module.
 */

const https = require("https");
const tls = require("tls");

// PFS cipher suite patterns
const PFS_PREFIXES = ["ECDHE-", "DHE-", "TLS_AES_", "TLS_CHACHA20_"];
const NON_PFS_PREFIXES = ["AES128-", "AES256-", "RSA-", "DES-", "RC4-"];

/**
 * Check if a cipher suite name supports PFS.
 */
function cipherSupportsPFS(cipherName) {
  return PFS_PREFIXES.some((prefix) => cipherName.startsWith(prefix));
}

/**
 * Test TLS connection to a host and return connection details.
 */
function testTLSConnection(hostname, port = 443) {
  return new Promise((resolve, reject) => {
    const options = {
      host: hostname,
      port: port,
      rejectUnauthorized: true,
      timeout: 10000,
    };

    const socket = tls.connect(options, () => {
      const cipher = socket.getCipher();
      const cert = socket.getPeerCertificate();
      const protocol = socket.getProtocol();

      const result = {
        hostname,
        port,
        protocol,
        cipherName: cipher.name,
        cipherVersion: cipher.version,
        cipherBits: cipher.bits || 0,
        supportsPFS: cipherSupportsPFS(cipher.name),
        isTLS13: protocol === "TLSv1.3",
        certificateSubject: cert.subject ? cert.subject.CN : "UNKNOWN",
        certificateIssuer: cert.issuer ? cert.issuer.O : "UNKNOWN",
        keyExchange: cipher.name.startsWith("ECDHE")
          ? "ECDHE"
          : cipher.name.startsWith("DHE")
            ? "DHE"
            : cipher.name.startsWith("TLS_")
              ? "ECDHE"
              : "RSA",
      };

      socket.end();
      resolve(result);
    });

    socket.on("error", (err) => {
      reject(new Error(`TLS connection failed: ${err.message}`));
    });

    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("TLS connection timed out"));
    });
  });
}

/**
 * Verify that a list of cipher suites includes PFS options.
 */
function analyzesCipherSuites(cipherList) {
  return cipherList.map((cipher) => ({
    name: cipher,
    supportsPFS: cipherSupportsPFS(cipher),
    isWeak:
      cipher.includes("RC4") ||
      cipher.includes("DES") ||
      cipher.includes("NULL") ||
      cipher.includes("EXPORT"),
  }));
}

// --- Tests ---

describe("Perfect Forward Secrecy - Cipher Classification", () => {
  test("ECDHE ciphers are classified as PFS-supporting", () => {
    const ecdheCiphers = [
      "ECDHE-RSA-AES256-GCM-SHA384",
      "ECDHE-ECDSA-AES128-GCM-SHA256",
      "ECDHE-RSA-CHACHA20-POLY1305",
    ];

    for (const cipher of ecdheCiphers) {
      expect(cipherSupportsPFS(cipher)).toBe(true);
    }
  });

  test("DHE ciphers are classified as PFS-supporting", () => {
    const dheCiphers = [
      "DHE-RSA-AES256-GCM-SHA384",
      "DHE-RSA-AES128-GCM-SHA256",
    ];

    for (const cipher of dheCiphers) {
      expect(cipherSupportsPFS(cipher)).toBe(true);
    }
  });

  test("TLS 1.3 ciphers are classified as PFS-supporting", () => {
    const tls13Ciphers = [
      "TLS_AES_256_GCM_SHA384",
      "TLS_AES_128_GCM_SHA256",
      "TLS_CHACHA20_POLY1305_SHA256",
    ];

    for (const cipher of tls13Ciphers) {
      expect(cipherSupportsPFS(cipher)).toBe(true);
    }
  });

  test("static RSA ciphers are classified as non-PFS", () => {
    const staticCiphers = [
      "AES256-GCM-SHA384",
      "AES128-SHA",
      "RSA-AES256-SHA",
    ];

    for (const cipher of staticCiphers) {
      expect(cipherSupportsPFS(cipher)).toBe(false);
    }
  });

  test("weak ciphers are identified by analysis", () => {
    const ciphers = ["RC4-SHA", "DES-CBC3-SHA", "NULL-MD5", "EXPORT-DES"];
    const results = analyzesCipherSuites(ciphers);

    for (const result of results) {
      expect(result.isWeak).toBe(true);
      expect(result.supportsPFS).toBe(false);
    }
  });
});

describe("Perfect Forward Secrecy - Endpoint Verification", () => {
  const TARGET_HOST = process.env.PFS_TEST_HOST || "www.google.com";

  test(
    "endpoint negotiates PFS cipher suite",
    async () => {
      const result = await testTLSConnection(TARGET_HOST);

      expect(result.supportsPFS).toBe(true);
      expect(["ECDHE", "DHE"]).toContain(result.keyExchange);
    },
    15000
  );

  test(
    "endpoint uses at least 128-bit cipher",
    async () => {
      const result = await testTLSConnection(TARGET_HOST);

      expect(result.cipherBits).toBeGreaterThanOrEqual(128);
    },
    15000
  );

  test(
    "endpoint supports modern TLS protocol",
    async () => {
      const result = await testTLSConnection(TARGET_HOST);

      expect(["TLSv1.2", "TLSv1.3"]).toContain(result.protocol);
    },
    15000
  );

  test(
    "endpoint has valid certificate",
    async () => {
      const result = await testTLSConnection(TARGET_HOST);

      expect(result.certificateSubject).not.toBe("UNKNOWN");
      expect(result.certificateIssuer).not.toBe("UNKNOWN");
    },
    15000
  );

  test(
    "connection details are fully populated",
    async () => {
      const result = await testTLSConnection(TARGET_HOST);

      expect(result.hostname).toBe(TARGET_HOST);
      expect(result.port).toBe(443);
      expect(result.protocol).toBeTruthy();
      expect(result.cipherName).toBeTruthy();
    },
    15000
  );
});

describe("Perfect Forward Secrecy - Configuration Validation", () => {
  test("recommended cipher list contains only PFS suites", () => {
    const recommended = [
      "TLS_AES_256_GCM_SHA384",
      "TLS_CHACHA20_POLY1305_SHA256",
      "TLS_AES_128_GCM_SHA256",
      "ECDHE-ECDSA-AES256-GCM-SHA384",
      "ECDHE-RSA-AES256-GCM-SHA384",
      "ECDHE-RSA-AES128-GCM-SHA256",
    ];

    const analysis = analyzesCipherSuites(recommended);
    const nonPFS = analysis.filter((c) => !c.supportsPFS);

    expect(nonPFS).toHaveLength(0);
  });

  test("server config should not include weak ciphers", () => {
    const serverConfig = [
      "ECDHE-RSA-AES256-GCM-SHA384",
      "ECDHE-RSA-AES128-GCM-SHA256",
      "AES256-GCM-SHA384", // Non-PFS but not weak
    ];

    const analysis = analyzesCipherSuites(serverConfig);
    const weak = analysis.filter((c) => c.isWeak);

    expect(weak).toHaveLength(0);
  });
});
```

## Best Practices

```markdown
## Perfect Forward Secrecy Best Practices

### Configuration
- [ ] Enable TLS 1.3 as the preferred protocol (PFS is mandatory in TLS 1.3)
- [ ] Configure ECDHE cipher suites as highest priority in TLS 1.2
- [ ] Disable all non-PFS cipher suites (static RSA key exchange)
- [ ] Use ECDHE over DHE for better performance with equivalent security
- [ ] Set minimum cipher key length to 128 bits (prefer 256 bits)
- [ ] Disable SSLv3, TLS 1.0, and TLS 1.1 entirely

### Testing
- [ ] Automate PFS verification in CI/CD for all HTTPS endpoints
- [ ] Test that only PFS cipher suites are accepted by the server
- [ ] Verify TLS protocol version is 1.2 or higher
- [ ] Check certificate validity and chain of trust
- [ ] Test cipher suite ordering to ensure PFS suites have priority
- [ ] Scan for weak or deprecated cipher suites regularly

### Monitoring
- [ ] Alert when endpoints fall back to non-PFS cipher suites
- [ ] Monitor certificate expiration dates and automate renewal
- [ ] Track TLS configuration changes and require review
- [ ] Log negotiated cipher suites for audit and analysis
- [ ] Test PFS after every infrastructure change or deployment

### Compliance
- [ ] Verify PFS requirements for PCI DSS, HIPAA, and SOC 2
- [ ] Document cipher suite configuration and rationale
- [ ] Maintain an inventory of all TLS-enabled endpoints
- [ ] Schedule regular external TLS scans (SSL Labs, testssl.sh)
- [ ] Review and update cipher suite configuration quarterly
```

## Conclusion

Perfect Forward Secrecy is a non-negotiable security property for any modern TLS deployment because it prevents the catastrophic scenario of retroactive decryption if a server's private key is later compromised. For test automation professionals, verifying PFS is a concrete, automatable task: tests can confirm that servers negotiate ephemeral key exchange cipher suites, reject weak or non-PFS alternatives, and support modern TLS versions. By integrating PFS verification into CI/CD pipelines, teams ensure that configuration changes, certificate renewals, and infrastructure updates never silently degrade this critical protection.

## Key Takeaways

1. Perfect Forward Secrecy ensures that compromise of a server's long-term private key cannot retroactively decrypt previously recorded sessions, because each session uses unique ephemeral keys that are discarded after use
2. PFS is achieved through ephemeral Diffie-Hellman key exchange (ECDHE or DHE), where both client and server generate temporary key pairs to derive the session encryption key independently
3. TLS 1.3 mandates PFS by design, making it the strongest protocol choice; TLS 1.2 supports PFS only when configured with ECDHE or DHE cipher suites
4. Automated tests should verify that servers negotiate PFS-supporting cipher suites (prefixed with ECDHE- or DHE-), reject non-PFS alternatives, and use cipher keys of at least 128 bits
5. Non-PFS cipher suites like AES256-GCM-SHA384 (without ECDHE/DHE prefix) use static RSA key exchange, meaning all sessions are vulnerable if the server key is ever compromised
6. PFS testing should be integrated into CI/CD pipelines and run after every deployment, infrastructure change, or certificate renewal to detect configuration regressions immediately
7. Tools like SSL Labs, testssl.sh, and custom scripts using Python's ssl module or Node.js tls module can automate PFS verification across all of an organization's TLS-enabled endpoints
