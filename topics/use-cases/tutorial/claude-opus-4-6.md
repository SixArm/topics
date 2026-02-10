# Use cases

A use case is a structured technique in software and systems engineering that describes how an actor — a user, external system, or device — interacts with a system to achieve a specific goal. Use cases capture the functional requirements of a product by defining the sequence of steps, inputs, outputs, and participants involved in completing a task. Originating from Ivar Jacobson's work in the early 1990s and later formalized within the Unified Modeling Language (UML), use cases remain one of the most widely adopted methods for requirements elicitation, system design, and validation across the technology industry.

## Why use cases matter

Use cases bridge the gap between stakeholders who express needs in business language and engineers who build systems in technical language. They force clarity: rather than describing what a system *is*, a use case describes what a system *does* from the perspective of someone trying to accomplish a goal. This orientation toward observable behavior makes use cases valuable for requirements gathering, acceptance testing, scope management, and cross-team communication.

Without use cases, development teams risk building features that satisfy technical specifications but miss the actual workflows users need. Use cases anchor design decisions in real-world interactions and provide traceable artifacts that connect business goals to implemented functionality.

## Core elements of a use case

Every well-formed use case contains a set of standard elements that provide structure and consistency.

| Element | Description |
|---|---|
| **Use case name** | A concise, verb-phrase title that describes the goal (e.g., "Place Order") |
| **Actor** | The person, system, or device that initiates or participates in the interaction |
| **Preconditions** | Conditions that must be true before the use case can begin |
| **Postconditions** | The state of the system after the use case completes successfully |
| **Main success scenario** | The step-by-step sequence of interactions under normal conditions |
| **Extensions (alternate flows)** | Branches that handle variations, errors, or exceptional conditions |
| **Trigger** | The event or action that initiates the use case |
| **Stakeholders and interests** | Who cares about the outcome and why |

A use case is not a single sentence. It is a structured narrative that follows the interaction from trigger through completion, accounting for what happens when things go right and when they go wrong.

## Types of use cases

Use cases vary in scope and detail depending on where they are used in the development lifecycle.

- **Brief use case**: A one-paragraph summary that captures the main success scenario. Useful during early discovery when the team is identifying candidate features and estimating scope.

- **Casual use case**: An informal, multi-paragraph description covering the main scenario and key alternate flows. Suitable for internal team discussions and lightweight documentation.

- **Fully dressed use case**: A comprehensive, structured document with all elements filled in — preconditions, postconditions, main success scenario, every extension, business rules, data requirements, and frequency of occurrence. Used when precision matters, such as in regulated industries, contract-based development, or safety-critical systems.

From a behavioral perspective, use cases also divide into functional categories:

- **Functional (primary) use cases**: Describe how the system behaves under normal, expected conditions.
- **Alternate use cases**: Describe how the system handles different but anticipated variations in the workflow.
- **Exception use cases**: Describe how the system responds to errors, invalid input, timeouts, and other failure conditions.

## Use case analysis process

Developing use cases is not a one-time activity. It follows a disciplined process that iterates as understanding deepens.

1. **Identify actors**: Determine every person, role, or external system that interacts with the system under design. Distinguish between primary actors (who initiate the use case to achieve a goal) and supporting actors (who provide a service to the system during the use case).

2. **Define use cases**: For each actor, identify the goals they need to accomplish. Each goal typically maps to one use case. Name each use case with a verb phrase that reflects the actor's intent.

3. **Describe the main success scenario**: Write the step-by-step "happy path" — the sequence of interactions that occurs when everything goes as expected.

4. **Identify extensions and alternate flows**: For each step in the main scenario, ask what could go wrong or differ. Document each variation as a numbered extension.

5. **Prioritize use cases**: Rank use cases by business value, risk, and architectural significance. High-priority use cases drive early iterations.

6. **Validate with stakeholders**: Walk through each use case with business owners, end users, and testers to confirm accuracy and completeness.

## Use case diagrams

A use case diagram is a UML behavioral diagram that provides a high-level visual overview of the system's functionality. It is not a replacement for the written use case — it is a summary that shows actors, use cases, and the relationships between them at a glance.

The key elements of a use case diagram are:

- **Actors**: Represented as stick figures, positioned outside the system boundary.
- **Use cases**: Represented as labeled ovals inside the system boundary.
- **Association**: A solid line connecting an actor to a use case, indicating participation.
- **Include relationship**: A dashed arrow with the label "include" indicating that one use case always incorporates the behavior of another. Used to factor out common, shared steps.
- **Extend relationship**: A dashed arrow with the label "extend" indicating that one use case optionally adds behavior to another. Used to represent conditional or optional functionality.

Use case diagrams are effective for communicating system scope to non-technical stakeholders and for identifying gaps in coverage early in the project.

## Use cases versus user stories

Use cases and user stories both capture requirements from the user's perspective, but they serve different purposes and fit different development cultures.

| Dimension | Use case | User story |
|---|---|---|
| **Format** | Structured narrative with steps, actors, pre/postconditions | Short statement: "As a [role], I want [feature], so that [benefit]" |
| **Level of detail** | High — covers main flow, alternates, and exceptions | Low — a placeholder for a conversation |
| **When written** | Often during up-front analysis or elaboration phases | Continuously, as part of backlog grooming |
| **Best suited for** | Complex workflows, regulatory environments, system integrations | Incremental delivery, Agile sprints, rapid iteration |
| **Scope** | Can span multiple interactions and scenarios | Typically a single, small piece of functionality |
| **Testing link** | Maps directly to acceptance test scenarios | Acceptance criteria are attached separately |

Neither technique is universally superior. Many teams use both: user stories for sprint-level planning and use cases for documenting complex end-to-end workflows that span multiple stories.

## Best practices for writing effective use cases

- **Write from the actor's perspective**: Every step should describe what the actor does or what the system does in response. Avoid describing internal implementation details.

- **Use active voice and present tense**: Write "The customer enters a shipping address" rather than "A shipping address will be entered by the customer."

- **Keep steps observable and testable**: Each step should describe a visible interaction or system response that can be verified.

- **Number your steps**: Sequential numbering makes it easy to reference specific steps in extensions and in test cases.

- **Separate the "what" from the "how"**: A use case should describe what the system does, not how it does it internally. Implementation decisions belong in design documents, not requirements.

- **Handle failure explicitly**: Every realistic failure condition should appear as an extension. If the credit card is declined, if the network times out, if the file is corrupted — each of these needs a documented path.

- **Maintain a consistent level of abstraction**: Do not mix high-level business goals with low-level UI interactions in the same use case. Keep the granularity consistent.

## Common pitfalls

- **Functional decomposition**: Writing use cases that read like a list of system functions rather than goal-oriented interactions. A use case named "Validate Input" is a system function; "Place Order" is a user goal.

- **Too many use cases**: Attempting to write a use case for every micro-interaction leads to an unmanageable inventory. Focus on meaningful user goals.

- **Ignoring alternate and exception flows**: Documenting only the happy path leaves the most important design decisions — error handling, edge cases, concurrency — unaddressed.

- **Confusing use cases with UI design**: A use case should not prescribe specific screens, buttons, or layouts. It should describe the interaction abstractly enough that the UI can evolve independently.

- **Writing use cases in isolation**: Use cases developed without stakeholder input tend to reflect the analyst's assumptions rather than real user needs.

## Related

Technology professionals working with use cases should also explore related topics including use case analysis for the detailed process of identifying and validating requirements, use case diagrams for visual modeling of system scope and actor relationships, user stories for lightweight Agile alternatives, behavior-driven development for connecting use cases to automated tests, functional specifications for translating use cases into design documents, requirements gathering techniques more broadly, and UML modeling for the formal notation system in which use cases are most commonly expressed.

## Summary

Use cases are a foundational requirements technique that describes how actors interact with a system to achieve specific goals. By structuring requirements as step-by-step interaction narratives — complete with preconditions, postconditions, main success scenarios, and exception handling — use cases provide a rigorous yet accessible way to capture, communicate, validate, and test system behavior. They remain indispensable for complex systems, regulated environments, and any project where the cost of misunderstood requirements is high.

## References

- Jacobson, Ivar. *Object-Oriented Software Engineering: A Use Case Driven Approach*. Addison-Wesley, 1992.
- Cockburn, Alistair. *Writing Effective Use Cases*. Addison-Wesley, 2001.
- Larman, Craig. *Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design and Iterative Development*. 3rd ed., Prentice Hall, 2004.
- Object Management Group. *Unified Modeling Language (UML) Specification*. https://www.omg.org/spec/UML/
- Jacobson, Ivar, Ian Spence, and Kurt Bittner. *Use-Case 2.0: The Guide to Succeeding with Use Cases*. Ivar Jacobson International, 2011. https://www.ivarjacobson.com/publications/white-papers/use-case-ebook
