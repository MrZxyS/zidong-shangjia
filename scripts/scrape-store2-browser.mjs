import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const cli = 'C:/Users/root/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js';
const session = 'furaxis';
const source = JSON.parse(await fs.readFile('.data/store2-source.json', 'utf8'));
let results = [];
try { results = JSON.parse(await fs.readFile('.data/store2-browser.json', 'utf8')); } catch {}
const invalidTitle = /验证码|bloquead|access denied|mercado libre$|^\(\d+\)$/i;
const isValidRow = row => Boolean(row?.ok && row.category_id && row.title?.length >= 12 && !invalidTitle.test(row.title));
const bySku = new Map(results.map(row => [row.sku, row]));
const byUrl = new Map(results.filter(isValidRow).map(row => [row.requested_url, row]));

function call(args, timeout = 70000) {
  const result = spawnSync(process.execPath, [
    cli, '--raw', `-s=${session}`, ...args
  ], { encoding: 'utf8', timeout, windowsHide: true, maxBuffer: 12 * 1024 * 1024 });
  if (result.status !== 0) throw new Error((result.stderr || result.stdout || `exit ${result.status}`).trim());
  return result.stdout.trim();
}

function parseJson(output) {
  const start = output.indexOf('{');
  const end = output.lastIndexOf('}');
  if (start < 0 || end < start) throw new Error(`No JSON in Playwright output: ${output.slice(0, 500)}`);
  return JSON.parse(output.slice(start, end + 1));
}

const extractProduct = `() => {
  const anchors = [...document.querySelectorAll('a')];
  const hrefs = anchors.map(a => a.href || '');
  const html = document.documentElement.innerHTML;
  const categoryHref = hrefs.find(h => /[?&]category_id=MLC\\d+/.test(h)) || '';
  const category = categoryHref.match(/[?&]category_id=(MLC\\d+)/)?.[1]
    || html.match(/\\\"category_id\\\"\\s*:\\s*\\\"(MLC\\d+)\\\"/)?.[1]
    || html.match(/category_id%3D(MLC\\d+)/)?.[1]
    || null;
  const itemAnchors = anchors.filter(a => /articulo\\.mercadolibre\\.cl\\/MLC-\\d+/i.test(a.href || ''));
  const related = [...new Set(itemAnchors.map(a =>
    (a.getAttribute('title') || a.getAttribute('aria-label') || a.innerText || '').trim()
  ).filter(t => t.length >= 12 && t.length <= 180))].slice(0, 12);
  const specs = [...document.querySelectorAll('table, [class*=spec], [class*=attribute]')]
    .map(el => (el.innerText || '').trim()).filter(Boolean).join('\\n').slice(0, 10000);
  const breadcrumbs = [...document.querySelectorAll('nav a, [class*=breadcrumb] a')]
    .map(a => (a.innerText || '').trim()).filter(Boolean).slice(0, 12);
  const title = document.querySelector('h1')?.innerText?.trim()
    || document.querySelector('meta[property=\\\"og:title\\\"]')?.content?.trim()
    || document.title;
  const image = document.querySelector('meta[property=\\\"og:image\\\"]')?.content || null;
  const price = Number(document.querySelector('meta[itemprop=\\\"price\\\"]')?.content)
    || Number(html.match(/\\\"price\\\"\\s*:\\s*([0-9.]+)/)?.[1]) || null;
  return {
    url: location.href, title, image_url: image, category_id: category, price,
    related_titles: related, specs_text: specs, breadcrumbs,
    product_id: location.href.match(/MLC-?(\\d+)/i)?.[0]?.replace('-', '') || null,
    logged_in: document.body.innerText.includes('FURAXIS_CL') || !document.body.innerText.includes('Ingresa')
  };
}`;

const extractBestSellers = `() => ({
  url: location.href,
  title: document.title,
  items: [...new Set([...document.querySelectorAll('a')]
    .filter(a => /articulo\\.mercadolibre\\.cl\\/MLC-\\d+/i.test(a.href || ''))
    .map(a => (a.getAttribute('title') || a.getAttribute('aria-label') || a.innerText || '').trim())
    .filter(t => t.length >= 12 && t.length <= 180))].slice(0, 5)
})`;

async function saveResults() {
  results = source.map(item => bySku.get(item.sku)).filter(Boolean);
  await fs.writeFile('.data/store2-browser.json', `${JSON.stringify(results, null, 2)}\n`);
}

for (const product of source) {
  if (isValidRow(bySku.get(product.sku))) continue;
  const cached = byUrl.get(product.competitor_url);
  if (cached) {
    const row = { ...cached, sku: product.sku, checked_at: new Date().toISOString(), reused_url: true };
    bySku.set(product.sku, row);
    await saveResults();
    console.log(JSON.stringify({ sku: row.sku, ok: true, reused: true, title: row.title, category_id: row.category_id }));
    continue;
  }
  const row = { sku: product.sku, requested_url: product.competitor_url, checked_at: new Date().toISOString(), source: 'playwright:furaxis' };
  try {
    call(['goto', product.competitor_url]);
    const data = parseJson(call(['eval', extractProduct]));
    Object.assign(row, data, { ok: Boolean(data.category_id && data.title?.length >= 12 && !invalidTitle.test(data.title)) });
    if (!row.ok) row.error = 'No se pudo leer el título del producto';
  } catch (error) {
    row.ok = false;
    row.error = error.message;
  }
  bySku.set(product.sku, row);
  if (row.ok) byUrl.set(product.competitor_url, row);
  await saveResults();
  console.log(JSON.stringify({ sku: row.sku, ok: row.ok, title: row.title || null, category_id: row.category_id || null }));
}

const categories = [...new Set([...bySku.values()].map(r => r.category_id).filter(Boolean))];
const bestByCategory = new Map();
for (const category of categories) {
  try {
    call(['goto', `https://www.mercadolibre.cl/mas-vendidos/${category}`]);
    const data = parseJson(call(['eval', extractBestSellers]));
    bestByCategory.set(category, data.items || []);
    console.log(JSON.stringify({ category, top5: data.items?.length || 0 }));
  } catch (error) {
    bestByCategory.set(category, []);
    console.log(JSON.stringify({ category, top5: 0, error: error.message }));
  }
}

for (const row of bySku.values()) row.top_five_titles = bestByCategory.get(row.category_id) || row.related_titles?.slice(0, 5) || [];
await saveResults();

console.log(JSON.stringify({
  total: results.length,
  ok: results.filter(r => r.ok).length,
  categories: categories.length,
  failed: results.filter(r => !r.ok).map(r => r.sku)
}));
