# Model Context Protocol (MCP)

Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to LLMs. Like a USB-C port for AI applications, MCP provides a unified way to connect AI models to different data sources and tools. MCP enables AI systems to maintain consistent context across interactions and access external resources in a standardized manner.

The Model Context Protocol (MCP) is an open-source standard that allows AI assistants and Large Language Models (LLMs) to connect seamlessly to external data and tools. Introduced by [Anthropic](https://anthropic.com/news/model-context-protocol) in November 2024, it acts as a "universal translator" or "USB-C port" for AI, replacing fragmented, custom integrations with a single, standardized protocol. [1, 2, 3, 4] 

[Model Context Protocol (MCP) Explained](https://humanloop.com/blog/mcp)
[A practical introduction to the Model-Context-Protocol (MCP ...](https://dida.do/blog/a-practical-introduction-to-the-model-context-protocol-mcp)
[Model Context Protocol (MCP): Understanding security risks ...](https://www.redhat.com/en/blog/model-context-protocol-mcp-understanding-security-risks-and-controls)

## How It Works
MCP uses a client-server architecture to bridge the gap between static AI models and real-time data: [5, 6, 7, 8] 

* MCP Host: The application where the user interacts with the AI, such as [Claude Desktop](https://modelcontextprotocol.io/docs/getting-started/intro), an AI-powered IDE (like Cursor), or a custom chat interface. [3, 9] 
* MCP Client: A component within the host that maintains a 1:1 connection with a server and translates the LLM's requests into the protocol's language. [3, 9] 
* MCP Server: Lightweight programs that expose specific capabilities—such as database access, file systems, or [GitHub](https://github.com/modelcontextprotocol/servers) integrations—to the client. [9, 10] 
* Transport: Communication happens via standard protocols like JSON-RPC 2.0 over local (stdio) or remote (HTTP/SSE) connections. [11, 12] 

## Core Capabilities
MCP servers typically provide three types of features to an AI model: [13, 14, 15] 

   1. Resources: Read-only data like documentation, local files, or API responses that provide context for a conversation.
   2. Tools: Executable functions that allow the AI to take actions, such as searching a repository, updating a CRM, or running code.
   3. Prompts: Standardised templates that guide how the AI should approach specific tasks or workflows. [1, 14, 16, 17, 18] 

## Key Benefits

* Scalability: Developers only need to implement MCP once to access an entire ecosystem of pre-built integrations. [19] 
* Reduced Hallucinations: By providing models with access to live, reliable data sources (like [Google Search](https://modelcontextprotocol.io/examples) or private databases), responses become more accurate. [3, 20] 
* Vendor Neutrality: It allows developers to switch between different LLM providers (e.g., Anthropic, OpenAI, or Google DeepMind) without rewriting all their tool-use code. [1, 3] 

[1] [https://en.wikipedia.org](https://en.wikipedia.org/wiki/Model_Context_Protocol)
[2] [https://anthropic.com](https://anthropic.com/news/model-context-protocol)
[3] [https://cloud.google.com](https://cloud.google.com/discover/what-is-model-context-protocol)
[4] [https://www.databricks.com](https://www.databricks.com/blog/what-is-model-context-protocol)
[5] [https://medium.com](https://medium.com/@nimritakoul01/the-model-context-protocol-mcp-a-complete-tutorial-a3abe8a7f4ef)
[6] [https://www.cloudflare.com](https://www.cloudflare.com/learning/ai/what-is-model-context-protocol-mcp/)
[7] [https://www.figma.com](https://www.figma.com/resource-library/what-is-mcp/)
[8] [https://www.salesforce.com](https://www.salesforce.com/agentforce/mcp-support/model-context-protocol/)
[9] [https://modelcontextprotocol.io](https://modelcontextprotocol.io/docs/learn/architecture)
[10] [https://modelcontextprotocol.io](https://modelcontextprotocol.io/docs/learn/server-concepts)
[11] [https://www.youtube.com](https://www.youtube.com/watch?v=kOhLoixrJXo&t=27)
[12] [https://modelcontextprotocol.io](https://modelcontextprotocol.io/specification/2025-06-18)
[13] [https://www.youtube.com](https://www.youtube.com/watch?v=CQywdSdi5iA&t=29)
[14] [https://modelcontextprotocol.io](https://modelcontextprotocol.io/docs/develop/build-server)
[15] [https://reliasoftware.com](https://reliasoftware.com/blog/what-is-model-context-protocol)
[16] [https://anthropic.skilljar.com](https://anthropic.skilljar.com/introduction-to-model-context-protocol)
[17] [https://valentinaalto.medium.com](https://valentinaalto.medium.com/introducing-model-context-protocol-3b3d99c43241)
[18] [https://modelcontextprotocol.io](https://modelcontextprotocol.io/examples)
[19] [https://www.anthropic.com](https://www.anthropic.com/engineering/code-execution-with-mcp)
[20] [https://www.youtube.com](https://www.youtube.com/watch?v=tzrwxLNHtRY)
