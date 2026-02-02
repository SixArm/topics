# Sigmoid activation function

Question: What is a significant drawback of the sigmoid activation function that can affect neural network training?

- [ ] It only works with positive input values
- [ ] The vanishing gradient problem, where gradients approach zero for very large or small inputs
- [ ] It produces outputs greater than 1 for large inputs
- [ ] It cannot introduce non-linearity into neural networks

<details>
  <summary>Answer</summary>
  <p>The vanishing gradient problem, where gradients approach zero for very large or small inputs</p>
  <p>For very large positive or negative input values, the gradient of the sigmoid function approaches zero. This can lead to slow convergence and difficulty in training deep neural networks, which is why activation functions like ReLU and its variants are now commonly preferred for hidden layers.</p>
</details>
