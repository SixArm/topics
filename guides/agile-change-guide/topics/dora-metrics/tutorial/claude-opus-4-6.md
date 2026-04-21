# DORA metrics

DORA (DevOps Research and Assessment) metrics are a set of four key performance indicators used to evaluate the effectiveness of software development and delivery processes. Developed by the DORA research team — led by Dr. Nicole Forsgren, Jez Humble, and Gene Kim — these metrics emerged from years of empirical research into what distinguishes high-performing technology organizations from their peers. Google acquired DORA in 2018, and the metrics have since become the industry standard for measuring DevOps and engineering performance. They are central to the annual "Accelerate State of DevOps" reports and provide organizations with an evidence-based framework for continuous improvement.

## The Four DORA Metrics

The DORA framework consists of two metrics focused on throughput (speed of delivery) and two focused on stability (reliability of delivery). Together, they capture the dual goals of shipping fast and shipping safely.

- **Lead Time for Changes**: The elapsed time from when a code commit is made to when that commit is successfully running in production. This encompasses code review, CI pipeline execution, testing, approval processes, and deployment. Shorter lead times indicate streamlined pipelines and fewer bottlenecks.

- **Deployment Frequency**: How often an organization successfully deploys code to production. High deployment frequency signals the ability to deliver value in small, incremental batches, which reduces risk and accelerates feedback loops.

- **Mean Time to Restore (MTTR)**: The average time it takes to recover from a failure or incident in production. This measures an organization's resilience and its ability to detect, triage, and remediate problems quickly.

- **Change Failure Rate**: The percentage of deployments that result in a degraded service, require a rollback, or cause an incident. A low change failure rate indicates mature testing, review, and release practices.

## Performance Benchmarks

The DORA research classifies organizations into four performance tiers. The following table summarizes the benchmarks from recent Accelerate State of DevOps reports.

| Metric | Elite | High | Medium | Low |
|---|---|---|---|---|
| Lead Time for Changes | Less than 1 hour | 1 day to 1 week | 1 week to 1 month | 1 month to 6 months |
| Deployment Frequency | On demand (multiple times per day) | Weekly to monthly | Monthly to every 6 months | Less than once every 6 months |
| Mean Time to Restore | Less than 1 hour | Less than 1 day | 1 day to 1 week | More than 6 months |
| Change Failure Rate | 0–5% | 5–10% | 10–15% | 16–30%+ |

Elite performers consistently demonstrate that speed and stability are not trade-offs — organizations that deploy more frequently also tend to have lower failure rates and faster recovery times.

## Throughput vs. Stability

A key insight of the DORA framework is that throughput and stability reinforce each other rather than being in tension.

| Dimension | Metrics | What It Measures | Key Practices |
|---|---|---|---|
| Throughput | Lead Time for Changes, Deployment Frequency | How quickly and how often value reaches users | Continuous integration, trunk-based development, automated testing, small batch sizes |
| Stability | Mean Time to Restore, Change Failure Rate | How reliably changes are delivered and how fast recovery occurs | Monitoring and observability, incident response processes, feature flags, automated rollbacks |

Organizations that invest in both dimensions simultaneously — rather than prioritizing one at the expense of the other — achieve the highest levels of performance.

## Why DORA Metrics Matter

DORA metrics are valuable because they are outcome-oriented rather than output-oriented. They do not measure lines of code written or story points completed; instead, they measure the actual flow of value to users and the reliability of that delivery. This distinction is important for several reasons.

- **Evidence-based improvement**: Rather than relying on intuition or anecdotal assessments, teams can use DORA metrics to identify specific bottlenecks and measure the impact of process changes over time.

- **Organizational benchmarking**: The performance tiers allow teams to compare themselves against industry benchmarks and set realistic improvement targets.

- **Cultural indicators**: Research from the DORA team has shown strong correlations between high DORA metric performance and positive engineering culture, including psychological safety, low burnout, and high job satisfaction.

- **Business outcomes**: The Accelerate research demonstrates that elite DORA performers are twice as likely to exceed organizational performance goals, including profitability, market share, and productivity.

## How to Measure DORA Metrics

Measuring DORA metrics requires instrumenting the software delivery pipeline. The specific approach depends on an organization's toolchain, but the general strategies are consistent.

- **Lead Time for Changes**: Track timestamps at code commit and at successful production deployment. The difference is the lead time. Most CI/CD platforms can surface this data, and tools like GitHub, GitLab, and Jenkins provide relevant timestamps.

- **Deployment Frequency**: Count the number of successful production deployments over a given period. This can be derived from deployment pipeline logs, release tags, or change management records.

- **Mean Time to Restore**: Integrate with incident management systems to capture the time between incident detection and service restoration. Tools like PagerDuty, Opsgenie, and custom alerting systems provide the necessary data.

- **Change Failure Rate**: Compare the number of deployments that caused incidents or required rollbacks against the total number of deployments. This requires linking deployment records with incident records.

Several platforms now offer built-in DORA metric tracking, including Google Cloud's Four Keys project, LinearB, Sleuth, Jellyfish, and others.

## Common Pitfalls

Adopting DORA metrics is straightforward in concept but requires care in practice.

- **Gaming the metrics**: If teams are evaluated purely on DORA numbers, they may optimize for the metric rather than the outcome — for example, deploying trivial changes to inflate deployment frequency without delivering real value.

- **Ignoring context**: DORA benchmarks are averages across a wide range of organizations. A regulated financial services firm and a consumer mobile app startup face different constraints, and their targets should reflect that.

- **Measuring without acting**: Tracking DORA metrics provides no benefit if the organization does not invest in the practices that improve them, such as test automation, continuous integration, and incident response.

- **Treating metrics as individual performance measures**: DORA metrics are designed to assess team and organizational capability, not individual developer productivity. Using them to evaluate individuals undermines trust and discourages collaboration.

## Related

Topics to explore next include continuous integration and continuous delivery (CI/CD), trunk-based development, site reliability engineering (SRE), the Accelerate book by Nicole Forsgren, Jez Humble, and Gene Kim, DevOps practices and culture, incident management, observability and monitoring, deployment strategies such as blue-green and canary deployments, and the SPACE framework for developer productivity which extends beyond DORA into satisfaction and collaboration dimensions.

## Summary

DORA metrics — lead time for changes, deployment frequency, mean time to restore, and change failure rate — provide a proven, research-backed framework for measuring software delivery performance. They demonstrate that speed and stability are complementary rather than competing goals, and they offer organizations a clear path from low performance to elite performance through incremental investment in engineering practices, automation, and culture. By adopting DORA metrics thoughtfully and acting on the insights they reveal, technology teams can deliver more value to users, respond to failures faster, and build healthier engineering organizations.

## References

- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press.
- Google Cloud DORA Team. "DORA Quick Check." https://dora.dev/quickcheck/
- Google Cloud. "The Four Keys Project." https://github.com/dora-team/fourkeys
- Google Cloud DORA. "Accelerate State of DevOps Reports." https://dora.dev/research/
- Humble, J., & Farley, D. (2010). *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation*. Addison-Wesley.
