# Tuple space

Question: What happens when a process retrieves a tuple from a tuple space?

- [ ] The tuple remains in the space and can be retrieved again by the same or other processes
- [ ] The tuple space returns a copy of the matching tuple and removes it from the space
- [ ] The process must establish a direct connection to the process that created the tuple
- [ ] The tuple is converted to a message and sent via synchronous message passing

<details>
  <summary>Answer</summary>
  <p>The tuple space returns a copy of the matching tuple and removes it from the space</p>
  <p>This is a fundamental characteristic of tuple space operations. When a process retrieves a tuple by specifying matching attribute values, the tuple space returns a copy of the matching tuple and removes the original from the space. This behavior enables coordination patterns where tuples can be consumed by exactly one process, supporting distributed synchronization without explicit message passing between processes.</p>
</details>
