export const metadata = { title: "Reconversion — Vous êtes prêt(e) à foncer !" };

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-extrabold">Vous êtes prêt(e) à foncer !</h1>
      <p className="text-neutral-700">Faculté d’organisation et motivation solides.</p>

      <section className="rounded-2xl border p-5 space-y-3 bg-white">
        <h2 className="text-xl font-bold">Module 1 — Se lancer en toute légalité</h2>
        <p className="text-sm text-neutral-700">
          <strong>Résumé :</strong> Posez des bases solides ! Statut, obligations, fiscalité, carte G, assurances…
          Tout ce qu’il faut savoir pour démarrer sereinement et en toute conformité.
        </p>
        <p className="text-sm text-neutral-700">
          Idéal pour partir sur des fondations solides sans stress administratif.
        </p>
      </section>

      <section className="rounded-2xl border p-5 space-y-3 bg-white">
        <h2 className="text-xl font-bold">Module 2 — Construire une offre rentable et pro</h2>
        <p className="text-sm text-neutral-700">
          <strong>Résumé :</strong> Clarifiez vos prestations, créez des packs attractifs et fixez des tarifs justes.
          Une offre claire vous rend crédible et vous aide à maximiser vos revenus.
        </p>
        <p className="text-sm text-neutral-700">
          Pour apprendre à vendre vos services de façon simple et efficace.
        </p>
      </section>
    </main>
  );
}
