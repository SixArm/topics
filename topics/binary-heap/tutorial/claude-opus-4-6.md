# Binary heap

## Introduction

A binary heap is a specialized complete binary tree data structure that maintains a specific ordering property between parent and child nodes. It is one of the most practical and widely used data structures in computer science, providing efficient insertion, deletion, and retrieval of either the minimum or maximum element in a collection. Binary heaps form the backbone of priority queue implementations and serve as a critical component in algorithms such as heapsort, Dijkstra's shortest path, and Prim's minimum spanning tree.

The binary heap combines two structural guarantees: the shape property, which ensures the tree is always a complete binary tree (all levels fully filled except possibly the last, which is filled from left to right), and the heap property, which enforces a consistent ordering between every parent and its children. These two guarantees together make binary heaps both simple to implement and performant in practice.

## Heap Types

Binary heaps come in two variants, distinguished by the direction of the ordering constraint between parent and child nodes.

A **min-heap** ensures that for any given node, the value of that node is less than or equal to the values of its children. This means the smallest element in the entire collection always resides at the root. Min-heaps are the natural choice when you need fast access to the minimum element, such as in scheduling systems where the earliest deadline must be processed first.

A **max-heap** ensures that for any given node, the value of that node is greater than or equal to the values of its children. The largest element always sits at the root. Max-heaps are useful when the highest-priority or largest-valued element must be retrieved first, such as in bandwidth allocation or auction systems.

| Property | Min-Heap | Max-Heap |
|---|---|---|
| Root element | Minimum value in the collection | Maximum value in the collection |
| Parent-child relationship | Parent is less than or equal to children | Parent is greater than or equal to children |
| Typical use case | Task scheduling, event-driven simulation | Priority scheduling, top-K problems |
| Extract operation | Extracts minimum | Extracts maximum |

## Core Operations

Binary heaps support three fundamental operations, each designed to maintain the heap property while modifying or querying the structure.

**Insert** adds a new element to the heap. The element is placed at the next available position in the last level of the tree (maintaining the shape property), then "bubbled up" by repeatedly swapping it with its parent until the heap property is restored. This operation runs in O(log n) time in the worst case, though the average case is O(1) for random inputs because most inserted elements need only a few swaps.

**Delete (Extract)** removes the root element from the heap. The root is replaced with the last element in the tree, and that element is then "bubbled down" by repeatedly swapping it with the appropriate child (the smaller child in a min-heap, the larger child in a max-heap) until the heap property is restored. This operation always runs in O(log n) time because the element may need to travel from the root to a leaf.

**Peek** returns the root element without removing it. Since the root is always the minimum (in a min-heap) or maximum (in a max-heap), this operation runs in O(1) time and requires no structural changes.

## Time Complexity

| Operation | Average Case | Worst Case |
|---|---|---|
| Insert | O(1) | O(log n) |
| Extract (Delete root) | O(log n) | O(log n) |
| Peek (Find min/max) | O(1) | O(1) |
| Build heap from array | O(n) | O(n) |
| Search for arbitrary element | O(n) | O(n) |
| Delete arbitrary element | O(log n) | O(log n) |

The O(n) time for building a heap from an unordered array is a notable result. Rather than inserting elements one by one (which would yield O(n log n)), the bottom-up "heapify" approach processes nodes from the leaves upward, achieving linear time because the majority of nodes are near the bottom of the tree and require minimal work.

## Array Representation

Binary heaps are almost always implemented using a flat array rather than explicit node-and-pointer tree structures. The complete binary tree property guarantees that no array positions are wasted, making this representation both space-efficient and cache-friendly.

For an element stored at index **i** (using zero-based indexing):

- **Left child** is at index 2i + 1
- **Right child** is at index 2i + 2
- **Parent** is at index floor((i - 1) / 2)

This array-based layout eliminates the overhead of storing pointers and takes advantage of memory locality, which significantly improves performance on modern hardware with hierarchical cache architectures. The implicit structure also simplifies implementation because adding or removing the last element in the array corresponds directly to adding or removing the last leaf in the tree.

## Applications

Binary heaps are used extensively across systems software, algorithms, and application-level logic:

- **Priority queues**: The most common application. Operating system schedulers, network packet prioritization, and event-driven simulations all rely on priority queues backed by binary heaps.
- **Heapsort**: A comparison-based sorting algorithm that builds a heap from the input and repeatedly extracts the root to produce sorted output. It guarantees O(n log n) worst-case performance with O(1) auxiliary space.
- **Graph algorithms**: Dijkstra's shortest path algorithm and Prim's minimum spanning tree algorithm use min-heaps (often via priority queues) to efficiently select the next vertex to process.
- **Median maintenance**: A combination of a max-heap and a min-heap can maintain a running median of a data stream, with each new element processed in O(log n) time.
- **K-way merge**: When merging K sorted lists, a min-heap of size K tracks the smallest unprocessed element across all lists, enabling an efficient O(n log K) merge.
- **Top-K problems**: Finding the K largest or smallest elements in a stream or large dataset is efficiently handled using a heap of size K.

## Comparison with Other Data Structures

| Data Structure | Find Min/Max | Insert | Delete Min/Max | Search | Space |
|---|---|---|---|---|---|
| Binary heap | O(1) | O(log n) | O(log n) | O(n) | O(n) |
| Sorted array | O(1) | O(n) | O(n) | O(log n) | O(n) |
| Unsorted array | O(n) | O(1) | O(n) | O(n) | O(n) |
| Binary search tree (balanced) | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| Fibonacci heap | O(1) | O(1) amortized | O(log n) amortized | O(n) | O(n) |

Binary heaps occupy a practical sweet spot: they are simpler to implement than balanced BSTs or Fibonacci heaps, have excellent constant factors due to array-based storage, and provide the operations most commonly needed for priority-based workloads. Their main limitation is the lack of efficient search or decrease-key operations compared to more sophisticated heap variants.

## Heap Variants

Several heap variants extend or modify the binary heap concept for specific performance characteristics:

- **D-ary heap**: Generalizes the binary heap to D children per node. A higher branching factor reduces tree height (improving extract operations) at the cost of more comparisons per level during bubble-down. A 4-ary heap is often faster in practice for priority queues due to better cache behavior.
- **Fibonacci heap**: Provides O(1) amortized insert and decrease-key operations, making it theoretically superior for algorithms like Dijkstra's that perform many decrease-key operations. However, it has high constant factors and complex implementation.
- **Binomial heap**: Supports efficient merge of two heaps in O(log n) time, which binary heaps cannot do efficiently.
- **Pairing heap**: A simpler alternative to Fibonacci heaps with competitive practical performance and O(1) amortized insert.

## Related

Related topics to explore next include heapsort for understanding how binary heaps power a classic sorting algorithm, priority queues for the abstract data type that binary heaps most commonly implement, balanced binary search trees (such as AVL trees and red-black trees) for comparison with alternative tree-based structures, Dijkstra's algorithm and Prim's algorithm for seeing binary heaps applied in graph problems, and Fibonacci heaps and binomial heaps for more advanced heap variants with different amortized performance guarantees.

## Summary

A binary heap is a complete binary tree stored as an array that maintains either a min-heap or max-heap ordering property between parent and child nodes. It provides O(1) access to the minimum or maximum element, O(log n) insertion and deletion, and O(n) construction from an unordered array. Its array-based representation delivers excellent cache performance and implementation simplicity. Binary heaps are the standard implementation behind priority queues and play a foundational role in heapsort, graph algorithms, and streaming data problems. For most priority-queue workloads, the binary heap remains the default choice due to its balance of simplicity, performance, and low overhead.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapter 6: Heapsort.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Section 2.4: Priority Queues.
- Williams, J. W. J. (1964). "Algorithm 232: Heapsort." *Communications of the ACM*, 7(6), 347-349.
- Floyd, R. W. (1964). "Algorithm 245: Treesort 3." *Communications of the ACM*, 7(12), 701.
- Tarjan, R. E. (1983). *Data Structures and Network Algorithms*. SIAM. Chapters on priority queues and heap variants.
- https://en.wikipedia.org/wiki/Binary_heap
- https://en.wikipedia.org/wiki/Heap_(data_structure)
