# Trunk-based development (TBD)

Trunk-based development (TBD) is a source-control branching model in which all developers collaborate on a single branch, commonly called "trunk," "main," or "mainline." Rather than maintaining long-lived feature branches that diverge from the shared codebase over days or weeks, developers integrate small, incremental changes directly into the trunk multiple times per day. The practice is designed to minimize merge conflicts, accelerate feedback loops, and keep the codebase in a continuously releasable state. Trunk-based development is a foundational enabler of continuous integration and continuous delivery, and it is strongly correlated with high-performing engineering organizations as measured by the DORA (DevOps Research and Assessment) metrics.

## Core Principles

Trunk-based development rests on a small set of reinforcing principles that distinguish it from other branching strategies.

- **Single source of truth**: The trunk is the only long-lived branch. All production releases are cut from it, and all developers integrate into it.
- **Small, frequent commits**: Developers push changes that are narrowly scoped, typically representing a few hours of work at most. This keeps each integration low-risk and easy to review.
- **Short-lived feature branches**: When branches are used at all, they exist for no longer than one to two days before being merged back. Some teams skip branches entirely and commit directly to the trunk.
- **Always releasable**: The trunk must compile, pass automated tests, and be deployable at any point. Broken builds are treated as the highest-priority issue.
- **Feature flags over feature branches**: Incomplete functionality is hidden behind runtime toggles rather than isolated on a separate branch, allowing code to be integrated continuously without exposing unfinished work to users.

## How It Works in Practice

In a typical trunk-based workflow, a developer pulls the latest version of the trunk, makes a small change, runs local tests, and pushes the commit. A continuous integration server picks up the change, runs the full test suite, performs static analysis, and reports the result within minutes. If the build passes, the change is eligible for deployment. If it fails, the team swarms to fix it immediately.

When teams use short-lived branches, the workflow adds a pull request or merge request step. The branch is created, the change is made and reviewed, and the branch is merged and deleted, ideally within the same working day. The key constraint is that the branch never lives long enough to drift meaningfully from the trunk.

Feature flags play a critical role. A developer working on a multi-day feature wraps the new code path behind a toggle. The code ships to production in a dormant state, is activated for internal testers or a percentage of users, and is eventually rolled out fully or rolled back, all without branching.

## Trunk-Based Development vs. Other Branching Models

| Characteristic | Trunk-Based Development | Gitflow | GitHub Flow |
|---|---|---|---|
| Long-lived branches | No (trunk only) | Yes (develop, release, hotfix) | No (main only) |
| Feature branch lifespan | Hours to 1-2 days | Days to weeks | Days (varies) |
| Merge frequency | Multiple times per day | At release milestones | Per feature completion |
| Release mechanism | Continuous delivery from trunk | Dedicated release branches | Deploy from main after merge |
| Merge conflict frequency | Low | High | Moderate |
| Complexity | Low | High | Low to moderate |
| Best suited for | Teams practicing CI/CD at scale | Teams with rigid release schedules | Small to mid-size teams |

Gitflow introduces multiple long-lived branches (develop, release, hotfix) and ceremonial merges between them. This model suits organizations with fixed release windows but creates significant integration overhead. GitHub Flow simplifies this to a single main branch with feature branches, but does not prescribe the strict branch lifespan limits that trunk-based development demands.

## Benefits

- **Faster feedback and testing**: Because the codebase is always in a deployable state, automated pipelines can validate every commit within minutes. Developers learn about regressions immediately rather than discovering them during a painful integration phase weeks later.
- **Reduced merge conflicts**: Small, frequent integrations mean that any given commit has minimal surface area for conflict. The longer a branch lives, the more the trunk diverges from it; trunk-based development eliminates this drift by design.
- **Increased collaboration and knowledge sharing**: When everyone works on the same branch, developers naturally see each other's changes. Code reviews happen on small diffs, making them faster and more thorough.
- **Better code quality**: Continuous integration catches defects early. The discipline of keeping the trunk releasable forces teams to write tests, maintain clean builds, and address technical debt promptly.
- **Faster time to market**: Eliminating long integration cycles and branch management overhead means features reach users sooner. Teams that practice trunk-based development consistently report shorter lead times for changes.
- **Simplified release process**: Releasing becomes a matter of choosing a commit on the trunk rather than orchestrating merges across multiple branches. This reduces release risk and enables practices like continuous deployment.

## Challenges and Considerations

Trunk-based development is not without trade-offs, and teams should be aware of the organizational and technical prerequisites.

- **Requires strong test automation**: If the test suite is slow, unreliable, or incomplete, broken code will reach the trunk regularly, eroding confidence and slowing the team. Investment in fast, reliable CI pipelines is a prerequisite, not an afterthought.
- **Feature flag complexity**: Replacing long-lived branches with feature flags shifts complexity from the version control system into the application code. Flags must be managed, cleaned up after rollout, and tested in both on and off states. Without discipline, flag debt accumulates.
- **Cultural shift**: Teams accustomed to working in isolation on long-lived branches may resist the transparency and pace of trunk-based development. Adoption requires leadership support, coaching, and a willingness to change habits.
- **Multiple release versions**: Organizations that must maintain several supported versions simultaneously (such as on-premise software with per-customer deployments) face tension with the single-trunk model. Long-lived release branches may still be necessary in these scenarios, though the development workflow on trunk remains unchanged.
- **Demands senior-level discipline**: Committing directly to the trunk requires developers to self-verify their work rigorously. Teams with less experienced developers may benefit from the guardrails that mandatory code review on short-lived branches provides.

## Enabling Practices

Trunk-based development does not exist in isolation. It works best when supported by a constellation of complementary practices.

| Practice | Role in TBD |
|---|---|
| Continuous integration | Validates every commit automatically, ensuring the trunk stays green |
| Continuous delivery / deployment | Moves validated commits to production quickly and safely |
| Feature flags | Decouple deployment from release, allowing incomplete work to merge |
| Automated testing | Provides the safety net that makes frequent integration viable |
| Code review on small diffs | Keeps review cycles short and feedback actionable |
| Trunk health monitoring | Dashboards and alerts that surface broken builds immediately |
| Branch by abstraction | Technique for making large-scale changes incrementally on trunk |

Branch by abstraction deserves special mention. When a team needs to replace a major subsystem, they introduce an abstraction layer, build the new implementation behind it on the trunk, switch traffic gradually, and remove the old code, all without a long-lived branch.

## When to Use Trunk-Based Development

Trunk-based development is the recommended model for teams pursuing continuous delivery and high deployment frequency. It is particularly effective for web services, SaaS products, and mobile applications where a single deployable artifact is the norm. Organizations measured against DORA metrics (deployment frequency, lead time for changes, change failure rate, mean time to recovery) consistently find that trunk-based development correlates with elite performance.

It is less naturally suited to projects that require maintaining multiple concurrent release lines, embedded systems with long certification cycles, or open-source projects with a distributed, asynchronous contributor model. Even in these contexts, however, the principles of short-lived branches and frequent integration improve outcomes.

## Related

Teams exploring trunk-based development should also study continuous integration and continuous delivery as the pipeline practices that make it viable. Feature flags and feature toggles are essential companion techniques. Gitflow and GitHub Flow provide useful contrast for understanding alternative branching strategies. The DORA metrics framework offers empirical grounding for why trunk-based development matters. Related organizational topics include DevOps culture, pair programming, code review best practices, and release engineering.

## Summary

Trunk-based development is a branching strategy in which all developers integrate small, frequent changes into a single shared branch that is kept in a continuously releasable state. By eliminating long-lived branches, it reduces merge conflicts, accelerates feedback, and enables continuous delivery. The approach demands strong test automation, disciplined use of feature flags, and a culture that prioritizes collective ownership of the trunk's health. While it requires upfront investment in CI/CD infrastructure and a shift in team habits, trunk-based development is one of the most reliable predictors of high software delivery performance and is the foundation upon which modern continuous deployment pipelines are built.

## References

- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press. Provides the DORA research linking trunk-based development to elite engineering performance.
- Humble, J., & Farley, D. (2010). *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation*. Addison-Wesley. The foundational text on continuous delivery, with extensive discussion of branching strategies.
- Hammant, P. "Trunk Based Development." [https://trunkbaseddevelopment.com/](https://trunkbaseddevelopment.com/). A comprehensive community resource covering patterns, practices, and variations of trunk-based development.
- Hodgson, P. "Feature Toggles (aka Feature Flags)." Martin Fowler's blog. [https://martinfowler.com/articles/feature-toggles.html](https://martinfowler.com/articles/feature-toggles.html). Detailed taxonomy and guidance on feature flag usage in trunk-based workflows.
- DORA Team. "State of DevOps Reports." Google Cloud. [https://dora.dev/](https://dora.dev/). Annual research reports quantifying the impact of trunk-based development and related practices on organizational performance.
