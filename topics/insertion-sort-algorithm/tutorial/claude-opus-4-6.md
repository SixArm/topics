# Insertion sort algorithm

Insertion sort is a comparison-based sorting algorithm that builds a sorted sequence one element at a time. It is one of the simplest sorting algorithms to understand and implement, mirroring the intuitive process most people use when sorting a hand of playing cards: pick up each card and slide it into its proper place among the cards already held. Despite its quadratic worst-case time complexity, insertion sort remains practically important because of its efficiency on small or nearly sorted datasets, its low overhead, and its role as a subroutine inside more advanced algorithms such as Timsort.

## How it works

Insertion sort divides the input into a sorted region and an unsorted region. Initially, the sorted region contains only the first element. The algorithm then iterates through the unsorted region, picking one element at a time and scanning backward through the sorted region to find the correct position for that element. As it scans, it shifts each larger element one position to the right, then places the current element into the vacated slot. This process repeats until every element has been inserted into the sorted region and no unsorted elements remain.

The algorithm proceeds in four logical phases:

- **Initialization**: Treat the first element as a sorted sublist of length one.
- **Selection**: Take the next element from the unsorted portion.
- **Insertion**: Compare it against elements in the sorted portion, shifting elements rightward as needed, and place it in the correct position.
- **Termination**: Repeat selection and insertion until all elements are sorted.

## Time and space complexity

Insertion sort's performance depends heavily on the initial ordering of the input. The table below summarizes its complexity characteristics.

| Metric | Best case | Average case | Worst case |
|---|---|---|---|
| Time complexity | O(n) | O(n^2) | O(n^2) |
| Comparisons | n - 1 | n^2 / 4 | n(n - 1) / 2 |
| Swaps / shifts | 0 | n^2 / 4 | n(n - 1) / 2 |
| Space complexity | O(1) | O(1) | O(1) |

The best case occurs when the input is already sorted: the algorithm makes one comparison per element and performs no shifts, yielding linear time. The worst case occurs when the input is sorted in reverse order, requiring every element to be compared against all previously sorted elements and shifted to the front.

## Key properties

Insertion sort possesses several properties that distinguish it from other sorting algorithms:

- **Stable**: Equal elements retain their original relative order, which matters when sorting records by multiple keys.
- **In-place**: It requires only a constant amount of additional memory beyond the input array, making it memory-efficient.
- **Adaptive**: It naturally takes advantage of existing order in the input. The more sorted the data already is, the fewer operations it performs.
- **Online**: It can sort a list as it receives elements, without needing the entire input upfront.
- **Simple to implement**: The algorithm involves straightforward logic with minimal bookkeeping, reducing the chance of implementation errors.

## When to use insertion sort

Insertion sort is not a general-purpose sorting algorithm for large datasets, but it excels in specific scenarios:

- **Small datasets**: For arrays with fewer than 10 to 50 elements, insertion sort often outperforms asymptotically faster algorithms because of its low constant factors and minimal overhead.
- **Nearly sorted data**: When most elements are already close to their final positions, insertion sort approaches linear time, making it faster than O(n log n) algorithms that do not adapt to existing order.
- **Hybrid algorithm subroutine**: Production-quality sorting algorithms such as Timsort (used in Python and Java) and Introsort (used in many C++ standard library implementations) switch to insertion sort for small partitions to exploit its low overhead.
- **Streaming input**: Because insertion sort is an online algorithm, it can incorporate new elements into an already-sorted sequence efficiently.
- **Stability requirement**: When preserving the relative order of equal elements is essential and simplicity is preferred over more complex stable alternatives.

## Comparison with other sorting algorithms

| Property | Insertion sort | Selection sort | Bubble sort | Merge sort | Quick sort |
|---|---|---|---|---|---|
| Average time | O(n^2) | O(n^2) | O(n^2) | O(n log n) | O(n log n) |
| Best time | O(n) | O(n^2) | O(n) | O(n log n) | O(n log n) |
| Worst time | O(n^2) | O(n^2) | O(n^2) | O(n log n) | O(n^2) |
| Space | O(1) | O(1) | O(1) | O(n) | O(log n) |
| Stable | Yes | No | Yes | Yes | No |
| Adaptive | Yes | No | Yes | No | No |
| Online | Yes | No | No | No | No |

Insertion sort's advantage over selection sort and bubble sort lies primarily in its adaptive behavior: it performs significantly fewer operations on partially sorted input. However, for large random datasets, divide-and-conquer algorithms like merge sort and quick sort are substantially faster due to their O(n log n) average-case complexity.

## Practical considerations

In practice, several factors influence the decision to use insertion sort:

- **Cache performance**: Insertion sort accesses memory sequentially and operates in-place, making it cache-friendly on modern hardware. This practical advantage can outweigh theoretical complexity differences for small inputs.
- **Low overhead**: The algorithm has no recursion, no auxiliary data structures, and minimal branching, which translates to fast execution for small inputs even when compared to theoretically superior algorithms.
- **Sentinel optimization**: Placing the smallest possible value at the beginning of the array eliminates the need for a bounds check during the inner loop, reducing the number of comparisons per iteration.
- **Binary insertion sort**: Using binary search to find the correct insertion point reduces the number of comparisons from O(n) to O(log n) per element, though the number of shifts remains O(n) per element, so the overall worst-case time complexity stays O(n^2).
- **Shell sort generalization**: Shell sort extends insertion sort by comparing elements separated by a gap that decreases over iterations, achieving better performance on larger datasets while retaining the simplicity of the insertion sort approach.

## Related

Topics to explore next include other quadratic sorting algorithms such as bubble sort and selection sort for direct comparison, as well as asymptotically faster algorithms like merge sort, quick sort, and heap sort. Shell sort is a natural extension of insertion sort that achieves sub-quadratic performance. Timsort and Introsort are important hybrid algorithms that use insertion sort as a building block. Studying algorithm analysis and Big O notation provides the theoretical framework for understanding why these performance differences exist.

## Summary

Insertion sort is a straightforward, stable, in-place sorting algorithm that builds a sorted sequence by repeatedly inserting each unsorted element into its correct position among the already-sorted elements. Its O(n^2) worst-case and average-case time complexity make it impractical for large random datasets, but its O(n) best-case performance on nearly sorted input, combined with low constant factors and minimal memory requirements, make it the algorithm of choice for small arrays and as a finishing subroutine within high-performance hybrid sorting algorithms. Its simplicity, stability, adaptivity, and online capability ensure that insertion sort remains a foundational algorithm that every technology professional should understand.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapter 2: Getting Started.
- Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching* (2nd ed.). Addison-Wesley. Section 5.2.1: Sorting by Insertion.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Section 2.1: Elementary Sorts.
- Wikipedia contributors. "Insertion sort." *Wikipedia, The Free Encyclopedia*. [https://en.wikipedia.org/wiki/Insertion_sort](https://en.wikipedia.org/wiki/Insertion_sort)
- Peters, T. (2002). "Timsort." CPython source code documentation. [https://github.com/python/cpython/blob/main/Objects/listsort.txt](https://github.com/python/cpython/blob/main/Objects/listsort.txt)
