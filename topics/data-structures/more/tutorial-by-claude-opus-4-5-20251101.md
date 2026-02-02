# Data Structures

Data structures are the fundamental building blocks used to organize and store data in computer programs. They enable efficient management of large amounts of data and form the foundation for implementing algorithms and data manipulation techniques. Choosing the right data structure directly impacts application performance, memory usage, and code maintainability.

## Why Data Structures Matter

Every software application manipulates data. The way you organize that data determines how quickly you can search, insert, update, and delete information. A poor choice of data structure can turn a millisecond operation into one that takes minutes. Understanding data structures allows you to make informed architectural decisions and write performant code.

## Classification of Data Structures

Data structures fall into two primary categories based on how they organize elements.

| Category | Description | Examples |
|----------|-------------|----------|
| **Linear** | Elements arranged in sequential order with each element connected to its predecessor and successor | Arrays, Linked Lists, Stacks, Queues |
| **Non-Linear** | Elements arranged in hierarchical or networked relationships | Trees, Graphs, Heaps |

Another useful classification considers whether the size is fixed at creation.

| Type | Description | Examples |
|------|-------------|----------|
| **Static** | Fixed size determined at compile time | Arrays |
| **Dynamic** | Size can grow or shrink at runtime | Linked Lists, Trees, Hash Tables |

## Arrays

Arrays store elements in contiguous memory locations, allowing direct access to any element using an index. This contiguous storage makes arrays extremely cache-friendly and fast for random access operations.

**Characteristics:**
- Constant-time access to any element by index
- Fixed size in most languages (dynamic arrays resize by allocating new memory)
- Efficient memory usage with minimal overhead per element
- Poor performance for insertions and deletions in the middle

**Best used when:**
- You know the maximum number of elements in advance
- You need frequent random access by position
- Memory efficiency is critical
- Elements rarely need insertion or deletion except at the end

## Linked Lists

Linked lists store elements in nodes scattered throughout memory, with each node containing a reference (pointer) to the next node. This structure allows efficient insertions and deletions without shifting elements.

**Types of Linked Lists:**

| Type | Structure | Trade-offs |
|------|-----------|------------|
| **Singly Linked** | Each node points to the next | Minimal memory overhead, forward traversal only |
| **Doubly Linked** | Each node points to both next and previous | Higher memory overhead, bidirectional traversal |
| **Circular** | Last node points back to first | Useful for round-robin scheduling, continuous iteration |

**Best used when:**
- Frequent insertions and deletions occur at arbitrary positions
- You do not need random access by index
- The size changes frequently and unpredictably
- You need to implement stacks, queues, or other abstract data types

## Stacks

Stacks enforce Last-In-First-Out (LIFO) ordering. The most recently added element is the first one removed. Think of a stack of plates—you add and remove from the top only.

**Core Operations:**
- **Push**: Add element to the top
- **Pop**: Remove element from the top
- **Peek/Top**: View the top element without removing it

**Common Applications:**
- Function call management (the call stack)
- Undo/redo functionality in applications
- Expression parsing and evaluation
- Backtracking algorithms
- Browser history navigation

## Queues

Queues enforce First-In-First-Out (FIFO) ordering. Elements enter at the rear and exit from the front, like a line at a ticket counter.

**Queue Variants:**

| Variant | Description | Use Case |
|---------|-------------|----------|
| **Simple Queue** | Standard FIFO behavior | Task scheduling, print spooling |
| **Circular Queue** | Front and rear wrap around | Buffer management, CPU scheduling |
| **Priority Queue** | Elements dequeued by priority, not arrival order | Event simulation, Dijkstra's algorithm |
| **Deque (Double-ended)** | Insert and remove from both ends | Sliding window problems, work stealing |

**Common Applications:**
- Request handling in web servers
- Breadth-first search algorithms
- Message queuing systems
- Asynchronous task processing

## Hash Tables

Hash tables (also called hash maps or dictionaries) provide near-constant-time access to values using keys. A hash function converts keys into array indices, enabling direct lookup.

**Key Concepts:**
- **Hash Function**: Converts keys to indices; must be deterministic and distribute keys uniformly
- **Collision**: When different keys hash to the same index
- **Load Factor**: Ratio of stored elements to table capacity

**Collision Resolution Strategies:**

| Strategy | Description | Trade-offs |
|----------|-------------|------------|
| **Chaining** | Each bucket stores a linked list of entries | Simple, handles high load factors, extra memory for pointers |
| **Open Addressing** | Find next available slot using probing | Better cache performance, degrades at high load factors |

**Best used when:**
- You need fast lookup, insertion, and deletion by key
- Key uniqueness can be guaranteed or handled
- Order of elements does not matter
- Memory overhead is acceptable

## Trees

Trees organize data hierarchically with a root node and parent-child relationships. Each node (except the root) has exactly one parent, and nodes can have zero or more children.

**Essential Terminology:**
- **Root**: The topmost node with no parent
- **Leaf**: A node with no children
- **Height**: Longest path from root to any leaf
- **Depth**: Distance from root to a specific node

**Common Tree Types:**

| Tree Type | Properties | Primary Use |
|-----------|------------|-------------|
| **Binary Tree** | Each node has at most two children | General hierarchical data, expression trees |
| **Binary Search Tree (BST)** | Left child < parent < right child | Sorted data with logarithmic operations |
| **AVL Tree** | Self-balancing BST with height difference ≤ 1 | Databases, lookups where balance is critical |
| **Red-Black Tree** | Self-balancing BST with color properties | Standard library implementations (maps, sets) |
| **B-Tree** | Multi-way tree optimized for disk access | Database indexes, file systems |
| **Trie (Prefix Tree)** | Each path represents a prefix of stored strings | Autocomplete, spell checkers, IP routing |

**Best used when:**
- Data has natural hierarchical relationships
- You need sorted data with efficient search, insert, and delete
- You need to find all items with a common prefix
- Range queries are frequent

## Heaps

Heaps are complete binary trees that satisfy the heap property: each parent is greater than (max-heap) or less than (min-heap) its children. Heaps efficiently support finding and removing the extreme element.

**Heap Comparison:**

| Type | Root Contains | Use Case |
|------|---------------|----------|
| **Min-Heap** | Smallest element | Priority queues, Dijkstra's algorithm |
| **Max-Heap** | Largest element | Scheduling by priority, heap sort |

**Key Operations:**
- **Insert**: Add element and bubble up to restore heap property
- **Extract-Min/Max**: Remove root and re-heapify
- **Peek**: View root without removal

Heaps are commonly implemented as arrays, where for element at index i, the left child is at 2i+1 and right child at 2i+2.

## Graphs

Graphs represent relationships between entities using vertices (nodes) and edges (connections). They are the most flexible data structure for modeling real-world networks.

**Graph Classifications:**

| Classification | Options | Description |
|----------------|---------|-------------|
| **Direction** | Directed / Undirected | Edges have direction or are bidirectional |
| **Weight** | Weighted / Unweighted | Edges carry cost/distance values or are uniform |
| **Cycles** | Cyclic / Acyclic | Contains cycles or is cycle-free |
| **Connectivity** | Connected / Disconnected | All vertices reachable or isolated components exist |

**Representation Methods:**

| Method | Description | Best For |
|--------|-------------|----------|
| **Adjacency Matrix** | 2D array where matrix[i][j] indicates edge between i and j | Dense graphs, quick edge lookup |
| **Adjacency List** | Each vertex stores list of neighbors | Sparse graphs, memory efficiency |
| **Edge List** | List of all edges as pairs | Simple algorithms, edge-centric processing |

**Common Applications:**
- Social networks (users and friendships)
- Maps and navigation (locations and routes)
- Dependency resolution (build systems, package managers)
- Network topology and routing
- Recommendation systems

## Choosing the Right Data Structure

Selecting a data structure requires analyzing your access patterns, constraints, and performance requirements.

| If You Need | Consider |
|-------------|----------|
| Fast access by index | Array |
| Fast access by key | Hash Table |
| Frequent insertions/deletions | Linked List |
| LIFO access pattern | Stack |
| FIFO access pattern | Queue |
| Sorted data with range queries | Binary Search Tree or Balanced Tree |
| Hierarchical relationships | Tree |
| Complex relationships and connections | Graph |
| Fast min/max extraction | Heap |
| Prefix-based searches | Trie |

## Time Complexity Comparison

Understanding operation costs helps you make informed decisions.

| Data Structure | Access | Search | Insert | Delete |
|----------------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1)* | O(1)* |
| Stack | O(n) | O(n) | O(1) | O(1) |
| Queue | O(n) | O(n) | O(1) | O(1) |
| Hash Table | N/A | O(1) avg | O(1) avg | O(1) avg |
| Binary Search Tree | O(log n)** | O(log n)** | O(log n)** | O(log n)** |
| Balanced Tree | O(log n) | O(log n) | O(log n) | O(log n) |
| Heap | O(1) for min/max | O(n) | O(log n) | O(log n) |

*When position is known
**Assumes balanced tree; degrades to O(n) if unbalanced

## Space Complexity Considerations

Memory usage varies significantly across data structures.

| Data Structure | Space Complexity | Overhead Notes |
|----------------|-----------------|----------------|
| Array | O(n) | Minimal overhead, may waste space if not full |
| Linked List | O(n) | Extra pointer storage per node |
| Hash Table | O(n) | Load factor overhead, potential empty buckets |
| Binary Tree | O(n) | Two pointers per node minimum |
| Graph (Adjacency Matrix) | O(V²) | Wasteful for sparse graphs |
| Graph (Adjacency List) | O(V + E) | Efficient for sparse graphs |

## Practical Guidelines

**Start simple.** Use arrays and hash tables for most problems. They cover the majority of use cases with excellent performance.

**Measure before optimizing.** Profile your application to identify actual bottlenecks rather than optimizing based on assumptions.

**Consider your language's standard library.** Most languages provide well-tested, optimized implementations of common data structures. Use them instead of building custom solutions.

**Think about cache locality.** Arrays and structures with contiguous memory often outperform pointer-based structures in practice due to CPU cache behavior.

**Balance trade-offs.** Faster operations often require more memory. Simpler structures are easier to debug and maintain. Choose based on your actual constraints.
