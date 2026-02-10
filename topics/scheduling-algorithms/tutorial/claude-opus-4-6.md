# Scheduling algorithms

Scheduling algorithms are methods used to determine the order in which tasks, processes, or requests are executed across computing systems. They are foundational to operating system design, database management, distributed computing, and real-time systems. Every time a CPU selects which process to run next, a disk controller decides which I/O request to service, or a job scheduler dispatches work across a cluster, a scheduling algorithm governs that decision. The choice of algorithm directly impacts throughput, latency, fairness, and resource utilization, making scheduling one of the most consequential design decisions in any system that manages concurrent workloads.

## Core concepts

Scheduling algorithms are evaluated along several dimensions that often involve trade-offs. Understanding these concepts is essential before comparing specific algorithms.

- **Throughput** measures how many tasks or processes complete per unit of time. Higher throughput means the system is doing more useful work.
- **Turnaround time** is the total elapsed time from when a task is submitted to when it finishes, including any time spent waiting.
- **Waiting time** is the total time a task spends in a ready queue before it actually receives CPU or resource access.
- **Response time** is the time from submission until the task produces its first output, which is critical for interactive systems.
- **Fairness** refers to whether all tasks receive a reasonable share of resources, preventing starvation of lower-priority work.
- **Preemption** is the ability of the scheduler to interrupt a running task and assign the resource to another task. Preemptive schedulers offer better responsiveness but introduce context-switching overhead.
- **Starvation** occurs when a task is perpetually denied access to a resource because higher-priority or shorter tasks continually take precedence.

## CPU scheduling algorithms

CPU scheduling is the most widely studied category. The operating system kernel's scheduler determines which process or thread occupies the processor at any given moment.

**First-Come, First-Served (FCFS)** executes processes strictly in the order they arrive in the ready queue. It is non-preemptive and simple to implement but suffers from the convoy effect, where a single long-running process delays all subsequent processes, inflating average waiting time.

**Shortest Job First (SJF)** selects the process with the shortest expected execution time. In its non-preemptive form, once a process begins it runs to completion. The preemptive variant, known as Shortest Remaining Time First (SRTF), re-evaluates whenever a new process arrives and switches to the one with the least remaining time. SJF is provably optimal for minimizing average waiting time but requires advance knowledge of burst durations, which is rarely available in practice. It also risks starving long processes.

**Round Robin (RR)** assigns each process a fixed time quantum and cycles through the ready queue. When a process exhausts its quantum, it moves to the back of the queue. Round Robin provides good responsiveness for interactive workloads and ensures no process is starved. Performance depends heavily on the quantum size: too small causes excessive context switches, too large degrades to FCFS behavior.

**Priority Scheduling** assigns a numeric priority to each process and always runs the highest-priority process available. Priorities can be assigned statically (at creation) or dynamically (adjusted at runtime). The main risk is starvation of low-priority processes, which is commonly addressed through aging, a technique that gradually increases the priority of waiting processes.

**Multilevel Queue Scheduling** partitions processes into separate queues based on characteristics such as process type (foreground interactive, background batch). Each queue has its own scheduling algorithm, and the queues themselves are scheduled relative to one another, typically with fixed priority between queues.

**Multilevel Feedback Queue Scheduling** extends the multilevel queue model by allowing processes to move between queues based on their observed behavior. A CPU-bound process that uses its full quantum may be demoted to a lower-priority queue, while an I/O-bound process that frequently yields may be promoted. This adaptive approach is used by most modern general-purpose operating systems and provides a good balance of responsiveness and throughput without requiring advance knowledge of process behavior.

| Algorithm | Preemptive | Optimal Waiting Time | Starvation Risk | Best For |
|---|---|---|---|---|
| FCFS | No | No | No | Simple batch workloads |
| SJF / SRTF | Optional | Yes (theoretical) | Yes | Known short jobs |
| Round Robin | Yes | No | No | Interactive systems |
| Priority | Optional | No | Yes (without aging) | Mixed-priority workloads |
| Multilevel Queue | Varies | No | Possible | Classified process types |
| Multilevel Feedback Queue | Yes | No | No (with aging) | General-purpose OS kernels |

## Disk scheduling algorithms

Disk scheduling governs the order in which I/O requests are serviced. Because mechanical disk seeks are expensive in time, the goal is to minimize total head movement. Even with solid-state drives reducing seek penalties, these algorithms remain relevant for understanding I/O subsystem design and for systems that still use spinning media.

**First-Come, First-Served (FCFS)** services requests in arrival order. It is fair and simple but can produce large total seek distances when requests are scattered across the disk.

**Shortest Seek Time First (SSTF)** selects the pending request closest to the current head position. It reduces average seek time compared to FCFS but can starve requests at the far edges of the disk if new nearby requests keep arriving.

**SCAN (Elevator)** moves the disk head in one direction, servicing all pending requests along the way, until it reaches the end of the disk, then reverses direction. This provides more uniform service than SSTF and prevents starvation, though requests just behind the head's current direction must wait for a full sweep.

**C-SCAN (Circular SCAN)** moves the head in one direction only. When it reaches the end, it jumps back to the beginning without servicing requests on the return trip, then resumes scanning. This provides more uniform wait times than SCAN because requests near the beginning of the disk are not penalized by the head's return sweep.

**LOOK and C-LOOK** are practical variants of SCAN and C-SCAN that reverse direction (or jump back) at the last pending request rather than traveling to the physical end of the disk, eliminating unnecessary movement.

| Algorithm | Seek Optimization | Starvation Risk | Uniformity of Wait |
|---|---|---|---|
| FCFS | None | No | Poor |
| SSTF | Local minimum | Yes | Moderate |
| SCAN | Good | No | Moderate |
| C-SCAN | Good | No | High |
| LOOK / C-LOOK | Good | No | High |

## Task and job scheduling

Beyond CPU and disk contexts, scheduling algorithms manage higher-level workloads such as batch jobs, distributed tasks, and real-time operations.

**Fair Share Scheduling** allocates resources proportionally based on user-defined shares or group quotas. Rather than treating all tasks equally, it ensures that each user or group receives its designated fraction of system capacity. This approach is common in multi-tenant environments and cluster resource managers such as YARN and Kubernetes.

**Deadline-Based Scheduling** prioritizes tasks according to their deadlines. The two classic algorithms are Earliest Deadline First (EDF), which always runs the task with the nearest deadline, and Rate-Monotonic Scheduling (RMS), which assigns static priorities based on task frequency. EDF is optimal for uniprocessor systems when the total utilization is at or below 100%, while RMS guarantees schedulability when utilization stays below approximately 69% (the Liu-Layland bound). These algorithms are essential in hard real-time systems such as avionics, industrial control, and medical devices, where missing a deadline constitutes a system failure.

**Gang Scheduling** co-schedules related threads or processes across multiple processors simultaneously. This is important for parallel applications where threads frequently synchronize; running them at the same time reduces synchronization wait and context-switch waste.

**Lottery Scheduling** assigns lottery tickets to tasks in proportion to their desired share of resources. The scheduler draws a random ticket to select the next task to run. This probabilistic approach provides proportional sharing with very low overhead and adapts naturally to dynamic workloads.

**Work Stealing** is a decentralized approach used in parallel runtime systems (such as Cilk, Go, and Java's ForkJoinPool). Each processor maintains a local queue of tasks. When a processor's queue is empty, it steals tasks from the queue of another processor. This achieves good load balancing with minimal coordination overhead.

## Choosing a scheduling algorithm

The right algorithm depends on the system's goals and constraints.

- For **batch processing** where turnaround time matters most, SJF or its approximations minimize average completion time.
- For **interactive systems** where response time is critical, Round Robin or Multilevel Feedback Queue provides consistent responsiveness.
- For **real-time systems** where deadlines are non-negotiable, EDF or RMS provides the formal guarantees required.
- For **multi-tenant environments** where fairness across users matters, Fair Share Scheduling or Lottery Scheduling ensures proportional resource allocation.
- For **parallel workloads** that require load balancing across cores, Work Stealing or Gang Scheduling reduces idle time and synchronization overhead.

In practice, production systems often combine multiple approaches. Linux's Completely Fair Scheduler (CFS) uses a red-black tree to approximate ideal fair scheduling with O(log n) complexity. Windows uses a multilevel feedback queue with dynamic priority boosting. Cloud orchestrators like Kubernetes layer bin-packing, affinity rules, and priority classes on top of fundamental scheduling principles.

## Related

Topics to explore next include process management and context switching for deeper understanding of how schedulers interact with the CPU; concurrency and parallelism for the programming models that generate schedulable work; real-time operating systems for deadline-driven scheduling in embedded and safety-critical contexts; distributed systems and consensus algorithms for scheduling across networked nodes; queueing theory for the mathematical foundations underlying scheduling analysis; and load balancing algorithms for distributing work across servers and network infrastructure.

## Summary

Scheduling algorithms are essential mechanisms for managing how computing resources are allocated among competing tasks. From CPU scheduling in operating system kernels to disk I/O optimization to distributed job orchestration, these algorithms balance competing objectives of throughput, latency, fairness, and deadline adherence. Simple algorithms like FCFS provide baseline behavior, while adaptive approaches like Multilevel Feedback Queues and Work Stealing handle the complexity of real-world workloads. Understanding scheduling fundamentals equips technology professionals to make informed decisions about system configuration, capacity planning, and performance tuning across every layer of the computing stack.

## References

- Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). *Operating System Concepts* (10th ed.). Wiley. The standard reference for CPU and disk scheduling algorithms.
- Tanenbaum, A. S., & Bos, H. (2014). *Modern Operating Systems* (4th ed.). Pearson. Comprehensive coverage of scheduling in the context of OS design.
- Liu, C. L., & Layland, J. W. (1973). "Scheduling Algorithms for Multiprogramming in a Hard-Real-Time Environment." *Journal of the ACM*, 20(1), 46–61. The foundational paper on Rate-Monotonic and Earliest Deadline First scheduling.
- Waldspurger, C. A., & Weihl, W. E. (1994). "Lottery Scheduling: Flexible Proportional-Share Resource Management." *Proceedings of the 1st USENIX OSDI*. Introduces lottery-based probabilistic scheduling.
- Blumofe, R. D., & Leiserson, C. E. (1999). "Scheduling Multithreaded Computations by Work Stealing." *Journal of the ACM*, 46(5), 720–748. The theoretical basis for work-stealing schedulers.
- Linux kernel documentation on CFS: https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html
