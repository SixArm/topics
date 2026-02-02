# Contrastive Language-Image Pretraining (CLIP)

Question: What is the primary learning objective that enables CLIP to align images and text in a shared embedding space?

- [ ] Supervised classification using explicit image-label pairs
- [ ] Generative adversarial learning to create synthetic image-text pairs
- [ ] Contrastive learning that maximizes similarity between relevant image-text pairs and minimizes it for unrelated pairs
- [ ] Reinforcement learning with human feedback on image descriptions

<details>
  <summary>Answer</summary>
  <p>Contrastive learning that maximizes similarity between relevant image-text pairs and minimizes it for unrelated pairs</p>
  <p>CLIP's core training objective is contrastive learning, where the model learns to pull together embeddings of matching image-text pairs while pushing apart embeddings of non-matching pairs. This approach allows CLIP to learn meaningful joint representations without requiring explicit supervised labels, enabling its powerful zero-shot capabilities across diverse vision-language tasks.</p>
</details>
