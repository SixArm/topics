# General Adversarial Network (GAN)

Question: In a GAN architecture, what are the roles of the two neural networks during adversarial training?

- [ ] One network compresses data while the other decompresses it
- [ ] One network generates synthetic data while the other distinguishes real from synthetic data
- [ ] One network classifies images while the other segments them
- [ ] One network encrypts data while the other decrypts it

<details>
  <summary>Answer</summary>
  <p>One network generates synthetic data while the other distinguishes real from synthetic data</p>
  <p>A GAN consists of two neural networks engaged in an adversarial game: the generator creates synthetic data samples (such as images, music, or text) that resemble real data, while the discriminator acts as a binary classifier that attempts to distinguish between real and generated data. Through this adversarial training process, both networks improve until ideally the generator produces data realistic enough that the discriminator cannot correctly classify it.</p>
</details>
