import { apiRequest } from "../src/meli.js";

const skus = ["NW260463AMAMS1", "NW260572NEGMS1"];
const importantPattern = /PACKAGE|WEIGHT|LENGTH|WIDTH|HEIGHT|VOLUME|CAPACITY|BATTER|VOLT|POWER|COMPOSITION|MATERIAL|UNIT|QUANTITY|HAZARD|FLAM|AEROSOL|SKU|BRAND|MODEL|GTIN/i;

async function scanSellerItems() {
  const ids = [];
  let scrollId;
  do {
    const suffix = scrollId ? `&scroll_id=${encodeURIComponent(scrollId)}` : "";
    const page = await apiRequest(`/users/3166000149/items/search?search_type=scan&limit=100${suffix}`);
    ids.push(...(page.results || []));
    scrollId = page.scroll_id;
    if (!(page.results || []).length) break;
  } while (scrollId && ids.length < 10000);
  return [...new Set(ids)];
}

function itemSkus(item) {
  const values = [item.seller_custom_field];
  for (const attribute of item.attributes || []) {
    if (attribute.id === "SELLER_SKU") values.push(attribute.value_name);
  }
  for (const variation of item.variations || []) {
    values.push(variation.seller_custom_field);
    for (const attribute of variation.attributes || []) {
      if (attribute.id === "SELLER_SKU") values.push(attribute.value_name);
    }
  }
  return values.filter(Boolean).map(String);
}

const scannedIds = await scanSellerItems();
const scannedItems = [];
for (let offset = 0; offset < scannedIds.length; offset += 20) {
  const batch = scannedIds.slice(offset, offset + 20);
  const responses = await apiRequest(`/items?ids=${batch.join(",")}&include_attributes=all`);
  for (const response of responses) {
    if (response.code === 200 && skus.some((sku) => itemSkus(response.body).includes(sku))) {
      scannedItems.push(response.body);
    }
  }
}

for (const sku of skus) {
  const found = await apiRequest(`/users/3166000149/items/search?sku=${encodeURIComponent(sku)}`);
  const ids = [...new Set([...(found.results || []), ...scannedItems.filter((item) => itemSkus(item).includes(sku)).map((item) => item.id)])];
  const items = [];
  for (const id of ids) {
    const item = await apiRequest(`/items/${id}?include_attributes=all`);
    const flex = await apiRequest(`/flex/sites/MLC/items/${id}/v2`).catch(() => ({}));
    const category = await apiRequest(`/categories/${item.category_id}`).catch(() => ({}));
    items.push({
      id: item.id,
      title: item.title,
      status: item.status,
      category_id: item.category_id,
      category_name: category.name,
      domain_id: item.domain_id,
      catalog_product_id: item.catalog_product_id,
      shipping: item.shipping,
      flex: flex.has_flex === true,
      tags: item.tags,
      sub_status: item.sub_status,
      attributes: (item.attributes || []).filter((attribute) => importantPattern.test(`${attribute.id} ${attribute.name}`))
        .map((attribute) => ({ id: attribute.id, name: attribute.name, value_id: attribute.value_id, value_name: attribute.value_name, tags: attribute.tags })),
    });
  }
  console.log(JSON.stringify({ sku, ids, items }, null, 2));
}
