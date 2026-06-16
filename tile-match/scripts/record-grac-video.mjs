import { chromium } from "playwright";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { spawn } from "child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const outDir = join(projectRoot, "store-assets", "grac");
const port = 8766;
const baseUrl = `http://127.0.0.1:${port}/index.html`;
const minMs = 90_000;
const maxMs = 180_000;

mkdirSync(outDir, { recursive: true });

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      process.platform === "win32" ? "npx.cmd" : "npx",
      ["--yes", "serve", projectRoot, "-l", String(port)],
      { cwd: projectRoot, stdio: "ignore", shell: true },
    );
    proc.on("error", reject);
    setTimeout(() => resolve(proc), 1500);
  });
}

async function waitForServer() {
  for (let i = 0; i < 30; i += 1) {
    try {
      const res = await fetch(baseUrl);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Local game server did not start.");
}

async function dismissOverlays(page) {
  const installDismiss = page.locator("#btn-install-dismiss");
  if (await installDismiss.isVisible().catch(() => false)) {
    await installDismiss.click();
    await page.waitForTimeout(400);
  }
  const shopClose = page.locator("#btn-shop-close");
  if (await shopClose.isVisible().catch(() => false)) {
    await shopClose.click();
    await page.waitForTimeout(300);
  }
}

async function isModalOpen(page) {
  return page.evaluate(() => {
    const overlay = document.getElementById("modal-overlay");
    return overlay && !overlay.classList.contains("hidden");
  });
}

async function getModalTitle(page) {
  return page.evaluate(() => document.getElementById("modal-title")?.textContent?.trim() ?? "");
}

async function clickFreeTiles(page) {
  const tiles = page.locator("#game-board .tile.free");
  const count = await tiles.count();
  if (count === 0) return false;
  const index = Math.min(Math.floor(Math.random() * count), count - 1);
  await tiles.nth(index).click();
  await page.waitForTimeout(280);
  return true;
}

async function convertToMp4(webmPath, mp4Path) {
  return new Promise((resolve) => {
    const ffmpeg = spawn(
      ffmpegInstaller.path,
      ["-y", "-i", webmPath, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4Path],
      { stdio: "ignore", shell: false },
    );
    ffmpeg.on("close", (code) => resolve(code === 0));
    ffmpeg.on("error", () => resolve(false));
  });
}

const server = await startServer();
await waitForServer();

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  recordVideo: {
    dir: outDir,
    size: { width: 390, height: 844 },
  },
  locale: "ko-KR",
});
const page = await context.newPage();
const startedAt = Date.now();

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await dismissOverlays(page);

await page.click("#btn-play");
await page.waitForTimeout(1500);

let finished = false;
while (!finished) {
  const elapsed = Date.now() - startedAt;
  if (elapsed > maxMs) break;

  if (await isModalOpen(page)) {
    await page.waitForTimeout(3500);
    finished = true;
    break;
  }

  const clicked = await clickFreeTiles(page);
  if (!clicked) await page.waitForTimeout(400);

  if (elapsed >= minMs && (await isModalOpen(page))) {
    await page.waitForTimeout(3000);
    finished = true;
  }
}

if (!finished) {
  await page.locator('.nav-item[data-screen="settings"]').click();
  await page.waitForTimeout(2500);
  await page.locator('.nav-item[data-screen="home"]').click();
  await page.waitForTimeout(1500);
}

await page.waitForTimeout(2000);
await context.close();
await browser.close();
server.kill("SIGTERM");

const videos = readdirSync(outDir).filter((f) => f.endsWith(".webm") && !f.startsWith("gameplay"));
if (videos.length === 0) {
  console.error("No video file was recorded.");
  process.exit(1);
}

const latestWebm = join(outDir, videos.sort().at(-1));
const mp4Path = join(outDir, "gameplay-video.mp4");
const webmPath = join(outDir, "gameplay-video.webm");
copyFileSync(latestWebm, webmPath);

const converted = await convertToMp4(webmPath, mp4Path);
if (converted) {
  console.log(`Created: ${mp4Path}`);
} else {
  console.log(`Created: ${webmPath} (ffmpeg conversion failed)`);
}

for (const file of videos) {
  if (file !== "gameplay-video.webm") {
    try {
      unlinkSync(join(outDir, file));
    } catch {
      // ignore
    }
  }
}

console.log("GRAC upload: store-assets/grac/gameplay-video.mp4");
