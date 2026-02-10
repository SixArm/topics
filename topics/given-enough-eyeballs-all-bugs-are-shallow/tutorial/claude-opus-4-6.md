# Given enough eyeballs, all bugs are shallow

"Given enough eyeballs, all bugs are shallow" is a principle articulated by Eric S. Raymond in his influential 1997 essay *The Cathedral and the Bazaar*. Named "Linus's Law" in honor of Linux creator Linus Torvalds, the phrase captures a foundational belief of the open-source software movement: when a sufficiently large number of developers and users can inspect source code, defects are identified and resolved more rapidly than in closed development models. The principle has shaped debates about software quality, security, and the economics of collaborative development for over two decades.

## Origin and Context

Eric S. Raymond formulated the principle while observing the Linux kernel development process and his own experience managing the Fetchmail project. He published the idea in *The Cathedral and the Bazaar*, which contrasted two software development models. The "cathedral" model represented traditional, closed development where a small team works in isolation and releases polished versions at long intervals. The "bazaar" model represented open-source development where code is developed publicly, released early and often, and reviewed by a large, distributed community of contributors.

Raymond observed that the bazaar model, contrary to expectations, did not produce chaotic or low-quality software. Instead, the sheer volume of reviewers meant that bugs were diagnosed and fixed with remarkable speed. He attributed this to the statistical principle that different people bring different perspectives, expertise, and testing environments to a project, making it likely that someone will recognize a defect that others have missed.

## How the Principle Works

The mechanism behind the principle operates on several levels. First, a large and diverse reviewer base increases the probability that at least one person possesses the specific domain knowledge or contextual experience needed to identify a given bug. Second, open code review creates a form of parallel inspection where many people examine the same code independently, applying different mental models and testing strategies. Third, users in production environments encounter edge cases and configurations that no development team could anticipate in advance.

The principle relies on both the quantity and diversity of reviewers. A thousand reviewers with identical backgrounds may miss the same class of bugs, while a smaller but more varied group may catch issues across a wider spectrum. Effective open-source projects cultivate this diversity by welcoming contributors from different organizations, geographies, and areas of expertise.

## Comparison: Open-Source vs. Closed-Source Review

| Factor | Open-Source (Bazaar) | Closed-Source (Cathedral) |
|---|---|---|
| Number of reviewers | Potentially thousands of contributors and users | Limited to internal team and contracted auditors |
| Diversity of perspectives | Broad range of backgrounds, use cases, and environments | Constrained by organizational hiring and culture |
| Speed of bug discovery | Often rapid due to parallel, distributed review | Dependent on internal QA capacity and release cycles |
| Incentive to review | Voluntary, driven by personal use, reputation, or mission | Directed by management, bounded by budget |
| Transparency of fixes | Patches and discussions are publicly visible | Fixes may be silent or bundled into opaque updates |
| Accountability | Community-driven; anyone can audit the fix | Vendor-driven; users must trust the vendor |

## Supporting Evidence

Several high-profile examples lend credibility to the principle:

- **The Linux kernel** has been developed by thousands of contributors over three decades and powers critical infrastructure worldwide. Its track record demonstrates that large-scale open review can produce highly reliable software.
- **The Apache HTTP Server** became the dominant web server in part because its open development model attracted extensive peer review and rapid patching.
- **Mozilla Firefox** transitioned from a closed Netscape codebase to an open model, which accelerated security improvements and feature development through community involvement.

Research from institutions including Harvard Business School and Carnegie Mellon has found that popular open-source projects often exhibit defect densities comparable to or lower than proprietary alternatives, lending empirical support to the general claim.

## Criticisms and Limitations

The principle has faced substantive criticism, particularly after several high-profile vulnerabilities in widely used open-source software called its assumptions into question.

- **The Heartbleed vulnerability (2014)** persisted in OpenSSL for over two years despite the library being used by millions of systems. Critics pointed out that while many people used the code, very few actually reviewed it carefully.
- **The Shellshock vulnerability (2014)** in GNU Bash had existed for approximately 25 years before discovery, demonstrating that longevity and widespread use do not guarantee thorough review.
- **The Log4Shell vulnerability (2021)** in the Apache Log4j library highlighted the gap between usage and active maintenance, as a critical component was maintained by a small group of volunteers.

These cases reveal that "enough eyeballs" is a necessary but not sufficient condition. The principle assumes that people are actively and competently reviewing the code, not merely using it. In practice, many open-source projects suffer from a lack of funded, sustained security review.

## Conditions for Effectiveness

For the principle to hold in practice, several conditions must be met:

- **Active review culture**: The project must attract contributors who read and analyze the code, not just consumers who use it without inspection.
- **Readable and well-structured code**: Complex, poorly documented, or obfuscated code resists casual review regardless of how many people have access.
- **Sufficient maintainer capacity**: Maintainers must be able to process, evaluate, and integrate bug reports and patches in a timely manner.
- **Security expertise among reviewers**: General-purpose developers may miss subtle security flaws that require specialized knowledge in cryptography, memory safety, or protocol design.
- **Tooling and infrastructure**: Automated testing, static analysis, fuzzing, and continuous integration complement human review and increase the effective number of "eyeballs."

## Broader Implications for Technology Organizations

The principle extends beyond open-source projects into general software engineering practice. Many organizations have adopted internal open-source models, sometimes called "inner source," where code is visible and reviewable across teams within a company. Code review practices such as pull request reviews, pair programming, and security audits all embody the same underlying logic: more informed reviewers lead to higher-quality software.

The principle also informs decisions about vendor selection, risk management, and compliance. Organizations evaluating software dependencies increasingly consider not just whether a project is open source, but whether it has an active, well-funded, and diverse contributor community capable of genuine review.

## Related

Topics to explore next include open-source software development, the cathedral and the bazaar model, code review best practices, software security auditing, inner source development, Linus's Law, the Heartbleed and Shellshock case studies, static analysis tools, continuous integration and continuous delivery, software supply chain security, and the economics of open-source maintenance and funding models such as Open Source Security Foundation (OpenSSF) initiatives.

## Summary

"Given enough eyeballs, all bugs are shallow" remains one of the most influential principles in software engineering. It correctly identifies that broad, diverse, and active code review dramatically improves the likelihood of finding defects. However, the principle is not automatic: it depends on the quality, motivation, and expertise of the reviewers, not merely their number. Technology professionals should treat the principle as a guiding heuristic rather than a guarantee, investing in both community engagement and systematic review infrastructure to realize its benefits.

## References

- Raymond, Eric S. *The Cathedral and the Bazaar: Musings on Linux and Open Source by an Accidental Revolutionary*. O'Reilly Media, 1999. Available at http://www.catb.org/~esr/writings/cathedral-bazaar/
- Wheeler, David A. "Why Open Source Software / Free Software (OSS/FS, FLOSS, or FOSS)? Look at the Numbers!" https://dwheeler.com/oss_fs_why.html
- Coverity Scan Open Source Report (Synopsys), annual reports on open-source code quality and defect density. https://scan.coverity.com/
- Durumeric, Zakir, et al. "The Matter of Heartbleed." *Proceedings of the 2014 Conference on Internet Measurement*, ACM, 2014.
- Open Source Security Foundation (OpenSSF). https://openssf.org/
- Raymond, Eric S. "Linus's Law" discussion in *The Cathedral and the Bazaar*, Chapter 4.
