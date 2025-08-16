import { Container, Card, Badge, Button } from "@/components/ui";

export const metadata = { title: "Reconversion — Vous êtes sur la bonne voie" };

export default function Page() {
  return (
    <Container className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-extrabold">Vous êtes sur la bonne voie</h1>
      <p className="text-neutral-700">Vous avez plusieurs compétences-clé.</p>

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
