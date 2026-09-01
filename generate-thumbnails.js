// generate-thumbnails.js
import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, "public/assets/products");
const OUTPUT_DIR = INPUT_DIR; // Outputs next to original

const sizes = [
  { suffix: "-thumbnail", width: 800, fileType: "webp" },
  { suffix: "-large", width: 1200, fileType: "webp" },
];

async function processImage(file) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const inputPath = path.join(INPUT_DIR, file);

  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  for (const { suffix, width, fileType } of sizes) {
    const outputFileName = `${base}${suffix}.${fileType}`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    try {
      await sharp(inputPath)
        .resize({ width })
        .toFile(outputPath);
      console.log(`Created: ${outputFileName}`);
    } catch (err) {
      console.error(`Error processing ${file} at size ${width}:`, err);
    }
  }
}

async function run() {
  const files = await fs.readdir(INPUT_DIR);
  for (const file of files) {
    await processImage(file);
  }
  console.log("✅ All thumbnails generated!");
}

run();