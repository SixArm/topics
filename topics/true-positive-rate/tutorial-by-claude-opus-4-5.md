## True Positive Rate (TPR)

The true positive rate is a fundamental metric for evaluating classification models in machine learning, statistics, and data science. Also known as **sensitivity**, **recall**, or **hit rate**, TPR measures how effectively a model identifies positive cases from all actual positive instances.

## Definition and Formula

The true positive rate answers a straightforward question: *Of all the instances that are actually positive, what proportion did the model correctly identify?*

**Formula:**

TPR = True Positives / (True Positives + False Negatives)

| Component | Definition |
|-----------|------------|
| True Positives (TP) | Instances that are actually positive and correctly classified as positive |
| False Negatives (FN) | Instances that are actually positive but incorrectly classified as negative |

The result is a value between 0 and 1, often expressed as a percentage. A TPR of 1.0 (100%) means the model correctly identified every positive instance.

## Why True Positive Rate Matters

TPR is critical in domains where missing positive cases carries significant consequences:

- **Medical diagnostics**: Failing to detect a disease (false negative) can delay treatment and harm patients
- **Fraud detection**: Missing fraudulent transactions allows financial losses
- **Security screening**: Failing to identify threats creates safety risks
- **Quality control**: Missing defective products leads to customer complaints and recalls

In these scenarios, a high TPR is often prioritized over other metrics because the cost of a false negative far exceeds the cost of a false positive.

## TPR vs. Related Metrics

| Metric | Also Known As | What It Measures |
|--------|---------------|------------------|
| True Positive Rate | Sensitivity, Recall | Proportion of actual positives correctly identified |
| True Negative Rate | Specificity | Proportion of actual negatives correctly identified |
| Precision | Positive Predictive Value | Proportion of predicted positives that are actually positive |
| Accuracy | — | Proportion of all predictions that are correct |

## The TPR-Specificity Trade-off

TPR and specificity (true negative rate) often exist in tension. Adjusting a classification threshold to catch more positive cases (increasing TPR) typically means more false positives, which reduces specificity. This trade-off is visualized in ROC (Receiver Operating Characteristic) curves.

| Threshold Adjustment | Effect on TPR | Effect on Specificity |
|---------------------|---------------|----------------------|
| Lower threshold (more liberal) | Increases | Decreases |
| Higher threshold (more conservative) | Decreases | Increases |

## When to Prioritize TPR

Prioritize high TPR when:

- False negatives are costly or dangerous
- The positive class is rare and must not be missed
- Downstream processes can handle false positives efficiently
- The application is screening or triage-oriented

Deprioritize TPR (in favor of precision or specificity) when:

- False positives are expensive or disruptive
- Resources for investigating positives are limited
- The positive class is common

## TPR in Model Evaluation

TPR is typically used alongside other metrics for comprehensive model assessment:

- **F1 Score**: Harmonic mean of precision and recall (TPR), balancing both concerns
- **ROC-AUC**: Area under the ROC curve, which plots TPR against false positive rate across thresholds
- **Precision-Recall Curve**: Visualizes the precision-recall trade-off, useful for imbalanced datasets

## Practical Considerations

- **Class imbalance**: In datasets where positives are rare, a model can achieve high accuracy by predicting negative for everything—but TPR would be 0%. Always check TPR separately.
- **Threshold tuning**: Classification thresholds can be adjusted post-training to optimize for TPR at an acceptable false positive rate.
- **Domain context**: The acceptable TPR depends entirely on the application. Medical screening tests often target TPR above 95%, while other applications may accept lower values.

## Summary

The true positive rate measures a model's ability to correctly identify positive instances. It is essential for applications where missing positives has serious consequences. When evaluating classification models, always consider TPR alongside precision, specificity, and overall accuracy to understand the full picture of model performance.
