# Machine learning accuracy

Question: Why can high accuracy be a misleading metric when evaluating a machine learning classification model?

- [ ] Because accuracy only measures the speed of predictions, not their correctness
- [ ] Because accuracy requires manual calibration for each new dataset
- [ ] Because accuracy cannot be calculated for models with more than two classes
- [ ] Because with imbalanced datasets, high accuracy may simply reflect correct prediction of the dominant class

<details>
  <summary>Answer</summary>
  <p>Because with imbalanced datasets, high accuracy may simply reflect correct prediction of the dominant class</p>
  <p>Accuracy measures the proportion of correct predictions over total predictions. However, when one class significantly outnumbers another in a dataset, a model can achieve high accuracy by predominantly predicting the majority class while performing poorly on the minority class. This is why practitioners often use additional metrics like precision, recall, and F1-score alongside accuracy when working with imbalanced data.</p>
</details>
