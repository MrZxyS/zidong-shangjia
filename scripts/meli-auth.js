import { createServer } from "node:http";
import { createHash, randomBytes } from "node:crypto";

import { AUTHORIZATION_URL, readConfig, requestToken, saveToken } from "../src/meli.js";

const LOCAL_HOST = "127.0.0.1";
const LOCAL_PORT = 8788;
const LOCAL_PATH = "/oauth/callback";

function base64url(value) {
  return value.toString("base64url");
}

const config = await readConfig();
const state = base64url(randomBytes(24));
const verifier = base64url(randomBytes(64));
const challenge = base64url(createHash("sha256").update(verifier).digest());
const authorizationUrl = new URL(AUTHORIZATION_URL);
authorizationUrl.search = new URLSearchParams({
  response_type: "code",
  client_id: config.clientId,
  redirect_uri: config.redirectUri,
  state,
  code_challenge: challenge,
  code_challenge_method: "S256"
}).toString();

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${LOCAL_HOST}:${LOCAL_PORT}`);
  if (url.pathname !== LOCAL_PATH) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  if (url.searchParams.get("state") !== state) {
    response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    response.end("Invalid OAuth state. Return to the terminal and restart authorization.");
    return;
  }
  const error = url.searchParams.get("error");
  const code = url.searchParams.get("code");
  if (error || !code) {
    response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    response.end(`Authorization failed: ${error || "missing code"}`);
    return;
  }

  try {
    const token = await requestToken({
      grant_type: "authorization_code",
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: config.redirectUri,
      code_verifier: verifier
    });
    await saveToken(token);
    response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    response.end("Mercado Libre authorization completed. You can close this tab.");
    console.log("Authorization completed. Token saved locally in .data/meli-token.json.");
    server.close();
  } catch (exchangeError) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end("Token exchange failed. Check the terminal for details.");
    console.error(exchangeError.message);
    server.close();
  }
});

server.listen(LOCAL_PORT, LOCAL_HOST, () => {
  console.log("Open this URL in the Mercado Libre owner account:\n");
  console.log(authorizationUrl.toString());
  console.log(`\nWaiting for the callback on http://${LOCAL_HOST}:${LOCAL_PORT}${LOCAL_PATH}`);
});
