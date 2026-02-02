# Deployment Diagram

A deployment diagram is a structural diagram in the Unified Modeling Language (UML) that visualizes how software components are physically distributed across hardware infrastructure. It bridges the gap between software architecture and physical infrastructure, showing where your application's pieces actually run in production environments.

## Purpose and Value

Deployment diagrams serve as the blueprint for how your system operates in the real world. While other UML diagrams focus on logical structure or behavior, deployment diagrams answer the critical question: "Where does everything actually run?"

**Key purposes include:**

- Documenting the physical topology of distributed systems
- Planning infrastructure requirements before deployment
- Communicating architecture decisions to operations teams
- Identifying potential single points of failure
- Supporting capacity planning and scaling decisions
- Facilitating troubleshooting by mapping components to machines

## Core Elements

Deployment diagrams use a specific set of notation elements to represent physical and logical entities:

| Element | Symbol | Description |
|---------|--------|-------------|
| Node | 3D box (cube) | A computational resource that can host artifacts—either hardware (server, device) or software environment (VM, container, runtime) |
| Artifact | Rectangle with «artifact» | A physical file or deployable unit such as JAR, WAR, executable, or configuration file |
| Component | Rectangle with component icon | A modular software unit that provides specific functionality |
| Association | Solid line | Physical connection or communication path between nodes |
| Dependency | Dashed arrow | Indicates one element relies on another |
| Deployment | Nested element or dashed arrow | Shows an artifact deployed on a node |

## Node Types

Nodes represent the execution environments where software runs. Understanding node types helps model systems accurately.

**Device Nodes (Hardware)**
- Physical servers and workstations
- Mobile devices and IoT hardware
- Network appliances and load balancers
- Storage systems

**Execution Environment Nodes (Software)**
- Operating systems
- Virtual machines
- Containers (Docker, Kubernetes pods)
- Application servers (Tomcat, JBoss)
- Web servers (Nginx, Apache)
- Database management systems

Nodes can be nested to show containment. For example, a physical server contains a VM, which contains a container, which contains an application server.

## Artifacts and Deployment

Artifacts represent the tangible, deployable files that make up your system:

- **Executable files**: Binaries, scripts, compiled applications
- **Libraries**: Shared libraries, dependency JARs
- **Configuration files**: Properties files, YAML configurations
- **Data files**: Database schemas, seed data
- **Documentation**: Deployed API specs, runbooks

The deployment relationship shows which artifacts reside on which nodes. This is typically represented by nesting the artifact inside the node or using a «deploy» stereotyped dependency arrow.

## Communication Paths

Associations between nodes represent physical or network connections. These paths should include relevant details:

- **Protocol**: HTTP, HTTPS, TCP, gRPC, AMQP
- **Port numbers**: 443, 8080, 5432
- **Connection characteristics**: Encrypted, load-balanced, failover

| Connection Type | Common Uses | Considerations |
|----------------|-------------|----------------|
| LAN | Internal service communication | Low latency, high bandwidth |
| WAN | Cross-datacenter replication | Higher latency, potential instability |
| Internet | Client-facing endpoints | Security, CDN integration |
| VPN | Secure remote access | Encryption overhead |

## Abstraction Levels

Deployment diagrams can be created at different levels of detail depending on the audience and purpose:

**High-Level Overview**
- Shows major infrastructure zones (cloud regions, data centers)
- Groups related nodes into packages
- Focuses on external communication patterns
- Suitable for executive presentations and initial planning

**System-Level View**
- Depicts individual servers and their roles
- Shows load balancers, databases, caches
- Illustrates redundancy and failover paths
- Appropriate for architecture reviews

**Detailed Deployment**
- Specifies exact artifact locations
- Includes configuration file placements
- Shows port mappings and environment variables
- Used for operations runbooks and deployment automation

## Modern Infrastructure Patterns

Contemporary deployment diagrams must accommodate cloud-native and distributed architectures:

**Containerized Deployments**
- Kubernetes clusters as node containers
- Pods containing multiple related containers
- Services and ingress controllers as communication endpoints
- Persistent volumes for stateful workloads

**Serverless Architectures**
- Function-as-a-Service platforms as execution environments
- API gateways as entry points
- Managed services (databases, queues) as external nodes
- Event sources and triggers as associations

**Hybrid Cloud**
- On-premises nodes alongside cloud regions
- VPN or dedicated connections between environments
- Data residency boundaries clearly marked
- Disaster recovery sites

## Best Practices

**Keep diagrams focused.** A single deployment diagram should address one deployment scenario or environment. Create separate diagrams for development, staging, and production if they differ significantly.

**Show what matters.** Include security boundaries, redundancy mechanisms, and scaling dimensions. Omit trivial details that obscure the important architectural decisions.

**Use consistent notation.** Establish conventions for node stereotypes, color coding (if used), and labeling. Document these conventions for your team.

**Version your diagrams.** Treat deployment diagrams as living documentation. Store them in version control alongside infrastructure-as-code.

**Validate against reality.** Periodically compare deployment diagrams to actual infrastructure. Automated infrastructure discovery tools can help identify drift.

## Common Mistakes to Avoid

| Mistake | Problem | Solution |
|---------|---------|----------|
| Mixing logical and physical views | Confuses audience, conflates concerns | Use separate component and deployment diagrams |
| Omitting communication details | Leaves ambiguity about integration | Annotate paths with protocols and ports |
| Static snapshots only | Fails to show scaling or failover | Create diagrams for different operational states |
| Over-detailed diagrams | Becomes unreadable | Use multiple diagrams at different abstraction levels |
| Ignoring security boundaries | Misses critical architecture constraints | Explicitly show firewalls, VPCs, network segments |

## Relationship to Other UML Diagrams

Deployment diagrams complement other architectural views:

- **Component diagrams** show logical software structure; deployment diagrams show where those components run
- **Package diagrams** organize code modules; deployment diagrams organize runtime artifacts
- **Sequence diagrams** show message flows; deployment diagrams show the infrastructure those messages traverse
- **Use case diagrams** identify system boundaries; deployment diagrams show physical system boundaries

## When to Create Deployment Diagrams

**During initial architecture**: Sketch high-level deployment topology before building to validate infrastructure assumptions.

**Before production releases**: Document the target deployment state to guide operations teams.

**When troubleshooting**: Visualize the actual deployment to identify where failures might occur.

**For compliance**: Demonstrate to auditors where data resides and how systems are isolated.

**During migration**: Compare current-state and future-state deployments to plan transitions.

## Summary

Deployment diagrams are essential tools for technology professionals who need to bridge the gap between software development and operations. They provide a standardized way to document, communicate, and plan how software systems are deployed on physical and virtual infrastructure. By mastering deployment diagram notation and best practices, you can create clear, accurate representations of your system's physical architecture that serve development, operations, and stakeholder communication needs.
