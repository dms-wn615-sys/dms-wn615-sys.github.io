import { readFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const iconsDir = join(root, 'icons');
const svgPath = join(iconsDir, 'icon.svg');

if (!existsSync(svgPath)) {
  console.error('icons/icon.svg not found');
  process.exit(1);
}

const svg = readFileSync(svgPath);

const sizes = [
  { name: 'icon-180.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-maskable-512.png', size: 512, maskable: true },
];

mkdirSync(iconsDir, { recursive: true });

for (const { name, size, maskable } of sizes) {
  let pipeline = sharp(svg).resize(size, size);

  if (maskable) {
    const pad = Math.round(size * 0.1);
    const inner = size - pad * 2;
    const innerBuf = await sharp(svg).resize(inner, inner).png().toBuffer();
    pipeline = sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 245, b: 251, alpha: 1 },
      },
    }).composite([{ input: innerBuf, gravity: 'center' }]);
  }

  await pipeline.png().toFile(join(iconsDir, name));
  console.log(`Created icons/${name}`);
}

console.log('Done.');
