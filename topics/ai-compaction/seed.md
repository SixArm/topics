# AI compaction

Server-side context compaction for managing long conversations that approach context window limits.
This feature is eligible for Zero Data Retention (ZDR). When your organization has a ZDR arrangement, data sent through this feature is not stored after the API response is returned.

Server-side compaction is the recommended strategy for managing context in long-running conversations and agentic workflows. It handles context management automatically with minimal integration work.

Compaction extends the effective context length for long-running conversations and tasks by automatically summarizing older context when approaching the context window limit. This isn't just about staying under a token cap. As conversations get longer, models struggle to maintain focus across the full history. Compaction keeps the active context focused and performant by replacing stale content with concise summaries.

For a deeper look at why long contexts degrade and how compaction helps, see Effective context engineering.

This is ideal for:

Chat-based, multi-turn conversations where you want users to use one chat for a long period of time
Task-oriented prompts that require a lot of follow-up work (often tool use) that may exceed the context window
Compaction is in beta. Include the beta header compact-2026-01-12 in your API requests to use this feature.

Supported models
Compaction is supported on the following models:

Claude Mythos Preview (claude-mythos-preview)
Claude Opus 4.7 (claude-opus-4-7)
Claude Opus 4.6 (claude-opus-4-6)
Claude Sonnet 4.6 (claude-sonnet-4-6)
How compaction works
When compaction is enabled, Claude automatically summarizes your conversation when it approaches the configured token threshold. The API:

Detects when input tokens exceed your specified trigger threshold.
Generates a summary of the current conversation.
Creates a compaction block containing the summary.
Continues the response with the compacted context.
On subsequent requests, append the response to your messages. The API automatically drops all message blocks prior to the compaction block, continuing the conversation from the summary.
