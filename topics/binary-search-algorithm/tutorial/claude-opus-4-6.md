# Binary search algorithm

Binary search is one of the foundational algorithms in computer science, providing an efficient method for locating a specific element within a sorted collection. Rather than examining every element sequentially, binary search leverages the sorted order of data to systematically halve the search space with each comparison. This divide-and-conquer approach yields logarithmic time complexity, making it indispensable for performance-critical applications ranging from database indexing to system-level lookups. Understanding binary search is essential for any technology professional, as its principles underpin numerous data structures, standard library implementations, and interview problems.

## How binary search works

Binary search operates on a simple invariant: at every step, the target element, if it exists, must lie within the current search interval. The algorithm begins by considering the entire sorted array and identifying the middle element. It then compares this middle element to the target value. If they match, the search succeeds. If the target is less than the middle element, the algorithm discards the upper half and recurses into the lower half. If the target is greater, it discards the lower half and recurses into the upper half. This process repeats until the target is found or the interval is empty, confirming the target's absence.

The key steps are:

- **Initialize** two boundary pointers, typically called `low` and `high`, to the first and last indices of the array.
- **Compute** the midpoint index as the average of `low` and `high`.
- **Compare** the element at the midpoint to the target value.
- **Narrow** the search interval by adjusting either `low` or `high` based on the comparison result.
- **Terminate** when the target is found or when `low` exceeds `high`, meaning the element does not exist in the array.

## Time and space complexity

Binary search achieves its efficiency through repeated halving. Each comparison eliminates roughly half of the remaining candidates, which gives rise to logarithmic performance.

| Metric             | Complexity | Explanation                                                                 |
|--------------------|------------|-----------------------------------------------------------------------------|
| Best-case time     | O(1)       | The target is at the midpoint on the first comparison.                      |
| Average-case time  | O(log n)   | Each step halves the search space, requiring about log2(n) comparisons.     |
| Worst-case time    | O(log n)   | The target is at an extreme position or absent, requiring all halvings.     |
| Space (iterative)  | O(1)       | Only a constant number of variables are maintained.                         |
| Space (recursive)  | O(log n)   | Each recursive call adds a frame to the call stack.                         |

For context, searching a sorted array of one million elements requires at most 20 comparisons with binary search, compared to up to one million comparisons with linear search.

## Binary search versus linear search

Choosing between binary search and linear search depends on the structure of the data and the frequency of lookups.

| Factor                | Binary search                        | Linear search                        |
|-----------------------|--------------------------------------|--------------------------------------|
| Prerequisite          | Data must be sorted                  | No sorting required                  |
| Time complexity       | O(log n)                             | O(n)                                 |
| Best suited for       | Large, sorted datasets               | Small or unsorted datasets           |
| Implementation effort | Moderate; off-by-one errors common   | Minimal; straightforward iteration   |
| Insertion cost        | High if maintaining sorted order     | Low; append to end                   |
| Random access needed  | Yes; requires indexable collection   | No; works on linked lists and streams|

Linear search is preferable when the dataset is small, unsorted, or when the overhead of sorting outweighs the benefit of faster lookups. Binary search excels when the data is already sorted or when many queries will be performed against the same dataset, amortizing the cost of sorting.

## Variants and extensions

Binary search has several important variants that extend its applicability beyond simple element lookup:

- **Lower bound search** finds the first position at which a value could be inserted while maintaining sorted order. This is useful for range queries and for locating the leftmost occurrence of a duplicate value.
- **Upper bound search** finds the position just past the last occurrence of a value, enabling efficient computation of the count of a specific element in a sorted array.
- **Exponential search** combines a preliminary exponential-growth phase with binary search, making it effective for unbounded or very large sorted lists where the position of the target is unknown.
- **Interpolation search** estimates the position of the target based on its value relative to the endpoints of the current interval. When data is uniformly distributed, this achieves O(log log n) average time, though it degrades to O(n) in the worst case.
- **Fractional cascading** is a technique that accelerates binary search across multiple sorted arrays simultaneously, reducing the per-array cost from O(log n) to O(1) after an initial O(log n) lookup.

## Practical considerations

Despite its conceptual simplicity, binary search has several well-known pitfalls and practical concerns that technology professionals should be aware of:

- **Integer overflow in midpoint calculation.** Computing the midpoint as `(low + high) / 2` can overflow in languages with fixed-width integers. The safer formulation is `low + (high - low) / 2`.
- **Off-by-one errors.** The boundaries of the search interval and the termination condition must be precisely defined. A mismatch between inclusive and exclusive bounds is the most common source of bugs in binary search implementations.
- **Sorted data requirement.** Binary search only works on sorted data. If the collection is modified frequently, maintaining sorted order can be expensive. In such cases, balanced binary search trees or skip lists may be more appropriate.
- **Cache performance.** Binary search exhibits poor cache locality compared to linear search on small arrays, because it accesses non-contiguous memory locations. For very small arrays (typically fewer than 64 elements), linear search can be faster in practice due to hardware prefetching.
- **Floating-point domains.** Binary search can be adapted to continuous domains by searching over a floating-point interval and terminating when the interval width falls below a desired precision threshold. This technique is widely used in numerical methods and competitive programming.

## Common applications

Binary search appears throughout systems and application software:

- **Standard library lookups.** Functions such as `bsearch` in C, `Collections.binarySearch` in Java, and `bisect` in Python all implement binary search.
- **Database indexing.** B-trees and B+ trees, the dominant indexing structures in relational databases, use binary search within each node to locate keys.
- **Version control bisection.** Tools like `git bisect` use binary search over commit history to efficiently identify the commit that introduced a bug.
- **Computational geometry.** Binary search is used in algorithms for convex hull queries, closest-pair problems, and sweep-line techniques.
- **System configuration.** Binary search over parameter spaces is used in performance tuning, capacity planning, and threshold calibration.

## Related

Related topics to explore next include linear search algorithm for understanding the baseline sequential approach, balanced binary search trees such as AVL trees and red-black trees which maintain sorted order with efficient insertions and deletions, B-tree and B+ tree data structures that generalize binary search for disk-based storage, depth-first search and breadth-first search for graph traversal counterparts, interpolation search for an alternative divide-and-conquer strategy on uniformly distributed data, and sorting algorithms such as merge sort and quick sort which are prerequisites for applying binary search to unsorted data.

## Summary

Binary search is a foundational divide-and-conquer algorithm that locates elements in sorted collections with O(log n) time complexity by repeatedly halving the search interval. Its efficiency makes it one of the most widely used algorithms in practice, appearing in standard libraries, database engines, version control tools, and numerical methods. While conceptually straightforward, correct implementation requires careful attention to boundary conditions, overflow handling, and the sorted-data prerequisite. Mastery of binary search and its variants is essential for any technology professional, as its principles recur across algorithm design, systems engineering, and technical interviews.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapter 2 covers binary search in the context of divide-and-conquer algorithms.
- Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching* (2nd ed.). Addison-Wesley. Section 6.2 provides an in-depth treatment of binary search and its history.
- Bentley, J. L. (1986). *Programming Pearls*. Addison-Wesley. Column 4 discusses the surprising difficulty of implementing binary search correctly.
- Bloch, J. (2006). "Extra, Extra - Read All About It: Nearly All Binary Searches and Mergesorts are Broken." Google Research Blog. Documents the integer overflow bug present in many binary search implementations for decades. https://research.google/blog/extra-extra-read-all-about-it-nearly-all-binary-searches-and-mergesorts-are-broken/
- Wikipedia contributors. "Binary search algorithm." Wikipedia, The Free Encyclopedia. https://en.wikipedia.org/wiki/Binary_search_algorithm
