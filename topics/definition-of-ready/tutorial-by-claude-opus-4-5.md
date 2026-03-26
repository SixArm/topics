# Definition of Ready: Tutorial

## Overview

The Definition of Ready (DoR) establishes clear criteria that a user story, feature, or work item must meet before a team begins development. It acts as a quality gate at the entry point of a sprint, ensuring that the team has everything it needs to start work without delays caused by unclear requirements, missing information, or unresolved dependencies.

## Why a Definition of Ready Matters

### Prevents Wasted Sprint Capacity

When a team pulls poorly defined work into a sprint, they spend development time clarifying requirements instead of building software. This reduces the team's effective capacity and often results in incomplete work at the end of the sprint.

### Reduces Rework

Work started without clear requirements is more likely to be built incorrectly, leading to rework. The cost of clarifying requirements before development is far less than the cost of rebuilding after development.

### Sets Shared Expectations

The DoR creates a shared agreement between the product owner and the development team about what constitutes sufficiently prepared work. This prevents disagreements during sprint planning about whether a story is ready to be worked on.

## Common Definition of Ready Criteria

A typical DoR includes some or all of the following:

### Story Quality
- The story is written in standard format with a clear user, goal, and reason
- Acceptance criteria are defined and agreed upon
- The story is small enough to be completed within a single sprint

### Clarity
- The team understands what needs to be built
- Questions and ambiguities have been discussed and resolved
- UI mockups or wireframes are available (if applicable)

### Dependencies
- External dependencies have been identified and resolved (or a plan exists)
- Required APIs, services, or data sources are available
- Necessary approvals or decisions have been obtained

### Estimation
- The team has estimated the effort required
- The estimate falls within the team's sprint capacity

### Technical Readiness
- Technical approach has been discussed (for complex items)
- Spike or research work has been completed (if needed)
- Test strategy has been identified

## Building Your Definition of Ready

### Step 1: Start with Common Problems

Review recent sprints and identify cases where work was blocked or delayed because it was not adequately prepared. These pain points form the basis of your DoR criteria.

### Step 2: Draft Criteria as a Team

The entire team—product owner, developers, testers—should participate in defining the DoR. Each role has different needs and perspectives on what "ready" means.

### Step 3: Keep It Lightweight

The DoR should prevent problems without creating bureaucracy. If meeting the DoR requires more effort than it saves, the criteria are too heavy.

### Step 4: Make It Visible

Post the DoR where the team can reference it during backlog refinement and sprint planning.

### Step 5: Review and Adjust

Revisit the DoR during retrospectives. Remove criteria that are not adding value and add criteria that address recurring problems.

## Balancing Thoroughness with Agility

An overly rigid DoR can become a bottleneck that slows delivery and contradicts agile principles. Balance is essential:

- **Not everything needs to be fully specified**: Some details can and should emerge during development
- **The DoR should enable speed, not prevent it**: If the DoR consistently prevents stories from entering sprints, the criteria may be too strict
- **Different types of work may need different readiness levels**: A bug fix may need less preparation than a new feature

## Common Anti-Patterns

- **Using the DoR as a weapon**: Refusing to accept any work that does not perfectly meet every criterion, even when the team has sufficient information to proceed
- **No DoR at all**: Accepting any work into a sprint regardless of preparation, leading to frequent blockers and rework
- **DoR that never changes**: A static DoR that does not evolve with the team's maturity and changing needs
- **Product owner exclusion**: Creating a DoR without product owner input, resulting in criteria that are impractical for how requirements are gathered

## Key Takeaway

The Definition of Ready ensures that development time is spent building software, not clarifying requirements. It protects the team's sprint capacity by establishing clear entry criteria for work items. Keep it lightweight, review it regularly, and treat it as a living agreement between the product owner and the development team.
