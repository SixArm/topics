# Russian-doll caching

Question: What is the primary benefit of Russian-doll caching in web development?

- [ ] It encrypts cached content at multiple security levels
- [ ] It reduces server load by caching content in nested layers at different granularities
- [ ] It compresses content progressively across network hops
- [ ] It distributes cached content geographically across data centers

<details>
  <summary>Answer</summary>
  <p>It reduces server load by caching content in nested layers at different granularities</p>
  <p>Russian-doll caching (also called hierarchical caching) works by caching content at multiple nested levels, similar to Matryoshka dolls. Each cache level stores content at different granularities, which reduces the need to dynamically generate content from the origin server. This is especially effective for nested content like web pages containing sections, images, and components that don't change frequently.</p>
</details>
