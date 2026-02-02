# Fake (test double)

Question: What distinguishes a fake from other test doubles?

- [ ] It records method calls for later verification
- [ ] It provides a simplified but working implementation of a dependency
- [ ] It returns predetermined responses without any logic
- [ ] It throws exceptions to test error handling

<details>
  <summary>Answer</summary>
  <p>It provides a simplified but working implementation of a dependency</p>
  <p>A fake is a test double that contains actual working logic, but in a simplified form compared to the production version. Unlike stubs that return canned responses or mocks that record interactions, fakes implement real behavior—such as an in-memory database or a fake email service that stores messages in a list. This makes them more realistic for testing while remaining lightweight and deterministic.</p>
</details>
