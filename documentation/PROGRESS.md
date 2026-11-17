# Master project tracker

Updated 16 November 2026. Local simulation release prepared. Public publication and verified public URLs await owner approval. See DELIVERY.md for the implemented scope and QA.md for verification limits.

## Environment and boundaries

- Connected GitHub installation inspected: princesoni6699/prince-soni-portfolio is private.
- No writes made to that repository. No remote repository created or changed.
- Local workspace was empty and not a Git checkout before work. All project files are isolated under enterprise-it-engineering-labs/.
- $0 external spend. No paid services, credentials, subscriptions or licences activated.

## Phase tracker

| Phase | Status | Evidence / next work |
|---|---|---|
| 1 Architecture and inspection | Implemented | ARCHITECTURE.md; GitHub read-only inventory |
| 2 Hub and design system | Implemented and reviewed | Direct routes, themes, responsive selector/sidebar navigation |
| 3 Five applications | Local simulation scope implemented | engine.js, resources.js, workflows.js, app.js, enhancements.js |
| 4 QA | Executed; limitations documented | 25 Node tests, 7 Pester checks, browser layout checks, scroll sampling and functional flows |
| 5 Documentation and assets | Prepared | Five READMEs, six scripts, SVG/PNG thumbnails, actual screenshots and private guide |
| 6 Final review and deployment preparation | Prepared | Manual Pages workflow, CI, build, delivery report |
| 7 Publication and LinkedIn | Awaiting publication approval | Descriptions, skills and thumbnails prepared; live URLs pending |

## Implemented core features

All labs: search, status filters, inspection, simulated actions, local persistence, audit history, reset, CSV export, notes, incident report downloads, shared introduction and documentation.

Directory: onboarding, enable/disable/unlock/reset/offboard, password expiry, groups, computers, OUs and GPO overview. Endpoint: enrolment, device findings, remediation, sync, restart, app installation, profiles, update ring and service finding. Automation: five structured reports, bulk CSV validation and simulated creation output, execution history and a real read-only reporting script. Security: 4624/4625/4740 events, supported query subset, event-count meters, incident notes, evidence and resolution. IAM: MFA, sign-in retry, reader assignment/removal, offboarding, device-policy verification, access review and synthetic risk/sign-in records.

## Resolved development backlog

- Added computer/group creation and bidirectional membership changes.
- Added service reporting, input thresholds and output downloads.
- Added endpoint analytics and supporting policy/profile/update-ring resources.
- Added identity onboarding, cloud groups, justified administrative role choices and combined Conditional Access requirements.
- Added incident timeline and primary scenario completion feedback.
- Added five labelled 1200×627 PNG social assets and route metadata; deployed build can set absolute URLs through LABS_PUBLIC_URL.
- Completed Edge/Chrome passes in both themes at all required widths, semantic label checks, keyboard focus, link verification and local timing measurements.
- Prepared the private guide, showcase drafts, references, actual screenshot links, CI and manual Pages workflow.

## Remaining publication work and limitations

Obtain explicit publication approval, create the separate repository, publish, verify actual public links and insert those URLs in the showcase packages. No public actions have been taken. The local release is a bounded simulation: see DELIVERY.md for exact functional limits and QA.md for unmeasured checks. No full WCAG, Lighthouse, physical-device or live-platform validation is claimed.

## Resume

Read this file, QA.md and the source before continuing. Run node --test, then node server.mjs for preview. Browser checks use bundled Playwright via LABS_NODE_MODULES and launch Edge headless. browser-check.mjs starts its own server; stop any existing preview on 4173 first. Sandbox isolation previously required approved execution outside the sandbox. Do not publish without explicit approval.
