// src/app/api/download/route.js
import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadTokens";
import { CATALOG } from "@/lib/catalog";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const check = verifyDownloadToken(token);

  if (!check.ok) {
    return NextResponse.json({ error: "Lien invalide ou expiré." }, { status: 400 });
  }

  const { sku, filePath } = check.payload;
  const item = CATALOG[sku];
  if (!item || !item.files?.includes(filePath)) {
    return NextResponse.json({ error: "Ressource inconnue." }, { status: 404 });
  }

  // Ici on redirige vers un fichier statique dans /public
  // Exemple: /public/pdf/modules/Module-1.pdf => /pdf/modules/Module-1.pdf
  return NextResponse.redirect(new URL(filePath, req.url));
}