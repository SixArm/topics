# Design patterns

Design patterns are reusable solutions to common problems that software developers encounter when designing applications. Rather than prescribing specific code, a design pattern provides a general template or blueprint that can be adapted to a particular problem context. The concept was popularized by the "Gang of Four" (Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides) in their 1994 book *Design Patterns: Elements of Reusable Object-Oriented Software*, and the ideas have since become foundational knowledge for technology professionals working across virtually every programming language and platform.

## Why design patterns matter

Design patterns matter because they encode decades of collective software engineering experience into named, well-understood solutions. When a team shares a vocabulary of patterns, communication becomes faster and more precise. Instead of explaining a complex object-creation strategy from scratch, a developer can say "use a Factory" and colleagues immediately understand the intent. Patterns also reduce risk: because they have been applied and refined across thousands of projects, they carry fewer surprises than ad-hoc designs. They promote loose coupling, high cohesion, and adherence to the SOLID principles, all of which contribute to software that is easier to test, extend, and maintain over time.

## The three pattern categories

Design patterns are traditionally divided into three categories based on their purpose. Each category addresses a different aspect of software design.

| Category | Focus | Core Question |
|---|---|---|
| Creational | Object creation mechanisms | How should objects be instantiated? |
| Structural | Object composition and relationships | How should classes and objects be composed into larger structures? |
| Behavioral | Communication and responsibility among objects | How should objects interact and distribute responsibility? |

Understanding which category a problem falls into is the first step toward selecting the right pattern.

## Creational patterns

Creational patterns abstract the instantiation process, making a system independent of how its objects are created, composed, and represented. They become important when a system should be flexible about which objects it creates or when object creation involves complex logic that should be encapsulated.

Key creational patterns include:

- **Singleton** restricts a class to a single instance and provides a global access point. It is commonly used for configuration managers, connection pools, and logging services.
- **Factory Method** defines an interface for creating an object but lets subclasses decide which class to instantiate. This promotes loose coupling by eliminating the need to bind application-specific classes into the code.
- **Abstract Factory** provides an interface for creating families of related objects without specifying their concrete classes. It is useful when a system must work with multiple families of products, such as cross-platform UI toolkits.
- **Builder** separates the construction of a complex object from its representation, allowing the same construction process to create different representations. It is well suited for objects that require many optional parameters.
- **Prototype** creates new objects by cloning an existing instance rather than invoking a constructor. It is valuable when object creation is expensive or when the system needs to be decoupled from the specific classes it instantiates.

| Pattern | When to Use | Typical Example |
|---|---|---|
| Singleton | Exactly one instance needed globally | Logger, configuration store |
| Factory Method | Subclass should decide which class to create | Document generators, parsers |
| Abstract Factory | Families of related objects required | Cross-platform UI components |
| Builder | Complex objects with many optional parts | HTTP request builders, query builders |
| Prototype | Creating objects by copying an existing template | Game entity spawning, cached objects |

## Structural patterns

Structural patterns are concerned with how classes and objects are composed to form larger structures. They use inheritance and composition to define new functionality while keeping the system flexible and efficient.

Key structural patterns include:

- **Adapter** converts the interface of an existing class into another interface that clients expect. It allows classes with incompatible interfaces to work together, and is often used to integrate legacy systems with new code.
- **Bridge** decouples an abstraction from its implementation so that the two can vary independently. It is particularly useful when both the abstraction and the implementation may need to be extended through subclassing.
- **Composite** composes objects into tree structures to represent part-whole hierarchies. Clients can treat individual objects and compositions uniformly, which is common in UI frameworks and file system representations.
- **Decorator** attaches additional responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality, and is widely used in I/O stream libraries and middleware pipelines.
- **Facade** provides a simplified interface to a complex subsystem. It shields clients from the complexity of multiple interacting components and is frequently used to wrap third-party libraries.
- **Proxy** provides a surrogate or placeholder for another object to control access to it. Common variants include remote proxies, virtual proxies for lazy loading, and protection proxies for access control.

## Behavioral patterns

Behavioral patterns address how objects communicate, distribute responsibility, and manage algorithms. They shift focus from the structure of objects to the patterns of interaction between them.

Key behavioral patterns include:

- **Observer** defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. It is the foundation of event-driven and reactive programming.
- **Strategy** defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from the clients that use it, which is ideal for sorting, validation, or pricing logic that can change at runtime.
- **Command** encapsulates a request as an object, allowing parameterization of clients with different requests, queuing, logging, and support for undoable operations.
- **Template Method** defines the skeleton of an algorithm in a base class and lets subclasses override specific steps without changing the algorithm's structure.
- **State** allows an object to alter its behavior when its internal state changes, making the object appear to change its class. It is useful for implementing state machines cleanly.
- **Iterator** provides a way to access elements of a collection sequentially without exposing its underlying representation.
- **Mediator** defines an object that encapsulates how a set of objects interact, promoting loose coupling by preventing objects from referring to each other explicitly.
- **Chain of Responsibility** passes a request along a chain of handlers, giving each handler the opportunity to process the request or pass it to the next handler.

| Pattern | Core Benefit | Typical Example |
|---|---|---|
| Observer | Decoupled event notification | UI event systems, pub/sub messaging |
| Strategy | Interchangeable algorithms | Payment processing, compression |
| Command | Encapsulated operations with undo support | Text editors, task queues |
| Template Method | Reusable algorithm skeleton | Data processing pipelines |
| State | Clean state-dependent behavior | Order status workflows |
| Mediator | Centralized interaction logic | Chat rooms, air traffic control |

## Choosing the right pattern

Selecting a design pattern is not about memorizing a catalog. It is about recognizing the forces at play in a particular design problem and matching them to a pattern that resolves those forces. Several guidelines help:

- **Identify what varies.** The single most important driver of pattern selection is understanding which aspect of the design is likely to change. Patterns encapsulate variation so that change does not ripple through the entire system.
- **Favor composition over inheritance.** Many patterns, including Strategy, Decorator, and Composite, achieve flexibility through object composition rather than class inheritance, which tends to create rigid hierarchies.
- **Program to an interface, not an implementation.** Patterns like Factory Method, Abstract Factory, and Bridge depend on this principle to keep systems open for extension.
- **Start simple.** Do not apply a pattern preemptively. Introduce one when the design pressure (such as duplicated conditional logic, tight coupling, or difficult testing) makes the benefit clear.

## Common pitfalls

Design patterns are powerful tools, but misuse leads to unnecessary complexity. The most frequent pitfalls include:

- **Over-engineering.** Applying patterns where simple, straightforward code would suffice adds layers of abstraction that obscure intent and increase the learning curve for new team members.
- **Pattern obsession.** Treating patterns as goals rather than tools leads developers to force problems into pattern shapes rather than letting the problem guide the solution.
- **Ignoring language idioms.** Many modern languages provide built-in features (closures, first-class functions, mixins, protocols) that accomplish what certain patterns were originally designed to do. Using the pattern machinery on top of these features is redundant.
- **Misidentifying the problem.** Choosing the wrong pattern is worse than choosing none. A Singleton where a simple dependency injection would suffice, or an Observer where a direct method call is clearer, introduces complexity without corresponding benefit.

## Related

After understanding design patterns, valuable next topics include the SOLID principles, which provide the theoretical underpinning for why most patterns work; dependency injection, which operationalizes the Inversion of Control principle that many patterns rely on; refactoring techniques, which help identify when and where to introduce patterns into existing code; and architectural patterns such as Model-View-Controller, microservices, and event-driven architecture, which apply similar principles at a larger system scale.

## Summary

Design patterns are proven, reusable solutions organized into creational, structural, and behavioral categories that address the fundamental challenges of object creation, composition, and communication in software systems. They provide a shared vocabulary that accelerates team communication, promote principles such as loose coupling and high cohesion, and encode decades of engineering wisdom into templates that reduce risk and improve maintainability. The key to using them effectively is to let the problem guide the choice of pattern, apply them only when the design pressure warrants the added abstraction, and remain aware of modern language features that may offer simpler alternatives.

## References

- Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
- Freeman, E., Robson, E., Bates, B., & Sierra, K. (2004). *Head First Design Patterns*. O'Reilly Media.
- Martin, R. C. (2003). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
- Refactoring Guru — Design Patterns catalog and tutorials: [https://refactoring.guru/design-patterns](https://refactoring.guru/design-patterns)
- Source Making — Design Patterns reference: [https://sourcemaking.com/design_patterns](https://sourcemaking.com/design_patterns)
