# Locale codes

Locale codes are standardized identifiers used in software internationalization (i18n) and localization (l10n) to represent a specific combination of language, country, script, region, and variant. They allow applications to adapt their behavior, formatting, and content to match the linguistic and cultural expectations of users around the world. A locale code such as "en-US" tells a system to use English as spoken in the United States, affecting everything from date formats and number separators to currency symbols and sort orders.

## Why locale codes matter

Software that serves a global audience must handle a wide range of cultural conventions. Dates, numbers, currencies, text direction, and collation rules all vary by locale. Without a consistent system for identifying these conventions, developers would need to hard-code cultural rules or invent ad hoc solutions. Locale codes solve this by providing a compact, standardized tag that encodes the necessary context for any internationalized operation. Operating systems, programming languages, databases, and web browsers all rely on locale codes to deliver culturally appropriate experiences.

## Structure of a locale code

A fully qualified locale code is composed of several subtags joined by hyphens or underscores. Not all subtags are required; the language subtag is the only mandatory component. The general structure follows the pattern established by BCP 47 (IETF Best Current Practice 47):

| Subtag   | Purpose                                      | Standard            | Example   |
|----------|----------------------------------------------|----------------------|-----------|
| Language | Identifies the spoken or written language     | ISO 639-1 / 639-3   | en, zh, ar |
| Script   | Identifies the writing system                 | ISO 15924            | Latn, Cyrl, Hans |
| Region   | Identifies the country or territory           | ISO 3166-1 alpha-2 / UN M.49 | US, GB, 419 |
| Variant  | Identifies a dialect or orthographic variant  | IANA subtag registry | valencia, 1996 |

A minimal locale code consists of just a language subtag (e.g., "fr" for French). More specific codes add subtags as needed: "zh-Hans-CN" specifies Chinese written in Simplified script as used in China.

## Language codes

The language subtag is the foundation of every locale code. It is drawn from the ISO 639 family of standards:

- **ISO 639-1** defines two-letter codes for major languages. These are the most commonly used in locale identifiers: "en" for English, "fr" for French, "de" for German, "ja" for Japanese, "ar" for Arabic.
- **ISO 639-2** and **ISO 639-3** extend coverage with three-letter codes, accommodating thousands of additional languages. ISO 639-3 aims to cover all known human languages, including endangered and historical ones.

In practice, two-letter codes from ISO 639-1 are preferred when available. Three-letter codes are used only for languages that lack a two-letter assignment.

## Country and region codes

The region subtag narrows a locale to a specific country or geographic area:

- **ISO 3166-1 alpha-2** provides two-letter country codes: "US" for the United States, "DE" for Germany, "JP" for Japan, "BR" for Brazil.
- **UN M.49** provides three-digit numeric codes for broader regions: "419" for Latin America, "150" for Europe, "001" for the world.

Region codes are important because the same language is often spoken differently across countries. Portuguese in Brazil ("pt-BR") differs significantly from Portuguese in Portugal ("pt-PT") in vocabulary, spelling, pronunciation, and formatting conventions.

## Script codes

The script subtag identifies the writing system and follows ISO 15924 with four-letter codes. It is most useful when a language is written in more than one script:

| Script code | Writing system         | Typical usage                        |
|-------------|------------------------|--------------------------------------|
| Latn        | Latin                  | Most European languages              |
| Cyrl        | Cyrillic               | Russian, Ukrainian, Serbian          |
| Arab        | Arabic                 | Arabic, Persian, Urdu                |
| Hans        | Simplified Chinese     | Mainland China, Singapore            |
| Hant        | Traditional Chinese    | Taiwan, Hong Kong, Macau             |
| Deva        | Devanagari             | Hindi, Sanskrit, Marathi             |

For Serbian, the script subtag is essential: "sr-Latn" for Latin script and "sr-Cyrl" for Cyrillic script. Similarly, Chinese requires a script subtag to distinguish Simplified ("zh-Hans") from Traditional ("zh-Hant").

## Variant codes

Variant subtags capture finer distinctions within a language-region combination that cannot be expressed by the other subtags alone. Examples include:

- **1996**: The 1996 German orthographic reform ("de-DE-1996")
- **valencia**: The Valencian dialect of Catalan ("ca-ES-valencia")
- **fonipa**: International Phonetic Alphabet transcription

Variant codes are registered in the IANA Language Subtag Registry and are less commonly encountered in everyday software than the other subtags.

## BCP 47 and IETF language tags

BCP 47 (composed of RFC 5646 and RFC 4647) is the authoritative specification for language tags used across the internet and in most modern software systems. It defines the syntax, semantics, and matching algorithms for locale codes. Key principles of BCP 47 include:

- Tags are case-insensitive but conventionally written with lowercase language, title-case script, and uppercase region: "zh-Hans-CN".
- Tags should be as short as possible; suppress the script subtag when it is the overwhelmingly dominant script for a language.
- Matching algorithms such as "lookup" and "filtering" allow software to find the best available locale when an exact match is not present.

## POSIX locale conventions

Unix-like operating systems use a slightly different locale format based on the POSIX standard. The pattern is typically:

**language[_territory][.codeset][@modifier]**

For example, "en_US.UTF-8" or "de_DE.UTF-8@euro". The underscore separator, explicit character encoding, and modifier suffix distinguish POSIX locale strings from BCP 47 tags. Most modern systems default to UTF-8 encoding, but the locale string still conventionally includes it.

| Convention | Separator | Encoding  | Example            |
|------------|-----------|----------|--------------------|
| BCP 47     | Hyphen    | Implicit | en-US              |
| POSIX      | Underscore| Explicit | en_US.UTF-8        |
| Java       | Underscore| Implicit | en_US              |
| .NET       | Hyphen    | Implicit | en-US              |

## Common locale codes in practice

The following table lists some of the most frequently encountered locale codes in international software:

| Locale code | Language              | Region / Notes                  |
|-------------|-----------------------|---------------------------------|
| en-US       | English               | United States                   |
| en-GB       | English               | United Kingdom                  |
| fr-FR       | French                | France                          |
| fr-CA       | French                | Canada (Canadian French)        |
| de-DE       | German                | Germany                         |
| es-ES       | Spanish               | Spain (Castilian)               |
| es-419      | Spanish               | Latin America                   |
| pt-BR       | Portuguese            | Brazil                          |
| zh-Hans-CN  | Chinese (Simplified)  | Mainland China                  |
| zh-Hant-TW  | Chinese (Traditional) | Taiwan                          |
| ja-JP       | Japanese              | Japan                           |
| ko-KR       | Korean                | South Korea                     |
| ar-SA       | Arabic                | Saudi Arabia                    |
| hi-IN       | Hindi                 | India                           |
| ru-RU       | Russian               | Russia                          |

## Locale negotiation and fallback

When a system cannot find resources for the exact locale requested, it applies a fallback strategy. The typical approach is to progressively remove subtags from right to left until a match is found:

1. Try the full tag: "pt-BR"
2. Remove the region: "pt"
3. Fall back to a configured default locale, often "en" or "en-US"

More sophisticated systems use the Accept-Language HTTP header, ICU locale matching, or CLDR likely subtags data to negotiate the best match. The Unicode CLDR (Common Locale Data Repository) provides the most comprehensive dataset for locale-sensitive operations, covering number formatting, date patterns, currency names, pluralization rules, and more.

## Related

To build on an understanding of locale codes, explore internationalization (i18n) frameworks and libraries such as ICU, gettext, and the Intl API in JavaScript. Study the Unicode CLDR project for detailed locale data. Learn about character encoding standards, especially Unicode and UTF-8. Investigate right-to-left (RTL) language support, pluralization rules, and locale-aware collation. Understanding the HTTP Accept-Language header and content negotiation is essential for web development, and knowledge of POSIX locale configuration is valuable for systems administration.

## Summary

Locale codes are compact, standardized identifiers that encode language, script, region, and variant information into a single tag. They are foundational to internationalization and localization, enabling software to adapt formatting, content, and behavior to the cultural expectations of diverse user populations. BCP 47 provides the modern standard for constructing and matching these tags, while POSIX and platform-specific conventions persist in operating systems and programming environments. A technology professional who understands locale codes can design systems that serve a global audience correctly, respectfully, and efficiently.

## References

- **BCP 47 / RFC 5646**: "Tags for Identifying Languages" — https://www.rfc-editor.org/rfc/rfc5646
- **ISO 639**: Language codes — https://www.iso.org/iso-639-language-code
- **ISO 3166**: Country codes — https://www.iso.org/iso-3166-country-codes.html
- **ISO 15924**: Script codes — https://www.unicode.org/iso15924/
- **IANA Language Subtag Registry** — https://www.iana.org/assignments/language-subtag-registry
- **Unicode CLDR** (Common Locale Data Repository) — https://cldr.unicode.org/
- **W3C Internationalization**: Language tags in HTML and XML — https://www.w3.org/International/articles/language-tags/
- **ICU** (International Components for Unicode) — https://icu.unicode.org/
