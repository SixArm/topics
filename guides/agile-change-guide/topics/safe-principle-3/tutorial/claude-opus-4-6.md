# Assume variability; preserve options

"Assume variability; preserve options" is Scaled Agile Framework (SAFe) Principle #3. It challenges the traditional engineering instinct to lock down requirements and commit to a single design path as early as possible. Instead, it advises teams to keep multiple design and requirements options open throughout the development cycle, using empirical evidence gathered along the way to converge on the solution that delivers the best economic outcome. This principle draws heavily from lean product development, set-based design, and real options theory, and it is one of the ten foundational principles that underpin the entire SAFe methodology.

## Why Traditional Approaches Fall Short

Conventional project management and systems engineering practices favor early convergence. A single requirements baseline is established, a preferred architectural option is selected, and the team commits to that path. The assumption is that locking decisions early reduces waste and creates certainty. In practice, the opposite often occurs. When the chosen path turns out to be wrong, the cost of change is enormous because the team has invested heavily in a single direction. Late-stage rework, schedule overruns, and suboptimal designs are common consequences. The root cause is a flawed belief that variability can be eliminated through upfront planning rather than managed through ongoing learning.

## Core Concepts

SAFe Principle #3 rests on several interconnected ideas that together form a coherent strategy for managing uncertainty in complex product development.

| Concept | Description |
|---|---|
| **Set-Based Design** | Develop multiple solution options in parallel rather than selecting a single point solution early. Gradually eliminate weaker alternatives as evidence accumulates. |
| **Economic Trade-offs** | Use cost-of-delay and other economic frameworks to decide when and how to narrow options, ensuring decisions maximize value rather than minimize short-term effort. |
| **Integrating Learning Milestones** | Replace phase-gate reviews with frequent integration points where teams validate assumptions, gather data, and eliminate options that no longer make economic sense. |
| **Real Options Theory** | Treat design decisions as options with expiration dates. Preserve optionality when the cost of keeping an option open is low relative to the value of the information you will gain. |
| **Empirical Decision-Making** | Base convergence decisions on objective data from prototypes, experiments, MVPs, and customer feedback rather than on opinions, politics, or premature consensus. |

## Set-Based Design in Practice

Set-based design, originally pioneered by Toyota, is the operational backbone of this principle. Rather than choosing a single approach and iterating on it (point-based design), teams explore a broad solution space and systematically narrow it.

- **Define the feasible range.** Identify the boundaries of acceptable solutions across key dimensions such as performance, cost, weight, and user experience.
- **Explore multiple alternatives.** Develop two or more design options that fall within the feasible range. Each option represents a different trade-off profile.
- **Communicate constraints, not solutions.** Teams share what will not work rather than dictating what must be built. This allows subsystem teams to innovate within known boundaries.
- **Converge gradually.** As test results, customer feedback, and integration data arrive, eliminate options that fall outside the evolving feasible range.
- **Commit at the last responsible moment.** Delay irreversible decisions until the team has sufficient knowledge to make a well-informed choice, but not so long that delay itself becomes costly.

## The Last Responsible Moment

A critical concept within this principle is deciding when to converge. Deciding too early means acting on incomplete information. Deciding too late means missing market windows or incurring unnecessary parallel development costs. The "last responsible moment" is the point at which failing to make a decision eliminates an important alternative. Teams should actively identify these decision points and plan learning activities, such as spikes, prototypes, and A/B tests, to ensure they have the data they need before the window closes.

## Benefits of Preserving Options

- **Reduced risk of rework.** When the team explores multiple paths, the likelihood of committing to a fundamentally flawed design decreases significantly.
- **Better economic outcomes.** Decisions informed by empirical data tend to produce solutions that are more closely aligned with actual customer needs and market conditions.
- **Faster adaptation.** When requirements shift or new information emerges, teams that have preserved options can pivot without the sunk-cost inertia that plagues single-path approaches.
- **Higher team confidence.** Engineers and product managers make commitments based on evidence rather than speculation, leading to stronger buy-in and more realistic expectations.
- **Innovation.** Exploring a broader solution space increases the probability of discovering novel or superior approaches that a single-path strategy would have overlooked.

## Common Pitfalls

| Pitfall | Impact | Mitigation |
|---|---|---|
| Keeping too many options open for too long | Excessive parallel work drives up cost and diffuses team focus | Define clear convergence criteria and learning milestones |
| Treating all decisions as reversible | Some decisions, such as platform selection, have high switching costs that grow over time | Classify decisions by reversibility and apply appropriate rigor |
| Confusing optionality with indecision | Stakeholders may perceive preserved options as a lack of direction | Communicate the strategy explicitly and show the convergence plan |
| Ignoring economic context | Preserving options in a cost-insensitive way can waste budget without proportional risk reduction | Use cost-of-delay analysis to ensure option preservation is economically justified |

## How This Principle Connects to Other SAFe Principles

Principle #3 does not operate in isolation. It is tightly coupled with SAFe Principle #1, "Take an economic view," because the decision to preserve or eliminate options must always be grounded in economic reasoning. It reinforces Principle #4, "Build incrementally with fast, integrated learning cycles," because frequent integration points provide the empirical data needed to narrow options. It also supports Principle #9, "Decentralize decision-making," by empowering teams closest to the work to decide which options to pursue and which to discard based on local knowledge.

## Related

Topics to explore next include set-based concurrent engineering, lean product development as described by Allen Ward, cost of delay and weighted shortest job first (WSJF), real options theory applied to software engineering, SAFe Principle #1 (take an economic view), SAFe Principle #4 (build incrementally with fast integrated learning cycles), minimum viable product strategy, design thinking and divergent-convergent design processes, and the Toyota Product Development System.

## Summary

SAFe Principle #3, "Assume variability; preserve options," reframes uncertainty as a natural and manageable aspect of complex product development rather than a defect to be eliminated through premature commitment. By maintaining multiple design and requirements options, converging based on empirical evidence, and timing decisions to the last responsible moment, teams reduce rework, improve economic outcomes, and build products that more closely match real-world needs. The principle demands discipline: not endless exploration, but structured learning that progressively narrows the solution space until the team can commit with confidence.

## References

- Leffingwell, Dean. *SAFe 5.0 Distilled: Achieving Business Agility with the Scaled Agile Framework*. Addison-Wesley, 2020.
- Ward, Allen C. *Lean Product and Process Development*. Lean Enterprise Institute, 2007.
- Sobek, Durward K., Allen C. Ward, and Jeffrey K. Liker. "Toyota's Principles of Set-Based Concurrent Engineering." *Sloan Management Review*, Vol. 40, No. 2, 1999.
- Reinertsen, Donald G. *The Principles of Product Development Flow: Second Generation Lean Product Development*. Celeritas Publishing, 2009.
- Scaled Agile, Inc. "SAFe Principle #3 – Assume Variability; Preserve Options." Scaled Agile Framework, https://scaledagileframework.com/assume-variability-preserve-options/
- Amram, Martha, and Nalin Kulatilaka. *Real Options: Managing Strategic Investment in an Uncertain World*. Harvard Business School Press, 1999.
