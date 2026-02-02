# Rabin-Karp algorithm

Question: What is the key feature that makes the Rabin-Karp algorithm efficient for string searching?

- [ ] It uses binary search to locate pattern matches
- [ ] It sorts the text before searching
- [ ] It uses a rolling hash function that quickly updates when the sliding window moves
- [ ] It compares characters from right to left

<details>
  <summary>Answer</summary>
  <p>It uses a rolling hash function that quickly updates when the sliding window moves</p>
  <p>The rolling hash function is crucial to the Rabin-Karp algorithm's efficiency. It allows the algorithm to quickly update the hash value when a new character enters the sliding window or an old character exits, avoiding the need to recalculate the entire hash from scratch at each position. This enables the average-case time complexity of O(n+m), where n is the text length and m is the pattern length.</p>
</details>
