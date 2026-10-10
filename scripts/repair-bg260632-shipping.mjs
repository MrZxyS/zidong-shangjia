import fs from "node:fs/promises";
import path from "node:path";
import { apiRequest } from "../src/meli.js";

const itemId = "MLC2265344933";
const sku = "BG260632NEGMS1";
const logPath = path.resolve(".data", `${sku}-shipping-repair.json`);
const log = {
  item_id: itemId,
  sku,
  started_at: new Date().toISOString(),
  changes: {
    product_length: "100 in",
    product_weight: "2.8 kg",
    package_length: "71 cm",
    package_width: "16 cm",
    package_height: "12 cm",
    package_weight: "2800 g",
  },
  steps: [],
};

const save = async () => fs.writeFile(logPath, `${JSON.stringify(log, null, 2)}\n`);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const snapshot = (item) => ({
  status: item.status,
  shipping: item.shipping,
  attributes: (item.attributes || [])
    .filter((attribute) => [
      "LENGTH", "WEIGHT", "SELLER_PACKAGE_LENGTH", "SELLER_PACKAGE_WIDTH",
      "SELLER_PACKAGE_HEIGHT", "SELLER_PACKAGE_WEIGHT",
    ].includes(attribute.id))
    .map((attribute) => ({ id: attribute.id, value_name: attribute.value_name })),
});

let succeeded = false;
let finalError = "";
try {
  let item = await apiRequest(`/items/${itemId}?include_attributes=all`);
  log.before = snapshot(item);
  log.steps.push({ step: "read_before", at: new Date().toISOString(), result: "ok" });
  await save();

  await apiRequest(`/items/${itemId}`, { method: "PUT", body: {
    attributes: [
      { id: "LENGTH", value_name: "100 in" },
      { id: "WEIGHT", value_name: "2.8 kg" },
      { id: "SELLER_PACKAGE_LENGTH", value_name: "71 cm" },
      { id: "SELLER_PACKAGE_WIDTH", value_name: "16 cm" },
      { id: "SELLER_PACKAGE_HEIGHT", value_name: "12 cm" },
      { id: "SELLER_PACKAGE_WEIGHT", value_name: "2800 g" },
    ],
  }});
  log.steps.push({ step: "update_product_and_package_attributes", at: new Date().toISOString(), result: "ok" });
  await save();

  await sleep(1800);
  await apiRequest(`/items/${itemId}`, { method: "PUT", body: {
    shipping: { mode: "me2", local_pick_up: false, free_shipping: true },
  }});
  log.steps.push({ step: "request_me2_while_paused", at: new Date().toISOString(), result: "ok" });
  await save();

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    await sleep(1800);
    item = await apiRequest(`/items/${itemId}?include_attributes=all`);
    log.steps.push({
      step: "poll_me2",
      attempt,
      at: new Date().toISOString(),
      mode: item.shipping?.mode,
      logistic_type: item.shipping?.logistic_type,
      tags: item.shipping?.tags,
    });
    await save();
    if (item.shipping?.mode === "me2") break;
  }

  if (item.shipping?.mode !== "me2") {
    throw new Error(`Mercado Envíos remained ${item.shipping?.mode || "unknown"} after attribute repair`);
  }

  await apiRequest(`/items/${itemId}`, { method: "PUT", body: { status: "active" } });
  log.steps.push({ step: "temporarily_activate_for_flex", at: new Date().toISOString(), result: "ok" });
  await save();
  await sleep(1500);

  const flexEndpoint = `/flex/sites/MLC/items/${itemId}/v2`;
  let flex = await apiRequest(flexEndpoint);
  if (!flex.has_flex) {
    await apiRequest(flexEndpoint, { method: "POST" });
    log.steps.push({ step: "activate_flex", at: new Date().toISOString(), result: "requested" });
    await save();
  }
  for (let attempt = 1; attempt <= 8 && !flex.has_flex; attempt += 1) {
    await sleep(1500);
    flex = await apiRequest(flexEndpoint);
    log.steps.push({ step: "poll_flex", attempt, at: new Date().toISOString(), has_flex: flex.has_flex });
    await save();
  }
  if (!flex.has_flex) throw new Error("Flex remained disabled after ME2 activation");
  succeeded = true;
} catch (error) {
  finalError = error.message;
  log.steps.push({ step: "repair_failed", at: new Date().toISOString(), error: finalError });
  await save();
} finally {
  try {
    await apiRequest(`/items/${itemId}`, { method: "PUT", body: { status: "paused" } });
    log.steps.push({ step: "restore_paused", at: new Date().toISOString(), result: "ok" });
  } catch (error) {
    log.steps.push({ step: "restore_paused", at: new Date().toISOString(), result: "failed", error: error.message });
    if (!finalError) finalError = error.message;
    succeeded = false;
  }

  try {
    const [item, flex] = await Promise.all([
      apiRequest(`/items/${itemId}?include_attributes=all`),
      apiRequest(`/flex/sites/MLC/items/${itemId}/v2`),
    ]);
    log.after = { ...snapshot(item), flex: flex.has_flex === true };
    succeeded = succeeded && item.status === "paused" && item.shipping?.mode === "me2" && flex.has_flex === true;
    if (!succeeded && !finalError) finalError = "Final verification failed";
  } catch (error) {
    finalError = finalError || error.message;
    succeeded = false;
  }

  log.result = succeeded ? "success" : "failed";
  log.error = finalError;
  log.finished_at = new Date().toISOString();
  await save();
}

console.log(JSON.stringify(log, null, 2));
if (!succeeded) process.exitCode = 1;
