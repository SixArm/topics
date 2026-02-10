# Domain-Driven Design (DDD)

Domain-Driven Design (DDD) is a software development methodology that places the business domain at the center of the design process. Coined by Eric Evans in his 2003 book *Domain-Driven Design: Tackling Complexity in the Heart of Software*, DDD provides a set of principles, patterns, and practices for building software systems that faithfully model complex business realities. Rather than letting technical concerns drive architecture, DDD insists that developers and domain experts collaborate closely to build a shared understanding of the problem space, then reflect that understanding directly in the structure and language of the code. The approach is especially valuable for large-scale enterprise systems where business logic is intricate and evolving.

## Core Philosophy

DDD rests on the premise that the primary source of complexity in most software projects is not the technology but the business domain itself. When teams fail to understand the domain deeply, they build systems that are brittle, difficult to change, and misaligned with actual business needs. DDD addresses this by making the domain model the central artifact of the project. The model is not just documentation; it is a living, executable representation of business concepts that drives both design decisions and the codebase structure.

This philosophy has three implications. First, developers must invest significant time learning the business domain alongside domain experts. Second, the software architecture must reflect domain boundaries rather than arbitrary technical layers. Third, the team must continuously refine the model as their understanding of the domain deepens.

## Strategic Design

Strategic design is the high-level discipline within DDD that deals with how to organize large systems and manage the relationships between their parts. It is concerned with defining boundaries, aligning teams, and ensuring that different parts of the system can evolve independently.

### Bounded Contexts

A bounded context is a clearly defined boundary within which a particular domain model applies. Inside a bounded context, terms have precise and consistent meanings. Outside it, the same term may mean something entirely different. For example, "Account" in a billing context refers to payment and invoicing, while "Account" in a user management context refers to login credentials and profile data.

Bounded contexts allow teams to work independently on different parts of a system without creating conflicting models. Each context owns its own data, logic, and persistence, and communicates with other contexts through well-defined interfaces.

### Context Mapping

Context mapping is the practice of identifying and documenting the relationships between bounded contexts. These relationships determine how contexts integrate, who has influence over shared models, and how changes propagate.

| Context Map Pattern | Description |
|---|---|
| **Shared Kernel** | Two contexts share a small, explicitly agreed-upon subset of the model. Changes require coordination. |
| **Customer-Supplier** | One context (supplier) provides a service that another (customer) depends on. The supplier accommodates the customer's needs. |
| **Conformist** | The downstream context adopts the upstream context's model as-is, with no negotiation. |
| **Anti-Corruption Layer** | The downstream context builds a translation layer to protect its own model from the upstream context's influence. |
| **Open Host Service** | A context exposes a well-defined protocol or API for other contexts to consume. |
| **Published Language** | A shared, documented language (such as XML schemas or JSON formats) used for integration between contexts. |
| **Separate Ways** | Two contexts have no integration; they operate entirely independently. |
| **Partnership** | Two contexts coordinate planning and development to evolve their models together. |

### Subdomains

DDD distinguishes between three types of subdomains, which guide where to invest modeling effort:

- **Core Domain**: The part of the business that provides competitive advantage. This is where DDD modeling effort should be concentrated, because it is what differentiates the organization from its competitors.
- **Supporting Subdomain**: Important to business operations but not a differentiator. It may require custom software but does not justify the same level of investment as the core domain.
- **Generic Subdomain**: Common functionality that is not unique to the business, such as email delivery or authentication. These are best handled by off-the-shelf solutions or commodity libraries.

## Tactical Design

Tactical design provides the building blocks for implementing a domain model within a single bounded context. These patterns give structure to the code and ensure that business rules are expressed clearly and enforced consistently.

### Entities

An entity is an object defined primarily by its identity rather than its attributes. Two entities may have identical attribute values but remain distinct because they have different identifiers. Entities have a lifecycle: they are created, undergo state changes, and may eventually be archived or deleted. A customer record, an order, and a shipment are typical examples of entities.

### Value Objects

A value object is defined entirely by its attributes and has no conceptual identity. Two value objects with the same attribute values are considered equal and interchangeable. Value objects are immutable; if a change is needed, a new value object is created. Examples include a money amount with currency, a date range, or a postal address.

| Aspect | Entity | Value Object |
|---|---|---|
| Identity | Defined by a unique identifier | Defined by its attribute values |
| Equality | Same identity means same entity | Same attributes means equal |
| Mutability | Mutable; state changes over time | Immutable; replaced rather than modified |
| Lifecycle | Tracked through creation, change, deletion | No lifecycle tracking |
| Examples | Customer, Order, Employee | Money, DateRange, Address |

### Aggregates

An aggregate is a cluster of entities and value objects that are treated as a single unit for the purpose of data changes. Every aggregate has a root entity, called the aggregate root, which is the only member of the aggregate that external objects may hold references to. All modifications to the aggregate must go through the aggregate root, which enforces business invariants.

Aggregates define consistency boundaries. Within an aggregate, all invariants are guaranteed to be consistent after each transaction. Between aggregates, consistency is eventually achieved through domain events or other coordination mechanisms.

Key design principles for aggregates:

- Keep aggregates small. Large aggregates create contention and performance problems.
- Reference other aggregates by identity, not by direct object reference.
- Enforce all business rules for the aggregate through the aggregate root.
- Use a single transaction per aggregate; coordinate across aggregates asynchronously.

### Domain Events

A domain event is a record of something significant that happened in the domain. Events are named in past tense to reflect that they describe facts: OrderPlaced, PaymentReceived, InventoryDepleted. Domain events enable loose coupling between aggregates and bounded contexts, because a context can react to events produced by another context without needing to know its internal structure.

Domain events support event-driven architectures, event sourcing, and audit logging. They provide a natural integration mechanism between bounded contexts and are fundamental to building reactive, scalable systems.

### Domain Services

A domain service encapsulates business logic that does not naturally belong to any single entity or value object. If an operation involves multiple aggregates or requires domain knowledge that spans entities, it belongs in a domain service. For example, a pricing calculation that depends on the customer, the product catalog, and current promotions might be implemented as a domain service.

Domain services are stateless and express domain concepts. They are distinct from application services, which orchestrate use cases, and from infrastructure services, which handle technical concerns such as persistence and messaging.

### Repositories

A repository provides a collection-like interface for accessing and persisting aggregates. It abstracts the underlying storage mechanism, allowing the domain model to remain ignorant of database technology. Repositories operate at the aggregate level: they store and retrieve entire aggregates, not individual entities or value objects within an aggregate.

### Factories

A factory encapsulates the logic of creating complex aggregates or entities. When constructing an aggregate requires assembling multiple parts and enforcing creation invariants, a factory provides a clean, intention-revealing interface for that process.

## Ubiquitous Language

Ubiquitous language is the shared vocabulary that the development team and domain experts use consistently in conversation, documentation, and code. The same terms appear in requirements discussions, in class names and method names, and in test descriptions. This eliminates the translation overhead that plagues projects where developers use technical jargon and business stakeholders use different terminology.

Building a ubiquitous language is an ongoing effort. The language evolves as the team's understanding of the domain deepens. When a term is ambiguous or misleading, the team refines it. The model and the language co-evolve: changes to the language trigger changes in the code, and discoveries in the code trigger refinements in the language.

Practical guidelines for ubiquitous language:

- Name classes, methods, and variables using domain terms, not technical abstractions.
- Reject terms that are vague or overloaded with multiple meanings.
- Document the language in a living glossary accessible to the entire team.
- Use the language in all communication: meetings, user stories, commit messages, and code reviews.

## DDD and Architecture Patterns

DDD does not prescribe a single architectural style, but certain patterns complement it well.

| Architecture Pattern | Relationship to DDD |
|---|---|
| **Layered Architecture** | Traditional approach with presentation, application, domain, and infrastructure layers. The domain layer contains the model. |
| **Hexagonal Architecture** | Also called Ports and Adapters. Places the domain model at the center, with all external concerns connected through interfaces. Strongly aligned with DDD. |
| **CQRS** | Command Query Responsibility Segregation separates read and write models. Pairs well with DDD aggregates for writes and denormalized views for reads. |
| **Event Sourcing** | Persists state as a sequence of domain events rather than current state. Natural fit with domain events in DDD. |
| **Microservices** | Each microservice can correspond to a bounded context, with its own model, data store, and team. DDD provides the conceptual framework for defining service boundaries. |

## When to Use DDD

DDD provides the greatest value in systems with complex, evolving business logic. It is not appropriate for every project. Consider the following decision factors:

- **Use DDD** when the business domain is complex, with many rules, edge cases, and exceptions that require careful modeling.
- **Use DDD** when the project is long-lived and expected to evolve significantly over time.
- **Use DDD** when multiple teams or bounded contexts need to collaborate on a large system.
- **Avoid DDD** for simple CRUD applications where the domain logic is trivial.
- **Avoid DDD** for short-lived prototypes or proof-of-concept projects where the overhead of modeling is not justified.
- **Avoid DDD** when domain experts are unavailable for collaboration.

## Common Pitfalls

Teams adopting DDD frequently encounter these challenges:

- **Anemic Domain Model**: The domain objects contain only data with no behavior. Business logic migrates into services, defeating the purpose of a rich domain model.
- **Overengineering**: Applying every DDD pattern regardless of complexity. Not every system needs aggregates, domain events, and bounded contexts.
- **Ignoring Strategic Design**: Teams focus exclusively on tactical patterns (entities, value objects, repositories) without addressing the larger questions of bounded contexts and context mapping.
- **Big Ball of Mud**: Failing to enforce bounded context boundaries, resulting in a single, tangled model that tries to serve every use case.
- **Language Drift**: The team stops maintaining the ubiquitous language, and the gap between domain concepts and code widens over time.

## Related

Professionals exploring DDD should also study microservice architecture, event-driven architecture, and hexagonal architecture as complementary architectural approaches. CQRS and event sourcing are patterns frequently used alongside DDD tactical design. Object-oriented design and design patterns provide the foundational programming skills that DDD builds upon. Enterprise integration patterns address the messaging and coordination challenges that arise between bounded contexts. Behavior-driven development and test-driven development complement DDD by ensuring that domain logic is validated through expressive, domain-focused tests.

## Summary

Domain-Driven Design is a methodology for tackling software complexity by making the business domain the central concern of development. Its strategic design tools, including bounded contexts, context mapping, and subdomain classification, help teams organize large systems and define clear boundaries. Its tactical design patterns, including entities, value objects, aggregates, domain events, and repositories, provide a disciplined way to implement business logic within those boundaries. The ubiquitous language ensures that all stakeholders share a common vocabulary that is reflected directly in the code. While DDD requires significant investment in domain learning and collaborative modeling, the result is software that is better aligned with business needs, more resilient to change, and more clearly structured for long-term evolution.

## References

- Evans, Eric. *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley, 2003.
- Vernon, Vaughn. *Implementing Domain-Driven Design*. Addison-Wesley, 2013.
- Vernon, Vaughn. *Domain-Driven Design Distilled*. Addison-Wesley, 2016.
- Millett, Scott, and Nick Tune. *Patterns, Principles, and Practices of Domain-Driven Design*. Wiley, 2015.
- [DDD Community - Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/)
- [Martin Fowler - Bounded Context](https://martinfowler.com/bliki/BoundedContext.html)
- [Martin Fowler - DDD Aggregate](https://martinfowler.com/bliki/DDD_Aggregate.html)
