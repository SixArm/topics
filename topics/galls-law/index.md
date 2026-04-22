# Gall's Law

Gall's Law states that a complex system that works is invariably found to have evolved from a simple system that worked. Coined by John Gall in his 1975 book *Systemantics: How Systems Work and Especially How They Fail*, it remains one of the most practical principles in systems design.

The core insight is straightforward: don't build a complex system from scratch. Start with a simple version that works, then iterate and add complexity incrementally. A fully designed-from-scratch complex system usually fails because you can't foresee all the interactions, failure modes, and emergent behaviors that arise at scale.

This principle directly supports practices like building a Minimum Viable Product. Start with a small, functional core and validate assumptions early. Every new capability added incrementally is tested against reality, forcing the system to adapt. Systems that grow this way handle complexity better because they've been tested and refined at each stage, whereas an overly complex initial design tends to break when something unexpected happens.

Facebook is a well-known example. It started as a basic user profile system for Harvard students, then expanded gradually, adding features and handling more users over time. Attempting to build today's Facebook from scratch in 2004 would almost certainly have collapsed under its own complexity.

In the era of microservices, a common piece of advice influenced by Gall's Law is: don't start with microservices. Start with a monolith that works. As it grows, identify pieces to split into separate services. Those pieces have the benefit of prior existence, with known requirements, and are more likely to succeed once isolated.

The lesson is clear: start simple, prove it works, then evolve.
