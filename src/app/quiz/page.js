
// src/app/quiz/page.js (Server Component)
import { Container, Card, Button, Badge, colors } from "@/components/ui";
import { Compass, ArrowRight, Info, Sparkles, Clock } from "lucide-react";

export const metadata = {
  title: "Quiz — Êtes-vous fait pour la conciergerie locative ?",
  description:
    "Faites le test en 2–3 minutes et obtenez un plan d’action adapté à votre niveau d’avancement.",
};

export default function Page() {
  return (
    <div
      className="text-neutral-900"
      style={{ backgroundImage: `linear-gradient(to bottom, var(--color-light), #ffffff)` }}
    >
      <Container className="pt-12 pb-16">
        {/* Hero */}
        <div className="max-w-3xl">
          <Badge bg="var(--color-pastel)">Quiz gratuit • 2–3 min</Badge>
          <h1 className="mt-3 text-3xl/tight sm:text-4xl/tight font-extrabold">
            Êtes-vous fait pour la conciergerie locative ?
          </h1>
          <p className="mt-3 text-neutral-700">
            Répondez à 10 questions rapides et recevez un retour immédiat avec des pistes concrètes pour
            progresser (sans blabla).
          </p>

          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-neutral-600">
            <Badge bg="var(--color-light)"><Clock className="mr-1 size-3" /> 2–3 min</Badge>
            <Badge bg="var(--color-light)"><Sparkles className="mr-1 size-3" /> Plan d’action personnalisé</Badge>
            <Badge bg="var(--color-light)"><Info className="mr-1 size-3" /> Aucune inscription requise</Badge>
          </p>
        </div>

        {/* Carte de choix */}
        <Card className="mt-8 p-6 bg-white border">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Compass className="size-5" style={{ color: colors.vivid }} />
            🧭 Où en êtes-vous aujourd’hui ?
          </h2>

          <div className="mt-5 grid gap-3">
            {/* Option 1 : Reconversion */}
            <Button
              href="/quiz/reconversion"
              className="w-full justify-start"
            >
              <span className="text-base sm:text-lg">Je découvre / reconversion</span>
              <ArrowRight className="ml-auto size-4" />
            </Button>

            {/* Option 2 : Lancement */}
            <Button
              href="/quiz/lancement"
              className="w-full justify-start"
            >
              <span className="text-base sm:text-lg">J’ai déjà commencé / lancement</span>
              <ArrowRight className="ml-auto size-4" />
            </Button>
          </div>

          {/* Micro-confiance */}
          <div className="mt-5 rounded-xl p-4"
               style={{ backgroundColor: "color-mix(in oklab, var(--color-light) 70%, #ffffff 30%)" }}>
            <p className="text-sm text-neutral-700 italic text-center leading-relaxed">
              « Ce quiz m’a permis d’identifier tout de suite mes points à renforcer. » — Claire (Bordeaux)
            </p>
          </div>
        </Card>

        {/* Petit rappel sous la carte */}
        <p className="mt-6 text-xs text-neutral-500">
          Astuce : répondez au feeling. Le but est d’obtenir des conseils actionnables, pas une “note”.
        </p>
      </Container>
    </div>
  );
}
