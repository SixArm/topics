# Constraint satisfaction algorithms

Question: Which constraint satisfaction algorithm technique actively reduces variable domains through inference rules before conflicts occur, rather than simply backtracking when conflicts are detected?

- [ ] Backtracking
- [ ] Constraint Propagation
- [ ] Forward Checking
- [ ] Brute Force Search

<details>
  <summary>Answer</summary>
  <p>Constraint Propagation</p>
  <p>Constraint Propagation uses inference rules to proactively reduce the size of variable domains, making solutions easier to find. Unlike pure backtracking which only reacts after conflicts occur, or forward checking which only detects empty domains, constraint propagation anticipates and eliminates inconsistent values by identifying applicable constraints and propagating their effects across related variables.</p>
</details>
