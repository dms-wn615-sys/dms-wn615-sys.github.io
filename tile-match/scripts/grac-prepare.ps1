# GRAC 간소화 첨부파일 일괄 생성
# 사용: powershell -ExecutionPolicy Bypass -File .\scripts\grac-prepare.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

Write-Host "==> GRAC attachments for Tile Match" -ForegroundColor Cyan

if (-not (Test-Path "node_modules\archiver")) {
    Write-Host "Installing dev dependencies (archiver, pdfkit, playwright)..." -ForegroundColor Yellow
    npm install --save-dev archiver pdfkit playwright @ffmpeg-installer/ffmpeg 2>&1 | Out-Null
}

Write-Host "==> [1/3] Game ZIP..." -ForegroundColor Cyan
node scripts/pack-grac-game.mjs

Write-Host "==> [2/3] PDFs (description + rating)..." -ForegroundColor Cyan
node scripts/txt-to-pdf.mjs

Write-Host "==> [3/3] Gameplay video (2~3 min)..." -ForegroundColor Cyan
npx playwright install chromium 2>&1 | Out-Null
node scripts/record-grac-video.mjs

Write-Host ""
Write-Host "Upload to GRAC (store-assets\grac\):" -ForegroundColor Green
Write-Host "  tilematch-grac.zip          - game file"
Write-Host "  game-content-description.pdf - content description"
Write-Host "  gameplay-video.mp4           - gameplay video"
Write-Host "  rating-materials.pdf         - rating materials (if requested)"
Write-Host ""
Write-Host "Guide: store-assets\grac\README-ATTACHMENTS.txt"
