# Boyer-Moore algorithm

Question: What are the two key strategies that the Boyer-Moore string searching algorithm uses to efficiently skip portions of the text during pattern matching?

- [ ] Prefix Table and Suffix Table
- [ ] Good Suffix Rule and Bad Character Rule
- [ ] Divide and Conquer and Dynamic Programming
- [ ] Hash Function and Rolling Hash

<details>
  <summary>Answer</summary>
  <p>Good Suffix Rule and Bad Character Rule</p>
  <p>The Boyer-Moore algorithm uses two key strategies: the Bad Character Rule, which shifts the pattern based on mismatched characters, and the Good Suffix Rule, which handles situations where a suffix matches but a mismatch occurs afterward. Together, these rules allow the algorithm to skip large portions of text, achieving an average-case time complexity of O(n+m).</p>
</details>
