const CALLBACK_PATH = "/callback";
const FORWARDED_PARAMS = ["code", "state", "error", "error_description"];

function textResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "text/plain; charset=utf-8",
      "referrer-policy": "no-referrer",
      "x-content-type-options": "nosniff"
    }
  });
}

export function createHandler(localCallbackUrl) {
  return async function handle(request) {
    const requestUrl = new URL(request.url);

    if (requestUrl.pathname === "/") {
      return textResponse("Furaxis Mercado Libre OAuth callback is ready.");
    }

    if (requestUrl.pathname !== CALLBACK_PATH) {
      return textResponse("Not found", 404);
    }

    const localUrl = new URL(localCallbackUrl);
    for (const name of FORWARDED_PARAMS) {
      const value = requestUrl.searchParams.get(name);
      if (value !== null) localUrl.searchParams.set(name, value);
    }

    if (!localUrl.searchParams.has("code") && !localUrl.searchParams.has("error")) {
      return textResponse("Missing OAuth result", 400);
    }

    return new Response(null, {
      status: 302,
      headers: {
        "cache-control": "no-store",
        location: localUrl.toString(),
        "referrer-policy": "no-referrer"
      }
    });
  };
}

export default {
  async fetch(request, env) {
    return createHandler(env.LOCAL_CALLBACK_URL)(request);
  }
};
