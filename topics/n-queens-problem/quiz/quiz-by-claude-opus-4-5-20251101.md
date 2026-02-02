# N-queens problem

Question: What algorithmic technique is typically used to solve the n-queens problem?

- [ ] Dynamic programming with memoization
- [ ] Greedy selection with local optimization
- [ ] Recursive backtracking
- [ ] Divide and conquer with merge step

<details>
  <summary>Answer</summary>
  <p>Recursive backtracking</p>
  <p>The n-queens problem is a constraint satisfaction problem typically solved using a recursive backtracking algorithm. This approach places queens column by column, and when a placement violates constraints (same row, column, or diagonal as another queen), it backtracks to try alternative positions. This method efficiently prunes the search space by abandoning invalid branches early.</p>
</details>
