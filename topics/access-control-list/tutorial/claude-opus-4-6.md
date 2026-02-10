# Access control list (ACL)

An access control list (ACL) is a security mechanism used across computer operating systems, network devices, and web applications to govern access to resources. At its core, an ACL is an ordered list of permissions that specifies which users, groups, or system processes are granted or denied access to a particular resource, such as files, directories, network ports, or database objects. ACLs are one of the most widely implemented authorization mechanisms in information technology, forming the backbone of many security architectures from enterprise networks to cloud platforms.

## How ACLs Work

An ACL consists of one or more access control entries (ACEs). Each ACE defines a subject (a user, group, or role), a target resource, and a set of permissions (such as read, write, execute, or delete). When a subject requests access to a resource, the system evaluates the ACL entries in order, checking whether the request matches an allow or deny rule. The first matching rule typically determines the outcome, though evaluation behavior varies by implementation.

ACLs operate on the principle of discretionary access control (DAC), where the owner or creator of a resource determines who can access it and what actions they may perform. This contrasts with mandatory access control (MAC), where a central authority enforces system-wide policies regardless of resource ownership.

## Types of ACLs

ACLs are broadly categorized based on their scope and the criteria they evaluate.

| Type | Scope | Filtering Criteria | Common Use |
|---|---|---|---|
| Standard ACL | Basic | Source IP address only | Simple traffic filtering on routers |
| Extended ACL | Granular | Source IP, destination IP, protocol, port number | Firewall rules, advanced network segmentation |
| Filesystem ACL | Resource-level | User identity, group membership, permission bits | File and directory access on operating systems |
| Web/Application ACL | Application-level | User roles, request attributes, endpoint paths | API authorization, web application security |

- **Standard ACLs** are the simplest form, controlling access based solely on the source address. They are typically placed close to the destination to avoid unintended blocking.
- **Extended ACLs** provide fine-grained control by evaluating multiple packet attributes. They are placed close to the source to filter unwanted traffic early.
- **Filesystem ACLs** extend traditional Unix permission models (owner/group/other) by allowing permissions for multiple named users and groups on a single resource.
- **Web and application ACLs** are used by cloud providers (such as AWS WAF ACLs) and application frameworks to control access to APIs, endpoints, and services.

## ACLs in Network Security

Network ACLs are a foundational tool in routers, switches, and firewalls. They filter inbound and outbound traffic by matching packets against ordered rule sets. Key uses include:

- **Perimeter defense**: Blocking traffic from known malicious IP ranges or unauthorized networks at the firewall boundary.
- **Network segmentation**: Restricting communication between VLANs or subnets so that sensitive systems, such as databases or payment processing servers, are isolated from general-purpose networks.
- **Protocol and port filtering**: Allowing only specific protocols (HTTP, HTTPS, SSH) on designated ports while denying everything else by default.
- **Rate limiting and traffic shaping**: Some advanced ACL implementations support traffic management rules alongside access decisions.

Network ACLs are stateless by default, meaning each packet is evaluated independently. This contrasts with stateful firewalls, which track connection state and can make more context-aware decisions.

## ACLs in File Systems

Operating systems use filesystem ACLs to control who can read, write, or execute files and directories. Traditional Unix permissions assign access to three categories: owner, group, and others. POSIX ACLs extend this by allowing administrators to define permissions for any number of individual users or groups on a single file.

Windows NTFS ACLs are particularly expressive, supporting:

- Granular permissions such as "read attributes," "create files," "delete subfolders," and "change permissions"
- Inheritance, where child objects automatically receive the ACL entries of their parent directory
- Explicit deny entries, which override allow entries regardless of order
- Auditing entries, which log access attempts for compliance and forensic purposes

## Advantages and Limitations

**Advantages:**

- **Granularity**: Administrators can define precise permissions for specific users, groups, and resources, minimizing unnecessary access.
- **Flexibility**: ACLs can be modified quickly to adapt to changing requirements, new users, or evolving threat landscapes.
- **Auditability**: ACL configurations provide a clear, reviewable record of who has access to what, supporting compliance with regulations such as HIPAA, SOX, and GDPR.
- **Wide support**: ACLs are implemented across virtually all major operating systems, network devices, and cloud platforms.

**Limitations:**

- **Scalability**: As the number of users, groups, and resources grows, managing individual ACL entries becomes complex and error-prone. Organizations with thousands of resources may find ACL sprawl difficult to govern.
- **Order sensitivity**: In network ACLs, rule order matters. A misplaced entry can inadvertently block legitimate traffic or allow unauthorized access.
- **Lack of context**: Standard ACLs make decisions based on static attributes. They do not account for contextual factors like time of day, device posture, or user behavior, which more modern approaches like attribute-based access control (ABAC) address.
- **Maintenance overhead**: Without disciplined lifecycle management, ACLs accumulate stale entries for former employees, decommissioned systems, or obsolete rules.

## ACLs Compared to Other Access Control Models

| Model | Decision Basis | Centralization | Best For |
|---|---|---|---|
| ACL (Discretionary Access Control) | Resource owner defines permissions per user/group | Decentralized | File systems, small-to-medium networks |
| Role-Based Access Control (RBAC) | Permissions assigned to roles, users assigned to roles | Centralized | Enterprise applications, large organizations |
| Attribute-Based Access Control (ABAC) | Policies evaluate attributes of user, resource, and environment | Centralized, policy-driven | Dynamic, context-aware authorization |
| Mandatory Access Control (MAC) | System-enforced labels and clearance levels | Strictly centralized | Government, military, high-security environments |

ACLs remain the right choice for many scenarios, particularly when the resource model is straightforward and the number of principals is manageable. For large-scale enterprise environments, RBAC or ABAC often layer on top of underlying ACL mechanisms to provide more scalable administration.

## Best Practices

- **Default deny**: Start with a rule that denies all access, then explicitly allow only what is needed. This principle of least privilege reduces exposure.
- **Document and review**: Maintain documentation for every ACL rule, including its purpose and owner. Conduct periodic reviews to remove stale entries.
- **Use groups over individuals**: Assign permissions to groups rather than individual users whenever possible. This simplifies administration and reduces errors.
- **Order rules carefully**: Place more specific rules before general ones. End every network ACL with an explicit deny-all rule.
- **Leverage inheritance**: In filesystem ACLs, use directory-level inheritance to reduce redundant entries and ensure consistent permissions across child objects.
- **Integrate with identity management**: Connect ACL administration to centralized identity providers and lifecycle management systems so that permissions are automatically revoked when users leave or change roles.

## Related

Topics to explore next include role-based access control (RBAC) for scalable permission management in enterprise environments, attribute-based access control (ABAC) for context-aware and policy-driven authorization, discretionary access control (DAC) and mandatory access control (MAC) as foundational access control models, authentication and authorization as the broader security framework within which ACLs operate, defense in depth as a strategy for layering security mechanisms, and firewall configuration for practical application of network ACLs.

## Summary

Access control lists are a fundamental and widely deployed security mechanism that governs who can access resources and what actions they may perform. By defining ordered sets of allow and deny rules at the user, group, or network level, ACLs provide granular, flexible, and auditable access management across file systems, network devices, and applications. While ACLs excel in straightforward environments, organizations with complex or large-scale needs should consider complementing them with role-based or attribute-based access control models. Regardless of the approach chosen, disciplined ACL management, grounded in the principle of least privilege, regular review, and integration with identity governance, remains essential to maintaining a strong security posture.

## References

- Sandhu, R. S., & Samarati, P. (1994). "Access Control: Principles and Practice." *IEEE Communications Magazine*, 32(9), 40–48.
- National Institute of Standards and Technology (NIST). (2009). *A Guide to Securing Microsoft Windows XP Professional*. NIST Special Publication 800-68 Rev. 1. https://csrc.nist.gov/publications/detail/sp/800-68/rev-1/final
- NIST. (2020). *Security and Privacy Controls for Information Systems and Organizations*. NIST SP 800-53 Rev. 5. https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final
- Cisco Systems. *Configuring IP Access Lists*. Cisco IOS Documentation. https://www.cisco.com/c/en/us/support/docs/security/ios-firewall/23602-confaccesslists.html
- Microsoft. *Access Control Lists (ACLs) in NTFS*. Microsoft Learn. https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists
- IEEE 1003.1e (Draft). POSIX ACL specification for extended file system access control.
