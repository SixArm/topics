# Binary search algorithm

Question: What is the time complexity of binary search, and what is the key prerequisite for using it?

- [ ] O(n) time complexity; the data must be stored in a linked list
- [ ] O(log n) time complexity; the data must be sorted
- [ ] O(n log n) time complexity; the data must contain unique elements
- [ ] O(1) time complexity; the data must be indexed by a hash function

<details>
  <summary>Answer</summary>
  <p>O(log n) time complexity; the data must be sorted</p>
  <p>Binary search achieves O(log n) time complexity by repeatedly dividing the search interval in half, eliminating half of the remaining elements at each step. This efficiency is only possible because the data is sorted, allowing the algorithm to determine which half of the array to eliminate based on comparing the middle element to the target value.</p>
</details>
