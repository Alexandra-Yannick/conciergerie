// src/app/acces-resultats/page.js  (SERVER)
import FormClient from "./FormClient";

export const metadata = {
  title: "Accéder à mes résultats",
  description:
    "Renseignez vos informations pour consulter votre résultat personnalisé.",
};

export default function Page({ searchParams }) {
  // On parse côté serveur puis on passe en props
  const flow = (searchParams?.flow ?? "reconversion").toString();
  const score = Number(searchParams?.score ?? 0);
  const max = Number(searchParams?.max ?? 20);

  return <FormClient initialQuery={{ flow, score, max }} />;
}
