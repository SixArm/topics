# Disciplined Agile principle 3: Pragmatism

Disciplined Agile (DA) principle 3 states: "Pragmatism: Focus on being effective rather than dogmatically 'being agile'. This may involve using lean or even traditional strategies if they fit the situation better." This principle serves as the reality check of the DA mindset, pushing teams away from agile dogmatism and toward genuine effectiveness. Rather than treating any single framework as gospel, pragmatism demands that teams select approaches based on what actually works in their specific situation, drawing from agile, lean, and traditional methods as needed.


## Why Pragmatism Matters

The software industry has seen repeated waves of methodology orthodoxy. Organizations adopt a framework, enforce its rituals uniformly, and measure success by compliance rather than outcomes. Principle 3 directly challenges this pattern. It asserts that the purpose of any process choice is to deliver results, not to earn a label like "Scrum purist" or "true agile." Teams that fixate on following a framework to the letter often sacrifice outcomes for orthodoxy, spending energy defending process choices instead of solving real problems.

Pragmatism matters because no single approach works everywhere. A team building safety-critical embedded software for a medical device faces fundamentally different demands than a team iterating on a consumer web application. Regulatory requirements, team maturity, organizational culture, technical complexity, and stakeholder expectations all influence which practices will be effective. Ignoring these factors in favor of a one-size-fits-all framework leads to wasted effort, frustrated teams, and suboptimal results.


## Core Tenets

Principle 3 rests on several interrelated ideas that together form a disciplined approach to process selection.

- **Effectiveness over ideology.** If a traditional waterfall technique or a specific lean practice is the most effective solution for a given problem, use it. The measure of a good process is whether it helps the team succeed, not whether it conforms to a particular methodology's rules.

- **Context drives decisions.** Every team operates within different constraints, skill levels, regulatory environments, and organizational cultures. Pragmatism means selecting the right approach for the situation at hand rather than forcing a single framework where it does not fit.

- **Intentional discipline, not sloppiness.** Flexibility is not an excuse for abandoning rigor. Pragmatism in DA means making deliberate, reasoned choices. The distinction is critical: choosing a sequential approach for a well-understood regulatory deliverable is pragmatic; skipping retrospectives because the team finds them inconvenient is not.

- **Continuous learning and adaptation.** Pragmatic teams regularly reassess their process choices. What works today may not work next quarter as the team grows, the product matures, or market conditions shift.


## Pragmatism vs. Dogmatism

Understanding principle 3 requires distinguishing pragmatic choices from dogmatic ones. The following table highlights common scenarios where this distinction plays out.

| Scenario | Dogmatic Response | Pragmatic Response |
|---|---|---|
| Regulatory deliverable with fixed requirements | Force iterative sprints regardless of fit | Use a sequential lifecycle with defined gates if that reduces risk and satisfies auditors |
| Team struggles with sprint planning | Insist on stricter adherence to Scrum ceremonies | Investigate root causes; consider kanban flow if time-boxed planning is the bottleneck |
| Stakeholders want detailed upfront documentation | Refuse because "agile values working software over documentation" | Provide necessary documentation; the Agile Manifesto says "while there is value in the items on the right" |
| New team with no agile experience | Immediately adopt full SAFe or Scrum at scale | Start with a simple lifecycle, build competency, and evolve practices over time |
| Continuous delivery pipeline is mature | Maintain two-week sprint boundaries | Drop artificial sprint boundaries; use continuous flow and deploy on demand |


## Multiple Lifecycles in Disciplined Agile

One of the clearest expressions of principle 3 is DA's explicit support for multiple lifecycles. Where some frameworks insist on fixed-length sprints as the only valid approach, DA acknowledges that different situations call for different rhythms. DA defines several lifecycles that teams can choose from based on their context.

- **Agile (Scrum-based).** Iterative development with time-boxed sprints. Suitable for teams that benefit from regular cadence and are working on moderately complex, evolving requirements.

- **Lean (Kanban-based).** Continuous flow with work-in-progress limits. Effective for teams handling a steady stream of work items of varying size, such as support or operations teams.

- **Continuous Delivery.** Extends agile or lean with automated deployment pipelines, enabling teams to release individual features as soon as they are ready.

- **Exploratory (Lean Startup).** Hypothesis-driven development focused on validating assumptions quickly. Suited for new products or markets where the problem space is poorly understood.

- **Program.** Coordination lifecycle for large initiatives involving multiple teams. Provides structure for cross-team dependencies without imposing a single team-level process.

The pragmatic choice is to match the lifecycle to the team's situation, then evolve as circumstances change.


## How to Apply Pragmatism in Practice

Adopting principle 3 requires more than intellectual agreement. Teams and leaders need concrete habits that make pragmatism operational.

- **Start with goals, not frameworks.** Before selecting a process, articulate what the team needs to achieve. Framing the conversation around outcomes rather than methodology names keeps the focus on effectiveness.

- **Use guided continuous improvement.** DA provides process goal diagrams that map out decision points and potential practices for common challenges. Use these as a starting point, then tailor based on what you observe in your specific environment.

- **Experiment and measure.** Treat process choices as hypotheses. Try an approach, measure its impact on delivery and team well-being, and adjust. Retrospectives and metrics provide the feedback loop that keeps pragmatism disciplined rather than arbitrary.

- **Resist pressure to conform.** Organizations often push teams toward a single mandated framework for the sake of consistency. Pragmatism requires the courage to advocate for the approach that fits, supported by evidence and reasoning.

- **Document your rationale.** When deviating from a mainstream framework's prescribed practices, record why the team made that choice. This protects against drift toward sloppiness and provides a basis for future reassessment.


## Common Anti-Patterns

Pragmatism is easy to misinterpret. The following anti-patterns frequently emerge when teams attempt to apply principle 3 without sufficient discipline.

| Anti-Pattern | Description | Corrective Action |
|---|---|---|
| Cherry-picking comfort | Dropping practices that feel uncomfortable rather than those that are ineffective | Evaluate practices based on measured outcomes, not team preference alone |
| Analysis paralysis | Spending excessive time evaluating methodology options instead of delivering | Set a time box for process decisions; commit, try, and iterate |
| Faux agile | Claiming pragmatism while actually abandoning all discipline and rigor | Ensure every deviation from standard practice has a stated rationale and is reviewed periodically |
| Framework tourism | Constantly switching frameworks without giving any approach time to produce results | Commit to a chosen approach for a defined period before evaluating and potentially changing |
| Local optimization | Optimizing a single team's process at the expense of organizational flow | Consider enterprise awareness and the impact of process choices on upstream and downstream teams |


## Related

Teams exploring principle 3 should also study the broader set of Disciplined Agile principles for full context, particularly principle 2 (Be Awesome) which emphasizes creating conditions for effectiveness, and principle 4 (Context Counts) which directly reinforces the idea that situation shapes strategy. Understanding the Disciplined Agile toolkit's process goal diagrams provides the practical mechanism for making pragmatic choices. Related topics include lean thinking, the Agile Manifesto's values and principles, kanban method, continuous delivery practices, and the concept of fit-for-purpose governance.


## Summary

Disciplined Agile principle 3 calls on teams to prioritize effectiveness over ideological purity. It grants explicit permission to draw from agile, lean, and traditional approaches based on what the situation demands, while insisting that flexibility be exercised with intentionality and discipline. The principle manifests most visibly in DA's support for multiple lifecycles and its guided continuous improvement approach. Teams that internalize pragmatism avoid both the trap of rigid framework adherence and the opposite trap of undisciplined chaos, finding instead a middle path where process choices are context-driven, evidence-based, and continuously refined.


## References

- Ambler, S. W., & Lines, M. (2012). *Disciplined Agile Delivery: A Practitioner's Guide to Agile Software Delivery in the Enterprise*. IBM Press.
- Ambler, S. W., & Lines, M. (2020). *Choose Your WoW! A Disciplined Agile Approach to Optimizing Your Way of Working*. Project Management Institute.
- Project Management Institute. (2021). *The Disciplined Agile Toolkit*. https://www.pmi.org/disciplined-agile
- Beck, K., et al. (2001). *Manifesto for Agile Software Development*. https://agilemanifesto.org
- Anderson, D. J. (2010). *Kanban: Successful Evolutionary Change for Your Technology Business*. Blue Hole Press.
- Ries, E. (2011). *The Lean Startup*. Crown Business.
