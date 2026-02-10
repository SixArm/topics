# Coordinated disclosure

Coordinated disclosure is a structured process through which security researchers, ethical hackers, or other individuals who discover vulnerabilities in software, hardware, or networked systems report those findings privately to the affected vendor or organization. The goal is to give the responsible party sufficient time to investigate, develop, and deploy a fix before any public announcement, thereby minimizing the window of opportunity for malicious exploitation. This practice sits at the intersection of cybersecurity ethics, legal compliance, and stakeholder trust, and it has become a cornerstone of modern security governance across industries.

## Why Coordinated Disclosure Matters

Unpatched vulnerabilities represent one of the most significant attack vectors in cybersecurity. When a flaw is discovered, a race begins between defenders who must remediate it and adversaries who seek to exploit it. Coordinated disclosure tilts the odds in favor of defenders by ensuring that knowledge of the vulnerability is confined to a small, trusted circle until a remedy is available.

Without coordinated disclosure, two problematic alternatives tend to emerge. In the first, a researcher publishes details of a vulnerability immediately, a practice known as full disclosure, which can expose millions of users to attack before a patch exists. In the second, the researcher says nothing at all, which may leave the vulnerability unaddressed indefinitely while sophisticated threat actors discover and exploit it independently. Coordinated disclosure charts a responsible middle path that balances transparency with protection.

## Key Phases of the Process

The coordinated disclosure lifecycle follows a series of well-defined phases, each with distinct responsibilities for the discoverer and the vendor.

- **Discovery.** A security researcher, penetration tester, or even an end user identifies anomalous behavior or a flaw in a system. This may result from deliberate security research, bug bounty participation, or incidental observation during normal use.

- **Notification.** The discoverer contacts the vendor or system owner through a private, secure channel. Many organizations publish a security contact address, a security.txt file, or operate a bug bounty platform to facilitate this step. The initial report typically includes a description of the vulnerability, steps to reproduce it, and an assessment of potential impact.

- **Verification.** The vendor confirms that the reported issue is genuine, determines its severity using a framework such as CVSS (Common Vulnerability Scoring System), and assigns a tracking identifier, often a CVE (Common Vulnerabilities and Exposures) number. The vendor communicates acknowledgment back to the researcher.

- **Remediation.** The vendor develops, tests, and prepares a patch, configuration change, or mitigation. During this phase, the researcher and vendor typically agree on a disclosure timeline, often 90 days from the initial report, though critical issues may warrant shorter or longer windows.

- **Public Disclosure.** Once a fix is available and deployed, the vulnerability is disclosed publicly through a security advisory, blog post, or CVE database entry. This allows the broader community to understand the risk, verify that their systems are patched, and learn from the incident.

## Disclosure Models Compared

| Model | Description | Advantages | Disadvantages |
|---|---|---|---|
| Coordinated Disclosure | Private report to vendor with agreed timeline before public release | Gives vendor time to patch; protects users; maintains trust | Vendor may delay or ignore the report; researcher has limited leverage |
| Full Disclosure | Immediate public release of vulnerability details | Forces rapid vendor response; full transparency | Exposes users to attacks before a fix exists; may be legally risky |
| Non-Disclosure | Vulnerability is never reported or published | No public exposure of the flaw | Vulnerability persists indefinitely; may be exploited by threat actors |
| Bug Bounty Programs | Vendor-operated programs that incentivize coordinated reporting with financial rewards | Aligns incentives; structured process; legal safe harbor | Scope limitations; payout disputes; not all organizations offer them |

## Roles and Responsibilities

Successful coordinated disclosure depends on clearly understood roles for all participants.

- **Researchers** are expected to act in good faith, avoid accessing data beyond what is necessary to demonstrate the flaw, refrain from destructive testing, and respect the agreed disclosure timeline.

- **Vendors** are expected to acknowledge reports promptly, provide regular status updates, develop and release patches within a reasonable timeframe, credit the researcher in advisories, and refrain from threatening legal action against good-faith reporters.

- **Coordinators**, such as CERT/CC or national cybersecurity agencies, may serve as neutral intermediaries when direct communication between the researcher and vendor breaks down, or when a vulnerability affects multiple vendors simultaneously.

## Common Frameworks and Standards

Several widely adopted frameworks guide coordinated disclosure practices:

- **ISO/IEC 29147** defines the process for vendors to receive and handle vulnerability reports from external parties.
- **ISO/IEC 30111** specifies internal vulnerability handling processes within an organization.
- **CERT Guide to Coordinated Vulnerability Disclosure** provides a comprehensive reference published by the Software Engineering Institute at Carnegie Mellon University.
- **FIRST PSIRT Services Framework** outlines best practices for Product Security Incident Response Teams.
- **NIST SP 800-216** offers guidance on federal vulnerability disclosure policies in the United States.

## Disclosure Timelines

The disclosure timeline is one of the most debated aspects of the process. A timeline that is too short may not give the vendor adequate time to develop a quality fix. A timeline that is too long may leave users exposed while the vendor deprioritizes the issue.

- **Google Project Zero** popularized a 90-day disclosure deadline, with a 14-day grace period if a patch is imminent at the deadline.
- **ZDI (Zero Day Initiative)** typically allows 120 days before public disclosure.
- **Microsoft** follows a policy of coordinated disclosure without a fixed public deadline, preferring to negotiate timelines on a case-by-case basis.
- **CERT/CC** historically used a 45-day window, which has since been extended to align more closely with industry norms.

When the agreed timeline expires and no fix has been released, the researcher faces a difficult judgment call. Most responsible disclosure policies allow the researcher to publish at that point, though they may choose to redact technical details that would make exploitation trivial.

## Legal and Ethical Considerations

The legal landscape around vulnerability disclosure varies significantly by jurisdiction. In some countries, good-faith security research is explicitly protected; in others, it may fall under computer fraud or unauthorized access statutes regardless of intent.

- **United States.** The Computer Fraud and Abuse Act (CFAA) can be applied broadly, though the Department of Justice issued a 2022 policy stating that good-faith security research should not be prosecuted.
- **European Union.** Several member states have adopted or are developing safe harbor provisions for security researchers, and the EU Cybersecurity Act encourages coordinated disclosure.
- **Bug Bounty Safe Harbors.** Many organizations include explicit legal safe harbor language in their vulnerability disclosure policies, assuring researchers that they will not face legal action if they follow the program rules.

Ethically, coordinated disclosure aligns with principles of minimizing harm, respecting user privacy, and contributing to the collective security of the digital ecosystem. Researchers are expected to avoid actions that could cause damage, such as exfiltrating sensitive data, disrupting services, or selling vulnerability information to malicious parties.

## Challenges and Pitfalls

Even well-intentioned coordinated disclosure can encounter obstacles:

- **Unresponsive vendors.** Some organizations lack a security contact, ignore reports, or fail to acknowledge the researcher. This frustrates researchers and may push them toward full disclosure.
- **Scope disagreements.** The vendor may classify a reported issue as out of scope, expected behavior, or low severity, while the researcher considers it critical.
- **Patch quality.** A rushed fix may introduce new vulnerabilities or fail to address the root cause, requiring additional rounds of reporting and remediation.
- **Multi-party coordination.** When a vulnerability affects an open-source library used by hundreds of downstream projects, coordinating disclosure across all affected parties becomes exponentially complex.
- **Weaponization risk.** Even carefully redacted advisories may provide enough information for skilled attackers to reverse-engineer an exploit, particularly if the patch itself reveals the nature of the flaw through differential analysis.

## Related

To deepen understanding of coordinated disclosure, consider exploring related topics such as bug bounty programs, responsible disclosure policies, the Common Vulnerability Scoring System (CVSS), Common Vulnerabilities and Exposures (CVE) identifiers, penetration testing methodologies, security incident response, threat modeling, software supply chain security, and the legal frameworks governing computer security research including the Computer Fraud and Abuse Act and the EU Cybersecurity Act.

## Summary

Coordinated disclosure is a disciplined, ethical approach to handling security vulnerabilities that balances the need for transparency with the imperative to protect users. By following a structured process of private notification, verification, remediation, and public disclosure, researchers and vendors work together to close security gaps before adversaries can exploit them. While challenges around timelines, legal risks, and vendor responsiveness persist, the broad adoption of coordinated disclosure frameworks, bug bounty programs, and international standards has made the practice a foundational element of modern cybersecurity governance.

## References

- ISO/IEC 29147:2018, "Information technology — Security techniques — Vulnerability disclosure." International Organization for Standardization. https://www.iso.org/standard/72311.html
- ISO/IEC 30111:2019, "Information technology — Security techniques — Vulnerability handling processes." International Organization for Standardization. https://www.iso.org/standard/69725.html
- Householder, A. D., et al. "The CERT Guide to Coordinated Vulnerability Disclosure." Software Engineering Institute, Carnegie Mellon University, 2017. https://certcc.github.io/CERT-Guide-to-CVD/
- FIRST. "PSIRT Services Framework." Forum of Incident Response and Security Teams. https://www.first.org/standards/frameworks/psirts/psirt_services_framework_v1.1
- NIST. "Vulnerability Disclosure Policy (VDP) for Federal Information Systems." NIST SP 800-216. https://csrc.nist.gov/publications/detail/sp/800-216/final
- Google Project Zero. "Policy and Disclosure." https://googleprojectzero.blogspot.com/p/vulnerability-disclosure-policy.html
- U.S. Department of Justice. "Department of Justice Announces New Policy for Charging Cases Under the Computer Fraud and Abuse Act." May 2022. https://www.justice.gov/opa/pr/department-justice-announces-new-policy-charging-cases-under-computer-fraud-and-abuse-act
