# Linear regression

Linear regression is one of the most fundamental techniques in statistics and machine learning. It models the relationship between a dependent variable (the outcome you want to predict) and one or more independent variables (the features or predictors you use to make that prediction) by fitting a straight line, or more generally a hyperplane, through the observed data. For technology professionals, linear regression serves as both a practical predictive tool and a conceptual foundation for understanding more advanced algorithms. Whether you are forecasting server load, estimating software project costs, or analyzing A/B test metrics, linear regression provides an interpretable and computationally efficient starting point.

## Core Concepts

Linear regression assumes that the relationship between inputs and output can be expressed as a weighted sum of the input features plus a constant bias term. In simple linear regression, there is one independent variable and the model defines a line through two-dimensional space. In multiple linear regression, there are two or more independent variables and the model defines a hyperplane through higher-dimensional space. The model parameters, often called coefficients or weights, quantify how much each feature contributes to the predicted outcome. The intercept (or bias) represents the expected value of the output when all features are zero.

A critical distinction exists between multivariate linear regression and multiple linear regression. Multiple linear regression uses several predictors to model a single outcome. Multivariate linear regression models multiple correlated outcomes simultaneously. Most practical applications in technology use the multiple regression form.

## How the Model Is Fitted

The most common method for estimating the model's coefficients is Ordinary Least Squares (OLS). OLS finds the set of coefficients that minimizes the sum of the squared differences between the observed values and the values predicted by the model. This cost function, known as the residual sum of squares, has a closed-form solution that can be computed directly using matrix algebra, making it fast to train on moderate-sized datasets.

When the dataset is very large or when features are numerous, iterative optimization methods such as gradient descent become more practical than the closed-form solution. Gradient descent updates the coefficients incrementally by moving in the direction that reduces the cost function most steeply. Variants like stochastic gradient descent and mini-batch gradient descent trade some precision per step for dramatically faster convergence on large-scale data.

## Fitting Methods Compared

| Method | Approach | Best For | Sensitivity to Outliers |
|---|---|---|---|
| Ordinary Least Squares | Minimizes sum of squared residuals via closed-form solution | Small to moderate datasets with well-behaved data | High |
| Gradient Descent | Iteratively updates coefficients along the steepest descent direction | Large datasets or streaming data | High |
| Least Absolute Deviations | Minimizes sum of absolute residuals | Datasets with outliers | Low |
| Ridge Regression (L2) | Adds L2-norm penalty to least squares cost | Multicollinear features; preventing overfitting | High |
| Lasso Regression (L1) | Adds L1-norm penalty to least squares cost | Feature selection; sparse models | High |
| Elastic Net | Combines L1 and L2 penalties | High-dimensional data with grouped correlated features | High |

## Assumptions

Linear regression relies on several assumptions. Violating these assumptions does not necessarily make the model useless, but it can degrade the reliability of coefficient estimates and predictions.

- **Linearity.** The relationship between the independent variables and the dependent variable is linear. Non-linear relationships require feature engineering (such as polynomial terms) or a different model class.
- **Independence.** The observations are independent of each other. Time-series data, for example, often violates this assumption because consecutive measurements are correlated.
- **Homoscedasticity.** The variance of the residuals is constant across all levels of the independent variables. If variance increases with the magnitude of predictions, the model's confidence intervals become unreliable.
- **Normality of residuals.** The residuals follow a normal distribution. This matters most for hypothesis testing and confidence intervals; predictions can still be reasonable even when normality is mildly violated.
- **No multicollinearity.** The independent variables are not highly correlated with each other. Strong multicollinearity inflates the variance of coefficient estimates and makes it difficult to determine the individual effect of each predictor.

## Evaluation Metrics

Assessing model quality requires quantitative metrics that capture how well the model fits the training data and how well it generalizes to new data.

| Metric | Description | Interpretation |
|---|---|---|
| R-squared | Proportion of variance in the dependent variable explained by the model | Ranges from 0 to 1; higher is better |
| Adjusted R-squared | R-squared adjusted for the number of predictors | Penalizes unnecessary features; better for model comparison |
| Mean Squared Error (MSE) | Average of the squared differences between observed and predicted values | Lower is better; sensitive to outliers |
| Root Mean Squared Error (RMSE) | Square root of MSE | Same units as the dependent variable; easier to interpret |
| Mean Absolute Error (MAE) | Average of the absolute differences between observed and predicted values | Lower is better; more robust to outliers than MSE |

## Practical Applications in Technology

Linear regression is used across many domains within the technology industry. Its transparency and speed make it especially valuable when stakeholders need to understand why a model produces a given prediction.

- **Capacity planning.** Predicting future resource needs such as CPU utilization, memory consumption, or network bandwidth based on historical usage trends and growth indicators.
- **Cost estimation.** Estimating development effort, cloud infrastructure spend, or customer acquisition cost from project or campaign features.
- **Performance analysis.** Quantifying how factors like page load time, database query count, or payload size affect user engagement metrics such as bounce rate or conversion rate.
- **A/B testing.** Using regression adjustment to increase statistical power when analyzing the effect of a treatment while controlling for covariates.
- **Pricing models.** Determining how product attributes such as storage tier, compute capacity, or seat count relate to willingness to pay.

## Regularization

When a linear model has many features, it risks overfitting: fitting noise in the training data rather than the underlying signal. Regularization techniques address this by adding a penalty term to the cost function that discourages large coefficient values.

Ridge regression adds a penalty proportional to the sum of the squared coefficients. This shrinks all coefficients toward zero but does not eliminate any of them entirely. It is effective when many features each contribute small amounts of predictive power.

Lasso regression adds a penalty proportional to the sum of the absolute values of the coefficients. This can shrink some coefficients exactly to zero, performing automatic feature selection. It is useful when you suspect that only a subset of features are truly relevant.

Elastic Net combines both penalties, giving you a tunable balance between ridge and lasso behavior. It tends to outperform pure lasso when groups of features are correlated, because lasso arbitrarily selects one feature from each correlated group while elastic net tends to keep or drop them together.

## Strengths and Limitations

Linear regression offers significant advantages but also has clear boundaries on where it can be applied effectively.

**Strengths:**

- Fast to train and predict, even on large datasets.
- Coefficients are directly interpretable, making it easy to explain model behavior to non-technical stakeholders.
- Provides a strong baseline model that more complex methods should be compared against.
- Well-understood statistical theory supports rigorous hypothesis testing and confidence intervals.
- Requires relatively few hyperparameters to tune.

**Limitations:**

- Cannot capture non-linear relationships without manual feature engineering.
- Sensitive to outliers, especially when using least squares fitting.
- Assumes independence of observations, making it unsuitable for raw time-series or spatial data without modification.
- Performance degrades when features are highly collinear unless regularization is applied.
- Predicts continuous values only; classification tasks require logistic regression or other methods.

## Related

After understanding linear regression, the natural next topics include logistic regression for classification problems, polynomial regression for capturing non-linear relationships within a linear framework, and regularization techniques such as ridge, lasso, and elastic net in greater depth. Exploring gradient descent provides insight into how most machine learning models are optimized. Moving further, decision trees, random forests, and neural networks build on the predictive foundation that linear regression establishes, while Bayesian linear regression offers a probabilistic perspective on the same problem. For practitioners working with time-series data, autoregressive models extend linear regression concepts into the temporal domain.

## Summary

Linear regression is a foundational statistical and machine learning technique that models the relationship between a dependent variable and one or more independent variables by fitting a linear function to observed data. It is fast, interpretable, and backed by well-established theory, making it an essential tool for technology professionals working on prediction, analysis, and experimentation. Its assumptions, including linearity, independence, and homoscedasticity, must be verified for reliable inference. Regularization methods like ridge and lasso extend its applicability to high-dimensional settings. While more complex models may achieve higher accuracy on non-linear problems, linear regression remains the standard baseline and often the most practical choice when transparency and speed matter more than marginal gains in predictive power.

## References

- Freedman, D.A. (2009). *Statistical Models: Theory and Practice*. Cambridge University Press.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning: Data Mining, Inference, and Prediction* (2nd ed.). Springer. Available at https://hastie.su.domains/ElemStatLearn/
- James, G., Witten, D., Hastie, T., & Tibshirani, R. (2013). *An Introduction to Statistical Learning* (2nd ed.). Springer. Available at https://www.statlearning.com/
- Montgomery, D.C., Peck, E.A., & Vining, G.G. (2012). *Introduction to Linear Regression Analysis* (5th ed.). Wiley.
- Wikipedia. "Linear regression." https://en.wikipedia.org/wiki/Linear_regression
- scikit-learn documentation. "Linear Models." https://scikit-learn.org/stable/modules/linear_model.html
