import { Container, Card } from "@/components/ui";

export const metadata = { title: "Reconversion — Vous êtes sur la bonne voie" };

export default function Page({ searchParams }) {
  const score = Number(searchParams?.score ?? 0);
  const max = Number(searchParams?.max ?? 20);
  const pct = Math.max(0, Math.min(100, Math.round((score / (max || 1)) * 100)));

  return (
    <Container className="py-8 space-y-6">
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

      <Card className="p-5 bg-white border space-y-3">
        <h2 className="text-xl font-bold">Vous êtes sur la bonne voie</h2>
        <p className="text-neutral-700">Vous avez plusieurs compétences-clé.</p>
      </Card>

      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Module 1 — Se lancer en toute légalité</h3>
        <p className="text-sm text-neutral-700"><strong>Résumé :</strong> Statut, obligations, fiscalité, carte G, assurances…</p>
        <p className="text-sm text-neutral-700">Idéal pour des fondations solides.</p>
      </Card>

      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Module 3 — Trouver et fidéliser ses clients</h3>
        <p className="text-sm text-neutral-700"><strong>Résumé :</strong> Stratégies locales, pitch, image de marque.</p>
        <p className="text-sm text-neutral-700">Le module clé pour sécuriser l’agenda.</p>
      </Card>
    </Container>
  );
}
