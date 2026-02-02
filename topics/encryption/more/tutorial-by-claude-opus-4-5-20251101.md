# Encryption

Encryption is the process of converting plain text or data into an unreadable format known as ciphertext, ensuring that only authorized parties with the appropriate key or password can decipher and read the information. For technology professionals, understanding encryption is fundamental to building secure systems, protecting sensitive data, and maintaining regulatory compliance.

## Why Encryption Matters

Encryption serves as a cornerstone of modern information security. It protects data confidentiality by rendering information meaningless to unauthorized viewers. It ensures data integrity by detecting tampering attempts. It enables secure communication across untrusted networks like the public internet. It satisfies compliance requirements for regulations such as GDPR, HIPAA, PCI-DSS, and SOC 2.

Without encryption, sensitive information—financial records, personal data, intellectual property, authentication credentials—would be exposed to anyone who intercepts network traffic or gains access to storage systems.

## Symmetric vs. Asymmetric Encryption

The two fundamental approaches to encryption differ in how keys are managed and used.

| Aspect | Symmetric Encryption | Asymmetric Encryption |
|--------|---------------------|----------------------|
| Keys used | Single shared key for encryption and decryption | Key pair: public key encrypts, private key decrypts |
| Speed | Fast, suitable for large data volumes | Slower, computationally intensive |
| Key distribution | Challenge: both parties must securely share the key | Easier: public keys can be freely distributed |
| Common algorithms | AES, ChaCha20, 3DES | RSA, ECC, Diffie-Hellman |
| Typical use cases | Encrypting files, database encryption, VPNs | Digital signatures, key exchange, TLS handshakes |

In practice, modern systems combine both approaches. Asymmetric encryption establishes a secure channel and exchanges a symmetric session key, which then encrypts the bulk data transfer. This hybrid approach delivers both security and performance.

## Major Encryption Algorithms

### Advanced Encryption Standard (AES)

AES is the dominant symmetric encryption algorithm, adopted as a U.S. government standard in 2001 after replacing DES. It operates on fixed block sizes of 128 bits and supports key lengths of 128, 192, or 256 bits. AES-256 is considered secure against all known attacks, including theoretical quantum computing threats with Grover's algorithm.

AES operates in various modes:

- **GCM (Galois/Counter Mode)**: Provides authenticated encryption, combining confidentiality with integrity verification
- **CBC (Cipher Block Chaining)**: Requires separate integrity checking; vulnerable to padding oracle attacks if implemented incorrectly
- **CTR (Counter Mode)**: Turns AES into a stream cipher; parallelizable for high performance

### RSA

RSA, developed in 1977, remains widely deployed for asymmetric encryption and digital signatures. Its security relies on the difficulty of factoring large prime numbers. Key sizes of 2048 bits are minimum for current security; 4096 bits provide additional margin.

RSA's primary limitations are performance (significantly slower than symmetric algorithms) and key size growth requirements as computational power increases.

### Elliptic Curve Cryptography (ECC)

ECC provides equivalent security to RSA with substantially smaller key sizes. A 256-bit ECC key offers security comparable to a 3072-bit RSA key. This efficiency makes ECC preferred for mobile devices, IoT, and performance-sensitive applications.

Common ECC curves include P-256 (NIST), Curve25519 (modern, widely trusted), and secp256k1 (used in Bitcoin).

### ChaCha20-Poly1305

This authenticated encryption algorithm, designed by Daniel Bernstein, serves as an alternative to AES-GCM. ChaCha20-Poly1305 performs well on devices lacking hardware AES acceleration and resists timing attacks. It's used in TLS 1.3, WireGuard VPN, and various mobile applications.

## Encryption at Rest vs. In Transit

| Encryption Type | Purpose | Common Implementations |
|----------------|---------|----------------------|
| At rest | Protects stored data on disks, databases, backups | Full-disk encryption (LUKS, BitLocker, FileVault), database TDE, encrypted backups |
| In transit | Protects data moving across networks | TLS/HTTPS, VPNs, SSH, encrypted messaging protocols |
| End-to-end | Ensures only endpoints can decrypt; intermediaries cannot read data | Signal Protocol, PGP/GPG, Matrix |

A comprehensive security posture requires both. Data encrypted only in transit becomes vulnerable once stored; data encrypted only at rest is exposed during transmission.

## Key Management

Encryption strength is meaningless if keys are poorly managed. Key management encompasses the entire lifecycle:

- **Generation**: Use cryptographically secure random number generators; never derive keys from weak sources
- **Storage**: Protect keys in hardware security modules (HSMs), key management services (AWS KMS, Azure Key Vault, HashiCorp Vault), or secure enclaves
- **Rotation**: Regularly rotate keys to limit exposure from potential compromise; automate rotation where possible
- **Access control**: Enforce least-privilege access to keys; audit all key usage
- **Destruction**: Securely destroy keys when no longer needed; ensure encrypted data becomes permanently inaccessible

The principle "don't roll your own crypto" extends to key management. Use established key management systems rather than building custom solutions.

## Common Implementation Pitfalls

Technology professionals should avoid these frequent encryption mistakes:

- **Using deprecated algorithms**: DES, 3DES, RC4, MD5, and SHA-1 are broken or weakened; use AES, ChaCha20, SHA-256/SHA-3
- **Hardcoding keys**: Never embed encryption keys in source code; use environment variables, secrets managers, or key vaults
- **Reusing initialization vectors (IVs)**: IVs or nonces must be unique for each encryption operation with the same key
- **Ignoring authentication**: Use authenticated encryption (AES-GCM, ChaCha20-Poly1305) to detect tampering; encryption alone doesn't guarantee integrity
- **Insufficient key length**: Use AES-256, RSA-2048 minimum (prefer 4096), ECC-256 or higher
- **Client-side only validation**: Server must validate and enforce encryption requirements; never trust client implementations alone

## Encryption and Compliance

Major regulations mandate encryption for protecting sensitive data:

| Regulation | Encryption Requirements |
|-----------|------------------------|
| GDPR | Encryption as appropriate technical measure for personal data protection |
| HIPAA | Encryption required for electronic protected health information (ePHI) at rest and in transit |
| PCI-DSS | Encryption mandatory for cardholder data transmission and storage |
| SOC 2 | Encryption expected as part of security controls |
| CCPA | Encryption as reasonable security measure for consumer data |

Document your encryption implementation, key management procedures, and algorithm choices to demonstrate compliance during audits.

## Quantum Computing Considerations

Current asymmetric algorithms (RSA, ECC, Diffie-Hellman) are vulnerable to Shor's algorithm running on sufficiently powerful quantum computers. While such computers don't yet exist, encrypted data captured today could be decrypted in the future ("harvest now, decrypt later" attacks).

Post-quantum cryptography (PQC) algorithms resistant to quantum attacks are being standardized by NIST. Technology professionals should:

- Monitor NIST PQC standardization progress (CRYSTALS-Kyber, CRYSTALS-Dilithium, SPHINCS+)
- Inventory systems using vulnerable asymmetric encryption
- Plan migration paths to hybrid or post-quantum algorithms
- Prioritize long-retention sensitive data for early migration

Symmetric algorithms like AES-256 remain secure against quantum attacks when using doubled key lengths.

## Best Practices Summary

- Use AES-256-GCM or ChaCha20-Poly1305 for symmetric encryption
- Use RSA-4096 or ECC P-256/Curve25519 for asymmetric operations
- Encrypt data both at rest and in transit
- Implement proper key management with HSMs or managed key services
- Never reuse IVs/nonces; generate them securely
- Always use authenticated encryption modes
- Keep cryptographic libraries updated
- Plan for post-quantum migration
- Document encryption decisions for compliance

Encryption is a critical tool but not a complete security solution. Combine it with access controls, authentication, monitoring, and security awareness to build defense in depth.
