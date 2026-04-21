# Agile vs Kanban

Agile and Kanban are two of the most widely adopted approaches to managing software development and knowledge work. While they share common values such as transparency, collaboration, and continuous improvement, they differ fundamentally in structure, cadence, and operational philosophy. Understanding their distinctions and complementary strengths is essential for any technology professional choosing a process framework or improving an existing one.

## Origins and Philosophy

Agile emerged from the software industry. In 2001, a group of practitioners published the Agile Manifesto, articulating four core values and twelve principles centered on iterative delivery, customer collaboration, and responsiveness to change. Agile is not a single methodology but an umbrella philosophy that encompasses frameworks such as Scrum, Extreme Programming (XP), and Lean Software Development.

Kanban originated in manufacturing. Taiichi Ohno developed the Kanban system at Toyota in the late 1940s to manage just-in-time production. David J. Anderson later adapted Kanban for knowledge work in the mid-2000s, formulating it as a method for evolutionary change management. Kanban focuses on visualizing work, limiting work in progress, and optimizing flow without prescribing roles, ceremonies, or time-boxed iterations.

## Core Principles Compared

| Dimension | Agile (e.g., Scrum) | Kanban |
|---|---|---|
| **Guiding document** | Agile Manifesto (2001) | Kanban Method principles (Anderson, 2010) |
| **Core idea** | Deliver working software in short iterations through cross-functional teamwork | Visualize and optimize the flow of work through a system |
| **Change philosophy** | Embrace change at iteration boundaries | Pursue incremental, evolutionary change continuously |
| **Scope** | Broad philosophy with multiple implementing frameworks | Specific method applicable within or outside Agile |

Agile prescribes a mindset shift: prioritize individuals over processes, working software over documentation, customer collaboration over contracts, and responsiveness over rigid plans. Kanban prescribes starting with what you do now, agreeing to pursue incremental change, respecting current roles and responsibilities, and encouraging leadership at all levels.

## Structure and Workflow

Agile frameworks like Scrum impose a defined structure. There are prescribed roles (Product Owner, Scrum Master, Development Team), ceremonies (Sprint Planning, Daily Standup, Sprint Review, Sprint Retrospective), and artifacts (Product Backlog, Sprint Backlog, Increment). Work is organized into fixed-length sprints, typically lasting one to four weeks.

Kanban imposes minimal structure. It requires only a visual board with columns representing workflow stages and explicit work-in-progress (WIP) limits. There are no mandated roles, no required ceremonies, and no fixed iterations. Teams pull work items into the next stage when capacity becomes available, rather than committing to a batch of work at the start of a sprint.

Key structural differences include:

- **Iterations**: Agile uses fixed-length sprints with defined start and end points. Kanban uses continuous flow with no prescribed iteration boundaries.
- **Roles**: Agile (Scrum) defines specific roles with clear responsibilities. Kanban does not prescribe roles and encourages teams to keep existing structures.
- **Ceremonies**: Agile requires regular ceremonies tied to the sprint cycle. Kanban recommends feedback loops (such as daily standups and delivery reviews) but does not mandate them.
- **Commitment model**: Agile teams commit to a scope of work per sprint. Kanban teams commit to WIP limits and service-level expectations.

## Push vs. Pull

One of the most fundamental distinctions is the flow model. Agile operates primarily as a push system: the Product Owner prioritizes a backlog, and during sprint planning the team selects and commits to a set of items that are pushed into the sprint. Once the sprint begins, the scope is generally fixed.

Kanban operates as a pull system: work items move through the board only when downstream capacity exists. A developer does not begin a new task until they have finished their current one and a slot opens within the WIP limit. This pull-based approach naturally prevents overloading any stage of the workflow and surfaces bottlenecks immediately.

## Metrics and Performance Measurement

| Metric | Agile (Scrum) | Kanban |
|---|---|---|
| **Velocity** | Primary metric; story points completed per sprint | Not typically used |
| **Lead time** | Tracked but secondary | Primary metric; time from request to delivery |
| **Cycle time** | Tracked but secondary | Primary metric; time from work started to work completed |
| **Throughput** | Implicit in velocity | Explicitly tracked; items delivered per unit of time |
| **WIP** | Implicit; bounded by sprint capacity | Explicit; enforced by WIP limits per column |
| **Cumulative flow diagram** | Occasionally used | Core diagnostic tool for identifying bottlenecks |

Agile teams typically measure performance by velocity (how much work is completed per sprint) and use burndown charts to track progress within a sprint. Kanban teams measure lead time, cycle time, and throughput, using cumulative flow diagrams to visualize queue sizes and identify stages where work is accumulating.

## When to Use Each Approach

Agile frameworks like Scrum work well when:

- The team is building a product with evolving requirements and needs regular stakeholder feedback.
- Work can be meaningfully decomposed into increments deliverable within a sprint.
- The organization benefits from a structured cadence of planning, review, and retrospective.
- Cross-functional teams need clear roles and accountability.

Kanban works well when:

- Work arrives unpredictably, such as in support, maintenance, or operations teams.
- The team handles a mix of task types and sizes that do not fit neatly into uniform sprints.
- The goal is to optimize an existing process incrementally without overhauling roles and ceremonies.
- Reducing lead time and improving flow efficiency are the primary objectives.

## Combining Agile and Kanban

Many organizations blend both approaches, sometimes called Scrumban. In this hybrid model, teams retain Scrum's sprint structure and ceremonies but add Kanban's visual board and WIP limits to manage flow within and between sprints. This combination leverages Agile's customer collaboration and feedback cadence alongside Kanban's flow optimization and bottleneck visibility.

Practical integration patterns include:

- Using a Kanban board to manage the product backlog and visualize work flowing into sprint planning.
- Applying WIP limits within a sprint to prevent context switching and improve focus.
- Replacing sprint commitments with continuous flow for teams that find fixed iterations counterproductive.
- Adopting Kanban metrics (lead time, cycle time) alongside Agile metrics (velocity) for a more complete performance picture.

## Common Misconceptions

A frequent misunderstanding is that Agile and Kanban are mutually exclusive. They are not. Agile is a philosophy; Kanban is a method. Kanban can function as an implementation within an Agile framework or as a standalone approach for teams that do not follow Agile.

Another misconception is that Kanban means no planning. Kanban teams still prioritize work, forecast delivery dates using probabilistic methods (such as Monte Carlo simulations), and hold regular cadences for replenishment and review. The difference is that these activities are not tied to a fixed sprint boundary.

Finally, some assume that Kanban lacks discipline because it has fewer prescribed rules. In practice, the discipline of enforcing WIP limits and continuously measuring flow demands significant rigor and organizational maturity.

## Related

Technology professionals exploring Agile and Kanban should also study Scrum as the most widely adopted Agile framework, Lean Software Development for its influence on both methodologies, Scrumban as a formal hybrid approach, the Agile Manifesto and its twelve principles, work-in-progress limits and flow-based thinking, DORA metrics for measuring software delivery performance, and the Toyota Production System for Kanban's manufacturing roots.

## Summary

Agile and Kanban address overlapping but distinct concerns in managing technology work. Agile provides a broad philosophy and structured frameworks for iterative, customer-driven development with defined roles, ceremonies, and sprint cadences. Kanban provides a lightweight, flow-based method for visualizing work, limiting work in progress, and optimizing delivery without mandating structural changes. The choice between them depends on the nature of the work, the team's need for structure, and the organization's maturity. In practice, the most effective teams treat them as complementary tools, adopting the elements of each that best serve their context and continuously refining their process through measurement and reflection.

## References

- Beck, K., et al. (2001). *Manifesto for Agile Software Development*. https://agilemanifesto.org/
- Anderson, D. J. (2010). *Kanban: Successful Evolutionary Change for Your Technology Business*. Blue Hole Press.
- Schwaber, K., & Sutherland, J. (2020). *The Scrum Guide*. https://scrumguides.org/
- Ohno, T. (1988). *Toyota Production System: Beyond Large-Scale Production*. Productivity Press.
- Ladas, C. (2009). *Scrumban: Essays on Kanban Systems for Lean Software Development*. Modus Cooperandi Press.
- Leopold, K., & Kaltenecker, S. (2015). *Kanban Change Leadership*. Wiley.
- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press.
