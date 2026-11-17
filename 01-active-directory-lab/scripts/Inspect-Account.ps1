<# Read-only evidence collection. Requires RSAT ActiveDirectory and authorised domain access. #>
[CmdletBinding()]
param([Parameter(Mandatory)][ValidatePattern('^[a-zA-Z0-9._-]{1,64}$')][string]$Identity)
$ErrorActionPreference = 'Stop'
Import-Module ActiveDirectory
Get-ADUser -Identity $Identity -Properties LockedOut, Enabled, PasswordLastSet, PasswordExpired, LastLogonDate, MemberOf |
    Select-Object SamAccountName, Enabled, LockedOut, PasswordLastSet, PasswordExpired, LastLogonDate, MemberOf
