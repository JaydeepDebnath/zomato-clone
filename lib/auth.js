
function textToUint8Array(text) {
  return new TextEncoder().encode(text);
}

// Base64URL helpers
function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
}

// Create CryptoKey for signing/verifying
async function getKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");

  return crypto.subtle.importKey(
    "raw",
    textToUint8Array(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// -----------------------------
// SIGN JWT
// -----------------------------
export async function signJWT(payload, expiresIn = "1d") {
  const header = { alg: "HS256", typ: "JWT" };

  const exp = Math.floor(Date.now() / 1000) + parseExpiry(expiresIn);
  const data = { ...payload, exp };

  const encodedHeader = base64UrlEncode(textToUint8Array(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(textToUint8Array(JSON.stringify(data)));

  const key = await getKey();

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textToUint8Array(`${encodedHeader}.${encodedPayload}`)
  );

  return `${encodedHeader}.${encodedPayload}.${base64UrlEncode(signature)}`;
}

// Convert "1d" → seconds
function parseExpiry(exp) {
  const num = parseInt(exp);
  if (exp.endsWith("d")) return num * 86400;
  if (exp.endsWith("h")) return num * 3600;
  if (exp.endsWith("m")) return num * 60;
  return num;
}

// -----------------------------
// VERIFY JWT
// -----------------------------
export async function verifyJWT(token) {
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) throw new Error("Invalid token");

  const key = await getKey();

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlDecode(signature),
    textToUint8Array(`${header}.${payload}`)
  );

  if (!valid) throw new Error("Invalid token");

  const data = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));

  if (data.exp && data.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }

  return data;
}
