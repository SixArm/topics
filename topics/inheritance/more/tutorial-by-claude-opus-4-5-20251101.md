## Inheritance

Inheritance is a foundational concept in object-oriented programming (OOP) that allows one class to acquire the properties and behaviors of another class. It establishes hierarchical relationships between classes, enabling code reuse, extensibility, and polymorphic behavior across software systems.

## Core Concept

At its essence, inheritance creates a parent-child relationship between classes. The parent class (also called base class, superclass, or parent) defines common attributes and methods. The child class (also called derived class, subclass, or child) inherits these members and can extend or modify them.

This relationship models real-world hierarchies. A "Vehicle" class might define properties like speed and methods like accelerate. "Car" and "Motorcycle" classes inherit from Vehicle, gaining these capabilities automatically while adding their own specialized features.

## The "Is-A" Relationship

Inheritance represents an "is-a" relationship between classes:

| Statement | Meaning |
|-----------|---------|
| Car is a Vehicle | Car inherits from Vehicle |
| Manager is an Employee | Manager inherits from Employee |
| Square is a Shape | Square inherits from Shape |

This relationship should be semantically meaningful. If you cannot naturally say "X is a Y," inheritance may not be the appropriate design choice.

## Key Benefits

**Code Reusability**: Common functionality defined once in a parent class is automatically available to all child classes. Changes to shared behavior need only occur in one location.

**Extensibility**: New classes can be added to a system by extending existing ones, without modifying the original code. This supports the open-closed principle—open for extension, closed for modification.

**Polymorphism**: Objects of different child classes can be treated uniformly through their common parent type. A method accepting a Vehicle parameter can work with any Car, Truck, or Motorcycle object.

**Hierarchical Organization**: Inheritance naturally models domain hierarchies, making code structure align with conceptual relationships in the problem domain.

## Method Overriding

Child classes can provide their own implementations of methods inherited from the parent class. This mechanism, called method overriding, allows specialization of behavior while maintaining a consistent interface.

| Concept | Description |
|---------|-------------|
| Inherited Method | Uses the parent class implementation unchanged |
| Overridden Method | Child provides its own implementation, replacing the parent's |
| Extended Method | Child calls parent implementation and adds additional behavior |

Method overriding enables polymorphic behavior—the same method call produces different results depending on the actual object type at runtime.

## Types of Inheritance

| Type | Description | Example |
|------|-------------|---------|
| Single Inheritance | One class inherits from exactly one parent | Dog inherits from Animal |
| Multiple Inheritance | One class inherits from multiple parents | FlyingCar inherits from Car and Aircraft |
| Multilevel Inheritance | Chain of inheritance across generations | Puppy inherits from Dog, which inherits from Animal |
| Hierarchical Inheritance | Multiple classes inherit from one parent | Cat, Dog, and Bird all inherit from Animal |
| Hybrid Inheritance | Combination of multiple inheritance types | Complex class hierarchies with mixed patterns |

Not all programming languages support all types. Many languages restrict or prohibit multiple inheritance due to complexity concerns like the diamond problem.

## Interface Inheritance

Beyond class inheritance, many languages support interface inheritance. An interface defines a contract—a set of method signatures that implementing classes must provide.

| Class Inheritance | Interface Inheritance |
|-------------------|----------------------|
| Inherits implementation | Inherits only signatures |
| "Is-a" relationship | "Can-do" relationship |
| Single parent (in many languages) | Multiple interfaces allowed |
| Reuses existing code | Defines required capabilities |

Interface inheritance is particularly valuable for achieving polymorphism without tight coupling to specific implementations.

## Inheritance vs. Composition

Inheritance is not always the optimal choice. Composition—containing objects of other classes rather than inheriting from them—offers an alternative approach.

| Aspect | Inheritance | Composition |
|--------|-------------|-------------|
| Relationship | "Is-a" | "Has-a" |
| Coupling | Tight coupling to parent | Looser coupling |
| Flexibility | Fixed at compile time | Can change at runtime |
| Reuse Mechanism | Automatic member access | Delegation to contained objects |
| Complexity | Can create deep hierarchies | Flatter structure |

**When to prefer inheritance**:
- Clear "is-a" relationship exists
- You need polymorphic behavior through a common type
- Subclass genuinely specializes the parent class

**When to prefer composition**:
- Relationship is "has-a" rather than "is-a"
- You need to combine behaviors from multiple sources
- You want runtime flexibility in object behavior
- You want to avoid fragile base class problems

The design principle "favor composition over inheritance" reflects that composition often provides greater flexibility with fewer constraints.

## Common Pitfalls

**Deep Inheritance Hierarchies**: Excessively deep inheritance chains become difficult to understand and maintain. Changes to parent classes can have unpredictable effects on distant descendants.

**Inappropriate Inheritance**: Using inheritance purely for code reuse, without a true "is-a" relationship, leads to confusing designs and violated expectations.

**Fragile Base Class Problem**: Changes to a parent class can break child classes in unexpected ways, especially when child classes depend on implementation details.

**Violation of Liskov Substitution**: Child classes should be substitutable for their parent classes without altering program correctness. When this principle is violated, polymorphism becomes unreliable.

## Best Practices

- Keep inheritance hierarchies shallow—prefer fewer levels
- Ensure child classes genuinely represent specializations of the parent
- Design parent classes with inheritance in mind or mark them as non-inheritable
- Use interfaces to define capabilities separate from implementation inheritance
- Consider composition as the default; use inheritance when it clearly fits
- Document the intended inheritance contract for parent classes
- Test child classes through parent class interfaces to verify substitutability

## Summary

Inheritance is a powerful OOP mechanism for establishing hierarchical relationships, promoting code reuse, and enabling polymorphism. When applied appropriately—with genuine "is-a" relationships and shallow hierarchies—it produces clean, maintainable designs. However, inheritance creates tight coupling between classes, and composition frequently provides a more flexible alternative. Effective object-oriented design balances both techniques based on the specific relationships and requirements in each situation.
