## Locale Codes: A Comprehensive Guide for Technology Professionals

Locale codes are fundamental to building software that works across languages, regions, and cultures. This tutorial explains the structure, standards, and practical applications of locale codes for internationalization (i18n) and localization (l10n).

## What Are Locale Codes?

A locale code is a standardized identifier that defines a specific linguistic and cultural context. It combines multiple components—language, country, script, region, and variant—to precisely specify how content should be formatted, displayed, and processed for a particular audience.

For example, `en-US` represents English as used in the United States, while `en-GB` represents English as used in the United Kingdom. Though both are English, they differ in spelling conventions, date formats, currency symbols, and measurement systems.

## Core Components of Locale Codes

Locale codes are built from several standardized components, each serving a distinct purpose:

| Component | Standard | Format | Example | Purpose |
|-----------|----------|--------|---------|---------|
| Language | ISO 639-1/639-3 | 2-3 letters | `en`, `zh`, `por` | Identifies the spoken/written language |
| Country | ISO 3166-1 alpha-2 | 2 letters | `US`, `CN`, `BR` | Identifies the country or territory |
| Script | ISO 15924 | 4 letters | `Latn`, `Hans`, `Cyrl` | Identifies the writing system |
| Region | ISO 3166-2 / UN M.49 | Variable | `CA`, `419` | Identifies sub-national regions |
| Variant | Custom | Variable | `valencia`, `1901` | Identifies dialects or orthographic variants |

## Language Codes

Language codes form the foundation of every locale identifier. Two primary standards exist:

**ISO 639-1** uses two-letter codes and covers the most widely spoken languages:

| Code | Language |
|------|----------|
| `en` | English |
| `es` | Spanish |
| `zh` | Chinese |
| `ar` | Arabic |
| `hi` | Hindi |
| `pt` | Portuguese |
| `fr` | French |
| `de` | German |
| `ja` | Japanese |
| `ko` | Korean |

**ISO 639-3** uses three-letter codes and covers all known languages, including extinct and constructed languages. Use ISO 639-3 when you need to identify languages not covered by ISO 639-1.

## Country Codes

Country codes specify the geographic or political context for a language. ISO 3166-1 alpha-2 provides standardized two-letter codes:

| Code | Country |
|------|---------|
| `US` | United States |
| `GB` | United Kingdom |
| `CA` | Canada |
| `AU` | Australia |
| `DE` | Germany |
| `FR` | France |
| `JP` | Japan |
| `CN` | China |
| `BR` | Brazil |
| `IN` | India |

Country codes matter because the same language often has regional variations:

- `es-ES` (Spanish - Spain) vs `es-MX` (Spanish - Mexico)
- `pt-PT` (Portuguese - Portugal) vs `pt-BR` (Portuguese - Brazil)
- `zh-CN` (Chinese - China) vs `zh-TW` (Chinese - Taiwan)

## Script Codes

Script codes identify the writing system used for a language. This is essential for languages that use multiple scripts or when the script differs from what might be assumed.

| Code | Script | Common Usage |
|------|--------|--------------|
| `Latn` | Latin | Most European languages |
| `Cyrl` | Cyrillic | Russian, Ukrainian, Bulgarian |
| `Arab` | Arabic | Arabic, Persian, Urdu |
| `Hans` | Simplified Chinese | Mainland China, Singapore |
| `Hant` | Traditional Chinese | Taiwan, Hong Kong, Macau |
| `Deva` | Devanagari | Hindi, Sanskrit, Marathi |
| `Jpan` | Japanese | Japanese (mixed scripts) |
| `Kore` | Korean | Korean |
| `Grek` | Greek | Greek |
| `Hebr` | Hebrew | Hebrew, Yiddish |

Script codes become critical in scenarios like:

- `zh-Hans` (Simplified Chinese) vs `zh-Hant` (Traditional Chinese)
- `sr-Latn` (Serbian in Latin script) vs `sr-Cyrl` (Serbian in Cyrillic script)
- `uz-Latn` (Uzbek in Latin) vs `uz-Cyrl` (Uzbek in Cyrillic)

## Region Codes

Region codes specify sub-national divisions or broader geographic areas. Two standards apply:

**ISO 3166-2** defines subdivision codes using a country code prefix:

- `US-CA` — California, United States
- `GB-SCT` — Scotland, United Kingdom
- `CA-QC` — Quebec, Canada

**UN M.49** provides numeric codes for macro-geographic regions:

| Code | Region |
|------|--------|
| `001` | World |
| `019` | Americas |
| `150` | Europe |
| `419` | Latin America and the Caribbean |
| `021` | Northern America |
| `030` | Eastern Asia |

UN M.49 codes are useful for targeting broad regions rather than specific countries, such as `es-419` for Latin American Spanish.

## Variant Codes

Variant codes capture additional distinctions not covered by language, country, or script. Unlike other components, variant codes are not universally standardized.

Common use cases include:

- **Orthographic reforms**: `de-1901` (German, 1901 orthography) vs `de-1996` (German, 1996 orthography)
- **Regional dialects**: `ca-valencia` (Valencian Catalan)
- **Historical variants**: `sl-rozaj` (Resian dialect of Slovenian)

## Locale Code Formats

Two primary formats exist for structuring locale codes:

**IETF BCP 47** (recommended for most applications):
- Uses hyphens as separators
- Examples: `en-US`, `zh-Hans-CN`, `sr-Latn-RS`
- Widely used in web standards, HTTP headers, and modern programming languages

**POSIX/GNU format** (common in Unix systems):
- Uses underscores and periods
- Examples: `en_US.UTF-8`, `zh_CN.GB2312`
- Includes character encoding specification

| Format | Example | Usage Context |
|--------|---------|---------------|
| BCP 47 | `en-US` | Web, APIs, modern frameworks |
| BCP 47 extended | `zh-Hans-CN` | When script distinction matters |
| POSIX | `en_US.UTF-8` | Unix/Linux system configuration |
| Java | `en_US` | Java Locale class |
| Windows | `en-US` | Windows system settings |

## Practical Applications

Locale codes drive numerous aspects of software behavior:

**Number formatting**:
- `en-US`: 1,234.56
- `de-DE`: 1.234,56
- `fr-FR`: 1 234,56

**Date formatting**:
- `en-US`: 12/31/2024 (MM/DD/YYYY)
- `en-GB`: 31/12/2024 (DD/MM/YYYY)
- `ja-JP`: 2024年12月31日

**Currency display**:
- `en-US`: $1,000.00
- `de-DE`: 1.000,00 €
- `ja-JP`: ¥1,000

**Text direction**:
- `en`, `fr`, `zh`: Left-to-right
- `ar`, `he`, `fa`: Right-to-left

**Collation (sorting)**:
- Different alphabetical ordering rules per locale
- Accent handling varies by language

## Best Practices

When implementing locale support:

- **Use BCP 47 format** for new applications—it is the modern standard
- **Always specify the country code** when regional differences matter
- **Include script codes** for languages with multiple writing systems
- **Fall back gracefully**—if `en-AU` resources are unavailable, fall back to `en`
- **Store user preferences** explicitly rather than inferring from IP or browser settings
- **Test with real users** from target locales to catch cultural issues
- **Separate translation from formatting**—locale affects more than just text strings
- **Use established libraries** for locale-aware formatting rather than building custom solutions

## Common Locale Codes Reference

| Locale Code | Description |
|-------------|-------------|
| `en-US` | English (United States) |
| `en-GB` | English (United Kingdom) |
| `es-ES` | Spanish (Spain) |
| `es-MX` | Spanish (Mexico) |
| `es-419` | Spanish (Latin America) |
| `pt-BR` | Portuguese (Brazil) |
| `pt-PT` | Portuguese (Portugal) |
| `zh-Hans-CN` | Chinese, Simplified (China) |
| `zh-Hant-TW` | Chinese, Traditional (Taiwan) |
| `ja-JP` | Japanese (Japan) |
| `ko-KR` | Korean (South Korea) |
| `de-DE` | German (Germany) |
| `fr-FR` | French (France) |
| `fr-CA` | French (Canada) |
| `ar-SA` | Arabic (Saudi Arabia) |
| `hi-IN` | Hindi (India) |
| `ru-RU` | Russian (Russia) |

## Summary

Locale codes are the backbone of internationalized software. Understanding their structure—language, country, script, region, and variant components—enables you to build applications that correctly handle the linguistic and cultural expectations of users worldwide. Use the BCP 47 standard, include appropriate specificity for your use case, and leverage established libraries for locale-aware formatting and processing.
