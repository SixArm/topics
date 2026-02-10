# True positive rate (TPR)

The true positive rate (TPR) is a fundamental evaluation metric in machine learning and statistics that measures a model's ability to correctly identify positive instances. Also known as sensitivity, recall, or hit rate, TPR quantifies the proportion of actual positives that a classifier successfully detects. It is one of the most important metrics for understanding model performance, particularly in domains where failing to detect a positive case carries significant consequences, such as medical diagnosis, fraud detection, and security screening.

## Definition and Formula

The true positive rate is calculated as the ratio of true positives to the total number of actual positive instances. The formula is:

**TPR = True Positives / (True Positives + False Negatives)**

Where:

- **True Positives (TP)**: Instances that are actually positive and are correctly classified as positive by the model.
- **False Negatives (FN)**: Instances that are actually positive but are incorrectly classified as negative by the model.

A TPR of 1.0 (or 100%) means the model correctly identified every positive instance with no misses. A TPR of 0.0 means the model failed to detect any positive instance at all. In practice, most models fall somewhere between these extremes, and the acceptable threshold depends on the application domain and the cost of errors.

## Alternative Names

The true positive rate is referred to by several equivalent names across different disciplines. Understanding these synonyms is important when reading research papers, documentation, or tooling from different fields.

| Name | Field of Origin | Context |
|------|----------------|---------|
| Sensitivity | Medicine and epidemiology | Diagnostic test evaluation |
| Recall | Information retrieval and NLP | Search engines, text classification |
| Hit rate | Signal detection theory | Radar, quality control |
| Detection rate | Security and surveillance | Intrusion detection, threat analysis |
| Power (1 - Beta) | Hypothesis testing | Statistical significance testing |

All of these terms describe the same underlying calculation. The choice of terminology typically reflects the professional community and application context rather than any mathematical distinction.

## The Confusion Matrix

The true positive rate derives from the confusion matrix, which is the foundational structure for binary classification evaluation. The confusion matrix organizes predictions into four categories:

| | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actually Positive** | True Positive (TP) | False Negative (FN) |
| **Actually Negative** | False Positive (FP) | True Negative (TN) |

The true positive rate specifically focuses on the top row of this matrix: the actual positive instances. It answers the question, "Of all the instances that were truly positive, how many did the model correctly identify?" This row-based perspective distinguishes TPR from metrics like precision, which operates on a column of the confusion matrix.

## Practical Applications

The true positive rate is especially critical in scenarios where missing a positive case has severe consequences. Key application areas include:

- **Medical diagnostics**: A screening test for cancer must have a high TPR to minimize the number of patients with cancer who are incorrectly told they are healthy. A missed diagnosis (false negative) can delay treatment and worsen patient outcomes.
- **Fraud detection**: Financial institutions rely on high TPR to catch fraudulent transactions. Missed fraud results in direct monetary losses and eroded customer trust.
- **Security and intrusion detection**: Network security systems must detect as many genuine threats as possible. A low TPR means attackers slip through undetected.
- **Quality control in manufacturing**: Defective products must be caught before reaching customers. A low TPR means defective items pass inspection and reach the market.
- **Search and information retrieval**: In search engines and recommendation systems, recall (TPR) measures how many of the relevant documents or items the system successfully returns to the user.

## TPR vs. Other Metrics

Understanding where TPR fits among other classification metrics is essential for choosing the right evaluation strategy. Each metric captures a different aspect of model performance.

| Metric | Formula | What It Measures |
|--------|---------|-----------------|
| True Positive Rate (Recall) | TP / (TP + FN) | Proportion of actual positives correctly identified |
| Precision | TP / (TP + FP) | Proportion of predicted positives that are correct |
| Specificity (True Negative Rate) | TN / (TN + FP) | Proportion of actual negatives correctly identified |
| Accuracy | (TP + TN) / (TP + TN + FP + FN) | Overall proportion of correct predictions |
| F1 Score | 2 × (Precision × Recall) / (Precision + Recall) | Harmonic mean of precision and recall |

TPR and precision often exist in tension. Increasing TPR (catching more positives) typically increases false positives, which reduces precision. The F1 score balances these two concerns. Specificity complements TPR by measuring how well the model handles negatives. Accuracy can be misleading in imbalanced datasets where one class dominates, making TPR a more informative metric in those situations.

## The Precision-Recall Trade-Off

In most classifiers, there is an inherent trade-off between TPR (recall) and precision. Adjusting the decision threshold of a model shifts performance along this trade-off curve:

- **Lowering the threshold** causes the model to classify more instances as positive. This increases TPR because fewer positives are missed, but it also increases false positives, reducing precision.
- **Raising the threshold** causes the model to be more conservative in predicting positives. This increases precision because the model is more confident in its positive predictions, but it decreases TPR because more actual positives are missed.

The optimal threshold depends on the relative costs of false negatives versus false positives. In a cancer screening scenario, a low threshold (high TPR) is preferred because missing a case is far worse than a false alarm. In an email spam filter, a higher threshold (higher precision) may be preferred because incorrectly marking a legitimate email as spam is more disruptive than letting occasional spam through.

## ROC Curves and AUC

The Receiver Operating Characteristic (ROC) curve is a graphical tool that plots TPR against the false positive rate (FPR = 1 - Specificity) at various classification thresholds. The ROC curve provides a comprehensive view of model performance across all possible thresholds.

- A model with perfect classification produces a curve that passes through the top-left corner (TPR = 1, FPR = 0).
- A model performing no better than random chance produces a diagonal line from the bottom-left to the top-right corner.
- The Area Under the Curve (AUC) summarizes the ROC curve into a single number between 0 and 1, where higher values indicate better overall discriminative ability.

The ROC curve is particularly useful for comparing multiple models, selecting optimal thresholds, and evaluating model performance independently of class distribution. TPR is one of the two axes of the ROC curve, making it central to this widely used evaluation framework.

## Common Pitfalls

When working with TPR, technology professionals should be aware of several common issues:

- **Ignoring class imbalance**: A high TPR can be achieved trivially by classifying everything as positive. This strategy yields TPR = 1.0 but also produces an unacceptable number of false positives. TPR should always be evaluated alongside precision or specificity.
- **Optimizing TPR in isolation**: Maximizing TPR without regard for other metrics leads to models that flag nearly everything as positive. This defeats the purpose of classification and overwhelms downstream systems or human reviewers.
- **Confusing TPR with accuracy**: Accuracy measures overall correctness, while TPR measures detection of positives specifically. In a dataset with 99% negatives, a model that predicts everything as negative achieves 99% accuracy but 0% TPR.
- **Threshold sensitivity**: TPR is highly dependent on the classification threshold. Reporting TPR without specifying the threshold or the full ROC curve gives an incomplete picture of model performance.

## Related

Related topics to learn next include precision, which measures the correctness of positive predictions; specificity and the true negative rate, which measure performance on the negative class; the F1 score, which combines precision and recall into a single metric; ROC curves and AUC for threshold-independent evaluation; the confusion matrix for understanding the full landscape of classification outcomes; false positive rate and false negative rate for understanding error types; and class imbalance techniques such as oversampling and undersampling that directly affect TPR in real-world datasets.

## Summary

The true positive rate is a critical metric for evaluating how effectively a classification model detects positive instances. Calculated as the ratio of true positives to all actual positives, it answers the fundamental question of whether a model can reliably find what it is looking for. TPR is essential in high-stakes domains such as healthcare, security, and fraud detection, where missed positives carry severe consequences. However, it must be interpreted alongside complementary metrics such as precision, specificity, and the F1 score to provide a complete and balanced assessment of model quality. Understanding TPR, its trade-offs, and its role within the broader evaluation framework is foundational knowledge for any technology professional working with classification models.

## References

- Fawcett, T. (2006). "An Introduction to ROC Analysis." *Pattern Recognition Letters*, 27(8), 861-874.
- Powers, D. M. W. (2011). "Evaluation: From Precision, Recall and F-Measure to ROC, Informedness, Markedness and Correlation." *Journal of Machine Learning Technologies*, 2(1), 37-63.
- Sokolova, M., & Lapalme, G. (2009). "A Systematic Analysis of Performance Measures for Classification Tasks." *Information Processing & Management*, 45(4), 427-437.
- Davis, J., & Goadrich, M. (2006). "The Relationship Between Precision-Recall and ROC Curves." *Proceedings of the 23rd International Conference on Machine Learning*, 233-240.
- Scikit-learn documentation: Classification metrics. https://scikit-learn.org/stable/modules/model_evaluation.html
