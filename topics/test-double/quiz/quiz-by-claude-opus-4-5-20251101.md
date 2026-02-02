# Test double

Question: What is the primary difference between a stub and a mock in test doubles?

- [ ] A stub is used for performance testing while a mock is used for unit testing
- [ ] A stub records method calls for later inspection while a mock provides predetermined responses
- [ ] A stub provides predetermined responses to method calls while a mock verifies that expected interactions occurred
- [ ] A stub requires a real database connection while a mock uses in-memory storage

<details>
  <summary>Answer</summary>
  <p>A stub provides predetermined responses to method calls while a mock verifies that expected interactions occurred</p>
  <p>A stub is designed to return controlled, predetermined responses during tests, allowing testers to simulate specific scenarios. A mock, on the other hand, is pre-programmed with expectations about how it should be called and verifies that these expectations are met—failing the test if the expected interactions don't occur. This distinction is crucial: stubs control input to the system under test, while mocks verify output behavior.</p>
</details>
