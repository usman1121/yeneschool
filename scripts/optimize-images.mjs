import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsDir = path.resolve(root, "public", "assets");

const IMAGES = [
  { name: "admin.png", widths: [640, 960, 1280, 1920] },
  { name: "teacherleaderboard.png", widths: [640, 960, 1280] },
  { name: "parent.png", widths: [640, 960, 1280] },
  { name: "finance.png", widths: [640, 960, 1280] },
  { name: "registrar.png", widths: [640, 960, 1280] },
];

async function optimize() {
  console.log("\n  ── Optimizing images ──\n");

  for (const { name, widths } of IMAGES) {
    const inputPath = path.join(assetsDir, name);
    if (!fs.existsSync(inputPath)) {
      console.log(`  ✗ ${name} not found, skipping`);
      continue;
    }

    const ext = path.extname(name);
    const baseName = path.basename(name, ext);

    for (const width of widths) {
      const sizes = [width];
      if (width === 1920) sizes.push(undefined);

      const webpName = width === 1920
        ? `${baseName}.webp`
        : `${baseName}-${width}.webp`;
      const webpPath = path.join(assetsDir, webpName);

      const pngName = width === 1920
        ? name
        : `${baseName}-${width}.png`;
      const pngPath = path.join(assetsDir, pngName);

      const opts = { width };
      if (width === 1920) delete opts.width;

      await sharp(inputPath)
        .resize(opts.width ? { width: opts.width, withoutEnlargement: true } : undefined)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);

      if (opts.width) {
        await sharp(inputPath)
          .resize({ width: opts.width, withoutEnlargement: true })
          .png({ compressionLevel: 9, palette: true })
          .toFile(pngPath);
      }

      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(webpPath).size;
      const saved = ((1 - newSize / originalSize) * 100).toFixed(0);
      const label = width === 1920 ? "full" : `${width}w`;
      console.log(`  ✓ ${baseName} (${label}) → WebP  ${(newSize / 1024).toFixed(0)} KB  (${saved}% saved)`);
    }
  }

  console.log("\n  Done.\n");
}

optimize().catch((err) => {
  console.error("  ✗", err.message);
  process.exit(1);
});
