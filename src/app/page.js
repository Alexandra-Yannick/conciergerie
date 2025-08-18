"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {Check, Shield, Clock, Star, ArrowRight, Sparkles, FileText, BookOpen, Briefcase, LineChart, Target, Rocket} from "lucide-react";
import { Container, Card, Badge, Button } from "@/components/ui";
import Link from "next/link";
import TestimonialsRotator from "@/components/TestimonialsRotator";

// Palette raccordée à tes variables CSS globales
const colors = {
  pastel: "var(--color-pastel)",   // #D7CEC0
  vivid:  "var(--color-vivid)",    // #F45C2C
  light:  "var(--color-light)",    // #F5F1ED
  dark:   "var(--color-dark)"      // #2E2E2E
};

const features = [
  { icon: <Briefcase />, title: "Pensé pour la reconversion", desc: "Spécial pros de l’hôtellerie/restauration qui veulent lancer une conciergerie." },
  { icon: <LineChart />, title: "29 h de contenu actionnable", desc: "Méthodes, matrices, calculs de prix, scénarios. Zéro blabla." },
  { icon: <FileText />,  title: "Fiches pratiques exclusives", desc: "Modèles, checklists et trames prêtes à l’emploi – réservées au pack." },
];

const TESTIMONIALS = [
  {
    name: "Camille — Ex-réceptionniste à Bordeaux",
    rating: 5,
    text: "Une approche ultra concrète. Les fiches m’ont fait gagner des jours de préparation.",
  },
  {
    name: "Martin — Loueur saisonnier à Nice",
    rating: 5,
    text: "J’ai pu structurer mon offre en 2 soirs. Les modèles sont hyper utiles pour démarrer.",
  },
  {
    name: "Inès — En reconversion à Lyon",
    rating: 4,
    text: "Clair, direct et applicable. Le quiz m’a aidée à comprendre où creuser en priorité.",
  },
  {
    name: "Alexandra — Banquière à Paris",
    rating: 5,
    text: "Pas de blabla, juste des outils concrets. J’ai pu lancer ma conciergerie en 2 semaines.",
  },
   {
    name: "Sophie — Manager hôtelière",
    rating: 5,
    text: "J’ai gagné en confiance et en clarté. Les modules sont bien pensés et motivants.",
  },
  {
    name: "Julien — Entrepreneur",
    rating: 4,
    text: "Ça m’a évité de partir dans tous les sens. Les conseils sont actionnables tout de suite.",
  },
];


const modules = [
  { title: "Module 1 — Comprendre le métier", time: "~5 h", benefit: "Tout ce qu'il faut savoir avant de se lancer pour éviter les mauvaises surprises.", icon: <Target /> },
  { title: "Module 2 — Se lancer en toute légalité", time: "~6 h", benefit: "La base solide pour démarrer sans stress administratif", icon: <Star /> },
  { title: "Module 3 — Construire une offre rentable et pro", time: "~7 h", benefit: "Un cadre simple pour vendre vos services avec crédibilité et rentabilité.", icon: <LineChart /> },
  { title: "Module 4 — Gagner en organisation et productivité", time: "~6 h", benefit: "La méthode pour rester serein, même avec 10 biens à gérer", icon: <BookOpen /> },
  { title: "Module 5 — Piloter son business et grandir", time: "~5 h", benefit: "Passer du freelance débordé à l'entrepreneur qui pilote sa conciergerie.", icon: <Rocket /> },
];

export default function Page() {
  const [slotsLeft, setSlotsLeft] = useState(50);
  const router = useRouter();

  const handleBuyPack = () => setSlotsLeft((s) => (s > 0 ? s - 1 : 0));

  return (
    <div className="text-neutral-900" style={{ backgroundImage: `linear-gradient(to bottom, ${colors.light}, #ffffff)` }}>
      {/* Hero */}
      <Container className="pt-14 pb-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <Badge className="mb-4" bg={colors.pastel} fg={colors.dark}>
              Pack Conciergerie • Édition lancement
            </Badge>

            <motion.h1
              initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.5}}
              className="text-4xl/tight sm:text-5xl/tight font-extrabold"
            >
              En 4 jours, maîtrisez les bases pour créer votre conciergerie et devenir votre propre patron
            </motion.h1>

            <p className="mt-4 text-lg text-neutral-700 max-w-2xl">
              Une formation complète en 5 modules (29 h), conçue pour les pros de l’hôtellerie/restauration en reconversion. Sans vidéos, 100% actionnable.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* TEMP : on envoie vers /quiz en attendant Stripe */}
              <Button onClick={() => router.push("/quiz")}>
                Commencer le questionnaire <ArrowRight className="ml-2 inline size-4" />
              </Button>
              <Badge bg={colors.light} fg={colors.vivid}>
                Plus que <strong className="mx-1">{slotsLeft}</strong> places au tarif lancement
              </Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge bg={colors.light}><Clock className="mr-1 size-3"/> 29 h de formation</Badge>
              <Badge bg={colors.light}><Sparkles className="mr-1 size-3"/> Fiches exclusives dans le pack</Badge>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6" bg="#ffffff" border={colors.pastel}>
              <p className="text-sm font-semibold" style={{ color: colors.vivid }}>Pourquoi ce pack ?</p>
              <ul className="space-y-3 text-sm text-neutral-700">
                <li className="flex items-start gap-3"><Check className="mt-0.5 size-4" style={{ color: colors.vivid }} /> Un plan d’action concret pour passer de salarié à concierge indépendant</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 size-4" style={{ color: colors.vivid }} /> Des exercices et matrices prêts à l’emploi, adaptés au marché français</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 size-4" style={{ color: colors.vivid }} /> Les fiches pratiques sont réservées au pack pour gagner des jours</li>
              </ul>
            </Card>
          </div>
        </div>
      </Container>

      {/* Features */}
      <Container className="py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, idx) => (
            <Card key={idx} className="p-6" bg="#ffffff" border={colors.pastel}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl" style={{ backgroundColor: colors.light }}>{f.icon}</div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{f.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* Modules */}
      <Container className="py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Ce que vous allez maîtriser</h2>
          <p className="text-neutral-600">5 modules complémentaires pour passer de la théorie à l’action.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, i) => (
            <Card key={i} className="p-6" bg="#ffffff" border={colors.pastel}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl" style={{ backgroundColor: colors.light }}>{m.icon}</div>
                <div>
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{m.benefit}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-neutral-700"><Clock className="inline mr-1 size-4"/> {m.time}</div>
            </Card>
          ))}
        </div>
      </Container>

      {/* Pricing */}
      <Container className="py-10">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold">Choisissez votre formule</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Le pack inclut des fiches pratiques exclusives non vendues séparément.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          {/* Unité */}
          <Card className="p-6 flex flex-col" bg="#ffffff" border={colors.pastel}>
            <div className="flex-1">
              <Badge>Module à l’unité</Badge>
              <h3 className="mt-3 text-xl font-bold">Idéal pour un besoin précis</h3>
              <p className="mt-1 text-sm text-neutral-600">1 module (PDF) — sans fiches pratiques</p>
              <div className="mt-5 flex items-baseline gap-2">
                <div className="text-4xl font-extrabold">99 €</div>
                <div className="text-sm text-neutral-500">TTC</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> PDF complet (~5–7 h de travail)</li>
                <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Exercices et matrices</li>
                <li className="flex gap-2 opacity-60"><Check className="size-4"/> Fiches pratiques exclusives (non incluses)</li>
              </ul>
            </div>
            <Button className="mt-6 w-full" variant="secondary" onClick={() => router.push("/offre")}>
              Choisir un module
            </Button>
          </Card>

          {/* Pack */}
          <Card className="p-6" bg="#ffffff" border={colors.vivid}>
            <div className="flex items-center justify-between">
              <Badge bg={colors.pastel} fg={colors.dark}>Pack recommandé</Badge>
              <span className="text-xs" style={{ color: colors.vivid }}>80% choisissent cette option</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">Pack complet (5 modules)</h3>
            <p className="mt-1 text-sm text-neutral-600">29 h de formation + fiches pratiques exclusives</p>
            <div className="mt-5 flex items-end gap-3">
              <div className="text-5xl font-extrabold">390 €</div>
              <div className="text-sm text-neutral-500">TTC</div>
              <div className="text-sm text-neutral-500">~<s>495 €</s></div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Les 5 modules (PDF)</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Fiches pratiques exclusives (modèles, checklists)</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Accès immédiat + mises à jour</li>
            </ul>
            <div className="mt-6">
          <Button className="w-full" href="/offre">
                Commander maintenant <ArrowRight className="ml-2 inline size-4" />
          </Button>
              <p className="mt-2 text-xs text-center" style={{ color: colors.vivid }}>
                Offre de lancement limitée aux 50 premiers
              </p>
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-5" bg={colors.pastel} border={colors.pastel}>
          <p className="text-sm" style={{ color: colors.dark }}>
            <strong>Note :</strong> Cette formation est indépendante et neutre vis-à-vis des plateformes. Le contenu se concentre sur les bonnes pratiques opérationnelles d’une conciergerie professionnelle.
          </p>
        </Card>
      </Container>

{/* Testimonials */}
<Container className="py-10">
  <div className="mb-6">
    <h2 className="text-2xl font-bold">Ils se sont lancés</h2>
    <p className="text-neutral-600">
      Quelques retours d’apprenants (placeholders, à remplacer par vos témoignages réels).
    </p>
  </div>

  <TestimonialsRotator
    items={TESTIMONIALS}
    count={3}
    interval={6000}
    border={"var(--color-pastel)"} // optionnel
  />
</Container>

      {/* FAQ */}
      <Container className="py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">FAQ</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="p-5" bg="#ffffff" border={colors.pastel}>
            <h3 className="font-semibold">Y a-t-il des vidéos ?</h3>
            <p className="mt-2 text-sm text-neutral-700">Non. Le format est focalisé sur l’efficacité : PDF structurés, matrices, exercices et fiches pratiques (réservées au pack).</p>
          </Card>
          <Card className="p-5" bg="#ffffff" border={colors.pastel}>
            <h3 className="font-semibold">Combien de temps dois-je prévoir ?</h3>
            <p className="mt-2 text-sm text-neutral-700">Comptez environ 29 h au total pour le pack (lecture + mise en application), soit ~4 jours.</p>
          </Card>
          <Card className="p-5" bg="#ffffff" border={colors.pastel}>
            <h3 className="font-semibold">Puis-je acheter un seul module ?</h3>
            <p className="mt-2 text-sm text-neutral-700">Oui, 99 € par module. Les fiches pratiques restent exclusives au pack complet.</p>
          </Card>
        </div>
      </Container>

      {/* Final CTA */}
      <Container className="py-12">
        <Card className="p-8 text-center" bg={colors.dark} border={colors.dark}>
          <h2 className="text-2xl font-extrabold text-white">Dans une semaine, vous pourriez préparer vos premières prestations</h2>
          <p className="mt-2" style={{ color: colors.light }}>Passez à l’action avec un plan clair et des outils prêts à l’emploi.</p>
          <Button className="mt-5" onClick={() => router.push("/quiz")}>
            Commencer le questionnaire <ArrowRight className="ml-2 inline size-4" />
          </Button>
          <p className="mt-2 text-xs" style={{ color: colors.pastel }}>Prix de lancement. Réservé aux 50 premiers inscrits.</p>
        </Card>
        <p className="mt-8 text-center text-xs text-neutral-500">© {new Date().getFullYear()} — Cap Conciergerie. Tous droits réservés.
          <Link href="/cgu" className="ml-2 underline hover:text-neutral-700">
    CGU
  </Link>
        </p>
      </Container>
    </div>
  );
}
