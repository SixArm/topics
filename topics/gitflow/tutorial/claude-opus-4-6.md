# Gitflow

Gitflow is a structured branching model for Git that provides a well-defined workflow for managing software releases, feature development, and production hotfixes. Originally introduced by Vincent Driessen in 2010, Gitflow became one of the most widely adopted branching strategies in the software industry, particularly among teams that ship versioned releases on a predictable schedule. It imposes a clear hierarchy of branches with explicit rules about how code flows between them, giving teams confidence that their main branch always reflects production-ready code while development proceeds in parallel.

## Core Concepts

Gitflow is built on the principle of separating concerns across distinct branch types. Rather than committing directly to a single mainline branch, developers work in isolated branches that serve specific purposes. This separation enforces discipline around code integration and release management, reducing the risk of unstable code reaching production.

The model distinguishes between long-lived branches, which persist for the lifetime of the project, and short-lived branches, which are created for a specific purpose and deleted once merged. This dual structure allows teams to maintain a stable release history while supporting continuous feature development.

## Long-Lived Branches

Gitflow uses two permanent branches that anchor the entire workflow.

- **main (or master)**: This branch always reflects the current production state. Every commit on main represents a released version of the software, typically tagged with a version number. Direct commits to main are prohibited; code arrives here only through merges from release or hotfix branches.

- **develop**: This branch serves as the integration branch for ongoing work. It contains the latest delivered development changes intended for the next release. Feature branches are created from and merged back into develop. At any given time, develop represents the most current state of the codebase that has passed initial integration but has not yet been released.

## Supporting Branch Types

Short-lived branches in Gitflow each serve a distinct role in the development and release lifecycle.

| Branch Type | Created From | Merges Into | Purpose | Naming Convention |
|---|---|---|---|---|
| Feature | develop | develop | New functionality or enhancements | feature/description |
| Release | develop | main and develop | Stabilize and prepare a release | release/version |
| Hotfix | main | main and develop | Urgent production fixes | hotfix/description |

### Feature Branches

Feature branches are where day-to-day development happens. A developer creates a feature branch from develop, implements the desired functionality, and merges it back into develop when complete. Feature branches should be focused on a single concern, whether that is a new capability, a refactoring effort, or a non-critical bug fix. They never interact directly with main. Feature branches may exist for hours or weeks, depending on the scope of the work, but long-lived feature branches increase the risk of merge conflicts and integration issues.

### Release Branches

When develop has accumulated enough features for a new release, a release branch is created. This branch marks the beginning of the release stabilization phase. During this phase, only bug fixes, documentation updates, and release-oriented tasks are permitted on the release branch. No new features are added. Once the release is ready, the release branch is merged into both main (where it is tagged with the version number) and back into develop (to ensure that any fixes made during stabilization are not lost). The release branch is then deleted.

### Hotfix Branches

Hotfix branches address critical issues discovered in production. Because they branch from main rather than develop, hotfixes can be prepared and deployed without waiting for the current development cycle to complete. Once the fix is verified, the hotfix branch is merged into both main (with an updated version tag) and develop, ensuring the fix propagates to future releases. If a release branch currently exists, the hotfix is merged into the release branch instead of develop.

## When to Use Gitflow

Gitflow is best suited for projects and organizations with specific characteristics.

- **Versioned releases**: Software that ships discrete versions to customers, such as desktop applications, mobile apps, embedded firmware, or on-premise enterprise deployments.
- **Scheduled release cycles**: Teams that follow a predictable cadence of releases, whether monthly, quarterly, or tied to contractual milestones.
- **Multiple supported versions**: Products that must maintain and patch older releases while developing new ones.
- **Regulated environments**: Industries such as healthcare, finance, or aerospace where traceability and auditability of changes are required.
- **Larger teams**: Organizations where multiple developers or squads work on features simultaneously and need clear integration boundaries.

## Gitflow Compared to Other Branching Models

| Criteria | Gitflow | GitHub Flow | Trunk-Based Development |
|---|---|---|---|
| Branch complexity | High (multiple branch types) | Low (feature branches only) | Minimal (short-lived branches) |
| Release model | Explicit release branches | Deploy from main on merge | Continuous deployment from trunk |
| Best suited for | Versioned, scheduled releases | Continuous delivery, SaaS | High-velocity CI/CD teams |
| Hotfix handling | Dedicated hotfix branches | Fix on main, deploy immediately | Fix on trunk, deploy immediately |
| Learning curve | Steeper | Gentle | Moderate |
| Merge frequency | Periodic, batched | Frequent, per feature | Very frequent, often daily |

GitHub Flow simplifies the process by treating main as always deployable and using only feature branches. Trunk-Based Development pushes this further, encouraging developers to integrate to a single trunk branch multiple times per day with the aid of feature flags. Gitflow trades this simplicity for the structure needed when continuous deployment is not feasible.

## Advantages and Disadvantages

**Advantages:**

- Provides a clear, predictable structure for managing releases and parallel development.
- Isolates in-progress work from production code, reducing the risk of accidental deployments.
- Supports maintaining multiple release versions simultaneously.
- Creates a clean, auditable history of releases through version tags on main.
- Well-supported by tooling, including the git-flow extension that automates branch creation and merging.

**Disadvantages:**

- Introduces significant branching and merging overhead, which can slow teams down.
- Long-lived feature branches can lead to painful merge conflicts and integration delays.
- The model can feel heavyweight for teams practicing continuous delivery or deploying frequently.
- Requires discipline and shared understanding across the team; misuse of branches can create confusion.
- The separation between main and develop can create drift, making merges more difficult over time.

## Best Practices

- Keep feature branches short-lived and focused. Merge into develop frequently to reduce integration risk.
- Use the git-flow command-line extension to automate branch creation, merging, and tagging, which reduces human error.
- Establish clear naming conventions for all branch types and enforce them through team agreements or automation.
- Perform code reviews on all merges into develop and main to maintain code quality.
- Tag every merge into main with a semantic version number to maintain a clear release history.
- Communicate actively during release and hotfix phases to ensure the team understands which branches are active and what work is permitted on each.
- Consider whether Gitflow is truly the right model for your team. If you deploy continuously and do not ship versioned releases, a simpler branching strategy may serve you better.

## Related

Teams exploring Gitflow should also study trunk-based development as a contrasting approach, GitHub Flow for simpler continuous delivery workflows, and semantic versioning for consistent release numbering. Understanding continuous integration and continuous delivery pipelines is essential, as the branching model must align with how code is built, tested, and deployed. Teams managing complex projects should also explore feature flags as an alternative to long-lived feature branches, and pull requests as a mechanism for code review within any branching strategy.

## Summary

Gitflow is a disciplined branching model that organizes software development around two permanent branches and three types of supporting branches. It provides explicit structure for feature development, release preparation, and production hotfixes, making it particularly well-suited for teams that ship versioned software on a scheduled basis. While its overhead makes it less appropriate for continuous deployment environments, Gitflow remains a valuable strategy for projects that require clear separation between development, stabilization, and production, and for organizations that need an auditable, traceable release process.

## References

- Driessen, V. (2010). "A successful Git branching model." https://nvie.com/posts/a-successful-git-branching-model/
- Driessen, V. (2020). "Note of reflection" (addendum to the original post recommending simpler models for continuous delivery). https://nvie.com/posts/a-successful-git-branching-model/
- Atlassian. "Gitflow Workflow." https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- Git-flow cheatsheet. https://danielkummer.github.io/git-flow-cheatsheet/
- Hammant, P. "Trunk-Based Development." https://trunkbaseddevelopment.com/
- GitHub. "GitHub Flow." https://docs.github.com/en/get-started/using-github/github-flow
