# Agile Principle 3 - Deliver Frequently: Tutorial

## Overview

"Deliver working software frequently, from a couple of weeks to a couple of months, with a preference to the shorter timescale."

This principle establishes that agile teams should produce working software on a regular, short cadence. The emphasis is on both frequency and the fact that what is delivered must be working—functional, tested, and valuable to end users.

## Why Frequent Delivery Matters

### Faster Feedback

The primary benefit of frequent delivery is faster feedback. When users interact with working software every two weeks rather than every six months, the team learns quickly whether they are building the right thing. Misunderstandings surface early, when they are inexpensive to correct.

### Reduced Risk

Large, infrequent releases carry substantial risk. If something goes wrong, the scope of the problem is large and the cause is difficult to isolate. Frequent, small releases contain less change, making problems easier to identify and fix.

### Maintained Momentum

Regular delivery creates a rhythm that keeps the team focused and stakeholders engaged. Each delivery is a milestone that provides a sense of accomplishment and visible evidence of progress.

### Earlier Value Delivery

Users do not have to wait months or years to benefit from new software. Each delivery puts usable functionality in their hands, generating value immediately rather than deferring all value to a distant future release.

## The Preference for Shorter Timescales

The principle explicitly states a preference for shorter delivery cycles. This is because:

- Shorter cycles produce more feedback opportunities per unit of time
- Shorter cycles force teams to break work into smaller, more manageable pieces
- Shorter cycles reduce the amount of work in progress, which reduces complexity and risk
- Shorter cycles make estimation more accurate because the scope being estimated is smaller

Many modern agile teams deliver on a weekly or even daily basis, well within the "couple of weeks" floor mentioned in the principle.

## What "Working Software" Means in This Context

Each delivery must be genuinely working software—not a prototype, not a mockup, not a partially completed feature. Specifically:

- The software runs in an environment representative of production
- It has been tested and verified against acceptance criteria
- It provides value that users can experience
- It does not break previously delivered functionality

This does not mean every delivery must be a full product release to all users. It can be a demo to stakeholders, a release to a staging environment, or a deployment to a subset of users. The key is that the software works.

## Practical Implementation

### Break Work into Small Increments

The most common barrier to frequent delivery is work items that are too large. Practice breaking features into the smallest possible increments that still deliver independent value. A feature that takes three months to build can usually be decomposed into a series of smaller deliverables.

### Invest in Automation

Frequent delivery is only sustainable with automation:

- **Automated testing**: Manual testing of every delivery is a bottleneck. Automated test suites enable confidence without delay.
- **Continuous integration**: Code is integrated and tested automatically with every change.
- **Deployment automation**: Releasing software should be a routine, low-risk activity, not a manual, error-prone event.

### Establish a Cadence

Choose a delivery cadence and stick to it:

- Start with what is achievable—biweekly or monthly
- Use each delivery cycle to identify bottlenecks and improve
- Gradually shorten the cadence as the team's practices and infrastructure mature

### Separate Deployment from Release

Deploying code to production and releasing a feature to users are different activities. Using feature flags, teams can deploy code frequently while controlling when features become visible to users. This enables continuous deployment without forcing incomplete features on users.

## Common Obstacles

- **Large, monolithic codebases** that are difficult to deploy incrementally
- **Manual testing processes** that cannot keep pace with frequent releases
- **Organizational approval processes** that add weeks of delay to each release
- **Lack of automated deployment** making releases risky and labor-intensive
- **Work items that are too large** to complete within a single iteration

Each of these obstacles is addressable through deliberate investment in practices and infrastructure.

## Key Takeaway

Frequent delivery of working software is the engine that powers agile. It generates feedback, reduces risk, delivers value early, and maintains team momentum. The shorter the delivery cycle, the more effectively the team can learn, adapt, and improve.
