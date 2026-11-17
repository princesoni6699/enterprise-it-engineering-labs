# Enterprise IT Engineering Labs

Practical Systems Administration, Automation, Endpoint Management & Security Labs.

An independent technical showcase by Prince Soni, Brisbane. Five browser simulations use fictional enterprise data to demonstrate investigations, administration and reporting. No live Microsoft or Splunk infrastructure is connected.

## Run locally

Node.js 22 or newer is sufficient. No package install is required.

```sh
node server.mjs
node --test
node build.mjs
```

Open http://127.0.0.1:4173/ while the server is running.

## Labs

1. [Active Directory](01-active-directory-lab/README.md)
2. [PowerShell Automation](02-powershell-automation/README.md)
3. [Intune Endpoint](03-intune-endpoint-lab/README.md)
4. [Security Investigation](04-splunk-security-lab/README.md)
5. [Entra ID & IAM](05-entra-identity-lab/README.md)

## Delivery status

Public release approved by the owner on 17 November 2026. See [delivery report](documentation/DELIVERY.md), [architecture](documentation/ARCHITECTURE.md), and [QA evidence](documentation/QA.md). The documented simulation boundaries and testing limitations apply.

## Hosting and cost

GitHub Pages provides the static hosting. GitHub Free supports Pages on public repositories: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits . Actual external spend: $0. Public deployment verification is recorded in documentation/DEPLOYMENT.md.

## Security and attribution

All identities, devices and events are synthetic. Documentation IP ranges and example domains only. Do not enter confidential information in notes. Browser state is not a production database. Original code and SVG diagrams use self-hosted Manrope and Space Grotesk fonts under the included SIL Open Font Licences, with system fallbacks. No external font or CDN requests are made. Microsoft and Splunk names remain their owners’ trademarks; no affiliation is implied.
