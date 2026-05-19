# Ralph loop

The Ralph loop is an autonomous AI coding technique where an agent, often using tools like Claude Code or Amp, is put into a continuous, self-iterating feedback loop until a task is completed. It repeatedly feeds its own errors and output back into itself until the code works.

The technique works by feeding the AI a set of goals or a product requirements document, which the agent breaks down into specific, atomic tasks. The agent tackles one task per iteration. When it hits a wall or tries to exit, a stop hook intercepts it, reinjects the original prompt, and starts a fresh instance with the updated context. While each iteration runs in a clean session, progress is retained through Git history and tracking files so the AI remembers what has already been tried and what remains.

The name comes from Ralph Wiggum of The Simpsons, representing a stubborn, persistent approach of trying again and again until something works. The pattern embraces brute-force persistence over elegance, relying on the fact that AI agents are cheap to run and tireless in their willingness to retry.

The Ralph loop is highly effective for automating tedious, mechanical work such as library upgrades, large-scale refactoring, and version bumps. It is less suited for creative architectural planning or tasks requiring nuanced judgment. Developers typically use it with stacked pull requests to make the agent's output easier to review incrementally, and they set maximum iteration limits to prevent runaway token consumption.

The pattern reflects a broader shift in AI-assisted development: rather than expecting an agent to produce correct output on the first attempt, developers design workflows that assume failure and build recovery into the process itself.
