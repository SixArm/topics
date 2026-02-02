# Code quality metrics

Question: Which metric measures the number of linearly independent paths through source code, helping identify functions that may be difficult to test and maintain?

- [ ] Test coverage percentage
- [ ] Defect density
- [ ] Cyclomatic complexity
- [ ] Technical debt ratio

<details>
  <summary>Answer</summary>
  <p>Cyclomatic complexity</p>
  <p>Cyclomatic complexity measures the number of linearly independent paths through a program's source code. Higher values indicate more complex functions with more decision points (conditionals, loops), which tend to be harder to understand, test thoroughly, and maintain. This metric is particularly valuable for identifying code that may benefit from refactoring into simpler, more focused functions.</p>
</details>
