// src/app/paiement/success/page.js
import Link from "next/link";

export const metadata = {
  title: "Paiement réussi",
  description: "Merci pour votre achat.",
};

export default function Page({ searchParams }) {
  const sessionId = searchParams?.session_id ?? "—";
  const sku = searchParams?.sku ?? "—";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-extrabold">Paiement réussi ✅</h1>
      <p className="mt-2 text-neutral-700">
        Merci pour votre achat. Nous préparons l’envoi de vos documents.
        Vous allez recevoir les modules par email. Pensez à vérifier vos spams.
      </p>


      <div className="mt-8">
        <Link
          href="/offre"
          className="inline-flex items-center rounded-xl bg-[var(--color-vivid)] px-4 py-2 text-sm font-semibold text-white"
        >
          Revenir aux offres
        </Link>
      </div>
    </div>
  );
}