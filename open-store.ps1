# Play Console / App Store Connect 바로 열기
# 사용법: .\open-store.ps1

$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot

Write-Host ""
Write-Host "오리 블록 게임 — 스토어 연결" -ForegroundColor Cyan
Write-Host "앱 ID: com.blockgame.app" -ForegroundColor Gray
Write-Host ""

$aab = Get-ChildItem (Join-Path $projectRoot "android\app\build\outputs\bundle\release\*.aab") -ErrorAction SilentlyContinue | Select-Object -First 1
$icon = Join-Path $projectRoot "store-assets\play-store-icon.png"
$privacy = Join-Path $projectRoot "privacy-policy.html"

Write-Host "준비 상태" -ForegroundColor Yellow
Write-Host "  AAB 빌드: $(if ($aab) { 'OK — ' + $aab.Name } else { '없음 — .\build-aab.ps1 실행 필요' })"
Write-Host "  앱 아이콘: $(if (Test-Path $icon) { 'OK' } else { '없음' })"
Write-Host "  개인정보 처리방침: $(if (Test-Path $privacy) { 'OK (웹 URL 필요)' } else { '없음' })"
Write-Host ""

Write-Host "열기:" -ForegroundColor Yellow
Write-Host "  1. Google Play Console (Android)"
Write-Host "  2. App Store Connect (iPhone — Mac 필요)"
Write-Host "  3. AAB 빌드 실행"
Write-Host "  4. Play Console 앱 만들기 페이지"
Write-Host "  q. 종료"
Write-Host ""

$choice = Read-Host "선택 (1-4, q)"

switch ($choice) {
    "1" {
        Start-Process "https://play.google.com/console"
        Write-Host "Play Console을 열었습니다." -ForegroundColor Green
        Write-Host "출시 → 프로덕션 → 새 출시 만들기 → AAB 업로드" -ForegroundColor Gray
    }
    "2" {
        Start-Process "https://appstoreconnect.apple.com"
        Write-Host "App Store Connect를 열었습니다." -ForegroundColor Green
        Write-Host "iOS 빌드는 Mac + Xcode가 필요합니다. IOS.md 참고." -ForegroundColor Gray
    }
    "3" {
        & (Join-Path $projectRoot "build-aab.ps1")
    }
    "4" {
        Start-Process "https://play.google.com/console/u/0/developers/create-app"
        Write-Host "새 앱 만들기 페이지를 열었습니다." -ForegroundColor Green
        Write-Host "앱 이름: 오리 블록 게임 | 패키지: com.blockgame.app" -ForegroundColor Gray
    }
    default {
        Write-Host "종료합니다."
    }
}
