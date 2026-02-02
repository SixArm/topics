# String search algorithms

Question: Which string search algorithm preprocesses the pattern to identify where the search can safely skip ahead after a mismatch, achieving O(n+m) time complexity?

- [ ] Rabin-Karp Algorithm
- [ ] Knuth-Morris-Pratt (KMP) Algorithm
- [ ] Brute Force (Naive) String Search
- [ ] Boyer-Moore Algorithm

<details>
  <summary>Answer</summary>
  <p>Knuth-Morris-Pratt (KMP) Algorithm</p>
  <p>The KMP algorithm preprocesses the pattern to determine the maximum length of the proper suffix that matches a proper prefix. This preprocessing creates a "failure function" that allows the algorithm to skip unnecessary comparisons when a mismatch occurs, avoiding backtracking in the text. This results in O(n+m) time complexity, where n is the text length and m is the pattern length, making it significantly more efficient than the O(n*m) brute force approach.</p>
</details>
