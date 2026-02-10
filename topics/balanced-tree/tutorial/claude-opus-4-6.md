# Balanced tree (b-tree)

A balanced tree, commonly referred to as a b-tree, is a self-balancing tree data structure that maintains sorted data and provides efficient operations for insertion, deletion, and search. Originally conceived by Rudolf Bayer and Edward McCreight at Boeing Research Labs in 1970, the b-tree was designed to optimize read and write operations on block-oriented storage devices such as disks. Today, b-trees and their variants remain foundational to the internal architecture of databases, file systems, and indexing engines that power modern software infrastructure.

## Core Concepts

A b-tree is defined by a parameter called its **order** or **degree**, typically denoted as *t*. This parameter governs the branching factor of the tree and determines how many keys and children each node may hold. The structure enforces several invariants that collectively guarantee balance and logarithmic-time performance for all primary operations.

- **Root node**: The topmost node in the tree. It may have as few as one key (or zero, if the tree is empty), making it the sole exception to the minimum-key rule.
- **Internal nodes**: Nodes between the root and the leaves. Each internal node holds between *t-1* and *2t-1* keys and has one more child pointer than the number of keys it contains.
- **Leaf nodes**: The bottommost nodes, all residing at the same depth. They contain between *t-1* and *2t-1* keys and have no children.
- **Sorted keys**: Keys within every node are maintained in ascending order, enabling binary search within a node during lookups.
- **Child pointers**: Each non-leaf node with *k* keys has exactly *k+1* child pointers, which guide traversal into subtrees whose key ranges fall between adjacent keys.

Because all leaf nodes sit at the same level, the tree remains perfectly height-balanced at all times.

## How Operations Work

The b-tree maintains balance through controlled structural changes during insertions and deletions. These changes ensure the tree never becomes lopsided, regardless of the order in which data arrives.

- **Search**: Starting at the root, binary search is used within each node to locate the target key or identify the correct child pointer to follow. This repeats until the key is found or a leaf is reached.
- **Insertion**: A new key is always inserted into a leaf node. If that leaf already holds the maximum number of keys (*2t-1*), it is **split** into two nodes, and the median key is promoted to the parent. This splitting may cascade upward to the root, potentially increasing the height of the tree by one.
- **Deletion**: Removing a key may cause a node to fall below the minimum key count (*t-1*). When this happens, the tree rebalances by **borrowing** a key from an adjacent sibling node, or by **merging** the underflowing node with a sibling. Like splitting, merging can propagate upward.
- **Traversal**: In-order traversal visits all keys in sorted order, interleaving visits to child subtrees between the keys of each node.

## Performance Characteristics

The branching factor of a b-tree is much larger than that of binary trees, which dramatically reduces tree height. For a b-tree of order *t* containing *n* keys, the height is at most log_t(n). This means fewer disk accesses or memory hops are required to locate any key.

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Search | O(log n) | Binary search within each node, then descend |
| Insert | O(log n) | May require node splits propagating to root |
| Delete | O(log n) | May require borrows or merges propagating to root |
| Traversal | O(n) | Visits every key in sorted order |
| Space | O(n) | Linear in the number of stored keys |

All primary operations scale logarithmically with the number of keys, making b-trees exceptionally well-suited for datasets that far exceed main memory capacity.

## B-Tree Variants

Several important variants extend or modify the original b-tree design to address specific use cases.

| Variant | Key Difference | Typical Use |
|---------|---------------|-------------|
| B+ tree | All data resides in leaf nodes; internal nodes store only keys and pointers. Leaves are linked in a sequential chain. | Relational databases (MySQL InnoDB, PostgreSQL), file systems (NTFS, ext4) |
| B* tree | Nodes are kept at least two-thirds full instead of half full, reducing split frequency. | File systems requiring higher space utilization |
| 2-3 tree | A b-tree of order 2, where each node has 2 or 3 children. | Educational examples, in-memory balanced structures |
| 2-3-4 tree | A b-tree of order 2 with nodes having 2, 3, or 4 children. Structurally equivalent to a red-black tree. | Theoretical foundations, red-black tree implementations |

The B+ tree is by far the most widely deployed variant in production systems, because its linked leaf nodes support efficient range queries and sequential scans.

## Practical Applications

B-trees are chosen whenever large volumes of sorted data must be stored and queried with predictable, low-latency performance. Their design aligns naturally with block-based storage.

- **Database indexing**: Nearly every major relational database management system uses B+ trees as the default index structure. When you create an index on a table column, you are almost certainly creating a B+ tree.
- **File systems**: NTFS, HFS+, ext4, and Btrfs all rely on b-tree variants to organize directory entries, metadata, and extent maps.
- **Key-value stores**: Storage engines such as WiredTiger (used by MongoDB) and InnoDB employ b-trees for on-disk key-value organization.
- **Operating system page tables**: Some OS kernels use b-tree-like structures to manage virtual memory mappings.
- **Full-text search engines**: Inverted indexes in systems like Lucene store term dictionaries in b-tree-organized segments.

## B-Tree vs. Other Data Structures

Choosing the right data structure depends on access patterns, storage medium, and performance requirements.

| Criteria | B-tree | Binary Search Tree | Hash Table | LSM Tree |
|----------|--------|--------------------|------------|----------|
| Search | O(log n) | O(log n) average, O(n) worst | O(1) average | O(log n) |
| Range queries | Excellent | Good | Poor | Good |
| Disk optimization | Excellent | Poor | Moderate | Excellent |
| Write throughput | Good | Good | Good | Excellent |
| Space efficiency | High | Moderate | Moderate | Moderate |
| Ordered traversal | Native | Native | Not supported | Supported via merge |

B-trees excel when workloads mix reads and writes and when range queries are important. Hash tables are superior for pure point lookups, while LSM trees (log-structured merge trees) are preferred for write-heavy workloads such as time-series ingestion.

## Design Considerations

When configuring or working with b-trees in practice, several factors influence performance and behavior.

- **Node size and order**: The order *t* is typically chosen so that each node fills exactly one disk page or block (commonly 4 KB, 8 KB, or 16 KB). Larger nodes mean fewer levels and fewer I/O operations.
- **Cache efficiency**: Because b-tree nodes are compact and accessed sequentially, they interact well with CPU caches and operating system page caches.
- **Concurrency**: High-concurrency environments require latch-coupling (lock-coupling) or latch-free techniques to allow multiple threads to traverse and modify the tree simultaneously without corruption.
- **Write amplification**: Each insertion or deletion may modify multiple nodes and propagate changes upward. Understanding this cost is important for flash storage, where write cycles are limited.
- **Fill factor**: Controlling how full nodes are allowed to become before splitting affects the trade-off between space utilization and future insertion performance.

## Related

To deepen your understanding of balanced trees and their ecosystem, explore these related topics: binary search trees and AVL trees for simpler self-balancing structures, red-black trees for an in-memory analog of 2-3-4 trees, hash tables and hash maps for alternative key-value lookup strategies, database indexing and query optimization to see b-trees in their most common production context, LSM trees and SSTables for write-optimized alternatives, graph databases for non-hierarchical data models, and algorithm complexity analysis for the theoretical underpinnings of logarithmic performance guarantees.

## Summary

The balanced tree is one of the most consequential data structures in computer science. By enforcing strict balance invariants through controlled splitting and merging of nodes, b-trees guarantee logarithmic time complexity for search, insertion, and deletion regardless of data distribution or insertion order. Their wide, shallow structure maps naturally onto block-based storage, which is why they have been the dominant indexing mechanism in databases and file systems for over fifty years. Understanding b-trees is essential for any technology professional who works with data storage, query performance, or system internals.

## References

- Bayer, R. and McCreight, E. (1970). "Organization and Maintenance of Large Ordered Indices." Boeing Scientific Research Laboratories. Mathematical and Information Sciences Laboratory. Report No. 20.
- Comer, D. (1979). "The Ubiquitous B-Tree." ACM Computing Surveys, 11(2), 121-137. https://doi.org/10.1145/356770.356776
- Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. (2009). *Introduction to Algorithms*, 3rd Edition. MIT Press. Chapter 18: B-Trees.
- Knuth, D.E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching*, 2nd Edition. Addison-Wesley. Section 6.2.4.
- Graefe, G. (2011). "Modern B-Tree Techniques." Foundations and Trends in Databases, 3(4), 203-402. https://doi.org/10.1561/1900000028
- PostgreSQL Documentation. "Index Types." https://www.postgresql.org/docs/current/indexes-types.html
- MySQL Documentation. "InnoDB Index Types." https://dev.mysql.com/doc/refman/en/innodb-index-types.html
