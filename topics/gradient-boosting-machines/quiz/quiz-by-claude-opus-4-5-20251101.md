# Gradient Boosting Machines

Question: What is the core mechanism that distinguishes Gradient Boosting Machines from other ensemble methods?

- [ ] Training multiple independent models in parallel and averaging their predictions
- [ ] Randomly selecting features and samples to build uncorrelated trees
- [ ] Sequentially building weak learners that correct the errors of previous iterations by fitting to residual gradients
- [ ] Using a single deep decision tree with extensive pruning

<details>
  <summary>Answer</summary>
  <p>Sequentially building weak learners that correct the errors of previous iterations by fitting to residual gradients</p>
  <p>Gradient Boosting Machines work by iteratively training weak learners (typically decision trees) where each new learner focuses on minimizing the residual errors from previous predictions. The algorithm uses gradients of the loss function to guide each new base learner toward reducing errors, effectively building a strong model by sequentially correcting the mistakes of the ensemble.</p>
</details>
