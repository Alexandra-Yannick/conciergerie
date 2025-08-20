import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CATALOG } from "@/lib/catalog";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function getItemFromSku(sku) {
  return CATALOG?.[sku] || null;
}

async function createSession(req, sku) {
  try {
    if (!sku) {
      return NextResponse.json({ error: "sku manquant" }, { status: 400 });
    }
    const item = getItemFromSku(sku);
    if (!item) {
      return NextResponse.json({ error: `SKU inconnu: ${sku}` }, { status: 400 });
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // payment_method_types: ["card"], // optionnel
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: item.price, // ex: 39000 pour 390,00 €
            product_data: { name: item.name },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/paiement/success?session_id={CHECKOUT_SESSION_ID}&sku=${encodeURIComponent(sku)}`,
      cancel_url: `${origin}/offre?cancelled=1`,
      allow_promotion_codes: true,
      metadata: { sku }, // 👈 important
    });

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Erreur Stripe côté serveur" }, { status: 500 });
  }
}

export async function POST(req) {
  let sku = null;
  try {
    const body = await req.json();
    sku = body?.sku;
  } catch {}
  return createSession(req, sku);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sku = searchParams.get("sku");
  return createSession(req, sku);
}