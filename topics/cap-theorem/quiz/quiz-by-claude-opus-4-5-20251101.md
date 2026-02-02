# CAP theorem

Question: According to the CAP theorem, how many of the three guarantees (Consistency, Availability, Partition tolerance) can a distributed system achieve simultaneously?

- [ ] All three, with proper engineering
- [ ] Only one at a time
- [ ] At most two out of three
- [ ] None, they are mutually exclusive

<details>
  <summary>Answer</summary>
  <p>At most two out of three</p>
  <p>The CAP theorem states that in a distributed system, it is impossible to simultaneously provide all three guarantees. In practice, system designers must choose which two properties to prioritize based on their application's requirements—for example, a banking application may sacrifice availability to maintain strong consistency, while a social media platform may prioritize availability over consistency.</p>
</details>
