"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, User, Mail } from "lucide-react";
import { Button } from "@/components/ui"; // on réutilise votre bouton UI
import { TESTIMONIALS } from "@/data/testimonials";

export default function FormClient() {
  const router = useRouter();
  const sp = useSearchParams();

  // Params venant du quiz
  const nextParam = sp.get("next") || ""; // URL de destination encodée
  const flow = sp.get("flow") || "";      // "reconversion" | "lancement"
  const score = Number(sp.get("score") || 0);
  const max = Number(sp.get("max") || 20);

  // Champs du formulaire
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");

  // Erreurs UI
  const [errFirst, setErrFirst] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errApi, setErrApi] = useState("");

  // Envoi en cours
  const [submitting, setSubmitting] = useState(false);

  // --- Témoignages en rotation ---
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 6000);
    return () => clearInterval(id);
  }, []);

  const visibleTestimonials = useMemo(() => {
    // Afficher 3 témoignages, en tournant
    return Array.from({ length: 3 }, (_, i) => {
      const idx = (tick + i) % TESTIMONIALS.length;
      return TESTIMONIALS[idx];
    });
  }, [tick]);

  // --- Petites fonctions utilitaires ---
  const emailIsValid = (e) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e || "").trim());

  function finalFallbackUrl() {
    // Si jamais `next` n'est pas fourni, on recalcule une destination par défaut
    if (flow === "reconversion") {
      if (score >= 16) return `/resultat/reconversion/foncer?score=${score}&max=${max}`;
      if (score >= 10) return `/resultat/reconversion/explorer?score=${score}&max=${max}`;
      return `/resultat/reconversion/bonne-voie?score=${score}&max=${max}`;
    }
    // flow === "lancement" (ou autre → bases)
    if (score >= 16) return `/resultat/lancement/scaler?score=${score}&max=${max}`;
    if (score >= 10) return `/resultat/lancement/structurer?score=${score}&max=${max}`;
    return `/resultat/lancement/bases?score=${score}&max=${max}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrFirst("");
    setErrEmail("");
    setErrApi("");

    const f = firstname.trim();
    const m = email.trim();

    // Validation
    let hasError = false;
    if (!f) {
      setErrFirst("Votre prénom est obligatoire");
      hasError = true;
    }
    if (!m) {
      setErrEmail("Votre mail est obligatoire");
      hasError = true;
    } else if (!emailIsValid(m)) {
      setErrEmail("Votre mail semble invalide");
      hasError = true;
    }
    if (hasError) return;

    setSubmitting(true);
    try {
      // Envoi à votre API (qui s’occupe d’appeler Brevo)
      const res = await fetch("/api/brevo/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: m,
          firstname: f,
          flow,
          score,
          max,
        }),
      });

      // Lecture sécurisée de la réponse (JSON ou texte)
      let payload = {};
      const text = await res.text();
      try {
        payload = text ? JSON.parse(text) : {};
      } catch {
        payload = { ok: res.ok, raw: text };
      }

      if (!res.ok) {
        setErrApi(
          payload?.error ||
            "Échec de l’enregistrement. Merci de réessayer dans un instant."
        );
        setSubmitting(false);
        return;
      }

      // Redirection vers la page de résultats
      const decodedNext = nextParam ? decodeURIComponent(nextParam) : "";
      const dest = decodedNext || finalFallbackUrl();
      router.push(dest);
    } catch (err) {
      setErrApi("Erreur réseau. Vérifiez votre connexion et réessayez.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-extrabold">Accéder à mes résultats</h1>
        <p className="mt-2 text-neutral-600">
          Renseignez votre prénom et votre email pour voir votre résultat
          personnalisé et recevoir les ressources utiles selon votre profil.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          {/* Prénom */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              <User className="mr-1 inline size-4" />
              Prénom
            </label>
            <input
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-vivid)]"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Votre prénom"
              autoComplete="given-name"
            />
            {errFirst && (
              <p className="mt-1 text-xs text-red-600">{errFirst}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              <Mail className="mr-1 inline size-4" />
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-vivid)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              autoComplete="email"
            />
            {errEmail && (
              <p className="mt-1 text-xs text-red-600">{errEmail}</p>
            )}
          </div>

          {/* Erreur API */}
          {errApi && (
            <p className="text-sm text-red-600">
              {errApi}
            </p>
          )}

          <Button
            type="submit"
            className="mt-2 w-full"
            disabled={submitting}
          >
            {submitting ? "Envoi en cours..." : "Voir mes résultats"}
          </Button>

        </form>
      </div>

      {/* Témoignages */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Ils se sont lancés</h2>
        <p className="text-neutral-600">
          Quelques retours d’apprenants (placeholders, à remplacer par vos témoignages réels).
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {visibleTestimonials.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="rounded-2xl border border-[var(--color-pastel)] bg-white p-6"
            >
              <div
                className="flex items-center gap-1"
                style={{ color: "#FFB300" }}
              >
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="size-4 fill-current" />
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, j) => (
                  <Star key={`o-${j}`} className="size-4" />
                ))}
              </div>
              <p className="mt-3 text-sm text-neutral-700">“{t.text}”</p>
              <p className="mt-3 text-xs text-neutral-500">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}