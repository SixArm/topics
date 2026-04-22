# The Law of Unintended Consequences

Whenever you change a complex system, expect surprise.

Takeaways
No matter how well you plan, any significant change in a complex system can produce results you cannot anticipate.
Consequences can be unexpected benefits (happy surprises), unexpected drawbacks (side effects that hinder), or perverse results (the action makes the original problem worse).
In software engineering, this often manifests as a fix or new feature introducing bugs or performance issues elsewhere.
Overview
The Law of Unintended Consequences states that outcomes are not entirely predictable. Systems have complex interdependencies and human factors that can cause surprises.

Adding a new feature might unexpectedly degrade performance due to its interaction with an unrelated module. Simplifying a UI could lead to heavier backend load because users use the feature more often than expected.

It reminds engineers that systems are complex and our mental models are incomplete. When implementing changes, anticipate that “unknown unknowns” will crop up.

Examples
Enabling a new logging feature to help with debugging might fill the disk and crash the system, a perverse result relative to the goal of stability.

A social network changes its algorithm to boost user engagement, but as an unintended consequence, it amplifies outrage or misinformation. A bug fix in one part of the code unexpectedly causes a regression in another module that depended on the original bug behavior (overlap with Hyrum’s Law).

Origins
Sociologist Robert K. Merton popularized the term in the 20th century, though the concept dates back further. In a computing context, it’s more of a borrowed concept than a specific person’s law.

Merton identified five sources of unanticipated consequences: ignorance, error, immediate interest, basic values, and self-defeating prophecy.
