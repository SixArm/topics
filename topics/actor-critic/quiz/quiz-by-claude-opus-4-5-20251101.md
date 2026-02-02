# Actor-Critic

Question: In an Actor-Critic reinforcement learning architecture, what is the primary role of the critic component?

- [ ] To directly interact with the environment and select actions based on the current policy
- [ ] To define the probability distribution over actions given a state
- [ ] To evaluate actions by estimating the value function and providing feedback to the actor
- [ ] To introduce stochasticity in the agent's behavior through exploration

<details>
  <summary>Answer</summary>
  <p>To evaluate actions by estimating the value function and providing feedback to the actor</p>
  <p>In Actor-Critic methods, the critic evaluates the actions taken by the actor by estimating the value function, which represents the expected cumulative reward of following a particular policy. The critic provides feedback to the actor by assessing the quality of the selected actions, helping guide the actor towards actions that are likely to result in higher rewards. This separation of concerns—with the actor handling policy-based action selection and the critic handling value-based evaluation—is what gives Actor-Critic methods their stability and efficiency in handling complex environments.</p>
</details>
