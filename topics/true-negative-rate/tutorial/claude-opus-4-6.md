# True negative rate (TNR)

The true negative rate (TNR), also known as specificity or the correct rejection rate, is a fundamental metric used in the evaluation of classification models in machine learning, statistics, and diagnostic testing. It quantifies how well a model or test correctly identifies negative cases, meaning it measures the proportion of actual negatives that are correctly classified as negative. TNR is especially important in domains where false positives carry significant consequences, such as medical screening, fraud detection, cybersecurity alerting, and quality assurance. Understanding TNR is essential for any technology professional who builds, evaluates, or relies on predictive systems.

## Definition and formula

The true negative rate is defined as the ratio of true negatives to the total number of actual negative instances. The formula is:

**TNR = True Negatives / (True Negatives + False Positives)**

Where:

- **True Negatives (TN):** Instances that are actually negative and are correctly classified as negative by the model.
- **False Positives (FP):** Instances that are actually negative but are incorrectly classified as positive by the model.

A TNR of 1.0 (or 100%) means the model correctly identifies every negative instance. A TNR of 0.0 means the model fails to identify any negative instance, classifying all negatives as positives.

## Confusion matrix context

TNR is derived from the confusion matrix, a 2x2 table that summarizes a binary classifier's predictions against the actual outcomes. The four cells of the confusion matrix are:

| | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actual Positive** | True Positive (TP) | False Negative (FN) |
| **Actual Negative** | False Positive (FP) | True Negative (TN) |

TNR focuses on the bottom row of this matrix: among all actual negatives, how many did the model correctly predict as negative? This distinguishes it from metrics like accuracy, which considers all predictions, or precision, which focuses on predicted positives.

## TNR compared to related metrics

TNR is one of several metrics derived from the confusion matrix. Understanding how it relates to other metrics is critical for selecting the right evaluation approach.

| Metric | Also known as | Formula | Focus |
|---|---|---|---|
| True Negative Rate | Specificity, selectivity | TN / (TN + FP) | Correctly identified negatives |
| True Positive Rate | Sensitivity, recall | TP / (TP + FN) | Correctly identified positives |
| Precision | Positive predictive value | TP / (TP + FP) | Accuracy of positive predictions |
| False Positive Rate | Fall-out | FP / (FP + TN) | Incorrectly flagged negatives |
| Accuracy | — | (TP + TN) / (TP + TN + FP + FN) | Overall correctness |
| F1 Score | — | 2 * (Precision * Recall) / (Precision + Recall) | Balance of precision and recall |

Note that TNR and the false positive rate (FPR) are complements: **FPR = 1 - TNR**. If a model has a specificity of 0.95, its false positive rate is 0.05.

## Why TNR matters

TNR is particularly important when the cost of false positives is high. Consider the following scenarios:

- **Medical screening:** A diagnostic test for a rare disease should have high specificity. Low TNR means many healthy patients receive false positive results, leading to unnecessary anxiety, follow-up testing, invasive procedures, and increased healthcare costs.
- **Spam filtering:** An email filter with low TNR will incorrectly classify legitimate emails as spam. Users may miss important messages, causing business disruption.
- **Fraud detection:** Financial transaction monitoring with poor specificity generates excessive false alerts, overwhelming analysts and causing alert fatigue, which can paradoxically cause real fraud to be missed.
- **Security intrusion detection:** A network intrusion detection system with low TNR floods security teams with false alarms, reducing operational effectiveness and trust in the system.
- **Quality assurance:** An automated inspection system that rejects too many good products (false positives) wastes materials and reduces throughput.

In each case, optimizing for TNR helps reduce the burden and cost of acting on incorrect positive predictions.

## The sensitivity-specificity tradeoff

TNR and TPR (sensitivity) typically exist in tension. Adjusting a model's decision threshold to increase specificity often decreases sensitivity, and vice versa. This tradeoff is fundamental to classifier design:

- **Raising the classification threshold** (requiring higher confidence to predict positive) increases TNR but may reduce TPR, meaning more true positives are missed.
- **Lowering the classification threshold** increases TPR but decreases TNR, meaning more negatives are falsely flagged as positive.

The Receiver Operating Characteristic (ROC) curve visualizes this tradeoff by plotting TPR against FPR (which is 1 - TNR) at various thresholds. The Area Under the ROC Curve (AUC-ROC) provides a single summary statistic of how well a model balances sensitivity and specificity across all thresholds.

Choosing the right balance depends on domain requirements. In criminal justice, a high TPR may be prioritized to avoid missing genuine threats. In medical screening for a condition with an effective but invasive treatment, a high TNR may be preferred to avoid subjecting healthy individuals to unnecessary procedures.

## TNR in imbalanced datasets

Class imbalance, where one class significantly outnumbers the other, has important implications for interpreting TNR. When the negative class is very large relative to the positive class, a model can achieve a high TNR simply by being conservative about predicting positive. In such cases:

- TNR alone can be misleading. A model that rarely predicts positive will have high specificity but may miss most actual positives.
- It is essential to evaluate TNR alongside sensitivity, precision, and the F1 score.
- Metrics like the Matthews Correlation Coefficient (MCC) or balanced accuracy (the average of TPR and TNR) can provide a more robust assessment of model performance on imbalanced data.

## Practical guidelines for using TNR

- **Always report TNR alongside complementary metrics.** TNR in isolation does not give a complete picture. Pair it with sensitivity, precision, and AUC-ROC.
- **Define acceptable TNR based on domain requirements.** Work with domain experts to determine what false positive rate is tolerable for the specific application.
- **Use threshold tuning.** Rather than accepting a model's default threshold, experiment with different thresholds to find the optimal balance between TNR and TPR for your use case.
- **Monitor TNR over time.** Model performance can drift as data distributions change. Regularly track specificity in production to detect degradation.
- **Consider the base rate.** The prevalence of the positive class affects the practical interpretation of TNR. In rare-event detection, even a small decrease in TNR can generate a large absolute number of false positives.

## Related

Related topics to explore next include: true positive rate (sensitivity/recall) and its complementary role to TNR; false positive rate and its relationship as 1 - TNR; precision and its focus on the reliability of positive predictions; the confusion matrix as the foundation for all classification metrics; ROC curves and AUC-ROC for visualizing and summarizing the sensitivity-specificity tradeoff; the F1 score for balancing precision and recall; balanced accuracy and the Matthews Correlation Coefficient for evaluating classifiers on imbalanced datasets; Bayesian reasoning and how base rates interact with sensitivity and specificity to determine predictive values; and threshold tuning strategies for optimizing classifier decisions in production systems.

## Summary

The true negative rate (TNR), or specificity, measures a classifier's ability to correctly identify negative instances and is calculated as the ratio of true negatives to the sum of true negatives and false positives. It is an indispensable metric in any domain where false positives are costly, disruptive, or dangerous. TNR must be interpreted alongside complementary metrics such as sensitivity, precision, and AUC-ROC, because optimizing for specificity alone can obscure weaknesses in detecting positive cases. The sensitivity-specificity tradeoff, governed by the classification threshold, is a central design decision in any binary classification system. Technology professionals should define acceptable TNR thresholds based on domain-specific cost analysis, monitor specificity in production, and use comprehensive evaluation frameworks to build reliable and trustworthy predictive systems.

## References

- Fawcett, T. (2006). "An introduction to ROC analysis." *Pattern Recognition Letters*, 27(8), 861–874. https://doi.org/10.1016/j.patrec.2005.10.010
- Powers, D. M. W. (2011). "Evaluation: From Precision, Recall and F-Measure to ROC, Informedness, Markedness and Correlation." *Journal of Machine Learning Technologies*, 2(1), 37–63.
- Sokolova, M., & Lapalme, G. (2009). "A systematic analysis of performance measures for classification tasks." *Information Processing & Management*, 45(4), 427–437. https://doi.org/10.1016/j.ipm.2009.03.002
- Chicco, D., & Jurman, G. (2020). "The advantages of the Matthews correlation coefficient (MCC) over F1 score and accuracy in binary classification evaluation." *BMC Genomics*, 21(1), 6. https://doi.org/10.1186/s12864-019-6413-7
- Wikipedia. "Sensitivity and specificity." https://en.wikipedia.org/wiki/Sensitivity_and_specificity
