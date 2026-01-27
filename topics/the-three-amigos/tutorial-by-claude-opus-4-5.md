# The Three Amigos for Agile Software: Tutorial

## Overview

The Three Amigos is a collaborative practice in agile software development that brings together three key perspectives -- business analysis, development, and testing -- to ensure comprehensive understanding of user stories and requirements before implementation begins. By combining these three viewpoints early in the feature lifecycle, teams reduce rework, catch misunderstandings before they become expensive to fix, and build shared ownership of quality.

This tutorial explains the Three Amigos practice, its benefits, and how to implement it effectively in agile teams.

## Key Concepts and Explanation

### The Three Perspectives

The Three Amigos practice is named for the three distinct perspectives that participate in collaborative sessions.

**The Business Analyst (or Product Owner)** represents the business perspective. This person focuses on what needs to be built and why -- what delivers value to customers and the business. They bring understanding of customer needs, business rules, and the strategic context for the feature.

**The Developer** brings the technical perspective. This person considers how the feature will be implemented, including potential technical constraints, architectural implications, dependencies on other systems, and opportunities for reuse or simplification.

**The Tester (or Quality Engineer)** contributes the quality assurance perspective. This person thinks about edge cases, potential failure scenarios, error handling, and how the feature will be validated. They ask "what could go wrong?" and "how will we know this works correctly?"

### How Three Amigos Sessions Work

During a Three Amigos session, the three participants examine user stories collaboratively. The typical flow involves the business analyst presenting the user story and its acceptance criteria, the team discussing the story to uncover ambiguities, assumptions, and gaps, the developer raising technical considerations, constraints, and design questions, the tester identifying edge cases, failure scenarios, and validation approaches, and the group refining acceptance criteria and creating concrete examples.

These conversations often naturally lead to defining concrete examples and acceptance tests. For instance, a user story about "user login" might generate examples like "successful login with valid credentials," "failed login with incorrect password," "account locked after five failed attempts," and "login with expired session token."

### Benefits of the Three Amigos

**Reduced rework:** By identifying misunderstandings and gaps before development starts, teams avoid the costly cycle of building the wrong thing and then rebuilding it.

**Fewer defects:** The tester's perspective catches edge cases and failure scenarios early, when they are cheapest to address.

**Improved communication:** Regular Three Amigos sessions build shared understanding and common language across roles. Over time, team members internalize each other's perspectives.

**Faster delivery:** Although Three Amigos sessions take time upfront, they save more time downstream by reducing rework, defects, and late-stage requirement changes.

**Shared ownership of quality:** When all three perspectives are involved in defining what "done" looks like, quality becomes a team responsibility rather than the tester's alone.

### Connection to Other Practices

The Three Amigos practice works particularly well with **Behavior-Driven Development (BDD)**, where conversations naturally produce "Given-When-Then" scenarios that serve as both specifications and automated tests. It also complements **Acceptance Test-Driven Development (ATDD)**, where acceptance tests are defined before implementation and guide the development process.

## Practical Steps for Implementation

### Step 1: Identify the Three Roles
Determine who will fill the three roles for your team. The business perspective is typically the product owner or business analyst. The technical perspective is a developer (often the one who will implement the feature). The quality perspective is a tester or QA engineer. In some teams, one person may cover multiple roles, but the practice works best when three distinct perspectives are represented.

### Step 2: Schedule Sessions Before Sprint Work Begins
Three Amigos sessions should happen before development starts on a user story -- typically during sprint planning or backlog refinement. Schedule 30-60 minutes per session. You can cover one user story in depth or several related stories in a single session.

### Step 3: Prepare the User Stories
The business analyst should prepare user stories with initial acceptance criteria before the session. These do not need to be perfect -- the session is where they get refined. Having a starting point gives the conversation structure and focus.

### Step 4: Run the Session

Follow this structure:

1. **Present:** The business analyst presents the user story, explaining the business context, user need, and initial acceptance criteria.
2. **Discuss:** Open the floor for questions. Encourage the developer and tester to challenge assumptions and explore implications.
3. **Explore examples:** Work through concrete scenarios. "What happens when...?" is a powerful question format. Document specific examples that illustrate expected behavior.
4. **Identify edge cases:** The tester leads exploration of boundary conditions, error states, and unusual inputs.
5. **Refine acceptance criteria:** Update the acceptance criteria based on the discussion. Ensure they are specific, testable, and agreed upon by all three participants.
6. **Document:** Capture the refined acceptance criteria, examples, and any open questions that need further investigation.

### Step 5: Convert Examples to Tests
After the session, convert the concrete examples discussed into automated acceptance tests (if practicing BDD or ATDD) or manual test cases. These tests serve as living documentation of the team's shared understanding.

### Step 6: Keep Sessions Focused and Time-Boxed
Three Amigos sessions should be focused and efficient. Set a time box (typically 30-60 minutes) and stick to it. If a story requires more discussion than the time box allows, it may be too large and should be split into smaller stories.

### Step 7: Adapt to Your Team's Context
The Three Amigos practice is a guideline, not a rigid rule. Some teams include additional perspectives (such as UX design or security). Some teams conduct sessions asynchronously using collaborative documents. Adapt the practice to your team's needs while preserving the core principle of bringing multiple perspectives together before development begins.

### Step 8: Retrospect on the Practice
Regularly evaluate whether Three Amigos sessions are delivering value. Track metrics like rework rates, defect counts, and story completion rates before and after adopting the practice. Adjust the frequency, format, and duration of sessions based on what the team learns.

## Key Takeaway

The Three Amigos practice is a simple but powerful technique for reducing waste in agile development. By bringing together business, development, and testing perspectives before implementation begins, teams build shared understanding, catch issues early, and deliver higher-quality software with less rework. The practice is lightweight, adaptable, and delivers value from the very first session. Change professionals should champion it as a low-cost, high-impact practice that improves both team communication and product quality.
