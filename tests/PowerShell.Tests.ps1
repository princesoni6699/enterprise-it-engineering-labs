$projectRoot = Split-Path -Parent $PSScriptRoot
Describe 'Downloadable PowerShell syntax' {
    $scripts = Get-ChildItem -Path $projectRoot -Recurse -Filter '*.ps1' |
        Where-Object { $_.FullName -notmatch '[\\/]dist[\\/]|[\\/]tests[\\/]' }
    foreach ($script in $scripts) {
        It "parses $($script.Name) without syntax errors" {
            $tokens = $null
            $parseErrors = $null
            [System.Management.Automation.Language.Parser]::ParseFile($script.FullName, [ref]$tokens, [ref]$parseErrors) | Out-Null
            @($parseErrors).Count | Should Be 0
        }
    }
}
Describe 'Bulk provisioning safeguards' {
    It 'supports WhatIf and defaults to a preview' {
        $content = Get-Content -LiteralPath (Join-Path $projectRoot '02-powershell-automation/scripts/New-LabUsers.ps1') -Raw
        $content | Should Match 'SupportsShouldProcess'
        $content | Should Match '\$WhatIfPreference = \$true'
        $content | Should Match '-Enabled \$false'
    }
}
