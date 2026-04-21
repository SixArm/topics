# Definition of Done (DoD)

The Definition of Done (DoD) is an agile software engineering practice that establishes a shared understanding of what constitutes completed work within a development team. Rather than leaving "done" open to interpretation, the DoD provides a concrete, agreed-upon checklist of criteria that every user story, feature, or increment must satisfy before it can be considered truly finished. For technology professionals working in iterative environments, the DoD is one of the most important mechanisms for maintaining quality, consistency, and trust across a delivery organization.

## Why the Definition of Done Matters

Without a clear Definition of Done, teams suffer from a persistent and damaging ambiguity: one developer's "done" may mean code is written, while another's may mean it is tested, reviewed, documented, and deployed. This misalignment leads to hidden work, accumulated technical debt, and eroded stakeholder confidence.

The DoD resolves this by creating a single source of truth for completion. It serves as a quality gate that every work item must pass through, regardless of who performed the work. When the DoD is consistently enforced, it produces predictable, reliable increments of value and gives stakeholders a credible basis for understanding project progress.

## Common Elements of a Definition of Done

The specific criteria within a DoD vary by team, product, and organization, but most effective DoDs address a common set of concerns. The following table outlines the categories typically included:

| Category | Typical Criteria |
|---|---|
| Code completeness | All acceptance criteria met; no known defects; feature behaves as specified |
| Code review | Peer review completed and approved; review comments addressed |
| Unit testing | Unit tests written and passing; adequate code coverage thresholds met |
| Integration testing | Integration tests passing; no regressions introduced |
| Documentation | Relevant technical documentation updated; API docs current; release notes drafted |
| Performance | Performance benchmarks met; no significant degradation from baseline |
| Security | Security checks completed; no critical or high-severity vulnerabilities |
| Accessibility | Accessibility standards (e.g., WCAG) verified where applicable |
| Deployment readiness | Build passes CI/CD pipeline; artifact is deployable to target environment |
| Product owner acceptance | Product owner has reviewed and accepted the increment |

Teams should treat this list as a starting point and tailor it to their specific context. A team building a regulated medical device will have a far more rigorous DoD than a team prototyping an internal tool.

## Levels of the Definition of Done

The DoD is not a single flat checklist. Mature organizations define it at multiple levels, with each level building upon the previous one. This layered approach ensures that quality is enforced at every granularity of work.

- **Task level**: The individual task is complete, the code compiles, and unit tests pass. This is the narrowest scope and the most frequently applied.
- **User story level**: All tasks within the story are done, acceptance criteria are verified, code review is complete, and integration tests pass. The story delivers a coherent, testable unit of functionality.
- **Sprint level**: All stories accepted into the sprint meet their individual DoDs, the sprint increment is integrated, regression tests pass, and the increment is potentially shippable.
- **Release level**: The accumulated increment satisfies release-specific criteria such as performance validation, security audits, user acceptance testing, compliance checks, and deployment verification.

Each level inherits and extends the criteria of the levels below it. A user story cannot be done if its tasks are not done; a sprint cannot be done if its stories are not done.

## Who Defines the Definition of Done

The DoD must be collaboratively developed. It is not a document imposed by management or dictated by a single role. The most effective DoDs emerge from discussions that include:

- **Developers**, who understand what technical quality requires
- **Testers and QA engineers**, who define verification and validation standards
- **Product owners**, who represent stakeholder expectations and acceptance criteria
- **Scrum masters or agile coaches**, who facilitate the process and help resolve conflicts
- **Operations and DevOps engineers**, who understand deployment and infrastructure constraints

When all of these perspectives contribute, the DoD reflects the true cost and meaning of "done" rather than an idealized or incomplete version.

## Definition of Done vs. Acceptance Criteria

A frequent source of confusion is the relationship between the Definition of Done and acceptance criteria. These are related but distinct concepts:

| Aspect | Definition of Done | Acceptance Criteria |
|---|---|---|
| Scope | Applies uniformly to all work items | Specific to a single user story or feature |
| Content | Quality standards and process gates | Functional requirements and behaviors |
| Authorship | Collaboratively defined by the team | Typically written by the product owner |
| Variability | Stable across sprints; evolves slowly | Different for every story |
| Purpose | Ensures consistent quality | Ensures correct functionality |

Both must be satisfied for work to be considered complete. Acceptance criteria confirm that the right thing was built; the DoD confirms that it was built the right way.

## Applying the DoD in Practice

The Definition of Done is only valuable if it is actively used. Effective teams integrate it into their ceremonies and daily workflow:

- **Sprint planning**: The DoD informs estimation. If the DoD requires security scanning and performance testing, those activities must be accounted for in capacity planning.
- **Daily standups**: Team members reference the DoD when reporting progress. "I finished coding" is insufficient if the DoD requires code review and testing.
- **Sprint review**: The product owner and stakeholders verify that the increment meets the DoD before accepting it. Work that does not meet the DoD is not presented as complete.
- **Retrospectives**: The team periodically reviews the DoD itself. If the DoD is too lax, quality suffers. If it is too strict, velocity drops without proportional quality gains. The DoD should evolve as the team matures.

Teams must resist the temptation to bypass the DoD under deadline pressure. Skipping criteria creates undone work that accumulates as technical debt and erodes the team's ability to deliver reliably in future sprints.

## Common Pitfalls

Several recurring problems undermine the effectiveness of the Definition of Done:

- **Treating the DoD as optional**: If the DoD is routinely overridden, it provides no value. The team must hold itself accountable.
- **Making the DoD too vague**: Criteria like "code is good" or "testing is complete" lack the specificity needed for consistent application. Each criterion should be objectively verifiable.
- **Never updating the DoD**: A static DoD fails to reflect the team's growing capabilities, changing technology, or evolving product requirements.
- **Confusing done with deployed**: In some contexts, "done" means the increment is potentially shippable, not that it has been released to production. The team must be explicit about this distinction.
- **Ignoring non-functional requirements**: A DoD that focuses exclusively on functionality while neglecting performance, security, and accessibility will produce fragile, incomplete increments.

## Related

Technology professionals working with the Definition of Done should also study the **Definition of Ready**, which establishes criteria for when a work item is prepared to enter a sprint. The broader concepts of **acceptance testing**, **continuous integration**, and **continuous delivery** are closely intertwined with the DoD, as they provide the automation and process infrastructure that make the DoD enforceable at scale. Teams practicing **Scrum** or **Kanban** will find the DoD essential to their workflow, and those pursuing **agile maturity models** will recognize the DoD as a foundational practice. Understanding **technical debt**, **code quality metrics**, and **agile metrics** more broadly will provide additional context for why the DoD exists and how to measure its effectiveness.

## Summary

The Definition of Done is a shared agreement within an agile team that specifies the criteria every work item must satisfy before it can be considered complete. It eliminates ambiguity, enforces consistent quality, controls technical debt, and provides stakeholders with a credible measure of progress. The DoD should be collaboratively authored, applied at multiple levels from individual tasks through releases, actively referenced in every agile ceremony, and periodically refined as the team matures. When consistently enforced, it transforms "done" from a subjective claim into an objective, verifiable standard that the entire organization can trust.

## References

- Schwaber, K. & Sutherland, J. (2020). *The Scrum Guide*. Scrum.org. https://scrumguides.org/
- Rubin, K. S. (2012). *Essential Scrum: A Practical Guide to the Most Popular Agile Process*. Addison-Wesley.
- Cohn, M. (2009). *Succeeding with Agile: Software Development Using Scrum*. Addison-Wesley.
- Sutherland, J. (2014). *Scrum: The Art of Doing Twice the Work in Half the Time*. Crown Business.
- Scrum.org. "What is a Definition of Done?" https://www.scrum.org/resources/blog/done-understanding-definition-done
- Agile Alliance. "Definition of Done." https://www.agilealliance.org/glossary/definition-of-done/
