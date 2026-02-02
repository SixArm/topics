# Double descent

Question: What does the double descent phenomenon describe in machine learning?

- [ ] A training technique where the learning rate is reduced twice during optimization
- [ ] A data augmentation method that duplicates training samples with noise
- [ ] A second decrease in test error that occurs as model complexity increases beyond the interpolation threshold
- [ ] A regularization approach that applies dropout at two different layers

<details>
  <summary>Answer</summary>
  <p>A second decrease in test error that occurs as model complexity increases beyond the interpolation threshold</p>
  <p>Double descent refers to the counterintuitive behavior where test error initially increases with model complexity (as expected from classical bias-variance trade-off), but then decreases again when models become heavily overparameterized—having more parameters than training samples. This contradicts the traditional U-shaped error curve and helps explain why modern deep neural networks with massive parameter counts can still generalize well despite their capacity to perfectly interpolate training data.</p>
</details>
