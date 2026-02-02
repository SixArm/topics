# Gradient descent

Question: What is the primary purpose of the learning rate in the gradient descent algorithm?

- [ ] To determine how many iterations the algorithm should run before stopping
- [ ] To control the size of parameter updates when moving toward the minimum of the loss function
- [ ] To calculate the initial values of the model's weights and biases
- [ ] To measure how well the model's predictions match the true target values

<details>
  <summary>Answer</summary>
  <p>To control the size of parameter updates when moving toward the minimum of the loss function</p>
  <p>The learning rate determines how large a step the algorithm takes when updating parameters. During the gradient update step, the gradients are multiplied by the learning rate before being subtracted from the current parameter values. A learning rate that is too large may cause the algorithm to overshoot the minimum, while one that is too small may result in very slow convergence or getting stuck in local minima.</p>
</details>
