# AI LLM tokens

Tokens are the fundamental units that large language models use to process text. Rather than reading words or sentences the way humans do, LLMs break all input and output into tokens, which may correspond to whole words, subwords, individual characters, or even bytes in the case of Unicode text. Understanding tokens is essential for anyone building with LLMs, because tokens directly determine what a model can process, how fast it responds, and how much each API call costs. This tutorial covers how tokenization works, how tokens affect pricing and performance, and how to manage them effectively in production systems.


## What is a token?

A token is the smallest discrete unit of text that a language model operates on. When you send text to an LLM, the model does not see words or characters directly. Instead, a tokenizer converts the raw text into a sequence of integer IDs, each corresponding to an entry in a fixed vocabulary. The model performs all of its computation on these token IDs, and then a detokenizer converts the output IDs back into human-readable text.

Tokens do not map neatly to words. A common English word like "running" might be a single token, while an uncommon technical term like "deserialization" might be split into three or four tokens. Whitespace, punctuation, and formatting characters also consume tokens. For most English text processed by modern models, the rough conversion is approximately 3.5 to 4 characters per token, or about 0.75 tokens per word, though this varies significantly by language and content type.

| Text example | Approximate token count | Notes |
|---|---|---|
| "Hello" | 1 token | Common word, single token |
| "tokenization" | 2–3 tokens | Decomposed into subword units |
| "GPT-4" | 3 tokens | Hyphen and numeral are separate |
| "こんにちは" (Japanese) | 3–5 tokens | Non-Latin scripts use more tokens |
| 1,000 words of English prose | ~750 tokens | Typical ratio for natural language |
| 1,000 words of source code | ~1,200 tokens | Code has more special characters |


## How tokenization works

Tokenization is the process of converting raw text into the sequence of token IDs that a model can process. Most modern LLMs rely on a family of algorithms rooted in byte-pair encoding (BPE), which was originally developed for data compression and later adapted for NLP by Sennrich et al. in 2016.

The core idea behind BPE is straightforward. The algorithm starts with a base vocabulary of individual bytes or characters. It then iteratively scans a large training corpus, identifies the most frequently occurring adjacent pair of tokens, and merges that pair into a new single token. This process repeats thousands of times until the vocabulary reaches a target size, typically between 32,000 and 200,000 entries depending on the model.

The key tokenization approaches used by major models include:

- **Byte-pair encoding (BPE):** Merges frequent character pairs iteratively. Used by GPT-2, GPT-3, GPT-4, and LLaMA.
- **Byte-level BPE:** Operates on raw bytes rather than Unicode characters, ensuring that any input can be tokenized without unknown-token fallbacks. Used by GPT-4 and Claude.
- **WordPiece:** Similar to BPE but uses a likelihood-based merging criterion rather than frequency. Used by BERT and its derivatives.
- **Unigram (SentencePiece):** Starts with a large vocabulary and prunes tokens based on a unigram language model. Used by T5, ALBERT, and many multilingual models.

Each approach makes different tradeoffs between vocabulary size, compression efficiency, multilingual coverage, and handling of rare or novel words.


## Token vocabulary size

The size of a model's token vocabulary has significant implications for both performance and efficiency. A larger vocabulary means more common words and phrases are represented as single tokens, which improves compression and allows the model to process more semantic content within its context window. However, a larger vocabulary also increases the size of the model's embedding matrix, adding parameters and memory requirements.

| Model | Vocabulary size | Tokenizer type |
|---|---|---|
| GPT-2 | 50,257 | BPE |
| GPT-3 | 50,257 | BPE |
| GPT-4 / GPT-4o | 100,256 | Byte-level BPE (cl100k / o200k) |
| Claude 3.x / Claude 4.x | ~100,000 | Byte-level BPE |
| LLaMA 2 | 32,000 | BPE (SentencePiece) |
| LLaMA 3 | 128,256 | Byte-level BPE |
| Gemini | ~256,000 | SentencePiece |
| BERT | 30,522 | WordPiece |

A larger vocabulary generally means fewer tokens are needed to represent the same text. GPT-4's vocabulary is roughly twice the size of GPT-2's, which means GPT-4 can represent the same English passage in fewer tokens, effectively stretching its context window further.


## Context windows and token limits

The context window is the maximum number of tokens a model can consider in a single interaction. This window must accommodate both the input (your prompt, system instructions, conversation history, and any injected documents) and the generated output. If the combined token count exceeds the context window, the input must be truncated or summarized before the model can process it.

Context window sizes have grown rapidly:

| Model | Context window |
|---|---|
| GPT-3 (2020) | 4,096 tokens |
| GPT-3.5 Turbo (2023) | 16,384 tokens |
| GPT-4 (2023) | 8,192 / 128,000 tokens |
| Claude 3.5 Sonnet (2024) | 200,000 tokens |
| Claude 4 Opus (2025) | 200,000 tokens |
| Gemini 1.5 Pro (2024) | 1,000,000 tokens |
| Gemini 2.5 Pro (2025) | 1,000,000 tokens |

Larger context windows enable use cases like processing entire codebases, analyzing long legal documents, and maintaining extended multi-turn conversations. However, longer contexts increase latency and cost, and models may exhibit degraded attention to information in the middle of very long inputs, a phenomenon sometimes called "lost in the middle."


## Token pricing and cost management

Most LLM providers charge per token, with separate rates for input tokens (what you send) and output tokens (what the model generates). Output tokens are typically more expensive because they require autoregressive generation, where each token depends on all previous tokens. Some providers also offer discounted pricing for cached input tokens and batch processing.

| Provider / Model | Input price (per 1M tokens) | Output price (per 1M tokens) |
|---|---|---|
| OpenAI GPT-4o | $2.50 | $10.00 |
| OpenAI GPT-4.1 | $2.00 | $8.00 |
| Anthropic Claude Sonnet 4.6 | $3.00 | $15.00 |
| Anthropic Claude Haiku 4.5 | $0.80 | $4.00 |
| Google Gemini 2.5 Pro | $1.25–$2.50 | $10.00–$15.00 |

Practical strategies for managing token costs include:

- **Prompt engineering:** Write concise system prompts and instructions. Remove redundant context and unnecessary formatting.
- **Caching:** Use prompt caching features (available from Anthropic and OpenAI) to avoid reprocessing static content like system prompts across multiple requests.
- **Model selection:** Use smaller, cheaper models for simple tasks (classification, extraction, routing) and reserve larger models for complex reasoning.
- **Output constraints:** Set maximum output token limits to prevent unexpectedly long responses.
- **Batching:** Use batch APIs for non-time-sensitive workloads, which typically offer 50% discounts.
- **Streaming:** Stream responses to reduce perceived latency without affecting token costs.


## Token counting in practice

Accurately estimating token counts before sending requests is important for staying within context limits and predicting costs. Each model family uses its own tokenizer, so the same text will produce different token counts depending on which model you are targeting.

Tools for token counting include:

- **tiktoken:** OpenAI's open-source Python library for counting tokens for GPT models. Fast and widely used.
- **Anthropic's token counting API:** Returns exact token counts for messages formatted for Claude models before you send them.
- **Hugging Face tokenizers:** The `transformers` library includes tokenizers for most open-source models.
- **Online tokenizer tools:** Browser-based tools from OpenAI, Anthropic, and third parties allow quick manual estimates.

Key considerations when counting tokens:

- System prompts, user messages, and assistant messages all consume tokens from the context window.
- Conversation history accumulates tokens across turns. In a multi-turn chat, every previous message is re-sent with each new request.
- Tool definitions, function schemas, and structured output formats add tokens to every request even though they are not visible in the chat interface.
- Images and other multimodal inputs are converted into token equivalents. A typical image might consume 500 to 2,000 tokens depending on resolution and the model's encoding scheme.


## Subword tokenization and its implications

The subword nature of tokenization has practical consequences that technology professionals should understand. Because tokens do not always align with word boundaries, certain operations that seem simple at the text level become complex at the token level.

- **Character-level tasks:** LLMs sometimes struggle with tasks like counting characters in a word, reversing strings, or detecting anagrams because the model operates on tokens, not individual characters. The word "strawberry" may be tokenized as ["str", "aw", "berry"], making it non-trivial for the model to count the letter "r."
- **Multilingual efficiency:** Languages that use non-Latin scripts (Chinese, Japanese, Korean, Arabic, Hindi) typically require more tokens per semantic unit than English. This means the effective context window is smaller for these languages, and costs per word are higher.
- **Structured data:** JSON, XML, and other structured formats consume disproportionately many tokens because of their use of brackets, quotes, colons, and other special characters. Compact formats or structured output modes can reduce this overhead.
- **Whitespace sensitivity:** Leading spaces, trailing newlines, and indentation all consume tokens. This is especially relevant for code, where indentation is meaningful and can significantly inflate token counts.


## Special tokens

Beyond the tokens that represent text content, models use special tokens to structure their input and manage their behavior. These tokens are not part of the natural vocabulary but are injected by the tokenizer or API layer to delineate different parts of a request.

Common categories of special tokens include:

- **Beginning-of-sequence and end-of-sequence tokens:** Signal the start and end of a generation window.
- **Role delimiters:** Mark boundaries between system, user, and assistant messages in chat-formatted models.
- **Tool-use tokens:** Indicate that the model is invoking a tool or function, and delineate the arguments and results.
- **Padding tokens:** Used during training to align sequences to uniform lengths within a batch.

Special tokens are typically hidden from end users but consume token budget within the context window. When estimating token usage for an API call, the actual count will be slightly higher than the raw text would suggest because of these structural tokens.


## Related

To deepen your understanding of tokens and their role in LLM systems, explore related topics including context windows and how they constrain model interactions, byte-pair encoding and other tokenization algorithms, prompt engineering techniques for token-efficient interactions, model context protocol (MCP) for tool-augmented generation, retrieval-augmented generation (RAG) for managing knowledge that exceeds context limits, and LLM pricing models across different providers. Understanding embeddings and vector representations will also clarify how tokens relate to the internal representations that models use for reasoning.


## Summary

Tokens are the atomic units of LLM computation, bridging the gap between human-readable text and the numerical representations that models process internally. Every interaction with an LLM is measured in tokens: they determine what fits in the context window, how much each request costs, and how the model perceives and generates text. Modern tokenizers based on byte-pair encoding strike a practical balance between vocabulary compactness and coverage of diverse languages and content types. For technology professionals, fluency with tokenization concepts is essential for designing effective prompts, managing costs, building reliable integrations, and understanding the capabilities and limitations of the models they depend on.


## References

- Sennrich, R., Haddow, B., & Birch, A. (2016). "Neural Machine Translation of Rare Words with Subword Units." Proceedings of the 54th Annual Meeting of the Association for Computational Linguistics. https://aclanthology.org/P16-1162/
- OpenAI. "Tokenizer tool and tiktoken library." https://platform.openai.com/tokenizer
- Anthropic. "Claude documentation: Token counting." https://docs.anthropic.com/en/docs/build-with-claude/token-counting
- Kudo, T., & Richardson, J. (2018). "SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing." Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing. https://aclanthology.org/D18-2012/
- Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2023). "Lost in the Middle: How Language Models Use Long Contexts." arXiv:2307.03172. https://arxiv.org/abs/2307.03172
- Hugging Face. "Summary of the tokenizers." https://huggingface.co/docs/transformers/tokenizer_summary
