import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const browser = JSON.parse(await fs.readFile('.data/store2-browser.json', 'utf8'));
const plan = JSON.parse(await fs.readFile('.data/store2-plan.json', 'utf8'));
const bySku = new Map(browser.map(x => [x.sku, x]));
const outputDir = path.resolve('.data/store2-competitor-images');
await fs.mkdir(outputDir, { recursive: true });

for (const entry of plan) {
  const row = bySku.get(entry.sku);
  if (!row?.image_url) throw new Error(`Missing competitor image URL for ${entry.sku}`);
  const candidates = [...new Set([
    row.image_url.replace(/-O(?=-|\.)/, '-F'),
    row.image_url,
  ])];
  let buffer;
  let selectedUrl;
  let metadata;
  for (const url of candidates) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
      if (!response.ok) continue;
      const candidate = Buffer.from(await response.arrayBuffer());
      const info = await sharp(candidate).metadata();
      if (!info.width || !info.height) continue;
      buffer = candidate;
      selectedUrl = url;
      metadata = info;
      if (Math.max(info.width, info.height) >= 500 && Math.min(info.width, info.height) >= 50) break;
    } catch {}
  }
  if (!buffer) throw new Error(`Could not download a valid image for ${entry.sku}`);
  const imagePath = path.join(outputDir, `${entry.sku}.jpg`);
  await sharp(buffer).rotate().resize(1200, 1200, { fit: 'contain', background: '#ffffff' }).jpeg({ quality: 92 }).toFile(imagePath);
  const finalInfo = await sharp(imagePath).metadata();
  const spec = JSON.parse(await fs.readFile(entry.spec_path, 'utf8'));
  spec.image_path = imagePath;
  spec.competitor_image_url = selectedUrl;
  await fs.writeFile(entry.spec_path, `${JSON.stringify(spec, null, 2)}\n`);
  entry.image_path = imagePath;
  entry.competitor_image_url = selectedUrl;
  console.log(JSON.stringify({ sku: entry.sku, source: `${metadata.width}x${metadata.height}`, prepared: `${finalInfo.width}x${finalInfo.height}` }));
}

await fs.writeFile('.data/store2-plan.json', `${JSON.stringify(plan, null, 2)}\n`);
console.log(JSON.stringify({ total: plan.length }));
