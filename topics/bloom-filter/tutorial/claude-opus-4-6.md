# Bloom filter

A Bloom filter is a space-efficient probabilistic data structure, conceived by Burton Howard Bloom in 1970, that is used to test whether a given element is a member of a set. Unlike conventional data structures such as hash tables or balanced trees, a Bloom filter can definitively confirm that an element is **not** in a set, but can only state with a tunable probability that an element **might** be in a set. This trade-off between certainty and space efficiency makes Bloom filters an indispensable tool in scenarios where memory is constrained and occasional false positives are acceptable. They are widely deployed across networking, databases, caching, security, and distributed systems.

## How a Bloom filter works

A Bloom filter is backed by a bit array of *m* bits, all initially set to zero, and a collection of *k* independent hash functions. Each hash function maps an input element uniformly to one of the *m* bit positions.

When an element is **inserted**, it is passed through all *k* hash functions, producing *k* bit positions. Each of those positions in the bit array is set to 1.

When a **membership query** is performed, the element is again hashed by the same *k* functions. If any of the resulting bit positions contains a 0, the element is guaranteed not to be in the set. If all positions contain a 1, the element is reported as "probably present." The possibility of a false positive arises because different elements may hash to overlapping bit positions, causing bits to be set by unrelated insertions.

A Bloom filter never produces false negatives: if it says an element is absent, that answer is always correct. However, it can produce false positives, reporting an element as present when it was never inserted.

## False positive probability

The false positive rate of a Bloom filter is a function of three parameters: the size of the bit array (*m*), the number of hash functions (*k*), and the number of elements inserted (*n*). The approximate false positive probability after inserting *n* elements is:

**p ≈ (1 - e^(-kn/m))^k**

This formula reveals several practical insights:

- Increasing *m* (more bits) decreases the false positive rate, at the cost of more memory.
- Increasing *k* (more hash functions) decreases the false positive rate up to an optimal point, beyond which the benefit diminishes because more bits become set.
- The optimal number of hash functions is approximately *k = (m/n) ln 2*.
- For a desired false positive rate *p* and expected element count *n*, the optimal bit array size is approximately *m = -n ln p / (ln 2)^2*.

Designers typically choose a target false positive rate (e.g., 1%) and expected element count, then derive the appropriate *m* and *k* values from these formulas.

## Key properties

| Property | Description |
|---|---|
| Space efficiency | Uses far less memory than storing the actual elements, often by orders of magnitude |
| No false negatives | A negative query result is always correct |
| False positives possible | A positive result may be incorrect; probability is tunable |
| No deletion support | Standard Bloom filters do not support element removal without risking false negatives |
| Constant-time operations | Both insertion and lookup run in O(k) time, independent of the number of elements |
| No element retrieval | The filter cannot enumerate or return the elements it contains |
| Union-friendly | Two Bloom filters with the same parameters can be merged via bitwise OR |

## Comparison with related data structures

| Data structure | Space | False positives | False negatives | Deletion | Element retrieval |
|---|---|---|---|---|---|
| Bloom filter | Very low | Yes (tunable) | No | No | No |
| Counting Bloom filter | Low | Yes (tunable) | No | Yes | No |
| Cuckoo filter | Low | Yes (tunable) | No | Yes | No |
| Hash set | High | No | No | Yes | Yes |
| Balanced binary tree | High | No | No | Yes | Yes |
| Bitmap index | Varies | No | No | Yes | No |

A **counting Bloom filter** replaces each bit with a small counter, enabling deletions at the cost of additional memory. A **cuckoo filter** offers similar functionality with better space efficiency for low false positive rates and supports deletion natively.

## Common applications

Bloom filters appear in a wide range of systems and domains:

- **Web caching and CDNs**: Determining whether a URL has been cached before fetching from the origin server, reducing unnecessary lookups.
- **Database query optimization**: Systems such as Apache Cassandra, Google Bigtable, and PostgreSQL use Bloom filters to avoid expensive disk reads for rows that do not exist in a given data file or SSTable.
- **Network routing and packet filtering**: Routers and firewalls use Bloom filters to quickly test packet membership against deny lists or flow tables without storing full addresses.
- **Spell checking**: Early spell checkers used Bloom filters to test whether a word appeared in a dictionary, trading occasional false positives for dramatically reduced memory usage.
- **Distributed systems and synchronization**: Bloom filters help nodes determine which data elements a peer already possesses, reducing redundant data transfers during synchronization.
- **Genomics and bioinformatics**: Testing whether a short DNA subsequence (k-mer) appears in a reference genome, enabling rapid screening before expensive alignment.
- **Malware and safe browsing**: Google Chrome historically used Bloom filters to check URLs against a list of known malicious sites before navigating to them.
- **Blockchain and cryptocurrencies**: Bitcoin's SPV (Simplified Payment Verification) clients use Bloom filters to request only relevant transactions from full nodes.

## Design considerations and trade-offs

When integrating a Bloom filter into a system, several practical considerations arise:

- **Sizing**: Undersizing the bit array leads to unacceptably high false positive rates as elements are inserted. Oversizing wastes memory. Accurate estimation of the expected element count is essential.
- **Hash function selection**: The hash functions should be fast, independent, and produce uniformly distributed outputs. In practice, techniques such as double hashing (deriving *k* hash values from two base hash functions) are used to reduce computational cost.
- **Saturation**: As the ratio of set bits to total bits increases, the false positive rate climbs. A Bloom filter that is more than roughly 50% saturated begins to lose practical utility.
- **Immutability**: Standard Bloom filters do not support deletion. Removing an element by clearing its bit positions would risk introducing false negatives for other elements sharing those positions. If deletion is required, a counting Bloom filter or cuckoo filter is more appropriate.
- **Scalability**: A standard Bloom filter requires the maximum element count to be known in advance. Scalable Bloom filters address this by chaining multiple filters with progressively tighter false positive rates, at the cost of additional complexity.

## Variants

Several variants have been developed to address limitations of the standard Bloom filter:

- **Counting Bloom filter**: Replaces single bits with multi-bit counters to support deletion.
- **Scalable Bloom filter**: Dynamically grows by adding new sub-filters as elements are inserted, accommodating unbounded data sets.
- **Partitioned Bloom filter**: Divides the bit array into *k* disjoint partitions, one per hash function, which can improve cache performance and simplify analysis.
- **Compressed Bloom filter**: Optimized for transmission between systems, minimizing the size of the filter when sent over a network.
- **Cuckoo filter**: Uses cuckoo hashing to achieve lower false positive rates with less space than a Bloom filter, and natively supports deletion.
- **Quotient filter**: A compact, cache-friendly alternative that supports deletion, merging, and resizing.
- **XOR filter**: A recently proposed structure that achieves lower space usage and faster lookups than Bloom filters for static sets.

## Related

Topics to explore next include hash functions and their role in distributing elements uniformly, hash tables as a complementary exact-membership data structure, cuckoo filters and counting Bloom filters as enhanced alternatives, probabilistic data structures more broadly (such as HyperLogLog for cardinality estimation and Count-Min Sketch for frequency estimation), and the application of Bloom filters within specific systems like Apache Cassandra, Google Bigtable, and Bitcoin SPV clients.

## Summary

A Bloom filter is a compact, probabilistic data structure that tests set membership in constant time using a bit array and multiple hash functions. It guarantees no false negatives, meaning a negative result is always trustworthy, while accepting a tunable rate of false positives. This trade-off yields dramatic space savings compared to exact data structures, making Bloom filters a foundational tool in databases, networking, distributed systems, and beyond. Careful selection of the bit array size and number of hash functions allows engineers to precisely balance memory consumption against accuracy for their specific workload. When deletion is needed, variants such as counting Bloom filters and cuckoo filters extend the concept while preserving its core efficiency.

## References

- Bloom, B. H. (1970). "Space/Time Trade-offs in Hash Coding with Allowable Errors." *Communications of the ACM*, 13(7), 422-426. https://doi.org/10.1145/362686.362692
- Broder, A., & Mitzenmacher, M. (2004). "Network Applications of Bloom Filters: A Survey." *Internet Mathematics*, 1(4), 485-509.
- Fan, B., Andersen, D. G., Kaminsky, M., & Mitzenmacher, M. (2014). "Cuckoo Filter: Practically Better Than Bloom." *Proceedings of the 10th ACM International Conference on emerging Networking Experiments and Technologies (CoNEXT)*.
- Tarkoma, S., Rothenberg, C. E., & Lagerspetz, E. (2012). "Theory and Practice of Bloom Filters for Distributed Systems." *IEEE Communications Surveys & Tutorials*, 14(1), 131-155.
- Wikipedia contributors. "Bloom filter." *Wikipedia, The Free Encyclopedia*. https://en.wikipedia.org/wiki/Bloom_filter
