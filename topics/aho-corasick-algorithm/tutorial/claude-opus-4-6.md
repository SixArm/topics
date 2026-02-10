# Aho-Corasick algorithm

The Aho-Corasick algorithm is a string searching algorithm that efficiently locates multiple patterns within a larger text in a single pass. Invented by Alfred Aho and Margaret Corasick in 1975 at Bell Laboratories, it was originally developed for use in the Unix utility `fgrep`. The algorithm combines a trie (prefix tree) data structure with a finite-state automaton to achieve linear-time matching regardless of how many patterns are being searched. This makes it one of the most important algorithms in the domain of multi-pattern string matching, with widespread use in network intrusion detection, antivirus scanning, text mining, and bioinformatics.

## How It Works

The Aho-Corasick algorithm operates in two main phases: a preprocessing phase and a searching phase. During preprocessing, the algorithm constructs a finite-state automaton from the set of patterns. During searching, the algorithm feeds the input text through the automaton character by character, reporting matches as they are found. The key insight is that the automaton needs to be built only once for a given set of patterns, and then any number of texts can be searched efficiently against that same pattern set.

## Core Data Structures

The algorithm relies on three interconnected components built on top of a trie:

- **Trie (Prefix Tree)**: The algorithm first constructs a trie from all the patterns in the dictionary. Each edge is labeled with a character, and each path from the root to a node represents a prefix of one or more patterns. Terminal nodes are marked to indicate that a complete pattern ends at that point.

- **Failure Function (Failure Links)**: The failure function is the defining innovation of Aho-Corasick. For each node in the trie, a failure link points to the node representing the longest proper suffix of the current string that is also a prefix of some pattern in the dictionary. When a character mismatch occurs during the search, the algorithm follows the failure link instead of restarting from the root, thereby avoiding redundant comparisons.

- **Output Function (Dictionary Links)**: The output function associates each node with the set of patterns that end at that node or at any node reachable by following a chain of failure links. This ensures that overlapping or nested pattern matches are all correctly reported.

## Construction Process

Building the Aho-Corasick automaton proceeds in well-defined steps:

1. **Build the trie** by inserting all patterns from the dictionary one by one. Each pattern creates a path from the root, sharing prefixes with previously inserted patterns.

2. **Compute failure links** using a breadth-first traversal of the trie. Children of the root have their failure links set to the root. For deeper nodes, the failure link is computed by following the parent's failure link and checking for a matching transition.

3. **Compute output links** by augmenting each node's output set with the output set of the node pointed to by its failure link. This propagation ensures that all patterns ending at any reachable suffix position are captured.

4. **Search the text** by processing characters one at a time, following goto transitions when available and failure links when not. At each node visited, the output function is checked for pattern matches.

## Complexity Analysis

The Aho-Corasick algorithm achieves strong time and space guarantees that make it practical for large-scale applications.

| Metric | Complexity | Description |
|---|---|---|
| Preprocessing time | O(m * k) | Where m is the total length of all patterns and k is the alphabet size |
| Search time | O(n + z) | Where n is the length of the text and z is the number of matches found |
| Space | O(m * k) | For storing the trie and associated links |

The search phase is particularly notable: its time complexity is independent of the number of patterns. Whether you are searching for 10 patterns or 10,000 patterns, the time to scan the text remains proportional only to the text length plus the number of reported matches.

## Comparison With Other String Matching Algorithms

| Algorithm | Patterns | Time Complexity | Best Use Case |
|---|---|---|---|
| Naive search | Single | O(n * m) | Simple, short texts |
| Knuth-Morris-Pratt | Single | O(n + m) | Single pattern with known structure |
| Boyer-Moore | Single | O(n / m) best case | Single pattern in large texts |
| Rabin-Karp | Single or multiple | O(n * m) worst case | Probabilistic matching, plagiarism detection |
| Aho-Corasick | Multiple | O(n + m + z) | Multiple simultaneous patterns |

The primary advantage of Aho-Corasick over running a single-pattern algorithm repeatedly is that it processes the text only once, regardless of how many patterns exist in the dictionary. Running Knuth-Morris-Pratt separately for each of p patterns would require O(p * n) time, whereas Aho-Corasick achieves O(n + z) in the search phase.

## Practical Applications

The algorithm is widely deployed across domains where multi-pattern matching is critical:

- **Network intrusion detection**: Systems such as Snort use Aho-Corasick to scan network packets against thousands of known attack signatures simultaneously and in real time.

- **Antivirus and malware scanning**: Virus scanners match file contents against databases of malware signatures, where the pattern dictionary can contain millions of entries.

- **Bioinformatics**: Searching for multiple DNA or protein subsequences within genomic data is a natural fit for multi-pattern matching.

- **Text mining and content filtering**: Identifying banned words, sensitive terms, or specific keywords across large document corpora benefits from single-pass scanning.

- **Compiler design**: Lexical analyzers use similar automaton-based approaches to tokenize source code against a set of reserved words and patterns.

- **Search engines**: Highlighting and indexing multiple query terms within documents can leverage multi-pattern matching for efficiency.

## Strengths and Limitations

**Strengths:**

- Guarantees linear-time searching independent of the number of patterns
- Finds all occurrences of all patterns, including overlapping matches
- Processes the text in a single pass with no backtracking in the input
- Well-suited for streaming or real-time data processing
- The automaton can be precomputed and reused across multiple texts

**Limitations:**

- The preprocessing step requires O(m * k) time and space, which can be significant for very large pattern sets over large alphabets
- Not ideal when the pattern set changes frequently, since the automaton must be rebuilt
- For a single pattern, simpler algorithms like Knuth-Morris-Pratt or Boyer-Moore are more appropriate
- Memory consumption for the trie can be high compared to hash-based approaches when the alphabet is large

## Related

Related topics to explore include the **trie data structure** as the foundational building block of the algorithm, the **Knuth-Morris-Pratt algorithm** whose failure function concept directly inspired the Aho-Corasick failure links, the **Rabin-Karp algorithm** as an alternative multi-pattern approach using hashing, **finite-state automata** for understanding the theoretical underpinnings, **suffix trees** and **suffix arrays** for related string indexing problems, and **regular expression engines** which solve a superset of the pattern matching problem that Aho-Corasick addresses.

## Summary

The Aho-Corasick algorithm is a foundational multi-pattern string matching algorithm that constructs a finite-state automaton from a dictionary of patterns and then scans the input text in a single linear pass, reporting all matches including overlapping ones. Its combination of a trie, failure links, and output links enables it to achieve O(n + z) search time independent of the number of patterns, making it the algorithm of choice for applications requiring simultaneous matching of large pattern sets against streaming or bulk text data. Originally developed for Unix text processing, it remains a cornerstone of modern intrusion detection systems, antivirus engines, bioinformatics tools, and any system that must efficiently answer the question: which of these many patterns appear in this text, and where?

## References

- Aho, A. V., & Corasick, M. J. (1975). "Efficient String Matching: An Aid to Bibliographic Search." *Communications of the ACM*, 18(6), 333-340. https://doi.org/10.1145/360825.360855
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press.
- Gusfield, D. (1997). *Algorithms on Strings, Trees, and Sequences: Computer Science and Computational Biology*. Cambridge University Press.
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. Chapter on substring search.
- Wikipedia contributors. "Aho-Corasick algorithm." *Wikipedia, The Free Encyclopedia*. https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm
