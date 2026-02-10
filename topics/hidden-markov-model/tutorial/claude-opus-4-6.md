# Hidden Markov Model (HMM)

A Hidden Markov Model (HMM) is a statistical model used to represent systems that transition through a sequence of unobservable (hidden) states, each of which produces an observable output. HMMs are a cornerstone of probabilistic sequence modeling and have driven breakthroughs in speech recognition, natural language processing, bioinformatics, and financial analysis. The core insight of an HMM is that while you cannot directly observe the internal state of a system, you can infer it from the pattern of outputs the system generates over time.

## Core Concepts

An HMM is defined by a system that moves through discrete time steps. At each step, the system occupies exactly one hidden state, and that state generates an observable symbol according to a probability distribution. The sequence of hidden states forms a Markov chain, meaning the probability of transitioning to the next state depends only on the current state, not on the history of prior states. This is known as the Markov property or "memorylessness."

The key distinction from a standard Markov model is that the states themselves are not directly visible to the observer. Instead, you see only the emissions — the outputs produced by each state. The task is then to reason backward from the observed outputs to the most likely sequence of hidden states.

## Components of an HMM

An HMM is formally specified by five elements:

| Component | Symbol | Description |
|---|---|---|
| Hidden states | S = {s1, s2, ..., sN} | The set of N discrete states the system can occupy at any time step |
| Observations | O = {o1, o2, ..., oM} | The set of M possible output symbols the system can emit |
| Initial state distribution | pi | The probability of starting in each hidden state |
| Transition probabilities | A | An N x N matrix where A[i][j] is the probability of moving from state i to state j |
| Emission probabilities | B | An N x M matrix where B[i][k] is the probability of emitting observation k while in state i |

Together, the tuple (S, O, pi, A, B) fully defines an HMM. Given these parameters, the model can generate sequences of observations and, conversely, be used to decode hidden state sequences from observed data.

## The Three Fundamental Problems

HMM theory centers on three canonical problems that any practical application must solve:

- **Evaluation (Likelihood):** Given a model and a sequence of observations, what is the probability that the model generated that sequence? This is solved efficiently by the Forward Algorithm, which uses dynamic programming to sum over all possible state paths without enumerating them explicitly.

- **Decoding (State Inference):** Given a model and a sequence of observations, what is the most likely sequence of hidden states? The Viterbi Algorithm solves this by finding the single highest-probability path through the state space using dynamic programming and backtracking.

- **Learning (Parameter Estimation):** Given a set of observed sequences, what model parameters (A, B, pi) best explain the data? The Baum-Welch Algorithm, a special case of Expectation-Maximization (EM), iteratively refines the model parameters to maximize the likelihood of the training data.

## Key Algorithms

### Forward Algorithm

The Forward Algorithm computes the total probability of an observation sequence by recursively calculating the probability of being in each state at each time step, given all observations up to that point. It avoids the exponential blowup of enumerating every possible state sequence by storing intermediate results. The time complexity is O(N^2 * T), where N is the number of states and T is the length of the observation sequence.

### Viterbi Algorithm

The Viterbi Algorithm finds the single most probable path through the hidden states for a given observation sequence. It works similarly to the Forward Algorithm but replaces summation with maximization at each step, and maintains backpointers so the optimal path can be traced once the end of the sequence is reached. This algorithm is widely used in speech recognition and sequence labeling.

### Baum-Welch Algorithm

The Baum-Welch Algorithm trains an HMM from unlabeled data. It alternates between an E-step (computing expected state occupancies and transitions using the Forward-Backward procedure) and an M-step (re-estimating the model parameters to maximize expected log-likelihood). It converges to a local maximum of the likelihood function, though not necessarily the global maximum.

## Assumptions and Limitations

HMMs rest on several simplifying assumptions that are important to understand:

- **First-order Markov assumption:** The next state depends only on the current state. Systems with longer-range dependencies may be poorly modeled unless extended to higher-order HMMs.
- **Stationarity:** The transition and emission probabilities do not change over time. Non-stationary processes require time-varying extensions.
- **Discrete observations:** The standard HMM assumes a finite set of discrete output symbols. Continuous observations require Gaussian Mixture Model (GMM) emissions or other density estimators.
- **Local optima:** The Baum-Welch algorithm is only guaranteed to find a local maximum, making initialization important.
- **Fixed number of states:** The number of hidden states must be specified in advance, which requires domain knowledge or model selection techniques.

## Applications

HMMs have been applied across a broad range of domains:

| Domain | Application | Hidden States | Observations |
|---|---|---|---|
| Speech recognition | Phoneme and word recognition | Phoneme sub-states | Acoustic feature vectors |
| Natural language processing | Part-of-speech tagging | Grammatical tags (noun, verb, etc.) | Words in a sentence |
| Bioinformatics | Gene finding, protein structure | Functional regions (exon, intron) | DNA/RNA base sequences |
| Finance | Market regime detection | Bull/bear/neutral regimes | Stock returns or volatility |
| Robotics | Robot localization | Robot position/orientation | Sensor readings |
| Climate science | Weather pattern modeling | Atmospheric states | Temperature, precipitation |

In each case, the observable data is plentiful but the underlying generative process is hidden, making HMMs a natural fit.

## HMMs Compared to Other Models

| Feature | HMM | Conditional Random Field (CRF) | Recurrent Neural Network (RNN) |
|---|---|---|---|
| Model type | Generative | Discriminative | Discriminative |
| Markov assumption | First-order (standard) | Flexible feature dependencies | No fixed-order assumption |
| Training | Baum-Welch (EM) | Gradient-based (convex) | Gradient-based (non-convex) |
| Interpretability | High (explicit probabilities) | Moderate | Low (black box) |
| Data efficiency | Good with small datasets | Moderate | Requires large datasets |
| Expressiveness | Limited by Markov assumption | Richer feature modeling | Highly expressive |
| Computational cost | Low | Moderate | High |

HMMs remain valuable when interpretability, data efficiency, and computational simplicity matter. CRFs and RNNs have supplanted HMMs in many NLP and speech tasks where large datasets are available and raw accuracy is paramount.

## Extensions and Variants

Several extensions address the limitations of standard HMMs:

- **Higher-order HMMs:** Allow transitions to depend on two or more previous states, capturing longer-range dependencies at the cost of a larger parameter space.
- **Input-output HMMs:** Condition transitions and emissions on external input, enabling controlled sequence generation.
- **Hierarchical HMMs:** Nest HMMs within HMM states to model multi-scale temporal structure, such as words within sentences.
- **Infinite HMMs (iHMM):** Use Bayesian nonparametric methods (Dirichlet processes) to learn the number of hidden states from data automatically.
- **Hidden semi-Markov Models (HSMM):** Allow states to have explicit duration distributions rather than the implicit geometric duration of standard HMMs.

## Related

Topics to explore next include Markov chains and Markov decision processes for foundational probabilistic modeling, the Viterbi algorithm and dynamic programming for deeper algorithmic understanding, Bayesian networks and graphical models for the broader family of probabilistic graphical models, conditional random fields for discriminative sequence labeling, recurrent neural networks and transformers for modern deep learning approaches to sequence modeling, and the Expectation-Maximization algorithm for the general framework underlying Baum-Welch training.

## Summary

Hidden Markov Models provide a principled, probabilistic framework for reasoning about systems whose internal states are not directly observable. By decomposing the problem into hidden states, observations, transition probabilities, and emission probabilities, HMMs offer an interpretable and computationally efficient approach to sequence analysis. The three fundamental problems — evaluation, decoding, and learning — are solved by well-understood algorithms with polynomial time complexity. While HMMs have been supplanted by deep learning methods in some high-resource settings, they remain indispensable in domains where data is limited, interpretability is required, or the Markov assumption is a reasonable approximation of reality.

## References

- Rabiner, L. R. (1989). "A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition." *Proceedings of the IEEE*, 77(2), 257–286. https://doi.org/10.1109/5.18626
- Jurafsky, D., & Martin, J. H. (2024). *Speech and Language Processing* (3rd ed. draft). Chapter on Hidden Markov Models. https://web.stanford.edu/~jurafsky/slp3/
- Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*. Springer. Chapter 13: Sequential Data.
- Durbin, R., Eddy, S., Krogh, A., & Mitchison, G. (1998). *Biological Sequence Analysis: Probabilistic Models of Proteins and Nucleic Acids*. Cambridge University Press.
- Murphy, K. P. (2012). *Machine Learning: A Probabilistic Perspective*. MIT Press. Chapters 17–18.
- Baum, L. E., Petrie, T., Soules, G., & Weiss, N. (1970). "A Maximization Technique Occurring in the Statistical Analysis of Probabilistic Functions of Markov Chains." *The Annals of Mathematical Statistics*, 41(1), 164–171.
