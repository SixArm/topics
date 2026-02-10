# Interface

An interface is a foundational programming construct that defines a contract between software components. It specifies a set of methods, properties, and events that a class, object, or module must implement, without prescribing how those behaviors are carried out. Interfaces are central to abstraction, polymorphism, and modular software design, and they appear across nearly every major programming language and architectural paradigm. Understanding interfaces is essential for building extensible, testable, and maintainable systems.

## What an Interface Does

An interface declares the "what" of a component's behavior while leaving the "how" to the implementing class or object. It typically contains method signatures — including method names, return types, and parameter lists — but provides no method bodies. Any class that implements an interface must supply concrete implementations for every method the interface defines. This separation of specification from implementation is the core principle behind interface-driven design.

By defining a contract, interfaces allow developers to write code that depends on behavior rather than on specific classes. This means that components can be swapped, extended, or replaced without modifying the code that depends on them, as long as the new component honors the same interface contract.

## Key Characteristics

- **Abstraction**: Interfaces expose only what a component can do, hiding internal implementation details from consumers.
- **Polymorphism**: Objects of different classes can be treated uniformly when they implement the same interface, enabling dynamic binding at runtime.
- **Multiple implementation**: A single interface can be implemented by many classes, each providing its own behavior for the same contract.
- **Multiple interface adoption**: In most languages, a class can implement several interfaces simultaneously, inheriting behavioral contracts from multiple sources without the ambiguity of multiple class inheritance.
- **No state**: Interfaces traditionally carry no instance data or fields — they define behavior, not storage. Some modern languages relax this with default implementations or associated types, but the principle remains.

## Interfaces Across Programming Languages

Different languages express the interface concept in different ways, with varying levels of formality and enforcement.

| Language | Keyword / Mechanism | Key Notes |
|----------|---------------------|-----------|
| Java | `interface` | Explicit keyword; supports default methods since Java 8; classes use `implements` |
| C# | `interface` | Explicit keyword; supports default interface methods since C# 8; used extensively with dependency injection |
| TypeScript | `interface` | Structural typing; interfaces describe object shapes and are erased at compile time |
| Go | `interface` | Implicit satisfaction; any type with the right methods satisfies an interface without a declaration |
| Python | Abstract Base Class (`ABC`) | No formal `interface` keyword; `abc.ABC` with `@abstractmethod` enforces the pattern |
| Rust | `trait` | Traits serve as interfaces with optional default implementations and associated types |
| C++ | Abstract class | Pure virtual functions (`= 0`) define interface contracts; no dedicated keyword |
| Swift | `protocol` | Protocols define interfaces; support protocol extensions for default behavior |

## Interfaces vs. Abstract Classes

Interfaces and abstract classes both enable abstraction, but they serve different roles and have distinct constraints.

| Aspect | Interface | Abstract Class |
|--------|-----------|----------------|
| Implementation | No method bodies (traditionally) | Can contain both abstract and concrete methods |
| State | No instance fields | Can hold instance fields and state |
| Inheritance | A class can implement many interfaces | A class typically extends only one abstract class |
| Constructor | Cannot have constructors | Can define constructors |
| Use case | Defining a behavioral contract across unrelated types | Sharing code among closely related types in a hierarchy |
| Coupling | Loose coupling; consumers depend on the contract | Tighter coupling; subclasses depend on the base class structure |

In practice, interfaces are preferred when defining cross-cutting capabilities (such as serialization, comparison, or event handling), while abstract classes are preferred when a family of related classes shares substantial implementation.

## Interfaces and Design Principles

Interfaces are deeply connected to several core software design principles:

- **Dependency Inversion Principle**: High-level modules should depend on abstractions (interfaces), not on concrete implementations. This decouples architecture layers and makes systems easier to evolve.
- **Interface Segregation Principle**: Clients should not be forced to depend on methods they do not use. Prefer multiple small, focused interfaces over a single large one.
- **Open/Closed Principle**: Systems should be open for extension but closed for modification. New behavior is introduced by creating new implementations of existing interfaces, without changing existing code.
- **Liskov Substitution Principle**: Any implementation of an interface must be substitutable wherever that interface is expected, without altering program correctness.

## Interfaces in Testing

Interfaces are a powerful enabler of testability. When code depends on an interface rather than a concrete class, test authors can substitute mock objects, stubs, or fakes that implement the same interface. This isolates the unit under test from external dependencies such as databases, network services, or file systems.

- **Mock objects**: Simulate the behavior of real objects and verify that expected interactions occur.
- **Stubs**: Provide predetermined responses to method calls without real logic.
- **Fakes**: Lightweight working implementations used for testing (such as an in-memory database).

Dependency injection frameworks rely heavily on interfaces to wire together components at runtime, making it straightforward to swap real implementations for test doubles during automated testing.

## Interfaces and the Diamond Problem

In languages that support multiple class inheritance, the diamond problem arises when a class inherits from two classes that share a common ancestor, creating ambiguity about which inherited method to use. Interfaces sidestep this problem because they define contracts without providing implementations. A class can implement multiple interfaces freely, and the implementing class is responsible for supplying unambiguous method bodies. Languages like Java and C# chose interfaces as their solution to multiple inheritance precisely to avoid this ambiguity.

## Common Patterns That Use Interfaces

- **Strategy pattern**: Define a family of interchangeable algorithms behind a common interface, allowing the algorithm to vary independently from the client.
- **Observer pattern**: Observers implement a listener interface, and subjects notify all registered observers through that interface.
- **Repository pattern**: Data access is abstracted behind a repository interface, decoupling business logic from persistence details.
- **Adapter pattern**: An adapter class implements a target interface while wrapping an incompatible class, allowing otherwise incompatible components to work together.
- **Plugin architecture**: Plugins implement a defined interface, enabling the host application to load and interact with extensions without compile-time knowledge of their concrete types.

## Related

Related topics to explore next include abstract classes and inheritance hierarchies, composition over inheritance, dependency injection and inversion of control, the SOLID design principles, design patterns such as strategy and observer, polymorphism and dynamic dispatch, protocol-oriented programming in Swift, traits and trait objects in Rust, structural typing in TypeScript and Go, and test doubles including mocks, stubs, and fakes.

## Summary

An interface is a contract that specifies what behavior a class or object must provide without dictating how that behavior is implemented. It is the primary mechanism for achieving abstraction, polymorphism, and loose coupling in modern software. Interfaces appear in virtually every mainstream language — whether as explicit keywords, abstract base classes, traits, or protocols — and they underpin critical design principles including dependency inversion and interface segregation. By programming to interfaces rather than concrete implementations, developers build systems that are modular, extensible, and testable, enabling components to be replaced, extended, and verified independently.

## References

- Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
- Martin, R. C. (2003). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
- Martin, R. C. (2018). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
- Bloch, J. (2018). *Effective Java* (3rd ed.). Addison-Wesley.
- Oracle. "Interfaces." *The Java Tutorials*. https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html
- Microsoft. "Interfaces (C# Programming Guide)." https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/interfaces/
- The Go Programming Language Specification. "Interface types." https://go.dev/ref/spec#Interface_types
- TypeScript Handbook. "Interfaces." https://www.typescriptlang.org/docs/handbook/interfaces.html
- Rust Reference. "Traits." https://doc.rust-lang.org/reference/items/traits.html
- Apple Developer Documentation. "Protocols." https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols/
