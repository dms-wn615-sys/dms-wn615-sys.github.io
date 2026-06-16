import { ZipArchive } from "archiver";
import { createWriteStream, existsSync, mkdirSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const outDir = join(projectRoot, "store-assets", "grac");
const zipPath = join(outDir, "tilematch-grac.zip");

const includePaths = [
  "index.html",
  "privacy.html",
  "licenses.html",
  "manifest.json",
  "service-worker.js",
  "css",
  "js",
  "icons",
  ".well-known",
];

mkdirSync(outDir, { recursive: true });

await new Promise((resolve, reject) => {
  const output = createWriteStream(zipPath);
  const archive = new ZipArchive({ zlib: { level: 9 } });

  output.on("close", () => {
    console.log(`Created: ${zipPath} (${archive.pointer()} bytes)`);
    console.log("GRAC upload: store-assets/grac/tilematch-grac.zip");
    resolve();
  });

  archive.on("error", reject);
  archive.pipe(output);

  for (const rel of includePaths) {
    const abs = join(projectRoot, rel);
    if (!existsSync(abs)) {
      console.warn(`Skip (missing): ${rel}`);
      continue;
    }
    if (statSync(abs).isDirectory()) {
      archive.directory(abs, rel);
    } else {
      archive.file(abs, { name: rel });
    }
  }

  archive.finalize();
});
