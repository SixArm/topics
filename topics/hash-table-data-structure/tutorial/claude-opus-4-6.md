# Hash table (a.k.a. hash map)

A hash table, also known as a hash map, is a data structure that provides efficient data retrieval by mapping keys to values through a process called hashing. A hash function converts each key into an index within an underlying array, enabling near-constant-time lookups, insertions, and deletions. Hash tables are among the most widely used data structures in computer science and form the foundation of associative arrays, dictionaries, sets, and caches in virtually every modern programming language and system.

## How hash tables work

A hash table operates by combining two components: a hash function and an array of storage locations called buckets or slots. When a key-value pair is stored, the hash function computes an integer from the key, and that integer is mapped (typically via modulo arithmetic) to an index in the array. The value is then placed at that index. When a lookup is performed, the same hash function is applied to the key, producing the same index, and the value stored there is returned.

The elegance of this approach is that the cost of finding a value does not depend on the number of items in the table, provided the hash function distributes keys evenly and collisions are handled efficiently. In the average case, all three core operations — insert, lookup, and delete — run in O(1) time.

## Hash functions

The hash function is the most critical component of a hash table. It takes a key of arbitrary type (string, integer, object) and produces a fixed-size integer that serves as an index into the array. A well-designed hash function has several properties:

- **Deterministic**: The same key always produces the same hash value.
- **Uniform distribution**: Keys are spread evenly across all available slots, minimizing clustering and collisions.
- **Efficient to compute**: The function should run in constant or near-constant time relative to the key size.
- **Avalanche effect**: Small changes in the key should produce large changes in the hash value, reducing patterns that cause collisions.

Common hash function families used in practice include MurmurHash, CityHash, SipHash, and xxHash. Cryptographic hash functions such as SHA-256 are generally too slow for hash table use but are employed when security properties are required.

## Collision resolution

Because the set of possible keys is typically much larger than the number of slots in the array, two different keys will sometimes hash to the same index. This event is called a collision, and every hash table implementation must handle it. The two primary strategies are chaining and open addressing.

### Chaining

In chaining (also called separate chaining), each slot in the array holds a pointer to a secondary data structure — most commonly a linked list, but sometimes a balanced tree or dynamic array. When a collision occurs, the new key-value pair is appended to the structure at that slot. Lookups traverse the chain at the computed index until the matching key is found.

### Open addressing

In open addressing, all key-value pairs are stored directly in the array itself. When a collision occurs, the algorithm probes alternative slots according to a probing sequence until an empty slot is found. Common probing strategies include linear probing (check the next slot sequentially), quadratic probing (check slots at quadratic intervals), and double hashing (use a second hash function to determine the step size).

| Strategy | Storage | Cache performance | Deletion complexity | Load factor tolerance |
|---|---|---|---|---|
| Chaining | External lists or trees per bucket | Lower (pointer chasing) | Simple (remove node from chain) | Tolerates load factors above 1.0 |
| Linear probing | Inline in array | High (sequential memory access) | Requires tombstone markers | Degrades above ~0.7 |
| Quadratic probing | Inline in array | Moderate | Requires tombstone markers | Degrades above ~0.7 |
| Double hashing | Inline in array | Moderate | Requires tombstone markers | Degrades above ~0.7 |

## Load factor and resizing

The load factor is the ratio of the number of stored entries to the number of available slots. As the load factor increases, collisions become more frequent and performance degrades. Most hash table implementations define a threshold load factor (commonly 0.7 to 0.75) at which the table is resized — the array is expanded (typically doubled) and all existing entries are rehashed into the new, larger array.

Resizing is an O(n) operation because every key must be rehashed, but it occurs infrequently enough that the amortized cost of insertion remains O(1). Some implementations use incremental rehashing, spreading the cost of resizing across multiple subsequent operations rather than performing it all at once.

## Time and space complexity

| Operation | Average case | Worst case |
|---|---|---|
| Lookup | O(1) | O(n) |
| Insert | O(1) amortized | O(n) |
| Delete | O(1) amortized | O(n) |
| Space | O(n) | O(n) |

The worst case of O(n) occurs when all keys hash to the same slot, reducing the hash table to a linked list. In practice, a good hash function and an appropriate load factor make this scenario exceedingly rare.

## Strengths and weaknesses

**Strengths:**

- Average-case O(1) time for insert, lookup, and delete operations makes hash tables one of the fastest general-purpose data structures.
- Flexible key types — any hashable object can serve as a key.
- Simple conceptual model that is straightforward to implement and reason about.
- Well-supported in standard libraries across all major programming languages.

**Weaknesses:**

- No ordering guarantee — keys are not stored in sorted or insertion order (unlike balanced trees or ordered maps).
- Worst-case O(n) performance if the hash function produces many collisions or if an adversary crafts pathological inputs.
- Resizing is expensive when it occurs, and memory usage may be higher than more compact data structures due to maintaining a partially empty array.
- Hash function quality is critical — a poor hash function can severely degrade performance.

## Common use cases

- **Symbol tables in compilers and interpreters**: Variable names and their metadata are stored and retrieved by name.
- **Database indexing**: Hash indexes provide constant-time lookups for equality queries.
- **Caching and memoization**: Previously computed results are stored by their input parameters for instant retrieval.
- **Counting and frequency analysis**: Counting occurrences of elements in a dataset by using each element as a key and its count as the value.
- **Deduplication**: Sets built on hash tables enable fast membership testing to eliminate duplicate records.
- **Routing tables and DNS resolution**: Network systems map hostnames or addresses to destinations using hash-based lookups.

## Hash tables in programming languages

Most languages provide hash table implementations in their standard libraries:

| Language | Hash table type | Notes |
|---|---|---|
| Python | `dict`, `set` | Open addressing with compact layout since Python 3.6; insertion-ordered |
| Java | `HashMap`, `HashSet` | Chaining with linked lists that convert to trees at high collision counts |
| C++ | `std::unordered_map`, `std::unordered_set` | Chaining-based; part of the STL since C++11 |
| Go | `map` | Built-in type with runtime-managed hash table |
| JavaScript | `Object`, `Map`, `Set` | `Map` provides true hash map semantics with any key type |
| Rust | `HashMap`, `HashSet` | Uses SipHash by default for DoS resistance |
| C# | `Dictionary<K,V>`, `HashSet<T>` | Open addressing in .NET Core; chaining in .NET Framework |

## Related

Related topics to explore next include linked list data structures (used in chaining), balanced tree data structures such as red-black trees and B-trees (which provide ordered alternatives to hash tables), graph algorithms that use adjacency lists backed by hash maps, bloom filters for probabilistic set membership, consistent hashing for distributed systems, and cryptographic hash functions for security applications.

## Summary

Hash tables are a foundational data structure that deliver average-case constant-time performance for key-value storage and retrieval. They achieve this through hash functions that map keys to array indices, combined with collision resolution strategies such as chaining or open addressing. Understanding load factors, resizing behavior, and hash function quality is essential for using hash tables effectively. While they sacrifice ordering guarantees and carry the risk of worst-case linear performance under adversarial conditions, their speed, flexibility, and ubiquity across programming languages make them indispensable in virtually every area of software engineering.

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press. Chapters 11–12 cover hash tables and hash functions in depth.
- Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching* (2nd ed.). Addison-Wesley. Section 6.4 provides a rigorous treatment of hashing.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Chapter 3 covers symbol tables and hash table implementations.
- Wikipedia contributors. "Hash table." *Wikipedia, The Free Encyclopedia*. https://en.wikipedia.org/wiki/Hash_table
- Appleby, A. "MurmurHash." https://github.com/aappleby/smhasher — Reference implementation and analysis of the widely used MurmurHash family.
