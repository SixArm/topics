# Time-series database

A time-series database (TSDB) is a specialized database system engineered to ingest, store, and query data points that are indexed and ordered by timestamps. Time-series data arises whenever measurements, events, or observations are recorded over time, producing sequences that capture change, trends, and anomalies. Sources include IoT sensors, application performance monitors, financial trading platforms, industrial control systems, and infrastructure telemetry pipelines. Unlike general-purpose relational databases, a TSDB is architected around the assumption that data arrives continuously, is rarely updated in place, and is most valuable when analyzed across temporal dimensions. The result is a class of database that delivers orders-of-magnitude improvements in write throughput, query latency, and storage efficiency for workloads that are fundamentally time-oriented.

## Core characteristics of time-series data

Time-series data has structural properties that distinguish it from other data models. Each data point typically consists of a timestamp, one or more metric values, and optional metadata tags or labels that identify the source. Data arrives in append-only fashion: new points are continuously written at the leading edge of time while historical points are seldom modified or deleted. Write volumes can be extreme, with large deployments ingesting millions of data points per second. Queries overwhelmingly target recent data and operate over time windows, requesting aggregations, downsampling, or pattern detection rather than random-access lookups. These characteristics create optimization opportunities that TSDBs exploit through purpose-built storage engines, indexing schemes, and query planners.

## Key features

- **High-throughput ingestion.** TSDBs are designed to sustain continuous, high-velocity writes. Buffering, batch insertion, and write-ahead logs ensure that bursts of incoming data do not cause back-pressure or data loss.

- **Efficient storage and compression.** Because time-series data is highly regular, TSDBs apply domain-specific compression algorithms such as delta-of-delta encoding for timestamps and XOR-based encoding for floating-point values. Compression ratios of 10:1 or higher are common, dramatically reducing disk and memory footprint.

- **Time-based queries and windowing.** Native query languages and APIs provide first-class support for time ranges, sliding windows, and calendar-aligned intervals. Users can request data for the last five minutes, compare this week to last week, or align aggregations to hourly boundaries without manual date arithmetic.

- **Aggregation and downsampling.** TSDBs compute summary statistics such as mean, median, min, max, percentile, and count across configurable time buckets. Continuous aggregation materializes these summaries automatically, enabling fast dashboards over months or years of data.

- **Stream processing and real-time analytics.** Many TSDBs support continuous queries or integrate with stream processing frameworks, enabling alerts, anomaly detection, and derived metrics to be computed as data arrives rather than after the fact.

- **Tagging and multi-dimensional filtering.** Data points are annotated with key-value tags (such as host, region, or sensor ID) that allow filtering and grouping without requiring joins. Tag-based indexing makes it efficient to slice data across thousands of distinct sources.

- **Retention policies and tiered storage.** TSDBs allow administrators to define retention windows that automatically expire or downsample old data. Hot-warm-cold tiering moves aging data from fast SSD storage to cheaper object storage while keeping it queryable.

## How TSDBs differ from general-purpose databases

| Dimension | Relational / general-purpose DB | Time-series database |
|---|---|---|
| Write pattern | Mixed inserts, updates, deletes | Append-only, high-throughput inserts |
| Read pattern | Random-access lookups, joins | Time-range scans, aggregations |
| Schema | Normalized tables with foreign keys | Flat metrics with tags/labels |
| Indexing | B-tree on arbitrary columns | Time-partitioned with tag indexes |
| Compression | General-purpose page compression | Domain-specific columnar compression |
| Data lifecycle | Manual archival or partitioning | Automated retention and downsampling |
| Query language | SQL | SQL extensions, Flux, PromQL, or custom DSLs |
| Typical latency | Optimized for transactional consistency | Optimized for write throughput and scan speed |

General-purpose databases can store timestamped rows, but they pay a performance penalty because their storage engines, query optimizers, and indexing structures are not tuned for the access patterns that time-series workloads demand.

## Common use cases

- **Infrastructure and application monitoring.** Metrics from servers, containers, and microservices are collected at high frequency and visualized in dashboards. Alerts fire when values breach thresholds or exhibit anomalous patterns.

- **Internet of Things (IoT).** Sensors in manufacturing plants, smart buildings, connected vehicles, and wearable devices generate continuous telemetry streams that must be ingested, stored, and analyzed at scale.

- **Financial analytics.** Tick-by-tick market data, portfolio valuations, and risk metrics are inherently time-series problems. Low-latency queries support algorithmic trading, compliance reporting, and back-testing.

- **Log and event analysis.** Structured logs, audit trails, and security events are timestamped records that benefit from time-range queries, pattern matching, and aggregation.

- **Energy and utilities.** Smart grid data, power consumption readings, and environmental monitoring produce dense time-series streams used for demand forecasting and regulatory reporting.

- **DevOps and observability.** The three pillars of observability — metrics, logs, and traces — all have a temporal axis. TSDBs serve as the storage backbone for platforms like Prometheus, Grafana, and Datadog.

## Notable time-series databases

| Database | Architecture | License | Notable traits |
|---|---|---|---|
| InfluxDB | Purpose-built TSDB with custom storage engine | Open-source (MIT) and commercial | Flux query language, built-in dashboarding, strong community |
| TimescaleDB | PostgreSQL extension | Open-source (Apache 2.0) and commercial | Full SQL compatibility, hypertables for automatic partitioning |
| Prometheus | Pull-based monitoring TSDB | Open-source (Apache 2.0) | PromQL, native Kubernetes integration, alerting |
| QuestDB | Column-oriented TSDB written in Java and C++ | Open-source (Apache 2.0) | SQL support, high ingestion speed, zero-GC engine |
| OpenTSDB | Built on Apache HBase | Open-source (LGPL) | Scales on Hadoop ecosystem, tag-based schema |
| Amazon Timestream | Fully managed serverless TSDB | Commercial (AWS) | Automatic tiering, SQL-like query language |
| TDengine | Cluster-capable TSDB for IoT | Open-source (AGPL) and commercial | Super-table abstraction, built-in caching and streaming |
| ClickHouse | Column-oriented analytical database | Open-source (Apache 2.0) | Not TSDB-specific but widely used for time-series at scale |

## Architecture and storage internals

TSDBs achieve their performance characteristics through a combination of architectural decisions. Data is partitioned by time into chunks or shards, so that writes always target the most recent partition while older partitions can be compacted, compressed, or moved to cold storage independently. Within each partition, a columnar layout stores each metric series contiguously, enabling vectorized scans and efficient compression. An inverted index maps tag combinations to series identifiers, allowing the query engine to quickly resolve which series match a filter before scanning only relevant data. Write-ahead logs protect against data loss during crashes, while in-memory buffers batch incoming points before flushing to disk in sorted order. The result is a storage engine that can sustain millions of writes per second on modest hardware while answering analytical queries in milliseconds.

## Query patterns and languages

Time-series queries differ from traditional SQL in their emphasis on temporal operations. Common patterns include range selection (retrieve all points between two timestamps), downsampling (compute five-minute averages over a week), rate calculation (derive per-second rates from monotonically increasing counters), moving aggregates (compute a rolling 24-hour mean), and top-N ranking (find the ten busiest hosts in the last hour). Query languages vary by system. InfluxDB introduced Flux, a functional data scripting language. Prometheus uses PromQL, a concise expression language optimized for alerting rules. TimescaleDB and QuestDB offer standard SQL extended with time-bucket functions and last-observation-carried-forward semantics. The choice of query language often influences database selection, because teams that already use SQL may prefer an extension-based approach over learning a new DSL.

## Retention, downsampling, and data lifecycle

Production time-series deployments must balance storage cost against query fidelity. A common strategy is to retain high-resolution data for a short window (hours or days), continuously downsample it into coarser aggregates (minute, hourly, daily), and store those summaries for months or years. Many TSDBs automate this through retention policies and continuous aggregation jobs. Expired data is dropped or archived to object storage. This tiered approach ensures that recent operational queries run against high-resolution data while long-term capacity planning and trend analysis operate against compact summaries, keeping storage costs linear rather than exponential as the system ages.

## Scaling and high availability

Horizontal scaling for TSDBs follows two main strategies. Some systems, such as InfluxDB Enterprise and TDengine, use built-in clustering with hash- or time-based sharding across nodes. Others, such as Prometheus, rely on federation or remote-write fan-out to external long-term stores like Thanos, Cortex, or Mimir. Replication provides high availability: each shard is stored on multiple nodes so that a single failure does not cause data loss or query downtime. When selecting a TSDB for production use, teams should evaluate write fan-out overhead, query scatter-gather latency, rebalancing behavior when nodes join or leave, and the operational complexity of running the cluster.

## Selection criteria

When choosing a time-series database, consider the following factors:

- **Ingestion rate.** Estimate peak writes per second and verify that the candidate database can sustain that load with acceptable latency.
- **Query complexity.** Determine whether your workload requires simple range scans or complex analytical joins, and match the query language accordingly.
- **Ecosystem integration.** Check compatibility with collection agents (Telegraf, OpenTelemetry, Prometheus exporters), visualization tools (Grafana, Kibana), and alerting frameworks.
- **Operational overhead.** Managed services reduce operational burden but introduce vendor lock-in. Self-hosted systems offer control but require expertise in deployment, upgrades, and scaling.
- **Data retention requirements.** Evaluate built-in retention policies, downsampling automation, and tiered storage support against your compliance and analytical needs.
- **Licensing and cost.** Open-source cores may lack enterprise features such as clustering, RBAC, or commercial support. Factor in total cost of ownership across infrastructure, licensing, and engineering time.

## Related

To deepen understanding of time-series databases, explore related topics including event-driven architecture for understanding how data flows into TSDBs, stream processing frameworks such as Apache Kafka and Apache Flink that often sit upstream of a TSDB, observability and monitoring practices that depend on time-series storage, IoT platform architecture where TSDBs serve as the data tier, data warehouse and data lake concepts for long-term analytical storage, columnar databases and their compression techniques, distributed database design including consensus algorithms and replication strategies, and query language design for temporal data.

## Summary

A time-series database is a purpose-built storage system optimized for the append-heavy, time-ordered, high-volume data that modern infrastructure, IoT, finance, and observability workloads produce. By combining time-partitioned storage, columnar compression, tag-based indexing, and temporal query primitives, TSDBs deliver write throughput and query performance that general-purpose databases cannot match for these workloads. Selecting the right TSDB requires evaluating ingestion rate, query complexity, ecosystem fit, operational burden, and total cost of ownership against the specific demands of the use case.

## References

- Bader, A., Kopp, O., & Falkenthal, M. (2017). "Survey and comparison of open source time series databases." BTW 2017 Workshopband. Gesellschaft fur Informatik.
- InfluxData. "InfluxDB Documentation." https://docs.influxdata.com/
- Timescale. "TimescaleDB Documentation." https://docs.timescale.com/
- Prometheus Authors. "Prometheus Documentation." https://prometheus.io/docs/
- QuestDB. "QuestDB Documentation." https://questdb.io/docs/
- Amazon Web Services. "Amazon Timestream Documentation." https://docs.aws.amazon.com/timestream/
- Pelkonen, T., Franklin, S., Teller, J., et al. (2015). "Gorilla: A fast, scalable, in-memory time series database." Proceedings of the VLDB Endowment, 8(12), 1816–1827.
- Jensen, S. K., Pedersen, T. B., & Thomsen, C. (2017). "Time series management systems: A survey." IEEE Transactions on Knowledge and Data Engineering, 29(11), 2581–2600.
