## One Person's Constant Is Another Person's Variable

This classic programming maxim captures a fundamental truth about software development: what seems fixed and immutable to one developer often represents a point of flexibility and change to another. Understanding this principle helps technology professionals write more adaptable code, collaborate more effectively, and anticipate where systems need configurability.

## The Core Insight

At its heart, this saying exposes the subjective nature of software design decisions. Every "hardcoded" value represents a choice—sometimes deliberate, sometimes unconscious—about what should remain stable versus what might need to change. These choices reflect assumptions about requirements, deployment environments, user needs, and future evolution that may not hold true across different contexts.

The quote originated from Alan Perlis, a pioneering computer scientist and the first recipient of the Turing Award. It appears in his famous collection "Epigrams on Programming" published in 1982, which contains 130 pithy observations about software development that remain relevant decades later.

## Constants Versus Variables

| Aspect | Constant Perspective | Variable Perspective |
|--------|---------------------|---------------------|
| Tax rate | Fixed at current law | Changes with legislation |
| API endpoint | Stable production URL | Different per environment |
| Timeout duration | Reasonable default | Needs tuning per load |
| Currency symbol | Always "$" | Varies by locale |
| Maximum users | Fixed license limit | Scales with subscription tier |
| Color scheme | Brand standard | User preference |

## Where This Tension Appears

### Configuration Management

What developers embed directly in code versus externalize to configuration files reflects their assumptions about change frequency:

- Database connection strings seem constant until you need multiple environments
- Feature flags seem like overkill until you need gradual rollouts
- Logging levels seem fixed until production debugging requires adjustment
- Retry counts seem obvious until network conditions vary

### Domain Modeling

Business rules that appear immutable often prove more flexible than anticipated:

- "Orders must have at least one item" until zero-dollar adjustments are needed
- "Users have one email address" until work/personal separation matters
- "Prices are in dollars" until international expansion begins
- "Reports run monthly" until weekly or daily cadences emerge

### System Architecture

Architectural decisions encode assumptions about stability:

- Single-region deployment until disaster recovery requirements surface
- Synchronous processing until scale demands asynchronous patterns
- Relational database until document storage proves more natural
- Monolithic structure until team scaling requires service boundaries

## Practical Implications

### For Individual Contributors

- **Question your assumptions**: When you define something as a constant, ask whether future requirements might challenge that assumption
- **Document the "why"**: Explain the reasoning behind constant values so others understand the context
- **Prefer configuration over hardcoding**: Even values that seem permanent benefit from easy modification
- **Use meaningful names**: Whether constant or variable, the name should convey intent and constraints

### For Tech Leads and Architects

- **Identify likely change vectors**: Experience helps predict which "constants" will face pressure to change
- **Build appropriate abstractions**: Create seams in the system where variation can be introduced without restructuring
- **Balance flexibility with complexity**: Not everything needs to be configurable—over-engineering creates its own problems
- **Establish conventions**: Team standards about what gets externalized versus embedded reduce friction

### For Code Reviewers

- **Spot hidden assumptions**: Look for magic numbers and hardcoded strings that embed unstated beliefs
- **Consider deployment contexts**: Will this code run in environments the author didn't anticipate?
- **Evaluate configurability needs**: Is the current level of flexibility appropriate for expected use cases?
- **Check documentation**: Are the assumptions behind constant values explained?

## Common Manifestations

### The Magic Number Problem

Numeric literals scattered through code represent the most obvious form of this issue. The number 86400 (seconds in a day) seems constant until leap seconds matter. The limit of 100 items per page seems reasonable until mobile users need different pagination.

### The Environment Assumption

Code written assuming a single deployment environment inevitably encounters staging, testing, development, and production variants. URLs, credentials, feature toggles, and resource limits all vary across these contexts.

### The Locale Trap

Date formats, number separators, text direction, currency symbols, and measurement units all seem constant when development happens in a single locale. International deployment reveals these as variables requiring thoughtful handling.

### The Scale Surprise

Batch sizes, connection pool limits, cache durations, and queue depths all perform well at development scale. Production load exposes these as variables requiring tuning rather than constants safely ignored.

## Strategies for Balance

| Strategy | When to Use | Trade-offs |
|----------|-------------|------------|
| Environment variables | Deployment-specific values | Requires deployment tooling |
| Configuration files | Complex or structured settings | Adds file management overhead |
| Feature flags | Gradual rollouts, A/B testing | Increases conditional complexity |
| Database-driven config | Runtime-changeable settings | Adds latency and failure modes |
| Hardcoded values | Truly universal constants | Requires code changes to modify |

## The Deeper Lesson

Beyond the practical advice about configuration and flexibility, this aphorism teaches a more profound lesson about humility in software development. Every design decision embeds assumptions about the future. Some assumptions prove correct; others require revision. The skill lies not in perfectly predicting the future but in:

- Recognizing which assumptions carry more risk
- Building systems that can accommodate reasonable changes
- Communicating assumptions clearly to future maintainers
- Accepting that some constants will need to become variables

## Conclusion

"One person's constant is another person's variable" reminds us that software development is fundamentally about managing change and uncertainty. The values we treat as fixed reflect our current understanding and requirements—an understanding that will inevitably evolve. By approaching our design decisions with this awareness, we create systems that serve not just current needs but adapt gracefully to future demands.

The goal is not to make everything configurable—that path leads to complexity and confusion. Rather, the goal is to make thoughtful choices about what truly deserves to be constant, to document those choices clearly, and to build systems where reasonable evolution remains possible without heroic restructuring.
