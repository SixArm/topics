# Cryptography algorithms

Cryptography algorithms are mathematical procedures and techniques used to secure data, communications, and digital identities by transforming readable plaintext into unintelligible ciphertext, and back again. These algorithms form the backbone of modern information security, enabling everything from secure web browsing and encrypted messaging to digital signatures and blockchain technology. A technology professional must understand the major categories of cryptographic algorithms, their strengths and trade-offs, and where each is best applied, in order to design systems that protect confidentiality, integrity, and authenticity.

## Symmetric Key Algorithms

Symmetric key algorithms use a single shared secret key for both encryption and decryption. Because both the sender and receiver must possess the same key, secure key distribution is a critical challenge. In exchange for that constraint, symmetric algorithms are significantly faster than their asymmetric counterparts, making them the standard choice for bulk data encryption.

Symmetric algorithms are further divided into two sub-categories:

- **Block ciphers** encrypt data in fixed-size blocks (commonly 128 bits). They apply multiple rounds of substitution and permutation to each block. AES is the dominant block cipher in use today.
- **Stream ciphers** encrypt data one bit or byte at a time, generating a pseudorandom keystream that is XORed with the plaintext. They are well suited for real-time communications where data arrives continuously.

| Algorithm | Type | Key Size | Block Size | Status |
|-----------|------|----------|------------|--------|
| AES (Advanced Encryption Standard) | Block cipher | 128, 192, or 256 bits | 128 bits | Current standard; widely adopted |
| 3DES (Triple DES) | Block cipher | 112 or 168 bits | 64 bits | Deprecated; being phased out |
| ChaCha20 | Stream cipher | 256 bits | N/A | Modern alternative to AES in software |
| RC4 (Rivest Cipher 4) | Stream cipher | 40–2048 bits | N/A | Broken; must not be used |
| Blowfish | Block cipher | 32–448 bits | 64 bits | Legacy; replaced by Twofish and AES |

AES operating in authenticated encryption modes such as AES-GCM is the recommended default for most applications. ChaCha20-Poly1305 is preferred on platforms that lack hardware AES acceleration.

## Asymmetric Key Algorithms

Asymmetric key algorithms, also called public key algorithms, use a mathematically related key pair: a public key that can be freely distributed, and a private key that must remain secret. Data encrypted with the public key can only be decrypted with the corresponding private key, and vice versa. This eliminates the key distribution problem inherent in symmetric cryptography, but at a significant cost in computational performance.

Common asymmetric algorithms include:

- **RSA (Rivest-Shamir-Adleman):** Based on the difficulty of factoring large integers. Used for encryption, digital signatures, and key exchange. Key sizes of 2048 bits or larger are required for adequate security.
- **Elliptic Curve Cryptography (ECC):** Based on the algebraic structure of elliptic curves over finite fields. Achieves equivalent security to RSA with much smaller key sizes, resulting in faster operations and lower bandwidth.
- **Diffie-Hellman (DH) and Elliptic Curve Diffie-Hellman (ECDH):** Key exchange protocols that allow two parties to establish a shared secret over an insecure channel without transmitting the secret itself.

| Algorithm | Foundation | Typical Key Size | Primary Use |
|-----------|-----------|-----------------|-------------|
| RSA | Integer factorization | 2048–4096 bits | Encryption, signatures, key exchange |
| ECC (e.g., P-256, Curve25519) | Elliptic curve discrete logarithm | 256–384 bits | Signatures, key agreement |
| Diffie-Hellman | Discrete logarithm | 2048+ bits | Key exchange |
| ECDH | Elliptic curve discrete logarithm | 256–384 bits | Key exchange |

In practice, asymmetric algorithms are used to exchange or establish symmetric keys, which then handle the bulk encryption. This hybrid approach combines the key management advantages of asymmetric cryptography with the performance of symmetric cryptography.

## Hash Functions

Cryptographic hash functions take an arbitrary-length input and produce a fixed-size output (the hash or digest). A good cryptographic hash function is deterministic, fast to compute, and exhibits three critical properties:

- **Pre-image resistance:** Given a hash value, it is computationally infeasible to find the original input.
- **Second pre-image resistance:** Given an input, it is infeasible to find a different input that produces the same hash.
- **Collision resistance:** It is infeasible to find any two distinct inputs that produce the same hash value.

Hash functions are used for data integrity verification, password storage (combined with salting and key stretching), digital signatures, and message authentication codes.

| Algorithm | Output Size | Status |
|-----------|------------|--------|
| SHA-256 | 256 bits | Current standard; widely used |
| SHA-3 (Keccak) | 224–512 bits | Current standard; alternative construction to SHA-2 |
| SHA-1 | 160 bits | Broken; collisions demonstrated; do not use |
| MD5 | 128 bits | Broken; trivially vulnerable to collisions |
| BLAKE2 / BLAKE3 | Variable | Modern, high-performance alternatives |

For password hashing specifically, use purpose-built functions such as Argon2, bcrypt, or scrypt, which are deliberately slow and memory-hard to resist brute-force and GPU-based attacks.

## Digital Signature Algorithms

Digital signatures provide authentication (proof of origin), integrity (detecting tampering), and non-repudiation (the signer cannot deny having signed). A digital signature is created by hashing the message and then encrypting the hash with the signer's private key. Anyone with the corresponding public key can verify the signature.

Key digital signature algorithms include:

- **RSA Signatures (PKCS#1, PSS):** The most widely deployed signature scheme, used in TLS certificates, code signing, and document signing.
- **DSA (Digital Signature Algorithm):** A US federal standard for digital signatures. Being superseded by ECDSA.
- **ECDSA (Elliptic Curve Digital Signature Algorithm):** Offers equivalent security to DSA and RSA with smaller keys and faster operations. Used extensively in TLS 1.3 and cryptocurrency systems.
- **EdDSA (Edwards-curve Digital Signature Algorithm):** A modern scheme based on twisted Edwards curves (e.g., Ed25519). Designed for high performance, resistance to side-channel attacks, and simplicity of implementation.

## Public Key Infrastructure

Public Key Infrastructure (PKI) is the framework of policies, procedures, and technology that manages digital certificates and public key encryption. PKI enables trusted communication between parties who have not previously established a shared secret.

Core components of PKI include:

- **Certificate Authorities (CAs):** Trusted entities that issue, sign, and revoke digital certificates.
- **Digital Certificates (X.509):** Bind a public key to an identity (person, server, or organization) and are signed by a CA.
- **Certificate Revocation Lists (CRLs) and OCSP:** Mechanisms to check whether a certificate has been revoked before its expiration.
- **Registration Authorities (RAs):** Verify the identity of certificate requesters before the CA issues a certificate.

PKI underpins TLS/SSL, secure email (S/MIME), code signing, VPNs, and many enterprise authentication systems.

## Homomorphic Encryption

Homomorphic encryption allows computations to be performed directly on ciphertext, producing an encrypted result that, when decrypted, matches the result of operations performed on the plaintext. This is significant for privacy-preserving computation in cloud environments, where a data owner can outsource computation without revealing the underlying data.

There are three levels of homomorphic encryption:

- **Partially Homomorphic Encryption (PHE):** Supports one type of operation (addition or multiplication) on ciphertext. Examples include RSA (multiplicative) and Paillier (additive).
- **Somewhat Homomorphic Encryption (SHE):** Supports a limited number of both additions and multiplications.
- **Fully Homomorphic Encryption (FHE):** Supports arbitrary computations on ciphertext. Practical FHE schemes are based on lattice problems such as Learning With Errors (LWE). Performance overhead remains substantial but is improving.

## Post-Quantum Cryptography

Classical asymmetric algorithms such as RSA, ECC, and Diffie-Hellman are vulnerable to attack by sufficiently powerful quantum computers running Shor's algorithm. Post-quantum cryptography (PQC) refers to algorithms designed to be secure against both classical and quantum adversaries.

NIST has standardized the following post-quantum algorithms:

- **ML-KEM (formerly CRYSTALS-Kyber):** A lattice-based key encapsulation mechanism for key exchange.
- **ML-DSA (formerly CRYSTALS-Dilithium):** A lattice-based digital signature scheme.
- **SLH-DSA (formerly SPHINCS+):** A hash-based digital signature scheme providing a conservative fallback.

Organizations should begin planning for cryptographic agility, the ability to swap algorithms without redesigning entire systems, to prepare for the post-quantum transition.

## Choosing the Right Algorithm

Selecting a cryptographic algorithm depends on the use case, performance requirements, and threat model. The following guidelines apply:

- **Encrypting data at rest or in transit:** Use AES-256-GCM or ChaCha20-Poly1305 for symmetric encryption, with key exchange via ECDH or a post-quantum KEM.
- **Hashing for integrity:** Use SHA-256 or SHA-3.
- **Password storage:** Use Argon2id, bcrypt, or scrypt.
- **Digital signatures:** Use Ed25519 or ECDSA with P-256. For post-quantum readiness, consider ML-DSA.
- **Key exchange:** Use ECDH (Curve25519) or ML-KEM for quantum resistance.
- **Avoid deprecated algorithms:** MD5, SHA-1, RC4, DES, and 3DES must not be used in new systems.

## Related

Related topics to explore next include symmetric encryption modes of operation (ECB, CBC, GCM, CTR), transport layer security (TLS) and its handshake protocol, certificate authority trust chains, key management best practices, cryptographic random number generation, zero-knowledge proofs, secure multi-party computation, hardware security modules (HSMs), and the OWASP Cryptographic Failures category for understanding common implementation mistakes.

## Summary

Cryptography algorithms are the mathematical foundation of information security. Symmetric algorithms like AES provide fast bulk encryption, asymmetric algorithms like RSA and ECC solve the key distribution problem, hash functions ensure data integrity, and digital signatures deliver authentication and non-repudiation. PKI ties these primitives together into a trust framework for real-world systems. Emerging areas such as homomorphic encryption and post-quantum cryptography are extending the boundaries of what cryptography can protect and ensuring its resilience against future threats. A technology professional must select well-vetted, current algorithms, avoid deprecated ones, and design systems with cryptographic agility to adapt as the landscape evolves.

## References

- NIST Special Publication 800-175B: "Guideline for Using Cryptographic Standards in the Federal Government." https://csrc.nist.gov/publications/detail/sp/800-175b/rev-1/final
- NIST Post-Quantum Cryptography Standardization. https://csrc.nist.gov/projects/post-quantum-cryptography
- Ferguson, N., Schneier, B., & Kohno, T. "Cryptography Engineering: Design Principles and Practical Applications." Wiley, 2010.
- Katz, J. & Lindell, Y. "Introduction to Modern Cryptography." CRC Press, 3rd edition, 2020.
- OWASP Cryptographic Failures. https://owasp.org/Top10/A02_2021-Cryptographic_Failures/
- RFC 8446: "The Transport Layer Security (TLS) Protocol Version 1.3." https://www.rfc-editor.org/rfc/rfc8446
- Bernstein, D.J. & Lange, T. "Post-Quantum Cryptography." https://pqcrypto.org/
