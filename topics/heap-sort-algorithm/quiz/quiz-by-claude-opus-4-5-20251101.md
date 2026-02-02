# Heap sort algorithm

Question: What is the time complexity of heap sort in both average and worst-case scenarios?

- [ ] O(n²) average, O(n²) worst-case
- [ ] O(n) average, O(n*log(n)) worst-case
- [ ] O(n*log(n)) average, O(n*log(n)) worst-case
- [ ] O(n*log(n)) average, O(n²) worst-case

<details>
  <summary>Answer</summary>
  <p>O(n*log(n)) average, O(n*log(n)) worst-case</p>
  <p>Heap sort maintains O(n*log(n)) time complexity in both average and worst-case scenarios because the heapify operation takes O(log(n)) time and it must be performed n times. Unlike algorithms such as quicksort that can degrade to O(n²) in the worst case, heap sort's performance is consistently predictable, making it valuable for applications requiring guaranteed performance bounds.</p>
</details>
