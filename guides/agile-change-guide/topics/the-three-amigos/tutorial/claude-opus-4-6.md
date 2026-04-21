# The Three Amigos for agile software

The Three Amigos is a collaborative practice in agile software development that brings together three key perspectives — business, development, and testing — to ensure comprehensive understanding of user stories and requirements before implementation begins. Originating from the agile and behavior-driven development (BDD) communities, the practice recognizes that no single role holds a complete picture of what needs to be built, how it should work, and how it should be validated. By convening a brief, structured conversation among three complementary viewpoints, teams surface assumptions, resolve ambiguities, and align on acceptance criteria early enough to prevent costly rework downstream.

## The Three Roles

Each participant in a Three Amigos session represents a distinct perspective essential to delivering working software that meets business needs.

| Role | Primary Focus | Key Questions Asked |
|------|--------------|-------------------|
| Business Analyst (or Product Owner) | What to build and why; customer value | "What problem does this solve?" "What does success look like?" |
| Developer | How to build it; technical feasibility | "What are the constraints?" "How does this fit the architecture?" |
| Tester (QA) | How to validate it; failure scenarios | "What could go wrong?" "How do we know it works?" |

- The **business analyst** ensures the feature is anchored in real user needs and business value. They articulate the "what" and "why," clarify priority, and confirm that the story aligns with broader product goals.
- The **developer** evaluates technical feasibility, identifies dependencies, estimates complexity, and raises architectural concerns. They translate requirements into a mental model of implementation.
- The **tester** thinks adversarially, probing for edge cases, boundary conditions, missing scenarios, and unstated assumptions. They ensure the team defines clear, testable acceptance criteria before a single line of code is written.

## How a Session Works

A Three Amigos session is a focused, time-boxed conversation — typically lasting 30 to 60 minutes — held before a user story enters active development. The session follows a general flow:

1. **Story presentation.** The business analyst walks through the user story, explaining the context, the user need, and the desired outcome.
2. **Collaborative questioning.** The developer and tester ask clarifying questions. The group discusses technical constraints, edge cases, and scenarios the original story may not have addressed.
3. **Example generation.** The team creates concrete examples that illustrate expected behavior, including both happy paths and failure scenarios. These examples often become the basis for acceptance tests.
4. **Acceptance criteria refinement.** The group converges on a shared set of acceptance criteria that are specific, testable, and mutually understood.
5. **Action items.** Any unresolved questions, dependencies, or risks are captured for follow-up.

Sessions can be held per individual story or for a batch of related stories. The key constraint is that the conversation remains focused and does not devolve into design-by-committee or premature solution architecture.

## Benefits

The Three Amigos practice delivers measurable improvements across several dimensions of software delivery:

- **Reduced rework.** By identifying misunderstandings and gaps before development starts, teams avoid building the wrong thing. Studies in agile organizations consistently show that defects caught in requirements are orders of magnitude cheaper to fix than those caught in production.
- **Fewer defects.** The tester's early involvement means edge cases and failure scenarios are considered from the outset, not discovered late in a testing phase.
- **Improved communication.** The practice breaks down silos between business, engineering, and quality assurance. Participants build shared vocabulary and mutual understanding of the problem domain.
- **Faster delivery.** Although the session itself takes time, it eliminates the back-and-forth that occurs when developers discover mid-sprint that requirements are ambiguous or incomplete.
- **Shared ownership of quality.** Quality becomes a team responsibility rather than something delegated solely to QA. Everyone leaves the session with a common definition of "done."

## Common Pitfalls

| Pitfall | Description | Mitigation |
|---------|-------------|------------|
| Skipping the session under time pressure | Teams treat Three Amigos as optional when deadlines loom, leading to the very rework the practice prevents. | Make sessions a non-negotiable part of backlog refinement. |
| Turning it into a design meeting | The conversation drifts into detailed technical design or solution architecture. | Keep the focus on "what" and "how we validate," not "how we build." |
| Wrong participants | Substituting a proxy who lacks decision-making authority or domain knowledge. | Ensure the actual analyst, developer, and tester for the story attend. |
| Overly large groups | Adding too many people dilutes focus and slows the conversation. | Limit attendance to three core participants plus one or two observers if needed. |
| No documented output | The conversation produces insights that are never captured. | Record acceptance criteria and examples directly in the story or a shared artifact. |

## Integration with Other Practices

The Three Amigos practice reinforces and is reinforced by several complementary agile practices:

- **Behavior-Driven Development (BDD).** Three Amigos conversations naturally produce the concrete examples that BDD formalizes as executable specifications written in Given-When-Then format. The session is often considered the "discovery" phase of BDD.
- **Acceptance Test-Driven Development (ATDD).** The acceptance criteria and examples generated during a Three Amigos session serve as the starting point for acceptance tests that are written before implementation begins.
- **Backlog refinement.** Three Amigos can be embedded within regular backlog refinement ceremonies, ensuring stories are fully elaborated before sprint planning.
- **Definition of Ready.** Many teams include "Three Amigos session completed" as a criterion in their Definition of Ready, ensuring no story enters a sprint without collaborative review.

## When to Use It

The Three Amigos practice is most valuable in the following contexts:

- Stories with complex business logic, multiple user paths, or significant technical uncertainty.
- Cross-functional teams where business, development, and testing are performed by different individuals or groups.
- Organizations transitioning from waterfall to agile, where handoff-based workflows have historically caused misalignment.
- Any environment where rework due to misunderstood requirements is a recurring problem.

For trivially simple stories — such as minor text changes or well-understood configuration updates — a full Three Amigos session may be unnecessary. Teams should use judgment and scale the practice to the complexity of the work.

## Related

Teams looking to deepen their understanding of the Three Amigos practice should explore behavior-driven development (BDD) and acceptance test-driven development (ATDD) as natural extensions. Understanding user stories, acceptance criteria, and the Definition of Ready provides essential context. Broader agile practices such as backlog refinement, sprint planning, and retrospectives form the ecosystem in which Three Amigos operates. For collaboration techniques, consider exploring pair programming, mob programming, and the practice of example mapping, which provides a structured format for the kind of example generation that Three Amigos encourages.

## Summary

The Three Amigos is a lightweight, high-impact agile practice that brings together a business analyst, a developer, and a tester for a focused conversation before implementation begins. By combining the "what," "how," and "how do we validate" perspectives in a single time-boxed session, teams uncover assumptions, clarify requirements, generate testable examples, and align on acceptance criteria. The result is fewer defects, less rework, faster delivery, and a culture of shared quality ownership — all achieved through the simple act of having the right conversation at the right time with the right people.

## References

- Beck, K. and Andres, C. (2004). *Extreme Programming Explained: Embrace Change*. Addison-Wesley. Foundational text on collaborative development practices.
- North, D. (2006). "Introducing BDD." Dan North & Associates. https://dannorth.net/introducing-bdd/ — The original articulation of behavior-driven development and its connection to collaborative story elaboration.
- Adzic, G. (2011). *Specification by Example: How Successful Teams Deliver the Right Software*. Manning Publications. Covers the practice of generating concrete examples collaboratively, which is central to Three Amigos sessions.
- Wynne, M. and Hellesoy, A. (2012). *The Cucumber Book: Behaviour-Driven Development for Testers and Developers*. Pragmatic Bookshelf. Practical guide to BDD that discusses the Three Amigos practice in context.
- Cohn, M. (2004). *User Stories Applied: For Agile Software Development*. Addison-Wesley. Comprehensive treatment of user stories, acceptance criteria, and collaborative refinement.
- Agile Alliance. "Three Amigos." Agile Alliance Glossary. https://www.agilealliance.org/glossary/three-amigos/ — Community-maintained definition and discussion of the practice.
