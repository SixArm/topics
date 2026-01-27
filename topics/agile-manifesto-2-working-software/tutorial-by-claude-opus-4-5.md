# Agile Manifesto Value 2 - Working Software: Tutorial

## Overview

"Working software over comprehensive documentation" is the second value statement of the Agile Manifesto. It establishes that functional, tested software is the primary measure of progress and the most effective way to communicate with stakeholders. Documentation has value, but it should not take precedence over delivering working software.

## The Problem This Value Addresses

Traditional software development methodologies—particularly waterfall—often required extensive upfront documentation before any code was written. Requirements specifications, design documents, technical architecture documents, and test plans could consume months of effort. The problems with this approach include:

- **Documents become outdated quickly** as projects evolve and requirements change
- **Documentation creates an illusion of progress** without any actual working product
- **Misunderstandings persist** because written documents are subject to interpretation, while working software demonstrates behavior unambiguously
- **Resources are consumed** creating and maintaining documents instead of building the product

## What "Working Software" Means

Working software is software that:

- **Runs without errors** in its intended environment
- **Meets acceptance criteria** defined by the product owner or customer
- **Has been tested** to verify its behavior
- **Provides value to users** by solving a real problem or fulfilling a real need
- **Can be demonstrated** to stakeholders for feedback

A working increment does not need to be a complete product. Even a small feature, properly implemented and tested, qualifies as working software.

## Finding the Right Balance

This value does not advocate for zero documentation. It advocates for the right amount of documentation. Here is how to find that balance:

### Documentation That Adds Value

- **API documentation** that enables other teams or systems to integrate
- **Architecture decision records** that capture the reasoning behind significant technical decisions
- **Onboarding guides** that help new team members become productive
- **Regulatory or compliance documentation** required by law or industry standards

### Documentation That Often Does Not Add Value

- Detailed requirements specifications that duplicate information already captured in user stories and acceptance criteria
- Comprehensive design documents for features that will change significantly during development
- Status reports that could be replaced by a visible task board
- Process documentation that nobody reads or follows

### The "Just Enough" Principle

Write documentation that:

1. Cannot be replaced by working software itself
2. Will be read and used by someone
3. Will remain accurate long enough to justify the effort of creating it
4. Supports rather than replaces direct communication

## Modern Practices That Reduce Documentation Needs

- **Self-documenting code**: Clear naming, consistent structure, and readable code reduce the need for separate technical documentation.
- **Automated tests as specifications**: Well-written tests describe expected behavior more precisely than written specifications and verify themselves continuously.
- **Continuous integration and deployment**: Automated pipelines document the build, test, and deployment process through executable configuration.
- **Collaborative tools**: Wikis, shared boards, and living documents replace static specifications.

## Practical Steps for Implementation

1. **Define "done" to include working software**: Every sprint or iteration should produce a working, tested increment.
2. **Demo regularly**: Show working software to stakeholders at the end of every sprint. This is worth more than any status report.
3. **Audit your documentation**: Identify documents that nobody reads, that are always outdated, or that duplicate information available elsewhere. Consider eliminating them.
4. **Automate what you can**: Replace manual documentation with automated tests, generated API docs, and executable specifications.
5. **Write documentation last**: When documentation is needed, write it after the software is built and the understanding is solid, not before.

## Key Takeaway

Working software is the most honest and useful measure of project progress. It provides unambiguous evidence of what has been built, generates actionable feedback from stakeholders, and delivers real value to users. Documentation should support this goal, not replace it.
