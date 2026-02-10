# ARIA attributes

## Introduction

ARIA (Accessible Rich Internet Applications) attributes are a set of HTML attributes defined by the W3C Web Accessibility Initiative that enhance the accessibility of web content for individuals with disabilities. Standard HTML elements carry implicit semantics that assistive technologies such as screen readers can interpret, but modern web applications frequently rely on custom widgets, dynamic content updates, and complex interaction patterns that fall outside what native HTML can describe. ARIA bridges this gap by providing a vocabulary of roles, states, and properties that developers attach to elements so assistive technologies can accurately convey an application's structure, behavior, and current state to users who cannot perceive the visual interface directly.

ARIA is not a replacement for semantic HTML. The first rule of ARIA, as stated in the W3C specification, is: if you can use a native HTML element or attribute with the semantics and behavior you require, do so instead of repurposing a generic element and adding ARIA. ARIA should be applied when no native element provides the required semantics, when custom widgets demand richer description, or when dynamic state changes must be communicated in real time.

## The Three Pillars of ARIA

ARIA attributes fall into three categories: roles, states, and properties. Together they form a contract between the developer and the accessibility tree that the browser exposes to assistive technologies.

| Category | Purpose | Example Attributes |
|---|---|---|
| **Roles** | Define what an element is or does | `role="button"`, `role="navigation"`, `role="dialog"` |
| **States** | Describe dynamic conditions that change with user interaction | `aria-expanded`, `aria-checked`, `aria-disabled`, `aria-selected` |
| **Properties** | Provide additional metadata that is relatively static | `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-required` |

States differ from properties in that states are expected to change frequently during the lifecycle of a page, whereas properties tend to remain stable once set. In practice, both are implemented as HTML attributes and updated through the DOM.

## ARIA Roles

The `role` attribute assigns an explicit semantic meaning to an element. This is especially important when developers use generic elements like `<div>` or `<span>` to build custom interactive controls. Roles are divided into several subcategories.

- **Widget roles** describe interactive UI components: `button`, `checkbox`, `slider`, `tab`, `textbox`, `menuitem`, `switch`, `progressbar`, and others. These tell assistive technologies how the user is expected to interact with the element.
- **Document structure roles** describe the organization of content: `article`, `heading`, `list`, `listitem`, `table`, `row`, `cell`, `separator`, and `toolbar`. These help screen readers present content hierarchy.
- **Landmark roles** identify major regions of a page: `banner`, `navigation`, `main`, `complementary`, `contentinfo`, `search`, `form`, and `region`. Landmarks enable users to jump quickly between sections.
- **Live region roles** mark areas of a page that update dynamically: `alert`, `log`, `marquee`, `status`, and `timer`. These roles interact with `aria-live` to control how updates are announced.
- **Abstract roles** exist in the specification as base types for the role taxonomy but must never be used in markup: `widget`, `input`, `landmark`, `section`, and others.

A critical constraint is that once a role is set, it overrides the element's implicit role entirely. Setting `role="button"` on an anchor element means assistive technologies treat it as a button, not a link. The developer then becomes responsible for implementing the full expected keyboard and interaction behavior of a button.

## ARIA States and Properties

States and properties convey supplementary information about an element's current condition, relationships, and labeling. The most commonly used attributes include:

| Attribute | Type | Purpose |
|---|---|---|
| `aria-label` | Property | Provides an accessible name directly as a string |
| `aria-labelledby` | Property | References the ID of another element that serves as the label |
| `aria-describedby` | Property | References an element providing an extended description |
| `aria-required` | Property | Indicates that user input is required |
| `aria-hidden` | State | Hides an element from the accessibility tree |
| `aria-expanded` | State | Indicates whether a collapsible section is open or closed |
| `aria-checked` | State | Reflects the checked state of checkboxes or toggle switches |
| `aria-disabled` | State | Marks an element as perceivable but not operable |
| `aria-selected` | State | Indicates the current selection within a group |
| `aria-live` | Property | Defines a live region and its announcement priority |
| `aria-controls` | Property | Identifies the element(s) controlled by the current element |
| `aria-haspopup` | Property | Indicates that the element triggers a popup such as a menu or dialog |
| `aria-current` | State | Indicates the current item within a set, such as the current page in navigation |

These attributes must be kept synchronized with the actual visual and functional state of the interface. When a disclosure widget is expanded visually, `aria-expanded` must be set to `true`. When it collapses, the attribute must update to `false`. Stale ARIA values are worse than no ARIA at all because they actively mislead users of assistive technologies.

## Live Regions

Dynamic content updates present a particular challenge for screen reader users because changes that occur outside the user's current focus are invisible unless explicitly announced. ARIA live regions solve this problem by instructing assistive technologies to monitor a section of the DOM and announce changes as they occur.

- **`aria-live="polite"`** queues announcements and delivers them at the next convenient pause, avoiding interruption of the user's current task. Use this for non-urgent updates such as status messages or feed refreshes.
- **`aria-live="assertive"`** interrupts whatever the screen reader is currently announcing to deliver the update immediately. Reserve this for urgent information such as error messages or time-sensitive alerts.
- **`aria-live="off"`** disables announcements for the region. This is the default.

Two supporting attributes refine live region behavior. `aria-atomic` determines whether the entire region is announced on change or only the modified nodes. `aria-relevant` specifies which types of mutations trigger announcements: additions, removals, text changes, or all of the above.

## The Five Rules of ARIA Use

The W3C provides authoritative guidance on when and how to apply ARIA. These rules serve as a decision framework for developers.

1. **Use native HTML first.** If an HTML element or attribute provides the semantics you need, use it instead of adding ARIA to a generic element.
2. **Do not change native semantics unnecessarily.** Avoid overriding the implicit role of an element unless there is a compelling reason.
3. **All interactive ARIA controls must be keyboard accessible.** Adding `role="button"` to an element means you must also handle Enter and Space key events and manage focus.
4. **Do not use `aria-hidden="true"` on focusable elements.** Hiding an element from the accessibility tree while it remains focusable creates a confusing experience.
5. **All interactive elements must have an accessible name.** Every control a user can interact with must have a text label, whether provided by visible text, `aria-label`, or `aria-labelledby`.

## Common Patterns and Widget Contracts

When developers implement custom widgets using ARIA roles, they accept responsibility for the full interaction contract that assistive technology users expect. The WAI-ARIA Authoring Practices guide documents these contracts in detail. Key patterns include:

- **Tabs**: A `tablist` container holds elements with `role="tab"`. Each tab is associated with a `tabpanel` via `aria-controls`. Arrow keys move focus between tabs, and `aria-selected` indicates the active tab.
- **Dialogs**: A `role="dialog"` element requires an accessible name via `aria-labelledby` or `aria-label`. Focus must be trapped within the dialog while it is open, and pressing Escape must close it.
- **Menus**: A `role="menu"` container holds `menuitem` elements. Arrow keys navigate items, Enter activates, and Escape closes the menu.
- **Accordions**: Disclosure buttons use `aria-expanded` to communicate state and `aria-controls` to reference the associated content panel.
- **Comboboxes**: A text input with `role="combobox"` pairs with a listbox popup. `aria-activedescendant` tracks the currently highlighted option, and `aria-expanded` indicates whether the popup is visible.

Each of these patterns requires coordinated management of focus, keyboard events, and ARIA attribute updates. Omitting any part of the contract degrades the experience for assistive technology users.

## Testing and Validation

ARIA correctness cannot be verified through visual inspection alone. A structured testing approach combines automated scanning with manual assistive technology testing.

- **Automated tools** such as axe-core, Lighthouse accessibility audits, and WAVE detect common ARIA errors: missing labels, invalid role values, orphaned `aria-labelledby` references, and elements with `aria-hidden="true"` that remain focusable.
- **Browser developer tools** provide accessibility tree inspectors (available in Chrome, Firefox, and Edge) that display the computed accessible name, role, and state of each element. These inspectors reveal whether ARIA attributes are producing the intended result.
- **Screen reader testing** is essential for validating the user experience. Test with at least two screen readers across different platforms: NVDA or JAWS on Windows, VoiceOver on macOS and iOS, and TalkBack on Android. Each screen reader interprets ARIA slightly differently, and real-world testing catches issues that automated tools miss.
- **Keyboard-only testing** verifies that all interactive ARIA controls are operable without a mouse. Tab order, arrow key navigation, Enter/Space activation, and Escape dismissal must all function as expected.

## Common Mistakes

Misuse of ARIA is widespread and often introduces more accessibility barriers than it removes. The most frequent errors include:

- **Adding ARIA to elements that already have native semantics.** Applying `role="button"` to a `<button>` element is redundant. Applying `role="link"` to an `<a>` element with an `href` is unnecessary and risks overriding browser-native behavior.
- **Using ARIA without keyboard support.** Adding a widget role without implementing the expected keyboard interaction leaves screen reader users unable to operate the control.
- **Stale attribute values.** Failing to update `aria-expanded`, `aria-checked`, or `aria-selected` when the visual state changes misleads users.
- **Overusing `aria-hidden`.** Hiding elements from the accessibility tree that contain meaningful content removes information that assistive technology users need.
- **Using invalid role values.** Misspelled or non-existent role strings are silently ignored, leaving the element without any ARIA semantics.
- **Ignoring the accessible name.** Interactive elements without an accessible name are announced as unlabeled controls, giving users no indication of their purpose.

## Related

Developers working with ARIA attributes should explore the broader accessibility ecosystem. The Web Content Accessibility Guidelines (WCAG) provide the compliance framework that ARIA implementations must satisfy. Semantic HTML is the foundation upon which ARIA builds, and understanding native element semantics reduces the need for ARIA in the first place. Focus management and keyboard navigation are inseparable from ARIA widget development. The WAI-ARIA Authoring Practices guide provides reference implementations for every standard widget pattern. Screen reader behavior and the accessibility tree are essential concepts for understanding how ARIA translates into the user experience. CSS and ARIA intersect in areas such as visually hidden content, focus indicators, and high-contrast mode support.

## Summary

ARIA attributes extend HTML's native semantics to make complex, dynamic web applications accessible to users of assistive technologies. They operate through three mechanisms: roles that define what an element is, states that communicate dynamic conditions, and properties that provide stable metadata and relationships. ARIA is most valuable when native HTML elements cannot express the required semantics, but it imposes strict obligations on developers to implement complete keyboard interaction, maintain synchronized state, and validate behavior through both automated tools and real assistive technology testing. Applied correctly, ARIA transforms inaccessible custom widgets into first-class citizens of the accessibility tree. Applied incorrectly, it creates confusion and barriers. The guiding principle remains: use native HTML wherever possible, reach for ARIA when necessary, and always test the result with the assistive technologies your users depend on.

## References

- W3C WAI-ARIA Specification 1.2: https://www.w3.org/TR/wai-aria-1.2/
- WAI-ARIA Authoring Practices 1.2: https://www.w3.org/WAI/ARIA/apg/
- W3C Using ARIA (Rules of ARIA Use): https://www.w3.org/TR/using-aria/
- MDN Web Docs, ARIA: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- Deque University, axe-core Accessibility Testing: https://www.deque.com/axe/
- WebAIM Introduction to ARIA: https://webaim.org/techniques/aria/
