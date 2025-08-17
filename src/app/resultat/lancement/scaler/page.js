import { Container, Card, Badge, Button } from "@/components/ui";

export const metadata = { title: "Lancement — Prêt à scaler" };

export default function Page({ searchParams }) {
  const score = Number(searchParams?.score ?? 0);
  const max   = Number(searchParams?.max ?? 20);
  const ratio = Math.round((score / (max || 1)) * 100);

  return (
    <Container className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Vous êtes prêt(e) à scaler</h1>
        <Badge bg="var(--color-light)" fg="var(--color-dark)">
          Score&nbsp;: <strong className="ml-1">{score}</strong> / {max} ({ratio}%)
        </Badge>
      </div>

      <Card className="p-5 bg-white border">
        <p className="text-neutral-700">
          Belle maturité. Il est temps d’optimiser la <strong>rentabilité</strong>, de sécuriser la <strong>qualité</strong> avec de la délégation,
          et d’industrialiser l’<strong>acquisition</strong>.
        </p>
      </Card>

      <Card className="p-5 bg-white border">
        <h2 className="text-xl font-bold">Vos priorités maintenant</h2>
        <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
          <li>Suivre vos <strong>marges</strong> par prestation et ajuster les prix/options.</li>
          <li>Formaliser les <strong>SOP</strong> + contrôles qualité pour déléguer sereinement.</li>
          <li>Industrialiser 2–3 canaux d’<strong>acquisition</strong> (routine hebdo + CRM léger).</li>
        </ul>
      </Card>

      <Card className="p-5 bg-white border">
        <h3 className="font-semibold">Prochaines étapes concrètes (15 jours)</h3>
        <ol className="mt-2 list-decimal pl-5 text-neutral-700 space-y-1">
          <li>Bâtir un tableau marge par mission (temps, coût, prix → % marge).</li>
          <li>Écrire 5 SOP clés + un check qualité (ménage, clés, urgence, litige, onboarding).</li>
          <li>Mettre en place un suivi pipeline (contacts, relances, rdv, signature).</li>
        </ol>
      </Card>

      <div className="grid sm:grid-cols-2 gap-3">
        <Button href="/quiz/lancement" variant="secondary">Refaire le test</Button>
        <Button href="/">Voir le pack recommandé</Button>
      </div>
    </Container>
  );
}
