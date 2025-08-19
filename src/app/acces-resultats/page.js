// src/app/acces-resultats/page.js  — SERVER
import FormClient from "./FormClient";

export const metadata = {
  title: "Accéder à mes résultats",
  description: "Renseignez vos informations pour consulter votre résultat personnalisé.",
};

export default function Page({ searchParams }) {
  const rawNext = searchParams?.next ?? "/resultat";
  const flow     = String(searchParams?.flow ?? "");
  const score    = Number(searchParams?.score ?? 0);
  const max      = Number(searchParams?.max ?? 20);

  // On tolère un "next" déjà décodé
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