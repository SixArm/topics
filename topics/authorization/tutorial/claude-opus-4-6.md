Here is the comprehensive tutorial:

# Authorization

Authorization is the process of determining whether a user, system, or service has the necessary permissions to access a particular resource or perform a specific action. It is one of the foundational pillars of information security, sitting alongside authentication (verifying identity), accounting (tracking resource usage), and auditing (reviewing activity logs). While authentication answers the question "Who are you?", authorization answers "What are you allowed to do?" Understanding authorization deeply is essential for any technology professional building or managing secure systems, because even a perfectly authenticated user must still be constrained to only those operations and data appropriate to their role and context.

## Authentication vs. Authorization

A common source of confusion in security discussions is conflating authentication with authorization. These are distinct processes that work together but serve different purposes.

| Aspect | Authentication | Authorization |
|---|---|---|
| Core question | "Who are you?" | "What can you do?" |
| Purpose | Verify identity | Grant or deny access to resources |
| Timing | Occurs first | Occurs after authentication |
| Inputs | Credentials (passwords, biometrics, tokens) | Policies, roles, attributes, permissions |
| Outputs | Confirmed or rejected identity | Permitted or denied action |
| Example | Logging in with a username and password | Being allowed to read a file but not delete it |
| Failure result | Access denied entirely | Specific action or resource blocked |

In practice, authorization depends on authentication. A system must first establish who is making a request before it can evaluate what that requester is permitted to do. However, authorization logic is governed by its own policies and is independent of the mechanism used to authenticate.

## Access Control Models

Authorization is implemented through access control models, each offering different tradeoffs between flexibility, granularity, administrative complexity, and security guarantees. The four most widely adopted models are described below.

### Role-Based Access Control (RBAC)

Role-Based Access Control assigns users to predefined roles, and each role carries a set of permissions. For example, an "editor" role might have permission to create and modify content, while a "viewer" role can only read content. RBAC simplifies administration in organizations with well-defined job functions because permissions are managed at the role level rather than per individual user. It is the most commonly deployed model in enterprise software, operating systems, and cloud platforms.

RBAC works best when organizational roles map cleanly to permission sets. It becomes cumbersome when users need fine-grained or context-dependent permissions that do not align neatly with a small number of roles, sometimes leading to role explosion -- an unmanageable proliferation of narrowly defined roles.

### Attribute-Based Access Control (ABAC)

Attribute-Based Access Control evaluates access requests against policies that reference attributes of the user, the resource, the action, and the environment. Attributes can include job title, security clearance, department, geographic location, time of day, device type, or data classification level. Policies are expressed as rules combining these attributes, such as "allow access to patient records only for users with the role of physician, accessing from within the hospital network, during business hours."

ABAC is more flexible than RBAC because it can encode complex, context-sensitive policies without requiring a new role for every scenario. This makes it well suited for organizations with dynamic or highly regulated environments, including healthcare, finance, and government.

### Discretionary Access Control (DAC)

Discretionary Access Control gives the owner of a resource full control over who can access it and what operations they can perform. Traditional Unix file permissions are a classic example: a file owner can grant read, write, or execute permissions to other users or groups. DAC is intuitive and flexible for individual resource management but introduces risk because security depends on the judgment of individual resource owners, who may inadvertently or carelessly grant excessive access.

### Mandatory Access Control (MAC)

Mandatory Access Control enforces access policies determined by a central authority, and individual resource owners cannot override them. Resources and users are assigned security labels (such as "Top Secret" or "Confidential"), and the system enforces rules about which label levels can access which resources. MAC is used in military and government systems where strict, centrally governed information classification is required. It offers the strongest security guarantees but is the least flexible and most administratively intensive model.

### Comparison of Access Control Models

| Model | Flexibility | Granularity | Administrative Burden | Security Strength | Best Suited For |
|---|---|---|---|---|---|
| RBAC | Moderate | Role-level | Low to moderate | Moderate | Enterprise applications with clear roles |
| ABAC | High | Attribute-level | Moderate to high | High | Regulated industries, dynamic policies |
| DAC | High | Resource-level | Low | Lower | File systems, small teams |
| MAC | Low | Label-level | High | Highest | Military, classified environments |

## Core Principles of Authorization Design

Effective authorization systems are built on a set of well-established security principles.

- **Principle of Least Privilege**: Users and systems should be granted only the minimum permissions necessary to perform their intended tasks. This limits the damage that can result from accidental misuse, compromised credentials, or insider threats.

- **Separation of Duties**: Critical operations should require authorization from more than one user or role. For example, the person who requests a financial transaction should not be the same person who approves it.

- **Default Deny**: Access should be denied unless explicitly permitted by a policy. This ensures that new resources, endpoints, or actions are secure by default rather than accidentally exposed.

- **Defense in Depth**: Authorization should be enforced at multiple layers of the system -- network, application, database, and API -- so that a failure at one layer does not expose resources entirely.

- **Fail Securely**: When an authorization check encounters an error or ambiguous input, it should deny access rather than grant it. Silent failures that default to permissive access are a common source of vulnerabilities.

## Authorization in Modern Architectures

Modern distributed systems introduce authorization challenges that go beyond traditional single-application models.

- **API Authorization**: RESTful and GraphQL APIs typically use token-based authorization. OAuth 2.0 is the dominant framework, where access tokens carry scopes that define what operations a client application is permitted to perform on behalf of a user. OpenID Connect extends OAuth 2.0 to layer authentication on top of authorization.

- **Microservices**: In microservice architectures, authorization decisions must be made at each service boundary. Common patterns include passing authorization tokens (such as JWTs) between services, centralizing policy decisions in a dedicated authorization service, or using a service mesh to enforce policies at the infrastructure level.

- **Zero Trust**: The zero trust security model treats every request as potentially untrusted regardless of network location. Authorization is evaluated continuously rather than once at the perimeter, incorporating signals such as device posture, user behavior, and real-time risk scoring.

- **Cloud and Infrastructure**: Cloud providers implement authorization through identity and access management (IAM) systems that combine RBAC and ABAC. Policies are attached to users, groups, or resources and evaluated for every API call. Infrastructure-as-code practices make authorization policies versionable, reviewable, and auditable alongside application code.

## Common Authorization Vulnerabilities

Even well-designed authorization systems can fail when implementation details are overlooked.

- **Broken Access Control**: Ranked as the number one web application security risk by OWASP, this occurs when an application fails to properly enforce access restrictions, allowing users to act outside their intended permissions.

- **Insecure Direct Object References (IDOR)**: An application exposes internal object identifiers (such as database IDs) in URLs or API parameters without verifying that the requesting user is authorized to access that specific object.

- **Privilege Escalation**: An attacker exploits a flaw to gain permissions beyond what was intended, either vertically (gaining admin access from a regular account) or horizontally (accessing another user's data at the same privilege level).

- **Missing Function-Level Access Control**: Administrative or privileged functions are accessible to unauthorized users because the application only hides UI elements without enforcing server-side authorization checks.

- **Token and Session Mismanagement**: Authorization tokens with excessive lifetimes, overly broad scopes, or insufficient validation enable attackers to maintain unauthorized access.

## Related

Technology professionals studying authorization should also explore authentication mechanisms and protocols such as OAuth 2.0 and OpenID Connect, which are tightly coupled with authorization in modern systems. Access control models including RBAC, ABAC, DAC, and MAC each warrant deeper study. The broader AAAA framework (authentication, authorization, accounting, auditing) provides essential context for understanding how authorization fits into a complete security posture. Defense in depth, zero trust architecture, identity and access management (IAM), and the OWASP Top Ten are all directly relevant areas that build on and reinforce sound authorization practices.

## Summary

Authorization is the security mechanism that governs what authenticated users and systems are permitted to do. It is implemented through access control models -- RBAC, ABAC, DAC, and MAC -- each offering different balances of flexibility, granularity, and security strength. Effective authorization design follows the principles of least privilege, default deny, separation of duties, and defense in depth. In modern distributed architectures, authorization extends across APIs, microservices, cloud infrastructure, and zero trust networks, requiring consistent policy enforcement at every layer. Because broken access control remains the most prevalent category of web application vulnerability, mastering authorization is not optional for technology professionals -- it is a core competency for building systems that are secure by design.

## References

- National Institute of Standards and Technology (NIST). "Guide to Attribute Based Access Control (ABAC) Definition and Considerations." NIST Special Publication 800-162. https://csrc.nist.gov/publications/detail/sp/800-162/final
- OWASP Foundation. "OWASP Top Ten - A01:2021 Broken Access Control." https://owasp.org/Top10/A01_2021-Broken_Access_Control/
- Sandhu, R., Coyne, E., Feinstein, H., and Youman, C. "Role-Based Access Control Models." IEEE Computer, Vol. 29, No. 2, 1996.
- IETF. "The OAuth 2.0 Authorization Framework." RFC 6749. https://datatracker.ietf.org/doc/html/rfc6749
- NIST. "Zero Trust Architecture." NIST Special Publication 800-207. https://csrc.nist.gov/publications/detail/sp/800-207/final
- Ferraiolo, D. and Kuhn, R. "Role-Based Access Controls." 15th National Computer Security Conference, 1992.
