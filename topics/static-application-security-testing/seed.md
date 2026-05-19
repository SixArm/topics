# Static Application Security Testing (SAST)

Static Application Security Testing (SAST) is a "white-box" testing methodology that analyzes application source code, bytecode, or binaries for security vulnerabilities while the application is "at rest" (not running). [1, 2]

## How SAST Works

SAST tools inspect the code from the inside out to find potential flaws before the software is compiled or deployed. The process typically involves: [3, 4]

1.  Code Parsing: The tool breaks down the source code into an intermediate format, often an Abstract Syntax Tree (AST), to understand its structure and logic. [5, 6]
2.  Taint Analysis: It tracks the flow of untrusted data from "sources" (like user input) to "sinks" (sensitive functions) to check if the data is properly sanitized. [6, 7]
3.  Pattern Matching: The tool compares code against a database of known insecure patterns, such as the [OWASP Top 10](https://owasp.org/www-project-top-ten/) or [CWE Top 25](https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html). [8, 9]
4.  Control Flow Analysis: It examines the order of operations to identify logical flaws or paths that could lead to vulnerabilities. [4, 6]

## Key Benefits

- Early Detection: Integrating SAST into the IDE or [CI/CD pipeline](https://en.wikipedia.org/wiki/CI/CD) allows developers to "shift left," catching and fixing bugs during the coding phase when they are significantly cheaper to resolve.
- Precision: SAST provides the exact file name and line number where a vulnerability exists, along with remediation guidance.
- Full Coverage: Unlike runtime testing, SAST can analyze 100% of the codebase, including paths that are rarely executed. [1, 3, 4, 7]

## Common Vulnerabilities Detected

SAST excels at finding code-level flaws such as:

- Injection Attacks: SQL injection, Command injection, and Cross-Site Scripting (XSS).
- Memory Management: Buffer overflows and memory leaks.
- Sensitive Data Exposure: Hardcoded passwords, API keys, or weak cryptographic algorithms. [3, 4, 5, 6, 7]

## Limitations

- High False Positives: SAST tools may flag theoretical paths that cannot be exploited in reality, leading to "alert fatigue".
- No Runtime Context: It cannot detect issues that only appear when the app is running, such as server misconfigurations or authentication/authorization flaws.
- Language Dependent: Tools are specific to programming languages; a tool for [Java](https://www.java.com/) may not work for [Python](https://www.python.org/) or [Rust](https://www.rust-lang.org/). [3, 4, 5, 7, 10, 11]

## Popular SAST Tools

| Tool                                                                      | Best For                | Key Feature                                                                                          |
| ------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| Snyk Code[](https://snyk.io/product/snyk-code/)                           | Developer Workflow      | Real-time IDE scanning with AI-powered auto-fixes.                                                   |
| Checkmarx[](https://checkmarx.com/)                                       | Enterprise Scale        | Deep ruleset supporting over 30 languages and uncompiled code.                                       |
| SonarQube[](https://www.sonarsource.com/products/sonarqube/)              | Code Quality & Security | Combines security with code quality metrics and "quality gates".                                     |
| Semgrep[](https://semgrep.dev/)                                           | Speed & Customization   | Lightweight, fast pattern matcher that lets you write custom rules.                                  |
| GitHub Advanced Security[](https://github.com/security/advanced-security) | GitHub Users            | Built-in CodeQL[](https://codeql.github.com/) analysis that treats code as data for complex queries. |
