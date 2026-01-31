// src/app/acces-resultats/page.js
import FormClient from "./FormClient";
import React, { Suspense } from 'react';

export const metadata = {
  title: "Accéder à mes résultats",
  description: "Renseignez vos informations pour consulter votre résultat personnalisé.",
};

// 1. On crée un composant intermédiaire qui gère les paramètres
function AccesResultatsContent({ searchParams }) {
  const rawNext = searchParams?.next ?? "/resultat";
  const flow     = String(searchParams?.flow ?? "");
  const score    = Number(searchParams?.score ?? 0);
  const max      = Number(searchParams?.max ?? 20);

  const next = decodeURIComponent(rawNext);

  return (
    <FormClient
      next={next}
      flow={flow}
      score={score}
      max={max}
    />
  );
}

// 2. L'export principal enveloppe le tout dans un Suspense
export default function Page(props) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <AccesResultatsContent {...props} />
    </Suspense>
  );
}