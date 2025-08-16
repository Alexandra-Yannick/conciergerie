export default function ResultPage({ searchParams }) {
  const result = searchParams?.resultId ?? "inconnu";
  const flow = searchParams?.flow ?? "—";

  const label =
    result === "pack_pro"
      ? "Pack PRO (accompagnement avancé)"
      : result === "pack_basic"
      ? "Pack BASIC (démarrage guidé)"
      : "À préciser";

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Votre résultat</h1>
      <p className="text-gray-700">
        Flux choisi : <strong className="capitalize">{flow}</strong>
      </p>
      <div className="rounded-lg border p-4">
        <p className="text-lg">
          Pack recommandé : <strong>{label}</strong>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          (Étape suivante : bouton de paiement Stripe selon le pack)
        </p>
      </div>
    </main>
  );
}
