"use client";

import { useRouter, useParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { Container, Card, Button, Badge, colors } from "@/components/ui";
import { Star, CheckCircle2, Info, TrendingUp, Clock, Shield, Sparkles } from "lucide-react";

/* ------------------------------------------------------------------
   1) BANQUE DE QUESTIONS
-------------------------------------------------------------------*/
const BANK = {
  reconversion: [
    { id: "Q1-flux1",  label: "J’aime organiser, anticiper et gérer des imprévus", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q2-flux1",  label: "Je suis à l’aise avec les outils numériques du quotidien", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q3-flux1",  label: "J’ai envie d’être indépendant(e) dans mon activité", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q4-flux1",  label: "Le contact humain me motive", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q5-flux1",  label: "Je sais garder mon calme en situation de stress", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q6-flux1",  label: "J’aime l’idée de participer à l’expérience de voyage d’un client", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q7-flux1",  label: "Je suis capable de gérer plusieurs tâches en même temps", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q8-flux1",  label: "L’idée de travailler parfois le week-end ou en décalé ne me dérange pas", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q9-flux1",  label: "Je suis curieux(se) de découvrir le métier d'un point de vue pratique", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q10-flux1", label: "Je me vois créer une petite entreprise de services", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
  ],
  lancement: [
    { id: "Q1-flux2",  label: "J’ai déjà identifié mes prestations de base", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q2-flux2",  label: "Mon offre est claire et structurée (packs, tarifs)", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q3-flux2",  label: "Je sais comment je vais trouver mes premiers clients", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q4-flux2",  label: "J'ai choisi mon statut juridique et je connais mes obligations", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q5-flux2",  label: "J'ai déjà utilisé un outil de gestion (type Smoobu, Notion, etc.)", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q6-flux2",  label: "Je connais ma marge sur chaque prestation", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q7-flux2",  label: "Je sais quels services je délègue ou souhaite déléguer", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q8-flux2",  label: "J'ai un document à présenter à un propriétaire intéressé", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q9-flux2",  label: "Je sais comment répondre à une demande urgente", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
    { id: "Q10-flux2", label: "J'ai une idée claire de mes objectifs sur 3 à 6 mois", options: [{ label: "Oui", points: 2 }, { label: "Un peu", points: 1 }, { label: "Non", points: 0 }] },
  ],
};

/* ------------------------------------------------------------------
   2) TEASERS PÉDAGOGIQUES (why + hint)
-------------------------------------------------------------------*/
const TEASER_INFO_RECONVERSION = {
  "Q1-flux1":  { why: "Capacité à tenir l’opérationnel : prioriser, prévoir des buffers, gérer l’imprévu sans paniquer.", hint: "Crée 3 checklists (arrivée, départ, incident). Ajoute un ‘tampon temps’ de 15–20 min par mission." },
  "Q2-flux1":  { why: "Efficacité et scalabilité : sans outils, tu perds du temps et tu fais des erreurs.", hint: "Standardise un mini-stack : agenda partagé, modèles d’emails, formulaire d’état des lieux, drive organisé." },
  "Q3-flux1":  { why: "Motivation et posture d’indépendant : régularité, autonomie, décisions parfois impopulaires.", hint: "Écris 3 raisons de te lancer, tes limites (temps/argent), et un rituel hebdo d’avancement." },
  "Q4-flux1":  { why: "Qualité d’accueil et de relation = confiance, récurrence, bouche-à-oreille.", hint: "Prépare 2 scripts : 1 pitch propriétaire (2 min), 1 message d’accueil voyageur (200–300 caractères)." },
  "Q5-flux1":  { why: "Gestion de crise : pannes, retards, conflits. Rester calme évite l’escalade.", hint: "Établis une ‘échelle d’escalade’ (1–3) + un message d’apaisement, et une personne de backup joignable." },
  "Q6-flux1":  { why: "Orientation expérience client : tu crées du souvenir (et des notes ★★★★☆).", hint: "Liste 5 partenaires locaux (ménage, taxi, resto). Prépare 1 upsell ‘soft’ à envoyer J-2 avant l’arrivée." },
  "Q7-flux1":  { why: "Multi-tâches et priorisation : demandes simultanées, changements de dernière minute.", hint: "Time-blocking + batching. Écris 3 SOP simples (clé, linge, litige)." },
  "Q8-flux1":  { why: "Disponibilité réelle : pics le soir/week-end — l’assumer ou l’organiser.", hint: "Planifie une astreinte (toi/partenaire) + tarif hors-heures. Note aussi tes créneaux off." },
  "Q9-flux1":  { why: "Vitesse d’apprentissage : le terrain va plus vite que la théorie.", hint: "Fais 1 journée d’observation chez un pro (ou hôte), lance un mini-pilote pour apprendre." },
  "Q10-flux1": { why: "Intention entrepreneuriale : vente, suivi client, responsabilité.", hint: "Mini plan 1 page (marché, offre, prix, 1ers clients) + 3 actions concrètes sur 30 jours." },
};

const TEASER_INFO_LANCEMENT = {
  "Q1-flux2":  { why: "Clarté des prestations = base de ton périmètre, de tes prix et promesses.", hint: "Liste 6–10 prestations MAX. Pour chacune: résultat livré, délai, inclus/exclus." },
  "Q2-flux2":  { why: "Une offre packagée se vend mieux, évite le marchandage et pose des repères.", hint: "Crée 2–3 packs (Essentiel/Plus/Premium) avec livrables, SLA et prix ronds." },
  "Q3-flux2":  { why: "Sans canal d’acquisition clair, pas de pipe clients régulier.", hint: "Choisis 2 canaux (prospection locale + partenariats). 10 prises de contact/semaine, tracker simple." },
  "Q4-flux2":  { why: "Cadrage légal = crédibilité + sérénité (contrats, facturation, responsabilité).", hint: "Checklist légale : statut, RC pro, mentions, modèle contrat. Valide si besoin." },
  "Q5-flux2":  { why: "Un outil centralise opérations, communication, traçabilité → moins d’erreurs.", hint: "Choisis un hub (SaaS/Notion/Sheets). Planning, checklists, contacts, modèles d’emails, incidents." },
  "Q6-flux2":  { why: "La marge réelle guide tes décisions (prix, sous-traitance, priorités).", hint: "Fiche coût/prestation : temps, coût direct, frais, prix → marge. Repère tes 20/80." },
  "Q7-flux2":  { why: "Déléguer = scaler sans t’épuiser et garantir la qualité.", hint: "3 SOP (ménage, remise de clés, urgence). Critères qualité + 1 back-up par mission critique." },
  "Q8-flux2":  { why: "Un support de vente rassure et accélère la décision du propriétaire.", hint: "Mini-dossier 8–10p : qui tu es, packs, process, tarifs, témoignages, conditions, CTA rdv." },
  "Q9-flux2":  { why: "Gestion d’urgence = professionnalisme et protection de tes notes.", hint: "Protocole 5 étapes : diagnostic, message apaisant, action 30 min, suivi, post-mortem + numéro d’astreinte." },
  "Q10-flux2": { why: "Objectifs mesurables guident tes priorités hebdo.", hint: "3 objectifs SMART (ex: 5 clients, marge 35%, 2 partenaires) + revue chaque vendredi (30 min)." },
};

const TEASER_INFO = { ...TEASER_INFO_RECONVERSION, ...TEASER_INFO_LANCEMENT };

/* ------------------------------------------------------------------
   3) SOCIAL PROOF
-------------------------------------------------------------------*/
const SOCIAL_PROOF = [
  { text: "« Ce quiz m’a aidée à comprendre où creuser en priorité. » — Claire (Bordeaux)" },
  { text: "« Après ce quiz, j’ai structuré mon offre en 2 soirs. » — Martin (Lyon)" },
  { text: "« Les astuces m’ont fait gagner un temps fou au lancement. » — Julie (Nice)" },
];

function MicroSocialProof({ step }) {
  const item = SOCIAL_PROOF[step % SOCIAL_PROOF.length];
  return (
    <div className="mt-5 rounded-xl bg-[color:var(--color-light)]/60 p-3">
      <p className="text-sm text-neutral-700 italic text-center leading-relaxed">
        {item.text}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
   4) Composants utilitaires
-------------------------------------------------------------------*/
function Progress({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">Question {current + 1} / {total}</span>
        <span className="text-xs text-neutral-500">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-neutral-200/70">
        <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: colors.vivid }} />
      </div>
    </div>
  );
}

function QuestionIntro({ flow }) {
  const lines =
    flow === "reconversion"
      ? [
          "Imaginez : vous démarrez demain, un propriétaire hésite à vous confier les clefs…",
          "Votre réponse révèle votre capacité à inspirer confiance et à rester organisé.",
        ]
      : [
          "Vous avez déjà mis un pied dedans : la question est d’optimiser rapidement.",
          "Votre choix montre votre niveau de clarté d’offre et de positionnement.",
        ];
  return (
    <div className="space-y-1">
      <p className="text-sm text-neutral-700 flex items-center gap-2">
        <Info className="size-4" /> {lines[0]}
      </p>
      <p className="text-xs text-neutral-500">{lines[1]}</p>
    </div>
  );
}

function Teaser({ qid }) {
  const t = TEASER_INFO[qid];
  if (!t) return null;
  return (
    <Card className="mt-4 p-4 bg-white border">
      <p className="text-xs text-neutral-600">
        <span className="font-semibold">Pourquoi cette question :</span> {t.why}
      </p>
      <p className="text-xs text-neutral-600 mt-2">
        <span className="font-semibold">Astuce :</span> {t.hint}
      </p>
    </Card>
  );
}

/* ------------------------------------------------------------------
   5) Page principale — Option B (“Continuer” explicite)
-------------------------------------------------------------------*/
export default function Page() {
  const router = useRouter();
  const { flow } = useParams();

  const questions = useMemo(() => BANK[flow] ?? [], [flow]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lastFeedback, setLastFeedback] = useState(null);          // { tone, text }
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);   // ← bloque les boutons et attend “Continuer”

  // Purge feedback / surbrillance / attente à chaque nouvelle question
  useEffect(() => {
    setLastFeedback(null);
    setSelectedOptionIndex(null);
    setAwaitingConfirm(false);
  }, [step]);

  if (!questions.length) {
    return (
      <Container className="py-16">
        <Card className="p-6 bg-white border">
          <p className="text-red-600">Ce questionnaire n’existe pas.</p>
        </Card>
      </Container>
    );
  }

  const q = questions[step];
  const isLast = step >= questions.length - 1;

  function feedbackFor(points) {
    if (points >= 2) return { tone: "good", text: "Excellent réflexe — c’est un vrai point fort !" };
    if (points === 1) return { tone: "ok",   text: "Bonne intuition — on peut renforcer cette compétence." };
    return { tone: "bad",  text: "Pas grave, beaucoup font cette erreur au début. On corrige ça rapidement." };
  }

  function select(points, index) {
    if (awaitingConfirm) return; // sécurité
    setSelectedOptionIndex(index);
    setAnswers(prev => ({ ...prev, [q.id]: points }));
    setLastFeedback(feedbackFor(points));
    setAwaitingConfirm(true); // on attend le clic “Continuer” (ou “Voir mes résultats” si dernière)
  }

  function goNext() {
    setStep(s => s + 1);
  }

  function finish() {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const max = questions.reduce((acc, qq) => acc + Math.max(...qq.options.map(o => o.points)), 0);

if (flow === "reconversion") {
  let path = "/resultat/reconversion/explorer";
  if (total >= 10 && total <= 15) path = "/resultat/reconversion/bonne-voie";
  if (total >= 16) path = "/resultat/reconversion/foncer";
  router.push(`${path}?score=${total}&max=${max}`);
  return;
}

if (flow === "lancement") {
  let path = "/resultat/lancement/bases";          // 0–9
  if (total >= 10 && total <= 15) path = "/resultat/lancement/structurer";
  if (total >= 16) path = "/resultat/lancement/scaler";
  router.push(`${path}?score=${total}&max=${max}`);
  return;
}
// fallback éventuel
router.push(`/resultat?resultId=pack_pro&flow=${flow}&score=${total}&max=${max}`);
  }

  const fbColor =
    lastFeedback?.tone === "good" ? "#16a34a" :
    lastFeedback?.tone === "ok"   ? "#f59e0b" :
    lastFeedback?.tone === "bad"  ? "#ef4444" : undefined;

  return (
    <Container className="py-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold capitalize">Questionnaire — {flow}</h1>
          <p className="text-sm text-neutral-600 flex items-center gap-3 mt-1">
            <Badge bg="var(--color-light)"><Clock className="size-3 mr-1" /> ~4 min</Badge>
            <Badge bg="var(--color-light)"><Shield className="size-3 mr-1" /> Satisfait ou remboursé 7 jours</Badge>
            <Badge bg="var(--color-light)"><Sparkles className="size-3 mr-1" /> Fiches exclusives dans le pack</Badge>
          </p>
        </div>
        <Badge bg="var(--color-pastel)" fg="var(--color-dark)">
          <TrendingUp className="size-3 mr-1" /> Objectif : clarifier votre plan d’action
        </Badge>
      </div>

      {/* Progress */}
      <Card className="p-4 bg-white border">
        <Progress current={step} total={questions.length} />
      </Card>

      {/* Question */}
      <Card className="mt-6 p-6 bg-white border">
        <QuestionIntro flow={flow} />

        <h2 className="mt-4 text-lg font-semibold flex items-center gap-2">
          <Star className="size-5 text-yellow-500" />
          {q.label}
        </h2>

        <div className="mt-4 grid gap-3">
          {q.options.map((opt, i) => {
            const isActive = selectedOptionIndex === i;
            return (
              <Button
                key={i}
                onClick={() => select(opt.points, i)}
                disabled={awaitingConfirm} // on bloque après un choix
                variant={isActive ? "primary" : "secondary"}
                className={`w-full justify-start ${isActive ? "ring-2 ring-offset-2" : ""} ${
                  awaitingConfirm ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {opt.label}
              </Button>
            );
          })}
        </div>

        {/* Feedback + Teaser après choix */}
        {lastFeedback && (
          <div className="mt-4 text-sm" style={{ color: fbColor }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              <span>{lastFeedback.text}</span>
            </div>
          </div>
        )}
        {lastFeedback && <Teaser qid={q.id} />}

        {/* CTA “Continuer” ou “Voir mes résultats” */}
        {awaitingConfirm && (
          <div className="mt-4 flex justify-end">
            {isLast ? (
              <Button onClick={finish}>Voir mes résultats</Button>
            ) : (
              <Button onClick={goNext}>Continuer</Button>
            )}
          </div>
        )}

        <MicroSocialProof step={step} />
      </Card>
    </Container>
  );
}
