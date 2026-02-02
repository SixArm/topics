# Breadth-First Search

Question: What data structure does Breadth-First Search (BFS) use to ensure nodes are visited level by level?

- [ ] Stack
- [ ] Queue
- [ ] Heap
- [ ] Linked List

<details>
  <summary>Answer</summary>
  <p>Queue</p>
  <p>BFS uses a queue data structure to manage node traversal. Nodes are enqueued and dequeued in the order they were added (FIFO - First In, First Out), which ensures that all nodes at the current distance from the start node are visited before moving to nodes farther away. This level-by-level exploration is what makes BFS suitable for finding the shortest path in unweighted graphs.</p>
</details>
