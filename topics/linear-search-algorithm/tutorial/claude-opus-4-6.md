# Linear search algorithm

Linear search, also known as sequential search, is one of the simplest and most intuitive searching algorithms in computer science. It examines each element in a data structure one at a time, in order, until it finds the target value or exhausts the entire collection. While it lacks the speed of more sophisticated algorithms, linear search remains a practical and important tool due to its simplicity, its minimal preconditions, and its applicability to unsorted data. Every technology professional should understand linear search as a foundational concept, both for its direct utility and as a baseline against which more advanced algorithms are measured.

## How it works

Linear search operates by traversing a list or array from the first element to the last, comparing each element against the desired target value. The process follows a deterministic sequence:

- **Start** at the first element of the collection.
- **Compare** the current element with the target value.
- **If a match is found**, return the position (index) of the element and terminate the search.
- **If no match is found**, advance to the next element and repeat the comparison.
- **If the end of the collection is reached** without finding the target, report that the element is not present, typically by returning a sentinel value such as -1 or null.

This approach requires no preprocessing, no sorting, and no auxiliary data structures. The algorithm inspects elements in the order they appear, making it a strictly sequential process.

## Time and space complexity

Understanding the computational cost of linear search is essential for making informed decisions about when to use it.

| Metric | Value | Explanation |
|---|---|---|
| Best-case time | O(1) | The target is the first element inspected |
| Average-case time | O(n) | On average, half the elements are inspected |
| Worst-case time | O(n) | The target is the last element or is absent |
| Space complexity | O(1) | No additional memory is required beyond a few variables |

The linear relationship between input size and execution time is the defining characteristic of the algorithm. For a list of one million elements, the worst case requires one million comparisons. This makes linear search impractical as a primary strategy for large, frequently queried datasets, but perfectly acceptable for small collections or infrequent searches.

## When to use linear search

Linear search is the right choice in several common scenarios:

- **Unsorted data**: When the collection has no guaranteed ordering, algorithms like binary search cannot be applied. Linear search works regardless of element order.
- **Small datasets**: For collections with tens or hundreds of elements, the overhead of sorting or building an index exceeds the cost of a simple sequential scan.
- **One-time or rare lookups**: If a search will only be performed once or very infrequently, the cost of preprocessing (sorting, hashing) is not justified.
- **Linked lists**: Data structures that do not support random access inherently require sequential traversal, making linear search the natural fit.
- **Searching by complex criteria**: When the match condition is a predicate function rather than a simple equality check, linear search adapts trivially, while other algorithms may not.
- **Streaming or unbounded data**: When data arrives incrementally and must be checked on the fly, sequential inspection is often the only viable approach.

## Comparison with other search algorithms

Linear search is best understood in context with its alternatives. Each algorithm makes different tradeoffs between preconditions, speed, and implementation complexity.

| Algorithm | Time complexity (average) | Requires sorted data | Requires extra memory | Implementation complexity |
|---|---|---|---|---|
| Linear search | O(n) | No | No | Very low |
| Binary search | O(log n) | Yes | No | Low |
| Hash table lookup | O(1) amortized | No | Yes (hash table) | Moderate |
| Interpolation search | O(log log n) | Yes, uniformly distributed | No | Moderate |
| Jump search | O(sqrt(n)) | Yes | No | Low |

Binary search is dramatically faster but demands a sorted collection. Hash table lookups offer constant-time access but require building and maintaining a hash table, which consumes additional memory. Linear search asks for nothing in return: no sorting, no extra memory, no special data distribution.

## Variants and optimizations

Several modifications can improve linear search performance in specific situations:

- **Sentinel search**: A sentinel value equal to the target is placed at the end of the array, eliminating the need to check the boundary condition on every iteration. This removes one comparison per step, roughly halving the overhead in tight loops.
- **Move-to-front heuristic**: When a target is found, it is moved to the front of the list. If certain elements are searched for more frequently than others, this causes popular elements to cluster near the beginning, reducing average search time over many queries.
- **Transpose heuristic**: Similar to move-to-front, but the found element is swapped with its immediate predecessor. This provides a more gradual reordering that can be more stable in some access patterns.
- **Bidirectional search**: The list is searched simultaneously from both ends toward the middle, effectively halving the worst-case number of comparisons in practice, though the asymptotic complexity remains O(n).
- **Early termination on sorted data**: If the list happens to be sorted and the current element exceeds the target, the search can terminate early, knowing the target cannot appear later.

## Practical considerations

In real-world software engineering, the choice of search algorithm is often driven by factors beyond raw asymptotic performance:

- **Maintainability**: Linear search is trivial to implement, read, and debug. In codebases where clarity matters more than microseconds, this is a significant advantage.
- **Cache behavior**: Sequential memory access patterns are highly cache-friendly on modern hardware. Linear search over a contiguous array can outperform theoretically faster algorithms that cause cache misses due to random access patterns, particularly for small to medium datasets.
- **Language and library support**: Most standard libraries provide built-in linear search operations (such as `find`, `indexOf`, `contains`, or `any`), meaning developers rarely need to implement the algorithm from scratch.
- **Correctness guarantees**: The simplicity of linear search minimizes the surface area for bugs. Off-by-one errors, incorrect midpoint calculations, and other pitfalls common in binary search implementations do not arise.

## Related

After mastering linear search, the next topics to study include binary search algorithm for efficient searching in sorted collections, hash tables for constant-time lookups, jump search and interpolation search as alternatives for sorted data, breadth-first search and depth-first search for graph traversal, sorting algorithms such as quick sort and merge sort that enable faster search strategies, and big-O notation for a deeper understanding of algorithmic complexity analysis.

## Summary

Linear search is a fundamental algorithm that sequentially examines each element in a collection until the target is found or the collection is exhausted. Its O(n) time complexity and O(1) space complexity make it inefficient for large-scale repeated lookups but ideal for small, unsorted, or streaming datasets where simplicity and minimal preconditions matter. It serves as both a practical tool in everyday programming and a conceptual baseline for understanding why more complex search algorithms exist and when their additional overhead is justified.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press.
- Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching* (2nd ed.). Addison-Wesley.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley.
- Skiena, S. S. (2020). *The Algorithm Design Manual* (3rd ed.). Springer.
- "Linear search." Wikipedia. https://en.wikipedia.org/wiki/Linear_search
