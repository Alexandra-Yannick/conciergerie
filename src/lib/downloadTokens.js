// src/lib/downloadTokens.js
import crypto from "crypto";

const SECRET = process.env.APP_DOWNLOAD_SECRET || "change-me";
const TTL_MIN = parseInt(process.env.APP_DOWNLOAD_TTL_MIN || "120", 10);

function b64url(input) {
  return Buffer.from(input).toString("base64url");
}
function hmac(data) {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function createDownloadToken({ email, sku, filePath }) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + TTL_MIN * 60;
  const payload = { email, sku, filePath, iat, exp };
  const header = { alg: "HS256", typ: "JWT" };

  const encHeader = b64url(JSON.stringify(header));
  const encPayload = b64url(JSON.stringify(payload));
  const sig = hmac(`${encHeader}.${encPayload}`);
  return `${encHeader}.${encPayload}.${sig}`;
}

export function verifyDownloadToken(token) {
  const [encHeader, encPayload, sig] = token.split(".");
  if (!encHeader || !encPayload || !sig) throw new Error("Malformed token");

  const good = hmac(`${encHeader}.${encPayload}`);
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) {
    throw new Error("Bad signature");
  }

  const payload = JSON.parse(Buffer.from(encPayload, "base64url").toString("utf8"));
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && now > payload.exp) throw new Error("Expired");
  return payload;
}