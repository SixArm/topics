# Machine learning parameters

Machine learning parameters are the internal variables that a model learns directly from training data during the fitting process. Unlike hyperparameters, which are set by the practitioner before training begins, parameters are optimized automatically by the learning algorithm. They encode the patterns, relationships, and structure discovered in the data, and they are what enable a trained model to generalize and make predictions on new, unseen inputs. Understanding parameters is essential for interpreting model behavior, diagnosing issues like underfitting or overfitting, and selecting the right algorithm for a given problem.

## What Parameters Are and Why They Matter

Parameters are the numerical values inside a model that get adjusted during training to minimize a loss function. They represent what the model has "learned." For example, in a linear regression model, the learned coefficients tell you how much each input feature contributes to the prediction. In a neural network, millions of weight and bias values collectively encode complex nonlinear mappings from inputs to outputs.

The number and nature of parameters directly affect a model's capacity — its ability to represent complex functions. A model with too few parameters may underfit, failing to capture important patterns. A model with too many parameters may overfit, memorizing noise in the training data rather than learning generalizable relationships. Striking the right balance is one of the central challenges in machine learning.

## Parameters vs. Hyperparameters

A common source of confusion is the distinction between parameters and hyperparameters. They serve fundamentally different roles in the modeling process.

| Aspect | Parameters | Hyperparameters |
|---|---|---|
| Definition | Internal variables learned from data | External settings configured before training |
| Set by | The learning algorithm during training | The practitioner or tuning process |
| Examples | Weights, biases, coefficients | Learning rate, number of trees, regularization strength |
| Optimized via | Gradient descent, maximum likelihood, etc. | Grid search, random search, Bayesian optimization |
| Stored in | The trained model artifact | The training configuration |

In short, parameters are the output of the training process, while hyperparameters govern how that training process operates.

## Parameters in Linear and Logistic Regression

Linear and logistic regression are foundational algorithms whose parameters are straightforward to interpret.

- **Coefficients (weights):** Each input feature is assigned a weight that quantifies its contribution to the output. A larger absolute weight means the feature has a stronger influence on the prediction.
- **Intercept (bias):** A constant term that shifts the decision boundary or regression line. It represents the baseline prediction when all input features are zero.

In linear regression, these parameters define a hyperplane in feature space. In logistic regression, they define a decision boundary by feeding the linear combination through a sigmoid function. Both models estimate parameters by minimizing a loss function — mean squared error for linear regression and log loss for logistic regression.

## Parameters in Support Vector Machines

Support vector machines learn parameters that define an optimal separating hyperplane between classes.

- **Support vectors:** The subset of training data points that lie closest to the decision boundary. These are the critical data points that determine the position and orientation of the hyperplane.
- **Kernel parameters:** When using nonlinear kernels such as the radial basis function (RBF), the model learns parameters that implicitly map data into higher-dimensional spaces where linear separation becomes possible.
- **Dual coefficients:** Weights associated with each support vector, representing how much influence each has on the decision boundary.
- **Regularization trade-off:** The balance between maximizing the margin and minimizing classification errors on the training set, controlled in part by learned slack variables.

## Parameters in Tree-Based Models

Decision trees and ensemble methods like random forests learn structural parameters that partition the feature space.

- **Split criteria:** At each internal node, the model learns which feature to split on and what threshold value to use. These decisions are optimized to maximize information gain or minimize impurity (e.g., Gini impurity or entropy).
- **Leaf values:** Each terminal node stores a prediction value — a class label for classification or a mean value for regression.
- **Maximum depth:** While often treated as a hyperparameter, the effective depth of a learned tree is a structural parameter that reflects the complexity of the patterns discovered.

In random forests, these parameters are replicated across many individual trees. Each tree learns its own set of splits and leaf values from a bootstrapped sample of the data. The ensemble combines their predictions through averaging or majority voting.

| Tree-Based Model | Key Learned Parameters | Ensemble Mechanism |
|---|---|---|
| Decision Tree | Split features, thresholds, leaf values | None (single model) |
| Random Forest | Per-tree splits and leaf values | Bagging with majority vote or averaging |
| Gradient Boosted Trees | Per-tree splits, leaf values, and residual corrections | Sequential additive boosting |

## Parameters in Neural Networks

Neural networks are the most parameter-intensive class of models. Their parameters consist of:

- **Weights:** Each connection between neurons has an associated weight that scales the signal passed from one layer to the next. These weights are the primary learned parameters and are adjusted during backpropagation.
- **Biases:** Each neuron has a bias term that shifts its activation function, allowing the network to fit data that does not pass through the origin.
- **Learning rate interaction:** While the learning rate itself is a hyperparameter, it directly governs the step size used to update weights and biases during gradient descent. A poorly chosen learning rate can prevent parameters from converging to good values.

Modern deep learning architectures can have billions of parameters. Large language models, for instance, derive their capabilities from the sheer scale of learned weight matrices distributed across transformer layers. The relationship between parameter count and model capability is a subject of active research and debate.

## Parameters in K-Nearest Neighbors

K-nearest neighbors is a notable exception in the parameter landscape. It is a non-parametric algorithm, meaning it does not learn explicit internal parameters during training.

- **Stored training data:** KNN retains the entire training dataset and uses it directly at inference time.
- **Number of neighbors (K):** This is a hyperparameter, not a learned parameter. It determines how many nearby data points vote on a prediction.
- **Distance metric:** The choice of distance function (Euclidean, Manhattan, Minkowski) is also a hyperparameter that affects which neighbors are considered "nearest."

Because KNN has no learned parameters, it is sometimes called a "lazy learner." Its computational cost is incurred at prediction time rather than training time.

## How Parameters Are Optimized

The process of finding good parameter values is called optimization or fitting. Different algorithms use different strategies.

- **Gradient descent:** Used in neural networks and logistic regression. The algorithm computes the gradient of the loss function with respect to each parameter and updates them iteratively in the direction that reduces the loss.
- **Ordinary least squares:** Used in linear regression. Parameters are computed analytically by solving a system of linear equations that minimizes squared error.
- **Maximum likelihood estimation:** Used in probabilistic models. Parameters are chosen to maximize the probability of observing the training data.
- **Greedy splitting:** Used in decision trees. The algorithm evaluates candidate splits at each node and selects the one that produces the greatest reduction in impurity.

The choice of optimization method affects training speed, convergence guarantees, and susceptibility to local minima.

## Common Issues with Parameters

Several practical challenges arise when working with model parameters:

- **Overfitting:** When a model has too many parameters relative to the amount of training data, it may memorize the training set rather than learning generalizable patterns. Regularization techniques such as L1 and L2 penalties add constraints to parameter values to mitigate this.
- **Underfitting:** When a model has too few parameters, it lacks the capacity to represent the underlying patterns in the data, leading to poor performance on both training and test sets.
- **Vanishing and exploding gradients:** In deep neural networks, gradients can become extremely small or large as they propagate through many layers, causing parameters to stop updating or diverge. Techniques like batch normalization and residual connections address this.
- **Parameter initialization:** The starting values of parameters can significantly affect training outcomes. Poor initialization can lead to slow convergence or convergence to suboptimal solutions.

## Related

Practitioners looking to deepen their understanding of parameters should explore machine learning hyperparameters, which govern the training process itself, and hyperparameter tuning techniques such as grid search and Bayesian optimization. Overfitting and underfitting are closely related concepts, as is regularization, which directly constrains parameter values. For neural networks specifically, topics such as gradient descent optimization, backpropagation, activation functions, and neural network architecture provide essential context. Support vector machines, decision trees, random forests, and K-nearest neighbors each offer distinct perspectives on how parameters shape model behavior.

## Summary

Machine learning parameters are the internal variables that a model acquires through training, encoding the patterns and relationships found in data. They range from simple coefficients in linear models to billions of weights in deep neural networks, and their quantity and quality directly determine a model's predictive power. Understanding the distinction between parameters and hyperparameters, knowing how parameters are optimized, and recognizing common failure modes such as overfitting and vanishing gradients are foundational skills for any technology professional working with machine learning systems.

## References

- Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*. Springer. A comprehensive treatment of parametric models and optimization methods.
- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press. Covers neural network parameters, gradient-based optimization, and regularization in depth. Available at [https://www.deeplearningbook.org](https://www.deeplearningbook.org).
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer. Provides rigorous coverage of parameters across classical machine learning algorithms. Available at [https://hastie.su.domains/ElemStatLearn/](https://hastie.su.domains/ElemStatLearn/).
- Scikit-learn Documentation. "Glossary of Common Terms and API Reference." [https://scikit-learn.org/stable/glossary.html](https://scikit-learn.org/stable/glossary.html). Practical reference for parameter terminology and usage across algorithms.
- Murphy, K. P. (2022). *Probabilistic Machine Learning: An Introduction*. MIT Press. Modern treatment of parametric and non-parametric models. Available at [https://probml.github.io/pml-book/](https://probml.github.io/pml-book/).
