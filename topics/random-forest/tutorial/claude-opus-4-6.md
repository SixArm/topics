# Random forest

Random forest is an ensemble learning technique that leverages the strength of multiple decision trees to create a robust and accurate predictive model. It is widely used for both classification and regression tasks, building a "forest" of individually trained decision trees and combining their predictions to improve overall accuracy and generalization. Introduced by Leo Breiman in 2001, random forest has become one of the most popular and reliable algorithms in machine learning due to its strong out-of-the-box performance, resistance to overfitting, and ability to handle high-dimensional data with minimal tuning.

## How it works

Random forest operates through a three-stage process that introduces controlled randomness at multiple points, ensuring that the individual trees in the ensemble are diverse and that their combined output is more stable than any single tree.

**Bootstrapped sampling.** The algorithm creates multiple random subsets, called bootstrapped samples, from the original training dataset. Each subset contains the same number of data points as the original dataset but is drawn with replacement, meaning some instances may appear more than once while others are left out entirely. The instances not selected for a given bootstrap sample are called out-of-bag (OOB) samples and can be used for internal validation without a separate test set.

**Decision tree construction.** For each bootstrapped sample, a full decision tree is grown. At each node split, only a random subset of features is considered as candidates, rather than evaluating all available features. This feature subsampling is the key mechanism that decorrelates the trees and prevents any single dominant feature from dictating the structure of every tree in the forest.

**Voting or averaging.** For classification tasks, each tree in the forest votes for a class label, and the class receiving the most votes becomes the final prediction (majority voting). For regression tasks, the predictions from all trees are averaged to produce the final continuous output. This aggregation step, known as bagging (bootstrap aggregating), reduces variance and smooths out individual tree errors.

## Key features and advantages

Random forest offers several practical benefits that make it a go-to algorithm for many machine learning workflows.

- **Robustness to overfitting.** By averaging the outputs of many decorrelated trees, random forest significantly reduces the variance that plagues individual decision trees, making it far less prone to overfitting on noisy data.
- **Feature importance estimation.** The algorithm naturally provides measures of feature importance, such as mean decrease in impurity (Gini importance) or permutation importance, which help practitioners understand which variables drive predictions.
- **Handles mixed data types.** Random forest works well with both categorical and numerical features without requiring extensive preprocessing such as normalization or one-hot encoding.
- **Parallelization.** Because each tree is built independently, training can be parallelized across multiple CPU cores, making it efficient even on large datasets.
- **Few hyperparameters.** The algorithm performs well with minimal tuning. The most important parameters are the number of trees and the number of features considered at each split, both of which have sensible defaults.
- **Built-in validation.** The out-of-bag error estimate provides a reliable measure of generalization performance without the need for a separate validation set or cross-validation.

## Limitations

Despite its strengths, random forest has trade-offs that practitioners should be aware of.

- **Interpretability.** A forest of hundreds or thousands of trees is far harder to interpret than a single decision tree. While feature importance scores offer some insight, understanding exactly why a specific prediction was made requires additional tools such as SHAP or LIME.
- **Memory and compute cost.** Storing and running inference across many full-depth trees can be memory-intensive, particularly for very large datasets or real-time applications with strict latency requirements.
- **Bias-variance trade-off.** Random forest primarily reduces variance. If the individual trees are biased (for example, when relationships in the data are highly linear), the ensemble will inherit that bias, and a simpler model such as linear regression may outperform it.
- **Performance on very high-dimensional sparse data.** On datasets with extremely high dimensionality and sparsity, such as text data represented as bag-of-words, gradient boosting methods or neural networks often outperform random forest.

## Comparison with related algorithms

| Algorithm | Approach | Strengths | Weaknesses |
|---|---|---|---|
| Single decision tree | One tree, full feature set | Easy to interpret, fast to train | High variance, prone to overfitting |
| Random forest | Bagging with feature subsampling | Robust, parallel, good defaults | Less interpretable, higher memory |
| Gradient boosting (XGBoost, LightGBM) | Sequential boosting of weak learners | Often higher accuracy, handles bias well | Slower to train, sensitive to hyperparameters |
| Support vector machine | Hyperplane-based classification | Effective in high dimensions | Scales poorly to large datasets |
| Neural network | Layered nonlinear transformations | State-of-the-art on unstructured data | Requires large data, complex tuning |

## Hyperparameters

The most important hyperparameters to consider when configuring a random forest model are:

- **Number of trees (n_estimators).** More trees generally improve performance and stability but increase training time and memory. Typical values range from 100 to 1,000, with diminishing returns beyond a few hundred.
- **Maximum features per split (max_features).** Controls the number of features considered at each split. Common defaults are the square root of the total number of features for classification and one-third for regression.
- **Maximum depth (max_depth).** Limits how deep each tree can grow. Unrestricted depth is the default and often works well, but capping depth can reduce memory use and training time.
- **Minimum samples per leaf (min_samples_leaf).** Sets a floor on the number of samples required at a leaf node. Increasing this value regularizes the model and can prevent overfitting on noisy data.
- **Number of bootstrap samples (max_samples).** Allows training each tree on a fraction of the dataset, which can speed up training on very large datasets.

## When to use random forest

Random forest is an excellent default choice in the following scenarios:

- **Tabular data.** It consistently performs well on structured, tabular datasets common in business, healthcare, and scientific applications.
- **Baseline modeling.** Its minimal tuning requirements make it ideal as a strong baseline before exploring more complex methods.
- **Feature selection.** Feature importance scores can guide dimensionality reduction and help identify the most predictive variables in a dataset.
- **Mixed data quality.** It handles missing values (with imputation), outliers, and imbalanced classes (with class weighting) more gracefully than many alternatives.
- **Situations requiring stability.** When consistent, reliable predictions are more important than squeezing out the last fraction of a percent of accuracy, random forest is a dependable choice.

## Related

Related topics to explore next include decision trees as the foundational building block of random forest, gradient boosting methods such as XGBoost and LightGBM that take a different approach to ensemble learning, bagging and bootstrap aggregation as the statistical technique underpinning the algorithm, feature importance and model interpretability techniques such as SHAP values and permutation importance, hyperparameter tuning strategies including grid search and Bayesian optimization, and cross-validation methods for robust model evaluation.

## Summary

Random forest is a versatile and powerful ensemble learning algorithm that combines the predictions of many independently trained decision trees to deliver robust, accurate models for classification and regression. Its core mechanism of bootstrapped sampling with random feature subsampling creates diversity among trees, reducing variance and improving generalization. With practical advantages including minimal hyperparameter tuning, built-in feature importance estimation, natural parallelization, and out-of-bag validation, random forest remains one of the most reliable and widely adopted algorithms in the machine learning practitioner's toolkit.

## References

- Breiman, L. (2001). "Random Forests." *Machine Learning*, 45(1), 5–32. https://doi.org/10.1023/A:1010933404324
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer. Chapter 15: Random Forests.
- Scikit-learn documentation: Random Forest. https://scikit-learn.org/stable/modules/ensemble.html#random-forests
- Louppe, G. (2014). "Understanding Random Forests: From Theory to Practice." PhD thesis, University of Liège. https://arxiv.org/abs/1407.7502
- Probst, P., Wright, M. N., & Boulesteix, A.-L. (2019). "Hyperparameters and Tuning Strategies for Random Forest." *WIREs Data Mining and Knowledge Discovery*, 9(3), e1301. https://doi.org/10.1002/widm.1301
