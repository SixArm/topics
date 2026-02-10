# Conway's law

Conway's law is a foundational principle in software engineering, first articulated by computer scientist Melvin Conway in 1968. It states: "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations." In practice, this means the architecture of any software system will inevitably mirror the social and communication boundaries of the team that built it. Understanding Conway's law is essential for technology professionals because it reveals that technical decisions and organizational decisions are deeply intertwined, and that solving architectural problems often requires solving organizational problems first.

## Origins and core statement

Melvin Conway submitted his original paper, "How Do Committees Invent?", to the Harvard Business Review in 1968. The paper argued that a system's design is a direct reflection of the organization's communication structure. The observation was later popularized and named "Conway's law" by Fred Brooks in his influential 1975 book, *The Mythical Man-Month*. Conway's insight was not a scientific law in the formal sense but rather a sociological observation backed by decades of empirical evidence across industries.

The core claim is straightforward: if you have four teams working on a compiler, you will get a four-pass compiler. If a front-end team and a back-end team communicate only through API specifications, the resulting system will be a front-end and a back-end connected by an API. The organizational seams become the architectural seams.

## Why Conway's law matters

Conway's law matters because it means that architecture is not a purely technical decision. Organizations that ignore this principle often find themselves fighting their own structure when trying to adopt new architectures, refactor legacy systems, or scale engineering teams. Specifically:

- **Architectural outcomes are constrained by team topology.** A monolithic organization tends to produce monolithic software, regardless of stated architectural goals.
- **Communication overhead shapes module boundaries.** Teams that communicate frequently produce tightly integrated components; teams that communicate rarely produce loosely coupled or disconnected components.
- **Reorganization changes architecture.** When companies restructure teams, the software architecture tends to drift toward the new communication patterns, whether intentionally or not.
- **Cross-functional collaboration reduces silos.** Teams that span disciplines (design, engineering, operations) tend to produce systems with better integration across those concerns.

## Real-world examples

| Scenario | Organizational structure | Resulting system architecture |
|---|---|---|
| Large enterprise with separate front-end, back-end, and database teams | Three siloed teams communicating through formal handoffs | Three-tier architecture with rigid layer boundaries and thick API contracts |
| Startup with a single cross-functional product team | One team with shared ownership and constant communication | Tightly integrated monolith or well-coordinated service |
| Company with geographically distributed teams (US, EU, Asia) | Teams separated by time zones with asynchronous communication | Independent services or modules aligned to regional team ownership |
| Organization adopting microservices without restructuring | Traditional functional departments (QA, Dev, Ops) | Microservices in name only; a "distributed monolith" with high coupling between services |

The last example is particularly instructive. Many organizations attempt to adopt microservices architecture while retaining a traditional organizational structure. Conway's law predicts that this mismatch will produce a system that has the operational complexity of microservices without the autonomy and loose coupling that make microservices beneficial.

## The inverse Conway maneuver

The "inverse Conway maneuver" (sometimes called the "reverse Conway maneuver") is a deliberate strategy in which an organization restructures its teams to match a desired architecture, rather than allowing the architecture to emerge from the existing structure. The term was popularized by Thoughtworks and is now a widely recognized technique in software architecture.

The approach works as follows:

- **Define the desired architecture first.** Determine the target system design, including service boundaries, communication patterns, and ownership domains.
- **Restructure teams to match.** Organize teams so that each team owns a well-defined architectural component or domain. Team boundaries should align with service or module boundaries.
- **Ensure team autonomy.** Each team should be able to design, develop, test, and deploy its component independently, minimizing cross-team coordination.
- **Iterate and adjust.** As the architecture evolves, adjust team structures accordingly.

This technique is central to the "Team Topologies" framework developed by Matthew Skelton and Manuel Pais, which provides a systematic vocabulary for organizing teams in alignment with Conway's law.

## Conway's law and team topologies

The Team Topologies framework identifies four fundamental team types, each designed to produce specific architectural outcomes consistent with Conway's law:

| Team type | Purpose | Architectural effect |
|---|---|---|
| Stream-aligned team | Delivers value along a single stream of work (e.g., a product feature or user journey) | Produces end-to-end slices of the system aligned to business capability |
| Platform team | Provides internal services and tooling that stream-aligned teams consume | Produces shared infrastructure, APIs, and developer experience layers |
| Enabling team | Helps other teams adopt new practices, technologies, or approaches | Accelerates architectural evolution by reducing skill gaps |
| Complicated-subsystem team | Owns a component requiring deep specialist knowledge | Isolates complex subsystems behind clear interfaces |

By deliberately choosing team types and interaction modes, organizations can shape their architecture proactively rather than reactively.

## Conway's law and organizational culture

Conway's law highlights that organizational culture has a direct impact on software quality and maintainability. The relationship works in both directions:

- **Collaborative cultures produce coherent systems.** When teams share context, communicate openly, and have shared goals, the resulting systems tend to be well-integrated, consistent, and easier to maintain.
- **Siloed cultures produce fragmented systems.** When teams operate in isolation, protect territory, or communicate primarily through formal channels, the resulting systems tend to have duplication, inconsistent interfaces, and integration gaps.
- **Hierarchical cultures produce hierarchical architectures.** Organizations with deep management hierarchies and approval chains tend to produce systems with deep call stacks, layered abstractions, and centralized control points.
- **Trust-based cultures enable distributed architectures.** Organizations that trust teams to make autonomous decisions tend to produce genuinely decoupled, independently deployable services.

Changing architecture without changing culture is difficult and often fails. Technology leaders who want to evolve their systems must also invest in evolving communication patterns, decision-making authority, and team interactions.

## Common misconceptions

Several misconceptions about Conway's law are worth addressing:

- **It is not a prescription.** Conway's law describes a tendency, not a requirement. It does not say organizations *should* design systems to match their communication structure; it says they *will* unless they actively intervene.
- **It is not limited to software.** Conway's original observation applies to any system designed by an organization, including hardware, processes, and documents.
- **It does not mean all organizational structures are bad.** Some organizational structures naturally produce good architectures. The key insight is awareness: understanding the link between structure and design gives leaders the ability to intervene deliberately.
- **It is not an excuse for poor architecture.** Blaming Conway's law for architectural problems without taking action to address organizational misalignment is a misuse of the principle.

## Practical recommendations

Technology professionals can apply Conway's law constructively by following these guidelines:

- **Audit the alignment between team structure and system architecture.** Map current team boundaries against module or service boundaries. Identify mismatches where architectural ownership is unclear or split across teams.
- **Use the inverse Conway maneuver when adopting new architectures.** Before migrating to microservices, event-driven architecture, or any other paradigm, design the target team structure alongside the target system structure.
- **Minimize cross-team dependencies.** Reduce the number of services or components that require coordination between multiple teams. Each team should own its deployment pipeline and release cadence.
- **Invest in communication infrastructure.** APIs, documentation standards, shared libraries, and platform teams are organizational communication tools as much as technical ones.
- **Revisit team structures regularly.** As products and architectures evolve, team structures should evolve with them. Stale team boundaries produce stale architectural boundaries.

## Related

Technology professionals interested in Conway's law should explore team topologies and the inverse Conway maneuver for practical application, microservices architecture and domain-driven design for understanding how service boundaries align with organizational boundaries, organizational culture and change management for addressing the human factors that Conway's law describes, the Mythical Man-Month by Fred Brooks for the historical context in which Conway's law gained prominence, and DevOps and continuous delivery practices which often require organizational restructuring consistent with Conway's law.

## Summary

Conway's law states that software systems inevitably reflect the communication structures of the organizations that build them. This principle, first articulated by Melvin Conway in 1968, has been validated across decades of software engineering practice and remains one of the most powerful lenses for understanding why systems are shaped the way they are. Technology professionals who internalize Conway's law gain the ability to diagnose architectural problems as organizational problems, to design team structures that produce desired architectural outcomes through the inverse Conway maneuver, and to recognize that lasting technical change requires corresponding organizational change. Architecture and organization are not independent variables; they are two expressions of the same underlying structure.

## References

- Conway, Melvin E. "How Do Committees Invent?" *Datamation*, April 1968. Available at: http://www.melconway.com/Home/Committees_Paper.html
- Brooks, Fred P. *The Mythical Man-Month: Essays on Software Engineering*. Addison-Wesley, 1975.
- Skelton, Matthew, and Manuel Pais. *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution Press, 2019.
- Thoughtworks Technology Radar. "Inverse Conway Maneuver." https://www.thoughtworks.com/radar/techniques/inverse-conway-maneuver
- Newman, Sam. *Building Microservices: Designing Fine-Grained Systems*. O'Reilly Media, 2015.
- MacCormack, Alan, John Rusnak, and Carliss Baldwin. "Exploring the Duality between Product and Organizational Architectures." *Harvard Business School Working Paper*, 2008.
