# Gall's Law

A complex system that works is invariably found to have evolved from a simple system that worked.

Takeaways
Don’t build a complex system from scratch. Instead, make a simple version that works, then iterate and add complexity. This approach serves as a launching pad for experimentation and innovation.
Successful large systems often grow organically. A fully designed-from-scratch complex system usually fails because you can’t foresee all interactions.
This law argues for creating a Minimum Viable Product (MVP), a simple working core, and then growing it, rather than a big-bang approach.
Systems that grow tend to adapt and handle complexity better because they’ve been tested and refined at each stage. An overly complex initial design can break when something unexpected happens.
Overview
John Gall observed that successful complex systems start as successful simple systems. If you attempt to create a complex system from the beginning, it usually doesn’t work because there are too many unknowns you haven’t validated.

Instead, start with a simple architecture and learn from real-world usage. Add features or complexity incrementally, ensuring each change still works. When you start with a small, functional core, you can validate assumptions early. Every new capability added incrementally is tested against reality, forcing the system to adapt.

Gall's Law illustration
Gall’s Law

Examples
Facebook started as a simple website for Harvard students. It was essentially a basic user profile system that worked at that small scale, then expanded gradually, adding features and handling more users. If Mark Zuckerberg had tried to build today’s Facebook from scratch in 2004, it would almost certainly have collapsed under its own complexity.

In the era of microservices, a common piece of advice influenced by Gall’s Law is: don’t start with microservices. Start with a monolith (a simpler architecture) that works. As it grows, identify pieces to split off into separate services. Those pieces have the benefit of prior existence,you know their requirements from the monolith, and thus are more likely to work once isolated.

Origins
John Gall, an American pediatrician with a sideline in systems theory, published Systemantics: How Systems Work and Especially How They Fail in 1975. 30 publishers initially rejected the book before it became a cult classic.

The third edition (2002) of the book is named The Systems Bible.