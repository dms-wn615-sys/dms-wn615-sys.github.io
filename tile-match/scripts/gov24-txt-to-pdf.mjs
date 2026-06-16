import PDFDocument from "pdfkit";
import { createWriteStream, existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const gov24Dir = join(__dirname, "..", "store-assets", "gov24");

const fontCandidates = [
  "C:\\Windows\\Fonts\\malgun.ttf",
  "C:\\Windows\\Fonts\\NanumGothic.ttf",
  "/System/Library/Fonts/AppleSDGothicNeo.ttc",
  "/usr/share/fonts/truetype/nanum/NanumGothic.ttf",
];

const fontPath = fontCandidates.find((p) => existsSync(p));
if (!fontPath) {
  console.error("Korean font not found.");
  process.exit(1);
}

const inputPath = join(gov24Dir, "facility-equipment-list.txt");
const outputPath = join(gov24Dir, "facility-equipment-list.pdf");

if (!existsSync(inputPath)) {
  console.error("Missing:", inputPath);
  process.exit(1);
}

const text = readFileSync(inputPath, "utf8");
const doc = new PDFDocument({ margin: 48, size: "A4" });
const stream = createWriteStream(outputPath);
doc.pipe(stream);
doc.registerFont("Body", fontPath);
doc.font("Body").fontSize(11);

const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
const lineHeight = 16;

for (const rawLine of text.split(/\r?\n/)) {
  const line = rawLine.replace(/\t/g, "  ");
  if (doc.y > doc.page.height - doc.page.margins.bottom - lineHeight) doc.addPage();
  if (/^=+$/.test(line.trim()) || /^-+$/.test(line.trim())) {
    doc.moveDown(0.2);
    continue;
  }
  doc.text(line || " ", { width: pageWidth, lineGap: 2 });
}

doc.end();
await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});
console.log(`Created: ${outputPath}`);
console.log("Edit facility-equipment-list.txt (address, PC model) then re-run if needed.");
