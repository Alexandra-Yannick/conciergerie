import { Container, Card } from "@/components/ui";

export const metadata = { title: "Reconversion — Vous êtes sur la bonne voie" };

export default function Page({ searchParams }) {
  const score = Number(searchParams?.score ?? 0);
  const max = Number(searchParams?.max ?? 20);
  const pct = Math.max(0, Math.min(100, Math.round((score / (max || 1)) * 100)));

  return (
    <Container className="py-8 space-y-6">
      {/* En-tête score */}
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

      {/* Recommandations */}
      <Card className="p-5 bg-white border">
        <h2 className="text-xl font-bold">Module 1 — Se lancer en toute légalité</h2>
        <p className="text-sm text-neutral-700">
          <strong>Résumé :</strong> Posez des bases solides ! Statut, obligations, fiscalité, carte G, assurances…
          Tout ce qu’il faut savoir pour démarrer sereinement et en toute conformité.
        </p>
        <p className="text-sm text-neutral-700">
          Idéal pour partir sur des fondations solides sans stress administratif.
        </p>
      </Card>

      <Card className="p-5 bg-white border">
        <h2 className="text-xl font-bold">Module 3 — Trouver et fidéliser ses clients</h2>
        <p className="text-sm text-neutral-700">
          <strong>Résumé :</strong> Apprenez à attirer vos premiers propriétaires et à les garder sur le long terme.
          Stratégies locales, pitch, image de marque et astuces pour créer une clientèle fidèle.
        </p>
        <p className="text-sm text-neutral-700">Le module clé pour remplir et sécuriser votre agenda.</p>
      </Card>
    </Container>
  );
}
