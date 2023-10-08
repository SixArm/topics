# Boyer-Moore algorithm

The Boyer-Moore algorithm is a highly efficient string searching algorithm used to find occurrences of a pattern string within a longer text string. It is known for its speed and is particularly useful for searching when the pattern is significantly shorter than the text. Boyer-Moore is considered one of the most practical and widely used string searching algorithms.

The Boyer-Moore algorithm employs two key strategies to speed up the search process:

* Bad Character Rule: This rule focuses on the last character of the pattern and determines how much to shift the pattern to align the mismatched character in the text with the last occurrence of that character in the pattern. If the mismatched character in the text does not appear in the pattern, the pattern can be shifted by the length of the pattern itself.

* Good Suffix Rule: This rule handles situations where a suffix of the pattern matches part of the text, but a mismatch occurs afterward. It looks for the longest suffix of the pattern that matches a substring to the left of the mismatched part. The pattern is then shifted so that the last occurrence of this matching suffix aligns with the mismatched portion of the text.

The Boyer-Moore algorithm preprocesses the pattern to create two tables:

* Bad character table: Stores the shift values for each character in the pattern.
    
* Good suffix table: Stores the shift values for the good suffixes of the pattern.

Steps…

1. Initialize two pointers, `i` and `j`, to the end of the pattern and the end of the text, respectively.

2. Compare the characters at `i` (pattern) and `j` (text). If they match, decrement both `i` and `j`. If they don't match, use the bad character and good suffix rules to calculate the maximum shift amount and move j accordingly.

3. Repeat step 2 until a match is found or `j` goes beyond the end of the text.

4. If a match is found, record the position of the match and continue searching for the next occurrence by shifting the pattern to the right.

5. Continue this process until the end of the text is reached.

The Boyer-Moore algorithm has an average-case time complexity of O(n + m), where n is the length of the text and m is the length of the pattern. It is known for its speed and is often the preferred choice for string searching tasks, especially when searching for multiple occurrences of a pattern within a large text.