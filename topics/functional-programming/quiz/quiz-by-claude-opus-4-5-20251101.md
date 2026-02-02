# Functional programming

Question: What is the primary characteristic of a pure function in functional programming?

- [ ] It can modify global variables to store intermediate results
- [ ] It always produces the same output for the same input, with no side effects
- [ ] It must be written in a functional programming language like Haskell
- [ ] It requires mutable state to track function calls

<details>
  <summary>Answer</summary>
  <p>It always produces the same output for the same input, with no side effects</p>
  <p>A pure function in functional programming is defined by two key properties: determinism (given the same input, it always produces the same output) and the absence of side effects (it doesn't modify any external state). This predictability makes pure functions easier to test, reason about, and compose, while avoiding common issues like race conditions in concurrent programming.</p>
</details>
