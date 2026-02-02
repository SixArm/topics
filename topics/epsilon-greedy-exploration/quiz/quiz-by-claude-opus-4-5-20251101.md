# Epsilon-greedy exploration

Question: In epsilon-greedy exploration, what does the epsilon (ε) parameter control?

- [ ] The learning rate of the neural network
- [ ] The discount factor for future rewards
- [ ] The probability of choosing a random action versus the best-known action
- [ ] The maximum number of actions the agent can take

<details>
  <summary>Answer</summary>
  <p>The probability of choosing a random action versus the best-known action</p>
  <p>In epsilon-greedy exploration, the epsilon (ε) parameter determines the balance between exploration and exploitation. With probability ε, the agent selects a random action (exploration), and with probability 1-ε, it selects the action with the highest estimated value (exploitation). A high ε encourages more exploration, while a low ε favors exploitation of current knowledge.</p>
</details>
