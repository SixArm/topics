# Reinforcement learning (RL) algorithms

Reinforcement learning (RL) algorithms are a category of machine learning algorithms that enable an agent to learn how to make decisions by interacting with an environment. Unlike supervised learning, which relies on labeled datasets, or unsupervised learning, which identifies hidden patterns, reinforcement learning operates through trial and error. The agent takes actions within an environment, receives feedback in the form of rewards or penalties, and iteratively refines its strategy -- known as a policy -- to maximize cumulative reward over time. This paradigm is central to solving problems that involve sequential decision-making under uncertainty, from controlling robots to playing complex games to managing financial portfolios.

## Core Concepts

Before examining specific algorithms, it is essential to understand the foundational elements that all RL algorithms share.

- **Agent**: The decision-maker that interacts with the environment. The agent selects actions based on its current understanding of the environment.
- **Environment**: The external system with which the agent interacts. It responds to the agent's actions by transitioning to new states and providing rewards.
- **State**: A representation of the current situation within the environment. The state captures the information the agent needs to make a decision.
- **Action**: A choice available to the agent at each time step. The set of all possible actions is called the action space, which can be discrete or continuous.
- **Reward**: A scalar feedback signal that evaluates the immediate desirability of the agent's action in a given state. The agent's objective is to maximize cumulative reward over time.
- **Policy**: A mapping from states to actions. A deterministic policy prescribes a specific action for each state; a stochastic policy assigns probabilities to actions.
- **Value Function**: An estimate of the expected cumulative reward the agent will receive starting from a given state (or state-action pair) and following a particular policy.
- **Discount Factor (gamma)**: A parameter between 0 and 1 that determines the present value of future rewards. A value near 0 makes the agent short-sighted; a value near 1 makes it prioritize long-term outcomes.

## Categories of RL Algorithms

RL algorithms can be organized along several axes. The most important distinctions are between model-free and model-based methods, and between value-based and policy-based methods.

| Category | Description | Examples |
|---|---|---|
| **Model-Free** | The agent learns directly from interactions without building an internal model of environment dynamics. | Q-Learning, SARSA, Policy Gradient, Actor-Critic |
| **Model-Based** | The agent learns or is given a model of the environment's transition and reward functions, then uses that model for planning. | Dyna-Q, AlphaZero, World Models |
| **Value-Based** | The agent learns a value function and derives a policy from it by selecting actions with the highest estimated value. | Q-Learning, DQN, Double DQN |
| **Policy-Based** | The agent directly parameterizes and optimizes the policy, often using gradient ascent on expected reward. | REINFORCE, PPO, TRPO |
| **Actor-Critic** | A hybrid approach that maintains both a policy (actor) and a value function (critic), combining the strengths of both categories. | A2C, A3C, SAC, DDPG |

## Q-Learning

Q-Learning is a model-free, off-policy algorithm that learns the optimal action-value function, denoted Q(s, a), which estimates the expected cumulative reward of taking action a in state s and then following the optimal policy thereafter. The algorithm maintains a Q-table that maps every state-action pair to a value. At each step, the agent updates its Q-value estimate using the Bellman equation, incorporating the observed reward and the maximum estimated future value from the next state.

Q-Learning is straightforward to implement and is guaranteed to converge to the optimal policy in tabular settings given sufficient exploration. However, it struggles with large or continuous state spaces because maintaining a table of all state-action pairs becomes infeasible. This limitation motivated the development of function approximation approaches such as Deep Q Networks.

## Deep Q Networks (DQN)

Deep Q Networks extend Q-Learning by replacing the Q-table with a deep neural network that approximates the Q-value function. This allows the algorithm to handle high-dimensional state spaces, such as raw pixel inputs from video games. DQN was famously demonstrated by DeepMind in 2015 when it achieved human-level performance across dozens of Atari 2600 games.

Two key innovations make DQN stable and effective:

- **Experience Replay**: The agent stores its experiences (state, action, reward, next state) in a replay buffer and samples random mini-batches for training. This breaks the temporal correlation between consecutive samples and improves data efficiency.
- **Target Network**: A separate, slowly updated copy of the Q-network provides stable target values during training, preventing the oscillations and divergence that can occur when the same network is used for both prediction and target computation.

Variants of DQN include Double DQN, which addresses the overestimation bias of standard DQN by decoupling action selection from action evaluation, and Dueling DQN, which separates the estimation of state value and action advantage for more efficient learning.

## Policy Gradient Methods

Policy gradient methods take a fundamentally different approach from value-based algorithms. Instead of estimating a value function and deriving a policy from it, they directly parameterize the policy and optimize it using gradient ascent on the expected cumulative reward.

The REINFORCE algorithm is the canonical example. It samples complete episodes, computes the return for each time step, and updates the policy parameters in the direction that increases the probability of high-reward actions. While conceptually elegant, REINFORCE suffers from high variance in its gradient estimates, which can make training slow and unstable.

To address this, several improvements have been developed:

- **Baseline Subtraction**: Subtracting a baseline (often an estimate of the state value) from the return reduces variance without introducing bias.
- **Trust Region Policy Optimization (TRPO)**: Constrains policy updates to a trust region to prevent large, destructive updates that could collapse performance.
- **Proximal Policy Optimization (PPO)**: Simplifies TRPO by using a clipped surrogate objective function that achieves similar stability guarantees with less computational overhead. PPO has become one of the most widely used RL algorithms in practice due to its balance of simplicity, stability, and performance.

## Deep Deterministic Policy Gradients (DDPG)

DDPG is an off-policy, actor-critic algorithm designed for environments with continuous action spaces, where discrete methods like DQN cannot be directly applied. It combines ideas from DQN and deterministic policy gradients. The actor network learns a deterministic mapping from states to continuous actions, while the critic network estimates the Q-value of the state-action pair.

DDPG uses experience replay and target networks from DQN to stabilize training. It has been successfully applied to robotic control tasks, including locomotion, manipulation, and autonomous driving in simulation. A notable limitation is its sensitivity to hyperparameters and its tendency toward brittle convergence, which has led to improved variants such as Twin Delayed DDPG (TD3), which introduces clipped double Q-learning and delayed policy updates to reduce overestimation and improve stability.

## Actor-Critic Methods

Actor-critic methods represent a family of algorithms that maintain two components: an actor, which learns a policy, and a critic, which learns a value function. The critic evaluates the actions chosen by the actor, providing a lower-variance learning signal compared to pure policy gradient methods. The actor uses this feedback to update its policy.

| Algorithm | Key Feature | Action Space | Policy Type |
|---|---|---|---|
| A2C (Advantage Actor-Critic) | Synchronous updates using advantage function | Discrete or Continuous | Stochastic |
| A3C (Asynchronous Advantage Actor-Critic) | Multiple parallel agents for faster, decorrelated training | Discrete or Continuous | Stochastic |
| SAC (Soft Actor-Critic) | Entropy regularization for robust exploration | Continuous | Stochastic |
| DDPG | Deterministic policy with off-policy learning | Continuous | Deterministic |
| TD3 | Twin critics and delayed updates to reduce overestimation | Continuous | Deterministic |

Soft Actor-Critic (SAC) deserves particular attention. By maximizing both the expected reward and the entropy of the policy, SAC encourages the agent to explore broadly while still pursuing high-reward behaviors. This makes it robust to hyperparameter choices and effective across a wide range of continuous control benchmarks.

## Model-Based Methods

Model-based RL algorithms learn or leverage a model of the environment's dynamics -- that is, the transition function and reward function. With a model in hand, the agent can simulate future trajectories and plan ahead, often achieving greater sample efficiency than model-free counterparts.

- **Dyna-Q**: Integrates model-free Q-Learning with a learned model. After each real interaction, the agent performs additional simulated updates using its model, accelerating learning.
- **Monte Carlo Tree Search (MCTS)**: Builds a search tree by simulating many possible future sequences of actions, evaluating their outcomes, and selecting the most promising path. MCTS was a critical component of AlphaGo and AlphaZero.
- **World Models**: The agent learns a compressed representation of the environment and trains its policy entirely within a learned simulation. This approach has demonstrated strong results in continuous control and video game environments.

The principal challenge of model-based methods is model accuracy. If the learned model diverges from the true environment dynamics, the agent's planned behavior may fail in practice -- a problem known as model bias.

## Exploration vs. Exploitation

A fundamental tension in reinforcement learning is the tradeoff between exploration (trying new actions to discover potentially better strategies) and exploitation (using the current best-known strategy to maximize reward). Effective algorithms must balance these two imperatives.

- **Epsilon-Greedy**: The agent selects a random action with probability epsilon and the greedy action otherwise. Epsilon is typically decayed over time to shift from exploration to exploitation.
- **Boltzmann (Softmax) Exploration**: Actions are selected with probabilities proportional to their estimated values, allowing the agent to explore more intelligently than uniform random selection.
- **Upper Confidence Bound (UCB)**: Actions are selected based on both their estimated value and the uncertainty in that estimate, favoring actions that are potentially high-value but insufficiently explored.
- **Intrinsic Motivation**: The agent generates its own internal rewards based on novelty, curiosity, or prediction error, driving it to explore unfamiliar parts of the state space.

## Applications

Reinforcement learning algorithms power a diverse set of real-world and research applications.

- **Game Playing**: AlphaGo (Go), AlphaZero (chess, shogi, Go), OpenAI Five (Dota 2), and agents trained on Atari games have demonstrated superhuman performance through RL.
- **Robotics**: RL enables robots to learn manipulation, locomotion, and navigation through simulated and real-world training, often using algorithms like SAC, PPO, and DDPG.
- **Autonomous Vehicles**: RL is applied to decision-making tasks in self-driving cars, such as lane changes, intersection navigation, and speed control.
- **Recommendation Systems**: RL models user engagement as a sequential decision problem, optimizing for long-term satisfaction rather than immediate click-through rates.
- **Finance**: Portfolio optimization, algorithmic trading, and risk management leverage RL to make sequential decisions in stochastic market environments.
- **Healthcare**: Treatment planning, drug dosage optimization, and clinical trial design benefit from RL's ability to learn optimal sequential strategies from patient data.
- **Natural Language Processing**: RL from Human Feedback (RLHF) has become a central technique for aligning large language models with human preferences, as used in systems such as ChatGPT.

## Algorithm Selection Guide

Choosing the right RL algorithm depends on the characteristics of the problem at hand.

| Problem Characteristic | Recommended Algorithms | Rationale |
|---|---|---|
| Discrete, small state space | Q-Learning, SARSA | Tabular methods are simple and provably convergent |
| Discrete, large state space | DQN, Double DQN, Dueling DQN | Neural network approximation handles high-dimensional states |
| Continuous action space | DDPG, TD3, SAC, PPO | These algorithms are designed for continuous control |
| Sample efficiency is critical | Model-based methods (Dyna-Q, World Models) | Planning with a learned model reduces the number of real interactions needed |
| Stability and ease of tuning | PPO, SAC | Both are known for robust performance across diverse tasks |
| Multi-agent environments | MADDPG, MAPPO | Extensions of single-agent methods to cooperative or competitive settings |

## Related

Topics to explore next include reinforcement learning foundations such as Markov decision processes and the Bellman equation, as well as specific algorithms in greater depth: Q-learning, deep Q networks, policy gradient methods, deep deterministic policy gradients, and actor-critic architectures. For broader context, study deep learning, neural networks, and machine learning performance metrics. Multi-agent reinforcement learning, inverse reinforcement learning, and sim-to-real transfer are active research frontiers worth investigating.

## Summary

Reinforcement learning algorithms provide a powerful framework for training agents to make sequential decisions through interaction with an environment. The field spans value-based methods like Q-Learning and DQN, policy-based methods like REINFORCE and PPO, hybrid actor-critic architectures like SAC and TD3, and model-based approaches that leverage learned environment dynamics for planning. Selecting the right algorithm requires matching the problem's characteristics -- action space type, state space dimensionality, sample budget, and stability requirements -- to the strengths of each approach. With applications ranging from game-playing and robotics to healthcare and language model alignment, RL remains one of the most active and impactful areas of machine learning research and practice.

## References

- Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (2nd ed.). MIT Press. Available at http://incompleteideas.net/book/the-book-2nd.html
- Mnih, V., et al. (2015). "Human-level control through deep reinforcement learning." *Nature*, 518(7540), 529-533. https://doi.org/10.1038/nature14236
- Silver, D., et al. (2016). "Mastering the game of Go with deep neural networks and tree search." *Nature*, 529(7587), 484-489. https://doi.org/10.1038/nature16961
- Schulman, J., et al. (2017). "Proximal Policy Optimization Algorithms." *arXiv preprint* arXiv:1707.06347. https://arxiv.org/abs/1707.06347
- Lillicrap, T. P., et al. (2016). "Continuous control with deep reinforcement learning." *ICLR 2016*. https://arxiv.org/abs/1509.02971
- Haarnoja, T., et al. (2018). "Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor." *ICML 2018*. https://arxiv.org/abs/1801.01290
- OpenAI Spinning Up in Deep RL. https://spinningup.openai.com/
