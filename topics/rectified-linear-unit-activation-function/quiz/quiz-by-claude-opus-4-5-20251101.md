# Rectified Linear Unit (ReLU) activation function

Question: What is a significant limitation of the ReLU activation function that can occur during neural network training?

- [ ] It causes exploding gradients due to unbounded positive outputs
- [ ] It requires more computational resources than sigmoid functions
- [ ] It can produce "dead neurons" that always output zero and stop learning
- [ ] It cannot introduce non-linearity into the network

<details>
  <summary>Answer</summary>
  <p>It can produce "dead neurons" that always output zero and stop learning</p>
  <p>The "dying ReLU" problem occurs when a large gradient flows through a ReLU neuron and pushes its weights into a region where the neuron always outputs 0 for all inputs. Once this happens, the neuron becomes inactive (dead) and stops contributing to learning. This limitation has led to the development of variants like Leaky ReLU, Parametric ReLU, and ELU that allow small gradients for negative inputs.</p>
</details>
