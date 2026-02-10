Here is the tutorial:

# Access control

Access control is a security mechanism that governs who or what can view, use, or modify resources within a computer system, network, or physical environment. It is one of the foundational pillars of information security, operating alongside confidentiality, integrity, and availability to protect sensitive data and infrastructure. For technology professionals, understanding access control means understanding how to design, implement, and audit the policies that determine which subjects (users, processes, devices) can interact with which objects (files, databases, services, rooms) and under what conditions. Effective access control reduces the attack surface, limits the blast radius of breaches, and satisfies regulatory compliance requirements across virtually every industry.

## Core concepts

Access control rests on four interrelated disciplines that work together as a pipeline: identity management, authentication, authorization, and auditing.

**Identity management** is the practice of creating, maintaining, and retiring digital identities. Each identity represents a principal, whether a human user, a service account, or an IoT device, and is associated with attributes such as name, department, role, and clearance level. Centralized identity providers (IdPs) such as Active Directory, Okta, or cloud-native IAM services serve as the single source of truth for these identities.

**Authentication** is the process of verifying that a principal is who they claim to be. Common factors include something the user knows (password, PIN), something the user has (hardware token, smart card), and something the user is (fingerprint, facial recognition). Multi-factor authentication (MFA) combines two or more factors to significantly raise the bar for attackers.

**Authorization** determines what an authenticated principal is permitted to do. Authorization decisions are driven by policies that reference roles, attributes, relationships, or explicit permission grants. This is where access control models (discussed below) come into play.

**Auditing** (sometimes called accounting) records who accessed what, when, and how. Audit logs feed into security information and event management (SIEM) systems for real-time alerting, forensic investigation, and compliance reporting.

## Levels of access control

Access control operates at multiple layers of the technology stack. Each layer addresses a different class of threat and requires its own tooling and policy framework.

| Level | Scope | Examples |
|---|---|---|
| Physical | Buildings, rooms, data centers | Key cards, biometric door locks, mantraps, security guards |
| Network | Network segments, VPNs, firewalls | 802.1X port-based NAC, firewall ACLs, micro-segmentation |
| Operating system | Files, processes, kernel objects | POSIX permissions, Windows DACLs, SELinux mandatory policies |
| Application | Features, data records, API endpoints | OAuth 2.0 scopes, RBAC in SaaS platforms, row-level security |
| Data | Individual fields, columns, cells | Column-level encryption, dynamic data masking, tokenization |

A defense-in-depth strategy layers controls at every level so that a failure at one layer does not expose the entire system.

## Access control models

Different models encode authorization logic in fundamentally different ways. Choosing the right model depends on the complexity of the environment, the granularity of control required, and regulatory obligations.

| Model | Abbreviation | How permissions are assigned | Best suited for |
|---|---|---|---|
| Discretionary access control | DAC | Resource owners grant permissions at their discretion | Small teams, file systems, low-regulation environments |
| Mandatory access control | MAC | A central authority assigns classification labels; the system enforces them | Military, intelligence, high-security government systems |
| Role-based access control | RBAC | Permissions are grouped into roles; users are assigned roles | Enterprises with well-defined job functions |
| Attribute-based access control | ABAC | Policies evaluate attributes of the subject, resource, action, and environment | Complex, dynamic environments requiring fine-grained rules |
| Policy-based access control | PBAC | Centralized policy engine evaluates rules written in a policy language | Cloud-native architectures, microservices |
| Rule-based access control | RuBAC | Static rules (e.g., time-of-day, IP range) gate access | Network devices, firewalls, supplementary controls |

**DAC** is the simplest model: the owner of a resource decides who else can access it. POSIX file permissions and Windows NTFS ACLs are classic examples. The downside is that owners can make poor decisions, and permissions tend to drift over time.

**MAC** removes discretion from individual users. Every subject and object carries a security label (e.g., Unclassified, Confidential, Secret, Top Secret), and the system enforces rules such as "no read up, no write down" (the Bell-LaPadula model). MAC is rigid but provides strong guarantees.

**RBAC** maps permissions to organizational roles rather than individual users. When an employee changes jobs, administrators simply reassign them to a new role. RBAC simplifies large-scale administration but can suffer from role explosion in complex organizations.

**ABAC** evaluates policies at runtime using any combination of attributes: user department, resource sensitivity, request time, device posture, geolocation, and more. ABAC is the most flexible model and is the foundation of modern policy engines such as AWS IAM policies and Open Policy Agent (OPA).

## The principle of least privilege

The principle of least privilege states that every subject should be granted only the minimum permissions necessary to perform its function, and only for the duration required. This principle cuts across all models and levels:

- **User accounts** should not have administrative privileges by default.
- **Service accounts** should be scoped to the specific APIs and data stores they need.
- **Temporary credentials** (e.g., short-lived tokens, just-in-time access) are preferable to standing permissions.
- **Break-glass procedures** should exist for emergency escalation, with mandatory post-incident review.

Violating least privilege is one of the most common root causes of data breaches. Overprivileged accounts give attackers lateral movement once they gain an initial foothold.

## Zero trust architecture

Traditional perimeter-based security assumes that everything inside the network is trusted. Zero trust rejects this assumption entirely. Its core tenets are:

- **Never trust, always verify.** Every request is authenticated and authorized regardless of network location.
- **Assume breach.** Design systems so that compromise of one component does not cascade.
- **Verify explicitly.** Use all available signals (identity, device health, location, behavior analytics) to make access decisions.
- **Least privilege access.** Grant the narrowest permissions possible, with continuous re-evaluation.

Zero trust is not a single product but an architectural approach that combines identity-aware proxies, micro-segmentation, continuous authentication, and policy-based authorization. Frameworks such as NIST SP 800-207 provide formal guidance for implementation.

## Access control lists and policies

An **access control list (ACL)** is a data structure that enumerates which principals have which permissions on a given resource. ACLs are attached directly to objects (files, network interfaces, database tables) and are evaluated when a request is made. They are simple and widely supported, but managing thousands of ACLs across a large environment becomes unwieldy.

**Policy-based approaches** externalize authorization logic into a dedicated policy engine. Policies are written in a declarative language (e.g., Rego for OPA, Cedar for AWS Verified Permissions, XACML for enterprise systems) and are evaluated at a central policy decision point (PDP). This separation of policy from enforcement simplifies auditing, enables version control of policies, and allows consistent enforcement across heterogeneous systems.

## Implementation best practices

Deploying effective access control requires deliberate design and ongoing operational discipline:

- **Centralize identity.** Use a single identity provider with federation (SAML, OIDC) rather than siloed user databases per application.
- **Enforce MFA everywhere.** Passwords alone are insufficient. Require a second factor for all human access, especially for privileged accounts.
- **Automate provisioning and deprovisioning.** Integrate identity lifecycle management with HR systems to ensure that access is revoked promptly when employees leave or change roles.
- **Conduct regular access reviews.** Periodically certify that users still need the access they have. Automate recertification workflows where possible.
- **Segment and isolate.** Use network micro-segmentation and separate trust boundaries to contain breaches.
- **Log everything.** Capture authentication events, authorization decisions, privilege escalations, and resource access in tamper-evident audit logs.
- **Test your controls.** Include access control validation in penetration tests, red team exercises, and automated security scans.

## Regulatory and compliance context

Access control is not just a technical concern; it is a legal and regulatory requirement in many sectors:

| Regulation / Standard | Sector | Access control requirements |
|---|---|---|
| HIPAA | Healthcare | Role-based access to protected health information, audit trails, minimum necessary standard |
| PCI DSS | Payment card industry | Restrict access on a need-to-know basis, unique IDs for each user, MFA for remote access |
| SOC 2 | Technology / SaaS | Logical and physical access controls, access reviews, monitoring |
| GDPR | Any organization handling EU data | Data access limited to authorized personnel, records of processing activities |
| NIST SP 800-53 | U.S. federal government | Comprehensive access control family (AC-1 through AC-25) covering policy, enforcement, and review |
| ISO/IEC 27001 | Any organization | Annex A controls for access management, user responsibilities, and system access control |

Compliance frameworks increasingly expect organizations to demonstrate not only that controls exist but that they are continuously monitored and effective.

## Common pitfalls

Even well-intentioned access control programs can fail. Watch for these recurring problems:

- **Role explosion.** Creating a new role for every edge case until the RBAC model becomes unmanageable. Mitigate by combining RBAC with ABAC for fine-grained exceptions.
- **Privilege creep.** Users accumulate permissions over time as they move between teams without losing old access. Mitigate with automated access reviews and time-bound grants.
- **Shared accounts.** Generic accounts (e.g., "admin", "root", "service") destroy accountability. Every principal should have a unique identity.
- **Hardcoded credentials.** Embedding API keys or passwords in source code bypasses all access control layers. Use secrets management tools (Vault, AWS Secrets Manager) instead.
- **Ignoring non-human identities.** Service accounts, CI/CD pipelines, and machine identities often outnumber human users and are frequently overprivileged.

## Related

To deepen your understanding of access control, explore these related topics: role-based access control (RBAC) and attribute-based access control (ABAC) for detailed model comparisons, access control lists (ACLs) for low-level permission structures, discretionary access control (DAC) for owner-managed permissions, authentication and the AAA framework (authentication, authorization, accounting, auditing) for the identity verification pipeline, defense in depth for layered security strategy, and security information and event management (SIEM) for the auditing and monitoring side of the equation.

## Summary

Access control is the discipline of ensuring that the right subjects have the right access to the right resources under the right conditions, and that every other request is denied. It spans physical locks and network firewalls through operating system permissions and application-level authorization, and it is governed by models ranging from simple discretionary grants to sophisticated attribute-based policies. The principle of least privilege and the zero trust paradigm guide modern implementations, while regulatory frameworks make robust access control a legal obligation. Technology professionals who master access control design, implementation, and auditing protect their organizations from unauthorized access, limit the damage of inevitable breaches, and build the trust that underpins every digital system.

## References

- NIST SP 800-53 Rev. 5, "Security and Privacy Controls for Information Systems and Organizations," Access Control family (AC-1 through AC-25). https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final
- NIST SP 800-207, "Zero Trust Architecture." https://csrc.nist.gov/publications/detail/sp/800-207/final
- NIST SP 800-162, "Guide to Attribute Based Access Control (ABAC) Definition and Considerations." https://csrc.nist.gov/publications/detail/sp/800-162/final
- Sandhu, R. and Samarati, P., "Access Control: Principles and Practice," IEEE Communications Magazine, 1994.
- Ferraiolo, D., Kuhn, D.R., and Chandramouli, R., "Role-Based Access Control," 2nd Edition, Artech House, 2007.
- OWASP, "Access Control Cheat Sheet." https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html
- ISO/IEC 27001:2022, Information Security Management Systems, Annex A Control A.9 (Access Control). https://www.iso.org/standard/27001
