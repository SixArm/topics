# Heap sort algorithm

Heap sort is a comparison-based sorting algorithm that leverages the binary heap data structure to efficiently order elements. It works by first organizing the input data into a heap, then repeatedly extracting the root element — which is guaranteed to be the maximum or minimum value — and placing it into its correct sorted position. Heap sort is widely used in systems programming, embedded systems, and scenarios where guaranteed worst-case performance and in-place sorting are essential. It combines the strengths of selection sort's logic with the efficiency of a tree-based data structure.

## How it works

Heap sort operates in two major phases: heap construction and sorted extraction. In the first phase, the unsorted array is transformed into a binary heap, typically a max-heap for ascending order sorts. A binary heap is a complete binary tree where every parent node satisfies the heap property — in a max-heap, each parent is greater than or equal to its children. Once the heap is built, the algorithm enters its extraction phase. The root of the heap (the largest element) is swapped with the last element in the array, effectively placing it in its final sorted position. The heap size is then reduced by one, and the remaining elements are re-heapified to restore the heap property. This swap-and-heapify cycle repeats until only one element remains, at which point the entire array is sorted.

## Key steps

- **Build the heap**: Convert the input array into a max-heap (or min-heap) using the heapify operation. This is performed bottom-up, starting from the last non-leaf node and working toward the root. This phase runs in O(n) time.

- **Extract the root**: Swap the root element with the last element of the current heap. The root holds the largest (max-heap) or smallest (min-heap) value, so after the swap it occupies its correct final position.

- **Reduce and restore**: Decrease the effective heap size by one and apply the heapify operation to the new root to restore the heap property among the remaining unsorted elements.

- **Repeat**: Continue extracting the root and re-heapifying until the heap size is reduced to one. The array is now fully sorted.

## The heapify operation

The heapify operation is the core mechanism that maintains the binary heap property. Given a node, heapify compares it with its left and right children. If either child is larger (in a max-heap), the node is swapped with the larger child, and the process recurses downward on the affected subtree. This "sift-down" approach ensures that after each call, the subtree rooted at the given node satisfies the heap property. During the initial heap construction phase, heapify is called on every non-leaf node from the bottom of the tree upward, which builds the entire heap in linear time. During the extraction phase, heapify is called once per extraction on the root, costing O(log n) per call.

## Time and space complexity

| Case         | Time Complexity | Notes                                      |
|--------------|----------------|--------------------------------------------|
| Best case    | O(n log n)     | Even with sorted input, full heap operations run |
| Average case | O(n log n)     | Consistent across all input distributions  |
| Worst case   | O(n log n)     | Guaranteed; no degenerate input patterns   |
| Space        | O(1)           | In-place sorting; no auxiliary array needed |

Heap sort's O(n log n) worst-case guarantee is one of its most valuable properties. Unlike quicksort, which can degrade to O(n^2) on adversarial inputs, heap sort maintains consistent performance regardless of the initial ordering of the data. The O(1) auxiliary space usage makes it one of the most memory-efficient O(n log n) sorting algorithms.

## Comparison with other sorting algorithms

| Property             | Heap sort      | Quicksort       | Merge sort      |
|----------------------|---------------|-----------------|-----------------|
| Worst-case time      | O(n log n)    | O(n^2)          | O(n log n)      |
| Average-case time    | O(n log n)    | O(n log n)      | O(n log n)      |
| Space complexity     | O(1)          | O(log n)        | O(n)            |
| Stable               | No            | No              | Yes             |
| In-place             | Yes           | Yes             | No              |
| Cache performance    | Poor          | Excellent       | Good            |
| Adaptive             | No            | Partially       | Yes (Timsort)   |

Heap sort's primary advantage over quicksort is its guaranteed O(n log n) worst-case performance and its strictly O(1) space usage. Its primary disadvantage is poor cache locality: heap operations access memory in a scattered pattern following tree relationships, while quicksort operates on contiguous subarrays that benefit from CPU cache lines. In practice, this makes quicksort faster on average for most workloads despite its worse theoretical worst case. Compared to merge sort, heap sort wins on space efficiency but loses on stability — heap sort does not preserve the relative order of equal elements.

## Stability

Heap sort is not a stable sorting algorithm. During the extraction phase, when the root is swapped with the last heap element, equal-valued elements can change their relative order. For applications where stability is required — such as sorting database records by a secondary key while preserving a prior sort on a primary key — merge sort or Timsort are better choices. If heap sort must be used in a stability-sensitive context, the common workaround is to augment each element with its original index and use that index as a tiebreaker during comparisons, though this adds overhead.

## Practical applications

- **Operating system schedulers**: Priority queues built on heaps are fundamental to process scheduling and event-driven simulations, and heap sort's underlying operations directly support these use cases.

- **Embedded and real-time systems**: The O(1) space requirement and guaranteed O(n log n) time make heap sort suitable for memory-constrained environments where allocation overhead is unacceptable.

- **Hybrid sorting algorithms**: Introsort, used in many standard library implementations (including C++ STL), begins with quicksort but falls back to heap sort when recursion depth exceeds a threshold, combining quicksort's average-case speed with heap sort's worst-case guarantee.

- **Selection problems**: The heap construction phase naturally supports extracting the k largest or smallest elements efficiently, making partial heap sort useful for top-k queries.

## Advantages and disadvantages

**Advantages:**

- Guaranteed O(n log n) worst-case time complexity with no degenerate cases
- In-place sorting with O(1) auxiliary space
- No risk of stack overflow from deep recursion
- Useful as a fallback in hybrid algorithms like introsort

**Disadvantages:**

- Poor cache locality leads to slower practical performance than quicksort on most hardware
- Not stable; relative order of equal elements is not preserved
- Not adaptive; does not benefit from partially sorted input
- Higher constant factors in practice compared to quicksort and Timsort

## Related

Related topics to explore next include binary heap data structures and their array-based representation, priority queues and their role in graph algorithms like Dijkstra's shortest path, quicksort and merge sort for comparison with alternative O(n log n) strategies, introsort as a practical hybrid that combines quicksort with heap sort, selection algorithms for efficiently finding the k-th element, and binary tree traversal patterns that underpin the heapify operation.

## Summary

Heap sort is a reliable, in-place, comparison-based sorting algorithm with guaranteed O(n log n) performance in all cases and O(1) auxiliary space. It works by building a binary heap from the input and repeatedly extracting the root to produce a sorted sequence. While its poor cache behavior and lack of stability make it less common as a standalone sorting choice in general-purpose applications, its worst-case guarantees and minimal memory footprint make it indispensable in embedded systems, real-time environments, and as a safety net within hybrid sorting strategies like introsort.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press. Chapter 6: Heapsort.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Section 2.4: Priority Queues.
- Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching* (2nd ed.). Addison-Wesley.
- Williams, J. W. J. (1964). "Algorithm 232: Heapsort." *Communications of the ACM*, 7(6), 347–348.
- Floyd, R. W. (1964). "Algorithm 245: Treesort 3." *Communications of the ACM*, 7(12), 701.
- Musser, D. R. (1997). "Introspective Sorting and Selection Algorithms." *Software: Practice and Experience*, 27(8), 983–993.
