# Blockchain

Question: What cryptographic mechanism ensures the integrity and immutability of a blockchain by linking each block to its predecessor?

- [ ] Digital signature verification
- [ ] Symmetric key encryption
- [ ] Cryptographic hash linking
- [ ] Public key infrastructure

<details>
  <summary>Answer</summary>
  <p>Cryptographic hash linking</p>
  <p>Each block in a blockchain contains a cryptographic hash of the previous block, creating an unbroken chain. This hash-based linking ensures that any attempt to modify a block would change its hash, which would break the connection to the subsequent block and be immediately detected. This is the fundamental mechanism that makes blockchain tamper-evident and immutable.</p>
</details>
