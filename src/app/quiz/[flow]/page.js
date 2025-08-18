"use client";

import { useRouter, useParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { Container, Card, Button, Badge, colors } from "@/components/ui";
import { Star, CheckCircle2, Info, TrendingUp, Clock, Shield, Sparkles } from "lucide-react";

/* -------------------------- 1) BANQUE DE QUESTIONS -------------------------- */
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

/* -------------------- 2) TEASERS PÉDAGOGIQUES (why + hint) ------------------- */
const TEASER_INFO_RECONVERSION = {
  "Q1-flux1":  { why: "Capacité à tenir l’opérationnel : prioriser, buffers, imprévus.", hint: "Crée 3 checklists (arrivée, départ, incident) + tampon 15–20 min." },
  "Q2-flux1":  { why: "Efficacité/scalabilité par les outils.", hint: "Mini-stack : agenda partagé, modèles, formulaire, drive organisé." },
  "Q3-flux1":  { why: "Posture d’indépendant.", hint: "Écris 3 raisons, tes limites, rituel hebdo d’avancement." },
  "Q4-flux1":  { why: "Qualité relation = récurrence.", hint: "2 scripts : pitch proprio (2 min) + message accueil voyageur." },
  "Q5-flux1":  { why: "Gestion de crise.", hint: "Échelle d’escalade (1–3) + message d’apaisement + backup joignable." },
  "Q6-flux1":  { why: "Expérience client et notes.", hint: "5 partenaires locaux + 1 upsell ‘soft’ J-2." },
  "Q7-flux1":  { why: "Multi-tâches/priorisation.", hint: "Time-blocking, batching, 3 SOP (clé, linge, litige)." },
  "Q8-flux1":  { why: "Disponibilité réelle.", hint: "Astreinte + tarif hors-heures, note tes créneaux off." },
  "Q9-flux1":  { why: "Apprentissage terrain rapide.", hint: "1 journée d’observation + mini-pilote." },
  "Q10-flux1": { why: "Intention entrepreneuriale.", hint: "Plan 1 page + 3 actions (30 jours)." },
};

const TEASER_INFO_LANCEMENT = {
  "Q1-flux2":  { why: "Clarté des prestations.", hint: "6–10 prestations MAX, résultat/délai/inclus-exclus." },
  "Q2-flux2":  { why: "Packs = repères + conversion.", hint: "2–3 packs (Essentiel/Plus/Premium), livrables/SLA/prix ronds." },
  "Q3-flux2":  { why: "Canaux d’acquisition.", hint: "2 canaux + 10 prises de contact/sem, tracking simple." },
  "Q4-flux2":  { why: "Cadrage légal = crédibilité.", hint: "Checklist : statut, RC pro, mentions, contrat." },
  "Q5-flux2":  { why: "Outil central = moins d’erreurs.", hint: "Hub (SaaS/Notion/Sheets) : planning, SOP, modèles, incidents." },
  "Q6-flux2":  { why: "Pilotage par la marge.", hint: "Fiche coût/prestation → marge. Repère ton 20/80." },
  "Q7-flux2":  { why: "Déléguer pour scaler.", hint: "3 SOP (ménage, clés, urgence) + critères qualité + back-up." },
  "Q8-flux2":  { why: "Support de vente rassurant.", hint: "Mini-dossier 8–10p : packs, process, tarifs, avis, CTA rdv." },
  "Q9-flux2":  { why: "Gestion d’urgence pro.", hint: "Protocole 5 étapes + n° d’astreinte." },
  "Q10-flux2": { why: "Objectifs mesurables.", hint: "3 objectifs SMART + revue vendredi 30 min." },
};

const TEASER_INFO = { ...TEASER_INFO_RECONVERSION, ...TEASER_INFO_LANCEMENT };

/* ------------------------------ 3) SOCIAL PROOF ------------------------------ */
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

/* ---------------------------- 4) UI utilitaires ----------------------------- */
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

/* --------------------------- 5) Composant principal -------------------------- */
export default function Page() {
  const router = useRouter();
  const { flow } = useParams();

  const questions = useMemo(() => BANK[flow] ?? [], [flow]);
  const hasQuestions = questions.length > 0;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lastFeedback, setLastFeedback] = useState(null);     // { tone, text }
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Toujours définir q après les hooks (pas d’early return)
  const q = hasQuestions ? questions[step] : null;

  function feedbackFor(points) {
    if (points >= 2) return { tone: "good", text: "Excellent réflexe — c’est un vrai point fort !" };
    if (points === 1) return { tone: "ok",   text: "Bonne intuition — on peut renforcer cette compétence." };
    return { tone: "bad",  text: "Pas grave, beaucoup font cette erreur au début. On corrige ça rapidement." };
  }

  // Recharge sélection/feedback quand on change de question
  useEffect(() => {
    if (!hasQuestions || !q) return;
    const prevPoints = answers[q.id];
    if (prevPoints != null) {
      const idx = q.options.findIndex(o => o.points === prevPoints);
      setSelectedIndex(idx >= 0 ? idx : null);
      setLastFeedback(feedbackFor(prevPoints));
    } else {
      setSelectedIndex(null);
      setLastFeedback(null);
    }
  }, [hasQuestions, q, step, answers]);

  function select(points, index) {
    if (!q) return;
    setSelectedIndex(index);
    setAnswers(prev => ({ ...prev, [q.id]: points }));
    setLastFeedback(feedbackFor(points));
  }

  function goPrev() {
    if (step > 0) setStep(s => s - 1);
  }

  function goNext() {
    if (selectedIndex === null) return; // oblige à choisir
    const isLast = step >= questions.length - 1;
    if (!isLast) {
      setStep(s => s + 1);
      return;
    }
    // fin : calcul résultat
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const max = questions.reduce((acc, qq) => acc + Math.max(...qq.options.map(o => o.points)), 0);

    if (flow === "reconversion") {
      let path = "/resultat/reconversion/bonne-voie";
      if (total >= 10 && total <= 15) path = "/resultat/reconversion/explorer";
      if (total >= 16) path = "/resultat/reconversion/foncer";
      router.push(`${path}?score=${total}&max=${max}`);
    } else {
      let path = "/resultat/lancement/bases";
      if (total >= 10 && total <= 15) path = "/resultat/lancement/structurer";
      if (total >= 16) path = "/resultat/lancement/scaler";
      router.push(`${path}?score=${total}&max=${max}`);
    }
  }

  const fbColor =
    lastFeedback?.tone === "good" ? "#16a34a" :
    lastFeedback?.tone === "ok"   ? "#f59e0b" :
    lastFeedback?.tone === "bad"  ? "#ef4444" : undefined;

  return (
    <Container className="py-10">
      {/* Cas sans questions (rendu après hooks, pas d’early return) */}
      {!hasQuestions ? (
        <Card className="p-6 bg-white border">
          <p className="text-red-600">Ce questionnaire n’existe pas.</p>
        </Card>
      ) : (
        <>
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold capitalize">Questionnaire — {flow}</h1>
              <p className="text-sm text-neutral-600 flex items-center gap-3 mt-1">
                <Badge bg="var(--color-light)"><Clock className="size-3 mr-1" /> ~4 min</Badge>
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
                const isActive = selectedIndex === i;
                return (
                  <Button
                    key={i}
                    onClick={() => select(opt.points, i)}
                    variant={isActive ? "primary" : "secondary"}
                    className={`w-full justify-start ${isActive ? "ring-2 ring-offset-2" : ""}`}
                  >
                    {opt.label}
                  </Button>
                );
              })}
            </div>

            {/* Feedback + Teaser */}
            {lastFeedback && (
              <div className="mt-4 text-sm" style={{ color: fbColor }}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4" />
                  <span>{lastFeedback.text}</span>
                </div>
              </div>
            )}
            {lastFeedback && <Teaser qid={q.id} />}

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <Button variant="secondary" onClick={goPrev} disabled={step === 0}>
                Précédent
              </Button>
              <Button onClick={goNext} disabled={selectedIndex === null}>
                {step >= questions.length - 1 ? "Voir mes résultats" : "Continuer"}
              </Button>
            </div>

            <MicroSocialProof step={step} />
          </Card>
        </>
      )}
    </Container>
  );
}
