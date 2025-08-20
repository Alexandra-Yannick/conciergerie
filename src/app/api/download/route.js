// src/app/api/download/route.js
import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadTokens";
import { readFile } from "fs/promises";
import path from "path";

// Normalise et interdit l'escape du dossier private/
function toPrivateFsPath(relPath) {
  // On force toujours sous "<racine>/private/..."
  const root = process.cwd();
  const clean = relPath.replace(/^\/+/, "");        // supprime / de tête
  const target = path.join(root, clean);            // /app/private/pdf/...
  const privateRoot = path.join(root, "private");   // /app/private
  if (!target.startsWith(privateRoot)) {
    throw new Error("Chemin interdit");
  }
  return target;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) return NextResponse.json({ error: "Token manquant" }, { status: 400 });

    // 1) Vérifie la signature + l’expiration + les champs attendus
    const payload = verifyDownloadToken(token); // { email, sku, filePath, iat, exp }

    // 2) Résout le chemin de fichier côté serveur
    const fsPath = toPrivateFsPath(payload.filePath); // ex: /app/private/pdf/module_4.pdf

    // 3) Lit en mémoire (ok pour des PDF). Pour de gros fichiers, préfère un stream.
    const file = await readFile(fsPath);

    // 4) Devine un nom propre pour la pièce jointe
    const filename = path.basename(fsPath);

    // 5) Répond avec les bons headers
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": inferMime(filename),
        "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
        "Cache-Control": "private, no-store", // pas de cache
      },
    });
  } catch (e) {
    console.error("Download error:", e);
    return NextResponse.json({ error: "Lien invalide ou expiré" }, { status: 403 });
  }
}

function inferMime(filename = "") {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "application/pdf";
  if (ext === "zip") return "application/zip";
  return "application/octet-stream";
}