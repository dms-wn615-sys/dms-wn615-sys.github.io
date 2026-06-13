# Play Store AAB 빌드 스크립트
# 사용법: PowerShell에서 .\build-aab.ps1 실행

$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$androidDir = Join-Path $projectRoot "android"
$javaHome = @(
    "C:\Program Files\Microsoft\jdk-21*",
    "C:\Program Files\Eclipse Adoptium\jdk-21*"
) | ForEach-Object { Get-ChildItem $_ -ErrorAction SilentlyContinue | Sort-Object Name -Descending | Select-Object -First 1 -ExpandProperty FullName } | Select-Object -First 1

if (-not $javaHome) {
    $javaHome = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
    Write-Host "JDK 21 없음 — JDK 17 사용 (Capacitor 7은 JDK 21 권장)" -ForegroundColor Yellow
}
$sdkRoot = "$env:LOCALAPPDATA\Android\Sdk"

$env:JAVA_HOME = $javaHome
$env:ANDROID_HOME = $sdkRoot
$env:ANDROID_SDK_ROOT = $sdkRoot
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "==> 웹 파일 동기화..." -ForegroundColor Cyan
Set-Location $projectRoot
Copy-Item index.html, game.js, style.css, audio.js, ads.txt, privacy-policy.html, developer.html, developer.css -Destination www\ -Force
if (Test-Path store-assets\play-store-icon.png) {
    New-Item -ItemType Directory -Force -Path www\store-assets | Out-Null
    Copy-Item store-assets\play-store-icon.png -Destination www\store-assets\ -Force
}
npx cap sync android

Write-Host "==> 키스토어 확인..." -ForegroundColor Cyan
Set-Location $androidDir
$keytool = Join-Path $javaHome "bin\keytool.exe"
$keystorePath = Join-Path $androidDir "blockgame-release.keystore"

if (-not (Test-Path $keystorePath)) {
    Write-Host "키스토어 생성 중 (최초 1회)..." -ForegroundColor Yellow
    & $keytool -genkeypair -v `
        -keystore $keystorePath `
        -alias blockgame `
        -keyalg RSA -keysize 2048 -validity 10000 `
        -storepass blockgame123 -keypass blockgame123 `
        -dname "CN=Block Game, OU=Dev, O=BlockGame, L=Seoul, ST=Seoul, C=KR"
    Write-Host "키스토어 생성 완료: $keystorePath" -ForegroundColor Green
    Write-Host "비밀번호는 android\keystore.properties 에 있습니다. 반드시 백업하세요!" -ForegroundColor Red
}

Write-Host "==> AAB 빌드 중 (5~10분 소요)..." -ForegroundColor Cyan
.\gradlew.bat bundleRelease --no-daemon

$aab = Get-ChildItem "app\build\outputs\bundle\release\*.aab" -ErrorAction SilentlyContinue | Select-Object -First 1
if ($aab) {
    Write-Host ""
    Write-Host "빌드 성공!" -ForegroundColor Green
    Write-Host "AAB 파일: $($aab.FullName)" -ForegroundColor Green
    Write-Host "크기: $([math]::Round($aab.Length / 1MB, 2)) MB" -ForegroundColor Green
    Write-Host ""
    Write-Host "다음 단계: PLAYSTORE.md 를 참고해 Play Console에 업로드하세요." -ForegroundColor Cyan
} else {
    Write-Host "AAB 파일을 찾을 수 없습니다. 위 오류 메시지를 확인하세요." -ForegroundColor Red
    exit 1
}
