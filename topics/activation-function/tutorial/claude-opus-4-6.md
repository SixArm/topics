# Activation function

An activation function is a mathematical function applied to the output of each neuron in an artificial neural network. Its primary role is to introduce non-linearity into the model, enabling the network to learn complex patterns and relationships in data. Without activation functions, a neural network of any depth would collapse into a single linear transformation, severely limiting its representational power. The activation function takes the weighted sum of a neuron's inputs plus a bias term and transforms it into the neuron's output signal, which is then passed to subsequent layers. Choosing the right activation function is one of the most consequential architectural decisions when designing a neural network.

## Why activation functions matter

Neural networks derive their power from composing layers of simple computations. Each neuron computes a weighted sum of its inputs, adds a bias, and then passes the result through an activation function. If every neuron used a purely linear transformation, stacking multiple layers would produce nothing more than a single affine mapping from inputs to outputs. The activation function breaks this linearity, allowing the network to carve out complex decision boundaries, approximate arbitrary continuous functions, and model the intricate nonlinear structures present in real-world data such as images, natural language, and time series.

Activation functions also play a critical role during training. Gradient-based optimization algorithms like backpropagation rely on the derivative of the activation function to compute how much each weight should be adjusted. Functions with poorly behaved gradients can lead to training pathologies such as vanishing gradients, where the signal diminishes to near zero in deep networks, or exploding gradients, where the signal grows uncontrollably. The mathematical properties of an activation function directly determine how effectively a network can be trained.

## Key properties of activation functions

When evaluating an activation function, several mathematical and practical properties guide the selection.

- **Non-linearity**: The function must be nonlinear so that multiple layers compose into a richer function than any single layer could represent. This is the fundamental reason activation functions exist.

- **Differentiability**: Because backpropagation computes gradients through the chain rule, the function should be differentiable (or at least sub-differentiable) almost everywhere. Functions with undefined or zero gradients over large regions impede learning.

- **Monotonicity**: A monotonic function preserves the ordering of its inputs, which tends to simplify the optimization landscape and make training more stable. Most commonly used activation functions are monotonic, though some effective functions like Swish are not strictly so.

- **Bounded vs. unbounded output**: Bounded functions like sigmoid and tanh constrain outputs to a fixed range, which can be useful for output layers but may cause vanishing gradients internally. Unbounded functions like ReLU allow outputs to grow, which helps preserve gradient flow but can lead to numerical instability if unchecked.

- **Computational efficiency**: Networks may evaluate activation functions billions of times during training. Simple functions like ReLU, which involve only a comparison and a pass-through, are far cheaper to compute than functions requiring exponentiation or division.

- **Zero-centered output**: Functions whose outputs are centered around zero, such as tanh, allow gradients to flow in both positive and negative directions, which can accelerate convergence compared to functions like sigmoid whose outputs are always positive.

## Common activation functions

The following table summarizes the most widely used activation functions, their output ranges, and their primary characteristics.

| Function | Output range | Key characteristic | Common use case |
|---|---|---|---|
| Sigmoid | (0, 1) | Smooth, bounded, probabilistic interpretation | Binary classification output layers |
| Tanh | (-1, 1) | Zero-centered, bounded | Recurrent neural networks, hidden layers |
| ReLU | [0, infinity) | Simple, sparse activation, fast to compute | Default for most hidden layers |
| Leaky ReLU | (-infinity, infinity) | Allows small negative gradient | Preventing dead neurons |
| Parametric ReLU | (-infinity, infinity) | Learnable negative slope | When Leaky ReLU slope should be optimized |
| ELU | (-alpha, infinity) | Smooth for negative inputs, zero-centered mean | Deep networks needing smoother gradients |
| SELU | (-lambda*alpha, infinity) | Self-normalizing property | Fully connected deep networks |
| Swish | (-0.278, infinity) | Smooth, non-monotonic, self-gated | Large-scale vision models |
| GELU | (-0.17, infinity) | Stochastic regularization interpretation | Transformer architectures |
| Softmax | (0, 1) per class | Outputs sum to 1 across classes | Multi-class classification output layers |

## Sigmoid and tanh

The sigmoid function compresses any real-valued input into the range (0, 1), producing an output that can be interpreted as a probability. It was among the earliest activation functions used in neural networks and remains the standard choice for binary classification output layers. However, sigmoid suffers from the vanishing gradient problem: for inputs with large absolute values, the gradient approaches zero, which slows or stalls learning in earlier layers of deep networks. Additionally, sigmoid outputs are not zero-centered, which can cause inefficient zig-zagging during gradient descent.

The hyperbolic tangent function addresses the centering issue by mapping inputs to the range (-1, 1). Because its outputs are zero-centered, tanh generally leads to faster convergence than sigmoid when used in hidden layers. It remains widely used in recurrent neural networks and sequence modeling tasks. However, tanh still suffers from vanishing gradients at extreme input values, making it less suitable for very deep feedforward architectures.

## ReLU and its variants

The Rectified Linear Unit, or ReLU, outputs zero for any negative input and passes positive inputs through unchanged. This simplicity makes ReLU extremely efficient to compute and evaluate. ReLU largely solved the vanishing gradient problem for positive inputs because its gradient is either zero or one, and it induces sparsity in the network since many neurons output exactly zero. For these reasons, ReLU became the default activation function for hidden layers in most modern architectures.

ReLU has one significant drawback known as the dying ReLU problem. If a neuron's weighted sum consistently falls below zero, its output is always zero and its gradient is always zero, meaning the neuron stops learning entirely. Several variants address this issue.

- **Leaky ReLU** allows a small, fixed negative slope (typically 0.01) for negative inputs, ensuring that the gradient is never exactly zero and that neurons can recover from negative saturation.

- **Parametric ReLU (PReLU)** treats the negative slope as a learnable parameter, allowing the network to optimize it during training rather than relying on a fixed hyperparameter.

- **Exponential Linear Unit (ELU)** uses an exponential curve for negative inputs, producing smoother outputs that push mean activations closer to zero, which can improve learning dynamics.

- **Scaled Exponential Linear Unit (SELU)** is designed to enable self-normalizing networks. Under certain architectural conditions, SELU activations automatically converge toward zero mean and unit variance, eliminating the need for explicit batch normalization in deep fully connected networks.

## Modern activation functions

Recent research has produced activation functions tailored to specific architectures and training regimes.

**Swish**, proposed by researchers at Google, is defined as the input multiplied by its own sigmoid. It is smooth, non-monotonic, and unbounded above. Swish has been shown to outperform ReLU on deep networks in large-scale image classification tasks. Its non-monotonic nature allows it to output small negative values, which can act as a form of implicit regularization.

**GELU**, the Gaussian Error Linear Unit, weights the input by the probability that a standard Gaussian random variable is less than or equal to that input. GELU has become the dominant activation function in transformer-based architectures including BERT, GPT, and Vision Transformers. Its probabilistic gating mechanism provides a smooth approximation to ReLU with beneficial regularization properties.

**Mish** is another smooth, non-monotonic function that has shown strong performance across various computer vision benchmarks. It is defined using the softplus function and hyperbolic tangent, and like Swish, it allows small negative values to pass through.

## How to choose an activation function

Selecting an activation function depends on the layer's position in the network, the architecture type, and the problem domain. The following guidelines reflect established best practices.

- **Hidden layers in feedforward and convolutional networks**: Start with ReLU. It is fast, effective, and well-understood. If you encounter dying neurons, switch to Leaky ReLU or ELU.

- **Transformer architectures**: Use GELU. It is the standard in modern transformers and has been extensively validated in language and vision models.

- **Recurrent neural networks**: Use tanh for hidden state computations and sigmoid for gating mechanisms. This combination is built into LSTM and GRU cells by design.

- **Binary classification output layer**: Use sigmoid to produce a probability for the positive class.

- **Multi-class classification output layer**: Use softmax to produce a probability distribution across all classes.

- **Regression output layer**: Use a linear (identity) activation to allow the network to output any real value.

- **Self-normalizing deep networks**: Use SELU with the lecun_normal weight initializer and alpha dropout for fully connected architectures that benefit from automatic normalization.

## Common training issues related to activation functions

Several training pathologies are directly linked to activation function behavior.

- **Vanishing gradients**: Sigmoid and tanh saturate at extreme input values, producing near-zero gradients. This starves earlier layers of learning signal in deep networks. Mitigation strategies include using ReLU-family functions, residual connections, or careful weight initialization.

- **Exploding gradients**: Unbounded activation functions combined with large weights can cause gradient magnitudes to grow exponentially across layers. Gradient clipping, proper initialization schemes like He initialization, and batch normalization help control this.

- **Dying ReLU**: Neurons that enter the zero region of ReLU may never recover because the gradient is exactly zero. Using Leaky ReLU, PReLU, or ELU avoids this problem. Reducing the learning rate or using careful initialization also helps.

- **Non-zero-centered outputs**: Sigmoid produces strictly positive outputs, which means all gradients for a given layer's weights have the same sign within a single sample. This constrains update directions and can slow convergence. Using tanh or batch normalization mitigates the issue.

## Related

Topics to explore next include neural networks and their fundamental architecture, backpropagation and gradient-based optimization, the vanishing gradient problem in deep learning, loss functions and how they interact with output activations, batch normalization as a complementary technique to activation functions, weight initialization strategies such as He and Xavier initialization, deep neural networks and the architectural patterns that depend on activation function selection, and transformer architectures that have driven the adoption of GELU and similar modern functions.

## Summary

Activation functions are essential components of neural networks that introduce the non-linearity required for learning complex patterns. The field has evolved from early reliance on sigmoid and tanh through the ReLU revolution that enabled training of much deeper networks, to modern smooth functions like GELU and Swish that are tailored for transformer and large-scale vision architectures. The right choice depends on the network architecture, the layer position, and the task at hand, with ReLU remaining the robust default for hidden layers, GELU dominating transformer models, and sigmoid and softmax serving their established roles in output layers. Understanding the mathematical properties of these functions, particularly their gradient behavior, boundedness, and computational cost, is fundamental to designing neural networks that train efficiently and generalize well.

## References

- Nair, V., & Hinton, G. E. (2010). "Rectified Linear Units Improve Restricted Boltzmann Machines." Proceedings of the 27th International Conference on Machine Learning (ICML).
- Glorot, X., Bordes, A., & Bengio, Y. (2011). "Deep Sparse Rectifier Neural Networks." Proceedings of the 14th International Conference on Artificial Intelligence and Statistics (AISTATS).
- Clevert, D.-A., Unterthiner, T., & Hochreiter, S. (2016). "Fast and Accurate Deep Network Learning by Exponential Linear Units (ELUs)." Proceedings of the International Conference on Learning Representations (ICLR).
- Klambauer, G., Unterthiner, T., Mayr, A., & Hochreiter, S. (2017). "Self-Normalizing Neural Networks." Advances in Neural Information Processing Systems (NeurIPS).
- Ramachandran, P., Zoph, B., & Le, Q. V. (2017). "Searching for Activation Functions." arXiv preprint arXiv:1710.05941.
- Hendrycks, D., & Gimpel, K. (2016). "Gaussian Error Linear Units (GELUs)." arXiv preprint arXiv:1606.08415.
- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press. https://www.deeplearningbook.org/
