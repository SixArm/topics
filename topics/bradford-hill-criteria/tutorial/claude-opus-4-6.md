# Bradford-Hill criteria

The Bradford-Hill criteria are a set of nine principles used to evaluate whether an observed association between an exposure and an outcome is likely to be causal. Originally proposed by British epidemiologist Sir Austin Bradford Hill in his landmark 1965 paper "The Environment and Disease: Association or Causation?", these criteria have become foundational tools in epidemiology, public health, and evidence-based decision-making. For technology professionals, the Bradford-Hill criteria are increasingly relevant in domains such as data science, machine learning model validation, A/B testing, root cause analysis, and any discipline where distinguishing correlation from causation is critical.

## Why Causation Matters in Technology

Technology professionals regularly encounter situations where correlation masquerades as causation. A deployment coincides with a spike in latency. A feature release correlates with increased churn. A security patch appears to reduce incident rates. Without a structured framework for evaluating causal claims, teams risk making costly decisions based on spurious associations. The Bradford-Hill criteria provide that framework: a disciplined, evidence-based checklist for interrogating whether an observed relationship is genuinely causal or merely coincidental.

## The Nine Criteria

The Bradford-Hill criteria are not a rigid checklist where every item must be satisfied. They are guidelines that, taken together, help an analyst build or undermine a case for causation. The more criteria that are met, the stronger the inference.

| Criterion | Core Question | Example in Technology Context |
|---|---|---|
| Strength of Association | How large is the effect? | A configuration change produces a 10x increase in error rate, not a marginal uptick. |
| Consistency | Is the effect reproducible? | The same performance degradation appears across staging, production, and multiple regions. |
| Specificity | Does the cause map to a particular effect? | A specific API endpoint, not the entire service, degrades after a schema migration. |
| Temporality | Does the cause precede the effect? | Latency spikes begin precisely after a deployment, not before. |
| Biological Gradient | Is there a dose-response relationship? | Higher traffic volumes to a misconfigured service produce proportionally more failures. |
| Plausibility | Is there a believable mechanism? | A known race condition in the code explains the intermittent deadlock. |
| Coherence | Does the explanation fit existing knowledge? | The failure pattern aligns with documented behavior of the underlying database engine. |
| Experimental Evidence | Can the effect be demonstrated through controlled experiment? | Rolling back the change eliminates the problem; redeploying it reproduces it. |
| Analogy | Are there parallel cases? | A similar microservice experienced the same failure mode under comparable conditions last quarter. |

## Strength of Association

The stronger the statistical association between an exposure and an outcome, the more likely the relationship is causal. A weak association does not rule out causation, but a strong one makes alternative explanations harder to sustain. In technology, this translates directly: if a code change is associated with a 500% increase in error rates rather than a 2% fluctuation, the case for causation is substantially stronger. Analysts should quantify effect sizes rigorously rather than relying on qualitative impressions.

## Consistency

A causal relationship should be observable across different contexts, populations, and conditions. If a software defect causes failures in one environment but not in any other, the causal claim is weaker and warrants further investigation. Consistency is particularly important in distributed systems, where behavior can vary across regions, hardware configurations, and network conditions. Reproducing an issue across multiple independent environments significantly strengthens the causal argument.

## Specificity

Specificity asks whether a particular cause leads to a particular effect. In epidemiology, a toxin that causes one specific disease is more convincingly causal than one associated with dozens of unrelated conditions. In technology, specificity means isolating the scope of impact. If a database index change degrades performance for exactly the queries that use that index, the specificity of the relationship supports causation. However, Bradford Hill himself cautioned against over-relying on this criterion, since many causes have multiple effects.

## Temporality

Temporality is the one criterion that Bradford Hill considered non-negotiable. The cause must precede the effect. No amount of statistical association matters if the timeline does not support it. In incident analysis, this means establishing precise timestamps: deployment logs, monitoring dashboards, and event streams must confirm that the suspected cause occurred before the observed outcome. Reverse causation, where the effect actually drives the supposed cause, is a common pitfall.

## Biological Gradient (Dose-Response)

A dose-response relationship means that increasing the exposure increases the effect. In technology, this manifests as load-dependent failures, where increasing traffic to a misconfigured service produces proportionally more errors. It also applies in security: more aggressive scanning produces more detected vulnerabilities. The presence of a gradient strengthens the causal case because it is difficult to explain a smooth, monotonic relationship through confounding alone.

## Plausibility

The proposed causal mechanism should be believable given current knowledge. A claim that a CSS change caused a database corruption is implausible on its face. A claim that a connection pool misconfiguration caused database timeouts under load is highly plausible. Plausibility is inherently limited by the state of current knowledge; genuinely novel failure modes may initially seem implausible. Analysts should be open-minded but appropriately skeptical.

## Coherence

Coherence extends plausibility by asking whether the causal claim fits with the broader body of existing knowledge. The proposed explanation should not contradict established facts about how the system works. If a team claims that adding memory to a server caused it to run slower, the claim conflicts with general understanding of memory and performance, and requires extraordinary evidence. Coherence provides a sanity check against explanations that, while locally plausible, are globally inconsistent.

## Experimental Evidence

Controlled experiments provide the strongest evidence for causation. In technology, this includes A/B tests, canary deployments, feature flag toggles, and rollback-then-redeploy cycles. If toggling a feature flag on and off reliably produces and eliminates a symptom, the experimental evidence for causation is compelling. Observational evidence from logs and metrics is valuable but cannot match the inferential power of a well-designed experiment.

## Analogy

Analogy draws on precedent. If a similar system experienced a similar failure under similar conditions, the causal claim gains credibility. Post-incident reviews, knowledge bases, and cross-team communication are the mechanisms through which analogy operates in technology organizations. While analogy alone is weak evidence, it can usefully direct investigation and corroborate findings from other criteria.

## Applying the Criteria in Practice

The Bradford-Hill criteria are best used as a structured reasoning framework rather than a scoring rubric. When evaluating a causal claim:

- **Gather evidence systematically.** Collect data relevant to each criterion before forming a conclusion.
- **Weigh the criteria collectively.** No single criterion is sufficient or necessary (except temporality). The overall pattern matters.
- **Document your reasoning.** Record which criteria are satisfied, which are not, and why. This creates an audit trail for decision-making.
- **Iterate as evidence evolves.** Initial assessments may change as new data emerges. Treat causal inference as a living process.

## Common Pitfalls

- **Treating the criteria as a binary checklist.** Meeting five of nine criteria does not mechanically prove causation. The criteria require judgment, not arithmetic.
- **Ignoring temporality.** Teams under pressure to resolve incidents sometimes skip rigorous timeline analysis, leading to incorrect root cause attribution.
- **Confusing plausibility with proof.** A plausible mechanism is necessary but not sufficient. Plausibility must be supported by empirical evidence.
- **Neglecting confounders.** An association that meets several criteria can still be non-causal if a confounding variable explains the relationship. Always consider alternative explanations.

## Related

Professionals interested in the Bradford-Hill criteria should explore related topics including correlation versus causation, causal inference methods such as Granger causality and Bayesian networks, root cause analysis frameworks like the five whys analysis and cause-and-effect diagrams, A/B testing and experimental design, statistical significance and p-values, confounding variables and Simpson's paradox, observational study design, and the scientific method as applied to software engineering and site reliability engineering.

## Summary

The Bradford-Hill criteria provide a rigorous, time-tested framework for evaluating whether an observed association is likely to be causal. Originally developed for epidemiology, these nine principles, strength, consistency, specificity, temporality, dose-response, plausibility, coherence, experimental evidence, and analogy, translate directly to technology disciplines including incident analysis, data science, product experimentation, and security investigation. By systematically applying these criteria, technology professionals can move beyond intuition and correlation to make evidence-based causal claims that withstand scrutiny.

## References

- Hill, A.B. (1965). "The Environment and Disease: Association or Causation?" *Proceedings of the Royal Society of Medicine*, 58(5), 295-300.
- Fedak, K.M., Bernal, A., Capshaw, Z.A., & Gross, S. (2015). "Applying the Bradford Hill criteria in the 21st century: how data integration has changed causal inference in molecular epidemiology." *Emerging Themes in Epidemiology*, 12, 14.
- Rothman, K.J., & Greenland, S. (2005). "Causation and Causal Inference in Epidemiology." *American Journal of Public Health*, 95(S1), S144-S150.
- Pearl, J. (2009). *Causality: Models, Reasoning, and Inference* (2nd ed.). Cambridge University Press.
- Hernán, M.A. (2018). "The C-Word: Scientific Euphemisms Do Not Improve Causal Inference From Observational Data." *American Journal of Public Health*, 108(5), 616-619.
