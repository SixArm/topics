# Transport Layer Security (TLS)

Question: What is perfect forward secrecy (PFS) in TLS, and why is it important?

- [ ] PFS ensures that certificates never expire, providing permanent authentication
- [ ] PFS uses the same session key across all connections to improve performance
- [ ] PFS generates a new session key for each session, so compromising a private key cannot decrypt past recorded traffic
- [ ] PFS encrypts the server's private key to prevent it from being stolen

<details>
  <summary>Answer</summary>
  <p>PFS generates a new session key for each session, so compromising a private key cannot decrypt past recorded traffic</p>
  <p>Perfect forward secrecy is a critical security property in TLS that protects past communications even if the server's long-term private key is later compromised. By generating ephemeral session keys that are not derived from any previously shared secret, PFS ensures that an attacker who obtains the private key cannot retroactively decrypt intercepted traffic from previous sessions. This is especially important for protecting sensitive data against future threats and large-scale surveillance.</p>
</details>
