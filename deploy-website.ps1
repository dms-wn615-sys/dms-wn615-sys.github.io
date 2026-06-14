# GitHub Pages 배포 + Play Console URL 안내
# 사용법: powershell -ExecutionPolicy Bypass -File .\deploy-website.ps1

$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot
$repoName = "ori-block-game"

Set-Location $projectRoot

$gh = Get-Command gh -ErrorAction SilentlyContinue
if (-not $gh) {
    $ghPath = "${env:ProgramFiles}\GitHub CLI\gh.exe"
    if (Test-Path $ghPath) { $gh = $ghPath } else {
        Write-Host "GitHub CLI(gh)가 필요합니다. winget install GitHub.cli" -ForegroundColor Red
        exit 1
    }
} else {
    $gh = $gh.Source
}

Write-Host ""
Write-Host "==> GitHub 로그인 확인..." -ForegroundColor Cyan
& $gh auth status 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "GitHub 로그인이 필요합니다. 아래 명령을 실행하세요:" -ForegroundColor Yellow
    Write-Host "  gh auth login" -ForegroundColor White
    Write-Host ""
    Write-Host "로그인 후 이 스크립트를 다시 실행하세요." -ForegroundColor Yellow
    exit 1
}

$user = (& $gh api user -q .login 2>$null)
if (-not $user) { throw "GitHub 사용자 정보를 가져올 수 없습니다." }

Write-Host "GitHub 사용자: $user" -ForegroundColor Green

if (-not (Test-Path ".git")) {
    Write-Host "==> Git 초기화..." -ForegroundColor Cyan
    git init
    git branch -M main
}

Write-Host "==> 웹 파일 동기화..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path www\store-assets | Out-Null
Copy-Item index.html, game.js, style.css, audio.js, ads.txt, privacy-policy.html, developer.html, developer.css -Destination www\ -Force -ErrorAction SilentlyContinue
Copy-Item store-assets\play-store-icon.png -Destination www\store-assets\ -Force -ErrorAction SilentlyContinue
New-Item -ItemType File -Force -Path .nojekyll | Out-Null

Write-Host "==> 커밋..." -ForegroundColor Cyan
git add .gitignore .nojekyll ads.txt developer.html developer.css privacy-policy.html WEBSITE.md PLAYSTORE.md www store-assets index.html game.js style.css audio.js package.json capacitor.config.json README.md privacy-policy.html 2>$null
git add deploy-website.ps1 build-aab.ps1 open-store.ps1 2>$null
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    git commit -m "Add developer website and game for GitHub Pages"
}

$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host "==> GitHub 저장소 생성: $repoName ..." -ForegroundColor Cyan
    & $gh repo create $repoName --public --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) { throw "저장소 생성 실패. 이미 존재하면: gh repo create $repoName --public (수동)" }
} else {
    Write-Host "==> GitHub에 푸시..." -ForegroundColor Cyan
    git push -u origin main
}

Write-Host "==> GitHub Pages 활성화..." -ForegroundColor Cyan
& $gh api -X POST "repos/$user/$repoName/pages" -f build_type=legacy -f source[branch]=main -f source[path]=/ 2>$null
& $gh api -X PUT "repos/$user/$repoName/pages" -f build_type=legacy -f source[branch]=main -f source[path]=/ 2>$null

$base = "https://$user.github.io/$repoName"
$urls = @{
    Developer = "$base/developer.html"
    Privacy   = "$base/privacy-policy.html"
    AdsTxt    = "$base/ads.txt"
    Game      = "$base/index.html"
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " GitHub Pages URL (Play Console에 입력)" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "개발자 웹사이트:  $($urls.Developer)"
Write-Host "개인정보 처리방침: $($urls.Privacy)"
Write-Host "ads.txt:          $($urls.AdsTxt)"
Write-Host "웹 게임:          $($urls.Game)"
Write-Host ""
Write-Host "Pages 반영까지 1~5분 걸릴 수 있습니다." -ForegroundColor Gray
Write-Host ""

$clip = @"
Play Console 입력값
-------------------
개발자 웹사이트: $($urls.Developer)
개인정보 처리방침 URL: $($urls.Privacy)
"@

Set-Clipboard -Value $clip -ErrorAction SilentlyContinue
Write-Host "URL이 클립보드에 복사되었습니다." -ForegroundColor Cyan

Start-Process "https://play.google.com/console"
Start-Process $urls.Developer

Write-Host ""
Write-Host "Play Console은 본인 Google 계정으로 로그인 후 입력하세요:" -ForegroundColor Yellow
Write-Host "  앱 → 스토어 설정 → 개발자 페이지 → 웹사이트" -ForegroundColor Gray
Write-Host "  앱 콘텐츠 → 개인정보 처리방침 → URL" -ForegroundColor Gray
