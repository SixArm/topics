# Search algorithms

Search algorithms are fundamental techniques in computer science used to locate specific elements or values within data structures. Every software system, from databases and web search engines to operating systems and compilers, relies on search algorithms to retrieve information efficiently. Understanding how different search algorithms work, their performance characteristics, and their ideal use cases is essential for technology professionals who need to select the right approach for a given problem.

## How Search Algorithms Work

A search algorithm takes a collection of data and a target value, then systematically examines elements in the collection to determine whether the target exists and where it is located. The efficiency of a search algorithm depends on the structure of the data, the size of the collection, and whether the data is sorted or indexed. The two primary categories are sequential search, which examines elements one at a time, and interval search, which exploits structure in the data to skip large portions of the collection.

## Linear Search

Linear search is the simplest and most intuitive search algorithm. It works by examining each element in a collection sequentially, starting from the first element and continuing until the target is found or the end of the collection is reached. Linear search requires no preconditions on the data: it works on unsorted collections, linked lists, arrays, and virtually any iterable data structure.

The trade-off is performance. Linear search has a worst-case and average-case time complexity of O(n), meaning the time required grows proportionally with the size of the collection. For small datasets or unsorted collections where no better alternative exists, linear search is perfectly acceptable. For large datasets, it becomes impractical.

**When to use linear search:**

- The collection is small (fewer than a few hundred elements)
- The data is unsorted and sorting is not worthwhile
- The data structure does not support random access (e.g., a singly linked list)
- You need to search only once or infrequently

## Binary Search

Binary search is one of the most efficient search algorithms for sorted collections. It works by repeatedly dividing the search range in half. At each step, the algorithm compares the target value to the middle element of the current range. If the target matches, the search is complete. If the target is smaller than the middle element, the search continues in the left half. If the target is larger, it continues in the right half.

Binary search achieves a time complexity of O(log n), which is dramatically faster than linear search for large datasets. For example, searching a sorted collection of one million elements requires at most about 20 comparisons with binary search, compared to up to one million comparisons with linear search. The prerequisite is that the collection must be sorted and must support random access (such as an array).

**When to use binary search:**

- The collection is sorted
- The data structure supports random access by index
- The collection is large enough that O(log n) provides a meaningful advantage over O(n)
- Searches are performed frequently, justifying the cost of maintaining sorted order

## Interpolation Search

Interpolation search improves on binary search when the data is not only sorted but also uniformly distributed. Instead of always checking the middle element, interpolation search estimates the likely position of the target based on its value relative to the minimum and maximum values in the current range. This estimate uses linear interpolation to predict where the target should fall, then narrows the search range accordingly.

When data is uniformly distributed, interpolation search achieves an average time complexity of O(log log n), which is faster than binary search. However, if the data is not uniformly distributed, interpolation search can degrade to O(n) in the worst case. This makes it a specialized tool rather than a general-purpose replacement for binary search.

**When to use interpolation search:**

- The collection is sorted and the values are approximately uniformly distributed
- The dataset is large and performance beyond binary search is desired
- You have knowledge of the data distribution in advance

## Comparison of Core Search Algorithms

| Algorithm | Time Complexity (Average) | Time Complexity (Worst) | Requires Sorted Data | Requires Random Access | Best For |
|---|---|---|---|---|---|
| Linear Search | O(n) | O(n) | No | No | Small or unsorted collections |
| Binary Search | O(log n) | O(log n) | Yes | Yes | Large sorted collections |
| Interpolation Search | O(log log n) | O(n) | Yes | Yes | Uniformly distributed sorted data |

## Beyond Basic Search: Advanced Algorithms

Technology professionals frequently encounter search problems that go beyond scanning a flat collection. Several advanced search algorithms address more complex scenarios:

- **Hash-based search** uses a hash function to map keys to positions in a hash table, achieving O(1) average-case lookup time. Hash tables power dictionaries, caches, and database indexes. The trade-off is that hash tables require additional memory and can degrade to O(n) in the worst case due to collisions.

- **Depth-first search (DFS)** explores graph or tree structures by following each branch as far as possible before backtracking. DFS is used in pathfinding, topological sorting, cycle detection, and solving puzzles like mazes. It uses O(V + E) time where V is vertices and E is edges.

- **Breadth-first search (BFS)** explores graph or tree structures level by level, visiting all neighbors of a node before moving to the next level. BFS finds the shortest path in unweighted graphs and is used in network analysis, social graph traversal, and web crawling. It also uses O(V + E) time.

- **Jump search** works on sorted arrays by jumping ahead by a fixed number of elements, then performing a linear search within the identified block. It achieves O(sqrt(n)) time complexity and is useful when binary search's random access pattern causes excessive cache misses.

- **Exponential search** first finds a range where the target may exist by repeatedly doubling the index, then applies binary search within that range. It is particularly efficient when the target is near the beginning of a large sorted collection, achieving O(log n) time.

- **Fibonacci search** is similar to binary search but divides the array using Fibonacci numbers instead of halving. It avoids division operations and can be advantageous on systems where division is expensive.

## Choosing the Right Search Algorithm

Selecting the appropriate search algorithm depends on several factors:

- **Data structure:** Arrays support random access for binary and interpolation search. Linked lists are limited to linear or jump-based approaches. Graphs require DFS or BFS. Key-value lookups call for hash tables or balanced trees.

- **Data ordering:** If data is sorted, binary search or interpolation search should be the first consideration. If data is unsorted and will only be searched once, linear search avoids the overhead of sorting. If data will be searched repeatedly, sorting it first and then using binary search is often worthwhile.

- **Data size:** For very small collections (under ~50 elements), linear search is typically fastest due to low overhead and cache-friendly sequential access. For larger collections, the logarithmic or constant-time algorithms provide significant gains.

- **Frequency of operations:** If inserts and deletes are frequent alongside searches, self-balancing binary search trees (such as red-black trees or AVL trees) or hash tables provide efficient combined performance. If the data is static, a sorted array with binary search is simple and fast.

## Related

Related topics to explore next include sorting algorithms, which are often a prerequisite for efficient search; hash tables and hash functions, which underpin constant-time lookups; graph algorithms such as Dijkstra's algorithm and A* search for weighted pathfinding problems; tree data structures including binary search trees, B-trees, and tries; and algorithm complexity analysis using Big O notation, which provides the framework for reasoning about search algorithm performance.

## Summary

Search algorithms span a wide range of complexity and capability, from the straightforward linear scan to sophisticated graph traversals and hash-based lookups. Linear search is universally applicable but slow on large data. Binary search delivers excellent performance on sorted collections with minimal implementation complexity. Interpolation search offers further gains on uniformly distributed data. Advanced techniques like hash-based search, DFS, and BFS address specialized data structures and problem domains. The right choice depends on the structure, size, ordering, and access patterns of the data, as well as how frequently searches are performed relative to insertions and deletions.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press.
- Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching* (2nd ed.). Addison-Wesley.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley.
- Skiena, S. S. (2020). *The Algorithm Design Manual* (3rd ed.). Springer.
- "Binary Search" — Wikipedia: [https://en.wikipedia.org/wiki/Binary_search_algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm)
- "Search Algorithm" — Wikipedia: [https://en.wikipedia.org/wiki/Search_algorithm](https://en.wikipedia.org/wiki/Search_algorithm)
- "Interpolation Search" — Wikipedia: [https://en.wikipedia.org/wiki/Interpolation_search](https://en.wikipedia.org/wiki/Interpolation_search)
