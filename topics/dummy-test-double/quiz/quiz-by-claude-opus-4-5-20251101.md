# Dummy (test double)

Question: What is the primary characteristic that distinguishes a dummy from other test doubles such as stubs, mocks, and spies?

- [ ] It tracks and records all method invocations for later verification
- [ ] It returns predefined responses when its methods are called
- [ ] It contains no logic and is never actually used during test execution
- [ ] It validates that specific interactions occurred during the test

<details>
  <summary>Answer</summary>
  <p>It contains no logic and is never actually used during test execution</p>
  <p>A dummy is a simple placeholder object that fulfills parameter requirements when the actual implementation is irrelevant to the test scenario. Unlike stubs (which return predefined responses), mocks (which verify interactions), and spies (which track invocations), dummies contain no logic whatsoever and are purely passive placeholders that exist only to satisfy method signatures.</p>
</details>
