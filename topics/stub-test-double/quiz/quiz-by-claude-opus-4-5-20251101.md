# Stub (test double)

Question: What is the primary distinction between stubs and mocks as test doubles?

- [ ] Mocks return predefined values while stubs verify method calls
- [ ] Stubs provide state-based testing while mocks verify behavior
- [ ] Stubs require full dependency implementation while mocks do not
- [ ] Mocks simulate external APIs while stubs only work with databases

<details>
  <summary>Answer</summary>
  <p>Stubs provide state-based testing while mocks verify behavior</p>
  <p>Stubs differ from mocks in that they primarily provide state-based testing rather than behavior verification. While mocks verify that specific methods were called with correct parameters, stubs simply return predefined values when invoked. This makes stubs useful for simulating different system states without verifying how the code under test interacts with dependencies.</p>
</details>
