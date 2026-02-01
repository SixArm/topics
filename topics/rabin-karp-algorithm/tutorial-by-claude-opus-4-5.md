## Rabin-Karp Algorithm

The Rabin-Karp algorithm is a string searching algorithm that efficiently finds all occurrences of a pattern string within a longer text string. Developed by Michael Rabin and Richard Karp in 1987, it uses hashing to achieve fast average-case performance while maintaining simplicity in implementation.

## Core Concept: Rolling Hash

The algorithm's efficiency stems from its use of a rolling hash function. Rather than comparing characters directly at each position, Rabin-Karp computes a hash value for both the pattern and a sliding window of characters in the text. The rolling hash is designed to update incrementally—when the window slides one position, the hash is recalculated in constant time by removing the contribution of the outgoing character and adding the contribution of the incoming character.

This approach transforms what would be an O(m) comparison at each position into an O(1) hash comparison, dramatically reducing the overall work required.

## Algorithm Steps

1. **Compute pattern hash**: Calculate the hash value of the pattern string you are searching for.

2. **Initialize window**: Create a sliding window of the same length as the pattern at the beginning of the text and compute its hash value.

3. **Slide and compare**: Iterate through the text from left to right, moving the window one character at a time.

4. **Hash matching**: At each position, compare the hash value of the current window with the pattern's hash value.

5. **Verify matches**: If hash values match, perform a full character-by-character comparison to confirm a true match (to handle hash collisions).

6. **Record results**: Track positions where matches are found and continue until reaching the end of the text.

## Time and Space Complexity

| Metric | Best/Average Case | Worst Case |
|--------|-------------------|------------|
| Time Complexity | O(n + m) | O(n × m) |
| Space Complexity | O(1) | O(1) |

Where n is the length of the text and m is the length of the pattern.

The worst-case scenario occurs when hash collisions happen frequently, forcing full string comparisons at many positions. A well-designed hash function minimizes this risk.

## Comparison with Other String Search Algorithms

| Algorithm | Average Time | Worst Time | Preprocessing | Multiple Patterns |
|-----------|--------------|------------|---------------|-------------------|
| Rabin-Karp | O(n + m) | O(n × m) | O(m) | Efficient |
| Naive Search | O(n × m) | O(n × m) | None | Inefficient |
| KMP | O(n + m) | O(n + m) | O(m) | Inefficient |
| Boyer-Moore | O(n/m) | O(n × m) | O(m + σ) | Inefficient |
| Aho-Corasick | O(n + m + z) | O(n + m + z) | O(m) | Designed for it |

Where σ is the alphabet size and z is the number of matches.

## Key Advantages

- **Multiple pattern search**: Rabin-Karp excels when searching for multiple patterns simultaneously. The same text window hash can be compared against many pattern hashes in parallel.

- **Simple implementation**: The algorithm is conceptually straightforward compared to alternatives like KMP or Boyer-Moore.

- **Flexible hash functions**: Different hash functions can be chosen based on the specific use case, allowing optimization for particular character sets or pattern lengths.

- **Streaming capability**: The rolling hash naturally supports streaming scenarios where text arrives incrementally.

## Limitations and Considerations

- **Hash collisions**: Poor hash function choices lead to frequent collisions, degrading performance to worst-case behavior.

- **Not optimal for single patterns**: For searching a single pattern in a single text, KMP or Boyer-Moore often perform better in practice.

- **Numeric overflow**: Hash calculations may require handling large numbers, necessitating modular arithmetic to prevent overflow.

## Common Applications

- **Plagiarism detection**: Comparing documents by hashing text segments and finding matches across multiple sources.

- **DNA sequence matching**: Searching for genetic patterns within long genome sequences.

- **File synchronization**: Tools like rsync use rolling hashes to identify changed portions of files.

- **Intrusion detection**: Network security systems use pattern matching to detect malicious payloads.

- **Search engines**: Indexing and matching text patterns across large document collections.

## Hash Function Design

The effectiveness of Rabin-Karp depends heavily on the hash function. A polynomial rolling hash is commonly used, treating the string as a number in some base and computing it modulo a prime. Key properties of a good hash function include:

- **Fast update**: Must support O(1) updates when the window slides
- **Low collision rate**: Should distribute hash values uniformly
- **Numeric stability**: Should avoid overflow through modular arithmetic
- **Deterministic**: Same input must always produce same output

## When to Choose Rabin-Karp

| Use Case | Recommendation |
|----------|----------------|
| Single pattern, single text | Consider KMP or Boyer-Moore |
| Multiple patterns, single text | Rabin-Karp or Aho-Corasick |
| Pattern matching in streams | Rabin-Karp |
| Very long patterns | Boyer-Moore |
| Simple implementation needed | Rabin-Karp |
| Guaranteed worst-case performance | KMP |

## Summary

The Rabin-Karp algorithm provides an elegant solution to string searching through the use of rolling hashes. Its O(n + m) average-case performance, combined with natural support for multiple pattern matching and streaming data, makes it a versatile choice for many text processing applications. While it does not guarantee worst-case linear performance like KMP, its simplicity and flexibility often make it the practical choice for real-world string searching problems.
