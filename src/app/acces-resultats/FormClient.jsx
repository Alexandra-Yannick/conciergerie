"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Card, Button, Badge } from "@/components/ui";
import { Mail, User } from "lucide-react";
import TestimonialsRotator from "@/components/TestimonialsRotator";
import { TESTIMONIALS } from "@/data/testimonials";

export default function FormClient({ initialQuery }) {
  const router = useRouter();
  const { flow, score, max } = initialQuery ?? { flow: "reconversion", score: 0, max: 20 };

  const resultPath = useMemo(() => {
    if (flow === "reconversion") {
      if (score >= 16) return "/resultat/reconversion/foncer";
      if (score >= 10) return "/resultat/reconversion/explorer";
      return "/resultat/reconversion/bonne-voie";
    }
    // lancement
    if (score >= 16) return "/resultat/lancement/scaler";
    if (score >= 10) return "/resultat/lancement/structurer";
    return "/resultat/lancement/bases";
  }, [flow, score]);

  const [first, setFirst] = useState("");
  const [email, setEmail] = useState("");

  const emailOk = /\S+@\S+\.\S+/.test(email);
  const canSubmit = first.trim().length > 0 && emailOk;

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: ici vous pouvez appeler votre service d’emailing (Brevo, etc.)
    router.push(`${resultPath}?score=${score}&max=${max}&prenom=${encodeURIComponent(first)}`);
  }

  return (
    <Container className="py-12 space-y-6">
      <Card className="p-6 bg-white border space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Accéder à mes résultats</h1>
          <Badge bg="var(--color-pastel)" fg="var(--color-dark)">Quiz terminé</Badge>
        </div>

        <p className="text-neutral-700">
          {"Renseignez votre prénom et votre email pour consulter votre résultat personnalisé."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium flex items-center gap-2">
              <User className="size-4" /> Prénom
            </span>
            <input
              type="text"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              placeholder="Alexandra"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium flex items-center gap-2">
              <Mail className="size-4" /> Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@example.com"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
            />
          </label>

          {!emailOk && email.length > 0 && (
            <p className="text-xs text-red-600">{"Veuillez saisir une adresse email valide."}</p>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={!canSubmit}>Voir mes résultats</Button>
          </div>
        </form>
      </Card>

      {/* Témoignages sous le formulaire */}
      <Card className="p-6 bg-white border">
        <h2 className="text-lg font-semibold">{"Ils se sont lancés"}</h2>
        <p className="text-neutral-600 text-sm">
          {"Quelques retours d’apprenants (placeholders, à remplacer par vos témoignages réels)."}
        </p>
        <div className="mt-4">
          <TestimonialsRotator items={TESTIMONIALS} count={3} interval={6000} />
        </div>
      </Card>
    </Container>
  );
}
