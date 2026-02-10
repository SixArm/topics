# Transformer architecture

The Transformer architecture is a foundational neural network design that has reshaped modern artificial intelligence. Introduced in the 2017 paper "Attention Is All You Need" by Vaswani et al. at Google, it replaced recurrence and convolution with a purely attention-based mechanism for sequence-to-sequence modeling. Originally designed for machine translation, the Transformer has since become the backbone of large language models, vision transformers, speech recognition systems, and multimodal AI. Its parallelizable design and ability to capture long-range dependencies make it dramatically more efficient to train at scale than its predecessors, and understanding its components is essential for any technology professional working with modern AI systems.

## Core Concepts

The Transformer architecture rests on several interlocking mechanisms that work together to process sequential data without recurrence. Unlike recurrent neural networks (RNNs) and long short-term memory networks (LSTMs), which process tokens one at a time in order, Transformers process all tokens in a sequence simultaneously. This parallelism is the key insight that enables training on massive datasets using modern GPU and TPU hardware.

The architecture is organized around two main components: the **encoder**, which reads and encodes an input sequence into a continuous representation, and the **decoder**, which generates an output sequence token by token using that representation. Some models use only the encoder (BERT), some use only the decoder (GPT), and some use both (the original Transformer, T5).

## Self-Attention Mechanism

Self-attention is the central innovation of the Transformer. It allows every token in a sequence to attend to every other token, computing a weighted sum of value vectors where the weights are determined by the compatibility between query and key vectors. Concretely, for each token, the model produces three vectors: a query (Q), a key (K), and a value (V). The attention score between two tokens is the dot product of one token's query with another's key, scaled by the square root of the key dimension, then passed through a softmax function to produce a probability distribution.

Self-attention solves a critical problem that plagued earlier sequence models: capturing long-range dependencies. In an RNN, information from distant tokens must pass through many sequential steps, leading to vanishing or exploding gradients. In self-attention, any two tokens are connected in a single computational step, regardless of their distance in the sequence.

| Property | RNN / LSTM | Transformer (Self-Attention) |
|---|---|---|
| Sequential dependency | Yes, processes tokens in order | No, processes all tokens in parallel |
| Long-range dependency | Degrades over distance | Constant-time connection between any two tokens |
| Training parallelism | Limited by sequential nature | Fully parallelizable across sequence length |
| Computational complexity per layer | O(n) sequential steps | O(n squared) pairwise comparisons |
| Memory of context | Fixed-size hidden state | Attends over entire context window |

## Multi-Head Attention

Rather than computing a single attention function, the Transformer uses multi-head attention, which runs several attention computations in parallel with different learned linear projections. Each "head" learns to focus on different types of relationships. For example, one head might learn syntactic dependencies (subject-verb agreement), while another captures semantic relationships (synonymy or coreference). The outputs of all heads are concatenated and linearly projected to produce the final result.

Multi-head attention provides the model with a richer representational capacity. The original Transformer used 8 attention heads, while larger models like GPT-3 use 96 heads and GPT-4-class models use even more. The number of heads is a hyperparameter that balances representational power against computational cost.

## Positional Encoding

Because the self-attention mechanism is permutation-invariant (it has no inherent notion of token order), Transformers must inject positional information explicitly. The original paper used fixed sinusoidal functions of different frequencies to encode each position, ensuring that the model can distinguish between the same word appearing at different positions in a sequence.

More recent models have adopted alternative positional encoding strategies:

- **Learned positional embeddings**: Trainable vectors for each position, used in BERT and GPT-2.
- **Rotary positional embeddings (RoPE)**: Encode position by rotating query and key vectors, used in LLaMA and many modern open-source models. RoPE gracefully extends to longer sequences than those seen during training.
- **ALiBi (Attention with Linear Biases)**: Adds a linear bias to attention scores based on distance, requiring no positional embeddings at all.
- **Relative positional encodings**: Encode the distance between tokens rather than absolute position, used in Transformer-XL and T5.

## Encoder and Decoder Stacks

The full Transformer architecture consists of stacked encoder and decoder layers, each containing sub-layers with residual connections and layer normalization.

Each **encoder layer** contains:

- A multi-head self-attention sub-layer, where every input token attends to every other input token.
- A position-wise feed-forward network (typically two linear transformations with a ReLU or GELU activation in between).
- Residual connections around each sub-layer, followed by layer normalization.

Each **decoder layer** contains:

- A masked multi-head self-attention sub-layer, where each output token can only attend to previous output tokens (preventing information leakage from future tokens during training).
- A cross-attention sub-layer, where decoder tokens attend to the encoder's output representations.
- A position-wise feed-forward network, identical in structure to the encoder's.
- Residual connections and layer normalization around each sub-layer.

The original Transformer used 6 encoder layers and 6 decoder layers. Modern large language models stack far more layers: GPT-3 uses 96 decoder layers, and scaling laws suggest that deeper models generally perform better given sufficient data.

## Feed-Forward Networks

Each layer in the Transformer contains a position-wise feed-forward network that operates independently on each token's representation. This network typically expands the dimensionality of the representation (often by a factor of 4), applies a nonlinear activation function, and then projects it back to the original dimensionality. This expansion-and-compression pattern gives the model capacity to learn complex token-level transformations beyond what attention alone can capture.

Recent variants have introduced modifications to the feed-forward component, including the use of gated linear units (GLU), SwiGLU activations (used in LLaMA and PaLM), and mixture-of-experts (MoE) layers where only a subset of feed-forward parameters are activated for each token, dramatically increasing model capacity without proportionally increasing compute.

## Architectural Variants

Since 2017, the Transformer has spawned numerous architectural variants optimized for different tasks and constraints.

| Variant | Architecture | Key Innovation | Notable Models |
|---|---|---|---|
| Encoder-only | Encoder stack only | Bidirectional attention over full input | BERT, RoBERTa, DeBERTa |
| Decoder-only | Decoder stack only | Autoregressive, causal masking | GPT series, LLaMA, Claude, Gemini |
| Encoder-decoder | Both stacks | Cross-attention from decoder to encoder | Original Transformer, T5, BART |
| Vision Transformer | Encoder (patches as tokens) | Applies self-attention to image patches | ViT, DeiT, Swin Transformer |
| Sparse Transformer | Modified attention | Reduces O(n squared) to sub-quadratic | Longformer, BigBird, Reformer |
| Mixture of Experts | MoE feed-forward layers | Conditional computation per token | Mixtral, Switch Transformer, GShard |

Decoder-only models have become the dominant paradigm for generative AI, as they simplify training to next-token prediction and scale effectively with increasing data and parameters. Encoder-only models remain preferred for classification, retrieval, and embedding tasks where bidirectional context is valuable.

## Training and Scaling

Transformer models are trained using large-scale unsupervised or self-supervised objectives, most commonly next-token prediction (for decoder-only models) or masked language modeling (for encoder-only models). Training requires:

- **Large datasets**: Modern LLMs train on trillions of tokens drawn from web crawls, books, code, and curated corpora.
- **Hardware parallelism**: Training is distributed across thousands of GPUs or TPUs using data parallelism, tensor parallelism, and pipeline parallelism.
- **Optimization**: The Adam or AdamW optimizer with learning rate warmup and cosine decay schedules is standard. Gradient clipping prevents instability during training.
- **Regularization**: Dropout, weight decay, and careful data mixing help prevent overfitting and improve generalization.

Scaling laws, first characterized by Kaplan et al. (2020) and refined by Hoffmann et al. (2022, "Chinchilla"), demonstrate that model performance improves predictably as a power law function of model size, dataset size, and compute budget. These laws guide practitioners in allocating resources: a model that is too large for its training data will underperform a smaller model trained on more data with the same compute budget.

## Inference and Efficiency Challenges

While Transformers train efficiently due to parallelism, autoregressive inference (generating tokens one at a time) remains a bottleneck. Each generated token requires a forward pass through the entire model, and the self-attention computation grows with the length of the generated sequence. Key techniques for improving inference efficiency include:

- **KV caching**: Storing previously computed key and value vectors to avoid redundant computation during autoregressive generation.
- **Quantization**: Reducing model weights from 16-bit or 32-bit floating point to 8-bit, 4-bit, or even lower precision to reduce memory and increase throughput.
- **Speculative decoding**: Using a smaller draft model to propose multiple tokens, then verifying them in parallel with the full model.
- **Flash Attention**: An IO-aware attention algorithm that reduces memory reads and writes, significantly speeding up both training and inference.
- **Grouped-query attention (GQA)**: Sharing key-value heads across multiple query heads to reduce KV cache size, used in LLaMA 2 and subsequent models.

## Limitations

Despite their success, Transformers have well-known limitations that active research aims to address:

- **Quadratic attention cost**: Self-attention scales as O(n squared) with sequence length, limiting context windows. Linear attention approximations and state-space models (Mamba, RWKV) aim to overcome this.
- **Hallucination**: Transformer-based language models can generate fluent but factually incorrect text, a fundamental challenge for deployment in high-stakes applications.
- **Lack of explicit reasoning**: Transformers learn statistical patterns rather than formal logical rules, though techniques like chain-of-thought prompting and tool use partially mitigate this.
- **Positional generalization**: Models often struggle to generalize to sequence lengths significantly longer than those seen during training.
- **Interpretability**: The internal representations and decision processes of large Transformers remain difficult to interpret, an active area of mechanistic interpretability research.

## Related

Professionals studying the Transformer architecture should also explore self-attention mechanisms and multi-head attention in greater depth, as well as recurrent neural networks and long short-term memory networks to understand the historical context. Positional encoding strategies such as rotary positional embeddings and ALiBi are important for modern implementations. Specific model families worth studying include BERT, GPT, T5, LLaMA, and Vision Transformers. For efficiency, investigate Flash Attention, quantization, speculative decoding, and mixture-of-experts architectures. Scaling laws and the Chinchilla paper provide critical guidance on training compute allocation. Finally, emerging alternatives to attention such as state-space models (Mamba) and linear attention represent the frontier of sequence modeling research.

## Summary

The Transformer architecture fundamentally changed the landscape of artificial intelligence by replacing sequential processing with parallelizable self-attention, enabling models to capture relationships across entire sequences in a single computational step. Its modular design of stacked layers containing multi-head attention and feed-forward networks has proven remarkably versatile, powering encoder-only models for understanding tasks, decoder-only models for generation, and encoder-decoder models for sequence-to-sequence translation. While challenges around quadratic scaling, hallucination, and interpretability remain active areas of research, the Transformer's combination of expressiveness, scalability, and training efficiency has made it the dominant architecture in modern AI, and a thorough understanding of its components is indispensable for any technology professional working in this field.

## References

- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., and Polosukhin, I. (2017). "Attention Is All You Need." Advances in Neural Information Processing Systems (NeurIPS). [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
- Devlin, J., Chang, M.-W., Lee, K., and Toutanova, K. (2019). "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding." [https://arxiv.org/abs/1810.04805](https://arxiv.org/abs/1810.04805)
- Radford, A., Wu, J., Child, R., Luan, D., Amodei, D., and Sutskever, I. (2019). "Language Models are Unsupervised Multitask Learners." OpenAI. [https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- Brown, T. B., et al. (2020). "Language Models are Few-Shot Learners." [https://arxiv.org/abs/2005.14165](https://arxiv.org/abs/2005.14165)
- Kaplan, J., et al. (2020). "Scaling Laws for Neural Language Models." [https://arxiv.org/abs/2001.08361](https://arxiv.org/abs/2001.08361)
- Hoffmann, J., et al. (2022). "Training Compute-Optimal Large Language Models." (Chinchilla). [https://arxiv.org/abs/2203.15556](https://arxiv.org/abs/2203.15556)
- Dosovitskiy, A., et al. (2021). "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale." (ViT). [https://arxiv.org/abs/2010.11929](https://arxiv.org/abs/2010.11929)
- Dao, T., Fu, D. Y., Ermon, S., Rudra, A., and Re, C. (2022). "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness." [https://arxiv.org/abs/2205.14135](https://arxiv.org/abs/2205.14135)
- Su, J., Lu, Y., Pan, S., Murtadha, A., Wen, B., and Liu, Y. (2021). "RoFormer: Enhanced Transformer with Rotary Position Embedding." [https://arxiv.org/abs/2104.09864](https://arxiv.org/abs/2104.09864)
- Jay Alammar. "The Illustrated Transformer." [https://jalammar.github.io/illustrated-transformer/](https://jalammar.github.io/illustrated-transformer/)
