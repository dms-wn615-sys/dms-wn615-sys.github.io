# 게임물관리위원회 — 등급분류 간소화 신청 (타일 매치)

[게임물관리위원회](https://www.grac.or.kr) → **개인회원** 가입 → **오픈마켓 등급분류 신청(간소화)**

대상: **전체이용가 ~ 15세이용가** · **모바일** · 설문형 간소화

**사전 권장:** [정부24 게임제작업 등록](GOV24-GAME-PRODUCTION.md) (유통 전 제작업 등록)

---

## 1. 간소화 관련 수집항목 (복사용)

신청 **1단계** 「등급분류간소화 작성」에서 입력합니다.

| 항목 | 입력값 |
|------|--------|
| **유통처** | `토스콘솔` (또는 `앱인토스`) |
| **유통일시** | 토스 콘솔 출시·검수 통과일 (예: `2026-06-15`) |
| **URL** | `https://dms-wn615-sys.github.io/tile-match/index.html` |

- **토스 콘솔**: https://apps-in-toss.toss.im  
- GRAC **URL**란에는 심의·실행 가능한 **게임 웹 주소**를 입력합니다.  
- 출시 후 `intoss://(appName)` 딥링크는 콘솔 등록값 기준으로 별도 기록.

---

## 2. 담당자 정보

| 항목 | 입력값 |
|------|--------|
| 담당자명 | (본인 실명) |
| 이메일 | `dms-wn615@hanmail.net` |
| 직위 | `개발자` (또는 `대표`) |
| 전화번호 | (본인 연락처) |
| 연락가능시간 | 예: `09:00~18:00` |
| 본인인증 | 휴대전화 인증 **필수** |

---

## 3. 게임물 개요 (신청 시)

| 항목 | 입력값 |
|------|--------|
| 게임명 | 타일 매치 |
| 배급자/개발자 | DMS Games (개인) |
| 개발연도 | 2026 |
| 플랫폼 | 모바일 |
| 희망등급 | **전체이용가** |
| 장르 | 퍼즐 / 캐주얼 |
| 오픈마켓 | **토스콘솔(앱인토스)** |
| 스토어명 (비영리) | 개인·비영리 제작 시 「비영리 게임물 단순목적」 → **수수료 면제** |

---

## 4. 간소화 관련 첨부파일 (GRAC 업로드)

| GRAC 항목 | 파일 | 생성 |
|-----------|------|------|
| **게임 파일** (실행 가능한 게임물) | `store-assets/grac/tilematch-grac.zip` | `npm run grac:pack` |
| **게임물 내용 설명서** | `store-assets/grac/game-content-description.pdf` | `npm run grac:pdf` |
| **게임 실행 동영상** | `store-assets/grac/gameplay-video.mp4` | `npm run grac:video` |
| **등급 관련 자료** (요청 시) | `store-assets/grac/rating-materials.pdf` | `npm run grac:pdf` |

**한 번에 생성:**

```powershell
npm run grac:prepare
```

토스콘솔용 `.ait` 번들: `npm run toss:build` 또는 `build-toss-ait.ps1` → `tilematchgame.ait`.  
콘솔 등록 입력값: **`docs/TOSS-CONSOLE-INPUT.md`**

상세: `store-assets/grac/README-ATTACHMENTS.txt`

---

## 5. 간소화 사전 설문 — 답변 가이드

게임 내용·등급 관련 설문은 실제 화면과 **일치**하게 답변하세요.

### 내용정보 (전 항목)

| 항목 | 답변 |
|------|------|
| 선정성 | **없음** |
| 폭력성 | **없음** |
| 사행성(도박) | **없음** |
| 공포 | **없음** |
| 약물 | **없음** |
| 범죄 | **없음** |
| 언어·표현 | **없음** (비속어·혐오 표현 없음) |

### 게임 특성

| 질문 유형 | 답변 요지 |
|-----------|-----------|
| 과금·인앱결제 | **없음** (무료, 코인은 게임 내 보상) |
| 광고 | **현재 없음** · **추후 Google AdMob 배너** 도입 예정 |
| 온라인 대전·실시간 PvP | **없음** |
| 채팅 | 클럽 UI 있으나 **로컬 저장·봇 응답**, 타 이용자 실시간 채팅·서버 전송 **없음** |
| 위치·카메라·연락처 | **수집·사용 없음** |
| 계정·로그인 | **선택** — Google 로그인(이름·이메일·프로필 사진, OAuth) |
| 기기 저장 | 게임 진행·설정·닉네임 — **localStorage, 서버 미전송** |

### 개인정보 수집 (설문)

- **직접 수집**: Google 로그인 **선택 시에만** (이름, 이메일, 프로필 사진 URL)
- **기기 내 저장**: 게임 진행 데이터 (개인 식별 정보 아님)
- **광고(도입 후)**: Google AdMob — 광고 ID·기기 정보 (Google 처리)
- **제3자 제공·판매**: 없음 (광고 SDK 정책 별도)
- **개인정보 처리방침 URL**:  
  `https://dms-wn615-sys.github.io/tile-match/privacy.html`

### GRAC 설문 — 광고 답변 기준

| 심의·출시 시점 | 설문 답변 |
|----------------|-----------|
| **광고 없이 출시** (현재 빌드) | 광고 **없음** |
| **AdMob 포함 출시** | 광고 **있음** (Google AdMob 배너) |
| **심의 후 광고 추가** | GRAC **내용수정 신고** 필요 |

> PDF 재생성: `npm run grac:pdf` (설명서·등급 자료 반영)

---

## 6. 발급 후

1. **등급분류 필증(PDF)** 저장  
2. **토스 콘솔** → 앱 → 게임 등급분류 → GRAC 필증 업로드  
3. 한국 출시 시 등급 표시 의무 준수  

| 용도 | URL |
|------|-----|
| **토스 콘솔** | https://apps-in-toss.toss.im |
| 개발자 페이지 | https://dms-wn615-sys.github.io/developer.html |
| 게임 플레이 | https://dms-wn615-sys.github.io/tile-match/ |
| 개인정보 처리방침 | https://dms-wn615-sys.github.io/tile-match/privacy.html |
| 저작권·오픈소스 | https://dms-wn615-sys.github.io/tile-match/licenses.html |

---

## 8. 저작권 (GRAC · 토스 · Play Console)

| 항목 | 입력/선택 |
|------|-----------|
| **저작권 소유** | **본인(개발자)이 소유** |
| **제작 내용** | 코드·UI·레벨 로직·사운드(Web Audio) 직접 제작 |
| **타사 게임** | 특정 상표 게임 복제·모방 **아님** |
| **고지 URL** | `https://dms-wn615-sys.github.io/tile-match/licenses.html` |

**복사용 선언문:** `store-assets/grac/copyright-declaration.txt`

첨부 파일 원본: `store-assets/grac/`
