# Disciplined Agile principle 4: Context counts

Disciplined Agile (DA) principle 4, "Context Counts," asserts that every team and organization is unique, so your Way of Working (WoW) must reflect your specific environment and evolve over time. There is no single process that works for everyone. Instead of adopting a framework wholesale, you must understand your situation deeply, tailor your approach accordingly, and continuously revisit your decisions as conditions change. This principle is one of the most practically important ideas in the Disciplined Agile toolkit because it guards against the widespread mistake of treating process adoption as a one-size-fits-all exercise.

## Why context matters

This principle is the logical partner to Disciplined Agile principle 3, "Pragmatism." It builds on the observation that every team, project, and organization faces a distinct set of challenges. A five-person startup building a greenfield mobile application operates in a fundamentally different reality than a hundred-person department maintaining a legacy mainframe system inside a heavily regulated bank. Treating them the same guarantees failure for at least one of them, and often both.

Context is not a minor consideration to acknowledge and then set aside. It is the single largest determinant of which practices will succeed and which will create friction, waste, or outright failure. Organizations that ignore context tend to fall into one of two traps: either they rigidly enforce a framework that does not fit, or they adopt no structure at all and drift into chaos. The DA principle of "Context Counts" steers teams toward a disciplined middle path where decisions are guided by situational awareness rather than dogma.

## Key scaling factors that shape context

Disciplined Agile identifies several scaling factors that influence how a team should work. Understanding these factors is a prerequisite for making informed process decisions.

| Scaling Factor | Description | Example Impact |
|---|---|---|
| **Team size** | The number of people collaborating on a deliverable | Small teams can use lightweight coordination; large teams need explicit roles and ceremonies |
| **Geographic distribution** | Whether team members are co-located, distributed, or globally dispersed | Distributed teams require asynchronous communication strategies and tooling investments |
| **Organizational complexity** | The degree of governance, compliance, and cross-team dependency | Highly complex organizations need more formal coordination and reporting mechanisms |
| **Technical debt** | The accumulated burden of shortcuts and outdated design in existing systems | High technical debt constrains agility and demands dedicated remediation capacity |
| **Domain complexity** | How intricate and specialized the problem domain is | Complex domains require deeper domain expertise and more rigorous validation |
| **Regulatory compliance** | The extent of external rules, audits, and documentation requirements | Regulated industries demand traceability, formal reviews, and controlled change processes |
| **Skill availability** | The experience level and breadth of the team's capabilities | Less experienced teams benefit from more structured guidance and coaching |

These factors do not operate in isolation. They interact and compound. A large, distributed team working in a regulated domain with significant technical debt faces a fundamentally different challenge than a small, co-located team building a new product in an unregulated space. The combination of factors is what defines the true context.

## How context influences process decisions

Because context varies so widely, Disciplined Agile does not prescribe a single recipe. Instead, it provides a toolkit of strategies and decision frameworks organized around process goals. Rather than dictating "do X," it asks "what is your context?" and then guides you toward the options most likely to succeed in your specific scenario.

Here are examples of how context drives different choices for the same process goal:

- **Coordination strategy**: A co-located team of six may coordinate through daily standup meetings and informal conversation. A distributed team of forty may need a Scrum-of-Scrums structure, shared Kanban boards, and scheduled cross-team sync meetings.

- **Planning horizon**: A startup exploring product-market fit may plan in one-week iterations with minimal upfront work. An enterprise program delivering a regulatory mandate may need quarterly planning events and detailed roadmaps extending six months forward.

- **Documentation level**: A team building an internal tool for a single department may rely on lightweight wikis and working code as documentation. A team building medical device software under FDA oversight must produce formal specifications, design documents, and traceability matrices.

- **Testing approach**: A team with strong automated test coverage and continuous integration can rely heavily on automated regression testing. A team working with legacy systems that lack test infrastructure may need more manual testing and exploratory testing sessions.

- **Governance model**: A small organization with high trust may use lightweight, peer-based governance. A large enterprise with strict audit requirements may need formal stage gates, architecture review boards, and compliance checkpoints.

## Common anti-patterns when ignoring context

Teams and organizations that fail to account for context frequently exhibit recognizable anti-patterns:

- **Framework worship**: Adopting a specific framework (such as SAFe, LeSS, or Scrum) as a rigid prescription without evaluating whether it fits the team's actual situation. The framework becomes the goal rather than the means.

- **Copy-paste adoption**: Replicating another organization's practices because they worked there, without analyzing the differences in context that may make those practices inappropriate.

- **Premature scaling**: Imposing enterprise-scale coordination mechanisms on small teams that do not need them, adding overhead without corresponding value.

- **Under-scaling**: Keeping lightweight practices long past the point where the team or organization has outgrown them, leading to coordination failures and quality problems.

- **Static process**: Defining a Way of Working once and never revisiting it, even as the team, product, and organizational context evolve significantly over time.

## Applying context-aware thinking in practice

To put this principle into practice, teams should take a structured approach to understanding and responding to their context:

1. **Assess your current context explicitly.** Identify where your team sits on each of the key scaling factors. Be honest about constraints, capabilities, and the realities of your environment.

2. **Use DA's goal-driven approach.** For each process goal (such as "coordinate activities" or "address risk"), review the range of options DA provides and select the ones that best fit your assessed context.

3. **Start with what works and adapt.** Choose a starting point that seems reasonable for your context, implement it, and observe the results. Do not aim for a perfect process on day one.

4. **Inspect and adapt regularly.** Build retrospectives and process reviews into your cadence. As your team grows, your product matures, or your organizational context shifts, revisit your choices and adjust.

5. **Avoid context envy.** Do not assume that what works for a famous tech company or a competitor will work for you. Your context is your own, and your process should reflect it.

## Context counts versus other agile approaches

The "Context Counts" principle distinguishes Disciplined Agile from more prescriptive frameworks:

| Approach | Stance on Context | Flexibility |
|---|---|---|
| **Scrum** | Prescribes specific roles, events, and artifacts; context adaptation is left to the team within those constraints | Moderate: flexible within the framework, but the framework itself is fixed |
| **SAFe** | Provides configurations for different scales but still prescribes significant structure at each level | Moderate: offers size-based configurations, but each configuration is relatively rigid |
| **Kanban** | Highly flexible by design, starting from current process and evolving incrementally | High: but offers less structured guidance on what to adopt |
| **Disciplined Agile** | Explicitly builds context assessment into the decision-making process with goal-driven frameworks | High: provides structured guidance without prescribing a single solution |

The DA approach aims to give teams the best of both worlds: enough structure to avoid chaos, and enough flexibility to fit the actual situation.

## Related

Teams exploring this principle should also study Disciplined Agile principle 3 ("Pragmatism"), which provides the philosophical foundation for context-aware process selection. Disciplined Agile principle 5 ("Choice Is Good") extends the idea by emphasizing that having multiple options for each process goal is a feature, not a problem. Broader topics worth studying include agile ways of working, the Disciplined Agile guidelines, organizational change management, and agile scaling frameworks such as SAFe and LeSS, which serve as useful points of comparison when understanding how different approaches handle context sensitivity.

## Summary

Disciplined Agile principle 4, "Context Counts," is a reminder that there is no universal process recipe in software delivery. Every team operates within a unique combination of scaling factors including team size, geographic distribution, organizational complexity, technical debt, domain complexity, and regulatory requirements. Rather than prescribing a single methodology, DA equips teams with a goal-driven toolkit and asks them to make deliberate, context-informed choices about how they work. The principle demands that teams continuously reassess their context and evolve their Way of Working as conditions change, ensuring that process serves the work rather than constraining it.

## References

- Ambler, S. W., & Lines, M. (2012). *Disciplined Agile Delivery: A Practitioner's Guide to Agile Software Delivery in the Enterprise*. IBM Press.
- Ambler, S. W., & Lines, M. (2020). *Choose Your WoW! A Disciplined Agile Delivery Handbook for Optimizing Your Way of Working*. Project Management Institute.
- Project Management Institute. "Disciplined Agile." https://www.pmi.org/disciplined-agile
- Ambler, S. W. "Context Counts: The Disciplined Agile Principle." https://disciplinedagileconsortium.org
