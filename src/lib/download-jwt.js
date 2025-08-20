// src/lib/download-jwt.js
import jwt from "jsonwebtoken";

const SECRET = process.env.DOWNLOAD_JWT_SECRET;

export function signDownloadToken(payload, opts = { expiresIn: "48h" }) {
  // payload attendu : { file: "/pdf/...", email: "...", sku: "..." }
  return jwt.sign(payload, SECRET, opts);
}

export function verifyDownloadToken(token) {
  return jwt.verify(token, SECRET);
}