# Precision

## Overview

Precision is a fundamental evaluation metric in machine learning and statistical analysis that answers a critical question: **when your model predicts a positive outcome, how often is that prediction correct?**

In practical terms, precision measures the reliability of positive predictions. A model with high precision makes few false positive errors—when it says "yes," you can trust that answer.

## The Precision Formula

Precision is calculated using the following formula:

**Precision = TP / (TP + FP)**

Where:
- **TP (True Positives)**: Cases correctly identified as positive
- **FP (False Positives)**: Cases incorrectly identified as positive (actual negatives predicted as positive)

## Understanding the Confusion Matrix Context

Precision draws its values from the confusion matrix, which categorizes all predictions into four outcomes:

| Prediction | Actual Positive | Actual Negative |
|------------|-----------------|-----------------|
| Predicted Positive | True Positive (TP) | False Positive (FP) |
| Predicted Negative | False Negative (FN) | True Negative (TN) |

Precision focuses exclusively on the top row—the cases where the model predicted positive.

## Precision vs. Accuracy

These metrics serve different purposes and should not be confused:

| Aspect | Precision | Accuracy |
|--------|-----------|----------|
| Formula | TP / (TP + FP) | (TP + TN) / (TP + TN + FP + FN) |
| Focus | Quality of positive predictions | Overall correctness |
| Question answered | "How reliable are positive predictions?" | "How often is the model correct overall?" |
| Sensitive to class imbalance | Less affected | Highly affected |
| Best used when | False positives are costly | Classes are balanced |

## Precision vs. Recall

Precision and recall form a complementary pair, often in tension with each other:

| Aspect | Precision | Recall |
|--------|-----------|--------|
| Formula | TP / (TP + FP) | TP / (TP + FN) |
| Focus | Avoiding false positives | Avoiding false negatives |
| Question answered | "Of predicted positives, how many are correct?" | "Of actual positives, how many were found?" |
| Priority | When false alarms are expensive | When missing cases is expensive |

## When to Prioritize Precision

Precision becomes the critical metric when false positives carry significant consequences:

- **Spam detection**: Marking legitimate emails as spam frustrates users and may cause them to miss important communications
- **Fraud alerts**: Too many false alarms lead to alert fatigue and wasted investigation resources
- **Medical screening follow-ups**: Unnecessary invasive procedures carry risk and cost
- **Content moderation**: Incorrectly removing legitimate content damages user trust and engagement
- **Criminal justice risk assessment**: False accusations have severe consequences for individuals

## When Precision May Be Secondary

In some scenarios, other metrics take priority:

- **Disease screening**: Missing a cancer diagnosis (false negative) is far worse than ordering additional tests (false positive)
- **Security threat detection**: Failing to detect an intrusion is catastrophic compared to investigating false alarms
- **Search and rescue**: Missing a survivor is unacceptable even if it means checking many empty locations

## The Precision-Recall Tradeoff

Adjusting a model's decision threshold creates an inverse relationship between precision and recall:

- **Raising the threshold** (more conservative predictions): Precision increases, recall decreases
- **Lowering the threshold** (more liberal predictions): Recall increases, precision decreases

This tradeoff requires deliberate business decisions about acceptable error types.

## F1 Score: Balancing Precision and Recall

When both precision and recall matter, the F1 score provides a single balanced metric:

**F1 = 2 × (Precision × Recall) / (Precision + Recall)**

The F1 score is the harmonic mean of precision and recall, penalizing extreme imbalances between them.

## Practical Interpretation Guidelines

| Precision Value | Interpretation |
|-----------------|----------------|
| 0.95 - 1.00 | Excellent; positive predictions are highly reliable |
| 0.80 - 0.94 | Good; most positive predictions are correct |
| 0.60 - 0.79 | Moderate; significant false positive rate |
| Below 0.60 | Poor; positive predictions are often wrong |

These thresholds vary by domain—a 0.70 precision might be acceptable for content recommendations but unacceptable for medical diagnoses.

## Common Pitfalls

- **Ignoring class imbalance**: High precision can be misleading with heavily imbalanced datasets
- **Optimizing precision alone**: Achieving perfect precision is trivial—predict positive only for the most obvious cases, sacrificing recall entirely
- **Forgetting business context**: The right precision threshold depends on the cost ratio of false positives to false negatives
- **Aggregating improperly**: Micro-averaging and macro-averaging precision across multiple classes yield different insights

## Key Takeaways

- Precision measures the trustworthiness of positive predictions
- It answers: "When the model says yes, how often is it right?"
- Prioritize precision when false positives are costly or dangerous
- Always consider precision alongside recall and business requirements
- No single metric tells the complete story—precision is one tool in a comprehensive evaluation strategy
