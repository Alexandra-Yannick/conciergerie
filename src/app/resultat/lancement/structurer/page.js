import { Container, Card, Badge, Button } from "@/components/ui";

export const metadata = { title: "Lancement — Structurer l’offre & 1ers clients" };

export default function Page({ searchParams }) {
  const score = Number(searchParams?.score ?? 0);
  const max   = Number(searchParams?.max ?? 20);
  const ratio = Math.round((score / (max || 1)) * 100);

  return (
    <Container className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Structurer l’offre & vos premiers clients</h1>
        <Badge bg="var(--color-light)" fg="var(--color-dark)">
          Score&nbsp;: <strong className="ml-1">{score}</strong> / {max} ({ratio}%)
        </Badge>
      </div>

      <Card className="p-5 bg-white border">
        <p className="text-neutral-700">
          Vous êtes sur la bonne voie. Il faut maintenant <strong>packager l’offre</strong>, clarifier vos <strong>prix</strong> et enclencher un
          <strong> rythme d’acquisition</strong> simple mais régulier.
        </p>
      </Card>

      <Card className="p-5 bg-white border">
        <h2 className="text-xl font-bold">Vos priorités maintenant</h2>
        <ul className="mt-3 list-disc pl-5 text-neutral-700 space-y-1">
          <li>Créer 2–3 <strong>packs</strong> (Essentiel/Plus/Premium) avec livrables & SLA clairs.</li>
          <li>Établir des <strong>tarifs justifiés</strong> (coûts, marge cible, options).</li>
          <li>Lancer 2 canaux d’<strong>acquisition</strong> (prospection locale + partenariats agents).</li>
        </ul>
      </Card>

      <Card className="p-5 bg-white border">
        <h3 className="font-semibold">Prochaines étapes concrètes (10 jours)</h3>
        <ol className="mt-2 list-decimal pl-5 text-neutral-700 space-y-1">
          <li>Écrire une page “offre” (PDF 8–10p) : packs, process, témoignages, conditions.</li>
          <li>Définir un script de pitch propriétaire (2 minutes) + un email de suivi.</li>
          <li>Fixer un <strong>quota hebdo</strong> : 10 prises de contact + suivi dans un tableau simple.</li>
        </ol>
      </Card>

      <div className="grid sm:grid-cols-2 gap-3">
        <Button href="/quiz/lancement" variant="secondary">Refaire le test</Button>
        <Button href="/">Voir le pack recommandé</Button>
      </div>
    </Container>
  );
}
