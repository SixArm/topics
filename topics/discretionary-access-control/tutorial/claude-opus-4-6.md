# Discretionary Access Control (DAC)

Discretionary Access Control (DAC) is a foundational access control model in which the owner of a resource determines who may access it and what operations they may perform. Rooted in early Unix file permission systems and formalized in the Trusted Computer System Evaluation Criteria (TCSEC), DAC remains one of the most widely deployed access control paradigms across operating systems, databases, file servers, and cloud storage platforms. Its defining characteristic is that access decisions are made at the discretion of the resource owner rather than being imposed by a centralized authority.

## Core Concepts

DAC operates on the principle that every resource—whether a file, directory, database table, or network share—has an owner, and that owner holds the authority to grant or revoke access to other subjects (users, groups, or processes). The key abstractions in a DAC system are:

- **Subjects**: Users, processes, or services that request access to resources.
- **Objects**: The resources being protected, such as files, directories, memory segments, or database records.
- **Owners**: The subject that created or has been designated as the owner of an object. Ownership typically defaults to the creator.
- **Permissions**: The specific operations a subject is allowed to perform on an object, such as read, write, execute, or delete.
- **Access Control Lists (ACLs)**: Data structures attached to each object that enumerate which subjects hold which permissions.

When a subject attempts an operation on an object, the operating system or access control subsystem consults the object's ACL or permission metadata to determine whether the operation is permitted.

## How DAC Works in Practice

Most technology professionals encounter DAC daily through Unix/Linux file permissions and Windows NTFS access control lists.

In Unix-like systems, every file and directory has an owner and a group. Permissions are expressed as a combination of read (r), write (w), and execute (x) for three categories: the owner, the group, and all other users. The owner can modify these permissions using commands such as `chmod` and `chown`, and can extend access by changing group membership or setting world-readable flags.

Windows NTFS takes a more granular approach. Each file or folder carries a security descriptor containing a Discretionary Access Control List (DACL). The DACL is a list of Access Control Entries (ACEs), each specifying a trustee (user or group) and the permissions granted or denied. Owners can edit these DACLs through the security properties dialog or programmatically.

In both cases, the defining pattern is the same: the resource owner decides who gets access.

## DAC Compared to Other Access Control Models

| Feature | DAC | MAC | RBAC | ABAC |
|---|---|---|---|---|
| Access decision made by | Resource owner | System/security policy | Role assignment | Policy rules evaluating attributes |
| Flexibility | High | Low | Moderate | High |
| Centralized enforcement | No | Yes | Yes | Yes |
| Typical use case | Personal files, small teams | Military, classified systems | Enterprise applications | Complex, context-aware policies |
| Granularity | Per-object, per-user | Classification labels | Role-based grouping | Attribute-based conditions |
| Risk of privilege creep | High | Low | Moderate | Low |
| Administrative overhead | Low initially, grows over time | High | Moderate | High initially, efficient at scale |

DAC offers the most autonomy to individual users but provides the weakest centralized control. Mandatory Access Control (MAC) enforces system-wide security labels that cannot be overridden by users. Role-Based Access Control (RBAC) assigns permissions to roles rather than individuals. Attribute-Based Access Control (ABAC) evaluates policies against subject, object, and environmental attributes at decision time.

## Advantages of DAC

- **User autonomy**: Resource owners manage their own permissions without requiring administrator intervention, reducing bottlenecks in day-to-day workflows.
- **Simplicity**: The model is intuitive. Most users understand the concept of sharing a file with specific colleagues.
- **Low initial overhead**: DAC requires minimal infrastructure. It is built into virtually every operating system without additional software.
- **Flexibility**: Owners can rapidly adjust permissions in response to changing collaboration needs, making DAC well suited to dynamic work environments.
- **Broad platform support**: Unix permissions, Windows DACLs, cloud storage sharing controls, and database grant statements all implement DAC natively.

## Disadvantages and Security Risks

- **Privilege creep**: Over time, users accumulate permissions that are never revoked, expanding the attack surface.
- **Inconsistent enforcement**: Because each owner sets permissions independently, there is no guarantee that organizational security policies are uniformly applied.
- **Trojan horse vulnerability**: A malicious program running under a user's identity inherits that user's permissions and can copy data to locations accessible by unauthorized parties. This is a well-documented weakness of pure DAC systems.
- **Scalability challenges**: In large organizations with thousands of users and millions of objects, managing individual ACLs becomes unwieldy without supplementary tooling.
- **No information flow control**: DAC controls access to objects but does not control what a subject does with data after reading it. A user with read access can copy data to a less-protected location.
- **Audit complexity**: Determining the effective permissions across a large DAC-managed system requires aggregating and analyzing distributed ACLs, which is error-prone.

## Implementation Patterns

Organizations deploying DAC effectively tend to follow several operational patterns:

- **Default deny**: New objects are created with minimal permissions, and owners explicitly grant access as needed rather than starting with broad access and restricting later.
- **Group-based management**: Rather than granting permissions to individual users, owners assign permissions to groups. This reduces ACL complexity and simplifies onboarding and offboarding.
- **Periodic access reviews**: Scheduled audits of ACLs help identify stale permissions and reduce privilege creep.
- **Complementary controls**: DAC is paired with logging, monitoring, and data loss prevention (DLP) tools to compensate for its lack of information flow control.
- **Hybrid models**: Many production environments combine DAC with RBAC or MAC. For example, an organization may use RBAC for application-level access and DAC for file-level sharing within teams.

## When to Use DAC

DAC is most appropriate in environments where individual users need direct control over their own resources and where the consequences of oversharing are manageable. Common scenarios include:

- Personal workstations and development environments
- Small to medium team file sharing
- Collaborative document platforms where users share selectively
- Database environments where schema owners manage table grants
- Prototyping and development stages before formal security policies are established

DAC is less appropriate for environments with strict regulatory requirements, classified information handling, or large-scale multi-tenant platforms where centralized policy enforcement is essential.

## Related

Related topics to explore include Mandatory Access Control (MAC) for understanding policy-driven enforcement, Role-Based Access Control (RBAC) for enterprise permission modeling, Attribute-Based Access Control (ABAC) for context-aware authorization, Access Control Lists (ACLs) for deeper understanding of the underlying data structures, the principle of least privilege for permission design philosophy, defense in depth for layered security strategy, and authentication-authorization-accounting-auditing (AAAA) for the broader security lifecycle.

## Summary

Discretionary Access Control is a pragmatic, owner-centric access control model that grants resource owners the authority to manage permissions on their own objects. Its simplicity and flexibility make it the default model in most operating systems and file-sharing platforms. However, its decentralized nature introduces risks including privilege creep, Trojan horse vulnerabilities, and inconsistent policy enforcement. Technology professionals should understand DAC not as a complete security solution but as one layer in a defense-in-depth strategy, typically complemented by role-based controls, centralized policy enforcement, auditing, and monitoring to achieve a robust security posture.

## References

- National Institute of Standards and Technology (NIST). "An Introduction to Role-Based Access Control." NIST Special Publication, https://csrc.nist.gov/projects/role-based-access-control
- Department of Defense. "Trusted Computer System Evaluation Criteria (TCSEC)." DoD Standard 5200.28-STD, 1985 (Orange Book).
- Sandhu, R. and Samarati, P. "Access Control: Principles and Practice." IEEE Communications Magazine, vol. 32, no. 9, 1994.
- Bishop, M. "Computer Security: Art and Science." Addison-Wesley, 2003.
- Microsoft. "Access Control Lists (ACLs)." Windows Security Documentation, https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists
- Garfinkel, S., Spafford, G., and Schwartz, A. "Practical Unix and Internet Security." O'Reilly Media, 2003.
