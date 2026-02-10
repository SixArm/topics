# ADKAR change management model

The ADKAR change management model is a goal-oriented framework developed by Prosci, a leading provider of change management research and methodology. ADKAR is an acronym representing five sequential outcomes an individual must achieve for organizational change to succeed: Awareness, Desire, Knowledge, Ability, and Reinforcement. Unlike models that focus primarily on organizational-level transformation, ADKAR centers on the individual, recognizing that organizational change only happens when each person affected by the change transitions successfully. For technology professionals, who frequently navigate shifting platforms, methodologies, toolchains, and workflows, ADKAR provides a structured and repeatable approach to leading or participating in change initiatives.

## Origins and purpose

The ADKAR model was created by Jeff Hiatt, founder of Prosci, and first published in his 2006 book *ADKAR: A Model for Change in Business, Government, and Our Society*. Hiatt developed the model after studying change patterns across hundreds of organizations and identifying that individual transitions are the fundamental unit of organizational change. Prosci's research, which now spans data from thousands of organizations across multiple decades, consistently reinforces that projects with effective change management are significantly more likely to meet objectives on time and on budget. ADKAR distills this research into a practical, actionable sequence that change leaders and practitioners can apply at every level.

## The five elements of ADKAR

Each element of ADKAR represents a milestone that must be reached in order. Skipping or under-investing in any element undermines the entire change effort.

### Awareness

Awareness is the first building block. It answers the question: *Why is this change happening?* Individuals must understand the nature of the change, the business or technical reasons driving it, and the risks of not changing. In technology contexts, this might mean communicating why the organization is migrating from a monolithic architecture to microservices, or why a legacy system is being retired. Without sufficient awareness, people default to the status quo and resist initiatives they do not understand.

Key activities that build awareness include executive sponsorship communications, team briefings, internal documentation, and one-on-one conversations with affected stakeholders.

### Desire

Desire addresses willingness. Even when people understand the reasons for a change, they may not want to participate. Desire is inherently personal and influenced by factors such as an individual's perception of benefit, their trust in leadership, their fear of the unknown, and the organizational culture. Leaders cannot mandate desire; they must cultivate it through compelling vision, honest dialogue, addressing concerns, and demonstrating personal commitment to the change.

For technology teams, desire often hinges on whether engineers and practitioners see the change as an improvement to their daily work or as unnecessary overhead imposed from above.

### Knowledge

Knowledge provides the information, training, and education needed to change. It answers the question: *How do I change?* This includes understanding new processes, learning new tools, acquiring certifications, or developing entirely new competencies. Knowledge must be delivered at the right time, after awareness and desire are established, because training people who do not understand the reasons for or do not want to participate in the change is ineffective.

In technology organizations, knowledge-building activities include hands-on workshops, documentation, pair programming sessions, sandbox environments for experimentation, and mentorship programs.

### Ability

Ability is the demonstrated capacity to implement the change in practice. Knowledge and ability are distinct: a person may know how a new CI/CD pipeline works in theory but still struggle to use it effectively under real project conditions. Ability requires time, practice, coaching, and access to the right tools and resources. Barriers to ability include inadequate tooling, insufficient time allocation, competing priorities, and gaps between training content and actual work scenarios.

Technology leaders support ability by providing realistic practice environments, allocating dedicated transition time, assigning coaches or buddies, and removing systemic obstacles.

### Reinforcement

Reinforcement ensures the change sticks. Without it, individuals revert to old behaviors and the organization loses its investment. Reinforcement includes recognition, rewards, feedback mechanisms, performance measurement, and cultural signals that the new way of working is the expected standard. It also involves corrective action when regression occurs.

For technology teams, reinforcement might take the form of updated code review standards, automated enforcement through linting or pipeline gates, retrospectives that celebrate adoption milestones, and visible leadership support over time.

## ADKAR elements at a glance

| Element | Core Question | Goal | Common Barriers |
|---|---|---|---|
| Awareness | Why is this change needed? | Understanding of the reasons and urgency for change | Lack of communication, unclear rationale, information silos |
| Desire | Do I want to participate? | Personal motivation and willingness to engage | Fear of the unknown, loss of control, low trust in leadership |
| Knowledge | How do I change? | Skills, processes, and information required | Inadequate training, poor documentation, wrong timing |
| Ability | Can I perform effectively? | Demonstrated capability in the new environment | Insufficient practice, missing tools, competing priorities |
| Reinforcement | Will the change last? | Sustained adoption and cultural integration | No recognition, lack of accountability, leadership turnover |

## Applying ADKAR in technology organizations

Technology professionals encounter change constantly: new programming languages, cloud migrations, agile transformations, security mandates, organizational restructurings, and toolchain overhauls. ADKAR provides a diagnostic lens for understanding why change initiatives stall and a prescriptive framework for addressing gaps.

**Diagnosing barrier points.** When a change effort is struggling, ADKAR helps pinpoint where the breakdown is occurring. If a team resists adopting a new deployment process, the issue might be at the awareness level (they do not understand why it matters), the desire level (they see it as bureaucratic friction), or the ability level (the new tooling is unreliable). Each diagnosis leads to a different intervention.

**Sequencing interventions.** ADKAR enforces a logical sequence. Providing Kubernetes training (knowledge) before teams understand why containerization matters (awareness) and before they are motivated to learn (desire) wastes resources and breeds cynicism. ADKAR prevents this by requiring each element to be addressed in order.

**Scaling across teams.** Different individuals and teams progress through ADKAR at different rates. A platform engineering team may already have strong awareness and desire for a cloud-native migration while application teams are still at the awareness stage. ADKAR allows change leaders to tailor their approach to each group rather than applying a one-size-fits-all strategy.

## ADKAR compared to other change models

| Model | Focus | Strengths | Limitations |
|---|---|---|---|
| ADKAR (Prosci) | Individual change outcomes | Actionable, diagnostic, measurable per person | Less emphasis on organizational structure and politics |
| Kotter's 8-Step Model | Organizational leadership actions | Strong on vision and coalition building | Top-down, less granular at the individual level |
| Lewin's Change Model | Unfreeze-Change-Refreeze phases | Simple and intuitive | Oversimplified for complex, continuous change |
| Bridges' Transition Model | Psychological transitions | Addresses emotional dimensions of change | Less prescriptive on practical implementation steps |
| McKinsey 7-S Framework | Organizational alignment | Holistic view of strategy, structure, systems | Diagnostic rather than action-oriented |

ADKAR is often used in combination with these models. For example, an organization might use Kotter's model for the overall organizational change strategy while using ADKAR to manage individual transitions within that broader effort.

## Common pitfalls

- **Skipping awareness and desire.** Technology leaders often jump straight to training, assuming technical competence is the only barrier. This leads to well-trained but unmotivated teams.
- **Treating change as a single event.** Change is a process, not a launch date. Each ADKAR element requires sustained attention, especially reinforcement.
- **Ignoring middle management.** Direct managers have the greatest influence on desire and reinforcement for their teams. Bypassing them undermines adoption.
- **Assuming uniformity.** Different roles, teams, and individuals are at different points in the ADKAR progression. Effective change management requires segmentation and tailored approaches.
- **Neglecting reinforcement.** Organizations frequently celebrate go-live and then move on, allowing old habits to reassert themselves within weeks.

## Measuring progress with ADKAR

ADKAR lends itself to measurement because each element can be assessed on a simple scale, typically 1 to 5, for each individual or group. Prosci recommends identifying the lowest-scoring element as the "barrier point" and focusing intervention there before moving forward. This creates a feedback loop:

- **Assess** each individual or team across all five elements
- **Identify** the barrier point (the first element scoring below the threshold)
- **Intervene** with targeted activities to raise that element
- **Reassess** and iterate

This diagnostic approach transforms change management from a vague organizational aspiration into a measurable, improvable practice, much like how technology teams apply metrics to software delivery performance.

## Related

Related topics to explore include Kotter's 8-Step Change Model for a complementary organizational-level framework, Lewin's Change Model for foundational change theory, enterprise change management for scaling change practices across large organizations, organizational culture for understanding the environment in which change occurs, stakeholder analysis for identifying and segmenting affected populations, agile transformation for applying change management to methodology shifts, and continuous improvement practices such as Kaizen and Plan-Do-Check-Act that sustain momentum after initial adoption.

## Summary

The ADKAR change management model provides technology professionals with a structured, individual-focused approach to navigating organizational change. By sequentially addressing Awareness, Desire, Knowledge, Ability, and Reinforcement, ADKAR ensures that change efforts target the right barriers at the right time. Its diagnostic capability makes it particularly valuable in technology environments where change is constant and the temptation to skip directly to technical training is strong. When applied with discipline, ADKAR transforms change from a source of friction into a repeatable, measurable organizational capability.

## References

- Hiatt, Jeff. *ADKAR: A Model for Change in Business, Government, and Our Society*. Prosci Learning Center Publications, 2006.
- Prosci. "The Prosci ADKAR Model." https://www.prosci.com/methodology/adkar
- Prosci. "Best Practices in Change Management." Prosci Benchmarking Report, 12th Edition, 2022.
- Hiatt, Jeff and Creasey, Timothy J. *Change Management: The People Side of Change*. Prosci Learning Center Publications, 2012.
- Kotter, John P. *Leading Change*. Harvard Business Review Press, 2012.
