// src/app/resultat/reconversion/foncer/page.js
import { Container, Card, Button } from "@/components/ui";

export const metadata = { title: "Reconversion — Il est temps de mieux explorer" };

export default function Page({ searchParams }) {
  const score = Number(searchParams?.score ?? 0);
  const max = Number(searchParams?.max ?? 20);

  return (
    <Container className="py-8 space-y-6">
      {/* En-tête résultat */}
      <Card className="p-5 bg-white border">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Votre résultat</h1>
            <div className="mt-2 text-xl font-bold">
              {score} / {max}
            </div>
          </div>

          {/* petit bouton en haut à droite */}
          <Button
            href="/offre"
            className="px-3 py-2 text-xs"
          >
            Voir les modules
          </Button>
        </div>
      </Card>

      {/* Message principal */}
      <Card className="p-5 bg-white border space-y-3">
        <h2 className="text-xl font-bold">Il est temps de mieux explorer</h2>
        <p className="text-neutral-700">
          {"Tu es au tout début de ta réflexion, et c’est parfait ! Tu gagnes du temps (et de l’énergie) en identifiant les compétences à acquérir avant de te lancer"}
        </p>
      </Card>

      {/* Modules recommandés */}
      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Module&nbsp;1</h3>
        <p className="text-sm text-neutral-700">
          <strong>Résumé&nbsp;:</strong>{" "}
          {"Pour t’assurer que le métier correspond vraiment à ton profil"}
      </p>
      </Card>

      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Module&nbsp;2</h3>
        <p className="text-sm text-neutral-700">
          <strong>Résumé&nbsp;:</strong>{" "}
          {"Pour poser les bases légales, choisir ton statut et éviter les pièges"}
        </p>
      </Card>

      {/* Astuce / nudge pack */}
      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Astuce</h3>
        <p className="text-sm text-neutral-700">
          {"Gagnez du temps et de la clarté en choisissant directement le pack complet : vous progressez à votre rythme avec les bons outils dès le départ."}
        </p>
      </Card>

      {/* CTA bas de page */}
      <div className="pt-2">
        <Button href="/offre" className="w-full">
          Voir les modules
        </Button>
      </div>
    </Container>
  );
}
