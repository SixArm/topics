## Cryptography

Cryptography is the practice of securing communication from third-party intervention. It provides three fundamental guarantees for digital systems: privacy (keeping data hidden from unauthorized parties), confidentiality (ensuring only intended recipients can access information), and integrity (detecting any tampering or modification). Every secure transaction, authenticated login, and encrypted message depends on cryptographic principles.

## How Cryptography Works

Cryptography transforms readable data (plaintext) into an unreadable format (ciphertext) using mathematical algorithms and secret values called keys. Encryption converts plaintext to ciphertext, while decryption reverses the process. Without the correct key, ciphertext appears as meaningless random data.

The security of modern cryptographic systems relies on computational difficulty rather than secrecy of the algorithm itself. Well-designed cryptographic algorithms are published openly; their security comes from the mathematical infeasibility of deriving the key from the ciphertext within any practical timeframe.

## Symmetric Cryptography

Symmetric cryptography uses a single shared key for both encryption and decryption. Both the sender and receiver must possess the same secret key before communicating securely.

**Advantages:**
- Fast encryption and decryption speeds
- Efficient for large data volumes
- Lower computational overhead

**Disadvantages:**
- Key distribution problem: how do parties securely share the key initially?
- Key management scales poorly: N parties require N(N-1)/2 unique keys for pairwise communication
- No built-in authentication of sender identity

| Algorithm | Key Size | Status | Use Case |
|-----------|----------|--------|----------|
| AES (Advanced Encryption Standard) | 128, 192, 256 bits | Current standard | General-purpose encryption |
| ChaCha20 | 256 bits | Modern, secure | Mobile devices, TLS |
| DES (Data Encryption Standard) | 56 bits | Deprecated | Legacy systems only |
| 3DES (Triple DES) | 168 bits | Being phased out | Payment card industry |
| Blowfish | 32-448 bits | Outdated | Legacy applications |

AES remains the gold standard for symmetric encryption. ChaCha20 offers comparable security with better performance on devices lacking hardware AES acceleration.

## Asymmetric Cryptography

Asymmetric cryptography (public-key cryptography) uses mathematically linked key pairs: a public key that can be freely distributed and a private key that must remain secret. Data encrypted with a public key can only be decrypted with the corresponding private key, and vice versa.

**Advantages:**
- Solves the key distribution problem
- Enables digital signatures
- Scales efficiently: each party needs only one key pair

**Disadvantages:**
- Significantly slower than symmetric cryptography
- Larger key sizes required for equivalent security
- Computationally intensive

| Algorithm | Key Size | Security Basis | Use Case |
|-----------|----------|----------------|----------|
| RSA | 2048-4096 bits | Integer factorization | Key exchange, signatures |
| ECDSA | 256-384 bits | Elliptic curve discrete logarithm | Digital signatures |
| ECDH | 256-384 bits | Elliptic curve discrete logarithm | Key agreement |
| Ed25519 | 256 bits | Elliptic curve | Modern signatures |
| Diffie-Hellman | 2048+ bits | Discrete logarithm | Key exchange |

Elliptic Curve Cryptography (ECC) provides equivalent security to RSA with much smaller key sizes, making it preferred for mobile and embedded systems.

## Hybrid Cryptography

In practice, systems combine symmetric and asymmetric cryptography to leverage the strengths of each. This hybrid approach is standard in protocols like TLS/HTTPS:

1. Use asymmetric cryptography to securely exchange a symmetric session key
2. Use the symmetric key for bulk data encryption
3. Discard the session key after communication ends

This provides the key distribution benefits of asymmetric cryptography with the performance of symmetric cryptography.

## Hash Functions

Cryptographic hash functions produce fixed-length outputs (digests) from arbitrary-length inputs. A good hash function is:

- **Deterministic:** Same input always produces same output
- **One-way:** Computationally infeasible to reverse
- **Collision-resistant:** Extremely difficult to find two inputs producing the same output
- **Avalanche effect:** Small input changes cause dramatic output changes

| Algorithm | Output Size | Status |
|-----------|-------------|--------|
| SHA-256 | 256 bits | Current standard |
| SHA-384 | 384 bits | Current standard |
| SHA-512 | 512 bits | Current standard |
| SHA-3 | 224-512 bits | Current standard |
| MD5 | 128 bits | Broken, avoid |
| SHA-1 | 160 bits | Deprecated |

Hash functions are essential for password storage, data integrity verification, digital signatures, and blockchain technology.

## Digital Signatures

Digital signatures combine hash functions with asymmetric cryptography to provide:

- **Authentication:** Proves the identity of the signer
- **Integrity:** Detects any modification to the signed data
- **Non-repudiation:** Signer cannot deny having signed

The signing process:
1. Hash the message to create a fixed-length digest
2. Encrypt the digest with the signer's private key
3. Attach the encrypted digest (signature) to the message

Verification:
1. Decrypt the signature using the signer's public key
2. Hash the received message independently
3. Compare the two digests; a match confirms authenticity and integrity

## Key Management

Secure cryptography requires secure key management. Key management encompasses:

- **Generation:** Keys must come from cryptographically secure random sources
- **Storage:** Keys require protection at rest (hardware security modules, secure enclaves)
- **Distribution:** Secure channels or key exchange protocols
- **Rotation:** Regular key replacement limits exposure from compromises
- **Revocation:** Mechanisms to invalidate compromised keys
- **Destruction:** Secure deletion when keys are no longer needed

Poor key management undermines even the strongest algorithms.

## Common Applications

| Application | Cryptographic Methods Used |
|-------------|---------------------------|
| HTTPS/TLS | Hybrid encryption, certificates, signatures |
| Password storage | Salted hashing (bcrypt, Argon2) |
| VPNs | Symmetric encryption, key exchange |
| Email encryption (PGP/GPG) | Hybrid encryption, signatures |
| Disk encryption | Symmetric encryption (AES-XTS) |
| Cryptocurrency | Hash functions, digital signatures |
| Code signing | Digital signatures, certificates |
| Two-factor authentication | HMAC-based one-time passwords |

## Cryptographic Attacks

Cryptographic systems face various attack vectors:

- **Brute force:** Trying all possible keys; mitigated by sufficient key length
- **Side-channel attacks:** Exploiting timing, power consumption, or electromagnetic emissions during cryptographic operations
- **Man-in-the-middle:** Intercepting and potentially altering communication; mitigated by authentication
- **Implementation flaws:** Bugs in cryptographic software (buffer overflows, improper randomness)
- **Social engineering:** Tricking humans into revealing keys or credentials
- **Quantum attacks:** Future quantum computers could break RSA and ECC using Shor's algorithm

## Post-Quantum Cryptography

Quantum computers threaten current asymmetric cryptography. NIST has standardized post-quantum algorithms:

| Algorithm | Type | Purpose |
|-----------|------|---------|
| ML-KEM (Kyber) | Lattice-based | Key encapsulation |
| ML-DSA (Dilithium) | Lattice-based | Digital signatures |
| SLH-DSA (SPHINCS+) | Hash-based | Digital signatures |

Organizations should begin planning migration to post-quantum algorithms, particularly for data requiring long-term confidentiality.

## Best Practices for Technology Professionals

- Use established, well-vetted cryptographic libraries rather than implementing algorithms yourself
- Keep cryptographic libraries updated to patch vulnerabilities
- Use authenticated encryption modes (AES-GCM, ChaCha20-Poly1305) rather than plain encryption
- Generate keys using cryptographically secure random number generators
- Store passwords using purpose-built functions (Argon2, bcrypt) rather than plain hashes
- Plan for cryptographic agility: design systems to allow algorithm upgrades
- Protect keys with hardware security modules where feasible
- Implement proper certificate validation in TLS connections
- Begin assessing post-quantum readiness for long-lived secrets

Cryptography forms the foundation of digital security. Understanding its principles, selecting appropriate algorithms, and implementing them correctly are essential competencies for technology professionals building secure systems.
