# You Aren't Gonna Need It (YAGNI)

You Aren't Gonna Need It (YAGNI) is a software development principle that states: don't add functionality until it is necessary. It originated in the Extreme Programming (XP) movement of the late 1990s, championed by Ron Jeffries, who wrote: "Always implement things when you actually need them, not when you just foresee that you need them."

YAGNI directly targets over-engineering. When a developer thinks "we might need this later," YAGNI says stop. That future requirement may never materialize, or it may look completely different when it does. Code written speculatively adds complexity, increases the maintenance burden, and often solves the wrong problem because it was designed without real requirements.

The principle works because deferring a feature until it is actually needed means you have more information when you build it. You understand real use cases, actual constraints, and true priorities. This leads to better abstractions and cleaner implementations than speculative code ever produces.

Applying YAGNI requires confidence in your ability to refactor. Teams succeed with this principle when they have strong test coverage, continuous integration, and modern refactoring tools. These practices make adding functionality later low-cost and low-risk, which removes the anxiety that drives premature implementation.

In practice, YAGNI means implementing the simplest solution that meets current requirements. If your app needs JSON export, build JSON export, not a generalized serialization framework. If a function serves one purpose today, write it for that purpose. If a feature works one way, skip the configuration flag that lets someone toggle it differently.

YAGNI encourages iterative development: build what is needed now, ship it, learn from it, and extend when reality demands it.
