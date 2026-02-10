# Card sorting

Card sorting is a user research technique rooted in information architecture and user experience design. It reveals how real users mentally categorize and organize content, providing empirical evidence for structuring navigation, labels, and hierarchies in digital products. Rather than relying on assumptions about how information should be arranged, card sorting puts the decision in the hands of target users, making it one of the most cost-effective and reliable methods for building intuitive information architectures. The technique is widely used by UX designers, product managers, information architects, and software engineers who want to ensure that their systems reflect how people actually think.

## How card sorting works

A card sorting exercise follows a structured process. A researcher prepares a set of cards, each representing a single concept, feature, content item, or piece of information. These cards can be physical index cards or digital representations in specialized software. Participants are then asked to organize these cards into groups that make sense to them, based on their own understanding of the relationships between items. The researcher observes the process, takes notes on grouping decisions and rationale, and collects data on emerging patterns. After the exercise, the researcher analyzes the results to identify common groupings, outliers, and insights that inform the design of navigation structures, taxonomies, and content organization.

## Types of card sorting

There are three primary types of card sorting, each suited to different stages of the design process and different research questions.

| Type | Description | Best used when |
|------|-------------|----------------|
| **Open card sort** | Participants create their own categories and assign cards to them. They may also label the categories. | You are designing a new information architecture from scratch and want to discover users' natural mental models. |
| **Closed card sort** | Participants sort cards into predefined categories provided by the researcher. | You are validating or testing an existing information architecture or evaluating whether proposed categories make sense to users. |
| **Hybrid card sort** | Participants sort cards into predefined categories but can also create new categories if needed. | You want to test an existing structure while remaining open to discovering gaps or misalignments. |

Open sorting is exploratory and generative. Closed sorting is evaluative and confirmatory. Hybrid sorting bridges the two, offering flexibility without sacrificing structure.

## When to use card sorting

Card sorting is most valuable at specific points in the product development lifecycle:

- **Early discovery phase**: When defining the information architecture for a new product, website, or application.
- **Redesign efforts**: When restructuring navigation or content organization for an existing system that shows usability problems.
- **Content strategy**: When a large volume of content needs to be organized into a coherent taxonomy.
- **Label validation**: When testing whether category names and labels are meaningful and intuitive to users.
- **Merging systems**: When combining content or features from multiple products into a single unified interface.

Card sorting is less useful for validating task flows, measuring performance, or testing visual design. For those goals, techniques like usability testing, tree testing, or A/B testing are more appropriate.

## Conducting a card sorting session

A well-run card sorting session requires deliberate preparation and clear facilitation.

**Preparation**: Select 30 to 100 cards representing the content or concepts you want to test. Fewer than 30 may not produce meaningful patterns; more than 100 can fatigue participants. Write each card label in clear, concise language. Avoid jargon unless your audience uses it daily.

**Recruitment**: Recruit 15 to 30 participants who represent your target user population. Research shows that approximately 15 participants are sufficient to identify the dominant organizational patterns, though larger samples increase statistical confidence.

**Facilitation**: Give participants simple, neutral instructions. Avoid leading language that suggests a preferred grouping. Allow participants to create as many or as few groups as they wish. Encourage them to think aloud if conducting moderated sessions, as the rationale behind groupings is often as valuable as the groupings themselves.

**Duration**: Most card sorting sessions take 15 to 45 minutes, depending on the number of cards and the complexity of the domain.

## Moderated versus unmoderated sessions

| Aspect | Moderated | Unmoderated |
|--------|-----------|-------------|
| **Facilitator presence** | A researcher guides the session in real time | Participants complete the exercise independently |
| **Qualitative insight** | Rich think-aloud data and follow-up questions | Limited to final card placements and optional comments |
| **Scale** | Typically 5 to 15 participants | Can scale to hundreds of participants |
| **Cost and logistics** | Higher cost, more scheduling complexity | Lower cost, easier to distribute |
| **Best for** | Exploratory research, complex domains | Validation, large-sample pattern detection |

Moderated sessions are ideal when you need to understand the "why" behind participant decisions. Unmoderated sessions are better for collecting large data sets efficiently, particularly when using online card sorting tools.

## Tools for card sorting

Several software platforms support digital card sorting exercises:

- **OptimalSort** (by Optimal Workshop): One of the most widely used card sorting platforms, supporting open, closed, and hybrid sorts with built-in analysis tools including dendrograms and similarity matrices.
- **UserZoom**: An enterprise UX research platform that includes card sorting alongside other research methods.
- **Maze**: A product research platform that supports card sorting as part of a broader testing suite.
- **UXtweak**: Offers card sorting with real-time analytics and participant recruitment features.
- **Physical cards**: Index cards, sticky notes, or printed labels remain effective for in-person sessions, particularly in workshop settings.

For teams on a budget, spreadsheets or collaborative whiteboard tools such as Miro or FigJam can serve as lightweight alternatives.

## Analyzing card sorting results

Analysis transforms raw sorting data into actionable design decisions. Key analytical techniques include:

- **Similarity matrix**: A grid showing how frequently pairs of cards were grouped together across all participants. High similarity scores between two cards suggest they belong in the same category.
- **Dendrogram (cluster analysis)**: A hierarchical tree diagram generated from the similarity matrix, showing how cards cluster together at different levels of similarity. This helps identify natural category boundaries.
- **Category frequency analysis**: For open sorts, examining the labels participants assigned to their groups reveals common naming conventions and preferred terminology.
- **Standardization grid**: A table that maps each card against each category, showing the percentage of participants who placed a given card in a given category. This highlights consensus and ambiguity.
- **Outlier analysis**: Identifying cards that participants consistently struggled to place, which may indicate unclear labels, overlapping concepts, or content that does not fit the current scope.

A practical threshold is that if 60 percent or more of participants place a card in the same category, you have strong evidence for that placement. Cards with no clear majority grouping warrant further investigation or redesign.

## Common pitfalls

- **Too many cards**: Overloading participants with more than 80 to 100 cards leads to fatigue, rushed decisions, and unreliable data.
- **Ambiguous card labels**: Vague or technical labels confuse participants and produce noisy results. Pilot test your card labels before running sessions.
- **Leading instructions**: Suggesting how cards should be grouped biases results and undermines the purpose of the exercise.
- **Small sample size**: Fewer than 10 participants may not reveal stable patterns. Aim for at least 15.
- **Ignoring qualitative data**: Focusing solely on statistical patterns without considering participant rationale misses important contextual insights.
- **Treating results as prescriptive**: Card sorting reveals user preferences and tendencies, not absolute truths. Results should inform design decisions alongside other research methods and business requirements.

## Card sorting versus tree testing

Card sorting and tree testing are complementary techniques that address different questions. Card sorting asks users to build or validate a structure from the bottom up. Tree testing asks users to navigate a proposed structure from the top down to find specific items. Used together, they form a robust process: card sorting generates the structure, and tree testing validates whether users can successfully navigate it.

| Dimension | Card sorting | Tree testing |
|-----------|-------------|--------------|
| **Direction** | Bottom-up (users create structure) | Top-down (users navigate structure) |
| **Purpose** | Generate or validate categories | Validate findability and navigation paths |
| **Input** | Unstructured content items | A proposed hierarchy or site map |
| **Output** | Category groupings and labels | Task success rates and navigation paths |
| **Stage** | Early design | After initial structure is proposed |

## Related

Topics to explore next include information architecture for understanding how card sorting results feed into structural design, tree testing for validating the navigation hierarchies that card sorting produces, mental models for the cognitive science behind how users organize knowledge, heuristic evaluation for expert-based assessment of information structures, usability testing for observing how users interact with implemented designs, affinity diagrams for a related collaborative grouping technique, and content strategy for managing the lifecycle of the content that card sorting helps organize.

## Summary

Card sorting is a foundational user research method that uncovers how people naturally group and label information, providing direct evidence for designing intuitive navigation, taxonomies, and content structures. By choosing the right type of sort, recruiting representative participants, and applying rigorous analysis techniques such as similarity matrices and dendrograms, technology professionals can build information architectures grounded in real user behavior rather than organizational assumptions. When paired with tree testing and usability testing, card sorting forms part of a comprehensive, evidence-based approach to designing systems that people can actually use.

## References

- Spencer, D. (2009). *Card Sorting: Designing Usable Categories*. Rosenfeld Media. A comprehensive guide dedicated entirely to card sorting methodology and analysis.
- Rosenfeld, L., Morville, P., & Arango, J. (2015). *Information Architecture: For the Web and Beyond* (4th ed.). O'Reilly Media. Covers card sorting as a core technique within information architecture practice.
- Nielsen, J. (2004). "Card Sorting: How Many Users to Test." Nielsen Norman Group. https://www.nngroup.com/articles/card-sorting-how-many-users-to-test/
- Optimal Workshop. "Card Sorting 101." https://www.optimalworkshop.com/learn/card-sorting-101/
- Spencer, D. & Warfel, T. (2004). "Card Sorting: A Definitive Guide." Boxes and Arrows. https://boxesandarrows.com/card-sorting-a-definitive-guide/
- Righi, C., James, J., Beasley, M., et al. (2013). "Card Sort Analysis Best Practices." *Journal of Usability Studies*, 8(3), 69–89.
- U.S. Department of Health and Human Services. "Card Sorting." Usability.gov. https://www.usability.gov/how-to-and-tools/methods/card-sorting.html
