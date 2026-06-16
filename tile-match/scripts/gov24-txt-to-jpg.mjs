/**
 * 제작시설·장비 명세서 TXT → JPG (정부24 첨부용)
 * npm run gov24:jpg
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const gov24Dir = join(__dirname, "..", "store-assets", "gov24");
const inputPath = join(gov24Dir, "facility-equipment-list.txt");
const outputPath = join(gov24Dir, "facility-equipment-list.jpg");

if (!existsSync(inputPath)) {
  console.error("Missing:", inputPath);
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("playwright not installed.");
  process.exit(1);
}

const text = readFileSync(inputPath, "utf8");
const escaped = text
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 48px 56px;
      width: 794px;
      font-family: "Malgun Gothic", "Apple SD Gothic Neo", sans-serif;
      font-size: 11pt;
      line-height: 1.55;
      color: #111;
      background: #fff;
    }
    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-family: inherit;
      font-size: inherit;
    }
  </style>
</head>
<body><pre>${escaped}</pre></body>
</html>`;

mkdirSync(gov24Dir, { recursive: true });
const htmlPath = join(gov24Dir, "_render.html");
writeFileSync(htmlPath, html, "utf8");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 794, height: 1123 });
await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, { waitUntil: "networkidle" });
const height = await page.evaluate(() => document.body.scrollHeight);
await page.setViewportSize({ width: 794, height: Math.max(1123, height) });
await page.screenshot({
  path: outputPath,
  type: "jpeg",
  quality: 92,
  fullPage: true,
});
await browser.close();

console.log(`Created: ${outputPath}`);
