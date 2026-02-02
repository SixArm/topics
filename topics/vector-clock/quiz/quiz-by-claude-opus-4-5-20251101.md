# Vector clock

Question: What is the primary advantage of using vector clocks in distributed systems compared to other synchronization techniques?

- [ ] They require all nodes to synchronize with a central master clock
- [ ] They provide total ordering of all events across all processes
- [ ] They eliminate the need for global time synchronization by using logical clocks based on local events
- [ ] They reduce network bandwidth by compressing event timestamps

<details>
  <summary>Answer</summary>
  <p>They eliminate the need for global time synchronization by using logical clocks based on local events</p>
  <p>Vector clocks rely on logical clocks that are based on local events rather than requiring global time synchronization among nodes. This makes vector clocks more robust and scalable than synchronization techniques that depend on a central clock or require precise time synchronization across all nodes in the distributed system.</p>
</details>
