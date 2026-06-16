/**
 * Playwright로 실제 게임 화면 캡처 (선택).
 * npm install -D playwright && npx playwright install chromium
 */
import { spawn } from 'child_process';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'store-assets', 'toss');
const port = 8767;

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('playwright not installed. Run: npm install -D playwright && npx playwright install chromium');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      process.platform === 'win32' ? 'npx.cmd' : 'npx',
      ['--yes', 'serve', root, '-l', String(port)],
      { cwd: root, stdio: 'ignore', shell: true },
    );
    proc.on('error', reject);
    setTimeout(() => resolve(proc), 1500);
  });
}

async function waitForServer() {
  const url = `http://127.0.0.1:${port}/index.html`;
  for (let i = 0; i < 30; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return url;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Local server did not start.');
}

async function dismissOverlays(page) {
  const dismiss = page.locator('#btn-install-dismiss');
  if (await dismiss.isVisible().catch(() => false)) {
    await dismiss.click();
    await page.waitForTimeout(400);
  }
}

async function saveScreenshot(sharp, rawPath, outPath, w, h) {
  await sharp(rawPath)
    .resize(w, h, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(outPath);
}

const server = await startServer();
const baseUrl = await waitForServer();
const browser = await chromium.launch();
const sharp = (await import('sharp')).default;

const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const mobilePage = await mobileContext.newPage();
await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' });
await mobilePage.waitForTimeout(1200);
await dismissOverlays(mobilePage);

const verticalShots = [
  { name: 'screenshot-vertical-01-home.png', action: async () => {} },
  {
    name: 'screenshot-vertical-02-play.png',
    action: async () => {
      await mobilePage.locator('#btn-continue, .btn-play, [data-action="continue"]').first().click({ timeout: 5000 }).catch(() => {});
      await mobilePage.waitForTimeout(1500);
    },
  },
  {
    name: 'screenshot-vertical-03-social.png',
    action: async () => {
      await mobilePage.locator('#nav-club, [data-nav="club"]').first().click({ timeout: 3000 }).catch(() => {});
      await mobilePage.waitForTimeout(1200);
    },
  },
];

for (const { name, action } of verticalShots) {
  await action();
  const raw = join(outDir, `_raw_${name}`);
  await mobilePage.screenshot({ path: raw, fullPage: false });
  await saveScreenshot(sharp, raw, join(outDir, name), 636, 1048);
  console.log(`Captured: store-assets/toss/${name} (636×1048)`);
}

const wideContext = await browser.newContext({
  viewport: { width: 752, height: 370 },
  deviceScaleFactor: 2,
});
const widePage = await wideContext.newPage();
await widePage.goto(baseUrl, { waitUntil: 'networkidle' });
await widePage.waitForTimeout(1200);
await dismissOverlays(widePage);

const horizRaw = join(outDir, '_raw_screenshot-horizontal-01.png');
await widePage.screenshot({ path: horizRaw, fullPage: false });
await saveScreenshot(sharp, horizRaw, join(outDir, 'screenshot-horizontal-01.png'), 1504, 741);
console.log('Captured: store-assets/toss/screenshot-horizontal-01.png (1504×741)');

await browser.close();
server.kill();
console.log('Done. Review images in store-assets/toss/');
