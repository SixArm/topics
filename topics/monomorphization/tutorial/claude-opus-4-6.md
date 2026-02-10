# Monomorphization

Monomorphization is a compiler optimization technique that transforms generic (polymorphic) code into specialized (monomorphic) versions for each concrete type used at compile time. Rather than relying on a single generic implementation that must handle any type through indirection or runtime dispatch, the compiler generates dedicated copies of functions, methods, or data structures tailored to the specific types they are instantiated with. This eliminates the overhead of runtime type checks, virtual dispatch, and boxing, producing code that is as fast as if the developer had written each specialized version by hand.

## How Monomorphization Works

When a developer writes a generic function or data structure, the compiler analyzes every call site and instantiation throughout the program. For each unique combination of concrete type arguments, the compiler generates a fully specialized copy of the generic code. This process occurs during compilation, before the program ever runs.

The key steps are:

- **Generic definition**: The developer writes a single function or type parameterized over one or more type variables.
- **Instantiation analysis**: The compiler scans the entire program to identify every concrete type that is substituted for each type parameter.
- **Code generation**: For each unique combination of concrete types, the compiler emits a separate, fully specialized version of the function or data structure.
- **Call site rewriting**: Each call to the generic function is replaced with a direct call to the appropriate specialized version, enabling static dispatch.
- **Optimization**: Each specialized version can then be further optimized by the compiler's backend, including inlining, constant folding, and vectorization, because the concrete types and their layouts are fully known.

## Monomorphization vs. Type Erasure

Languages that support generics broadly fall into two camps regarding how they implement them at runtime. Monomorphization and type erasure represent fundamentally different trade-offs.

| Aspect | Monomorphization | Type Erasure |
|---|---|---|
| Dispatch mechanism | Static (direct calls) | Dynamic (vtable or interface lookup) |
| Runtime overhead | None; fully specialized | Indirection and possible boxing |
| Binary size | Larger; one copy per type instantiation | Smaller; single generic implementation |
| Compile time | Longer; more code to generate and optimize | Shorter; less duplication |
| Optimization potential | High; compiler knows concrete types | Limited; types are opaque at runtime |
| Typical languages | Rust, C++, D | Java, Go (prior to 1.18), Haskell (in some cases) |

Type erasure keeps a single compiled representation and uses runtime mechanisms such as vtables, interface tables, or boxed values to handle different types. This produces smaller binaries and faster compilation but sacrifices runtime performance due to indirection. Monomorphization makes the opposite trade-off: it accepts larger binaries and longer compile times in exchange for zero-cost abstraction at runtime.

## Languages That Use Monomorphization

Different languages adopt monomorphization to varying degrees and with different implementation strategies.

- **Rust**: Monomorphization is the primary strategy for generics. Every generic function and trait implementation is monomorphized, which is central to Rust's "zero-cost abstractions" philosophy. Trait objects offer an opt-in alternative using dynamic dispatch when binary size or compile time is a concern.
- **C++**: Templates are monomorphized at compile time. Each template instantiation produces a separate specialization, and the linker deduplicates identical instantiations across translation units. Template metaprogramming relies heavily on this behavior.
- **D**: Similar to C++, D templates are monomorphized, generating specialized code for each instantiation.
- **Swift**: The Swift compiler monomorphizes generics when the concrete types are known at compile time, and falls back to a witness-table-based approach (similar to type erasure) when they are not.
- **C# and .NET**: The .NET runtime monomorphizes generics for value types (structs) at JIT compilation time, while reference types share a single implementation with type erasure. This hybrid approach balances performance and code size.

## Benefits

Monomorphization delivers several concrete advantages for performance-sensitive software:

- **Zero runtime dispatch overhead**: Specialized functions are called directly without indirection through vtables or function pointers, enabling the CPU's branch predictor and instruction cache to work efficiently.
- **Full inlining opportunities**: Because the compiler knows the exact function being called, it can inline the specialized version, eliminating call overhead entirely and exposing further optimization opportunities.
- **Type-specific memory layout**: Data structures are laid out in memory according to the concrete type's size and alignment, avoiding boxing and heap allocation for value types.
- **Backend optimization**: The compiler backend can apply loop unrolling, SIMD vectorization, constant propagation, and other optimizations that depend on knowing concrete types and sizes.
- **No runtime type metadata**: The generated code does not need to carry or consult type metadata at runtime, reducing both memory usage and instruction count.

## Drawbacks

The technique is not without costs, and understanding its drawbacks is essential for making informed design decisions:

- **Code bloat**: Generating a separate copy of a function for every type instantiation can significantly increase binary size, especially in large codebases with many generic types. This is sometimes called "template bloat" in C++.
- **Longer compile times**: The compiler must generate, optimize, and link many more function bodies, which directly increases build times. This is a frequently cited pain point in both Rust and C++ projects.
- **Instruction cache pressure**: Larger binaries mean more code competing for space in the CPU's instruction cache. In pathological cases, the performance gained from specialization can be offset by increased cache misses.
- **Requires whole-program type knowledge**: The compiler must see all instantiations to generate specialized code, which can complicate separate compilation and dynamic linking. Rust addresses this partly through its compilation unit model, while C++ relies on header-based inclusion and linker deduplication.
- **Incompatible with certain dynamic patterns**: Code that requires runtime polymorphism over an open set of types cannot be monomorphized and must use dynamic dispatch instead.

## When Monomorphization Matters Most

Monomorphization has the greatest impact in scenarios where the runtime cost of generic abstraction would otherwise be significant:

- **High-performance computing and numerical code**: Operations on large arrays of data benefit enormously from type-specialized loops that can be vectorized.
- **Systems programming**: Operating system kernels, embedded systems, and game engines cannot afford the overhead of runtime dispatch in hot paths.
- **Data structure libraries**: Generic containers such as vectors, hash maps, and trees perform better when their internal operations are specialized for the element type.
- **Serialization and deserialization**: Generating type-specific serialization code avoids reflection overhead and enables compile-time validation.

In contrast, monomorphization matters less in application-level code where I/O latency or network round-trips dominate execution time, and the overhead of dynamic dispatch is negligible.

## Related

Topics to explore next include generic programming and parametric polymorphism, which provide the foundation that monomorphization optimizes. Dynamic dispatch and vtable-based polymorphism offer the alternative approach for runtime flexibility. Trait objects in Rust and virtual functions in C++ illustrate the opt-in escape from monomorphization. Compile-time code generation, template metaprogramming, and zero-cost abstractions are closely related concepts. Understanding binary size optimization and link-time optimization helps manage the trade-offs that monomorphization introduces.

## Summary

Monomorphization is a compiler optimization that generates specialized versions of generic code for each concrete type used in a program, replacing polymorphic dispatch with direct, type-specific function calls. It eliminates runtime overhead associated with type erasure, boxing, and virtual dispatch, enabling the compiler to produce code that is as efficient as hand-written specialized implementations. The trade-off is increased binary size and longer compile times, which must be weighed against the performance benefits. Languages such as Rust and C++ rely on monomorphization as a cornerstone of their zero-cost abstraction guarantees, while other languages adopt hybrid approaches that combine monomorphization for value types with type erasure for reference types.

## References

- Rust Reference, "Monomorphization" — https://doc.rust-lang.org/reference/items/generics.html
- The Rustonomicon, "Monomorphization and Code Bloat" — https://doc.rust-lang.org/nomicon/
- C++ Standard, "Template Instantiation" (ISO/IEC 14882) — https://isocpp.org/
- Stroustrup, B., *The C++ Programming Language*, 4th Edition, Addison-Wesley, 2013.
- Kennedy, A. and Syme, D., "Design and Implementation of Generics for the .NET Common Language Runtime," *ACM SIGPLAN Notices*, 2001 — https://dl.acm.org/doi/10.1145/378795.378797
- Swift Documentation, "Generics" — https://docs.swift.org/swift-book/documentation/the-swift-programming-language/generics/
- Dragos, I., "Compiling Generics Through User-Directed Type Specialization," EPFL, 2010.
