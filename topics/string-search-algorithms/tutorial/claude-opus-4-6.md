# String search algorithms

String search algorithms, also known as string matching algorithms, are a foundational category of algorithms in computer science. Their purpose is to locate one or more occurrences of a substring (called the pattern) within a larger body of text (called the text or haystack). These algorithms underpin essential capabilities across the technology stack, from text editors and search engines to bioinformatics pipelines and network intrusion detection systems. Understanding their design trade-offs is critical for choosing the right tool for a given problem.

In complexity analysis for string search, `m` denotes the length of the pattern and `n` denotes the length of the text being searched.


## Brute force (naive) string search

The brute force approach is the simplest string search strategy. It works by aligning the pattern at every possible position in the text, then comparing character by character. If a mismatch occurs, the algorithm shifts the pattern forward by one position and starts the comparison again from the first character of the pattern.

- **Best case**: The first character of the pattern mismatches at most positions, yielding near-linear performance.
- **Worst case**: Every alignment requires comparing all `m` characters before failing, resulting in `O(n * m)` time.
- **Space complexity**: `O(1)` — no auxiliary data structures are needed.

The brute force method is adequate for short patterns or small texts, and it serves as the conceptual baseline against which all other string search algorithms are measured. Its simplicity makes it useful when implementation time matters more than runtime performance.


## Knuth-Morris-Pratt (KMP) algorithm

The Knuth-Morris-Pratt algorithm eliminates redundant comparisons by preprocessing the pattern into a failure function (also called the partial match table or prefix function). This table records, for each position in the pattern, the length of the longest proper prefix of the pattern that is also a suffix. When a mismatch occurs during search, the algorithm uses this table to determine how far ahead it can safely shift the pattern, rather than restarting from the next position.

- **Preprocessing time**: `O(m)` to build the failure function.
- **Search time**: `O(n)` — each character of the text is examined at most twice.
- **Total time**: `O(n + m)`.
- **Space complexity**: `O(m)` for the failure function table.

KMP guarantees linear-time matching regardless of the input, making it a reliable choice when worst-case performance must be bounded. It is particularly effective when the pattern contains repeated substructures that the failure function can exploit.


## Boyer-Moore algorithm

The Boyer-Moore algorithm is one of the most efficient string search algorithms in practice. It scans the pattern from right to left against the text, and uses two heuristic rules to skip large portions of the text when mismatches occur:

- **Bad character rule**: When a mismatch is found, the algorithm looks at the mismatched character in the text and shifts the pattern so that the rightmost occurrence of that character in the pattern aligns with the mismatched position. If the character does not appear in the pattern at all, the entire pattern can be shifted past the mismatch point.
- **Good suffix rule**: When a mismatch occurs after some characters have matched, the algorithm shifts the pattern to align the next occurrence of the matched suffix within the pattern, or to align a prefix of the pattern that matches a suffix of the matched portion.

Boyer-Moore achieves sublinear average-case performance because it can skip characters without examining them. On natural-language text with large alphabets, it often outperforms all other single-pattern algorithms.

- **Preprocessing time**: `O(m + k)` where `k` is the alphabet size.
- **Best case**: `O(n / m)` — the algorithm skips `m` characters at a time.
- **Worst case**: `O(n * m)` for the basic version, though the Galil rule improvement brings it to `O(n + m)`.


## Rabin-Karp algorithm

The Rabin-Karp algorithm uses hashing to accelerate string matching. It computes a hash of the pattern and then uses a rolling hash to compute the hash of each `m`-length window of the text in constant time. When the hash of a text window matches the hash of the pattern, the algorithm performs a character-by-character comparison to confirm the match and rule out hash collisions.

- **Average case**: `O(n + m)` when hash collisions are rare.
- **Worst case**: `O(n * m)` if many spurious hash matches occur.
- **Space complexity**: `O(1)` beyond the hash values.

Rabin-Karp is especially well-suited for multi-pattern search: by computing hashes for multiple patterns simultaneously, it can search for many patterns in a single pass through the text. This makes it a practical choice for plagiarism detection, content filtering, and similar applications where the number of patterns is large.


## Aho-Corasick algorithm

The Aho-Corasick algorithm is designed for searching multiple patterns simultaneously. It constructs a finite automaton from the set of patterns, combining a trie (prefix tree) with failure links and output links. Once the automaton is built, the algorithm processes the text character by character in a single pass, reporting all pattern matches as they occur.

- **Preprocessing time**: `O(M)` where `M` is the total length of all patterns combined.
- **Search time**: `O(n + z)` where `z` is the number of matches found.
- **Space complexity**: `O(M * k)` where `k` is the alphabet size, though this can be reduced with optimization.

Aho-Corasick is the standard algorithm for multi-pattern matching at scale. It is used in network intrusion detection systems (such as Snort), antivirus scanners, and large-scale text analytics where hundreds or thousands of patterns must be matched against streaming data.


## Z-algorithm

The Z-algorithm computes the Z-array for a string, where each entry `Z[i]` represents the length of the longest substring starting at position `i` that matches a prefix of the string. For pattern matching, the pattern and text are concatenated with a separator character, and the Z-array of the combined string reveals all match positions.

- **Time complexity**: `O(n + m)` for both the Z-array computation and pattern matching.
- **Space complexity**: `O(n + m)` for the Z-array.

The Z-algorithm is conceptually elegant and straightforward to implement. It provides an alternative to KMP with comparable performance characteristics, and some practitioners find its logic easier to reason about. It is also useful in problems beyond exact matching, such as computing the longest common substring or period of a string.


## Trie data structure

A trie (prefix tree) is a tree-shaped data structure where each node represents a character, and paths from the root to leaf nodes represent complete strings. Tries store a dynamic set of strings and enable prefix-based lookups in time proportional to the length of the query, independent of the number of stored strings.

- **Insertion time**: `O(m)` per string.
- **Lookup time**: `O(m)` per query.
- **Space complexity**: Can be high due to pointer overhead, though compressed variants (radix tries, Patricia tries) mitigate this.

Tries are foundational in autocomplete systems, spell checkers, IP routing tables, and dictionary-based search. They also serve as the underlying structure for more advanced algorithms like Aho-Corasick.


## Regular expressions (regex)

Regular expressions provide a declarative pattern language for specifying complex search criteria. A regex engine compiles the pattern into an internal representation — typically a nondeterministic finite automaton (NFA) or deterministic finite automaton (DFA) — and then executes it against the text.

- **DFA-based engines**: Guarantee linear-time matching `O(n)` but may require exponential space to compile certain patterns.
- **NFA-based engines**: Use backtracking, which is flexible and supports advanced features (backreferences, lookahead) but can degrade to exponential time on pathological patterns.

Regular expressions are the most versatile string search mechanism available in practice, supported by virtually every programming language and text processing tool. However, their power comes with the responsibility of understanding performance implications, particularly with complex patterns on large inputs.


## Algorithm comparison

| Algorithm | Time (Average) | Time (Worst) | Space | Multi-pattern | Key strength |
|---|---|---|---|---|---|
| Brute Force | `O(n * m)` | `O(n * m)` | `O(1)` | No | Simplicity, no preprocessing |
| KMP | `O(n + m)` | `O(n + m)` | `O(m)` | No | Guaranteed linear time |
| Boyer-Moore | `O(n / m)` | `O(n * m)` | `O(m + k)` | No | Sublinear average, fast in practice |
| Rabin-Karp | `O(n + m)` | `O(n * m)` | `O(1)` | Yes | Rolling hash, multi-pattern capable |
| Aho-Corasick | `O(n + z)` | `O(n + z)` | `O(M * k)` | Yes | Optimal multi-pattern matching |
| Z-Algorithm | `O(n + m)` | `O(n + m)` | `O(n + m)` | No | Elegant, easy to implement |
| Trie | `O(m)` lookup | `O(m)` lookup | High | Yes | Prefix search, autocomplete |
| Regex | `O(n)` (DFA) | Exponential (NFA) | Varies | Yes | Expressive pattern language |


## Choosing the right algorithm

Selecting a string search algorithm depends on several factors:

- **Single pattern vs. multiple patterns**: For a single pattern, KMP or Boyer-Moore is typically best. For multiple patterns, Aho-Corasick or Rabin-Karp is the standard choice.
- **Alphabet size**: Boyer-Moore excels with large alphabets (natural language text, DNA with extended codes). For small alphabets (binary data), its advantage diminishes.
- **Guaranteed performance**: When worst-case bounds matter — for example, in security-sensitive applications or real-time systems — KMP or Aho-Corasick provides predictable linear-time behavior.
- **Implementation simplicity**: When development time is constrained, brute force or the Z-algorithm may be the pragmatic choice.
- **Pattern complexity**: When the search criteria involve wildcards, character classes, repetition, or alternation, regular expressions are the appropriate tool.


## Related

Related topics to explore next include the Boyer-Moore algorithm and its variants (Boyer-Moore-Horspool, Turbo Boyer-Moore) for deeper practical optimization; suffix arrays and suffix trees for advanced substring operations on static texts; the Burrows-Wheeler transform and FM-index for compressed full-text indexing; finite automata theory as the mathematical foundation for pattern matching; dynamic programming approaches to approximate string matching and edit distance (Levenshtein distance); and text compression algorithms that leverage repeated pattern structures.


## Summary

String search algorithms span a wide spectrum from the brute force approach through highly optimized techniques like Boyer-Moore and Aho-Corasick. The choice among them is driven by the specific requirements of the problem: the number of patterns, the size of the alphabet, the need for worst-case guarantees, and the complexity of the search criteria. Mastery of these algorithms equips technology professionals to build efficient text processing systems, from simple search features to large-scale data analysis pipelines, while understanding the performance trade-offs that govern each approach.


## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapters on string matching.
- Knuth, D. E., Morris, J. H., & Pratt, V. R. (1977). "Fast Pattern Matching in Strings." *SIAM Journal on Computing*, 6(2), 323–350.
- Boyer, R. S., & Moore, J. S. (1977). "A Fast String Searching Algorithm." *Communications of the ACM*, 20(10), 762–772.
- Aho, A. V., & Corasick, M. J. (1975). "Efficient String Matching: An Aid to Bibliographic Search." *Communications of the ACM*, 18(6), 333–340.
- Karp, R. M., & Rabin, M. O. (1987). "Efficient Randomized Pattern-Matching Algorithms." *IBM Journal of Research and Development*, 31(2), 249–260.
- Gusfield, D. (1997). *Algorithms on Strings, Trees, and Sequences: Computer Science and Computational Biology*. Cambridge University Press.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Chapter on substring search.
