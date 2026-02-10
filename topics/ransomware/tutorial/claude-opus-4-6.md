# Ransomware

Ransomware is a category of malicious software engineered to deny access to a computer system, network, or data until the victim pays a demanded sum of money. Upon infection, ransomware typically encrypts files using strong cryptographic algorithms, rendering documents, databases, and other assets inaccessible. A ransom note then instructs the victim to pay, usually in cryptocurrency, in exchange for a decryption key. Ransomware has evolved from a nuisance targeting individual users into a sophisticated criminal enterprise that threatens hospitals, government agencies, critical infrastructure, and multinational corporations, with annual global damages estimated in the tens of billions of dollars.

## How Ransomware Works

A ransomware attack generally follows a structured kill chain. The attacker first gains initial access, often through phishing emails, compromised Remote Desktop Protocol (RDP) credentials, or exploitation of unpatched software vulnerabilities. Once inside the network, the attacker conducts reconnaissance, escalates privileges, and moves laterally to identify high-value targets such as file servers, backup systems, and domain controllers. The ransomware payload is then deployed across as many systems as possible. Modern ransomware uses strong encryption, typically AES-256 for file encryption combined with RSA or elliptic-curve cryptography to protect the encryption keys. After encryption completes, the malware drops ransom notes on affected systems with payment instructions and a deadline, after which the demanded amount may increase or the decryption key may be destroyed.

## Types of Ransomware

Ransomware falls into several categories based on how it operates and what it targets.

- **Crypto ransomware** encrypts individual files and demands payment for the decryption key. This is the most common variant and includes families such as Ryuk, Conti, and LockBit.
- **Locker ransomware** locks the victim out of the entire operating system or device without encrypting individual files, displaying a full-screen ransom demand on boot.
- **Double extortion ransomware** exfiltrates sensitive data before encrypting it, then threatens to publish the stolen data on leak sites if the ransom is not paid. Groups like Maze pioneered this tactic.
- **Triple extortion ransomware** adds a third pressure vector, such as launching DDoS attacks against the victim or contacting the victim's customers and partners directly to increase urgency.
- **Ransomware-as-a-Service (RaaS)** is a business model where ransomware developers lease their tools and infrastructure to affiliates in exchange for a percentage of ransom payments, lowering the barrier to entry for attackers.

## Notable Ransomware Campaigns

| Campaign | Year | Impact |
|---|---|---|
| WannaCry | 2017 | Exploited EternalBlue (SMB vulnerability) to infect over 200,000 systems in 150 countries, disrupting the UK National Health Service and global shipping |
| NotPetya | 2017 | Masqueraded as ransomware but was a destructive wiper; caused over $10 billion in damages worldwide, primarily targeting Ukraine |
| Ryuk | 2018-2021 | Targeted large enterprises and hospitals, demanding multi-million-dollar ransoms; linked to the Wizard Spider threat group |
| Colonial Pipeline | 2021 | DarkSide ransomware shut down a major U.S. fuel pipeline, causing fuel shortages across the eastern United States |
| Kaseya VSA | 2021 | REvil exploited a zero-day in IT management software to compromise managed service providers and their downstream customers simultaneously |
| MOVEit | 2023 | Cl0p group exploited a zero-day in the MOVEit file transfer application, impacting hundreds of organizations and millions of individuals |

## Common Attack Vectors

- **Phishing emails** remain the most prevalent initial access method, using malicious attachments or links to deliver ransomware loaders.
- **Exposed Remote Desktop Protocol (RDP)** with weak or compromised credentials allows attackers direct access to internal systems.
- **Exploitation of unpatched vulnerabilities** in internet-facing applications, VPNs, and operating systems provides reliable entry points.
- **Supply chain compromise** targets software vendors or managed service providers to gain access to many downstream victims at once.
- **Malvertising** uses compromised or malicious online advertisements to redirect users to exploit kits that deliver ransomware.
- **Drive-by downloads** infect systems when users visit compromised websites, even without clicking on anything.

## Prevention Strategies

Effective ransomware prevention requires a defense-in-depth approach that addresses people, processes, and technology.

- **Backups**: Maintain offline, immutable, and regularly tested backups following the 3-2-1 rule (three copies, two different media types, one offsite).
- **Patch management**: Apply security updates promptly to operating systems, applications, and firmware, prioritizing internet-facing assets.
- **Email security**: Deploy advanced email filtering with attachment sandboxing, link rewriting, and DMARC/DKIM/SPF authentication.
- **Endpoint detection and response (EDR)**: Use modern endpoint protection that can detect and block ransomware behavior patterns such as mass file encryption.
- **Network segmentation**: Isolate critical systems and limit lateral movement with microsegmentation and strict firewall rules.
- **Privilege management**: Enforce the principle of least privilege, disable unnecessary administrative accounts, and implement privileged access management (PAM).
- **Multi-factor authentication (MFA)**: Require MFA on all remote access, administrative interfaces, and email systems to prevent credential-based attacks.
- **Security awareness training**: Conduct regular phishing simulations and training to help employees recognize and report social engineering attempts.

## Incident Response

When ransomware strikes, a well-rehearsed incident response plan is critical.

- **Containment**: Immediately isolate affected systems by disconnecting them from the network to prevent further encryption and lateral spread.
- **Assessment**: Determine the scope of the infection, identify the ransomware variant, and evaluate which systems and data have been compromised.
- **Notification**: Inform executive leadership, legal counsel, and relevant regulatory authorities. Many jurisdictions require breach notification within specific timeframes.
- **Recovery**: Restore systems and data from verified clean backups. Rebuild compromised systems from known-good images rather than attempting to clean infected machines.
- **Investigation**: Conduct forensic analysis to identify the root cause, the attacker's entry point, and the full extent of compromise.
- **Post-incident review**: Document lessons learned, update security controls, and improve the incident response plan based on findings.

## The Ransom Payment Decision

Organizations face a difficult choice when hit by ransomware. Paying the ransom is generally discouraged by law enforcement agencies including the FBI, Europol, and CISA because payment funds criminal operations, provides no guarantee of data recovery, and may expose the victim to future attacks. However, some organizations pay when the cost of downtime exceeds the ransom, when backups are unavailable or also encrypted, or when sensitive data will be publicly leaked. The U.S. Treasury's Office of Foreign Assets Control (OFAC) has warned that paying ransoms to sanctioned entities may violate sanctions regulations and result in legal liability. Organizations should consult legal counsel and law enforcement before making any payment decision.

## Regulatory and Legal Landscape

Governments worldwide have intensified their response to ransomware through legislation, international cooperation, and offensive operations.

- The U.S. Cyber Incident Reporting for Critical Infrastructure Act (CIRCIA) requires critical infrastructure operators to report ransomware incidents and ransom payments to CISA.
- The EU's NIS2 Directive mandates cybersecurity risk management and incident reporting obligations across essential and important entities.
- The International Counter Ransomware Initiative, involving over 40 countries, coordinates joint law enforcement operations and intelligence sharing.
- Several countries have proposed or enacted legislation to ban or restrict ransom payments, particularly for critical infrastructure organizations.

## Related

Technology professionals studying ransomware should also explore broader topics including malware classification and analysis, phishing and social engineering defenses, defense in depth and zero trust architecture, encryption and cryptography fundamentals, disaster recovery planning, security information and event management (SIEM), coordinated disclosure practices, and compliance frameworks such as the General Data Protection Regulation (GDPR) and the Health Insurance Portability and Accountability Act (HIPAA).

## Summary

Ransomware represents one of the most consequential cybersecurity threats facing organizations today, combining strong encryption, criminal business models like Ransomware-as-a-Service, and multi-extortion tactics to maximize pressure on victims. Effective defense requires a layered approach encompassing robust offline backups, aggressive patch management, endpoint detection, network segmentation, privilege management, and continuous security awareness training. When an attack occurs, rapid containment, methodical incident response, and coordination with law enforcement are essential. Organizations should plan for ransomware incidents before they happen, rehearse their response, and understand the legal and regulatory implications of both the attack and any potential ransom payment.

## References

- CISA Stop Ransomware resources: https://www.cisa.gov/stopransomware
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework
- NIST SP 800-83 Rev 1, Guide to Malware Incident Prevention and Handling: https://csrc.nist.gov/publications/detail/sp/800-83/rev-1/final
- No More Ransom Project (Europol and industry partners): https://www.nomoreransom.org
- MITRE ATT&CK Framework, Enterprise Tactics: https://attack.mitre.org
- U.S. Treasury OFAC Advisory on Ransomware Payments: https://ofac.treasury.gov/recent-actions/20201001
- Verizon Data Breach Investigations Report: https://www.verizon.com/business/resources/reports/dbir/
