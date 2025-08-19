// src/app/api/brevo/subscribe/route.js
import { NextResponse } from "next/server";

const LISTS = {
  "reconversion:0-9": 4,
  "reconversion:10-15": 5,
  "reconversion:16-20": 6,
  "lancement:0-9": 7,
  "lancement:10-15": 8,
  "lancement:16-20": 9,
};

function pickBucket(score) {
  if (!Number.isFinite(score)) return "0-9";
  if (score <= 9) return "0-9";
  if (score <= 15) return "10-15";
  return "16-20";
}

export async function POST(req) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "BREVO_API_KEY manquant côté serveur" },
        { status: 500 }
      );
    }

    // Tolère un body vide pour éviter les “Unexpected end of JSON input”
    const body = await req.json().catch(() => ({}));
    const { email, firstname, flow, score, max } = body || {};

    if (!email || !firstname) {
      return NextResponse.json(
        { ok: false, error: "firstname et email sont obligatoires" },
        { status: 400 }
      );
    }

    const bucket = pickBucket(Number(score));
    const key = `${(flow || "").toLowerCase()}:${bucket}`;
    const listId = LISTS[key];

    if (!listId) {
      return NextResponse.json(
        { ok: false, error: `Aucune liste Brevo pour la clé: ${key}` },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,                // ✅ bon header Brevo
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        attributes: {
          FIRSTNAME: firstname,
          FLOW: flow,
          SCORE: Number.isFinite(Number(score)) ? Number(score) : undefined,
          MAX: Number.isFinite(Number(max)) ? Number(max) : undefined,
        },
        listIds: [listId],
      }),
      cache: "no-store",
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    // Essaie de remonter une erreur claire (JSON ou texte)
    let detail = "";
    try {
      const errJson = await res.json();
      detail = errJson?.message || JSON.stringify(errJson);
    } catch {
      detail = await res.text();
    }
    return NextResponse.json(
      { ok: false, error: `Brevo: ${res.status} ${detail}` },
      { status: 502 }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Erreur inconnue" },
      { status: 500 }
    );
  }
}