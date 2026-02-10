# Definition of Ready (DoR)

## Introduction

The Definition of Ready (DoR) is a shared agreement within an agile team that specifies the criteria a user story, feature, or work item must satisfy before it can be pulled into a development sprint. It acts as a quality gate between product backlog refinement and sprint execution, ensuring that developers can begin work immediately without being blocked by ambiguous requirements, unresolved dependencies, or missing assets. When applied consistently, the DoR reduces mid-sprint disruptions, improves estimation accuracy, and strengthens trust between product owners, developers, and stakeholders. It is the counterpart to the Definition of Done: where the Definition of Done governs when work is complete, the Definition of Ready governs when work can begin.

## Why a Definition of Ready Matters

Teams that skip readiness checks often experience a predictable set of problems: stories are pulled into sprints with vague acceptance criteria, developers discover missing designs or unresolved technical dependencies partway through the iteration, and scope creep emerges because requirements were never pinned down. These problems cascade into missed sprint commitments, increased context-switching, and eroded stakeholder confidence.

A well-crafted DoR addresses these issues directly. It forces upstream preparation, ensures that the product owner has thought through business value and acceptance criteria, and gives the development team confidence that they can deliver within the sprint timebox. The result is smoother sprint planning sessions, fewer mid-sprint surprises, and more predictable velocity.

## Common DoR Criteria

While every team should tailor its criteria, the following elements appear frequently across mature agile teams:

- **User story is clearly written** following a consistent format (e.g., "As a [role], I want [goal], so that [benefit]").
- **Acceptance criteria are defined** and are specific, testable, and agreed upon by the product owner and the team.
- **Business value is articulated** so the team understands why the work matters and can make informed trade-off decisions.
- **Story is appropriately sized** to be completable within a single sprint; if not, it should be split.
- **Dependencies are identified and resolved** or have a concrete plan for resolution before the sprint begins.
- **UI/UX designs or mockups are available** if the story involves user-facing changes.
- **Technical specifications or architecture decisions are documented** where the story involves non-trivial technical work.
- **Spike or research work is completed** if the story required investigation to reduce uncertainty.
- **Performance, security, and compliance considerations are addressed** where applicable.
- **The team has reviewed the story** during backlog refinement and has no outstanding questions.

## DoR Compared to Definition of Done

The Definition of Ready and Definition of Done are complementary quality gates that bookend the development process. Understanding their relationship clarifies their distinct purposes.

| Dimension | Definition of Ready (DoR) | Definition of Done (DoD) |
|---|---|---|
| **Purpose** | Confirms a work item is prepared for development | Confirms a work item is complete and shippable |
| **Timing** | Applied before a sprint or iteration begins | Applied at the end of a sprint or when work is finished |
| **Owner** | Primarily the product owner, supported by the team | Primarily the development team, validated by the product owner |
| **Focus** | Requirements clarity, dependency resolution, sizing | Code quality, testing, documentation, deployment readiness |
| **Failure mode** | Blocks entry into the sprint | Blocks release or acceptance of the increment |
| **Review cadence** | During backlog refinement and sprint planning | During sprint review and retrospective |

## Levels of Readiness

Not all work items require the same depth of preparation. Teams can apply a tiered readiness model that matches the level of scrutiny to the complexity and risk of the work.

| Readiness Level | Typical Work Items | Criteria Emphasis |
|---|---|---|
| **Lightweight** | Bug fixes, minor UI tweaks, small configuration changes | Clear description, reproduction steps (for bugs), acceptance criteria |
| **Standard** | Feature stories, moderate enhancements | Full acceptance criteria, designs available, sized, dependencies resolved |
| **Comprehensive** | Cross-team features, infrastructure changes, security-sensitive work | Architecture review, security assessment, performance benchmarks, stakeholder sign-off |

This tiered approach prevents the DoR from becoming a bottleneck for simple work while ensuring that high-risk items receive the scrutiny they demand.

## Implementing a DoR in Practice

Introducing a Definition of Ready requires deliberate facilitation and team buy-in. The following steps represent a practical adoption path:

- **Start with a retrospective discussion.** Identify recent sprint failures caused by unready work. Use concrete examples to build shared understanding of the problem.
- **Draft initial criteria collaboratively.** The entire team, including the product owner, developers, testers, and designers, should contribute. Avoid importing a generic checklist from the internet without tailoring it.
- **Keep the initial criteria minimal.** Start with five to seven criteria that address the most frequent pain points. Expand only after the team has practiced with the initial set.
- **Make readiness visible.** Display the DoR in the team's workspace or sprint planning board. Some teams use a checklist on each backlog item; others use a readiness column in their tracking tool.
- **Enforce the gate without rigidity.** If a story does not meet the DoR at sprint planning, it should not enter the sprint. However, the team should discuss whether a minor gap can be resolved in the first day of the sprint versus requiring a full deferral.
- **Review and adapt regularly.** Include the DoR in retrospective discussions. Remove criteria that add overhead without value. Add criteria when new failure patterns emerge.

## Common Pitfalls

Teams adopting a Definition of Ready often encounter several recurring mistakes:

- **Over-engineering the DoR.** A checklist with twenty items creates a bureaucratic barrier that slows delivery and discourages product owners from preparing stories. Fewer, higher-impact criteria are more effective than exhaustive lists.
- **Treating the DoR as a contract rather than a conversation.** The DoR should facilitate discussion during refinement, not serve as a legalistic gate that prevents collaboration. If the team and product owner cannot talk through gaps, the process has failed.
- **Applying uniform criteria to all work.** A one-size-fits-all DoR penalizes simple work with unnecessary overhead and under-prepares complex work. Use tiered readiness or adapt criteria by story type.
- **Neglecting to update the DoR.** A stale DoR that reflects the team's challenges from six months ago rather than its current pain points loses relevance. Review it quarterly at minimum.
- **Using the DoR to shift blame.** The DoR should be a tool for shared accountability, not a mechanism for developers to reject work or for product owners to claim they have done their part. Both sides own readiness.

## Balancing Readiness with Agility

An overly strict Definition of Ready can conflict with agile principles, particularly the emphasis on responding to change and delivering working software frequently. If preparing a story to meet the DoR takes longer than developing it, the process has become counterproductive.

The key balance point is this: the DoR should reduce waste, not create it. Stories should be prepared enough that the team can start and finish them within the sprint without significant rework or blocking. They do not need to be specified to the level of a waterfall requirements document. Ambiguity that can be resolved through a brief conversation during the sprint is acceptable; ambiguity that will require days of investigation is not.

Teams should periodically ask themselves: "Is our DoR helping us deliver better, or is it slowing us down?" If the answer is the latter, it is time to simplify.

## Related

Teams working with a Definition of Ready should also study the **Definition of Done** for the complementary exit criteria, **backlog refinement** (also called backlog grooming) for the process of preparing stories to meet the DoR, **acceptance criteria** for techniques on writing testable conditions, **user stories** for effective story formats and splitting strategies, **INVEST criteria** (Independent, Negotiable, Valuable, Estimable, Small, Testable) for evaluating story quality, **sprint planning** for how ready stories flow into iterations, and **agile estimation** techniques such as planning poker and T-shirt sizing for the sizing component of readiness.

## Summary

The Definition of Ready is a team-owned quality gate that ensures work items are sufficiently prepared before entering a sprint. It reduces mid-sprint disruptions, improves estimation confidence, and creates shared accountability between product owners and development teams. Effective DoR criteria are minimal, tailored to the team's actual pain points, and regularly reviewed. The best implementations balance thoroughness with agility, preventing waste from both under-prepared and over-specified work. Like all agile practices, the DoR is a living agreement that should evolve as the team matures and its context changes.

## References

- Schwaber, K. and Sutherland, J. (2020). *The Scrum Guide*. https://scrumguides.org/
- Rubin, K. S. (2012). *Essential Scrum: A Practical Guide to the Most Popular Agile Process*. Addison-Wesley Professional.
- Cohn, M. (2004). *User Stories Applied: For Agile Software Development*. Addison-Wesley Professional.
- Adzic, G. (2009). *Bridging the Communication Gap: Specification by Example and Agile Acceptance Testing*. Neuri Limited.
- Agile Alliance. "Definition of Ready." https://www.agilealliance.org/glossary/definition-of-ready/
- Scaled Agile Framework. "Definition of Ready." https://scaledagileframework.com/
