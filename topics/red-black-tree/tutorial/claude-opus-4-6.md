# Red-black tree

A red-black tree is a self-balancing binary search tree in which every node carries an additional attribute: a color that is either red or black. By enforcing a small set of coloring and structural invariants, the tree guarantees that no root-to-leaf path is more than twice as long as any other, which keeps search, insertion, and deletion running in O(log n) time in the worst case. Red-black trees were introduced by Rudolf Bayer in 1972 as "symmetric binary B-trees" and later refined and named by Leonidas Guibas and Robert Sedgewick in 1978. They are one of the most widely deployed balanced tree structures in production software, underpinning standard-library containers in C++, Java, and many operating-system kernels.

## Properties and Invariants

A valid red-black tree must satisfy all of the following properties simultaneously. Violating any single property during an insertion or deletion triggers a rebalancing procedure to restore correctness.

- **Node color**: Every node is colored either red or black.
- **Root property**: The root node is always black.
- **Leaf property**: All external (NIL) leaves are considered black. These sentinel leaves simplify boundary conditions in algorithms.
- **Red property**: A red node must not have a red child. Equivalently, no two red nodes may appear consecutively on any path from root to leaf.
- **Black-height property**: For every node, all simple paths from that node down to descendant leaves contain the same number of black nodes. This count is called the node's black-height.

Together these rules ensure that the height of a red-black tree with n internal nodes is at most 2 log₂(n + 1), providing the logarithmic worst-case guarantee that makes the structure practical for large datasets.

## Insertion

Inserting a value into a red-black tree begins exactly like a standard binary search tree insertion: traverse the tree to find the correct leaf position and place the new node there. The new node is always colored red, because adding a red node cannot violate the black-height property. However, it may violate the red property if the new node's parent is also red.

Restoring the invariants after insertion requires examining the new node's uncle (the sibling of its parent) and applying one of several cases:

- **Uncle is red**: Recolor the parent and uncle to black, recolor the grandparent to red, and then move the focus up to the grandparent to check for further violations.
- **Uncle is black and the new node is an inner child**: Perform a rotation on the parent to convert this into the outer-child case.
- **Uncle is black and the new node is an outer child**: Perform a rotation on the grandparent and swap the colors of the parent and grandparent.

At most two rotations and O(log n) recolorings are needed for any single insertion, so the amortized structural change per insertion is constant.

## Deletion

Deletion is the most intricate operation on a red-black tree. The node to be removed is first handled as in an ordinary binary search tree: if it has two children, it is replaced by its in-order successor or predecessor, reducing the problem to removing a node with at most one child.

- **Deleted node or its replacement is red**: Simply remove the node and, if needed, recolor the replacement black. No further fix-up is required because black-height is preserved.
- **Deleted node is black with a black replacement**: This creates a "double-black" deficit on the affected path. A fix-up procedure examines the sibling and its children, applying rotations and recolorings across several cases until the double-black is resolved or pushed up to the root.

Deletion requires at most three rotations and O(log n) recolorings, keeping the operation firmly within O(log n) time.

## Time and Space Complexity

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| Search    | O(log n)    | O(log n)   |
| Insertion | O(log n)    | O(log n)   |
| Deletion  | O(log n)    | O(log n)   |
| Space     | O(n)        | O(n)       |

The consistent O(log n) worst-case performance for all mutation and query operations is the defining advantage of red-black trees over plain binary search trees, which can degrade to O(n) when inputs arrive in sorted or near-sorted order.

## Comparison with Other Balanced Trees

| Characteristic | Red-Black Tree | AVL Tree | B-Tree |
|---------------|---------------|----------|--------|
| Balance strictness | Loosely balanced (height ≤ 2 log n) | Strictly balanced (height ≤ 1.44 log n) | Balanced across multi-way nodes |
| Search speed | Slightly slower due to taller height | Faster lookups on average | Optimized for disk-based access |
| Insertion/Deletion cost | Fewer rotations (≤ 2 insert, ≤ 3 delete) | More rotations on average | Splits and merges of nodes |
| Typical use | In-memory containers, OS schedulers | Read-heavy in-memory workloads | Databases, file systems |
| Implementation complexity | Moderate | Moderate | Higher |

Red-black trees strike a balance between lookup speed and mutation cost. AVL trees provide faster searches because they maintain stricter balance, but they pay for it with more frequent rotations during insertions and deletions. B-trees are designed for storage systems where minimizing disk I/O is paramount and are not typically used for purely in-memory workloads.

## Real-World Applications

Red-black trees appear throughout systems software and language runtimes:

- **C++ Standard Library**: The `std::map`, `std::set`, `std::multimap`, and `std::multiset` containers are almost universally implemented as red-black trees across major compilers (GCC, Clang, MSVC).
- **Java Collections Framework**: `TreeMap` and `TreeSet` use red-black trees internally.
- **Linux kernel**: The Completely Fair Scheduler (CFS) uses a red-black tree to manage process scheduling, ordering tasks by their virtual runtime. The kernel also uses red-black trees for managing memory regions in virtual memory area (VMA) structures.
- **Computational geometry**: Sweep-line algorithms for segment intersection and Voronoi diagram construction use balanced trees, often red-black trees, as their event and status structures.
- **Databases and indexing**: Some in-memory database indexes use red-black trees when the dataset fits in RAM and disk-oriented B-tree properties are unnecessary.

## Advantages and Disadvantages

**Advantages:**

- Guaranteed O(log n) worst-case time for search, insertion, and deletion.
- Bounded number of rotations per operation, making mutation costs predictable.
- Well-understood and extensively tested in production for decades.
- Efficient in-memory performance with good cache behavior for moderate-sized datasets.

**Disadvantages:**

- Slightly taller than AVL trees on average, leading to marginally slower lookups in read-dominated workloads.
- More complex to implement correctly than simpler structures like unbalanced BSTs or skip lists.
- The color bit per node adds a small amount of memory overhead, though in practice this is often packed into an existing pointer or alignment padding.
- Not cache-optimal for very large datasets compared to B-trees or cache-oblivious structures.

## Related

Professionals working with red-black trees should also study AVL trees for comparison with a more strictly balanced alternative, B-trees and B+ trees for understanding disk-optimized balanced search structures, skip lists as a probabilistic alternative to balanced trees, splay trees for workloads with temporal locality, and treaps which combine binary search trees with heap ordering using randomization. Understanding hash tables is also valuable, as they solve the same dictionary-lookup problem with different trade-offs around ordering and worst-case guarantees.

## Summary

A red-black tree is a self-balancing binary search tree that uses node coloring and a set of structural invariants to guarantee O(log n) worst-case performance for search, insertion, and deletion. Its design minimizes the number of rotations required during mutations, making it especially well-suited for workloads that mix reads and writes. Red-black trees have proven their reliability and efficiency over decades of use in standard libraries, operating-system kernels, and language runtimes, and they remain a foundational data structure that every technology professional should understand.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapter 13: Red-Black Trees.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Section 3.3: Balanced Search Trees.
- Guibas, L. J., & Sedgewick, R. (1978). "A dichromatic framework for balanced trees." *Proceedings of the 19th Annual Symposium on Foundations of Computer Science (FOCS)*, 8–21.
- Bayer, R. (1972). "Symmetric binary B-trees: Data structure and maintenance algorithms." *Acta Informatica*, 1(4), 290–306.
- [Red-Black Tree — Wikipedia](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
- [Linux Kernel CFS Scheduler Documentation](https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html)
