# Quality assurance evidence

Date: 16 November 2026. This record distinguishes executed checks from pending acceptance work.

## Executed

- Node.js built-in test runner: 27 tests passed, covering simulation state, lifecycle, validation, compliance, combined policy decisions, resource actions, reporting parameters, exports, static security boundaries, saved-session migration and scroll geometry/progress, including the original loop-shape regression and section mapping.
- JavaScript syntax: shared/app.js passed node --check.
- Pester 3.4: seven checks passed: six PowerShell scripts parse, and bulk provisioning includes ShouldProcess, default preview and disabled-account creation safeguards. No scripts were run against a directory or tenant.
- Static build: node build.mjs succeeded.
- Edge and Chrome headless: all six pages in both themes at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920 and 2560px passed the no-document-overflow assertion: 132 checks per browser, 264 total.
- First browser functional pass: directory unlock, reload persistence, audit view, CSV download and reset; endpoint remediation; MFA registration/retry; SPL filter; report execution. All passed, zero observed page errors or HTTP failures.
- Full-page screenshots captured for the hub and all five labs at 1440px, plus a mobile light-mode capture. All six desktop screenshots and the mobile hub capture visually inspected.
- Final browser runs verified 19 local links per browser, basic semantic labels on all six routes, mobile selector navigation, keyboard focus, bulk CSV processing, access review, incident closure, object creation, group membership, parameterised reports, JSON downloads, identity onboarding, justified roles and combined-policy denial. Zero observed console errors, page exceptions or failed resource requests.
- A missing favicon was caught by the expanded console check, fixed and verified in both final runs.
- Local navigation timing samples for each release are recorded in the raw browser reports across six pages at 1440px. These are local test-machine timings, not Lighthouse scores or internet performance predictions.

Raw final evidence: browser-results-msedge.json and browser-results-chrome.json. browser-results.json retains the first pass for provenance. Reproduction instructions: TESTING.md.

## Limitations and remaining checks

- No Lighthouse score has been measured. Do not claim a 90+ score.
- Basic semantic checks are not a full WCAG audit; keyboard, screen reader and contrast review remain required.
- Browser viewport emulation is not physical iPhone/Android testing.
- No tenant, AD module, Graph consent, Intune agent or Splunk instance is available. The Pester syntax and safeguard checks are not operational validation.
- No package dependencies are installed. No dependency scanner result is claimed.
- Resource, membership and Conditional Access controls were included in the final browser and unit passes. Safari and Firefox have not been tested.
- Public hosting, public URLs and link previews remain unverified because publication has not been authorised.

## Visual refresh

The shared design uses self-hosted Manrope and Space Grotesk fonts with included OFL notices, frosted navigation, animated ambient colour, pointer-tracked liquid button highlights, click ripples, hover transitions and rounded controls. Motion is disabled when the visitor requests reduced motion. Example identities are fictional Australian/British-style names; existing saved notes and workflow progress are preserved during migration.

The browser suite additionally verified local font loading, applied typography/card styling, pointer tracking, click-ripple creation and cleanup, and reduced-motion background behaviour in both Edge and Chrome. All 264 layout checks and extended functional workflows passed again with no observed console or resource errors. Screenshots and raw reports were regenerated.

Six further targeted checks verified the actual production preview at 320, 390 and 1440px for the hub and IAM lab, including applied typography and mobile navigation text visibility. The production build and private-content exclusion checks also passed.

## Scroll-driven showcase and toolkit hero

The project hub uses a single continuous cubic SVG thread alongside five aligned project scenes. Scroll position directly sets the illuminated stroke length and the leading-point coordinates. Content reveal opacity and translation are computed from viewport position in the same animation frame. There is no timed reveal tween, wheel interception or smoothing delay. Geometry is measured on layout/viewport changes rather than on every scroll event.

The old circular hero illustration was replaced by five labelled technology/skill cards linking directly to the labs. Their original capability glyphs are not official vendor logos. Decorative surfaces float inside stationary link hit areas. Existing colours and typefaces are retained.

The dedicated suite sampled seven forward/reverse positions at each of 11 widths (77 samples per browser), checked all five lab reveal routes and the reduced-motion fallback, and captured desktop/mobile thread screenshots. Raw results: scroll-results-chrome.json and scroll-results-msedge.json. The suite also checks that content opacity remains unchanged while scrolling is paused and decreases when scrolling reverses.

Final regression: 132 layout checks and extended functional workflows passed in each of Edge and Chrome (264 total). The preview design check additionally clicked all five floating toolkit links and verified their destination lab routes, then passed six responsive typography checks. The expanded Chrome scroll suite verified partial opacity, paused-scroll stability and reverse reveals on every lab page. An overlapping Chrome run hit a page-load timeout; the isolated final rerun passed with no observed console or resource errors.

17 November refinement: retained the original curved thread, removed its full-length Gaussian blur, avoided repeated unchanged style writes and scaled text, centred a smaller shield, and added the portfolio's locally bundled desktop wheel helper. The updated preview design/link check and 77 Chrome scroll samples at all 11 widths passed, including pause/reverse, all five reveal routes and reduced motion. These checks do not establish frame-rate guarantees on every device.
