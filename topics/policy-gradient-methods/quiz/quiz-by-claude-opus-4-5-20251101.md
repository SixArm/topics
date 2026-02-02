# Policy gradient methods

Question: What is the fundamental difference between policy gradient methods and value-based methods in reinforcement learning?

- [ ] Policy gradient methods only work with discrete action spaces, while value-based methods handle continuous spaces
- [ ] Policy gradient methods directly parameterize and optimize the policy, while value-based methods learn a value function and derive the policy from it
- [ ] Policy gradient methods require less computational resources than value-based methods
- [ ] Policy gradient methods use gradient descent, while value-based methods use gradient ascent

<details>
  <summary>Answer</summary>
  <p>Policy gradient methods directly parameterize and optimize the policy, while value-based methods learn a value function and derive the policy from it</p>
  <p>Policy gradient methods directly learn the policy (a mapping from states to actions) to maximize expected cumulative reward. In contrast, value-based methods first learn the value function (expected cumulative reward) and then derive the policy from it. This direct approach allows policy gradient methods to naturally handle high-dimensional and continuous action spaces, as well as stochastic policies.</p>
</details>
