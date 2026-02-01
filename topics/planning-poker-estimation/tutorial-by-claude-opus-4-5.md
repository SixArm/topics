## Planning Poker Estimation

Planning poker is an agile estimation technique used to determine the relative size and complexity of user stories or features in software development projects. This collaborative method brings together the entire team—developers, product owners, testers, and project managers—to establish a shared understanding of the effort required to complete work items.

## How Planning Poker Works

The technique follows a structured process designed to gather independent estimates before discussion:

1. **Preparation**: Each team member receives a deck of estimation cards
2. **Story presentation**: The product owner describes a user story or feature
3. **Private selection**: Each participant independently selects a card representing their estimate
4. **Simultaneous reveal**: All cards are shown at the same time
5. **Discussion**: Team members explain their reasoning, especially outliers
6. **Re-estimation**: The process repeats until consensus is reached

The simultaneous reveal is critical—it prevents anchoring bias where early opinions unduly influence later estimates.

## Common Estimation Scales

| Scale Type | Values | Best For |
|------------|--------|----------|
| Fibonacci | 1, 2, 3, 5, 8, 13, 21 | Acknowledging uncertainty at larger sizes |
| Modified Fibonacci | 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100 | Teams needing finer granularity |
| T-shirt sizes | XS, S, M, L, XL, XXL | Quick, rough estimates |
| Powers of 2 | 1, 2, 4, 8, 16, 32 | Teams preferring simpler math |
| Time-based | Hours, Days, Weeks | Teams transitioning from traditional estimation |

The Fibonacci sequence is most popular because the increasing gaps between numbers reflect the inherent uncertainty in estimating larger work items.

## Special Cards

Most planning poker decks include special cards beyond the numeric values:

- **Zero (0)**: The story is already done or trivially simple
- **Question mark (?)**: Need more information before estimating
- **Infinity (∞)**: The story is too large and must be split
- **Coffee cup**: Participant needs a break

## Benefits of Planning Poker

- **Reduces anchoring bias**: Simultaneous reveals prevent early estimates from influencing others
- **Combats groupthink**: Independent selection encourages diverse perspectives
- **Surfaces hidden complexity**: Discussion reveals technical challenges and dependencies
- **Builds shared understanding**: The conversation is often more valuable than the number
- **Engages the whole team**: Everyone participates, not just senior members
- **Identifies risks early**: Outlier estimates often indicate risks others missed

## When Estimates Diverge

Large differences between estimates typically indicate:

| Divergence Cause | Resolution Approach |
|------------------|---------------------|
| Different interpretations of scope | Clarify acceptance criteria |
| Hidden technical complexity | Let the high estimator explain concerns |
| Knowledge gaps | Share relevant context or domain expertise |
| Missing dependencies | Document and factor into the estimate |
| Story too large | Break into smaller, more estimable pieces |

The highest and lowest estimators should always explain their reasoning. Often, valuable information emerges that changes the team's understanding.

## Reaching Consensus

Teams use various methods to finalize estimates after discussion:

- **Median**: Middle value of all estimates; resistant to outliers
- **Mode**: Most frequently selected value; reflects majority view
- **Re-vote**: Continue rounds until estimates converge naturally
- **Delegation**: Let the person doing the work make the final call

Most teams re-vote after discussion and accept consensus when estimates cluster within one or two adjacent values.

## Common Pitfalls to Avoid

- **Rushing the process**: The discussion matters more than speed
- **Estimating in hours**: Stick to relative sizing, not absolute time
- **Letting one voice dominate**: Ensure quieter team members participate
- **Skipping the reveal**: Showing cards sequentially defeats the purpose
- **Over-precision**: Don't debate the difference between 5 and 8 for long
- **Estimating too many stories**: Fatigue reduces estimate quality

## Tools and Formats

Planning poker can be conducted in various settings:

| Format | Tools | Considerations |
|--------|-------|----------------|
| In-person | Physical card decks | Best for team bonding and discussion |
| Remote synchronous | Scrumpoker.online, PlanITpoker, Jira plugins | Requires video for discussion quality |
| Asynchronous | Built-in tools in Jira, Azure DevOps | Loses discussion benefit; use sparingly |

## Integration with Sprint Planning

Planning poker typically occurs during backlog refinement or sprint planning:

- **Backlog refinement**: Estimate upcoming stories to prepare for sprint planning
- **Sprint planning**: Verify estimates for stories being committed to the sprint
- **Just-in-time**: Estimate stories immediately before pulling into a sprint

Teams often set a threshold (such as 13 points) above which stories must be split before being brought into a sprint.

## Relative vs. Absolute Estimation

Planning poker emphasizes relative estimation—comparing stories to each other rather than predicting actual hours or days:

| Relative Estimation | Absolute Estimation |
|---------------------|---------------------|
| "This is twice as complex as that login feature" | "This will take 16 hours" |
| Acknowledges uncertainty | Creates false precision |
| Improves with team calibration | Prone to systematic bias |
| Faster to achieve consensus | Debates become contentious |

Teams calibrate by establishing reference stories—well-understood completed work items that serve as benchmarks for comparison.

## Summary

Planning poker transforms estimation from a solo activity into a team conversation that builds shared understanding. The technique's power lies not in producing perfect numbers but in surfacing assumptions, risks, and complexity through structured discussion. When practiced consistently, it helps teams develop reliable velocity and make better commitments.
