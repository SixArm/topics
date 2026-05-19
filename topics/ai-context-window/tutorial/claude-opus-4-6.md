# AI context window

An AI context window is the total amount of text a language model can reference when generating a response, encompassing both the input and the output. Think of it as the model's working memory. It is distinct from the vast training corpus the model learned from; the context window holds only what is immediately relevant to the current conversation or task. Understanding the context window is essential for anyone building applications on large language models, because it governs the upper bound of information the model can reason about at any given moment.

## How context windows work

When a user submits a prompt, the model tokenizes the input into discrete units called tokens. A token is roughly three-quarters of a word in English, though the exact mapping varies by tokenizer and language. The model then processes these tokens through its transformer architecture, attending to every token in the window simultaneously. Both the input (system instructions, conversation history, documents) and the output (the model's generated response) consume tokens from the same fixed budget. Once the window is full, the model cannot accept additional input or produce additional output without discarding something.

This fixed-size design is a direct consequence of the self-attention mechanism in transformer models. Attention computations scale quadratically with sequence length, which means doubling the context window roughly quadruples the compute cost. Advances in sparse attention, ring attention, and mixture-of-experts architectures have enabled dramatic increases in window size, but the fundamental constraint remains: every context window has a ceiling.

## Context window sizes across models

The following table compares context windows for several widely used models as of early 2026.

| Model | Provider | Context window (tokens) | Approximate word equivalent |
|---|---|---|---|
| Claude 4 Opus | Anthropic | 200,000 | ~150,000 words |
| Claude 4 Sonnet | Anthropic | 200,000 | ~150,000 words |
| GPT-4o | OpenAI | 128,000 | ~96,000 words |
| GPT-4.1 | OpenAI | 1,000,000 | ~750,000 words |
| Gemini 2.5 Pro | Google | 1,000,000 | ~750,000 words |
| Llama 4 Maverick | Meta | 1,000,000 | ~750,000 words |

These numbers represent the theoretical maximum. Effective performance within that window varies, and practitioners should not assume that filling the entire window yields optimal results.

## Tokens explained

Tokens are the fundamental units of measurement for context windows. Understanding tokenization is necessary to manage context effectively.

- **Subword units**: Modern tokenizers (such as byte-pair encoding) split text into subword pieces. Common words like "the" are single tokens, while rare or compound words may be split into multiple tokens.
- **Non-text tokens**: Special tokens mark the boundaries between system prompts, user turns, and assistant responses. These consume window space but are invisible to the end user.
- **Language variation**: Languages with longer average word lengths or non-Latin scripts often require more tokens per word, reducing the effective capacity of the window for those languages.
- **Counting tools**: Most API providers offer tokenizer utilities or return token counts in their responses, enabling precise tracking of consumption.

## Context rot and the limits of long context

A larger context window does not guarantee better results. Research and practice have identified several degradation patterns as context length increases, collectively referred to as context rot.

| Phenomenon | Description |
|---|---|
| Lost in the middle | Models attend more strongly to information at the beginning and end of the context, while retrieving facts placed in the middle less reliably. |
| Attention dilution | As the number of tokens grows, the model distributes attention more thinly, reducing its ability to focus on any single piece of information. |
| Retrieval accuracy decay | Needle-in-a-haystack benchmarks show that recall drops as the ratio of relevant to irrelevant tokens decreases. |
| Increased latency | Processing longer contexts requires more computation, resulting in higher time-to-first-token and total generation time. |
| Higher cost | API pricing is typically proportional to token count, making unnecessarily large contexts expensive. |

The practical implication is that curating what goes into the context window matters as much as having a large window available.

## Context engineering

Context engineering is the discipline of selecting, ordering, and formatting the information placed into a model's context window to maximize response quality. It has emerged as one of the most impactful skills for AI practitioners.

- **Relevance filtering**: Use retrieval-augmented generation (RAG) or semantic search to select only the documents or passages most relevant to the current query, rather than dumping entire knowledge bases into the window.
- **Ordering and placement**: Place the most critical information at the beginning of the context (system prompt area) or immediately before the query. Avoid burying key instructions in the middle of long documents.
- **Structured formatting**: Use clear headings, delimiters, and structured data formats (such as JSON or markdown tables) so the model can parse and locate information efficiently.
- **Deduplication**: Remove redundant information that wastes tokens without adding value.
- **Progressive disclosure**: In multi-step workflows, provide only the information needed for the current step, then update the context for subsequent steps.

## Multi-turn conversations and token accumulation

In multi-turn conversations, every user message and assistant response is preserved in the context window. Tokens accumulate linearly, and long conversations can exhaust the window.

- **Turn 1**: System prompt (500 tokens) + user message (100 tokens) + response (300 tokens) = 900 tokens consumed.
- **Turn 10**: All prior turns are retained. If each turn averages 400 tokens of user input and 600 tokens of response, the conversation has consumed roughly 10,500 tokens plus the system prompt.
- **Turn 50**: At the same rate, approximately 50,500 tokens are consumed, a quarter of a 200,000-token window.

When conversations approach the limit, several strategies help:

- **Compaction**: The server summarizes earlier turns into a condensed representation, preserving essential facts while freeing tokens for new turns. This allows conversations to continue beyond the raw token ceiling.
- **Sliding window**: Only the most recent N turns are retained, with older turns dropped entirely.
- **Hybrid approaches**: Combine compaction of older turns with full retention of recent turns, balancing continuity with recency.

## Context awareness

Context awareness is a capability in which the model receives explicit updates on its remaining token budget during a session. Rather than operating blind to how much space remains, the model can allocate effort and output strategically.

This is particularly valuable for long-running tasks such as code generation, document analysis, or multi-step reasoning, where the model needs to plan how much detail to provide in each step. Without context awareness, a model might produce an exhaustive response early in a session and then lack room for later, equally important steps.

## Key tradeoffs

The central tension in working with context windows is between breadth and precision.

| Strategy | Advantage | Risk |
|---|---|---|
| Fill the window with maximum information | Model has access to everything it might need | Attention dilution, context rot, higher cost and latency |
| Curate a lean, focused context | Higher accuracy, faster responses, lower cost | Model may lack information needed for edge cases |
| Use RAG to dynamically populate context | Balances breadth and precision, scales to large knowledge bases | Adds retrieval latency, depends on retrieval quality |
| Compaction for long conversations | Extends effective session length beyond the token ceiling | Summarization may lose nuance or critical details |

The right approach depends on the application. A legal document review system benefits from filling the window with the full document. A customer support chatbot benefits from lean, curated context with RAG for lookups.

## Related

Practitioners working with context windows should also study retrieval-augmented generation (RAG), which provides a scalable way to populate context with relevant information from large corpora. Prompt engineering and context engineering are complementary disciplines that govern how instructions and data are structured within the window. Token economics and API pricing models are directly tied to context window usage. Compaction and summarization techniques are essential for managing long-lived sessions. Finally, the broader topic of AI agent architectures involves sophisticated context management across multiple model calls and tool invocations.

## Summary

The AI context window is the fixed-size working memory that determines how much information a language model can process in a single interaction. While modern models offer windows ranging from 128,000 to over one million tokens, effective use of that space matters far more than raw capacity. Context rot, attention dilution, and cost considerations mean that curating what enters the window, through relevance filtering, strategic ordering, and compaction, is a core competency for any technology professional building on large language models. The discipline of context engineering has emerged as one of the highest-leverage skills in applied AI, turning the context window from a passive constraint into an actively managed resource.

## References

- Liu, N. F., et al. "Lost in the Middle: How Language Models Use Long Contexts." Transactions of the Association for Computational Linguistics, 2024. Foundational research on positional retrieval bias in long-context models.
- Anthropic. "Claude Model Documentation." https://docs.anthropic.com. Official documentation covering context window sizes, tokenization, and compaction for Claude models.
- OpenAI. "GPT-4 Technical Report." https://openai.com. Details on context window scaling and token limits for the GPT-4 family.
- Google DeepMind. "Gemini Technical Report." https://deepmind.google. Architecture and context window specifications for Gemini models.
- Vaswani, A., et al. "Attention Is All You Need." Advances in Neural Information Processing Systems, 2017. The original transformer paper explaining the self-attention mechanism that underlies context window design.
- Kamradt, G. "Needle in a Haystack: Pressure Testing LLMs." 2024. Widely cited evaluation methodology for measuring retrieval accuracy across context window lengths.
