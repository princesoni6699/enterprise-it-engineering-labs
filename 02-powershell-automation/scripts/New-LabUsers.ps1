<#
.SYNOPSIS
Validate a CSV and preview AD account creation. Requires authorised test-domain access and RSAT.
.DESCRIPTION
Input headers: SamAccountName,GivenName,Surname,Department,Path.
Accounts are created disabled without passwords. WhatIf is the default. Explicitly pass
-WhatIf:$false only after reviewing the preview in an authorised disposable test domain.
#>
[CmdletBinding(SupportsShouldProcess, ConfirmImpact='High')]
param([Parameter(Mandatory)][ValidateScript({Test-Path -LiteralPath $_ -PathType Leaf})][string]$CsvPath)
$ErrorActionPreference = 'Stop'
if (-not $PSBoundParameters.ContainsKey('WhatIf')) { $WhatIfPreference = $true }
$rows = @(Import-Csv -LiteralPath $CsvPath)
if ($rows.Count -lt 1 -or $rows.Count -gt 100) { throw 'Supply 1–100 rows.' }
$seen = @{}
foreach ($row in $rows) {
    if ($row.SamAccountName -notmatch '^[a-zA-Z0-9._-]{2,20}$' -or
        [string]::IsNullOrWhiteSpace($row.GivenName) -or
        [string]::IsNullOrWhiteSpace($row.Surname) -or
        $row.Path -notmatch '^OU=.+,DC=.+') { throw 'Invalid account row.' }
    if ($seen.ContainsKey($row.SamAccountName)) { throw 'Duplicate account name.' }
    $seen[$row.SamAccountName] = $true
}
Import-Module ActiveDirectory
foreach ($row in $rows) {
    if ($PSCmdlet.ShouldProcess($row.SamAccountName, 'Create disabled AD user')) {
        New-ADUser -SamAccountName $row.SamAccountName -Name "$($row.GivenName) $($row.Surname)" `
            -GivenName $row.GivenName -Surname $row.Surname -Department $row.Department `
            -Path $row.Path -Enabled $false
    }
}
