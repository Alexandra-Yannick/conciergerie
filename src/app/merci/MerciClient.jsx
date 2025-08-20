// src/app/merci/MerciClient.jsx
"use client";

import { useSearchParams } from "next/navigation";

export default function MerciClient() {
  const sp = useSearchParams();
  const email = sp.get("email") || "";
  const sku = sp.get("sku") || "";

  return (
    <div className="p-6 bg-white rounded-2xl border">
      <h1 className="text-xl font-bold">Merci 🙌</h1>
      <p className="mt-2 text-neutral-700">
        Votre paiement a bien été pris en compte.
        {email ? <> Un email a été envoyé à <strong>{email}</strong>.</> : null}
      </p>
      {sku ? <p className="mt-2 text-sm text-neutral-600">Produit : {sku}</p> : null}
    </div>
  );
}