// src/app/api/stripe/webhook/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CATALOG } from "@/lib/catalog";
import { createDownloadToken } from "@/lib/downloadTokens";
import { sendLinksEmail } from "@/lib/brevo";

export const runtime = "nodejs";

export async function POST(req) {
  // 1) Vérif signature Stripe
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret || !webhookSecret) {
    console.error("❌ Variables d'env manquantes: STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  const stripe = new Stripe(stripeSecret);
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("❌ Signature invalide:", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // 2) On traite uniquement la confirmation de paiement
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const sku = session.metadata?.sku || null;
    const email =
      session.customer_details?.email ||
      session.customer_email ||
      null;

    if (!sku || !email) {
      console.warn("⚠️ Webhook: données manquantes (sku/email)", { sku, email });
      return NextResponse.json({ received: true });
    }

    const item = CATALOG[sku];
    if (!item) {
      console.warn("⚠️ Webhook: SKU inconnu", sku);
      return NextResponse.json({ received: true });
    }

    // 3) Construire des liens signés temporaires vers /api/download
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    const files = Array.isArray(item.files) ? item.files : [];
    const links = files.map((filePath) => {
      const token = createDownloadToken({ email, sku, filePath });
      const url = `${origin}/api/download?token=${encodeURIComponent(token)}`;
      return { filePath, url };
    });

    // 4) Composer l’email HTML
    const ttlMin = Number(process.env.APP_DOWNLOAD_TTL_MIN || 120); // utilisé par createDownloadToken
    const subject = `Vos accès — ${item.name}`;
    const listItems = links
      .map(
        (l) =>
          `<li><a href="${l.url}" target="_blank" rel="noopener">Télécharger : ${escapeHtml(
            basename(l.filePath)
          )}</a></li>`
      )
      .join("");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,sans-serif;line-height:1.55">
        <p>Bonjour,</p>
        <p>Merci pour votre achat <strong>${escapeHtml(item.name)}</strong>.</p>
        <p>Voici vos liens de téléchargement (valides ${ttlMin} minutes) :</p>
        <ul>${listItems}</ul>
        <p>Si un lien a expiré, répondez simplement à ce message — nous vous renverrons de nouveaux liens.</p>
        <p>— Cap Conciergerie</p>
      </div>
    `;

    // 5) Envoi via Brevo (ne bloque pas le webhook en cas d’échec)
    try {
      await sendLinksEmail({
        toEmail: email,
        subject,
        html,
      });
      console.log("✉️ Email envoyé à", email, "pour", sku);
    } catch (err) {
      console.error("❌ Erreur envoi Brevo:", err);
      // On n'échoue pas le webhook (Stripe réessaierait → risque de spam).
    }
  }

  return NextResponse.json({ received: true });
}

/* ------------------------ helpers locaux (safe HTML) ------------------------ */
function basename(path) {
  try {
    return path.split("/").filter(Boolean).pop() || path;
  } catch {
    return path;
  }
}

function escapeHtml(s = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}