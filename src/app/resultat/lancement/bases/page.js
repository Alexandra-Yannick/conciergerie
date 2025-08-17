import { Container, Card, Badge, Button } from "@/components/ui";

export const metadata = { title: "Lancement — Consolider vos bases" };

export default function Page({ searchParams }) {
  const score = Number(searchParams?.score ?? 0);
  const max   = Number(searchParams?.max ?? 20);
  const ratio = Math.round((score / (max || 1)) * 100);

  return (
    <Container className="mx-auto max-w-3xl p-6 space-y-8">
      {/* SCORE en gros */}
      <div className="text-center space-y-2">
        <p className="text-sm text-neutral-500">Votre score</p>
        <p className="text-5xl font-extrabold text-[var(--color-vivid)]">
          {score} / {max}
        </p>
        <p className="text-lg font-medium text-neutral-600">
          ({ratio}%)
        </p>
      </div>

      {/* Message principal */}
      <Card className="p-6 bg-white border text-center space-y-3">
        <h1 className="text-2xl font-bold">Reposez vos fondamentaux</h1>
        <p className="text-neutral-700">
          Tu as peut-être commencé un peu trop vite, sans cadre clair, et tu sens que tout repose sur toi. Pas de panique : tu peux reprendre les bases, poser les bons jalons et retrouver le contrôle. 
        </p>
      </Card>

      {/* MODULES RECOMMANDÉS */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center">Modules recommandés</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4 text-center border hover:shadow">
            <h3 className="font-semibold">Module 1</h3>
            <p className="text-sm text-neutral-600">Pour te réaligner avec le métier et ton rôle</p>
          </Card>
          <Card className="p-4 text-center border hover:shadow">
            <h3 className="font-semibold">Module 2</h3>
            <p className="text-sm text-neutral-600">Pour stabiliser légalement ton activité</p>
          </Card>
          <Card className="p-4 text-center border hover:shadow">
            <h3 className="font-semibold">Module 3</h3>
            <p className="text-sm text-neutral-600">Pour créer une stratégie d’acquisition durable</p>
          </Card>
           <Card className="p-4 text-center border hover:shadow">
            <h3 className="font-semibold">Dans ton cas, le pack complet est vivement conseillé. Il t’aidera à repartir sur des fondations solides sans avoir à tout recommencer.</h3>
          </Card>
        </div>
      </div>


      {/* CTA */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Button href="/quiz/lancement" variant="secondary">
          Voir les modules →
        </Button>
        <Button href="/#modules" variant="primary">
          Voir le pack complet →
        </Button>
      </div>
    </Container>
  );
}
