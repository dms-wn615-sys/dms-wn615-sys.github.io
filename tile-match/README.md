# 타일 매치 🌸

타일 3개를 맞춰 판을 깨끗이 비우는 중독성 퍼즐 게임입니다.

## 실행 방법

```bash
# Python이 설치되어 있다면
python -m http.server 8080

# 또는 Node.js
npx serve .
```

브라우저에서 `http://localhost:8080` 을 열어주세요.

## 게임 방법

1. **타일을 탭**하면 하단 슬롯으로 이동합니다.
2. **같은 타일 3개**가 슬롯에 모이면 자동으로 제거됩니다.
3. **모든 타일을 제거**하면 레벨 클리어!
4. 슬롯(7칸)이 가득 차면 게임 오버입니다.
5. 위에 다른 타일이 겹쳐 있으면 선택할 수 없습니다.

## 부스터

| 부스터 | 설명 |
|--------|------|
| ↩ 실행 취소 | 마지막 선택을 되돌립니다 |
| 🔀 섞기 | 남은 타일 종류를 섞습니다 |
| 💡 힌트 | 추천 타일을 표시합니다 |
| ➕ 슬롯 +1 | 슬롯을 1칸 추가합니다 |

## 기능

- **20,000개 레벨** (1,000장 × 20레벨, 절차적 생성)
- **클럽 채팅** — 5개 클럽 가입, 멤버와 채팅, 빠른 도움 요청
- **일일 토너먼트** — 리더보드, 점수 경쟁, 순위별 코인 보상
- 12개 세계 여행 테마 (벚꽃 정원, 해변, 설원 등)
- 별·코인 보상 및 진행 저장
- 모바일·태블릿 최적화
- 오프라인 플레이 (PWA)
- **Google 로그인** — 계정별 진행 데이터 저장
- **Android · iPhone** — PWA 설치 + Capacitor 네이티브 앱

## Android · iPhone

| 방법 | Android | iPhone |
|------|---------|--------|
| **PWA (바로 사용)** | Chrome → 앱 설치 | Safari → 홈 화면에 추가 |
| **스토어 등록** | Google Play ([TWA](docs/GOOGLE_PLAY.md) 또는 Capacitor) | App Store (Capacitor, Mac 필요) |

```bash
npm install
npm run icons
npm run mobile:setup   # android/ · ios/ 생성
npm run mobile:sync
npm run mobile:android # Android Studio
npm run mobile:ios     # Xcode (Mac)
```

자세한 내용: **[docs/MOBILE.md](docs/MOBILE.md)**

## Google 로그인 설정

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials)에서 프로젝트 생성
2. **OAuth 2.0 클라이언트 ID** 생성 (애플리케이션 유형: **웹**)
3. **승인된 JavaScript 원본**에 접속 URL 추가  
   - 예: `http://localhost:8080`
4. 발급받은 클라이언트 ID를 `js/config.js`에 입력:

```javascript
const APP_CONFIG = {
  GOOGLE_CLIENT_ID: '123456789-xxxx.apps.googleusercontent.com',
};
```

5. 서버를 재시작하고 **설정 → 계정**에서 Google 로그인

> 최초 로그인 시 게스트 진행 데이터가 Google 계정에 자동으로 이전됩니다.

## Google Play 등록 (Android)

웹 게임을 **Trusted Web Activity(TWA)** 로 감싸 Google Play에 올릴 수 있습니다.

### 빠른 시작

1. **HTTPS 도메인**에 게임 배포
2. `twa-manifest.json`의 `YOUR_DOMAIN.com`을 실제 도메인으로 변경
3. `js/config.js`의 `APP_URL` 설정
4. 키스토어 생성 후 `.well-known/assetlinks.json`에 SHA-256 지문 입력·재배포
5. 아래 명령으로 Android 앱 빌드:

```bash
npm install
npm run icons          # Play Store용 PNG 아이콘
npm run android:init   # android/ 프로젝트 생성
npm run android:build  # AAB 빌드 → Play Console 업로드
```

자세한 절차·스토어 등록 정보·문제 해결은 **[docs/GOOGLE_PLAY.md](docs/GOOGLE_PLAY.md)** 를 참고하세요.

- 개인정보 처리방침: `privacy.html` (Play Console 필수 URL)
- 스토어 설명 초안: `store-listing/` 폴더
- 패키지 ID: `com.tilematch.game`
