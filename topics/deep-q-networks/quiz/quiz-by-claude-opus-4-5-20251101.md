# Deep Q Networks

Question: What technique do Deep Q Networks use to stabilize training by storing and randomly sampling past experiences?

- [ ] Epsilon-Greedy Exploration
- [ ] Experience Replay
- [ ] Dueling Architecture
- [ ] Bellman Optimization

<details>
  <summary>Answer</summary>
  <p>Experience Replay</p>
  <p>Experience Replay is a key technique in DQNs where experiences (state, action, reward, next state) are stored in a buffer and randomly sampled during training. This breaks the correlation between consecutive experiences, reduces variance, and improves training stability—making it one of the most important innovations that enabled DQNs to successfully learn from high-dimensional inputs.</p>
</details>
