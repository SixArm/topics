# Agile work-in-progress (WIP)

In Agile software development, work-in-progress (WIP) refers to any task or work item that has been started but has not yet been completed and delivered. WIP represents inventory in your workflow: effort that consumes team capacity, attention, and coordination overhead but has not yet produced value for users or customers. Managing WIP effectively is one of the highest-leverage practices a team can adopt, because it directly influences throughput, lead time, quality, and team morale.

## Why WIP matters

Every item in progress carries hidden costs. It occupies mental bandwidth, requires status tracking, and creates dependencies that block other work. When WIP accumulates beyond a team's capacity to finish work, the entire system slows down. Items age in queues, context gets lost, and partially completed features become stale. The relationship between WIP and delivery speed is not linear: small increases in WIP can cause disproportionately large increases in cycle time due to cascading coordination costs and context-switching penalties.

## Little's Law and flow

Little's Law, a foundational principle from queueing theory, states that average lead time equals work-in-progress divided by throughput. This relationship holds for any stable system and has a direct implication for Agile teams: if you want to reduce how long it takes to deliver a feature, you must either increase throughput or reduce WIP. Since throughput is constrained by team size, skill, and tooling, reducing WIP is typically the fastest and cheapest lever available.

| Variable | Definition | Team implication |
|----------|-----------|-----------------|
| Lead time | Average time from start to finish | What customers experience as delivery speed |
| WIP | Number of items currently in progress | What the team controls day-to-day |
| Throughput | Items completed per unit of time | Determined by capacity and efficiency |

## WIP limits

In frameworks like Kanban, teams set WIP limits: a fixed cap on the number of items allowed in a specific stage of the workflow. For example, a team might limit their "In Development" column to four items and their "In Review" column to two items. These constraints are deliberate and powerful.

Benefits of WIP limits include:

- **Reduced context switching.** When team members juggle fewer tasks, they lose less time re-orienting and produce higher-quality output.
- **Exposed bottlenecks.** If one column is consistently at its limit while the next is starved, the constraint becomes visible and actionable.
- **Shorter lead times.** Fewer items competing for attention means each item moves through the system faster.
- **Improved quality.** Developers focusing on fewer tasks make fewer rushed mistakes and catch defects earlier.
- **Better predictability.** Stable WIP levels produce more consistent cycle times, which makes forecasting reliable.

## Setting appropriate WIP limits

There is no universal formula for the correct WIP limit. Teams should start with a limit and adjust based on observed flow. A common starting point is to set the limit at or slightly below the number of team members working in that stage.

| Approach | Starting WIP limit | When to use |
|----------|-------------------|-------------|
| One per person | Number of people in that role | Teams new to WIP limits who want a conservative start |
| Slightly constrained | Team size minus one | Teams ready to surface bottlenecks and improve flow |
| Aggressive | Half the team size | Mature teams optimizing for fast feedback and pairing |

Signs your WIP limit is too high: work ages in columns, context switching is frequent, and quality issues increase. Signs your WIP limit is too low: team members are frequently idle with nothing to pull. In practice, limits that are too high are far more common than limits that are too low.

## Stop starting, start finishing

The guiding mantra for WIP management is "stop starting, start finishing." This represents a fundamental shift in mindset. Instead of picking up a new task because you are blocked on another, the goal is to resolve the blockage on the current task first. This might mean pairing with a colleague, escalating a dependency, or swarming on a bottleneck.

This principle challenges the instinct to stay busy. Busyness is not productivity. A developer who starts three features and finishes none has delivered zero value, while a developer who finishes one feature and helps unblock two others has delivered three units of value to customers.

## Calculating and monitoring WIP

To calculate WIP, count the items currently in active columns on your board, excluding "To Do" (not started) and "Done" (completed). Active columns typically include stages like development, code review, testing, and deployment.

Key metrics to track alongside WIP:

- **Cycle time:** How long items spend in active work stages
- **Aging WIP:** How long the oldest items have been in progress
- **Throughput:** How many items the team completes per week or sprint
- **WIP age distribution:** Whether most items are young (healthy) or old (problematic)

## Common warning signs

Teams should watch for patterns that indicate WIP problems:

- **Handoff pile-ups at QA or review.** This signals that upstream WIP limits are too high or that the downstream stage is under-resourced.
- **Ghost WIP.** People work on tasks not represented on the board, destroying predictability and hiding true capacity usage.
- **Zombie items.** Tasks that have been in progress for weeks without meaningful advancement, consuming cognitive overhead without delivering value.
- **Heroic multitasking.** Team members proudly juggling many items simultaneously, which feels productive but statistically guarantees slower delivery of each item.
- **Sprint spillover.** Consistently carrying unfinished work across sprint boundaries indicates chronic over-commitment, which is a WIP problem.

## WIP across Agile frameworks

| Framework | WIP mechanism | Enforcement style |
|-----------|--------------|-------------------|
| Kanban | Explicit column WIP limits | Strict; pulling is blocked when limit is reached |
| Scrum | Sprint backlog size acts as implicit WIP limit | Moderate; sprint capacity constrains commitment |
| XP | Pairing and small stories naturally limit WIP | Cultural; practices discourage large parallel efforts |
| SAFe | Portfolio and program Kanban boards with WIP limits | Structural; WIP limits at multiple levels of the organization |

## Related

Teams looking to deepen their understanding of WIP management should explore Kanban systems and pull-based workflows, cumulative flow diagrams for visualizing WIP over time, cycle time analytics and Monte Carlo forecasting, the Theory of Constraints and identifying system bottlenecks, Lean manufacturing principles including muda (waste) and muri (overburden), and queue management in software delivery pipelines.

## Summary

Work-in-progress is the central variable that connects team behavior to delivery outcomes. By making WIP visible, setting deliberate limits, and adopting the discipline of finishing over starting, teams reduce lead times, improve quality, expose systemic problems, and create sustainable pace. The practice requires ongoing attention and adjustment, but the payoff is a predictable, high-throughput delivery system that consistently converts effort into customer value.

## References

- Anderson, David J. *Kanban: Successful Evolutionary Change for Your Technology Business.* Blue Hole Press, 2010.
- Reinertsen, Donald G. *The Principles of Product Development Flow: Second Generation Lean Product Development.* Celeritas Publishing, 2009.
- Little, John D.C. "A Proof for the Queuing Formula: L = λW." *Operations Research*, vol. 9, no. 3, 1961, pp. 383-387.
- Vacanti, Daniel S. *Actionable Agile Metrics for Predictability.* ActionableAgile Press, 2015.
- Leopold, Klaus and Kaltenecker, Siegfried. *Kanban Change Leadership.* Wiley, 2015.
- Goldratt, Eliyahu M. *The Goal: A Process of Ongoing Improvement.* North River Press, 1984.
