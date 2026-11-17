<# Read-only Windows Security log evidence. Appropriate log permissions required. #>
[CmdletBinding()]
param([ValidateRange(1,168)][int]$Hours = 24)
$ErrorActionPreference = 'Stop'
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624,4625,4740; StartTime=(Get-Date).AddHours(-$Hours)} |
    Select-Object TimeCreated, Id, RecordId, MachineName, Message
