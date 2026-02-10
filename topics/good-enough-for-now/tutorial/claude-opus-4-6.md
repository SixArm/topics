# Good Enough For Now (GEFN)

Good Enough For Now (GEFN) is a decision-making philosophy used across technology, product development, and organizational management. It holds that a solution does not need to be perfect or comprehensive to be deployed; it only needs to be adequate for the current context and constraints. GEFN is not an endorsement of low quality. Rather, it is a pragmatic recognition that delivering value incrementally, learning from real-world feedback, and iterating deliberately will produce better long-term outcomes than waiting for an ideal solution that may never arrive.

## Origins and Conceptual Foundations

GEFN draws from several intellectual traditions. In software engineering, it connects to the principle of iterative development, where systems evolve through repeated cycles of planning, building, testing, and refining. In decision science, it aligns with Herbert Simon's concept of "satisficing," the practice of choosing an option that meets a threshold of acceptability rather than exhaustively optimizing across all possible alternatives. In organizational governance, the Sociocracy movement formalized GEFN as a decision standard: a proposal passes not because everyone considers it optimal, but because no one sees a reason it cannot be tried safely.

The underlying insight is consistent across these domains: in environments characterized by uncertainty, complexity, and rapid change, the cost of delaying action in pursuit of perfection frequently exceeds the cost of acting on an adequate solution and correcting course later.

## Core Principles

GEFN rests on several mutually reinforcing principles:

- **Sufficiency over perfection.** The solution must address the immediate need reliably. It does not need to address every foreseeable future need.
- **Bias toward action.** Progress is valued over deliberation. Shipping a working increment creates learning opportunities that planning alone cannot.
- **Reversibility awareness.** GEFN is most safely applied to decisions that are reversible or low-cost to change. High-stakes, irreversible decisions warrant more rigor.
- **Explicit time-boxing.** Teams set a clear boundary for how long they will invest before delivering. This prevents scope creep and analysis paralysis.
- **Continuous feedback.** A GEFN solution is not abandoned after delivery. It is monitored, measured, and improved based on real usage data.

## GEFN Compared to Other Decision Standards

Understanding GEFN requires distinguishing it from related but different approaches:

| Standard | Definition | When to Use | Risk |
|---|---|---|---|
| **Good Enough For Now** | Meets current requirements; safe to try | Reversible decisions, iterative work, fast-moving environments | May accumulate technical debt if follow-through is neglected |
| **Minimum Viable Product (MVP)** | Smallest product that tests a hypothesis with real users | Early-stage validation, new market entry | Can be mistaken for a finished product |
| **Perfect Solution** | Fully optimized across all known requirements | Safety-critical systems, regulatory compliance | Analysis paralysis, delayed delivery, over-engineering |
| **Quick and Dirty** | Fast implementation with known quality shortcuts | Throwaway prototypes, time-critical emergencies | Often persists far longer than intended; high maintenance cost |
| **Consensus-Driven** | Everyone agrees the solution is the best option | High-trust teams with aligned incentives | Slow, susceptible to groupthink, lowest-common-denominator outcomes |

The key distinction is that GEFN explicitly pairs speed with intentionality. Unlike "quick and dirty," GEFN requires that the solution be genuinely adequate, not merely fast. Unlike consensus, GEFN requires only the absence of reasoned objections, not universal enthusiasm.

## Applying GEFN in Software Development

In software engineering, GEFN manifests in several practical patterns:

- **Feature scoping.** Rather than building a feature with every possible configuration option, teams deliver the version that serves the primary use case. Additional options are added in subsequent iterations based on user demand.
- **Architecture decisions.** A team may choose a simpler architecture that handles current load, with a documented plan for scaling when usage grows. Over-engineering for hypothetical scale wastes resources.
- **Code quality.** Code should be clean, tested, and maintainable, but it does not need exhaustive optimization on the first pass. Premature optimization is a well-documented anti-pattern.
- **Documentation.** A concise README that explains how to set up and use a system is more valuable today than a comprehensive documentation suite that ships six months later.
- **Tool selection.** When choosing between technologies, GEFN favors the tool the team already knows well over the theoretically superior tool that would require weeks of learning.

## Applying GEFN in Management and Governance

Beyond engineering, GEFN is a powerful governance tool:

- **Meeting decisions.** Teams adopt proposals that are safe to try, reducing the time spent debating edge cases that may never occur.
- **Policy design.** Organizations implement policies with built-in review dates rather than attempting to anticipate every scenario in advance.
- **Hiring.** A candidate who meets the core requirements and demonstrates growth potential is hired now rather than leaving the role vacant while searching for a unicorn.
- **Strategic planning.** Quarterly plans are treated as hypotheses to be tested, not commitments etched in stone.

## Benefits of GEFN

- **Faster time to value.** Stakeholders and users receive working solutions sooner.
- **Reduced waste.** Teams avoid investing in features, optimizations, or plans that may prove unnecessary.
- **Better learning.** Real-world feedback from deployed solutions is more reliable than predictions made during planning.
- **Higher morale.** Teams that ship regularly experience a stronger sense of accomplishment than teams trapped in extended development cycles.
- **Lower decision cost.** Meetings become shorter and more productive when the bar is "safe to try" rather than "universally optimal."

## Risks and Mitigations

GEFN is not without risk. The most common failure modes and their countermeasures include:

- **Technical debt accumulation.** If teams consistently deliver GEFN solutions without returning to improve them, quality degrades over time. Mitigation: maintain a visible backlog of improvement items and allocate a fixed percentage of each iteration to paying down debt.
- **Lowered standards.** Teams may use GEFN as a justification for genuinely poor work. Mitigation: define clear minimum quality criteria (test coverage, security review, accessibility) that every GEFN solution must meet.
- **Stakeholder misunderstanding.** Business stakeholders may interpret GEFN as "finished." Mitigation: communicate explicitly that the delivery is an increment, not a final product, and share the roadmap for future iterations.
- **Inappropriate application.** GEFN is unsuitable for safety-critical systems, regulatory submissions, or irreversible infrastructure changes where failure carries severe consequences. Mitigation: classify decisions by reversibility and impact before applying GEFN.

## When GEFN Is Not Appropriate

There are contexts where GEFN should be set aside in favor of more rigorous standards:

- Medical device software subject to FDA regulation
- Financial systems handling transaction integrity and compliance
- Security infrastructure such as authentication, encryption, and access control
- Legal contracts and binding agreements
- Public safety systems including aviation, automotive, and industrial control

In these domains, "good enough" is defined by external regulatory bodies, and the threshold is intentionally set high. GEFN still applies to peripheral decisions within these domains (such as internal tooling or documentation), but the core deliverables require a different standard of completeness.

## Related

Professionals exploring GEFN should also study iterative development and agile software development methodology for the delivery frameworks that GEFN operates within. Minimum viable product (MVP) provides a complementary concept for early-stage validation. Technical debt is the primary risk that GEFN creates when practiced without discipline. Satisficing and bounded rationality from decision theory provide the academic foundations. Sociocracy and consent-based decision-making formalize GEFN as a governance standard. The plan-do-check-act (PDCA) cycle and kaizen offer structured approaches to the continuous improvement that GEFN depends on. Analysis paralysis describes the failure mode that GEFN is designed to prevent.

## Summary

Good Enough For Now is a disciplined approach to decision-making that prioritizes delivering adequate, functional solutions quickly over pursuing perfection at the cost of delay and waste. It is most effective in environments characterized by uncertainty and rapid change, where learning from real-world feedback produces better outcomes than extended upfront planning. GEFN requires clear quality thresholds, explicit plans for iteration, and honest assessment of whether a decision is reversible. When applied with rigor and followed by genuine continuous improvement, GEFN enables technology teams and organizations to move faster, learn more, and deliver greater value over time.

## References

- Simon, H.A. (1956). "Rational Choice and the Structure of the Environment." *Psychological Review*, 63(2), 129-138. Foundational work on satisficing and bounded rationality.
- Beck, K. (2000). *Extreme Programming Explained: Embrace Change*. Addison-Wesley. Articulates the principle of doing the simplest thing that could possibly work.
- Rother, M. (2009). *Toyota Kata: Managing People for Improvement, Adaptiveness, and Superior Results*. McGraw-Hill. Describes iterative improvement cycles in manufacturing and knowledge work.
- Endenburg, G. (1998). *Sociocracy: The Organization of Decision-Making*. Eburon Publishers. Formalizes consent-based decision-making and the GEFN standard in governance.
- Cunningham, W. (1992). "The WyCash Portfolio Management System." *OOPSLA '92 Experience Report*. Introduces the technical debt metaphor and its relationship to incremental delivery.
- Ries, E. (2011). *The Lean Startup*. Crown Business. Popularizes MVP and validated learning as complements to iterative, good-enough delivery.
