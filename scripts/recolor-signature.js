const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const root = path.join(__dirname, "..");
const original = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "c-Users-house-Desktop-newyemek-sulealp",
  "assets",
  "c__Users_house_AppData_Roaming_Cursor_User_workspaceStorage_e3fbd59c87144a23f924b60933d4a71a_images_Screenshot_57-e50655e0-978d-4a19-a107-1c6ee5790e72.png",
);
const source = fs.existsSync(original)
  ? original
  : path.join(root, "public", "images", "signature.png");

async function recolor(inputPath, outputPath, hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const pr = data[i];
    const pg = data[i + 1];
    const pb = data[i + 2];
    const pa = data[i + 3];
    const lum = 0.299 * pr + 0.587 * pg + 0.114 * pb;

    if (lum > 245 || pa < 10) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
      continue;
    }

    const ink = 1 - lum / 255;
    const alpha = Math.min(255, Math.round(ink * 255 * (pa / 255)));
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = alpha;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outputPath);

  console.log("wrote", path.basename(outputPath), `${info.width}x${info.height}`);
}

(async () => {
  const outDir = path.join(root, "public", "images");
  await recolor(source, path.join(outDir, "signature.png"), "#AA6851");
  await recolor(source, path.join(outDir, "signature-light.png"), "#CDBAA4");
  await recolor(source, path.join(outDir, "logo.png"), "#AA6851");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
