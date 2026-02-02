# Hyperbolic tangent activation function

Question: What is the key advantage of the hyperbolic tangent (tanh) activation function over the sigmoid activation function?

- [ ] It has a range between 0 and 2, allowing for larger output values
- [ ] It is zero-centered with output range between -1 and 1, which helps mitigate vanishing gradient issues
- [ ] It eliminates all non-linearity from the neural network
- [ ] It only accepts positive input values

<details>
  <summary>Answer</summary>
  <p>It is zero-centered with output range between -1 and 1, which helps mitigate vanishing gradient issues</p>
  <p>Unlike the sigmoid function, the tanh function is zero-centered, meaning its output has a mean value of zero. This property helps reduce the impact of vanishing gradients during training. The tanh function maps inputs to a range between -1 and 1, where negative inputs map close to -1, zero inputs to 0, and positive inputs to values close to 1.</p>
</details>
