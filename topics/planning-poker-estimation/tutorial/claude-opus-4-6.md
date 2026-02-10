# Planning poker estimation

Planning poker is an agile estimation and planning technique used to determine the relative size of user stories or features in software development projects. It is a collaborative, consensus-based method that involves the entire delivery team — developers, testers, product owners, and project managers — working together to build a shared understanding of the complexity and effort required to complete each item. Originally popularized by Mike Cohn in his 2005 book *Agile Estimating and Planning*, planning poker combines expert opinion, analogy, and structured discussion to produce reliable estimates while minimizing cognitive biases.

## How Planning Poker Works

Planning poker is played during a team meeting or estimation workshop. The product owner or facilitator presents the team with a prioritized list of user stories or features to estimate. Each participant holds a set of estimation cards, with each card representing a level of effort or complexity.

The process follows a repeatable cycle for each story:

- The product owner reads the user story aloud and answers clarifying questions from the team.
- Each team member privately selects a card representing their estimate of the effort required.
- All cards are revealed simultaneously so that no one is influenced by another's choice.
- If estimates diverge significantly, the highest and lowest estimators explain their reasoning.
- The team discusses risks, assumptions, dependencies, and technical considerations that drove the differences.
- The team re-estimates by selecting cards again.
- The cycle repeats until the team reaches consensus, typically within two or three rounds.

The final estimate is usually recorded as the consensus value, though some teams use the median or mode when perfect agreement is not reached.

## Common Estimation Scales

Teams choose from several popular scales depending on their preferences and the nature of their work. The key principle is that the scale should reflect increasing uncertainty at higher levels of effort.

| Scale Type | Values | Best For |
|---|---|---|
| Modified Fibonacci | 1, 2, 3, 5, 8, 13, 21 | Story point estimation with natural gaps that reflect increasing uncertainty |
| T-shirt sizes | XS, S, M, L, XL | Quick, rough sizing during early backlog grooming |
| Powers of two | 1, 2, 4, 8, 16, 32 | Teams that prefer a doubling progression for relative sizing |
| Time ballparks | Hours, Days, Weeks | Teams transitioning from time-based to relative estimation |

Most teams also include two special cards: a question mark card indicating the estimator needs more information before they can estimate, and an infinity card indicating the story is too large and must be broken down.

## Benefits of Planning Poker

Planning poker provides several advantages over individual estimation or open group discussion:

- **Reduces anchoring bias.** Because all estimates are revealed simultaneously, no single person's opinion can anchor the group toward a particular number.
- **Eliminates groupthink.** Private selection prevents team members from simply agreeing with the loudest voice or the most senior person.
- **Surfaces hidden risks.** Divergent estimates often reveal misunderstandings, overlooked dependencies, or unstated assumptions that would otherwise go unnoticed until implementation.
- **Builds shared understanding.** The discussion that follows each round ensures every team member understands the scope and technical implications of a story.
- **Improves accuracy over time.** Teams that use planning poker consistently develop a calibrated sense of relative effort, making future estimates more reliable.
- **Engages the whole team.** Every participant has an equal voice, which increases buy-in and accountability for the resulting commitments.

## Common Challenges and Mitigations

| Challenge | Mitigation |
|---|---|
| Sessions run too long | Timebox each story to five minutes; defer stories that need more research |
| One person dominates discussion | Enforce the simultaneous reveal rule strictly; rotate the facilitator role |
| Estimates cluster around one value without real discussion | Occasionally ask a random team member to justify their estimate even when all cards agree |
| Stories are too large to estimate meaningfully | Apply a rule that any story estimated above 13 (or the team's threshold) must be decomposed before entering a sprint |
| Remote teams struggle with the physical card ritual | Use digital planning poker tools such as PlanITpoker, Pointing Poker, or built-in features in Jira and Azure DevOps |

## Planning Poker Compared to Other Estimation Techniques

| Technique | Approach | Collaboration Level | Speed | Accuracy |
|---|---|---|---|---|
| Planning poker | Card-based simultaneous reveal with structured discussion | High | Moderate | High for well-practiced teams |
| Wideband Delphi | Multiple anonymous rounds with statistical convergence | Moderate | Slow | High but time-intensive |
| Affinity estimation | Stories sorted into groups on a wall by relative size | High | Fast | Moderate; good for large backlogs |
| Expert judgment | Single experienced person provides an estimate | Low | Very fast | Variable; depends on the expert |
| Three-point estimation | Optimistic, pessimistic, and most likely values averaged | Low to moderate | Moderate | Good for schedule risk analysis |

Planning poker strikes an effective balance between speed and accuracy for most agile teams. It is especially valuable during sprint planning and backlog refinement when team-wide alignment on story size directly influences sprint commitment and velocity tracking.

## Tips for Effective Sessions

- **Estimate relative effort, not calendar time.** Story points measure complexity and uncertainty relative to a baseline story, not hours or days.
- **Establish a reference story.** Choose a well-understood, previously completed story as a benchmark so that all future estimates are calibrated against a known quantity.
- **Keep stories small.** If a story consistently receives high estimates, break it into smaller stories before attempting to estimate again.
- **Limit the number of stories per session.** Estimation fatigue degrades quality; aim for ten to fifteen stories per session at most.
- **Involve everyone who will do the work.** Estimates are only as good as the knowledge in the room; include all relevant disciplines.
- **Record the rationale.** Capture key assumptions and risks discussed during estimation so the team can revisit them during implementation.

## Related

Related topics to explore next include Fibonacci task estimation for a deeper look at why the Fibonacci sequence is favored for relative sizing, agile software development methodology for the broader framework in which planning poker operates, story points and velocity for understanding how estimates feed into sprint planning, wideband Delphi for an alternative structured estimation technique, and backlog refinement for the ceremony where planning poker is most commonly applied.

## Summary

Planning poker is a proven agile estimation technique that harnesses the collective judgment of the entire team through simultaneous, independent estimation followed by structured discussion. By eliminating anchoring bias and groupthink, it produces more accurate and transparent estimates than traditional methods. The technique scales from small co-located teams using physical cards to distributed organizations using digital tools, and it consistently improves in accuracy as teams develop a shared calibration over successive sprints. When practiced regularly as part of backlog refinement and sprint planning, planning poker strengthens team alignment, surfaces risks early, and builds the shared understanding necessary for reliable delivery commitments.

## References

- Cohn, M. (2005). *Agile Estimating and Planning*. Prentice Hall. The foundational text that popularized planning poker as an estimation technique.
- Grenning, J. (2002). "Planning Poker or How to Avoid Analysis Paralysis while Release Planning." Renaissance Software Consulting. The original paper introducing the planning poker concept. [https://wingman-sw.com/articles/planning-poker](https://wingman-sw.com/articles/planning-poker)
- Mountain Goat Software. "Planning Poker." [https://www.mountaingoatsoftware.com/agile/planning-poker](https://www.mountaingoatsoftware.com/agile/planning-poker)
- Scrum Alliance. "Agile Estimation Techniques." [https://www.scrumalliance.org](https://www.scrumalliance.org)
- Mahnič, V., & Hovelja, T. (2012). "On using planning poker for estimating user stories." *Journal of Systems and Software*, 85(9), 2086–2095. An empirical study on the accuracy of planning poker estimates.
