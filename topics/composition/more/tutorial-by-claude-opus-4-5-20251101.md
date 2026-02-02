## Composition

Composition is a fundamental concept in computer science and software engineering that refers to the practice of creating complex objects or structures by combining simpler, more elementary objects or components. Rather than building monolithic systems, composition allows developers to construct software in a modular, flexible, and maintainable way.

## The "Has-A" Relationship

Composition models a "has-a" relationship between objects, meaning that one object contains or is composed of other objects. This relationship describes how complex entities are built from simpler parts.

| Example Entity | Component Parts |
|----------------|-----------------|
| Car | Engine, Wheels, Transmission, Chassis |
| Computer | CPU, Memory, Storage, Motherboard |
| Document | Paragraphs, Images, Tables, Headers |
| Shopping Cart | Line Items, Discounts, Shipping Info |

The "has-a" relationship contrasts with the "is-a" relationship found in inheritance. A Car "has an" Engine, but a SportsCar "is a" Car. This distinction is critical when designing object relationships.

## Composition vs. Inheritance

Both composition and inheritance are mechanisms for code reuse, but they differ significantly in their approach and implications.

| Aspect | Composition | Inheritance |
|--------|-------------|-------------|
| Relationship | "Has-a" | "Is-a" |
| Coupling | Loose coupling | Tight coupling |
| Flexibility | High—components can be swapped at runtime | Low—hierarchy fixed at compile time |
| Encapsulation | Preserves encapsulation | Can break encapsulation |
| Code Reuse | Through delegation | Through extension |
| Testing | Easier to mock and isolate | Harder to test in isolation |
| Changes | Local impact | Cascading impact through hierarchy |

The principle "favor composition over inheritance" is widely advocated because composition provides greater flexibility. With composition, objects can be assembled from different components, and those components can be replaced or extended without affecting the rest of the system.

## Interface-Based Composition

Composition becomes especially powerful when combined with interfaces or contracts. Components adhere to a specific interface, allowing objects to interact with any component that conforms to a common set of methods.

Benefits of interface-based composition include:

- **Interchangeability**: Components implementing the same interface can be swapped freely
- **Testability**: Mock implementations can replace real components during testing
- **Decoupling**: Client code depends on abstractions, not concrete implementations
- **Extensibility**: New behaviors can be added by creating new implementations

## Dependency Injection

Composition is the foundation of dependency injection, a technique where a component's dependencies are provided from external sources rather than created internally. This approach makes dependencies explicit and manageable.

Key advantages of dependency injection:

- **Explicit dependencies**: All requirements are visible in the constructor or configuration
- **Easier testing**: Dependencies can be replaced with test doubles
- **Centralized configuration**: Object graphs are assembled in one location
- **Reduced coupling**: Components don't know how to create their dependencies

## System-Level Composition

Large software systems are constructed by composing various modules, libraries, and components. This architectural approach simplifies system design and reduces the complexity of individual parts.

| Composition Level | Examples |
|-------------------|----------|
| Object | Combining objects within a class |
| Module | Assembling modules into subsystems |
| Service | Orchestrating microservices |
| Application | Integrating applications into platforms |

System composition enables separation of concerns, where each component handles a specific responsibility. Teams can develop, test, and deploy components independently.

## Design Patterns Based on Composition

Several established design patterns leverage composition to solve common software design problems.

| Pattern | Purpose |
|---------|---------|
| Composite | Treat individual objects and compositions uniformly |
| Decorator | Add responsibilities to objects dynamically |
| Strategy | Encapsulate interchangeable algorithms |
| State | Encapsulate state-specific behavior |
| Observer | Define one-to-many dependencies between objects |
| Adapter | Convert one interface to another |

These patterns demonstrate how composition creates flexible, extensible designs that can evolve with changing requirements.

## When to Use Composition

Composition is the preferred approach in most scenarios:

- When you need runtime flexibility to change behavior
- When the relationship is genuinely "has-a" rather than "is-a"
- When you want to reuse behavior across unrelated classes
- When you need to combine multiple behaviors in a single object
- When you want to avoid deep inheritance hierarchies
- When testing and mocking are priorities

Inheritance remains appropriate for true taxonomic relationships where subclasses genuinely represent specialized versions of their parent class, and when you need to leverage polymorphism through a type hierarchy.

## Summary

Composition is a core principle for building maintainable software. By assembling complex objects from simpler components, developers create systems that are modular, testable, and adaptable to change. The combination of composition with interfaces and dependency injection forms the foundation of modern software architecture, enabling loosely coupled designs that can evolve over time without cascading modifications throughout the codebase.
