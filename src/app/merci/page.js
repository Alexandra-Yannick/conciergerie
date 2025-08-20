// src/app/merci/page.js  (SERVER COMPONENT)
import { Suspense } from "react";
import MerciClient from "./MerciClient";

export const metadata = {
  title: "Merci",
  description: "Confirmation de paiement",
};

export default function Page() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Suspense fallback={<div className="p-6">Chargement…</div>}>
        <MerciClient />
      </Suspense>
    </div>
  );
}