import fs from "node:fs/promises";

import { apiRequest } from "../src/meli.js";

const sku = "NW260682GRIMS1";
const sellerId = 3166000149;
const picture = JSON.parse(await fs.readFile(`.data/${sku}-picture.json`, "utf8"));
const description = await fs.readFile(`.data/${sku}-description.txt`, "utf8");
const input = {
  family_name: "Cama Elevada Para Perros Grande Gris Con 3 Apoyos Talla L",
  category_id: "MLC11060",
  price: 64990,
  currency_id: "CLP",
  available_quantity: 10,
  buying_mode: "buy_it_now",
  listing_type_id: "gold_special",
  condition: "new",
  pictures: [{ id: picture.id }],
  attributes: [
    { id: "BRAND", value_name: "Verci" },
    { id: "MODEL", value_name: "Cama elevada gris con 3 apoyos" },
    { id: "COLOR", value_name: "Gris" },
    { id: "CAT_AND_DOG_BED_SIZE", value_id: "3629987" },
    { id: "CAT_AND_DOG_BED_TYPE", value_name: "Cama elevada" },
    { id: "LENGTH", value_name: "83 cm" },
    { id: "WIDTH", value_name: "63 cm" },
    { id: "HEIGHT", value_name: "17 cm" },
    { id: "GTIN", value_name: "474070130965" },
    { id: "SELLER_SKU", value_name: sku },
    { id: "SELLER_PACKAGE_LENGTH", value_name: "80 cm" },
    { id: "SELLER_PACKAGE_WIDTH", value_name: "17 cm" },
    { id: "SELLER_PACKAGE_HEIGHT", value_name: "17 cm" },
    { id: "SELLER_PACKAGE_WEIGHT", value_name: "2100 g" }
  ],
  sale_terms: [
    { id: "WARRANTY_TYPE", value_id: "2230280" },
    { id: "WARRANTY_TIME", value_name: "30 días" }
  ],
  shipping: { mode: "me2", local_pick_up: false }
};

let previous = {};
try { previous = JSON.parse(await fs.readFile(`.data/${sku}-published.json`, "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
const search = previous.id ? { results: [previous.id] } : await apiRequest(`/users/${sellerId}/items/search?sku=${sku}`);
if (search.results?.length > 1) throw new Error(`${sku} has multiple items: ${search.results.join(", ")}`);
if (previous.id) {
  const recordedItem = await apiRequest(`/items/${previous.id}`);
  if (recordedItem.attributes?.find((attribute) => attribute.id === "SELLER_SKU")?.value_name !== sku) {
    throw new Error(`Recorded item ${previous.id} does not belong to ${sku}`);
  }
}
if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify({ sku, input, descriptionLength: description.length }, null, 2));
} else {
  let item;
  try {
    item = search.results?.length ? { id: search.results[0] } : await apiRequest("/items", { method: "POST", body: input });
  } catch (error) {
    const again = await apiRequest(`/users/${sellerId}/items/search?sku=${sku}`);
    if (again.results?.length !== 1) throw error;
    item = { id: again.results[0] };
  }
  const record = { sku, id: item.id, created_at: previous.created_at || new Date().toISOString(), price_source: "开发跟踪表", stage: "created" };
  await fs.writeFile(`.data/${sku}-published.json`, JSON.stringify(record, null, 2));
  try {
    await apiRequest(`/items/${item.id}`, { method: "PUT", body: { status: "paused" } });
    const paused = await apiRequest(`/items/${item.id}`);
    if (paused.status !== "paused") throw new Error(`status ${paused.status}`);
    record.stage = "paused";
    await fs.writeFile(`.data/${sku}-published.json`, JSON.stringify(record, null, 2));
    await apiRequest(`/items/${item.id}/description`, { method: "POST", body: { plain_text: description } });
    record.stage = "description_added";
    await fs.writeFile(`.data/${sku}-published.json`, JSON.stringify(record, null, 2));
    const endpoint = `/flex/sites/MLC/items/${item.id}/v2`;
    let flex = await apiRequest(endpoint);
    if (!flex.has_flex) {
      await apiRequest(endpoint, { method: "POST" });
      flex = await apiRequest(endpoint);
    }
    if (!flex.has_flex) throw new Error("Flex activation not verified");
    record.stage = "complete";
    await fs.writeFile(`.data/${sku}-published.json`, JSON.stringify(record, null, 2));
    let log = [];
    try { log = JSON.parse(await fs.readFile(".data/listing-log.json", "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
    if (!log.some((entry) => entry.sku === sku)) log.push(record);
    await fs.writeFile(".data/listing-log.json", JSON.stringify(log, null, 2));
    console.log(JSON.stringify({ id: item.id, sku, status: paused.status, price: paused.price, flex: flex.has_flex }));
  } catch (error) {
    throw new Error(`${sku} item ${item.id} stage=${record.stage}: ${error.message}`);
  }
}
