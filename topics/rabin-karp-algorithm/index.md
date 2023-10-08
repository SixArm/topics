# Rabin-Karp algorithm

The Rabin-Karp algorithm is a string searching algorithm that efficiently finds all occurrences of a pattern string within a longer text string. It uses a hashing technique to quickly compare the pattern with substrings of the text.

The algorithm works by creating a rolling hash function that hashes a window of characters in the text and compares the hash value of that window with the hash value of the pattern. If the hash values match, a full string comparison is performed to ensure it's not a spurious hash collision. If they match, the algorithm reports a match at that position in the text.

Steps…

1. Calculate the hash value of the pattern string.

2. Initialize a sliding window of the same length as the pattern at the beginning of the text and calculate its hash value.

3. Iterate through the text from left to right, moving the sliding window one character at a time.

4. At each step, compare the hash value of the current window with the hash value of the pattern.
   
5. If the hash values match, perform a full string comparison to verify if it's a true match.
  
6. If they don't match, continue moving the window and recalculating the hash value.

7. Keep track of the positions where a match is found, and continue the process until the end of the text.

The rolling hash function is crucial to the efficiency of the Rabin-Karp algorithm. It should be designed to quickly update the hash value when a new character enters the window and remove the hash value of the character that leaves the window.

The Rabin-Karp algorithm has an average-case time complexity of O(n + m), where n is the length of the text and m is the length of the pattern. This makes it efficient for string searching, especially when the pattern is much shorter than the text. However, in some cases, it can exhibit worst-case behavior if hash collisions occur frequently, leading to a time complexity of O(n * m).
