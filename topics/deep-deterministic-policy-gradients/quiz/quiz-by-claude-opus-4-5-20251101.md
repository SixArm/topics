# Deep Deterministic Policy Gradients (DDPG)

Question: What type of reinforcement learning algorithm is DDPG, and what are its two main neural network components?

- [ ] A model-based algorithm that uses a planner network and a simulator network
- [ ] A value-based algorithm that uses a state network and an action network
- [ ] An actor-critic algorithm that uses an actor network and a critic network
- [ ] A policy gradient algorithm that uses a reward network and a transition network

<details>
  <summary>Answer</summary>
  <p>An actor-critic algorithm that uses an actor network and a critic network</p>
  <p>DDPG is an actor-critic algorithm that simultaneously learns two neural networks: the actor network, which maps states directly to continuous actions, and the critic network, which evaluates the quality of those actions by estimating the expected cumulative reward (Q-value) for state-action pairs. This architecture enables DDPG to handle continuous action spaces effectively, making it suitable for tasks like robotic control and autonomous driving.</p>
</details>
