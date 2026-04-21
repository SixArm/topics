# Burndown chart

A burndown chart is an Agile project management tool that visually tracks remaining work against time, displaying a downward trend toward zero. It is one of the most widely used information radiators in Scrum and other iterative frameworks, giving teams and stakeholders an immediate, intuitive snapshot of whether delivery is on track. By plotting effort remaining on the vertical axis against elapsed time on the horizontal axis, the chart makes progress, delays, and scope changes visible at a glance. Understanding how to read and maintain a burndown chart is a foundational skill for any technology professional working in an Agile environment.

## How a burndown chart works

A burndown chart contains two primary elements plotted on the same set of axes. The horizontal axis represents time, typically measured in sprint days, and the vertical axis represents the total remaining effort, measured in story points, hours, or task counts. At the start of a sprint, the chart begins at the total planned effort and ideally trends downward to zero by the sprint's end.

The chart has two key lines. The ideal work remaining line is a straight diagonal drawn from the total planned effort at day zero down to zero at the last day of the sprint. This line represents a perfectly even pace of completion. The actual work remaining line tracks the real progress of the team day by day, reflecting completed work, encountered obstacles, and any newly added scope.

Reading the relationship between these two lines is straightforward. When the actual line runs below the ideal line, the team is ahead of schedule and may have capacity to pull in additional work. When the actual line runs above the ideal line, the team is falling behind and may need to reduce scope, remove impediments, or adjust capacity. Sudden upward spikes in the actual line indicate that new work has been added mid-sprint, making scope creep immediately visible to everyone.

## Key components

| Component | Description |
|---|---|
| Horizontal axis | Represents time, usually in sprint days or iteration days |
| Vertical axis | Represents remaining effort in story points, hours, or task count |
| Ideal line | Straight diagonal from total planned effort to zero, showing expected steady pace |
| Actual line | Jagged line tracking real daily progress, reflecting completed and added work |
| Starting point | The total committed effort at the beginning of the sprint |
| End point | Zero remaining effort, representing full completion of the sprint backlog |

## Benefits

Burndown charts provide several core benefits that make them a staple of Agile project management:

- **Early warning system.** The chart surfaces bottlenecks and delays early, giving the team time to course-correct before the sprint ends rather than discovering problems at the last moment.
- **Forecasting.** Teams can project likely completion dates based on the slope of the actual line and current velocity, enabling data-driven conversations about scope and deadlines.
- **Transparency.** The chart serves as an information radiator, offering stakeholders, product owners, and leadership a simple, at-a-glance view of progress without requiring a detailed status meeting.
- **Scope creep detection.** Upward spikes in the actual line make scope additions immediately visible, prompting the team to discuss trade-offs and reprioritize.
- **Team accountability.** Updating the chart daily creates a shared ritual that encourages the team to maintain awareness of its commitments and progress.

## Common patterns and what they indicate

| Pattern | What the actual line looks like | What it means |
|---|---|---|
| On track | Closely follows the ideal line | The team is completing work at the expected pace |
| Ahead of schedule | Falls below the ideal line | The team has capacity to pull in additional work |
| Behind schedule | Stays above the ideal line | Impediments, underestimation, or capacity issues are slowing delivery |
| Scope creep | Shows upward spikes mid-sprint | New work was added after sprint planning |
| Late finish | Flattens near the end, never reaches zero | Work was not completed; carryover is needed |
| Cliff drop | Stays flat then drops sharply at the end | Tasks are being closed in bulk rather than incrementally, suggesting the team is not updating the chart or breaking work into small enough pieces |

## Burndown chart versus burnup chart

A burndown chart and a burnup chart both track sprint or release progress, but they visualize it differently. The burndown chart shows remaining work trending toward zero, while the burnup chart shows completed work trending upward toward the total scope. The burnup chart has a distinct advantage when scope changes frequently because it plots a separate total scope line, making it easy to distinguish between progress stalling and scope growing. In practice, many teams use both: the burndown for sprint-level tracking where scope is fixed, and the burnup for release-level tracking where scope tends to evolve.

| Aspect | Burndown chart | Burnup chart |
|---|---|---|
| Direction | Tracks work remaining, trending downward | Tracks work completed, trending upward |
| Scope visibility | Scope changes appear as upward spikes, harder to separate from stalls | Scope changes appear as a separate line, easy to distinguish |
| Best suited for | Sprint-level tracking with fixed scope | Release-level tracking with evolving scope |
| Simplicity | Simpler to read at a glance | Slightly more complex but more informative |

## Best practices

- **Update daily.** The chart is only useful if it reflects current reality. Have the team update remaining effort at the end of each day or during the daily standup.
- **Keep task granularity consistent.** Tasks should be broken down to roughly the same size so that completion of each task produces a meaningful change on the chart. Very large tasks create flat lines followed by sudden drops.
- **Do not add work without discussion.** If the actual line spikes upward, it should trigger a conversation about trade-offs rather than being silently accepted.
- **Use story points over hours when possible.** Story points abstract away individual variation in speed and focus the chart on relative effort, which tends to produce more stable and comparable velocity data across sprints.
- **Pair with other metrics.** A burndown chart shows whether work is getting done but not whether it is the right work or whether quality is acceptable. Combine it with velocity trends, cumulative flow diagrams, and defect rates for a fuller picture.
- **Automate chart generation.** Most project management tools such as Jira, Azure DevOps, and Rally generate burndown charts automatically from task board updates, reducing manual effort and ensuring accuracy.

## Common pitfalls

- **Infrequent updates.** A chart updated only at the end of the sprint provides no early warning value. It becomes a post-mortem artifact rather than a steering tool.
- **Tracking time spent instead of work remaining.** The chart should show how much effort is left, not how many hours have been logged. Confusing these two measures defeats the purpose.
- **Using the chart as a performance evaluation tool.** If team members feel the chart is being used to judge them, they may game updates or avoid reporting impediments, destroying the trust that makes the chart effective.
- **Ignoring scope changes.** A chart that always trends smoothly downward despite mid-sprint additions is likely being manipulated or is not tracking scope accurately.

## Related

After understanding burndown charts, explore related topics to build a broader Agile measurement toolkit. Burnup charts provide an alternative visualization that better handles scope changes. Velocity tracking measures how much work a team completes per sprint over time, enabling longer-term forecasting. Cumulative flow diagrams show work-in-progress across workflow stages, highlighting bottlenecks and queue buildups. Sprint retrospectives create a structured forum for discussing what the burndown chart reveals. Story points and estimation techniques such as planning poker support the effort measurement that feeds into the chart. Scrum ceremonies, including sprint planning and sprint reviews, provide the context in which burndown charts are most commonly used.

## Summary

A burndown chart is a straightforward yet powerful visual tool that tracks remaining work against time in an Agile sprint or release. By comparing the actual progress line against the ideal completion line, teams can quickly identify whether they are on track, falling behind, or dealing with scope creep. The chart's value depends on disciplined daily updates, consistent task granularity, and a culture that treats the data as a navigation aid rather than a judgment mechanism. When combined with complementary metrics like velocity and cumulative flow, the burndown chart becomes a cornerstone of transparent, data-driven project management.

## References

- Schwaber, K. and Sutherland, J. "The Scrum Guide." Scrum.org, 2020. https://scrumguides.org/
- Cohn, M. "Agile Estimating and Planning." Prentice Hall, 2005.
- Rubin, K. S. "Essential Scrum: A Practical Guide to the Most Popular Agile Process." Addison-Wesley, 2012.
- Mountain Goat Software. "Burndown Charts." https://www.mountaingoatsoftware.com/agile/scrum/scrum-tools/sprint-burndown-chart
- Atlassian. "Burndown Chart." Agile Coach. https://www.atlassian.com/agile/scrum/burndown-chart
