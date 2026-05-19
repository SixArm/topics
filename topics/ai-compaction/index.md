# AI compaction

AI compaction is a server-side technique for managing long conversations that approach context window limits. Rather than simply truncating older messages or failing when the context is full, compaction automatically summarizes earlier portions of the conversation, replacing stale content with concise summaries that preserve essential information.

As conversations grow longer, large language models struggle to maintain focus across the full history. Important details get lost, responses become less coherent, and performance degrades. Compaction addresses this by keeping the active context focused and relevant. It extends the effective context length without requiring the application developer to manually manage token budgets or build custom summarization logic.

When compaction is enabled, the system monitors the total input tokens against a configured trigger threshold. Once that threshold is exceeded, it generates a summary of the current conversation and creates a compaction block containing that summary. All message blocks prior to the compaction block are dropped on subsequent requests, so the conversation continues seamlessly from the summarized state. This process is transparent to the end user.

Compaction is particularly valuable in two scenarios: multi-turn chat applications where users maintain a single conversation over extended periods, and task-oriented agentic workflows that involve many tool calls and follow-up steps that would otherwise exceed the context window.

From an integration standpoint, server-side compaction requires minimal effort. Developers enable the feature, set a token threshold, and append responses to their message history as usual. The API handles the rest. This makes it the recommended strategy for context management in long-running applications, compared to client-side approaches that require developers to implement their own truncation or summarization pipelines.
