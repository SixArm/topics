# The Design of Everyday Things by Donald Norman

"The Design of Everyday Things" is a landmark book by Donald Norman, a cognitive scientist and usability engineer, originally published in 1988 under the title "The Psychology of Everyday Things." The revised and expanded edition, published in 2013, remains one of the most influential texts in the fields of human-computer interaction, industrial design, and user experience. Norman argues that when people have difficulty using products, the fault lies not with the user but with the design. The book provides a rigorous framework for understanding why some designs are intuitive and pleasurable while others are confusing and frustrating, drawing on principles from cognitive psychology, engineering, and design practice.

## Core Principles of Good Design

Norman organizes his framework around several foundational principles that collectively determine whether a design succeeds or fails. These principles are not isolated rules but interconnected concepts that designers must balance in every decision.

| Principle | Definition | Example |
|---|---|---|
| Affordances | Properties of an object that indicate how it can be used | A flat plate on a door affords pushing; a handle affords pulling |
| Signifiers | Perceivable cues that communicate where and how to act | A "Push" label on a door, or an underlined hyperlink on a webpage |
| Constraints | Limitations that guide users toward correct actions | A USB plug that only fits one way, or grayed-out menu items |
| Mappings | Relationships between controls and their effects | Stove burner knobs arranged to mirror the layout of burners |
| Feedback | Information communicated back to the user about what has happened | A click sound when pressing a button, or a progress bar during a file upload |
| Conceptual Models | Mental representations users form about how something works | A user's understanding that "deleting" a file sends it to a trash folder for possible recovery |

## Discoverability and Understanding

Norman identifies discoverability as the most critical quality of good design. A well-designed product enables a user to determine what actions are possible, where to perform them, and what the current state of the system is, all without requiring a manual. Discoverability depends on the effective combination of affordances, signifiers, constraints, mappings, and feedback.

Understanding goes deeper than discoverability. It concerns the user's ability to build an accurate conceptual model of how the entire system works. When the conceptual model presented by the design aligns with the actual system model, users can predict outcomes, recover from mistakes, and extend their use of the product to new situations. When there is a mismatch, confusion and errors follow.

- A door with no visible hinges and a flat push plate is discoverable: users immediately know how to operate it.
- A software application with consistent navigation patterns builds understanding over time, enabling users to find features they have never used before.
- A thermostat that presents a simple on/off mental model when the underlying system is a complex HVAC controller creates a conceptual model mismatch that leads to user frustration.

## Affordances and Signifiers

Norman draws a careful distinction between affordances and signifiers, a refinement he introduced in the revised edition. An affordance is a relationship between the properties of an object and the capabilities of the agent interacting with it. A chair affords sitting because of the relationship between its flat surface at a certain height and the human body's ability to sit. Affordances exist whether or not the user perceives them.

Signifiers, by contrast, are the perceivable indicators that communicate to the user where and how to act. Signifiers are what designers actually place in the world. A door handle is a signifier that communicates "pull here." A button's raised appearance on a screen is a signifier that communicates "press me."

The distinction matters because designers often focus on affordances when they should focus on signifiers. A touchscreen affords touching anywhere, but without signifiers (buttons, labels, highlighted regions), users do not know where to touch or what will happen.

## Mappings and Feedback

Mapping refers to the relationship between controls and their outcomes. Natural mappings take advantage of physical analogies and cultural standards to produce immediate understanding. When a steering wheel turns right and the car turns right, the mapping is natural. When four stove burner knobs are arranged in a line but the burners are in a square, the mapping is poor.

Feedback is essential for closing the action loop. Users must receive timely, informative, and non-intrusive confirmation that their action has been registered and what effect it produced. Poor feedback leaves users uncertain about whether their action worked, often leading them to repeat the action or abandon the task entirely.

| Feedback Quality | Characteristics | User Impact |
|---|---|---|
| Good feedback | Immediate, specific, noticeable but not overwhelming | User feels confident and in control |
| Excessive feedback | Constant alerts, unnecessary confirmations | User becomes annoyed and starts ignoring feedback |
| Absent feedback | No response to user actions | User feels lost, repeats actions, or gives up |
| Delayed feedback | Response comes seconds or minutes after action | User loses the connection between action and outcome |

## The Gulf of Execution and the Gulf of Evaluation

Norman introduces two critical concepts that explain why users struggle with designs. The gulf of execution is the gap between a user's intention and the actions the system allows. If a user wants to bold text but cannot find the bold command, the gulf of execution is wide. The gulf of evaluation is the gap between the system's actual state and the user's ability to perceive and interpret that state. If the text is now bold but the interface gives no visual indication, the gulf of evaluation is wide.

Good design minimizes both gulfs:

- **Minimizing the gulf of execution** means making available actions visible, making controls match user intentions, and providing natural mappings between controls and outcomes.
- **Minimizing the gulf of evaluation** means providing clear, immediate feedback, making system state visible, and presenting information in a form that matches the user's conceptual model.

## Human Error and Design Responsibility

One of Norman's most consequential arguments is that most so-called "human errors" are actually design errors. He categorizes errors into two types:

- **Slips** occur when a user intends to do the correct action but performs it incorrectly. Slips include capture errors (a frequently performed action takes over a less frequent one), description errors (performing the right action on the wrong object), and mode errors (performing an action appropriate for one mode while in another).
- **Mistakes** occur when a user forms the wrong goal or plan. Mistakes arise from incorrect conceptual models, incomplete information, or misinterpretation of system state.

Norman argues that designers should build systems that prevent errors where possible, make errors easily detectable and reversible, and treat error recovery as a first-class design concern rather than an afterthought. Undo functionality, confirmation dialogs for destructive actions, and constraints that prevent invalid inputs are all applications of this philosophy.

## Human-Centered Design Process

Norman advocates for a human-centered design (HCD) process, an iterative approach that keeps users at the center of every design decision. The process consists of four activities that cycle repeatedly:

- **Observation**: Studying users in their natural context to understand their actual needs, behaviors, and pain points, rather than relying on assumptions or stated preferences.
- **Ideation**: Generating a broad range of potential solutions without premature commitment to any single approach.
- **Prototyping**: Building rapid, low-fidelity representations of ideas to make them tangible and testable.
- **Testing**: Putting prototypes in front of real users, observing how they interact, identifying failures, and feeding those insights back into the next cycle.

This iterative cycle continues until the design meets the needs of its users. Norman emphasizes that the goal is not to design for the "average" user but to accommodate the full range of human diversity in capability, context, and expectation.

## Seven Stages of Action

Norman's seven stages of action model describes the psychological steps a person goes through when interacting with any system. This model provides a diagnostic framework for identifying where designs fail.

| Stage | Description | Design Implication |
|---|---|---|
| 1. Goal | Forming the intention to accomplish something | Support users in clarifying what they want to do |
| 2. Plan | Determining the sequence of actions to achieve the goal | Make available actions visible and logical |
| 3. Specify | Translating the plan into specific physical actions | Provide clear signifiers for how to act |
| 4. Perform | Executing the physical actions | Ensure controls are accessible and responsive |
| 5. Perceive | Observing the state of the system after acting | Make system state visible and changes noticeable |
| 6. Interpret | Making sense of what was perceived | Present information in a form users can understand |
| 7. Compare | Comparing the outcome with the original goal | Enable users to assess whether the goal was achieved |

## Constraints as Design Tools

Norman identifies four types of constraints that guide user behavior and reduce error:

- **Physical constraints** rely on the properties of the physical world. A large peg cannot fit in a small hole. A battery shaped asymmetrically can only be inserted one way.
- **Cultural constraints** rely on shared conventions and norms. Red means stop; green means go. Text reads left to right in Western cultures.
- **Semantic constraints** rely on the meaning of a situation. A windshield on a model car can only go in one place because of what a windshield is and does.
- **Logical constraints** rely on reasoning. If there are three components and two are already placed, the third must go in the remaining spot.

Effective design leverages all four types of constraints to make correct use feel inevitable and incorrect use feel impossible.

## Related

Designers and technology professionals studying Norman's work should explore related topics including human-computer interaction for the broader academic discipline, affordance theory as articulated by James Gibson, usability testing and heuristic evaluation methods developed by Jakob Nielsen, accessibility and inclusive design practices, interaction design principles, cognitive load theory and its implications for interface complexity, design thinking methodology, and the related book "Don't Make Me Think" by Steve Krug which applies similar principles specifically to web usability.

## Summary

"The Design of Everyday Things" provides a comprehensive, psychologically grounded framework for understanding why some designs work and others fail. Norman's central thesis, that design must start from human needs and capabilities rather than technological possibilities, has shaped decades of product development practice. His principles of affordances, signifiers, mappings, constraints, feedback, and conceptual models give practitioners a shared vocabulary and a systematic approach to creating products that are intuitive, forgiving, and effective. For technology professionals, the book is essential reading because it reframes design failures as systemic problems with identifiable causes and actionable solutions, rather than as inevitable consequences of user incompetence.

## References

- Norman, D. A. (2013). "The Design of Everyday Things: Revised and Expanded Edition." Basic Books.
- Norman, D. A. (1988). "The Psychology of Everyday Things." Basic Books.
- Norman, D. A. (2004). "Emotional Design: Why We Love (or Hate) Everyday Things." Basic Books.
- Nielsen, J. (1994). "Usability Engineering." Morgan Kaufmann.
- Gibson, J. J. (1979). "The Ecological Approach to Visual Perception." Houghton Mifflin.
- Don Norman's website and writings: https://jnd.org
- Nielsen Norman Group research and articles: https://www.nngroup.com
