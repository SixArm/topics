# Boyer-Moore algorithm

The Boyer-Moore algorithm is an efficient string searching algorithm developed by Robert S. Boyer and J Strother Moore in 1977. It finds occurrences of a pattern string within a longer text string by scanning characters from right to left within the pattern window. Unlike naive approaches that compare every character sequentially, Boyer-Moore leverages information gained from mismatches to skip large sections of the text, making it one of the fastest known algorithms for single-pattern string searching. Its average-case time complexity is O(n/m), where n is the text length and m is the pattern length, and it achieves sublinear performance in practice because it does not need to examine every character in the text.

## How It Works

The algorithm aligns the pattern at the beginning of the text and compares characters starting from the rightmost character of the pattern, moving leftward. When a mismatch occurs, the algorithm consults two precomputed heuristic tables to determine how far to shift the pattern forward. The shift amount is the maximum of the values suggested by the bad character rule and the good suffix rule, ensuring the algorithm skips as many positions as possible without missing potential matches. This right-to-left comparison strategy is central to the algorithm's efficiency because mismatches at the end of the pattern often allow large jumps.

## Preprocessing Phase

Before searching begins, Boyer-Moore preprocesses the pattern to build two lookup tables. This preprocessing step takes O(m + |A|) time, where m is the pattern length and |A| is the size of the alphabet.

- **Bad character table**: For each character in the alphabet, this table records the position of its rightmost occurrence in the pattern. Characters not present in the pattern receive a default value indicating the full pattern length can be skipped. This table enables the algorithm to align the pattern with the mismatched character in the text.

- **Good suffix table**: For each possible suffix of the pattern, this table records how far the pattern can be shifted so that a matching copy of that suffix (or a matching prefix of the pattern) aligns with the text. Computing this table requires analyzing the internal structure of the pattern, including border positions and suffix lengths.

## Bad Character Rule

The bad character rule focuses on the character in the text that caused a mismatch. When a comparison fails, the algorithm looks up the mismatched text character in the bad character table. If that character exists elsewhere in the pattern, the pattern is shifted so that the rightmost occurrence of that character in the pattern aligns with the mismatched position in the text. If the character does not appear in the pattern at all, the entire pattern is shifted past the mismatch point. This rule is particularly effective when the pattern contains characters that are rare in the text, as it enables large shifts.

## Good Suffix Rule

The good suffix rule handles situations where some suffix of the pattern has already matched the text before a mismatch occurs. It determines the smallest shift such that the matched suffix aligns with another occurrence of that same substring within the pattern, or, failing that, aligns with a prefix of the pattern that matches a suffix of the matched portion. This rule ensures correctness by guaranteeing that no potential match is skipped. It is especially powerful when the pattern contains repeated substrings, providing large shifts even when the bad character rule suggests only a small one.

## Complexity Analysis

| Scenario | Time Complexity | Notes |
|---|---|---|
| Preprocessing | O(m + \|A\|) | One-time cost to build both tables |
| Best case | O(n/m) | Sublinear; skips large portions of text |
| Average case | O(n) | Typically faster than O(n) in practice |
| Worst case | O(n * m) | Occurs with pathological inputs such as repeated characters |

The worst case can be improved to O(n) by incorporating the Galil rule, which tracks previously matched sections to avoid redundant comparisons. In practice, Boyer-Moore frequently outperforms its theoretical average-case bound because natural language text and typical patterns allow substantial skipping.

## Comparison with Other String Search Algorithms

| Algorithm | Approach | Average Time | Worst Time | Strengths |
|---|---|---|---|---|
| Naive | Left-to-right, brute force | O(n * m) | O(n * m) | Simple to implement |
| Knuth-Morris-Pratt | Left-to-right with failure function | O(n + m) | O(n + m) | Guaranteed linear time |
| Boyer-Moore | Right-to-left with two heuristics | O(n/m) | O(n * m) | Fastest in practice for long patterns |
| Rabin-Karp | Hash-based comparison | O(n + m) | O(n * m) | Efficient for multiple pattern search |
| Horspool | Simplified Boyer-Moore (bad character only) | O(n/m) | O(n * m) | Simpler implementation, similar speed |

Boyer-Moore tends to dominate when the pattern is long relative to the alphabet size, because longer patterns increase the potential skip distance. For very short patterns or small alphabets, simpler algorithms like Knuth-Morris-Pratt may be competitive.

## Practical Applications

- **Text editors and search tools**: Programs such as grep and many IDE search features use Boyer-Moore or its variants as the core search engine for find-and-replace operations.
- **Intrusion detection systems**: Network security tools scan packet payloads for known attack signatures using Boyer-Moore for high-throughput pattern matching.
- **Bioinformatics**: Searching for nucleotide or amino acid subsequences within genomic data benefits from the algorithm's ability to skip non-matching regions quickly.
- **Data filtering and log analysis**: Large-scale log processing systems use Boyer-Moore to locate specific entries or error patterns across massive datasets.
- **Plagiarism detection**: Document comparison tools employ string matching algorithms including Boyer-Moore to identify copied passages.

## Variants and Extensions

Several variants build on the original Boyer-Moore algorithm to address specific limitations or use cases.

- **Boyer-Moore-Horspool**: Uses only the bad character rule, simplifying the implementation while retaining much of the performance benefit. It is often the preferred choice when implementation simplicity matters.
- **Boyer-Moore-Galil**: Adds the Galil rule to achieve O(n) worst-case time by remembering previously matched portions of the text and avoiding re-examination.
- **Turbo Boyer-Moore**: Combines aspects of the Galil optimization with additional shift information to improve worst-case behavior without significant overhead.
- **Apostolico-Giancarlo**: Extends Boyer-Moore by recording match lengths at each position, allowing it to skip characters already known to match and achieving O(n) worst-case comparisons.

## Related

Related topics to explore include the Knuth-Morris-Pratt algorithm for guaranteed linear-time string searching, the Rabin-Karp algorithm for hash-based multi-pattern matching, the Aho-Corasick algorithm for searching multiple patterns simultaneously, finite automata-based string matching for understanding the theoretical foundations, suffix trees and suffix arrays for advanced text indexing, and regular expression engines that incorporate string search algorithms as optimization strategies.

## Summary

The Boyer-Moore algorithm remains one of the most practically efficient string searching algorithms available. By comparing characters from right to left and using the bad character and good suffix heuristics to skip over impossible match positions, it achieves sublinear average-case performance that makes it faster than most alternatives for typical workloads. Its preprocessing phase builds two tables that encode shift information, enabling the algorithm to move the pattern forward by multiple positions after each mismatch. While its worst-case performance is quadratic without additional optimizations, variants like Boyer-Moore-Galil resolve this limitation. For any application involving repeated or high-volume text searching with reasonably long patterns, Boyer-Moore is a strong default choice.

## References

- Boyer, R.S. and Moore, J.S. (1977). "A Fast String Searching Algorithm." Communications of the ACM, 20(10), 762-772. https://doi.org/10.1145/359842.359859
- Horspool, R.N. (1980). "Practical Fast Searching in Strings." Software: Practice and Experience, 10(6), 501-506.
- Galil, Z. (1979). "On Improving the Worst Case Running Time of the Boyer-Moore String Matching Algorithm." Communications of the ACM, 22(9), 505-508.
- Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. (2009). Introduction to Algorithms (3rd ed.), Chapter 32: String Matching. MIT Press.
- Sedgewick, R. and Wayne, K. (2011). Algorithms (4th ed.), Section 5.3: Substring Search. Addison-Wesley.
