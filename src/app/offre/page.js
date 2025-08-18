// src/app/offre/page.js — Server Component (aucun hook)
import { Container, Card, Badge, Button, colors } from "@/components/ui";
import { Check, ArrowRight, Sparkles, Clock, Shield, Star, BookOpen, LineChart, Target, Rocket } from "lucide-react";

export const metadata = {
  title: "Offre — Modules à l’unité, pack thématique ou complet",
  description: "Choisissez un module à l’unité, un pack thématique, ou la formation complète (5 modules).",
};

const MODULES = [
  { key: "m1", icon: Target,    title: "Mix Marketing & Rôle du Prix",         time: "~5 h",  benefit: "Positionnement clair et cohérent." },
  { key: "m2", icon: Star,      title: "Pricing fondé sur la valeur perçue",   time: "~6 h",  benefit: "Tarifs justes et crédibles." },
  { key: "m3", icon: LineChart, title: "Performance & Rentabilité",            time: "~7 h",  benefit: "Marge, seuil de rentabilité, priorités." },
  { key: "m4", icon: BookOpen,  title: "Concurrence & Stratégie Prix",         time: "~6 h",  benefit: "Se différencier et s’ajuster au marché." },
  { key: "m5", icon: Rocket,    title: "Lancement & Déploiement",              time: "~5 h",  benefit: "Plan d’action go-to-market." },
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
            <Badge bg="var(--color-light)"><Sparkles className="mr-1 size-3" /> Fiches pratiques (pack & complet)</Badge>
          </p>
        </div>

        {/* PRICING */}
        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          {/* À l’unité */}
          <Card className="p-6 flex flex-col" bg="#fff" border={colors.pastel}>
            <Badge>Module à l’unité</Badge>
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

            <Button href="#modules" variant="secondary" className="mt-6 w-full">
              Choisir un module <ArrowRight className="ml-2 inline size-4" />
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
              <div className="text-4xl font-extrabold">179&nbsp;€</div>
              <div className="text-sm text-neutral-500">TTC</div>
              <div className="text-sm text-neutral-500">~<s>198&nbsp;€</s></div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> M2&nbsp;+&nbsp;M3 (PDF)</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Exercices et matrices</li>
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Fiches pratiques incluses</li>
            </ul>

            {/* TODO: brancher Stripe (sku=pack_prix_renta) */}
            <Button href="/api/checkout?sku=pack_prix_renta" className="mt-6 w-full">
              Prendre le pack <ArrowRight className="ml-2 inline size-4" />
            </Button>
          </Card>

          {/* Complet */}
          <Card className="p-6 flex flex-col" bg="#fff" border={colors.vivid}>
            <div className="flex items-center justify-between">
              <Badge bg={colors.pastel} fg={colors.dark}>Recommandé</Badge>
              <span className="text-xs" style={{ color: colors.vivid }}>80% choisissent cette option</span>
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
              <li className="flex gap-2"><Check className="size-4" style={{ color: colors.vivid }} /> Accès immédiat + mises à jour</li>
            </ul>

            {/* TODO: brancher Stripe (sku=pack_complet) */}
            <Button href="/api/checkout?sku=pack_complet" className="mt-6 w-full">
              Commander maintenant <ArrowRight className="ml-2 inline size-4" />
            </Button>
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
                    <div className="p-2 rounded-xl" style={{ backgroundColor: colors.light }}>
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{m.title}</h3>
                      <p className="text-sm text-neutral-600 mt-1">{m.benefit}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-neutral-700"><Clock className="inline mr-1 size-4" /> {m.time}</span>
                    <span className="text-base font-bold">99&nbsp;€</span>
                  </div>
                  {/* TODO: brancher Stripe (ex: sku=module_m1) */}
                  <Button href={`/api/checkout?sku=module_${m.key}`} variant="secondary" className="mt-4 w-full">
                    Acheter ce module
                  </Button>
                </Card>
              );
            })}
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
  <div className="mb-6">
     <div className="mt-10">
    <h2 className="text-2xl font-bold">Ils se sont lancés</h2>
    <p className="text-neutral-600">
      Quelques retours d’apprenants (placeholders, à remplacer par vos témoignages réels).
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-5 mt-5"> {[1,2,3].map((i)=> ( 
    <Card key={i} className="p-6" bg="#ffffff" border={colors.pastel}> 
    <div className="flex items-center gap-2" style={{ color: "#FFB300" }}> 
      {Array.from({length:5}).map((_,j)=> <Star key={j} className="size-4 fill-current"/>)} 
      </div> 
      <p className="mt-3 text-sm text-neutral-700">“Une approche ultra concrète. Les fiches m’ont fait gagner des jours de préparation.”</p>
      <p className="mt-3 text-xs text-neutral-500">Camille — Ex-réceptionniste</p> 
      </Card> 
    ))}
  </div>
</div>
      </Container>
    </div>
  );
}
