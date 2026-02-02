# Reinforcement learning algorithms

Question: What distinguishes Actor-Critic algorithms from pure policy-based or pure value-based reinforcement learning methods?

- [ ] They only work with discrete action spaces and cannot handle continuous environments
- [ ] They eliminate the need for an environment by using simulated rewards
- [ ] They combine an actor that selects actions with a critic that estimates the value of those actions
- [ ] They require pre-labeled training data to learn optimal policies

<details>
  <summary>Answer</summary>
  <p>They combine an actor that selects actions with a critic that estimates the value of those actions</p>
  <p>Actor-Critic is a hybrid algorithm that merges policy-based methods (the actor, which learns to select actions) with value-based methods (the critic, which evaluates how good those actions are by estimating their value). This combination allows for more stable and efficient learning than using either approach alone, making Actor-Critic a foundational architecture for many modern RL algorithms including A3C, PPO, and SAC.</p>
</details>
