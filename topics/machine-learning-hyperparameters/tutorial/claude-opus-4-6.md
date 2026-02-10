# Machine learning hyperparameters

Machine learning hyperparameters are configuration settings established before the training process begins. Unlike model parameters such as weights and biases, which are learned automatically from data during training, hyperparameters are specified by the practitioner and govern the structure, behavior, and optimization strategy of the learning algorithm. Proper hyperparameter selection is one of the most consequential decisions in any machine learning workflow, directly affecting model accuracy, training speed, and generalization to unseen data.

## Parameters versus hyperparameters

A frequent source of confusion for practitioners is the distinction between parameters and hyperparameters. Parameters are internal to the model and are adjusted during training through optimization algorithms. Hyperparameters are external controls that shape how training proceeds. The model never learns hyperparameters from data; instead, the practitioner selects them based on domain knowledge, experimentation, or automated search.

| Aspect | Parameters | Hyperparameters |
|---|---|---|
| Definition | Values learned from training data | Values set before training begins |
| Examples | Weights, biases, coefficients | Learning rate, batch size, tree depth |
| Determined by | Optimization algorithm (e.g., gradient descent) | Practitioner or automated search |
| Updated during training | Yes | No |
| Stored after training | Yes, as part of the model | Yes, as part of the configuration |

## Categories of hyperparameters

Hyperparameters fall into three broad categories, each influencing a different aspect of the machine learning pipeline.

- **Model structure hyperparameters** define the architecture and capacity of the model. Examples include the number of hidden layers and units in a neural network, tree depth in decision trees, and the choice of kernel in a support vector machine. These determine how expressive the model can be and how complex a function it can approximate.

- **Optimization hyperparameters** control how the model learns from data. The learning rate, batch size, number of epochs, and optimizer choice (SGD, Adam, RMSProp) all fall into this category. They govern convergence speed, stability, and whether the model reaches a good minimum of the loss function.

- **Regularization hyperparameters** prevent the model from overfitting to training data. L1 and L2 regularization strengths, dropout rate, early stopping patience, and data augmentation settings are regularization hyperparameters. They introduce constraints or noise to encourage the model to learn generalizable patterns rather than memorizing the training set.

## Common hyperparameters in detail

### Learning rate

The learning rate determines the step size during gradient descent optimization. A value that is too large causes the optimizer to overshoot minima and diverge, while a value that is too small results in extremely slow convergence and potential entrapment in poor local minima. Many modern training pipelines use learning rate schedules that decrease the rate over time, or adaptive optimizers like Adam that adjust per-parameter learning rates automatically.

### Batch size

Batch size defines how many training examples the model processes before updating its parameters. Smaller batches introduce more noise into gradient estimates, which can help escape local minima but also makes training less stable. Larger batches provide smoother gradients and better hardware utilization but require more memory and can converge to sharper, less generalizable minima.

| Batch size | Gradient quality | Memory usage | Generalization tendency |
|---|---|---|---|
| Small (1–32) | Noisy | Low | Often better |
| Medium (32–256) | Moderate | Moderate | Balanced |
| Large (256+) | Smooth | High | Sometimes worse |

### Number of epochs

An epoch represents one complete pass through the entire training dataset. Too few epochs result in underfitting, where the model has not learned enough from the data. Too many epochs risk overfitting, where the model memorizes training examples rather than learning general patterns. Early stopping, which halts training when validation performance stops improving, is a practical technique for selecting the effective number of epochs.

### Network architecture

In neural networks, the number of hidden layers and units per layer controls model capacity. Deeper networks can represent more complex hierarchical features, but they are harder to train and more prone to overfitting on small datasets. Width (units per layer) affects how much information each layer can capture. Practitioners typically start with established architectures for their problem domain and adjust incrementally.

### Regularization strength and dropout

L1 regularization adds the sum of absolute values of weights to the loss function, encouraging sparsity. L2 regularization adds the sum of squared weights, encouraging smaller but non-zero weights. Dropout randomly deactivates a fraction of neurons during each training step, forcing the network to develop redundant representations. Typical dropout rates range from 0.1 to 0.5, with higher rates providing stronger regularization at the cost of slower learning.

### Algorithm-specific hyperparameters

Different algorithms introduce their own hyperparameters:

- **Support Vector Machines**: The C parameter controls the trade-off between margin width and classification error. The gamma parameter in RBF kernels determines how far the influence of a single training example reaches.
- **k-Nearest Neighbors**: The value of k (number of neighbors) controls the smoothness of the decision boundary. Small k values create complex boundaries sensitive to noise; large k values produce smoother but potentially biased boundaries.
- **Random Forests and Gradient Boosting**: Tree depth, number of trees, minimum samples per leaf, and the learning rate (for boosting) all interact to control model complexity and training time.

## Hyperparameter tuning methods

Selecting hyperparameters effectively requires systematic approaches rather than guesswork. The most widely used methods offer different trade-offs between computational cost and search quality.

- **Grid search** evaluates every combination of a predefined set of hyperparameter values. It is exhaustive and easy to implement but scales poorly as the number of hyperparameters grows, since the number of combinations increases exponentially.

- **Random search** samples hyperparameter combinations randomly from specified distributions. Research by Bergstra and Bengio (2012) demonstrated that random search is more efficient than grid search in many practical scenarios because it explores the search space more broadly when only a few hyperparameters strongly influence performance.

- **Bayesian optimization** builds a probabilistic model of the objective function and uses it to select the most promising hyperparameter combinations to evaluate next. Tools such as Optuna, Hyperopt, and Scikit-Optimize implement this approach. Bayesian optimization is particularly effective when evaluations are expensive, as it typically finds good configurations in fewer iterations than grid or random search.

- **Hyperband and successive halving** allocate resources adaptively by training many configurations for a short time and progressively eliminating poor performers. This approach is efficient for large search spaces where early stopping can reliably identify unpromising configurations.

| Method | Computational cost | Search quality | Best suited for |
|---|---|---|---|
| Grid search | High (exponential) | Thorough but rigid | Few hyperparameters, small ranges |
| Random search | Moderate | Good coverage | Moderate number of hyperparameters |
| Bayesian optimization | Low to moderate | Excellent | Expensive evaluations, complex spaces |
| Hyperband | Moderate | Good | Large spaces with early stopping signals |

## Best practices

Effective hyperparameter tuning follows several established principles:

- **Use validation data, not test data.** Hyperparameters should be tuned on a held-out validation set or through cross-validation. The test set must remain untouched until final evaluation to provide an honest estimate of generalization performance.

- **Start with established defaults.** Most frameworks provide sensible default hyperparameters. Begin with these and adjust based on observed behavior rather than tuning everything from scratch.

- **Tune the most impactful hyperparameters first.** Learning rate and model capacity typically have the largest effect on performance. Regularization hyperparameters matter most when overfitting is observed.

- **Log and track experiments.** Use experiment tracking tools such as MLflow, Weights and Biases, or TensorBoard to record hyperparameter configurations alongside metrics. Reproducibility depends on knowing exactly which settings produced each result.

- **Consider computational budgets.** Exhaustive search is rarely practical. Allocate tuning budget proportionally to each hyperparameter's expected impact, and use efficient search methods for large spaces.

## Related

Practitioners looking to deepen their understanding of hyperparameters should explore machine learning parameters to clarify the parameter-hyperparameter distinction, hyperparameter tuning for detailed coverage of search strategies, overfitting and underfitting to understand why regularization hyperparameters matter, loss functions to see how optimization targets interact with learning rate and batch size, neural networks for architecture-specific considerations, cross-validation for robust evaluation during tuning, and Bayesian optimization as a dedicated study of surrogate-model-based search.

## Summary

Machine learning hyperparameters are the practitioner-specified settings that govern model architecture, optimization behavior, and regularization before training begins. They span learning rate, batch size, number of epochs, network depth and width, regularization strength, dropout rate, and algorithm-specific controls such as SVM kernel parameters or tree depth. Because hyperparameters are not learned from data, selecting them requires deliberate experimentation using methods ranging from grid search and random search to Bayesian optimization and Hyperband. Disciplined tuning, guided by validation metrics, experiment tracking, and an understanding of each hyperparameter's role, is essential for building models that perform well on unseen data and generalize reliably in production.

## References

- Bergstra, J. and Bengio, Y. (2012). "Random Search for Hyper-Parameter Optimization." Journal of Machine Learning Research, 13, 281–305. https://jmlr.org/papers/v13/bergstra12a.html
- Goodfellow, I., Bengio, Y., and Courville, A. (2016). *Deep Learning*. MIT Press. Chapter 11: Practical Methodology. https://www.deeplearningbook.org/
- Snoek, J., Larochelle, H., and Adams, R.P. (2012). "Practical Bayesian Optimization of Machine Learning Algorithms." Advances in Neural Information Processing Systems 25. https://papers.nips.cc/paper/2012/hash/05311655a15b75fab86956663e1819cd-Abstract.html
- Li, L., Jamieson, K., DeSalvo, G., Rostamizadeh, A., and Talwalkar, A. (2018). "Hyperband: A Novel Bandit-Based Approach to Hyperparameter Optimization." Journal of Machine Learning Research, 18(185), 1–52. https://jmlr.org/papers/v18/16-558.html
- Scikit-learn documentation: Tuning the hyper-parameters of an estimator. https://scikit-learn.org/stable/modules/grid_search.html
- Akiba, T., Sano, S., Yanase, T., Ohta, T., and Koyama, M. (2019). "Optuna: A Next-generation Hyperparameter Optimization Framework." Proceedings of the 25th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining. https://dl.acm.org/doi/10.1145/3292500.3330701
