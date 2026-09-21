import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export const API_BASE_URL = "https://api.mercadolibre.com";
export const AUTHORIZATION_URL = "https://auth.mercadolibre.cl/authorization";
export const TOKEN_PATH = path.resolve(".data", "meli-token.json");

export function loadEnv(text) {
  const values = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

export async function readConfig() {
  let fileValues = {};
  try {
    fileValues = loadEnv(await readFile(".env", "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const config = {
    clientId: process.env.MELI_CLIENT_ID || fileValues.MELI_CLIENT_ID,
    clientSecret: process.env.MELI_CLIENT_SECRET || fileValues.MELI_CLIENT_SECRET,
    redirectUri: process.env.MELI_REDIRECT_URI || fileValues.MELI_REDIRECT_URI
  };
  const missing = Object.entries(config)
    .filter(([, value]) => !value || value.startsWith("replace_"))
    .map(([key]) => key);
  if (missing.length) {
    throw new Error(`Missing configuration: ${missing.join(", ")}. Add it to .env.`);
  }
  return config;
}

export async function requestToken(parameters, fetchImpl = fetch) {
  const response = await fetchImpl(`${API_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(parameters)
  });
  const raw = await response.text();
  const body = raw ? JSON.parse(raw) : {};
  if (!response.ok) {
    throw new Error(`Mercado Libre token request failed (${response.status}): ${body.message || body.error}`);
  }
  return body;
}

export async function saveToken(token, tokenPath = TOKEN_PATH) {
  const stored = {
    ...token,
    obtained_at: Date.now(),
    expires_at: Date.now() + Number(token.expires_in || 0) * 1000
  };
  await mkdir(path.dirname(tokenPath), { recursive: true });
  const temporaryPath = `${tokenPath}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(stored, null, 2)}\n`, { mode: 0o600 });
  await rename(temporaryPath, tokenPath);
  return stored;
}

export async function readToken(tokenPath = TOKEN_PATH) {
  return JSON.parse(await readFile(tokenPath, "utf8"));
}

export function tokenNeedsRefresh(token, now = Date.now()) {
  return !token.access_token || !token.expires_at || token.expires_at - now < 60_000;
}

export async function getAccessToken({ fetchImpl = fetch, tokenPath = TOKEN_PATH } = {}) {
  let token = await readToken(tokenPath);
  if (!tokenNeedsRefresh(token)) return token.access_token;
  if (!token.refresh_token) throw new Error("The stored token cannot be refreshed. Run npm run auth again.");

  const config = await readConfig();
  token = await requestToken({
    grant_type: "refresh_token",
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: token.refresh_token
  }, fetchImpl);
  await saveToken(token, tokenPath);
  return token.access_token;
}

export async function apiRequest(resource, options = {}) {
  const accessToken = await getAccessToken(options);
  const response = await (options.fetchImpl || fetch)(`${API_BASE_URL}${resource}`, {
    method: options.method || "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(options.body ? { "content-type": "application/json" } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const raw = await response.text();
  const body = raw ? JSON.parse(raw) : {};
  if (!response.ok) {
    const detail = JSON.stringify(body);
    throw new Error(`Mercado Libre API request failed (${response.status}): ${detail}`);
  }
  return body;
}

export function validateItem(item) {
  const required = ["title", "category_id", "price", "currency_id", "available_quantity", "buying_mode", "listing_type_id", "condition"];
  const missing = required.filter((field) => item[field] === undefined || item[field] === "");
  if (missing.length) throw new Error(`Missing item fields: ${missing.join(", ")}`);
  if (!Array.isArray(item.pictures) || item.pictures.length === 0) {
    throw new Error("At least one public HTTPS picture URL is required.");
  }
  for (const picture of item.pictures) {
    if (!/^https:\/\//i.test(picture.source || "")) {
      throw new Error("Each picture.source must be a public HTTPS URL.");
    }
  }
}
