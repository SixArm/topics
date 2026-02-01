# Authorization

## What Is Authorization?

Authorization is the process of determining whether a user, system, or application has the necessary permissions to access a specific resource or perform a particular action. It answers the fundamental question: "What are you allowed to do?"

Authorization operates after authentication (identity verification) and before access is granted. While authentication confirms who you are, authorization defines what you can do with that identity. These two processes work together but serve distinct purposes in a security framework.

## Authorization vs. Authentication

| Aspect | Authentication | Authorization |
|--------|---------------|---------------|
| **Purpose** | Verifies identity | Grants or denies access |
| **Question Answered** | "Who are you?" | "What can you do?" |
| **Timing** | Occurs first | Occurs after authentication |
| **Methods** | Passwords, biometrics, tokens, certificates | Permissions, roles, policies, attributes |
| **Failure Result** | Login denied | Access denied to specific resource |
| **Data Used** | Credentials | Access control rules |

## Core Authorization Models

### Role-Based Access Control (RBAC)

RBAC assigns permissions to roles rather than individual users. Users are then assigned to roles that match their job functions.

**Key characteristics:**
- Permissions grouped into roles (Admin, Editor, Viewer)
- Users inherit all permissions of their assigned roles
- Simplifies management at scale
- Well-suited for organizations with clear hierarchies

**Best for:** Enterprise environments, applications with well-defined user categories, compliance-driven industries.

### Attribute-Based Access Control (ABAC)

ABAC evaluates multiple attributes to make access decisions. Attributes can include user characteristics, resource properties, environmental conditions, and action types.

**Key characteristics:**
- Highly granular control
- Dynamic decisions based on context
- Supports complex policies
- Evaluates conditions at runtime

**Example attributes:**
- User department, clearance level, location
- Resource sensitivity, classification, owner
- Time of day, IP address, device type

**Best for:** Complex environments, cross-organizational access, dynamic security requirements.

### Discretionary Access Control (DAC)

DAC allows resource owners to control access to their own resources. The owner decides who can access what.

**Key characteristics:**
- Owner-centric control
- Flexible but harder to audit
- Common in file systems

**Best for:** Personal devices, collaborative environments, user-managed content.

### Mandatory Access Control (MAC)

MAC enforces access based on security labels and clearances defined by a central authority. Users cannot override these controls.

**Key characteristics:**
- System-enforced policies
- Labels on subjects and objects
- No owner discretion
- Highest security environments

**Best for:** Military, government, highly regulated industries.

## Comparison of Authorization Models

| Model | Control Type | Granularity | Flexibility | Management Overhead |
|-------|-------------|-------------|-------------|---------------------|
| RBAC | Role-based | Medium | Medium | Low |
| ABAC | Attribute-based | High | High | Medium-High |
| DAC | Owner-based | Variable | High | Low |
| MAC | Label-based | High | Low | High |

## Implementation Mechanisms

### Access Control Lists (ACLs)

ACLs define which principals (users/groups) can perform which actions on specific resources. Each resource maintains a list of permitted operations per identity.

### Capability-Based Security

Instead of attaching permissions to resources, capabilities grant tokens to subjects that authorize specific actions. The token itself proves authorization.

### Policy Engines

Centralized policy engines (such as Open Policy Agent) evaluate access requests against defined policies, separating authorization logic from application code.

### Claims and Tokens

Modern systems often use tokens (JWT, OAuth tokens) containing claims about the user. Applications inspect these claims to make authorization decisions.

## Authorization in Distributed Systems

Distributed architectures introduce additional authorization challenges:

- **Service-to-service authorization:** APIs must verify that calling services have appropriate permissions
- **Token propagation:** User context must flow through service chains
- **Centralized vs. decentralized enforcement:** Trade-offs between consistency and latency
- **API gateways:** Often handle initial authorization checks before routing requests

## Best Practices

**Principle of Least Privilege:** Grant only the minimum permissions necessary for a task. Review and revoke permissions when no longer needed.

**Separation of Duties:** Divide critical functions among multiple roles to prevent fraud and errors.

**Defense in Depth:** Implement authorization at multiple layers (network, application, data) rather than relying on a single enforcement point.

**Audit and Logging:** Record all authorization decisions for compliance, forensics, and anomaly detection.

**Regular Access Reviews:** Periodically review who has access to what, removing stale permissions and validating current needs.

**Externalize Authorization Logic:** Separate authorization decisions from business logic to enable consistent enforcement and easier updates.

## Common Authorization Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Allow by default** | Permit unless explicitly denied | Low-security, user-friendly systems |
| **Deny by default** | Block unless explicitly permitted | High-security, sensitive systems |
| **Hierarchical roles** | Roles inherit from parent roles | Enterprise with management levels |
| **Resource ownership** | Owners control their resources | Multi-tenant applications |
| **Time-based access** | Permissions valid only during windows | Shift workers, temporary contractors |

## Authorization Failures and Risks

When authorization is improperly implemented, systems become vulnerable to:

- **Privilege escalation:** Users gain higher permissions than intended
- **Insecure direct object references:** Accessing resources by manipulating identifiers
- **Missing function-level access control:** Administrative functions exposed to regular users
- **Broken access control:** OWASP Top 10 consistently ranks this as a critical risk

## Summary

Authorization is fundamental to securing systems and data. It determines what authenticated entities can do, enforcing organizational policies and protecting sensitive resources. Selecting the right authorization model—whether RBAC, ABAC, DAC, or MAC—depends on your security requirements, operational complexity, and compliance obligations. Effective authorization combines the right model with proper implementation, regular audits, and adherence to security principles like least privilege and defense in depth.
