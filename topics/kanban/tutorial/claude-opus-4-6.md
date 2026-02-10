# Kanban

Kanban is a workflow management method that uses visual signals to represent work items as they move through defined stages of a process. Originally developed by Taiichi Ohno at Toyota in the late 1940s as part of just-in-time manufacturing, Kanban has become one of the most widely adopted frameworks in software development, IT operations, and knowledge work. The word "kanban" is Japanese for "visual signal" or "card," reflecting the method's emphasis on making work visible, limiting work in progress, and enabling continuous flow. Unlike prescriptive frameworks that impose specific roles, ceremonies, and cadences, Kanban is an evolutionary approach that overlays onto existing workflows and encourages incremental improvement.

## Core Principles

Kanban is built on a set of foundational principles that guide how teams adopt and practice the method. These principles are divided into change management principles and service delivery principles.

**Change management principles:**

- **Start with what you do now.** Kanban does not require a wholesale transformation of your current process. Instead, it maps your existing workflow and introduces improvements gradually.
- **Agree to pursue incremental, evolutionary change.** Rather than large, disruptive overhauls, Kanban encourages small, continuous adjustments that reduce risk and resistance.
- **Encourage acts of leadership at all levels.** Improvement is not reserved for managers. Every team member is empowered to identify bottlenecks and propose changes.

**Service delivery principles:**

- **Understand and focus on customer needs and expectations.** Work should be organized and prioritized around delivering value to the end user or stakeholder.
- **Manage the work, not the workers.** Kanban focuses on the flow of work through the system rather than micromanaging individual team members.
- **Regularly review the network of services.** Teams should evaluate policies, workflows, and outcomes to ensure continuous alignment with goals.

## The Kanban Board

The kanban board is the central tool of the method. It provides a shared, real-time visualization of all work items and their current status. A board consists of columns that represent stages in the workflow, and cards that represent individual work items.

A typical board for a software team might include these columns:

| Column | Purpose |
|---|---|
| Backlog | Prioritized list of work not yet started |
| Ready | Items selected and prepared for active work |
| In Progress | Work currently being performed |
| Review | Items awaiting peer review or quality check |
| Done | Completed work that has been delivered |

Teams customize their boards to reflect their actual workflow. A support team might use columns like "Triage," "Investigating," "Awaiting Customer," and "Resolved." The key requirement is that the board accurately represents how work actually flows, not an idealized version of how it should flow.

Cards on the board typically carry information such as a title, assignee, priority, due date, and any blockers. In digital kanban tools like Jira, Trello, or Azure DevOps, cards can also carry attachments, comments, and linked items.

## Work-in-Progress Limits

Limiting work in progress (WIP) is the single most important practice in Kanban and the mechanism that distinguishes it from a simple task board. A WIP limit is a constraint placed on the number of items allowed in a given column or stage at any time.

**Why WIP limits matter:**

- **Reduce context switching.** When team members juggle fewer tasks simultaneously, they complete each task faster and with fewer errors.
- **Expose bottlenecks.** When a column hits its WIP limit, upstream work is blocked, making the constraint visible and forcing the team to address it.
- **Improve flow.** Limiting WIP reduces the average time an item spends in the system (lead time), which directly improves delivery speed and predictability.
- **Encourage collaboration.** When a downstream column is full, team members are prompted to help clear that stage rather than start new work.

A common starting point is to set WIP limits at roughly one to two items per team member in a given column, then adjust based on observed flow. The goal is not to find a perfect number but to create a pull-based system where new work is started only when capacity is available.

## Key Metrics

Kanban relies on quantitative metrics to measure flow and drive improvement. The most important metrics are:

| Metric | Definition | Why It Matters |
|---|---|---|
| Lead Time | Time from when a work item is requested to when it is delivered | Measures overall responsiveness to the customer |
| Cycle Time | Time from when active work begins on an item to when it is completed | Measures the efficiency of the team's process |
| Throughput | Number of items completed per unit of time (day, week, sprint) | Indicates team capacity and delivery rate |
| WIP Count | Number of items currently in progress | High WIP relative to throughput signals overload |
| Blocked Time | Time an item spends unable to progress due to a dependency or issue | Highlights systemic impediments |

Teams track these metrics over time using cumulative flow diagrams, cycle time scatter plots, and throughput run charts. These visualizations make trends, variability, and anomalies easy to spot without requiring complex statistical analysis.

## Kanban Cadences

While Kanban does not prescribe fixed ceremonies the way Scrum does, it defines a set of optional cadences — regular feedback loops that help teams inspect and adapt their process.

- **Daily standup.** A brief check-in focused on flow: what is blocked, what is close to completion, and where help is needed.
- **Replenishment meeting.** The team and stakeholders select and prioritize new items to pull into the system, typically weekly or biweekly.
- **Delivery planning.** Coordination around when and how completed work will be released or deployed.
- **Service delivery review.** A data-driven review of metrics, trends, and service-level expectations, usually monthly.
- **Risk review.** Identification and discussion of risks that could disrupt flow, including dependencies, technical debt, and staffing changes.
- **Operations review.** A cross-team or organizational review of how multiple services interact and where systemic improvements are needed.
- **Strategy review.** A quarterly or periodic examination of whether the team's work aligns with broader business objectives.

Teams adopt the cadences that provide value for their context. A small team might use only the daily standup and replenishment meeting, while a large organization might use all seven.

## Kanban vs. Scrum

Kanban and Scrum are both popular Agile approaches, but they differ in structure, flexibility, and prescription. The following comparison highlights the key differences.

| Aspect | Kanban | Scrum |
|---|---|---|
| Work cadence | Continuous flow | Fixed-length sprints (typically 2 weeks) |
| Roles | No prescribed roles | Scrum Master, Product Owner, Developers |
| Planning | Continuous replenishment | Sprint planning at the start of each sprint |
| Change policy | Items can be added or reprioritized at any time | Scope is fixed during a sprint |
| WIP management | Explicit WIP limits per column | Sprint backlog implicitly limits WIP |
| Estimation | Optional; forecasting based on throughput data | Story points or time-based estimates |
| Ceremonies | Optional cadences chosen by the team | Five prescribed events |
| Board reset | Board is persistent; cards flow continuously | Board resets at the start of each sprint |
| Best suited for | Operations, support, maintenance, continuous delivery | Product development with defined deliverables |

Many teams adopt a hybrid approach called Scrumban, which combines Scrum's structure with Kanban's flow-based practices and WIP limits.

## Common Practices and Policies

Effective Kanban implementations go beyond a board and WIP limits. Teams establish explicit policies that govern how work flows through the system.

- **Definition of ready.** Criteria that a work item must meet before it can be pulled into active work, such as clear acceptance criteria, available dependencies, and appropriate sizing.
- **Definition of done.** Criteria that must be satisfied before an item can be moved to the "Done" column, such as code review completed, tests passing, and documentation updated.
- **Pull policy.** Work is pulled by team members when they have capacity, rather than pushed onto them by a manager. This ensures self-directed flow.
- **Swimlanes.** Horizontal lanes on the board that separate different types of work, such as features, bugs, and expedited items, allowing teams to manage multiple work streams simultaneously.
- **Classes of service.** Categories that define how different types of work are prioritized and handled. Common classes include standard, expedited, fixed-date, and intangible (technical debt or infrastructure improvements).
- **Blocking policy.** A clear process for flagging, escalating, and resolving blocked items to minimize their impact on flow.

## Implementing Kanban

Adopting Kanban follows a practical sequence that minimizes disruption while introducing discipline into workflow management.

1. **Map your current workflow.** Identify the actual stages work passes through from request to delivery. Do not design an ideal process; document reality.
2. **Visualize the work.** Create a board (physical or digital) with columns matching your workflow stages. Add cards for all current work items.
3. **Set initial WIP limits.** Start with limits that reflect current team capacity. These will be refined over time based on observed flow.
4. **Define explicit policies.** Document the rules for when work enters and exits each column, how priorities are determined, and how blocked items are handled.
5. **Measure and review.** Begin tracking lead time, cycle time, and throughput. Use cadences to review data and identify improvement opportunities.
6. **Improve incrementally.** Make small, evidence-based changes to policies, WIP limits, and workflow design. Avoid large-scale process overhauls.

## Related

Teams working with Kanban will benefit from exploring Agile software development methodology for the broader family of iterative approaches, Scrum for the most common prescriptive Agile framework, Lean manufacturing for the production philosophy that inspired Kanban, work-in-progress limits and their mathematical underpinnings in queueing theory, continuous delivery and DevOps for how Kanban integrates with modern deployment practices, and cumulative flow diagrams and cycle time analysis for advanced flow analytics.

## Summary

Kanban is a visual, flow-based method for managing work that emphasizes transparency, work-in-progress limits, and continuous improvement. By making all work visible on a shared board, constraining the amount of concurrent work, and measuring flow metrics like lead time and throughput, teams gain the ability to identify bottlenecks, reduce delivery times, and improve predictability without disruptive process changes. Its lightweight, evolutionary nature makes Kanban applicable across software development, IT operations, support teams, and any domain where work flows through a series of stages. Whether used on its own or combined with frameworks like Scrum, Kanban provides a disciplined yet flexible foundation for managing and improving knowledge work.

## References

- Anderson, David J. *Kanban: Successful Evolutionary Change for Your Technology Business.* Blue Hole Press, 2010.
- Brechner, Eric. *Agile Project Management with Kanban.* Microsoft Press, 2015.
- Hammarberg, Marcus, and Joakim Sunden. *Kanban in Action.* Manning Publications, 2014.
- Kanban University. "The Kanban Guide." https://kanban.university
- Leopold, Klaus, and Siegfried Kaltenecker. *Kanban Change Leadership.* Wiley, 2015.
- Ohno, Taiichi. *Toyota Production System: Beyond Large-Scale Production.* Productivity Press, 1988.
- Vacanti, Daniel. *Actionable Agile Metrics for Predictability.* ActionableAgile, 2015.
