# SCAMPER

SCAMPER is a structured creative thinking technique used to stimulate idea generation and innovative problem-solving. Originally developed by Bob Eberle and building on Alex Osborn's brainstorming methods, SCAMPER provides a systematic set of seven prompts that guide practitioners in examining existing products, processes, or concepts and transforming them into new and improved versions. For technology professionals, SCAMPER is especially valuable during product design, feature ideation, architecture reviews, and process improvement initiatives, where structured creativity can yield breakthrough innovations without relying on purely unstructured brainstorming.

## The SCAMPER Acronym

Each letter in SCAMPER represents a distinct creative prompt that encourages you to look at a problem or existing solution from a specific angle. Together, the seven prompts form a comprehensive toolkit for systematic innovation.

| Letter | Prompt | Core Question |
|--------|--------|---------------|
| **S** | Substitute | What components, materials, or processes can be replaced? |
| **C** | Combine | What ideas, features, or functions can be merged? |
| **A** | Adapt | What can be adjusted or borrowed from another context? |
| **M** | Modify | What can be changed in shape, size, scale, or behavior? |
| **P** | Put to another use | What else can this be used for beyond its original purpose? |
| **E** | Eliminate | What can be removed, simplified, or reduced? |
| **R** | Reverse | What happens if assumptions, sequences, or roles are flipped? |

## Substitute

Substitution asks whether you can replace certain parts of an idea, product, or process with something else. In technology, this might mean swapping out a database engine, replacing a monolithic architecture with microservices, or using a different programming language for a specific module. The goal is to identify aspects that can be exchanged to bring a fresh perspective, reduce cost, improve performance, or increase reliability.

Key questions to ask during substitution:

- Can a different technology stack achieve the same outcome more efficiently?
- Can a manual process be replaced with automation?
- Can an external dependency be substituted with an in-house solution, or vice versa?
- Can one user interface paradigm be swapped for another to improve usability?

## Combine

Combination involves merging different elements, features, or ideas together to create something new or synergistic. Technology professionals frequently use this prompt when considering feature consolidation, platform integration, or convergence of separate tools into a unified solution. The power of combination lies in discovering unexpected synergies that neither component offers on its own.

For example, combining real-time analytics with a customer support dashboard might produce a proactive support tool that anticipates issues before users report them. Combining version control with automated testing creates continuous integration pipelines. The key is to look beyond silos and ask how existing components can amplify each other.

## Adapt

Adaptation asks you to borrow solutions from different domains, industries, or contexts and adjust them to fit your current challenge. Technology history is rich with successful adaptations: the kanban methodology was adapted from manufacturing to software development, recommendation engines adapted collaborative filtering from academic research to e-commerce, and containerization adapted operating system concepts into application deployment.

When applying the Adapt prompt, consider:

- What solutions exist in adjacent industries that address a similar problem?
- What open-source tools or frameworks could be repurposed for your specific needs?
- What patterns from one layer of the technology stack could work at another layer?
- What user experience conventions from consumer applications could improve enterprise software?

## Modify

Modification encourages you to alter, enhance, magnify, or minimize aspects of an existing idea to improve its functionality, aesthetics, or performance. This prompt is particularly useful during iterative product development, where incremental changes can yield significant improvements.

Modification operates across several dimensions:

| Dimension | Magnify | Minimize |
|-----------|---------|----------|
| **Scale** | Handle 10x more users | Reduce to a lightweight edge deployment |
| **Frequency** | Increase data refresh rate to real-time | Batch processing to reduce overhead |
| **Complexity** | Add advanced configuration options | Simplify to sensible defaults |
| **Visibility** | Surface more metrics and telemetry | Hide complexity behind abstractions |
| **Speed** | Optimize for lower latency | Trade speed for thoroughness in analysis |

The key insight is that modification is not limited to making things bigger or better. Sometimes reducing, slowing down, or simplifying produces the most valuable outcome.

## Put to Another Use

This prompt challenges you to find alternative applications or contexts for an existing idea, product, or technology beyond its original purpose. In the technology industry, repurposing is a powerful strategy. Internal tools become commercial products, gaming GPUs become machine learning accelerators, and messaging protocols become event-driven architecture backbones.

Questions that drive repurposing:

- Could an internal tool be productized for external customers?
- Could a data pipeline built for one team serve another department's needs?
- Could a testing framework be repurposed as a monitoring or validation tool in production?
- Could a deprecated feature find new life in a different product line?

Repurposing often delivers high return on investment because the foundational work has already been done. It requires looking at existing assets with fresh eyes and recognizing latent value.

## Eliminate

Elimination asks you to remove unnecessary aspects from an idea, process, or product to simplify and streamline it. In technology, this aligns closely with principles of lean development and minimalist design. Eliminating unnecessary features reduces maintenance burden, shrinks attack surfaces, improves performance, and sharpens the user experience.

Candidates for elimination include:

- Features with low adoption or engagement
- Redundant approval steps in a deployment pipeline
- Unnecessary abstraction layers that add complexity without benefit
- Legacy integrations that no longer serve active users
- Configuration options that almost no one changes from the default

The discipline of elimination is often harder than addition. Teams naturally resist removing features they built. However, the most elegant systems are frequently defined as much by what they exclude as by what they include.

## Reverse

Reversal asks you to flip traditional assumptions, sequences, or perspectives associated with an idea. This is one of the most powerful SCAMPER prompts because it forces you to challenge fundamental beliefs. In technology, reversal thinking has produced paradigm shifts: pull-based deployment instead of push, event sourcing instead of state mutation, serverless instead of server provisioning, and zero-trust security instead of perimeter defense.

Reversal questions to explore:

- What if the user configured the system instead of an administrator?
- What if you built the API consumer first and derived the API from actual usage patterns?
- What if you optimized for developer experience before runtime performance?
- What if data flowed in the opposite direction?

## How to Run a SCAMPER Session

A structured SCAMPER session typically follows a repeatable process that can be completed individually or in a group setting.

1. **Define the focus.** Clearly articulate the product, process, or problem you want to improve. Write it down so all participants share a common understanding.
2. **Walk through each prompt sequentially.** Spend dedicated time on each of the seven prompts, generating as many ideas as possible without evaluating them.
3. **Capture all ideas.** Document every suggestion regardless of feasibility. Quantity matters more than quality during the divergent phase.
4. **Evaluate and prioritize.** After completing all seven prompts, review the collected ideas. Score them on criteria such as impact, feasibility, effort, and alignment with strategic goals.
5. **Select and prototype.** Choose the most promising ideas and move them into experimentation or prototyping.

A typical session lasts 60 to 90 minutes. For complex topics, consider dedicating a separate session to each prompt.

## SCAMPER Compared to Other Ideation Techniques

| Technique | Structure | Best For | Limitation |
|-----------|-----------|----------|------------|
| **SCAMPER** | Seven specific prompts applied to an existing idea | Improving or evolving existing products and processes | Less effective for generating entirely novel concepts from scratch |
| **Brainstorming** | Open-ended, free-form idea generation | Broad exploration of possibilities | Can lack focus and produce shallow ideas |
| **Design Thinking** | Five-phase human-centered process | Deep user empathy and end-to-end problem solving | Time-intensive and requires user research |
| **TRIZ** | 40 inventive principles derived from patent analysis | Solving technical contradictions | Steep learning curve and engineering-heavy |
| **Six Thinking Hats** | Six perspectives applied to a decision | Balanced evaluation of an idea from multiple angles | More evaluative than generative |

SCAMPER occupies a practical middle ground: more structured than brainstorming, less time-intensive than design thinking, and more accessible than TRIZ. It works best when you have an existing baseline to improve rather than a blank slate.

## Related

Related topics to explore next include design thinking for a broader human-centered innovation framework, brainstorming for complementary free-form ideation techniques, creative thinking techniques for a wider survey of structured creativity methods, oblique strategies for lateral thinking prompts, and the five whys analysis for root cause investigation that pairs well with SCAMPER when diagnosing problems before generating solutions.

## Summary

SCAMPER is a practical, accessible, and systematic framework for structured creativity that guides technology professionals through seven distinct lenses for transforming existing ideas into improved or entirely reimagined solutions. By methodically applying Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, and Reverse prompts, teams can move beyond ad hoc brainstorming and generate a rich, diverse set of actionable ideas grounded in what already exists. Its strength lies in its simplicity and repeatability, making it equally useful for a solo engineer rethinking an API design and a cross-functional team reimagining a product roadmap.

## References

- Eberle, Bob. *SCAMPER: Games for Imagination Development*. Prufrock Press, 1996.
- Osborn, Alex F. *Applied Imagination: Principles and Procedures of Creative Problem-Solving*. Charles Scribner's Sons, 1953.
- Michalko, Michael. *Thinkertoys: A Handbook of Creative-Thinking Techniques*. Ten Speed Press, 2006.
- Interaction Design Foundation. "SCAMPER: How to Use the Best Ideation Method." https://www.interaction-design.org/literature/article/learn-how-to-use-the-best-ideation-methods-scamper
- MindTools. "SCAMPER: Improving Products and Services." https://www.mindtools.com/a2wblfm/scamper
