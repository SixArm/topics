## Topic Branch

A topic branch is a Git branch created specifically to isolate work related to a single feature, bug fix, or task. Rather than making changes directly on the main branch, developers create dedicated branches that contain all commits associated with a particular piece of work. This isolation strategy forms the foundation of modern collaborative software development.

## Why Topic Branches Matter

Topic branches solve several fundamental problems in team-based development:

- **Parallel development**: Multiple developers can work simultaneously on different features without stepping on each other's changes
- **Safe experimentation**: Developers can try new approaches without risking the stability of the main codebase
- **Clear accountability**: Each branch has a defined purpose and owner, making it easy to track who changed what and why
- **Simplified code review**: Reviewers examine a focused set of changes rather than unrelated modifications mixed together
- **Easy rollback**: If a feature proves problematic, the entire branch can be discarded without affecting other work

## The Topic Branch Workflow

| Phase | Action | Purpose |
|-------|--------|---------|
| Create | Branch from main | Establish isolated workspace |
| Develop | Make commits | Build the feature incrementally |
| Review | Request feedback | Catch issues before merging |
| Merge | Integrate to main | Deliver the completed work |
| Cleanup | Delete the branch | Remove clutter from repository |

The workflow begins when a developer identifies a task requiring code changes. They create a new branch from the current main branch, giving it a descriptive name that indicates its purpose. All work happens on this branch through a series of commits.

Once development completes, the developer opens a pull request or merge request, inviting teammates to review the changes. After addressing feedback and receiving approval, the branch merges into main. Finally, the topic branch is deleted since its purpose has been fulfilled.

## Naming Conventions

Consistent branch naming improves team communication and tooling integration. Common patterns include:

- **feature/description**: For new functionality (feature/user-authentication)
- **bugfix/description**: For defect corrections (bugfix/login-timeout)
- **hotfix/description**: For urgent production fixes (hotfix/payment-crash)
- **refactor/description**: For code improvements (refactor/database-queries)

Many teams prefix branch names with ticket numbers from their issue tracker, such as PROJ-123-add-search-feature. This creates automatic links between code changes and project management tools.

## Topic Branches Versus Long-Running Branches

| Characteristic | Topic Branch | Long-Running Branch |
|----------------|--------------|---------------------|
| Lifespan | Days to weeks | Permanent |
| Purpose | Single task | Environment or version |
| Examples | feature/new-login | main, develop, release |
| Deletion | After merge | Never |

Long-running branches like main, develop, or release branches serve as integration points and deployment targets. Topic branches branch off from and merge back into these stable branches. The key distinction is permanence: topic branches exist temporarily to accomplish specific goals.

## Common Challenges

**Stale branches**: When topic branches live too long, they drift from main and become difficult to merge. Frequent rebasing or merging from main prevents this divergence.

**Scope creep**: A branch started for one purpose accumulates unrelated changes. Discipline in keeping branches focused on their original intent maintains clean history.

**Merge conflicts**: When multiple branches modify the same code, conflicts arise during integration. Smaller, shorter-lived branches reduce conflict frequency and complexity.

**Orphaned branches**: Abandoned branches clutter the repository. Regular cleanup of merged and stale branches keeps the repository manageable.

## Best Practices

- Keep branches short-lived, ideally merging within days rather than weeks
- Make atomic commits that each represent a single logical change
- Write descriptive commit messages explaining why changes were made
- Update from main regularly to minimize merge conflicts
- Delete branches immediately after merging
- Use pull requests to document decisions and gather feedback
- Limit each branch to one logical unit of work

## Integration with Development Practices

Topic branches enable and enhance several important practices:

**Continuous Integration**: Automated builds and tests run against each branch, catching problems before they reach main.

**Code Review**: Pull requests provide a natural checkpoint for quality control and knowledge sharing.

**Feature Flags**: Combined with feature flags, topic branches allow incomplete features to merge safely without exposing them to users.

**Release Management**: By isolating work, teams can choose which completed features to include in each release.

## When to Use Topic Branches

Topic branches are appropriate for virtually all development work in team environments. Even solo developers benefit from the discipline of isolating changes and maintaining a clean main branch.

The only situation where direct commits to main might be acceptable is for trivial documentation fixes or configuration changes in low-risk projects. For production codebases with multiple contributors, topic branches should be mandatory.
