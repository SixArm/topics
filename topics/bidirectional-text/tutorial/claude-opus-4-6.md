# Bidirectional text (bidi)

Bidirectional text, commonly abbreviated as "bidi," refers to content that contains both left-to-right (LTR) and right-to-left (RTL) scripts within the same document, paragraph, or line. This occurs most frequently when languages such as Arabic, Hebrew, Persian, or Urdu are mixed with Latin-script languages like English, French, or Spanish. The Unicode Bidirectional Algorithm (UBA) governs how these mixed-direction runs of text are ordered and displayed, but technology professionals working on internationalized software must understand the deeper implications for rendering, layout, user input, and data integrity.

## Why bidirectional text matters

Modern software serves a global audience. Over 500 million people use RTL scripts as their primary writing system. Any application that handles user-generated content, messaging, e-commerce, or documentation will inevitably encounter bidirectional text. Failing to handle bidi correctly leads to garbled output, misattributed quotations, reversed numbers, broken URLs, and a degraded user experience that can render an application unusable for RTL-language communities.

## LTR and RTL scripts

The world's writing systems fall into three directional categories relevant to bidi handling.

| Direction | Scripts | Examples |
|---|---|---|
| Left-to-right (LTR) | Latin, Cyrillic, Greek, Devanagari, Thai, CJK | English, Russian, Hindi, Chinese |
| Right-to-left (RTL) | Arabic, Hebrew, Syriac, Thaana, N'Ko | Arabic, Hebrew, Persian, Urdu, Dhivehi |
| Weak / Neutral | Digits, punctuation, whitespace | 0-9, commas, periods, parentheses |

Weak and neutral characters do not have an inherent directionality. Their rendered order depends on the surrounding strong characters, which is a frequent source of bidi bugs.

## The Unicode Bidirectional Algorithm

The Unicode Bidirectional Algorithm (UBA), defined in Unicode Standard Annex #9, is the specification that determines how mixed-direction text is reordered for display. It operates in several phases:

- **Character classification**: Every Unicode code point is assigned a Bidi_Class property (e.g., L for left-to-right, R for right-to-left, AN for Arabic number, EN for European number, WS for whitespace).
- **Paragraph-level determination**: The algorithm determines the base direction of each paragraph, typically from the first strong directional character or from an explicit override.
- **Explicit embedding and override**: Unicode control characters such as LRE, RLE, LRO, RLO, and PDF allow authors to explicitly set or override the embedding level of a run of text. The newer isolate controls (LRI, RLI, FSI, PDI) introduced in Unicode 6.3 provide safer scoping.
- **Resolution of weak and neutral types**: The algorithm resolves the direction of digits, punctuation, and whitespace based on the surrounding strong characters and the current embedding level.
- **Reordering**: Characters are reordered for visual display according to their resolved embedding levels, so that each directional run appears in its natural reading order.

Understanding these phases is essential for diagnosing rendering bugs and for knowing when to apply explicit directional controls versus relying on the algorithm's implicit behavior.

## Explicit directional controls

When the implicit algorithm produces incorrect results, developers can insert explicit directional controls. The two generations of controls serve different purposes.

| Control | Unicode | Purpose |
|---|---|---|
| LRM (Left-to-Right Mark) | U+200E | Invisible strong LTR character; used to resolve ambiguous neutrals |
| RLM (Right-to-Left Mark) | U+200F | Invisible strong RTL character; used to resolve ambiguous neutrals |
| LRE (Left-to-Right Embedding) | U+202A | Opens an LTR embedding level (legacy) |
| RLE (Right-to-Left Embedding) | U+202B | Opens an RTL embedding level (legacy) |
| PDF (Pop Directional Formatting) | U+202C | Closes the most recent LRE/RLE/LRO/RLO (legacy) |
| LRI (Left-to-Right Isolate) | U+2066 | Opens an LTR directional isolate (recommended) |
| RLI (Right-to-Left Isolate) | U+2067 | Opens an RTL directional isolate (recommended) |
| FSI (First Strong Isolate) | U+2068 | Opens an isolate whose direction is determined by the first strong character |
| PDI (Pop Directional Isolate) | U+2069 | Closes the most recent LRI/RLI/FSI |

The isolate controls (LRI, RLI, FSI, PDI) are strongly preferred over the legacy embedding controls because isolates prevent directional influence from leaking across boundaries, which eliminates an entire class of bidi bugs.

## HTML and CSS considerations

Web technologies provide their own mechanisms for bidi support:

- **The `dir` attribute**: Applied to HTML elements, this attribute sets the base direction. Valid values are `ltr`, `rtl`, and `auto`. The `auto` value uses the first-strong heuristic, similar to FSI.
- **The `<bdo>` element**: The Bidirectional Override element forces a specific direction on its content, overriding the UBA.
- **The `<bdi>` element**: The Bidirectional Isolate element isolates its content from the surrounding directional context, equivalent to wrapping content in FSI/PDI.
- **CSS `direction` and `unicode-bidi` properties**: These properties control bidi behavior at the rendering level. The `unicode-bidi: isolate` value mirrors the behavior of the `<bdi>` element. The `unicode-bidi: plaintext` value is useful for user-generated content where the base direction is unknown.
- **CSS logical properties**: Properties like `margin-inline-start`, `padding-inline-end`, `border-inline`, and `inset-inline` adapt automatically to the document's directionality, replacing hardcoded `left`/`right` values.

## Layout mirroring

When an entire interface must serve RTL users, layout mirroring goes beyond text direction. The following elements are typically mirrored:

- **Reading flow**: Content blocks, columns, and navigation items reverse their horizontal order.
- **Icons with directional meaning**: Arrows, progress indicators, forward/back icons, and list bullets should be mirrored. Icons without inherent directionality (e.g., a clock, a magnifying glass) should not be mirrored.
- **Form fields and labels**: Labels that appear to the left of fields in LTR layouts should appear to the right in RTL layouts.
- **Scroll direction**: Horizontal scrolling and carousels reverse their direction of travel.
- **Margins and padding**: Asymmetric spacing must swap sides. CSS logical properties handle this automatically.

## Typography and font selection

Not all fonts handle bidi text well. When selecting fonts for bidi-capable applications, consider:

- **Script coverage**: The font must include glyphs for all required scripts. If a single font cannot cover both LTR and RTL scripts, use a font stack that provides seamless fallback.
- **Contextual shaping**: Arabic and several other RTL scripts require contextual glyph shaping (initial, medial, final, and isolated forms). The font and the text shaping engine (e.g., HarfBuzz) must support OpenType features like `init`, `medi`, `fina`, and `isol`.
- **Baseline alignment**: Latin and Arabic scripts have different baseline conventions. Ensure that mixed-script lines maintain consistent vertical alignment.
- **Numeral styles**: Arabic-script languages may use either Western Arabic numerals (0-9) or Eastern Arabic numerals. The font should support both, and the application should respect the user's locale preference.

## Text input and editing

Bidirectional text editing is one of the most complex areas of bidi support:

- **Cursor movement**: The cursor must follow visual order for arrow key navigation but logical order for text selection and deletion. This dual behavior is counterintuitive and must be tested carefully.
- **Caret positioning**: At the boundary between LTR and RTL runs, there are two possible visual positions for the same logical position. Some systems display a split caret or use a directional caret indicator.
- **Input method switching**: Users must be able to switch between LTR and RTL input modes, and the input direction should update the local paragraph or field direction accordingly.
- **Copy and paste**: Pasted text should preserve its directional properties. Stripping Unicode directional controls during sanitization can corrupt bidi text.

## Common pitfalls

- **Concatenating bidi strings without isolation**: Building display strings by concatenating LTR and RTL segments without isolate characters or markup causes directional spillover and garbled output.
- **Stripping Unicode control characters**: Security-motivated sanitization that removes all control characters can destroy legitimate directional formatting. Sanitization must be bidi-aware.
- **Hardcoded `left`/`right` in CSS**: Using physical directional properties instead of logical properties breaks RTL layouts and creates maintenance burden.
- **Ignoring weak characters at boundaries**: Punctuation, parentheses, and digits at the junction of LTR and RTL runs are the most frequent source of visual ordering bugs.
- **Assuming base direction from locale alone**: User-generated content can be in any language regardless of the user's locale. Fields that accept freeform text should use `dir="auto"` or FSI/PDI rather than assuming a fixed direction.
- **Bidi spoofing and security**: Malicious use of directional override characters (such as RLO) can make filenames, URLs, or code appear to read differently than their logical content. This has been exploited in phishing attacks and source code obfuscation (CVE-2021-42574). Applications should filter or neutralize overrides in security-sensitive contexts.

## Testing bidirectional text

Thorough bidi testing requires a structured approach:

- **Use pseudolocalization**: Tools that replace Latin characters with mirrored or accented equivalents can reveal hardcoded directional assumptions before translation begins.
- **Test with real RTL content**: Pseudolocalization catches structural issues, but real Arabic or Hebrew text is necessary to validate shaping, ligatures, and reading flow.
- **Test mixed-direction scenarios**: Include test cases with embedded LTR text within RTL paragraphs and vice versa, with numbers, punctuation, URLs, email addresses, and file paths.
- **Involve native speakers**: Automated testing catches rendering failures, but only native RTL-language users can evaluate whether the reading experience is natural and correct.
- **Test edge cases**: Empty strings, single-character strings, strings composed entirely of neutral characters, and extremely long unbroken RTL runs all exercise different code paths.

## Related

Related topics to explore include internationalization and localization strategies, Unicode encoding and character sets, locale-aware formatting for dates, numbers, and currencies, accessibility standards for multilingual interfaces, CSS logical properties and writing modes, the OpenType specification for complex script shaping, and right-to-left language support in specific frameworks and platforms.

## Summary

Bidirectional text handling is a foundational capability for any software system that serves a global audience. It requires understanding the Unicode Bidirectional Algorithm, using the correct explicit directional controls (preferring isolates over legacy embeddings), mirroring layouts and UI elements for RTL contexts, selecting fonts that support contextual shaping, and building text input experiences that respect the dual nature of visual and logical cursor movement. The most common bugs arise from string concatenation without isolation, sanitization that strips directional controls, and hardcoded physical directions in CSS. Rigorous testing with real RTL content and native-speaker review is essential to delivering a correct and respectful multilingual user experience.

## References

- Unicode Standard Annex #9: Unicode Bidirectional Algorithm, https://unicode.org/reports/tr9/
- W3C Internationalization: Inline markup and bidirectional text in HTML, https://www.w3.org/International/articles/inline-bidi-markup/
- W3C Internationalization: Structural markup and right-to-left text in HTML, https://www.w3.org/International/questions/qa-html-dir
- CSS Writing Modes Level 4, https://www.w3.org/TR/css-writing-modes-4/
- Material Design: Bidirectionality guidelines, https://m2.material.io/design/usability/bidirectionality.html
- CVE-2021-42574: Trojan Source attack using bidi overrides, https://trojansource.codes/
