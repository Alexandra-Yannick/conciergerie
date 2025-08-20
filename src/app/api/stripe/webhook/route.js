// src/app/api/stripe/webhook/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CATALOG } from "@/lib/catalog";


export const runtime = "nodejs"; // important pour raw body

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
    console.error("Webhook signature verification failed.", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Récupère SKU et email client
    const sku = session.metadata?.sku;
    const customerEmail = session.customer_details?.email;

    if (sku && CATALOG[sku] && customerEmail) {
      const files = CATALOG[sku].files;

      // TODO : ici tu peux :
      // 1) Envoyer un email via Brevo avec les liens de téléchargement
      // 2) Enregistrer la commande en base (si tu ajoutes une DB)
      // Pour l’instant on log :
      console.log("Paiement confirmé:", {
        email: customerEmail,
        sku,
        files,
      });
    }
  }

  return NextResponse.json({ received: true });
}

// Nécessaire pour avoir le raw body (Stripe)
export const config = {
  api: {
    bodyParser: false,
  },
};