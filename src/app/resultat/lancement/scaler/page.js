// src/app/resultat/reconversion/foncer/page.js
import { Container, Card, Button } from "@/components/ui";

export const metadata = { title: "Lancement - Prêt à scaler" };

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
        <h2 className="text-xl font-bold">Vous êtes prêt(e) à scaler&nbsp;!</h2>
        <p className="text-neutral-700">
          {"Tu es déjà bien structuré(e), tu maîtrises les bases et tu veux passer à l’étape supérieure : croissance, rentabilité, équilibre. Tu as le bon profil pour piloter une conciergerie efficace et ambitieuse"}
        </p>
      </Card>

      {/* Modules recommandés */}
<Card className="p-5 bg-white border space-y-3">
  <h3 className="text-lg font-semibold">
    {"Module\u00A04 — Gagner en organisation et productivité"}
  </h3>

  <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
    <li>{"Outils numériques utiles (du simple au scalable)"}</li>
    <li>{"Méthodes pour gérer plusieurs biens sans surcharge"}</li>
    <li>{"Process et checklists qui font gagner du temps"}</li>
  </ul>

  <p className="text-sm text-neutral-700 italic">
    {"La méthode pour rester serein, même avec 10 biens à gérer."}
  </p>
</Card>

<Card className="p-5 bg-white border space-y-3">
  <h3 className="text-lg font-semibold">
    {"Module\u00A05 — Piloter son business et grandir"}
  </h3>

  <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
    <li>{"Indicateurs et tableaux de bord utiles (pas de vanity metrics)"}</li>
    <li>{"Diversifier ses revenus pour sécuriser le CA"}</li>
    <li>{"Croissance maîtrisée et équilibre pro/perso"}</li>
  </ul>

  <p className="text-sm text-neutral-700 italic">
    {"Passer du freelance débordé à l’entrepreneur qui pilote sa conciergerie."}
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
