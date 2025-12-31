// Generates favicon.ico from SVG using sharp + to-ico
// Outputs to apps/docs/public/favicon.ico and apps/web/public/favicon.ico

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true }).catch(() => {});
}

async function svgToPngBuffers(svgPath, sizes) {
  const svg = await fs.promises.readFile(svgPath);
  const bufs = [];
  for (const size of sizes) {
    const buf = await sharp(svg, { density: 256 })
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toBuffer();
    bufs.push(buf);
  }
  return bufs;
}

async function run() {
  const root = process.cwd();
  const svgPath = path.join(root, 'apps', 'docs', 'public', 'icon.svg');
  const sizes = [16, 32, 48, 64];

  if (!fs.existsSync(svgPath)) {
    console.error('Icon SVG not found:', svgPath);
    process.exit(1);
  }

  console.log('Generating PNG buffers from SVG...');
  const pngBuffers = await svgToPngBuffers(svgPath, sizes);

  console.log('Bundling ICO...');
  const icoBuffer = await toIco(pngBuffers);

  const outDocs = path.join(root, 'apps', 'docs', 'public');
  const outWeb = path.join(root, 'apps', 'web', 'public');

  await ensureDir(outDocs);
  await ensureDir(outWeb);

  const docsIco = path.join(outDocs, 'favicon.ico');
  const webIco = path.join(outWeb, 'favicon.ico');

  await fs.promises.writeFile(docsIco, icoBuffer);
  console.log('Wrote', docsIco);

  if (fs.existsSync(outWeb)) {
    await fs.promises.writeFile(webIco, icoBuffer);
    console.log('Wrote', webIco);
  } else {
    console.warn('apps/web not found, skipped writing web favicon');
  }

  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
