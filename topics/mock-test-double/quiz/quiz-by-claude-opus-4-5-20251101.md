# Mock (test double)

Question: What is the primary advantage that distinguishes mock objects from stubs in software testing?

- [ ] Mocks are faster to execute than stubs
- [ ] Mocks verify behavior and interactions, not just state
- [ ] Mocks require less setup code than stubs
- [ ] Mocks can only be used with external systems

<details>
  <summary>Answer</summary>
  <p>Mocks verify behavior and interactions, not just state</p>
  <p>While stubs simply return predefined values, mock objects set expectations about how they should be used during test execution—including which methods should be called, how many times, with what parameters, and in what order. This allows tests to verify that the code under test interacts correctly with its dependencies, providing immediate feedback if the actual behavior doesn't match expected behavior.</p>
</details>
