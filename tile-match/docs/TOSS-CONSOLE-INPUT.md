# 토스 콘솔 — 앱만들기 등록 가이드 (타일 매치)

앱인토스 콘솔: https://apps-in-toss.toss.im  
개발자 사이트: https://dms-wn615-sys.github.io/developer.html

---

## 0. 사전 준비

```powershell
cd c:\Users\배서현\Desktop\my
npm install
npm run toss:assets          # 콘솔용 이미지
powershell -ExecutionPolicy Bypass -File .\build-toss-ait.ps1   # tilematchgame.ait
```

| 산출물 | 경로 | 콘솔 업로드란 |
|--------|------|----------------|
| 앱 로고 600×600 | `store-assets/toss/app-logo-600.png` | 앱 로고 |
| 다크모드 앱 로고 600×600 | `store-assets/toss/app-logo-600-dark.png` | 다크모드 앱 로고 |
| 썸네일 1932×828 | `store-assets/toss/thumbnail-1932x828.png` | 썸네일 |
| 스크린샷 세로 636×1048 ×3 | `screenshot-vertical-01~03.png` | 스크린샷 세로형 |
| 스크린샷 가로 1504×741 ×1 | `screenshot-horizontal-01.png` | 스크린샷 가로형 |
| 미니앱 번들 | `tilematchgame.ait` (루트) | 빌드 업로드 |
| GRAC 게임 ZIP | `store-assets/grac/tilematch-grac.zip` |

실제 게임 화면 캡처(권장):

```powershell
npm install -D playwright
npx playwright install chromium
npm run toss:screenshots
```

---

## 1. 콘솔 가입 · 워크스페이스

1. https://apps-in-toss.toss.im 접속 → 토스 비즈니스 회원 가입 (만 19세+, 본인 명의 토스앱)
2. **워크스페이스** 생성 (예: `DMS Games`)
3. **앱** → **+등록하기**

---

## 2. 앱 최초 등록 (3항목)

| 항목 | 입력값 |
|------|--------|
| **앱 이름** | `타일 매치` |
| **appName** | `tilematchgame` |
| **앱 유형** | **게임** |

> **appName `tilematchgame`는 등록 후 변경 불가.**  
> (`tilematch`는 이미 사용 중 — 대안 ID)  
> 딥링크: `intoss://tilematchgame`  
> `granite.config.ts`의 `appName`과 반드시 동일해야 합니다.

---

## 3. 기본 정보 (복사용)

| 항목 | 입력값 |
|------|--------|
| **부제** | `3매치 타일 퍼즐 · 20000레벨 · 클럽 · 토너먼트` |

> 부제 특수문자: **`:` `·` `?` 만 허용** (쉼표·느낌표·하이픈 등 불가)
| **사용 연령** | 만 19세 이상 (플랫폼 정책) |
| **고객센터 이메일** | `dms-wn615@hanmail.net` |
| **고객센터 연락처** | (선택) 위 이메일과 동일 또는 비워두기 |
| **채팅 상담 주소** | (선택) |

### 상세 설명 (복사)

토스 가이드: **접속 → 행동 → 결과** 순으로 구체적으로 작성.

```
1. 앱을 실행하면 홈 화면이 열리고 최근 진행 레벨과 코인·부스터 개수를 확인할 수 있습니다.
2. 계속하기 버튼을 누르면 3매치 퍼즐 레벨이 시작되고 겹쳐진 이모지 타일이 화면에 표시됩니다.
3. 타일을 탭하면 하단 슬롯 7칸으로 이동하고 같은 타일 3개가 모이면 자동으로 사라집니다.
4. 보드의 모든 타일을 비우면 레벨 클리어 팝업과 보상 코인을 받고 다음 레벨로 이어집니다.
5. 슬롯 7칸이 가득 차면 게임 오버 화면이 나오고 다시 도전하거나 부스터를 사용할 수 있습니다.
6. 실행 취소·섞기·힌트·슬롯 확장 부스터로 막힌 판을 풀 수 있습니다.
7. 클럽 탭에서 멤버와 채팅하고 일일 토너먼트·리더보드에서 순위와 코인 보상을 받을 수 있습니다.
8. 설정에서 한국어·영어 등 7개국어를 바꾸고 Google 로그인으로 진행 데이터를 저장할 수 있습니다.
9. 인터넷 없이도 오프라인으로 플레이할 수 있는 캐주얼 퍼즐 게임입니다.
```

---

## 4. 카테고리 및 노출

| 항목 | 입력값 |
|------|--------|
| **카테고리** | 게임 → **퍼즐** (또는 캐주얼) |
| **웹보드** | 해당 없음 (체크 안 함) |
| **앱 로고** | `app-logo-600.png` (600×600 PNG, 배경 필수) |
| **다크모드 앱 로고** | `app-logo-600-dark.png` (600×600 PNG) |
| **썸네일** | `thumbnail-1932x828.png` (1932×828 PNG) |
| **스크린샷 세로형** | `screenshot-vertical-01-home.png` |
| | `screenshot-vertical-02-play.png` |
| | `screenshot-vertical-03-social.png` (636×1048, 최소 3장) |
| **스크린샷 가로형** | `screenshot-horizontal-01.png` (1504×741, 최소 1장) |
| **검색 키워드** | `타일매치, 3매치, 퍼즐, 타일퍼즐, 매치3, puzzle` |

---

## 5. 게임 등급분류 (GRAC)

**방법:** 게임물관리위원회 심의 → 증명서 PDF 첨부

| 항목 | 입력값 |
|------|--------|
| **증빙 유형** | 게임물 등급분류증명서 (PDF) |
| **이용등급** | 전체이용가 |
| **내용정보** | 해당 없음 (전 항목 「없음」) |

GRAC 간소화 신청 후 발급된 **등급분류 필증 PDF**를 업로드합니다.  
상세: `docs/GRAC.md`, 첨부: `store-assets/grac/README-ATTACHMENTS.txt`

등급분류증명서와 동일하게 입력:

| 필드 | 값 |
|------|-----|
| 게임명 | 타일 매치 (Tile Match) |
| 개발자 | 배서현 (DMS Games) |
| 유통처 | 토스콘솔 |
| URL | https://dms-wn615-sys.github.io/tile-match/index.html |

### 게임 주요 화면 — 등급분류 게임 = 출시 게임 (화면 동일)

토스: **등급분류를 받은 게임과 출시 게임의 화면이 동일**해야 합니다.  
타일 매치는 GRAC 심의 게임 = 앱인토스(.ait) **동일 빌드** → **같은 2장**을 양쪽 란에 업로드.

| # | 자체등급분류 / GRAC 게임물 | 앱인토스 플레이 | 내용 (동일) |
|---|---------------------------|-----------------|-------------|
| 1 | `self-rating/self-rating-01-gameplay-start.png` | `ait-play/ait-play-01-gameplay-start.png` | 레벨 플레이 시작 |
| 2 | `self-rating/self-rating-02-gameplay-match.png` | `ait-play/ait-play-02-gameplay-match.png` | 타일 매치 중 |

증빙 **「게임물 등급분류증명서」**만 쓰면 자체등급분류 란 생략 가능 → **앱인토스 2장**만 제출.

```powershell
npm run toss:rating-screens
```

---

## 6. 법적 · 정책 URL

| 항목 | URL |
|------|-----|
| **개인정보 처리방침** | https://dms-wn615-sys.github.io/tile-match/privacy.html |
| **저작권·오픈소스** | https://dms-wn615-sys.github.io/tile-match/licenses.html |
| **개발자 정보** | https://dms-wn615-sys.github.io/developer.html |

저작권 선언 복사: `store-assets/grac/copyright-declaration.txt`

---

## 7. 빌드 업로드 · 테스트

1. 콘솔 → 해당 앱 → **출시하기** / **빌드**
2. `tilematchgame.ait` 업로드
3. 빌드 성공 후 **테스트** (QR 또는 푸시) — `intoss-private://tilematchgame`
4. 샌드박스 개발 테스트: `npm run toss:dev` → `intoss://tilematchgame`

콘솔에서 로고 업로드 후, `granite.config.ts`의 `brand.icon`에  
콘솔 이미지 **우클릭 → 링크 복사** URL을 넣고 `.ait`를 다시 빌드하세요.

---

## 8. 검토 · 출시 체크리스트

- [ ] appName `tilematchgame` = granite.config.ts 일치
- [ ] 앱 로고·썸네일·스크린샷 업로드
- [ ] GRAC 등급분류증명서 PDF
- [ ] 개인정보 처리방침 URL
- [ ] `tilematchgame.ait` 빌드 업로드 성공
- [ ] 토스앱 테스트 완료
- [ ] **검토 요청하기** (영업일 1~2일)

---

## 9. 프로젝트 설정 요약

| 파일 | 역할 |
|------|------|
| `granite.config.ts` | appName, 브랜드, webView `game` |
| `scripts/build-toss-web.mjs` | 정적 파일 → `dist/` |
| `build-toss-ait.ps1` | 아이콘·이미지·dist·`.ait` 일괄 |
| `docs/GRAC.md` | GRAC 간소화 신청 |

### npm 스크립트

| 명령 | 설명 |
|------|------|
| `npm run toss:dev` | 로컬 서버 (샌드박스 연동) |
| `npm run toss:build` | dist + ait |
| `npm run toss:assets` | 콘솔용 PNG 생성 |
| `npm run toss:screenshots` | Playwright 실제 화면 캡처 |

---

## 10. 콘솔 바로 열기

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\open-toss-console.ps1
```
