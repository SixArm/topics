# Aho-Corasick algorithm

Question: What is the primary advantage of the Aho-Corasick algorithm over simpler string matching algorithms?

- [ ] It uses less memory than other algorithms by compressing the pattern dictionary
- [ ] It can search for multiple patterns simultaneously in a single pass through the text
- [ ] It works only with fixed-length patterns for faster processing
- [ ] It automatically corrects spelling errors while searching

<details>
  <summary>Answer</summary>
  <p>It can search for multiple patterns simultaneously in a single pass through the text</p>
  <p>The Aho-Corasick algorithm was specifically designed to efficiently find multiple patterns within a longer text string in a single pass. It accomplishes this by constructing a trie (prefix tree) from all patterns and using a failure function to navigate efficiently during mismatches. This makes it ideal for applications like keyword searching and intrusion detection systems where identifying multiple patterns simultaneously is essential.</p>
</details>
