# Cargo cult

Cargo cult refers to the superficial adoption of practices, processes, or technologies without understanding their underlying principles or purpose. The term originates from post-World War II anthropological observations of Pacific Islander communities who mimicked the behaviors of military personnel, constructing imitation airstrips, control towers, and radios from bamboo and coconut shells, believing these rituals would summon the material goods they had seen during wartime. In technology and business, cargo cult thinking is one of the most pervasive and damaging anti-patterns, leading teams and organizations to replicate the visible trappings of success while fundamentally missing the reasoning that makes those practices effective.

## Origins of the term

The phrase "cargo cult" entered popular discourse through physicist Richard Feynman's 1974 Caltech commencement address, in which he coined the term "cargo cult science" to describe research that follows the outward form of scientific inquiry but lacks the rigor, skepticism, and intellectual honesty that give science its power. Feynman's analogy resonated broadly because it captured a universal human tendency: the desire to achieve results by imitating appearances rather than understanding causes.

In the decades since, the concept has been applied across disciplines, from management theory to software engineering to public policy. Anywhere complex systems produce desirable outcomes, there is a risk that observers will attribute those outcomes to the wrong factors and replicate superficial details instead of essential mechanisms.

## How cargo cult manifests in technology

In software engineering and technology organizations, cargo cult thinking takes many forms. Teams adopt frameworks, ceremonies, tools, and architectural patterns because successful companies use them, without examining whether those choices fit their own context, constraints, or goals.

| Domain | Cargo cult behavior | What is actually needed |
|---|---|---|
| Agile adoption | Holding daily standups, sprint reviews, and retrospectives as rote rituals | A genuine commitment to iterative delivery, feedback loops, and continuous improvement |
| Microservices | Breaking a monolith into dozens of services because large companies do it | Understanding distributed systems tradeoffs and choosing architecture based on actual scale and team structure |
| DevOps | Installing CI/CD tooling without changing culture or deployment practices | Shared ownership of reliability, fast feedback, and a culture of collaboration between development and operations |
| Testing | Writing unit tests to hit a coverage metric without testing meaningful behavior | A testing strategy that validates business logic, catches regressions, and provides confidence to ship |
| Hiring | Replicating FAANG-style whiteboard interviews for a 10-person startup | An interview process designed to evaluate the skills and traits that matter for the actual role and team |

## Common causes

Several forces drive cargo cult behavior in organizations:

- **Management pressure.** Leaders demand rapid adoption of industry best practices to signal modernization, without allocating the time or resources required to understand and internalize those practices.
- **Lack of proper training.** Teams are told to use a new framework or methodology but receive only surface-level instruction, leaving them to cargo-cult their way through implementation.
- **Resistance to cultural change.** Genuine transformation often requires shifts in power structures, communication patterns, and accountability. Organizations adopt the ceremonies while preserving rigid hierarchies and siloed workflows.
- **Survivorship bias.** Teams observe what successful companies do today without understanding the journey, failures, and context that shaped those decisions.
- **Cargo cult copying of tooling.** Choosing the same technology stack as a high-profile company, regardless of whether the team has the expertise, scale, or use case to justify it.

## Consequences

The effects of cargo cult thinking compound over time and erode both productivity and morale:

- **Overhead without benefit.** Teams spend time on ceremonies, processes, and architectural complexity that deliver no value because the underlying intent is absent.
- **Team frustration and disillusionment.** Engineers and managers alike grow cynical when practices fail to deliver promised improvements, often blaming the methodology itself rather than the shallow implementation.
- **Failed deliveries.** Projects stall or collapse because the adopted approach does not actually fit the problem, and the team lacks the understanding to adapt.
- **Institutional learned helplessness.** After repeated cargo cult failures, organizations become skeptical of all process improvement, making genuine transformation even harder.
- **Technical debt.** Architectural decisions made by imitation rather than analysis produce systems that are harder to maintain, scale, and reason about.

## How to recognize cargo cult thinking

Identifying cargo cult behavior requires honest self-assessment. Key warning signs include:

- The team can describe what they do but not why they do it.
- Practices are followed uniformly regardless of context, with no adaptation or experimentation.
- Metrics are optimized for their own sake rather than as proxies for meaningful outcomes.
- Retrospectives or feedback mechanisms exist on paper but produce no actual changes.
- Decisions about tools, architecture, or process are justified primarily by appeal to authority ("Company X does it this way").
- There is a gap between the language the organization uses and the behavior it exhibits.

## How to avoid cargo cult

Avoiding cargo cult requires deliberate effort at both the individual and organizational level:

- **Start with principles, not practices.** Before adopting any methodology, framework, or tool, invest time in understanding the problem it was designed to solve and the principles that make it effective.
- **Invest in education and coaching.** Bring in experienced practitioners who can teach not just the mechanics but the reasoning. Pair less experienced team members with mentors who model the underlying mindset.
- **Adapt to context.** No practice is universal. Evaluate whether a given approach fits the team's size, maturity, domain, and constraints. Be willing to modify or discard practices that do not serve the team's actual needs.
- **Build feedback loops.** Create mechanisms for honest evaluation of whether adopted practices are producing real results. Retrospectives, blameless post-mortems, and outcome-based metrics all help surface cargo cult patterns early.
- **Encourage curiosity.** Foster a culture where asking "why do we do this?" is welcomed rather than seen as dissent. Teams that understand the rationale behind their processes are far more likely to execute them effectively.
- **Iterate gradually.** Rather than adopting an entire framework wholesale, introduce practices incrementally, evaluate their impact, and adjust before adding more complexity.

## Cargo cult versus genuine adoption

| Dimension | Cargo cult adoption | Genuine adoption |
|---|---|---|
| Motivation | Imitation of successful organizations | Solving a specific, understood problem |
| Understanding | Surface-level knowledge of mechanics | Deep comprehension of principles and tradeoffs |
| Adaptation | Rigid, one-size-fits-all application | Tailored to team context, continuously refined |
| Feedback | Ignored or ritualized | Actively sought and acted upon |
| Outcomes | Overhead, frustration, stagnation | Measurable improvement aligned with goals |
| Culture | Unchanged beneath new terminology | Fundamentally shifted to support new ways of working |

## Related

Related topics to explore next include anti-patterns in software engineering and organizational design, the Dunning-Kruger effect as it applies to process adoption, Richard Feynman's concept of cargo cult science, the difference between Agile as a mindset versus Agile as a set of ceremonies, Conway's Law and its implications for organizational structure, the concept of goodhart's law (when a measure becomes a target it ceases to be a good measure), first-principles thinking, and the distinction between outputs versus outcomes in product development.

## Summary

Cargo cult is the anti-pattern of adopting the visible forms of successful practices while failing to understand or internalize the principles that make those practices effective. In technology, it manifests as ritualistic adoption of methodologies, architectures, and tools driven by imitation rather than comprehension. The antidote is not to avoid adopting proven practices, but to approach adoption with intellectual honesty, invest in genuine understanding, adapt to context, and build feedback mechanisms that reveal whether practices are delivering real value or merely adding overhead. Organizations that cultivate curiosity, encourage questions about purpose, and iterate thoughtfully will consistently outperform those that copy appearances and hope for results.

## References

- Feynman, R. (1974). "Cargo Cult Science." Caltech Commencement Address. Available at: https://calteches.library.caltech.edu/51/2/CargoCult.htm
- Sutherland, J. (2014). *Scrum: The Art of Doing Twice the Work in Half the Time.* Crown Business.
- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps.* IT Revolution Press.
- Brooks, F. (1975). *The Mythical Man-Month: Essays on Software Engineering.* Addison-Wesley.
- Poppendieck, M. & Poppendieck, T. (2003). *Lean Software Development: An Agile Toolkit.* Addison-Wesley.
- Wikipedia contributors. "Cargo cult." Wikipedia. https://en.wikipedia.org/wiki/Cargo_cult
- Wikipedia contributors. "Cargo cult programming." Wikipedia. https://en.wikipedia.org/wiki/Cargo_cult_programming
