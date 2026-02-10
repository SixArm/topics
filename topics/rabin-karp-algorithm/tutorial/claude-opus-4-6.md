# Rabin-Karp algorithm

The Rabin-Karp algorithm is a string searching algorithm that efficiently finds all occurrences of a pattern string within a longer text string. Developed by Michael O. Rabin and Richard M. Karp in 1987, the algorithm leverages hashing to achieve fast average-case performance. Unlike naive string matching, which compares characters one by one at every position, Rabin-Karp uses a rolling hash function to quickly filter out non-matching positions, making it particularly effective for multi-pattern searching and plagiarism detection.

## How it works

The core idea behind Rabin-Karp is to convert the string comparison problem into a numerical comparison problem. Instead of comparing characters directly, the algorithm computes a hash value for the pattern and for each substring of the text that has the same length as the pattern. If the hash values match, the algorithm performs a character-by-character comparison to confirm the match and rule out hash collisions.

The algorithm creates a rolling hash function that hashes a window of characters in the text and compares the hash value of that window with the hash value of the pattern. The rolling hash function is crucial to the efficiency, because it must be designed to quickly update the hash value when a new character enters the window and an old character exits the window, rather than recomputing the hash from scratch.

## Algorithm steps

1. Calculate the hash value of the pattern string.
2. Initialize a sliding window of the same length as the pattern at the beginning of the text and calculate its hash value.
3. Iterate through the text from left to right, moving the sliding window one character at a time.
4. At each step, compare the hash value of the current window with the hash value of the pattern.
5. If the hash values match, perform a full string comparison to verify if it is a true match (not a hash collision).
6. If they do not match, continue moving the window and recalculating the hash value using the rolling hash.
7. Keep track of the positions where a match is found, and continue the process until the end of the text.

## Rolling hash function

The rolling hash is what distinguishes Rabin-Karp from a naive hash-and-compare approach. The most common rolling hash used is a polynomial hash based on Horner's method. For a window of characters, the hash is computed as a weighted sum of character values, where each character is multiplied by a base raised to a positional power, and the result is taken modulo a large prime number.

When the window slides one position to the right, the hash is updated by removing the contribution of the leftmost character, shifting the remaining value, and adding the contribution of the new rightmost character. This update operation runs in constant time, O(1), regardless of the pattern length.

Key properties of an effective rolling hash include:

- **Constant-time updates**: the hash must be updatable in O(1) when the window shifts
- **Uniform distribution**: hash values should spread evenly across the output range to minimize collisions
- **Large prime modulus**: using a large prime reduces the probability of spurious hits
- **Deterministic**: the same input must always produce the same hash value

## Time and space complexity

The Rabin-Karp algorithm has an average-case time complexity of O(n + m), where n is the length of the text and m is the length of the pattern. This makes it efficient for string searching, especially when the pattern is much shorter than the text. The worst case occurs when hash collisions happen frequently, degrading performance to O(n * m).

| Metric | Value | Condition |
|---|---|---|
| Best-case time | O(n + m) | Few or no hash collisions |
| Average-case time | O(n + m) | Good hash function with uniform distribution |
| Worst-case time | O(n * m) | Many hash collisions, e.g., searching "aaa" in "aaaaaaa" |
| Space complexity | O(1) | Single pattern matching (excluding input storage) |
| Preprocessing time | O(m) | Initial hash computation of the pattern |

## Comparison with other string search algorithms

Rabin-Karp occupies a specific niche among string matching algorithms. Its primary advantage is multi-pattern search capability, while other algorithms may be faster for single-pattern scenarios.

| Algorithm | Average time | Worst-case time | Multi-pattern support | Key technique |
|---|---|---|---|---|
| Rabin-Karp | O(n + m) | O(n * m) | Yes (natural extension) | Rolling hash |
| Knuth-Morris-Pratt | O(n + m) | O(n + m) | No | Failure function / prefix table |
| Boyer-Moore | O(n / m) | O(n * m) | No | Bad character + good suffix rules |
| Aho-Corasick | O(n + m + z) | O(n + m + z) | Yes (designed for it) | Finite automaton / trie |
| Naive search | O(n * m) | O(n * m) | No | Brute-force character comparison |

In the table above, z represents the number of pattern matches found.

## Practical applications

Rabin-Karp is well-suited for specific categories of problems where its hashing approach provides clear advantages:

- **Plagiarism detection**: comparing document fragments against a large corpus of known texts by hashing overlapping substrings
- **Multi-pattern matching**: searching for multiple patterns simultaneously by maintaining a set of pattern hash values and checking each window against all of them
- **DNA sequence analysis**: locating short nucleotide sequences within long genomic strings, where the small alphabet size makes rolling hashes efficient
- **Intrusion detection systems**: scanning network traffic for known malicious signatures across packet payloads
- **Search engines**: indexing and matching text fragments during document crawling and retrieval
- **File deduplication**: identifying duplicate content blocks in storage systems using rolling hashes over fixed or variable-length chunks

## Strengths and limitations

**Strengths:**

- Simple to implement compared to automaton-based algorithms like Aho-Corasick
- Naturally extends to multi-pattern search without significant algorithmic changes
- Average-case performance is linear in the length of the text
- The rolling hash technique is reusable in other contexts such as data deduplication and content-defined chunking

**Limitations:**

- Worst-case time complexity is quadratic, which can occur with adversarial inputs or poor hash functions
- Relies on the quality of the hash function; a weak hash leads to excessive false positives
- Single-pattern performance does not match Boyer-Moore's sublinear best case or KMP's guaranteed linear worst case
- Requires careful selection of the hash modulus to balance collision probability against computational cost

## Related

Related topics to explore include the Knuth-Morris-Pratt algorithm for guaranteed linear-time single-pattern matching, the Boyer-Moore algorithm for sublinear average-case searching, the Aho-Corasick algorithm for efficient multi-pattern matching using finite automata, string search algorithms as a broader category, rolling hash techniques and their applications beyond string matching, hash functions and collision resistance in general, and dynamic programming approaches to approximate string matching such as the edit distance algorithm.

## Summary

The Rabin-Karp algorithm is a hash-based string searching method that achieves average-case O(n + m) performance by using a rolling hash to compare pattern and text substrings numerically rather than character by character. Its defining strength is the natural extension to multi-pattern search, making it a practical choice for plagiarism detection, DNA analysis, and security scanning. While its worst-case O(n * m) behavior and dependence on hash function quality are notable limitations, proper implementation with a large prime modulus and a well-distributed polynomial hash makes worst-case scenarios rare in practice. For single-pattern search with strict worst-case guarantees, Knuth-Morris-Pratt or Boyer-Moore may be preferable, but Rabin-Karp remains an essential algorithm in the string matching toolkit.

## References

- Karp, R. M., & Rabin, M. O. (1987). "Efficient Randomized Pattern-Matching Algorithms." IBM Journal of Research and Development, 31(2), 249-260.
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). Introduction to Algorithms (4th ed.). MIT Press. Chapter 32: String Matching.
- Sedgewick, R., & Wayne, K. (2011). Algorithms (4th ed.). Addison-Wesley. Section 5.3: Substring Search.
- Knuth, D. E., Morris, J. H., & Pratt, V. R. (1977). "Fast Pattern Matching in Strings." SIAM Journal on Computing, 6(2), 323-350.
- Wikipedia contributors. "Rabin-Karp algorithm." Wikipedia. [https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm)
