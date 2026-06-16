타일 매치 — GRAC 간소화 관련 첨부파일 안내
================================================

신청: https://www.grac.or.kr → 개인회원 → 오픈마켓 등급분류 신청(간소화)
유통처: 토스콘솔 (앱인토스)

GRAC 화면 「간소화 관련 첨부파일」에 아래 3종을 업로드합니다.

────────────────────────────────────────────────────────────
[첨부 1] 게임 파일 (실행 가능한 게임물) — 1개 필수
────────────────────────────────────────────────────────────

  ★ 토스콘솔 유통 (권장)
     파일: tilematchgame.ait
     생성: (앱인토스 WebView 설정 후) npx ait build
     또는: npm run grac:pack → tilematch-grac.zip (웹 게임 ZIP)

  ★ ZIP 업로드 (토스 .ait 준비 전)
     파일: store-assets\grac\tilematch-grac.zip
     생성: npm run grac:pack
     내용: index.html, css/, js/, icons/, manifest.json 등
     ※ GRAC에서 ZIP 거부 시 .ait 또는 APK로 재제출

  대안 (Google Play 병행 시)
     android\app\build\outputs\bundle\release\app-release.aab

────────────────────────────────────────────────────────────
[첨부 2] 게임물 내용 설명서 — 1부 필수
────────────────────────────────────────────────────────────

  PDF:  store-assets\grac\game-content-description.pdf
  원본: store-assets\grac\game-content-description.txt
  생성: npm run grac:pdf

  GRAC 업로드란: 「게임물 내용 설명서」

────────────────────────────────────────────────────────────
[첨부 3] 게임 실행 동영상 — 1부 필수
────────────────────────────────────────────────────────────

  MP4:  store-assets\grac\gameplay-video.mp4
  생성: npm run grac:video
  (최초 1회: npm install — playwright, @ffmpeg-installer/ffmpeg, pdfkit)

  포함 장면 (약 2~3분):
    ① 홈 화면 (2~3초)
    ② [계속하기] → 레벨 플레이 (타일 선택·매치)
    ③ 레벨 클리어 또는 게임 오버 모달
    ④ (선택) 설정·언어 화면 2~3초

  GRAC 업로드란: 「게임 실행 동영상」 또는 「동영상」

────────────────────────────────────────────────────────────
[첨부 4] 등급 관련 자료 — 필요 시
────────────────────────────────────────────────────────────

  간소화 신청에서는 대부분 「사전 설문」으로 대체됩니다.
  위원회에서 별도 요청하거나, 첨부란이 있을 때:

  PDF:  store-assets\grac\rating-materials.pdf
  원본: store-assets\grac\rating-materials.txt
  생성: npm run grac:pdf

  내용: 내용정보 전 항목 「없음」, 전체이용가 근거
  ※ 설문과 동일하게 「없음」만 표기 (실제 화면과 불일치 금지)

────────────────────────────────────────────────────────────
[간소화 관련 수집항목] — 텍스트 입력 (첨부 아님)
────────────────────────────────────────────────────────────

  유통처   : 토스콘솔
  유통일시 : 2026-06-XX
  URL      : https://dms-wn615-sys.github.io/tile-match/index.html

────────────────────────────────────────────────────────────
한 번에 생성
────────────────────────────────────────────────────────────

  powershell -ExecutionPolicy Bypass -File .\scripts\grac-prepare.ps1

  또는:
  npm run grac:pack
  npm run grac:pdf
  npm run grac:video

────────────────────────────────────────────────────────────
업로드 체크리스트
────────────────────────────────────────────────────────────

  [ ] tilematch-grac.zip 또는 tilematchgame.ait (게임 파일)
  [ ] game-content-description.pdf (게임물 내용 설명서)
  [ ] gameplay-video.mp4 (동영상)
  [ ] rating-materials.pdf (등급 관련 — 요청 시)
  [ ] 간소화 사전 설문 완료 (사이트)
  [ ] 등급 확약서 확인

발급 후: 등급분류 필증(PDF) → 토스 콘솔 게임 등급분류

  상세: docs\GRAC.md
  게임물 개요(복사): store-assets\grac\game-overview.txt
  저작권 선언(복사): store-assets\grac\copyright-declaration.txt
