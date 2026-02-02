# Splay tree

Question: What is the primary mechanism that distinguishes a splay tree from other binary search trees?

- [ ] It maintains strict balance by ensuring all leaf nodes are at the same depth
- [ ] It uses color-coded nodes to track balance factors during insertions
- [ ] It moves recently accessed nodes to the root through a series of rotations called splaying
- [ ] It stores elements in a fixed array structure for constant-time access

<details>
  <summary>Answer</summary>
  <p>It moves recently accessed nodes to the root through a series of rotations called splaying</p>
  <p>A splay tree is a self-adjusting binary search tree that optimizes for frequently accessed elements by "splaying" - performing tree rotations (zig-zag and zig-zig operations) to move the most recently accessed node to the root position. This provides excellent amortized performance by keeping frequently used data near the top of the tree, unlike AVL or Red-Black trees which maintain strict structural balance.</p>
</details>
