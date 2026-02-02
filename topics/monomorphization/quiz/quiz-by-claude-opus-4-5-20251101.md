# Monomorphization

Question: What is the primary purpose of monomorphization in programming languages?

- [ ] To enable code to work with multiple types through runtime type checking
- [ ] To reduce the size of compiled binaries by sharing generic code across all types
- [ ] To generate specialized versions of generic code for each type, eliminating runtime checks
- [ ] To convert statically typed code into dynamically typed code for flexibility

<details>
  <summary>Answer</summary>
  <p>To generate specialized versions of generic code for each type, eliminating runtime checks</p>
  <p>Monomorphization optimizes performance by creating type-specific versions of generic functions at compile time. This eliminates the need for runtime type checks and conversions, allowing the compiler to fully optimize the code for each specific type it operates on. Languages like Rust and C++ use this technique to achieve zero-cost abstractions with generics.</p>
</details>
