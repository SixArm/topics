# Definition of Story: Tutorial

## Overview

A story (or user story) is a concise, informal description of a software capability written from the perspective of an end user. It captures what a user wants to accomplish and why, without prescribing how the solution should be implemented technically. Stories are the primary unit of work in many agile frameworks.

## The Story Format

The standard format is:

**"I am a [type of user]. I want [some goal] so that [some reason]."**

Each component serves a purpose:

- **I am a [type of user]**: Identifies who benefits from this capability. Different users may have different needs for the same feature area.
- **I want [some goal]**: Describes the desired functionality or outcome in user terms, not technical terms.
- **So that [some reason]**: Explains the business value or benefit. This is the most important part—it answers "why does this matter?"

### Examples

- "I am a customer. I want to reset my password via email so that I can regain access to my account without contacting support."
- "I am a warehouse manager. I want to see real-time inventory levels so that I can reorder stock before it runs out."
- "I am a new user. I want a guided onboarding flow so that I can learn the product without reading documentation."

## What Makes a Good Story

### INVEST Criteria

Good stories follow the INVEST acronym:

- **Independent**: Can be developed and delivered without depending on other stories
- **Negotiable**: Details can be discussed and refined through conversation
- **Valuable**: Delivers clear benefit to a user or stakeholder
- **Estimable**: The team can reasonably estimate the effort required
- **Small**: Can be completed within a single sprint
- **Testable**: Clear criteria exist to verify whether the story is done

### Acceptance Criteria

Every story should include acceptance criteria—specific conditions that must be met for the story to be considered complete. Acceptance criteria:

- Define the boundaries of the story (what is in scope and what is not)
- Provide clear guidelines for both development and testing
- Are written before development begins
- Are agreed upon by the product owner and the development team

Example acceptance criteria for the password reset story:
- User receives a reset email within 60 seconds of requesting it
- Reset link expires after 24 hours
- User must create a password that meets the existing password policy
- User is redirected to the login page after successful reset

## Stories Are Conversation Starters

A story is intentionally brief. It is not a detailed specification—it is a placeholder for a conversation. The story card captures the essence of what is needed; the details emerge through dialogue between the product owner, developers, and other team members.

This is by design. Written specifications are prone to misinterpretation. Conversations allow for immediate clarification, follow-up questions, and shared understanding that documents cannot achieve.

## Common Mistakes

- **Too technical**: "As a developer, I want to refactor the database layer" is not a user story—it does not describe user value
- **Too large**: Stories that cannot be completed in a single sprint should be broken down into smaller stories
- **Missing the "so that"**: Without the reason, the team cannot evaluate the story's priority or make informed trade-offs
- **Too detailed**: Over-specifying implementation in the story constrains the team's ability to find the best solution
- **No acceptance criteria**: Without clear completion criteria, "done" becomes subjective

## Practical Steps

1. **Write stories from the user's perspective**: Focus on who benefits and why, not on technical implementation.
2. **Include acceptance criteria for every story**: Define what "done" looks like before starting work.
3. **Keep stories small**: If a story feels too big for one sprint, break it down. Look for natural boundaries like different user actions, different data types, or different scenarios.
4. **Refine stories collaboratively**: Use backlog refinement sessions to discuss stories, clarify details, and split large stories before sprint planning.
5. **Treat stories as living documents**: Stories evolve as understanding deepens. Update them based on conversations and new information.

## Key Takeaway

Stories keep development focused on user value. By describing what users need and why, rather than prescribing technical solutions, stories enable teams to build the right thing while maintaining flexibility in how they build it. The story format is simple by design—the richness comes from the conversations it generates.
