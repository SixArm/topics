# Scrum of Scrums

Scrum of Scrums is a scaled agile framework technique designed to coordinate multiple Scrum teams working on the same product or project. It enables organizations to maintain the benefits of Scrum — iterative delivery, team autonomy, and transparency — while managing larger, more complex initiatives that require synchronization across several teams. Originally attributed to Jeff Sutherland's work at IDX Systems in the mid-1990s, the practice has become one of the most widely adopted lightweight approaches to scaling agile development. Rather than imposing a heavy governance structure, Scrum of Scrums relies on representative communication and shared accountability to keep multiple teams aligned toward a common goal.

## How It Works

In a Scrum of Scrums implementation, each individual Scrum team selects a representative — typically the Scrum Master, a tech lead, or a designated team member — to participate in a higher-level coordination meeting. These representatives meet regularly, often daily or several times per week, to discuss progress, identify cross-team dependencies, and resolve inter-team impediments. The meeting follows a structure similar to the daily standup, with each representative answering a set of focused questions on behalf of their team:

- What has your team completed since the last meeting?
- What does your team plan to work on before the next meeting?
- Are there any blockers or risks that could impact other teams?
- Is your team about to introduce anything that could affect another team's work?

The fourth question is the critical differentiator from a standard daily standup. It forces teams to surface integration conflicts, shared resource contention, and architectural decisions that ripple across team boundaries before they become problems.

## Roles and Responsibilities

The Scrum of Scrums meeting introduces a coordination layer that sits above individual team ceremonies. Each participant carries specific responsibilities that determine the effectiveness of the overall framework.

| Role | Responsibility |
|---|---|
| **Team Representative** | Attends the Scrum of Scrums meeting, communicates the team's status, raises cross-team impediments, and brings resolutions back to the team. This person must have enough technical and process context to answer questions on the spot. |
| **Scrum of Scrums Master** | Facilitates the coordination meeting, tracks inter-team impediments, escalates unresolved blockers to leadership, and ensures the meeting stays focused and time-boxed. |
| **Product Owner (or Chief Product Owner)** | Maintains the unified product backlog priority, resolves conflicting requirements between teams, and ensures that all teams are working toward a coherent product vision. |
| **Individual Scrum Masters** | Continue to facilitate their own team's ceremonies while ensuring their representative is prepared with accurate status and relevant impediments for the coordination meeting. |

Organizations scaling beyond three or four teams sometimes introduce a "Scrum of Scrums of Scrums" layer, though this level of nesting should be treated with caution. Each additional layer increases communication latency and the risk of information distortion.

## Meeting Structure and Cadence

The coordination meeting should be time-boxed, typically to 15–30 minutes depending on the number of participating teams. Its success depends on discipline: representatives must come prepared, discussions must stay at the integration level rather than diving into individual task details, and action items must be captured and tracked.

- **Frequency**: Daily meetings work best when teams have tightly coupled work. For teams with fewer dependencies, two to three meetings per week may suffice.
- **Duration**: 15 minutes for up to four teams; 30 minutes for five to eight teams. Beyond eight teams, consider restructuring rather than extending the meeting.
- **Participants**: One representative per team, the Scrum of Scrums Master, and optionally a product owner or architect for context. Observers should be limited to avoid turning the meeting into a status report for management.
- **Outputs**: A shared impediment log, dependency map updates, and decisions on integration sequencing.

## When to Use Scrum of Scrums

Scrum of Scrums is not the only scaling approach available, and it fits certain situations better than others. It works best when teams are relatively independent but share a common product, when dependencies are manageable, and when the organization values lightweight coordination over prescriptive frameworks.

| Scenario | Suitability |
|---|---|
| Two to eight Scrum teams working on a shared product | Strong fit. The framework is designed for this range. |
| Teams with frequent technical dependencies (shared APIs, databases, services) | Strong fit. The meeting directly addresses integration risks. |
| Teams that are geographically distributed | Moderate fit. Asynchronous variants and video calls can work, but time zone differences may reduce effectiveness. |
| More than ten teams requiring tight coordination | Weak fit. Consider more structured frameworks like SAFe, LeSS, or Nexus. |
| Teams working on entirely independent products | Poor fit. There is little value in coordination meetings when no real dependencies exist. |
| Organizations needing strict governance, compliance tracking, and audit trails | Poor fit. Scrum of Scrums is informal by design and does not inherently provide governance structures. |

## Common Challenges and Mitigations

Scrum of Scrums is deceptively simple in concept but requires deliberate effort to execute well. Teams frequently encounter pitfalls that erode the value of the coordination layer.

- **Meeting becomes a status report**: When representatives simply recite updates without engaging on dependencies, the meeting loses its purpose. The facilitator must redirect conversation toward cross-team impacts and actionable impediments.
- **Wrong representative attends**: If the representative lacks technical depth or decision-making authority, issues get deferred rather than resolved. Teams should select someone who can both speak to technical details and commit to action items.
- **Impediments are raised but never resolved**: Without a clear owner and follow-up mechanism, inter-team blockers persist across sprints. An impediment backlog with assigned owners and deadlines is essential.
- **Teams lose autonomy**: Over-eager coordination can devolve into centralized command and control, undermining the self-organizing principle of Scrum. The meeting should identify what needs alignment, not dictate how teams do their work.
- **Information bottleneck**: When all cross-team communication flows through a single representative, context gets lost. Supplement the meeting with direct team-to-team communication channels for technical details.

## Comparison with Other Scaling Frameworks

Scrum of Scrums occupies a specific niche in the landscape of agile scaling approaches. Understanding how it compares to alternatives helps organizations choose the right level of structure.

| Framework | Scale | Ceremony Overhead | Prescriptiveness | Best For |
|---|---|---|---|---|
| **Scrum of Scrums** | 2–8 teams | Low | Low | Lightweight coordination with minimal process change |
| **SAFe (Scaled Agile Framework)** | 10–100+ teams | High | High | Large enterprises requiring portfolio-level alignment and governance |
| **LeSS (Large-Scale Scrum)** | 2–8 teams (LeSS) or 8+ (LeSS Huge) | Low–Moderate | Moderate | Organizations wanting to scale Scrum with minimal added roles |
| **Nexus** | 3–9 teams | Moderate | Moderate | Teams sharing a single product backlog needing integration focus |
| **Spotify Model** | Varies | Low | Low | Engineering culture emphasizing autonomy, squads, and guilds |

Scrum of Scrums can coexist with these frameworks. Many SAFe implementations, for example, use Scrum of Scrums as a coordination mechanism within an Agile Release Train.

## Best Practices

Successful Scrum of Scrums implementations share several characteristics that distinguish them from superficial adoption.

- **Keep it focused on dependencies**: The meeting exists to solve cross-team coordination problems. Anything that belongs in a single team's standup should stay there.
- **Rotate representatives thoughtfully**: Rotation can build broader organizational awareness, but avoid rotating so frequently that no one develops the context needed to be effective.
- **Visualize dependencies**: Use a shared dependency board or matrix that makes inter-team relationships visible. Update it during or immediately after each meeting.
- **Complement with cross-team retrospectives**: Hold periodic retrospectives that bring members from multiple teams together to improve the coordination process itself.
- **Establish a common definition of done**: When teams share integration points, a mismatched definition of done creates friction. Align on what "done" means at the integration level.
- **Use shared tooling**: A common project management tool, version control strategy, and CI/CD pipeline reduce the coordination burden by making work visible without requiring verbal updates.

## Related

Topics to explore next include **Scrum** as the foundational framework that Scrum of Scrums extends, **Scaled Agile Framework (SAFe)** and **Large-Scale Scrum (LeSS)** for more structured scaling approaches, **agile meetings** and **agile with ceremonies** for understanding how coordination meetings fit into broader agile practice, **cross-cultural communication** for distributed team coordination, and **sprint planning** and **backlog refinement** for the upstream practices that feed effective Scrum of Scrums execution.

## Summary

Scrum of Scrums provides a pragmatic, low-overhead mechanism for coordinating multiple Scrum teams working on a shared product. By designating team representatives to meet regularly and focus on cross-team dependencies, impediments, and integration risks, organizations can scale agile practices without imposing heavy governance structures. The approach works best with two to eight teams that have genuine interdependencies and is most effective when supported by shared tooling, clear communication protocols, and a strong facilitation culture. While it is not a complete scaling framework and may need to be supplemented or replaced as organizational complexity grows, Scrum of Scrums remains one of the most accessible entry points for teams taking their first steps beyond single-team Scrum.

## References

- Sutherland, J. (2001). "Agile Can Scale: Inventing and Reinventing SCRUM in Five Companies." *Cutter IT Journal*, 14(12).
- Schwaber, K. (2004). *Agile Project Management with Scrum*. Microsoft Press.
- Larman, C. & Vodde, B. (2010). *Practices for Scaling Lean & Agile Development: Large, Multisite, and Offshore Product Development with Large-Scale Scrum*. Addison-Wesley.
- Scaled Agile, Inc. "Scrum of Scrums." *Scaled Agile Framework (SAFe)*. https://scaledagileframework.com
- Scrum Alliance. "Scrum of Scrums." https://www.scrumalliance.org
- Nexus Guide. https://www.scrum.org/resources/nexus-guide
