# Stack data structure

A stack is a fundamental data structure in computer science that follows the Last-In-First-Out (LIFO) principle. It stores and manages a collection of elements where the most recently added element is always the first one to be removed. The concept mirrors a physical stack of plates: you place new plates on top and always remove from the top. Stacks appear throughout computing, from managing function calls during program execution to enabling undo functionality in applications. Despite their simplicity, stacks are among the most widely used and important data structures in software engineering.

## How a stack works

A stack maintains a single access point called the top. All insertions and deletions occur at this top position, which enforces the LIFO ordering. When an element is added, it becomes the new top. When an element is removed, the element immediately below it becomes the new top. This constrained access pattern is what distinguishes a stack from more general-purpose data structures like arrays or lists, where elements can be inserted or removed at arbitrary positions.

The stack maintains an internal pointer or index that tracks the current top position. When the stack is empty, this pointer indicates that no elements are available. As elements are pushed, the pointer advances; as elements are popped, it retreats. This mechanism ensures that operations remain efficient and predictable.

## Core operations

A stack supports a small, well-defined set of operations. Each operation has a specific purpose and consistent time complexity.

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| Push | Add an element to the top of the stack | O(1) |
| Pop | Remove and return the top element | O(1) |
| Peek (Top) | View the top element without removing it | O(1) |
| IsEmpty | Check whether the stack contains any elements | O(1) |
| Size | Return the number of elements currently in the stack | O(1) |

The constant-time performance of all primary operations is one of the stack's greatest strengths. Because access is restricted to the top element, no traversal or searching is required for any fundamental operation.

## Implementation approaches

Stacks can be implemented using different underlying data structures, each with distinct trade-offs.

**Array-based implementation.** The stack uses a fixed-size or dynamically resizable array. A variable tracks the index of the top element. Pushing increments the index and stores the value; popping retrieves the value and decrements the index. Array-based stacks offer excellent cache locality and minimal memory overhead per element. However, fixed-size arrays can overflow if the capacity is exceeded, and dynamic arrays may incur occasional resizing costs.

**Linked-list-based implementation.** Each element is stored in a node that contains a reference to the node below it. The top of the stack is a pointer to the head node. Pushing creates a new node and sets it as the head; popping removes the head and advances the pointer to the next node. Linked-list stacks grow and shrink dynamically without capacity limits, but each element carries the overhead of an additional pointer, and memory allocation occurs on every push.

| Factor | Array-based | Linked-list-based |
|--------|-------------|-------------------|
| Memory overhead | Low (contiguous block) | Higher (pointer per node) |
| Dynamic sizing | Requires resizing logic | Naturally dynamic |
| Cache performance | Excellent (spatial locality) | Poor (scattered allocation) |
| Maximum capacity | Bounded unless resizable | Bounded only by available memory |
| Allocation cost | Amortized O(1) with resizing | O(1) per operation but involves allocator |

## Common use cases

Stacks are used extensively across many areas of computing:

- **Function call management.** The call stack tracks active function invocations, storing return addresses, local variables, and parameters. Each function call pushes a new frame; each return pops it.
- **Expression evaluation.** Compilers and interpreters use stacks to evaluate arithmetic expressions, convert between infix, prefix, and postfix notation, and match parentheses and brackets.
- **Undo and redo functionality.** Applications maintain a stack of previous states or actions. Undoing pops the most recent action; redoing pushes it back.
- **Backtracking algorithms.** Depth-first search, maze solving, and constraint satisfaction problems use stacks to remember decision points and retreat when a dead end is reached.
- **Browser navigation.** Web browsers use stacks to manage the back and forward history of visited pages.
- **Syntax parsing.** Parsers use stacks to validate and process nested structures such as HTML tags, JSON objects, and programming language grammars.
- **Memory management.** Stack-based memory allocation is used for local variables and function frames in most programming languages, providing fast and automatic deallocation.

## Stack overflow and underflow

Two primary error conditions are associated with stacks. A **stack overflow** occurs when a push operation is attempted on a stack that has reached its maximum capacity. This is most commonly encountered in array-based implementations with fixed sizes, or in recursive programs where excessive recursion depth exhausts the call stack. A **stack underflow** occurs when a pop or peek operation is attempted on an empty stack, meaning there are no elements to retrieve.

Robust implementations guard against both conditions. Overflow protection may involve dynamic resizing or returning an error. Underflow protection typically involves checking the empty condition before performing a pop or peek, or raising an exception when the operation is invalid.

## Comparison with other data structures

Understanding how a stack relates to other data structures helps clarify when to choose it.

| Data Structure | Access Pattern | Order | Primary Use |
|----------------|---------------|-------|-------------|
| Stack | Top only | LIFO | Function calls, backtracking, undo |
| Queue | Front and rear | FIFO (First-In-First-Out) | Task scheduling, breadth-first search |
| Deque | Both ends | Both LIFO and FIFO | Sliding window, flexible buffering |
| Array | Any index | Index-based | Random access, iteration |
| Linked List | Sequential | Traversal-based | Dynamic collections, insertion/deletion |

A stack is the right choice when the problem naturally requires LIFO ordering. If elements need to be processed in the order they arrived, a queue is more appropriate. If both ends need access, a deque provides that flexibility.

## Performance characteristics

The stack's restricted interface yields strong performance guarantees:

- **Time complexity.** All core operations run in O(1) constant time. There is no operation on a standard stack that requires traversal or searching.
- **Space complexity.** A stack of n elements uses O(n) space. Array-based implementations may allocate slightly more due to reserved capacity; linked-list implementations use additional space for pointers.
- **Amortized cost.** For dynamically resizing array-based stacks, individual push operations are O(1) amortized. The occasional resize operation copies all elements, but this cost is spread across many pushes.

These properties make stacks highly efficient for the problems they are designed to solve. The predictability of constant-time operations is particularly valuable in real-time and performance-critical systems.

## Related

Related topics to explore include the queue data structure, which provides FIFO ordering as the complement to the stack's LIFO behavior. Depth-first search and breadth-first search algorithms illustrate how stacks and queues drive different traversal strategies in graphs and trees. Recursion is closely tied to stacks, as every recursive call implicitly uses the call stack. Linked list and array data structures are important to understand as the primary building blocks for stack implementations. Expression parsing and compiler design demonstrate stacks in action within language processing systems.

## Summary

The stack is a foundational data structure that enforces Last-In-First-Out access through a minimal set of operations: push, pop, peek, isEmpty, and size. All core operations execute in constant time, making the stack both simple and efficient. It can be implemented with arrays for cache-friendly performance or with linked lists for dynamic sizing. Stacks are indispensable in function call management, expression evaluation, backtracking algorithms, undo mechanisms, and syntax parsing. Their constrained interface is a feature rather than a limitation, providing clarity and predictability that make them one of the most universally applied data structures in computer science.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley.
- Knuth, D. E. (1997). *The Art of Computer Programming, Volume 1: Fundamental Algorithms* (3rd ed.). Addison-Wesley.
- Aho, A. V., Hopcroft, J. E., & Ullman, J. D. (1983). *Data Structures and Algorithms*. Addison-Wesley.
- Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. (2014). *Data Structures and Algorithms in Java* (6th ed.). Wiley.
