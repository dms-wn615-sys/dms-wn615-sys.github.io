# 타일 매치 — 앱인토스 .ait 번들 생성
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== 1/4 Icons ===" -ForegroundColor Cyan
npm run icons

Write-Host "=== 2/4 Toss store images ===" -ForegroundColor Cyan
node scripts/prepare-toss-assets.mjs

Write-Host "=== 3/4 Web bundle (dist/) ===" -ForegroundColor Cyan
node scripts/build-toss-web.mjs

Write-Host "=== 4/4 AIT package ===" -ForegroundColor Cyan
npx ait build

if (Test-Path "tilematchgame.ait") {
    Write-Host ""
    Write-Host "OK: tilematchgame.ait" -ForegroundColor Green
    Write-Host "Upload: https://apps-in-toss.toss.im -> 앱 -> 빌드 업로드"
    Write-Host "GRAC: tilematchgame.ait or tilematch-grac.zip"
} else {
    Write-Host "Build finished but tilematchgame.ait not found. Check ait build output." -ForegroundColor Yellow
}
