# Binary Search Tree

Question: What is the time complexity for search, insert, and delete operations in a balanced binary search tree?

- [ ] O(n) for all operations
- [ ] O(1) for search, O(n) for insert and delete
- [ ] O(log n) for all operations
- [ ] O(n log n) for all operations

<details>
  <summary>Answer</summary>
  <p>O(log n) for all operations</p>
  <p>In a balanced binary search tree, the divide-and-conquer approach allows search, insert, and delete operations to eliminate half the remaining nodes at each step, resulting in O(log n) time complexity. This efficiency depends on the tree being balanced; an unbalanced tree can degrade to O(n) in the worst case, which is why self-balancing variants like AVL trees and Red-Black trees are often used.</p>
</details>
