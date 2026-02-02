## Commit

In Git, a commit is a snapshot of changes to a project that has been saved to the repository. It is a fundamental concept in version control and serves as the building block of your project's history. Each commit represents a specific version of the codebase and includes a message that describes the changes made in that version.

## How Commits Work

When you create a commit, Git captures the current state of all staged changes and stores them permanently in the repository. Each commit contains several key elements:

- **Unique identifier (SHA-1 hash)**: A 40-character hexadecimal string that uniquely identifies the commit
- **Author information**: Name and email of the person who created the commit
- **Timestamp**: When the commit was created
- **Parent commit reference**: A pointer to the previous commit (or commits, in the case of a merge)
- **Commit message**: A description of what changes were made and why
- **Snapshot of changes**: The actual file modifications included in the commit

## Why Commits Matter

Commits create a complete record of changes made to the codebase over time. This provides several critical benefits:

- **History tracking**: Developers can trace the evolution of the codebase and understand when and why changes were made
- **Accountability**: Each commit is attributed to a specific author, creating a clear audit trail
- **Reversibility**: If a change introduces problems, developers can revert to previous versions
- **Collaboration**: Team members can see changes made by others and understand the reasoning behind those changes
- **Code review**: Commits serve as discrete units of work that can be reviewed, discussed, and approved

## Commit Message Best Practices

Writing effective commit messages is essential for maintaining a useful project history.

| Practice | Description |
|----------|-------------|
| Use imperative mood | Write "Add feature" not "Added feature" or "Adds feature" |
| Keep the subject line concise | Limit to 50 characters when possible |
| Separate subject from body | Use a blank line between the subject and detailed description |
| Explain the why, not the what | The code shows what changed; the message should explain the reasoning |
| Reference issues | Link to relevant tickets, bugs, or feature requests |
| Be specific | Avoid vague messages like "Fixed bug" or "Updated code" |

## Common Git Commands for Working with Commits

Git provides several essential commands for creating and inspecting commits:

- **git add**: Stage changes to be included in the next commit
- **git commit**: Create a new commit with the staged changes
- **git log**: Display a list of commits made to the repository
- **git diff**: Show changes made between commits, branches, or the working directory
- **git show**: Display detailed information about a specific commit
- **git revert**: Create a new commit that undoes changes from a previous commit
- **git cherry-pick**: Apply changes from a specific commit to the current branch

## Commit Strategies

Teams adopt different strategies for organizing commits:

| Strategy | Description | Best For |
|----------|-------------|----------|
| Atomic commits | Each commit contains one logical change | Projects prioritizing clean history and easy reverts |
| Feature commits | All changes for a feature in one commit | Small features or solo development |
| Squash and merge | Multiple commits combined into one before merging | Pull request workflows where detailed history is less important |
| Conventional commits | Standardized format with type prefixes (feat, fix, docs) | Automated changelogs and semantic versioning |

## The Commit Lifecycle

A typical commit workflow follows these stages:

1. **Modify files**: Make changes to your working directory
2. **Stage changes**: Select which modifications to include using git add
3. **Review staged changes**: Verify what will be committed using git diff --staged
4. **Create commit**: Save the snapshot with a descriptive message
5. **Push to remote**: Share your commits with the team repository

## Common Pitfalls to Avoid

- **Committing too much at once**: Large commits are difficult to review and harder to revert selectively
- **Committing too little**: Excessive micro-commits can clutter history without adding value
- **Poor commit messages**: Vague or missing messages make history useless for future developers
- **Committing sensitive data**: Passwords, API keys, and credentials should never be committed
- **Committing generated files**: Build artifacts, dependencies, and compiled code typically should be excluded via .gitignore
- **Breaking the build**: Each commit should leave the codebase in a working state

## Commits in Team Workflows

In collaborative environments, commits integrate with broader development practices:

- **Pull requests**: Commits are grouped into reviewable units before merging to main branches
- **Continuous integration**: Automated systems build and test each commit to catch problems early
- **Branching strategies**: Commits are organized across feature branches, release branches, and main branches
- **Code ownership**: Commit history helps identify who has expertise in different parts of the codebase

## Summary

Commits are the foundation of version control in Git. They capture snapshots of your project at specific points in time, enabling history tracking, collaboration, and the ability to recover from mistakes. Writing clear, focused commits with descriptive messages is a skill that pays dividends throughout a project's lifecycle. By following commit best practices, development teams maintain a clean, navigable history that serves as both documentation and a safety net.
