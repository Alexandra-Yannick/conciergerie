"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Check, Shield, Clock, Star, ArrowRight, Sparkles,
  FileText, BookOpen, Briefcase, LineChart, Target, Rocket
} from "lucide-react";

// THEME — Palette issue from modules
const colors = {
  pastel: "#D7CEC0",   // orange grisé pastel
  vivid: "#F45C2C",    // orange vif
  light: "#F5F1ED",    // orange clair
  darkText: "#2E2E2E"
};

function Button({ className = "", children, variant = "primary", ...props }) {
  const styles =
    variant === "secondary"
      ? { backgroundColor: colors.pastel, color: colors.darkText }
      : { backgroundColor: colors.vivid, color: "#FFFFFF" };
  return (
    <button
      className={`px-5 py-3 rounded-2xl shadow hover:shadow-md transition
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                  ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </button>
  );
}

function Badge({ children, className = "", bgColor = colors.light, textColor = colors.darkText }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </span>
  );
}

function Card({ className = "", children, bgColor = "white", borderColor = "rgba(0,0,0,0.1)" }) {
  return (
    <div
      className={`rounded-2xl shadow-sm ${className}`}
      style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}` }}
    >
      {children}
    </div>
  );
}

function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

const features = [
  { icon: <Briefcase />, title: "Pensé pour la reconversion", desc: "Spécial pros de l’hôtellerie/restauration qui veulent lancer une conciergerie." },
  { icon: <LineChart />, title: "29 h de contenu actionnable", desc: "Méthodes, matrices, calculs de prix, scénarios. Zéro blabla." },
  { icon: <FileText />, title: "Fiches pratiques exclusives", desc: "Modèles, checklists et trames prêtes à l’emploi – réservées au pack." },
  { icon: <Shield />, title: "Garantie 7 jours", desc: "Essayez sans risque. Remboursement si ça ne vous convient pas." },
];

const modules = [
  { title: "Module 1 — Mix Marketing & Rôle du Prix", time: "~5 h", benefit: "Construire un positionnement clair et cohérent.", icon: <Target /> },
  { title: "Module 2 — Pricing fondé sur la valeur perçue", time: "~6 h", benefit: "Fixer un prix crédible et justifiable.", icon: <Star /> },
  { title: "Module 3 — Performance & Rentabilité", time: "~7 h", benefit: "Calculer marges, seuil de rentabilité et élasticités.", icon: <LineChart /> },
  { title: "Module 4 — Concurrence & Stratégie Prix", time: "~6 h", benefit: "Positionner l’offre face au marché et ajuster.", icon: <BookOpen /> },
  { title: "Module 5 — Lancement & Déploiement", time: "~5 h", benefit: "Plan d’action go-to-market, scénarios de prix.", icon: <Rocket /> },
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
            <Badge className="mb-4" bgColor={colors.pastel} textColor={colors.darkText}>
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
              <Badge bgColor={colors.light} textColor={colors.vivid}>
                Plus que <strong className="mx-1">{slotsLeft}</strong> places au tarif lancement
              </Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge bgColor={colors.light}><Clock className="mr-1 size-3"/> 29 h de formation</Badge>
              <Badge bgColor={colors.light}><Shield className="mr-1 size-3"/> Satisfait ou remboursé 7 jours</Badge>
              <Badge bgColor={colors.light}><Sparkles className="mr-1 size-3"/> Fiches exclusives dans le pack</Badge>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6" bgColor="#ffffff" borderColor={colors.pastel}>
              <p className="text-sm font-semibold" style={{ color: colors.vivid }}>Pourquoi ce pack ?</p>
              <ul className="space-y-3 text-sm text-neutral-700">
                <li className="flex items-start gap-3"><Check className="mt-0.5 size-4" style={{ color: colors.vivid }} /> Un plan d’action concret pour passer de salarié à concierge indépendant</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 size-4" style={{ color: colors.vivid }} /> Des exercices et matrices prêts à l’emploi, adaptés au marché français</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 size-4" style={{ color: colors.vivid }} /> Les fiches pratiques <strong>réservées au pack</strong> pour gagner des jours</li>
              </ul>
            </Card>
          </div>
        </div>
      </Container>

      {/* Features */}
      <Container className="py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, idx) => (
            <Card key={idx} className="p-6" bgColor="#ffffff" borderColor={colors.pastel}>
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
            <Card key={i} className="p-6" bgColor="#ffffff" borderColor={colors.pastel}>
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
          <Card className="p-6 flex flex-col" bgColor="#ffffff" borderColor={colors.pastel}>
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
            <Button className="mt-6 w-full" variant="secondary" onClick={() => router.push("/quiz")}>
              Choisir un module
            </Button>
          </Card>

          {/* Pack */}
          <Card className="p-6" bgColor="#ffffff" borderColor={colors.vivid}>
            <div className="flex items-center justify-between">
              <Badge bgColor={colors.pastel} textColor={colors.darkText}>Pack recommandé</Badge>
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
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Garantie 7 jours</li>
            </ul>
            <div className="mt-6">
              <Button className="w-full" onClick={handleBuyPack}>
                Commander maintenant <ArrowRight className="ml-2 inline size-4"/>
              </Button>
              <p className="mt-2 text-xs text-center" style={{ color: colors.vivid }}>
                Offre de lancement limitée aux 50 premiers
              </p>
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-5" bgColor={colors.pastel} borderColor={colors.pastel}>
          <p className="text-sm" style={{ color: colors.darkText }}>
            <strong>Note :</strong> Cette formation est indépendante et neutre vis-à-vis des plateformes. Le contenu se concentre sur les bonnes pratiques opérationnelles d’une conciergerie professionnelle.
          </p>
        </Card>
      </Container>

      {/* Testimonials */}
      <Container className="py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Ils se sont lancés</h2>
          <p className="text-neutral-600">Quelques retours d’apprenants (placeholders, à remplacer par vos témoignages réels).</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[1,2,3].map((i)=> (
            <Card key={i} className="p-6" bgColor="#ffffff" borderColor={colors.pastel}>
              <div className="flex items-center gap-2" style={{ color: "#FFB300" }}>
                {Array.from({length:5}).map((_,j)=> <Star key={j} className="size-4 fill-current"/>)}
              </div>
              <p className="mt-3 text-sm text-neutral-700">“Une approche ultra concrète. Les fiches m’ont fait gagner des jours de préparation.”</p>
              <p className="mt-3 text-xs text-neutral-500">Camille — Ex-réceptionniste</p>
            </Card>
          ))}
        </div>
      </Container>

      {/* FAQ */}
      <Container className="py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">FAQ</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="p-5" bgColor="#ffffff" borderColor={colors.pastel}>
            <h3 className="font-semibold">Y a-t-il des vidéos ?</h3>
            <p className="mt-2 text-sm text-neutral-700">Non. Le format est focalisé sur l’efficacité : PDF structurés, matrices, exercices et fiches pratiques (réservées au pack).</p>
          </Card>
          <Card className="p-5" bgColor="#ffffff" borderColor={colors.pastel}>
            <h3 className="font-semibold">Combien de temps dois-je prévoir ?</h3>
            <p className="mt-2 text-sm text-neutral-700">Comptez environ 29 h au total pour le pack (lecture + mise en application), soit ~4 jours.</p>
          </Card>
          <Card className="p-5" bgColor="#ffffff" borderColor={colors.pastel}>
            <h3 className="font-semibold">Puis-je acheter un seul module ?</h3>
            <p className="mt-2 text-sm text-neutral-700">Oui, 99 € par module. Les fiches pratiques restent exclusives au pack complet.</p>
          </Card>
          <Card className="p-5" bgColor="#ffffff" borderColor={colors.pastel}>
            <h3 className="font-semibold">Et si la formation ne me convient pas ?</h3>
            <p className="mt-2 text-sm text-neutral-700">Vous disposez d’une garantie satisfait ou remboursé pendant 7 jours.</p>
          </Card>
        </div>
      </Container>

      {/* Final CTA */}
      <Container className="py-12">
        <Card className="p-8 text-center" bgColor={colors.darkText} borderColor={colors.darkText}>
          <h2 className="text-2xl font-extrabold text-white">Dans une semaine, vous pourriez préparer vos premières prestations</h2>
          <p className="mt-2" style={{ color: colors.light }}>Passez à l’action avec un plan clair et des outils prêts à l’emploi.</p>
          <Button className="mt-5" onClick={() => router.push("/quiz")}>
            Commencer le questionnaire <ArrowRight className="ml-2 inline size-4" />
          </Button>
          <p className="mt-2 text-xs" style={{ color: colors.pastel }}>Prix de lancement. Réservé aux 50 premiers inscrits.</p>
        </Card>
        <p className="mt-8 text-center text-xs text-neutral-500">© {new Date().getFullYear()} — Cap Conciergerie. Tous droits réservés.</p>
      </Container>
    </div>
  );
}
