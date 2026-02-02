# Mutation testing

Question: What does it mean when a mutant "survives" in mutation testing?

- [ ] The mutation made the code more efficient
- [ ] The test suite detected and failed due to the mutation
- [ ] The tests passed despite the introduced mutation, indicating a potential gap in test coverage
- [ ] The original source code was successfully restored

<details>
  <summary>Answer</summary>
  <p>The tests passed despite the introduced mutation, indicating a potential gap in test coverage</p>
  <p>In mutation testing, when a mutant "survives," it means the test suite passed even though deliberate errors were introduced into the code. This suggests the tests are not comprehensive enough to detect that particular type of fault, revealing a weakness in the testing strategy that developers should address by writing more effective test cases.</p>
</details>
