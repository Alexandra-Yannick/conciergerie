// src/app/api/verify-session/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CATALOG } from "@/lib/catalog";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");
    if (!session_id) return NextResponse.json({ error: "missing session_id" }, { status: 400 });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ paid: false });
    }

    const sku = session.metadata?.sku;
    const files = sku && CATALOG[sku]?.files ? CATALOG[sku].files : [];

    return NextResponse.json({
      paid: true,
      email: session.customer_details?.email ?? null,
      sku,
      files,
      product: sku ? CATALOG[sku]?.name : null,
    });
  } catch (err) {
    console.error("verify-session error", err);
    return NextResponse.json({ error: "verify failed" }, { status: 500 });
  }
}