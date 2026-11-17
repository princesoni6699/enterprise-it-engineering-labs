# Local delivery report

Prepared 16 November 2026 for Prince Soni, Brisbane. External expenditure: **$0**. No paid services, subscriptions, credit-card details or trials were used. No public repository or deployment exists yet.

## Delivered functionality

| Application | Implemented browser workflows |
|---|---|
| Main hub | Five custom project cards, technology tags, thumbnails, documentation/source links, direct lab routes, shared themes and mobile navigation |
| Active Directory | Search/filter users, onboarding, enable/disable, unlock, password-reset simulation, offboarding, expiry, computer/group creation, membership changes, OU/GPO resource overview, audit and CSV |
| PowerShell | Six report types, threshold inputs, deterministic terminal output, bulk CSV validation/creation simulation, execution history, JSON/CSV output downloads, real script downloads |
| Intune | Inventory, enrolment, encryption/update findings, compliance remediation, sync/restart/app actions, configuration assignment, update-ring control, service health finding and current-inventory analytics |
| Security investigation | Synthetic 4624/4625/4740 evidence, supported SPL filter grammar, counts, source addresses, severity, incident timeline, notes, acknowledgement/resolution and incident exports |
| Entra/IAM | Identity onboarding/offboarding, MFA registration, sign-in evaluation with reasons, combined policy requirements, device evidence, justified RBAC assignments, cloud groups, access-review denial and risk/sign-in resources |

All five labs have introductions, guided scenarios, selected-record evidence, meaningful action feedback, local state persistence, reset, audit history and downloadable reports. They are bounded technical simulations, with no vendor runtime or real enterprise connectivity.

The hub now includes a floating toolkit hero with direct lab links, an aligned project showcase, and a continuous scroll-illuminated SVG thread. Content reveals across the five lab pages are driven directly by viewport position, with a reduced-motion fallback. The hero uses original capability icons with clear product/skill names, not official vendor logos.

## Files and architecture

```text
enterprise-it-engineering-labs/
  01-active-directory-lab/      HTML, README, PowerShell
  02-powershell-automation/     HTML, README, reporting/provisioning scripts
  03-intune-endpoint-lab/       HTML, README, endpoint evidence script
  04-splunk-security-lab/       HTML, README, event evidence script
  05-entra-identity-lab/        HTML, README, Graph retrieval script
  shared/                     UI, styles, seed records, pure workflows
  assets/                     Original SVG/PNG thumbnails and actual screenshots
  documentation/              Architecture, QA, commands, showcase, deployment
  tests/                      JavaScript and Pester checks
  .github/workflows/          CI and manual approved Pages publishing
  private/                    Local interview guide; ignored and not deployed
  dist/                       Generated static deployment; ignored by Git
```

Native ES modules and browser APIs avoid a dependency installation or backend requirement. State is localStorage, not a production database. No arbitrary shell or SPL evaluation is available. Original synthetic data uses fictional identities and documentation IP ranges. Technical commands and real-world differences are documented separately.

## Verification

- 25 JavaScript unit/integration/static checks passed, including saved-session migration and scroll-linked progress geometry.
- Seven Pester syntax/safeguard checks passed across six scripts.
- 264 route/theme/viewport checks passed across Edge and Chrome.
- Extended browser workflows, persistence, reset, CSV/JSON downloads, mobile navigation and 19 local links per browser passed.
- Zero observed console errors, page exceptions or failed resource requests in the final runs.
- All six desktop captures and the mobile hub capture were visually reviewed.
- Static production build completed successfully; private notes are excluded.

See QA.md and the raw browser JSON reports for practical limits. No Lighthouse score, full WCAG certification, physical-device testing, live-domain/tenant execution or internet-hosted performance result is claimed.

## Known boundaries

- Windows/Entra/Intune/Splunk behaviour is simplified and immediate; real permissions, policy processing, replication, tokens and asynchronous jobs are not reproduced.
- Seed datasets are deliberately small and deterministic. Cross-lab changes are isolated.
- The browser CSV importer supports unquoted name,department rows only, with a 100-row limit. The real PowerShell provisioning script has a different documented schema.
- Supported SPL is a fixed-order index, EventCode and account filter grammar. Reference pipelines are not executed.
- Browser audit data is user-editable and resettable; it has no production integrity guarantees.
- Device-policy verification and risky-sign-in review are scenario actions, not real security validation or remediation.
- Browser testing covers Edge and Chrome. Safari, Firefox, screen readers and physical phones remain unverified.

## Publishing and showcase

Five LinkedIn descriptions, five skills each and actual 1200×627 PNG thumbnails are prepared in LINKEDIN-PACKAGES.md and assets/. Live and GitHub documentation URLs remain pending approval and actual publication. No URL is represented as live.

The manual Pages workflow is prepared. Publication will create one separate repository named enterprise-it-engineering-labs; it will not alter prince-soni-portfolio. The master instruction requires explicit approval before making anything public. After approval, verify the hub plus five folder URLs and replace the pending showcase URLs with actual links.

## Costs and existing portfolio

Actual external spend: $0. Runtime hosting design: free GitHub Pages on a public repository, subject to current GitHub conditions. No paid infrastructure is required. The connected private portfolio repository received no writes. All local work is contained in the new child directory; the original workspace had no files or Git checkout.
