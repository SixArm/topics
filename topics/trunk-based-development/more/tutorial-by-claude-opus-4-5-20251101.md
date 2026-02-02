## Trunk-Based Development (TBD)

Trunk-based development is a version control strategy where all developers integrate their work into a single shared branch—the trunk (also called main or mainline)—frequently, typically at least once per day. This approach prioritizes continuous integration over long-lived feature branches and keeps the codebase perpetually deployable.

## Core Principles

**Single source of truth.** The trunk represents the authoritative state of the codebase. All production releases originate from this branch, eliminating ambiguity about which code is current.

**Short-lived branches.** When developers use branches, they exist for hours or days—not weeks or months. The goal is rapid integration, not isolated development.

**Always releasable.** The trunk must remain in a deployable state at all times. This constraint forces teams to write smaller, safer changes and maintain comprehensive automated testing.

**Continuous integration.** Developers merge their work frequently, catching integration conflicts early when they're small and easy to resolve.

## How It Works in Practice

Developers begin by pulling the latest trunk state. They create a short-lived branch for their work—typically lasting no more than one to two days. Changes remain small and focused on a single concern. Before merging, the developer ensures all tests pass and the code meets quality standards. A brief code review validates the change, then it merges directly to trunk.

Feature flags enable incomplete features to exist in trunk without affecting users. This technique allows work-in-progress to integrate continuously while remaining invisible in production until ready.

## TBD vs. GitFlow: A Comparison

| Aspect | Trunk-Based Development | GitFlow |
|--------|------------------------|---------|
| Primary branches | One (trunk/main) | Multiple (main, develop, release, hotfix) |
| Feature branch lifespan | Hours to days | Days to weeks |
| Merge frequency | Daily or more | At milestone completion |
| Release process | Deploy from trunk anytime | Dedicated release branches |
| Complexity | Low | High |
| Merge conflicts | Small, frequent, easy to resolve | Large, infrequent, difficult to resolve |
| Best suited for | Continuous deployment, web services | Versioned products, multiple supported versions |

## Benefits

- **Faster feedback loops.** Continuous integration surfaces problems within hours, not weeks. Developers fix issues while context remains fresh.

- **Reduced merge complexity.** Small, frequent merges generate minimal conflicts. When conflicts occur, they involve recent, well-understood code.

- **Improved collaboration.** Everyone works from the same baseline. Knowledge spreads naturally as developers see each other's changes daily.

- **Higher code quality.** The releasable-trunk constraint demands robust testing, code review discipline, and careful change management.

- **Accelerated delivery.** Teams can release at any time since trunk is always deployable. This enables rapid response to market needs and customer feedback.

- **Simplified mental model.** One branch to track eliminates the cognitive overhead of managing complex branching hierarchies.

## Challenges and Considerations

**Discipline requirements.** TBD demands rigorous practices: comprehensive automated tests, consistent code review, and developer commitment to small changes. Teams without this foundation struggle.

**Feature management complexity.** Long-running features require feature flags or branch-by-abstraction techniques. These approaches add architectural considerations but enable continuous integration of incomplete work.

**Multiple release versions.** Organizations supporting multiple deployed versions—common with on-premise software or mobile apps awaiting store approval—face complications. Long-lived release branches may become necessary, partially undermining TBD benefits.

**Build and test speed.** The trunk must stay green. Slow test suites create bottlenecks when many developers merge frequently. Investment in fast, reliable CI infrastructure becomes essential.

**Team coordination.** Large teams require communication protocols to avoid stepping on each other's changes. Some organizations implement merge queues or trunk gatekeepers.

## Prerequisites for Success

| Prerequisite | Why It Matters |
|--------------|----------------|
| Automated testing | Catches regressions before they reach trunk |
| Fast CI pipeline | Enables frequent merges without blocking developers |
| Feature flags | Allows incomplete features in trunk safely |
| Code review culture | Maintains quality while enabling rapid merges |
| Monitoring and rollback | Provides safety net for production deployments |
| Small batch mindset | Keeps changes reviewable and low-risk |

## When to Use Trunk-Based Development

**Ideal scenarios:**
- Web applications and services with continuous deployment
- Teams practicing DevOps and seeking rapid delivery
- Organizations prioritizing collaboration and knowledge sharing
- Environments with strong automated testing infrastructure

**Less suitable scenarios:**
- Products requiring multiple simultaneously supported versions
- Teams lacking automated testing maturity
- Highly regulated environments requiring formal release gates
- Distributed teams without overlapping working hours

## Feature Flags: The Enabling Technology

Feature flags (also called feature toggles) allow code to exist in trunk while remaining inactive for users. This pattern enables:

- **Progressive rollouts** to subsets of users
- **A/B testing** of different implementations
- **Kill switches** for rapid problem mitigation
- **Trunk integration** of multi-sprint features

Teams adopting TBD typically invest in feature flag infrastructure—whether commercial tools or internal systems—to manage incomplete work safely.

## Transitioning from Long-Lived Branches

Organizations moving from GitFlow or similar approaches should expect an adjustment period. Key transition steps include:

1. Establish comprehensive test coverage for critical paths
2. Implement feature flag infrastructure
3. Shorten branch lifespans incrementally
4. Build code review capacity for increased merge frequency
5. Invest in CI speed and reliability
6. Train developers on small-batch thinking

## Summary

Trunk-based development optimizes for continuous integration, rapid feedback, and delivery speed. It trades the perceived safety of isolated branches for the real benefits of constant integration: smaller conflicts, fresher context, and perpetual releasability. Success requires disciplined practices, robust automation, and organizational commitment to working in small increments. For teams building continuously deployed services, TBD represents the natural alignment of development workflow with delivery goals.
