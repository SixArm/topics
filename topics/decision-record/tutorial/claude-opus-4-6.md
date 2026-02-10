Here is the tutorial:

# Decision record (DR)

A decision record (DR) is a structured document that captures the reasoning, context, and outcome of a significant decision within a team, project, or organization. Decision records serve as a permanent audit trail that preserves institutional knowledge, provides accountability, and ensures that future team members can understand why a particular path was chosen. In technology organizations, where decisions about architecture, tooling, processes, and trade-offs accumulate rapidly, decision records prevent knowledge loss and reduce the risk of revisiting settled questions without new information.

## Why decision records matter

Technology teams make hundreds of consequential decisions over the lifecycle of a product. Without documentation, the rationale behind those decisions lives only in the memories of the people who made them. When those people leave, change roles, or simply forget, the organization loses critical context. Decision records solve this problem by creating a durable, searchable repository of decisions and their justifications.

A well-maintained set of decision records accelerates onboarding, reduces meeting time spent re-explaining past choices, and gives leadership visibility into how and why the team operates the way it does. They also protect teams from hindsight bias: when a decision leads to an unexpected outcome, the original record makes it possible to evaluate the decision based on what was known at the time, rather than what is known now.

## Core components of a decision record

A typical decision record includes the following elements, though templates vary across organizations:

| Component | Purpose |
|---|---|
| **Title** | A concise, descriptive name for the decision |
| **Date** | When the decision was made |
| **Status** | Whether the decision is proposed, accepted, deprecated, or superseded |
| **Context** | The circumstances, constraints, and forces that prompted the decision |
| **Decision** | A clear statement of what was decided |
| **Rationale** | The reasoning behind the decision, including alternatives considered |
| **Consequences** | The expected outcomes, trade-offs, and risks |
| **Stakeholders** | The people involved in or affected by the decision |
| **Implementation notes** | Guidance for the people who will carry out the decision |

Not every decision record needs every component. Lightweight records for routine decisions may include only a title, context, decision, and rationale. More consequential decisions warrant the full set.

## Types of decision records

Decision records appear under several names depending on the domain and the scope of what they document:

- **Architecture Decision Record (ADR)**: Focused specifically on software architecture choices such as technology selection, system boundaries, data storage strategies, and integration patterns. ADRs are the most widely adopted form in software engineering and are frequently stored alongside source code in version control.

- **Technical Decision Record (TDR)**: Broader than ADRs, covering decisions about tooling, infrastructure, development workflows, testing strategies, and operational procedures.

- **Business Decision Record (BDR)**: Captures decisions related to product direction, market strategy, pricing, partnerships, and organizational structure.

- **General Decision Record (DR)**: A catch-all format suitable for any decision that benefits from documentation, regardless of domain.

## When to write a decision record

Not every decision warrants a formal record. The following criteria help teams decide when documentation is worthwhile:

- The decision is difficult to reverse or expensive to change later
- The decision affects multiple teams, services, or stakeholders
- The team debated multiple viable alternatives before reaching consensus
- The decision establishes a precedent that future decisions will reference
- Regulatory, compliance, or contractual requirements demand an audit trail
- The decision resolves a recurring question or disagreement

Conversely, decisions that are easily reversible, affect only a single person, or follow an already-documented policy generally do not need their own records.

## Benefits of maintaining decision records

- **Transparency**: Decision records make the decision-making process visible to everyone in the organization, building trust and accountability across teams and leadership levels.

- **Institutional memory**: When team composition changes, decision records preserve the context and reasoning that would otherwise be lost, preventing costly repetition of past analysis.

- **Consistency**: By documenting the criteria and process used for past decisions, teams can apply similar rigor and standards to future decisions, reducing arbitrary variation.

- **Faster onboarding**: New team members can read through decision records to quickly understand the current state of the system and why it evolved the way it did.

- **Reduced meeting overhead**: Teams spend less time re-explaining or re-debating settled decisions when a clear record exists that anyone can reference asynchronously.

- **Improved decision quality**: The discipline of writing down context, alternatives, and trade-offs forces more rigorous thinking at the time of the decision itself.

## How to write an effective decision record

Writing a good decision record is a skill that improves with practice. The following guidelines help produce records that remain useful over time:

**Be specific about context.** State the constraints, deadlines, team capabilities, and business pressures that shaped the decision. A decision that seems irrational in a vacuum often makes perfect sense when the context is clear.

**Document the alternatives you rejected.** Future readers will want to know not just what you decided, but what you decided against and why. This prevents teams from repeatedly proposing options that were already evaluated and found wanting.

**State consequences honestly.** Every decision involves trade-offs. Acknowledge the downsides and risks alongside the benefits. This builds credibility and gives future teams the information they need to reassess the decision if circumstances change.

**Use plain language.** Decision records are read by people with different levels of expertise and different organizational roles. Avoid jargon where possible, and define technical terms when they are unavoidable.

**Keep records immutable.** Once a decision is accepted, do not edit the original record to reflect new information. Instead, create a new decision record that supersedes the original, linking back to it. This preserves the historical record and makes the evolution of thinking visible.

## Decision record lifecycle

Decision records move through a defined set of statuses over their lifetime:

| Status | Meaning |
|---|---|
| **Proposed** | The decision has been drafted and is under review by stakeholders |
| **Accepted** | The decision has been approved and is in effect |
| **Deprecated** | The decision is no longer recommended but has not been formally replaced |
| **Superseded** | A newer decision record has replaced this one; the record links to its successor |
| **Rejected** | The proposed decision was evaluated and not adopted |

Tracking status explicitly prevents confusion about which decisions are current and which are historical artifacts.

## Tools and storage

Decision records can be managed with a range of tools, from simple to sophisticated:

- **Markdown files in version control**: The most common approach in software teams. Decision records live alongside the code they describe, benefit from pull request review workflows, and are versioned automatically. Directories like `docs/decisions/` or `docs/adr/` are conventional locations.

- **Wiki platforms**: Tools such as Confluence, Notion, or internal wikis work well for organizations that prefer a web-based interface and need cross-team visibility without requiring access to a code repository.

- **Spreadsheets**: Suitable for small teams or non-technical stakeholders who need a tabular overview of decisions without the overhead of a dedicated tool.

- **Dedicated decision management tools**: Specialized platforms that provide templates, search, tagging, and reporting capabilities for organizations with large volumes of decisions to track.

The choice of tool matters less than the consistency of use. A simple system that the team actually maintains is far more valuable than a sophisticated system that falls into disuse.

## Common pitfalls

- **Writing records after the fact**: Decision records are most valuable when written at the time of the decision. Retroactive documentation tends to omit the alternatives considered and the nuances of the original context.

- **Recording too many decisions**: If every trivial choice gets a record, the important decisions become harder to find. Apply the criteria for when to write a record and resist the urge to document everything.

- **Treating records as proposals**: A decision record documents a decision that has been made. It is not a request for permission or a design document. Conflating these purposes dilutes the value of each.

- **Neglecting to update status**: A decision record marked as accepted that was actually superseded months ago creates confusion. Regular review of decision record status is essential.

- **Omitting the rationale**: A record that states what was decided but not why is only marginally useful. The rationale is the most important part of the document.

## Related

After understanding decision records, explore these related topics: architecture decision records (ADRs) for a deeper look at the most widely adopted variant in software engineering; request for comments (RFC) processes for how organizations solicit feedback before finalizing decisions; technical debt and design debt for understanding the long-term consequences that decision records help track; governance frameworks for the organizational structures that define who has authority to make which decisions; project management methodologies such as Agile and PRINCE2 for how decision records fit into broader project workflows; and knowledge management for the discipline of preserving and sharing organizational learning.

## Summary

A decision record is a structured document that captures the context, rationale, alternatives considered, and consequences of a significant decision. By maintaining decision records consistently, technology teams preserve institutional knowledge, improve transparency, accelerate onboarding, and raise the quality of future decisions. The practice requires minimal tooling, scales from individual teams to entire enterprises, and delivers compounding value as the corpus of documented decisions grows. The key to success is not the format or the tool but the discipline of writing records at the time decisions are made and keeping them honest about trade-offs and uncertainties.

## References

- Nygard, Michael. "Documenting Architecture Decisions." Cognitect Blog, November 2011. The original article that popularized Architecture Decision Records (ADRs) in software engineering.
- Keeling, Michael. "Design It!: From Programmer to Software Architect." Pragmatic Bookshelf, 2017. Covers decision records as part of a broader approach to software architecture practice.
- ThoughtWorks Technology Radar. "Lightweight Architecture Decision Records." ThoughtWorks, ongoing. Recommends ADRs as a technique for documenting architecture decisions in an accessible, version-controlled format.
- Tyree, Jeff, and Art Akerman. "Architecture Decisions: Demystifying Architecture." IEEE Software, vol. 22, no. 2, March/April 2005. An early academic treatment of documenting architecture decisions systematically.
- Joel Parker Henderson. "Architecture Decision Record (ADR)." GitHub, https://github.com/joelparkerhenderson/architecture-decision-record. A community-maintained collection of ADR templates, examples, and tooling references.
