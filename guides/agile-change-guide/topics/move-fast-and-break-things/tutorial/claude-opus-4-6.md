# Move fast and break things

"Move fast and break things" is a philosophy popularized by Mark Zuckerberg during Facebook's early years. It champions speed and experimentation over caution, arguing that rapid iteration produces better products faster than careful, consensus-driven development. For technology professionals, understanding this mindset — along with its strengths and serious limitations — is essential for navigating modern engineering culture and making sound decisions about velocity, quality, and risk.

## Origins and Context

Mark Zuckerberg introduced "move fast and break things" as an internal motto at Facebook around 2009. It became a defining slogan of the Silicon Valley startup ethos: ship code quickly, gather real-world feedback, and fix problems as they surface rather than trying to anticipate every issue in advance. The phrase captured a broader cultural shift in software development away from lengthy waterfall cycles and toward lean, iterative delivery.

Facebook operated under this motto during a period of explosive growth, scaling from a college social network to a platform serving hundreds of millions of users. The motto signaled to engineers that shipping speed was the primary value, and that broken features or temporary regressions were acceptable costs of progress.

By 2014, Zuckerberg publicly retired the phrase, replacing it with "move fast with stable infrastructure." The shift acknowledged that at Facebook's scale, breakage had become more costly than slowness.

## Core Principles

The philosophy rests on several interconnected beliefs about how technology companies should operate:

- **Speed as competitive advantage.** In fast-moving markets, the first company to solve a user problem often captures the market. Delaying a launch to polish details can mean losing to a competitor who ships sooner.
- **Learning through failure.** Real user feedback is more valuable than internal speculation. Shipping an imperfect product teaches teams what actually matters, while prolonged planning can optimize for the wrong things.
- **Bias toward action.** When faced with uncertainty, act rather than deliberate. Decisions are reversible; inaction is not.
- **Tolerance for breakage.** Temporary bugs, regressions, or incomplete features are acceptable if the overall trajectory is forward progress. Perfection is the enemy of delivery.
- **Flat decision-making.** Engineers closest to the problem should have authority to ship without waiting for layers of approval.

## Benefits for Technology Teams

When applied in the right context, the move-fast philosophy offers tangible advantages:

- **Faster feedback loops.** Shipping early exposes assumptions to reality, allowing teams to course-correct before investing heavily in the wrong direction.
- **Higher morale and autonomy.** Engineers empowered to ship without bureaucratic gatekeeping tend to be more engaged and productive.
- **Market responsiveness.** Teams that iterate quickly can adapt to changing user needs, competitive threats, and emerging technologies faster than slower-moving organizations.
- **Reduced over-engineering.** A bias toward shipping discourages gold-plating features that users may never need, keeping codebases leaner.
- **Cultural alignment with startups.** Early-stage companies with limited runway benefit from velocity because they must find product-market fit before funding runs out.

## Criticisms and Risks

The philosophy has drawn significant criticism, particularly as technology companies have grown in scale and influence:

- **User harm.** Shipping untested features to millions of users can cause real damage — privacy breaches, security vulnerabilities, misinformation spread, and degraded user experiences.
- **Technical debt accumulation.** Persistent speed without investment in quality leads to fragile systems that become increasingly expensive and dangerous to modify.
- **Ethical blind spots.** A culture that celebrates speed can discourage engineers from raising concerns about societal impact, bias, or unintended consequences.
- **Regulatory exposure.** Products that break things in regulated industries (healthcare, finance, transportation) can trigger legal liability, fines, and loss of operating licenses.
- **Erosion of trust.** Users and partners lose confidence in platforms that repeatedly break functionality or mishandle data, and rebuilding that trust is far more costly than preserving it.
- **Survivorship bias.** The companies celebrated for moving fast and succeeding are visible; the many that moved fast and failed are forgotten, creating a distorted picture of the strategy's effectiveness.

## When It Works vs. When It Fails

The applicability of this philosophy depends heavily on context. The following comparison illustrates where it tends to succeed and where it creates serious problems:

| Factor | Favorable Conditions | Unfavorable Conditions |
|---|---|---|
| Company stage | Early-stage startup seeking product-market fit | Mature company with large, dependent user base |
| User base | Small, tolerant early adopters | Millions of users relying on stability |
| Domain | Consumer social apps, content, entertainment | Healthcare, finance, infrastructure, safety-critical systems |
| Reversibility | Changes are easily rolled back | Breakage causes lasting or irreversible harm |
| Regulatory environment | Lightly regulated or unregulated | Heavily regulated with compliance requirements |
| Team experience | Senior engineers who understand trade-offs | Junior teams who may confuse speed with carelessness |
| Technical debt | Greenfield codebase with minimal legacy | Complex legacy systems with brittle dependencies |

## The Evolution: Move Fast With Stable Infrastructure

Facebook's own pivot away from the original motto is instructive. "Move fast with stable infrastructure" preserves the emphasis on velocity while acknowledging that sustained speed requires investment in reliability. Key elements of this evolved approach include:

- **Automated testing and continuous integration.** Fast deployment depends on automated safeguards that catch regressions before they reach users.
- **Feature flags and gradual rollouts.** New features are shipped to small percentages of users first, limiting the blast radius of problems.
- **Observability and monitoring.** Real-time metrics and alerting allow teams to detect and revert broken changes within minutes rather than days.
- **Defined blast radius.** Teams understand which systems are critical and apply proportionally more caution to changes that affect them.
- **Blameless postmortems.** When things break, the focus is on systemic improvement rather than individual blame, preserving psychological safety while still learning from failures.

## Practical Guidelines for Technology Professionals

Technology professionals can extract value from the move-fast philosophy without adopting it uncritically. The following guidelines help calibrate speed against risk:

- **Classify decisions by reversibility.** Move fast on easily reversible decisions (UI changes, copy, feature experiments). Move deliberately on hard-to-reverse decisions (data model changes, API contracts, security architecture).
- **Invest in deployment infrastructure.** Continuous delivery pipelines, feature flags, and canary deployments let you ship fast while containing risk.
- **Set explicit quality thresholds.** Define what "good enough to ship" means for your context. A prototype for internal testing has different standards than a production release to paying customers.
- **Measure the cost of breakage.** Track incident frequency, mean time to recovery, and user impact. If breakage costs are rising, slow down and invest in stability.
- **Distinguish speed from haste.** Moving fast means eliminating unnecessary process, not skipping necessary diligence. Code review, basic testing, and security checks are not bureaucracy — they are enablers of sustainable speed.

## Related

Technology professionals exploring this topic should also study lean startup methodology, which formalizes rapid experimentation through build-measure-learn cycles. Agile software development and continuous delivery provide the process frameworks that enable sustainable speed. Technical debt management is essential for teams that have moved fast and must now stabilize. Site reliability engineering (SRE) and DevOps practices offer the infrastructure discipline that makes velocity safe at scale. The concept of minimum viable product (MVP) connects directly to the idea of shipping early to learn. Finally, studying engineering ethics and responsible innovation provides the counterbalance that the original motto lacked.

## Summary

"Move fast and break things" captured a genuine insight: that excessive caution and bureaucratic process can be just as damaging to a technology company as recklessness. Speed, iteration, and willingness to fail remain powerful tools for learning and competing. However, the philosophy is not universally applicable and carries serious risks when applied without judgment. The most effective technology organizations have moved beyond the original slogan toward a more nuanced stance — one that preserves urgency and bias toward action while investing in the testing, infrastructure, and ethical reflection needed to move fast without causing unacceptable harm. For individual practitioners, the lesson is to treat velocity as a tool to be calibrated, not a value to be maximized at all costs.

## References

- Zuckerberg, M. (2012). "Letter from Mark Zuckerberg" in Facebook S-1 filing with the U.S. Securities and Exchange Commission. Retrieved from https://www.sec.gov/Archives/edgar/data/1326801/000119312512034517/d287954ds1.htm
- Zuckerberg, M. (2014). Keynote address at F8 Developer Conference, announcing the shift to "Move fast with stable infrastructure."
- Ries, E. (2011). *The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses*. Crown Business.
- Kim, G., Humble, J., Debois, P., & Willis, J. (2016). *The DevOps Handbook: How to Create World-Class Agility, Reliability, & Security in Technology Organizations*. IT Revolution Press.
- Taplin, J. (2017). *Move Fast and Break Things: How Facebook, Google, and Amazon Cornered Culture and Undermined Democracy*. Little, Brown and Company.
- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press.
