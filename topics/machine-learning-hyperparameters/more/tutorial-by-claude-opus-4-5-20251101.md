## Machine Learning Hyperparameters

Machine learning hyperparameters are configuration settings that govern the training process of a model. Unlike model parameters (such as weights and biases) that are learned from data during training, hyperparameters are set before training begins. They control the learning algorithm's behavior, model architecture, and regularization strength. Proper hyperparameter tuning is critical for achieving optimal model performance and generalization.

## Hyperparameters vs. Model Parameters

Understanding the distinction between hyperparameters and model parameters is fundamental to machine learning practice.

| Aspect | Hyperparameters | Model Parameters |
|--------|-----------------|------------------|
| When set | Before training | During training |
| How determined | Manual selection or search | Learned from data |
| Examples | Learning rate, batch size | Weights, biases |
| Optimization | Grid search, Bayesian optimization | Gradient descent |
| Data dependency | Independent of training data | Derived from training data |

## Categories of Hyperparameters

Hyperparameters fall into three primary categories based on their function within the machine learning pipeline.

**Training Process Hyperparameters** control how the optimization algorithm updates model parameters:
- Learning rate
- Batch size
- Number of epochs
- Optimizer choice (SGD, Adam, RMSprop)
- Momentum coefficients

**Model Architecture Hyperparameters** define the structure and capacity of the model:
- Number of hidden layers
- Number of neurons per layer
- Activation functions
- Kernel size in convolutional networks
- Number of trees in ensemble methods

**Regularization Hyperparameters** prevent overfitting and improve generalization:
- L1/L2 regularization strength
- Dropout rate
- Early stopping patience
- Data augmentation parameters

## Core Training Hyperparameters

### Learning Rate

The learning rate determines the step size during gradient descent optimization. It directly influences convergence speed and stability.

| Learning Rate | Effect | Common Use Case |
|--------------|--------|-----------------|
| Too high (>0.1) | Overshooting, divergence, unstable training | Rarely appropriate |
| High (0.01-0.1) | Fast initial convergence, potential instability | Early training phases |
| Moderate (0.001-0.01) | Balanced convergence and stability | Default starting point |
| Low (0.0001-0.001) | Slow but stable convergence | Fine-tuning, late training |
| Too low (<0.0001) | Extremely slow training, stuck in local minima | Transfer learning final layers |

Learning rate schedules dynamically adjust the rate during training. Common approaches include step decay, exponential decay, cosine annealing, and warm restarts.

### Batch Size

Batch size specifies how many training examples are processed before updating model parameters.

| Batch Size | Advantages | Disadvantages |
|------------|------------|---------------|
| Small (1-32) | Better generalization, lower memory | Noisy gradients, slower training |
| Medium (32-256) | Good balance of speed and stability | Moderate memory requirements |
| Large (256-4096) | Faster training, smoother gradients | Higher memory, potential generalization issues |
| Very large (>4096) | Maximum hardware utilization | Often requires learning rate scaling |

Smaller batch sizes introduce noise into gradient estimates, which can help escape local minima but may slow convergence. Larger batches provide more accurate gradient estimates but require careful learning rate adjustment.

### Number of Epochs

An epoch represents one complete pass through the entire training dataset. The optimal number of epochs depends on dataset size, model complexity, and convergence behavior.

**Indicators for stopping training:**
- Validation loss stops decreasing
- Validation accuracy plateaus
- Training loss approaches zero while validation metrics diverge (overfitting)
- Learning curves stabilize

Early stopping monitors validation performance and halts training when improvement ceases, typically with a patience parameter specifying how many epochs to wait without improvement.

## Neural Network Architecture Hyperparameters

### Hidden Layers and Units

The depth (number of layers) and width (units per layer) of a neural network determine its capacity to represent complex functions.

| Network Structure | Characteristics | Suitable For |
|-------------------|-----------------|--------------|
| Shallow, wide | Faster training, fewer vanishing gradients | Simple patterns, tabular data |
| Deep, narrow | Hierarchical feature learning | Images, sequential data |
| Deep, wide | High capacity, computationally expensive | Complex tasks with large datasets |
| Residual connections | Enables very deep networks | State-of-the-art architectures |

General guidelines:
- Start with established architectures for your domain
- Add capacity if underfitting persists
- Reduce capacity if overfitting occurs despite regularization
- Deeper networks require careful initialization and normalization

### Activation Functions

Activation functions introduce non-linearity, enabling neural networks to learn complex mappings.

| Activation | Range | Advantages | Disadvantages |
|------------|-------|------------|---------------|
| ReLU | [0, ∞) | Fast computation, sparse activation | Dying neurons, unbounded output |
| Leaky ReLU | (-∞, ∞) | Addresses dying neurons | Requires choosing leak coefficient |
| ELU | (-α, ∞) | Smooth, handles negative values | More computation than ReLU |
| Sigmoid | (0, 1) | Bounded output, probabilistic interpretation | Vanishing gradients, not zero-centered |
| Tanh | (-1, 1) | Zero-centered, bounded | Vanishing gradients |
| GELU | (-∞, ∞) | Smooth approximation of ReLU | More computation |
| Swish | (-∞, ∞) | Self-gated, smooth | Slightly more expensive |

ReLU remains the default choice for hidden layers. Output layer activations depend on the task: softmax for multi-class classification, sigmoid for binary classification, and linear for regression.

## Regularization Hyperparameters

### L1 and L2 Regularization

Regularization adds a penalty term to the loss function to constrain model complexity.

| Regularization | Penalty Term | Effect | Use Case |
|----------------|--------------|--------|----------|
| L1 (Lasso) | Sum of absolute weights | Sparse weights, feature selection | High-dimensional data, interpretability |
| L2 (Ridge) | Sum of squared weights | Small but non-zero weights | General purpose, stable training |
| Elastic Net | Combination of L1 and L2 | Balance of sparsity and stability | Correlated features |

The regularization strength (often denoted λ or alpha) controls the trade-off between fitting the training data and keeping weights small. Higher values increase regularization, potentially causing underfitting; lower values may lead to overfitting.

### Dropout

Dropout randomly sets a fraction of neuron outputs to zero during training, forcing the network to learn redundant representations.

| Dropout Rate | Typical Application |
|--------------|---------------------|
| 0.0-0.2 | Convolutional layers |
| 0.2-0.5 | Fully connected layers |
| 0.5 | Classic recommendation, heavy regularization |
| >0.5 | Rarely beneficial, aggressive regularization |

Dropout is disabled during inference, and outputs are scaled accordingly. Spatial dropout and variational dropout are variants designed for specific architectures.

## Algorithm-Specific Hyperparameters

### Support Vector Machines

| Hyperparameter | Description | Impact |
|----------------|-------------|--------|
| C (regularization) | Trade-off between margin width and classification error | Higher C = tighter fit, potential overfitting |
| Kernel | Function mapping to higher dimensions | Determines decision boundary shape |
| Gamma (RBF kernel) | Influence radius of training examples | Higher gamma = more complex boundaries |
| Degree (polynomial kernel) | Polynomial degree | Higher degree = more flexible boundaries |

### Tree-Based Methods

| Hyperparameter | Random Forest | Gradient Boosting | XGBoost |
|----------------|---------------|-------------------|---------|
| Number of trees | 100-1000 | 100-500 | 100-1000 |
| Max depth | Deeper (None-20) | Shallower (3-10) | 3-10 |
| Min samples split | 2-20 | 2-20 | N/A |
| Learning rate | N/A | 0.01-0.3 | 0.01-0.3 |
| Subsample ratio | 1.0 (bootstrap) | 0.5-1.0 | 0.5-1.0 |
| Feature subsample | sqrt(n_features) | 0.5-1.0 | 0.5-1.0 |

### K-Nearest Neighbors

| Hyperparameter | Options | Considerations |
|----------------|---------|----------------|
| K (number of neighbors) | 1-50+ | Odd numbers avoid ties; larger K = smoother boundaries |
| Distance metric | Euclidean, Manhattan, Minkowski | Domain-dependent; Euclidean most common |
| Weighting | Uniform, distance-based | Distance weighting reduces impact of far neighbors |

## Hyperparameter Optimization Methods

### Grid Search

Exhaustively evaluates all combinations of specified hyperparameter values.

**Advantages:**
- Simple to implement
- Guaranteed to find best combination within grid
- Parallelizable

**Disadvantages:**
- Computationally expensive (exponential in number of hyperparameters)
- Inefficient for continuous hyperparameters
- May miss optimal values between grid points

### Random Search

Samples hyperparameter combinations randomly from specified distributions.

**Advantages:**
- More efficient than grid search for high-dimensional spaces
- Better coverage of important hyperparameters
- Easy to parallelize and extend

**Disadvantages:**
- No guarantee of finding optimal values
- May waste evaluations on poor regions

### Bayesian Optimization

Uses probabilistic models to guide the search toward promising hyperparameter regions.

**Advantages:**
- Sample-efficient, fewer evaluations needed
- Models uncertainty and exploits promising areas
- Handles continuous and discrete hyperparameters

**Disadvantages:**
- More complex to implement
- Overhead for building surrogate model
- May struggle with high-dimensional spaces

| Method | Best For | Evaluations Needed | Implementation Complexity |
|--------|----------|-------------------|---------------------------|
| Grid Search | Few hyperparameters, discrete values | Many | Low |
| Random Search | Medium-dimensional spaces | Moderate | Low |
| Bayesian Optimization | Expensive evaluations, continuous spaces | Few | Medium |
| Hyperband/ASHA | Deep learning, many configurations | Variable | Medium |
| Population-based Training | Online adaptation during training | Continuous | High |

## Best Practices for Hyperparameter Tuning

**Start with established defaults.** Most frameworks provide reasonable default values. Begin with these and adjust based on observed behavior.

**Tune the most impactful hyperparameters first.** Learning rate typically has the largest effect on performance, followed by batch size and architecture choices.

**Use logarithmic scales for learning rates and regularization.** Search over powers of 10 (0.0001, 0.001, 0.01, 0.1) rather than linear increments.

**Monitor both training and validation metrics.** Divergence between these indicates overfitting and signals the need for more regularization or less capacity.

**Document all experiments.** Track hyperparameter configurations, training curves, and final metrics systematically for reproducibility and analysis.

**Use cross-validation appropriately.** K-fold cross-validation provides more robust estimates but increases computation time proportionally.

**Consider computational budget.** Allocate resources between exploring more hyperparameter configurations and training each configuration longer.

**Avoid data leakage.** Hyperparameter selection must use only training and validation data. Test data should remain completely unseen until final evaluation.

## Common Pitfalls

| Pitfall | Consequence | Prevention |
|---------|-------------|------------|
| Overfitting to validation set | Poor test performance | Use nested cross-validation, hold out true test set |
| Insufficient search range | Missing optimal values | Start broad, then narrow |
| Ignoring interactions | Suboptimal configurations | Consider joint optimization, not sequential |
| Premature stopping | Underestimating potential | Allow sufficient training time per configuration |
| Inconsistent evaluation | Unreliable comparisons | Fix random seeds, use multiple runs |

## Summary

Hyperparameter tuning is both an art and a science. While automated methods like Bayesian optimization can efficiently navigate the search space, domain knowledge and systematic experimentation remain essential. Focus on the hyperparameters with the greatest impact—learning rate, regularization strength, and architecture choices—and iterate based on observed model behavior. The goal is not to find theoretically optimal hyperparameters but to achieve strong, generalizable performance within practical computational constraints.
