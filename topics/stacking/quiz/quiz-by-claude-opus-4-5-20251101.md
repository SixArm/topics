# Stacking

Question: In stacking (stacked generalization), what is the role of the meta-model?

- [ ] To perform feature selection on the original dataset before training begins
- [ ] To split the dataset into training and validation subsets using cross-validation
- [ ] To learn how to optimally combine the predictions of base models into a final prediction
- [ ] To train each base model independently on different subsets of data

<details>
  <summary>Answer</summary>
  <p>To learn how to optimally combine the predictions of base models into a final prediction</p>
  <p>In stacking, the meta-model (second-level model) receives the predictions from all base models (first-level models) as its input features. It learns to weigh and combine these predictions to produce an optimal final output. This allows the ensemble to leverage the complementary strengths of different base models while minimizing their individual weaknesses.</p>
</details>
