## Ransomware

Ransomware is a category of malware engineered to deny access to a computer system or its data until a ransom is paid. Attackers encrypt the victim's files—documents, databases, images, and other critical assets—rendering them unusable, then demand payment for the decryption key.

## How Ransomware Works

Ransomware follows a predictable attack lifecycle:

1. **Initial Access**: The attacker gains entry through phishing emails, malicious advertisements, compromised websites, remote desktop protocol (RDP) exploits, or software vulnerabilities.
2. **Execution**: The malware payload executes, often evading detection by disabling security tools or using legitimate system utilities.
3. **Privilege Escalation**: The ransomware seeks elevated permissions to access more files and systems.
4. **Lateral Movement**: In enterprise environments, ransomware spreads across the network to maximize impact.
5. **Encryption**: Files are encrypted using strong cryptographic algorithms (typically AES-256 combined with RSA).
6. **Ransom Demand**: A ransom note appears, demanding payment—usually in cryptocurrency—for the decryption key.

## Types of Ransomware

| Type | Description | Impact |
|------|-------------|--------|
| **Crypto Ransomware** | Encrypts files and demands payment for decryption key | Data inaccessible until decrypted |
| **Locker Ransomware** | Locks users out of the operating system entirely | System unusable but files may remain intact |
| **Double Extortion** | Encrypts data and exfiltrates it, threatening public release | Data loss plus reputational and regulatory risk |
| **Triple Extortion** | Adds DDoS attacks or contacts victims' customers directly | Extended pressure beyond the primary victim |
| **Ransomware-as-a-Service (RaaS)** | Criminal operators license ransomware to affiliates | Lowers barrier to entry for attackers |

## Common Attack Vectors

- **Phishing emails**: Malicious attachments or links in deceptive messages
- **Remote Desktop Protocol (RDP)**: Brute-force attacks on exposed RDP services
- **Software vulnerabilities**: Unpatched systems exploited via known CVEs
- **Drive-by downloads**: Malware delivered through compromised websites
- **Supply chain attacks**: Compromised software updates or third-party vendors
- **Malvertising**: Malicious code injected into legitimate advertising networks

## Notable Ransomware Strains

| Name | Year | Notable Characteristics |
|------|------|------------------------|
| CryptoLocker | 2013 | Pioneered modern crypto-ransomware model |
| WannaCry | 2017 | Exploited EternalBlue; infected 200,000+ systems globally |
| NotPetya | 2017 | Destructive wiper disguised as ransomware; $10B+ in damages |
| Ryuk | 2018 | Targeted enterprises; demanded multi-million dollar ransoms |
| REvil/Sodinokibi | 2019 | RaaS model; high-profile supply chain attacks |
| Conti | 2020 | Sophisticated RaaS operation; leaked internal communications |
| LockBit | 2019+ | Fast encryption; dominant RaaS operator |
| BlackCat/ALPHV | 2021 | Written in Rust; cross-platform capabilities |

## Business Impact

Ransomware inflicts damage across multiple dimensions:

- **Operational disruption**: Systems offline, halting business processes
- **Financial losses**: Ransom payments, incident response costs, lost revenue, increased insurance premiums
- **Data loss**: Permanent loss if backups fail or are also encrypted
- **Reputational damage**: Customer trust eroded, negative media coverage
- **Regulatory consequences**: Fines for data breaches under GDPR, HIPAA, and other regulations
- **Legal liability**: Lawsuits from affected customers or partners

## Prevention Strategies

**Technical Controls**
- Maintain offline, immutable, and tested backups following the 3-2-1 rule
- Implement endpoint detection and response (EDR) solutions
- Deploy email filtering with attachment sandboxing
- Segment networks to limit lateral movement
- Disable unnecessary services (especially RDP exposed to the internet)
- Apply patches promptly and maintain vulnerability management programs
- Use multi-factor authentication (MFA) across all systems

**Organizational Measures**
- Conduct regular security awareness training focused on phishing recognition
- Develop and test incident response plans specific to ransomware
- Establish relationships with law enforcement and incident response firms before an attack
- Perform tabletop exercises simulating ransomware scenarios
- Inventory critical assets and prioritize their protection

## Response Framework

When ransomware strikes, follow these steps:

1. **Isolate**: Disconnect affected systems from the network immediately
2. **Preserve**: Capture forensic images before remediation
3. **Assess**: Determine the scope, variant, and encryption status
4. **Notify**: Alert leadership, legal counsel, insurers, and potentially law enforcement
5. **Investigate**: Identify the attack vector and check for data exfiltration
6. **Recover**: Restore from clean backups after verifying system integrity
7. **Report**: Fulfill regulatory notification requirements
8. **Improve**: Conduct a post-incident review and strengthen defenses

## To Pay or Not to Pay

| Consideration | Arguments Against Payment | Arguments For Payment |
|---------------|--------------------------|----------------------|
| **Reliability** | No guarantee of decryption key | Some operators maintain reputation for delivery |
| **Ethics** | Funds criminal enterprises | May be only option to save the organization |
| **Legal** | May violate OFAC sanctions | Payment itself is generally legal |
| **Precedent** | Encourages future attacks | Business survival may take priority |
| **Recovery** | Backups may be faster/cheaper | Backups may be compromised or unavailable |

Law enforcement agencies, including the FBI and CISA, generally advise against paying ransoms. Payment does not guarantee data recovery and funds criminal operations. However, each organization must weigh its specific circumstances, including the criticality of encrypted data, backup availability, and business continuity requirements.

## Regulatory and Legal Landscape

- **OFAC Compliance**: Payments to sanctioned entities can result in civil penalties
- **Breach Notification Laws**: Many jurisdictions require disclosure of ransomware incidents involving personal data
- **SEC Reporting**: Public companies must disclose material cybersecurity incidents
- **CIRCIA (2022)**: Critical infrastructure operators will face mandatory incident reporting requirements

## Key Takeaways

- Ransomware has evolved from opportunistic attacks to sophisticated, targeted operations
- Prevention requires layered defenses combining technical controls and human factors
- Reliable, tested backups remain the most effective recovery mechanism
- Incident response planning before an attack dramatically improves outcomes
- The decision to pay involves legal, ethical, and practical considerations with no universally correct answer
- Organizations should engage with law enforcement and share threat intelligence to combat ransomware collectively
