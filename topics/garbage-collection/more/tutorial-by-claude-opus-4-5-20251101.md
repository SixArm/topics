# Garbage Collection

## Introduction

Garbage collection (GC) is an automatic memory management technique that identifies and reclaims memory no longer in use by a program. Rather than requiring developers to manually free memory, garbage collectors track object lifetimes and deallocate unreachable objects automatically. This prevents memory leaks, reduces programming errors, and simplifies application development.

Garbage collection originated in the 1959 Lisp programming language and has since become fundamental to most modern languages including Java, C#, Python, JavaScript, Go, and Ruby.

## Why Garbage Collection Matters

Memory management errors are among the most common and dangerous bugs in software:

- **Memory leaks** occur when allocated memory is never freed, causing applications to consume increasing amounts of RAM until they crash or slow dramatically
- **Dangling pointers** happen when memory is freed while still being referenced, leading to unpredictable behavior or security vulnerabilities
- **Double-free errors** occur when the same memory is deallocated twice, corrupting memory allocators and creating exploitable conditions

Garbage collection eliminates these entire categories of bugs by automating the deallocation decision.

## Manual vs. Automatic Memory Management

| Aspect | Manual (C/C++) | Automatic (GC Languages) |
|--------|----------------|--------------------------|
| Developer responsibility | Must track and free all allocations | Runtime handles deallocation |
| Error potential | High (leaks, dangling pointers, double-free) | Low (GC prevents common errors) |
| Performance predictability | High (developer controls timing) | Variable (GC pauses possible) |
| Runtime overhead | None | CPU cycles spent on collection |
| Memory efficiency | Potentially optimal | Some overhead for tracking |
| Development speed | Slower (manual bookkeeping) | Faster (focus on logic) |

## Core Concepts

### Reachability Analysis

The foundation of garbage collection is determining which objects are still needed. An object is considered **reachable** if:

- It is referenced by a **root** (global variables, stack variables, CPU registers)
- It is referenced by another reachable object

Objects that cannot be reached through any chain of references from roots are unreachable and therefore garbage. This is a conservative approach—an object might be reachable but never actually used again, but the collector cannot know this.

### Object Graphs

Memory forms a directed graph where objects are nodes and references are edges. Garbage collection traverses this graph starting from roots to identify live objects. Everything not visited during traversal is garbage.

### Heap Organization

The heap is the memory region where dynamically allocated objects reside. Garbage collectors organize the heap in various ways:

- **Single continuous heap** with free lists tracking available space
- **Generational heaps** divided by object age
- **Region-based heaps** partitioned into fixed-size blocks

## Garbage Collection Algorithms

### Reference Counting

Each object maintains a count of how many references point to it. When a reference is created, the count increments; when destroyed, it decrements. Objects with zero references are immediately freed.

**Advantages:**
- Immediate reclamation when objects become unreachable
- Predictable, incremental overhead spread across program execution
- Simple to implement

**Disadvantages:**
- Cannot collect cyclic references (A references B, B references A, nothing else references either)
- Counter updates add overhead to every pointer assignment
- Counter storage increases object size

**Used by:** Python (with cycle detection), Swift (ARC), Objective-C (ARC), PHP

### Mark-and-Sweep

Collection occurs in two phases:

1. **Mark phase**: Starting from roots, traverse all reachable objects and mark them as live
2. **Sweep phase**: Scan entire heap, freeing all unmarked objects

**Advantages:**
- Handles cyclic references correctly
- No overhead on pointer assignments
- Collects all garbage

**Disadvantages:**
- Requires stopping the program (stop-the-world pause)
- Must traverse entire heap during sweep
- Causes memory fragmentation

### Mark-and-Compact

Similar to mark-and-sweep but adds a third phase that moves live objects together, eliminating fragmentation. After compaction, allocation becomes a simple pointer bump.

**Advantages:**
- Eliminates fragmentation
- Fast allocation (just increment a pointer)
- Better cache locality

**Disadvantages:**
- Longer pauses due to object movement
- Must update all pointers to moved objects
- More complex implementation

### Copying Collection

Divides heap into two equal-sized semispaces. Objects are allocated in one semispace until full, then live objects are copied to the other semispace. The original semispace is then considered empty.

**Advantages:**
- Compacts automatically during copying
- Only touches live objects (efficient if most objects are garbage)
- Simple, fast allocation

**Disadvantages:**
- Halves available heap space
- Copies all live objects every collection
- Poor performance if survival rate is high

### Generational Collection

Based on the **generational hypothesis**: most objects die young. The heap is divided into generations:

- **Young generation (nursery)**: Where new objects are allocated; collected frequently
- **Old generation (tenured)**: Objects that survive multiple young collections; collected rarely

Objects that survive young generation collections are **promoted** to the old generation.

**Advantages:**
- Most collections only process the young generation (fast)
- Optimizes for common case of short-lived objects
- Reduces overall GC overhead

**Disadvantages:**
- Cross-generational references require tracking (write barriers)
- Promotion decisions affect performance
- More complex implementation

**Used by:** Java, .NET CLR, V8 (JavaScript), Ruby

## GC Implementation Strategies

### Stop-the-World Collection

The simplest approach: halt all application threads during collection. This ensures the object graph doesn't change during traversal.

- **Pro**: Simpler implementation, no synchronization needed
- **Con**: Application freezes during collection (latency spikes)

### Incremental Collection

Breaks collection work into small chunks interleaved with application execution. Maintains invariants using **write barriers** that track modifications during collection.

- **Pro**: Shorter individual pauses
- **Con**: Overall higher overhead, complexity

### Concurrent Collection

Collector runs on separate threads simultaneously with the application. Requires careful synchronization to handle mutations during collection.

- **Pro**: Minimal application pauses
- **Con**: Complex synchronization, CPU overhead

### Parallel Collection

Uses multiple threads to perform collection work faster. Application is still stopped, but pause duration is reduced.

- **Pro**: Faster collection, shorter pauses
- **Con**: Uses CPU cores during collection

## Garbage Collection in Major Languages

| Language | Primary Algorithm | Notable Features |
|----------|-------------------|------------------|
| Java (HotSpot) | Generational with multiple collectors (G1, ZGC, Shenandoah) | Tunable collectors, low-pause options |
| C# (.NET) | Generational, concurrent | Server/workstation modes, large object heap |
| Python | Reference counting + generational cycle collector | Reference counting for immediacy, cycle detection for completeness |
| JavaScript (V8) | Generational (Scavenger + Mark-Compact) | Incremental marking, concurrent sweeping |
| Go | Concurrent tri-color mark-and-sweep | Sub-millisecond pauses, no generational collection |
| Ruby | Generational mark-and-sweep | Incremental marking since Ruby 2.2 |
| Rust | None (ownership system) | Compile-time memory management, optional Rc/Arc |

## Performance Considerations

### Throughput vs. Latency

Garbage collectors make tradeoffs between:

- **Throughput**: Total work completed over time (favors infrequent, batch collection)
- **Latency**: Maximum pause duration (favors frequent, incremental collection)

Applications have different priorities:

- **Batch processing**: Optimize throughput (tolerate pauses)
- **Interactive applications**: Balance throughput and latency
- **Real-time systems**: Minimize maximum latency

### Memory Footprint

More heap space generally means:

- Less frequent collection (better throughput)
- Longer individual collections (worse latency if stop-the-world)
- Higher memory consumption

### GC Tuning Parameters

Common tunable parameters include:

- Heap size (initial and maximum)
- Generation sizes and ratios
- Collection thresholds and triggers
- Number of GC threads
- Pause time goals

## Best Practices for GC-Managed Languages

**Reduce allocation rate:**
- Reuse objects where practical
- Use object pools for frequently created/destroyed objects
- Prefer primitives over boxed types when possible

**Avoid premature promotion:**
- Keep short-lived objects short-lived
- Avoid storing young objects in long-lived data structures unnecessarily

**Minimize reference complexity:**
- Simpler object graphs traverse faster
- Clear references to large objects when done

**Monitor and profile:**
- Enable GC logging to understand behavior
- Use profilers to identify allocation hotspots
- Track pause times and collection frequency

## Limitations and Tradeoffs

Garbage collection is not a perfect solution:

- **Non-deterministic timing**: Cannot guarantee when memory is freed
- **Resource leaks**: GC only manages memory—file handles, sockets, and other resources still need explicit cleanup
- **Performance overhead**: CPU time spent on collection
- **Memory overhead**: Tracking structures and delayed reclamation increase footprint
- **Pause times**: Even advanced collectors can pause briefly

For these reasons, some domains (operating systems, embedded systems, game engines, high-frequency trading) often prefer manual memory management or languages like Rust that provide memory safety without garbage collection.

## Summary

Garbage collection automates the complex task of memory deallocation, eliminating entire categories of bugs while allowing developers to focus on application logic. Modern collectors use sophisticated algorithms—generational collection, concurrent marking, incremental processing—to minimize performance impact.

Understanding how garbage collection works helps developers write more efficient code, tune collector behavior for their workloads, and make informed decisions about language and runtime selection. While GC introduces overhead and unpredictability, for most applications the productivity gains and safety improvements far outweigh these costs.
