Here is the tutorial:

# Agile definitions

Agile definitions are a set of formal agreements that agile teams use to create shared understanding about when work is ready, when work is complete, and what constitutes value. These definitions act as quality gates and alignment tools, ensuring that everyone on the team -- developers, testers, product owners, and stakeholders -- operates from the same expectations. Without these shared definitions, teams risk miscommunication, scope creep, inconsistent quality, and misaligned priorities. The five core agile definitions are Definition of Ready (DoR), Definition of Done (DoD), Definition of Value (DoV), Definition of Customer Value (DoCV), and Definition of Technical Value (DoTV).

## Definition of Ready (DoR)

The Definition of Ready establishes clear criteria for when a user story, feature, or work item is sufficiently prepared to enter a development sprint. It serves as a quality gate that prevents poorly defined work from entering the development cycle. By agreeing on what "ready" means, teams eliminate delays caused by unclear requirements, missing information, or unresolved dependencies.

Common criteria for a Definition of Ready include:

- **Acceptance criteria** are clearly written and testable
- **Business value** is articulated and understood by the team
- **Story sizing** or effort estimates have been completed
- **Design mockups** or technical specifications are available
- **Dependencies** have been identified and resolved
- **Research or spike work** has been completed beforehand

Teams must balance thoroughness with agility. An overly rigid Definition of Ready can slow delivery and contradict agile principles. The criteria should be regularly reviewed and adjusted based on team learning, ensuring it remains a helpful tool rather than a bureaucratic obstacle.

## Definition of Done (DoD)

The Definition of Done is a comprehensive checklist of criteria that must be fulfilled before any user story, feature, or increment can be considered truly finished. It eliminates ambiguity about work completion and ensures that all team members share the same expectations about what "done" means.

The Definition of Done typically encompasses multiple quality gates:

- **Code completion** with adherence to coding standards
- **Unit testing** with adequate coverage thresholds
- **Code review** completed and approved by peers
- **Integration testing** passed successfully
- **Documentation** updated to reflect changes
- **Acceptance criteria** fulfilled and verified
- **Performance benchmarks** met
- **Security and accessibility checks** passed
- **Deployment readiness** confirmed

Different levels of DoD may exist for individual tasks, user stories, sprints, or releases, with each level building upon the previous one. Teams should resist the temptation to bypass the DoD under pressure, as this compromises quality and accumulates technical debt.

## Definition of Value (DoV)

The Definition of Value captures the measurable benefit or worth that software features, functions, or deliverables provide to end users, customers, or the business. It serves as the primary criterion for prioritizing work and making decisions throughout the development process.

Value is assessed from multiple perspectives:

| Perspective | Focus Areas | Examples |
|---|---|---|
| Business Value | Revenue, cost, market position | Revenue generation, cost reduction, competitive advantage |
| User Value | Experience, functionality, problem-solving | Improved UX, enhanced capabilities, meeting user needs |
| Technical Value | Maintainability, scalability, performance | Reduced technical debt, improved architecture, faster builds |

In agile methodologies, value drives prioritization through techniques like user story mapping, value-based backlog management, and regular stakeholder feedback. Product owners and teams collaborate to rank features based on their potential value delivery, often using frameworks like the Kano model or value-versus-effort matrices to ensure the most valuable features are developed first.

## Definition of Customer Value (DoCV)

Customer value represents the measurable benefit that software features deliver to end users and stakeholders. It encompasses both tangible outcomes and intangible benefits:

- **Tangible outcomes**: increased efficiency, cost savings, revenue generation, faster task completion
- **Intangible benefits**: improved user experience, enhanced satisfaction, reduced frustration, increased confidence

Customer value is continuously assessed and refined through direct collaboration with users, regular feedback loops, and iterative delivery cycles. Teams focus on delivering working software that addresses real customer needs rather than simply meeting technical specifications.

The concept extends beyond individual features to encompass the overall user journey. Agile teams evaluate customer value through metrics including adoption rates, task completion efficiency, customer satisfaction scores, and user key performance indicators. Value is relative and contextual, varying based on user personas, market conditions, and organizational priorities.

## Definition of Technical Value (DoTV)

Technical value focuses on the internal quality attributes that enable a software system to evolve, scale, and perform over time. While customer value addresses the external perspective, technical value addresses the health and sustainability of the codebase and infrastructure.

Key dimensions of technical value include:

| Dimension | Description |
|---|---|
| Maintainability | How easily the codebase can be understood, modified, and extended |
| Scalability | The system's ability to handle growth in users, data, or transactions |
| Performance | Response times, throughput, and resource efficiency |
| Reliability | System uptime, fault tolerance, and recovery capabilities |
| Security posture | Resistance to vulnerabilities and compliance with standards |
| Technical debt reduction | Paying down accumulated shortcuts and design compromises |

Technical value often requires deliberate investment that does not produce immediately visible customer-facing features. Agile teams must advocate for this investment by making technical value visible through backlog items, sprint goals, and stakeholder communication.

## How the Definitions Work Together

The five agile definitions form a connected system. The Definition of Ready governs what enters the development process. The Definition of Done governs what exits. The Definition of Value, along with its customer and technical subdivisions, governs how work is prioritized and how outcomes are measured.

| Definition | Purpose | When Applied |
|---|---|---|
| Definition of Ready | Ensures work is prepared for development | Before sprint planning |
| Definition of Done | Ensures work meets quality standards | During and after development |
| Definition of Value | Guides prioritization across all value types | Backlog refinement and planning |
| Definition of Customer Value | Measures external benefit to users | Feature prioritization and review |
| Definition of Technical Value | Measures internal system health | Architecture decisions and debt management |

When applied consistently, these definitions create a feedback loop: value definitions inform what gets prioritized, readiness definitions ensure those priorities are actionable, and done definitions confirm that the delivered work meets agreed standards.

## Practical Adoption Guidelines

Adopting agile definitions effectively requires deliberate effort and ongoing refinement:

- **Collaborate on creation**: All team members, including developers, testers, product owners, and stakeholders, should participate in defining each definition. Top-down imposition undermines buy-in.
- **Keep definitions visible**: Post them in team workspaces, link them in project management tools, and reference them in ceremonies.
- **Review regularly**: Inspect and adapt definitions during retrospectives. As teams mature and contexts change, definitions should evolve.
- **Start simple**: Begin with a minimal set of criteria and expand as the team gains experience. Overly complex definitions create resistance.
- **Enforce consistently**: Definitions lose their power if teams routinely bypass them under deadline pressure. Consistency builds trust and quality.

## Related

Teams looking to deepen their understanding of agile definitions should explore the broader agile methodology landscape, including agile software development methodology, Scrum, extreme programming, and the agile manifesto and its principles. Complementary practices such as behavior-driven development, test-driven development, and continuous integration reinforce the quality gates established by definitions. For prioritization techniques that work alongside the Definition of Value, study objectives and key results (OKRs), the MoSCoW method, and value stream mapping. Understanding technical debt management, code quality metrics, and DORA metrics will strengthen the application of the Definition of Technical Value.

## Summary

Agile definitions provide the shared language and formal agreements that enable agile teams to operate with clarity and consistency. The Definition of Ready prevents ambiguity from entering the development cycle, the Definition of Done ensures quality standards are met before work is declared complete, and the Definitions of Value, Customer Value, and Technical Value guide prioritization by making benefit measurable from multiple perspectives. Together, these definitions transform agile from a set of abstract principles into a concrete, actionable framework where every team member understands what is expected, what is prioritized, and what constitutes success.

## References

- Beck, K. et al. (2001). *Manifesto for Agile Software Development*. https://agilemanifesto.org
- Schwaber, K. & Sutherland, J. (2020). *The Scrum Guide*. https://scrumguides.org
- Cohn, M. (2004). *User Stories Applied: For Agile Software Development*. Addison-Wesley.
- Rubin, K. S. (2012). *Essential Scrum: A Practical Guide to the Most Popular Agile Process*. Addison-Wesley.
- Cagan, M. (2018). *Inspired: How to Create Tech Products Customers Love* (2nd ed.). Wiley.
- Agile Alliance. "Definition of Done." https://www.agilealliance.org/glossary/definition-of-done/
- Agile Alliance. "Definition of Ready." https://www.agilealliance.org/glossary/definition-of-ready/
