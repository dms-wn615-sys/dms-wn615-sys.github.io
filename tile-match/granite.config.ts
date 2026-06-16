import { defineConfig } from '@apps-in-toss/web-framework/config';

/**
 * appName은 토스 콘솔 등록값과 반드시 동일해야 하며, 등록 후 변경 불가.
 * 콘솔 업로드 후 brand.icon에 콘솔 이미지 URL을 붙여 넣으세요.
 */
export default defineConfig({
  appName: 'tilematchgame',
  brand: {
    displayName: '타일 매치',
    primaryColor: '#FFF5FB',
    icon: '',
  },
  web: {
    host: 'localhost',
    port: 8080,
    commands: {
      dev: 'npx serve . -p 8080',
      build: 'node scripts/build-toss-web.mjs',
    },
  },
  permissions: [],
  outdir: 'dist',
  webViewProps: {
    type: 'game',
  },
});
