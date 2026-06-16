# Android keystore setup (run once)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/create-android-keystore.ps1
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$keystore = Join-Path (Get-Location) "android.keystore"
$credsFile = Join-Path (Get-Location) "android.keystore.credentials.txt"

if (Test-Path $keystore) {
    Write-Host "android.keystore already exists. Delete it first to recreate." -ForegroundColor Yellow
    exit 1
}

$keytool = Get-Command keytool -ErrorAction SilentlyContinue
if (-not $keytool) {
    Write-Host "keytool not found. Install JDK 17+ (https://adoptium.net/) and add to PATH." -ForegroundColor Red
    exit 1
}

$chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
$pass = -join (1..20 | ForEach-Object { $chars[(Get-Random -Maximum $chars.Length)] })

$dname = "CN=Seohyun Bae, OU=DMS Games, O=DMS Games, L=Daegu, ST=Daegu, C=KR"

& keytool -genkeypair -v `
    -keystore $keystore `
    -alias tilematch `
    -keyalg RSA `
    -keysize 2048 `
    -validity 10000 `
    -storepass $pass `
    -keypass $pass `
    -dname $dname

Write-Host ""
Write-Host "Created: android.keystore" -ForegroundColor Green

$shaLine = & keytool -list -v -keystore $keystore -alias tilematch -storepass $pass 2>&1 | Select-String "SHA256:"
$sha256 = ""
if ($shaLine) {
    $sha256 = ($shaLine.ToString() -replace ".*SHA256:\s*", "").Trim()
    Write-Host "SHA256: $sha256" -ForegroundColor Cyan
}

$creds = @"
android.keystore credentials (KEEP PRIVATE - do not commit)
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm")
Keystore file: android.keystore
Alias: tilematch
Store password: $pass
Key password: $pass
SHA256: $sha256
"@
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($credsFile, $creds, $utf8NoBom)
Write-Host "Saved: android.keystore.credentials.txt (gitignored)" -ForegroundColor Green

if ($sha256) {
    $assetlinks = Join-Path (Get-Location) ".well-known\assetlinks.json"
    $json = Get-Content $assetlinks -Raw -Encoding UTF8
    $json = $json -replace '([0-9A-F]{2}:){31}[0-9A-F]{2}', $sha256
    if ($json -match 'REPLACE_WITH_YOUR_SHA256_FINGERPRINT') {
        $json = $json -replace 'REPLACE_WITH_YOUR_SHA256_FINGERPRINT', $sha256
    }
    [System.IO.File]::WriteAllText($assetlinks, $json.TrimEnd(), $utf8NoBom)
    Write-Host "Updated: .well-known/assetlinks.json" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next: deploy assetlinks.json to GitHub Pages ROOT:"
    Write-Host "  https://dms-wn615-sys.github.io/.well-known/assetlinks.json"
}

Write-Host ""
Write-Host "Save the password from android.keystore.credentials.txt in a safe place."
