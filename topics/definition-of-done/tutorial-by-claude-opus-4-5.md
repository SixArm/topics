# Definition of Done: Tutorial

## Overview

The Definition of Done (DoD) is a shared agreement within an agile team that specifies the criteria a work item must meet before it can be considered truly complete. It serves as a quality standard that ensures consistency, prevents incomplete work from being marked as finished, and maintains the technical health of the product.

## Why a Definition of Done Matters

### Eliminates Ambiguity

Without a DoD, "done" means different things to different people. A developer might consider a feature done when the code is written. A tester might require all tests to pass. A product owner might expect it to be deployed. The DoD eliminates this ambiguity by defining a single, shared standard.

### Maintains Quality

The DoD encodes quality standards that must be met for every piece of work. This prevents quality from being sacrificed under time pressure, because work that does not meet the DoD is simply not done.

### Prevents Technical Debt

By requiring standards like code review, automated testing, and documentation updates, the DoD prevents the accumulation of shortcuts that create technical debt.

### Enables Transparency

Stakeholders can clearly understand what "done" means for the project. When the team says a story is done, everyone knows exactly what that entails.

## Common Definition of Done Criteria

### Code
- Code is written and follows team coding standards
- Code is peer-reviewed and approved
- Code is merged into the main branch

### Testing
- Unit tests are written and pass
- Integration tests pass
- Acceptance criteria are verified
- No known critical or high-severity defects remain

### Integration
- The feature is integrated with the rest of the system
- The feature works in the staging or test environment
- Regression tests pass

### Documentation
- Relevant documentation is updated (API docs, user guides, release notes)
- Code is self-documenting with clear naming and structure

### Deployment
- The feature is deployable to production
- Deployment scripts or pipelines are updated if needed
- Rollback plan exists

## Building Your Definition of Done

### Step 1: Assess Current State

Before defining the DoD, understand your team's current capabilities. If the team does not have automated testing infrastructure, requiring 90% test coverage immediately is unrealistic.

### Step 2: Define Collaboratively

The entire team should contribute to the DoD. Developers, testers, product owners, and DevOps engineers all have perspectives on what "done" should include.

### Step 3: Start Achievable, Then Raise the Bar

Begin with a DoD that the team can consistently meet. As practices and infrastructure mature, add more rigorous criteria. A DoD that the team routinely bypasses is worse than no DoD at all.

### Step 4: Make It Visible and Active

The DoD should be referenced during sprint planning (to inform estimates), during development (to guide work), and during sprint reviews (to verify completeness). Post it prominently.

### Step 5: Review Regularly

Revisit the DoD during retrospectives. Ask whether each criterion is adding value and whether new criteria should be added based on recent quality issues.

## Multiple Levels of Done

Some teams define different levels of DoD:

- **Story-level DoD**: Criteria for individual user stories (code complete, tested, reviewed)
- **Sprint-level DoD**: Additional criteria for the sprint increment (integration tested, demo-ready)
- **Release-level DoD**: Additional criteria for production release (performance tested, security reviewed, documentation complete)

Each level builds on the previous one, with the release-level DoD being the most comprehensive.

## Common Anti-Patterns

- **Bypassing the DoD under pressure**: When deadlines loom, teams are tempted to declare work "done" without meeting all criteria. This creates hidden debt.
- **DoD that is too aspirational**: A DoD that the team cannot consistently meet loses credibility and is eventually ignored.
- **No enforcement mechanism**: The DoD must be actively applied during sprint reviews. Stories that do not meet the DoD are not accepted.
- **Unchanging DoD**: A DoD that never evolves becomes outdated as the team and technology mature.

## Key Takeaway

The Definition of Done is a team's quality contract with itself and its stakeholders. It ensures that "done" means the same thing to everyone and that completed work meets agreed-upon standards. Treat it as a living document that evolves with the team, enforce it consistently, and never compromise it under pressure.
