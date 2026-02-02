# AVL tree

Question: What is the balance factor of a node in an AVL tree, and what constraint must it satisfy to maintain tree balance?

- [ ] The sum of left and right subtree heights, constrained to be less than the tree's total height
- [ ] The height of the left subtree minus the height of the right subtree, constrained to be in the range [-1, 0, 1]
- [ ] The number of nodes in the left subtree divided by nodes in the right subtree, constrained to be between 0.5 and 2
- [ ] The depth of the node from the root, constrained to be no more than log(n) where n is total nodes

<details>
  <summary>Answer</summary>
  <p>The height of the left subtree minus the height of the right subtree, constrained to be in the range [-1, 0, 1]</p>
  <p>In an AVL tree, the balance factor is calculated as the height of the left subtree minus the height of the right subtree. This value must remain within [-1, 0, 1] for every node. If any node's balance factor falls outside this range after an insertion or deletion, the tree performs rotations (LL, RR, LR, or RL) to restore balance, ensuring O(log n) time complexity for search, insert, and delete operations.</p>
</details>
