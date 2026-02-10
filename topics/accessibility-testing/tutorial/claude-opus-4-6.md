# Accessibility testing

Accessibility testing is the process of evaluating software applications, websites, and digital products to ensure they are usable by people with disabilities. This includes individuals with visual, auditory, motor, cognitive, and neurological impairments. The practice is both a technical discipline and a legal necessity: organizations that fail to provide accessible digital experiences risk excluding a significant portion of users and exposing themselves to regulatory action. Accessibility testing spans automated scanning, manual expert review, and real-world user testing with assistive technologies, and it should be embedded throughout the software development lifecycle rather than treated as an afterthought.

## Why accessibility testing matters

Approximately 1.3 billion people worldwide live with some form of disability, according to the World Health Organization. When digital products are not accessible, these users face barriers ranging from unreadable content to completely unusable interfaces. Beyond the moral imperative, accessibility testing delivers tangible business benefits: it expands market reach, improves overall usability for all users, strengthens SEO performance, and reduces the risk of costly litigation. In the United States alone, web accessibility lawsuits have risen sharply, with thousands filed annually under the Americans with Disabilities Act (ADA). Proactive testing is far less expensive than retroactive remediation or legal settlement.

## Key accessibility standards and regulations

Several standards and laws govern digital accessibility. Understanding the landscape is essential for selecting the right testing criteria.

| Standard / Regulation | Scope | Key Requirements |
|---|---|---|
| WCAG 2.1 / 2.2 | International guideline | Four principles: Perceivable, Operable, Understandable, Robust. Three conformance levels: A, AA, AAA. |
| ADA (Americans with Disabilities Act) | United States | Requires equal access to goods and services; courts increasingly interpret this to cover websites and apps. |
| Section 508 (Rehabilitation Act) | U.S. federal agencies | Federal ICT must conform to WCAG 2.0 Level AA or equivalent. |
| EN 301 549 | European Union | Harmonized standard for ICT accessibility; references WCAG 2.1 Level AA. |
| AODA (Accessibility for Ontarians with Disabilities Act) | Ontario, Canada | Requires WCAG 2.0 Level AA compliance for public and large private organizations. |
| European Accessibility Act (EAA) | European Union | Broad product and service accessibility requirements taking effect in 2025. |

Most organizations target WCAG 2.1 Level AA as a practical baseline, as it aligns with the majority of legal requirements and covers the most impactful accessibility barriers.

## The WCAG POUR principles

The Web Content Accessibility Guidelines are organized around four foundational principles, often referred to by the acronym POUR.

- **Perceivable**: Information and user interface components must be presentable in ways users can perceive. This includes providing text alternatives for images, captions for video, and sufficient color contrast.
- **Operable**: Interface components and navigation must be operable by all users. This means full keyboard accessibility, sufficient time to interact with content, and avoidance of content that causes seizures.
- **Understandable**: Information and the operation of the user interface must be understandable. This includes readable text, predictable page behavior, and input assistance such as error messages and labels.
- **Robust**: Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies. This requires clean, valid markup and proper use of ARIA (Accessible Rich Internet Applications) attributes.

## Types of accessibility testing

Effective accessibility testing combines multiple approaches, each with distinct strengths and limitations.

**Automated testing** uses software tools to scan code and rendered pages for known accessibility violations. Tools such as axe, Lighthouse, WAVE, and pa11y can detect issues like missing alt text, insufficient color contrast, missing form labels, and improper heading hierarchy. Automated testing is fast, repeatable, and well-suited for integration into CI/CD pipelines. However, studies consistently show that automated tools catch only 30 to 50 percent of WCAG issues. They cannot evaluate subjective qualities like whether alt text is meaningful or whether a workflow is logically navigable.

**Manual expert testing** involves a trained accessibility specialist navigating the application using keyboard-only interaction, screen readers, and other assistive technologies. The expert evaluates compliance against WCAG success criteria, identifies logical and contextual issues that automation misses, and assesses the overall user experience. Manual testing is more time-consuming but catches the majority of issues that automated tools cannot.

**User testing with people with disabilities** provides the most authentic assessment of real-world accessibility. Participants with various disabilities use the product with their own assistive technologies and workflows, revealing barriers that neither automated nor expert testing may uncover. This approach surfaces usability issues tied to cognitive load, interaction patterns, and assistive technology compatibility.

| Approach | Coverage | Speed | Cost | Best For |
|---|---|---|---|---|
| Automated scanning | 30-50% of WCAG issues | Fast, continuous | Low | Regression checks, CI/CD integration |
| Manual expert review | 80-95% of WCAG issues | Moderate | Medium | Comprehensive audits, complex interactions |
| User testing with disabilities | Real-world barriers | Slow | Higher | Validation, usability insights, edge cases |

## Common accessibility issues

The following issues appear frequently in accessibility audits and represent the areas where most products fail:

- **Missing or inadequate alt text**: Images without descriptive alternative text are invisible to screen reader users.
- **Insufficient color contrast**: Text that does not meet minimum contrast ratios (4.5:1 for normal text, 3:1 for large text at Level AA) is difficult or impossible to read for users with low vision.
- **Keyboard inaccessibility**: Interactive elements that cannot be reached or activated via keyboard alone exclude users who cannot use a mouse.
- **Missing form labels**: Form inputs without programmatically associated labels leave screen reader users unable to understand what information is required.
- **Improper heading structure**: Skipped heading levels or headings used solely for visual styling break navigation for screen reader users who rely on heading hierarchy.
- **Missing skip navigation links**: Without skip links, keyboard users must tab through every navigation element on every page before reaching main content.
- **Auto-playing media**: Audio or video that plays automatically without user control creates barriers for screen reader users and users with cognitive disabilities.
- **Poor focus management**: When focus is not properly managed during dynamic content changes (modals, single-page app navigation), users lose their place in the interface.

## Accessibility testing tools

A range of tools supports accessibility testing at different stages of development.

- **axe-core / axe DevTools**: Open-source accessibility engine that integrates with browsers, testing frameworks (Playwright, Cypress, Selenium), and CI/CD systems. Widely considered the industry standard for automated rule-based testing.
- **WAVE (Web Accessibility Evaluation Tool)**: Browser extension and online service that provides visual feedback about accessibility issues directly on the page.
- **Google Lighthouse**: Built into Chrome DevTools, Lighthouse includes an accessibility audit category powered by axe-core rules.
- **pa11y**: Command-line accessibility testing tool suitable for CI/CD integration and batch testing of multiple pages.
- **NVDA and JAWS**: Screen readers for Windows used in manual testing. NVDA is free and open source; JAWS is commercial and widely used in enterprise.
- **VoiceOver**: Built-in screen reader on macOS and iOS, essential for testing Apple platform accessibility.
- **Color contrast analyzers**: Standalone tools such as the Colour Contrast Analyser (CCA) by TPGi verify that text and UI elements meet WCAG contrast requirements.

## Integrating accessibility testing into the development lifecycle

Accessibility testing is most effective when it is not a one-time gate but a continuous practice woven into every phase of development.

- **Design phase**: Review wireframes and mockups against WCAG criteria. Check color contrast, ensure touch targets meet minimum size requirements (44x44 CSS pixels), and verify that information is not conveyed by color alone.
- **Development phase**: Use linting tools and IDE plugins (such as eslint-plugin-jsx-a11y) to catch accessibility issues as code is written. Write semantic HTML, use ARIA attributes correctly, and test keyboard navigation during development.
- **Code review**: Include accessibility as a criterion in code review checklists. Verify that new interactive components are keyboard accessible and properly labeled.
- **Automated CI/CD testing**: Integrate axe-core or pa11y into the build pipeline to catch regressions automatically on every commit or pull request.
- **Pre-release manual audit**: Conduct a thorough manual review with assistive technologies before major releases, covering screen reader compatibility, keyboard navigation, and dynamic content behavior.
- **Post-release monitoring**: Use automated scanning on production URLs and gather feedback from users with disabilities through support channels and usability studies.

## Assistive technologies to test with

Thorough accessibility testing requires verifying behavior across the assistive technologies that real users depend on.

| Assistive Technology | Platform | Primary Users |
|---|---|---|
| NVDA | Windows | Screen reader users (free, open source) |
| JAWS | Windows | Screen reader users (commercial, enterprise) |
| VoiceOver | macOS, iOS | Screen reader users on Apple devices |
| TalkBack | Android | Screen reader users on Android devices |
| Dragon NaturallySpeaking | Windows | Users with motor impairments (voice control) |
| Switch access | Android, iOS | Users with severe motor impairments |
| ZoomText | Windows | Users with low vision (magnification) |
| Browser zoom / text scaling | All platforms | Users with low vision |

Testing with at least one screen reader on each target platform (NVDA or JAWS on Windows, VoiceOver on macOS/iOS, TalkBack on Android) is considered the minimum for meaningful manual accessibility testing.

## Related

Related topics to learn next include accessibility standards and the Web Content Accessibility Guidelines (WCAG) in depth, ARIA attributes and their correct usage, screen reader behavior and interaction patterns, inclusive design principles that address accessibility from the start, usability testing methodologies, Section 508 compliance for government projects, the European Accessibility Act, automated testing integration with tools like Playwright and axe-core, and universal design as a broader framework for building products that work for everyone.

## Summary

Accessibility testing is a multi-layered discipline that combines automated scanning, manual expert review, and user testing with people with disabilities to ensure digital products are usable by everyone. It is grounded in standards such as WCAG 2.1/2.2 and enforced by regulations including the ADA, Section 508, and the European Accessibility Act. No single testing method is sufficient on its own: automated tools provide fast, repeatable coverage of common issues but miss the majority of real-world barriers, while manual testing and user testing with assistive technologies uncover the deeper interaction and usability problems that define the actual accessibility of a product. Organizations that embed accessibility testing throughout the development lifecycle, from design through deployment and monitoring, build more inclusive products, reach broader audiences, and reduce legal risk.

## References

- W3C Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- W3C Web Accessibility Initiative (WAI): https://www.w3.org/WAI/
- Deque Systems axe-core: https://github.com/dequelabs/axe-core
- WebAIM (Web Accessibility In Mind): https://webaim.org/
- WAVE Web Accessibility Evaluation Tool: https://wave.webaim.org/
- Section 508 Standards (U.S. Access Board): https://www.access-board.gov/ict/
- European Accessibility Act (EAA): https://ec.europa.eu/social/main.jsp?catId=1202
- NV Access NVDA Screen Reader: https://www.nvaccess.org/
- Google Lighthouse Accessibility Auditing: https://developer.chrome.com/docs/lighthouse/accessibility/
- TPGi Colour Contrast Analyser: https://www.tpgi.com/color-contrast-checker/
