# Net Promoter Score (NPS): Tutorial

## Overview

Net Promoter Score (NPS) is a widely used metric for measuring customer loyalty and satisfaction. It reduces the complexity of customer sentiment to a single question: "How likely are you to recommend our product/service to a friend or colleague?" Respondents answer on a scale of 0-10.

## How NPS Works

### The Question

NPS is built on one question with a 0-10 scale, where 0 means "not at all likely" and 10 means "extremely likely."

### The Three Categories

Respondents are grouped into three categories based on their score:

- **Promoters (9-10)**: Highly satisfied customers who actively recommend your product. They are your most valuable customers—loyal, enthusiastic, and likely to generate referrals.
- **Passives (7-8)**: Satisfied but unenthusiastic customers. They are not dissatisfied, but they are vulnerable to competitive offerings and unlikely to actively promote your product.
- **Detractors (0-6)**: Dissatisfied customers who may damage your brand through negative word-of-mouth. They are at high risk of churning.

### The Calculation

NPS = % Promoters - % Detractors

The score ranges from -100 (every respondent is a detractor) to +100 (every respondent is a promoter).

### Example

If 100 customers respond:
- 50 give scores of 9-10 (Promoters): 50%
- 30 give scores of 7-8 (Passives): not included in calculation
- 20 give scores of 0-6 (Detractors): 20%

NPS = 50% - 20% = +30

## Interpreting NPS Scores

- **Above 0**: More promoters than detractors (generally positive)
- **Above 30**: Strong performance
- **Above 50**: Excellent performance
- **Above 70**: World-class performance

Scores vary significantly by industry. Compare against industry benchmarks rather than absolute thresholds.

## Using NPS in Agile Teams

### Connecting Development to Customer Impact

NPS provides a direct signal about whether the software the team is building is making customers more or less satisfied. Tracking NPS over time reveals whether product decisions are moving in the right direction.

### Informing Prioritization

- A declining NPS signals that the team should investigate and address customer pain points
- Specific feedback from detractors can reveal features or quality issues that should be prioritized
- Feedback from promoters reveals what the team should continue and expand

### Sprint-Level Integration

- Review NPS trends during sprint planning to inform priority decisions
- Include NPS-related findings in sprint review discussions
- Use detractor feedback to generate user stories for improvement

## Strengths of NPS

- **Simple to implement**: One question is easy to deploy and easy for customers to answer
- **Easy to track over time**: A single number enables straightforward trend analysis
- **Benchmarkable**: Industry benchmarks allow comparison with competitors
- **Action-oriented**: The three categories (promoter, passive, detractor) suggest clear action: convert passives to promoters, address detractor concerns

## Limitations of NPS

- **Oversimplifies sentiment**: A single number cannot capture the full complexity of customer experience
- **Cultural bias**: Response patterns vary by culture; some cultures are less likely to give extreme scores
- **No diagnostic detail**: NPS tells you that customers are unhappy but not why. Always pair NPS with follow-up questions.
- **Timing sensitivity**: When and how you ask affects results. Post-purchase NPS differs from relationship NPS.
- **Gaming risk**: If teams are incentivized on NPS scores, they may selectively survey satisfied customers

## Practical Steps

1. **Implement NPS surveys regularly**: Quarterly or after key interactions (e.g., after a support case, after a major release)
2. **Always include a follow-up question**: "What is the most important reason for your score?" This provides the diagnostic detail that the score alone lacks.
3. **Segment results**: Break NPS down by customer segment, product area, or user persona to identify specific improvement opportunities.
4. **Act on feedback**: Close the loop with detractors by addressing their concerns. Recognize what promoters value and protect it.
5. **Combine with other metrics**: Use NPS alongside usage analytics, support ticket analysis, and qualitative research for a complete picture.

## Key Takeaway

NPS is a useful, accessible metric for tracking customer loyalty over time, but it is most valuable when combined with qualitative feedback and other metrics. Use it as a signal that prompts investigation and action, not as a standalone measure of product success.
