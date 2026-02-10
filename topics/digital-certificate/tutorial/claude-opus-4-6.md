# Digital certificate

A digital certificate, also known as a public key certificate or identity certificate, is an electronic document used to verify the identity of a person, organization, or device within a secure communication network. It binds a public key to an entity's identity and carries a digital signature from a trusted third party called a certificate authority (CA). Digital certificates are foundational to the trust infrastructure of the internet, enabling encrypted connections, authenticated communications, and secure transactions across virtually every online interaction.

## How digital certificates work

Digital certificates operate on the principles of public key cryptography, a system that uses an asymmetric key pair consisting of a private key and a public key. The certificate holder keeps the private key secret while the public key is embedded in the certificate and shared openly. When a CA issues a digital certificate, it cryptographically signs the certificate contents using its own private key. Any party that trusts the CA can then verify the signature using the CA's public key, confirming that the certificate is authentic and has not been altered.

During a typical TLS/SSL handshake, a web browser requests the server's digital certificate. The browser checks that the certificate was signed by a CA it trusts, that the certificate has not expired, that the domain name matches, and that the certificate has not been revoked. If all checks pass, the browser and server negotiate an encrypted session. This chain of trust extends from end-entity certificates up through intermediate CAs to a root CA whose certificate is pre-installed in operating systems and browsers.

## Contents of a digital certificate

A standard X.509 digital certificate contains several fields that together establish identity and enable verification.

- **Subject**: The distinguished name of the entity the certificate represents, typically including common name, organization, and country.
- **Issuer**: The distinguished name of the CA that signed the certificate.
- **Serial number**: A unique identifier assigned by the CA to distinguish this certificate from all others it has issued.
- **Validity period**: The "not before" and "not after" dates defining the certificate's active lifespan.
- **Public key**: The subject's public key along with the algorithm identifier (such as RSA or ECDSA).
- **Signature algorithm**: The cryptographic algorithm the CA used to sign the certificate.
- **Digital signature**: The CA's signature over the certificate contents, providing tamper detection.
- **Extensions**: Optional fields such as Subject Alternative Names (SANs), key usage constraints, certificate policies, and CRL distribution points.

## Types of digital certificates

Digital certificates vary in their validation rigor, scope, and intended use. The following table compares the three primary types of TLS/SSL certificates.

| Type | Validation level | What the CA verifies | Visual indicator | Typical use case |
|---|---|---|---|---|
| Domain Validation (DV) | Low | Applicant controls the domain | Padlock icon | Personal sites, blogs, internal tools |
| Organization Validation (OV) | Medium | Domain control plus legal existence of the organization | Padlock icon with organization details in certificate | Business websites, SaaS platforms |
| Extended Validation (EV) | High | Domain control, legal identity, physical address, operational existence | Padlock with organization name (browser-dependent) | Financial institutions, e-commerce, government portals |

Beyond TLS/SSL certificates, other common certificate types include:

- **Code signing certificates**: Verify the identity of a software publisher and confirm that code has not been modified since signing.
- **S/MIME certificates**: Enable email encryption and digital signatures, ensuring message authenticity and confidentiality.
- **Client certificates**: Authenticate users or devices to servers, used in mutual TLS (mTLS) scenarios.
- **Wildcard certificates**: Secure a domain and all its first-level subdomains under a single certificate.
- **Multi-domain (SAN) certificates**: Cover multiple distinct domain names in a single certificate.

## Certificate authorities and the chain of trust

A certificate authority is an organization trusted to issue, manage, and revoke digital certificates. The trust model is hierarchical. A root CA sits at the top and its self-signed root certificate is embedded in browsers and operating systems. Root CAs typically delegate issuance to intermediate CAs, creating a chain of trust from the end-entity certificate through one or more intermediates back to the root.

Major public CAs include DigiCert, Let's Encrypt, Sectigo, and GlobalSign. Organizations can also operate private CAs for internal use, issuing certificates to employees, devices, and services within their own infrastructure. Private CAs are common in enterprises that need to authenticate endpoints on internal networks without relying on public trust hierarchies.

## Certificate lifecycle management

Managing certificates throughout their lifecycle is critical to maintaining security and avoiding outages caused by expired or misconfigured certificates.

- **Request and enrollment**: The entity generates a key pair and submits a Certificate Signing Request (CSR) to the CA containing its public key and identity information.
- **Issuance**: The CA validates the request according to the certificate type's requirements and issues the signed certificate.
- **Installation and deployment**: The certificate is installed on the target server, device, or application along with any intermediate certificates needed to complete the chain.
- **Monitoring**: Administrators track certificate expiration dates and health to prevent lapses in coverage.
- **Renewal**: Before expiration, the certificate is renewed by submitting a new CSR or through automated renewal protocols such as ACME.
- **Revocation**: If a private key is compromised or circumstances change, the certificate is revoked. Revocation status is published through Certificate Revocation Lists (CRLs) or the Online Certificate Status Protocol (OCSP).

## Certificate revocation

When a certificate can no longer be trusted, it must be revoked before its natural expiration. Two primary mechanisms handle revocation checking.

| Mechanism | How it works | Advantages | Disadvantages |
|---|---|---|---|
| CRL (Certificate Revocation List) | CA publishes a signed list of revoked certificate serial numbers at regular intervals | Simple to implement; widely supported | Lists can grow large; updates are periodic, creating a window of vulnerability |
| OCSP (Online Certificate Status Protocol) | Client queries the CA's OCSP responder in real time for a specific certificate's status | Real-time status; smaller response size | Introduces latency; OCSP responder availability becomes a dependency |
| OCSP Stapling | Server fetches its own OCSP response and "staples" it to the TLS handshake | Eliminates client-side OCSP lookup; improves performance and privacy | Requires server-side configuration; not universally deployed |

## Common use cases

Digital certificates secure a broad range of technology operations.

- **Web traffic encryption**: TLS/SSL certificates protect data in transit between browsers and servers, forming the basis of HTTPS.
- **Email security**: S/MIME certificates encrypt email content and provide sender authentication through digital signatures.
- **Software distribution**: Code signing certificates assure users that software has not been tampered with and originates from a verified publisher.
- **VPN and network access**: Client and device certificates authenticate endpoints connecting to corporate networks.
- **IoT device identity**: Certificates embedded in IoT devices establish device identity and secure communication channels.
- **API authentication**: Mutual TLS uses client certificates to authenticate API consumers, providing stronger assurance than API keys alone.
- **Document signing**: Digital signatures on PDFs and other documents provide non-repudiation and integrity verification.

## Best practices

Effective certificate management reduces security risk and operational disruption.

- Use automated certificate management tools and protocols like ACME to handle issuance, renewal, and deployment at scale.
- Maintain a comprehensive certificate inventory that tracks every certificate across the organization, including expiration dates, responsible owners, and deployment locations.
- Enforce minimum key lengths of 2048 bits for RSA and 256 bits for ECDSA, and prefer ECDSA for its smaller key size and equivalent security.
- Configure OCSP stapling on all web servers to improve TLS handshake performance and reduce reliance on external OCSP responders.
- Implement Certificate Transparency (CT) log monitoring to detect misissued or unauthorized certificates for your domains.
- Store private keys in hardware security modules (HSMs) or trusted platform modules (TPMs) wherever possible to prevent key extraction.
- Establish clear incident response procedures for compromised certificates, including rapid revocation and reissuance workflows.
- Use short-lived certificates (90 days or less) to limit the exposure window if a key is compromised.

## Related

Related topics to explore next include certificate authority operations and trust hierarchies, public key infrastructure (PKI) architecture, TLS/SSL handshake protocols, cryptography fundamentals including symmetric and asymmetric encryption, mutual TLS for API and microservice authentication, ACME protocol and automated certificate management with tools like Let's Encrypt and Certbot, hardware security modules for key protection, and Certificate Transparency logs for monitoring and accountability.

## Summary

A digital certificate is an electronic credential that binds a public key to a verified identity, enabling encrypted communication, authentication, and trust across networks. Issued and signed by certificate authorities within a hierarchical chain of trust, certificates come in multiple types ranging from lightweight domain validation to rigorous extended validation. Effective certificate management across the full lifecycle, from issuance through monitoring, renewal, and revocation, is essential to preventing security breaches and service outages. For technology professionals, understanding digital certificates is fundamental to securing web applications, APIs, email, software distribution, and network access.

## References

- Cooper, D., et al. "Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile." RFC 5280, IETF, May 2008. https://datatracker.ietf.org/doc/html/rfc5280
- Santesson, S., et al. "X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP." RFC 6960, IETF, June 2013. https://datatracker.ietf.org/doc/html/rfc6960
- Barnes, R., et al. "Automatic Certificate Management Environment (ACME)." RFC 8555, IETF, March 2019. https://datatracker.ietf.org/doc/html/rfc8555
- Laurie, B., Langley, A., and E. Kasper. "Certificate Transparency." RFC 6962, IETF, June 2013. https://datatracker.ietf.org/doc/html/rfc6962
- CA/Browser Forum. "Baseline Requirements for the Issuance and Management of Publicly-Trusted Certificates." https://cabforum.org/baseline-requirements/
- Let's Encrypt Documentation. https://letsencrypt.org/docs/
