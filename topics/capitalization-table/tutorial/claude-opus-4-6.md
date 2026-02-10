# Capitalization table

A capitalization table, commonly known as a "cap table," is a detailed record of a company's equity ownership structure. It enumerates every security the company has issued — common stock, preferred stock, options, warrants, convertible notes — and maps each to its holder and the corresponding ownership percentage. For technology professionals involved in founding, funding, or scaling startups, the cap table is one of the most consequential financial documents in the company's life, directly governing dilution, valuation, governance rights, and exit economics.

## Purpose and Importance

The cap table serves as the single source of truth for who owns what in a company. It answers foundational questions: How much of the company does each founder retain? What percentage will a new investor receive? How many shares remain in the employee option pool? Because these questions touch every major business decision — from hiring to fundraising to acquisition — the cap table must be accurate, current, and accessible to authorized stakeholders.

For technology startups in particular, equity is a primary form of compensation and incentive. Engineers, designers, and product managers routinely negotiate stock option grants, making the cap table directly relevant to their personal financial interests. Founders who neglect the cap table risk misunderstandings with employees, conflicts with investors, and costly legal remediation.

## Key Components

A well-constructed cap table tracks several categories of information:

- **Shareholders and holders**: The names of all individuals and entities that hold equity or equity-like instruments in the company.
- **Security types**: Common stock, preferred stock (often in multiple series), stock options (ISO and NSO), restricted stock units (RSUs), warrants, convertible notes, and SAFEs.
- **Share counts**: The number of shares authorized, issued, and outstanding for each class of security.
- **Vesting schedules**: The timeline and conditions under which shares or options become fully owned by the holder, typically a four-year schedule with a one-year cliff.
- **Exercise prices**: The strike price at which option holders can purchase shares, usually set at fair market value at the time of grant.
- **Ownership percentages**: Each holder's proportional stake, calculated on both a fully diluted and outstanding-only basis.
- **Valuation inputs**: The price per share for each funding round, the pre-money and post-money valuations, and any applicable discounts or caps on convertible instruments.

## Common Security Types

| Security Type | Description | Typical Holder | Key Characteristic |
|---|---|---|---|
| Common Stock | Base equity with standard voting rights | Founders, employees | Last in liquidation preference |
| Preferred Stock | Equity with enhanced rights and protections | Investors (Series A, B, C, etc.) | Liquidation preference, anti-dilution |
| Stock Options (ISO) | Right to purchase shares at a fixed price, with tax advantages | Employees | Subject to vesting; favorable tax treatment |
| Stock Options (NSO) | Right to purchase shares at a fixed price | Employees, advisors, contractors | Subject to vesting; taxed as ordinary income |
| Restricted Stock Units | Promise to deliver shares upon vesting | Employees at later-stage companies | No exercise price; taxed at vesting |
| Warrants | Right to purchase shares, often attached to debt | Investors, lenders | Typically longer exercise windows |
| Convertible Notes | Debt that converts to equity at a future round | Early-stage investors | Includes interest rate, discount, and/or cap |
| SAFE | Simple Agreement for Future Equity | Early-stage investors | No interest or maturity; converts at next priced round |

## How Dilution Works

Dilution is the reduction in an existing shareholder's ownership percentage that occurs when new shares are issued. Every time a company raises a new funding round, grants employee options, or converts debt into equity, the total share count increases and each prior holder's proportional stake decreases.

Consider a simplified scenario:

| Event | Founder Shares | Investor Shares | Option Pool | Total Shares | Founder Ownership |
|---|---|---|---|---|---|
| Incorporation | 8,000,000 | 0 | 2,000,000 | 10,000,000 | 80.0% |
| Series A | 8,000,000 | 3,333,333 | 2,000,000 | 13,333,333 | 60.0% |
| Option pool expansion | 8,000,000 | 3,333,333 | 3,500,000 | 14,833,333 | 53.9% |
| Series B | 8,000,000 | 7,333,333 | 3,500,000 | 18,833,333 | 42.5% |

Understanding this math is essential for founders negotiating term sheets and for employees evaluating the real value of their equity grants.

## Fully Diluted vs. Outstanding Shares

There are two standard ways to calculate ownership percentages, and the distinction matters greatly:

- **Outstanding shares**: Only counts shares that have actually been issued. This excludes unexercised options, unconverted notes, and unallocated pool shares.
- **Fully diluted shares**: Counts all shares that would exist if every option were exercised, every convertible instrument converted, and every pool share allocated.

Investors almost always negotiate on a fully diluted basis because it gives the most conservative (and realistic) picture of ownership. Employees should likewise evaluate their grants on a fully diluted basis to understand their true proportional stake.

## Cap Table Management

Early-stage companies often manage their cap table in a spreadsheet. As the company grows and the table becomes more complex — multiple funding rounds, dozens or hundreds of option holders, various convertible instruments — dedicated cap table management software becomes necessary.

Leading platforms in this space include:

- **Carta**: The most widely adopted cap table platform, offering equity management, 409A valuations, and compliance tools.
- **Pulley**: A newer entrant focused on simplicity and affordability for early-stage startups.
- **Shareworks (Morgan Stanley)**: Enterprise-grade equity management for later-stage and public companies.
- **Ledgy**: Popular in European markets, with strong support for international equity plans.

These platforms automate share issuance, track vesting, model dilution scenarios, generate tax forms (such as 3921 for ISOs), and provide investor portals. For technology companies with distributed teams and complex equity structures, professional cap table management is not optional — it is infrastructure.

## Common Pitfalls

- **Inaccurate or outdated records**: Failing to update the cap table after every equity event creates discrepancies that surface at the worst possible time, typically during due diligence for a fundraise or acquisition.
- **Missing 409A valuations**: U.S. companies must obtain an independent fair market value appraisal (a 409A valuation) before issuing stock options. Skipping this step exposes option holders to significant tax penalties.
- **Unclear vesting terms**: Ambiguity about vesting schedules, acceleration clauses, or exercise windows leads to disputes between founders and employees.
- **Ignoring convertible instruments**: SAFEs and convertible notes are easy to issue but easy to forget. Failing to model their conversion impact leads to unpleasant surprises at the next priced round.
- **Over-promising equity**: Committing too large a share of the company to early hires or advisors without understanding the cumulative dilutive effect.

## Related

Technology professionals working with capitalization tables should also study equity compensation and stock option plans, vesting schedules and cliffs, 409A valuations, term sheets and fundraising mechanics, liquidation preferences and waterfall analysis, convertible notes and SAFEs, dilution modeling, corporate governance, securities law fundamentals, and exit strategies including IPOs and acquisitions.

## Summary

A capitalization table is the authoritative record of a company's ownership structure, tracking every share, option, warrant, and convertible instrument alongside its holder and terms. It governs dilution calculations, informs valuation discussions, and underpins every major equity transaction from seed funding through exit. For technology professionals — whether as founders managing their company's equity, employees evaluating compensation packages, or investors assessing deal terms — fluency with cap tables is an essential financial and strategic skill.

## References

- Feld, B., & Mendelson, J. (2019). *Venture Deals: Be Smarter Than Your Lawyer and Venture Capitalist* (4th ed.). Wiley.
- Wasserman, N. (2012). *The Founder's Dilemmas: Anticipating and Avoiding the Pitfalls That Can Sink a Startup*. Princeton University Press.
- U.S. Internal Revenue Service. (2024). Section 409A: Nonqualified Deferred Compensation Plans. https://www.irs.gov/retirement-plans/section-409a-nonqualified-deferred-compensation-plans
- Y Combinator. (2023). SAFE: Simple Agreement for Future Equity. https://www.ycombinator.com/documents
- Carta. (2024). Cap Table Management. https://carta.com/cap-table-management/
- National Venture Capital Association. (2020). Model Legal Documents. https://nvca.org/model-legal-documents/
