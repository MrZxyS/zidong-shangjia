import fs from 'node:fs/promises';
import path from 'node:path';
import { apiRequest } from '../src/meli.js';

const recordPath = path.resolve('.data/new-safety-shoes/publish-record.json');
const auditPath = path.resolve('.data/new-safety-shoes/final-audit.json');
const record = JSON.parse(await fs.readFile(recordPath, 'utf8'));
const rows = [];

for (const [groupId, group] of Object.entries(record.groups)) {
  for (const [sku, source] of Object.entries(group.items)) {
    const item = await apiRequest(`/items/${source.id}?include_attributes=all`);
    const description = await apiRequest(`/items/${source.id}/description`);
    let flex = {};
    try { flex = await apiRequest(`/flex/sites/MLC/items/${source.id}/v2`); }
    catch (error) { flex = { has_flex: false, error: error.message }; }
    const attr = id => item.attributes?.find(attribute => attribute.id === id)?.value_name || '';
    const duplicateSearch = await apiRequest(`/users/3166000149/items/search?seller_sku=${encodeURIComponent(sku)}`);
    const checks = {
      sku: attr('SELLER_SKU') === sku,
      upc: attr('GTIN') === source.upc,
      size: attr('SIZE') === source.size,
      paused: item.status === 'paused',
      shipping: item.shipping?.mode === 'me2',
      flex: flex.has_flex === true,
      description: (description.plain_text?.length || 0) >= 4000,
      unique: (duplicateSearch.results || []).length === 1,
      family: item.family_name?.localeCompare(group.title, 'es', { sensitivity: 'base' }) === 0
    };
    const packageText = [
      attr('SELLER_PACKAGE_LENGTH'), attr('SELLER_PACKAGE_WIDTH'),
      attr('SELLER_PACKAGE_HEIGHT'), attr('SELLER_PACKAGE_WEIGHT')
    ].filter(Boolean).join(' x ');
    rows.push({
      group_id: groupId, group_title: group.title, model: groupId.includes('0549') ? '795' : groupId.includes('0550') ? '678' : groupId.includes('0551') ? '266' : '178',
      id: item.id, sku, upc: source.upc, size: source.size,
      color: attr('COLOR'), title: item.title, family_name: item.family_name,
      price: item.price, category_id: item.category_id, permalink: item.permalink,
      status: item.status, shipping_mode: item.shipping?.mode,
      flex: flex.has_flex === true, description_length: description.plain_text?.length || 0,
      package: packageText, package_estimated: true,
      checks, result: Object.values(checks).every(Boolean) ? 'success' : 'exception',
      exceptions: Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name)
    });
  }
}

const groupNames = new Set(rows.map(row => row.group_id));
const mlcIds = new Set(rows.map(row => row.id));
const skus = new Set(rows.map(row => row.sku));
const audit = {
  generated_at: new Date().toISOString(), seller_id: 3166000149, nickname: 'FURAXIS_CL',
  summary: {
    groups: groupNames.size, rows: rows.length, unique_mlc: mlcIds.size, unique_skus: skus.size,
    paused: rows.filter(row => row.status === 'paused').length,
    shipping_me2: rows.filter(row => row.shipping_mode === 'me2').length,
    flex_enabled: rows.filter(row => row.flex).length,
    descriptions_over_4000: rows.filter(row => row.description_length >= 4000).length,
    success: rows.filter(row => row.result === 'success').length,
    exceptions: rows.filter(row => row.result !== 'success').length
  }, rows
};

if (audit.summary.groups !== 6 || audit.summary.rows !== 34 || audit.summary.unique_mlc !== 34 ||
    audit.summary.unique_skus !== 34 || audit.summary.success !== 34) {
  throw new Error(`Final audit failed: ${JSON.stringify(audit.summary)}`);
}

await fs.writeFile(auditPath, `${JSON.stringify(audit, null, 2)}\n`);
record.result = 'success';
record.stage = 'complete';
delete record.error;
delete record.failed_at;
await fs.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(JSON.stringify(audit.summary, null, 2));
