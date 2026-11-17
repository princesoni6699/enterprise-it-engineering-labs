# Technical references and attribution

Checked 16 November 2026. These sources describe the real platforms; the labs implement only the documented local subset.

- [GitHub Pages availability and limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits): free Pages hosting on public repositories with GitHub Free. Review again before publication.
- [Windows failed logon event 4625](https://learn.microsoft.com/windows/security/threat-protection/auditing/event-4625): failure evidence requires context; not every failed logon represents an attack.
- [Windows logon auditing](https://learn.microsoft.com/windows/security/threat-protection/auditing/basic-audit-logon-events): successful logon event 4624.
- [AD events to monitor](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor): includes account lockout 4740.
- [Get-MgUser](https://learn.microsoft.com/powershell/module/microsoft.graph.users/get-mguser): Graph user retrieval and applicable permissions.
- [Microsoft PowerShell documentation](https://learn.microsoft.com/powershell/): cmdlets, parameters and language.
- [Microsoft Entra documentation](https://learn.microsoft.com/entra/): IAM concepts and Conditional Access.
- [Microsoft Intune documentation](https://learn.microsoft.com/intune/): endpoint management concepts.

SPL reference examples use a normalised synthetic source field. Real Windows event ingestion and Splunk field extraction must be checked against the deployment’s schema. In particular, 4740 caller-computer evidence is not identical to a universal source-IP field.

Original UI code and original vector/raster diagrams are used. Manrope and Space Grotesk are self-hosted from the official Google Fonts repository under the included SIL Open Font Licences; see assets/fonts/README.md and the two full licence notices. Lenis 1.3.27 is locally bundled under its MIT licence; see shared/vendor/LENIS-LICENSE.txt. No vendor logos, paid assets or templates are included. Platform names are descriptive, with no affiliation or endorsement implied. Development verification uses Node.js, Playwright and Sharp; these packages are not shipped as application runtime dependencies.
