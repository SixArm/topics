Here is the comprehensive tutorial:

# Splay tree

A splay tree is a self-adjusting binary search tree (BST) that reorganizes its structure dynamically based on access patterns. When a node is accessed through any operation, the tree moves that node to the root through a sequence of rotations called "splaying." This adaptive behavior means that frequently accessed elements naturally migrate toward the root, resulting in faster subsequent lookups. Unlike rigidly balanced trees such as AVL or Red-Black trees, splay trees do not enforce strict balance invariants, yet they achieve excellent amortized time complexity across sequences of operations. Invented by Daniel Sleator and Robert Tarjan in 1985, the splay tree remains an important data structure in both theory and practice.

## How splaying works

Splaying is the defining operation of the splay tree. When a node is accessed, the tree performs a series of rotations to bring that node to the root position. These rotations come in three varieties, each handling a different structural relationship between the accessed node, its parent, and its grandparent.

- **Zig**: The simplest case, applied when the accessed node is a direct child of the root. A single rotation moves the node into the root position. This case occurs only as the final step of a splay when the tree has an even depth path.

- **Zig-Zig**: Applied when the accessed node and its parent are both left children (or both right children) of their respective parents. Two rotations in the same direction are performed, first rotating the parent with the grandparent, then rotating the node with the parent. This ordering is critical to the amortized performance guarantees.

- **Zig-Zag**: Applied when the accessed node is a left child of a right child (or a right child of a left child). Two rotations in opposite directions are performed, first rotating the node with its parent, then rotating the node with its new parent (the former grandparent). This is analogous to a double rotation in AVL trees.

The splay operation is repeated from the accessed node upward until it reaches the root. A key insight is that splaying not only moves the target node to the root but also roughly halves the depth of all nodes along the access path, improving the tree's structure for future operations.

## Core operations

All splay tree operations build on standard binary search tree logic, with the addition of a splay step that restructures the tree after each access.

- **Search**: Perform a standard BST search to locate the target node. Once found (or once the last node visited on the search path is reached), splay that node to the root. This ensures that repeated searches for the same key are fast.

- **Insert**: Search for the correct insertion position using standard BST traversal. Insert the new node as a leaf, then splay it to the root. This positions the newly inserted element for quick re-access.

- **Delete**: Search for the node to delete, which splays it to the root. Remove the root, leaving two subtrees. Splay the largest element in the left subtree to make it the new root, then attach the right subtree as the right child of the new root.

- **Split**: Splay a given key to the root, then detach the left or right subtree to produce two separate trees. This operation is efficient because splaying positions the split point at the root.

- **Join (Merge)**: Given two splay trees where all keys in one are less than all keys in the other, splay the maximum element of the smaller-keyed tree to the root and attach the larger-keyed tree as its right child.

## Amortized complexity

Splay trees do not guarantee O(log n) time for any single operation. A single access can take O(n) time in the worst case if the tree degenerates into a linked list. However, any sequence of m operations on an n-node splay tree takes O(m log n) total time, yielding an O(log n) amortized cost per operation.

| Operation | Worst-case (single) | Amortized |
|-----------|-------------------|-----------|
| Search    | O(n)              | O(log n)  |
| Insert    | O(n)              | O(log n)  |
| Delete    | O(n)              | O(log n)  |
| Splay     | O(n)              | O(log n)  |

The amortized analysis uses a potential function based on the logarithm of subtree sizes. The crucial property is that expensive operations on deep nodes dramatically improve the tree's structure, "paying forward" for many future cheap operations. This is formalized by the Access Lemma proved by Sleator and Tarjan.

## Optimality properties

Splay trees satisfy several remarkable theoretical properties that no other known BST achieves simultaneously.

- **Static Optimality Theorem**: If elements are accessed with fixed probabilities, a splay tree performs within a constant factor of the optimal static BST (such as the one constructed by Knuth's algorithm). In other words, splay trees automatically adapt to frequency skew without needing to know the frequencies in advance.

- **Working Set Property**: The cost of accessing an element is logarithmic in the number of distinct elements accessed since it was last touched, rather than logarithmic in the total number of elements. This makes splay trees efficient for workloads with temporal locality.

- **Dynamic Finger Property**: The cost of accessing an element is logarithmic in the rank distance between the current access and the previous access. This makes sequential or nearly-sequential access patterns very efficient.

- **Dynamic Optimality Conjecture**: Sleator and Tarjan conjectured that splay trees are dynamically optimal, meaning they perform within a constant factor of any BST algorithm, even one that knows the entire access sequence in advance. This conjecture remains one of the most important open problems in data structure theory.

## Comparison with other balanced BSTs

| Property | Splay tree | AVL tree | Red-Black tree | Treap |
|----------|-----------|----------|----------------|-------|
| Balance guarantee | None (amortized) | Strict (height) | Relaxed (color) | Probabilistic |
| Worst-case search | O(n) | O(log n) | O(log n) | O(n) expected O(log n) |
| Amortized search | O(log n) | O(log n) | O(log n) | O(log n) |
| Adapts to access pattern | Yes | No | No | No |
| Extra storage per node | None | Balance factor | Color bit | Priority value |
| Implementation complexity | Low | Moderate | High | Moderate |
| Cache behavior | Good for skewed access | Uniform | Uniform | Uniform |
| Split/Join efficiency | O(log n) amortized | O(n) | O(log n) | O(log n) expected |

The distinguishing advantage of splay trees is their adaptivity. When access patterns are non-uniform, which is the common case in real systems, splay trees can significantly outperform trees that maintain rigid balance. Their lack of per-node bookkeeping (no balance factors, colors, or priorities) also reduces memory overhead.

## Advantages and disadvantages

**Advantages:**

- No extra metadata stored per node, resulting in lower memory overhead than AVL, Red-Black, or treap structures.
- Automatically adapts to access patterns, delivering near-optimal performance for skewed or locality-heavy workloads.
- Simple implementation compared to Red-Black trees, requiring only rotation logic and no complex rebalancing cases.
- Efficient split and join operations make splay trees well-suited for applications like link-cut trees and certain types of caches.
- Good cache performance due to frequently accessed nodes residing near the root, which tends to stay in fast memory.

**Disadvantages:**

- Individual operations can take O(n) time, making splay trees unsuitable for hard real-time systems that require strict worst-case guarantees.
- Every access mutates the tree, meaning read operations are not truly read-only. This complicates concurrent access and makes splay trees difficult to use in multithreaded environments without locking.
- For uniform random access patterns, splay trees offer no advantage over statically balanced trees and may perform slightly worse due to constant rotation overhead.
- The amortized guarantee means performance can be unpredictable at the individual operation level, which can cause latency spikes.

## Practical applications

Splay trees are deployed in scenarios where access pattern adaptivity provides a tangible benefit over rigid balancing.

- **Caches and memory allocators**: Splay trees naturally implement a most-recently-used structure, making them useful for cache eviction policies and memory management. The GNU C library has used splay trees in its malloc implementation.
- **Network routing**: Splay trees have been used in network routers for managing routing tables, where certain destination prefixes are looked up far more frequently than others.
- **Garbage collectors**: Some garbage collection algorithms use splay trees to manage pools of free memory blocks efficiently.
- **Link-cut trees**: Tarjan's link-cut tree data structure, used in advanced graph algorithms for dynamic connectivity and maximum flow, is built on top of splay trees.
- **Compression**: Splay trees serve as the basis for splay tree-based compression algorithms, where the adaptive structure helps encode frequently seen symbols with shorter codes.
- **Windows NT kernel**: The Windows NT kernel historically used splay trees for managing virtual memory address spaces.

## Related

Explore these related topics to deepen your understanding of tree-based data structures and algorithms: balanced binary search trees such as AVL trees and Red-Black trees provide strict worst-case guarantees where splay trees do not; treaps combine BST structure with heap-ordered random priorities for probabilistic balancing; B-trees and B+ trees extend balanced search tree concepts to disk-based storage systems; amortized analysis is the mathematical framework that underpins splay tree complexity proofs; self-organizing lists share the same adaptive philosophy of moving frequently accessed elements to privileged positions; link-cut trees are the most prominent advanced application of splay trees in practice; and skip lists offer an alternative probabilistic approach to ordered dictionary operations.

## Summary

A splay tree is a self-adjusting binary search tree that moves accessed nodes to the root through a sequence of rotations called splaying. While individual operations may take linear time in the worst case, any sequence of operations achieves O(log n) amortized cost, and the tree automatically adapts to non-uniform access patterns without requiring any explicit frequency information. Splay trees require no per-node metadata, are simpler to implement than most balanced BSTs, and possess strong theoretical optimality properties including the static optimality theorem and the working set property. Their primary limitations are the lack of worst-case guarantees for individual operations and the mutation of tree structure on every access, which complicates concurrent use. For workloads exhibiting temporal locality, frequency skew, or sequential access patterns, splay trees remain among the most efficient and elegant data structures available.

## References

- Sleator, D. D., & Tarjan, R. E. (1985). "Self-Adjusting Binary Search Trees." *Journal of the ACM*, 32(3), 652-686. https://doi.org/10.1145/3828.3835
- Tarjan, R. E. (1985). "Amortized Computational Complexity." *SIAM Journal on Algebraic and Discrete Methods*, 6(2), 306-318.
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press. Chapter 13 (Red-Black Trees) and Problem 13-2 (Splay Trees).
- Goodrich, M. T., & Tamassia, R. (2014). *Data Structures and Algorithms in Java* (6th ed.). Wiley. Section on Splay Trees.
- Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching* (2nd ed.). Addison-Wesley.
- Open Data Structures Project. "Splay Trees." https://opendatastructures.org/ods-java/8_1_SplayTree_Self_Adju.html
