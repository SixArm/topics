# Self-Organizing Maps (SOM)

Question: What is the primary purpose of the "best matching unit" (BMU) in the Self-Organizing Maps training process?

- [ ] To randomly initialize weight vectors across the grid
- [ ] To identify the node with the closest weight vector to an input data point, then update it and its neighbors
- [ ] To calculate the principal components of the input data
- [ ] To detect and remove outliers from the dataset before training

<details>
  <summary>Answer</summary>
  <p>To identify the node with the closest weight vector to an input data point, then update it and its neighbors</p>
  <p>During SOM training (competitive learning), the BMU is the node whose weight vector is most similar to the current input data point. Once identified, the BMU and its neighboring nodes are updated to become more similar to that input. This iterative process allows the SOM to gradually organize itself to reflect the topological structure of the data, preserving relationships between similar data points.</p>
</details>
