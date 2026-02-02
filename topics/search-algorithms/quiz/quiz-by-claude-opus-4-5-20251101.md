# Search Algorithms

Question: What is the key requirement for using binary search on a collection of data?

- [ ] The collection must have uniformly distributed elements
- [ ] The collection must be stored in a linked list
- [ ] The collection must be sorted
- [ ] The collection must contain unique elements only

<details>
  <summary>Answer</summary>
  <p>The collection must be sorted</p>
  <p>Binary search works by repeatedly dividing the collection in half and comparing the target element to the middle element. This divide-and-conquer approach only works correctly when the elements are in sorted order, allowing the algorithm to determine which half of the collection to search next. Without sorting, the comparison with the middle element provides no reliable information about where the target might be located.</p>
</details>
