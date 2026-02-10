# Data-at-rest

Data-at-rest refers to any digital information stored persistently on a storage medium that is not actively being transmitted across a network or processed in memory. This includes data residing on hard drives, solid-state drives, magnetic tapes, USB devices, cloud storage volumes, and any other long-term storage infrastructure. Unlike data-in-transit or data-in-use, data-at-rest is static at any given moment, which presents both advantages for protection and distinct security challenges. Understanding how to classify, protect, and govern data-at-rest is a foundational competency for security engineers, database administrators, compliance officers, and infrastructure architects.

## Types of Data-at-Rest

Data-at-rest spans a wide range of formats and storage systems. It can be structured data organized in relational databases and data warehouses, semi-structured data such as JSON or XML files, or fully unstructured data including documents, images, video, and audio files. Backups, archives, snapshots, log files, and exported datasets all qualify as data-at-rest once written to persistent storage.

The storage medium itself varies significantly in performance, durability, and cost profile:

| Storage Medium | Typical Use Case | Durability | Access Speed |
|---|---|---|---|
| Hard disk drive (HDD) | Bulk storage, backups | Moderate | Moderate |
| Solid-state drive (SSD) | Databases, application data | High | Fast |
| Magnetic tape | Long-term archival | Very high | Slow (sequential) |
| Optical media | Regulatory archives | Very high | Slow |
| Cloud object storage | Scalable general-purpose | Very high (replicated) | Variable |
| Network-attached storage | File sharing, collaboration | High | Moderate to fast |

Each medium carries its own risk profile regarding physical theft, degradation over time, and susceptibility to environmental damage.

## Threat Landscape

Data-at-rest faces threats that differ from those targeting data in motion. Because the data is stationary and often stored for long periods, attackers have extended windows of opportunity to locate and exfiltrate it. The primary threat categories include:

- **Physical theft or loss.** Stolen laptops, decommissioned drives not properly wiped, lost USB devices, and improperly discarded backup tapes all expose stored data to unauthorized parties.
- **Unauthorized access.** Insider threats, misconfigured permissions, and credential compromise can allow individuals to read or copy data they should not have access to.
- **Ransomware and malware.** Malicious software can encrypt or corrupt stored data, rendering it inaccessible until a ransom is paid or the data is restored from a clean backup.
- **Regulatory non-compliance.** Failing to protect stored data according to applicable regulations can result in fines, legal action, and reputational damage, even if no breach occurs.
- **Silent data corruption.** Bit rot, firmware bugs, and storage hardware degradation can silently alter data over time without any malicious actor involved.

## Encryption for Data-at-Rest

Encryption is the most critical technical control for protecting stored data. It converts plaintext into ciphertext using a cryptographic algorithm and a key, ensuring that even if the physical storage medium is compromised, the data remains unintelligible without the corresponding decryption key.

There are two primary approaches to encrypting data-at-rest:

| Approach | Description | Strengths | Limitations |
|---|---|---|---|
| Full-disk encryption (FDE) | Encrypts the entire storage volume at the block level | Transparent to applications; protects against physical theft | Does not protect against authorized-user misuse; data is decrypted when the system is running |
| File-level or database-level encryption | Encrypts individual files, columns, or records | Granular control; data remains encrypted even when the system is running | More complex to implement; can impact query performance |

Common standards and algorithms used include AES-256 for symmetric encryption, RSA and elliptic-curve cryptography for key exchange, and protocols such as LUKS for Linux disk encryption and BitLocker for Windows environments. Cloud providers offer server-side encryption (SSE) with provider-managed keys, customer-managed keys (CMK), or client-side encryption where data is encrypted before it reaches the provider.

Key management is as important as the encryption itself. Keys must be generated securely, rotated on a defined schedule, stored separately from the data they protect, and revoked promptly when compromised. Hardware security modules (HSMs) and dedicated key management services (KMS) are standard tools for this purpose.

## Access Control

Access control determines who can read, write, modify, or delete data-at-rest. Effective access control follows the principle of least privilege, granting users and systems only the minimum permissions necessary to perform their functions.

- **Authentication** verifies the identity of a user or system before granting any access. Multi-factor authentication (MFA) strengthens this step by requiring more than one form of verification.
- **Authorization** defines what an authenticated entity is permitted to do. Role-based access control (RBAC) assigns permissions based on organizational roles, while attribute-based access control (ABAC) evaluates policies against user attributes, resource attributes, and environmental conditions.
- **Auditing** records all access events to create an accountability trail. Audit logs should capture who accessed what data, when, from where, and what action was performed.
- **Data classification** labels data according to sensitivity levels (public, internal, confidential, restricted), enabling policies to enforce appropriate controls automatically based on the classification tier.

## Backup and Disaster Recovery

Backups are copies of data-at-rest stored separately from the primary data source. They serve as the last line of defense against data loss from hardware failure, accidental deletion, ransomware, and natural disasters. A robust backup strategy considers:

- **Backup frequency.** How often backups are taken, which determines the maximum amount of data that could be lost (the recovery point objective, or RPO).
- **Retention policy.** How long backups are kept, balancing storage costs against regulatory requirements and operational needs.
- **Storage location.** Backups should be stored in a geographically separate location from the primary data. The 3-2-1 rule recommends three copies of data, on two different media types, with one copy offsite.
- **Backup encryption.** Backups must be encrypted with the same rigor as the primary data. An unencrypted backup is a high-value target for attackers.
- **Restoration testing.** Backups that have never been tested for restoration are unreliable. Regular restore drills validate that data can be recovered within the required timeframe (the recovery time objective, or RTO).

Disaster recovery extends beyond backups to encompass the entire plan for restoring systems and data after a catastrophic event, including infrastructure provisioning, failover procedures, communication plans, and post-incident review.

## Regulatory and Compliance Considerations

Numerous regulations and standards mandate specific protections for data-at-rest, particularly for personally identifiable information (PII), protected health information (PHI), and financial data.

| Regulation / Standard | Scope | Key Data-at-Rest Requirements |
|---|---|---|
| GDPR (EU) | Personal data of EU residents | Encryption, access controls, data minimization, right to erasure |
| HIPAA (US) | Protected health information | Encryption addressable safeguard, access controls, audit controls |
| PCI DSS | Payment card data | Strong encryption of stored cardholder data, key management procedures |
| SOC 2 | Service organization controls | Logical access controls, encryption, monitoring |
| NIST SP 800-171 | Controlled unclassified information (US federal) | FIPS-validated encryption, access enforcement, audit logging |

Organizations must map their data inventory to applicable regulations, implement the required controls, and maintain evidence of compliance through documentation and regular audits.

## Data Lifecycle Management

Data-at-rest does not exist in isolation. It is part of a broader data lifecycle that spans creation, storage, use, sharing, archival, and destruction. Effective lifecycle management ensures that data-at-rest protections are applied proportionally to the data's value and sensitivity at each stage.

- **Classification at creation.** Data should be classified as soon as it is created or ingested, so that appropriate storage and encryption policies are applied from the start.
- **Tiered storage.** As data ages and is accessed less frequently, it can be moved to lower-cost storage tiers (hot, warm, cold, archive) while maintaining encryption and access controls.
- **Data minimization.** Retaining only the data that is necessary for business or regulatory purposes reduces the attack surface and storage costs.
- **Secure deletion.** When data reaches the end of its retention period, it must be destroyed in a manner that prevents recovery. This includes cryptographic erasure (destroying the encryption keys), secure overwriting, and physical destruction of storage media.

## Related

Topics to explore next include data-in-transit and the encryption protocols that protect information during network transmission, data-in-use protections such as confidential computing and secure enclaves, encryption algorithms and cryptographic key management in depth, access control models including RBAC and ABAC, backup and disaster recovery planning, regulatory compliance frameworks such as GDPR, HIPAA, and PCI DSS, and data lifecycle governance strategies for enterprise environments.

## Summary

Data-at-rest encompasses all persistently stored digital information, from database records to archived backups and unstructured files on disk. Protecting it requires a layered approach combining encryption (at the disk, file, or database level), strict access control following least-privilege principles, comprehensive backup strategies with tested restoration procedures, and alignment with regulatory requirements. Effective data-at-rest security is not a single technology but an integrated discipline spanning key management, lifecycle governance, classification, auditing, and secure disposal, all working together to preserve the confidentiality, integrity, and availability of stored information.

## References

- National Institute of Standards and Technology. "NIST SP 800-111: Guide to Storage Encryption Technologies for End User Devices." https://csrc.nist.gov/publications/detail/sp/800-111/final
- National Institute of Standards and Technology. "NIST SP 800-171: Protecting Controlled Unclassified Information in Nonfederal Systems and Organizations." https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final
- PCI Security Standards Council. "PCI DSS v4.0." https://www.pcisecuritystandards.org/document_library/
- European Union. "General Data Protection Regulation (GDPR)." https://gdpr.eu/
- U.S. Department of Health and Human Services. "HIPAA Security Rule." https://www.hhs.gov/hipaa/for-professionals/security/index.html
- OWASP Foundation. "OWASP Cryptographic Storage Cheat Sheet." https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html
- Cloud Security Alliance. "Security Guidance for Critical Areas of Focus in Cloud Computing v4.0." https://cloudsecurityalliance.org/research/guidance/
