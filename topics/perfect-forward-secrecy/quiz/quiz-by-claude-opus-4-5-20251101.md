# Perfect Forward Secrecy (PFS)

Question: What is the primary security benefit of Perfect Forward Secrecy (PFS)?

- [ ] It uses the same encryption key across multiple sessions for efficiency
- [ ] It ensures that compromising a long-term secret key cannot decrypt past or future session communications
- [ ] It permanently stores session keys for future authentication purposes
- [ ] It eliminates the need for cryptographic key exchange protocols

<details>
  <summary>Answer</summary>
  <p>It ensures that compromising a long-term secret key cannot decrypt past or future session communications</p>
  <p>PFS generates a unique session key for each communication session, which is discarded after the session ends. This means that even if an attacker compromises the long-term private key of a server or client, they cannot use it to decrypt previously recorded encrypted communications or future sessions. This is in contrast to traditional key exchange methods where compromising a single key could expose all communications encrypted with that key.</p>
</details>
