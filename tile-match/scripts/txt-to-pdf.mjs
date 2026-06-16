import PDFDocument from "pdfkit";
import { createWriteStream, existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const gracDir = join(projectRoot, "store-assets", "grac");

const fontCandidates = [
  "C:\\Windows\\Fonts\\malgun.ttf",
  "C:\\Windows\\Fonts\\NanumGothic.ttf",
  "/System/Library/Fonts/AppleSDGothicNeo.ttc",
  "/usr/share/fonts/truetype/nanum/NanumGothic.ttf",
];

const fontPath = fontCandidates.find((p) => existsSync(p));

if (!fontPath) {
  console.error("Korean font not found. Install Malgun Gothic or Nanum Gothic.");
  process.exit(1);
}

const inputs = [
  { txt: "game-content-description.txt", pdf: "game-content-description.pdf" },
  { txt: "rating-materials.txt", pdf: "rating-materials.pdf" },
];

function txtToPdf(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const text = readFileSync(inputPath, "utf8");
    const doc = new PDFDocument({ margin: 48, size: "A4" });
    const stream = createWriteStream(outputPath);
    doc.pipe(stream);

    doc.registerFont("Body", fontPath);
    doc.font("Body").fontSize(11);

    const lineHeight = 16;
    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.replace(/\t/g, "  ");
      if (doc.y > doc.page.height - doc.page.margins.bottom - lineHeight) {
        doc.addPage();
      }
      if (/^=+$/.test(line.trim()) || /^-+$/.test(line.trim())) {
        doc.moveDown(0.2);
        continue;
      }
      const trimmed = line.trim();
      if (/^\d+\.\s/.test(trimmed) || /게임물 내용 설명서|등급 관련 자료/.test(trimmed)) {
        doc.moveDown(0.4);
        doc.fontSize(/설명서|등급 관련/.test(trimmed) ? 16 : 13).text(trimmed, {
          width: pageWidth,
          lineGap: 2,
        });
        doc.fontSize(11);
        continue;
      }
      doc.text(line || " ", { width: pageWidth, lineGap: 2 });
    }

    doc.end();
    stream.on("finish", () => {
      console.log(`Created: ${outputPath}`);
      resolve();
    });
    stream.on("error", reject);
  });
}

for (const { txt, pdf } of inputs) {
  const inputPath = join(gracDir, txt);
  if (!existsSync(inputPath)) {
    console.warn(`Skip (missing): ${txt}`);
    continue;
  }
  await txtToPdf(inputPath, join(gracDir, pdf));
}
