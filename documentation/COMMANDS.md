# Commands and operational boundaries

The web application never executes these commands. Use only in an authorised test environment with the required modules and privileges. Inspect first, understand the impact and use -WhatIf where supported.

## Active Directory

```powershell
Get-ADUser -Identity charlotte.bennett -Properties LockedOut,Enabled,PasswordLastSet
Search-ADAccount -LockedOut -UsersOnly
Get-ADPrincipalGroupMembership -Identity charlotte.bennett
Unlock-ADAccount -Identity charlotte.bennett -WhatIf
Disable-ADAccount -Identity oliver.hughes -WhatIf
```

The lab reset-password action changes a synthetic expiry counter; it does not generate, transmit or store a real password. A real password reset should use a secure input channel and the organisation’s identity-verification procedure.

## Reporting

```powershell
.\Reports.ps1 -Report Inactive -InactiveDays 90
.\Reports.ps1 -Report Expiry -ExpiryDays 14
.\Reports.ps1 -Report Disk -FreePercent 15 | Export-Csv -Path .\disk-report.csv -NoTypeInformation
.\Reports.ps1 -Report Services
.\New-LabUsers.ps1 -CsvPath .\lab-users.csv -WhatIf
```

The browser bulk CSV grammar is intentionally narrower than Import-Csv and uses different fields. It accepts name,department and unquoted rows. The real provisioning example requires SamAccountName,GivenName,Surname,Department,Path and previews disabled-account creation.

## Windows and endpoint checks

```powershell
Get-CimInstance Win32_OperatingSystem | Select-Object Caption,Version,LastBootUpTime
Get-Service -Name BITS,wuauserv
Get-BitLockerVolume
```

These are local Windows evidence checks, not Intune remote actions. Availability depends on Windows edition, permissions and installed modules.

## Security investigation

Browser-supported queries:

```text
index=windows
index=windows EventCode=4740
index=windows EventCode=4625 account="charlotte.bennett"
```

Reference-only real SPL patterns (not executed by the browser):

```text
index=windows EventCode=4625 | stats count by source
index=windows EventCode=4740 | table _time account source
```

Real field names depend on ingestion and extraction. Use timestamps, target identity, logon type and caller/source evidence together; avoid attributing intent from one event.

## Graph

```powershell
Connect-MgGraph -Scopes 'User.Read.All'
Get-MgUser -UserId 'charlotte.bennett@example.com' -Property DisplayName,AccountEnabled
Disconnect-MgGraph
```

The example domain is reserved and does not identify a real tenant. The downloadable identity script uses read-only retrieval; a real session requires appropriate consent and authorization.
