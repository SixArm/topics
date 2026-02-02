# Ensemble learning algorithms

Question: What is the key difference between bagging and boosting ensemble methods?

- [ ] Bagging uses neural networks while boosting uses decision trees
- [ ] Bagging trains models in parallel on random data subsets, while boosting trains models sequentially with each focusing on predecessors' mistakes
- [ ] Bagging requires a meta-model while boosting uses voting
- [ ] Bagging only works with classification while boosting only works with regression

<details>
  <summary>Answer</summary>
  <p>Bagging trains models in parallel on random data subsets, while boosting trains models sequentially with each focusing on predecessors' mistakes</p>
  <p>Bagging (Bootstrap Aggregating) builds multiple models in parallel, each trained on a random subset of the training data, then combines outputs through averaging or voting. Boosting, in contrast, trains weak learners sequentially where each new model specifically focuses on correcting the mistakes made by its predecessors, then outputs a weighted combination of predictions. This fundamental architectural difference—parallel versus sequential training—is what distinguishes these two major ensemble approaches.</p>
</details>
