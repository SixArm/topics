# Encryption

Encryption is the process of transforming readable data, known as plaintext, into an unreadable format called ciphertext, using a mathematical algorithm and a cryptographic key. Only parties possessing the correct key can reverse the process and recover the original data. Encryption is a foundational pillar of information security, protecting the confidentiality, integrity, and authenticity of data whether it is at rest on a storage device, in transit across a network, or in use within an application. For technology professionals, understanding encryption is essential for designing secure systems, meeting compliance requirements, and defending against increasingly sophisticated threat actors.

## How Encryption Works

Encryption operates by applying a mathematical function, called a cipher, to plaintext along with a secret value called a key. The cipher produces ciphertext that is computationally infeasible to reverse without the key. Decryption is the inverse operation: applying the corresponding key to the ciphertext to recover the original plaintext. The security of an encryption scheme depends not on the secrecy of the algorithm itself, but on the secrecy and strength of the key, a principle known as Kerckhoffs's principle. Modern encryption algorithms are publicly scrutinized and standardized precisely because their security rests entirely on key management rather than on obscurity.

## Symmetric Encryption

Symmetric encryption uses a single shared key for both encryption and decryption. Because both the sender and receiver must possess the same secret key, the primary challenge is secure key distribution. Symmetric ciphers are computationally efficient and well-suited for encrypting large volumes of data.

- **Block ciphers** operate on fixed-size blocks of data (e.g., 128 bits) and apply multiple rounds of substitution and permutation. AES is the dominant block cipher in use today.
- **Stream ciphers** encrypt data one bit or byte at a time, generating a pseudorandom keystream that is XORed with the plaintext. ChaCha20 is a widely adopted stream cipher, particularly in mobile and embedded contexts.
- **Key length** directly affects security. A 256-bit AES key provides a keyspace of 2^256, which is computationally infeasible to brute-force with any known or foreseeable technology.
- **Modes of operation** determine how a block cipher handles data larger than a single block. Common modes include CBC (Cipher Block Chaining), CTR (Counter), and GCM (Galois/Counter Mode), which provides both encryption and authentication.

## Asymmetric Encryption

Asymmetric encryption, also called public-key cryptography, uses a mathematically related key pair: a public key that can be freely distributed and a private key that must be kept secret. Data encrypted with the public key can only be decrypted with the corresponding private key, and vice versa. This eliminates the key distribution problem inherent in symmetric systems, but asymmetric operations are significantly slower.

- **RSA** relies on the computational difficulty of factoring large prime numbers. Key sizes of 2048 bits or greater are considered secure for current use.
- **Elliptic Curve Cryptography (ECC)** achieves equivalent security to RSA with much smaller key sizes, resulting in faster operations and lower resource consumption. A 256-bit ECC key provides roughly the same security as a 3072-bit RSA key.
- **Diffie-Hellman key exchange** allows two parties to establish a shared secret over an insecure channel without transmitting the secret itself. It is commonly used to negotiate symmetric session keys.
- **Digital signatures** use the private key to sign data, allowing anyone with the public key to verify the signature's authenticity and the data's integrity.

## Comparison of Symmetric and Asymmetric Encryption

| Characteristic | Symmetric Encryption | Asymmetric Encryption |
|---|---|---|
| Key count | One shared key | Key pair (public + private) |
| Speed | Fast, efficient for bulk data | Slower, computationally expensive |
| Key distribution | Requires secure out-of-band exchange | Public key can be shared openly |
| Key length for equivalent security | 128–256 bits (AES) | 2048–4096 bits (RSA) or 256–384 bits (ECC) |
| Primary use cases | Data encryption at rest and in transit | Key exchange, digital signatures, authentication |
| Examples | AES, ChaCha20, Twofish | RSA, ECC, Ed25519 |

In practice, most systems use a hybrid approach: asymmetric encryption establishes a shared session key, and symmetric encryption handles the bulk data transfer. TLS, PGP, and SSH all follow this pattern.

## Common Encryption Standards and Algorithms

| Algorithm | Type | Key Size | Status |
|---|---|---|---|
| AES (Advanced Encryption Standard) | Symmetric block cipher | 128, 192, or 256 bits | Current standard, widely adopted |
| ChaCha20-Poly1305 | Symmetric stream cipher + MAC | 256 bits | Current, favored for mobile/embedded |
| RSA | Asymmetric | 2048–4096 bits | Widely used, being gradually replaced by ECC |
| ECC (e.g., P-256, Curve25519) | Asymmetric | 256–384 bits | Current standard for key exchange and signatures |
| 3DES (Triple DES) | Symmetric block cipher | 168 bits effective | Deprecated, avoid for new systems |
| DES (Data Encryption Standard) | Symmetric block cipher | 56 bits | Broken, must not be used |
| Blowfish | Symmetric block cipher | 32–448 bits | Legacy, superseded by AES and Twofish |

## Encryption at Rest, in Transit, and in Use

Encryption strategies are typically categorized by the state of the data being protected.

- **Encryption at rest** protects data stored on disk, in databases, or on backup media. Full-disk encryption (e.g., BitLocker, LUKS, FileVault), file-level encryption, and transparent database encryption (TDE) are common implementations. This defends against physical theft and unauthorized access to storage.
- **Encryption in transit** protects data moving across networks. TLS (Transport Layer Security) is the dominant protocol for securing web traffic, email, APIs, and other network communications. VPNs (Virtual Private Networks) and IPsec provide encryption at the network layer.
- **Encryption in use** protects data while it is being processed. Technologies such as homomorphic encryption, secure enclaves (Intel SGX, ARM TrustZone), and confidential computing enable computation on encrypted data without exposing the plaintext, though these technologies are still maturing.

## Key Management

The security of any encryption system ultimately depends on how keys are generated, stored, distributed, rotated, and destroyed. Poor key management is the most common point of failure in encrypted systems.

- **Key generation** must use cryptographically secure random number generators (CSPRNGs). Weak randomness compromises key strength regardless of algorithm choice.
- **Key storage** should use dedicated hardware security modules (HSMs), trusted platform modules (TPMs), or cloud key management services (e.g., AWS KMS, Azure Key Vault, Google Cloud KMS). Keys must never be stored in plaintext alongside the data they protect.
- **Key rotation** limits the exposure window if a key is compromised. Automated rotation policies reduce operational risk.
- **Key escrow and recovery** procedures must balance availability requirements against the risk of unauthorized access to escrowed keys.
- **Key destruction** must be irreversible. When keys are retired, they must be securely erased from all storage locations, rendering the associated ciphertext permanently unrecoverable.

## Hashing vs. Encryption

Encryption is sometimes confused with hashing, but they serve different purposes. Encryption is a reversible process designed to protect confidentiality: given the key, ciphertext can be converted back to plaintext. Hashing is a one-way function that produces a fixed-size digest from arbitrary input; it cannot be reversed. Hashing is used for data integrity verification, password storage (using salted hashes with algorithms like bcrypt, scrypt, or Argon2), and digital signatures. A secure system typically uses both: encryption to protect data confidentiality and hashing to verify data integrity.

## Regulatory and Compliance Considerations

Encryption is mandated or strongly recommended by numerous regulatory frameworks and industry standards.

- **GDPR** (General Data Protection Regulation) identifies encryption as a safeguard for personal data and may reduce breach notification obligations when encrypted data is compromised.
- **HIPAA** (Health Insurance Portability and Accountability Act) requires encryption of electronic protected health information (ePHI) in transit and recommends it at rest.
- **PCI DSS** (Payment Card Industry Data Security Standard) requires encryption of cardholder data in transit over open networks and mandates strong cryptographic controls for stored data.
- **FIPS 140-2/140-3** defines security requirements for cryptographic modules used in U.S. federal systems. AES, SHA-2, and approved elliptic curves are among the FIPS-validated algorithms.
- **SOC 2** includes encryption as a key control for the security and confidentiality trust service criteria.

Failure to implement appropriate encryption can result in regulatory penalties, legal liability, and reputational damage following a data breach.

## Post-Quantum Cryptography

Quantum computers, when sufficiently advanced, will be capable of breaking widely used asymmetric algorithms. Shor's algorithm can factor large integers and compute discrete logarithms in polynomial time, rendering RSA, ECC, and Diffie-Hellman insecure. Symmetric algorithms are less affected: Grover's algorithm effectively halves the key length, meaning AES-256 would provide 128-bit security against a quantum adversary, which remains adequate.

NIST has standardized post-quantum cryptographic algorithms to address this threat, including ML-KEM (formerly CRYSTALS-Kyber) for key encapsulation and ML-DSA (formerly CRYSTALS-Dilithium) for digital signatures. These lattice-based algorithms are designed to resist both classical and quantum attacks. Organizations should begin planning for cryptographic agility, the ability to swap algorithms without redesigning entire systems, to prepare for the transition to post-quantum cryptography.

## Common Pitfalls and Best Practices

- **Do not roll your own cryptography.** Use well-established, peer-reviewed libraries such as OpenSSL, libsodium, or platform-provided cryptographic APIs.
- **Do not use deprecated algorithms.** DES, MD5, SHA-1, and RC4 are broken or weak and must not be used for security purposes.
- **Always use authenticated encryption.** Modes like AES-GCM or constructions like ChaCha20-Poly1305 provide both confidentiality and integrity. Unauthenticated encryption (e.g., AES-CBC without a MAC) is vulnerable to padding oracle and other attacks.
- **Never hardcode keys** in source code, configuration files, or container images.
- **Use unique initialization vectors (IVs) and nonces.** Reusing an IV or nonce with the same key can catastrophically compromise security, particularly in stream ciphers and counter modes.
- **Enforce TLS 1.2 or later** for all network communications. Disable SSLv3, TLS 1.0, and TLS 1.1.

## Related

Encryption connects to a broad set of security and systems topics. To deepen your understanding, explore cryptography for the mathematical foundations; authentication, authorization, accounting, and auditing (AAAA) for the broader security framework; digital certificates and certificate authorities for public key infrastructure; defense in depth for layered security architecture; hashing for integrity verification; perfect forward secrecy for session key isolation; network protocols for understanding TLS and IPsec in context; and compliance frameworks such as GDPR, HIPAA, and PCI DSS for regulatory requirements that drive encryption adoption.

## Summary

Encryption is one of the most critical tools in a technology professional's security arsenal. By transforming readable data into ciphertext that can only be recovered with the correct key, encryption protects confidentiality across storage, network, and processing boundaries. Modern practice relies on symmetric algorithms like AES for bulk encryption and asymmetric algorithms like ECC for key exchange and authentication, typically combined in hybrid protocols such as TLS. Effective encryption requires rigorous key management, adherence to current standards, avoidance of deprecated algorithms, and awareness of emerging threats from quantum computing. When implemented correctly alongside complementary security controls, encryption provides strong, measurable protection for sensitive data throughout its lifecycle.

## References

- National Institute of Standards and Technology. (2001). *FIPS 197: Advanced Encryption Standard (AES)*. https://csrc.nist.gov/publications/detail/fips/197/final
- National Institute of Standards and Technology. (2024). *FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard (ML-KEM)*. https://csrc.nist.gov/publications/detail/fips/203/final
- National Institute of Standards and Technology. (2024). *FIPS 204: Module-Lattice-Based Digital Signature Standard (ML-DSA)*. https://csrc.nist.gov/publications/detail/fips/204/final
- Katz, J., & Lindell, Y. (2020). *Introduction to Modern Cryptography* (3rd ed.). CRC Press.
- Ferguson, N., Schneier, B., & Kohno, T. (2010). *Cryptography Engineering: Design Principles and Practical Applications*. Wiley.
- Rescorla, E. (2018). *RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3*. Internet Engineering Task Force. https://datatracker.ietf.org/doc/html/rfc8446
- Bernstein, D. J. (2008). *ChaCha, a variant of Salsa20*. https://cr.yp.to/chacha.html
- OWASP Foundation. *Cryptographic Storage Cheat Sheet*. https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html
