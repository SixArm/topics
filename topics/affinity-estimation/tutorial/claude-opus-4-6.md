# Affinity Estimation (a.k.a. Silent Grouping)

Affinity Estimation, often called Silent Grouping, is a fast relative sizing technique used by agile teams to estimate large backlogs in under an hour. Unlike Planning Poker, which focuses on deep discussion of individual items, Affinity Estimation relies on visual comparison and team intuition to process fifty or more items rapidly. It is particularly valuable during roadmap planning, portfolio prioritization, and early-stage project scoping where precision matters less than speed and shared understanding.

## How It Works

The process unfolds in three distinct phases, each designed to minimize groupthink and maximize throughput.

**Phase 1: Silent Relative Sizing.** The team creates a horizontal scale on a wall or digital board with "Smaller" on the left and "Larger" on the right. Team members take user story cards and place them on the scale relative to others without speaking. If someone disagrees with a placement, they simply move the card. Any card that moves back and forth more than twice is set aside for discussion.

**Phase 2: Group Review.** Once all items are placed, the silence ends and the team reviews the distribution together. The Product Owner answers questions about contested stories, and the team adjusts placements based on brief technical discussions. This phase is intentionally short—typically ten to fifteen minutes—because the silent phase has already surfaced most disagreements through card movement.

**Phase 3: Bucket Assignment.** The group superimposes size categories onto the horizontal scale, using T-shirt sizes (XS, S, M, L, XL) or Fibonacci numbers (1, 2, 3, 5, 8, 13) as buckets. Any story falling within a bucket's boundary takes that estimate.

## When to Use Affinity Estimation

- New projects with fifty or more unestimated backlog items
- Quarterly or release planning sessions where rough sizing informs prioritization
- Portfolio-level estimation across multiple teams or products
- Situations where the team has limited domain knowledge and needs to calibrate relative complexity quickly
- Re-estimation after major scope changes or team composition shifts

## Comparison with Other Estimation Techniques

| Technique | Best For | Items Per Hour | Discussion Depth | Team Size |
|-----------|----------|----------------|------------------|-----------|
| Affinity Estimation | Large backlogs, roadmap planning | 50–200 | Low to moderate | 4–10 |
| Planning Poker | Sprint planning, detailed analysis | 5–15 | High | 3–8 |
| T-Shirt Sizing | Quick prioritization workshops | 30–80 | Low | Any |
| Dot Voting | Feature prioritization, not sizing | 20–50 | Minimal | Any |
| Three-Point Estimation | Risk-sensitive schedules | 3–8 | Very high | 1–3 |

## Benefits

- **Speed**: A team of six can estimate over one hundred stories in forty-five minutes, compared to hours with Planning Poker.
- **Reduced anchoring bias**: The silent phase prevents a single vocal team member from influencing estimates before others form their own opinion.
- **Surfacing disagreement**: Cards that oscillate between positions reveal hidden complexity or unclear requirements without requiring explicit conflict.
- **Inclusive participation**: Introverted team members contribute equally during the silent phase, producing more representative estimates.
- **Calibration effect**: Seeing all stories simultaneously helps the team develop a shared mental model of relative complexity.

## Common Pitfalls and Mitigations

| Pitfall | Symptom | Mitigation |
|---------|---------|------------|
| Treating estimates as commitments | Stakeholders hold teams to affinity estimates during delivery | Label outputs explicitly as rough sizing for planning purposes only |
| Skipping the silent phase | Dominant voices drive placement from the start | Enforce a timer; no talking until the facilitator signals |
| Too many buckets | Team spends excessive time debating boundary cases | Use five to seven buckets maximum for initial estimation |
| Ignoring contested cards | Unresolved items carry hidden risk into sprint planning | Track contested cards and schedule follow-up refinement |
| Remote anti-patterns | Digital tools lack the physicality that makes silent sorting intuitive | Use dedicated tools like Miro or FigJam with timer constraints |

## Facilitating a Session

1. Prepare the backlog items on individual cards or sticky notes, each with a short title and acceptance criteria summary.
2. Brief the team on the scale orientation and the rules of silent placement.
3. Set a timer for the silent phase—typically fifteen to twenty minutes for one hundred items.
4. Observe card oscillation and pull contested items to a separate area.
5. Announce the end of silence and facilitate a brief review, limiting discussion to contested items and outliers.
6. Overlay bucket boundaries and record the resulting estimates.
7. Photograph or export the board as the artifact for release planning.

## Scaling for Distributed Teams

Remote teams can replicate affinity estimation using collaborative whiteboard tools. The key adaptations are:

- Use a shared digital canvas with clearly marked zones for the scale
- Enforce the silent phase via muted microphones and a visible countdown timer
- Assign each participant a distinct card color to track contribution balance
- Use the tool's voting or reaction features to flag contested items rather than relying on physical card movement
- Record a short video of the final board state for asynchronous stakeholders

## Related

Teams using Affinity Estimation should also explore relative estimation broadly, including Planning Poker for detailed sprint-level sizing, T-shirt sizing for lightweight prioritization, and story mapping for understanding how estimated items relate to user journeys. Concepts such as cone of uncertainty, velocity forecasting, and Monte Carlo simulation provide complementary approaches to turning rough estimates into delivery projections.

## Summary

Affinity Estimation is a high-throughput, low-ceremony technique that leverages silent collaboration and visual comparison to size large backlogs rapidly. It fills a critical gap between detailed per-item estimation methods and pure gut-feel prioritization, giving teams a defensible basis for release planning without consuming days of effort. Used at the right altitude—roadmap and quarterly planning rather than sprint commitment—it accelerates decision-making while preserving team alignment on relative complexity.

## References

- Loeffler, M. (2017). *Improving Agile Retrospectives: Helping Teams Become More Efficient*. Addison-Wesley Professional.
- Cohn, M. (2005). *Agile Estimating and Planning*. Prentice Hall. Chapters on relative sizing and estimation techniques.
- Rubin, K. S. (2012). *Essential Scrum: A Practical Guide to the Most Popular Agile Process*. Addison-Wesley. Discussion of affinity estimation in backlog refinement.
- Stellman, A. & Greene, J. (2014). *Learning Agile: Understanding Scrum, XP, Lean, and Kanban*. O'Reilly Media.
- Mountain Goat Software. "Affinity Estimating: A How-To." https://www.mountaingoatsoftware.com/blog/affinity-estimating-a-how-to
