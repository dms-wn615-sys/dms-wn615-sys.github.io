/**
 * 토스 콘솔 등급분류 — 동일 게임·동일 화면 2장을 양쪽 란에 사용.
 * (등급분류 받은 게임 = 앱인토스 출시 게임, 화면 동일해야 함)
 */
import { copyFileSync, mkdirSync } from "fs";
import { spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const baseOut = join(root, "store-assets", "toss", "rating-screens");
const selfDir = join(baseOut, "self-rating");
const aitDir = join(baseOut, "ait-play");
const port = 8768;

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("playwright not installed. Run: npm install -D playwright && npx playwright install chromium");
  process.exit(1);
}

mkdirSync(selfDir, { recursive: true });
mkdirSync(aitDir, { recursive: true });

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      process.platform === "win32" ? "npx.cmd" : "npx",
      ["--yes", "serve", root, "-l", String(port)],
      { cwd: root, stdio: "ignore", shell: true },
    );
    proc.on("error", reject);
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
  throw new Error("Local server did not start.");
}

async function dismissOverlays(page) {
  for (const sel of ["#btn-install-dismiss", "#btn-shop-close"]) {
    const el = page.locator(sel);
    if (await el.isVisible().catch(() => false)) {
      await el.click();
      await page.waitForTimeout(350);
    }
  }
}

async function clickFreeTiles(page, times = 6) {
  for (let i = 0; i < times; i += 1) {
    const clicked = await page.evaluate(() => {
      const tiles = [...document.querySelectorAll("#game-board .tile.free")];
      if (tiles.length === 0) return false;
      tiles[0].click();
      return true;
    });
    if (!clicked) break;
    await page.waitForTimeout(450);
  }
}

const server = await startServer();
await waitForServer();
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  locale: "ko-KR",
});
const page = await context.newPage();

await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await dismissOverlays(page);
await page.click("#btn-play");
await page.waitForTimeout(1200);
await dismissOverlays(page);

const sharedDir = join(baseOut, "_shared");
mkdirSync(sharedDir, { recursive: true });

const shot1 = join(sharedDir, "play-01-gameplay-start.png");
const shot2 = join(sharedDir, "play-02-gameplay-match.png");

await page.screenshot({ path: shot1, fullPage: false });
await clickFreeTiles(page, 10);
await page.waitForTimeout(500);
await page.screenshot({ path: shot2, fullPage: false });

await browser.close();
server.kill("SIGTERM");

const pairs = [
  {
    self: "self-rating-01-gameplay-start.png",
    ait: "ait-play-01-gameplay-start.png",
    src: shot1,
  },
  {
    self: "self-rating-02-gameplay-match.png",
    ait: "ait-play-02-gameplay-match.png",
    src: shot2,
  },
];

for (const { self, ait, src } of pairs) {
  copyFileSync(src, join(selfDir, self));
  copyFileSync(src, join(aitDir, ait));
  console.log(`동일 화면 → self-rating/${self}`);
  console.log(`동일 화면 → ait-play/${ait}`);
}

console.log("");
console.log("토스 요구: 등급분류 게임 = 출시 게임, 화면 동일");
console.log("양쪽 란에 위 2장씩(내용 동일) 업로드");
