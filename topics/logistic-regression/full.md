# Logistic regression

Logistic regression is a statistical and machine learning technique used for binary classification tasks, where the goal is to predict whether an input data point belongs to one of two classes. Despite its name, logistic regression is a classification algorithm rather than a regression algorithm. It's called "logistic" because it's based on the logistic function, which maps any input into a value between 0 and 1.

Logistic regression models the probability that a given data point belongs to the positive class (class 1) as a function of its features. The logistic function, also known as the sigmoid function, is used to transform the linear combination of features into a probability:

$P(Y=1∣X)=11+e−z$

Where:

* $P(Y=1∣X)$ is the probability that the data point belongs to class 1 given its features $X$.
* $e$ is the base of the natural logarithm.
* $z$ is the linear combination of the features and their respective coefficients: z=$β_0$+β_1X_1+β_2X_2+…+β_pX_p$.
* $β_0,β_1,…,βp$ are the coefficients of the features.

The logistic function ensures that the output is bounded between 0 and 1, which can be interpreted as a probability.

During the training process, the coefficients $β_0,β_1,…,β_p$ are estimated to maximize the likelihood of the observed data given the model. This is typically done using optimization algorithms such as gradient descent.

To make predictions, a threshold is applied to the predicted probabilities. If the predicted probability is above the threshold, the data point is classified as belonging to the positive class; otherwise, it's classified as belonging to the negative class.

Logistic regression can be extended to handle multi-class classification problems through techniques such as one-vs-rest or softmax regression.

Key features of logistic regression:

* Interpretability: Coefficients can provide insights into the influence of each feature on the predicted probability.
* Linear decision boundary: Logistic regression uses a linear combination of features, resulting in a linear decision boundary.
* Widely used: Despite its simplicity, logistic regression is commonly used in various fields for binary classification tasks.

However, like linear regression, logistic regression assumes a linear relationship between features and the log-odds of the outcome, which might not capture complex relationships. In such cases, more advanced models like decision trees, support vector machines, or neural networks might be more appropriate.
