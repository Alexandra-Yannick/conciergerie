// src/app/acces-resultats/FormClient.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Card, Button, Badge } from "@/components/ui";
import { Mail, User } from "lucide-react";
import TestimonialsRotator from "@/components/TestimonialsRotator";
import { TESTIMONIALS } from "@/data/testimonials";

export default function FormClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const next = sp.get("next") || "/";
  const flow = sp.get("flow") || "";
  const score = sp.get("score") || "";
  const max = sp.get("max") || "";

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const disabled =
    !firstName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function onSubmit(e) {
    e.preventDefault();
    // TODO: enregistrement optionnel
    // await fetch("/api/lead", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ firstName, email, flow, score, max }) });

    router.replace(next);
  }

  return (
    <Container className="py-10">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Formulaire */}
        <Card className="p-6 bg-white border">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-extrabold">Accéder à mes résultats</h1>
            <Badge bg="var(--color-pastel)" fg="var(--color-dark)">1 min</Badge>
          </div>

          <p className="mt-2 text-neutral-700 text-sm">
            Renseignez votre prénom et votre email pour afficher votre résultat personnalisé.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Prénom</label>
              <div className="flex items-center gap-2 rounded-xl border p-3">
                <User className="size-4 opacity-70" />
                <input
                  type="text"
                  className="w-full outline-none"
                  placeholder="Ex. Camille"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <div className="flex items-center gap-2 rounded-xl border p-3">
                <Mail className="size-4 opacity-70" />
                <input
                  type="email"
                  className="w-full outline-none"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <input type="hidden" name="flow" value={flow} />
            <input type="hidden" name="score" value={score} />
            <input type="hidden" name="max" value={max} />

            <Button type="submit" disabled={disabled} className="w-full">
              Voir mon résultat
            </Button>

          </form>
        </Card>

        {/* Témoignages */}
        <Card className="p-6 bg-white border">
          <h2 className="text-lg font-bold">Ils se sont lancés</h2>
          <p className="text-sm text-neutral-600">
            Ce que disent les apprenants :
          </p>

          <div className="mt-4">
            {/* 3 avis visibles, rotation toutes les 6s */}
            <TestimonialsRotator items={TESTIMONIALS} count={3} interval={6000} />
          </div>

          {/* Astuce/confiance */}
          <div
            className="mt-5 rounded-xl p-3 text-sm text-neutral-700"
            style={{ backgroundColor: "color-mix(in oklab, var(--color-light) 70%, #fff 30%)" }}
          >
            Vos infos ne sont jamais partagées à des tiers.
          </div>
        </Card>
      </div>
    </Container>
  );
}
