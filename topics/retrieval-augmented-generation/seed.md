# Retrieval augmented generation (RAG)

Retrieval augmented generation (RAG) is a technique that combines information retrieval with language model generation to improve the accuracy and relevance of the generated text, and to better ground the model's response in evidence. In RAG, a language model is augmented with an external knowledge base or a set of documents that is passed into the context window. The data is retrieved at run time when a query is sent to the model, although the model itself does not necessarily retrieve the data (but can with tool use and a retrieval function). When generating text, relevant information first must be retrieved from the knowledge base based on the input prompt, and then passed to the model along with the original query. The model uses this information to guide the output it generates. This allows the model to access and utilize information beyond its training data, reducing the reliance on memorization and improving the factual accuracy of the generated text. RAG can be particularly useful for tasks that require up-to-date information, domain-specific knowledge, or explicit citation of sources. However, the effectiveness of RAG depends on the quality and relevance of the external knowledge base and the knowledge that is retrieved at runtime.

Retrieval-Augmented Generation (RAG) is an AI framework that improves the performance of Large Language Models (LLMs) by giving them access to external knowledge sources beyond their original training data. Think of it like a student taking an "open-book exam": instead of relying only on memory (pre-training), the model can look up specific facts in a library (external database) to provide more accurate and up-to-date answers. [1, 2, 3, 4, 5]

## How RAG Works

The process typically follows a three-step cycle: [6]

1.  Retrieval: When a user asks a question, the system searches an external data source—like a vector database or internal company documents—for relevant information. [7, 8, 9]
2.  Augmentation: The retrieved data is added to the user's original prompt as extra context. [4, 10]
3.  Generation: The LLM uses both the augmented prompt and its own internal logic to generate a final response that is grounded in the retrieved facts. [7, 8, 11]

## Key Benefits

- Reduced Hallucinations: By forcing the model to cite specific sources, RAG reduces the likelihood of it "hallucinating" or making up facts. [11, 12, 13]
- Real-Time Updates: You can update the external knowledge base instantly without the massive cost of retraining the entire model. [3, 11, 13]
- Data Privacy: Enterprises can use RAG to let AI safely interact with proprietary or sensitive internal data that was never part of public training sets. [3, 12, 14]
- Transparency: Responses can include citations, allowing users to verify information by clicking through to the original source. [11, 15, 16]

## Common Use Cases

- Customer Support: AI bots that can answer specific questions about a company's unique refund policies or technical manuals.
- Legal & Healthcare: Tools that pull the latest case law or medical research to assist professionals with domain-specific queries.
- Internal Knowledge Management: Employees searching through thousands of internal PDFs and emails using natural language. [5, 12, 14, 17, 18]

[1] [https://cloud.google.com](https://cloud.google.com/use-cases/retrieval-augmented-generation)
[2] [https://www.ibm.com](https://www.ibm.com/think/topics/retrieval-augmented-generation)
[3] [https://aws.amazon.com](https://aws.amazon.com/what-is/retrieval-augmented-generation/)
[4] [https://research.ibm.com](https://research.ibm.com/blog/retrieval-augmented-generation-RAG)
[5] [https://www.youtube.com](https://www.youtube.com/watch?v=dDkynerzV-Q)
[6] [https://www.krasamo.com](https://www.krasamo.com/retrieval-augmented-generation-rag/)
[7] [https://www.youtube.com](https://www.youtube.com/watch?v=gweRh5Xtkq0&t=4)
[8] [https://www.youtube.com](https://www.youtube.com/watch?v=_HQ2H_0Ayy0)
[9] [https://www.redhat.com](https://www.redhat.com/en/topics/ai/what-is-retrieval-augmented-generation)
[10] [https://www.pinecone.io](https://www.pinecone.io/learn/retrieval-augmented-generation/)
[11] [https://www.youtube.com](https://www.youtube.com/watch?v=T-D1OfcDW1M)
[12] [https://en.wikipedia.org](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
[13] [https://www.nvidia.com](https://www.nvidia.com/en-gb/glossary/retrieval-augmented-generation/)
[14] [https://www.salesforce.com](https://www.salesforce.com/agentforce/what-is-rag/)
[15] [https://www.oracle.com](https://www.oracle.com/uk/artificial-intelligence/generative-ai/retrieval-augmented-generation-rag/)
[16] [https://www.mckinsey.com](https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-retrieval-augmented-generation-rag)
[17] [https://www.superannotate.com](https://www.superannotate.com/blog/rag-explained)
[18] [https://www.reddit.com](https://www.reddit.com/r/datascience/comments/16bja0s/why_is_retrieval_augmented_generation_rag_not/)
[19] [https://www.chitika.com](https://www.chitika.com/page/2/)
