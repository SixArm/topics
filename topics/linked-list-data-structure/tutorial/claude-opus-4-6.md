# Linked list data structure

A linked list is a fundamental data structure in computer science used for organizing and managing a collection of elements, commonly called nodes. Unlike arrays, which store elements in contiguous memory locations, linked lists use pointers to connect elements together. Each node contains both the data it holds and a reference (or pointer) to the next node in the sequence. Linked lists are among the most important building blocks in software development, underpinning many higher-level abstractions including stacks, queues, hash tables, and memory allocators.

## How a Linked List Works

A linked list organizes data as a chain of nodes. Each node is an independent allocation in memory that stores two things: a value (the payload) and a pointer to the next node. The first node is called the head, and the last node in the list has a pointer set to null, signaling the end of the chain. Because nodes are scattered across memory rather than packed into a contiguous block, the list can grow and shrink without copying or shifting existing elements.

To access data, you start at the head and follow pointers from one node to the next, a process called traversal. This sequential access pattern is the core trade-off of the data structure: it enables flexible, efficient insertions and deletions, but it sacrifices the constant-time random access that arrays provide.

## Types of Linked Lists

There are three primary variants of linked lists, each offering different trade-offs in terms of memory overhead, traversal flexibility, and implementation complexity.

| Type | Structure | Traversal | Use Case |
|---|---|---|---|
| Singly linked list | Each node points to the next node | Forward only | Simple stacks, queues, and buffers where reverse traversal is unnecessary |
| Doubly linked list | Each node points to both the next and the previous node | Forward and backward | LRU caches, browser history, undo/redo systems requiring bidirectional navigation |
| Circular linked list | The last node points back to the first node, forming a loop | Continuous loop | Round-robin scheduling, circular buffers, and playlist rotation |

A singly linked list is the simplest and most memory-efficient variant, requiring only one pointer per node. A doubly linked list adds a second pointer per node, which doubles pointer overhead but enables backward traversal and simplifies deletion when you already have a reference to the target node. A circular linked list can be either singly or doubly linked; its defining feature is the absence of a null terminator, which makes it well-suited for applications that cycle continuously through a set of elements.

## Core Operations

Linked lists support four fundamental operations that define their behavior and performance characteristics.

- **Insert**: Add a new node to the list at the beginning (prepend), at the end (append), or at a specific position in the middle. Insertion at the head is a constant-time operation because it requires only updating the head pointer. Insertion at other positions requires traversal to find the correct location.

- **Delete**: Remove a node from the list by adjusting the pointers of its neighbors to bypass it. Like insertion, deletion at the head is constant-time. Deletion at an arbitrary position requires traversal to locate the node and its predecessor.

- **Traverse**: Walk through the list from head to tail, visiting each node in sequence. Traversal is used for printing, aggregating, or transforming the data stored in the list.

- **Search**: Locate a specific element by traversing the list and comparing each node's value against the target. In the worst case, this requires visiting every node.

## Time Complexity

The performance of linked list operations depends on where in the list the operation takes place and whether you already hold a reference to the relevant node.

| Operation | At Head | At Tail (with tail pointer) | At Arbitrary Position |
|---|---|---|---|
| Insert | O(1) | O(1) | O(n) |
| Delete | O(1) | O(1) for doubly linked; O(n) for singly linked | O(n) |
| Search | O(1) if target is head | O(1) if target is tail | O(n) |
| Access by index | O(1) | O(1) | O(n) |

The O(n) cost for arbitrary-position operations reflects the need to traverse the list to find the target location. This is the principal disadvantage compared to arrays, which offer O(1) index-based access. However, once the target node is located, the actual insertion or deletion is O(1) because it involves only pointer manipulation rather than shifting elements.

## Linked Lists vs. Arrays

The choice between a linked list and an array depends on the access patterns and mutation frequency of the application.

| Characteristic | Linked List | Array |
|---|---|---|
| Memory layout | Non-contiguous; nodes scattered in heap | Contiguous block of memory |
| Random access | O(n) traversal required | O(1) by index |
| Insertion at front | O(1) | O(n) due to element shifting |
| Insertion at end | O(1) with tail pointer | O(1) amortized for dynamic arrays |
| Deletion at arbitrary position | O(1) after locating node | O(n) due to element shifting |
| Memory overhead | Extra pointer(s) per node | No per-element overhead |
| Cache performance | Poor; nodes are not adjacent in memory | Excellent; sequential memory access |
| Size flexibility | Grows and shrinks dynamically with no reallocation | Fixed size, or requires reallocation and copy for dynamic arrays |

Arrays tend to outperform linked lists in practice for workloads dominated by sequential or random reads, because modern CPUs rely heavily on cache locality. Linked lists excel when the workload involves frequent insertions and deletions at arbitrary positions, especially when the list size is unpredictable.

## Common Applications

Linked lists appear throughout systems software and application development:

- **Stack and queue implementations**: A singly linked list naturally models a stack (LIFO) with O(1) push and pop at the head, and a queue (FIFO) with O(1) enqueue at the tail and dequeue at the head.

- **Hash table chaining**: Hash tables commonly use linked lists to handle collisions, storing all entries that map to the same bucket in a chain of nodes.

- **Memory allocators**: Operating systems and runtime environments use free lists, which are linked lists of available memory blocks, to manage dynamic memory allocation.

- **LRU caches**: A doubly linked list combined with a hash map enables O(1) insertion, deletion, and lookup for least-recently-used eviction policies.

- **Undo/redo systems**: A doubly linked list can represent a sequence of states, allowing efficient forward and backward navigation through an edit history.

- **Graph adjacency lists**: Graphs are frequently represented using an array of linked lists, where each list stores the neighbors of a given vertex.

## Advantages and Disadvantages

**Advantages:**

- Dynamic sizing without preallocation or reallocation costs
- Constant-time insertion and deletion at known positions
- No wasted memory from unused preallocated slots
- Natural representation for ordered collections that change frequently

**Disadvantages:**

- No constant-time random access; reaching the nth element requires traversal
- Additional memory consumed by pointers in each node
- Poor cache locality leads to slower traversal compared to arrays in practice
- More complex implementation and debugging compared to arrays

## Related

Related topics to explore next include array data structures for understanding the primary alternative to linked lists, stack and queue data structures which are commonly implemented using linked lists, hash tables which use linked list chaining for collision resolution, tree data structures and graph data structures which generalize the linked list concept to hierarchical and networked relationships, memory management and garbage collection which interact closely with pointer-based structures, and algorithm complexity analysis for reasoning about the performance trade-offs discussed here.

## Summary

A linked list is a pointer-based data structure that organizes elements as a chain of nodes, each containing data and a reference to the next node. It comes in singly linked, doubly linked, and circular variants, each offering different trade-offs between memory overhead and traversal flexibility. Linked lists provide constant-time insertion and deletion at known positions and grow dynamically without reallocation, making them ideal for workloads with frequent mutations and unpredictable sizes. Their primary limitations are the lack of constant-time random access and poor cache performance compared to arrays. Despite these trade-offs, linked lists remain indispensable in systems programming, serving as the foundation for stacks, queues, hash table chains, memory allocators, LRU caches, and graph representations.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapter 10: Elementary Data Structures.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Section 1.3: Bags, Queues, and Stacks.
- Knuth, D. E. (1997). *The Art of Computer Programming, Volume 1: Fundamental Algorithms* (3rd ed.). Addison-Wesley. Section 2.2: Linear Lists.
- Skiena, S. S. (2020). *The Algorithm Design Manual* (3rd ed.). Springer. Chapter 3: Data Structures.
- Wikipedia. "Linked list." https://en.wikipedia.org/wiki/Linked_list
