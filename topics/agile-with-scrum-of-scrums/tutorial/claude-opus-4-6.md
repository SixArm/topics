# Agile with Scrum of Scrums

Agile with Scrum of Scrums is a scaled agile framework designed to coordinate multiple Scrum teams working together on a large, complex product or system. While a single Scrum team typically consists of five to nine members, many enterprise projects demand dozens or even hundreds of developers organized across numerous teams. Scrum of Scrums provides the coordination layer that keeps these teams aligned on shared goals, surfaces cross-team dependencies early, and preserves the lightweight, iterative principles that make Scrum effective at the individual team level.

## Why Scrum of Scrums Exists

Traditional Scrum works well for a single, co-located team building a focused product increment. When organizations scale beyond one team, however, several problems emerge: teams unknowingly duplicate work, integration conflicts appear late in the sprint, shared components become bottlenecks, and communication paths multiply exponentially. Scrum of Scrums was introduced as a practical answer to these scaling challenges. Jeff Sutherland, one of the co-creators of Scrum, first described the technique in the early 2000s as a way to coordinate up to roughly nine Scrum teams without imposing heavyweight project management overhead.

## How Individual Teams Operate

Each team in a Scrum of Scrums arrangement operates as a fully autonomous Scrum team. Every team maintains its own Product Owner, Scrum Master, and cross-functional development members. Teams conduct their own sprint planning, daily standups, sprint reviews, and retrospectives on their own cadence. The key principle is that individual team-level Scrum practices remain unchanged. The Scrum of Scrums layer is additive, not a replacement for team-level ceremonies.

## The Scrum of Scrums Meeting

The defining element of this framework is the Scrum of Scrums meeting itself. One representative from each team, often called an "ambassador," attends a regular coordination session, typically held two to three times per week. The ambassador is usually a developer or tech lead rather than the Scrum Master, because the meeting focuses on technical dependencies and integration concerns rather than process.

Each ambassador addresses four structured questions:

- What has my team completed since the last Scrum of Scrums meeting?
- What does my team plan to complete before the next meeting?
- Are there any impediments blocking my team?
- Is my team about to put anything in the way of another team?

The fourth question is the most distinctive. It forces teams to think beyond their own backlog and consider the downstream impact of their work on other teams. This forward-looking question is what differentiates Scrum of Scrums from a simple status report.

## Roles and Responsibilities

| Role | Scope | Key Responsibilities |
|---|---|---|
| Team Scrum Master | Single team | Facilitates team ceremonies, removes team-level impediments, coaches the team on Scrum practices |
| Team Product Owner | Single team | Manages the team backlog, defines acceptance criteria, prioritizes work for one team |
| Ambassador | Cross-team | Represents the team at the Scrum of Scrums meeting, communicates dependencies and blockers |
| Chief Scrum Master | All teams | Facilitates the Scrum of Scrums meeting, escalates cross-team impediments, tracks coordination issues |
| Chief Product Owner | All teams | Maintains the overall product vision, coordinates priorities across team backlogs, resolves conflicting requirements |

The Chief Scrum Master role is not always formally defined, but in practice someone must facilitate the cross-team meeting, track impediments that no single team can resolve, and escalate organizational blockers. In larger organizations, this person may also coordinate a "Scrum of Scrum of Scrums" when the number of teams exceeds what a single coordination meeting can handle.

## When to Use Scrum of Scrums

Scrum of Scrums is appropriate under specific conditions. It works best when teams share a common product or system, when there are real technical dependencies between teams, and when the organization has between three and nine Scrum teams. Below three teams, informal communication is usually sufficient. Above nine teams, more formalized frameworks such as SAFe, LeSS, or Nexus may be more appropriate.

| Condition | Scrum of Scrums Fit |
|---|---|
| 2 teams with minimal dependencies | Not needed; informal coordination suffices |
| 3-5 teams with shared codebase | Strong fit; the coordination meeting adds clear value |
| 6-9 teams on a complex product | Good fit, though meeting discipline becomes critical |
| 10+ teams across multiple products | May need additional structure such as SAFe or LeSS |
| Teams in different time zones | Workable, but requires careful scheduling of the coordination meeting |

## Benefits

- **Early dependency detection.** The structured four-question format forces teams to surface integration risks before they become costly defects.
- **Lightweight coordination.** Unlike heavyweight project management approaches, Scrum of Scrums adds only one recurring meeting rather than layers of documentation and approval gates.
- **Preserved team autonomy.** Individual teams retain full ownership of their sprint planning, execution, and retrospectives.
- **Faster impediment resolution.** Cross-team blockers that would otherwise languish in a single team's backlog get visibility and escalation paths.
- **Alignment without hierarchy.** Teams coordinate as peers through their ambassadors rather than through a top-down command structure.

## Common Pitfalls

- **Turning the meeting into a status report.** If ambassadors simply recite what their team did without addressing dependencies and risks, the meeting loses its value. The fourth question about impact on other teams must be taken seriously.
- **Sending the wrong representative.** Scrum Masters or managers who attend instead of technical contributors often lack the detailed knowledge needed to identify integration risks.
- **Skipping the meeting under deadline pressure.** Cross-team coordination becomes more important, not less, when teams are under pressure. Canceling Scrum of Scrums meetings during crunch periods is counterproductive.
- **Allowing the meeting to grow too long.** The meeting should remain timeboxed to fifteen to thirty minutes. If it regularly runs over, the group is likely trying to solve problems in the meeting rather than identifying them for follow-up.
- **No follow-through on impediments.** Identifying a cross-team blocker is only useful if someone owns its resolution. Without a Chief Scrum Master or equivalent tracking these items, identified impediments stall.

## Comparison with Other Scaled Frameworks

| Framework | Scale | Coordination Mechanism | Overhead |
|---|---|---|---|
| Scrum of Scrums | 3-9 teams | Ambassador meeting, 2-3 times per week | Low |
| SAFe (Scaled Agile Framework) | 10-100+ teams | Agile Release Trains, PI Planning events | High |
| LeSS (Large-Scale Scrum) | 2-8 teams | Joint sprint planning, shared backlog | Medium |
| Nexus | 3-9 teams | Nexus Integration Team, Nexus Sprint Planning | Medium |
| Spotify Model | Varies | Squads, Tribes, Chapters, Guilds | Medium |

Scrum of Scrums occupies the simplest end of the scaling spectrum. It requires the least organizational change and the fewest new roles, making it a natural first step for organizations that have outgrown single-team Scrum but are not yet ready for a full enterprise framework.

## Best Practices for Implementation

- **Select ambassadors carefully.** Choose technically strong team members who understand both their own team's work and the broader system architecture.
- **Keep the cadence consistent.** Hold Scrum of Scrums meetings on a fixed schedule rather than ad hoc. Consistency builds the habit of cross-team thinking.
- **Maintain a shared impediment board.** Track cross-team blockers visibly so that resolution progress is transparent to all teams.
- **Align sprint cadences when possible.** Teams that start and end sprints on the same dates simplify integration planning and reduce coordination complexity.
- **Use the meeting to identify, not to solve.** Problems surfaced in the Scrum of Scrums meeting should be assigned to smaller working groups for resolution rather than debated in the full meeting.
- **Rotate the ambassador role periodically.** This spreads cross-team awareness throughout each team and prevents knowledge silos.

## Related

Technology professionals working with Scrum of Scrums should explore related scaled agile frameworks including the Scaled Agile Framework (SAFe), Large-Scale Scrum (LeSS), and Nexus for handling larger organizational scales. Understanding foundational Scrum practices such as sprint planning, daily standups, sprint reviews, and retrospectives is essential. Broader agile concepts including agile coaching, agile maturity models, and enterprise agile transformations provide valuable context. Dependency management techniques, cross-functional team design, and continuous integration practices are directly relevant to making Scrum of Scrums coordination effective in practice.

## Summary

Agile with Scrum of Scrums provides a pragmatic, low-overhead mechanism for coordinating multiple Scrum teams working on a shared product or system. By introducing a regular cross-team meeting where ambassadors surface dependencies, impediments, and potential impacts on other teams, it preserves the autonomy and agility of individual Scrum teams while adding the coordination necessary for larger-scale development. The framework works best with three to nine teams that share genuine technical dependencies, and it serves as either a standalone scaling approach or a stepping stone toward more comprehensive frameworks as the organization grows.

## References

- Sutherland, J. (2001). "Agile Can Scale: Inventing and Reinventing SCRUM in Five Companies." *Cutter IT Journal*, 14(12).
- Schwaber, K. and Sutherland, J. (2020). *The Scrum Guide*. Scrum.org. https://scrumguides.org
- Larman, C. and Vodde, B. (2016). *Large-Scale Scrum: More with LeSS*. Addison-Wesley Professional.
- Sutherland, J. (2014). *Scrum: The Art of Doing Twice the Work in Half the Time*. Crown Business.
- Scaled Agile, Inc. (2023). *SAFe 6.0 Framework*. https://www.scaledagileframework.com
- Scrum.org. "Nexus Guide." https://www.scrum.org/resources/nexus-guide
- Cohn, M. (2009). *Succeeding with Agile: Software Development Using Scrum*. Addison-Wesley Professional.
