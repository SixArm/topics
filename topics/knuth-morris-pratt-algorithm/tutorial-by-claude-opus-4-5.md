## Knuth-Morris-Pratt Algorithm

The Knuth-Morris-Pratt (KMP) algorithm is a string searching algorithm that efficiently finds occurrences of a pattern string within a longer text string. Developed by Donald Knuth, Vaughan Pratt, and James H. Morris in 1977, it represents a fundamental improvement over naive string matching approaches.

## Why KMP Matters

The naive approach to string matching compares the pattern against the text character by character, and when a mismatch occurs, it shifts the pattern by just one position and starts over. This leads to redundant comparisons and poor performance on certain inputs.

KMP eliminates this inefficiency by leveraging information about the pattern itself. When a mismatch occurs, the algorithm already knows which characters in the pattern have matched, and it uses this knowledge to skip ahead intelligently rather than restarting from scratch.

## Time Complexity

| Algorithm | Preprocessing | Searching | Total |
|-----------|---------------|-----------|-------|
| Naive | None | O(n × m) | O(n × m) |
| KMP | O(m) | O(n) | O(n + m) |

Where **n** is the length of the text and **m** is the length of the pattern. The linear time complexity makes KMP particularly valuable when searching through large texts or when the pattern contains repetitive structures that would cause the naive algorithm to perform poorly.

## Core Concept: The Failure Function

The key innovation of KMP is the **failure function**, also called the **partial match table** or **prefix table**. This preprocessed table stores information about the pattern's internal structure—specifically, it captures where the pattern has repeating prefixes that match suffixes.

The failure function answers this question: "If a mismatch occurs at position i in the pattern, what is the longest proper prefix of the pattern that is also a suffix of the portion we've already matched?"

This information allows the algorithm to:

- Avoid re-examining characters in the text that have already been matched
- Jump the pattern forward by the maximum safe amount
- Guarantee that each character in the text is examined at most twice

## How KMP Works

**Step 1: Preprocessing**

Construct the failure function by analyzing the pattern before searching begins. This table has the same length as the pattern and stores, for each position, the length of the longest proper prefix that matches a suffix ending at that position.

**Step 2: Searching**

Iterate through the text while maintaining two pointers: one for the current position in the text and one for the current position in the pattern being matched.

- When characters match, advance both pointers
- When a mismatch occurs, consult the failure function to determine how far to shift the pattern pointer back (the text pointer never moves backward)

**Step 3: Recording Matches**

When the pattern pointer reaches the end of the pattern, a complete match has been found. Record the starting position in the text, then use the failure function to continue searching for additional occurrences.

**Step 4: Continuation**

Continue the search until the text pointer reaches the end of the text, finding all occurrences of the pattern.

## Advantages of KMP

- **Linear time guarantee**: Performance does not degrade on pathological inputs
- **No backtracking in text**: The text pointer only moves forward, making it suitable for streaming data
- **Predictable performance**: Worst-case and average-case complexity are the same
- **Memory efficient**: Only requires O(m) additional space for the failure function

## Limitations

- **Preprocessing overhead**: For very short patterns or one-time searches, the preprocessing step adds overhead
- **Single pattern only**: KMP searches for one pattern at a time; for multiple patterns, algorithms like Aho-Corasick are more efficient
- **Implementation complexity**: More complex to implement correctly than the naive approach

## When to Use KMP

| Use Case | Recommendation |
|----------|----------------|
| Large text, single pattern | Excellent choice |
| Pattern has repetitive structure | Ideal—this is where KMP shines |
| Streaming/real-time data | Good choice due to no backtracking |
| Very short pattern (< 5 chars) | Naive may be simpler and sufficient |
| Multiple patterns simultaneously | Consider Aho-Corasick instead |
| Pattern matching with wildcards | Consider other algorithms |

## Comparison with Other String Matching Algorithms

| Algorithm | Preprocessing | Search Time | Space | Best For |
|-----------|---------------|-------------|-------|----------|
| Naive | None | O(n × m) | O(1) | Simple cases, short patterns |
| KMP | O(m) | O(n) | O(m) | General purpose, streaming |
| Boyer-Moore | O(m + σ) | O(n/m) best | O(m + σ) | Long patterns, large alphabets |
| Rabin-Karp | O(m) | O(n) avg | O(1) | Multiple pattern search |

Where **σ** represents the alphabet size.

## Practical Applications

- **Text editors**: Find and replace functionality
- **Plagiarism detection**: Locating copied passages in documents
- **DNA sequence analysis**: Finding genetic patterns in biological data
- **Network intrusion detection**: Identifying malicious signatures in network traffic
- **Log analysis**: Searching for specific patterns in system logs
- **Compilers**: Lexical analysis and token recognition

## Key Takeaways

- KMP provides guaranteed O(n + m) time complexity for string matching
- The failure function captures the pattern's internal structure to enable intelligent skipping
- The text pointer never backtracks, making KMP suitable for streaming applications
- Preprocessing time is linear in the pattern length
- KMP is most beneficial when the pattern contains repetitive elements or when searching through large texts
