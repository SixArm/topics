# Internationalization and localization: steps

Internationalization (often abbreviated as i18n) and localization (l10n) are complementary processes that prepare software, products, and content for use across different languages, regions, and cultures. Internationalization is the engineering and design practice of building a product so it can be adapted to various locales without requiring changes to the core architecture. Localization is the subsequent process of actually adapting that product for a specific market, including translation, cultural adaptation, and formatting adjustments. Together, these steps form a structured workflow that enables organizations to reach global audiences while maintaining quality, consistency, and cultural relevance.

## Plan and Analyze

The first step in any internationalization effort is defining the scope and identifying the target markets. This involves conducting a thorough analysis of the cultural, linguistic, and regulatory requirements of each market the organization intends to serve. Teams should inventory every user-facing element in the product, including strings, images, date formats, currency symbols, and measurement units, to assess the scale of the work involved.

A critical part of this phase is evaluating the existing codebase and product design for internationalization readiness. Common issues to look for include:

- Hard-coded strings embedded directly in source code rather than externalized in resource files
- Assumptions about text direction (left-to-right versus right-to-left)
- Fixed-width layouts that cannot accommodate text expansion or contraction across languages
- Date, time, and number formatting tied to a single locale
- Character encoding limitations that do not support Unicode

| Planning Activity | Purpose |
|---|---|
| Market analysis | Identify target locales and their specific requirements |
| Content audit | Catalog all translatable and adaptable assets |
| Technical assessment | Evaluate codebase readiness for multi-locale support |
| Regulatory review | Identify legal or compliance requirements per region |
| Resource estimation | Determine budget, timeline, and staffing needs |

The output of this phase should be a comprehensive internationalization plan that prioritizes markets, establishes timelines, and identifies technical debt that must be addressed before localization can begin.

## Design and Develop

With the plan in place, the next step is to architect and build the product using internationalization best practices. The goal is to create a flexible foundation that separates locale-specific content from core logic, enabling localization without modifying the underlying code.

Key design and development practices include:

- **Externalize all strings**: Store user-facing text in resource bundles or translation files rather than embedding them in code. Common formats include JSON, XLIFF, PO files, and platform-specific resource formats.
- **Use Unicode throughout**: Adopt UTF-8 encoding as the default across all layers of the application, from database storage to API responses to front-end rendering.
- **Support locale-aware formatting**: Use internationalization libraries and framework APIs that handle date, time, number, and currency formatting based on the active locale.
- **Design flexible layouts**: Build user interfaces that adapt gracefully to text expansion (German text is typically 30% longer than English), text contraction, and bidirectional text rendering.
- **Separate translatable from non-translatable content**: Ensure that variables, placeholders, brand names, and technical identifiers are clearly distinguished from content that requires translation.

| Concern | Best Practice |
|---|---|
| Character encoding | UTF-8 as the universal default |
| String management | Resource bundles with unique keys |
| Date and time | ICU or CLDR-based locale formatting |
| Text direction | CSS logical properties and bidi algorithms |
| Pluralization | Locale-aware plural rules (not simple singular/plural) |
| Concatenation | Avoid string concatenation; use parameterized messages |

This phase also involves establishing a localization pipeline, including integration with translation management systems, automated extraction of translatable strings, and continuous localization workflows that keep translations synchronized with development.

## Translate

Translation is the most visible step in localization. Every piece of user-facing text, audio narration, video subtitle, and documentation must be translated into the language of each target market. Translation quality directly affects user trust and product adoption.

Effective translation workflows involve several considerations:

- **Professional translators**: Use native-speaking translators with domain expertise rather than relying solely on machine translation. Machine translation can accelerate initial drafts but requires human review.
- **Translation memory**: Maintain a translation memory database that stores previously translated segments, ensuring consistency across the product and reducing cost for repeated or similar content.
- **Glossaries and style guides**: Provide translators with terminology glossaries and locale-specific style guides that define tone, formality level, and preferred translations for key terms.
- **Context provision**: Supply translators with screenshots, character limits, and contextual notes so they understand where and how each string appears in the product.
- **Review cycles**: Implement in-country review by native speakers who are also familiar with the product to catch mistranslations, awkward phrasing, and cultural missteps.

## Adapt

Cultural adaptation goes beyond word-for-word translation. It addresses the visual, symbolic, and contextual elements of a product that carry different meanings across cultures. What resonates in one market may confuse or offend in another.

Areas that typically require cultural adaptation include:

- **Images and icons**: Photographs showing people, gestures, or settings may need to reflect the local population and customs. Icons that rely on cultural metaphors (such as a mailbox shape) may not be universally understood.
- **Color usage**: Colors carry different associations across cultures. Red signifies luck in China but danger in many Western contexts. White is associated with mourning in some Asian cultures and purity in Western ones.
- **Symbols and metaphors**: Checkmarks, thumbs-up gestures, and animal imagery vary in meaning and appropriateness across regions.
- **Content and examples**: Case studies, testimonials, units of measurement, address formats, and phone number formats should reflect local conventions.
- **Legal and regulatory compliance**: Privacy policies, terms of service, accessibility requirements, and data handling practices must conform to local laws such as GDPR in Europe or LGPD in Brazil.

| Element | Example Adaptation |
|---|---|
| Address format | Street/city/state/zip order varies by country |
| Name format | Family name first in East Asian cultures |
| Phone numbers | Country code, grouping, and length differ |
| Paper sizes | A4 in most of the world versus Letter in North America |
| Currency | Symbol placement, decimal separators, grouping |

## Format

Formatting adjustments ensure that the product presents information in a way that feels native to each target locale. Even after translation and cultural adaptation, incorrect formatting can undermine the user experience.

Key formatting considerations include:

- **Character sets and writing systems**: Some languages require complex text rendering, including ligatures (Arabic), combining characters (Vietnamese), and vertical text layout (traditional Chinese and Japanese).
- **Date and time**: Formats vary significantly. The United States uses MM/DD/YYYY, much of Europe uses DD/MM/YYYY, and ISO 8601 uses YYYY-MM-DD. Time may be expressed in 12-hour or 24-hour format.
- **Numbers and decimals**: The decimal separator is a period in some locales and a comma in others. Thousands grouping also varies (1,000 versus 1.000 versus 1 000).
- **Sort order and collation**: Alphabetical sorting rules differ by language. Swedish treats characters with diacritics as separate letters with specific sort positions.
- **Text expansion and truncation**: Translated text often changes length significantly, requiring dynamic layouts, responsive containers, and careful handling of truncation and ellipsis.

## Test

Testing validates that the internationalization architecture and localization content work correctly in each target market. This phase encompasses both functional testing and linguistic quality assurance.

Testing activities should include:

- **Internationalization testing**: Verify that the product correctly handles multi-byte characters, bidirectional text, locale switching, and locale-specific formatting without data corruption or display errors.
- **Linguistic testing**: Native speakers review the translated product in context to verify accuracy, naturalness, and completeness. This is distinct from translation review because it evaluates strings as they appear in the running product.
- **Functional testing per locale**: Execute the full test suite with each supported locale active to confirm that locale-specific logic, such as currency calculations, date parsing, and sorting, behaves correctly.
- **Pseudo-localization**: Use automated pseudo-translation (replacing characters with accented equivalents and padding strings) during development to detect hard-coded strings, layout overflow, and encoding issues before real translations arrive.
- **Accessibility testing**: Confirm that screen readers, keyboard navigation, and assistive technologies work correctly with localized content, including right-to-left layouts.

| Test Type | What It Validates |
|---|---|
| Pseudo-localization | Hard-coded strings, layout overflow, encoding |
| Linguistic QA | Translation accuracy in product context |
| Functional locale testing | Locale-specific logic and formatting |
| Bidirectional testing | Right-to-left layout and mixed-direction text |
| Accessibility testing | Assistive technology compatibility per locale |

## Maintain

Internationalization and localization are ongoing responsibilities, not one-time projects. Products evolve, new features are added, content changes, and new markets emerge. A sustainable maintenance strategy ensures that the product continues to meet the needs of each target market over time.

Maintenance practices include:

- **Continuous localization**: Integrate translation workflows into the development pipeline so that new or changed strings are automatically flagged for translation and delivered in sync with releases.
- **Translation updates**: Monitor and update translations in response to user feedback, terminology changes, and evolving language usage.
- **New market onboarding**: Establish a repeatable process for adding support for new locales, including locale-specific configuration, translator onboarding, and market-specific testing.
- **Performance monitoring**: Track locale-specific metrics such as user engagement, support ticket volume, and error rates to identify localization quality issues.
- **Tooling and infrastructure**: Keep translation management systems, internationalization libraries, and locale data (CLDR versions, time zone databases) up to date.

## Related

For a deeper understanding of internationalization and localization, explore these related topics: locale and locale codes for understanding how locales are identified and structured; Unicode and UTF-8 encoding for the character encoding foundation that enables multilingual support; the Common Locale Data Repository (CLDR) for standardized locale data; right-to-left (RTL) layout and bidirectional text handling for supporting Arabic, Hebrew, and similar scripts; translation management systems (TMS) for tooling and workflow automation; cultural dimensions theory by Geert Hofstede for understanding cultural differences that influence adaptation decisions; accessibility standards such as WCAG for ensuring localized products remain accessible; and continuous integration and continuous deployment (CI/CD) for integrating localization into modern development pipelines.

## Summary

Internationalization and localization follow a structured sequence of steps that move from strategic planning through technical implementation to ongoing maintenance. Internationalization establishes the architectural foundation by externalizing strings, adopting Unicode, and designing flexible layouts. Localization then builds on that foundation through translation, cultural adaptation, and locale-specific formatting. Rigorous testing, including pseudo-localization, linguistic quality assurance, and functional locale testing, validates the work before release. Finally, continuous maintenance ensures that the product remains high quality across all supported markets as it evolves. Organizations that invest in this disciplined, step-by-step approach reduce rework, accelerate time-to-market for new locales, and deliver experiences that feel genuinely native to users in every region.

## References

- W3C Internationalization Activity. "Internationalization Techniques: Authoring HTML & CSS." https://www.w3.org/International/
- Unicode Consortium. "The Unicode Standard." https://www.unicode.org/standard/standard.html
- Unicode CLDR Project. "Common Locale Data Repository." https://cldr.unicode.org/
- ICU Project. "International Components for Unicode." https://icu.unicode.org/
- OASIS. "XLIFF Version 2.1 (XML Localisation Interchange File Format)." https://docs.oasis-open.org/xliff/xliff-core/v2.1/xliff-core-v2.1.html
- Esselink, Bert. *A Practical Guide to Localization.* John Benjamins Publishing, 2000.
- Lommel, Arle. "Multidimensional Quality Metrics (MQM) Framework." https://www.qt21.eu/mqm-definition/
- Mozilla Developer Network. "Internationalization (i18n)." https://developer.mozilla.org/en-US/docs/Glossary/Internationalization
