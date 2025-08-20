// src/components/CheckoutButton.jsx
"use client";

import { Button } from "@/components/ui";
import { stripePromise } from "@/lib/stripe";

export default function CheckoutButton({ sku, children, className }) {
  async function onClick() {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        alert("Clé Stripe publique absente côté client.");
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sku }),
      });

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        // La réponse n'est pas JSON → on lit le texte pour debug
        const text = await res.text();
        console.error("Réponse non-JSON:", res.status, text);
        alert("Paiement indisponible (réponse inattendue du serveur).");
        return;
      }

      const data = await res.json();
      if (!res.ok || !data?.sessionId) {
        console.error("Checkout error", data);
        alert(data?.error || "Paiement indisponible pour le moment.");
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
      if (error) {
        console.error(error);
        alert("Erreur Stripe pendant la redirection.");
      }
    } catch (e) {
      console.error(e);
      alert("Erreur pendant la redirection vers Stripe.");
    }
  }

  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
}