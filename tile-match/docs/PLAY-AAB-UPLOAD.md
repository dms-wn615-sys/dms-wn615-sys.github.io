# Google Play — App Bundle(AAB) 업로드

패키지 ID: **`com.dmsgames.tilematch`**  
웹 URL: https://dms-wn615-sys.github.io/tile-match/

---

## 0. 업로드 전 필수 (아직이면 먼저)

| # | 항목 | 상태 확인 |
|---|------|-----------|
| 1 | Play Console 앱 생성 (`com.dmsgames.tilematch`) | |
| 2 | `android.keystore` 생성 | |
| 3 | SHA256 → `assetlinks.json` → **사이트 루트** 배포 | |
| 4 | `npm run icons` | |
| 5 | `android/` 프로젝트 생성·빌드 | |

> **assetlinks.json** 위치:  
> `https://dms-wn615-sys.github.io/.well-known/assetlinks.json`  
> (GitHub Pages **저장소 루트**에 `.well-known/` — `/tile-match/` 안이 아님)

---

## 1. AAB 빌드

### 1) 키스토어 (최초 1회)

```powershell
cd c:\Users\배서현\Desktop\my
keytool -genkeypair -v -keystore android.keystore -alias tilematch -keyalg RSA -keysize 2048 -validity 10000
```

SHA256 확인:

```powershell
keytool -list -v -keystore android.keystore -alias tilematch
```

→ `.well-known/assetlinks.json`의 `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` 교체 후  
  GitHub Pages **루트**에 배포.

검증:

```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://dms-wn615-sys.github.io&relation=delegate_permission/common.handle_all_urls
```

### 2) Android 프로젝트·AAB

```powershell
npm run icons
npm run android:init
npm run android:build
```

또는 일괄:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-play-aab.ps1
```

### 3) 생성 파일

```
android\app\build\outputs\bundle\release\app-release-bundle.aab
```

(경로는 Bubblewrap 버전에 따라 `app-release.aab` 등으로 다를 수 있음)

---

## 2. Play Console — App Bundle 업로드

1. [Play Console](https://play.google.com/console) 로그인  
2. **타일 매치** (`com.dmsgames.tilematch`) 선택  
3. 왼쪽 **테스트 및 출시** → **프로덕션** (또는 **내부 테스트**로 먼저)  
4. **새 버전 만들기**  
5. **App Bundle** → **업로드** → `app-release-bundle.aab` 선택  
6. **버전 이름** `1.0.0` / **버전 코드** `1` (twa-manifest.json과 일치)  
7. 출시 노트 작성 (예: `타일 매치 최초 출시`)  
8. **스토어 등록 정보·콘텐츠 등급·개인정보 처리방침** 등 필수 항목 완료  
9. **검토를 위해 변경사항 제출**

---

## 3. 스토어·정책 (업로드와 함께 필요)

| 항목 | 값/파일 |
|------|---------|
| 앱 이름 | 타일 매치 |
| 패키지 | com.dmsgames.tilematch |
| 개인정보 처리방침 | https://dms-wn615-sys.github.io/tile-match/privacy.html |
| 앱 아이콘 512 | `icons/icon-512.png` |
| 그래픽 | `store-assets/toss/` 스크린샷 참고 |
| 게임 콘텐츠 등급 | GRAC / IARC 설문 |
| 타겟 | 전체 이용가 |

문구: `store-listing/`  
GRAC: `docs/GRAC.md`

---

## 4. 자주 나는 오류

| 오류 | 해결 |
|------|------|
| 패키지 이름 이미 사용 | `com.dmsgames.tilematch` 사용 |
| Digital Asset Links 실패 | assetlinks를 **github.io 루트**에 배포, SHA256 일치 |
| 서명 불일치 | 동일 keystore로만 업데이트 빌드 |
| 버전 코드 중복 | `twa-manifest.json`의 `appVersionCode` 증가 후 재빌드 |

---

## 5. 토스와 구분

| | Google Play | 토스 |
|---|-------------|------|
| 패키지/ID | `com.dmsgames.tilematch` | `tilematchgame` |
| 업로드 파일 | `.aab` | `.ait` |
| 빌드 | `npm run android:build` | `npm run toss:build` |
