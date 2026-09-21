import assert from "node:assert/strict";
import test from "node:test";

import { createHandler } from "../src/index.js";

const handle = createHandler("http://127.0.0.1:8788/oauth/callback");

test("reports readiness without exposing credentials", async () => {
  const response = await handle(new Request("https://worker.example/"));

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "Furaxis Mercado Libre OAuth callback is ready.");
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("forwards the OAuth result to the fixed local callback", async () => {
  const response = await handle(
    new Request("https://worker.example/callback?code=abc123&state=state456&ignored=secret")
  );

  assert.equal(response.status, 302);
  assert.equal(
    response.headers.get("location"),
    "http://127.0.0.1:8788/oauth/callback?code=abc123&state=state456"
  );
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("rejects callback requests without an OAuth result", async () => {
  const response = await handle(new Request("https://worker.example/callback?state=state456"));

  assert.equal(response.status, 400);
  assert.equal(await response.text(), "Missing OAuth result");
});

test("returns 404 for unrelated paths", async () => {
  const response = await handle(new Request("https://worker.example/other"));

  assert.equal(response.status, 404);
});
