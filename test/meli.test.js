import assert from "node:assert/strict";
import test from "node:test";

import { loadEnv, tokenNeedsRefresh, validateItem } from "../src/meli.js";

test("loads simple and quoted env values", () => {
  assert.deepEqual(loadEnv("A=one\nB=\"two words\"\n# ignored\n"), { A: "one", B: "two words" });
});

test("refreshes missing or nearly expired tokens", () => {
  assert.equal(tokenNeedsRefresh({}, 1_000), true);
  assert.equal(tokenNeedsRefresh({ access_token: "ok", expires_at: 50_000 }, 1_000), true);
  assert.equal(tokenNeedsRefresh({ access_token: "ok", expires_at: 100_000 }, 1_000), false);
});

test("validates the minimum item payload", () => {
  const valid = {
    title: "Product", category_id: "MLC1", price: 1000, currency_id: "CLP",
    available_quantity: 1, buying_mode: "buy_it_now", listing_type_id: "gold_special",
    condition: "new", pictures: [{ source: "https://example.com/a.jpg" }]
  };
  assert.doesNotThrow(() => validateItem(valid));
  assert.throws(() => validateItem({ ...valid, pictures: [] }), /At least one/);
  assert.throws(() => validateItem({ ...valid, category_id: "" }), /category_id/);
});
