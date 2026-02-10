# Class diagram

A class diagram is a type of static structure diagram in the Unified Modeling Language (UML) that represents the structure of a system by showing its classes, their attributes and methods, and the relationships among them. It is one of the most widely used UML diagram types in software engineering and serves as a foundational tool for object-oriented analysis and design. Class diagrams provide a blueprint of a system's architecture, enabling teams to visualize how components relate before writing any code.

## Purpose and Benefits

Class diagrams serve multiple roles throughout the software development lifecycle. During the design phase, they help architects and developers define system structure. During implementation, they guide code organization. During maintenance, they serve as living documentation of the system's object model.

Key benefits include:

- **Communication**: They provide a shared visual language between developers, architects, business analysts, and stakeholders, bridging the gap between technical and non-technical audiences.
- **Design validation**: They allow teams to detect structural flaws, circular dependencies, and poor separation of concerns before implementation begins.
- **Code generation**: Many modern tools can generate skeleton code from class diagrams, accelerating development.
- **Documentation**: They serve as authoritative reference documentation for a system's object model, making onboarding and maintenance easier.
- **Refactoring guidance**: They make it straightforward to identify candidates for refactoring, such as classes with too many responsibilities or overly deep inheritance hierarchies.

## Core Elements

A class diagram is composed of several fundamental elements that together describe the static structure of a system.

**Class**: A class is a template or blueprint for creating objects. It defines a set of attributes (data) and methods (behavior). In a class diagram, a class is represented as a rectangle divided into three compartments: the class name at the top, attributes in the middle, and methods at the bottom.

**Object**: An object is a specific instance of a class. While class diagrams primarily show classes, object diagrams (a related UML type) show specific instances. Objects carry their own state based on the attribute definitions in their class.

**Attributes**: Attributes describe the properties or data fields of a class. Each attribute has a name, a type, and a visibility modifier. For example, a `Customer` class might have attributes such as `name: String` and `email: String`.

**Methods (Operations)**: Methods define the behavior a class can perform. Like attributes, methods have a name, a return type, parameters, and a visibility modifier. For example, a `Customer` class might have a method `placeOrder(item: Product): Order`.

## Visibility Modifiers

Visibility modifiers control the accessibility of attributes and methods. UML defines four standard levels of visibility.

| Symbol | Modifier    | Meaning                                                        |
|--------|-------------|----------------------------------------------------------------|
| `+`    | Public      | Accessible from any other class                                |
| `-`    | Private     | Accessible only within the declaring class                     |
| `#`    | Protected   | Accessible within the declaring class and its subclasses       |
| `~`    | Package     | Accessible to classes within the same package or namespace      |

Choosing appropriate visibility is central to encapsulation, one of the core principles of object-oriented design. A well-designed class diagram exposes only what is necessary through public interfaces while keeping internal implementation details private.

## Relationships

Relationships are the connections between classes that describe how they interact and depend on one another. Understanding the distinctions between relationship types is essential for accurate modeling.

**Association**: A general relationship indicating that one class uses or interacts with another. It is drawn as a solid line between two classes. Associations can be unidirectional or bidirectional and may include role names and multiplicity indicators.

**Aggregation**: A specialized form of association representing a "has-a" or "whole-part" relationship where the part can exist independently of the whole. It is drawn as a solid line with an open diamond at the whole end. For example, a `Department` aggregates `Employee` objects, but employees can exist without the department.

**Composition**: A stronger form of aggregation where the part cannot exist without the whole. It is drawn as a solid line with a filled diamond at the whole end. For example, a `House` is composed of `Room` objects; if the house is destroyed, the rooms cease to exist.

**Inheritance (Generalization)**: A relationship indicating that one class (the subclass) inherits attributes and methods from another class (the superclass). It is drawn as a solid line with a closed, unfilled arrowhead pointing to the superclass. For example, `SavingsAccount` and `CheckingAccount` inherit from `BankAccount`.

**Dependency**: A weaker relationship indicating that one class depends on another, typically because it uses it as a method parameter or local variable. It is drawn as a dashed line with an open arrowhead.

**Realization (Interface Implementation)**: A relationship indicating that a class implements the behavior specified by an interface. It is drawn as a dashed line with a closed, unfilled arrowhead pointing to the interface.

## Relationship Comparison

| Relationship   | Strength  | Symbol                   | Lifetime Coupling | Example                            |
|----------------|-----------|--------------------------|--------------------|------------------------------------|
| Dependency     | Weakest   | Dashed arrow             | Temporary          | A class uses another as a parameter|
| Association    | Moderate  | Solid line               | Flexible           | Student enrolls in Course          |
| Aggregation    | Moderate  | Open diamond             | Independent parts  | Department has Employees           |
| Composition    | Strong    | Filled diamond           | Dependent parts    | House contains Rooms               |
| Inheritance    | Strong    | Closed unfilled arrow    | Permanent          | Dog extends Animal                 |
| Realization    | Strong    | Dashed closed arrow      | Contract-based     | List implements Collection         |

## Multiplicity

Multiplicity indicates how many instances of one class can be associated with instances of another class. It is placed near the ends of association lines.

| Notation  | Meaning                          |
|-----------|----------------------------------|
| `1`       | Exactly one                      |
| `0..1`    | Zero or one                      |
| `*`       | Zero or more                     |
| `1..*`    | One or more                      |
| `0..*`    | Zero or more (same as `*`)       |
| `m..n`    | A specific range (e.g., `2..5`)  |

Multiplicity is critical for understanding data cardinality and directly influences database schema design, API contracts, and validation logic.

## Abstract Classes and Interfaces

An **abstract class** is a class that cannot be instantiated directly and is intended to be subclassed. It may contain both concrete and abstract methods. In UML, the class name is written in italics or annotated with the stereotype `{abstract}`.

An **interface** defines a contract of methods that implementing classes must provide. It contains only method signatures, not implementations. In UML, an interface is represented with the stereotype `<<interface>>` above the name.

The choice between abstract classes and interfaces depends on whether shared implementation is needed (abstract class) or whether a pure behavioral contract is sufficient (interface). Many modern languages allow a class to implement multiple interfaces but extend only one abstract class.

## Best Practices

- **Focus on the domain**: Model classes that represent meaningful domain concepts, not implementation details like utility classes or framework plumbing.
- **Use appropriate detail levels**: High-level diagrams for architecture discussions should omit attributes and methods; detailed diagrams for developers should include them.
- **Limit diagram scope**: A single class diagram should focus on one subsystem or feature area. Attempting to capture an entire large system in one diagram produces an unreadable result.
- **Keep diagrams current**: Treat class diagrams as living documents. Outdated diagrams are worse than no diagrams because they mislead.
- **Apply design principles**: Use class diagrams to verify adherence to SOLID principles, particularly the Single Responsibility Principle and the Dependency Inversion Principle.
- **Validate multiplicity**: Ensure multiplicity annotations accurately reflect business rules, as errors here propagate into database design and code.

## Common Mistakes

- **Over-modeling**: Including every class, attribute, and method in a single diagram, making it too complex to be useful.
- **Ignoring relationships**: Showing classes in isolation without specifying how they relate to each other defeats the purpose of the diagram.
- **Confusing aggregation and composition**: Misusing the open versus filled diamond leads to incorrect assumptions about object lifetime and ownership.
- **Skipping visibility**: Omitting visibility modifiers removes valuable information about encapsulation boundaries.
- **Treating diagrams as code**: Class diagrams are models, not source code. They should capture intent and structure at an appropriate level of abstraction.

## Related

Topics to explore next include object diagrams for modeling specific instances at runtime, sequence diagrams for modeling dynamic behavior and method call flows, component diagrams for higher-level architectural views, entity-relationship diagrams for database modeling, the Unified Modeling Language specification for the full set of diagram types, object-oriented design principles such as SOLID, and design patterns such as those cataloged by the Gang of Four.

## Summary

A class diagram is a cornerstone of object-oriented modeling that captures the static structure of a system by depicting classes, their attributes and methods, visibility rules, and the relationships between them. By distinguishing between associations, aggregations, compositions, inheritance, dependencies, and realizations, class diagrams provide precise and actionable blueprints for system design. When used with appropriate scope, detail, and discipline, they improve communication across teams, validate architectural decisions early, and serve as enduring documentation throughout a system's lifecycle.

## References

- Booch, G., Rumbaugh, J., & Jacobson, I. (2005). *The Unified Modeling Language User Guide* (2nd ed.). Addison-Wesley.
- Fowler, M. (2004). *UML Distilled: A Brief Guide to the Standard Object Modeling Language* (3rd ed.). Addison-Wesley.
- Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
- Object Management Group. (2017). *OMG Unified Modeling Language (UML) Specification, Version 2.5.1*. https://www.omg.org/spec/UML/2.5.1
- Larman, C. (2004). *Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design and Iterative Development* (3rd ed.). Prentice Hall.
