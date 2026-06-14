# Play Console URL 입력 가이드

> **Play Console 로그인·입력은 본인 Google 계정으로만 가능합니다.**

## 1단계: GitHub Pages 배포

PowerShell에서:

```powershell
cd "c:\Users\배서현\Desktop\my-first-project"

# 최초 1회 — GitHub 로그인
gh auth login

# 배포 + URL 복사 + Play Console 열기
powershell -ExecutionPolicy Bypass -File .\deploy-website.ps1
```

성공하면 터미널에 아래 형식 URL이 표시됩니다.

```
https://[GitHub사용자명].github.io/ori-block-game/developer.html
https://[GitHub사용자명].github.io/ori-block-game/privacy-policy.html
https://[GitHub사용자명].github.io/ori-block-game/ads.txt
```

## 2단계: Play Console 입력 (본인 PC)

1. https://play.google.com/console 접속
2. **오리 블록 게임** 앱 선택 (없으면 새 앱 만들기)

### 개발자 웹사이트
- **스토어 설정 → 개발자 페이지 → 웹사이트**
- URL: `https://[사용자명].github.io/ori-block-game/developer.html`

### 개인정보 처리방침
- **앱 콘텐츠 → 개인정보 처리방침**
- URL: `https://[사용자명].github.io/ori-block-game/privacy-policy.html`

### ads.txt (AdMob)
- Play Console 개발자 웹사이트와 **같은 도메인**이면 AdMob이 자동 크롤
- 확인: `https://[사용자명].github.io/ori-block-game/ads.txt` 브라우저에서 열기

## 3단계: 확인

| URL | 확인 |
|-----|------|
| developer.html | 게임 소개 페이지 보임 |
| privacy-policy.html | 개인정보 처리방침 보임 |
| ads.txt | `google.com, pub-3789928866249665...` 한 줄 표시 |

---

## AI가 대신 할 수 없는 것

- Google / GitHub 계정 로그인
- Play Console **저장·제출** 버튼 클릭
- $25 개발자 등록비 결제
