# Accuracy

## Introduction

Accuracy is one of the most fundamental metrics in machine learning and data science for evaluating model performance. It provides a straightforward answer to the question: "How often does the model predict correctly?" While accuracy is intuitive and widely used, understanding its proper application, limitations, and relationship to other metrics is essential for technology professionals working with predictive systems.

## Definition and Formula

Accuracy measures the proportion of correct predictions (both positive and negative) among the total number of cases examined. The formula is:

**Accuracy = (TP + TN) / (TP + FP + TN + FN)**

Where:
- **TP (True Positives)**: Correctly predicted positive cases
- **TN (True Negatives)**: Correctly predicted negative cases
- **FP (False Positives)**: Incorrectly predicted as positive (Type I error)
- **FN (False Negatives)**: Incorrectly predicted as negative (Type II error)

## The Confusion Matrix

Understanding accuracy requires familiarity with the confusion matrix, which summarizes prediction results:

| | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actual Positive** | True Positive (TP) | False Negative (FN) |
| **Actual Negative** | False Positive (FP) | True Negative (TN) |

## Practical Example

Consider a spam detection model evaluated on 1,000 emails:
- 800 legitimate emails correctly identified (TN)
- 150 spam emails correctly identified (TP)
- 30 spam emails missed (FN)
- 20 legitimate emails incorrectly flagged as spam (FP)

Accuracy = (150 + 800) / (150 + 20 + 800 + 30) = 950 / 1000 = **95%**

## When Accuracy Works Well

Accuracy is most reliable when:
- The dataset has **balanced classes** (roughly equal numbers of positive and negative cases)
- The **costs of errors are similar** (false positives and false negatives have comparable consequences)
- You need a **quick, interpretable metric** for initial model assessment

## The Class Imbalance Problem

Accuracy can be misleading with imbalanced datasets. Consider a fraud detection scenario where only 1% of transactions are fraudulent:

| Model | Approach | Accuracy |
|---|---|---|
| Naive Model | Predicts all transactions as legitimate | 99% |
| Actual Detector | Catches 80% of fraud | 98.8% |

The naive model achieves higher accuracy but provides no value. This phenomenon is called the **accuracy paradox**.

## Accuracy vs. Related Metrics

| Metric | Formula | Best For |
|---|---|---|
| **Accuracy** | (TP+TN) / Total | Balanced datasets, equal error costs |
| **Precision** | TP / (TP+FP) | When false positives are costly |
| **Recall (Sensitivity)** | TP / (TP+FN) | When false negatives are costly |
| **F1 Score** | 2 × (Precision × Recall) / (Precision + Recall) | Imbalanced datasets |
| **Specificity** | TN / (TN+FP) | When identifying negatives matters |

## Domain-Specific Considerations

Different domains prioritize different error types:

- **Medical diagnosis**: Recall is often prioritized—missing a disease (FN) is typically worse than a false alarm (FP)
- **Email spam filtering**: Precision matters—blocking legitimate email (FP) frustrates users more than letting spam through (FN)
- **Security systems**: Context-dependent—airport security prioritizes recall, while fraud alerts may balance both

## Improving Model Accuracy

Strategies to enhance accuracy include:

- **Feature engineering**: Create more informative input variables
- **Data quality**: Clean outliers, handle missing values, correct labeling errors
- **Algorithm selection**: Test multiple approaches suited to your problem type
- **Hyperparameter tuning**: Optimize model configuration through grid search or Bayesian optimization
- **Ensemble methods**: Combine multiple models to reduce individual weaknesses
- **Addressing imbalance**: Use oversampling, undersampling, or synthetic data generation (SMOTE)

## Reporting Accuracy Responsibly

When communicating accuracy metrics:

- Always report the **class distribution** of your test set
- Include **confidence intervals** when sample sizes are limited
- Provide **complementary metrics** (precision, recall, F1) for complete context
- Use **stratified cross-validation** to ensure reliable estimates
- Distinguish between **training, validation, and test accuracy** to assess overfitting

## Common Pitfalls

- **Overfitting to accuracy**: Optimizing solely for accuracy can mask poor performance on minority classes
- **Ignoring business context**: A 90% accurate model may be useless if the 10% errors occur in critical cases
- **Test set contamination**: Accidentally training on test data inflates reported accuracy
- **Temporal leakage**: Using future information to predict past events produces unrealistic accuracy

## Summary

Accuracy remains a valuable starting point for model evaluation due to its simplicity and interpretability. However, technology professionals must recognize its limitations, particularly with imbalanced datasets or when error costs differ. Combining accuracy with precision, recall, and F1 score provides a more complete picture of model performance. The best metric always depends on the specific business problem and the relative costs of different types of errors.
