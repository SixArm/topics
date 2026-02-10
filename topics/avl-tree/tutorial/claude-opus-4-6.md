# AVL tree

An AVL tree is a self-balancing binary search tree named after its inventors, Georgy Adelson-Velsky and Evgenii Landis, who introduced it in 1962. It was the first data structure of its kind, designed to automatically maintain balance after insertions and deletions so that search, insert, and delete operations remain efficient in all cases. In a standard binary search tree, an unfortunate sequence of insertions can cause the tree to degenerate into a linked list, resulting in O(n) operation time. The AVL tree solves this problem by enforcing a strict balance invariant: for every node, the heights of its left and right subtrees differ by at most one. When an operation violates this invariant, the tree restores balance through rotations, guaranteeing O(log n) time complexity for all core operations.

## Balance factor

The balance factor is the central concept that distinguishes an AVL tree from a plain binary search tree. For any node in the tree, the balance factor is calculated as the height of its left subtree minus the height of its right subtree. A node is considered balanced if its balance factor is -1, 0, or +1.

| Balance Factor | Meaning |
|---|---|
| -1 | Right subtree is one level taller than the left |
| 0 | Left and right subtrees are of equal height |
| +1 | Left subtree is one level taller than the right |
| < -1 or > +1 | Node is unbalanced; rotation required |

After every insertion or deletion, the balance factors of affected nodes are recalculated along the path from the modified node back up to the root. If any node's balance factor falls outside the valid range, the tree triggers one or more rotations to restore balance.

## Rotations

Rotations are the mechanism by which an AVL tree restores its balance invariant. There are four types of rotations, each addressing a specific pattern of imbalance.

- **Left Rotation (LL):** Applied when a node becomes right-heavy because of an insertion or deletion in its right child's right subtree. The right child is promoted to the parent position, and the original parent becomes the left child.
- **Right Rotation (RR):** Applied when a node becomes left-heavy because of an insertion or deletion in its left child's left subtree. The left child is promoted to the parent position, and the original parent becomes the right child.
- **Left-Right Rotation (LR):** Applied when a node becomes left-heavy due to an insertion in its left child's right subtree. This is a double rotation: first a left rotation on the left child, then a right rotation on the unbalanced node.
- **Right-Left Rotation (RL):** Applied when a node becomes right-heavy due to an insertion in its right child's left subtree. This is a double rotation: first a right rotation on the right child, then a left rotation on the unbalanced node.

Single rotations handle cases where the imbalance follows a straight path (left-left or right-right). Double rotations handle zigzag cases (left-right or right-left). Each rotation runs in O(1) time, involving only a constant number of pointer reassignments.

## Core operations

All core operations in an AVL tree build on standard binary search tree logic, with the addition of balance checking and rotations after structural modifications.

**Insertion.** A new element is placed into the tree using standard BST insertion, walking left or right from the root based on comparisons until finding an empty position. After placement, the algorithm walks back up the tree, updating balance factors at each ancestor. If any ancestor's balance factor goes outside the valid range, the appropriate rotation is applied. At most one rotation (single or double) is needed to restore balance after an insertion.

**Deletion.** The target node is removed using standard BST deletion rules: if the node is a leaf, it is simply removed; if it has one child, the child replaces it; if it has two children, the in-order successor or predecessor replaces it, and that replacement node is then deleted from its original position. After deletion, balance factors are updated along the path from the deletion point to the root, and rotations are applied as needed. Unlike insertion, deletion may require multiple rotations along the path to the root.

**Search.** Searching proceeds identically to a standard BST: compare the target value with the current node, move left if smaller, move right if larger, and repeat until the value is found or a null pointer is reached. No rotations are involved. Because the tree is balanced, search always completes in O(log n) time.

## Time and space complexity

| Operation | Average Case | Worst Case |
|---|---|---|
| Search | O(log n) | O(log n) |
| Insertion | O(log n) | O(log n) |
| Deletion | O(log n) | O(log n) |
| Space | O(n) | O(n) |

The key advantage of the AVL tree is that its worst-case time complexity matches its average case. This is because the height of an AVL tree with n nodes is always bounded by approximately 1.44 * log2(n), meaning the tree never becomes significantly taller than a perfectly balanced tree. The space overhead is one balance factor integer stored per node, which is negligible.

## AVL tree vs. red-black tree

AVL trees and red-black trees are both self-balancing binary search trees, but they make different trade-offs between search speed and modification cost.

| Characteristic | AVL Tree | Red-Black Tree |
|---|---|---|
| Balance strictness | Strict (height difference at most 1) | Relaxed (longest path at most 2x shortest) |
| Search performance | Faster (shorter tree height) | Slightly slower (taller tree on average) |
| Insertion cost | Higher (more rotations on average) | Lower (at most 2 rotations) |
| Deletion cost | Higher (may require O(log n) rotations) | Lower (at most 3 rotations) |
| Storage overhead | Balance factor per node (2 bits) | Color bit per node (1 bit) |
| Best suited for | Read-heavy workloads | Write-heavy workloads |

In practice, red-black trees are more commonly used in standard library implementations (such as C++ `std::map` and Java `TreeMap`) because they offer better amortized performance for mixed workloads with frequent insertions and deletions. AVL trees are preferred in scenarios where lookups dominate, such as database indexing and in-memory dictionaries, because their stricter balancing yields shorter trees and faster searches.

## Practical applications

AVL trees are used in systems where predictable, fast lookup times are critical and the dataset experiences moderate modification rates.

- **Database indexing:** Some database engines use AVL trees for in-memory indexes where read performance is paramount.
- **In-memory dictionaries and sets:** When a sorted, balanced container is needed with guaranteed worst-case lookup time.
- **File system metadata:** Certain file systems use AVL trees to manage directory entries and file allocation data.
- **Real-time systems:** Applications with strict latency requirements benefit from the guaranteed O(log n) worst-case behavior, avoiding the unpredictable degradation that can occur with unbalanced trees.
- **Compilers and interpreters:** Symbol tables in compilers sometimes use AVL trees to efficiently manage variable and function name lookups.

## Advantages and disadvantages

**Advantages:**

- Guaranteed O(log n) worst-case time for search, insert, and delete.
- More tightly balanced than red-black trees, resulting in faster lookups.
- Deterministic performance makes it suitable for real-time and latency-sensitive applications.
- Well-understood and straightforward to reason about correctness.

**Disadvantages:**

- More rotations during insertions and deletions compared to red-black trees, leading to higher constant factors for write-heavy workloads.
- Slightly more complex implementation than a basic BST or a skip list.
- Each node requires storage for the balance factor, adding minor space overhead.
- For very large datasets with frequent writes, other structures such as B-trees or red-black trees may offer better overall throughput.

## Related

Topics to explore next include binary search trees as the foundational structure upon which AVL trees build, red-black trees as the most common alternative self-balancing BST, B-trees and B+ trees for disk-oriented balanced search structures used in databases and file systems, splay trees for self-adjusting BSTs that optimize for access locality, skip lists as a probabilistic alternative to balanced trees, and treaps which combine binary search trees with heap ordering using randomization.

## Summary

The AVL tree is a self-balancing binary search tree that enforces a strict balance invariant through rotations, guaranteeing O(log n) worst-case time complexity for search, insertion, and deletion. Its tight balancing produces shorter trees and faster lookups compared to more relaxed structures like red-black trees, making it an excellent choice for read-heavy workloads and latency-sensitive systems. While the additional rotation cost during modifications makes it less ideal for write-intensive scenarios, the AVL tree remains a foundational data structure in computer science and a practical tool in database indexing, real-time systems, and in-memory collections where predictable performance is non-negotiable.

## References

- Adelson-Velsky, G. M., and Landis, E. M. "An algorithm for the organization of information." *Doklady Akademii Nauk SSSR*, 146(2), 263-266, 1962. The original paper introducing the AVL tree.
- Knuth, Donald E. *The Art of Computer Programming, Volume 3: Sorting and Searching.* Addison-Wesley, 1998. Comprehensive treatment of balanced trees including AVL trees.
- Cormen, Thomas H., et al. *Introduction to Algorithms* (4th edition). MIT Press, 2022. Standard algorithms textbook covering AVL trees, red-black trees, and related structures.
- Sedgewick, Robert, and Wayne, Kevin. *Algorithms* (4th edition). Addison-Wesley, 2011. Accessible coverage of balanced search trees with practical context.
- Wikipedia: AVL tree. https://en.wikipedia.org/wiki/AVL_tree
