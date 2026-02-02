# Scheduling algorithms

Question: Which CPU scheduling algorithm assigns each process a fixed time slice and cycles through the queue, moving processes that don't complete within their slice to the back?

- [ ] Shortest Job First (SJF)
- [ ] Priority Scheduling
- [ ] Round Robin (RR)
- [ ] First-Come, First-Served (FCFS)

<details>
  <summary>Answer</summary>
  <p>Round Robin (RR)</p>
  <p>Round Robin scheduling gives each process a fixed time quantum in a cyclic order. If a process doesn't complete execution within its allocated time slice, it is preempted and moved to the back of the queue, allowing other processes to execute. This approach ensures fair CPU time distribution and prevents any single process from monopolizing the CPU, making it particularly effective for time-sharing systems.</p>
</details>
