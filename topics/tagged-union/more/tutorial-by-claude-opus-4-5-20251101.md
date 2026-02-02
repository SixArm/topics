## Tagged Unions: A Comprehensive Tutorial

Tagged unions are one of the most powerful type system features available in modern programming languages. This tutorial provides a complete understanding of what they are, how they work, and when to use them.

## What Is a Tagged Union?

A tagged union is a data structure that can hold a value from a fixed set of different types, where each possible type is identified by a distinguishing "tag." Unlike a plain union (as found in C), a tagged union always knows which variant it currently contains, making it type-safe at runtime.

The concept goes by several names depending on the language and tradition:

| Term | Common Context |
|------|----------------|
| Tagged Union | General computer science, C/C++ contexts |
| Algebraic Data Type (ADT) | Functional programming (Haskell, ML family) |
| Sum Type | Type theory, functional programming |
| Discriminated Union | TypeScript, F# |
| Enum with Associated Data | Rust, Swift |
| Variant | C++17 std::variant, OCaml |

## Core Concept: The Tag

The tag is the distinguishing feature that separates tagged unions from untagged unions. It serves as a discriminator that tells the program exactly which type of data the union currently holds.

The tag can be implemented in several ways:

- **Implicit tags**: The language runtime automatically tracks which variant is active (Rust, Haskell, Swift)
- **Explicit integer tags**: A numeric value stored alongside the data (C-style implementation)
- **String tags**: A string identifier for the variant (some dynamic language implementations)
- **Enumerated tags**: Named constants representing each variant (most modern languages)

## How Tagged Unions Differ from Other Constructs

| Feature | Tagged Union | Plain Union | Class Hierarchy | Struct/Record |
|---------|--------------|-------------|-----------------|---------------|
| Multiple possible types | Yes | Yes | Yes (via inheritance) | No |
| Type safety | Yes | No | Yes | Yes |
| Runtime type knowledge | Always | Never | Via RTTI/reflection | N/A |
| Fixed set of variants | Yes | Yes | No (open) | N/A |
| Memory efficiency | High | High | Lower (vtables) | N/A |
| Exhaustiveness checking | Yes | No | No | N/A |

## The Shape Example

Consider modeling geometric shapes. A tagged union allows you to define a single "Shape" type that can be any of:

- **Rectangle**: Has width and height properties
- **Circle**: Has a radius property
- **Triangle**: Has base and height properties

Each variant carries its own specific data, but all share the common "Shape" type. The tag (Rectangle, Circle, or Triangle) tells the program which set of properties to expect.

## Key Benefits

### Exhaustiveness Checking

When you match on a tagged union, the compiler can verify that you handle every possible variant. If you add a new variant later, the compiler will flag every location where you forgot to handle it. This eliminates an entire class of bugs where code silently ignores unexpected cases.

### Memory Efficiency

A tagged union occupies only enough memory for the largest variant plus the tag. This is significantly more efficient than storing all possible fields simultaneously or using pointer indirection through a class hierarchy.

### Explicit Modeling of Alternatives

Tagged unions make the "or" relationship between types explicit in your code. When you see a type definition, you immediately understand that a value can be one thing OR another, not both simultaneously.

### Closed Set of Variants

The set of possible variants is fixed at compile time. This enables the compiler to make strong guarantees and optimizations that would be impossible with open inheritance hierarchies.

## Common Use Cases

### Error Handling

One of the most widespread uses is representing success or failure:

- A "Result" type containing either a success value OR an error value
- An "Option" type containing either a value OR nothing (null-safe programming)

### State Machines

Tagged unions naturally model state machines where an entity can be in exactly one state at a time:

- User authentication: Anonymous, Authenticated, Suspended
- Order processing: Pending, Shipped, Delivered, Cancelled
- Network connection: Connecting, Connected, Disconnected, Error

### Abstract Syntax Trees

Compilers and interpreters use tagged unions extensively:

- An expression can be a literal, a binary operation, a function call, or a variable reference
- A statement can be an assignment, a loop, a conditional, or a return

### Protocol Messages

Network protocols often have multiple message types:

- Request, Response, Notification, Error
- Each variant carries different payload data

### Domain Modeling

Real-world domains frequently have "one of these things" relationships:

- Payment method: CreditCard, BankTransfer, Cryptocurrency
- Contact information: Email, Phone, Address
- Document format: PDF, Word, Markdown

## Pattern Matching

Tagged unions are typically consumed through pattern matching, a control flow construct that:

1. Examines the tag to determine which variant is present
2. Extracts the associated data from that variant
3. Executes the appropriate branch of code

Pattern matching provides a clean, readable way to handle each variant explicitly, and the compiler ensures you don't forget any cases.

## Language Support

| Language | Syntax | Notes |
|----------|--------|-------|
| Rust | `enum` with variants | First-class support, widely used |
| Haskell | `data` declarations | Core language feature |
| TypeScript | Discriminated unions | Uses literal types as discriminators |
| Swift | `enum` with associated values | Similar to Rust |
| F# | Discriminated unions | ML-family syntax |
| Scala | Sealed traits/classes | Object-oriented encoding |
| OCaml | Variant types | Classic ML implementation |
| C++17 | `std::variant` | Library solution, less ergonomic |
| Java 17+ | Sealed classes + records | Recent addition |

## Potential Drawbacks

### Complexity for Simple Cases

For simple optional values or boolean choices, a tagged union may be overkill. Some languages provide simpler constructs for these cases.

### Serialization Challenges

Converting tagged unions to/from JSON or other formats requires careful design to preserve the tag information. Different serialization strategies exist:

- Tag as a separate field
- Wrapper object with variant name as key
- Type discriminator field

### Cross-Language Interoperability

When communicating between languages, you must ensure both sides agree on the tagged union representation. This can complicate API design.

### Learning Curve

Developers coming from languages without tagged unions may initially find pattern matching unfamiliar. The conceptual shift from "null checks" or "instanceof" to exhaustive matching takes practice.

## Best Practices

- **Keep variants cohesive**: All variants should represent meaningfully related alternatives
- **Use descriptive variant names**: The tag should clearly communicate what each variant represents
- **Prefer small unions**: A union with 20+ variants may indicate a design problem
- **Leverage exhaustiveness**: Let the compiler tell you when you've missed cases
- **Document invariants**: Explain any constraints that aren't captured by the type system
- **Consider extensibility**: If variants will frequently change, evaluate whether an open design (traits/interfaces) might be more appropriate

## When to Use Tagged Unions

Use tagged unions when:

- You have a closed, well-defined set of alternatives
- Each alternative carries different data
- You want compile-time guarantees about handling all cases
- You're modeling states, results, or tree structures

Avoid tagged unions when:

- The set of alternatives is open-ended and will grow unpredictably
- All alternatives share the same structure
- You need runtime extensibility (plugins, user-defined types)

## Conclusion

Tagged unions are a fundamental tool for precise data modeling. They make implicit choices explicit, enable exhaustive handling of alternatives, and provide strong compile-time guarantees. Whether you call them algebraic data types, discriminated unions, or enums with associated data, understanding this pattern will improve your ability to model complex domains accurately and safely.
