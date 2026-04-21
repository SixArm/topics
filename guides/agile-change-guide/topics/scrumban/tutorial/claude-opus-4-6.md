# Scrumban

Scrumban is a hybrid agile methodology that merges the structured cadence and roles of Scrum with the continuous flow and visual management principles of Kanban. Originally coined by Corey Ladas in his 2008 book *Scrumban: Essays on Kanban Systems for Lean Software Development*, the approach was designed to help teams transition from Scrum toward leaner processes. Over time, Scrumban has become a methodology in its own right, adopted by teams that want the planning discipline of Scrum without the rigidity of fixed sprints, combined with the throughput optimization and flexibility of Kanban.

## Core Principles

Scrumban is built on a set of principles drawn from both parent methodologies, adapted to create a system that emphasizes flow, flexibility, and continuous improvement.

- **Pull-based workflow**: Work items are pulled into active development only when capacity is available, rather than being pushed into a sprint commitment at the start of a fixed timebox.
- **Work-in-progress (WIP) limits**: Each stage of the workflow has a cap on the number of items that can be active simultaneously, preventing overload and exposing bottlenecks.
- **On-demand planning**: Instead of planning at fixed sprint intervals, planning sessions are triggered when the backlog drops below a predetermined threshold.
- **Visualization**: A Kanban-style board makes the state of all work visible to the entire team, promoting transparency and shared understanding.
- **Continuous improvement**: Teams hold retrospectives and use metrics such as cycle time and throughput to identify process improvements iteratively.
- **Iteration on demand**: While sprints are not required, teams may choose to use short iterations for releases or reporting without being bound to them for planning purposes.

## How Scrumban Differs from Scrum and Kanban

Understanding Scrumban requires comparing it to its parent methodologies. The table below highlights the key differences across several dimensions.

| Dimension | Scrum | Kanban | Scrumban |
|---|---|---|---|
| **Iterations** | Fixed-length sprints (1-4 weeks) | No prescribed iterations | Optional; planning triggered on demand |
| **Roles** | Product Owner, Scrum Master, Development Team | No prescribed roles | Roles retained but flexible; Scrum Master may evolve into flow manager |
| **Planning** | Sprint Planning at start of each sprint | Continuous replenishment | On-demand when backlog hits trigger point |
| **WIP Limits** | Implicitly set by sprint commitment | Explicitly enforced per column | Explicitly enforced per column |
| **Board** | Reset after each sprint | Persistent and continuously updated | Persistent and continuously updated |
| **Change Policy** | Changes discouraged mid-sprint | Changes allowed anytime | Changes allowed anytime with prioritization |
| **Estimation** | Story points or hours per sprint | Not required | Optional; used for forecasting, not commitment |
| **Ceremonies** | Sprint Planning, Daily Standup, Review, Retrospective | No required ceremonies | Daily standup and retrospective retained; others as needed |

## Key Practices

Scrumban teams typically adopt a specific set of practices that distinguish the methodology from ad-hoc development.

- **Kanban board with defined workflow stages**: Teams map their actual workflow onto columns such as Backlog, Ready, In Development, Code Review, Testing, and Done. The board is never reset and provides a living picture of work state.
- **WIP limits per stage**: By limiting the number of items in each column, teams force themselves to finish work before starting new items. This reduces context switching and shortens cycle times.
- **Bucket-size planning**: The backlog is divided into buckets representing different planning horizons. Long-term items sit in a large "1-year" bucket with minimal detail, medium-term items in a "6-month" bucket with moderate detail, and near-term items in a "1-month" bucket with full specification. This graduated approach prevents wasted effort on items that may never be built.
- **Trigger-based planning sessions**: When the number of ready items falls below a threshold, the team holds a planning meeting to replenish the queue. This replaces the fixed sprint planning ceremony.
- **Daily standups**: Short daily meetings remain valuable for synchronization, focusing on flow blockers rather than individual status updates.
- **Retrospectives**: Periodic retrospectives continue, driven by data such as cumulative flow diagrams, cycle time charts, and throughput trends.

## Metrics and Measurement

Scrumban relies on flow-based metrics rather than velocity-based metrics. These measurements help teams understand their process health and forecast delivery dates.

- **Cycle time**: The elapsed time from when work begins on an item to when it is completed. Shorter and more consistent cycle times indicate a healthier process.
- **Lead time**: The elapsed time from when a request enters the backlog to when it is delivered. This metric captures the full customer-facing delay.
- **Throughput**: The number of items completed per unit of time. Throughput data feeds into probabilistic forecasting models.
- **Cumulative flow diagram (CFD)**: A stacked area chart showing the number of items in each workflow state over time. The CFD reveals bottlenecks, WIP violations, and trends in delivery rate.
- **Blocker clustering**: Tracking the causes and frequency of blocked items to identify systemic issues that impair flow.

## When to Use Scrumban

Scrumban is not universally the best choice, but it excels in several common scenarios.

- **Transitioning from Scrum to Kanban**: Teams that find Scrum ceremonies burdensome but are not ready to abandon all structure can use Scrumban as an intermediate step.
- **Maintenance and support work**: Teams handling a mix of planned features and unpredictable bug fixes benefit from the flexibility to reprioritize without disrupting a sprint commitment.
- **Mature agile teams**: Teams that have internalized agile principles and no longer need the guardrails of fixed sprints can move to Scrumban to reduce overhead.
- **Rapidly changing priorities**: In environments where business priorities shift frequently, on-demand planning is more practical than committing to a fixed sprint scope.
- **Hardware-software integration projects**: Where dependencies create variable lead times that do not fit neatly into fixed-length sprints.

## Common Pitfalls

Teams adopting Scrumban should be aware of failure modes that can undermine the methodology.

- **Abandoning discipline**: Without fixed sprint boundaries enforcing regular delivery, teams may drift into unstructured work with no cadence and no accountability.
- **Ignoring WIP limits**: Treating WIP limits as suggestions rather than constraints defeats the purpose of flow management and reintroduces bottlenecks.
- **Skipping retrospectives**: The absence of mandatory ceremonies can lead teams to stop reflecting on their process, eliminating the continuous improvement feedback loop.
- **Lack of metrics**: Teams that do not track cycle time, throughput, or cumulative flow lose visibility into process health and cannot make data-driven improvements.
- **Over-customization**: Scrumban's flexibility can tempt teams to cherry-pick only the comfortable practices, creating a methodology that is neither Scrum nor Kanban nor anything coherent.

## Implementation Steps

For teams looking to adopt Scrumban, a phased approach reduces risk.

1. Start with your existing Scrum process and identify pain points such as excessive ceremony overhead, mid-sprint scope changes, or inconsistent velocity.
2. Introduce a persistent Kanban board that maps your actual workflow stages rather than resetting each sprint.
3. Set initial WIP limits for each column. A common starting point is to limit WIP to the number of team members plus one buffer slot.
4. Replace fixed sprint planning with trigger-based planning. Define a threshold for your "Ready" column and schedule planning when it drops below that level.
5. Keep daily standups and retrospectives. Focus standups on flow and blockers rather than yesterday/today/blockers status reporting.
6. Begin tracking cycle time, lead time, and throughput. Use a cumulative flow diagram to visualize trends.
7. After several weeks, hold a retrospective focused specifically on the transition. Adjust WIP limits, planning triggers, and workflow stages based on observed data.

## Related

Teams working with Scrumban should explore related topics including Kanban for deeper understanding of flow-based systems, Scrum for the foundational ceremonies and roles that Scrumban inherits, Lean software development for the waste-reduction principles underlying both methodologies, work-in-progress limits and their impact on throughput, cumulative flow diagrams for process analysis, cycle time optimization, the Theory of Constraints as articulated by Eliyahu Goldratt, and agile maturity models for assessing team readiness for less-structured approaches.

## Summary

Scrumban combines Scrum's planning discipline and team ceremonies with Kanban's continuous flow, visual management, and WIP limits into a hybrid methodology that adapts to the needs of the team rather than imposing a rigid framework. It replaces fixed sprint boundaries with on-demand planning triggered by backlog thresholds, retains daily standups and retrospectives for coordination and improvement, and relies on flow metrics such as cycle time and throughput rather than velocity for forecasting and process health. Scrumban is particularly effective for mature agile teams, maintenance-heavy environments, and organizations navigating the transition from Scrum to leaner processes, provided they maintain the discipline to enforce WIP limits, track metrics, and continuously reflect on their workflow.

## References

- Ladas, Corey. *Scrumban: Essays on Kanban Systems for Lean Software Development*. Modus Cooperandi Press, 2008.
- Anderson, David J. *Kanban: Successful Evolutionary Change for Your Technology Business*. Blue Hole Press, 2010.
- Schwaber, Ken, and Jeff Sutherland. *The Scrum Guide*. Scrum.org, 2020. https://scrumguides.org
- Reddy, Ajay. *The Scrumban [R]Evolution: Getting the Most Out of Agile, Scrum, and Lean Kanban*. Addison-Wesley Professional, 2015.
- Leopold, Klaus, and Siegfried Kaltenecker. *Kanban Change Leadership*. Wiley, 2015.
- Poppendieck, Mary, and Tom Poppendieck. *Lean Software Development: An Agile Toolkit*. Addison-Wesley, 2003.
