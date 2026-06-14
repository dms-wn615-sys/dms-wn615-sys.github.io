/**
 * 앱 설정 — Google Play / OAuth 배포 전 아래 값을 채우세요.
 *
 * OAuth: https://console.cloud.google.com/apis/credentials
 * Play 등록: docs/GOOGLE_PLAY.md 참고
 */
const APP_CONFIG = {
  /** Google OAuth 2.0 클라이언트 ID (웹 애플리케이션) */
  GOOGLE_CLIENT_ID: '',

  /** HTTPS 배포 도메인 — GitHub Pages */
  APP_URL: 'https://dms-wn615-sys.github.io/tile-match',

  /** Android 패키지 ID — twa-manifest.json과 동일하게 유지 */
  PACKAGE_ID: 'com.tilematch.game',

  /** Play Console·개인정보 처리방침 문의 이메일 */
  SUPPORT_EMAIL: 'dms-wn615@hanmail.net',
};
