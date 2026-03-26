# Assume Variability; Preserve Options: Tutorial

## Overview

"Assume variability; preserve options" is Scaled Agile Framework (SAFe) Principle 3. This principle challenges the traditional software development practice of converging on a single design and requirements option early in the process. Instead, it advocates maintaining multiple options for a longer period and using empirical data to narrow the focus, ultimately producing designs that achieve optimum economic outcomes.

This tutorial guides change technology professionals through the reasoning behind this principle, the techniques for applying it, and the practical steps needed to embed option-preserving thinking into their agile practice.

## Key Concepts

### The Problem with Early Convergence

Traditional development approaches -- particularly waterfall and phase-gate models -- encourage teams to select a single design and set of requirements early in the project lifecycle. This feels efficient because it appears to eliminate ambiguity and allow focused execution.

However, early convergence carries significant risk:

- **The chosen path may be wrong.** Without empirical validation, the initial choice is essentially a guess, no matter how well-informed.
- **Adjustments are expensive.** Once a team has invested deeply in a single path, changing course requires costly rework.
- **Suboptimal outcomes result.** Even if the chosen path is adequate, it may not be the best available option.

### Set-Based Design

The antidote to early convergence is set-based design (also called set-based concurrent engineering), a practice drawn from Lean product development at Toyota. In set-based design:

- Multiple design options are developed in parallel during the early stages of development.
- Each option is explored sufficiently to understand its trade-offs, strengths, and weaknesses.
- Options are eliminated based on empirical evidence and data -- not opinion or authority.
- The design space gradually narrows as knowledge increases, converging on the best solution at the right time.

### Real Options Theory

This principle also draws from real options theory in finance, which recognizes that maintaining options has value. In software development, an option is the ability to make a decision in the future when more information is available. Options have value because uncertainty is high early in development and decreases as teams learn more.

Key properties of real options:
- Options have value -- the right to make a decision later is worth something.
- Options expire -- they must be exercised before their deadline.
- Never commit early unless you know why -- premature commitment destroys option value.

### The Role of Empirical Data

Preserving options is not about avoiding decisions indefinitely. It is about deferring decisions until they can be made with better information. Empirical data -- from prototypes, experiments, user testing, market research, and technical spikes -- provides the evidence needed to converge confidently.

## Practical Steps for Implementation

1. **Identify high-uncertainty decisions.** Not every decision warrants multiple options. Focus option-preserving strategies on decisions with high uncertainty and high impact -- architectural choices, market positioning, key user experience decisions, and technology selections.

2. **Practice set-based design.** When facing a significant design decision, develop two or three viable approaches in parallel. Allocate a bounded investment to exploring each option rather than betting everything on one.

3. **Use timeboxed experiments.** Run short experiments -- spikes, prototypes, A/B tests, proof-of-concept implementations -- to generate the empirical data needed to evaluate options. Set clear success criteria before beginning each experiment.

4. **Defer commitment responsibly.** Do not confuse preserving options with avoiding decisions. Identify the "last responsible moment" for each decision -- the point at which failing to decide would itself become costly -- and commit by that point.

5. **Make trade-offs visible.** When maintaining multiple options, explicitly document the trade-offs associated with each. Use trade-off curves, decision matrices, or simple pros-and-cons lists to make the comparison concrete and shared.

6. **Reduce the cost of experimentation.** The cheaper it is to experiment, the more options you can explore. Invest in rapid prototyping capabilities, modular architectures, and automated testing that reduce the cost of trying alternatives.

7. **Build modular, flexible architectures.** Architectural decisions that preserve flexibility -- such as microservices, well-defined interfaces, and loose coupling -- make it easier and cheaper to change direction later. Design for change, not just for current requirements.

8. **Challenge premature convergence.** When teams or leaders push for early commitment ("just pick one and go"), ask what evidence supports the choice. If the answer is intuition or convention rather than data, advocate for preserving options a bit longer.

9. **Communicate the economic rationale.** Maintaining multiple options can look wasteful to stakeholders unfamiliar with this principle. Explain the economic reasoning: the cost of exploring multiple options is typically far less than the cost of committing to the wrong one.

10. **Learn from eliminated options.** When an option is eliminated, capture what was learned. This knowledge often informs future decisions and reduces uncertainty in subsequent development cycles.

## Key Takeaway

Assuming variability and preserving options is a fundamentally different mindset from traditional "decide early, execute efficiently" approaches. It recognizes that in complex, uncertain environments, the best economic outcomes come from maintaining flexibility until empirical data supports confident convergence. Change technology professionals should champion this principle by fostering a culture of experimentation, investing in modular architectures, and helping organizations understand that the cost of exploring options is an investment in better outcomes -- not a waste of resources. The goal is to make the right decision at the right time, not the fastest decision at the earliest time.
