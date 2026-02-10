# Array data structure

An array is a collection of elements of the same data type stored in contiguous memory locations, accessible through a single variable name and integer indices. It is one of the most fundamental and widely used data structures in computer science, forming the backbone of countless algorithms and higher-level data structures. Arrays appear in virtually every programming language, and understanding their properties, trade-offs, and behavior is essential for writing efficient software.

## How arrays work

An array allocates a fixed block of contiguous memory at creation time. Each element occupies the same number of bytes, determined by the element's data type. To access a specific element, the runtime computes its memory address using a formula: the base address of the array plus the index multiplied by the element size. This arithmetic gives arrays their hallmark property of constant-time random access. In most programming languages, indices start at zero, so an array of length *n* has valid indices from 0 through *n* − 1.

Arrays can be one-dimensional (a flat sequence), two-dimensional (a grid or matrix), or multi-dimensional, depending on how many indices are needed to identify an element. A two-dimensional array of *m* rows and *n* columns is typically stored either in row-major order (all elements of one row are contiguous) or column-major order (all elements of one column are contiguous), depending on the language.

## Time complexity of common operations

The performance characteristics of arrays differ significantly from those of linked lists, trees, and hash tables. The table below summarizes the time complexity of common operations on a standard fixed-size array.

| Operation | Time Complexity | Notes |
|---|---|---|
| Access by index | O(1) | Direct address calculation |
| Search (unsorted) | O(n) | Must scan elements linearly |
| Search (sorted) | O(log n) | Binary search applies |
| Insert at end | O(1) amortized | O(n) if resizing is required |
| Insert at position | O(n) | Must shift subsequent elements |
| Delete at end | O(1) | No shifting needed |
| Delete at position | O(n) | Must shift subsequent elements |
| Update by index | O(1) | Direct address calculation |

The constant-time access by index is the defining advantage of the array. The linear cost of insertion and deletion in the middle is its principal weakness compared to linked structures.

## Static arrays versus dynamic arrays

Arrays come in two broad categories depending on whether their size can change after creation.

- **Static arrays** have a fixed length determined at allocation time. They cannot grow or shrink. Memory usage is predictable, and there is no overhead from resizing. Static arrays are common in languages like C and Fortran.

- **Dynamic arrays** (also called resizable arrays, growable arrays, or array lists) automatically expand when they run out of capacity. They typically double their internal buffer when full, which yields O(1) amortized time for appending. Examples include ArrayList in Java, vector in C++, list in Python, and Array in JavaScript.

| Characteristic | Static Array | Dynamic Array |
|---|---|---|
| Size | Fixed at creation | Grows and shrinks at runtime |
| Memory overhead | None beyond elements | Extra capacity buffer |
| Append cost | Not applicable (fixed) | O(1) amortized |
| Cache performance | Excellent | Excellent (contiguous storage) |
| Typical use cases | Buffers, lookup tables | Collections of variable length |

## Advantages of arrays

- **Fast random access.** Any element can be read or written in constant time given its index, which makes arrays ideal for lookup tables, buffers, and index-driven algorithms.

- **Cache friendliness.** Because elements occupy contiguous memory, iterating over an array benefits from spatial locality, which leads to fewer cache misses and higher throughput on modern processors.

- **Low memory overhead.** Arrays store only the elements themselves (plus a small amount of bookkeeping for length), with no per-element pointers or metadata.

- **Simple and predictable.** The memory layout and access pattern of an array are straightforward, which simplifies reasoning about performance and correctness.

## Disadvantages of arrays

- **Fixed size (static arrays).** Once allocated, a static array cannot grow. If the required size is unknown in advance, the programmer must either over-allocate or switch to a dynamic array.

- **Costly insertions and deletions.** Inserting or removing an element in the middle requires shifting all subsequent elements, which takes O(n) time.

- **Wasted space (dynamic arrays).** A dynamic array may have significant unused capacity after a resize, temporarily wasting memory.

- **Homogeneous elements.** Traditional arrays require all elements to share the same data type, which limits flexibility compared to heterogeneous containers.

## Common use cases

Arrays serve as the foundation for many algorithms and data structures in practice.

- **Sorting and searching.** Algorithms such as quicksort, mergesort, and binary search operate directly on arrays and rely on constant-time indexing for efficiency.

- **Implementing other data structures.** Stacks, queues, heaps, hash tables (via open addressing or separate chaining with array buckets), and matrices are commonly built on top of arrays.

- **Buffers and caches.** Circular buffers for I/O, frame buffers in graphics, and ring buffers in networking all use fixed-size arrays for predictable performance.

- **Numerical and scientific computing.** Large-scale simulations, signal processing, and machine learning frameworks store tensors and matrices as multi-dimensional arrays for fast, vectorized computation.

- **Lookup tables.** Precomputed results, character mappings, and histogram bins are stored in arrays for O(1) retrieval.

## Arrays compared to other data structures

| Criteria | Array | Linked List | Hash Table | Binary Search Tree |
|---|---|---|---|---|
| Random access | O(1) | O(n) | O(1) average | O(log n) |
| Insertion at arbitrary position | O(n) | O(1) after traversal | O(1) average | O(log n) |
| Deletion at arbitrary position | O(n) | O(1) after traversal | O(1) average | O(log n) |
| Ordered traversal | Natural (by index) | Natural (by pointer) | Not ordered | In-order traversal |
| Memory overhead per element | None | One or two pointers | Hash bucket overhead | Two pointers plus key |
| Cache performance | Excellent | Poor | Moderate | Moderate |

## Related

Related topics to learn next include linked list data structures for understanding pointer-based alternatives, stack and queue data structures which are often implemented with arrays, hash tables which use arrays internally for bucket storage, sorting algorithms and searching algorithms that operate on arrays, dynamic programming which frequently uses arrays for memoization tables, and matrix mathematics for multi-dimensional array applications.

## Summary

The array is the most elementary and performant random-access data structure in computing. Its contiguous memory layout delivers constant-time indexing and excellent cache behavior, making it the default choice for ordered collections, lookup tables, and numerical computation. The trade-off is that insertions and deletions in the middle are expensive, and static arrays cannot change size. Dynamic array variants address the sizing limitation at the cost of occasional resizing overhead. A thorough understanding of arrays and their complexity characteristics is prerequisite knowledge for working with virtually every other data structure and algorithm.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapters on elementary data structures and sorting.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Sections on arrays, resizing arrays, and array-based stacks and queues.
- Knuth, D. E. (1997). *The Art of Computer Programming, Volume 1: Fundamental Algorithms* (3rd ed.). Addison-Wesley. Discussion of linear lists and sequential allocation.
- Aho, A. V., Hopcroft, J. E., & Ullman, J. D. (1983). *Data Structures and Algorithms*. Addison-Wesley.
- https://en.wikipedia.org/wiki/Array_(data_structure) — Wikipedia overview of array data structures, variants, and language-specific implementations.
