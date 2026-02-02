## Issue Score

Issue scoring is a systematic method for evaluating, prioritizing, and communicating the relative importance of bugs, defects, and other problems in software development and IT operations. A well-designed scoring system enables teams to allocate resources effectively, set stakeholder expectations, and maintain consistent decision-making across projects.

## Why Issue Scoring Matters

Without a structured scoring system, teams often struggle with:

- **Inconsistent prioritization** where similar issues receive vastly different treatment
- **Stakeholder conflicts** when different groups have competing priorities
- **Resource misallocation** as high-impact issues languish while minor ones consume attention
- **Communication breakdowns** when severity descriptions are ambiguous or subjective

A clear scoring framework provides a shared vocabulary and objective criteria for triaging work.

## Common Scoring Systems

Different industries and contexts call for different scoring approaches. The following systems each serve distinct purposes:

| Scoring System | Scale | Best Used For |
|----------------|-------|---------------|
| Priority Rank | 1, 2, 3... (sequential) | Sprint planning, task ordering |
| Severity of Impact | 1-5 (minimal to catastrophic) | Bug triage, incident management |
| Magnitude of Damage | 1-10 (minor to permanent destruction) | Risk assessment, disaster recovery |
| Size Name | Small, Medium, Large | Estimation, workload balancing |
| Harm Grade | No Harm to Fatal | Healthcare, safety-critical systems |
| Danger Level | A-E (Catastrophic to No Effect) | Aviation, regulated industries |
| MoSCoW | Must, Should, Could, Won't | Requirements prioritization |
| Frequency Rate | 1%-100% of users affected | Impact analysis, rollout decisions |

## Priority Rank

Priority rank assigns sequential numbers indicating the order in which issues should be addressed. This system works like a to-do list where position determines action sequence.

**Characteristics:**
- Simple and unambiguous ordering
- Forces explicit trade-offs between competing items
- Requires re-ranking when new issues emerge
- Works best for small, focused backlogs

**Typical Application:** A development team ranks their sprint backlog so that issue #1 is tackled before issue #2, ensuring clear execution order.

## Severity of Impact

Severity scoring rates issues on a graduated scale from minimal disruption to catastrophic failure. This approach borrows from hurricane classification systems.

| Level | Label | Description |
|-------|-------|-------------|
| 1 | Minimal | Cosmetic issues, minor inconvenience |
| 2 | Moderate | Functionality degraded but workarounds exist |
| 3 | Extensive | Significant feature impairment |
| 4 | Extreme | Major system functionality compromised |
| 5 | Catastrophic | Complete system failure or data loss |

**Best Practice:** Define concrete criteria for each level specific to your product or service to prevent subjective interpretation.

## Magnitude of Damage

This 1-10 scale measures the extent of harm an issue can cause, similar to earthquake magnitude measurements. Higher numbers indicate increasingly permanent or irreversible damage.

**When to Use:**
- Assessing potential data corruption or loss
- Evaluating infrastructure failures
- Planning disaster recovery priorities

The logarithmic nature of this scale means each increment represents substantially greater impact than the previous level.

## Size Name Classification

T-shirt sizing (Small, Medium, Large) provides a quick, intuitive way to categorize issues without false precision.

| Size | Typical Meaning |
|------|-----------------|
| Small | Quick fix, minimal testing required |
| Medium | Moderate effort, standard testing |
| Large | Significant work, extensive testing |

**Advantages:**
- Easy for non-technical stakeholders to understand
- Reduces analysis paralysis
- Works well for initial triage before detailed estimation

## Harm Grade

Borrowed from medical and pharmaceutical regulations, harm grading focuses on human impact:

- **No Harm:** Issue causes no adverse effects
- **Low Harm:** Minor discomfort or inconvenience
- **Moderate Harm:** Temporary impairment or significant inconvenience
- **Severe Harm:** Serious injury or major operational disruption
- **Fatal:** Loss of life or complete organizational failure

This system is essential for healthcare technology, medical devices, and safety-critical applications where human welfare is directly at stake.

## Danger Level (Aviation Model)

Aircraft regulations use letter grades to classify hazard severity:

| Level | Classification | Criteria |
|-------|----------------|----------|
| A | Catastrophic | Complete failure, loss of life possible |
| B | Hazardous | Large reduction in safety margins |
| C | Major | Significant reduction in capabilities |
| D | Minor | Slight reduction in safety |
| E | No Effect | No impact on operations |

This framework suits industries where regulatory compliance demands rigorous hazard classification.

## MoSCoW Requirements

MoSCoW prioritization categorizes issues by necessity rather than severity:

- **Must:** Non-negotiable requirements; the system fails without them
- **Should:** Important but not critical; workarounds are acceptable
- **Could:** Desirable enhancements if time and resources permit
- **Won't:** Explicitly out of scope for the current iteration

**Application:** Product teams use MoSCoW during roadmap planning to balance stakeholder requests against available capacity.

## Frequency Rate

Frequency scoring quantifies how many users or transactions are affected by an issue:

- **1% Frequency:** Edge case affecting a small subset
- **50% Frequency:** Widespread impact on typical usage
- **100% Frequency:** Universal issue affecting all users

This metric is often combined with severity to calculate overall risk. A moderate-severity issue affecting 100% of users may warrant higher priority than a catastrophic issue affecting 0.1% of users.

## Combining Scoring Systems

Mature organizations often use multiple scoring dimensions together:

| Dimension | Question Answered |
|-----------|-------------------|
| Severity | How bad is the impact? |
| Frequency | How many are affected? |
| Priority | When should we fix it? |
| Effort (Size) | How long will the fix take? |

**Risk Score Formula:** Many teams calculate a composite risk score:

Risk = Severity × Frequency

This product helps identify issues that are both severe and widespread, enabling data-driven prioritization.

## Choosing the Right System

Select a scoring system based on your context:

- **Startup with small team:** Priority Rank or Size Name for simplicity
- **Enterprise with compliance needs:** Danger Level or Harm Grade for audit trails
- **Product company balancing features and bugs:** MoSCoW combined with Severity
- **Incident response team:** Severity of Impact with Frequency Rate

## Implementation Recommendations

- **Document definitions clearly** so all team members apply scores consistently
- **Calibrate regularly** by reviewing past scores and adjusting criteria
- **Limit score options** to prevent granularity that creates false precision
- **Automate where possible** by integrating scoring into your issue tracker
- **Review and adjust** as your product and team mature

## Summary

Issue scoring transforms subjective opinions about problem importance into structured, repeatable assessments. By selecting the appropriate system for your context—whether priority ranks, severity levels, or regulatory classifications—you enable faster triage, clearer communication, and better resource allocation across your technology organization.
