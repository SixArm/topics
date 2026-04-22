# Second-System Effect

Small, successful systems tend to be followed by overengineered, bloated replacements.

Takeaways
The first system is kept lean by constraints or inexperience. When designing its successor, there’s a tendency to incorporate all the extras initially left out, leading to feature bloat.
Overconfidence plays a role. Having succeeded once, the team feels they can tackle much more, underestimating complexity.
The second-system effect often results in over-engineering with more modules, generality, and features than necessary, hurting performance and maintainability.
Overview
A small, elegant system is built and works well. A second version is initiated, and the designers, freed from the constraints of the first project, try to build something much bigger and more complex. They add enhancements, address all edge cases, and incorporate wishlist features. The result is often an overly complex, behind-schedule system.

Brooks noted this with IBM’s OS/360: simpler earlier systems were followed by a second system that became very complex. The syndrome is an exercise in hubris. The team doesn’t realize how much harder the bigger scope will be.

The second-system effect warns engineers to be suspicious of grand redesigns that promise to include everything.

Examples
A startup builds a minimal web service that’s very successful. For version 2, the team plans a complete rewrite with microservice architecture, tons of configuration options, plug-in frameworks, and features users never asked for. The project explodes in complexity and misses deadlines.

Netscape Navigator in the 1990s decided to rewrite their browser after initial success, leading to the Mozilla Suite. The rewrite took many years, during which Internet Explorer caught up. The new suite was considered overly complicated, and Netscape lost its lead.

Origins
Fred Brooks coined the term in 1975 in The Mythical Man-Month. He observed it in practice at IBM, where successful small systems (such as simplistic tape-based OS) were followed by OSes that tried to do far more and ran late or failed.

The phrase “second-system syndrome” appears in an essay of the same name in the book.
