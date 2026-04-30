# Onion Architecture

Onion Architecture is a software design pattern introduced by Jeffrey Palermo in 2008 that organizes an application into concentric layers, with core business logic at the center and infrastructure concerns at the periphery. The pattern enforces a strict dependency rule: all dependencies point inward, meaning outer layers depend on inner layers but never the reverse. This approach keeps the domain model insulated from technology decisions, making the system easier to test, maintain, and evolve over time. Onion Architecture shares philosophical roots with Hexagonal Architecture (Ports and Adapters) and Clean Architecture, all of which prioritize dependency inversion and domain centrality.

## Core Principles

Onion Architecture rests on a small set of non-negotiable principles that distinguish it from traditional layered architectures.

- **Dependency inversion**: Inner layers define abstractions (interfaces); outer layers provide concrete implementations. The domain never references infrastructure code directly.
- **Inward-only dependency flow**: Each layer may reference the layers inside it but must never depend on anything outside of it. This ensures that the most stable, valuable code (business logic) has zero coupling to the most volatile code (frameworks, databases, UI).
- **Domain centrality**: The domain model is the architectural anchor. Every design decision radiates outward from the question "how does this serve the domain?"
- **Separation of concerns**: Each layer has a single, well-defined responsibility. Presentation handles user interaction, application services orchestrate use cases, domain services encode multi-entity business rules, and the domain model captures core entities and invariants.

## The Layers

Onion Architecture arranges responsibilities into four concentric layers. Each layer has a distinct role, and the strict inward dependency rule governs how they interact.

### Domain Model (Innermost Layer)

The domain model sits at the center and contains the most stable, valuable code in the system. It defines business entities, value objects, aggregates, and domain events. These constructs encode business invariants that hold true regardless of whether the application uses a SQL database, a NoSQL store, or flat files. The domain model has no dependencies on any other layer, framework, or library.

### Domain Services

Surrounding the domain model, the domain services layer handles business logic that spans multiple entities or cannot naturally reside within a single entity. This layer also defines repository interfaces and other abstractions that outer layers must implement. Domain services coordinate entity interactions and enforce cross-cutting business rules such as pricing calculations that involve multiple product categories or validation logic that spans aggregate boundaries.

### Application Services

The application services layer orchestrates use cases by coordinating domain objects and domain services to fulfill specific workflows such as "Place Order," "Transfer Funds," or "Generate Report." Application services define the boundary between the domain and the outside world. They accept input from external actors, invoke domain logic, and return results, but they perform no I/O themselves and contain no business rules. This layer also manages transactions and cross-cutting concerns like authorization checks.

### Infrastructure and Presentation (Outermost Layer)

The outermost layer contains all concrete implementations and technology-specific code. Database adapters, ORM configurations, REST or GraphQL API controllers, message broker integrations, email services, file system access, and user interface components all reside here. This layer implements the interfaces defined by inner layers, fulfilling the dependency inversion principle. Because it sits at the periphery, it can be replaced or modified without affecting business logic.

## Layer Responsibilities at a Glance

| Layer | Responsibility | Depends On | Example Contents |
|---|---|---|---|
| Domain Model | Core business entities and invariants | Nothing | Entities, value objects, aggregates, domain events |
| Domain Services | Multi-entity business logic and abstractions | Domain Model | Repository interfaces, domain calculations, specifications |
| Application Services | Use-case orchestration and workflow coordination | Domain Model, Domain Services | Command handlers, use-case interactors, DTOs |
| Infrastructure / Presentation | Technology-specific implementations and UI | All inner layers | Database adapters, API controllers, message brokers, UI views |

## Onion Architecture vs. Traditional Layered Architecture

Traditional N-tier architectures (Presentation, Business Logic, Data Access) allow each layer to depend on the one directly below it, which means business logic typically depends on the data access layer. This creates a tight coupling between domain rules and persistence technology. Onion Architecture inverts this relationship.

| Aspect | Traditional Layered | Onion Architecture |
|---|---|---|
| Dependency direction | Top-down (UI depends on BLL depends on DAL) | Inward (all layers depend on the domain) |
| Domain model dependencies | Often depends on ORM or data access layer | Has zero external dependencies |
| Database replaceability | Difficult; business logic coupled to data access | Straightforward; infrastructure is a plugin |
| Testability of business rules | Requires mocking data access layer | Unit testable in isolation |
| Coupling tendency over time | Business logic gradually absorbs infrastructure concerns | Enforced separation prevents coupling drift |

## Benefits

- **Testability**: Core business rules can be unit tested without databases, web servers, or external services. Tests run fast because they exercise pure domain logic with no I/O.
- **Sustainability**: Swapping a SQL database for a document store, changing cloud providers, or replacing a REST API with GraphQL requires changes only in the outermost layer. The domain remains untouched.
- **Maintainability**: The enforced separation of concerns prevents the gradual decay toward a tightly coupled, unstructured codebase. New developers can understand boundaries quickly because responsibilities are explicit.
- **Flexibility**: The pattern accommodates evolving technology choices without forcing rewrites of business logic. Infrastructure decisions become reversible.
- **Parallel development**: Teams can work on different layers simultaneously because the interfaces between layers are well defined and stable.

## Trade-offs and When to Use

Onion Architecture introduces additional layers and abstractions that carry a cost. For simple CRUD applications with minimal business logic, the extra indirection adds complexity without proportional benefit. The pattern shines in systems with significant domain complexity, where business rules change independently of technology choices and where long-term maintainability justifies the upfront investment in structure.

- **Good fit**: Enterprise applications, financial systems, healthcare platforms, e-commerce engines, and any system where business rules are complex, evolving, and must survive infrastructure changes.
- **Poor fit**: Simple data-entry applications, prototypes, microservices with trivial logic, and projects where speed of initial delivery outweighs long-term architectural concerns.

Teams adopting Onion Architecture should also be prepared to enforce the dependency rule through code reviews, static analysis tools, or module boundary enforcement provided by the language or build system. Without discipline, the layered structure degrades as developers take shortcuts across boundaries.

## Related

Professionals interested in Onion Architecture should also study Hexagonal Architecture (Ports and Adapters), which predates it and uses a similar dependency inversion strategy with explicit port and adapter abstractions. Clean Architecture, formalized by Robert C. Martin, synthesizes ideas from both patterns into a broader set of principles. Domain-Driven Design provides the modeling techniques (entities, value objects, aggregates, bounded contexts) that populate the inner layers. The Dependency Inversion Principle and SOLID principles underpin the theoretical foundation. Finally, understanding the Repository Pattern and the Mediator Pattern helps with the practical implementation of layer boundaries.

## Summary

Onion Architecture organizes applications into concentric layers with business logic at the center and infrastructure at the periphery, enforcing a strict rule that dependencies only flow inward. This design decouples core domain rules from databases, frameworks, and external services, yielding systems that are easier to test, maintain, and adapt to changing technology choices. While the additional layering introduces overhead that may not suit simple applications, it provides substantial long-term value in domains with complex, evolving business logic that must remain independent of infrastructure decisions.

## References

- Palermo, Jeffrey. "The Onion Architecture." Jeffrey Palermo's Blog, 2008. The original series of posts introducing and explaining the pattern.
- Martin, Robert C. *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall, 2017. Presents Clean Architecture, which synthesizes concepts from Onion and Hexagonal architectures.
- Cockburn, Alistair. "Hexagonal Architecture." Alistair Cockburn's Wiki, 2005. The foundational description of Ports and Adapters, the pattern most closely related to Onion Architecture.
- Evans, Eric. *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley, 2003. Provides the domain modeling techniques that populate the inner layers of an Onion Architecture.
- Vernon, Vaughn. *Implementing Domain-Driven Design*. Addison-Wesley, 2013. Offers practical guidance on applying DDD patterns within layered and onion-style architectures.
