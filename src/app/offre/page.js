// src/app/offre/page.js — Server Component (aucun hook)
import { Container, Card, Badge, Button, colors } from "@/components/ui";
import { Check, ArrowRight, Sparkles, Clock, Shield, Star, BookOpen, LineChart, Target, Rocket } from "lucide-react";
import TestimonialsRotator from "@/components/TestimonialsRotator";
import { TESTIMONIALS } from "@/data/testimonials";
import CheckoutButton from "@/components/CheckoutButton";

export const metadata = {
  title: "Offre — Modules à l’unité, pack thématique ou complet",
  description: "Choisissez un module à l’unité, un pack thématique, ou la formation complète (5 modules).",
};

const MODULES = [
  {
    key: "m1",
    icon: Target,
    title: "Module 1 — Comprendre le métier",
    time: "~5 h",
    benefit: "Tout ce qu'il faut savoir avant de se lancer pour éviter les mauvaises surprises.",
    bullets: [
      "Rôle et périmètre d'une conciergerie locative",
      "Tâches cœur de métier (annonces, réservations, clés, ménage, linge, maintenance)",
      "Relation client voyageurs & propriétaires",
      "Panorama du marché (Airbnb, Booking, Abritel...)",
      "Compétences et qualités attendues",
    ],
  },
  {
    key: "m2",
    icon: Star,
    title: "Module 2 — Se lancer en toute légalité",
    time: "~6 h",
    benefit: "La base solide pour démarrer sans stress administratif.",
    bullets: [
      "Choix du statut (micro, société) et impacts",
      "Fiscalité, TVA, obligations sociales",
      "Carte G: quand est-elle vraiment nécessaire ?",
      "Assurances & responsabilités",
      "Risques fréquents et protections concrètes",
    ],
  },
  {
    key: "m3",
    icon: LineChart,
    title: "Module 3 — Construire une offre rentable et pro",
    time: "~7 h",
    benefit: "Un cadre simple pour vendre vos services avec crédibilité et rentabilité.",
    bullets: [
      "Prestations essentielles + options premium",
      "Packs clairs (Essentiel/Plus/Premium)",
      "Méthode de tarification et seuil de rentabilité",
      "Calcul des marges et priorités 20/80",
      "Outils et trames de vente",
    ],
  },
  {
    key: "m4",
    icon: BookOpen,
    title: "Module 4 — Gagner en organisation et productivité",
    time: "~6 h",
    benefit: "La méthode pour rester serein, même avec 10 biens à gérer.",
    bullets: [
      "Outils numériques (planning, checklists, suivi incidents)",
      "SOP: clés, ménage, urgences",
      "Gestion multi-biens & charge mentale",
      "Time-blocking, batching, priorisation",
      "Seuils de délégation & qualité de service",
    ],
  },
  {
    key: "m5",
    icon: Rocket,
    title: "Module 5 — Piloter son business et grandir",
    time: "~5 h",
    benefit: "Passer du freelance débordé à l'entrepreneur qui pilote sa conciergerie.",
    bullets: [
      "Indicateurs et tableaux de bord",
      "Diversification des revenus",
      "Suivi de la performance & ajustements",
      "Équilibre pro/perso soutenable",
      "Plan d'action de croissance",
    ],
  },
];

// --- PACKS THÉMATIQUES (titres, pitch, bullets, prix) ---
const PACKS = [
  {
    key: "pack_m1_m2_m3",
    title: "Pack M1 + M2 + M3 — Bases, Légal & Offre rentable",
    includes: ["M1", "M2", "M3"],
    pitch: "L’essentiel pour partir sereinement : comprendre le métier, être carré légalement et vendre une offre claire et rentable.",
    bullets: [
      "M1 — Comprendre le métier (rôle, périmètre, attentes clients)",
      "M2 — Se lancer en toute légalité (statut, TVA, assurances, risques)",
      "M3 — Construire une offre rentable et pro (packs, marges, seuil de rentabilité)",
    ],
    price: "297 €",
    sku: "pack_m1_m2_m3",
  },
  {
    key: "pack_m4_m5",
    title: "Pack M4 + M5 — Organisation & Pilotage",
    includes: ["M4", "M5"],
    pitch: "Gagnez en productivité et pilotez votre activité avec des indicateurs simples et un rythme soutenable.",
    bullets: [
      "M4 — Organisation & productivité (outils, SOP, gestion multi-biens)",
      "M5 — Pilotage & croissance (tableaux de bord, diversification, équilibre pro/perso)",
    ],
    price: "198 €",
    sku: "pack_m4_m5",
  },
  {
    key: "pack_m2_m3_m4",
    title: "Pack M2 + M3 + M4 — Légal, Offre & Ops",
    includes: ["M2", "M3", "M4"],
    pitch: "Cadrez le légal, concevez une offre crédible et mettez en place une organisation qui tient la charge.",
    bullets: [
      "M2 — Statut, TVA, responsabilités : démarrer au propre",
      "M3 — Packs & pricing : vendre avec des marges maîtrisées",
      "M4 — Outils & process : gagner du temps dès 3–4 biens",
    ],
    price: "297 €",
    sku: "pack_m2_m3_m4",
  },
  {
    key: "pack_m1_m3",
    title: "Pack M1 + M3 — Comprendre & Vendre",
    includes: ["M1", "M3"],
    pitch: "Alignez votre projet sur la réalité du métier et apprenez à packager une offre qui se vend.",
    bullets: [
      "M1 — Vision claire du métier et des attentes terrain",
      "M3 — Packs, marges, seuils : une offre pro et rentable",
    ],
    price: "198 €",
    sku: "pack_m1_m3",
  },
  {
    key: "pack_m1_m2",
    title: "Pack M1 + M2 — Bases & Légal",
    includes: ["M1", "M2"],
    pitch: "Le duo de départ : comprendre le métier et sécuriser le lancement côté statut/fiscalité.",
    bullets: [
      "M1 — Les fondamentaux de la conciergerie locative",
      "M2 — Statut, TVA, assurances : éviter les pièges",
    ],
    price: "198 €",
    sku: "pack_m1_m2",
  },
];

export default function Page() {
  return (
    <div
      className="text-neutral-900"
      style={{ backgroundImage: `linear-gradient(to bottom, var(--color-light), #ffffff)` }}
    >
      <Container className="pt-12 pb-16">
        {/* HERO */}
        <div className="max-w-3xl">
          <Badge bg="var(--color-pastel)">Formation modulaire</Badge>
          <h1 className="mt-3 text-3xl/tight sm:text-4xl/tight font-extrabold">
            Choisissez votre format&nbsp;: à l’unité, en pack, ou complet
          </h1>
          <p className="mt-3 text-neutral-700">
            {"Des modules concrets, sans vidéos : PDF structurés, matrices et exercices. Pour avancer vite, sans blabla."}
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-neutral-600">
            <Badge bg="var(--color-light)"><Clock className="mr-1 size-3" /> 29&nbsp;h au total</Badge>
            <Badge bg="var(--color-light)"><Sparkles className="mr-1 size-3" /> Fiches pratiques pour le pack complet</Badge>
          </p>
        </div>

        {/* PRICING */}
        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          {/* À l’unité */}
          <Card className="p-6 flex flex-col" bg="#fff" border={colors.pastel}>
            <Badge bg={colors.light} fg={colors.dark}>{"Module à l'unité"}</Badge>
            <h3 className="mt-3 text-xl font-bold">Idéal pour un besoin précis</h3>
            <p className="mt-1 text-sm text-neutral-600">
              {"Un module (PDF). Fiches pratiques non incluses."}
            </p>

            <div className="mt-5 flex items-baseline gap-2">
              <div className="text-4xl font-extrabold">99&nbsp;€</div>
              <div className="text-sm text-neutral-500">TTC</div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> PDF complet (~5–7&nbsp;h de travail)</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Exercices et matrices</li>
              <li className="flex gap-2 opacity-60"><Check className="size-4" /> Fiches pratiques exclusives (non incluses)</li>
            </ul>

            <Button href="#modules" className="mt-6 w-full">
              Choisir un module 
            </Button>
          </Card>

          {/* Pack thématique (exemple : Prix & Rentabilité) */}
          <Card className="p-6 flex flex-col" bg="#fff" border={colors.pastel}>
            <Badge bg={colors.light} fg={colors.dark}>Pack thématique</Badge>
            <h3 className="mt-3 text-xl font-bold">Prix & Rentabilité (M2+M3)</h3>
            <p className="mt-1 text-sm text-neutral-600">
              {"Deux modules complémentaires pour fixer des tarifs justes et piloter la marge."}
            </p>

            <div className="mt-5 flex items-end gap-3">
              <div className="text-4xl font-extrabold">198&nbsp;€</div>
              <div className="text-sm text-neutral-500">TTC</div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> M2&nbsp;+&nbsp;M3 (PDF)</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Exercices et matrices</li>
            </ul>

            {/* TODO: brancher Stripe (sku=pack_prix_renta) */}
            <Button href="#packs" className="mt-6 w-full">
              Choisir un pack 
            </Button>
          </Card>

          {/* Complet */}
          <Card className="p-6 flex flex-col" bg="#fff" border={colors.vivid}>
            <div className="flex items-center justify-between">
            <Badge 
            bg={colors.vivid} 
            fg="#a10303ff" 
            className="text-sm font-bold px-3 py-1"
            >Recommandé</Badge>

              <span className="text-xs bold" style={{ color: colors.vivid }}>80% choisissent cette option</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">Complet (5 modules)</h3>
            <p className="mt-1 text-sm text-neutral-600">
              29&nbsp;h de formation + fiches pratiques exclusives (modèles, checklists).
            </p>

            <div className="mt-5 flex items-end gap-3">
              <div className="text-5xl font-extrabold">390&nbsp;€</div>
              <div className="text-sm text-neutral-500">TTC</div>
              <div className="text-sm text-neutral-500">~<s>495&nbsp;€</s></div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Les 5 modules (PDF)</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Fiches pratiques incluses</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Accès immédiat</li>
            </ul>

            {/* TODO: brancher Stripe (sku=pack_complet) */}
<CheckoutButton sku="pack_complet" className="mt-4 w-full">
  Acheter ce module
</CheckoutButton>          
  </Card>
        </div>

{/* LISTE DES MODULES */}
<div id="modules" className="mt-14">
  <h2 className="text-2xl font-bold">Modules à l’unité</h2>
  <p className="text-neutral-600">Choisissez exactement ce dont vous avez besoin.</p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
    {MODULES.map((m) => {
      const Icon = m.icon;
      return (
        <Card key={m.key} className="p-6" bg="#fff" border={colors.pastel}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl" style={{ backgroundColor: "var(--color-light)" }}>
              <Icon className="size-5 text-[var(--color-vivid)]" />
            </div>
            <div>
              <h3 className="font-semibold">{m.title}</h3>
              <p className="text-sm text-neutral-600 mt-1">{m.benefit}</p>

              {/* Liste à puces */}
              <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-neutral-700">
                {m.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-neutral-700">
              <Clock className="inline mr-1 size-4" /> {m.time}
            </span>
            <span className="text-base font-bold">99&nbsp;€</span>
          </div>

<CheckoutButton sku={`module_${m.key}`} className="mt-4 w-full">
  Acheter ce module
</CheckoutButton>

        </Card>
      );
    })}
          <Card className="p-6 flex flex-col" bg="#fff" border={colors.vivid}>
            <div className="flex items-center justify-between">
            <Badge 
            bg={colors.vivid} 
            fg="#a10303ff" 
            className="text-sm font-bold px-3 py-1"
            >Recommandé</Badge>

              <span className="text-xs bold" style={{ color: colors.vivid }}>80% choisissent cette option</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">Complet (5 modules)</h3>
            <p className="mt-1 text-sm text-neutral-600">
              29&nbsp;h de formation + fiches pratiques exclusives (modèles, checklists).
            </p>

            <div className="mt-5 flex items-end gap-3">
              <div className="text-5xl font-extrabold">390&nbsp;€</div>
              <div className="text-sm text-neutral-500">TTC</div>
              <div className="text-sm text-neutral-500">~<s>495&nbsp;€</s></div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Les 5 modules (PDF)</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Fiches pratiques incluses</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Accès immédiat</li>
            </ul>

            {/* TODO: brancher Stripe (sku=pack_complet) */}
<CheckoutButton sku="pack_complet" className="mt-4 w-full">
  Acheter ce module
</CheckoutButton>   
       </Card>

  </div>
</div>

{/* PACKS THÉMATIQUES */}
<div id="packs" className="mt-14">
  <h2 className="text-2xl font-bold">Packs thématiques</h2>
  <p className="text-neutral-600">
    Des combinaisons prêtes à l’emploi pour aller plus vite là où ça compte.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
    {PACKS.map((p) => (
      <Card key={p.key} className="p-6" bg="#fff" border={colors.pastel}>
        {/* En-tête */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <div className="flex gap-1">
            {p.includes.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "var(--color-light)", color: "var(--color-dark)" }}
                title={`Inclus: ${tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pitch */}
        <p className="mt-2 text-sm text-neutral-700">{p.pitch}</p>

        {/* Bullets */}
        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-neutral-700">
          {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>

        {/* Prix */}
        <div className="mt-4 flex items-end gap-3">
          <div className="text-2xl font-extrabold">{p.price}</div>
          {p.compareAt && (
            <div className="text-sm text-neutral-500">~<s>{p.compareAt}</s></div>
          )}
        </div>
        {/* CTA */}
<CheckoutButton sku={`${p.key}`} className="mt-4 w-full">
  Acheter ce module
</CheckoutButton>   
      </Card>
    ))}
              <Card className="p-6 flex flex-col" bg="#fff" border={colors.vivid}>
            <div className="flex items-center justify-between">
            <Badge 
            bg={colors.vivid} 
            fg="#a10303ff" 
            className="text-sm font-bold px-3 py-1"
            >Recommandé</Badge>

              <span className="text-xs bold" style={{ color: colors.vivid }}>80% choisissent cette option</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">Complet (5 modules)</h3>
            <p className="mt-1 text-sm text-neutral-600">
              29&nbsp;h de formation + fiches pratiques exclusives (modèles, checklists).
            </p>

            <div className="mt-5 flex items-end gap-3">
              <div className="text-5xl font-extrabold">390&nbsp;€</div>
              <div className="text-sm text-neutral-500">TTC</div>
              <div className="text-sm text-neutral-500">~<s>495&nbsp;€</s></div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Les 5 modules (PDF)</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Fiches pratiques incluses</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Accès immédiat</li>
            </ul>

            {/* TODO: brancher Stripe (sku=pack_complet) */}
<CheckoutButton sku="pack_complet" className="mt-4 w-full">
  Acheter ce module
</CheckoutButton>          
</Card>

  </div>
</div>


        {/* FAQ & GARANTIE */}
        <div className="grid md:grid-cols-2 gap-5 mt-12">
          <Card className="p-5" bg="#fff" border={colors.pastel}>
            <h3 className="font-semibold">Y a-t-il des vidéos&nbsp;?</h3>
            <p className="mt-2 text-sm text-neutral-700">
              {"Non. Format focalisé sur l’efficacité : PDF structurés, matrices, exercices et fiches pratiques (incluses dans les packs)."}
            </p>
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

{/* Témoignages */}
<div className="mt-16"> {/* un peu plus d’espace au-dessus */}
  <h2 className="text-2xl font-bold">Ils se sont lancés</h2>
  <p className="text-neutral-600">
    Quelques retours d’apprenants (placeholders, à remplacer par vos témoignages réels).
  </p>

  <div className="mt-5">
    <TestimonialsRotator items={TESTIMONIALS} count={3} interval={6000} />
  </div>
</div>

      </Container>
    </div>
  );
}
