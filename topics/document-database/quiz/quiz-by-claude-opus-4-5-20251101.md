# Document database

Question: What is a primary advantage of document databases over traditional relational databases when handling evolving application requirements?

- [ ] They require all documents in a collection to share an identical schema
- [ ] They only support structured data with fixed column definitions
- [ ] Each document can have its own unique structure, allowing schema changes without altering the entire database
- [ ] They are optimized exclusively for vertical scaling by upgrading hardware

<details>
  <summary>Answer</summary>
  <p>Each document can have its own unique structure, allowing schema changes without altering the entire database</p>
  <p>Document databases store data as documents (typically JSON) where each document within a collection can have its own unique structure. This schema flexibility is a key benefit because changes to the data model do not require modifications to the entire database, enabling greater ease of development and adaptability to evolving requirements—unlike relational databases where schema changes often require altering table structures across the system.</p>
</details>
