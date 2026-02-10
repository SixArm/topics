# Graph database

A graph database is a type of NoSQL database that uses a graph data model to store, query, and manage data. Unlike relational databases that organize information into rows and columns, or document databases that store nested documents, a graph database represents data as nodes connected by edges (also called relationships). This structure treats relationships as first-class citizens, making it possible to model and traverse highly interconnected data with exceptional efficiency. Graph databases have become essential infrastructure for applications where the connections between data points carry as much meaning as the data points themselves, including social networks, fraud detection systems, knowledge graphs, and recommendation engines.

## Core concepts

A graph database is built on a small number of foundational primitives drawn from graph theory.

**Nodes** are the primary entities in the graph. Each node has a unique identifier and a set of key-value properties that describe its attributes. Nodes often carry one or more labels that classify them into types, such as "Person," "Product," or "Location."

**Edges** (or relationships) are the connections between nodes. Each edge has a type (such as "KNOWS," "PURCHASED," or "LOCATED_IN"), a direction, and optionally its own set of properties. For example, an edge representing a purchase might include properties for the date and the transaction amount.

**Properties** are key-value pairs attached to either nodes or edges. They store the descriptive data that gives the graph its richness, such as a person's name, an edge's weight, or a timestamp.

**Labels and types** provide a lightweight schema mechanism. Node labels group nodes into categories, and edge types classify relationships, enabling efficient filtering during queries.

## How graph databases differ from relational databases

The fundamental difference lies in how relationships are handled. In a relational database, relationships are expressed through foreign keys and resolved at query time using joins. In a graph database, relationships are stored explicitly as edges, enabling constant-time traversal regardless of dataset size.

| Characteristic | Relational database | Graph database |
|---|---|---|
| Data model | Tables with rows and columns | Nodes and edges with properties |
| Relationships | Foreign keys resolved via joins | Stored directly as edges |
| Schema | Rigid, predefined schema | Flexible, schema-optional |
| Query pattern | Set-based operations (SQL) | Pattern matching and traversal |
| Join performance | Degrades with depth and data volume | Constant-time per hop |
| Best fit | Structured, tabular data | Highly connected, relationship-rich data |

## Query languages

Graph databases use specialized query languages designed for pattern matching and traversal rather than set-based operations.

- **Cypher** is a declarative query language developed for Neo4j and now standardized as GQL (Graph Query Language) by ISO. It uses ASCII-art syntax to describe graph patterns, making queries visually intuitive.
- **Gremlin** is an imperative/declarative traversal language that is part of the Apache TinkerPop framework. It is supported by multiple graph databases including Amazon Neptune and JanusGraph.
- **SPARQL** is the standard query language for RDF (Resource Description Framework) graphs, commonly used in semantic web and linked data applications.
- **GQL** is the ISO/IEC international standard for graph query languages (ISO/IEC 39075), published in 2024, which aims to unify graph querying across implementations.

## Graph models

There are two primary graph models in widespread use, each with different trade-offs.

**Property graph model:** Nodes and edges both carry arbitrary key-value properties. Edges are typed and directed. This is the model used by Neo4j, Amazon Neptune (in property graph mode), and most general-purpose graph databases. It excels at operational workloads with complex traversals.

**RDF (Resource Description Framework) model:** Data is stored as subject-predicate-object triples. This model is rooted in semantic web standards and is well-suited for knowledge representation, ontology management, and data integration across heterogeneous sources. Amazon Neptune, GraphDB, and Stardog support RDF.

| Aspect | Property graph | RDF graph |
|---|---|---|
| Basic unit | Nodes and edges with properties | Subject-predicate-object triples |
| Schema | Optional labels and types | Ontologies (OWL, RDFS) |
| Query language | Cypher, Gremlin, GQL | SPARQL |
| Strengths | Traversal performance, developer ergonomics | Interoperability, formal reasoning |
| Common use cases | Social networks, recommendations, fraud | Knowledge graphs, linked data, compliance |

## Common use cases

Graph databases provide significant advantages in domains where relationship traversal is central to the application logic.

- **Social networks:** Modeling users, friendships, follows, and group memberships. Traversals such as "friends of friends" or "mutual connections" are natural graph operations.
- **Recommendation engines:** Identifying products, content, or connections that a user is likely to be interested in, based on the graph of prior interactions and similarities.
- **Fraud detection:** Detecting suspicious patterns such as rings of accounts, rapid chains of transactions, or identity linkages that are invisible in tabular data but obvious in a graph.
- **Knowledge graphs:** Representing entities and their interrelationships for search engines, virtual assistants, and enterprise data catalogs.
- **Network and IT operations:** Mapping infrastructure topology, dependency chains, and impact analysis for root cause diagnosis.
- **Identity and access management:** Modeling users, roles, permissions, and resource hierarchies to answer authorization questions efficiently.
- **Supply chain management:** Tracking materials, suppliers, logistics routes, and dependencies to identify bottlenecks or risks.

## Key benefits

Graph databases offer several advantages that make them compelling for relationship-centric workloads.

- **Traversal performance:** Because relationships are stored directly rather than computed via joins, multi-hop queries execute in constant time per hop, regardless of dataset size.
- **Intuitive data modeling:** The graph model closely mirrors how domain experts think about their data, reducing the impedance mismatch between conceptual models and database schemas.
- **Flexibility:** Adding new node types, edge types, or properties does not require schema migrations or downtime, supporting agile development.
- **Deep query capability:** Queries that would require multiple self-joins or recursive CTEs in SQL, such as shortest path, reachability, or community detection, are native operations in a graph database.
- **Real-time analysis:** Many graph databases are optimized for low-latency, real-time queries, making them suitable for interactive applications and operational decision-making.

## Limitations and trade-offs

Graph databases are not a universal solution and carry trade-offs that should inform architectural decisions.

- **Aggregate and analytical queries:** Operations such as summing a column, computing averages, or generating reports across large datasets are better served by relational or columnar databases.
- **Simple, tabular data:** If data is highly structured with few relationships, a relational database is typically simpler and more efficient.
- **Write-heavy workloads:** Some graph databases have higher write overhead due to the cost of maintaining index-free adjacency or relationship indexes.
- **Ecosystem maturity:** While the graph database ecosystem has matured considerably, tooling, monitoring, and operational expertise are less abundant than for relational databases.
- **Scalability patterns:** Horizontal scaling of graph databases can be more complex than scaling document or key-value stores, because graph partitioning inevitably cuts some edges across shards.

## Popular graph databases

| Database | Model | License | Query language | Notable features |
|---|---|---|---|---|
| Neo4j | Property graph | Community (GPLv3) / Enterprise (commercial) | Cypher, GQL | Market leader, native graph storage, ACID transactions |
| Amazon Neptune | Property graph and RDF | Managed service (AWS) | Gremlin, SPARQL, openCypher | Fully managed, serverless option, high availability |
| JanusGraph | Property graph | Apache 2.0 | Gremlin | Distributed, pluggable storage backends (Cassandra, HBase) |
| ArangoDB | Multi-model (graph, document, key-value) | Apache 2.0 / Enterprise | AQL | Multi-model flexibility, single query language |
| Dgraph | Property graph | Apache 2.0 / Enterprise | DQL (GraphQL variant) | Distributed, native GraphQL support |
| TigerGraph | Property graph | Commercial / Community | GSQL | Massively parallel processing, deep-link analytics |

## When to choose a graph database

Selecting a graph database is appropriate when several conditions align:

- The data is naturally connected, with many-to-many relationships.
- Queries involve traversals of variable or unknown depth (e.g., shortest path, reachability, pattern detection).
- Relationship-based insights are a primary driver of business value.
- The schema is expected to evolve frequently as new entity types or relationship types emerge.
- Real-time, low-latency responses to relationship queries are required.

If the workload is dominated by simple lookups, aggregations, or transactional updates on flat tabular data, a relational or document database will typically be a better fit.

## Related

Related topics to explore next include NoSQL databases broadly, document databases and key-value stores for comparison, distributed databases and database sharding for scaling strategies, relational databases and SQL for contrast, knowledge graphs and the semantic web for RDF-oriented applications, CAP theorem and eventual consistency for understanding distributed trade-offs, and query languages such as SPARQL and Cypher for hands-on graph querying.

## Summary

A graph database stores data as nodes and edges, treating relationships as a core structural element rather than an afterthought. This design enables constant-time traversal of connections, intuitive data modeling that mirrors real-world domains, and powerful queries that would be prohibitively expensive in join-based systems. Graph databases excel in use cases where the connections between entities carry critical meaning, including social networks, fraud detection, recommendation engines, and knowledge graphs. While they are not optimal for every workload, particularly simple tabular data or heavy aggregation, they are an indispensable tool in the modern data architecture toolkit for any application where understanding relationships is the primary objective.

## References

- Robinson, I., Webber, J., & Eifrem, E. (2015). *Graph Databases: New Opportunities for Connected Data* (2nd ed.). O'Reilly Media.
- Neo4j Documentation. "What is a Graph Database?" https://neo4j.com/docs/getting-started/
- Amazon Web Services. "Amazon Neptune Documentation." https://docs.aws.amazon.com/neptune/
- Apache TinkerPop. "Gremlin Query Language." https://tinkerpop.apache.org/gremlin.html
- W3C. "SPARQL 1.1 Query Language." https://www.w3.org/TR/sparql11-query/
- ISO/IEC 39075:2024. "Information technology — Database languages — GQL."
- Angles, R., & Gutierrez, C. (2008). "Survey of Graph Database Models." *ACM Computing Surveys*, 40(1), 1–39.
