import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const distDir = join(projectRoot, 'dist');

const includePaths = [
  'index.html',
  'privacy.html',
  'licenses.html',
  'manifest.json',
  'service-worker.js',
  'css',
  'js',
  'icons',
  '.well-known',
];

if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir, { recursive: true });

for (const rel of includePaths) {
  const src = join(projectRoot, rel);
  if (!existsSync(src)) {
    console.warn(`Skip (missing): ${rel}`);
    continue;
  }
  const dest = join(distDir, rel);
  cpSync(src, dest, { recursive: true });
}

console.log(`Toss web bundle: ${distDir}`);
