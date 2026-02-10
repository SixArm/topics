# Garbage collection

Garbage collection (GC) is a form of automatic memory management used in computer science and software engineering. It refers to the process by which a runtime system identifies memory that has been allocated but is no longer referenced or needed by a running program, and reclaims that memory for future use. Garbage collection eliminates entire classes of bugs related to manual memory management, such as dangling pointers, double-free errors, and memory leaks, making it a foundational feature of many modern programming languages including Java, C#, Python, Go, and JavaScript.

## Why garbage collection matters

In any program that allocates memory dynamically, there must be a mechanism to release that memory when it is no longer needed. Without such a mechanism, a program will gradually consume more and more memory, a condition known as a memory leak. In long-running systems such as web servers, databases, and embedded controllers, memory leaks can eventually exhaust available resources and cause crashes or degraded performance. Garbage collection addresses this problem systematically by automating the detection and reclamation of unused memory, freeing developers from the error-prone task of managing memory lifetimes manually.

## Manual memory management versus automatic garbage collection

Before garbage collection became widespread, developers were responsible for explicitly allocating and freeing memory. Languages like C and C++ require the programmer to call functions such as `malloc`/`free` or `new`/`delete`. While this gives fine-grained control, it introduces significant risk.

| Aspect | Manual memory management | Automatic garbage collection |
|---|---|---|
| Languages | C, C++, Rust (ownership model) | Java, C#, Python, Go, JavaScript |
| Developer burden | High: must track all allocations | Low: runtime handles reclamation |
| Common bugs | Dangling pointers, double-free, leaks | Largely eliminated |
| Performance control | Predictable, deterministic | May introduce pauses |
| Throughput overhead | Minimal runtime cost | GC cycles consume CPU time |
| Safety | Prone to undefined behavior | Safer by default |

Rust occupies a unique middle ground: it uses an ownership and borrowing system enforced at compile time, achieving memory safety without a garbage collector and without manual deallocation calls.

## Core concepts

Understanding garbage collection requires familiarity with several foundational ideas:

- **Heap allocation**: Memory allocated at runtime on the heap persists until explicitly freed or collected. Stack-allocated memory, by contrast, is automatically reclaimed when a function returns.
- **Object graph**: The set of all live objects and their references to one another forms a directed graph. The garbage collector traverses this graph to determine what is still in use.
- **Roots**: GC roots are the starting points for reachability analysis. They typically include local variables on the call stack, global variables, CPU registers, and static fields.
- **Reachability**: An object is considered live if there exists any chain of references from a root to that object. Objects that are not reachable from any root are garbage and eligible for collection.
- **Finalization**: Some languages allow objects to define finalizers or destructors that run before the object's memory is reclaimed, enabling cleanup of external resources such as file handles or network connections.

## Major garbage collection algorithms

Several algorithms have been developed over the decades, each with different trade-offs in throughput, latency, and memory overhead.

### Reference counting

Reference counting maintains a count of how many references point to each object. When the count drops to zero, the object is immediately freed. This approach is used by CPython and Objective-C (with ARC). Its primary weakness is that it cannot collect cyclic references without supplementary cycle detection. It also incurs overhead on every reference assignment.

### Mark-and-sweep

Mark-and-sweep is a tracing collector that operates in two phases. In the mark phase, the collector traverses all reachable objects starting from the roots and marks them as live. In the sweep phase, it scans the entire heap and frees any object that was not marked. This algorithm handles cycles naturally but requires a pause during collection and can lead to heap fragmentation.

### Mark-and-compact

Mark-and-compact extends mark-and-sweep by adding a compaction step after sweeping. Live objects are relocated to form a contiguous block of memory, eliminating fragmentation and improving allocation speed. The cost is the additional time spent moving objects and updating references.

### Copying collector

A copying collector divides the heap into two semi-spaces. Objects are allocated in one space, and when collection occurs, all live objects are copied to the other space. The old space is then considered free. This approach eliminates fragmentation and has fast allocation (simple pointer bump), but it requires double the memory and the cost of copying live objects.

### Generational collection

Generational garbage collection exploits the empirical observation known as the generational hypothesis: most objects die young. The heap is divided into generations, typically young and old. New objects are allocated in the young generation, which is collected frequently and cheaply. Objects that survive multiple young-generation collections are promoted to the old generation, which is collected less often. Most production garbage collectors, including those in the JVM, .NET CLR, and V8, use generational strategies.

| Algorithm | Handles cycles | Fragmentation | Pause behavior | Memory overhead |
|---|---|---|---|---|
| Reference counting | No (without cycle detection) | Low | Incremental, no major pauses | Per-object count field |
| Mark-and-sweep | Yes | Can fragment | Stop-the-world pauses | Bitmap or mark bits |
| Mark-and-compact | Yes | None after compaction | Longer pauses than mark-sweep | Forwarding addresses |
| Copying collector | Yes | None | Stop-the-world pauses | Requires double memory |
| Generational | Yes | Varies by sub-algorithm | Short young-gen pauses | Write barrier overhead |

## Concurrent and incremental collection

Traditional stop-the-world collectors pause all application threads during collection, which is unacceptable for latency-sensitive systems. Modern collectors address this through several strategies:

- **Incremental collection**: The collector does its work in small steps interleaved with application execution, bounding pause times.
- **Concurrent collection**: GC work runs on separate threads simultaneously with the application. This requires careful synchronization and write barriers to track reference mutations that occur during collection.
- **Mostly concurrent**: A hybrid approach where most GC work is concurrent but brief stop-the-world pauses are still required for certain phases such as root scanning.

Notable implementations include the G1 (Garbage-First) and ZGC collectors in the JVM, the Shenandoah collector, and the concurrent mark-sweep collector in Go. ZGC and Shenandoah target sub-millisecond pause times even on very large heaps.

## Garbage collection triggers

Garbage collection does not run continuously. It is triggered by specific conditions:

- **Allocation failure**: The most common trigger occurs when there is insufficient free memory to satisfy an allocation request.
- **Threshold-based**: The collector activates when the heap occupancy or the number of allocated objects exceeds a configured threshold.
- **Time-based**: Some systems trigger collection after a fixed time interval.
- **Explicit invocation**: Languages like Java expose methods such as `System.gc()` to suggest collection, though the runtime is not obligated to comply.
- **Generational promotion**: A young-generation collection may trigger an old-generation collection if promotion rates are high.

## Performance considerations

Garbage collection involves inherent trade-offs that engineers must understand and manage:

- **Throughput versus latency**: Throughput-oriented collectors maximize the fraction of time spent on application work but may introduce longer pauses. Latency-oriented collectors minimize pause times at the cost of reduced throughput.
- **Heap sizing**: A larger heap reduces collection frequency but increases the time each collection takes. A smaller heap collects more often but each cycle is faster.
- **Allocation rate**: High allocation rates put pressure on the young generation and can trigger frequent collections. Reducing unnecessary allocations is one of the most effective optimizations.
- **Object lifetime**: Objects that live just long enough to be promoted to the old generation but then die quickly are particularly expensive, as they require both a promotion and an old-generation collection.
- **GC tuning**: Production JVM applications routinely tune GC parameters such as heap size, generation ratios, pause-time targets, and collector choice. Tools like GC logs, profilers, and monitoring dashboards are essential for this work.

## Garbage collection in major language runtimes

- **Java (JVM)**: Offers multiple collector implementations including Serial, Parallel, G1, ZGC, and Shenandoah. G1 is the default in recent JDK versions. ZGC provides sub-millisecond pauses for heaps up to terabytes.
- **C# (.NET)**: Uses a generational, compacting collector with three generations (0, 1, 2) plus a large object heap. The workstation and server GC modes offer different trade-offs for client and server applications.
- **Python (CPython)**: Primarily uses reference counting with a supplementary cyclic garbage collector for detecting reference cycles among container objects.
- **Go**: Uses a concurrent, tri-color mark-and-sweep collector optimized for low latency. Go's GC has been progressively improved to achieve sub-millisecond pauses in most workloads.
- **JavaScript (V8)**: Employs a generational collector with a young generation using a copying (Scavenge) algorithm and an old generation using mark-and-compact with incremental and concurrent marking.

## Common pitfalls and best practices

Even with garbage collection, developers can still encounter memory-related problems:

- **Unintentional object retention**: Holding references to objects that are no longer needed, such as in caches, listeners, or static collections, prevents the collector from reclaiming them. This is sometimes called a logical memory leak.
- **Finalizer abuse**: Relying on finalizers for critical resource cleanup is unreliable because finalization timing is non-deterministic. Use explicit resource management patterns such as try-with-resources in Java or using statements in C#.
- **Excessive allocation**: Creating large numbers of short-lived objects increases GC pressure. Object pooling, value types, and allocation-aware design can mitigate this.
- **Large object fragmentation**: In runtimes like .NET, large objects are allocated on a separate heap that is not compacted by default, which can lead to fragmentation over time.
- **GC-unfriendly data structures**: Very large arrays or deeply nested object graphs can make GC pauses longer. Consider data structure choices with GC behavior in mind.

## Related

Related topics to explore include memory management fundamentals, memory allocation strategies such as slab allocation and buddy systems, the ownership and borrowing model in Rust, weak references and soft references, memory profiling and leak detection tools, real-time garbage collection for embedded and safety-critical systems, and the design of virtual machines and language runtimes that host garbage collectors.

## Summary

Garbage collection is an automatic memory management technique that identifies and reclaims memory no longer reachable by a running program. It eliminates common manual memory management bugs such as dangling pointers and memory leaks, at the cost of runtime overhead and occasional pauses. Major algorithms include reference counting, mark-and-sweep, mark-and-compact, copying collection, and generational collection, with modern runtimes combining these into sophisticated concurrent and incremental collectors. Understanding how garbage collection works, what triggers it, and how to tune it is essential for building performant, reliable software systems.

## References

- Jones, R., Hosking, A., & Moss, E. (2011). *The Garbage Collection Handbook: The Art of Automatic Memory Management*. Chapman & Hall/CRC.
- McCarthy, J. (1960). "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I." *Communications of the ACM*, 3(4), 184-195.
- Oracle. "Java Garbage Collection Basics." Java Documentation. https://docs.oracle.com/en/java/javase/
- Microsoft. ".NET Fundamentals: Garbage Collection." .NET Documentation. https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/
- The Go Authors. "A Guide to the Go Garbage Collector." Go Documentation. https://tip.golang.org/doc/gc-guide
- Bacon, D.F., Cheng, P., & Rajan, V.T. (2004). "A Unified Theory of Garbage Collection." *ACM SIGPLAN Notices*, 39(10), 50-68.
