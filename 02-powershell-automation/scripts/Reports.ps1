<#
.SYNOPSIS
Read-only Windows operations reporting. Run on an authorised test machine.
.DESCRIPTION
Directory reports require the RSAT ActiveDirectory module and read permissions.
No directory or device changes are performed. Results are objects suitable for Export-Csv.
#>
[CmdletBinding()]
param(
    [ValidateSet('Inactive','Expiry','Disk','Health','Services','Groups')]
    [string]$Report = 'Disk',
    [ValidateRange(1,3650)][int]$InactiveDays = 90,
    [ValidateRange(1,90)][int]$ExpiryDays = 14,
    [ValidateRange(1,100)][int]$FreePercent = 15
)
$ErrorActionPreference = 'Stop'
switch ($Report) {
    'Inactive' {
        Import-Module ActiveDirectory
        Search-ADAccount -AccountInactive -UsersOnly -TimeSpan (New-TimeSpan -Days $InactiveDays) |
            Select-Object Name, SamAccountName, Enabled, LastLogonDate
    }
    'Expiry' {
        Import-Module ActiveDirectory
        $cutoff = (Get-Date).AddDays($ExpiryDays)
        Get-ADUser -Filter 'Enabled -eq $true -and PasswordNeverExpires -eq $false' -Properties 'msDS-UserPasswordExpiryTimeComputed' |
            ForEach-Object {
                $fileTime = $_.'msDS-UserPasswordExpiryTimeComputed'
                # AD uses sentinel values for passwords without a calculated expiry.
                if ($fileTime -gt 0 -and $fileTime -lt [long]::MaxValue) {
                    $expiry = [datetime]::FromFileTime($fileTime)
                    if ($expiry -gt (Get-Date) -and $expiry -le $cutoff) {
                        [pscustomobject]@{ Account = $_.SamAccountName; Expires = $expiry }
                    }
                }
            }
    }
    'Disk' {
        Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' |
            Where-Object { $_.Size -gt 0 -and (100 * $_.FreeSpace / $_.Size) -lt $FreePercent } |
            Select-Object DeviceID, @{Name='FreePercent';Expression={[math]::Round(100 * $_.FreeSpace / $_.Size, 1)}}
    }
    'Health' {
        Get-CimInstance Win32_OperatingSystem |
            Select-Object Caption, LastBootUpTime, FreePhysicalMemory, TotalVisibleMemorySize
    }
    'Services' { Get-Service | Select-Object Name, Status, StartType }
    'Groups' {
        Import-Module ActiveDirectory
        Get-ADGroup -Filter * | ForEach-Object {
            $groupName = $_.Name
            Get-ADGroupMember -Identity $_ | Select-Object @{Name='Group';Expression={$groupName}}, Name, ObjectClass
        }
    }
}
