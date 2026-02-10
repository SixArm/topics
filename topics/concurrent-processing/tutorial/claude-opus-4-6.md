# Concurrent processing (concurrency)

Concurrent processing is a computing model in which multiple tasks, processes, or units of work make progress within overlapping time periods. Rather than completing one task entirely before starting the next, a concurrent system interleaves or simultaneously executes work so that several activities are in flight at once. Concurrency is a foundational concept in modern software engineering, underpinning everything from operating system schedulers and web servers to distributed data pipelines and real-time applications. Understanding concurrency—its models, benefits, hazards, and control mechanisms—is essential for any technology professional who builds or operates systems at scale.

## Concurrency versus parallelism

Concurrency and parallelism are related but distinct ideas. Concurrency is about structure: designing a program so that multiple tasks can be in progress at the same time, regardless of whether they physically execute at the same instant. Parallelism is about execution: actually running multiple tasks simultaneously on separate hardware resources such as CPU cores or machines.

| Aspect | Concurrency | Parallelism |
|---|---|---|
| Definition | Multiple tasks making progress in overlapping time periods | Multiple tasks executing at the exact same instant |
| Hardware requirement | Can run on a single core via time-slicing | Requires multiple cores, processors, or machines |
| Primary goal | Responsiveness, structure, and resource utilization | Raw throughput and speed |
| Example | A web server handling thousands of connections on one core | A matrix multiplication split across eight CPU cores |
| Relationship | A program can be concurrent without being parallel | Parallelism implies concurrency |

A single-core machine can achieve concurrency through rapid context switching, giving the illusion of simultaneous execution. True parallelism requires multiple physical execution units. In practice, most modern concurrent systems exploit both: they are structured for concurrency and deployed on parallel hardware.

## Techniques for achieving concurrency

Concurrency can be realized through several complementary techniques, each suited to different problem domains and hardware environments.

- **Multitasking.** The operating system scheduler rapidly switches a single processor among multiple processes, giving each a time slice. Preemptive multitasking allows the OS to interrupt a running process, while cooperative multitasking relies on processes voluntarily yielding control.
- **Multithreading.** Multiple threads of execution share the same process address space. Threads are lighter weight than processes and can communicate through shared memory, making them efficient for tasks that need frequent data exchange. Most modern languages and runtimes provide threading primitives.
- **Multiprocessing.** Multiple independent processes, each with its own memory space, run on separate CPU cores or processors. Communication occurs via inter-process communication mechanisms such as pipes, shared memory segments, or message passing. This approach provides strong isolation and fault tolerance.
- **Asynchronous I/O and event loops.** A single thread manages many concurrent operations by registering callbacks or using coroutines that yield while waiting for I/O. This model avoids the overhead of thread creation and context switching, and it is the basis of high-performance network servers and frameworks built on event-driven architectures.
- **Distributed computing.** Work is divided among multiple machines connected over a network. Each node operates independently, and coordination happens through message passing, consensus protocols, or distributed shared state. This technique scales horizontally and is used in large-scale data processing, microservices, and cloud-native architectures.

| Technique | Scope | Communication model | Typical use case |
|---|---|---|---|
| Multitasking | Single processor | OS-managed switching | Desktop operating systems |
| Multithreading | Single process | Shared memory | Application-level parallelism |
| Multiprocessing | Multiple processes | IPC, message passing | CPU-bound workloads, fault isolation |
| Async I/O / event loops | Single thread | Callbacks, coroutines | I/O-bound servers, network services |
| Distributed computing | Multiple machines | Network messages, RPC | Large-scale data processing, microservices |

## Concurrency hazards

Concurrent systems introduce categories of bugs that do not exist in sequential programs. These hazards arise from the nondeterministic interleaving of operations on shared state.

- **Race condition.** Two or more threads access shared data simultaneously, and the final result depends on the unpredictable order of execution. Race conditions produce intermittent, hard-to-reproduce bugs.
- **Deadlock.** Two or more tasks each hold a resource the other needs and neither can proceed. The system freezes because each task is waiting indefinitely for the other to release its lock.
- **Livelock.** Tasks continuously change state in response to each other without making any real progress. Unlike deadlock, the tasks are not blocked—they are actively executing but accomplishing nothing.
- **Starvation.** A task is perpetually denied access to a resource because other higher-priority tasks continually acquire it first.
- **Data corruption.** Non-atomic read-modify-write sequences on shared data structures can leave the data in an inconsistent or corrupted state when interrupted by another thread.
- **Priority inversion.** A high-priority task is indirectly blocked by a low-priority task holding a shared resource, while a medium-priority task preempts the low-priority one, further delaying the high-priority task.

## Concurrency control mechanisms

To manage the hazards above, engineers use synchronization primitives and design patterns that coordinate access to shared resources.

- **Mutex (mutual exclusion lock).** Ensures that only one thread at a time can enter a critical section. A thread must acquire the lock before accessing shared data and release it when finished.
- **Semaphore.** A generalized lock that permits a fixed number of concurrent accesses. A binary semaphore acts like a mutex; a counting semaphore controls access to a pool of resources.
- **Monitor.** A higher-level synchronization construct that bundles a mutex with condition variables. Threads can wait on a condition and be notified when the condition changes, enabling producer-consumer and similar patterns.
- **Read-write lock.** Allows multiple concurrent readers but exclusive access for writers. This improves throughput when reads greatly outnumber writes.
- **Atomic operations.** Hardware-supported instructions such as compare-and-swap that complete in a single, uninterruptible step. They enable lock-free and wait-free data structures.
- **Message passing.** Instead of sharing memory, tasks communicate by sending immutable messages through channels or queues. This eliminates shared-state hazards by design and is the foundation of the actor model and CSP (communicating sequential processes).
- **Software transactional memory.** Memory operations are grouped into transactions that either commit atomically or roll back, similar to database transactions. This simplifies reasoning about concurrent state changes.

## Common concurrency models

Different programming languages and frameworks adopt distinct concurrency models, each with trade-offs in complexity, safety, and performance.

| Model | Key idea | Languages / frameworks |
|---|---|---|
| Threads and locks | Shared mutable state protected by explicit locks | Java, C++, C#, Python |
| Actor model | Isolated actors communicate via asynchronous messages | Erlang, Akka, Elixir |
| Communicating sequential processes (CSP) | Goroutines or processes synchronize through typed channels | Go, Clojure core.async |
| Async/await | Coroutines suspend and resume around I/O boundaries | JavaScript, Python asyncio, Rust, C# |
| Functional purity | Immutable data eliminates shared-state hazards | Haskell, Clojure, Erlang |
| Fork-join | A task recursively splits into subtasks that are joined later | Java ForkJoinPool, Cilk |

Choosing a model depends on the nature of the workload (CPU-bound versus I/O-bound), the need for fault tolerance, the language ecosystem, and team familiarity.

## Practical applications

Concurrent processing is not an academic curiosity; it is a daily engineering concern across many domains.

- **Web servers and API gateways.** Handle thousands of simultaneous client connections using thread pools, event loops, or a combination of both.
- **Database systems.** Use concurrency control (MVCC, two-phase locking) to allow multiple transactions to read and write data without corruption.
- **Scientific and numerical computing.** Distribute large simulations, finite element analyses, and genomic computations across many cores or cluster nodes.
- **Financial systems.** Process high-frequency trading events, risk calculations, and real-time market data feeds concurrently.
- **Video and media processing.** Encode, transcode, and stream media by splitting frames or segments across parallel pipelines.
- **Operating systems.** The kernel itself is a concurrent program, scheduling processes, servicing interrupts, and managing device I/O simultaneously.
- **User interfaces.** Keep the UI responsive by offloading computation and network requests to background threads or async tasks.

## Best practices

Building reliable concurrent systems requires deliberate design and disciplined engineering.

- Prefer higher-level abstractions (channels, actors, async/await) over raw threads and locks whenever possible.
- Minimize shared mutable state. The less state that is shared, the fewer synchronization problems arise.
- Keep critical sections as short as possible to reduce contention and the window for deadlocks.
- Establish and enforce a consistent lock ordering to prevent deadlock cycles.
- Use immutable data structures where feasible; immutable data is inherently thread-safe.
- Design for idempotency so that retries after failures do not produce incorrect results.
- Test with concurrency-aware tools such as thread sanitizers, model checkers, and stress tests that amplify nondeterministic scheduling.
- Instrument and monitor lock contention, queue depths, and thread pool utilization in production.

## Related

Related topics to explore next include asynchronous processing, which focuses on non-blocking execution patterns; distributed computing architectures and consensus algorithms; event-driven architecture for reactive system design; message queues and their role in decoupling concurrent components; the actor model as practiced in Erlang/OTP and Akka; parallel processing and GPU computing for compute-intensive workloads; database transaction isolation levels and MVCC; and operating system process scheduling and memory management.

## Summary

Concurrent processing enables multiple tasks to make progress within overlapping time periods, improving responsiveness, throughput, and resource utilization across virtually every category of modern software. It can be achieved through multitasking, multithreading, multiprocessing, asynchronous I/O, and distributed computing, each with distinct trade-offs. The price of concurrency is complexity: race conditions, deadlocks, livelocks, and data corruption are ever-present risks that must be managed through synchronization primitives, careful architectural choices, and rigorous testing. By selecting appropriate concurrency models, minimizing shared mutable state, and applying disciplined engineering practices, technology professionals can build systems that are both highly concurrent and reliably correct.

## References

- Herlihy, M. and Shavit, N. *The Art of Multiprocessor Programming*. Morgan Kaufmann, 2012.
- Goetz, B. et al. *Java Concurrency in Practice*. Addison-Wesley, 2006.
- Ben-Ari, M. *Principles of Concurrent and Distributed Programming*. Addison-Wesley, 2006.
- Pike, R. "Concurrency Is Not Parallelism." Talk at Heroku's Waza conference, 2012. https://go.dev/blog/waza-talk
- Hewitt, C., Bishop, P., and Steiger, R. "A Universal Modular ACTOR Formalism for Artificial Intelligence." *IJCAI*, 1973.
- Hoare, C.A.R. "Communicating Sequential Processes." *Communications of the ACM*, 21(8), 1978.
- Lamport, L. "Time, Clocks, and the Ordering of Events in a Distributed System." *Communications of the ACM*, 21(7), 1978.
- Armstrong, J. "Making Reliable Distributed Systems in the Presence of Software Errors." PhD thesis, Royal Institute of Technology, Stockholm, 2003.
