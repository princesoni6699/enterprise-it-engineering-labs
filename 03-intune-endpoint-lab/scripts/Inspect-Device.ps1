<# Read-only local Windows checks; no Intune licence or Graph connection required. #>
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, LastBootUpTime
Get-Service -Name BITS, wuauserv | Select-Object Name, Status, StartType
# BitLocker evidence can require an elevated session and an eligible Windows edition.
if (Get-Command Get-BitLockerVolume -ErrorAction SilentlyContinue) {
    Get-BitLockerVolume | Select-Object MountPoint, VolumeStatus, ProtectionStatus
}
