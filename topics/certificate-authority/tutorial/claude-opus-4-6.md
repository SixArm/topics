# Certificate Authority (CA)

A Certificate Authority (CA) is a trusted organization that issues digital certificates to verify the identity of individuals, devices, or services on a network. CAs form the backbone of Public Key Infrastructure (PKI), enabling authentication, encryption, and integrity of electronic communications across the internet and private networks. Every time a user connects to a website over HTTPS, checks a digitally signed document, or authenticates to a VPN, a Certificate Authority is involved in establishing the chain of trust that makes those interactions secure.

## How a Certificate Authority Works

When an entity—such as a web server operator or an organization—needs a digital certificate, it generates a key pair consisting of a public key and a private key. The entity then creates a Certificate Signing Request (CSR) containing the public key and identifying information, and submits it to a CA. The CA performs a validation process to confirm the applicant's identity and their right to use the specified domain name, IP address, or other identifying information. Once validated, the CA issues a signed digital certificate that binds the public key to the verified identity. The CA's digital signature on the certificate allows any relying party to verify that the certificate was issued by a trusted authority and has not been tampered with.

The issued certificate typically includes the subject's distinguished name, the certificate's serial number, validity period, the subject's public key, the issuing CA's identity, and the CA's digital signature. Applications such as web browsers and operating systems maintain a pre-installed list of trusted root CA certificates, which they use to verify the authenticity of certificates presented during secure connections.

## Types of Certificates

CAs issue several categories of certificates, each suited to different use cases and trust requirements.

| Certificate Type | Purpose | Typical Use Case |
|---|---|---|
| Domain Validated (DV) | Confirms control of a domain name | Personal websites, blogs, small projects |
| Organization Validated (OV) | Confirms domain ownership and organization identity | Business websites, internal applications |
| Extended Validation (EV) | Rigorous identity verification of the legal entity | E-commerce, financial services, government portals |
| Wildcard | Secures a domain and all its subdomains | Organizations with many subdomains |
| Multi-Domain (SAN) | Secures multiple distinct domain names in one certificate | Enterprises managing several domains |
| Code Signing | Verifies the identity of software publishers | Software distribution, application signing |
| Email (S/MIME) | Enables encrypted and signed email communication | Secure enterprise or personal email |
| Client | Authenticates individual users or devices | VPN access, mutual TLS, device authentication |

## Trust Hierarchy and Chain of Trust

CAs operate within a hierarchical trust model. At the top of the hierarchy are Root CAs, whose self-signed root certificates are embedded in operating systems, browsers, and other trust stores. Because compromising a root CA would undermine the entire trust chain, root CAs typically remain offline and delegate day-to-day certificate issuance to Intermediate CAs (also called Subordinate CAs). Intermediate CAs hold certificates signed by the root CA and use those to sign end-entity certificates.

When a client application encounters a certificate, it traces the chain of trust from the end-entity certificate, through one or more intermediate certificates, up to a trusted root certificate. If every signature in the chain is valid and every certificate is within its validity period and has not been revoked, the chain is considered trusted. This layered approach provides both security and operational flexibility:

- **Root CAs** are kept offline in hardware security modules (HSMs) to minimize exposure.
- **Intermediate CAs** handle the volume of certificate issuance and can be revoked independently without replacing the root.
- **Cross-certification** allows CAs from different hierarchies to establish mutual trust, enabling interoperability across organizations.

## Certificate Lifecycle Management

Managing certificates across their full lifecycle is essential to maintaining security and avoiding outages caused by expired or misconfigured certificates.

- **Enrollment and Issuance**: The applicant submits a CSR, the CA validates the request, and the certificate is issued.
- **Installation and Deployment**: The certificate and its associated private key are installed on the target server, device, or application.
- **Monitoring and Renewal**: Certificates have finite validity periods, typically ranging from 90 days to one year. Organizations must track expiration dates and renew certificates before they lapse.
- **Revocation**: If a private key is compromised, an employee leaves, or a domain changes ownership, the certificate must be revoked before its natural expiration.
- **Archival and Disposal**: Expired or revoked certificates and their keys should be securely archived or destroyed according to organizational policy.

## Certificate Revocation

CAs are responsible for maintaining mechanisms that allow relying parties to check whether a certificate has been revoked. The two primary revocation mechanisms are:

| Mechanism | Description | Trade-offs |
|---|---|---|
| Certificate Revocation List (CRL) | A periodically published list of revoked certificate serial numbers, signed by the CA | Simple to implement; can become large and slow to download; updates are not real-time |
| Online Certificate Status Protocol (OCSP) | A real-time protocol that allows clients to query the CA about the status of a specific certificate | Provides up-to-date status; introduces latency and a privacy concern since the CA sees which sites a user visits |
| OCSP Stapling | The server periodically fetches its own OCSP response and presents it to clients during the TLS handshake | Eliminates client-side OCSP lookup latency and privacy issues; requires server-side configuration |

Revocation checking remains one of the more challenging aspects of PKI. Some browsers perform soft-fail revocation checks, meaning they proceed with the connection if the revocation check fails, which can leave users vulnerable if revocation infrastructure is unavailable.

## Public CAs vs. Private CAs

Organizations may rely on public CAs, operate their own private CAs, or use both, depending on their requirements.

| Aspect | Public CA | Private CA |
|---|---|---|
| Trust scope | Globally trusted via pre-installed root stores | Trusted only within the organization or explicitly configured environments |
| Use case | Public-facing websites, email, code signing | Internal services, mutual TLS, IoT devices, testing environments |
| Cost | Per-certificate fees or free (e.g., Let's Encrypt) | Infrastructure and operational costs for running the CA |
| Compliance | Subject to industry standards (CA/Browser Forum Baseline Requirements) | Subject to internal policies; more flexibility in certificate profiles |
| Certificate lifetime | Governed by industry rules (currently moving toward 90-day maximums) | Can be set according to organizational needs |
| Audit requirements | Must pass annual WebTrust or ETSI audits | Audit requirements determined by internal governance |

## Notable Certificate Authorities

Several CAs play prominent roles in the internet's trust ecosystem:

- **Let's Encrypt**: A free, automated, and open CA operated by the Internet Security Research Group (ISRG). It has dramatically expanded HTTPS adoption by eliminating cost and complexity barriers.
- **DigiCert**: One of the largest commercial CAs, providing high-assurance certificates for enterprises, including EV and OV certificates.
- **Sectigo (formerly Comodo CA)**: A widely used commercial CA offering a broad range of certificate products.
- **GlobalSign**: A European-headquartered CA serving enterprise and IoT markets.
- **Google Trust Services**: Google's own CA, issuing certificates for Google properties and the broader web.

## Security Considerations

The CA system is a high-value target for attackers because compromising a CA can allow the issuance of fraudulent certificates for any domain. Several historical incidents have highlighted these risks:

- **DigiNotar (2011)**: A Dutch CA was compromised, and fraudulent certificates were issued for Google and other domains, leading to the CA's complete distrust and bankruptcy.
- **Symantec (2017)**: Google and other browser vendors distrusted Symantec-issued certificates after repeated compliance failures, forcing a transfer of operations to DigiCert.

To mitigate these risks, the ecosystem has adopted several safeguards:

- **Certificate Transparency (CT)**: An open framework requiring CAs to log all issued certificates in publicly auditable append-only logs, enabling domain owners and researchers to detect misissued certificates.
- **CAA DNS Records**: DNS Certification Authority Authorization records allow domain owners to specify which CAs are permitted to issue certificates for their domains.
- **Hardware Security Modules (HSMs)**: Dedicated cryptographic hardware that protects CA private keys from extraction, even if the host system is compromised.
- **Key Ceremony Procedures**: Formal, audited processes for generating and managing root CA key pairs, typically involving multiple trusted individuals and physical security controls.

## Related

Related topics to explore next include Public Key Infrastructure for the broader framework in which CAs operate, Secure Sockets Layer and Transport Layer Security for the protocols that rely on CA-issued certificates, encryption and cryptography algorithms for the mathematical foundations of digital certificates, defense in depth for layered security strategies, digital signatures and authentication for how certificates enable identity verification, and coordinated disclosure for responsible handling of CA security incidents.

## Summary

A Certificate Authority is a cornerstone of internet security, providing the trust framework that enables encrypted and authenticated communications across networks. By validating identities, issuing digitally signed certificates, maintaining revocation infrastructure, and participating in transparency and audit programs, CAs allow billions of users and devices to establish secure connections every day. Whether using a globally trusted public CA for external services or operating a private CA for internal infrastructure, organizations must understand certificate lifecycle management, revocation mechanisms, and the evolving security landscape to maintain the integrity of their communications and protect against certificate-based attacks.

## References

- CA/Browser Forum Baseline Requirements: https://cabforum.org/baseline-requirements/
- Let's Encrypt Documentation: https://letsencrypt.org/docs/
- RFC 5280 - Internet X.509 PKI Certificate and CRL Profile: https://datatracker.ietf.org/doc/html/rfc5280
- RFC 6960 - Online Certificate Status Protocol (OCSP): https://datatracker.ietf.org/doc/html/rfc6960
- RFC 6962 - Certificate Transparency: https://datatracker.ietf.org/doc/html/rfc6962
- RFC 8659 - DNS Certification Authority Authorization (CAA): https://datatracker.ietf.org/doc/html/rfc8659
- Mozilla Root Store Policy: https://wiki.mozilla.org/CA
- Google Certificate Transparency Project: https://certificate.transparency.dev/
