# AI context window

An AI context window is the total amount of text a language model can reference when generating a response, encompassing both the input and the output. Think of it as the model's working memory. It is distinct from the vast training corpus the model learned from; the context window holds only what is immediately relevant to the current conversation or task.

A larger context window allows the model to handle more complex prompts, maintain coherence over longer conversations, and process substantial documents in a single pass. Modern frontier models offer context windows ranging from 200,000 tokens to over one million tokens, where a token is roughly three-quarters of a word.

However, more context is not automatically better. As token count grows, retrieval accuracy and recall tend to degrade, a phenomenon known as context rot. This makes curating what goes into the context window just as important as how much space is available. Effective context engineering focuses on placing the most relevant information where the model can use it reliably.

In multi-turn conversations, tokens accumulate linearly: each user message and assistant response is preserved, consuming progressively more of the window. When conversations approach the limit, strategies like compaction (server-side summarization of earlier turns) allow sessions to continue beyond the raw token ceiling without losing essential information.

Context awareness is a related capability in which the model receives explicit updates on its remaining token budget during a session. This allows it to manage long-running tasks more effectively, allocating effort and output rather than guessing how much room remains.

For practitioners, the key tradeoff is between breadth and precision. Filling the window gives the model more information, but selectively managing context yields more accurate and coherent results.
