# Agile manifesto 2: Working software

The second value statement of the Agile Manifesto declares: "Working software over comprehensive documentation." This principle sits at the heart of the Agile movement's philosophical shift away from process-heavy, document-driven development toward delivering tangible, functioning products. It does not dismiss documentation entirely but instead reframes the relationship between building software and writing about software. For technology professionals, understanding this principle deeply is essential to making sound decisions about where to invest team effort, how to demonstrate progress, and how to sustain velocity across the life of a project.

## Historical context

Before the Agile Manifesto was published in 2001, most software organizations operated under plan-driven methodologies such as Waterfall, the Rational Unified Process, or various military and government standards like DOD-STD-2167. These frameworks prescribed extensive documentation gates: requirements documents, system design documents, interface control documents, test plans, and user manuals, often running to hundreds or thousands of pages before a single line of code was written.

The result was a pattern where teams spent months or years producing documentation that became stale almost immediately upon completion. Requirements shifted, stakeholders changed their minds, technology evolved, and the carefully written specifications no longer reflected reality. Teams found themselves maintaining two parallel artifacts — the documentation and the software — and the documentation frequently lost. The 17 signatories of the Agile Manifesto drew on decades of collective experience with this dysfunction when they elevated working software above comprehensive documentation.

## What "working software" means

Working software is software that compiles, runs, passes its tests, and delivers value to a user or stakeholder. It is not a mockup, a slide deck, a design document, or a prototype that only functions under controlled conditions. The term implies several concrete qualities:

- **Functional completeness for the increment**: The feature or user story is implemented end-to-end, not left in a half-finished state.
- **Tested and verified**: The software has been validated against acceptance criteria, ideally through automated tests.
- **Deployable**: The increment could, in principle, be released to production or demonstrated to stakeholders.
- **Observable**: Stakeholders can interact with the software, evaluate it, and provide meaningful feedback.

Working software serves as the primary measure of progress in Agile. Unlike a Gantt chart percentage or a requirements traceability matrix, running software provides unambiguous evidence that the team has delivered something real.

## What "comprehensive documentation" means

Comprehensive documentation refers to the traditional practice of creating exhaustive written artifacts at every stage of the development process. This includes detailed requirements specifications, architectural blueprints, interface definitions, test procedure documents, operational runbooks, and user manuals — all produced to a high level of formality and completeness before or alongside development.

The Agile Manifesto does not claim that documentation is worthless. It claims that comprehensive documentation, produced for its own sake or to satisfy process checkboxes, is less valuable than working software. The distinction is between documentation that serves the work and documentation that replaces the work.

## Comparing the two approaches

| Dimension | Working software emphasis | Comprehensive documentation emphasis |
|---|---|---|
| Primary progress indicator | Running, tested increments | Completed documents and sign-offs |
| Feedback mechanism | User interaction with real software | Review meetings on written specifications |
| Response to change | Adjust the next increment | Revise documents, obtain re-approval |
| Risk of misunderstanding | Lower, because behavior is observable | Higher, because interpretation varies |
| Knowledge transfer | Embedded in code, tests, and collaboration | Captured in formal written artifacts |
| Regulatory compliance | Requires deliberate documentation effort | Naturally produces compliance artifacts |
| Onboarding new team members | May require supplementary context | Easier if documents are current and accurate |
| Long-term maintenance | Relies on clean code and automated tests | Relies on up-to-date written descriptions |

## Why working software is prioritized

There are several reasons this ordering matters in practice.

- **Ambiguity resolution**: Written specifications are inherently ambiguous. Two engineers can read the same requirement and build different things. Working software eliminates that ambiguity because behavior is deterministic and observable.
- **Faster feedback loops**: Stakeholders can evaluate working software in minutes. Evaluating a 200-page specification takes days and still leaves uncertainty about whether the final product will match expectations.
- **Reduced waste**: Documentation that no one reads, that duplicates information available elsewhere, or that becomes outdated within a sprint is waste. Working software, by contrast, is always the current state of the product.
- **Motivation and morale**: Teams that ship working software regularly experience a sense of accomplishment. Teams buried in documentation tasks often feel disconnected from the purpose of the project.
- **Market responsiveness**: In competitive environments, the ability to deliver working software quickly determines whether an organization captures or loses market opportunity.

## The role of documentation in Agile

Agile does not eliminate documentation. It redefines the standard for what documentation is worth creating. Effective Agile teams produce documentation that meets specific criteria:

- **It serves a known consumer**: Someone will read and act on it. If no one needs it, it should not exist.
- **It is the most efficient medium**: Sometimes a conversation, a whiteboard sketch, or a comment in code is more effective than a formal document.
- **It is maintained**: Documentation that is written once and never updated is worse than no documentation, because it creates false confidence.
- **It is proportional**: The level of detail matches the level of risk, complexity, or regulatory requirement.

Common documentation practices in mature Agile teams include lightweight architecture decision records, living wikis, README files, inline code comments for non-obvious logic, automated test suites that double as executable specifications, and API documentation generated from code annotations.

## Common misinterpretations

| Misinterpretation | Reality |
|---|---|
| "Agile means no documentation" | Agile means the right documentation at the right time, not zero documentation |
| "Working software is the only deliverable" | Working software is the primary measure of progress, but teams still produce plans, retrospective notes, and architectural guidance |
| "Documentation is always waste" | Documentation required by regulation, contracts, or genuine knowledge transfer needs is not waste |
| "If the code is clean, no documentation is needed" | Clean code explains how; documentation explains why, when, and for whom |
| "We can always document later" | Deferred documentation often never gets written; Agile teams document continuously at a sustainable level |

## Practical strategies for technology professionals

Technology professionals can apply this principle through several concrete practices:

- **Define "done" to include working software**: Every user story or task should result in tested, deployable code. Documentation tasks should be scoped separately and justified explicitly.
- **Use automated tests as living documentation**: A well-written test suite communicates expected behavior more reliably than a specification document. Behavior-driven development frameworks make tests readable by non-technical stakeholders.
- **Adopt lightweight decision records**: When architectural or design decisions need to be preserved, use short, structured records that capture context, decision, and consequences without excessive ceremony.
- **Demonstrate frequently**: Sprint reviews, stakeholder demos, and continuous deployment pipelines ensure that working software is visible to the people who need to evaluate it.
- **Measure documentation value**: Periodically ask whether each document the team produces is being read, is accurate, and is the best medium for the information it contains. Eliminate or simplify documents that fail these tests.
- **Automate documentation generation**: API docs, dependency graphs, and deployment diagrams can be generated from code, reducing manual effort and ensuring accuracy.

## Balancing in regulated environments

In industries such as healthcare, finance, defense, and aerospace, regulatory frameworks mandate specific documentation. The Agile principle does not conflict with these requirements. Instead, it challenges teams to satisfy regulatory obligations efficiently:

- Produce required documents as close to the working software as possible, so they reflect actual behavior rather than aspirational design.
- Use automated tools to generate compliance artifacts from code, tests, and deployment configurations.
- Separate regulatory documentation from internal process documentation, and apply the "just enough" standard only to the latter.
- Engage compliance stakeholders early so that documentation requirements are understood and integrated into sprint planning rather than treated as an afterthought.

## Related

Technology professionals exploring this principle should also study the broader Agile Manifesto and its twelve supporting principles, particularly the emphasis on delivering working software frequently and measuring progress through it. Lean software development and its concept of eliminating waste provide a complementary lens for evaluating documentation practices. Behavior-driven development and test-driven development offer practical techniques for making tests serve as specifications. Continuous integration and continuous delivery practices operationalize the principle by ensuring that working software is always available. Architecture decision records and living documentation patterns address the legitimate need for written knowledge without reverting to heavyweight processes.

## Summary

The second value of the Agile Manifesto prioritizes working software over comprehensive documentation because functioning, tested, deployable code is the most honest and useful measure of progress in software development. Documentation remains important, but its purpose is to support the creation and maintenance of working software, not to substitute for it. Technology professionals who internalize this principle build teams that deliver value faster, waste less effort on artifacts no one uses, and maintain the clarity and discipline to document what genuinely matters. The principle is not an excuse to avoid writing things down; it is a mandate to ensure that every written artifact earns its place by serving a real need.

## References

- Beck, K., et al. (2001). *Manifesto for Agile Software Development*. https://agilemanifesto.org
- Beck, K., et al. (2001). *Principles behind the Agile Manifesto*. https://agilemanifesto.org/principles.html
- Cockburn, A. (2006). *Agile Software Development: The Cooperative Game* (2nd ed.). Addison-Wesley.
- Poppendieck, M., & Poppendieck, T. (2003). *Lean Software Development: An Agile Toolkit*. Addison-Wesley.
- Rubin, K. S. (2012). *Essential Scrum: A Practical Guide to the Most Popular Agile Process*. Addison-Wesley.
- Nygard, M. T. (2011). "Documenting Architecture Decisions." *Cognitect Blog*. https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
