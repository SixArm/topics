# How to name functions

Naming functions well is one of the most impactful habits a developer can cultivate. A function name is the first piece of documentation any reader encounters, and it shapes how quickly someone can understand, navigate, and trust a codebase. Poor names slow teams down, invite bugs, and erode confidence during code reviews and debugging sessions. Strong names, by contrast, make code nearly self-documenting, reduce the need for inline comments, and lower the cognitive load required to maintain software over time. This tutorial covers the principles, conventions, and practical strategies that technology professionals use to name functions clearly and consistently.

## Why function naming matters

Every function name is a micro-decision that compounds across a project. A single unclear name forces every future reader to pause, re-read the implementation, and build a mental model from scratch. Multiply that by hundreds of functions in a production system and the cost becomes significant. Well-named functions serve as a shared vocabulary for teams, making pull requests faster to review, onboarding smoother for new engineers, and incident response more efficient when tracing through unfamiliar call stacks. Naming is not cosmetic polish applied after the real work is done; it is a core part of software design.

## Use descriptive names

Choose names that clearly describe what the function does. The reader should be able to form a reasonable expectation of behavior without opening the function body. Vague or generic names force the reader to inspect the implementation every time.

| Weak name | Stronger name | Why it is better |
|---|---|---|
| process | processPaymentRefund | Specifies what is being processed and the operation |
| handle | handleAuthenticationFailure | Clarifies the event and the domain context |
| execute | executeDatabaseMigration | Communicates the action and the target system |
| run | runComplianceAudit | Reveals intent rather than hiding it behind a generic verb |
| do | doInventoryReconciliation | Replaces a meaningless verb with a precise operation |

A name like `calculateTotalWithTax` is longer than `calc`, but the seconds spent typing are repaid many times over in reduced reading effort across the life of the codebase.

## Use verbs for actions

Functions that perform side effects, transformations, or commands should begin with an action verb. The verb signals that calling the function will cause something to happen, setting the reader's expectation before they even look at parameters or return types.

- **save** — `saveUserProfile`, `saveOrderToDatabase`
- **send** — `sendConfirmationEmail`, `sendSlackNotification`
- **generate** — `generateMonthlyReport`, `generateApiKey`
- **validate** — `validateEmailAddress`, `validatePaymentDetails`
- **delete** — `deleteExpiredSessions`, `deleteOrphanedRecords`
- **fetch** — `fetchAccountBalance`, `fetchLatestDeployment`

Starting with a verb creates a natural sentence-like structure: subject calls verb-object. This pattern is instantly recognizable and scales well as the number of functions in a module grows.

## Use nouns and accessors for queries

Functions that return a value without producing side effects benefit from a different naming pattern. Prefixes like `get`, `is`, `has`, and `can` signal that the function is a query rather than a command.

- **get** — `getUserName`, `getTotalAmount`, `getConnectionTimeout`
- **is** — `isAuthenticated`, `isExpired`, `isEmpty`
- **has** — `hasPermission`, `hasActiveSubscription`
- **can** — `canEdit`, `canRetryPayment`

This distinction between commands and queries aligns with the Command-Query Separation principle. When readers see `isExpired`, they immediately know the function returns a boolean and does not modify state. When they see `expireSession`, they know state will change.

## Follow a consistent naming convention

Consistency within a codebase matters more than any single convention choice. Mixing styles forces readers to context-switch and increases the chance of errors when calling functions from memory.

| Convention | Example | Common in |
|---|---|---|
| camelCase | calculateInterestRate | JavaScript, Java, TypeScript, C# |
| snake_case | check_file_exists | Python, Ruby, Rust, C |
| PascalCase | CalculateInterestRate | C# methods, Go exported functions |
| kebab-case | calculate-interest-rate | Lisp, Clojure, CSS |

Pick the convention that matches your language's ecosystem and team standards, then enforce it with a linter. The goal is that any developer on the team can predict the casing and word order of a function they have not yet seen.

## Avoid abbreviations and acronyms

Abbreviations save a few keystrokes but impose a decoding cost on every reader. Unless an abbreviation is universally understood within the domain, spell it out.

- **Avoid**: `calcTotAmt`, `procTxn`, `genRpt`
- **Prefer**: `calculateTotalAmount`, `processTransaction`, `generateReport`

Widely accepted abbreviations are the exception. Terms like `URL`, `HTTP`, `ID`, `API`, and `HTML` are so standard that expanding them would actually reduce clarity. The test is simple: if a new team member joining from a different company would immediately recognize the abbreviation, it is safe to use.

## Avoid overloading and ambiguity

Do not reuse the same function name for fundamentally different behaviors. Function overloading is supported by some languages, but it should be reserved for cases where the variants perform the same logical operation on different input types. If two functions named `parse` do unrelated things, rename them to `parseJsonPayload` and `parseCsvRow` so the distinction is obvious at the call site.

Ambiguous names also arise when a function does too much. If you struggle to name a function without using conjunctions like "and" or "or," that is a signal the function should be split:

- **Problematic**: `validateAndSaveOrder` — Is this one responsibility or two?
- **Clearer**: `validateOrder` and `saveOrder` as separate functions, composed by the caller.

## Choose specific names over comments

A well-chosen function name can eliminate the need for a comment explaining what the code does. If you find yourself writing a comment above a block of logic, consider extracting that block into a function whose name conveys the same information.

- **Before**: a comment saying "check if the user's trial period has ended" above a block of date comparison logic.
- **After**: a function named `hasTrialPeriodExpired` that encapsulates the same logic.

Self-documenting code is not about avoiding all comments. Comments remain valuable for explaining why a decision was made or documenting non-obvious constraints. But comments that merely describe what the code does are a sign that the function or variable names could be improved.

## Naming conventions for common patterns

Certain recurring patterns in software have well-established naming idioms. Following these conventions helps readers instantly recognize the function's role.

| Pattern | Naming idiom | Examples |
|---|---|---|
| Factory | `create` or `make` prefix | `createUser`, `makeHttpClient` |
| Conversion | `to` prefix or `from` prefix | `toJson`, `fromCsvRow` |
| Callback / handler | `on` prefix | `onClick`, `onMessageReceived` |
| Predicate / boolean | `is`, `has`, `can`, `should` prefix | `isValid`, `shouldRetry` |
| Initialization | `init` or `setup` prefix | `initDatabase`, `setupLogging` |
| Teardown | `close`, `shutdown`, `cleanup` prefix | `closeConnection`, `shutdownWorkers` |

Adopting these idioms means your codebase speaks a shared dialect that experienced developers can read fluently on first encounter.

## Practical checklist for naming a function

When naming or renaming a function, run through these questions:

- Does the name describe what the function does, not how it does it?
- Can a teammate understand the function's purpose from the name alone?
- Does the name follow the casing convention used in the rest of the codebase?
- Does the name start with a verb (for commands) or an accessor prefix (for queries)?
- Is the name free of unnecessary abbreviations?
- Does the function do only one thing, making a single-purpose name natural?
- Would a new team member understand the name without additional context?

If any answer is no, revise the name before merging. Renaming is cheap today and expensive tomorrow.

## Related

After mastering function naming, explore related topics that deepen your ability to write clean, maintainable code. Study how to refactor code to see how renaming fits into broader code improvement workflows. Learn about code quality metrics to understand how naming influences readability scores and static analysis results. Investigate style guides and linting tools that automate naming convention enforcement across teams. Examine design patterns such as the Command-Query Separation principle, factory patterns, and observer patterns, where naming conventions play a structural role. Finally, review behavior-driven development and test-driven development, where descriptive naming of test functions directly mirrors the naming discipline applied to production code.

## Summary

Naming functions well is an act of communication. A strong function name uses a descriptive verb or accessor prefix, follows the casing convention of its language and team, avoids unnecessary abbreviations, and describes a single clear responsibility. Consistent naming reduces cognitive load, accelerates code reviews, simplifies debugging, and makes onboarding faster. The investment in choosing precise names pays compounding returns as a codebase grows, because every developer who reads the code benefits from the clarity embedded in each name. Treat naming as a first-class design activity, not an afterthought, and your code will be easier to read, maintain, and trust.

## References

- Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall. Chapters 2 and 3 cover naming conventions and function design in depth.
- McConnell, S. (2004). *Code Complete: A Practical Handbook of Software Construction* (2nd ed.). Microsoft Press. Chapter 7 addresses routine naming and readability.
- Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code* (2nd ed.). Addison-Wesley. Covers the "Rename Function" refactoring as a fundamental technique.
- Thomas, D., & Hunt, A. (2019). *The Pragmatic Programmer: Your Journey to Mastery* (20th Anniversary ed.). Addison-Wesley. Discusses naming as part of pragmatic coding habits.
- PEP 8 — Style Guide for Python Code. https://peps.python.org/pep-0008/ — Naming conventions section for Python.
- Google Style Guides. https://google.github.io/styleguide/ — Language-specific naming conventions for Java, C++, Python, JavaScript, and more.
