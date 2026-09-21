import { readFile } from "node:fs/promises";

import { apiRequest, validateItem } from "../src/meli.js";

const inputPath = process.argv[2];
if (!inputPath) {
  throw new Error("Usage: npm run publish -- path/to/item.json");
}

const item = JSON.parse(await readFile(inputPath, "utf8"));
validateItem(item);

if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify(item, null, 2));
  process.exit(0);
}

const created = await apiRequest("/items", { method: "POST", body: item });
console.log(JSON.stringify({ id: created.id, permalink: created.permalink, status: created.status }, null, 2));
