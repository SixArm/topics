# Queue data structure

A queue is a fundamental data structure in computer science that follows the First-In-First-Out (FIFO) principle. It stores and manages a collection of elements where the first element added is the first one removed. Queues appear throughout computing, from operating system schedulers to network routers to print spoolers. Understanding queues is essential for any technology professional because they model real-world scenarios where order and fairness matter, and they underpin many critical algorithms and system designs.

## Core Concept

Think of a queue like a line of people waiting at a ticket counter: the person who arrives first gets served first, and new arrivals join the back of the line. A queue data structure works the same way. Elements enter at the rear (also called the tail or back) and leave from the front (also called the head). This FIFO discipline distinguishes queues from stacks, which follow a Last-In-First-Out (LIFO) order, and from priority queues, which serve elements based on assigned priority rather than arrival order.

The FIFO property makes queues the natural choice whenever processing must be fair and sequential. Any situation where requests, tasks, or messages must be handled in the order they were received calls for a queue.

## Primary Operations

A queue supports a small, well-defined set of operations. Each has clearly defined behavior and expected time complexity.

| Operation | Description | Typical Time Complexity |
|-----------|-------------|------------------------|
| Enqueue | Add an element to the back of the queue. The new element becomes the last in line. | O(1) |
| Dequeue | Remove and return the front element. The element behind it becomes the new front. | O(1) |
| Peek (Front) | View the front element without removing it. The queue remains unchanged. | O(1) |
| IsEmpty | Check whether the queue contains zero elements. Returns a boolean. | O(1) |
| Size | Return the count of elements currently in the queue. | O(1) |

All five operations should execute in constant time for a well-implemented queue. If an implementation requires linear time for enqueue or dequeue, it is a sign that the underlying data structure is not well suited to the task.

## Implementation Approaches

There are several common ways to implement a queue, each with distinct trade-offs.

**Array-based (linear array).** Elements are stored in a contiguous block of memory. Enqueue appends to the end; dequeue removes from the front. The straightforward version suffers from wasted space at the front as elements are dequeued, or requires shifting all elements forward on each dequeue, which costs O(n) time.

**Circular array (ring buffer).** A fixed-size array where the front and rear indices wrap around. This eliminates the wasted-space problem of linear arrays and maintains O(1) for both enqueue and dequeue. The trade-off is a fixed capacity; once the buffer is full, either elements must be rejected or the buffer must be resized.

**Linked list.** Each element is a node that contains data and a pointer to the next node. Enqueue creates a new node at the tail; dequeue removes the node at the head. This approach provides dynamic sizing with no wasted space and O(1) operations when both head and tail pointers are maintained.

| Implementation | Enqueue | Dequeue | Memory Usage | Dynamic Sizing |
|----------------|---------|---------|--------------|----------------|
| Linear array | O(1) amortized | O(n) or O(1) with index tracking | Compact, but may waste space at front | Requires resizing |
| Circular array | O(1) | O(1) | Compact, no waste | Fixed capacity or explicit resize |
| Linked list | O(1) | O(1) | Overhead per node (pointer storage) | Naturally dynamic |

For most general-purpose applications, a circular array or a linked list implementation is preferred. The circular array offers better cache locality and lower memory overhead per element, while the linked list avoids capacity limits entirely.

## Queue Variants

Several specialized variants of the basic queue exist, each tailored to specific requirements.

- **Double-ended queue (deque).** Allows insertion and removal at both ends. This generalizes the queue and the stack into a single data structure. Useful when elements may need to be added or removed from either end efficiently.

- **Priority queue.** Elements are served based on priority rather than arrival order. Typically implemented with a heap rather than a simple array or linked list. Essential for algorithms like Dijkstra's shortest path and for scheduling systems where urgency matters more than fairness.

- **Circular queue.** A queue implemented with a fixed-size circular buffer. Commonly used in embedded systems and real-time applications where memory is constrained and predictable performance is critical.

- **Blocking queue.** A thread-safe queue where dequeue blocks (waits) when the queue is empty and enqueue blocks when the queue is full. Widely used in producer-consumer patterns in concurrent and multithreaded programming.

- **Concurrent queue.** A queue designed for safe access by multiple threads without requiring external locks. Implementations use lock-free or wait-free algorithms to achieve high throughput in parallel systems.

## Common Use Cases

Queues are pervasive in computing. The following are among the most important applications.

- **Task scheduling.** Operating systems use queues to manage processes waiting for CPU time. Round-robin scheduling, for example, cycles through a queue of ready processes.

- **Breadth-first search (BFS).** Graph traversal algorithms use a queue to explore nodes level by level, ensuring that closer nodes are visited before more distant ones.

- **Request handling.** Web servers, message brokers, and API gateways queue incoming requests to process them in order, smoothing out bursts of traffic.

- **Print spooling.** Print jobs are queued so that documents are printed in the order they were submitted.

- **Buffering.** Data streams in networking, audio processing, and video playback use queues to buffer data between a producer and a consumer operating at different rates.

- **Event-driven systems.** GUI frameworks and event loops process user actions (clicks, keystrokes) through an event queue, maintaining the order in which events occurred.

## Performance Considerations

When choosing or designing a queue, several performance factors matter.

- **Time complexity.** Ensure that both enqueue and dequeue are O(1). Avoid implementations where dequeue triggers element shifting.

- **Memory allocation.** Array-based queues allocate memory in bulk, which is cache-friendly but may waste space. Linked-list queues allocate per element, which avoids waste but incurs allocation overhead and poorer cache behavior.

- **Thread safety.** In concurrent environments, naive locking can become a bottleneck. Lock-free queues using compare-and-swap (CAS) operations provide better scalability under contention.

- **Bounded vs. unbounded.** Bounded queues (fixed capacity) provide backpressure, preventing memory exhaustion when producers outpace consumers. Unbounded queues are simpler but risk out-of-memory conditions under sustained load.

- **Latency vs. throughput.** Blocking queues favor correctness and simplicity. Non-blocking queues favor throughput and responsiveness. The right choice depends on the application's requirements.

## Queue vs. Stack vs. List

| Property | Queue | Stack | Linked List |
|----------|-------|-------|-------------|
| Order discipline | FIFO | LIFO | No inherent order discipline |
| Primary operations | Enqueue, Dequeue | Push, Pop | Insert, Delete at any position |
| Access pattern | Front only | Top only | Any position |
| Typical use case | Scheduling, BFS | Undo/redo, DFS, expression parsing | General-purpose collection |
| Insertion point | Rear | Top | Any position |
| Removal point | Front | Top | Any position |

## Related

After understanding the queue data structure, several related topics are worth exploring. Study the stack data structure as the complementary LIFO counterpart to the queue. Investigate priority queues and heaps for scenarios where ordering by priority replaces ordering by arrival time. Learn breadth-first search and depth-first search to see how queues and stacks respectively drive graph traversal. Explore producer-consumer patterns and concurrency primitives such as semaphores and monitors, which rely heavily on blocking queues. Finally, examine message queues in distributed systems (such as RabbitMQ, Apache Kafka, and Amazon SQS) to see how the queue abstraction scales to networked, multi-service architectures.

## Summary

The queue data structure enforces First-In-First-Out ordering, making it the right choice whenever elements must be processed in the order they arrive. Its core operations (enqueue, dequeue, peek, isEmpty, and size) all run in constant time with a proper implementation. Circular arrays and linked lists are the two most practical implementation strategies, balancing memory efficiency against dynamic sizing. Variants such as deques, priority queues, blocking queues, and concurrent queues extend the basic concept to meet specialized requirements. Queues are foundational to task scheduling, graph algorithms, request handling, buffering, and event-driven programming, making them one of the most widely used data structures in professional software development.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press. Chapter 10: Elementary Data Structures.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Section 1.3: Bags, Queues, and Stacks.
- Knuth, D. E. (1997). *The Art of Computer Programming, Volume 1: Fundamental Algorithms* (3rd ed.). Addison-Wesley. Section 2.2.1: Stacks, Queues, and Deques.
- Herlihy, M., & Shavit, N. (2012). *The Art of Multiprocessor Programming* (Revised 1st ed.). Morgan Kaufmann. Chapters on concurrent queues and lock-free data structures.
- Wikipedia contributors. "Queue (abstract data type)." *Wikipedia, The Free Encyclopedia*. https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
