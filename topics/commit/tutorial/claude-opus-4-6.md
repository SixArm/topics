# Commit

A commit is a foundational operation in version control systems, most prominently in Git, that captures a snapshot of a project's state at a specific point in time. When a developer makes a commit, they record a set of changes to the repository along with metadata describing what changed and why. Commits form the backbone of collaborative software development, enabling teams to track the evolution of a codebase, coordinate parallel workstreams, and maintain a reliable history of every modification. Understanding commits deeply, from their internal structure to the workflows they support, is essential for any technology professional working with modern source control.

## How a Commit Works

A commit in Git is not simply a diff or a delta. It is a complete snapshot of the project's tracked files at the moment the commit is created. Git uses a content-addressable storage model in which each commit object contains a pointer to a tree object (representing the directory structure), a pointer to its parent commit or commits, author and committer metadata with timestamps, and a commit message. Git generates a SHA-1 hash from this content, producing a unique 40-character identifier for each commit. Because the hash depends on all of these inputs, including the parent hash, every commit is cryptographically linked to the entire history that preceded it, forming a tamper-evident chain.

The staging area, also called the index, plays a critical role in the commit workflow. Developers use `git add` to selectively stage changes before running `git commit`. This two-step process gives precise control over what enters each commit, allowing a developer to group related changes together even when multiple files have been modified simultaneously.

## Anatomy of a Commit Object

Every commit object in Git contains a well-defined set of fields. Understanding these fields clarifies how Git tracks history and enables operations like merging, rebasing, and bisecting.

| Field | Description |
|---|---|
| Tree | A reference to the tree object representing the project's file and directory structure at the time of the commit |
| Parent(s) | One or more references to the preceding commit(s); a merge commit has multiple parents, while an initial commit has none |
| Author | The person who originally wrote the changes, along with a timestamp |
| Committer | The person who applied the commit to the repository, along with a timestamp; may differ from the author when patches are applied on behalf of someone else |
| Message | A human-readable description of the changes and the reasoning behind them |
| SHA-1 Hash | A unique identifier computed from all of the above fields, ensuring integrity and immutability |

## Writing Effective Commit Messages

The commit message is the primary means by which developers communicate intent to their present and future collaborators. Poorly written messages create friction during code review, debugging, and onboarding. Well-crafted messages accelerate all of these activities.

A widely adopted convention structures the commit message into two parts: a subject line and an optional body. The subject line should be no longer than 50 to 72 characters, written in the imperative mood (for example, "Fix null pointer exception in user service" rather than "Fixed null pointer exception"), and should not end with a period. The body, separated from the subject by a blank line, provides additional context such as the motivation for the change, the approach taken, trade-offs considered, and references to related issue tracker tickets.

**Characteristics of strong commit messages:**

- Describe the "why" more than the "what," since the diff already shows what changed
- Reference issue or ticket identifiers so that the commit can be traced back to a specific requirement or bug report
- Keep the scope narrow, covering a single logical change per commit
- Avoid vague language such as "misc fixes" or "updates"
- Use a consistent format agreed upon by the team, whether that is Conventional Commits, a project-specific template, or another standard

## Commit Strategies and Workflows

How and when developers create commits varies across teams and projects. The choice of commit strategy affects code review efficiency, history readability, and the ease of operations like bisecting and reverting.

| Strategy | Description | Best Suited For |
|---|---|---|
| Atomic commits | Each commit contains exactly one logical change and can be understood, reviewed, and reverted independently | Teams that prioritize a clean, navigable history |
| Squash on merge | Multiple work-in-progress commits on a feature branch are compressed into a single commit when merged to the main branch | Teams that want a simplified mainline history without losing granularity during development |
| Conventional Commits | A structured format for commit messages (e.g., `feat:`, `fix:`, `chore:`) that enables automated changelog generation and semantic versioning | Projects with automated release pipelines |
| Signed commits | Commits are cryptographically signed with GPG or SSH keys to verify author identity | Security-sensitive projects and open-source repositories that require provenance verification |

## Commit Operations

Git provides a rich set of commands for creating, inspecting, and manipulating commits. The most commonly used operations include:

- **Creating a commit:** `git commit` records the staged changes as a new commit. The `-m` flag allows an inline message; omitting it opens an editor for composing a longer message.
- **Amending a commit:** `git commit --amend` replaces the most recent commit with a new one, useful for correcting a message or adding a forgotten file before the commit has been shared.
- **Viewing history:** `git log` displays the commit history. Flags such as `--oneline`, `--graph`, and `--stat` control the level of detail.
- **Comparing commits:** `git diff` shows the differences between commits, between a commit and the working directory, or between a commit and the staging area.
- **Reverting a commit:** `git revert` creates a new commit that undoes the changes introduced by a specified commit, preserving history.
- **Cherry-picking a commit:** `git cherry-pick` applies the changes from a specific commit onto the current branch, enabling selective integration of changes across branches.
- **Bisecting:** `git bisect` performs a binary search through commit history to identify the commit that introduced a bug.

## Common Pitfalls

Even experienced developers encounter recurring problems with commits. Awareness of these pitfalls helps teams maintain a healthy repository.

- **Overly large commits** that bundle unrelated changes make code review difficult and complicate future debugging, since reverting one change means reverting everything in the commit.
- **Committing sensitive data** such as API keys, passwords, or private certificates into the repository creates a security risk that persists in history even after the file is removed, unless history is rewritten.
- **Unclear or missing commit messages** degrade the usefulness of the project history and slow down anyone trying to understand past decisions.
- **Force-pushing shared branches** rewrites public history, causing conflicts and lost work for collaborators who have based their work on the overwritten commits.
- **Committing generated or build artifacts** inflates repository size and introduces noise into the history; these files belong in `.gitignore`.

## Related

Technology professionals studying commits should also explore branching and merging strategies, pull requests and code review workflows, rebasing versus merging, Git hooks for enforcing commit policies, continuous integration pipelines triggered by commits, semantic versioning and automated release management, and repository hosting platforms such as GitHub, GitLab, and Bitbucket that build collaboration features around the commit model.

## Summary

A commit is the atomic unit of change in Git, capturing a snapshot of the project along with metadata that identifies who made the change, when, and why. Commits form an immutable, hash-linked chain that provides a complete audit trail of a project's evolution. Writing clear, focused commit messages and adopting a deliberate commit strategy are practices that pay dividends across code review, debugging, onboarding, and release management. Mastering commits and their associated operations is a prerequisite for effective collaboration in any modern software development environment.

## References

- Chacon, S. & Straub, B. (2014). *Pro Git* (2nd ed.). Apress. Available at [https://git-scm.com/book](https://git-scm.com/book)
- Git documentation: git-commit. [https://git-scm.com/docs/git-commit](https://git-scm.com/docs/git-commit)
- Git documentation: git-log. [https://git-scm.com/docs/git-log](https://git-scm.com/docs/git-log)
- Conventional Commits specification. [https://www.conventionalcommits.org](https://www.conventionalcommits.org)
- Torvalds, L. & Hamano, J. Git source code and design documentation. [https://github.com/git/git](https://github.com/git/git)
- Beams, C. "How to Write a Git Commit Message." [https://cbea.ms/git-commit/](https://cbea.ms/git-commit/)
