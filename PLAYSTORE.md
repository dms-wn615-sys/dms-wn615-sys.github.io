# 오리 블록 게임 — Google Play 등록 가이드

> **Play Store 등록은 본인 Google 계정으로만 가능합니다.**  
> AI가 대신 로그인·결제·검토 제출을 할 수 없습니다.  
> 아래 순서대로 진행하면 **오리 블록 게임**을 등록할 수 있습니다.

---

## 스토어 연결 (빠른 시작)

PowerShell에서:

```powershell
cd "c:\Users\배서현\Desktop\my-first-project"
.\open-store.ps1
```

또는:

```powershell
npm run store:open    # Play Console / App Store Connect 열기
npm run store:build   # AAB 빌드
```

---

## 1단계: AAB 파일 만들기 (필수)

PowerShell에서 프로젝트 �older로 이동 후 실행:

```powershell
cd "c:\Users\배서현\Desktop\my-first-project"
powershell -ExecutionPolicy Bypass -File .\build-aab.ps1
```

성공 시 AAB 위치:
```
android\app\build\outputs\bundle\release\app-release.aab
```

> 키스토어(`android\blockgame-release.keystore`)와 비밀번호는 **반드시 백업**하세요. 분실 시 업데이트 불가!

---

## 2단계: Google Play 개발자 등록

1. https://play.google.com/console 접속
2. Google 계정 로그인
3. **개발자 등록** — 1회 **$25** (약 3만원)
4. 신원 확인 (1~2일 소요 가능)

---

## 3단계: 앱 만들기

| 항목 | 입력값 |
|------|--------|
| 앱 이름 | **오리 블록 게임** |
| 기본 언어 | 한국어 |
| 앱 / 게임 | **게임** |
| 무료 / 유료 | **무료** |

---

## 4단계: 스토어 등록정보 (복사해서 사용)

### 짧은 설명 (80자 이내)
```
귀여운 오리 블록을 보드에 맞춰 줄·열을 없애는 퍼즐! 7개국어·BGM 지원.
```

### 전체 설명
```
🦆 오리 블록 게임

8×8 보드에 오리 모양 블록을 배치해 가로·세로 줄을 채우면 사라지는 블록 퍼즐 게임입니다!

✨ 특징
• 귀여운 오리 블록 그래픽
• 7개국어 지원 (한국어, English, 日本語, 中文, Español, Français, Deutsch)
• 배경음악·효과음
• iPhone·Android 터치 조작 지원
• 오프라인 플레이

🎮 조작법
• 하단 트레이에서 블록 선택 → 보드에 터치/클릭으로 배치
• 가로·세로 한 줄이 꽉 차면 해당 줄이 사라집니다

최고 점수에 도전해 보세요!
```

### 카테고리
- **게임 → 퍼즐**

### 태그 (선택)
- 퍼즐, 캐주얼, 오프라인

---

## 5단계: 필수 준비물

| 항목 | 설명 |
|------|------|
| **AAB** | `app-release.aab` (1단계에서 생성) |
| **앱 아이콘** | 512×512 PNG (오리 이미지 권장) |
| **스크린샷** | 휴대폰 화면 2장 이상 |
| **개인정보 처리방침** | `privacy-policy.html`을 웹에 올려 URL 입력 |
| **ads.txt** | `ads.txt`를 개발자 웹사이트 루트에 업로드 (AdMob `pub-3789928866249665`) |
| **콘텐츠 등급** | 설문 → 폭력·성적·도박 없음 → **전체 이용가** |
| **데이터 보안** | **데이터 수집 없음** 선택 |

### 개발자 웹사이트 URL (Play Console 필수)

프로젝트에 `developer.html` 개발자 페이지가 포함되어 있습니다.  
자세한 배포 방법: [`WEBSITE.md`](WEBSITE.md)

| 항목 | URL 예시 |
|------|----------|
| **개발자 웹사이트** | `https://사용자명.github.io/ori-block-game/developer.html` |
| **개인정보 처리방침** | `https://사용자명.github.io/ori-block-game/privacy-policy.html` |
| **ads.txt** | `https://사용자명.github.io/ori-block-game/ads.txt` |

### 개인정보 처리방침 URL 만들기
1. GitHub 저장소 생성 → `developer.html`, `privacy-policy.html`, `ads.txt`, `developer.css`, `store-assets/` 업로드
2. **Settings → Pages** → GitHub Pages 활성화
3. 위 URL 표 참고

### ads.txt URL (AdMob 필수)
1. 같은 GitHub Pages에 `ads.txt` 업로드 (프로젝트 루트에 있음)
2. Play Console 개발자 웹사이트 URL과 **동일 도메인**이어야 합니다

---

## 6단계: 출시

1. Play Console → **출시 → 프로덕션 → 새 출시 만들기**
2. `app-release.aab` 업로드
3. 출시 노트: `오리 블록 게임 첫 출시`
4. **검토 제출**

검토: 보통 **수 시간 ~ 3일**

---

## 패키지 정보

| 항목 | 값 |
|------|-----|
| 앱 ID | `com.blockgame.app` |
| 버전 | 1.0.0 |

---

## 제가 대신 할 수 없는 것

- Google 계정 로그인
- $25 개발자 등록비 결제
- Play Console **검토 제출** 버튼 클릭

위 3가지는 본인 PC에서 직접 진행해야 합니다.

---

## AAB 빌드가 안 될 때

`build-aab.ps1` 실행 시 오류가 나면:
1. Node.js 설치 확인: `node --version`
2. Android SDK 확인: `%LOCALAPPDATA%\Android\Sdk` 폴더 존재 여부
3. JDK **21** 설치 확인 (Capacitor 7 필수):
   ```powershell
   winget install Microsoft.OpenJDK.21
   ```

문제가 있으면 오류 메시지와 함께 알려주세요.
