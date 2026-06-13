# iPhone / iOS 실행 가이드

블럭 게임은 **iPhone Safari**와 **iOS 앱** 두 가지 방식으로 실행할 수 있습니다.

---

## 방법 1: iPhone Safari에서 바로 플레이 (가장 쉬움)

1. iPhone Safari에서 `index.html`을 엽니다 (로컬 서버 또는 배포 URL).
2. 화면 하단 **터치 버튼**으로 게임을 조작합니다.
   - ◀ ▶ 이동 · ↻ 회전 · ▼ 빠르게 내리기 · ⏬ 즉시 낙하
3. (선택) **공유 → 홈 화면에 추가**로 앱처럼 설치할 수 있습니다.

> PC에서 테스트: Chrome 개발자 도구 → 모바일 보기로 터치 UI 확인

---

## 방법 2: iOS 네이티브 앱 (App Store 배포용)

iOS 앱 빌드는 **Mac + Xcode**가 필요합니다. (Windows에서는 빌드 불가)

### Mac에서 준비

1. [Node.js LTS](https://nodejs.org) 설치
2. [Xcode](https://developer.apple.com/xcode/) 설치 (App Store)
3. Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
4. [CocoaPods](https://cocoapods.org) 설치:
   ```bash
   sudo gem install cocoapods
   ```

### 프로젝트 빌드

프로젝트 폴더에서:

```bash
# 웹 파일 동기화
cp index.html style.css game.js www/

# 패키지 설치
npm install

# iOS 프로젝트 생성 (최초 1회)
npx cap add ios

# 동기화
npx cap sync ios

# Xcode에서 열기
npx cap open ios
```

Xcode에서:
1. **Signing & Capabilities** → 본인 Apple Developer 팀 선택
2. iPhone 연결 또는 시뮬레이터 선택
3. **Run (▶)** 클릭

### App Store 등록

1. [Apple Developer Program](https://developer.apple.com/programs/) 가입 (연 $99)
2. [App Store Connect](https://appstoreconnect.apple.com)에서 앱 등록
3. Xcode → **Product → Archive** → App Store Connect 업로드

---

## iOS 프로젝트 구조

| 폴더/파일 | 설명 |
|-----------|------|
| `ios/` | Xcode 프로젝트 (Mac에서 `npx cap add ios` 후 생성) |
| `www/` | 앱에 포함되는 웹 게임 파일 |
| `capacitor.config.json` | 앱 ID, iOS 설정 |

앱 ID: `com.blockgame.app`

---

## iPhone 최적화 기능

- 터치 조작 버튼 (모바일·터치 기기 자동 표시)
- iPhone 노치·홈 인디케이터 대응 (`safe-area-inset`)
- 화면 확대/스크롤 방지
- 7개국어 지원
- 홈 화면 추가(PWA) 지원
