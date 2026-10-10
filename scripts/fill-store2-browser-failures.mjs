import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const cli = 'C:/Users/root/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js';
const session = 'furaxis';
const source = JSON.parse(await fs.readFile('.data/store2-source.json', 'utf8'));
const results = JSON.parse(await fs.readFile('.data/store2-browser.json', 'utf8'));
const bySku = new Map(results.map(r => [r.sku, r]));

const searchQueries = {
  BG260652NEGMS1: 'juego magnético estrategia 20 piezas',
  BG260644AZUMS1: 'juego magnético bolas estrategia 20 piezas',
  BG260650AZUMS1: 'flores bloques construcción rosa morada',
  BG260738NEGMS1: 'mochila delivery termica',
  BG260774BLAMS1: 'cartel led luminoso 40x60'
};

function call(args, timeout = 70000) {
  const result = spawnSync(process.execPath, [cli, '--raw', `-s=${session}`, ...args], {
    encoding: 'utf8', timeout, windowsHide: true, maxBuffer: 12 * 1024 * 1024
  });
  if (result.status !== 0) throw new Error((result.stderr || result.stdout || `exit ${result.status}`).trim());
  return result.stdout.trim();
}

function parseJson(output) {
  const start = output.indexOf('{');
  const end = output.lastIndexOf('}');
  if (start < 0 || end < start) throw new Error(`No JSON: ${output.slice(0, 400)}`);
  return JSON.parse(output.slice(start, end + 1));
}

const firstSearchResult = `() => {
  for (const a of [...document.querySelectorAll('a')]) {
    const title = (a.getAttribute('title') || a.getAttribute('aria-label') || a.innerText || '').trim();
    if (title.length < 12) continue;
    let href = a.href || '';
    try { href = decodeURIComponent(href); } catch {}
    const id = href.match(/item_id[:=](MLC\\d+)/i)?.[1]
      || href.match(/[?&]wid=(MLC\\d+)/i)?.[1]
      || href.match(/articulo\\.mercadolibre\\.cl\\/MLC-(\\d+)/i)?.[1]?.replace(/^/, 'MLC');
    if (id) return { href: 'https://articulo.mercadolibre.cl/' + id.replace('MLC', 'MLC-') + '-_JM', title };
  }
  return { href: null, title: null };
}`;

const extractProduct = `() => {
  const anchors = [...document.querySelectorAll('a')];
  const hrefs = anchors.map(a => a.href || '');
  const html = document.documentElement.innerHTML;
  const categoryHref = hrefs.find(h => /[?&]category_id=MLC\\d+/.test(h)) || '';
  const category = categoryHref.match(/[?&]category_id=(MLC\\d+)/)?.[1]
    || html.match(/\\\"category_id\\\"\\s*:\\s*\\\"(MLC\\d+)\\\"/)?.[1]
    || html.match(/category_id%3D(MLC\\d+)/)?.[1]
    || null;
  const related = [...new Set(anchors.filter(a => /articulo\\.mercadolibre\\.cl\\/MLC-\\d+/i.test(a.href || ''))
    .map(a => (a.getAttribute('title') || a.getAttribute('aria-label') || a.innerText || '').trim())
    .filter(t => t.length >= 12 && t.length <= 180))].slice(0, 12);
  const title = document.querySelector('h1')?.innerText?.trim()
    || document.querySelector('meta[property=\\\"og:title\\\"]')?.content?.trim()
    || document.title;
  return {
    url: location.href, title,
    image_url: document.querySelector('meta[property=\\\"og:image\\\"]')?.content || null,
    category_id: category,
    price: Number(document.querySelector('meta[itemprop=\\\"price\\\"]')?.content)
      || Number(html.match(/\\\"price\\\"\\s*:\\s*([0-9.]+)/)?.[1]) || null,
    related_titles: related,
    specs_text: [...document.querySelectorAll('table, [class*=spec], [class*=attribute]')]
      .map(el => (el.innerText || '').trim()).filter(Boolean).join('\\n').slice(0, 10000),
    product_id: location.href.match(/MLC-?(\\d+)/i)?.[0]?.replace('-', '') || null
  };
}`;

const extractBest = `() => ({ items: [...new Set([...document.querySelectorAll('a')]
  .filter(a => /articulo\\.mercadolibre\\.cl\\/MLC-\\d+/i.test(a.href || ''))
  .map(a => (a.getAttribute('title') || a.getAttribute('aria-label') || a.innerText || '').trim())
  .filter(t => t.length >= 12 && t.length <= 180))].slice(0, 5) })`;

for (const product of source.filter(p => !bySku.get(p.sku)?.ok)) {
  const row = { ...bySku.get(product.sku), sku: product.sku, source: 'playwright:furaxis:fallback', checked_at: new Date().toISOString() };
  try {
    const query = searchQueries[product.sku] || product.development?.product_name || product.source_spec;
    call(['goto', `https://listado.mercadolibre.cl/${encodeURIComponent(query)}`]);
    const target = parseJson(call(['eval', firstSearchResult])).href;
    if (!target) throw new Error('No search result found');
    call(['goto', target]);
    const data = parseJson(call(['eval', extractProduct]));
    if (!data.category_id || !data.title || /验证码|bloquead|access denied/i.test(data.title)) throw new Error('No valid product/category data');
    Object.assign(row, data, { ok: true, requested_url: product.competitor_url, fallback_url: target });
    call(['goto', `https://www.mercadolibre.cl/mas-vendidos/${data.category_id}`]);
    const best = parseJson(call(['eval', extractBest])).items || [];
    row.top_five_titles = best.length ? best : data.related_titles.slice(0, 5);
    delete row.error;
  } catch (error) {
    row.ok = false;
    row.error = error.message;
  }
  bySku.set(product.sku, row);
  console.log(JSON.stringify({ sku: row.sku, ok: row.ok, title: row.title || null, category_id: row.category_id || null, error: row.error || null }));
}

const merged = source.map(p => bySku.get(p.sku));
await fs.writeFile('.data/store2-browser.json', `${JSON.stringify(merged, null, 2)}\n`);
console.log(JSON.stringify({ total: merged.length, ok: merged.filter(r => r?.ok).length, failed: merged.filter(r => !r?.ok).map(r => r.sku) }));
