# Dunbar's Number

Dunbar's Number refers to the theoretical cognitive limit on the number of stable social relationships a person can maintain, estimated at approximately 150 individuals. Proposed by British anthropologist Robin Dunbar in the 1990s, the concept emerged from research correlating primate neocortex size with average social group size. For technology professionals, Dunbar's Number offers a powerful lens for understanding why teams lose cohesion at certain sizes, why communication overhead grows nonlinearly, and how organizational design can work with, rather than against, the limits of human cognition.

## Origins and Scientific Basis

Robin Dunbar, an evolutionary psychologist at the University of Oxford, observed that primates with larger neocortices consistently lived in larger social groups. By extrapolating the ratio of neocortex volume to group size across primate species and applying it to humans, Dunbar predicted that humans can cognitively maintain roughly 150 meaningful relationships. This is not a hard ceiling but a statistical central tendency, with individual variation typically ranging from 100 to 250.

The number has found empirical support across a wide range of human social structures throughout history. Neolithic farming villages, Roman army centuries, Hutterite communities, and medieval English parish records all cluster around 150 members. The consistency of this pattern across cultures and eras suggests it reflects something fundamental about human social cognition rather than a coincidence of any single organizational tradition.

## The Layered Social Structure

Dunbar did not propose a single number in isolation. He described a series of concentric social layers, each roughly three times the size of the one before it. These layers reflect different depths of social knowledge and emotional investment.

| Layer | Approximate Size | Relationship Quality | Technology Analogy |
|-------|-----------------|----------------------|--------------------|
| Intimate circle | 5 | Deep trust, daily contact, emotional support | Core pair-programming partners, co-founders |
| Sympathy group | 15 | Close friends, strong professional trust | Your immediate team or squad |
| Affinity group | 50 | Regular contact, meaningful working relationships | A department or product group |
| Active network | 150 | You know their name, role, and how they relate to others | An engineering organization or startup |
| Acquaintances | 500 | Recognized faces, limited context | A mid-size company, a conference community |
| Known contacts | 1,500 | You can match a name to a face | Extended professional network |

Each layer demands progressively less cognitive investment per person but more total coordination overhead as the group scales. The intimate circle of 5 requires high-bandwidth communication, such as daily standups or continuous pairing. The 150-person active network can function on lower-bandwidth channels like company wikis and all-hands meetings, but only if the organization provides appropriate structure.

## Implications for Software Teams

The relevance of Dunbar's Number to technology organizations is both practical and structural. Software development is fundamentally a collaborative activity that depends on shared understanding, trust, and rapid communication. Each of these qualities degrades as group size increases.

- **Small teams (5-8 people) align with the intimate and sympathy layers.** These teams can operate with minimal process, shared context, and high trust. Decisions happen in conversation. Everyone knows the codebase. This is the zone where agile methodologies work best and where Amazon's famous "two-pizza team" rule operates.

- **Mid-size groups (15-50 people) require explicit coordination.** At this scale, not everyone can be in every meeting or review every pull request. Teams need defined interfaces, clear ownership boundaries, and deliberate communication rituals. This is where practices like team-of-teams, Spotify's squad model, and domain-driven design become necessary.

- **Organizations beyond 150 people experience a qualitative shift.** Informal knowledge networks break down. You no longer know who to ask about a given system. New hires take longer to become productive because tribal knowledge is no longer ambient. Organizations at this scale must invest in documentation, internal tooling, onboarding programs, and formal escalation paths.

## The 150-Person Inflection Point

Many technology companies report a distinct cultural and operational transition around the 150-employee mark. This transition manifests in several observable ways:

- People stop knowing everyone by name and role
- All-hands meetings shift from interactive discussions to broadcast presentations
- Decision-making slows as more stakeholders must be consulted
- Informal "just ask someone" knowledge sharing gives way to a need for wikis, runbooks, and structured onboarding
- Subcultures form within the organization, sometimes with competing norms
- The feeling of being "one team" erodes, and deliberate effort is required to maintain shared identity

Startups that grow through this threshold without adapting their organizational structure often experience a period of confusion and declining velocity. The practices that worked at 50 people, such as ad hoc communication, flat hierarchy, and implicit cultural norms, fail at 200. Recognizing that this transition is cognitive, not merely logistical, helps leaders respond with appropriate structural changes rather than blaming individuals for communication failures.

## Strategies for Working Within the Limit

Technology organizations can apply Dunbar's research in several concrete ways:

- **Decompose large organizations into small, autonomous teams.** Keep day-to-day working groups at 5 to 10 people. Give each team clear ownership of a bounded domain, its own backlog, and the authority to make decisions within that domain.

- **Create explicit communication structures at scale.** When an organization exceeds 50 people, invest in architecture decision records, internal RFCs, team charters, and service catalogs. These artifacts substitute for the informal knowledge that no longer flows naturally.

- **Respect the layers when designing meetings and channels.** A five-person team needs a daily sync. A 50-person department needs a weekly digest. A 150-person organization needs a monthly town hall. Matching communication cadence to group size prevents both meeting fatigue and information starvation.

- **Use Conway's Law deliberately.** Since organizational structure shapes system architecture, design your teams to mirror the system boundaries you want. Small, well-defined teams produce small, well-defined services.

- **Invest in tooling that extends cognitive capacity.** Service meshes, observability platforms, internal developer portals, and well-maintained documentation effectively raise the practical limit of how many people can collaborate on a shared system.

## Open-Source and Distributed Communities

Large open-source projects provide instructive examples of managing communities that far exceed 150 contributors. The Linux kernel, with thousands of contributors, is organized into subsystem maintainer trees, each of which functions as a small trusted group. Linus Torvalds interacts directly with roughly 20 to 30 top-level maintainers, well within the sympathy group layer. Each maintainer, in turn, manages a similarly sized group of sub-maintainers. The result is a hierarchy of small groups that enables coordination at enormous scale without requiring any single person to maintain more than 150 active relationships.

Similarly, the Apache Software Foundation, the Python community, and Kubernetes all employ governance structures that decompose a large contributor base into working groups, special interest groups, or committees of manageable size.

## Criticisms and Limitations

Dunbar's Number is not without its critics. Some researchers argue that the statistical correlation between neocortex size and group size is weaker than originally claimed. Others point out that modern communication technology, from email to Slack to video conferencing, may effectively extend the cognitive limit by offloading relationship maintenance to external tools.

However, even skeptics generally acknowledge the core insight: human social cognition has finite capacity, and organizations that ignore this constraint pay a price in coordination overhead, cultural fragmentation, and communication failure. Whether the precise number is 120 or 200 matters less than the principle that there is a limit, and that crossing it requires structural adaptation.

## Related

To deepen your understanding of Dunbar's Number and its organizational implications, explore these related topics: Conway's Law, which connects organizational structure to system architecture; Brooks's Law, which explains why adding people to a late project makes it later; the Ringelmann Effect, which describes how individual productivity decreases as group size grows; the Two-Pizza Team rule popularized by Amazon; Price's Law, which observes that a small fraction of contributors produce the majority of output; and Metcalfe's Law, which quantifies how communication complexity scales with network size.

## Summary

Dunbar's Number is a foundational concept for anyone designing, scaling, or managing technology organizations. The cognitive limit of approximately 150 stable relationships explains why startups undergo cultural shifts at predictable headcounts, why small teams outperform large ones in communication efficiency, and why successful large-scale projects decompose into hierarchies of small groups. Technology professionals who internalize this principle can make better decisions about team structure, communication design, and organizational scaling, working with the grain of human cognition rather than against it.

## References

- Dunbar, R. I. M. (1992). "Neocortex size as a constraint on group size in primates." *Journal of Human Evolution*, 22(6), 469-493.
- Dunbar, R. I. M. (2010). *How Many Friends Does One Person Need? Dunbar's Number and Other Evolutionary Quirks*. Harvard University Press.
- Dunbar, R. I. M. (2020). "Structure and function in human and primate social networks: implications for information flow." *Philosophical Transactions of the Royal Society B*, 375(1803).
- Brooks, F. P. (1975). *The Mythical Man-Month: Essays on Software Engineering*. Addison-Wesley.
- Conway, M. E. (1968). "How Do Committees Invent?" *Datamation*, 14(4), 28-31.
- Gladwell, M. (2000). *The Tipping Point: How Little Things Can Make a Big Difference*. Little, Brown and Company. (Chapter on the Rule of 150.)
- MacCormack, A., Rusnak, J., & Baldwin, C. (2006). "Exploring the Structure of Complex Software Designs." *Management Science*, 52(7), 1015-1030.
