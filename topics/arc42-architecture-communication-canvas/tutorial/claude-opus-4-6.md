# Arc42 Architecture Communication Canvas (ACC)

The Arc42 Architecture Communication Canvas (ACC) is a structured one-page tool for documenting and communicating the essential aspects of a software architecture. Developed as part of the arc42 ecosystem by Dr. Gernot Starke and collaborators, it provides teams with a shared, concise format for capturing what matters most about a system. Rather than requiring lengthy architectural documents that few people read, the ACC distills architecture knowledge into a single visual page that stakeholders at every level can understand, discuss, and act on. It bridges the gap between high-level business concerns and technical implementation details, making it one of the most practical artifacts in modern software architecture practice.

## Purpose and Motivation

Traditional architecture documentation often suffers from two extremes: either it is too sparse to be useful, or it is so voluminous that nobody reads it. The ACC addresses this by constraining documentation to exactly one page, forcing teams to prioritize ruthlessly. This constraint is a feature, not a limitation. By requiring teams to select only the most essential information, the canvas surfaces what truly matters about a system and discards noise.

The ACC serves multiple purposes simultaneously. It acts as a discovery tool when onboarding new team members or auditing existing systems. It functions as a planning artifact when kicking off new projects or major refactoring efforts. It works as a communication device when presenting architecture to management, clients, or cross-functional teams. This versatility makes it a staple in organizations practicing iterative and agile architecture.

## The Nine Sections of the Canvas

The ACC organizes architecture knowledge into nine interconnected sections. Each section addresses a specific dimension of the system, and together they form a holistic view of the architecture.

| Section | Purpose | Key Questions Answered |
|---|---|---|
| Value Proposition | Defines the system's core business case and economic drivers | Why does this system exist? What value does it deliver? |
| Key Stakeholders | Identifies who receives value, who pays, and who contributes | Who cares about this system and why? |
| Core Functions | Captures the most important features, use cases, and processes | What does the system actually do? |
| Quality Requirements | Addresses non-functional goals | How fast, reliable, secure, and scalable must it be? |
| Business Context | Maps external interfaces and neighbouring systems | What does the system interact with? |
| Components and Modules | Describes the major building blocks | How is the system structured internally? |
| Technologies | Records languages, frameworks, databases, and infrastructure | What is the system built with? |
| Core Decisions | Documents significant architectural choices | What key decisions shaped the system? |
| Risks and Missing Information | Surfaces known problems and knowledge gaps | What could go wrong or is already going wrong? |

## Value Proposition

The Value Proposition section anchors the entire canvas. It answers the fundamental question of why the system exists and what economic or organizational value it delivers. This is not a feature list; it is a concise statement of the business case. A well-written value proposition might state that the system reduces order processing time by 60%, or that it enables the company to enter a new market segment. Without a clear value proposition, architectural decisions lack a compass, and teams risk optimizing for the wrong outcomes.

## Key Stakeholders

Identifying stakeholders goes beyond listing names and titles. The ACC asks teams to categorize stakeholders by their relationship to the system:

- **Value receivers**: End users, customers, or business units that benefit from the system's capabilities
- **Sponsors**: Individuals or groups who fund development and maintenance
- **Contributors**: Developers, architects, operations staff, and external partners who build and run the system
- **Influencers**: Regulators, security officers, enterprise architects, or standards bodies that impose constraints

Understanding these roles clarifies whose concerns drive architectural trade-offs. A system serving primarily internal operations staff will have different quality priorities than one serving millions of external consumers.

## Core Functions

This section captures the most important features, use cases, and supported business processes. The key word is "most important." Teams should list no more than five to seven core functions. If everything is critical, nothing is. Core functions should be described in business language that stakeholders outside the development team can understand.

## Quality Requirements

Quality requirements, often called non-functional requirements, define how well the system must perform its core functions. The ACC encourages teams to be specific and measurable rather than vague.

| Quality Attribute | Weak Specification | Strong Specification |
|---|---|---|
| Performance | The system should be fast | 95th percentile response time under 200ms for search queries |
| Availability | The system should be highly available | 99.95% uptime measured monthly, excluding planned maintenance |
| Scalability | The system should scale | Must handle 10x current load within 30 minutes of horizontal scaling |
| Security | The system should be secure | All data encrypted at rest (AES-256) and in transit (TLS 1.3) |
| Usability | The system should be easy to use | New users complete core workflow within 5 minutes without training |

Specific, measurable quality requirements enable meaningful architectural trade-off discussions and provide clear targets for validation.

## Business Context

The Business Context section maps the system's external boundaries. It identifies:

- **External actors**: Users, administrators, and other human roles that interact with the system
- **Neighbouring systems**: Upstream and downstream systems that exchange data or trigger processes
- **External interfaces**: APIs, file exchanges, message queues, and other integration points
- **Third-party services**: Payment processors, identity providers, cloud services, and other external dependencies

This section is critical for understanding the system's operational environment and identifying integration risks. Systems rarely exist in isolation, and the business context makes dependencies explicit.

## Components and Modules

This section describes the major building blocks of the system without descending into implementation details. It covers subsystems, services, packages, or modules at a level of granularity appropriate for a one-page overview. The goal is to convey the system's internal structure in broad strokes: which major parts exist, what responsibilities they hold, and how they relate to one another. For a microservices architecture, this might list the key services and their domains. For a monolith, it might describe the major modules or layers.

## Technologies

The Technologies section records the concrete technology choices that underpin the system:

- **Programming languages and frameworks**: The primary languages and their ecosystems
- **Data stores**: Databases, caches, search engines, and file storage systems
- **Infrastructure**: Cloud providers, container orchestration, networking, and deployment platforms
- **Operational tooling**: Monitoring, logging, CI/CD pipelines, and incident management tools

This section provides immediate orientation for new team members and serves as a reference point for technology lifecycle management. It also highlights technology diversity, which can be a strength or a risk depending on the organization's capacity to support multiple stacks.

## Core Decisions

Architectural decisions are among the most valuable pieces of knowledge a team possesses, yet they are frequently lost. The ACC dedicates a section to the most significant choices that shaped the system. Each decision should capture what was decided and, briefly, why. The canvas explicitly encourages teams to document both successful decisions and problematic ones. A decision that seemed right three years ago may now be a source of technical debt, and acknowledging this openly is the first step toward addressing it.

## Risks and Missing Information

The final section is deliberately provocative. It asks teams to surface what they do not know, what worries them, and what prevents them from delivering value faster. This section often reveals the most actionable insights on the entire canvas. Common entries include:

- Known technical debt that increases the cost of change
- Missing or outdated documentation for critical subsystems
- Single points of failure in infrastructure or team knowledge
- Regulatory or compliance gaps that have not been addressed
- Dependencies on systems or teams with unclear ownership

By making risks and unknowns explicit, teams create a shared understanding of where attention is most needed. This transparency is often uncomfortable but consistently valuable.

## How to Use the ACC in Practice

The ACC works best as a collaborative workshop artifact rather than a document filled out by a single architect in isolation. A typical workshop follows this pattern:

1. **Assemble the right people**: Include architects, developers, product owners, and at least one business stakeholder. Cross-functional participation surfaces assumptions that a homogeneous group would miss.
2. **Time-box the session**: Allocate 60 to 90 minutes. The constraint forces prioritization.
3. **Fill sections collaboratively**: Work through each section as a group, using sticky notes or a shared digital board. Encourage disagreement; conflicting views indicate areas where alignment is most needed.
4. **Review and refine**: After the initial pass, review the canvas as a whole. Look for inconsistencies between sections, such as quality requirements that the chosen technologies cannot satisfy.
5. **Keep it alive**: Revisit the canvas periodically, especially after major releases, incidents, or strategic shifts. A stale canvas is worse than no canvas.

The ACC is particularly effective during architecture reviews, system handovers, due diligence for acquisitions, and onboarding of new architects or technical leads.

## Benefits and Limitations

| Aspect | Benefit | Limitation |
|---|---|---|
| Scope | Forces focus on essentials | Cannot capture full architectural detail |
| Audience | Accessible to technical and non-technical stakeholders | May oversimplify for deeply technical discussions |
| Effort | Quick to create and update | Requires discipline to keep current |
| Collaboration | Excellent workshop format | Quality depends on participant engagement |
| Standardization | Consistent structure across projects | May not fit every organizational context without adaptation |

The ACC is not a replacement for detailed architecture documentation such as arc42's full template, architecture decision records (ADRs), or operational runbooks. It is a complement that provides a high-level entry point into a system's architecture, from which stakeholders can drill into more detailed artifacts as needed.

## Related

Teams working with the ACC should explore the broader arc42 ecosystem, including the full arc42 template for comprehensive architecture documentation. The Arc42 Architecture Inception Canvas (AIC) is a closely related tool focused on the early stages of system design. Architecture Decision Records (ADRs) provide a structured format for documenting individual decisions referenced in the Core Decisions section. The C4 model by Simon Brown offers a complementary approach to visualizing software architecture at multiple levels of abstraction. Stakeholder analysis techniques from requirements engineering deepen the Key Stakeholders section. Quality attribute workshops, such as the Software Engineering Institute's QAW method, provide structured approaches to eliciting and prioritizing the quality requirements that the ACC captures.

## Summary

The Arc42 Architecture Communication Canvas is a pragmatic, one-page tool that distills the essential dimensions of a software architecture into nine interconnected sections. By constraining teams to a single page, it forces prioritization, exposes assumptions, and creates a shared language between technical and business stakeholders. Its greatest strength lies not in the document it produces but in the conversations it provokes, particularly around risks, missing information, and conflicting priorities. Used as a living artifact in collaborative workshops, the ACC helps organizations maintain architectural clarity without the overhead of heavyweight documentation, making it an indispensable tool for architects, technical leads, and anyone responsible for communicating how and why a system is built the way it is.

## References

- Starke, G. and Hruschka, P. "arc42: The Template for Effective Software Architecture Documentation." Available at https://arc42.org
- Starke, G. "Arc42 Architecture Communication Canvas." Available at https://canvas.arc42.org
- Starke, G. *Effective Software Architectures: A Practical Guide*. Leanpub, updated regularly.
- International Organization for Standardization. ISO/IEC 25010:2023, "Systems and Software Quality Requirements and Evaluation (SQuaRE)."
- Brown, S. "The C4 Model for Visualising Software Architecture." Available at https://c4model.com
- Keeling, M. *Design It! From Programmer to Software Architect*. Pragmatic Bookshelf, 2017.
