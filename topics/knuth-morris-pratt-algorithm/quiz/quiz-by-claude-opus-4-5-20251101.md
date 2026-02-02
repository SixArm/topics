# Knuth-Morris-Pratt algorithm

Question: What is the primary purpose of the "failure function" (partial match table) in the Knuth-Morris-Pratt algorithm?

- [ ] To sort the pattern string alphabetically before searching
- [ ] To determine how far to skip ahead in the text when a mismatch occurs
- [ ] To compress the text string for faster memory access
- [ ] To count the total number of characters in the text

<details>
  <summary>Answer</summary>
  <p>To determine how far to skip ahead in the text when a mismatch occurs</p>
  <p>The failure function (also called the partial match table) is preprocessed before searching and stores information about the pattern that allows the algorithm to avoid unnecessary character comparisons. When a mismatch occurs, instead of restarting from the beginning of the pattern, the algorithm uses the failure function to jump ahead efficiently, which enables the KMP algorithm to achieve its O(n+m) linear time complexity.</p>
</details>
