# Google Play 등록 가이드

타일 매치는 **PWA + Trusted Web Activity(TWA)** 방식으로 Google Play에 등록합니다.  
웹 게임을 Android 앱(AAB)으로 감싸서 스토어에 올리는 방식입니다.

## 사전 준비

| 항목 | 설명 |
|------|------|
| Google Play 개발자 계정 | [Play Console](https://play.google.com/console) (1회 등록비) |
| HTTPS 도메인 | Firebase Hosting, Netlify, Cloudflare Pages 등 |
| JDK 17+ | Bubblewrap 빌드용 |
| Android SDK | Bubblewrap 설치 시 안내 |

## 1단계: 웹 게임 배포

1. 이 프로젝트를 **HTTPS** 도메인에 배포합니다.
2. 아래 URL이 브라우저에서 열리는지 확인합니다.

```
https://YOUR_DOMAIN.com/index.html
https://YOUR_DOMAIN.com/manifest.json
https://YOUR_DOMAIN.com/.well-known/assetlinks.json
https://YOUR_DOMAIN.com/privacy.html
```

3. `twa-manifest.json`의 `YOUR_DOMAIN.com`을 실제 도메인으로 모두 바꿉니다.
4. `js/config.js`의 `APP_URL`도 같은 도메인으로 설정합니다.
5. Google OAuth 사용 시 Cloud Console **승인된 JavaScript 원본**에 `https://YOUR_DOMAIN.com` 추가.

## 2단계: 서명 키 & Digital Asset Links

### 키스토어 생성 (최초 1회)

```bash
keytool -genkeypair -v -keystore android.keystore -alias tilematch -keyalg RSA -keysize 2048 -validity 10000
```

### SHA-256 지문 확인

```bash
keytool -list -v -keystore android.keystore -alias tilematch
```

출력된 **SHA256** 값(콜론 포함)을 복사합니다.

### assetlinks.json 수정

`.well-known/assetlinks.json`에서 `REPLACE_WITH_YOUR_SHA256_FINGERPRINT`를 위 SHA256으로 교체한 뒤 **다시 배포**합니다.

검증:

```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://YOUR_DOMAIN.com&relation=delegate_permission/common.handle_all_urls
```

## 3단계: PNG 아이콘 생성

```bash
npm install
npm run icons
```

생성 파일: `icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`

## 4단계: Android 앱 빌드 (Bubblewrap)

```bash
npm run android:init
```

- `twa-manifest.json`을 읽어 `android/` 프로젝트를 생성합니다.
- 도메인·패키지명·키스토어 경로를 확인합니다.

```bash
npm run android:build
```

성공 시 **`app-release-bundle.aab`** (또는 `app-release-signed.apk`)가 생성됩니다.  
Play Console에는 **AAB** 업로드를 권장합니다.

> `android/` 폴더와 `android.keystore`는 Git에 올리지 마세요 (`.gitignore`에 포함됨).

## 5단계: Play Console 등록

### 앱 만들기

1. [Play Console](https://play.google.com/console) → **앱 만들기**
2. 앱 이름: **타일 매치**
3. 기본 언어: **한국어**
4. 앱 / 게임: **게임**
5. 무료 / 유료: **무료**

### 스토어 등록 정보

`store-listing/` 폴더의 문구를 참고하세요.

| 자산 | 규격 |
|------|------|
| 앱 아이콘 | 512×512 PNG (`icons/icon-512.png`) |
| 그래픽 이미지 | 1024×500 PNG/JPEG (직접 제작) |
| 스크린샷 | 휴대전화 최소 2장 (권장 1080×1920) |

### 필수 정책

| 항목 | URL |
|------|-----|
| 개인정보 처리방침 | `https://YOUR_DOMAIN.com/privacy.html` |
| 지원 이메일 | Play Console → 스토어 설정 |

### 콘텐츠 등급

- 설문조사에서 **게임**, **퍼즐**, **모든 연령** 등 선택
- 도박·실제 돈 거래·위치 수집 없음

### 데이터 보안

- 대부분 데이터는 **기기에만 저장** (localStorage)
- Google 로그인 선택 시: 이름, 이메일 수집 가능 → 설문에 명시

### 앱 버전 업로드

1. **출시 → 프로덕션**(또는 내부 테스트)
2. **새 버전 만들기** → AAB 업로드
3. `twa-manifest.json`의 `appVersionCode`를 올릴 때마다 +1

## 버전 업데이트 체크리스트

1. 웹 게임 수정 후 도메인에 배포
2. `twa-manifest.json` → `appVersionName`, `appVersionCode` 증가
3. `npm run android:build`
4. Play Console에 새 AAB 업로드

## 패키지 정보 (기본값)

- **패키지 ID**: `com.tilematch.game`
- 변경 시 `twa-manifest.json`, `.well-known/assetlinks.json`, `manifest.json` id를 함께 수정

## 문제 해결

| 증상 | 해결 |
|------|------|
| TWA가 Chrome 탭으로만 열림 | assetlinks.json SHA256·도메인·HTTPS 재확인 |
| OAuth 로그인 실패 | Cloud Console에 배포 도메인 등록 |
| Bubblewrap JDK 오류 | JDK 17 설치 후 `JAVA_HOME` 설정 |

## 참고 링크

- [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap)
- [TWA 개요](https://developer.chrome.com/docs/android/trusted-web-activity)
- [Play Console 고객센터](https://support.google.com/googleplay/android-developer)
