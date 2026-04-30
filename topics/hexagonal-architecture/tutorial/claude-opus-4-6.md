# Hexagonal Architecture

Hexagonal Architecture, also known as Ports and Adapters, is a software design pattern that isolates an application's core business logic from external concerns such as databases, user interfaces, and third-party APIs. Alistair Cockburn introduced the pattern in 2005 to address a recurring problem in software systems: tight coupling between domain logic and infrastructure code. By enforcing strict boundaries between what the application does and how it communicates with the outside world, Hexagonal Architecture produces systems that are easier to test, easier to evolve, and resistant to technology lock-in. The pattern has become a foundational concept in domain-driven design and modern microservice architectures.

## Core Concepts

The architecture uses a hexagonal shape to represent the application visually. The hexagon is not meant to imply exactly six sides or six interfaces; rather, it emphasizes that an application can have multiple distinct interaction points with the outside world. The inside of the hexagon contains the Application Core: pure domain logic, entities, value objects, and use cases. The core has no knowledge of the outside world and no dependencies on frameworks, databases, or transport protocols. This makes it highly stable, portable, and framework-independent.

The outside of the hexagon contains everything else: user interfaces, databases, messaging systems, third-party services, file systems, and any other external technology. The boundary between inside and outside is enforced through two key abstractions: ports and adapters.

## Ports

Ports are the interfaces defined by the Application Core. They represent the contracts that the core exposes or requires, expressed as abstract interfaces or protocol definitions rather than concrete implementations. Ports fall into two categories:

- **Inbound ports** (also called driving ports) define how external actors trigger core behaviors. They represent the use cases or services that the application offers. For example, an inbound port might define operations like "place an order," "register a user," or "generate a report." The core owns these interfaces and dictates their shape.

- **Outbound ports** (also called driven ports) define what the core needs from the outside world. They represent dependencies that the core declares but does not implement. For example, an outbound port might define operations like "save an order to storage," "send a notification," or "retrieve exchange rates." The core depends on these abstractions, never on their concrete implementations.

| Port Type | Direction | Purpose | Example |
|-----------|-----------|---------|---------|
| Inbound | Outside to core | Expose application use cases | OrderService interface |
| Outbound | Core to outside | Declare infrastructure needs | OrderRepository interface |

## Adapters

Adapters are the concrete implementations that plug into ports. They translate between the technology-specific outside world and the technology-agnostic core. Adapters also fall into two categories:

- **Driving adapters** (primary adapters) sit on the inbound side and initiate actions on the core. They receive input from an external actor, translate it into a call on an inbound port, and return the result. Examples include REST controllers, GraphQL resolvers, CLI handlers, gRPC service implementations, and message queue consumers.

- **Driven adapters** (secondary adapters) sit on the outbound side and fulfill the core's declared dependencies. They implement an outbound port using a specific technology. Examples include SQL database repositories, NoSQL document stores, SMTP email senders, cloud storage clients, and third-party API wrappers.

| Adapter Type | Also Called | Role | Examples |
|--------------|------------|------|----------|
| Driving | Primary | Initiates actions on the core | REST controller, CLI, message consumer |
| Driven | Secondary | Fulfills core's outbound needs | SQL repository, email sender, cache client |

The critical rule is that adapters depend on ports, never the reverse. The core defines the port interfaces, and adapters conform to them. This dependency inversion ensures that replacing one adapter with another requires no changes to the core.

## Dependency Rule

The dependency rule is the single most important constraint in Hexagonal Architecture: all dependencies point inward, from adapters toward the core. The core never references adapters directly. Instead, it depends only on port interfaces that it defines itself. Adapters are injected at application startup, typically through dependency injection or a composition root.

This rule produces a clear separation of concerns:

- The core can be compiled, tested, and reasoned about without any adapter present.
- Adapters can be swapped, added, or removed without modifying core logic.
- Multiple adapters can implement the same port simultaneously, enabling scenarios like dual-writing to two databases during a migration.

## Key Advantages

Hexagonal Architecture delivers several strategic benefits for technology teams:

- **Technology agnosticism.** The core is free from framework dependencies. You can swap a relational database for a document store, replace a REST API with a gRPC service, or migrate from one cloud provider to another without rewriting business rules.

- **High testability.** Because the core depends only on port interfaces, unit tests can substitute lightweight in-memory adapters or test doubles for real infrastructure. Integration tests can target individual adapters in isolation. End-to-end tests compose the full stack. This layered testing strategy produces fast, reliable test suites.

- **Future-proofing.** Technology decisions become reversible. Choosing PostgreSQL today does not prevent switching to DynamoDB tomorrow, because the core never knew PostgreSQL existed. This reduces the cost and risk of infrastructure evolution.

- **Team scalability.** Different teams can work on different adapters concurrently without conflicting, as long as they agree on the port interfaces. One team builds the REST API adapter while another builds the database adapter, both conforming to the same core contracts.

## Common Misconceptions

Several misunderstandings frequently arise when teams adopt Hexagonal Architecture:

- **The hexagon shape is not prescriptive.** There is nothing special about the number six. The hexagonal shape is a visual metaphor for "many sides," chosen to contrast with the traditional layered architecture diagrams that suggest exactly two or three interfaces.

- **It is not the same as Clean Architecture or Onion Architecture.** While these patterns share the principle of dependency inversion and core isolation, they differ in structure and terminology. Clean Architecture introduces explicit rings (entities, use cases, interface adapters, frameworks). Onion Architecture layers from domain model outward through domain services and application services. Hexagonal Architecture focuses specifically on ports and adapters without prescribing internal layering of the core.

- **It does not require a specific framework or language.** The pattern is language-agnostic and framework-agnostic. It can be implemented in Java with Spring, in Python with FastAPI, in TypeScript with NestJS, or in Go with no framework at all.

## When to Use Hexagonal Architecture

Hexagonal Architecture is most valuable in systems where the domain logic is complex, where infrastructure components are likely to change, or where testability is a high priority. It is well-suited for long-lived enterprise applications, microservices with rich domain models, and systems that must integrate with multiple external services.

For simple CRUD applications with little domain logic, the overhead of defining ports and adapters may not be justified. In prototypes and throwaway code, the pattern adds ceremony that slows initial development. Teams should weigh the long-term benefits of decoupling against the short-term cost of additional abstraction.

## Related

Teams exploring Hexagonal Architecture should also study Clean Architecture and Onion Architecture, which share the principle of isolating domain logic but differ in structural conventions. Domain-Driven Design provides the strategic and tactical patterns that pair naturally with the hexagonal approach, especially bounded contexts, aggregates, and repository patterns. The SOLID principles, particularly Dependency Inversion and Interface Segregation, underpin the port and adapter mechanism. Microservice architecture benefits directly from hexagonal design, as each service can encapsulate its core behind well-defined ports.

## Summary

Hexagonal Architecture structures software systems around a technology-agnostic core protected by port interfaces and connected to the outside world through interchangeable adapters. By enforcing a strict inward dependency rule, the pattern decouples business logic from infrastructure, enabling teams to swap technologies, test in isolation, and evolve systems without rewriting domain code. While it introduces additional abstraction compared to simpler architectures, the long-term gains in flexibility, testability, and maintainability make it a proven choice for complex, long-lived software systems.

## References

- Cockburn, Alistair. "Hexagonal Architecture." alistair.cockburn.us, 2005. The original description of the Ports and Adapters pattern by its creator.
- Martin, Robert C. *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall, 2017. Provides complementary patterns and the broader context of dependency inversion in architecture.
- Evans, Eric. *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley, 2003. The foundational text on domain modeling techniques that pair with hexagonal boundaries.
- Palermo, Jeffrey. "The Onion Architecture." jeffreypalermo.com, 2008. A closely related pattern that layers domain, services, and infrastructure concentrically.
- Vernon, Vaughn. *Implementing Domain-Driven Design*. Addison-Wesley, 2013. Covers practical application of hexagonal architecture within domain-driven design projects.
