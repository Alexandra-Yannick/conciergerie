"use client";
import { useRouter, useParams } from "next/navigation";
import { useMemo, useState } from "react";

const BANK = {
  // Flux 1 : reconversion (débutant)
  reconversion: [
    {
      id: "Q1-flux1",
      label: "J’aime organiser, anticiper et gérer des imprévus",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
    {
      id: "Q2-flux1",
      label: "Je suis à l’aise avec les outils numériques du quotidien",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
    {
      id: "Q3-flux1",
      label: "J’ai envie d’être indépendant(e) dans mon activité",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
    {
      id: "Q4-flux1",
      label: "Le contact humain me motive",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
    {
      id: "Q5-flux1",
      label: "Je sais garder mon calme en situation de stress",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
    {
      id: "Q6-flux1",
      label: "J’aime l’idée de participer à l’expérience de voyage d’un client",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
    {
      id: "Q7-flux1",
      label: "Je suis capable de gérer plusieurs tâches en même temps",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
   {
      id: "Q8-flux1",
      label: "L’idée de travailler parfois le week-end ou en décalé ne me dérange pas",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
    {
      id: "Q9-flux1",
      label: "Je suis curieux(se) de découvrir le métier d’un point de vue pratique",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },  
   {
      id: "Q10-flux1",
      label: "JJe me vois créer une petite entreprise de services",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },  
  ],

  // Flux 2 : lancement (déjà avancé)
  lancement: [
    {
      id: "Q1-flux2",
      label: "J’ai déjà identifié mes prestations de base",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
    {
      id: "Q2-flux2",
      label: "Mon offre est claire et structurée (packs, tarifs)",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
     {
      id: "Q3-flux2",
      label: "Je sais comment je vais trouver mes premiers clients",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
     {
      id: "Q4-flux2",
      label: "J’ai choisi mon statut juridique et je connais mes obligations",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
     {
      id: "Q5-flux2",
      label: "J’ai déjà utilisé un outil de gestion (type Smoobu, Notion, etc.)",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
     {
      id: "Q6-flux2",
      label: "Je connais ma marge sur chaque mission",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
     {
      id: "Q7-flux2",
      label: "Je sais quels services je délègue ou souhaite déléguer",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
     {
      id: "Q8-flux2",
      label: "J’ai un document à présenter à un propriétaire intéressé",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
     {
      id: "Q9-flux2",
      label: "Je sais comment répondre à une demande urgente",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
     {
      id: "Q10-flux2",
      label: "J’ai une idée claire de mes objectifs sur 3 à 6 mois",
      options: [
        { label: "Oui", points: 2 },
        { label: "Un peu", points: 1 },
        { label: "Non", points: 0 },
      ],
    },
  ],
};

export default function FlowPage() {
  const router = useRouter();
  const params = useParams();
  const flow = params.flow;

  const questions = useMemo(() => BANK[flow] ?? [], [flow]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!questions.length) {
    return (
      <main className="mx-auto max-w-lg p-6">
        <p className="text-red-600">Ce questionnaire n’existe pas.</p>
      </main>
    );
  }

  const q = questions[step];

  function select(points) {
    setAnswers(prev => ({ ...prev, [q.id]: points }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Fin : calcule un score simple et redirige vers résultat
      const total = Object.values({ ...answers, [q.id]: points }).reduce((a, b) => a + b, 0);
      const resultId = total <= 3 ? "pack_basic" : "pack_pro";
      router.push(`/resultat?resultId=${resultId}&flow=${flow}`);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-xl font-bold capitalize">Questionnaire — {flow}</h1>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{q.label}</h2>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => select(opt.points)}
            className="w-full rounded-lg border p-4 text-left hover:bg-gray-50"
          >
            {opt.label}
          </button>
        ))}
      </section>
    </main>
  );
}
