# 오리 블록 게임 — 다음 단계 (2026-06-13)

## ✅ 방금 완료된 작업

| 작업 | 결과 |
|------|------|
| AAB 재빌드 | ✅ 성공 (11.46 MB) |
| Git 로컬 커밋 | ✅ `3efd460` |
| Play Console | ✅ 브라우저에서 열림 |
| AAB 파일 위치 | ✅ 탐색기에서 열림 |

**AAB 경로**
```
c:\Users\배서현\Desktop\my-first-project\android\app\build\outputs\bundle\release\app-release.aab
```

---

## 1단계: GitHub Pages 배포 (약 2분)

새로 열린 PowerShell 창에서 GitHub 로그인을 완료한 뒤:

```powershell
cd "c:\Users\배서현\Desktop\my-first-project"
powershell -ExecutionPolicy Bypass -File .\deploy-website.ps1
```

성공하면 터미널에 아래 형식 URL이 표시됩니다:

```
개발자 웹사이트:  https://[GitHub아이디].github.io/ori-block-game/developer.html
개인정보 처리방침: https://[GitHub아이디].github.io/ori-block-game/privacy-policy.html
ads.txt:          https://[GitHub아이디].github.io/ori-block-game/ads.txt
```

---

## 2단계: Play Console 입력 (본인 Google 계정)

https://play.google.com/console

| 입력 위치 | 값 |
|-----------|-----|
| **스토어 설정 → 개발자 페이지 → 웹사이트** | `https://[GitHub아이디].github.io/ori-block-game/developer.html` |
| **앱 콘텐츠 → 개인정보 처리방침** | `https://[GitHub아이디].github.io/ori-block-game/privacy-policy.html` |
| **출시 → 프로덕션 → 새 출시** | `app-release.aab` 업로드 |

### 스토어 등록정보 (복사용)

**앱 이름:** 오리 블록 게임  
**패키지 ID:** com.blockgame.app  
**짧은 설명:** 귀여운 오리 블록을 보드에 맞춰 줄·열을 없애는 퍼즐! 7개국어·BGM 지원.

---

## 3단계: 검토 제출

1. 콘텐츠 등급 설문 (전체 이용가)
2. 데이터 보안 (광고 ID 수집 — AdMob)
3. 스크린샷 2장 이상
4. **검토 제출** 클릭

> Play Console 로그인·$25 등록비·제출 버튼은 본인만 가능합니다.
