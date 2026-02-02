# MapReduce

Question: What is the primary purpose of the Map function in the MapReduce programming model?

- [ ] To combine intermediate values for each key into a final output
- [ ] To sort and partition data across distributed nodes
- [ ] To transform input data and produce intermediate key-value pairs
- [ ] To distribute processing load across multiple computing nodes

<details>
  <summary>Answer</summary>
  <p>To transform input data and produce intermediate key-value pairs</p>
  <p>The Map function takes a set of input data and performs a transformation on it, producing a set of intermediate key-value pairs. These key-value pairs are then passed to the Reduce function, which combines them to produce the final output. Understanding this fundamental division of responsibilities between Map and Reduce is essential for designing effective MapReduce solutions.</p>
</details>
