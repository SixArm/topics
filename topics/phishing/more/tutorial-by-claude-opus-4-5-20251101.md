## Phishing

Phishing is a social engineering attack where adversaries impersonate trustworthy entities to steal sensitive information. Attackers craft deceptive communications—emails, messages, or calls—that appear legitimate, tricking recipients into revealing credentials, financial data, or personal information.

## How Phishing Works

A phishing attack follows a predictable pattern:

1. **Reconnaissance** — The attacker researches targets, gathering information from social media, corporate websites, or data breaches
2. **Weaponization** — The attacker creates convincing fake communications, including spoofed sender addresses and cloned websites
3. **Delivery** — The malicious content reaches the victim via email, SMS, voice call, or social media
4. **Exploitation** — The victim clicks a link, opens an attachment, or responds with sensitive data
5. **Collection** — Credentials or data flow to attacker-controlled infrastructure
6. **Action** — The attacker uses harvested information for fraud, account takeover, or further attacks

## Types of Phishing Attacks

| Type | Description | Target |
|------|-------------|--------|
| **Email Phishing** | Mass emails impersonating legitimate organizations | General population |
| **Spear Phishing** | Highly targeted emails using personal details about the victim | Specific individuals |
| **Whaling** | Spear phishing aimed at executives and high-value targets | C-suite, board members |
| **Smishing** | Phishing via SMS text messages | Mobile device users |
| **Vishing** | Voice phishing through phone calls | Anyone with a phone |
| **Clone Phishing** | Replicating legitimate emails with malicious modifications | Previous email recipients |
| **Angler Phishing** | Impersonating customer support on social media | Social media users |
| **Business Email Compromise (BEC)** | Impersonating executives to authorize fraudulent transfers | Finance departments |

## Common Phishing Indicators

Watch for these red flags in suspicious communications:

- **Urgency or threats** — "Your account will be suspended in 24 hours"
- **Generic greetings** — "Dear Customer" instead of your name
- **Spelling and grammar errors** — Professional organizations proofread their communications
- **Mismatched URLs** — Hover over links to reveal the actual destination
- **Suspicious sender addresses** — Look for subtle misspellings like "paypa1.com" instead of "paypal.com"
- **Unexpected attachments** — Especially executable files or macros
- **Requests for sensitive information** — Legitimate organizations rarely ask for passwords via email
- **Too good to be true offers** — Prize winnings, inheritance, or unexpected refunds

## Technical Mechanisms

Phishing attacks leverage several technical components:

- **Domain spoofing** — Registering domains that visually resemble legitimate ones (typosquatting, homograph attacks using Unicode characters)
- **Email header spoofing** — Forging the "From" field to display a trusted sender
- **URL obfuscation** — Using URL shorteners, data URIs, or encoded characters to hide malicious destinations
- **SSL certificates** — Obtaining certificates for phishing domains to display the padlock icon
- **Credential harvesting pages** — Pixel-perfect replicas of login pages that capture input
- **Malicious attachments** — Documents with embedded macros, JavaScript, or exploits

## Defensive Measures for Individuals

- **Verify sender identity** — Contact organizations directly through official channels, not reply addresses
- **Inspect URLs before clicking** — Hover to preview, check for HTTPS, and verify the domain
- **Enable multi-factor authentication** — Compromised passwords alone cannot grant access
- **Use a password manager** — Auto-fill only works on legitimate domains
- **Keep software updated** — Patches close vulnerabilities that phishing exploits
- **Report suspicious messages** — Forward to your IT security team or the impersonated organization

## Organizational Defenses

| Defense Layer | Implementation |
|---------------|----------------|
| **Email filtering** | Deploy SPF, DKIM, and DMARC to authenticate legitimate senders and block spoofed emails |
| **Web filtering** | Block access to known phishing domains and newly registered suspicious sites |
| **Security awareness training** | Conduct regular phishing simulations and education programs |
| **Endpoint protection** | Use anti-malware with real-time scanning and behavioral analysis |
| **DNS security** | Implement DNS filtering to prevent resolution of malicious domains |
| **Incident response** | Establish clear procedures for reporting and responding to phishing attempts |
| **Network segmentation** | Limit lateral movement if credentials are compromised |
| **Zero trust architecture** | Verify every access request regardless of network location |

## Email Authentication Protocols

These protocols help receiving servers verify email authenticity:

- **SPF (Sender Policy Framework)** — Specifies which IP addresses can send email for your domain
- **DKIM (DomainKeys Identified Mail)** — Adds a cryptographic signature to verify message integrity
- **DMARC (Domain-based Message Authentication, Reporting, and Conformance)** — Instructs receivers how to handle emails that fail SPF/DKIM checks

## Response to a Successful Phishing Attack

If you suspect you have been phished:

1. **Change compromised credentials immediately** — Prioritize email, banking, and work accounts
2. **Enable or verify MFA** — Add a second factor if not already present
3. **Report to IT security** — Organizational response may be required
4. **Monitor accounts** — Watch for unauthorized activity
5. **Scan for malware** — If you opened an attachment or downloaded a file
6. **Alert financial institutions** — If financial data was compromised
7. **Document the incident** — Preserve evidence for investigation

## Phishing in the Broader Threat Landscape

Phishing serves as the initial access vector for many advanced attacks:

- **Ransomware deployment** — Credentials harvested through phishing enable attackers to deploy ransomware
- **Data breaches** — Compromised accounts provide access to sensitive systems
- **Supply chain attacks** — Phishing vendors or partners to reach the primary target
- **APT campaigns** — State-sponsored actors use spear phishing for espionage

## Key Takeaways

- Phishing exploits human psychology rather than technical vulnerabilities
- Defense requires both technical controls and user awareness
- No single solution eliminates phishing risk—layered defenses are essential
- Report suspicious communications promptly; early detection limits damage
- Assume breach mentality: implement controls that limit impact when credentials are compromised
