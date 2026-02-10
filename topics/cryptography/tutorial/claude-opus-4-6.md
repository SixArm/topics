# Cryptography

Cryptography is the science and practice of securing information by transforming it into an unreadable format that can only be reversed by authorized parties. It underpins virtually every aspect of modern digital infrastructure, from secure web browsing and encrypted messaging to digital signatures and blockchain technology. For technology professionals, a working understanding of cryptographic principles is essential for designing secure systems, evaluating risk, and making informed architectural decisions about data protection.

## Core Concepts

Cryptography operates on a fundamental cycle: plaintext (readable data) is transformed into ciphertext (unreadable data) through encryption, and ciphertext is transformed back into plaintext through decryption. Both processes depend on cryptographic keys and algorithms.

- **Plaintext**: The original, unencrypted data that needs protection.
- **Ciphertext**: The encrypted output, which appears random and meaningless without the correct key.
- **Encryption**: The process of converting plaintext to ciphertext using an algorithm and a key.
- **Decryption**: The reverse process of restoring ciphertext to plaintext using the appropriate key.
- **Cryptographic key**: A piece of information (typically a string of bits) that determines the output of the encryption algorithm. Key length and randomness are critical to security strength.

## Symmetric Cryptography

Symmetric cryptography uses the same secret key for both encryption and decryption. Both the sender and the receiver must possess the key, and it must be kept confidential. Symmetric algorithms are generally fast and efficient, making them well-suited for encrypting large volumes of data such as disk encryption, database encryption, and real-time communication streams.

The primary challenge with symmetric cryptography is key distribution: how do two parties securely share a secret key without it being intercepted? This problem is often solved by using asymmetric cryptography to exchange symmetric keys, a hybrid approach used in protocols like TLS.

| Algorithm | Key Length | Status | Typical Use |
|-----------|-----------|--------|-------------|
| AES (Advanced Encryption Standard) | 128, 192, or 256 bits | Current standard | Disk encryption, TLS, VPNs |
| ChaCha20 | 256 bits | Current, widely adopted | Mobile devices, TLS (alternative to AES) |
| 3DES (Triple DES) | 168 bits effective | Deprecated | Legacy financial systems |
| DES (Data Encryption Standard) | 56 bits | Broken, obsolete | Historical reference only |
| Blowfish | 32 to 448 bits | Aging, not recommended for new designs | Older applications, bcrypt password hashing |

## Asymmetric Cryptography

Asymmetric cryptography, also called public-key cryptography, uses a mathematically related pair of keys: a public key that can be freely distributed and a private key that must remain secret. Data encrypted with the public key can only be decrypted with the corresponding private key, and vice versa. This eliminates the key distribution problem inherent in symmetric systems.

Asymmetric algorithms are computationally more expensive than symmetric ones, so they are typically used for key exchange, digital signatures, and encrypting small amounts of data rather than bulk encryption.

| Algorithm | Foundation | Typical Use |
|-----------|-----------|-------------|
| RSA | Integer factorization | Digital signatures, key exchange, TLS certificates |
| Diffie-Hellman (DH) | Discrete logarithm problem | Key exchange |
| Elliptic Curve Cryptography (ECC) | Elliptic curve discrete logarithm | TLS, mobile/IoT (smaller keys, equivalent security) |
| Ed25519 | Twisted Edwards curve | SSH keys, digital signatures |

## Hash Functions

Cryptographic hash functions take an arbitrary-length input and produce a fixed-length output (the hash or digest). They are one-way functions: it is computationally infeasible to reverse a hash back to its original input. Hash functions are foundational to digital signatures, message authentication codes (MACs), password storage, and data integrity verification.

A strong cryptographic hash function must exhibit these properties:

- **Pre-image resistance**: Given a hash value, it should be infeasible to find the original input.
- **Second pre-image resistance**: Given an input, it should be infeasible to find a different input that produces the same hash.
- **Collision resistance**: It should be infeasible to find any two distinct inputs that produce the same hash.

| Algorithm | Output Length | Status |
|-----------|-------------|--------|
| SHA-256 | 256 bits | Current standard, widely used |
| SHA-3 | 224, 256, 384, or 512 bits | Current standard, alternative to SHA-2 family |
| BLAKE2 / BLAKE3 | Variable | Current, high performance |
| SHA-1 | 160 bits | Deprecated, collision attacks demonstrated |
| MD5 | 128 bits | Broken, unsuitable for security purposes |

## Digital Signatures

Digital signatures provide three critical guarantees for electronic documents and communications:

- **Authentication**: The signature proves the identity of the signer.
- **Integrity**: Any modification to the signed data invalidates the signature.
- **Non-repudiation**: The signer cannot deny having signed the data, since only they possess the private key.

The signing process works by hashing the data and then encrypting the hash with the signer's private key. The recipient decrypts the signature with the signer's public key, independently hashes the received data, and compares the two values. A match confirms both the integrity and the authenticity of the message.

## Key Management

Even the strongest cryptographic algorithm is rendered useless by poor key management. Key management encompasses the entire lifecycle of cryptographic keys:

- **Generation**: Keys must be generated using cryptographically secure random number generators.
- **Distribution**: Keys must be transmitted through secure channels. Asymmetric cryptography and key agreement protocols address this.
- **Storage**: Keys must be stored securely, often in hardware security modules (HSMs), key management services (KMS), or secure enclaves.
- **Rotation**: Keys should be rotated periodically to limit the impact of a potential compromise.
- **Revocation and destruction**: Compromised or expired keys must be revoked and securely destroyed.

## Common Attacks and Vulnerabilities

Cryptographic systems face a range of threats that technology professionals must understand and defend against:

- **Brute force attacks**: Systematically trying every possible key until the correct one is found. Mitigated by using sufficiently long keys.
- **Side-channel attacks**: Exploiting physical characteristics of a cryptographic implementation, such as timing, power consumption, or electromagnetic emissions, rather than attacking the algorithm itself.
- **Man-in-the-middle attacks**: An attacker intercepts communication between two parties, potentially altering messages. Mitigated by certificate-based authentication and key pinning.
- **Quantum attacks**: Quantum computers running Shor's algorithm could break RSA and ECC. Post-quantum cryptography (PQC) algorithms such as CRYSTALS-Kyber and CRYSTALS-Dilithium are being standardized by NIST to address this threat.
- **Implementation flaws**: Bugs in cryptographic code, such as padding oracle vulnerabilities or insufficient randomness, are a frequent source of real-world breaches.

## Cryptography in Practice

Modern systems rarely use a single cryptographic primitive in isolation. Instead, they combine symmetric encryption, asymmetric key exchange, hash functions, and digital signatures into protocols:

- **TLS/SSL**: Secures web traffic (HTTPS). Uses asymmetric cryptography for key exchange, symmetric encryption for data transfer, and hash-based MACs for integrity.
- **PGP/GPG**: Provides end-to-end encrypted email using a hybrid of symmetric and asymmetric cryptography.
- **SSH**: Secures remote shell access using asymmetric key pairs for authentication and symmetric encryption for the session.
- **IPsec**: Secures network-layer traffic for VPNs.
- **Signal Protocol**: Powers end-to-end encryption in messaging applications using forward secrecy and the Double Ratchet algorithm.

## Related

Technology professionals studying cryptography should also explore encryption algorithms in depth, including AES and RSA internals. Related topics include certificate authorities and public key infrastructure (PKI), Transport Layer Security (TLS) protocol details, zero-knowledge proofs, homomorphic encryption, post-quantum cryptography standards, blockchain and distributed ledger technology, secure coding practices, and compliance frameworks such as FIPS 140-3 and Common Criteria that govern cryptographic implementations in regulated industries.

## Summary

Cryptography is the foundation of digital trust. It transforms readable data into protected ciphertext using symmetric algorithms for speed and asymmetric algorithms for secure key exchange and authentication. Hash functions ensure data integrity, and digital signatures provide non-repudiation. The strength of any cryptographic system depends not only on the algorithms chosen but also on rigorous key management, secure implementation, and awareness of evolving threats including quantum computing. For technology professionals, cryptography is not an optional specialization but a core competency required to build, evaluate, and maintain secure systems.

## References

- Ferguson, N., Schneier, B., & Kohno, T. (2010). *Cryptography Engineering: Design Principles and Practical Applications*. Wiley.
- Schneier, B. (2015). *Applied Cryptography: Protocols, Algorithms and Source Code in C* (20th Anniversary Edition). Wiley.
- Katz, J. & Lindell, Y. (2020). *Introduction to Modern Cryptography* (3rd Edition). CRC Press.
- NIST Special Publication 800-175B: *Guideline for Using Cryptographic Standards in the Federal Government*. [https://csrc.nist.gov/publications/detail/sp/800-175b/rev-1/final](https://csrc.nist.gov/publications/detail/sp/800-175b/rev-1/final)
- NIST Post-Quantum Cryptography Standardization. [https://csrc.nist.gov/projects/post-quantum-cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography)
- OWASP Cryptographic Failures. [https://owasp.org/Top10/A02_2021-Cryptographic_Failures/](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)
- RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3. [https://www.rfc-editor.org/rfc/rfc8446](https://www.rfc-editor.org/rfc/rfc8446)
