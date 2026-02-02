# Monolith architecture

Question: What is a primary scaling limitation of monolith architecture compared to microservices?

- [ ] Monoliths require multiple databases to function properly
- [ ] Monoliths cannot be deployed to cloud environments
- [ ] Scaling requires scaling the entire application, even if only specific components need more resources
- [ ] Monoliths must use multiple technology stacks simultaneously

<details>
  <summary>Answer</summary>
  <p>Scaling requires scaling the entire application, even if only specific components need more resources</p>
  <p>In monolith architecture, all components are contained within a single unit, so when scaling is needed, the entire application must be scaled together. This can be inefficient compared to microservices, where individual services can be scaled independently based on their specific resource demands.</p>
</details>
