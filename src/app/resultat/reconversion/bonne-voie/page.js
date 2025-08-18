// src/app/resultat/reconversion/foncer/page.js
import { Container, Card, Button } from "@/components/ui";

export const metadata = { title: "Reconversion — Vous êtes sur la bonne voie" };

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
        <h2 className="text-xl font-bold">{"Vous êtes sur la bonne voie"}</h2>
        <p className="text-neutral-700">
          {"Tu montres déjà plusieurs qualités utiles pour ce métier, mais certaines zones d’ombre subsistent. Tu es curieux(se), motivé(e), mais tu as besoin de structurer ton projet pour ne pas te disperser."}
        </p>
      </Card>

      {/* Modules recommandés */}
<Card className="p-5 bg-white border space-y-3">
  <h3 className="text-lg font-semibold">
    {"Module\u00A01 — Comprendre le métier"}
  </h3>

  <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
    <li>{"Compétences et qualités indispensables"}</li>
    <li>{"Marché réel et opportunités concrètes"}</li>
    <li>{"Attentes des propriétaires et rôle d’une conciergerie"}</li>
  </ul>

  <p className="text-sm text-neutral-700 italic">
    {"Tout ce qu’il faut savoir avant de se lancer pour éviter les mauvaises surprises."}
  </p>
</Card>

<Card className="p-5 bg-white border space-y-3">
  <h3 className="text-lg font-semibold">
    {"Module\u00A03 — Construire une offre rentable et pro"}
  </h3>

  <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
    <li>{"Prestations essentielles et options à forte valeur perçue"}</li>
    <li>{"Tarifs clairs, packs, et logique de rentabilité"}</li>
    <li>{"Outils simples pour vendre avec crédibilité"}</li>
  </ul>

  <p className="text-sm text-neutral-700 italic">
    {"Un cadre simple pour vendre vos services avec crédibilité et rentabilité."}
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
