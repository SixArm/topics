# Don't Make Me Think by Steve Krug

"Don't Make Me Think" is a landmark book by Steve Krug, first published in 2000 and revised multiple times, most recently as "Don't Make Me Think, Revisited" in 2014. The book is widely regarded as one of the most important and accessible works on web usability and user experience design. Its central thesis is deceptively simple: a good website or application should be so intuitive that users can accomplish their goals without having to stop and figure out how things work. Krug distills decades of usability practice into a concise, practical guide that has become essential reading for designers, developers, product managers, and anyone involved in building digital products.

## Core Principle: Self-Evident Design

The title itself captures the book's foundational principle. When a user looks at a web page or interface, it should be self-evident. The user should not need to expend cognitive effort figuring out what things are, how to use them, or where to find what they need. Every question mark that pops into a user's head adds to their cognitive load and detracts from the experience. Krug argues that the goal is not merely to make things easy to use, but to make them so obvious that they require no thought at all. When forced to think, users become frustrated, lose confidence, and are more likely to abandon the task or the site entirely.

## Key Principles and Concepts

Krug organizes his advice around several interrelated principles that together form a coherent philosophy of usability.

| Principle | Description | Practical Application |
|---|---|---|
| Self-evidence | Pages should be obvious at a glance | Use clear labels, familiar conventions, and visible affordances |
| Visual hierarchy | Important elements should stand out visually | Use size, color, contrast, and spacing to indicate priority |
| Conventions | Leverage existing patterns users already know | Follow standard layouts for navigation, links, and buttons |
| Scannability | Users scan pages rather than reading them | Use headings, bullet points, highlighted keywords, and short paragraphs |
| Minimal clicks | Reduce the number of decisions at each step | Simplify navigation paths and eliminate unnecessary choices |
| Error tolerance | Design for mistakes and recovery | Provide clear error messages, undo options, and input validation |

## How Users Actually Use the Web

One of Krug's most valuable contributions is his honest assessment of how people really interact with websites, as opposed to how designers assume they do. His observations include:

- **Users don't read, they scan.** People rarely read web pages word by word. Instead, they scan for keywords, phrases, and visual cues that match their current goal. Designers must account for this by making content scannable.
- **Users don't make optimal choices, they satisfice.** Rather than evaluating every option to find the best one, users pick the first reasonable option that looks like it might work. This concept, borrowed from Herbert Simon's decision theory, means that "good enough" navigation is more important than perfect organization.
- **Users don't figure out how things work, they muddle through.** Most users never develop a deep understanding of a website's structure. They find something that works and stick with it, even if it's not the intended path. This means designs must be forgiving of non-ideal navigation patterns.
- **Users have limited patience.** Every moment of confusion or delay increases the chance that a user will leave. The cost of making someone think is not just frustration; it is lost engagement, lost revenue, and lost trust.

## Usability Testing

Krug is a strong advocate for usability testing, but with a pragmatic twist. He argues against the traditional model of expensive, formal usability studies and instead champions what he calls "lost-our-lease usability testing," a lightweight approach that any team can adopt.

- **Test early and often.** One test early in development is worth more than fifty tests after launch. Problems found early are cheaper and easier to fix.
- **Test with a small number of users.** Three to five users per round of testing is usually sufficient to uncover the most significant issues. The goal is not statistical validity but actionable insights.
- **Use informal methods.** Testing can be done in a conference room with a laptop and a screen recorder. It does not require a dedicated usability lab or specialized equipment.
- **Focus on observing, not asking.** Watch what users do, not just what they say. The gap between reported behavior and actual behavior is significant.
- **Fix the big problems first.** After testing, prioritize fixing the issues that caused the most confusion or prevented task completion, rather than trying to address every observation.

| Traditional Usability Testing | Krug's Approach |
|---|---|
| Large sample sizes (20+ users) | Small groups (3-5 users per round) |
| Formal lab setting | Any quiet room with a computer |
| Extensive reports and analysis | Quick debrief and action items |
| Conducted by usability specialists | Can be run by anyone on the team |
| Done once before launch | Done repeatedly throughout development |
| Expensive and time-consuming | Low cost and fast turnaround |

## Visual Hierarchy and Navigation

Krug emphasizes that visual hierarchy is the primary tool for communicating the structure and importance of content on a page. A well-designed visual hierarchy allows users to instantly understand what matters most, what is related, and what is subordinate.

- **Size and prominence** signal importance. Larger, bolder elements are perceived as more important.
- **Grouping and proximity** show relationships. Elements placed near each other are perceived as related.
- **Nesting and indentation** indicate hierarchy. Sub-items should be visually subordinate to their parent items.
- **Consistent styling** creates predictability. When similar elements look the same across pages, users learn the system quickly.

For navigation, Krug recommends persistent, clear navigation that answers three questions at all times: Where am I? How did I get here? Where can I go? Breadcrumbs, highlighted current-page indicators, and consistent placement of navigation elements all contribute to orientation.

## Clear and Concise Communication

Krug advocates ruthless reduction of text on web pages. His guidance is to write content, then cut it in half, and then cut what remains in half again. The reasoning is practical:

- Shorter text is more likely to be read and understood.
- Removing "happy talk" (introductory text that says nothing useful) and unnecessary instructions lets users focus on what matters.
- Every word on a page competes for attention. Unnecessary words dilute the impact of important words.
- Instructions should be self-evident through design rather than explained through text. If you need a paragraph to explain how to use a feature, the feature needs redesign.

## Form Design and User Input

Forms are a critical area where usability directly impacts conversion and user satisfaction. Krug's advice on forms aligns with broader usability best practices:

- Minimize the number of fields. Every additional field increases abandonment rates.
- Group related fields logically and label them clearly.
- Provide inline validation so users know immediately when something is wrong.
- Use smart defaults and auto-fill where possible to reduce manual effort.
- Make error messages specific and helpful, telling users exactly what to fix and how.
- Avoid jargon and technical labels that users may not understand.

## Mobile and Responsive Design

In the revised edition, Krug addresses the shift toward mobile usage. His core principles translate directly to mobile contexts, but with additional considerations:

- Touch targets must be large enough for finger interaction, not just mouse pointers.
- Screen real estate is severely limited, making prioritization and simplification even more critical.
- Users on mobile are often in contexts with distractions, poor connectivity, or time pressure, which amplifies the importance of self-evident design.
- Responsive design should not simply reflow desktop content but should reconsider what content and features are most important in a mobile context.

## Common Usability Mistakes

Krug identifies several recurring mistakes that undermine usability across websites and applications:

- **Cluttered pages** that try to give everything equal visual weight, resulting in nothing standing out.
- **Clever or creative naming** that prioritizes branding over clarity, leaving users unsure what a link or feature does.
- **Inconsistent navigation** that changes from page to page, forcing users to relearn the interface.
- **Walls of text** that assume users will read long paragraphs to find what they need.
- **Hidden affordances** where interactive elements do not look clickable or tappable.
- **Assuming users care about your organizational structure** by reflecting internal company structure in site architecture rather than designing around user tasks.

## Related

Technology professionals studying Krug's work should also explore topics in usability testing, user experience design, information architecture, visual hierarchy, accessibility and ARIA attributes, responsive design, cognitive load theory, Jakob Nielsen's heuristic evaluation, human-computer interaction, and design thinking. These areas complement and extend the principles that Krug presents and provide a broader foundation for creating user-centered digital products.

## Summary

"Don't Make Me Think" remains one of the most influential and practical guides to web usability ever written. Its enduring relevance stems from its focus on fundamental human behavior rather than specific technologies or design trends. Krug's central message, that every element of a digital interface should be self-evident and require zero unnecessary cognitive effort, provides a clear north star for design decisions. Combined with his advocacy for lightweight, frequent usability testing and his honest characterization of how users actually behave, the book equips technology professionals with both a mindset and a methodology for building products that people can use effortlessly.

## References

- Krug, Steve. "Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability." 3rd Edition, New Riders, 2014.
- Krug, Steve. "Rocket Surgery Made Easy: The Do-It-Yourself Guide to Finding and Fixing Usability Problems." New Riders, 2010.
- Nielsen, Jakob. "Usability Engineering." Morgan Kaufmann, 1993.
- Norman, Don. "The Design of Everyday Things." Revised and Expanded Edition, Basic Books, 2013.
- sensible.com -- Steve Krug's website with resources on usability testing and web design.
