import fs from 'node:fs/promises';
import { apiRequest } from '../src/meli.js';

const plan = JSON.parse(await fs.readFile('.data/store2-plan.json', 'utf8'));
const rows = plan.map(entry => ({
  source_index: entry.source_index,
  source_row: entry.source_row,
  sku: entry.sku,
  planned_title: entry.title,
  planned_price: entry.price,
  same_product_group: entry.same_product_group,
  source_missing_dimensions: entry.source_missing_dimensions,
  competitor_url: entry.competitor_url,
  purchase_url: entry.purchase_url,
  price_source: entry.price_source
}));

for (let offset = 0; offset < rows.length; offset += 8) {
  const batch = rows.slice(offset, offset + 8);
  await Promise.all(batch.map(async row => {
    try {
      let record = {};
      try { record = JSON.parse(await fs.readFile(`.data/${row.sku}-published.json`, 'utf8')); } catch {}
      let id = record.id;
      if (!id) {
        const found = await apiRequest(`/users/3166000149/items/search?sku=${encodeURIComponent(row.sku)}`);
        if (found.results?.length > 1) throw new Error(`Duplicate seller SKU: ${found.results.join(', ')}`);
        id = found.results?.[0];
      }
      if (!id) throw new Error('No se encontró publicación para el SKU');
      const [item, description, flex] = await Promise.all([
        apiRequest(`/items/${id}`),
        apiRequest(`/items/${id}/description`).catch(() => ({})),
        apiRequest(`/flex/sites/MLC/items/${id}/v2`).catch(error => ({ has_flex: false, error: error.message }))
      ]);
      Object.assign(row, {
        id,
        title: item.title || '',
        price: item.price ?? '',
        status: item.status || '',
        shipping_mode: item.shipping?.mode || '',
        logistic_type: item.shipping?.logistic_type || '',
        flex: flex.has_flex === true,
        flex_error: flex.error || '',
        description_length: description.plain_text?.length || 0,
        category_id: item.category_id || '',
        permalink: item.permalink || '',
        audit_result: item.status === 'paused' && item.shipping?.mode === 'me2' &&
          ['xd_drop_off', 'self_service'].includes(item.shipping?.logistic_type) && flex.has_flex === true &&
          (description.plain_text?.length || 0) >= 4000 ? 'success' : 'exception'
      });
      if (row.audit_result !== 'success') {
        row.audit_error = `终检：status=${row.status}, shipping=${row.shipping_mode}, logistic=${row.logistic_type}, flex=${row.flex}, description=${row.description_length}`;
      }
    } catch (error) {
      row.audit_result = 'exception';
      row.audit_error = error.message;
    }
  }));
}

rows.sort((a, b) => a.source_index - b.source_index);
const output = { generated_at: new Date().toISOString(), rows };
await fs.writeFile('.data/store2-final-audit.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({
  total: rows.length,
  success: rows.filter(r => r.audit_result === 'success').length,
  exception: rows.filter(r => r.audit_result === 'exception').length,
  with_id: rows.filter(r => r.id).length,
  no_flex: rows.filter(r => !r.flex).map(r => r.sku)
}, null, 2));
for (const row of rows.filter(r => r.audit_result !== 'success')) console.log(JSON.stringify(row));
