// src/app/api/checkout/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CATALOG } from "@/lib/catalog";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sku = searchParams.get("sku");

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY manquant côté serveur" },
        { status: 500 }
      );
    }
    if (!sku) {
      return NextResponse.json({ error: "sku manquant" }, { status: 400 });
    }

    const item = CATALOG[sku];
    if (!item) {
      return NextResponse.json({ error: `SKU inconnu: ${sku}` }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: item.price, // ex 39000
            product_data: {
              name: item.name,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/paiement/success?session_id={CHECKOUT_SESSION_ID}&sku=${encodeURIComponent(sku)}`,
      cancel_url: `${origin}/offre?cancelled=1`,
      allow_promotion_codes: true,
      metadata: { sku },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Erreur /api/checkout:", err);
    return NextResponse.json(
      { error: "Erreur Stripe côté serveur" },
      { status: 500 }
    );
  }
}

// Supporte aussi POST si tu veux
export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const url = new URL(req.url);
    url.searchParams.set("sku", body?.sku || "");
    return GET(new Request(url, { headers: req.headers }));
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}