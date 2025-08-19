// src/app/acces-resultats/page.js  (SERVER)
import FormClient from "./FormClient";

export const metadata = {
  title: "Accéder à mes résultats",
  description: "Renseignez vos informations pour consulter votre résultat personnalisé.",
};

export default function Page() {
  return <FormClient />;
}
