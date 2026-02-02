# Hash table (a.k.a. hash map)

Question: What is the primary purpose of a hash function in a hash table data structure?

- [ ] To sort the keys alphabetically before storage
- [ ] To compress the data to reduce memory usage
- [ ] To convert a key into an index for efficient data retrieval
- [ ] To encrypt the values for security purposes

<details>
  <summary>Answer</summary>
  <p>To convert a key into an index for efficient data retrieval</p>
  <p>A hash function takes a key as input and generates an index within the hash table. This allows for quick lookups and insertions by directly computing where data should be stored or retrieved, rather than searching through all elements. A good hash function distributes keys uniformly across the available slots to minimize collisions and maintain efficient O(1) average-case performance.</p>
</details>
