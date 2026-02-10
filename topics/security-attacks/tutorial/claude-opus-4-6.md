# Security attacks

Security attacks are deliberate actions intended to compromise the confidentiality, integrity, or availability of information systems. As organizations increasingly depend on digital infrastructure, the threat landscape has expanded in both scale and sophistication. Attacks can target hardware, software, networks, or data, and they originate from a wide range of adversaries including individual hackers, organized criminal syndicates, disgruntled insiders, and nation-state actors. Understanding the taxonomy of security attacks is essential for technology professionals who are responsible for designing, deploying, and defending systems in any environment.

## Attack classification

Security attacks are broadly classified along two axes: passive versus active, and internal versus external. Passive attacks observe or collect information without altering system resources, while active attacks modify data, disrupt services, or otherwise interfere with normal operations. Internal attacks originate from individuals who already have some level of authorized access, such as employees or contractors. External attacks come from outsiders who must first penetrate a security boundary.

| Classification | Description | Examples |
|---|---|---|
| Passive | Intercepts or monitors data without modification | Eavesdropping, traffic analysis, network sniffing |
| Active | Alters, destroys, or disrupts system resources | Malware, denial of service, data tampering |
| Internal | Originates from within the organization | Privilege abuse, data exfiltration by employees |
| External | Originates from outside the organization | Remote exploitation, phishing campaigns |

## Malware

Malware is malicious software designed to infiltrate, damage, or take control of a computer system. It is one of the most pervasive categories of security attack and encompasses several distinct forms. Viruses attach themselves to legitimate programs and replicate when those programs execute. Worms propagate independently across networks without requiring user interaction. Trojans disguise themselves as legitimate software to trick users into installation. Ransomware encrypts victim data and demands payment for the decryption key, often causing catastrophic operational disruption.

Modern malware frequently combines multiple techniques. A dropper trojan may deliver a ransomware payload, which in turn communicates with a command-and-control server using encrypted channels. Defense against malware requires layered controls including endpoint detection and response, application whitelisting, regular patching, and user awareness training.

## Phishing attacks

Phishing is a social engineering attack in which adversaries send communications that appear to originate from a trusted source, such as a bank, employer, or well-known service provider. The objective is to manipulate recipients into revealing sensitive information like credentials, financial data, or personal identifiers, or into executing a malicious action such as clicking a link or opening an attachment.

Key variants of phishing include:

- **Spear phishing** targets specific individuals or organizations using personalized information gathered through reconnaissance.
- **Whaling** targets senior executives or high-value individuals within an organization.
- **Smishing** delivers phishing messages via SMS text rather than email.
- **Vishing** uses voice calls, often spoofing caller ID, to extract information verbally.
- **Business email compromise (BEC)** impersonates a trusted colleague or vendor to authorize fraudulent transactions.

Phishing remains one of the most effective initial access vectors because it exploits human judgment rather than technical vulnerabilities.

## Denial of service and distributed denial of service

A denial of service (DoS) attack overwhelms a targeted system, network, or service with excessive traffic or requests, rendering it unavailable to legitimate users. When the attack is coordinated across many compromised machines, known as a botnet, it becomes a distributed denial of service (DDoS) attack. DDoS attacks are particularly difficult to mitigate because the traffic originates from thousands or millions of distinct sources.

| Attack type | Mechanism | Target layer |
|---|---|---|
| Volumetric | Floods bandwidth with massive traffic volume | Network (Layer 3/4) |
| Protocol | Exploits weaknesses in network protocols (e.g., SYN flood) | Transport (Layer 4) |
| Application | Sends crafted requests that exhaust server resources | Application (Layer 7) |

Mitigation strategies include rate limiting, traffic scrubbing services, content delivery networks, and anycast routing to distribute traffic across geographically dispersed infrastructure.

## Man-in-the-middle attacks

A man-in-the-middle (MITM) attack occurs when an adversary secretly intercepts and potentially alters communication between two parties who believe they are communicating directly with each other. The attacker positions themselves between the sender and receiver, enabling them to eavesdrop on sensitive data, inject malicious content, or modify messages in transit.

Common MITM techniques include:

- **ARP spoofing** manipulates the Address Resolution Protocol to redirect local network traffic through the attacker's machine.
- **DNS spoofing** corrupts DNS responses to redirect users to fraudulent servers.
- **SSL stripping** downgrades a secure HTTPS connection to unencrypted HTTP without the user's knowledge.
- **Wi-Fi eavesdropping** sets up rogue access points that mimic legitimate networks to intercept wireless traffic.

Proper use of TLS/SSL, certificate pinning, mutual authentication, and encrypted VPN tunnels are primary defenses against MITM attacks.

## Password attacks

Password attacks attempt to discover or bypass user credentials to gain unauthorized access. Because passwords remain the most common authentication mechanism, they are a frequent target. The main approaches differ in their level of sophistication and resource requirements.

- **Brute-force attacks** systematically try every possible combination of characters until the correct password is found. They are effective against short or simple passwords but computationally expensive against long, complex ones.
- **Dictionary attacks** use precompiled lists of common words, phrases, and known leaked passwords to accelerate guessing.
- **Credential stuffing** uses credentials obtained from previous data breaches, exploiting the widespread practice of password reuse across services.
- **Rainbow table attacks** use precomputed hash-to-password lookup tables to reverse hashed passwords quickly.
- **Keylogging** captures keystrokes through software or hardware implants to record credentials as they are typed.

Strong defenses include enforcing password complexity policies, implementing multi-factor authentication, using salted and computationally expensive hashing algorithms like bcrypt or Argon2, and deploying account lockout or rate-limiting mechanisms.

## Injection attacks

Injection attacks exploit insufficient input validation to insert malicious instructions into a system. They are among the most dangerous and prevalent attack categories, consistently appearing near the top of the OWASP Top Ten.

**SQL injection** targets applications that construct SQL queries using unsanitized user input. An attacker can manipulate these queries to read, modify, or delete database contents, bypass authentication, or execute administrative operations on the database server.

**Command injection** passes operating system commands through an application that improperly handles user input, potentially granting the attacker shell access to the underlying server.

**LDAP injection** manipulates Lightweight Directory Access Protocol queries to bypass access controls or extract directory information.

Defense against injection attacks centers on parameterized queries, prepared statements, input validation, output encoding, and the principle of least privilege for database and system accounts.

## Cross-site scripting

Cross-site scripting (XSS) attacks inject malicious client-side scripts into web pages viewed by other users. When a victim's browser executes the injected script, the attacker can steal session cookies, redirect users to malicious sites, deface web content, or perform actions on behalf of the victim.

| XSS type | Description | Persistence |
|---|---|---|
| Stored (persistent) | Malicious script is permanently saved on the target server (e.g., in a database or forum post) | Permanent until removed |
| Reflected (non-persistent) | Malicious script is embedded in a URL or request and reflected back in the server's response | Single request |
| DOM-based | Vulnerability exists in client-side JavaScript that processes data from an untrusted source | Varies |

Effective countermeasures include input sanitization, output encoding, Content Security Policy (CSP) headers, and the use of modern frameworks that automatically escape output.

## Eavesdropping attacks

Eavesdropping attacks involve unauthorized interception of private communications or data transmissions. These are fundamentally passive attacks, meaning the adversary collects information without altering it, which makes detection particularly difficult.

Network sniffing uses packet capture tools on a shared network segment to read unencrypted traffic. Traffic analysis examines communication patterns, timing, and metadata even when content is encrypted, potentially revealing sensitive information about relationships and behaviors. Side-channel attacks extract information through physical characteristics such as power consumption, electromagnetic emissions, or timing variations.

Encryption of data in transit using protocols like TLS, IPsec, and WireGuard is the primary defense. Network segmentation and the avoidance of unencrypted protocols further reduce exposure.

## Advanced persistent threats

An advanced persistent threat (APT) is a prolonged, targeted attack campaign in which an adversary establishes a covert, long-term presence within a network. APTs are typically carried out by well-resourced groups, often nation-state sponsored, with specific strategic objectives such as espionage, intellectual property theft, or critical infrastructure sabotage.

APT campaigns follow a characteristic lifecycle:

- **Reconnaissance** gathers intelligence about the target organization, its people, and its infrastructure.
- **Initial access** exploits a vulnerability or uses social engineering to gain a foothold.
- **Lateral movement** escalates privileges and moves through the network to reach high-value assets.
- **Data exfiltration or impact** extracts targeted data or executes the intended disruptive action.
- **Persistence** installs backdoors and maintains access for future operations.

Defending against APTs requires defense in depth, continuous monitoring, threat intelligence feeds, network segmentation, endpoint detection and response, and incident response planning.

## Attack vectors and the kill chain

Technology professionals benefit from understanding how attacks are structured. The Lockheed Martin Cyber Kill Chain and the MITRE ATT&CK framework both provide systematic models for mapping adversary behavior across the lifecycle of an intrusion. The kill chain breaks an attack into sequential phases: reconnaissance, weaponization, delivery, exploitation, installation, command and control, and actions on objectives. By identifying and disrupting any single phase, defenders can prevent or limit the impact of an attack.

The MITRE ATT&CK framework catalogs real-world adversary tactics, techniques, and procedures (TTPs) into a comprehensive matrix organized by attack phase. It serves as a common language for threat intelligence, red team operations, detection engineering, and security assessments.

## Related

Technology professionals studying security attacks should also explore related topics including defense in depth, security mitigations, malware analysis, phishing countermeasures, encryption and cryptography algorithms, network protocols, transport layer security, access control models such as role-based and attribute-based access control, authentication and authorization frameworks, security information and event management (SIEM), compliance frameworks such as SOC 2 and the General Data Protection Regulation, incident response planning, and social engineering awareness training.

## Summary

Security attacks encompass a broad and evolving spectrum of threats that target every layer of technology infrastructure, from network protocols and operating systems to web applications and human users. The major categories include malware, phishing, denial of service, man-in-the-middle interception, password attacks, injection vulnerabilities, cross-site scripting, eavesdropping, and advanced persistent threats. Effective defense requires a layered approach that combines technical controls such as encryption, input validation, and endpoint monitoring with organizational measures such as security awareness training, incident response readiness, and continuous threat intelligence. No single control is sufficient; technology professionals must understand the full taxonomy of attacks to build resilient systems and respond decisively when incidents occur.

## References

- OWASP Foundation. "OWASP Top Ten." https://owasp.org/www-project-top-ten/
- MITRE Corporation. "MITRE ATT&CK Framework." https://attack.mitre.org/
- Lockheed Martin. "The Cyber Kill Chain." https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html
- NIST. "Computer Security Incident Handling Guide (SP 800-61)." https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final
- NIST. "Guide to Intrusion Detection and Prevention Systems (SP 800-94)." https://csrc.nist.gov/publications/detail/sp/800-94/final
- Stallings, William. "Network Security Essentials: Applications and Standards." Pearson Education.
- CISA. "Understanding Denial-of-Service Attacks." https://www.cisa.gov/news-events/news/understanding-denial-service-attacks
- SANS Institute. "Reading Room: Information Security Resources." https://www.sans.org/white-papers/
