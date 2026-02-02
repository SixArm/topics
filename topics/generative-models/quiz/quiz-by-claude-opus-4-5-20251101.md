# Generative models

Question: What is the key architectural feature that distinguishes Generative Adversarial Networks (GANs) from other generative models?

- [ ] They use invertible transformations to map simple distributions to complex ones
- [ ] They encode data into a latent space constrained to follow a Gaussian distribution
- [ ] They employ two competing neural networks: a generator and a discriminator
- [ ] They model conditional probabilities of each data point given its predecessors

<details>
  <summary>Answer</summary>
  <p>They employ two competing neural networks: a generator and a discriminator</p>
  <p>GANs are unique among generative models because they use an adversarial training approach with two networks. The generator creates synthetic data samples attempting to fool the discriminator, while the discriminator learns to distinguish between real and generated data. This competitive dynamic drives both networks to improve iteratively, resulting in increasingly realistic generated outputs. This adversarial architecture has made GANs particularly effective for generating high-quality images, videos, and other complex data types.</p>
</details>
