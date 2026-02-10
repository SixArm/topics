# Bubble sort algorithm

Bubble sort is a comparison-based sorting algorithm that repeatedly traverses a list, compares adjacent elements, and swaps them if they are out of order. This process continues until no more swaps are needed, indicating the list is fully sorted. The algorithm earns its name from the way smaller elements gradually "bubble" toward the beginning of the list with each pass, while larger elements sink toward the end. Bubble sort is one of the most straightforward sorting algorithms to understand and implement, which makes it a staple of computer science education, even though it is rarely used in production systems due to its poor performance on large datasets.

## How it works

Bubble sort operates by making repeated passes through the list. During each pass, the algorithm compares every pair of adjacent elements, starting from the beginning. If two adjacent elements are in the wrong order, they are swapped. After the first complete pass, the largest element is guaranteed to be in its correct final position at the end of the list. After the second pass, the second-largest element is in place, and so on. This means that with each successive pass, the algorithm can examine one fewer element, since the tail of the list accumulates sorted elements.

The algorithm terminates either when it has completed n-1 passes for a list of n elements, or when a full pass completes without any swaps, which signals that the list is already sorted.

## Step-by-step process

- **Start at the beginning**: Begin with the first element of the list at index 0.
- **Compare adjacent elements**: Compare the current element with the next element. If the current element is greater than the next, swap them.
- **Advance through the list**: Move to the next pair of adjacent elements and repeat the comparison and conditional swap.
- **Complete the pass**: Continue until the end of the unsorted portion of the list is reached. The largest unsorted element is now in its correct position.
- **Repeat**: Begin a new pass from the start of the list, excluding the already-sorted tail. Continue until no swaps occur during a complete pass or all passes are exhausted.

## Time and space complexity

| Case | Time Complexity | Description |
|------|----------------|-------------|
| Best case | O(n) | The list is already sorted; one pass with no swaps confirms this (with the optimized variant) |
| Average case | O(n^2) | Elements are in random order, requiring many comparisons and swaps |
| Worst case | O(n^2) | The list is sorted in reverse order, requiring the maximum number of swaps |
| Space complexity | O(1) | Bubble sort is an in-place algorithm that requires only a constant amount of additional memory |

The quadratic time complexity in the average and worst cases makes bubble sort impractical for sorting large collections. For a list of 10,000 elements, the algorithm may require up to 100 million comparisons, whereas more efficient algorithms like merge sort or quicksort would handle the same list in roughly 130,000 operations.

## Key properties

- **Stable**: Bubble sort preserves the relative order of equal elements. If two elements have the same value, they will remain in the same order they appeared in the original list. This property is important when sorting records by multiple criteria.
- **In-place**: The algorithm sorts the list without requiring additional data structures. It uses only a fixed amount of extra memory for temporary variables during swaps.
- **Adaptive**: With the early-termination optimization (a flag that tracks whether any swaps occurred during a pass), bubble sort can detect an already-sorted list in O(n) time, making it adaptive to the existing order of the input.
- **Online**: Bubble sort cannot efficiently process elements as they arrive; it requires access to the full list before sorting begins.

## The early-termination optimization

The naive implementation of bubble sort always performs n-1 passes regardless of the input. A practical improvement is to introduce a boolean flag that is set whenever a swap occurs during a pass. If a complete pass finishes without any swaps, the list is sorted and the algorithm terminates immediately. This optimization transforms the best-case performance from O(n^2) to O(n), which is significant when the input is already sorted or nearly sorted.

## Comparison with other sorting algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable | Notes |
|-----------|-----------|-------------|------------|-------|--------|-------|
| Bubble sort | O(n) | O(n^2) | O(n^2) | O(1) | Yes | Simple but inefficient for large lists |
| Selection sort | O(n^2) | O(n^2) | O(n^2) | O(1) | No | Fewer swaps than bubble sort but not adaptive |
| Insertion sort | O(n) | O(n^2) | O(n^2) | O(1) | Yes | Better constant factors; preferred for small or nearly sorted lists |
| Merge sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | Guaranteed performance but requires extra memory |
| Quick sort | O(n log n) | O(n log n) | O(n^2) | O(log n) | No | Fast in practice; most common general-purpose sort |
| Heap sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No | In-place with guaranteed O(n log n) but poor cache behavior |

Among the simple O(n^2) algorithms, insertion sort is generally preferred over bubble sort because it performs fewer comparisons and swaps on average and has better cache locality. Bubble sort's primary advantage is pedagogical: its simplicity makes it an excellent teaching tool for introducing sorting concepts, algorithm analysis, and optimization techniques.

## When to use bubble sort

Bubble sort is appropriate in a narrow set of circumstances:

- **Educational contexts**: Teaching the fundamentals of sorting, algorithm analysis, and Big-O notation.
- **Very small datasets**: When the list contains only a handful of elements, the overhead of more sophisticated algorithms is unnecessary.
- **Nearly sorted data**: When the input is known to be almost sorted, the early-termination optimization allows bubble sort to finish quickly.
- **Memory-constrained environments**: When available memory is extremely limited and an in-place, constant-space algorithm is required.

For virtually all production use cases, standard library sorting functions (which typically implement introsort, timsort, or merge sort) are the correct choice.

## Related

Related topics to explore next include insertion sort algorithm and selection sort algorithm as fellow O(n^2) comparison sorts, merge sort algorithm and quick sort algorithm as efficient O(n log n) alternatives, heap sort algorithm for an in-place O(n log n) approach, algorithm complexity analysis and Big-O notation for understanding performance characteristics, and sorting algorithm stability for appreciating when preservation of element order matters.

## Summary

Bubble sort is a foundational sorting algorithm valued for its simplicity and ease of implementation rather than its performance. It works by repeatedly comparing and swapping adjacent elements until the list is sorted, with an optional early-termination optimization that allows it to detect sorted input in linear time. Its O(n^2) average and worst-case time complexity makes it unsuitable for large datasets, but its stability, in-place operation, and conceptual clarity make it an enduring educational tool and a useful baseline for comparing more advanced sorting algorithms.

## References

- Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching* (2nd ed.). Addison-Wesley. Section 5.2.2 covers bubble sort and its analysis.
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Provides foundational coverage of sorting algorithms and complexity analysis.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Offers practical treatment of elementary sorting methods including bubble sort.
- Astrachan, O. (2003). "Bubble sort: an archaeological algorithmic analysis." *ACM SIGCSE Bulletin*, 35(1), 1-5. A study examining the historical origins and pedagogical role of bubble sort.
- Wikipedia contributors. "Bubble sort." *Wikipedia, The Free Encyclopedia*. [https://en.wikipedia.org/wiki/Bubble_sort](https://en.wikipedia.org/wiki/Bubble_sort)
