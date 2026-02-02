# Memoization

Question: What is the primary purpose of memoization in software development?

- [ ] To reduce memory usage by compressing function arguments
- [ ] To store and reuse results of expensive function calls to avoid redundant computation
- [ ] To execute functions in parallel across multiple threads
- [ ] To validate function inputs before execution

<details>
  <summary>Answer</summary>
  <p>To store and reuse results of expensive function calls to avoid redundant computation</p>
  <p>Memoization is an optimization technique that caches the results of function calls in a lookup table (typically a hash table or dictionary). When the same function is called again with identical arguments, the precomputed result is returned directly from the cache instead of recalculating it. This significantly speeds up execution for functions that are called repeatedly with the same inputs, particularly for computationally expensive operations.</p>
</details>
