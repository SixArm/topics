# AI compaction

AI compaction is a server-side technique for managing long conversations that approach context window limits. Rather than simply truncating older messages or failing when the context is full, compaction automatically summarizes earlier portions of the conversation, replacing verbose or stale content with concise summaries that preserve essential information. This approach allows large language model (LLM) applications to sustain coherent, extended interactions without manual intervention from the developer or disruption to the end user.

## Why Compaction Matters

Large language models operate within a fixed context window, measured in tokens. Every message in a conversation, including system prompts, user inputs, assistant responses, and tool call results, consumes tokens from that window. As a conversation grows, several problems emerge. The model loses access to early messages if the context overflows. Response quality degrades as the model struggles to attend to an increasingly large input. Latency and cost increase proportionally with input size. Compaction mitigates all three of these problems by keeping the active context focused, relevant, and within budget.

Without compaction, developers must implement their own strategies to handle long conversations: truncating old messages, building sliding windows, or constructing bespoke summarization pipelines. Each of these approaches introduces complexity, risks losing important context, and requires ongoing maintenance. Server-side compaction eliminates this burden by offering a single, API-managed solution.

## How Compaction Works

When compaction is enabled, the system monitors the total input tokens against a configured trigger threshold. Once that threshold is exceeded, the following sequence occurs:

- The system generates a summary of the current conversation history, capturing key facts, decisions, and context.
- A compaction block is created containing that summary.
- All message blocks prior to the compaction block are dropped on subsequent requests.
- The conversation continues seamlessly from the summarized state.

This process is transparent to the end user. From their perspective, the conversation simply continues without interruption. The summary preserves the essential thread of the discussion while discarding redundant or low-value detail.

Compaction can trigger multiple times in a single long-running conversation. Each compaction cycle summarizes the accumulated history since the last compaction point, producing a progressively distilled representation of the full interaction.

## Compaction vs. Other Context Management Strategies

| Strategy | Mechanism | Pros | Cons |
|---|---|---|---|
| Compaction | Summarize and replace older messages | Preserves key context; API-managed; minimal developer effort | Some detail loss in summaries; depends on summarization quality |
| Truncation | Drop oldest messages entirely | Simple to implement; predictable token usage | Loses all early context; can break coherence |
| Sliding Window | Keep only the most recent N messages | Easy to reason about; constant memory | Arbitrary cutoff; important early context lost |
| RAG Retrieval | Retrieve relevant past messages on demand | Can surface any past message; scalable | Adds latency; requires vector store infrastructure |
| Client-Side Summarization | Application code summarizes before sending | Full developer control over summary content | Significant implementation effort; error-prone |

Compaction occupies a useful middle ground: it is more context-preserving than truncation or sliding windows, less infrastructure-heavy than retrieval-augmented generation, and less labor-intensive than client-side summarization.

## Key Configuration Parameters

When enabling compaction through an API, there are several parameters that shape its behavior:

- **Trigger threshold**: The token count at which compaction is invoked. Setting this too low causes frequent summarization and potential context loss. Setting it too high risks hitting the hard context window limit before compaction fires.
- **Compaction model**: Some implementations allow specifying which model performs the summarization. A smaller, faster model can reduce latency and cost for the compaction step itself.
- **Summary instructions**: Custom prompts that guide what the summary should prioritize. For example, a coding assistant might instruct the compaction summary to always retain file paths, function names, and error messages.
- **Preservation rules**: Certain messages, such as system prompts or pinned instructions, can be excluded from compaction so they persist across the full conversation lifetime.

Tuning these parameters requires balancing three concerns: retaining enough context for coherent responses, minimizing token usage and cost, and avoiding unnecessary compaction cycles that add latency.

## Use Cases

Compaction is particularly valuable in two broad categories of applications:

**Multi-turn chat applications.** When users maintain a single conversation over hours or days, the accumulated message history easily exceeds context limits. Customer support bots, tutoring systems, and personal assistants all benefit from compaction because they need to recall user preferences and prior statements without carrying every verbatim exchange.

**Agentic workflows.** Task-oriented agents that invoke many tool calls, process intermediate results, and iterate through multi-step plans generate large volumes of context rapidly. A coding agent that reads files, runs tests, edits code, and checks results can consume tens of thousands of tokens in a single task. Compaction allows these agents to operate on extended tasks without hitting context ceilings.

## Tradeoffs and Limitations

Compaction is not lossless. Every summarization step discards some detail. Specific risks include:

- **Information loss**: Subtle details, exact wording, or numerical values mentioned early in a conversation may not survive summarization.
- **Summary drift**: Repeated compaction cycles can compound summarization errors, gradually shifting the model's understanding of the conversation.
- **Latency spikes**: The compaction step itself requires an additional LLM call, which introduces a one-time latency increase at the compaction point.
- **Debugging difficulty**: Because pre-compaction messages are dropped, it can be harder to reconstruct the full conversation history for debugging or auditing purposes.

For applications where exact recall of early messages is critical, such as legal or compliance workflows, compaction should be supplemented with a persistent message store or retrieval system.

## Best Practices

- Set the trigger threshold to approximately 60-80% of the maximum context window to leave headroom for the compaction summary and the next user turn.
- Use custom summary instructions tailored to your application domain. Generic summarization may discard information that is critical for your specific use case.
- Log the full conversation history to a persistent store before compaction occurs, so that auditing and debugging remain possible.
- Test compaction behavior with realistic conversation lengths during development, not just short exchanges.
- Monitor compaction frequency in production. If compaction triggers too often, consider whether your system prompt or tool outputs are consuming excessive tokens.

## Related

To deepen your understanding of AI compaction, explore the related topics of AI context windows, which define the fundamental constraint that compaction addresses; AI LLM tokens, which explain the unit of measurement underlying context limits; retrieval-augmented generation (RAG), which offers a complementary approach to surfacing past context; prompt engineering, which influences how effectively compaction summaries preserve relevant information; and agentic AI architectures, where compaction plays a critical role in enabling extended autonomous task execution.

## Summary

AI compaction is a server-side context management technique that automatically summarizes older portions of a conversation when the token count approaches the context window limit. It preserves essential information while discarding redundant detail, enabling both multi-turn chat applications and agentic workflows to operate over extended interactions without manual context management. While compaction introduces tradeoffs around information loss and summarization fidelity, it represents the most practical default strategy for most long-running LLM applications, reducing developer burden and improving the reliability of sustained conversations.

## References

- Anthropic. "Long conversations and compaction." Anthropic API Documentation. https://docs.anthropic.com/en/docs/build-with-claude/context-windows
- Anthropic. "Claude Code: Compaction." Anthropic Engineering Blog. https://docs.anthropic.com/en/docs/claude-code
- OpenAI. "Managing context in long conversations." OpenAI Platform Documentation. https://platform.openai.com/docs/guides/conversation-state
- Vaswani, A., et al. "Attention Is All You Need." Advances in Neural Information Processing Systems, 2017. The foundational transformer architecture paper that established the fixed-context-window constraint compaction addresses.
- Lewis, P., et al. "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." NeurIPS, 2020. Describes RAG as an alternative approach to extending effective model memory beyond the context window.
