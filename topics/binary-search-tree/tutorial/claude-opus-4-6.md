# Binary search tree (BST)

A binary search tree (BST) is a hierarchical data structure built on the concept of a binary tree, where each node holds a value and has at most two children. The defining property of a BST is its ordering constraint: for any given node, every value in its left subtree is less than the node's value, and every value in its right subtree is greater. This invariant transforms a simple tree into a powerful tool for organizing data in a way that supports fast lookup, insertion, and deletion. BSTs are foundational in computer science and appear throughout software systems ranging from database indexing to in-memory caches and language runtime internals.

## How a BST Is Structured

A BST is composed of nodes, each containing a key (the value used for ordering), optional satellite data, and pointers to a left child and a right child. The topmost node is the root. Nodes with no children are called leaf nodes. The depth of a node is the number of edges from the root to that node, and the height of the tree is the maximum depth among all nodes.

The ordering property is recursive: every subtree of a BST is itself a BST. This recursive structure is what enables divide-and-conquer strategies for all major operations. When a BST is well-balanced, meaning the left and right subtrees of every node are roughly equal in size, the height of the tree remains logarithmic relative to the number of elements, which directly determines the efficiency of operations.

## Core Operations

The four primary operations on a BST are search, insertion, deletion, and traversal. Each exploits the ordering invariant to avoid examining every node in the tree.

**Search** begins at the root and compares the target value against the current node. If the target is smaller, the search moves to the left child; if larger, it moves to the right child. This halving process continues until the value is found or a null reference is reached, indicating the value is absent.

**Insertion** follows the same path as a search. When it reaches a null position where the target would have been found, it places a new node there. The new node always becomes a leaf, preserving the existing structure.

**Deletion** is the most involved operation because removing a node must not violate the ordering property. Three cases arise: removing a leaf node (simply detach it), removing a node with one child (replace the node with its child), and removing a node with two children (replace the node's value with its in-order successor or predecessor, then delete that successor or predecessor node).

**Traversal** visits every node in a defined order. In-order traversal (left, root, right) yields all values in sorted ascending order, which is one of the most useful properties of a BST.

## Time Complexity

The performance of BST operations depends heavily on the shape of the tree. The following table summarizes time complexity across different scenarios.

| Operation | Best / Average Case (Balanced) | Worst Case (Degenerate) |
|-----------|-------------------------------|-------------------------|
| Search    | O(log n)                      | O(n)                    |
| Insert    | O(log n)                      | O(n)                    |
| Delete    | O(log n)                      | O(n)                    |
| Traversal | O(n)                          | O(n)                    |
| Minimum   | O(log n)                      | O(n)                    |
| Maximum   | O(log n)                      | O(n)                    |

The worst case occurs when elements are inserted in sorted (or reverse-sorted) order, causing the tree to degenerate into a linked list where every node has only one child. In this scenario the height becomes n rather than log n, and every operation must walk the full length of the chain.

## Traversal Orders

BSTs support several systematic ways to visit every node. Each traversal order serves different purposes.

- **In-order (left, root, right):** Produces elements in sorted ascending order. This is the most common traversal for BSTs and is used whenever a sorted sequence is needed.
- **Pre-order (root, left, right):** Visits the root before its subtrees. Useful for creating a copy of the tree or serializing its structure for later reconstruction.
- **Post-order (left, right, root):** Visits children before the parent. Commonly used for safely deallocating or deleting all nodes, since children are processed before the node that references them.
- **Level-order (breadth-first):** Visits nodes level by level from the root downward. Useful for printing the tree by depth or performing breadth-first analysis.

## The Balance Problem

An unbalanced BST loses its logarithmic performance advantage. If data arrives in a pattern that consistently skews the tree in one direction, the structure degrades. This is not a theoretical edge case; it occurs frequently in practice when inserting pre-sorted data, monotonically increasing IDs, or timestamps.

The solution is to use self-balancing BST variants that automatically restructure the tree during insertions and deletions to maintain a bounded height. The most widely used self-balancing BSTs are:

- **AVL tree:** Maintains a strict balance factor (the height difference between left and right subtrees is at most 1 for every node). Provides the tightest balance and fastest lookups, but rotations during insertion and deletion are more frequent.
- **Red-Black tree:** Uses node coloring rules to enforce a weaker balance guarantee (the longest path is at most twice the shortest). Fewer rotations on average make it faster for write-heavy workloads. It is the backing structure for Java's TreeMap, C++'s std::map, and many operating system schedulers.
- **Splay tree:** Moves recently accessed nodes to the root through rotations, providing amortized O(log n) performance and excellent cache locality for workloads with temporal access patterns.

## BST Compared to Other Data Structures

| Criteria                  | BST (Balanced)    | Hash Table        | Sorted Array      | Linked List       |
|---------------------------|-------------------|-------------------|-------------------|-------------------|
| Search                    | O(log n)          | O(1) average      | O(log n)          | O(n)              |
| Insert                    | O(log n)          | O(1) average      | O(n)              | O(1) at head      |
| Delete                    | O(log n)          | O(1) average      | O(n)              | O(n)              |
| Ordered iteration         | O(n), natural     | O(n log n), sort  | O(n), natural     | O(n log n), sort  |
| Range queries             | Efficient         | Not supported     | Efficient         | Not supported     |
| Memory overhead           | Moderate (pointers)| Moderate (buckets)| Low               | Moderate (pointers)|

A BST is the preferred choice when you need both fast individual lookups and efficient ordered access or range queries. Hash tables offer faster average-case lookups but cannot provide sorted iteration or range queries without additional work. Sorted arrays provide fast search but suffer from expensive insertions and deletions due to shifting elements.

## Practical Applications

BSTs and their self-balancing variants are used extensively in real-world systems:

- **Database indexing:** B-trees (a generalization of BSTs optimized for disk access) are the standard indexing structure in relational databases such as PostgreSQL and MySQL.
- **In-memory ordered collections:** Language standard libraries use Red-Black trees for ordered maps and sets (Java TreeMap/TreeSet, C++ std::map/std::set, .NET SortedDictionary).
- **File systems:** Many file systems use balanced tree structures to organize directory entries and metadata for fast lookup.
- **Networking:** Routers use tree-based structures for longest-prefix matching in IP routing tables.
- **Scheduling:** Operating system process schedulers (such as the Linux Completely Fair Scheduler) use Red-Black trees to manage process priorities efficiently.
- **Autocompletion and spell checking:** Trie structures, which share conceptual similarities with BSTs, power prefix-based search in text editors and search engines.

## Common Pitfalls

- **Ignoring balance:** Using a naive BST without balancing guarantees leads to worst-case linear performance on real-world data that is often partially sorted.
- **Duplicate handling ambiguity:** The standard BST definition does not specify behavior for duplicate keys. Decide upfront whether duplicates go left, go right, are rejected, or are stored as a count on the existing node.
- **Choosing a BST when a hash table suffices:** If you never need ordered iteration or range queries, a hash table is simpler and faster for pure key-value lookups.
- **Neglecting iterative implementations:** Recursive BST operations are elegant but can overflow the call stack on very deep trees. Iterative versions are more robust in production systems.

## Related

After understanding binary search trees, the natural next topics are AVL trees and Red-Black trees, which solve the balance problem that limits plain BSTs. Studying B-trees and B+ trees extends the concept to disk-oriented storage and database indexing. Heap data structures offer a comparison point as another tree-based structure optimized for different access patterns (priority rather than ordered search). Graph algorithms build on tree traversal concepts. Hash tables provide an important contrast as the primary alternative for fast key-value access without ordering guarantees.

## Summary

A binary search tree is a foundational data structure that maintains elements in sorted order through a simple recursive invariant: left children are smaller, right children are larger. This property enables O(log n) search, insertion, and deletion in balanced trees, along with efficient in-order traversal that yields sorted output. The critical limitation of a naive BST is its vulnerability to degenerate shapes caused by unfortunate insertion orders, which is addressed by self-balancing variants such as AVL trees and Red-Black trees. BSTs and their descendants remain central to modern software infrastructure, underpinning database indexes, standard library collections, file systems, and operating system schedulers.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press. Chapters 12-13 cover BSTs and Red-Black trees.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Provides accessible coverage of BSTs and balanced search trees.
- Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching* (2nd ed.). Addison-Wesley. Definitive reference on tree-based searching.
- Adelson-Velsky, G. M., & Landis, E. M. (1962). "An algorithm for the organization of information." *Doklady Akademii Nauk SSSR*, 146(2), 263-266. Original AVL tree paper.
- Guibas, L. J., & Sedgewick, R. (1978). "A dichromatic framework for balanced trees." *19th Annual Symposium on Foundations of Computer Science*, 8-21. Foundational Red-Black tree paper.
- Wikipedia: Binary search tree — https://en.wikipedia.org/wiki/Binary_search_tree
- GeeksforGeeks: Binary Search Tree — https://www.geeksforgeeks.org/binary-search-tree-data-structure/
