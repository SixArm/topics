# The Law of Demos

The Law of Demos, also known as Kapor's Law, is a principle in technology that states: any technology demonstration will eventually fail if it is demonstrated often enough. Coined by Mitch Kapor, co-founder of Lotus Development Corporation, in 1983, this law captures a fundamental truth about the gap between controlled demonstrations and real-world product behavior. For technology professionals, understanding this law is essential for managing stakeholder expectations, designing credible product showcases, and building trust throughout the sales and development lifecycle.

## Origins and Attribution

Mitch Kapor formulated the Law of Demos during the early years of Lotus Development Corporation, which produced the groundbreaking Lotus 1-2-3 spreadsheet. In the early 1980s, the personal computing industry relied heavily on live demonstrations to sell software products to enterprise buyers. Kapor observed that as demos were repeated across sales calls, investor meetings, and trade shows, the probability of something going wrong approached certainty. His observation became an enduring heuristic in the technology industry, frequently referenced in product management, software engineering, and startup culture.

## Why Demos Fail

The Law of Demos rests on a straightforward statistical and environmental reality. Demos are performed in controlled, idealized conditions that cannot be sustained indefinitely. Several factors contribute to inevitable failure:

- **Environmental variability.** Network connectivity, hardware configurations, screen resolutions, and operating system versions differ from venue to venue. A demo that works flawlessly in the office may break on a conference stage.
- **Software fragility.** Demo environments often run on specific builds, feature flags, or hardcoded data. Any drift from the exact conditions under which the demo was rehearsed introduces risk.
- **Human error.** The more times a presenter runs through a demo, the more likely they are to deviate from the script, click the wrong button, or skip a critical setup step.
- **Accumulated probability.** Even if the chance of failure in a single demo is low, repeated demonstrations compound that probability. A demo with a 5% failure rate per showing has roughly a 40% chance of failing within 10 showings and a 92% chance of failing within 50.
- **Audience scrutiny.** Early audiences may be forgiving or unfamiliar with the product. Later audiences often include technical evaluators who probe edge cases and ask harder questions, exposing weaknesses.

## The Controlled Environment Problem

Demos are, by design, artificial. They showcase the best features of a product while suppressing its rough edges. This creates a gap between what the audience sees and what the product actually does in production.

| Aspect | Demo Environment | Real-World Environment |
|---|---|---|
| Data | Curated, clean, minimal | Messy, large-scale, unpredictable |
| Network | Stable, low-latency | Variable, congested, sometimes offline |
| User behavior | Scripted, linear | Exploratory, nonlinear, error-prone |
| Error handling | Hidden or bypassed | Exposed and critical |
| Scale | Single user, small dataset | Concurrent users, enterprise load |
| Configuration | Frozen, known-good build | Diverse, customer-specific setups |

This gap is not dishonest by nature, but it becomes problematic when audiences mistake the demo for a faithful representation of production readiness. The Law of Demos warns that this illusion degrades with repetition.

## Implications for Technology Professionals

The Law of Demos has practical consequences across several roles in a technology organization:

- **Product managers** must set realistic expectations with stakeholders and avoid letting demo-driven enthusiasm outpace actual development progress. A successful demo is not the same as a shipped feature.
- **Sales engineers** need robust fallback plans. If a live demo fails mid-presentation, they should be prepared with recorded backups, architecture diagrams, or sandbox environments that degrade gracefully.
- **Software engineers** should treat demo environments as first-class infrastructure rather than afterthoughts. Flaky demos erode confidence in the engineering team, regardless of the underlying product quality.
- **Startup founders** face particular risk because early-stage companies depend on demos to attract funding and early customers. A failed demo in front of investors can have outsized consequences compared to the same failure at an established enterprise.
- **Executives and decision-makers** should be wary of evaluating products primarily through demos. Demanding proof-of-concept deployments, pilot programs, or trial periods provides a more accurate signal than any staged demonstration.

## Strategies for Mitigating Demo Risk

While the Law of Demos cannot be defeated entirely, its effects can be managed through disciplined preparation and transparency.

- **Acknowledge limitations openly.** Telling the audience what the product does not yet do builds credibility and prevents the disillusionment that Kapor described. Transparency about known issues is a strength, not a weakness.
- **Use recorded segments for fragile workflows.** Hybrid demos that combine live interaction with pre-recorded video for unreliable features reduce the probability of failure without sacrificing engagement.
- **Automate demo setup and teardown.** Scripted environment provisioning ensures that each demo starts from a known-good state, eliminating configuration drift.
- **Rehearse under adverse conditions.** Practice demos on slow networks, low-powered hardware, and unfamiliar displays. If the demo survives degraded conditions, it will handle a conference stage.
- **Limit the number of live demos.** Each additional showing increases cumulative risk. Use demos strategically rather than as a default mode of communication.
- **Build demo resilience into the product itself.** If the product handles errors gracefully in demo mode, it is more likely to handle them gracefully in production. This alignment benefits both the demo and the product.

## Common Anti-Patterns

Technology teams frequently fall into patterns that amplify the risks described by the Law of Demos:

| Anti-Pattern | Description | Consequence |
|---|---|---|
| Demo-driven development | Building features solely to make demos look impressive | Technical debt, fragile architecture |
| The golden path | Only supporting one exact click sequence | Any deviation causes confusion or failure |
| Ignoring the demo environment | Treating demo infrastructure as throwaway | Unpredictable failures during critical moments |
| Over-promising based on demos | Committing to capabilities shown in controlled conditions | Customer disappointment, trust erosion |
| Never updating the demo | Reusing the same demo for months or years | Demo diverges from the actual product |

## Related

Topics to explore next include pitch deck design and delivery, proof of concept versus proof of capability, elevator pitch techniques, minimum viable product strategy, stakeholder management, build-measure-learn methodology, and the broader field of technology product management. Understanding cognitive biases such as the halo effect and confirmation bias also illuminates why demo audiences form overly optimistic impressions.

## Summary

The Law of Demos is a durable principle that every technology professional should internalize. It states that repeated demonstrations of any technology will eventually expose its flaws, because demos operate in controlled environments that cannot perfectly replicate real-world conditions. Rather than treating this law as a source of anxiety, professionals should use it as motivation to build more resilient products, communicate more honestly with stakeholders, and design demonstration strategies that acknowledge limitations alongside strengths. The best defense against the Law of Demos is not a better demo — it is a better product.

## References

- Kapor, Mitch. "Software Design Manifesto." Dr. Dobb's Journal, 1991. Provides context for Kapor's design philosophy and the environment in which the Law of Demos emerged.
- Livingston, Jessica. *Founders at Work: Stories of Startups' Early Days.* Apress, 2007. Includes firsthand accounts of demo failures and their impact on early-stage companies.
- Cagan, Marty. *Inspired: How to Create Tech Products Customers Love.* 2nd ed., Wiley, 2018. Discusses the role of product demos in discovery and the risks of demo-driven development.
- Berkun, Scott. *Making Things Happen: Mastering Project Management.* O'Reilly Media, 2008. Covers presentation and demo strategies in the context of project delivery.
- Brooks, Frederick P. *The Mythical Man-Month.* Addison-Wesley, 1975. While not directly about demos, provides foundational thinking on the gap between software promises and delivery.
