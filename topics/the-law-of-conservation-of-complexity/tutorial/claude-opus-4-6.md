# The Law of Conservation of Complexity

The Law of Conservation of Complexity, also known as Tesler's Law, is a foundational design principle formulated by Larry Tesler, a computer scientist who worked at Xerox PARC and Apple. The law asserts that every application has an inherent amount of irreducible complexity that cannot be eliminated — it can only be moved. The central question for designers and engineers is not whether complexity exists, but who bears its burden: the user or the system. This principle has become one of the most important heuristics in software design, user experience engineering, and system architecture.

## Origins and History

Larry Tesler developed this principle during his work at Xerox PARC in the late 1970s and early 1980s, where he was involved in pioneering research on graphical user interfaces. Tesler observed that when designers attempted to simplify one aspect of a system, the complexity did not vanish — it migrated elsewhere, often into the engineering layer, the documentation, or another part of the interface. He later carried this philosophy to Apple, where he contributed to the development of the Lisa and Macintosh computers, products celebrated for shifting complexity away from the user and into the system internals.

The law was popularized more broadly through its inclusion in design literature and its adoption by the UX community. Dan Saffer's book *Designing for Interaction* and the *Laws of UX* project by Jon Yablonski brought Tesler's Law to renewed attention among modern practitioners.

## Core Principle

The law states that complexity is a conserved quantity within any system. Every application or process has a baseline of inherent complexity that cannot be removed — only redistributed. When a designer removes complexity from the user-facing layer, someone else must absorb it, typically the engineering team. Conversely, when engineers take shortcuts and leave complexity unhandled, users are forced to navigate it themselves.

This means that simplicity for the end user is not free. It requires deliberate investment in architecture, logic, defaults, and error handling on the part of the development team. The law is not an argument against simplicity — it is an argument for being intentional about where complexity lives.

## Inherent vs. Accidental Complexity

A critical distinction related to Tesler's Law is the difference between inherent and accidental complexity. This distinction, originally articulated by Fred Brooks in his essay *No Silver Bullet*, helps clarify what the law does and does not claim.

| Type | Definition | Example | Can It Be Removed? |
|------|-----------|---------|-------------------|
| Inherent complexity | Complexity that is fundamental to the problem domain and cannot be eliminated | Tax law has many rules; a tax preparation tool must account for all of them | No — it can only be moved |
| Accidental complexity | Complexity introduced by poor design, legacy decisions, or unnecessary features | A confusing menu structure or redundant configuration options | Yes — it should be eliminated |

Tesler's Law applies specifically to inherent complexity. The goal is not to reduce inherent complexity (which is impossible) but to ensure it is handled by the party best equipped to manage it. Accidental complexity, on the other hand, should simply be removed. Confusing the two leads to either over-simplified systems that fail to address real requirements or bloated systems that burden users with problems that could have been solved by better engineering.

## Where Complexity Can Live

When applying this law, technology professionals must decide where to place complexity along a spectrum. The major options include:

- **The user interface.** Users are required to make choices, configure settings, or follow multi-step workflows. This is appropriate when user intent genuinely varies and the system cannot infer the correct behavior.
- **The application logic.** The system absorbs complexity through smart defaults, inference, validation, and automation. This increases development cost but reduces user burden.
- **The platform or infrastructure.** Complexity is pushed into frameworks, libraries, operating systems, or cloud services. This leverages the work of platform teams so that application developers and users do not need to handle it.
- **Documentation and training.** When complexity cannot be hidden by the system, it is offloaded to manuals, onboarding flows, or support teams. This is often the least desirable option because it depends on users seeking and absorbing the information.

The most successful products tend to push inherent complexity as far from the user as possible, absorbing it into application logic and platform infrastructure.

## Practical Applications

The law can be applied across many domains of technology work:

- **Interface design.** Remove unnecessary buttons, options, and configuration screens. Provide sensible defaults that work for the majority of users. Reserve advanced settings for power users who seek them out.
- **API design.** Absorb complexity into the API layer so that consumers do not need to understand internal implementation details. Provide clear contracts, handle edge cases internally, and return meaningful error messages.
- **Workflow simplification.** Reduce the number of steps required to complete a task. Automate repetitive decisions. Pre-fill forms with known data. Eliminate confirmation dialogs that provide no real safety benefit.
- **System architecture.** Use abstraction layers to shield higher-level components from lower-level complexity. Encapsulate domain logic so that changes in one area do not cascade unpredictably across the system.
- **Onboarding.** Design progressive disclosure so that new users encounter only what they need immediately, with advanced capabilities revealed as their expertise grows.

## Common Mistakes

Technology teams frequently misapply this principle in several ways:

- **Removing complexity instead of relocating it.** Stripping features or options without ensuring the underlying need is still met results in a product that is simple but inadequate.
- **Hiding complexity without handling it.** Concealing options behind menus or settings panels without providing intelligent defaults forces users to hunt for controls they need.
- **Assuming all complexity is accidental.** Attempting to eliminate inherent complexity leads to oversimplified tools that cannot handle real-world scenarios.
- **Over-engineering to absorb complexity.** Investing excessive engineering effort to hide trivial complexity that users would easily understand creates unnecessary development cost and system fragility.
- **Ignoring the transfer cost.** Moving complexity from users to engineers is only beneficial if the engineering team can maintain the resulting system. Unsustainable complexity transfers create technical debt.

## Relationship to Other Design Principles

Tesler's Law intersects with and complements several other well-known principles:

| Principle | Relationship to Tesler's Law |
|-----------|------------------------------|
| Hick's Law | Reducing the number of choices presented to users is one way to shift complexity away from the interface |
| Occam's Razor | Favoring simpler explanations and designs aligns with eliminating accidental complexity |
| Progressive Disclosure | A direct technique for managing where and when complexity is revealed to users |
| KISS (Keep It Simple, Stupid) | Shares the goal of simplicity but does not explicitly address where removed complexity goes |
| Brooks's Law of Inherent Complexity | Provides the theoretical foundation that distinguishes inherent from accidental complexity |
| Don Norman's Design Principles | Norman's emphasis on affordances and mappings operationalizes how to make systems feel simple |

## Related

Technology professionals exploring the Law of Conservation of Complexity should also study related topics including Hick's Law for understanding decision complexity, progressive disclosure as a technique for managing information density, cognitive load theory for understanding the mental cost of interface complexity, the principle of least astonishment for reducing unexpected system behavior, usability heuristics such as Jakob Nielsen's ten heuristics, and Fred Brooks's *No Silver Bullet* for the foundational distinction between essential and accidental complexity in software engineering.

## Summary

The Law of Conservation of Complexity, or Tesler's Law, teaches that every system contains an irreducible amount of complexity that cannot be destroyed — only transferred between users, developers, and infrastructure. The most effective technology professionals recognize that their job is not to eliminate complexity but to make deliberate, informed decisions about who bears it, ensuring that users encounter the simplest possible experience while the system absorbs the necessary burden behind the scenes. Applying this law well requires distinguishing inherent complexity from accidental complexity, investing engineering effort where it delivers the greatest user benefit, and resisting both the temptation to oversimplify and the tendency to leave complexity unmanaged.

## References

- Tesler, Larry. Personal website and writings on complexity in interface design. [https://www.nomodes.com](https://www.nomodes.com)
- Yablonski, Jon. *Laws of UX: Using Psychology to Design Better Products & Services.* O'Reilly Media, 2020.
- Yablonski, Jon. "Tesler's Law." Laws of UX. [https://lawsofux.com/teslers-law/](https://lawsofux.com/teslers-law/)
- Brooks, Fred. "No Silver Bullet — Essence and Accident in Software Engineering." *Proceedings of the IFIP Tenth World Computing Conference*, 1986.
- Saffer, Dan. *Designing for Interaction: Creating Innovative Applications and Devices.* New Riders, 2010.
- Norman, Don. *The Design of Everyday Things.* Basic Books, revised edition, 2013.
- Nielsen, Jakob. "10 Usability Heuristics for User Interface Design." Nielsen Norman Group. [https://www.nngroup.com/articles/ten-usability-heuristics/](https://www.nngroup.com/articles/ten-usability-heuristics/)
