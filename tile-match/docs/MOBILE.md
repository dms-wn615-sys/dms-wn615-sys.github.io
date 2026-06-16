# Android · iPhone 지원 가이드

타일 매치는 **하나의 웹 게임**으로 Android와 iPhone 모두에서 플레이할 수 있습니다.

## 지원 방식

| 플랫폼 | 바로 플레이 (PWA) | 스토어 등록 |
|--------|-------------------|-------------|
| **Android** | Chrome → 홈 화면 추가 / 설치 배너 | Google Play — [TWA](GOOGLE_PLAY.md) 또는 **Capacitor** |
| **iPhone** | Safari → 홈 화면에 추가 | App Store — **Capacitor** (Mac + Xcode 필요) |

---

## 1. PWA — 지금 바로 (추천)

HTTPS로 배포한 뒤:

### Android
- Chrome으로 접속 → 주소창 **「앱 설치」** 또는 홈 화면 설치 배너
- 전체 화면, 오프라인(캐시) 지원

### iPhone / iPad
- **Safari**로 접속 (Chrome iOS는 홈 화면 추가 제한)
- 공유 버튼 **↑** → **「홈 화면에 추가」**
- 홈 화면 아이콘으로 앱처럼 실행

> iOS는 앱 실행 시 상단·하단 **안전 영역(노치·홈 바)** 이 자동 반영됩니다.

---

## 2. Capacitor — Android + iOS 네이티브 앱 (스토어용)

Bubblewrap(TWA)과 달리 **Android·iOS를 한 번에** 네이티브 프로젝트로 만듭니다.

### 사전 준비

| Android | iOS |
|---------|-----|
| JDK 17+, Android Studio | **Mac**, Xcode, Apple Developer 계정 |

### 최초 설정

```bash
npm install
npm run icons
npm run mobile:setup
```

`android/`, `ios/` 폴더가 생성됩니다.

### 빌드·실행

```bash
# 웹 파일 변경 후 네이티브 프로젝트에 반영
npm run mobile:sync

# Android Studio에서 실행 / AAB 빌드
npm run mobile:android

# Xcode에서 실행 / App Store 업로드 (Mac만)
npm run mobile:ios
```

### Android 스토어 (Capacitor)

1. Android Studio → **Build → Generate Signed Bundle / APK** → AAB
2. [Play Console](https://play.google.com/console)에 업로드
3. 패키지 ID: `com.dmsgames.tilematch`

### iOS App Store (Capacitor)

1. Xcode에서 **Signing & Capabilities** → Team 선택
2. **Product → Archive** → App Store Connect 업로드
3. [App Store Connect](https://appstoreconnect.apple.com)에서 메타데이터·스크린샷 등록
4. 개인정보 처리방침 URL: `https://도메인/privacy.html`

`store-listing/` 폴더의 설명문을 iOS·Android 공통으로 사용할 수 있습니다.

---

## 3. Android만 TWA (기존 방식)

가벼운 Android 전용 배포는 [GOOGLE_PLAY.md](GOOGLE_PLAY.md)의 **Bubblewrap + TWA** 를 사용하세요.

> TWA(`android/`)와 Capacitor(`android/`)는 같은 폴더를 쓰므로 **둘 중 하나만** 선택하세요.

---

## 설정 파일

| 파일 | 내용 |
|------|------|
| `capacitor.config.json` | 앱 ID, 스플래시, 상태 표시줄 |
| `manifest.json` | PWA 매니페스트 |
| `js/config.js` | `APP_URL`, `PACKAGE_ID` |

---

## 문제 해결

| 증상 | 해결 |
|------|------|
| iPhone에서 전체 화면 안 됨 | Safari로 「홈 화면에 추가」 사용 |
| iOS 하단 메뉴가 잘림 | 최신 버전 사용 (safe-area 적용됨) |
| Capacitor sync 후 빈 화면 | `npm run mobile:sync` 재실행, `webDir` 확인 |
| iOS 빌드 불가 | Mac + Xcode 필수 |
