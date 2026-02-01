## Scheduling Algorithms

Scheduling algorithms determine how computing resources are allocated to tasks, processes, or requests competing for those resources. They form the backbone of operating systems, database management, cloud infrastructure, and real-time systems. Understanding these algorithms is essential for system design, performance tuning, and capacity planning.

## Why Scheduling Matters

Effective scheduling directly impacts:

- **Throughput**: The number of tasks completed per unit time
- **Latency**: How long individual tasks wait before execution
- **Resource utilization**: How efficiently CPU, disk, and memory are used
- **Fairness**: Whether all tasks receive equitable access to resources
- **Predictability**: Whether time-sensitive tasks meet their deadlines

Poor scheduling choices can lead to resource starvation, excessive wait times, and degraded user experience. The right algorithm depends on workload characteristics, system constraints, and business priorities.

## CPU Scheduling Algorithms

CPU scheduling determines which process runs on the processor at any given moment. The operating system's scheduler makes these decisions thousands of times per second.

### First-Come, First-Served (FCFS)

FCFS executes processes in arrival order. It is non-preemptive—once a process starts, it runs to completion.

**Characteristics:**
- Simple to implement using a queue data structure
- No starvation: every process eventually runs
- Suffers from the "convoy effect" where short processes wait behind long ones
- Poor average waiting time for mixed workloads

**Best suited for:** Batch processing systems where simplicity matters more than responsiveness.

### Shortest Job First (SJF)

SJF selects the process with the smallest execution time. It can operate in preemptive mode (Shortest Remaining Time First) or non-preemptive mode.

**Characteristics:**
- Minimizes average waiting time mathematically
- Requires knowing or estimating execution times in advance
- Can cause starvation for long processes if short ones keep arriving
- Preemptive variant offers better responsiveness

**Best suited for:** Batch systems where job durations are known or predictable.

### Round Robin (RR)

Round Robin assigns each process a fixed time quantum. Processes cycle through the ready queue, each receiving equal CPU time before yielding.

**Characteristics:**
- Fair: all processes receive CPU time proportionally
- Responsive: no process waits indefinitely for a turn
- Performance depends heavily on time quantum selection
- Too small a quantum increases context-switching overhead; too large approximates FCFS

**Best suited for:** Time-sharing and interactive systems requiring responsiveness.

### Priority Scheduling

Processes receive priority values. The scheduler always runs the highest-priority ready process.

**Characteristics:**
- Allows differentiation between critical and background tasks
- Can be preemptive (immediate switch on higher priority arrival) or non-preemptive
- Risk of starvation for low-priority processes
- Aging techniques can prevent starvation by gradually increasing priority

**Best suited for:** Systems with clear task importance hierarchies, such as real-time systems.

### Multilevel Queue Scheduling

Processes are permanently assigned to priority-based queues, each with its own scheduling algorithm.

**Characteristics:**
- Separates foreground (interactive) from background (batch) processes
- Each queue can use different algorithms (e.g., RR for interactive, FCFS for batch)
- No movement between queues
- Simple to implement but inflexible

**Best suited for:** Systems with distinct process categories that don't change behavior.

### Multilevel Feedback Queue Scheduling

Extends multilevel queues by allowing processes to move between queues based on observed behavior.

**Characteristics:**
- Adaptive: CPU-bound processes sink to lower-priority queues
- I/O-bound and interactive processes rise to higher-priority queues
- Most flexible general-purpose algorithm
- Complex to configure with multiple parameters

**Best suited for:** General-purpose operating systems (Linux, Windows, macOS all use variants).

### CPU Scheduling Comparison

| Algorithm | Preemptive | Starvation Risk | Complexity | Best For |
|-----------|------------|-----------------|------------|----------|
| FCFS | No | None | Low | Batch processing |
| SJF | Optional | High | Medium | Known job durations |
| Round Robin | Yes | None | Low | Interactive systems |
| Priority | Optional | High | Medium | Differentiated workloads |
| Multilevel Queue | Varies | Medium | Medium | Fixed process categories |
| Multilevel Feedback | Yes | Low | High | General-purpose OS |

## Disk Scheduling Algorithms

Disk scheduling optimizes the order in which I/O requests are serviced, minimizing mechanical seek time on traditional hard drives.

### First-Come, First-Served (FCFS)

Requests are serviced in arrival order without regard to disk head position.

**Characteristics:**
- Fair: no request is prioritized over another
- Can produce large total head movement
- Performance degrades under heavy load

### Shortest Seek Time First (SSTF)

The scheduler selects the request closest to the current head position.

**Characteristics:**
- Reduces total seek time compared to FCFS
- Can starve requests at disk edges
- Does not guarantee optimal total movement

### SCAN (Elevator)

The disk head moves in one direction, servicing all requests until reaching the edge, then reverses.

**Characteristics:**
- Predictable wait times
- Eliminates starvation
- Requests near the middle may wait longer than edge requests
- Named for elevator behavior

### C-SCAN (Circular SCAN)

The head moves in one direction only, jumping back to the start after reaching the end.

**Characteristics:**
- More uniform wait times than SCAN
- Treats the disk as circular
- Slightly higher total movement but fairer service

### LOOK and C-LOOK

Variants of SCAN and C-SCAN that reverse direction at the last request rather than the physical disk edge.

**Characteristics:**
- Eliminates unnecessary movement to disk boundaries
- More efficient than pure SCAN/C-SCAN
- Most practical implementations use LOOK variants

### Disk Scheduling Comparison

| Algorithm | Seek Optimization | Starvation Risk | Uniformity |
|-----------|-------------------|-----------------|------------|
| FCFS | None | None | Variable |
| SSTF | High | High | Variable |
| SCAN | Medium | None | Moderate |
| C-SCAN | Medium | None | High |
| LOOK | High | None | Moderate |

**Note:** Solid-state drives (SSDs) have no mechanical seek time, making disk scheduling algorithms less relevant for flash storage. However, they remain important for systems with spinning disks and for understanding historical system design.

## Task and Job Scheduling

Task scheduling applies beyond operating systems to distributed systems, cloud computing, and workflow orchestration.

### Fair Share Scheduling

Resources are allocated based on predefined shares or quotas per user or group, ensuring equitable distribution regardless of submission patterns.

**Use cases:**
- Multi-tenant cloud environments
- Academic computing clusters
- Enterprise batch processing

### Deadline-Based Scheduling

Tasks declare deadlines, and the scheduler prioritizes those with nearest deadlines. Common variants include Earliest Deadline First (EDF) and Rate Monotonic Scheduling (RMS).

**Characteristics:**
- Critical for real-time systems
- EDF is optimal for single-processor systems if total utilization stays below 100%
- Requires accurate deadline and execution time information
- Missed deadlines may indicate system overload

**Use cases:**
- Industrial control systems
- Multimedia streaming
- Automotive and aerospace systems

### Gang Scheduling

Related processes are scheduled simultaneously across multiple processors, ensuring they can communicate without waiting for each other.

**Use cases:**
- Parallel computing applications
- High-performance computing clusters
- Tightly coupled distributed algorithms

### Work-Stealing

Idle processors "steal" tasks from busy processors' queues, dynamically balancing load.

**Use cases:**
- Modern parallel runtimes (Java ForkJoin, Go scheduler, Rust Rayon)
- Load balancing in heterogeneous environments

## Choosing the Right Algorithm

Consider these factors when selecting or configuring a scheduling algorithm:

| Factor | Recommended Approach |
|--------|---------------------|
| Interactive workload | Round Robin or Multilevel Feedback Queue |
| Batch processing | SJF or FCFS |
| Mixed workloads | Multilevel Feedback Queue with tuning |
| Hard real-time | Deadline-based (EDF, RMS) |
| Multi-tenant | Fair Share with quotas |
| Parallel computing | Gang scheduling or work-stealing |
| Traditional disk I/O | LOOK or C-LOOK |

## Key Metrics for Evaluation

When analyzing or comparing scheduling algorithms, measure:

- **Turnaround time**: Total time from submission to completion
- **Waiting time**: Time spent in ready queue before execution
- **Response time**: Time from submission to first response (critical for interactive systems)
- **CPU utilization**: Percentage of time the CPU is busy
- **Throughput**: Number of processes completed per time unit
- **Fairness index**: How evenly resources are distributed among competing tasks

## Practical Considerations

**Modern operating systems** use hybrid approaches. Linux's Completely Fair Scheduler (CFS) uses a red-black tree to track virtual runtime, approximating ideal fair sharing. Windows uses a priority-based preemptive scheduler with dynamic priority adjustment.

**Cloud schedulers** like Kubernetes use bin-packing algorithms combined with priority and preemption to place containers across nodes. They balance resource requests, affinity rules, and availability constraints.

**Database query schedulers** manage concurrent queries using admission control, priority queuing, and resource governors to prevent any single query from monopolizing system resources.

Understanding scheduling algorithms provides the foundation for diagnosing performance problems, tuning system parameters, and designing efficient distributed systems.
