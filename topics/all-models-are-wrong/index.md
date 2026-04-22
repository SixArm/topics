# All Models Are Wrong (George Box's Law)

Statistician George Box wrote, "All models are wrong, but some are useful." This principle applies directly to software engineering. Every abstraction you build, whether a class hierarchy, an API contract, a data pipeline, or a database schema, is a deliberate simplification of reality that omits inconvenient details. The question is never whether your model is wrong. It is whether it is wrong in ways that matter.

Your database schema assumes users have one email address, until they don't. Your payment model treats refunds as reversed payments, until chargebacks arrive. Your microservice boundaries assume teams own clean domains, until a feature cuts across three services. These are not failures of design. They are the inevitable consequence of compressing messy reality into structured representations.

The practical takeaway is to design for the leak, not against it. Accept that every abstraction will eventually encounter cases it cannot represent cleanly. Build monitoring that detects when your models diverge from reality. Use feature flags to handle edge cases without rewriting core logic. Keep your data contracts versioned so they can evolve without breaking consumers.

Box's insight also cautions against over-modeling. Engineers sometimes pursue a "correct" model that captures every edge case, producing systems so complex they become impossible to reason about or maintain. A simpler model that is wrong in known, manageable ways is almost always preferable to a comprehensive model that is wrong in ways nobody understands.

Treat your models as working hypotheses. Validate them against production data. Refactor when their assumptions no longer hold. The goal is not correctness but usefulness under real conditions.
