// src/app/api/stripe/webhook/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CATALOG } from "@/lib/catalog";
import { createDownloadToken } from "@/lib/downloadTokens";
import { sendLinksEmail } from "@/lib/brevo";

export const runtime = "nodejs";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Signature invalide:", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sku = session.metadata?.sku;
    const email = session.customer_details?.email;

    if (!sku || !CATALOG[sku] || !email) {
      console.warn("Données manquantes pour l’email:", { sku, email });
      return NextResponse.json({ received: true });
    }

    const files = CATALOG[sku].files || [];
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    // Crée des liens signés
    const links = files.map((filePath) => {
      const token = createDownloadToken({ email, sku, filePath });
      const url = `${origin}/api/download?token=${encodeURIComponent(token)}`;
      return { filePath, url };
    });

    // Compose l’email (simple HTML)
    const title = `Vos accès — ${CATALOG[sku].name}`;
    const listItems = links
      .map(
        (l) =>
          `<li><a href="${l.url}" target="_blank" rel="noopener">Télécharger : ${escapeHtml(
            basename(l.filePath)
          )}</a></li>`
      )
      .join("");

    const html = `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height:1.5;">
        <p>Bonjour,</p>
        <p>Merci pour votre achat <strong>${escapeHtml(CATALOG[sku].name)}</strong>.</p>
        <p>Voici vos liens de téléchargement (valables ${process.env.APP_DOWNLOAD_TTL_MIN || 120} minutes) :</p>
        <ul>${listItems}</ul>
        <p>Si le lien expire, répondez à cet email — nous vous renverrons de nouveaux liens.</p>
        <p>— Cap Conciergerie</p>
      </div>
    `;

    try {
      await sendLinksEmail({
        toEmail: email,
        subject: title,
        html,
      });
      console.log("✉️ Email envoyé à", email, "pour", sku);
    } catch (e) {
      console.error("Erreur Brevo:", e);
      // On n’échoue pas le webhook si l’email tombe — Stripe réessayerait et ça peut spammer.
    }
  }

  return NextResponse.json({ received: true });
}

// helpers
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