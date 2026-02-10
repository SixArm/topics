# Use case diagram

A use case diagram is a type of behavioral diagram in the Unified Modeling Language (UML) that illustrates the interactions between actors and a system. It captures the functional requirements of a system by modeling what the system does from the user's perspective, rather than how it does it internally. Use case diagrams are among the most widely used UML diagrams in software engineering because they bridge the gap between technical teams and business stakeholders, providing a shared visual language for discussing system behavior. They are particularly valuable during the requirements gathering and analysis phases of a project, where clarity about scope and user expectations is critical.


## Purpose and Benefits

Use case diagrams serve as a high-level blueprint of system functionality. They answer the fundamental question: "What should the system do for its users?" By focusing on observable behavior rather than implementation details, they keep conversations grounded in business value.

Key benefits include:

- **Scope definition**: They draw a clear boundary around what the system is responsible for and what lies outside it, reducing scope creep and misunderstandings.
- **Stakeholder communication**: Because the notation is simple and visual, non-technical stakeholders can review and validate requirements without needing to understand code or architecture.
- **Requirements traceability**: Each use case can be linked to detailed specifications, test cases, and design artifacts, creating a traceable thread from business need to delivered functionality.
- **Identification of actors**: The process of creating the diagram forces teams to explicitly identify every user role and external system that interacts with the product.
- **Foundation for estimation**: Use cases provide natural units for effort estimation, sprint planning, and progress tracking.


## Main Elements

A use case diagram is composed of four primary elements: actors, use cases, the system boundary, and relationships. Understanding each element is essential for constructing accurate and useful diagrams.

### Actors

An actor is an external entity that interacts with the system to achieve a goal. Actors can be human users, other software systems, hardware devices, or time-based triggers. They are represented by stick figures and labeled with their role name. Actors are always outside the system boundary.

There are two categories of actors:

| Actor Type | Description | Example |
|---|---|---|
| Primary actor | Initiates the interaction and has a goal the system fulfills | A customer placing an order |
| Secondary actor | Supports or is called upon by the system during a use case | A payment gateway processing a transaction |

### Use Cases

A use case represents a discrete piece of functionality that delivers a measurable result to an actor. Use cases are drawn as ovals (ellipses) inside the system boundary and labeled with a verb phrase describing the action, such as "Place Order" or "Generate Report." Each use case should represent a complete, meaningful interaction rather than a single step in a process.

### System Boundary

The system boundary is a rectangle that encloses all the use cases belonging to the system under design. It visually separates internal system functionality from external actors and clarifies what is in scope. The system name is typically written at the top of the rectangle.


## Relationship Connections

Relationships define how actors and use cases connect and interact. There are four primary types of relationships used in use case diagrams.

| Relationship | Notation | Purpose | Direction |
|---|---|---|---|
| Association | Solid line | Links an actor to a use case the actor participates in | Between actor and use case |
| Include | Dashed arrow with "include" label | Factors out common behavior shared by multiple use cases | From base use case to included use case |
| Extend | Dashed arrow with "extend" label | Adds optional or conditional behavior to a base use case | From extending use case to base use case |
| Generalization | Solid arrow with hollow arrowhead | Shows inheritance between actors or between use cases | From specialized element to general element |

### Association

An association is the most basic relationship. It is a solid line drawn between an actor and a use case, indicating that the actor participates in that use case. Associations carry no directionality in most conventions; the line simply denotes communication.

### Include

An include relationship extracts behavior that is common across multiple use cases into a single reusable use case. The base use case always executes the included use case; it is not optional. For example, both "Place Order" and "Return Item" might include "Authenticate User," because authentication is a mandatory prerequisite for both.

### Extend

An extend relationship models optional or conditional behavior that augments a base use case under certain circumstances. The base use case functions independently without the extension. For example, "Place Order" might be extended by "Apply Discount Code," which only occurs when the customer has a promotion.

### Generalization

Generalization applies inheritance to actors or use cases. A specialized actor inherits all the associations of a general actor and may have additional ones. For example, an "Admin" actor might generalize from a "User" actor, inheriting all standard user interactions while also gaining access to administrative functions.


## When to Use a Use Case Diagram

Use case diagrams are most effective at specific points in the software development lifecycle and for specific audiences.

- **Requirements elicitation**: Use them to capture and validate functional requirements with stakeholders before design begins.
- **Project scoping**: Use them to define and communicate system boundaries, making explicit what the system will and will not do.
- **Test planning**: Each use case maps naturally to one or more test scenarios, making the diagram a starting point for acceptance test design.
- **System documentation**: They serve as living documentation that provides a quick overview of system capabilities for new team members or auditors.
- **Contract negotiation**: In outsourced or multi-vendor projects, use case diagrams help define deliverables unambiguously.

Use case diagrams are less appropriate for modeling internal system logic, data flow, sequencing of operations, or non-functional requirements such as performance and security constraints.


## Best Practices

Constructing effective use case diagrams requires discipline. Poorly constructed diagrams can be as misleading as having no diagram at all.

- **Name use cases with verb phrases**: Use active, goal-oriented language such as "Register Account" or "Process Refund" rather than vague labels like "Account" or "Refund."
- **Keep diagrams at a consistent level of abstraction**: Avoid mixing high-level business processes with detailed sub-steps in the same diagram. Create separate diagrams for different levels of detail.
- **Limit the number of use cases per diagram**: A single diagram with more than 15 to 20 use cases becomes difficult to read. Break large systems into subsystem diagrams.
- **Avoid functional decomposition**: Use cases should represent complete user goals, not individual system functions or button clicks. "Withdraw Cash" is a proper use case for an ATM; "Validate PIN" is better modeled as an included use case.
- **Identify all actors deliberately**: Ensure that every external entity, including automated systems, scheduled jobs, and regulatory bodies, is accounted for.
- **Supplement with use case specifications**: The diagram is a summary view. Each use case should be backed by a detailed specification that describes preconditions, postconditions, main success scenarios, and alternative flows.


## Common Mistakes

| Mistake | Problem | Correction |
|---|---|---|
| Using use cases to describe internal system steps | Creates functional decomposition rather than user-goal modeling | Focus each use case on a complete, actor-observable outcome |
| Omitting the system boundary | Leaves scope ambiguous and makes it unclear what belongs to the system | Always draw the boundary rectangle and label it |
| Overusing extend and include | Creates a tangled web of dependencies that is hard to read | Use these relationships sparingly and only when they genuinely clarify the model |
| Confusing extend with include | Leads to incorrect modeling of mandatory versus optional behavior | Include is mandatory and always executed; extend is conditional |
| Treating actors as system components | Blurs the distinction between internal and external entities | Actors must always be external to the system boundary |


## Related

Related topics to explore next include sequence diagrams for modeling the step-by-step interactions within a use case, activity diagrams for capturing workflow and decision logic, class diagrams for defining the structural elements that support use cases, and requirements engineering practices that use the diagram as input for detailed specifications. Understanding the broader UML specification and its other behavioral and structural diagrams will deepen your ability to model complex systems comprehensively.


## Summary

A use case diagram is a foundational UML artifact that captures the functional requirements of a system by modeling actors, use cases, and the relationships between them. It defines the system boundary, identifies who interacts with the system and what goals they pursue, and distinguishes between mandatory shared behavior (include), optional conditional behavior (extend), and inheritance (generalization). When constructed with discipline and paired with detailed use case specifications, the diagram serves as a powerful communication tool between business stakeholders and technical teams, a basis for test planning, and a reference for project scoping throughout the development lifecycle.


## References

- Jacobson, I., Christerson, M., Jonsson, P., & Overgaard, G. (1992). *Object-Oriented Software Engineering: A Use Case Driven Approach*. Addison-Wesley.
- Cockburn, A. (2001). *Writing Effective Use Cases*. Addison-Wesley.
- Object Management Group. *Unified Modeling Language (UML) Specification*. https://www.omg.org/spec/UML/
- Fowler, M. (2003). *UML Distilled: A Brief Guide to the Standard Object Modeling Language* (3rd ed.). Addison-Wesley.
- Larman, C. (2004). *Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design and Iterative Development* (3rd ed.). Prentice Hall.
