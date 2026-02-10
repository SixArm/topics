# Homomorphic encryption

Homomorphic encryption is a cryptographic technique that enables computation on encrypted data without first decrypting it. Unlike traditional encryption, where data must be decrypted before any meaningful operation can be performed, homomorphic encryption preserves the mathematical structure of the underlying plaintext, allowing additions, multiplications, and even arbitrary functions to be evaluated directly on ciphertexts. The results, once decrypted, are identical to what would have been obtained by performing the same operations on the unencrypted data. This property makes homomorphic encryption one of the most important primitives in modern privacy-preserving computation, with profound implications for cloud computing, healthcare analytics, financial services, and any domain where sensitive data must be processed by untrusted parties.

## Core concept

The fundamental principle behind homomorphic encryption is the preservation of algebraic structure through encryption. Given an encryption function E and a computation function f, homomorphic encryption guarantees that decrypting f(E(x)) yields the same result as f(x). The data owner encrypts their plaintext, sends the ciphertext to a third party, and that third party performs computations on the ciphertext without ever learning the plaintext values. When the encrypted result is returned and decrypted by the data owner, it matches the result of performing the same computation on the original plaintext. This eliminates the traditional trade-off between data utility and data confidentiality.

## Types of homomorphic encryption

Homomorphic encryption schemes are classified by the range and depth of computations they support. The three primary categories differ significantly in capability, efficiency, and practical applicability.

| Type | Supported Operations | Computation Depth | Performance | Example Schemes |
|------|---------------------|-------------------|-------------|-----------------|
| Partially Homomorphic Encryption (PHE) | One operation (addition or multiplication) | Unlimited for the supported operation | Fast, practical for production use | RSA (multiplicative), Paillier (additive), ElGamal (multiplicative) |
| Somewhat Homomorphic Encryption (SHE) | Both addition and multiplication | Limited number of sequential operations | Moderate overhead | BGN scheme |
| Fully Homomorphic Encryption (FHE) | Arbitrary computations (any boolean or arithmetic circuit) | Unlimited | High computational cost, active area of optimization | BGV, BFV, CKKS, TFHE |

**Partially Homomorphic Encryption (PHE)** supports a single type of operation, either addition or multiplication, but can apply that operation an unlimited number of times. The Paillier cryptosystem, for example, supports additive homomorphism, making it suitable for applications like secure voting, where encrypted votes can be summed without decryption. PHE schemes are the most efficient and have been used in production systems for decades.

**Somewhat Homomorphic Encryption (SHE)** supports both addition and multiplication, but only for a limited number of sequential operations. Each operation introduces noise into the ciphertext, and after a certain threshold the ciphertext becomes too noisy to decrypt correctly. SHE is useful when the computation required is known in advance and fits within the noise budget.

**Fully Homomorphic Encryption (FHE)** supports arbitrary computations of any depth. FHE schemes employ a technique called bootstrapping, introduced by Craig Gentry in his landmark 2009 thesis, which periodically reduces the noise in a ciphertext, allowing an unlimited number of operations. Bootstrapping is computationally expensive, but it transforms SHE into FHE and makes general-purpose encrypted computation theoretically possible.

## Historical development

The concept of computing on encrypted data dates back to 1978, when Rivest, Adleman, and Dertouzos first posed the question of whether it was possible to perform arbitrary operations on encrypted data. For three decades the problem remained open. Partial solutions existed, such as RSA's multiplicative homomorphism and Paillier's additive homomorphism, but no scheme supported both operations simultaneously with unlimited depth.

The breakthrough came in 2009 when Craig Gentry, in his Stanford PhD thesis, constructed the first fully homomorphic encryption scheme based on ideal lattices. Gentry's construction demonstrated that bootstrapping could be used to refresh noisy ciphertexts, enabling unlimited computation depth. While the original scheme was far too slow for practical use, it proved that FHE was achievable and launched an intensive research effort.

Subsequent generations of FHE schemes have dramatically improved performance:

- **Second generation (2011-2012):** The BGV and BFV schemes introduced more efficient noise management through modulus switching, reducing the cost of homomorphic operations by orders of magnitude.
- **Third generation (2013-2015):** The GSW scheme and its derivatives simplified the mathematical framework and introduced new techniques for bootstrapping.
- **Fourth generation (2016-present):** The CKKS scheme enabled approximate arithmetic on encrypted real numbers, making FHE practical for machine learning and statistical analysis. The TFHE scheme achieved fast bootstrapping, enabling efficient evaluation of boolean circuits.

## Mathematical foundations

Homomorphic encryption schemes are built on computational hardness assumptions from lattice-based cryptography, which are believed to be resistant to both classical and quantum attacks. The two primary hardness assumptions are:

- **Learning With Errors (LWE):** Given a system of approximate linear equations over a finite field, it is computationally hard to recover the secret vector. The "errors" or "noise" terms are what make the problem difficult and also what limits the number of homomorphic operations before bootstrapping is required.
- **Ring Learning With Errors (RLWE):** A structured variant of LWE that operates over polynomial rings, providing significantly better performance while maintaining strong security guarantees. Most modern FHE schemes are based on RLWE.

The noise growth during homomorphic operations is a central challenge. Additions cause noise to grow linearly, while multiplications cause noise to grow quadratically. Managing this noise, through careful parameter selection, modulus switching, and bootstrapping, is the core engineering challenge in practical FHE implementations.

## Applications

Homomorphic encryption enables secure computation across a wide range of domains where data privacy is critical.

**Cloud computing and outsourced computation.** Organizations can encrypt sensitive data, upload it to a cloud provider, and have the cloud provider perform computations without ever accessing the plaintext. This eliminates the need to trust cloud providers with raw data and addresses a fundamental barrier to cloud adoption in regulated industries.

**Healthcare and genomics.** Medical researchers can perform statistical analyses, train machine learning models, and run diagnostic algorithms on encrypted patient data. Genomic data, which is both deeply personal and scientifically valuable, can be analyzed across institutions without revealing individual genomes. The iDASH competition has demonstrated practical FHE applications in genomic privacy.

**Financial services.** Banks and financial institutions can perform fraud detection, credit scoring, and anti-money-laundering analyses on encrypted transaction data. Multiple institutions can collaborate on joint analyses without revealing their proprietary data to each other.

**Machine learning and artificial intelligence.** FHE enables privacy-preserving inference, where a client sends encrypted data to a server running a trained model, and the server returns encrypted predictions without learning anything about the input. Schemes like CKKS are particularly well-suited for the approximate arithmetic used in neural networks.

**Secure voting and auctions.** Additively homomorphic schemes like Paillier can tally encrypted votes without revealing individual ballots. Sealed-bid auctions can determine winners without revealing losing bids.

## Performance considerations

The computational overhead of homomorphic encryption remains its primary limitation, though performance has improved dramatically since 2009.

| Metric | Unencrypted Baseline | PHE (Paillier) | FHE (CKKS/BFV) |
|--------|---------------------|-----------------|-----------------|
| Ciphertext expansion | 1x | 10-100x | 1,000-10,000x |
| Addition latency | Nanoseconds | Microseconds | Microseconds to milliseconds |
| Multiplication latency | Nanoseconds | Not supported | Milliseconds to seconds |
| Bootstrapping latency | N/A | N/A | Milliseconds to seconds |
| Memory requirements | Baseline | Moderate | Very high |

Several strategies are used to mitigate performance costs:

- **Batching (SIMD):** Modern FHE schemes can pack thousands of plaintext values into a single ciphertext and perform operations on all of them simultaneously, amortizing the cost of encryption and computation.
- **Leveled FHE:** By fixing the maximum computation depth in advance, leveled schemes avoid bootstrapping entirely, significantly reducing overhead for known workloads.
- **Hardware acceleration:** GPU and FPGA implementations of FHE primitives have demonstrated 10-100x speedups over CPU-only implementations. Dedicated FHE accelerator chips are under active development by companies like Intel and DARPA-funded research programs.
- **Algorithmic optimization:** Techniques such as Number Theoretic Transform (NTT) for polynomial multiplication and Residue Number System (RNS) representation have reduced the cost of core FHE operations.

## Major libraries and frameworks

The FHE ecosystem includes several mature open-source libraries:

- **Microsoft SEAL:** Implements BFV and CKKS schemes, widely used in research and industry, with C++ and .NET interfaces.
- **HElib:** Developed by IBM, implements the BGV scheme with advanced bootstrapping and SIMD support.
- **TFHE:** Implements fast bootstrapping for boolean circuit evaluation, enabling gate-by-gate encrypted computation.
- **OpenFHE:** A successor to PALISADE, providing a unified framework supporting BGV, BFV, CKKS, and TFHE schemes with a modular architecture.
- **Concrete:** Developed by Zama, provides a compiler that automatically converts standard programs into FHE-compatible computations.

## Security considerations

Homomorphic encryption schemes based on lattice problems are considered quantum-resistant, making them a strong candidate for post-quantum cryptography. However, several security considerations must be addressed:

- **Parameter selection:** Security levels depend on the choice of polynomial degree, modulus size, and noise parameters. Incorrect parameter choices can lead to insecure schemes. Standardization efforts by the HomomorphicEncryption.org consortium provide recommended parameter sets.
- **Side-channel attacks:** Implementations must guard against timing attacks, power analysis, and other side-channel vulnerabilities, just as with any cryptographic system.
- **Semantic security:** FHE schemes provide IND-CPA (indistinguishable under chosen plaintext attack) security, meaning that ciphertexts reveal nothing about plaintexts to an adversary who cannot decrypt.
- **Circuit privacy:** Some applications require that the computation itself remain hidden from the data owner. This requires additional cryptographic techniques beyond standard FHE.

## Related

Topics to explore next include lattice-based cryptography and the Learning With Errors problem for deeper understanding of FHE foundations; secure multi-party computation (MPC) and secret sharing as complementary privacy-preserving techniques; zero-knowledge proofs for verification without disclosure; differential privacy for statistical disclosure control; trusted execution environments (TEEs) such as Intel SGX as hardware-based alternatives; post-quantum cryptography for understanding FHE's role in quantum-resistant security; and federated learning as an adjacent approach to privacy-preserving machine learning.

## Summary

Homomorphic encryption is a transformative cryptographic technique that enables computation on encrypted data without decryption, fundamentally resolving the tension between data utility and data confidentiality. While partially homomorphic schemes have been practical for decades, the 2009 breakthrough in fully homomorphic encryption opened the door to arbitrary encrypted computation. Modern FHE schemes such as BGV, BFV, CKKS, and TFHE have reduced computational overhead by several orders of magnitude compared to Gentry's original construction, and ongoing advances in hardware acceleration, algorithmic optimization, and compiler tooling are steadily closing the gap with unencrypted computation. For technology professionals, homomorphic encryption represents a critical capability for building privacy-preserving systems in cloud computing, healthcare, finance, and machine learning, and its lattice-based foundations position it as a cornerstone of post-quantum security.

## References

- Gentry, C. (2009). "A Fully Homomorphic Encryption Scheme." Stanford University PhD Thesis. https://crypto.stanford.edu/craig/
- Brakerski, Z., Gentry, C., & Vaikuntanathan, V. (2012). "(Leveled) Fully Homomorphic Encryption without Bootstrapping." ACM Innovations in Theoretical Computer Science (ITCS).
- Cheon, J.H., Kim, A., Kim, M., & Song, Y. (2017). "Homomorphic Encryption for Arithmetic of Approximate Numbers (CKKS)." ASIACRYPT 2017.
- Chillotti, I., Gama, N., Georgieva, M., & Izabachène, M. (2020). "TFHE: Fast Fully Homomorphic Encryption over the Torus." Journal of Cryptology.
- HomomorphicEncryption.org. "Homomorphic Encryption Standardization." https://homomorphicencryption.org/
- Microsoft SEAL. https://github.com/microsoft/SEAL
- OpenFHE. https://www.openfhe.org/
