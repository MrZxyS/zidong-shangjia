import fs from 'node:fs/promises';
import { apiRequest } from '../src/meli.js';

const plan = JSON.parse(await fs.readFile('.data/store2-plan.json', 'utf8'));
const categoryCache = new Map();
const categoryOverrides = {
  BG260847NEGMS1: 'MLC2740',
  BG260865PLAMS1: 'MLC431455',
  BG260864NEGMS1: 'MLC431455',
  BG260927MARMS1: 'MLC160877'
};

for (const entry of plan) {
  if (categoryOverrides[entry.sku] && entry.category_id !== categoryOverrides[entry.sku]) {
    const old = entry.category_id;
    entry.category_id = categoryOverrides[entry.sku];
    entry.category_source = `manual_leaf_override_from_${old}`;
    const spec = JSON.parse(await fs.readFile(entry.spec_path, 'utf8'));
    spec.category_id = entry.category_id;
    spec.category_source = entry.category_source;
    await fs.writeFile(entry.spec_path, `${JSON.stringify(spec, null, 2)}\n`);
    console.log(JSON.stringify({ sku: entry.sku, old, predicted: entry.category_id, source: 'manual_override' }));
  }
  let category = categoryCache.get(entry.category_id);
  if (!category) {
    category = await apiRequest(`/categories/${entry.category_id}`);
    categoryCache.set(entry.category_id, category);
  }
  const isLeaf = category.settings?.listing_allowed !== false && !(category.children_categories?.length);
  if (isLeaf) continue;
  const discovery = await apiRequest(`/sites/MLC/domain_discovery/search?limit=1&q=${encodeURIComponent(entry.title)}`);
  const predicted = discovery?.[0]?.category_id;
  if (!predicted) {
    entry.category_exception = `No leaf category prediction from ${entry.category_id}`;
    console.log(JSON.stringify({ sku: entry.sku, old: entry.category_id, error: entry.category_exception }));
    continue;
  }
  const old = entry.category_id;
  entry.category_id = predicted;
  entry.category_source = `official_domain_discovery_from_${old}`;
  const spec = JSON.parse(await fs.readFile(entry.spec_path, 'utf8'));
  spec.category_id = predicted;
  spec.category_source = entry.category_source;
  await fs.writeFile(entry.spec_path, `${JSON.stringify(spec, null, 2)}\n`);
  console.log(JSON.stringify({ sku: entry.sku, old, predicted, domain: discovery[0].domain_id || null }));
}

await fs.writeFile('.data/store2-plan.json', `${JSON.stringify(plan, null, 2)}\n`);
console.log(JSON.stringify({ total: plan.length, changed: plan.filter(x => x.category_source?.startsWith('official_domain')).length }));
