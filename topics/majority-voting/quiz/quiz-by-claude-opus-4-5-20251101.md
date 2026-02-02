# Majority voting

Question: What is the primary mechanism by which majority voting improves prediction accuracy in machine learning?

- [ ] It uses a single highly-tuned model to maximize performance
- [ ] It applies gradient descent across multiple model outputs
- [ ] It combines predictions from multiple models, where the class receiving the most votes becomes the final prediction
- [ ] It weights each model's prediction by its training accuracy

<details>
  <summary>Answer</summary>
  <p>It combines predictions from multiple models, where the class receiving the most votes becomes the final prediction</p>
  <p>Majority voting is an ensemble technique that aggregates predictions from multiple individual models and selects the class label that receives the most votes. This approach mitigates the weaknesses of individual models—while one model might err on certain data types, another may perform better on those cases. By combining their predictions, the ensemble provides more accurate and robust results than any single model alone.</p>
</details>
