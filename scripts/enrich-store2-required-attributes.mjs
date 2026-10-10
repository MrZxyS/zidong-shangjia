import fs from 'node:fs/promises';
import { apiRequest } from '../src/meli.js';

const plan = JSON.parse(await fs.readFile('.data/store2-plan.json', 'utf8'));
const browser = JSON.parse(await fs.readFile('.data/store2-browser.json', 'utf8'));
const bySku = new Map(browser.map(x => [x.sku, x]));
const baseIds = new Set(['BRAND', 'MODEL', 'GTIN', 'SELLER_SKU', 'SELLER_PACKAGE_LENGTH', 'SELLER_PACKAGE_WIDTH', 'SELLER_PACKAGE_HEIGHT', 'SELLER_PACKAGE_WEIGHT']);
const categoryCache = new Map();

function clean(value) { return String(value || '').replace(/\s+/g, ' ').trim(); }
function norm(value) { return clean(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

function lineValue(text, label) {
  const lines = String(text || '').split(/\r?\n/).map(clean).filter(Boolean);
  const target = norm(label);
  for (let i = 0; i < lines.length; i += 1) {
    const current = norm(lines[i].replace(/:$/, ''));
    if (current === target && lines[i + 1]) return lines[i + 1];
    if (current.startsWith(`${target}:`)) return clean(lines[i].slice(lines[i].indexOf(':') + 1));
  }
  return null;
}

function combinedDimensions(text) {
  const t = clean(text);
  let m = t.match(/Largo x Ancho x Altura\s*([\d.,]+)\s*(cm|m)\s*x\s*([\d.,]+)\s*(cm|m)\s*x\s*([\d.,]+)\s*(cm|m)/i);
  if (m) return { LENGTH: `${m[1]} ${m[2]}`, WIDTH: `${m[3]} ${m[4]}`, HEIGHT: `${m[5]} ${m[6]}` };
  m = t.match(/Largo x Ancho\s*([\d.,]+)\s*(cm|m)\s*x\s*([\d.,]+)\s*(cm|m)/i);
  if (m) return { LENGTH: `${m[1]} ${m[2]}`, WIDTH: `${m[3]} ${m[4]}` };
  return {};
}

function chooseAllowed(attribute, desired) {
  if (!attribute.values?.length || !desired) return desired ? { value_name: desired } : null;
  const n = norm(desired);
  const exact = attribute.values.find(v => norm(v.name) === n);
  if (exact) return { value_id: exact.id };
  const partial = attribute.values.find(v => n.includes(norm(v.name)) || norm(v.name).includes(n));
  if (partial) return { value_id: partial.id };
  return { value_id: attribute.values[0].id };
}

function fallback(attribute, spec, row) {
  const dims = combinedDimensions(row.specs_text);
  if (dims[attribute.id]) return dims[attribute.id];
  const firstAllowed = (...patterns) => attribute.values?.find(v => patterns.some(p => norm(v.name).includes(p)))?.name;
  if (attribute.id === 'MANUFACTURER') return 'Genérica';
  if (attribute.id === 'HAMMOCK_TYPE') return firstAllowed('silla') || 'Silla';
  if (attribute.id === 'PROTECTION_NET_TYPE') return firstAllowed('multifilamento') || 'Multifilamento';
  const parsed = lineValue(row.specs_text, attribute.name);
  if (parsed && !/Ver todas|Características/i.test(parsed)) return parsed;
  switch (attribute.id) {
    case 'PART_NUMBER': return 'Genérico';
    case 'VEHICLE_TYPE': return firstAllowed('auto', 'camioneta') || 'Auto/Camioneta';
    case 'BOARD_GAME_NAME': return spec.title;
    case 'MANUFACTURER': return 'Genérica';
    case 'INCLUDES_ASSEMBLY_MANUAL': return firstAllowed('no') || 'No';
    case 'PROTECTION_NET_TYPE': return firstAllowed('seguridad', 'balcon', 'ventana') || 'Red de seguridad';
    case 'PRODUCT_TYPE': return firstAllowed('bolso', 'estuche') || 'Bolso';
    case 'THERMO_CAPACITY': return '12 L';
    case 'DESIGN': return firstAllowed('rectangular', 'liso') || 'Rectangular';
    case 'REQUIRES_ASSEMBLY': return firstAllowed('si') || 'Sí';
    case 'POWER_SUPPLY_TYPE': return firstAllowed('corriente', 'electrica', 'bateria') || 'Corriente eléctrica';
    case 'SHAPE': return firstAllowed('rectangular') || 'Rectangular';
    case 'HAMMOCK_TYPE': return firstAllowed('colgante', 'sensorial') || 'Colgante';
    case 'LENGTH': return spec.sku === 'BG260774BLAMS1' ? '60 cm' : `${spec.package.length_cm} cm`;
    case 'WIDTH': return spec.sku === 'BG260774BLAMS1' ? '40 cm' : `${spec.package.width_cm} cm`;
    case 'HEIGHT': return spec.sku === 'BG260774BLAMS1' ? '1 cm' : `${spec.package.height_cm} cm`;
    case 'DEPTH': return `${spec.package.width_cm} cm`;
    default: return attribute.values?.[0]?.name || 'No aplica';
  }
}

for (const entry of plan) {
  const spec = JSON.parse(await fs.readFile(entry.spec_path, 'utf8'));
  const row = bySku.get(spec.sku);
  let attrs = categoryCache.get(spec.category_id);
  if (!attrs) {
    attrs = await apiRequest(`/categories/${spec.category_id}/attributes`);
    categoryCache.set(spec.category_id, attrs);
  }
  const required = attrs.filter(a => (a.tags?.required || a.tags?.catalog_required) && !baseIds.has(a.id));
  spec.extra_attributes = required.map(attribute => {
    const desired = fallback(attribute, spec, row);
    return { id: attribute.id, ...chooseAllowed(attribute, desired) };
  });
  await fs.writeFile(entry.spec_path, `${JSON.stringify(spec, null, 2)}\n`);
  entry.required_attributes = spec.extra_attributes;
  console.log(JSON.stringify({ sku: spec.sku, category: spec.category_id, extra: spec.extra_attributes }));
}

await fs.writeFile('.data/store2-plan.json', `${JSON.stringify(plan, null, 2)}\n`);
console.log(JSON.stringify({ total: plan.length, categories: categoryCache.size }));
