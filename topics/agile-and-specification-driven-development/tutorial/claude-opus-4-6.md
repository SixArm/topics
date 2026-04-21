# Agile and specification-driven development (SDD)

Agile and specification-driven development (SDD) is an emerging methodology that combines structured upfront requirements with iterative, AI-assisted coding to prevent hallucinations and costly errors. It treats specifications as contracts that define scope, constraints, and testable acceptance criteria, which AI agents then implement to produce high-quality, maintainable code. SDD bridges the gap between Agile's preference for minimal documentation and the structured clarity that AI coding agents require to operate effectively.

## Why SDD Exists

Traditional Agile methodologies minimized documentation because human developers could hold context, make judgment calls, and ask clarifying questions in real time. AI agents cannot do any of these things reliably. When an AI coding agent receives a vague user story like "improve the login flow," it may hallucinate requirements, introduce unauthorized features, or deviate from architectural constraints. SDD addresses this by providing structured specifications that serve as guardrails, giving AI the clarity it needs while preserving iterative delivery, frequent feedback, and the ability to adapt.

The result is faster iteration with the necessary structure for AI to generate not just code quickly, but the correct code.

## Core Principles

SDD rests on several foundational principles that distinguish it from both traditional Waterfall documentation and conventional Agile user stories:

- **Specs written for AI consumption.** Specifications are authored primarily for AI agents to follow, reducing guesswork and unauthorized deviations. They are precise, unambiguous, and machine-parseable.
- **Living documentation.** Unlike traditional rigid requirements documents, SDD specs are maintained in Markdown and continually updated as development proceeds. They evolve with the codebase.
- **Small, manageable tasks.** Work is divided into discrete units, often following lightweight frameworks such as openspec or spec kit, ensuring each task is independently implementable and verifiable.
- **Testable acceptance criteria.** Each specification clearly states how the work will be verified, frequently using Behavior-Driven Development (BDD) techniques like Given/When/Then scenarios.
- **Human review gates.** Specifications are reviewed and approved by humans before AI execution begins, maintaining human oversight and architectural coherence.

## The Research-Plan-Execute Workflow

The workflow in AI-assisted SDD follows a structured cycle that balances thoroughness with agility:

| Phase | Actor | Activities | Output |
|-------|-------|-----------|--------|
| Research | AI agent | Reviews current codebase, identifies dependencies, understands context and constraints | Context summary, risk assessment |
| Plan | Human + AI | Writes detailed plan outlining constraints, goals, acceptance criteria, and architectural boundaries | Approved specification document |
| Execute | AI agent | Generates functional code using the approved spec as a guardrail | Implementation matching spec |
| Verify | Human + AI | Runs acceptance criteria, reviews code against spec, checks for deviations | Validated deliverable |
| Update | Human | Updates spec to reflect any changes discovered during execution | Revised living documentation |

This cycle repeats for each small task, enabling rapid iteration while maintaining specification integrity.

## SDD Compared to Other Approaches

| Dimension | Traditional Waterfall | Conventional Agile | Specification-Driven Development |
|-----------|----------------------|-------------------|----------------------------------|
| Documentation volume | Heavy, upfront, static | Minimal, just enough | Moderate, living, machine-readable |
| Change tolerance | Low, change is costly | High, change is expected | High, specs evolve iteratively |
| Primary audience for docs | Humans (stakeholders, developers) | Humans (team members) | AI agents (with human review) |
| Verification method | Phase-gate testing | Continuous integration, TDD | BDD-style acceptance criteria per spec |
| Feedback loop | Long (months) | Short (sprints) | Very short (per-task) |
| Risk of scope drift | Low but inflexible | Moderate | Low due to spec constraints |
| AI compatibility | Poor (too verbose, ambiguous) | Poor (too implicit) | High (explicit, structured) |

## Specification Formats and Frameworks

SDD practitioners typically use lightweight, text-based formats that are both human-readable and machine-parseable:

- **Markdown specifications.** Plain Markdown files stored alongside the codebase, versioned in Git, and structured with clear headings for context, constraints, acceptance criteria, and implementation notes.
- **openspec.** A lightweight framework for writing specifications that AI agents can consume directly, emphasizing clarity, constraint definition, and testability.
- **Spec kit.** A toolkit approach that provides templates and conventions for structuring specifications at different granularities, from high-level feature specs to detailed task specs.
- **BDD scenarios.** Given/When/Then scenarios embedded within specifications to define exact expected behaviors in a format that maps directly to automated tests.

## Addressing the Waterfall Criticism

Critics sometimes characterize SDD as a return to Waterfall thinking, arguing that writing specifications before coding contradicts Agile values. Proponents counter with several key distinctions:

- SDD specifications are scoped to small tasks, not entire projects. A spec might cover a single API endpoint or UI component, not a six-month release.
- Specifications are living documents that change as understanding evolves, not frozen contracts that require change-request bureaucracy.
- The iterative cycle of research-plan-execute-verify mirrors Agile sprints but at a finer granularity.
- The motivation is practical, not philosophical. AI agents produce better output with explicit constraints, just as human developers produce better output with clear acceptance criteria.

SDD is not anti-Agile. It is Agile adapted to a world where the implementer is an AI agent that benefits from explicit structure rather than implicit team knowledge.

## Best Practices for Adoption

- Start with a single team or project to build familiarity before scaling SDD across an organization.
- Keep specifications concise. A good spec for a single task should fit on one screen. If it grows longer, split the task.
- Store specifications in the repository alongside the code they describe, enabling version control and co-evolution.
- Use acceptance criteria as the bridge between specification and verification. Every criterion should be testable without ambiguity.
- Review specifications collaboratively. The act of writing and reviewing a spec often surfaces design issues before any code is written.
- Treat specification writing as a first-class engineering activity, not overhead. The time invested in a clear spec is recovered many times over in reduced rework and fewer AI hallucinations.

## Related

Topics to explore next include Behavior-Driven Development (BDD) for deeper understanding of Given/When/Then acceptance criteria, test-driven development (TDD) as a complementary verification practice, AI-assisted coding workflows and prompt engineering for developer tools, Agile and governance for balancing structure with flexibility, Agile and compliance for regulated environments that benefit from specification rigor, and living documentation practices that keep specs synchronized with evolving codebases.

## Summary

Specification-driven development represents a pragmatic evolution of Agile methodology for the age of AI-assisted coding. By providing structured, living specifications that serve as contracts for AI agents, teams achieve faster iteration without sacrificing correctness. SDD preserves Agile's core values of iterative delivery, frequent feedback, and adaptability while adding the explicit structure that AI implementers require. Organizations adopting AI coding tools will find SDD a natural bridge between the flexibility of Agile and the precision needed to harness AI effectively.

## References

- Beck, K. et al. (2001). *Manifesto for Agile Software Development*. https://agilemanifesto.org
- North, D. (2006). "Introducing BDD." https://dannorth.net/introducing-bdd/
- Wynne, M. & Hellesoy, A. (2012). *The Cucumber Book: Behaviour-Driven Development for Testers and Developers*. Pragmatic Bookshelf.
- openspec project. "Lightweight specifications for AI-assisted development." https://github.com/openspec
- Anthropic. (2025). "Best practices for AI-assisted software development." https://docs.anthropic.com
- Fowler, M. (2005). "The New Methodology." https://martinfowler.com/articles/newMethodology.html
- Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley.
