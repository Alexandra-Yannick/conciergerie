/* eslint-disable react/no-unescaped-entities */
import { Container, Card } from "@/components/ui";

export const metadata = { title: "Reconversion — Vous êtes prêt(e) à foncer !" };

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
        <h2 className="text-xl font-bold">Vous êtes prêt(e) à foncer !</h2>
        <p className="text-neutral-700">Tu as déjà un bon sens de l'organisation, une vraie motivation, et un profil très compatible avec la conciergerie locative.
Tu es prêt(e) à poser des bases solides et à bâtir un projet sérieux.</p>
      </Card>

      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Module 1 : pour bien comprendre le métier, ses réalités et ses opportunités</h3>
        <p className="text-sm text-neutral-700"><strong>Résumé :</strong> Statut, obligations, fiscalité, carte G, assurances…</p>
        <p className="text-sm text-neutral-700">Démarrer sereinement et en conformité.</p>
      </Card>

      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Module 2 : pour poser les bases légales, choisir ton statut et éviter les pièges</h3>
        <p className="text-sm text-neutral-700"><strong>Résumé :</strong> Clarifiez vos prestations, packs et tarifs justes.</p>
        <p className="text-sm text-neutral-700">Pour vendre vos services simplement et efficacement.</p>
      </Card>

      <Card className="p-5 bg-white border space-y-3">
        <h3 className="text-lg font-semibold">Astuce : Gagne du temps et de la clarté en choisissant directement le pack complet, tu pourras progresser à ton rythme avec les bons outils dès le départ.</h3>
      </Card>
    </Container>
  );
}
