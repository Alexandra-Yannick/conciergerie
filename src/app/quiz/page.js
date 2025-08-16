import { Container, Card, Badge, Button } from "@/components/ui";

export const metadata = { title: "Cap Conciergerie — Lancez-vous" };

export default function HomePage() {
  return (
    <Container className="py-12 space-y-8">
      {/* Hero */}
      <div>
        <Badge className="mb-4" bg="var(--color-pastel)">Pack Conciergerie • Édition lancement</Badge>
        <h1 className="text-4xl/tight font-extrabold">Faites le test et découvrez par où commencer</h1>
        <p className="mt-3 text-neutral-700 max-w-2xl">
          Un questionnaire rapide pour situer votre niveau, puis des recommandations concrètes
          (modules & étapes) pour avancer tout de suite.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => location.assign("/quiz")}>Commencer le questionnaire</Button>
          <Button variant="secondary" onClick={() => location.assign("/quiz/reconversion")}>Je débute</Button>
        </div>
      </div>

      {/* Arguments */}
      <div className="grid md:grid-cols-3 gap-5">
        <Card className="p-5 bg-white border">
          <h3 className="font-semibold">Pensé pour la reconversion</h3>
          <p className="mt-2 text-sm text-neutral-700">Simple, guidé, orienté action. Zéro jargon inutile.</p>
        </Card>
        <Card className="p-5 bg-white border">
          <h3 className="font-semibold">Recommandations personnalisées</h3>
          <p className="mt-2 text-sm text-neutral-700">Selon votre score, on vous propose les étapes prioritaires.</p>
        </Card>
        <Card className="p-5 bg-white border">
          <h3 className="font-semibold">Modules prêts à l’emploi</h3>
          <p className="mt-2 text-sm text-neutral-700">Des supports concrets à activer quand vous êtes prêt(e).</p>
        </Card>
      </div>
    </Container>
  );
}
