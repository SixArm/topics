# Bloom filter

Question: What is a key characteristic of a Bloom filter when testing for membership of an element in a set?

- [ ] It can produce false negatives but never false positives
- [ ] It guarantees 100% accuracy for both membership and non-membership
- [ ] It can produce false positives but never false negatives
- [ ] It requires storing all elements of the set in memory

<details>
  <summary>Answer</summary>
  <p>It can produce false positives but never false negatives</p>
  <p>A Bloom filter is a probabilistic data structure that may report an element is in the set when it is not (false positive), but if it reports an element is not in the set, that result is always accurate (no false negatives). This is because if any bit checked is 0, the element was definitely never added. However, all bits being 1 could be due to other elements setting those same bits, leading to possible false positives.</p>
</details>
