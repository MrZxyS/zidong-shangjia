import { readFile, writeFile } from "node:fs/promises";

import { apiRequest } from "../src/meli.js";

const sku = "NW260684NEGMS1";
const sellerId = 3166000149;
const recordPath = ".data/NW260684NEGMS1-published.json";
const { id: pictureId } = JSON.parse(await readFile(".data/NW260684NEGMS1-picture.json", "utf8"));

const existing = await apiRequest(`/users/${sellerId}/items/search?sku=${sku}`);
if (existing.results?.length) {
  throw new Error(`SKU ${sku} already exists: ${existing.results.join(", ")}`);
}

const title = "Set 6 Piezas Brocas Escalonadas Imperiales Con Estuche";
const item = {
  family_name: title,
  category_id: "MLC372115",
  price: 23990,
  currency_id: "CLP",
  available_quantity: 10,
  buying_mode: "buy_it_now",
  listing_type_id: "gold_special",
  condition: "new",
  pictures: [{ id: pictureId }],
  attributes: [
    { id: "BRAND", value_name: "Verci" },
    { id: "MODEL", value_name: "Brocas escalonadas imperiales 6 piezas" },
    { id: "DRILL_BIT_TYPE", value_id: "2532393" },
    { id: "UNITS_PER_PACK", value_name: "5" },
    { id: "IS_KIT", value_id: "242085" },
    { id: "GTIN", value_name: "474070130958" },
    { id: "SELLER_SKU", value_name: sku },
    { id: "SELLER_PACKAGE_LENGTH", value_name: "15 cm" },
    { id: "SELLER_PACKAGE_WIDTH", value_name: "13 cm" },
    { id: "SELLER_PACKAGE_HEIGHT", value_name: "4 cm" },
    { id: "SELLER_PACKAGE_WEIGHT", value_name: "570 g" }
  ],
  sale_terms: [
    { id: "WARRANTY_TYPE", value_id: "2230280" },
    { id: "WARRANTY_TIME", value_name: "30 días" }
  ],
  shipping: { mode: "me2", local_pick_up: false }
};

const description = `Bienvenido a Furaxis.

Set de 6 piezas para perforación y ampliación de orificios: cinco brocas escalonadas de medidas imperiales y un punzón de marcación, presentados en un estuche de aluminio.

Características principales
- Brocas escalonadas para trabajos de perforación con distintas medidas.
- Estuche para guardar y organizar las piezas.
- Incluye cinco brocas y un punzón de marcación.

Especificaciones
- Contenido: 6 piezas en total (5 brocas y 1 punzón).
- Formato de medidas: imperial.
- Presentación: estuche de aluminio.
- Medidas declaradas para envío: 15 x 13 x 4 cm (ancho medido: 12,5 cm, redondeado al centímetro superior).
- Peso del paquete: 570 g.

Preguntas frecuentes
¿Incluye el estuche? Sí, el set se presenta en un estuche de aluminio.
¿Son seis brocas? No. Son cinco brocas escalonadas y un punzón de marcación.

Garantía del vendedor: 30 días.

También podrías buscar: brocas escalonadas, broca cónica, set de brocas imperiales, brocas con estuche.`;

if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify({ sku, item, description }, null, 2));
} else {

let created;
try {
  created = await apiRequest("/items", { method: "POST", body: item });
  await writeFile(recordPath, JSON.stringify({ sku, id: created.id, permalink: created.permalink, status: created.status, created_at: new Date().toISOString() }, null, 2));
} catch (error) {
  // Resolve ambiguous network failures by checking the seller SKU before retrying.
  const after = await apiRequest(`/users/${sellerId}/items/search?sku=${sku}`);
  if (after.results?.length !== 1) throw error;
  created = { id: after.results[0] };
  await writeFile(recordPath, JSON.stringify({ sku, id: created.id, status: "pause_pending", created_at: new Date().toISOString() }, null, 2));
}

const id = created.id;
let paused;
try {
  await apiRequest(`/items/${id}`, { method: "PUT", body: { status: "paused" } });
  paused = await apiRequest(`/items/${id}`);
  if (paused.status !== "paused") throw new Error(`Item ${id} status is ${paused.status}, expected paused`);
  await writeFile(recordPath, JSON.stringify({ sku, id, permalink: paused.permalink, status: paused.status, created_at: new Date().toISOString() }, null, 2));
} catch (error) {
  throw new Error(`Item ${id} was created but could not be verified as paused: ${error.message}`);
}

await apiRequest(`/items/${id}/description`, { method: "POST", body: { plain_text: description } });
console.log(JSON.stringify({ sku, id, permalink: paused.permalink, status: paused.status, price: paused.price, listing_type_id: paused.listing_type_id, shipping: paused.shipping, description_added: true }, null, 2));
}
