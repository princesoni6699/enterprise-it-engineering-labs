<# Read-only Graph example. Requires Microsoft.Graph.Users, consent and an authorised test tenant.
   The browser simulation does not invoke this script or connect to a tenant. #>
[CmdletBinding()]
param([Parameter(Mandatory)][ValidatePattern('^[^\s@]+@[^\s@]+\.[^\s@]+$')][string]$UserPrincipalName)
$ErrorActionPreference = 'Stop'
Import-Module Microsoft.Graph.Users
Connect-MgGraph -Scopes 'User.Read.All' -NoWelcome
try {
    Get-MgUser -UserId $UserPrincipalName -Property Id, DisplayName, UserPrincipalName, AccountEnabled |
        Select-Object Id, DisplayName, UserPrincipalName, AccountEnabled
} finally {
    Disconnect-MgGraph | Out-Null
}
