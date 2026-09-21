import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { apiRequest, getAccessToken } from '../src/meli.js';

const specPath = process.argv[2];
if (!specPath) throw new Error('Usage: node scripts/publish-from-spec.mjs <spec.json>');
const spec = JSON.parse(await fs.readFile(specPath, 'utf8'));
if (!spec.sku || !spec.category_id || !spec.title || !spec.description || !spec.image_path) {
  throw new Error('Spec is missing sku, category_id, title, description, or image_path');
}
if (spec.description.length < 4000) throw new Error(`Description too short: ${spec.description.length}`);

const recordPath = path.resolve('.data', `${spec.sku}-published.json`);
let record = {
  sku: spec.sku,
  source_index: spec.source_index,
  created_at: new Date().toISOString(),
  price_source: spec.price_source,
  stage: 'preparing'
};
try {
  record = { ...record, ...JSON.parse(await fs.readFile(recordPath, 'utf8')) };
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const save = () => fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);

try {
  let itemId = record.id;
  if (!itemId) {
    const existing = await apiRequest(`/users/3166000149/items/search?sku=${encodeURIComponent(spec.sku)}`);
    if (existing.results?.length > 1) throw new Error(`Duplicate seller SKU: ${existing.results.join(', ')}`);
    itemId = existing.results?.[0];
  }

  if (!itemId) {
    const prepared = path.resolve('.data', 'prepared-images', `${spec.sku}.jpg`);
    await fs.mkdir(path.dirname(prepared), { recursive: true });
    await sharp(path.resolve(spec.image_path)).rotate().resize(1200, 1200, {
      fit: 'contain', background: '#ffffff'
    }).jpeg({ quality: 90 }).toFile(prepared);

    const form = new FormData();
    form.append('file', new Blob([await fs.readFile(prepared)], { type: 'image/jpeg' }), `${spec.sku}.jpg`);
    const upload = await fetch('https://api.mercadolibre.com/pictures/items/upload', {
      method: 'POST', headers: { authorization: `Bearer ${await getAccessToken()}` }, body: form
    });
    const picture = await upload.json();
    if (!upload.ok || !picture.id) throw new Error(`Picture upload failed: ${JSON.stringify(picture)}`);
    record.picture_id = picture.id;
    record.stage = 'picture_uploaded';
    await save();

    const attributes = [
      { id: 'BRAND', value_name: spec.brand || 'Genérica' },
      { id: 'MODEL', value_name: spec.model },
      { id: 'GTIN', value_name: spec.upc },
      { id: 'SELLER_SKU', value_name: spec.sku },
      { id: 'SELLER_PACKAGE_LENGTH', value_name: `${spec.package.length_cm} cm` },
      { id: 'SELLER_PACKAGE_WIDTH', value_name: `${spec.package.width_cm} cm` },
      { id: 'SELLER_PACKAGE_HEIGHT', value_name: `${spec.package.height_cm} cm` },
      { id: 'SELLER_PACKAGE_WEIGHT', value_name: `${spec.package.weight_g} g` },
      ...(spec.extra_attributes || [])
    ];
    const created = await apiRequest('/items', { method: 'POST', body: {
      family_name: spec.title,
      category_id: spec.category_id,
      price: spec.price,
      currency_id: 'CLP',
      available_quantity: spec.quantity ?? 10,
      buying_mode: 'buy_it_now',
      listing_type_id: 'gold_special',
      condition: 'new',
      pictures: [{ id: picture.id }],
      attributes,
      sale_terms: [
        { id: 'WARRANTY_TYPE', value_id: '2230280' },
        { id: 'WARRANTY_TIME', value_name: '30 días' }
      ],
      shipping: { mode: 'me2', local_pick_up: false }
    }});
    itemId = created.id;
    record.id = itemId;
    record.stage = 'created';
    await save();
  }

  await apiRequest(`/items/${itemId}`, { method: 'PUT', body: { status: 'paused' } });
  record.stage = 'paused';
  await save();

  let currentDescription = {};
  try { currentDescription = await apiRequest(`/items/${itemId}/description`); } catch {}
  if ((currentDescription.plain_text?.length || 0) < 4000) {
    await apiRequest(`/items/${itemId}/description`, {
      method: currentDescription.plain_text ? 'PUT' : 'POST',
      body: { plain_text: spec.description }
    });
  }
  record.stage = 'description_added';
  await save();

  let item = await apiRequest(`/items/${itemId}`);
  if (item.shipping?.mode !== 'me2') {
    throw new Error(`Mercado Envios not enabled: ${JSON.stringify(item.shipping)}`);
  }
  const flexEndpoint = `/flex/sites/MLC/items/${itemId}/v2`;
  let flex = await apiRequest(flexEndpoint);
  if (!flex.has_flex) await apiRequest(flexEndpoint, { method: 'POST' });
  for (let attempt = 0; attempt < 6 && !flex.has_flex; attempt += 1) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    flex = await apiRequest(flexEndpoint);
  }

  const finalDescription = await apiRequest(`/items/${itemId}/description`);
  item = await apiRequest(`/items/${itemId}`);
  if (item.status !== 'paused' || item.shipping?.mode !== 'me2' || !flex.has_flex ||
      (finalDescription.plain_text?.length || 0) < 4000) {
    throw new Error('Final verification failed');
  }
  Object.assign(record, {
    stage: 'complete', title: item.title, permalink: item.permalink, price: item.price,
    status: item.status, shipping_mode: item.shipping.mode,
    logistic_type: item.shipping.logistic_type, flex: true,
    description_length: finalDescription.plain_text.length, category_id: item.category_id,
    result: 'success'
  });
  delete record.error;
  delete record.failed_at;
  await save();
  console.log(JSON.stringify(record, null, 2));
} catch (error) {
  record.result = 'exception';
  record.error = error.message;
  record.failed_at = new Date().toISOString();
  await save();
  console.error(JSON.stringify(record, null, 2));
  process.exitCode = 1;
}
