# Google Play AAB build (Bubblewrap TWA)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "=== 1/4 Icons ===" -ForegroundColor Cyan
npm run icons

if (-not (Test-Path "android.keystore")) {
    Write-Host ""
    Write-Host "Missing android.keystore. Create it first:" -ForegroundColor Yellow
    Write-Host "keytool -genkeypair -v -keystore android.keystore -alias tilematch -keyalg RSA -keysize 2048 -validity 10000"
    Write-Host ""
    Write-Host "Then update SHA256 in .well-known/assetlinks.json and deploy to GitHub Pages root."
    exit 1
}

Write-Host "=== 2/4 Validate TWA manifest ===" -ForegroundColor Cyan
npx bubblewrap validate --manifest twa-manifest.json

if (-not (Test-Path "android")) {
    Write-Host "=== 3/4 Init android/ (first time) ===" -ForegroundColor Cyan
    npx bubblewrap init --manifest twa-manifest.json
} else {
    Write-Host "=== 3/4 android/ exists - skip init ===" -ForegroundColor Cyan
}

Write-Host "=== 4/4 Build AAB ===" -ForegroundColor Cyan
npx bubblewrap build

$aab = Get-ChildItem -Path "android\app\build\outputs\bundle" -Filter "*.aab" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
if ($aab) {
    Write-Host ""
    Write-Host "OK: $($aab.FullName)" -ForegroundColor Green
    Write-Host "Upload to Play Console as App Bundle."
    Write-Host "Guide: docs/PLAY-AAB-UPLOAD.md"
} else {
    Write-Host "AAB not found under android\app\build\outputs\bundle" -ForegroundColor Yellow
}
