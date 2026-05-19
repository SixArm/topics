# Retrieval augmented generation (RAG)

Retrieval augmented generation (RAG) is a technique in artificial intelligence that combines information retrieval with large language model (LLM) generation to produce responses grounded in external evidence. Rather than relying solely on knowledge encoded during pretraining, a RAG system fetches relevant documents from an external knowledge base at query time and injects them into the prompt as context. This approach addresses several fundamental limitations of standalone LLMs, including knowledge staleness, hallucination, and the inability to reason over private or domain-specific data. First described by Lewis et al. in a 2020 paper from Facebook AI Research, RAG has become one of the most widely adopted patterns for building production-grade AI applications.

## How RAG works

A RAG pipeline follows a three-stage process: indexing, retrieval, and generation.

During **indexing**, the external knowledge base is preprocessed. Documents are split into chunks, converted into dense vector embeddings using an embedding model, and stored in a vector database or search index. This step happens offline and can be repeated whenever the knowledge base is updated.

During **retrieval**, a user query is converted into an embedding using the same model, and the system performs a similarity search against the indexed chunks. The top-k most relevant chunks are returned, typically ranked by cosine similarity or dot product score.

During **generation**, the retrieved chunks are concatenated with the original query into a prompt that is sent to the LLM. The model produces a response that is informed by both its pretrained knowledge and the retrieved evidence, allowing it to cite specific facts, figures, and passages.

| Stage | Input | Output | Key Technology |
|-------|-------|--------|----------------|
| Indexing | Raw documents | Vector embeddings stored in a database | Embedding models, chunking strategies, vector databases |
| Retrieval | User query | Top-k relevant document chunks | Semantic search, approximate nearest neighbor (ANN) algorithms |
| Generation | Query + retrieved context | Grounded natural language response | Large language models, prompt engineering |

## Key components

A production RAG system depends on several interrelated components, each of which significantly affects overall quality.

- **Document loader and preprocessor**: Ingests raw data from sources such as PDFs, databases, APIs, or web pages, and normalizes it into a consistent format for chunking.
- **Chunking strategy**: Splits documents into segments small enough to fit within the LLM context window while preserving semantic coherence. Common approaches include fixed-size token windows, recursive character splitting, and semantic chunking based on topic boundaries.
- **Embedding model**: Converts text chunks and queries into dense vector representations. Popular choices include OpenAI's text-embedding models, Cohere Embed, and open-source alternatives such as BGE and E5.
- **Vector database**: Stores and indexes embeddings for fast similarity search. Examples include Pinecone, Weaviate, Qdrant, Chroma, Milvus, and pgvector for PostgreSQL.
- **Retriever**: Executes the similarity search and returns ranked results. May combine dense retrieval with sparse keyword methods (BM25) in a hybrid approach.
- **Language model**: Generates the final response using the retrieved context. The choice of model affects response quality, latency, cost, and context window capacity.
- **Orchestration framework**: Manages the pipeline end to end. LangChain, LlamaIndex, and Haystack are widely used frameworks that provide abstractions for building and evaluating RAG systems.

## Advantages of RAG

RAG addresses several well-known limitations of using LLMs in isolation.

- **Reduced hallucination**: By grounding responses in retrieved evidence, the model is less likely to fabricate facts. Users can verify claims by checking cited sources.
- **Up-to-date knowledge**: The external knowledge base can be refreshed independently of model retraining, enabling the system to answer questions about recent events, new products, or evolving regulations.
- **Domain specialization without fine-tuning**: Organizations can connect an off-the-shelf LLM to proprietary data, achieving domain expertise without the cost and complexity of fine-tuning.
- **Data privacy and access control**: Sensitive or internal documents can remain within an organization's infrastructure. Retrieval can be filtered by user permissions, ensuring that responses only draw from authorized content.
- **Cost efficiency**: Maintaining and updating a knowledge base is significantly cheaper than retraining or fine-tuning a large model every time information changes.
- **Transparency and auditability**: Retrieved source documents can be surfaced alongside the generated answer, creating a verifiable chain of evidence.

## RAG vs. fine-tuning vs. prompting

Technology professionals frequently weigh RAG against alternative approaches for adapting LLMs to specific use cases. Each method has distinct strengths and trade-offs.

| Criterion | RAG | Fine-tuning | Prompt engineering |
|-----------|-----|-------------|-------------------|
| Knowledge freshness | High; update the knowledge base at any time | Low; requires retraining to incorporate new data | Low; limited to what fits in the prompt |
| Setup complexity | Moderate; requires retrieval infrastructure | High; requires training data curation, compute, and expertise | Low; no infrastructure beyond API access |
| Hallucination risk | Lower; grounded in retrieved evidence | Moderate; model may still generate unsupported claims | Higher; no external grounding |
| Cost | Moderate; vector database and embedding compute | High; GPU compute for training | Low; only inference cost |
| Domain adaptation depth | Good for factual recall and lookup tasks | Best for learning new styles, formats, or reasoning patterns | Limited to in-context examples |
| Data privacy | Strong; data stays in your infrastructure | Moderate; training data may be exposed to the model provider | Weak; data must be included in prompts sent to the API |
| Latency | Slightly higher due to retrieval step | Same as base model inference | Same as base model inference |

In practice, these approaches are not mutually exclusive. A common pattern is to fine-tune a model for a particular tone or reasoning style while using RAG to supply it with current factual knowledge.

## Advanced RAG techniques

The baseline RAG pattern described above is sometimes called "naive RAG." Practitioners have developed a range of techniques to improve retrieval quality, generation accuracy, and overall system robustness.

- **Hybrid search**: Combines dense vector search with sparse keyword search (BM25) and merges results using reciprocal rank fusion. This improves recall for queries where exact terminology matters.
- **Query transformation**: Rewrites or expands the user query before retrieval to improve match quality. Techniques include hypothetical document embedding (HyDE), step-back prompting, and multi-query generation.
- **Reranking**: Applies a cross-encoder or other reranking model to the initially retrieved chunks, reordering them by relevance before they are passed to the LLM.
- **Recursive retrieval**: Retrieves at multiple levels of granularity, for example fetching a summary first and then retrieving detailed sub-documents, enabling the system to handle complex multi-hop questions.
- **Self-RAG and corrective RAG**: Adds a reflection step in which the model evaluates whether the retrieved documents are relevant and whether its own generated output is supported by the evidence, triggering re-retrieval if necessary.
- **Parent document retrieval**: Stores small chunks for precise retrieval but returns the larger parent document to the LLM, providing richer context for generation.
- **Metadata filtering**: Enriches chunks with structured metadata such as date, author, document type, or access level, and applies filters at retrieval time to narrow results.

## Chunking strategies

Chunking is one of the most consequential design decisions in a RAG pipeline. Poorly chunked documents lead to irrelevant retrieval and degraded generation quality.

| Strategy | Description | Best for |
|----------|-------------|----------|
| Fixed-size token window | Splits text into equal-length segments with optional overlap | Simple, uniform documents |
| Recursive character splitting | Splits on paragraph breaks, then sentences, then characters as needed | General-purpose text |
| Semantic chunking | Groups text by topic coherence using embedding similarity | Long documents with diverse content |
| Document-structure-aware | Splits based on headings, sections, or HTML structure | Technical documentation, reports |
| Sentence-level | Each sentence is a separate chunk | FAQ-style or highly granular content |

Overlap between chunks (typically 10 to 20 percent) helps preserve context at chunk boundaries. Chunk size is a trade-off: smaller chunks improve retrieval precision but may lack sufficient context for generation, while larger chunks provide more context but may dilute relevance.

## Evaluation

Evaluating RAG systems requires measuring both the retrieval and generation stages independently and in combination.

- **Retrieval metrics**: Precision at k, recall at k, mean reciprocal rank (MRR), and normalized discounted cumulative gain (nDCG) measure how well the retriever surfaces relevant documents.
- **Generation metrics**: Faithfulness measures whether the generated response is supported by the retrieved context. Answer relevancy measures whether the response actually addresses the question. These are often assessed using LLM-as-judge approaches.
- **End-to-end metrics**: Overall answer correctness, user satisfaction, and task completion rate capture the combined quality of retrieval and generation.
- **Evaluation frameworks**: RAGAS, TruLens, and DeepEval provide automated evaluation pipelines that compute these metrics using a combination of embedding similarity, LLM judges, and reference-based comparisons.

A robust evaluation strategy includes both automated metrics for rapid iteration and human evaluation for nuanced quality assessment, particularly around factual correctness and source attribution.

## Common applications

RAG has become the standard architecture for a wide range of enterprise and consumer AI applications.

- **Customer support**: Chatbots that answer questions about company products, policies, and troubleshooting procedures by retrieving from internal knowledge bases.
- **Legal research**: Tools that surface relevant case law, statutes, and regulatory guidance, grounding analysis in authoritative legal sources.
- **Healthcare and life sciences**: Systems that retrieve the latest medical literature, clinical trial data, or drug interaction information to support clinical decision-making.
- **Internal knowledge management**: Platforms that let employees search across organizational wikis, Confluence pages, Slack archives, and shared drives using natural language.
- **Financial analysis**: Applications that retrieve earnings reports, SEC filings, and market data to generate grounded investment summaries and risk assessments.
- **Software development**: Coding assistants that retrieve relevant documentation, API references, and internal code examples to provide context-aware suggestions.

## Challenges and limitations

Despite its advantages, RAG introduces architectural complexity and has known failure modes that practitioners must address.

- **Retrieval quality is the bottleneck**: If the retriever returns irrelevant documents, the LLM will either ignore them or, worse, incorporate misleading information into its response.
- **Context window limits**: Even with large context windows, there is a practical limit to how many retrieved chunks can be included. Excessive context can degrade generation quality due to the "lost in the middle" phenomenon, where models underweight information in the middle of long prompts.
- **Latency overhead**: The retrieval step adds latency to each request, which may be unacceptable for real-time applications. Caching, pre-computation, and streaming can mitigate this.
- **Chunking sensitivity**: The quality of responses is highly sensitive to how documents are chunked. There is no universal best practice; the optimal strategy depends on the document type, query patterns, and domain.
- **Maintenance burden**: The knowledge base, embedding models, and retrieval infrastructure require ongoing maintenance, versioning, and monitoring.
- **Security and access control**: Ensuring that users only see responses derived from documents they are authorized to access requires careful integration with identity and access management systems.

## Related

Professionals working with RAG should also explore vector databases and approximate nearest neighbor search algorithms, which form the infrastructure backbone of retrieval systems. Embedding models and representation learning are essential for understanding how text is converted into searchable vectors. Fine-tuning and parameter-efficient fine-tuning (such as LoRA) complement RAG when deeper behavioral adaptation is needed. Prompt engineering and chain-of-thought reasoning techniques improve generation quality within the RAG pipeline. Knowledge graphs offer a structured alternative or supplement to unstructured document retrieval. Finally, evaluation frameworks such as RAGAS and emerging standards for AI system observability are critical for operating RAG systems reliably in production.

## Summary

Retrieval augmented generation is a foundational pattern for building AI applications that need to reason over external, current, or private knowledge. By decoupling the knowledge source from the model itself, RAG enables organizations to deploy capable, domain-specific AI systems without the cost and rigidity of model retraining. The technique's effectiveness depends on thoughtful engineering across the full pipeline, from document preprocessing and chunking through retrieval tuning and generation evaluation. As the ecosystem of embedding models, vector databases, and orchestration frameworks continues to mature, RAG remains the most practical and widely adopted approach for grounding large language model outputs in verifiable evidence.

## References

- Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Kuttler, H., Lewis, M., Yih, W., Rocktaschel, T., Riedel, S., & Kiela, D. (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." Advances in Neural Information Processing Systems, 33. https://arxiv.org/abs/2005.11401
- Gao, Y., Xiong, Y., Dibia, V., Zhang, L., Raz, D., Liden, H., & Han, J. (2024). "Retrieval-Augmented Generation for Large Language Models: A Survey." https://arxiv.org/abs/2312.10997
- Asai, A., Wu, Z., Wang, Y., Sil, A., & Hajishirzi, H. (2024). "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection." ICLR 2024. https://arxiv.org/abs/2310.11511
- Yan, S., et al. (2024). "Corrective Retrieval Augmented Generation." https://arxiv.org/abs/2401.15884
- LangChain Documentation: Retrieval-Augmented Generation. https://docs.langchain.com
- LlamaIndex Documentation. https://docs.llamaindex.ai
- RAGAS: Evaluation Framework for RAG Pipelines. https://docs.ragas.io
