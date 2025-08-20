// src/lib/brevo.js
const API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
const SENDER_NAME = process.env.BREVO_SENDER_NAME || "Cap Conciergerie";
const BREVO_BASE = "https://api.brevo.com/v3";

export async function sendLinksEmail({ toEmail, subject, html }) {
  if (!API_KEY) throw new Error("BREVO_API_KEY manquant");
  const res = await fetch(`${BREVO_BASE}/smtp/email`, {
    method: "POST",
    headers: {
      "api-key": API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: SENDER_EMAIL, name: SENDER_NAME },
      to: [{ email: toEmail }],
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Brevo error ${res.status}: ${t}`);
  }
  return res.json();
}