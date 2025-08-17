import { Container, Card } from "@/components/ui";

export const metadata = { title: "Reconversion — Il est temps de mieux explorer" };

export default function Page({ searchParams }) {
  const score = Number(searchParams?.score ?? 0);
  const max = Number(searchParams?.max ?? 20);
  const pct = Math.max(0, Math.min(100, Math.round((score / (max || 1)) * 100)));

  return (
    <Container className="py-8 space-y-6">
      {/* Header score */}
      <Card className="p-5 bg-white border">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-extrabold">Votre résultat</h1>
          <span className="text-sm text-neutral-600">Score personnel</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="text-xl font-bold">{score} / {max}</div>
          <span className="text-sm text-neutral-600">{pct}%</span>
        </div>
        <div className="mt-3 h-2 w-full rounded bg-neutral-100">
          <div className="h-2 rounded" style={{ width: `${pct}%`, backgroundColor: "var(--color-vivid)" }} />
        </div>
      </Card>

      {/* Reco de contenu */}
      <Card className="p-5 bg-white border space-y-3">
        <h2 className="text-xl font-bold">Il est temps de mieux explorer</h2>
        <p className="text-neutral-700">Tu montres déjà plusieurs qualités utiles pour ce métier, mais certaines zones d’ombre subsistent.
Tu es curieux(se), motivé(e), mais tu as besoin de structurer ton projet pour ne pas te disperser.</p>
      </Card>

      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Module 1 : pour t’assurer que le métier correspond vraiment à ton profil</h3>
        <p className="text-sm text-neutral-700"><strong>Résumé :</strong> Posez des bases solides ! Statut, obligations, fiscalité, carte G, assurances…</p>
        <p className="text-sm text-neutral-700">Idéal pour partir sur des fondations solides sans stress administratif.</p>
      </Card>

      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Module 3 : pour apprendre à trouver tes premiers clients et structurer ta communication</h3>
        <p className="text-sm text-neutral-700"><strong>Résumé :</strong> Attirer vos premiers propriétaires et les garder.</p>
        <p className="text-sm text-neutral-700">Le module clé pour remplir et sécuriser votre agenda.</p>
      </Card>

      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Option futée : Le pack complet peut t’éviter de devoir revenir plus tard sur des aspects oubliés ou mal maîtrisés.</h3>
      </Card>

    </Container>
  );
}
