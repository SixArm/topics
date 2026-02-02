## Coordinated Disclosure

Coordinated disclosure is a structured process for reporting security vulnerabilities to system owners, enabling them to develop and deploy fixes before the vulnerability becomes public knowledge. This approach balances the security community's need to share findings with the practical requirement of protecting users from exploitation.

## Why Coordinated Disclosure Matters

Security vulnerabilities pose significant risks to organizations and their users. When a researcher discovers a flaw, the method of disclosure directly impacts outcomes:

- **Protecting users**: Giving vendors time to patch prevents attackers from exploiting vulnerabilities against unsuspecting users
- **Maintaining trust**: Organizations can address issues professionally rather than scrambling after public exposure
- **Encouraging research**: Clear disclosure policies motivate researchers to report findings rather than ignore them or sell to malicious actors
- **Reducing harm**: Controlled disclosure minimizes the window between public knowledge and available fixes

## The Five Phases of Coordinated Disclosure

| Phase | Actor | Primary Activities |
|-------|-------|-------------------|
| Discovery | Researcher | Identifies vulnerability through testing, code review, or analysis |
| Notification | Researcher | Reports finding privately to the vendor through secure channels |
| Verification | Vendor | Confirms the issue, assesses severity, and prioritizes remediation |
| Fix and Release | Vendor | Develops patch, tests thoroughly, and distributes to users |
| Disclosure | Both parties | Publishes details after users have had opportunity to update |

### Discovery

Security researchers identify vulnerabilities through various methods:

- Penetration testing and fuzzing
- Source code review and static analysis
- Reverse engineering compiled software
- Monitoring network traffic and system behavior
- Bug bounty program participation

The discovery phase requires careful documentation, including steps to reproduce the issue, affected versions, and potential impact assessment.

### Notification

Private notification protects all parties. Researchers should:

- Use the vendor's designated security contact (often security@company.com or a bug bounty platform)
- Encrypt communications when possible using the vendor's published PGP key
- Provide sufficient technical detail for reproduction
- Avoid sharing findings with third parties during this phase
- Establish a timeline for expected response and resolution

### Verification

Vendors must act promptly upon receiving reports:

- Acknowledge receipt within 24-48 hours
- Assign appropriate engineering resources
- Reproduce and confirm the vulnerability
- Assess severity using frameworks like CVSS (Common Vulnerability Scoring System)
- Communicate timeline expectations to the researcher

### Fix and Release

Remediation involves multiple considerations:

- Developing a patch that addresses root cause, not just symptoms
- Testing the fix across supported platforms and configurations
- Coordinating release timing with the researcher
- Preparing security advisories and CVE identifiers
- Notifying downstream vendors or partners who may be affected

### Public Disclosure

Final disclosure serves the broader community:

- Allows other organizations to assess their own exposure
- Enables security tools to incorporate detection mechanisms
- Credits researchers appropriately for their work
- Documents lessons learned for future prevention

## Disclosure Models Compared

| Model | Description | Advantages | Disadvantages |
|-------|-------------|------------|---------------|
| **Coordinated** | Private report, agreed timeline, joint disclosure | Balances security and transparency | Requires vendor cooperation |
| **Full (Immediate)** | Public disclosure without vendor notification | Forces rapid response | Exposes users to attacks |
| **Non-disclosure** | Never publicly revealed | Protects reputation | Leaves users unknowingly vulnerable |
| **Bug Bounty** | Formalized coordinated process with rewards | Incentivizes responsible reporting | Costs money, may attract low-quality reports |

## Standard Timelines

Industry practice has established common expectations:

| Scenario | Typical Timeline |
|----------|------------------|
| Initial vendor response | 1-3 business days |
| Vulnerability confirmation | 7-14 days |
| Patch development | 30-90 days (complexity dependent) |
| Public disclosure after patch | 7-30 days |
| Disclosure without patch (unresponsive vendor) | 90 days from initial report |

The 90-day disclosure deadline, popularized by Google's Project Zero, has become a de facto standard. This provides vendors reasonable time while preventing indefinite delays.

## Roles and Responsibilities

### Researcher Obligations

- Report vulnerabilities to legitimate owners, not competitors or attackers
- Avoid accessing data beyond what's necessary to demonstrate the issue
- Refrain from destructive testing or denial-of-service conditions
- Maintain confidentiality during the remediation period
- Act in good faith throughout the process

### Vendor Obligations

- Provide clear channels for receiving security reports
- Respond promptly and professionally to disclosures
- Keep researchers informed of remediation progress
- Credit researchers in security advisories (if desired)
- Avoid legal threats against good-faith reporters

## Legal Considerations

Coordinated disclosure operates in a complex legal landscape:

- **Computer Fraud and Abuse Act (CFAA)**: US federal law criminalizing unauthorized computer access
- **Safe harbor policies**: Vendor commitments not to pursue legal action against good-faith researchers
- **Bug bounty terms**: Contractual frameworks defining acceptable testing scope
- **GDPR and data protection**: Restrictions on accessing or retaining personal data during research

Researchers should:

- Review vendor vulnerability disclosure policies before testing
- Document authorization and scope boundaries
- Avoid accessing production systems with real user data when possible
- Consider consulting legal counsel for ambiguous situations

## Establishing a Disclosure Policy

Organizations should publish clear vulnerability disclosure policies containing:

- **Scope**: Which systems and applications are in-scope for testing
- **Contact methods**: Secure channels for receiving reports
- **Response commitments**: Expected acknowledgment and resolution timelines
- **Legal position**: Safe harbor language protecting good-faith researchers
- **Recognition**: How researchers will be credited or compensated
- **Exclusions**: Explicitly prohibited activities (social engineering, physical access, etc.)

## Common Challenges

| Challenge | Mitigation |
|-----------|------------|
| Vendor unresponsive | Escalate through alternative contacts, set firm disclosure deadline |
| Disputed severity | Reference industry-standard scoring systems, provide exploitation proof |
| Patch delays | Negotiate interim mitigations, consider partial disclosure |
| Legal threats | Document good faith, engage legal counsel, involve industry groups |
| Duplicate reports | Accept that simultaneous discovery occurs, maintain professionalism |

## Best Practices Summary

**For Researchers:**

- Document everything from initial discovery through disclosure
- Use secure communication channels for sensitive details
- Set reasonable expectations for vendor response times
- Maintain professionalism even when frustrated
- Consider the impact on end users in all decisions

**For Vendors:**

- Treat security researchers as partners, not adversaries
- Invest in security response capabilities before you need them
- Publish and honor clear disclosure policies
- Communicate proactively about remediation status
- Learn from vulnerabilities to prevent similar issues

## Conclusion

Coordinated disclosure represents a mature approach to handling security vulnerabilities that serves all stakeholders. When executed properly, it protects users from exploitation while enabling continuous improvement of security practices across the industry. Both researchers and vendors benefit from understanding and following established norms, and organizations without disclosure policies should prioritize creating them as part of their overall security program.
