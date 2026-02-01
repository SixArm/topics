# Machine Learning Accuracy

## Introduction

Accuracy is one of the most fundamental performance metrics in machine learning, particularly for classification tasks. It provides a straightforward measure of how well a model performs by calculating the proportion of correct predictions out of all predictions made. While intuitive and widely used, accuracy has important limitations that every technology professional must understand to properly evaluate machine learning models.

## Definition and Formula

Accuracy measures the overall correctness of a classification model. It answers a simple question: "Of all the predictions made, how many were correct?"

**Formula:**

Accuracy = (Number of Correct Predictions) / (Total Number of Predictions)

Alternatively, expressed in terms of the confusion matrix:

Accuracy = (True Positives + True Negatives) / (True Positives + True Negatives + False Positives + False Negatives)

A model with 95% accuracy correctly classifies 95 out of every 100 samples.

## The Confusion Matrix Foundation

Understanding accuracy requires understanding the confusion matrix—a table that describes the performance of a classification model:

| Actual \ Predicted | Positive | Negative |
|--------------------|----------|----------|
| **Positive** | True Positive (TP) | False Negative (FN) |
| **Negative** | False Positive (FP) | True Negative (TN) |

- **True Positive (TP):** Correctly predicted positive cases
- **True Negative (TN):** Correctly predicted negative cases
- **False Positive (FP):** Incorrectly predicted as positive (Type I error)
- **False Negative (FN):** Incorrectly predicted as negative (Type II error)

Accuracy combines TP and TN as successes against the total count of all four outcomes.

## When Accuracy Works Well

Accuracy is an appropriate metric under specific conditions:

- **Balanced datasets:** When classes are roughly equally represented
- **Equal misclassification costs:** When false positives and false negatives carry similar consequences
- **General performance overview:** When you need a quick, interpretable summary of model performance
- **Benchmarking:** When comparing models on well-balanced, standard datasets

## The Class Imbalance Problem

Accuracy can be severely misleading with imbalanced datasets. Consider a fraud detection system where only 1% of transactions are fraudulent:

| Model Behavior | Accuracy | Practical Value |
|----------------|----------|-----------------|
| Predicts "not fraud" for everything | 99% | Zero—catches no fraud |
| Correctly identifies 80% of fraud | 80.2% | High—actually useful |

The naive model achieves higher accuracy but provides no value. This is the **accuracy paradox**—high accuracy can mask poor performance on the minority class that often matters most.

## Accuracy Compared to Other Metrics

| Metric | What It Measures | Best Used When |
|--------|------------------|----------------|
| **Accuracy** | Overall correctness | Balanced classes, equal error costs |
| **Precision** | Correctness of positive predictions | False positives are costly |
| **Recall (Sensitivity)** | Coverage of actual positives | False negatives are costly |
| **F1 Score** | Harmonic mean of precision and recall | Imbalanced classes, need balance between precision and recall |
| **Specificity** | Coverage of actual negatives | True negative identification matters |
| **AUC-ROC** | Discriminative ability across thresholds | Comparing models, threshold-independent evaluation |

## Practical Considerations

### Choosing a Classification Threshold

Most classifiers output probabilities rather than hard predictions. The default threshold of 0.5 maximizes accuracy but may not optimize for business objectives:

- Lower threshold: Increases recall, captures more positives, generates more false positives
- Higher threshold: Increases precision, reduces false positives, misses more true positives

### Stratified Evaluation

Always use stratified sampling when splitting data for training and testing. This preserves class proportions and provides more reliable accuracy estimates.

### Cross-Validation

Single accuracy scores can be misleading due to variance. Use k-fold cross-validation to obtain:

- Mean accuracy across folds
- Standard deviation of accuracy
- Confidence intervals for true model performance

## Common Pitfalls

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Ignoring class imbalance | Misleading high accuracy | Use balanced accuracy, F1, or AUC-ROC |
| Training/test data leakage | Artificially inflated accuracy | Strict data separation, proper cross-validation |
| Overfitting to training data | High training accuracy, low test accuracy | Regularization, more data, simpler models |
| Reporting only accuracy | Incomplete performance picture | Report multiple metrics with confusion matrix |
| Ignoring confidence intervals | Overconfidence in point estimates | Use cross-validation, report variance |

## Balanced Accuracy

For imbalanced datasets, balanced accuracy provides a fairer assessment:

Balanced Accuracy = (Sensitivity + Specificity) / 2

This gives equal weight to performance on each class, regardless of class size.

| Scenario | Standard Accuracy | Balanced Accuracy |
|----------|-------------------|-------------------|
| 90/10 class split, model predicts majority class only | 90% | 50% |
| Same split, model performs equally on both classes | 90% | 90% |

## Industry Applications and Metric Selection

| Domain | Primary Concern | Recommended Metrics |
|--------|-----------------|---------------------|
| Medical diagnosis | Missing disease cases | Recall, sensitivity, NPV |
| Spam filtering | Blocking legitimate email | Precision, specificity |
| Credit scoring | Balanced risk assessment | AUC-ROC, balanced accuracy |
| Manufacturing QA | Detecting defects | Recall, F1 score |
| Recommendation systems | User engagement | Precision@K, NDCG |

## Best Practices

- **Never rely on accuracy alone.** Always examine the confusion matrix and compute multiple metrics.
- **Know your class distribution.** Imbalanced data requires different evaluation strategies.
- **Understand business costs.** Different errors have different consequences; weight metrics accordingly.
- **Report with context.** Include baseline accuracy (random or majority-class classifier) for comparison.
- **Use appropriate visualization.** ROC curves and precision-recall curves reveal more than single numbers.
- **Document threshold choices.** If using a non-default classification threshold, explain why.

## Summary

Accuracy remains a valuable and intuitive metric for machine learning classification, but it requires careful interpretation. Its primary limitation—susceptibility to class imbalance—makes it insufficient as a standalone evaluation measure for most real-world applications. Technology professionals should treat accuracy as one component of a comprehensive evaluation strategy that includes precision, recall, F1 score, and domain-specific metrics aligned with business objectives. The best model is rarely the one with the highest accuracy; it is the one that best balances the costs of different types of errors for the specific use case.
