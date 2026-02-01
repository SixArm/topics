## Binary Search Tree (BST)

A binary search tree (BST) is a hierarchical data structure that organizes elements in a way that enables efficient searching, insertion, and deletion. Each node contains a value, with all values in the left subtree being smaller than the node's value, and all values in the right subtree being larger. This ordering property is the foundation of the BST's power.

## Core Properties

A binary search tree maintains several invariants that define its structure:

- **Node structure**: Each node contains a value and references to at most two children (left and right)
- **Ordering constraint**: For any node, all values in its left subtree are less than the node's value, and all values in its right subtree are greater
- **Recursive definition**: Both left and right subtrees are themselves binary search trees
- **Unique values**: In a standard BST, duplicate values are typically not allowed (though variants exist that handle duplicates)

## Fundamental Operations

### Search

Searching in a BST leverages the ordering property through a divide-and-conquer approach. Starting at the root, you compare the target value with the current node:

- If equal, the search succeeds
- If smaller, continue searching in the left subtree
- If larger, continue searching in the right subtree
- If you reach a null reference, the value does not exist

### Insertion

Inserting a new value follows the same traversal logic as search. You navigate down the tree until you find an appropriate null position, then create a new leaf node. The new node is always inserted as a leaf, preserving the BST property.

### Deletion

Deletion is the most complex operation and requires handling three distinct cases:

| Case | Condition | Resolution |
|------|-----------|------------|
| Leaf node | Node has no children | Simply remove the node |
| One child | Node has exactly one child | Replace node with its child |
| Two children | Node has both children | Replace with in-order successor (or predecessor), then delete that successor |

### Traversal

BSTs support multiple traversal orders, each serving different purposes:

| Traversal | Order | Use Case |
|-----------|-------|----------|
| In-order | Left → Root → Right | Produces sorted sequence |
| Pre-order | Root → Left → Right | Copying tree structure |
| Post-order | Left → Right → Root | Deleting trees, evaluating expressions |
| Level-order | Breadth-first by level | Finding shortest paths |

## Time Complexity

The efficiency of BST operations depends heavily on the tree's shape:

| Operation | Average Case | Worst Case |
|-----------|--------------|------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Traversal | O(n) | O(n) |

The worst case occurs when the tree degenerates into a linked list, which happens when elements are inserted in sorted order.

## The Balance Problem

An unbalanced BST loses its efficiency advantage. Consider inserting values 1, 2, 3, 4, 5 in sequence—the resulting tree is essentially a linked list with O(n) operations. This motivates the use of self-balancing variants.

## Self-Balancing Variants

Several data structures extend the basic BST concept to maintain balance automatically:

| Variant | Balance Guarantee | Rotation Complexity |
|---------|-------------------|---------------------|
| AVL Tree | Height difference ≤ 1 between subtrees | More rotations, stricter balance |
| Red-Black Tree | No path more than 2× longer than any other | Fewer rotations, looser balance |
| Splay Tree | Amortized O(log n) | Self-adjusting, no explicit balance |
| B-Tree | All leaves at same depth | Optimized for disk access |

## Comparison with Other Data Structures

| Structure | Search | Insert | Delete | Ordered Iteration |
|-----------|--------|--------|--------|-------------------|
| BST (balanced) | O(log n) | O(log n) | O(log n) | O(n) |
| Hash Table | O(1) average | O(1) average | O(1) average | Not supported |
| Sorted Array | O(log n) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(1) | O(n) | O(n) |

## When to Use a BST

Binary search trees are the right choice when you need:

- **Ordered data**: BSTs naturally maintain sort order and support range queries
- **Dynamic data**: Frequent insertions and deletions where sorted arrays would be costly
- **Balanced operations**: Roughly equal need for search, insert, and delete
- **In-order access**: Frequent need to iterate through elements in sorted order
- **Range queries**: Finding all values between a minimum and maximum

## When to Avoid a BST

Consider alternatives when:

- **Lookup-only workloads**: Hash tables offer O(1) average lookup
- **Static data**: Sorted arrays are simpler and more cache-friendly
- **Memory constraints**: BSTs have significant pointer overhead per node
- **Guaranteed worst-case performance**: Use self-balancing variants instead of basic BSTs

## Practical Applications

Binary search trees and their variants power many real-world systems:

- **Database indexes**: B-trees and B+ trees index database tables
- **File systems**: Directory structures often use tree-based indexing
- **Language runtimes**: Ordered maps and sets in standard libraries (TreeMap in Java, std::map in C++)
- **Memory allocators**: Managing free memory blocks by size
- **Network routers**: IP routing tables using variants like Patricia tries
- **Compilers**: Symbol tables for variable and function lookup

## Key Takeaways

- BSTs provide O(log n) operations when balanced, degrading to O(n) when unbalanced
- The ordering property enables efficient search and naturally sorted iteration
- Balance is critical—use self-balancing variants for production systems
- Choose BSTs over hash tables when you need ordered access or range queries
- The in-order traversal of a BST produces elements in sorted order
