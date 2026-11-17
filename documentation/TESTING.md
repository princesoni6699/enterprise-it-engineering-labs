# Reproduce verification

## Dependency-free checks

From the repository root, with Node.js 22 or newer:

```sh
node --test
node --check shared/app.js
node --check shared/enhancements.js
node build.mjs
```

The browser application has no package dependencies and needs no installation step. The test runner is built into Node.js.

## Browser checks

The optional development tools are Playwright and Sharp. Install them locally with a free package manager if they are not already provided by your environment. The browser suite needs an installed Edge or Chrome browser and does not download a browser automatically.

```sh
npm install --no-save playwright sharp
node browser-check.mjs
```

The browser suite starts its own server on port 4174, separate from the normal preview on 4173. LABS_BROWSER=chrome selects Chrome; the default is msedge. On Windows PowerShell, set this with `$env:LABS_BROWSER='chrome'` before running the script. LABS_NODE_MODULES can point to a bundled node_modules directory instead of installing packages.

The suite visits six routes in dark and light mode at all 11 specified widths, checks document overflow and basic semantic labels, captures screenshots, verifies local links and tests the principal workflows. Raw results are saved separately for each browser. The test state is temporary and does not alter a real directory or tenant.

For a short check against an already running production preview on port 4173, run `node design-check.mjs`. It verifies typography and mobile layout at three sizes using Chrome. Run it after building and serving dist.

Run `node scroll-check.mjs` against that preview for forward/reverse progress, paused-scroll stability, per-lab reveal checks, reduced motion and responsive thread screenshots. LABS_BROWSER selects Edge or Chrome. The design check also exercises all five floating technology-card links.

## PowerShell

The included Pester test uses the installed environment’s Pester 3 assertion syntax:

```powershell
Invoke-Pester -Script ./tests/PowerShell.Tests.ps1 -PassThru
```

It parses the six original scripts and checks bulk-provisioning preview safeguards without running those scripts against a domain, tenant or local Security log. Runtime prerequisites and read/write effects must be assessed separately before any real execution. No production execution is part of this showcase.

## Manual review boundaries

Viewport checks do not prove physical-device compatibility. Semantic-label checks do not replace a complete WCAG review. Local navigation timing does not predict internet performance. QA.md records exactly what was executed and what remains unmeasured.
