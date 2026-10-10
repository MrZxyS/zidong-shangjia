import fs from "node:fs/promises";
import { apiRequest } from "../src/meli.js";

const spec = JSON.parse(await fs.readFile(process.argv[2] || ".data/store2-spec-009.json", "utf8"));
const record = JSON.parse(await fs.readFile(`.data/${spec.sku}-published.json`, "utf8"));
const attributes = [
  { id: "BRAND", value_name: spec.brand || "Genérica" },
  { id: "MODEL", value_name: spec.model },
  { id: "GTIN", value_name: spec.upc },
  { id: "SELLER_SKU", value_name: spec.sku },
  { id: "SELLER_PACKAGE_LENGTH", value_name: `${spec.package.length_cm} cm` },
  { id: "SELLER_PACKAGE_WIDTH", value_name: `${spec.package.width_cm} cm` },
  { id: "SELLER_PACKAGE_HEIGHT", value_name: `${spec.package.height_cm} cm` },
  { id: "SELLER_PACKAGE_WEIGHT", value_name: `${spec.package.weight_g} g` },
  ...(spec.extra_attributes || []),
];

const result = await apiRequest("/items/validate", { method: "POST", body: {
  family_name: spec.title,
  category_id: spec.category_id,
  price: spec.price,
  currency_id: "CLP",
  available_quantity: spec.quantity ?? 10,
  buying_mode: "buy_it_now",
  listing_type_id: "gold_special",
  condition: "new",
  pictures: [{ id: record.picture_id }],
  attributes,
  sale_terms: [
    { id: "WARRANTY_TYPE", value_id: "2230280" },
    { id: "WARRANTY_TIME", value_name: "30 días" },
  ],
  shipping: { mode: "me2", local_pick_up: false },
}});

console.log(JSON.stringify(result, null, 2));
