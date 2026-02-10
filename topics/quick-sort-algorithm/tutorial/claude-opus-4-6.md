# Quick sort algorithm

Quick sort is one of the most widely used sorting algorithms in computer science. Developed by Tony Hoare in 1959, it is a comparison-based, divide-and-conquer algorithm that works by selecting a "pivot" element from an array and partitioning the remaining elements into two groups: those less than the pivot and those greater than the pivot. These groups are then sorted recursively. Quick sort is favored for its average-case efficiency, low memory overhead, and practical speed, making it the default sorting algorithm in many standard libraries and production systems.

## How quick sort works

Quick sort operates through a repeated cycle of pivoting and partitioning. The algorithm selects a pivot element, then rearranges the array so that all elements smaller than the pivot are moved to its left, and all elements larger are moved to its right. At that point, the pivot occupies its final sorted position. The algorithm then recurses on the left and right sub-arrays independently, continuing until every sub-array contains zero or one element, at which point the entire array is sorted.

The core steps are:

1. **Choose a pivot**: Select an element from the array to serve as the pivot. Common strategies include choosing the first element, the last element, the middle element, or a median-of-three.
2. **Partition**: Rearrange the array so all elements less than the pivot precede it and all elements greater follow it. The pivot lands in its correct sorted position.
3. **Recurse**: Apply quick sort recursively to the sub-array of elements before the pivot and the sub-array of elements after the pivot.
4. **Combine**: Because the partitioning sorts elements in place, no explicit merge step is required. Once all recursive calls complete, the array is fully sorted.

## Pivot selection strategies

The choice of pivot has a significant impact on quick sort's performance. A poorly chosen pivot can degrade the algorithm from its average-case efficiency to its worst case.

| Strategy | Description | Trade-off |
|---|---|---|
| First element | Always picks the first element as pivot | Simple but vulnerable to worst-case on sorted or nearly sorted input |
| Last element | Always picks the last element as pivot | Same vulnerability as first element on sorted data |
| Middle element | Picks the element at the midpoint of the array | Better behavior on sorted input but still not guaranteed optimal |
| Median-of-three | Takes the median of the first, middle, and last elements | Reduces likelihood of worst-case partitions with minimal overhead |
| Random pivot | Selects a random element as pivot | Provides probabilistic guarantees against worst-case behavior |

Median-of-three and random pivot are the most commonly recommended strategies for production implementations because they make pathological inputs statistically unlikely.

## Time and space complexity

Quick sort's performance characteristics depend heavily on how balanced the partitions are at each recursive step.

| Case | Time Complexity | When it occurs |
|---|---|---|
| Best case | O(n log n) | Pivot consistently divides the array into two roughly equal halves |
| Average case | O(n log n) | Random or well-distributed input with a reasonable pivot strategy |
| Worst case | O(n^2) | Pivot consistently selects the smallest or largest element, producing maximally unbalanced partitions |

- **Space complexity**: O(log n) on average for the recursive call stack. In the worst case, the stack depth reaches O(n), though tail-call optimization or iterative implementations can mitigate this.
- **In-place**: Quick sort sorts the array without allocating a separate output array, which gives it a memory advantage over merge sort.
- **Not stable**: Quick sort does not preserve the relative order of equal elements, which matters when sorting records by multiple keys.

## Partitioning schemes

Two classical partitioning schemes are used in quick sort implementations:

- **Lomuto partition scheme**: Uses a single index that scans from left to right. It is simpler to implement but performs more swaps on average and degrades more noticeably on arrays with many duplicate elements.
- **Hoare partition scheme**: Uses two indices that move toward each other from opposite ends. It performs fewer swaps on average and handles duplicates more gracefully, making it the preferred choice for most high-performance implementations.

A third approach, **three-way partitioning** (also called Dutch National Flag partitioning), divides the array into three groups: elements less than the pivot, elements equal to the pivot, and elements greater than the pivot. This scheme is particularly effective when the input contains many duplicate values, as it avoids redundant comparisons on elements already known to be equal.

## Advantages and disadvantages

**Advantages:**

- Excellent average-case performance of O(n log n) with low constant factors
- In-place sorting requires minimal additional memory
- Cache-friendly due to sequential memory access patterns during partitioning
- Highly adaptable through pivot selection and partitioning scheme choices
- Generally faster than merge sort in practice for in-memory sorting of primitive types

**Disadvantages:**

- Worst-case time complexity of O(n^2), though mitigated by good pivot strategies
- Not stable, which can be a requirement in certain applications
- Recursive nature can cause stack overflow on very large inputs without tail-call optimization
- Performance degrades on arrays with many duplicate elements unless three-way partitioning is used

## Quick sort versus other sorting algorithms

| Property | Quick sort | Merge sort | Heap sort |
|---|---|---|---|
| Average time | O(n log n) | O(n log n) | O(n log n) |
| Worst-case time | O(n^2) | O(n log n) | O(n log n) |
| Space complexity | O(log n) | O(n) | O(1) |
| Stable | No | Yes | No |
| In-place | Yes | No | Yes |
| Cache performance | Excellent | Good | Poor |
| Practical speed | Fastest for most in-memory cases | Preferred for linked lists and external sorting | Guaranteed worst-case but slower constants |

Quick sort tends to outperform merge sort and heap sort in practice for in-memory arrays due to its superior cache locality and lower constant factors, despite its theoretical worst-case disadvantage.

## Practical applications

Quick sort is the foundation of many real-world sorting implementations:

- **Standard library sorts**: Many language standard libraries use quick sort or hybrid algorithms based on it. For example, C's `qsort` and many implementations of Java's `Arrays.sort` for primitive types use dual-pivot quick sort.
- **Introsort**: A hybrid algorithm that begins with quick sort but switches to heap sort if the recursion depth exceeds a threshold, guaranteeing O(n log n) worst-case while preserving quick sort's practical speed. This is used in C++ STL's `std::sort`.
- **Database engines**: Quick sort is used internally for sorting query results and building indexes.
- **Selection algorithms**: The partitioning step of quick sort is the basis for Quickselect, an efficient algorithm for finding the k-th smallest element in O(n) average time.

## Related

Related topics to explore next include merge sort algorithm for a stable O(n log n) alternative, heap sort algorithm for a guaranteed worst-case O(n log n) in-place sort, insertion sort algorithm which quick sort often falls back to for small sub-arrays, divide-and-conquer algorithm design as the paradigm underlying quick sort, and sort algorithms as a broader survey of comparison-based and non-comparison-based sorting techniques.

## Summary

Quick sort is a divide-and-conquer sorting algorithm that partitions an array around a pivot element and recursively sorts the resulting sub-arrays in place. With an average-case time complexity of O(n log n), minimal memory overhead, and excellent cache performance, it is one of the fastest general-purpose sorting algorithms in practice. Its main drawback is an O(n^2) worst case, which is effectively mitigated through randomized or median-of-three pivot selection. Quick sort's versatility has made it the basis for standard library sorting implementations and hybrid algorithms like introsort across virtually every major programming language and platform.

## References

- Hoare, C.A.R. "Quicksort." *The Computer Journal*, vol. 5, no. 1, 1962, pp. 10-16. https://academic.oup.com/comjnl/article/5/1/10/395338
- Cormen, Thomas H., et al. *Introduction to Algorithms*, 4th ed., MIT Press, 2022. Chapter 7: Quicksort.
- Sedgewick, Robert. "Implementing Quicksort Programs." *Communications of the ACM*, vol. 21, no. 10, 1978, pp. 847-857.
- Bentley, Jon L., and M. Douglas McIlroy. "Engineering a Sort Function." *Software: Practice and Experience*, vol. 23, no. 11, 1993, pp. 1249-1265.
- Musser, David R. "Introspective Sorting and Selection Algorithms." *Software: Practice and Experience*, vol. 27, no. 8, 1997, pp. 983-993.
- Wikipedia: Quicksort. https://en.wikipedia.org/wiki/Quicksort
