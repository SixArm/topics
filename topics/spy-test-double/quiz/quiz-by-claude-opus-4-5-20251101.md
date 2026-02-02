# Spy (test double)

Question: What distinguishes a spy from other test doubles in software testing?

- [ ] It prevents any real method calls from executing during tests
- [ ] It can wrap around a real component, allowing actual method calls to proceed while capturing information about how methods were invoked
- [ ] It returns predefined values without tracking any interaction details
- [ ] It only works with database connections and cannot be used for API testing

<details>
  <summary>Answer</summary>
  <p>It can wrap around a real component, allowing actual method calls to proceed while capturing information about how methods were invoked</p>
  <p>Unlike other test doubles that completely replace dependencies, a spy can wrap around a real component and allow actual method calls to proceed while simultaneously capturing detailed information about how those methods were invoked, including parameters passed, return values, and the frequency of calls. This enables comprehensive interaction verification without disrupting the natural flow of execution.</p>
</details>
