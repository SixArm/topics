## Object-Oriented Programming (OOP)

Object-oriented programming (OOP) is a programming paradigm centered on the concept of objects. Objects are created from classes—blueprints that define properties (data) and behaviors (methods). Each object is an instance of a class with its own state and behavior. OOP provides a structured approach to organizing code that mirrors how we conceptualize real-world entities and their interactions.

## The Four Pillars of OOP

OOP rests on four fundamental principles that work together to create maintainable, reusable, and scalable software.

### Encapsulation

Encapsulation bundles data and the methods that operate on that data within a single unit (the class), while restricting direct access to internal state. The object exposes a controlled public interface for interaction.

**Key benefits:**
- Protects internal state from unintended modification
- Reduces system complexity by hiding implementation details
- Enables changes to internal implementation without affecting external code
- Improves maintainability and debugging

**Implementation mechanisms:**
- Access modifiers (private, protected, public)
- Getter and setter methods
- Properties with controlled access

### Inheritance

Inheritance allows new classes (subclasses or derived classes) to be created from existing classes (superclasses or base classes), inheriting their properties and behaviors. This establishes a hierarchical relationship between classes.

**Key benefits:**
- Promotes code reuse
- Establishes logical hierarchies
- Enables polymorphic behavior
- Reduces redundancy

**Types of inheritance:**

| Type | Description |
|------|-------------|
| Single | A class inherits from one parent class |
| Multiple | A class inherits from multiple parent classes (supported in some languages) |
| Multilevel | A class inherits from a class that itself inherits from another class |
| Hierarchical | Multiple classes inherit from a single parent class |

### Polymorphism

Polymorphism allows objects of different types to be treated through a common interface. The same operation can behave differently depending on the object's actual type.

**Forms of polymorphism:**

| Form | Description |
|------|-------------|
| Compile-time (static) | Method overloading—same method name with different parameters |
| Runtime (dynamic) | Method overriding—subclass provides specific implementation of parent method |
| Parametric | Generics/templates that work with any data type |

**Key benefits:**
- Enables flexible and extensible designs
- Supports the open-closed principle (open for extension, closed for modification)
- Allows writing code that works with abstract types rather than concrete implementations

### Abstraction

Abstraction reduces complexity by exposing only essential features while hiding implementation details. It focuses on what an object does rather than how it does it.

**Implementation mechanisms:**
- Abstract classes (partial implementation with some methods left undefined)
- Interfaces (pure contracts with no implementation)
- Encapsulation (hiding internal complexity)

**Key benefits:**
- Simplifies complex systems
- Separates interface from implementation
- Enables loose coupling between components
- Facilitates team collaboration through well-defined contracts

## Classes and Objects

| Concept | Description |
|---------|-------------|
| Class | A blueprint or template defining properties and methods |
| Object | A specific instance of a class with its own state |
| Constructor | Special method called when creating an object |
| Destructor | Special method called when an object is destroyed |
| Member variable | Data stored within an object (also called field or attribute) |
| Method | Function defined within a class that operates on object data |

## Access Modifiers

| Modifier | Visibility |
|----------|------------|
| Private | Accessible only within the same class |
| Protected | Accessible within the class and its subclasses |
| Public | Accessible from anywhere |
| Package/Internal | Accessible within the same package or assembly |

## OOP Design Principles

Beyond the four pillars, several design principles guide effective OOP:

**SOLID Principles:**
- **Single Responsibility**: A class should have one reason to change
- **Open-Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Subclasses must be substitutable for their base classes
- **Interface Segregation**: Prefer specific interfaces over general-purpose ones
- **Dependency Inversion**: Depend on abstractions, not concrete implementations

**Additional principles:**
- **Composition over inheritance**: Favor object composition to achieve code reuse
- **Law of Demeter**: Objects should only communicate with immediate collaborators
- **DRY (Don't Repeat Yourself)**: Avoid code duplication

## Comparison: OOP vs Other Paradigms

| Aspect | OOP | Procedural | Functional |
|--------|-----|------------|------------|
| Primary unit | Objects | Procedures/Functions | Pure functions |
| State management | Mutable state in objects | Global/local variables | Immutable data |
| Data and behavior | Bundled together | Separate | Separate |
| Code reuse | Inheritance, composition | Function calls | Function composition |
| Side effects | Common | Common | Avoided |

## Common OOP Patterns

| Pattern | Purpose |
|---------|---------|
| Factory | Create objects without specifying exact class |
| Singleton | Ensure only one instance of a class exists |
| Observer | Notify dependent objects of state changes |
| Strategy | Define interchangeable algorithms |
| Decorator | Add behavior to objects dynamically |
| Adapter | Convert one interface to another |

## Languages Supporting OOP

| Language | OOP Support | Notes |
|----------|-------------|-------|
| Java | Full | Purely object-oriented (except primitives) |
| C++ | Full | Supports multiple inheritance |
| Python | Full | Everything is an object; supports multiple inheritance |
| C# | Full | Similar to Java with additional features |
| JavaScript | Prototype-based | Uses prototypes rather than classical inheritance |
| Ruby | Full | Pure object-oriented; everything is an object |
| Swift | Full | Modern OOP with protocols |
| Kotlin | Full | Modern JVM language with improved OOP |

## When to Use OOP

**OOP excels for:**
- Large, complex applications with many interacting components
- Systems that model real-world entities and relationships
- Applications requiring long-term maintainability
- Team-based development with clear component boundaries
- Projects benefiting from code reuse across similar entities

**Consider alternatives when:**
- Building simple scripts or utilities
- Implementing stateless data transformations
- Working with highly concurrent systems (functional may be preferable)
- Performance-critical code where abstraction overhead matters

## Summary

Object-oriented programming organizes software around objects that combine state and behavior. The four pillars—encapsulation, inheritance, polymorphism, and abstraction—provide mechanisms for creating modular, reusable, and maintainable code. When combined with design principles like SOLID and appropriate patterns, OOP enables the construction of complex systems that remain understandable and adaptable over time.
