// src/app/merci/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container, Card, Badge, Button, colors } from "@/components/ui";

export default function MerciPage() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const [state, setState] = useState({ loading: true, paid: false, files: [], product: null });

  useEffect(() => {
    let mounted = true;
    async function run() {
      if (!sessionId) {
        setState({ loading: false, paid: false, files: [], product: null });
        return;
      }
      const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
      const json = await res.json();
      if (mounted) {
        setState({
          loading: false,
          paid: !!json.paid,
          files: json.files || [],
          product: json.product || null,
        });
      }
    }
    run();
    return () => { mounted = false; };
  }, [sessionId]);

  return (
    <Container className="py-12">
      <Card className="p-6 bg-white border" border={colors.pastel}>
        <h1 className="text-2xl font-bold">Merci pour votre achat !</h1>
        {state.loading ? (
          <p className="mt-2 text-sm text-neutral-600">Vérification du paiement…</p>
        ) : !state.paid ? (
          <>
            <p className="mt-2 text-sm text-red-600">
              Paiement non confirmé. Si vous avez été débité, contactez-nous avec votre email et l’heure du paiement.
            </p>
            <Button href="/offre" className="mt-4">Retour à l’offre</Button>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-neutral-700">
              {state.product ? <>Vous avez acheté <strong>{state.product}</strong>.</> : "Paiement confirmé."}
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              Vos documents sont prêts :
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
              {state.files.map((f, i) => (
                <li key={i}>
                  <a className="underline" href={f} target="_blank" rel="noreferrer">
                    {decodeURIComponent(f.split("/").pop())}
                  </a>
                </li>
              ))}
            </ul>
            <Button href="/offre" className="mt-5">Retour à l’offre</Button>
          </>
        )}
      </Card>
    </Container>
  );
}