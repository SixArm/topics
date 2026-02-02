# Bubble sort algorithm

Question: What is the key optimization that can improve bubble sort's performance on already-sorted or nearly-sorted lists?

- [ ] Using a binary search to find element positions
- [ ] Sorting the list in reverse order first
- [ ] Adding a flag to detect if no swaps occurred during a pass
- [ ] Comparing every element to every other element

<details>
  <summary>Answer</summary>
  <p>Adding a flag to detect if no swaps occurred during a pass</p>
  <p>By tracking whether any swaps were made during a pass through the list, bubble sort can terminate early if no swaps occur—indicating the list is already sorted. This optimization improves best-case time complexity from O(n²) to O(n) for sorted or nearly-sorted inputs.</p>
</details>
