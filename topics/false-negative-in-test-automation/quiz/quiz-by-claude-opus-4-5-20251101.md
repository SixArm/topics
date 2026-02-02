# False negative in test automation

Question: Why are false negatives considered more dangerous than false positives in test automation?

- [ ] They slow down the continuous integration pipeline by requiring manual review
- [ ] They generate excessive alerts that cause team fatigue
- [ ] They allow real defects to reach production undetected by reporting a pass when the test should fail
- [ ] They increase the overall cost of maintaining the test suite

<details>
  <summary>Answer</summary>
  <p>They allow real defects to reach production undetected by reporting a pass when the test should fail</p>
  <p>False negatives are particularly dangerous because they create a false sense of security about software quality. Unlike false positives, which generate unnecessary alerts but don't hide real issues, false negatives mask actual problems that need immediate attention, allowing defects to slip through the testing pipeline and potentially impact end users in production.</p>
</details>
