# Hyrum's Law

Question: According to Hyrum's Law, what happens when an API has a sufficient number of users?

- [ ] Users will only rely on behaviors explicitly documented in the API contract
- [ ] All observable behaviors of the system will be depended on by somebody, regardless of what the contract promises
- [ ] The API becomes immune to compatibility issues during updates
- [ ] Undocumented behaviors are automatically removed from the system

<details>
  <summary>Answer</summary>
  <p>All observable behaviors of the system will be depended on by somebody, regardless of what the contract promises</p>
  <p>Hyrum's Law states that with enough users, people will start relying on even unintended or undocumented behaviors of an API. This means any observable behavior—including side effects, bugs, or implementation details—can become a de facto part of the interface. This has critical implications for software maintenance: changing or removing these behaviors becomes difficult without breaking compatibility for users who depend on them.</p>
</details>
