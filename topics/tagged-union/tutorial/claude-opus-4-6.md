# Tagged unions

A tagged union is a data structure that can hold a value from a fixed set of distinct types, where each possible type is identified by a discriminating tag. Also known as discriminated unions, sum types, or variant types, tagged unions are a cornerstone of type-safe programming. They allow a single variable to represent one of several possible forms of data, while ensuring that the program always knows which form is currently active. Tagged unions appear prominently in functional programming languages such as Haskell and OCaml, in systems languages like Rust, and increasingly in mainstream languages such as TypeScript, Swift, and Kotlin.

## How tagged unions work

A tagged union combines two pieces of information: a tag (also called a discriminant) that identifies which variant is active, and a payload that holds the data associated with that variant. When a program inspects a tagged union value, it first checks the tag to determine which variant is present, then accesses the corresponding payload. This two-step process is typically enforced by the language's type system, which guarantees that the payload is only accessed in a type-safe manner.

The tag itself can take many forms depending on the language: an integer, an enumerated constant, a string literal, or a compiler-managed internal value. Some languages make the tag explicit and visible to the programmer, while others handle it implicitly behind the scenes. Regardless of representation, the tag serves the same purpose: it disambiguates which variant the union currently holds.

## Tagged unions versus untagged unions

The critical distinction between tagged and untagged unions lies in type safety. A traditional C-style union allows multiple types to share the same memory, but provides no built-in mechanism to track which type is currently stored. The programmer must manage this bookkeeping manually, which is error-prone.

| Property | Tagged union | Untagged union (C-style) |
|---|---|---|
| Type safety | Enforced by the compiler | Programmer's responsibility |
| Runtime tag | Automatically maintained | Must be tracked manually |
| Pattern matching | Exhaustiveness checked | Not applicable |
| Memory overhead | Slightly higher (tag storage) | Minimal |
| Risk of misaccess | Eliminated or caught at compile time | Silent undefined behavior |

Tagged unions trade a small amount of memory overhead for substantially stronger correctness guarantees. In practice, the tag is typically a single byte or integer, making the overhead negligible.

## Terminology across languages

Different programming communities use different names for the same underlying concept. Understanding this terminology is essential when reading documentation or working across language boundaries.

| Language | Term used | Syntax or keyword |
|---|---|---|
| Haskell | Algebraic data type (ADT) | `data` declaration |
| OCaml | Variant type | `type ... = A | B | C` |
| Rust | Enum (with data) | `enum` |
| TypeScript | Discriminated union | Union types with literal discriminant |
| Swift | Enum with associated values | `enum` with `case` |
| Kotlin | Sealed class / sealed interface | `sealed class` |
| F# | Discriminated union | `type ... = A | B | C` |
| Scala | Sealed trait with case classes | `sealed trait` |
| C / C++ | Tagged union (manual) | `union` + manual tag |

## Pattern matching and exhaustiveness

One of the most powerful features enabled by tagged unions is pattern matching. When a function receives a tagged union value, it can match against each possible variant and handle them individually. The compiler can then verify that every variant is accounted for, a property known as exhaustiveness checking.

Exhaustiveness checking provides two major benefits:

- **Compile-time safety.** If a new variant is added to the union, every function that matches on it will produce a compiler error until the new case is handled. This eliminates an entire class of bugs that would otherwise surface only at runtime.
- **Self-documenting logic.** Pattern matching makes the control flow explicit. Each variant and its handling are clearly visible, making the code easier to read and review.

Without exhaustiveness checking, as in languages that rely on if-else chains or switch statements without compiler enforcement, it is easy to forget a case or handle it incorrectly.

## Common use cases

Tagged unions are well suited to a variety of modeling scenarios:

- **Result types.** Representing the outcome of an operation that can either succeed with a value or fail with an error. This replaces exception-based error handling with explicit, type-safe alternatives.
- **Option types.** Representing a value that may or may not be present, replacing null references with a safe abstraction.
- **Abstract syntax trees.** Modeling the nodes of a parsed language, where each node type carries different data.
- **State machines.** Representing the states of a system, where each state may carry different associated data.
- **Protocol messages.** Modeling the different kinds of messages in a communication protocol, each with its own payload structure.
- **Domain modeling.** Capturing business rules where an entity can be in one of several mutually exclusive forms, such as a payment being a credit card charge, a bank transfer, or a digital wallet transaction.

## Advantages and drawbacks

Tagged unions provide strong guarantees but come with trade-offs that are worth understanding.

**Advantages:**

- Type safety eliminates an entire category of runtime errors related to accessing the wrong variant.
- Exhaustiveness checking ensures all cases are handled, making code more robust against future changes.
- They enable clear, declarative modeling of domain concepts with mutually exclusive alternatives.
- They compose well with other functional programming techniques such as mapping, folding, and monadic chaining.

**Drawbacks:**

- In languages without native support, implementing tagged unions requires boilerplate or workaround patterns.
- Adding a new variant to a widely used tagged union requires updating every match site, which can be labor-intensive in large codebases (this is the expression problem).
- Deeply nested tagged unions can become difficult to work with without helper functions or lenses.

## Related

Topics to explore next include algebraic data types for the broader theoretical framework, pattern matching for the primary mechanism used to consume tagged unions, type systems and type safety for the guarantees that make tagged unions valuable, sum types and product types for the mathematical foundations, option types and result types as the most common practical applications, sealed classes for the object-oriented equivalent in languages like Kotlin and Scala, and enumerations for the simpler case of tagged unions without associated data.

## Summary

Tagged unions are a foundational data modeling tool that allows a single type to represent one of several distinct variants, each identified by a tag and optionally carrying its own data. By combining a discriminant with a payload and enforcing access through pattern matching, tagged unions provide compile-time guarantees that eliminate entire classes of bugs related to type confusion and unhandled cases. They are widely supported across modern programming languages under various names, and they excel at modeling domain concepts, error handling, optional values, and state machines. As programming languages continue to adopt stronger type systems, tagged unions have moved from a niche feature of functional languages to an essential tool in every technology professional's repertoire.

## References

- Pierce, B. C. *Types and Programming Languages*. MIT Press, 2002. Chapters on algebraic data types and type safety.
- Rust Reference: Enumerations. https://doc.rust-lang.org/reference/items/enumerations.html
- TypeScript Handbook: Discriminated Unions. https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
- Haskell Wiki: Algebraic data type. https://wiki.haskell.org/Algebraic_data_type
- Swift Documentation: Enumerations. https://docs.swift.org/swift-book/documentation/the-swift-programming-language/enumerations/
- Kotlin Documentation: Sealed Classes. https://kotlinlang.org/docs/sealed-classes.html
- Harper, R. *Practical Foundations for Programming Languages*. Cambridge University Press, 2016. Coverage of sum types and their role in language design.
