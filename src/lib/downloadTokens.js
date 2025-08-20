// src/lib/downloadTokens.js
import crypto from "crypto";

const APP_SECRET = process.env.APP_DOWNLOAD_SECRET;
const TTL_MIN = parseInt(process.env.APP_DOWNLOAD_TTL_MIN || "120", 10);

export function createDownloadToken({ email, sku, filePath, now = Date.now() }) {
  if (!APP_SECRET) throw new Error("APP_DOWNLOAD_SECRET manquant");
  const exp = now + TTL_MIN * 60 * 1000;
  const payload = JSON.stringify({ email, sku, filePath, exp });
  const sig = crypto.createHmac("sha256", APP_SECRET).update(payload).digest("hex");
  // token = base64url(payload) + '.' + sig
  const token = `${Buffer.from(payload).toString("base64url")}.${sig}`;
  return token;
}

export function verifyDownloadToken(token) {
  if (!APP_SECRET) throw new Error("APP_DOWNLOAD_SECRET manquant");
  const [b64, sig] = (token || "").split(".");
  if (!b64 || !sig) return { ok: false, reason: "format" };
  const payloadStr = Buffer.from(b64, "base64url").toString("utf8");
  const expectedSig = crypto.createHmac("sha256", APP_SECRET).update(payloadStr).digest("hex");
  if (expectedSig !== sig) return { ok: false, reason: "signature" };
  const payload = JSON.parse(payloadStr);
  if (!payload.exp || Date.now() > payload.exp) return { ok: false, reason: "expired" };
  return { ok: true, payload };
}