import { existsSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'store-assets', 'toss');
const svgPath = join(root, 'icons', 'icon.svg');

const bgLight = { r: 255, g: 245, b: 251, alpha: 1 };
const bgDark = { r: 26, g: 18, b: 41, alpha: 1 };

mkdirSync(outDir, { recursive: true });

if (!existsSync(svgPath)) {
  console.error('icons/icon.svg not found. Run: npm run icons');
  process.exit(1);
}

const svg = readFileSync(svgPath);

async function logo600(background, filename, label) {
  const iconSize = 480;
  const iconBuf = await sharp(svg).resize(iconSize, iconSize).png().toBuffer();
  const pad = Math.round((600 - iconSize) / 2);
  await sharp({
    create: { width: 600, height: 600, channels: 4, background },
  })
    .composite([{ input: iconBuf, top: pad, left: pad }])
    .png()
    .toFile(join(outDir, filename));
  console.log(`Created: store-assets/toss/${filename} (600×600) — ${label}`);
}

async function thumbnail1932x828() {
  const w = 1932;
  const h = 828;
  const iconSize = 320;
  const iconBuf = await sharp(svg).resize(iconSize, iconSize).png().toBuffer();
  const left = Math.round(w * 0.08);
  const top = Math.round((h - iconSize) / 2);

  const titleSvg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#fff5fb"/>
          <stop offset="50%" style="stop-color:#f3e8ff"/>
          <stop offset="100%" style="stop-color:#e8d5ff"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="${left + iconSize + 80}" y="${Math.round(h * 0.42)}"
        font-family="Segoe UI, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
        font-size="72" font-weight="700" fill="#4a3569">타일 매치</text>
      <text x="${left + iconSize + 80}" y="${Math.round(h * 0.58)}"
        font-family="Segoe UI, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
        font-size="36" fill="#6b4ce6">3매치 퍼즐 · 20000레벨</text>
    </svg>
  `);

  await sharp(titleSvg)
    .composite([{ input: iconBuf, top, left }])
    .png()
    .toFile(join(outDir, 'thumbnail-1932x828.png'));
  console.log('Created: store-assets/toss/thumbnail-1932x828.png (1932×828)');
}

async function screenshotVertical(label, filename, accent) {
  const w = 636;
  const h = 1048;
  const iconSize = 200;
  const iconBuf = await sharp(svg).resize(iconSize, iconSize).png().toBuffer();
  const svgFrame = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${accent}"/>
      <rect x="32" y="120" width="${w - 64}" height="${h - 240}" rx="32" fill="#ffffff" opacity="0.92"/>
      <text x="${w / 2}" y="${h - 100}" text-anchor="middle"
        font-family="Segoe UI, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
        font-size="28" fill="#4a3569">${label}</text>
    </svg>
  `);
  await sharp(svgFrame)
    .composite([
      {
        input: iconBuf,
        top: Math.round(h * 0.38 - iconSize / 2),
        left: Math.round(w / 2 - iconSize / 2),
      },
    ])
    .png()
    .toFile(join(outDir, filename));
  console.log(`Created: store-assets/toss/${filename} (636×1048)`);
}

async function screenshotHorizontal() {
  const w = 1504;
  const h = 741;
  const iconSize = 280;
  const iconBuf = await sharp(svg).resize(iconSize, iconSize).png().toBuffer();
  const iconLeft = Math.round(w * 0.06);
  const iconTop = Math.round((h - iconSize) / 2);

  const frameSvg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#fff5fb"/>
          <stop offset="45%" style="stop-color:#f3e8ff"/>
          <stop offset="100%" style="stop-color:#dcc9ff"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#hg)"/>
      <rect x="${iconLeft + iconSize + 48}" y="48" width="${w - iconLeft - iconSize - 96}" height="${h - 96}" rx="28" fill="#ffffff" opacity="0.88"/>
      <text x="${iconLeft + iconSize + 100}" y="${Math.round(h * 0.38)}"
        font-family="Segoe UI, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
        font-size="56" font-weight="700" fill="#4a3569">타일 매치</text>
      <text x="${iconLeft + iconSize + 100}" y="${Math.round(h * 0.52)}"
        font-family="Segoe UI, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
        font-size="32" fill="#6b4ce6">3매치 타일 퍼즐 · 20000레벨</text>
      <text x="${iconLeft + iconSize + 100}" y="${Math.round(h * 0.66)}"
        font-family="Segoe UI, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
        font-size="26" fill="#7c6a9e">클럽 · 토너먼트 · 오프라인 플레이</text>
    </svg>
  `);

  await sharp(frameSvg)
    .composite([{ input: iconBuf, top: iconTop, left: iconLeft }])
    .png()
    .toFile(join(outDir, 'screenshot-horizontal-01.png'));
  console.log('Created: store-assets/toss/screenshot-horizontal-01.png (1504×741)');
}

await logo600(bgLight, 'app-logo-600.png', '앱 로고');
await logo600(bgDark, 'app-logo-600-dark.png', '다크모드 앱 로고');
await thumbnail1932x828();
await screenshotVertical('홈 · 레벨 선택', 'screenshot-vertical-01-home.png', '#fff5fb');
await screenshotVertical('타일 매치 플레이', 'screenshot-vertical-02-play.png', '#f3e8ff');
await screenshotVertical('클럽 · 토너먼트', 'screenshot-vertical-03-social.png', '#e8d5ff');
await screenshotHorizontal();

console.log('');
console.log('토스 콘솔 업로드: store-assets/toss/');
console.log('  앱 로고 600×600          → app-logo-600.png');
console.log('  다크모드 앱 로고 600×600 → app-logo-600-dark.png');
console.log('  썸네일 1932×828         → thumbnail-1932x828.png');
console.log('  스크린샷 세로 636×1048 ×3 → screenshot-vertical-01~03.png');
console.log('  스크린샷 가로 1504×741 ×1 → screenshot-horizontal-01.png');
console.log('');
console.log('실제 게임 화면: npm run toss:screenshots (playwright 설치 시)');
