# Knuth-Morris-Pratt algorithm

The Knuth-Morris-Pratt (KMP) algorithm is a string searching algorithm that efficiently finds occurrences of a pattern string within a longer text string. Developed by Donald Knuth, Vaughan Pratt, and James Morris in 1977, it was one of the first linear-time string matching algorithms. KMP is widely used in text editors, search engines, bioinformatics, and data processing pipelines where fast pattern matching is critical. Its key innovation is avoiding redundant character comparisons by leveraging information gathered during partial matches.

## How KMP differs from naive search

A naive string search algorithm compares the pattern against the text character by character. When a mismatch occurs, it shifts the pattern forward by one position and restarts comparisons from the beginning of the pattern. This leads to repeated work and worst-case quadratic performance. The KMP algorithm eliminates this waste by recognizing that a partial match already reveals information about the text. When a mismatch occurs, KMP uses a precomputed table to determine exactly how far the pattern can be shifted forward without missing a potential match, and it never re-examines characters in the text that have already been matched.

| Aspect | Naive search | KMP algorithm |
|---|---|---|
| Preprocessing | None | Builds a failure function table |
| Worst-case time | O(n * m) | O(n + m) |
| Best-case time | O(n) | O(n) |
| Backtracking in text | Yes, revisits characters | No, text pointer never moves backward |
| Extra space | O(1) | O(m) for the failure table |

## The failure function

The failure function, also called the partial match table or prefix function, is the core data structure that powers KMP. For each position in the pattern, the failure function stores the length of the longest proper prefix of the pattern substring that is also a suffix of that substring. A "proper" prefix excludes the entire string itself.

This table answers a critical question: when a mismatch occurs at position `i` in the pattern, how many characters at the beginning of the pattern are guaranteed to already match the text at the current position? The answer allows KMP to skip ahead intelligently rather than restarting from scratch.

Key properties of the failure function:

- The value at position 0 is always 0, since a single character has no proper prefix that is also a suffix.
- The table is computed in O(m) time, where m is the pattern length.
- Each entry depends only on the pattern itself, not on the text being searched.
- The failure function can be reused across multiple searches with the same pattern against different texts.

## The search phase

Once the failure function is built, the search phase proceeds by scanning the text from left to right with two pointers: one for the current position in the text and one for the current position in the pattern.

- **Character match**: When the current characters in the text and pattern match, both pointers advance forward by one.
- **Mismatch with partial match**: When a mismatch occurs and the pattern pointer is not at position 0, the failure function is consulted. The pattern pointer jumps back to the position indicated by the failure table, and the text pointer stays in place. This skips over characters in the pattern that are known to match.
- **Mismatch at start**: When a mismatch occurs and the pattern pointer is at position 0, only the text pointer advances. No useful prefix information exists yet.
- **Full match found**: When the pattern pointer reaches the end of the pattern, a match is recorded. The failure function is then used to shift the pattern for continued searching, enabling the algorithm to find all occurrences without restarting from scratch.

The text pointer never moves backward. This guarantees that each character in the text is examined at most a constant number of times, yielding the linear time bound.

## Time and space complexity

| Operation | Complexity |
|---|---|
| Preprocessing (failure function) | O(m) |
| Search phase | O(n) |
| Total time | O(n + m) |
| Space for failure table | O(m) |
| Space for text storage | O(1) additional |

Here, `n` is the length of the text and `m` is the length of the pattern. The linear time complexity holds in all cases, including worst-case inputs. This is a significant improvement over the naive approach, which degrades to O(n * m) when the pattern contains repeated prefixes and the text contains many near-matches.

## Practical applications

The KMP algorithm is foundational in many areas of computing:

- **Text editors and word processors**: Powering find-and-replace operations across large documents.
- **Network intrusion detection**: Scanning packet payloads for known signatures or malicious patterns.
- **Bioinformatics**: Searching DNA, RNA, or protein sequences for specific motifs or gene markers.
- **Compilers and interpreters**: Lexical analysis and tokenization tasks that require fast pattern recognition.
- **Log analysis**: Searching through large log files for specific error messages, identifiers, or event patterns.
- **Data validation**: Checking whether structured inputs (such as serial numbers or formatted strings) conform to expected patterns.

## Comparison with other string search algorithms

| Algorithm | Preprocessing | Search time | Space | Approach |
|---|---|---|---|---|
| Naive | None | O(n * m) | O(1) | Brute force comparison |
| KMP | O(m) | O(n) | O(m) | Failure function to skip ahead |
| Boyer-Moore | O(m + alphabet) | O(n/m) best, O(n * m) worst | O(m + alphabet) | Right-to-left matching with shift heuristics |
| Rabin-Karp | O(m) | O(n) average, O(n * m) worst | O(1) | Rolling hash comparison |
| Aho-Corasick | O(sum of patterns) | O(n + matches) | O(sum of patterns) | Automaton for multiple patterns simultaneously |

KMP is often preferred when guaranteed linear worst-case performance is required and the pattern is fixed or reused. Boyer-Moore tends to be faster in practice for large alphabets (such as ASCII text) because it can skip large portions of the text. Rabin-Karp is useful when multiple patterns of the same length need to be matched. Aho-Corasick generalizes KMP to handle multiple patterns concurrently.

## Strengths and limitations

**Strengths:**

- Guaranteed O(n + m) worst-case time with no degradation on adversarial inputs.
- The text is scanned strictly left to right with no backtracking, making it suitable for streaming data.
- The failure function for a given pattern can be precomputed once and reused.
- Conceptually elegant and well-studied with a mature theoretical foundation.

**Limitations:**

- Requires O(m) additional space for the failure table, though this is typically negligible.
- For average-case inputs with large alphabets, Boyer-Moore often outperforms KMP in practice due to its ability to skip characters.
- Not designed for multiple simultaneous pattern searches; Aho-Corasick is more appropriate for that use case.
- The failure function construction, while linear, can be non-intuitive to implement correctly without careful attention to edge cases.

## Related

Topics to explore next include the Boyer-Moore algorithm and its bad character and good suffix heuristics for practical fast search, the Rabin-Karp algorithm for hash-based pattern matching, the Aho-Corasick algorithm for multi-pattern search using a trie-based automaton, suffix trees and suffix arrays for advanced text indexing and substring queries, and regular expression engines that build on finite automata concepts related to KMP's theoretical foundations.

## Summary

The Knuth-Morris-Pratt algorithm is a foundational string searching technique that achieves guaranteed linear time complexity by precomputing a failure function from the pattern. This table encodes information about the pattern's internal structure, specifically the longest proper prefix that is also a suffix at each position, enabling the algorithm to skip redundant comparisons and never backtrack in the text. KMP remains an essential algorithm in the toolkit of any technology professional working with text processing, data search, or pattern recognition, and its ideas underpin more advanced algorithms used in production systems today.

## References

- Knuth, D.E., Morris, J.H., and Pratt, V.R. "Fast Pattern Matching in Strings." SIAM Journal on Computing, 6(2):323-350, 1977.
- Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. Introduction to Algorithms (4th Edition). MIT Press, 2022. Chapter 32: String Matching.
- Sedgewick, R. and Wayne, K. Algorithms (4th Edition). Addison-Wesley, 2011. Section 5.3: Substring Search.
- Gusfield, D. Algorithms on Strings, Trees, and Sequences. Cambridge University Press, 1997.
- Wikipedia: Knuth-Morris-Pratt algorithm — https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm
