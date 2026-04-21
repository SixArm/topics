# Definition of Customer (DoC)

The Definition of Customer (DoC) is a foundational concept in product development and project management that clarifies who the customer truly is within a given context. In technology organizations, the customer is the person or entity that pays for the system, owns the business requirements, and ultimately decides whether a product is a success. While this role is often conflated with the end user, the distinction is critical for teams that want to build products delivering genuine business value. A clear Definition of Customer aligns stakeholders, focuses priorities, and prevents teams from optimizing for the wrong audience.

## Why the Definition of Customer Matters

Without a precise Definition of Customer, teams risk building software that satisfies neither the buyer nor the user. When engineering teams assume that whoever touches the product daily is the customer, they may overweight usability features at the expense of business outcomes like ROI, compliance, or competitive positioning. Conversely, teams that focus exclusively on executive buyers may ship products that are powerful on paper but unusable in practice. The DoC forces explicit acknowledgment of who authorizes the work, who funds it, and who determines success.

## The Customer Role in Detail

The customer acts simultaneously in several capacities:

- **Buyer**: Provides funding, allocates budget, and commits organizational resources to the initiative.
- **Decision Maker**: Has the final say on whether a feature is valuable enough to build, and can reprioritize or cancel work.
- **Visionary**: Defines overarching business goals, articulates the reason the project exists, and sets the strategic direction.
- **Acceptor**: Officially accepts or rejects completed work as meeting business requirements.

In practice, the customer is often a senior stakeholder such as a CEO, department head, or business sponsor. Because such individuals rarely have time to attend daily standups or sprint reviews, they typically operate through a proxy, most commonly a Product Owner who translates business vision into a prioritized backlog.

## Customer vs. End User

The distinction between customer and end user is one of the most consequential clarifications a team can make. Consider a hospital administrator purchasing a new patient portal: the administrator is the customer, while the nurses and doctors using the portal daily are the end users.

| Dimension | Customer | End User |
|-----------|----------|----------|
| Primary concern | Return on investment, competitive advantage, compliance | Ease of use, speed, task completion |
| Relationship to funding | Authorizes and provides budget | Typically has no budget authority |
| Success criteria | Business outcomes achieved | Daily workflows supported |
| Participation in development | Sprint reviews, showcases, acceptance decisions | Usability testing, feedback sessions |
| Proxy in agile teams | Product Owner | UX researcher or user advocate |
| Example (healthcare) | Hospital administrator buying the system | Nurses and doctors using the system |

Conflating these roles leads to building software that satisfies neither party well. A mature organization explicitly names both roles and ensures each has a voice in the development process through appropriate channels.

## The Customer in the Software Development Lifecycle

In agile and iterative development approaches, the customer's involvement follows a structured pattern:

- **Vision and chartering**: The customer defines the business case, success metrics, and high-level requirements before development begins.
- **Backlog governance**: Through the Product Owner proxy, the customer's priorities drive what gets built and in what order.
- **Feedback loops**: Customers participate in demonstrations, weekly showcases, or ongoing research deployments where they see working software and provide direction.
- **Acceptance**: Only the customer or their authorized proxy can officially accept a completed user story as meeting the business requirement.
- **Value realization**: After delivery, the customer measures whether the anticipated business value has been achieved.

This cadence ensures that development remains anchored to business outcomes rather than drifting toward technical elegance or feature accumulation for its own sake.

## Common Pitfalls

Teams frequently struggle with the Definition of Customer in several predictable ways:

- **Absent customer**: The funding stakeholder is too busy to engage, and no proxy is empowered to make decisions, leading to stalled backlogs and rework.
- **Multiple customers**: Several executives each claim authority over the product, creating conflicting priorities that paralyze the team.
- **Customer-user conflation**: The team treats the loudest user as the customer, optimizing for individual convenience rather than organizational value.
- **Proxy without authority**: A Product Owner is named but lacks the mandate to make binding decisions, resulting in every choice escalating upward.
- **Customer drift**: The original sponsor leaves the organization and no successor is identified, leaving the team building toward an outdated vision.

Addressing these pitfalls requires explicit governance: name the customer, document their authority, empower the proxy, and revisit the assignment when organizational changes occur.

## Establishing a Clear Definition of Customer

To operationalize the DoC within a team or organization:

- Identify and name the specific individual or role that funds the initiative and bears accountability for its business outcomes.
- Document the customer's decision-making authority and the boundaries of their proxy's mandate.
- Establish a regular cadence for customer engagement, whether through sprint reviews, monthly steering committees, or asynchronous acceptance workflows.
- Separate customer feedback channels from end-user feedback channels so that both voices inform development without overriding each other.
- Revisit the Definition of Customer at major project milestones, organizational restructurings, or whenever decision-making becomes ambiguous.

## Related

Teams working with the Definition of Customer should also explore the Definition of User (DoU) to understand end-user personas and needs, the Definition of Done (DoD) for completion criteria, stakeholder mapping techniques for complex organizations, the Product Owner role in Scrum and its relationship to customer proxy authority, and jobs-to-be-done frameworks for connecting customer goals to product features. Understanding value stream mapping can further clarify how customer value flows through development processes.

## Summary

The Definition of Customer establishes who pays for, authorizes, and ultimately judges the success of a product or initiative. By explicitly distinguishing the customer from the end user, teams can make informed tradeoffs between business value and usability, empower appropriate proxies, and maintain alignment with the strategic vision that justifies the work. A well-understood DoC prevents the common failures of absent authority, conflicting priorities, and misdirected optimization, ensuring that development effort translates into genuine business outcomes.

## References

- Schwaber, K. and Sutherland, J. "The Scrum Guide." Scrum.org, 2020. https://scrumguides.org/
- Cohn, M. "User Stories Applied: For Agile Software Development." Addison-Wesley, 2004.
- Osterwalder, A. et al. "Value Proposition Design." Wiley, 2014.
- Gothelf, J. and Seiden, J. "Lean UX: Designing Great Products with Agile Teams." O'Reilly Media, 2016.
- Patton, J. "User Story Mapping: Discover the Whole Story, Build the Right Product." O'Reilly Media, 2014.
- Project Management Institute. "A Guide to the Project Management Body of Knowledge (PMBOK Guide)." 7th Edition, 2021.
