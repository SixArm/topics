# Lazy learning algorithms

Question: What is the fundamental difference between lazy learning algorithms and eager learning algorithms in machine learning?

- [ ] Lazy learning algorithms require less memory because they compress the training data
- [ ] Lazy learning algorithms build a model during training, while eager learning algorithms store all training data
- [ ] Lazy learning algorithms store the entire training dataset and defer computation until prediction time, while eager learning algorithms build a model during training
- [ ] Lazy learning algorithms only work with numerical data, while eager learning algorithms work with any data type

<details>
  <summary>Answer</summary>
  <p>Lazy learning algorithms store the entire training dataset and defer computation until prediction time, while eager learning algorithms build a model during training</p>
  <p>Lazy learning algorithms (also called instance-based or memory-based learning) do not create an explicit model during training. Instead, they store all training instances and use them directly to make predictions when new data is encountered. This contrasts with eager learning algorithms, which build a generalized model during the training phase and then discard the training data. Common examples of lazy learners include k-Nearest Neighbors (k-NN) and Case-Based Reasoning.</p>
</details>
