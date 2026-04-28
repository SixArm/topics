# Relative Estimation

Relative estimation is a technique for assessing work by comparing items to one another rather than using absolute units such as hours, days, or weeks. This approach leverages a fundamental human strength: people are naturally better at comparing two things than predicting exact durations, especially under the high uncertainty common in software development. Rather than asking "How long will this task take?", a team asks "Is this task more or less complex than the one we just completed?" The result is faster planning sessions, better risk discovery, and more reliable forecasting over time.

## Why Absolute Estimation Fails

Traditional estimation asks individuals to predict how many hours or days a task will take. This fails for several well-documented reasons. Humans consistently underestimate novel work due to the planning fallacy. Context switching, meetings, and interruptions erode productive hours in ways that are difficult to predict. Tasks that appear similar on the surface can hide vastly different amounts of complexity beneath. Absolute estimates also create false accountability: when a developer says "two days" and it takes four, the conversation shifts from problem-solving to blame. Relative estimation sidesteps these problems by removing the pretense of precision and focusing on comparative complexity instead.

## How Relative Estimation Works

The process begins by selecting a baseline task that the entire team understands well. This task is assigned a middle value on the chosen scale, typically a 3 or 5 in a Fibonacci sequence. Every subsequent task is then compared against this reference point and against other already-estimated tasks. The key question is always comparative: "Is this bigger, smaller, or about the same as that?"

The steps are straightforward:

- Select a well-understood task as the reference point and assign it a baseline value.
- Present the next task to the team and discuss its scope, risks, and unknowns.
- Each team member independently compares the new task to the reference and selects a value.
- If estimates diverge significantly, the highest and lowest estimators explain their reasoning.
- The team converges on a consensus value through brief discussion.
- Repeat for remaining tasks, now comparing against the growing set of estimated items.

## Common Scales

Teams use several scales depending on their preference for granularity and simplicity.

| Scale | Values | Best For |
|---|---|---|
| Fibonacci | 1, 2, 3, 5, 8, 13, 21 | Teams that want to express growing uncertainty at larger sizes |
| Modified Fibonacci | 1, 2, 3, 5, 8, 13, 20, 40, 100 | Backlog grooming sessions with a wide range of item sizes |
| T-shirt sizes | XS, S, M, L, XL, XXL | Quick, low-friction estimation or non-technical stakeholders |
| Powers of 2 | 1, 2, 4, 8, 16, 32 | Teams that prefer strict doubling to express scale differences |
| Simple | 1, 2, 3 | Teams that want to minimize debate and maximize throughput |

Fibonacci numbers are the most widely adopted because the increasing gaps between values naturally reflect the increasing uncertainty that accompanies larger work items. There is no practical difference between a 14-point task and a 13-point task, so the scale deliberately removes that false precision.

## Estimation Techniques

**Planning Poker** is the most popular facilitation method. Each participant holds a set of cards with scale values. After discussing a task, all participants simultaneously reveal their chosen card. Simultaneous reveal is critical because it prevents anchoring bias, where early opinions disproportionately influence later ones. When estimates diverge by more than two positions on the scale, the outliers explain their reasoning before the team re-estimates.

**Affinity Estimating** works well for large backlogs. All tasks are written on cards or sticky notes and placed on a table. Team members silently sort them into columns from smallest to largest. After the silent sort, the team walks through the groupings together, discusses disagreements, and assigns scale values to each column. This technique can estimate 50 to 100 items in under an hour.

**Bucket Estimating** combines elements of both. The team defines a set of buckets corresponding to scale values. A few reference items are placed first, then remaining items are quickly dropped into the appropriate bucket by comparison. This is efficient for very large backlogs where Planning Poker would be too slow.

## Velocity and Forecasting

Relative estimation becomes powerful when paired with velocity tracking. Velocity is the number of story points a team completes per sprint, measured after the work is done rather than predicted in advance. After two or three sprints, a stable velocity emerges that enables reliable forecasting.

| Sprint | Points Committed | Points Completed | Rolling Average Velocity |
|---|---|---|---|
| 1 | 30 | 25 | 25 |
| 2 | 28 | 27 | 26 |
| 3 | 32 | 30 | 27 |
| 4 | 30 | 28 | 28 |

With a known velocity and a sized backlog, teams can answer questions like "When will this feature be done?" or "How much can we deliver by this date?" without relying on individual task-level time estimates. The forecast improves naturally as more sprints provide data.

## Benefits and Limitations

**Benefits:**

- Faster than absolute estimation because comparisons are cognitively simpler than predictions.
- Surfaces hidden complexity through the discussion that accompanies divergent estimates.
- Accounts for differences in team member experience by measuring inherent task complexity rather than individual speed.
- Improves over time as the team builds a shared reference library of estimated work.
- Reduces blame culture by separating effort assessment from time commitment.

**Limitations:**

- Story points are meaningless across teams because each team calibrates its own scale.
- Velocity can be gamed if management treats points as a productivity metric rather than a planning tool.
- New teams without a shared baseline will produce unreliable estimates for the first few sprints.
- Very large items (13 points or above) carry high uncertainty and should be broken down before estimation.
- The technique requires facilitation discipline; without it, sessions devolve into time-based thinking.

## Common Pitfalls

Teams new to relative estimation frequently make mistakes that undermine its value. Converting points back to hours defeats the purpose of the technique entirely. Comparing velocity across teams creates perverse incentives to inflate estimates. Allowing a single senior voice to dominate estimation sessions eliminates the diversity of perspective that makes the technique effective. Estimating tasks that are too large produces numbers that feel precise but carry enormous hidden variance. The remedy for each of these is the same: maintain the discipline of comparison over prediction, and treat velocity as a team-private planning input rather than a performance metric.

## Related

Teams using relative estimation should also explore story mapping for organizing estimated work into delivery slices, Monte Carlo simulation for probabilistic forecasting based on historical velocity data, cycle time analysis as a complementary flow metric, and capacity planning techniques that translate velocity into staffing and scheduling decisions. The concept of estimation itself connects to broader topics in Agile planning including sprint planning, backlog refinement, and continuous improvement through retrospectives.

## Summary

Relative estimation replaces the false precision of hour-based prediction with fast, comparative sizing that aligns with how humans naturally think about complexity. By anchoring tasks to a shared baseline and using techniques like Planning Poker or Affinity Estimating, teams surface hidden risks during planning rather than discovering them during execution. When combined with velocity tracking over multiple sprints, relative estimation delivers more accurate forecasting than absolute methods while requiring less time and producing less friction. The technique is not a silver bullet, but for teams operating under uncertainty, it consistently outperforms the alternative of guessing durations.

## References

- Cohn, M. (2005). *Agile Estimating and Planning*. Prentice Hall. The foundational text on story points, velocity, and Planning Poker in Agile contexts.
- Grenning, J. (2002). "Planning Poker or How to Avoid Analysis Paralysis while Release Planning." *Renaissance Software Consulting*. The original paper introducing the Planning Poker technique.
- Sutherland, J., & Schwaber, K. (2020). *The Scrum Guide*. scrumguides.org. The official Scrum framework reference covering sprint planning and estimation practices.
- Vacanti, D. (2015). *Actionable Agile Metrics for Predictability*. ActionableAgile Press. Covers flow metrics and probabilistic forecasting as complements to point-based estimation.
- VersionOne (now Digital.ai). *State of Agile Report*. Annual survey data on estimation practices, including adoption rates of story points and relative sizing across the industry.
